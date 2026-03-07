// ════════════════════════════════════════════════════════════════
//  QUANTUM GAME CENTER v4.0 — Full Grammar Game Hub
// ════════════════════════════════════════════════════════════════

const QUANTUM_SCENARIOS = [
  { id: 's1',  subj: { w: 'I',          type: 'I',  obj_form: 'me'        }, verb: { v1: 'eat',     v2: 'ate',     v3: 'eaten',   ving: 'eating'    }, obj: { w: 'an apple',      type: 'sg' }, icon: '🍎' },
  { id: 's2',  subj: { w: 'The dog',    type: 'sg', obj_form: 'the dog'   }, verb: { v1: 'chase',   v2: 'chased',  v3: 'chased',  ving: 'chasing'   }, obj: { w: 'the cat',       type: 'sg' }, icon: '🐕' },
  { id: 's3',  subj: { w: 'She',        type: 'sg', obj_form: 'her'       }, verb: { v1: 'write',   v2: 'wrote',   v3: 'written', ving: 'writing'   }, obj: { w: 'a letter',      type: 'sg' }, icon: '✉️' },
  { id: 's4',  subj: { w: 'They',       type: 'pl', obj_form: 'them'      }, verb: { v1: 'build',   v2: 'built',   v3: 'built',   ving: 'building'  }, obj: { w: 'a bridge',      type: 'sg' }, icon: '🌉' },
  { id: 's5',  subj: { w: 'The hacker', type: 'sg', obj_form: 'the hacker'}, verb: { v1: 'steal',   v2: 'stole',   v3: 'stolen',  ving: 'stealing'  }, obj: { w: 'the files',    type: 'pl' }, icon: '💻' },
  { id: 's6',  subj: { w: 'The chef',   type: 'sg', obj_form: 'the chef'  }, verb: { v1: 'cook',    v2: 'cooked',  v3: 'cooked',  ving: 'cooking'   }, obj: { w: 'the meal',      type: 'sg' }, icon: '👨‍🍳' },
  { id: 's7',  subj: { w: 'We',         type: 'pl', obj_form: 'us'        }, verb: { v1: 'discover',v2: 'discovered',v3:'discovered',ving:'discovering'},obj: { w: 'a new planet',  type: 'sg' }, icon: '🪐' },
  { id: 's8',  subj: { w: 'The robot',  type: 'sg', obj_form: 'the robot' }, verb: { v1: 'destroy', v2: 'destroyed',v3:'destroyed',ving:'destroying' }, obj: { w: 'the city',     type: 'sg' }, icon: '🤖' },
  { id: 's9',  subj: { w: 'The wizard', type: 'sg', obj_form: 'the wizard'}, verb: { v1: 'cast',    v2: 'cast',    v3: 'cast',    ving: 'casting'   }, obj: { w: 'a spell',      type: 'sg' }, icon: '🧙' },
  { id: 's10', subj: { w: 'The dragon', type: 'sg', obj_form: 'the dragon'}, verb: { v1: 'burn',    v2: 'burned',  v3: 'burned',  ving: 'burning'   }, obj: { w: 'the castle',   type: 'sg' }, icon: '🐉' },
  { id: 's11', subj: { w: 'You',        type: 'you',obj_form: 'you'       }, verb: { v1: 'solve',   v2: 'solved',  v3: 'solved',  ving: 'solving'   }, obj: { w: 'the mystery',  type: 'sg' }, icon: '🔍' },
  { id: 's12', subj: { w: 'The pilot',  type: 'sg', obj_form: 'the pilot' }, verb: { v1: 'land',    v2: 'landed',  v3: 'landed',  ving: 'landing'   }, obj: { w: 'the spacecraft',type:'sg' }, icon: '🚀' },
  { id: 's13', subj: { w: 'Scientists', type: 'pl', obj_form: 'scientists'}, verb: { v1: 'study',   v2: 'studied', v3: 'studied', ving: 'studying'  }, obj: { w: 'the stars',    type: 'pl' }, icon: '🔭' },
  { id: 's14', subj: { w: 'The virus',  type: 'sg', obj_form: 'the virus' }, verb: { v1: 'infect',  v2: 'infected',v3:'infected', ving:'infecting'  }, obj: { w: 'the network',  type: 'sg' }, icon: '🦠' },
  { id: 's15', subj: { w: 'The artist', type: 'sg', obj_form: 'the artist'}, verb: { v1: 'paint',   v2: 'painted', v3: 'painted', ving: 'painting'  }, obj: { w: 'a masterpiece',type: 'sg' }, icon: '🎨' },
];

const GRAMMAR_LABELS = {
  time:  { pres: 'Present',  past: 'Past',       fut: 'Future'           },
  flow:  { simp: 'Simple',   cont: 'Continuous', perf: 'Perfect',  perf_cont: 'Perfect Cont.' },
  voice: { act:  'Active',   pass: 'Passive'                             },
  pol:   { aff:  'Positive', neg:  'Negative',   que: 'Question'         },
};

const TR_LABELS = {
  time:  { pres: 'Şimdiki',  past: 'Geçmiş',     fut: 'Gelecek'          },
  flow:  { simp: 'Basit',    cont: 'Süregelen',  perf: 'Tamamlanmış', perf_cont: 'Süreçsel' },
  voice: { act:  'Etken',    pass: 'Edilgen'                              },
  pol:   { aff:  'Olumlu',   neg:  'Olumsuz',    que: 'Soru'             },
};

const BOSSES = [
  { name: 'Grammar Goblin',   emoji: '👺', hp: 80,  color: '#10b981', desc: 'Başlangıç Seviyesi' },
  { name: 'Syntax Serpent',   emoji: '🐍', hp: 100, color: '#f59e0b', desc: 'Orta Seviye' },
  { name: 'Tense Titan',      emoji: '🗿', hp: 120, color: '#f43f5e', desc: 'Zor Seviye' },
  { name: 'Grammar Overlord', emoji: '💀', hp: 150, color: '#7c3aed', desc: 'Efsanevi Boss' },
];

