/**
 * PLACEMENT TEST — Adaptif CEFR Seviye Belirleme
 * WORDS veritabanından çoktan seçmeli sorularla seviye tespiti.
 * Adaptif: her seviyede 3 soru, 2+ doğru → üst seviyeye geç.
 */
class PlacementTest {
  constructor() {
    this._LEVELS   = ['A1','A2','B1','B2','C1','C2'];
    this._COLORS   = { A1:'#10b981', A2:'#06b6d4', B1:'#3b82f6', B2:'#8b5cf6', C1:'#f59e0b', C2:'#ef4444' };
    this._LABELS   = { A1:'Başlangıç', A2:'Temel', B1:'Orta Altı', B2:'Orta Üstü', C1:'İleri', C2:'Ustalaşmış' };
    this._DESCS    = {
      A1: 'Temel kelimeler ve günlük ifadelerle başlıyorsun.',
      A2: 'Basit konular ve yaygın cümlelerle çalışıyorsun.',
      B1: 'Günlük iletişimde rahat edebiliyorsun.',
      B2: 'Karmaşık konular ve soyut fikirlerle başa çıkabiliyorsun.',
      C1: 'Akıcı ve spontane iletişim kurabiliyorsun.',
      C2: 'Neredeyse anadil düzeyinde İngilizce biliyorsun.',
    };
    this._byLevel  = {};  // WORDS seviyeye göre gruplu
    this._container = null;
    this._onComplete = null;

    // Adaptif durum
    this._levelIdx    = 1;  // A2'den başla
    this._stageWords  = [];
    this._questionIdx = 0;
    this._stageCorrect = 0;
    this._totalAsked  = 0;
    this._PER_STAGE   = 3;  // her seviyede 3 soru
  }

  // ── Giriş noktası ────────────────────────────────────────────────────────
  show(container, onComplete) {
    this._container  = container;
    this._onComplete = onComplete;
    this._buildIndex();
    this._renderWelcome();
  }

  _buildIndex() {
    if (typeof WORDS === 'undefined') return;
    for (const lvl of this._LEVELS) this._byLevel[lvl] = [];
    for (const w of WORDS) {
      if (w.level && w.tr && w.en && this._byLevel[w.level]) {
        this._byLevel[w.level].push(w);
      }
    }
  }

  // ── Ekranlar ─────────────────────────────────────────────────────────────
  _renderWelcome() {
    this._html(`
      <div class="pt-card">
        <div class="pt-emoji">🎯</div>
        <h2 class="pt-title">Seviyeni Belirleyelim</h2>
        <p class="pt-desc">
          Sana en uygun içerikleri sunmak için kısa bir kelime testi yapacağız.<br>
          <strong>~2 dakika</strong> sürer, uygulamamızdaki gerçek kelimelerden oluşur.
        </p>
        <button class="pt-btn pt-btn-primary" id="pt-start">Teste Başla</button>
        <div class="pt-skip-label">Test yapmadan devam et:</div>
        <div class="pt-skip-row">
          <button class="pt-btn pt-btn-level" id="pt-skip-a1">
            <span class="pt-skip-badge" style="background:#10b98120;color:#10b981;border-color:#10b98140">A1</span>
            Yeni Başlayan
          </button>
          <button class="pt-btn pt-btn-level" id="pt-skip-b1">
            <span class="pt-skip-badge" style="background:#3b82f620;color:#3b82f6;border-color:#3b82f640">B1</span>
            Orta Seviye
          </button>
        </div>
      </div>
    `);
    this._on('pt-start',   () => this._beginTest());
    this._on('pt-skip-a1', () => this._finish('A1', true));
    this._on('pt-skip-b1', () => this._finish('B1', true));
  }

  _beginTest() {
    this._levelIdx    = 1;
    this._totalAsked  = 0;
    this._startStage();
  }

  _startStage() {
    const level = this._LEVELS[this._levelIdx];
    const pool  = [...(this._byLevel[level] || [])].sort(() => Math.random() - 0.5);

    if (pool.length < this._PER_STAGE) {
      // Bu seviyede yeterli kelime yok → geç
      this._advanceStage(true);
      return;
    }

    this._stageWords   = pool.slice(0, this._PER_STAGE);
    this._stageCorrect = 0;
    this._questionIdx  = 0;
    this._showLevelTransition(level, () => this._askQuestion());
  }

  _showLevelTransition(level, cb) {
    const color = this._COLORS[level];
    this._html(`
      <div class="pt-card pt-card-transition">
        <div class="pt-level-pill" style="color:${color};border-color:${color}40;background:${color}12">
          ${level}
        </div>
        <p class="pt-transition-label">${this._LABELS[level]} seviye soruları geliyor…</p>
      </div>
    `);
    setTimeout(cb, 900);
  }

