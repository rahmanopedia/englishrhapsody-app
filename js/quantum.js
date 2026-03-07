// ════════════════════════════════════════════════════════════════
//  QUANTUM GAME CENTER v5.0 — Sentence Building Games
// ════════════════════════════════════════════════════════════════

const QUANTUM_SCENARIOS = [
  {
    id:'s1', icon:'🍎',
    subj:{w:'I',          type:'I',  obj_form:'me'        },
    verb:{v1:'eat',     v2:'ate',      v3:'eaten',    ving:'eating'    },
    obj: {w:'an apple',       type:'sg'},
    tr:'Ben bir elma yerim.',
    trData:{
      act:{ subj:'Ben', obj:'bir elma',
        pres:['yerim','yemem'], prg:['yiyorum','yemiyorum'],
        past:['yedim','yemedim'], ppas:['yemiştim','yememiştim'],
        fut:['yiyeceğim','yemeyeceğim'] },
      pass:{ subj:'Bir elma', agent:'benim tarafımdan',
        pres:['yenilir','yenilmez'], prg:['yeniyor','yenmiyor'],
        past:['yendi','yenmedi'], ppas:['yenmişti','yenmemişti'],
        fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s2', icon:'🐕',
    subj:{w:'The dog',    type:'sg', obj_form:'the dog'   },
    verb:{v1:'chase',   v2:'chased',   v3:'chased',   ving:'chasing'   },
    obj: {w:'the cat',        type:'sg'},
    tr:'Köpek kediyi kovalar.',
    trData:{
      act:{ subj:'Köpek', obj:'kediyi',
        pres:['kovalar','kovamaz'], prg:['kovalıyor','kovalamıyor'],
        past:['kovaladı','kovalamadı'], ppas:['kovalamıştı','kovalamamıştı'],
        fut:['kovalayacak','kovalamayacak'] },
      pass:{ subj:'Kedi', agent:'köpek tarafından',
        pres:['kovalanır','kovalanmaz'], prg:['kovalanıyor','kovalanmıyor'],
        past:['kovalandı','kovalanmadı'], ppas:['kovalanmıştı','kovalanmamıştı'],
        fut:['kovalanacak','kovalanmayacak'] }
    }
  },
  {
    id:'s3', icon:'✉️',
    subj:{w:'She',        type:'sg', obj_form:'her'       },
    verb:{v1:'write',   v2:'wrote',    v3:'written',  ving:'writing'   },
    obj: {w:'a letter',       type:'sg'},
    tr:'O bir mektup yazar.',
    trData:{
      act:{ subj:'O', obj:'bir mektup',
        pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'],
        past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'],
        fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir mektup', agent:'onun tarafından',
        pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'],
        past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'],
        fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s4', icon:'🌉',
    subj:{w:'They',       type:'pl', obj_form:'them'      },
    verb:{v1:'build',   v2:'built',    v3:'built',    ving:'building'  },
    obj: {w:'a bridge',       type:'sg'},
    tr:'Onlar bir köprü inşa eder.',
    trData:{
      act:{ subj:'Onlar', obj:'bir köprü',
        pres:['inşa ederler','inşa etmezler'], prg:['inşa ediyorlar','inşa etmiyorlar'],
        past:['inşa ettiler','inşa etmediler'], ppas:['inşa etmişlerdi','inşa etmemişlerdi'],
        fut:['inşa edecekler','inşa etmeyecekler'] },
      pass:{ subj:'Bir köprü', agent:'onlar tarafından',
        pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'],
        past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'],
        fut:['inşa edilecek','inşa edilmeyecek'] }
    }
  },
  {
    id:'s5', icon:'💻',
    subj:{w:'The hacker', type:'sg', obj_form:'the hacker'},
    verb:{v1:'steal',   v2:'stole',    v3:'stolen',   ving:'stealing'  },
    obj: {w:'the files',      type:'pl'},
    tr:'Hacker dosyaları çalar.',
    trData:{
      act:{ subj:'Hacker', obj:'dosyaları',
        pres:['çalar','çalmaz'], prg:['çalıyor','çalmıyor'],
        past:['çaldı','çalmadı'], ppas:['çalmıştı','çalmamıştı'],
        fut:['çalacak','çalmayacak'] },
      pass:{ subj:'Dosyalar', agent:'hacker tarafından',
        pres:['çalınır','çalınmaz'], prg:['çalınıyor','çalınmıyor'],
        past:['çalındı','çalınmadı'], ppas:['çalınmıştı','çalınmamıştı'],
        fut:['çalınacak','çalınmayacak'] }
    }
  },
  {
    id:'s6', icon:'👨‍🍳',
    subj:{w:'The chef',   type:'sg', obj_form:'the chef'  },
    verb:{v1:'cook',    v2:'cooked',   v3:'cooked',   ving:'cooking'   },
    obj: {w:'the meal',       type:'sg'},
    tr:'Şef yemeği pişirir.',
    trData:{
      act:{ subj:'Şef', obj:'yemeği',
        pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'],
        past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'],
        fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Yemek', agent:'şef tarafından',
        pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'],
        past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'],
        fut:['pişirilecek','pişirilmeyecek'] }
    }
  },
  {
    id:'s7', icon:'🪐',
    subj:{w:'We',         type:'pl', obj_form:'us'        },
    verb:{v1:'discover',v2:'discovered',v3:'discovered',ving:'discovering'},
    obj: {w:'a new planet',   type:'sg'},
    tr:'Biz yeni bir gezegen keşfederiz.',
    trData:{
      act:{ subj:'Biz', obj:'yeni bir gezegen',
        pres:['keşfederiz','keşfetmeyiz'], prg:['keşfediyoruz','keşfetmiyoruz'],
        past:['keşfettik','keşfetmedik'], ppas:['keşfetmiştik','keşfetmemiştik'],
        fut:['keşfedeceğiz','keşfetmeyeceğiz'] },
      pass:{ subj:'Yeni bir gezegen', agent:'bizim tarafımızdan',
        pres:['keşfedilir','keşfedilmez'], prg:['keşfediliyor','keşfedilmiyor'],
        past:['keşfedildi','keşfedilmedi'], ppas:['keşfedilmişti','keşfedilmemişti'],
        fut:['keşfedilecek','keşfedilmeyecek'] }
    }
  },
  {
    id:'s8', icon:'🤖',
    subj:{w:'The robot',  type:'sg', obj_form:'the robot' },
    verb:{v1:'destroy', v2:'destroyed',v3:'destroyed',ving:'destroying' },
    obj: {w:'the city',       type:'sg'},
    tr:'Robot şehri yok eder.',
    trData:{
      act:{ subj:'Robot', obj:'şehri',
        pres:['yok eder','yok etmez'], prg:['yok ediyor','yok etmiyor'],
        past:['yok etti','yok etmedi'], ppas:['yok etmişti','yok etmemişti'],
        fut:['yok edecek','yok etmeyecek'] },
      pass:{ subj:'Şehir', agent:'robot tarafından',
        pres:['yok edilir','yok edilmez'], prg:['yok ediliyor','yok edilmiyor'],
        past:['yok edildi','yok edilmedi'], ppas:['yok edilmişti','yok edilmemişti'],
        fut:['yok edilecek','yok edilmeyecek'] }
    }
  },
  {
    id:'s9', icon:'🧙',
    subj:{w:'The wizard', type:'sg', obj_form:'the wizard'},
    verb:{v1:'cast',    v2:'cast',     v3:'cast',     ving:'casting'   },
    obj: {w:'a spell',        type:'sg'},
    tr:'Büyücü bir büyü yapar.',
    trData:{
      act:{ subj:'Büyücü', obj:'bir büyü',
        pres:['yapar','yapmaz'], prg:['yapıyor','yapmıyor'],
        past:['yaptı','yapmadı'], ppas:['yapmıştı','yapmamıştı'],
        fut:['yapacak','yapmayacak'] },
      pass:{ subj:'Bir büyü', agent:'büyücü tarafından',
        pres:['yapılır','yapılmaz'], prg:['yapılıyor','yapılmıyor'],
        past:['yapıldı','yapılmadı'], ppas:['yapılmıştı','yapılmamıştı'],
        fut:['yapılacak','yapılmayacak'] }
    }
  },
  {
    id:'s10', icon:'🐉',
    subj:{w:'The dragon', type:'sg', obj_form:'the dragon'},
    verb:{v1:'burn',    v2:'burned',   v3:'burned',   ving:'burning'   },
    obj: {w:'the castle',     type:'sg'},
    tr:'Ejderha kaleyi yakar.',
    trData:{
      act:{ subj:'Ejderha', obj:'kaleyi',
        pres:['yakar','yakmaz'], prg:['yakıyor','yakmıyor'],
        past:['yaktı','yakmadı'], ppas:['yakmıştı','yakmamıştı'],
        fut:['yakacak','yakmayacak'] },
      pass:{ subj:'Kale', agent:'ejderha tarafından',
        pres:['yakılır','yakılmaz'], prg:['yakılıyor','yakılmıyor'],
        past:['yakıldı','yakılmadı'], ppas:['yakılmıştı','yakılmamıştı'],
        fut:['yakılacak','yakılmayacak'] }
    }
  },
  {
    id:'s11', icon:'🔍',
    subj:{w:'You',        type:'you',obj_form:'you'       },
    verb:{v1:'solve',   v2:'solved',   v3:'solved',   ving:'solving'   },
    obj: {w:'the mystery',    type:'sg'},
    tr:'Sen gizemi çözersin.',
    trData:{
      act:{ subj:'Sen', obj:'gizemi',
        pres:['çözersin','çözmezsin'], prg:['çözüyorsun','çözmüyorsun'],
        past:['çözdün','çözmedin'], ppas:['çözmüştün','çözmemiştin'],
        fut:['çözeceksin','çözmeyeceksin'] },
      pass:{ subj:'Gizem', agent:'senin tarafından',
        pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'],
        past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'],
        fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s12', icon:'🚀',
    subj:{w:'The pilot',  type:'sg', obj_form:'the pilot' },
    verb:{v1:'land',    v2:'landed',   v3:'landed',   ving:'landing'   },
    obj: {w:'the spacecraft', type:'sg'},
    tr:'Pilot uzay aracını indirir.',
    trData:{
      act:{ subj:'Pilot', obj:'uzay aracını',
        pres:['indirir','indirmez'], prg:['indiriyor','indirmiyor'],
        past:['indirdi','indirmedi'], ppas:['indirmişti','indirmemişti'],
        fut:['indirecek','indirmeyecek'] },
      pass:{ subj:'Uzay aracı', agent:'pilot tarafından',
        pres:['indirilir','indirilmez'], prg:['indiriliyor','indirilmiyor'],
        past:['indirildi','indirilmedi'], ppas:['indirilmişti','indirilmemişti'],
        fut:['indirilecek','indirilmeyecek'] }
    }
  },
  {
    id:'s13', icon:'🔭',
    subj:{w:'Scientists', type:'pl', obj_form:'scientists'},
    verb:{v1:'study',   v2:'studied',  v3:'studied',  ving:'studying'  },
    obj: {w:'the stars',      type:'pl'},
    tr:'Bilim insanları yıldızları inceler.',
    trData:{
      act:{ subj:'Bilim insanları', obj:'yıldızları',
        pres:['inceler','incelemez'], prg:['inceliyor','incelemiyor'],
        past:['inceledi','incelemedi'], ppas:['incelemişti','incelememişti'],
        fut:['inceleyecek','incelemeyecek'] },
      pass:{ subj:'Yıldızlar', agent:'bilim insanları tarafından',
        pres:['incelenir','incelenmez'], prg:['inceleniyor','incelenmiyor'],
        past:['incelendi','incelenmedi'], ppas:['incelenmişti','incelenmemişti'],
        fut:['incelenecek','incelenmeyecek'] }
    }
  },
  {
    id:'s14', icon:'🎨',
    subj:{w:'The artist', type:'sg', obj_form:'the artist'},
    verb:{v1:'paint',   v2:'painted',  v3:'painted',  ving:'painting'  },
    obj: {w:'a masterpiece',  type:'sg'},
    tr:'Sanatçı bir başyapıt boyar.',
    trData:{
      act:{ subj:'Sanatçı', obj:'bir başyapıt',
        pres:['boyar','boyamaz'], prg:['boyuyor','boyamıyor'],
        past:['boyadı','boyamadı'], ppas:['boyamıştı','boyamamıştı'],
        fut:['boyayacak','boyamayacak'] },
      pass:{ subj:'Bir başyapıt', agent:'sanatçı tarafından',
        pres:['boyanır','boyanmaz'], prg:['boyanıyor','boyanmıyor'],
        past:['boyandı','boyanmadı'], ppas:['boyanmıştı','boyanmamıştı'],
        fut:['boyanacak','boyanmayacak'] }
    }
  },
  {
    id:'s15', icon:'⚔️',
    subj:{w:'The knight', type:'sg', obj_form:'the knight'},
    verb:{v1:'protect', v2:'protected',v3:'protected',ving:'protecting'},
    obj: {w:'the kingdom',    type:'sg'},
    tr:'Şövalye krallığı korur.',
    trData:{
      act:{ subj:'Şövalye', obj:'krallığı',
        pres:['korur','korumaz'], prg:['koruyor','korumuyor'],
        past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'],
        fut:['koruyacak','korumayacak'] },
      pass:{ subj:'Krallık', agent:'şövalye tarafından',
        pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'],
        past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'],
        fut:['korunacak','korunmayacak'] }
    }
  },
];

const TR_LABELS = {
  time:  { pres:'Şimdiki', past:'Geçmiş',      fut:'Gelecek'              },
  flow:  { simp:'Basit',   cont:'Süregelen',    perf:'Tamamlanmış',  perf_cont:'Süreçsel' },
  voice: { act:'Etken',    pass:'Edilgen'                                  },
  pol:   { aff:'Olumlu',   neg:'Olumsuz',       que:'Soru'                 },
};

// ── Grammar Engine ──────────────────────────────────────────────
function generateSentence(sc, time, flow, voice, pol) {
  let subj = voice === 'act' ? sc.subj : sc.obj;
  let origSubj = sc.subj;
  let stype = subj.type;
  let isTsg  = !['I','you','we','they','pl'].includes(stype);
  let isPl   = ['you','we','they','pl'].includes(stype);

  let be_p  = stype==='I' ? 'am' : (isPl ? 'are' : 'is');
  let be_pa = isPl ? 'were' : 'was';
  let hv    = (stype==='I'||isPl) ? 'have' : 'has';

  let {v1,v2,v3,ving} = sc.verb;
  let vs = v1;
  if (isTsg) {
    if (v1.endsWith('y') && !['a','e','i','o','u'].includes(v1[v1.length-2])) vs = v1.slice(0,-1)+'ies';
    else if (v1.match(/(ch|sh|s|x|z|o)$/)) vs = v1+'es';
    else vs = v1+'s';
  }

  let aux=[], mv='';

  if (voice==='act') {
    if      (time==='pres'&&flow==='simp')      { if(pol==='aff') mv=vs; else {aux=[isTsg?'does':'do'];mv=v1;} }
    else if (time==='pres'&&flow==='cont')      { aux=[be_p]; mv=ving; }
    else if (time==='pres'&&flow==='perf')      { aux=[hv]; mv=v3; }
    else if (time==='pres'&&flow==='perf_cont') { aux=[hv,'been']; mv=ving; }
    else if (time==='past'&&flow==='simp')      { if(pol==='aff') mv=v2; else {aux=['did'];mv=v1;} }
    else if (time==='past'&&flow==='cont')      { aux=[be_pa]; mv=ving; }
    else if (time==='past'&&flow==='perf')      { aux=['had']; mv=v3; }
    else if (time==='past'&&flow==='perf_cont') { aux=['had','been']; mv=ving; }
    else if (time==='fut' &&flow==='simp')      { aux=['will']; mv=v1; }
    else if (time==='fut' &&flow==='cont')      { aux=['will','be']; mv=ving; }
    else if (time==='fut' &&flow==='perf')      { aux=['will','have']; mv=v3; }
    else if (time==='fut' &&flow==='perf_cont') { aux=['will','have','been']; mv=ving; }
  } else {
    if      (time==='pres'&&flow==='simp')      { aux=[be_p]; mv=v3; }
    else if (time==='pres'&&flow==='cont')      { aux=[be_p,'being']; mv=v3; }
    else if (time==='pres'&&flow==='perf')      { aux=[hv,'been']; mv=v3; }
    else if (time==='pres'&&flow==='perf_cont') { aux=[hv,'been','being']; mv=v3; }
    else if (time==='past'&&flow==='simp')      { aux=[be_pa]; mv=v3; }
    else if (time==='past'&&flow==='cont')      { aux=[be_pa,'being']; mv=v3; }
    else if (time==='past'&&flow==='perf')      { aux=['had','been']; mv=v3; }
    else if (time==='past'&&flow==='perf_cont') { aux=['had','been','being']; mv=v3; }
    else if (time==='fut' &&flow==='simp')      { aux=['will','be']; mv=v3; }
    else if (time==='fut' &&flow==='cont')      { aux=['will','be','being']; mv=v3; }
    else if (time==='fut' &&flow==='perf')      { aux=['will','have','been']; mv=v3; }
    else if (time==='fut' &&flow==='perf_cont') { aux=['will','have','been','being']; mv=v3; }
  }

  if (pol==='neg') {
    if (aux.length>0) {
      if (aux[0]==='will') aux[0]="won't";
      else if (aux[0]==='am') aux.splice(1,0,'not');
      else aux[0]=aux[0]+"n't";
    }
  }

  let parts=[];
  if (pol==='que'&&aux.length>0) {
    let fa=aux.shift();
    parts.push({w:fa[0].toUpperCase()+fa.slice(1), c:'aux'});
    parts.push({w:subj.w.toLowerCase(), c:'subj'});
  } else {
    parts.push({w:subj.w[0].toUpperCase()+subj.w.slice(1), c:'subj'});
  }
  aux.forEach(a=>parts.push({w:a,c:'aux'}));
  if (mv) parts.push({w:mv,c:'verb'});
  if (voice==='act') {
    parts.push({w:sc.obj.w+(pol==='que'?'?':'.'), c:'obj'});
  } else {
    let ag=origSubj.obj_form||origSubj.w.toLowerCase();
    parts.push({w:`by ${ag}`+(pol==='que'?'?':'.'), c:'obj'});
  }
  return parts;
}

// ── Turkish Translation Engine ───────────────────────────────────
function trQueForm(verb) {
  // Add question particle based on last vowel (vowel harmony)
  const vowelMap = {a:'mı',e:'mi',ı:'mı',i:'mi',o:'mu',ö:'mü',u:'mu',ü:'mü'};
  for (let i = verb.length-1; i >= 0; i--) {
    if (vowelMap[verb[i]]) return verb + ' ' + vowelMap[verb[i]] + '?';
  }
  return verb + ' mi?';
}

function generateTurkishTranslation(sc, time, flow, voice, pol) {
  const d = sc.trData;
  if (!d) return sc.tr || '—';

  const side = d[voice]; // d.act or d.pass

  // Map time+flow to verb category
  let cat;
  if      (time==='pres' && flow==='simp')                         cat = 'pres';
  else if (flow==='cont')                                          cat = 'prg';
  else if (time==='pres' && (flow==='perf'||flow==='perf_cont'))   cat = 'past';
  else if (time==='past' && flow==='simp')                         cat = 'past';
  else if (time==='past' && (flow==='perf'||flow==='perf_cont'))   cat = 'ppas';
  else if (time==='fut')                                           cat = 'fut';
  else                                                             cat = 'pres';

  const pair = side[cat]; // [aff_form, neg_form]
  const affVerb = pair[0];
  const negVerb = pair[1];

  let verb = pol === 'neg' ? negVerb : affVerb;

  let sentence;
  if (pol === 'que') {
    sentence = voice === 'act'
      ? `${side.subj} ${side.obj} ${trQueForm(affVerb)}`
      : `${side.subj} ${side.agent} ${trQueForm(affVerb)}`;
  } else {
    sentence = voice === 'act'
      ? `${side.subj} ${side.obj} ${verb}.`
      : `${side.subj} ${side.agent} ${verb}.`;
  }

  return sentence;
}

function randState() {
  const times=['pres','past','fut'], flows=['simp','cont','perf','perf_cont'],
        voices=['act','pass'], pols=['aff','neg','que'];
  return {
    time:  times [Math.floor(Math.random()*times.length)],
    flow:  flows [Math.floor(Math.random()*flows.length)],
    voice: voices[Math.floor(Math.random()*voices.length)],
    pol:   pols  [Math.floor(Math.random()*pols.length)],
  };
}

function stateLabel(s) {
  return `${TR_LABELS.pol[s.pol]} · ${TR_LABELS.time[s.time]} ${TR_LABELS.flow[s.flow]} · ${TR_LABELS.voice[s.voice]}`;
}

function shuffle(arr) { return [...arr].sort(()=>Math.random()-0.5); }

function randScenario() { return QUANTUM_SCENARIOS[Math.floor(Math.random()*QUANTUM_SCENARIOS.length)]; }

// ── Meaning Card ────────────────────────────────────────────────
function showMeaningCard(shellId, parts, tr, tenseLabel) {
  const shell = document.getElementById(shellId);
  if (!shell) return;
  const old = shell.querySelector('.meaning-card');
  if (old) old.remove();

  const card = document.createElement('div');
  card.className = 'meaning-card';
  card.innerHTML = `
    <div class="mc-en">${parts.map(p=>`<span class="qw-${p.c}">${p.w}</span>`).join(' ')}</div>
    <div class="mc-divider">🇹🇷 Türkçe Anlamı</div>
    <div class="mc-tr">${tr}</div>
    <div class="mc-tense">${tenseLabel}</div>`;
  shell.appendChild(card);
  requestAnimationFrame(() => card.classList.add('mc-show'));
}

// ── Main Hub ────────────────────────────────────────────────────
class QuantumMode {
  constructor(app) { this.app=app; this.root=null; }

  init(root) { this.root=root; window._qmode=this; this.renderHub(); }
  destroy()  { this.root.innerHTML=''; }
  addXP(n)   { if(this.app?.addXP) this.app.addXP(n); }
  confetti(o){ if(typeof confetti==='function') confetti({particleCount:160,spread:90,origin:{y:0.6},colors:['#00d4ff','#7c3aed','#ec4899'],...o}); }

  renderHub() {
    const wins   = localStorage.getItem('q_wins')   ||'0';
    const best   = localStorage.getItem('q_best')   ||'—';
    const bosses = localStorage.getItem('q_bosses') ||'0';

    this.root.innerHTML = `
<div class="qhub-shell">
  <div class="qhub-header">
    <div class="qhub-logo">⚛️</div>
    <h1 class="qhub-title">QUANTUM GAME CENTER</h1>
    <p class="qhub-sub">4 farklı cümle kurma oyunu ile gramer ustası ol</p>
  </div>

  <div class="qhub-stats-bar">
    <div class="qhs-item"><span class="qhs-val">${wins}</span><span class="qhs-lbl">Zafer</span></div>
    <div class="qhs-item"><span class="qhs-val cyan">${best}</span><span class="qhs-lbl">En İyi Skor</span></div>
    <div class="qhs-item"><span class="qhs-val violet">${bosses}</span><span class="qhs-lbl">Boss Yenildi</span></div>
  </div>

  <div class="qhub-grid">

    <div class="qhub-card blitz" onclick="window._qmode.startGame('rush')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">⚡</div>
      <div class="qhc-body">
        <h2>Sentence Rush</h2>
        <p>10 cümlede kelimeleri doğru sıraya diz. Her cümle için 20 saniye. Hızlı ol, bonus kazan!</p>
        <div class="qhc-tags">
          <span class="qhc-tag">20s / Cümle</span>
          <span class="qhc-tag">10 Cümle</span>
          <span class="qhc-tag amber">+20 XP/cümle</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

    <div class="qhub-card scramble" onclick="window._qmode.startGame('scramble')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">🧩</div>
      <div class="qhc-body">
        <h2>Sentence Scramble</h2>
        <p>Karışık kelimeleri doğru gramer sırasına yerleştir. Renkler seni yönlendirir.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">8 Cümle</span>
          <span class="qhc-tag">3 Can</span>
          <span class="qhc-tag amber">150 XP</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

  </div>
</div>`;
  }

  startGame(type) {
    this.root.innerHTML='';
    if (type==='rush')     new SentenceRush(this).start();
    if (type==='scramble') new SentenceScramble(this).start();
  }

  backToHub() { this.renderHub(); }

  recordBest(score) {
    const prev = parseInt(localStorage.getItem('q_best')||'0');
    if (score>prev) localStorage.setItem('q_best',String(score));
  }

  recordWin() {
    const w=parseInt(localStorage.getItem('q_wins')||'0')+1;
    localStorage.setItem('q_wins',w);
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 1 — SENTENCE RUSH (20s per sentence)
// ════════════════════════════════════════════════════════════════
class SentenceRush {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.score=0; this.solved=0;
    this.round=0; this.maxRound=10;
    this.timeLeft=20; this.timer=null;
    this.placed=[]; this.remaining=[];
    this.parts=[]; this.sc=null; this.st=null;
  }

  start() {
    this.root.innerHTML=`
<div class="qgame-shell" id="rush-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" onclick="window._rush._stopTimer(); window._qmode.backToHub();">← Hub</button>
    <div class="rush-time-wrap">
      <span class="rush-time-val" id="rush-time">20</span>
      <span class="rush-time-lbl">s</span>
    </div>
    <div class="qgame-topbar-right">
      <span class="rush-solved" id="rush-solved">✓ 0</span>
      <span class="qtb-score" id="rush-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="rush-fill" style="background:var(--amber); width:100%"></div></div>

  <div class="rush-info-bar">
    <span class="rush-icon" id="rush-icon">🍎</span>
    <div style="flex:1">
      <span class="rush-label" id="rush-label">Cümleyi doğru sıraya diz</span>
      <div style="font-size:0.72rem;color:var(--text-3);margin-top:2px" id="rush-round">1/10</div>
    </div>
  </div>

  <div class="sc-drop-zone" id="rush-drop" style="min-height:60px"></div>

  <div class="sc-word-pool" id="rush-pool"></div>

  <div class="rush-actions">
    <button class="sc-clear-btn" onclick="window._rush.clear()">↺ Sıfırla</button>
    <button class="sc-check-btn" onclick="window._rush.check()">✓ Gönder</button>
  </div>

  <div class="arena-feedback" id="rush-feedback"></div>
</div>`;

    window._rush=this;
    this._newSentence();
  }

  _startTimer() {
    this.timeLeft=20;
    this._stopTimer();
    const fill=document.getElementById('rush-fill');
    const disp=document.getElementById('rush-time');
    if(fill){ fill.style.width='100%'; fill.style.background='var(--amber)'; }
    if(disp){ disp.textContent='20'; disp.style.color='#f59e0b'; }

    this.timer=setInterval(()=>{
      this.timeLeft--;
      if(fill){ fill.style.width=(this.timeLeft/20*100)+'%'; fill.style.background=this.timeLeft<7?'#f43f5e':'var(--amber)'; }
      if(disp){ disp.textContent=this.timeLeft; disp.style.color=this.timeLeft<7?'#f43f5e':'#f59e0b'; }
      if(this.timeLeft<=0){ this._stopTimer(); this._timeOut(); }
    },1000);
  }

  _stopTimer() { if(this.timer){ clearInterval(this.timer); this.timer=null; } }

  _timeOut() {
    this._feedback(`⏱️ Süre doldu!`, 'wrong');
    const tr = generateTurkishTranslation(this.sc, this.st.time, this.st.flow, this.st.voice, this.st.pol);
    showMeaningCard('rush-shell', this.parts, tr, stateLabel(this.st));
    setTimeout(()=>this._newSentence(), 2800);
  }

  _newSentence() {
    if(this.round>=this.maxRound){ this._stopTimer(); this._over(); return; }
    this.round++;
    this.placed=[];
    this.sc=randScenario();
    const st={
      time: ['pres','past','fut'][Math.floor(Math.random()*3)],
      flow: ['simp','cont','perf'][Math.floor(Math.random()*3)],
      voice:'act',
      pol:  Math.random()>0.3?'aff':'neg',
    };
    this.st=st;
    this.parts=generateSentence(this.sc,st.time,st.flow,st.voice,st.pol);
    this.remaining=shuffle(this.parts.map((p,i)=>({w:p.w.replace(/[?.]/g,''),c:p.c,i})));

    const icon=document.getElementById('rush-icon');
    const lbl =document.getElementById('rush-label');
    const rnd =document.getElementById('rush-round');
    if(icon) icon.textContent=this.sc.icon;
    if(lbl)  lbl.textContent=stateLabel(st);
    if(rnd)  rnd.textContent=`${this.round}/${this.maxRound}`;

    this._renderPool();
    this._renderDrop();
    this._startTimer();
  }

  _renderPool() {
    const el=document.getElementById('rush-pool');
    if(!el)return;
    el.innerHTML=this.remaining.map((w,i)=>
      `<button class="sc-word-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-word-chip').forEach(btn=>{
      btn.onclick=()=>{
        const i=parseInt(btn.dataset.i);
        this.placed.push(this.remaining[i]);
        this.remaining.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  _renderDrop() {
    const el=document.getElementById('rush-drop');
    if(!el)return;
    if(!this.placed.length){ el.innerHTML='<div class="sc-dz-placeholder">Kelimelere tıkla →</div>'; return; }
    el.innerHTML=this.placed.map((w,i)=>
      `<button class="sc-placed-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-placed-chip').forEach(btn=>{
      btn.onclick=()=>{
        const i=parseInt(btn.dataset.i);
        this.remaining.push(this.placed[i]);
        this.placed.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  clear() {
    this.remaining=[...this.remaining,...this.placed];
    this.placed=[];
    this._renderPool(); this._renderDrop();
  }

  check() {
    const correctWords=this.parts.map(p=>p.w.replace(/[?.]/g,'').toLowerCase());
    const userWords=this.placed.map(w=>w.w.toLowerCase());

    if(userWords.length!==correctWords.length){
      this._feedback('⚠️ Tüm kelimeleri kullan!','warn'); return;
    }

    const ok=correctWords.every((w,i)=>w===userWords[i]);
    if(ok){
      this._stopTimer();
      this.solved++;
      const bonus=20+this.timeLeft*2;
      this.score+=bonus;
      document.getElementById('rush-solved').textContent=`✓ ${this.solved}`;
      document.getElementById('rush-score').textContent=this.score;
      const sh=document.getElementById('rush-shell');
      if(sh){sh.classList.add('flash-green');setTimeout(()=>sh.classList.remove('flash-green'),400);}
      this._feedback(`✅ +${bonus} puan!`,'correct');
      const tr = generateTurkishTranslation(this.sc, this.st.time, this.st.flow, this.st.voice, this.st.pol);
      showMeaningCard('rush-shell', this.parts, tr, stateLabel(this.st));
      setTimeout(()=>this._newSentence(),2500);
    } else {
      const sh=document.getElementById('rush-shell');
      if(sh){sh.classList.add('shake');setTimeout(()=>sh.classList.remove('shake'),400);}
      this._feedback(`❌ Yanlış sıra! Tekrar dene.`,'wrong');
    }
  }

  _feedback(msg,type){
    const el=document.getElementById('rush-feedback');
    if(!el)return;
    el.textContent=msg; el.className=`arena-feedback fb-${type} fb-show`;
    setTimeout(()=>el.classList.remove('fb-show'),900);
  }

  _over(){
    this.qm.recordBest(this.score);
    if(this.solved>=5){ this.qm.recordWin(); this.qm.addXP(this.solved*20); this.qm.confetti(); }
    this.root.innerHTML=_resultHTML('⚡','Sentence Rush',this.solved>=3,this.score,`${this.solved} cümle çözüldü`,this.solved*20,'rush');
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 3 — SENTENCE SCRAMBLE (color-zone enhanced)
// ════════════════════════════════════════════════════════════════
class SentenceScramble {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.round=0; this.maxRound=8;
    this.lives=3; this.score=0;
    this.placed=[]; this.remaining=[];
    this.parts=[]; this.sc=null; this.st=null;
    this.timer=null; this.timeLeft=30;
  }

  start() {
    this.root.innerHTML=`
<div class="qgame-shell" id="ss-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" onclick="window._qmode.backToHub()">← Hub</button>
    <div class="qgame-topbar-center">
      <span class="qtb-label">Round</span>
      <span class="qtb-val" id="ss-round">1/8</span>
    </div>
    <div class="qgame-topbar-right">
      <span id="ss-lives">❤️❤️❤️</span>
      <span class="qtb-score" id="ss-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="ss-timer" style="background:var(--green)"></div></div>

  <div class="ss-info-card">
    <span class="ss-icon" id="ss-icon">🍎</span>
    <div class="ss-info-mid">
      <div class="atc-label">HEDEF YAPI</div>
      <div class="atc-state" id="ss-state">—</div>
    </div>
    <span class="ss-time" id="ss-time">30s</span>
  </div>

  <div class="ss-legend">
    <span class="ss-lg c-subj">Özne</span>
    <span class="ss-lg c-aux">Yardımcı</span>
    <span class="ss-lg c-verb">Fiil</span>
    <span class="ss-lg c-obj">Nesne</span>
  </div>

  <div class="sc-drop-zone" id="ss-drop"></div>

  <div class="sc-word-pool" id="ss-pool"></div>

  <div class="sc-controls">
    <button class="sc-clear-btn" onclick="window._ss.clear()">↺ Sıfırla</button>
    <button class="sc-check-btn" onclick="window._ss.check()">✓ Gönder</button>
  </div>

  <div class="arena-feedback" id="ss-feedback"></div>
</div>`;

    window._ss=this;
    this._newRound();
  }

  _newRound() {
    if(this.round>=this.maxRound){this._over(true);return;}
    this.round++;
    this.placed=[]; this.sc=randScenario();
    const st={
      time:  ['pres','past','fut'][Math.floor(Math.random()*3)],
      flow:  ['simp','cont','perf','perf_cont'][Math.floor(Math.random()*4)],
      voice: Math.random()>0.4?'act':'pass',
      pol:   Math.random()>0.3?'aff':'neg',
    };
    this.st=st;
    this.parts=generateSentence(this.sc,st.time,st.flow,st.voice,st.pol);
    this.remaining=shuffle(this.parts.map((p,i)=>({w:p.w.replace(/[?.]/g,''),c:p.c,i})));

    document.getElementById('ss-round').textContent=`${this.round}/${this.maxRound}`;
    document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    document.getElementById('ss-score').textContent=this.score;
    document.getElementById('ss-icon').textContent=this.sc.icon;
    document.getElementById('ss-state').textContent=stateLabel(st);

    this._renderPool(); this._renderDrop();
    this._startTimer();
  }

  _renderPool() {
    const el=document.getElementById('ss-pool');
    if(!el)return;
    el.innerHTML=this.remaining.map((w,i)=>
      `<button class="sc-word-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-word-chip').forEach(btn=>{
      btn.onclick=()=>{
        const i=parseInt(btn.dataset.i);
        this.placed.push(this.remaining[i]);
        this.remaining.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  _renderDrop() {
    const el=document.getElementById('ss-drop');
    if(!el)return;
    if(!this.placed.length){el.innerHTML='<div class="sc-dz-placeholder">Kelimelere tıkla, cümleyi kur →</div>';return;}
    el.innerHTML=this.placed.map((w,i)=>
      `<button class="sc-placed-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-placed-chip').forEach(btn=>{
      btn.onclick=()=>{
        const i=parseInt(btn.dataset.i);
        this.remaining.push(this.placed[i]);
        this.placed.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  clear() {
    this.remaining=[...this.remaining,...this.placed];
    this.placed=[];
    this._renderPool(); this._renderDrop();
  }

  check() {
    const correct=this.parts.map(p=>p.w.replace(/[?.]/g,'').toLowerCase());
    const user=this.placed.map(w=>w.w.toLowerCase());
    if(user.length!==correct.length){this._feedback('⚠️ Tüm kelimeleri kullan!','warn');return;}
    this._stopTimer();
    const ok=correct.every((w,i)=>w===user[i]);
    const tr = generateTurkishTranslation(this.sc, this.st.time, this.st.flow, this.st.voice, this.st.pol);
    if(ok){
      const bonus=25+Math.ceil(this.timeLeft*2);
      this.score+=bonus;
      this._feedback(`✅ Harika! +${bonus} puan`,'correct');
      const sh=document.getElementById('ss-shell');
      if(sh){sh.classList.add('flash-green');setTimeout(()=>sh.classList.remove('flash-green'),500);}
      document.getElementById('ss-score').textContent=this.score;
      showMeaningCard('ss-shell', this.parts, tr, stateLabel(this.st));
      setTimeout(()=>this._newRound(),2800);
    } else {
      this.lives--;
      this._feedback(`❌ Yanlış sıra! −1 can`, 'wrong');
      const sh=document.getElementById('ss-shell');
      if(sh){sh.classList.add('shake');setTimeout(()=>sh.classList.remove('shake'),500);}
      document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
      showMeaningCard('ss-shell', this.parts, tr, stateLabel(this.st));
      if(this.lives<=0){setTimeout(()=>this._over(false),2800);return;}
      setTimeout(()=>{this.clear();this._startTimer();},2800);
    }
  }

  _startTimer() {
    this.timeLeft=30; this._stopTimer();
    const fill=document.getElementById('ss-timer');
    const disp=document.getElementById('ss-time');
    this.timer=setInterval(()=>{
      this.timeLeft--;
      if(fill){fill.style.width=(this.timeLeft/30*100)+'%';fill.style.background=this.timeLeft<10?'#f43f5e':'var(--green)';}
      if(disp)disp.textContent=`${this.timeLeft}s`;
      if(this.timeLeft<=0){this._stopTimer();this._timeOut();}
    },1000);
  }

  _stopTimer(){if(this.timer){clearInterval(this.timer);this.timer=null;}}

  _timeOut(){
    this.lives--;
    this._feedback(`⏱️ Süre doldu! −1 can`, 'wrong');
    document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    const tr = generateTurkishTranslation(this.sc, this.st.time, this.st.flow, this.st.voice, this.st.pol);
    showMeaningCard('ss-shell', this.parts, tr, stateLabel(this.st));
    if(this.lives<=0){setTimeout(()=>this._over(false),2800);return;}
    setTimeout(()=>this._newRound(),2800);
  }

  _feedback(msg,type){
    const el=document.getElementById('ss-feedback');
    if(!el)return;
    el.textContent=msg; el.className=`arena-feedback fb-${type} fb-show`;
    setTimeout(()=>el.classList.remove('fb-show'),2000);
  }

  _over(won) {
    this._stopTimer();
    this.qm.recordBest(this.score);
    if(won){this.qm.recordWin();this.qm.addXP(150);this.qm.confetti();}
    this.root.innerHTML=_resultHTML('🧩','Sentence Scramble',won,this.score,`${this.maxRound} cümle`,won?150:0,'scramble');
  }
}

// ── Shared Result Screen ────────────────────────────────────────
function _resultHTML(icon,game,won,score,sub,xp,gameKey){
  return `
<div class="qresult-shell">
  <div class="qresult-icon">${icon}</div>
  <h1 class="qresult-title">${won?'TAMAMLANDI!':'GAME OVER'}</h1>
  <div class="qresult-score">${score}</div>
  <div class="qresult-sub">${game} · ${sub}</div>
  <div class="qresult-xp">+${xp} XP kazandın!</div>
  <div class="qresult-btns">
    <button class="qres-btn primary" onclick="window._qmode.startGame('${gameKey}')">🔄 Tekrar Oyna</button>
    <button class="qres-btn ghost" onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;
}

window.QuantumMode = QuantumMode;
