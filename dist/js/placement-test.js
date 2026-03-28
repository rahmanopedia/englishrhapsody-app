/**
 * PLACEMENT TEST — Gelişmiş Adaptif CEFR Seviye Belirleme v3
 *
 * Algoritma: İkili arama ile hızlı, doğru yakınsama.
 *   - B1'den başla (merkez nokta)
 *   - Her aşama: 5 soru (3 kelime + 2 gramer), karışık sıra
 *   - Geçme eşiği: 3/5 (%60)
 *   - TAM 3/5 → Tiebreaker (1 ek gramer sorusu) — sınır durumu çözülür
 *   - Her aşama sonrası kısa özet ekranı (skor + yön göstergesi)
 *   - Canlı skor noktaları (●○) her sorudan sonra güncellenir
 *   - Sonuç ekranı: tüm aşama geçmişi + performans özeti
 */
class PlacementTest {
  constructor() {
    this._LEVELS  = ['A1','A2','B1','B2','C1','C2'];
    this._COLORS  = { A1:'#10b981', A2:'#06b6d4', B1:'#3b82f6', B2:'#8b5cf6', C1:'#f59e0b', C2:'#ef4444' };
    this._LABELS  = { A1:'Başlangıç', A2:'Temel', B1:'Orta Altı', B2:'Orta Üstü', C1:'İleri', C2:'Ustalaşmış' };
    this._DESCS   = {
      A1: 'Temel kelimeler ve günlük ifadelerle başlıyorsun. A1 içerikleriyle sağlam bir temel oluşturacaksın.',
      A2: 'Basit konular ve yaygın cümlelerle çalışıyorsun. A2 seviyesi senin için mükemmel bir başlangıç noktası.',
      B1: 'Günlük iletişimde rahat edebiliyorsun. B1 içerikleriyle kelime dağarcığını hızla genişleteceksin.',
      B2: 'Karmaşık konular ve soyut fikirlerle başa çıkabiliyorsun. B2 seviyesin gerçekten etkileyici!',
      C1: 'Akıcı ve spontane iletişim kurabiliyorsun. C1 içerikleriyle ustalaşmaya çok yakınsın.',
      C2: 'Neredeyse anadil düzeyinde İngilizce biliyorsun. C2 — mükemmeliyetin zirvesi!',
    };

    // ── Yerleşik gramer soruları: her CEFR seviyesi için 8 soru ─────────────
    this._GQ = {
      A1: [
        { q:"I ___ a student.",               c:["am","is","are","be"],              a:0, hint:"I + am" },
        { q:"She ___ to school every day.",    c:["go","goes","going","gone"],        a:1, hint:"He/She/It → goes" },
        { q:"There ___ three apples.",         c:["is","are","has","have"],           a:1, hint:"\"there are\" + çoğul" },
        { q:"___ you like coffee?",            c:["Do","Does","Are","Is"],            a:0, hint:"I/you/we/they → Do" },
        { q:"My name ___ Tom.",                c:["am","is","are","be"],              a:1, hint:"He/She/It/isim + is" },
        { q:"They ___ in the garden now.",     c:["plays","play","are playing","played"], a:2, hint:"şu an oluyor → are + -ing" },
        { q:"It is ___ cold today.",           c:["very","much","many","well"],       a:0, hint:"sıfat önünde → very" },
        { q:"___ is your name?",               c:["What","Who","Where","When"],       a:0, hint:"\"what\" isim sorar" },
      ],
      A2: [
        { q:"She is ___ than her sister.",          c:["tall","taller","tallest","more tall"],         a:1, hint:"karşılaştırma → -er" },
        { q:"They ___ in Paris for two years.",     c:["live","lives","lived","have lived"],           a:3, hint:"geçmişten bugüne → present perfect" },
        { q:"How ___ does a coffee cost?",          c:["many","much","lot","few"],                     a:1, hint:"sayılamayan → much" },
        { q:"I was watching TV when she ___.",      c:["calls","called","has called","is calling"],    a:1, hint:"geçmişte ani eylem → past simple" },
        { q:"We ___ to the cinema last night.",     c:["go","goes","went","gone"],                     a:2, hint:"dün gece = past simple" },
        { q:"She is not as tall ___ her brother.",  c:["than","as","like","so"],                       a:1, hint:"as ... as → eşitlik" },
        { q:"I have ___ finished my homework.",     c:["yet","already","still","never"],               a:1, hint:"already = şimdiye kadar bitirmiş" },
        { q:"___ long have you lived here?",        c:["How","What","Since","For"],                    a:0, hint:"\"how long\" süre sorar" },
      ],
      B1: [
        { q:"If it rains tomorrow, we ___ stay inside.", c:["will","would","can","should"],                     a:0, hint:"gerçek koşul (1. tip) → will" },
        { q:"The movie ___ by Spielberg.",               c:["directed","was directed","is directing","directs"], a:1, hint:"pasif → was + past participle" },
        { q:"She suggested ___ a break.",                c:["take","to take","taking","taken"],                 a:2, hint:"suggest + gerund (-ing)" },
        { q:"By the time he arrived, we ___ dinner.",    c:["finish","finished","had finished","have finished"], a:2, hint:"önce biten → past perfect" },
        { q:"She asked me where I ___.",                 c:["live","lived","am living","will live"],             a:1, hint:"reported speech → zaman kayması" },
        { q:"He ___ have forgotten — he always does.",  c:["must","can","should","would"],                      a:0, hint:"mantıklı çıkarım → must" },
        { q:"I'm used to ___ early.",                   c:["wake","wakes","waking","woken"],                    a:2, hint:"used to + gerund" },
        { q:"Someone ___ the window.",                  c:["break","broke","had broken","must have broken"],    a:3, hint:"geçmişe yönelik tahmin → must have + p.p." },
      ],
      B2: [
        { q:"I wish I ___ more time to study.",               c:["have","had","would have","will have"],              a:1, hint:"wish + geçmiş (gerçek dışı istek)" },
        { q:"Not only ___ she sing, but she dances too.",     c:["can","does","is","has"],                            a:1, hint:"Not only → devrik yapı" },
        { q:"The report needs ___.",                          c:["finishing","to finish","be finished","finished"],   a:0, hint:"need + gerund (pasif anlam)" },
        { q:"Barely ___ he sat down when the phone rang.",    c:["did","had","was","has"],                            a:1, hint:"Barely + devrik had" },
        { q:"Had I known, I ___ differently.",                c:["act","acted","would act","would have acted"],        a:3, hint:"3. tip koşul → would have + p.p." },
        { q:"The longer you wait, ___ it gets.",              c:["worse","the worse","most worse","worst"],            a:1, hint:"the + comp., the + comp." },
        { q:"She ___ to the party if she'd been invited.",    c:["comes","came","would come","would have come"],       a:3, hint:"3. tip → would have come" },
        { q:"It's about time you ___ a decision.",            c:["make","made","have made","will make"],               a:1, hint:"It's about time + geçmiş" },
      ],
      C1: [
        { q:"He is said ___ a fortune.",                       c:["to make","to have made","making","having made"],          a:1, hint:"geçmişe atıf → to have + p.p." },
        { q:"No sooner ___ he arrived than it started raining.", c:["had","has","did","was"],                               a:0, hint:"No sooner + had (devrik)" },
        { q:"Were she to apply, she ___ the job.",             c:["gets","would get","will get","got"],                      a:1, hint:"resmi koşul (inverted) → would" },
        { q:"The theory, while ___, lacks empirical support.", c:["compelling","compelled","to compel","compulsion"],        a:0, hint:"while + sıfat" },
        { q:"Only after the meeting ___ she realize the truth.", c:["did","had","was","has"],                               a:0, hint:"Only after → devrik did" },
        { q:"I'd rather you ___ call so late.",                c:["don't","didn't","hadn't","won't"],                        a:1, hint:"I'd rather + geçmiş (kibarca istek)" },
        { q:"She has a tendency ___ things personally.",       c:["take","to take","of taking","for taking"],                a:1, hint:"tendency + to + infinitive" },
        { q:"The proposal was rejected ___ the committee's objections.", c:["due to","because","owing to","despite"],       a:3, hint:"\"despite\" + isim = rağmen" },
      ],
      C2: [
        { q:"It is high time we ___ this problem seriously.",      c:["take","took","have taken","will take"],                     a:1, hint:"It is high time + past tense" },
        { q:"The extent to ___ this applies is unclear.",          c:["which","what","that","whom"],                               a:0, hint:"\"to which\" = ilgi zamiri + edat" },
        { q:"Scarcely ___ the meeting begun when disagreements arose.", c:["had","has","did","was"],                               a:0, hint:"Scarcely + had (devrik geçmiş)" },
        { q:"She is, as it were, a ___ of modern art.",           c:["connoisseur","connoiseur","connoissure","conneissure"],       a:0, hint:"yazım: connoisseur = uzman" },
        { q:"The findings, ___ preliminary, warrant investigation.", c:["albeit","although","despite","while"],                   a:0, hint:"albeit = although it is (kısa biçim)" },
        { q:"He spoke with such authority as ___ brook no contradiction.", c:["to","would","could","might"],                      a:0, hint:"such ... as to = sonuç belirtir" },
        { q:"Come ___ may, we'll see it through.",                c:["what","which","that","whatever"],                            a:0, hint:"Come what may = ne olursa olsun" },
        { q:"Far-fetched ___ it may seem, the idea has merit.",   c:["as","though","than","that"],                                 a:0, hint:"adj + as + it may = concessive" },
      ],
    };

    this._byLevel  = {};
    this._container = null;
    this._onComplete = null;

    // Adaptif binary-search durumu
    this._lo          = 0;
    this._hi          = 5;
    this._curIdx      = 2;  // B1
    this._lastPassed  = -1;
    this._stageHistory   = [];   // [{level, correct, total, passed}]
    this._stageQuestions = [];
    this._stageResults   = [];   // true/false per question this stage
    this._questionIdx    = 0;
    this._stageCorrect   = 0;
    this._totalAsked     = 0;
    this._PER_STAGE      = 5;
    this._PASS_THRESHOLD = 3;
    this._isTiebreaker   = false;
    this._usedGQ         = new Set();  // kullanılmış gramer sorularını takip et
  }

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

