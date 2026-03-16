class GrammarMode{constructor(s){this.app=s,this.root=null,this._drillState=null}init(s){this.root=s,this._showLevels(),window._gramDelegateAttached||(window._gramDelegateAttached=!0,document.addEventListener("click",t=>{if(!window.grammarMod)return;const e=t.target.closest(".gram-show-rules-btn");if(e){window.grammarMod._showRules(e.dataset.level);return}const r=t.target.closest(".gram-show-rule-btn");if(r){window.grammarMod._showRule(r.dataset.ruleId);return}const a=t.target.closest(".gram-speak-btn");if(a){window.grammarMod._speak(a.dataset.text);return}const i=t.target.closest(".gram-start-drill-btn");if(i){window.grammarMod._startDrill(i.dataset.ruleId,0);return}const d=t.target.closest(".gram-decode-pick-btn");if(d){window.grammarMod._decodePick(d,parseInt(d.dataset.index));return}const o=t.target.closest(".gram-mutate-pick-btn");if(o){window.grammarMod._mutatePick(o,parseInt(o.dataset.index));return}if(t.target.closest(".gram-show-levels-btn")){window.grammarMod._showLevels();return}const n=t.target.closest(".gram-continue-btn");if(n){window.grammarMod._showRules(n.dataset.level);return}const l=t.target.closest(".gram-repeat-btn");if(l){window.grammarMod._startDrill(l.dataset.ruleId,0);return}const c=t.target.closest(".gram-forge-word-btn");if(c){window.grammarMod._forgeClick(c);return}if(t.target.closest(".gram-forge-clear-btn")){window.grammarMod._forgeClear();return}if(t.target.closest(".gram-forge-submit-btn")){window.grammarMod._forgeSubmit();return}const v=t.target.closest(".gram-clash-pick-btn");if(v){window.grammarMod._clashPick(v,v.dataset.choice);return}if(t.target.closest(".gram-transform-submit-btn")){window.grammarMod._transformSubmit();return}const m=t.target.closest(".gram-dna-base");if(m){m.classList.toggle("revealed");return}}),document.addEventListener("keydown",t=>{window.grammarMod&&t.key==="Enter"&&t.target.classList.contains("gram-transform-input")&&window.grammarMod._transformSubmit()}))}destroy(){this.root&&(this.root.innerHTML="")}_getMastery(){return this.app.state.get("grammarMastery")||{}}_setMastery(s){this.app.state.set("grammarMastery",s)}_getRuleMastery(s){return this._getMastery()[s]||0}_setRuleMastery(s,t){const e=this._getMastery();e[s]=t,this._setMastery(e)}_getLevelProgress(s){const t=GRAMMAR_DATA.rules.filter(r=>r.level===s);return{done:t.filter(r=>this._getRuleMastery(r.id)>=3).length,total:t.length}}_showLevels(){const s=GRAMMAR_DATA.levelInfo,t=Object.entries(s).map(([e,r])=>{const{done:a,total:i}=this._getLevelProgress(e),d=i?Math.round(a/i*100):0,o=2*Math.PI*26,g=o-d/100*o;return`
        <button class="gl-level-card gram-show-rules-btn" style="--lv-color:${r.color};--lv-glow:${r.glow}"
                data-level="${e}">
          <div class="glc-ring">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
              <circle cx="32" cy="32" r="26" fill="none" stroke="${r.color}" stroke-width="4"
                stroke-dasharray="${o}" stroke-dashoffset="${g}"
                stroke-linecap="round" transform="rotate(-90 32 32)"/>
            </svg>
            <div class="glc-ring-icon">${r.icon}</div>
          </div>
          <div class="glc-body">
            <div class="glc-level">${e}</div>
            <div class="glc-label">${r.label}</div>
            <div class="glc-desc">${r.desc}</div>
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
        <div class="gl-levels">${t}</div>
        <p class="logos-hint">Her kural: DNA g\xF6rselle\u015Ftirme + 4 farkl\u0131 al\u0131\u015Ft\u0131rma tipi + T\xFCrk\xE7e kar\u015F\u0131la\u015Ft\u0131rma</p>
      </div>`}_showRules(s){const t=GRAMMAR_DATA.levelInfo[s],e=GRAMMAR_DATA.rules.filter(o=>o.level===s),{done:r,total:a}=this._getLevelProgress(s),i={};e.forEach(o=>{(i[o.cat]=i[o.cat]||[]).push(o)});const d=Object.entries(i).map(([o,g])=>`
      <div class="grl-category">
        <div class="grl-cat-label">${o}</div>
        ${g.map(n=>{const l=this._getRuleMastery(n.id),c="\u2B50".repeat(l)+"\u2606".repeat(Math.max(0,3-l));return`
            <button class="grl-rule-card gram-show-rule-btn" data-rule-id="${n.id.replace(/"/g,"&quot;")}">
              <span class="grl-icon">${n.icon}</span>
              <div class="grl-info">
                <div class="grl-title">${n.title}</div>
                <div class="grl-sub">${n.sub}</div>
              </div>
              <div class="grl-stars ${l>=3?"mastered":""}">${c}</div>
            </button>`}).join("")}
      </div>`).join("");this.root.innerHTML=`
      <div class="logos-shell">
        <div class="grl-header">
          <button class="logos-back gram-show-levels-btn">\u2190 Seviyeler</button>
          <div class="grl-level-badge" style="background:${t.color}20;color:${t.color};border-color:${t.color}40">
            ${t.icon} ${s} \u2014 ${t.label}
          </div>
          <div class="grl-progress">${r}/${a} tamamland\u0131</div>
        </div>
        <div class="grl-progbar-wrap">
          <div class="grl-progbar-fill" style="width:${a?Math.round(r/a*100):0}%;background:${t.color}"></div>
        </div>
        <div class="grl-list">${d}</div>
      </div>`}_showRule(s){const t=GRAMMAR_DATA.rules.find(l=>l.id===s);if(!t)return;const e=GRAMMAR_DATA.levelInfo[t.level],r=this._getRuleMastery(s),a=t.dna.map((l,c)=>`
      <div class="dna-base gram-dna-base" style="--base-color:${l.c}">
        <div class="dna-word">${l.w}</div>
        <div class="dna-role">${l.r}</div>
      </div>`).join(""),i=t.formula.map(l=>l.t==="+"||l.t==="|"||l.t==="\u2192"?`<span class="formula-op">${l.t}</span>`:`<span class="formula-part" style="background:${l.c}20;color:${l.c};border-color:${l.c}40">${l.t}</span>`).join(""),d=t.exs.map(l=>`
      <div class="rule-example gram-speak-btn" data-text="${l.en.replace(/"/g,"&quot;")}">
        <div class="rex-en">\u{1F50A} ${l.en}</div>
        <div class="rex-tr">${l.tr}</div>
      </div>`).join(""),o=t.register||{},g=Object.entries(o).map(([l,c])=>`<div class="reg-bar-wrap">
        <div class="reg-bar-label">${{formal:"Resmi",informal:"Gayriresmi",written:"Yaz\u0131l\u0131",spoken:"S\xF6zl\xFC"}[l]||l}</div>
        <div class="reg-bar-track"><div class="reg-bar-fill" style="width:${c}%"></div></div>
        <div class="reg-bar-val">${c}%</div>
      </div>`).join(""),n="\u2B50".repeat(r)+"\u2606".repeat(Math.max(0,3-r));this.root.innerHTML=`
      <div class="logos-shell rule-detail-shell">
        <div class="rd-header">
          <button class="logos-back gram-show-rules-btn" data-level="${t.level}">\u2190 ${t.level} Kurallar\u0131</button>
          <div class="rd-stars">${n}</div>
        </div>

        <div class="rd-hero">
          <span class="rd-icon">${t.icon}</span>
          <div>
            <div class="rd-title">${t.title}</div>
            <div class="rd-sub">${t.sub}</div>
          </div>
          <div class="rd-level-tag" style="background:${e.color}20;color:${e.color}">${t.level}</div>
        </div>

        <div class="rd-desc">${t.desc}</div>

        <!-- Formula bar -->
        <div class="rd-section-label">\u{1F4D0} Yap\u0131 Form\xFCl\xFC</div>
        <div class="formula-bar">${i}</div>

        <!-- DNA Strand -->
        <div class="rd-section-label">\u{1F9EC} C\xFCmle DNA's\u0131 <span class="dna-tap-hint">\u2014 kelimelere dokun</span></div>
        <div class="dna-strand">${a}</div>

        <!-- Turkish contrast -->
        <div class="rd-contrast">
          <div class="rd-contrast-label">\u{1F1F9}\u{1F1F7} T\xFCrk\xE7e Kar\u015F\u0131la\u015Ft\u0131rma</div>
          <div class="rd-contrast-text">${t.contrast}</div>
        </div>

        <!-- Examples -->
        <div class="rd-section-label">\u{1F4AC} \xD6rnekler <span class="dna-tap-hint">\u2014 sese dokun</span></div>
        <div class="rule-examples">${d}</div>

        <!-- Common error -->
        <div class="rd-error-box">
          <div class="rd-error-label">\u26A0\uFE0F Yayg\u0131n Hata</div>
          <div class="rd-error-wrong">\u2717 ${t.err.w}</div>
          <div class="rd-error-right">\u2713 ${t.err.r}</div>
          <div class="rd-error-tip">\u{1F4A1} ${t.err.tip}</div>
        </div>

        <!-- Register radar -->
        ${g?`<div class="rd-section-label">\u{1F4CA} Kullan\u0131m Ba\u011Flam\u0131</div><div class="reg-bars">${g}</div>`:""}

        <button class="logos-start-btn gram-start-drill-btn" data-rule-id="${t.id.replace(/"/g,"&quot;")}">
          \u26A1 Al\u0131\u015Ft\u0131rmalar\u0131 Ba\u015Flat (${t.drills.length} soru)
        </button>
      </div>`,setTimeout(()=>{document.querySelectorAll(".dna-base").forEach((l,c)=>{setTimeout(()=>l.classList.add("visible"),c*80)})},100)}_speak(s){this.app&&this.app.speakWord&&this.app.speakWord(s)}_startDrill(s,t){const e=GRAMMAR_DATA.rules.find(g=>g.id===s);if(!e)return;const r=e.drills[t];if(!r){this._completeRule(e);return}this._drillState={rule:e,idx:t,forgeClicked:[],forgeWords:[]};const a=GRAMMAR_DATA.levelInfo[e.level],i=`${t+1} / ${e.drills.length}`,d=Math.round(t/e.drills.length*100),o=this._renderDrill(r,e);this.root.innerHTML=`
      <div class="logos-shell drill-shell">
        <div class="drill-topbar">
          <button class="logos-back gram-show-rule-btn" data-rule-id="${e.id.replace(/"/g,"&quot;")}">\u2190 ${e.title}</button>
          <div class="drill-prog-label">${i}</div>
        </div>
        <div class="drill-progbar-track">
          <div class="drill-progbar-fill" style="width:${d}%;background:${a.color}"></div>
        </div>
        <div class="drill-rule-context">
          <span class="drill-rule-icon">${e.icon}</span>
          <span class="drill-rule-name">${e.title}</span>
          <span class="drill-level-tag" style="color:${a.color}">${e.level}</span>
        </div>
        <div class="drill-card" id="drill-card">
          ${o}
        </div>
      </div>`,r.type==="forge"&&this._attachForge(r,e,t)}_renderDrill(s,t){return s.type==="forge"?this._renderForge(s):s.type==="clash"?this._renderClash(s):s.type==="decode"?this._renderDecode(s):s.type==="mutate"?this._renderMutate(s):s.type==="transform"?this._renderTransform(s):"<p>Bilinmeyen al\u0131\u015Ft\u0131rma tipi</p>"}_renderForge(s){const t=[...s.words].sort(()=>.5-Math.random());return`
      <div class="drill-type-badge forge-badge">\u{1F528} FORGE \u2014 C\xFCmle Kur</div>
      <div class="drill-prompt">${s.prompt}</div>
      <div class="forge-answer-box" id="forge-answer"></div>
      <div class="forge-word-bank" id="forge-bank">
        ${t.map((e,r)=>`
          <button class="forge-word gram-forge-word-btn" data-word="${e}" data-idx="${r}">
            ${e}
          </button>`).join("")}
      </div>
      <div class="drill-actions">
        <button class="drill-clear-btn gram-forge-clear-btn">\u21A9 Temizle</button>
        <button class="drill-submit-btn gram-forge-submit-btn" id="forge-submit">\u2713 Kontrol Et</button>
      </div>`}_attachForge(s,t,e){this._drillState.forgeClicked=[],this._drillState.forgeWords=[...s.words]}_forgeClick(s){if(s.classList.contains("used"))return;s.classList.add("used"),this._drillState.forgeClicked.push(s.dataset.word);const t=document.getElementById("forge-answer");t&&(t.innerHTML=this._drillState.forgeClicked.map(e=>`<span class="forge-placed">${e}</span>`).join(" "))}_forgeClear(){this._drillState.forgeClicked=[],document.querySelectorAll(".forge-word").forEach(t=>t.classList.remove("used"));const s=document.getElementById("forge-answer");s&&(s.innerHTML="")}_forgeSubmit(){const{rule:s,idx:t}=this._drillState,e=s.drills[t],r=this._drillState.forgeClicked.join(" ").toLowerCase().replace(/[?.!,]/g,"").trim(),a=e.ans.toLowerCase().replace(/[?.!,]/g,"").trim();this._showResult(r===a,e,s,t)}_renderClash(s){return`
      <div class="drill-type-badge clash-badge">\u2694\uFE0F CLASH \u2014 Do\u011Fruyu Se\xE7</div>
      <div class="drill-prompt">${s.q}</div>
      <div class="clash-options">
        <button class="clash-btn gram-clash-pick-btn" data-choice="a">
          <span class="clash-label">A</span>
          <span class="clash-text">${s.a}</span>
        </button>
        <button class="clash-btn gram-clash-pick-btn" data-choice="b">
          <span class="clash-label">B</span>
          <span class="clash-text">${s.b}</span>
        </button>
      </div>`}_clashPick(s,t){if(document.querySelector(".clash-btn.picked"))return;s.classList.add("picked");const{rule:e,idx:r}=this._drillState,a=e.drills[r];this._showResult(t===a.correct,a,e,r)}_renderDecode(s){return`
      <div class="drill-type-badge decode-badge">\u{1F50D} DECODE \u2014 Grammatik Rol</div>
      <div class="decode-sentence">"${s.sentence.replace(new RegExp(`\\b${s.target.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}\\b`,"gi"),'<mark class="decode-highlight">$&</mark>')}"</div>
      <div class="drill-prompt">${s.q}</div>
      <div class="decode-options">
        ${s.opts.map((e,r)=>`
          <button class="decode-opt gram-decode-pick-btn" data-index="${r}">
            ${e}
          </button>`).join("")}
      </div>`}_decodePick(s,t){if(document.querySelector(".decode-opt.picked"))return;s.classList.add("picked");const{rule:e,idx:r}=this._drillState,a=e.drills[r];this._showResult(t===a.ans,a,e,r)}_renderMutate(s){return`
      <div class="drill-type-badge mutate-badge">\u{1F9EC} MUTATE \u2014 Bo\u015Flu\u011Fu Doldur</div>
      <div class="mutate-sentence">${s.sentence}</div>
      <div class="mutate-options">
        ${s.opts.map((t,e)=>`
          <button class="mutate-opt gram-mutate-pick-btn" data-index="${e}">
            ${t}
          </button>`).join("")}
      </div>`}_mutatePick(s,t){if(document.querySelector(".mutate-opt.picked"))return;s.classList.add("picked");const{rule:e,idx:r}=this._drillState,a=e.drills[r];this._showResult(t===a.ans,a,e,r)}_renderTransform(s){return`
      <div class="drill-type-badge transform-badge">\u26A1 TRANSFORM \u2014 C\xFCmleyi D\xF6n\xFC\u015Ft\xFCr</div>
      <div class="drill-prompt">${s.prompt}</div>
      <input class="transform-input gram-transform-input" id="transform-input" placeholder="Cevab\u0131n\u0131 buraya yaz\u2026">
      <button class="drill-submit-btn gram-transform-submit-btn">\u2713 Kontrol Et</button>`}_transformSubmit(){const{rule:s,idx:t}=this._drillState,e=s.drills[t],r=document.getElementById("transform-input");if(!r)return;const a=r.value.toLowerCase().replace(/[?.!,]/g,"").trim(),i=e.ans.toLowerCase().replace(/[?.!,]/g,"").trim();this._showResult(a===i,e,s,t)}_showResult(s,t,e,r){this.app.audio&&this.app.audio.play(s?"correct":"error");const a=document.getElementById("drill-card");if(!a)return;const i=t.tip||"",d=t.ans||(t.correct==="a"?t.a:t.b)||"",o=s?`<div class="result-banner correct-banner">
           <div class="result-icon">\u2705</div>
           <div class="result-title">Do\u011Fru!</div>
           ${i?`<div class="result-tip">${i}</div>`:""}
         </div>`:`<div class="result-banner wrong-banner">
           <div class="result-icon">\u274C</div>
           <div class="result-title">Yanl\u0131\u015F</div>
           <div class="result-correct">\u2713 Do\u011Fru: <strong>${d}</strong></div>
           ${i?`<div class="result-tip">\u{1F4A1} ${i}</div>`:""}
         </div>`,g=r+1,n=g<e.drills.length;a.innerHTML+=o;const l=document.createElement("button");l.className="drill-next-btn",l.innerHTML=n?"Sonraki Soru \u2192":"\u{1F3C1} Tamamla",l.onclick=()=>{n?this._startDrill(e.id,g):this._completeRule(e,s)},a.appendChild(l),a.querySelectorAll("button:not(.drill-next-btn)").forEach(u=>u.disabled=!0);const c=a.querySelector("input");c&&(c.disabled=!0)}_completeRule(s){const t=this._getRuleMastery(s.id),e=Math.min(3,t+1);this._setRuleMastery(s.id,e);const r=e===3?50:20;this.app.addXP(r);const a=GRAMMAR_DATA.levelInfo[s.level],{done:i,total:d}=this._getLevelProgress(s.level),o=i===d;o&&typeof confetti=="function"&&confetti({particleCount:120,spread:70,origin:{y:.6},colors:[a.color,"#fff","#f59e0b"]}),this.root.innerHTML=`
      <div class="logos-shell">
        <div class="rule-complete-card">
          <div class="rc-icon">${e===3?"\u{1F3C6}":"\u2B50"}</div>
          <div class="rc-title">${e===3?"Kural Ustas\u0131!":"\u0130yi \u0130\u015F!"}</div>
          <div class="rc-rule">${s.icon} ${s.title}</div>
          <div class="rc-stars">${"\u2B50".repeat(e)}${"\u2606".repeat(3-e)}</div>
          <div class="rc-xp">+${r} XP kazand\u0131n</div>
          ${o?`<div class="rc-level-badge" style="color:${a.color}">\u{1F393} ${s.level} seviyesi tamamland\u0131!</div>`:`<div class="rc-level-prog" style="color:${a.color}">${i}/${d} kural tamamland\u0131</div>`}
          <div class="rc-actions">
            <button class="btn btn-primary gram-continue-btn" data-level="${s.level}">
              Devam Et \u2192
            </button>
            <button class="btn btn-ghost btn-sm gram-repeat-btn" data-rule-id="${s.id.replace(/"/g,"&quot;")}">
              \u{1F504} Tekrar
            </button>
          </div>
        </div>
      </div>`}}
