const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');

// ── B2 → REMOVE (tech jargon abbreviations, proper nouns, errors) ────────────
const b2Remove = new Set([
  // Dev/DevOps abbreviations not in any EFL wordlist
  'ide','vcs','mvp','ab testing','etf','bitbucket','gitlab',
  'standup meeting','kanban','scrum','bitcoin',
  // Platform-specific / trademark
  'google','twitter','facebook','instagram','youtube','netflix','amazon',
  'microsoft','apple','android','ios','linux','windows',
  // Proper nouns / country demonyms used as entries
  'american','british','english','french','german','spanish','italian',
  'chinese','japanese','russian','arabic',
  // Number / ordinal fragments
  'forty-two','three-day','sixteen-week','fifteen-minute',
  // Clearly wrong entries
  'refers to',
]);

// ── B2 → B1 ──────────────────────────────────────────────────────────────────
const b2ToB1 = new Set([
  // Science basics — B1 per Cambridge EVP
  'atom','molecule','cell','oxygen','carbon','hydrogen','nitrogen',
  'experiment','hypothesis','theory','evidence','observation',
  'energy','force','pressure','temperature','mass','volume','weight',
  'chemical','physical','biological','scientific','laboratory','equipment',
  // Medical basics
  'vaccine','epidemic','diagnosis','fracture','cancer','obesity','diabetes',
  'pandemic','quarantine','symptom','treatment','medication','dose',
  'infection','inflammation','immune','bacteria','virus',
  // Environment basics
  'biodiversity','ecosystem','solar panel','wind turbine','hydropower',
  'deforestation','habitat','migration','endangered','species',
  'drought','flood','tsunami','hurricane','earthquake','volcano',
  'climate change','global warming','pollution','recycling',
  'organic','fossil fuel','renewable',
  // Academic basics — B1
  'scholarship','semester','undergraduate','enroll','faculty','syllabus',
  'curriculum','assessment','literacy',
  // Society
  'democracy','poverty','welfare','discrimination','justice',
  'freedom of speech','working class','minority','diversity','inclusion',
  // Health / wellness basics
  'therapy','prescription','allergy','fatigue','insomnia','nausea',
  'artery','obesity','fracture','dizziness',
  // Geography basics
  'peninsula','gulf','strait','plain','highland','lowland',
  'equator','hemisphere','arctic','antarctic','canyon',
  'atmosphere','tide','current',
  // Economics basics
  'inflation','interest rate','stock market','transaction','debt',
  'currency','loan','fund','profit','contract','invoice',
  // Grammar / collocations well known at B1
  'take into account','bear in mind','take for granted',
  'make progress','carry out research','raise awareness',
  'draw a conclusion','conduct a survey',
  // General academic words well within B1
  'ethical','narrative','rational','resilience','transition',
  'innovative','integration','constructive','reliable','ongoing',
  'predict','expand','exclude','distribute','beneficial','neutral',
  'principal','approximate','fluency','bilingual',
  'emphasis','breakthrough','uncertainty','perseverance',
  'leadership','patience','courage',
  'series','episode','accent',
  // Sports
  'league','semifinal','spectator','goalkeeper','defender','striker',
  'midfielder','goalkeeper','podium','rematch',
  // Food / cooking basics
  'turmeric','hummus','falafel','couscous','risotto','paella','tapas',
  // Housing basics
  'renovation','estate','loft','cellar','driveway','patio',
]);

// ── B2 → C1 ──────────────────────────────────────────────────────────────────
const b2ToC1 = new Set([
  // Rhetoric / philosophy / academia
  'hegemony','epistemology','ontology','hubris','juxtaposition',
  'fallacy','erudite','ostentatious','rhetoric','discourse','pedagogy',
  'dialectic','axiom','empiricism','nihilism','utilitarianism',
  'phenomenology','hermeneutics','existentialism','solipsism',
  'epistemological','ontological','teleological','metaphysical',
  // Medicine specialties
  'haematology','immunology','palliative','oncology','neurology',
  'cardiology','pathology','pharmacology','epidemiology',
  'laparoscopic','endoscopy','biopsy','cytology',
  // Politics / international relations
  'geopolitics','sovereignty','multilateralism','unilateralism',
  'hegemonic','imperialism','colonialism','neoliberalism',
  'realpolitik','diplomacy','sanctions','embargo',
  // Economy advanced
  'macroeconomics','microeconomics','monetarism','keynesianism',
  'quantitative easing','derivatives','hedge fund','arbitrage',
  'collateral','amortization','liquidity','solvency',
  // Science advanced
  'quantum entanglement','superposition','dark matter','dark energy',
  'string theory','relativity','antimatter','hadron',
  'spectroscopy','chromatography','thermodynamics','electromagnetism',
  // Literature / linguistics
  'alliteration','onomatopoeia','synecdoche','metonymy','allegory',
  'euphemism','oxymoron','personification','paradox','hyperbole',
  'soliloquy','denouement','verisimilitude','catharsis',
  // Misc advanced
  'perpetual','ephemeral','ubiquitous','inexorable','immutable',
  'esoteric','arcane','abstruse','recondite','inscrutable',
  'perspicacious','loquacious','mendacious','obsequious','sycophantic',
  'ameliorate','exacerbate','obfuscate','prevaricate','vacillate',
  'concomitant','exigent','inimical','propitious','sanguine',
  'methodology','proliferation','paradigm','biomimicry','determinism',
  'genome','carbon-intensive','domain-relevant','pervasive','intrinsic',
  'cognitive','neuroscientific','wakefulness',
]);

let fixed = 0, removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  const en = w.en.toLowerCase().trim();
  if (w.level !== 'B2') { cleanWords.push(w); continue; }

  if (b2Remove.has(en)) {
    console.log('REMOVE B2: ' + w.en);
    removed++;
    continue;
  }

  let newLevel = null;
  if (b2ToB1.has(en)) newLevel = 'B1';
  else if (b2ToC1.has(en)) newLevel = 'C1';

  if (newLevel) {
    console.log(w.en + ': B2 -> ' + newLevel);
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
