const fs = require('fs');

const appJs   = fs.readFileSync('./js/app.js',  'utf8');
const dataJs  = fs.readFileSync('./js/data.js', 'utf8');

// ── 1. Extract PHRASE_DICT keys ───────────────────────────────────────
const pdStart = appJs.indexOf('const PHRASE_DICT = {');
const pdEnd   = appJs.indexOf('\n};', pdStart) + 3;
const pdBlock = appJs.slice(pdStart, pdEnd);
const phraseKeys = new Set();
const pkRe = /^\s+'([^']+)':/gm;
let m;
while ((m = pkRe.exec(pdBlock)) !== null) phraseKeys.add(m[1].toLowerCase());

// ── 2. Extract WORDS from data.js ─────────────────────────────────────
const wordSet = new Set();
// match word:'...' entries
const wRe = /word:'([^']+)'/g;
while ((m = wRe.exec(dataJs)) !== null) wordSet.add(m[1].toLowerCase());

// ── 3. Extract all story texts ────────────────────────────────────────
const storyTexts = [];
const stRe = /text:'((?:[^'\\]|\\.)*)'/g;
while ((m = stRe.exec(dataJs)) !== null) storyTexts.push(m[1]);

// ── 4. Lemmatise helper ───────────────────────────────────────────────
function lemmas(w) {
  const forms = new Set([w]);
  // Match app.js lemmatizer exactly, plus extra forms
  if (w.endsWith('ing') && w.length > 5) {
    const r = w.slice(0,-3);
    forms.add(r);          // running→run, taking→tak
    forms.add(r+'e');      // taking→take, having→have
    if (r.length>2 && r[r.length-1]===r[r.length-2]) forms.add(r.slice(0,-1)); // running→run
  } else if (w.endsWith('ed') && w.length > 4) {
    const r = w.slice(0,-2);
    forms.add(r);          // walked→walk, noticed→notic
    forms.add(w.slice(0,-1)); // noticed→notice, arrived→arrive
    if (r.length>2 && r[r.length-1]===r[r.length-2]) forms.add(r.slice(0,-1)); // stopped→stop
  } else if (w.endsWith('ies') && w.length > 5) {
    forms.add(w.slice(0,-3)+'y'); // communities→community, cities→city
  } else if (w.endsWith('es') && w.length > 4) {
    forms.add(w.slice(0,-2)); // fixes→fix
    forms.add(w.slice(0,-1)); // makes→make
  } else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) {
    forms.add(w.slice(0,-1)); // cats→cat
  }
  if (w.endsWith("'s")) forms.add(w.slice(0,-2));
  if (w.endsWith("s'")) forms.add(w.slice(0,-1));
  // Extra morphological forms
  if (w.endsWith('ly') && w.length > 4) { forms.add(w.slice(0,-2)); forms.add(w.slice(0,-3)); }
  if (w.endsWith('er') && w.length > 4) { forms.add(w.slice(0,-2)); forms.add(w.slice(0,-2)+'e'); }
  if (w.endsWith('est') && w.length > 5) { forms.add(w.slice(0,-3)); }
  if (w.endsWith('tion')) { forms.add(w.slice(0,-4)); forms.add(w.slice(0,-3)); }
  if (w.endsWith('ation')) { forms.add(w.slice(0,-5)); forms.add(w.slice(0,-5)+'e'); }
  if (w.endsWith('ment')) forms.add(w.slice(0,-4));
  if (w.endsWith('ness')) forms.add(w.slice(0,-4));
  if (w.endsWith('ful')) forms.add(w.slice(0,-3));
  if (w.endsWith('less')) forms.add(w.slice(0,-4));
  if (w.endsWith('able') || w.endsWith('ible')) { forms.add(w.slice(0,-4)); forms.add(w.slice(0,-4)+'e'); }
  if (w.endsWith('ical')) forms.add(w.slice(0,-4));
  if (w.endsWith('ical')) forms.add(w.slice(0,-2));
  if (w.endsWith('ive')) { forms.add(w.slice(0,-3)); forms.add(w.slice(0,-3)+'e'); }
  if (w.endsWith('ive') && w.length > 5) forms.add(w.slice(0,-2));
  if (w.endsWith('al') && w.length > 4) forms.add(w.slice(0,-2));
  if (w.endsWith('ic') && w.length > 4) forms.add(w.slice(0,-2));
  if (w.endsWith('ous') && w.length > 5) { forms.add(w.slice(0,-3)); forms.add(w.slice(0,-3)+'e'); }
  if (w.endsWith('ity') && w.length > 5) { forms.add(w.slice(0,-3)); forms.add(w.slice(0,-2)); }
  if (w.endsWith('ise') || w.endsWith('ize')) forms.add(w.slice(0,-3));
  if (w.endsWith('ism')) forms.add(w.slice(0,-3));
  if (w.endsWith('ist')) forms.add(w.slice(0,-3));
  if (w.endsWith('er') && w.length > 4) forms.add(w.slice(0,-2)+'e');
  return [...forms];
}

