const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BRAND = path.resolve(__dirname, '../../brand');
const LOGO_WHITE = `data:image/svg+xml;base64,${fs.readFileSync(path.join(BRAND, 'Baxter_Logo_White.svg')).toString('base64')}`;
const LOGO_DARK = `data:image/svg+xml;base64,${fs.readFileSync(path.join(BRAND, 'Baxter_Logo_Dark.svg')).toString('base64')}`;

const FOOTER_TEXT = 'Derek Smith NMLS# 2810853 | Baxter Mortgage, LLC NMLS# 2752768 | Equal Housing Opportunity';

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// EHO_White_Transparent.png / EHO_Navy_Transparent.png in the brand kit are corrupt
// (solid-color rectangles with no logo content), so render the standard HUD
// Equal Housing Opportunity house-and-equal-sign mark inline as SVG instead.
function ehoBadge(color) {
  return `
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,6 95,42 84,42 84,90 16,90 16,42 5,42" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="34" y="50" width="32" height="6" fill="${color}"/>
    <rect x="34" y="64" width="32" height="6" fill="${color}"/>
  </svg>`;
}

// ---------- Layered vector scenes (Local Spotlight series) ----------
function pineRow(y, scale, color, count, spread, seed) {
  let trees = '';
  for (let i = 0; i < count; i++) {
    const x = (i * spread) + (seed % spread) - 40;
    const h = 70 * scale + ((i * 17 + seed) % 30);
    const w = h * 0.55;
    trees += `<path d="M${x},${y} L${x - w / 2},${y + h} L${x + w / 2},${y + h} Z" fill="${color}"/>`;
  }
  return trees;
}

