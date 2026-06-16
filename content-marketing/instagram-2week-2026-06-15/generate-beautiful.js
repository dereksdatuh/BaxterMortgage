'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const KIT = '/home/user/BaxterMortgage/brand/kit-upload';
const LOGO_WHITE = 'data:image/svg+xml;base64,' + Buffer.from(fs.readFileSync(`${KIT}/Baxter_Logo_White.svg`)).toString('base64');
const EHO_WHITE = 'data:image/png;base64,' + fs.readFileSync(`${KIT}/EHO_White_Transparent.png`).toString('base64');
const HEADSHOT = 'data:image/jpeg;base64,' + fs.readFileSync(`${KIT}/Headshot.png`).toString('base64');

const OUT = '/home/user/BaxterMortgage/content-marketing/instagram-2week-2026-06-15';

const FOOTER = 'Derek Smith NMLS# 2810853 | Baxter Mortgage, LLC NMLS# 2752768 | Equal Housing Opportunity';

const GRAD_BAR = `<div style="position:absolute;top:0;left:0;width:100%;height:5px;background:linear-gradient(90deg,#1DB89A,#4ADE80,#1E3A5F);z-index:100"></div>`;

const LOGO_EL = `<img src="${LOGO_WHITE}" style="width:140px;display:block">`;
const EHO_EL = `<img src="${EHO_WHITE}" style="width:56px;opacity:0.85;display:block">`;

const FOOTER_EL = `<div style="position:absolute;bottom:0;left:0;width:100%;text-align:center;font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.5);padding:8px 0 6px;z-index:100;box-sizing:border-box">${FOOTER}</div>`;

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');`;

async function renderPost(browser, html, filename) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const outPath = path.join(OUT, filename);
  await page.screenshot({ path: outPath, fullPage: false });
  await page.close();
  console.log(`Generated: ${filename} (${fs.statSync(outPath).size} bytes)`);
}

