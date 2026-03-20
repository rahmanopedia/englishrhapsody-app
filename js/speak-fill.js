/**
 * RHAPSODY SPEAK FILL v2.0 — "Boşluk Doldur"
 * - Üstte Türkçe anlam/ipucu
 * - Her kelime uzunluğuna göre tire boşluğu
 * - Konuşurken doğru kelimeler sırayla boşluğa dolur
 * - Yanlış/söylenemeyen boşluklar boş kalır
 * - Bittikten sonra TTS tam cümleyi okurken kalan boşluklar senkronize dolur
 */
class SpeakFillMode {
  constructor() {
    this.el          = null;
    this.items       = [];
    this.pool        = [];
    this.idx         = 0;
    this.status      = 'idle';
    this.liveText    = '';
    this.filledWords = [];      // boolean array — her kelime dolu mu?

    this._rec        = null;
    this._audioCtx   = null;
    this._analyser   = null;
    this._stream     = null;
    this._animFrame  = null;
    this._ttsTimer   = null;
    this._isSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

    this._level   = 'A1';
    this.correct  = 0;
    this.total    = 0;
    this.streak   = 0;
  }

  // ── Veri ──────────────────────────────────────────────────────────────────

  // Cümlenin gerçek zorluğunu hesapla (kelime sayısı + uzunluk + kelimenin CEFR seviyesi)
  _sentenceLevel(sentence, wordCefr) {
    const LNUM = { A1:1, A2:2, B1:3, B2:4, C1:5, C2:6 };
    const words  = sentence.split(/\s+/);
    const wc     = words.length;
    const avgLen = words.reduce((s, w) => s + w.replace(/[^a-z]/gi, '').length, 0) / wc;
    const lnum   = LNUM[wordCefr] || 3;
    // Ağırlıklı skor: cümle uzunluğu %40 + kelime uzunluğu %20 + CEFR %40
    const score  = wc * 0.5 + avgLen * 0.3 + lnum * 2.2;
    if (score <  7)  return 'A1';
    if (score < 11)  return 'A2';
    if (score < 15)  return 'B1';
    if (score < 19)  return 'B2';
    if (score < 23)  return 'C1';
    return 'C2';
  }

  _buildItems() {
    const raw = [];

    if (typeof WORDS !== 'undefined') {
      const exTr = (typeof EX_TR !== 'undefined') ? EX_TR : {};
      for (const w of WORDS) {
        if (!w.ex) continue;
        const sentence = w.ex.trim();
        if (sentence.split(/\s+/).length < 4) continue;
        const tr = exTr[w.id] || w.ex_tr || '';
        if (!tr) continue;
        raw.push({
          sentence,
          tr,
          word:  w.en    || '',
          level: this._sentenceLevel(sentence, w.level || 'B1'),
        });
      }
    }

    // Karıştır
    for (let i = raw.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [raw[i], raw[j]] = [raw[j], raw[i]];
    }
    this.items = raw;
  }

  _setLevel(level) {
    this._level  = level;
    this.idx     = 0;
    this.correct = 0;
    this.total   = 0;
    this.streak  = 0;
    this.pool    = this.items.filter(x => x.level === level);
    if (this.pool.length < 5) this.pool = this.items; // yedek
  }

  get _cur() { return this.pool[this.idx] || null; }

  // Cümleyi kelimelere ayır (noktalama işaretini kelimeden ayır)
  _tokenize(sentence) {
    return sentence.split(/\s+/).map(w => {
      const punc  = w.match(/[.,!?;:]+$/) ? w.match(/[.,!?;:]+$/)[0] : '';
      const clean = w.replace(/[.,!?;:]+$/, '');
      return { raw: w, clean, punc };
    }).filter(t => t.clean.length > 0);
  }

  // ── Init ──────────────────────────────────────────────────────────────────

