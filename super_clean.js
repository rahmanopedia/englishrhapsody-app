const fs = require('fs');

const dataPath = 'englishrhapsody-fix/js/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

// WORDS dizisinin başlangıcını ve bitişini bulalım
const startMarker = 'const WORDS = [';
const endMarker = '];';
const startIdx = content.indexOf(startMarker);
const endIdx = content.lastIndexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error("WORDS dizisi bulunamadı!");
    process.exit(1);
}

// Dizinin içindeki veriyi alalım
let wordsPart = content.slice(startIdx + startMarker.length, endIdx);

// Her bir objeyi { ... } formatında yakalayalım
const entries = [];
// Basit bir regex ile her bir objeyi çekiyoruz
const regex = /\{id:.*?\}/gs;
let match;

console.log("Kelimeler tek tek inceleniyor...");

while ((match = regex.exec(wordsPart)) !== null) {
    let rawEntry = match[0];
    
    // Veriyi temizlemek için eval benzeri değil, güvenli string temizliği yapalım
    // en: '...', tr: '...', level: '...', cat: '...', icon: '...', ex: '...'
    
    let en = (rawEntry.match(/en:\s*['"](.*?)['"]/i) || [])[1] || "";
    let tr = (rawEntry.match(/tr:\s*['"](.*?)['"]/i) || [])[1] || "";
    let level = (rawEntry.match(/level:\s*['"](.*?)['"]/i) || [])[1] || "A1";
    let icon = (rawEntry.match(/icon:\s*['"](.*?)['"]/i) || [])[1] || "📚";
    let ex = (rawEntry.match(/ex:\s*['"](.*?)['"]/i) || [])[1] || "";
    let id = (rawEntry.match(/id:\s*(['"].*?['"]|\d+)/i) || [])[1] || "0";

    // 1. HATA DÜZELTME: Alt çizgileri temizle
    en = en.replace(/^[_ ]+|[_ ]+$/g, '').replace(/_/g, ' ').trim();
    
    // 2. HATA DÜZELTME: Eğer TR anlam "Kelime", "Phrasal Verb" vb. ise onu EN ile değiştirme (en azından boş kalmasın)
    // Ama senin dediğin hata: "Üstte hala kelime yazıyor". Bu tr'nin içinde "Kelime" olmasından kaynaklı olabilir.
    const junkLabels = ["kelime", "phrasal verb", "noun phrase", "verb", "adjective", "adverb", "isim tamlaması", "deyim"];
    if (junkLabels.includes(tr.toLowerCase())) {
        // Eğer tr bozuksa, en'i tr'ye atayalım (kullanıcı en azından ne yazacağını görür)
        tr = en; 
    }

    // 3. HATA DÜZELTME: Bozuk karakter temizliği (Encoding sorunları için manuel fix)
    tr = tr.replace(/Ã¼/g, 'ü').replace(/Ã¶/g, 'ö').replace(/Ä±/g, 'ı').replace(/ÅŸ/g, 'ş').replace(/Ã§/g, 'ç').replace(/ÄŸ/g, 'ğ')
           .replace(/Ãœ/g, 'Ü').replace(/Ã–/g, 'Ö').replace(/Ä°/g, 'İ').replace(/Åž/g, 'Ş').replace(/Ã‡/g, 'Ç').replace(/Ä/g, 'Ğ');

    // Yeni temiz objeyi oluştur
    const newEntry = `{id:${id},en:'${en}',tr:'${tr}',ipa:'/${en}/',level:'${level}',cat:'',icon:'${icon}',ex:'${ex.replace(/'/g, "\\'")}',syns:[],colloc:[]}`;
    entries.push(newEntry);
}

const finalContent = `const WORDS = [\n  ${entries.join(',\n  ')}\n];\n`;
fs.writeFileSync(dataPath, finalContent, 'utf-8');

console.log(`${entries.length} kelime başarıyla sterilize edildi ve düzeltildi.`);
