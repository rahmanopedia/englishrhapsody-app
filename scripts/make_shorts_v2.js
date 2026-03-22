const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const FF  = 'C:/Users/ruhme/ffmpeg_extracted/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe';
const OUT = 'C:/Users/ruhme/OneDrive/Masaüstü/Yeni klasör (5)/english_rhapsody_shorts_v2.mp4';
const TMP = path.join(os.tmpdir(), 'er_shorts3');
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP, { recursive: true });

const W = 1080, H = 1920, FPS = 30;
const FB = 'C\\:/Windows/Fonts/arialbd.ttf';
const FR = 'C\\:/Windows/Fonts/arial.ttf';

const CYAN  = '0x00d4ff';
const VIOL  = '0x8b5cf6';
const AMBER = '0xf59e0b';
const WHITE = '0xffffff';
const GRAY  = '0x94a3b8';
const ROSE  = '0xf43f5e';
const PINK  = '0xec4899';
const BLACK = '0x000000';

function run(args, label) {
  console.log('  Running:', label || args.slice(-1)[0]);
  const r = spawnSync(FF, args, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
  if (r.status !== 0) {
    console.error(r.stderr ? r.stderr.slice(-3000) : 'no stderr');
    throw new Error('ffmpeg failed: ' + label);
  }
}

function esc(t) {
  return t
    .replace(/\\/g, '\\\\')
    .replace(/'/g, '\u2019')
    .replace(/:/g, '\\:');
}

// ---------- comma-free expression helpers ----------
// max(0, x)  via abs:  (x + abs(x)) / 2
function mx0(x)  { return `(${x}+abs(${x}))/2`; }
// min(1, v)  via abs:  (1 + v - abs(1-v)) / 2
function mn1(v)  { return `(1+${v}-abs(1-${v}))/2`; }
// clamp to [0,1]: min(1, max(0, x))
function c01(x)  { const m = mx0(x); return mn1(m); }

// alpha: fades from 0→1 over 0.5s starting at startT
function aExpr(startT) { return c01(`(t-${startT})/0.5`); }
// alpha: fades from 0→1 over 0.6s starting at startT
function aExpr6(startT) { return c01(`(t-${startT})/0.6`); }
// slide: from +65px to 0 over 0.5s starting at startT (capped at 65 before start)
function sExpr(startT) { return `65*${mx0(`1-(t-${startT})/0.5`)}`; }

// ---------- draw helpers ----------
function esc2(t) { return t.replace(/\\/g, '\\\\').replace(/'/g, '\u2019').replace(/:/g, '\\:'); }

// Centered static text
function dt(text, y, size, color, font) {
  return `drawtext=fontfile='${font||FB}':text='${esc2(text)}':x=(w-text_w)/2:y=${y}:fontsize=${size}:fontcolor=${color}`;
}

// Slide-up + fade (centered)
function dta(text, y, size, color, startT, font) {
  const f = font||FB, e = esc2(text);
  return `drawtext=fontfile='${f}':text='${e}':x=(w-text_w)/2:y=${y}+${sExpr(startT)}:fontsize=${size}:fontcolor=${color}:alpha=${aExpr(startT)}`;
}

// Slide-up + fade + glow border (centered)
function dtag(text, y, size, color, glowC, startT, font) {
  const f = font||FB, e = esc2(text);
  return `drawtext=fontfile='${f}':text='${e}':x=(w-text_w)/2:y=${y}+${sExpr(startT)}:fontsize=${size}:fontcolor=${color}:borderw=10:bordercolor=${glowC}@0.18:alpha=${aExpr(startT)}`;
}

// Slide-up + fade, centered at specific pixel x-column
function dtaX(text, cx, y, size, color, startT, font) {
  const f = font||FB, e = esc2(text);
  return `drawtext=fontfile='${f}':text='${e}':x=${cx}-text_w/2:y=${y}+${sExpr(startT)}:fontsize=${size}:fontcolor=${color}:alpha=${aExpr(startT)}`;
}

// Fade-in only (centered)
function dtf(text, y, size, color, startT, font) {
  const f = font||FB, e = esc2(text);
  return `drawtext=fontfile='${f}':text='${e}':x=(w-text_w)/2:y=${y}:fontsize=${size}:fontcolor=${color}:alpha=${aExpr6(startT)}`;
}

// Static filled box
function box(x, y, w, h, color, alpha) {
  alpha = alpha == null ? 1 : alpha;
  return `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${color}@${alpha}:t=fill`;
}

// Radial glow background via geq — no quotes (expressions have no colons/commas)
// spread: 40000=tight, 200000=medium, 400000=full-screen
function bgGlow(cx, cy, br, bg, bb, gr, gg, gb, spread) {
  const d = `(X-${cx})*(X-${cx})+(Y-${cy})*(Y-${cy})`;
  return `geq=r=${br}+${gr}*exp(-(${d})/${spread}):g=${bg}+${gg}*exp(-(${d})/${spread}):b=${bb}+${gb}*exp(-(${d})/${spread})`;
}

const clips = [];
let ci = 0;

function clip(dur, filters) {
  const outFile = path.join(TMP, `clip${ci++}.mp4`);
  const fadeOut = dur - 0.5;
  const vf = filters.join(',')
    + `,noise=alls=6:allf=t`
    + `,vignette=angle=PI/4`
    + `,fade=t=in:st=0:d=0.5,fade=t=out:st=${fadeOut}:d=0.5`;
  run([
    '-y', '-f', 'lavfi',
    '-i', `color=c=#040912:s=${W}x${H}:r=${FPS}:d=${dur}`,
    '-vf', vf,
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-t', String(dur),
    outFile,
  ], path.basename(outFile));
  console.log('    OK:', path.basename(outFile));
  clips.push(outFile);
}

// ═══════════════════════════════════════════════════════════
// SCENE 1 — Brand (6s)
// ═══════════════════════════════════════════════════════════
console.log('\n[1/6] Brand...');
clip(6, [
  bgGlow(540, 880, 4, 8, 22, 45, 25, 110, 350000),
  box(0,   0,   W,  6, CYAN, 0.95),
  box(0, H-6,   W,  6, VIOL, 0.95),
  box(0,   0,   5,  H, VIOL, 0.30),
  box(W-5, 0,   5,  H, CYAN, 0.30),
  box(60, 640, 960, 270, CYAN, 0.05),
  dtag('ENGLISH',  660, 195, CYAN, CYAN, 0.20),
  dtag('RHAPSODY', 882, 128, VIOL, VIOL, 0.55),
  box(180, 1065, 720, 3, CYAN, 0.50),
  dta('Akilli Ingilizce Ogrenme', 1108, 46, WHITE, 1.05, FR),
  dtf('Turkce konusanlar icin',   1172, 36, GRAY,  1.30, FR),
]);

// ═══════════════════════════════════════════════════════════
// SCENE 2 — Big Stat (5s)
// ═══════════════════════════════════════════════════════════
console.log('[2/6] Stat...');
clip(5, [
  bgGlow(180, 640, 8, 6, 4, 88, 54, 14, 130000),
  box( 50, 510,   8, 400, AMBER, 0.90),
  box(100, 510, 880, 400, AMBER, 0.06),
  dtag('800+', 545, 270, AMBER, AMBER, 0.10),
  dta('KELIME VE IFADE', 842, 56, WHITE, 0.45),
  box(240, 945, 600, 3, AMBER, 0.50),
  dtf('Kopru modu + film ifadeleri',  990, 40, GRAY, 0.90, FR),
  dtf('Turkce konusanlar icin ozel', 1044, 36, GRAY, 1.10, FR),
]);

// ═══════════════════════════════════════════════════════════
// SCENE 3 — Speaking (5s)
// ═══════════════════════════════════════════════════════════
console.log('[3/6] Speaking...');
const waveH = [120, 80, 160, 220, 75, 240, 125, 195, 105, 175, 235, 95, 155, 200];
clip(5, [
  bgGlow(540, 800, 4, 10, 16, 18, 42, 72, 280000),
  ...waveH.map((h, i) =>
    box(30 + i * 72, 480 - Math.floor(h / 2), 44, h, CYAN, 0.10 + (h / 240) * 0.22)
  ),
  dta('KONUSUYOR',  730, 128, WHITE, 0.20),
  dtag('MUSUN?',    875, 128, CYAN, CYAN, 0.45),
  box(200, 1055, 680, 3, CYAN, 0.50),
  dta('AI telaffuz analizi',      1100, 50, VIOL, 0.85),
  dtf('Skor al + gelisimini gor', 1168, 40, GRAY,  1.05, FR),
  dtf('Her seferinde daha iyi',   1222, 40, WHITE, 1.25, FR),
]);

// ═══════════════════════════════════════════════════════════
// SCENE 4 — Cinema (5s)
// ═══════════════════════════════════════════════════════════
console.log('[4/6] Cinema...');
clip(5, [
  bgGlow(540, 960, 6, 4, 8, 55, 18, 38, 300000),
  box(0,       0,  W, 190, BLACK, 0.93),
  box(0, H - 190,  W, 190, BLACK, 0.93),
  dta('FILMLERDEN',  545, 108, WHITE, 0.20),
  dtag('OGREN',      668, 175, ROSE, ROSE, 0.45),
  box(280, 900, 520, 3, ROSE, 0.60),
  dta('Gercek film sahneleri',  948, 50, WHITE, 0.85),
  dtf('Quiz + altyazi modu',   1012, 44, PINK,  1.05, FR),
  dtf('Baglamli ogrenme',      1072, 40, GRAY,  1.25, FR),
]);

// ═══════════════════════════════════════════════════════════
// SCENE 5 — Gamification (4s)
// ═══════════════════════════════════════════════════════════
console.log('[5/6] Gamification...');
clip(4, [
  bgGlow(540, 960, 5, 5, 15, 28, 18, 80, 320000),
  box( 40, 570, 300, 350, AMBER, 0.12),
  box( 40, 570,   7, 350, AMBER, 0.90),
  box(390, 570, 300, 350, VIOL,  0.12),
  box(390, 570,   7, 350, VIOL,  0.90),
  box(740, 570, 300, 350, CYAN,  0.12),
  box(740, 570,   7, 350, CYAN,  0.90),
  dtaX('XP',    190, 630, 90, AMBER, 0.20),
  dtaX('SERI',  540, 630, 90, VIOL,  0.35),
  dtaX('ROZET', 890, 630, 90, CYAN,  0.50),
  dtaX('Puan Kazan', 190, 742, 36, AMBER, 0.50, FR),
  dtaX('Devam Et',   540, 742, 36, VIOL,  0.65, FR),
  dtaX('Basari Al',  890, 742, 36, CYAN,  0.80, FR),
  box(200, 980, 680, 3, WHITE, 0.15),
  dta('Her gun biraz daha iyi',     1024, 48, WHITE, 0.90),
  dtf('Basarim + liderlik tablosu', 1090, 34, GRAY,  1.10, FR),
]);

// ═══════════════════════════════════════════════════════════
// SCENE 6 — CTA (7s)
// ═══════════════════════════════════════════════════════════
console.log('[6/6] CTA...');
clip(7, [
  bgGlow(540, 960, 5, 5, 20, 62, 30, 128, 420000),
  box(0,   0,   W,   8, CYAN, 0.95),
  box(0, H-8,   W,   8, VIOL, 0.95),
  box(0,   0,   8,   H, VIOL, 0.60),
  box(W-8, 0,   8,   H, CYAN, 0.60),
  box( 30,  30, W-60, 4, CYAN, 0.22),
  box( 30, H-34, W-60, 4, VIOL, 0.22),
  box( 80, 820, 920, 260, CYAN, 0.08),
  box( 80, 820,   8, 260, CYAN, 0.80),
  box(W-88, 820,  8, 260, VIOL, 0.80),
  dta('UCRETSIZ',    840, 140, WHITE, 0.30),
  dtag('HEMEN BASLA',990,  96, CYAN, CYAN, 0.60),
  box(160, 1140, 760, 3, CYAN, 0.60),
  dtf('ENGLISH RHAPSODY',              1180, 52, VIOL, 1.10),
  dtf('englishrhapsody-78866.web.app', 1250, 30, GRAY, 1.30, FR),
]);

// ═══════════════════════════════════════════════════════════
// Concatenate
// ═══════════════════════════════════════════════════════════
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

clips.forEach(c => { try { fs.unlinkSync(c); } catch(_){} });
try { fs.unlinkSync(listFile); } catch(_) {}
