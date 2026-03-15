/**
 * Reading Workshop - Context-Aware Annotation Engine (v2.1)
 * Optimized for nested annotations and split phrasal verbs.
 */
class ReadingEngine {
  constructor(app) {
    this.app = app;
    this.activePopup = null;
  }

  /**
   * Renders a story with support for nested and split annotations.
   */
  markupStory(story) {
    if (!story.annotations || story.annotations.length === 0) {
      const plainText = story.text.replace(/\{([^}]+)\}/g, '$1');
      return this.app._markupText(plainText, 'story-word');
    }

    const text = story.text;
    const annotations = story.annotations;

    // 1. Create a map of character index to annotation IDs
    // Each index can have multiple annotations (nesting)
    const indexToAnns = Array.from({ length: text.length }, () => []);
    
    annotations.forEach((ann, id) => {
      // Support for split spans (multiple [start, end] pairs)
      const spans = ann.spans || [{ start: ann.start_index, end: ann.end_index }];
      spans.forEach(span => {
        for (let i = span.start; i < span.end; i++) {
          indexToAnns[i].push(id);
        }
      });
    });

    // 2. Build the HTML by grouping consecutive indices with the same set of annotations
    let html = '';
    let i = 0;
    while (i < text.length) {
      const currentAnnIds = indexToAnns[i];
      let j = i + 1;
      
      // Find the range that has the exact same set of annotations
      while (j < text.length && this._arraysEqual(indexToAnns[j], currentAnnIds)) {
        j++;
      }

      const fragment = text.substring(i, j);
      if (currentAnnIds.length === 0) {
        html += this.app._markupText(fragment, 'story-word');
      } else {
        // Use the "deepest" (last added) annotation as the primary clickable span
        // But keep info about all applicable IDs for split-highlighting
        const primaryId = currentAnnIds[currentAnnIds.length - 1];
        const allIds = currentAnnIds.join(',');
        const ann = annotations[primaryId];
        
        const classes = ['sw-v2', `ann-type-${ann.annotation_type || 'word'}`];
        html += `<span class="${classes.join(' ')}" data-ann-id="${primaryId}" data-all-ids="${allIds}">${this._escapeHTML(fragment)}</span>`;
      }
      i = j;
    }

    return html;
  }

  _arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  handleAnnotationClick(ann, element, event) {
    if (this.activePopup) this.closePopup();

    // Highlight all parts of a split phrasal verb or the same phrase
    const annId = element.dataset.annId;
    document.querySelectorAll(`.sw-v2[data-ann-id="${annId}"]`).forEach(el => {
      el.classList.add('ann-active');
    });

    if (ann.surface_form) {
      this.app.speakWord(ann.surface_form, 1.0);
    }

    this._renderPopup(ann, element, event);
    this.app.audio.play('pop');
  }

  _renderPopup(ann, element, event) {
    const popup = document.createElement('div');
    popup.className = 'ann-popup animate-pop';
    
    const typeLabels = {
      'word': 'Kelime',
      'phrasal_verb': 'Deyimsel Fiil',
      'idiom': 'Deyim',
      'collocation': 'Kalıp İfade',
      'noun_phrase': 'İsim Tamlaması',
      'grammar_structure': 'Gramer Yapısı',
      'relative_clause': 'Sıfat Cümleciği',
      'verb_phrase': 'Fiil Grubu',
      'prepositional_phrase': 'Edat Grubu'
    };

    const typeColors = {
      'word': '#1d4ed8',
      'phrasal_verb': '#0891b2',
      'idiom': '#7c3aed',
      'collocation': '#065f46',
      'noun_phrase': '#be185d',
      'grammar_structure': '#b45309',
      'relative_clause': '#4338ca',
      'verb_phrase': '#0369a1',
      'prepositional_phrase': '#475569'
    };

    const label = typeLabels[ann.annotation_type] || 'Bilgi';
    const color = typeColors[ann.annotation_type] || '#374151';

    const individualsHtml = (ann.individual_meanings && ann.individual_meanings.length)
      ? `<div class="ann-divider"></div>
         <div class="ann-individual-label">Kelime Kelime</div>
         <div class="ann-individuals">
           ${ann.individual_meanings.map(m => `
             <div class="ann-ind-row">
               <span class="ann-ind-word">${m.word}</span>
               <span class="ann-ind-sep">→</span>
               <span class="ann-ind-meaning">${m.meaning}</span>
               ${m.note ? `<span class="ann-ind-note">${m.note}</span>` : ''}
             </div>
           `).join('')}
         </div>`
      : '';

    popup.innerHTML = `
      <div class="ann-popup-header">
        <div class="ann-type-badge" style="background: ${color}">${label}</div>
        <button class="ann-popup-close">✕</button>
      </div>
      <div class="ann-popup-body">
        <div class="ann-surface">${ann.surface_form}</div>
        <div class="ann-meaning">${ann.contextual_turkish_meaning}</div>
        <div class="ann-explanation">${ann.short_explanation_tr}</div>
        ${individualsHtml}
        ${ann.example_sentence_en ? `
          <div class="ann-divider"></div>
          <div class="ann-example-label">Örnek Cümle</div>
          <div class="ann-example-en">${ann.example_sentence_en}</div>
          <div class="ann-example-tr">${ann.example_sentence_tr}</div>
        ` : ''}
      </div>
    `;

    document.body.appendChild(popup);
    this.activePopup = popup;

    const rect = element.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;

    if (left + popup.offsetWidth > window.innerWidth - 10) {
      left = window.innerWidth - popup.offsetWidth - 10;
    }
    if (top + popup.offsetHeight > window.innerHeight - 10) {
      top = rect.top + window.scrollY - popup.offsetHeight - 8;
    }

    popup.style.left = Math.max(10, left) + 'px';
    popup.style.top = top + 'px';

    popup.querySelector('.ann-popup-close').onclick = () => this.closePopup();
    
    const closeOnAction = (e) => {
        if (!popup.contains(e.target) && !e.target.classList.contains('sw-v2')) {
            this.closePopup();
            document.removeEventListener('mousedown', closeOnAction);
        }
    };
    document.addEventListener('mousedown', closeOnAction);
  }

  closePopup() {
    if (this.activePopup) {
      this.activePopup.remove();
      this.activePopup = null;
      document.querySelectorAll('.ann-active').forEach(el => el.classList.remove('ann-active'));
    }
  }

  _escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

window.ReadingEngine = ReadingEngine;
