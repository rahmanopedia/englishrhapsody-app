#!/usr/bin/env node
/**
 * RHAPSODY CINEMA — Tam Otomasyon
 * ================================
 * YouTube URL + zaman → indir → kes → yükle → video-data.js'e ekle
 * Hepsini tek komutla yapar.
 *
 * Kullanım:
 *   node scripts/add-cinema-clip.js
 *
 * Ardından soruları cevapla (interaktif mod).
 *
 * Ya da doğrudan argümanlarla:
 *   node scripts/add-cinema-clip.js \
 *     --url "https://youtu.be/xyz" \
 *     --start 22 --end 46 \
 *     --film "The Matrix" --year 1999 \
 *     --transcript "This is your last chance." \
 *     --tr "Bu son şansın." \
 *     --wrong1 "Yanlış seçenek 1" \
 *     --wrong2 "Yanlış seçenek 2" \
 *     --category "Aksiyon" \
 *     --points 18
 */

const { execSync, spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');
const readline = require('readline');

// ── Argüman ayrıştırıcı ─────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      result[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return result;
}

// ── Interaktif sorular ───────────────────────────────────────────────
async function prompt(rl, question, defaultVal = '') {
  return new Promise(resolve => {
    const q = defaultVal ? `${question} [${defaultVal}]: ` : `${question}: `;
    rl.question(q, ans => resolve(ans.trim() || defaultVal));
  });
}

// ── Araç kontrolü ───────────────────────────────────────────────────
function checkTools() {
  const ytdlp  = spawnSync('yt-dlp', ['--version'], { stdio: 'pipe', shell: true });
  const ffmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'pipe', shell: true });

  if (ytdlp.status !== 0) {
    console.error(`
❌ yt-dlp yüklü değil!

Kur (birini seç):
  pip install yt-dlp
  winget install yt-dlp
  scoop install yt-dlp
  brew install yt-dlp
`);
    return false;
  }

  if (ffmpeg.status !== 0) {
    console.error(`
❌ FFmpeg yüklü değil!

Kur (birini seç):
  winget install FFmpeg
  scoop install ffmpeg
  brew install ffmpeg
  Veya: https://ffmpeg.org/download.html
`);
    return false;
  }

  console.log(`✅ yt-dlp ${ytdlp.stdout.toString().trim()}`);
  console.log(`✅ FFmpeg hazır`);
  return true;
}

