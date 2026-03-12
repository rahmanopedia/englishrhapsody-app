/* ═══════════════════════════════════════════════════════════════
   KÖPRÜ — Kavramsal Dil Dönüşüm Stüdyosu
   Çeviri değil, dönüşüm. Düşünceni İngilizce'de yeniden inşa et.
   API gerektirmez — 135+ önceden analiz edilmiş ifade.
   ═══════════════════════════════════════════════════════════════ */

class BridgeModule {
  constructor(app) {
    this.app        = app;
    this.el         = null;
    this.collection = JSON.parse(localStorage.getItem('bridge_collection') || '[]');
    this.flowScore  = parseFloat(localStorage.getItem('bridge_flow_score') || '0');
    this.bridgeCount= parseInt(localStorage.getItem('bridge_count') || '0');
    this.currentData= null;
    this.saved      = false;
    this.activeCategory = null;

    this.EXAMPLES = [
      'Canım sıkıldı',
      'Kafam çok karışık',
      'İşler çok yoğun gidiyor',
      'Üstümden büyük bir yük kalktı',
      'Sabırsızlıkla bekliyorum',
      'Kendimi berbat hissediyorum',
      'Harika bir gün geçirdim',
      'Bu çok saçma bir durum',
    ];

    this.BRIDGE_META = {
      direct:    { label: 'Doğrudan', color: '#94a3b8', desc: 'Kavram birebir eşleşiyor' },
      transform: { label: 'Dönüşüm',  color: '#a78bfa', desc: 'Kavram farklı şekilde ifade ediliyor' },
      multiply:  { label: 'Çoğalma',  color: '#34d399', desc: 'Bir kavram birden fazla parçaya ayrılıyor' },
      disappear: { label: 'Kayboluş', color: '#f87171', desc: "Türkçede var, İngilizce'de doğrudan karşılığı yok" },
      emerge:    { label: 'Türeme',   color: '#22d3ee', desc: "İngilizce'ye özgü, Türkçede bulunmuyor" },
    };
  }

  init(container) {
    this.el = container;
    this._render();
  }

  /* ── Ana Render ───────────────────────────────────────────── */
  _render() {
    this.el.innerHTML = '';
    this._renderWorkspace();
  }

