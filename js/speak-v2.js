/**
 * RHAPSODY SPEAK V2.1 — Gelişmiş Konuşma Modülü
 * Features: Shuffle, Auto-advance, Audio playback, Streak counter,
 *           Shadow mode, XP integration, Score history, Spaced repetition
 */
class SpeakV2Module {
  constructor() {
    this.el = null;
    this.level = 'easy';
    this.idx = 0;
    this.status = 'idle'; // idle|recording|processing|done|error|shadow
    this.result = null;
    this.liveTranscript = '';
    this.isSpeaking = false;
    this.speechRate = 1;

    // Feature toggles
    this.shuffleMode = false;
    this.autoAdvance = false;
    this.shadowMode = false;

    // Session data
    this.sessionScores = [];  // last 20 scores
    this.streak = 0;
    this.sessionCount = 0;
    this._lowScoreMap = {};   // { idx: lowestScore } for spaced repetition

    // Audio playback
    this._audioUrl = null;
    this._mediaRecorder = null;
    this._audioChunks = [];

    // Timers
    this._shadowTimer = null;
    this._autoTimer = null;

    // Speech API refs
    this._recognition = null;
    this._audioCtx = null;
    this._analyser = null;
    this._stream = null;
    this._animFrame = null;
    this._isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  get _levelConfig() {
    return {
      easy:   { label: 'Beginner',     color: '#10b981', glow: 'rgba(16,185,129,0.4)' },
      medium: { label: 'Intermediate', color: '#06b6d4', glow: 'rgba(6,182,212,0.4)' },
      hard:   { label: 'Advanced',     color: '#7c3aed', glow: 'rgba(124,58,237,0.4)' },
    };
  }

  get _sentences() {
    try { return SPEAK_CHALLENGES[this.level] || []; } catch { return []; }
  }

  get _currentSentence() {
    return this._sentences[this.idx] || '';
  }

  get _avgScore() {
    if (!this.sessionScores.length) return null;
    return Math.round(this.sessionScores.reduce((a, b) => a + b, 0) / this.sessionScores.length);
  }

  async init(el) {
    this.el = el;
    if (typeof SPEAK_CHALLENGES === 'undefined') await this._loadData();
    this._render();
  }

  _loadData() {
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'js/stories-data.js';
      s.onload = resolve;
      s.onerror = resolve;
      document.head.appendChild(s);
    });
  }

  _render() {
    if (!this.el) return;
    const cfg = this._levelConfig;
    const levelKeys = ['easy', 'medium', 'hard'];
    const lc = cfg[this.level];
    const circ = 2 * Math.PI * 28;

    this.el.innerHTML = `
      <div class="sv2-wrap">

        <div class="sv2-levels">
          ${levelKeys.map(k => `
            <button class="sv2-level-btn${k === this.level ? ' active' : ''}" data-level="${k}">
              ${cfg[k].label}
            </button>
          `).join('')}
        </div>

        <div class="sv2-settings">
          <button class="sv2-toggle${this.shuffleMode ? ' on' : ''}" id="sv2-t-shuffle" title="Cümleleri karıştır">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Karıştır
          </button>
          <button class="sv2-toggle${this.autoAdvance ? ' on' : ''}" id="sv2-t-auto" title="80%+ skorda otomatik geç">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Otomatik
          </button>
          <button class="sv2-toggle${this.shadowMode ? ' on' : ''}" id="sv2-t-shadow" title="AI söyler, sen tekrar edersin">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Gölge
          </button>
        </div>

        <div class="sv2-stats">
          <span class="sv2-stat">🔥 <strong id="sv2-streak-num">${this.streak}</strong> seri</span>
          <span class="sv2-stat-sep">·</span>
          <span class="sv2-stat">📊 <strong id="sv2-avg-num">${this._avgScore !== null ? this._avgScore + '%' : '—'}</strong></span>
          <span class="sv2-stat-sep">·</span>
          <span class="sv2-stat">✅ <strong id="sv2-count-num">${this.sessionCount}</strong> cümle</span>
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
            / <span style="color:#f1f5f9">1000</span>
          </span>
          <button class="sv2-nav-btn" id="sv2-next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div class="sv2-audio-btns">
          <button class="sv2-audio-btn sv2-btn-play" id="sv2-play">
            <span class="sv2-aico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
            <small>Play</small>
          </button>
          <button class="sv2-audio-btn sv2-btn-slow" id="sv2-slow">
            <span class="sv2-aico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span>
            <small>Yavaş</small>
          </button>
          <button class="sv2-audio-btn sv2-btn-repeat" id="sv2-repeat">
            <span class="sv2-aico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
            </span>
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
            <div class="sv2-score-card">
              <div class="sv2-ring-wrap">
                <svg width="72" height="72" viewBox="0 0 72 72" style="display:block">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
                  <circle id="sv2-arc" cx="36" cy="36" r="28" fill="none" stroke="#10b981" stroke-width="4"
                    stroke-linecap="round"
                    stroke-dasharray="${circ}"
                    stroke-dashoffset="${circ}"
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
            <div class="sv2-word-breakdown" id="sv2-word-breakdown"></div>
            <button class="sv2-playback-btn" id="sv2-playback" style="display:none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              Sesi Dinle
            </button>
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
    const cfg = this._levelConfig[this.level];
    const card = this.el?.querySelector('#sv2-card');
    if (card) {
      card.style.boxShadow = `0 0 40px ${cfg.glow.replace('0.4','0.12')}, inset 0 1px 0 rgba(255,255,255,0.06)`;
    }
  }

  _bindEvents() {
    if (!this.el) return;
    const q = (id) => this.el.querySelector(id);

    this.el.querySelectorAll('.sv2-level-btn').forEach(btn => {
      btn.addEventListener('click', () => this._setLevel(btn.dataset.level));
    });

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

    q('#sv2-prev')?.addEventListener('click', () => this._prev());
    q('#sv2-next')?.addEventListener('click', () => this._next());
    q('#sv2-play')?.addEventListener('click', () => this._speak(1));
    q('#sv2-slow')?.addEventListener('click', () => { this.speechRate = 0.6; this._speak(0.6); });
    q('#sv2-repeat')?.addEventListener('click', () => this._speak(this.speechRate));
    q('#sv2-mic')?.addEventListener('click', () => this._toggleRecord());
    q('#sv2-try-again')?.addEventListener('click', () => this._reset());
    q('#sv2-next-score')?.addEventListener('click', () => this._next());
  }

  _setLevel(level) {
    this._clearTimers();
    this._stopAll();
    window.speechSynthesis?.cancel();
    this.level = level;
    this.idx = 0;
    this.status = 'idle';
    this.result = null;
    this.liveTranscript = '';
    this._audioUrl = null;
    this.sessionScores = [];
    this.streak = 0;
    this.sessionCount = 0;
    this._lowScoreMap = {};
    this._render();
  }

  _prev() {
    this._clearTimers();
    this._stopAll();
    window.speechSynthesis?.cancel();
    this.idx = Math.max(0, this.idx - 1);
    this.status = 'idle';
    this.result = null;
    this.liveTranscript = '';
    this._audioUrl = null;
    this._updateSentenceUI();
  }

  _next() {
    this._clearTimers();
    this._stopAll();
    window.speechSynthesis?.cancel();
    this.idx = this.shuffleMode ? this._shuffleNextIdx() : Math.min(this.idx + 1, this._sentences.length - 1);
    this.status = 'idle';
    this.result = null;
    this.liveTranscript = '';
    this._audioUrl = null;
    this._updateSentenceUI();
    if (this.shadowMode) this._startShadow();
  }

  _shuffleNextIdx() {
    const len = this._sentences.length;
    if (len <= 1) return 0;
    // Spaced repetition: 40% chance to pick low-score sentence
    const lowPool = Object.entries(this._lowScoreMap)
      .filter(([i, s]) => Number(i) !== this.idx && s < 60)
      .map(([i]) => Number(i));
    if (lowPool.length > 0 && Math.random() < 0.4) {
      return lowPool[Math.floor(Math.random() * lowPool.length)];
    }
    let next;
    do { next = Math.floor(Math.random() * len); } while (next === this.idx);
    return next;
  }

  _updateSentenceUI() {
    const cfg = this._levelConfig[this.level];
    const q = (id) => this.el?.querySelector(id);

    const sentEl = q('#sv2-sentence');
    if (sentEl) sentEl.textContent = `"${this._currentSentence}"`;

    const idxEl = q('#sv2-idx-num');
    if (idxEl) { idxEl.textContent = this.idx + 1; idxEl.style.color = cfg.color; }

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

  // Shadow mode: AI speaks → 0.6s delay → auto-record
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
    const utt = new SpeechSynthesisUtterance(this._currentSentence);
    utt.lang = 'en-US';
    utt.rate = rate;
    utt.onstart = () => { this.isSpeaking = true; };
    utt.onend   = () => { this.isSpeaking = false; if (onEnd) onEnd(); };
    utt.onerror = () => { this.isSpeaking = false; };
    window.speechSynthesis.speak(utt);
  }

  _toggleRecord() {
    if (this.status === 'recording') {
      this._stopRecording();
    } else {
      this._reset();
      this._startRecording();
    }
  }

  async _startRecording() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    this.result = null;
    this.liveTranscript = '';
    this._audioChunks = [];
    this.status = 'recording';
    this._updateMicState();
    this._setStatusText('recording');

    await this._startWaveform();

    const rec = new SR();
    this._recognition = rec;
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      this.liveTranscript = final || interim;
      const live = this.el?.querySelector('#sv2-live');
      if (live && this.liveTranscript) live.textContent = `"${this.liveTranscript}"`;
    };

    rec.onend = () => {
      this.status = 'processing';
      this._stopAll();
      this._updateMicState();
      this._setStatusText('processing');

      setTimeout(() => {
        const spoken = this.liveTranscript.trim();
        if (!spoken) {
          this.status = 'idle';
          this._updateMicState();
          this._setStatusText('idle');
          return;
        }
        const scored = this._score(this._currentSentence, spoken);
        this.result = { transcript: spoken, ...scored };
        this.status = 'done';

        // Session tracking
        this.sessionScores.push(scored.score);
        if (this.sessionScores.length > 20) this.sessionScores.shift();
        this.sessionCount++;

        // Streak (50%+ = correct)
        this.streak = scored.score >= 50 ? this.streak + 1 : 0;

        // Spaced repetition map
        const prev = this._lowScoreMap[this.idx];
        if (prev === undefined || scored.score < prev) this._lowScoreMap[this.idx] = scored.score;

        // XP
        const xp = this._awardXP(scored.score);
        this.result.xp = xp;

        this._updateMicState();
        this._setStatusText('done');
        this._updateStats();
        this._showScore();

        // Auto-advance on 80%+
        if (this.autoAdvance && scored.score >= 80) {
          this._autoTimer = setTimeout(() => this._next(), 2000);
        }
      }, 400);
    };

    rec.onerror = (e) => {
      this._stopAll();
      this.status = e.error === 'no-speech' ? 'idle' : 'error';
      this._updateMicState();
      this._setStatusText(this.status);
    };

    rec.start();
  }

  _stopRecording() {
    try { this._recognition?.stop(); } catch {}
    this._stopAll();
  }

  _stopAll() {
    if (this._recognition) {
      try { this._recognition.stop(); } catch {}
      this._recognition = null;
    }
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
    // Finalize audio recording
    if (this._mediaRecorder && this._mediaRecorder.state !== 'inactive') {
      this._mediaRecorder.onstop = () => {
        if (this._audioChunks.length > 0) {
          if (this._audioUrl) URL.revokeObjectURL(this._audioUrl);
          this._audioUrl = URL.createObjectURL(new Blob(this._audioChunks, { type: 'audio/webm' }));
        }
      };
      try { this._mediaRecorder.stop(); } catch {}
    }
    this._mediaRecorder = null;
    if (this._audioCtx) {
      try { this._audioCtx.close(); } catch {}
      this._audioCtx = null;
    }
    if (this._stream) {
      this._stream.getTracks().forEach(t => t.stop());
      this._stream = null;
    }
    this._analyser = null;
    this._resetBars();
  }

  _clearTimers() {
    if (this._shadowTimer) { clearTimeout(this._shadowTimer); this._shadowTimer = null; }
    if (this._autoTimer)   { clearTimeout(this._autoTimer);   this._autoTimer   = null; }
  }

  _resetBars() {
    for (let i = 0; i < 20; i++) {
      const bar = this.el?.querySelector(`#sv2-b${i}`);
      if (bar) { bar.style.height = '4px'; bar.style.background = 'rgba(255,255,255,0.1)'; bar.style.boxShadow = 'none'; }
    }
  }

  async _startWaveform() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this._stream = stream;

      // MediaRecorder for playback feature
      try {
        this._mediaRecorder = new MediaRecorder(stream);
        this._mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) this._audioChunks.push(e.data); };
        this._mediaRecorder.start();
      } catch {}

      // Waveform analyser
      const ctx = new AudioContext();
      this._audioCtx = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      this._analyser = analyser;
      src.connect(analyser);
      const arr = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        if (!this._analyser) return;
        this._analyser.getByteFrequencyData(arr);
        for (let i = 0; i < 20; i++) {
          const h = Math.max(4, (arr[Math.floor((i / 20) * arr.length)] / 255) * 48);
          const bar = this.el?.querySelector(`#sv2-b${i}`);
          if (bar) bar.style.height = `${h}px`;
        }
        this._animFrame = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // Fallback: animated bars
      const tick = () => {
        if (this.status !== 'recording') return;
        for (let i = 0; i < 20; i++) {
          const bar = this.el?.querySelector(`#sv2-b${i}`);
          if (bar) bar.style.height = `${4 + Math.random() * 36}px`;
        }
        this._animFrame = requestAnimationFrame(tick);
      };
      tick();
    }
  }

  _score(target, spoken) {
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s']/g, '').replace(/\s+/g, ' ').trim();
    const tw = norm(target).split(' ');
    const sw = norm(spoken).split(' ');
    const words = tw.map((w, i) => ({ word: w, correct: sw[i] === w }));
    const score = Math.round((words.filter(w => w.correct).length / tw.length) * 100);
    return { score, words };
  }

  _awardXP(score) {
    let xp = score >= 80 ? 10 : score >= 60 ? 6 : score >= 40 ? 3 : 1;
    if (this.streak > 0 && this.streak % 5 === 0) xp += 3; // streak bonus
    const app = window._app || window.app;
    if (app && typeof app.addXP === 'function') app.addXP(xp, 'medium', 'speak');
    return xp;
  }

  _updateStats() {
    const q = (id) => this.el?.querySelector(id);
    const s = q('#sv2-streak-num');
    const a = q('#sv2-avg-num');
    const c = q('#sv2-count-num');
    if (s) s.textContent = this.streak;
    if (a) a.textContent = this._avgScore !== null ? this._avgScore + '%' : '—';
    if (c) c.textContent = this.sessionCount;
  }

  _updateMicState() {
    const btn    = this.el?.querySelector('#sv2-mic');
    const iconEl = this.el?.querySelector('#sv2-mic-icon');
    if (!btn || !iconEl) return;

    const r1 = this.el.querySelector('#sv2-r1');
    const r2 = this.el.querySelector('#sv2-r2');
    const r3 = this.el.querySelector('#sv2-r3');

    btn.classList.remove('sv2-recording', 'sv2-processing');
    [r1, r2, r3].forEach(r => r?.classList.remove('sv2-ring-a1', 'sv2-ring-a2', 'sv2-ring-a3'));

    if (this.status === 'recording') {
      btn.classList.add('sv2-recording');
      r1?.classList.add('sv2-ring-a1');
      r2?.classList.add('sv2-ring-a2');
      r3?.classList.add('sv2-ring-a3');
      iconEl.innerHTML = this._micOffSvg();
      btn.disabled = false;
    } else if (this.status === 'processing') {
      btn.classList.add('sv2-processing');
      iconEl.innerHTML = '<div class="sv2-spinner"></div>';
      btn.disabled = true;
    } else {
      iconEl.innerHTML = this._micIconSvg(32);
      btn.disabled = !this._isSupported;
    }

    for (let i = 0; i < 20; i++) {
      const bar = this.el?.querySelector(`#sv2-b${i}`);
      if (bar) {
        bar.style.background  = this.status === 'recording' ? 'linear-gradient(to top, #7c3aed, #a78bfa)' : 'rgba(255,255,255,0.1)';
        bar.style.boxShadow   = this.status === 'recording' ? '0 0 4px rgba(124,58,237,0.6)' : 'none';
      }
    }
  }

  _setStatusText(s) {
    const el = this.el?.querySelector('#sv2-status');
    if (!el) return;
    const map = {
      idle:       ['sv2-s-idle',   'Mikrofona dokun ve cümleyi söyle'],
      shadow:     ['sv2-s-shadow', '👂 Dinle ve hemen arkasından tekrar et…'],
      recording:  ['sv2-s-rec',    '<span class="sv2-dot"></span> Dinleniyor… net konuş'],
      processing: ['sv2-s-proc',   'Ses analiz ediliyor…'],
      error:      ['sv2-s-err',    '⚠️ Ses alınamadı. Tekrar dene.'],
      done:       ['sv2-s-done',   ''],
    };
    const [cls, html] = map[s] || map.idle;
    el.className = `sv2-status ${cls}`;
    el.innerHTML = html;
  }

  _showScore() {
    if (!this.result) return;
    const panel = this.el?.querySelector('#sv2-score-panel');
    if (!panel) return;

    const { score, words, transcript, xp } = this.result;
    const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    const label = score >= 80 ? 'Mükemmel! 🎉' : score >= 50 ? 'İyi gidiyor!' : 'Pratik yapmaya devam et!';
    const circ  = 2 * Math.PI * 28;

    const arc = panel.querySelector('#sv2-arc');
    if (arc) {
      arc.style.stroke           = color;
      arc.style.filter           = `drop-shadow(0 0 6px ${color})`;
      arc.style.strokeDashoffset = circ - (score / 100) * circ;
    }

    const numEl = panel.querySelector('#sv2-score-num');
    if (numEl) { numEl.textContent = score; numEl.style.color = color; }

    const labelEl = panel.querySelector('#sv2-score-label');
    if (labelEl) { labelEl.textContent = label; labelEl.style.color = color; }

    const xpEl = panel.querySelector('#sv2-xp-badge');
    if (xpEl) { xpEl.textContent = `+${xp} XP`; xpEl.style.display = 'inline-block'; }

    const saidEl = panel.querySelector('#sv2-score-said');
    if (saidEl) saidEl.innerHTML = `Söyledin: <em>"${this._esc(transcript)}"</em>`;

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

    // Playback button (shown only if audio was captured)
    // Audio URL might not be ready yet (MediaRecorder.onstop is async)
    // so we check with a small delay
    const pbBtn = panel.querySelector('#sv2-playback');
    if (pbBtn) {
      setTimeout(() => {
        if (this._audioUrl) {
          pbBtn.style.display = 'flex';
          pbBtn.onclick = () => { try { new Audio(this._audioUrl).play(); } catch {} };
        }
      }, 300);
    }

    // Session history dots (last 5)
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
    this._clearTimers();
    this._stopAll();
    window.speechSynthesis?.cancel();
    this.status = 'idle';
    this.result = null;
    this.liveTranscript = '';

    const live  = this.el?.querySelector('#sv2-live');
    if (live) live.textContent = '';

    const panel = this.el?.querySelector('#sv2-score-panel');
    if (panel) panel.classList.remove('visible');

    this._updateMicState();
    this._setStatusText('idle');
  }

  _micIconSvg(size) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`;
  }

  _micOffSvg() {
    return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`;
  }

  _esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
