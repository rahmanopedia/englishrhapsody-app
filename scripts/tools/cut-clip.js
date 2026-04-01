#!/usr/bin/env node
/**
 * RHAPSODY CINEMA — Otomatik Klip Kesici
 * =========================================
 * YouTube (veya başka kaynak) videosundan belirli bir zaman aralığını
 * indirir, hassas şekilde keser ve video-data.js formatında çıktı üretir.
 *
 * Kullanım:
 *   node scripts/cut-clip.js <YouTube_URL> <start_sn> <end_sn> <"Film Adı"> <yıl> <"transcript"> [kategori]
 *
 * Örnek:
 *   node scripts/cut-clip.js "https://youtu.be/zE7PKRjrid4" 22 46 "The Matrix" 1999 "This is your last chance." "Aksiyon"
 *
 * Gereksinimler (önce kur):
 *   pip install yt-dlp        (veya: winget install yt-dlp)
 *   winget install FFmpeg     (veya: choco install ffmpeg)
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ── Argümanlar ──────────────────────────────────────────────────────
const [,, url, startArg, endArg, film, year, transcript, category = 'Genel'] = process.argv;

if (!url || !startArg || !endArg || !film || !year || !transcript) {
  console.error(`
Kullanım:
  node scripts/cut-clip.js <URL> <start_sn> <end_sn> <"Film Adı"> <yıl> <"transcript"> [kategori]

Örnek:
  node scripts/cut-clip.js "https://youtu.be/abc123" 22 46 "The Matrix" 1999 "Take the red pill." "Aksiyon"
`);
  process.exit(1);
}

const start = parseFloat(startArg);
const end   = parseFloat(endArg);
const dur   = end - start;

if (dur <= 0 || dur > 60) {
  console.error(`Hata: Klip süresi ${dur}s — 1-60 saniye arasında olmalı.`);
  process.exit(1);
}

// ── Araç kontrolü ───────────────────────────────────────────────────
function checkTool(cmd) {
  const result = spawnSync(cmd, ['--version'], { stdio: 'pipe', shell: true });
  return result.status === 0;
}

if (!checkTool('yt-dlp')) {
  console.error(`
❌ yt-dlp bulunamadı. Kur:
   pip install yt-dlp
   veya: winget install yt-dlp
`);
  process.exit(1);
}

if (!checkTool('ffmpeg')) {
  console.error(`
❌ FFmpeg bulunamadı. Kur:
   winget install FFmpeg
   veya: https://ffmpeg.org/download.html
`);
  process.exit(1);
}

// ── Klasör hazırla ──────────────────────────────────────────────────
const clipsDir = path.join(__dirname, 'clips');
if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir, { recursive: true });

const safeFilm = film.replace(/[^a-z0-9]/gi, '_').toLowerCase();
const timestamp = Date.now();
const rawFile  = path.join(clipsDir, `${safeFilm}_raw_${timestamp}.mp4`);
const clipFile = path.join(clipsDir, `${safeFilm}_${Math.round(start)}_${Math.round(end)}.mp4`);

// ── İndirme ─────────────────────────────────────────────────────────
// Sadece ilgili zaman dilimini indir (tüm filmi değil)
const downloadStart = Math.max(0, start - 3); // 3 sn önceden başla (keyframe için)
const downloadEnd   = end + 2;                 // 2 sn sonrasına kadar

console.log(`\n📥 İndiriliyor: ${url}`);
console.log(`   Zaman aralığı: ${downloadStart}s → ${downloadEnd}s (${dur}s klip)`);

try {
  execSync(
    `yt-dlp ` +
    `--download-sections "*${downloadStart}-${downloadEnd}" ` +
    `--force-keyframes-at-cuts ` +
    `-f "bestvideo[ext=mp4][height<=720]+bestaudio[ext=m4a]/best[ext=mp4]/best" ` +
    `--merge-output-format mp4 ` +
    `-o "${rawFile}" ` +
    `"${url}"`,
    { stdio: 'inherit', shell: true }
  );
} catch (e) {
  console.error('❌ İndirme başarısız:', e.message);
  process.exit(1);
}

if (!fs.existsSync(rawFile)) {
  console.error('❌ İndirilen dosya bulunamadı:', rawFile);
  process.exit(1);
}

// ── FFmpeg ile hassas kesme ──────────────────────────────────────────
// İndirilen parçada gerçek başlangıç noktasını hesapla
const offsetStart = start - downloadStart;

console.log(`\n✂️  FFmpeg ile kesiliyor: ${offsetStart}s → ${offsetStart + dur}s`);

try {
  execSync(
    `ffmpeg -y ` +
    `-ss ${offsetStart} ` +
    `-i "${rawFile}" ` +
    `-t ${dur} ` +
    `-c:v libx264 -preset fast -crf 23 ` +  // video yeniden kodla (hassas kesme)
    `-c:a aac -b:a 128k ` +
    `-movflags +faststart ` +               // web streaming için
    `"${clipFile}"`,
    { stdio: 'inherit', shell: true }
  );
} catch (e) {
  console.error('❌ FFmpeg hatası:', e.message);
  process.exit(1);
}

// Ham dosyayı sil
fs.unlinkSync(rawFile);

console.log(`\n✅ Klip hazır: ${clipFile}`);
console.log(`   Boyut: ${(fs.statSync(clipFile).size / 1024 / 1024).toFixed(1)} MB`);

// ── Sonraki ID'yi bul ────────────────────────────────────────────────
const videoDataPath = path.join(__dirname, '..', 'js', 'video-data.js');
let nextId = 100;
if (fs.existsSync(videoDataPath)) {
  const content = fs.readFileSync(videoDataPath, 'utf8');
  const ids = [...content.matchAll(/id:\s*(\d+)/g)].map(m => parseInt(m[1]));
  if (ids.length) nextId = Math.max(...ids) + 1;
}

// ── video-data.js formatında çıktı ──────────────────────────────────
const localUrl = `clips/${path.basename(clipFile)}`;

const entry = {
  id: nextId,
  url: localUrl,  // Firebase Storage'a yükleyince bunu gerçek URL ile değiştir
  start: 0,
  end: Math.round(dur),
  film,
  year: parseInt(year),
  transcript,
  options: [
    { text: "← Türkçe çeviriyi buraya ekle", isCorrect: true },
    { text: "Yanlış seçenek 1", isCorrect: false },
    { text: "Yanlış seçenek 2", isCorrect: false }
  ],
  points: Math.min(20, Math.max(8, Math.round(dur))),
  category
};

console.log(`
──────────────────────────────────────────────────────
📋 video-data.js'e eklenecek giriş (ID: ${nextId}):
──────────────────────────────────────────────────────`);
console.log(JSON.stringify(entry, null, 2));

// Otomatik olarak video-data.js'e ekle
if (fs.existsSync(videoDataPath)) {
  let content = fs.readFileSync(videoDataPath, 'utf8');

  // Son ]; dan önce ekle
  const insertPos = content.lastIndexOf('];');
  if (insertPos !== -1) {
    const entryStr = `
  /* AUTO-ADDED: ${film} (${year}) — ${new Date().toISOString().slice(0,10)} */
  {
    id: ${nextId},
    url: "${localUrl}",
    start: 0,
    end: ${Math.round(dur)},
    film: "${film}",
    year: ${parseInt(year)},
    transcript: "${transcript.replace(/"/g, '\\"')}",
    options: [
      { text: "← Türkçe çeviriyi buraya gir", isCorrect: true },
      { text: "Yanlış seçenek 1", isCorrect: false },
      { text: "Yanlış seçenek 2", isCorrect: false }
    ],
    points: ${entry.points},
    category: "${category}"
  },`;

    content = content.slice(0, insertPos) + entryStr + '\n\n' + content.slice(insertPos);
    fs.writeFileSync(videoDataPath, content, 'utf8');
    console.log(`\n✅ video-data.js'e otomatik eklendi (ID: ${nextId})`);
    console.log(`   ⚠️  Türkçe çeviriyi ve yanlış seçenekleri düzenlemeyi unutma!`);
    console.log(`   ⚠️  Klibi Firebase Storage'a yükleyip URL'yi güncelle.`);
  }
}

console.log(`
──────────────────────────────────────────────────────
📁 Dosya: ${clipFile}
🚀 Sonraki adım: Firebase Storage'a yükle
   firebase storage:upload ${clipFile} /cinema-clips/${path.basename(clipFile)}
──────────────────────────────────────────────────────
`);
