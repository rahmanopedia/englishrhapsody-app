/* ================================================================
   PHANTOM INK v2.0 — Görünmez Mürekkep Hafızası
   ================================================================
   v2.0 YENİLİKLERİ:
   ✦ Harf slotları — karanlıkta kelime uzunluğu görünür
   ✦ 3 ipucu sistemi — ilk harf / orta harf / tümünü göster
   ✦ Dalga kristalizasyon — harfler domino gibi yayılır
   ✦ Ekran flaşı — başarıda yeşil, yanılgıda kırmızı dalga
   ✦ CEFR / Kategori filtresi — istediğin seviyeyi seç
   ✦ VKB tuş renklendirme — yanlış tuş kırmızıya döner
   ✦ First-attempt doğruluk takibi — hatasız tamamlanan kelimeler
   ✦ Hafıza soğuma göstergesi — uzun bekleme = slotlar solar
   ✦ Canvas nöral dalgası — recall'da arka planda beyin dalgası
   ✦ Gelişmiş sonuç ekranı — mükemmel / zorlandığın kelimeler
   ✦ Kombo alev animasyonu — 5+ komboda ekran yanar
   ✦ Çıkış onayı — oturum ortasında sorular
   ================================================================ */
'use strict';

const PH_MODES = {
  phantom: { label:'🌫️ Phantom', desc:'1.2s tümü birden · Zor',     imprintMs:1200, xp:40, allAtOnce:true  },
};

const PH_CEFR_LEVELS = ['A1','A2','B1','B2','C1','C2'];

const _wait = ms => new Promise(r => setTimeout(r, ms));

// ════════════════════════════════════════════════════════════════
class PhantomMode {
  constructor(appRef) {
    this.app        = appRef;
    this.root       = null;
    this.mode       = 'phantom';
    this.sessLen    = 10;
    this.cefrFilter = [];        // boş = tümü
    this.queue      = [];
    this.idx        = 0;
    this.score      = 0;
    this.combo      = 0;
    this.phase      = 'intro';
    this.typed      = [];
    this.word       = null;
    this.aborted    = false;
    this.hintsLeft  = 3;
    this.errorCount = 0;         // bu kelimedeki hata sayısı
    this.perfectWords = 0;       // hatasız tamamlanan kelime sayısı
    this.missedWords  = [];      // atlanan/yanlış kelimeler
    this._kbHandler  = null;
    this._coolTimer  = null;     // hafıza soğuma zamanlayıcısı
    this._neuralRaf  = null;     // canvas animasyon
    this._coolLevel  = 0;        // 0-1 arası, artınca slotlar solar
  }

  // ── Yaşam Döngüsü ───────────────────────────────────────────
  init(root) {
    this.root = root;
    this._showIntro();
  }

