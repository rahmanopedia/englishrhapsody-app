/**
 * English Rhapsody — Circular ER Monogram Badge Icon
 * Navy-to-purple gradient, metallic blue border ring,
 * gold feather quill, musical staff lines, ER monogram, English Rhapsody text
 */
const sharp = require('C:/Users/ruhme/node_modules/sharp');
const path  = require('path');
const fs    = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <radialGradient id="bgGrad" cx="40%" cy="35%" r="70%">
      <stop offset="0%"   stop-color="#1e3a8a"/>
      <stop offset="50%"  stop-color="#162d6a"/>
      <stop offset="100%" stop-color="#2d0a5e"/>
    </radialGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#7eb8e8"/>
      <stop offset="18%"  stop-color="#cce8ff"/>
      <stop offset="35%"  stop-color="#4a90d0"/>
      <stop offset="52%"  stop-color="#9dcef5"/>
      <stop offset="68%"  stop-color="#3a7abf"/>
      <stop offset="84%"  stop-color="#b0d8f8"/>
      <stop offset="100%" stop-color="#6aaee0"/>
    </linearGradient>
    <linearGradient id="innerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#5a9fd4" stop-opacity="0.7"/>
      <stop offset="50%"  stop-color="#1a4a7a" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#3a80c0" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#fff0a0"/>
      <stop offset="20%"  stop-color="#ffd700"/>
      <stop offset="50%"  stop-color="#e8b800"/>
      <stop offset="80%"  stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#c8920a"/>
    </linearGradient>
    <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#ffe57a"/>
      <stop offset="40%"  stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#b8860b"/>
    </linearGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#eef4fb"/>
      <stop offset="40%"  stop-color="#c8d8ec"/>
      <stop offset="100%" stop-color="#8aa0b8"/>
    </linearGradient>
    <linearGradient id="quillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#fff8c0"/>
      <stop offset="25%"  stop-color="#ffd700"/>
      <stop offset="65%"  stop-color="#daa000"/>
      <stop offset="100%" stop-color="#b8780a"/>
    </linearGradient>
    <linearGradient id="staffGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#ffd700" stop-opacity="0"/>
      <stop offset="15%"  stop-color="#ffd700" stop-opacity="0.6"/>
      <stop offset="85%"  stop-color="#ffd700" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="topShine" cx="32%" cy="28%" r="48%">
      <stop offset="0%"   stop-color="#4070b0" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0d1f45" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="mainClip">
      <circle cx="512" cy="512" r="456"/>
    </clipPath>
    <filter id="quillGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="erGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="outerShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000033" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Outer shadow for depth -->
  <circle cx="512" cy="524" r="492" fill="#000033" opacity="0.5" filter="url(#outerShadow)"/>

  <!-- Dark base -->
  <circle cx="512" cy="512" r="506" fill="#080f2a"/>

  <!-- Metallic border ring — outer -->
  <circle cx="512" cy="512" r="504" fill="none" stroke="url(#borderGrad)" stroke-width="32"/>

  <!-- Metallic border ring — inner fine line -->
  <circle cx="512" cy="512" r="478" fill="none" stroke="url(#innerRingGrad)" stroke-width="3"/>

  <!-- Clipped content area -->
  <g clip-path="url(#mainClip)">
    <!-- Main gradient background -->
    <circle cx="512" cy="512" r="456" fill="url(#bgGrad)"/>

    <!-- Top-left ambient shine -->
    <circle cx="512" cy="512" r="456" fill="url(#topShine)"/>

    <!-- Very subtle inner glow at top -->
    <ellipse cx="420" cy="290" rx="200" ry="110" fill="white" opacity="0.03" transform="rotate(-20 420 290)"/>

    <!-- Musical staff lines (lower third) -->
    <g stroke="url(#staffGrad)" stroke-width="2.8" opacity="0.5">
      <line x1="108" y1="646" x2="916" y2="646"/>
      <line x1="108" y1="666" x2="916" y2="666"/>
      <line x1="108" y1="686" x2="916" y2="686"/>
      <line x1="108" y1="706" x2="916" y2="706"/>
      <line x1="108" y1="726" x2="916" y2="726"/>
    </g>

    <!-- Feather quill — diagonal from top-right toward center-left -->
    <g filter="url(#quillGlow)" opacity="0.88">
      <!-- Central shaft -->
      <line x1="694" y1="148" x2="348" y2="565"
            stroke="url(#quillGrad)" stroke-width="4" stroke-linecap="round"/>

      <!-- Left vane (wider, main body) -->
      <path d="M694,148
               C672,175 646,208 618,246
               C590,284 560,326 534,368
               C508,410 484,452 464,490
               L434,528
               C452,506 472,478 494,446
               C518,410 544,370 568,330
               C592,290 618,252 642,218
               C666,184 682,162 694,148 Z"
            fill="url(#quillGrad)" opacity="0.80"/>

      <!-- Right vane (narrower) -->
      <path d="M694,148
               C710,170 720,198 720,228
               C720,258 710,292 692,324
               C674,356 650,388 624,418
               C598,448 570,478 546,506
               L514,540
               C532,518 550,492 570,462
               C592,428 616,392 636,356
               C656,320 670,284 676,252
               C682,220 682,186 694,148 Z"
            fill="url(#quillGrad)" opacity="0.65"/>

      <!-- Central vane highlight -->
      <path d="M694,148 C678,180 658,218 634,258
               C610,298 582,342 558,386
               C534,430 512,472 492,510 L462,550"
            stroke="#fffce0" stroke-width="1.8" fill="none"
            stroke-linecap="round" opacity="0.55"/>

      <!-- Quill tip curl -->
      <path d="M348,565 C354,550 362,538 372,528 C364,540 355,554 348,565 Z"
            fill="#fff0a0"/>
    </g>

    <!-- ER Monogram — large, centered, gold -->
    <g filter="url(#erGlow)">
      <text x="512" y="592"
            font-family="Georgia, 'Times New Roman', serif"
            font-size="316"
            font-weight="bold"
            text-anchor="middle"
            fill="url(#goldGrad)"
            letter-spacing="-6">ER</text>
    </g>

    <!-- Thin separator line between monogram and text -->
    <line x1="190" y1="762" x2="834" y2="762"
          stroke="url(#staffGrad)" stroke-width="1.5" opacity="0.6"/>

    <!-- ENGLISH — silver, spaced capitals -->
    <text x="512" y="812"
          font-family="Georgia, 'Times New Roman', serif"
          font-size="52"
          font-weight="normal"
          text-anchor="middle"
          fill="url(#silverGrad)"
          letter-spacing="16">ENGLISH</text>

    <!-- Rhapsody — gold italic -->
    <text x="512" y="878"
          font-family="Georgia, 'Times New Roman', serif"
          font-size="68"
          font-weight="bold"
          font-style="italic"
          text-anchor="middle"
          fill="url(#goldTextGrad)"
          letter-spacing="3">Rhapsody</text>
  </g>

  <!-- Border shine overlay (top arc highlight) -->
  <path d="M 230,80 A 450,450 0 0 1 794,80"
        fill="none" stroke="white" stroke-width="6" opacity="0.12" stroke-linecap="round"/>
</svg>`;

const outDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const buf = Buffer.from(svg);
  await sharp(buf).resize(512, 512).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'icon-512.png'));
  console.log('done: icon-512.png');
  await sharp(buf).resize(192, 192).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'icon-192.png'));
  console.log('done: icon-192.png');
  await sharp(buf).resize(1024, 1024).png({ compressionLevel: 9 }).toFile(path.join(outDir, 'icon-1024.png'));
  console.log('done: icon-1024.png (source)');
}

run().catch(e => { console.error(e); process.exit(1); });
