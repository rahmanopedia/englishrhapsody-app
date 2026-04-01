const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = content.match(/const WORDS\s*=\s*(\[[\s\S]*\]);\s*$/)[1];
const WORDS = eval('(' + arrStr + ')');

// A1 — çok temel kelimeler
const toA1 = new Set([
  'good news','several','something','anyone','bigger','poor','sixteen',
  'found','thank you','am not','in front of'
]);

// A2 — temel kalıplar, anlatı cümleleri, sayılar
const toA2 = new Set([
  // Narrative action phrases
  'looked away','look under','look over','walked away','walked over',
  'ran past','went inside','went in','came around','sat under','sat around',
  'stood back','jumped over','fell behind','hid behind',
  // Grammar/function patterns
  'ought to','as soon as','even if','by the way','no matter','at the end',
  'should not','had not','not yet',
  // Basic vocab
  'team work','everyday life','traffic jam','fast food','tenth',
  'twenty-minute','thirty-five','runner','delete','bear','planner'
]);

// B1 — orta seviye
const toB1 = new Set([
  'under pressure','keep up with','alongside','chain','immense','incredible',
  'night-school','short-term','panicking','tackle','takeaway','crunch',
  'wage','deeply','highly','largely','toward','throughout'
]);

// B2 — üst orta
const toB2 = new Set([
  'public opinion','civil rights','national security','death rate',
  'nervous system','decision making','decision-making','self confidence',
  'lunar','holistic','eradicate','conventional','correlate','confront',
  'domain','vertical','thinker','latter','crowd','sense','dedicated',
  'embrace','fate','grant','manufacturing','pose','primarily','regulate',
  'revenue','serve','thoroughly','outrage','render','select','stretch',
  'steady','sourdough','computational','grid-scale',
  // Idioms
  'bite the bullet','blessing in disguise','through thick and thin',
  'make ends meet','miss the boat',
  // Phrasal verbs
  'take over','come back','go back','fill in','check in','depend on',
  'listen to','apply for','grapple with','away from','known for',
  'lives in','good at','potential for',
  // Common collocations
  'air pollution','fossil fuel','mental health','social media',
  'good at','known for'
]);

// C1 — ileri seviye
const toC1 = new Set([
  'holistic','eradicate','conventional','confront','domain','thinker',
  'inscribe','sore','consult','enrol','homemade','multilateral',
  'begun','ambivalence','contempt','melancholy','indignation',
  'amortization','hegemony','sovereignty','jurisdiction','arbitration',
  'litigation','accreditation','rebuttal','privatization','parameter',
  'methodology','criterion','validity','reliability','remorse','euphoria',
  'apathy','ambiguity','predominant','profoundly','commemorate','inhabit',
  'impair','contend','deem','elaborate','empirical','implicit','integral',
  'inherent','manifest','self-efficacy','metacognition','genomics',
  'triage','pharmacology','pathology','prognosis','epidemiology',
  'deterrence','diaspora','interdisciplinary','conceptualise'
]);

let fixed = 0;
for (const w of WORDS) {
  if (w.level !== 'C2') continue;
  const en = w.en.toLowerCase().trim();
  let newLevel = null;
  if (toA1.has(en)) newLevel = 'A1';
  else if (toA2.has(en)) newLevel = 'A2';
  else if (toB1.has(en)) newLevel = 'B1';
  else if (toB2.has(en)) newLevel = 'B2';
  else if (toC1.has(en)) newLevel = 'C1';
  if (newLevel) {
    console.log(w.en + ': C2 -> ' + newLevel);
    w.level = newLevel;
    fixed++;
  }
}

console.log('\nTotal fixed: ' + fixed);
const levels = {};
for (const w of WORDS) levels[w.level] = (levels[w.level]||0)+1;
console.log('Level counts:', JSON.stringify(levels));

fs.writeFileSync(path.join(__dirname, '../js/data.js'), 'const WORDS = ' + JSON.stringify(WORDS, null, 2) + ';\n');
console.log('Written.');