// ── Ana fonksiyon ────────────────────────────────────────────────────
async function main() {
  console.log(`
╔══════════════════════════════════════════════╗
║  RHAPSODY CINEMA — Klip Ekleme Sistemi       ║
╚══════════════════════════════════════════════╝
`);

  if (!checkTools()) process.exit(1);

  const args = parseArgs();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  // Bilgileri al
  const url        = args.url        || await prompt(rl, 'YouTube URL');
  const start      = parseFloat(args.start   || await prompt(rl, 'Başlangıç (saniye)'));
  const end        = parseFloat(args.end     || await prompt(rl, 'Bitiş (saniye)'));
  const film       = args.film       || await prompt(rl, 'Film adı');
  const year       = parseInt(args.year      || await prompt(rl, 'Yıl'));
  const transcript = args.transcript || await prompt(rl, 'İngilizce metin (transcript)');
  const trText     = args.tr         || await prompt(rl, 'Türkçe doğru çeviri');
  const wrong1     = args.wrong1     || await prompt(rl, 'Yanlış seçenek 1 (Türkçe)');
  const wrong2     = args.wrong2     || await prompt(rl, 'Yanlış seçenek 2 (Türkçe)');
  const category   = args.category   || await prompt(rl, 'Kategori', 'Genel');
  const points     = parseInt(args.points || await prompt(rl, 'Puan', '12'));

  rl.close();

  const dur = end - start;
  if (dur <= 0 || dur > 60) {
    console.error(`Hata: Süre ${dur}s geçersiz (1-60 saniye olmalı).`);
    process.exit(1);
  }

  // Klasör hazırla
  const clipsDir = path.join(__dirname, 'clips');
  if (!fs.existsSync(clipsDir)) fs.mkdirSync(clipsDir, { recursive: true });

  const safeFilm = film.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const ts       = Date.now();
  const rawFile  = path.join(clipsDir, `raw_${ts}.mp4`);
  const clipFile = path.join(clipsDir, `${safeFilm}_${Math.round(start)}_${Math.round(end)}.mp4`);

  // ── 1. İndir ──────────────────────────────────────────────────────
  const dlStart = Math.max(0, start - 3);
  const dlEnd   = end + 2;

  console.log(`\n📥 İndiriliyor... (${dlStart}s → ${dlEnd}s)`);
  try {
    execSync(
      `yt-dlp ` +
      `--download-sections "*${dlStart}-${dlEnd}" ` +
      `--force-keyframes-at-cuts ` +
      `-f "bestvideo[ext=mp4][height<=720]+bestaudio[ext=m4a]/best[ext=mp4]/best" ` +
      `--merge-output-format mp4 ` +
      `-o "${rawFile}" ` +
      `"${url}"`,
      { stdio: 'inherit', shell: true }
    );
  } catch (e) {
    console.error('❌ İndirme hatası:', e.message);
    process.exit(1);
  }

  if (!fs.existsSync(rawFile)) {
    console.error('❌ Dosya indirilemedi.');
    process.exit(1);
  }

  // ── 2. FFmpeg ile kes ─────────────────────────────────────────────
  const offsetStart = start - dlStart;
  console.log(`\n✂️  Kesiliyor: ${offsetStart.toFixed(2)}s → ${(offsetStart + dur).toFixed(2)}s`);

  try {
    execSync(
      `ffmpeg -y ` +
      `-ss ${offsetStart} ` +
      `-i "${rawFile}" ` +
      `-t ${dur} ` +
      `-c:v libx264 -preset fast -crf 22 ` +
      `-c:a aac -b:a 128k ` +
      `-movflags +faststart ` +
      `"${clipFile}"`,
      { stdio: 'inherit', shell: true }
    );
  } catch (e) {
    console.error('❌ FFmpeg hatası:', e.message);
    process.exit(1);
  }

  fs.unlinkSync(rawFile);

  const sizeMB = (fs.statSync(clipFile).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅ Klip hazır: ${clipFile} (${sizeMB} MB)`);

  // ── 3. video-data.js'e ekle ───────────────────────────────────────
  const videoDataPath = path.join(__dirname, '..', 'js', 'video-data.js');
  let content = fs.readFileSync(videoDataPath, 'utf8');

  // En yüksek ID'yi bul
  const ids = [...content.matchAll(/id:\s*(\d+)/g)].map(m => parseInt(m[1]));
  const nextId = ids.length ? Math.max(...ids) + 1 : 100;

  // Önce lokal path ile ekle (Firebase yüklemesi sonrası güncellenecek)
  const localRelPath = `scripts/clips/${path.basename(clipFile)}`;

  const entryStr = `
  /* ══════════════════════════════════════════════════════════
     ${film.toUpperCase()} (${year}) — AUTO-ADDED ${new Date().toISOString().slice(0,10)}
     Kaynak: ${url}
     ⚠️  URL'yi Firebase Storage'a yükledikten sonra güncelle!
  ══════════════════════════════════════════════════════════ */
  {
    id: ${nextId},
    url: "TODO_UPLOAD_TO_FIREBASE_${path.basename(clipFile)}",
    start: 0,
    end: ${Math.round(dur)},
    film: "${film}",
    year: ${year},
    transcript: "${transcript.replace(/"/g, '\\"')}",
    options: [
      { text: "${trText.replace(/"/g, '\\"')}", isCorrect: true },
      { text: "${wrong1.replace(/"/g, '\\"')}", isCorrect: false },
      { text: "${wrong2.replace(/"/g, '\\"')}", isCorrect: false }
    ],
    points: ${points},
    category: "${category}"
  },`;

  const insertPos = content.lastIndexOf('];');
  content = content.slice(0, insertPos) + entryStr + '\n\n' + content.slice(insertPos);
  fs.writeFileSync(videoDataPath, content, 'utf8');

  console.log(`
╔══════════════════════════════════════════════╗
║  ✅ TAMAMLANDI                               ║
╚══════════════════════════════════════════════╝

📁 Klip: ${clipFile}
📝 video-data.js'e eklendi (ID: ${nextId})

🚀 Sonraki adımlar:
   1. Klibi Firebase Storage'a yükle:
      Firebase Console → Storage → cinema-clips/ klasörüne sürükle
      YA DA: node scripts/upload-clip.js "${clipFile}" ${nextId}

   2. video-data.js'deki "TODO_UPLOAD_TO_FIREBASE_..." URL'sini
      Firebase Storage public URL'siyle değiştir.

   3. Test et, sonra git push yap.
`);
}

main().catch(err => { console.error(err); process.exit(1); });