// ── GRAMMAR ENGINE ──────────────────────────────────────────────
function generateSentence(scenario, time, flow, voice, pol) {
  let subj = voice === 'act' ? scenario.subj : scenario.obj;
  let originalSubj = scenario.subj;
  let s_type = subj.type;
  let isThirdSg = !['I','you','we','they','pl','you'].includes(s_type);
  let isPluralOrYouWeThey = ['you','we','they','pl'].includes(s_type);

  let be_pres  = s_type === 'I' ? 'am' : (isPluralOrYouWeThey ? 'are' : 'is');
  let be_past  = isPluralOrYouWeThey ? 'were' : 'was';
  let have_pres = (s_type === 'I' || isPluralOrYouWeThey) ? 'have' : 'has';

  let { v1, v2, v3, ving } = scenario.verb;
  let v_s = v1;
  if (isThirdSg) {
    if (v1.endsWith('y') && !['a','e','i','o','u'].includes(v1[v1.length-2])) v_s = v1.slice(0,-1)+'ies';
    else if (v1.match(/(ch|sh|s|x|z|o)$/)) v_s = v1+'es';
    else v_s = v1+'s';
  }

  let aux = [], main_verb = '';

  if (voice === 'act') {
    if (time === 'pres') {
      if      (flow === 'simp')      { if (pol === 'aff') main_verb = v_s; else { aux = [isThirdSg ? 'does' : 'do']; main_verb = v1; } }
      else if (flow === 'cont')      { aux = [be_pres]; main_verb = ving; }
      else if (flow === 'perf')      { aux = [have_pres]; main_verb = v3; }
      else if (flow === 'perf_cont') { aux = [have_pres, 'been']; main_verb = ving; }
    } else if (time === 'past') {
      if      (flow === 'simp')      { if (pol === 'aff') main_verb = v2; else { aux = ['did']; main_verb = v1; } }
      else if (flow === 'cont')      { aux = [be_past]; main_verb = ving; }
      else if (flow === 'perf')      { aux = ['had']; main_verb = v3; }
      else if (flow === 'perf_cont') { aux = ['had', 'been']; main_verb = ving; }
    } else {
      if      (flow === 'simp')      { aux = ['will']; main_verb = v1; }
      else if (flow === 'cont')      { aux = ['will', 'be']; main_verb = ving; }
      else if (flow === 'perf')      { aux = ['will', 'have']; main_verb = v3; }
      else if (flow === 'perf_cont') { aux = ['will', 'have', 'been']; main_verb = ving; }
    }
  } else {
    if (time === 'pres') {
      if      (flow === 'simp')      { aux = [be_pres]; main_verb = v3; }
      else if (flow === 'cont')      { aux = [be_pres, 'being']; main_verb = v3; }
      else if (flow === 'perf')      { aux = [have_pres, 'been']; main_verb = v3; }
      else if (flow === 'perf_cont') { aux = [have_pres, 'been', 'being']; main_verb = v3; }
    } else if (time === 'past') {
      if      (flow === 'simp')      { aux = [be_past]; main_verb = v3; }
      else if (flow === 'cont')      { aux = [be_past, 'being']; main_verb = v3; }
      else if (flow === 'perf')      { aux = ['had', 'been']; main_verb = v3; }
      else if (flow === 'perf_cont') { aux = ['had', 'been', 'being']; main_verb = v3; }
    } else {
      if      (flow === 'simp')      { aux = ['will', 'be']; main_verb = v3; }
      else if (flow === 'cont')      { aux = ['will', 'be', 'being']; main_verb = v3; }
      else if (flow === 'perf')      { aux = ['will', 'have', 'been']; main_verb = v3; }
      else if (flow === 'perf_cont') { aux = ['will', 'have', 'been', 'being']; main_verb = v3; }
    }
  }

  if (pol === 'neg') {
    if (aux.length > 0) {
      if (aux[0] === 'will') aux[0] = "won't";
      else if (aux[0] === 'am') { aux.splice(1, 0, 'not'); }
      else aux[0] = aux[0] + "n't";
    }
  }

  let parts = [];
  if (pol === 'que' && aux.length > 0) {
    let fa = aux.shift();
    parts.push({ w: fa.charAt(0).toUpperCase() + fa.slice(1), c: 'aux' });
    parts.push({ w: subj.w.toLowerCase(), c: 'subj' });
  } else {
    let sw = subj.w;
    parts.push({ w: sw.charAt(0).toUpperCase() + sw.slice(1), c: 'subj' });
  }

  aux.forEach(a => parts.push({ w: a, c: 'aux' }));
  if (main_verb) parts.push({ w: main_verb, c: 'verb' });

  if (voice === 'act') {
    parts.push({ w: scenario.obj.w + (pol === 'que' ? '?' : '.'), c: 'obj' });
  } else {
    let agent = originalSubj.obj_form || originalSubj.w.toLowerCase();
    parts.push({ w: `by ${agent}` + (pol === 'que' ? '?' : '.'), c: 'obj' });
  }

  return parts;
}

function randomState(exclude) {
  const times  = ['pres','past','fut'];
  const flows  = ['simp','cont','perf','perf_cont'];
  const voices = ['act','pass'];
  const pols   = ['aff','neg','que'];
  let s;
  do {
    s = {
      time:  times [Math.floor(Math.random()*times.length)],
      flow:  flows [Math.floor(Math.random()*flows.length)],
      voice: voices[Math.floor(Math.random()*voices.length)],
      pol:   pols  [Math.floor(Math.random()*pols.length)],
    };
  } while (exclude && s.time===exclude.time && s.flow===exclude.flow && s.voice===exclude.voice && s.pol===exclude.pol);
  return s;
}

function stateLabel(s) {
  return `${TR_LABELS.pol[s.pol]} · ${TR_LABELS.time[s.time]} ${TR_LABELS.flow[s.flow]} · ${TR_LABELS.voice[s.voice]}`;
}

// ── MAIN CLASS ──────────────────────────────────────────────────
class QuantumMode {
  constructor(app) {
    this.app = app;
    this.root = null;
  }

  init(root) {
    this.root = root;
    this.renderHub();
  }

  destroy() { this.root.innerHTML = ''; }

