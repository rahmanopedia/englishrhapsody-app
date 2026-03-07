// ════════════════════════════════════════════════════════════════
//  KUANTUM MODU 2.0 — The Multidimensional Grammar Engine
// ════════════════════════════════════════════════════════════════

const QUANTUM_SCENARIOS = [
  { id: 's1', subj: { w: 'I', type: 'I', obj_form: 'me' }, verb: { v1: 'eat', v2: 'ate', v3: 'eaten', ving: 'eating' }, obj: { w: 'an apple', type: 'sg' }, icon: '🍎' },
  { id: 's2', subj: { w: 'The dog', type: 'sg', obj_form: 'the dog' }, verb: { v1: 'chase', v2: 'chased', v3: 'chased', ving: 'chasing' }, obj: { w: 'the cat', type: 'sg' }, icon: '🐕' },
  { id: 's3', subj: { w: 'She', type: 'sg', obj_form: 'her' }, verb: { v1: 'write', v2: 'wrote', v3: 'written', ving: 'writing' }, obj: { w: 'a letter', type: 'sg' }, icon: '✉️' },
  { id: 's4', subj: { w: 'They', type: 'pl', obj_form: 'them' }, verb: { v1: 'build', v2: 'built', v3: 'built', ving: 'building' }, obj: { w: 'a bridge', type: 'sg' }, icon: '🌉' },
  { id: 's5', subj: { w: 'The hacker', type: 'sg', obj_form: 'the hacker' }, verb: { v1: 'steal', v2: 'stole', v3: 'stolen', ving: 'stealing' }, obj: { w: 'the files', type: 'pl' }, icon: '💻' },
  { id: 's6', subj: { w: 'The chef', type: 'sg', obj_form: 'the chef' }, verb: { v1: 'cook', v2: 'cooked', v3: 'cooked', ving: 'cooking' }, obj: { w: 'the meal', type: 'sg' }, icon: '👨‍🍳' }
];

const LABELS = {
  time: { pres: 'ŞİMDİ (Present)', past: 'GEÇMİŞ (Past)', fut: 'GELECEK (Future)' },
  flow: { simp: 'BASİT (Simple)', cont: 'SÜREGELEN (Continuous)', perf: 'TAMAMLANMIŞ (Perfect)', perf_cont: 'SÜREÇSEL (Perfect Cont.)' },
  voice: { act: 'ETKEN (Active)', pass: 'EDİLGEN (Passive)' },
  pol:  { aff: 'OLUMLU', neg: 'OLUMSUZ', que: 'SORU' }
};

class QuantumMode {
  constructor(app) {
    this.app = app;
    this.root = null;
    this.scenarioIdx = 0;
    this.state = { time: 'pres', flow: 'simp', voice: 'act', pol: 'aff' };
    this.isMission = false;
    this.targetState = null;
  }

  init(root) {
    this.root = root;
    this.scenarioIdx = Math.floor(Math.random() * QUANTUM_SCENARIOS.length);
    this.render();
    this.attachEvents();
    this.updateVisualizer();
  }

  destroy() {
    this.root.innerHTML = '';
  }

  getScenario() { return QUANTUM_SCENARIOS[this.scenarioIdx]; }