  /* ── Ana Çalışma Alanı ────────────────────────────────────── */
  _renderWorkspace() {
    const flowPct = Math.min(100, Math.round(this.flowScore));
    const examplePills = this.EXAMPLES.slice(0, 4).map(e =>
      `<button class="bridge-example-pill" data-example="${e}">${e}</button>`
    ).join('');

    const legendItems = Object.entries(this.BRIDGE_META).map(([type, meta]) =>
      `<div class="bridge-legend-item">
        <div class="bridge-legend-dot" style="background:${meta.color}"></div>
        <span>${meta.label}: ${meta.desc}</span>
      </div>`
    ).join('');

    const categoryTabs = (typeof BRIDGE_CATEGORIES !== 'undefined' ? BRIDGE_CATEGORIES : []).map(cat =>
      `<button class="bridge-cat-tab" data-cat="${cat.id}">${cat.icon} ${cat.label}</button>`
    ).join('');

    this.el.innerHTML = `
      <!-- SVG Gradyan Tanımları -->
      <svg class="bridge-svg-defs" aria-hidden="true">
        <defs>
          <linearGradient id="grad-transform" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#f59e0b"/>
            <stop offset="50%"  stop-color="#a78bfa"/>
            <stop offset="100%" stop-color="#0ea5e9"/>
          </linearGradient>
        </defs>
      </svg>

      <div class="bridge-wrap">
        <!-- Header -->
        <div class="bridge-header">
          <div class="bridge-header-left">
            <div class="bridge-logo">🌉</div>
            <div class="bridge-title-block">
              <h1>KÖPRÜ</h1>
              <p>Çeviri değil, dönüşüm</p>
            </div>
          </div>
          <div class="bridge-header-stats">
            <div class="bridge-stat">
              <div class="bridge-stat-val" id="bridge-stat-count">${this.bridgeCount}</div>
              <div class="bridge-stat-lbl">Köprü</div>
            </div>
            <div class="bridge-stat">
              <div class="bridge-stat-val" id="bridge-stat-coll">${this.collection.length}</div>
              <div class="bridge-stat-lbl">Koleksiyon</div>
            </div>
          </div>
        </div>

        <!-- Köprü Tipi Açıklamaları -->
        <div class="bridge-legend">${legendItems}</div>

        <!-- Çalışma Alanı -->
        <div class="bridge-workspace" id="bridge-workspace">
          <!-- Türkçe Panel -->
          <div class="bridge-panel bridge-panel--tr" id="bridge-tr-panel">
            <div class="bridge-panel-label">
              <div class="bridge-panel-label-dot"></div>
              Türkçe Düşünce
            </div>
            <textarea class="bridge-textarea" id="bridge-textarea"
              placeholder="Türkçe düşünceni yaz... Günlük dil, slang, deyimler, her şey."
              maxlength="400" rows="5"></textarea>
            <div class="bridge-textarea-footer">
              <span class="bridge-char-count" id="bridge-char-count">0 / 400</span>
              <div class="bridge-examples" id="bridge-examples">${examplePills}</div>
            </div>
          </div>

          <!-- Orta Tetikleyici -->
          <div class="bridge-trigger-col">
            <div class="bridge-trigger-line"></div>
            <button class="bridge-trigger-btn" id="bridge-trigger-btn" title="Köprü Kur">🌉</button>
            <div class="bridge-trigger-line"></div>
          </div>

          <!-- İngilizce Sonuç Paneli -->
          <div class="bridge-panel bridge-panel--en" id="bridge-en-panel">
            <div class="bridge-panel-label">
              <div class="bridge-panel-label-dot"></div>
              İngilizce Karşılık
            </div>
            <div class="bridge-result-placeholder" id="bridge-placeholder">
              <div class="bridge-result-placeholder-icon">✦</div>
              <p>Türkçe yaz, köprü butonuna bas.<br>Kavramsal dönüşümü izle.</p>
            </div>
            <div class="bridge-result-content" id="bridge-result-content" style="display:none"></div>
          </div>
        </div>

        <!-- Akış Skoru -->
        <div class="bridge-flow-bar">
          <span class="bridge-flow-label">Akış Skoru</span>
          <div class="bridge-flow-track">
            <div class="bridge-flow-fill" id="bridge-flow-fill" style="width:${flowPct}%"></div>
          </div>
          <span class="bridge-flow-pct" id="bridge-flow-pct">${flowPct}%</span>
        </div>

        <!-- Köprü Kartları Alanı -->
        <div class="bridge-cards-section" id="bridge-cards-section"></div>

        <!-- Kültürel Bilgi -->
        <div id="bridge-insight-area"></div>

        <!-- Kaydet -->
        <div id="bridge-save-area"></div>

        <!-- Kategori Gezgini -->
        <div class="bridge-explorer-section">
          <div class="bridge-collection-header">
            <div class="bridge-collection-title">
              Keşfet
              <span class="bridge-collection-count">${typeof BRIDGE_DATA !== 'undefined' ? BRIDGE_DATA.length : 0}+ ifade</span>
            </div>
          </div>
          <div class="bridge-cat-tabs" id="bridge-cat-tabs">
            <button class="bridge-cat-tab active" data-cat="">✨ Tümü</button>
            ${categoryTabs}
          </div>
          <div class="bridge-explorer-grid" id="bridge-explorer-grid"></div>
        </div>

        <!-- Koleksiyon -->
        <div class="bridge-collection-section">
          <div class="bridge-collection-header">
            <div class="bridge-collection-title">
              Koleksiyonum
              <span class="bridge-collection-count" id="coll-count-badge">${this.collection.length}</span>
            </div>
            ${this.collection.length ? '<button class="bridge-collection-clear" id="bridge-coll-clear">Temizle</button>' : ''}
          </div>
          <div class="bridge-collection-grid" id="bridge-coll-grid"></div>
        </div>
      </div>
    `;

    this._bindEvents();
    this._renderExplorer(null);
    this._renderCollection();
  }

