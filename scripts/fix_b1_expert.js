const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');

// ── B1 → REMOVE (inflected forms, grammar fragments, duplicates, errors) ────
const b1Remove = new Set([
  // Irregular past tense forms (should use base form at A2)
  'drove','hid','wore','sold','bought','built','taught','fought','brought',
  'caught','heard','knew','meant','met','paid','ran','sat','sent','spoke',
  'spent','stood','thought','understood','won','wrote',
  // Plural / inflected nouns that duplicate the base form
  'beings',
  // Comparative / superlative forms
  'closer','bravest',
  // Participle / -ing forms used as entries
  'ending','growing','named','stored','steamed','analyzing','coordinating',
  'emphasizing','prioritizing',
  // Proper noun fragments
  'arabic','greek','latin',
  // Numeric/compound fragments
  'three-day','forty-two',
  // Grammar fragments / collocations that aren't standalone vocab
  'foster a','prioritizes over','moving toward','separating from',
  'relied','led','emphasized','coordinated',
  // Duplicates (hyphenated vs space)
  'self control',   // keep self-control
  'short term',     // keep short-term
  'long term',      // keep long-term
  // Misc errors
  'done',           // too basic for B1, already at A2
]);

// ── B1 → A1 ──────────────────────────────────────────────────────────────────
const b1ToA1 = new Set([
  'give up','wake up','have to','look for','think about',
  'go back','come back','turn on','turn off','put on','take off',
  'stand up','sit down','come in','go out',
]);

// ── B1 → A2 ──────────────────────────────────────────────────────────────────
const b1ToA2 = new Set([
  // Very common words incorrectly placed at B1
  'university','college','school','class','lesson','exam','test',
  'homework','exercise','practice',
  'website','internet','computer','phone','app','email',
  'vote','bill','fee','cost','price','pay',
  'earthquake','volcano','tsunami',
  'cook','bake','fry','boil','grill','roast',
  'breakfast','lunch','dinner','snack','meal',
  'garden','park','beach','forest','mountain','river','lake','sea','ocean',
  'weather','rain','snow','wind','cloud','sun','storm',
  'hot','cold','warm','cool',
  'fast','slow','loud','quiet','hard','soft','heavy','light',
  'health','body','mind','heart','brain',
  'read','write','speak','listen','watch','see','look','hear',
  'eat','drink','sleep','rest','work','play',
  'family','friend','teacher','student','doctor','police',
  'morning','afternoon','evening','night','today','tomorrow','yesterday',
  'week','month','year','hour','minute','second',
  'city','town','village','street','road','bridge',
  'money','bank','shop','market','supermarket',
  'car','bus','train','bike','walk','drive',
  'colour','size','shape','number','letter','word',
  'small','big','large','long','short','tall','old','young','new',
  'good','bad','nice','great','wonderful','beautiful','ugly',
  'happy','sad','scared','surprised','excited','bored','angry',
]);

// ── B1 → B2 ──────────────────────────────────────────────────────────────────
const b1ToB2 = new Set([
  // Technology
  'quantum','algorithm','artificial intelligence','machine learning',
  'neural network','data science','cybersecurity','encryption','firewall',
  'bandwidth','latency','protocol','api','metadata','repository',
  // Science
  'bacteria','fungi','virus','genome','chromosome','dna','rna',
  'enzyme','protein','membrane','nucleus','organelle',
  'photosynthesis','osmosis','evaporation','condensation',
  'velocity','acceleration','momentum','gravity','magnetism',
  'electrode','circuit','semiconductor','transistor',
  // Medical (specific)
  'fracture','nausea','dizziness','fatigue','insomnia',
  'artery','therapy','prescription','allergy','vaccine','obesity','diabetes',
  'cancer','epidemic','pandemic','quarantine',
  // Environment
  'biodiversity','ecosystem','deforestation','desertification',
  'greenhouse gas','carbon footprint','renewable energy',
  'sustainability','conservation','habitat loss',
  // Finance/Economics
  'inflation','interest rate','stock market','supply and demand',
  'economic crisis','transaction','invoice','quarterly','debt','currency',
  'loan','fund','mortgage','recession','gdp',
  // Academic
  'scholarship','thesis','undergraduate','faculty','semester','syllabus',
  'curriculum','hypothesis','methodology','dissertation','peer review',
  // Sociology/Politics
  'democracy','philosophy','psychology','infrastructure',
  'freedom of speech','working class','poverty',
  'discrimination','welfare','perseverance',
  // Abstract/Academic vocab
  'ethical','narrative','rational','proactive','progressive','resilience',
  'transition','innovative','integration','ecological',
  'constructive','decline','distribute','exclude','expand',
  'predict','specify','uncover','enquire','insist','beneficial',
  'neutral','ongoing','principal','reliable',
  'fluency','bilingual','approximate',
  'breakthrough','emphasis','uncertainty',
  'abundant','excessive','exclusive','fragile','harsh','hostile',
  'modest','remarkable','sensitive','stable','tedious','vulnerable',
]);

let fixed = 0, removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  const en = w.en.toLowerCase().trim();
  if (w.level !== 'B1') { cleanWords.push(w); continue; }

  if (b1Remove.has(en)) {
    console.log('REMOVE B1: ' + w.en);
    removed++;
    continue;
  }

  let newLevel = null;
  if (b1ToA1.has(en)) newLevel = 'A1';
  else if (b1ToA2.has(en)) newLevel = 'A2';
  else if (b1ToB2.has(en)) newLevel = 'B2';

  if (newLevel) {
    console.log(w.en + ': B1 -> ' + newLevel);
    w.level = newLevel;
    fixed++;
  }
  cleanWords.push(w);
}

console.log('\nFixed: ' + fixed + ', Removed: ' + removed);
const levels = {};
for (const w of cleanWords) levels[w.level] = (levels[w.level] || 0) + 1;
console.log('Level counts:', JSON.stringify(levels));

fs.writeFileSync(
  path.join(__dirname, '../js/data.js'),
  'const WORDS = ' + JSON.stringify(cleanWords, null, 2) + ';\n'
);
console.log('Written.');
