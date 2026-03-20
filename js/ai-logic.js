/**
 * English Rhapsody — Firebase AI Logic (Gemini)
 * Google AI backend, Spark plan uyumlu, key gerekmez.
 * window._fbAI üzerinden kullanılır.
 */

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-ai.js';

const _config = {
  apiKey:            'AIzaSyAF97SX_GlK7QMNhvhD5eFvS5a8FdApo_A',
  authDomain:        'englishrhapsody-78866.firebaseapp.com',
  projectId:         'englishrhapsody-78866',
  storageBucket:     'englishrhapsody-78866.firebasestorage.app',
  messagingSenderId: '94842633226',
  appId:             '1:94842633226:web:26f0f89fdf558b918eb3f3',
};

let _model = null;

function _getModel() {
  if (_model) return _model;
  const existing = getApps().find(a => a.name === 'er-ai');
  const app = existing || initializeApp(_config, 'er-ai');
  const ai  = getAI(app, { backend: new GoogleAIBackend() });
  _model = getGenerativeModel(ai, {
    model: 'gemini-2.0-flash-lite',
    generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
  });
  return _model;
}

async function _generate(prompt) {
  const model  = _getModel();
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

// ── Public API ─────────────────────────────────────────────────────────────

window._fbAI = {

  /** Telaffuz koçu — Speak modunda kullanılır */
  async coachFeedback(target, spoken, missed, score) {
    return _generate(
      `İngilizce telaffuz koçusun. Türk öğrenci:\n` +
      `Hedef: "${target}"\n` +
      `Söylenen: "${spoken || '(sessiz)'}"\n` +
      `Hatalı: ${missed.length ? missed.join(', ') : 'yok'} | Skor: %${score}\n` +
      `Türkçe, 2-3 cümle, somut öneri + teşvik. Emoji kullan. Çok kısa ol.`
    );
  },

  /** Kelime açıklaması — kelimeye tıklandığında */
  async explainWord(word, sentence) {
    return _generate(
      `İngilizce kelimeyi Türkçe açıkla:\n` +
      `Kelime: "${word}"\n` +
      `${sentence ? `Cümle: "${sentence}"\n` : ''}` +
      `Kısa tanım + bağlamda neden bu kelime + örnek kullanım. Türkçe, 3-4 cümle.`
    );
  },

  /** Genel serbest prompt */
  async generate(prompt) {
    return _generate(prompt);
  },
};

console.info('[Firebase AI] Gemini hazır ✓');
