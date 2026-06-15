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
  // 'river' — mill-town river scene for Saco / Biddeford / Westbrook
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
  // ---------------- 1. Mon 6/15 — Meet Your Lender (map decoration) ----------------
  {
    file: '01-mon-0615-intro.png',
    layout: 'standard',
    bgType: 'map-home',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'Meet Your Lender',
    headline: 'Southern Maine’s mortgage guy who actually <em>picks up the phone</em>',
    body: 'I’m Derek Smith, a local mortgage broker based right here in Kennebunk. I work with 20+ wholesale lenders so I can shop your loan around and find the fit that works for you, not just the one option a single bank hands you.',
    cta: 'New here? Follow along for real talk on buying, refinancing, and the Maine market. Got a question? Send me a DM, I read every one.',
  },
  // ---------------- 2. Tue 6/16 — Myth vs Fact split ----------------
  {
    file: '02-tue-0616-myth.png',
    layout: 'myth',
    bgType: 'myth-bg',
    accent: '#E2E8F0',
    accent2: '#4ADE80',
    gradientBar: 'linear-gradient(90deg, #DC2626, #4ADE80, #1E3A5F)',
    category: 'Myth Buster',
    headline: 'The 20% down payment myth',
    mythText: '"You need 20% down to buy a home, so I can’t afford one yet."',
    factText: 'Conventional loans can go as low as 3% down, FHA as low as 3.5%, and depending on where you’re buying in York County, USDA financing could mean $0 down. Down payment assistance may stack with these too.',
    cta: 'Don’t let this myth keep you on the sidelines. Reach out and I will run your numbers, free, no pressure.',
  },
  // ---------------- 3. Wed 6/17 — Local Spotlight: Kennebunk (scene) ----------------
  {
    file: '03-wed-0617-local-kennebunk.png',
    layout: 'scene',
    bgType: 'scene-coast',
    scene: 'coast',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'Local Spotlight',
    headline: 'Kennebunk & Kennebunkport are <em>heating up</em> for summer',
    body: 'Inventory in York County tends to move fast once the weather turns, especially around Kennebunk, Kennebunkport, and Wells. If you’re thinking about buying this season, getting pre-approved now means you can move the moment the right home hits the market.',
    cta: 'Want to be ready before the next open house? Let’s get your pre-approval started this week.',
  },
  // ---------------- 4. Thu 6/18 — Pre-qualified vs Pre-approved (compare cards) ----------------
  {
    file: '04-thu-0618-preapproval.png',
    layout: 'compare',
    theme: 'light',
    bgType: 'light-grid',
    accent: '#2563EB',
    accent2: '#1DB89A',
    emColor: '#2563EB',
    category: 'Know The Difference',
    headline: 'Pre-qualified vs. <em>pre-approved</em>',
    compare: [
      {
        label: 'Pre-Qualified',
        accent: '#64748B',
        icon: 'clock',
        text: 'A quick estimate based on what you tell me about income, debts, and credit. Good for a ballpark, not verified.',
      },
      {
        label: 'Pre-Approved',
        accent: '#2563EB',
        icon: 'check',
        text: 'I’ve verified your income, assets, and credit. When you make an offer, sellers and agents know it’s real.',
      },
    ],
    cta: 'House hunting this summer? Pre-approval is your edge. Let’s get yours done.',
  },
  // ---------------- 5. Fri 6/19 — Why work with me (giant stat) ----------------
  {
    file: '05-fri-0619-valueprop.png',
    layout: 'stat',
    bgType: 'network',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'Why Work With Me',
    statNumber: '20+',
    statLabel: 'Wholesale Lenders, Shopped For You',
    headline: 'One broker. <em>Dozens of options.</em>',
    body: 'As a mortgage broker, I’m not stuck with one bank’s rates and rules. I compare programs and terms across 20+ wholesale lenders to find what fits your situation, then I do the legwork while you focus on the move.',
    cta: 'Curious what’s out there for you? Reach out and let’s talk it through.',
  },
  // ---------------- 6. Mon 6/22 — First-time buyers / DPA (map decoration) ----------------
  {
    file: '06-mon-0622-dpa.png',
    layout: 'standard',
    bgType: 'map-dpa',
    accent: '#D97706',
    accent2: '#4ADE80',
    gradientBar: 'linear-gradient(90deg, #D97706, #4ADE80, #1E3A5F)',
    category: 'First-Time Buyers',
    headline: 'Maine has <em>down payment help</em> you might not know about',
    body: 'There are down payment and closing cost assistance programs out there for eligible first-time buyers across York County and Southern Maine. Paired with FHA, USDA, or conventional financing, it could make homeownership more reachable than you think.',
    cta: 'I will check what you may qualify for, no cost, no obligation. Send me a message to get started.',
  },
  // ---------------- 7. Tue 6/23 — Credit tips (numbered list) ----------------
  {
    file: '07-tue-0623-credit.png',
    layout: 'list',
    theme: 'light',
    bgType: 'light-paper',
    accent: '#D97706',
    accent2: '#1DB89A',
    gradientBar: 'linear-gradient(90deg, #D97706, #1DB89A, #1E3A5F)',
    category: 'Credit Tips',
    headline: '3 things to do <em>before</em> you apply',
    tips: [
      { n: '1', text: 'Leave your credit cards alone. Don’t open new accounts, don’t close old ones.' },
      { n: '2', text: 'Hold off on big purchases. A new car or store-financed furniture can change what you qualify for.' },
      { n: '3', text: 'Keep paying everything on time. Even small bills like a phone or streaming bill matter.' },
    ],
    cta: 'Already worried about something on your credit? Let’s talk before you start house hunting.',
  },
  // ---------------- 8. Wed 6/24 — Local Spotlight: Saco/Biddeford/Westbrook (scene) ----------------
  {
    file: '08-wed-0624-local-saco.png',
    layout: 'scene',
    bgType: 'scene-river',
    scene: 'river',
    accent: '#2563EB',
    accent2: '#1DB89A',
    gradientBar: 'linear-gradient(90deg, #2563EB, #1DB89A, #1E3A5F)',
    category: 'Local Spotlight',
    headline: 'Saco, Biddeford & Westbrook are the <em>value play</em> right now',
    body: 'As Portland prices push buyers outward, towns like Saco, Biddeford, and Westbrook are seeing more first-time buyer activity, often with more home for the money and an easy commute into the city.',
    cta: 'Thinking about widening your search area? Let’s talk about what your budget can really do in these towns.',
  },
  // ---------------- 9. Thu 6/25 — Process timeline ----------------
  {
    file: '09-thu-0625-process.png',
    layout: 'timeline',
    bgType: 'road',
    accent: '#1DB89A',
    accent2: '#4ADE80',
    category: 'How It Works',
    headline: 'From application to <em>keys in hand</em>',
    steps: ['Application', 'Underwriting', 'Conditional Approval', 'Clear to Close', 'Closing Day'],
    cta: 'Timelines vary, but I will walk you through every step so nothing feels like a surprise. Ready? Let’s set up a quick call.',
  },
  // ---------------- 10. Fri 6/26 — Refinance check-in (cycle icon) ----------------
  {
    file: '10-fri-0626-refi.png',
    layout: 'cycle',
    bgType: 'orbit',
    accent: '#2563EB',
    accent2: '#1DB89A',
    gradientBar: 'linear-gradient(90deg, #2563EB, #1DB89A, #1E3A5F)',
    category: 'Refinance Check-In',
    headline: 'Bought in the last couple years? It <em>might be worth a look</em>',
    body: 'If your rate, term, or monthly payment hasn’t been reviewed lately, it could be worth running a quick check. Sometimes a refinance makes sense, sometimes it doesn’t, but you won’t know until we look at the numbers.',
    cta: 'I will run a free comparison, no obligation. Reach out and let’s see where you stand.',
  },
];

