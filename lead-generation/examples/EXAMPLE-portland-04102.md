# Worked Example — 24 Deering Ave, Portland, ME 04102

This is a fully filled-in example so you can see exactly what one paste turns
into. The finished flyers are in this folder:
`example-payment-flyer.html` and `example-market-snapshot.html` (open either in
a browser → Cmd/Ctrl+P → Save as PDF).

## The inputs Derek pasted
> Build me the open-house flyer set.
>
> Listing: 24 Deering Ave, Portland, ME 04102. $525,000. 3bd/2ba, 1,850 sqft,
> single-family. Open house Sat 7/19, 11am–1pm. Listing agent Sarah Whitfield,
> Portside Real Estate Group.
>
> realtor.com 04102: median list $549k, median sold $535k, median DOM 21 days,
> $312/sqft, 38 active listings, +4.2% YoY, homes selling ~100.5% of list,
> seller's market.

## What Claude computed (payment flyer)
Example rate 6.75%, 30-yr fixed. Taxes est. $6,990/yr (Portland mill rate ~13.31),
insurance est. $2,100/yr.

| Scenario | Down | Loan | P&I | + Tax | + Ins | + MI | **Est. PITI** |
|---|---|---|---|---|---|---|---|
| Conventional 5% | $26,250 | $498,750 | $3,235 | $583 | $175 | $208 (PMI) | **$4,201/mo** |
| FHA 3.5% | $18,375 | $506,625 | $3,286 | $583 | $175 | $232 (MIP) | **$4,276/mo** |
| VA 0% | $0 | $525,000 | $3,405 | $583 | $175 | $0 | **$4,163/mo** |

## Confirm-before-printing list (what Claude flagged)
- **Rate (6.75%)** is an example only — confirm the day-of before you send.
- **Taxes** estimated from Portland's mill rate on list price — verify the
  actual assessed tax if you have it.
- **Insurance** and **PMI/MIP** are estimates.
- FHA figure excludes financed upfront MIP; VA excludes the financed funding fee.

## The give email Claude drafted
See `realtor-give-templates.md` — personalized to Sarah, 24 Deering Ave, Sat 7/19,
ZIP 04102, no strings. Plus the after-the-open-house "how'd it go?" follow-up
queued for ~7/22 in `partner-tracker.csv`.
