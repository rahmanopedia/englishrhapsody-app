const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = content.match(/const WORDS\s*=\s*(\[[\s\S]*\]);\s*$/)[1];
const WORDS = eval('(' + arrStr + ')');

// B2 → C1
const toC1 = new Set([
  // Research methods / academic
  'quantitative','qualitative','empirical','hypothesis','methodology',
  'criterion','validity','reliability','correlation','statistical',
  // Philosophy / consciousness
  'consciousness','perception','utopia',
  // Art movements
  'expressionism','minimalism','modernism',
  // Politics / law (advanced)
  'sovereignty','judiciary','amendment','authoritarian','propaganda',
  // Education psychology
  'pedagogy','metacognition','self-efficacy','impostor syndrome',
  // Economics (advanced)
  'venture capital','gross domestic product',
  // Science (advanced)
  'thermodynamics','kinetic energy',
  // Medicine (specialist)
  'autopsy','biopsy','osteoporosis',
  // Other advanced
  'ubiquitous','referendum',
]);

// B2 → C2
const toC2 = new Set([
  'epidemiology','genomics','taxonomy',
  'oxidise','electrolysis','isotope',
  'disenfranchisement','utilitarianism',
  'chemotherapy',
]);

// Remove (duplicates / data errors)
const toRemove = new Set([
  'firewall 1','globalization 1','outsourcing 1','translator 1',
  'latitude 1','longitude 1',
  'ci cd','ids ips','ssl tls','nfts','api key',
  'grid-scale','three-part','late-life','post-war',
  'uncheck',
]);

let fixed = 0, removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  if (w.level !== 'B2') { cleanWords.push(w); continue; }
  const en = w.en.toLowerCase().trim();

  if (toRemove.has(en)) {
    console.log('REMOVE: ' + w.en);
    removed++;
    continue;
  }

  let newLevel = null;
  if (toC1.has(en)) newLevel = 'C1';
  else if (toC2.has(en)) newLevel = 'C2';

  if (newLevel) {
    console.log(w.en + ': B2 -> ' + newLevel);
    w.level = newLevel;
    fixed++;
  }
  cleanWords.push(w);
}

console.log('\nFixed: ' + fixed + ', Removed: ' + removed);
const levels = {};
for (const w of cleanWords) levels[w.level] = (levels[w.level]||0)+1;
console.log('Level counts:', JSON.stringify(levels));

fs.writeFileSync(
  path.join(__dirname, '../js/data.js'),
  'const WORDS = ' + JSON.stringify(cleanWords, null, 2) + ';\n'
);
console.log('Written.');
