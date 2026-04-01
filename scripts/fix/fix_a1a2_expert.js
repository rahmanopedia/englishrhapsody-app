const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');

// ── A1 → REMOVE (proper nouns, grammar fragments, inflected forms, errors) ───
const a1Remove = new Set([
  // Planets / proper nouns
  'mars','venus','jupiter','saturn','mercury','uranus','neptune',
  // Continents / regions (proper nouns — not vocab)
  'asia','europe','africa','australia','antarctica','north america','south america',
  // Negation grammar forms (not standalone vocab)
  'cannot','can not','must not','do not','does not','did not','is not','are not',
  'am not','was not','were not','have not','has not','had not','will not',
  'should not','could not','would not','might not','may not',
  // Inflected / participle forms
  'puts on','realized','spoken','written','eaten','given','taken','broken',
  'driven','ridden','risen','fallen','chosen','frozen','stolen','woken',
  // Compound modifiers (not standalone A1 vocab)
  'fifteen-minute','sixteen-week','two-hour','three-day',
  // Misc errors
  'a','an','the',
]);

// ── A2 → REMOVE (proper nouns, grammar fragments, inflected forms) ──────────
const a2Remove = new Set([
  // Inflected / participle forms at wrong level
  'forty-two','bravest',
  // Grammar fragments
  'foster a',
]);

// ── A1 → A2 ──────────────────────────────────────────────────────────────────
const a1ToA2 = new Set([
  // Countries that are basic geography vocab (learnable at A2)
  'brazil','egypt','mexico','japan','china','india','france','germany',
  'italy','spain','russia','canada','australia',
  // These were found in A1 but belong at A2
  'scared','surprised','bored','tired','angry','worried','disappointed',
  'dangerous','expensive','difficult',
  'subway','elevator','escalator',
  'receipt','menu','bill','tip',
  'bakery','pharmacy','hardware store',
  'cousin','nephew','niece','grandchild',
  'noon','midnight','dawn','dusk',
]);

// ── A2 → B1 ──────────────────────────────────────────────────────────────────
const a2ToB1 = new Set([
  // These belong at B1 per Oxford/Cambridge
  'visa','customs','boarding pass','departure','arrival','roundabout',
  'motorway','crossroads','petrol','pavement',
  'landlord','tenant','insurance','refund','bargain','laundry','chore',
  'lung','kidney','liver','nerve','vein','bruise','blister','scar','rash',
  'swollen','pulse','blood type','blood pressure','diagnosis','surgery',
  'wheelchair','x-ray','fever','pill','bandage','sneeze','injection',
  'stomachache','shoulder','elbow','wrist','ankle','heel',
  'anxiety','creativity','decade','disease','identity','justice','nutrition',
  'responsibility','relationship','period','role','earn','majority',
  'frequently','despite','trust','issue','generation','deadline',
  'productivity','importance','feature','freedom',
  'public transport','health care','work experience',
  'recycle','appliance','harbour',
  'ashamed','homesick','grumpy','complain',
  'pixel','resolution','hashtag','wireless','bluetooth','username',
  'courgette','aubergine','beetroot','leek','parsnip','turnip','lentil',
  'chickpea','oat','rye','barley','walnut','almond','cashew',
  'pistachio','hazelnut','sesame','mustard','basil','oregano','thyme',
  'rosemary','parsley','cinnamon','ginger','soy',
  'dough','batter','syrup','waffle','brownie','croissant','scone','custard',
  'sushi','ramen','tacos','burrito','pretzel',
  'collar','sleeve','stain','wrinkle','zip',
  'referee','athlete','training','fitness',
  'biology','chemistry','physics','geography','physical education','sociology',
  'ought to','would rather','so as to','no matter',
  'belong to','worry about','proud of','tired of',
  'focused on','aim to','set off','call off','point out','make sure',
  'oak','pine','bamboo','coral','atlantic ocean','pacific ocean',
  'indian ocean','mediterranean',
  'meditation','patience','middle class',
  'argument','classify','survey','calculate','sweep','mop',
  'budget','campaign','internship','feedback','module','profit','contract',
  'courage','protest','election','divorce','embarrassed',
  'diversity','inclusion','minority','leadership','episode','series','accent',
  'deadline','productivity',
]);

// ── A2 → B2 ──────────────────────────────────────────────────────────────────
const a2ToB2 = new Set([
  'standup meeting','database','influencer','newsfeed','marketer',
  'artichoke','asparagus','radish','pomegranate',
  'confined','emphasizes','acoustic',
]);

let fixed = 0, removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  const en = w.en.toLowerCase().trim();
  const lv = w.level;

  if (lv === 'A1') {
    if (a1Remove.has(en)) {
      console.log('REMOVE A1: ' + w.en);
      removed++;
      continue;
    }
    if (a1ToA2.has(en)) {
      console.log(w.en + ': A1 -> A2');
      w.level = 'A2'; fixed++;
    }
  } else if (lv === 'A2') {
    if (a2Remove.has(en)) {
      console.log('REMOVE A2: ' + w.en);
      removed++;
      continue;
    }
    if (a2ToB1.has(en)) {
      console.log(w.en + ': A2 -> B1');
      w.level = 'B1'; fixed++;
    } else if (a2ToB2.has(en)) {
      console.log(w.en + ': A2 -> B2');
      w.level = 'B2'; fixed++;
    }
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
