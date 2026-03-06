// Audit script - find all hardcoded Turkish strings in app.js
const fs = require('fs');
const lines = fs.readFileSync('./js/app.js', 'utf8').split('\n');

const turkishPatterns = [
  /[ğışüöçĞİŞÜÖÇ]/,  // Turkish characters
  /\b(Kelime|Örnek|Anlam|Eş|Pratik|Dinle|Konuş|Başla|Bitir|Doğru|Yanlış|Ekle|Seri|kaldı|Ayar|Liste|Geliştir|Telaffuz|Sık Kullanılan|Önceki|Sonraki|Seçin|boşluk|veritaban|eklendi|Hikaye|okuma)\b/,
];

const skip = /^\s*\/\/|tr:|es:|en_def:|PHRASE_DICT|WORD_ES|LANG_UI|PHRASE_ES|PHRASE_EN|typeColors|_tc\s*=|\.test\(e\.key\)|'#[0-9a-f]{6}'|bg:'#/;

const results = [];
lines.forEach((line, i) => {
  if (skip.test(line)) return;
  for (const pat of turkishPatterns) {
    if (pat.test(line)) {
      results.push(`${i+1}: ${line.trim().slice(0,120)}`);
      break;
    }
  }
});

console.log(`Found ${results.length} lines with hardcoded Turkish:\n`);
results.forEach(r => console.log(r));
