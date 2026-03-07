/* ================================================================
   ENGLISH RHAPSODY — ElevenLabs TTS Engine
   Doğal sesli telaffuz motoru (IndexedDB cache'li)
   ================================================================ */

class ElevenLabsTTS {
  static MODEL    = 'eleven_turbo_v2_5';
  static DB_NAME  = 'rhapsody-el-cache';
  static DB_VER   = 1;

  // Önerilen sesler (id → label)
  static VOICES = {
    '21m00Tcm4TlvDq8ikWAM': 'Rachel — Kadın, Amerikan (Varsayılan)',
    'pNInz6obpgDQGcFmaJgB': 'Adam — Erkek, Amerikan',
    'TxGEqnHWrfWFTfGW9XjX': 'Josh — Erkek, Amerikan (Rahat)',
    'EXAVITQu4vr4xnSDxMaL': 'Bella — Kadın, Amerikan (Yumuşak)',
    'ErXwobaYiN019PkySvjV': 'Antoni — Erkek, İngiliz',
    'MF3mGyEYCl7XYWbV9V6O': 'Elli — Kadın, İngiliz',
    'AZnzlk1XvdvUeBnXmlld': 'Domi — Kadın, Amerikan (Güçlü)',
    'yoZ06aMxZJJ28mfd3POQ': 'Sam — Erkek, Amerikan (Rahat)',
  };

  constructor() {
    this._memCache = new Map(); // normalized_text -> ArrayBuffer
    this._pending  = new Map(); // text -> Promise (duplicate request guard)
    this._db       = null;
    this._currentAudio = null;
    this._initDB();
  }

  get apiKey()  { return localStorage.getItem('el_api_key')   || ''; }
  get voiceId() { return localStorage.getItem('el_voice_id')  || '21m00Tcm4TlvDq8ikWAM'; }
  get enabled() { return !!this.apiKey; }

  // ── IndexedDB ──────────────────────────────────────────────

  _initDB() {
    try {
      const req = indexedDB.open(ElevenLabsTTS.DB_NAME, ElevenLabsTTS.DB_VER);
      req.onupgradeneeded = (e) => {
        e.target.result.createObjectStore('audio', { keyPath: 'key' });
      };
      req.onsuccess = (e) => { this._db = e.target.result; };
    } catch {}
  }

  _dbGet(key) {
    return new Promise((res) => {
      if (!this._db) return res(null);
      try {
        const tx  = this._db.transaction('audio', 'readonly');
        const req = tx.objectStore('audio').get(key);
        req.onsuccess = () => res(req.result ? req.result.buf : null);
        req.onerror   = () => res(null);
      } catch { res(null); }
    });
  }

  _dbSet(key, buf) {
    if (!this._db) return;
    try {
      const tx = this._db.transaction('audio', 'readwrite');
      tx.objectStore('audio').put({ key, buf });
    } catch {}
  }

  // ── Public API ─────────────────────────────────────────────

  /**
   * Metni seslendir.
   * @returns {Promise<boolean>} true = başarılı, false = başarısız
   */
  async speak(text, onEnd) {
    if (!this.enabled) return false;
    const key = text.trim().toLowerCase().slice(0, 500);

    this.stop();

    // Duplicate request guard
    if (this._pending.has(key)) {
      const buf = await this._pending.get(key);
      if (buf) return this._play(buf, onEnd);
      return false;
    }

    // Memory cache
    if (this._memCache.has(key)) {
      return this._play(this._memCache.get(key), onEnd);
    }

    // IndexedDB cache
    const cached = await this._dbGet(key);
    if (cached) {
      this._memCache.set(key, cached);
      return this._play(cached, onEnd);
    }

    // Fetch from API
    const fetchPromise = this._fetch(text);
    this._pending.set(key, fetchPromise);
    const buf = await fetchPromise;
    this._pending.delete(key);

    if (buf) {
      this._memCache.set(key, buf);
      this._dbSet(key, buf);
      return this._play(buf, onEnd);
    }

    return false;
  }

  stop() {
    if (this._currentAudio) {
      this._currentAudio.pause();
      this._currentAudio.currentTime = 0;
      this._currentAudio = null;
    }
  }

  // ── Internal ───────────────────────────────────────────────

  async _fetch(text) {
    try {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key':    this.apiKey,
            'Content-Type':  'application/json',
            'Accept':        'audio/mpeg',
          },
          body: JSON.stringify({
            text,
            model_id: ElevenLabsTTS.MODEL,
            voice_settings: {
              stability:        0.45,
              similarity_boost: 0.80,
              style:            0.0,
              use_speaker_boost: true,
            },
          }),
        }
      );
      if (!res.ok) {
        console.warn('[ElevenLabs] API error:', res.status, res.statusText);
        return null;
      }
      return await res.arrayBuffer();
    } catch (e) {
      console.warn('[ElevenLabs] Fetch failed:', e.message);
      return null;
    }
  }

  _play(buf, onEnd) {
    try {
      const blob = new Blob([buf], { type: 'audio/mpeg' });
      const url  = URL.createObjectURL(blob);
      const audio = new Audio(url);
      this._currentAudio = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        this._currentAudio = null;
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        this._currentAudio = null;
        if (onEnd) onEnd();
      };
      audio.play();
      return true;
    } catch {
      return false;
    }
  }

  // ── Cache management ───────────────────────────────────────

  async clearCache() {
    this._memCache.clear();
    if (!this._db) return;
    try {
      const tx = this._db.transaction('audio', 'readwrite');
      tx.objectStore('audio').clear();
    } catch {}
  }

  async getCacheSize() {
    return new Promise((res) => {
      if (!this._db) return res(0);
      try {
        const tx  = this._db.transaction('audio', 'readonly');
        const req = tx.objectStore('audio').count();
        req.onsuccess = () => res(req.result);
        req.onerror   = () => res(0);
      } catch { res(0); }
    });
  }
}

// Global singleton
window._elTTS = new ElevenLabsTTS();
