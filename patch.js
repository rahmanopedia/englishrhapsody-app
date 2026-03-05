const fs = require('fs');
const file = 'C:/Users/ruhme/OneDrive/Masaüstü/english-rhapsody-main/js/app.js';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '  // ─────────────────────────────────────────────────────────\n  //  MODERN LEARN MODULE v2.0\n  // ─────────────────────────────────────────────────────────';
const endMarker = '  // ─────────────────────────────────────────────────────────\n  //  READING MODULE\n  // ─────────────────────────────────────────────────────────';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('Markers not found.');
    process.exit(1);
}

const newLogic = `  // ─────────────────────────────────────────────────────────
  //  SYNESTHESIA MODULE (WORLD FIRST)
  // ─────────────────────────────────────────────────────────

  _initLearn() {
    const intro = document.getElementById('synth-intro');
    const chamber = document.getElementById('synth-chamber');
    if (!intro) return;
    
    intro.style.display = 'flex';
    chamber.style.display = 'none';
    this.session.synthActive = false;
  }

  startSynesthesia() {
    this.session.synthActive = true;
    this.session.learnPool = [...WORDS].sort(() => Math.random() - 0.5).slice(0, 10);
    this.session.learnIdx = 0;
    this.session.synthScore = 0;
    this.session.synthStreak = 0;

    document.getElementById('synth-intro').style.display = 'none';
    document.getElementById('synth-chamber').style.display = 'flex';
    
    this._startSynthDrone();
    this._loadSynthWord();
    this.audio.play('pop');
  }

  _startSynthDrone() {
    if (this.session.synthDrone) return;
    try {
      const ctx = this.audio._ctx_ensure();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      this.session.synthDrone = { osc, gain };
    } catch(e) {}
  }

  _stopSynthDrone() {
    if (this.session.synthDrone) {
      const { osc, gain } = this.session.synthDrone;
      const ctx = this.audio._ctx;
      if (ctx) {
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
        setTimeout(() => { try { osc.stop(); } catch(e){} }, 1000);
      }
      this.session.synthDrone = null;
    }
  }

  _loadSynthWord() {
    const word = this.session.learnPool[this.session.learnIdx];
    if (!word) {
      this._finishSynesthesia();
      return;
    }

    this.session.synthWord = word;
    this.session.synthTyped = '';
    this.session.synthFails = 0;

    UI.setEl('synth-tr', word.tr);
    
    const display = document.getElementById('synth-input-display');
    if (display) {
      display.innerHTML = word.en.split('').map(() => '<span>_</span>').join('');
    }

    const core = document.getElementById('synth-core');
    if (core) {
      core.className = 'synth-core';
      core.style.transform = 'scale(1)';
    }

    setTimeout(() => this.speakWord(word.en), 400);
  }

  _handleSynthKey(key) {
    const word = this.session.synthWord;
    if (!word) return;

    const targetStr = word.en.toLowerCase();
    const targetChar = targetStr[this.session.synthTyped.length];
    
    if (key.toLowerCase() === targetChar) {
      this.session.synthTyped += targetChar;
      this._playSynthChime(this.session.synthTyped.length);
      this._updateSynthVisuals(true);

      if (this.session.synthTyped.length === targetStr.length) {
        setTimeout(() => this._completeSynthWord(), 200);
      }
    } else {
      this.session.synthFails++;
      this.session.synthStreak = 0;
      this._playSynthError();
      this._updateSynthVisuals(false);
      UI.setEl('synth-streak', '🔥 0');
    }
  }

  _updateSynthVisuals(isCorrect) {
    const core = document.getElementById('synth-core');
    const display = document.getElementById('synth-input-display');
    const typedLen = this.session.synthTyped.length;
    const wordLen = this.session.synthWord.en.length;

    if (display) {
      const spans = display.querySelectorAll('span');
      spans.forEach((span, i) => {
        if (i < typedLen) {
          span.textContent = this.session.synthWord.en[i];
          span.classList.add('filled');
        }
      });
    }

    if (core) {
      if (isCorrect) {
        const scale = 1 + (typedLen / wordLen) * 0.5;
        core.style.transform = \`scale(\${scale})\`;
        core.style.boxShadow = \`0 0 \${40 + typedLen*10}px rgba(0,212,255, \${0.5 + (typedLen/wordLen)*0.5})\`;
        core.style.background = 'rgba(0,212,255, 0.2)';
        core.classList.remove('error');
      } else {
        core.classList.add('error');
        setTimeout(() => core.classList.remove('error'), 300);
      }
    }
  }

  _completeSynthWord() {
    const word = this.session.synthWord;
    this.audio.play('success');
    
    const core = document.getElementById('synth-core');
    if (core) {
      const rect = core.getBoundingClientRect();
      UI.particles(rect.left + rect.width/2, rect.top + rect.height/2);
      core.classList.add('explode');
    }

    let points = 20;
    if (this.session.synthFails === 0) {
      points += 10;
      this.session.synthStreak++;
      UI.setEl('synth-streak', \`🔥 \${this.session.synthStreak}\`);
    }
    this.session.synthScore += points;
    UI.setEl('synth-score', \`\${this.session.synthScore} XP\`);

    this._updateMastery(word.id || word.en, this.session.synthFails === 0);

    setTimeout(() => {
      this.session.learnIdx++;
      this._loadSynthWord();
    }, 1200);
  }

  skipSynthWord() {
    this.session.synthFails++;
    this.session.synthStreak = 0;
    UI.setEl('synth-streak', '🔥 0');
    const word = this.session.synthWord;
    
    const display = document.getElementById('synth-input-display');
    if (display) {
      display.innerHTML = word.en.split('').map(c => \`<span class="filled error-text">\${c}</span>\`).join('');
    }
    
    this._playSynthError();
    this._updateMastery(word.id || word.en, false);

    setTimeout(() => {
      this.session.learnIdx++;
      this._loadSynthWord();
    }, 1500);
  }

  playSynthHint() {
    if (this.session.synthWord) {
      this.speakWord(this.session.synthWord.en);
      this.session.synthFails++;
    }
  }

  _playSynthChime(index) {
    try {
      const ctx = this.audio._ctx_ensure();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
      const freq = scale[(index - 1) % scale.length];
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      
      osc.start(t);
      osc.stop(t + 1.5);
    } catch(e){}
  }

  _playSynthError() {
    try {
       const ctx = this.audio._ctx_ensure();
       const t = ctx.currentTime;
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       osc.connect(gain); gain.connect(ctx.destination);
       osc.type = 'sawtooth';
       osc.frequency.setValueAtTime(150, t);
       osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
       gain.gain.setValueAtTime(0.4, t);
       gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
       osc.start(t); osc.stop(t+0.3);
       if (navigator.vibrate) navigator.vibrate(50);
    } catch(e){}
  }

  _finishSynesthesia() {
    this._stopSynthDrone();
    this.session.synthActive = false;
    this.addXP(this.session.synthScore);
    
    document.getElementById('synth-chamber').innerHTML = \`
      <div class="synth-intro" style="display:flex">
        <div class="synth-icon-main" style="color:var(--green)">✨</div>
        <h1 class="synth-title" style="color:var(--green)">BAĞLANTI TAMAMLANDI</h1>
        <p class="synth-subtitle">Toplam Kazanım: \${this.session.synthScore} XP</p>
        <button class="synth-start-btn" style="margin-top:30px" onclick="app.navigate('home')">MERKEZE DÖN</button>
      </div>
    \`;
    if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 100 });
  }

  _updateMastery(id, isCorrect) {
    const mastery = this.state.get('mastery');
    const updated = SRS.update(mastery, id, isCorrect);
    this.state.set('mastery', updated);
    const total   = this.state.get('totalAttempts') + 1;
    const correct = this.state.get('totalCorrect')  + (isCorrect ? 1 : 0);
    this.state.update({ totalAttempts: total, totalCorrect: correct });
  }

`;

const newContent = content.substring(0, startIndex) + newLogic + content.substring(endIndex);
fs.writeFileSync(file, newContent, 'utf8');
console.log('Successfully replaced logic.');