  // ── 1. GENERATIVE GRAMMAR ENGINE (ENGLISH) ──────────────────
  generateSentence(scenario, time, flow, voice, pol) {
    let subj = voice === 'act' ? scenario.subj : scenario.obj;
    let originalSubj = scenario.subj;

    let s_type = subj.type;
    let isThirdSg = !['I','you','we','they','pl'].includes(s_type);
    let isPluralOrYouWeThey = ['you','we','they','pl'].includes(s_type);
    
    let be_pres = (s_type === 'I') ? 'am' : (isPluralOrYouWeThey ? 'are' : 'is');
    let be_past = isPluralOrYouWeThey ? 'were' : 'was';
    let have_pres = (s_type === 'I' || isPluralOrYouWeThey) ? 'have' : 'has';

    let v1 = scenario.verb.v1;
    let v2 = scenario.verb.v2;
    let v3 = scenario.verb.v3;
    let ving = scenario.verb.ving;
    
    let v_s = v1;
    if (isThirdSg) {
        if(v1.endsWith('y') && !['a','e','i','o','u'].includes(v1[v1.length-2])) v_s = v1.slice(0,-1)+'ies';
        else if(v1.match(/(ch|sh|s|x|z|o)$/)) v_s = v1+'es';
        else v_s = v1+'s';
    }

    let aux = [];
    let main_verb = '';
    
    if (voice === 'act') {
        if (time === 'pres') {
            if (flow === 'simp') {
                if (pol === 'aff') main_verb = v_s;
                else { aux = [isThirdSg ? 'does' : 'do']; main_verb = v1; }
            }
            else if (flow === 'cont') { aux = [be_pres]; main_verb = ving; }
            else if (flow === 'perf') { aux = [have_pres]; main_verb = v3; }
            else if (flow === 'perf_cont') { aux = [have_pres, 'been']; main_verb = ving; }
        } else if (time === 'past') {
            if (flow === 'simp') {
                if (pol === 'aff') main_verb = v2;
                else { aux = ['did']; main_verb = v1; }
            }
            else if (flow === 'cont') { aux = [be_past]; main_verb = ving; }
            else if (flow === 'perf') { aux = ['had']; main_verb = v3; }
            else if (flow === 'perf_cont') { aux = ['had', 'been']; main_verb = ving; }
        } else if (time === 'fut') {
            if (flow === 'simp') { aux = ['will']; main_verb = v1; }
            else if (flow === 'cont') { aux = ['will', 'be']; main_verb = ving; }
            else if (flow === 'perf') { aux = ['will', 'have']; main_verb = v3; }
            else if (flow === 'perf_cont') { aux = ['will', 'have', 'been']; main_verb = ving; }
        }
    } else { // Passive
        if (time === 'pres') {
            if (flow === 'simp') { aux = [be_pres]; main_verb = v3; }
            else if (flow === 'cont') { aux = [be_pres, 'being']; main_verb = v3; }
            else if (flow === 'perf') { aux = [have_pres, 'been']; main_verb = v3; }
            else if (flow === 'perf_cont') { aux = [have_pres, 'been', 'being']; main_verb = v3; }
        } else if (time === 'past') {
            if (flow === 'simp') { aux = [be_past]; main_verb = v3; }
            else if (flow === 'cont') { aux = [be_past, 'being']; main_verb = v3; }
            else if (flow === 'perf') { aux = ['had', 'been']; main_verb = v3; }
            else if (flow === 'perf_cont') { aux = ['had', 'been', 'being']; main_verb = v3; }
        } else if (time === 'fut') {
            if (flow === 'simp') { aux = ['will', 'be']; main_verb = v3; }
            else if (flow === 'cont') { aux = ['will', 'be', 'being']; main_verb = v3; }
            else if (flow === 'perf') { aux = ['will', 'have', 'been']; main_verb = v3; }
            else if (flow === 'perf_cont') { aux = ['will', 'have', 'been', 'being']; main_verb = v3; }
        }
    }

    let parts = [];
    
    if (pol === 'neg') {
        if (aux.length > 0) {
            if (aux[0] === 'will') aux[0] = "won't";
            else if (aux[0] === 'am') { aux[0] = 'am'; aux.splice(1, 0, 'not'); }
            else aux[0] = aux[0] + "n't";
        }
    }

    if (pol === 'que') {
        if (aux.length > 0) {
            let firstAux = aux.shift();
            parts.push({ w: firstAux.charAt(0).toUpperCase() + firstAux.slice(1), c: 'aux' });
            parts.push({ w: subj.w.toLowerCase(), c: 'subj' });
        } else {
            parts.push({ w: subj.w, c: 'subj' });
        }
    } else {
        let s_w = subj.w;
        parts.push({ w: s_w.charAt(0).toUpperCase() + s_w.slice(1), c: 'subj' });
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

  render() {
    this.root.innerHTML = `
      <div class="quantum-shell">
        <div class="q-header">
          <div class="q-logo-wrap"><span class="q-logo-icon">⚛️</span></div>
          <h1 class="q-title">KUANTUM MODU</h1>
          <p class="q-sub">Multidimensional Grammar Visualizer</p>
        </div>

        <div class="q-mission-panel" id="q-mission-panel">
          <div class="qm-title">TARGET STATE</div>
          <div class="qm-target" id="qm-target-text"></div>
        </div>

        <div class="q-visualizer">
          <div class="q-scenario-icon" id="q-scenario-icon"></div>
          <div class="q-particle-field" id="q-field"></div>
        </div>

        <div class="q-dials">
          <div class="q-dial-row">
              <div class="q-dial-group" style="flex:1">
                <label>Polarity</label>
                <div class="q-slider" id="dial-pol">
                   <button data-type="pol" data-val="aff" class="active">+</button>
                   <button data-type="pol" data-val="neg">-</button>
                   <button data-type="pol" data-val="que">?</button>
                </div>
              </div>
              <div class="q-dial-group" style="flex:2">
                <label>Voice</label>
                <div class="q-slider" id="dial-voice">
                   <button data-type="voice" data-val="act" class="active">Active</button>
                   <button data-type="voice" data-val="pass">Passive</button>
                </div>
              </div>
          </div>

          <div class="q-dial-group">
            <label>Time</label>
            <div class="q-slider" id="dial-time">
               <button data-type="time" data-val="past">Past</button>
               <button data-type="time" data-val="pres" class="active">Present</button>
               <button data-type="time" data-val="fut">Future</button>
            </div>
          </div>
          <div class="q-dial-group">
            <label>Flow</label>
            <div class="q-slider" id="dial-flow">
               <button data-type="flow" data-val="simp" class="active">Simple</button>
               <button data-type="flow" data-val="cont">Continuous</button>
               <button data-type="flow" data-val="perf">Perfect</button>
               <button data-type="flow" data-val="perf_cont">Perfect Cont.</button>
            </div>
          </div>
        </div>

        <div class="q-controls">
          <button id="q-btn-scenario" class="q-btn-ghost">🔄 Change Elements</button>
          <button id="q-btn-mission" class="q-btn-primary">🎯 Mission Start</button>
        </div>
      </div>`;
  }

  attachEvents() {
    const dials = this.root.querySelectorAll('.q-slider button');
    dials.forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;
        this.state[type] = val;

        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const viz = document.querySelector('.q-visualizer');
        if (viz) {
            viz.classList.add('flash');
            setTimeout(() => viz.classList.remove('flash'), 300);
        }

        this.updateVisualizer();
        if (this.app.audio) this.app.audio.play('click');
      };
    });

