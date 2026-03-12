const fs = require('fs');
const d = fs.readFileSync('./js/data.js','utf8');
// Extract all words with id, en, level
const re = /\{id:'([^']+)',en:'([^']+)',tr:'([^']+)'/g;
let m;
const words = [];
while((m = re.exec(d)) !== null) {
  words.push(`${m[1]}|${m[2]}|${m[3]}`);
}
fs.writeFileSync('./words-list.txt', words.join('\n'));
console.log('Extracted', words.length, 'words to words-list.txt');

// Also extract PHRASE_DICT keys from app.js
const app = fs.readFileSync('./js/app.js','utf8');
const pdRe = /^\s+'([^']+)':\s*\{[^}]*type:'([^']+)'[^}]*tr:'([^']+)'/gm;
const phrases = [];
while((m = pdRe.exec(app)) !== null) {
  phrases.push(`${m[1]}|${m[2]}|${m[3]}`);
}
fs.writeFileSync('./phrases-list.txt', phrases.join('\n'));
console.log('Extracted', phrases.length, 'phrases to phrases-list.txt');
