const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const FF  = 'C:/Users/ruhme/ffmpeg_extracted/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe';
const OUT = 'C:/Users/ruhme/OneDrive/Masaüstü/Yeni klasör (5)/english_rhapsody_shorts.mp4';
const TMP = path.join(os.tmpdir(), 'er_shorts');
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP, { recursive: true });

const W = 1080, H = 1920, FPS = 30;
const BG     = '#050810';
const CYAN   = 'white';  // we use hex inside filters
const cCYAN  = '0x00d4ff';
const cVIOL  = '0x7c3aed';
const cAMBER = '0xf59e0b';
const cWHITE = '0xffffff';
const cGRAY  = '0x94a3b8';
const cROSE  = '0xf43f5e';

const FB = 'C\\:/Windows/Fonts/arialbd.ttf';
const FR = 'C\\:/Windows/Fonts/arial.ttf';

function run(args, label) {
  console.log('  Running:', label || args.slice(-1)[0]);
  const r = spawnSync(FF, args, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
  if (r.status !== 0) {
    console.error(r.stderr ? r.stderr.slice(-3000) : 'no stderr');
    throw new Error('ffmpeg failed: ' + label);
  }
}

// drawtext: centered horizontally at given y
function dt(text, y, size, color, font) {
  font = font || FB;
  // Escape for ffmpeg drawtext filter
  const t = text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\u2019")   // replace single quote with typographic to avoid escaping hell
    .replace(/:/g, '\\:');
  return `drawtext=fontfile='${font}':text='${t}':x=(w-text_w)/2:y=${y}:fontsize=${size}:fontcolor=${color}`;
}

// drawbox: filled rectangle
function box(x, y, w, h, color, alpha) {
  alpha = alpha == null ? 1 : alpha;
  return `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${color}@${alpha}:t=fill`;
}

// Build clip: dark bg + filters array + fade in/out
function makeClip(outFile, dur, filters) {
  const fadeOut = dur - 0.45;
  const vf = filters.join(',') + `,fade=t=in:st=0:d=0.45,fade=t=out:st=${fadeOut}:d=0.45`;
  run([
    '-y',
    '-f', 'lavfi',
    '-i', `color=c=${BG}:s=${W}x${H}:r=${FPS}:d=${dur}`,
    '-vf', vf,
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-t', String(dur),
    outFile,
  ], path.basename(outFile));
  console.log('    OK:', path.basename(outFile));
}

const clips = [];
let ci = 0;
function clip(dur, filters) {
  const f = path.join(TMP, `clip${ci++}.mp4`);
  makeClip(f, dur, filters);
  clips.push(f);
}

// ─────────────────────────────────────────────────────────────────
// SCENE 1 — Title (6s)
// ─────────────────────────────────────────────────────────────────
console.log('\n[1/6] Title...');
clip(6, [
  // accent bars
  box(0, 0, W, 10, cVIOL, 0.9),
  box(0, H - 10, W, 10, cCYAN, 0.9),
  // decorative side lines
  box(0, 0, 6, H, cVIOL, 0.4),
  box(W - 6, 0, 6, H, cCYAN, 0.4),
  // main title
  dt('ENGLISH', 580, 160, cCYAN),
  dt('RHAPSODY', 760, 110, cVIOL),
  // divider
  box(220, 910, 640, 5, cCYAN, 0.6),
  // tagline
  dt('Akilli Ingilizce Ogrenme', 950,  50, cWHITE, FR),
  dt('Turkce konusanlar icin',   1020, 40, cGRAY,  FR),
]);

// ─────────────────────────────────────────────────────────────────
// SCENE 2 — Vocabulary / Bridge (5s)
// ─────────────────────────────────────────────────────────────────
console.log('[2/6] Vocabulary...');
clip(5, [
  box(60, 380, 960, 640, cAMBER, 0.05),
  box(60, 380,   5, 640, cAMBER, 0.8),
  // big number
  dt('800+',           460, 220, cAMBER),
  dt('TURKCE IFADE',   700,  62, cWHITE),
  // features
  box(280, 810, 520, 5, cCYAN, 0.5),
  dt('Kelime Hazinesi',   870, 52, cCYAN,  FR),
  dt('Kopru Modu',        940, 52, cVIOL,  FR),
  dt('Deyimler ve Atasozleri', 1010, 44, cGRAY, FR),
]);

// ─────────────────────────────────────────────────────────────────
// SCENE 3 — Speaking (5s)
// ─────────────────────────────────────────────────────────────────
console.log('[3/6] Speaking...');
clip(5, [
  box(0, 620, W, 450, cVIOL, 0.07),
  // title
  dt('KONUSMA',  620, 120, cWHITE),
  dt('PRATIGI',  760, 120, cCYAN),
  // divider
  box(300, 920, 480, 5, cVIOL, 0.7),
  // details
  dt('AI telaffuz analizi',   970, 52, cVIOL, FR),
  dt('Skor al + eksikleri gor', 1040, 44, cGRAY, FR),
  dt('Her seferinde daha iyi', 1110, 44, cWHITE, FR),
]);

// ─────────────────────────────────────────────────────────────────
// SCENE 4 — Cinema (5s)
// ─────────────────────────────────────────────────────────────────
console.log('[4/6] Cinema...');
clip(5, [
  box(0, 0, W, H, cCYAN, 0.03),
  box(0, 500, W, 8, cCYAN, 0.25),
  box(0, H - 500, W, 8, cCYAN, 0.25),
  // title
  dt('FILMLERDEN',  560,  95, cCYAN),
  dt('OGREN',       670,  95, cWHITE),
  // divider
  box(280, 810, 520, 5, cROSE, 0.6),
  // details
  dt('Gercek film sahneleri',  870, 52, cWHITE, FR),
  dt('Quiz + altyazi modu',    940, 52, cVIOL,  FR),
  dt('Baglamli ogrenme',      1010, 44, cGRAY,  FR),
]);

// ─────────────────────────────────────────────────────────────────
// SCENE 5 — Gamification (5s)
// ─────────────────────────────────────────────────────────────────
console.log('[5/6] Gamification...');
clip(5, [
  // three colored blocks stacked
  box(80,  420, 920, 140, cAMBER, 0.12),
  box(80,  580, 920, 140, cVIOL,  0.12),
  box(80,  740, 920, 140, cCYAN,  0.12),
  dt('XP SiSTEMi',      453, 74, cAMBER),
  dt('SERi TAKiBi',     613, 74, cVIOL),
  dt('LiDERLiK',        773, 74, cCYAN),
  // divider
  box(200, 930, 680, 5, cWHITE, 0.2),
  dt('Her gun biraz daha iyi',  990, 52, cWHITE, FR),
  dt('Basarim + rozet sistemi', 1060, 44, cGRAY, FR),
]);

// ─────────────────────────────────────────────────────────────────
// SCENE 6 — CTA (7s)
// ─────────────────────────────────────────────────────────────────
console.log('[6/6] CTA...');
clip(7, [
  box(0, 0, W, H, cVIOL, 0.07),
  box(0, 0, W, 10, cVIOL, 0.9),
  box(0, H - 10, W, 10, cCYAN, 0.9),
  box(0, 0, 10, H, cVIOL, 0.5),
  box(W - 10, 0, 10, H, cCYAN, 0.5),
  // headline
  dt('UCRETSIZ',      560, 130, cWHITE),
  dt('HEMEN BASLA',   710, 100, cCYAN),
  box(160, 870, 760, 6, cCYAN, 0.7),
  // branding
  dt('ENGLISH RHAPSODY', 950,  60, cVIOL),
  dt('englishrhapsody-78866.web.app', 1060, 34, cGRAY, FR),
]);

// ─────────────────────────────────────────────────────────────────
// Concatenate all clips
// ─────────────────────────────────────────────────────────────────
console.log('\nBirlestiriliyor...');
const listFile = path.join(TMP, 'list.txt');
fs.writeFileSync(listFile, clips.map(c => `file '${c.replace(/\\/g, '/')}'`).join('\n'));

run([
  '-y',
  '-f', 'concat', '-safe', '0',
  '-i', listFile,
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
  '-pix_fmt', 'yuv420p',
  OUT,
], 'concat → ' + OUT);

console.log('\n✓ Tamamlandi!');
console.log('  Konum:', OUT);

// Cleanup temp files
clips.forEach(c => { try { fs.unlinkSync(c); } catch(_){} });
try { fs.unlinkSync(listFile); } catch(_) {}
