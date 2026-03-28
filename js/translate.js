/* translate.js — TR→EN Cümle Çevirisi Modu */
(function () {

  /* ── Contraction normaliser ── */
  const CONTRACTIONS = {
    "i'm":"i am","you're":"you are","he's":"he is","she's":"she is",
    "it's":"it is","we're":"we are","they're":"they are",
    "i've":"i have","you've":"you have","we've":"we have","they've":"they have",
    "i'd":"i would","you'd":"you would","he'd":"he would","she'd":"she would",
    "we'd":"we would","they'd":"they would",
    "i'll":"i will","you'll":"you will","he'll":"he will","she'll":"she will",
    "we'll":"we will","they'll":"they will",
    "don't":"do not","doesn't":"does not","didn't":"did not",
    "isn't":"is not","aren't":"are not","wasn't":"was not","weren't":"were not",
    "hasn't":"has not","haven't":"have not","hadn't":"had not",
    "can't":"cannot","couldn't":"could not","won't":"will not",
    "wouldn't":"would not","shouldn't":"should not","mustn't":"must not",
    "there's":"there is","there're":"there are","that's":"that is",
    "who's":"who is","what's":"what is","where's":"where is",
    "let's":"let us","it'd":"it would","it'll":"it will",
  };

  function normalise(str) {
    return str.toLowerCase()
      .replace(/[^\w\s']/g, '')           // strip punctuation except apostrophe
      .replace(/\b(\w+'\w+)\b/g, m => CONTRACTIONS[m] || m) // expand contractions
      .replace(/'/g, '')                  // remove remaining apostrophes
      .trim();
  }

  function tokenise(str) {
    return normalise(str).split(/\s+/).filter(Boolean);
  }

  function evaluate(userRaw, sentence) {
    const norm = s => normalise(s);

    // Check exact match against main + alts
    const allCorrect = [sentence.en, ...(sentence.alt || [])];
    if (allCorrect.some(c => norm(userRaw) === norm(c))) {
      return { grade: 'perfect', xp: 20 };
    }

    // Word-level similarity
    const userToks = tokenise(userRaw);
    const correctToks = tokenise(sentence.en);
    let matchCount = 0;
    const usedIdx = new Set();
    userToks.forEach(w => {
      const idx = correctToks.findIndex((c, i) => !usedIdx.has(i) && c === w);
      if (idx !== -1) { matchCount++; usedIdx.add(idx); }
    });
    const sim = matchCount / Math.max(userToks.length, correctToks.length);

    // Check all-alts for word similarity too
    let bestSim = sim;
    (sentence.alt || []).forEach(alt => {
      const altToks = tokenise(alt);
      let mc = 0; const used = new Set();
      userToks.forEach(w => {
        const i = altToks.findIndex((c, j) => !used.has(j) && c === w);
        if (i !== -1) { mc++; used.add(i); }
      });
      bestSim = Math.max(bestSim, mc / Math.max(userToks.length, altToks.length));
    });

    // Keyword check
    const normUser = norm(userRaw);
    const allKeysPresent = (sentence.keys || []).every(k => normUser.includes(norm(k)));

    if (bestSim >= 0.8 && allKeysPresent) return { grade: 'good',  xp: 15 };
    if (bestSim >= 0.65 || allKeysPresent) return { grade: 'close', xp: 8  };
    return { grade: 'wrong', xp: 0 };
  }

  /* ── TranslateMode class ── */
  class TranslateMode {
    constructor(app) {
      this.app = app;
      this._el = null;
      this._questions = [];
      this._idx = 0;
      this._results = [];
      this._level = null;
      this._keyHandler = null;
    }

    init(el) {
      this._el = el;
      this._renderHome();
    }

    destroy() {
      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
        this._keyHandler = null;
      }
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
          <p class="tr-home-tip">Her oturumda 10 cümle rastgele seçilir.</p>
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

      const pool = level === 'ALL'
        ? [...TRANSLATE_DATA]
        : TRANSLATE_DATA.filter(s => s.level === level);

      // Shuffle & pick up to 10
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      this._questions = pool.slice(0, 10);

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

      const q = this._questions[this._idx];
      const num = this._idx + 1;
      const total = this._questions.length;
      const pct = Math.round((this._idx / total) * 100);

      el.innerHTML = `
        <div class="tr-question animate-in">
          <div class="tr-q-header">
            <button class="tr-back-btn" id="trBackBtn">← Çık</button>
            <div class="tr-progress-wrap">
              <div class="tr-progress-bar"><div class="tr-progress-fill" style="width:${pct}%"></div></div>
              <span class="tr-progress-txt">${num} / ${total}</span>
            </div>
          </div>

          <div class="tr-q-body">
            <div class="tr-q-topic">${q.level} · ${q.topic}</div>
            <div class="tr-q-tr">${q.tr}</div>
            <div class="tr-q-prompt">İngilizce'ye çevir:</div>
            <textarea class="tr-input" id="trInput" rows="3" placeholder="Cevabını buraya yaz..." autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
            <button class="tr-check-btn" id="trCheckBtn">Kontrol Et ✓</button>
          </div>
        </div>
      `;

      const input = el.querySelector('#trInput');
      const checkBtn = el.querySelector('#trCheckBtn');
      const backBtn = el.querySelector('#trBackBtn');

      setTimeout(() => input && input.focus(), 100);

      checkBtn.addEventListener('click', () => this._checkAnswer(q, input.value));
      backBtn.addEventListener('click', () => this._renderHome());

      if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          this._checkAnswer(q, input.value);
        }
      };
      document.addEventListener('keydown', this._keyHandler);
    }

    /* ── CHECK ── */
    _checkAnswer(q, userRaw) {
      const el = this._el;
      if (!el) return;

      const userTrimmed = (userRaw || '').trim();
      if (!userTrimmed) return;

      const result = evaluate(userTrimmed, q);
      this._results.push({ q, userAnswer: userTrimmed, ...result });

      if (this._keyHandler) {
        document.removeEventListener('keydown', this._keyHandler);
        this._keyHandler = null;
      }

      const gradeInfo = {
        perfect: { icon: '🎯', label: 'Mükemmel!',   cls: 'grade-perfect', color: '#00d4ff' },
        good:    { icon: '✅', label: 'Çok İyi!',     cls: 'grade-good',    color: '#4ade80' },
        close:   { icon: '🟡', label: 'Yakın!',       cls: 'grade-close',   color: '#fbbf24' },
        wrong:   { icon: '❌', label: 'Yanlış',       cls: 'grade-wrong',   color: '#f87171' },
      };
      const g = gradeInfo[result.grade];

      const isLast = this._idx + 1 >= this._questions.length;

      el.innerHTML = `
        <div class="tr-result animate-in">
          <div class="tr-q-header">
            <button class="tr-back-btn" id="trBackBtn2">← Çık</button>
            <div class="tr-progress-wrap">
              <div class="tr-progress-bar"><div class="tr-progress-fill" style="width:${Math.round(((this._idx+1)/this._questions.length)*100)}%"></div></div>
              <span class="tr-progress-txt">${this._idx + 1} / ${this._questions.length}</span>
            </div>
          </div>

          <div class="tr-result-body">
            <div class="tr-grade-badge ${g.cls}">
              <span class="tr-grade-icon">${g.icon}</span>
              <span class="tr-grade-label">${g.label}</span>
              ${result.xp > 0 ? `<span class="tr-xp-badge">+${result.xp} XP</span>` : ''}
            </div>

            <div class="tr-q-tr tr-result-sentence">${q.tr}</div>

            <div class="tr-answer-wrap">
              <div class="tr-answer-row">
                <span class="tr-answer-label">Senin cevabın:</span>
                <span class="tr-answer-user ${result.grade === 'wrong' ? 'tr-answer-bad' : 'tr-answer-ok'}">${_escHtml(userTrimmed)}</span>
              </div>
              <div class="tr-answer-row">
                <span class="tr-answer-label">Doğru cevap:</span>
                <span class="tr-answer-correct">${_escHtml(q.en)}</span>
              </div>
            </div>

            ${q.tip ? `<div class="tr-tip"><span class="tr-tip-icon">💡</span> ${q.tip}</div>` : ''}

            <button class="tr-next-btn" id="trNextBtn">${isLast ? 'Sonuçları Gör →' : 'Sonraki →'}</button>
          </div>
        </div>
      `;

      // Award XP
      if (result.xp > 0 && this.app && this.app.addXP) {
        this.app.addXP(result.xp, 'medium', 'translate');
      }

      el.querySelector('#trBackBtn2').addEventListener('click', () => this._renderHome());
      el.querySelector('#trNextBtn').addEventListener('click', () => {
        this._idx++;
        this._renderQuestion();
      });
    }

    /* ── SUMMARY ── */
    _renderSummary() {
      const el = this._el;
      if (!el) return;

      const counts = { perfect: 0, good: 0, close: 0, wrong: 0 };
      let totalXP = 0;
      this._results.forEach(r => { counts[r.grade]++; totalXP += r.xp; });

      const total = this._results.length;
      const correct = counts.perfect + counts.good;
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

          <div class="tr-sum-grid">
            <div class="tr-sum-cell grade-perfect"><span>${counts.perfect}</span><small>Mükemmel</small></div>
            <div class="tr-sum-cell grade-good"><span>${counts.good}</span><small>Çok İyi</small></div>
            <div class="tr-sum-cell grade-close"><span>${counts.close}</span><small>Yakın</small></div>
            <div class="tr-sum-cell grade-wrong"><span>${counts.wrong}</span><small>Yanlış</small></div>
          </div>

          <div class="tr-sum-review">
            ${this._results.map((r, i) => {
              const g = { perfect:'🎯', good:'✅', close:'🟡', wrong:'❌' };
              return `
                <div class="tr-sum-item ${r.grade === 'wrong' ? 'tr-sum-wrong' : ''}">
                  <div class="tr-sum-num">${i+1}. ${g[r.grade]}</div>
                  <div class="tr-sum-tr">${_escHtml(r.q.tr)}</div>
                  <div class="tr-sum-en">${_escHtml(r.q.en)}</div>
                  ${r.grade !== 'perfect' ? `<div class="tr-sum-yours">Senin: ${_escHtml(r.userAnswer)}</div>` : ''}
                </div>
              `;
            }).join('')}
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

  function _escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  /* ── Register with app ── */
  window._TranslateMode = TranslateMode;

  if (window._app && window._app._translateModeReady) {
    window._app._translateModeReady();
  }

})();
