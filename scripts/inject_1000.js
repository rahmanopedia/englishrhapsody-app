/**
 * Injects all Grammar Quest questions into quantum.js:
 * - 180 from gq_extra.json + a1Extra (30 per level: A1-C2)
 * - 700 from gq_1000.json (116-117 per level: A1-C2)
 * Total: 120 original + 180 + 700 = 1000
 */
const fs = require('fs');
const path = require('path');

const a1Extra = [
  {level:"A1",topic:"pronouns",q:"___ is my brother. He is tall.",c:["He","Him","His","Himself"],a:0,hint:"subject pronoun before a verb"},
  {level:"A1",topic:"negatives",q:"I ___ like coffee.",c:["don't","doesn't","not","no"],a:0,hint:"I/you/we/they + don't"},
  {level:"A1",topic:"questions",q:"___ do you live?",c:["What","Who","Where","When"],a:2,hint:"\"where\" asks about place"},
  {level:"A1",topic:"imperatives",q:"___ quiet, please!",c:["Be","Are","Is","Am"],a:0,hint:"imperative = base form of verb"},
  {level:"A1",topic:"articles",q:"I have ___ umbrella.",c:["a","an","the","—"],a:1,hint:"\"an\" before vowel sound"},
  {level:"A1",topic:"possessive s",q:"That is ___ bag.",c:["Sara","Saras","Sara's","Saras'"],a:2,hint:"apostrophe + s for possession"},
  {level:"A1",topic:"prepositions of place",q:"The cat is ___ the box.",c:["in","on","at","with"],a:0,hint:"\"in\" = inside something"},
  {level:"A1",topic:"can",q:"I ___ swim but I can't fly.",c:["can","cans","am able","could"],a:0,hint:"\"can\" base form, no -s ever"},
  {level:"A1",topic:"want to",q:"Do you ___ some water?",c:["want","wants","wanting","wanted"],a:0,hint:"do + base form"},
  {level:"A1",topic:"numbers",q:"She has ___ children: Tom and Lisa.",c:["one","two","three","four"],a:1,hint:"two names listed"},
  {level:"A1",topic:"adjectives",q:"She has ___ eyes.",c:["a blue","blue","blues","bluely"],a:1,hint:"adjective before noun, no article needed"},
  {level:"A1",topic:"question words",q:"___ is your birthday?",c:["Who","What","Where","When"],a:3,hint:"\"when\" asks about time"},
  {level:"A1",topic:"and / but",q:"I like tea ___ I don't like coffee.",c:["and","but","so","or"],a:1,hint:"\"but\" contrasts two ideas"},
  {level:"A1",topic:"simple present",q:"He ___ TV every evening.",c:["watch","watches","watching","watched"],a:1,hint:"he/she/it + verb+s/es"},
  {level:"A1",topic:"my / your",q:"Is this ___ pen?",c:["you","your","yours","yourself"],a:1,hint:"possessive adjective before noun"},
  {level:"A1",topic:"there are",q:"There ___ five students in the room.",c:["is","are","was","were"],a:1,hint:"\"there are\" for plural noun"},
  {level:"A1",topic:"how old",q:"___ old are you?",c:["What","Which","How","Who"],a:2,hint:"\"how old\" asks about age"},
  {level:"A1",topic:"ordinals",q:"January is the ___ month.",c:["one","first","oneth","once"],a:1,hint:"ordinals: first, second, third"},
  {level:"A1",topic:"have got",q:"She ___ a new phone.",c:["have got","has got","got","haves got"],a:1,hint:"he/she/it + has got"},
  {level:"A1",topic:"prepositions of time",q:"My birthday is ___ March.",c:["at","on","in","by"],a:2,hint:"\"in\" for months"},
  {level:"A1",topic:"some / any",q:"Is there ___ milk in the fridge?",c:["some","any","a","the"],a:1,hint:"\"any\" in questions"},
  {level:"A1",topic:"days of the week",q:"Today is Monday. Tomorrow is ___.",c:["Sunday","Tuesday","Saturday","Wednesday"],a:1,hint:"Monday comes before Tuesday"},
  {level:"A1",topic:"adjective before noun",q:"She is a ___ girl.",c:["nice","nicely","nicer","nicest"],a:0,hint:"adjective (not adverb) before noun"},
  {level:"A1",topic:"whose",q:"___ jacket is this?",c:["Who","Whose","Who's","Whom"],a:1,hint:"\"whose\" asks about possession"},
  {level:"A1",topic:"do you like",q:"What do you ___?",c:["like","likes","liking","liked"],a:0,hint:"do + base form"},
  {level:"A1",topic:"singular noun",q:"There is one ___ and two dogs.",c:["cats","cat","a cat","the cats"],a:1,hint:"'one' + singular noun"},
  {level:"A1",topic:"to be negative",q:"She ___ a doctor. She is a nurse.",c:["isn't","aren't","don't","wasn't"],a:0,hint:"she + is not → isn't"},
  {level:"A1",topic:"weather",q:"It ___ cold today.",c:["have","has","is","are"],a:2,hint:"weather uses 'it is'"},
  {level:"A1",topic:"would like",q:"I ___ a cup of tea, please.",c:["like","would like","likes","liking"],a:1,hint:"\"would like\" = polite request"},
  {level:"A1",topic:"frequency adverbs",q:"She ___ forgets her keys. It happens every day.",c:["never","always","sometimes","rarely"],a:1,hint:"every day = always"},
];

const extras = JSON.parse(fs.readFileSync(path.join(__dirname, 'gq_extra.json'), 'utf8')); // 150 (A2-C2, 30 each)
const news = JSON.parse(fs.readFileSync(path.join(__dirname, 'gq_1000.json'), 'utf8')); // 700 new

const allNew = [...a1Extra, ...extras, ...news];

// Verify counts
const counts = {};
allNew.forEach(q => counts[q.level] = (counts[q.level]||0)+1);
console.log('Extra to inject:', counts, 'Total:', allNew.length);

let code = fs.readFileSync(path.join(__dirname, '../js/quantum.js'), 'utf8');

function findArrayEnd(code) {
  const idx = code.indexOf('GRAMMAR_QUEST_Q=');
  const arrStart = idx + 'GRAMMAR_QUEST_Q='.length;
  let depth = 0;
  for (let i = arrStart; i < code.length; i++) {
    if (code[i] === '[') depth++;
    else if (code[i] === ']') { depth--; if (depth === 0) return i; }
  }
}

function esc(s) { return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"'); }
function serialize(q) {
  const choices = q.c.map(c => `"${esc(c)}"`).join(',');
  return `{level:"${q.level}",topic:"${esc(q.topic)}",q:"${esc(q.q)}",c:[${choices}],a:${q.a},hint:"${esc(q.hint)}"}`;
}

const end = findArrayEnd(code);
console.log('Inserting at index:', end);

const insertion = ',' + allNew.map(serialize).join(',');
const newCode = code.slice(0, end) + insertion + code.slice(end);
fs.writeFileSync(path.join(__dirname, '../js/quantum.js'), newCode, 'utf8');

// Final verification
const newEnd = findArrayEnd(newCode);
const seg = newCode.slice(newCode.indexOf('GRAMMAR_QUEST_Q='), newEnd);
let total = 0;
['A1','A2','B1','B2','C1','C2'].forEach(l => {
  const count = (seg.match(new RegExp(`level:"${l}"`, 'g')) || []).length;
  total += count;
  console.log(`${l}: ${count}`);
});
console.log('TOTAL:', total);
