/* ================================================================
   ENGLISH RHAPSODY — Notification Settings
   Kullanici bildirim tercihlerini y\u00F6net
   ================================================================ */

window.notificationSettings = {

  _defaults: {
    enabled:          true,
    dailyReminder:    true,
    streakReminder:   true,
    xpReminder:       true,
    speakingReminder: true,
  },

  async load() {
    if (!window.notificationsManager) return Object.assign({}, this._defaults);
    return await window.notificationsManager.getNotificationPrefs();
  },

  async save(prefs) {
    if (!window.notificationsManager) return;
    await window.notificationsManager.saveNotificationPrefs(prefs);
  },

  async toggle(key, value) {
    const prefs = await this.load();
    prefs[key]  = value;
    await this.save(prefs);
  },

  async enableAll() {
    await this.save(Object.assign({}, this._defaults, { enabled: true }));
  },

  async disableAll() {
    await this.save(Object.assign({}, this._defaults, { enabled: false }));
  },

  /**
   * Renders a minimal settings panel into the given container element.
   * Usage: notificationSettings.render(document.getElementById('notif-settings-container'))
   */
  async render(container) {
    if (!container) return;
    const prefs = await this.load();
    const items = [
      { key: 'enabled',          label: 'Bildirimleri Etkinle\u015Ftir' },
      { key: 'dailyReminder',    label: 'G\u00FCnl\u00FCk ders hat\u0131rlat\u0131c\u0131s\u0131' },
      { key: 'streakReminder',   label: 'Seri uyar\u0131s\u0131' },
      { key: 'xpReminder',       label: 'XP hedef hat\u0131rlat\u0131c\u0131s\u0131' },
      { key: 'speakingReminder', label: 'Konu\u015Fma pratiği hat\u0131rlat\u0131c\u0131s\u0131' },
    ];

    container.innerHTML = items.map(item => `
      <label class="notif-setting-row" style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border,#eee)">
        <span style="font-size:14px">${item.label}</span>
        <input type="checkbox" data-key="${item.key}" ${prefs[item.key] ? 'checked' : ''}
          style="width:18px;height:18px;cursor:pointer"
          onchange="notificationSettings.toggle('${item.key}', this.checked)">
      </label>
    `).join('');

    // Request permission button if not yet granted
    if (Notification.permission !== 'granted') {
      const btn = document.createElement('button');
      btn.textContent = '\uD83D\uDD14 Bildirimlere \u0130zin Ver';
      btn.style.cssText = 'margin-top:14px;padding:10px 20px;background:var(--accent,#6c63ff);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:14px;width:100%';
      btn.onclick = async () => {
        const ok = await window.notificationsManager?.requestPermission();
        btn.textContent = ok ? '\u2705 Bildirimler Aktif' : '\u274C \u0130zin Verilmedi';
        btn.disabled = true;
      };
      container.appendChild(btn);
    }
  },
};