// POST 1 - F-lighthouse-hero.png
function post1() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#0a0f1e;position:relative}
</style>
</head>
<body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0f1e"/>
      <stop offset="10%" stop-color="#0d1a35"/>
      <stop offset="22%" stop-color="#122040"/>
      <stop offset="34%" stop-color="#1a2a50"/>
      <stop offset="45%" stop-color="#3a3020"/>
      <stop offset="55%" stop-color="#7a4510"/>
      <stop offset="65%" stop-color="#c45c1a"/>
      <stop offset="74%" stop-color="#d97420"/>
      <stop offset="82%" stop-color="#e8a040"/>
      <stop offset="89%" stop-color="#eec070"/>
      <stop offset="95%" stop-color="#f2d4a0"/>
      <stop offset="100%" stop-color="#f5e4b8"/>
    </linearGradient>
    <radialGradient id="sun" cx="62%" cy="67%" r="18%">
      <stop offset="0%" stop-color="#ffe090" stop-opacity="1"/>
      <stop offset="18%" stop-color="#f0a030" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#d06010" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#c04010" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#b03010" stop-opacity="0"/>
    </radialGradient>
    <filter id="oceanFilter" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="turbulence" baseFrequency="0.008 0.02" numOctaves="4" seed="2" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.04
                                            0 0 0 0 0.14
                                            0 0 0 0 0.25
                                            0 0 0 1.5 -0.3" in="noise" result="colorNoise"/>
      <feComposite in="colorNoise" in2="SourceGraphic" operator="in" result="maskedNoise"/>
      <feBlend in="maskedNoise" in2="SourceGraphic" mode="overlay" result="blended"/>
      <feDisplacementMap in="blended" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a2540"/>
      <stop offset="40%" stop-color="#0d2e4a"/>
      <stop offset="70%" stop-color="#0f3555"/>
      <stop offset="100%" stop-color="#081c30"/>
    </linearGradient>
    <radialGradient id="shimmer" cx="62%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#f0a030" stop-opacity="0.35"/>
      <stop offset="40%" stop-color="#e08020" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#c06010" stop-opacity="0"/>
    </radialGradient>
    <filter id="hazeFilter">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
    <filter id="beamFilter">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
    <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(245,228,184,0)" />
      <stop offset="60%" stop-color="rgba(200,160,80,0.06)"/>
      <stop offset="100%" stop-color="rgba(180,140,60,0.18)"/>
    </linearGradient>
    <radialGradient id="beamGrad" cx="0%" cy="50%" r="100%">
      <stop offset="0%" stop-color="#fffde0" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fffde0" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="textOverlay" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="rgba(8,23,38,0.85)"/>
      <stop offset="50%" stop-color="rgba(8,23,38,0.2)"/>
      <stop offset="100%" stop-color="rgba(8,23,38,0)"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="1080" fill="url(#sky)"/>
  <ellipse cx="668" cy="722" rx="160" ry="130" fill="url(#sun)"/>

  <g opacity="0.18" stroke="#f0a030" stroke-width="2">
    <line x1="668" y1="722" x2="820" y2="580"/>
    <line x1="668" y1="722" x2="850" y2="640"/>
    <line x1="668" y1="722" x2="860" y2="700"/>
    <line x1="668" y1="722" x2="840" y2="760"/>
    <line x1="668" y1="722" x2="800" y2="820"/>
    <line x1="668" y1="722" x2="750" y2="850"/>
    <line x1="668" y1="722" x2="580" y2="840"/>
    <line x1="668" y1="722" x2="500" y2="820"/>
    <line x1="668" y1="722" x2="460" y2="760"/>
    <line x1="668" y1="722" x2="470" y2="680"/>
    <line x1="668" y1="722" x2="510" y2="610"/>
    <line x1="668" y1="722" x2="570" y2="565"/>
  </g>

  <rect x="0" y="660" width="1080" height="420" fill="url(#oceanGrad)" filter="url(#oceanFilter)"/>
  <rect x="0" y="660" width="1080" height="420" fill="url(#shimmer)"/>

  <polygon points="0,1080 0,780 60,750 100,740 140,755 190,730 260,720 320,738 380,718 430,740 460,760 480,810 500,830 520,810 540,820 560,800 600,815 640,800 680,790 700,800 720,810 740,800 760,780 780,795 820,785 860,810 900,820 940,800 980,820 1010,810 1030,800 1080,820 1080,1080" fill="#0d1117"/>
  <polygon points="0,1080 0,840 50,820 90,815 120,830 160,810 200,825 240,840 280,820 310,835 330,850 350,840 370,860 400,845 430,855 460,870 500,855 540,860 570,850 600,860 620,855 640,870 660,860 680,875 700,870 720,880 740,870 760,860 800,875 840,870 880,885 910,875 940,890 970,880 1000,875 1030,885 1080,880 1080,1080" fill="#080c12"/>

  <g fill="#0d1a10">
    <polygon points="40,780 70,680 100,780"/>
    <polygon points="50,730 70,660 90,730"/>
    <rect x="63" y="780" width="14" height="30" fill="#0a1208"/>
    <polygon points="90,800 125,690 160,800"/>
    <polygon points="100,750 125,670 150,750"/>
    <rect x="118" y="800" width="14" height="30" fill="#0a1208"/>
    <polygon points="150,790 178,710 206,790"/>
    <polygon points="158,748 178,695 198,748"/>
    <rect x="171" y="790" width="14" height="25" fill="#0a1208"/>
    <polygon points="195,805 222,700 249,805"/>
    <polygon points="203,758 222,682 241,758"/>
    <rect x="215" y="805" width="14" height="28" fill="#0a1208"/>
    <polygon points="230,795 258,715 286,795"/>
    <polygon points="238,752 258,698 278,752"/>
    <rect x="251" y="795" width="14" height="26" fill="#0a1208"/>
    <polygon points="270,810 300,720 330,810"/>
    <polygon points="280,762 300,702 320,762"/>
    <rect x="293" y="810" width="14" height="28" fill="#0a1208"/>
    <polygon points="308,800 335,705 362,800"/>
    <rect x="328" y="800" width="14" height="25" fill="#0a1208"/>
    <polygon points="20,800 44,720 68,800" fill="#0a1408" opacity="0.7"/>
  </g>

  <rect x="395" y="650" width="32" height="120" fill="#e8e0d0" rx="2"/>
  <rect x="395" y="690" width="32" height="18" fill="#cc2222"/>
  <rect x="388" y="645" width="46" height="12" fill="#c8c0b0" rx="1"/>
  <polygon points="396,615 422,615 426,648 392,648" fill="#333"/>
  <rect x="398" y="620" width="26" height="22" fill="#88ccff" opacity="0.6"/>
  <polygon points="393,615 409,600 425,615" fill="#555"/>
  <circle cx="409" cy="630" r="5" fill="#fff8c0" opacity="0.95"/>

  <polygon points="409,625 750,380 850,490 440,650" fill="url(#beamGrad)" opacity="0.08" filter="url(#beamFilter)"/>

  <rect x="0" y="550" width="1080" height="200" fill="url(#fogGrad)" filter="url(#hazeFilter)" opacity="0.7"/>

  <rect width="1080" height="1080" fill="url(#textOverlay)"/>
