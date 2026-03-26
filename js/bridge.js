/**
 * ENGLISH RHAPSODY — KÖPRÜ (BRIDGE) MODULE
 * Smart Discovery Update — Auto-Discovery by Level & Analytics
 */
class BridgeModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    try { this.collection = JSON.parse(localStorage.getItem('bridge_collection') || '[]'); } catch { this.collection = []; }
    try { this.bridgeCount = parseInt(localStorage.getItem('bridge_count') || '0'); } catch { this.bridgeCount = 0; }
    try { this.streakData = JSON.parse(localStorage.getItem('bridge_streak') || '{"count":0,"lastDate":""}'); } catch { this.streakData = {count:0,lastDate:''}; }
    this.currentData = null;
    this.activeCategory = null;

    this.BRIDGE_META = {
      direct:    { label: 'Doğrudan',  color: '#94a3b8', desc: 'Birebir eşleşme' },
      transform: { label: 'Dönüşüm',   color: '#a78bfa', desc: 'Kültürel değişim' },
      multiply:  { label: 'Çoğalma',   color: '#34d399', desc: 'Çoklu anlam' },
      disappear: { label: 'Kayboluş',  color: '#f87171', desc: 'Kayıp anlam' },
      emerge:    { label: 'Türeme',    color: '#22d3ee', desc: 'Yeni anlam' }
    };

    this.EXAMPLES = ["Canım sıkıldı", "Kafam çok karışık", "İşler çok yoğun gidiyor", "Üstümden büyük bir yük kalktı"];
  }

  init(el) {
    this.el = el;
    this._render();
    this._initOrientation();
  }

  _initOrientation() {
    try {
      if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
    } catch(e) {}

    const enterFs = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const fsEl = document.documentElement;
        const req = fsEl.requestFullscreen || fsEl.webkitRequestFullscreen;
        if (req) req.call(fsEl).catch(() => {});
      }
    };
    enterFs();
    this._orientHandler = () => enterFs();
    window.addEventListener('resize', this._orientHandler, { passive: true });
    if (window.attachQuickMenuTrigger) window.attachQuickMenuTrigger(this.el);
  }

  destroy() {
    if (this._orientHandler) {
      window.removeEventListener('resize', this._orientHandler);
      this._orientHandler = null;
    }
    try {
      if (screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(() => {});
    } catch(e) {}
    if (this.el) this.el.innerHTML = '';
  }

  _render() {
    const legendHtml = Object.entries(this.BRIDGE_META).map(([k, m]) => `
      <div class="bridge-legend-item" title="${m.desc}">
        <div class="bridge-legend-dot" style="background:${m.color}"></div>
        <span>${m.label}</span>
      </div>
    `).join('');

    const categoriesHtml = (window.BRIDGE_CATEGORIES || []).map(cat => `
      <button class="bridge-cat-chip ${this.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');

    const examplesHtml = this.EXAMPLES.map(ex => `<button class="bridge-example-pill" data-ex="${ex}">${ex}</button>`).join('');

    this.el.innerHTML = `
      <div class="bridge-wrap">
        <div class="bridge-header">
          <div class="bridge-logo-area">
            <div class="bridge-logo-circle">K</div>
            <div class="bridge-title-block">
              <h1 style="margin:0; font-size:1.4rem;">KÖPRÜ</h1>
              <p style="margin:0; font-size:0.7rem; color:var(--text-3); text-transform:uppercase;">Akıllı Keşif Modu</p>
            </div>
          </div>
          <div class="bridge-stat-group">
            <div class="bridge-stat-item" id="b-stat-count">✨ ${this.bridgeCount}</div>
            <div class="bridge-stat-item" id="b-stat-streak">🔥 ${this.streakData.count}</div>
            <button class="bridge-trigger-btn" style="width:40px; height:40px; font-size:1.2rem;" id="b-quiz-btn">🎯</button>
          </div>
        </div>

        <div class="bridge-legend">${legendHtml}</div>

        <div class="bridge-workspace">
          <div class="bridge-panel">
            <div style="font-size:0.7rem; font-weight:800; color:var(--br-tr); margin-bottom:10px;">GİRİŞ VEYA KEŞİF</div>
            <textarea class="bridge-textarea" id="b-text" placeholder="Bir ifade yaz veya oka bas!"></textarea>
            <div class="bridge-examples">${examplesHtml}</div>
          </div>
          <div class="bridge-trigger-col" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
            <button class="bridge-trigger-btn" id="b-trigger" title="Yeni İfade Keşfet">➔</button>
            <span style="font-size:0.6rem; color:var(--text-3); font-weight:700;">KEŞFET</span>
          </div>
          <div class="bridge-panel">
            <div style="font-size:0.7rem; font-weight:800; color:var(--cyan); margin-bottom:10px;">İNGİLİZCE KÖPRÜ</div>
            <div id="b-placeholder" style="color:var(--text-3); font-size:0.9rem; margin-top:20px; text-align:center;">
              Analiz için butona basın.
            </div>
            <div id="b-result" style="display:none"></div>
          </div>
        </div>

        <div class="bridge-cat-filter-bar">
          <button class="bridge-cat-chip ${!this.activeCategory ? 'active' : ''}" data-cat="">Hepsi</button>
          ${categoriesHtml}
        </div>

        <div id="b-cards-area"></div>
        <div id="b-insight-area"></div>
        
        <div id="b-actions-area" style="display:none; gap:12px; margin-top:20px;">
          <button class="bridge-cat-chip active" style="flex:1; background:var(--cyan); color:#000;" id="b-save-btn">Koleksiyona Ekle</button>
          <button class="bridge-cat-chip active" style="flex:1; background:var(--violet);" id="b-shadow-btn">Gölgeleme Yap</button>
        </div>

        <div class="bridge-collection-section">
          <h3 style="font-size:1rem; margin-bottom:15px; border-left:4px solid var(--violet); padding-left:10px;">KOLEKSİYONUM</h3>
          <div class="bridge-collection-grid" id="b-coll-grid"></div>
        </div>
      </div>
    `;

    this._bindEvents();
    this._renderCollection();
  }

  _bindEvents() {
    const bTrigger = this.el.querySelector('#b-trigger');
    const bText = this.el.querySelector('#b-text');
    
    // Discovery: ALWAYS pick a new random phrase on click
    bTrigger.addEventListener('click', () => {
      this._smartDiscovery();
    });

    // Manual Analysis: Only via Enter key or by selecting examples
    bText.addEventListener('keydown', (e) => { 
      if((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const manualVal = bText.value.trim();
        if (manualVal) this._analyze(manualVal);
      }
    });

    this.el.querySelectorAll('.bridge-example-pill').forEach(p => {
      p.addEventListener('click', () => { bText.value = p.dataset.ex; this._analyze(p.dataset.ex); });
    });

    this.el.querySelectorAll('.bridge-cat-chip').forEach(c => {
      c.addEventListener('click', () => {
        this.activeCategory = c.dataset.cat || null;
        this.el.querySelectorAll('.bridge-cat-chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
      });
    });

    this.el.querySelector('#b-quiz-btn').addEventListener('click', () => this._showQuiz());
    this.el.querySelector('#b-save-btn').addEventListener('click', () => this._saveToColl());
    this.el.querySelector('#b-shadow-btn').addEventListener('click', () => this._startShadowing());
  }

  /**
   * Kullanıcı seviyesine göre akıllı ifade seçimi
   */
  _smartDiscovery() {
    if (!window.BRIDGE_DATA) return;
    
    // Kullanıcının CEFR seviyesini al, sayısal seviyeye dönüştür
    const cefrLevel = window._app?.state?.get('cefrLevel') || 'B1';
    const _cefrMap = { A1: 1, A2: 5, B1: 12, B2: 18, C1: 25, C2: 30 };
    const level = _cefrMap[cefrLevel] || 12;
    let pool = window.BRIDGE_DATA;

    // Kategori seçiliyse filtrele
    if (this.activeCategory) pool = pool.filter(x => x.category === this.activeCategory);

    // CEFR seviyesine göre zorluk filtreleme
    // A1/A2 (1-9): Basit-nötr ifadeler
    // B1/B2 (10-22): Orta, dönüşümlü
    // C1/C2 (23+): Tüm kayıtlar
    if (level < 10) {
      const filtered = pool.filter(x => x.register === 'neutral' || x.bridges.some(b => b.bridge_type === 'direct'));
      if (filtered.length >= 5) pool = filtered;
    } else if (level < 22) {
      const filtered = pool.filter(x => x.register === 'informal' || x.bridges.some(b => b.bridge_type === 'transform'));
      if (filtered.length >= 5) pool = filtered;
    }

    // Havuz boşsa hepsini kullan
    if (!pool.length) pool = window.BRIDGE_DATA;

    const randomEntry = pool[Math.floor(Math.random() * pool.length)];
    this.el.querySelector('#b-text').value = randomEntry.tr;
    
    // Analytics Log
    if (window.analyticsManager) {
      window.analyticsManager._log('discovery_bridge', {
        tr: randomEntry.tr,
        level: level,
        category: randomEntry.category
      });
    }

    this._analyze(randomEntry.tr);
  }

  _analyze(query) {
    if (!query || typeof findBridgeMatch !== 'function') return;
    const match = findBridgeMatch(query);
    if (match) {
      this.currentData = { originalTR: query, ...match.entry };
      this._renderResult();
      this.bridgeCount++;
      try { localStorage.setItem('bridge_count', this.bridgeCount); } catch { /**/ }
      this.el.querySelector('#b-stat-count').textContent = `✨ ${this.bridgeCount}`;
      this._updateStreak();
    } else {
      UI.toast("Bu ifade henüz veritabanında yok.");
    }
  }

  _renderResult() {
    const data = this.currentData;
    const res = this.el.querySelector('#b-result');
    const ph = this.el.querySelector('#b-placeholder');
    const acts = this.el.querySelector('#b-actions-area');
    
    ph.style.display = 'none';
    res.style.display = 'block';
    acts.style.display = 'flex';

    res.innerHTML = `
      <div class="bridge-result-card-inner">
        <div class="bridge-primary-en">"${data.english_primary}"</div>
        <div style="display:flex; justify-content:center; gap:10px; margin-bottom:15px;">
          <span class="bridge-cat-chip" style="font-size:0.6rem; padding:4px 10px;">${data.register || 'neutral'}</span>
          <button class="bridge-example-pill" id="b-speak-main">🔊 Dinle</button>
        </div>
      </div>
    `;

    res.querySelector('#b-speak-main').addEventListener('click', () => this._speak(data.english_primary));

    this._renderCards(data.bridges || []);
    this._renderInsight(data.cultural_insight, data.fluency_tip);
  }

  _renderCards(bridges) {
    const area = this.el.querySelector('#b-cards-area');
    area.innerHTML = bridges.map(b => `
      <div class="bridge-card-row">
        <div style="text-align:right;">
          <div style="font-weight:800; font-size:1rem;">${b.tr_fragment}</div>
          <div style="font-size:0.7rem; color:var(--text-3);">${b.tr_gloss || ''}</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div class="bridge-legend-dot" style="background:${this.BRIDGE_META[b.bridge_type]?.color || '#fff'}"></div>
          <div style="font-size:0.6rem; margin-top:4px;">${this.BRIDGE_META[b.bridge_type]?.label || ''}</div>
        </div>
        <div style="text-align:left;">
          <div style="font-weight:800; font-size:1rem; color:var(--cyan);">${b.en_fragment}</div>
          <div style="font-size:0.7rem; color:var(--text-3);">${b.explanation || ''}</div>
        </div>
      </div>
    `).join('');
  }

  _renderInsight(insight, tip) {
    const area = this.el.querySelector('#b-insight-area');
    if (!insight && !tip) { area.innerHTML = ''; return; }
    area.innerHTML = `
      <div class="bridge-coach-insight">
        <div class="bridge-coach-avatar">🧠</div>
        <div style="flex:1;">
          <div class="coach-name">KÖPRÜ KOÇU</div>
          <div style="font-size:0.95rem; margin:8px 0; line-height:1.5;">${insight || ''}</div>
          ${tip ? `<div style="background:rgba(245,158,11,0.1); border-left:3px solid var(--amber); padding:8px 12px; border-radius:4px; font-size:0.85rem; color:var(--amber);"><strong>PRO-TIP:</strong> ${tip}</div>` : ''}
        </div>
      </div>
    `;
  }

  _renderCollection() {
    const grid = this.el.querySelector('#b-coll-grid');
    if (!this.collection.length) { grid.innerHTML = '<p style="color:var(--text-3); font-size:0.8rem;">Henüz bir köprü kaydetmedin.</p>'; return; }
    grid.innerHTML = this.collection.slice(0, 8).map(item => `
      <div class="bridge-cat-chip" style="text-align:left; padding:12px; height:auto; display:block; margin-bottom:8px; border-color:rgba(255,255,255,0.05);" data-tr="${item.originalTR}">
        <div style="font-size:0.85rem; font-weight:700;">${item.originalTR}</div>
        <div style="font-size:0.75rem; color:var(--cyan); margin-top:4px;">${item.english_primary}</div>
      </div>
    `).join('');
    grid.querySelectorAll('.bridge-cat-chip').forEach(c => {
      c.addEventListener('click', () => { this.el.querySelector('#b-text').value = c.dataset.tr; this._analyze(c.dataset.tr); });
    });
  }

  _saveToColl() {
    if (!this.currentData || this.collection.some(x => x.originalTR === this.currentData.originalTR)) return;
    this.collection.unshift(this.currentData);
    try { localStorage.setItem('bridge_collection', JSON.stringify(this.collection)); } catch { /**/ }
    UI.toast("Koleksiyona eklendi!");
    this._renderCollection();
  }

  _speak(txt) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }

  _updateStreak() {
    const t = new Date().toDateString();
    const y = new Date(Date.now() - 864e5).toDateString();
    if (this.streakData.lastDate === t) return;
    this.streakData.count = (this.streakData.lastDate === y) ? this.streakData.count + 1 : 1;
    this.streakData.lastDate = t;
    try { localStorage.setItem('bridge_streak', JSON.stringify(this.streakData)); } catch { /**/ }
    this.el.querySelector('#b-stat-streak').textContent = `🔥 ${this.streakData.count}`;
  }

  _startShadowing() {
    if (!this.currentData) return;
    const txt = this.currentData.english_primary;
    const ov = document.createElement('div');
    ov.style = 'position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;';
    ov.innerHTML = `<div class="bridge-panel" style="max-width:400px; text-align:center; padding:40px;">
      <h3>Gölgeleme</h3>
      <p style="font-size:1.5rem; font-weight:900; color:var(--cyan);">"${txt}"</p>
      <div id="sh-stat" style="margin:20px 0;">Başlıyor...</div>
      <button class="bridge-cat-chip active" id="sh-close">Kapat</button>
    </div>`;
    document.body.appendChild(ov);
    ov.querySelector('#sh-close').onclick = () => { window.speechSynthesis.cancel(); ov.remove(); };
    let c = 0;
    const tick = () => {
      if (c >= 3 || !ov.isConnected) return;
      c++; ov.querySelector('#sh-stat').textContent = `Tekrar ${c}/3 - Dinle ve Söyle`;
      this._speak(txt);
      setTimeout(tick, 4000);
    };
    tick();
  }

  _showQuiz() {
    if (!window.BRIDGE_DATA) return;
    const qs = [...window.BRIDGE_DATA].sort(() => 0.5 - Math.random()).slice(0, 5);
    let i = 0, sc = 0;
    const ov = document.createElement('div');
    ov.style = 'position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;';
    document.body.appendChild(ov);
    const render = () => {
      if (i >= qs.length) {
        ov.innerHTML = `<div class="bridge-panel" style="text-align:center; padding:40px;"><h2>Bitti!</h2><p style="font-size:2rem;">${sc}/${qs.length}</p><button class="bridge-cat-chip active" id="bq-close-btn">Kapat</button></div>`;
        ov.querySelector('#bq-close-btn').addEventListener('click', () => ov.remove());
        if (this.app?.addXP) this.app.addXP(sc * 20, "medium", "bridge");
        return;
      }
      const q = qs[i];
      const ops = [q.english_primary, ...window.BRIDGE_DATA.filter(x => x.id !== q.id).sort(() => 0.5 - Math.random()).slice(0, 2).map(x => x.english_primary)].sort();
      ov.innerHTML = `<div class="bridge-panel" style="max-width:500px; width:100%;">
        <div style="margin-bottom:20px;">Soru ${i+1}/5</div>
        <h3 style="margin-bottom:20px;">"${q.tr}" karşılığı nedir?</h3>
        ${ops.map(o => `<button class="bridge-cat-chip active" style="display:block; width:100%; margin-bottom:10px; background:var(--bg-elevated);" data-o="${o}">${o}</button>`).join('')}
      </div>`;
      ov.querySelectorAll('button[data-o]').forEach(b => {
        b.onclick = () => {
          if (b.dataset.o === q.english_primary) { sc++; b.style.background = 'var(--green)'; }
          else { b.style.background = 'var(--rose)'; }
          setTimeout(() => { i++; render(); }, 800);
        };
      });
    };
    render();
  }
}

window.BridgeModule = BridgeModule;
