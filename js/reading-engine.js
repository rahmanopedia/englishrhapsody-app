class ReadingEngine{constructor(n){this.app=n,this.activePopup=null,this._closeOnAction=null}markupStory(n){if(!n.annotations||n.annotations.length===0){const a=n.text.replace(/\{([^}]+)\}/g,"$1");return this.app._markupText(a,"story-word")}const t=n.text,i=n.annotations,e=Array.from({length:t.length},()=>[]);i.forEach((a,s)=>{(a.spans||[{start:a.start_index,end:a.end_index}]).forEach(o=>{for(let l=o.start;l<o.end;l++)e[l].push(s)})});let d="",r=0;for(;r<t.length;){const a=e[r];let s=r+1;for(;s<t.length&&this._arraysEqual(e[s],a);)s++;const p=t.substring(r,s);if(a.length===0)d+=this.app._markupText(p,"story-word");else{const o=a[a.length-1],l=a.join(","),c=["sw-v2",`ann-type-${i[o].annotation_type||"word"}`];d+=`<span class="${c.join(" ")}" data-ann-id="${o}" data-all-ids="${l}">${this._escapeHTML(p)}</span>`}r=s}return d}_arraysEqual(n,t){if(n.length!==t.length)return!1;for(let i=0;i<n.length;i++)if(n[i]!==t[i])return!1;return!0}handleAnnotationClick(n,t,i){this.activePopup&&this.closePopup();const e=t.dataset.annId;document.querySelectorAll(`.sw-v2[data-ann-id="${e}"]`).forEach(d=>{d.classList.add("ann-active")}),n.surface_form&&this.app.speakWord(n.surface_form,1),this._renderPopup(n,t,i),this.app.audio.play("pop")}_renderPopup(n,t,i){const e=document.createElement("div");e.className="ann-popup animate-pop";const d={word:"Kelime",phrasal_verb:"Deyimsel Fiil",idiom:"Deyim",collocation:"Kal\u0131p \u0130fade",noun_phrase:"\u0130sim Tamlamas\u0131",grammar_structure:"Gramer Yap\u0131s\u0131",relative_clause:"S\u0131fat C\xFCmleci\u011Fi",verb_phrase:"Fiil Grubu",prepositional_phrase:"Edat Grubu"},r={word:"#1d4ed8",phrasal_verb:"#0891b2",idiom:"#7c3aed",collocation:"#065f46",noun_phrase:"#be185d",grammar_structure:"#b45309",relative_clause:"#4338ca",verb_phrase:"#0369a1",prepositional_phrase:"#475569"},a=d[n.annotation_type]||"Bilgi",s=r[n.annotation_type]||"#374151",p=n.individual_meanings&&n.individual_meanings.length?`<div class="ann-divider"></div>
         <div class="ann-individual-label">Kelime Kelime</div>
         <div class="ann-individuals">
           ${n.individual_meanings.map(c=>`
             <div class="ann-ind-row">
               <span class="ann-ind-word">${c.word}</span>
               <span class="ann-ind-sep">\u2192</span>
               <span class="ann-ind-meaning">${c.meaning}</span>
               ${c.note?`<span class="ann-ind-note">${c.note}</span>`:""}
             </div>
           `).join("")}
         </div>`:"";e.innerHTML=`
      <div class="ann-popup-header">
        <div class="ann-type-badge" style="background: ${s}">${a}</div>
        <button class="ann-popup-close">\u2715</button>
      </div>
      <div class="ann-popup-body">
        <div class="ann-surface">${n.surface_form}</div>
        <div class="ann-meaning">${n.contextual_turkish_meaning}</div>
        <div class="ann-explanation">${n.short_explanation_tr}</div>
        ${p}
        ${n.example_sentence_en?`
          <div class="ann-divider"></div>
          <div class="ann-example-label">\xD6rnek C\xFCmle</div>
          <div class="ann-example-en">${n.example_sentence_en}</div>
          <div class="ann-example-tr">${n.example_sentence_tr}</div>
        `:""}
      </div>
    `,(document.fullscreenElement||document.webkitFullscreenElement||document.body).appendChild(e),this.activePopup=e;const o=t.getBoundingClientRect();let l=o.left+window.scrollX,u=o.bottom+window.scrollY+8;l+e.offsetWidth>window.innerWidth-10&&(l=window.innerWidth-e.offsetWidth-10),u+e.offsetHeight>window.innerHeight-10&&(u=o.top+window.scrollY-e.offsetHeight-8),e.style.left=Math.max(10,l)+"px",e.style.top=u+"px",e.querySelector(".ann-popup-close").onclick=()=>this.closePopup(),this._closeOnAction=c=>{e.contains(c.target)||this.closePopup()},document.addEventListener("mousedown",this._closeOnAction)}closePopup(){this._closeOnAction&&(document.removeEventListener("mousedown",this._closeOnAction),this._closeOnAction=null),this.activePopup&&(this.activePopup.remove(),this.activePopup=null,document.querySelectorAll(".ann-active").forEach(n=>n.classList.remove("ann-active")))}_escapeHTML(n){const t=document.createElement("div");return t.textContent=n,t.innerHTML}}window.ReadingEngine=ReadingEngine;

/* ── Okuma modu: tam ekran + yön yönetimi ── */
(function () {
  let _rdOrient = null;
  let _rdEl     = null;

  function _rdEnterFs(el) {
    if (!el || document.fullscreenElement || document.webkitFullscreenElement) return;
    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) req.call(el).catch(() => {});
  }

  function _rdInit(el) {
    if (_rdEl === el) return;
    _rdEl = el;
    try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch(e) {}
    _rdEnterFs(el);
    if (_rdOrient) window.removeEventListener('resize', _rdOrient);
    _rdOrient = () => _rdEnterFs(el);
    window.addEventListener('resize', _rdOrient, { passive: true });
    if (window.attachQuickMenuTrigger) window.attachQuickMenuTrigger(el);
  }

  function _rdDestroy() {
    if (_rdOrient) { window.removeEventListener('resize', _rdOrient); _rdOrient = null; }
    _rdEl = null;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document).catch(() => {});
    }
    try { if (screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(() => {}); } catch(e) {}
  }

  function _patch() {
    const app = window._app;
    if (!app || !app.navigate || app.__rdPatched) return;
    app.__rdPatched = true;
    const _orig = app.navigate.bind(app);
    app.navigate = function (target) {
      _orig(target);
      if (target === 'reading') {
        const c = document.querySelector('.reading-workshop-container');
        if (c) _rdInit(c);
      } else if (_rdEl) {
        _rdDestroy();
      }
    };
  }

  if (window._app) { _patch(); }
  else { const t = setInterval(() => { if (window._app) { clearInterval(t); _patch(); } }, 50); }

  /* ── Fullscreen popup relay ──
     word-def-popup / ann-popup are appended to document.body by app.js,
     but in fullscreen only the fullscreen element's subtree is painted.
     Move any popup from body into the fullscreen element immediately. */
  const _popupObs = new MutationObserver(mutations => {
    const fs = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fs) return;
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const cls = node.classList;
        if (cls.contains('word-def-popup') || cls.contains('ann-popup') || cls.contains('cloze-mini-popup')) {
          fs.appendChild(node);
        }
      });
    });
  });
  _popupObs.observe(document.body, { childList: true });
})();
