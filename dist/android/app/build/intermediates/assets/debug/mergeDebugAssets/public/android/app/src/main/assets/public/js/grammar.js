class GrammarMode{constructor(t){this.app=t,this.root=null,this._drillState=null}init(t){this.root=t,this._showLevels(),window._gramDelegateAttached||(window._gramDelegateAttached=!0,document.addEventListener("click",e=>{if(!window.grammarMod)return;const r=e.target.closest(".gram-show-rules-btn");if(r){window.grammarMod._showRules(r.dataset.level);return}const s=e.target.closest(".gram-show-rule-btn");if(s){window.grammarMod._showRule(s.dataset.ruleId);return}const a=e.target.closest(".gram-speak-btn");if(a){window.grammarMod._speak(a.dataset.text);return}const i=e.target.closest(".gram-start-drill-btn");if(i){window.grammarMod._startDrill(i.dataset.ruleId,0);return}const o=e.target.closest(".gram-decode-pick-btn");if(o){window.grammarMod._decodePick(o,parseInt(o.dataset.index));return}const d=e.target.closest(".gram-mutate-pick-btn");if(d){window.grammarMod._mutatePick(d,parseInt(d.dataset.index));return}if(e.target.closest(".gram-show-levels-btn")){window.grammarMod._showLevels();return}const n=e.target.closest(".gram-continue-btn");if(n){window.grammarMod._showRules(n.dataset.level);return}const u=e.target.closest(".gram-repeat-btn");if(u){window.grammarMod._startDrill(u.dataset.ruleId,0);return}const l=e.target.closest(".gram-forge-word-btn");if(l){window.grammarMod._forgeClick(l);return}if(e.target.closest(".gram-forge-clear-btn")){window.grammarMod._forgeClear();return}if(e.target.closest(".gram-forge-submit-btn")){window.grammarMod._forgeSubmit();return}const c=e.target.closest(".gram-clash-pick-btn");if(c){window.grammarMod._clashPick(c,c.dataset.choice);return}if(e.target.closest(".gram-transform-submit-btn")){window.grammarMod._transformSubmit();return}const v=e.target.closest(".gram-dna-base");if(v){v.classList.toggle("revealed");return}}),document.addEventListener("keydown",e=>{window.grammarMod&&e.key==="Enter"&&e.target.classList.contains("gram-transform-input")&&window.grammarMod._transformSubmit()}))}destroy(){this.root&&(this.root.innerHTML="")}_getMastery(){return this.app.state.get("grammarMastery")||{}}_setMastery(t){this.app.state.set("grammarMastery",t)}_getRuleMastery(t){return this._getMastery()[t]||0}_setRuleMastery(t,e){const r=this._getMastery();r[t]=e,this._setMastery(r)}_getLevelProgress(t){const e=GRAMMAR_DATA.rules.filter(r=>r.level===t);return{done:e.filter(r=>this._getRuleMastery(r.id)>=3).length,total:e.length}}_showLevels(){const t=GRAMMAR_DATA.levelInfo,e=Object.entries(t).map(([r,s])=>{const{done:a,total:i}=this._getLevelProgress(r),o=i?Math.round(a/i*100):0,d=2*Math.PI*26,n=d-o/100*d;return`
        <button class="gl-level-card gram-show-rules-btn" style="--lv-color:${s.color};--lv-glow:${s.glow}"
                data-level="${r}">
          <div class="glc-ring">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
              <circle cx="32" cy="32" r="26" fill="none" stroke="${s.color}" stroke-width="4"
                stroke-dasharray="${d}" stroke-dashoffset="${n}"
                stroke-linecap="round" transform="rotate(-90 32 32)"/>
            </svg>
            <div class="glc-ring-icon">${s.icon}</div>
          </div>
          <div class="glc-body">
            <div class="glc-level">${r}</div>
            <div class="glc-label">${s.label}</div>
            <div class="glc-desc">${s.desc}</div>
            <div class="glc-prog">${a} / ${i} kural tamamland\u0131</div>
          </div>
          <div class="glc-arrow">\u203A</div>
        </button>`}).join("");this.root.innerHTML=`
      <div class="logos-shell">
        <div class="logos-header">
          <div class="logos-logo">\u2697\uFE0F</div>
          <h1 class="logos-title">LOGOS</h1>
          <p class="logos-sub">Dil Zekas\u0131 Motoru \u2014 A1'den C2'ye Tam M\xFCfredat</p>
        </div>
        <div class="gl-levels">${e}</div>
        <p class="logos-hint">Her kural: DNA g\xF6rselle\u015Ftirme + 4 farkl\u0131 al\u0131\u015Ft\u0131rma tipi + T\xFCrk\xE7e kar\u015F\u0131la\u015Ft\u0131rma</p>
      </div>`}_showRules(t){const e=GRAMMAR_DATA.levelInfo[t],r=GRAMMAR_DATA.rules.filter(d=>d.level===t),{done:s,total:a}=this._getLevelProgress(t),i={};r.forEach(d=>{(i[d.cat]=i[d.cat]||[]).push(d)});const o=Object.entries(i).map(([d,n])=>`
      <div class="grl-category">
        <div class="grl-cat-label">${d}</div>
        ${n.map(u=>{const l=this._getRuleMastery(u.id),c="\u2B50".repeat(l)+"\u2606".repeat(Math.max(0,3-l));return`
            <button class="grl-rule-card gram-show-rule-btn" data-rule-id="${u.id.replace(/"/g,"&quot;")}">
              <span class="grl-icon">${u.icon}</span>
              <div class="grl-info">
                <div class="grl-title">${u.title}</div>
                <div class="grl-sub">${u.sub}</div>
              </div>
              <div class="grl-stars ${l>=3?"mastered":""}">${c}</div>
            </button>`}).join("")}
      </div>`).join("");this.root.innerHTML=`
      <div class="logos-shell">
        <div class="grl-header">
          <button class="logos-back gram-show-levels-btn">\u2190 Seviyeler</button>
          <div class="grl-level-badge" style="background:${e.color}20;color:${e.color};border-color:${e.color}40">
            ${e.icon} ${t} \u2014 ${e.label}
          </div>
          <div class="grl-progress">${s}/${a} tamamland\u0131</div>
        </div>
        <div class="grl-progbar-wrap">
          <div class="grl-progbar-fill" style="width:${a?Math.round(s/a*100):0}%;background:${e.color}"></div>
        </div>
        <div class="grl-list">${o}</div>
      </div>`}_showRule(t){const e=GRAMMAR_DATA.rules.find(l=>l.id===t);if(!e)return;const r=GRAMMAR_DATA.levelInfo[e.level],s=this._getRuleMastery(t),a=e.dna.map((l,c)=>`
      <div class="dna-base gram-dna-base" style="--base-color:${l.c}">
        <div class="dna-word">${l.w}</div>
        <div class="dna-role">${l.r}</div>
      </div>`).join(""),i=e.formula.map(l=>l.t==="+"||l.t==="|"||l.t==="\u2192"?`<span class="formula-op">${l.t}</span>`:`<span class="formula-part" style="background:${l.c}20;color:${l.c};border-color:${l.c}40">${l.t}</span>`).join(""),o=e.exs.map(l=>`
      <div class="rule-example gram-speak-btn" data-text="${l.en.replace(/"/g,"&quot;")}">
        <div class="rex-en">\u{1F50A} ${l.en}</div>
        <div class="rex-tr">${l.tr}</div>
      </div>`).join(""),d=e.register||{},n=Object.entries(d).map(([l,c])=>`<div class="reg-bar-wrap">
        <div class="reg-bar-label">${{formal:"Resmi",informal:"Gayriresmi",written:"Yaz\u0131l\u0131",spoken:"S\xF6zl\xFC"}[l]||l}</div>
        <div class="reg-bar-track"><div class="reg-bar-fill" style="width:${c}%"></div></div>
        <div class="reg-bar-val">${c}%</div>
      </div>`).join(""),u="\u2B50".repeat(s)+"\u2606".repeat(Math.max(0,3-s));this.root.innerHTML=`
      <div class="logos-shell rule-detail-shell">
        <div class="rd-header">
          <button class="logos-back gram-show-rules-btn" data-level="${e.level}">\u2190 ${e.level} Kurallar\u0131</button>
          <div class="rd-stars">${u}</div>
        </div>

        <div class="rd-hero">
          <span class="rd-icon">${e.icon}</span>
          <div>
            <div class="rd-title">${e.title}</div>
            <div class="rd-sub">${e.sub}</div>
          </div>
          <div class="rd-level-tag" style="background:${r.color}20;color:${r.color}">${e.level}</div>
        </div>

        <div class="rd-desc">${e.desc}</div>

        <!-- Formula bar -->
        <div class="rd-section-label">\u{1F4D0} Yap\u0131 Form\xFCl\xFC</div>
        <div class="formula-bar">${i}</div>

        <!-- DNA Strand -->
        <div class="rd-section-label">\u{1F9EC} C\xFCmle DNA's\u0131 <span class="dna-tap-hint">\u2014 kelimelere dokun</span></div>
        <div class="dna-strand">${a}</div>

        <!-- Turkish contrast -->
        <div class="rd-contrast">
          <div class="rd-contrast-label">\u{1F1F9}\u{1F1F7} T\xFCrk\xE7e Kar\u015F\u0131la\u015Ft\u0131rma</div>
          <div class="rd-contrast-text">${e.contrast}</div>
        </div>

        <!-- Examples -->
        <div class="rd-section-label">\u{1F4AC} \xD6rnekler <span class="dna-tap-hint">\u2014 sese dokun</span></div>
        <div class="rule-examples">${o}</div>

        <!-- Common error -->
        <div class="rd-error-box">
          <div class="rd-error-label">\u26A0\uFE0F Yayg\u0131n Hata</div>
          <div class="rd-error-wrong">\u2717 ${e.err.w}</div>
          <div class="rd-error-right">\u2713 ${e.err.r}</div>
          <div class="rd-error-tip">\u{1F4A1} ${e.err.tip}</div>
        </div>

        <!-- Register radar -->
        ${n?`<div class="rd-section-label">\u{1F4CA} Kullan\u0131m Ba\u011Flam\u0131</div><div class="reg-bars">${n}</div>`:""}

        <button class="logos-start-btn gram-start-drill-btn" data-rule-id="${e.id.replace(/"/g,"&quot;")}">
          \u26A1 Al\u0131\u015Ft\u0131rmalar\u0131 Ba\u015Flat (${e.drills.length} soru)
        </button>
      </div>`,setTimeout(()=>{document.querySelectorAll(".dna-base").forEach((l,c)=>{setTimeout(()=>l.classList.add("visible"),c*80)})},100)}_speak(t){this.app&&this.app.speakWord&&this.app.speakWord(t)}_startDrill(t,e){const r=GRAMMAR_DATA.rules.find(n=>n.id===t);if(!r)return;const s=r.drills[e];if(!s){this._completeRule(r);return}this._drillState={rule:r,idx:e,forgeClicked:[],forgeWords:[]};const a=GRAMMAR_DATA.levelInfo[r.level],i=`${e+1} / ${r.drills.length}`,o=Math.round(e/r.drills.length*100),d=this._renderDrill(s,r);this.root.innerHTML=`
      <div class="logos-shell drill-shell">
        <div class="drill-topbar">
          <button class="logos-back gram-show-rule-btn" data-rule-id="${r.id.replace(/"/g,"&quot;")}">\u2190 ${r.title}</button>
          <div class="drill-prog-label">${i}</div>
        </div>
        <div class="drill-progbar-track">
          <div class="drill-progbar-fill" style="width:${o}%;background:${a.color}"></div>
        </div>
        <div class="drill-rule-context">
          <span class="drill-rule-icon">${r.icon}</span>
          <span class="drill-rule-name">${r.title}</span>
          <span class="drill-level-tag" style="color:${a.color}">${r.level}</span>
        </div>
        <div class="drill-card" id="drill-card">
          ${d}
        </div>
      </div>`,s.type==="forge"&&this._attachForge(s,r,e)}_renderDrill(t,e){return t.type==="forge"?this._renderForge(t):t.type==="clash"?this._renderClash(t):t.type==="decode"?this._renderDecode(t):t.type==="mutate"?this._renderMutate(t):t.type==="transform"?this._renderTransform(t):"<p>Bilinmeyen al\u0131\u015Ft\u0131rma tipi</p>"}_renderForge(t){const e=[...t.words].sort(()=>.5-Math.random());return`
      <div class="drill-type-badge forge-badge">\u{1F528} FORGE \u2014 C\xFCmle Kur</div>
      <div class="drill-prompt">${t.prompt}</div>
      <div class="forge-answer-box" id="forge-answer"></div>
      <div class="forge-word-bank" id="forge-bank">
        ${e.map((r,s)=>`
          <button class="forge-word gram-forge-word-btn" data-word="${r}" data-idx="${s}">
            ${r}
          </button>`).join("")}
      </div>
      <div class="drill-actions">
        <button class="drill-clear-btn gram-forge-clear-btn">\u21A9 Temizle</button>
        <button class="drill-submit-btn gram-forge-submit-btn" id="forge-submit">\u2713 Kontrol Et</button>
      </div>`}_attachForge(t,e,r){this._drillState.forgeClicked=[],this._drillState.forgeWords=[...t.words]}_forgeClick(t){if(t.classList.contains("used"))return;t.classList.add("used"),this._drillState.forgeClicked.push(t.dataset.word);const e=document.getElementById("forge-answer");e&&(e.innerHTML=this._drillState.forgeClicked.map(r=>`<span class="forge-placed">${r}</span>`).join(" "))}_forgeClear(){this._drillState.forgeClicked=[],document.querySelectorAll(".forge-word").forEach(e=>e.classList.remove("used"));const t=document.getElementById("forge-answer");t&&(t.innerHTML="")}_forgeSubmit(){const{rule:t,idx:e}=this._drillState,r=t.drills[e],s=this._drillState.forgeClicked.join(" ").toLowerCase().replace(/[?.!,]/g,"").trim(),a=r.ans.toLowerCase().replace(/[?.!,]/g,"").trim();this._showResult(s===a,r,t,e)}_renderClash(t){return`
      <div class="drill-type-badge clash-badge">\u2694\uFE0F CLASH \u2014 Do\u011Fruyu Se\xE7</div>
      <div class="drill-prompt">${t.q}</div>
      <div class="clash-options">
        <button class="clash-btn gram-clash-pick-btn" data-choice="a">
          <span class="clash-label">A</span>
          <span class="clash-text">${t.a}</span>
        </button>
        <button class="clash-btn gram-clash-pick-btn" data-choice="b">
          <span class="clash-label">B</span>
          <span class="clash-text">${t.b}</span>
        </button>
      </div>`}_clashPick(t,e){if(document.querySelector(".clash-btn.picked"))return;t.classList.add("picked");const{rule:r,idx:s}=this._drillState,a=r.drills[s];this._showResult(e===a.correct,a,r,s)}_renderDecode(t){return`
      <div class="drill-type-badge decode-badge">\u{1F50D} DECODE \u2014 Grammatik Rol</div>
      <div class="decode-sentence">"${t.sentence.replace(new RegExp(`\\b${t.target.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}\\b`,"gi"),'<mark class="decode-highlight">$&</mark>')}"</div>
      <div class="drill-prompt">${t.q}</div>
      <div class="decode-options">
        ${t.opts.map((e,r)=>`
          <button class="decode-opt gram-decode-pick-btn" data-index="${r}">
            ${e}
          </button>`).join("")}
      </div>`}_decodePick(t,e){if(document.querySelector(".decode-opt.picked"))return;t.classList.add("picked");const{rule:r,idx:s}=this._drillState,a=r.drills[s];this._showResult(e===a.ans,a,r,s)}_renderMutate(t){return`
      <div class="drill-type-badge mutate-badge">\u{1F9EC} MUTATE \u2014 Bo\u015Flu\u011Fu Doldur</div>
      <div class="mutate-sentence">${t.sentence}</div>
      <div class="mutate-options">
        ${t.opts.map((e,r)=>`
          <button class="mutate-opt gram-mutate-pick-btn" data-index="${r}">
            ${e}
          </button>`).join("")}
      </div>`}_mutatePick(t,e){if(document.querySelector(".mutate-opt.picked"))return;t.classList.add("picked");const{rule:r,idx:s}=this._drillState,a=r.drills[s];this._showResult(e===a.ans,a,r,s)}_renderTransform(t){return`
      <div class="drill-type-badge transform-badge">\u26A1 TRANSFORM \u2014 C\xFCmleyi D\xF6n\xFC\u015Ft\xFCr</div>
      <div class="drill-prompt">${t.prompt}</div>
      <input class="transform-input gram-transform-input" id="transform-input" placeholder="Cevab\u0131n\u0131 buraya yaz\u2026">
      <button class="drill-submit-btn gram-transform-submit-btn">\u2713 Kontrol Et</button>`}_transformSubmit(){const{rule:t,idx:e}=this._drillState,r=t.drills[e],s=document.getElementById("transform-input");if(!s)return;const a=s.value.toLowerCase().replace(/[?.!,]/g,"").trim(),i=r.ans.toLowerCase().replace(/[?.!,]/g,"").trim();this._showResult(a===i,r,t,e)}_showResult(t,e,r,s){this.app.audio&&this.app.audio.play(t?"correct":"error");const a=document.getElementById("drill-card");if(!a)return;const i=e.tip||"",o=e.ans||(e.correct==="a"?e.a:e.b)||"",d=t?`<div class="result-banner correct-banner">
           <div class="result-icon">\u2705</div>
           <div class="result-title">Do\u011Fru!</div>
           ${i?`<div class="result-tip">${i}</div>`:""}
         </div>`:`<div class="result-banner wrong-banner">
           <div class="result-icon">\u274C</div>
           <div class="result-title">Yanl\u0131\u015F</div>
           <div class="result-correct">\u2713 Do\u011Fru: <strong>${o}</strong></div>
           ${i?`<div class="result-tip">\u{1F4A1} ${i}</div>`:""}
         </div>`,n=s+1,u=n<r.drills.length;a.innerHTML+=d;const l=document.createElement("button");l.className="drill-next-btn",l.innerHTML=u?"Sonraki Soru \u2192":"\u{1F3C1} Tamamla",l.onclick=()=>{u?this._startDrill(r.id,n):this._completeRule(r,t)},a.appendChild(l),a.querySelectorAll("button:not(.drill-next-btn)").forEach(v=>v.disabled=!0);const c=a.querySelector("input");c&&(c.disabled=!0)}_completeRule(t){const e=this._getRuleMastery(t.id),r=Math.min(3,e+1);this._setRuleMastery(t.id,r);const s=r===3?50:20;this.app.addXP(s);const a=GRAMMAR_DATA.levelInfo[t.level],{done:i,total:o}=this._getLevelProgress(t.level),d=i===o;d&&typeof confetti=="function"&&confetti({particleCount:120,spread:70,origin:{y:.6},colors:[a.color,"#fff","#f59e0b"]}),this.root.innerHTML=`
      <div class="logos-shell">
        <div class="rule-complete-card">
          <div class="rc-icon">${r===3?"\u{1F3C6}":"\u2B50"}</div>
          <div class="rc-title">${r===3?"Kural Ustas\u0131!":"\u0130yi \u0130\u015F!"}</div>
          <div class="rc-rule">${t.icon} ${t.title}</div>
          <div class="rc-stars">${"\u2B50".repeat(r)}${"\u2606".repeat(3-r)}</div>
          <div class="rc-xp">+${s} XP kazand\u0131n</div>
          ${d?`<div class="rc-level-badge" style="color:${a.color}">\u{1F393} ${t.level} seviyesi tamamland\u0131!</div>`:`<div class="rc-level-prog" style="color:${a.color}">${i}/${o} kural tamamland\u0131</div>`}
          <div class="rc-actions">
            <button class="btn btn-primary gram-continue-btn" data-level="${t.level}">
              Devam Et \u2192
            </button>
            <button class="btn btn-ghost btn-sm gram-repeat-btn" data-rule-id="${t.id.replace(/"/g,"&quot;")}">
              \u{1F504} Tekrar
            </button>
          </div>
        </div>
      </div>`}}
