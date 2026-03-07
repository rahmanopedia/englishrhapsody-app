// ════════════════════════════════════════════════════════════════
//  QUANTUM GAME CENTER v5.0 — Sentence Building Games
// ════════════════════════════════════════════════════════════════

const QUANTUM_SCENARIOS = [
  { id:'s1',  subj:{w:'I',          type:'I',  obj_form:'me'        }, verb:{v1:'eat',     v2:'ate',      v3:'eaten',    ving:'eating'    }, obj:{w:'an apple',       type:'sg'}, icon:'🍎' },
  { id:'s2',  subj:{w:'The dog',    type:'sg', obj_form:'the dog'   }, verb:{v1:'chase',   v2:'chased',   v3:'chased',   ving:'chasing'   }, obj:{w:'the cat',        type:'sg'}, icon:'🐕' },
  { id:'s3',  subj:{w:'She',        type:'sg', obj_form:'her'       }, verb:{v1:'write',   v2:'wrote',    v3:'written',  ving:'writing'   }, obj:{w:'a letter',       type:'sg'}, icon:'✉️' },
  { id:'s4',  subj:{w:'They',       type:'pl', obj_form:'them'      }, verb:{v1:'build',   v2:'built',    v3:'built',    ving:'building'  }, obj:{w:'a bridge',       type:'sg'}, icon:'🌉' },
  { id:'s5',  subj:{w:'The hacker', type:'sg', obj_form:'the hacker'}, verb:{v1:'steal',   v2:'stole',    v3:'stolen',   ving:'stealing'  }, obj:{w:'the files',     type:'pl'}, icon:'💻' },
  { id:'s6',  subj:{w:'The chef',   type:'sg', obj_form:'the chef'  }, verb:{v1:'cook',    v2:'cooked',   v3:'cooked',   ving:'cooking'   }, obj:{w:'the meal',       type:'sg'}, icon:'👨‍🍳' },
  { id:'s7',  subj:{w:'We',         type:'pl', obj_form:'us'        }, verb:{v1:'discover',v2:'discovered',v3:'discovered',ving:'discovering'},obj:{w:'a new planet',  type:'sg'}, icon:'🪐' },
  { id:'s8',  subj:{w:'The robot',  type:'sg', obj_form:'the robot' }, verb:{v1:'destroy', v2:'destroyed',v3:'destroyed',ving:'destroying' },obj:{w:'the city',       type:'sg'}, icon:'🤖' },
  { id:'s9',  subj:{w:'The wizard', type:'sg', obj_form:'the wizard'}, verb:{v1:'cast',    v2:'cast',     v3:'cast',     ving:'casting'   }, obj:{w:'a spell',       type:'sg'}, icon:'🧙' },
  { id:'s10', subj:{w:'The dragon', type:'sg', obj_form:'the dragon'}, verb:{v1:'burn',    v2:'burned',   v3:'burned',   ving:'burning'   }, obj:{w:'the castle',     type:'sg'}, icon:'🐉' },
  { id:'s11', subj:{w:'You',        type:'you',obj_form:'you'       }, verb:{v1:'solve',   v2:'solved',   v3:'solved',   ving:'solving'   }, obj:{w:'the mystery',    type:'sg'}, icon:'🔍' },
  { id:'s12', subj:{w:'The pilot',  type:'sg', obj_form:'the pilot' }, verb:{v1:'land',    v2:'landed',   v3:'landed',   ving:'landing'   }, obj:{w:'the spacecraft', type:'sg'}, icon:'🚀' },
  { id:'s13', subj:{w:'Scientists', type:'pl', obj_form:'scientists'}, verb:{v1:'study',   v2:'studied',  v3:'studied',  ving:'studying'  }, obj:{w:'the stars',      type:'pl'}, icon:'🔭' },
  { id:'s14', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'paint',   v2:'painted',  v3:'painted',  ving:'painting'  }, obj:{w:'a masterpiece',  type:'sg'}, icon:'🎨' },
  { id:'s15', subj:{w:'The knight', type:'sg', obj_form:'the knight'}, verb:{v1:'protect', v2:'protected',v3:'protected',ving:'protecting'}, obj:{w:'the kingdom',    type:'sg'}, icon:'⚔️' },
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

