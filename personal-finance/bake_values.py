"""Evaluate every formula, then inject the results as cached <v> values into the
sheet XML so the workbook displays real numbers in any viewer, while Excel keeps
live formulas and recalculates on open."""
import sys, re, os, shutil, zipfile, warnings, datetime as dt
import xml.etree.ElementTree as ET
import formulas
warnings.filterwarnings("ignore")

SRC = sys.argv[1]
NS  = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
RNS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
ET.register_namespace("", NS)
EPOCH = dt.datetime(1899,12,30)

def serial(v):
    if isinstance(v, dt.datetime): return (v-EPOCH).days + (v-EPOCH).seconds/86400
    if isinstance(v, dt.date):     return (dt.datetime(v.year,v.month,v.day)-EPOCH).days
    return None

print("evaluating...")
xl  = formulas.ExcelModel().loads(SRC).finish()
sol = xl.calculate()
vals={}
for k,v in sol.items():
    m=re.match(r"^'\[(.+?)\](.+?)'!([A-Z]+\d+)$", str(k))
    if not m: continue
    try:    val = v.value[0,0]
    except Exception:
        try: val = v.value
        except Exception: continue
    vals[(m.group(2).upper(), m.group(3))] = val
print(f"  {len(vals)} cell values resolved")

# map sheet display name -> worksheet xml path
zf = zipfile.ZipFile(SRC)
wbx = ET.fromstring(zf.read("xl/workbook.xml"))
rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
rid2t = {r.get("Id"): r.get("Target") for r in rels}
sheetmap={}
for sh in wbx.find(f"{{{NS}}}sheets"):
    t = rid2t[sh.get(f"{{{RNS}}}id")]
    sheetmap[sh.get("name")] = "xl/"+t.lstrip("/").replace("xl/","",1) if not t.startswith("xl/") else t

out = SRC.replace(".xlsx","_baked.xlsx")
zin = zipfile.ZipFile(SRC); zout = zipfile.ZipFile(out,"w",zipfile.ZIP_DEFLATED)
n_num=n_str=n_err=n_skip=0
errs={}
for item in zin.infolist():
    data = zin.read(item.filename)
    target = next((n for n,p in sheetmap.items() if p==item.filename), None)
    if target:
        root = ET.fromstring(data)
        for c in root.iter(f"{{{NS}}}c"):
            f = c.find(f"{{{NS}}}f")
            if f is None: continue
            v = vals.get((target.upper(), c.get("r")))
            if v is None: n_skip+=1; continue
            for old in c.findall(f"{{{NS}}}v"): c.remove(old)
            s = serial(v)
            if s is not None:
                c.attrib.pop("t",None); ET.SubElement(c,f"{{{NS}}}v").text = repr(float(s)); n_num+=1
            elif isinstance(v,bool):
                c.set("t","b"); ET.SubElement(c,f"{{{NS}}}v").text = "1" if v else "0"; n_num+=1
            elif isinstance(v,(int,float)) and not isinstance(v,bool):
                c.attrib.pop("t",None); ET.SubElement(c,f"{{{NS}}}v").text = repr(float(v)); n_num+=1
            else:
                txt = str(v)
                if txt.startswith("#"):
                    c.set("t","e"); n_err+=1; errs.setdefault(txt,[]).append(f"{target}!{c.get('r')}")
                else:
                    c.set("t","str"); n_str+=1
                ET.SubElement(c,f"{{{NS}}}v").text = txt
        data = ET.tostring(root, xml_declaration=True, encoding="UTF-8")
    zout.writestr(item, data)
zout.close()
print(f"baked: {n_num} numeric, {n_str} text, {n_err} errors, {n_skip} unresolved")
for e,l in errs.items(): print(f"  {e}: {len(l)} -> {l[:8]}")
shutil.move(out, SRC); print("written ->", SRC)
