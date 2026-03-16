/**
 * ENGLISH RHAPSODY — KÖPRÜ (BRIDGE) MODULE
 * Focuses on cultural transformation rather than literal translation.
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

    this.BRIDGE_META = {
      direct:    { label: 'Doğrudan',  color: '#94a3b8', desc: 'Kavram birebir eşleşiyor' },
      transform: { label: 'Dönüşüm',   color: '#a78bfa', desc: 'Kavram farklı şekilde ifade ediliyor' },
      multiply:  { label: 'Çoğalma',   color: '#34d399', desc: 'Bir kavram birden fazla parçaya ayrılıyor' },
      disappear: { label: 'Kayboluş',  color: '#f87171', desc: 'Türkçede var, İngilizcede doğrudan karşılığı yok' },
      emerge:    { label: 'Türeme',    color: '#22d3ee', desc: 'İngilizceye özgü, Türkçede bulunmuyor' }
    };
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
          </div>
        </div>

        <div class="bridge-legend">${legendHtml}</div>

        <div class="bridge-workspace">
          <div class="bridge-panel bridge-panel--tr">
            <textarea class="bridge-textarea" id="bridge-textarea" placeholder="Türkçe bir ifade yaz..."></textarea>
          </div>
          <div class="bridge-trigger-col">
            <button class="bridge-trigger-btn" id="bridge-trigger-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div class="bridge-panel bridge-panel--en">
            <div id="bridge-placeholder">Sonuçlar burada görünecek...</div>
            <div id="bridge-result-content" style="display:none"></div>
          </div>
        </div>

        <div class="bridge-cat-filter-bar">${categoriesHtml}</div>

        <div id="bridge-cards-section"></div>
        <div id="bridge-insight-area"></div>
        <div id="bridge-save-area"></div>
      </div>
    `;

    this._bindEvents();
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

    this.el.querySelectorAll('.bridge-cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.activeCategory = chip.dataset.cat || null;
        this.el.querySelectorAll('.bridge-cat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });
  }

  _analyze(query) {
    if (typeof findBridgeMatch !== 'function') return;
    const match = findBridgeMatch(query);
    if (match) {
      this._renderResult(query, match.entry);
      this.bridgeCount++;
      localStorage.setItem('bridge_count', this.bridgeCount);
      const countEl = this.el.querySelector('#bridge-stat-count');
      if (countEl) countEl.textContent = this.bridgeCount;
    } else {
      alert('Bu ifade için henüz bir köprü bulunamadı.');
    }
  }

  _renderResult(tr, data) {
    this.currentData = { originalTR: tr, ...data };
    const placeholder = this.el.querySelector('#bridge-placeholder');
    const content = this.el.querySelector('#bridge-result-content');
    
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'block';
      content.innerHTML = `
        <div class="bridge-result-card-inner">
          <div class="bridge-primary-row">
            <div class="bridge-primary-en">"${data.english_primary}"</div>
            <div class="bridge-result-actions">
              <button class="bridge-speak-btn" onclick="app.modules.bridge._speak('${data.english_primary.replace(/'/g, "\\'")}')">🔊</button>
            </div>
          </div>
          <div class="bridge-register-badge ${data.register}">${data.register === 'informal' ? 'Günlük' : 'Resmi'}</div>
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
    section.innerHTML = bridges.map(b => `
      <div class="bridge-card-row btype-${b.bridge_type || 'direct'}">
        <div class="bridge-frag">
          <div class="bridge-frag-word">${b.tr_fragment}</div>
          <div class="bridge-frag-gloss">${b.tr_gloss}</div>
        </div>
        <div class="bridge-connector">
          <div class="bridge-connector-type">${this.BRIDGE_META[b.bridge_type]?.label || ''}</div>
        </div>
        <div class="bridge-frag">
          <div class="bridge-frag-word">${b.en_fragment}</div>
          <div class="bridge-frag-gloss">${b.explanation}</div>
        </div>
      </div>
    `).join('');
  }

  _renderInsight(insight, tip) {
    const area = this.el.querySelector('#bridge-insight-area');
    if (!area || (!insight && !tip)) {
      if (area) area.innerHTML = '';
      return;
    }
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
      <button class="bridge-save-btn" onclick="app.modules.bridge._saveToCollection()">
        Koleksiyona Kaydet
      </button>
    `;
  }

  _speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }

  _saveToCollection() {
    if (!this.currentData) return;
    this.collection.unshift(this.currentData);
    localStorage.setItem('bridge_collection', JSON.stringify(this.collection));
    alert('Koleksiyona eklendi!');
  }
}

window.BridgeModule = BridgeModule;