  renderHub() {
    this.root.innerHTML = `
<div class="qhub-shell">
  <div class="qhub-header">
    <div class="qhub-logo">⚛️</div>
    <h1 class="qhub-title">QUANTUM GAME CENTER</h1>
    <p class="qhub-sub">Gramer gücünü dört farklı savaş alanında kanıtla</p>
  </div>

  <div class="qhub-stats-bar">
    <div class="qhs-item"><span class="qhs-val" id="qhub-wins">0</span><span class="qhs-lbl">Zafer</span></div>
    <div class="qhs-item"><span class="qhs-val cyan" id="qhub-best">—</span><span class="qhs-lbl">En Yüksek Skor</span></div>
    <div class="qhs-item"><span class="qhs-val violet" id="qhub-bosses">0</span><span class="qhs-lbl">Boss Yenildi</span></div>
  </div>

  <div class="qhub-grid">

    <div class="qhub-card arena" onclick="window._qmode.startGame('arena')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">⚔️</div>
      <div class="qhc-body">
        <h2>Grammar Arena</h2>
        <p>Diyalları kullanarak hedef gramer durumunu bul. 3 can, süre sayacı, 10 tur.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">Diyal Kontrol</span>
          <span class="qhc-tag">3 Can</span>
          <span class="qhc-tag amber">100 XP</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

    <div class="qhub-card blitz" onclick="window._qmode.startGame('blitz')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">⚡</div>
      <div class="qhc-body">
        <h2>Speed Blitz</h2>
        <p>60 saniyede maksimum doğru eşleştirme yap. Hız = güç.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">60 Saniye</span>
          <span class="qhc-tag">Sonsuz Tur</span>
          <span class="qhc-tag amber">+15 XP/doğru</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

    <div class="qhub-card scramble" onclick="window._qmode.startGame('scramble')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">🧩</div>
      <div class="qhc-body">
        <h2>Sentence Scramble</h2>
        <p>Karışık kelimeleri doğru sıraya dizarak cümle kur. Süre ile yarış.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">Kelime Dizimi</span>
          <span class="qhc-tag">8 Cümle</span>
          <span class="qhc-tag amber">150 XP</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

    <div class="qhub-card boss" onclick="window._qmode.startGame('boss')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">👹</div>
      <div class="qhc-body">
        <h2>Boss Battle</h2>
        <p>4 efsanevi Grammar Boss ile epik duel. Her doğru cevap boss'a hasar verir.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">4 Boss</span>
          <span class="qhc-tag rose">Yüksek Zorluk</span>
          <span class="qhc-tag amber">300 XP</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

  </div>
</div>`;

    window._qmode = this;
    this._loadHubStats();
  }

  _loadHubStats() {
    const wins   = parseInt(localStorage.getItem('q_wins')   || '0');
    const best   = localStorage.getItem('q_best') || '—';
    const bosses = parseInt(localStorage.getItem('q_bosses') || '0');
    const w = document.getElementById('qhub-wins');
    const b = document.getElementById('qhub-best');
    const bo = document.getElementById('qhub-bosses');
    if (w) w.textContent  = wins;
    if (b) b.textContent  = best;
    if (bo) bo.textContent = bosses;
  }

  startGame(type) {
    this.root.innerHTML = '';
    if (type === 'arena')   new GrammarArena(this).start();
    if (type === 'blitz')   new SpeedBlitz(this).start();
    if (type === 'scramble') new SentenceScramble(this).start();
    if (type === 'boss')    new BossBattle(this).start();
  }

  backToHub() { this.renderHub(); }

  addXP(n) { if (this.app && this.app.addXP) this.app.addXP(n); }

  confetti(opts) {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 }, colors: ['#00d4ff','#7c3aed','#ec4899'], ...opts });
    }
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 1 — GRAMMAR ARENA
// ════════════════════════════════════════════════════════════════
class GrammarArena {
  constructor(qm) {
    this.qm       = qm;
    this.root     = qm.root;
    this.lives    = 3;
    this.round    = 0;
    this.maxRound = 10;
    this.score    = 0;
    this.combo    = 0;
    this.state    = { time: 'pres', flow: 'simp', voice: 'act', pol: 'aff' };
    this.target   = null;
    this.timer    = null;
    this.timeLeft = 30;
    this.scenarioIdx = Math.floor(Math.random() * QUANTUM_SCENARIOS.length);
  }

  scenario() { return QUANTUM_SCENARIOS[this.scenarioIdx]; }

