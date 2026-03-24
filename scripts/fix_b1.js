const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = content.match(/const WORDS\s*=\s*(\[[\s\S]*\]);\s*$/)[1];
const WORDS = eval('(' + arrStr + ')');

// ── B1 → A2 ──────────────────────────────────────────────────────────────────
const toA2 = new Set([
  // Basic food / meals
  'breakfast','dinner','soup','pasta','chocolate','sugar',
  // Basic adjectives
  'beautiful','sunny','wonderful','healthy','helpful','lively','lonely','busy','fresh',
  // Basic nouns
  'film','grass','rabbit','party','homework','weekend','hour','birthday','gift',
  'activity','adventure','art',
  // Basic phrases / grammar patterns
  'good evening','for example','next to','on time',
  'could not','does not','were not','might not',
  // Basic household (were left at B1 from previous passes)
  'freezer','microwave','dishwasher','washing machine','vacuum cleaner','iron','toaster',
  'sheet','razor','makeup','perfume','underwear','tie',
  'magazine','envelope','receipt',
  'airplane','airport','theater',
]);

// ── B1 → B2 ──────────────────────────────────────────────────────────────────
const toB2 = new Set([
  // Technology / digital
  'cloud computing','virtual reality','bitcoin','hacker','drone','vpn',
  'responsive design','prototype','hardware','server','interface','browser',
  'virus','debug','broadband','e-commerce','gps','cloud storage',
  'streaming service','hyperlink','incognito mode',
  // Economics / finance
  'inflation','interest rate','stock market','supply and demand',
  'inflation rate','economic crisis','transaction','invoice','quarterly',
  'debt','currency','loan','fund',
  // Physical geography
  'peninsula','gulf','strait','plain','highland','lowland',
  'equator','hemisphere','arctic','antarctic','canyon',
  'atmosphere','lava','tide','current','hot spring','upstream','downstream',
  // Environment / energy
  'greenhouse effect','habitat','migration','endangered','extinct',
  'harvest','agriculture','mineral','natural gas','solar power','wind power',
  'solar panel','wind turbine','hydropower','nuclear energy','oil field','coal mine','ore',
  'coral reef','sea level','species','drought','flood','organic',
  'extinction','pollination','adaptation',
  // Society / politics
  'democracy','philosophy','psychology','infrastructure','algorithm',
  'freedom of speech','working class','global issue','poverty',
  'private sector','public sector',
  // Medical
  'fracture','nausea','dizziness','fatigue','insomnia',
  'artery','therapy','prescription','allergy','vaccine','obesity','diabetes','cancer',
  // Science
  'compound','acid','friction','density','nucleus',
  // Academia
  'scholarship','thesis','undergraduate','faculty','semester','syllabus','enroll',
  // Art
  'mosaic','watercolour','charcoal','bronze','canvas','mural',
  'contemporary art','abstract art','ceramics','collage','digital art','folk art','graffiti',
  // Sports
  'substitution','injury time','semifinal','knockout stage','league',
  'podium','rematch','spectator','goalkeeper','defender','striker',
  'midfielder','dribble','header','goalpost','freekick',
  // Food (specific world cuisines / dishes)
  'tapas','paella','risotto','quiche','couscous','falafel','hummus',
  'macaron','mousse','sorbet','fondue','turmeric',
  // Housing / property
  'estate','detached house','semi-detached','terrace','studio flat',
  'renovation','extension','utility room','loft','cellar','driveway','patio',
  // Wellbeing / professional
  'self-discipline','stress management','work-life balance','positive affirmation',
  'e-learning','seminar','vocational training','constructive criticism',
  // Media
  'binge-watch','soundtrack','blockbuster','sitcom','sequel','plot twist',
  // Academic collocations
  'conduct a survey','draw a conclusion','raise awareness',
  'take into account','bear in mind','take for granted',
  'make progress','lose track of','carry out research',
  // Abstract / academic vocabulary
  'ethical','narrative','rational','proactive','progressive','resilience',
  'sentimental','transition','synthetic','innovative','integration',
  'ecological','hereditary','hypothetical','legislative','oversight',
  'constructive','correspond','decline','distribute','exclude','expand',
  'predict','specify','uncover','enquire','insist','beneficial','distant',
  'neutral','ongoing','principal','reliable',
  'pity','regret','shame','sympathy','terror',
  'time management','special effects','cast','box office','ratings',
  'fluency','bilingual','approximate',
  'overconsumption','breakthrough','emphasis','uncertainty',
  'abundant','excessive','exclusive','fragile','harsh','hostile',
  'modest','remarkable','sensitive','stable','tedious','vulnerable',
  'immense','unprecedented',
  // Misc advanced
  'diplomacy','discrimination','welfare','perseverance',
  'sculpture','portrait','watercolour','charcoal','playwright',
  'curriculum','literacy','assessment',
  'jury','lawyer','trial','rights',
  'contract','profit','invoice',
  'species','drought','flood',
  'diversity','inclusion','minority',
  'patience','leadership',
  'episode','series','accent',
  'geography','physical education','biology','chemistry','physics','sociology',
]);

// ── B1 → C1 ──────────────────────────────────────────────────────────────────
const toC1 = new Set([
  'biomimicry','determinism','proliferation','paradigm','wakefulness',
  'neuroscientific','genome','carbon-intensive','domain-relevant',
  'pervasive','intrinsic','cognitive',
]);

// ── Remove (duplicates / data errors) ────────────────────────────────────────
const toRemove = new Set([
  'electrician 1','plumber 1','carpenter 1','librarian 1',
  'library 1','canal 1','appropriate 1',
  'maria','caf','refers to',
]);

let fixed = 0, removed = 0;
const seen = new Set();
const cleanWords = [];

for (const w of WORDS) {
  const en = w.en.toLowerCase().trim();

  // Remove duplicates and errors
  if (w.level === 'B1' && toRemove.has(en)) {
    console.log('REMOVE: ' + w.en);
    removed++;
    continue;
  }

  if (w.level !== 'B1') { cleanWords.push(w); continue; }

  let newLevel = null;
  if (toA2.has(en)) newLevel = 'A2';
  else if (toC1.has(en)) newLevel = 'C1';
  else if (toB2.has(en)) newLevel = 'B2';

  if (newLevel) {
    console.log(w.en + ': B1 -> ' + newLevel);
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