  _askQuestion() {
    const word  = this._stageWords[this._questionIdx];
    if (!word) { this._evaluateStage(); return; }

    const level = this._LEVELS[this._levelIdx];
    const color = this._COLORS[level];

    // Çeldirici seçenekler — aynı seviyeden farklı kelimeler
    const pool       = this._byLevel[level].filter(w => w.en !== word.en);
    const distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    const options    = [...distractors.map(w => w.tr), word.tr].sort(() => Math.random() - 0.5);

    // Toplam soru tahmini için: en fazla A1→C2 = 18
    const approxTotal = this._LEVELS.length * this._PER_STAGE;
    const qNum = this._totalAsked + this._questionIdx + 1;
    const pct  = Math.min(Math.round(qNum / approxTotal * 100), 95);

    this._html(`
      <div class="pt-card">
        <div class="pt-progress-bar">
          <div class="pt-progress-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="pt-q-meta">
          <span class="pt-q-level" style="color:${color}">${level}</span>
          <span class="pt-q-num">${qNum}. soru</span>
        </div>
        <div class="pt-word-block">
          <div class="pt-word-en">${word.en}</div>
          ${word.ipa ? `<div class="pt-word-ipa">${word.ipa}</div>` : ''}
          <div class="pt-word-cat">${word.cat || ''} ${word.icon || ''}</div>
        </div>
        <p class="pt-q-label">Bu kelimenin Türkçe anlamı hangisi?</p>
        <div class="pt-options">
          ${options.map((opt, i) => `
            <button class="pt-opt" data-tr="${this._esc(opt)}" data-correct="${opt === word.tr ? '1' : '0'}">
              <span class="pt-opt-letter">${'ABCD'[i]}</span>
              <span class="pt-opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `);

    this._container.querySelectorAll('.pt-opt').forEach(btn => {
      btn.addEventListener('click', () => this._handleAnswer(btn, word));
    });
  }

  _handleAnswer(btn, word) {
    const isCorrect = btn.dataset.correct === '1';

    // Tüm butonları kilitle ve renklendır
    this._container.querySelectorAll('.pt-opt').forEach(b => {
      b.disabled = true;
      if (b.dataset.correct === '1')    b.classList.add('pt-opt-correct');
      else if (b === btn && !isCorrect) b.classList.add('pt-opt-wrong');
    });

    // Örnek cümle göster
    const exDiv = document.createElement('div');
    exDiv.className = 'pt-example';
    exDiv.innerHTML = `<em>${word.ex || ''}</em>`;
    this._container.querySelector('.pt-options')?.after(exDiv);

    if (isCorrect) this._stageCorrect++;
    this._questionIdx++;

    setTimeout(() => {
      if (this._questionIdx >= this._PER_STAGE) {
        this._totalAsked += this._PER_STAGE;
        this._evaluateStage();
      } else {
        this._askQuestion();
      }
    }, 1000);
  }

  _evaluateStage() {
    const passed = this._stageCorrect >= 2;
    this._advanceStage(passed);
  }

  _advanceStage(passed) {
    if (passed) {
      if (this._levelIdx >= this._LEVELS.length - 1) {
        this._finish('C2');
      } else {
        this._levelIdx++;
        this._startStage();
      }
    } else {
      if (this._levelIdx === 0) {
        this._finish('A1');
      } else {
        this._finish(this._LEVELS[this._levelIdx - 1]);
      }
    }
  }

  _finish(level, skipped = false) {
    const color = this._COLORS[level];
    const label = this._LABELS[level];
    const desc  = this._DESCS[level];

    this._html(`
      <div class="pt-card pt-card-result">
        <div class="pt-result-emoji">${skipped ? '📚' : '🎉'}</div>
        <h2 class="pt-title">${skipped ? 'Tamam!' : 'Seviyeni Bulduk!'}</h2>
        <div class="pt-result-badge" style="color:${color};border-color:${color}40;background:${color}12">
          ${level} — ${label}
        </div>
        <p class="pt-result-desc">${desc}</p>
        <p class="pt-result-note">İstediğin zaman Ayarlar'dan seviyeni değiştirebilirsin.</p>
        <button class="pt-btn pt-btn-primary" id="pt-confirm" style="background:${color}">
          Uygulamayı Aç →
        </button>
      </div>
    `);

    this._on('pt-confirm', () => {
      if (this._onComplete) this._onComplete(level);
    });
  }

  // ── Yardımcılar ──────────────────────────────────────────────────────────
  _html(inner) {
    this._container.innerHTML = `<div class="pt-overlay">${inner}</div>`;
  }

  _on(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  }
}
