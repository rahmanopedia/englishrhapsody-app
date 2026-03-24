const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = content.match(/const WORDS\s*=\s*(\[[\s\S]*\]);\s*$/)[1];
const WORDS = eval('(' + arrStr + ')');

// ── A2 → B1 ──────────────────────────────────────────────────────────────────
const toB1 = new Set([
  // Social / abstract
  'anxiety','creativity','decade','disease','identity','justice','nutrition',
  'responsibility','relationship','period','role','earn','majority','frequently',
  'despite','trust','issue','generation','deadline','productivity','importance',
  'feature','freedom','diversity','inclusion','minority','leadership','episode',
  'series','accent','courage','protest','election','divorce','embarrassed',
  'budget','campaign','internship','feedback','module','profit','contract',
  'argument','classify','survey','calculate','sweep','mop','sadness',
  // Collocations
  'public transport','health care','work experience',
  // Travel / transport
  'departure','arrival','visa','boarding pass','customs','roundabout',
  'motorway','crossroads','petrol','pavement',
  // Housing / services
  'landlord','tenant','insurance','refund','bargain','chore','laundry',
  'recycle','appliance','harbour','chest of drawers','insurance card',
  // Medical / body (B1 per Oxford/Cambridge)
  'lung','kidney','liver','nerve','muscle','joint','vein','bruise','blister',
  'scar','rash','swollen','pulse','blood type','blood pressure',
  'diagnosis','surgery','wheelchair','x-ray','fever','pill','bandage',
  'sneeze','injection','stomachache','shoulder','elbow','wrist','ankle','heel',
  // Emotions
  'ashamed','homesick','grumpy','complain',
  // Tech
  'pixel','resolution','hashtag','wireless','bluetooth','username',
  // Food — specific herbs, nuts, grains, less-common veg, world cuisines
  'courgette','aubergine','beetroot','leek','parsnip','turnip','lentil',
  'chickpea','kidney bean','oat','rye','barley','walnut','almond','cashew',
  'pistachio','hazelnut','sesame','mustard','basil','oregano','thyme',
  'rosemary','parsley','cinnamon','ginger','soy','cabbage',
  'dough','batter','syrup','mayonnaise','waffle','brownie','croissant',
  'scone','custard','sushi','ramen','tacos','burrito','pretzel',
  // Clothing
  'collar','sleeve','stain','wrinkle','zip',
  // Sport / fitness
  'referee','athlete','training','fitness',
  // School subjects
  'biology','chemistry','physics','geography','physical education','sociology',
  // Grammar patterns
  'ought to','would rather','so as to','no matter',
  'belong to','worry about','proud of','tired of',
  'focused on','aim to','set off','call off','point out','make sure',
  // Nature
  'oak','pine','bamboo','coral','antarctica',
  'pacific ocean','atlantic ocean','indian ocean','mediterranean',
  // Other
  'meditation','patience','middle class',
]);

// ── A2 → B2 ──────────────────────────────────────────────────────────────────
const toB2 = new Set([
  'standup meeting','database','influencer','newsfeed','marketer',
  'artichoke','asparagus','radish','pomegranate',
  'confined','emphasizes','acoustic',
]);

// ── Remove (duplicates / data errors) ────────────────────────────────────────
const toRemove = new Set([
  'mirror 1','wallet 1','butcher 1','dentist 1',
]);

let fixed = 0;
let removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  if (w.level !== 'A2') { cleanWords.push(w); continue; }
  const en = w.en.toLowerCase().trim();

  if (toRemove.has(en)) {
    console.log('REMOVE: ' + w.en);
    removed++;
    continue;
  }

  let newLevel = null;
  if (toB1.has(en)) newLevel = 'B1';
  else if (toB2.has(en)) newLevel = 'B2';

  if (newLevel) {
    console.log(w.en + ': A2 -> ' + newLevel);
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
