class NexusMode {
  constructor(app) {
    this.app = app;
    this.root = null;
    this.phrasals = [];
    this.queue = [];
    this.current = null;
    this.score = 0;
    this.combo = 0;
    this.particles = ['up', 'down', 'in', 'out', 'on', 'off', 'over', 'away', 'back', 'into', 'with', 'through', 'for'];
    this.locked = false;
    this._loadData();
  }

  _loadData() {
    if (typeof PHRASE_DICT !== 'undefined') {
      for (const [phrase, data] of Object.entries(PHRASE_DICT)) {
        if (data.type === 'Phrasal Verb') {
          const parts = phrase.split(' ');
          if (parts.length >= 2) {
            this.phrasals.push({
              phrase: phrase,
              verb: parts[0],
              particle: parts.slice(1).join(' '),
              tr: data.tr,
              ex: data.ex
            });
          }
        }
      }
    }
  }

  init(rootEl) {
    this.root = rootEl;
    this._showIntro();
  }

  destroy() {
    if (this.root) this.root.innerHTML = '';
  }

  _showIntro() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS MODU</h1>
        <p class="nexus-subtitle">Phrasal Verb'leri Kozmik Bağlantılarla Öğren</p>
      </div>
      <div class="nexus-game-area" style="text-align:center; padding-top: 50px;">
        <p style="color:var(--text-2); font-size:1.2rem; max-width:600px; line-height:1.6; margin: 0 auto 30px;">
          Fiil ve edatı (particle) birbirine bağlayarak doğru Phrasal Verb'ü oluştur. 
          Görsel ve kassal hafızanı kullanarak kalıcı öğren.
        </p>
        <button class="btn btn-primary" style="font-size:1.3rem; padding:15px 40px;" onclick="window.nexusMod.start()">BAŞLA</button>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars();
  }

  _createStars() {
    const starContainer = document.getElementById('nexus-stars');
    if (!starContainer) return;
    let stars = '';
    for(let i=0; i<60; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const dur = Math.random() * 3 + 2;
      stars += `<div class="nexus-star" style="left:${x}%; top:${y}%; width:${size}px; height:${size}px; --dur:${dur}s"></div>`;
    }
    starContainer.innerHTML = stars;
  }

  start() {
    const shuffled = [...this.phrasals].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 10);
    if(this.queue.length === 0) {
       if (typeof UI !== 'undefined' && UI.toast) UI.toast('Phrasal Verb bulunamadı!');
       return;
    }
    this.score = 0;
    this.combo = 0;
    this.currentIndex = 0;
    this.nextWord();
  }

  nextWord() {
    if (this.currentIndex >= this.queue.length) {
      this._showResults();
      return;
    }
    this.current = this.queue[this.currentIndex];
    this.renderGame();
  }

  renderGame() {
    let wrongParticles = this.particles.filter(p => p !== this.current.particle);
    wrongParticles.sort(() => 0.5 - Math.random());
    let options = [this.current.particle, ...wrongParticles.slice(0, 4)];
    options.sort(() => 0.5 - Math.random());

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS</h1>
        <p class="nexus-subtitle">Yörünge ${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      <div class="nexus-game-area" id="nexus-board">
        
        <div class="nexus-display-container">
           <div class="nexus-question" id="nx-q">${this.current.tr}</div>
           <div class="nexus-feedback-area" id="nx-feedback">
              <div class="nexus-phrase-result" id="nx-phrase-res"></div>
              <div class="nexus-example-text" id="nx-ex-res"></div>
           </div>
        </div>

        <svg class="nexus-connection-line" id="nexus-svg">
           <line id="nexus-line" x1="0" y1="0" x2="0" y2="0" class="nexus-line"></line>
        </svg>

        <div class="nexus-core-node" id="nexus-core" onclick="window.nexusMod.playVerbAudio()">
          ${this.current.verb}
        </div>

        ${options.map((opt, i) => {
           return `<div class="nexus-particle-node" onclick="window.nexusMod.checkAnswer('${opt}', this)">${opt}</div>`;
        }).join('')}

      </div>
      <div class="nexus-hud">
        <div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    
    setTimeout(() => this._positionNodes(), 50);
    this._createStars();
    if(this.app.audio) this.app.audio.play('pop');
  }

  _positionNodes() {
    const board = document.getElementById('nexus-board');
    const core = document.getElementById('nexus-core');
    if (!board || !core) return;
    const boardRect = board.getBoundingClientRect();
    
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height * 0.6; // Core'u biraz aşağı çektik
    
    const particles = document.querySelectorAll('.nexus-particle-node');
    particles.forEach((p, i) => {
       const angle = (i / particles.length) * Math.PI * 2 - Math.PI/2;
       const radius = window.innerWidth < 600 ? 110 : 160;
       const x = centerX + Math.cos(angle) * radius - p.offsetWidth/2;
       const y = centerY + Math.sin(angle) * radius - p.offsetHeight/2;
       p.style.left = `${x}px`;
       p.style.top = `${y}px`;
    });
  }

  playVerbAudio() {
    if(this.app.speakWord) this.app.speakWord(this.current.verb);
    const core = document.getElementById('nexus-core');
    if (core) {
      core.classList.add('active');
      setTimeout(() => core.classList.remove('active'), 300);
    }
  }

  checkAnswer(particle, el) {
    if (this.locked) return;
    this.locked = true;
    
    const isCorrect = particle === this.current.particle;
    const core = document.getElementById('nexus-core');
    const line = document.getElementById('nexus-line');
    
    if (!core || !line) return;

    const coreRect = core.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
    
    line.setAttribute('x1', coreRect.left + coreRect.width/2 - boardRect.left);
    line.setAttribute('y1', coreRect.top + coreRect.height/2 - boardRect.top);
    line.setAttribute('x2', elRect.left + elRect.width/2 - boardRect.left);
    line.setAttribute('y2', elRect.top + elRect.height/2 - boardRect.top);
    
    line.classList.add('active');
    
    if (isCorrect) {
      el.classList.add('correct');
      line.classList.add('correct');
      core.classList.add('active');
      if(this.app.audio) this.app.audio.play('correct');
      if(this.app.speakWord) this.app.speakWord(this.current.phrase);
      
      this.score += 20 + (this.combo * 5);
      this.combo++;
      
      const scEl = document.getElementById('nx-score');
      const cbEl = document.getElementById('nx-combo');
      if (scEl) scEl.innerText = this.score;
      if (cbEl) cbEl.innerText = this.combo;
      
      if(this.app.state) {
         let xp = this.app.state.get('xp') || 0;
         this.app.state.update({ xp: xp + 20 + (this.combo * 5) });
         if(this.app._renderHeader) this.app._renderHeader();
      }
      
      // UX OPTIMIZATION: Fade out question, show result
      const qEl = document.getElementById('nx-q');
      const feedbackArea = document.getElementById('nx-feedback');
      const phraseRes = document.getElementById('nx-phrase-res');
      const exRes = document.getElementById('nx-ex-res');

      if (qEl) qEl.style.opacity = '0';
      setTimeout(() => {
          if (qEl) qEl.style.display = 'none';
          if (feedbackArea) feedbackArea.style.display = 'flex';
          if (phraseRes) phraseRes.innerText = this.current.phrase;
          if (exRes) exRes.innerText = `"${this.current.ex}"`;
      }, 300);
      
      setTimeout(() => {
        this.locked = false;
        this.currentIndex++;
        this.nextWord();
      }, 2800);
      
    } else {
      el.classList.add('wrong');
      if(this.app.audio) this.app.audio.play('error');
      this.combo = 0;
      const cbEl = document.getElementById('nx-combo');
      if (cbEl) cbEl.innerText = this.combo;
      setTimeout(() => {
        el.classList.remove('wrong');
        line.classList.remove('active');
        this.locked = false;
      }, 800);
    }
  }

  _showResults() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">KOZMİK BAĞ TAMAMLANDI</h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:5rem; margin-bottom:20px; filter: drop-shadow(0 0 20px var(--cyan));">🌟</div>
        <h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">Galaktik Ustalık!</h2>
        <p style="color:var(--text-2); font-size:1.3rem; margin-bottom:35px;">Kazanılan Toplam Enerji: <strong style="color:var(--cyan)">+${this.score} XP</strong></p>
        <div style="display:flex; gap:20px; justify-content:center;">
           <button class="btn btn-primary" style="padding: 12px 30px;" onclick="window.nexusMod.start()">YENİDEN BAĞLAN</button>
           <button class="btn btn-ghost" style="padding: 12px 30px;" onclick="app.navigate('home')">ANA MERKEZ</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars();
    if (typeof confetti === 'function') confetti({ 
        particleCount: 200, 
        spread: 90, 
        origin: {y: 0.6},
        colors: ['#00d4ff', '#7c3aed', '#10b981']
    });
  }
}