function scene(type) {
  if (type === 'coast') {
    return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1E3A5F"/>
          <stop offset="55%" stop-color="#0E2438"/>
          <stop offset="100%" stop-color="#081726"/>
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#4ADE80" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="sun2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#1DB89A" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.30"/>
          <stop offset="100%" stop-color="#081726" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#sky)"/>
      <circle cx="170" cy="430" r="280" fill="url(#sun2)"/>
      <circle cx="820" cy="380" r="320" fill="url(#sun)"/>
      <path d="M0,640 Q220,560 480,615 T1080,590 V780 H0 Z" fill="#13314f" opacity="0.85"/>
      <path d="M0,720 Q260,650 560,705 T1080,680 V900 H0 Z" fill="#1E3A5F"/>
      ${pineRow(700, 1, '#16324f', 14, 85, 7)}
      <rect x="0" y="780" width="1080" height="300" fill="url(#water)"/>
      <g stroke="#4ADE80" stroke-opacity="0.18" stroke-width="3">
        <line x1="40" y1="840" x2="320" y2="840"/>
        <line x1="420" y1="880" x2="760" y2="880"/>
        <line x1="120" y1="920" x2="500" y2="920"/>
        <line x1="600" y1="960" x2="1020" y2="960"/>
        <line x1="60" y1="1000" x2="380" y2="1000"/>
        <line x1="500" y1="1040" x2="980" y2="1040"/>
      </g>
      <g transform="translate(860,560)">
        <polygon points="-60,260 60,260 90,340 -90,340" fill="#0c2235"/>
        <rect x="-22" y="60" width="44" height="200" fill="#F8F9FA"/>
        <rect x="-22" y="120" width="44" height="22" fill="#1E3A5F"/>
        <rect x="-22" y="170" width="44" height="22" fill="#1E3A5F"/>
        <polygon points="-28,60 28,60 0,10" fill="#DC2626"/>
        <rect x="-34" y="44" width="68" height="18" fill="#1E3A5F"/>
        <circle cx="0" cy="34" r="14" fill="#4ADE80" opacity="0.9"/>
        <circle cx="0" cy="34" r="34" fill="#4ADE80" opacity="0.18"/>
      </g>
      <g stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6">
        <path d="M120,180 q14,-14 28,0 q14,-14 28,0"/>
        <path d="M260,240 q12,-12 24,0 q12,-12 24,0"/>
        <path d="M380,150 q16,-16 32,0 q16,-16 32,0"/>
      </g>
    </svg>`;
  }
  // 'river' - mill-town river scene for Saco / Biddeford / Westbrook
  return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E3A5F"/>
        <stop offset="55%" stop-color="#0E2438"/>
        <stop offset="100%" stop-color="#081726"/>
      </linearGradient>
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.40"/>
        <stop offset="100%" stop-color="#1DB89A" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#4ADE80" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2563EB" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#081726" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect width="1080" height="1080" fill="url(#sky2)"/>
    <circle cx="850" cy="360" r="300" fill="url(#glow1)"/>
    <circle cx="200" cy="420" r="280" fill="url(#glow2)"/>
    <g fill="#13314f">
      <rect x="40" y="480" width="160" height="280" />
      <rect x="210" y="420" width="190" height="340" />
      <rect x="420" y="500" width="140" height="260" />
      <rect x="580" y="440" width="210" height="320" />
      <rect x="810" y="500" width="230" height="260" />
    </g>
    <g fill="#1E3A5F">
      <rect x="60" y="500" width="120" height="260" />
      <rect x="230" y="440" width="150" height="320" />
      <rect x="440" y="520" width="100" height="240" />
      <rect x="600" y="460" width="170" height="300" />
      <rect x="830" y="520" width="190" height="240" />
      <rect x="330" y="320" width="30" height="120" />
    </g>
    <g fill="#4ADE80" opacity="0.5">
      ${Array.from({length: 24}).map((_,i) => {
        const x = 80 + (i % 8) * 110;
        const y = 540 + Math.floor(i/8) * 70;
        return `<rect x="${x}" y="${y}" width="22" height="32"/>`;
      }).join('')}
    </g>
    <rect x="0" y="760" width="1080" height="320" fill="url(#river)"/>
    <g stroke="#2563EB" stroke-opacity="0.25" stroke-width="3">
      <line x1="60" y1="830" x2="380" y2="830"/>
      <line x1="460" y1="870" x2="820" y2="870"/>
      <line x1="120" y1="920" x2="520" y2="920"/>
      <line x1="620" y1="960" x2="1000" y2="960"/>
      <line x1="80" y1="1010" x2="420" y2="1010"/>
    </g>
    <g fill="none" stroke="#0c2235" stroke-width="18">
      <path d="M120,780 Q300,680 480,780"/>
      <path d="M480,780 Q660,680 840,780"/>
      <path d="M840,780 Q1020,680 1180,780"/>
    </g>
  </svg>`;
}

// ---------- Southern Maine map illustration (used on posts 1 & 6) ----------
function mapScene(mode, accent) {
  // mode: 'home' (highlight Kennebunk as home base) | 'dpa' (highlight all towns as eligible)
  accent = accent || '#1DB89A';
  const towns = [
    { name: 'Portland',      x: 840, y: 90 },
    { name: 'Westbrook',     x: 700, y: 150 },
    { name: 'Saco',          x: 790, y: 320 },
    { name: 'Biddeford',     x: 720, y: 420 },
    { name: 'Kennebunk',     x: 660, y: 580 },
    { name: 'Kennebunkport', x: 770, y: 660 },
    { name: 'Wells',         x: 600, y: 800 },
  ];
  const pins = towns.map(t => {
    const isHome = mode === 'home' && t.name === 'Kennebunk';
    const r = isHome ? 16 : (mode === 'dpa' ? 12 : 9);
    const fill = isHome ? '#4ADE80' : (mode === 'dpa' ? accent : '#1DB89A');
    const labelSize = isHome ? 26 : 22;
    const labelWeight = isHome ? '700' : '500';
    return `
      <g>
        ${isHome ? `<circle cx="${t.x}" cy="${t.y}" r="${r + 14}" fill="#4ADE80" opacity="0.18"/>` : ''}
        ${mode === 'dpa' ? `<circle cx="${t.x}" cy="${t.y}" r="${r + 10}" fill="${accent}" opacity="0.16"/>` : ''}
        <circle cx="${t.x}" cy="${t.y}" r="${r}" fill="${fill}"/>
        <circle cx="${t.x}" cy="${t.y}" r="${r}" fill="none" stroke="#081726" stroke-width="3"/>
        <text x="${t.x - r - 14}" y="${t.y + 8}" text-anchor="end" font-family="DM Sans" font-size="${labelSize}" font-weight="${labelWeight}" fill="#E2E8F0">${t.name}${isHome ? '  (HQ)' : ''}</text>
      </g>`;
  }).join('');
  return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <radialGradient id="mapglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${mode === 'dpa' ? accent : '#1DB89A'}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${mode === 'dpa' ? accent : '#1DB89A'}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="720" cy="420" r="480" fill="url(#mapglow)"/>
    <!-- coastline: land to the left, ocean to the right -->
    <path d="M1080,0 L1080,1080 L500,1080 Q620,900 560,760 Q500,640 600,560 Q680,480 640,380 Q600,260 700,160 Q780,80 760,0 Z"
          fill="#0E2438" opacity="0.9"/>
    <path d="M1080,0 L1080,1080 L500,1080 Q620,900 560,760 Q500,640 600,560 Q680,480 640,380 Q600,260 700,160 Q780,80 760,0 Z"
          fill="none" stroke="${mode === 'dpa' ? accent : '#1DB89A'}" stroke-width="3" stroke-opacity="0.4"/>
    ${pins}
  </svg>`;
}

// ---------- Myth Buster background: faint X / check watermarks + diagonal grid ----------
function mythScene() {
  const diag = Array.from({ length: 26 }).map((_, i) => {
    const o = i * 70 - 700;
    return `<line x1="${o}" y1="1080" x2="${o + 1080}" y2="0"/>`;
  }).join('');
  return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <radialGradient id="mythRed" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#DC2626" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="mythGreen" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#4ADE80" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1080" height="1080" fill="#081726"/>
    <circle cx="950" cy="110" r="380" fill="url(#mythRed)"/>
    <circle cx="110" cy="990" r="440" fill="url(#mythGreen)"/>
    <g stroke="#E2E8F0" stroke-opacity="0.045" stroke-width="2">${diag}</g>
    <text x="930" y="290" font-family="Playfair Display, serif" font-size="320" font-weight="900" fill="#DC2626" opacity="0.14" text-anchor="middle">&#10005;</text>
    <text x="150" y="990" font-family="Playfair Display, serif" font-size="320" font-weight="900" fill="#4ADE80" opacity="0.16" text-anchor="middle">&#10003;</text>
  </svg>`;
}

// ---------- "20+ lenders" network graph background ----------
function networkScene() {
  const cx = 800, cy = 540;
  let lines = '', nodes = '';
  const count = 22;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = 250 + (i % 4) * 80;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r * 0.92;
    lines += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#1DB89A" stroke-opacity="0.20" stroke-width="2"/>`;
    const rr = i % 3 === 0 ? 9 : 6;
    const fill = i % 3 === 0 ? '#4ADE80' : '#1DB89A';
    nodes += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr}" fill="${fill}" opacity="0.7"/>`;
  }
  return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <radialGradient id="netglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.24"/>
        <stop offset="100%" stop-color="#1DB89A" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1080" height="1080" fill="#081726"/>
    <circle cx="${cx}" cy="${cy}" r="480" fill="url(#netglow)"/>
    ${lines}
    ${nodes}
    <circle cx="${cx}" cy="${cy}" r="46" fill="#0E2438" stroke="#4ADE80" stroke-width="4"/>
    <circle cx="${cx}" cy="${cy}" r="66" fill="none" stroke="#4ADE80" stroke-opacity="0.35" stroke-width="2"/>
  </svg>`;
}

// ---------- "From application to keys" winding road background ----------
function roadScene() {
  const path = 'M-150,1250 C150,950 60,760 380,560 C680,370 560,160 880,-120';
  return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <radialGradient id="roadglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1DB89A" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#1DB89A" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1080" height="1080" fill="#081726"/>
    <circle cx="880" cy="160" r="400" fill="url(#roadglow)"/>
    <path d="${path}" fill="none" stroke="#13314f" stroke-width="200" stroke-linecap="round"/>
    <path d="${path}" fill="none" stroke="#4ADE80" stroke-width="5" stroke-dasharray="34 34" opacity="0.30" stroke-linecap="round"/>
  </svg>`;
}

