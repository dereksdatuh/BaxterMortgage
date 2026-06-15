const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BRAND = path.resolve(__dirname, '../../brand');
const LOGO = `data:image/svg+xml;base64,${fs.readFileSync(path.join(BRAND, 'Baxter_Logo_White.svg')).toString('base64')}`;

const FOOTER_TEXT = 'Derek Smith NMLS# 2810853 | Baxter Mortgage, LLC NMLS# 2752768 | Equal Housing Opportunity';

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

// Layered vector illustrations giving a sense of depth ("3D-ish") for local
// spotlight posts, built from brand-palette shapes instead of stock photos.
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
      <!-- distant headland -->
      <path d="M0,640 Q220,560 480,615 T1080,590 V780 H0 Z" fill="#13314f" opacity="0.85"/>
      <!-- mid headland with pines -->
      <path d="M0,720 Q260,650 560,705 T1080,680 V900 H0 Z" fill="#1E3A5F"/>
      ${pineRow(700, 1, '#16324f', 14, 85, 7)}
      <!-- water -->
      <rect x="0" y="780" width="1080" height="300" fill="url(#water)"/>
      <g stroke="#4ADE80" stroke-opacity="0.18" stroke-width="3">
        <line x1="40" y1="840" x2="320" y2="840"/>
        <line x1="420" y1="880" x2="760" y2="880"/>
        <line x1="120" y1="920" x2="500" y2="920"/>
        <line x1="600" y1="960" x2="1020" y2="960"/>
        <line x1="60" y1="1000" x2="380" y2="1000"/>
        <line x1="500" y1="1040" x2="980" y2="1040"/>
      </g>
      <!-- lighthouse on rocky point -->
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
      <!-- birds -->
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
    <!-- mill buildings skyline -->
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
      <!-- smokestack -->
      <rect x="330" y="320" width="30" height="120" />
    </g>
    <!-- windows -->
    <g fill="#4ADE80" opacity="0.5">
      ${Array.from({length: 24}).map((_,i) => {
        const x = 80 + (i % 8) * 110;
        const y = 540 + Math.floor(i/8) * 70;
        return `<rect x="${x}" y="${y}" width="22" height="32"/>`;
      }).join('')}
    </g>
    <!-- river -->
    <rect x="0" y="760" width="1080" height="320" fill="url(#river)"/>
    <g stroke="#2563EB" stroke-opacity="0.25" stroke-width="3">
      <line x1="60" y1="830" x2="380" y2="830"/>
      <line x1="460" y1="870" x2="820" y2="870"/>
      <line x1="120" y1="920" x2="520" y2="920"/>
      <line x1="620" y1="960" x2="1000" y2="960"/>
      <line x1="80" y1="1010" x2="420" y2="1010"/>
    </g>
    <!-- bridge arches -->
    <g fill="none" stroke="#0c2235" stroke-width="18">
      <path d="M120,780 Q300,680 480,780"/>
      <path d="M480,780 Q660,680 840,780"/>
      <path d="M840,780 Q1020,680 1180,780"/>
    </g>
  </svg>`;
}

const posts = [
  {
    file: '01-mon-0615-intro.png',
    category: 'Meet Your Lender',
    headline: 'Southern Maine’s mortgage guy who actually <em>picks up the phone</em>',
    body: 'I’m Derek Smith, a local mortgage broker based right here in Kennebunk. I work with 20+ wholesale lenders so I can shop your loan around and find the fit that works for you, not just the one option a single bank hands you.',
    cta: 'New here? Follow along for real talk on buying, refinancing, and the Maine market. Got a question? Send me a DM, I read every one.',
  },
  {
    file: '02-tue-0616-myth.png',
    category: 'Myth Buster',
    headline: '"You need <em>20% down</em> to buy a home"',
    body: 'Not true for most buyers. Conventional loans can go as low as 3% down, FHA as low as 3.5%, and depending on where you’re buying in York County, USDA financing could mean $0 down. Down payment assistance programs can stack with these too.',
    cta: 'Don’t let this myth keep you on the sidelines. Reach out and I will run your numbers, free, no pressure.',
  },
  {
    file: '03-wed-0617-local-kennebunk.png',
    scene: 'coast',
    category: 'Local Spotlight',
    headline: 'Kennebunk & Kennebunkport are <em>heating up</em> for summer',
    body: 'Inventory in York County tends to move fast once the weather turns, especially around Kennebunk, Kennebunkport, and Wells. If you’re thinking about buying this season, getting pre-approved now means you can move the moment the right home hits the market.',
    cta: 'Want to be ready before the next open house? Let’s get your pre-approval started this week.',
  },
  {
    file: '04-thu-0618-preapproval.png',
    category: 'Know The Difference',
    headline: 'Pre-qualified vs. <em>pre-approved</em>: it’s not the same thing',
    body: 'Pre-qualified is a quick estimate based on what you tell me. Pre-approval means I’ve verified your income, assets, and credit, so when you make an offer, sellers and agents know it’s real.',
    cta: 'House hunting this summer? Pre-approval is your edge. Let’s get yours done.',
  },
  {
    file: '05-fri-0619-valueprop.png',
    category: 'Why Work With Me',
    headline: 'I shop <em>20+ lenders</em>, so you don’t have to',
    body: 'As a mortgage broker, I’m not stuck with one bank’s rates and rules. I compare options across 20+ wholesale lenders to find the program and terms that fit your situation, then I do the legwork while you focus on the move.',
    cta: 'Curious what’s out there for you? Reach out and let’s talk it through.',
  },
  {
    file: '06-mon-0622-dpa.png',
    category: 'First-Time Buyers',
    headline: 'Maine has <em>down payment help</em> you might not know about',
    body: 'Programs through MaineHousing and other first-time buyer assistance can help cover down payment and closing costs for eligible buyers. Paired with FHA, USDA, or conventional financing, it could make homeownership more reachable than you think.',
    cta: 'I will check what you may qualify for, no cost, no obligation. Send me a message to get started.',
  },
  {
    file: '07-tue-0623-credit.png',
    category: 'Credit Tips',
    headline: '3 things to do (and <em>not</em> do) before you apply',
    body: 'Keep your credit cards where they are, don’t open new accounts. Avoid large purchases or new loans before closing. Keep paying everything on time, even the small bills matter.',
    cta: 'Already have questions about your credit and how it affects your options? Let’s talk before you start shopping.',
  },
  {
    file: '08-wed-0624-local-saco.png',
    scene: 'river',
    category: 'Local Spotlight',
    headline: 'Saco, Biddeford & Westbrook are the <em>value play</em> right now',
    body: 'As Portland prices push buyers outward, towns like Saco, Biddeford, and Westbrook are seeing more first-time buyer activity, often with more home for the money and an easy commute into the city.',
    cta: 'Thinking about widening your search area? Let’s talk about what your budget can really do in these towns.',
  },
  {
    file: '09-thu-0625-process.png',
    category: 'How It Works',
    headline: 'From application to <em>keys in hand</em>: what to expect',
    body: 'Application and documents, then underwriting review, then conditional approval, then clear to close, then closing day. Timelines vary, but I will walk you through every step so nothing feels like a surprise.',
    cta: 'Ready to start the process? Let’s set up a quick call.',
  },
  {
    file: '10-fri-0626-refi.png',
    category: 'Refinance Check-In',
    headline: 'Bought in the last couple years? It <em>might be worth a look</em>',
    body: 'If your rate, term, or monthly payment hasn’t been reviewed lately, it could be worth running a quick check. Sometimes a refinance makes sense, sometimes it doesn’t, but you won’t know until we look at the numbers.',
    cta: 'I will run a free comparison, no obligation. Reach out and let’s see where you stand.',
  },
];

function html(post) {
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
  background-image:
    radial-gradient(circle at 88% 12%, rgba(29,184,154,0.28) 0%, transparent 38%),
    radial-gradient(circle at 8% 90%, rgba(74,222,128,0.20) 0%, transparent 38%),
    radial-gradient(circle at 50% 55%, rgba(37,99,235,0.10) 0%, transparent 55%),
    repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 40px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 40px);
}
.gradient-bar {
  position:absolute; top:0; left:0; right:0; height:12px;
  background:linear-gradient(90deg, #1DB89A, #4ADE80, #1E3A5F);
  z-index:3;
}
.scene-bg {
  position:absolute; inset:0; z-index:0;
}
.scene-overlay {
  position:absolute; inset:0; z-index:1;
  background: linear-gradient(180deg, rgba(8,23,38,0.45) 0%, rgba(8,23,38,0.55) 45%, rgba(8,23,38,0.92) 100%);
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
  background:rgba(29,184,154,0.14);
  border:1px solid #1DB89A;
  color:#1DB89A;
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
  color:#4ADE80;
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
</style>
</head>
<body>
  ${post.scene ? `<div class="scene-bg">${scene(post.scene)}</div><div class="scene-overlay"></div>` : ''}
  <div class="gradient-bar"></div>
  <div class="header">
    <img class="logo" src="${LOGO}" />
    <div class="eho-badge">${ehoBadge('#E2E8F0')}<span>EQUAL HOUSING<br/>OPPORTUNITY</span></div>
  </div>
  <div class="content">
    <div class="pill">${post.category}</div>
    <div class="headline">${post.headline}</div>
    <div class="body">${post.body}</div>
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