// ---------- Small icon set ----------
function icon(name, color) {
  const icons = {
    clock: `<circle cx="24" cy="24" r="20" fill="none" stroke="${color}" stroke-width="4"/><path d="M24,12 V24 L33,29" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    check: `<circle cx="24" cy="24" r="20" fill="none" stroke="${color}" stroke-width="4"/><path d="M14,25 L21,32 L35,16" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    cycle: `<path d="M10,32 A22,22 0 1 1 18,49" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
            <path d="M54,32 A22,22 0 1 1 46,15" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
            <polygon points="10,32 22,32 14,44" fill="${color}"/>
            <polygon points="54,32 42,32 50,20" fill="${color}"/>`,
  };
  return icons[name] || '';
}

function html(post) {
  const accent = post.accent || '#1DB89A';
  const accent2 = post.accent2 || '#4ADE80';
  const gradientBar = post.gradientBar || `linear-gradient(90deg, ${accent}, ${accent2}, #1E3A5F)`;

  // ----- build the per-layout content block -----
  let contentInner = '';
  let extraStyle = '';

  if (post.layout === 'standard' || post.layout === 'scene') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="headline">${post.headline}</div>
      <div class="body">${post.body}</div>`;
  }

  if (post.layout === 'myth') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="headline" style="margin-bottom:30px;">${post.headline}</div>
      <div class="myth-card myth">
        <div class="myth-label">The Myth</div>
        <div class="myth-text">${post.mythText}</div>
      </div>
      <div class="myth-card fact">
        <div class="myth-label">The Truth</div>
        <div class="myth-text">${post.factText}</div>
      </div>`;
    extraStyle = `
      .myth-card { border-radius:14px; padding:30px 36px; margin-bottom:22px; }
      .myth-card.myth { background:rgba(220,38,38,0.08); border:2px solid #DC2626; }
      .myth-card.fact { background:rgba(74,222,128,0.08); border:2px solid #4ADE80; }
      .myth-label { font-size:22px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin-bottom:12px; }
      .myth-card.myth .myth-label { color:#DC2626; }
      .myth-card.fact .myth-label { color:#4ADE80; }
      .myth-card.myth .myth-text { font-size:28px; font-style:italic; color:#94A3B8; text-decoration:line-through; line-height:1.4; }
      .myth-card.fact .myth-text { font-size:28px; color:#E2E8F0; line-height:1.5; }
    `;
  }

  if (post.layout === 'compare') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="headline" style="margin-bottom:40px;">${post.headline}</div>
      <div class="compare-row">
        ${post.compare.map(c => `
          <div class="compare-card" style="border-color:${c.accent};">
            <div class="compare-icon"><svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">${icon(c.icon, c.accent)}</svg></div>
            <div class="compare-title" style="color:${c.accent};">${c.label}</div>
            <div class="compare-text">${c.text}</div>
          </div>`).join('')}
      </div>`;
    extraStyle = `
      .compare-row { display:flex; gap:28px; }
      .compare-card { flex:1; border:2px solid; border-radius:14px; padding:32px 28px; background:rgba(255,255,255,0.03); }
      .compare-icon { margin-bottom:18px; }
      .compare-title { font-family:'Playfair Display', serif; font-weight:900; font-size:34px; margin-bottom:14px; }
      .compare-text { font-size:24px; line-height:1.5; color:#CBD5E1; }
    `;
  }

  if (post.layout === 'stat') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="stat-hero">
        <div class="stat-rays"><svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          ${Array.from({length: 24}).map((_,i) => {
            const angle = (i / 24) * 360;
            return `<line x1="300" y1="300" x2="300" y2="0" stroke="${accent}" stroke-opacity="0.12" stroke-width="3" transform="rotate(${angle} 300 300)"/>`;
          }).join('')}
        </svg></div>
        <div class="stat-number">${post.statNumber}</div>
        <div class="stat-label">${post.statLabel}</div>
      </div>
      <div class="headline" style="margin:28px 0 18px;">${post.headline}</div>
      <div class="body">${post.body}</div>`;
    extraStyle = `
      .stat-hero { position:relative; display:flex; flex-direction:column; align-items:flex-start; margin-bottom:6px; }
      .stat-rays { position:absolute; top:-130px; left:-100px; z-index:0; pointer-events:none; }
      .stat-number {
        font-family:'Playfair Display', serif; font-weight:900; font-size:200px; line-height:1;
        background:linear-gradient(90deg, ${accent}, ${accent2});
        -webkit-background-clip:text; background-clip:text; color:transparent;
        position:relative; z-index:1;
      }
      .stat-label { font-size:26px; letter-spacing:4px; text-transform:uppercase; color:#94A3B8; font-weight:600; position:relative; z-index:1; }
    `;
  }

  if (post.layout === 'list') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="headline" style="margin-bottom:36px;">${post.headline}</div>
      <div class="tip-list">
        ${post.tips.map(t => `
          <div class="tip-row">
            <div class="tip-num">${t.n}</div>
            <div class="tip-text">${t.text}</div>
          </div>`).join('')}
      </div>`;
    extraStyle = `
      .tip-list { display:flex; flex-direction:column; gap:24px; }
      .tip-row { display:flex; align-items:flex-start; gap:24px; }
      .tip-num {
        flex:0 0 56px; width:56px; height:56px; border-radius:50%;
        background:${hexToRgba(accent, 0.14)}; border:1px solid ${accent}; color:${accent};
        display:flex; align-items:center; justify-content:center;
        font-family:'Playfair Display', serif; font-weight:900; font-size:28px;
      }
      .tip-text { font-size:28px; line-height:1.5; color:#E2E8F0; padding-top:8px; }
    `;
  }

  if (post.layout === 'timeline') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="headline" style="margin-bottom:54px;">${post.headline}</div>
      <div class="timeline">
        <div class="timeline-line"></div>
        ${post.steps.map((s, i) => `
          <div class="timeline-step">
            <div class="timeline-circle">${i + 1}</div>
            <div class="timeline-label">${s}</div>
          </div>`).join('')}
      </div>`;
    extraStyle = `
      .timeline { position:relative; display:flex; justify-content:space-between; padding-top:10px; }
      .timeline-line { position:absolute; top:38px; left:38px; right:38px; height:3px; background:${hexToRgba(accent, 0.35)}; z-index:0; }
      .timeline-step { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; width:160px; }
      .timeline-circle {
        width:76px; height:76px; border-radius:50%; background:#0E2438; border:3px solid ${accent};
        display:flex; align-items:center; justify-content:center;
        font-family:'Playfair Display', serif; font-weight:900; font-size:32px; color:${accent2}; margin-bottom:18px;
      }
      .timeline-label { font-size:21px; text-align:center; color:#CBD5E1; font-weight:600; line-height:1.3; }
    `;
  }

  if (post.layout === 'cycle') {
    contentInner = `
      <div class="pill">${post.category}</div>
      <div class="cycle-row">
        <div class="cycle-icon"><svg width="120" height="120" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">${icon('cycle', accent)}</svg></div>
        <div class="headline" style="margin:0;">${post.headline}</div>
      </div>
      <div class="body" style="margin-top:28px;">${post.body}</div>`;
    extraStyle = `
      .cycle-row { display:flex; align-items:center; gap:36px; margin-bottom:6px; }
      .cycle-icon { flex:0 0 auto; background:${hexToRgba(accent, 0.12)}; border:1px solid ${accent}; border-radius:50%; width:140px; height:140px; display:flex; align-items:center; justify-content:center; }
    `;
  }

  // ----- background / scene -----
  const theme = post.theme || 'dark';
  const logo = theme === 'light' ? LOGO_DARK : LOGO_WHITE;
  const ehoColor = theme === 'light' ? '#1E3A5F' : '#E2E8F0';
  let bgLayer = '';
  switch (post.bgType) {
    case 'scene-coast':
      bgLayer = `<div class="scene-bg">${scene('coast')}</div><div class="scene-overlay"></div>`;
      break;
    case 'scene-river':
      bgLayer = `<div class="scene-bg">${scene('river')}</div><div class="scene-overlay"></div>`;
      break;
    case 'map-home':
      bgLayer = `<div class="scene-bg" style="opacity:0.9;">${mapScene('home')}</div><div class="map-overlay"></div>`;
      break;
    case 'map-dpa':
      bgLayer = `<div class="scene-bg" style="opacity:0.9;">${mapScene('dpa', accent)}</div><div class="map-overlay"></div>`;
      break;
    case 'myth-bg':
      bgLayer = `<div class="scene-bg">${mythScene()}</div><div class="scene-overlay"></div>`;
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
  color:#fff;
  position:relative;
  overflow:hidden;
  background-color:#081726;
}
body.light {
  background-color:#F8F9FA;
  background-image:
    radial-gradient(circle at 88% 10%, rgba(29,184,154,0.10) 0%, transparent 40%),
    radial-gradient(circle at 8% 92%, rgba(74,222,128,0.10) 0%, transparent 40%),
    repeating-linear-gradient(0deg, rgba(30,58,95,0.045) 0px, rgba(30,58,95,0.045) 1px, transparent 1px, transparent 44px),
    repeating-linear-gradient(90deg, rgba(30,58,95,0.045) 0px, rgba(30,58,95,0.045) 1px, transparent 1px, transparent 44px);
  color:#1E3A5F;
}
body.paper {
  background-color:#FDFCF7;
  background-image:
    repeating-linear-gradient(0deg, rgba(30,58,95,0.08) 0px, rgba(30,58,95,0.08) 2px, transparent 2px, transparent 64px),
    linear-gradient(90deg, transparent 0, transparent 130px, rgba(220,38,38,0.22) 130px, rgba(220,38,38,0.22) 133px, transparent 133px);
}
body.light .pill { background:${hexToRgba(accent, 0.08)}; border:1px solid ${accent}; color:${accent}; }
body.light .headline { color:#1E3A5F; }
body.light .body { color:#475569; }
body.light .eho-badge { color:#1E3A5F; }
body.light .footer { border-top:1px solid rgba(30,58,95,0.12); }
body.light .cta { color:#1E3A5F; }
body.light .meta { color:#94A3B8; }
body.light .compare-card { background:#FFFFFF; box-shadow:0 10px 30px rgba(30,58,95,0.08); }
body.light .compare-text { color:#475569; }
body.light .tip-text { color:#334155; }
.gradient-bar {
  position:absolute; top:0; left:0; right:0; height:12px;
  background:${gradientBar};
  z-index:3;
}
.scene-bg { position:absolute; inset:0; z-index:0; }
.scene-overlay {
  position:absolute; inset:0; z-index:1;
  background: linear-gradient(180deg, rgba(8,23,38,0.45) 0%, rgba(8,23,38,0.55) 45%, rgba(8,23,38,0.92) 100%);
}
.map-overlay {
  position:absolute; inset:0; z-index:1;
  background: linear-gradient(90deg, rgba(8,23,38,0.97) 0%, rgba(8,23,38,0.85) 45%, rgba(8,23,38,0.35) 100%);
}
.header {
  position:relative; z-index:3;
  display:flex; justify-content:space-between; align-items:center;
  padding: 56px 64px 0 64px;
}
.header img.logo { height:52px; }
.eho-badge {
  display:flex; align-items:center; gap:10px;
  color:#E2E8F0; font-size:18px; font-weight:600; letter-spacing:1px;
}
.content {
  position:absolute; top:190px; bottom:190px; left:0; right:0;
  display:flex; flex-direction:column; justify-content:center;
  padding: 0 70px; z-index:3;
}
.pill {
  display:inline-block;
  background:${hexToRgba(accent, 0.14)};
  border:1px solid ${accent};
  color:${accent};
  padding:10px 26px;
  border-radius:999px;
  font-size:23px; font-weight:700;
  letter-spacing:3px; text-transform:uppercase;
  margin-bottom:34px;
  width:fit-content;
}
.headline {
  font-family:'Playfair Display', serif;
  font-weight:900;
  font-size:64px;
  line-height:1.18;
  margin-bottom:34px;
  max-width:920px;
}
.headline em {
  font-style:italic;
  color:${post.emColor || accent2};
}
.body {
  font-size:31px;
  line-height:1.55;
  color:#CBD5E1;
  font-weight:400;
  max-width:880px;
}
.footer {
  position:absolute; bottom:0; left:0; right:0; z-index:3;
  padding: 30px 64px 36px 64px;
  border-top:1px solid rgba(255,255,255,0.10);
}
.cta {
  font-size:28px;
  font-weight:600;
  color:#fff;
  margin-bottom:14px;
  line-height:1.4;
  max-width:950px;
}
.meta {
  display:flex; justify-content:space-between; align-items:center;
  font-size:18px; color:#64748B;
}
.meta .handle { color:#1DB89A; font-weight:600; }
.meta .legal { text-align:right; max-width:620px; }
${extraStyle}
</style>
</head>
<body class="${post.bgType === 'light-paper' ? 'light paper' : theme}">
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