  init(el) {
    this.el = el;
    this._buildItems();
    this._setLevel('A1');
    this._render();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  _render() {
    if (!this.el) return;
    const item = this._cur;
    if (!item) {
      this.el.innerHTML = '<p class="sfm-empty">Veri yükleniyor…</p>';
      return;
    }

    const tokens = this._tokenize(item.sentence);
    this.filledWords = new Array(tokens.length).fill(false);

    const LEVELS = ['A1','A2','B1','B2','C1','C2'];
    const LEVEL_CFG = {
      A1: { color:'#10b981', label:'Başlangıç'  },
      A2: { color:'#06b6d4', label:'Temel'       },
      B1: { color:'#3b82f6', label:'Orta Altı'   },
      B2: { color:'#8b5cf6', label:'Orta Üstü'   },
      C1: { color:'#f59e0b', label:'İleri'       },
      C2: { color:'#ef4444', label:'Ustalaşmış'  },
    };
    const lcfg = LEVEL_CFG[this._level];
    const pct  = Math.round((this.idx / Math.max(1, this.pool.length)) * 100);
    const bars = Array.from({ length: 18 }, (_, i) =>
      `<div class="sfm-bar" id="sfb${i}"></div>`).join('');

    // Her kelime için tire boşluğu
    const blanksHtml = tokens.map((t, i) =>
      `<span class="sfm-word-slot" id="sfm-slot-${i}">
        <span class="sfm-slot-fill" id="sfm-fill-${i}"></span>
        <span class="sfm-slot-dashes">${this._dashes(t.clean.length)}</span>${t.punc
          ? `<span class="sfm-slot-punc">${t.punc}</span>` : ''}
      </span>`
    ).join(' ');

    this.el.innerHTML = `
<div class="sfm-wrap">

  <!-- Seviye seçimi -->
  <div class="sfm-levels">
    ${LEVELS.map(lv => `
      <button class="sfm-lvl-btn${this._level === lv ? ' sfm-lvl-on' : ''}"
        data-lv="${lv}"
        style="${this._level === lv
          ? `background:${LEVEL_CFG[lv].color}22;border-color:${LEVEL_CFG[lv].color}66;color:${LEVEL_CFG[lv].color}`
          : ''}">
        ${lv}
      </button>`).join('')}
  </div>

  <!-- Seviye etiketi + istatistik -->
  <div class="sfm-topbar">
    <div class="sfm-stats">
      <span class="sfm-level-pill" style="background:${lcfg.color}20;color:${lcfg.color};border-color:${lcfg.color}44">
        ${this._level} — ${lcfg.label}
      </span>
      <span class="sfm-stat-chip">🔥 <strong>${this.streak}</strong></span>
      <span class="sfm-stat-chip">✅ <strong>${this.correct}/${this.total}</strong></span>
      <span class="sfm-stat-chip"><strong>${this.idx + 1}</strong><em>/${this.pool.length}</em></span>
    </div>
    <div class="sfm-prog-track">
      <div class="sfm-prog-fill" style="width:${pct}%;background:${lcfg.color}"></div>
    </div>
  </div>

  <!-- Ana kart -->
  <div class="sfm-card" id="sfm-card">

    <!-- Türkçe cümle — büyük, belirgin -->
    <div class="sfm-tr-sentence">${this._esc(item.tr)}</div>

    <!-- Ayırıcı -->
    <div class="sfm-divider"></div>

    <!-- Tire boşlukları -->
    <div class="sfm-blanks-area" id="sfm-blanks">${blanksHtml}</div>

    <!-- Canlı sesli yazım -->
    <div class="sfm-live" id="sfm-live"></div>

  </div>

  <!-- Mikrofon bölümü -->
  <div class="sfm-mic-section">
    <div class="sfm-wave">${bars}</div>
    <div class="sfm-mic-outer">
      <div class="sfm-ring sfm-ring-1" id="sfmr1"></div>
      <div class="sfm-ring sfm-ring-2" id="sfmr2"></div>
      <button class="sfm-mic-btn" id="sfm-mic" ${!this._isSupported ? 'disabled' : ''}>
        <span id="sfm-mic-ico">${this._micSvg(30)}</span>
      </button>
    </div>
    <div class="sfm-status" id="sfm-status">
      ${this._isSupported
        ? 'Mikrofona bas, İngilizce cümleyi söyle'
        : '⚠️ Chrome / Edge gereklidir'}
    </div>
  </div>

  <!-- Sonuç -->
  <div class="sfm-result" id="sfm-result" style="display:none">
    <div class="sfm-result-msg" id="sfm-result-msg"></div>
    <div class="sfm-result-btns">
      <button class="sfm-rbtn sfm-rbtn-ghost"   id="sfm-retry">🔄 Tekrar</button>
      <button class="sfm-rbtn sfm-rbtn-primary" id="sfm-next">Sonraki →</button>
    </div>
  </div>

  <!-- Navigasyon -->
  <div class="sfm-nav">
    <button class="sfm-nav-btn" id="sfm-prev" ${this.idx === 0 ? 'disabled' : ''}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="sfm-skip-btn" id="sfm-skip">Geç</button>
    <button class="sfm-nav-btn" id="sfm-fwd">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>

</div>`;

    this._bind();
  }

