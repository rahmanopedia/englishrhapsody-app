/**
 * RHAPSODY SPEAK V2.2 — Gelişmiş Telaffuz Koçu
 * Features: Syllable stress guide, WPM measurement, Fluency score,
 *           Sentence history (localStorage), Shuffle, Auto-advance,
 *           Shadow mode, Audio playback, Streak, XP integration
 */
class SpeakV2Module {
  constructor() {
    this.el = null;
    this._userCefr = 'B1';
    this._pool = [];
    this.idx = 0;
    this.status = 'idle';
    this.result = null;
    this.liveTranscript = '';
    this.isSpeaking = false;
    this.speechRate = 1;

    // Feature toggles
    this.shuffleMode = false;
    this.autoAdvance = false;
    this.shadowMode = false;

    // Session data
    this.sessionScores = [];
    this.streak = 0;
    this.sessionCount = 0;
    this._lowScoreMap = {};

    // Timing
    this._recordStart = 0;

    // Timers
    this._shadowTimer = null;
    this._autoTimer = null;

    // Speech API refs
    this._recognition = null;
    this._animFrame = null;
    this._gen = 0;
    this._isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition || window.Capacitor?.Plugins?.NativeSpeech);
  }

  // ─── Config ────────────────────────────────────────────────────────────────

  get _levelConfig() {
    const map = {
      A1: { label: 'Başlangıç',  color: '#10b981', glow: 'rgba(16,185,129,0.4)'  },
      A2: { label: 'Temel',      color: '#06b6d4', glow: 'rgba(6,182,212,0.4)'   },
      B1: { label: 'Orta Altı',  color: '#3b82f6', glow: 'rgba(59,130,246,0.4)'  },
      B2: { label: 'Orta Üstü',  color: '#8b5cf6', glow: 'rgba(139,92,246,0.4)'  },
      C1: { label: 'İleri',      color: '#f59e0b', glow: 'rgba(245,158,11,0.4)'  },
      C2: { label: 'Ustalaşmış', color: '#ef4444', glow: 'rgba(239,68,68,0.4)'   },
    };
    return map[this._userCefr] || map['B1'];
  }

  get _sentences() { return this._pool; }

  get _currentSentence() { return this._pool[this.idx] || ''; }

  get _avgScore() {
    if (!this.sessionScores.length) return null;
    return Math.round(this.sessionScores.reduce((a, b) => a + b, 0) / this.sessionScores.length);
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  // Cümlenin gerçek zorluğunu kelime sayısı + uzunluk + CEFR'e göre hesapla
  _sentenceLevel(sentence, wordCefr) {
    const LNUM = { A1:1, A2:2, B1:3, B2:4, C1:5, C2:6 };
    const words  = sentence.split(/\s+/);
    const wc     = words.length;
    const avgLen = words.reduce((s, w) => s + w.replace(/[^a-z]/gi, '').length, 0) / wc;
    const lnum   = LNUM[wordCefr] || 3;
    const score  = wc * 0.5 + avgLen * 0.3 + lnum * 2.2;
    if (score <  7)  return 'A1';
    if (score < 11)  return 'A2';
    if (score < 15)  return 'B1';
    if (score < 19)  return 'B2';
    if (score < 23)  return 'C1';
    return 'C2';
  }

  // WORDS'dan kullanıcının CEFR seviyesine göre cümle havuzu oluştur
  _buildPool(cefr) {
    if (typeof WORDS === 'undefined') return;
    const LEVELS = ['A1','A2','B1','B2','C1','C2'];
    const cefrIdx = LEVELS.indexOf(cefr);

    // Cümleyi hem kelime seviyesi hem gerçek cümle zorluğuna göre filtrele
    const collect = (lvl) => WORDS
      .filter(w => w.level === lvl && w.ex && w.ex.trim().split(/\s+/).length >= 4)
      .filter(w => {
        const sl    = this._sentenceLevel(w.ex.trim(), w.level);
        const slIdx = LEVELS.indexOf(sl);
        // Cümle zorluğu kullanıcı seviyesini geçmesin (daha kolay cümleler OK)
        return slIdx <= cefrIdx;
      })
      .map(w => w.ex.trim());

    let pool = collect(cefr);

    // Havuz çok küçükse komşu seviyeleri de ekle
    if (pool.length < 20) {
      if (cefrIdx > 0) pool = pool.concat(collect(LEVELS[cefrIdx - 1]));
      if (cefrIdx < LEVELS.length - 1) pool = pool.concat(collect(LEVELS[cefrIdx + 1]));
    }

    // Tekrar eden cümleleri temizle ve karıştır
    this._pool = [...new Set(pool)].sort(() => Math.random() - 0.5);
  }

  async init(el) {
    this.el = el;
    this._userCefr = window._app?.state?.get('cefrLevel') || 'B1';
    this._buildPool(this._userCefr);
    this._render();
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  _render() {
    if (!this.el) return;
    const lc   = this._levelConfig;
    const circ = 2 * Math.PI * 28;

    this.el.innerHTML = `
      <div class="sv2-wrap">

        <div class="sv2-settings">
          <button class="sv2-toggle${this.shuffleMode  ? ' on' : ''}" id="sv2-t-shuffle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Karıştır
          </button>
          <button class="sv2-toggle${this.autoAdvance  ? ' on' : ''}" id="sv2-t-auto">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Otomatik
          </button>
          <button class="sv2-toggle${this.shadowMode   ? ' on' : ''}" id="sv2-t-shadow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Gölge
          </button>
        </div>

        <div class="sv2-stats">
          <span class="sv2-cefr-pill" style="background:${lc.color}20;color:${lc.color};border:1px solid ${lc.color}44">${this._userCefr || 'B1'} — ${lc.label}</span>
          <span class="sv2-stat-sep">·</span>
          <span class="sv2-stat">🔥 <strong id="sv2-streak-num">${this.streak}</strong></span>
          <span class="sv2-stat-sep">·</span>
          <span class="sv2-stat">📊 <strong id="sv2-avg-num">${this._avgScore !== null ? this._avgScore + '%' : '—'}</strong></span>
          <span class="sv2-stat-sep">·</span>
          <span class="sv2-stat">✅ <strong id="sv2-count-num">${this.sessionCount}</strong></span>
        </div>

        <div class="sv2-card" id="sv2-card">
          <p class="sv2-sentence" id="sv2-sentence">"${this._esc(this._currentSentence)}"</p>
          <p class="sv2-live" id="sv2-live"></p>
        </div>

        <div class="sv2-nav">
          <button class="sv2-nav-btn" id="sv2-prev"${this.idx === 0 && !this.shuffleMode ? ' disabled' : ''}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span class="sv2-counter">
            Cümle <strong id="sv2-idx-num" style="color:${lc.color}">${this.idx + 1}</strong>
            / <span style="color:#f1f5f9">${this._pool.length}</span>
          </span>
          <button class="sv2-nav-btn" id="sv2-next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div class="sv2-audio-btns">
          <button class="sv2-audio-btn sv2-btn-play" id="sv2-play">
            <span class="sv2-aico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            <small>Play</small>
          </button>
          <button class="sv2-audio-btn sv2-btn-slow" id="sv2-slow">
            <span class="sv2-aico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <small>Yavaş</small>
          </button>
          <button class="sv2-audio-btn sv2-btn-repeat" id="sv2-repeat">
            <span class="sv2-aico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg></span>
            <small>Tekrar</small>
          </button>
        </div>

        <div class="sv2-mic-section">
          ${!this._isSupported ? `<div class="sv2-unsupported">⚠️ Ses tanıma Chrome veya Edge'de çalışır.</div>` : ''}

          <div class="sv2-mic-wrap" id="sv2-mic-wrap">
            <div class="sv2-ring" id="sv2-r1"></div>
            <div class="sv2-ring" id="sv2-r2"></div>
            <div class="sv2-ring" id="sv2-r3"></div>
            <button class="sv2-mic-btn" id="sv2-mic"${!this._isSupported ? ' disabled' : ''}>
              <span id="sv2-mic-icon">${this._micIconSvg(32)}</span>
            </button>
          </div>

          <div class="sv2-waveform" id="sv2-waveform">
            ${Array.from({length: 20}, (_, i) => `<div class="sv2-bar" id="sv2-b${i}"></div>`).join('')}
          </div>

          <div class="sv2-status" id="sv2-status">Mikrofona dokun ve cümleyi söyle</div>

          <div class="sv2-score-panel" id="sv2-score-panel">
            <!-- Accuracy ring + label + XP -->
            <div class="sv2-score-card">
              <div class="sv2-ring-wrap">
                <svg width="72" height="72" viewBox="0 0 72 72" style="display:block">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
                  <circle id="sv2-arc" cx="36" cy="36" r="28" fill="none" stroke="#10b981" stroke-width="4"
                    stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}"
                    style="transform:rotate(-90deg);transform-origin:36px 36px;transition:stroke-dashoffset 1s ease-out,stroke 0.3s"/>
                </svg>
                <div class="sv2-ring-center">
                  <span class="sv2-score-num" id="sv2-score-num">0</span>
                  <span class="sv2-score-pct">%</span>
                </div>
              </div>
              <div class="sv2-score-info">
                <div class="sv2-score-top">
                  <p class="sv2-score-label" id="sv2-score-label"></p>
                  <span class="sv2-xp-badge" id="sv2-xp-badge"></span>
                </div>
                <p class="sv2-score-said" id="sv2-score-said"></p>
              </div>
            </div>

            <!-- Fluency + WPM metrics -->
            <div class="sv2-metrics" id="sv2-metrics"></div>

            <!-- Word breakdown -->
            <div class="sv2-word-breakdown" id="sv2-word-breakdown"></div>

            <!-- Playback -->
            <button class="sv2-playback-btn" id="sv2-playback" style="display:none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              Sesi Dinle
            </button>

            <!-- Sentence history from localStorage -->
            <div class="sv2-sent-hist" id="sv2-sent-hist"></div>

            <!-- Session dots -->
            <div class="sv2-hist" id="sv2-hist"></div>

            <div class="sv2-result-btns">
              <button class="sv2-rbtn sv2-rbtn-ghost" id="sv2-try-again">Tekrar Dene</button>
              <button class="sv2-rbtn sv2-rbtn-primary" id="sv2-next-score">Sonraki →</button>
            </div>
          </div>
        </div>

      </div>
    `;

    this._applyLevelStyle();
    this._bindEvents();
  }

  _applyLevelStyle() {
    const lc   = this._levelConfig;
    const card = this.el?.querySelector('#sv2-card');
    if (card) card.style.boxShadow = `0 0 40px ${lc.glow.replace('0.4','0.12')}, inset 0 1px 0 rgba(255,255,255,0.06)`;
  }

  _bindEvents() {
    if (!this.el) return;
    const q = id => this.el.querySelector(id);

    q('#sv2-t-shuffle')?.addEventListener('click', () => {
      this.shuffleMode = !this.shuffleMode;
      q('#sv2-t-shuffle').classList.toggle('on', this.shuffleMode);
    });
    q('#sv2-t-auto')?.addEventListener('click', () => {
      this.autoAdvance = !this.autoAdvance;
      q('#sv2-t-auto').classList.toggle('on', this.autoAdvance);
    });
    q('#sv2-t-shadow')?.addEventListener('click', () => {
      this.shadowMode = !this.shadowMode;
      q('#sv2-t-shadow').classList.toggle('on', this.shadowMode);
      if (this.shadowMode && this.status === 'idle') this._startShadow();
    });

    q('#sv2-prev')?.addEventListener('click',       () => this._prev());
    q('#sv2-next')?.addEventListener('click',       () => this._next());
    q('#sv2-play')?.addEventListener('click',       () => this._speak(1));
    q('#sv2-slow')?.addEventListener('click',       () => { this.speechRate = 0.6; this._speak(0.6); });
    q('#sv2-repeat')?.addEventListener('click',     () => this._speak(this.speechRate));
    q('#sv2-mic')?.addEventListener('click',        () => this._toggleRecord());
    q('#sv2-try-again')?.addEventListener('click',  () => this._reset());
    q('#sv2-next-score')?.addEventListener('click', () => this._next());
  }

  // ─── Navigation ────────────────────────────────────────────────────────────


  _prev() {
    this._clearTimers(); this._stopAll(); window.speechSynthesis?.cancel();
    this.idx = Math.max(0, this.idx - 1);
    this.status = 'idle'; this.result = null; this.liveTranscript = ''; this._audioUrl = null; this._audioEl = null;
    this._updateSentenceUI();
  }

  _next() {
    this._clearTimers(); this._stopAll(); window.speechSynthesis?.cancel();
    this.idx = this.shuffleMode ? this._shuffleNextIdx() : Math.min(this.idx + 1, this._sentences.length - 1);
    this.status = 'idle'; this.result = null; this.liveTranscript = ''; this._audioUrl = null; this._audioEl = null;
    this._updateSentenceUI();
    if (this.shadowMode) this._startShadow();
  }

  _shuffleNextIdx() {
    const len = this._sentences.length;
    if (len <= 1) return 0;
    const low = Object.entries(this._lowScoreMap)
      .filter(([i, s]) => Number(i) !== this.idx && s < 60).map(([i]) => Number(i));
    if (low.length && Math.random() < 0.4) return low[Math.floor(Math.random() * low.length)];
    let n; do { n = Math.floor(Math.random() * len); } while (n === this.idx);
    return n;
  }

  _updateSentenceUI() {
    const lc  = this._levelConfig;
    const q   = id => this.el?.querySelector(id);

    const sentEl = q('#sv2-sentence');
    if (sentEl) sentEl.textContent = `"${this._currentSentence}"`;

    const idxEl = q('#sv2-idx-num');
    if (idxEl) { idxEl.textContent = this.idx + 1; idxEl.style.color = lc.color; }

    const prev = q('#sv2-prev');
    if (prev) prev.disabled = this.idx === 0 && !this.shuffleMode;

    const live = q('#sv2-live');
    if (live) live.textContent = '';

    const panel = q('#sv2-score-panel');
    if (panel) panel.classList.remove('visible');

    this._applyLevelStyle();
    this._updateMicState();
    this._setStatusText('idle');
  }

  // ─── Shadow mode ───────────────────────────────────────────────────────────

  _startShadow() {
    if (this._shadowTimer) { clearTimeout(this._shadowTimer); this._shadowTimer = null; }
    this._setStatusText('shadow');
    this._speak(1, () => {
      this._shadowTimer = setTimeout(() => {
        this._shadowTimer = null;
        if (this.status === 'idle') this._startRecording();
      }, 600);
    });
  }

  _speak(rate, onEnd) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt  = new SpeechSynthesisUtterance(this._currentSentence);
    utt.lang   = 'en-US'; utt.rate = rate;
    utt.onstart = () => { this.isSpeaking = true; };
    utt.onend   = () => { this.isSpeaking = false; if (onEnd) onEnd(); };
    utt.onerror = () => { this.isSpeaking = false; };
    window.speechSynthesis.speak(utt);
  }

  // ─── Recording ─────────────────────────────────────────────────────────────

  _toggleRecord() {
    if (this.status === 'recording') {
      this._stopRecording();
    } else {
      this._reset();
      this._startRecording();
    }
  }

  _startRecording() {
    const NS = window.Capacitor?.Plugins?.NativeSpeech;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!NS && !SR) return;

    this._gen = (this._gen || 0) + 1;
    const myGen = this._gen;

    this.result = null;
    this.liveTranscript = '';
    this.status = 'recording';
    this._recordStart = Date.now();
    this._updateMicState();
    this._setStatusText('recording');

    // ── Native Capacitor path ──────────────────────────────────────
    if (NS) {
      this._recognition = { stop: () => NS.stop().catch(() => {}), _native: true };
      const setErr = (msg) => {
        const el = this.el?.querySelector('#sv2-status');
        if (el) { el.className = 'sv2-status sv2-s-err'; el.innerHTML = msg; }
      };
      Promise.all([
        NS.addListener('partial', e => {
          if (this._gen !== myGen) return;
          this.liveTranscript = e.text;
          const live = this.el?.querySelector('#sv2-live');
          if (live) live.textContent = `"${e.text}"`;
        }),
        NS.addListener('result', e => {
          if (this._gen !== myGen) return;
          this.liveTranscript = e.text;
          const live = this.el?.querySelector('#sv2-live');
          if (live) live.textContent = `"${e.text}"`;
        }),
        NS.addListener('error', e => {
          if (this._gen !== myGen) return;
          this._gen++;
          NS.removeAllListeners();
          this._cleanupRec();
          const msgs = {
            'not-allowed': '⚠️ Mikrofon izni reddedildi.',
            'no-speech':   'Ses algılanamadı. Tekrar dene.',
            'network':     '⚠️ İnternet bağlantısı gerekli.',
            'busy':        '⚠️ Mikrofon başka uygulama tarafından kullanılıyor.',
          };
          setErr(msgs[e.code] || '⚠️ Hata: ' + e.code);
        }),
        NS.addListener('end', () => {
          if (this._gen !== myGen) return;
          const durationMs = Date.now() - this._recordStart;
          const spoken = this.liveTranscript.trim();
          NS.removeAllListeners();
          this._cleanupRec();
          if (!spoken) { this._setStatusText('idle'); return; }
          this.status = 'processing';
          this._updateMicState();
          this._setStatusText('processing');
          const gen = this._gen;
          setTimeout(() => {
            if (this._gen !== gen) return;
            const scored  = this._score(this._currentSentence, spoken);
            const wpm     = this._calcWPM(spoken, durationMs);
            const fluency = this._calcFluency(scored.score, wpm, this._currentSentence, spoken);
            this.result = { transcript: spoken, wpm, fluency, ...scored };
            this.status = 'done';
            this.sessionScores.push(scored.score);
            if (this.sessionScores.length > 20) this.sessionScores.shift();
            this.sessionCount++;
            this.streak = scored.score >= 50 ? this.streak + 1 : 0;
            const prev = this._lowScoreMap[this.idx];
            if (prev === undefined || scored.score < prev) this._lowScoreMap[this.idx] = scored.score;
            const xp = this._awardXP(scored.score);
            this.result.xp = xp;
            this._saveToHistory({ score: scored.score, wpm, fluency,
              date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) });
            this._updateMicState();
            this._setStatusText('done');
            this._updateStats();
            this._showScore();
            if (this.autoAdvance && scored.score >= 80) {
              this._autoTimer = setTimeout(() => this._next(), 2000);
            }
          }, 400);
        }),
      ]).then(() => NS.start().catch(err => {
        this._gen++;
        NS.removeAllListeners();
        this._cleanupRec();
        setErr('⚠️ Mikrofon başlatılamadı: ' + err.message);
      }));
      return;
    }

    // ── Web SpeechRecognition path (tarayıcı) ──────────────────────
    const rec = new SR();
    this._recognition = rec;
    rec.lang            = 'en-US';
    rec.continuous      = false;
    rec.interimResults  = true;
    rec.maxAlternatives = 1;

    rec.onresult = e => {
      if (this._gen !== myGen) return;
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      this.liveTranscript = final || interim;
      const live = this.el?.querySelector('#sv2-live');
      if (live && this.liveTranscript) live.textContent = `"${this.liveTranscript}"`;
    };

    rec.onerror = e => {
      if (this._gen !== myGen) return;
      this._gen++;
      this._cleanupRec();
      const msgs = {
        'not-allowed':   '⚠️ Mikrofon izni gerekli. Adres çubuğundaki kilit ikonuna tıkla → Mikrofon → İzin ver.',
        'no-speech':     'Ses algılanamadı. Tekrar dene.',
        'audio-capture': '⚠️ Mikrofon bulunamadı veya başka uygulama kullanıyor.',
        'network':       '⚠️ İnternet bağlantısı gerekli.',
        'aborted':       '',
      };
      const el = this.el?.querySelector('#sv2-status');
      const msg = msgs[e.error];
      if (el && msg !== undefined) { el.className = 'sv2-status sv2-s-err'; el.innerHTML = msg; }
      else if (el) { el.className = 'sv2-status sv2-s-err'; el.innerHTML = '⚠️ Hata: ' + e.error; }
    };

    rec.onend = () => {
      if (this._gen !== myGen) return;
      const durationMs = Date.now() - this._recordStart;
      const spoken = this.liveTranscript.trim();
      this._cleanupRec();

      if (!spoken) {
        this._setStatusText('idle');
        return;
      }

      this.status = 'processing';
      this._updateMicState();
      this._setStatusText('processing');

      const gen = this._gen;
      setTimeout(() => {
        if (this._gen !== gen) return;

        const scored  = this._score(this._currentSentence, spoken);
        const wpm     = this._calcWPM(spoken, durationMs);
        const fluency = this._calcFluency(scored.score, wpm, this._currentSentence, spoken);

        this.result = { transcript: spoken, wpm, fluency, ...scored };
        this.status = 'done';

        this.sessionScores.push(scored.score);
        if (this.sessionScores.length > 20) this.sessionScores.shift();
        this.sessionCount++;
        this.streak = scored.score >= 50 ? this.streak + 1 : 0;

        const prev = this._lowScoreMap[this.idx];
        if (prev === undefined || scored.score < prev) this._lowScoreMap[this.idx] = scored.score;

        const xp = this._awardXP(scored.score);
        this.result.xp = xp;

        this._saveToHistory({ score: scored.score, wpm, fluency,
          date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) });

        this._updateMicState();
        this._setStatusText('done');
        this._updateStats();
        this._showScore();

        if (this.autoAdvance && scored.score >= 80) {
          this._autoTimer = setTimeout(() => this._next(), 2000);
        }
      }, 400);
    };

    try {
      rec.start();
    } catch (err) {
      this._gen++;
      this._cleanupRec();
      const el = this.el?.querySelector('#sv2-status');
      if (el) { el.className = 'sv2-status sv2-s-err'; el.innerHTML = '⚠️ Mikrofon başlatılamadı: ' + err.message; }
      return;
    }
    this._startWaveform();
  }

  // Kullanıcı stop'a bastığında — onend devam eder, konuşma işlenir
  _stopRecording() {
    if (this._recognition) { try { this._recognition.stop(); } catch {} }
  }

  // Recognition + animasyonu durdurur, status'u idle'a çeker
  _cleanupRec() {
    if (this._recognition) { try { this._recognition.stop(); } catch {} this._recognition = null; }
    if (this._animFrame)   { clearTimeout(this._animFrame); this._animFrame = null; }
    this._resetBars();
    this.status = 'idle';
    this._updateMicState();
  }

  // Navigasyon / seviye değişimi — her şeyi iptal eder
  _stopAll() {
    if (this._recognition) { try { this._recognition.stop(); } catch {} this._recognition = null; }
    if (this._animFrame)   { clearTimeout(this._animFrame); this._animFrame = null; }
    this._gen = (this._gen || 0) + 1;
    this._resetBars();
  }

  _clearTimers() {
    if (this._shadowTimer) { clearTimeout(this._shadowTimer); this._shadowTimer = null; }
    if (this._autoTimer)   { clearTimeout(this._autoTimer);   this._autoTimer   = null; }
  }

  _resetBars() {
    for (let i = 0; i < 20; i++) {
      const b = this.el?.querySelector(`#sv2-b${i}`);
      if (b) { b.style.height = '4px'; b.style.background = 'rgba(255,255,255,0.1)'; b.style.boxShadow = 'none'; }
    }
  }

  _startWaveform() {
    const bars = [];
    for (let i = 0; i < 20; i++) {
      const b = this.el?.querySelector(`#sv2-b${i}`);
      if (b) bars.push(b);
    }
    const tick = () => {
      if (this.status !== 'recording') return;
      for (const b of bars) b.style.height = `${4 + Math.random() * 36}px`;
      this._animFrame = setTimeout(tick, 100);
    };
    tick();
  }

  // ─── Scoring ───────────────────────────────────────────────────────────────

  _normalizeNums(s) {
    const h  = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
    const nw = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven',
      'twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty',
      'twenty one','twenty two','twenty three','twenty four','twenty five','twenty six','twenty seven',
      'twenty eight','twenty nine','thirty','thirty one','thirty two','thirty three','thirty four',
      'thirty five','thirty six','thirty seven','thirty eight','thirty nine','forty','forty one',
      'forty two','forty three','forty four','forty five','forty six','forty seven','forty eight',
      'forty nine','fifty','fifty one','fifty two','fifty three','fifty four','fifty five','fifty six',
      'fifty seven','fifty eight','fifty nine','sixty','sixty one','sixty two','sixty three','sixty four',
      'sixty five','sixty six','sixty seven','sixty eight','sixty nine','seventy','seventy one',
      'seventy two','seventy three','seventy four','seventy five','seventy six','seventy seven',
      'seventy eight','seventy nine','eighty','eighty one','eighty two','eighty three','eighty four',
      'eighty five','eighty six','eighty seven','eighty eight','eighty nine','ninety','ninety one',
      'ninety two','ninety three','ninety four','ninety five','ninety six','ninety seven','ninety eight',
      'ninety nine','one hundred'];
    const ord = ['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth',
      'eleventh','twelfth'];
    // "7:00" → "seven o'clock", "7:30" → "seven thirty"
    s = s.replace(/\b(\d{1,2}):00\b/g, (_, n) => (h[+n] || n) + " o'clock");
    s = s.replace(/\b(\d{1,2}):(\d{2})\b/g, (_, n, m) => (h[+n] || n) + ' ' + (nw[+m] || m));
    // ordinals: "1st" → "first"
    s = s.replace(/\b(\d+)(st|nd|rd|th)\b/gi, (_, n) => ord[+n] || _);
    // standalone numbers 0–100
    s = s.replace(/\b(\d+)\b/g, n => nw[+n] !== undefined ? nw[+n] : n);
    return s;
  }

  _score(target, spoken) {
    const norm = s => this._normalizeNums(s.toLowerCase()).replace(/[^a-z\s']/g, '').replace(/\s+/g, ' ').trim();
    const tw = norm(target).split(' ');
    const sw = norm(spoken).split(' ');
    const words = tw.map((w, i) => ({ word: w, correct: sw[i] === w }));
    const score = Math.round((words.filter(w => w.correct).length / tw.length) * 100);
    return { score, words };
  }

  _calcWPM(spoken, durationMs) {
    if (durationMs < 500) return 0;
    const wordCount = spoken.trim().split(/\s+/).length;
    const mins = durationMs / 60000;
    return Math.round(wordCount / mins);
  }

  _calcFluency(accuracy, wpm, targetSentence, spoken) {
    // Completeness: ratio of spoken words to target words
    const tw = targetSentence.trim().split(/\s+/).length;
    const sw = spoken.trim().split(/\s+/).length;
    const completeness = Math.min(1, sw / tw) * 100;

    // Rhythm: ideal ~105 WPM for learners, ±30 is good
    const idealWpm = 105;
    const rhythm = Math.max(0, 100 - Math.abs(wpm - idealWpm) * 1.4);

    return Math.round(accuracy * 0.55 + completeness * 0.25 + rhythm * 0.2);
  }

  _awardXP(score) {
    let xp = score >= 80 ? 10 : score >= 60 ? 6 : score >= 40 ? 3 : 1;
    if (this.streak > 0 && this.streak % 5 === 0) xp += 3;
    const app = window._app || window.app;
    if (app && typeof app.addXP === 'function') app.addXP(xp, 'medium', 'speak');
    return xp;
  }

  // ─── History (localStorage) ────────────────────────────────────────────────

  _histKey()  { return `sv2_${this._userCefr}_${this.idx}`; }

  _saveToHistory(entry) {
    try {
      const hist = this._loadFromHistory();
      hist.push({ ...entry, ts: Date.now() });
      if (hist.length > 10) hist.splice(0, hist.length - 10);
      localStorage.setItem(this._histKey(), JSON.stringify(hist));
    } catch {}
  }

  _loadFromHistory() {
    try { return JSON.parse(localStorage.getItem(this._histKey()) || '[]'); }
    catch { return []; }
  }

  // ─── UI Updates ────────────────────────────────────────────────────────────

  _updateStats() {
    const q = id => this.el?.querySelector(id);
    const s = q('#sv2-streak-num'); if (s) s.textContent = this.streak;
    const a = q('#sv2-avg-num');    if (a) a.textContent = this._avgScore !== null ? this._avgScore + '%' : '—';
    const c = q('#sv2-count-num');  if (c) c.textContent = this.sessionCount;
  }

  _updateMicState() {
    const btn    = this.el?.querySelector('#sv2-mic');
    const iconEl = this.el?.querySelector('#sv2-mic-icon');
    if (!btn || !iconEl) return;
    const r1 = this.el.querySelector('#sv2-r1');
    const r2 = this.el.querySelector('#sv2-r2');
    const r3 = this.el.querySelector('#sv2-r3');

    btn.classList.remove('sv2-recording', 'sv2-processing');
    [r1,r2,r3].forEach(r => r?.classList.remove('sv2-ring-a1','sv2-ring-a2','sv2-ring-a3'));

    if (this.status === 'recording') {
      btn.classList.add('sv2-recording');
      r1?.classList.add('sv2-ring-a1'); r2?.classList.add('sv2-ring-a2'); r3?.classList.add('sv2-ring-a3');
      iconEl.innerHTML = this._micOffSvg(); btn.disabled = false;
    } else if (this.status === 'processing') {
      btn.classList.add('sv2-processing');
      iconEl.innerHTML = '<div class="sv2-spinner"></div>'; btn.disabled = true;
    } else {
      iconEl.innerHTML = this._micIconSvg(32); btn.disabled = !this._isSupported;
    }

    for (let i = 0; i < 20; i++) {
      const b = this.el?.querySelector(`#sv2-b${i}`); if (!b) continue;
      b.style.background = this.status === 'recording' ? 'linear-gradient(to top,#7c3aed,#a78bfa)' : 'rgba(255,255,255,0.1)';
      b.style.boxShadow  = this.status === 'recording' ? '0 0 4px rgba(124,58,237,0.6)' : 'none';
    }
  }

  _setStatusText(s) {
    const el = this.el?.querySelector('#sv2-status'); if (!el) return;
    const map = {
      idle:       ['sv2-s-idle',   'Mikrofona dokun ve cümleyi söyle'],
      shadow:     ['sv2-s-shadow', '👂 Dinle ve hemen arkasından tekrar et…'],
      recording:  ['sv2-s-rec',    '<span class="sv2-dot"></span> Dinleniyor… net konuş'],
      processing: ['sv2-s-proc',   'Ses analiz ediliyor…'],
      error:      ['sv2-s-err',    '⚠️ Ses alınamadı. Tekrar dene.'],
      done:       ['sv2-s-done',   ''],
    };
    const [cls, html] = map[s] || map.idle;
    el.className = `sv2-status ${cls}`; el.innerHTML = html;
  }

  _showScore() {
    if (!this.result) return;
    const panel = this.el?.querySelector('#sv2-score-panel'); if (!panel) return;

    const { score, words, transcript, xp, wpm, fluency } = this.result;
    const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    const label = score >= 80 ? 'Mükemmel! 🎉' : score >= 50 ? 'İyi gidiyor!' : 'Pratik yapmaya devam et!';
    const circ  = 2 * Math.PI * 28;

    // Score ring
    const arc = panel.querySelector('#sv2-arc');
    if (arc) { arc.style.stroke = color; arc.style.filter = `drop-shadow(0 0 6px ${color})`; arc.style.strokeDashoffset = circ - (score / 100) * circ; }

    const numEl = panel.querySelector('#sv2-score-num');
    if (numEl) { numEl.textContent = score; numEl.style.color = color; }

    const labelEl = panel.querySelector('#sv2-score-label');
    if (labelEl) { labelEl.textContent = label; labelEl.style.color = color; }

    const xpEl = panel.querySelector('#sv2-xp-badge');
    if (xpEl) { xpEl.textContent = `+${xp} XP`; xpEl.style.display = 'inline-block'; }

    const saidEl = panel.querySelector('#sv2-score-said');
    if (saidEl) saidEl.innerHTML = `Söyledin: <em>"${this._esc(transcript)}"</em>`;

    // Fluency + WPM metrics
    const metricsEl = panel.querySelector('#sv2-metrics');
    if (metricsEl && wpm > 0) {
      const wpmColor  = wpm >= 80 && wpm <= 140 ? '#10b981' : wpm >= 60 ? '#f59e0b' : '#ef4444';
      const wpmLabel  = wpm >= 130 ? 'Çok hızlı' : wpm >= 80 ? 'İyi tempo' : wpm >= 50 ? 'Biraz yavaş' : 'Çok yavaş';
      const flColor   = fluency >= 80 ? '#10b981' : fluency >= 55 ? '#f59e0b' : '#ef4444';
      const flPct     = fluency / 100;

      metricsEl.innerHTML = `
        <div class="sv2-metric-row">
          <span class="sv2-metric-label">Akıcılık</span>
          <div class="sv2-metric-bar-wrap">
            <div class="sv2-metric-bar" style="width:${fluency}%;background:${flColor};box-shadow:0 0 6px ${flColor}66"></div>
          </div>
          <span class="sv2-metric-val" style="color:${flColor}">${fluency}%</span>
        </div>
        <div class="sv2-metric-row">
          <span class="sv2-metric-label">Hız</span>
          <span class="sv2-metric-wpm" style="color:${wpmColor}">${wpm} <small>WPM</small></span>
          <span class="sv2-metric-tag" style="color:${wpmColor};border-color:${wpmColor}33">${wpmLabel}</span>
        </div>
      `;
    }

    // Word breakdown
    const bdEl = panel.querySelector('#sv2-word-breakdown');
    if (bdEl && words) {
      bdEl.innerHTML = `
        <p class="sv2-bd-title">Kelime doğruluğu:</p>
        <div class="sv2-words">
          ${words.map(w => `<span class="sv2-word ${w.correct ? 'ok' : 'no'}">${this._esc(w.word)}</span>`).join('')}
        </div>
      `;
    }

    // Playback button — poll until audio URL is ready (onstop is async)
    const pbBtn = panel.querySelector('#sv2-playback');
    if (pbBtn) {
      let attempts = 0;
      const tryShow = () => {
        if (this._audioUrl) {
          pbBtn.style.display = 'flex';
          pbBtn.onclick = () => {
            if (!this._audioEl) {
              this._audioEl = new Audio();
              this._audioEl.src = this._audioUrl;
            }
            this._audioEl.currentTime = 0;
            this._audioEl.play().catch(() => {});
          };
        } else if (attempts++ < 15) {
          setTimeout(tryShow, 200);
        }
      };
      setTimeout(tryShow, 300);
    }

    // Sentence history from localStorage
    const sentHistEl = panel.querySelector('#sv2-sent-hist');
    const hist = this._loadFromHistory();
    if (sentHistEl && hist.length > 1) {
      const prev = hist.slice(0, -1).slice(-4); // up to 4 previous attempts
      sentHistEl.innerHTML = `
        <p class="sv2-sh-title">Bu cümle geçmişi:</p>
        <div class="sv2-sh-list">
          ${prev.map(h => {
            const c = h.score >= 80 ? '#10b981' : h.score >= 50 ? '#f59e0b' : '#ef4444';
            return `<span class="sv2-sh-entry"><span class="sv2-sh-date">${h.date}</span><span class="sv2-sh-score" style="color:${c}">${h.score}%</span></span>`;
          }).join('')}
        </div>
      `;
    } else if (sentHistEl) {
      sentHistEl.innerHTML = '';
    }

    // Session dots
    const histEl = panel.querySelector('#sv2-hist');
    if (histEl && this.sessionScores.length > 0) {
      const last = this.sessionScores.slice(-5);
      histEl.innerHTML = `<div class="sv2-hist-dots">
        ${last.map(sc => {
          const c = sc >= 80 ? '#10b981' : sc >= 50 ? '#f59e0b' : '#ef4444';
          return `<span class="sv2-hist-dot" title="${sc}%" style="background:${c}"></span>`;
        }).join('')}
      </div>`;
    }

    panel.classList.add('visible');
  }

  _reset() {
    this._clearTimers(); this._stopAll(); window.speechSynthesis?.cancel();
    this.status = 'idle'; this.result = null; this.liveTranscript = ''; this._audioEl = null;

    const live  = this.el?.querySelector('#sv2-live');  if (live)  live.textContent = '';
    const panel = this.el?.querySelector('#sv2-score-panel'); if (panel) panel.classList.remove('visible');

    this._updateMicState(); this._setStatusText('idle');
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  _micIconSvg(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`;
  }

  _micOffSvg() {
    return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`;
  }

  _esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}

// ── OTOMATİK BAĞLANTI ──
(function () {
  const initPlugin = () => {
    const mount = document.getElementById('speak-mount-point');
    if (mount && (!window.speakV2Mod || window.speakV2Mod.el !== mount)) {
      window.speakV2Mod = new SpeakV2Module();
      window.speakV2Mod.init(mount);
    }
  };
  const observer = new MutationObserver(() => initPlugin());
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(initPlugin, 800);
})();
