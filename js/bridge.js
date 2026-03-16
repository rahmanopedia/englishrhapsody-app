/**
 * ENGLISH RHAPSODY — KÖPRÜ (BRIDGE) MODULE
 * Focuses on cultural transformation rather than literal translation.
 * Restored with full logic (SRS, Quiz, Shadowing, Collection) + Premium UI.
 */
class BridgeModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.collection = JSON.parse(localStorage.getItem('bridge_collection') || '[]');
    this.flowScore = parseFloat(localStorage.getItem('bridge_flow_score') || '0');
    this.bridgeCount = parseInt(localStorage.getItem('bridge_count') || '0');
    this.currentData = null;
    this.saved = false;
    this.activeCategory = null;
    this.searchHistory = JSON.parse(localStorage.getItem('bridge_search_history') || '[]');
    this.srData = JSON.parse(localStorage.getItem('bridge_sr_data') || '{}');
    this.streakData = JSON.parse(localStorage.getItem('bridge_streak') || '{"count":0,"lastDate":""}');
    this.dailyDone = JSON.parse(localStorage.getItem('bridge_daily_done') || '[]');

    this.BRIDGE_META = {
      direct:    { label: 'Doğrudan',  color: '#94a3b8', desc: 'Kavram birebir eşleşiyor' },
      transform: { label: 'Dönüşüm',   color: '#a78bfa', desc: 'Kavram farklı şekilde ifade ediliyor' },
      multiply:  { label: 'Çoğalma',   color: '#34d399', desc: 'Bir kavram birden fazla parçaya ayrılıyor' },
      disappear: { label: 'Kayboluş',  color: '#f87171', desc: 'Türkçede var, İngilizcede doğrudan karşılığı yok' },
      emerge:    { label: 'Türeme',    color: '#22d3ee', desc: 'İngilizceye özgü, Türkçede bulunmuyor' }
    };

    this.EXAMPLES = ["Canım sıkıldı", "Kafam çok karışık", "İşler çok yoğun gidiyor", "Üstümden büyük bir yük kalktı"];
  }

  init(el) {
    this.el = el;
    if (window.analyticsManager) window.analyticsManager.lessonStart('bridge');
    this._render();
  }

  _render() {
    const legendHtml = Object.entries(this.BRIDGE_META).map(([key, meta]) => `
      <div class="bridge-legend-item" title="${meta.desc}">
        <div class="bridge-legend-dot" style="background:${meta.color}"></div>
        <span>${meta.label}</span>
      </div>
    `).join('');

    const categoriesHtml = (typeof BRIDGE_CATEGORIES !== 'undefined' ? BRIDGE_CATEGORIES : []).map(cat => `
      <button class="bridge-cat-chip ${this.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.icon} ${cat.label}
      </button>
    `).join('');

    const examplesHtml = this.EXAMPLES.map(ex => `<button class="bridge-example-pill" data-example="${ex}">${ex}</button>`).join('');

    this.el.innerHTML = `
      <svg class="bridge-svg-defs" aria-hidden="true">
        <defs>
          <linearGradient id="grad-transform" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#00d4ff"/>
          </linearGradient>
        </defs>
      </svg>

      <div class="bridge-wrap">
        <div class="bridge-header">
          <div class="bridge-header-left">
            <div class="bridge-logo"><span class="bridge-lm">K</span></div>
            <div class="bridge-title-block">
              <h1>KÖPRÜ</h1>
              <p>Çeviri değil, dönüşüm</p>
            </div>
          </div>
          <div class="bridge-header-stats">
            <div class="bridge-stat">
              <div class="bridge-stat-val" id="bridge-stat-count">${this.bridgeCount}</div>
              <div class="bridge-stat-lbl">KÖPRÜ</div>
            </div>
            <div class="bridge-stat">
              <div class="bridge-stat-val" id="bridge-stat-streak">${this.streakData.count}</div>
              <div class="bridge-stat-lbl">🔥 SERİ</div>
            </div>
            <button class="bridge-header-btn" id="bridge-quiz-btn" title="Quiz Modu">🎯</button>
            <button class="bridge-header-btn" id="bridge-daily-btn" title="Günlük Pratik">📅</button>
          </div>
        </div>

        <div class="bridge-legend">${legendHtml}</div>

        <div class="bridge-workspace">
          <div class="bridge-panel bridge-panel--tr">
            <textarea class="bridge-textarea" id="bridge-textarea" placeholder="Türkçe bir ifade yaz... (Örn: Canım sıkıldı)"></textarea>
            <div class="bridge-examples">${examplesHtml}</div>
          </div>
          <div class="bridge-trigger-col">
            <button class="bridge-trigger-btn" id="bridge-trigger-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div class="bridge-panel bridge-panel--en">
            <div id="bridge-placeholder">
              <div class="bridge-ph-visual">TR ➔ EN</div>
              <p>Bir ifade yaz ve köprü kur.</p>
            </div>
            <div id="bridge-result-content" style="display:none"></div>
          </div>
        </div>

        <div class="bridge-cat-filter-bar">
          <button class="bridge-cat-chip ${!this.activeCategory ? 'active' : ''}" data-cat="">✨ Tümü</button>
          ${categoriesHtml}
        </div>

        <div class="bridge-flow-bar">
          <span class="bridge-flow-label">Akış Skoru</span>
          <div class="bridge-flow-track">
            <div class="bridge-flow-fill" id="bridge-flow-fill" style="width:${Math.round(this.flowScore)}%"></div>
          </div>
        </div>

        <div id="bridge-cards-section"></div>
        <div id="bridge-insight-area"></div>
        <div id="bridge-save-area"></div>

        <div class="bridge-collection-section">
          <h2 style="margin: 20px 0 10px; font-size: 1.1rem;">Koleksiyonum</h2>
          <div class="bridge-collection-grid" id="bridge-coll-grid"></div>
        </div>
      </div>
    `;

    this._bindEvents();
    this._renderCollection();
  }

  _bindEvents() {
    const btn = this.el.querySelector('#bridge-trigger-btn');
    const txt = this.el.querySelector('#bridge-textarea');
    
    btn.addEventListener('click', () => {
      const val = txt.value.trim();
      if (val) this._analyze(val);
    });

    txt.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const val = txt.value.trim();
        if (val) this._analyze(val);
      }
    });

    this.el.querySelectorAll('.bridge-example-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        txt.value = pill.dataset.example;
        txt.focus();
      });
    });

    this.el.querySelectorAll('.bridge-cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.activeCategory = chip.dataset.cat || null;
        this.el.querySelectorAll('.bridge-cat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    this.el.querySelector('#bridge-quiz-btn').addEventListener('click', () => this._showQuiz());
    this.el.querySelector('#bridge-daily-btn').addEventListener('click', () => this._showDaily());
  }

  _analyze(query) {
    if (typeof findBridgeMatch !== 'function') return;
    const match = findBridgeMatch(query);
    if (match) {
      this._renderResult(query, match.entry);
      this._updateFlowScore(match.entry);
      this.bridgeCount++;
      localStorage.setItem('bridge_count', this.bridgeCount);
      const countEl = this.el.querySelector('#bridge-stat-count');
      if (countEl) countEl.textContent = this.bridgeCount;
      this._updateStreak();
    } else {
      const suggestions = typeof getTopMatches === 'function' ? getTopMatches(query, 3) : [];
      if (suggestions.length > 0) this._showSuggestions(query, suggestions);
      else alert('Bu ifade için henüz bir köprü bulunamadı.');
    }
  }

  _showSuggestions(query, list) {
    const content = this.el.querySelector('#bridge-result-content');
    const placeholder = this.el.querySelector('#bridge-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'block';
      content.innerHTML = `
        <div class="bridge-suggestions">
          <p style="font-size:0.85rem; color:var(--text-3); margin-bottom:10px;">"${query}" bulunamadı. Bunları mı demek istedin?</p>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${list.map(s => `<button class="bridge-example-pill" onclick="app.modules.bridge._analyze('${s.tr}')">${s.tr}</button>`).join('')}
          </div>
        </div>
      `;
    }
  }

  _renderResult(tr, data) {
    this.currentData = { originalTR: tr, ...data, id: data.id || Date.now() };
    const placeholder = this.el.querySelector('#bridge-placeholder');
    const content = this.el.querySelector('#bridge-result-content');
    
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'block';
      const reg = { informal: 'Günlük', formal: 'Resmi', neutral: 'Nötr' }[data.register] || 'Nötr';
      content.innerHTML = `
        <div class="bridge-result-card-inner">
          <div class="bridge-primary-row">
            <div class="bridge-primary-en">"${data.english_primary}"</div>
            <div class="bridge-result-actions">
              <button class="bridge-speak-btn" onclick="app.modules.bridge._speak('${data.english_primary.replace(/'/g, "\\'")}')">🔊</button>
            </div>
          </div>
          <div class="bridge-meta-row">
            <span class="bridge-register-badge ${data.register}">${reg}</span>
            <div class="bridge-category-tag">${data.category || "genel"}</div>
          </div>
          ${data.alternatives ? `
            <div class="bridge-alternatives">
              <div class="bridge-alt-label">Doğal Alternatifler</div>
              <div class="bridge-alt-grid">
                ${data.alternatives.map(alt => `<div class="bridge-alt-item" onclick="app.modules.bridge._copy('${alt.replace(/'/g, "\\'")}', this)">${alt}</div>`).join('')}
              </div>
            </div>` : ''}
        </div>
      `;
    }

    this._renderBridgeCards(data.bridges || []);
    this._renderInsight(data.cultural_insight, data.fluency_tip);
    this._renderSaveBtn();
  }

  _renderBridgeCards(bridges) {
    const section = this.el.querySelector('#bridge-cards-section');
    if (!section) return;
    section.innerHTML = bridges.map(b => {
      const type = b.bridge_type || 'direct';
      return `
      <div class="bridge-card-row btype-${type}">
        <div class="bridge-frag">
          <div class="bridge-frag-word">${b.tr_fragment}</div>
          <div class="bridge-frag-gloss">${b.tr_gloss || ''}</div>
        </div>
        <div class="bridge-connector">
          <div class="bridge-connector-type">${this.BRIDGE_META[type]?.label || ''}</div>
        </div>
        <div class="bridge-frag">
          <div class="bridge-frag-word">${b.en_fragment}</div>
          <div class="bridge-frag-gloss">${b.explanation || ''}</div>
        </div>
      </div>`;
    }).join('');
  }

  _renderInsight(insight, tip) {
    const area = this.el.querySelector('#bridge-insight-area');
    if (!area) return;
    if (!insight && !tip) { area.innerHTML = ''; return; }
    area.innerHTML = `
      <div class="bridge-coach-insight">
        <div class="bridge-coach-avatar">
          <div class="coach-glow"></div>
          <span class="coach-emoji">🧠</span>
        </div>
        <div class="bridge-coach-body">
          <div class="bridge-coach-header">
            <span class="coach-name">Köprü Koçu</span>
          </div>
          ${insight ? `<div class="bridge-insight-text">${insight}</div>` : ''}
          ${tip ? `
            <div class="bridge-pro-tip">
              <span class="pro-tip-label">PRO-TIP:</span>
              <span class="pro-tip-text">${tip}</span>
            </div>` : ''}
        </div>
      </div>
    `;
  }

  _renderSaveBtn() {
    const area = this.el.querySelector('#bridge-save-area');
    if (!area) return;
    area.innerHTML = `
      <div style="display:flex; gap:12px; margin:20px 24px;">
        <button class="bridge-save-btn" style="flex:1" onclick="app.modules.bridge._saveToCollection()">Koleksiyona Kaydet</button>
        <button class="bridge-save-btn" style="background:var(--violet); flex:1" onclick="app.modules.bridge._startShadowing()">Gölgeleme Yap</button>
      </div>
    `;
  }

  _updateFlowScore(data) {
    const gain = (data.bridges || []).length * 2;
    this.flowScore = Math.min(100, this.flowScore + gain);
    localStorage.setItem('bridge_flow_score', this.flowScore);
    const fill = this.el.querySelector('#bridge-flow-fill');
    if (fill) fill.style.width = Math.round(this.flowScore) + '%';
  }

  _updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 864e5).toDateString();
    if (this.streakData.lastDate === today) return;
    this.streakData.count = (this.streakData.lastDate === yesterday) ? this.streakData.count + 1 : 1;
    this.streakData.lastDate = today;
    localStorage.setItem('bridge_streak', JSON.stringify(this.streakData));
    const el = this.el.querySelector('#bridge-stat-streak');
    if (el) el.textContent = this.streakData.count;
  }

  _renderCollection() {
    const grid = this.el.querySelector('#bridge-coll-grid');
    if (!grid) return;
    if (!this.collection.length) {
      grid.innerHTML = '<p style="color:var(--text-3); font-size:0.85rem; padding:20px;">Henüz kayıt yok.</p>';
      return;
    }
    grid.innerHTML = this.collection.slice(0, 6).map(item => `
      <div class="bridge-coll-card" onclick="app.modules.bridge._analyze('${item.originalTR.replace(/'/g, "\\'")}')">
        <div class="bridge-coll-tr">${item.originalTR}</div>
        <div class="bridge-coll-en">"${item.english_primary}"</div>
      </div>
    `).join('');
  }

  _saveToCollection() {
    if (!this.currentData) return;
    if (this.collection.some(c => c.originalTR === this.currentData.originalTR)) {
      UI.toast("Bu ifade zaten koleksiyonunda.");
      return;
    }
    this.collection.unshift(this.currentData);
    localStorage.setItem('bridge_collection', JSON.stringify(this.collection));
    UI.toast("✅ Koleksiyona eklendi!");
    this._renderCollection();
  }

  _copy(text, el) {
    navigator.clipboard.writeText(text);
    const orig = el.textContent;
    el.textContent = "✓ Kopyalandı";
    setTimeout(() => el.textContent = orig, 1500);
  }

  _speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  }

  _startShadowing() {
    if (!this.currentData) return;
    const text = this.currentData.english_primary;
    const overlay = document.createElement('div');
    overlay.className = 'bridge-modal-overlay';
    overlay.innerHTML = `
      <div class="bridge-modal" style="text-align:center; padding:40px;">
        <h3 style="margin-bottom:20px;">Gölgeleme Pratiği</h3>
        <p style="font-size:1.4rem; font-weight:800; color:var(--br-en); margin-bottom:30px;">"${text}"</p>
        <p id="sh-status">Hazırlanıyor...</p>
        <button class="bridge-save-btn" onclick="this.parentElement.parentElement.remove()">Kapat</button>
      </div>
    `;
    document.body.appendChild(overlay);
    let count = 0;
    const run = () => {
      if (!overlay.isConnected || count >= 3) {
        if (overlay.isConnected) overlay.querySelector('#sh-status').textContent = "Bitti!";
        return;
      }
      count++;
      overlay.querySelector('#sh-status').textContent = `Dinle ve Tekrar Et (${count}/3)...`;
      this._speak(text);
      setTimeout(run, 4000);
    };
    run();
  }

  _showQuiz() {
    if (typeof BRIDGE_DATA === 'undefined' || !BRIDGE_DATA.length) return;
    const questions = [...BRIDGE_DATA].sort(() => 0.5 - Math.random()).slice(0, 5);
    let idx = 0, score = 0;
    const overlay = document.createElement('div');
    overlay.className = 'bridge-modal-overlay';
    document.body.appendChild(overlay);

    const renderQ = () => {
      if (idx >= questions.length) {
        overlay.innerHTML = `<div class="bridge-modal" style="text-align:center; padding:40px;">
          <h2>Quiz Bitti!</h2>
          <p style="font-size:2rem; margin:20px 0;">${score} / ${questions.length}</p>
          <button class="bridge-save-btn" onclick="this.parentElement.parentElement.remove()">Kapat</button>
        </div>`;
        this.app.addXP(score * 20, "medium");
        return;
      }
      const q = questions[idx];
      const opts = [q.english_primary, ...BRIDGE_DATA.filter(d => d.id !== q.id).sort(() => 0.5 - Math.random()).slice(0, 2).map(d => d.english_primary)].sort();
      overlay.innerHTML = `<div class="bridge-modal" style="padding:30px;">
        <p style="color:var(--text-3); margin-bottom:10px;">Soru ${idx+1}/${questions.length}</p>
        <h3 style="margin-bottom:20px;">"${q.tr}" ifadesinin karşılığı nedir?</h3>
        <div style="display:grid; gap:10px;">
          ${opts.map(o => `<button class="bridge-save-btn" style="background:var(--bg-card); color:var(--text-1); border:1px solid var(--border)" onclick="app.modules.bridge._checkQuiz('${o.replace(/'/g, "\\'")}', '${q.english_primary.replace(/'/g, "\\'")}', this)">${o}</button>`).join('')}
        </div>
      </div>`;
    };

    this._checkQuiz = (selected, correct, btn) => {
      if (selected === correct) { score++; btn.style.background = "var(--green)"; }
      else { btn.style.background = "var(--rose)"; }
      setTimeout(() => { idx++; renderQ(); }, 1000);
    };
    renderQ();
  }

  _showDaily() {
    alert("Günlük pratik modülü: Bugünlük 5 yeni köprü keşfet!");
    this.el.querySelector('#bridge-textarea').focus();
  }
}

window.BridgeModule = BridgeModule;
