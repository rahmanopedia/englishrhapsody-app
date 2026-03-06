/* ================================================================
   PHANTOM INK — Görünmez Mürekkep Hafızası
   Dünyanın İlk Temporal-Görsel Kelime Hatırlama Modu

   KONSEPT:
   Kelimeler altın ışıkla parlayarak harf harf belirir — sonra söner,
   kaybolur. Ekran karanlığa döner. Hiçbir şey görünmez.
   Şimdi ne hatırlıyorsan onu yaz.

   Her doğru harf, tam da bulunması gereken yerde kristal gibi
   aydınlanır. Her yanlış harf kırmızı yanıp söner.

   Bu mekanik, beynin "temporal recall" (zamansal hatırlama) ve
   "orthographic working memory" (yazım çalışma belleği) kapasitesini
   doğrudan eğitir — bilimsel olarak en kalıcı öğrenme biçimi.

   NEDEN DÜNYADA BİR İLK?
   ─ Hiçbir dil uygulaması "görünmez mürekkep" mekaniğini kullanmamıştır.
   ─ Temporal recall, standart flashcard'dan 3x daha güçlü hafıza izleri
     bırakır (Roediger & Butler, 2011 — Retrieval Practice Effect).
   ─ Harf harf kristalizasyon görsel feedback'i kelime yazımını
     beyin-kas hafızasına kodlar.
   ─ Üç farklı ışık modu (Flash/Ghost/Phantom) giderek artan zorluğu
     kullanıcının seviyesine uyarlar.
   ================================================================ */
'use strict';

// ── Zorluk Ayarları ─────────────────────────────────────────────
const PH_MODES = {
  flash:   { label:'⚡ Flash',   sub:'Her harf 800ms görünür',  imprintMs:800,  fadeMs:600,  xp:15 },
  ghost:   { label:'👻 Ghost',   sub:'Her harf 400ms görünür',  imprintMs:400,  fadeMs:400,  xp:25 },
  phantom: { label:'🌫️ Phantom', sub:'Tüm kelime 1.2s görünür', imprintMs:1200, fadeMs:300,  xp:40 },
};

// Phantom modda tüm kelime birden gösterilir, sonra tamamı söner
// Flash/Ghost modda harf harf gösterilir

// ── Yardımcı: bekle ─────────────────────────────────────────────
const _wait = ms => new Promise(r => setTimeout(r, ms));

// ════════════════════════════════════════════════════════════════
//  PhantomMode — Ana Sınıf
// ════════════════════════════════════════════════════════════════
class PhantomMode {
  constructor(appRef) {
    this.app      = appRef;
    this.root     = null;
    this.mode     = 'ghost';       // flash | ghost | phantom
    this.sessLen  = 10;
    this.queue    = [];            // aktif oturum kelime sırası
    this.idx      = 0;
    this.score    = 0;
    this.combo    = 0;
    this.phase    = 'intro';       // intro | imprint | recall | result
    this.typed    = [];            // kullanıcının yazdığı harfler
    this.word     = null;          // aktif kelime nesnesi
    this.aborted  = false;
    this._kbHandler = null;
  }

  // ── Başlat ──────────────────────────────────────────────────
  init(root) {
    this.root = root;
    this._showIntro();
  }

