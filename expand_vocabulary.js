const fs = require('fs');
const path = require('path');

const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const categories = ['Günlük Yaşam', 'İş Dünyası', 'Teknoloji', 'Akademik', 'Sağlık', 'Seyahat'];
const icons = ['🏠', '💼', '💻', '📚', '🩺', '✈️'];

function generateMockEntry(word, index) {
    const level = cefrLevels[index % cefrLevels.length];
    const catIdx = index % categories.length;
    return {
        id: `auto_${index}_${word.en.replace(/\s+/g, '_')}`,
        en: word.en,
        tr: word.tr, 
        ipa: `/${word.en}/`,
        level: level,
        cat: `${level} ${categories[catIdx]}`,
        icon: icons[catIdx],
        ex: `This is an example sentence for the word ${word.en}.`,
        syns: [],
        colloc: []
    };
}

const wordsFile = 'words-list.txt';
const phrasesFile = 'phrases-list.txt';

const wordsRaw = fs.readFileSync(wordsFile, 'utf-8').split('\n').filter(l => l.includes('|')).map(l => {
    const parts = l.split('|');
    const tr = parts[2] ? parts[2].trim() : parts[1].trim();
    return { en: parts[0].trim(), tr: tr };
});

const phrasesRaw = fs.readFileSync(phrasesFile, 'utf-8').split('\n').filter(l => l.includes('|')).map(l => {
    const parts = l.split('|');
    const tr = parts[2] ? parts[2].trim() : parts[1].trim();
    return { en: parts[0].trim(), tr: tr };
});

const allRaw = [...wordsRaw, ...phrasesRaw];
console.log(`Found ${allRaw.length} raw entries.`);

const newEntries = allRaw.map((w, i) => generateMockEntry(w, i + 2000));

let dataPath = 'js/data.js';
let dataContent = fs.readFileSync(dataPath, 'utf-8');

const firstAutoIdx = dataContent.indexOf('{id:"auto_');
if (firstAutoIdx !== -1) {
    console.log("Removing previous auto-generated entries...");
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
    fs.writeFileSync(dataPath, updatedContent, 'utf-8');
    console.log(`Successfully added ${newEntries.length} corrected entries to data.js.`);
} else {
    console.error("Could not find WORDS array end.");
}
