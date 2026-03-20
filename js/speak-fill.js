/**
 * RHAPSODY SPEAK FILL MODE v1.0
 * "Boşluk Doldur" — Phrasal verb / idiom / phrase completion
 * Türkçe anlam görünür, İngilizce ifadenin sonu boşluktur.
 * Söyleyince boşluk canlı dolar; doğru → yeşil, yanlış → kırmızı + cevap.
 */
class SpeakFillMode {
  constructor() {
    this.el      = null;
    this.items   = [];
    this.pool    = [];
    this.idx     = 0;
    this.status  = 'idle';
    this.liveText    = '';
    this.blankFilled = false;

    this._rec        = null;
    this._audioCtx   = null;
    this._analyser   = null;
    this._stream     = null;
    this._animFrame  = null;
    this._isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

    this._filter     = 'all';
    this.correct     = 0;
    this.total       = 0;
    this.streak      = 0;
  }

  // ── Data ────────────────────────────────────────────────────────────────────

  _buildItems() {
    if (typeof PHRASE_DICT === 'undefined') return;
    const raw = [];
    for (const [phrase, data] of Object.entries(PHRASE_DICT)) {
      const words = phrase.trim().split(/\s+/);
      if (words.length < 2 || words.length > 5) continue;
      // Show first word; hide the rest (the particle / completion)
      const shown  = words[0];
      const hidden = words.slice(1).join(' ');
      if (!hidden || hidden.length < 2) continue;
      raw.push({
        phrase,
        shown,
        hidden,
        tr:   data.tr   || '',
        type: data.type || 'Kelime',
        ex:   data.ex   || '',
      });
    }
    // Fisher-Yates shuffle
    for (let i = raw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [raw[i], raw[j]] = [raw[j], raw[i]];
    }
    this.items = raw;
  }

  _setFilter(f) {
    this._filter = f;
    this.idx = 0;
    this.pool = f === 'all'
      ? [...this.items]
      : this.items.filter(x => x.type === f);
    if (!this.pool.length) this.pool = [...this.items];
  }

  get _cur() { return this.pool[this.idx] || null; }

  // ── Init ────────────────────────────────────────────────────────────────────