</svg>

${GRAD_BAR}

<div style="position:absolute;top:30px;right:40px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:200">${EHO_EL}</div>

<div style="position:absolute;bottom:80px;left:80px;z-index:200;max-width:760px">
  <div style="font-family:'Playfair Display',serif;font-size:96px;font-weight:900;color:#fff;line-height:1.0;margin-bottom:24px;text-shadow:0 4px 30px rgba(0,0,0,0.6)">
    Southern Maine's<br>mortgage broker.
  </div>
  <div style="font-family:'DM Sans',sans-serif;font-size:32px;font-weight:400;color:#CBD5E1;margin-bottom:16px;letter-spacing:0.02em">
    Kennebunk &middot; 20+ lenders &middot; one call
  </div>
  <div style="font-family:'DM Sans',sans-serif;font-size:28px;font-weight:600;color:#1DB89A;letter-spacing:0.03em">
    (207) 468-6998
  </div>
</div>

${FOOTER_EL}
</body>
</html>`;
}

// POST 2 - G-golden-coast.png
function post2() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#1a0533;position:relative}
</style>
</head>
<body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0">
  <defs>
    <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a0533"/>
      <stop offset="12%" stop-color="#2e0a52"/>
      <stop offset="24%" stop-color="#4a1060"/>
      <stop offset="36%" stop-color="#6e2040"/>
      <stop offset="48%" stop-color="#a03020"/>
      <stop offset="58%" stop-color="#d4541a"/>
      <stop offset="68%" stop-color="#e87030"/>
      <stop offset="78%" stop-color="#f0b040"/>
      <stop offset="89%" stop-color="#f5cc70"/>
      <stop offset="100%" stop-color="#f8dea0"/>
    </linearGradient>
    <linearGradient id="ocean2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a1530"/>
      <stop offset="50%" stop-color="#0c1e3a"/>
      <stop offset="100%" stop-color="#050d1a"/>
    </linearGradient>
    <linearGradient id="shimmer2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f0b040" stop-opacity="0"/>
      <stop offset="30%" stop-color="#f0b040" stop-opacity="0.4"/>
      <stop offset="55%" stop-color="#ffe090" stop-opacity="0.7"/>
      <stop offset="70%" stop-color="#f0b040" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#f0b040" stop-opacity="0"/>
    </linearGradient>
    <filter id="cloudBlur">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
    <filter id="waterF">
      <feTurbulence type="turbulence" baseFrequency="0.01 0.025" numOctaves="3" seed="5" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.04
                                            0 0 0 0 0.10
                                            0 0 0 0 0.22
                                            0 0 0 1.2 -0.2" in="noise" result="cn"/>
      <feComposite in="cn" in2="SourceGraphic" operator="in" result="mn"/>
      <feBlend in="mn" in2="SourceGraphic" mode="overlay"/>
    </filter>
    <filter id="foamBlur">
      <feGaussianBlur stdDeviation="2"/>
    </filter>
    <linearGradient id="darkOverlay2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(10,5,20,0.4)"/>
      <stop offset="45%" stop-color="rgba(10,5,20,0.1)"/>
      <stop offset="65%" stop-color="rgba(5,13,26,0.5)"/>
      <stop offset="100%" stop-color="rgba(5,13,26,0.9)"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="620" fill="url(#sky2)"/>

  <g filter="url(#cloudBlur)" opacity="0.5">
    <ellipse cx="200" cy="120" rx="160" ry="50" fill="rgba(255,200,100,0.2)"/>
    <ellipse cx="180" cy="100" rx="120" ry="35" fill="rgba(255,180,80,0.15)"/>
    <ellipse cx="550" cy="80" rx="200" ry="45" fill="rgba(255,200,100,0.18)"/>
    <ellipse cx="530" cy="65" rx="150" ry="30" fill="rgba(255,180,80,0.12)"/>
    <ellipse cx="850" cy="140" rx="140" ry="40" fill="rgba(255,200,100,0.16)"/>
    <ellipse cx="900" cy="200" rx="100" ry="32" fill="rgba(255,180,80,0.13)"/>
  </g>

  <rect x="0" y="560" width="1080" height="520" fill="url(#ocean2)" filter="url(#waterF)"/>

  <path d="M 300,580 Q 540,560 780,585 Q 860,590 950,580 L 950,640 Q 860,625 780,635 Q 540,648 300,620 Z"
        fill="url(#shimmer2)" opacity="0.65"/>
  <path d="M 400,600 Q 540,588 680,602 Q 720,605 760,600 L 760,618 Q 720,622 680,618 Q 540,606 400,620 Z"
        fill="#ffe090" opacity="0.3"/>

  <path d="M 0,640 Q 80,610 160,625 Q 220,615 280,605 Q 340,595 400,610 Q 440,600 500,608 Q 560,598 600,612 Q 640,600 700,615 Q 740,605 800,620 Q 860,608 900,622 Q 950,610 1000,625 Q 1040,615 1080,630 L 1080,1080 L 0,1080 Z"
        fill="#1a2810"/>

  <path d="M 0,640 Q 80,610 160,625 Q 220,615 280,605 Q 340,595 400,610 Q 440,600 500,608 Q 560,598 600,612 Q 640,600 700,615 Q 740,605 800,620 Q 860,608 900,622 Q 950,610 1000,625 Q 1040,615 1080,630"
        fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="3" filter="url(#foamBlur)"/>

  <g fill="#0f1c10">
    <polygon points="820,640 840,570 860,640"/>
    <polygon points="828,600 840,555 852,600"/>
    <rect x="833" y="640" width="14" height="22"/>
    <polygon points="855,648 872,585 889,648"/>
    <polygon points="862,610 872,572 882,610"/>
    <rect x="865" y="648" width="14" height="20"/>
    <polygon points="885,642 905,572 925,642"/>
    <polygon points="893,600 905,558 917,600"/>
    <rect x="898" y="642" width="14" height="22"/>
    <polygon points="915,650 932,590 949,650"/>
    <rect x="925" y="650" width="14" height="20"/>
    <polygon points="945,645 962,578 979,645"/>
    <rect x="955" y="645" width="14" height="22"/>
    <polygon points="975,652 995,582 1015,652"/>
    <rect x="988" y="652" width="14" height="20"/>
  </g>

  <rect width="1080" height="1080" fill="url(#darkOverlay2)"/>
</svg>

${GRAD_BAR}

<div style="position:absolute;top:30px;right:40px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:200">${EHO_EL}</div>

<div style="position:absolute;bottom:90px;left:50%;transform:translateX(-50%);z-index:200;
     width:820px;background:rgba(8,23,38,0.78);backdrop-filter:blur(20px);
     -webkit-backdrop-filter:blur(20px);border-radius:20px;padding:52px 60px 48px;
     border:1px solid rgba(29,184,154,0.18)">
  <div style="font-family:'Playfair Display',serif;font-size:88px;font-weight:900;color:#fff;line-height:1.0;margin-bottom:22px">
    Kennebunk is<br>moving fast.
  </div>
  <div style="font-family:'DM Sans',sans-serif;font-size:30px;font-weight:300;color:#CBD5E1;line-height:1.4">
    Summer inventory moves in days. Get pre-approved.
  </div>
  <div style="margin-top:22px;font-family:'DM Sans',sans-serif;font-size:26px;font-weight:600;color:#1DB89A">
    (207) 468-6998
  </div>
</div>

${FOOTER_EL}
</body>
</html>`;
}