  start() {
    this.root.innerHTML = `
<div class="qgame-shell" id="arena-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" id="arena-back">← Hub</button>
    <div class="qgame-topbar-center">
      <span class="qtb-label">Round</span>
      <span class="qtb-val" id="arena-round">1/10</span>
    </div>
    <div class="qgame-topbar-right">
      <span id="arena-lives">❤️❤️❤️</span>
      <span class="qtb-score" id="arena-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="arena-timer-fill"></div></div>

  <div class="arena-target-card" id="arena-target">
    <div class="atc-label">HEDEF DURUM</div>
    <div class="atc-state" id="arena-target-state">—</div>
    <div class="atc-sentence" id="arena-target-sentence">—</div>
  </div>

  <div class="arena-scenario-row">
    <span class="arena-icon" id="arena-icon">🍎</span>
    <div class="arena-sentence-display" id="arena-sentence">—</div>
  </div>

  <div class="q-dials arena-dials">
    <div class="q-dial-row">
      <div class="q-dial-group" style="flex:1">
        <label>Polarity</label>
        <div class="q-slider" id="a-dial-pol">
          <button data-type="pol" data-val="aff" class="active">+</button>
          <button data-type="pol" data-val="neg">−</button>
          <button data-type="pol" data-val="que">?</button>
        </div>
      </div>
      <div class="q-dial-group" style="flex:2">
        <label>Voice</label>
        <div class="q-slider" id="a-dial-voice">
          <button data-type="voice" data-val="act" class="active">Active</button>
          <button data-type="voice" data-val="pass">Passive</button>
        </div>
      </div>
    </div>
    <div class="q-dial-group">
      <label>Time</label>
      <div class="q-slider" id="a-dial-time">
        <button data-type="time" data-val="past">Past</button>
        <button data-type="time" data-val="pres" class="active">Present</button>
        <button data-type="time" data-val="fut">Future</button>
      </div>
    </div>
    <div class="q-dial-group">
      <label>Flow</label>
      <div class="q-slider" id="a-dial-flow">
        <button data-type="flow" data-val="simp" class="active">Simple</button>
        <button data-type="flow" data-val="cont">Continuous</button>
        <button data-type="flow" data-val="perf">Perfect</button>
        <button data-type="flow" data-val="perf_cont">Perf. Cont.</button>
      </div>
    </div>
  </div>

  <div class="arena-check-row">
    <div class="arena-combo" id="arena-combo" style="display:none">🔥 ×<span id="arena-combo-val">1</span></div>
    <button class="arena-check-btn" id="arena-check">✓ KONTROL ET</button>
  </div>

  <div class="arena-feedback" id="arena-feedback"></div>
</div>`;

    document.getElementById('arena-back').onclick = () => { this._stopTimer(); this.qm.backToHub(); };
    document.getElementById('arena-check').onclick = () => this._check();

    this.root.querySelectorAll('.q-slider button').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        this.state[type] = btn.dataset.val;
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._updateSentenceDisplay();
      };
    });

    this._newRound();
  }

  _newRound() {
    if (this.round >= this.maxRound) { this._gameOver(true); return; }
    this.round++;
    this.target = randomState();
    this.scenarioIdx = Math.floor(Math.random() * QUANTUM_SCENARIOS.length);
    this.state = { time: 'pres', flow: 'simp', voice: 'act', pol: 'aff' };
    this._resetDials();
    this._updateDisplay();
    this._startTimer();
  }

  _resetDials() {
    this.root.querySelectorAll('.q-slider button').forEach(btn => {
      btn.classList.remove('active');
      const defaults = { time: 'pres', flow: 'simp', voice: 'act', pol: 'aff' };
      if (btn.dataset.val === defaults[btn.dataset.type]) btn.classList.add('active');
    });
  }

  _updateDisplay() {
    const el_round  = document.getElementById('arena-round');
    const el_lives  = document.getElementById('arena-lives');
    const el_score  = document.getElementById('arena-score');
    const el_ts     = document.getElementById('arena-target-state');
    const el_tsen   = document.getElementById('arena-target-sentence');
    const el_combo  = document.getElementById('arena-combo');
    const el_cval   = document.getElementById('arena-combo-val');

    if (el_round) el_round.textContent = `${this.round}/${this.maxRound}`;
    if (el_lives) el_lives.textContent = '❤️'.repeat(this.lives) + '🖤'.repeat(3 - this.lives);
    if (el_score) el_score.textContent = this.score;
    if (el_ts)    el_ts.textContent    = stateLabel(this.target);

    const sc  = this.scenario();
    const pts = generateSentence(sc, this.target.time, this.target.flow, this.target.voice, this.target.pol);
    if (el_tsen) el_tsen.textContent = pts.map(p => p.w).join(' ');

    if (el_combo) el_combo.style.display = this.combo >= 2 ? 'flex' : 'none';
    if (el_cval)  el_cval.textContent    = this.combo;

    this._updateSentenceDisplay();
  }

  _updateSentenceDisplay() {
    const sc   = this.scenario();
    const icon = document.getElementById('arena-icon');
    const sent = document.getElementById('arena-sentence');
    if (icon) icon.textContent = sc.icon;
    if (sent) {
      const pts = generateSentence(sc, this.state.time, this.state.flow, this.state.voice, this.state.pol);
      sent.innerHTML = pts.map(p => `<span class="qw-${p.c}">${p.w}</span>`).join(' ');
    }
  }

  _startTimer() {
    this.timeLeft = 30;
    this._stopTimer();
    const fill = document.getElementById('arena-timer-fill');
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (fill) fill.style.width = (this.timeLeft / 30 * 100) + '%';
      if (fill) fill.style.background = this.timeLeft < 10 ? '#f43f5e' : 'var(--cyan)';
      if (this.timeLeft <= 0) { this._stopTimer(); this._timeOut(); }
    }, 1000);
  }

  _stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  _timeOut() {
    this.lives--;
    this.combo = 0;
    this._flash('arena-shell', 'shake');
    this._showFeedback('⏱️ Süre doldu! −1 can', 'wrong');
    this._updateDisplay();
    if (this.lives <= 0) { setTimeout(() => this._gameOver(false), 1500); return; }
    setTimeout(() => this._newRound(), 1800);
  }

  _check() {
    const s = this.state, t = this.target;
    const correct = s.time===t.time && s.flow===t.flow && s.voice===t.voice && s.pol===t.pol;
    this._stopTimer();

    if (correct) {
      this.combo++;
      const mult  = this.combo >= 5 ? 3 : this.combo >= 3 ? 2 : 1;
      const bonus = 10 * mult + Math.ceil(this.timeLeft * 1.5);
      this.score += bonus;
      this._showFeedback(`✅ Doğru! +${bonus} puan ${mult > 1 ? `(×${mult} kombo!)` : ''}`, 'correct');
      this._flash('arena-shell', 'flash-green');
      if (this.combo >= 3) this.qm.confetti({ particleCount: 60, spread: 50 });
      setTimeout(() => this._newRound(), 1200);
    } else {
      this.lives--;
      this.combo = 0;
      this._showFeedback('❌ Yanlış! −1 can', 'wrong');
      this._flash('arena-shell', 'shake');
      this._updateDisplay();
      if (this.lives <= 0) { setTimeout(() => this._gameOver(false), 1500); return; }
      setTimeout(() => this._newRound(), 1600);
    }
  }

  _showFeedback(msg, type) {
    const el = document.getElementById('arena-feedback');
    if (!el) return;
    el.textContent = msg;
    el.className = `arena-feedback fb-${type} fb-show`;
    setTimeout(() => el.classList.remove('fb-show'), 1400);
  }

  _flash(id, cls) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 500);
  }

  _gameOver(won) {
    this._stopTimer();
    const prev = parseInt(localStorage.getItem('q_best_arena') || '0');
    if (this.score > prev) localStorage.setItem('q_best_arena', this.score);
    if (won) {
      const wins = parseInt(localStorage.getItem('q_wins') || '0') + 1;
      localStorage.setItem('q_wins', wins);
      this.qm.addXP(100);
      this.qm.confetti();
    }
    const bestStr = localStorage.getItem('q_best') || '0';
    const scoreStr = String(this.score);
    if (parseInt(scoreStr) > parseInt(bestStr)) localStorage.setItem('q_best', scoreStr);

    this.root.innerHTML = `
<div class="qresult-shell">
  <div class="qresult-icon">${won ? '🏆' : '💀'}</div>
  <h1 class="qresult-title">${won ? 'ZAFER!' : 'GAME OVER'}</h1>
  <div class="qresult-score">${this.score}</div>
  <div class="qresult-sub">Puan · ${this.round-1}/${this.maxRound} tur tamamlandı</div>
  ${won ? '<div class="qresult-xp">+100 XP kazandın!</div>' : ''}
  <div class="qresult-btns">
    <button class="qres-btn primary" onclick="window._qmode.startGame('arena')">🔄 Tekrar Oyna</button>
    <button class="qres-btn ghost"   onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 2 — SPEED BLITZ
// ════════════════════════════════════════════════════════════════
class SpeedBlitz {
  constructor(qm) {
    this.qm      = qm;
    this.root    = qm.root;
    this.score   = 0;
    this.correct = 0;
    this.total   = 0;
    this.timer   = null;
    this.qTimer  = null;
    this.timeLeft = 60;
    this.qTimeLeft = 8;
    this.target  = null;
    this.options = [];
    this.answered = false;
  }

  start() {
    this.root.innerHTML = `
<div class="qgame-shell" id="blitz-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" id="blitz-back">← Hub</button>
    <div class="blitz-time-display">
      <span class="btd-val" id="blitz-time">60</span>
      <span class="btd-lbl">saniye</span>
    </div>
    <div class="qgame-topbar-right">
      <span class="qtb-label">Skor</span>
      <span class="qtb-score" id="blitz-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="blitz-timer-fill" style="background:var(--amber)"></div></div>

  <div class="blitz-target-card" id="blitz-target">
    <div class="atc-label">Bu cümlenin gramer durumu hangisi?</div>
    <div class="blitz-sentence" id="blitz-sentence">—</div>
  </div>

  <div class="blitz-q-timer-bar"><div class="blitz-q-fill" id="blitz-q-fill"></div></div>

  <div class="blitz-options" id="blitz-options"></div>

  <div class="blitz-stats-row">
    <span class="bsr-item green" id="blitz-correct">✓ 0</span>
    <span class="bsr-item rose"  id="blitz-wrong">✗ 0</span>
    <span class="bsr-item cyan"  id="blitz-total">0 soru</span>
  </div>
</div>`;

    document.getElementById('blitz-back').onclick = () => { this._stopTimers(); this.qm.backToHub(); };
    this._newQuestion();
    this._startMainTimer();
  }

  _startMainTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      const fill = document.getElementById('blitz-timer-fill');
      const disp = document.getElementById('blitz-time');
      if (fill) fill.style.width = (this.timeLeft / 60 * 100) + '%';
      if (disp) {
        disp.textContent = this.timeLeft;
        disp.style.color = this.timeLeft < 15 ? '#f43f5e' : '#f59e0b';
      }
      if (this.timeLeft <= 0) { this._stopTimers(); this._gameOver(); }
    }, 1000);
  }

  _startQTimer() {
    this.qTimeLeft = 8;
    if (this.qTimer) clearInterval(this.qTimer);
    const fill = document.getElementById('blitz-q-fill');
    this.qTimer = setInterval(() => {
      this.qTimeLeft--;
      if (fill) fill.style.width = (this.qTimeLeft / 8 * 100) + '%';
      if (fill) fill.style.background = this.qTimeLeft < 3 ? '#f43f5e' : '#7c3aed';
      if (this.qTimeLeft <= 0) {
        clearInterval(this.qTimer);
        if (!this.answered) this._answer(null);
      }
    }, 1000);
  }

  _stopTimers() {
    if (this.timer)  clearInterval(this.timer);
    if (this.qTimer) clearInterval(this.qTimer);
  }

  _newQuestion() {
    this.answered = false;
    this.total++;
    const scenarioIdx = Math.floor(Math.random() * QUANTUM_SCENARIOS.length);
    const sc   = QUANTUM_SCENARIOS[scenarioIdx];
    this.target = randomState();

    const pts  = generateSentence(sc, this.target.time, this.target.flow, this.target.voice, this.target.pol);
    const sent = document.getElementById('blitz-sentence');
    if (sent) sent.innerHTML = pts.map(p => `<span class="qw-${p.c}">${p.w}</span>`).join(' ');

    // Generate 3 wrong options
    const wrong = [];
    while (wrong.length < 3) {
      const w = randomState(this.target);
      const dup = wrong.some(x => x.time===w.time && x.flow===w.flow && x.voice===w.voice && x.pol===w.pol);
      if (!dup) wrong.push(w);
    }

    this.options = this._shuffle([this.target, ...wrong]);

    const opt_el = document.getElementById('blitz-options');
    if (opt_el) {
      opt_el.innerHTML = this.options.map((o, i) => `
        <button class="blitz-opt" data-idx="${i}">${stateLabel(o)}</button>
      `).join('');
      opt_el.querySelectorAll('.blitz-opt').forEach(btn => {
        btn.onclick = () => {
          if (this.answered) return;
          this._answer(parseInt(btn.dataset.idx));
        };
      });
    }

    this._updateStats();
    this._startQTimer();
  }

  _answer(idx) {
    this.answered = true;
    if (this.qTimer) clearInterval(this.qTimer);

    const opt_el = document.getElementById('blitz-options');
    if (!opt_el) return;

    const correctIdx = this.options.indexOf(this.target);
    opt_el.querySelectorAll('.blitz-opt').forEach((btn, i) => {
      if (i === correctIdx)  btn.classList.add('opt-correct');
      else if (i === idx)    btn.classList.add('opt-wrong');
      btn.disabled = true;
    });

    if (idx === correctIdx) {
      this.correct++;
      this.score += 15 + this.qTimeLeft * 2;
      const sc = document.getElementById('blitz-score');
      if (sc) sc.textContent = this.score;
    } else {
      this.score = Math.max(0, this.score - 5);
      const sc = document.getElementById('blitz-score');
      if (sc) sc.textContent = this.score;
    }

    this._updateStats();
    setTimeout(() => this._newQuestion(), 900);
  }

  _updateStats() {
    const c = document.getElementById('blitz-correct');
    const w = document.getElementById('blitz-wrong');
    const t = document.getElementById('blitz-total');
    const wrong = this.total - this.correct - 1;
    if (c) c.textContent = `✓ ${this.correct}`;
    if (w) w.textContent = `✗ ${Math.max(0, wrong)}`;
    if (t) t.textContent = `${this.total} soru`;
  }

  _shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  _gameOver() {
    const prev = parseInt(localStorage.getItem('q_best_blitz') || '0');
    if (this.score > prev) localStorage.setItem('q_best_blitz', this.score);
    const bestStr = localStorage.getItem('q_best') || '0';
    if (this.score > parseInt(bestStr)) localStorage.setItem('q_best', String(this.score));

    this.qm.addXP(Math.floor(this.score / 5));
    const acc = this.total > 1 ? Math.round(this.correct / (this.total - 1) * 100) : 0;

    this.root.innerHTML = `
<div class="qresult-shell">
  <div class="qresult-icon">⚡</div>
  <h1 class="qresult-title">BLITZ BİTTİ!</h1>
  <div class="qresult-score">${this.score}</div>
  <div class="qresult-sub">Puan · ${this.correct} doğru · %${acc} başarı</div>
  <div class="qresult-xp">+${Math.floor(this.score/5)} XP kazandın!</div>
  <div class="qresult-btns">
    <button class="qres-btn primary" onclick="window._qmode.startGame('blitz')">🔄 Tekrar Oyna</button>
    <button class="qres-btn ghost"   onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 3 — SENTENCE SCRAMBLE
// ════════════════════════════════════════════════════════════════
class SentenceScramble {
  constructor(qm) {
    this.qm       = qm;
    this.root     = qm.root;
    this.round    = 0;
    this.maxRound = 8;
    this.score    = 0;
    this.timer    = null;
    this.timeLeft = 20;
    this.correct  = [];
    this.remaining = [];
    this.scenario = null;
    this.target   = null;
    this.targetParts = [];
  }

  start() {
    this.root.innerHTML = `
<div class="qgame-shell" id="scramble-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" id="sc-back">← Hub</button>
    <div class="qgame-topbar-center">
      <span class="qtb-label">Round</span>
      <span class="qtb-val" id="sc-round">1/8</span>
    </div>
    <div class="qgame-topbar-right">
      <span class="qtb-score" id="sc-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="sc-timer-fill" style="background:var(--green)"></div></div>

  <div class="sc-info-card">
    <div class="sc-scenario-icon" id="sc-icon">🍎</div>
    <div class="sc-target-label" id="sc-tense-label">Past Simple · Active · Positive</div>
    <div class="sc-timer-disp" id="sc-timer">20s</div>
  </div>

  <div class="sc-drop-zone" id="sc-drop-zone">
    <div class="sc-dz-placeholder">Buraya kelime ekle →</div>
  </div>

  <div class="sc-word-pool" id="sc-word-pool"></div>

  <div class="sc-controls">
    <button class="sc-clear-btn" id="sc-clear">↺ Sıfırla</button>
    <button class="sc-check-btn" id="sc-check">✓ Gönder</button>
  </div>

  <div class="arena-feedback" id="sc-feedback"></div>
</div>`;

    document.getElementById('sc-back').onclick  = () => { this._stopTimer(); this.qm.backToHub(); };
    document.getElementById('sc-check').onclick = () => this._check();
    document.getElementById('sc-clear').onclick = () => this._clear();

    this._newRound();
  }

  _newRound() {
    if (this.round >= this.maxRound) { this._gameOver(true); return; }
    this.round++;
    this.correct   = [];
    this.scenario  = QUANTUM_SCENARIOS[Math.floor(Math.random() * QUANTUM_SCENARIOS.length)];
    this.target    = randomState();

    // Restrict to active/affirmative for readability
    this.target.voice = 'act';
    this.target.pol   = Math.random() > 0.5 ? 'aff' : 'neg';

    this.targetParts = generateSentence(this.scenario, this.target.time, this.target.flow, this.target.voice, this.target.pol);

    const icon = document.getElementById('sc-icon');
    const lbl  = document.getElementById('sc-tense-label');
    const rnd  = document.getElementById('sc-round');
    const sc   = document.getElementById('sc-score');
    if (icon) icon.textContent = this.scenario.icon;
    if (lbl)  lbl.textContent  = stateLabel(this.target);
    if (rnd)  rnd.textContent  = `${this.round}/${this.maxRound}`;
    if (sc)   sc.textContent   = this.score;

    // Shuffle words
    const words = this.targetParts.map((p, i) => ({ w: p.w.replace(/[?.]/g,''), c: p.c, idx: i }));
    this.remaining = this._shuffle([...words]);
    this._renderPool();
    this._renderDropZone();
    this._startTimer();
  }

  _shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  _renderPool() {
    const pool = document.getElementById('sc-word-pool');
    if (!pool) return;
    pool.innerHTML = this.remaining.map((w, i) =>
      `<button class="sc-word-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    pool.querySelectorAll('.sc-word-chip').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.i);
        const word = this.remaining[i];
        this.remaining.splice(i, 1);
        this.correct.push(word);
        this._renderPool();
        this._renderDropZone();
      };
    });
  }

  _renderDropZone() {
    const dz = document.getElementById('sc-drop-zone');
    if (!dz) return;
    if (this.correct.length === 0) {
      dz.innerHTML = '<div class="sc-dz-placeholder">Buraya kelime ekle →</div>';
      return;
    }
    dz.innerHTML = this.correct.map((w, i) =>
      `<button class="sc-placed-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    dz.querySelectorAll('.sc-placed-chip').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.i);
        const word = this.correct[i];
        this.correct.splice(i, 1);
        this.remaining.push(word);
        this._renderPool();
        this._renderDropZone();
      };
    });
  }

  _clear() {
    this.remaining = [...this.remaining, ...this.correct];
    this.correct = [];
    this._renderPool();
    this._renderDropZone();
  }

  _check() {
    const correctWords = this.targetParts.map(p => p.w.replace(/[?.]/g,'').toLowerCase());
    const userWords    = this.correct.map(w => w.w.toLowerCase());

    if (userWords.length !== correctWords.length) {
      this._feedback('⚠️ Tüm kelimeleri kullan!', 'warn');
      return;
    }

    const ok = correctWords.every((w, i) => w === userWords[i]);
    this._stopTimer();

    if (ok) {
      const bonus = 20 + Math.ceil(this.timeLeft * 2);
      this.score += bonus;
      this._feedback(`✅ Mükemmel! +${bonus} puan`, 'correct');
      this._flashGreen();
      setTimeout(() => this._newRound(), 1400);
    } else {
      this.score = Math.max(0, this.score - 5);
      const answer = this.targetParts.map(p => p.w).join(' ');
      this._feedback(`❌ Yanlış! Doğrusu: "${answer}"`, 'wrong');
      setTimeout(() => { this._clear(); this._startTimer(); }, 2200);
    }
  }

  _feedback(msg, type) {
    const el = document.getElementById('sc-feedback');
    if (!el) return;
    el.textContent = msg;
    el.className = `arena-feedback fb-${type} fb-show`;
    setTimeout(() => el.classList.remove('fb-show'), 2000);
  }

  _flashGreen() {
    const sh = document.getElementById('scramble-shell');
    if (sh) { sh.classList.add('flash-green'); setTimeout(() => sh.classList.remove('flash-green'), 500); }
  }

  _startTimer() {
    this.timeLeft = 20;
    this._stopTimer();
    const fill = document.getElementById('sc-timer-fill');
    const disp = document.getElementById('sc-timer');
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (fill) { fill.style.width = (this.timeLeft / 20 * 100) + '%'; fill.style.background = this.timeLeft < 7 ? '#f43f5e' : 'var(--green)'; }
      if (disp) disp.textContent = `${this.timeLeft}s`;
      if (this.timeLeft <= 0) { this._stopTimer(); this._timeOut(); }
    }, 1000);
  }

  _stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  _timeOut() {
    const answer = this.targetParts.map(p => p.w).join(' ');
    this._feedback(`⏱️ Süre doldu! Doğrusu: "${answer}"`, 'wrong');
    setTimeout(() => this._newRound(), 2400);
  }

  _gameOver(won) {
    const bestStr = localStorage.getItem('q_best') || '0';
    if (this.score > parseInt(bestStr)) localStorage.setItem('q_best', String(this.score));
    if (won) { this.qm.addXP(150); this.qm.confetti(); const w = parseInt(localStorage.getItem('q_wins')||'0')+1; localStorage.setItem('q_wins',w); }

    this.root.innerHTML = `
<div class="qresult-shell">
  <div class="qresult-icon">🧩</div>
  <h1 class="qresult-title">${won ? 'TAMAMLANDI!' : 'OYUN BİTTİ'}</h1>
  <div class="qresult-score">${this.score}</div>
  <div class="qresult-sub">Puan · ${this.maxRound} cümle tamamlandı</div>
  ${won ? '<div class="qresult-xp">+150 XP kazandın!</div>' : ''}
  <div class="qresult-btns">
    <button class="qres-btn primary" onclick="window._qmode.startGame('scramble')">🔄 Tekrar Oyna</button>
    <button class="qres-btn ghost"   onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 4 — BOSS BATTLE
// ════════════════════════════════════════════════════════════════
class BossBattle {
  constructor(qm) {
    this.qm        = qm;
    this.root      = qm.root;
    this.bossIdx   = 0;
    this.boss      = null;
    this.bossHp    = 0;
    this.playerHp  = 100;
    this.score     = 0;
    this.streak    = 0;
    this.options   = [];
    this.target    = null;
    this.answered  = false;
    this.scenario  = null;
    this.qTimer    = null;
    this.qTimeLeft = 10;
  }

  get currentBoss() { return BOSSES[this.bossIdx]; }

  start() {
    this._loadBoss();
  }

  _loadBoss() {
    this.boss    = this.currentBoss;
    this.bossHp  = this.boss.hp;
    this.playerHp = 100;
    this.streak  = 0;

    this.root.innerHTML = `
<div class="qgame-shell" id="boss-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" id="boss-back">← Hub</button>
    <div class="boss-name-display">
      <span class="boss-stage-badge">${this.bossIdx + 1}/4</span>
      <span class="boss-name-text" id="boss-name">${this.boss.name}</span>
    </div>
    <div class="qgame-topbar-right">
      <span class="qtb-score" id="boss-score">0</span>
    </div>
  </div>

  <div class="boss-arena">
    <div class="boss-hp-section">
      <div class="bhp-label">👹 ${this.boss.name}</div>
      <div class="bhp-track"><div class="bhp-fill" id="boss-hp-fill" style="background:${this.boss.color}"></div></div>
      <div class="bhp-val" id="boss-hp-val">${this.bossHp}/${this.boss.hp}</div>
    </div>

    <div class="boss-sprite-wrap">
      <div class="boss-sprite" id="boss-sprite">${this.boss.emoji}</div>
      <div class="boss-hit-text" id="boss-hit" style="display:none"></div>
    </div>

    <div class="player-hp-section">
      <div class="php-label">🧠 Senin Canın</div>
      <div class="php-track"><div class="php-fill" id="player-hp-fill"></div></div>
      <div class="php-val" id="player-hp-val">100/100</div>
    </div>
  </div>

  <div class="boss-q-timer-bar"><div class="boss-q-fill" id="boss-q-fill"></div></div>

  <div class="boss-question-card">
    <div class="bqc-label">Bu cümle hangi gramer yapısını kullanıyor?</div>
    <div class="boss-sentence" id="boss-sentence">—</div>
  </div>

  <div class="boss-options" id="boss-options"></div>

  <div class="boss-streak" id="boss-streak" style="display:none">
    🔥 <span id="boss-streak-val">1</span> kombo!
  </div>

  <div class="arena-feedback" id="boss-feedback"></div>
</div>`;

    document.getElementById('boss-back').onclick = () => { this._stopQTimer(); this.qm.backToHub(); };
    this._newQuestion();
  }

  _newQuestion() {
    this.answered = false;
    this.scenario = QUANTUM_SCENARIOS[Math.floor(Math.random() * QUANTUM_SCENARIOS.length)];
    this.target   = randomState();

    const pts  = generateSentence(this.scenario, this.target.time, this.target.flow, this.target.voice, this.target.pol);
    const sent = document.getElementById('boss-sentence');
    if (sent) sent.innerHTML = pts.map(p => `<span class="qw-${p.c}">${p.w}</span>`).join(' ');

    const wrong = [];
    while (wrong.length < 3) {
      const w = randomState(this.target);
      if (!wrong.some(x => x.time===w.time && x.flow===w.flow && x.voice===w.voice && x.pol===w.pol)) wrong.push(w);
    }
    this.options = this._shuffle([this.target, ...wrong]);

    const opt_el = document.getElementById('boss-options');
    if (opt_el) {
      opt_el.innerHTML = this.options.map((o, i) =>
        `<button class="boss-opt" data-idx="${i}">${stateLabel(o)}</button>`
      ).join('');
      opt_el.querySelectorAll('.boss-opt').forEach(btn => {
        btn.onclick = () => { if (!this.answered) this._answer(parseInt(btn.dataset.idx)); };
      });
    }

    this._startQTimer();
    this._updateBars();
  }

  _startQTimer() {
    this.qTimeLeft = 10;
    this._stopQTimer();
    const fill = document.getElementById('boss-q-fill');
    this.qTimer = setInterval(() => {
      this.qTimeLeft--;
      if (fill) { fill.style.width = (this.qTimeLeft / 10 * 100) + '%'; fill.style.background = this.qTimeLeft < 4 ? '#f43f5e' : this.boss.color; }
      if (this.qTimeLeft <= 0) { clearInterval(this.qTimer); if (!this.answered) this._answer(null); }
    }, 1000);
  }

  _stopQTimer() { if (this.qTimer) { clearInterval(this.qTimer); this.qTimer = null; } }

  _answer(idx) {
    this.answered = true;
    this._stopQTimer();

    const correctIdx = this.options.indexOf(this.target);
    const opt_el = document.getElementById('boss-options');
    if (opt_el) {
      opt_el.querySelectorAll('.boss-opt').forEach((btn, i) => {
        if (i === correctIdx) btn.classList.add('opt-correct');
        else if (i === idx)   btn.classList.add('opt-wrong');
        btn.disabled = true;
      });
    }

    if (idx === correctIdx) {
      this.streak++;
      const dmg = 20 + (this.streak >= 3 ? 10 : 0);
      this.bossHp  = Math.max(0, this.bossHp - dmg);
      this.score  += 30 + this.qTimeLeft * 3;
      this._showHit(`-${dmg}`, 'hit');
      this._showFeedback(`⚔️ ${dmg} hasar verdin!${this.streak >= 3 ? ' KOMBO!' : ''}`, 'correct');
      this._updateBars();
      this._updateStreak();
      if (this.bossHp <= 0) { setTimeout(() => this._bossDefeated(), 1200); return; }
    } else {
      this.streak = 0;
      const atk = 25;
      this.playerHp = Math.max(0, this.playerHp - atk);
      this._showFeedback(`👹 Boss sana ${atk} hasar verdi!`, 'wrong');
      this._bossAttackAnim();
      this._updateBars();
      this._updateStreak();
      if (this.playerHp <= 0) { setTimeout(() => this._gameOver(false), 1200); return; }
    }

    setTimeout(() => this._newQuestion(), 1100);
  }

  _showHit(text, type) {
    const el = document.getElementById('boss-hit');
    if (!el) return;
    el.textContent = text;
    el.className   = `boss-hit-text ht-${type}`;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 800);
  }

  _bossAttackAnim() {
    const sh = document.getElementById('boss-shell');
    if (sh) { sh.classList.add('shake'); setTimeout(() => sh.classList.remove('shake'), 500); }
  }

  _showFeedback(msg, type) {
    const el = document.getElementById('boss-feedback');
    if (!el) return;
    el.textContent = msg;
    el.className = `arena-feedback fb-${type} fb-show`;
    setTimeout(() => el.classList.remove('fb-show'), 1000);
  }

  _updateBars() {
    const bfill = document.getElementById('boss-hp-fill');
    const bval  = document.getElementById('boss-hp-val');
    const pfill = document.getElementById('player-hp-fill');
    const pval  = document.getElementById('player-hp-val');
    const sc    = document.getElementById('boss-score');
    if (bfill) bfill.style.width = (this.bossHp / this.boss.hp * 100) + '%';
    if (bval)  bval.textContent  = `${this.bossHp}/${this.boss.hp}`;
    if (pfill) { pfill.style.width = this.playerHp + '%'; pfill.style.background = this.playerHp < 30 ? '#f43f5e' : '#10b981'; }
    if (pval)  pval.textContent  = `${this.playerHp}/100`;
    if (sc)    sc.textContent    = this.score;
  }

  _updateStreak() {
    const el  = document.getElementById('boss-streak');
    const val = document.getElementById('boss-streak-val');
    if (el)  el.style.display  = this.streak >= 2 ? 'block' : 'none';
    if (val) val.textContent   = this.streak;
  }

  _bossDefeated() {
    this.qm.confetti({ particleCount: 120, spread: 80 });
    const nextIdx = this.bossIdx + 1;
    const defeated = parseInt(localStorage.getItem('q_bosses') || '0') + 1;
    localStorage.setItem('q_bosses', defeated);

    if (nextIdx >= BOSSES.length) {
      this._gameOver(true);
      return;
    }

    this.root.innerHTML = `
<div class="qresult-shell">
  <div class="qresult-icon">${this.boss.emoji}</div>
  <h1 class="qresult-title">${this.boss.name} YENİLDİ!</h1>
  <div class="qresult-score">${this.score}</div>
  <div class="qresult-sub">Sonraki Boss: ${BOSSES[nextIdx].name} ${BOSSES[nextIdx].emoji}</div>
  <div class="qresult-xp">Skor: ${this.score}</div>
  <div class="qresult-btns">
    <button class="qres-btn primary" id="btn-next-boss">⚔️ Sonraki Boss →</button>
    <button class="qres-btn ghost"   onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;

    document.getElementById('btn-next-boss').onclick = () => {
      this.bossIdx++;
      this.playerHp = Math.min(100, this.playerHp + 30); // heal between bosses
      this._loadBoss();
    };
  }

  _gameOver(won) {
    this._stopQTimer();
    if (won) { this.qm.addXP(300); this.qm.confetti(); const w = parseInt(localStorage.getItem('q_wins')||'0')+1; localStorage.setItem('q_wins',w); }
    else { this.qm.addXP(Math.floor(this.score / 10)); }
    const bestStr = localStorage.getItem('q_best') || '0';
    if (this.score > parseInt(bestStr)) localStorage.setItem('q_best', String(this.score));

    this.root.innerHTML = `
<div class="qresult-shell">
  <div class="qresult-icon">${won ? '👑' : '💀'}</div>
  <h1 class="qresult-title">${won ? 'TÜM BOSS\'LAR YENİLDİ!' : 'YENİLDİN!'}</h1>
  <div class="qresult-score">${this.score}</div>
  <div class="qresult-sub">${won ? '4 boss yenildi — efsane!' : `${this.bossIdx + 1}. boss\'da düştün`}</div>
  <div class="qresult-xp">+${won ? 300 : Math.floor(this.score/10)} XP kazandın!</div>
  <div class="qresult-btns">
    <button class="qres-btn primary" onclick="window._qmode.startGame('boss')">🔄 Tekrar Oyna</button>
    <button class="qres-btn ghost"   onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;
  }

  _shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
}

window.QuantumMode = QuantumMode;
