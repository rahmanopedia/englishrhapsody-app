class LeaderboardManager{constructor(){this._listeners={},this._currentPeriod="daily"}_dailyKey(){return new Date().toISOString().split("T")[0]}_weeklyKey(){const e=new Date(this._dailyKey()+"T00:00:00Z");e.setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));const s=new Date(Date.UTC(e.getUTCFullYear(),0,1)),t=Math.ceil(((e-s)/864e5+1)/7);return`${e.getUTCFullYear()}-W${String(t).padStart(2,"0")}`}_monthlyKey(){return new Date().toISOString().slice(0,7)}_periodKey(e){if(e==="daily")return this._dailyKey();if(e==="weekly")return this._weeklyKey();if(e==="monthly")return this._monthlyKey()}_periodId(e){return`${e}_${this._periodKey(e)}`}_calcXP(e){const s=this._dailyKey(),t=s.slice(0,7),a=e[s]||0,l=new Date(s+"T00:00:00Z").getTime(),o=Object.entries(e).filter(([n])=>{const i=new Date(n+"T00:00:00Z").getTime();if(isNaN(i))return!1;const d=(l-i)/864e5;return d>=0&&d<7}).reduce((n,[,i])=>n+i,0),u=Object.entries(e).filter(([n])=>n.startsWith(t)).reduce((n,[,i])=>n+i,0);return{dailyXP:a,weeklyXP:o,monthlyXP:u}}async updateScore(){var e,s,t,a;const l=window.authManager;if(!(l!=null&&l.isLoggedIn)||!l._db||!l.uid)return;const o=((s=(e=window.app)==null?void 0:e.state)==null?void 0:s.get("history"))||{},u=((a=(t=window.app)==null?void 0:t.state)==null?void 0:a.get("level"))||1,n=l.displayName||"Kullan\u0131c\u0131",i=l.uid,{dailyXP:d,weeklyXP:r,monthlyXP:b}=this._calcXP(o);if(d===0&&r===0&&b===0)return;const h=[{id:this._periodId("daily"),xp:Math.round(Math.max(0,d))},{id:this._periodId("weekly"),xp:Math.round(Math.max(0,r))},{id:this._periodId("monthly"),xp:Math.round(Math.max(0,b))}];try{const c=l._db.batch();for(const y of h){const m=l._db.collection("leaderboards").doc(y.id).collection("users").doc(i);c.set(m,{uid:i,name:n,xp:y.xp,level:u,avatar:(l.displayName||"K")[0].toUpperCase(),updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:!0})}await c.commit(),console.info("[Leaderboard] Skorlar ba\u015Far\u0131yla g\xFCncellendi:",d,"XP")}catch(c){console.error("[Leaderboard] Yazma hatas\u0131 (Firestore Kurallar\u0131n\u0131 kontrol edin):",c.code,c.message)}}subscribe(e,s){this.unsubscribe(e);const t=window.authManager;if(!(t!=null&&t.isLoggedIn)||!t._db)return;const a=t._db.collection("leaderboards").doc(this._periodId(e)).collection("users").orderBy("xp","desc").limit(50).onSnapshot(l=>{const o=[];l.forEach(u=>o.push(u.data())),s(o)},l=>{console.error("[Leaderboard] Dinleme hatas\u0131:",l.code,l.message),l.code==="permission-denied"&&console.warn('[Leaderboard] \u0130pucu: Firestore kurallar\u0131nda "leaderboards" koleksiyonuna okuma yetkisi vermelisiniz.')});this._listeners[e]=a}unsubscribe(e){this._listeners[e]&&(this._listeners[e](),delete this._listeners[e])}unsubscribeAll(){Object.keys(this._listeners).forEach(e=>this.unsubscribe(e))}render(e){e&&(e.innerHTML=`
      <div class="lb-shell">
        <div class="lb-header">
          <div class="lb-trophy-wrap">\u{1F3C6}</div>
          <h1 class="lb-title">Liderlik Tablosu</h1>
          <p class="lb-subtitle">Canl\u0131 s\u0131ralama \xB7 Anl\u0131k g\xFCncellenir</p>
        </div>

        <div class="lb-tabs">
          <button class="lb-tab active" data-period="daily">G\xFCnl\xFCk</button>
          <button class="lb-tab" data-period="weekly">Haftal\u0131k</button>
          <button class="lb-tab" data-period="monthly">Ayl\u0131k</button>
        </div>

        <div class="lb-list" id="lb-list">
          <div class="lb-loading"><div class="lb-spinner"></div><p>Y\xFCkleniyor\u2026</p></div>
        </div>

        <div class="lb-my-rank" id="lb-my-rank" style="display:none">
          <span class="lb-mr-label">Senin s\u0131ran</span>
          <span class="lb-mr-val" id="lb-mr-val">\u2014</span>
        </div>
      </div>`,this._currentPeriod="daily",this._listen("daily"),window._lbDelegateAttached||(window._lbDelegateAttached=!0,document.addEventListener("click",s=>{const t=s.target.closest(".lb-tab");t&&window.leaderboardManager&&window.leaderboardManager.switchTab(t.dataset.period,t)})))}switchTab(e,s){document.querySelectorAll(".lb-tab").forEach(a=>a.classList.remove("active")),s.classList.add("active"),this.unsubscribeAll(),this._currentPeriod=e;const t=document.getElementById("lb-list");t&&(t.innerHTML='<div class="lb-loading"><div class="lb-spinner"></div><p>Y\xFCkleniyor\u2026</p></div>'),this._listen(e)}_listen(e){this.subscribe(e,s=>this._renderList(s,e))}_renderList(e,s){var t;const a=document.getElementById("lb-list");if(!a)return;const l=(t=window.authManager)==null?void 0:t.uid,o={daily:"bug\xFCn",weekly:"bu hafta",monthly:"bu ay"}[s],u=["\u{1F947}","\u{1F948}","\u{1F949}"];if(!e.length){a.innerHTML='<div class="lb-empty">Hen\xFCz kimse yok \u2014 ilk sen ol! \u{1F680}</div>';const r=document.getElementById("lb-my-rank");r&&(r.style.display="none");return}a.innerHTML=e.map((r,b)=>{const h=r.uid===l,c=b+1,y=c<=3?`<span class="lb-medal">${u[b]}</span>`:`<span class="lb-medal lb-medal-num">${c}</span>`;return`
        <div class="lb-row ${h?"lb-row-me":""}">
          ${y}
          <div class="lb-name">${this._esc(r.name)}</div>
          <div class="lb-right">
            <div class="lb-xp">${r.xp} <span class="lb-xp-unit">XP ${o}</span></div>
            <div class="lb-lv">Lv.${r.level||1}</div>
          </div>
        </div>`}).join("");const n=e.findIndex(r=>r.uid===l),i=document.getElementById("lb-my-rank"),d=document.getElementById("lb-mr-val");i&&d&&(n!==-1?(d.textContent=`#${n+1}`,i.style.display="flex"):i.style.display="none")}_esc(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async resetUserEntries(){const e=window.authManager;if(!(e!=null&&e.isLoggedIn)||!e._db||!e.uid)return;const s=e.uid;try{const t=e._db.batch();for(const a of["daily","weekly","monthly"]){const l=e._db.collection("leaderboards").doc(this._periodId(a)).collection("users").doc(s);t.delete(l)}await t.commit(),console.info("[Leaderboard] Kullan\u0131c\u0131 s\u0131ralama verileri silindi")}catch(t){console.warn("[Leaderboard] resetUserEntries error:",t)}}}window.leaderboardManager=new LeaderboardManager;
