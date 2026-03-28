/**
 * PLACEMENT TEST — Gelişmiş Adaptif CEFR Seviye Belirleme v4
 *
 * Algoritma: İkili arama ile hızlı, kesin yakınsama.
 *   - B1'den başla → 3 aşamada (~15 soru) kesin seviye
 *   - Her aşama: 3 kelime + 1 gramer (boşluk) + 1 doğru cümle = 5 soru
 *   - Geçme eşiği: 3/5 · tam eşik → tiebreaker sorusu
 *   - CEFR termometresi: hangi seviyede test edildiği görsel olarak gösterilir
 *   - Sesli telaffuz butonu (🔊) kelime sorularında
 *   - "Bilmiyorum" atla butonu — zorlamadan dürüst tespit
 *   - Aşama özet ekranı + sonuç geçmişi
 */
class PlacementTest {
  constructor() {
    this._LEVELS = ['A1','A2','B1','B2','C1','C2'];
    this._COLORS = { A1:'#10b981', A2:'#06b6d4', B1:'#3b82f6', B2:'#8b5cf6', C1:'#f59e0b', C2:'#ef4444' };
    this._LABELS = { A1:'Başlangıç', A2:'Temel', B1:'Orta Altı', B2:'Orta Üstü', C1:'İleri', C2:'Ustalaşmış' };
    this._DESCS  = {
      A1: 'Temel kelimeler ve günlük ifadelerle başlıyorsun. A1 içerikleriyle sağlam bir temel oluşturacaksın.',
      A2: 'Basit konular ve yaygın cümlelerle çalışıyorsun. A2 seviyesi senin için mükemmel bir başlangıç noktası.',
      B1: 'Günlük iletişimde rahat edebiliyorsun. B1 içerikleriyle kelime dağarcığını hızla genişleteceksin.',
      B2: 'Karmaşık konular ve soyut fikirlerle başa çıkabiliyorsun. B2 seviyesin gerçekten etkileyici!',
      C1: 'Akıcı ve spontane iletişim kurabiliyorsun. C1 içerikleriyle ustalaşmaya çok yakınsın.',
      C2: 'Neredeyse anadil düzeyinde İngilizce biliyorsun. C2 — mükemmeliyetin zirvesi!',
    };

    // ── Boşluk doldurma soruları (8 / seviye) ───────────────────────────────
    this._GQ = {
      A1: [
        { q:"I ___ a student.",               c:["am","is","are","be"],                  a:0, hint:"I + am" },
        { q:"She ___ to school every day.",    c:["go","goes","going","gone"],            a:1, hint:"He/She/It → goes" },
        { q:"There ___ three apples.",         c:["is","are","has","have"],               a:1, hint:"\"there are\" + çoğul" },
        { q:"___ you like coffee?",            c:["Do","Does","Are","Is"],                a:0, hint:"I/you/we/they → Do" },
        { q:"My name ___ Tom.",                c:["am","is","are","be"],                  a:1, hint:"isim/He/She/It + is" },
        { q:"They ___ in the garden now.",     c:["plays","play","are playing","played"], a:2, hint:"şu an → are + -ing" },
        { q:"It is ___ cold today.",           c:["very","much","many","well"],           a:0, hint:"sıfat önünde → very" },
        { q:"___ is your name?",               c:["What","Who","Where","When"],           a:0, hint:"\"what\" isim sorar" },
      ],
      A2: [
        { q:"She is ___ than her sister.",         c:["tall","taller","tallest","more tall"],         a:1, hint:"karşılaştırma → -er" },
        { q:"They ___ in Paris for two years.",    c:["live","lives","lived","have lived"],           a:3, hint:"geçmişten bugüne → present perfect" },
        { q:"How ___ does a coffee cost?",         c:["many","much","lot","few"],                     a:1, hint:"sayılamayan → much" },
        { q:"I was watching TV when she ___.",     c:["calls","called","has called","is calling"],    a:1, hint:"geçmişte ani eylem → past simple" },
        { q:"We ___ to the cinema last night.",    c:["go","goes","went","gone"],                     a:2, hint:"dün gece = past simple" },
        { q:"She is not as tall ___ her brother.", c:["than","as","like","so"],                       a:1, hint:"as ... as → eşitlik" },
        { q:"I have ___ finished my homework.",    c:["yet","already","still","never"],               a:1, hint:"already = şimdiye kadar bitirmiş" },
        { q:"___ long have you lived here?",       c:["How","What","Since","For"],                    a:0, hint:"\"how long\" süre sorar" },
      ],
      B1: [
        { q:"If it rains tomorrow, we ___ stay inside.", c:["will","would","can","should"],                      a:0, hint:"gerçek koşul (1. tip) → will" },
        { q:"The movie ___ by Spielberg.",               c:["directed","was directed","is directing","directs"], a:1, hint:"pasif → was + past participle" },
        { q:"She suggested ___ a break.",                c:["take","to take","taking","taken"],                  a:2, hint:"suggest + gerund (-ing)" },
        { q:"By the time he arrived, we ___ dinner.",    c:["finish","finished","had finished","have finished"], a:2, hint:"önce biten → past perfect" },
        { q:"She asked me where I ___.",                 c:["live","lived","am living","will live"],             a:1, hint:"reported speech → zaman kayması" },
        { q:"He ___ have forgotten — he always does.",  c:["must","can","should","would"],                      a:0, hint:"mantıklı çıkarım → must" },
        { q:"I'm used to ___ early.",                   c:["wake","wakes","waking","woken"],                    a:2, hint:"used to + gerund" },
        { q:"Someone ___ the window.",                  c:["break","broke","had broken","must have broken"],    a:3, hint:"geçmişe tahmin → must have + p.p." },
      ],
      B2: [
        { q:"I wish I ___ more time to study.",              c:["have","had","would have","will have"],              a:1, hint:"wish + geçmiş (gerçek dışı)" },
        { q:"Not only ___ she sing, but she dances too.",    c:["can","does","is","has"],                            a:1, hint:"Not only → devrik yapı" },
        { q:"The report needs ___.",                         c:["finishing","to finish","be finished","finished"],   a:0, hint:"need + gerund (pasif anlam)" },
        { q:"Barely ___ he sat down when the phone rang.",   c:["did","had","was","has"],                            a:1, hint:"Barely + devrik had" },
        { q:"Had I known, I ___ differently.",               c:["act","acted","would act","would have acted"],        a:3, hint:"3. tip koşul → would have + p.p." },
        { q:"The longer you wait, ___ it gets.",             c:["worse","the worse","most worse","worst"],            a:1, hint:"the + comp., the + comp." },
        { q:"She ___ to the party if she'd been invited.",   c:["comes","came","would come","would have come"],       a:3, hint:"3. tip → would have come" },
        { q:"It's about time you ___ a decision.",           c:["make","made","have made","will make"],               a:1, hint:"It's about time + geçmiş" },
      ],
      C1: [
        { q:"He is said ___ a fortune.",                        c:["to make","to have made","making","having made"],         a:1, hint:"geçmişe atıf → to have + p.p." },
        { q:"No sooner ___ he arrived than it started raining.",c:["had","has","did","was"],                                a:0, hint:"No sooner + had (devrik)" },
        { q:"Were she to apply, she ___ the job.",              c:["gets","would get","will get","got"],                     a:1, hint:"resmi koşul (inverted) → would" },
        { q:"The theory, while ___, lacks empirical support.",  c:["compelling","compelled","to compel","compulsion"],       a:0, hint:"while + sıfat" },
        { q:"Only after the meeting ___ she realize the truth.",c:["did","had","was","has"],                                a:0, hint:"Only after → devrik did" },
        { q:"I'd rather you ___ call so late.",                 c:["don't","didn't","hadn't","won't"],                       a:1, hint:"I'd rather + geçmiş (kibarca istek)" },
        { q:"She has a tendency ___ things personally.",        c:["take","to take","of taking","for taking"],               a:1, hint:"tendency + to + infinitive" },
        { q:"The proposal was rejected ___ the committee's objections.", c:["due to","because","owing to","despite"],       a:3, hint:"\"despite\" + isim = rağmen" },
      ],
      C2: [
        { q:"It is high time we ___ this problem seriously.",      c:["take","took","have taken","will take"],                      a:1, hint:"It is high time + past tense" },
        { q:"The extent to ___ this applies is unclear.",          c:["which","what","that","whom"],                                a:0, hint:"\"to which\" = ilgi zamiri + edat" },
        { q:"Scarcely ___ the meeting begun when disagreements arose.", c:["had","has","did","was"],                               a:0, hint:"Scarcely + had (devrik)" },
        { q:"She is, as it were, a ___ of modern art.",           c:["connoisseur","connoiseur","connoissure","conneissure"],        a:0, hint:"yazım: connoisseur = uzman" },
        { q:"The findings, ___ preliminary, warrant investigation.", c:["albeit","although","despite","while"],                    a:0, hint:"albeit = although it is (kısa)" },
        { q:"He spoke with such authority as ___ brook no contradiction.", c:["to","would","could","might"],                       a:0, hint:"such ... as to = sonuç belirtir" },
        { q:"Come ___ may, we'll see it through.",                c:["what","which","that","whatever"],                             a:0, hint:"Come what may = ne olursa olsun" },
        { q:"Far-fetched ___ it may seem, the idea has merit.",   c:["as","though","than","that"],                                  a:0, hint:"adj + as + subject = concessive" },
      ],
    };

    // ── Doğru cümle seçme soruları (4 / seviye) ─────────────────────────────
    this._CSQ = {
      A1: [
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"He/She/It + verb-s",
          c:["She go to school every day.","She goes to school every day.","She going to school every day.","She is go to school every day."], a:1 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"I/you/we/they + don't",
          c:["I am not like coffee.","I not like coffee.","I don't like coffee.","I doesn't like coffee."], a:2 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"they + are",
          c:["They is happy.","They am happy.","They be happy.","They are happy."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"soru → Is + özne + ...",
          c:["She is a teacher?","Does she is a teacher?","Is she a teacher?","Is she teacher?"], a:2 },
      ],
      A2: [
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"geçmiş zaman ifadesi (last year) → past simple",
          c:["I have visited Paris last year.","I have visit Paris last year.","I visited Paris last year.","I was visit Paris last year."], a:2 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"karşılaştırma → -er than",
          c:["She is more taller than me.","She is tallest than me.","She is tall than me.","She is taller than me."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"sayılamayan isim → much",
          c:["How many money do you have?","How much moneys do you have?","How many moneys do you have?","How much money do you have?"], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"agree = fiil, \"am agree\" yanlış",
          c:["I am agree with you.","I agrees with you.","I am agreed with you.","I agree with you."], a:3 },
      ],
      B1: [
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"1. tip koşul → If + present, will + base",
          c:["If it will rain, I stay home.","If it rained, I will stay home.","If it rains, I will stay home.","If it rains, I would stay home."], a:2 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"pasif geçmiş → was written",
          c:["The book was wrote by Orwell.","The book wrote by Orwell.","The book is write by Orwell.","The book was written by Orwell."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"suggest + gerund",
          c:["I suggested to take a break.","I suggested take a break.","I suggested taking a break.","I suggested that taking a break."], a:2 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"for + süre, since + başlangıç noktası",
          c:["She has worked here since five years.","She is working here since five years.","She has been working here since five years.","She has been working here for five years."], a:3 },
      ],
      B2: [
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"3. tip koşul → If + past perfect, would have + p.p.",
          c:["If I would have known, I had acted differently.","If I knew, I would have acted differently.","Had I knew, I would act differently.","If I had known, I would have acted differently."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"wish + geçmiş zaman (gerçek dışı)",
          c:["I wish I have more time.","I wish I will have more time.","I wish I would have more time.","I wish I had more time."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"Not only → devrik cümle",
          c:["Not only she sings, but also she dances.","Not only she does sing, but also dances.","Not only does she sing, but she also dances.","Not only is she singing but also dancing."], a:2 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"despite + isim/zamir (fiil değil)",
          c:["Despite of the rain, we went out.","Although the rain, we went out.","In spite of it rained, we went out.","Despite the rain, we went out."], a:3 },
      ],
      C1: [
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"is said to have + p.p. = geçmişe atıf",
          c:["He is said to make a fortune last year.","He said to have made a fortune.","He is being said to make a fortune.","He is said to have made a fortune last year."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"No sooner + had + özne + p.p. + than",
          c:["No sooner he arrived than it started raining.","No sooner did he arrived than it started raining.","No sooner he had arrived when it started raining.","No sooner had he arrived than it started raining."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"I'd rather + özne + past tense",
          c:["I'd rather you don't call so late.","I'd rather you hadn't calling so late.","I'd rather you won't call so late.","I'd rather you didn't call so late."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"Only after → devrik yardımcı fiil",
          c:["Only after she left he realised the mistake.","Only after she left he did realise the mistake.","Only she left after he realised the mistake.","Only after she left did he realise the mistake."], a:3 },
      ],
      C2: [
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"It is high time + past subjunctive",
          c:["It is high time we take this seriously.","It is high time we should take this seriously.","It is high time to take this seriously.","It is high time we took this seriously."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"Come what may = deyim, sabit",
          c:["Come whatever may, we shall endure.","Come what will, we shall endure.","Whatever comes, we shall be enduring.","Come what may, we shall endure."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"albeit + adj (\"albeit being\" yanlış)",
          c:["The findings, albeit being preliminary, warrant attention.","The findings, although preliminary are, warrant attention.","The findings, albeit of preliminary, warrant attention.","The findings, albeit preliminary, warrant attention."], a:3 },
        { q:"Hangisi dilbilgisel olarak doğru?", hint:"Scarcely + had + özne + p.p. + when",
          c:["Scarcely he had spoken when the crowd erupted.","Scarcely had he spoken than the crowd erupted.","Scarcely he spoke when the crowd erupted.","Scarcely had he spoken when the crowd erupted."], a:3 },
      ],
    };

    this._byLevel  = {};
    this._container = null;
    this._onComplete = null;

    // Binary search state
    this._lo          = 0;
    this._hi          = 5;
    this._curIdx      = 2;  // B1
    this._lastPassed  = -1;
    this._stageHistory   = [];
    this._stageQuestions = [];
    this._stageResults   = [];
    this._questionIdx    = 0;
    this._stageCorrect   = 0;
    this._totalAsked     = 0;
    this._skipCount      = 0;
    this._PER_STAGE      = 5;
    this._PASS_THRESHOLD = 3;
    this._usedGQ  = new Set();
    this._usedCSQ = new Set();
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
      if (w.level && w.tr && w.en && this._byLevel[w.level]) this._byLevel[w.level].push(w);
    }
  }

  // ── Welcome ───────────────────────────────────────────────────────────────
  _renderWelcome() {
    this._html(`
      <div class="pt-card">
        <div class="pt-emoji">🎯</div>
        <h2 class="pt-title">Seviyeni Belirleyelim</h2>
        <p class="pt-desc">
          Kelime, boşluk doldurma ve doğru cümle seçme — üç soru tipiyle tam seviyeni buluyoruz.<br>
          <strong>~3 dakika</strong> · En fazla 3 aşama
        </p>
        <div class="pt-how-row">
          <div class="pt-how-item"><span>📖</span><span>Kelime</span></div>
          <div class="pt-how-plus">+</div>
          <div class="pt-how-item"><span>📝</span><span>Gramer</span></div>
          <div class="pt-how-plus">+</div>
          <div class="pt-how-item"><span>✅</span><span>Doğru Cümle</span></div>
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
    this._curIdx       = 2;
    this._lastPassed   = -1;
    this._totalAsked   = 0;
    this._skipCount    = 0;
    this._stageHistory = [];
    this._usedGQ       = new Set();
    this._usedCSQ      = new Set();
    this._startStage();
  }

  // ── Aşama başlat ─────────────────────────────────────────────────────────
  _startStage() {
    const level = this._LEVELS[this._curIdx];

    // 3 kelime sorusu — cognate'ler (music/müzik gibi) hariç
    const vocabPool = [...(this._byLevel[level] || [])]
      .filter(w => !this._isCognate(w.en, w.tr))
      .sort(() => Math.random() - 0.5);
    const vocab = vocabPool.slice(0, 3).map(w => ({ type:'vocab', data:w }));

    // 1 boşluk doldurma sorusu
    const gqAll   = this._GQ[level] || [];
    const gqFresh = gqAll.filter((_, i) => !this._usedGQ.has(level + i));
    const gqPick  = ([...(gqFresh.length ? gqFresh : gqAll)].sort(() => Math.random() - 0.5))[0];
    if (gqPick) this._usedGQ.add(level + gqAll.indexOf(gqPick));
    const gq = gqPick ? [{ type:'grammar', data:gqPick }] : [];

    // 1 doğru cümle sorusu
    const csqAll   = this._CSQ[level] || [];
    const csqFresh = csqAll.filter((_, i) => !this._usedCSQ.has(level + i));
    const csqPick  = ([...(csqFresh.length ? csqFresh : csqAll)].sort(() => Math.random() - 0.5))[0];
    if (csqPick) this._usedCSQ.add(level + csqAll.indexOf(csqPick));
    const csq = csqPick ? [{ type:'correct-sentence', data:csqPick }] : [];

    // Eksik varsa diğer soru tipinden tamamla
    let questions = [...vocab, ...gq, ...csq];
    while (questions.length < this._PER_STAGE && gqAll.length) {
      const fill = gqAll.sort(() => Math.random() - 0.5)[0];
      questions.push({ type:'grammar', data:fill });
    }

    this._stageQuestions = questions.sort(() => Math.random() - 0.5).slice(0, this._PER_STAGE);
    this._stageResults   = [];
    this._stageCorrect   = 0;
    this._questionIdx    = 0;

    this._showLevelTransition(level, () => this._askQuestion());
  }

  // ── CEFR termometresi ─────────────────────────────────────────────────────
  _thermometer(activeLevel) {
    const spans = this._LEVELS.map(l => {
      const color  = this._COLORS[l];
      const hist   = this._stageHistory.find(s => s.level === l);
      const active = l === activeLevel;
      let cls = 'pt-th-lvl';
      let sty = '';
      if (active) { cls += ' pt-th-active'; sty = `color:${color};background:${color}1a;border-color:${color}55`; }
      else if (hist) { cls += hist.passed ? ' pt-th-done' : ' pt-th-fail'; sty = `color:${color}88`; }
      const dot = hist ? (hist.passed ? '✓' : '✗') : '';
      return `<span class="${cls}" style="${sty}">${l}${dot ? `<sup>${dot}</sup>` : ''}</span>`;
    });
    return `<div class="pt-thermometer">${spans.join('<span class="pt-th-sep"></span>')}</div>`;
  }

  _showLevelTransition(level, cb) {
    const color    = this._COLORS[level];
    const stageNum = this._stageHistory.length + 1;
    this._html(`
      <div class="pt-card pt-card-transition">
        ${this._thermometer(level)}
        <div class="pt-level-pill" style="color:${color};border-color:${color}40;background:${color}12">${level}</div>
        <p class="pt-transition-label">${this._LABELS[level]} seviye</p>
        <p class="pt-transition-sub">Aşama ${stageNum} · 5 soru · kelime + gramer + doğru cümle</p>
      </div>
    `);
    setTimeout(cb, 1050);
  }

  // ── Soru göster ──────────────────────────────────────────────────────────
  _askQuestion() {
    const item = this._stageQuestions[this._questionIdx];
    if (!item) { this._evaluateStage(); return; }
    if (item.type === 'vocab')            this._renderVocabQ(item.data);
    else if (item.type === 'grammar')     this._renderGrammarQ(item.data);
    else                                  this._renderCSQ(item.data);
  }

  _scoreDots(level) {
    const color = this._COLORS[level];
    return Array.from({ length: this._stageQuestions.length }, (_, i) => {
      const r = this._stageResults[i];
      if (r === undefined) return `<span class="pt-qdot pt-qdot-empty"></span>`;
      return `<span class="pt-qdot ${r ? 'pt-qdot-ok' : 'pt-qdot-fail'}" style="${r ? `background:${color}` : ''}"></span>`;
    }).join('');
  }

  _metaBar(level, typeLabel) {
    const color = this._COLORS[level];
    const pct   = this._progressPct();
    return `
      <div class="pt-progress-bar"><div class="pt-progress-fill" style="width:${pct}%;background:${color}"></div></div>
      <div class="pt-q-meta">
        <span class="pt-q-level" style="color:${color}">${level}</span>
        <div class="pt-qdot-row">${this._scoreDots(level)}</div>
        <span class="pt-q-type" style="color:${color};background:${color}18;border:1px solid ${color}33">${typeLabel}</span>
      </div>
    `;
  }

  _skipRow() {
    return `<div class="pt-skip-q-row"><button class="pt-skip-q-btn" id="pt-skip-q">Bilmiyorum →</button></div>`;
  }

  _renderVocabQ(word) {
    const level = this._LEVELS[this._curIdx];
    const color = this._COLORS[level];

    // Çeldirici seçeneklerde de cognate'leri hariç tut (benzer görünen Türkçe anlamlar ipucu olmasın)
    const pool      = (this._byLevel[level] || []).filter(w => w.en !== word.en && !this._isCognate(w.en, w.tr));
    let distractors = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    if (distractors.length < 3 && typeof WORDS !== 'undefined') {
      const used  = new Set([word.en, ...distractors.map(d => d.en)]);
      const extra = WORDS.filter(w => w.tr && w.en && !used.has(w.en) && !this._isCognate(w.en, w.tr))
                         .sort(() => Math.random() - 0.5).slice(0, 3 - distractors.length);
      distractors = [...distractors, ...extra];
    }
    const options = [...distractors.map(w => w.tr), word.tr].sort(() => Math.random() - 0.5);

    this._html(`
      <div class="pt-card">
        ${this._metaBar(level, '📖 Kelime')}
        <div class="pt-word-block">
          <div class="pt-word-en-row">
            <div class="pt-word-en">${word.en}</div>
            <button class="pt-speak-btn" id="pt-speak-btn" title="Dinle" aria-label="Sesli dinle">🔊</button>
          </div>
          ${word.ipa ? `<div class="pt-word-ipa">${word.ipa}</div>` : ''}
          <div class="pt-word-cat">${word.cat || ''} ${word.icon || ''}</div>
        </div>
        <p class="pt-q-label">Bu kelimenin Türkçe anlamı hangisi?</p>
        <div class="pt-options">
          ${options.map((opt, i) => `
            <button class="pt-opt" data-correct="${opt === word.tr ? '1' : '0'}">
              <span class="pt-opt-letter">${'ABCD'[i]}</span>
              <span class="pt-opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>
        ${this._skipRow()}
      </div>
    `);

    this._container.querySelectorAll('.pt-opt').forEach(btn =>
      btn.addEventListener('click', () => this._handleAnswer(btn, word.ex || ''))
    );
    this._on('pt-speak-btn', () => this._speak(word.en));
    this._on('pt-skip-q',    () => this._skipQuestion());
  }

  _renderGrammarQ(gq, isTiebreaker = false) {
    const level = this._LEVELS[this._curIdx];
    const color = this._COLORS[level];

    const shuffled = gq.c.map((text, i) => ({ text, correct: i === gq.a }))
                         .sort(() => Math.random() - 0.5);
    const qHtml = gq.q.replace('___', `<span class="pt-blank" style="border-color:${color}">___</span>`);

    const typeLabel = isTiebreaker
      ? `<span class="pt-q-type" style="color:#f59e0b;background:#f59e0b18;border:1px solid #f59e0b33">⚡ Belirleyici</span>`
      : this._metaBar(level, '📝 Gramer').match(/pt-q-type.*?<\/span>/)?.[0] || '';

    const fullMeta = isTiebreaker
      ? `<div class="pt-progress-bar"><div class="pt-progress-fill" style="width:97%;background:${color}"></div></div>
         <div class="pt-q-meta">
           <span class="pt-q-level" style="color:${color}">${level}</span>
           <span style="font-size:0.75rem;color:rgba(241,245,249,0.4)">Belirleyici soru</span>
           <span class="pt-q-type" style="color:#f59e0b;background:#f59e0b18;border:1px solid #f59e0b33">⚡ Belirleyici</span>
         </div>`
      : this._metaBar(level, '📝 Gramer');

    this._html(`
      <div class="pt-card">
        ${fullMeta}
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
        ${isTiebreaker ? '' : this._skipRow()}
      </div>
    `);

    this._container.querySelectorAll('.pt-opt').forEach(btn =>
      btn.addEventListener('click', () => {
        if (isTiebreaker) this._handleTiebreakerAnswer(btn, gq.hint);
        else              this._handleAnswer(btn, `💡 ${gq.hint}`);
      })
    );
    if (!isTiebreaker) this._on('pt-skip-q', () => this._skipQuestion());
  }

  _renderCSQ(csq) {
    const level = this._LEVELS[this._curIdx];

    // Seçenekleri karıştır, doğruyu takip et
    const shuffled = csq.c.map((text, i) => ({ text, correct: i === csq.a }))
                          .sort(() => Math.random() - 0.5);

    this._html(`
      <div class="pt-card">
        ${this._metaBar(level, '✅ Doğru Cümle')}
        <div class="pt-grammar-block">
          <p class="pt-grammar-q" style="font-size:1rem">${csq.q}</p>
        </div>
        <div class="pt-options pt-options-sentence">
          ${shuffled.map((opt, i) => `
            <button class="pt-opt pt-opt-sentence" data-correct="${opt.correct ? '1' : '0'}">
              <span class="pt-opt-letter">${'ABCD'[i]}</span>
              <span class="pt-opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
        ${this._skipRow()}
      </div>
    `);

    this._container.querySelectorAll('.pt-opt').forEach(btn =>
      btn.addEventListener('click', () => this._handleAnswer(btn, `💡 ${csq.hint}`))
    );
    this._on('pt-skip-q', () => this._skipQuestion());
  }

  // ── Cevap işle ───────────────────────────────────────────────────────────
  _handleAnswer(btn, feedback) {
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
    setTimeout(() => { this._totalAsked++; this._advanceBinarySearch(isCorrect); }, 1300);
  }

  _skipQuestion() {
    this._skipCount++;
    this._stageResults.push(false);
    this._questionIdx++;
    this._updateDots();
    setTimeout(() => this._askQuestion(), 300);
  }

  _lockOptions(btn, isCorrect) {
    this._container.querySelectorAll('.pt-opt').forEach(b => {
      b.disabled = true;
      if (b.dataset.correct === '1')    b.classList.add('pt-opt-correct');
      else if (b === btn && !isCorrect) b.classList.add('pt-opt-wrong');
    });
    const skipBtn = document.getElementById('pt-skip-q');
    if (skipBtn) skipBtn.disabled = true;
  }

  _updateDots() {
    const dotRow = this._container.querySelector('.pt-qdot-row');
    if (dotRow) dotRow.innerHTML = this._scoreDots(this._LEVELS[this._curIdx]);
  }

  // ── Aşama değerlendirme ──────────────────────────────────────────────────
  _evaluateStage() {
    this._totalAsked += this._stageQuestions.length;
    if (this._stageCorrect === this._PASS_THRESHOLD) {
      this._showStageSummary(null, () => this._startTiebreaker());
    } else {
      const passed = this._stageCorrect > this._PASS_THRESHOLD;
      this._showStageSummary(passed, () => this._advanceBinarySearch(passed));
    }
  }

  _startTiebreaker() {
    const level  = this._LEVELS[this._curIdx];
    const gqAll  = this._GQ[level] || [];
    const fresh  = gqAll.filter((_, i) => !this._usedGQ.has(level + i));
    const pool   = (fresh.length ? fresh : gqAll).sort(() => Math.random() - 0.5);
    if (!pool[0]) { this._advanceBinarySearch(true); return; }
    const tq = pool[0];
    this._usedGQ.add(level + gqAll.indexOf(tq));
    this._renderGrammarQ(tq, true);
  }

  // ── Aşama özet ───────────────────────────────────────────────────────────
  _showStageSummary(passed, cb) {
    const level = this._LEVELS[this._curIdx];
    const color = this._COLORS[level];
    const total = this._stageQuestions.length;

    if (passed !== null) {
      this._stageHistory.push({ level, correct: this._stageCorrect, total, passed });
    }

    let nextHint = '';
    if (passed === null) {
      nextHint = '⚡ Tam eşit — belirleyici soru geliyor';
    } else if (passed) {
      const nxt = Math.floor((this._curIdx + 1 + this._hi) / 2);
      nextHint = this._lo + 1 <= this._hi ? `↑ ${this._LEVELS[nxt]} seviyesi deneniyor` : '🏆 Zirveye ulaştın!';
    } else {
      const nxt = Math.floor((this._lo + this._curIdx - 1) / 2);
      nextHint = this._lo <= this._curIdx - 1 ? `↓ ${this._LEVELS[nxt]} seviyesine geçiliyor` : '✓ Seviye belirlendi';
    }

    const dotHtml = this._stageResults.map(r =>
      `<span class="pt-sum-dot ${r ? 'pt-sum-dot-ok' : 'pt-sum-dot-fail'}" style="${r ? `background:${color}` : ''}"></span>`
    ).join('');

    const vCls  = passed === null ? 'pt-verdict-tie' : (passed ? 'pt-verdict-pass' : 'pt-verdict-fail');
    const vText = passed === null
      ? `${this._stageCorrect}/${total} — Tam eşik`
      : passed ? `${this._stageCorrect}/${total} ✓ Geçildi` : `${this._stageCorrect}/${total} ✗ Yetersiz`;

    this._html(`
      <div class="pt-card pt-card-summary">
        ${this._thermometer(level)}
        <div class="pt-sum-level" style="color:${color}">${level} <span style="opacity:0.5;font-size:0.72em">${this._LABELS[level]}</span></div>
        <div class="pt-sum-dots">${dotHtml}</div>
        <div class="pt-sum-verdict ${vCls}">${vText}</div>
        <div class="pt-sum-next">${nextHint}</div>
      </div>
    `);
    setTimeout(cb, passed === null ? 1200 : 1700);
  }

  // ── Binary search ─────────────────────────────────────────────────────────
  _advanceBinarySearch(passed) {
    if (passed) {
      this._lastPassed = this._curIdx;
      this._lo = this._curIdx + 1;
    } else {
      this._hi = this._curIdx - 1;
    }
    if (this._lo > this._hi) {
      this._finish(this._lastPassed === -1 ? 'A1' : this._LEVELS[this._lastPassed]);
    } else {
      this._curIdx = Math.floor((this._lo + this._hi) / 2);
      this._startStage();
    }
  }

  _progressPct() {
    return Math.min(Math.round((this._totalAsked + this._questionIdx) / 15 * 100), 95);
  }

  // ── Sonuç ─────────────────────────────────────────────────────────────────
  _finish(level, skipped = false) {
    const color = this._COLORS[level];

    let historyHtml = '';
    if (!skipped && this._stageHistory.length > 0) {
      const rows = this._stageHistory.map(s => {
        const c    = this._COLORS[s.level];
        const dots = Array.from({ length: s.total }, (_, i) =>
          `<span class="pt-hist-dot" style="${i < s.correct ? `background:${c}` : 'background:rgba(255,255,255,0.1)'}"></span>`
        ).join('');
        return `
          <div class="pt-hist-row">
            <span class="pt-hist-lvl" style="color:${c}">${s.level}</span>
            <span class="pt-hist-dots">${dots}</span>
            <span class="pt-hist-score ${s.passed ? 'pt-hist-pass' : 'pt-hist-fail'}">${s.correct}/${s.total}</span>
          </div>`;
      }).join('');

      const skipNote = this._skipCount > 0
        ? `<div style="font-size:0.72rem;color:rgba(241,245,249,0.3);margin-top:6px">${this._skipCount} soru atlandı</div>`
        : '';
      historyHtml = `
        <div class="pt-history-box">
          <div class="pt-history-title">Test Özeti</div>
          ${rows}
          ${skipNote}
        </div>`;
    }

    this._html(`
      <div class="pt-card pt-card-result">
        <div class="pt-result-emoji">${skipped ? '📚' : '🎉'}</div>
        <h2 class="pt-title">${skipped ? 'Tamam!' : 'Seviyeni Bulduk!'}</h2>
        <div class="pt-result-badge" style="color:${color};border-color:${color}40;background:${color}12">
          ${level} — ${this._LABELS[level]}
        </div>
        <p class="pt-result-desc">${this._DESCS[level]}</p>
        ${historyHtml}
        <p class="pt-result-note">İstediğin zaman Ayarlar'dan seviyeni değiştirebilirsin.</p>
        <button class="pt-btn pt-btn-primary" id="pt-confirm" style="background:${color}">Uygulamayı Aç →</button>
        ${skipped ? '' : '<button class="pt-btn pt-btn-retry" id="pt-retry">Testi Tekrar Yap</button>'}
      </div>
    `);

    this._on('pt-confirm', () => { if (this._onComplete) this._onComplete(level); });
    this._on('pt-retry',   () => this._beginTest());
  }

  // ── Cognate filtresi ─────────────────────────────────────────────────────
  // İngilizce kelime ile Türkçe anlamı görsel olarak çok benziyorsa
  // (music/müzik, taxi/taksi gibi) kelimeyi testten çıkar — ipucu olmasın.
  _isCognate(en, tr) {
    const norm = s => s.toLowerCase()
      .replace(/ü/g,'u').replace(/ö/g,'o').replace(/ı/g,'i').replace(/î/g,'i')
      .replace(/ş/g,'s').replace(/ç/g,'c').replace(/ğ/g,'g').replace(/â/g,'a')
      .replace(/[^a-z]/g,'');
    const a = norm(en);
    const b = norm(tr.split(/[,;/()]/)[0].trim()); // sadece ilk anlamı al
    if (!a || !b || a.length < 3 || b.length < 2) return false;
    // Biri diğerini içeriyorsa
    if (a.includes(b) || b.includes(a)) return true;
    // Ortak önek 4+ karakter
    let pfx = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) pfx++; else break;
    }
    if (pfx >= 4) return true;
    // Levenshtein benzerliği > %60 (örn. music/muzik: 2/5=0.40, taxi/taksi: 2/5=0.40)
    return this._ldist(a, b) / Math.max(a.length, b.length) <= 0.4;
  }

  _ldist(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) =>
      Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
    );
    for (let i = 1; i <= m; i++)
      for (let j = 1; j <= n; j++)
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  // ── Yardımcılar ──────────────────────────────────────────────────────────
  _speak(text) {
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang  = 'en-US';
        u.rate  = 0.85;
        window.speechSynthesis.speak(u);
      }
    } catch (_) {}
  }

  _html(inner) { this._container.innerHTML = `<div class="pt-overlay">${inner}</div>`; }

  _on(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }

  _esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  }
}