  // ── Welcome ───────────────────────────────────────────────────────────────
  _renderWelcome() {
    this._html(`
      <div class="pt-card">
        <div class="pt-emoji">🎯</div>
        <h2 class="pt-title">Seviyeni Belirleyelim</h2>
        <p class="pt-desc">
          Akıllı bir kelime ve gramer testi ile tam seviyeni buluyoruz.<br>
          <strong>~3 dakika</strong> · Her aşamada <strong>5 soru</strong> · En fazla 3 aşama
        </p>
        <div class="pt-how-row">
          <div class="pt-how-item"><span>📖</span><span>Kelime</span></div>
          <div class="pt-how-plus">+</div>
          <div class="pt-how-item"><span>📝</span><span>Gramer</span></div>
          <div class="pt-how-plus">=</div>
          <div class="pt-how-item"><span>🎯</span><span>Kesin Seviye</span></div>
        </div>
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
    this._lo           = 0;
    this._hi           = 5;
    this._curIdx       = 2;  // B1
    this._lastPassed   = -1;
    this._totalAsked   = 0;
    this._stageHistory = [];
    this._usedGQ       = new Set();
    this._startStage();
  }

  // ── Aşama başlat ─────────────────────────────────────────────────────────
  _startStage() {
    const level = this._LEVELS[this._curIdx];

    // 3 kelime sorusu
    const pool  = [...(this._byLevel[level] || [])].sort(() => Math.random() - 0.5);
    const vocab = pool.slice(0, 3).map(w => ({ type:'vocab', data:w }));

    // 2 gramer sorusu (kullanılmamış olanlardan)
    const gqAll = (this._GQ[level] || []).filter((_, i) => !this._usedGQ.has(level + i));
    const gqShuf = [...gqAll].sort(() => Math.random() - 0.5).slice(0, 2);
    gqShuf.forEach(g => {
      const i = this._GQ[level].indexOf(g);
      this._usedGQ.add(level + i);
    });
    const grammar = gqShuf.map(g => ({ type:'grammar', data:g }));

    // Eksik varsa (kelime veya gramer yetmezse) diğerinden tamamla
    let questions = [...vocab, ...grammar];
    if (questions.length < this._PER_STAGE) {
      const extra = (this._GQ[level] || []).sort(() => Math.random() - 0.5)
        .slice(0, this._PER_STAGE - questions.length)
        .map(g => ({ type:'grammar', data:g }));
      questions = [...questions, ...extra];
    }

    this._stageQuestions = questions.sort(() => Math.random() - 0.5).slice(0, this._PER_STAGE);
    this._stageResults   = [];
    this._stageCorrect   = 0;
    this._questionIdx    = 0;
    this._isTiebreaker   = false;

    this._showLevelTransition(level, () => this._askQuestion());
  }

  _showLevelTransition(level, cb) {
    const color     = this._COLORS[level];
    const stageNum  = this._stageHistory.length + 1;
    const stageDots = this._stageHistory.map(s =>
      `<span class="pt-stage-dot ${s.passed ? 'pt-sdot-pass' : 'pt-sdot-fail'}" title="${s.level}: ${s.correct}/${s.total}"></span>`
    ).join('');

    this._html(`
      <div class="pt-card pt-card-transition">
        <div class="pt-stage-tracker">${stageDots}
          <span class="pt-stage-dot pt-sdot-current" style="border-color:${color};background:${color}22"></span>
        </div>
        <div class="pt-level-pill" style="color:${color};border-color:${color}40;background:${color}12">
          ${level}
        </div>
        <p class="pt-transition-label">${this._LABELS[level]} seviye</p>
        <p class="pt-transition-sub">Aşama ${stageNum} · 5 soru · kelime + gramer</p>
      </div>
    `);
    setTimeout(cb, 1000);
  }

  // ── Soru göster ──────────────────────────────────────────────────────────
  _askQuestion() {
    const item = this._stageQuestions[this._questionIdx];
    if (!item) { this._evaluateStage(); return; }
    item.type === 'grammar' ? this._renderGrammarQ(item.data) : this._renderVocabQ(item.data);
  }

  _scoreDots(level) {
    const color = this._COLORS[level];
    const total = this._stageQuestions.length;
    return Array.from({ length: total }, (_, i) => {
      const r = this._stageResults[i];
      if (r === undefined) return `<span class="pt-qdot pt-qdot-empty"></span>`;
      return `<span class="pt-qdot ${r ? 'pt-qdot-ok' : 'pt-qdot-fail'}" style="${r ? `background:${color}` : ''}"></span>`;
    }).join('');
  }

  _renderVocabQ(word) {
    const level = this._LEVELS[this._curIdx];
    const color = this._COLORS[level];

    const pool      = (this._byLevel[level] || []).filter(w => w.en !== word.en);
    let distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    if (distractors.length < 3 && typeof WORDS !== 'undefined') {
      const used  = new Set([word.en, ...distractors.map(d => d.en)]);
      const extra = WORDS.filter(w => w.tr && w.en && !used.has(w.en))
                         .sort(() => Math.random() - 0.5)
                         .slice(0, 3 - distractors.length);
      distractors = [...distractors, ...extra];
    }
    const options = [...distractors.map(w => w.tr), word.tr].sort(() => Math.random() - 0.5);
    const qNum    = this._questionIdx + 1;
    const pct     = this._progressPct();

    this._html(`
      <div class="pt-card">
        <div class="pt-progress-bar"><div class="pt-progress-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="pt-q-meta">
          <span class="pt-q-level" style="color:${color}">${level}</span>
          <div class="pt-qdot-row">${this._scoreDots(level)}</div>
          <span class="pt-q-type" style="color:${color};background:${color}18;border:1px solid ${color}33">📖 Kelime</span>
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
    this._container.querySelectorAll('.pt-opt').forEach(btn =>
      btn.addEventListener('click', () => this._handleAnswer(btn, word.ex || '', word.tr))
    );
  }

  _renderGrammarQ(gq, isTiebreaker = false) {
    const level = this._LEVELS[this._curIdx];
    const color = this._COLORS[level];

    const shuffled = gq.c
      .map((text, i) => ({ text, correct: i === gq.a }))
      .sort(() => Math.random() - 0.5);

    const qHtml = gq.q.replace('___',
      `<span class="pt-blank" style="border-color:${color}">___</span>`);
    const pct = this._progressPct();

    const metaRight = isTiebreaker
      ? `<span class="pt-q-type" style="color:#f59e0b;background:#f59e0b18;border:1px solid #f59e0b33">⚡ Belirleyici</span>`
      : `<span class="pt-q-type" style="color:${color};background:${color}18;border:1px solid ${color}33">📝 Gramer</span>`;

    this._html(`
      <div class="pt-card">
        <div class="pt-progress-bar"><div class="pt-progress-fill" style="width:${pct}%;background:${color}"></div></div>
        <div class="pt-q-meta">
          <span class="pt-q-level" style="color:${color}">${level}</span>
          ${isTiebreaker ? '' : `<div class="pt-qdot-row">${this._scoreDots(level)}</div>`}
          ${metaRight}
        </div>
        <div class="pt-grammar-block">
          <p class="pt-grammar-q">${qHtml}</p>
        </div>
        <p class="pt-q-label">${isTiebreaker ? 'Son karar sorusu — dikkatli düşün:' : 'Boşluğa uygun seçeneği seç:'}</p>
        <div class="pt-options">
          ${shuffled.map((opt, i) => `
            <button class="pt-opt" data-correct="${opt.correct ? '1' : '0'}">
              <span class="pt-opt-letter">${'ABCD'[i]}</span>
              <span class="pt-opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `);
    this._container.querySelectorAll('.pt-opt').forEach(btn =>
      btn.addEventListener('click', () => {
        if (isTiebreaker) {
          this._handleTiebreakerAnswer(btn, gq.hint);
        } else {
          this._handleAnswer(btn, `💡 ${gq.hint}`, null);
        }
      })
    );
  }

  // ── Cevap işle ───────────────────────────────────────────────────────────
  _handleAnswer(btn, feedback, _correctTr) {
    const isCorrect = btn.dataset.correct === '1';
    this._lockOptions(btn, isCorrect);

    if (feedback) {
      const fb = document.createElement('div');
      fb.className = 'pt-example';
      fb.innerHTML = `<em>${feedback}</em>`;
      this._container.querySelector('.pt-options')?.after(fb);
    }

    this._stageResults.push(isCorrect);
    if (isCorrect) this._stageCorrect++;
    this._questionIdx++;

    // Nokta satırını güncelle
    this._updateDots();

    setTimeout(() => this._askQuestion(), 1100);
  }

  _handleTiebreakerAnswer(btn, hint) {
    const isCorrect = btn.dataset.correct === '1';
    this._lockOptions(btn, isCorrect);

    const hintDiv = document.createElement('div');
    hintDiv.className = 'pt-example';
    hintDiv.innerHTML = `<em>💡 ${hint}</em>`;
    this._container.querySelector('.pt-options')?.after(hintDiv);

    setTimeout(() => {
      this._totalAsked++;
      this._advanceBinarySearch(isCorrect);
    }, 1300);
  }

  _lockOptions(btn, isCorrect) {
    this._container.querySelectorAll('.pt-opt').forEach(b => {
      b.disabled = true;
      if (b.dataset.correct === '1')    b.classList.add('pt-opt-correct');
      else if (b === btn && !isCorrect) b.classList.add('pt-opt-wrong');
    });
  }

  _updateDots() {
    const dotRow = this._container.querySelector('.pt-qdot-row');
    if (dotRow) {
      const level = this._LEVELS[this._curIdx];
      dotRow.innerHTML = this._scoreDots(level);
    }
  }

  // ── Aşama değerlendirme ──────────────────────────────────────────────────
  _evaluateStage() {
    this._totalAsked += this._stageQuestions.length;

    // TAM eşik → tiebreaker
    if (this._stageCorrect === this._PASS_THRESHOLD) {
      this._showStageSummary(null, () => this._startTiebreaker());
      return;
    }

    const passed = this._stageCorrect > this._PASS_THRESHOLD;
    this._showStageSummary(passed, () => this._advanceBinarySearch(passed));
  }

  _startTiebreaker() {
    const level   = this._LEVELS[this._curIdx];
    const gqAll   = this._GQ[level] || [];
    const unused  = gqAll.filter((_, i) => !this._usedGQ.has(level + i));
    const pool    = (unused.length > 0 ? unused : gqAll).sort(() => Math.random() - 0.5);
    const tq      = pool[0];
    if (!tq) {
      // Yedek yok → geçti say
      this._advanceBinarySearch(true);
      return;
    }
    const i = gqAll.indexOf(tq);
    this._usedGQ.add(level + i);
    this._renderGrammarQ(tq, true);
  }

  // ── Aşama özet ekranı ────────────────────────────────────────────────────
  _showStageSummary(passed, cb) {
    const level  = this._LEVELS[this._curIdx];
    const color  = this._COLORS[level];
    const total  = this._stageQuestions.length;

    // Aşama geçmişine kaydet (tiebreaker öncesi çağrıldığında passed null olabilir)
    if (passed !== null) {
      this._stageHistory.push({ level, correct: this._stageCorrect, total, passed });
    }

    // Sonraki seviye tahmini
    let nextHint = '';
    if (passed === null) {
      nextHint = '⚡ Eşit puan — belirleyici soru geliyor';
    } else if (passed) {
      const nextIdx = this._lo + 1 <= this._hi
        ? Math.floor((this._curIdx + 1 + this._hi) / 2)
        : null;
      nextHint = nextIdx !== null
        ? `↑ ${this._LEVELS[nextIdx]} seviyesi deneniyor`
        : '🏆 Zirveye ulaştın!';
    } else {
      const nextIdx = this._lo <= this._curIdx - 1
        ? Math.floor((this._lo + this._curIdx - 1) / 2)
        : null;
      nextHint = nextIdx !== null
        ? `↓ ${this._LEVELS[nextIdx]} seviyesine geçiliyor`
        : '✓ Seviye bulundu';
    }

    const dotHtml = this._stageResults.map(r =>
      `<span class="pt-sum-dot ${r ? 'pt-sum-dot-ok' : 'pt-sum-dot-fail'}" style="${r ? `background:${color}` : ''}"></span>`
    ).join('');

    const verdictClass = passed === null ? 'pt-verdict-tie' : (passed ? 'pt-verdict-pass' : 'pt-verdict-fail');
    const verdictText  = passed === null ? `${this._stageCorrect}/${total} — Tam eşik` : (passed ? `${this._stageCorrect}/${total} ✓ Geçildi` : `${this._stageCorrect}/${total} ✗ Yetersiz`);

    this._html(`
      <div class="pt-card pt-card-summary">
        <div class="pt-sum-level" style="color:${color}">${level} <span style="opacity:0.5;font-size:0.75em">${this._LABELS[level]}</span></div>
        <div class="pt-sum-dots">${dotHtml}</div>
        <div class="pt-sum-verdict ${verdictClass}">${verdictText}</div>
        <div class="pt-sum-next">${nextHint}</div>
      </div>
    `);
    setTimeout(cb, passed === null ? 1200 : 1600);
  }

  // ── Çekirdek: ikili arama ────────────────────────────────────────────────
  _advanceBinarySearch(passed) {
    if (passed) {
      this._lastPassed = this._curIdx;
      this._lo = this._curIdx + 1;
    } else {
      this._hi = this._curIdx - 1;
    }

    if (this._lo > this._hi) {
      const result = this._lastPassed === -1 ? 'A1' : this._LEVELS[this._lastPassed];
      this._finish(result);
      return;
    }

    this._curIdx = Math.floor((this._lo + this._hi) / 2);
    this._startStage();
  }

  _progressPct() {
    const done = this._totalAsked + this._questionIdx;
    return Math.min(Math.round(done / 15 * 100), 95);
  }

  // ── Sonuç ekranı ─────────────────────────────────────────────────────────
  _finish(level, skipped = false) {
    const color = this._COLORS[level];
    const label = this._LABELS[level];
    const desc  = this._DESCS[level];

    let historyHtml = '';
    if (!skipped && this._stageHistory.length > 0) {
      const rows = this._stageHistory.map(s => {
        const c = this._COLORS[s.level];
        const dots = Array.from({ length: s.total }, (_, i) =>
          i < s.correct
            ? `<span class="pt-hist-dot" style="background:${c}"></span>`
            : `<span class="pt-hist-dot pt-hist-dot-fail"></span>`
        ).join('');
        return `
          <div class="pt-hist-row">
            <span class="pt-hist-lvl" style="color:${c}">${s.level}</span>
            <span class="pt-hist-dots">${dots}</span>
            <span class="pt-hist-score ${s.passed ? 'pt-hist-pass' : 'pt-hist-fail'}">${s.correct}/${s.total}</span>
          </div>
        `;
      }).join('');
      historyHtml = `
        <div class="pt-history-box">
          <div class="pt-history-title">Test Özeti</div>
          ${rows}
        </div>
      `;
    }

    this._html(`
      <div class="pt-card pt-card-result">
        <div class="pt-result-emoji">${skipped ? '📚' : '🎉'}</div>
        <h2 class="pt-title">${skipped ? 'Tamam!' : 'Seviyeni Bulduk!'}</h2>
        <div class="pt-result-badge" style="color:${color};border-color:${color}40;background:${color}12">
          ${level} — ${label}
        </div>
        <p class="pt-result-desc">${desc}</p>
        ${historyHtml}
        <p class="pt-result-note">İstediğin zaman Ayarlar'dan seviyeni değiştirebilirsin.</p>
        <button class="pt-btn pt-btn-primary" id="pt-confirm" style="background:${color}">
          Uygulamayı Aç →
        </button>
        ${skipped ? '' : `<button class="pt-btn pt-btn-retry" id="pt-retry">Testi Tekrar Yap</button>`}
      </div>
    `);

    this._on('pt-confirm', () => { if (this._onComplete) this._onComplete(level); });
    this._on('pt-retry',   () => this._beginTest());
  }

  // ── Yardımcılar ──────────────────────────────────────────────────────────
  _html(inner) { this._container.innerHTML = `<div class="pt-overlay">${inner}</div>`; }

  _on(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  }
}
