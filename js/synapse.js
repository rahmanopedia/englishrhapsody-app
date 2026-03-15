/* ═══════════════════════════════════════════════════════════════════
   SYNAPSE MODE  —  Bioluminescent Neural English Experience
   v1.0 | English Rhapsody
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

// ── Background Vocabulary (floating neural network) ──────────────────────────
const SYN_VOCAB = [
  { w:'run',       tr:'koşmak',          c:'#00d4ff' },
  { w:'write',     tr:'yazmak',          c:'#00d4ff' },
  { w:'think',     tr:'düşünmek',        c:'#00d4ff' },
  { w:'make',      tr:'yapmak',          c:'#00d4ff' },
  { w:'find',      tr:'bulmak',          c:'#00d4ff' },
  { w:'love',      tr:'sevmek',          c:'#00d4ff' },
  { w:'learn',     tr:'öğrenmek',        c:'#00d4ff' },
  { w:'speak',     tr:'konuşmak',        c:'#00d4ff' },
  { w:'listen',    tr:'dinlemek',        c:'#00d4ff' },
  { w:'dream',     tr:'hayal etmek',     c:'#00d4ff' },
  { w:'grow',      tr:'büyümek',         c:'#00d4ff' },
  { w:'believe',   tr:'inanmak',         c:'#00d4ff' },
  { w:'mind',      tr:'zihin',           c:'#3b82f6' },
  { w:'world',     tr:'dünya',           c:'#3b82f6' },
  { w:'life',      tr:'hayat',           c:'#3b82f6' },
  { w:'heart',     tr:'kalp',            c:'#3b82f6' },
  { w:'story',     tr:'hikaye',          c:'#3b82f6' },
  { w:'friend',    tr:'arkadaş',         c:'#3b82f6' },
  { w:'home',      tr:'ev',              c:'#3b82f6' },
  { w:'family',    tr:'aile',            c:'#3b82f6' },
  { w:'child',     tr:'çocuk',           c:'#3b82f6' },
  { w:'teacher',   tr:'öğretmen',        c:'#3b82f6' },
  { w:'knowledge', tr:'bilgi',           c:'#3b82f6' },
  { w:'language',  tr:'dil',             c:'#3b82f6' },
  { w:'good',      tr:'iyi',             c:'#a78bfa' },
  { w:'true',      tr:'gerçek',          c:'#a78bfa' },
  { w:'bright',    tr:'parlak',          c:'#a78bfa' },
  { w:'strong',    tr:'güçlü',           c:'#a78bfa' },
  { w:'happy',     tr:'mutlu',           c:'#a78bfa' },
  { w:'clear',     tr:'açık',            c:'#a78bfa' },
  { w:'free',      tr:'özgür',           c:'#a78bfa' },
  { w:'new',       tr:'yeni',            c:'#a78bfa' },
  { w:'beautiful', tr:'güzel',           c:'#a78bfa' },
  { w:'ready',     tr:'hazır',           c:'#a78bfa' },
  { w:'endless',   tr:'sonsuz',          c:'#a78bfa' },
  { w:'wise',      tr:'bilge',           c:'#a78bfa' },
  { w:'sun',       tr:'güneş',           c:'#34d399' },
  { w:'star',      tr:'yıldız',          c:'#34d399' },
  { w:'light',     tr:'ışık',            c:'#34d399' },
  { w:'water',     tr:'su',              c:'#34d399' },
  { w:'sky',       tr:'gökyüzü',         c:'#34d399' },
  { w:'tree',      tr:'ağaç',            c:'#34d399' },
  { w:'moon',      tr:'ay',              c:'#34d399' },
  { w:'earth',     tr:'toprak',          c:'#34d399' },
  { w:'fire',      tr:'ateş',            c:'#34d399' },
  { w:'sea',       tr:'deniz',           c:'#34d399' },
  { w:'forest',    tr:'orman',           c:'#34d399' },
  { w:'river',     tr:'nehir',           c:'#34d399' },
  { w:'hope',      tr:'umut',            c:'#f472b6' },
  { w:'peace',     tr:'barış',           c:'#f472b6' },
  { w:'joy',       tr:'sevinç',          c:'#f472b6' },
  { w:'brave',     tr:'cesur',           c:'#f472b6' },
  { w:'kind',      tr:'nazik',           c:'#f472b6' },
  { w:'calm',      tr:'sakin',           c:'#f472b6' },
  { w:'pure',      tr:'saf',             c:'#f472b6' },
  { w:'deep',      tr:'derin',           c:'#f472b6' },
  { w:'warm',      tr:'sıcak',           c:'#f472b6' },
  { w:'soul',      tr:'ruh',             c:'#f472b6' },
  { w:'wonder',    tr:'merak',           c:'#f472b6' },
  { w:'grace',     tr:'zarafet',         c:'#f472b6' },
  { w:'now',       tr:'şimdi',           c:'#fbbf24' },
  { w:'always',    tr:'her zaman',       c:'#fbbf24' },
  { w:'never',     tr:'asla',            c:'#fbbf24' },
  { w:'soon',      tr:'yakında',         c:'#fbbf24' },
  { w:'today',     tr:'bugün',           c:'#fbbf24' },
  { w:'every',     tr:'her',             c:'#fbbf24' },
  { w:'still',     tr:'hâlâ',            c:'#fbbf24' },
  { w:'first',     tr:'ilk',             c:'#fbbf24' },
  { w:'long',      tr:'uzun',            c:'#fbbf24' },
  { w:'next',      tr:'sonraki',         c:'#fbbf24' },
];

// ── IGNITE: Fill-in-the-blank sentences ─────────────────────────────────────
const IGNITE_DATA = [
  { s:'She ___ beautiful stories every day.',       a:'writes',   tr:'O her gün güzel hikayeler yazar.',             d:['reads','draws','finds','tells'] },
  { s:'He ___ to music in the morning.',            a:'listens',  tr:'O sabah müzik dinler.',                        d:['speaks','runs','learns','talks'] },
  { s:'The sun ___ brightly every morning.',        a:'shines',   tr:'Güneş her sabah parlak parlar.',               d:['rises','burns','falls','glows'] },
  { s:'She ___ English very well.',                 a:'speaks',   tr:'O İngilizce\'yi çok iyi konuşur.',             d:['reads','writes','learns','teaches'] },
  { s:'They ___ hard to reach their goals.',        a:'work',     tr:'Hedeflerine ulaşmak için çok çalışırlar.',     d:['run','try','live','fight'] },
  { s:'He ___ a new book about science.',           a:'reads',    tr:'O bilim hakkında yeni bir kitap okur.',        d:['writes','finds','makes','buys'] },
  { s:'The child ___ in the garden happily.',       a:'plays',    tr:'Çocuk bahçede mutlu bir şekilde oynar.',       d:['runs','sits','works','sleeps'] },
  { s:'We ___ new things when we travel.',          a:'learn',    tr:'Seyahat ettiğimizde yeni şeyler öğreniriz.',   d:['see','find','make','share'] },
  { s:'He ___ of a better and free world.',         a:'dreams',   tr:'O daha iyi ve özgür bir dünya hayal eder.',    d:['thinks','speaks','hears','learns'] },
  { s:'The stars ___ bright on a clear night.',     a:'shine',    tr:'Açık bir gecede yıldızlar parlak parlar.',     d:['fall','glow','appear','float'] },
  { s:'She ___ joy in every small thing.',          a:'finds',    tr:'O her küçük şeyde sevinç bulur.',              d:['makes','sees','keeps','wants'] },
  { s:'Good friends ___ you through hard times.',   a:'help',     tr:'İyi arkadaşlar zor zamanlarda sana yardım eder.', d:['guide','lead','keep','find'] },
  { s:'She ___ strong after every challenge.',      a:'grows',    tr:'O her zorluğun ardından güçlenir.',            d:['becomes','feels','stands','walks'] },
  { s:'He ___ peace in the quiet forest.',          a:'finds',    tr:'O sessiz ormanda huzur bulur.',                d:['sees','makes','keeps','wants'] },
  { s:'The river ___ freely to the deep sea.',      a:'flows',    tr:'Nehir derin denize özgürce akar.',             d:['runs','moves','falls','goes'] },
  { s:'Life is ___ when you live with hope.',       a:'beautiful',tr:'Umutla yaşadığında hayat güzeldir.',           d:['good','easy','clear','bright'] },
  { s:'She ___ every morning to stay healthy.',     a:'runs',     tr:'O sağlıklı kalmak için her sabah koşar.',      d:['walks','wakes','works','reads'] },
  { s:'He ___ in the power of education.',          a:'believes', tr:'O eğitimin gücüne inanır.',                    d:['thinks','works','learns','lives'] },
  { s:'The moon ___ softly over the calm sea.',     a:'shines',   tr:'Ay sakin denizin üzerinde nazikçe parlar.',    d:['rises','glows','falls','floats'] },
  { s:'We ___ together to build a better world.',   a:'work',     tr:'Daha iyi bir dünya inşa etmek için çalışırız.',d:['fight','live','learn','care'] },
  { s:'Knowledge ___ you to see the world clearly.',a:'helps',    tr:'Bilgi, dünyayı açıkça görmen için sana yardım eder.', d:['makes','teaches','gives','needs'] },
  { s:'She ___ the language of her homeland.',      a:'speaks',   tr:'O yurdunun dilini konuşur.',                   d:['learns','knows','reads','writes'] },
  { s:'The child ___ at the bright stars above.',   a:'gazes',    tr:'Çocuk yukarıdaki parlak yıldızlara bakar.',    d:['looks','stares','points','smiles'] },
  { s:'True wisdom ___ from living deeply.',        a:'comes',    tr:'Gerçek bilgelik derinlemesine yaşamaktan gelir.',d:['grows','flows','starts','rises'] },
  { s:'She ___ her family above everything.',       a:'loves',    tr:'O her şeyin üstünde ailesini sever.',          d:['helps','keeps','misses','needs'] },
  { s:'The light ___ through the dark forest.',     a:'shines',   tr:'Işık karanlık ormandan süzülür.',              d:['passes','falls','flows','moves'] },
  { s:'Good words ___ healing to the human soul.',  a:'bring',    tr:'İyi sözler insan ruhuna şifa getirir.',        d:['give','send','show','carry'] },
  { s:'He ___ every moment as a new beginning.',    a:'sees',     tr:'O her anı yeni bir başlangıç olarak görür.',   d:['treats','finds','makes','keeps'] },
  { s:'The warm sun ___ joy to the cold earth.',    a:'brings',   tr:'Sıcak güneş soğuk toprağa sevinç getirir.',   d:['gives','sends','carries','shows'] },
  { s:'We ___ hope alive through every storm.',     a:'keep',     tr:'Her fırtına boyunca umudu canlı tutarız.',     d:['make','hold','find','live'] },
  { s:'True friends ___ you even in the dark.',     a:'find',     tr:'Gerçek arkadaşlar seni karanlıkta bile bulur.',d:['help','see','know','love'] },
  { s:'She always ___ to help those in need.',      a:'tries',    tr:'O her zaman ihtiyacı olanlara yardım etmeye çalışır.', d:['wants','plans','hopes','loves'] },
  { s:'The old tree ___ stories of a long life.',   a:'carries',  tr:'Yaşlı ağaç uzun bir hayatın hikayelerini taşır.', d:['holds','tells','keeps','shows'] },
  { s:'He ___ kindness wherever he goes.',          a:'spreads',  tr:'O gittiği her yerde nezaket yayar.',           d:['brings','gives','shows','finds'] },
  { s:'She ___ every night under the open sky.',    a:'sleeps',   tr:'O her gece açık gökyüzünün altında uyur.',    d:['dreams','rests','walks','sits'] },
  { s:'The child ___ the flower with great care.',  a:'holds',    tr:'Çocuk çiçeği büyük bir özenle tutar.',        d:['touches','picks','gives','finds'] },
  { s:'He ___ music to forget his sorrows.',        a:'plays',    tr:'O üzüntülerini unutmak için müzik çalar.',     d:['makes','writes','loves','hears'] },
  { s:'She ___ every word that her teacher says.',  a:'remembers',tr:'O öğretmeninin söylediği her kelimeyi hatırlar.', d:['hears','knows','learns','repeats'] },
  { s:'The wind ___ softly through the tall trees.',a:'blows',    tr:'Rüzgar uzun ağaçların arasından nazikçe eser.',d:['moves','flows','passes','sings'] },
  { s:'He ___ his eyes and sees nothing but hope.', a:'closes',   tr:'O gözlerini kapar ve umuttan başka hiçbir şey görmez.', d:['opens','shuts','hides','turns'] },
];

// ── PULSE: Turkish → English multiple choice ─────────────────────────────────
const PULSE_DATA = [
  { tr:'O her gün kitap okur.',                   correct:'She reads a book every day.',         opts:['He writes a book every day.','She reads a book every day.','They find a good story.','She learns every morning.'] },
  { tr:'Çocuklar bahçede oynar.',                 correct:'Children play in the garden.',        opts:['Children play in the garden.','The child runs every day.','Friends find joy in the park.','Children work in the garden.'] },
  { tr:'O güzel bir dünya hayal eder.',           correct:'She dreams of a beautiful world.',    opts:['She speaks of a beautiful world.','He makes a better world.','She dreams of a beautiful world.','They build a free world.'] },
  { tr:'Yıldızlar gece parlak parlar.',           correct:'Stars shine bright at night.',        opts:['Stars shine bright at night.','The moon glows at night.','Stars fall in the dark sky.','Light shines at night.'] },
  { tr:'O her sabah hızlı koşar.',               correct:'She runs fast every morning.',        opts:['She walks fast every morning.','He runs slow at night.','She runs fast every morning.','They work every morning.'] },
  { tr:'Biz birlikte öğreniriz.',                 correct:'We learn together.',                  opts:['We learn together.','We teach together.','They work together.','We speak together.'] },
  { tr:'O bilgiye inanır.',                       correct:'He believes in knowledge.',           opts:['He believes in knowledge.','She trusts her friend.','He learns about life.','She finds true knowledge.'] },
  { tr:'Güneş her sabah doğar.',                 correct:'The sun rises every morning.',        opts:['The sun shines every morning.','The moon rises every night.','The sun rises every morning.','Stars shine every day.'] },
  { tr:'O sakin ormanda huzur bulur.',            correct:'She finds peace in the calm forest.', opts:['She finds peace in the calm forest.','He sees joy in the forest.','She makes a home in the forest.','They live in a calm place.'] },
  { tr:'Iyi insanlar daima yardım eder.',        correct:'Good people always help.',            opts:['Good people always help.','Kind friends never leave.','Strong people always work.','Good teachers always learn.'] },
  { tr:'O her zaman gerçeği söyler.',            correct:'She always tells the truth.',         opts:['She always finds the truth.','He never hides the truth.','She always tells the truth.','They always know the truth.'] },
  { tr:'Zor zamanlarda güçlü olmalıyız.',        correct:'We must be strong in hard times.',    opts:['We must be brave in hard times.','We must be strong in hard times.','They must work in hard times.','We should learn in hard times.'] },
];

// ── WEAVE: Vocabulary meaning quiz ──────────────────────────────────────────
const WEAVE_DATA = [
  { w:'serendipity',  correct:'Güzel bir tesadüf',      opts:['Güzel bir tesadüf','Derin bir sessizlik','Yavaş bir yolculuk','Güçlü bir inanç'] },
  { w:'resilience',   correct:'Dayanıklılık, toparlanma gücü', opts:['Dayanıklılık, toparlanma gücü','Hoşgörü, sabır','Merak, araştırma','Liderlik, yönetim'] },
  { w:'eloquence',    correct:'Güzel ve etkili konuşma', opts:['Güzel ve etkili konuşma','Derin düşünce','Uzun sessizlik','Hızlı hareket'] },
  { w:'perseverance', correct:'Azim, ısrar',             opts:['Azim, ısrar','Vicdan, dürüstlük','Cömertlik, iyilik','Hız, çeviklik'] },
  { w:'empathy',      correct:'Empati, başkasını anlama',opts:['Empati, başkasını anlama','Özgüven, cesaret','Merak, sorgulama','Sabır, tahammül'] },
  { w:'nostalgia',    correct:'Geçmişe özlem duyma',     opts:['Geçmişe özlem duyma','Geleceğe umutla bakma','Anı paylaşma isteği','Uzak yerlere gitme isteği'] },
  { w:'luminous',     correct:'Işıltılı, parlayan',      opts:['Işıltılı, parlayan','Derin, kapsamlı','Sessiz, sakin','Yumuşak, nazik'] },
  { w:'tenacious',    correct:'İnatçı, azimli',          opts:['İnatçı, azimli','Kırılgan, hassas','Açık fikirli','Meraklı, araştırmacı'] },
  { w:'wanderlust',   correct:'Seyahat etme arzusu',     opts:['Seyahat etme arzusu','Yalnız kalma isteği','Müzik yapma tutkusu','Kitap okuma alışkanlığı'] },
  { w:'ephemeral',    correct:'Geçici, kısa ömürlü',     opts:['Geçici, kısa ömürlü','Kalıcı, dayanıklı','Güçlü, etkili','Sessiz, dingin'] },
  { w:'benevolent',   correct:'Hayırsever, iyilik seven', opts:['Hayırsever, iyilik seven','Güçlü, kararlı','Titiz, dikkatli','Özgür, bağımsız'] },
  { w:'melancholy',   correct:'Hüzün, derin keder',      opts:['Hüzün, derin keder','Sevinç, coşku','Merak, şaşkınlık','Sakinlik, dinginlik'] },
  { w:'ethereal',     correct:'Dünyevi olmayan, ruhani', opts:['Dünyevi olmayan, ruhani','Pratik, somut','Hızlı, çevik','Güçlü, sağlam'] },
  { w:'prolific',     correct:'Üretken, verimli',        opts:['Üretken, verimli','Dikkatli, özenli','Cesur, korkusuz','Sessiz, çekingen'] },
  { w:'tranquil',     correct:'Sakin, huzurlu',          opts:['Sakin, huzurlu','Gürültülü, hareketli','Derin, karmaşık','Hızlı, dinamik'] },
];

// ── Particle ─────────────────────────────────────────────────────────────────
class SynParticle {
  constructor(x, y, color) {
    this.x  = x;
    this.y  = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6 - 1;
    this.life  = 1;
    this.decay = 0.018 + Math.random() * 0.025;
    this.size  = 1.5 + Math.random() * 3.5;
    this.color = color;
  }
  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.vy += 0.06;
    this.vx *= 0.98;
    this.life -= this.decay;
  }
}

// ── Background Neuron ────────────────────────────────────────────────────────
class BgNeuron {
  constructor(vocab, W, H) {
    this.word  = vocab.w;
    this.tr    = vocab.tr;
    this.color = vocab.c;
    this.x     = 60 + Math.random() * (W - 120);
    this.y     = 60 + Math.random() * (H - 120);
    this.vx    = (Math.random() - 0.5) * 0.25;
    this.vy    = (Math.random() - 0.5) * 0.25;
    this.r     = 18 + Math.random() * 8;
    this.phase = Math.random() * Math.PI * 2;
    this.hoverBright = 0;
  }
  update(ts, W, H) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < this.r || this.x > W - this.r) { this.vx *= -1; this.x = Math.max(this.r, Math.min(W - this.r, this.x)); }
    if (this.y < this.r || this.y > H - this.r) { this.vy *= -1; this.y = Math.max(this.r, Math.min(H - this.r, this.y)); }
    this.pulse = (Math.sin(ts * 0.0008 + this.phase) + 1) / 2;
    this.hoverBright *= 0.92;
  }
}

// ── Candidate Neuron (game neurons) ─────────────────────────────────────────
class CandidateNeuron {
  constructor(word, isCorrect, W, H) {
    this.word      = word;
    this.isCorrect = isCorrect;
    this.state     = 'idle';   // idle | hover | correct | wrong
    this.x  = 80 + Math.random() * (W - 160);
    this.y  = 80 + Math.random() * (H * 0.55);
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = 34;
    this.phase   = Math.random() * Math.PI * 2;
    this.flashT  = 0;
  }
  update(ts, W, H) {
    if (this.state !== 'idle' && this.state !== 'hover') return;
    this.x += this.vx;
    this.y += this.vy;
    const pad = this.r + 10;
    if (this.x < pad || this.x > W - pad) { this.vx *= -1; this.x = Math.max(pad, Math.min(W - pad, this.x)); }
    if (this.y < pad || this.y > H * 0.62) { this.vy *= -1; this.y = Math.max(pad, Math.min(H * 0.62, this.y)); }
    this.pulse = (Math.sin(ts * 0.0012 + this.phase) + 1) / 2;
    if (this.flashT > 0) this.flashT -= 0.05;
  }
}

// ── SynapseMode ──────────────────────────────────────────────────────────────
class SynapseMode {
  constructor(app) {
    this.app       = app;
    this.root      = null;
    this.canvas    = null;
    this.ctx       = null;
    this.W         = 0;
    this.H         = 0;
    this._raf      = null;
    this._resizeFn = null;

    this.bgNeurons   = [];
    this.candidates  = [];
    this.particles   = [];
    this.signals     = [];

    this.mode    = null;
    this.score   = 0;
    this.streak  = 0;
    this.energy  = 100;
    this.qIndex  = 0;
    this.qData   = [];

    this._hoverNeuron   = null;
    this._mouseX = 0;
    this._mouseY = 0;

    // PULSE state
    this._pulseTimer    = null;
    this._pulseAnswered = false;
    this._pulseAnimate  = null;
  }

  // ── Init ──────────────────────────────────────────────────────
  init(root) {
    this.root = root;

    // Build DOM
    root.innerHTML = `
      <canvas class="syn-canvas" id="syn-cv"></canvas>

      <!-- Mode Select -->
      <div class="syn-mode-select" id="syn-ms">
        <div class="syn-logo">
          <div class="syn-logo-icon">⚡</div>
          <h1 class="syn-logo-title">SYNAPSE</h1>
          <p class="syn-logo-sub">Think in English. Light up your brain.</p>
        </div>
        <div class="syn-mode-cards">
          <div class="syn-mode-card" data-mode="ignite">
            <span class="syn-mode-emoji">⚡</span>
            <div class="syn-mode-name">IGNITE</div>
            <div class="syn-mode-desc">Boşluğu doğru kelimeyle doldur</div>
            <span class="syn-mode-tag">Kelime Seçimi</span>
          </div>
          <div class="syn-mode-card" data-mode="pulse">
            <span class="syn-mode-emoji">💡</span>
            <div class="syn-mode-name">PULSE</div>
            <div class="syn-mode-desc">Türkçeyi İngilizceye çevir</div>
            <span class="syn-mode-tag">Çeviri</span>
          </div>
          <div class="syn-mode-card" data-mode="weave">
            <span class="syn-mode-emoji">🕸️</span>
            <div class="syn-mode-name">WEAVE</div>
            <div class="syn-mode-desc">Nadir kelimelerin anlamını bul</div>
            <span class="syn-mode-tag">Kelime Dağarcığı</span>
          </div>
        </div>
      </div>

      <!-- HUD -->
      <div class="syn-hud" id="syn-hud" style="display:none">
        <div class="syn-score-box">
          <span class="syn-score-icon">⚡</span>
          <span class="syn-score-val" id="syn-sv">0</span>
        </div>
        <span class="syn-mode-label" id="syn-ml"></span>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="syn-streak-badge" id="syn-sb" style="display:none">🔥 <span id="syn-streak">0</span></span>
          <button class="syn-exit-btn" id="syn-xb">✕</button>
        </div>
      </div>

      <!-- Energy bar -->
      <div class="syn-energy-wrap" id="syn-ew" style="display:none">
        <div class="syn-energy-fill" id="syn-ef"></div>
      </div>

      <!-- Game Panel -->
      <div class="syn-game-panel" id="syn-gp" style="display:none">
        <div class="syn-progress-dots" id="syn-dots"></div>
        <div class="syn-prompt-tr" id="syn-pt"></div>
        <div class="syn-sentence-display" id="syn-sd"></div>
        <div id="syn-opts"></div>
      </div>

      <!-- Neuron tooltip -->
      <div class="syn-neuron-tooltip" id="syn-tip"></div>

      <!-- Result -->
      <div class="syn-result" id="syn-res" style="display:none">
        <div class="syn-result-box">
          <div class="syn-result-icon" id="syn-ri">🧠</div>
          <div class="syn-result-title" id="syn-rt">Harika!</div>
          <div class="syn-result-score" id="syn-rs">0</div>
          <div class="syn-result-sub" id="syn-rsu"></div>
          <div class="syn-result-actions">
            <button class="syn-result-btn primary" id="syn-rplay">Tekrar Oyna ⚡</button>
            <button class="syn-result-btn secondary" id="syn-rmenu">Mod Seç</button>
          </div>
        </div>
      </div>
    `;

    this.canvas = root.querySelector('#syn-cv');
    this.ctx    = this.canvas.getContext('2d');

    // Resize
    this._resizeFn = () => this._resize();
    window.addEventListener('resize', this._resizeFn);
    this._resize();

    // Build background
    this._buildBg();

    // Events
    this.canvas.addEventListener('click',     e => this._onCanvasClick(e));
    this.canvas.addEventListener('mousemove', e => this._onMouseMove(e));
    this.canvas.addEventListener('touchstart',e => { e.preventDefault(); const t = e.touches[0]; this._onCanvasClick(t); }, { passive: false });

    root.querySelector('#syn-ms').addEventListener('click', e => {
      const card = e.target.closest('[data-mode]');
      if (card) this._startMode(card.dataset.mode);
    });

    root.querySelector('#syn-xb').addEventListener('click', () => this._showModeSelect());
    root.querySelector('#syn-rplay').addEventListener('click', () => this._startMode(this.mode));
    root.querySelector('#syn-rmenu').addEventListener('click', () => this._showModeSelect());

    // Start loop
    this._startLoop();
  }

  destroy() {
    this._stopLoop();
    clearTimeout(this._pulseTimer);
    cancelAnimationFrame(this._pulseAnimate);
    if (this._resizeFn) window.removeEventListener('resize', this._resizeFn);
  }

  // ── Resize ────────────────────────────────────────────────────
  _resize() {
    const dpr = window.devicePixelRatio || 1;
    const W   = this.canvas.offsetWidth;
    const H   = this.canvas.offsetHeight;
    this.canvas.width  = W * dpr;
    this.canvas.height = H * dpr;
    this.ctx.scale(dpr, dpr);
    this.W = W;
    this.H = H;

    // Re-scatter background neurons on resize
    this.bgNeurons.forEach(n => {
      n.x = Math.min(n.x, W - n.r - 10);
      n.y = Math.min(n.y, H - n.r - 10);
    });
  }

  // ── Background build ──────────────────────────────────────────
  _buildBg() {
    this.bgNeurons = SYN_VOCAB.map(v => new BgNeuron(v, this.W || 400, this.H || 600));
  }

  // ── Animation Loop ────────────────────────────────────────────
  _startLoop() {
    const loop = ts => {
      this._raf = requestAnimationFrame(loop);
      this._update(ts);
      this._draw(ts);
    };
    this._raf = requestAnimationFrame(loop);
  }

  _stopLoop() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
  }

  _update(ts) {
    const W = this.W, H = this.H;
    this.bgNeurons.forEach(n => n.update(ts, W, H));
    this.candidates.forEach(n => n.update(ts, W, H));
    this.particles  = this.particles.filter(p => { p.update(); return p.life > 0; });
    this.signals    = this.signals.filter(s => { s.p += 0.035; return s.p < 1; });

    // Mouse hover highlight for bg neurons
    this.bgNeurons.forEach(n => {
      const dx = n.x - this._mouseX, dy = n.y - this._mouseY;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < n.r + 40) n.hoverBright = Math.min(n.hoverBright + 0.1, 1);
    });

    // Hover for candidates
    this._hoverNeuron = null;
    this.candidates.forEach(n => {
      if (n.state !== 'idle') return;
      const dx = n.x - this._mouseX, dy = n.y - this._mouseY;
      if (Math.sqrt(dx * dx + dy * dy) < n.r + 8) {
        n.state = 'hover';
        this._hoverNeuron = n;
      } else if (n.state === 'hover') {
        n.state = 'idle';
      }
    });
  }

  // ── Draw ──────────────────────────────────────────────────────
  _draw(ts) {
    const ctx = this.ctx, W = this.W, H = this.H;
    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.8);
    bg.addColorStop(0, '#0a0a1a');
    bg.addColorStop(1, '#050510');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Ambient orbs
    this._drawAmbientOrbs(ctx, ts, W, H);

    // Connections
    this._drawConnections(ctx, ts);

    // Signal pulses on connections
    this._drawSignals(ctx);

    // Background neurons
    const bgAlpha = this.mode ? 0.12 : 0.7;
    this.bgNeurons.forEach(n => this._drawNeuron(ctx, n, bgAlpha, ts));

    // Candidate neurons (game)
    this.candidates.forEach(n => this._drawCandidate(ctx, n, ts));

    // Particles
    this._drawParticles(ctx);
  }

  _drawAmbientOrbs(ctx, ts, W, H) {
    const orbs = [
      { x: W * 0.15, y: H * 0.2,  r: 120, c: 'rgba(0,100,200,0.04)'  },
      { x: W * 0.85, y: H * 0.35, r: 150, c: 'rgba(100,0,200,0.04)'  },
      { x: W * 0.5,  y: H * 0.75, r: 100, c: 'rgba(200,0,100,0.03)'  },
      { x: W * 0.3,  y: H * 0.6,  r: 80,  c: 'rgba(0,200,150,0.03)'  },
    ];
    orbs.forEach(o => {
      const shift = Math.sin(ts * 0.0003 + o.r) * 0.02;
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * (1 + shift));
      g.addColorStop(0, o.c);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });
  }

  _drawConnections(ctx, ts) {
    const neurons = this.bgNeurons;
    const alpha   = this.mode ? 0.06 : 0.25;
    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const a = neurons[i], b = neurons[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d > 160) continue;
        const fade = 1 - d / 160;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(100,180,255,${alpha * fade})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }
    }

    // Also connect candidate neurons to each other
    if (this.candidates.length > 1) {
      for (let i = 0; i < this.candidates.length; i++) {
        for (let j = i + 1; j < this.candidates.length; j++) {
          const a = this.candidates[i], b = this.candidates[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d > 260) continue;
          const fade = 1 - d / 260;
          const clr = a.isCorrect || b.isCorrect ? 'rgba(0,212,255,' : 'rgba(167,139,250,';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = clr + (0.2 * fade) + ')';
          ctx.lineWidth   = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  _drawSignals(ctx) {
    this.signals.forEach(s => {
      const x = s.x1 + (s.x2 - s.x1) * s.p;
      const y = s.y1 + (s.y2 - s.y1) * s.p;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
      g.addColorStop(0, s.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  _drawNeuron(ctx, n, alpha, ts) {
    const pulse = (Math.sin(ts * 0.0008 + n.phase) + 1) / 2;
    const r     = n.r + pulse * 3;
    const gAlpha = (alpha + n.hoverBright * 0.4) * (0.6 + pulse * 0.4);

    ctx.save();
    ctx.globalAlpha = gAlpha;

    // Glow
    ctx.shadowBlur  = 12 + pulse * 10 + n.hoverBright * 20;
    ctx.shadowColor = n.color;

    // Circle
    const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
    grad.addColorStop(0, n.color + 'cc');
    grad.addColorStop(0.5, n.color + '44');
    grad.addColorStop(1, n.color + '00');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fill();

    // Core dot
    ctx.shadowBlur  = 4;
    ctx.fillStyle   = n.color;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 3.5 + pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur  = 0;
    ctx.restore();

    // Label (only if not in game mode or hover)
    if (!this.mode || n.hoverBright > 0.5) {
      ctx.save();
      ctx.globalAlpha = this.mode ? n.hoverBright * 0.8 : alpha * 1.5;
      ctx.fillStyle   = '#fff';
      ctx.font        = `600 ${Math.min(10, n.r * 0.55)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.word, n.x, n.y + r + 10);
      ctx.restore();
    }
  }

  _drawCandidate(ctx, n, ts) {
    if (n.state === 'correct' || n.state === 'wrong') {
      // handled separately with fade
    }
    const pulse = n.pulse !== undefined ? n.pulse : 0.5;
    const r     = n.r + pulse * 5;

    let color, glowColor, textColor;
    switch (n.state) {
      case 'correct': color = '#34d399'; glowColor = 'rgba(52,211,153,0.4)'; textColor = '#34d399'; break;
      case 'wrong':   color = '#f87171'; glowColor = 'rgba(248,113,113,0.3)'; textColor = '#f87171'; break;
      case 'hover':   color = '#00d4ff'; glowColor = 'rgba(0,212,255,0.35)'; textColor = '#fff'; break;
      default:        color = '#a78bfa'; glowColor = 'rgba(167,139,250,0.25)'; textColor = '#e2e8f0'; break;
    }

    ctx.save();

    // Outer glow ring
    ctx.shadowBlur  = (n.state === 'hover' || n.state === 'correct') ? 30 : 16;
    ctx.shadowColor = color;

    const g = ctx.createRadialGradient(n.x, n.y, r * 0.2, n.x, n.y, r + 12);
    g.addColorStop(0, color + '33');
    g.addColorStop(0.6, glowColor);
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(n.x, n.y, r + 14, 0, Math.PI * 2);
    ctx.fill();

    // Main circle
    ctx.shadowBlur  = 20;
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle   = `rgba(10,10,30,0.85)`;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth   = n.state === 'hover' ? 2.5 : 1.5;
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Word label
    ctx.fillStyle    = textColor;
    ctx.font         = `700 ${n.word.length > 8 ? 11 : 13}px 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n.word, n.x, n.y);

    ctx.restore();
  }

  _drawParticles(ctx) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.shadowBlur  = 6;
      ctx.shadowColor = p.color;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ── Helpers ───────────────────────────────────────────────────
  _burst(x, y, color, count = 20) {
    for (let i = 0; i < count; i++) this.particles.push(new SynParticle(x, y, color));
  }

  _signal(x1, y1, x2, y2, color) {
    this.signals.push({ x1, y1, x2, y2, p: 0, color });
  }

  _fireSignalsFrom(nx, ny) {
    this.bgNeurons.forEach(b => {
      const d = Math.hypot(b.x - nx, b.y - ny);
      if (d < 200) this._signal(nx, ny, b.x, b.y, '#00d4ff88');
    });
  }

  // ── Mode Select ───────────────────────────────────────────────
  _showModeSelect() {
    this.mode       = null;
    this.candidates = [];
    clearTimeout(this._pulseTimer);
    this._el('syn-ms').style.display = 'flex';
    this._el('syn-hud').style.display = 'none';
    this._el('syn-ew').style.display  = 'none';
    this._el('syn-gp').style.display  = 'none';
    this._el('syn-res').style.display = 'none';
  }

  _startMode(mode) {
    this.mode   = mode;
    this.score  = 0;
    this.streak = 0;
    this.energy = 100;
    this.qIndex = 0;

    // Shuffle data
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    if      (mode === 'ignite') this.qData = shuffle(IGNITE_DATA);
    else if (mode === 'pulse')  this.qData = shuffle(PULSE_DATA);
    else if (mode === 'weave')  this.qData = shuffle(WEAVE_DATA);

    this._el('syn-ms').style.display  = 'none';
    this._el('syn-hud').style.display = 'flex';
    this._el('syn-ew').style.display  = 'block';
    this._el('syn-gp').style.display  = 'block';
    this._el('syn-res').style.display = 'none';

    const labels = { ignite:'⚡ IGNITE', pulse:'💡 PULSE', weave:'🕸️ WEAVE' };
    this._el('syn-ml').textContent  = labels[mode];
    this._el('syn-ml').className    = `syn-mode-label ${mode}`;

    this._updateHUD();
    this._nextQuestion();
  }

  // ── Question Flow ─────────────────────────────────────────────
  _nextQuestion() {
    if (this.qIndex >= Math.min(this.qData.length, 15)) {
      this._showResult(); return;
    }
    const q = this.qData[this.qIndex];

    // Progress dots
    const total = Math.min(this.qData.length, 15);
    this._el('syn-dots').innerHTML = Array.from({ length: total }, (_, i) =>
      `<div class="syn-dot ${i < this.qIndex ? 'done' : i === this.qIndex ? 'active' : ''}"></div>`
    ).join('');

    if      (this.mode === 'ignite') this._setupIgnite(q);
    else if (this.mode === 'pulse')  this._setupPulse(q);
    else if (this.mode === 'weave')  this._setupWeave(q);
  }

  // ── IGNITE ────────────────────────────────────────────────────
  _setupIgnite(q) {
    this._el('syn-pt').textContent = q.tr;

    // Sentence with blank
    const html = q.s.replace('___', '<span class="syn-blank"></span>');
    this._el('syn-sd').innerHTML = html;

    // Create candidate neurons (1 correct + 4 distractors, shuffled)
    const words = [q.a, ...q.d].sort(() => Math.random() - 0.5);
    this.candidates = words.map(w => new CandidateNeuron(w, w === q.a, this.W, this.H));

    // Clear opts panel
    this._el('syn-opts').innerHTML = '';
  }

  _onCanvasClick(e) {
    if (this.mode !== 'ignite') return;
    const rect = this.canvas.getBoundingClientRect();
    const x = (e.clientX || e.pageX) - rect.left;
    const y = (e.clientY || e.pageY) - rect.top;

    for (const n of this.candidates) {
      if (n.state !== 'idle' && n.state !== 'hover') continue;
      const dx = n.x - x, dy = n.y - y;
      if (Math.sqrt(dx * dx + dy * dy) < n.r + 8) {
        this._handleIgniteClick(n); return;
      }
    }
  }

  _handleIgniteClick(n) {
    if (n.isCorrect) {
      n.state = 'correct';
      this._burst(n.x, n.y, '#34d399', 28);
      this._fireSignalsFrom(n.x, n.y);
      this.app.audio.play('correct');
      this._addScore(100 + this.streak * 20);
      this.streak++;
      this._updateHUD();

      // Fill blank
      const sent = this._el('syn-sd');
      const blank = sent.querySelector('.syn-blank');
      if (blank) {
        const span = document.createElement('span');
        span.className = 'syn-filled-word correct';
        span.textContent = n.word;
        blank.replaceWith(span);
      }

      if (this.streak >= 3) this._showCombo();

      setTimeout(() => {
        this.candidates = [];
        this.qIndex++;
        this._nextQuestion();
      }, 900);

    } else {
      n.state   = 'wrong';
      n.flashT  = 1;
      this._burst(n.x, n.y, '#f87171', 12);
      this.app.audio.play('wrong');
      this.streak = 0;
      this.energy = Math.max(0, this.energy - 15);
      this._updateHUD();

      if (this.energy <= 0) {
        setTimeout(() => this._showResult(), 600);
        return;
      }

      setTimeout(() => { n.state = 'idle'; }, 600);
    }
  }

  // ── PULSE ─────────────────────────────────────────────────────
  _setupPulse(q) {
    this.candidates     = [];
    this._pulseAnswered = false;

    this._el('syn-pt').textContent = '📖 Bu cümleyi İngilizce seç:';
    this._el('syn-sd').textContent = q.tr;

    // Animate neurons
    this._pulseFire(q.tr);

    // Show options after brief pause
    clearTimeout(this._pulseTimer);
    this._pulseTimer = setTimeout(() => {
      const shuffled = [...q.opts].sort(() => Math.random() - 0.5);
      this._el('syn-opts').innerHTML = `
        <div class="syn-options grid-2">
          ${shuffled.map(o => `<button class="syn-option-btn" data-ans="${o}">${o}</button>`).join('')}
        </div>`;

      this._el('syn-opts').querySelectorAll('.syn-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (this._pulseAnswered) return;
          this._pulseAnswered = true;
          const isCorrect = btn.dataset.ans === q.correct;
          btn.classList.add(isCorrect ? 'correct' : 'wrong');

          // Reveal correct
          this._el('syn-opts').querySelectorAll('.syn-option-btn').forEach(b => {
            if (b.dataset.ans === q.correct) b.classList.add('correct');
            b.disabled = true;
          });

          if (isCorrect) {
            this._burst(this.W / 2, this.H * 0.4, '#a78bfa', 25);
            this.app.audio.play('correct');
            this._addScore(80 + this.streak * 15);
            this.streak++;
          } else {
            this.app.audio.play('wrong');
            this.streak = 0;
            this.energy = Math.max(0, this.energy - 12);
          }
          this._updateHUD();

          setTimeout(() => {
            this.qIndex++;
            this._nextQuestion();
          }, 1100);
        });
      });
    }, 700);
  }

  _pulseFire(text) {
    // Create a few random "firing" signals across the network
    const count = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const a = this.bgNeurons[Math.floor(Math.random() * this.bgNeurons.length)];
      const b = this.bgNeurons[Math.floor(Math.random() * this.bgNeurons.length)];
      if (a !== b) {
        setTimeout(() => {
          this._signal(a.x, a.y, b.x, b.y, '#a78bfa88');
          this._burst(a.x, a.y, '#a78bfa', 5);
        }, i * 80);
      }
    }
  }

  // ── WEAVE ─────────────────────────────────────────────────────
  _setupWeave(q) {
    this.candidates = [];
    this._el('syn-pt').textContent = '';
    this._el('syn-sd').innerHTML   = `
      <div class="syn-weave-word">
        <div class="syn-weave-en">${q.w}</div>
        <div class="syn-weave-prompt">Bu kelimenin anlamı nedir?</div>
      </div>`;

    // Fire from a central point to simulate "new neuron detected"
    const cx = this.W / 2, cy = this.H * 0.35;
    setTimeout(() => {
      this._burst(cx, cy, '#f472b6', 15);
      this._fireSignalsFrom(cx, cy);
    }, 200);

    const shuffled = [...q.opts].sort(() => Math.random() - 0.5);
    this._el('syn-opts').innerHTML = `
      <div class="syn-options grid-2">
        ${shuffled.map(o => `<button class="syn-option-btn" data-ans="${o}">${o}</button>`).join('')}
      </div>`;

    this._el('syn-opts').querySelectorAll('.syn-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.ans === q.correct;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        this._el('syn-opts').querySelectorAll('.syn-option-btn').forEach(b => {
          if (b.dataset.ans === q.correct) b.classList.add('correct');
          b.disabled = true;
        });

        if (isCorrect) {
          this._burst(cx, cy, '#f472b6', 30);
          this.bgNeurons.forEach(b => {
            const d = Math.hypot(b.x - cx, b.y - cy);
            if (d < 300) this._signal(cx, cy, b.x, b.y, '#f472b688');
          });
          this.app.audio.play('correct');
          this._addScore(120 + this.streak * 20);
          this.streak++;
        } else {
          this.app.audio.play('wrong');
          this.streak = 0;
          this.energy = Math.max(0, this.energy - 10);
        }
        this._updateHUD();

        setTimeout(() => {
          this.qIndex++;
          this._nextQuestion();
        }, 1200);
      });
    });
  }

  // ── HUD Update ────────────────────────────────────────────────
  _updateHUD() {
    this._el('syn-sv').textContent = this.score.toLocaleString();

    const ef = this._el('syn-ef');
    ef.style.width = this.energy + '%';
    ef.classList.toggle('low', this.energy < 30);

    const sb = this._el('syn-sb');
    if (this.streak >= 2) {
      sb.style.display = 'flex';
      this._el('syn-streak').textContent = this.streak;
    } else {
      sb.style.display = 'none';
    }
  }

  _addScore(pts) {
    this.score += pts;
    // XP to app
    if (this.app && this.app.addXP) this.app.addXP(Math.floor(pts / 10));
  }

  _showCombo() {
    const div = document.createElement('div');
    div.className   = 'syn-combo-flash';
    div.textContent = `🔥 ${this.streak}x COMBO!`;
    this.root.appendChild(div);
    setTimeout(() => div.remove(), 900);
  }

  // ── Result ────────────────────────────────────────────────────
  _showResult() {
    this.candidates = [];
    const total     = Math.min(this.qData.length, 15);
    const pct       = Math.round((this.qIndex / total) * 100);

    let icon  = '🧠', title = 'Harika iş!';
    if (pct >= 90)      { icon = '⚡'; title = 'Efsane Beyin!'; }
    else if (pct >= 70) { icon = '🌟'; title = 'Mükemmel!'; }
    else if (pct >= 50) { icon = '💡'; title = 'İyi gidiyor!'; }
    else                { icon = '🔄'; title = 'Tekrar dene!'; }

    this._el('syn-ri').textContent  = icon;
    this._el('syn-rt').textContent  = title;
    this._el('syn-rs').textContent  = this.score.toLocaleString();
    this._el('syn-rsu').textContent = `${this.qIndex}/${total} soru · Seri: ${this.streak}`;
    this._el('syn-res').style.display = 'flex';
    this._el('syn-gp').style.display  = 'none';

    // Celebration burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this._burst(
          this.W * (0.2 + Math.random() * 0.6),
          this.H * (0.3 + Math.random() * 0.4),
          ['#00d4ff','#a78bfa','#f472b6','#34d399','#fbbf24'][i],
          18
        );
      }, i * 150);
    }

    // Track with app analytics
    if (this.app && this.app.session) {
      this.app.session.wordsLearned = (this.app.session.wordsLearned || 0) + this.qIndex;
    }
  }

  // ── Mouse ─────────────────────────────────────────────────────
  _onMouseMove(e) {
    const rect   = this.canvas.getBoundingClientRect();
    this._mouseX = e.clientX - rect.left;
    this._mouseY = e.clientY - rect.top;

    // Tooltip for bg neurons (when not in game)
    if (!this.mode) {
      let hovered = null;
      for (const n of this.bgNeurons) {
        const d = Math.hypot(n.x - this._mouseX, n.y - this._mouseY);
        if (d < n.r + 6) { hovered = n; break; }
      }
      const tip = this._el('syn-tip');
      if (hovered) {
        tip.textContent = `${hovered.word} — ${hovered.tr}`;
        tip.style.left  = this._mouseX + 'px';
        tip.style.top   = (this._mouseY - 4) + 'px';
        tip.classList.add('visible');
      } else {
        tip.classList.remove('visible');
      }
    }
  }

  // ── Utility ───────────────────────────────────────────────────
  _el(id) { return document.getElementById(id); }
}

window.SynapseMode = SynapseMode;
