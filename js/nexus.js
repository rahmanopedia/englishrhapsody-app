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
    
    // v2.0 Mechanics
    this.energy = 100;
    this.orbitAngles = [];
    this.orbitSpeeds = [];
    this.rafId = null;
    this.lastTime = 0;

    this._loadData();
    
    this._resizeHandler = () => { if (this.current && !this.locked) this._initOrbits(); };
    this._mouseHandler = (e) => this._parallax(e);
    
    window.addEventListener('resize', this._resizeHandler);
    window.addEventListener('mousemove', this._mouseHandler);
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
    window.removeEventListener('resize', this._resizeHandler);
    window.removeEventListener('mousemove', this._mouseHandler);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.root) this.root.innerHTML = '';
  }

  _parallax(e) {
    const board = document.getElementById('nexus-board');
    if (!board) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    board.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  }

  _showIntro() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v2-badge">v2.0</span></h1>
        <p class="nexus-subtitle">Dinamik Yörüngeler & Enerji Matrisi</p>
      </div>
      <div class="nexus-game-area">
        <div class="nexus-intro-card">
          <p class="nexus-intro-text">
            Phrasal Verb'leri kozmik ağlarda hareket halindeyken bağla. <br>
            <strong>Hızlı ol:</strong> Enerjin tükenmeden doğru edatı yakala, kombo yap, hiper enerji kazan.
          </p>
          <button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.start()">OTURUMU BAŞLAT</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars(80);
  }

  _createStars(count) {
    const starContainer = document.getElementById('nexus-stars');
    if (!starContainer) return;
    let stars = '';
    for(let i=0; i<count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = Math.random() * 3 + 2;
      stars += `<div class="nexus-star" style="left:${x}%; top:${y}%; width:2px; height:2px; --dur:${dur}s"></div>`;
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
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.currentIndex >= this.queue.length) {
      this._showResults();
      return;
    }
    this.current = this.queue[this.currentIndex];
    this.energy = 100;
    this.locked = false;
    this.renderGame();
  }

  renderGame() {
    let wrongParticles = this.particles.filter(p => p !== this.current.particle);
    wrongParticles.sort(() => 0.5 - Math.random());
    let options = [this.current.particle, ...wrongParticles.slice(0, 4)];
    options.sort(() => 0.5 - Math.random());

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v2-badge">v2.0</span></h1>
        <p class="nexus-subtitle">Sektör ${this.currentIndex + 1} / ${this.queue.length}</p>
        <div class="nexus-energy-container">
           <div class="nexus-energy-fill" id="nx-energy"></div>
        </div>
      </div>
      
      <div class="nexus-display-container">
         <div class="nexus-question" id="nx-q">${this.current.tr}</div>
         <div class="nexus-feedback-area" id="nx-feedback">
            <div class="nexus-phrase-result" id="nx-phrase-res"></div>
            <div class="nexus-example-text" id="nx-ex-res"></div>
         </div>
      </div>

      <div class="nexus-game-area" id="nexus-board">
        <svg class="nexus-connection-line" id="nexus-svg">
           <line id="nexus-line" x1="0" y1="0" x2="0" y2="0" class="nexus-line"></line>
        </svg>

        <div class="nexus-core-node" id="nexus-core" onclick="window.nexusMod.playVerbAudio()">
          ${this.current.verb}
        </div>

        ${options.map((opt, i) => {
           return `<div class="nexus-particle-node" data-idx="${i}" onclick="window.nexusMod.checkAnswer('${opt}', this)">${opt}</div>`;
        }).join('')}
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    
    setTimeout(() => {
        this._initOrbits();
        this.lastTime = performance.now();
        this._loop(this.lastTime);
    }, 30);
    this._createStars(50);
    if(this.app.audio) this.app.audio.play('pop');
  }

  _initOrbits() {
    const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
    const core = document.getElementById('nexus-core');
    
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height / 2;
    
    core.style.left = `${centerX - core.offsetWidth/2}px`;
    core.style.top = `${centerY - core.offsetHeight/2}px`;

    const particles = document.querySelectorAll('.nexus-particle-node');
    this.orbitAngles = [];
    this.orbitSpeeds = [];
    
    const baseRadius = Math.min(boardRect.width, boardRect.height) * 0.35;
    this.orbitRadius = Math.max(baseRadius, window.innerWidth < 600 ? 90 : 130);

    particles.forEach((p, i) => {
       const initialAngle = (i / particles.length) * Math.PI * 2;
       this.orbitAngles.push(initialAngle);
       // Rastgele ama tutarlı hızlar (bazıları saat yönünde, bazıları tersi)
       const speed = (Math.random() * 0.0005 + 0.0008) * (i % 2 === 0 ? 1 : -1);
       this.orbitSpeeds.push(speed);
    });
  }

  _loop(time) {
    if (this.locked) return; // Doğru cevapta dönmeyi durdur
    this.rafId = requestAnimationFrame((t) => this._loop(t));
    
    const dt = time - this.lastTime;
    this.lastTime = time;

    // Enerji tükenmesi (Saniyede yaklaşık %0.5 azalır)
    this.energy -= dt * 0.005;
    if (this.energy <= 0) this.energy = 0;
    
    const energyBar = document.getElementById('nx-energy');
    if (energyBar) {
        energyBar.style.width = `${this.energy}%`;
        if (this.energy < 30) energyBar.classList.add('warning');
        else energyBar.classList.remove('warning');
    }

    // Yörünge Hareketi
    const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height / 2;
    const particles = document.querySelectorAll('.nexus-particle-node');

    particles.forEach((p, i) => {
       this.orbitAngles[i] += this.orbitSpeeds[i] * dt;
       const angle = this.orbitAngles[i];
       const x = centerX + Math.cos(angle) * this.orbitRadius - p.offsetWidth/2;
       const y = centerY + Math.sin(angle) * this.orbitRadius - p.offsetHeight/2;
       p.style.transform = `translate(${x}px, ${y}px)`;
       // Top ve left sıfırlanıp transform ile hareket ettiriliyor (Performans için)
       p.style.left = '0';
       p.style.top = '0';
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
    
    const isCorrect = particle === this.current.particle;
    
    if (isCorrect) {
      this.locked = true; // Yörüngeyi dondur
      if (this.rafId) cancelAnimationFrame(this.rafId);

      const core = document.getElementById('nexus-core');
      const line = document.getElementById('nexus-line');
      
      const coreRect = core.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
      
      line.setAttribute('x1', coreRect.left + coreRect.width/2 - boardRect.left);
      line.setAttribute('y1', coreRect.top + coreRect.height/2 - boardRect.top);
      line.setAttribute('x2', elRect.left + elRect.width/2 - boardRect.left);
      line.setAttribute('y2', elRect.top + elRect.height/2 - boardRect.top);
      
      line.classList.add('active', 'correct');
      el.classList.add('correct');
      core.classList.add('active');
      
      if(this.app.audio) this.app.audio.play('correct');
      if(this.app.speakWord) this.app.speakWord(this.current.phrase);
      
      // Enerjiye bağlı hiper bonus
      const energyBonus = Math.floor(this.energy * 0.2);
      this.score += 25 + (this.combo * 5) + energyBonus;
      this.combo++;
      
      document.getElementById('nx-score').innerText = this.score;
      document.getElementById('nx-combo').innerText = this.combo;
      
      if(this.app.state) {
         let xp = this.app.state.get('xp') || 0;
         this.app.state.update({ xp: xp + 25 + (this.combo * 5) + energyBonus });
         if(this.app._renderHeader) this.app._renderHeader();
      }
      
      const qEl = document.getElementById('nx-q');
      const feedbackArea = document.getElementById('nx-feedback');
      if (qEl) qEl.style.opacity = '0';
      
      setTimeout(() => {
          if (qEl) qEl.style.display = 'none';
          if (feedbackArea) {
              feedbackArea.style.display = 'flex';
              document.getElementById('nx-phrase-res').innerText = this.current.phrase;
              document.getElementById('nx-ex-res').innerText = `"${this.current.ex}"`;
          }
      }, 300);
      
      setTimeout(() => {
        this.nextWord();
      }, 2500);
      
    } else {
      // Yanlış cevapta ceza
      el.classList.add('wrong');
      if(this.app.audio) this.app.audio.play('error');
      this.combo = 0;
      this.energy -= 15; // Zaman cezası
      if(this.energy < 0) this.energy = 0;
      
      document.getElementById('nx-combo').innerText = this.combo;
      setTimeout(() => {
        el.classList.remove('wrong');
      }, 500);
    }
  }

  _showResults() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v2-badge">v2.0</span></h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px var(--cyan);">🚀</div>
        <h2 style="color:#fff; font-size:2rem; margin-bottom:10px; font-weight:800;">Hiperuzay Atlayışı Başarılı!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazanılan Toplam XP: <strong style="color:var(--cyan)">+${this.score}</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.start()">YENİDEN BAĞLAN</button>
           <button class="btn btn-ghost" style="padding: 16px 30px; font-size: 1.1rem;" onclick="app.navigate('home')">ANA MERKEZ</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars(100);
    if (typeof confetti === 'function') confetti({ 
        particleCount: 200, 
        spread: 90, 
        origin: {y: 0.6},
        colors: ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b']
    });
  }
}
