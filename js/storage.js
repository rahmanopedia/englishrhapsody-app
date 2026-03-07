/* ================================================================
   ENGLISH RHAPSODY — Firebase Storage Manager
   Kullanici ses kayitlarini storage/users/{uid}/recordings altinda saklar
   ================================================================ */

class StorageManager {
  constructor() {
    this._storage = null;
  }

  init() {
    if (!window._firebaseConfigured) return;
    try {
      this._storage = firebase.storage();
      console.info('[Storage] Initialized');
    } catch (e) {
      console.warn('[Storage] Init error:', e);
    }
  }

  get _uid()   { return window.authManager?.uid || null; }
  get _ready() { return !!(this._storage && this._uid); }

  // ── Upload ─────────────────────────────────────────────────

  /**
   * Ses kaydini Storage'a yukle
   * @param {Blob}   blob     - ses verisi (audio/webm vb.)
   * @param {string} filename - ornek: "speaking_2024-01-15T10-30-00.webm"
   * @returns {Promise<string|null>} download URL veya null
   */
  async uploadRecording(blob, filename) {
    if (!this._ready) return null;
    const path = `users/${this._uid}/recordings/${filename}`;
    try {
      const ref  = this._storage.ref(path);
      const meta = { contentType: blob.type || 'audio/webm' };
      const snap = await ref.put(blob, meta);
      const url  = await snap.ref.getDownloadURL();
      console.info('[Storage] Uploaded:', filename);
      return url;
    } catch (e) {
      console.warn('[Storage] Upload error:', e);
      return null;
    }
  }

  // ── Download ───────────────────────────────────────────────

  /**
   * Kaydin download URL'ini al
   * @param {string} filename
   * @returns {Promise<string|null>}
   */
  async getRecordingURL(filename) {
    if (!this._ready) return null;
    try {
      return await this._storage
        .ref(`users/${this._uid}/recordings/${filename}`)
        .getDownloadURL();
    } catch (e) {
      return null;
    }
  }

  /**
   * Tum kayitlari listele
   * @returns {Promise<Array<{name: string, url: string}>>}
   */
  async listRecordings() {
    if (!this._ready) return [];
    try {
      const list  = await this._storage
        .ref(`users/${this._uid}/recordings`)
        .listAll();
      return await Promise.all(
        list.items.map(async item => ({
          name: item.name,
          url:  await item.getDownloadURL(),
        }))
      );
    } catch (e) {
      console.warn('[Storage] List error:', e);
      return [];
    }
  }

  // ── Delete ─────────────────────────────────────────────────

  async deleteRecording(filename) {
    if (!this._ready) return;
    try {
      await this._storage
        .ref(`users/${this._uid}/recordings/${filename}`)
        .delete();
      console.info('[Storage] Deleted:', filename);
    } catch (e) {
      console.warn('[Storage] Delete error:', e);
    }
  }

  // ── Helpers ────────────────────────────────────────────────

  /** Zaman damgali dosya adi uret — ornek: "speaking_2024-01-15T10-30-00.webm" */
  generateFilename(prefix = 'rec') {
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `${prefix}_${ts}.webm`;
  }
}

window.storageManager = new StorageManager();
