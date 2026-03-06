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
    for(let i=0; i<50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3 + 1;
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
        <p class="nexus-subtitle">${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      <div class="nexus-game-area" id="nexus-board">
        <div class="nexus-question">${this.current.tr}</div>
        
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
    const centerY = boardRect.height / 2;
    
    const particles = document.querySelectorAll('.nexus-particle-node');
    particles.forEach((p, i) => {
       const angle = (i / particles.length) * Math.PI * 2 - Math.PI/2;
       const radius = window.innerWidth < 600 ? 120 : 180;
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
      
      const qEl = document.querySelector('.nexus-question');
      if (qEl) {
        qEl.innerHTML = `
          <div style="color:#10b981; font-size:2rem; margin-bottom:10px;">${this.current.phrase}</div>
          <div style="font-size:1.1rem; color:var(--text-2); font-style:italic;">"${this.current.ex}"</div>
        `;
      }
      
      setTimeout(() => {
        this.locked = false;
        this.currentIndex++;
        this.nextWord();
      }, 2500);
      
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
        <h1 class="nexus-title">BAĞLANTI TAMAMLANDI</h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4rem; margin-bottom:20px;">🎉</div>
        <h2 style="color:var(--text-1); font-size:2rem; margin-bottom:10px;">Harika İş Çıkardın!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazanılan XP: <strong style="color:var(--cyan)">+${this.score}</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary" onclick="window.nexusMod.start()">Tekrar Oyna</button>
           <button class="btn btn-ghost" onclick="app.navigate('home')">Ana Menü</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars();
    if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: {y: 0.6} });
  }
}
