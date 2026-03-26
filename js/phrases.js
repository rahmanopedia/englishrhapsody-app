/**
 * ╔════════════════════════════════════════════════════════════╗
 * ║   RHAPSODY PHRASE THEATER  ·  v3.0                        ║
 * ║   3 Mod · Sinematik Atmosfer · Mastery Takibi             ║
 * ╚════════════════════════════════════════════════════════════╝
 */

const PTH_GENRES = {
  /* Türkçe kategoriler */
  'Aksiyon':     { cls: 'action',   icon: '⚔️',  label: 'Aksiyon' },
  'Bilim Kurgu': { cls: 'scifi',    icon: '🚀',  label: 'Bilim Kurgu' },
  'Komedi':      { cls: 'comedy',   icon: '😄',  label: 'Komedi' },
  'Drama':       { cls: 'drama',    icon: '🎭',  label: 'Drama' },
  'Romantik':    { cls: 'romance',  icon: '💕',  label: 'Romantik' },
  'Müzikal':     { cls: 'musical',  icon: '🎵',  label: 'Müzikal' },
  'Gerilim':     { cls: 'thriller', icon: '🔪',  label: 'Gerilim' },
  'Spor':        { cls: 'sport',    icon: '⚽',  label: 'Spor' },
  'Animasyon':   { cls: 'anim',     icon: '✨',  label: 'Animasyon' },
  /* İngilizce kategoriler */
  'Daily Life':  { cls: 'comedy',   icon: '🏠',  label: 'Günlük Hayat' },
  'Work':        { cls: 'drama',    icon: '💼',  label: 'İş Hayatı' },
  'Food & Drink':{ cls: 'comedy',   icon: '🍽️',  label: 'Yemek & İçecek' },
  'Travel':      { cls: 'scifi',    icon: '✈️',  label: 'Seyahat' },
  'Shopping':    { cls: 'musical',  icon: '🛍️',  label: 'Alışveriş' },
  'Health':      { cls: 'thriller', icon: '❤️',  label: 'Sağlık' },
  'Education':   { cls: 'default',  icon: '📚',  label: 'Eğitim' },
  'Sports':      { cls: 'sport',    icon: '⚽',  label: 'Spor' },
  'Technology':  { cls: 'scifi',    icon: '💻',  label: 'Teknoloji' },
  'Nature':      { cls: 'thriller', icon: '🌿',  label: 'Doğa' },
};
const PTH_DEFAULT_GENRE = { cls: 'default', icon: '🎬', label: 'Film' };
const MASTERY_COLORS = ['pth-m0', 'pth-m1', 'pth-m2', 'pth-m3'];

class PhrasesModule {
  constructor(app) {
    this.app   = app;
    this.el    = null;
    this.data  = [];          // all phrases
    this.idx   = 0;
    this.mode  = 'cinema';    // 'cinema' | 'fillblank' | 'multichoice'
    this.revealed    = false;
    try { this.mastery = JSON.parse(localStorage.getItem('pth-mastery') || '{}'); } catch { this.mastery = {}; }
    try { this.favorites = new Set(JSON.parse(localStorage.getItem('pth-favs') || '[]')); } catch { this.favorites = new Set(); }
    this.session     = { correct: 0, wrong: 0 };
    this._txStart    = 0;
    this._tyStart    = 0;
    this._blankMeta  = null;   // { answers[], indices[], filled[] }
    this._speakTimer = null;
  }

  /* ──────────────────────── INIT ──────────────────────── */

