/**
 * English Rhapsody — Premium Dictionary Engine v7 Ultimate
 * Truly premium + effective learning experience with Mastery Drawer.
 */
'use strict';

class DictionaryEngine {
  constructor() {
    this.words = [];
    this.searchTerm = '';
    this.searchTimeout = null;
    this.focusedIdx = -1;
    this.autoFocusedIdx = -1;
    this.filteredList = [];
    this.sortBy = 'relevance';
    this.viewMode = localStorage.getItem('dict_view') || 'comfort';

    // LocalStorage states
    this.favorites = JSON.parse(localStorage.getItem('dict_favs') || '[]');
    this.learned = JSON.parse(localStorage.getItem('dict_learned') || '[]');

    // Fallback data for 20 common words
    this.fallbackData = {
      'apple': { ex: 'I ate a red apple for breakfast.', coll: ['red apple', 'apple pie', 'eat an apple'] },
      'book': { ex: 'She is reading a very interesting book.', coll: ['read a book', 'write a book', 'book store'] },
      'water': { ex: 'Drink plenty of water every day.', coll: ['drinking water', 'glass of water', 'cold water'] },
      'house': { ex: 'They live in a big house in the city.', coll: ['big house', 'build a house', 'at home'] },
      'car': { ex: 'He drives a fast electric car.', coll: ['drive a car', 'buy a car', 'car wash'] },
      'sun': { ex: 'The sun rises in the east.', coll: ['bright sun', 'sun light', 'sunset'] },
      'moon': { ex: 'The moon shines brightly at night.', coll: ['full moon', 'moon light', 'new moon'] },
      'tree': { ex: 'Birds are singing on the tree.', coll: ['tall tree', 'climb a tree', 'fruit tree'] },
      'friend': { ex: 'A best friend is someone you can trust.', coll: ['best friend', 'old friend', 'make friends'] },
      'school': { ex: 'Children go to school to learn.', coll: ['go to school', 'high school', 'school bag'] },
      'coffee': { ex: 'I need a hot cup of coffee.', coll: ['hot coffee', 'black coffee', 'coffee shop'] },
      'music': { ex: 'She loves listening to classical music.', coll: ['listen to music', 'play music', 'music video'] },
      'time': { ex: 'What time is it right now?', coll: ['on time', 'free time', 'spend time'] },
      'work': { ex: 'He goes to work by bus.', coll: ['hard work', 'go to work', 'at work'] },
      'love': { ex: 'Love is the most powerful emotion.', coll: ['true love', 'in love', 'love story'] },
      'world': { ex: 'We want to travel the whole world.', coll: ['around the world', 'world map', 'modern world'] },
      'life': { ex: 'Life is full of surprises.', coll: ['daily life', 'happy life', 'quality of life'] },
      'city': { ex: 'Istanbul is a very crowded city.', coll: ['big city', 'city center', 'city life'] },
      'food': { ex: 'Turkish food is famous worldwide.', coll: ['delicious food', 'fast food', 'healthy food'] },
      'phone': { ex: 'I left my phone on the table.', coll: ['mobile phone', 'smart phone', 'answer the phone'] }
    };

    // Quick discovery categories
    this.quickCats = ['Seyahat', 'İş', 'Günlük', 'Zaman', 'Duygular', 'Doğa'];

    // Bindings
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closeAutocomplete = this.closeAutocomplete.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  init() {
    console.log('DictionaryEngine v7: Initializing Mastery Drawer...');
    
    if (typeof WORDS !== 'undefined') {
      this.words = [...WORDS];
    } else {
      console.error('DictionaryEngine: WORDS dataset not found!');
      return;
    }

    this.setupSearch();
    this.setView(this.viewMode);
    
    // Initial Render
    this.render();
    this.renderDiscovery();

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dict-search-wrapper')) {
        this.closeAutocomplete();
      }
    });

    // Create toast container
    if (!document.getElementById('dict-toast-container')) {
      const tc = document.createElement('div');
      tc.id = 'dict-toast-container';
      document.body.appendChild(tc);
    }
  }

  setupSearch() {
    const input = document.getElementById('dic-search');
    if (!input) return;

    input.value = this.searchTerm;
    input.oninput = this.handleSearch;
    input.onkeydown = this.handleKeyDown;
    input.onfocus = () => { if (this.searchTerm.length > 0) this.renderAutocomplete(); };
    input.focus();

    this.toggleClearBtn();
  }

  toggleClearBtn() {
    const clearBtn = document.getElementById('dic-clear');
    if (clearBtn) clearBtn.style.display = this.searchTerm.length > 0 ? 'flex' : 'none';
  }

  clearSearch() {
    const input = document.getElementById('dic-search');
    if (input) {
      input.value = '';
      this.searchTerm = '';
      this.toggleClearBtn();
      this.render();
      this.renderDiscovery(); // Re-roll random words
      input.focus();
    }
  }

  handleSearch(e) {
    clearTimeout(this.searchTimeout);
    this.searchTerm = e.target.value.toLowerCase().trim();
    this.toggleClearBtn();

    if (this.searchTerm.length === 0) {
      this.closeAutocomplete();
      this.render();
      return;
    }

    this.searchTimeout = setTimeout(() => {
      this.autoFocusedIdx = -1;
      this.focusedIdx = -1;
      this.renderAutocomplete();
      this.render();
    }, 70);
  }

  setView(mode) {
    this.viewMode = mode;
    localStorage.setItem('dict_view', mode);
    
    const comfortBtn = document.getElementById('btn-view-comfort');
    const compactBtn = document.getElementById('btn-view-compact');
    
    if (comfortBtn) comfortBtn.classList.toggle('active', mode === 'comfort');
    if (compactBtn) compactBtn.classList.toggle('active', mode === 'compact');

    this.render();
  }

  handleSort(val) {
    this.sortBy = val;
    this.render();
  }

  handleKeyDown(e) {
    const autoContainer = document.getElementById('dic-autocomplete');
    const isAutoOpen = autoContainer && autoContainer.style.display === 'flex';
    const autoRows = document.querySelectorAll('.ds-auto-row');
    const cards = document.querySelectorAll('#dic-results .d-card');
    const drawer = document.getElementById('dict-drawer');
    const isDrawerOpen = drawer && drawer.classList.contains('active');

    // Handle Drawer close on Escape
    if (e.key === 'Escape' && isDrawerOpen) {
      this.closeDrawer();
      return;
    }

    if (isAutoOpen && autoRows.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.autoFocusedIdx = Math.min(this.autoFocusedIdx + 1, autoRows.length - 1);
        this.updateAutoHighlight(autoRows);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.autoFocusedIdx = Math.max(this.autoFocusedIdx - 1, 0);
        this.updateAutoHighlight(autoRows);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const idx = this.autoFocusedIdx === -1 ? 0 : this.autoFocusedIdx;
        if (autoRows[idx]) autoRows[idx].click();
        return;
      }
    }

    if (e.key === 'ArrowDown' && !isDrawerOpen) {
      e.preventDefault();
      this.focusedIdx = Math.min(this.focusedIdx + 1, cards.length - 1);
      this.updateCardFocus(cards);
    } else if (e.key === 'ArrowUp' && !isDrawerOpen) {
      e.preventDefault();
      this.focusedIdx = Math.max(this.focusedIdx - 1, 0);
      this.updateCardFocus(cards);
    } else if (e.key === 'Enter' && !isDrawerOpen && this.focusedIdx > -1) {
       e.preventDefault();
       if(cards[this.focusedIdx]) cards[this.focusedIdx].click();
    } else if (e.key === 'Escape') {
      if (isAutoOpen) this.closeAutocomplete();
      else this.clearSearch();
    }
  }

  updateAutoHighlight(rows) {
    rows.forEach((r, i) => r.classList.toggle('active', i === this.autoFocusedIdx));
  }

  updateCardFocus(cards) {
    cards.forEach((c, i) => c.classList.toggle('active', i === this.focusedIdx));
    if (cards[this.focusedIdx]) {
      cards[this.focusedIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  closeAutocomplete() {
    const autoContainer = document.getElementById('dic-autocomplete');
    if (autoContainer) autoContainer.style.display = 'none';
    this.autoFocusedIdx = -1;
  }

  selectWord(wordEn) {
    const input = document.getElementById('dic-search');
    if (input) input.value = wordEn;
    this.searchTerm = wordEn.toLowerCase();
    this.toggleClearBtn();
    this.closeAutocomplete();
    this.render();
    
    setTimeout(() => {
      this.focusedIdx = 0;
      const cards = document.querySelectorAll('#dic-results .d-card');
      this.updateCardFocus(cards);
    }, 100);
  }

  highlightText(text, term) {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Best-effort POS tag guesser based on Turkish meaning suffix if raw data lacks it
  getPosTag(w) {
    if (w.pos) return w.pos; 
    const tr = w.tr.toLowerCase();
    if (tr.endsWith('mek') || tr.endsWith('mak')) return 'v.';
    if (tr.endsWith('lı') || tr.endsWith('li') || tr.endsWith('lu') || tr.endsWith('lü')) return 'adj.';
    if (tr.endsWith('en') || tr.endsWith('an')) return 'adv.';
    return 'n.';
  }

  getFilteredResults() {
    const s = this.searchTerm;
    if (!s) return [];

    let filtered = this.words.filter(w => 
      w.en.toLowerCase().includes(s) || 
      w.tr.toLowerCase().includes(s) || 
      (w.cat && w.cat.toLowerCase().includes(s))
    );

    if (this.sortBy === 'az') {
      filtered.sort((a, b) => a.en.localeCompare(b.en));
    } else if (this.sortBy === 'level') {
      const lvls = { 'A1':1, 'A2':2, 'B1':3, 'B2':4, 'C1':5, 'C2':6 };
      filtered.sort((a, b) => (lvls[a.level] || 0) - (lvls[b.level] || 0) || a.en.localeCompare(b.en));
    } else {
      filtered.sort((a, b) => {
        const getScore = (w) => {
          const en = w.en.toLowerCase();
          if (en === s) return 1000;
          if (en.startsWith(s)) return 100;
          if (en.includes(s)) return 80;
          if (w.tr.toLowerCase().includes(s)) return 60;
          return 0;
        };
        return getScore(b) - getScore(a) || a.en.localeCompare(b.en);
      });
    }
    return filtered;
  }

  renderDiscovery() {
    const catContainer = document.getElementById('dic-quick-cats');
    const randContainer = document.getElementById('dic-random-words');
    if (!catContainer || !randContainer) return;

    catContainer.innerHTML = this.quickCats.map(cat => 
      `<div class="ds-chip" onclick="window.DictionaryEngine.selectWord('${cat}')">🔍 ${cat}</div>`
    ).join('');

    if (this.words.length > 0) {
      const shuffled = [...this.words].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      randContainer.innerHTML = selected.map((w, idx) => this.createCardHTML(w, false, -1, idx)).join('');
    }
  }

  renderAutocomplete() {
    const container = document.getElementById('dic-autocomplete');
    if (!container) return;

    const filtered = this.getFilteredResults();
    if (filtered.length === 0 || this.searchTerm.length < 2) {
      container.style.display = 'none';
      return;
    }

    const exact = filtered.filter(w => w.en.toLowerCase().startsWith(this.searchTerm)).slice(0, 4);
    const related = filtered.filter(w => !exact.includes(w)).slice(0, 4);

    let html = '';
    if (exact.length > 0) {
      html += `<div class="ds-auto-group"><div class="ds-auto-header">En Alakalı</div>`;
      html += exact.map(w => this.createAutoRow(w)).join('');
      html += `</div>`;
    }
    if (related.length > 0) {
      html += `<div class="ds-auto-group"><div class="ds-auto-header">Benzer Yazımlar</div>`;
      html += related.map(w => this.createAutoRow(w)).join('');
      html += `</div>`;
    }

    container.innerHTML = html;
    container.style.display = 'flex';
  }

  createAutoRow(w) {
    return `
      <div class="ds-auto-row" onclick="window.DictionaryEngine.selectWord('${w.en.replace(/'/g, "\\'")}')">
        <span class="ds-auto-lvl">${w.level}</span>
        <span class="ds-auto-word">${this.highlightText(w.en, this.searchTerm)}</span>
        <span class="ds-auto-tr">${w.tr}</span>
      </div>`;
  }

  render() {
    const container = document.getElementById('dic-results');
    const discovery = document.getElementById('dic-discovery');
    const countEl = document.getElementById('dic-count');
    const controls = document.getElementById('dic-controls');
    const dictCont = document.querySelector('.dict-container');

    if (!container || !discovery) return;

    if (this.searchTerm.length === 0) {
      container.innerHTML = '';
      container.className = 'dict-grid';
      discovery.style.display = 'block';
      if (controls) controls.style.display = 'none';
      if (countEl) countEl.textContent = '0 sonuç';
      if (dictCont) dictCont.classList.remove('has-results');
      return;
    }

    discovery.style.display = 'none';
    if (controls) controls.style.display = 'flex';
    if (dictCont) dictCont.classList.add('has-results');

    const filtered = this.getFilteredResults();
    this.filteredList = filtered;
    if (countEl) countEl.textContent = `${filtered.length} sonuç`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="dict-empty-state" style="animation: fadeIn 0.4s ease both;">
          <div class="hint-icon">🔍</div>
          <h2>Sonuç bulunamadı</h2>
          <p>"${this.searchTerm}" için bir eşleşme yok. Farklı bir kelime veya yazım denemeye ne dersin?</p>
        </div>`;
      container.className = 'dict-grid';
      return;
    }

    // Standard Grid Render for ALL states
    container.className = `dict-grid view-${this.viewMode}`;
    let html = '';
    
    // Exact match highlighted if it's the very top
    const bestMatch = filtered[0].en.toLowerCase() === this.searchTerm ? filtered[0] : null;
    const remaining = bestMatch ? filtered.slice(1, 101) : filtered.slice(0, 100);

    if (bestMatch && this.viewMode === 'comfort') {
      html += this.createCardHTML(bestMatch, true, 0, 0);
    } else if (bestMatch) {
      html += this.createCardHTML(bestMatch, false, 0, 0);
    }

    html += remaining.map((w, idx) => this.createCardHTML(w, false, idx + (bestMatch ? 1 : 0), idx + (bestMatch ? 1 : 0))).join('');
    container.innerHTML = html;
  }

  createCardHTML(w, isBest = false, fIdx = -1, delayIdx = 0) {
    const isFav = this.favorites.includes(w.en);
    const isLrn = this.learned.includes(w.en);
    const safeEn = w.en.replace(/'/g, "\\'");
    const delay = Math.min(delayIdx * 0.05, 0.5); 
    const pos = this.getPosTag(w);
    
    return `
    <div class="d-card lvl-${w.level} ${isBest ? 'best-match' : ''} ${isLrn ? 'is-learned' : ''} ${fIdx === this.focusedIdx && fIdx !== -1 ? 'active' : ''}" 
         style="animation-delay: ${delay}s;"
         onclick="if(!event.target.closest('.d-btn')) window.DictionaryEngine.openDrawer('${safeEn}')">
      
      <div class="d-card-content">
        <div class="d-card-level">${w.level}</div>
        <div class="d-card-word-row">
          <div class="d-card-word">${this.highlightText(w.en, this.searchTerm)}</div>
          <span class="d-card-pos">${pos}</span>
          <div class="d-card-ipa">${w.ipa || ''}</div>
        </div>
        <div class="d-card-tr">${this.highlightText(w.tr, this.searchTerm)}</div>
        
        <div class="d-card-cat-tag">
          ${w.icon || '📚'} ${w.cat || 'Genel'}
        </div>

        <div class="d-card-actions">
          <button class="d-btn play-btn" onclick="app.speakWord('${safeEn}')" title="Dinle">🔊</button>
          <button class="d-btn fav-btn ${isFav ? 'active' : ''}" onclick="window.DictionaryEngine.toggleFavorite('${safeEn}', this)" title="Favori">⭐</button>
          <button class="d-btn learned-btn ${isLrn ? 'active' : ''}" onclick="window.DictionaryEngine.toggleLearned('${safeEn}', this)" title="Öğrenildi">✅</button>
        </div>
      </div>
      ${isLrn ? '<div class="learned-badge">Öğrenildi</div>' : ''}
    </div>`;
  }

  // --- Drawer Mastery Panel ---

  openDrawer(wordEn) {
    const w = this.words.find(x => x.en === wordEn);
    if (!w) return;

    const drawer = document.getElementById('dict-drawer');
    const overlay = document.getElementById('dict-drawer-overlay');
    const content = document.getElementById('drawer-content');
    
    if (!drawer || !overlay || !content) return;

    const data = this.fallbackData[w.en.toLowerCase()] || { ex: 'Örnek cümle yakında eklenecek.', coll: [] };
    const pos = this.getPosTag(w);
    const safeEn = w.en.replace(/'/g, "\\'");

    content.innerHTML = `
      <div class="learning-panel">
        <div class="drawer-hero">
          <div class="dh-word-row">
            <h2 class="dh-word">${w.en}</h2>
            <span class="dh-pos">${pos}</span>
            <span class="dh-ipa">${w.ipa || ''}</span>
          </div>
          <div class="dh-actions">
            <button class="dh-btn play" onclick="app.speakWord('${safeEn}')">🔊 Dinle</button>
            <button class="dh-btn" onclick="window.DictionaryEngine.copyToClipboard('${w.en} - ${w.tr}')" title="Kopyala">📋</button>
          </div>
        </div>

        <div class="lp-tr">${w.tr}</div>

        <div class="lp-section">
          <div class="lp-section-title">📖 Örnek Cümle</div>
          <div class="lp-example">"${data.ex}"</div>
        </div>
        
        ${data.coll.length > 0 ? `
          <div class="lp-section">
            <div class="lp-section-title">🔗 Yaygın Kullanımlar</div>
            <div class="lp-colloc-grid">
              ${data.coll.map(c => `<span class="lp-colloc-tag">${c}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <div class="lp-quiz">
          <div class="lp-section-title">🧠 Mini Test</div>
          <div class="lp-quiz-q">"${w.en}" kelimesinin Türkçe karşılığı hangisidir?</div>
          <div class="lp-quiz-options">
            <button class="lp-quiz-btn" onclick="window.DictionaryEngine.checkQuiz(true, this)">${w.tr}</button>
            <button class="lp-quiz-btn" onclick="window.DictionaryEngine.checkQuiz(false, this)">Bilinmeyen anlam</button>
            <button class="lp-quiz-btn" onclick="window.DictionaryEngine.checkQuiz(false, this)">Zıt anlamlısı</button>
          </div>
        </div>
      </div>
    `;

    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeDrawer() {
    const drawer = document.getElementById('dict-drawer');
    const overlay = document.getElementById('dict-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('📋 Kopyalandı', 'success');
    });
  }

  checkQuiz(correct, btn) {
    if (correct) {
      btn.style.background = 'rgba(16, 185, 129, 0.2)';
      btn.style.borderColor = '#10b981';
      this.showToast('✅ Harika! Doğru cevap.', 'success');
    } else {
      btn.style.background = 'rgba(255, 71, 87, 0.2)';
      btn.style.borderColor = '#ff4757';
      this.showToast('❌ Yanlış cevap, tekrar dene.', 'error');
    }
  }

  // --- Actions ---

  toggleFavorite(en, btn) {
    const idx = this.favorites.indexOf(en);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
      btn.classList.remove('active');
    } else {
      this.favorites.push(en);
      btn.classList.add('active');
      this.showToast('⭐ Favorilere eklendi', 'fav');
    }
    localStorage.setItem('dict_favs', JSON.stringify(this.favorites));
  }

  toggleLearned(en, btn) {
    const idx = this.learned.indexOf(en);
    const card = btn.closest('.d-card');
    
    if (idx > -1) {
      this.learned.splice(idx, 1);
      btn.classList.remove('active');
      if (card) {
        card.classList.remove('is-learned');
        const b = card.querySelector('.learned-badge');
        if (b) b.remove();
      }
    } else {
      this.learned.push(en);
      btn.classList.add('active');
      if (card) {
        card.classList.add('is-learned');
        if (!card.querySelector('.learned-badge')) {
          const b = document.createElement('div');
          b.className = 'learned-badge';
          b.textContent = 'Öğrenildi';
          card.appendChild(b);
        }
      }
      this.showToast('✅ Öğrenildi olarak işaretlendi', 'learned');
    }
    localStorage.setItem('dict_learned', JSON.stringify(this.learned));
  }

  showToast(msg, type) {
    const container = document.getElementById('dict-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `dict-toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('closing');
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }
}

// Global instance
window.DictionaryEngine = new DictionaryEngine();
