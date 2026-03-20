/**
 * English Rhapsody — Gemini AI Entegrasyonu
 *
 * Öncelik sırası:
 *  1. Firebase AI Logic (key gerekmez, konsol aktive edilmişse)
 *  2. Google AI Studio REST API (sp_gemini_key localStorage'da varsa)
 *  3. Hata — window._fbAI.getError() ile görülebilir
 */

// ── 1. Firebase AI Logic denemesi ──────────────────────────────────────────

let _model     = null;
let _lastError = null;

async function _tryFirebaseAI() {
  try {
    const { initializeApp, getApps } =
      await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js');
    const { getAI, getGenerativeModel, GoogleAIBackend } =
      await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-ai.js');

    const cfg = {
      apiKey:            'AIzaSyAF97SX_GlK7QMNhvhD5eFvS5a8FdApo_A',
      authDomain:        'englishrhapsody-78866.firebaseapp.com',
      projectId:         'englishrhapsody-78866',
      storageBucket:     'englishrhapsody-78866.firebasestorage.app',
      messagingSenderId: '94842633226',
      appId:             '1:94842633226:web:26f0f89fdf558b918eb3f3',
    };
    const existing = getApps().find(a => a.name === 'er-ai');
    const app      = existing || initializeApp(cfg, 'er-ai');
    const ai       = getAI(app, { backend: new GoogleAIBackend() });
    _model = getGenerativeModel(ai, {
      model: 'gemini-2.0-flash',
      generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
    });

    // Bağlantı testi (kısa prompt)
    const res = await _model.generateContent('ok');
    res.response.text(); // hata fırlatırsa catch'e düşer
    console.info('[Gemini] Firebase AI Logic aktif ✓');
    return true;
  } catch (e) {
    _lastError = e;
    console.warn('[Gemini] Firebase AI Logic başarısız, REST API deneniyor...', e.message);
    _model = null;
    return false;
  }
}

// ── 2. Google AI Studio REST API ───────────────────────────────────────────

function _getDirectKey() {
  return (window.remoteFlags?.gemini_key) || localStorage.getItem('sp_gemini_key');
}

async function _generateREST(prompt) {
  const key = _getDirectKey();
  if (!key) throw new Error('Gemini API key bulunamadı — localStorage.setItem("sp_gemini_key","...") ile ekleyin');

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Gemini REST ${res.status}: ${err?.error?.message || res.statusText}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

// ── Birleşik generate ──────────────────────────────────────────────────────

async function _generate(prompt) {
  if (_model) {
    const result = await _model.generateContent(prompt);
    return result.response.text().trim();
  }
  return _generateREST(prompt);
}

// ── Public API ─────────────────────────────────────────────────────────────

window._fbAI = {
  async coachFeedback(target, spoken, missed, score) {
    return _generate(
      `İngilizce telaffuz koçusun. Türk öğrenci:\n` +
      `Hedef: "${target}"\n` +
      `Söylenen: "${spoken || '(sessiz)'}"\n` +
      `Hatalı: ${missed.length ? missed.join(', ') : 'yok'} | Skor: %${score}\n` +
      `Türkçe, 2-3 cümle, somut öneri + teşvik. Emoji kullan. Çok kısa ol.`
    );
  },
  async explainWord(word, sentence) {
    return _generate(
      `İngilizce kelimeyi Türkçe açıkla: "${word}"\n` +
      `${sentence ? `Cümle: "${sentence}"\n` : ''}` +
      `Kısa tanım + bağlamda kullanım + örnek. Türkçe, 3-4 cümle.`
    );
  },
  async generate(prompt) { return _generate(prompt); },
  getError()             { return _lastError; },
  async test() {
    const r = await _generate('Merhaba de sadece.');
    console.info('[Gemini] Test başarılı:', r);
    return r;
  },
};

// ── Başlat ─────────────────────────────────────────────────────────────────

(async () => {
  const ok = await _tryFirebaseAI();
  if (!ok) {
    const key = _getDirectKey();
    if (key) {
      console.info('[Gemini] Google AI Studio REST API aktif ✓ (key bulundu)');
    } else {
      console.warn(
        '[Gemini] Aktif değil.\n' +
        'Seçenek 1 — Firebase konsolundan AI Logic aktive et (key gerekmez)\n' +
        'Seçenek 2 — localStorage.setItem("sp_gemini_key", "AIza...") ile key gir\n' +
        '           Key al: https://aistudio.google.com/app/apikey'
      );
    }
  }
})();
