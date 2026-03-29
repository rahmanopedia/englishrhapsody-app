class LeaderboardManager {
  constructor() {
    this._listeners   = {};
    this._currentPeriod = 'daily';
    this._mode        = 'xp';   // 'xp' | 'rival'
    this._rivalPeriod = 'weekly'; // 'weekly' | 'all'
  }

  /* ── Date helpers ───────────────────────────────── */
  _dailyKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  _weeklyKey() {
    const e = new Date(this._dailyKey() + 'T00:00:00Z');
    e.setUTCDate(e.getUTCDate() + 4 - (e.getUTCDay() || 7));
    const s = new Date(Date.UTC(e.getUTCFullYear(), 0, 1));
    const t = Math.ceil(((e - s) / 864e5 + 1) / 7);
    return `${e.getUTCFullYear()}-W${String(t).padStart(2,'0')}`;
  }
  _monthlyKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  }
  _periodKey(p) {
    if (p === 'daily')   return this._dailyKey();
    if (p === 'weekly')  return this._weeklyKey();
    if (p === 'monthly') return this._monthlyKey();
  }
  _periodId(p) { return `${p}_${this._periodKey(p)}`; }

  /* ── XP calculation ─────────────────────────────── */
  _calcXP(history) {
    const s = this._dailyKey(), t = s.slice(0, 7);
    const i = history[s] || 0;
    const a = new Date(s + 'T00:00:00Z').getTime();
    const d = Object.entries(history).filter(([l]) => {
      const n = new Date(l + 'T00:00:00Z').getTime();
      if (isNaN(n)) return false;
      const c = (a - n) / 864e5;
      return c >= 0 && c < 7;
    }).reduce((l, [, n]) => l + n, 0);
    const o = Object.entries(history).filter(([l]) => l.startsWith(t)).reduce((l, [, n]) => l + n, 0);
    return { dailyXP: i, weeklyXP: d, monthlyXP: o };
  }

  /* ── Write XP scores ────────────────────────────── */
  async updateScore() {
    const e = window.authManager;
    if (!e?.isLoggedIn || !e._db || !e.uid) return;
    const history  = window.app?.state?.get('history') || {};
    const level    = window.app?.state?.get('level') || 1;
    const name     = e.displayName || 'Kullanıcı';
    const uid      = e.uid;
    const { dailyXP, weeklyXP, monthlyXP } = this._calcXP(history);
    if (dailyXP === 0 && weeklyXP === 0 && monthlyXP === 0) return;
    const cefrLv = window.app?.state?.get('cefrLevel') || 'A1';
    const periods = [
      { id: this._periodId('daily'),   xp: Math.round(Math.max(0, dailyXP)) },
      { id: this._periodId('weekly'),  xp: Math.round(Math.max(0, weeklyXP)) },
      { id: this._periodId('monthly'), xp: Math.round(Math.max(0, monthlyXP)) }
    ];
    try {
      const b = e._db.batch();
      for (const h of periods) {
        const m = e._db.collection('leaderboards').doc(h.id).collection('users').doc(uid);
        b.set(m, { uid, name, xp: h.xp, level, cefrLevel: cefrLv, avatar: (name||'K')[0].toUpperCase(), updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
      }
      await b.commit();
      console.info('[Leaderboard] Skorlar başarıyla güncellendi:', dailyXP, 'XP');
    } catch(err) {
      console.error('[Leaderboard] Yazma hatası:', err.code, err.message);
    }
  }

  /* ── XP subscribe (30sn polling — onSnapshot yerine) ── */
  subscribe(period, cb) {
    this.unsubscribe(period);
    const e = window.authManager;
    if (!e?.isLoggedIn || !e._db) return;
    const query = e._db.collection('leaderboards').doc(this._periodId(period)).collection('users')
      .orderBy('xp', 'desc').limit(50);
    const fetch = () => query.get()
      .then(snap => { const d = []; snap.forEach(s => d.push(s.data())); cb(d); })
      .catch(err => console.error('[Leaderboard] Hata:', err.code, err.message));
    fetch();
    const id = setInterval(fetch, 30000);
    this._listeners[period] = () => clearInterval(id);
  }

  /* ── Rival subscribe (30sn polling) ─────────────── */
  subscribeRival(rPeriod, cb) {
    const key = 'rival_' + rPeriod;
    this.unsubscribe(key);
    const e = window.authManager;
    if (!e?.isLoggedIn || !e._db) return;
    const docId = rPeriod === 'weekly' ? `weekly_${this._weeklyKey()}` : 'all';
    const query = e._db.collection('rival_leaderboard').doc(docId).collection('users')
      .orderBy('wins', 'desc').limit(50);
    const fetch = () => query.get()
      .then(snap => { const d = []; snap.forEach(s => d.push(s.data())); cb(d); })
      .catch(err => console.error('[Rival LB] Hata:', err.code));
    fetch();
    const id = setInterval(fetch, 30000);
    this._listeners[key] = () => clearInterval(id);
  }

  /* ── Unsubscribe ────────────────────────────────── */
  unsubscribe(key) { if (this._listeners[key]) { this._listeners[key](); delete this._listeners[key]; } }
  unsubscribeAll() { Object.keys(this._listeners).forEach(k => this.unsubscribe(k)); }

  /* ── Render shell ───────────────────────────────── */
  render(el) {
    if (!el) return;
    el.innerHTML = `
      <div class="lb-shell">
        <div class="lb-header">
          <div class="lb-trophy-wrap">🏆</div>
          <h1 class="lb-title">Liderlik Tablosu</h1>
          <p class="lb-subtitle">Sıralama · 30 saniyede güncellenir</p>
        </div>
        <div class="lb-tabs">
          <button class="lb-tab active" data-period="daily">Günlük</button>
          <button class="lb-tab" data-period="weekly">Haftalık</button>
          <button class="lb-tab" data-period="monthly">Aylık</button>
          <button class="lb-tab lb-tab-rival" data-period="rival">⚔️ Rival</button>
        </div>
        <div class="lb-rival-tabs" id="lb-rival-tabs">
          <button class="lb-rtab active" data-rperiod="weekly">Bu Hafta</button>
          <button class="lb-rtab" data-rperiod="all">Tüm Zamanlar</button>
        </div>
        <div class="lb-list" id="lb-list">
          <div class="lb-loading"><div class="lb-spinner"></div><p>Yükleniyor…</p></div>
        </div>
        <div class="lb-my-rank" id="lb-my-rank" style="display:none">
          <span class="lb-mr-label">Senin sıran</span>
          <span class="lb-mr-val" id="lb-mr-val">—</span>
        </div>
      </div>`;

    this._mode = 'xp';
    this._currentPeriod = 'daily';
    this._listen('daily');

    if (!window._lbDelegateAttached) {
      window._lbDelegateAttached = true;
      document.addEventListener('click', ev => {
        const tab = ev.target.closest('.lb-tab');
        if (tab && window.leaderboardManager) { window.leaderboardManager.switchTab(tab.dataset.period, tab); return; }
        const rtab = ev.target.closest('.lb-rtab');
        if (rtab && window.leaderboardManager) { window.leaderboardManager.switchRivalTab(rtab.dataset.rperiod, rtab); }
      });
    }
  }

  /* ── Switch main tab ────────────────────────────── */
  switchTab(period, el) {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    this.unsubscribeAll();

    const list = document.getElementById('lb-list');
    if (list) list.innerHTML = '<div class="lb-loading"><div class="lb-spinner"></div><p>Yükleniyor…</p></div>';

    const rrTabs = document.getElementById('lb-rival-tabs');

    if (period === 'rival') {
      this._mode = 'rival';
      if (rrTabs) rrTabs.classList.add('lb-rival-tabs-show');
      this._listenRival(this._rivalPeriod);
    } else {
      this._mode = 'xp';
      if (rrTabs) rrTabs.classList.remove('lb-rival-tabs-show');
      this._currentPeriod = period;
      this._listen(period);
    }
  }

  /* ── Switch rival sub-tab ───────────────────────── */
  switchRivalTab(rPeriod, el) {
    if (this._mode !== 'rival') return;
    document.querySelectorAll('.lb-rtab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    this._rivalPeriod = rPeriod;
    this.unsubscribeAll();
    const list = document.getElementById('lb-list');
    if (list) list.innerHTML = '<div class="lb-loading"><div class="lb-spinner"></div><p>Yükleniyor…</p></div>';
    this._listenRival(rPeriod);
  }

  /* ── Internal listen helpers ────────────────────── */
  _listen(period) { this.subscribe(period, data => this._renderList(data, period)); }
  _listenRival(rPeriod) { this.subscribeRival(rPeriod, data => this._renderRivalList(data, rPeriod)); }

  /* ── Render XP list ─────────────────────────────── */
  _renderList(data, period) {
    const list = document.getElementById('lb-list');
    if (!list) return;
    const myUid = window.authManager?.uid;
    const label = { daily: 'bugün', weekly: 'bu hafta', monthly: 'bu ay' }[period];
    const medals = ['🥇','🥈','🥉'];
    if (!data.length) {
      list.innerHTML = '<div class="lb-empty">Henüz kimse yok — ilk sen ol! 🚀</div>';
      const rk = document.getElementById('lb-my-rank'); if (rk) rk.style.display = 'none';
      return;
    }
    list.innerHTML = data.map((r, i) => {
      const me = r.uid === myUid;
      const medal = i < 3 ? `<span class="lb-medal">${medals[i]}</span>` : `<span class="lb-medal lb-medal-num">${i+1}</span>`;
      return `<div class="lb-row ${me ? 'lb-row-me' : ''}">
        ${medal}
        <div class="lb-name">${this._esc(r.name)}${r.cefrLevel ? `<span class="lb-cefr-badge">${this._esc(r.cefrLevel)}</span>` : ''}</div>
        <div class="lb-right">
          <div class="lb-xp">${+r.xp|0} <span class="lb-xp-unit">XP ${this._esc(label)}</span></div>
          <div class="lb-lv">Lv.${+r.level||1}</div>
        </div>
      </div>`;
    }).join('');
    const idx = data.findIndex(r => r.uid === myUid);
    const rk = document.getElementById('lb-my-rank');
    const rv = document.getElementById('lb-mr-val');
    if (rk && rv) { if (idx !== -1) { rv.textContent = `#${idx+1}`; rk.style.display = 'flex'; } else { rk.style.display = 'none'; } }
  }

  /* ── Render rival list ──────────────────────────── */
  _renderRivalList(data, rPeriod) {
    const list = document.getElementById('lb-list');
    if (!list) return;
    const myUid = window.authManager?.uid;
    const medals = ['🥇','🥈','🥉'];
    if (!data.length) {
      list.innerHTML = '<div class="lb-empty">Henüz rakip maçı yok — ilk sen ol! ⚔️</div>';
      const rk = document.getElementById('lb-my-rank'); if (rk) rk.style.display = 'none';
      return;
    }
    list.innerHTML = data.map((r, i) => {
      const me = r.uid === myUid;
      const medal = i < 3 ? `<span class="lb-medal">${medals[i]}</span>` : `<span class="lb-medal lb-medal-num">${i+1}</span>`;
      const record = `${+r.wins||0}G · ${+r.losses||0}M · ${+r.ties||0}B`;
      const wr = `%${+r.winRate||0}`;
      return `<div class="lb-row lb-row-rival ${me ? 'lb-row-me' : ''}">
        ${medal}
        <div class="lb-name">${this._esc(r.name)}</div>
        <div class="lb-right">
          <div class="lb-rival-record">${record}</div>
          <div class="lb-rival-wr">${wr} kazanma</div>
        </div>
      </div>`;
    }).join('');
    const idx = data.findIndex(r => r.uid === myUid);
    const rk = document.getElementById('lb-my-rank');
    const rv = document.getElementById('lb-mr-val');
    if (rk && rv) { if (idx !== -1) { rv.textContent = `#${idx+1}`; rk.style.display = 'flex'; } else { rk.style.display = 'none'; } }
  }

  _esc(s) { return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

  async resetUserEntries() {
    const e = window.authManager;
    if (!e?.isLoggedIn || !e._db || !e.uid) return;
    const uid = e.uid;
    try {
      const b = e._db.batch();
      for (const p of ['daily','weekly','monthly']) {
        b.delete(e._db.collection('leaderboards').doc(this._periodId(p)).collection('users').doc(uid));
      }
      await b.commit();
      console.info('[Leaderboard] Kullanıcı sıralama verileri silindi');
    } catch(err) { console.warn('[Leaderboard] resetUserEntries error:', err); }
  }
}

window.leaderboardManager = new LeaderboardManager;
