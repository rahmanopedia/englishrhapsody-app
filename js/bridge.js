class BridgeModule{constructor(e){this.app=e,this.el=null,this.collection=JSON.parse(localStorage.getItem("bridge_collection")||"[]"),this.flowScore=parseFloat(localStorage.getItem("bridge_flow_score")||"0"),this.bridgeCount=parseInt(localStorage.getItem("bridge_count")||"0"),this.currentData=null,this.saved=!1,this.activeCategory=null,this.activeTypeFilter=null,this.searchQuery="",this.explorerPage=1,this.searchHistory=JSON.parse(localStorage.getItem("bridge_search_history")||"[]"),this.collectionTags=JSON.parse(localStorage.getItem("bridge_coll_tags")||"{}"),this.activeTagFilter=null,this.srData=JSON.parse(localStorage.getItem("bridge_sr_data")||"{}"),this.streakData=JSON.parse(localStorage.getItem("bridge_streak")||'{"count":0,"lastDate":""}'),this.dailyDone=JSON.parse(localStorage.getItem("bridge_daily_done")||"[]"),this.onboarded=localStorage.getItem("bridge_onboarded")==="1",this.EXAMPLES=["Can\u0131m s\u0131k\u0131ld\u0131","Kafam \xE7ok kar\u0131\u015F\u0131k","\u0130\u015Fler \xE7ok yo\u011Fun gidiyor","\xDCst\xFCmden b\xFCy\xFCk bir y\xFCk kalkt\u0131","Sab\u0131rs\u0131zl\u0131kla bekliyorum","Kendimi berbat hissediyorum","Harika bir g\xFCn ge\xE7irdim","Bu \xE7ok sa\xE7ma bir durum"],this.BRIDGE_META={direct:{label:"Do\u011Frudan",color:"#94a3b8",desc:"Kavram birebir e\u015Fle\u015Fiyor"},transform:{label:"D\xF6n\xFC\u015F\xFCm",color:"#a78bfa",desc:"Kavram farkl\u0131 \u015Fekilde ifade ediliyor"},multiply:{label:"\xC7o\u011Falma",color:"#34d399",desc:"Bir kavram birden fazla par\xE7aya ayr\u0131l\u0131yor"},disappear:{label:"Kaybolu\u015F",color:"#f87171",desc:"T\xFCrk\xE7ede var, \u0130ngilizce'de do\u011Frudan kar\u015F\u0131l\u0131\u011F\u0131 yok"},emerge:{label:"T\xFCreme",color:"#22d3ee",desc:"\u0130ngilizce'ye \xF6zg\xFC, T\xFCrk\xE7ede bulunmuyor"}}}init(e){var i;this.el=e,(i=window.analyticsManager)==null||i.lessonStart("bridge"),this._render()}_render(){this.el.innerHTML="",this._renderWorkspace()}_renderWorkspace(){const e=Math.min(100,Math.round(this.flowScore)),i=this.EXAMPLES.slice(0,4).map(a=>`<button class="bridge-example-pill" data-example="${a}">${a}</button>`).join(""),r=Object.entries(this.BRIDGE_META).map(([a,l])=>`<div class="bridge-legend-item">
        <div class="bridge-legend-dot" style="background:${l.color}"></div>
        <span>${l.label}: ${l.desc}</span>
      </div>`).join(""),t=(typeof BRIDGE_CATEGORIES!="undefined"?BRIDGE_CATEGORIES:[]).map(a=>`<button class="bridge-cat-tab" data-cat="${a.id}">${a.icon} ${a.label}</button>`).join("");this.el.innerHTML=`
      <!-- SVG Gradyan Tan\u0131mlar\u0131 -->
      <svg class="bridge-svg-defs" aria-hidden="true">
        <defs>
          <linearGradient id="grad-transform" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#f59e0b"/>
            <stop offset="50%"  stop-color="#a78bfa"/>
            <stop offset="100%" stop-color="#00d4ff"/>
          </linearGradient>
        </defs>
      </svg>

      <div class="bridge-wrap">
        <!-- Header -->
        <div class="bridge-header">
          <div class="bridge-header-left">
            <div class="bridge-logo"><span class="bridge-lm">K</span></div>
            <div class="bridge-title-block">
              <h1>K\xD6PR\xDC</h1>
              <p>\xC7eviri de\u011Fil, d\xF6n\xFC\u015F\xFCm</p>
            </div>
          </div>
          <div class="bridge-header-stats">
            <div class="bridge-stat">
              <div class="bridge-stat-val" id="bridge-stat-count">${this.bridgeCount}</div>
              <div class="bridge-stat-lbl">K\xF6pr\xFC</div>
            </div>
            <div class="bridge-stat">
              <div class="bridge-stat-val" id="bridge-stat-coll">${this.collection.length}</div>
              <div class="bridge-stat-lbl">Koleksiyon</div>
            </div>
            <div class="bridge-stat bridge-stat--streak" title="G\xFCnl\xFCk seri">
              <div class="bridge-stat-val" id="bridge-stat-streak">${this.streakData.count}</div>
              <div class="bridge-stat-lbl">\u{1F525} Seri</div>
            </div>
            <button class="bridge-header-btn" id="bridge-quiz-btn" title="S\u0131nav Modu"><svg class="bhb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><path d="M8 10.5v.5"/><path d="M8 5.5c0-.9.7-1.5 1.5-1.5S11 4.6 11 5.5c0 1.2-1.5 1.5-1.5 3"/></svg></button>
            <button class="bridge-header-btn" id="bridge-daily-btn" title="G\xFCnl\xFCk Pratik"><svg class="bhb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 1.5v3M11 1.5v3M2 7h12"/></svg></button>
            <button class="bridge-header-btn" id="bridge-stats-btn" title="\u0130statistikler"><svg class="bhb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13V9M7 13V5M12 13V8"/></svg></button>
          </div>
        </div>

        <!-- K\xF6pr\xFC Tipi A\xE7\u0131klamalar\u0131 -->
        <div class="bridge-legend">${r}</div>

        <!-- \xC7al\u0131\u015Fma Alan\u0131 -->
        <div class="bridge-workspace" id="bridge-workspace">
          <!-- T\xFCrk\xE7e Panel -->
          <div class="bridge-panel bridge-panel--tr" id="bridge-tr-panel">
            <div class="bridge-panel-label">
              <div class="bridge-panel-label-dot"></div>
              T\xFCrk\xE7e D\xFC\u015F\xFCnce
            </div>
            <div class="bridge-textarea-wrap">
              <textarea class="bridge-textarea" id="bridge-textarea"
                placeholder="T\xFCrk\xE7e d\xFC\u015F\xFCnceni yaz... G\xFCnl\xFCk dil, slang, deyimler, her \u015Fey."
                maxlength="400" rows="5"></textarea>
              <div class="bridge-history-dropdown" id="bridge-history-dropdown" style="display:none"></div>
            </div>
            <div class="bridge-textarea-footer">
              <span class="bridge-char-count" id="bridge-char-count">0 / 400</span>
              <span class="bridge-kbd-hint">Ctrl+Enter</span>
              <div class="bridge-examples" id="bridge-examples">${i}</div>
            </div>
          </div>

          <!-- Orta Tetikleyici -->
          <div class="bridge-trigger-col">
            <div class="bridge-trigger-line"></div>
            <button class="bridge-trigger-btn" id="bridge-trigger-btn" title="K\xF6pr\xFC Kur">
              <svg class="bridge-trig-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </button>
            <div class="bridge-trigger-line"></div>
          </div>

          <!-- \u0130ngilizce Sonu\xE7 Paneli -->
          <div class="bridge-panel bridge-panel--en" id="bridge-en-panel">
            <div class="bridge-panel-label">
              <div class="bridge-panel-label-dot"></div>
              \u0130ngilizce Kar\u015F\u0131l\u0131k
            </div>
            <div class="bridge-result-placeholder" id="bridge-placeholder">
              <div class="bridge-ph-visual">
                <span class="bridge-ph-tr">TR</span>
                <div class="bridge-ph-line"></div>
                <span class="bridge-ph-en">EN</span>
              </div>
              <p>T\xFCrk\xE7e yaz, k\xF6pr\xFC kur.</p>
            </div>
            <div class="bridge-result-content" id="bridge-result-content" style="display:none"></div>
          </div>
        </div>

        <!-- Kategori Filtresi -->
        <div class="bridge-cat-filter-bar" id="bridge-cat-filter-bar">
          <button class="bridge-cat-chip ${this.activeCategory?"":"active"}" data-cat="">\u2728 T\xFCm\xFC</button>
          ${(typeof BRIDGE_CATEGORIES!="undefined"?BRIDGE_CATEGORIES:[]).map(a=>`<button class="bridge-cat-chip ${this.activeCategory===a.id?"active":""}" data-cat="${a.id}">${a.icon} ${a.label}</button>`).join("")}
        </div>

        <!-- Ak\u0131\u015F Skoru -->
        <div class="bridge-flow-bar">
          <span class="bridge-flow-label">Ak\u0131\u015F Skoru</span>
          <div class="bridge-flow-track">
            <div class="bridge-flow-fill" id="bridge-flow-fill" style="width:${e}%"></div>
          </div>
          <span class="bridge-flow-pct" id="bridge-flow-pct">${e}%</span>
        </div>

        <!-- K\xF6pr\xFC Kartlar\u0131 Alan\u0131 -->
        <div class="bridge-cards-section" id="bridge-cards-section"></div>

        <!-- Ger\xE7ek Kullan\u0131m & \xC7eviri Tuza\u011F\u0131 -->
        <div id="bridge-context-area"></div>
        <div id="bridge-error-area"></div>

        <!-- K\xFClt\xFCrel Bilgi -->
        <div id="bridge-insight-area"></div>

        <!-- Kaydet -->
        <div id="bridge-save-area"></div>


        <!-- Koleksiyon -->
        <div class="bridge-collection-section">
          <div class="bridge-collection-header">
            <div class="bridge-collection-title">
              Koleksiyonum
              <span class="bridge-collection-count" id="coll-count-badge">${this.collection.length}</span>
            </div>
            ${this.collection.length?'<button class="bridge-collection-clear" id="bridge-coll-clear">Temizle</button>':""}
          </div>
          <div class="bridge-tag-filter-row" id="bridge-tag-filter-row"></div>
          <div class="bridge-collection-grid" id="bridge-coll-grid"></div>
        </div>
      </div>
    `,this._bindEvents(),this._renderCollection()}_bindEvents(){var t,a,l,s,d;const e=this.el.querySelector("#bridge-textarea"),i=this.el.querySelector("#bridge-char-count");e==null||e.addEventListener("input",()=>{i.textContent=`${e.value.length} / 400`}),this.el.querySelectorAll(".bridge-example-pill").forEach(o=>{o.addEventListener("click",()=>{e&&(e.value=o.dataset.example,i.textContent=`${e.value.length} / 400`,e.focus())})});const r=this.el.querySelector("#bridge-trigger-btn");r==null||r.addEventListener("click",()=>{if(typeof BRIDGE_DATA!="undefined"&&BRIDGE_DATA.length){const o=this.activeCategory?BRIDGE_DATA.filter(c=>c.category===this.activeCategory):BRIDGE_DATA,n=o.length?o:BRIDGE_DATA;let g;do g=n[Math.floor(Math.random()*n.length)];while(this._lastRandom===g.id&&n.length>1);if(this._lastRandom=g.id,e){e.value=g.tr;const c=this.el.querySelector("#bridge-char-count");c&&(c.textContent=`${g.tr.length} / 400`)}this._analyze(g.tr)}}),e==null||e.addEventListener("keydown",o=>{if((o.ctrlKey||o.metaKey)&&o.key==="Enter"){const n=e.value.trim();n&&this._analyze(n)}}),(t=this.el.querySelector("#bridge-cat-filter-bar"))==null||t.addEventListener("click",o=>{const n=o.target.closest(".bridge-cat-chip");n&&(this.el.querySelectorAll(".bridge-cat-chip").forEach(g=>g.classList.remove("active")),n.classList.add("active"),this.activeCategory=n.dataset.cat||null)}),e==null||e.addEventListener("focus",()=>this._showSearchHistory()),e==null||e.addEventListener("input",()=>{e.value.trim()?this._hideSearchHistory():this._showSearchHistory()}),document.addEventListener("click",o=>{o.target.closest("#bridge-tr-panel")||this._hideSearchHistory()}),(a=this.el.querySelector("#bridge-quiz-btn"))==null||a.addEventListener("click",()=>this._showQuiz()),(l=this.el.querySelector("#bridge-daily-btn"))==null||l.addEventListener("click",()=>this._showDaily()),(s=this.el.querySelector("#bridge-stats-btn"))==null||s.addEventListener("click",()=>this._showStats()),(d=this.el.querySelector("#bridge-coll-clear"))==null||d.addEventListener("click",()=>{if(confirm("Koleksiyonun t\xFCm k\xF6pr\xFCleri silinecek. Emin misin?")){this.collection=[],localStorage.removeItem("bridge_collection"),this._renderCollection();const o=this.el.querySelector("#bridge-stat-coll"),n=this.el.querySelector("#coll-count-badge");o&&(o.textContent="0"),n&&(n.textContent="0");const g=this.el.querySelector("#bridge-coll-clear");g&&g.remove()}})}_analyze(e){const i=this.el.querySelector("#bridge-trigger-btn"),r=this.el.querySelector("#bridge-tr-panel");if(!i||!r)return;i.classList.add("loading"),i.disabled=!0,this._clearResult();const t=document.createElement("div");t.className="bridge-loading-overlay",t.id="bridge-loading",t.innerHTML=`
      <div class="bridge-loading-dots"><span></span><span></span><span></span></div>
      <div class="bridge-loading-text">Kavramsal k\xF6pr\xFCler aran\u0131yor\u2026</div>
    `,r.style.position="relative",r.appendChild(t),setTimeout(()=>{var l;if(i.classList.remove("loading"),i.disabled=!1,(l=document.getElementById("bridge-loading"))==null||l.remove(),typeof findBridgeMatch!="function"){this._showError("Veritaban\u0131 y\xFCklenemedi. Sayfay\u0131 yenile.");return}const a=findBridgeMatch(e);if(a){this._renderResult(e,a.entry),this._updateFlowScore(a.entry),this.bridgeCount++,localStorage.setItem("bridge_count",this.bridgeCount);const s=this.el.querySelector("#bridge-stat-count");s&&(s.textContent=this.bridgeCount),this._addToSearchHistory(e),this._updateStreak()}else{const s=getTopMatches(e,3);s.length>0?this._showSuggestions(e,s):this._showNotFound(e)}},350)}_showNotFound(e){const i=this.el.querySelector("#bridge-result-content"),r=this.el.querySelector("#bridge-placeholder");r&&(r.style.display="none"),i&&(i.style.display="flex",i.innerHTML=`
        <div style="padding:12px 0;width:100%">
          <div style="font-size:1.5rem;margin-bottom:8px">\u{1F50D}</div>
          <div style="font-weight:700;color:var(--text-1);margin-bottom:6px">Bu ifade veritaban\u0131nda yok</div>
          <div style="color:var(--text-3);font-size:0.82rem;line-height:1.5">
            "<em>${e}</em>" i\xE7in haz\u0131r k\xF6pr\xFC analizi bulunamad\u0131.<br>
            A\u015Fa\u011F\u0131dan benzer ifadeleri ke\u015Ffedebilirsin.
          </div>
          <div style="margin-top:12px;font-size:0.75rem;color:var(--text-3)">
            \u{1F4A1} Daha k\u0131sa veya farkl\u0131 bir ifade dene
          </div>
        </div>
      `)}_showSuggestions(e,i){const r=this.el.querySelector("#bridge-result-content"),t=this.el.querySelector("#bridge-placeholder");if(t&&(t.style.display="none"),r){r.style.display="flex";const a=i.map(l=>`<button class="bridge-suggestion-pill" data-tr="${l.tr}">${l.tr}</button>`).join("");r.innerHTML=`
        <div style="padding:12px 0;width:100%">
          <div style="font-weight:700;color:var(--text-1);margin-bottom:6px">Benzer ifadeler</div>
          <div style="color:var(--text-3);font-size:0.82rem;margin-bottom:12px">
            "<em>${e}</em>" i\xE7in tam e\u015Fle\u015Fme bulunamad\u0131. Bunlar\u0131 dene:
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">${a}</div>
        </div>
      `,r.querySelectorAll(".bridge-suggestion-pill").forEach(l=>{l.addEventListener("click",()=>{const s=this.el.querySelector("#bridge-textarea"),d=this.el.querySelector("#bridge-char-count");s&&(s.value=l.dataset.tr,d&&(d.textContent=`${s.value.length} / 400`),this._analyze(l.dataset.tr))})})}}_renderResult(e,i){var a,l,s;this.currentData={originalTR:e,...i,savedAt:new Date().toISOString()},this.saved=!1;const r=this.el.querySelector("#bridge-placeholder"),t=this.el.querySelector("#bridge-result-content");if(r&&(r.style.display="none"),t){t.style.display="flex";const d=i.register||"neutral",o={informal:"G\xFCnl\xFCk",formal:"Resmi",neutral:"N\xF6tr"}[d]||"N\xF6tr",n=(i.alternatives||[]).map(g=>`<div class="bridge-alt-item">${g}</div>`).join("");t.innerHTML=`
        <div class="bridge-primary-row">
          <div class="bridge-primary-en">"${i.english_primary}"</div>
          <button class="bridge-speak-btn" id="bridge-speak-btn" title="Telaffuz et">\u{1F50A}</button>
          <button class="bridge-share-btn" id="bridge-share-btn" title="Payla\u015F">\u2197</button>
        </div>
        <span class="bridge-register-badge ${d}">${o}</span>
        ${(a=i.alternatives)!=null&&a.length?`
          <div class="bridge-alternatives">
            <div class="bridge-alt-label">Ton Se\xE7enekleri <span style="opacity:0.5;font-size:0.6rem">(t\u0131kla \u2192 kopyala)</span></div>
            ${n}
          </div>`:""}
      `,(l=t.querySelector("#bridge-speak-btn"))==null||l.addEventListener("click",()=>{this._speak(i.english_primary)}),(s=t.querySelector("#bridge-share-btn"))==null||s.addEventListener("click",()=>{this._shareCard(e,i)})}t==null||t.querySelectorAll(".bridge-alt-item").forEach(d=>{d.addEventListener("click",()=>{var n;(n=navigator.clipboard)==null||n.writeText(d.textContent.trim()).catch(()=>{});const o=d.textContent;d.textContent="\u2713 Kopyaland\u0131",d.style.color="var(--green)",setTimeout(()=>{d.textContent=o,d.style.color=""},1200)})}),this._renderBridgeCards(i.bridges||[]),this._renderContext(i),this._renderCommonError(i),this._renderInsight(i.cultural_insight,i.fluency_tip),this._renderSaveBtn()}_renderBridgeCards(e){const i=this.el.querySelector("#bridge-cards-section");i&&(i.innerHTML='<div class="bridge-cards-title">Kavram K\xF6pr\xFCleri</div>',e.forEach((r,t)=>{const a=r.bridge_type||"direct",l=this.BRIDGE_META[a]||this.BRIDGE_META.direct,s=document.createElement("div");s.className=`bridge-card-row btype-${a}`,s.style.animationDelay=`${t*.1}s`;const d=this._buildSVGPath(a);s.innerHTML=`
        <div class="bridge-frag bridge-frag--tr">
          <div class="bridge-frag-word">${r.tr_fragment||""}</div>
          <div class="bridge-frag-gloss">${r.tr_gloss||""}</div>
          <div class="bridge-frag-expl">${r.explanation||""}</div>
        </div>
        <div class="bridge-connector" title="${l.desc}">
          ${d}
          <div class="bridge-connector-type">${l.label}</div>
        </div>
        <div class="bridge-frag bridge-frag--en">
          <div class="bridge-frag-word">${r.en_fragment||""}</div>
          <div class="bridge-frag-gloss">&nbsp;</div>
          <div class="bridge-frag-expl">${r.explanation||""}</div>
        </div>
      `,s.addEventListener("click",()=>{s.classList.toggle("expanded")}),i.appendChild(s)}))}_buildSVGPath(e){let l="";const s="stroke-dasharray:108; stroke-dashoffset:108; animation: draw-line 0.7s ease forwards;";if(e==="direct")l=`<path d="M4,16 L68,16" style="${s}"/>`;else if(e==="transform")l=`<path d="M4,16 C${72*.25},4 ${72*.75},28 68,16" style="${s} stroke:url(#grad-transform);"/>`;else if(e==="multiply"){const d=o=>`animation-delay:${o}s;`;l=`
        <path d="M4,8 L68,8" style="${s} ${d(0)}"/>
        <path d="M4,16   L68,16"   style="${s} ${d(.15)}"/>
        <path d="M4,24 L68,24" style="${s} ${d(.3)}"/>
      `}else e==="disappear"?l=`<path d="M4,16 L${72*.65},16" style="${s} opacity:0.5;" stroke-dasharray="4 6"/>`:e==="emerge"&&(l=`<path d="M${72*.35},16 L68,16" style="${s}"/>`);return`<svg class="bridge-svg-line" viewBox="0 0 72 32" preserveAspectRatio="none">${l}</svg>`}_renderContext(e){const i=this.el.querySelector("#bridge-context-area");if(!i)return;const r=[];if(e.fluency_tip&&[...e.fluency_tip.matchAll(/"([^"]+)"/g)].forEach(a=>{a[1]&&a[1].length>5&&r.push(a[1])}),e.context_sentences&&e.context_sentences.forEach(t=>{r.includes(t)||r.push(t)}),!r.length){i.innerHTML="";return}i.innerHTML=`
      <div class="bridge-feature-card">
        <div class="bridge-feature-label">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h12M2 8h8M2 12h10"/></svg>
          Ger\xE7ek Kullan\u0131m
        </div>
        ${r.map(t=>`
          <div class="bridge-ctx-item">
            <div class="bridge-ctx-quote">"${t}"</div>
            <button class="bridge-ctx-play" data-text="${t.replace(/"/g,"&quot;")}" title="Dinle">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3L3 5H1v6h2l2 2V3z"/><path d="M9 5.5a4 4 0 0 1 0 5"/><path d="M12 3a7 7 0 0 1 0 10"/></svg>
            </button>
          </div>
        `).join("")}
      </div>
    `,i.querySelectorAll(".bridge-ctx-play").forEach(t=>{t.addEventListener("click",()=>this._speak(t.dataset.text))})}_renderCommonError(e){const i=this.el.querySelector("#bridge-error-area");if(!i)return;if(!(e.bridges||[]).filter(a=>a.bridge_type!=="direct").length){i.innerHTML="";return}const t=(e.bridges||[]).map(a=>a.tr_gloss||a.tr_fragment).filter(Boolean).join(" / ");if(!t){i.innerHTML="";return}i.innerHTML=`
      <div class="bridge-feature-card bridge-error-card">
        <div class="bridge-feature-label">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><path d="M8 5v3.5M8 11v.5"/></svg>
          \xC7eviri Tuza\u011F\u0131
        </div>
        <div class="bridge-trap-row">
          <div class="bridge-trap-wrong">
            <span class="bridge-trap-x">\u2715</span>
            <span class="bridge-trap-text">"${t}"</span>
          </div>
          <div class="bridge-trap-sep">\u2192</div>
          <div class="bridge-trap-right">
            <span class="bridge-trap-check">\u2713</span>
            <span class="bridge-trap-text">"${e.english_primary}"</span>
          </div>
        </div>
      </div>
    `}_renderExplorer(e){const i=this.el.querySelector("#bridge-explorer-grid"),r=this.el.querySelector("#bridge-explorer-footer");if(!i||typeof BRIDGE_DATA=="undefined")return;const t=24;let a=e?BRIDGE_DATA.filter(n=>n.category===e):BRIDGE_DATA;const l=this.searchQuery.trim().toLowerCase();if(l&&(a=a.filter(n=>n.tr.toLowerCase().includes(l)||(n.english_primary||"").toLowerCase().includes(l))),this.activeTypeFilter&&(a=a.filter(n=>(n.bridges||[]).some(g=>g.bridge_type===this.activeTypeFilter))),!a.length){i.innerHTML='<div style="color:var(--text-3);font-size:0.82rem;padding:12px">Sonu\xE7 bulunamad\u0131.</div>',r&&(r.innerHTML="");return}const d=!!(l||e)?a:a.slice(0,this.explorerPage*t),o=a.length-d.length;i.innerHTML=d.map(n=>{const g=(n.bridges||[]).map(b=>`<div class="bridge-coll-type-dot ${b.bridge_type||"direct"}"></div>`).join(""),c={informal:"G\xFCnl\xFCk",formal:"Resmi",neutral:"N\xF6tr"}[n.register]||"";return`
        <div class="bridge-coll-card bridge-explorer-card" data-id="${n.id}">
          <div class="bridge-coll-tr">${n.tr}</div>
          <div class="bridge-coll-en">"${n.english_primary}"</div>
          <div class="bridge-coll-meta">
            <span class="bridge-coll-date">${c}</span>
            <div class="bridge-coll-bridges">${g}</div>
          </div>
        </div>`}).join(""),i.querySelectorAll(".bridge-explorer-card").forEach(n=>{n.addEventListener("click",()=>{var u;const g=parseInt(n.dataset.id),c=BRIDGE_DATA.find(p=>p.id===g);if(!c)return;const b=this.el.querySelector("#bridge-textarea"),v=this.el.querySelector("#bridge-char-count");b&&(b.value=c.tr,v&&(v.textContent=`${c.tr.length} / 400`),(u=this.el.querySelector("#bridge-workspace"))==null||u.scrollIntoView({behavior:"smooth",block:"center"})),this._renderResult(c.tr,c),this._updateFlowScore(c),this.bridgeCount++,localStorage.setItem("bridge_count",this.bridgeCount);const h=this.el.querySelector("#bridge-stat-count");h&&(h.textContent=this.bridgeCount)})}),r&&(o>0?(r.innerHTML=`<button class="bridge-load-more" id="bridge-load-more">Daha Fazla G\xF6ster <span>${o} ifade daha</span></button>`,r.querySelector("#bridge-load-more").addEventListener("click",()=>{this.explorerPage++,this._renderExplorer(this.activeCategory)})):r.innerHTML="")}_renderInsight(e,i){const r=this.el.querySelector("#bridge-insight-area");!r||!e&&!i||(r.innerHTML=`
      <div class="bridge-insight">
        <div class="bridge-insight-icon">\u25C8</div>
        <div class="bridge-insight-body">
          <div class="bridge-insight-label">K\xFClt\xFCrel & Dilbilimsel Not</div>
          ${e?`<p class="bridge-insight-text">${e}</p>`:""}
          ${i?`<p class="bridge-fluency-tip">${i}</p>`:""}
        </div>
      </div>
    `)}_renderSaveBtn(){const e=this.el.querySelector("#bridge-save-area");e&&(e.innerHTML=`
      <button class="bridge-shadow-btn" id="bridge-shadow-btn">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M10 6v4l2.5 2.5"/></svg>
        G\xF6lgeleme Prati\u011Fi
      </button>
      <button class="bridge-save-btn" id="bridge-save-btn">
        Koleksiyona Kaydet
      </button>
    `,e.querySelector("#bridge-save-btn").addEventListener("click",()=>{this._saveToCollection()}),e.querySelector("#bridge-shadow-btn").addEventListener("click",()=>{this.currentData&&this._startShadowing(this.currentData)}))}_updateFlowScore(e){const r=(e.bridges||[]).reduce((d,o)=>d+({direct:1,transform:3,multiply:2,disappear:2,emerge:3}[o.bridge_type]||1),0),t=Math.min(5,r*.5);this.flowScore=Math.min(100,this.flowScore+t),localStorage.setItem("bridge_flow_score",this.flowScore.toString());const a=Math.round(this.flowScore),l=this.el.querySelector("#bridge-flow-fill"),s=this.el.querySelector("#bridge-flow-pct");l&&(l.style.width=a+"%"),s&&(s.textContent=a+"%")}_saveToCollection(){if(!this.currentData||this.saved)return;const e=this.el.querySelector("#bridge-save-btn"),i=prompt("Etiket ekle (iste\u011Fe ba\u011Fl\u0131 \u2014 \xF6rn: i\u015F, s\u0131nav, g\xFCnl\xFCk):","")||"",r=Date.now();this.collection.unshift({...this.currentData,id:r,tag:i.trim()}),this.collection.length>50&&this.collection.pop(),localStorage.setItem("bridge_collection",JSON.stringify(this.collection)),i.trim()&&(this.collectionTags[r]=i.trim(),localStorage.setItem("bridge_coll_tags",JSON.stringify(this.collectionTags))),this.saved=!0,e&&(e.classList.add("saved"),e.textContent="\u2713 Koleksiyona Eklendi",e.disabled=!0);const t=this.el.querySelector("#bridge-stat-coll"),a=this.el.querySelector("#coll-count-badge");t&&(t.textContent=this.collection.length),a&&(a.textContent=this.collection.length),this._renderCollection()}_renderCollection(){const e=this.el.querySelector("#bridge-coll-grid");if(!e)return;const i=this.el.querySelector("#bridge-tag-filter-row");if(i){const a=[...new Set(this.collection.map(l=>l.tag).filter(Boolean))];a.length?(i.innerHTML=`
          <button class="bridge-tag-chip ${this.activeTagFilter?"":"active"}" data-tag="">T\xFCm\xFC</button>
          ${a.map(l=>`<button class="bridge-tag-chip ${this.activeTagFilter===l?"active":""}" data-tag="${l}">${l}</button>`).join("")}
        `,i.querySelectorAll(".bridge-tag-chip").forEach(l=>{l.addEventListener("click",()=>{this.activeTagFilter=l.dataset.tag||null,this._renderCollection()})})):i.innerHTML=""}let r=this.activeTagFilter?this.collection.filter(a=>a.tag===this.activeTagFilter):this.collection;if(!r.length){e.innerHTML=`
        <div class="bridge-empty-coll" style="grid-column:1/-1">
          <div class="bridge-empty-coll-icon">\u{1F309}</div>
          <p>Hen\xFCz k\xF6pr\xFC kaydetmedin.<br>\u0130fadeleri incele ve koleksiyona ekle.</p>
        </div>`;return}const t=new Date().toDateString();r=[...r].sort((a,l)=>{const s=this._isSRDue(a.id,t);return(this._isSRDue(l.id,t)?1:0)-(s?1:0)}),e.innerHTML=r.map(a=>{const l=new Date(a.savedAt||a.id).toLocaleDateString("tr-TR",{day:"numeric",month:"short"}),s=(a.bridges||[]).map(n=>`<div class="bridge-coll-type-dot ${n.bridge_type||"direct"}"></div>`).join(""),d=this._isSRDue(a.id,t),o=a.tag?`<span class="bridge-coll-tag">${a.tag}</span>`:"";return`
        <div class="bridge-coll-card ${d?"sr-due":""}" data-id="${a.id}">
          ${d?'<div class="bridge-sr-indicator" title="Bug\xFCn tekrar zaman\u0131!">\u21BA</div>':""}
          <div class="bridge-coll-tr">${a.originalTR||""}</div>
          <div class="bridge-coll-en">"${a.english_primary||""}"</div>
          <div class="bridge-coll-meta">
            <span class="bridge-coll-date">${l}</span>
            ${o}
            <div class="bridge-coll-bridges">${s}</div>
          </div>
        </div>`}).join(""),e.querySelectorAll(".bridge-coll-card").forEach(a=>{a.addEventListener("click",()=>{const l=parseInt(a.dataset.id),s=this.collection.find(d=>d.id===l);s&&this._showDetail(s)})})}_showDetail(e){var l;const i=document.createElement("div");i.className="bridge-modal-overlay";const r=(e.bridges||[]).map(s=>{const d=this.BRIDGE_META[s.bridge_type||"direct"];return`
        <div class="bridge-card-row btype-${s.bridge_type||"direct"}" style="animation:none;opacity:1;transform:none;margin-bottom:8px">
          <div class="bridge-frag bridge-frag--tr">
            <div class="bridge-frag-word">${s.tr_fragment}</div>
            <div class="bridge-frag-gloss">${s.tr_gloss}</div>
          </div>
          <div class="bridge-connector">
            ${this._buildSVGPath(s.bridge_type||"direct")}
            <div class="bridge-connector-type">${(d==null?void 0:d.label)||""}</div>
          </div>
          <div class="bridge-frag bridge-frag--en">
            <div class="bridge-frag-word">${s.en_fragment}</div>
            <div class="bridge-frag-gloss">${s.explanation}</div>
          </div>
        </div>`}).join("");i.innerHTML=`
      <div class="bridge-modal">
        <button class="bridge-modal-close">\u2715</button>
        <div class="bridge-modal-tr">${e.originalTR}</div>
        <div class="bridge-modal-en">"${e.english_primary}"</div>
        ${r}
        ${e.cultural_insight?`
          <div class="bridge-insight" style="margin:16px 0 0">
            <div class="bridge-insight-icon">\u25C8</div>
            <div class="bridge-insight-body">
              <div class="bridge-insight-label">K\xFClt\xFCrel Not</div>
              <p class="bridge-insight-text">${e.cultural_insight}</p>
              ${e.fluency_tip?`<p class="bridge-fluency-tip">${e.fluency_tip}</p>`:""}
            </div>
          </div>`:""}
        <button class="bridge-modal-action-btn" id="modal-speak-btn">\u{1F50A} Telaffuz Et</button>
        <div class="bridge-sr-buttons" id="modal-sr-btns">
          <div class="bridge-sr-label">Tekrar planla:</div>
          <button class="bridge-sr-btn sr-again" data-diff="again">\u21BA Tekrar</button>
          <button class="bridge-sr-btn sr-hard"  data-diff="hard">\u{1F613} Zor</button>
          <button class="bridge-sr-btn sr-easy"  data-diff="easy">\u{1F60A} Kolay</button>
        </div>
        <button class="bridge-modal-action-btn" id="modal-load-btn">\u2197 \xC7al\u0131\u015Fma Alan\u0131na Y\xFCkle</button>
        <button class="bridge-modal-action-btn bridge-modal-action-btn--danger" id="modal-delete-btn">\u{1F5D1} Koleksiyondan Sil</button>
      </div>
    `;const t=()=>{i.remove(),document.removeEventListener("keydown",a)},a=s=>{s.key==="Escape"&&t()};document.addEventListener("keydown",a),(l=i.querySelector("#modal-speak-btn"))==null||l.addEventListener("click",()=>{if(window.speechSynthesis){window.speechSynthesis.cancel();const s=new SpeechSynthesisUtterance(e.english_primary);s.lang="en-US",s.rate=.9,window.speechSynthesis.speak(s)}}),i.querySelectorAll(".bridge-sr-btn").forEach(s=>{s.addEventListener("click",()=>{this._updateSR(e.id,s.dataset.diff);const d=i.querySelector("#modal-sr-btns");d&&(d.innerHTML='<div class="bridge-sr-done">\u2713 Tekrar plan\u0131 g\xFCncellendi</div>')})}),i.querySelector("#modal-load-btn").addEventListener("click",()=>{var o;const s=this.el.querySelector("#bridge-textarea"),d=this.el.querySelector("#bridge-char-count");s&&(s.value=e.originalTR||e.tr||"",d&&(d.textContent=`${s.value.length} / 400`),this._renderResult(e.originalTR||e.tr,e),this._updateFlowScore(e),(o=this.el.querySelector("#bridge-workspace"))==null||o.scrollIntoView({behavior:"smooth",block:"center"})),t()}),i.querySelector("#modal-delete-btn").addEventListener("click",()=>{this.collection=this.collection.filter(o=>o.id!==e.id),localStorage.setItem("bridge_collection",JSON.stringify(this.collection)),t(),this._renderCollection();const s=this.el.querySelector("#bridge-stat-coll"),d=this.el.querySelector("#coll-count-badge");s&&(s.textContent=this.collection.length),d&&(d.textContent=this.collection.length)}),i.querySelector(".bridge-modal-close").addEventListener("click",t),i.addEventListener("click",s=>{s.target===i&&t()}),document.body.appendChild(i)}_showError(e){const i=this.el.querySelector("#bridge-result-content"),r=this.el.querySelector("#bridge-placeholder");r&&(r.style.display="none"),i&&(i.style.display="flex",i.innerHTML=`
        <div style="color:#f87171;font-size:0.85rem;padding:12px 0">
          <div style="font-weight:700;margin-bottom:6px">\u26A0\uFE0F Hata olu\u015Ftu</div>
          <div style="color:var(--text-3)">${e}</div>
        </div>`)}_clearResult(){const e=this.el.querySelector("#bridge-placeholder"),i=this.el.querySelector("#bridge-result-content"),r=this.el.querySelector("#bridge-cards-section"),t=this.el.querySelector("#bridge-context-area"),a=this.el.querySelector("#bridge-error-area"),l=this.el.querySelector("#bridge-insight-area"),s=this.el.querySelector("#bridge-save-area");e&&(e.style.display="flex"),i&&(i.style.display="none",i.innerHTML=""),r&&(r.innerHTML=""),t&&(t.innerHTML=""),a&&(a.innerHTML=""),l&&(l.innerHTML=""),s&&(s.innerHTML=""),this.currentData=null,this.saved=!1}_speak(e){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const i=new SpeechSynthesisUtterance(e);i.lang="en-US",i.rate=.9;const r=this.el.querySelector("#bridge-speak-btn");r&&(r.textContent="\u{1F50A}",r.classList.add("speaking")),i.onend=()=>{r&&(r.textContent="\u{1F50A}",r.classList.remove("speaking"))},window.speechSynthesis.speak(i)}_shareCard(e,i){const r=document.createElement("canvas");r.width=800,r.height=420;const t=r.getContext("2d"),a=t.createLinearGradient(0,0,800,420);a.addColorStop(0,"#060d1b"),a.addColorStop(1,"#0d1829"),t.fillStyle=a,t.roundRect(0,0,800,420,24),t.fill();const l=t.createLinearGradient(0,0,800,0);l.addColorStop(0,"#f59e0b"),l.addColorStop(1,"#00d4ff"),t.fillStyle=l,t.fillRect(0,0,800,5),t.fillStyle="#ffffff",t.font="bold 18px system-ui, sans-serif",t.fillText("\u{1F309} K\xD6PR\xDC",36,46),t.fillStyle="#fbbf24",t.font="20px system-ui, sans-serif",t.fillText(e,36,110),t.fillStyle="#4b5563",t.font="28px system-ui, sans-serif",t.fillText("\u2193",36,165),t.fillStyle="#00d4ff",t.font="bold 32px system-ui, sans-serif";const s=`"${i.english_primary}"`;if(t.fillText(s,36,220),i.cultural_insight){t.fillStyle="#94a3b8",t.font="15px system-ui, sans-serif";const d=i.cultural_insight.split(" ");let o="",n=290;for(const g of d){const c=o+g+" ";if(t.measureText(c).width>720&&o){if(t.fillText(o,36,n),o=g+" ",n+=22,n>360)break}else o=c}n<=360&&t.fillText(o,36,n)}t.fillStyle="rgba(255,255,255,0.05)",t.fillRect(0,385,800,35),t.fillStyle="#4b5563",t.font="13px system-ui, sans-serif",t.fillText("English Rhapsody \xB7 Kavramsal Dil D\xF6n\xFC\u015F\xFCm St\xFCdyosu",36,408),r.toBlob(d=>{const o=URL.createObjectURL(d),n=document.createElement("a");n.href=o,n.download=`kopru-${Date.now()}.png`,n.click(),URL.revokeObjectURL(o)})}_addToSearchHistory(e){this.searchHistory=[e,...this.searchHistory.filter(i=>i!==e)].slice(0,10),localStorage.setItem("bridge_search_history",JSON.stringify(this.searchHistory))}_showSearchHistory(){const e=this.el.querySelector("#bridge-history-dropdown"),i=this.el.querySelector("#bridge-textarea");!e||!this.searchHistory.length||(e.innerHTML=this.searchHistory.map(r=>`<button class="bridge-history-item" data-h="${r}">${r}</button>`).join(""),e.style.display="block",e.querySelectorAll(".bridge-history-item").forEach(r=>{r.addEventListener("click",()=>{if(i){i.value=r.dataset.h;const t=this.el.querySelector("#bridge-char-count");t&&(t.textContent=`${i.value.length} / 400`),this._hideSearchHistory(),this._analyze(r.dataset.h)}})}))}_hideSearchHistory(){const e=this.el.querySelector("#bridge-history-dropdown");e&&(e.style.display="none")}_isSRDue(e,i){const r=this.srData[e];return r?r.nextReview===i||new Date(r.nextReview)<new Date(i):!1}_updateSR(e,i){const r=new Date,t=this.srData[e]||{interval:1,ease:2.5,repetitions:0};i==="easy"?(t.interval=Math.round(t.interval*t.ease),t.ease=Math.min(2.5,t.ease+.15),t.repetitions++):i==="hard"?(t.interval=Math.max(1,Math.round(t.interval*1.2)),t.ease=Math.max(1.3,t.ease-.2)):(t.interval=1,t.ease=Math.max(1.3,t.ease-.3),t.repetitions=0);const a=new Date(r);a.setDate(a.getDate()+t.interval),t.nextReview=a.toDateString(),this.srData[e]=t,localStorage.setItem("bridge_sr_data",JSON.stringify(this.srData)),this._renderCollection()}_updateStreak(){const e=new Date().toDateString(),i=new Date(Date.now()-864e5).toDateString();if(this.streakData.lastDate===e)return;this.streakData.lastDate===i?this.streakData.count++:this.streakData.lastDate!==e&&(this.streakData.count=1),this.streakData.lastDate=e,localStorage.setItem("bridge_streak",JSON.stringify(this.streakData));const r=this.el.querySelector("#bridge-stat-streak");r&&(r.textContent=this.streakData.count)}_showQuiz(){if(typeof BRIDGE_DATA=="undefined"||!BRIDGE_DATA.length)return;const e=[...BRIDGE_DATA].sort(()=>Math.random()-.5).slice(0,10);let i=0,r=0;const t=document.createElement("div");t.className="bridge-modal-overlay";const a=()=>{var g;if(i>=e.length){const c=Math.round(r/e.length*100);(g=window.analyticsManager)==null||g.lessonComplete("bridge",c),this.app.addXP(r*10,"medium"),t.innerHTML=`
          <div class="bridge-modal bridge-quiz-modal">
            <button class="bridge-modal-close" id="qclose">\u2715</button>
            <div class="bridge-quiz-score-screen">
              <div class="bridge-quiz-score-emoji">${r>=8?"\u{1F3C6}":r>=5?"\u2B50":"\u{1F4DA}"}</div>
              <div class="bridge-quiz-score-val">${r} / ${e.length}</div>
              <div class="bridge-quiz-score-lbl">${r>=8?"Harika!":r>=5?"\u0130yi i\u015F!":"Daha fazla pratik yap!"}</div>
              <button class="bridge-save-btn" id="qretry" style="margin-top:20px">Tekrar Dene</button>
            </div>
          </div>`,t.querySelector("#qclose").addEventListener("click",()=>{t.remove(),document.removeEventListener("keydown",l)}),t.querySelector("#qretry").addEventListener("click",()=>{t.remove(),document.removeEventListener("keydown",l),this._showQuiz()});return}const s=e[i],n=[...BRIDGE_DATA.filter(c=>c.id!==s.id).sort(()=>Math.random()-.5).slice(0,3).map(c=>c.english_primary),s.english_primary].sort(()=>Math.random()-.5);t.innerHTML=`
        <div class="bridge-modal bridge-quiz-modal">
          <button class="bridge-modal-close" id="qclose">\u2715</button>
          <div class="bridge-quiz-progress">
            <div class="bridge-quiz-progress-fill" style="width:${i/e.length*100}%"></div>
          </div>
          <div class="bridge-quiz-counter">${i+1} / ${e.length}</div>
          <div class="bridge-quiz-question">${s.tr}</div>
          <div class="bridge-quiz-options">
            ${n.map(c=>`<button class="bridge-quiz-opt" data-ans="${c}">${c}</button>`).join("")}
          </div>
          <div class="bridge-quiz-feedback" id="qfeedback"></div>
        </div>`,t.querySelector("#qclose").addEventListener("click",()=>{t.remove(),document.removeEventListener("keydown",l)}),t.querySelectorAll(".bridge-quiz-opt").forEach(c=>{c.addEventListener("click",()=>{const b=c.dataset.ans===s.english_primary;b?(r++,c.classList.add("correct")):(c.classList.add("wrong"),t.querySelectorAll(".bridge-quiz-opt").forEach(h=>{h.dataset.ans===s.english_primary&&h.classList.add("correct")})),t.querySelectorAll(".bridge-quiz-opt").forEach(h=>h.disabled=!0);const v=t.querySelector("#qfeedback");v&&(v.innerHTML=b?'<span style="color:#34d399">\u2713 Do\u011Fru!</span>':`<span style="color:#f87171">\u2717 Do\u011Fru cevap: "${s.english_primary}"</span>`),setTimeout(()=>{i++,a()},1200)})})},l=s=>{s.key==="Escape"&&(t.remove(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l),document.body.appendChild(t),a()}_showDaily(){if(typeof BRIDGE_DATA=="undefined")return;const e=new Date().toDateString(),i=new Date().getDate()+new Date().getMonth()*31,r=[...BRIDGE_DATA].filter((d,o)=>o%2===i%2).slice(i%20,i%20+5),t=document.createElement("div");t.className="bridge-modal-overlay";const a=this.dailyDone.filter(d=>d.date===e).map(d=>d.id),l=r.filter(d=>!a.includes(d.id));t.innerHTML=`
      <div class="bridge-modal bridge-daily-modal">
        <button class="bridge-modal-close" id="dclose">\u2715</button>
        <div class="bridge-daily-header">
          <div class="bridge-daily-title">\u{1F4C5} G\xFCnl\xFCk Pratik</div>
          <div class="bridge-daily-date">${new Date().toLocaleDateString("tr-TR",{weekday:"long",day:"numeric",month:"long"})}</div>
          <div class="bridge-daily-progress-row">
            <div class="bridge-daily-bar">
              <div class="bridge-daily-bar-fill" style="width:${a.length/r.length*100}%"></div>
            </div>
            <span class="bridge-daily-frac">${a.length}/${r.length}</span>
          </div>
        </div>
        <div class="bridge-daily-cards">
          ${r.map(d=>{const o=a.includes(d.id);return`
              <div class="bridge-daily-card ${o?"done":""}" data-id="${d.id}">
                <div class="bridge-daily-card-tr">${d.tr}</div>
                <div class="bridge-daily-card-en">${o?`"${d.english_primary}"`:"\u2014"}</div>
                ${o?'<div class="bridge-daily-check">\u2713</div>':'<button class="bridge-daily-reveal">G\xF6ster</button>'}
              </div>`}).join("")}
        </div>
        ${l.length===0?`<div class="bridge-daily-complete">\u{1F389} Bug\xFCnk\xFC pratik tamamland\u0131! Seri: ${this.streakData.count} g\xFCn \u{1F525}</div>`:""}
      </div>`,t.querySelector("#dclose").addEventListener("click",()=>{t.remove(),document.removeEventListener("keydown",s)}),t.querySelectorAll(".bridge-daily-reveal").forEach(d=>{d.addEventListener("click",()=>{var u,p;const o=d.closest(".bridge-daily-card"),n=parseInt(o.dataset.id),g=BRIDGE_DATA.find(y=>y.id===n);if(!g)return;o.querySelector(".bridge-daily-card-en").textContent=`"${g.english_primary}"`,d.remove();const c=document.createElement("div");c.className="bridge-daily-check",c.textContent="\u2713",o.appendChild(c),o.classList.add("done"),this.dailyDone.push({id:n,date:e}),localStorage.setItem("bridge_daily_done",JSON.stringify(this.dailyDone)),this.app.addXP(10,"easy"),this._updateStreak();const b=this.dailyDone.filter(y=>y.date===e).length,v=t.querySelector(".bridge-daily-bar-fill"),h=t.querySelector(".bridge-daily-frac");if(v&&(v.style.width=`${b/r.length*100}%`),h&&(h.textContent=`${b}/${r.length}`),b===r.length&&(this.app.addXP((p=(u=window.remoteFlags)==null?void 0:u.xp_grammar_rule)!=null?p:30,"medium"),!t.querySelector(".bridge-daily-complete"))){const f=document.createElement("div");f.className="bridge-daily-complete",f.textContent=`\u{1F389} Bug\xFCnk\xFC pratik tamamland\u0131! Seri: ${this.streakData.count} g\xFCn \u{1F525}`,t.querySelector(".bridge-daily-modal").appendChild(f)}})});const s=d=>{d.key==="Escape"&&(t.remove(),document.removeEventListener("keydown",s))};document.addEventListener("keydown",s),t.addEventListener("click",d=>{d.target===t&&(t.remove(),document.removeEventListener("keydown",s))}),document.body.appendChild(t)}_showStats(){const e={},i={direct:0,transform:0,multiply:0,disappear:0,emerge:0};this.collection.forEach(l=>{const s=l.category||"other";e[s]=(e[s]||0)+1,(l.bridges||[]).forEach(d=>{i[d.bridge_type]!==void 0&&i[d.bridge_type]++})});const r=Math.max(...Object.values(i),1),t=document.createElement("div");t.className="bridge-modal-overlay",t.innerHTML=`
      <div class="bridge-modal bridge-stats-modal">
        <button class="bridge-modal-close" id="sclose">\u2715</button>
        <div class="bridge-stats-title">\u{1F4CA} \u0130statistiklerim</div>
        <div class="bridge-stats-grid">
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${this.bridgeCount}</div>
            <div class="bridge-stats-lbl">Toplam K\xF6pr\xFC</div>
          </div>
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${this.collection.length}</div>
            <div class="bridge-stats-lbl">Koleksiyon</div>
          </div>
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${this.streakData.count}</div>
            <div class="bridge-stats-lbl">\u{1F525} Seri</div>
          </div>
          <div class="bridge-stats-card">
            <div class="bridge-stats-val">${Math.round(this.flowScore)}%</div>
            <div class="bridge-stats-lbl">Ak\u0131\u015F Skoru</div>
          </div>
        </div>
        <div class="bridge-stats-section-title">K\xF6pr\xFC Tipleri Da\u011F\u0131l\u0131m\u0131</div>
        <div class="bridge-stats-bars">
          ${Object.entries(i).map(([l,s])=>{const d=this.BRIDGE_META[l],o=Math.round(s/r*100);return`
              <div class="bridge-stats-bar-row">
                <div class="bridge-stats-bar-lbl">${d.label}</div>
                <div class="bridge-stats-bar-track">
                  <div class="bridge-stats-bar-fill" style="width:${o}%;background:${d.color}"></div>
                </div>
                <div class="bridge-stats-bar-num">${s}</div>
              </div>`}).join("")}
        </div>
        <div class="bridge-stats-section-title">Kategori Da\u011F\u0131l\u0131m\u0131</div>
        <div class="bridge-stats-bars">
          ${(typeof BRIDGE_CATEGORIES!="undefined"?BRIDGE_CATEGORIES:[]).map(l=>{const s=e[l.id]||0,d=Math.max(...(typeof BRIDGE_CATEGORIES!="undefined"?BRIDGE_CATEGORIES:[]).map(n=>e[n.id]||0),1),o=Math.round(s/d*100);return`
              <div class="bridge-stats-bar-row">
                <div class="bridge-stats-bar-lbl">${l.icon} ${l.label}</div>
                <div class="bridge-stats-bar-track">
                  <div class="bridge-stats-bar-fill" style="width:${o}%;background:rgba(var(--a1-rgb),0.75)"></div>
                </div>
                <div class="bridge-stats-bar-num">${s}</div>
              </div>`}).join("")}
        </div>
        ${(()=>{const l=(typeof BRIDGE_CATEGORIES!="undefined"?BRIDGE_CATEGORIES:[]).filter(d=>!e[d.id]),s=this.collection.filter(d=>this._isSRDue(d.id,new Date().toDateString())).length;return`
            ${l.length?`
              <div class="bridge-stats-section-title">Zay\u0131f Noktalar \u2014 Hi\xE7 \xE7al\u0131\u015F\u0131lmad\u0131</div>
              <div class="bridge-stats-weak-row">
                ${l.map(d=>`<span class="bridge-stats-weak-chip">${d.icon} ${d.label}</span>`).join("")}
              </div>`:""}
            ${s>0?`
              <div class="bridge-stats-due-banner">
                <span class="bridge-stats-due-n">${s}</span> ifade bug\xFCn tekrar zaman\u0131 \u2193
              </div>`:""}
          `})()}
        <div class="bridge-stats-section-title">Arama Ge\xE7mi\u015Fi</div>
        <div class="bridge-stats-history">
          ${this.searchHistory.length?this.searchHistory.map(l=>`<span class="bridge-stats-hist-item">${l}</span>`).join(""):'<span style="color:var(--text-3);font-size:0.8rem">Hen\xFCz arama yap\u0131lmad\u0131.</span>'}
        </div>
      </div>`,t.querySelector("#sclose").addEventListener("click",()=>{t.remove(),document.removeEventListener("keydown",a)}),t.addEventListener("click",l=>{l.target===t&&(t.remove(),document.removeEventListener("keydown",a))});const a=l=>{l.key==="Escape"&&(t.remove(),document.removeEventListener("keydown",a))};document.addEventListener("keydown",a),document.body.appendChild(t)}_startShadowing(e){const i=e.english_primary||"";if(!i||!window.speechSynthesis)return;const r=new Set(["the","a","an","to","of","in","on","at","by","for","with","and","or","but","i","you","he","she","it","we","they","is","am","are","was","were","be","been","do","does","did","have","has","had","will","would","shall","should","may","might","can","could","m","re","ve","ll","s","t","d","my","your","his","her","its","our","their","me","him","us","them","this","that"]),t=i.split(" ").map(n=>{const g=n.toLowerCase().replace(/[^a-z']/g,"");return`<span class="sh-word ${r.has(g)?"sh-weak":"sh-strong"}">${n}</span>`}).join(" "),a=3;let l=!1;const s=document.createElement("div");s.className="bridge-shadow-overlay",s.innerHTML=`
      <div class="bridge-shadow-panel">
        <button class="bridge-shadow-close" id="sh-close">\u2715</button>
        <div class="bridge-shadow-mode-label">G\xF6lgeleme Modu</div>
        <div class="bridge-shadow-tr">${e.tr||""}</div>
        <div class="bridge-shadow-phrase" id="sh-phrase">${t}</div>
        <div class="bridge-shadow-status" id="sh-status">Haz\u0131rlan\u0131yor\u2026</div>
        <div class="bridge-shadow-dots" id="sh-dots">
          ${Array.from({length:a},(n,g)=>`<div class="sh-dot" id="sh-dot-${g}"></div>`).join("")}
        </div>
        <div class="bridge-shadow-hint" id="sh-hint">Kal\u0131n kelimeler vurgulu \u2014 onlara odaklan</div>
      </div>
    `,document.body.appendChild(s);const d=()=>{l=!0,window.speechSynthesis.cancel(),s.remove()};s.querySelector("#sh-close").addEventListener("click",d),s.addEventListener("click",n=>{n.target===s&&d()});const o=n=>{if(l||!s.isConnected)return;const g=s.querySelector(`#sh-dot-${n}`),c=s.querySelector("#sh-status"),b=s.querySelector("#sh-hint"),v=s.querySelector("#sh-phrase");g&&g.classList.add("active"),c&&(c.textContent="\u25B6 Dinliyorsun\u2026"),b&&(b.textContent="Dikkatle dinle, ritmi hisset"),v&&v.classList.add("speaking");const h=new SpeechSynthesisUtterance(i);h.lang="en-US",h.rate=.8,h.onend=()=>{s.isConnected&&(v&&v.classList.remove("speaking"),g&&(g.classList.remove("active"),g.classList.add("done")),c&&(c.textContent="\u{1F399} \u015Eimdi sen tekrar et!"),b&&(b.textContent=`Tur ${n+1} / ${a}  \u2014  Sesli s\xF6yle`),setTimeout(()=>{l||!s.isConnected||(n+1<a?o(n+1):(c&&(c.textContent="\u2713 Harika pratik!"),b&&(b.textContent="Bu ifadeyi koleksiyona eklemeyi unutma."),setTimeout(()=>{s.isConnected&&d()},2500)))},3500))},window.speechSynthesis.speak(h)};setTimeout(()=>o(0),400)}}window.BridgeModule=BridgeModule;
