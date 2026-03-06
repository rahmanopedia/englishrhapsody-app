// ════════════════════════════════════════════════════════════════
//  LOGOS — Dil Zekası Motoru  |  GrammarMode Engine
// ════════════════════════════════════════════════════════════════

class GrammarMode {
  constructor(app) {
    this.app   = app;
    this.root  = null;
    this._drillState = null; // { rule, idx, forgeClicked, forgeWords }
  }

  init(root) {
    this.root = root;
    this._showLevels();
  }

  destroy() {
    if (this.root) this.root.innerHTML = '';
  }

  // ── Mastery helpers ──────────────────────────────────────────
  _getMastery() { return this.app.state.get('grammarMastery') || {}; }
  _setMastery(m) { this.app.state.set('grammarMastery', m); }
  _getRuleMastery(id) { return (this._getMastery()[id] || 0); }
  _setRuleMastery(id, stars) {
    const m = this._getMastery();
    m[id] = stars;
    this._setMastery(m);
  }
  _getLevelProgress(level) {
    const rules = GRAMMAR_DATA.rules.filter(r => r.level === level);
    const done  = rules.filter(r => this._getRuleMastery(r.id) >= 3).length;
    return { done, total: rules.length };
  }

  // ══════════════════════════════════════════════════════════════
  //  SCREEN 1 — Level Selector
  // ══════════════════════════════════════════════════════════════
  _showLevels() {
    const li = GRAMMAR_DATA.levelInfo;
    const cards = Object.entries(li).map(([lv, info]) => {
      const { done, total } = this._getLevelProgress(lv);
      const pct = total ? Math.round(done / total * 100) : 0;
      const circumference = 2 * Math.PI * 26;
      const dash = circumference - (pct / 100 * circumference);
      return `
        <button class="gl-level-card" style="--lv-color:${info.color};--lv-glow:${info.glow}"
                onclick="window.grammarMod._showRules('${lv}')">
          <div class="glc-ring">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
              <circle cx="32" cy="32" r="26" fill="none" stroke="${info.color}" stroke-width="4"
                stroke-dasharray="${circumference}" stroke-dashoffset="${dash}"
                stroke-linecap="round" transform="rotate(-90 32 32)"/>
            </svg>
            <div class="glc-ring-icon">${info.icon}</div>
          </div>
          <div class="glc-body">
            <div class="glc-level">${lv}</div>
            <div class="glc-label">${info.label}</div>
            <div class="glc-desc">${info.desc}</div>
            <div class="glc-prog">${done} / ${total} kural tamamlandı</div>
          </div>
          <div class="glc-arrow">›</div>
        </button>`;
    }).join('');

    this.root.innerHTML = `
      <div class="logos-shell">
        <div class="logos-header">
          <div class="logos-logo">⚗️</div>
          <h1 class="logos-title">LOGOS</h1>
          <p class="logos-sub">Dil Zekası Motoru — A1'den C2'ye Tam Müfredat</p>
        </div>
        <div class="gl-levels">${cards}</div>
        <p class="logos-hint">Her kural: DNA görselleştirme + 4 farklı alıştırma tipi + Türkçe karşılaştırma</p>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  SCREEN 2 — Rule List
  // ══════════════════════════════════════════════════════════════
  _showRules(level) {
    const info  = GRAMMAR_DATA.levelInfo[level];
    const rules = GRAMMAR_DATA.rules.filter(r => r.level === level);
    const { done, total } = this._getLevelProgress(level);

    // Group by category
    const cats = {};
    rules.forEach(r => { (cats[r.cat] = cats[r.cat] || []).push(r); });

    const sections = Object.entries(cats).map(([cat, catRules]) => `
      <div class="grl-category">
        <div class="grl-cat-label">${cat}</div>
        ${catRules.map(r => {
          const stars = this._getRuleMastery(r.id);
          const starRow = '⭐'.repeat(stars) + '☆'.repeat(Math.max(0, 3 - stars));
          return `
            <button class="grl-rule-card" onclick="window.grammarMod._showRule('${r.id}')">
              <span class="grl-icon">${r.icon}</span>
              <div class="grl-info">
                <div class="grl-title">${r.title}</div>
                <div class="grl-sub">${r.sub}</div>
              </div>
              <div class="grl-stars ${stars >= 3 ? 'mastered' : ''}">${starRow}</div>
            </button>`;
        }).join('')}
      </div>`).join('');

    this.root.innerHTML = `
      <div class="logos-shell">
        <div class="grl-header">
          <button class="logos-back" onclick="window.grammarMod._showLevels()">← Seviyeler</button>
          <div class="grl-level-badge" style="background:${info.color}20;color:${info.color};border-color:${info.color}40">
            ${info.icon} ${level} — ${info.label}
          </div>
          <div class="grl-progress">${done}/${total} tamamlandı</div>
        </div>
        <div class="grl-progbar-wrap">
          <div class="grl-progbar-fill" style="width:${total?Math.round(done/total*100):0}%;background:${info.color}"></div>
        </div>
        <div class="grl-list">${sections}</div>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════
  //  SCREEN 3 — Rule Detail (DNA View)
  // ══════════════════════════════════════════════════════════════
  _showRule(id) {
    const rule = GRAMMAR_DATA.rules.find(r => r.id === id);
    if (!rule) return;
    const info = GRAMMAR_DATA.levelInfo[rule.level];
    const stars = this._getRuleMastery(id);

    // DNA strand
    const dnaHtml = rule.dna.map((d, i) => `
      <div class="dna-base" style="--base-color:${d.c}" onclick="this.classList.toggle('revealed')">
        <div class="dna-word">${d.w}</div>
        <div class="dna-role">${d.r}</div>
      </div>`).join('');

    // Formula
    const formulaHtml = rule.formula.map(f =>
      f.t === '+' || f.t === '|' || f.t === '→'
        ? `<span class="formula-op">${f.t}</span>`
        : `<span class="formula-part" style="background:${f.c}20;color:${f.c};border-color:${f.c}40">${f.t}</span>`
    ).join('');

    // Examples
    const exsHtml = rule.exs.map(e => `
      <div class="rule-example" onclick="window.grammarMod._speak('${e.en.replace(/'/g,'\\\'').replace(/"/g,'&quot;')}')">
        <div class="rex-en">🔊 ${e.en}</div>
        <div class="rex-tr">${e.tr}</div>
      </div>`).join('');

    // Register radar
    const reg = rule.register || {};
    const regHtml = Object.entries(reg).map(([k, v]) => {
      const label = {formal:'Resmi', informal:'Gayriresmi', written:'Yazılı', spoken:'Sözlü'}[k] || k;
      return `<div class="reg-bar-wrap">
        <div class="reg-bar-label">${label}</div>
        <div class="reg-bar-track"><div class="reg-bar-fill" style="width:${v}%"></div></div>
        <div class="reg-bar-val">${v}%</div>
      </div>`;
    }).join('');

    const starRow = '⭐'.repeat(stars) + '☆'.repeat(Math.max(0, 3 - stars));

    this.root.innerHTML = `
      <div class="logos-shell rule-detail-shell">
        <div class="rd-header">
          <button class="logos-back" onclick="window.grammarMod._showRules('${rule.level}')">← ${rule.level} Kuralları</button>
          <div class="rd-stars">${starRow}</div>
        </div>

        <div class="rd-hero">
          <span class="rd-icon">${rule.icon}</span>
          <div>
            <div class="rd-title">${rule.title}</div>
            <div class="rd-sub">${rule.sub}</div>
          </div>
          <div class="rd-level-tag" style="background:${info.color}20;color:${info.color}">${rule.level}</div>
        </div>

        <div class="rd-desc">${rule.desc}</div>

        <!-- Formula bar -->
        <div class="rd-section-label">📐 Yapı Formülü</div>
        <div class="formula-bar">${formulaHtml}</div>

        <!-- DNA Strand -->
        <div class="rd-section-label">🧬 Cümle DNA'sı <span class="dna-tap-hint">— kelimelere dokun</span></div>
        <div class="dna-strand">${dnaHtml}</div>

        <!-- Turkish contrast -->
        <div class="rd-contrast">
          <div class="rd-contrast-label">🇹🇷 Türkçe Karşılaştırma</div>
          <div class="rd-contrast-text">${rule.contrast}</div>
        </div>

        <!-- Examples -->
        <div class="rd-section-label">💬 Örnekler <span class="dna-tap-hint">— sese dokun</span></div>
        <div class="rule-examples">${exsHtml}</div>

        <!-- Common error -->
        <div class="rd-error-box">
          <div class="rd-error-label">⚠️ Yaygın Hata</div>
          <div class="rd-error-wrong">✗ ${rule.err.w}</div>
          <div class="rd-error-right">✓ ${rule.err.r}</div>
          <div class="rd-error-tip">💡 ${rule.err.tip}</div>
        </div>

        <!-- Register radar -->
        ${regHtml ? `<div class="rd-section-label">📊 Kullanım Bağlamı</div><div class="reg-bars">${regHtml}</div>` : ''}

        <button class="logos-start-btn" onclick="window.grammarMod._startDrill('${rule.id}', 0)">
          ⚡ Alıştırmaları Başlat (${rule.drills.length} soru)
        </button>
      </div>`;

    // Animate DNA bases in
    setTimeout(() => {
      document.querySelectorAll('.dna-base').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }, 100);
  }

  _speak(text) {
    if (this.app && this.app.speakWord) this.app.speakWord(text);
  }

  // ══════════════════════════════════════════════════════════════
  //  SCREEN 4 — Drill
  // ══════════════════════════════════════════════════════════════
  _startDrill(ruleId, idx) {
    const rule  = GRAMMAR_DATA.rules.find(r => r.id === ruleId);
    if (!rule) return;
    const drill = rule.drills[idx];
    if (!drill) { this._completeRule(rule); return; }

    this._drillState = { rule, idx, forgeClicked: [], forgeWords: [] };

    const info = GRAMMAR_DATA.levelInfo[rule.level];
    const prog = `${idx + 1} / ${rule.drills.length}`;
    const pct  = Math.round((idx / rule.drills.length) * 100);

    const drillHtml = this._renderDrill(drill, rule);

    this.root.innerHTML = `
      <div class="logos-shell drill-shell">
        <div class="drill-topbar">
          <button class="logos-back" onclick="window.grammarMod._showRule('${rule.id}')">← ${rule.title}</button>
          <div class="drill-prog-label">${prog}</div>
        </div>
        <div class="drill-progbar-track">
          <div class="drill-progbar-fill" style="width:${pct}%;background:${info.color}"></div>
        </div>
        <div class="drill-rule-context">
          <span class="drill-rule-icon">${rule.icon}</span>
          <span class="drill-rule-name">${rule.title}</span>
          <span class="drill-level-tag" style="color:${info.color}">${rule.level}</span>
        </div>
        <div class="drill-card" id="drill-card">
          ${drillHtml}
        </div>
      </div>`;

    // Attach forge logic after render
    if (drill.type === 'forge') this._attachForge(drill, rule, idx);
  }

  _renderDrill(drill, rule) {
    if (drill.type === 'forge')     return this._renderForge(drill);
    if (drill.type === 'clash')     return this._renderClash(drill);
    if (drill.type === 'decode')    return this._renderDecode(drill);
    if (drill.type === 'mutate')    return this._renderMutate(drill);
    if (drill.type === 'transform') return this._renderTransform(drill);
    return '<p>Bilinmeyen alıştırma tipi</p>';
  }

  // ── FORGE: click words in order ──────────────────────────────
  _renderForge(drill) {
    const shuffled = [...drill.words].sort(() => 0.5 - Math.random());
    return `
      <div class="drill-type-badge forge-badge">🔨 FORGE — Cümle Kur</div>
      <div class="drill-prompt">${drill.prompt}</div>
      <div class="forge-answer-box" id="forge-answer"></div>
      <div class="forge-word-bank" id="forge-bank">
        ${shuffled.map((w, i) => `
          <button class="forge-word" data-word="${w}" data-idx="${i}" onclick="window.grammarMod._forgeClick(this)">
            ${w}
          </button>`).join('')}
      </div>
      <div class="drill-actions">
        <button class="drill-clear-btn" onclick="window.grammarMod._forgeClear()">↩ Temizle</button>
        <button class="drill-submit-btn" id="forge-submit" onclick="window.grammarMod._forgeSubmit()">✓ Kontrol Et</button>
      </div>`;
  }

  _attachForge(drill, rule, idx) {
    this._drillState.forgeClicked = [];
    this._drillState.forgeWords   = [...drill.words];
  }

  _forgeClick(btn) {
    if (btn.classList.contains('used')) return;
    btn.classList.add('used');
    this._drillState.forgeClicked.push(btn.dataset.word);
    const box = document.getElementById('forge-answer');
    if (box) box.innerHTML = this._drillState.forgeClicked.map(w =>
      `<span class="forge-placed">${w}</span>`).join(' ');
  }

  _forgeClear() {
    this._drillState.forgeClicked = [];
    document.querySelectorAll('.forge-word').forEach(b => b.classList.remove('used'));
    const box = document.getElementById('forge-answer');
    if (box) box.innerHTML = '';
  }

  _forgeSubmit() {
    const { rule, idx } = this._drillState;
    const drill  = rule.drills[idx];
    const answer = this._drillState.forgeClicked.join(' ').toLowerCase().replace(/[?.!,]/g, '').trim();
    const correct = drill.ans.toLowerCase().replace(/[?.!,]/g, '').trim();
    this._showResult(answer === correct, drill, rule, idx);
  }

  // ── CLASH: pick A or B ───────────────────────────────────────
  _renderClash(drill) {
    return `
      <div class="drill-type-badge clash-badge">⚔️ CLASH — Doğruyu Seç</div>
      <div class="drill-prompt">${drill.q}</div>
      <div class="clash-options">
        <button class="clash-btn" onclick="window.grammarMod._clashPick(this,'a')">
          <span class="clash-label">A</span>
          <span class="clash-text">${drill.a}</span>
        </button>
        <button class="clash-btn" onclick="window.grammarMod._clashPick(this,'b')">
          <span class="clash-label">B</span>
          <span class="clash-text">${drill.b}</span>
        </button>
      </div>`;
  }

  _clashPick(btn, choice) {
    if (document.querySelector('.clash-btn.picked')) return;
    btn.classList.add('picked');
    const { rule, idx } = this._drillState;
    const drill = rule.drills[idx];
    this._showResult(choice === drill.correct, drill, rule, idx);
  }

  // ── DECODE: MCQ about grammar role ──────────────────────────
  _renderDecode(drill) {
    const highlighted = drill.sentence.replace(
      new RegExp(`\\b${drill.target.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')}\\b`, 'gi'),
      `<mark class="decode-highlight">$&</mark>`
    );
    return `
      <div class="drill-type-badge decode-badge">🔍 DECODE — Grammatik Rol</div>
      <div class="decode-sentence">"${highlighted}"</div>
      <div class="drill-prompt">${drill.q}</div>
      <div class="decode-options">
        ${drill.opts.map((o, i) => `
          <button class="decode-opt" onclick="window.grammarMod._decodePick(this,${i})">
            ${o}
          </button>`).join('')}
      </div>`;
  }

  _decodePick(btn, choice) {
    if (document.querySelector('.decode-opt.picked')) return;
    btn.classList.add('picked');
    const { rule, idx } = this._drillState;
    const drill = rule.drills[idx];
    this._showResult(choice === drill.ans, drill, rule, idx);
  }

  // ── MUTATE: fill-in-the-blank MCQ ───────────────────────────
  _renderMutate(drill) {
    return `
      <div class="drill-type-badge mutate-badge">🧬 MUTATE — Boşluğu Doldur</div>
      <div class="mutate-sentence">${drill.sentence}</div>
      <div class="mutate-options">
        ${drill.opts.map((o, i) => `
          <button class="mutate-opt" onclick="window.grammarMod._mutatePick(this,${i})">
            ${o}
          </button>`).join('')}
      </div>`;
  }

  _mutatePick(btn, choice) {
    if (document.querySelector('.mutate-opt.picked')) return;
    btn.classList.add('picked');
    const { rule, idx } = this._drillState;
    const drill = rule.drills[idx];
    this._showResult(choice === drill.ans, drill, rule, idx);
  }

  // ── TRANSFORM: type the answer ───────────────────────────────
  _renderTransform(drill) {
    return `
      <div class="drill-type-badge transform-badge">⚡ TRANSFORM — Cümleyi Dönüştür</div>
      <div class="drill-prompt">${drill.prompt}</div>
      <input class="transform-input" id="transform-input" placeholder="Cevabını buraya yaz…"
             onkeydown="if(event.key==='Enter')window.grammarMod._transformSubmit()">
      <button class="drill-submit-btn" onclick="window.grammarMod._transformSubmit()">✓ Kontrol Et</button>`;
  }

  _transformSubmit() {
    const { rule, idx } = this._drillState;
    const drill = rule.drills[idx];
    const input = document.getElementById('transform-input');
    if (!input) return;
    const answer  = input.value.toLowerCase().replace(/[?.!,]/g,'').trim();
    const correct = drill.ans.toLowerCase().replace(/[?.!,]/g,'').trim();
    this._showResult(answer === correct, drill, rule, idx);
  }

  // ══════════════════════════════════════════════════════════════
  //  RESULT PANEL
  // ══════════════════════════════════════════════════════════════
  _showResult(isCorrect, drill, rule, idx) {
    if (this.app.audio) this.app.audio.play(isCorrect ? 'correct' : 'error');

    const card = document.getElementById('drill-card');
    if (!card) return;

    const tip = drill.tip || '';
    const correctAnswer = drill.ans || (drill.correct === 'a' ? drill.a : drill.b) || '';

    const html = isCorrect
      ? `<div class="result-banner correct-banner">
           <div class="result-icon">✅</div>
           <div class="result-title">Doğru!</div>
           ${tip ? `<div class="result-tip">${tip}</div>` : ''}
         </div>`
      : `<div class="result-banner wrong-banner">
           <div class="result-icon">❌</div>
           <div class="result-title">Yanlış</div>
           <div class="result-correct">✓ Doğru: <strong>${correctAnswer}</strong></div>
           ${tip ? `<div class="result-tip">💡 ${tip}</div>` : ''}
         </div>`;

    const nextIdx = idx + 1;
    const hasNext = nextIdx < rule.drills.length;

    card.innerHTML += html;

    // Add next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'drill-next-btn';
    nextBtn.innerHTML = hasNext ? 'Sonraki Soru →' : '🏁 Tamamla';
    nextBtn.onclick = () => {
      if (hasNext) {
        this._startDrill(rule.id, nextIdx);
      } else {
        this._completeRule(rule, isCorrect);
      }
    };
    card.appendChild(nextBtn);

    // Disable all interactive elements
    card.querySelectorAll('button:not(.drill-next-btn)').forEach(b => b.disabled = true);
    const inp = card.querySelector('input');
    if (inp) inp.disabled = true;
  }

  // ══════════════════════════════════════════════════════════════
  //  RULE COMPLETE
  // ══════════════════════════════════════════════════════════════
  _completeRule(rule) {
    const prev  = this._getRuleMastery(rule.id);
    const stars = Math.min(3, prev + 1);
    this._setRuleMastery(rule.id, stars);

    const xp = stars === 3 ? 50 : 20;
    this.app.addXP(xp);

    const info = GRAMMAR_DATA.levelInfo[rule.level];
    const { done, total } = this._getLevelProgress(rule.level);
    const levelMastered = done === total;

    if (levelMastered && typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 },
        colors: [info.color, '#fff', '#f59e0b'] });
    }

    this.root.innerHTML = `
      <div class="logos-shell">
        <div class="rule-complete-card">
          <div class="rc-icon">${stars === 3 ? '🏆' : '⭐'}</div>
          <div class="rc-title">${stars === 3 ? 'Kural Ustası!' : 'İyi İş!'}</div>
          <div class="rc-rule">${rule.icon} ${rule.title}</div>
          <div class="rc-stars">${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
          <div class="rc-xp">+${xp} XP kazandın</div>
          ${levelMastered
            ? `<div class="rc-level-badge" style="color:${info.color}">🎓 ${rule.level} seviyesi tamamlandı!</div>`
            : `<div class="rc-level-prog" style="color:${info.color}">${done}/${total} kural tamamlandı</div>`
          }
          <div class="rc-actions">
            <button class="btn btn-primary" onclick="window.grammarMod._showRules('${rule.level}')">
              Devam Et →
            </button>
            <button class="btn btn-ghost btn-sm" onclick="window.grammarMod._startDrill('${rule.id}', 0)">
              🔄 Tekrar
            </button>
          </div>
        </div>
      </div>`;
  }
}
