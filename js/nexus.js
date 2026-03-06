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
    
    // Synthesis Mode State
    this.synthSelected = { verb: null, particle: null, verbId: null, particleId: null };
    this.synthHintTimer = null;
    this.synthStreak = 0;

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
          allV.add(verb); allP.add(particle);
          let item = { phrase, verb, particle, tr: data.tr, ex: data.ex };
          this.allPhrasals.push(item);
          if (!verbsMap[verb]) verbsMap[verb] = [];
          verbsMap[verb].push(item);
        }
      }
    }
    this.allVerbs = Array.from(allV);
    this.allParticles = Array.from(allP);
    this.constellations = Object.keys(verbsMap).filter(v => verbsMap[v].length >= 2).map(v => {
          let tasks = verbsMap[v];
          if (tasks.length > 5) { tasks.sort(() => 0.5 - Math.random()); tasks = tasks.slice(0, 5); }
          return { verb: v, tasks: tasks };
      });
  }

  init(rootEl) { this.root = rootEl; this._showIntro(); }

  destroy() {
    window.removeEventListener('resize', this._resizeHandler);
    this._clearSynthTimer();
    if (this.root) this.root.innerHTML = '';
  }

  _clearSynthTimer() {
    if (this.synthHintTimer) { clearTimeout(this.synthHintTimer); this.synthHintTimer = null; }
  }

  _showIntro() {
    this.root.innerHTML = `
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">v5.2</span></h1>
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
          <div class="nm-desc">Bağlama uygun fiil ve edat kombinasyonunu çevirmeli şifre paneliyle cümleyi çöz.</div>
        </div>
        <div class="nexus-mode-card" onclick="window.nexusMod.startSynthesis()" style="--card-color: #ec4899;">
          <div class="nm-icon">🧬</div>
          <div class="nm-title">Kognitif Sentez</div>
          <div class="nm-desc">Bilişsel rezonans teknolojisiyle kelimeleri reaktörde birleştir. Yapılandırmacı öğrenim laboratuvarı.</div>
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
  // SYNTHESIS MODE (Kognitif Sentez - v5.2)
  // ==========================================

  startSynthesis() {
    this.mode = 'synthesis';
    const hasEx = this.allPhrasals.filter(p => p.ex);
    const shuffled = [...hasEx].sort(() => 0.5 - Math.random());
    this.queue = shuffled.slice(0, 10);
    this.score = 0; this.combo = 0; this.currentIndex = 0; this.synthStreak = 0;
    this.nextSynthesisWord();
  }

  nextSynthesisWord() {
    this._clearSynthTimer();
    if (this.currentIndex >= this.queue.length) { this._showResults('Sentez Döngüsü Tamamlandı'); return; }
    this.current = this.queue[this.currentIndex];
    this.locked = false;
    this.synthSelected = { verb: null, particle: null, verbId: null, particleId: null };
    
    let verbs = [this.current.verb];
    let otherVerbs = this.allVerbs.filter(v => v !== this.current.verb).sort(() => 0.5 - Math.random()).slice(0, 3);
    verbs.push(...otherVerbs); verbs.sort(() => 0.5 - Math.random());
    
    let parts = [this.current.particle];
    let otherParts = this.allParticles.filter(p => p !== this.current.particle).sort(() => 0.5 - Math.random()).slice(0, 3);
    parts.push(...otherParts); parts.sort(() => 0.5 - Math.random());

    this.currentSynthPool = { verbs, parts };
    this._renderSynthesis();

    // v5.1 & v5.2: Akıllı Yardımcı - 10 saniye sonra sadece doğru olanın parlamasını sağla (Rezonans)
    this.synthHintTimer = setTimeout(() => {
      if (this.mode === 'synthesis' && !this.locked && !this.synthSelected.verb) {
        this._triggerResonanceHint();
      }
    }, 10000);
  }

  _triggerResonanceHint() {
    const correctVerb = this.current.verb;
    const idx = this.currentSynthPool.verbs.indexOf(correctVerb);
    const orb = document.getElementById(`sorb-v-${idx}`);
    if (orb) {
        orb.classList.add('resonating-target');
        if (typeof UI !== 'undefined' && UI.toast) UI.toast('Bilişsel Rezonans: Doğru fiil saptandı.');
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
         <div style="font-size:1.1rem; color:var(--text-3); margin-bottom:10px; font-weight:700; letter-spacing:1px;">HEDEF ANLAM: <span style="color:var(--cyan)">${this.current.tr}</span></div>
         <div class="synth-sentence" id="synth-sentence">"${displayEx}"</div>
         <div class="synth-reactor" id="synth-reactor">
            <div class="synth-slot" id="slot-verb" onclick="window.nexusMod.clearSynthSlot('verb')">FİİL</div>
            <div style="font-size:2rem; font-weight:900; color:rgba(255,255,255,0.2);">+</div>
            <div class="synth-slot" id="slot-particle" onclick="window.nexusMod.clearSynthSlot('particle')">EDAT</div>
         </div>
         <div class="synth-pool">
            ${this.currentSynthPool.verbs.map((v, i) => `<div class="synth-orb verb" id="sorb-v-${i}" style="--float-dur:${3+Math.random()*2}s; --float-delay:${Math.random()*2}s" onclick="window.nexusMod.selectSynthOrb('verb', '${v}', 'sorb-v-${i}')">${v}</div>`).join('')}
            ${this.currentSynthPool.parts.map((p, i) => `<div class="synth-orb particle" id="sorb-p-${i}" style="--float-dur:${3+Math.random()*2}s; --float-delay:${Math.random()*2}s" onclick="window.nexusMod.selectSynthOrb('particle', '${p}', 'sorb-p-${i}')">${p}</div>`).join('')}
         </div>
      </div>
      <div class="nexus-hud"><div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div><div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div></div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `;
    this._createStars(30);
  }

  selectSynthOrb(type, word, orbId) {
      if (this.locked) return;
      if (this.synthSelected[type] !== null) return;
      
      if(this.app.audio) this.app.audio.play('tick');
      this.synthSelected[type] = word;
      this.synthSelected[type+'Id'] = orbId;
      document.getElementById(orbId).classList.add('used');
      
      const slot = document.getElementById(`slot-${type}`);
      slot.innerText = word;
      slot.classList.add('filled', type);

      // v5.2: Real-time resonance check for the verb
      if (type === 'verb') {
          this._clearSynthTimer();
          if (word === this.current.verb) {
              slot.classList.add('correct-pulse');
              document.getElementById('synth-reactor').classList.add('resonating');
              // Correct particle glows in pool
              const pIdx = this.currentSynthPool.parts.indexOf(this.current.particle);
              const pOrb = document.getElementById(`sorb-p-${pIdx}`);
              if (pOrb) pOrb.classList.add('resonating-target');
          }
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
      document.getElementById(orbId).classList.remove('used');
      if (type === 'verb') {
          document.getElementById('synth-reactor').classList.remove('resonating');
          document.querySelectorAll('.synth-orb.particle').forEach(o => o.classList.remove('resonating-target'));
      }
      this.synthSelected[type] = null;
      this.synthSelected[type+'Id'] = null;
      const slot = document.getElementById(`slot-${type}`);
      slot.innerText = type === 'verb' ? 'FİİL' : 'EDAT';
      slot.classList.remove('filled', type, 'correct-pulse');
  }

  checkSynthesis() {
      const isVerbCorrect = this.synthSelected.verb === this.current.verb;
      const isParticleCorrect = this.synthSelected.particle === this.current.particle;
      const sVerb = document.getElementById('slot-verb');
      const sPart = document.getElementById('slot-particle');
      const reactor = document.getElementById('synth-reactor');

      if (isVerbCorrect && isParticleCorrect) {
          if(this.app.audio) this.app.audio.play('correct');
          sVerb.classList.add('correct-pulse');
          sPart.classList.add('correct-pulse');
          reactor.style.borderColor = '#10b981';
          const sentBox = document.getElementById('synth-sentence');
          sentBox.innerHTML = `"${this.current.ex}" <div style="color:#10b981; margin-top:20px; font-size:1.5rem; font-weight:800; letter-spacing:3px;">FÜZYON BAŞARILI!</div>`;
          if(this.app.speakWord) this.app.speakWord(this.current.ex);
          this.score += 50 + (this.combo * 10); this.combo++; this._updateHUD();
          setTimeout(() => { this.currentIndex++; this.nextSynthesisWord(); }, 3500);
      } else {
          if(this.app.audio) this.app.audio.play('error');
          sVerb.classList.add('error'); sPart.classList.add('error');
          this.combo = 0; this._updateHUD();
          setTimeout(() => {
              sVerb.classList.remove('error'); sPart.classList.remove('error');
              document.getElementById(this.synthSelected.verbId).classList.remove('used');
              document.getElementById(this.synthSelected.particleId).classList.remove('used');
              this.synthSelected = { verb: null, particle: null, verbId: null, particleId: null };
              sVerb.innerText = 'FİİL'; sVerb.classList.remove('filled', 'verb', 'correct-pulse');
              sPart.innerText = 'EDAT'; sPart.classList.remove('filled', 'particle', 'correct-pulse');
              reactor.classList.remove('resonating');
              document.querySelectorAll('.synth-orb.particle').forEach(o => o.classList.remove('resonating-target'));
              this.locked = false;
          }, 800);
      }
  }

  // ==========================================
  // NETWORK & CIPHER MODES (Orijinal Mantık)
  // ==========================================
  startNetwork() { this.mode = 'network'; const shuffled = [...this.constellations].sort(() => 0.5 - Math.random()); this.queue = shuffled.slice(0, 5); this.score = 0; this.combo = 0; this.currentIndex = 0; this.nextNetworkWord(); }
  nextNetworkWord() { if (this.currentIndex >= this.queue.length) { this._showResults('Ağ Bütünleştirildi'); return; } this.current = this.queue[this.currentIndex]; this.locked = false; this._renderNetwork(); }
  _renderNetwork() {
    let tasks = [...this.current.tasks]; tasks.sort(() => 0.5 - Math.random()); this.current.tasks = tasks; this.currentTaskIndex = 0;
    let particlesToShow = tasks.map(p => p.particle); let wrongParticles = this.allParticles.filter(p => !particlesToShow.includes(p));
    wrongParticles.sort(() => 0.5 - Math.random()); particlesToShow.push(...wrongParticles.slice(0, 3)); particlesToShow.sort(() => 0.5 - Math.random());
    this.current.nodes = particlesToShow;
    this.root.innerHTML = `<div class="nexus-header"><h1 class="nexus-title">NEXUS <span class="v5-badge" style="background:#8b5cf6">AĞ MODU</span></h1></div><div class="nexus-display-container"><div class="nexus-task-progress">Düğüm ${this.currentTaskIndex + 1} / ${this.current.tasks.length}</div><div class="nexus-question" id="nx-q">${this.current.tasks[0].tr}</div><div class="nexus-feedback-area" id="nx-feedback" style="display:none;"><div class="nexus-phrase-result" id="nx-phrase-res"></div><div class="nexus-example-text" id="nx-ex-res"></div></div></div><div class="nexus-game-area" id="nexus-board"><svg class="nexus-connection-line" id="nexus-svg"></svg><div class="nexus-core-node" id="nexus-core" onclick="window.nexusMod.playVerbAudio('${this.current.verb}')">${this.current.verb}</div>${this.current.nodes.map((opt, i) => `<div class="nexus-particle-node" id="particle-${i}" onclick="window.nexusMod.checkNetworkAnswer('${opt}', this)">${opt}</div>`).join('')}</div><div class="nexus-hud"><div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div><div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div></div><div class="nexus-bg-stars" id="nexus-stars"></div>`;
    setTimeout(() => this._positionNodes(), 30); this._createStars(40);
  }
  _positionNodes() { const board = document.getElementById('nexus-board'); const core = document.getElementById('nexus-core'); if (!board || !core) return; const boardRect = board.getBoundingClientRect(); const centerX = boardRect.width/2; const centerY = boardRect.height/2; core.style.left = `${centerX - core.offsetWidth/2}px`; core.style.top = `${centerY - core.offsetHeight/2}px`; const particles = document.querySelectorAll('.nexus-particle-node'); const radius = Math.max(Math.min(boardRect.width, boardRect.height) * 0.35, window.innerWidth < 600 ? 90 : 130); particles.forEach((p, i) => { const angle = (i / particles.length) * Math.PI * 2 - Math.PI/2; p.style.left = `${centerX + Math.cos(angle) * radius - p.offsetWidth/2}px`; p.style.top = `${centerY + Math.sin(angle) * radius - p.offsetHeight/2}px`; }); this._redrawLines(); }
  _redrawLines() { const core = document.getElementById('nexus-core'); const svg = document.getElementById('nexus-svg'); if (!core || !svg) return; svg.innerHTML = ''; const coreRect = core.getBoundingClientRect(); const boardRect = document.getElementById('nexus-board').getBoundingClientRect(); document.querySelectorAll('.nexus-particle-node.solved').forEach(p => { const pRect = p.getBoundingClientRect(); const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line'); newLine.setAttribute('x1', coreRect.left + coreRect.width/2 - boardRect.left); newLine.setAttribute('y1', coreRect.top + coreRect.height/2 - boardRect.top); newLine.setAttribute('x2', pRect.left + pRect.width/2 - boardRect.left); newLine.setAttribute('y2', pRect.top + pRect.height/2 - boardRect.top); newLine.setAttribute('class', 'nexus-line correct-line'); svg.appendChild(newLine); }); }
  checkNetworkAnswer(particle, el) { if (this.locked || el.classList.contains('solved')) return; const task = this.current.tasks[this.currentTaskIndex]; if (particle === task.particle) { this.locked = true; el.classList.add('solved'); if(this.app.audio) this.app.audio.play('correct'); this.score += 30 + (this.combo * 5); this.combo++; this._updateHUD(); const qEl = document.getElementById('nx-q'); const feedbackArea = document.getElementById('nx-feedback'); if (qEl) qEl.style.display = 'none'; if (feedbackArea) { feedbackArea.style.display = 'flex'; document.getElementById('nx-phrase-res').innerText = task.phrase; document.getElementById('nx-ex-res').innerText = `"${task.ex}"`; } this.currentTaskIndex++; setTimeout(() => { if (this.currentTaskIndex >= this.current.tasks.length) { this._completeConstellation(); } else { if (qEl) { qEl.style.display = 'block'; qEl.innerText = this.current.tasks[this.currentTaskIndex].tr; } if (feedbackArea) feedbackArea.style.display = 'none'; document.querySelector('.nexus-task-progress').innerText = `Düğüm ${this.currentTaskIndex + 1} / ${this.current.tasks.length}`; this.locked = false; } }, 2500); } else { el.classList.add('wrong'); if(this.app.audio) this.app.audio.play('error'); this.combo = 0; this._updateHUD(); setTimeout(() => { el.classList.remove('wrong'); }, 800); } }
  _completeConstellation() { if(this.app.audio) this.app.audio.play('level_up'); this.score += 100; this._updateHUD(); setTimeout(() => { this.currentIndex++; this.nextNetworkWord(); }, 3500); }

  startCipher() { this.mode = 'cipher'; const shuffled = [...this.allPhrasals.filter(p => p.ex)].sort(() => 0.5 - Math.random()); this.queue = shuffled.slice(0, 10); this.score = 0; this.combo = 0; this.currentIndex = 0; this.nextCipherWord(); }
  nextCipherWord() { if (this.currentIndex >= this.queue.length) { this._showResults('Tüm Şifreler Kırıldı'); return; } this.current = this.queue[this.currentIndex]; this.locked = false; this.cipherVerbs = [this.current.verb, ...this.allVerbs.filter(v => v !== this.current.verb).sort(() => 0.5 - Math.random()).slice(0, 4)].sort(() => 0.5 - Math.random()); this.cipherParticles = [this.current.particle, ...this.allParticles.filter(p => p !== this.current.particle).sort(() => 0.5 - Math.random()).slice(0, 4)].sort(() => 0.5 - Math.random()); this.cipherVerbIdx = 0; this.cipherParticleIdx = 0; this._renderCipher(); }
  _renderCipher() { let displayEx = this.current.ex.replace(new RegExp(this.current.phrase.replace(' ', '\\s+'), 'gi'), '<span class="cipher-blank">[ ? ]</span>'); this.root.innerHTML = `<div class="nexus-header"><h1 class="nexus-title">NEXUS <span class="v5-badge" style="background:#10b981">ŞİFRE MODU</span></h1></div><div class="cipher-sentence-box">"${displayEx}"<div class="cipher-hint">Anlamı: ${this.current.tr}</div></div><div class="cipher-lock-mechanism"><div class="cipher-dial"><button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('verb', -1)">▲</button><div class="cipher-window" id="cipher-w-verb">${this.cipherVerbs[this.cipherVerbIdx]}</div><button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('verb', 1)">▼</button></div><div style="font-size:2.2rem; color:#fff; font-weight:800;">+</div><div class="cipher-dial"><button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('particle', -1)">▲</button><div class="cipher-window" id="cipher-w-particle">${this.cipherParticles[this.cipherParticleIdx]}</div><button class="cipher-nav-btn" onclick="window.nexusMod.scrollDial('particle', 1)">▼</button></div></div><button class="cipher-engage-btn" onclick="window.nexusMod.checkCipher()">ŞİFREYİ ÇÖZ</button><div class="nexus-hud"><div class="nexus-stat">⭐ <span id="nx-score">${this.score}</span> XP</div><div class="nexus-stat">🔥 <span id="nx-combo">${this.combo}</span></div></div><div class="nexus-bg-stars" id="nexus-stars"></div>`; this._createStars(40); }
  scrollDial(type, dir) { if (this.locked) return; if(this.app.audio) this.app.audio.play('tick'); if (type === 'verb') { this.cipherVerbIdx = (this.cipherVerbIdx + dir + this.cipherVerbs.length) % this.cipherVerbs.length; document.getElementById('cipher-w-verb').innerText = this.cipherVerbs[this.cipherVerbIdx]; } else { this.cipherParticleIdx = (this.cipherParticleIdx + dir + this.cipherParticles.length) % this.cipherParticles.length; document.getElementById('cipher-w-particle').innerText = this.cipherParticles[this.cipherParticleIdx]; } }
  checkCipher() { if (this.locked) return; const isV = this.cipherVerbs[this.cipherVerbIdx] === this.current.verb; const isP = this.cipherParticles[this.cipherParticleIdx] === this.current.particle; if (isV && isP) { this.locked = true; if(this.app.audio) this.app.audio.play('correct'); document.getElementById('cipher-w-verb').classList.add('correct'); document.getElementById('cipher-w-particle').classList.add('correct'); this.score += 40 + (this.combo * 5); this.combo++; this._updateHUD(); setTimeout(() => { this.currentIndex++; this.nextCipherWord(); }, 3500); } else { if(this.app.audio) this.app.audio.play('error'); this.combo = 0; this._updateHUD(); } }

  // Shared
  playVerbAudio(word) { if(this.app.speakWord) this.app.speakWord(word); const core = document.getElementById('nexus-core'); if (core) { core.classList.add('active'); setTimeout(() => core.classList.remove('active'), 300); } }
  _updateHUD() { const scEl = document.getElementById('nx-score'); const cbEl = document.getElementById('nx-combo'); if (scEl) scEl.innerText = this.score; if (cbEl) cbEl.innerText = this.combo; if(this.app.state) { this.app.state.update({ xp: (this.app.state.get('xp') || 0) + 30 }); if(this.app._renderHeader) this.app._renderHeader(); } }
  _showResults(title) { this.root.innerHTML = `<div class="nexus-header"><h1 class="nexus-title">NEXUS <span class="v5-badge">BAŞARILI</span></h1></div><div class="nexus-game-area" style="text-align:center;"><div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px var(--cyan);">🏆</div><h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">${title}!</h2><p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazanılan Toplam XP: <strong style="color:var(--cyan)">+${this.score}</strong></p><div style="display:flex; gap:15px; justify-content:center;"><button class="btn btn-primary nexus-intro-btn" onclick="window.nexusMod.init(window.nexusMod.root)">MOD SEÇİMİ</button><button class="btn btn-ghost" style="padding: 16px 30px; font-size: 1.1rem;" onclick="app.navigate('home')">ANA MERKEZ</button></div></div><div class="nexus-bg-stars" id="nexus-stars"></div>`; this._createStars(100); if (typeof confetti === 'function') confetti({ particleCount: 200, spread: 90, origin: {y: 0.6}, colors: ['#00d4ff', '#7c3aed', '#ec4899', '#10b981'] }); }
}
