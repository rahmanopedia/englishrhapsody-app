const fs = require('fs');

const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const categories = ['Günlük Yaşam', 'İş Dünyası', 'Teknoloji', 'Akademik', 'Sağlık', 'Seyahat'];
const icons = ['🏠', '💼', '💻', '📚', '🩺', '✈️'];

function generateMockEntry(word, index) {
    const level = cefrLevels[index % cefrLevels.length];
    const catIdx = index % categories.length;
    
    // TEMİZLEME: Kelimenin başındaki/sonundaki _ karakterlerini ve boşlukları atıyoruz.
    let cleanEn = word.en.replace(/^[_ ]+|[_ ]+$/g, '').trim();
    // Kelime içindeki _ karakterlerini boşluğa çeviriyoruz (oyunda hata olmaması için).
    cleanEn = cleanEn.replace(/_/g, ' ');

    return {
        id: `auto_${index}_${cleanEn.replace(/\s+/g, '_')}`,
        en: cleanEn,
        tr: word.tr, 
        ipa: `/${cleanEn}/`,
        level: level,
        cat: `${level} ${categories[catIdx]}`,
        icon: icons[catIdx],
        ex: `This is an example sentence for the word ${cleanEn}.`,
        syns: [],
        colloc: []
    };
}

function readList(filePath) {
    // UTF-8 olarak okuyoruz (Türkçe karakterlerin doğru gelmesi için).
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n')
        .map(l => l.trim())
        .filter(l => l.includes('|'))
        .map(l => {
            const parts = l.split('|');
            const en = parts[0].trim();
            // en|en|tr formatı varsa parts[2] anlamdır, yoksa parts[1] anlamdır.
            let tr = (parts.length > 2 && parts[2]) ? parts[2].trim() : (parts[1] ? parts[1].trim() : en);
            
            // Eğer anlam hala EN ile aynıysa ve bir Phrasal Verb/Deyim ise temizleyelim.
            if (tr.startsWith('_')) tr = tr.replace(/^[_ ]+|[_ ]+$/g, '').trim();

            return { en, tr };
        });
}

const wordsFile = 'words-list.txt';
const phrasesFile = 'phrases-list.txt';

const wordsRaw = readList(wordsFile);
const phrasesRaw = readList(phrasesFile);

const allRaw = [...wordsRaw, ...phrasesRaw];
console.log(`Found ${allRaw.length} raw entries.`);

const newEntries = allRaw.map((w, i) => generateMockEntry(w, i + 2000));

let dataPath = 'js/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf-8');

// Eski otomatik girişleri temizleyelim (Daha sağlam bir yöntemle)
const firstAutoIdx = dataContent.indexOf('{id:"auto_');
if (firstAutoIdx !== -1) {
    console.log("Removing previous auto-generated entries...");
    // WORDS dizisinin sonlandığı yere ( ]; ) kadar olan kısmı bulup oradan keselim.
    // Orijinal verinin bittiği id: 899 civarıydı.
    let cutPoint = dataContent.lastIndexOf('},', firstAutoIdx);
    if (cutPoint !== -1) {
        dataContent = dataContent.slice(0, cutPoint + 2) + '\n];';
    }
}

const arrayStartMarker = 'const WORDS = [';
const startIdx = dataContent.indexOf(arrayStartMarker);

if (startIdx === -1) {
    console.error("Could not find WORDS array start.");
    process.exit(1);
}

// WORDS dizisinin kapanış braketini bul ( ] )
let depth = 0;
let endIdx = -1;
for (let i = startIdx + arrayStartMarker.length - 1; i < dataContent.length; i++) {
    if (dataContent[i] === '[') depth++;
    if (dataContent[i] === ']') {
        depth--;
        if (depth === 0) {
            endIdx = i;
            break;
        }
    }
}

if (endIdx !== -1) {
    const newEntriesStr = newEntries.map(e => JSON.stringify(e)).join(',\n  ');
    const updatedContent = dataContent.slice(0, endIdx) + ',\n  ' + newEntriesStr + dataContent.slice(endIdx);
    // Kayıt ederken UTF-8 bomsuz olarak kaydediyoruz.
    fs.writeFileSync(dataPath, updatedContent, 'utf-8');
    console.log(`Successfully added ${newEntries.length} cleaned and corrected entries to data.js.`);
} else {
    console.error("Could not find WORDS array end.");
}