// ── 5. Stop-words / proper nouns / articles / etc. ───────────────────
// Proper nouns (character names, author names, place names) — no translation needed
const PROPER = new Set([
  'sophie','ali','leo','anna','mia','nina','daniel','david','tom','emma','ben',
  'clara','lila','maya','kai','sara','rosa','marta','zoe','patrick','jade',
  'amara','victor','yuki','sofia','fatima','sasha','chloe','aisha','marco',
  'priya','james','tariq','hassan','filip','okafor','tanaka','biscuit','max',
  'williams','chen','sarah','kahneman','tversky','seligman','amabile','assmann',
  'rousseau','hobbes','locke','jan','amos','teresa','martin','helen','duhigg',
  'kim','lisa','luna','miller','mary','john','ella','emily','patrick','george',
  'adam','luke','jake','julia','olivia','lena','jay','nick','mr','mrs','ms','dr',
  // place names
  'morocco','istanbul','canada','africa','east','west','north','south',
  // hyphenated/special tokens the regex might produce
  'ly','ing','ed','o',
]);

const STOP = new Set([
  'a','an','the','and','or','but','nor','so','yet','for','of','in','on','at',
  'to','by','up','as','if','it','its','is','are','was','were','be','been',
  'being','have','has','had','do','does','did','will','would','could','should',
  'may','might','must','shall','can','not','no','nor','with','from','into',
  'than','that','this','these','those','he','she','they','we','you','i','me',
  'him','her','us','them','my','his','our','your','their','who','which','what',
  'when','where','how','why','all','both','each','every','few','more','most',
  'other','some','such','too','very','just','also','now','then','here','there',
  'out','off','over','under','again','further','about','above','after','before',
  'between','through','during','against','without','within','along','across',
  'behind','around','among','near','since','until','while','although','though',
  'because','even','only','already','often','never','always','sometimes','soon',
  'still','back','much','many','own','same','long','well','new','old','first',
  'last','next','two','three','four','five','six','seven','eight','nine','ten',
  'one','any','each','either','neither','both','whether','else','however','thus',
  'therefore','hence','indeed','rather','quite','almost','enough','instead',
  'despite','upon','per','via','once','twice','away','down','up','left','right',
  'came','come','comes','coming','go','goes','going','went','gone','get','gets',
  'got','getting','make','makes','made','making','take','takes','took','taking',
  'put','puts','putting','keep','keeps','kept','keeping','let','lets','letting',
  'see','sees','saw','seen','seeing','know','knows','knew','known','knowing',
  'think','thinks','thought','thinking','say','says','said','saying','tell',
  'tells','told','telling','show','shows','showed','shown','showing','seem',
  'seems','seemed','seeming','want','wants','wanted','wanting','need','needs',
  'needed','needing','use','uses','used','using','try','tries','tried','trying',
  'ask','asks','asked','asking','help','helps','helped','helping','feel','feels',
  'felt','feeling','become','becomes','became','becoming','leave','leaves','left',
  'leaving','bring','brings','brought','bringing','begin','begins','began',
  'beginning','call','calls','called','calling','turn','turns','turned','turning',
  'find','finds','found','finding','give','gives','gave','given','giving',
  'hold','holds','held','holding','stand','stands','stood','standing','hear',
  'hears','heard','hearing','let','run','runs','ran','running','walk','walks',
  'walked','walking','live','lives','lived','living','play','plays','played',
  'playing','move','moves','moved','moving','sit','sits','sat','sitting',
  'write','writes','wrote','written','writing','read','reads','reading',
  'open','opens','opened','opening','close','closes','closed','closing',
  'stop','stops','stopped','stopping','start','starts','started','starting',
  'grow','grows','grew','grown','growing','set','sets','setting','buy','buys',
  'bought','buying','pay','pays','paid','paying','meet','meets','met','meeting',
  'eat','eats','ate','eaten','eating','drink','drinks','drank','drunk','drinking',
  'sleep','sleeps','slept','sleeping','work','works','worked','working',
  'send','sends','sent','sending','receive','receives','received','receiving',
  'stay','stays','stayed','staying','wait','waits','waited','waiting',
  'speak','speaks','spoke','spoken','speaking','listen','listens','listened',
  'learn','learns','learned','learning','watch','watches','watched','watching',
  'look','looks','looked','looking','talk','talks','talked','talking',
  'love','loves','loved','loving','like','likes','liked','liking','hope',
  'hopes','hoped','hoping','plan','plans','planned','planning','share',
  'shares','shared','sharing','spend','spends','spent','spending','join',
  'joins','joined','joining','pass','passes','passed','passing','carry',
  'carries','carried','carrying','cut','cuts','cutting','fall','falls',
  'fell','fallen','falling','follow','follows','followed','following',
  'agree','agrees','agreed','agreeing','add','adds','added','adding',
  'win','wins','won','winning','lose','loses','lost','losing','return',
  'returns','returned','returning','change','changes','changed','changing',
  'happen','happens','happened','happening','create','creates','created',
  'creating','offer','offers','offered','offering','rise','rises','rose',
  'risen','rising','reach','reaches','reached','reaching','enjoy','enjoys',
  'enjoyed','enjoying','choose','chooses','chose','chosen','choosing',
  'decide','decides','decided','deciding','bring','count','place','line',
  'side','hand','head','face','door','house','room','time','day','year',
  'man','men','woman','women','child','children','people','person','family',
  'home','life','world','way','thing','part','lot','end','point','kind',
  'case','fact','night','morning','afternoon','evening','week','month',
  'water','air','light','place','land','city','town','road','street','school',
  'job','money','word','name','group','number','area','car','body','book',
  'eye','hand','mind','heart','voice','foot','feet','arm','hair','ear',
  'white','black','red','blue','green','yellow','small','big','large','great',
  'little','young','good','bad','true','false','right','wrong','real','free',
  'open','full','clear','early','late','hard','easy','sure','close','short',
  'high','low','hot','cold','dark','bright','long','wide','deep','heavy',
  'light','soft','fast','slow','old','young','happy','sad','nice','fine',
  'far','near','away','together','alone','already','often','sometimes',
  // contractions / possessives
  "it's","that's","he's","she's","they're","we're","you're","i'm","don't",
  "doesn't","didn't","can't","won't","isn't","aren't","wasn't","weren't",
  "i've","they've","we've","you've","i'll","they'll","we'll","you'll",
  "i'd","they'd","we'd","you'd","he'd","she'd","couldn't","wouldn't",
  "shouldn't","mustn't","hadn't","hasn't","haven't",
  // misc
  'o\'clock','etc','vs','i.e','e.g','mr','mrs','ms','dr','st','rd','th',
  'zero','ten','eleven','twelve','twenty','thirty','forty','fifty','sixty',
  'hundred','thousand','million','billion',
]);

