class NexusMode {
  constructor(app) {
    this.app = app;
    this.root = null;
    
    // Core data
    this.allPhrasals = [];
    this.allVerbs = new Set();
    this.allParticles = new Set();
    
    // Network Mode Data
    this.constellations = [];
    
    // Game State
    this.queue = [];
    this.current = null;
    this.score = 0;
    this.combo = 0;
    this.locked = false;
    this.mode = null; // 'network', 'cipher', 'synthesis'
    
    // Cipher Mode State
    this.cipherVerbs = [];
    this.cipherParticles = [];
    this.cipherVerbIdx = 0;
    this.cipherParticleIdx = 0;
    
    // Synthesis Mode State
    this.synthSelected = { verb: null, particle: null, verbId: null, particleId: null };
    this.synthHintTimer = null;

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
    this._clearSynthTimer();
    if (this.root) this.root.innerHTML = '';
  }

  _clearSynthTimer() {
    if (this.synthHintTimer) {
      clearTimeout(this.synthHintTimer);
      this.synthHintTimer = null;
    }
  }

  _showIntro() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">v5.0</span></h1>
        <p class="nexus-subtitle">Evrensel Dil Öğrenim Merkezi</p>
      </div>
      
      <div class="nexus-mode-selector">
        <div class="nexus-mode-card" onclick="window.nexusMod.startNetwork()" style="--card-color: #8b5cf6;">
          <div class="nm-icon">🌌</div>
          <div class="nm-title">Semantik Ağ</div>
          <div class="nm-desc">Merkez fiilin etrafına doğru edatları bağlayarak anlam haritaları kur. Görsel hafızanı güçlendir.</div>
        </div>
        
        <div class="nexus-mode-card" onclick="window.nexusMod.startCipher()" style="--card-color: #10b981;">
          <div class="nm-icon">🔐</div>
          <div class="nm-title">Kuantum Şifre</div>
          <div class="nm-desc">Bağlama uygun fiil ve edat kombinasyonunu çevirmeli şifre paneliyle (Cryptex) kırarak cümleyi çöz.</div>
        </div>

        <div class="nexus-mode-card" onclick="window.nexusMod.startSynthesis()" style="--card-color: #ec4899;">
          <div class="nm-icon">🧬</div>
          <div class="nm-title">Kognitif Sentez</div>
          <div class="nm-desc">Bölünmüş kelimeleri reaktörde birleştirerek yeni anlamlar üret. Yapılandırmacı öğrenim.</div>
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

  // ==========================================
  // SYNTHESIS MODE (Kognitif Sentez - v5.0)
  // ==========================================

  startSynthesis() {
    this.mode = 'synthesis';
    const hasEx = this.allPhrasals.filter(p => p.ex);
    const shuffled = [...hasEx].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 10);
    
    if(this.queue.length === 0) {
       if (typeof UI !== 'undefined' && UI.toast) UI.toast('Sentezlenecek kelime bulunamadı!');
       return;
    }
    