// Distractors for Word Forge
function getDistractors(part, sc) {
  const clean = w => w.replace(/[?.]/g,'');
  const correct = clean(part.w);
  let pool = [];

  if (part.c==='subj') {
    pool = QUANTUM_SCENARIOS.map(s=>s.subj.w).filter(w=>w!==correct);
  } else if (part.c==='aux') {
    pool = ['am','is','are','was','were','have','has','had','will','do','does','did','been','being','be','would','shall','being','not']
      .filter(w=>w!==correct&&!correct.includes(w));
  } else if (part.c==='verb') {
    const {v1,v2,v3,ving}=sc.verb;
    pool=[v1,v2,v3,ving].filter(w=>w!==correct&&w);
    QUANTUM_SCENARIOS.forEach(s=>{
      pool.push(s.verb.v1,s.verb.v2,s.verb.v3,s.verb.ving);
    });
  } else if (part.c==='obj') {
    pool = QUANTUM_SCENARIOS.map(s=>s.obj.w).filter(w=>clean(w)!==clean(correct));
  }

  pool = [...new Set(pool.filter(Boolean))].sort(()=>Math.random()-0.5);
  return pool.slice(0,2).map(clean);
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

    <div class="qhub-card arena" onclick="window._qmode.startGame('forge')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">🔨</div>
      <div class="qhc-body">
        <h2>Word Forge</h2>
        <p>Hedef gramer yapısına göre cümleyi kelime kelime inşa et. Her adımda doğru kelimeyi seç.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">Kelime Seçimi</span>
          <span class="qhc-tag">3 Can</span>
          <span class="qhc-tag amber">100 XP</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

    <div class="qhub-card blitz" onclick="window._qmode.startGame('rush')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">⚡</div>
      <div class="qhc-body">
        <h2>Sentence Rush</h2>
        <p>10 cümlede kelimerleri doğru sıraya diz. Her cümle için 20 saniye. Hızlı ol, bonus kazan!</p>
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
    if (type==='forge')   new WordForge(this).start();
    if (type==='rush')    new SentenceRush(this).start();
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
//  GAME 1 — WORD FORGE (kelime kelime cümle kurma)
// ════════════════════════════════════════════════════════════════
class WordForge {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.round=0; this.maxRound=8;
    this.lives=3; this.score=0;
    this.curIdx=0; // which word we're currently placing
    this.parts=[]; this.placed=[];
    this.sc=null; this.state=null;
    this.timer=null; this.timeLeft=25;
  }

  start() {
    this.root.innerHTML=`
<div class="qgame-shell" id="wf-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" onclick="window._qmode.backToHub()">← Hub</button>
    <div class="qgame-topbar-center">
      <span class="qtb-label">Round</span>
      <span class="qtb-val" id="wf-round">1/8</span>
    </div>
    <div class="qgame-topbar-right">
      <span id="wf-lives">❤️❤️❤️</span>
      <span class="qtb-score" id="wf-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="wf-timer"></div></div>

  <div class="wf-target-card">
    <span class="wf-target-icon" id="wf-icon">🍎</span>
    <div class="wf-target-info">
      <div class="atc-label">HEDEF YAPI</div>
      <div class="atc-state" id="wf-state">—</div>
    </div>
    <div class="wf-timer-num" id="wf-timer-num">25</div>
  </div>

  <div class="wf-sentence-area" id="wf-sentence-area"></div>

  <div class="wf-instruction">Şu anda hangi kelime gerekiyor?</div>

  <div class="wf-choices" id="wf-choices"></div>

  <div class="arena-feedback" id="wf-feedback"></div>
</div>`;
    this._newRound();
  }

  _newRound() {
    if (this.round>=this.maxRound) { this._over(true); return; }
    this.round++;
    this.curIdx=0;
    this.placed=[];
    this.sc=randScenario();

    // Limit to active/aff for cleaner game (avoid double-negatives etc.)
    this.state = {
      time:  ['pres','past','fut'][Math.floor(Math.random()*3)],
      flow:  ['simp','cont','perf','perf_cont'][Math.floor(Math.random()*4)],
      voice: Math.random()>0.4?'act':'pass',
      pol:   Math.random()>0.3?'aff':'neg',
    };

    this.parts = generateSentence(this.sc, this.state.time, this.state.flow, this.state.voice, this.state.pol);

    document.getElementById('wf-round').textContent=`${this.round}/${this.maxRound}`;
    document.getElementById('wf-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    document.getElementById('wf-score').textContent=this.score;
    document.getElementById('wf-icon').textContent=this.sc.icon;
    document.getElementById('wf-state').textContent=stateLabel(this.state);

    this._renderSentence();
    this._renderChoices();
    this._startTimer();
  }

  _renderSentence() {
    const el=document.getElementById('wf-sentence-area');
    if (!el) return;
    el.innerHTML=this.parts.map((p,i)=>{
      if (i<this.curIdx) {
        return `<span class="wf-word filled c-${p.c}">${p.w}</span>`;
      } else if (i===this.curIdx) {
        return `<span class="wf-word current">?</span>`;
      } else {
        return `<span class="wf-word blank">_</span>`;
      }
    }).join(' ');
  }

  _renderChoices() {
    const el=document.getElementById('wf-choices');
    if (!el||this.curIdx>=this.parts.length) return;

    const part=this.parts[this.curIdx];
    const correct=part.w.replace(/[?.]/g,'');
    const distractors=getDistractors(part, this.sc);
    const options=shuffle([correct, ...distractors]);

    el.innerHTML=options.map(opt=>`
      <button class="wf-choice-btn" data-word="${opt}">${opt}</button>
    `).join('');

    el.querySelectorAll('.wf-choice-btn').forEach(btn=>{
      btn.onclick=()=>this._pick(btn.dataset.word, btn);
    });
  }

  _pick(word, btn) {
    const part=this.parts[this.curIdx];
    const correct=part.w.replace(/[?.]/g,'');

    if (word===correct) {
      btn.classList.add('wf-correct');
      this.placed.push(word);
      this.curIdx++;

      if (this.curIdx>=this.parts.length) {
        // Sentence complete!
        this._stopTimer();
        const bonus=30+Math.ceil(this.timeLeft*2);
        this.score+=bonus;
        this._renderSentence();
        this._feedback(`✅ Mükemmel! +${bonus} puan`, 'correct');
        document.getElementById('wf-choices').innerHTML='';
        document.getElementById('wf-score').textContent=this.score;
        setTimeout(()=>this._newRound(), 1400);
      } else {
        this._renderSentence();
        this._renderChoices();
      }
    } else {
      this.lives--;
      btn.classList.add('wf-wrong');
      setTimeout(()=>btn.classList.remove('wf-wrong'),500);
      this._flash('wf-shell','shake');
      this._feedback(`❌ Yanlış! −1 can`, 'wrong');
      document.getElementById('wf-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
      if (this.lives<=0) { this._stopTimer(); setTimeout(()=>this._over(false),1000); }
    }
  }

  _startTimer() {
    this.timeLeft=25; this._stopTimer();
    const fill=document.getElementById('wf-timer');
    const num =document.getElementById('wf-timer-num');
    this.timer=setInterval(()=>{
      this.timeLeft--;
      if(fill) { fill.style.width=(this.timeLeft/25*100)+'%'; fill.style.background=this.timeLeft<8?'#f43f5e':'var(--cyan)'; }
      if(num)  { num.textContent=this.timeLeft; num.style.color=this.timeLeft<8?'#f43f5e':'var(--text-2)'; }
      if(this.timeLeft<=0){ this._stopTimer(); this._timeOut(); }
    },1000);
  }

  _stopTimer() { if(this.timer){clearInterval(this.timer);this.timer=null;} }

  _timeOut() {
    this.lives--;
    this._feedback(`⏱️ Süre doldu! Doğru: "${this.parts.map(p=>p.w).join(' ')}"`, 'wrong');
    document.getElementById('wf-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    if(this.lives<=0){ setTimeout(()=>this._over(false),2000); return; }
    setTimeout(()=>this._newRound(),2200);
  }

  _feedback(msg,type) {
    const el=document.getElementById('wf-feedback');
    if(!el)return;
    el.textContent=msg; el.className=`arena-feedback fb-${type} fb-show`;
    setTimeout(()=>el.classList.remove('fb-show'),1800);
  }

  _flash(id,cls) {
    const el=document.getElementById(id);
    if(!el)return; el.classList.add(cls); setTimeout(()=>el.classList.remove(cls),500);
  }

  _over(won) {
    this._stopTimer();
    this.qm.recordBest(this.score);
    if(won){ this.qm.recordWin(); this.qm.addXP(100); this.qm.confetti(); }
    this.root.innerHTML=_resultHTML('🔨','Word Forge',won,this.score,`${this.round-1}/${this.maxRound} tur`,won?100:0,'forge');
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 2 — SENTENCE RUSH (20s per sentence)
// ════════════════════════════════════════════════════════════════
class SentenceRush {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.score=0; this.solved=0;
    this.round=0; this.maxRound=10;
    this.timeLeft=20; this.timer=null;
    this.placed=[]; this.remaining=[];
    this.parts=[]; this.sc=null;
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
    const correct=this.parts.map(p=>p.w).join(' ');
    this._feedback(`⏱️ Süre doldu! Doğrusu: "${correct}"`, 'wrong');
    setTimeout(()=>this._newSentence(), 2000);
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
      this._feedback(`✅ +${bonus} puan! Sıradaki →`,'correct');
      setTimeout(()=>this._newSentence(),900);
    } else {
      this.attempts++;
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
    this.parts=[]; this.sc=null;
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
    if(ok){
      const bonus=25+Math.ceil(this.timeLeft*2);
      this.score+=bonus;
      this._feedback(`✅ Harika! +${bonus} puan`,'correct');
      const sh=document.getElementById('ss-shell');
      if(sh){sh.classList.add('flash-green');setTimeout(()=>sh.classList.remove('flash-green'),500);}
      document.getElementById('ss-score').textContent=this.score;
      setTimeout(()=>this._newRound(),1300);
    } else {
      this.lives--;
      this._feedback(`❌ Yanlış sıra! Doğrusu: "${this.parts.map(p=>p.w).join(' ')}"`, 'wrong');
      const sh=document.getElementById('ss-shell');
      if(sh){sh.classList.add('shake');setTimeout(()=>sh.classList.remove('shake'),500);}
      document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
      if(this.lives<=0){setTimeout(()=>this._over(false),2000);return;}
      setTimeout(()=>{this.clear();this._startTimer();},2200);
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
    this._feedback(`⏱️ Süre doldu! Doğrusu: "${this.parts.map(p=>p.w).join(' ')}"`, 'wrong');
    document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    if(this.lives<=0){setTimeout(()=>this._over(false),2200);return;}
    setTimeout(()=>this._newRound(),2400);
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