  init(el) {
    this.el = el;
    if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) {
      el.innerHTML = '<div style="color:#fff;padding:60px 20px;text-align:center;font-size:1.1rem">Veri yükleniyor…</div>';
      return;
    }
    this._loadData();
    this._render();
  }

  _loadData() {
    const raw = [];
    let uid = 0;

    for (const entry of CINEMA_DATA) {
      const genre = PTH_GENRES[entry.category] || PTH_DEFAULT_GENRE;
      const film  = entry.film || 'Rhapsody Cinema';
      const year  = entry.year || '';

      // Her sorudan ayrı bir kart oluştur
      if (Array.isArray(entry.questions)) {
        for (const q of entry.questions) {
          if (q.phrase && q.correct) {
            raw.push({
              id:    `p${uid++}`,
              en:    q.phrase.trim(),
              tr:    q.correct.trim(),
              wrong: q.wrong ? [q.wrong.trim()] : [],
              film, year, genre,
            });
          }
        }
      }

      // options[] yapısını da destekle (karma veri için)
      if (Array.isArray(entry.options)) {
        const correct = entry.options.find(o => o.isCorrect);
        if (entry.transcript && correct) {
          raw.push({
            id:    `p${uid++}`,
            en:    entry.transcript.trim(),
            tr:    correct.text.trim(),
            wrong: entry.options.filter(o => !o.isCorrect).map(o => o.text),
            film, year, genre,
          });
        }
      }
    }

    this.data = this._shuffle(raw.filter(e => e.en && e.tr));
  }

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ──────────────────────── MAIN RENDER ──────────────────────── */

  _render() {
    this.el.innerHTML = `
      <div class="pth-root" id="pth-root">

        <!-- Atmospheric Background -->
        <div class="pth-atm" id="pth-atm">
          <div class="pth-orb pth-orb-a"></div>
          <div class="pth-orb pth-orb-b"></div>
          <div class="pth-orb pth-orb-c"></div>
        </div>

        <!-- Top Bar -->
        <div class="pth-topbar">
          <button class="pth-exit-btn" id="pth-exit" aria-label="Geri">‹</button>
          <div class="pth-topbar-mid">
            <div class="pth-logo-line">🎬 Phrase Theater</div>
            <div class="pth-counter" id="pth-counter"></div>
          </div>
          <button class="pth-fav-btn" id="pth-fav" aria-label="Favorilere ekle">♡</button>
        </div>

        <!-- Mode Tabs -->
        <div class="pth-tabs">
          <button class="pth-tab active" data-mode="cinema">🎬 Sinema</button>
          <button class="pth-tab" data-mode="fillblank">✏️ Boşluk</button>
          <button class="pth-tab" data-mode="multichoice">🎯 Seçim</button>
        </div>

        <!-- Progress -->
        <div class="pth-prog-track">
          <div class="pth-prog-fill" id="pth-prog" style="width:0%"></div>
        </div>

        <!-- Card Stage -->
        <div class="pth-stage">
          <div class="pth-card-wrap" id="pth-wrap"></div>
        </div>

        <!-- Bottom Nav -->
        <div class="pth-nav">
          <button class="pth-nav-btn" id="pth-prev" aria-label="Önceki">←</button>
          <div class="pth-dots-row" id="pth-dots"></div>
          <button class="pth-nav-btn" id="pth-next-btn" aria-label="Sonraki">→</button>
        </div>

      </div>`;

    this._bindShell();
    this._drawCard();
  }

  _bindShell() {
    const q = id => this.el.querySelector(id);

    q('#pth-exit').onclick = () => this._exit();
    q('#pth-fav').onclick  = () => this._toggleFav();

    this.el.querySelectorAll('.pth-tab').forEach(tab => {
      tab.onclick = () => {
        this.el.querySelectorAll('.pth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.mode     = tab.dataset.mode;
        this.revealed = false;
        this._drawCard();
      };
    });

    q('#pth-prev').onclick     = () => this._go(-1);
    q('#pth-next-btn').onclick = () => this._go(+1);

    const root = q('#pth-root');
    root.addEventListener('touchstart', e => {
      this._txStart = e.touches[0].clientX;
      this._tyStart = e.touches[0].clientY;
    }, { passive: true });
    root.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this._txStart;
      const dy = e.changedTouches[0].clientY - this._tyStart;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 52) {
        this._go(dx < 0 ? +1 : -1);
      }
    }, { passive: true });
  }

  /* ──────────────────────── ATMOSPHERE ──────────────────────── */

  _setAtmosphere() {
    const p   = this.data[this.idx];
    const atm = this.el.querySelector('#pth-atm');
    if (!atm || !p) return;
    atm.className = `pth-atm pth-g-${p.genre.cls}`;
  }

  /* ──────────────────────── CARD DRAW ──────────────────────── */

  _drawCard(dir = 'in') {
    const p = this.data[this.idx];
    if (!p) { this._showDone(); return; }

    this._setAtmosphere();
    this._updateTopbar();
    this._renderDots();

    const wrap = this.el?.querySelector('#pth-wrap');
    if (!wrap) return;
    wrap.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'pth-card';

    if (this.mode === 'cinema')      card.innerHTML = this._cinemaTpl(p);
    else if (this.mode === 'fillblank')   card.innerHTML = this._fillBlankTpl(p);
    else                             card.innerHTML = this._multiChoiceTpl(p);

    wrap.appendChild(card);
    requestAnimationFrame(() => card.classList.add('pth-card-in'));

    this._bindCard(card, p);

    // Auto-speak in cinema mode
    if (this.mode === 'cinema') {
      clearTimeout(this._speakTimer);
      this._speakTimer = setTimeout(() => this._speak(p.en), 320);
    }
  }

  _animOut(dir, cb) {
    const card = this.el.querySelector('.pth-card');
    if (!card) { cb(); return; }
    card.classList.add(dir > 0 ? 'pth-card-out-l' : 'pth-card-out-r');
    setTimeout(cb, 260);
  }

  _go(dir) {
    const next = this.idx + dir;
    if (next < 0 || next >= this.data.length) return;
    this._animOut(dir, () => {
      this.idx      = next;
      this.revealed = false;
      this._drawCard(dir);
    });
  }

  /* ──────────────────────── TOP BAR ──────────────────────── */

  _updateTopbar() {
    const p = this.data[this.idx];
    const counter = this.el.querySelector('#pth-counter');
    const fav     = this.el.querySelector('#pth-fav');
    const prog    = this.el.querySelector('#pth-prog');
    const prev    = this.el.querySelector('#pth-prev');
    const nextB   = this.el.querySelector('#pth-next-btn');

    if (counter) counter.textContent = `${this.idx + 1} / ${this.data.length}`;
    if (fav && p) {
      const isFav = this.favorites.has(p.id);
      fav.textContent = isFav ? '♥' : '♡';
      fav.classList.toggle('is-fav', isFav);
    }
    if (prog && this.data.length > 0)  prog.style.width = `${(this.idx / Math.max(1, this.data.length - 1)) * 100}%`;
    if (prev)  prev.disabled = this.idx === 0;
    if (nextB) nextB.disabled = this.idx >= this.data.length - 1;
  }

  _renderDots() {
    const dots  = this.el.querySelector('#pth-dots');
    if (!dots) return;
    const total = this.data.length;
    const MAX   = 9;
    const half  = Math.floor(MAX / 2);
    let   start = Math.max(0, Math.min(this.idx - half, total - MAX));
    const end   = Math.min(total, start + MAX);

    dots.innerHTML = Array.from({ length: end - start }, (_, i) => {
      const ri   = start + i;
      const m    = Math.min(3, this.mastery[this.data[ri]?.id] || 0);
      const isCur= ri === this.idx;
      return `<div class="pth-dot ${isCur ? 'cur' : MASTERY_COLORS[m]}"></div>`;
    }).join('');
  }

  /* ──────────────────────── CINEMA MODE ──────────────────────── */

  _cinemaTpl(p) {
    return `
      <div class="pth-genre-badge">${p.genre.icon} ${p.genre.label}</div>

      <div class="pth-quote-zone" id="pth-quote-zone">
        <div class="pth-qm pth-qm-open">&ldquo;</div>
        <div class="pth-quote-en">${this._esc(p.en)}</div>
        <div class="pth-qm pth-qm-close">&rdquo;</div>

        <div class="pth-film-credit">
          <div class="pth-film-glow"></div>
          <span class="pth-film-name">${this._esc(p.film)}</span>
          ${p.year ? `<span class="pth-film-year">${p.year}</span>` : ''}
        </div>

        <div class="pth-tap-hint" id="pth-tap-hint">
          <div class="pth-tap-pulse"></div>
          Türkçesini görmek için dokun
        </div>
      </div>

      <div class="pth-tr-panel" id="pth-tr-panel">
        <div class="pth-tr-lbl">Türkçesi</div>
        <div class="pth-tr-text">${this._esc(p.tr)}</div>
      </div>

      <div class="pth-cine-ctrl" id="pth-cine-ctrl">
        <button class="pth-btn-no"    id="pth-btn-no">😕 Bilmiyorum</button>
        <button class="pth-btn-audio" id="pth-btn-audio">🔊</button>
        <button class="pth-btn-know"  id="pth-btn-know">✓ Biliyorum</button>
      </div>`;
  }

  _bindCard(card, p) {
    const q = id => card.querySelector(id);

    if (this.mode === 'cinema') {
      q('#pth-quote-zone').onclick = () => this._reveal();
      q('#pth-btn-no')?.addEventListener('click',    e => { e.stopPropagation(); this._rate(false); });
      q('#pth-btn-know')?.addEventListener('click',  e => { e.stopPropagation(); this._rate(true);  });
      q('#pth-btn-audio')?.addEventListener('click', e => { e.stopPropagation(); this._speak(p.en, q('#pth-btn-audio')); });

    } else if (this.mode === 'fillblank') {
      card.querySelectorAll('.pth-chip').forEach(c => {
        c.addEventListener('click', () => this._fillChip(c, card));
      });
      q('#pth-fb-check')?.addEventListener('click', () => this._checkFill(card, p));
      q('#pth-fb-skip')?.addEventListener('click',  () => this._go(+1));
      q('#pth-sm-audio')?.addEventListener('click', () => this._speak(p.en));

    } else {
      card.querySelectorAll('.pth-mc-opt').forEach(opt => {
        opt.addEventListener('click', () => this._pickMC(opt, card, p));
      });
      q('#pth-mc-audio')?.addEventListener('click', () => this._speak(p.en));
    }
  }

  /* ── Cinema: reveal + rate ── */

  _reveal() {
    if (this.revealed) return;
    this.revealed = true;

    const hint  = this.el.querySelector('#pth-tap-hint');
    const panel = this.el.querySelector('#pth-tr-panel');
    const ctrl  = this.el.querySelector('#pth-cine-ctrl');

    if (hint)  hint.style.display = 'none';
    if (panel) {
      panel.style.display = 'flex';
      requestAnimationFrame(() => panel.classList.add('pth-tr-show'));
    }
    if (ctrl) {
      ctrl.style.display = 'flex';
      requestAnimationFrame(() => ctrl.classList.add('pth-ctrl-show'));
    }
  }

  _rate(knew) {
    const p = this.data[this.idx];
    if (!p) return;
    const prev = this.mastery[p.id] || 0;
    if (knew) {
      this.mastery[p.id] = Math.min(3, prev + 1);
      this.session.correct++;
      if (this.app?.addXP) this.app.addXP(5, 'easy', 'phrases');
    } else {
      this.mastery[p.id] = Math.max(0, prev - 1);
      this.session.wrong++;
    }
    this._saveMastery();
    this._go(+1);
  }

  /* ──────────────────────── FILL BLANK MODE ──────────────────────── */

  _fillBlankTpl(p) {
    const words   = p.en.split(/(\s+)/);            // keeps spaces
    const tokens  = words.filter(w => /\S/.test(w)); // only real words
    const count   = Math.min(Math.max(1, Math.floor(tokens.length / 4)), 3);

    // Pick indices among longest words
    const cands = tokens
      .map((w, i) => ({ w: w.replace(/[^a-zA-Z']/g, ''), i }))
      .filter(x => x.w.length >= 4)
      .sort((a, b) => b.w.length - a.w.length);

    const blankIndices = cands.slice(0, count).map(c => c.i);
    const answers      = blankIndices.map(i => tokens[i].replace(/[^a-zA-Z']/g, ''));

    this._blankMeta = { answers, indices: blankIndices, filled: new Array(count).fill(null) };

    // Build phrase display
    let bIdx = 0;
    const phraseHtml = tokens.map((w, i) => {
      const pos = blankIndices.indexOf(i);
      if (pos !== -1) {
        const dashes = '·'.repeat(w.replace(/[^a-zA-Z']/g, '').length);
        return `<span class="pth-blank" data-pos="${pos}" data-idx="${i}">${dashes}</span>`;
      }
      return `<span class="pth-static-word">${this._esc(w)}</span>`;
    }).join(' ');

    // Chips: correct + wrong decoys
    const correctChips = answers.slice();
    const wrongChips   = this._wrongWords(correctChips, 4);
    const chips        = this._shuffle([...correctChips, ...wrongChips]);

    return `
      <div class="pth-fb-head">
        <div class="pth-genre-badge">${p.genre.icon} ${p.genre.label}</div>
        <span class="pth-fb-filmname">${this._esc(p.film)}</span>
      </div>

      <div class="pth-fb-tr-box">
        <div class="pth-fb-tr-lbl">Türkçesi</div>
        <div class="pth-fb-tr-txt">${this._esc(p.tr)}</div>
      </div>

      <div class="pth-fb-phrase" id="pth-phrase">${phraseHtml}</div>

      <div class="pth-chips" id="pth-chips">
        ${chips.map(w => `<button class="pth-chip">${this._esc(w)}</button>`).join('')}
      </div>

      <div class="pth-fb-foot">
        <button class="pth-fb-skip" id="pth-fb-skip">Geç →</button>
        <button class="pth-sm-audio" id="pth-sm-audio">🔊</button>
        <button class="pth-fb-check" id="pth-fb-check" disabled>Kontrol Et</button>
      </div>`;
  }

  _fillChip(chip, card) {
    if (chip.classList.contains('used')) return;
    const blanks  = [...card.querySelectorAll('.pth-blank')].filter(b => !b.dataset.filled);
    if (!blanks.length) return;

    const blank   = blanks[0];
    const pos     = parseInt(blank.dataset.pos);
    this._blankMeta.filled[pos] = chip.textContent;

    blank.textContent = chip.textContent;
    blank.dataset.filled = '1';
    blank.classList.add('filled');
    chip.classList.add('used');

    // Enable check when all filled
    const allFilled = [...card.querySelectorAll('.pth-blank')].every(b => b.dataset.filled);
    const checkBtn  = card.querySelector('#pth-fb-check');
    if (checkBtn) checkBtn.disabled = !allFilled;
  }

  _checkFill(card, p) {
    const checkBtn = card.querySelector('#pth-fb-check');
    if (checkBtn?.textContent === 'Sonraki →') { this._go(+1); return; }

    const { answers, filled } = this._blankMeta;
    let allOk = true;

    card.querySelectorAll('.pth-blank').forEach(blank => {
      const pos      = parseInt(blank.dataset.pos);
      const userAns  = (filled[pos] || '').toLowerCase().replace(/[^a-z']/g, '');
      const correct  = (answers[pos] || '').toLowerCase();
      if (userAns === correct) {
        blank.classList.add('correct');
      } else {
        blank.classList.add('wrong');
        blank.textContent = answers[pos] + ' ✓';
        allOk = false;
      }
    });

    if (allOk) {
      this.session.correct++;
      const prev = this.mastery[p.id] || 0;
      this.mastery[p.id] = Math.min(3, prev + 1);
      if (this.app?.addXP) this.app.addXP(8, 'easy', 'phrases');
    } else {
      this.session.wrong++;
    }
    this._saveMastery();

    if (checkBtn) {
      checkBtn.textContent = 'Sonraki →';
      checkBtn.disabled    = false;
    }
  }

  _wrongWords(correct, n) {
    const seen = new Set(correct.map(w => w.toLowerCase()));
    const pool = [];
    for (const ph of this.data) {
      if (pool.length >= n * 4) break;
      for (const w of ph.en.split(/\s+/)) {
        const clean = w.replace(/[^a-zA-Z']/g, '');
        if (clean.length >= 4 && !seen.has(clean.toLowerCase())) {
          pool.push(clean);
          seen.add(clean.toLowerCase());
        }
      }
    }
    return this._shuffle(pool).slice(0, n);
  }

  /* ──────────────────────── MULTI CHOICE MODE ──────────────────────── */

  _multiChoiceTpl(p) {
    const options = this._mcOptions(p);
    return `
      <div class="pth-mc-head">
        <div class="pth-genre-badge">${p.genre.icon} ${p.genre.label}</div>
        <button class="pth-sm-audio" id="pth-mc-audio">🔊</button>
      </div>

      <div class="pth-mc-quote-box">
        <div class="pth-mc-qm">&ldquo;</div>
        <div class="pth-mc-en">${this._esc(p.en)}</div>
        <div class="pth-mc-film">${this._esc(p.film)}${p.year ? ' · ' + p.year : ''}</div>
      </div>

      <div class="pth-mc-label">Doğru Türkçe karşılığı seç</div>

      <div class="pth-mc-opts">
        ${options.map((o, i) => `
          <button class="pth-mc-opt" data-correct="${o.correct}">
            <span class="pth-opt-key">${'ABCD'[i]}</span>
            <span class="pth-opt-txt">${this._esc(o.text)}</span>
          </button>`).join('')}
      </div>`;
  }

  _mcOptions(p) {
    const seen  = new Set([p.tr.toLowerCase()]);
    const wrong = [];

    // Önce bu kartın kendi wrong seçeneklerini kullan
    for (const w of (p.wrong || [])) {
      if (w && !seen.has(w.toLowerCase())) {
        wrong.push({ text: w, correct: false });
        seen.add(w.toLowerCase());
      }
    }

    // Eksik kalan için diğer kartların doğru cevaplarından doldur
    if (wrong.length < 3) {
      for (const other of this._shuffle([...this.data])) {
        if (other.id === p.id) continue;
        const key = other.tr.toLowerCase();
        if (!seen.has(key)) { wrong.push({ text: other.tr, correct: false }); seen.add(key); }
        if (wrong.length >= 3) break;
      }
    }

    return this._shuffle([{ text: p.tr, correct: true }, ...wrong.slice(0, 3)]);
  }

  _pickMC(opt, card, p) {
    const isCorrect = opt.dataset.correct === 'true';
    card.querySelectorAll('.pth-mc-opt').forEach(o => {
      o.disabled = true;
      if (o.dataset.correct === 'true')    o.classList.add('opt-correct');
      else if (o === opt && !isCorrect)    o.classList.add('opt-wrong');
    });

    if (isCorrect) {
      this.session.correct++;
      this.mastery[p.id] = Math.min(3, (this.mastery[p.id] || 0) + 1);
      if (this.app?.addXP) this.app.addXP(5, 'easy', 'phrases');
    } else {
      this.session.wrong++;
    }
    this._saveMastery();
    setTimeout(() => this._go(+1), 1100);
  }

  /* ──────────────────────── FAVORITES ──────────────────────── */

  _toggleFav() {
    const p   = this.data[this.idx];
    if (!p) return;
    const btn = this.el.querySelector('#pth-fav');
    if (this.favorites.has(p.id)) {
      this.favorites.delete(p.id);
    } else {
      this.favorites.add(p.id);
      btn?.classList.add('pth-fav-pop');
      setTimeout(() => btn?.classList.remove('pth-fav-pop'), 450);
    }
    localStorage.setItem('pth-favs', JSON.stringify([...this.favorites]));
    this._updateTopbar();
  }

  /* ──────────────────────── AUDIO ──────────────────────── */

  _speak(text, btn) {
    if (!text || typeof speechSynthesis === 'undefined') return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = 'en-US';
    utt.rate  = 0.87;
    const voices = speechSynthesis.getVoices();
    const v = voices.find(x => x.lang.startsWith('en-') && !x.name.includes('Google')) ||
              voices.find(x => x.lang.startsWith('en'));
    if (v) utt.voice = v;
    if (btn) {
      btn.classList.add('playing');
      utt.onend = () => btn.classList.remove('playing');
    }
    speechSynthesis.speak(utt);
  }

  /* ──────────────────────── DONE SCREEN ──────────────────────── */

  _showDone() {
    const { correct, wrong } = this.session;
    const total   = correct + wrong;
    const pct     = total > 0 ? Math.round((correct / total) * 100) : 0;
    const mastered = Object.values(this.mastery).filter(v => v >= 3).length;
    const icon     = pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '💪';
    const title    = pct >= 80 ? 'Muhteşem!' : pct >= 50 ? 'Harika İş!' : 'Devam Et!';

    const root = this.el.querySelector('#pth-root');
    if (!root) return;

    root.innerHTML = `
      <div class="pth-atm pth-g-musical">
        <div class="pth-orb pth-orb-a"></div>
        <div class="pth-orb pth-orb-b"></div>
      </div>
      <div class="pth-done-root">
        <div class="pth-done-content">
          <div class="pth-done-icon">${icon}</div>
          <div class="pth-done-title">${title}</div>
          <div class="pth-done-sub">${this.data.length} ifadenin tamamı gezildi</div>

          <div class="pth-done-stats">
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#34d399">${correct}</div>
              <div class="pth-ds-lbl">Doğru</div>
            </div>
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#f87171">${wrong}</div>
              <div class="pth-ds-lbl">Yanlış</div>
            </div>
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#f59e0b">${pct}%</div>
              <div class="pth-ds-lbl">Başarı</div>
            </div>
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#a78bfa">${mastered}</div>
              <div class="pth-ds-lbl">Öğrenildi</div>
            </div>
          </div>

          <div class="pth-done-btns">
            <button class="pth-done-primary" id="pth-done-retry">🔄 Tekrar Oyna</button>
            <button class="pth-done-ghost"   id="pth-done-home">← Ana Menüye Dön</button>
          </div>
        </div>
      </div>`;

    root.querySelector('#pth-done-retry').onclick = () => {
      this.idx      = 0;
      this.revealed = false;
      this.session  = { correct: 0, wrong: 0 };
      this.data     = this._shuffle(this.data);
      this._render();
    };
    root.querySelector('#pth-done-home').onclick = () => this._exit();
  }

  /* ──────────────────────── HELPERS ──────────────────────── */

  _saveMastery() {
    localStorage.setItem('pth-mastery', JSON.stringify(this.mastery));
  }

  _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  _exit() {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    const app = window._app || window.app;
    if (app?.navigate) app.navigate('home');
    else {
      const btn = document.querySelector('[data-action="navigate"][data-target="home"]');
      if (btn) btn.click();
    }
  }
}

/* ── AUTO-INIT ── */
(function () {
  const boot = () => {
    const mount = document.getElementById('phrases-mount-point');
    if (mount && (!window.phrasesMod || window.phrasesMod.el !== mount)) {
      window.phrasesMod = new PhrasesModule(window._app || window.app);
      window.phrasesMod.init(mount);
    }
  };
  new MutationObserver(boot).observe(document.body, { childList: true, subtree: true });
  setTimeout(boot, 800);
})();