    document.getElementById('q-btn-scenario').onclick = () => {
      this.scenarioIdx = (this.scenarioIdx + 1) % QUANTUM_SCENARIOS.length;
      this.updateVisualizer();
      if (this.app.audio) this.app.audio.play('swipe');
    };

    document.getElementById('q-btn-mission').onclick = () => {
      if (this.isMission) this.cancelMission();
      else this.startMission();
      if (this.app.audio) this.app.audio.play('correct');
    };
  }

  updateVisualizer() {
    const scenario = this.getScenario();
    document.getElementById('q-scenario-icon').innerText = scenario.icon;

    const parts = this.generateSentence(scenario, this.state.time, this.state.flow, this.state.voice, this.state.pol);

    const field = document.getElementById('q-field');
    if (field) {
        field.innerHTML = parts.map((p, i) =>
          `<div class="q-word c-${p.c}" style="transition-delay: ${i*0.04}s">${p.w}</div>`
        ).join('');

        setTimeout(() => {
          field.querySelectorAll('.q-word').forEach(el => el.classList.add('visible'));
        }, 20);
    }

    this.checkMission();
  }

  startMission() {
    this.isMission = true;
    const times = ['pres', 'past', 'fut'];
    const flows = ['simp', 'cont', 'perf', 'perf_cont'];
    const voices = ['act', 'pass'];
    const pols = ['aff', 'neg', 'que'];

    this.targetState = {
      time: times[Math.floor(Math.random()*times.length)],
      flow: flows[Math.floor(Math.random()*flows.length)],
      voice: voices[Math.floor(Math.random()*voices.length)],
      pol: pols[Math.floor(Math.random()*pols.length)]
    };

    const targetStr = `${LABELS.pol[this.targetState.pol]} + ${LABELS.time[this.targetState.time]} + ${LABELS.flow[this.targetState.flow]} + ${LABELS.voice[this.targetState.voice]}`;
    document.getElementById('qm-target-text').innerText = targetStr;
    document.getElementById('q-mission-panel').classList.add('active');

    const btn = document.getElementById('q-btn-mission');
    btn.innerText = '🛑 Cancel Mission';
    btn.style.background = 'linear-gradient(135deg, #f43f5e, #be123c)';
  }

  cancelMission() {
    this.isMission = false;
    this.targetState = null;
    const panel = document.getElementById('q-mission-panel');
    if (panel) panel.classList.remove('active');
    
    const btn = document.getElementById('q-btn-mission');
    if (btn) {
        btn.innerText = '🎯 Mission Start';
        btn.style.background = 'linear-gradient(135deg, #00d4ff, #7c3aed)';
    }
  }

  checkMission() {
    if (!this.isMission || !this.targetState) return;
    if (this.state.time === this.targetState.time &&
        this.state.flow === this.targetState.flow &&
        this.state.voice === this.targetState.voice &&
        this.state.pol === this.targetState.pol) {

        this.isMission = false;
        this.app.addXP(100); 
        if (typeof confetti === 'function') {
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#00d4ff', '#7c3aed', '#ec4899'] });
        }

        const targetText = document.getElementById('qm-target-text');
        if (targetText) targetText.innerHTML = '🏆 MISSION COMPLETE! +100 XP';
        setTimeout(() => {
          this.cancelMission();
        }, 2500);
    }
  }
}

window.QuantumMode = QuantumMode;