// POST 3 - H-headshot-cinematic.png
function post3() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#0d0d0d;position:relative;font-family:'DM Sans',sans-serif}
</style>
</head>
<body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <radialGradient id="tealWash" cx="15%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.15"/>
      <stop offset="60%" stop-color="#1DB89A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="greenWash" cx="90%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#4ADE80" stop-opacity="0"/>
    </radialGradient>
    <filter id="grainFilter" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
      <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended"/>
      <feComposite in="blended" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <rect width="1080" height="1080" fill="#0d0d0d"/>
  <rect width="1080" height="1080" fill="url(#tealWash)"/>
  <rect width="1080" height="1080" fill="url(#greenWash)"/>
  <rect width="1080" height="1080" fill="#888" filter="url(#grainFilter)" opacity="0.03"/>
</svg>

<div style="position:absolute;top:0;left:0;width:594px;height:1080px;z-index:2;overflow:hidden">
  <img src="${HEADSHOT}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"/>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;
    background:linear-gradient(to right, rgba(13,13,13,0) 0%, rgba(13,13,13,0) 45%, rgba(13,13,13,0.7) 70%, rgba(13,13,13,1) 88%)">
  </div>
  <div style="position:absolute;bottom:0;left:0;width:100%;height:300px;
    background:linear-gradient(to top, rgba(13,13,13,0.92) 0%, transparent 100%)">
  </div>
