class NexusMode {
  constructor(app) {
    this.app = app;
    this.root = null;
    this.constellations = [];
    this.queue = [];
    this.current = null;
    this.score = 0;
    this.combo = 0;
    this.locked = false;
    this.allParticles = [];
    
    this._loadData();
    this._resizeHandler = () => { if (this.current) this._positionNodes(); };
    window.addEventListener('resize', this._resizeHandler);
  }

  _loadData() {
    let verbsMap = {};
    let allP = new Set();
    
    if (typeof PHRASE_DICT !== 'undefined') {
      for (const [phrase, data] of Object.entries(PHRASE_DICT)) {
        if (data.type === 'Phrasal Verb') {
          const parts = phrase.split(' ');
          const verb = parts[0];
          const particle = parts.slice(1).join(' ');
          
          allP.add(particle);
          
          if (!verbsMap[verb]) verbsMap[verb] = [];
          verbsMap[verb].push({ phrase, verb, particle, tr: data.tr, ex: data.ex });
        }
      }
    }
    
    this.allParticles = Array.from(allP);
    
    this.constellations = Object.keys(verbsMap)
      .filter(v => verbsMap[v].length >= 2)
      .map(v => {
          let tasks = verbsMap[v];
          // Çok kalabalık olmaması için bir takımyıldızını max 5 düğüm ile sınırla
          if (tasks.length > 5) {
              tasks.sort(() => 0.5 - Math.random());
              tasks = tasks.slice(0, 5);
          }
          return { verb: v, tasks: tasks };
      });
  }

