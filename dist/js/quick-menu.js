(function(){const b=[{icon:"\u{1F3E0}",label:"Ana Merkez",target:"home"},{icon:"\u{1F300}",label:"Sinestezi",target:"learn"},{icon:"\u{1F4D6}",label:"Okuma",target:"reading"},{icon:"\u{1F399}\uFE0F",label:"Konu\u015Fma",target:"speak"},{icon:"\u2728",label:"Nexus",target:"nexus"},{icon:"\u{1F3AC}",label:"Sinema",target:"cinema"},{icon:"\u{1F309}",label:"K\xF6pr\xFC",target:"bridge"},{icon:"\u{1F4AC}",label:"\u0130fadeler",target:"phrases"}];window.showQuickMenu=function(o){if(document.getElementById("qm-overlay"))return;const n=document.createElement("div");n.id="qm-overlay",n.style.cssText=["position:fixed;inset:0;z-index:9999;","background:rgba(0,0,0,0.65);","backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);","display:flex;align-items:flex-end;","animation:qm-fade-in 0.22s ease both;"].join("");const t=document.createElement("div");t.id="qm-sheet",t.style.cssText=["width:100%;","background:linear-gradient(170deg,#13131f 0%,#0a0a14 100%);","border-radius:26px 26px 0 0;","padding:0 14px calc(18px + env(safe-area-inset-bottom,0px));","border-top:1px solid rgba(255,255,255,0.1);","box-shadow:0 -12px 50px rgba(0,0,0,0.7);","animation:qm-slide-up 0.3s cubic-bezier(0.34,1.15,0.64,1) both;"].join(""),t.innerHTML=`
      <style>
        @keyframes qm-fade-in  { from{opacity:0} to{opacity:1} }
        @keyframes qm-slide-up { from{transform:translateY(110%)} to{transform:translateY(0)} }
        @keyframes qm-fade-out { from{opacity:1} to{opacity:0} }
        @keyframes qm-slide-dn { from{transform:translateY(0)} to{transform:translateY(110%)} }
        .qm-nav-btn {
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:18px;
          padding:13px 4px 11px;
          color:#fff;
          font-size:0.67rem;
          font-weight:700;
          cursor:pointer;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:5px;
          transition:all 0.15s ease;
          font-family:inherit;
          letter-spacing:0.2px;
        }
        .qm-nav-btn:hover  { transform:scale(1.07); background:rgba(255,255,255,0.13) !important; border-color:rgba(255,255,255,0.2) !important; }
        .qm-nav-btn:active { transform:scale(0.94); }
        .qm-nav-btn .qm-icon { font-size:1.55rem; line-height:1; }
        .qm-nav-btn .qm-lbl  { opacity:0.82; line-height:1.25; text-align:center; }
        #qm-close-btn {
          width:100%;
          padding:13px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          color:rgba(255,255,255,0.45);
          font-size:0.82rem;
          font-weight:700;
          cursor:pointer;
          font-family:inherit;
          transition:all 0.15s;
          margin-top:10px;
        }
        #qm-close-btn:hover  { background:rgba(255,255,255,0.09); color:rgba(255,255,255,0.7); }
        #qm-close-btn:active { transform:scale(0.97); }
      </style>

      <!-- Handle -->
      <div style="width:42px;height:4px;border-radius:2px;background:rgba(255,255,255,0.18);margin:14px auto 16px;"></div>

      <!-- Title -->
      <div style="color:rgba(255,255,255,0.35);font-size:0.62rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:13px;text-align:center;">
        NAVIGASYON
      </div>

      <!-- Nav grid -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:0;">
        ${b.map(a=>`
          <button class="qm-nav-btn" data-qm-target="${a.target}">
            <span class="qm-icon">${a.icon}</span>
            <span class="qm-lbl">${a.label}</span>
          </button>
        `).join("")}
      </div>

      <button id="qm-close-btn">\u2715 &nbsp; Kapat</button>
    `,n.appendChild(t),(document.fullscreenElement||document.webkitFullscreenElement||document.body).appendChild(n);function s(){n.style.animation="qm-fade-out 0.18s ease forwards",t.style.animation="qm-slide-dn 0.18s ease forwards",setTimeout(()=>n.remove(),200)}n.addEventListener("click",a=>{a.target===n&&s()}),t.querySelector("#qm-close-btn").addEventListener("click",s);function d(a){const i=window._app||window.app;if(i&&i.navigate)i.navigate(a);else{const l=document.querySelector(`[data-action="navigate"][data-target="${a}"], .nav-item[data-target="${a}"]`);l&&l.click()}}t.querySelectorAll(".qm-nav-btn").forEach(a=>{a.addEventListener("click",function(){const i=this.dataset.qmTarget;s(),setTimeout(()=>d(i),50)})})},(function(){let o=!1,n=!1;function t(){const e=document.exitFullscreen||document.webkitExitFullscreen;e&&(document.fullscreenElement||document.webkitFullscreenElement)&&e.call(document).catch(()=>{})}function r(){const e=o;o=!!(document.fullscreenElement||document.webkitFullscreenElement),e&&!o&&document.body.classList.remove("sidebar-closed"),o&&!n&&t()}document.addEventListener("fullscreenchange",r),document.addEventListener("webkitfullscreenchange",r);const s=document.createElement("style");s.textContent=["body.er-in-mode .sidebar,body.er-in-mode #sidebar-tab,body.er-in-mode #mobile-nav{display:none !important;}",":fullscreen header.app-header,:-webkit-full-screen header.app-header{display:none!important;}",":fullscreen .layout,:-webkit-full-screen .layout{grid-template-rows:0 1fr!important;}",":fullscreen #main-content,:-webkit-full-screen #main-content{padding:0!important;overflow-y:auto!important;height:100dvh!important;}",":fullscreen #main-content>.animate-in,:-webkit-full-screen #main-content>.animate-in{animation:none!important;transform:none!important;}",":fullscreen .cinema-topbar,:-webkit-full-screen .cinema-topbar{display:none!important;}"].join(""),document.head.appendChild(s);function d(e){n=e,document.body.classList.toggle("er-in-mode",e)}const a=new Set(["analytics","leaderboard"]);function i(){if(document.fullscreenElement||document.webkitFullscreenElement)return;const e=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;e&&e.call(document.documentElement).catch(()=>{})}function l(e){a.has(e)&&(i(),setTimeout(()=>{const m={analytics:".an-page",leaderboard:"#leaderboard-root"},c=document.querySelector(m[e]);c&&window.attachQuickMenuTrigger&&window.attachQuickMenuTrigger(c)},300))}function u(){const e=window._app;if(!e||!e.navigate||e.__qmSbPatched)return;e.__qmSbPatched=!0;const m=e.navigate.bind(e);e.navigate=function(c){if(d(c!=="home"),!n){document.body.classList.remove("sidebar-closed");try{screen.orientation&&screen.orientation.lock?screen.orientation.lock("portrait").then(function(){t(),setTimeout(t,300)}).catch(function(){t(),setTimeout(t,300)}):(t(),setTimeout(t,300))}catch(f){t(),setTimeout(t,300)}}m(c),l(c)}}if(window._app)u();else{const e=setInterval(()=>{window._app&&(clearInterval(e),u())},50)}new MutationObserver(function(){o&&n&&!document.body.classList.contains("sidebar-closed")&&document.body.classList.add("sidebar-closed")}).observe(document.body,{attributes:!0,attributeFilter:["class"]});function p(e){n&&e.target.closest&&e.target.closest("#sidebar-tab")&&(e.stopImmediatePropagation(),e.cancelable&&e.preventDefault())}document.addEventListener("touchstart",p,{capture:!0,passive:!1}),document.addEventListener("click",p,{capture:!0})})(),window.attachQuickMenuTrigger=function(o){let n=0;o.addEventListener("touchend",function(t){const r=Date.now();r-n<320&&(t.preventDefault(),window.showQuickMenu(o)),n=r},{passive:!1}),o.addEventListener("dblclick",function(){window.showQuickMenu(o)})}})();