</div>

<div style="position:absolute;top:0;right:0;width:560px;height:1080px;z-index:10;
     display:flex;flex-direction:column;justify-content:center;padding:60px 52px 80px 40px">
  <div style="display:inline-block;background:rgba(29,184,154,0.18);border:1px solid rgba(29,184,154,0.4);
       border-radius:20px;padding:7px 18px;margin-bottom:32px;align-self:flex-start">
    <span style="font-size:11px;font-weight:600;color:#1DB89A;letter-spacing:0.15em;text-transform:uppercase">
      BAXTER MORTGAGE &middot; KENNEBUNK ME
    </span>
  </div>

  <div style="font-family:'Playfair Display',serif;font-size:82px;font-weight:900;color:#fff;line-height:1.05;margin-bottom:24px">
    I pick up<br>the phone.
  </div>

  <div style="width:60px;height:3px;background:#1DB89A;margin-bottom:28px"></div>

  <div style="font-size:26px;font-weight:300;color:#CBD5E1;line-height:1.5;margin-bottom:32px">
    Mortgage broker. 20+ lenders.<br>York County's local expert.
  </div>

  <div style="font-size:34px;font-weight:700;color:#1DB89A;margin-bottom:12px;letter-spacing:0.02em">
    (207) 468-6998
  </div>

  <div style="font-size:18px;font-weight:400;color:rgba(255,255,255,0.75);letter-spacing:0.01em">
    derek@baxtermortgage.com
  </div>
</div>

${GRAD_BAR}

<div style="position:absolute;top:30px;right:52px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:52px;z-index:200">${EHO_EL}</div>

${FOOTER_EL}
</body>
</html>`;
}

// POST 4 - I-myth-cinematic.png
function post4() {
  const checkRows = [
    '3% conventional',
    '3.5% FHA',
    '0% USDA (some York County areas qualify)',
    'Down payment assistance can stack on top'
  ].map(text => `
    <div style="display:flex;align-items:center;gap:20px">
      <div style="width:36px;height:36px;border-radius:50%;background:#1DB89A;display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="20" height="20" viewBox="0 0 20 20"><polyline points="4,10 8,14 16,6" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <span style="font-family:'DM Sans',sans-serif;font-size:30px;font-weight:400;color:#fff">${text}</span>
    </div>`).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#0a0f1e;position:relative;font-family:'DM Sans',sans-serif}
</style>
</head>
<body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <radialGradient id="spotlight4" cx="25%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#3a1a2a" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#1a0f2e" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0a0f1e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1080" height="1080" fill="#0a0f1e"/>
  <g transform="rotate(12, 540, 540)" opacity="0.15">
    <rect x="440" y="-50" width="200" height="1180" rx="20" fill="#2d0505"/>
    <rect x="-50" y="440" width="1180" height="200" rx="20" fill="#2d0505"/>
  </g>
  <rect width="1080" height="595" fill="url(#spotlight4)"/>
</svg>

<div style="position:absolute;top:0;left:0;width:1080px;height:595px;z-index:10;
     display:flex;flex-direction:column;justify-content:center;padding:60px 80px 40px">

  <div style="display:inline-block;background:#dc2626;border-radius:20px;padding:8px 28px;margin-bottom:38px;align-self:flex-start">
    <span style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:700;color:#fff;letter-spacing:0.12em;text-transform:uppercase">MYTH</span>
  </div>

  <div style="position:relative;align-self:flex-start">
    <div style="font-family:'Playfair Display',serif;font-size:80px;font-weight:900;font-style:italic;
         background:linear-gradient(to bottom, #fff 0%, #d0d8e8 100%);
         -webkit-background-clip:text;-webkit-text-fill-color:transparent;
         background-clip:text;line-height:1.1">
      You need 20% down.
    </div>
    <div style="position:absolute;top:50%;left:-20px;right:-20px;height:9px;background:#ef4444;
         transform:translateY(-50%) rotate(-2deg);border-radius:4px;opacity:0.95;margin-top:4px"></div>
  </div>
</div>

<div style="position:absolute;top:595px;left:0;width:1080px;height:2px;
     background:linear-gradient(90deg,transparent,#1DB89A,#4ADE80,transparent);z-index:20"></div>

<div style="position:absolute;bottom:0;left:0;width:1080px;height:485px;z-index:10;
     background:rgba(4,30,14,0.92);padding:40px 80px 70px">

  <div style="display:inline-block;background:rgba(29,184,154,0.2);border:1.5px solid #1DB89A;
       border-radius:20px;padding:7px 24px;margin-bottom:30px">
    <span style="font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;color:#4ADE80;
         letter-spacing:0.15em;text-transform:uppercase">THE TRUTH</span>
  </div>

  <div style="display:flex;flex-direction:column;gap:16px">
    ${checkRows}
  </div>
</div>

${GRAD_BAR}

<div style="position:absolute;top:30px;right:40px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:200">${EHO_EL}</div>

${FOOTER_EL}
</body>
</html>`;
}

