#!/usr/bin/env node
// Tüm WORDS.ex cümlelerini Google Translate ile çevir → ex-tr-data.js güncelle
// Kullanım: node scripts/gen_ex_tr.js
// Yarıda kalırsa tekrar çalıştır — mevcut çeviriler korunur (--force ile hepsi yenilenir)

const fs   = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE  = path.join(__dirname, '..', 'js', 'data.js');
const EXTR_FILE  = path.join(__dirname, '..', 'js', 'ex-tr-data.js');
const FORCE      = process.argv.includes('--force');

// ── Yükle ────────────────────────────────────────────────────────────────
eval(fs.readFileSync(DATA_FILE, 'utf8').replace('const WORDS', 'global.WORDS'));

let existing = {};
if (!FORCE && fs.existsSync(EXTR_FILE)) {
  try {
    eval(fs.readFileSync(EXTR_FILE, 'utf8').replace('const EX_TR', 'global._TMP_EX_TR'));
    existing = global._TMP_EX_TR || {};
  } catch(e) {}
}

// ── Google Translate ──────────────────────────────────────────────────────
function translate(text) {
  return new Promise((resolve) => {
    const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=' + encodeURIComponent(text);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const result = (json[0] || []).map(x => x?.[0] || '').join('');
          resolve(result || text);
        } catch { resolve(text); }
      });
    }).on('error', () => resolve(text));
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Ana döngü ─────────────────────────────────────────────────────────────
(async () => {
  const words = WORDS.filter(w => w.ex && w.id);
  const total  = words.length;
  let done     = 0;
  let skipped  = 0;
  const result = { ...existing };

  console.log(`Toplam: ${total} | Mevcut: ${Object.keys(existing).length} | Force: ${FORCE}`);

  for (const w of words) {
    const key = w.id;

    // Mevcut varsa atla (--force olmadıkça)
    if (!FORCE && result[key]) {
      skipped++;
      done++;
      if (done % 200 === 0) process.stdout.write(`\r${done}/${total} (${skipped} atlandı)   `);
      continue;
    }

    try {
      const tr = await translate(w.ex);
      result[key] = tr;
      done++;

      if (done % 50 === 0) {
        // Her 50'de bir kaydet
        save(result);
        process.stdout.write(`\r${done}/${total} kaydedildi...   `);
      }

      await sleep(120); // Rate limit için 120ms bekleme
    } catch (e) {
      console.error(`\nHata (${w.en}):`, e.message);
      await sleep(1000);
    }
  }

  save(result);
  console.log(`\nTamamlandı! ${done} kelime işlendi, ${skipped} atlandı.`);
  console.log(`Toplam çeviri: ${Object.keys(result).length}`);
})();

function save(data) {
  const content = 'const EX_TR=' + JSON.stringify(data) + ';\n';
  fs.writeFileSync(EXTR_FILE, content, 'utf8');
}
