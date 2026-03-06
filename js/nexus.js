class NexusMode {
  constructor(app) {
    this.app = app;
    this.root = null;
    
    // Core data
    this.allPhrasals = [];
    this.allVerbs = new Set();
    this.allParticles = new Set();
    
    // Game State
    this.queue = [];
    this.current = null;
    this.score = 0;
    this.combo = 0;
    this.locked = false;
    this.mode = null; 
    
    // Cipher Mode State
    this.cipherVerbs = [];
    this.cipherParticles = [];
    this.cipherVerbIdx = 0;
    this.cipherParticleIdx = 0;
    this.glitchInterval = null;

    this._loadData();
    this._resizeHandler = () => { if (this.mode === 'network' && this.current) this._positionNodes(); };
    window.addEventListener('resize', this._resizeHandler);
  }

  _loadData() {
    let verbsMap = {};
    let allV = new Set();
    let allP = new Set();
    
    if (typeof PHRASE_DICT !== 'undefined') {
      for (const [phrase, data] of Object.entries(PHRASE_DICT)) {
        if (data.type === 'Phrasal Verb') {
          const parts = phrase.split(' ');
          const verb = parts[0];
          const particle = parts.slice(1).join(' ');
          allV.add(verb);
          allP.add(particle);
          let item = { phrase, verb, particle, tr: data.tr, ex: data.ex };
          this.allPhrasals.push(item);
          if (!verbsMap[verb]) verbsMap[verb] = [];
          verbsMap[verb].push(item);
        }
      }
    }
    this.allVerbs = Array.from(allV);
    this.allParticles = Array.from(allP);
    
    this.constellations = Object.keys(verbsMap)
      .filter(v => verbsMap[v].length >= 2)
      .map(v => {
          let tasks = verbsMap[v];
          if (tasks.length > 5) { tasks.sort(() => 0.5 - Math.random()); tasks = tasks.slice(0, 5); }
          return { verb: v, tasks: tasks };
      });
  }

  init(rootEl) {
    this.root = rootEl;
    this._showIntro();
  }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
    if (this.glitchInterval) clearInterval(this.glitchInterval);
    if (this.root) this.root.innerHTML = '';
  }

  _showIntro() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v4-badge">v4.5</span></h1>
        <p class="nexus-subtitle">Evrensel Dil Öğrenim Merkezi</p>
      </div>
      <div class="nexus-mode-selector">
        <div class="nexus-mode-card" onclick="window.nexusMod.startNetwork()">
          <div class="nm-icon">🌌</div>
          <div class="nm-title">Semantik Ağ</div>
          <div class="nm-desc">Merkez fiilin etrafına doğru edatları bağlayarak anlam haritaları kur. Görsel hafızanı güçlendir.</div>
        </div>
        <div class="nexus-mode-card" onclick="window.nexusMod.startCipher()" style="border-color: rgba(16, 185, 129, 0.3);">
          <div class="nm-icon">🔐</div>
          <div class="nm-title" style="color: #10b981;">Kuantum Hack</div>
          <div class="nm-desc">Dijital şifreleme paneliyle cümlenin kodunu kır. Phrasal Verb kombinasyonlarını mekanik olarak zihnine işle.</div>
        </div>
      </div>
      <div class="nexus-bg-matrix" id="nexus-matrix"></div>
    `;
    this._createMatrix();
  }

  _createMatrix() {
    const container = document.getElementById('nexus-matrix');
    if (!container) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for(let i=0; i<20; i++) {
        const col = document.createElement('div');
        col.className = 'matrix-column';
        col.style.left = Math.random() * 100 + '%';
        col.style.animationDuration = (Math.random() * 5 + 5) + 's';
        col.style.animationDelay = (Math.random() * 5) + 's';
        let text = "";
        for(let j=0; j<20; j++) text += chars[Math.floor(Math.random()*chars.length)] + "\n";
        col.innerText = text;
        container.appendChild(col);
    }
  }

  // ==========================================
  // NETWORK MODE (Önceki v3.0 mantığı korunur)
  // ==========================================
  startNetwork() {
    this.mode = 'network';
    const shuffled = [...this.constellations].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 5); 
    this.score = 0; this.combo = 0; this.currentIndex = 0;
    this.nextNetworkWord();
  }

  nextNetworkWord() {
    if (this.currentIndex >= this.queue.length) { this._showResults('Ağ Bütünleştirildi'); return; }
    this.current = this.queue[this.currentIndex];
    this.locked = false;
    this._renderNetwork();
  }

  _renderNetwork() {
    let tasks = [...this.current.tasks];
    tasks.sort(() => 0.5 - Math.random());
    this.current.tasks = tasks;
    this.currentTaskIndex = 0;
    let particlesToShow = tasks.map(p => p.particle);
    let wrongParticles = this.allParticles.filter(p => !particlesToShow.includes(p));
    wrongParticles.sort(() => 0.5 - Math.random());
    particlesToShow.push(...wrongParticles.slice(0, 3));
    particlesToShow.sort(() => 0.5 - Math.random());
    this.current.nodes = particlesToShow;

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v4-badge" style="background:var(--cyan)">AĞ MODU</span></h1>
        <p class="nexus-subtitle">Takımyıldızı ${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      <div class="nexus-display-container">
         <div class="nexus-task-progress">Düğüm ${this.currentTaskIndex + 1} / ${this.current.tasks.length}</div>
         <div class="nexus-question" id="nx-q">${this.current.tasks[0].tr}</div>
         <div class="nexus-feedback-area" id="nx-feedback" style="display:none;">
            <div class="nexus-phrase-result" id="nx-phrase-res"></div>
            <div class="nexus-example-text" id="nx-ex-res"></div>
         </div>
      </div>
      <div class="nexus-game-area" id="nexus-board">
        <svg class="nexus-connection-line" id="nexus-svg"></svg>
        <div class="nexus-core-node" id="nexus-core" onclick="window.nexusMod.playVerbAudio('${this.current.verb}')">
          ${this.current.verb}
        </div>
        ${this.current.nodes.map((opt, i) => {
           return `<div class="nexus-particle-node" id="particle-${i}" onclick="window.nexusMod.checkNetworkAnswer('${opt}', this)">${opt}</div>`;
        }).join('')}
      </div>
      <div class="nexus-hud"><div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div><div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div></div>
      <div class="nexus-bg-matrix" id="nexus-matrix"></div>
    `;
    setTimeout(() => this._positionNodes(), 30);
    this._createMatrix();
  }

  _positionNodes() {
    const board = document.getElementById('nexus-board');
    const core = document.getElementById('nexus-core');
    if (!board || !core) return;
    const boardRect = board.getBoundingClientRect();
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height / 2;
    core.style.left = `${centerX - core.offsetWidth/2}px`;
    core.style.top = `${centerY - core.offsetHeight/2}px`;
    const particles = document.querySelectorAll('.nexus-particle-node');
    const baseRadius = Math.min(boardRect.width, boardRect.height) * 0.35;
    const radius = Math.max(baseRadius, window.innerWidth < 600 ? 90 : 130);
    particles.forEach((p, i) => {
       const angle = (i / particles.length) * Math.PI * 2 - Math.PI/2;
       const x = centerX + Math.cos(angle) * radius - p.offsetWidth/2;
       const y = centerY + Math.sin(angle) * radius - p.offsetHeight/2;
       p.style.left = `${x}px`; p.style.top = `${y}px`;
    });
    this._redrawLines();
  }

  _redrawLines() {
       const core = document.getElementById('nexus-core');
       const svg = document.getElementById('nexus-svg');
       if (!core || !svg) return;
       svg.innerHTML = ''; 
       const coreRect = core.getBoundingClientRect();
       const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
       document.querySelectorAll('.nexus-particle-node.solved').forEach(p => {
             const pRect = p.getBoundingClientRect();
             const x1 = coreRect.left + coreRect.width/2 - boardRect.left;
             const y1 = coreRect.top + coreRect.height/2 - boardRect.top;
             const x2 = pRect.left + pRect.width/2 - boardRect.left;
             const y2 = pRect.top + pRect.height/2 - boardRect.top;
             const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
             newLine.setAttribute('x1', x1); newLine.setAttribute('y1', y1); newLine.setAttribute('x2', x2); newLine.setAttribute('y2', y2);
             newLine.setAttribute('class', 'nexus-line correct-line');
             svg.appendChild(newLine);
       });
  }

  _drawLineTo(el) {
       const core = document.getElementById('nexus-core');
       const svg = document.getElementById('nexus-svg');
       if (!core || !svg) return;
       const coreRect = core.getBoundingClientRect();
       const elRect = el.getBoundingClientRect();
       const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
       const x1 = coreRect.left + coreRect.width/2 - boardRect.left;
       const y1 = coreRect.top + coreRect.height/2 - boardRect.top;
       const x2 = elRect.left + elRect.width/2 - boardRect.left;
       const y2 = elRect.top + elRect.height/2 - boardRect.top;
       const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
       newLine.setAttribute('x1', x1); newLine.setAttribute('y1', y1); newLine.setAttribute('x2', x2); newLine.setAttribute('y2', y2);
       newLine.setAttribute('class', 'nexus-line correct-line new-line');
       svg.appendChild(newLine);
  }

  checkNetworkAnswer(particle, el) {
    if (this.locked) return;
    if (el.classList.contains('solved')) return;
    const task = this.current.tasks[this.currentTaskIndex];
    if (particle === task.particle) {
       this.locked = true; el.classList.add('solved'); this._drawLineTo(el);
       if(this.app.audio) this.app.audio.play('correct');
       if(this.app.speakWord) this.app.speakWord(task.phrase);
       this.score += 30 + (this.combo * 5); this.combo++; this._updateHUD();
       const qEl = document.getElementById('nx-q');
       const feedbackArea = document.getElementById('nx-feedback');
       if (qEl) qEl.style.display = 'none';
       if (feedbackArea) {
           feedbackArea.style.display = 'flex';
           document.getElementById('nx-phrase-res').innerText = task.phrase;
           document.getElementById('nx-ex-res').innerText = `"${task.ex}"`;
       }
       this.currentTaskIndex++;
       setTimeout(() => {
          if (this.currentTaskIndex >= this.current.tasks.length) { this._completeConstellation(); } 
          else {
             if (qEl) { qEl.style.display = 'block'; qEl.innerText = this.current.tasks[this.currentTaskIndex].tr; }
             if (feedbackArea) feedbackArea.style.display = 'none';
             const prog = document.querySelector('.nexus-task-progress');
             if (prog) prog.innerText = `Düğüm ${this.currentTaskIndex + 1} / ${this.current.tasks.length}`;
             this.locked = false;
          }
       }, 2500);
    } else {
       el.classList.add('wrong'); if(this.app.audio) this.app.audio.play('error');
       this.combo = 0; this._updateHUD();
       setTimeout(() => { el.classList.remove('wrong'); }, 800);
    }
  }

  _completeConstellation() {
      if(this.app.audio) this.app.audio.play('level_up');
      const core = document.getElementById('nexus-core');
      if (core) core.classList.add('constellation-complete-glow');
      document.querySelectorAll('.correct-line').forEach(l => l.classList.add('pulse-line'));
      this.score += 100; this._updateHUD();
      setTimeout(() => { this.currentIndex++; this.nextNetworkWord(); }, 3500);
  }

  // ==========================================
  // CIPHER MODE v4.5 (Hack Simülasyonu)
  // ==========================================
  startCipher() {
    this.mode = 'cipher';
    const hasEx = this.allPhrasals.filter(p => p.ex);
    const shuffled = [...hasEx].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 10);
    this.score = 0; this.combo = 0; this.currentIndex = 0;
    this.nextCipherWord();
  }

  nextCipherWord() {
    if (this.currentIndex >= this.queue.length) { this._showResults('Sistem Hacklendi'); return; }
    if (this.glitchInterval) clearInterval(this.glitchInterval);
    this.current = this.queue[this.currentIndex];
    this.locked = false;
    
    this.cipherVerbs = [this.current.verb];
    let otherVerbs = this.allVerbs.filter(v => v !== this.current.verb).sort(() => 0.5 - Math.random()).slice(0, 5);
    this.cipherVerbs.push(...otherVerbs); this.cipherVerbs.sort(() => 0.5 - Math.random());
    this.cipherVerbIdx = Math.floor(Math.random() * this.cipherVerbs.length); 
    
    this.cipherParticles = [this.current.particle];
    let otherParts = this.allParticles.filter(p => p !== this.current.particle).sort(() => 0.5 - Math.random()).slice(0, 5);
    this.cipherParticles.push(...otherParts); this.cipherParticles.sort(() => 0.5 - Math.random());
    this.cipherParticleIdx = Math.floor(Math.random() * this.cipherParticles.length);

    this._renderCipher();
    this._startGlitchEffect();
  }

  _startGlitchEffect() {
      const glitchEl = document.getElementById('cipher-glitch-area');
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789";
      this.glitchInterval = setInterval(() => {
          if (this.locked) return;
          let noise = "";
          for(let i=0; i<10; i++) noise += chars[Math.floor(Math.random()*chars.length)];
          if (glitchEl) glitchEl.innerText = `[ ${noise} ]`;
      }, 80);
  }

  _renderCipher() {
    const fullPhraseRegex = new RegExp(this.current.phrase.replace(' ', '\\s+'), 'gi');
    let displayEx = this.current.ex.replace(fullPhraseRegex, '<span class="cipher-glitch" id="cipher-glitch-area">[ SEARCHING... ]</span>');

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v4-badge" style="background:#10b981">QUANTUM HACK</span></h1>
        <p class="nexus-subtitle">Güvenlik Katmanı ${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      <div class="cipher-sentence-box" id="cipher-sentence">
        "${displayEx}"
        <div class="cipher-hint">Hedef Veri: ${this.current.tr}</div>
      </div>
      <div class="cipher-lock-mechanism">
        <div class="cipher-dial">
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('verb', -1)">▲</button>
          <div class="cipher-window" id="cipher-w-verb">${this.cipherVerbs[this.cipherVerbIdx]}</div>
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('verb', 1)">▼</button>
        </div>
        <div style="font-size:2.5rem; color:#333; font-weight:900;">•</div>
        <div class="cipher-dial">
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('particle', -1)">▲</button>
          <div class="cipher-window" id="cipher-w-particle">${this.cipherParticles[this.cipherParticleIdx]}</div>
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('particle', 1)">▼</button>
        </div>
      </div>
      <div style="text-align:center;"><button class="cipher-engage-btn" id="cipher-engage" onclick="window.nexusMod.checkCipher()">ERİŞİMİ SAĞLA</button></div>
      <div class="nexus-hud"><div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div><div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div></div>
      <div class="nexus-bg-matrix" id="nexus-matrix"></div>
    `;
    this._createMatrix();
  }

  scrollDial(type, dir) {
     if (this.locked) return;
     if(this.app.audio) this.app.audio.play('tick'); 
     if (type === 'verb') {
         this.cipherVerbIdx = (this.cipherVerbIdx + dir + this.cipherVerbs.length) % this.cipherVerbs.length;
         document.getElementById('cipher-w-verb').innerText = this.cipherVerbs[this.cipherVerbIdx];
     } else {
         this.cipherParticleIdx = (this.cipherParticleIdx + dir + this.cipherParticles.length) % this.cipherParticles.length;
         document.getElementById('cipher-w-particle').innerText = this.cipherParticles[this.cipherParticleIdx];
     }
     this._liveCheck();
  }

  _liveCheck() {
      // Sadece Fiil doğruysa turuncu yap (Stabilizasyon)
      const wv = document.getElementById('cipher-w-verb');
      const isVerbCorrect = this.cipherVerbs[this.cipherVerbIdx] === this.current.verb;
      if (isVerbCorrect) wv.classList.add('stabilizing');
      else wv.classList.remove('stabilizing');
  }

  checkCipher() {
      if (this.locked) return;
      const isVerbCorrect = this.cipherVerbs[this.cipherVerbIdx] === this.current.verb;
      const isParticleCorrect = this.cipherParticles[this.cipherParticleIdx] === this.current.particle;
      const wv = document.getElementById('cipher-w-verb');
      const wp = document.getElementById('cipher-w-particle');
      
      if (isVerbCorrect && isParticleCorrect) {
          this.locked = true; clearInterval(this.glitchInterval);
          if(this.app.audio) this.app.audio.play('correct');
          wv.classList.add('locked-in'); wp.classList.add('locked-in');
          const sentBox = document.getElementById('cipher-sentence');
          sentBox.innerHTML = `"${this.current.ex}" <div style="color:#10b981; margin-top:15px; font-size:1.3rem; font-weight:800; letter-spacing:2px;">🔓 ERİŞİM ONAYLANDI!</div>`;
          sentBox.style.borderColor = '#10b981';
          if(this.app.speakWord) this.app.speakWord(this.current.ex);
          this.score += 50 + (this.combo * 10); this.combo++; this._updateHUD();
          setTimeout(() => { this.currentIndex++; this.nextCipherWord(); }, 3500);
      } else {
          if(this.app.audio) this.app.audio.play('error');
          if (!isVerbCorrect) { wv.classList.add('wrong'); setTimeout(() => wv.classList.remove('wrong'), 500); }
          if (!isParticleCorrect) { wp.classList.add('wrong'); setTimeout(() => wp.classList.remove('wrong'), 500); }
          this.combo = 0; this._updateHUD();
      }
  }

  _updateHUD() {
      const scEl = document.getElementById('nx-score');
      const cbEl = document.getElementById('nx-combo');
      if (scEl) scEl.innerText = this.score;
      if (cbEl) cbEl.innerText = this.combo;
      if(this.app.state) {
         let xp = this.app.state.get('xp') || 0;
         this.app.state.update({ xp: xp + 30 });
         if(this.app._renderHeader) this.app._renderHeader();
      }
  }

  playVerbAudio(word) {
    if(this.app.speakWord) this.app.speakWord(word);
    const core = document.getElementById('nexus-core');
    if (core) { core.classList.add('active'); setTimeout(() => core.classList.remove('active'), 300); }
  }

  _showResults(title) {
    if (this.glitchInterval) clearInterval(this.glitchInterval);
    this.root.innerHTML = `
      <div class="nexus-header"><h1 class="nexus-title">NEXUS <span class="v4-badge">SİSTEM TEMİZ</span></h1></div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px #10b981;">👾</div>
        <h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">${title}!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazanılan Toplam Enerji: <strong style="color:#10b981">+${this.score} XP</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.init(window.nexusMod.root)">MERKEZE DÖN</button>
           <button class="btn btn-ghost" style="padding: 16px 30px; font-size: 1.1rem;" onclick="app.navigate('home')">ANA MERKEZ</button>
        </div>
      </div>
      <div class="nexus-bg-matrix" id="nexus-matrix"></div>
    `;
    this._createMatrix();
    if (typeof confetti === 'function') confetti({ particleCount: 200, spread: 90, origin: {y: 0.6}, colors: ['#00d4ff', '#10b981'] });
  }
}