  /* ── Olaylar ──────────────────────────────────────────────── */
  _bindEvents() {
    const ta = this.el.querySelector('#bridge-textarea');
    const cc = this.el.querySelector('#bridge-char-count');
    ta?.addEventListener('input', () => {
      cc.textContent = `${ta.value.length} / 400`;
    });

    // Örnek butonlar
    this.el.querySelectorAll('.bridge-example-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        if (ta) { ta.value = btn.dataset.example; cc.textContent = `${ta.value.length} / 400`; ta.focus(); }
      });
    });

    // Köprü Kur butonu
    const trigger = this.el.querySelector('#bridge-trigger-btn');
    trigger?.addEventListener('click', () => {
      const text = ta?.value.trim();
      if (!text) { ta?.focus(); return; }
      this._analyze(text);
    });

    // Ctrl+Enter ile tetikleme
    ta?.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const text = ta.value.trim();
        if (text) this._analyze(text);
      }
    });

    // Kategori sekmeleri
    this.el.querySelector('#bridge-cat-tabs')?.addEventListener('click', e => {
      const btn = e.target.closest('.bridge-cat-tab');
      if (!btn) return;
      this.el.querySelectorAll('.bridge-cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.activeCategory = btn.dataset.cat || null;
      this._renderExplorer(this.activeCategory);
    });

    // Koleksiyon temizle
    this.el.querySelector('#bridge-coll-clear')?.addEventListener('click', () => {
      if (confirm('Koleksiyonun tüm köprüleri silinecek. Emin misin?')) {
        this.collection = [];
        localStorage.removeItem('bridge_collection');
        this._renderCollection();
        const badge  = this.el.querySelector('#bridge-stat-coll');
        const badge2 = this.el.querySelector('#coll-count-badge');
        if (badge)  badge.textContent  = '0';
        if (badge2) badge2.textContent = '0';
        const clearBtn = this.el.querySelector('#bridge-coll-clear');
        if (clearBtn) clearBtn.remove();
      }
    });
  }

  /* ── Statik Veritabanı Araması ────────────────────────────── */
  _analyze(text) {
    const btn = this.el.querySelector('#bridge-trigger-btn');
    const trPanel = this.el.querySelector('#bridge-tr-panel');
    if (!btn || !trPanel) return;

    // Kısa yükleme efekti
    btn.classList.add('loading');
    btn.textContent = '⟳';
    this._clearResult();

    const loadEl = document.createElement('div');
    loadEl.className = 'bridge-loading-overlay';
    loadEl.id = 'bridge-loading';
    loadEl.innerHTML = `
      <div class="bridge-loading-dots"><span></span><span></span><span></span></div>
      <div class="bridge-loading-text">Kavramsal köprüler aranıyor…</div>
    `;
    trPanel.style.position = 'relative';
    trPanel.appendChild(loadEl);

    // Statik arama — kısa gecikme ile UX için
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.textContent = '🌉';
      document.getElementById('bridge-loading')?.remove();

      if (typeof findBridgeMatch !== 'function') {
        this._showError('Veritabanı yüklenemedi. Sayfayı yenile.');
        return;
      }

      const match = findBridgeMatch(text);

      if (match) {
        // Tam/yakın eşleşme bulundu
        this._renderResult(text, match);
        this._updateFlowScore(match);
        this.bridgeCount++;
        localStorage.setItem('bridge_count', this.bridgeCount);
        const statEl = this.el.querySelector('#bridge-stat-count');
        if (statEl) statEl.textContent = this.bridgeCount;
      } else {
        // Kısmi eşleşmeler ara
        const topMatches = getTopMatches(text, 3);
        if (topMatches.length > 0) {
          this._showSuggestions(text, topMatches);
        } else {
          this._showNotFound(text);
        }
      }
    }, 350);
  }

  /* ── Bulunamadı ────────────────────────────────────────────── */
  _showNotFound(text) {
    const content = this.el.querySelector('#bridge-result-content');
    const placeholder = this.el.querySelector('#bridge-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'flex';
      content.innerHTML = `
        <div style="padding:12px 0;width:100%">
          <div style="font-size:1.5rem;margin-bottom:8px">🔍</div>
          <div style="font-weight:700;color:#f1f5f9;margin-bottom:6px">Bu ifade veritabanında yok</div>
          <div style="color:var(--text-3);font-size:0.82rem;line-height:1.5">
            "<em>${text}</em>" için hazır köprü analizi bulunamadı.<br>
            Aşağıdan benzer ifadeleri keşfedebilirsin.
          </div>
          <div style="margin-top:12px;font-size:0.75rem;color:var(--text-3)">
            💡 Daha kısa veya farklı bir ifade dene
          </div>
        </div>
      `;
    }
  }

  /* ── Öneriler ──────────────────────────────────────────────── */
  _showSuggestions(text, suggestions) {
    const content = this.el.querySelector('#bridge-result-content');
    const placeholder = this.el.querySelector('#bridge-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'flex';
      const pills = suggestions.map(s =>
        `<button class="bridge-suggestion-pill" data-tr="${s.tr}">${s.tr}</button>`
      ).join('');
      content.innerHTML = `
        <div style="padding:12px 0;width:100%">
          <div style="font-weight:700;color:#f1f5f9;margin-bottom:6px">🌉 Benzer ifadeler</div>
          <div style="color:var(--text-3);font-size:0.82rem;margin-bottom:12px">
            "<em>${text}</em>" için tam eşleşme bulunamadı. Bunları dene:
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">${pills}</div>
        </div>
      `;
      content.querySelectorAll('.bridge-suggestion-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const ta = this.el.querySelector('#bridge-textarea');
          const cc = this.el.querySelector('#bridge-char-count');
          if (ta) {
            ta.value = btn.dataset.tr;
            if (cc) cc.textContent = `${ta.value.length} / 400`;
            this._analyze(btn.dataset.tr);
          }
        });
      });
    }
  }

  /* ── Sonuç Render ─────────────────────────────────────────── */
  _renderResult(originalTR, data) {
    this.currentData = { originalTR, ...data, savedAt: new Date().toISOString() };
    this.saved = false;

    const placeholder = this.el.querySelector('#bridge-placeholder');
    const content     = this.el.querySelector('#bridge-result-content');
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'flex';
      const regClass = data.register || 'neutral';
      const regLabel = { informal: 'Günlük', formal: 'Resmi', neutral: 'Nötr' }[regClass] || 'Nötr';
      const altItems = (data.alternatives || []).map(a =>
        `<div class="bridge-alt-item">${a}</div>`
      ).join('');

      content.innerHTML = `
        <div class="bridge-primary-en">"${data.english_primary}"</div>
        <span class="bridge-register-badge ${regClass}">${regLabel}</span>
        ${data.alternatives?.length ? `
          <div class="bridge-alternatives">
            <div class="bridge-alt-label">Alternatifler</div>
            ${altItems}
          </div>` : ''}
      `;
    }

    this._renderBridgeCards(data.bridges || []);
    this._renderInsight(data.cultural_insight, data.fluency_tip);
    this._renderSaveBtn();
  }

  /* ── Köprü Kartları ─────────────────────────────────────────── */
  _renderBridgeCards(bridges) {
    const section = this.el.querySelector('#bridge-cards-section');
    if (!section) return;
    section.innerHTML = `<div class="bridge-cards-title">Kavram Köprüleri</div>`;

    bridges.forEach((b, i) => {
      const type = b.bridge_type || 'direct';
      const meta = this.BRIDGE_META[type] || this.BRIDGE_META.direct;

      const row = document.createElement('div');
      row.className = `bridge-card-row btype-${type}`;
      row.style.animationDelay = `${i * 0.1}s`;

      const svgPath = this._buildSVGPath(type);

      row.innerHTML = `
        <div class="bridge-frag bridge-frag--tr">
          <div class="bridge-frag-word">${b.tr_fragment || ''}</div>
          <div class="bridge-frag-gloss">${b.tr_gloss || ''}</div>
          <div class="bridge-frag-expl">${b.explanation || ''}</div>
        </div>
        <div class="bridge-connector" title="${meta.desc}">
          ${svgPath}
          <div class="bridge-connector-type">${meta.label}</div>
        </div>
        <div class="bridge-frag bridge-frag--en">
          <div class="bridge-frag-word">${b.en_fragment || ''}</div>
          <div class="bridge-frag-gloss">&nbsp;</div>
          <div class="bridge-frag-expl">${b.explanation || ''}</div>
        </div>
      `;

      row.addEventListener('click', () => { row.classList.toggle('expanded'); });
      section.appendChild(row);
    });
  }

  _buildSVGPath(type) {
    const W = 72, H = 32, mx = W / 2, my = H / 2;
    let paths = '';
    const baseStyle = `stroke-dasharray:${W * 1.5}; stroke-dashoffset:${W * 1.5}; animation: draw-line 0.7s ease forwards;`;

    if (type === 'direct') {
      paths = `<path d="M4,${my} L${W-4},${my}" style="${baseStyle}"/>`;
    } else if (type === 'transform') {
      paths = `<path d="M4,${my} C${W*0.25},${my-12} ${W*0.75},${my+12} ${W-4},${my}" style="${baseStyle} stroke:url(#grad-transform);"/>`;
    } else if (type === 'multiply') {
      const delay = (d) => `animation-delay:${d}s;`;
      paths = `
        <path d="M4,${my-8} L${W-4},${my-8}" style="${baseStyle} ${delay(0)}"/>
        <path d="M4,${my}   L${W-4},${my}"   style="${baseStyle} ${delay(0.15)}"/>
        <path d="M4,${my+8} L${W-4},${my+8}" style="${baseStyle} ${delay(0.3)}"/>
      `;
    } else if (type === 'disappear') {
      paths = `<path d="M4,${my} L${W*0.65},${my}" style="${baseStyle} opacity:0.5;" stroke-dasharray="4 6"/>`;
    } else if (type === 'emerge') {
      paths = `<path d="M${W*0.35},${my} L${W-4},${my}" style="${baseStyle}"/>`;
    }

    return `<svg class="bridge-svg-line" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${paths}</svg>`;
  }

  /* ── Kategori Gezgini ────────────────────────────────────────── */
  _renderExplorer(categoryId) {
    const grid = this.el.querySelector('#bridge-explorer-grid');
    if (!grid || typeof BRIDGE_DATA === 'undefined') return;

    const entries = categoryId
      ? BRIDGE_DATA.filter(e => e.category === categoryId)
      : BRIDGE_DATA.slice(0, 24); // Tümü seçiliyken ilk 24 ifade

    if (!entries.length) {
      grid.innerHTML = '<div style="color:var(--text-3);font-size:0.82rem;padding:12px">Bu kategoride ifade bulunamadı.</div>';
      return;
    }

    grid.innerHTML = entries.map(entry => {
      const typeDots = (entry.bridges || []).map(b =>
        `<div class="bridge-coll-type-dot ${b.bridge_type || 'direct'}"></div>`
      ).join('');
      const regLabel = { informal: 'Günlük', formal: 'Resmi', neutral: 'Nötr' }[entry.register] || '';
      return `
        <div class="bridge-coll-card bridge-explorer-card" data-id="${entry.id}">
          <div class="bridge-coll-tr">${entry.tr}</div>
          <div class="bridge-coll-en">"${entry.english_primary}"</div>
          <div class="bridge-coll-meta">
            <span class="bridge-coll-date">${regLabel}</span>
            <div class="bridge-coll-bridges">${typeDots}</div>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.bridge-explorer-card').forEach(card => {
      card.addEventListener('click', () => {
        const id    = parseInt(card.dataset.id);
        const entry = BRIDGE_DATA.find(e => e.id === id);
        if (!entry) return;
        // Textarea'ya yaz ve analiz et
        const ta = this.el.querySelector('#bridge-textarea');
        const cc = this.el.querySelector('#bridge-char-count');
        if (ta) {
          ta.value = entry.tr;
          if (cc) cc.textContent = `${entry.tr.length} / 400`;
          // Scroll to workspace
          this.el.querySelector('#bridge-workspace')?.scrollIntoView({ behavior:'smooth', block:'center' });
        }
        this._renderResult(entry.tr, entry);
        this._updateFlowScore(entry);
        this.bridgeCount++;
        localStorage.setItem('bridge_count', this.bridgeCount);
        const statEl = this.el.querySelector('#bridge-stat-count');
        if (statEl) statEl.textContent = this.bridgeCount;
      });
    });
  }

  /* ── Kültürel Bilgi ─────────────────────────────────────────── */
  _renderInsight(insight, tip) {
    const area = this.el.querySelector('#bridge-insight-area');
    if (!area || (!insight && !tip)) return;
    area.innerHTML = `
      <div class="bridge-insight">
        <div class="bridge-insight-icon">🔭</div>
        <div class="bridge-insight-body">
          <div class="bridge-insight-label">Kültürel & Dilbilimsel Not</div>
          ${insight ? `<p class="bridge-insight-text">${insight}</p>` : ''}
          ${tip ? `<p class="bridge-fluency-tip">💡 ${tip}</p>` : ''}
        </div>
      </div>
    `;
  }

  /* ── Kaydet Butonu ──────────────────────────────────────────── */
  _renderSaveBtn() {
    const area = this.el.querySelector('#bridge-save-area');
    if (!area) return;
    area.innerHTML = `
      <button class="bridge-save-btn" id="bridge-save-btn">
        <span>🔖</span> Koleksiyona Ekle
      </button>
    `;
    area.querySelector('#bridge-save-btn').addEventListener('click', () => {
      this._saveToCollection();
    });
  }

  /* ── Akış Skoru Güncelle ────────────────────────────────────── */
  _updateFlowScore(data) {
    const bridges = data.bridges || [];
    const points = bridges.reduce((sum, b) => {
      const weights = { direct: 1, transform: 3, multiply: 2, disappear: 2, emerge: 3 };
      return sum + (weights[b.bridge_type] || 1);
    }, 0);
    const gained = Math.min(5, points * 0.5);
    this.flowScore = Math.min(100, this.flowScore + gained);
    localStorage.setItem('bridge_flow_score', this.flowScore.toString());

    const pct   = Math.round(this.flowScore);
    const fill  = this.el.querySelector('#bridge-flow-fill');
    const pctEl = this.el.querySelector('#bridge-flow-pct');
    if (fill)  fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  }

  /* ── Koleksiyona Kaydet ─────────────────────────────────────── */
  _saveToCollection() {
    if (!this.currentData || this.saved) return;

    const btn = this.el.querySelector('#bridge-save-btn');
    this.collection.unshift({ ...this.currentData, id: Date.now() });
    if (this.collection.length > 50) this.collection.pop();
    localStorage.setItem('bridge_collection', JSON.stringify(this.collection));
    this.saved = true;

    if (btn) {
      btn.classList.add('saved');
      btn.innerHTML = '<span>✓</span> Koleksiyona Eklendi';
      btn.disabled = true;
    }

    const s1 = this.el.querySelector('#bridge-stat-coll');
    const s2 = this.el.querySelector('#coll-count-badge');
    if (s1) s1.textContent = this.collection.length;
    if (s2) s2.textContent = this.collection.length;

    this._renderCollection();
  }

  /* ── Koleksiyon Render ──────────────────────────────────────── */
  _renderCollection() {
    const grid = this.el.querySelector('#bridge-coll-grid');
    if (!grid) return;

    if (!this.collection.length) {
      grid.innerHTML = `
        <div class="bridge-empty-coll" style="grid-column:1/-1">
          <div class="bridge-empty-coll-icon">🌉</div>
          <p>Henüz köprü kaydetmedin.<br>İfadeleri incele ve koleksiyona ekle.</p>
        </div>`;
      return;
    }

    grid.innerHTML = this.collection.map(item => {
      const date = new Date(item.savedAt || item.id).toLocaleDateString('tr-TR', { day:'numeric', month:'short' });
      const typeDots = (item.bridges || []).map(b =>
        `<div class="bridge-coll-type-dot ${b.bridge_type || 'direct'}"></div>`
      ).join('');
      return `
        <div class="bridge-coll-card" data-id="${item.id}">
          <div class="bridge-coll-tr">${item.originalTR || ''}</div>
          <div class="bridge-coll-en">"${item.english_primary || ''}"</div>
          <div class="bridge-coll-meta">
            <span class="bridge-coll-date">${date}</span>
            <div class="bridge-coll-bridges">${typeDots}</div>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.bridge-coll-card').forEach(card => {
      card.addEventListener('click', () => {
        const id   = parseInt(card.dataset.id);
        const item = this.collection.find(c => c.id === id);
        if (item) this._showDetail(item);
      });
    });
  }

  /* ── Koleksiyon Detay Modal ─────────────────────────────────── */
  _showDetail(item) {
    const overlay = document.createElement('div');
    overlay.className = 'bridge-modal-overlay';

    const bridgeRows = (item.bridges || []).map(b => {
      const meta = this.BRIDGE_META[b.bridge_type || 'direct'];
      return `
        <div class="bridge-card-row btype-${b.bridge_type || 'direct'}" style="animation:none;opacity:1;transform:none;margin-bottom:8px">
          <div class="bridge-frag bridge-frag--tr">
            <div class="bridge-frag-word">${b.tr_fragment}</div>
            <div class="bridge-frag-gloss">${b.tr_gloss}</div>
          </div>
          <div class="bridge-connector">
            ${this._buildSVGPath(b.bridge_type || 'direct')}
            <div class="bridge-connector-type">${meta?.label || ''}</div>
          </div>
          <div class="bridge-frag bridge-frag--en">
            <div class="bridge-frag-word">${b.en_fragment}</div>
            <div class="bridge-frag-gloss">${b.explanation}</div>
          </div>
        </div>`;
    }).join('');

    overlay.innerHTML = `
      <div class="bridge-modal">
        <button class="bridge-modal-close">✕</button>
        <div class="bridge-modal-tr">${item.originalTR}</div>
        <div class="bridge-modal-en">"${item.english_primary}"</div>
        ${bridgeRows}
        ${item.cultural_insight ? `
          <div class="bridge-insight" style="margin:16px 0 0">
            <div class="bridge-insight-icon">🔭</div>
            <div class="bridge-insight-body">
              <div class="bridge-insight-label">Kültürel Not</div>
              <p class="bridge-insight-text">${item.cultural_insight}</p>
              ${item.fluency_tip ? `<p class="bridge-fluency-tip">💡 ${item.fluency_tip}</p>` : ''}
            </div>
          </div>` : ''}
        <button class="bridge-save-btn saved" style="margin-top:16px;width:100%" id="modal-delete-btn">
          <span>🗑</span> Koleksiyondan Sil
        </button>
      </div>
    `;

    overlay.querySelector('#modal-delete-btn').addEventListener('click', () => {
      this.collection = this.collection.filter(c => c.id !== item.id);
      localStorage.setItem('bridge_collection', JSON.stringify(this.collection));
      overlay.remove();
      this._renderCollection();
      const s1 = this.el.querySelector('#bridge-stat-coll');
      const s2 = this.el.querySelector('#coll-count-badge');
      if (s1) s1.textContent = this.collection.length;
      if (s2) s2.textContent = this.collection.length;
    });

    overlay.querySelector('.bridge-modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  /* ── Hata ────────────────────────────────────────────────────── */
  _showError(msg) {
    const content = this.el.querySelector('#bridge-result-content');
    const placeholder = this.el.querySelector('#bridge-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    if (content) {
      content.style.display = 'flex';
      content.innerHTML = `
        <div style="color:#f87171;font-size:0.85rem;padding:12px 0">
          <div style="font-weight:700;margin-bottom:6px">⚠️ Hata oluştu</div>
          <div style="color:var(--text-3)">${msg}</div>
        </div>`;
    }
  }

  /* ── Temizlik ─────────────────────────────────────────────────── */
  _clearResult() {
    const placeholder = this.el.querySelector('#bridge-placeholder');
    const content     = this.el.querySelector('#bridge-result-content');
    const cards       = this.el.querySelector('#bridge-cards-section');
    const insight     = this.el.querySelector('#bridge-insight-area');
    const saveArea    = this.el.querySelector('#bridge-save-area');
    if (placeholder) { placeholder.style.display = 'flex'; }
    if (content)     { content.style.display = 'none'; content.innerHTML = ''; }
    if (cards)       { cards.innerHTML = ''; }
    if (insight)     { insight.innerHTML = ''; }
    if (saveArea)    { saveArea.innerHTML = ''; }
    this.currentData = null;
    this.saved = false;
  }
}

window.BridgeModule = BridgeModule;
