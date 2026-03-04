class LingoApp {
  constructor() {
    this.state = {
      view: 'home',
      xp: parseInt(localStorage.getItem('ll_xp')) || 0,
      streak: parseInt(localStorage.getItem('ll_streak')) || 1,
      level: parseInt(localStorage.getItem('ll_lvl')) || 1,
      currentCardIdx: 0,
      currentSentenceIdx: 0,
      isRecording: false,
      // Learn specific
      gameMode: 'normal',
      selectedCategory: 'all',
      timer: null,
      timeLeft: 30,
      correctCount: 0,
      wrongCount: 0,
      failedWords: [],
      learnPool: [],
      mastery: JSON.parse(localStorage.getItem('ll_mastery')) || {},
      isVoiceNavActive: false,
      // Speak specific
      speakDifficulty: 'easy',
      speakIdx: 0,
      speakBest: 0,
      speakTotal: 0,
      speakSum: 0,
      speakHistory: [],
      speakAutoAdvance: false,
      // Phrase specific
      phraseCategory: 'all',
      phraseSearch: '',
      phraseIdx: 0,
      phrasePool: [],
      phraseFlipped: false,
      phrasesMastery: JSON.parse(localStorage.getItem('ll_pmast')) || {},
      phrasesBadges: JSON.parse(localStorage.getItem('ll_pbadges')) || [],
      phraseCombo: 0,
      phraseStreak: parseInt(localStorage.getItem('ll_pstreak')) || 0,
      phraseLastDate: localStorage.getItem('ll_plastdate') || '',
      // Spaced Repetition & Analytics
      srData: JSON.parse(localStorage.getItem('ll_sr_data')) || {},
      history: JSON.parse(localStorage.getItem('ll_history')) || {}, // { date: xp }
      voiceAccent: localStorage.getItem('ll_accent') || 'en-US'
    };

    this.synth = window.speechSynthesis;
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.setupSpeechSystems();
    
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.updateAppTheme();
    this.initCanvas();
    this.bindEvents();
    this.renderNav();
    
    try {
      this.navigate('home');
      setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
          splash.style.transition = 'opacity 0.5s ease';
          splash.style.opacity = '0';
          setTimeout(() => {
            splash.remove();
            this.checkOnboarding();
          }, 500);
        }
      }, 1000);
    } catch (err) {
      const splash = document.getElementById('splash-screen');
      if (splash) splash.remove();
    }
  }

  // =============================================
  //   ONBOARDING — LEVEL ASSESSMENT SYSTEM
  // =============================================

  checkOnboarding() {
    if (localStorage.getItem('ll_onboarded')) return;
    this._ob = { step: 0, score: 0, goal: 'general', dailyGoal: '15', answers: [] };
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
      // Generate floating background particles
      const particlesEl = document.getElementById('ob-particles');
      if (particlesEl && !particlesEl.childElementCount) {
        for (let i = 0; i < 24; i++) {
          const p = document.createElement('div');
          p.className = 'ob-particle';
          p.style.cssText = `
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            width:${4 + Math.random()*8}px;
            height:${4 + Math.random()*8}px;
            animation-delay:${Math.random()*6}s;
            animation-duration:${6 + Math.random()*8}s;
            opacity:${0.2 + Math.random()*0.4};
          `;
          particlesEl.appendChild(p);
        }
      }
      overlay.style.display = 'flex';
      overlay.style.opacity = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.4s ease';
        overlay.style.opacity = '1';
      }));
    }
    this.renderOnboardingStep();
  }

  get _obQuestions() {
    return [
      {
        id: 'self', icon: '🤔',
        question: 'İngilizce seviyeni nasıl değerlendirirsin?',
        subtitle: 'Dürüst ol — sana uygun içerik göstereceğiz',
        options: [
          { label: 'Hiç bilmiyorum', sub: 'A1 · Sıfırdan başlıyorum', pts: 0 },
          { label: 'Biraz biliyorum', sub: 'A2 · Temel kelimeler', pts: 1 },
          { label: 'Orta seviyeyim', sub: 'B1/B2 · Günlük iletişim', pts: 3 },
          { label: 'İyi biliyorum', sub: 'C1+ · Akıcı konuşma', pts: 5 }
        ]
      },
      {
        id: 'vocab1', icon: '📖',
        question: '"Galaxy" kelimesinin Türkçe karşılığı nedir?',
        subtitle: 'Doğru seçeneği tıkla',
        options: [
          { label: '☀️ Güneş', pts: 0 },
          { label: '🌀 Galaksi', pts: 2, correct: true },
          { label: '⭐ Yıldız', pts: 0 },
          { label: '🪐 Gezegen', pts: 0 }
        ]
      },
      {
        id: 'grammar1', icon: '✍️',
        question: 'Doğru seçeneği seç:\n"I\'m looking forward to ___ you."',
        subtitle: 'Dilbilgisi sorusu',
        options: [
          { label: 'meet', pts: 0 },
          { label: 'meeting', pts: 2, correct: true },
          { label: 'met', pts: 0 },
          { label: 'to meet', pts: 0 }
        ]
      },
      {
        id: 'vocab2', icon: '🔥',
        question: '"Perseverance" kelimesinin anlamını biliyor musun?',
        subtitle: 'İleri seviye kelime testi',
        options: [
          { label: '✅ Evet — Azim, sebat etmek', pts: 3, correct: true },
          { label: '🤔 Duydum ama emin değilim', pts: 1 },
          { label: '❌ Hayır, ilk kez görüyorum', pts: 0 }
        ]
      },
      {
        id: 'listening', icon: '🎧',
        question: 'Bir podcast\'i İngilizce dinleyebilir misin?',
        subtitle: 'Dinleme becerini değerlendir',
        options: [
          { label: '😓 Neredeyse hiç anlamıyorum', pts: 0 },
          { label: '🙂 Basit konuşmaları anlıyorum', pts: 1 },
          { label: '😊 Çoğunluğunu anlıyorum', pts: 2 },
          { label: '🏆 Aksan farketmeksizin anlıyorum', pts: 3 }
        ]
      },
      {
        id: 'goal', icon: '🎯',
        question: 'Neden İngilizce öğrenmek istiyorsun?',
        subtitle: 'Hedefine göre içerik kişiselleştireceğiz',
        noPoints: true,
        options: [
          { label: '✈️ Seyahat & Tatil', val: 'travel' },
          { label: '💼 İş & Kariyer', val: 'work' },
          { label: '📝 Sınav (IELTS/TOEFL)', val: 'exam' },
          { label: '🌍 Genel Gelişim', val: 'general' }
        ]
      },
      {
        id: 'daily', icon: '⏱️',
        question: 'Günde ne kadar çalışmak istiyorsun?',
        subtitle: 'Tutarlılık başarının anahtarı',
        noPoints: true,
        options: [
          { label: '⚡ 5 dakika', sub: 'Hızlı günlük pratik', val: '5' },
          { label: '🌱 15 dakika', sub: 'Dengeli ilerleme', val: '15' },
          { label: '💪 30 dakika', sub: 'Hızlı gelişim', val: '30' },
          { label: '🚀 60 dakika+', sub: 'Yoğun program', val: '60' }
        ]
      }
    ];
  }

  renderOnboardingStep() {
    const screen = document.getElementById('ob-screen');
    const progressWrap = document.getElementById('ob-progress-wrap');
    const progressBar = document.getElementById('ob-progress-bar');
    const progressLabel = document.getElementById('ob-progress-label');
    if (!screen) return;

    const step = this._ob.step;
    const questions = this._obQuestions;

    // Welcome screen
    if (step === 0) {
      if (progressWrap) progressWrap.style.display = 'none';
      screen.innerHTML = `
        <div class="ob-welcome ob-animate">
          <div class="ob-welcome-icon">🎓</div>
          <h1 class="ob-welcome-title">English<br><span>Rhapsody</span>'ye<br>Hoş Geldin!</h1>
          <p class="ob-welcome-sub">Sana özel bir öğrenme deneyimi hazırlıyoruz.<br>Birkaç soruda seviyeni belirleyelim.</p>
          <div class="ob-welcome-features">
            <div class="ob-feat"><span>🧠</span><p>Kişiselleştirilmiş seviye</p></div>
            <div class="ob-feat"><span>🎯</span><p>Hedefe özel içerik</p></div>
            <div class="ob-feat"><span>⚡</span><p>Anında başla</p></div>
          </div>
          <button class="ob-start-btn" onclick="app.obNextStep()">Seviyemi Belirle →</button>
          <p class="ob-time-hint">⏱ Yaklaşık 1 dakika</p>
        </div>`;
      return;
    }

    // Question screens (steps 1–7)
    const qIdx = step - 1;
    if (qIdx < questions.length) {
      const q = questions[qIdx];
      const total = questions.length;
      const pct = (qIdx / total) * 100;

      if (progressWrap) progressWrap.style.display = 'flex';
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressLabel) progressLabel.innerText = `${qIdx + 1} / ${total}`;

      screen.innerHTML = `
        <div class="ob-question ob-animate">
          <div class="ob-q-icon">${q.icon}</div>
          <h2 class="ob-q-title">${q.question.replace(/\n/g, '<br>')}</h2>
          <p class="ob-q-sub">${q.subtitle}</p>
          <div class="ob-options" id="ob-options">
            ${q.options.map((opt, i) => `
              <button class="ob-option" onclick="app.selectObOption(${qIdx}, ${i})">
                <span class="ob-opt-label">${opt.label}</span>
                ${opt.sub ? `<span class="ob-opt-sub">${opt.sub}</span>` : ''}
              </button>`).join('')}
          </div>
        </div>`;
      return;
    }

    // Result screen
    this.renderOnboardingResult(screen, progressWrap, progressBar, progressLabel);
  }

  selectObOption(qIdx, optIdx) {
    const q = this._obQuestions[qIdx];
    const opt = q.options[optIdx];

    // Visual feedback
    const btns = document.querySelectorAll('.ob-option');
    btns.forEach(b => b.disabled = true);
    btns[optIdx].classList.add('ob-option-selected');

    if (!q.noPoints) {
      this._ob.score += (opt.pts || 0);
      if (opt.correct) btns[optIdx].classList.add('ob-option-correct');
      else if (q.options.some(o => o.correct)) {
        const correctIdx = q.options.findIndex(o => o.correct);
        if (correctIdx >= 0 && btns[correctIdx]) btns[correctIdx].classList.add('ob-option-correct');
        btns[optIdx].classList.add('ob-option-wrong');
      }
    } else {
      if (q.id === 'goal') this._ob.goal = opt.val || 'general';
      if (q.id === 'daily') this._ob.dailyGoal = opt.val || '15';
    }

    this._ob.answers.push(optIdx);
    this.playSFX('pop');
    setTimeout(() => this.obNextStep(), opt.correct === undefined || !q.noPoints ? 900 : 400);
  }

  obNextStep() {
    this._ob.step++;
    const screen = document.getElementById('ob-screen');
    if (screen) {
      screen.style.opacity = '0';
      screen.style.transform = 'translateX(30px)';
      setTimeout(() => {
        screen.style.transition = 'none';
        screen.style.transform = 'translateX(-20px)';
        screen.style.opacity = '0';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          screen.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)';
          screen.style.opacity = '1';
          screen.style.transform = 'translateX(0)';
          this.renderOnboardingStep();
        }));
      }, 200);
    }
  }

  renderOnboardingResult(screen, progressWrap, progressBar, progressLabel) {
    const score = this._ob.score;
    let level, levelLabel, levelColor, levelIcon, speakDiff, xpBonus, tips;

    if (score <= 3) {
      level = 'beginner'; levelLabel = 'Başlangıç'; levelColor = '#00f3ff';
      levelIcon = '🌱'; speakDiff = 'easy'; xpBonus = 0;
      tips = ['Temel kelimelerle başla', 'Günlük 5-10 dakika pratik yap', 'Görselli kartlar seni hızlandıracak'];
    } else if (score <= 8) {
      level = 'intermediate'; levelLabel = 'Orta Seviye'; levelColor = '#f1c40f';
      levelIcon = '📚'; speakDiff = 'medium'; xpBonus = 200;
      tips = ['Günlük kalıplarla konuşma pratiği yap', 'Orta zorluktaki cümleleri seslendir', 'Zamanlı mod ile hızını artır'];
    } else {
      level = 'advanced'; levelLabel = 'İleri Seviye'; levelColor = '#bc13fe';
      levelIcon = '🏆'; speakDiff = 'hard'; xpBonus = 500;
      tips = ['Zor cümle setleriyle çalış', 'Tüm kategorileri hedef al', 'AI Konuşma koçuyla aksanını geliştir'];
    }

    const goalTexts = { travel: '✈️ Seyahat', work: '💼 İş & Kariyer', exam: '📝 Sınav Hazırlığı', general: '🌍 Genel Gelişim' };
    const goalText = goalTexts[this._ob.goal] || '🌍 Genel Gelişim';

    if (progressWrap) progressWrap.style.display = 'flex';
    if (progressBar) progressBar.style.width = '100%';
    if (progressLabel) progressLabel.innerText = 'Tamamlandı!';

    screen.innerHTML = `
      <div class="ob-result ob-animate">
        <div class="ob-result-badge" style="--lc:${levelColor}">
          <div class="ob-result-icon">${levelIcon}</div>
          <div class="ob-result-level-name" style="color:${levelColor}">${levelLabel}</div>
        </div>
        <h2 class="ob-result-title">Seviyeni belirledik!</h2>
        <div class="ob-result-meta">
          <span class="ob-meta-chip">🎯 ${goalText}</span>
          <span class="ob-meta-chip">⏱ ${this._ob.dailyGoal} dk / gün</span>
          ${xpBonus > 0 ? `<span class="ob-meta-chip ob-meta-bonus">⚡ +${xpBonus} başlangıç XP</span>` : ''}
        </div>
        <div class="ob-result-tips">
          ${tips.map(t => `<div class="ob-tip">✓ ${t}</div>`).join('')}
        </div>
        <button class="ob-start-btn ob-start-glow" style="--lc:${levelColor}" onclick="app.finishOnboarding('${level}', '${speakDiff}', ${xpBonus})">
          ${levelIcon} Hadi Başlayalım!
        </button>
      </div>`;
  }

  finishOnboarding(level, speakDiff, xpBonus) {
    // Save settings
    localStorage.setItem('ll_onboarded', '1');
    localStorage.setItem('ll_user_level', level);
    localStorage.setItem('ll_goal', this._ob.goal);
    localStorage.setItem('ll_daily_goal', this._ob.dailyGoal);

    this.state.speakDifficulty = speakDiff;
    if (xpBonus > 0) this.addXP(xpBonus);

    this.showToast(`${level === 'beginner' ? '🌱' : level === 'intermediate' ? '📚' : '🏆'} Seviye belirlendi: ${level === 'beginner' ? 'Başlangıç' : level === 'intermediate' ? 'Orta' : 'İleri'}!`);

    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.5s ease';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 500);
    }
    this.playSFX('success');
    this.updateHomeProgress();
  }

  skipOnboarding() {
    localStorage.setItem('ll_onboarded', '1');
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 300);
    }
  }

  setupSpeechSystems() {
    if (!this.SpeechRecognition) return;

    // Challenge Recognizer
    this.recognizer = new this.SpeechRecognition();
    this.recognizer.lang = 'en-US';
    this.recognizer.onresult = (e) => this.handleSpeechResult(e);
    this.recognizer.onend = () => this.stopRecording();

    // Voice Nav Recognizer
    this.voiceNav = new this.SpeechRecognition();
    this.voiceNav.lang = 'en-US';
    this.voiceNav.continuous = true;
    this.voiceNav.interimResults = false;
    this.voiceNav.onresult = (e) => this.handleVoiceNavResult(e);
    this.voiceNav.onend = () => { if(this.state.isVoiceNavActive) this.voiceNav.start(); };
  }

  toggleVoiceNav() {
    this.state.isVoiceNavActive = !this.state.isVoiceNavActive;
    const btn = document.getElementById('btn-voice-nav');
    if (this.state.isVoiceNavActive) {
      this.voiceNav.start();
      btn.innerText = "🎤 Sesli Kontrol: AÇIK";
      btn.classList.add('recording-active');
      this.playSFX('pop');
    } else {
      this.voiceNav.stop();
      btn.innerText = "🎤 Sesli Kontrol: KAPALI";
      btn.classList.remove('recording-active');
    }
  }

  handleVoiceNavResult(event) {
    if (this.state.view !== 'learn') return;
    const cmd = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("Voice Command:", cmd);

    if (cmd.includes('flip') || cmd.includes('dön') || cmd.includes('bak')) {
      this.flipCard();
    } else if (cmd.includes('easy') || cmd.includes('kolay') || cmd.includes('tamam')) {
      this.answerCard(true);
    } else if (cmd.includes('hard') || cmd.includes('zor') || cmd.includes('hayır')) {
      this.answerCard(false);
    }
  }

  playSFX(type) {
    // Haptic feedback for mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (type === 'success') navigator.vibrate([30, 50, 30]);
      else navigator.vibrate(15);
    }
    try {
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain); gain.connect(this.audioCtx.destination);
      if (type === 'click') { osc.type = 'sine'; osc.frequency.setValueAtTime(600, t); osc.frequency.exponentialRampToValueAtTime(300, t + 0.1); gain.gain.setValueAtTime(0.2, t); gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1); osc.start(t); osc.stop(t + 0.1); } 
      else if (type === 'success') { osc.type = 'square'; osc.frequency.setValueAtTime(440, t); osc.frequency.setValueAtTime(554.37, t + 0.1); osc.frequency.setValueAtTime(659.25, t + 0.2); gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(0.15, t + 0.05); gain.gain.setValueAtTime(0.15, t + 0.2); gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4); osc.start(t); osc.stop(t + 0.4); } 
      else if (type === 'pop') { osc.type = 'triangle'; osc.frequency.setValueAtTime(800, t); osc.frequency.exponentialRampToValueAtTime(100, t + 0.15); gain.gain.setValueAtTime(0.3, t); gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15); osc.start(t); osc.stop(t + 0.15); }
    } catch(e) {}
  }

  speakWord(text) { 
    if (!this.synth) return; 
    this.synth.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text); 
    utterance.lang = this.state.voiceAccent; 
    utterance.rate = 0.9; 
    this.synth.speak(utterance); 
    this.playSFX('click'); 
  }

  setVoiceAccent(accent) {
    this.state.voiceAccent = accent;
    localStorage.setItem('ll_accent', accent);
    this.showToast(`🗣️ Aksan değiştirildi: ${accent === 'en-US' ? 'Amerikan' : 'İngiliz'}`);
  }

  initCanvas() {
    this.canvas = document.getElementById('bg-canvas'); if(!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas(); window.addEventListener('resize', () => this.resizeCanvas());
    this.stars = Array.from({length: 150}, () => ({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, s: Math.random() * 2, v: Math.random() * 0.5 + 0.1 }));
    this.animateCanvas();
  }
  resizeCanvas() { if(this.canvas) { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; } }
  animateCanvas() {
    if(!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    
    const colors = ['#ffffff', '#00f3ff', '#2ecc71', '#f1c40f', '#bc13fe', '#ff007f', '#ff5722'];
    const rankTier = Math.min(Math.floor((this.state.level - 1) / 5) + 1, 6);
    this.ctx.fillStyle = colors[rankTier] || '#00f3ff';
    
    // Level 1: speed multiplier 1.0; Level 20: multiplier ~2.0
    const speedMult = 1 + (this.state.level * 0.04);

    this.stars.forEach(star => { 
      star.y -= star.v * speedMult; 
      if (star.y < 0) { star.y = this.canvas.height; star.x = Math.random() * this.canvas.width; } 
      this.ctx.globalAlpha = Math.random() * 0.5 + 0.3; 
      this.ctx.beginPath(); 
      this.ctx.arc(star.x, star.y, star.s, 0, Math.PI * 2); 
      this.ctx.fill(); 
    });
    requestAnimationFrame(() => this.animateCanvas());
  }

    bindEvents() {
      // Both Desktop and Mobile Nav
      const navButtons = document.querySelectorAll('.nav-btn, .m-nav-btn');
      navButtons.forEach(btn => btn.addEventListener('click', (e) => {
        this.playSFX('click');
        this.navigate(e.currentTarget.dataset.target);
      }));
  
      document.addEventListener('click', (e) => {
   if(e.target.closest('button') || e.target.closest('.dash-card')) this.spawnClickParticles(e.clientX, e.clientY); });
    document.addEventListener('keydown', (e) => {
      if (this.state.view === 'phrases') {
        if (e.target.tagName === 'INPUT') return;
        if (e.code === 'Space') { e.preventDefault(); this.flipPhraseCard(); }
        else if (e.code === 'ArrowLeft') this.prevPhrase();
        else if (e.code === 'ArrowRight') this.nextPhrase();
        return;
      }
      if (this.state.view === 'speak') {
        if (e.code === 'Space') { e.preventDefault(); this.toggleRecord(); }
        return;
      }
      if(this.state.view !== 'learn' || !document.getElementById('learn-game') || document.getElementById('learn-game').style.display === 'none') return;
      if(e.code === 'Space') { e.preventDefault(); this.flipCard(); } else if(e.code === 'ArrowLeft') this.answerCard(false); else if(e.code === 'ArrowRight') this.answerCard(true);
    });
  }

  addXP(amount) {
    this.state.xp += amount; const nextLvlXp = this.state.level * 500;
    
    // Track history for analytics
    const today = new Date().toISOString().split('T')[0];
    this.state.history[today] = (this.state.history[today] || 0) + amount;
    localStorage.setItem('ll_history', JSON.stringify(this.state.history));

    if (this.state.xp >= nextLvlXp) { 
      this.state.level++; 
      this.state.xp -= nextLvlXp; 
      this.showToast(`🎉 Seviye atladın! Level ${this.state.level}`); 
      this.playSFX('success'); 
      if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00f3ff', '#bc13fe', '#ff007f'] });
      }
    }
    localStorage.setItem('ll_xp', this.state.xp); localStorage.setItem('ll_lvl', this.state.level);
    this.updateAppTheme();
    this.renderNav(); if(this.state.view === 'home') this.updateHomeProgress();
  }

  updateAppTheme() {
    const rankTier = Math.min(Math.floor((this.state.level - 1) / 5) + 1, 6);
    document.body.className = `rank-${rankTier}`;
  }

  renderNav() { 
    const xpEl = document.getElementById('xp-val'); if(xpEl) xpEl.innerText = this.state.xp;
    const lvlEl = document.getElementById('lvl-val'); if(lvlEl) lvlEl.innerText = this.state.level;
    const stkEl = document.getElementById('streak-val'); if(stkEl) stkEl.innerText = this.state.streak;
  }

  navigate(viewName) {
    this.state.view = viewName; 
    
    // Update both Desktop and Mobile active states
    document.querySelectorAll('.nav-btn, .m-nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.target === viewName);
    });
    
    const content = document.getElementById('app-content'); const template = document.getElementById(`tpl-${viewName}`);
    if (template) { content.innerHTML = ''; content.appendChild(template.content.cloneNode(true)); }
        if (viewName === 'home') this.updateHomeProgress();
        if (viewName === 'learn') this.setupLearnView();
        if (viewName === 'phrases') this.setupPhrasesView();
        if (viewName === 'speak') this.setupSpeakView();
        if (viewName === 'analytics') this.setupAnalyticsView();
        if (viewName === 'league') this.setupLeagueView();
    
  }

  updateHomeProgress() {
    // Rank & Theme calculation
    const rankTier = Math.min(Math.floor((this.state.level - 1) / 5) + 1, 6);
    const ranks = [
      { icon: '🌱', name: 'Çırak' },
      { icon: '🧭', name: 'Gezgin' },
      { icon: '📚', name: 'Bilgin' },
      { icon: '🧙‍♂️', name: 'Usta' },
      { icon: '👑', name: 'Efsane' },
      { icon: '⚡', name: 'İlah' }
    ];
    const rank = ranks[rankTier - 1];
    
    const rankIconEl = document.getElementById('rank-icon');
    const rankNameEl = document.getElementById('rank-name');
    if (rankIconEl) rankIconEl.innerText = rank.icon;
    if (rankNameEl) rankNameEl.innerText = rank.name;

    // XP bar
    const nextLvlXp = this.state.level * 500;
    const pct = (this.state.xp / nextLvlXp) * 100;
    const bar = document.getElementById('home-progress');
    const xpToGo = document.getElementById('xp-to-go');
    const lvlDisplay = document.getElementById('home-lvl-display');
    if (bar) setTimeout(() => bar.style.width = `${pct}%`, 100);
    if (xpToGo) xpToGo.innerText = `${nextLvlXp - this.state.xp} XP kaldı`;
    if (lvlDisplay) lvlDisplay.innerText = this.state.level;

    // Stats row
    const mastered = Object.values(this.state.mastery).filter(v => v >= 3).length;
    const phraseMastered = Object.values(this.state.phrasesMastery).filter(v => v >= 2).length;
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setEl('hs-mastered', mastered);
    setEl('hs-phrases', phraseMastered);
    setEl('hs-streak', `🔥${this.state.streak}`);
    setEl('hs-xp', this.state.xp);
    setEl('hs-lvl', this.state.level);

    // Word of the day (deterministic per day)
    const day = new Date().toDateString();
    let h = 0; for (const c of day) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    const wod = WORDS[Math.abs(h) % WORDS.length];
    setEl('wod-en', wod.en);
    setEl('wod-ipa', wod.ipa);
    setEl('wod-tr', wod.tr);

    // Dashboard card progress bars
    const wordsPct = Math.round((mastered / WORDS.length) * 100);
    const phrasesPct = Math.round((phraseMastered / PHRASES.length) * 100);
    const wBar = document.getElementById('dc-words-bar');
    const pBar = document.getElementById('dc-phrases-bar');
    if (wBar) setTimeout(() => wBar.style.width = `${wordsPct}%`, 200);
    if (pBar) setTimeout(() => pBar.style.width = `${phrasesPct}%`, 200);
    setEl('dc-words-pct', `${wordsPct}%`);
    setEl('dc-phrases-pct', `${phrasesPct}%`);

    // Speak card hint
    const speakHint = document.getElementById('dc-speak-hint');
    if (speakHint) {
      speakHint.innerText = this.state.speakTotal > 0
        ? `En iyi: ${this.state.speakBest}% 🏆`
        : 'Bugün dene →';
    }

    // Category progress bars
    const catBarsEl = document.getElementById('home-cat-bars');
    if (catBarsEl) {
      const cats = [...new Set(WORDS.map(w => w.cat))];
      catBarsEl.innerHTML = cats.map(cat => {
        const pool = WORDS.filter(w => w.cat === cat);
        const learned = pool.filter(w => (this.state.mastery[w.en] || 0) >= 3).length;
        const catPct = Math.round((learned / pool.length) * 100);
        return `<div class="hc-row">
          <span class="hc-cat">${cat}</span>
          <div class="hc-bar-wrap"><div class="hc-bar" style="width:${catPct}%"></div></div>
          <span class="hc-pct">${learned}/${pool.length}</span>
        </div>`;
      }).join('');
    }

    // Greeting
    const hour = new Date().getHours();
    const greetEl = document.getElementById('home-greeting-text');
    const dateEl = document.getElementById('home-date');
    if (greetEl) {
      if (hour < 12) greetEl.innerText = '🌅 Günaydın! Harika bir gün olacak.';
      else if (hour < 18) greetEl.innerText = '☀️ İyi öğlenler! Biraz İngilizce çalışalım mı?';
      else greetEl.innerText = '🌙 İyi akşamlar! Günün son egzersizi!';
    }
    if (dateEl) {
      dateEl.innerText = new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });
    }
  }

  preloadImages(pool, startIdx = 0) {
    const limit = 10; const itemsToPreload = pool.slice(startIdx, startIdx + limit);
    itemsToPreload.forEach(word => { const img = new Image(); img.src = word.img; });
  }

  setupLearnView() {
    const catContainer = document.getElementById('learn-categories'); if(!catContainer) return;
    document.getElementById('learn-setup').style.display = 'block'; document.getElementById('learn-game').style.display = 'none'; document.getElementById('learn-finish').style.display = 'none';

    const categories = ['all', ...new Set(WORDS.map(w => w.cat))];
    catContainer.innerHTML = categories.map(c => {
      const pool = c === 'all' ? WORDS : WORDS.filter(w => w.cat === c);
      const learned = pool.filter(w => this.state.mastery[w.en] >= 3).length;
      const masteryPct = (learned / pool.length) * 100;
      return `
        <button class="cat-btn ${this.state.selectedCategory === c ? 'active' : ''}" onclick="app.setLearnCategory('${c}', this)">
          ${c === 'all' ? 'Hepsi' : c}
          <div class="m-bar-wrap"><div class="m-bar" style="width: ${masteryPct}%"></div></div>
        </button>`;
    }).join('');
  }
  setLearnCategory(cat, btn) { this.state.selectedCategory = cat; document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); this.playSFX('click'); }

  updateSidebar() {
    const correct = document.getElementById('sb-correct');
    const wrong = document.getElementById('sb-wrong');
    if (correct) correct.innerText = this.state.correctCount;
    if (wrong) wrong.innerText = this.state.wrongCount;
    const vmCorrect = document.getElementById('vm-sb-correct');
    const vmWrong = document.getElementById('vm-sb-wrong');
    if (vmCorrect) vmCorrect.innerText = this.state.correctCount;
    if (vmWrong) vmWrong.innerText = this.state.wrongCount;
  }

  startLearnSession(mode) {
    this.state.gameMode = mode; this.state.currentCardIdx = 0; this.state.correctCount = 0; this.state.wrongCount = 0; this.state.failedWords = [];
    
    let pool = this.state.selectedCategory === 'all' ? [...WORDS] : WORDS.filter(w => w.cat === this.state.selectedCategory);
    
    // Spaced Repetition Prioritization
    const now = Date.now();
    const dueWords = pool.filter(w => {
      const sr = this.state.srData[w.en];
      return sr && sr.nextReview <= now;
    });
    
    if (dueWords.length >= 5) {
      this.showToast(`🔔 Unutmaya başladığın ${dueWords.length} kelimeye öncelik verildi!`);
      this.state.learnPool = dueWords.sort(() => Math.random() - 0.5);
    } else {
      this.state.learnPool = pool.sort(() => Math.random() - 0.5);
    }

    this.preloadImages(this.state.learnPool);
    document.getElementById('learn-setup').style.display = 'none'; document.getElementById('learn-game').style.display = 'block'; document.getElementById('learn-finish').style.display = 'none';
    document.getElementById('flashcard-area').style.display = 'block'; document.getElementById('visual-match-area').style.display = 'none';
    if (mode === 'timed') { this.state.timeLeft = 45; document.getElementById('timer-display').style.display = 'block'; this.startTimer(); } else { document.getElementById('timer-display').style.display = 'none'; }
    // Set sidebar category name
    const sbCat = document.getElementById('sb-category');
    if (sbCat) sbCat.innerText = this.state.selectedCategory === 'all' ? 'Tüm Kelimeler' : this.state.selectedCategory;
    this.updateSidebar();
    this.renderFlashcard();
    this.initSwipeGestures();
  }

  startVisualMatch() {
    this.state.gameMode = 'visual-match'; this.state.currentCardIdx = 0; this.state.correctCount = 0; this.state.wrongCount = 0; this.state.failedWords = [];
    this.state.learnPool = this.state.selectedCategory === 'all' ? [...WORDS] : WORDS.filter(w => w.cat === this.state.selectedCategory);
    if (this.state.learnPool.length < 4) { this.showToast("Bu kategoride yeterli kelime yok (En az 4 gerekli)."); return; }
    this.state.learnPool.sort(() => Math.random() - 0.5); this.preloadImages(this.state.learnPool);
    document.getElementById('learn-setup').style.display = 'none'; document.getElementById('learn-game').style.display = 'block'; document.getElementById('learn-finish').style.display = 'none';
    document.getElementById('flashcard-area').style.display = 'none'; document.getElementById('visual-match-area').style.display = 'block'; document.getElementById('timer-display').style.display = 'none';
    this.updateSidebar();
    this.renderVisualMatch();
  }

  startTimer() { 
    if (this.state.timer) clearInterval(this.state.timer); 
    // Süre seviye arttıkça azalır, minimum 10 saniye kalır
    const dynamicTime = Math.max(10, 30 - Math.floor(this.state.level / 2));
    this.state.timeLeft = dynamicTime;
    const el = document.getElementById('time-val'); 
    if(el) el.innerText = this.state.timeLeft;
    
    this.state.timer = setInterval(() => { 
      this.state.timeLeft--; 
      if(el) el.innerText = this.state.timeLeft; 
      if (this.state.timeLeft <= 0) { 
        clearInterval(this.state.timer); 
        this.showFinishScreen("Süre Bitti!"); 
      } 
    }, 1000); 
  }

  renderFlashcard() {
    const word = this.state.learnPool[this.state.currentCardIdx]; if(!word) return;
    const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
    setEl('c-en', word.en); setEl('c-ipa', word.ipa); setEl('c-cat', word.cat); setEl('c-icon', word.icon || '📚'); setEl('c-tr', word.tr); setEl('c-ex', `"${word.ex}"`); setEl('card-counter', `${this.state.currentCardIdx + 1} / ${this.state.learnPool.length}`);
    const img = document.getElementById('c-img'); if(img) { img.classList.remove('loaded'); img.src = word.img; img.onload = () => img.classList.add('loaded'); }
    const pct = ((this.state.currentCardIdx) / this.state.learnPool.length) * 100; const sBar = document.getElementById('session-progress'); if(sBar) sBar.style.width = `${pct}%`;
    const card = document.getElementById('flashcard'); if(card) card.classList.remove('flipped', 'swipe-right', 'swipe-left');
  }

  renderVisualMatch() {
    const correctWord = this.state.learnPool[this.state.currentCardIdx];
    const wordEl = document.getElementById('vm-word'); if(wordEl) wordEl.innerText = correctWord.en;
    const countEl = document.getElementById('card-counter'); if(countEl) countEl.innerText = `${this.state.currentCardIdx + 1} / ${this.state.learnPool.length}`;
    const distractors = WORDS.filter(w => w.en !== correctWord.en).sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [correctWord, ...distractors].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('vm-grid'); 
    if(grid) { 
      grid.classList.remove('locked'); 
      grid.innerHTML = choices.map(word => `
        <div class="vm-choice glass" onclick="app.checkVisualMatch('${word.en}', this)">
          <div class="vm-emoji-display" style="font-size: 5rem; display: flex; align-items: center; justify-content: center; height: 100%;">${word.icon || '❓'}</div>
        </div>`).join(''); 
    }
    const pct = ((this.state.currentCardIdx) / this.state.learnPool.length) * 100; const sBar = document.getElementById('session-progress'); if(sBar) sBar.style.width = `${pct}%`;
  }

  checkVisualMatch(selectedEn, element) {
    const correctWord = this.state.learnPool[this.state.currentCardIdx];
    if (element.parentElement.classList.contains('locked')) return;
    
    if (selectedEn === correctWord.en) { 
      element.parentElement.classList.add('locked');
      this.state.correctCount++; element.classList.add('correct'); 
      this.playSFX('success'); this.addXP(30); this.updateMastery(selectedEn, true); 
      setTimeout(() => { this.state.currentCardIdx++; if (this.state.currentCardIdx % 3 === 0) this.preloadImages(this.state.learnPool, this.state.currentCardIdx); if (this.state.currentCardIdx >= this.state.learnPool.length) this.showFinishScreen("Oyun Tamamlandı!"); else this.renderVisualMatch(); }, 1000);
    }
    else { 
      element.classList.add('wrong', 'animate-shake'); 
      this.state.wrongCount++; this.state.failedWords.push(correctWord.en); 
      this.playSFX('click'); this.addXP(5); this.updateMastery(correctWord.en, false); 
      setTimeout(() => element.classList.remove('animate-shake'), 400);
      this.updateSidebar();
    }
  }

  updateMastery(wordEn, isSuccess) {
    let score = this.state.mastery[wordEn] || 0;
    let sr = this.state.srData[wordEn] || { interval: 0, ease: 2.5, lastReview: Date.now() };

    if (isSuccess) {
      score = Math.min(score + 1, 5);
      // SM-2 Spaced Repetition algorithm
      if (sr.interval === 0) sr.interval = 1;
      else if (sr.interval === 1) sr.interval = 6;
      else sr.interval = Math.round(sr.interval * sr.ease);
      sr.ease = Math.max(1.3, sr.ease + 0.1);
    } else {
      score = Math.max(score - 1, 0);
      sr.interval = 0;
      sr.ease = Math.max(1.3, sr.ease - 0.2);
    }

    sr.lastReview = Date.now();
    sr.nextReview = Date.now() + (sr.interval * 24 * 60 * 60 * 1000);

    this.state.mastery[wordEn] = score;
    this.state.srData[wordEn] = sr;
    localStorage.setItem('ll_mastery', JSON.stringify(this.state.mastery));
    localStorage.setItem('ll_sr_data', JSON.stringify(this.state.srData));
  }

  flipCard() { const card = document.getElementById('flashcard'); if(!card) return; card.classList.toggle('flipped'); this.playSFX('pop'); }
  answerCard(isEasy) {
    const card = document.getElementById('flashcard'); if(!card || card.classList.contains('swipe-right') || card.classList.contains('swipe-left')) return;
    const word = this.state.learnPool[this.state.currentCardIdx];
    if (isEasy) { 
      this.state.correctCount++; this.playSFX('success'); this.addXP(20); this.updateMastery(word.en, true); 
      card.classList.add('swipe-right');
    }
    else { 
      this.state.wrongCount++; this.state.failedWords.push(word.en); this.playSFX('click'); this.addXP(5); this.updateMastery(word.en, false); 
      card.classList.add('animate-shake');
      setTimeout(() => {
        card.classList.remove('animate-shake');
        card.classList.add('swipe-left');
      }, 400);
    }
    this.updateSidebar();
    const delay = isEasy ? 400 : 800;
    setTimeout(() => { this.state.currentCardIdx++; if (this.state.currentCardIdx % 5 === 0) this.preloadImages(this.state.learnPool, this.state.currentCardIdx); if (this.state.currentCardIdx >= this.state.learnPool.length) { if(this.state.timer) clearInterval(this.state.timer); this.showFinishScreen("Set Tamamlandı!"); } else this.renderFlashcard(); }, delay);
  }

  showFinishScreen(title) {
    const scene = document.getElementById('learn-game'); const finish = document.getElementById('learn-finish');
    if(scene) scene.style.display = 'none';
    if(finish) {
      finish.style.display = 'block'; document.getElementById('finish-title').innerText = title;
      document.getElementById('finish-stats').innerHTML = `<div class="f-stat"><label>Doğru/Kolay</label><span>${this.state.correctCount}</span></div><div class="f-stat"><label>Yanlış/Zor</label><span>${this.state.wrongCount}</span></div><div class="f-stat"><label>XP</label><span>+${(this.state.correctCount*20) + (this.state.wrongCount*5)}</span></div>`;
      const failedWrap = document.getElementById('failed-words-wrap'); const failedList = document.getElementById('failed-words-list');
      if (this.state.failedWords.length > 0) { failedWrap.style.display = 'block'; failedList.innerHTML = this.state.failedWords.map(w => `<li>${w}</li>`).join(''); } else { failedWrap.style.display = 'none'; }
    }
    this.playSFX('success'); this.renderNav();
  }

  // --- ANALYTICS ---
  setupAnalyticsView() {
    this.renderHeatmap();
    this.renderCategoryChart();
  }

  renderHeatmap() {
    const container = document.getElementById('learning-heatmap');
    if (!container) return;
    container.innerHTML = '';
    
    // Last 28 days
    const now = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const xp = this.state.history[dateStr] || 0;
      
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      if (xp > 500) cell.classList.add('level-3');
      else if (xp > 200) cell.classList.add('level-2');
      else if (xp > 0) cell.classList.add('level-1');
      
      cell.title = `${dateStr}: ${xp} XP`;
      container.appendChild(cell);
    }
  }

  renderCategoryChart() {
    const ctx = document.getElementById('category-chart');
    if (!ctx) return;
    
    const cats = [...new Set(WORDS.map(w => w.cat))];
    const data = cats.map(cat => {
      const pool = WORDS.filter(w => w.cat === cat);
      const learned = pool.filter(w => (this.state.mastery[w.en] || 0) >= 3).length;
      return Math.round((learned / pool.length) * 100);
    });

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: cats,
        datasets: [{
          label: 'Ustalık %',
          data: data,
          backgroundColor: 'rgba(0, 243, 255, 0.2)',
          borderColor: '#00f3ff',
          pointBackgroundColor: '#00f3ff'
        }]
      },
      options: {
        scales: { r: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.1)' }, angleLines: { color: 'rgba(255,255,255,0.1)' } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  // --- LEAGUE ---
  setupLeagueView() {
    const container = document.getElementById('league-list-container');
    if (!container) return;
    
    const users = [
      { name: 'Siz', xp: this.state.xp + (this.state.level * 500), current: true, avatar: '👤' },
      { name: 'Alex', xp: 12450, avatar: '🦊' },
      { name: 'Sarah', xp: 10200, avatar: '🐱' },
      { name: 'Mehmet', xp: 9800, avatar: '🦁' },
      { name: 'Elena', xp: 8500, avatar: '🐼' },
      { name: 'John', xp: 7200, avatar: '🐶' }
    ].sort((a, b) => b.xp - a.xp);

    container.innerHTML = users.map((u, i) => `
      <div class="league-item ${u.current ? 'current-user' : ''}">
        <span class="rank-num">${i + 1}</span>
        <div class="user-avatar">${u.avatar}</div>
        <div class="user-info">
          <span class="user-name">${u.name}</span>
          <span class="user-xp">${u.xp.toLocaleString()} Toplam XP</span>
        </div>
        ${i < 3 ? '<span>⭐</span>' : ''}
      </div>
    `).join('');
  }

  setPhraseMastery(en, level) {
    this.state.phrasesMastery[en] = Math.max(0, Math.min(2, level));
    localStorage.setItem('ll_pmast', JSON.stringify(this.state.phrasesMastery));
  }

  getDailyPhraseIdx() {
    const day = new Date().toDateString();
    let h = 0;
    for (let c of day) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    return Math.abs(h) % PHRASES.length;
  }

  checkCategoryBadge(cat) {
    const catPs = PHRASES.filter(p => p.cat === cat);
    const allDone = catPs.every(p => (this.state.phrasesMastery[p.en] || 0) >= 2);
    if (allDone && !this.state.phrasesBadges.includes(cat)) {
      this.state.phrasesBadges.push(cat);
      localStorage.setItem('ll_pbadges', JSON.stringify(this.state.phrasesBadges));
      return true;
    }
    return false;
  }

  updatePhraseStreak() {
    const today = new Date().toDateString();
    if (this.state.phraseLastDate !== today) {
      this.state.phraseStreak++;
      this.state.phraseLastDate = today;
      localStorage.setItem('ll_pstreak', this.state.phraseStreak);
      localStorage.setItem('ll_plastdate', today);
    }
  }

  refreshPhraseStats() {
    const el = document.getElementById('phrase-stats-row');
    if (el) el.innerHTML = this.buildPhraseStatsHTML();
  }

  buildPhraseStatsHTML() {
    const cats = [...new Set(PHRASES.map(p => p.cat))];
    const mastered = Object.values(this.state.phrasesMastery).filter(v => v >= 2).length;
    return `
      <div class="ps-chip ps-streak">🔥 ${this.state.phraseStreak} günlük seri</div>
      <div class="ps-chip ps-combo ${this.state.phraseCombo >= 3 ? 'ps-combo-hot' : ''}">🎯 ${this.state.phraseCombo} combo</div>
      <div class="ps-chip ps-mastered">⭐ ${mastered} ustalaşıldı</div>
      <div class="ps-chip ps-badges">🏆 ${this.state.phrasesBadges.length}/${cats.length} rozet</div>`;
  }

  // --- PHRASES ---
  setupPhrasesView() {
    // Inject stats row
    const hero = document.querySelector('.phrases-hero');
    if (hero && !document.getElementById('phrase-stats-row')) {
      const row = document.createElement('div');
      row.id = 'phrase-stats-row';
      row.className = 'phrase-stats-row';
      row.innerHTML = this.buildPhraseStatsHTML();
      hero.after(row);
    }

    // Daily challenge banner
    const dailyP = PHRASES[this.getDailyPhraseIdx()];
    const searchWrap = document.querySelector('.phrases-search-wrap');
    if (searchWrap && dailyP && !document.getElementById('daily-banner')) {
      const banner = document.createElement('div');
      banner.id = 'daily-banner';
      banner.className = 'daily-banner glass';
      banner.innerHTML = `
        <span class="daily-label">⭐ Günün Kalıbı</span>
        <span class="daily-phrase">"${dailyP.en}"</span>
        <button class="daily-go-btn" onclick="app.goToDailyChallenge()">Git →</button>`;
      searchWrap.before(banner);
    }

    const catContainer = document.getElementById('phrase-categories');
    if (!catContainer) return;
    const categories = ['all', ...new Set(PHRASES.map(p => p.cat))];
    catContainer.innerHTML = categories.map(c => {
      if (c === 'all') {
        const totalMastered = Object.values(this.state.phrasesMastery).filter(v => v >= 2).length;
        return `<button class="pcat-btn ${this.state.phraseCategory === c ? 'active' : ''}" onclick="app.setPhraseCategory('${c}', this)">✦ Hepsi <span class="cat-pct">${totalMastered}/${PHRASES.length}</span></button>`;
      }
      const catPs = PHRASES.filter(p => p.cat === c);
      const masteredN = catPs.filter(p => (this.state.phrasesMastery[p.en] || 0) >= 2).length;
      const hasBadge = this.state.phrasesBadges.includes(c);
      return `<button class="pcat-btn ${this.state.phraseCategory === c ? 'active' : ''} ${hasBadge ? 'pcat-gold' : ''}" onclick="app.setPhraseCategory('${c}', this)">${hasBadge ? '🏆' : ''} ${c} <span class="cat-pct">${masteredN}/${catPs.length}</span></button>`;
    }).join('');

    this.renderPhrases();
  }

  ratePhrase(isEasy) {
    const p = this.state.phrasePool[this.state.phraseIdx];
    if (!p) return;
    const cur = this.getPhraseMastery(p.en);

    if (isEasy) {
      this.setPhraseMastery(p.en, cur + 1);
      this.playSFX('success');
      // Rozet kontrolü
      if (this.checkCategoryBadge(p.cat)) {
        this.showToast(`🏆 "${p.cat}" rozetini kazandın!`);
        this.setupPhrasesView(); // kategori chiplerini güncelle
        return;
      }
      setTimeout(() => this.nextPhrase(), 350);
    } else {
      this.setPhraseMastery(p.en, Math.max(0, cur - 1));
      this.playSFX('click');
      // Spaced repetition: 3 kart sonra tekrar göster
      const pool = this.state.phrasePool;
      const [removed] = pool.splice(this.state.phraseIdx, 1);
      pool.splice(Math.min(this.state.phraseIdx + 3, pool.length), 0, removed);
      this.renderPhraseCard();
    }
    this.refreshPhraseStats();
  }

  goToDailyChallenge() {
    const dailyP = PHRASES[this.getDailyPhraseIdx()];
    if (!dailyP) return;
    // Find in current pool or reset to all
    this.state.phraseCategory = 'all';
    this.state.phraseSearch = '';
    this.renderPhrases();
    const idx = this.state.phrasePool.findIndex(p => p.en === dailyP.en);
    if (idx >= 0) { this.state.phraseIdx = idx; this.renderPhraseCard(); }
    this.playSFX('pop');
  }

  setPhraseCategory(cat, btn) {
    this.state.phraseCategory = cat;
    this.state.phraseIdx = 0;
    document.querySelectorAll('.pcat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.playSFX('click');
    this.renderPhrases();
  }

  filterPhrases() {
    this.state.phraseSearch = document.getElementById('phrase-search').value.toLowerCase();
    this.state.phraseIdx = 0;
    this.renderPhrases();
  }

  flipPhraseCard() {
    this.state.phraseFlipped = !this.state.phraseFlipped;
    const card = document.getElementById('pc-flip-card');
    if (card) {
      card.classList.toggle('is-flipped', this.state.phraseFlipped);
      this.playSFX('pop');
    }
  }

  shufflePhrases() {
    const pool = this.state.phrasePool;
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    this.state.phraseIdx = 0;
    this.state.phraseFlipped = false;
    if (this._phraseRec) { try { this._phraseRec.stop(); } catch(e){} this._phraseRec = null; }
    this.renderPhraseCard();
    this.playSFX('success');
    this.showToast('🔀 Kartlar karıştırıldı!');
  }

  initPhraseSwipe() {
    const scene = document.getElementById('pc-scene');
    if (!scene) return;
    let startX = 0, startY = 0, hasSwiped = false, mouseDown = false;
    const reset = () => { scene.classList.remove('show-swl', 'show-swr'); };
    const onStart = (x, y) => { startX = x; startY = y; hasSwiped = false; };
    const onMove = (x) => {
      const d = x - startX;
      scene.classList.toggle('show-swl', d < -30);
      scene.classList.toggle('show-swr', d > 30);
    };
    const onEnd = (x, y) => {
      reset();
      const dx = x - startX, dy = y - startY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        hasSwiped = true;
        if (dx < 0) this.nextPhrase(); else this.prevPhrase();
      }
    };
    scene.addEventListener('touchstart', e => onStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    scene.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
    scene.addEventListener('touchend', e => onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
    scene.addEventListener('mousedown', e => { mouseDown = true; onStart(e.clientX, e.clientY); });
    scene.addEventListener('mousemove', e => { if (mouseDown) onMove(e.clientX); });
    scene.addEventListener('mouseup', e => { if (!mouseDown) return; mouseDown = false; onEnd(e.clientX, e.clientY); });
    scene.addEventListener('mouseleave', () => { mouseDown = false; reset(); });
    scene.addEventListener('click', () => {
      if (hasSwiped) { hasSwiped = false; return; }
      this.flipPhraseCard();
    });
  }

  nextPhrase() {
    if (this.state.phraseIdx < this.state.phrasePool.length - 1) {
      this.state.phraseIdx++;
      this.state.phraseFlipped = false;
      if (this._phraseRec) { try { this._phraseRec.stop(); } catch(e){} this._phraseRec = null; }
      this.renderPhraseCard();
      this.playSFX('pop');
    }
  }

  prevPhrase() {
    if (this.state.phraseIdx > 0) {
      this.state.phraseIdx--;
      this.state.phraseFlipped = false;
      if (this._phraseRec) { try { this._phraseRec.stop(); } catch(e){} this._phraseRec = null; }
      this.renderPhraseCard();
      this.playSFX('click');
    }
  }

  renderPhrases() {
    const filtered = PHRASES.filter(p => {
      const matchCat = this.state.phraseCategory === 'all' || p.cat === this.state.phraseCategory;
      const matchSearch = p.en.toLowerCase().includes(this.state.phraseSearch) ||
                          p.tr.toLowerCase().includes(this.state.phraseSearch);
      return matchCat && matchSearch;
    });
    this.state.phrasePool = filtered;
    const badge = document.getElementById('phrase-count-badge');
    if (badge) badge.textContent = `${filtered.length} kalıp`;
    this.renderPhraseCard();
  }

  renderPhraseCard() {
    const list = document.getElementById('phrases-list');
    if (!list) return;
    const pool = this.state.phrasePool;
    const idx = this.state.phraseIdx;
    this.state.phraseFlipped = false;

    if (pool.length === 0) {
      list.innerHTML = `<div class="phrases-empty">🔍 Sonuç bulunamadı</div>`;
      return;
    }

    const CAT_ICON = {
      'Selamlaşma':'👋','Sosyal':'🤝','Seyahat':'✈️',
      'Alışveriş':'🛍️','Restoran':'🍽️','Acil':'🚨',
      'Günlük':'🌅','Tartışma':'💬','İş':'💼',
      'Deyim':'📝','Duygular':'😊'
    };

    const p = pool[idx];
    const safe = p.en.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const icon = CAT_ICON[p.cat] || '🗣️';
    const isFirst = idx === 0;
    const isLast = idx === pool.length - 1;
    const pct = ((idx + 1) / pool.length) * 100;
    const mastery = this.getPhraseMastery(p.en);
    const isDaily = PHRASES[this.getDailyPhraseIdx()]?.en === p.en;

    list.innerHTML = `
      <div class="pc-flashcard-wrap">
        <div class="pc-topbar">
          <button class="pc-nav-btn" onclick="app.prevPhrase()" ${isFirst ? 'disabled' : ''}>← Önceki</button>
          <div class="pc-topbar-center">
            <span class="pc-progress">${idx + 1} / ${pool.length}</span>
            <button class="pc-shuffle-btn" onclick="app.shufflePhrases()" title="Karıştır">🔀</button>
          </div>
          <button class="pc-nav-btn" onclick="app.nextPhrase()" ${isLast ? 'disabled' : ''}>Sonraki →</button>
        </div>
        <div class="pc-progress-bar"><div class="pc-progress-fill" style="width:${pct}%"></div></div>

        <div class="pc-scene animate-in" id="pc-scene">
          <div class="pc-swi-l">← Önceki</div>
          <div class="pc-swi-r">Sonraki →</div>
          <div class="pc-flip-card" id="pc-flip-card" data-cat="${p.cat}">
            <div class="pc-face pc-front">
              <div class="pc-front-top">
                <span class="pc-cat-badge">${icon} ${p.cat}</span>
                ${isDaily ? '<span class="pc-daily-badge">⭐ Günün Kalıbı</span>' : ''}
                <span class="pc-mastery-stars">${'⭐'.repeat(mastery)}${'☆'.repeat(2 - mastery)}</span>
              </div>
              <div class="pc-phrase-en">${p.en}</div>
              <div class="pc-flip-hint">👆 Türkçeyi görmek için tıkla</div>
              <div class="pc-back-actions">
                <button class="pc-btn-listen" onclick="event.stopPropagation(); app.speakWord('${safe}')">🔊 Dinle</button>
                <button class="pc-btn-mic" onclick="event.stopPropagation(); app.togglePhraseRecord(this, '${safe}')">🎤 Telaffuz Et</button>
              </div>
              <div class="pc-result" style="display:none">
                <div class="pc-transcript">🎙️ Dinliyorum...</div>
                <div class="pc-score-bar"><div class="pc-score-fill"></div></div>
                <div class="pc-score-label"></div>
                <div class="pc-rate-btns" style="display:none">
                  <button class="pc-rate-hard" onclick="event.stopPropagation(); app.ratePhrase(false)">😓 Zor</button>
                  <button class="pc-rate-easy" onclick="event.stopPropagation(); app.ratePhrase(true)">😎 Kolay</button>
                </div>
              </div>
            </div>
            <div class="pc-face pc-back">
              <span class="pc-cat-badge">${icon} ${p.cat}</span>
              <div class="pc-phrase-tr">${p.tr}</div>
              <div class="pc-phrase-en-small">${p.en}</div>
              <button class="pc-btn-listen" onclick="event.stopPropagation(); app.speakWord('${safe}')">🔊 Dinle</button>
            </div>
          </div>
        </div>

        <div class="pc-kb-hint desktop-only">⌨️ <b>Boşluk</b> (Çevir) &nbsp;•&nbsp; <b>←/→</b> (Önceki/Sonraki)</div>
        <div class="pc-swipe-hint mobile-only">← Kaydır: Önceki &nbsp;&nbsp;|&nbsp;&nbsp; Sonraki: Sağa →</div>
        ${isLast ? '<div class="pc-done-hint">✅ Tüm kalıpları tamamladın!</div>' : ''}
      </div>`;

    setTimeout(() => this.initPhraseSwipe(), 0);
  }

  // --- SPEAK ---
  setupSpeakView() {
    // Build waveform bars
    const wave = document.getElementById('speak-wave');
    if (wave) {
      wave.innerHTML = Array.from({length: 22}, (_, i) => {
        const h = Math.round(Math.abs(Math.sin(i * 0.72)) * 28 + 8);
        const dur = (0.38 + Math.abs(Math.sin(i * 0.5)) * 0.28).toFixed(2);
        return `<div class="wave-bar" style="--h:${h}px; --dur:${dur}s; animation-delay:${(i * 0.035).toFixed(3)}s"></div>`;
      }).join('');
    }
    this.renderSpeakChallenge();
    this.renderSpeakStats();
    this.renderSpeakHistory();
  }

  setDifficulty(diff, btn) {
    this.state.speakDifficulty = diff;
    this.state.speakIdx = 0;
    document.querySelectorAll('.diff-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (this.state.isRecording) { this.recognizer.stop(); this.stopRecording(); }
    this.renderSpeakChallenge();
    this.playSFX('click');
  }

  getCurrentSentenceText() {
    const pool = SPEAK_CHALLENGES[this.state.speakDifficulty];
    return pool[this.state.speakIdx % pool.length];
  }

  speakCurrentSentence() { this.speakWord(this.getCurrentSentenceText()); }

  renderSpeakChallenge() {
    const pool = SPEAK_CHALLENGES[this.state.speakDifficulty];
    const idx = this.state.speakIdx % pool.length;
    const text = pool[idx];

    const counter = document.getElementById('speak-counter');
    if (counter) counter.textContent = `${idx + 1} / ${pool.length}`;

    const fill = document.getElementById('speak-prog-fill');
    if (fill) fill.style.width = `${((idx + 1) / pool.length) * 100}%`;

    const wordsEl = document.getElementById('sentence-words');
    if (wordsEl) wordsEl.innerHTML = text.split(' ')
      .map((w, i) => `<span class="sw-word" data-i="${i}">${w}</span>`).join(' ');

    const res = document.getElementById('s-result');
    if (res) res.innerHTML = '';
    const sc = document.getElementById('s-score');
    if (sc) sc.style.display = 'none';
  }

  toggleRecord() {
    if (!this.recognizer) { this.showToast("Tarayıcın mikrofon API'sini desteklemiyor."); return; }
    if (this.state.isRecording) {
      this.recognizer.stop(); this.stopRecording(); return;
    }
    // Reset previous result
    const sc = document.getElementById('s-score');
    if (sc) sc.style.display = 'none';
    const res = document.getElementById('s-result');
    if (res) res.innerHTML = '<span class="listening-dot"></span> Dinliyorum...';
    document.querySelectorAll('.sw-word').forEach(el => el.className = 'sw-word');

    this.playSFX('pop');
    this.recognizer.start();
    this.state.isRecording = true;

    const btn = document.getElementById('btn-record');
    const icon = document.getElementById('rec-icon');
    const label = document.getElementById('rec-label');
    if (btn) btn.classList.add('recording');
    if (icon) icon.textContent = '⏹️';
    if (label) label.textContent = 'Durdur';
    document.getElementById('speak-wave')?.classList.add('active');
  }

  stopRecording() {
    this.state.isRecording = false;
    const btn = document.getElementById('btn-record');
    const icon = document.getElementById('rec-icon');
    const label = document.getElementById('rec-label');
    if (btn) btn.classList.remove('recording');
    if (icon) icon.textContent = '🎤';
    if (label) label.textContent = 'Konuş';
    document.getElementById('speak-wave')?.classList.remove('active');
  }

  handleSpeechResult(event) {
    const transcript = event.results[0][0].transcript.trim();
    const res = document.getElementById('s-result');
    if (res) res.innerHTML = `<em>"${transcript}"</em>`;

    const text = this.getCurrentSentenceText();
    const tWords = text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
    const sWords = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ');
    const results = tWords.map(w => sWords.includes(w));
    const score = Math.min(Math.round(results.filter(Boolean).length / tWords.length * 100), 100);

    // Word-by-word colour highlight
    document.querySelectorAll('.sw-word').forEach((el, i) => {
      el.className = 'sw-word ' + (results[i] ? 'sw-correct' : 'sw-wrong');
    });

    // Breakdown chips
    const bd = document.getElementById('word-breakdown');
    if (bd) bd.innerHTML = tWords.map((w, i) =>
      `<span class="wb-chip ${results[i] ? 'wb-ok' : 'wb-miss'}">${w}</span>`).join('');

    // Show score panel
    const sc = document.getElementById('s-score');
    if (sc) sc.style.display = 'flex';
    this.animateScoreRing(score);

    // Feedback
    let fb = '', xp = 0;
    if (score >= 90)      { fb = '🏆 Mükemmel! Anadili gibi konuştun!'; xp = 60; }
    else if (score >= 75) { fb = '🎉 Harika! Çok iyi gidiyorsun.'; xp = 40; }
    else if (score >= 55) { fb = '💪 İyi iş! Biraz daha pratik yap.'; xp = 20; }
    else                  { fb = '🔄 Tekrar dene — daha net söyle.'; xp = 5; }

    const fbEl = document.getElementById('s-feedback');
    if (fbEl) fbEl.textContent = fb;

    this.playSFX(score >= 55 ? 'success' : 'click');
    this.addXP(xp);

    // Session stats
    this.state.speakTotal++;
    this.state.speakSum += score;
    if (score > this.state.speakBest) this.state.speakBest = score;
    this.state.speakHistory.unshift({ score, snippet: text.slice(0, 28) + '…' });
    if (this.state.speakHistory.length > 6) this.state.speakHistory.pop();

    this.renderSpeakStats();
    this.renderSpeakHistory();

    // Auto-advance
    if (this.state.speakAutoAdvance && score >= 80) {
      setTimeout(() => this.nextSpeakChallenge(), 2200);
    }
  }

  animateScoreRing(score) {
    const arc = document.getElementById('score-arc');
    const numEl = document.getElementById('s-score-val');
    if (!arc) return;
    const circ = 2 * Math.PI * 50; // r=50 → ~314
    const color = score >= 75 ? '#00ff88' : score >= 50 ? '#f1c40f' : '#ff4757';
    arc.style.stroke = color;
    arc.style.strokeDasharray = circ;
    arc.style.strokeDashoffset = circ;
    // Double rAF trick to force reflow before transition
    requestAnimationFrame(() => requestAnimationFrame(() => {
      arc.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1)';
      arc.style.strokeDashoffset = circ - (score / 100) * circ;
    }));
    // Counting number animation
    if (numEl) {
      let cur = 0; const step = score / 55;
      const iv = setInterval(() => {
        cur = Math.min(cur + step, score);
        numEl.textContent = Math.round(cur);
        if (cur >= score) clearInterval(iv);
      }, 18);
    }
  }

  handleSpeechError(event) {
    this.stopRecording();
    const el = document.getElementById('s-result');
    const msg = event.error === 'not-allowed' ? 'Mikrofon izni verilmedi' : `Hata: ${event.error}`;
    if (el) el.innerHTML = `<span style="color:var(--neon-pink)">${msg}</span>`;
    this.playSFX('click');
  }

  retrySpeakChallenge() {
    if (this.state.isRecording) { this.recognizer.stop(); this.stopRecording(); }
    this.renderSpeakChallenge();
    this.playSFX('pop');
  }

  nextSpeakChallenge() {
    const pool = SPEAK_CHALLENGES[this.state.speakDifficulty];
    if (this.state.isRecording) { this.recognizer.stop(); this.stopRecording(); }
    this.state.speakIdx = (this.state.speakIdx + 1) % pool.length;
    this.renderSpeakChallenge();
    this.playSFX('pop');
  }

  renderSpeakStats() {
    const avg = this.state.speakTotal > 0
      ? Math.round(this.state.speakSum / this.state.speakTotal) : 0;
    const best = document.getElementById('ss-best');
    const avgEl = document.getElementById('ss-avg');
    const tot = document.getElementById('ss-total');
    if (best) best.textContent = this.state.speakBest > 0 ? `${this.state.speakBest}%` : '—';
    if (avgEl) avgEl.textContent = this.state.speakTotal > 0 ? `${avg}%` : '—';
    if (tot) tot.textContent = this.state.speakTotal;
  }

  renderSpeakHistory() {
    const el = document.getElementById('speak-history');
    if (!el) return;
    if (this.state.speakHistory.length === 0) {
      el.innerHTML = '<p class="sh-empty">Henüz deneme yok</p>'; return;
    }
    el.innerHTML = this.state.speakHistory.map(h => {
      const col = h.score >= 75 ? 'var(--neon-green)' : h.score >= 50 ? '#f1c40f' : '#ff4757';
      return `<div class="sh-item">
        <span class="sh-dot" style="background:${col}"></span>
        <span class="sh-text">${h.snippet}</span>
        <span class="sh-score" style="color:${col}">${h.score}%</span>
      </div>`;
    }).join('');
  }

  toggleAutoAdvance(val) { this.state.speakAutoAdvance = val; }

  togglePhraseRecord(btn, text) {
    if (!this.SpeechRecognition) { this.showToast("Tarayıcın mikrofon API'sini desteklemiyor."); return; }
    const card = btn.closest('.pc-front') || btn.closest('.pc-back') || btn.closest('.pc-card');
    const resultEl = card.querySelector('.pc-result');
    const transcriptEl = card.querySelector('.pc-transcript');
    const fillEl = card.querySelector('.pc-score-fill');
    const labelEl = card.querySelector('.pc-score-label');

    // Stop if already recording this card
    if (btn.classList.contains('recording-active')) {
      if (this._phraseRec) { this._phraseRec.stop(); this._phraseRec = null; }
      btn.innerHTML = '🎤 Telaffuz Et';
      btn.classList.remove('recording-active');
      return;
    }

    // Stop any previous recorder
    if (this._phraseRec) { try { this._phraseRec.stop(); } catch(e){} this._phraseRec = null; }
    document.querySelectorAll('.pc-btn-mic.recording-active').forEach(b => {
      b.innerHTML = '🎤 Telaffuz Et'; b.classList.remove('recording-active');
    });

    const rec = new this.SpeechRecognition();
    rec.lang = 'en-US';
    this._phraseRec = rec;

    btn.innerHTML = '⏹️ Durdur';
    btn.classList.add('recording-active');
    resultEl.style.display = 'block';
    transcriptEl.innerText = '🎙️ Dinliyorum...';
    fillEl.style.width = '0%';
    labelEl.innerText = '';
    this.playSFX('pop');

    rec.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      const tWords = text.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ');
      const sWords = spoken.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ');
      const score = Math.min(Math.round(tWords.filter(w => sWords.includes(w)).length / tWords.length * 100), 100);

      transcriptEl.innerHTML = `<em>"${spoken}"</em>`;
      fillEl.style.width = score + '%';
      fillEl.style.background = score > 70 ? 'var(--neon-green)' : score > 40 ? '#f1c40f' : 'var(--neon-pink)';
      labelEl.innerText = score > 70 ? `${score}% — Harika! 🎉` : score > 40 ? `${score}% — İyi gidiyor 💪` : `${score}% — Tekrar dene 🔄`;

      // Combo sistemi
      if (score > 70) {
        this.state.phraseCombo++;
        const c = this.state.phraseCombo;
        if (c === 3) this.showToast('🔥 3 Combo! Ateşin var!');
        else if (c === 5) this.showToast('🔥🔥 5 Combo! Muhteşem!');
        else if (c === 10) this.showToast('🏆 10 Combo! Efsane seviye!');
      } else {
        this.state.phraseCombo = 0;
      }

      // Günlük kalıp bonusu
      const dailyP = PHRASES[this.getDailyPhraseIdx()];
      const isDaily = dailyP?.en === text;
      let xp = score > 70 ? 20 : score > 40 ? 10 : 3;
      if (isDaily && score > 80) { xp *= 2; this.showToast('⭐ Günün Kalıbı tamamlandı! 2× XP!'); }
      this.addXP(xp);

      // Günlük streak güncelle
      this.updatePhraseStreak();

      // Kolay/Zor butonlarını göster
      const rateBtns = card.querySelector('.pc-rate-btns');
      if (rateBtns) rateBtns.style.display = 'flex';

      this.refreshPhraseStats();
      this.playSFX(score > 50 ? 'success' : 'click');
    };
    rec.onend = () => {
      btn.innerHTML = '🎤 Telaffuz Et';
      btn.classList.remove('recording-active');
      this._phraseRec = null;
    };
    rec.onerror = () => {
      btn.innerHTML = '🎤 Telaffuz Et';
      btn.classList.remove('recording-active');
      transcriptEl.innerText = 'Mikrofon erişimi başarısız.';
      this._phraseRec = null;
    };
    rec.start();
  }

  // --- SPELLING QUIZ ---
  startSpellingQuiz() {
    this.state.gameMode = 'spelling';
    this.state.currentCardIdx = 0;
    this.state.correctCount = 0;
    this.state.wrongCount = 0;
    this.state.failedWords = [];
    this.state.learnPool = this.state.selectedCategory === 'all'
      ? [...WORDS] : WORDS.filter(w => w.cat === this.state.selectedCategory);
    this.state.learnPool.sort(() => Math.random() - 0.5);

    document.getElementById('learn-setup').style.display = 'none';
    document.getElementById('learn-game').style.display = 'block';
    document.getElementById('learn-finish').style.display = 'none';
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('visual-match-area').style.display = 'none';
    document.getElementById('spelling-quiz-area').style.display = 'block';
    document.getElementById('timer-display').style.display = 'none';

    const title = document.getElementById('learn-title');
    if (title) title.innerText = '✍️ Yazım Testi';
    const sbCat = document.getElementById('sb-category');
    if (sbCat) sbCat.innerText = this.state.selectedCategory === 'all' ? 'Tüm Kelimeler' : this.state.selectedCategory;

    this.updateSidebar();
    this.renderSpellingQuiz();
  }

  renderSpellingQuiz() {
    const word = this.state.learnPool[this.state.currentCardIdx];
    if (!word) return;

    const counter = document.getElementById('card-counter');
    const pct = (this.state.currentCardIdx / this.state.learnPool.length) * 100;
    const sBar = document.getElementById('session-progress');
    if (counter) counter.innerText = `${this.state.currentCardIdx + 1} / ${this.state.learnPool.length}`;
    if (sBar) sBar.style.width = `${pct}%`;

    const sqIcon = document.getElementById('sq-icon');
    const sqTr = document.getElementById('sq-tr');
    const sqEx = document.getElementById('sq-ex');
    const sqLetters = document.getElementById('sq-letters');
    const sqInput = document.getElementById('sq-input');
    const sqResult = document.getElementById('sq-result');
    const sqActions = document.getElementById('sq-actions');
    const sqHintBtn = document.getElementById('sq-hint-btn');

    if (sqIcon) sqIcon.innerText = word.icon || '📚';
    if (sqTr) sqTr.innerText = word.tr;
    if (sqEx) sqEx.innerText = `"${word.ex}"`;
    if (sqInput) { sqInput.value = ''; sqInput.disabled = false; setTimeout(() => sqInput.focus(), 100); }
    if (sqResult) sqResult.innerHTML = '';
    if (sqActions) sqActions.style.display = 'none';
    if (sqHintBtn) sqHintBtn.style.display = 'inline-flex';

    // Show blank letter slots
    if (sqLetters) {
      sqLetters.innerHTML = word.en.split('').map(ch =>
        ch === ' ' ? `<span class="sq-space"></span>` : `<span class="sq-slot">_</span>`
      ).join('');
    }

    // Store answer in a hidden element for the listen button
    let answerEl = document.getElementById('sq-answer');
    if (!answerEl) { answerEl = document.createElement('span'); answerEl.id = 'sq-answer'; answerEl.style.display = 'none'; document.body.appendChild(answerEl); }
    answerEl.dataset.word = word.en;
  }

  showSpellingHint() {
    const word = this.state.learnPool[this.state.currentCardIdx];
    if (!word) return;
    const input = document.getElementById('sq-input');
    const hintBtn = document.getElementById('sq-hint-btn');
    if (input && !input.value) {
      input.value = word.en[0];
      input.focus();
    }
    if (hintBtn) hintBtn.style.display = 'none';
    this.playSFX('pop');
  }

  handleSpellingKey(e) {
    if (e.code === 'Enter') { e.preventDefault(); this.checkSpellingAnswer(); }
  }

  checkSpellingAnswer() {
    const word = this.state.learnPool[this.state.currentCardIdx];
    if (!word) return;
    const input = document.getElementById('sq-input');
    if (!input || input.disabled) return;

    const typed = input.value.trim();
    if (!typed) { input.focus(); return; }

    const correct = word.en.toLowerCase();
    const guess = typed.toLowerCase();
    const isCorrect = guess === correct;

    input.disabled = true;

    // Build letter-by-letter result
    const resultEl = document.getElementById('sq-result');
    const actionsEl = document.getElementById('sq-actions');
    const lettersEl = document.getElementById('sq-letters');

    // Colour slots
    if (lettersEl) {
      let slotIdx = 0;
      const slots = lettersEl.querySelectorAll('.sq-slot');
      word.en.split('').filter(ch => ch !== ' ').forEach((ch, i) => {
        const slot = slots[i];
        if (!slot) return;
        slot.innerText = ch;
        if (guess[i] === ch.toLowerCase()) slot.classList.add('sq-correct');
        else if (guess.includes(ch.toLowerCase())) slot.classList.add('sq-present');
        else slot.classList.add('sq-absent');
      });
    }

    if (isCorrect) {
      this.state.correctCount++;
      this.addXP(40);
      this.updateMastery(word.en, true);
      this.playSFX('success');
      if (resultEl) resultEl.innerHTML = `<span class="sq-msg sq-win">✅ Mükemmel! +40 XP</span>`;
      this.updateSqSidebar();
      setTimeout(() => this.nextSpelling(), 1200);
    } else {
      this.state.wrongCount++;
      this.state.failedWords.push(word.en);
      this.addXP(5);
      this.updateMastery(word.en, false);
      this.playSFX('click');
      if (resultEl) resultEl.innerHTML = `<span class="sq-msg sq-fail">❌ Doğrusu: <strong>${word.en}</strong></span>`;
      if (actionsEl) actionsEl.style.display = 'flex';
      this.updateSqSidebar();
    }
  }

  updateSqSidebar() {
    const c = document.getElementById('sq-sb-correct');
    const w = document.getElementById('sq-sb-wrong');
    if (c) c.innerText = this.state.correctCount;
    if (w) w.innerText = this.state.wrongCount;
    this.updateSidebar();
  }

  nextSpelling() {
    this.state.currentCardIdx++;
    if (this.state.currentCardIdx >= this.state.learnPool.length) {
      this.showFinishScreen('Yazım Testi Bitti!');
    } else {
      this.renderSpellingQuiz();
    }
  }

  initSwipeGestures() {
    const scene = document.getElementById('card-scene');
    if (!scene) return;
    let startX = 0, startY = 0, isDragging = false;
    const leftInd = document.querySelector('.swipe-left-indicator');
    const rightInd = document.querySelector('.swipe-right-indicator');

    const onStart = (x, y) => { startX = x; startY = y; isDragging = true; };
    const onMove = (x) => {
      if (!isDragging) return;
      const dx = x - startX;
      const threshold = 40;
      if (leftInd) leftInd.classList.toggle('visible', dx < -threshold);
      if (rightInd) rightInd.classList.toggle('visible', dx > threshold);
    };
    const onEnd = (x) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = x - startX;
      if (leftInd) leftInd.classList.remove('visible');
      if (rightInd) rightInd.classList.remove('visible');
      if (Math.abs(dx) > 80) { this.answerCard(dx > 0); }
    };

    scene.addEventListener('touchstart', e => onStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    scene.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
    scene.addEventListener('touchend', e => onEnd(e.changedTouches[0].clientX));

    let mouseDown = false;
    scene.addEventListener('mousedown', e => { mouseDown = true; onStart(e.clientX, e.clientY); });
    document.addEventListener('mousemove', e => { if (mouseDown) onMove(e.clientX); });
    document.addEventListener('mouseup', e => { if (mouseDown) { mouseDown = false; onEnd(e.clientX); } });
  }

  showToast(msg) { const container = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = msg; container.appendChild(t); setTimeout(() => { t.style.animation = 'toastSlide 0.4s reverse forwards'; setTimeout(() => t.remove(), 400); }, 3000); }
  spawnClickParticles(x, y) {
    const colors = ['#00f3ff', '#bc13fe', '#ff007f'];
    for(let i=0; i<6; i++) {
      const p = document.createElement('div'); p.className = 'particle-fx'; p.style.left = x + 'px'; p.style.top = y + 'px';
      const size = Math.random() * 6 + 4; p.style.width = size + 'px'; p.style.height = size + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2; const dist = Math.random() * 40 + 20;
      p.style.setProperty('--tx', Math.cos(angle)*dist + 'px'); p.style.setProperty('--ty', Math.sin(angle)*dist + 'px');
      document.body.appendChild(p); setTimeout(() => p.remove(), 800);
    }
  }
}
const app = new LingoApp();