// ── 6. Scan all stories ───────────────────────────────────────────────
const missing = new Map(); // word → count

for (const raw of storyTexts) {
  // remove cloze markers {word} from text for scanning
  const text = raw.replace(/\{[^}]+\}/g, ' ');
  // tokenise
  const tokens = text.match(/[a-zA-Z''-]+/g) || [];
  for (let tok of tokens) {
    const w = tok.toLowerCase().replace(/^'+|'+$/g, '');
    if (!w || w.length < 2) continue;
    if (STOP.has(w)) continue;
    if (PROPER.has(w)) continue;
    // check PHRASE_DICT exact
    if (phraseKeys.has(w)) continue;
    // check WORDS
    if (wordSet.has(w)) continue;
    // check lemmas
    const ls = lemmas(w);
    let found = false;
    for (const l of ls) {
      if (phraseKeys.has(l) || wordSet.has(l)) { found=true; break; }
    }
    if (found) continue;
    // MISSING
    missing.set(w, (missing.get(w)||0)+1);
  }
}

// ── 7. Sort and print ─────────────────────────────────────────────────
const sorted = [...missing.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
console.log(`\nTotal missing unique words: ${sorted.length}\n`);
console.log(sorted.map(([w,c])=>`${w} (${c})`).join('\n'));
