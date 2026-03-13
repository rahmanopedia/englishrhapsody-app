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
    this.activeCategory  = null;
    this.activeTypeFilter= null;
    this.searchQuery     = '';
    this.explorerPage    = 1;
    this.searchHistory   = JSON.parse(localStorage.getItem('bridge_search_history') || '[]');
    this.collectionTags  = JSON.parse(localStorage.getItem('bridge_coll_tags') || '{}');
    this.activeTagFilter = null;
    this.srData          = JSON.parse(localStorage.getItem('bridge_sr_data') || '{}');
    this.streakData      = JSON.parse(localStorage.getItem('bridge_streak') || '{"count":0,"lastDate":""}');
    this.dailyDone       = JSON.parse(localStorage.getItem('bridge_daily_done') || '[]');
    this.onboarded       = localStorage.getItem('bridge_onboarded') === '1';

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
            <div class="bridge-stat bridge-stat--streak" title="Günlük seri">
              <div class="bridge-stat-val" id="bridge-stat-streak">${this.streakData.count}</div>
              <div class="bridge-stat-lbl">🔥 Seri</div>
            </div>
            <button class="bridge-header-btn" id="bridge-quiz-btn" title="Sınav Modu">📝</button>
            <button class="bridge-header-btn" id="bridge-daily-btn" title="Günlük Pratik">📅</button>
            <button class="bridge-header-btn" id="bridge-stats-btn" title="İstatistikler">📊</button>
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
            <div class="bridge-textarea-wrap">
              <textarea class="bridge-textarea" id="bridge-textarea"
                placeholder="Türkçe düşünceni yaz... Günlük dil, slang, deyimler, her şey."
                maxlength="400" rows="5"></textarea>
              <div class="bridge-history-dropdown" id="bridge-history-dropdown" style="display:none"></div>
            </div>
            <div class="bridge-textarea-footer">
              <span class="bridge-char-count" id="bridge-char-count">0 / 400</span>
              <span class="bridge-kbd-hint">Ctrl+Enter</span>
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
          <input class="bridge-search-input" id="bridge-search-input"
            placeholder="🔍  İfade ara… (Türkçe veya İngilizce)"
            value="${this.searchQuery}" autocomplete="off" spellcheck="false">
          <div class="bridge-type-filters" id="bridge-type-filters">
            <button class="bridge-type-chip ${!this.activeTypeFilter ? 'active' : ''}" data-type="">Tümü</button>
            ${Object.entries(this.BRIDGE_META).map(([t, m]) =>
              `<button class="bridge-type-chip btype-chip-${t} ${this.activeTypeFilter === t ? 'active' : ''}" data-type="${t}">${m.label}</button>`
            ).join('')}
          </div>
          <div class="bridge-cat-tabs" id="bridge-cat-tabs">
            <button class="bridge-cat-tab active" data-cat="">✨ Tümü</button>
            ${categoryTabs}
          </div>
          <div class="bridge-explorer-grid" id="bridge-explorer-grid"></div>
          <div id="bridge-explorer-footer"></div>
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
          <div class="bridge-tag-filter-row" id="bridge-tag-filter-row"></div>
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
      if (!text) {
        ta?.classList.add('shake');
        ta?.addEventListener('animationend', () => ta.classList.remove('shake'), { once: true });
        ta?.focus();
        return;
      }
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
      this.explorerPage = 1;
      this._renderExplorer(this.activeCategory);
    });

    // Explorer arama
    this.el.querySelector('#bridge-search-input')?.addEventListener('input', e => {
      this.searchQuery = e.target.value;
      this.explorerPage = 1;
      this._renderExplorer(this.activeCategory);
    });

    // Arama geçmişi — textarea focus
    ta?.addEventListener('focus', () => this._showSearchHistory());
    ta?.addEventListener('input', () => {
      if (!ta.value.trim()) this._showSearchHistory();
      else this._hideSearchHistory();
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#bridge-tr-panel')) this._hideSearchHistory();
    });

    // Tip filtresi
    this.el.querySelector('#bridge-type-filters')?.addEventListener('click', e => {
      const btn = e.target.closest('.bridge-type-chip');
      if (!btn) return;
      this.el.querySelectorAll('.bridge-type-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.activeTypeFilter = btn.dataset.type || null;
      this.explorerPage = 1;
      this._renderExplorer(this.activeCategory);
    });

    // Header butonları
    this.el.querySelector('#bridge-quiz-btn')?.addEventListener('click', () => this._showQuiz());
    this.el.querySelector('#bridge-daily-btn')?.addEventListener('click', () => this._showDaily());
    this.el.querySelector('#bridge-stats-btn')?.addEventListener('click', () => this._showStats());

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

    // Onboarding
    if (!this.onboarded) setTimeout(() => this._startOnboarding(), 800);
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
        this._renderResult(text, match.entry);
        this._updateFlowScore(match.entry);
        this.bridgeCount++;
        localStorage.setItem('bridge_count', this.bridgeCount);
        const statEl = this.el.querySelector('#bridge-stat-count');
        if (statEl) statEl.textContent = this.bridgeCount;
        this._addToSearchHistory(text);
        this._updateStreak();
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
        <div class="bridge-primary-row">
          <div class="bridge-primary-en">"${data.english_primary}"</div>
          <button class="bridge-speak-btn" id="bridge-speak-btn" title="Telaffuz et">🔊</button>
          <button class="bridge-share-btn" id="bridge-share-btn" title="Paylaş">↗</button>
        </div>
        <span class="bridge-register-badge ${regClass}">${regLabel}</span>
        ${data.alternatives?.length ? `
          <div class="bridge-alternatives">
            <div class="bridge-alt-label">Alternatifler <span style="opacity:0.5;font-size:0.6rem">(tıkla → kopyala)</span></div>
            ${altItems}
          </div>` : ''}
      `;
      content.querySelector('#bridge-speak-btn')?.addEventListener('click', () => {
        this._speak(data.english_primary);
      });
      content.querySelector('#bridge-share-btn')?.addEventListener('click', () => {
        this._shareCard(originalTR, data);
      });
    }

    // Alt itemlara tıklanınca panoya kopyala
    content?.querySelectorAll('.bridge-alt-item').forEach(el => {
      el.addEventListener('click', () => {
        navigator.clipboard?.writeText(el.textContent.trim()).catch(() => {});
        const orig = el.textContent;
        el.textContent = '✓ Kopyalandı';
        el.style.color = '#34d399';
        setTimeout(() => { el.textContent = orig; el.style.color = ''; }, 1200);
      });
    });

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
    const grid   = this.el.querySelector('#bridge-explorer-grid');
    const footer = this.el.querySelector('#bridge-explorer-footer');
    if (!grid || typeof BRIDGE_DATA === 'undefined') return;

    const PAGE_SIZE = 24;

    // Kategori filtresi
    let pool = categoryId
      ? BRIDGE_DATA.filter(e => e.category === categoryId)
      : BRIDGE_DATA;

    // Arama filtresi
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      pool = pool.filter(e =>
        e.tr.toLowerCase().includes(q) ||
        (e.english_primary || '').toLowerCase().includes(q)
      );
    }

    // Tip filtresi
    if (this.activeTypeFilter) {
      pool = pool.filter(e =>
        (e.bridges || []).some(b => b.bridge_type === this.activeTypeFilter)
      );
    }

    if (!pool.length) {
      grid.innerHTML = '<div style="color:var(--text-3);font-size:0.82rem;padding:12px">Sonuç bulunamadı.</div>';
      if (footer) footer.innerHTML = '';
      return;
    }

    // Sayfalama — arama veya kategori aktifse tümünü göster
    const showAll = !!(q || categoryId);
    const entries = showAll ? pool : pool.slice(0, this.explorerPage * PAGE_SIZE);
    const remaining = pool.length - entries.length;

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
        const ta = this.el.querySelector('#bridge-textarea');
        const cc = this.el.querySelector('#bridge-char-count');
        if (ta) {
          ta.value = entry.tr;
          if (cc) cc.textContent = `${entry.tr.length} / 400`;
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

    // Daha Fazla Göster butonu
    if (footer) {
      if (remaining > 0) {
        footer.innerHTML = `<button class="bridge-load-more" id="bridge-load-more">Daha Fazla Göster <span>${remaining} ifade daha</span></button>`;
        footer.querySelector('#bridge-load-more').addEventListener('click', () => {
          this.explorerPage++;
          this._renderExplorer(this.activeCategory);
        });
      } else {
        footer.innerHTML = '';
      }
    }
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
    const tag = prompt('Etiket ekle (isteğe bağlı — örn: iş, sınav, günlük):', '') || '';
    const itemId = Date.now();
    this.collection.unshift({ ...this.currentData, id: itemId, tag: tag.trim() });
    if (this.collection.length > 50) this.collection.pop();
    localStorage.setItem('bridge_collection', JSON.stringify(this.collection));
    if (tag.trim()) {
      this.collectionTags[itemId] = tag.trim();
      localStorage.setItem('bridge_coll_tags', JSON.stringify(this.collectionTags));
    }
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

    // Etiket filtre satırı
    const tagRow = this.el.querySelector('#bridge-tag-filter-row');
    if (tagRow) {
      const allTags = [...new Set(this.collection.map(c => c.tag).filter(Boolean))];
      if (allTags.length) {
        tagRow.innerHTML = `
          <button class="bridge-tag-chip ${!this.activeTagFilter ? 'active' : ''}" data-tag="">Tümü</button>
          ${allTags.map(t => `<button class="bridge-tag-chip ${this.activeTagFilter === t ? 'active' : ''}" data-tag="${t}">${t}</button>`).join('')}
        `;
        tagRow.querySelectorAll('.bridge-tag-chip').forEach(btn => {
          btn.addEventListener('click', () => {
            this.activeTagFilter = btn.dataset.tag || null;
            this._renderCollection();
          });
        });
      } else {
        tagRow.innerHTML = '';
      }
    }

    let items = this.activeTagFilter
      ? this.collection.filter(c => c.tag === this.activeTagFilter)
      : this.collection;

    if (!items.length) {
      grid.innerHTML = `
        <div class="bridge-empty-coll" style="grid-column:1/-1">
          <div class="bridge-empty-coll-icon">🌉</div>
          <p>Henüz köprü kaydetmedin.<br>İfadeleri incele ve koleksiyona ekle.</p>
        </div>`;
      return;
    }

    // SR: bugün tekrar edilmesi gerekenler önce
    const today = new Date().toDateString();
    items = [...items].sort((a, b) => {
      const aDue = this._isSRDue(a.id, today);
      const bDue = this._isSRDue(b.id, today);
      return (bDue ? 1 : 0) - (aDue ? 1 : 0);
    });

    grid.innerHTML = items.map(item => {
      const date = new Date(item.savedAt || item.id).toLocaleDateString('tr-TR', { day:'numeric', month:'short' });
      const typeDots = (item.bridges || []).map(b =>
        `<div class="bridge-coll-type-dot ${b.bridge_type || 'direct'}"></div>`
      ).join('');
      const isDue = this._isSRDue(item.id, today);
      const tagBadge = item.tag ? `<span class="bridge-coll-tag">${item.tag}</span>` : '';
      return `
        <div class="bridge-coll-card ${isDue ? 'sr-due' : ''}" data-id="${item.id}">
          ${isDue ? '<div class="bridge-sr-indicator" title="Bugün tekrar zamanı!">↺</div>' : ''}
          <div class="bridge-coll-tr">${item.originalTR || ''}</div>
          <div class="bridge-coll-en">"${item.english_primary || ''}"</div>
          <div class="bridge-coll-meta">
            <span class="bridge-coll-date">${date}</span>
            ${tagBadge}
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
        <button class="bridge-save-btn" style="margin-top:16px;width:100%" id="modal-speak-btn">
          <span>🔊</span> Telaffuz Et
        </button>
        <div class="bridge-sr-buttons" id="modal-sr-btns" style="display:flex;gap:8px;margin-top:8px">
          <div style="font-size:0.65rem;color:var(--text-3);width:100%;text-align:center;margin-bottom:2px">Tekrar planla:</div>
          <button class="bridge-sr-btn sr-again"  data-diff="again"  style="flex:1">↺ Tekrar</button>
          <button class="bridge-sr-btn sr-hard"   data-diff="hard"   style="flex:1">😓 Zor</button>
          <button class="bridge-sr-btn sr-easy"   data-diff="easy"   style="flex:1">😊 Kolay</button>
        </div>
        <button class="bridge-save-btn" style="margin-top:8px;width:100%" id="modal-load-btn">
          <span>↗</span> Çalışma Alanına Yükle
        </button>
        <button class="bridge-save-btn saved" style="margin-top:8px;width:100%" id="modal-delete-btn">
          <span>🗑</span> Koleksiyondan Sil
        </button>
      </div>
    `;

    const closeOverlay = () => {
      overlay.remove();
      document.removeEventListener('keydown', escHandler);
    };
    const escHandler = (e) => { if (e.key === 'Escape') closeOverlay(); };
    document.addEventListener('keydown', escHandler);

    overlay.querySelector('#modal-speak-btn')?.addEventListener('click', () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(item.english_primary);
        utt.lang = 'en-US'; utt.rate = 0.9;
        window.speechSynthesis.speak(utt);
      }
    });

    overlay.querySelectorAll('.bridge-sr-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._updateSR(item.id, btn.dataset.diff);
        const row = overlay.querySelector('#modal-sr-btns');
        if (row) row.innerHTML = '<div style="font-size:0.75rem;color:#34d399;text-align:center;padding:6px">✓ Tekrar planı güncellendi</div>';
      });
    });

    overlay.querySelector('#modal-load-btn').addEventListener('click', () => {
      const ta = this.el.querySelector('#bridge-textarea');
      const cc = this.el.querySelector('#bridge-char-count');
      if (ta) {
        ta.value = item.originalTR || item.tr || '';
        if (cc) cc.textContent = `${ta.value.length} / 400`;
        this._renderResult(item.originalTR || item.tr, item);
        this._updateFlowScore(item);
        this.el.querySelector('#bridge-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      closeOverlay();
    });

    overlay.querySelector('#modal-delete-btn').addEventListener('click', () => {
      this.collection = this.collection.filter(c => c.id !== item.id);
      localStorage.setItem('bridge_collection', JSON.stringify(this.collection));
      closeOverlay();
      this._renderCollection();
      const s1 = this.el.querySelector('#bridge-stat-coll');
      const s2 = this.el.querySelector('#coll-count-badge');
      if (s1) s1.textContent = this.collection.length;
      if (s2) s2.textContent = this.collection.length;
    });

    overlay.querySelector('.bridge-modal-close').addEventListener('click', closeOverlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
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

  /* ── Ses Telaffuzu ────────────────────────────────────────────── */
  _speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.9;
    const btn = this.el.querySelector('#bridge-speak-btn');
    if (btn) { btn.textContent = '🔊'; btn.classList.add('speaking'); }
    utt.onend = () => { if (btn) { btn.textContent = '🔊'; btn.classList.remove('speaking'); } };
    window.speechSynthesis.speak(utt);
  }

  /* ── Paylaşım Kartı ───────────────────────────────────────────── */
  _shareCard(tr, data) {
    const canvas = document.createElement('canvas');
    canvas.width = 800; canvas.height = 420;
    const ctx = canvas.getContext('2d');

    // Arka plan
    const bg = ctx.createLinearGradient(0, 0, 800, 420);
    bg.addColorStop(0, '#060d1b');
    bg.addColorStop(1, '#0d1829');
    ctx.fillStyle = bg;
    ctx.roundRect(0, 0, 800, 420, 24);
    ctx.fill();

    // Üst şerit
    const stripe = ctx.createLinearGradient(0, 0, 800, 0);
    stripe.addColorStop(0, '#f59e0b');
    stripe.addColorStop(1, '#0ea5e9');
    ctx.fillStyle = stripe;
    ctx.fillRect(0, 0, 800, 5);

    // Logo metin
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText('🌉 KÖPRÜ', 36, 46);

    // TR metin
    ctx.fillStyle = '#fbbf24';
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText(tr, 36, 110);

    // Ok
    ctx.fillStyle = '#4b5563';
    ctx.font = '28px system-ui, sans-serif';
    ctx.fillText('↓', 36, 165);

    // EN metin
    ctx.fillStyle = '#7dd3fc';
    ctx.font = 'bold 32px system-ui, sans-serif';
    const en = `"${data.english_primary}"`;
    ctx.fillText(en, 36, 220);

    // Insight (kısa)
    if (data.cultural_insight) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px system-ui, sans-serif';
      const words = data.cultural_insight.split(' ');
      let line = '', y = 290;
      for (const w of words) {
        const test = line + w + ' ';
        if (ctx.measureText(test).width > 720 && line) {
          ctx.fillText(line, 36, y); line = w + ' '; y += 22;
          if (y > 360) break;
        } else { line = test; }
      }
      if (y <= 360) ctx.fillText(line, 36, y);
    }

    // Alt bant
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 385, 800, 35);
    ctx.fillStyle = '#4b5563';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText('English Rhapsody · Kavramsal Dil Dönüşüm Stüdyosu', 36, 408);

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `kopru-${Date.now()}.png`; a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* ── Arama Geçmişi ────────────────────────────────────────────── */
  _addToSearchHistory(text) {
    this.searchHistory = [text, ...this.searchHistory.filter(h => h !== text)].slice(0, 10);
    localStorage.setItem('bridge_search_history', JSON.stringify(this.searchHistory));
  }

  _showSearchHistory() {
    const dd = this.el.querySelector('#bridge-history-dropdown');
    const ta = this.el.querySelector('#bridge-textarea');
    if (!dd || !this.searchHistory.length) return;
    dd.innerHTML = this.searchHistory.map(h =>
      `<button class="bridge-history-item" data-h="${h}">${h}</button>`
    ).join('');
    dd.style.display = 'block';
    dd.querySelectorAll('.bridge-history-item').forEach(btn => {
      btn.addEventListener('click', () => {
        if (ta) {
          ta.value = btn.dataset.h;
          const cc = this.el.querySelector('#bridge-char-count');
          if (cc) cc.textContent = `${ta.value.length} / 400`;
          this._hideSearchHistory();
          this._analyze(btn.dataset.h);
        }
      });
    });
  }

  _hideSearchHistory() {
    const dd = this.el.querySelector('#bridge-history-dropdown');
    if (dd) dd.style.display = 'none';
  }

  /* ── Spaced Repetition ────────────────────────────────────────── */
  _isSRDue(itemId, todayStr) {
    const sr = this.srData[itemId];
    if (!sr) return false;
    return sr.nextReview === todayStr || new Date(sr.nextReview) < new Date(todayStr);
  }

  _updateSR(itemId, difficulty) {
    const today = new Date();
    const sr = this.srData[itemId] || { interval: 1, ease: 2.5, repetitions: 0 };
    if (difficulty === 'easy') {
      sr.interval = Math.round(sr.interval * sr.ease);
      sr.ease = Math.min(2.5, sr.ease + 0.15);
      sr.repetitions++;
    } else if (difficulty === 'hard') {
      sr.interval = Math.max(1, Math.round(sr.interval * 1.2));
      sr.ease = Math.max(1.3, sr.ease - 0.2);
    } else {
      sr.interval = 1; sr.ease = Math.max(1.3, sr.ease - 0.3); sr.repetitions = 0;
    }
    const next = new Date(today);
    next.setDate(next.getDate() + sr.interval);
    sr.nextReview = next.toDateString();
    this.srData[itemId] = sr;
    localStorage.setItem('bridge_sr_data', JSON.stringify(this.srData));
    this._renderCollection();
  }

  /* ── Streak ───────────────────────────────────────────────────── */
  _updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (this.streakData.lastDate === today) return;
    if (this.streakData.lastDate === yesterday) {
      this.streakData.count++;
    } else if (this.streakData.lastDate !== today) {
      this.streakData.count = 1;
    }
    this.streakData.lastDate = today;
    localStorage.setItem('bridge_streak', JSON.stringify(this.streakData));
    const el = this.el.querySelector('#bridge-stat-streak');
    if (el) el.textContent = this.streakData.count;
  }

  /* ── Sınav Modu ───────────────────────────────────────────────── */
  _showQuiz() {
    if (typeof BRIDGE_DATA === 'undefined' || !BRIDGE_DATA.length) return;
    const pool = [...BRIDGE_DATA].sort(() => Math.random() - 0.5).slice(0, 10);
    let idx = 0, score = 0;

    const overlay = document.createElement('div');
    overlay.className = 'bridge-modal-overlay';

    const render = () => {
      if (idx >= pool.length) {
        overlay.innerHTML = `
          <div class="bridge-modal bridge-quiz-modal">
            <button class="bridge-modal-close" id="qclose">✕</button>
            <div class="bridge-quiz-score-screen">
              <div class="bridge-quiz-score-emoji">${score >= 8 ? '🏆' : score >= 5 ? '⭐' : '📚'}</div>
              <div class="bridge-quiz-score-val">${score} / ${pool.length}</div>
              <div class="bridge-quiz-score-lbl">${score >= 8 ? 'Harika!' : score >= 5 ? 'İyi iş!' : 'Daha fazla pratik yap!'}</div>
              <button class="bridge-save-btn" id="qretry" style="margin-top:20px">Tekrar Dene</button>
            </div>
          </div>`;
        overlay.querySelector('#qclose').addEventListener('click', () => { overlay.remove(); document.removeEventListener('keydown', escH); });
        overlay.querySelector('#qretry').addEventListener('click', () => { overlay.remove(); document.removeEventListener('keydown', escH); this._showQuiz(); });
        return;
      }

      const q = pool[idx];
      const wrongPool = BRIDGE_DATA.filter(e => e.id !== q.id);
      const wrongs = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3).map(e => e.english_primary);
      const options = [...wrongs, q.english_primary].sort(() => Math.random() - 0.5);

      overlay.innerHTML = `
        <div class="bridge-modal bridge-quiz-modal">
          <button class="bridge-modal-close" id="qclose">✕</button>
          <div class="bridge-quiz-progress">
            <div class="bridge-quiz-progress-fill" style="width:${(idx/pool.length)*100}%"></div>
          </div>
          <div class="bridge-quiz-counter">${idx + 1} / ${pool.length}</div>
          <div class="bridge-quiz-question">${q.tr}</div>
          <div class="bridge-quiz-options">
            ${options.map(o => `<button class="bridge-quiz-opt" data-ans="${o}">${o}</button>`).join('')}
          </div>
          <div class="bridge-quiz-feedback" id="qfeedback"></div>
        </div>`;

      overlay.querySelector('#qclose').addEventListener('click', () => { overlay.remove(); document.removeEventListener('keydown', escH); });
      overlay.querySelectorAll('.bridge-quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          const correct = btn.dataset.ans === q.english_primary;
          if (correct) { score++; btn.classList.add('correct'); }
          else {
            btn.classList.add('wrong');
            overlay.querySelectorAll('.bridge-quiz-opt').forEach(b => {
              if (b.dataset.ans === q.english_primary) b.classList.add('correct');
            });
          }
          overlay.querySelectorAll('.bridge-quiz-opt').forEach(b => b.disabled = true);
          const fb = overlay.querySelector('#qfeedback');
          if (fb) fb.innerHTML = correct
            ? `<span style="color:#34d399">✓ Doğru!</span>`
            : `<span style="color:#f87171">✗ Doğru cevap: "${q.english_primary}"</span>`;
          setTimeout(() => { idx++; render(); }, 1200);
        });
      });
    };

    const escH = e => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escH); } };
    document.addEventListener('keydown', escH);
    document.body.appendChild(overlay);
    render();
  }

  /* ── Günlük Pratik ────────────────────────────────────────────── */
  _showDaily() {
    if (typeof BRIDGE_DATA === 'undefined') return;
    const today = new Date().toDateString();

    // Bugünkü 5 kart (seed = tarih)
    const seed = new Date().getDate() + new Date().getMonth() * 31;
    const dailyPool = [...BRIDGE_DATA]
      .filter((_, i) => i % 2 === seed % 2)
      .slice(seed % 20, (seed % 20) + 5);

    const overlay = document.createElement('div');
    overlay.className = 'bridge-modal-overlay';

    const doneToday = this.dailyDone.filter(d => d.date === today).map(d => d.id);
    const remaining = dailyPool.filter(e => !doneToday.includes(e.id));

    overlay.innerHTML = `
      <div class="bridge-modal bridge-daily-modal">
        <button class="bridge-modal-close" id="dclose">✕</button>
        <div class="bridge-daily-header">
          <div class="bridge-daily-title">📅 Günlük Pratik</div>
          <div class="bridge-daily-date">${new Date().toLocaleDateString('tr-TR', { weekday:'long', day:'numeric', month:'long' })}</div>
          <div class="bridge-daily-progress-row">
            <div class="bridge-daily-bar">
              <div class="bridge-daily-bar-fill" style="width:${(doneToday.length/dailyPool.length)*100}%"></div>
            </div>
            <span class="bridge-daily-frac">${doneToday.length}/${dailyPool.length}</span>
          </div>
        </div>
        <div class="bridge-daily-cards">
          ${dailyPool.map(e => {
            const done = doneToday.includes(e.id);
            return `
              <div class="bridge-daily-card ${done ? 'done' : ''}" data-id="${e.id}">
                <div class="bridge-daily-card-tr">${e.tr}</div>
                <div class="bridge-daily-card-en">${done ? `"${e.english_primary}"` : '—'}</div>
                ${done ? '<div class="bridge-daily-check">✓</div>' : '<button class="bridge-daily-reveal">Göster</button>'}
              </div>`;
          }).join('')}
        </div>
        ${remaining.length === 0 ? `<div class="bridge-daily-complete">🎉 Bugünkü pratik tamamlandı! Seri: ${this.streakData.count} gün 🔥</div>` : ''}
      </div>`;

    overlay.querySelector('#dclose').addEventListener('click', () => { overlay.remove(); document.removeEventListener('keydown', escH); });

    overlay.querySelectorAll('.bridge-daily-reveal').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.bridge-daily-card');
        const id   = parseInt(card.dataset.id);
        const entry = BRIDGE_DATA.find(e => e.id === id);
        if (!entry) return;
        card.querySelector('.bridge-daily-card-en').textContent = `"${entry.english_primary}"`;
        btn.remove();
        const check = document.createElement('div');
        check.className = 'bridge-daily-check'; check.textContent = '✓';
        card.appendChild(check);
        card.classList.add('done');
        this.dailyDone.push({ id, date: today });
        localStorage.setItem('bridge_daily_done', JSON.stringify(this.dailyDone));
        this._updateStreak();
        // progress bar güncelle
        const newDone = this.dailyDone.filter(d => d.date === today).length;
        const fill = overlay.querySelector('.bridge-daily-bar-fill');
        const frac = overlay.querySelector('.bridge-daily-frac');
        if (fill) fill.style.width = `${(newDone / dailyPool.length) * 100}%`;
        if (frac) frac.textContent = `${newDone}/${dailyPool.length}`;
        if (newDone === dailyPool.length) {
          const existing = overlay.querySelector('.bridge-daily-complete');
          if (!existing) {
            const msg = document.createElement('div');
            msg.className = 'bridge-daily-complete';
            msg.textContent = `🎉 Bugünkü pratik tamamlandı! Seri: ${this.streakData.count} gün 🔥`;
            overlay.querySelector('.bridge-daily-modal').appendChild(msg);
          }
        }
      });
    });

    const escH = e => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escH); } };
    document.addEventListener('keydown', escH);
    overlay.addEventListener('click', e => { if (e.target === overlay) { overlay.remove(); document.removeEventListener('keydown', escH); } });
    document.body.appendChild(overlay);
  }

  /* ── İstatistikler ────────────────────────────────────────────── */
  _showStats() {
    const catCounts = {};
    const typeCounts = { direct: 0, transform: 0, multiply: 0, disappear: 0, emerge: 0 };

    this.collection.forEach(item => {
      const cat = item.category || 'other';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
      (item.bridges || []).forEach(b => {
        if (typeCounts[b.bridge_type] !== undefined) typeCounts[b.bridge_type]++;
      });
    });

    const maxType = Math.max(...Object.values(typeCounts), 1);

    const overlay = document.createElement('div');
    overlay.className = 'bridge-modal-overlay';
    overlay.innerHTML = `
      <div class="bridge-modal bridge-stats-modal">
        <button class="bridge-modal-close" id="sclose">✕</button>
        <div class="bridge-stats-title">📊 İstatistiklerim</div>
        <div class="bridge-stats-grid">
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${this.bridgeCount}</div>
            <div class="bridge-stats-lbl">Toplam Köprü</div>
          </div>
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${this.collection.length}</div>
            <div class="bridge-stats-lbl">Koleksiyon</div>
          </div>
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${this.streakData.count}</div>
            <div class="bridge-stats-lbl">🔥 Seri</div>
          </div>
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${Math.round(this.flowScore)}%</div>
            <div class="bridge-stats-lbl">Akış Skoru</div>
          </div>
        </div>
        <div class="bridge-stats-section-title">Köprü Tipleri Dağılımı</div>
        <div class="bridge-stats-bars">
          ${Object.entries(typeCounts).map(([t, n]) => {
            const meta = this.BRIDGE_META[t];
            const pct = Math.round((n / maxType) * 100);
            return `
              <div class="bridge-stats-bar-row">
                <div class="bridge-stats-bar-lbl">${meta.label}</div>
                <div class="bridge-stats-bar-track">
                  <div class="bridge-stats-bar-fill" style="width:${pct}%;background:${meta.color}"></div>
                </div>
                <div class="bridge-stats-bar-num">${n}</div>
              </div>`;
          }).join('')}
        </div>
        <div class="bridge-stats-section-title">Arama Geçmişi</div>
        <div class="bridge-stats-history">
          ${this.searchHistory.length
            ? this.searchHistory.map(h => `<span class="bridge-stats-hist-item">${h}</span>`).join('')
            : '<span style="color:var(--text-3);font-size:0.8rem">Henüz arama yapılmadı.</span>'}
        </div>
      </div>`;

    overlay.querySelector('#sclose').addEventListener('click', () => { overlay.remove(); document.removeEventListener('keydown', escH); });
    overlay.addEventListener('click', e => { if (e.target === overlay) { overlay.remove(); document.removeEventListener('keydown', escH); } });
    const escH = e => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escH); } };
    document.addEventListener('keydown', escH);
    document.body.appendChild(overlay);
  }

  /* ── Onboarding Turu ──────────────────────────────────────────── */
  _startOnboarding() {
    const steps = [
      { sel: '#bridge-textarea',     title: 'Türkçe yaz',        text: 'Günlük bir ifade, deyim veya düşünce yaz.' },
      { sel: '#bridge-trigger-btn',  title: 'Köprü Kur',         text: 'Bu butona bas (veya Ctrl+Enter). Kavramsal dönüşüm başlar.' },
      { sel: '#bridge-cards-section',title: 'Köprü Kartları',     text: 'Her kart bir kavram bağlantısını gösterir. Tıklayınca açıklamayı görürsün.' },
      { sel: '#bridge-save-area',    title: 'Koleksiyona Ekle',   text: 'Beğendiklerini koleksiyonuna ekle, etiketle.' },
      { sel: '.bridge-explorer-section', title: 'Keşfet',         text: '250+ ifadeyi kategorilere göre veya arama ile keşfet.' },
    ];
    let step = 0;

    const tip = document.createElement('div');
    tip.className = 'bridge-onboard-tip';
    document.body.appendChild(tip);

    const show = () => {
      const s = steps[step];
      const target = this.el.querySelector(s.sel);
      if (!target) { next(); return; }
      const r = target.getBoundingClientRect();
      tip.innerHTML = `
        <div class="bridge-onboard-title">${s.title}</div>
        <div class="bridge-onboard-text">${s.text}</div>
        <div class="bridge-onboard-footer">
          <span>${step + 1} / ${steps.length}</span>
          <button class="bridge-onboard-next">${step < steps.length - 1 ? 'İleri →' : 'Tamam!'}</button>
        </div>`;
      const top = r.bottom + window.scrollY + 10;
      const left = Math.min(r.left, window.innerWidth - 260);
      tip.style.cssText = `display:block;top:${top}px;left:${Math.max(8, left)}px`;
      tip.querySelector('.bridge-onboard-next').addEventListener('click', next);
      target.classList.add('bridge-onboard-highlight');
    };

    const next = () => {
      const s = steps[step];
      this.el.querySelector(s.sel)?.classList.remove('bridge-onboard-highlight');
      step++;
      if (step >= steps.length) {
        tip.remove();
        this.onboarded = true;
        localStorage.setItem('bridge_onboarded', '1');
      } else { show(); }
    };

    show();
  }

}

window.BridgeModule = BridgeModule;