  // Kelime uzunluğuna göre tire üret
  _dashes(len) {
    const count = Math.max(2, len);
    return '<span class="sfm-dash"></span>'.repeat(count);
  }

  // ── Events ────────────────────────────────────────────────────────────────

  _bind() {
    const q = s => this.el.querySelector(s);
    q('#sfm-mic')  ?.addEventListener('click', () => this._toggleRec());
    q('#sfm-retry')?.addEventListener('click', () => this._reset());
    q('#sfm-next') ?.addEventListener('click', () => this._advance());
    q('#sfm-skip') ?.addEventListener('click', () => this._advance());
    q('#sfm-prev') ?.addEventListener('click', () => this._go(this.idx - 1));
    q('#sfm-fwd')  ?.addEventListener('click', () => this._advance());
    this.el.querySelectorAll('.sfm-lvl-btn').forEach(btn =>
      btn.addEventListener('click', () => {
        this._stopAll();
        this._setLevel(btn.dataset.lv);
        this._render();
      })
    );
  }

  // ── Navigasyon ────────────────────────────────────────────────────────────

  _advance() {
    this._stopAll();
    this._go((this.idx + 1) % this.pool.length);
  }

  _go(idx) {
    this._stopAll();
    this.idx      = Math.max(0, Math.min(idx, this.pool.length - 1));
    this.status   = 'idle';
    this.liveText = '';
    this._render();
  }

  _reset() {
    this._stopAll();
    this.status   = 'idle';
    this.liveText = '';
    const item    = this._cur; if (!item) return;
    const tokens  = this._tokenize(item.sentence);
    this.filledWords = new Array(tokens.length).fill(false);
    // Boşlukları temizle
    tokens.forEach((_, i) => this._clearSlot(i));
    const q = s => this.el?.querySelector(s);
    const lv = q('#sfm-live');  if (lv) lv.textContent = '';
    const rs = q('#sfm-result'); if (rs) rs.style.display = 'none';
    const cd = q('#sfm-card');  if (cd) cd.classList.remove('sfm-card-done');
    this._setMicUI('idle');
    this._setStatus('Mikrofona bas, İngilizce cümleyi söyle');
  }

  // ── Kayıt ─────────────────────────────────────────────────────────────────

  _toggleRec() {
    if (this.status === 'recording') this._stopRec();
    else { this._reset(); this._startRec(); }
  }

  async _startRec() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    this.status   = 'recording';
    this.liveText = '';
    this._setMicUI('recording');
    this._setStatus('<span class="sfm-dot"></span> Dinleniyor…');

    const rec = new SR();
    this._rec = rec;
    rec.lang            = 'en-US';
    rec.continuous      = false;
    rec.interimResults  = true;
    rec.maxAlternatives = 1;
    rec.start();                 // Önce recognition başlat
    this._startWave();           // Sonra görsel dalga (mic çakışmasını önler)

    rec.onresult = e => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      this.liveText = (final || interim).trim();
      this._matchAndFill(this.liveText);

