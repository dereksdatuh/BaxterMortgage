'use strict';

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// ─── Paths ────────────────────────────────────────────────────────────────────
const KIT = '/home/user/BaxterMortgage/brand/kit-upload';
const CONFIG_PATH = path.join(__dirname, 'config.json');
const OUT_DIR = path.join(__dirname, 'output');

// ─── Brand assets (base64) ────────────────────────────────────────────────────
const LOGO_WHITE = 'data:image/svg+xml;base64,' + Buffer.from(fs.readFileSync(`${KIT}/Baxter_Logo_White.svg`)).toString('base64');
const EHO_WHITE  = 'data:image/png;base64,'      + fs.readFileSync(`${KIT}/EHO_White_Transparent.png`).toString('base64');
const HEADSHOT   = 'data:image/png;base64,'       + fs.readFileSync(`${KIT}/Headshot.png`).toString('base64');

// ─── Config ───────────────────────────────────────────────────────────────────
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

// ─── Shared HTML fragments ────────────────────────────────────────────────────
const FONTS    = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');`;
const GRAD_BAR = `<div style="position:absolute;top:0;left:0;width:100%;height:5px;background:linear-gradient(90deg,#1DB89A,#4ADE80,#1E3A5F);z-index:100"></div>`;
const LOGO_EL  = `<img src="${LOGO_WHITE}" style="width:140px;display:block">`;
const EHO_EL   = `<img src="${EHO_WHITE}"  style="width:56px;opacity:0.85;display:block">`;
const FOOTER_EL = `<div style="position:absolute;bottom:0;left:0;width:100%;text-align:center;font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.5);padding:8px 0 6px;z-index:100;box-sizing:border-box">${config.brand.footer}</div>`;

// ─── Parse CLI args ───────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