  init(rootEl) {
    this.root = rootEl;
    this._showIntro();
  }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
    if (this.root) this.root.innerHTML = '';
  }

  _showIntro() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v3-badge">v3.0</span></h1>
        <p class="nexus-subtitle">Semantik Ağ Matrisi</p>
      </div>
      <div class="nexus-game-area">
        <div class="nexus-intro-card">
          <p class="nexus-intro-text">
            Phrasal Verb'leri tek tek ezberleme. <br><br>
            Merkezdeki fiilin etrafına doğru edatları bağlayarak <strong>anlam ağları (takımyıldızları)</strong> kur. Bağlamı gör, bağlantıyı kur, kalıcı öğren.
          </p>
          <button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.start()">AĞI BAŞLAT</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars(50);
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
    const shuffled = [...this.constellations].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 10); // 10 takımyıldızı
    if(this.queue.length === 0) {
       if (typeof UI !== 'undefined' && UI.toast) UI.toast('Takımyıldızı oluşturacak yeterli kelime bulunamadı!');
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
    this.locked = false;
    this.renderGame();
  }

  renderGame() {
    let tasks = [...this.current.tasks];
    tasks.sort(() => 0.5 - Math.random());
    this.current.tasks = tasks;
    this.currentTaskIndex = 0;

    // Gösterilecek nodları belirle (Doğrular + Sahteler)
    let particlesToShow = tasks.map(p => p.particle);
    let wrongParticles = this.allParticles.filter(p => !particlesToShow.includes(p));
    wrongParticles.sort(() => 0.5 - Math.random());
    
    // 3 adet tuzak edat ekle
    particlesToShow.push(...wrongParticles.slice(0, 3));
    particlesToShow.sort(() => 0.5 - Math.random());
    
    this.current.nodes = particlesToShow;

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v3-badge">v3.0</span></h1>
        <p class="nexus-subtitle">Takımyıldızı ${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      
      <div class="nexus-display-container">
         <div class="nexus-task-progress">Ağ Düğümü ${this.currentTaskIndex + 1} / ${this.current.tasks.length}</div>
         <div class="nexus-question" id="nx-q">${this.current.tasks[0].tr}</div>
         <div class="nexus-feedback-area" id="nx-feedback" style="display:none;">
            <div class="nexus-phrase-result" id="nx-phrase-res"></div>
            <div class="nexus-example-text" id="nx-ex-res"></div>
         </div>
      </div>

      <div class="nexus-game-area" id="nexus-board">
        <svg class="nexus-connection-line" id="nexus-svg"></svg>

        <div class="nexus-core-node" id="nexus-core" onclick="window.nexusMod.playVerbAudio()">
          ${this.current.verb}
        </div>

        ${this.current.nodes.map((opt, i) => {
           return `<div class="nexus-particle-node" id="particle-${i}" onclick="window.nexusMod.checkAnswer('${opt}', this)">${opt}</div>`;
        }).join('')}
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    
    setTimeout(() => this._positionNodes(), 30);
    this._createStars(40);
    if(this.app.audio) this.app.audio.play('pop');
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
       p.style.left = `${x}px`;
       p.style.top = `${y}px`;
    });

    this._redrawLines();
  }

  _redrawLines() {
       const core = document.getElementById('nexus-core');
       const svg = document.getElementById('nexus-svg');
       if (!core || !svg) return;
       
       svg.innerHTML = ''; // Eski çizgileri temizle
       
       const coreRect = core.getBoundingClientRect();
       const boardRect = document.getElementById('nexus-board').getBoundingClientRect();
       
       document.querySelectorAll('.nexus-particle-node.solved').forEach(p => {
             const pRect = p.getBoundingClientRect();
             const x1 = coreRect.left + coreRect.width/2 - boardRect.left;
             const y1 = coreRect.top + coreRect.height/2 - boardRect.top;
             const x2 = pRect.left + pRect.width/2 - boardRect.left;
             const y2 = pRect.top + pRect.height/2 - boardRect.top;
             
             const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
             newLine.setAttribute('x1', x1);
             newLine.setAttribute('y1', y1);
             newLine.setAttribute('x2', x2);
             newLine.setAttribute('y2', y2);
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
       newLine.setAttribute('x1', x1);
       newLine.setAttribute('y1', y1);
       newLine.setAttribute('x2', x2);
       newLine.setAttribute('y2', y2);
       newLine.setAttribute('class', 'nexus-line correct-line new-line');
       svg.appendChild(newLine);
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
    if (el.classList.contains('solved')) return;
    
    const task = this.current.tasks[this.currentTaskIndex];
    const isCorrect = particle === task.particle;
    
    if (isCorrect) {
       this.locked = true;
       el.classList.add('solved');
       
       this._drawLineTo(el);
       
       if(this.app.audio) this.app.audio.play('correct');
       if(this.app.speakWord) this.app.speakWord(task.phrase);
       
       this.score += 30 + (this.combo * 5);
       this.combo++;
       this._updateHUD();
       
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
          if (this.currentTaskIndex >= this.current.tasks.length) {
             this._completeConstellation();
          } else {
             if (qEl) {
                 qEl.style.display = 'block';
                 qEl.innerText = this.current.tasks[this.currentTaskIndex].tr;
             }
             if (feedbackArea) feedbackArea.style.display = 'none';
             const prog = document.querySelector('.nexus-task-progress');
             if (prog) prog.innerText = `Ağ Düğümü ${this.currentTaskIndex + 1} / ${this.current.tasks.length}`;
             this.locked = false;
          }
       }, 2500);

    } else {
       el.classList.add('wrong');
       if(this.app.audio) this.app.audio.play('error');
       this.combo = 0;
       this._updateHUD();
       setTimeout(() => { el.classList.remove('wrong'); }, 800);
    }
  }

  _completeConstellation() {
      if(this.app.audio) this.app.audio.play('level_up');
      
      const core = document.getElementById('nexus-core');
      if (core) core.classList.add('constellation-complete-glow');
      
      document.querySelectorAll('.correct-line').forEach(l => l.classList.add('pulse-line'));
      
      this.score += 100;
      this._updateHUD();
      
      const qEl = document.getElementById('nx-q');
      const feedbackArea = document.getElementById('nx-feedback');
      if (qEl) qEl.style.display = 'none';
      
      if (feedbackArea) {
          feedbackArea.style.display = 'flex';
          feedbackArea.innerHTML = `
            <div style="font-size:2.5rem; margin-bottom:10px; filter: drop-shadow(0 0 10px var(--cyan));">🌌</div>
            <div class="nexus-phrase-result" style="color:var(--cyan)">Takımyıldızı Tamamlandı!</div>
            <div class="nexus-example-text" style="color:#fff">+100 XP Ağ Bonusu</div>
          `;
      }
      
      setTimeout(() => {
         this.currentIndex++;
         this.nextWord();
      }, 3500);
  }

  _updateHUD() {
      const scEl = document.getElementById('nx-score');
      const cbEl = document.getElementById('nx-combo');
      if (scEl) scEl.innerText = this.score;
      if (cbEl) cbEl.innerText = this.combo;
      
      if(this.app.state) {
         let xp = this.app.state.get('xp') || 0;
         this.app.state.update({ xp: xp + 30 + (this.combo * 5) });
         if(this.app._renderHeader) this.app._renderHeader();
      }
  }

  _showResults() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v3-badge">v3.0</span></h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px var(--cyan);">🌐</div>
        <h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">Semantik Ağ Bütünleştirildi!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazanılan Toplam XP: <strong style="color:var(--cyan)">+${this.score}</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.start()">YENİ AĞ KUR</button>
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
        colors: ['#00d4ff', '#7c3aed', '#10b981']
    });
  }
}