  init(el) {
    this.el = el;
    this._buildItems();
    this._setFilter('all');
    this._render();
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  _render() {
    if (!this.el) return;
    const item = this._cur;
    if (!item) {
      this.el.innerHTML = '<p class="sfm-empty">Phrasal verb verisi yükleniyor…</p>';
      return;
    }

    const TYPE_COL = {
      'Phrasal Verb':  { bg: '#083344', fg: '#06b6d4', bd: '#0891b255' },
      'Deyim':         { bg: '#1e1b4b', fg: '#a78bfa', bd: '#7c3aed55' },
      'Gramer Kalıbı': { bg: '#1c1408', fg: '#f59e0b', bd: '#b4530955' },
      'Eylem Kalıbı':  { bg: '#052e16', fg: '#34d399', bd: '#06573055' },
      'İsim Tamlaması':{ bg: '#2d0a1e', fg: '#f472b6', bd: '#be185d55' },
      'Kelime':        { bg: '#0f172a', fg: '#60a5fa', bd: '#1d4ed855' },
    };
    const col = TYPE_COL[item.type] || TYPE_COL['Kelime'];

    const FILTERS = [
      { f:'all',            label:'Tümü' },
      { f:'Phrasal Verb',   label:'Phrasal' },
      { f:'Deyim',          label:'Deyim' },
      { f:'Gramer Kalıbı',  label:'Gramer' },
      { f:'Eylem Kalıbı',   label:'Eylem' },
      { f:'İsim Tamlaması', label:'İsim' },
    ];

    const pct  = Math.round((this.idx / Math.max(1, this.pool.length)) * 100);
    const bars = Array.from({ length: 18 }, (_, i) =>
      `<div class="sfm-bar" id="sfb${i}"></div>`).join('');

    this.el.innerHTML = `
<div class="sfm-wrap">

  <!-- Filtre şeridi -->
  <div class="sfm-filters" role="tablist">
    ${FILTERS.map(({ f, label }) =>
      `<button class="sfm-filt${this._filter === f ? ' sfm-filt-on' : ''}" data-f="${f}" role="tab">${label}</button>`
    ).join('')}
  </div>

  <!-- Üst bar: istatistik + ilerleme -->
  <div class="sfm-topbar">
    <div class="sfm-stats">
      <span class="sfm-stat-chip">🔥 <strong>${this.streak}</strong></span>
      <span class="sfm-stat-chip">✅ <strong>${this.correct}/${this.total}</strong></span>
      <span class="sfm-stat-chip sfm-counter"><strong>${this.idx + 1}</strong><em>/${this.pool.length}</em></span>
    </div>
    <div class="sfm-prog-track">
      <div class="sfm-prog-fill" style="width:${pct}%"></div>
    </div>
  </div>

  <!-- Ana kart -->
  <div class="sfm-card" id="sfm-card">

    <!-- Tip rozeti -->
    <div class="sfm-badge-row">
      <span class="sfm-badge"
        style="background:${col.bg};color:${col.fg};border-color:${col.bd}">
        ${item.type}
      </span>
    </div>

    <!-- Türkçe anlam (ipucu) -->
    <div class="sfm-tr-hint">${this._esc(item.tr)}</div>

    <!-- İfade + boşluk -->
    <div class="sfm-phrase-row" id="sfm-phrase-row">
      <span class="sfm-shown">${this._esc(item.shown)}</span>
      <span class="sfm-gap" id="sfm-gap">
        <span class="sfm-gap-text" id="sfm-gap-text"></span>
        <span class="sfm-gap-line" id="sfm-gap-line"></span>
      </span>
    </div>

    <!-- Canlı transcript (küçük) -->
    <div class="sfm-live" id="sfm-live"></div>

    <!-- Örnek cümle (gizli başlar) -->
    <div class="sfm-ex" id="sfm-ex" style="display:none">
      <span class="sfm-ex-lbl">Örnek</span>
      <span class="sfm-ex-txt">${this._exHtml(item)}</span>
    </div>

    <!-- Doğru cevap ifşası (yanlış durumda) -->
    <div class="sfm-reveal" id="sfm-reveal" style="display:none">
      <span class="sfm-reveal-lbl">Doğru cevap</span>
      <span class="sfm-reveal-word">${this._esc(item.phrase)}</span>
    </div>

  </div><!-- /sfm-card -->

  <!-- Mikrofon bölümü -->
  <div class="sfm-mic-section">
    <div class="sfm-wave">${bars}</div>
    <div class="sfm-mic-outer">
      <div class="sfm-ring sfm-ring-1" id="sfmr1"></div>
      <div class="sfm-ring sfm-ring-2" id="sfmr2"></div>
      <button class="sfm-mic-btn" id="sfm-mic"
        ${!this._isSupported ? 'disabled title="Chrome/Edge gereklidir"' : ''}>
        <span id="sfm-mic-ico">${this._micSvg(30)}</span>
      </button>
    </div>
    <div class="sfm-hint-row">
      <button class="sfm-hint-btn" id="sfm-hint">💡 Örnek cümle</button>
    </div>
    <div class="sfm-status" id="sfm-status">
      ${this._isSupported
        ? 'Mikrofona bas ve ifadeyi söyle'
        : '⚠️ Ses tanıma için Chrome veya Edge kullan'}
    </div>
  </div>

  <!-- Sonuç alanı -->
  <div class="sfm-result" id="sfm-result" style="display:none">
    <div class="sfm-result-msg" id="sfm-result-msg"></div>
    <div class="sfm-result-btns">
      <button class="sfm-rbtn sfm-rbtn-ghost" id="sfm-retry">🔄 Tekrar</button>
      <button class="sfm-rbtn sfm-rbtn-primary" id="sfm-next">Sonraki →</button>
    </div>
  </div>

  <!-- Navigasyon -->
  <div class="sfm-nav">
    <button class="sfm-nav-btn" id="sfm-prev" ${this.idx === 0 ? 'disabled' : ''}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <button class="sfm-skip-btn" id="sfm-skip">Geç</button>
    <button class="sfm-nav-btn" id="sfm-fwd">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  </div>

</div>`;

    this._bind();
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  _exHtml(item) {
    if (!item.ex) return '';
    const escaped = this._esc(item.ex);
    const re = new RegExp(
      item.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'
    );
    return escaped.replace(
      new RegExp(this._esc(item.phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
      m => `<mark class="sfm-ex-hl">${m}</mark>`
    );
  }

  _esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  _norm(s) {
    return s.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
  }

  // ── Events ──────────────────────────────────────────────────────────────────

  _bind() {
    const q = s => this.el.querySelector(s);
    q('#sfm-mic')   ?.addEventListener('click',  () => this._toggleRec());
    q('#sfm-hint')  ?.addEventListener('click',  () => this._showHint());
    q('#sfm-retry') ?.addEventListener('click',  () => this._reset());
    q('#sfm-next')  ?.addEventListener('click',  () => this._advance());
    q('#sfm-skip')  ?.addEventListener('click',  () => this._advance());
    q('#sfm-prev')  ?.addEventListener('click',  () => this._go(this.idx - 1));
    q('#sfm-fwd')   ?.addEventListener('click',  () => this._advance());
    this.el.querySelectorAll('.sfm-filt').forEach(btn =>
      btn.addEventListener('click', () => {
        this._stopAll();
        this._setFilter(btn.dataset.f);
        this._render();
      })
    );
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  _advance() {
    this._stopAll();
    this._go((this.idx + 1) % this.pool.length);
  }

  _go(idx) {
    this._stopAll();
    this.idx         = Math.max(0, Math.min(idx, this.pool.length - 1));
    this.status      = 'idle';
    this.liveText    = '';
    this.blankFilled = false;
    this._render();
  }

  _reset() {
    this._stopAll();
    this.status      = 'idle';
    this.liveText    = '';
    this.blankFilled = false;
    const q = s => this.el?.querySelector(s);
    const gt = q('#sfm-gap-text');  if (gt) { gt.textContent = ''; gt.className = 'sfm-gap-text'; }
    const gl = q('#sfm-gap-line');  if (gl) gl.style.display = '';
    const lv = q('#sfm-live');      if (lv) lv.textContent = '';
    const rv = q('#sfm-reveal');    if (rv) rv.style.display = 'none';
    const rs = q('#sfm-result');    if (rs) rs.style.display = 'none';
    const cd = q('#sfm-card');      if (cd) cd.classList.remove('sfm-card-ok', 'sfm-card-fail');
    this._setMicUI('idle');
    this._setStatus('Mikrofona bas ve ifadeyi söyle');
  }

  // ── Recording ───────────────────────────────────────────────────────────────

  _toggleRec() {
    if (this.status === 'recording') this._stopRec();
    else { this._reset(); this._startRec(); }
  }

  async _startRec() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    this.status      = 'recording';
    this.liveText    = '';
    this.blankFilled = false;
    this._setMicUI('recording');
    this._setStatus('<span class="sfm-dot"></span> Dinleniyor…');

    await this._startWave();

    const rec = new SR();
    this._rec = rec;
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.start();

    rec.onresult = e => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      this.liveText = (final || interim).trim();
      this._onLive(this.liveText);
    };

    rec.onend = () => {
      this._stopAll();
      if (this.status !== 'done') {
        this.status = 'processing';
        this._setMicUI('processing');
        this._setStatus('Analiz ediliyor…');
        setTimeout(() => this._evaluate(), 350);
      }
    };

    rec.onerror = e => {
      this._stopAll();
      this.status = 'idle';
      this._setMicUI('idle');
      this._setStatus(e.error === 'no-speech'
        ? 'Ses algılanamadı, tekrar dene.'
        : '⚠️ Bir hata oluştu.');
    };
  }

  _stopRec() {
    try { this._rec?.stop(); } catch {}
    this._stopAll();
  }

  _stopAll() {
    if (this._rec)       { try { this._rec.stop(); } catch {} this._rec = null; }
    if (this._animFrame) { cancelAnimationFrame(this._animFrame); this._animFrame = null; }
    if (this._audioCtx)  { try { this._audioCtx.close(); } catch {} this._audioCtx = null; }
    if (this._stream)    { this._stream.getTracks().forEach(t => t.stop()); this._stream = null; }
    this._analyser = null;
    this._resetBars();
  }

  // ── Live blank fill ─────────────────────────────────────────────────────────

  _onLive(text) {
    const q = s => this.el?.querySelector(s);

    // Live transcript under phrase row
    const lv = q('#sfm-live');
    if (lv) lv.innerHTML = text
      ? `<span class="sfm-live-txt">"${this._esc(text)}"</span>`
      : '';

    if (!this.blankFilled) {
      const item   = this._cur;
      const spoken = this._norm(text);
      const hidden = this._norm(item?.hidden || '');

      if (item && spoken.includes(hidden)) {
        // Hidden word detected mid-speech → snap fill
        this.blankFilled = true;
        this._fillGap(item.hidden, 'snap');
      } else {
        // Show partial text in gap
        const gt = q('#sfm-gap-text');
        if (gt) gt.textContent = text;
      }
    }
  }

  _fillGap(word, mode) {
    const q  = s => this.el?.querySelector(s);
    const gt = q('#sfm-gap-text');
    const gl = q('#sfm-gap-line');
    if (gt) {
      gt.textContent = word;
      gt.className   = 'sfm-gap-text sfm-gap-ok' + (mode === 'snap' ? ' sfm-gap-pop' : '');
    }
    if (gl) gl.style.display = 'none';
  }

  // ── Evaluation ──────────────────────────────────────────────────────────────

  _evaluate() {
    const item = this._cur;
    if (!item) return;

    const spoken = this._norm(this.liveText);
    const hidden = this._norm(item.hidden);
    const full   = this._norm(item.phrase);

    const correct =
      spoken.includes(hidden) ||
      spoken.includes(full) ||
      this._fuzzy(spoken, hidden);

    this.total++;
    if (correct) { this.correct++; this.streak++; }
    else         { this.streak = 0; }

    // XP
    const xp  = correct ? 5 : 1;
    const app = window._app || window.app;
    if (app && typeof app.addXP === 'function') app.addXP(xp, 'medium', 'speak-fill');

    this._showResult(correct, xp, item);
  }

  _fuzzy(spoken, hidden) {
    // Each word in hidden must appear in spoken or be 1 edit away
    return hidden.split(' ').every(w =>
      spoken.includes(w) || this._lev(spoken, w) <= 1
    );
  }

  _lev(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
      Array.from({ length: n + 1 }, (_, j) => i || j)
    );
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  // ── Show result ─────────────────────────────────────────────────────────────

  _showResult(correct, xp, item) {
    const q = s => this.el?.querySelector(s);

    this.status = 'done';
    this._setMicUI('idle');
    this._setStatus('');

    const card = q('#sfm-card');
    if (card) card.classList.add(correct ? 'sfm-card-ok' : 'sfm-card-fail');

    if (correct) {
      if (!this.blankFilled) this._fillGap(item.hidden, 'snap');
    } else {
      const gt = q('#sfm-gap-text');
      if (gt) {
        gt.textContent = this.liveText || '?';
        gt.className   = 'sfm-gap-text sfm-gap-fail';
      }
      // Reveal answer
      const rv = q('#sfm-reveal');
      if (rv) { rv.style.display = ''; rv.classList.add('sfm-reveal-anim'); }
    }

    // Result message
    const msg = q('#sfm-result-msg');
    if (msg) {
      msg.innerHTML = correct
        ? `<span class="sfm-ok-msg">✅ Harika! <strong>${this._esc(item.phrase)}</strong> <span class="sfm-xp">+${xp} XP</span></span>`
        : `<span class="sfm-fail-msg">❌ Söylediğin: <em>"${this._esc(this.liveText || '?')}"</em></span>`;
    }

    const res = q('#sfm-result');
    if (res) { res.style.display = ''; res.classList.add('sfm-result-anim'); }
  }

  // ── Hint ────────────────────────────────────────────────────────────────────

  _showHint() {
    const item = this._cur;
    if (!item?.ex) return;
    const ex = this.el?.querySelector('#sfm-ex');
    if (ex) { ex.style.display = ''; ex.classList.add('sfm-hint-anim'); }
  }

  // ── Mic UI ──────────────────────────────────────────────────────────────────

  _setMicUI(state) {
    const q   = s => this.el?.querySelector(s);
    const btn = q('#sfm-mic');
    const ico = q('#sfm-mic-ico');
    const r1  = q('#sfmr1'), r2 = q('#sfmr2');
    if (!btn) return;

    btn.classList.remove('sfm-mic-rec', 'sfm-mic-proc');
    [r1, r2].forEach(r => r?.classList.remove('sfm-ring-on'));

    if (state === 'recording') {
      btn.classList.add('sfm-mic-rec');
      r1?.classList.add('sfm-ring-on');
      r2?.classList.add('sfm-ring-on');
      if (ico) ico.innerHTML = this._stopSvg();
      btn.disabled = false;
    } else if (state === 'processing') {
      btn.classList.add('sfm-mic-proc');
      if (ico) ico.innerHTML = '<div class="sfm-spinner"></div>';
      btn.disabled = true;
    } else {
      if (ico) ico.innerHTML = this._micSvg(30);
      btn.disabled = !this._isSupported;
    }

    // Bar colors
    for (let i = 0; i < 18; i++) {
      const b = q(`#sfb${i}`);
      if (!b) continue;
      b.style.background = state === 'recording'
        ? 'linear-gradient(to top, #06b6d4, #67e8f9)'
        : 'rgba(255,255,255,0.1)';
      b.style.boxShadow = state === 'recording'
        ? '0 0 5px rgba(6,182,212,0.55)'
        : 'none';
    }
  }

  _setStatus(html) {
    const el = this.el?.querySelector('#sfm-status');
    if (el) el.innerHTML = html;
  }

  // ── Waveform ────────────────────────────────────────────────────────────────

  async _startWave() {
    try {
      const stream  = await navigator.mediaDevices.getUserMedia({ audio: true });
      this._stream  = stream;
      const ctx     = new AudioContext(); this._audioCtx = ctx;
      const src     = ctx.createMediaStreamSource(stream);
      const an      = ctx.createAnalyser(); an.fftSize = 64; this._analyser = an;
      src.connect(an);
      const arr = new Uint8Array(an.frequencyBinCount);
      const tick = () => {
        if (!this._analyser) return;
        this._analyser.getByteFrequencyData(arr);
        for (let i = 0; i < 18; i++) {
          const h = Math.max(4, (arr[Math.floor((i / 18) * arr.length)] / 255) * 44);
          const b = this.el?.querySelector(`#sfb${i}`);
          if (b) b.style.height = `${h}px`;
        }
        this._animFrame = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // Fallback: random bars
      const tick = () => {
        if (this.status !== 'recording') return;
        for (let i = 0; i < 18; i++) {
          const b = this.el?.querySelector(`#sfb${i}`);
          if (b) b.style.height = `${4 + Math.random() * 36}px`;
        }
        this._animFrame = requestAnimationFrame(tick);
      };
      tick();
    }
  }

  _resetBars() {
    for (let i = 0; i < 18; i++) {
      const b = this.el?.querySelector(`#sfb${i}`);
      if (b) { b.style.height = '4px'; b.style.background = 'rgba(255,255,255,0.1)'; b.style.boxShadow = 'none'; }
    }
  }

  // ── SVGs ────────────────────────────────────────────────────────────────────

  _micSvg(s = 30) {
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`;
  }

  _stopSvg() {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
    </svg>`;
  }
}

// ── TAB SİSTEMİ + OTOMATİK BAĞLANTI ─────────────────────────────────────────
(function () {
  window._speakSwitchTab = function (tab) {
    const pV2   = document.getElementById('spk-pane-v2');
    const pFill = document.getElementById('spk-pane-fill');
    document.querySelectorAll('.spk-tab').forEach(t =>
      t.classList.toggle('spk-tab-on', t.dataset.tab === tab)
    );
    if (pV2)   pV2.style.display   = tab === 'v2'   ? '' : 'none';
    if (pFill) pFill.style.display = tab === 'fill' ? '' : 'none';

    // Lazy init fill mode
    if (tab === 'fill') {
      const mount = document.getElementById('speak-fill-point');
      if (mount && !window.speakFillMod) {
        window.speakFillMod = new SpeakFillMode();
        window.speakFillMod.init(mount);
      }
    }
  };

  const bindTabs = () => {
    const row = document.getElementById('spk-tab-row');
    if (row && !row._sfmBound) {
      row._sfmBound = true;
      row.querySelectorAll('.spk-tab').forEach(btn =>
        btn.addEventListener('click', () => window._speakSwitchTab(btn.dataset.tab))
      );
    }
  };

  const observer = new MutationObserver(bindTabs);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(bindTabs, 600);
})();