// ─── Template: JAB ───────────────────────────────────────────────────────────
// Cinematic bank vs broker contrast
function jabTemplate(opts) {
  const { myth, truth } = opts;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1080px;overflow:hidden;background:#080c14;position:relative;font-family:'DM Sans',sans-serif}
</style>
</head>
<body>

<!-- Faint opposing-arrows watermark -->
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg"
     style="position:absolute;top:0;left:0;z-index:1;opacity:0.05;transform:rotate(15deg);pointer-events:none">
  <!-- Up arrow -->
  <polygon points="540,60 640,220 590,220 590,520 490,520 490,220 440,220" fill="#ffffff"/>
  <!-- Down arrow -->
  <polygon points="540,1020 440,860 490,860 490,560 590,560 590,860 640,860" fill="#ffffff"/>
</svg>

<!-- TOP panel — bank side (48%) -->
<div style="position:absolute;top:0;left:0;width:1080px;height:518px;z-index:10;
     background:rgba(127,29,29,0.4);
     display:flex;flex-direction:column;justify-content:center;padding:60px 80px 40px">
  <div style="display:inline-block;background:rgba(120,120,120,0.3);border:1px solid rgba(180,180,180,0.3);
       border-radius:20px;padding:6px 22px;margin-bottom:28px;align-self:flex-start">
    <span style="font-size:13px;font-weight:700;color:rgba(200,200,200,0.9);letter-spacing:0.18em;text-transform:uppercase">BANK</span>
  </div>
  <div style="position:relative;align-self:flex-start">
    <div style="font-family:'Playfair Display',serif;font-size:64px;font-weight:700;font-style:italic;
         color:rgba(255,255,255,0.6);line-height:1.15;white-space:pre-line">
${myth}
    </div>
    <!-- Red strikethrough overlay -->
    <div style="position:absolute;top:50%;left:-10px;right:-10px;height:8px;
         background:#DC2626;transform:translateY(-50%) rotate(-1.5deg);
         border-radius:4px;opacity:0.9;margin-top:4px"></div>
  </div>
</div>

<!-- Divider gradient line -->
<div style="position:absolute;top:518px;left:0;width:1080px;height:2px;
     background:linear-gradient(90deg,transparent,#DC2626,#1DB89A,transparent);z-index:20"></div>

<!-- BOTTOM panel — broker side (52%) -->
<div style="position:absolute;top:520px;left:0;width:1080px;height:560px;z-index:10;
     background:rgba(4,40,30,0.4);
     display:flex;flex-direction:column;justify-content:center;padding:40px 80px 70px">
  <div style="display:inline-block;background:rgba(29,184,154,0.2);border:1.5px solid #1DB89A;
       border-radius:20px;padding:6px 22px;margin-bottom:28px;align-self:flex-start">
    <span style="font-size:13px;font-weight:700;color:#1DB89A;letter-spacing:0.18em;text-transform:uppercase">BROKER</span>
  </div>
  <div style="font-family:'Playfair Display',serif;font-size:56px;font-weight:900;
       color:#ffffff;line-height:1.2;margin-bottom:32px;white-space:pre-line">
${truth}
  </div>
  <div style="font-family:'DM Sans',sans-serif;font-size:24px;font-weight:600;color:#1DB89A;letter-spacing:0.02em">
    (207) 468-6998
  </div>
</div>

${GRAD_BAR}
<div style="position:absolute;top:30px;right:40px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:200">${EHO_EL}</div>
${FOOTER_EL}
</body>
</html>`;
}

// ─── Template: EDUCATION ──────────────────────────────────────────────────────
// Clean dark with teal accent and grid overlay
function educationTemplate(opts) {
  const { hook, sub, items } = opts;

  const listHtml = items && items.length ? items.map((item, i) => `
    <div style="display:flex;align-items:center;gap:20px;margin-bottom:16px">
      <div style="width:40px;height:40px;border-radius:50%;background:#1DB89A;display:flex;align-items:center;
           justify-content:center;flex-shrink:0;font-family:'DM Sans',sans-serif;font-size:18px;font-weight:700;color:#081726">
        ${i + 1}
      </div>
      <span style="font-family:'DM Sans',sans-serif;font-size:28px;font-weight:400;color:#fff;line-height:1.4">${item}</span>
    </div>`).join('') : '';

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

<!-- Subtle grid overlay -->
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg"
     style="position:absolute;top:0;left:0;z-index:1;pointer-events:none">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(29,184,154,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1080" height="1080" fill="url(#grid)"/>
  <!-- Subtle teal glow top-left -->
  <radialGradient id="glow1" cx="0%" cy="0%" r="60%">
    <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="#1DB89A" stop-opacity="0"/>
  </radialGradient>
  <rect width="1080" height="1080" fill="url(#glow1)"/>
</svg>

<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;z-index:10;
     display:flex;flex-direction:column;justify-content:center;padding:80px 90px 80px">

  <!-- Category pill -->
  <div style="display:inline-block;background:rgba(29,184,154,0.18);border:1px solid rgba(29,184,154,0.5);
       border-radius:20px;padding:7px 22px;margin-bottom:36px;align-self:flex-start">
    <span style="font-size:13px;font-weight:700;color:#1DB89A;letter-spacing:0.16em;text-transform:uppercase">MORTGAGE EDUCATION</span>
  </div>

  <!-- Hook -->
  <div style="font-family:'Playfair Display',serif;font-size:88px;font-weight:900;color:#fff;
       line-height:1.0;margin-bottom:24px">
    ${hook}
  </div>

  <!-- Sub -->
  <div style="font-size:30px;font-weight:300;color:#64748B;line-height:1.5;margin-bottom:${listHtml ? '36px' : '44px'}">
    ${sub}
  </div>

  ${listHtml ? `<div style="margin-bottom:44px">${listHtml}</div>` : ''}

  <!-- CTA -->
  <div style="display:inline-block;align-self:flex-start">
    <div style="background:rgba(29,184,154,0.12);border:1.5px solid rgba(29,184,154,0.35);
         border-radius:50px;padding:14px 36px;display:inline-block">
      <span style="font-size:22px;font-weight:600;color:#1DB89A">
        DM me — I'll run your numbers for free.
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

// ─── Template: LOCAL ──────────────────────────────────────────────────────────
// Cinematic Maine coastal scene with glass card
function localTemplate(opts) {
  const { hook, sub } = opts;

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

<!-- Maine coastal scene SVG -->
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg"
     style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <linearGradient id="skyLocal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#060b18"/>
      <stop offset="15%"  stop-color="#0a1228"/>
      <stop offset="35%"  stop-color="#0f1e40"/>
      <stop offset="55%"  stop-color="#1a2e55"/>
      <stop offset="72%"  stop-color="#1e3a6a"/>
      <stop offset="88%"  stop-color="#2563a0"/>
      <stop offset="100%" stop-color="#2e78b8"/>
    </linearGradient>
    <linearGradient id="oceanLocal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0a2040"/>
      <stop offset="50%"  stop-color="#0c2a50"/>
      <stop offset="100%" stop-color="#060f20"/>
    </linearGradient>
    <radialGradient id="moonGlow" cx="72%" cy="18%" r="14%">
      <stop offset="0%"   stop-color="#e8f4ff" stop-opacity="0.9"/>
      <stop offset="25%"  stop-color="#c0d8f0" stop-opacity="0.4"/>
      <stop offset="60%"  stop-color="#8ab0d8" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#6090c0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="shimmerLocal" cx="72%" cy="0%" r="70%">
      <stop offset="0%"   stop-color="#c0d8f0" stop-opacity="0.22"/>
      <stop offset="40%"  stop-color="#8ab0d8" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#6090c0" stop-opacity="0"/>
    </radialGradient>
    <filter id="waterLocal">
      <feTurbulence type="turbulence" baseFrequency="0.009 0.022" numOctaves="4" seed="7" result="noise"/>
      <feColorMatrix type="matrix"
        values="0 0 0 0 0.04 0 0 0 0 0.12 0 0 0 0 0.28 0 0 0 1.4 -0.3"
        in="noise" result="cn"/>
      <feComposite in="cn" in2="SourceGraphic" operator="in" result="mn"/>
      <feBlend in="mn" in2="SourceGraphic" mode="overlay"/>
    </filter>
    <linearGradient id="darkVignetteLocal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="rgba(6,11,24,0.55)"/>
      <stop offset="40%"  stop-color="rgba(6,11,24,0.15)"/>
      <stop offset="70%"  stop-color="rgba(6,11,24,0.5)"/>
      <stop offset="100%" stop-color="rgba(6,11,24,0.88)"/>
    </linearGradient>
    <filter id="starBlur"><feGaussianBlur stdDeviation="0.6"/></filter>
  </defs>

  <!-- Sky -->
  <rect width="1080" height="1080" fill="url(#skyLocal)"/>

  <!-- Stars -->
  <g filter="url(#starBlur)" opacity="0.7">
    <circle cx="120" cy="80"  r="1.2" fill="#fff"/>
    <circle cx="250" cy="55"  r="1.0" fill="#fff"/>
    <circle cx="380" cy="100" r="1.4" fill="#fff"/>
    <circle cx="480" cy="40"  r="0.9" fill="#fff"/>
    <circle cx="600" cy="75"  r="1.1" fill="#fff"/>
    <circle cx="700" cy="30"  r="1.3" fill="#fff"/>
    <circle cx="820" cy="65"  r="0.8" fill="#fff"/>
    <circle cx="160" cy="150" r="1.0" fill="#d8eaff"/>
    <circle cx="320" cy="165" r="1.2" fill="#d8eaff"/>
    <circle cx="450" cy="130" r="0.9" fill="#d8eaff"/>
    <circle cx="550" cy="170" r="1.1" fill="#d8eaff"/>
    <circle cx="900" cy="120" r="1.0" fill="#fff"/>
    <circle cx="980" cy="90"  r="1.3" fill="#fff"/>
    <circle cx="1030" cy="55" r="0.8" fill="#fff"/>
    <circle cx="50"  cy="200" r="1.0" fill="#fff"/>
    <circle cx="850" cy="200" r="1.2" fill="#d8eaff"/>
    <circle cx="1050" cy="170" r="0.9" fill="#fff"/>
    <circle cx="200" cy="240" r="1.1" fill="#d8eaff"/>
    <circle cx="680" cy="140" r="0.8" fill="#fff"/>
  </g>

  <!-- Moon -->
  <circle cx="778" cy="195" r="44" fill="#d8eeff" opacity="0.92"/>
  <circle cx="788" cy="188" r="38" fill="#0f1e40"/>
  <rect width="1080" height="1080" fill="url(#moonGlow)"/>

  <!-- Ocean -->
  <rect x="0" y="600" width="1080" height="480" fill="url(#oceanLocal)" filter="url(#waterLocal)"/>
  <rect x="0" y="600" width="1080" height="480" fill="url(#shimmerLocal)"/>

  <!-- Shoreline / land masses -->
  <polygon points="0,1080 0,760 80,740 150,748 220,730 300,720 380,738 450,718 500,735 540,750 570,730 620,742 680,728 720,740 760,725 800,738 850,745 900,730 950,748 1010,738 1060,745 1080,742 1080,1080"
           fill="#0c1015"/>
  <polygon points="0,1080 0,830 60,812 120,828 170,815 230,830 280,820 330,840 380,828 430,842 480,835 520,845 560,838 600,848 640,840 680,855 720,845 760,860 800,848 840,858 880,850 930,862 970,852 1010,862 1080,856 1080,1080"
           fill="#08090d"/>

  <!-- Pine silhouettes left bank -->
  <g fill="#0a1208">
    <polygon points="30,760 54,672 78,760"/>
    <polygon points="38,718 54,652 70,718"/>
    <rect x="47" y="760" width="14" height="28" fill="#08100a"/>
    <polygon points="75,772 98,682 121,772"/>
    <polygon points="82,728 98,664 114,728"/>
    <rect x="91" y="772" width="14" height="26" fill="#08100a"/>
    <polygon points="118,764 140,678 162,764"/>
    <polygon points="125,722 140,660 155,722"/>
    <rect x="133" y="764" width="14" height="24" fill="#08100a"/>
    <polygon points="155,775 178,688 201,775"/>
    <rect x="170" y="775" width="14" height="26" fill="#08100a"/>
    <polygon points="195,768 218,685 241,768"/>
    <polygon points="202,728 218,668 234,728"/>
    <rect x="211" y="768" width="14" height="25" fill="#08100a"/>
  </g>

  <!-- Pine silhouettes right bank -->
  <g fill="#0a1208">
    <polygon points="870,748 895,658 920,748"/>
    <polygon points="878,705 895,640 912,705"/>
    <rect x="888" y="748" width="14" height="28" fill="#08100a"/>
    <polygon points="915,755 938,668 961,755"/>
    <polygon points="922,712 938,652 954,712"/>
    <rect x="931" y="755" width="14" height="26" fill="#08100a"/>
    <polygon points="956,748 978,660 1000,748"/>
    <rect x="970" y="748" width="14" height="26" fill="#08100a"/>
    <polygon points="995,758 1018,670 1041,758"/>
    <polygon points="1003,715 1018,655 1033,715"/>
    <rect x="1011" y="758" width="14" height="25" fill="#08100a"/>
  </g>

  <!-- Vignette overlay -->
  <rect width="1080" height="1080" fill="url(#darkVignetteLocal)"/>
</svg>

<!-- Glass morphism card -->
<div style="position:absolute;bottom:100px;left:50%;transform:translateX(-50%);z-index:200;
     width:860px;background:rgba(8,23,38,0.75);backdrop-filter:blur(24px);
     -webkit-backdrop-filter:blur(24px);border-radius:24px;padding:52px 64px 48px;
     border:1px solid rgba(37,99,163,0.25)">

  <!-- Location pill -->
  <div style="display:inline-block;background:rgba(29,184,154,0.18);border:1px solid rgba(29,184,154,0.45);
       border-radius:20px;padding:6px 22px;margin-bottom:28px;align-self:flex-start">
    <span style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;
         color:#1DB89A;letter-spacing:0.16em;text-transform:uppercase">
      YORK COUNTY, MAINE
    </span>
  </div>

  <!-- Hook -->
  <div style="font-family:'Playfair Display',serif;font-size:80px;font-weight:900;color:#fff;
       line-height:1.05;margin-bottom:20px">
    ${hook}
  </div>

  <!-- Sub -->
  <div style="font-family:'DM Sans',sans-serif;font-size:28px;font-weight:300;
       color:#CBD5E1;line-height:1.4;margin-bottom:24px">
    ${sub}
  </div>

  <!-- CTA -->
  <div style="font-family:'DM Sans',sans-serif;font-size:22px;font-weight:600;color:#1DB89A">
    baxtermortgage.com
  </div>
</div>

${GRAD_BAR}
<div style="position:absolute;top:30px;right:40px;z-index:300">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:40px;z-index:300">${EHO_EL}</div>
${FOOTER_EL}
</body>
</html>`;
}

// ─── Template: PERSONAL ───────────────────────────────────────────────────────
// Headshot editorial — headshot left, info right
function personalTemplate(opts) {
  const { hook, sub } = opts;
  const headline = hook || 'I pick up\nthe phone.';
  const bodyCopy = sub || 'Mortgage broker. 20+ lenders.<br>York County\'s local expert.';

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

<!-- Ambient background washes -->
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg"
     style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <radialGradient id="tealWashP" cx="15%" cy="50%" r="55%">
      <stop offset="0%"   stop-color="#1DB89A" stop-opacity="0.15"/>
      <stop offset="60%"  stop-color="#1DB89A" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="greenWashP" cx="90%" cy="30%" r="50%">
      <stop offset="0%"   stop-color="#4ADE80" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#4ADE80" stop-opacity="0"/>
    </radialGradient>
    <filter id="grainP" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="gn"/>
      <feBlend in="SourceGraphic" in2="gn" mode="overlay" result="blended"/>
      <feComposite in="blended" in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <rect width="1080" height="1080" fill="#0d0d0d"/>
  <rect width="1080" height="1080" fill="url(#tealWashP)"/>
  <rect width="1080" height="1080" fill="url(#greenWashP)"/>
  <rect width="1080" height="1080" fill="#888" filter="url(#grainP)" opacity="0.03"/>
</svg>

<!-- Headshot — left 55% -->
<div style="position:absolute;top:0;left:0;width:594px;height:1080px;z-index:2;overflow:hidden">
  <img src="${HEADSHOT}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block"/>
  <!-- Right fade -->
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;
    background:linear-gradient(to right,rgba(13,13,13,0) 0%,rgba(13,13,13,0) 45%,rgba(13,13,13,0.7) 70%,rgba(13,13,13,1) 88%)">
  </div>
  <!-- Bottom fade -->
  <div style="position:absolute;bottom:0;left:0;width:100%;height:300px;
    background:linear-gradient(to top,rgba(13,13,13,0.92) 0%,transparent 100%)">
  </div>
</div>

<!-- Right panel -->
<div style="position:absolute;top:0;right:0;width:560px;height:1080px;z-index:10;
     display:flex;flex-direction:column;justify-content:center;padding:60px 52px 80px 40px">

  <!-- Badge -->
  <div style="display:inline-block;background:rgba(29,184,154,0.18);border:1px solid rgba(29,184,154,0.4);
       border-radius:20px;padding:7px 18px;margin-bottom:32px;align-self:flex-start">
    <span style="font-size:11px;font-weight:600;color:#1DB89A;letter-spacing:0.15em;text-transform:uppercase">
      BAXTER MORTGAGE &middot; KENNEBUNK ME
    </span>
  </div>

  <!-- Headline -->
  <div style="font-family:'Playfair Display',serif;font-size:82px;font-weight:900;color:#fff;
       line-height:1.05;margin-bottom:24px;white-space:pre-line">
${headline}
  </div>

  <!-- Teal rule -->
  <div style="width:60px;height:3px;background:#1DB89A;margin-bottom:28px"></div>

  <!-- Sub copy -->
  <div style="font-size:26px;font-weight:300;color:#CBD5E1;line-height:1.5;margin-bottom:32px">
    ${bodyCopy}
  </div>

  <!-- Phone -->
  <div style="font-size:34px;font-weight:700;color:#1DB89A;margin-bottom:12px;letter-spacing:0.02em">
    ${config.brand.phone}
  </div>

  <!-- Email -->
  <div style="font-size:18px;font-weight:400;color:rgba(255,255,255,0.75);letter-spacing:0.01em">
    ${config.brand.email}
  </div>
</div>

${GRAD_BAR}
<div style="position:absolute;top:30px;right:52px;z-index:200">${LOGO_EL}</div>
<div style="position:absolute;bottom:30px;right:52px;z-index:200">${EHO_EL}</div>
${FOOTER_EL}
</body>
</html>`;
}

// ─── Template: URGENCY ────────────────────────────────────────────────────────
// Warm amber with house watermark
function urgencyTemplate(opts) {
  const { hook, sub } = opts;

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

<!-- House watermark + amber glow -->
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg"
     style="position:absolute;top:0;left:0;z-index:1">
  <defs>
    <radialGradient id="amberCtr" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="rgba(217,119,6,0.12)"/>
      <stop offset="100%" stop-color="rgba(217,119,6,0)"/>
    </radialGradient>
    <radialGradient id="goldHi" cx="70%" cy="20%" r="45%">
      <stop offset="0%"   stop-color="rgba(251,191,36,0.08)"/>
      <stop offset="100%" stop-color="rgba(251,191,36,0)"/>
    </radialGradient>
    <filter id="houseBlurU"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>

  <rect width="1080" height="1080" fill="#0f0a06"/>
  <rect width="1080" height="1080" fill="url(#amberCtr)"/>
  <rect width="1080" height="1080" fill="url(#goldHi)"/>

  <!-- Faint house watermark -->
  <g filter="url(#houseBlurU)" opacity="0.9">
    <rect x="240" y="580" width="600" height="350" fill="rgba(217,119,6,0.06)" rx="4"/>
    <polygon points="190,580 540,340 890,580" fill="rgba(217,119,6,0.06)"/>
    <rect x="490" y="760" width="100" height="170" fill="rgba(217,119,6,0.04)" rx="4"/>
    <rect x="310" y="660" width="120" height="100" fill="rgba(217,119,6,0.04)" rx="4"/>
    <rect x="650" y="660" width="120" height="100" fill="rgba(217,119,6,0.04)" rx="4"/>
  </g>
</svg>

<!-- Overlay -->
<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;z-index:2;
     background:linear-gradient(to bottom,rgba(15,10,6,0.6) 0%,rgba(15,10,6,0.3) 40%,rgba(15,10,6,0.7) 100%)">
</div>

<!-- Content -->
<div style="position:absolute;top:0;left:0;width:1080px;height:1080px;z-index:10;
     display:flex;flex-direction:column;justify-content:center;padding:80px 90px">

  <!-- Amber badge -->
  <div style="display:inline-block;background:rgba(217,119,6,0.2);border:1px solid rgba(251,191,36,0.4);
       border-radius:20px;padding:7px 22px;margin-bottom:36px;align-self:flex-start">
    <span style="font-size:13px;font-weight:600;color:#fbbf24;letter-spacing:0.14em;text-transform:uppercase">
      MARKET ALERT
    </span>
  </div>

  <!-- Italic gradient headline -->
  <div style="font-family:'Playfair Display',serif;font-size:88px;font-weight:900;font-style:italic;
       line-height:1.05;margin-bottom:28px;
       background:linear-gradient(135deg,#fff 0%,#fde68a 60%,#f59e0b 100%);
       -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
    ${hook}
  </div>

  <!-- Amber rule -->
  <div style="width:70px;height:3px;background:linear-gradient(90deg,#f59e0b,#fbbf24);
       margin-bottom:30px;border-radius:2px"></div>

  <!-- Body copy -->
  <div style="font-size:30px;font-weight:300;color:#CBD5E1;line-height:1.6;margin-bottom:44px">
    ${sub}
  </div>

  <!-- CTA button -->
  <div style="display:inline-block;align-self:flex-start">
    <div style="background:#0a1628;border:1.5px solid rgba(251,191,36,0.3);border-radius:50px;
         padding:16px 40px;display:inline-block">
      <span style="font-size:22px;font-weight:500;color:#fbbf24">
        DM me — free analysis → ${config.brand.website}
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

// ─── Render helper ─────────────────────────────────────────────────────────────
async function renderPost(browser, html, outPath) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: outPath, fullPage: false });
  await page.close();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv);

  const type = (args.type || '').toLowerCase();
  if (!type || !['jab','education','local','personal','urgency'].includes(type)) {
    console.error('Usage: node generate-post.js --type <jab|education|local|personal|urgency> [options]');
    console.error('  --hook "text"    Override hook text');
    console.error('  --sub  "text"    Override sub/body text');
    console.error('  --index N        Pick jabTemplate index (jab type only, 0-4)');
    console.error('  --output file    Output filename (optional)');
    process.exit(1);
  }

  // Ensure output dir
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Build output filename
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outFile = args.output
    ? path.join(OUT_DIR, args.output)
    : path.join(OUT_DIR, `${ts}-${type}.png`);

  // Build HTML based on type
  let html;

  if (type === 'jab') {
    const idx   = parseInt(args.index || '0', 10);
    const tpl   = config.jabTemplates[idx] || config.jabTemplates[0];
    const myth  = args.hook || tpl.myth;
    const truth = args.sub  || tpl.truth;
    html = jabTemplate({ myth, truth });

  } else if (type === 'education') {
    const hook  = args.hook || 'What most buyers\nnever get told.';
    const sub   = args.sub  || 'Three things your bank won\'t mention.';
    const items = args.items ? args.items.split('|') : [];
    html = educationTemplate({ hook, sub, items });

  } else if (type === 'local') {
    const hook = args.hook || (config.localHooks[0] || 'Kennebunk is moving fast.');
    const sub  = args.sub  || 'Get pre-approved before you find the one.';
    html = localTemplate({ hook, sub });

  } else if (type === 'personal') {
    const hook = args.hook || null;
    const sub  = args.sub  || null;
    html = personalTemplate({ hook, sub });

  } else if (type === 'urgency') {
    const hook = args.hook || 'Rates shifted\nthis week.';
    const sub  = args.sub  || 'Your window may be open right now. Let me run the numbers — free.';
    html = urgencyTemplate({ hook, sub });
  }

  // Launch browser and render
  console.log(`Launching browser...`);
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  try {
    console.log(`Rendering ${type} post...`);
    await renderPost(browser, html, outFile);
    const size = fs.statSync(outFile).size;
    console.log(`\nOutput: ${outFile}`);
    console.log(`Size:   ${size.toLocaleString()} bytes (${(size / 1024).toFixed(1)} KB)`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