// ---------- Refinance "cycle" orbit background ----------
function orbitScene() {
  const cx = 800, cy = 520;
  const dots = [0, 1, 2].map(i => {
    const r = 230 + i * 150;
    const angle = (i * 65 + 20) * Math.PI / 180;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="#2563EB" opacity="0.55"/>`;
  }).join('');
  return `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <radialGradient id="orbglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#2563EB" stop-opacity="0.24"/>
        <stop offset="100%" stop-color="#2563EB" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1080" height="1080" fill="#081726"/>
    <circle cx="${cx}" cy="${cy}" r="500" fill="url(#orbglow)"/>
    <circle cx="${cx}" cy="${cy}" r="200" fill="none" stroke="#2563EB" stroke-opacity="0.20" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="350" fill="none" stroke="#2563EB" stroke-opacity="0.14" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="500" fill="none" stroke="#2563EB" stroke-opacity="0.09" stroke-width="2"/>
    ${dots}
  </svg>`;
}

const posts = [
  // ---------------- 1. Mon 6/15 - Meet Your Lender ----------------
  {
    file: '01-mon-0615-intro.png',
    layout: 'billboard',
    bgType: 'map-home',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'Meet Your Lender',
    hook: "Southern Maine's\nmortgage\nbroker.",
    sub: 'Kennebunk · 20+ lenders · one call',
    cta: '@dereklends · baxtermortgage.com · (207) 468-6998',
  },
  // ---------------- 2. Tue 6/16 - Myth Buster ----------------
  {
    file: '02-tue-0616-myth.png',
    layout: 'myth-split',
    bgType: 'myth-bg',
    accent: '#E2E8F0',
    accent2: '#4ADE80',
    gradientBar: 'linear-gradient(90deg, #DC2626, #4ADE80, #1E3A5F)',
    category: 'Myth Buster',
    mythLine: '"You need 20% down to buy."',
    factLines: ['3% conventional', '3.5% FHA', '0% USDA (some areas)', 'DPA can stack on top'],
    cta: 'DM me · I\'ll run your numbers for free',
  },
  // ---------------- 3. Wed 6/17 - Local Spotlight: Kennebunk ----------------
  {
    file: '03-wed-0617-local-kennebunk.png',
    layout: 'scene-billboard',
    bgType: 'scene-coast',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'Local Spotlight',
    hook: 'Kennebunk is\nmoving fast.',
    sub: 'Summer inventory doesn\'t wait. Get pre-approved first.',
    cta: 'DM me to start your pre-approval this week',
  },
  // ---------------- 4. Thu 6/18 - Pre-qualified vs Pre-approved ----------------
  {
    file: '04-thu-0618-preapproval.png',
    layout: 'split-compare',
    theme: 'light',
    bgType: 'light-grid',
    accent: '#2563EB',
    accent2: '#1DB89A',
    emColor: '#2563EB',
    category: 'Know the Difference',
    compare: [
      { label: 'Pre-Qualified', accent: '#94A3B8', icon: 'clock', blurb: 'An estimate. Not verified.', tag: 'Not Enough' },
      { label: 'Pre-Approved', accent: '#2563EB', icon: 'check', blurb: 'Docs reviewed. Credit pulled.', tag: 'Offer Ready' },
    ],
    cta: 'Pre-approval costs nothing. DM me.',
  },
  // ---------------- 5. Fri 6/19 - Why Work With Me ----------------
  {
    file: '05-fri-0619-valueprop.png',
    layout: 'hero-stat',
    bgType: 'network',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'Why Work With Me',
    statNumber: '20+',
    statSub: 'wholesale lenders',
    hook: 'One broker.\nDozens of options.',
    cta: '@dereklends · baxtermortgage.com',
  },
  // ---------------- 6. Mon 6/22 - First-Time Buyers / DPA ----------------
  {
    file: '06-mon-0622-dpa.png',
    layout: 'billboard',
    bgType: 'map-dpa',
    accent: '#D97706',
    accent2: '#4ADE80',
    gradientBar: 'linear-gradient(90deg, #D97706, #4ADE80, #1E3A5F)',
    category: 'First-Time Buyers',
    hook: 'Down payment\nhelp is\nout there.',
    sub: 'Eligible first-time buyers across York County & Southern Maine',
    cta: 'DM me to see what programs you may qualify for -- no cost',
  },
  // ---------------- 7. Tue 6/23 - Credit Tips ----------------
  {
    file: '07-tue-0623-credit.png',
    layout: 'bold-tips',
    theme: 'paper',
    bgType: 'light-paper',
    accent: '#D97706',
    accent2: '#1DB89A',
    gradientBar: 'linear-gradient(90deg, #D97706, #1DB89A, #1E3A5F)',
    category: 'Credit Tips',
    hook: '3 rules\nbefore you\napply.',
    tips: [
      "Don't touch your credit cards.",
      'Skip big purchases until after closing.',
      'Pay everything on time. Every time.',
    ],
    cta: 'Worried about your credit? DM me before you start searching.',
  },
  // ---------------- 8. Wed 6/24 - Local Spotlight: Saco/Biddeford/Westbrook ----------------
  {
    file: '08-wed-0624-local-saco.png',
    layout: 'scene-billboard',
    bgType: 'scene-river',
    accent: '#2563EB',
    accent2: '#1DB89A',
    gradientBar: 'linear-gradient(90deg, #2563EB, #1DB89A, #1E3A5F)',
    category: 'Local Spotlight',
    hook: 'More home.\nSame commute.',
    sub: 'Saco · Biddeford · Westbrook',
    cta: 'DM me to run your numbers in these towns',
  },
  // ---------------- 9. Thu 6/25 - Process Timeline ----------------
  {
    file: '09-thu-0625-process.png',
    layout: 'clean-steps',
    bgType: 'road',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'How It Works',
    hook: '5 steps to\nclosing day.',
    steps: ['Application', 'Underwriting', 'Conditional Approval', 'Clear to Close', 'Closing Day'],
    cta: 'I walk you through every one. Ready? Let\'s talk.',
  },
  // ---------------- 10. Fri 6/26 - Refinance Check-In ----------------
  {
    file: '10-fri-0626-refi.png',
    layout: 'billboard',
    bgType: 'orbit',
    accent: '#2563EB',
    accent2: '#1DB89A',
    gradientBar: 'linear-gradient(90deg, #2563EB, #1DB89A, #1E3A5F)',
    category: 'Refinance Check-In',
    hook: 'Bought in\n2022-2024?',
    sub: 'Your options may look different now. Let me run the numbers -- free.',
    cta: 'Free comparison · No obligation · DM me',
  },
];

// ---------- Small icon set ----------
function icon(name, color) {
  const icons = {
    clock: `<circle cx="24" cy="24" r="20" fill="none" stroke="${color}" stroke-width="4"/><path d="M24,12 V24 L33,29" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    check: `<circle cx="24" cy="24" r="20" fill="none" stroke="${color}" stroke-width="4"/><path d="M14,25 L21,32 L35,16" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  return icons[name] || '';
}

function html(post) {
  const accent = post.accent || '#1DB89A';
  const accent2 = post.accent2 || '#4ADE80';
  const gradientBar = post.gradientBar || `linear-gradient(90deg, ${accent}, ${accent2}, #1E3A5F)`;

  // ----- theme / logo -----
  const theme = post.theme || 'dark';
  const logo = (theme === 'light' || theme === 'paper') ? LOGO_DARK : LOGO_WHITE;
  const ehoColor = (theme === 'light' || theme === 'paper') ? '#1E3A5F' : '#E2E8F0';
  const footerBorder = (theme === 'light' || theme === 'paper') ? 'rgba(30,58,95,0.12)' : 'rgba(255,255,255,0.10)';
  const ctaColor = (theme === 'light' || theme === 'paper') ? '#1E3A5F' : '#fff';
  const metaColor = (theme === 'light' || theme === 'paper') ? '#64748B' : '#64748B';

  // ----- background layer -----
  let bgLayer = '';
  switch (post.bgType) {
    case 'map-home':
      bgLayer = `<div class="scene-bg" style="opacity:0.9;">${mapScene('home')}</div><div class="map-overlay"></div>`;
      break;
    case 'map-dpa':
      bgLayer = `<div class="scene-bg" style="opacity:0.9;">${mapScene('dpa', accent)}</div><div class="map-overlay"></div>`;
      break;
    case 'myth-bg':
      bgLayer = `<div class="scene-bg">${mythScene()}</div><div class="myth-overlay"></div>`;
      break;
    case 'scene-coast':
      bgLayer = `<div class="scene-bg">${scene('coast')}</div><div class="scene-overlay"></div>`;
      break;
    case 'scene-river':
      bgLayer = `<div class="scene-bg">${scene('river')}</div><div class="scene-overlay"></div>`;
      break;
    case 'network':
      bgLayer = `<div class="scene-bg">${networkScene()}</div><div class="scene-overlay"></div>`;
      break;
    case 'road':
      bgLayer = `<div class="scene-bg">${roadScene()}</div><div class="scene-overlay"></div>`;
      break;
    case 'orbit':
      bgLayer = `<div class="scene-bg">${orbitScene()}</div><div class="scene-overlay"></div>`;
      break;
    default:
      bgLayer = '';
  }

  // ----- per-layout content + extra styles -----
  let contentInner = '';
  let extraStyle = '';

  // ------------------------------------------------------------------ billboard
  if (post.layout === 'billboard') {
    const hookLines = post.hook.split('\n').map(l => `<span style="display:block;">${l}</span>`).join('');
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="hook">${hookLines}</div>
      <div class="accent-rule"></div>
      <div class="sub">${post.sub}</div>`;
    extraStyle = `
      .hook {
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:118px; line-height:1.0;
        color:#fff;
        text-shadow: 0 4px 32px rgba(8,23,38,0.7);
        margin-bottom:28px;
        letter-spacing:-2px;
      }
      .accent-rule {
        width:160px; height:4px;
        background:linear-gradient(90deg, ${accent}, ${accent2});
        border-radius:2px; margin-bottom:30px;
      }
      .sub {
        font-size:38px; font-weight:400; color:#CBD5E1; line-height:1.3;
        max-width:820px;
      }
    `;
  }

  // ---------------------------------------------------------------- myth-split
  if (post.layout === 'myth-split') {
    const factBullets = post.factLines.map(f =>
      `<div class="fact-bullet"><span class="fact-arrow">&#8594;</span>${f}</div>`
    ).join('');
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="myth-panel myth-panel-myth">
        <div class="panel-label panel-label-myth">THE MYTH</div>
        <div class="myth-line">${post.mythLine}</div>
      </div>
      <div class="myth-divider"></div>
      <div class="myth-panel myth-panel-fact">
        <div class="panel-label panel-label-fact">THE TRUTH</div>
        <div class="fact-list">${factBullets}</div>
      </div>`;
    extraStyle = `
      .myth-panel { padding:32px 36px 32px 48px; position:relative; }
      .myth-panel-myth { border-left:6px solid #DC2626; margin-bottom:0; }
      .myth-panel-fact { border-left:6px solid #4ADE80; }
      .myth-divider { height:2px; background:linear-gradient(90deg, rgba(220,38,38,0.4), rgba(74,222,128,0.4)); margin:6px 0; }
      .panel-label { font-size:22px; font-weight:700; letter-spacing:5px; text-transform:uppercase; margin-bottom:16px; }
      .panel-label-myth { color:#DC2626; }
      .panel-label-fact { color:#4ADE80; }
      .myth-line {
        font-family:'Playfair Display', serif; font-style:italic;
        font-size:48px; color:#94A3B8;
        text-decoration:line-through; text-decoration-color:rgba(220,38,38,0.55);
        line-height:1.25;
      }
      .fact-list { display:flex; flex-direction:column; gap:12px; }
      .fact-bullet { font-size:32px; font-weight:500; color:#E2E8F0; line-height:1.2; }
      .fact-arrow { color:#4ADE80; margin-right:14px; font-style:normal; }
    `;
  }

  // -------------------------------------------------------------- scene-billboard
  if (post.layout === 'scene-billboard') {
    const hookLines = post.hook.split('\n').map(l => `<span style="display:block;">${l}</span>`).join('');
    contentInner = `
      <div class="glass-panel">
        <div class="pill">${post.category}</div>
        <div class="hook">${hookLines}</div>
        <div class="accent-rule"></div>
        <div class="sub">${post.sub}</div>
      </div>`;
    extraStyle = `
      .glass-panel {
        background:rgba(8,23,38,0.72); border-radius:16px;
        padding:48px 56px; display:inline-block; max-width:880px;
      }
      .hook {
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:110px; line-height:1.0;
        color:#fff;
        text-shadow: 0 4px 28px rgba(8,23,38,0.9);
        margin-bottom:28px;
        letter-spacing:-2px;
      }
      .accent-rule {
        width:140px; height:4px;
        background:linear-gradient(90deg, ${accent}, ${accent2});
        border-radius:2px; margin-bottom:26px;
      }
      .sub {
        font-size:34px; font-weight:400; color:#CBD5E1; line-height:1.3;
        max-width:740px;
      }
    `;
  }

  // -------------------------------------------------------------- split-compare
  if (post.layout === 'split-compare') {
    const cards = post.compare.map(c => `
      <div class="cmp-card">
        <div class="cmp-top-bar" style="background:${c.accent};"></div>
        <div class="cmp-body">
          <div class="cmp-icon">
            <svg width="72" height="72" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${icon(c.icon, c.accent)}</svg>
          </div>
          <div class="cmp-label" style="color:${c.accent};">${c.label}</div>
          <div class="cmp-blurb">${c.blurb}</div>
          <div class="cmp-tag" style="background:${hexToRgba(c.accent, 0.12)}; border:1px solid ${c.accent}; color:${c.accent};">${c.tag}</div>
        </div>
      </div>`).join('');
    contentInner = `
      <div class="pill" style="background:${hexToRgba(accent, 0.10)}; border-color:${accent}; color:${accent};">${post.category}</div>
      <div class="cmp-row">${cards}</div>`;
    extraStyle = `
      .cmp-row { display:flex; gap:36px; margin-top:24px; }
      .cmp-card {
        flex:1; background:#fff; border-radius:16px;
        box-shadow:0 12px 40px rgba(30,58,95,0.10);
        overflow:hidden;
      }
      .cmp-top-bar { height:8px; width:100%; }
      .cmp-body { padding:44px 40px 44px 40px; display:flex; flex-direction:column; gap:0; }
      .cmp-icon { margin-bottom:22px; }
      .cmp-label {
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:52px; line-height:1.05;
        margin-bottom:18px;
      }
      .cmp-blurb { font-size:26px; color:#475569; line-height:1.4; margin-bottom:28px; }
      .cmp-tag {
        display:inline-block; padding:9px 22px;
        border-radius:999px; font-size:20px; font-weight:700;
        letter-spacing:2px; text-transform:uppercase;
        width:fit-content;
      }
    `;
  }

  // ----------------------------------------------------------------- hero-stat
  if (post.layout === 'hero-stat') {
    const hookLines = post.hook.split('\n').map(l => `<span style="display:block;">${l}</span>`).join('');
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="stat-wrap">
        <div class="stat-num">${post.statNumber}</div>
        <div class="stat-sub">${post.statSub.toUpperCase()}</div>
        <div class="stat-divider"></div>
        <div class="stat-hook">${hookLines}</div>
      </div>`;
    extraStyle = `
      .stat-wrap { display:flex; flex-direction:column; align-items:flex-start; }
      .stat-num {
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:300px; line-height:0.85;
        background:linear-gradient(90deg, ${accent}, ${accent2});
        -webkit-background-clip:text; background-clip:text; color:transparent;
        letter-spacing:-8px;
      }
      .stat-sub {
        font-size:24px; font-weight:700; letter-spacing:6px;
        color:#94A3B8; margin-top:8px; margin-bottom:20px;
      }
      .stat-divider {
        width:200px; height:2px;
        background:${hexToRgba(accent, 0.35)};
        margin-bottom:24px;
      }
      .stat-hook {
        font-size:52px; font-weight:600; color:#fff;
        line-height:1.15; max-width:700px;
      }
    `;
  }

  // ----------------------------------------------------------------- bold-tips
  if (post.layout === 'bold-tips') {
    const hookLines = post.hook.split('\n').map(l => `<span style="display:block;">${l}</span>`).join('');
    const tipRows = post.tips.map((t, i) => `
      <div class="tip-row">
        <div class="tip-circle">${i + 1}</div>
        <div class="tip-text">${t}</div>
      </div>`).join('');
    contentInner = `
      <div class="pill" style="background:${hexToRgba(accent, 0.12)}; border-color:${accent}; color:${accent};">${post.category}</div>
      <div class="hook-text">${hookLines}</div>
      <div class="tip-list">${tipRows}</div>`;
    extraStyle = `
      .hook-text {
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:80px; line-height:1.0; color:#1E3A5F;
        margin-bottom:36px; letter-spacing:-1px;
      }
      .tip-list { display:flex; flex-direction:column; gap:28px; }
      .tip-row { display:flex; align-items:center; gap:28px; }
      .tip-circle {
        flex:0 0 80px; width:80px; height:80px; border-radius:50%;
        border:3px solid ${accent}; color:${accent};
        display:flex; align-items:center; justify-content:center;
        font-family:'Playfair Display', serif; font-weight:900; font-size:28px;
        background:${hexToRgba(accent, 0.08)};
      }
      .tip-text { font-size:34px; font-weight:500; color:#1E3A5F; line-height:1.25; }
    `;
  }

  // --------------------------------------------------------------- clean-steps
  if (post.layout === 'clean-steps') {
    const hookLines = post.hook.split('\n').map(l => `<span style="display:block;">${l}</span>`).join('');
    const stepItems = post.steps.map((s, i) => `
      <div class="step-item">
        <div class="step-circle">${i + 1}</div>
        <div class="step-label">${s}</div>
      </div>`).join('');
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="hook">${hookLines}</div>
      <div class="steps-row">
        <div class="steps-line"></div>
        ${stepItems}
      </div>`;
    extraStyle = `
      .hook {
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:90px; line-height:1.0; color:#fff;
        text-shadow: 0 4px 28px rgba(8,23,38,0.8);
        margin-bottom:52px; letter-spacing:-2px;
      }
      .steps-row {
        position:relative; display:flex;
        justify-content:space-between; align-items:flex-start;
      }
      .steps-line {
        position:absolute; top:40px; left:40px; right:40px;
        height:3px; background:${hexToRgba(accent, 0.30)}; z-index:0;
      }
      .step-item {
        position:relative; z-index:1;
        display:flex; flex-direction:column; align-items:center;
        width:170px;
      }
      .step-circle {
        width:80px; height:80px; border-radius:50%;
        background:#0E2438; border:3px solid ${accent};
        display:flex; align-items:center; justify-content:center;
        font-family:'Playfair Display', serif; font-weight:900;
        font-size:36px; color:${accent2};
        margin-bottom:16px;
      }
      .step-label {
        font-size:22px; text-align:center; color:#CBD5E1;
        font-weight:600; line-height:1.3;
      }
    `;
  }

  // ================================================================ HTML shell
  const bodyClass = (theme === 'paper') ? 'light paper' : theme;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:1080px; height:1080px; }
body {
  font-family:'DM Sans', sans-serif;
  background-color:#081726; color:#fff;
  position:relative; overflow:hidden;
}
body.light {
  background-color:#F8F9FA; color:#1E3A5F;
}
body.paper {
  background-color:#FDFCF7; color:#1E3A5F;
  background-image:
    repeating-linear-gradient(0deg, rgba(30,58,95,0.08) 0px, rgba(30,58,95,0.08) 2px, transparent 2px, transparent 64px),
    linear-gradient(90deg, transparent 0, transparent 130px, rgba(220,38,38,0.22) 130px, rgba(220,38,38,0.22) 133px, transparent 133px);
}
.gradient-bar {
  position:absolute; top:0; left:0; right:0; height:12px;
  background:${gradientBar}; z-index:3;
}
.scene-bg { position:absolute; inset:0; z-index:0; }
.scene-overlay {
  position:absolute; inset:0; z-index:1;
  background: linear-gradient(180deg, rgba(8,23,38,0.45) 0%, rgba(8,23,38,0.60) 45%, rgba(8,23,38,0.95) 100%);
}
.scene-overlay-dark {
  position:absolute; inset:0; z-index:1;
  background: rgba(8,23,38,0.62);
}
.map-overlay {
  position:absolute; inset:0; z-index:1;
  background: linear-gradient(90deg, rgba(8,23,38,0.97) 0%, rgba(8,23,38,0.85) 45%, rgba(8,23,38,0.35) 100%);
}
.myth-overlay {
  position:absolute; inset:0; z-index:1;
  background: linear-gradient(180deg, rgba(8,23,38,0.35) 0%, rgba(8,23,38,0.05) 45%, rgba(8,23,38,0.35) 100%);
}
.header {
  position:relative; z-index:3;
  display:flex; justify-content:space-between; align-items:center;
  padding: 52px 64px 0 64px;
}
.header img.logo { height:52px; }
.eho-badge {
  display:flex; align-items:center; gap:10px;
  font-size:18px; font-weight:600; letter-spacing:1px;
  color:${ehoColor};
}
.content {
  position:absolute; top:180px; bottom:160px; left:0; right:0;
  display:flex; flex-direction:column; justify-content:center;
  padding: 0 70px; z-index:3;
}
.pill {
  display:inline-block;
  background:${hexToRgba(accent, 0.14)}; border:1px solid ${accent}; color:${accent};
  padding:10px 26px; border-radius:999px;
  font-size:22px; font-weight:700; letter-spacing:3px; text-transform:uppercase;
  margin-bottom:30px; width:fit-content;
}
.footer {
  position:absolute; bottom:0; left:0; right:0; z-index:3;
  padding: 28px 64px 34px 64px;
  border-top:1px solid ${footerBorder};
}
.cta {
  font-size:26px; font-weight:600; color:${ctaColor};
  margin-bottom:12px; line-height:1.4; max-width:950px;
}
.meta {
  display:flex; justify-content:space-between; align-items:center;
  font-size:17px; color:${metaColor};
}
.meta .handle { color:${accent}; font-weight:600; }
.meta .legal { text-align:right; max-width:620px; }
${extraStyle}
</style>
</head>
<body class="${bodyClass}">
  ${bgLayer}
  <div class="gradient-bar"></div>
  <div class="header">
    <img class="logo" src="${logo}" />
    <div class="eho-badge">${ehoBadge(ehoColor)}<span>EQUAL HOUSING<br/>OPPORTUNITY</span></div>
  </div>
  <div class="content">
    ${contentInner}
  </div>
  <div class="footer">
    <div class="cta">${post.cta}</div>
    <div class="meta">
      <div class="handle">@dereklends &middot; baxtermortgage.com &middot; (207) 468-6998</div>
      <div class="legal">${FOOTER_TEXT}</div>
    </div>
  </div>
</body>
</html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const post of posts) {
    await page.setContent(html(post), { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);
    const outPath = path.join(__dirname, post.file);
    await page.screenshot({ path: outPath });
    console.log('wrote', outPath);
  }
  await browser.close();
})();