    this.score = 0;
    this.combo = 0;
    this.currentIndex = 0;
    this.nextSynthesisWord();
  }

  nextSynthesisWord() {
    this._clearSynthTimer();
    if (this.currentIndex >= this.queue.length) {
      this._showResults('Sentez Döngüsü Tamamlandı');
      return;
    }
    this.current = this.queue[this.currentIndex];
    this.locked = false;
    this.synthSelected = { verb: null, particle: null, verbId: null, particleId: null };
    
    // Rastgele 3 yanlış fiil, 3 yanlış edat ekle
    let verbs = [this.current.verb];
    let otherVerbs = this.allVerbs.filter(v => v !== this.current.verb).sort(() => 0.5 - Math.random()).slice(0, 3);
    verbs.push(...otherVerbs); verbs.sort(() => 0.5 - Math.random());
    
    let parts = [this.current.particle];
    let otherParts = this.allParticles.filter(p => p !== this.current.particle).sort(() => 0.5 - Math.random()).slice(0, 3);
    parts.push(...otherParts); parts.sort(() => 0.5 - Math.random());

    this.currentSynthPool = { verbs, parts };
    this._renderSynthesis();

    // v5.1: 10 saniye sonra fiili otomatik getir
    this.synthHintTimer = setTimeout(() => {
      if (this.mode === 'synthesis' && !this.locked && !this.synthSelected.verb) {
        this._autoFillVerb();
      }
    }, 10000);
  }

  _autoFillVerb() {
    const correctVerb = this.current.verb;
    // Pool içindeki doğru id'yi bul
    const idx = this.currentSynthPool.verbs.indexOf(correctVerb);
    if (idx !== -1) {
      const orbId = `sorb-v-${idx}`;
      this.selectSynthOrb('verb', correctVerb, orbId, true);
      if (typeof UI !== 'undefined' && UI.toast) UI.toast('Sistem yardımı: Fiil senkronize edildi.');
    }
  }

  _renderSynthesis() {
    const regex = new RegExp(`\\b${this.current.phrase.replace(' ', '\\s+')}\\b`, 'gi');
    let displayEx = this.current.ex.replace(regex, '<span class="synth-blank"></span>');
    if (displayEx === this.current.ex) {
        const vRegex = new RegExp(`\\b${this.current.verb}[a-z]*\\b`, 'gi');
        const pRegex = new RegExp(`\\b${this.current.particle}\\b`, 'gi');
        displayEx = displayEx.replace(vRegex, '___').replace(pRegex, '___');
    }

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">SENTEZ MODU</span></h1>
        <p class="nexus-subtitle">Füzyon Aşaması ${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      
      <div class="synth-game-container animate-in">
         <div style="font-size:1.1rem; color:var(--text-3); margin-bottom:10px; font-weight:700;">HEDEF ANLAM: <span style="color:var(--cyan)">${this.current.tr}</span></div>
         <div class="synth-sentence" id="synth-sentence">"${displayEx}"</div>
         
         <div class="synth-reactor" id="synth-reactor">
            <div class="synth-slot" id="slot-verb" onclick="window.nexusMod.clearSynthSlot('verb')">FİİL</div>
            <div class="synth-plus">+</div>
            <div class="synth-slot" id="slot-particle" onclick="window.nexusMod.clearSynthSlot('particle')">EDAT</div>
         </div>

         <div class="synth-pool">
            ${this.currentSynthPool.verbs.map((v, i) => `<div class="synth-orb verb" id="sorb-v-${i}" onclick="window.nexusMod.selectSynthOrb('verb', '${v}', 'sorb-v-${i}')">${v}</div>`).join('')}
            ${this.currentSynthPool.parts.map((p, i) => `<div class="synth-orb particle" id="sorb-p-${i}" onclick="window.nexusMod.selectSynthOrb('particle', '${p}', 'sorb-p-${i}')">${p}</div>`).join('')}
         </div>
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars(30);
  }

  selectSynthOrb(type, word, orbId, isAuto = false) {
      if (this.locked) return;
      if (this.synthSelected[type] !== null) return; // Slot already filled
      
      if (!isAuto && type === 'verb') this._clearSynthTimer();
      if(this.app.audio) this.app.audio.play('tick');
      
      this.synthSelected[type] = word;
      this.synthSelected[type+'Id'] = orbId;
      
      const orb = document.getElementById(orbId);
      if (orb) orb.classList.add('used');
      
      const slot = document.getElementById(`slot-${type}`);
      if (slot) {
        slot.innerText = word;
        slot.classList.add('filled', type);
      }

      if (this.synthSelected.verb && this.synthSelected.particle) {
          this.locked = true;
          this._clearSynthTimer();
          setTimeout(() => this.checkSynthesis(), 400);
      }
  }

  clearSynthSlot(type) {
      if (this.locked || !this.synthSelected[type]) return;
      if(this.app.audio) this.app.audio.play('pop');
      
      const orbId = this.synthSelected[type+'Id'];
      const orb = document.getElementById(orbId);
      if (orb) orb.classList.remove('used');
      
      this.synthSelected[type] = null;
      this.synthSelected[type+'Id'] = null;
      
      const slot = document.getElementById(`slot-${type}`);
      if (slot) {
        slot.innerText = type === 'verb' ? 'FİİL' : 'EDAT';
        slot.classList.remove('filled', type);
      }
  }

  checkSynthesis() {
      const isVerbCorrect = this.synthSelected.verb === this.current.verb;
      const isParticleCorrect = this.synthSelected.particle === this.current.particle;
      
      const sVerb = document.getElementById('slot-verb');
      const sPart = document.getElementById('slot-particle');
      const reactor = document.getElementById('synth-reactor');

      if (isVerbCorrect && isParticleCorrect) {
          if(this.app.audio) this.app.audio.play('correct');
          
          if (sVerb) sVerb.classList.add('success');
          if (sPart) sPart.classList.add('success');
          if (reactor) {
            reactor.style.borderColor = '#10b981';
            reactor.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 80%)';
          }
          
          const sentBox = document.getElementById('synth-sentence');
          if (sentBox) {
            sentBox.innerHTML = `"${this.current.ex}" <div style="color:#ec4899; margin-top:20px; font-size:1.5rem; font-weight:800; letter-spacing:3px;">FÜZYON BAŞARILI!</div>`;
            sentBox.style.color = '#10b981';
          }
          
          if(this.app.speakWord) this.app.speakWord(this.current.ex);
          
          this.score += 50 + (this.combo * 10);
          this.combo++;
          this._updateHUD();
          
          setTimeout(() => {
              this.currentIndex++;
              this.nextSynthesisWord();
          }, 3500);

      } else {
          if(this.app.audio) this.app.audio.play('error');
          
          if (sVerb) sVerb.classList.add('error');
          if (sPart) sPart.classList.add('error');
          
          this.combo = 0;
          this._updateHUD();
          
          setTimeout(() => {
              if (sVerb) sVerb.classList.remove('error');
              if (sPart) sPart.classList.remove('error');
              
              if (this.synthSelected.verbId) {
                const ov = document.getElementById(this.synthSelected.verbId);
                if (ov) ov.classList.remove('used');
              }
              if (this.synthSelected.particleId) {
                const op = document.getElementById(this.synthSelected.particleId);
                if (op) op.classList.remove('used');
              }
              
              this.synthSelected = { verb: null, particle: null, verbId: null, particleId: null };
              if (sVerb) {
                sVerb.innerText = 'FİİL'; sVerb.classList.remove('filled', 'verb');
              }
              if (sPart) {
                sPart.innerText = 'EDAT'; sPart.classList.remove('filled', 'particle');
              }
              
              this.locked = false;
          }, 800);
      }
  }


  // ==========================================
  // NETWORK MODE
  // ==========================================

  startNetwork() {
    this.mode = 'network';
    const shuffled = [...this.constellations].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 5); 
    if(this.queue.length === 0) {
       if (typeof UI !== 'undefined' && UI.toast) UI.toast('Takımyıldızı oluşturacak yeterli kelime bulunamadı!');
       return;
    }
    this.score = 0;
    this.combo = 0;
    this.currentIndex = 0;
    this.nextNetworkWord();
  }

  nextNetworkWord() {
    if (this.currentIndex >= this.queue.length) {
      this._showResults('Ağ Bütünleştirildi');
      return;
    }
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
        <h1 class="nexus-title">NEXUS <span class="v5-badge" style="background:#8b5cf6">AĞ MODU</span></h1>
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

  checkNetworkAnswer(particle, el) {
    if (this.locked) return;
    if (el.classList.contains('solved')) return;
    
    const task = this.current.tasks[this.currentTaskIndex];
    if (particle === task.particle) {
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
             if (prog) prog.innerText = `Düğüm ${this.currentTaskIndex + 1} / ${this.current.tasks.length}`;
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
            <div style="font-size:2.5rem; margin-bottom:10px; filter: drop-shadow(0 0 10px #8b5cf6);">🌌</div>
            <div class="nexus-phrase-result" style="color:#8b5cf6">Ağ Tamamlandı!</div>
            <div class="nexus-example-text" style="color:#fff">+100 XP Ağ Bonusu</div>
          `;
      }
      setTimeout(() => {
         this.currentIndex++;
         this.nextNetworkWord();
      }, 3500);
  }


  // ==========================================
  // CIPHER MODE
  // ==========================================

  startCipher() {
    this.mode = 'cipher';
    const hasEx = this.allPhrasals.filter(p => p.ex);
    const shuffled = [...hasEx].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 10);
    
    if(this.queue.length === 0) {
       if (typeof UI !== 'undefined' && UI.toast) UI.toast('Şifrelenecek kelime bulunamadı!');
       return;
    }
    
    this.score = 0;
    this.combo = 0;
    this.currentIndex = 0;
    this.nextCipherWord();
  }

  nextCipherWord() {
    if (this.currentIndex >= this.queue.length) {
      this._showResults('Tüm Şifreler Kırıldı');
      return;
    }
    this.current = this.queue[this.currentIndex];
    this.locked = false;
    
    this.cipherVerbs = [this.current.verb];
    let otherVerbs = this.allVerbs.filter(v => v !== this.current.verb).sort(() => 0.5 - Math.random()).slice(0, 4);
    this.cipherVerbs.push(...otherVerbs);
    this.cipherVerbs.sort(() => 0.5 - Math.random());
    this.cipherVerbIdx = Math.floor(Math.random() * this.cipherVerbs.length); 
    
    this.cipherParticles = [this.current.particle];
    let otherParts = this.allParticles.filter(p => p !== this.current.particle).sort(() => 0.5 - Math.random()).slice(0, 4);
    this.cipherParticles.push(...otherParts);
    this.cipherParticles.sort(() => 0.5 - Math.random());
    this.cipherParticleIdx = Math.floor(Math.random() * this.cipherParticles.length);

    this._renderCipher();
  }

  _renderCipher() {
    let displayEx = this.current.ex;
    const fullPhraseRegex = new RegExp(this.current.phrase.replace(' ', '\\s+'), 'gi');
    displayEx = displayEx.replace(fullPhraseRegex, '<span class="cipher-blank">[ ? ]</span>');
    
    if (!displayEx.includes('cipher-blank')) {
        const vRegex = new RegExp(`\\b${this.current.verb}[a-z]*\\b`, 'gi');
        const pRegex = new RegExp(`\\b${this.current.particle}\\b`, 'gi');
        displayEx = displayEx.replace(vRegex, '___').replace(pRegex, '___');
    }

    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge" style="background:#10b981">ŞİFRE MODU</span></h1>
        <p class="nexus-subtitle">Kilit ${this.currentIndex + 1} / ${this.queue.length}</p>
      </div>
      
      <div class="cipher-sentence-box" id="cipher-sentence">
        "${displayEx}"
        <div class="cipher-hint">Anlamı: ${this.current.tr}</div>
      </div>

      <div class="cipher-lock-mechanism">
        <div class="cipher-dial">
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('verb', -1)">▲</button>
          <div class="cipher-window" id="cipher-w-verb">${this.cipherVerbs[this.cipherVerbIdx]}</div>
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('verb', 1)">▼</button>
        </div>
        
        <div style="font-size:2.2rem; color:var(--text-3); font-weight:800;">+</div>

        <div class="cipher-dial">
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('particle', -1)">▲</button>
          <div class="cipher-window" id="cipher-w-particle">${this.cipherParticles[this.cipherParticleIdx]}</div>
          <button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('particle', 1)">▼</button>
        </div>
      </div>
      
      <button class="cipher-engage-btn" id="cipher-engage" onclick="window.nexusMod.checkCipher()">ŞİFREYİ ÇÖZ</button>

      <div class="nexus-hud">
        <div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars(40);
  }

  scrollDial(type, dir) {
     if (this.locked) return;
     if(this.app.audio) this.app.audio.play('tick'); 
     
     if (type === 'verb') {
         this.cipherVerbIdx += dir;
         if (this.cipherVerbIdx < 0) this.cipherVerbIdx = this.cipherVerbs.length - 1;
         if (this.cipherVerbIdx >= this.cipherVerbs.length) this.cipherVerbIdx = 0;
         const w = document.getElementById('cipher-w-verb');
         w.innerText = this.cipherVerbs[this.cipherVerbIdx];
         w.classList.add('glow');
         setTimeout(() => w.classList.remove('glow'), 200);
     } else {
         this.cipherParticleIdx += dir;
         if (this.cipherParticleIdx < 0) this.cipherParticleIdx = this.cipherParticles.length - 1;
         if (this.cipherParticleIdx >= this.cipherParticles.length) this.cipherParticleIdx = 0;
         const w = document.getElementById('cipher-w-particle');
         w.innerText = this.cipherParticles[this.cipherParticleIdx];
         w.classList.add('glow');
         setTimeout(() => w.classList.remove('glow'), 200);
     }
  }

  checkCipher() {
      if (this.locked) return;
      
      const selectedVerb = this.cipherVerbs[this.cipherVerbIdx];
      const selectedParticle = this.cipherParticles[this.cipherParticleIdx];
      
      const isVerbCorrect = selectedVerb === this.current.verb;
      const isParticleCorrect = selectedParticle === this.current.particle;
      
      const wv = document.getElementById('cipher-w-verb');
      const wp = document.getElementById('cipher-w-particle');
      
      if (isVerbCorrect && isParticleCorrect) {
          this.locked = true;
          if(this.app.audio) this.app.audio.play('correct');
          
          wv.classList.add('correct');
          wp.classList.add('correct');
          
          const sentBox = document.getElementById('cipher-sentence');
          sentBox.innerHTML = `"${this.current.ex}" <div style="color:#10b981; margin-top:15px; font-size:1.3rem; font-weight:800; text-transform:uppercase; letter-spacing:2px;">🔐 ŞİFRE KIRILDI!</div>`;
          sentBox.style.borderColor = '#10b981';
          sentBox.style.background = 'rgba(16, 185, 129, 0.15)';
          sentBox.style.transform = 'scale(1.05)';
          
          if(this.app.speakWord) this.app.speakWord(this.current.ex);
          
          this.score += 40 + (this.combo * 5);
          this.combo++;
          this._updateHUD();
          
          setTimeout(() => {
              this.currentIndex++;
              this.nextCipherWord();
          }, 3500);
          
      } else {
          if(this.app.audio) this.app.audio.play('error');
          if (!isVerbCorrect) { wv.classList.add('wrong'); setTimeout(() => wv.classList.remove('wrong'), 500); }
          if (!isParticleCorrect) { wp.classList.add('wrong'); setTimeout(() => wp.classList.remove('wrong'), 500); }
          
          this.combo = 0;
          this._updateHUD();
      }
  }

  // ==========================================
  // SHARED UTILS
  // ==========================================

  playVerbAudio(word) {
    if(this.app.speakWord) this.app.speakWord(word);
    const core = document.getElementById('nexus-core');
    if (core) {
      core.classList.add('active');
      setTimeout(() => core.classList.remove('active'), 300);
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

  _showResults(title) {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">BAŞARILI</span></h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px var(--cyan);">🏆</div>
        <h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">${title}!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazanılan Toplam XP: <strong style="color:var(--cyan)">+${this.score}</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.init(window.nexusMod.root)">MOD SEÇİMİ</button>
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
        colors: ['#00d4ff', '#7c3aed', '#ec4899', '#10b981']
    });
  }
}
