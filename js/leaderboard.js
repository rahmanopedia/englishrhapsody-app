/* ================================================================
   ENGLISH RHAPSODY — Leaderboard Manager  v1.0
   Firebase Firestore real-time sıralama tablosu
   Günlük / Haftalık / Aylık — canlı onSnapshot güncelleme
   ================================================================ */

class LeaderboardManager {
  constructor() {
    this._listeners = {};
    this._currentPeriod = 'daily';
  }

  // ── Period key helpers ─────────────────────────────────────────

  _dailyKey() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }

  _weeklyKey() {
    // UTC bazlı ISO hafta hesabı — _dailyKey() ile tutarlı
    const d = new Date(this._dailyKey() + 'T00:00:00Z');
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week      = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  _monthlyKey() {
    // UTC bazlı — _dailyKey() ile tutarlı (yerel saat dilimine bağlı değil)
    return new Date().toISOString().slice(0, 7); // YYYY-MM
  }

  _periodKey(period) {
    if (period === 'daily')   return this._dailyKey();
    if (period === 'weekly')  return this._weeklyKey();
    if (period === 'monthly') return this._monthlyKey();
  }

  _periodId(period) {
    // Firestore path: leaderboards/{periodId}/users/{uid}
    // örn: leaderboards/daily_2026-03-08/users/abc123
    return `${period}_${this._periodKey(period)}`;
  }

  // ── Dönem XP hesaplama ─────────────────────────────────────────

  _calcXP(history) {
    const today       = this._dailyKey();
    const monthPrefix = today.slice(0, 7);

    const dailyXP = history[today] || 0;

    const todayMs  = new Date(today + 'T00:00:00Z').getTime();
    const weeklyXP = Object.entries(history)
      .filter(([d]) => {
        const dMs = new Date(d + 'T00:00:00Z').getTime();
        if (isNaN(dMs)) return false;
        const diff = (todayMs - dMs) / 86400000;
        return diff >= 0 && diff < 7;
      })
      .reduce((s, [, x]) => s + x, 0);

    const monthlyXP = Object.entries(history)
      .filter(([d]) => d.startsWith(monthPrefix))
      .reduce((s, [, x]) => s + x, 0);

    return { dailyXP, weeklyXP, monthlyXP };
  }

  // ── Firestore'a skor yaz ───────────────────────────────────────

  async updateScore() {
    const auth = window.authManager;
    if (!auth?.isLoggedIn || !auth._db || !auth.uid) return;

    const history = window.app?.state?.get('history') || {};
    const level   = window.app?.state?.get('level')   || 1;
    const name    = auth.displayName || 'Kullanıcı';
    const uid     = auth.uid;

    const { dailyXP, weeklyXP, monthlyXP } = this._calcXP(history);

    // XP 0 ise yazmaya gerek yok
    if (dailyXP === 0 && weeklyXP === 0 && monthlyXP === 0) return;

    const periods = [
      { id: this._periodId('daily'),   xp: Math.round(Math.max(0, dailyXP))   },
      { id: this._periodId('weekly'),  xp: Math.round(Math.max(0, weeklyXP))  },
      { id: this._periodId('monthly'), xp: Math.round(Math.max(0, monthlyXP)) },
    ];

    try {
      const batch = auth._db.batch();
      for (const p of periods) {
        const ref = auth._db
          .collection('leaderboards').doc(p.id)
          .collection('users').doc(uid);
        batch.set(ref, {
          uid, name, xp: p.xp, level,
          avatar: (auth.displayName || 'K')[0].toUpperCase(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
      }
      await batch.commit();
      console.info('[Leaderboard] Skorlar başarıyla güncellendi:', dailyXP, 'XP');
    } catch (e) {
      console.error('[Leaderboard] Yazma hatası (Firestore Kurallarını kontrol edin):', e.code, e.message);
    }
  }

  // ── Real-time dinleyici ────────────────────────────────────────

  subscribe(period, onUpdate) {
    this.unsubscribe(period);
    const auth = window.authManager;
    if (!auth?.isLoggedIn || !auth._db) return;

    const unsub = auth._db
      .collection('leaderboards').doc(this._periodId(period))
      .collection('users')
      .orderBy('xp', 'desc')
      .limit(50)
      .onSnapshot(
        snap => {
          const users = [];
          snap.forEach(doc => users.push(doc.data()));
          onUpdate(users);
        },
        err => {
          console.error('[Leaderboard] Dinleme hatası:', err.code, err.message);
          if (err.code === 'permission-denied') {
             console.warn('[Leaderboard] İpucu: Firestore kurallarında "leaderboards" koleksiyonuna okuma yetkisi vermelisiniz.');
          }
        }
      );

    this._listeners[period] = unsub;
  }

  unsubscribe(period) {
    if (this._listeners[period]) {
      this._listeners[period]();
      delete this._listeners[period];
    }
  }

  unsubscribeAll() {
    Object.keys(this._listeners).forEach(p => this.unsubscribe(p));
  }

  // ── UI ─────────────────────────────────────────────────────────

  render(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="lb-shell">
        <div class="lb-header">
          <div class="lb-trophy-wrap">🏆</div>
          <h1 class="lb-title">Liderlik Tablosu</h1>
          <p class="lb-subtitle">Canlı sıralama · Anlık güncellenir</p>
        </div>

        <div class="lb-tabs">
          <button class="lb-tab active" data-period="daily">Günlük</button>
          <button class="lb-tab" data-period="weekly">Haftalık</button>
          <button class="lb-tab" data-period="monthly">Aylık</button>
        </div>

        <div class="lb-list" id="lb-list">
          <div class="lb-loading"><div class="lb-spinner"></div><p>Yükleniyor…</p></div>
        </div>

        <div class="lb-my-rank" id="lb-my-rank" style="display:none">
          <span class="lb-mr-label">Senin sıran</span>
          <span class="lb-mr-val" id="lb-mr-val">—</span>
        </div>
      </div>`;

    this._currentPeriod = 'daily';
    this._listen('daily');

    if (!window._lbDelegateAttached) {
      window._lbDelegateAttached = true;
      document.addEventListener('click', e => {
        const tab = e.target.closest('.lb-tab');
        if (tab && window.leaderboardManager) {
          window.leaderboardManager.switchTab(tab.dataset.period, tab);
        }
      });
    }
  }

  switchTab(period, btn) {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    this.unsubscribeAll();
    this._currentPeriod = period;
    const el = document.getElementById('lb-list');
    if (el) el.innerHTML = '<div class="lb-loading"><div class="lb-spinner"></div><p>Yükleniyor…</p></div>';
    this._listen(period);
  }

  _listen(period) {
    this.subscribe(period, users => this._renderList(users, period));
  }

  _renderList(users, period) {
    const el = document.getElementById('lb-list');
    if (!el) return;

    const uid    = window.authManager?.uid;
    const labels = { daily: 'bugün', weekly: 'bu hafta', monthly: 'bu ay' };
    const label  = labels[period];
    const medals = ['🥇', '🥈', '🥉'];

    if (!users.length) {
      el.innerHTML = '<div class="lb-empty">Henüz kimse yok — ilk sen ol! 🚀</div>';
      const myEl = document.getElementById('lb-my-rank');
      if (myEl) myEl.style.display = 'none';
      return;
    }

    el.innerHTML = users.map((u, i) => {
      const isMe  = u.uid === uid;
      const rank  = i + 1;
      const medal = rank <= 3
        ? `<span class="lb-medal">${medals[i]}</span>`
        : `<span class="lb-medal lb-medal-num">${rank}</span>`;
      return `
        <div class="lb-row ${isMe ? 'lb-row-me' : ''}">
          ${medal}
          <div class="lb-name">${this._esc(u.name)}</div>
          <div class="lb-right">
            <div class="lb-xp">${u.xp} <span class="lb-xp-unit">XP ${label}</span></div>
            <div class="lb-lv">Lv.${u.level || 1}</div>
          </div>
        </div>`;
    }).join('');

    // Kendi sıram
    const myIdx   = users.findIndex(u => u.uid === uid);
    const myRankEl = document.getElementById('lb-my-rank');
    const myVal    = document.getElementById('lb-mr-val');
    if (myRankEl && myVal) {
      if (myIdx !== -1) {
        myVal.textContent      = `#${myIdx + 1}`;
        myRankEl.style.display = 'flex';
      } else {
        myRankEl.style.display = 'none';
      }
    }
  }

  _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ── Kullanıcı sıralama verilerini sıfırla ─────────────────────
  async resetUserEntries() {
    const auth = window.authManager;
    if (!auth?.isLoggedIn || !auth._db || !auth.uid) return;
    const uid = auth.uid;
    try {
      const batch = auth._db.batch();
      for (const period of ['daily', 'weekly', 'monthly']) {
        const ref = auth._db
          .collection('leaderboards').doc(this._periodId(period))
          .collection('users').doc(uid);
        batch.delete(ref);
      }
      await batch.commit();
      console.info('[Leaderboard] Kullanıcı sıralama verileri silindi');
    } catch(e) {
      console.warn('[Leaderboard] resetUserEntries error:', e);
    }
  }
}

window.leaderboardManager = new LeaderboardManager();
