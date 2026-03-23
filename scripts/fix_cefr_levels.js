#!/usr/bin/env node
// Oxford 3000 / Cambridge EVP referans listesiyle WORDS seviyelerini düzelt

const fs   = require('fs');
const path = require('path');
const DATA = path.join(__dirname, '..', 'js', 'data.js');

eval(fs.readFileSync(DATA, 'utf8').replace('const WORDS', 'global.WORDS'));

// ── Referans CEFR listesi (Oxford 3000 + Cambridge EVP + genel bilgi) ────
// Sadece mevcut seviyeleri düzeltmek için — yanlış yüksek veya düşük atanan kelimeler
const REF = {
// ── A1 ───────────────────────────────────────────────────────────────────
  a: 'A1', able: 'A1', about: 'A1', above: 'A1', across: 'A1', after: 'A1',
  again: 'A1', age: 'A1', ago: 'A1', all: 'A1', also: 'A1', always: 'A1',
  am: 'A1', an: 'A1', and: 'A1', animal: 'A1', answer: 'A1', any: 'A1',
  apple: 'A1', are: 'A1', arm: 'A1', ask: 'A1', at: 'A1', away: 'A1',
  baby: 'A1', back: 'A1', bad: 'A1', bag: 'A1', ball: 'A1', banana: 'A1',
  bath: 'A1', be: 'A1', because: 'A1', bed: 'A1', big: 'A1', bird: 'A1',
  black: 'A1', blue: 'A1', book: 'A1', box: 'A1', boy: 'A1', bread: 'A1',
  brother: 'A1', brown: 'A1', bus: 'A1', but: 'A1', buy: 'A1', by: 'A1',
  cake: 'A1', call: 'A1', can: 'A1', car: 'A1', cat: 'A1', chair: 'A1',
  child: 'A1', children: 'A1', city: 'A1', class: 'A1', clock: 'A1',
  close: 'A1', coat: 'A1', coffee: 'A1', cold: 'A1', color: 'A1', colour: 'A1',
  come: 'A1', computer: 'A1', cook: 'A1', country: 'A1', cry: 'A1', cup: 'A1',
  dad: 'A1', dance: 'A1', day: 'A1', desk: 'A1', do: 'A1', dog: 'A1',
  door: 'A1', down: 'A1', draw: 'A1', drink: 'A1', drive: 'A1',
  ear: 'A1', eat: 'A1', egg: 'A1', eight: 'A1', evening: 'A1', eye: 'A1',
  face: 'A1', family: 'A1', fast: 'A1', fat: 'A1', father: 'A1', find: 'A1',
  fine: 'A1', finger: 'A1', fire: 'A1', first: 'A1', fish: 'A1', five: 'A1',
  fly: 'A1', food: 'A1', foot: 'A1', for: 'A1', four: 'A1', friend: 'A1',
  from: 'A1', fruit: 'A1', full: 'A1', fun: 'A1', game: 'A1', get: 'A1',
  girl: 'A1', give: 'A1', go: 'A1', good: 'A1', great: 'A1', green: 'A1',
  grey: 'A1', group: 'A1', hand: 'A1', happy: 'A1', hat: 'A1', have: 'A1',
  he: 'A1', head: 'A1', hear: 'A1', hello: 'A1', help: 'A1', her: 'A1',
  here: 'A1', him: 'A1', his: 'A1', home: 'A1', hot: 'A1', house: 'A1',
  how: 'A1', hungry: 'A1', I: 'A1', ice: 'A1', in: 'A1', is: 'A1',
  it: 'A1', jump: 'A1', key: 'A1', kitchen: 'A1', know: 'A1', lamp: 'A1',
  laugh: 'A1', learn: 'A1', left: 'A1', leg: 'A1', letter: 'A1', like: 'A1',
  listen: 'A1', little: 'A1', live: 'A1', long: 'A1', look: 'A1', love: 'A1',
  lunch: 'A1', make: 'A1', man: 'A1', map: 'A1', me: 'A1', milk: 'A1',
  mom: 'A1', money: 'A1', morning: 'A1', mother: 'A1', mouth: 'A1', music: 'A1',
  my: 'A1', name: 'A1', new: 'A1', nice: 'A1', night: 'A1', nine: 'A1',
  no: 'A1', nose: 'A1', not: 'A1', now: 'A1', number: 'A1', of: 'A1',
  old: 'A1', on: 'A1', one: 'A1', open: 'A1', orange: 'A1', our: 'A1',
  out: 'A1', park: 'A1', pen: 'A1', pencil: 'A1', phone: 'A1', photo: 'A1',
  pink: 'A1', pizza: 'A1', play: 'A1', please: 'A1', purple: 'A1',
  put: 'A1', rain: 'A1', read: 'A1', red: 'A1', ride: 'A1', right: 'A1',
  room: 'A1', run: 'A1', sad: 'A1', school: 'A1', see: 'A1', seven: 'A1',
  she: 'A1', shop: 'A1', sing: 'A1', sister: 'A1', sit: 'A1', six: 'A1',
  sky: 'A1', sleep: 'A1', small: 'A1', smile: 'A1', snow: 'A1', some: 'A1',
  sport: 'A1', stand: 'A1', start: 'A1', stop: 'A1', street: 'A1', sun: 'A1',
  swim: 'A1', table: 'A1', talk: 'A1', tall: 'A1', tea: 'A1', teacher: 'A1',
  ten: 'A1', thank: 'A1', the: 'A1', they: 'A1', three: 'A1', time: 'A1',
  tired: 'A1', today: 'A1', town: 'A1', tree: 'A1', two: 'A1', under: 'A1',
  up: 'A1', use: 'A1', very: 'A1', walk: 'A1', want: 'A1', warm: 'A1',
  watch: 'A1', water: 'A1', we: 'A1', wear: 'A1', week: 'A1', well: 'A1',
  what: 'A1', white: 'A1', who: 'A1', window: 'A1', with: 'A1', word: 'A1',
  work: 'A1', world: 'A1', write: 'A1', year: 'A1', yellow: 'A1', yes: 'A1',
  you: 'A1', young: 'A1', zoo: 'A1',

// ── A2 ───────────────────────────────────────────────────────────────────
  accept: 'A2', accident: 'A2', accommodation: 'A2', add: 'A2', adult: 'A2',
  advice: 'A2', afraid: 'A2', airport: 'A2', alone: 'A2', already: 'A2',
  although: 'A2', angry: 'A2', appear: 'A2', arrive: 'A2', art: 'A2',
  article: 'A2', asleep: 'A2', attention: 'A2', autumn: 'A2', avenue: 'A2',
  awful: 'A2', bank: 'A2', beach: 'A2', beautiful: 'A2', become: 'A2',
  bedroom: 'A2', begin: 'A2', behind: 'A2', believe: 'A2', below: 'A2',
  between: 'A2', bicycle: 'A2', birthday: 'A2', boat: 'A2', body: 'A2',
  boring: 'A2', both: 'A2', bottom: 'A2', break: 'A2', bridge: 'A2',
  bright: 'A2', bring: 'A2', building: 'A2', busy: 'A2', café: 'A2',
  camera: 'A2', capital: 'A2', care: 'A2', carry: 'A2', catch: 'A2',
  celebrate: 'A2', change: 'A2', cheap: 'A2', check: 'A2', clean: 'A2',
  clever: 'A2', club: 'A2', collect: 'A2', competition: 'A2', complete: 'A2',
  confident: 'A2', correct: 'A2', cost: 'A2', could: 'A2', count: 'A2',
  culture: 'A2', dark: 'A2', decide: 'A2', delicious: 'A2', describe: 'A2',
  different: 'A2', difficult: 'A2', dinner: 'A2', direction: 'A2',
  discover: 'A2', dream: 'A2', each: 'A2', early: 'A2', earn: 'A2',
  easy: 'A2', email: 'A2', enjoy: 'A2', enough: 'A2', enter: 'A2',
  environment: 'A2', every: 'A2', everyone: 'A2', example: 'A2', exciting: 'A2',
  exercise: 'A2', expensive: 'A2', explain: 'A2', extra: 'A2', fall: 'A2',
  famous: 'A2', fantastic: 'A2', far: 'A2', feel: 'A2', festival: 'A2',
  film: 'A2', flat: 'A2', follow: 'A2', forest: 'A2', forget: 'A2',
  free: 'A2', fresh: 'A2', front: 'A2', future: 'A2', garden: 'A2',
  goal: 'A2', gold: 'A2', guess: 'A2', guest: 'A2', guitar: 'A2',
  gym: 'A2', habit: 'A2', hard: 'A2', hate: 'A2', health: 'A2',
  heavy: 'A2', hero: 'A2', hobby: 'A2', holiday: 'A2', hospital: 'A2',
  hotel: 'A2', hour: 'A2', idea: 'A2', ill: 'A2', imagine: 'A2',
  important: 'A2', information: 'A2', internet: 'A2', invite: 'A2',
  island: 'A2', job: 'A2', join: 'A2', just: 'A2', keep: 'A2',
  kind: 'A2', lake: 'A2', language: 'A2', large: 'A2', last: 'A2',
  late: 'A2', later: 'A2', lay: 'A2', let: 'A2', library: 'A2',
  light: 'A2', list: 'A2', lot: 'A2', magazine: 'A2', main: 'A2',
  many: 'A2', market: 'A2', match: 'A2', meal: 'A2', mean: 'A2',
  meet: 'A2', member: 'A2', menu: 'A2', message: 'A2', minute: 'A2',
  miss: 'A2', mix: 'A2', modern: 'A2', month: 'A2', mountain: 'A2',
  move: 'A2', much: 'A2', must: 'A2', national: 'A2', natural: 'A2',
  near: 'A2', need: 'A2', news: 'A2', next: 'A2', noise: 'A2',
  normal: 'A2', north: 'A2', offer: 'A2', often: 'A2', only: 'A2',
  order: 'A2', other: 'A2', outside: 'A2', over: 'A2', own: 'A2',
  page: 'A2', paint: 'A2', pair: 'A2', part: 'A2', party: 'A2',
  pass: 'A2', pay: 'A2', people: 'A2', perfect: 'A2', pet: 'A2',
  picture: 'A2', piece: 'A2', place: 'A2', plan: 'A2', plant: 'A2',
  popular: 'A2', possible: 'A2', prepare: 'A2', present: 'A2', price: 'A2',
  problem: 'A2', programme: 'A2', project: 'A2', public: 'A2', quiet: 'A2',
  ready: 'A2', real: 'A2', really: 'A2', reason: 'A2', receive: 'A2',
  remember: 'A2', repeat: 'A2', restaurant: 'A2', result: 'A2', return: 'A2',
  river: 'A2', road: 'A2', same: 'A2', save: 'A2', sea: 'A2',
  second: 'A2', send: 'A2', sentence: 'A2', short: 'A2', show: 'A2',
  sign: 'A2', silver: 'A2', similar: 'A2', simple: 'A2', since: 'A2',
  size: 'A2', snow: 'A1', so: 'A2', soft: 'A2', sometimes: 'A2',
  son: 'A2', soon: 'A2', sorry: 'A2', south: 'A2', speak: 'A2',
  special: 'A2', spend: 'A2', spring: 'A2', square: 'A2', stadium: 'A2',
  station: 'A2', stay: 'A2', still: 'A2', story: 'A2', strong: 'A2',
  student: 'A2', study: 'A2', subject: 'A2', success: 'A2', summer: 'A2',
  supermarket: 'A2', sure: 'A2', take: 'A2', team: 'A2', television: 'A2',
  tell: 'A2', temperature: 'A2', test: 'A2', text: 'A2', think: 'A2',
  ticket: 'A2', together: 'A2', tomorrow: 'A2', top: 'A2', tour: 'A2',
  tourist: 'A2', travel: 'A2', try: 'A2', turn: 'A2', type: 'A2',
  umbrella: 'A2', understand: 'A2', until: 'A2', usually: 'A2', video: 'A2',
  visit: 'A2', voice: 'A2', wait: 'A2', weather: 'A2', website: 'A2',
  west: 'A2', whether: 'A2', wide: 'A2', win: 'A2', winter: 'A2',
  wish: 'A2', without: 'A2', woman: 'A2', worry: 'A2', wrong: 'A2',

// ── B1 ───────────────────────────────────────────────────────────────────
  ability: 'B1', abroad: 'B1', achieve: 'B1', action: 'B1', active: 'B1',
  actually: 'B1', advantage: 'B1', advertising: 'B1', affect: 'B1',
  afford: 'B1', agree: 'B1', aim: 'B1', allow: 'B1', amount: 'B1',
  anniversary: 'B1', anxiety: 'B1', apologize: 'B1', apply: 'B1',
  appointment: 'B1', approach: 'B1', argue: 'B1', army: 'B1', arrange: 'B1',
  atmosphere: 'B1', attack: 'B1', attitude: 'B1', audience: 'B1', avoid: 'B1',
  award: 'B1', awful: 'A2', background: 'B1', behavior: 'B1', benefit: 'B1',
  blame: 'B1', blood: 'B1', border: 'B1', borrow: 'B1', budget: 'B1',
  campaign: 'B1', career: 'B1', cause: 'B1', certain: 'B1', challenge: 'B1',
  chance: 'B1', character: 'B1', choice: 'B1', choose: 'B1', citizen: 'B1',
  collect: 'A2', communicate: 'B1', community: 'B1', compare: 'B1',
  complain: 'B1', concern: 'B1', condition: 'B1', confidence: 'B1',
  connect: 'B1', consider: 'B1', contact: 'B1', contain: 'B1', continue: 'B1',
  contribute: 'B1', control: 'B1', conversation: 'B1', crime: 'B1',
  crisis: 'B1', criticism: 'B1', current: 'B1', damage: 'B1', deal: 'B1',
  debate: 'B1', debt: 'B1', demand: 'B1', democracy: 'B1', design: 'B1',
  despite: 'B1', develop: 'B1', development: 'B1', difference: 'B1',
  disappear: 'B1', discuss: 'B1', disease: 'B1', doubt: 'B1', duty: 'B1',
  economy: 'B1', education: 'B1', effect: 'B1', effort: 'B1', election: 'B1',
  employ: 'B1', encourage: 'B1', energy: 'B1', enterprise: 'B1', equal: 'B1',
  era: 'B1', escape: 'B1', establish: 'B1', event: 'B1', evidence: 'B1',
  exist: 'B1', experience: 'B1', expert: 'B1', explain: 'A2', explore: 'B1',
  express: 'B1', fail: 'B1', fair: 'B1', finance: 'B1', fit: 'B1',
  focus: 'B1', force: 'B1', form: 'B1', freedom: 'B1', fun: 'A1',
  funny: 'B1', global: 'B1', government: 'B1', grow: 'B1', growth: 'B1',
  guess: 'A2', guide: 'B1', health: 'A2', hero: 'A2', history: 'B1',
  human: 'B1', humor: 'B1', hunger: 'B1', hurt: 'B1', identify: 'B1',
  imagine: 'A2', improve: 'B1', include: 'B1', increase: 'B1', influence: 'B1',
  injury: 'B1', issue: 'B1', judge: 'B1', knowledge: 'B1', lack: 'B1',
  law: 'B1', lead: 'B1', legal: 'B1', limit: 'B1', manage: 'B1',
  mental: 'B1', method: 'B1', mind: 'B1', minor: 'B1', mistake: 'B1',
  nature: 'B1', network: 'B1', notice: 'B1', object: 'B1', opinion: 'B1',
  opportunity: 'B1', organize: 'B1', original: 'B1', package: 'B1',
  participate: 'B1', patient: 'B1', peace: 'B1', perform: 'B1', period: 'B1',
  personal: 'B1', physical: 'B1', politics: 'B1', population: 'B1',
  position: 'B1', power: 'B1', prevent: 'B1', process: 'B1', produce: 'B1',
  progress: 'B1', property: 'B1', protect: 'B1', prove: 'B1', provide: 'B1',
  publish: 'B1', purpose: 'B1', quality: 'B1', question: 'A1', raise: 'B1',
  reaction: 'B1', reduce: 'B1', refer: 'B1', refuse: 'B1', relationship: 'B1',
  relevant: 'B1', rely: 'B1', replace: 'B1', represent: 'B1', research: 'B1',
  respond: 'B1', responsibility: 'B1', role: 'B1', rule: 'B1', safe: 'A2',
  science: 'B1', serious: 'B1', share: 'B1', situation: 'B1', skill: 'B1',
  social: 'B1', society: 'B1', solve: 'B1', source: 'B1', spread: 'B1',
  stress: 'B1', structure: 'B1', support: 'B1', survive: 'B1', system: 'B1',
  talent: 'B1', task: 'B1', technology: 'B1', tend: 'B1', theory: 'B1',
  tradition: 'B1', trust: 'B1', truth: 'B1', value: 'B1', variety: 'B1',
  violence: 'B1', waste: 'B1', wealth: 'B1', weapon: 'B1', welfare: 'B1',

// ── B2 ───────────────────────────────────────────────────────────────────
  abstract: 'B2', access: 'B2', accommodate: 'B2', accurate: 'B2',
  acknowledge: 'B2', adapt: 'B2', adequate: 'B2', administration: 'B2',
  adopt: 'B2', agenda: 'B2', allocate: 'B2', analyze: 'B2', analyse: 'B2',
  annual: 'B2', anticipate: 'B2', assess: 'B2', assist: 'B2', assumption: 'B2',
  authority: 'B2', available: 'B2', aware: 'B2', bias: 'B2', capacity: 'B2',
  category: 'B2', circumstance: 'B2', complex: 'B2', component: 'B2',
  comprehensive: 'B2', conflict: 'B2', consequence: 'B2', consistent: 'B2',
  constitute: 'B2', context: 'B2', contrast: 'B2', controversial: 'B2',
  corporate: 'B2', crucial: 'B2', decline: 'B2', define: 'B2', demonstrate: 'B2',
  deny: 'B2', depend: 'B2', derive: 'B2', diversity: 'B2', dominant: 'B2',
  economy: 'B1', efficient: 'B2', elaborate: 'B2', emerge: 'B2', emphasis: 'B2',
  enforce: 'B2', enhance: 'B2', enormous: 'B2', ensure: 'B2', evaluate: 'B2',
  eventually: 'B2', evolve: 'B2', examine: 'B2', exceed: 'B2', exclude: 'B2',
  expand: 'B2', explicit: 'B2', expose: 'B2', extend: 'B2', extent: 'B2',
  factor: 'B2', feature: 'B2', flexible: 'B2', framework: 'B2', function: 'B2',
  fundamental: 'B2', generate: 'B2', guarantee: 'B2', highlight: 'B2',
  hypothesis: 'B2', identify: 'B1', ignore: 'B2', implement: 'B2',
  imply: 'B2', impose: 'B2', indicate: 'B2', individual: 'B2', inevitable: 'B2',
  infrastructure: 'B2', initial: 'B2', initiative: 'B2', innovation: 'B2',
  instance: 'B2', integrate: 'B2', interpret: 'B2', justify: 'B2',
  logical: 'B2', maintain: 'B2', major: 'B2', mechanism: 'B2', minimize: 'B2',
  modify: 'B2', monitor: 'B2', mutual: 'B2', negative: 'B2', neutral: 'B2',
  notion: 'B2', objective: 'B2', obtain: 'B2', outcome: 'B2', overall: 'B2',
  perspective: 'B2', phenomenon: 'B2', policy: 'B2', positive: 'B2',
  potential: 'B2', precise: 'B2', primary: 'B2', principle: 'B2',
  priority: 'B2', procedure: 'B2', professional: 'B2', proportion: 'B2',
  psychological: 'B2', range: 'B2', reinforce: 'B2', require: 'B2',
  resource: 'B2', restrict: 'B2', reveal: 'B2', review: 'B2', sequence: 'B2',
  significant: 'B2', specific: 'B2', strategy: 'B2', subsequent: 'B2',
  sufficient: 'B2', summary: 'B2', survey: 'B2', sustainable: 'B2',
  target: 'B2', tendency: 'B2', transform: 'B2', transition: 'B2',
  underlying: 'B2', unique: 'B2', utilize: 'B2', variable: 'B2',
  verify: 'B2', virtually: 'B2', vulnerable: 'B2',
};