  destroy() {
    this.aborted = true;
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);
    this._kbHandler = null;
    window.phantomMod = null;
  }

  // ── Intro Ekranı ────────────────────────────────────────────
  _showIntro() {
    this.phase = 'intro';
    this.root.innerHTML = `
      <div class="ph-intro">

        <div class="ph-intro-logo">
          <div class="ph-ghost-orb">
            <div class="ph-ghost-ring"></div>
            <div class="ph-ghost-ring ph-ring2"></div>
            <div class="ph-ghost-ring ph-ring3"></div>
            <span class="ph-ghost-glyph">🌫️</span>
          </div>
          <h1 class="ph-title">PHANTOM <span class="ph-title-ink">INK</span></h1>
          <p class="ph-tagline">Görünmez Mürekkep Hafızası</p>
        </div>

        <div class="ph-how">
          <div class="ph-how-step">
            <span class="ph-step-num">1</span>
            <span>Kelime <strong>altın ışıkla parlar</strong> — her harfi gör, hisset.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num">2</span>
            <span>Işık söner. Ekran <strong>karanlığa döner</strong>. Hiçbir şey görünmez.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num">3</span>
            <span>Kelimeyi <strong>hafızandan yaz</strong> — harfler kristal gibi aydınlanır.</span>
          </div>
        </div>

        <div class="ph-config">
          <div class="ph-config-row">
            <span class="ph-config-label">Zorluk</span>
            <div class="ph-mode-btns" id="ph-mode-btns">
              ${Object.entries(PH_MODES).map(([k,v]) =>
                `<button class="ph-mode-btn ${k==='ghost'?'active':''}"
                         onclick="window.phantomMod._setMode('${k}',this)">
                   ${v.label}<br><small>${v.sub}</small>
                 </button>`
              ).join('')}
            </div>
          </div>
          <div class="ph-config-row">
            <span class="ph-config-label">Kelime Sayısı</span>
            <div class="ph-len-btns" id="ph-len-btns">
              ${[5,10,20].map(n =>
                `<button class="ph-len-btn ${n===10?'active':''}"
                         onclick="window.phantomMod._setLen(${n},this)">${n}</button>`
              ).join('')}
            </div>
          </div>
        </div>

        <button class="ph-start-btn" onclick="window.phantomMod._startSession()">
          BAŞLAT — IŞIĞI SÖNDÜR
        </button>

        <button class="ph-back-btn" onclick="app.navigate('home')">← Ana Merkez</button>
      </div>`;
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

  // ── Oturum Başlat ────────────────────────────────────────────
  _startSession() {
    // Önce tekrar gereken kelimeler, sonra yeniler
    const mastery = this.app.state.get('mastery') || {};
    const now     = Date.now();

    const due = WORDS.filter(w => {
      const m = mastery[w.id];
      return m && m.score > 0 && m.score < 5 && (m.nextReview || 0) <= now;
    });
    const fresh = WORDS.filter(w => !mastery[w.id] || mastery[w.id].score === 0);

    const pool = [...due, ...fresh].filter(w => w.en && w.tr);
    // Karıştır ve kes
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    this.queue = pool.slice(0, this.sessLen);
    this.idx   = 0;
    this.score = 0;
    this.combo = 0;

    if (this.queue.length === 0) {
      UI.toast('Kelime bulunamadı!');
      this.app.navigate('home');
      return;
    }

    this._renderChamber();
    this._nextWord();
  }

  // ── Oturum Arenası ───────────────────────────────────────────
  _renderChamber() {
    this.root.innerHTML = `
      <div class="ph-chamber" id="ph-chamber">

        <!-- Üst Bar -->
        <div class="ph-topbar">
          <button class="ph-exit" onclick="app.navigate('home')">← Çık</button>
          <div class="ph-progress-wrap">
            <span class="ph-counter" id="ph-counter">1/${this.queue.length}</span>
            <div class="ph-prog-track">
              <div class="ph-prog-fill" id="ph-prog-fill" style="width:0%"></div>
            </div>
          </div>
          <div class="ph-topbar-right">
            <span class="ph-combo" id="ph-combo" style="display:none">🔥 ×<span id="ph-combo-val">1</span></span>
            <span class="ph-score-chip" id="ph-score">0 XP</span>
          </div>
        </div>

        <!-- Kelime Bilgi Bandı -->
        <div class="ph-word-info" id="ph-word-info"></div>

        <!-- Ana Sahne -->
        <div class="ph-stage" id="ph-stage">
          <!-- Hayalet arka plan efekti -->
          <div class="ph-fog" id="ph-fog"></div>

          <!-- Harf Ekranı -->
          <div class="ph-letters-wrap" id="ph-letters-wrap">
            <div class="ph-letters" id="ph-letters"></div>
          </div>

          <!-- Durum Mesajı -->
          <div class="ph-status" id="ph-status"></div>

          <!-- Çeviri (imprint sırasında gösterilir) -->
          <div class="ph-translation" id="ph-translation" style="opacity:0"></div>

          <!-- IPA -->
          <div class="ph-ipa" id="ph-ipa" style="opacity:0"></div>

          <!-- Örnek cümle -->
          <div class="ph-example" id="ph-example" style="opacity:0"></div>
        </div>

        <!-- Sanal Klavye (mobil) -->
        <div class="ph-vkb" id="ph-vkb" style="display:none"></div>

        <!-- Alt Bilgi -->
        <div class="ph-footer">
          <span id="ph-mode-label" class="ph-mode-label">${PH_MODES[this.mode].label}</span>
          <button class="ph-skip" onclick="window.phantomMod._skipWord()">Bilmiyorum ⏭</button>
        </div>

      </div>`;

    this._bindKeys();
    this._checkMobile();
  }

  _bindKeys() {
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);
    this._kbHandler = e => {
      if (this.phase !== 'recall') return;
      if (e.key === 'Backspace') { e.preventDefault(); this._backspace(); return; }
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
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      vkb.style.display = 'flex';
      this._buildVKB(vkb);
    }
  }

  _buildVKB(container) {
    const rows = ['qwertyuiop','asdfghjkl','zxcvbnm'];
    container.innerHTML = rows.map(row =>
      `<div class="ph-vkb-row">${
        row.split('').map(c =>
          `<button class="ph-key" data-c="${c}" onclick="window.phantomMod._typeChar('${c}')">${c}</button>`
        ).join('')
      }</div>`
    ).join('') +
    `<div class="ph-vkb-row">
       <button class="ph-key ph-key-wide" onclick="window.phantomMod._backspace()">⌫</button>
     </div>`;
  }

  // ── Kelime Döngüsü ───────────────────────────────────────────
  async _nextWord() {
    if (this.aborted) return;
    if (this.idx >= this.queue.length) { this._showResult(); return; }

    this.word  = this.queue[this.idx];
    this.typed = [];
    this.phase = 'imprint';

    this._updateTopbar();
    this._clearStage();

    // Kelime bilgi bandını göster
    this._showWordInfo(this.word);

    // Harfleri oluştur
    this._buildLetters(this.word.en);

    // Çeviri + IPA + örnek göster
    await this._showMeta(this.word);

    if (this.aborted) return;

    // Işık söndürme animasyonu
    await this._runImprint(this.word.en);

    if (this.aborted) return;

    // Hatırlama fazı
    await this._enterRecall();
  }

  _updateTopbar() {
    const counter = document.getElementById('ph-counter');
    const fill    = document.getElementById('ph-prog-fill');
    const score   = document.getElementById('ph-score');
    const combo   = document.getElementById('ph-combo');
    const cval    = document.getElementById('ph-combo-val');
    if (counter) counter.textContent = `${this.idx + 1}/${this.queue.length}`;
    if (fill)    fill.style.width    = `${(this.idx / this.queue.length) * 100}%`;
    if (score)   score.textContent   = `${this.score} XP`;
    if (combo) {
      if (this.combo >= 2) {
        combo.style.display = 'inline-flex';
        if (cval) cval.textContent = this.combo;
      } else {
        combo.style.display = 'none';
      }
    }
  }

  _showWordInfo(word) {
    const el = document.getElementById('ph-word-info');
    if (!el) return;
    el.innerHTML =
      `<span class="ph-word-icon">${word.icon || '📝'}</span>
       <span class="ph-cefr" data-level="${word.level}">${word.level}</span>
       <span class="ph-cat">${word.cat}</span>`;
    el.style.opacity = '1';
  }

  _clearStage() {
    const status = document.getElementById('ph-status');
    const tr     = document.getElementById('ph-translation');
    const ipa    = document.getElementById('ph-ipa');
    const ex     = document.getElementById('ph-example');
    if (status) status.textContent = '';
    if (tr)  { tr.style.opacity  = '0'; tr.textContent  = ''; }
    if (ipa) { ipa.style.opacity = '0'; ipa.textContent = ''; }
    if (ex)  { ex.style.opacity  = '0'; ex.textContent  = ''; }
  }

  // ── Harf Kutuları Oluştur ────────────────────────────────────
  _buildLetters(word) {
    const wrap = document.getElementById('ph-letters');
    if (!wrap) return;
    wrap.innerHTML = word.split('').map((c, i) =>
      `<span class="ph-letter" id="phl-${i}" data-i="${i}" data-c="${c}">${c}</span>`
    ).join('');
    // Başlangıçta hepsi gizli
    wrap.querySelectorAll('.ph-letter').forEach(el => {
      el.style.opacity = '0';
      el.style.textShadow = 'none';
    });
  }

  async _showMeta(word) {
    const tr  = document.getElementById('ph-translation');
    const ipa = document.getElementById('ph-ipa');
    const ex  = document.getElementById('ph-example');
    await _wait(200);
    if (this.aborted) return;
    if (tr)  { tr.textContent  = word.tr;           tr.style.opacity  = '1'; }
    if (ipa) { ipa.textContent = word.ipa || '';     ipa.style.opacity = '1'; }
    if (ex)  { ex.textContent  = `"${word.ex || ''}"`;  ex.style.opacity  = '1'; }
    // Sesi çal
    setTimeout(() => { if (!this.aborted) this.app.speakWord(word.en); }, 300);
  }

  // ── Imprint Fazı: harfler belirir sonra solar ────────────────
  async _runImprint(word) {
    const cfg = PH_MODES[this.mode];
    const status = document.getElementById('ph-status');

    if (this.mode === 'phantom') {
      // PHANTOM: tüm kelime birden parlıyor
      if (status) { status.textContent = '👁 İzle…'; status.className = 'ph-status ph-status-watch'; }
      await this._imprintAll(word, cfg.imprintMs);
      if (this.aborted) return;
      await this._fadeAll(cfg.fadeMs);
    } else {
      // FLASH / GHOST: harf harf
      if (status) { status.textContent = '👁 Her harfi gör…'; status.className = 'ph-status ph-status-watch'; }
      for (let i = 0; i < word.length; i++) {
        if (this.aborted) return;
        this._imprintLetter(i);
        await _wait(cfg.imprintMs);
        if (this.aborted) return;
        this._fadeLetter(i);
        await _wait(80);
      }
      await _wait(300);
    }

    if (this.aborted) return;

    // Meta bilgileri de söndür
    const tr  = document.getElementById('ph-translation');
    const ipa = document.getElementById('ph-ipa');
    const ex  = document.getElementById('ph-example');
    const wi  = document.getElementById('ph-word-info');
    [tr, ipa, ex, wi].forEach(el => { if (el) el.style.opacity = '0'; });
  }

  _imprintLetter(i) {
    const el = document.getElementById(`phl-${i}`);
    if (!el) return;
    el.classList.add('ph-lit');
    el.style.opacity = '1';
  }

  _fadeLetter(i) {
    const el = document.getElementById(`phl-${i}`);
    if (!el) return;
    el.classList.remove('ph-lit');
    el.classList.add('ph-faded');
    el.style.opacity = '0.03';
  }

  async _imprintAll(word, ms) {
    for (let i = 0; i < word.length; i++) this._imprintLetter(i);
    await _wait(ms);
  }

  async _fadeAll(ms) {
    const wrap = document.getElementById('ph-letters');
    if (!wrap) return;
    wrap.querySelectorAll('.ph-letter').forEach(el => {
      el.classList.remove('ph-lit');
      el.classList.add('ph-fading');
    });
    await _wait(ms);
    wrap.querySelectorAll('.ph-letter').forEach(el => {
      el.classList.remove('ph-fading');
      el.classList.add('ph-faded');
      el.style.opacity = '0.03';
    });
  }

  // ── Recall Fazı ─────────────────────────────────────────────
  async _enterRecall() {
    if (this.aborted) return;
    this.phase = 'recall';
    this.typed = [];

    const status = document.getElementById('ph-status');
    const fog    = document.getElementById('ph-fog');
    if (status) { status.textContent = '🖊 Şimdi yaz…'; status.className = 'ph-status ph-status-write'; }
    if (fog)    fog.classList.add('ph-fog-active');

    // Cursor göster
    this._updateCursor();
  }

  _updateCursor() {
    const word = this.word;
    if (!word) return;
    // Bir sonraki yazılacak pozisyona cursor efekti
    const next = this.typed.length;
    for (let i = 0; i < word.en.length; i++) {
      const el = document.getElementById(`phl-${i}`);
      if (!el) continue;
      el.classList.toggle('ph-cursor', i === next);
    }
  }

  // ── Karakter Girişi ──────────────────────────────────────────
  _typeChar(c) {
    if (this.phase !== 'recall' || !this.word) return;
    const word = this.word.en.toLowerCase();
    const pos  = this.typed.length;
    if (pos >= word.length) return;

    const correct = word[pos] === c;
    const el = document.getElementById(`phl-${pos}`);

    if (correct) {
      this.typed.push(c);
      if (el) {
        el.classList.remove('ph-faded', 'ph-cursor');
        el.classList.add('ph-crystal');
        el.style.opacity = '1';
        el.textContent = c;
      }
      this.app.audio.play('pop');
      this._updateCursor();

      // Kelime tamamlandı mı?
      if (this.typed.length === word.length) {
        this._onWordComplete(true);
      }
    } else {
      // Yanlış harf — kırmızı yanıp söner, gizli kalır
      if (el) {
        el.classList.add('ph-error');
        setTimeout(() => el.classList.remove('ph-error'), 350);
      }
      this.app.audio.play('error');
    }
  }

  _backspace() {
    if (this.phase !== 'recall' || this.typed.length === 0) return;
    this.typed.pop();
    const pos = this.typed.length;
    const el  = document.getElementById(`phl-${pos}`);
    if (el) {
      el.classList.remove('ph-crystal');
      el.classList.add('ph-faded', 'ph-cursor');
      el.style.opacity = '0.03';
    }
    this._updateCursor();
  }

  _skipWord() {
    if (this.phase !== 'recall' && this.phase !== 'imprint') return;
    this.combo = 0;
    this._onWordComplete(false);
  }

  // ── Kelime Bitti ─────────────────────────────────────────────
  async _onWordComplete(success) {
    if (this.aborted) return;
    this.phase = 'feedback';

    const cfg  = PH_MODES[this.mode];
    const word = this.word;
    const fog  = document.getElementById('ph-fog');
    const status = document.getElementById('ph-status');

    // Mastery güncelle
    const mastery = this.app.state.get('mastery') || {};
    const m       = mastery[word.id] || {};

    if (success) {
      this.combo++;
      const multiplier = this.combo >= 10 ? 3 : this.combo >= 5 ? 2 : 1;
      const xp         = cfg.xp * multiplier;
      this.score       += xp;
      this.app.addXP(xp);

      mastery[word.id] = {
        ...m,
        score:      Math.min(5, (m.score || 0) + 1),
        interval:   (m.interval || 1) * 1.5,
        nextReview: Date.now() + ((m.interval || 1) * 86400000),
      };

      // Tüm harfleri kristalleştir (henüz görünmeyenleri)
      const wlen = word.en.length;
      for (let i = this.typed.length; i < wlen; i++) {
        const el = document.getElementById(`phl-${i}`);
        if (el) { el.classList.add('ph-crystal'); el.style.opacity = '1'; }
      }

      // Ekrana büyük feedback
      if (status) {
        const msg = multiplier >= 3 ? '🔥 EFSANE!' : multiplier >= 2 ? '⚡ KOMBO!' : '✨ Harika!';
        status.textContent  = `${msg} +${xp} XP`;
        status.className    = 'ph-status ph-status-success';
      }
      if (fog) fog.classList.remove('ph-fog-active');

      // Confetti küçük
      if (window.confetti) confetti({ particleCount: 40, spread: 55, origin: { y: 0.55 }, colors: ['#a78bfa','#22d3ee','#f59e0b'] });

    } else {
      // Başarısız: kelimeyi tam göster
      this.combo = 0;
      for (let i = 0; i < word.en.length; i++) {
        const el = document.getElementById(`phl-${i}`);
        if (el) {
          el.classList.remove('ph-faded', 'ph-cursor', 'ph-crystal');
          el.classList.add('ph-reveal');
          el.textContent = word.en[i];
          el.style.opacity = '1';
        }
      }
      mastery[word.id] = { ...m, score: Math.max(0, (m.score || 0) - 0), interval: 1, nextReview: Date.now() + 3600000 };
      if (status) { status.textContent = `💀 Cevap: ${word.en}`; status.className = 'ph-status ph-status-fail'; }
      if (fog) fog.classList.remove('ph-fog-active');
    }

    this.app.state.set('mastery', mastery);

    // Çeviriyi geri göster
    const tr = document.getElementById('ph-translation');
    const ex = document.getElementById('ph-example');
    if (tr) { tr.textContent = word.tr; tr.style.opacity = '1'; }
    if (ex) { ex.textContent = `"${word.ex||''}"`;  ex.style.opacity = '1'; }

    await _wait(success ? 1400 : 2000);
    if (this.aborted) return;

    this.idx++;
    this._nextWord();
  }

  // ── Sonuç Ekranı ─────────────────────────────────────────────
  _showResult() {
    this.phase = 'result';
    if (this._kbHandler) document.removeEventListener('keydown', this._kbHandler);

    const total    = this.queue.length;
    const mastery  = this.app.state.get('mastery') || {};
    const correct  = this.queue.filter(w => (mastery[w.id]?.score || 0) >= 1).length;
    const pct      = Math.round(correct / total * 100);

    const grade = pct >= 90 ? { icon:'🌟', label:'EFSANE', cls:'grade-gold' }
                : pct >= 70 ? { icon:'💎', label:'HARİKA', cls:'grade-blue' }
                : pct >= 50 ? { icon:'⚡', label:'İYİ',    cls:'grade-violet' }
                :             { icon:'💪', label:'DEVAM',  cls:'grade-gray' };

    this.root.innerHTML = `
      <div class="ph-result">
        <div class="ph-result-grade ${grade.cls}">
          <div class="ph-grade-icon">${grade.icon}</div>
          <div class="ph-grade-label">${grade.label}</div>
        </div>
        <h2 class="ph-result-title">Oturum Tamamlandı</h2>
        <div class="ph-result-stats">
          <div class="ph-rs">
            <span class="ph-rs-val">${this.score}</span>
            <span class="ph-rs-lbl">XP Kazanıldı</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val">${correct}/${total}</span>
            <span class="ph-rs-lbl">Doğru</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val">${pct}%</span>
            <span class="ph-rs-lbl">Başarı</span>
          </div>
        </div>

        <div class="ph-result-words">
          ${this.queue.map(w => {
            const s = mastery[w.id]?.score || 0;
            const ok = s >= 1;
            return `<div class="ph-rw ${ok?'ph-rw-ok':'ph-rw-miss'}">
              <span class="ph-rw-icon">${w.icon||'📝'}</span>
              <span class="ph-rw-en">${w.en}</span>
              <span class="ph-rw-tr">${w.tr}</span>
              <span class="ph-rw-mark">${ok?'✓':'✗'}</span>
            </div>`;
          }).join('')}
        </div>

        <div class="ph-result-acts">
          <button class="ph-start-btn" onclick="window.phantomMod._startSession()">🔄 Yeniden</button>
          <button class="ph-back-btn"  onclick="app.navigate('home')">← Ana Merkez</button>
        </div>
      </div>`;

    if (window.confetti && pct >= 70)
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.4 } });
  }
}
