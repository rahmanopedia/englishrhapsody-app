class ReadingEngine{constructor(e){this.app=e,this.activePopup=null,this._closeOnAction=null}markupStory(e){if(!e.annotations||e.annotations.length===0){const t=e.text.replace(/\{([^}]+)\}/g,"$1");return this.app._markupText(t,"story-word")}const a=e.text,i=e.annotations,n=Array.from({length:a.length},()=>[]);i.forEach((t,o)=>{(t.spans||[{start:t.start_index,end:t.end_index}]).forEach(d=>{for(let s=d.start;s<d.end;s++)n[s].push(o)})});let l="",r=0;for(;r<a.length;){const t=n[r];let o=r+1;for(;o<a.length&&this._arraysEqual(n[o],t);)o++;const d=a.substring(r,o);if(t.length===0)l+=this.app._markupText(d,"story-word");else{const s=t[t.length-1],c=t.join(","),u=["sw-v2",`ann-type-${i[s].annotation_type||"word"}`];l+=`<span class="${u.join(" ")}" data-ann-id="${s}" data-all-ids="${c}">${this._escapeHTML(d)}</span>`}r=o}return l}_arraysEqual(e,a){if(e.length!==a.length)return!1;for(let i=0;i<e.length;i++)if(e[i]!==a[i])return!1;return!0}handleAnnotationClick(e,a,i){this.activePopup&&this.closePopup();const n=a.dataset.annId;document.querySelectorAll(`.sw-v2[data-ann-id="${n}"]`).forEach(l=>{l.classList.add("ann-active")}),e.surface_form&&this.app.speakWord(e.surface_form,1),this._renderPopup(e,a,i),this.app.audio.play("pop")}_renderPopup(e,a,i){const n=document.createElement("div");n.className="ann-popup animate-pop";const l={word:"Kelime",phrasal_verb:"Deyimsel Fiil",idiom:"Deyim",collocation:"Kal\u0131p \u0130fade",noun_phrase:"\u0130sim Tamlamas\u0131",grammar_structure:"Gramer Yap\u0131s\u0131",relative_clause:"S\u0131fat C\xFCmleci\u011Fi",verb_phrase:"Fiil Grubu",prepositional_phrase:"Edat Grubu"},r={word:"#1d4ed8",phrasal_verb:"#0891b2",idiom:"#7c3aed",collocation:"#065f46",noun_phrase:"#be185d",grammar_structure:"#b45309",relative_clause:"#4338ca",verb_phrase:"#0369a1",prepositional_phrase:"#475569"},t=l[e.annotation_type]||"Bilgi",o=r[e.annotation_type]||"#374151",d=e.individual_meanings&&e.individual_meanings.length?`<div class="ann-divider"></div>
         <div class="ann-individual-label">Kelime Kelime</div>
         <div class="ann-individuals">
           ${e.individual_meanings.map(p=>`
             <div class="ann-ind-row">
               <span class="ann-ind-word">${p.word}</span>
               <span class="ann-ind-sep">\u2192</span>
               <span class="ann-ind-meaning">${p.meaning}</span>
               ${p.note?`<span class="ann-ind-note">${p.note}</span>`:""}
             </div>
           `).join("")}
         </div>`:"";n.innerHTML=`
      <div class="ann-popup-header">
        <div class="ann-type-badge" style="background: ${o}">${t}</div>
        <button class="ann-popup-close">\u2715</button>
      </div>
      <div class="ann-popup-body">
        <div class="ann-surface">${e.surface_form}</div>
        <div class="ann-meaning">${e.contextual_turkish_meaning}</div>
        <div class="ann-explanation">${e.short_explanation_tr}</div>
        ${d}
        ${e.example_sentence_en?`
          <div class="ann-divider"></div>
          <div class="ann-example-label">\xD6rnek C\xFCmle</div>
          <div class="ann-example-en">${e.example_sentence_en}</div>
          <div class="ann-example-tr">${e.example_sentence_tr}</div>
        `:""}
      </div>
    `,document.body.appendChild(n),this.activePopup=n;const s=a.getBoundingClientRect();let c=s.left+window.scrollX,u=s.bottom+window.scrollY+8;c+n.offsetWidth>window.innerWidth-10&&(c=window.innerWidth-n.offsetWidth-10),u+n.offsetHeight>window.innerHeight-10&&(u=s.top+window.scrollY-n.offsetHeight-8),n.style.left=Math.max(10,c)+"px",n.style.top=u+"px",n.querySelector(".ann-popup-close").onclick=()=>this.closePopup(),this._closeOnAction=p=>{n.contains(p.target)||this.closePopup()},document.addEventListener("mousedown",this._closeOnAction)}closePopup(){this._closeOnAction&&(document.removeEventListener("mousedown",this._closeOnAction),this._closeOnAction=null),this.activePopup&&(this.activePopup.remove(),this.activePopup=null,document.querySelectorAll(".ann-active").forEach(e=>e.classList.remove("ann-active")))}_escapeHTML(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}}window.ReadingEngine=ReadingEngine;
