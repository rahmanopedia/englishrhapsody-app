/* translate.js — TR→EN Cümle Çevirisi Modu (4 şıklı) */
(function () {

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* Generate close distractors by mutating the correct sentence */
  function generateDistractors(en) {
    const variants = [];

    function applySwap(str, from, to) {
      const re = new RegExp('\\b' + from + '\\b', 'i');
      const m = str.match(re);
      if (!m) return null;
      const repl = m[0][0] === m[0][0].toUpperCase()
        ? to.charAt(0).toUpperCase() + to.slice(1)
        : to;
      const v = str.replace(re, repl);
      return v !== str ? v : null;
    }

    function trySwap(from, to) {
      const v = applySwap(en, from, to);
      if (v && !variants.includes(v)) variants.push(v);
    }

    // ── Pronoun swaps (non-gender) ──
    const pronouns = [
      ['I','He'],['I','She'],['I','We'],['I','They'],
      ['He','I'],['He','We'],['He','They'],
      ['She','I'],['She','We'],['She','They'],
      ['We','I'],['We','They'],['We','He'],
      ['They','We'],['They','He'],['They','She'],
      ['You','He'],['You','She'],['You','They'],
    ];
    for (const [f,t] of pronouns) trySwap(f,t);

    // ── Possessive swaps (non-gender) ──
    const poss = [
      ['my','his'],['my','her'],['my','their'],['my','your'],
      ['his','my'],['his','their'],
      ['her','my'],['her','their'],
      ['our','their'],['their','our'],['your','my'],
    ];
    for (const [f,t] of poss) trySwap(f,t);

    // ── Tense: present ↔ past ──
    const tense = [
      ['am','was'],['is','was'],['are','were'],
      ['was','is'],['were','are'],
      ["don't","didn't"],["doesn't","didn't"],["didn't","don't"],
      ["isn't","wasn't"],["aren't","weren't"],
      ["wasn't","isn't"],["weren't","aren't"],
      ['have','had'],['has','had'],['had','have'],
      ["haven't","hadn't"],["hasn't","hadn't"],
      ['go','went'],['goes','went'],['went','go'],
      ['eat','ate'],['ate','eat'],
      ['drink','drank'],['drank','drink'],
      ['see','saw'],['saw','see'],
      ['come','came'],['came','come'],
      ['get','got'],['got','get'],
      ['make','made'],['made','make'],
      ['take','took'],['took','take'],
      ['know','knew'],['knew','know'],
      ['think','thought'],['thought','think'],
      ['work','worked'],['worked','work'],
      ['live','lived'],['lived','live'],
    ];
    for (const [f,t] of tense) trySwap(f,t);

    // ── Modal / auxiliary swaps ──
    const modals = [
      ['can','could'],['could','can'],
      ['will','would'],['would','will'],
      ['must','should'],["mustn't","shouldn't"],
      ['should','must'],['may','might'],['might','may'],
      ["can't","couldn't"],["couldn't","can't"],
      ["won't","wouldn't"],["wouldn't","won't"],
    ];
    for (const [f,t] of modals) trySwap(f,t);

    // ── Article swaps ──
    const articles = [
      ['\\ba\\b','the'],['\\bthe\\b','a'],['\\ban\\b','the'],['\\bthe\\b','an'],
    ];
    for (const [f,t] of articles) {
      const re = new RegExp(f, 'i');
      const v = en.replace(re, t);
      if (v !== en && !variants.includes(v)) variants.push(v);
    }

    // ── Negation toggle ──
    if (en.includes(" not ") || en.includes("n't")) {
      const v = en.replace(/\s+not\b/, '').replace(/n't\b/,'');
      if (v !== en && !variants.includes(v)) variants.push(v);
    } else {
      // add "not" after first auxiliary
      const addNot = en.replace(/\b(am|is|are|was|were|can|will|would|should|must|have|has|had|do|does|did)\b/, '$1 not');
      if (addNot !== en && !variants.includes(addNot)) variants.push(addNot);
    }

    // ── Adverb / intensifier swaps ──
    const adverbs = [
      ['very','really'],['really','very'],['very','so'],
      ['always','usually'],['usually','always'],['sometimes','often'],
      ['often','sometimes'],['never','always'],['already','yet'],
      ['still','already'],['just','already'],
    ];
    for (const [f,t] of adverbs) trySwap(f,t);

    // ── Confusable words: same field, DIFFERENT meaning ──
    // (NOT true synonyms — these change the actual meaning of the sentence)
    const confusables = [
      // emotion confusables
      ['tired','bored'],['bored','tired'],
      ['tired','hungry'],['hungry','tired'],
      ['happy','excited'],['excited','happy'],
      ['sad','angry'],['angry','sad'],
      ['afraid','angry'],['nervous','excited'],['excited','nervous'],
      ['surprised','scared'],['scared','surprised'],
      ['lonely','bored'],['bored','lonely'],
      // size / degree
      ['hot','cold'],['cold','hot'],['warm','cool'],['cool','warm'],
      ['old','young'],['young','old'],
      ['tall','short'],['short','tall'],['long','short'],['short','long'],
      ['fast','slow'],['slow','fast'],
      ['loud','quiet'],['quiet','loud'],['hard','soft'],['soft','hard'],
      ['early','late'],['late','early'],
      // verbs with different usage rules (common learner confusion)
      ['say','tell'],['tell','say'],         // say sth vs tell sb sth
      ['look','see'],['see','look'],         // intentional vs unintentional
      ['look','watch'],['watch','look'],     // static vs moving
      ['hear','listen'],['listen','hear'],   // passive vs active
      ['bring','take'],['take','bring'],     // toward vs away
      ['lend','borrow'],['borrow','lend'],   // give vs receive
      ['teach','learn'],['learn','teach'],   // direction of knowledge
      ['rise','raise'],['raise','rise'],     // intrans vs trans
      ['lie','lay'],['lay','lie'],
      ['come','go'],['go','come'],
      ['arrive','leave'],['leave','arrive'],
      ['remember','forget'],['forget','remember'],
      ['find','lose'],['lose','find'],
      ['buy','sell'],['sell','buy'],
      ['ask','answer'],['answer','ask'],
      ['open','close'],['close','open'],
      ['start','stop'],['stop','start'],
      ['love','hate'],['hate','love'],
      ['like','dislike'],['dislike','like'],
      ['want','need'],['need','want'],       // desire vs necessity
      ['can','must'],['must','can'],         // ability vs obligation
      // nouns with different meaning
      ['brother','sister'],['sister','brother'],
      ['son','daughter'],['daughter','son'],
      ['mother','father'],['father','mother'],
      ['husband','wife'],['wife','husband'],
      ['morning','evening'],['evening','morning'],['night','morning'],['morning','night'],
      ['yesterday','tomorrow'],['tomorrow','yesterday'],
      ['lunch','dinner'],['dinner','lunch'],['breakfast','lunch'],['lunch','breakfast'],
      ['school','work'],['work','school'],
      ['summer','winter'],['winter','summer'],['spring','autumn'],['autumn','spring'],
      ['city','village'],['village','city'],
      ['doctor','teacher'],['teacher','doctor'],['student','teacher'],['teacher','student'],
      // prepositions that change meaning
      ['before','after'],['after','before'],
      ['with','without'],['without','with'],
      ['in','out of'],['inside','outside'],['outside','inside'],
      ['to','from'],['from','to'],
      ['above','below'],['below','above'],['under','over'],['over','under'],
      ['behind','in front of'],['in front of','behind'],
    ];
    for (const [f,t] of confusables) trySwap(f,t);

    // ── Gender swaps: He↔She / his↔her ──
    // "O" in Turkish means both he/she, so a pure He→She swap produces two
    // valid answers. Fix: always combine the gender swap with one extra word
    // change so the resulting sentence has a genuinely different meaning.
    const secondaryPool = [
      ...tense, ...modals, ...adverbs, ...confusables,
      ['school','work'],['work','school'],['home','office'],['office','home'],
      ['today','yesterday'],['yesterday','today'],
      ['a','the'],['the','a'],
    ];

    function tryGenderDoubleSwap(gFrom, gTo, posFrom, posTo) {
      // Apply gender swap first
      const base = applySwap(en, gFrom, gTo);
      if (!base) return;
      // Then try every secondary swap until one sticks
      for (const [f2, t2] of secondaryPool) {
        const v = applySwap(base, f2, t2);
        if (v && v !== en && !variants.includes(v)) {
          variants.push(v);
          return;
        }
      }
      // Fallback: gender-only if no secondary mutation found
      if (!variants.includes(base)) variants.push(base);
    }

    tryGenderDoubleSwap('He', 'She');
    tryGenderDoubleSwap('She', 'He');
    tryGenderDoubleSwap('his', 'her');
    tryGenderDoubleSwap('her', 'his');

    return variants;
  }

  /* Build choices:
     - 2 very close distractors (mutations of the correct sentence)
     - 1 moderately similar distractor (same topic from pool)
     All 4 options look plausible but only one is right */
  function buildChoices(correct, pool) {
    const mutations = shuffle(generateDistractors(correct.en));

    // Pick 2 mutations — prefer ones that differ by only 1 word (most tricky)
    const close = [];
    // First pass: single-word diff
    for (const m of mutations) {
      if (close.length >= 2) break;
      const wa = correct.en.split(/\s+/);
      const wb = m.split(/\s+/);
      const diffs = Math.max(wa.length, wb.length) - wa.filter((w,i) => w === wb[i]).length;
      if (diffs <= 2) close.push(m);
    }
    // Second pass: any mutation if not enough
    for (const m of mutations) {
      if (close.length >= 2) break;
      if (!close.includes(m)) close.push(m);
    }

    // Pick 1 pool sentence with highest word overlap (medium difficulty)
    const others = pool
      .filter(s => s.en !== correct.en)
      .map(s => {
        const wa = correct.en.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/);
        const wb = new Set(s.en.toLowerCase().replace(/[^a-z\s]/g,'').split(/\s+/));
        return { en: s.en, score: wa.filter(w => wb.has(w)).length };
      })
      .sort((a, b) => b.score - a.score);

    const topN = Math.max(6, Math.ceil(others.length * 0.25));
    const poolPick = shuffle(others.slice(0, topN))[0];
    const medium = poolPick ? poolPick.en : (others[0] ? others[0].en : null);

    const distractors = [...close.slice(0,2)];
    if (medium && !distractors.includes(medium)) distractors.push(medium);

    // Fallback: fill any remaining slots from mutations
    for (const m of mutations) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(m)) distractors.push(m);
    }
    // Last resort: random pool
    for (const s of shuffle([...pool])) {
      if (distractors.length >= 3) break;
      if (s.en !== correct.en && !distractors.includes(s.en)) distractors.push(s.en);
    }

    return shuffle([correct.en, ...distractors.slice(0,3)]);
  }

  function _escHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Timer seconds per level ── */
  const LEVEL_TIME = { A1: 8, A2: 10, B1: 13, B2: 16, C1: 18, C2: 20, ALL: 15 };
  const TIMER_CIRC = 94.25; // 2π × r=15

  /* ── TranslateMode class ── */
  class TranslateMode {
    constructor(app) {
      this.app = app;
      this._el = null;
      this._questions = [];
      this._pool = [];
      this._idx = 0;
      this._results = [];
      this._level = null;
      this._timerInterval = null;
    }

    init(el) {
      this._el = el;
      this._renderHome();
    }

    destroy() {
      this._clearTimer();
      this._el = null;
    }

    _clearTimer() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
    }

    /* ── HOME ── */
    _renderHome() {
      this._clearTimer();
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
      this._clearTimer();
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
      // Use sentence's own level for time (matters in ALL mode)
      const secs = LEVEL_TIME[q.level] || LEVEL_TIME[this._level] || 20;

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
            <div class="tr-timer-wrap">
              <svg class="tr-timer-ring" viewBox="0 0 36 36">
                <circle class="tr-ring-bg" cx="18" cy="18" r="15"/>
                <circle class="tr-ring-fill" id="trTimerRing" cx="18" cy="18" r="15"
                  style="stroke-dasharray:${TIMER_CIRC};stroke-dashoffset:0"/>
              </svg>
              <span class="tr-timer-num" id="trTimerNum">${secs}</span>
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
          this._checkAnswer(q, choices, btn.dataset.val, btn);
        });
      });

      // ── Start countdown ──
      let remaining = secs;
      const ringEl = el.querySelector('#trTimerRing');
      const numEl  = el.querySelector('#trTimerNum');

      this._timerInterval = setInterval(() => {
        remaining--;
        if (!ringEl || !numEl) { this._clearTimer(); return; }

        const offset = TIMER_CIRC * (1 - remaining / secs);
        ringEl.style.strokeDashoffset = offset;
        numEl.textContent = remaining;

        const danger = remaining <= 5;
        const warn   = !danger && remaining <= Math.ceil(secs * 0.4);
        ringEl.className.baseVal = 'tr-ring-fill' + (danger ? ' tr-timer-danger' : warn ? ' tr-timer-warn' : '');
        numEl.className = 'tr-timer-num' + (danger ? ' tr-timer-danger' : warn ? ' tr-timer-warn' : '');

        if (remaining <= 0) {
          this._clearTimer();
          this._checkAnswer(q, choices, null, null); // timeout → wrong
        }
      }, 1000);
    }

    /* ── CHECK ── */
    _checkAnswer(q, choices, chosen, clickedBtn) {
      this._clearTimer();
      const el = this._el;
      if (!el) return;

      const timeout  = chosen === null;
      const isCorrect = !timeout && chosen === q.en;
      const grade = isCorrect ? 'correct' : 'wrong';
      const xp = isCorrect ? 20 : 0;

      this._results.push({ q, chosen: timeout ? '(süre doldu)' : chosen, grade, xp });

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
          <span class="tr-fb-icon">${isCorrect ? '🎯' : timeout ? '⏰' : '❌'}</span>
          <div class="tr-fb-texts">
            <div class="tr-fb-label">${isCorrect ? 'Doğru!' : timeout ? 'Süre doldu!' : 'Yanlış!'}</div>
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
