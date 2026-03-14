const fs = require('fs');

const dataPath = 'js/data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

const startMarker = 'const WORDS = [';
const endMarker = '];';
const startIdx = content.indexOf(startMarker);
const endIdx = content.lastIndexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error("WORDS dizisi bulunamadı!");
    process.exit(1);
}

let wordsPart = content.slice(startIdx + startMarker.length, endIdx);

const entries = [];
// Regex'i daha esnek hale getiriyorum (tırnak ve yapı farklılıkları için)
const regex = /\{id:.*?\}/gs;
let match;

console.log("5000+ kelime tek tek inceleniyor ve düzeltiliyor...");

while ((match = regex.exec(wordsPart)) !== null) {
    let rawEntry = match[0];
    
    // Değerleri tırnak içinden veya dışından (sayı ise) çekiyoruz
    const getVal = (key) => {
        const r = new RegExp(`${key}:\\s*['"](.*?)['"]`, 'i');
        const m = rawEntry.match(r);
        return m ? m[1] : "";
    };

    const getId = () => {
        const r = /id:\s*(['"]?)(.*?)\1[,}]/i;
        const m = rawEntry.match(r);
        return m ? m[2] : "0";
    };

    let en = getVal('en');
    let tr = getVal('tr');
    let level = getVal('level') || "A1";
    let icon = getVal('icon') || "📚";
    let ex = getVal('ex');
    let id = getId();

    // 1. DÜZELTME: Alt çizgileri ve gereksiz boşlukları sil
    en = en.replace(/^[_ ]+|[_ ]+$/g, '').replace(/_/g, ' ').trim();
    
    // 2. DÜZELTME: "Kelime", "Phrasal Verb" gibi junk etiketleri temizle
    const junkLabels = ["kelime", "phrasal verb", "noun phrase", "verb", "adjective", "adverb", "isim tamlaması", "deyim", "isim", "fiil", "sıfat"];
    if (junkLabels.includes(tr.toLowerCase()) || tr.trim() === "") {
        tr = en; // Eğer Türkçe anlam bozuksa veya tanımsızsa, İngilizce halini yaz ki kullanıcı ne yazacağını bilsin
    }

    // 3. DÜZELTME: Karakter kodlaması (Encoding)
    tr = tr.replace(/Ã¼/g, 'ü').replace(/Ã¶/g, 'ö').replace(/Ä±/g, 'ı').replace(/ÅŸ/g, 'ş').replace(/Ã§/g, 'ç').replace(/ÄŸ/g, 'ğ')
           .replace(/Ãœ/g, 'Ü').replace(/Ã–/g, 'Ö').replace(/Ä°/g, 'İ').replace(/Åž/g, 'Ş').replace(/Ã‡/g, 'Ç').replace(/Ä/g, 'Ğ');

    // 4. DÜZELTME: Cümle içindeki tırnak kaçışları
    ex = ex.replace(/'/g, "\\'");

    // Yeni temiz objeyi oluştur (Formatı koruyarak)
    const newEntry = `{id:'${id}',en:'${en}',tr:'${tr}',ipa:'/${en}/',level:'${level}',cat:'',icon:'${icon}',ex:'${ex}',syns:[],colloc:[]}`;
    entries.push(newEntry);
}

const finalContent = `const WORDS = [\n  ${entries.join(',\n  ')}\n];\n`;
fs.writeFileSync(dataPath, finalContent, 'utf-8');

console.log(`${entries.length} kelime tertemiz hale getirildi.`);