      const lv = this.el?.querySelector('#sfm-live');
      if (lv) lv.innerHTML = this.liveText
        ? `<span class="sfm-live-txt">"${this._esc(this.liveText)}"</span>`
        : '';
    };

    rec.onend = () => {
      this._stopAll();
      if (this.status !== 'done') {
        if (!this.liveText.trim()) {
          // Kullanıcı hiç konuşmadı — sadece uyarı ver, otomatik doldurmayı tetikleme
          this.status = 'idle';
          this._setMicUI('idle');
          this._setStatus('Ses algılanamadı, tekrar dene.');
          return;
        }
        this.status = 'processing';
        this._setMicUI('processing');
        this._setStatus('Değerlendiriliyor…');
        setTimeout(() => this._finalize(), 300);
      }
    };

    rec.onerror = e => {
      this._stopAll();
      this.status = 'idle';
      this._setMicUI('idle');
      this._setStatus(e.error === 'no-speech'
        ? 'Ses algılanamadı. Tekrar dene.'
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
    if (this._ttsTimer)  { clearTimeout(this._ttsTimer); this._ttsTimer = null; }
    window.speechSynthesis?.cancel();
    this._analyser = null;
    this._resetBars();
  }

  // ── Kelime eşleştirme ─────────────────────────────────────────────────────

  _norm(s) {
    return s.toLowerCase().replace(/[^a-z\s']/g, '').replace(/\s+/g, ' ').trim();
  }

  _matchAndFill(transcript) {
    const item = this._cur; if (!item) return;
    const tokens  = this._tokenize(item.sentence);
    const spoken  = this._norm(transcript).split(' ').filter(Boolean);

    // Sıralı eşleştirme: spoken kelimelerini target kelimeleriyle sırayla eşleştir
    let si = 0;
    tokens.forEach((t, ti) => {
      if (si >= spoken.length) return;
      const target = this._norm(t.clean);
      if (!target) return;

      // Tam veya yakın eşleşme
      if (this._wordMatch(spoken[si], target)) {
        if (!this.filledWords[ti]) {
          this.filledWords[ti] = true;
          this._fillSlot(ti, t.clean, t.punc, 'pop');
        }
        si++;
      } else {
        // Aynı pozisyondaki sonraki spoken kelimelerinde ara (1 kelime atlamaya izin ver)
        if (si + 1 < spoken.length && this._wordMatch(spoken[si + 1], target)) {
          if (!this.filledWords[ti]) {
            this.filledWords[ti] = true;
            this._fillSlot(ti, t.clean, t.punc, 'pop');
          }
          si += 2;
        }
        // Eşleşme yok — boş bırak, si ilerletme
      }
    });
  }

  _wordMatch(spoken, target) {
    if (!spoken || !target) return false;
    if (spoken === target) return true;
    // Uzunluk benzer ise Levenshtein mesafesine bak
    if (Math.abs(spoken.length - target.length) > 3) return false;
    const maxDist = target.length <= 4 ? 1 : target.length <= 7 ? 2 : 3;
    return this._lev(spoken, target) <= maxDist;
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

  // ── Boşluk UI ─────────────────────────────────────────────────────────────

  _fillSlot(idx, word, punc, anim) {
    const fill  = this.el?.querySelector(`#sfm-fill-${idx}`);
    const dashes = this.el?.querySelector(`#sfm-slot-${idx} .sfm-slot-dashes`);
    if (!fill) return;
    fill.textContent = word;
    fill.className   = `sfm-slot-fill sfm-slot-filled${anim === 'pop' ? ' sfm-slot-pop' : ''}`;
    if (dashes) dashes.style.display = 'none';
  }

  _fillSlotAuto(idx, word, punc) {
    // Otomatik doldurma (TTS senkronize) — farklı renk/animasyon
    const fill   = this.el?.querySelector(`#sfm-fill-${idx}`);
    const dashes = this.el?.querySelector(`#sfm-slot-${idx} .sfm-slot-dashes`);
    if (!fill) return;
    fill.textContent = word;
    fill.className   = 'sfm-slot-fill sfm-slot-auto';
    if (dashes) dashes.style.display = 'none';
  }

  _clearSlot(idx) {
    const fill   = this.el?.querySelector(`#sfm-fill-${idx}`);
    const dashes = this.el?.querySelector(`#sfm-slot-${idx} .sfm-slot-dashes`);
    if (fill)   { fill.textContent = ''; fill.className = 'sfm-slot-fill'; }
    if (dashes) dashes.style.display = '';
  }

  // ── Değerlendirme ve TTS ──────────────────────────────────────────────────

  _finalize() {
    const item = this._cur; if (!item) return;
    const tokens = this._tokenize(item.sentence);

    const filledCount = this.filledWords.filter(Boolean).length;
    const ratio       = filledCount / tokens.length;

    this.total++;
    const correct = ratio >= 0.6;
    if (correct) { this.correct++; this.streak++; }
    else         { this.streak = 0; }

    // XP
    const xp  = ratio >= 0.9 ? 10 : ratio >= 0.6 ? 5 : 2;
    const app = window._app || window.app;
    if (app && typeof app.addXP === 'function') app.addXP(xp, 'medium', 'speak-fill');

    this.status = 'done';
    this._setMicUI('idle');
    this._setStatus('');

    // Sonuç mesajı
    const msg = this.el?.querySelector('#sfm-result-msg');
    if (msg) {
      const pct   = Math.round(ratio * 100);
      const color = ratio >= 0.8 ? '#34d399' : ratio >= 0.5 ? '#f59e0b' : '#f87171';
      const label = ratio >= 0.8 ? 'Harika!' : ratio >= 0.5 ? 'İyi gidiyor!' : 'Daha fazla pratik yap!';
      msg.innerHTML = `
        <span class="sfm-res-label" style="color:${color}">${label}</span>
        <span class="sfm-res-pct" style="color:${color}">${pct}% doğru</span>
        <span class="sfm-xp">+${xp} XP</span>`;
    }

    const res = this.el?.querySelector('#sfm-result');
    if (res) { res.style.display = ''; res.classList.add('sfm-result-anim'); }

    const card = this.el?.querySelector('#sfm-card');
    if (card) card.classList.add('sfm-card-done');

    // TTS: tüm cümleyi oku, eksik boşlukları senkronize doldur
    this._autoFillWithTTS(tokens);
  }

  _autoFillWithTTS(tokens) {
    if (!window.speechSynthesis) { this._autoFillFallback(tokens); return; }

    const item = this._cur; if (!item) return;
    const utt  = new SpeechSynthesisUtterance(item.sentence);
    utt.lang   = 'en-US';
    utt.rate   = 0.88;

    let wordIdx = 0;

    utt.onboundary = e => {
      if (e.name !== 'word') return;
      // Mevcut kelime indeksini hesapla
      const spoken = item.sentence.substring(0, e.charIndex + e.charLength);
      const wi = spoken.trim().split(/\s+/).length - 1;
      if (wi < tokens.length && !this.filledWords[wi]) {
        this.filledWords[wi] = true;
        this._fillSlotAuto(wi, tokens[wi].clean, tokens[wi].punc);
      }
    };

    utt.onend = () => {
      // Kalan tüm boşlukları doldur
      tokens.forEach((t, i) => {
        if (!this.filledWords[i]) {
          this.filledWords[i] = true;
          this._fillSlotAuto(i, t.clean, t.punc);
        }
      });
    };

    // onboundary bazı tarayıcılarda çalışmayabilir — fallback timer
    utt.onerror = () => this._autoFillFallback(tokens);
    window.speechSynthesis.speak(utt);

    // Safari/bazı Chrome versiyonları için fallback: TTS süresiyle orantılı timer
    const avgWordMs = 380;
    tokens.forEach((t, i) => {
      if (!this.filledWords[i]) {
        this._ttsTimer = setTimeout(() => {
          if (!this.filledWords[i]) {
            this.filledWords[i] = true;
            this._fillSlotAuto(i, t.clean, t.punc);
          }
        }, i * avgWordMs + 200);
      }
    });
  }

  _autoFillFallback(tokens) {
    const avgMs = 380;
    tokens.forEach((t, i) => {
      if (!this.filledWords[i]) {
        setTimeout(() => {
          this.filledWords[i] = true;
          this._fillSlotAuto(i, t.clean, t.punc);
        }, i * avgMs + 100);
      }
    });
  }

  // ── Mic UI ────────────────────────────────────────────────────────────────

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

    for (let i = 0; i < 18; i++) {
      const b = q(`#sfb${i}`);
      if (!b) continue;
      b.style.background = state === 'recording'
        ? 'linear-gradient(to top,#06b6d4,#67e8f9)'
        : 'rgba(255,255,255,0.1)';
      b.style.boxShadow = state === 'recording'
        ? '0 0 5px rgba(6,182,212,0.5)' : 'none';
    }
  }

  _setStatus(html) {
    const el = this.el?.querySelector('#sfm-status');
    if (el) el.innerHTML = html;
  }

  // ── Dalga formu ───────────────────────────────────────────────────────────

  _startWave() {
    // SpeechRecognition mikrofonu kullanırken getUserMedia çağırmıyoruz
    // (mobilde çakışma yaratır). Random animasyon yeterli.
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

  _resetBars() {
    for (let i = 0; i < 18; i++) {
      const b = this.el?.querySelector(`#sfb${i}`);
      if (b) { b.style.height = '4px'; b.style.background = 'rgba(255,255,255,0.1)'; b.style.boxShadow = 'none'; }
    }
  }

  // ── Yardımcılar ───────────────────────────────────────────────────────────

  _micSvg(s = 30) {
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`;
  }
  _stopSvg() {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
    </svg>`;
  }
  _esc(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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

  const obs = new MutationObserver(bindTabs);
  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(bindTabs, 600);
})();