// POST 5 - J-broker-network.png
function post5() {
  const nodes = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const r = 300 + (Math.sin(i * 2.3) * 80);
    const x = 540 + Math.cos(angle) * r;
    const y = 540 + Math.sin(angle) * r;
    const size = 8 + Math.sin(i * 1.7 + 0.5) * 4;
    nodes.push({ x, y, size, i });
  }

  const nodesSvg = nodes.map(n =>
    `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.size.toFixed(1)}" fill="rgba(29,184,154,0.5)"/>`
  ).join('\n    ');

  const linesSvg = nodes.map(n =>
    `<line x1="540" y1="540" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" stroke="rgba(29,184,154,0.15)" stroke-width="1"/>`
  ).join('\n    ');

  const crossLines = [];
  for (let i = 0; i < 24; i++) {
    const j = (i + 3) % 24;
    crossLines.push(`<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="rgba(29,184,154,0.1)" stroke-width="0.8"/>`);
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#081726;position:relative;font-family:'DM Sans',sans-serif}
</style>
</head>
<body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <radialGradient id="networkHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(29,184,154,0)" stop-opacity="0"/>
      <stop offset="28%" stop-color="#1DB89A" stop-opacity="0.12"/>
      <stop offset="70%" stop-color="rgba(29,184,154,0)" stop-opacity="0"/>
    </radialGradient>
    <filter id="networkBlur">
      <feGaussianBlur stdDeviation="0.5"/>
    </filter>
  </defs>
  <rect width="1080" height="1080" fill="#081726"/>
  <circle cx="540" cy="540" r="480" fill="url(#networkHalo)"/>
  <g filter="url(#networkBlur)">
    ${linesSvg}
    ${crossLines.join('\n    ')}
  </g>
  ${nodesSvg}
  <circle cx="540" cy="540" r="48" fill="#fff"/>
  <text x="540" y="548" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="32" font-weight="700" fill="#081726">D</text>
</svg>

<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;
     background:radial-gradient(circle at 50% 50%, rgba(8,23,38,0.1) 0%, rgba(8,23,38,0.5) 70%);z-index:2"></div>

<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;z-index:10;
     display:flex;flex-direction:column;align-items:center;justify-content:center">

  <div style="font-family:'Playfair Display',serif;font-size:280px;font-weight:900;line-height:0.85;
       background:linear-gradient(135deg,#1DB89A,#4ADE80);
       -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
       margin-bottom:4px">
    20+
  </div>

  <div style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:400;
       color:rgba(255,255,255,0.5);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:2px">
    WHOLESALE
  </div>
  <div style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:400;
       color:rgba(255,255,255,0.5);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:20px">
    LENDERS
  </div>

  <div style="width:80px;height:1px;background:#fff;opacity:0.4;margin-bottom:20px"></div>

  <div style="font-family:'Playfair Display',serif;font-size:64px;font-weight:700;color:#fff;line-height:1.1;text-align:center">
    One broker.
  </div>
  <div style="font-family:'Playfair Display',serif;font-size:64px;font-weight:700;color:#1DB89A;line-height:1.1;text-align:center">
    Dozens of options.
  </div>
</div>

${GRAD_BAR}

<div style="position:absolute;top:30px;right:40px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:200">${EHO_EL}</div>

${FOOTER_EL}
</body>
</html>`;
}

// POST 6 - K-closing-day.png
function post6() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#0f0a06;position:relative;font-family:'DM Sans',sans-serif}
</style>
</head>
<body>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <radialGradient id="amberCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(217,119,6,0.12)"/>
      <stop offset="100%" stop-color="rgba(217,119,6,0)"/>
    </radialGradient>
    <radialGradient id="goldHighlight" cx="70%" cy="20%" r="45%">
      <stop offset="0%" stop-color="rgba(251,191,36,0.08)"/>
      <stop offset="100%" stop-color="rgba(251,191,36,0)"/>
    </radialGradient>
    <filter id="houseBlur">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="#0f0a06"/>
  <rect width="1080" height="1080" fill="url(#amberCenter)"/>
  <rect width="1080" height="1080" fill="url(#goldHighlight)"/>

  <g filter="url(#houseBlur)" opacity="0.9">
    <rect x="240" y="580" width="600" height="350" fill="rgba(217,119,6,0.06)" rx="4"/>
    <polygon points="190,580 540,340 890,580" fill="rgba(217,119,6,0.06)"/>
    <rect x="490" y="760" width="100" height="170" fill="rgba(217,119,6,0.04)" rx="4"/>
    <rect x="310" y="660" width="120" height="100" fill="rgba(217,119,6,0.04)" rx="4"/>
    <rect x="650" y="660" width="120" height="100" fill="rgba(217,119,6,0.04)" rx="4"/>
  </g>
</svg>

<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;z-index:2;
     background:linear-gradient(to bottom, rgba(15,10,6,0.6) 0%, rgba(15,10,6,0.3) 40%, rgba(15,10,6,0.7) 100%)">
</div>

<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;z-index:10;
     display:flex;flex-direction:column;justify-content:center;padding:80px 90px 80px">

  <div style="display:inline-block;background:rgba(217,119,6,0.2);border:1px solid rgba(251,191,36,0.4);
       border-radius:20px;padding:7px 22px;margin-bottom:36px;align-self:flex-start">
    <span style="font-size:13px;font-weight:600;color:#fbbf24;letter-spacing:0.14em;text-transform:uppercase">THE MOMENT</span>
  </div>

  <div style="font-family:'Playfair Display',serif;font-size:80px;font-weight:900;font-style:italic;
       line-height:1.05;margin-bottom:28px;
       background:linear-gradient(135deg,#fff 0%,#fde68a 60%,#f59e0b 100%);
       -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
    You get<br>the keys.
  </div>

  <div style="width:70px;height:3px;background:linear-gradient(90deg,#f59e0b,#fbbf24);
       margin-bottom:30px;border-radius:2px"></div>

  <div style="font-size:26px;font-weight:300;color:#CBD5E1;line-height:1.6;margin-bottom:44px">
    Sign the papers. Hand over the check.<br>
    Then someone hands you a key.<br>
    That's what I work toward every time.
  </div>

  <div style="display:inline-block;align-self:flex-start">
    <div style="background:#0a1628;border:1.5px solid rgba(251,191,36,0.3);border-radius:50px;
         padding:16px 40px;display:inline-block">
      <span style="font-family:'DM Sans',sans-serif;font-size:22px;font-weight:500;color:#fbbf24">
        Let's get you there - baxtermortgage.com
      </span>
    </div>
  </div>
</div>

${GRAD_BAR}

<div style="position:absolute;top:30px;right:40px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:200">${EHO_EL}</div>

${FOOTER_EL}
</body>
</html>`;
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const posts = [
    { fn: post1, file: 'F-lighthouse-hero.png' },
    { fn: post2, file: 'G-golden-coast.png' },
    { fn: post3, file: 'H-headshot-cinematic.png' },
    { fn: post4, file: 'I-myth-cinematic.png' },
    { fn: post5, file: 'J-broker-network.png' },
    { fn: post6, file: 'K-closing-day.png' },
  ];

  for (const { fn, file } of posts) {
    try {
      console.log(`Rendering ${file}...`);
      await renderPost(browser, fn(), file);
    } catch (err) {
      console.error(`Error rendering ${file}:`, err.message);
    }
  }

  await browser.close();
  console.log('\nDone! Files in:', OUT);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
