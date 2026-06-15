const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const BRAND = path.resolve(__dirname, '../../brand');
const LOGO = `data:image/svg+xml;base64,${fs.readFileSync(path.join(BRAND, 'Baxter_Logo_White.svg')).toString('base64')}`;
const FOOTER_TEXT = 'Derek Smith NMLS# 2810853 | Baxter Mortgage, LLC NMLS# 2752768 | Equal Housing Opportunity';
const FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux';

function ehoBadge(color) {
  return `
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,6 95,42 84,42 84,90 16,90 16,42 5,42" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="34" y="50" width="32" height="6" fill="${color}"/>
    <rect x="34" y="64" width="32" height="6" fill="${color}"/>
  </svg>`;
}

function pineRow(y, scale, color, count, spread, seed) {
  let trees = '';
  for (let i = 0; i < count; i++) {
    const x = (i * spread) + (seed % spread) - 80;
    const h = 90 * scale + ((i * 17 + seed) % 30);
    const w = h * 0.55;
    trees += `<path d="M${x},${y} L${x - w / 2},${y + h} L${x + w / 2},${y + h} Z" fill="${color}"/>`;
  }
  return trees;
}

const SCENE_SVG = `<svg viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
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
  ${pineRow(700, 1, '#16324f', 16, 85, 7)}
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
</svg>`;

const DURATION_S = 6;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:1080px; height:1920px; overflow:hidden; background:#081726; }
.stage {
  width:1080px; height:1920px;
  perspective: 1400px;
  overflow:hidden;
  position:relative;
  font-family:'DM Sans', sans-serif;
  color:#fff;
}
.world {
  position:absolute; inset:0;
  transform-style: preserve-3d;
  animation: tilt 6s ease-in-out infinite;
}
@keyframes tilt {
  0%   { transform: rotateX(4deg) rotateY(-3deg) scale(1.08); }
  50%  { transform: rotateX(-2deg) rotateY(3deg) scale(1.12); }
  100% { transform: rotateX(4deg) rotateY(-3deg) scale(1.08); }
}
.layer { position:absolute; left:50%; top:50%; width:1300px; height:1300px; margin-left:-650px; margin-top:-650px; }
.layer-sky   { transform: translateZ(-260px) scale(1.22); }
.layer-mid   { transform: translateZ(-120px) scale(1.12); }
.layer-front { transform: translateZ(40px) scale(1.0); }
.gradient-bar {
  position:absolute; top:0; left:0; right:0; height:14px;
  background:linear-gradient(90deg, #1DB89A, #4ADE80, #1E3A5F);
  background-size: 200% 100%;
  animation: shimmer 4s linear infinite;
  z-index:5;
}
@keyframes shimmer {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}
.overlay {
  position:absolute; inset:0; z-index:2;
  background: linear-gradient(180deg, rgba(8,23,38,0.35) 0%, rgba(8,23,38,0.55) 45%, rgba(8,23,38,0.95) 100%);
}
.header {
  position:absolute; top:70px; left:64px; right:64px; z-index:6;
  display:flex; justify-content:space-between; align-items:center;
}
.header img.logo { height:64px; }
.eho-badge {
  display:flex; align-items:center; gap:12px;
  color:#E2E8F0; font-size:22px; font-weight:600; letter-spacing:1px;
}
.eho-badge svg { width:48px; height:48px; }
.content {
  position:absolute; left:0; right:0; top:50%; z-index:6;
  transform: translateY(-30%);
  padding: 0 80px;
  opacity:0;
  animation: rise 1.2s ease-out 0.3s forwards;
}
@keyframes rise {
  from { opacity:0; transform: translateY(-10%); }
  to   { opacity:1; transform: translateY(-30%); }
}
.pill {
  display:inline-block;
  background:rgba(29,184,154,0.16);
  border:1px solid #1DB89A;
  color:#1DB89A;
  padding:14px 32px;
  border-radius:999px;
  font-size:28px; font-weight:700;
  letter-spacing:4px; text-transform:uppercase;
  margin-bottom:44px;
}
.headline {
  font-family:'Playfair Display', serif;
  font-weight:900;
  font-size:92px;
  line-height:1.2;
  max-width:920px;
}
.headline em { font-style:italic; color:#4ADE80; }
.footer {
  position:absolute; bottom:0; left:0; right:0; z-index:6;
  padding: 50px 64px 60px 64px;
  border-top:1px solid rgba(255,255,255,0.10);
}
.cta {
  font-size:38px; font-weight:600; color:#fff;
  margin-bottom:24px; line-height:1.4; max-width:950px;
}
.meta { font-size:24px; color:#94A3B8; line-height:1.6; }
.meta .handle { color:#1DB89A; font-weight:600; display:block; margin-bottom:6px; }
</style>
</head>
<body>
  <div class="stage">
    <div class="world">
      <div class="layer layer-sky">${SCENE_SVG}</div>
    </div>
    <div class="overlay"></div>
    <div class="gradient-bar"></div>
    <div class="header">
      <img class="logo" src="${LOGO}" />
      <div class="eho-badge">${ehoBadge('#E2E8F0')}<span>EQUAL HOUSING<br/>OPPORTUNITY</span></div>
    </div>
    <div class="content">
      <div class="pill">Why Work With Me</div>
      <div class="headline">I shop <em>20+ lenders</em>,<br/>so you don't have to.</div>
    </div>
    <div class="footer">
      <div class="cta">Reach out and let's talk through your options, no pressure, no obligation.</div>
      <div class="meta">
        <span class="handle">@dereklends &middot; baxtermortgage.com &middot; (207) 468-6998</span>
        ${FOOTER_TEXT}
      </div>
    </div>
  </div>
</body>
</html>`;

(async () => {
  const videoDir = path.join(__dirname, '_video_tmp');
  fs.mkdirSync(videoDir, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    recordVideo: { dir: videoDir, size: { width: 1080, height: 1920 } },
  });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(DURATION_S * 1000 + 300);
  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  const outPath = path.join(__dirname, '11-reel-3d-valueprop.webm');
  execFileSync(FFMPEG, [
    '-y', '-i', videoPath,
    '-t', String(DURATION_S),
    '-c:v', 'copy',
    outPath,
  ]);
  fs.rmSync(videoDir, { recursive: true, force: true });
  console.log('wrote', outPath);
})();
