/* translate.js — TR→EN Cümle Çevirisi Modu (4 şıklı) */
(function () {

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* Build 3 distractors from the full pool (different level-group preferred) */
  function buildChoices(correct, pool) {
    // Prefer distractors from same level first, then any
    const others = pool.filter(s => s.en !== correct.en);
    shuffle(others);
    const picks = others.slice(0, 3).map(s => s.en);
    const choices = shuffle([correct.en, ...picks]);
    return choices;
  }

  function _escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── TranslateMode class ── */
  class TranslateMode {
    constructor(app) {
      this.app = app;
      this._el = null;
      this._questions = [];  // { sentence, choices }
      this._pool = [];
      this._idx = 0;
      this._results = [];
      this._level = null;
    }

    init(el) {
      this._el = el;
      this._renderHome();
    }

    destroy() {
      this._el = null;
    }

    /* ── HOME ── */
    _renderHome() {
      const el = this._el;
      if (!el) return;

      const levels = ['A1','A2','B1','B2'];
      const counts = {};
      levels.forEach(l => { counts[l] = TRANSLATE_DATA.filter(s => s.level === l).length; });
      const total = TRANSLATE_DATA.length;

      el.innerHTML = `
        <div class="tr-home animate-in">
          <div class="tr-home-hero">
            <div class="tr-home-icon">🔄</div>
            <h1 class="tr-home-title">Cümle Çevirisi</h1>
            <p class="tr-home-sub">Türkçe cümleyi İngilizce'ye çevir</p>
          </div>
          <div class="tr-level-grid">
            ${levels.map(l => `
              <button class="tr-level-btn" data-level="${l}">
                <span class="tr-lbtn-badge">${l}</span>
                <span class="tr-lbtn-count">${counts[l]} cümle</span>
              </button>
            `).join('')}
            <button class="tr-level-btn tr-level-all" data-level="ALL">
              <span class="tr-lbtn-badge">ALL</span>
              <span class="tr-lbtn-count">${total} cümle</span>
            </button>
          </div>
          <p class="tr-home-tip">Her oturumda 10 cümle · 4 şık</p>
        </div>
      `;

      el.querySelectorAll('.tr-level-btn').forEach(btn => {
        btn.addEventListener('click', () => this._startSession(btn.dataset.level));
      });
    }

    /* ── SESSION START ── */
    _startSession(level) {
      this._level = level;
      this._results = [];
      this._idx = 0;

      // Full pool for distractors
      this._pool = level === 'ALL'
        ? [...TRANSLATE_DATA]
        : TRANSLATE_DATA.filter(s => s.level === level);

      // Shuffle & pick 10
      const picked = shuffle([...this._pool]).slice(0, 10);

      // For each question build choices using the full pool as distractor source
      this._questions = picked.map(sentence => ({
        sentence,
        choices: buildChoices(sentence, TRANSLATE_DATA),
      }));

      this._renderQuestion();
    }

    /* ── QUESTION ── */
    _renderQuestion() {
      const el = this._el;
      if (!el) return;

      if (this._idx >= this._questions.length) {
        this._renderSummary();
        return;
      }

      const { sentence: q, choices } = this._questions[this._idx];
      const num = this._idx + 1;
      const total = this._questions.length;
      const pct = Math.round((this._idx / total) * 100);

      el.innerHTML = `
        <div class="tr-question animate-in">
          <div class="tr-q-header">
            <button class="tr-back-btn" id="trBackBtn">← Çık</button>
            <div class="tr-progress-wrap">
              <div class="tr-progress-bar">
                <div class="tr-progress-fill" style="width:${pct}%"></div>
              </div>
              <span class="tr-progress-txt">${num} / ${total}</span>
            </div>
          </div>

          <div class="tr-q-body">
            <div class="tr-q-topic">${q.level} · ${q.topic}</div>
            <div class="tr-q-tr">${_escHtml(q.tr)}</div>
            <p class="tr-q-prompt">Doğru çeviriyi seç:</p>
            <div class="tr-choices">
              ${choices.map((c, i) => `
                <button class="tr-choice-btn" data-choice="${i}" data-val="${_escHtml(c)}">
                  <span class="tr-choice-letter">${['A','B','C','D'][i]}</span>
                  <span class="tr-choice-text">${_escHtml(c)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      el.querySelector('#trBackBtn').addEventListener('click', () => this._renderHome());

      el.querySelectorAll('.tr-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosen = btn.dataset.val;
          this._checkAnswer(q, choices, chosen, btn);
        });
      });
    }

    /* ── CHECK ── */
    _checkAnswer(q, choices, chosen, clickedBtn) {
      const el = this._el;
      if (!el) return;

      const isCorrect = chosen === q.en;
      const grade = isCorrect ? 'correct' : 'wrong';
      const xp = isCorrect ? 20 : 0;

      this._results.push({ q, chosen, grade, xp });

      // Disable all buttons, highlight correct + wrong
      el.querySelectorAll('.tr-choice-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.val === q.en) {
          btn.classList.add('tr-choice-correct');
        } else if (btn === clickedBtn && !isCorrect) {
          btn.classList.add('tr-choice-wrong');
        }
      });

      // Show feedback strip + next button
      const isLast = this._idx + 1 >= this._questions.length;
      const strip = document.createElement('div');
      strip.className = `tr-feedback-strip ${isCorrect ? 'tr-fb-correct' : 'tr-fb-wrong'}`;
      strip.innerHTML = `
        <div class="tr-fb-left">
          <span class="tr-fb-icon">${isCorrect ? '🎯' : '❌'}</span>
          <div class="tr-fb-texts">
            <div class="tr-fb-label">${isCorrect ? 'Doğru!' : 'Yanlış!'}</div>
            ${!isCorrect ? `<div class="tr-fb-correct-ans">${_escHtml(q.en)}</div>` : ''}
            ${q.tip ? `<div class="tr-fb-tip">💡 ${q.tip}</div>` : ''}
          </div>
        </div>
        <button class="tr-next-btn" id="trNextBtn">${isLast ? 'Sonuçlar →' : 'Sonraki →'}</button>
      `;

      el.querySelector('.tr-q-body').appendChild(strip);

      // Award XP
      if (xp > 0 && this.app && this.app.addXP) {
        this.app.addXP(xp, 'medium', 'translate');
      }

      el.querySelector('#trNextBtn').addEventListener('click', () => {
        this._idx++;
        this._renderQuestion();
      });
    }

    /* ── SUMMARY ── */
    _renderSummary() {
      const el = this._el;
      if (!el) return;

      let correct = 0, totalXP = 0;
      this._results.forEach(r => { if (r.grade === 'correct') correct++; totalXP += r.xp; });
      const total = this._results.length;
      const pct = Math.round((correct / total) * 100);
      const medal = pct >= 90 ? '🏆' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '📝';

      el.innerHTML = `
        <div class="tr-summary animate-in">
          <div class="tr-sum-hero">
            <div class="tr-sum-medal">${medal}</div>
            <div class="tr-sum-pct">${pct}%</div>
            <div class="tr-sum-label">${correct} / ${total} doğru</div>
            ${totalXP > 0 ? `<div class="tr-sum-xp">+${totalXP} XP kazandın!</div>` : ''}
          </div>

          <div class="tr-sum-two">
            <div class="tr-sum-cell grade-correct"><span>${correct}</span><small>Doğru</small></div>
            <div class="tr-sum-cell grade-wrong"><span>${total - correct}</span><small>Yanlış</small></div>
          </div>

          <div class="tr-sum-review">
            ${this._results.map((r, i) => `
              <div class="tr-sum-item ${r.grade === 'wrong' ? 'tr-sum-wrong' : ''}">
                <div class="tr-sum-num">${i+1}. ${r.grade === 'correct' ? '✅' : '❌'}</div>
                <div class="tr-sum-tr">${_escHtml(r.q.tr)}</div>
                <div class="tr-sum-en">${_escHtml(r.q.en)}</div>
                ${r.grade === 'wrong' ? `<div class="tr-sum-yours">Senin seçimin: ${_escHtml(r.chosen)}</div>` : ''}
              </div>
            `).join('')}
          </div>

          <div class="tr-sum-btns">
            <button class="tr-again-btn" id="trAgainBtn">Tekrar Oyna</button>
            <button class="tr-home-btn" id="trHomeBtn">Ana Ekran</button>
          </div>
        </div>
      `;

      el.querySelector('#trAgainBtn').addEventListener('click', () => this._startSession(this._level));
      el.querySelector('#trHomeBtn').addEventListener('click', () => this._renderHome());
    }
  }

  /* ── Register ── */
  window._TranslateMode = TranslateMode;
  if (window._app && window._app._translateModeReady) {
    window._app._translateModeReady();
  }

})();
