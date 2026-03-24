const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = content.match(/const WORDS\s*=\s*(\[[\s\S]*\]);\s*$/)[1];
const WORDS = eval('(' + arrStr + ')');

// A1 → A2
const toA2 = new Set([
  // Adjectives
  'careful','clever','correct','dangerous','deep','delicious','different',
  'difficult','dirty','dry','early','empty','excited','expensive','false',
  'famous','fantastic','favorite','final','flat','cool',
  // Jobs
  'garbage collector','cashier',
  // Household tools
  'drawer','bucket','brush','scissors','hammer','nail','broom','fridge','stove','sink','tap',
  // Fruits & vegetables
  'grape','melon','peach','pear','plum','cherry','avocado','cabbage','cauliflower',
  'celery','spinach','pumpkin','mushroom','coconut','fig','pineapple','lime',
  'mango','papaya','kiwi','carrot','onion','garlic',
  // Animals
  'butterfly','bee','ant','spider','worm','frog','turtle','eagle','owl',
  'wolf','fox','whale','dolphin','shark',
  // Time
  'midnight','noon','dawn','dusk','quarter','dozen',
  // School items
  'chalk','ruler','rubber','folder','timetable','dictionary',
  // Sports
  'goal','court','racket','bat','helmet','medal','trophy',
  // Medical
  'stomachache','cough','sneeze','fever','pill','bandage','injection','appointment',
  // Body parts (specific)
  'shoulder','elbow','wrist','thumb','ankle','heel','chest','stomach','skin','bone',
  // Other
  'swimming pool','winner','loser','mint','jam','ketchup','biscuit','cracker',
  'muffin','donut','button','pocket','ambulance','weight','height','playground',
  'good news','bad news','several','competition','freedom',
  // Phrases
  'used to','belong to','worry about','proud of','wait for',
]);

// A1 → B1
const toB1 = new Set([
  // Social/political collocations
  'public health','equal rights','social issue','clean energy','water pollution',
  'crime rate','physical health','mental illness','physical activity',
  'communication skills','team player','common sense','self control',
  // Phrases
  'cope with','pay off','check out','listened to','prepared for',
  'look inside','look across','not even','long-term',
  // Vocabulary
  'overall','especially','literally','neither','trend','typical',
  'possess','threaten','pillar','intense','promising','researcher',
  'materials','software','confusion','graphic',
]);

// A1 → B2
const toB2 = new Set([
  'law enforcement',
]);

// Data errors — remove entirely
const toRemove = new Set([
  'doctor 1','sapir','medina','sam','sang','mixing',
]);

let fixed = 0;
let removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  if (w.level !== 'A1') { cleanWords.push(w); continue; }
  const en = w.en.toLowerCase().trim();

  if (toRemove.has(en)) {
    console.log('REMOVE: ' + w.en);
    removed++;
    continue; // skip — don't add to cleanWords
  }

  let newLevel = null;
  if (toA2.has(en)) newLevel = 'A2';
  else if (toB1.has(en)) newLevel = 'B1';
  else if (toB2.has(en)) newLevel = 'B2';

  if (newLevel) {
    console.log(w.en + ': A1 -> ' + newLevel);
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