// ── Düzelt ───────────────────────────────────────────────────────────────
const LEVEL_ORDER = { A1:1, A2:2, B1:3, B2:4, C1:5, C2:6 };
const changes = [];

for (const w of WORDS) {
  const key = w.en?.toLowerCase().trim();
  if (!key || !REF[key]) continue;

  const refLevel  = REF[key];
  const curLevel  = w.level;
  if (refLevel === curLevel) continue;

  // Sadece açıkça yanlış olanları düzelt:
  // Referans A1/A2/B1 ama mevcut C1/C2 → düzelt
  // Referans B2 ama mevcut C2 → düzelt
  const refNum = LEVEL_ORDER[refLevel] || 0;
  const curNum = LEVEL_ORDER[curLevel] || 0;
  const diff   = curNum - refNum;

  if (diff >= 2) { // en az 2 seviye yukarıda ise düzelt
    changes.push({ word: w.en, from: curLevel, to: refLevel });
    w.level = refLevel;
  }
}

console.log(`Toplam düzeltme: ${changes.length}`);
changes.forEach(c => console.log(`  ${c.word}: ${c.from} → ${c.to}`));

// ── Kaydet ───────────────────────────────────────────────────────────────
const out = 'const WORDS = ' + JSON.stringify(WORDS, null, 2)
  .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, '$1:') + ';\n';
fs.writeFileSync(DATA, out, 'utf8');
console.log('\ndata.js güncellendi.');