  destroy() {
    this.aborted = true;
    this._stopCool();
    this._stopNeural();
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);
    this._kbHandler = null;
    window.phantomMod = null;
  }

  // ── INTRO ────────────────────────────────────────────────────
  _showIntro() {
    this.phase = 'intro';
    this.root.innerHTML = `
      <div class="ph-intro">

        <div class="ph-intro-logo">
          <div class="ph-ghost-orb">
            <div class="ph-ghost-ring"></div>
            <div class="ph-ghost-ring ph-ring2"></div>
            <div class="ph-ghost-ring ph-ring3"></div>
            <canvas class="ph-orb-canvas" id="ph-orb-canvas" width="88" height="88"></canvas>
            <span class="ph-ghost-glyph">🌫️</span>
          </div>
          <h1 class="ph-title">PHANTOM <span class="ph-title-ink">INK</span>
            <span class="ph-v2-badge">v2.0</span>
          </h1>
          <p class="ph-tagline">Görünmez Mürekkep Hafızası · Temporal Recall Sistemi</p>
        </div>

        <div class="ph-how">
          <div class="ph-how-step">
            <span class="ph-step-num">1</span>
            <span>Kelime <strong>altın ışıkla</strong> harf harf yanıp söner — sesini de duyarsın.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num">2</span>
            <span>Işık <strong>söner</strong>. Sadece boş slotlar kalır. Hiçbir şey görünmez.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num">3</span>
            <span>Kelimeyi <strong>hafızandan yaz</strong> — her doğru harf kristal gibi patlar.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num ph-step-hint">💡</span>
            <span>3 <strong>ipucu hakkın</strong> var. İpucu kullanmak XP'i yarıya indirir.</span>
          </div>
        </div>

        <div class="ph-config">

          <div class="ph-config-row">
            <span class="ph-config-label">Kelime Sayısı</span>
            <div class="ph-len-btns">
              ${[5,10,20].map(n =>
                `<button class="ph-len-btn ${n===10?'active':''}"
                         onclick="window.phantomMod._setLen(${n},this)">${n}</button>`
              ).join('')}
            </div>
          </div>

          <div class="ph-config-row">
            <span class="ph-config-label">CEFR Seviye Filtresi <small>(boş = tümü)</small></span>
            <div class="ph-cefr-filter">
              ${PH_CEFR_LEVELS.map(l =>
                `<button class="ph-cefr-btn" data-level="${l}"
                         onclick="window.phantomMod._toggleCefr('${l}',this)">${l}</button>`
              ).join('')}
            </div>
          </div>

        </div>

        <button class="ph-start-btn" onclick="window.phantomMod._startSession()">
          <span class="ph-start-icon">🌫️</span> BAŞLAT — IŞIĞI SÖNDÜR
        </button>

        <button class="ph-back-btn" onclick="app.navigate('learn')">← Ana Merkez</button>
      </div>`;

    this._animOrbCanvas();
  }

  _animOrbCanvas() {
    const canvas = document.getElementById('ph-orb-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let t = 0;
    const frame = () => {
      if (!document.getElementById('ph-orb-canvas')) return;
      ctx.clearRect(0, 0, 88, 88);
      for (let i = 0; i < 6; i++) {
        const angle = (t * 0.6 + i * Math.PI * 2 / 6);
        const r = 28 + 6 * Math.sin(t * 1.2 + i);
        const x = 44 + Math.cos(angle) * r;
        const y = 44 + Math.sin(angle) * r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, 'rgba(167,139,250,0.7)');
        g.addColorStop(1, 'rgba(167,139,250,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 0.03;
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  _setMode(key, btn) {
    this.mode = key;
    document.querySelectorAll('.ph-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  _setLen(n, btn) {
    this.sessLen = n;
    document.querySelectorAll('.ph-len-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  _toggleCefr(level, btn) {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
      if (!this.cefrFilter.includes(level)) this.cefrFilter.push(level);
    } else {
      this.cefrFilter = this.cefrFilter.filter(l => l !== level);
    }
  }

  // ── OTURUM BAŞLAT ─────────────────────────────────────────────
  _startSession() {
    const mastery = this.app.state.get('mastery') || {};
    const now     = Date.now();

    let pool = WORDS.filter(w => {
      if (!w.en || !w.tr) return false;
      if (this.cefrFilter.length && !this.cefrFilter.includes(w.level)) return false;
      return true;
    });

    // Tekrar edilmesi gerekenler önce
    const due   = pool.filter(w => { const m = mastery[w.id]; return m && m.score > 0 && m.score < 5 && (m.nextReview||0) <= now; });
    const fresh = pool.filter(w => !mastery[w.id] || mastery[w.id].score === 0);
    const rest  = pool.filter(w => { const m = mastery[w.id]; return m && m.score >= 5; });

    pool = [...due, ...fresh, ...rest];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    this.queue        = pool.slice(0, this.sessLen);
    this.idx          = 0;
    this.score        = 0;
    this.combo        = 0;
    this.hintsLeft    = 3;
    this.perfectWords = 0;
    this.missedWords  = [];

    if (!this.queue.length) {
      UI.toast('Bu filtrelerle kelime bulunamadı!');
      return;
    }

    this._renderChamber();
    this._nextWord();
  }

  // ── ARENA ────────────────────────────────────────────────────
  _renderChamber() {
    this.root.innerHTML = `
      <div class="ph-chamber" id="ph-chamber">

        <canvas class="ph-neural-canvas" id="ph-neural-canvas"></canvas>

        <div class="ph-screen-flash" id="ph-flash"></div>

        <div class="ph-topbar">
          <button class="ph-exit" onclick="window.phantomMod._confirmExit()">← Çık</button>
          <div class="ph-progress-wrap">
            <span class="ph-counter" id="ph-counter">1/${this.queue.length}</span>
            <div class="ph-prog-track">
              <div class="ph-prog-fill" id="ph-prog-fill" style="width:0%"></div>
            </div>
          </div>
          <div class="ph-topbar-right">
            <span class="ph-combo" id="ph-combo" style="display:none">🔥×<span id="ph-combo-val">1</span></span>
            <span class="ph-score-chip" id="ph-score">0 XP</span>
          </div>
        </div>

        <div class="ph-word-info" id="ph-word-info" style="opacity:0"></div>

        <div class="ph-stage" id="ph-stage">
          <div class="ph-fog" id="ph-fog"></div>

          <div class="ph-letters-wrap" id="ph-letters-wrap">
            <div class="ph-letters" id="ph-letters"></div>
          </div>

          <div class="ph-status" id="ph-status"></div>

          <div class="ph-meta" id="ph-meta" style="opacity:0">
            <div class="ph-translation" id="ph-translation"></div>
            <div class="ph-ipa" id="ph-ipa"></div>
            <div class="ph-example" id="ph-example"></div>
            ${'' /* Eşanlamlılar */}
            <div class="ph-syns" id="ph-syns"></div>
          </div>
        </div>

        <div class="ph-hint-row" id="ph-hint-row">
          <button class="ph-hint-btn" id="ph-hint-first" onclick="window.phantomMod._hint('first')" title="İlk harfi göster">
            💡 İlk Harf
          </button>
          <button class="ph-hint-btn" id="ph-hint-mid" onclick="window.phantomMod._hint('mid')" title="Orta harfi göster">
            💡 Orta
          </button>
          <button class="ph-hint-btn" id="ph-hint-all" onclick="window.phantomMod._hint('all')" title="Hepsini göster (-50% XP)">
            💡 Tümü <span class="ph-hint-penalty">−50%</span>
          </button>
          <span class="ph-hints-left" id="ph-hints-left">💡 ${this.hintsLeft} hak</span>
        </div>

        <div class="ph-footer">
          <span class="ph-mode-label">${PH_MODES[this.mode].label}</span>
          <button class="ph-skip" onclick="window.phantomMod._skipWord()">Bilmiyorum ⏭</button>
        </div>

        <div class="ph-vkb" id="ph-vkb" style="display:none"></div>

      </div>`;

    this._bindKeys();
    this._setupNeural();
    this._checkMobile();
  }

  _bindKeys() {
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);
    this._kbHandler = e => {
      if (this.aborted) return;
      if (e.key === 'Escape') { e.preventDefault(); this._confirmExit(); return; }
      if (this.phase !== 'recall') return;
      if (e.key === 'Backspace') { e.preventDefault(); this._backspace(); return; }
      if (e.key === ' ') { e.preventDefault(); this._typeChar(' '); return; }
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        this._typeChar(e.key.toLowerCase());
      }
    };
    document.addEventListener('keydown', this._kbHandler);
  }

  _checkMobile() {
    const vkb = document.getElementById('ph-vkb');
    if (!vkb) return;
    if (window.innerWidth <= 820 || 'ontouchstart' in window) {
      vkb.style.display = 'flex';
      this._buildVKB(vkb);
    }
  }

  _buildVKB(container) {
    const rows = ['qwertyuiop','asdfghjkl','zxcvbnm'];
    container.innerHTML = rows.map(row =>
      `<div class="ph-vkb-row">${
        row.split('').map(c =>
          `<button class="ph-key" id="phk-${c}" onclick="window.phantomMod._typeChar('${c}')">${c.toUpperCase()}</button>`
        ).join('')
      }</div>`
    ).join('') +
    `<div class="ph-vkb-row">
       <button class="ph-key ph-key-space" onclick="window.phantomMod._typeChar(' ')">SPACE</button>
       <button class="ph-key ph-key-bs" onclick="window.phantomMod._backspace()">⌫</button>
     </div>`;
  }

  _vkbFlash(c, ok) {
    const key = document.getElementById(`phk-${c}`);
    if (!key) return;
    key.classList.remove('ph-key-ok', 'ph-key-err');
    key.classList.add(ok ? 'ph-key-ok' : 'ph-key-err');
    setTimeout(() => key.classList.remove('ph-key-ok', 'ph-key-err'), 600);
  }

  // ── NÖRAL CANVAS ─────────────────────────────────────────────
  _setupNeural() {
    const canvas = document.getElementById('ph-neural-canvas');
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    this._neuralCanvas = canvas;
    this._neuralCtx    = canvas.getContext('2d');
    this._neuralLines  = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      len: 40 + Math.random() * 80,
      alpha: 0,
    }));
    this._neuralActive = false;
  }

  _startNeural() {
    this._neuralActive = true;
    const loop = () => {
      if (!this._neuralActive || !this._neuralCtx) return;
      const ctx = this._neuralCtx;
      const W   = this._neuralCanvas.width;
      const H   = this._neuralCanvas.height;
      ctx.clearRect(0, 0, W, H);
      for (const l of this._neuralLines) {
        l.x += l.vx; l.y += l.vy;
        if (l.x < 0 || l.x > W) l.vx *= -1;
        if (l.y < 0 || l.y > H) l.vy *= -1;
        l.alpha = Math.min(0.12, l.alpha + 0.003);
        const angle = Math.atan2(l.vy, l.vx);
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + Math.cos(angle) * l.len, l.y + Math.sin(angle) * l.len);
        ctx.stroke();
        // Düğüm noktası
        ctx.fillStyle = '#a78bfa';
        ctx.beginPath();
        ctx.arc(l.x, l.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      this._neuralRaf = requestAnimationFrame(loop);
    };
    this._neuralRaf = requestAnimationFrame(loop);
  }

  _stopNeural() {
    this._neuralActive = false;
    if (this._neuralRaf) { cancelAnimationFrame(this._neuralRaf); this._neuralRaf = null; }
    if (this._neuralCtx && this._neuralCanvas)
      this._neuralCtx.clearRect(0, 0, this._neuralCanvas.width, this._neuralCanvas.height);
  }

  // ── HAFIZA SOĞUMA ─────────────────────────────────────────────
  _startCool() {
    this._coolLevel = 0;
    this._coolTimer = setInterval(() => {
      if (this.phase !== 'recall') return;
      this._coolLevel = Math.min(1, this._coolLevel + 0.015);
      // Kutunun kenarlık opaklığını yavaşça düşür
      const alpha = Math.max(0.06, 0.2 - this._coolLevel * 0.14);
      document.querySelectorAll('.ph-letter.ph-faded').forEach(el => {
        el.style.borderColor = `rgba(167,139,250,${alpha})`;
      });
    }, 400);
  }

  _stopCool() {
    if (this._coolTimer) { clearInterval(this._coolTimer); this._coolTimer = null; }
    this._coolLevel = 0;
  }

  // ── KELIME DÖNGÜSÜ ────────────────────────────────────────────
  async _nextWord() {
    if (this.aborted) return;
    if (this.idx >= this.queue.length) { this._showResult(); return; }

    this.word       = this.queue[this.idx];
    this.typed      = [];
    this.errorCount = 0;
    this.phase      = 'imprint';
    this._stopCool();
    this._stopNeural();

    this._updateTopbar();
    this._setHintBtnsVisible(false);

    // Kelime bilgi bandı
    this._showWordInfo(this.word);

    // Slotlu harf ekranı oluştur
    this._buildLetters(this.word.en);

    // Çeviri + IPA + örnek belir
    await this._showMeta(this.word);
    if (this.aborted) return;

    // Imprint
    await this._runImprint(this.word.en);
    if (this.aborted) return;

    // Recall fazına geç
    this._enterRecall();
  }

  _updateTopbar() {
    const n = this.idx + 1, t = this.queue.length;
    const counter = document.getElementById('ph-counter');
    const fill    = document.getElementById('ph-prog-fill');
    const score   = document.getElementById('ph-score');
    const combo   = document.getElementById('ph-combo');
    const cval    = document.getElementById('ph-combo-val');
    if (counter) counter.textContent = `${n}/${t}`;
    if (fill)    fill.style.width    = `${((n-1) / t) * 100}%`;
    if (score)   score.textContent   = `${this.score} XP`;
    if (combo) {
      const show = this.combo >= 2;
      combo.style.display = show ? 'inline-flex' : 'none';
      if (show && cval) cval.textContent = this.combo;
    }
  }

  _showWordInfo(word) {
    const el = document.getElementById('ph-word-info');
    if (!el) return;
    el.innerHTML =
      `<span class="ph-word-icon">${word.icon||'📝'}</span>
       <span class="ph-cefr" data-level="${word.level}">${word.level}</span>
       <span class="ph-cat">${word.cat}</span>`;
    el.style.opacity = '1';
    el.style.transition = 'opacity 0.4s';
  }

  // ── HARF SLOTLARI ────────────────────────────────────────────
  _buildLetters(word) {
    const wrap = document.getElementById('ph-letters');
    if (!wrap) return;
    wrap.innerHTML = word.split('').map((c, i) =>
      c === ' '
        ? `<span class="ph-letter ph-letter-space ph-faded" id="phl-${i}" data-c=" "></span>`
        : `<span class="ph-letter ph-faded" id="phl-${i}" data-c="${c}">${c}</span>`
    ).join('');
  }

  async _showMeta(word) {
    const meta = document.getElementById('ph-meta');
    const tr   = document.getElementById('ph-translation');
    const ipa  = document.getElementById('ph-ipa');
    const ex   = document.getElementById('ph-example');
    const syns = document.getElementById('ph-syns');
    await _wait(180);
    if (this.aborted) return;
    if (tr)   tr.textContent  = word.tr;
    if (ipa)  ipa.textContent = word.ipa || '';
    if (ex)   ex.textContent  = word.ex ? `"${word.ex}"` : '';
    if (syns) syns.textContent = word.syns?.length ? `≈ ${word.syns.join(', ')}` : '';
    if (meta) meta.style.opacity = '1';
    setTimeout(() => { if (!this.aborted) this.app.speakWord(word.en); }, 280);
  }

  // ── IMPRINT ──────────────────────────────────────────────────
  async _runImprint(word) {
    const cfg    = PH_MODES[this.mode];
    const status = document.getElementById('ph-status');

    if (cfg.allAtOnce) {
      // PHANTOM: hepsi birden
      if (status) { status.textContent = '👁 İzle — hepsini gör'; status.className = 'ph-status ph-status-watch'; }
      word.split('').forEach((_, i) => this._litLetter(i));
      await _wait(cfg.imprintMs);
      if (this.aborted) return;
      // Toplu sönme
      const letters = document.querySelectorAll('.ph-letter');
      letters.forEach(el => el.classList.add('ph-fading-out'));
      await _wait(500);
      letters.forEach(el => { el.classList.remove('ph-lit', 'ph-fading-out'); el.classList.add('ph-faded'); });
    } else {
      // FLASH / GHOST: harf harf, önceki harf yarı-görünür
      if (status) { status.textContent = '👁 Her harfi hafızana işle'; status.className = 'ph-status ph-status-watch'; }
      for (let i = 0; i < word.length; i++) {
        if (this.aborted) return;
        this._litLetter(i);
        await _wait(cfg.imprintMs);
        if (this.aborted) return;
        const el = document.getElementById(`phl-${i}`);
        if (el) { el.classList.remove('ph-lit'); el.classList.add('ph-faded'); }
        await _wait(60);
      }
    }

    if (this.aborted) return;

    // Meta ve word-info solar
    const meta = document.getElementById('ph-meta');
    const wi   = document.getElementById('ph-word-info');
    if (meta) meta.style.opacity = '0';
    if (wi)   wi.style.opacity   = '0';
  }

  _litLetter(i) {
    const el = document.getElementById(`phl-${i}`);
    if (!el) return;
    el.classList.remove('ph-faded');
    el.classList.add('ph-lit');
  }

  // ── RECALL ───────────────────────────────────────────────────
  _enterRecall() {
    if (this.aborted) return;
    this.phase = 'recall';
    this.typed = [];

    const status = document.getElementById('ph-status');
    const fog    = document.getElementById('ph-fog');
    if (status) { status.textContent = '🖊 Şimdi yaz…'; status.className = 'ph-status ph-status-write'; }
    if (fog)    fog.classList.add('ph-fog-active');

    this._updateCursor();
    this._setHintBtnsVisible(true);
    this._startCool();
    this._startNeural();
  }

  _updateCursor() {
    if (!this.word) return;
    const len  = this.word.en.length;
    const next = this.typed.length;
    for (let i = 0; i < len; i++) {
      const el = document.getElementById(`phl-${i}`);
      if (!el) continue;
      if (i < next) {
        el.classList.remove('ph-cursor');
      } else {
        el.classList.toggle('ph-cursor', i === next);
      }
    }
  }

  // ── İPUCU SİSTEMİ ────────────────────────────────────────────
  _setHintBtnsVisible(show) {
    const row = document.getElementById('ph-hint-row');
    if (row) row.style.display = show ? 'flex' : 'none';
  }

  _hint(type) {
    if (this.phase !== 'recall' || !this.word || this.hintsLeft <= 0) return;
    this.hintsLeft--;
    this._hintUsed = true;
    const hl = document.getElementById('ph-hints-left');
    if (hl) hl.textContent = `💡 ${this.hintsLeft} hak`;

    const word = this.word.en.toLowerCase();
    const alreadyTyped = this.typed.length;

    if (type === 'first') {
      // İlk yazılmamış harfi göster
      const pos = alreadyTyped;
      if (pos < word.length) this._revealLetter(pos, 'hint');
    } else if (type === 'mid') {
      const mid = Math.floor(word.length / 2);
      this._revealLetter(mid, 'hint');
    } else if (type === 'all') {
      // Tümünü göster
      for (let i = 0; i < word.length; i++) {
        if (i >= alreadyTyped) this._revealLetter(i, 'hint');
      }
    }

    UI.toast(`💡 İpucu kullanıldı (+${this.hintsLeft < 0 ? 0 : ''}${PH_MODES[this.mode].xp / 2} XP yerine ${PH_MODES[this.mode].xp} XP)`);

    if (this.hintsLeft <= 0) {
      document.querySelectorAll('.ph-hint-btn').forEach(b => b.disabled = true);
    }
  }

  _revealLetter(pos, cls) {
    const el = document.getElementById(`phl-${pos}`);
    if (!el || el.classList.contains('ph-crystal')) return;
    el.classList.remove('ph-faded', 'ph-cursor');
    el.classList.add('ph-hint-glow');
    el.style.opacity = '1';
    el.textContent   = this.word.en[pos];
  }

  // ── KARAKTER GİRİŞİ ──────────────────────────────────────────
  _typeChar(c) {
    if (this.phase !== 'recall' || !this.word) return;
    const word = this.word.en.toLowerCase();
    const pos  = this.typed.length;
    if (pos >= word.length) return;

    // İpucuyla zaten açılmış mı?
    const el = document.getElementById(`phl-${pos}`);
    if (el && el.classList.contains('ph-hint-glow')) {
      // Bu pozisyon ipucuyla açıldı, doğru harfi kabul et
      this.typed.push(word[pos]);
      el.classList.remove('ph-hint-glow', 'ph-cursor');
      el.classList.add('ph-crystal');
      el.style.opacity = '1';
      this.app.audio.play('pop');
      this._updateCursor();
      if (this.typed.length === word.length) this._onWordComplete(true);
      return;
    }

    const ok = word[pos] === c;
    this._vkbFlash(c, ok);

    if (ok) {
      this.typed.push(c);
      if (el) {
        el.classList.remove('ph-faded', 'ph-cursor', 'ph-hint-glow');
        el.classList.add('ph-crystal');
        el.style.opacity = '1';
        el.textContent   = c === ' ' ? '' : c;
      }
      this.app.audio.play('pop');
      // Sonraki pozisyon boşluksa otomatik atla
      while (this.typed.length < word.length && word[this.typed.length] === ' ') {
        const spEl = document.getElementById(`phl-${this.typed.length}`);
        if (spEl) { spEl.classList.remove('ph-faded','ph-cursor'); spEl.classList.add('ph-crystal'); }
        this.typed.push(' ');
      }
      this._updateCursor();
      if (this.typed.length === word.length) this._onWordComplete(true);
    } else {
      this.errorCount++;
      if (el) {
        el.classList.add('ph-error');
        setTimeout(() => el.classList.remove('ph-error'), 320);
      }
      // 3+ yanlış: hafif ekran sarsma
      if (this.errorCount % 3 === 0) this._flashScreen('red');
      this.app.audio.play('error');
    }
  }

  _backspace() {
    if (this.phase !== 'recall' || !this.typed.length) return;
    this.typed.pop();
    const pos = this.typed.length;
    const el  = document.getElementById(`phl-${pos}`);
    if (el) {
      el.classList.remove('ph-crystal', 'ph-hint-glow');
      el.classList.add('ph-faded', 'ph-cursor');
      el.style.removeProperty('color');
      el.style.removeProperty('border-color');
      el.style.removeProperty('box-shadow');
      el.textContent = this.word.en[pos];
    }
    this._updateCursor();
  }

  _skipWord() {
    if (this.phase !== 'recall' && this.phase !== 'imprint') return;
    this.missedWords.push(this.word);
    this.combo = 0;
    this._onWordComplete(false);
  }

  // ── EKRAN FLAŞI ──────────────────────────────────────────────
  _flashScreen(color) {
    const el = document.getElementById('ph-flash');
    if (!el) return;
    el.className = `ph-screen-flash ph-flash-${color} ph-flash-active`;
    setTimeout(() => { el.className = 'ph-screen-flash'; }, 500);
  }

  // ── DALGA KRİSTALİZASYON ─────────────────────────────────────
  async _waveCrystal(word) {
    for (let i = this.typed.length; i < word.length; i++) {
      const el = document.getElementById(`phl-${i}`);
      if (!el) continue;
      el.classList.remove('ph-faded', 'ph-hint-glow', 'ph-cursor');
      el.classList.add('ph-crystal');
      el.style.opacity = '1';
      el.textContent   = word[i] === ' ' ? '' : word[i];
      if (word[i] !== ' ') await _wait(55);
    }
  }

  // ── KOMBO ALEV EFEKTİ ─────────────────────────────────────────
  _showComboFlame(multiplier) {
    const el = document.getElementById('ph-combo');
    if (!el) return;
    el.classList.add('ph-combo-burst');
    setTimeout(() => el.classList.remove('ph-combo-burst'), 700);
    if (multiplier >= 3) this._flashScreen('gold');
    else if (multiplier >= 2) this._flashScreen('violet');
  }

  // ── KELIME TAMAMLANDI ─────────────────────────────────────────
  async _onWordComplete(success) {
    if (this.aborted) return;
    this.phase = 'feedback';
    this._stopCool();
    this._stopNeural();

    const cfg    = PH_MODES[this.mode];
    const word   = this.word;
    const fog    = document.getElementById('ph-fog');
    const status = document.getElementById('ph-status');
    const mastery = this.app.state.get('mastery') || {};
    const m       = mastery[word.id] || {};

    if (success) {
      this.combo++;
      const perfect     = this.errorCount === 0 && !this._hintUsed;
      const cfg         = { xp: window.remoteFlags?.xp_phantom_base ?? 20 };
      const multiplier  = this.combo >= 10 ? 3 : this.combo >= 5 ? 2 : 1;
      const hintPenalty = this._hintUsed ? 0.5 : 1;
      const xp          = Math.round(cfg.xp * multiplier * hintPenalty);
      this.score        += xp;
      if (perfect) this.perfectWords++;
      this._hintUsed = false;

      mastery[word.id] = {
        ...m,
        score:      Math.min(5, (m.score||0) + (perfect ? 2 : 1)),
        interval:   ((m.interval||1) * (perfect ? 2 : 1.5)),
        nextReview: Date.now() + ((m.interval||1) * 86400000),
      };

      this.app.addXP(xp, 'easy');
      this.app.state.set('mastery', mastery);

      // Dalga kristalizasyon
      await this._waveCrystal(word.en);
      if (this.aborted) return;

      if (status) {
        const msgs = ['✨ Süper!','💎 Harika!','⚡ Mükemmel!','🌟 İnanılmaz!'];
        const mult_msg = multiplier >= 3 ? '🔥 EFSANE KOMBO!' : multiplier >= 2 ? '⚡ KOMBO!×2' : '';
        const perf_msg = perfect ? ' ✦ Hatasız!' : '';
        status.textContent = `${mult_msg || msgs[Math.min(this.combo-1, msgs.length-1)]}${perf_msg} +${xp} XP`;
        status.className = 'ph-status ph-status-success';
      }

      if (fog) fog.classList.remove('ph-fog-active');
      this._flashScreen('green');
      if (multiplier >= 2) this._showComboFlame(multiplier);
      this._updateTopbar();

      if (window.confetti && perfect)
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.5 }, colors: ['#a78bfa','#22d3ee','#f5d770'] });

    } else {
      // Başarısız
      this._hintUsed = false;
      this.combo = 0;
      this.missedWords.push(word);
      mastery[word.id] = { ...m, score: Math.max(0, (m.score||0) - 1), interval:1, nextReview: Date.now()+3600000 };
      this.app.state.set('mastery', mastery);

      // Tüm harfleri kırmızı göster
      for (let i = 0; i < word.en.length; i++) {
        const el = document.getElementById(`phl-${i}`);
        if (el) { el.classList.remove('ph-faded','ph-cursor','ph-crystal','ph-hint-glow'); el.classList.add('ph-reveal'); el.style.opacity='1'; el.textContent=word.en[i]; }
      }
      if (status) { status.textContent = `💀 Cevap: ${word.en}`; status.className = 'ph-status ph-status-fail'; }
      if (fog)    fog.classList.remove('ph-fog-active');
      this._flashScreen('red');
      this._updateTopbar();
    }

    this._setHintBtnsVisible(false);

    // Çeviriyi geri göster
    const meta = document.getElementById('ph-meta');
    const tr   = document.getElementById('ph-translation');
    const ex   = document.getElementById('ph-example');
    if (tr)   tr.textContent   = word.tr;
    if (ex)   ex.textContent   = word.ex ? `"${word.ex}"` : '';
    if (meta) meta.style.opacity = '1';

    await _wait(success ? 1300 : 2100);
    if (this.aborted) return;

    this.idx++;
    this._nextWord();
  }

  // ── ÇIKIŞ ONAYI ─────────────────────────────────────────────
  _confirmExit() {
    if (this.phase === 'intro' || this.phase === 'result') { this.app.navigate('learn'); return; }
    const ok = confirm('Oturumdan çıkmak istiyor musun? İlerleme kaydedildi.');
    if (ok) this.app.navigate('learn');
  }

  // ── SONUÇ ────────────────────────────────────────────────────
  _showResult() {
    this.phase = 'result';
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);

    const mastery = this.app.state.get('mastery') || {};
    const total   = this.queue.length;
    const correct = this.queue.filter(w => (mastery[w.id]?.score||0) >= 1).length;
    const pct     = Math.round(correct / total * 100);

    const grade = pct >= 90 ? { icon:'🌟', label:'EFSANE',  cls:'grade-gold',   msg:'Muhteşem bir hafıza!' }
                : pct >= 70 ? { icon:'💎', label:'HARİKA',  cls:'grade-blue',   msg:'Çok güçlü performans!' }
                : pct >= 50 ? { icon:'⚡', label:'İYİ',     cls:'grade-violet', msg:'İyi ilerliyorsun!' }
                :             { icon:'💪', label:'DEVAM ET', cls:'grade-gray',   msg:'Pratik seni mükemmelleştirir.' };

    // XP sayaç animasyonu için başlangıç
    const finalScore = this.score;

    this.root.innerHTML = `
      <div class="ph-result">

        <div class="ph-result-grade ${grade.cls}">
          <div class="ph-grade-icon">${grade.icon}</div>
          <div class="ph-grade-label">${grade.label}</div>
        </div>

        <div class="ph-result-header">
          <h2 class="ph-result-title">Oturum Tamamlandı</h2>
          <p class="ph-result-msg">${grade.msg}</p>
        </div>

        <div class="ph-result-stats">
          <div class="ph-rs ph-rs-xp">
            <span class="ph-rs-val" id="ph-rs-xp-val">0</span>
            <span class="ph-rs-lbl">XP Kazanıldı</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val">${correct}/${total}</span>
            <span class="ph-rs-lbl">Doğru</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val ${pct >= 80 ? 'ph-rs-green' : ''}">${pct}%</span>
            <span class="ph-rs-lbl">Başarı</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val ph-rs-gold">${this.perfectWords}</span>
            <span class="ph-rs-lbl">Hatasız ✦</span>
          </div>
        </div>

        ${this.missedWords.length ? `
        <div class="ph-missed-block">
          <div class="ph-missed-title">📌 Çalışman Gereken Kelimeler</div>
          <div class="ph-missed-list">
            ${[...new Set(this.missedWords.map(w=>w.id))].map(id => {
              const w = this.missedWords.find(x=>x.id===id);
              return `<div class="ph-missed-item">
                <span class="ph-mi-icon">${w.icon||'📝'}</span>
                <span class="ph-mi-en">${w.en}</span>
                <span class="ph-mi-tr">${w.tr}</span>
                <button class="ph-mi-listen" onclick="app.speakWord('${w.en}')">🔊</button>
              </div>`;
            }).join('')}
          </div>
        </div>` : ''}

        <div class="ph-result-words">
          <div class="ph-rw-title">Tüm Kelimeler</div>
          ${this.queue.map(w => {
            const ok  = (mastery[w.id]?.score||0) >= 1;
            const perf = this.perfectWords > 0 && ok && !this.missedWords.find(x=>x.id===w.id);
            return `<div class="ph-rw ${ok?'ph-rw-ok':'ph-rw-miss'}">
              <span class="ph-rw-icon">${w.icon||'📝'}</span>
              <span class="ph-rw-en">${w.en}</span>
              <span class="ph-rw-tr">${w.tr}</span>
              <span class="ph-rw-mark">${ok ? (perf ? '✦' : '✓') : '✗'}</span>
            </div>`;
          }).join('')}
        </div>

        <div class="ph-result-acts">
          <button class="ph-start-btn" onclick="window.phantomMod._startSession()">🔄 Yeniden Oyna</button>
          <button class="ph-back-btn" onclick="app.navigate('learn')">← Ana Merkez</button>
        </div>

      </div>`;

    // XP sayaç animasyonu
    let displayed = 0;
    const step = Math.max(1, Math.floor(finalScore / 40));
    const counter = document.getElementById('ph-rs-xp-val');
    const iv = setInterval(() => {
      displayed = Math.min(finalScore, displayed + step);
      if (counter) counter.textContent = displayed;
      if (displayed >= finalScore) clearInterval(iv);
    }, 25);

    if (window.confetti && pct >= 70)
      confetti({ particleCount: 130, spread: 85, origin: { y: 0.35 } });
  }
}
