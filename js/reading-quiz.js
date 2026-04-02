/* English Rhapsody — Reading Comprehension Quiz Module
   Adds optional comprehension questions to stories that have a `questions` field.
   Loaded lazily as part of the reading module. */
(function () {
  'use strict';

  /* ── Wait for app ── */
  function init() {
    if (!window.app || !window.STORIES) { setTimeout(init, 200); return; }
    _patchRenderStory();
  }

  /* ── Patch _renderStory to inject quiz button ── */
  function _patchRenderStory() {
    const orig = app._renderStory.bind(app);
    app._renderStory = function () {
      orig();
      setTimeout(_injectQuizButton, 80);
    };
  }

  function _getCurrentStory() {
    try {
      const level = app.state.get('readingLevel');
      const idx   = typeof app._getStoryIndex === 'function'
                    ? app._getStoryIndex()
                    : (app.state.get('readingIdx') || 0);
      return STORIES.filter(s => s.level === level)[idx] || null;
    } catch (e) { return null; }
  }

  function _injectQuizButton() {
    const story = _getCurrentStory();
    if (!story || !story.questions || !story.questions.length) return;

    /* Remove stale button if story changed */
    const old = document.getElementById('rq-start-btn');
    if (old) old.remove();

    const box = document.querySelector('.story-content-box');
    if (!box) return;

    const done = (app.state.get('readDone') || {})[story.id];
    const attempted = (app.state.get('rqDone') || {})[story.id];

    const btn = document.createElement('button');
    btn.id = 'rq-start-btn';
    btn.className = 'rq-start-btn';

    if (attempted) {
      btn.innerHTML = '✅ Sorular tamamlandı';
      btn.disabled = true;
    } else {
      btn.innerHTML = '✏️ Anlama sorularını cevapla <span class="rq-badge">+' + (story.questions.length * 15) + ' XP</span>';
      btn.onclick = () => _showQuizModal(story);
    }

    box.appendChild(btn);
  }

  /* ── Quiz Modal ── */
  function _showQuizModal(story) {
    /* Remove existing modal */
    const existing = document.getElementById('rq-modal-overlay');
    if (existing) existing.remove();

    let current = 0;
    let correct = 0;
    const answers = [];

    const overlay = document.createElement('div');
    overlay.id = 'rq-modal-overlay';
    overlay.className = 'rq-overlay';

    function render() {
      const q = story.questions[current];
      const total = story.questions.length;
      overlay.innerHTML = `
        <div class="rq-modal">
          <div class="rq-header">
            <span class="rq-title">📝 Anlama Soruları</span>
            <span class="rq-progress">${current + 1} / ${total}</span>
            <button class="rq-close" id="rq-close-btn">✕</button>
          </div>
          <div class="rq-progress-bar">
            <div class="rq-progress-fill" style="width:${(current/total)*100}%"></div>
          </div>
          <div class="rq-story-title">${story.title}</div>
          <div class="rq-question">${q.q}</div>
          <div class="rq-options" id="rq-options">
            ${q.opts.map((opt, i) => `
              <button class="rq-opt" data-idx="${i}">${opt}</button>
            `).join('')}
          </div>
          <div class="rq-feedback" id="rq-feedback" style="display:none"></div>
        </div>`;

      /* Close */
      overlay.querySelector('#rq-close-btn').onclick = () => overlay.remove();

      /* Options */
      overlay.querySelectorAll('.rq-opt').forEach(btn => {
        btn.onclick = function () {
          const chosen = parseInt(this.dataset.idx);
          const isCorrect = chosen === q.a;
          if (isCorrect) correct++;
          answers.push({ chosen, correct: isCorrect });

          /* Highlight */
          overlay.querySelectorAll('.rq-opt').forEach((b, i) => {
            b.disabled = true;
            if (i === q.a) b.classList.add('rq-correct');
            else if (i === chosen && !isCorrect) b.classList.add('rq-wrong');
          });

          /* Feedback */
          const fb = overlay.querySelector('#rq-feedback');
          fb.style.display = 'block';
          fb.className = 'rq-feedback ' + (isCorrect ? 'rq-fb-correct' : 'rq-fb-wrong');
          fb.innerHTML = isCorrect
            ? '✅ Doğru!'
            : `❌ Yanlış. Doğru cevap: <strong>${q.opts[q.a]}</strong>`;

          /* Next / Finish */
          setTimeout(() => {
            if (current < story.questions.length - 1) {
              current++;
              render();
            } else {
              _showResult(overlay, story, correct, answers);
            }
          }, 1400);
        };
      });
    }

    render();
    (document.fullscreenElement || document.body).appendChild(overlay);
  }

  function _showResult(overlay, story, correct, answers) {
    const total   = story.questions.length;
    const xp      = correct * 15;
    const pct     = Math.round((correct / total) * 100);
    const emoji   = pct === 100 ? '🏆' : pct >= 66 ? '⭐' : '💪';

    overlay.querySelector('.rq-modal').innerHTML = `
      <div class="rq-header">
        <span class="rq-title">📝 Sonuç</span>
        <button class="rq-close" id="rq-close-btn">✕</button>
      </div>
      <div class="rq-result">
        <div class="rq-result-emoji">${emoji}</div>
        <div class="rq-result-score">${correct} / ${total} doğru</div>
        <div class="rq-result-pct">${pct}%</div>
        ${xp > 0 ? `<div class="rq-result-xp">+${xp} XP kazandın!</div>` : '<div class="rq-result-xp">Tekrar dene!</div>'}
        <button class="btn btn-primary" id="rq-finish-btn">Devam Et</button>
      </div>`;

    overlay.querySelector('#rq-close-btn').onclick = () => overlay.remove();
    overlay.querySelector('#rq-finish-btn').onclick = () => {
      overlay.remove();
      /* Award XP */
      if (xp > 0 && window.app) {
        app.addXP(xp, pct === 100 ? 'hard' : 'medium', 'reading-quiz');
        /* Mark as done */
        const rqDone = app.state.get('rqDone') || {};
        rqDone[story.id] = { score: pct, xp, ts: Date.now() };
        app.state.set('rqDone', rqDone);
        /* Refresh quiz button */
        setTimeout(_injectQuizButton, 100);
      }
    };
  }

  init();
})();
