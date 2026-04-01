// ── Admin Panel v3 ──────────────────────────────────────────────────────
(function(){
  'use strict';

  var ADMIN_EMAIL = 'rahman.eraydin@gmail.com';

  /* ── State ─────────────────────────────────────────────────── */
  var _tab         = 'dashboard';
  var _liveUnsub   = null;          // güvenlik canlı
  var _dashUnsubs  = [];            // dashboard canlı
  var _lbPeriod    = 'weekly';
  var _secAllEvs   = [];
  var _secFlagged  = {};
  var _secFilter   = { type:'', email:'' };
  var _secTabInner = 'events';
  var _lbUsers       = [];          // liderlik önbelleği
  var _secUsersCache = [];          // renderSecUsers onclick lookup
  var _notifPrev     = 0;             // bildirim: önceki olay sayısı
  var _theme       = (typeof localStorage!=='undefined'&&localStorage.getItem('ap-theme'))||'purple';

  /* ── Güvenlik etiketleri ────────────────────────────────── */
  var LABELS = {
    bot_attempt:            { icon:'🤖', label:'Bot',         color:'#ff4444' },
    devtools_opened:        { icon:'🔧', label:'DevTools',    color:'#ff9900' },
    screen_capture_attempt: { icon:'📸', label:'Ekran Kaydı', color:'#ff6b6b' },
    iframe_attempt:         { icon:'🖼️',  label:'iFrame',      color:'#cc44ff' },
    copy_attempt:           { icon:'📋', label:'Kopyalama',   color:'#4488ff' }  /* security.js henüz loglamıyor */
  };

  var TABS_META = {
    dashboard:     { icon:'🏠', title:'Dashboard',         sub:'' },
    users:         { icon:'👥', title:'Kullanıcılar',      sub:'Haftalık liderlikten' },
    security:      { icon:'🛡️', title:'Güvenlik',          sub:'Güvenlik olayları' },
    rival:         { icon:'⚔️', title:'Rival',             sub:'Kuyruk & maçlar' },
    leaderboard:   { icon:'🏆', title:'Liderlik',          sub:'Sıralama tablosu' },
    announcements: { icon:'📢', title:'Duyurular',         sub:'Kullanıcılara mesaj' },
    control:       { icon:'🔧', title:'Uygulama Kontrolü', sub:'Özellik bayrakları & bakım modu' },
    analytics:     { icon:'📊', title:'Analitik',          sub:'Kullanıcı aktivitesi & mod kullanımı' },
    database:      { icon:'🗄️', title:'Veritabanı',        sub:'Sıfırlama & temizlik işlemleri' }
  };

  /* ── Yardımcılar ────────────────────────────────────────── */
  function db(){ return window.firebase && window.firebase.firestore && window.firebase.firestore(); }
  function fsv(){ return window.firebase && window.firebase.firestore && window.firebase.firestore.FieldValue; }

  /* Leaderboard.js ile aynı dönem ID'si hesaplama */
  function lbPeriodDoc(period){
    var now=new Date();
    var pad=function(n){return String(n).padStart(2,'0');};
    var daily=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());
    var weekKey=(function(){
      var e=new Date(daily+'T00:00:00Z');
      e.setUTCDate(e.getUTCDate()+4-(e.getUTCDay()||7));
      var s=new Date(Date.UTC(e.getUTCFullYear(),0,1));
      var w=Math.ceil(((e-s)/864e5+1)/7);
      return e.getUTCFullYear()+'-W'+String(w).padStart(2,'0');
    })();
    var monthly=now.getFullYear()+'-'+pad(now.getMonth()+1);
    if(period==='daily')   return 'daily_'+daily;
    if(period==='weekly')  return 'weekly_'+weekKey;
    if(period==='monthly') return 'monthly_'+monthly;
    return period; // fallback
  }
  function isAdmin(){ return window.authManager && window.authManager.email === ADMIN_EMAIL; }
  function _se(s){
    return String(s==null?'':s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function ts2str(ts){ return ts&&ts.toMillis ? new Date(ts.toMillis()).toLocaleString('tr-TR') : '—'; }
  function showContent(html){ var c=document.getElementById('ap-content'); if(c) c.innerHTML=html; }
  function errMsg(e){ var m=e&&e.message?e.message:(typeof e==='string'?e:String(e)); return '<p style="color:#ff4444;padding:20px;font-size:13px">Hata: '+_se(m)+'</p>'; }
  function btn(id,label,style){ return '<button id="'+id+'" style="padding:5px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:8px;color:#888;font-size:11px;cursor:pointer;'+style+'">'+label+'</button>'; }

  var THEME_COLORS={
    purple:{ main:'#7c3aed', nav:'rgba(124,58,237,0.14)' },
    blue:  { main:'#2563eb', nav:'rgba(37,99,235,0.14)'  },
    teal:  { main:'#0d9488', nav:'rgba(13,148,136,0.14)' },
    red:   { main:'#dc2626', nav:'rgba(220,38,38,0.14)'  }
  };

  function applyTheme(t){
    _theme=t||'purple';
    try{localStorage.setItem('ap-theme',_theme);}catch(e){}
    var c=THEME_COLORS[_theme]||THEME_COLORS.purple;
    document.querySelectorAll('.ap-ni').forEach(function(item){
      var a=item.dataset.tab===_tab;
      if(a){item.style.color='#fff';item.style.background=c.nav;item.style.borderLeft='3px solid '+c.main;}
      else{item.style.color='#555';item.style.background='';item.style.borderLeft='3px solid transparent';}
    });
    document.querySelectorAll('.ap-td').forEach(function(dot){
      dot.style.outline=dot.dataset.t===_theme?'2px solid #fff':'2px solid transparent';
      dot.style.outlineOffset='2px';
    });
  }
  function primaryBtn(id,label){ return '<button id="'+id+'" style="padding:7px 16px;background:rgba(124,58,237,0.25);border:1px solid rgba(124,58,237,0.5);border-radius:8px;color:#c4b5fd;font-size:12px;cursor:pointer;font-weight:600">'+label+'</button>'; }

  /* ═══════════════════════════════════════════════════════════
     PANEL KURULUMU
  ═══════════════════════════════════════════════════════════ */
  function buildPanel(){
    if(document.getElementById('ap-modal')) return;
    var el = document.createElement('div');
    el.id = 'ap-modal';
    el.style.cssText = 'display:none;position:fixed;inset:0;z-index:99990;background:rgba(0,0,0,0.97);font-family:system-ui,sans-serif;overflow:hidden';
    el.innerHTML =
      '<div style="display:flex;height:100%;max-height:100vh">'
        +'<div id="ap-sidebar" style="width:196px;min-width:196px;background:#08080e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column">'
          +'<div style="padding:16px;border-bottom:1px solid rgba(255,255,255,0.06)">'
            +'<div style="font-size:0.95rem;font-weight:800;color:#fff;letter-spacing:-0.3px">⚙️ Admin Paneli</div>'
            +'<div style="font-size:10px;color:#333;margin-top:3px">English Rhapsody</div>'
          +'</div>'
          +'<nav id="ap-nav" style="flex:1;padding:6px 0;overflow-y:auto">'
            +ni('dashboard',  '🏠','Dashboard')
            +ni('users',      '👥','Kullanıcılar')
            +ni('security',   '🛡️','Güvenlik')
            +ni('rival',      '⚔️','Rival')
            +ni('leaderboard','🏆','Liderlik')
            +ni('announcements','📢','Duyurular')
            +ni('control',    '🔧','Uygulama Kontrolü')
            +ni('analytics',  '📊','Analitik')
            +ni('database',   '🗄️','Veritabanı')
          +'</nav>'
          +'<div style="padding:10px 12px;border-top:1px solid rgba(255,255,255,0.05)">'
            +'<div style="display:flex;gap:6px;justify-content:center;margin-bottom:8px">'
            +'<div class="ap-td" data-t="purple" title="Mor" style="width:14px;height:14px;border-radius:50%;cursor:pointer;background:#7c3aed;flex-shrink:0"></div>'
            +'<div class="ap-td" data-t="blue"   title="Mavi" style="width:14px;height:14px;border-radius:50%;cursor:pointer;background:#2563eb;flex-shrink:0"></div>'
            +'<div class="ap-td" data-t="teal"   title="Yeşil" style="width:14px;height:14px;border-radius:50%;cursor:pointer;background:#0d9488;flex-shrink:0"></div>'
            +'<div class="ap-td" data-t="red"    title="Kırmızı" style="width:14px;height:14px;border-radius:50%;cursor:pointer;background:#dc2626;flex-shrink:0"></div>'
            +'</div>'
            +'<button id="ap-close" style="width:100%;padding:7px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:8px;color:#444;font-size:12px;cursor:pointer">✕ Kapat</button>'
          +'</div>'
        +'</div>'
        +'<div style="flex:1;overflow:hidden;display:flex;flex-direction:column;min-width:0">'
          +'<div id="ap-header" style="padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;gap:10px;background:#08080e;position:sticky;top:0;z-index:1;flex-shrink:0">'
            +'<button id="ap-ham" style="display:none;background:none;border:none;color:#666;font-size:1.2rem;cursor:pointer;padding:0;line-height:1;flex-shrink:0">☰</button>'
            +'<span id="ap-h-icon"  style="font-size:1.2rem">🏠</span>'
            +'<span id="ap-h-title" style="font-size:14px;font-weight:700;color:#fff">Dashboard</span>'
            +'<span id="ap-h-sub"   style="font-size:11px;color:#444;margin-left:2px"></span>'
            +'<div   id="ap-h-acts" style="margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;align-items:center"></div>'
          +'</div>'
          +'<div id="ap-content" style="flex:1;padding:18px 20px;overflow-y:auto"></div>'
        +'</div>'
      +'</div>';
    document.body.appendChild(el);
    el.querySelector('#ap-close').onclick = closePanel;
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closePanel(); });
    el.querySelectorAll('.ap-ni').forEach(function(item){
      item.onclick = function(){
        switchTab(item.dataset.tab);
        if(window.innerWidth<700){
          var sb=document.getElementById('ap-sidebar');
          if(sb) sb.style.display='none';
        }
      };
    });
    /* Mobil hamburger */
    var hamBtn=el.querySelector('#ap-ham');
    if(hamBtn){
      hamBtn.onclick=function(){
        var sb=document.getElementById('ap-sidebar');
        if(sb) sb.style.display=(sb.style.display==='none'||sb.style.display==='')?'flex':'none';
      };
    }
    /* Tema noktaları */
    el.querySelectorAll('.ap-td').forEach(function(dot){
      dot.onclick=function(){ applyTheme(dot.dataset.t); };
    });
    applyTheme(_theme);
    /* Responsive */
    function _checkMobile(){
      var sb=document.getElementById('ap-sidebar');
      var ham=document.getElementById('ap-ham');
      if(window.innerWidth<700){
        if(sb) sb.style.display='none';
        if(ham) ham.style.display='inline-block';
      } else {
        if(sb){ sb.style.display='flex'; sb.style.flexDirection='column'; }
        if(ham) ham.style.display='none';
      }
    }
    _checkMobile();
    window.addEventListener('resize',_checkMobile);
  }

  function ni(tab,icon,label){
    return '<div class="ap-ni" data-tab="'+tab+'" style="display:flex;align-items:center;gap:9px;padding:9px 14px;cursor:pointer;color:#555;font-size:12px;border-left:3px solid transparent">'
      +'<span>'+icon+'</span><span>'+label+'</span>'
    +'</div>';
  }

  function closePanel(){
    var m=document.getElementById('ap-modal'); if(m) m.style.display='none';
    stopLive(); stopDashLive();
  }

  function switchTab(tab){
    _tab=tab;
    if(tab!=='security') stopLive();
    if(tab!=='dashboard') stopDashLive();

    document.querySelectorAll('.ap-ni').forEach(function(item){
      var a=item.dataset.tab===tab;
      item.style.color      = a?'#fff':'#555';
      item.style.background = a?'rgba(124,58,237,0.14)':'';
      item.style.borderLeft = a?'3px solid #7c3aed':'3px solid transparent';
    });

    var info=TABS_META[tab]||{};
    setHeader(info.icon,info.title,info.sub,'');
    applyTheme(_theme);
    showContent('<div style="text-align:center;padding:40px;color:#333;font-size:13px">Yükleniyor…</div>');

    if     (tab==='dashboard')     renderDashboard();
    else if(tab==='users')         renderUsers();
    else if(tab==='security')      renderSecurity();
    else if(tab==='rival')         renderRival();
    else if(tab==='leaderboard')   renderLeaderboard();
    else if(tab==='announcements') renderAnnouncements();
    else if(tab==='control')       renderControl();
    else if(tab==='analytics')     renderAnalytics();
    else if(tab==='database')      renderDatabase();
  }

  function setHeader(icon,title,sub,actionsHtml){
    var i=document.getElementById('ap-h-icon'),t=document.getElementById('ap-h-title'),
        s=document.getElementById('ap-h-sub'),a=document.getElementById('ap-h-acts');
    if(i) i.textContent=icon||'';
    if(t) t.textContent=title||'';
    if(s) s.textContent=sub||'';
    if(a) a.innerHTML=actionsHtml||'';
  }

  /* ═══════════════════════════════════════════════════════════
     1. DASHBOARD
  ═══════════════════════════════════════════════════════════ */
  function renderDashboard(){
    var acts=document.getElementById('ap-h-acts');
    if(acts){
      acts.innerHTML=btn('ap-dash-live','▶ Canlı','')+btn('ap-dash-ref','🔄','margin-left:2px');
      acts.querySelector('#ap-dash-live').onclick=toggleDashLive;
      acts.querySelector('#ap-dash-ref').onclick =loadDashboard;
    }
    loadDashboard();
  }

  function loadDashboard(){
    var d=db(); if(!d){showContent(errMsg('Firestore bağlanamadı.'));return;}
    var dayAgo=Date.now()-86400000;
    Promise.all([
      d.collection('leaderboards').doc(lbPeriodDoc('weekly')).collection('users').get(),
      d.collection('security_events').orderBy('ts','desc').limit(100).get(),
      d.collection('rival_queue').get(),
      d.collection('rival_matches').limit(50).get().catch(function(){return {size:0,docs:[],forEach:function(){}};}),
      d.collection('app_config').doc('announcement').get().catch(function(){return {exists:false};})
    ]).then(function(res){
      var lbSnap=res[0],secSnap=res[1],qSnap=res[2],mSnap=res[3],annDoc=res[4];
      var secToday=0;
      secSnap.forEach(function(doc){var t=doc.data().ts;if(t&&t.toMillis&&t.toMillis()>dayAgo)secToday++;});
      var activeM=0; mSnap.forEach(function(doc){if(doc.data().status==='active')activeM++;});
      var users=[]; lbSnap.forEach(function(doc){users.push(doc.data());});
      users.sort(function(a,b){return b.xp-a.xp;});
      var recentSec=[]; secSnap.forEach(function(doc){recentSec.push(doc.data());});

      var annActive = annDoc.exists && annDoc.data().active;
      var annMsg    = annDoc.exists ? annDoc.data().message : '';

      buildDashHTML(users,secToday,qSnap.size,activeM,recentSec,annActive,annMsg);
    }).catch(function(e){showContent(errMsg(e));});
  }

  function buildDashHTML(users,secToday,queueSz,activeM,recentSec,annActive,annMsg){
    var cs='background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 18px;flex:1;min-width:130px';
    var top5=users.slice(0,5);
    var medals=['🥇','🥈','🥉','4️⃣','5️⃣'];

    var html=
      /* Durum banner */
      (annActive?'<div style="background:rgba(68,136,255,0.1);border:1px solid rgba(68,136,255,0.3);border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:8px;font-size:12px;color:#6ea4ff">📢 <strong>Aktif duyuru:</strong> &nbsp;'+_se(annMsg)+'<button onclick="window.AdminPanel.open(\'announcements\')" style="margin-left:auto;padding:3px 9px;background:rgba(68,136,255,0.2);border:1px solid rgba(68,136,255,0.4);border-radius:6px;color:#6ea4ff;font-size:11px;cursor:pointer">Düzenle</button></div>':'')
      /* Stat kartlar */
      +'<div id="ap-dash-cards" style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">'
      +sc('👥','Kullanıcı (haftalık)',users.length,'#4ade80',cs,'ap-dc-users')
      +sc('🛡️','Güvenlik (24s)',secToday,secToday>0?'#ff9900':'#4ade80',cs,'ap-dc-sec')
      +sc('⏳','Rival Kuyruğu',queueSz,queueSz>0?'#4488ff':'#4ade80',cs,'ap-dc-queue')
      +sc('⚔️','Aktif Maçlar',activeM,'#cc44ff',cs,'ap-dc-matches')
      +'</div>'
      /* Top 5 + Seviye dağılımı yan yana */
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">'
      /* Top 5 */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
      +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">🏆 Top 5</div>'
      +'<div style="padding:4px 0">';
    if(top5.length){
      top5.forEach(function(u,i){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:7px 14px;border-bottom:1px solid rgba(255,255,255,0.025)">'
          +'<span>'+medals[i]+'</span><span style="font-size:1.1rem">'+_se(u.avatar||'😊')+'</span>'
          +'<div style="flex:1;min-width:0"><div style="font-size:12px;color:#fff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+_se(u.name||'?')+'</div>'
          +'<div style="font-size:10px;color:#444">Lvl '+_se(u.level||1)+' · '+_se(u.cefrLevel||'?')+'</div></div>'
          +'<div style="font-size:12px;font-weight:800;color:#4ade80;flex-shrink:0">'+_se(u.xp||0)+'</div></div>';
      });
    } else { html+='<div style="text-align:center;padding:16px;color:#333;font-size:12px">Veri yok</div>'; }
    html+='</div></div>'
      /* Seviye dağılımı */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
      +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">📊 Seviye Dağılımı</div>'
      +'<div style="padding:12px 16px"><canvas id="ap-lvl-chart" height="120" style="width:100%;display:block"></canvas></div>'
      +'</div>'
      +'</div>'
      /* 7 günlük DAU trendi */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:16px">'
      +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">📈 7 Günlük Aktif Kullanıcı Trendi</div>'
      +'<div style="padding:12px 16px"><canvas id="ap-dau-chart" height="80" style="width:100%;display:block"></canvas></div>'
      +'</div>'
      /* Son güvenlik olayları */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
      +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center">'
      +'<span style="font-size:12px;font-weight:700;color:#fff">🛡️ Son Güvenlik Olayları</span>'
      +'<button onclick="window.AdminPanel.open(\'security\')" style="margin-left:auto;padding:3px 9px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.35);border-radius:6px;color:#a78bfa;font-size:11px;cursor:pointer">Tümü →</button>'
      +'</div><div style="padding:4px 0">';
    recentSec.slice(0,5).forEach(function(e){
      var m=LABELS[e.type]||{icon:'⚠️',color:'#aaa'};
      html+='<div style="display:flex;align-items:center;gap:8px;padding:7px 16px;border-bottom:1px solid rgba(255,255,255,0.025)">'
        +'<span>'+m.icon+'</span><div style="flex:1;min-width:0"><div style="font-size:12px;color:#bbb;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+_se(e.email||e.uid||'?')+'</div>'
        +'<div style="font-size:10px;color:#444">'+_se(e.type)+'</div></div>'
        +'<div style="font-size:10px;color:#333;flex-shrink:0">'+ts2str(e.ts)+'</div></div>';
    });
    if(!recentSec.length) html+='<div style="text-align:center;padding:14px;color:#333;font-size:12px">Son 24 saatte güvenlik olayı yok 🎉</div>';
    html+='</div></div>';

    showContent(html);
    setTimeout(function(){
      renderLevelChart(users,'ap-lvl-chart');
      renderDauChart(recentSec,'ap-dau-chart');
    },50);
  }

  function sc(icon,label,value,color,style,id){
    return '<div id="'+id+'" style="'+style+'">'
      +'<div style="font-size:1.4rem;margin-bottom:6px">'+icon+'</div>'
      +'<div style="font-size:11px;color:#444;margin-bottom:4px">'+_se(label)+'</div>'
      +'<div style="font-size:1.8rem;font-weight:800;color:'+color+'">'+_se(value)+'</div>'
      +'</div>';
  }

  function renderLevelChart(users, canvasId){
    var cv=document.getElementById(canvasId); if(!cv) return;
    var groups=[{label:'1–5',min:1,max:5},{label:'6–10',min:6,max:10},{label:'11–20',min:11,max:20},{label:'21+',min:21,max:9999}];
    var counts=groups.map(function(g){
      return users.filter(function(u){var l=u.level||1;return l>=g.min&&l<=g.max;}).length;
    });
    var maxVal=Math.max.apply(null,counts)||1;
    var W=cv.offsetWidth||300,H=120; cv.width=W; cv.height=H;
    var ctx=cv.getContext('2d');
    var cols=groups.length,padL=28,padB=22,padR=8,padT=8;
    var slotW=(W-padL-padR)/cols,barW=Math.max(16,Math.floor(slotW*0.6));
    var colors=['#7c3aed','#6d28d9','#8b5cf6','#a78bfa'];
    ctx.clearRect(0,0,W,H);
    groups.forEach(function(g,i){
      var cx=padL+i*slotW+slotW/2-barW/2;
      var bh=Math.max(2,(counts[i]/maxVal)*(H-padB-padT));
      ctx.fillStyle=colors[i];
      ctx.beginPath();
      if(ctx.roundRect) ctx.roundRect(cx,H-padB-bh,barW,bh,4); else ctx.rect(cx,H-padB-bh,barW,bh);
      ctx.fill();
      ctx.fillStyle='#888'; ctx.font='9px system-ui'; ctx.textAlign='center';
      ctx.fillText(g.label,cx+barW/2,H-padB+14);
      if(counts[i]>0){
        ctx.fillStyle='#fff'; ctx.font='bold 10px system-ui';
        ctx.fillText(counts[i],cx+barW/2,H-padB-bh-3);
      }
    });
  }

  function renderDauChart(events, canvasId){
    var cv=document.getElementById(canvasId); if(!cv) return;
    var days={},labels=[];
    for(var i=6;i>=0;i--){
      var dd=new Date(Date.now()-i*86400000);
      var k=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');
      days[k]={}; labels.push(k);
    }
    events.forEach(function(e){
      if(!e.ts||!e.ts.toMillis) return;
      var d2=new Date(e.ts.toMillis());
      var k2=d2.getFullYear()+'-'+String(d2.getMonth()+1).padStart(2,'0')+'-'+String(d2.getDate()).padStart(2,'0');
      if(k2 in days) days[k2][e.uid||e.email||'?']=true;
    });
    var counts=labels.map(function(k){return Object.keys(days[k]).length;});
    var maxVal=Math.max.apply(null,counts)||1;
    var W=cv.offsetWidth||600,H=80; cv.width=W; cv.height=H;
    var ctx=cv.getContext('2d');
    var n=labels.length,padL=28,padB=22,padR=8,padT=8;
    var slotW=(W-padL-padR)/n,barW=Math.max(12,Math.floor(slotW*0.55));
    ctx.clearRect(0,0,W,H);
    counts.forEach(function(cnt,i){
      var cx=padL+i*slotW+slotW/2-barW/2;
      var bh=Math.max(2,(cnt/maxVal)*(H-padB-padT));
      ctx.fillStyle='rgba(68,136,255,0.7)';
      ctx.beginPath();
      if(ctx.roundRect)ctx.roundRect(cx,H-padB-bh,barW,bh,3);else ctx.rect(cx,H-padB-bh,barW,bh);
      ctx.fill();
      ctx.fillStyle='#555'; ctx.font='9px system-ui'; ctx.textAlign='center';
      ctx.fillText(labels[i].slice(5),cx+barW/2,H-padB+13);
      if(cnt>0){ctx.fillStyle='#6ea4ff';ctx.font='bold 9px system-ui';ctx.fillText(cnt,cx+barW/2,H-padB-bh-3);}
    });
  }

  /* Dashboard canlı */
  function stopDashLive(){
    _dashUnsubs.forEach(function(u){try{u();}catch(e){}});
    _dashUnsubs=[];
  }

  function toggleDashLive(){
    var btn2=document.getElementById('ap-dash-live'); if(!btn2) return;
    if(_dashUnsubs.length){
      stopDashLive();
      btn2.textContent='▶ Canlı'; btn2.style.color='#888';
    } else {
      startDashLive();
      btn2.textContent='⏸ Canlı'; btn2.style.color='#4ade80';
    }
  }

  function startDashLive(){
    stopDashLive();
    var d=db(); if(!d) return;
    var dayAgo=Date.now()-86400000;

    /* Kullanıcı sayısı */
    _dashUnsubs.push(d.collection('leaderboards').doc(lbPeriodDoc('weekly')).collection('users').onSnapshot(function(snap){
      var el=document.getElementById('ap-dc-users');
      if(el){ var vEl=el.querySelector('div:last-child'); if(vEl) vEl.textContent=snap.size; }
    },function(){}));

    /* Güvenlik */
    _dashUnsubs.push(d.collection('security_events').orderBy('ts','desc').limit(100).onSnapshot(function(snap){
      var cnt=0; snap.forEach(function(doc){var t=doc.data().ts;if(t&&t.toMillis&&t.toMillis()>dayAgo)cnt++;});
      var el=document.getElementById('ap-dc-sec');
      if(el){ var vEl=el.querySelector('div:last-child'); if(vEl) vEl.textContent=cnt; }
    },function(){}));

    /* Rival kuyruğu */
    _dashUnsubs.push(d.collection('rival_queue').onSnapshot(function(snap){
      var el=document.getElementById('ap-dc-queue');
      if(el){ var vEl=el.querySelector('div:last-child'); if(vEl) vEl.textContent=snap.size; }
    },function(){}));
  }

  /* ═══════════════════════════════════════════════════════════
     2. KULLANICILAR
  ═══════════════════════════════════════════════════════════ */
  var _usersCache=[];

  function renderUsers(){
    var acts=document.getElementById('ap-h-acts');
    if(acts){
      acts.innerHTML=
        '<input id="ap-uq" type="text" placeholder="İsim veya UID ara…" style="background:#13131f;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#bbb;padding:5px 10px;font-size:12px;width:170px">'
        +btn('ap-u-csv','📥 CSV','');
      acts.querySelector('#ap-uq').oninput=function(){filterUsers(this.value.toLowerCase().trim());};
      acts.querySelector('#ap-u-csv').onclick=exportUsersCSV;
    }

    var d=db(); if(!d){showContent(errMsg('Firestore bağlanamadı.'));return;}
    Promise.all([
      d.collection('leaderboards').doc(lbPeriodDoc('weekly')).collection('users').orderBy('xp','desc').limit(200).get(),
      d.collection('flagged_users').get()
    ]).then(function(res){
      var lbSnap=res[0],flgSnap=res[1];
      var flagged={};
      flgSnap.forEach(function(doc){flagged[doc.id]=true;});
      _usersCache=[];
      lbSnap.forEach(function(doc){_usersCache.push(Object.assign({_uid:doc.id},doc.data()));});
      if(!_usersCache.length){showContent('<div style="text-align:center;padding:40px;color:#333">Kullanıcı bulunamadı.</div>');return;}

      var rows='';
      _usersCache.forEach(function(u,i){
        var uid=u.uid||u._uid||'';
        var flg=!!flagged[uid];
        rows+='<tr class="ap-urow" data-name="'+_se((u.name||'').toLowerCase())+'" data-uid="'+_se((uid||'').toLowerCase())+'" data-idx="'+i
          +'" style="border-bottom:1px solid rgba(255,255,255,0.025);cursor:pointer"'
          +' onmouseenter="this.style.background=\'rgba(255,255,255,0.025)\'"'
          +' onmouseleave="this.style.background=\'\'"'
          +' onclick="window.AdminPanel._uDetail('+i+')">'
          +'<td style="padding:9px 12px;color:#444;font-size:11px">'+(i+1)+'</td>'
          +'<td style="padding:9px 12px"><div style="display:flex;align-items:center;gap:8px">'
          +'<span style="font-size:1.2rem">'+_se(u.avatar||'😊')+'</span>'
          +'<div><div style="font-size:13px;color:#fff;font-weight:600">'+_se(u.name||'?')+'</div>'
          +'<div style="font-size:10px;color:#333;max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+_se(uid)+'</div>'
          +'</div></div></td>'
          +'<td style="padding:9px 12px;text-align:right;color:#4ade80;font-weight:700;font-size:13px">'+_se(u.xp||0)+'</td>'
          +'<td style="padding:9px 12px;text-align:right;color:#aaa;font-size:12px">'+_se(u.level||1)+'</td>'
          +'<td style="padding:9px 12px;text-align:center"><span style="background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.3);border-radius:4px;padding:2px 6px;color:#a78bfa;font-size:11px">'+_se(u.cefrLevel||'—')+'</span></td>'
          +'<td style="padding:9px 12px;text-align:center;font-size:12px">'+(flg?'<span style="color:#ff6b6b">🚩</span>':'<span style="color:#333">—</span>')+'</td>'
          +'</tr>';
      });

      showContent('<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
        +'<table style="width:100%;border-collapse:collapse;font-size:12px">'
        +'<thead><tr style="border-bottom:1px solid rgba(255,255,255,0.07)">'
        +'<th style="padding:9px 12px;text-align:left;color:#444;font-size:11px">#</th>'
        +'<th style="padding:9px 12px;text-align:left;color:#444;font-size:11px">Kullanıcı</th>'
        +'<th style="padding:9px 12px;text-align:right;color:#444;font-size:11px">XP</th>'
        +'<th style="padding:9px 12px;text-align:right;color:#444;font-size:11px">Lvl</th>'
        +'<th style="padding:9px 12px;text-align:center;color:#444;font-size:11px">CEFR</th>'
        +'<th style="padding:9px 12px;text-align:center;color:#444;font-size:11px">Bayrak</th>'
        +'</tr></thead>'
        +'<tbody id="ap-u-tbody">'+rows+'</tbody>'
        +'</table></div>'
        +'<div style="margin-top:8px;font-size:11px;color:#333;text-align:right">'+_usersCache.length+' kullanıcı · tıkla detay gör</div>'
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-top:14px">'
      +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">📊 CEFR Dağılımı</div>'
      +'<div style="padding:14px 16px"><canvas id="ap-cefr-chart" height="100" style="width:100%;display:block"></canvas></div>'
      +'</div>');
    setTimeout(function(){ renderCefrChart(_usersCache,'ap-cefr-chart'); },50);
    }).catch(function(e){showContent(errMsg(e));});
  }

  function filterUsers(q){
    document.querySelectorAll('.ap-urow').forEach(function(r){
      var match=!q||r.dataset.name.includes(q)||(r.dataset.uid&&r.dataset.uid.includes(q));
      r.style.display=match?'':'none';
    });
  }

  function exportUsersCSV(){
    if(!_usersCache.length) return;
    function q(v){return '"'+String(v==null?'':v).replace(/"/g,'""')+'"';}
    var rows=['Ad,UID,XP,Level,CEFR,Avatar']
      .concat(_usersCache.map(function(u){
        return [q(u.name),q(u.uid||u._uid),q(u.xp||0),q(u.level||1),q(u.cefrLevel||''),q(u.avatar||'')].join(',');
      })).join('\n');
    var blob=new Blob(['\uFEFF'+rows],{type:'text/csv;charset=utf-8'});
    var url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url; a.download='kullanicilar-'+new Date().toISOString().slice(0,10)+'.csv';
    a.click(); URL.revokeObjectURL(url);
  }

  function openUserDetail(idx){
    if(!isAdmin()) return;
    var u=_usersCache[idx]; if(!u) return;
    var uid=u.uid||u._uid||'';
    var d=db();

    var ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML='<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.1);border-radius:14px;max-width:560px;width:100%;max-height:85vh;overflow-y:auto">'
      +'<div style="display:flex;align-items:center;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.07);gap:10px">'
      +'<span style="font-size:2rem">'+_se(u.avatar||'😊')+'</span>'
      +'<div><div style="font-size:14px;font-weight:800;color:#fff">'+_se(u.name||'?')+'</div>'
      +'<div style="font-size:11px;color:#444;margin-top:2px">'+_se(uid)+'</div></div>'
      +'<span style="margin-left:8px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.3);border-radius:4px;padding:2px 8px;color:#a78bfa;font-size:11px">'+_se(u.cefrLevel||'?')+'</span>'
      +'<button id="ud-close" style="margin-left:auto;padding:5px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:#777;font-size:11px;cursor:pointer">✕</button>'
      +'</div>'
      +'<div id="ud-body" style="padding:16px 18px">'
      +'<div style="text-align:center;padding:20px;color:#444;font-size:12px">Yükleniyor…</div>'
      +'</div></div>';

    document.body.appendChild(ov);
    ov.querySelector('#ud-close').onclick=function(){ov.remove();};
    ov.onclick=function(e){if(e.target===ov)ov.remove();};

    if(!d||!uid){ fillUserDetail(ov,u,null,[]); return; }

    Promise.all([
      d.collection('users').doc(uid).collection('data').doc('state').get().catch(function(){return {exists:false};}),
      d.collection('security_events').where('uid','==',uid).orderBy('ts','desc').limit(30).get().catch(function(){return {forEach:function(){}};})
    ]).then(function(res){
      var stateDoc=res[0],secSnap=res[1];
      var state=stateDoc.exists?stateDoc.data():null;
      var secEvs=[]; secSnap.forEach(function(doc){secEvs.push(doc.data());});
      fillUserDetail(ov,u,state,secEvs);
    }).catch(function(){fillUserDetail(ov,u,null,[]);});
  }

  function fillUserDetail(ov,u,state,secEvs){
    var body=ov.querySelector('#ud-body'); if(!body) return;
    var xp     = state&&state.xp     != null ? state.xp     : (u.xp||0);
    var level  = state&&state.level  != null ? state.level  : (u.level||1);
    var streak = state&&state.streak != null ? state.streak : '—';
    var sessions= state&&state.sessions!=null ? state.sessions : '—';

    var statsRow='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">'
      +miniCard('⭐','XP',xp,'#4ade80')
      +miniCard('🎯','Seviye',level,'#a78bfa')
      +miniCard('🔥','Seri',streak,'#ff9900')
      +miniCard('📚','Oturum',sessions,'#4488ff')
      +'</div>';

    var secHtml='';
    if(secEvs.length){
      secHtml='<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:8px">🛡️ Güvenlik Olayları (son 30)</div>';
      secEvs.forEach(function(e){
        var m=LABELS[e.type]||{icon:'⚠️',label:e.type,color:'#aaa'};
        secHtml+='<div style="background:rgba(255,255,255,0.03);border-left:3px solid '+m.color+';border-radius:6px;padding:7px 10px;margin-bottom:5px">'
          +'<div style="display:flex;align-items:center;gap:6px"><span>'+m.icon+'</span>'
          +'<span style="font-size:12px;color:'+m.color+'">'+_se(m.label)+'</span>'
          +'<span style="margin-left:auto;font-size:10px;color:#333">'+ts2str(e.ts)+'</span></div>'
          +(e.detail?'<div style="font-size:10px;color:#444;margin-top:2px">'+_se(String(e.detail).slice(0,80))+'</div>':'')
          +'</div>';
      });
    } else {
      secHtml='<div style="font-size:12px;color:#333;padding:8px 0">Bu kullanıcıya ait güvenlik olayı yok.</div>';
    }

    body.innerHTML=statsRow+secHtml;
  }

  function miniCard(icon,label,value,color){
    return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center">'
      +'<div style="font-size:1.2rem;margin-bottom:4px">'+icon+'</div>'
      +'<div style="font-size:11px;color:#444;margin-bottom:3px">'+_se(label)+'</div>'
      +'<div style="font-size:1.2rem;font-weight:800;color:'+color+'">'+_se(value)+'</div>'
      +'</div>';
  }

  function renderCefrChart(users, canvasId){
    var cv=document.getElementById(canvasId); if(!cv) return;
    var cefrs=['A1','A2','B1','B2','C1','C2'];
    var counts=cefrs.map(function(c){return users.filter(function(u){return (u.cefrLevel||'')===c;}).length;});
    var maxVal=Math.max.apply(null,counts)||1;
    var W=cv.offsetWidth||600,H=100; cv.width=W; cv.height=H;
    var ctx=cv.getContext('2d');
    var n=cefrs.length,padL=28,padB=22,padR=8,padT=8;
    var slotW=(W-padL-padR)/n,barW=Math.max(20,Math.floor(slotW*0.65));
    var colors=['#4ade80','#a78bfa','#4488ff','#ff9900','#f87171','#2dd4bf'];
    ctx.clearRect(0,0,W,H);
    cefrs.forEach(function(c,i){
      var cx=padL+i*slotW+slotW/2-barW/2;
      var bh=Math.max(2,(counts[i]/maxVal)*(H-padB-padT));
      ctx.fillStyle=colors[i];
      ctx.beginPath();
      if(ctx.roundRect)ctx.roundRect(cx,H-padB-bh,barW,bh,4);else ctx.rect(cx,H-padB-bh,barW,bh);
      ctx.fill();
      ctx.fillStyle='#888'; ctx.font='9px system-ui'; ctx.textAlign='center';
      ctx.fillText(c,cx+barW/2,H-padB+13);
      if(counts[i]>0){ctx.fillStyle='#fff';ctx.font='bold 10px system-ui';ctx.fillText(counts[i],cx+barW/2,H-padB-bh-3);}
    });
  }

  /* ═══════════════════════════════════════════════════════════
     3. GÜVENLİK
  ═══════════════════════════════════════════════════════════ */
  function renderSecurity(){
    var acts=document.getElementById('ap-h-acts');
    if(acts){
      acts.innerHTML=
        btn('ap-sec-live','▶ Canlı','')
        +btn('ap-sec-csv','📥 CSV','')
        +btn('ap-sec-ref','🔄 Yenile','');
      acts.querySelector('#ap-sec-live').onclick=toggleLive;
      acts.querySelector('#ap-sec-csv').onclick =exportSecCSV;
      acts.querySelector('#ap-sec-ref').onclick =loadSecEvents;
    }

    showContent(
      '<div id="ap-sec-tabs" style="display:flex;gap:4px;margin-bottom:14px">'
      +stb('events','📋 Olaylar',true)+stb('users','👤 Kullanıcılar',false)+stb('chart','📊 Grafik',false)
      +'</div>'
      +'<div id="ap-sec-sum" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px"></div>'
      +'<div style="display:flex;gap:8px;margin-bottom:12px">'
      +'<select id="ap-sec-type" style="flex:1;background:#13131f;border:1px solid rgba(255,255,255,0.09);border-radius:8px;color:#bbb;padding:7px 8px;font-size:12px">'
      +'<option value="">Tüm Tipler</option><option value="bot_attempt">🤖 Bot</option>'
      +'<option value="devtools_opened">🔧 DevTools</option><option value="screen_capture_attempt">📸 Ekran Kaydı</option>'
      +'<option value="iframe_attempt">🖼️ iFrame</option>'
      +'</select>'
      +'<input id="ap-sec-email" type="text" placeholder="Email veya UID ara…" style="flex:2;background:#13131f;border:1px solid rgba(255,255,255,0.09);border-radius:8px;color:#bbb;padding:7px 10px;font-size:12px">'
      +'</div>'
      +'<div id="ap-sec-upd" style="font-size:11px;color:#333;margin-bottom:8px">—</div>'
      +'<div id="ap-sec-body" style="min-height:200px"></div>');

    document.querySelectorAll('.ap-stb').forEach(function(b){
      b.onclick=function(){
        _secTabInner=b.dataset.t;
        document.querySelectorAll('.ap-stb').forEach(function(x){
          var a=x.dataset.t===_secTabInner;
          x.style.background=a?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.04)';
          x.style.borderColor=a?'rgba(124,58,237,0.4)':'rgba(255,255,255,0.08)';
          x.style.color=a?'#a78bfa':'#555';
        });
        renderSecBody();
      };
    });
    document.getElementById('ap-sec-type').onchange=function(){_secFilter.type=this.value;renderSecBody();};
    document.getElementById('ap-sec-email').oninput=function(){_secFilter.email=this.value.toLowerCase().trim();renderSecBody();};
    loadSecEvents();
  }

  function stb(t,label,active){
    return '<button class="ap-stb" data-t="'+t+'" style="padding:6px 14px;background:'+(active?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.04)')+';border:1px solid '+(active?'rgba(124,58,237,0.4)':'rgba(255,255,255,0.08)')+';border-radius:8px;color:'+(active?'#a78bfa':'#555')+';font-size:12px;cursor:pointer">'+label+'</button>';
  }

  function loadSecEvents(){
    var d=db(); if(!d) return;
    var upd=document.getElementById('ap-sec-upd'); if(upd) upd.textContent='Yükleniyor…';
    loadFlagged(function(fl){
      _secFlagged=fl;
      d.collection('security_events').orderBy('ts','desc').limit(500).get()
        .then(function(snap){
          _secAllEvs=[]; snap.forEach(function(doc){_secAllEvs.push(Object.assign({_id:doc.id},doc.data()));});
          renderSecSummary(); renderSecBody();
          var u=document.getElementById('ap-sec-upd');
          if(u) u.textContent='Son güncelleme: '+new Date().toLocaleTimeString('tr-TR');
        }).catch(function(e){
          var b=document.getElementById('ap-sec-body');
          if(b){b.innerHTML='';var p=document.createElement('p');p.style.cssText='color:#ff4444;font-size:13px';p.textContent='Hata: '+(e&&e.message||String(e));b.appendChild(p);}
        });
    });
  }

  function loadFlagged(cb){
    var d=db(); if(!d){cb({});return;}
    d.collection('flagged_users').get()
      .then(function(snap){var f={};snap.forEach(function(doc){f[doc.id]=doc.data();});cb(f);})
      .catch(function(){cb({});});
  }

  function renderSecSummary(){
    var el=document.getElementById('ap-sec-sum'); if(!el) return;
    var counts={};
    _secAllEvs.forEach(function(e){counts[e.type]=(counts[e.type]||0)+1;});
    var cs='background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:4px 10px;font-size:11px;cursor:pointer;color:#888';
    el.innerHTML='<span style="'+cs+'" data-f="">Tümü <strong style="color:#fff">'+_secAllEvs.length+'</strong></span>'
      +Object.keys(counts).map(function(t){
        var m=LABELS[t]||{icon:'⚠️',label:t,color:'#aaa'};
        return '<span style="'+cs+';color:'+m.color+'" data-f="'+_se(t)+'">'+m.icon+' '+m.label+' <strong style="color:#fff">'+counts[t]+'</strong></span>';
      }).join('');
    el.querySelectorAll('span[data-f]').forEach(function(chip){
      chip.onclick=function(){
        _secFilter.type=chip.dataset.f;
        var sel=document.getElementById('ap-sec-type'); if(sel) sel.value=_secFilter.type;
        renderSecBody();
      };
    });
  }

  function renderSecBody(){
    if(_secTabInner==='events')     renderSecEvents();
    else if(_secTabInner==='users') renderSecUsers();
    else if(_secTabInner==='chart') renderSecChart();
  }

  function filteredEvs(){
    return _secAllEvs.filter(function(e){
      if(_secFilter.type&&e.type!==_secFilter.type) return false;
      if(_secFilter.email){var h=((e.email||'')+(e.uid||'')).toLowerCase();if(!h.includes(_secFilter.email))return false;}
      return true;
    });
  }

  function renderSecEvents(){
    var body=document.getElementById('ap-sec-body'); if(!body) return;
    var evs=filteredEvs();
    if(!evs.length){body.innerHTML='<div style="text-align:center;padding:40px;color:#333;font-size:13px">Olay bulunamadı.</div>';return;}
    var html='';
    evs.slice(0,200).forEach(function(e){
      var m=LABELS[e.type]||{icon:'⚠️',label:_se(e.type),color:'#aaa'};
      html+='<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.05);border-left:3px solid '+m.color+';border-radius:8px;padding:10px 12px;margin-bottom:6px">'
        +'<div style="display:flex;align-items:center;gap:6px"><span>'+m.icon+'</span><span style="font-size:12px;color:'+m.color+'">'+_se(m.label)+'</span>'
        +'<span style="margin-left:auto;font-size:10px;color:#333">'+ts2str(e.ts)+'</span></div>'
        +'<div style="font-size:11px;color:#6ea4ff;margin-top:4px">'+_se(e.email||e.uid||'?')+'</div>'
        +(e.detail?'<div style="font-size:10px;color:#444;margin-top:2px">'+_se(String(e.detail).slice(0,100))+'</div>':'')
        +'</div>';
    });
    body.innerHTML=html;
  }

  function renderSecUsers(){
    var body=document.getElementById('ap-sec-body'); if(!body) return;
    var map={};
    _secAllEvs.forEach(function(e){
      var k=e.email||e.uid||'?';
      if(!map[k]) map[k]={email:k,uid:e.uid||'—',count:0,types:{},last:null};
      map[k].count++; map[k].types[e.type]=true;
      if(!map[k].last||(e.ts&&e.ts.toMillis&&map[k].last&&e.ts.toMillis()>map[k].last.toMillis())) map[k].last=e.ts;
    });
    var users=Object.values(map).sort(function(a,b){return b.count-a.count;});
    if(!users.length){body.innerHTML='<div style="text-align:center;padding:40px;color:#333;font-size:13px">Henüz kullanıcı yok.</div>';return;}
    var html='';
    users.forEach(function(u,i){
      var flg=!!_secFlagged[u.uid];
      var icons=Object.keys(u.types).map(function(t){return LABELS[t]?LABELS[t].icon:'⚠️';}).join(' ');
      var highRisk=u.count>=10;
      /* Kullanıcı verisi onclick'e enjekte edilmiyor — data-idx + event listener kullanılıyor */
      html+='<div class="ap-su-row" data-idx="'+i+'" style="background:#0d0d1a;border:1px solid rgba(255,255,255,'+(flg?'0.14':highRisk?'0.12':'0.05')+');border-left:3px solid '+(flg?'#ff4444':highRisk?'#ff9900':'#7c3aed')+';border-radius:8px;padding:10px 12px;margin-bottom:6px;cursor:pointer">'
        +'<div style="display:flex;align-items:center;gap:8px">'
        +'<span>'+(flg?'🚩':highRisk?'⚠️':'👤')+'</span>'
        +'<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span style="font-size:12px;color:#6ea4ff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+_se(u.email)+'</span>'+(highRisk&&!flg?'<span style="padding:1px 6px;background:rgba(255,153,0,0.15);border:1px solid rgba(255,153,0,0.4);border-radius:4px;font-size:10px;color:#ff9900;flex-shrink:0">Yüksek risk</span>':'')+'</div>'
        +'<div style="font-size:11px;color:#444;margin-top:2px">'+icons+' · '+u.count+' olay · '+ts2str(u.last)+'</div></div>'
        +'<button class="ap-su-flag" style="padding:4px 10px;background:'+(flg?'rgba(255,68,68,0.15)':'rgba(255,255,255,0.04)')+';border:1px solid '+(flg?'#ff4444':'rgba(255,255,255,0.08)')+';border-radius:6px;color:'+(flg?'#ff8888':'#666')+';font-size:10px;cursor:pointer">'+(flg?'🚩 Kaldır':'🚩 İşaretle')+'</button>'
        +'</div></div>';
    });
    _secUsersCache=users;
    body.innerHTML=html;
    /* Event delegation — kullanıcı verisi JS string interpolasyonundan uzak tutuldu */
    body.querySelectorAll('.ap-su-row').forEach(function(el){
      var idx=parseInt(el.dataset.idx,10);
      el.onclick=function(){ var u=_secUsersCache[idx]; if(u) openSecDetail(u.email); };
      var flagBtn=el.querySelector('.ap-su-flag');
      if(flagBtn) flagBtn.onclick=function(e){ e.stopPropagation(); var u=_secUsersCache[idx]; if(u) toggleFlag(u.uid,u.email); };
    });
  }

  function renderSecChart(){
    var body=document.getElementById('ap-sec-body'); if(!body) return;
    body.innerHTML='<canvas id="ap-sec-cv" height="200" style="width:100%;display:block"></canvas>'
      +'<div id="ap-sec-leg" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px"></div>';
    var days={};
    for(var i=6;i>=0;i--){var dd=new Date(Date.now()-i*86400000);var k=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');days[k]={};}
    _secAllEvs.forEach(function(e){
      if(!e.ts||!e.ts.toMillis) return;
      var dd=new Date(e.ts.toMillis()),k=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');
      if(!(k in days)) return;
      days[k][e.type]=(days[k][e.type]||0)+1;
    });
    var labels=Object.keys(days),types=Object.keys(LABELS),maxVal=0;
    labels.forEach(function(day){var t=Object.values(days[day]).reduce(function(a,b){return a+b;},0);if(t>maxVal)maxVal=t;});
    if(!maxVal){body.innerHTML='<div style="text-align:center;padding:40px;color:#333;font-size:13px">Son 7 günde olay yok.</div>';return;}
    var cv=document.getElementById('ap-sec-cv'); if(!cv) return;
    var W=cv.offsetWidth||700,H=200; cv.width=W; cv.height=H;
    var ctx=cv.getContext('2d'),cols=labels.length,padL=36,padB=28,padR=10,padT=10;
    var slotW=(W-padL-padR)/cols,barW=Math.max(8,Math.floor(slotW*0.55));
    ctx.clearRect(0,0,W,H);
    for(var gi=0;gi<=4;gi++){var gy=H-padB-(gi/4)*(H-padB-padT);ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(padL,gy);ctx.lineTo(W-padR,gy);ctx.stroke();ctx.fillStyle='#444';ctx.font='9px system-ui';ctx.textAlign='right';ctx.fillText(Math.round(maxVal*gi/4),padL-4,gy+3);}
    labels.forEach(function(day,xi){
      var cx=padL+xi*slotW+slotW/2-barW/2,yBase=H-padB,stackY=yBase;
      types.forEach(function(t){var val=days[day][t]||0;if(!val)return;var bh=(val/maxVal)*(H-padB-padT);ctx.fillStyle=LABELS[t].color;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(cx,stackY-bh,barW,bh,3);else ctx.rect(cx,stackY-bh,barW,bh);ctx.fill();stackY-=bh;});
      ctx.fillStyle='#444';ctx.font='9px system-ui';ctx.textAlign='center';ctx.fillText(day.slice(5),cx+barW/2,H-padB+14);
    });
    var leg=document.getElementById('ap-sec-leg');
    if(leg) leg.innerHTML=types.map(function(t){return '<div style="display:flex;align-items:center;gap:4px;font-size:11px;color:#666"><div style="width:10px;height:10px;border-radius:2px;background:'+LABELS[t].color+'"></div>'+LABELS[t].icon+' '+LABELS[t].label+'</div>';}).join('');
  }

  function toggleLive(){
    var b=document.getElementById('ap-sec-live');
    if(_liveUnsub){stopLive();if(b){b.textContent='▶ Canlı';b.style.color='#888';}}
    else{startLive();if(b){b.textContent='⏸ Canlı';b.style.color='#4ade80';}}
  }
  function startLive(){
    stopLive();var d=db();if(!d)return;
    /* Bildirim izni iste */
    if(typeof Notification!=='undefined'&&Notification.permission==='default'){
      Notification.requestPermission();
    }
    _notifPrev=_secAllEvs.length;
    _liveUnsub=d.collection('security_events').orderBy('ts','desc').limit(500)
      .onSnapshot(function(snap){
        loadFlagged(function(fl){
          _secFlagged=fl;
          var prevLen=_secAllEvs.length;
          _secAllEvs=[];
          snap.forEach(function(doc){_secAllEvs.push(Object.assign({_id:doc.id},doc.data()));});
          renderSecSummary();renderSecBody();
          var u=document.getElementById('ap-sec-upd');if(u)u.textContent='🔴 Canlı — '+new Date().toLocaleTimeString('tr-TR');
          /* Tarayıcı bildirimi */
          if(_secAllEvs.length>prevLen&&prevLen>0&&typeof Notification!=='undefined'&&Notification.permission==='granted'){
            var newCnt=_secAllEvs.length-prevLen;
            var newest=_secAllEvs[0];
            var m=LABELS[newest&&newest.type]||{icon:'⚠️',label:(newest&&newest.type)||'Olay'};
            try{new Notification('🛡️ Yeni Güvenlik Olayı ('+newCnt+')',{body:m.icon+' '+m.label+' — '+(newest&&(newest.email||newest.uid)||'?'),tag:'sec-event'});}catch(ex){}
          }
        });
      },function(){stopLive();var b=document.getElementById('ap-sec-live');if(b){b.textContent='▶ Canlı';b.style.color='#888';}});
  }
  function stopLive(){if(_liveUnsub){_liveUnsub();_liveUnsub=null;}}

  function openSecDetail(email){
    if(!isAdmin()) return;
    var evs=_secAllEvs.filter(function(e){return(e.email||e.uid||'?')===email;});
    var uid=(evs[0]&&evs[0].uid)||'—';
    var flg=!!_secFlagged[uid];
    var counts={};evs.forEach(function(e){counts[e.type]=(counts[e.type]||0)+1;});
    var rows=evs.slice(0,80).map(function(e){var m=LABELS[e.type]||{icon:'⚠️',label:_se(e.type),color:'#aaa'};return '<div style="background:#0d0d1a;border-left:3px solid '+m.color+';border-radius:6px;padding:8px 10px;margin-bottom:5px"><div style="display:flex;align-items:center;gap:6px"><span>'+m.icon+'</span><span style="font-size:12px;color:'+m.color+'">'+_se(m.label)+'</span><span style="margin-left:auto;font-size:11px;color:#444">'+ts2str(e.ts)+'</span></div>'+(e.detail?'<div style="font-size:10px;color:#444;margin-top:2px">'+_se(String(e.detail).slice(0,120))+'</div>':'')+'</div>';}).join('');
    var ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;padding:20px';
    ov.innerHTML='<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;max-width:520px;width:100%;max-height:80vh;overflow-y:auto"><div style="display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.07);gap:8px"><span>'+(flg?'🚩':'👤')+'</span><div><div style="font-size:13px;font-weight:700;color:#6ea4ff">'+_se(email)+'</div><div style="font-size:11px;color:#444">UID: '+_se(uid)+'</div></div><button id="ov-flag" style="margin-left:auto;padding:5px 12px;background:'+(flg?'rgba(255,68,68,0.15)':'rgba(255,255,255,0.05)')+';border:1px solid '+(flg?'#ff4444':'rgba(255,255,255,0.1)')+';border-radius:8px;color:'+(flg?'#ff8888':'#888')+';font-size:11px;cursor:pointer">'+(flg?'🚩 Kaldır':'🚩 İşaretle')+'</button><button id="ov-close" style="padding:5px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:8px;color:#777;font-size:11px;cursor:pointer;margin-left:6px">✕</button></div><div style="padding:12px 16px"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">'+Object.keys(counts).map(function(t){var m=LABELS[t]||{icon:'⚠️',color:'#aaa'};return '<span style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:6px;padding:4px 10px;font-size:11px;color:'+m.color+'">'+m.icon+' '+counts[t]+'</span>';}).join('')+'</div>'+rows+'</div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#ov-close').onclick=function(){ov.remove();};
    ov.onclick=function(e){if(e.target===ov)ov.remove();};
    ov.querySelector('#ov-flag').onclick=function(){toggleFlag(uid,email,function(){ov.remove();renderSecBody();});};
  }

  function toggleFlag(uid,email,cb){
    if(!isAdmin()) return;
    var d=db();if(!d||!uid||uid==='—'||uid==='anonymous')return;
    var fv=fsv();
    if(_secFlagged[uid]){
      d.collection('flagged_users').doc(uid).delete().then(function(){delete _secFlagged[uid];renderSecSummary();renderSecBody();if(cb)cb();}).catch(function(){});
    } else {
      d.collection('flagged_users').doc(uid).set({uid:uid,email:email,flaggedAt:fv?fv.serverTimestamp():null})
        .then(function(){_secFlagged[uid]={uid:uid,email:email};renderSecSummary();renderSecBody();if(cb)cb();}).catch(function(){});
    }
  }

  function exportSecCSV(){
    if(!_secAllEvs.length) return;
    function q(v){return '"'+String(v==null?'':v).replace(/"/g,'""')+'"';}
    var rows=['Tarih,Tip,Email,UID,Detay,User Agent'].concat(_secAllEvs.map(function(e){return [q(ts2str(e.ts)),q(e.type),q(e.email),q(e.uid),q(e.detail),q(e.ua)].join(',');})).join('\n');
    var blob=new Blob(['\uFEFF'+rows],{type:'text/csv;charset=utf-8'});
    var url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='guvenlik-'+new Date().toISOString().slice(0,10)+'.csv';a.click();URL.revokeObjectURL(url);
  }

  /* ═══════════════════════════════════════════════════════════
     4. RİVAL
  ═══════════════════════════════════════════════════════════ */
  function renderRival(){
    var acts=document.getElementById('ap-h-acts');
    if(acts){
      acts.innerHTML=btn('ap-rv-ref','🔄 Yenile','')+btn('ap-rv-clear','🗑️ Tamamlananları Temizle','margin-left:2px;color:#ff8888');
      acts.querySelector('#ap-rv-ref').onclick=renderRival;
      acts.querySelector('#ap-rv-clear').onclick=clearDoneMatches;
    }
    var d=db();if(!d){showContent(errMsg('Bağlantı yok.'));return;}
    Promise.all([
      d.collection('rival_queue').get(),
      d.collection('rival_matches').limit(50).get().catch(function(){return {forEach:function(){},size:0};})
    ]).then(function(res){
      var qSnap=res[0],mSnap=res[1];
      var qRows='',matchDocs=[];
      qSnap.forEach(function(doc){
        var u=doc.data();
        var docId=doc.id;
        qRows+='<tr style="border-bottom:1px solid rgba(255,255,255,0.025)">'
          +'<td style="padding:9px 12px"><div style="font-size:12px;color:#6ea4ff">'+_se(u.name||'?')+'</div>'
          +'<div style="font-size:10px;color:#333">'+_se(docId)+'</div></td>'
          +'<td style="padding:9px 12px;font-size:12px;color:#a78bfa">'+_se(u.mode||'—')+'</td>'
          +'<td style="padding:9px 12px;font-size:11px;color:#444">'+_se(u.mode_level||'—')+'</td>'
          +'<td style="padding:9px 12px;text-align:center"><button class="ap-del-q" data-id="'+_se(docId)+'" style="padding:3px 8px;background:rgba(255,68,68,0.15);border:1px solid rgba(255,68,68,0.4);border-radius:6px;color:#ff8888;font-size:10px;cursor:pointer">🗑️ Sil</button></td>'
          +'</tr>';
      });

      var mRows='';
      mSnap.forEach(function(doc){
        var m=doc.data(); matchDocs.push({id:doc.id,data:m});
        var done=m.hostDone&&m.guestDone;
        mRows+='<tr style="border-bottom:1px solid rgba(255,255,255,0.025);'+(done?'opacity:0.5':'')+'">'
          +'<td style="padding:9px 12px;font-size:10px;color:#333">'+_se(doc.id.slice(0,12))+'…</td>'
          +'<td style="padding:9px 12px;font-size:12px;color:#fff">'+_se(m.hostName||'?')+' <span style="color:#444">vs</span> '+_se(m.guestName||'—')+'</td>'
          +'<td style="padding:9px 12px;text-align:center;font-size:13px;font-weight:700;color:#4ade80">'+_se(m.hostScore||0)+' – '+_se(m.guestScore||0)+'</td>'
          +'<td style="padding:9px 12px;font-size:11px;color:#a78bfa">'+_se(m.mode||'—')+'</td>'
          +'<td style="padding:9px 12px"><span style="padding:2px 8px;border-radius:4px;font-size:11px;background:rgba('+(m.status==='active'?'74,222,128':done?'255,68,68':'255,255,255')+',0.08);color:'+(m.status==='active'?'#4ade80':done?'#ff8888':'#444')+'">'+_se(done?'Bitti':(m.status||'—'))+'</span></td>'
          +'</tr>';
      });

      var th=function(l){return '<th style="padding:8px 12px;text-align:left;color:#444;font-size:11px;font-weight:600">'+l+'</th>';};
      var tbl=function(thead,tbody,empty){
        return tbody
          ?'<table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid rgba(255,255,255,0.05)">'+thead+'</tr></thead><tbody>'+tbody+'</tbody></table>'
          :'<div style="padding:18px;text-align:center;color:#333;font-size:12px">'+empty+'</div>';
      };

      var doneCnt=matchDocs.filter(function(x){return x.data.hostDone&&x.data.guestDone;}).length;
      /* Maç istatistikleri */
      var modeCounts2={},totalScore=0,scoreCount=0;
      matchDocs.forEach(function(x){
        var m=x.data;
        if(m.mode) modeCounts2[m.mode]=(modeCounts2[m.mode]||0)+1;
        if(m.hostDone&&m.guestDone){totalScore+=(m.hostScore||0)+(m.guestScore||0);scoreCount++;}
      });
      var topMode=Object.keys(modeCounts2).sort(function(a,b){return modeCounts2[b]-modeCounts2[a];})[0]||'—';
      var avgScore=scoreCount?Math.round(totalScore/scoreCount/2):0;
      var cs2='background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;flex:1;min-width:110px';
      var statsHtml='<div style="display:flex;gap:10px;flex-wrap:wrap">'
        +sc('⚔️','Toplam Maç',matchDocs.length,'#4488ff',cs2,'')
        +sc('✅','Tamamlanan',doneCnt,'#4ade80',cs2,'')
        +sc('🏆','En Popüler Mod',topMode,'#cc44ff',cs2,'')
        +sc('📊','Ort. Skor',avgScore,'#ff9900',cs2,'')
        +'</div>';

      showContent('<div style="display:grid;gap:14px">'
        +statsHtml
        +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
        +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">⏳ Eşleşme Kuyruğu ('+qSnap.size+')</div>'
        +tbl(th('Kullanıcı')+th('Mod')+th('Seviye')+th(''),qRows,'Kuyruk boş')
        +'</div>'
        +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
        +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">⚔️ Son Maçlar <span style="font-weight:400;color:#555;font-size:11px">('+doneCnt+' tamamlandı)</span></div>'
        +tbl(th('ID')+th('Oyuncular')+th('Skor')+th('Mod')+th('Durum'),mRows,'Maç bulunamadı')
        +'</div></div>');
      /* Event delegation — data-id attribute, onclick string yok */
      document.querySelectorAll('.ap-del-q').forEach(function(btn2){
        btn2.onclick=function(){ deleteQueueEntry(btn2.dataset.id); };
      });
    }).catch(function(e){showContent(errMsg(e));});
  }

  function deleteQueueEntry(uid){
    if(!isAdmin()) return;
    var d=db();if(!d)return;
    if(!confirm('Bu kuyruk girişini silmek istediğinize emin misiniz?')) return;
    d.collection('rival_queue').doc(uid).delete()
      .then(function(){renderRival();})
      .catch(function(e){alert('Silinemedi: '+(e&&e.message||String(e)));});
  }

  function clearDoneMatches(){
    var d=db();if(!d)return;
    if(!confirm('Tamamlanmış (hostDone && guestDone) tüm maçlar silinecek. Emin misiniz?')) return;
    d.collection('rival_matches').limit(100).get().then(function(snap){
      var toDelete=[];
      snap.forEach(function(doc){var m=doc.data();if(m.hostDone&&m.guestDone)toDelete.push(doc.id);});
      if(!toDelete.length){alert('Silinecek tamamlanmış maç bulunamadı.');return;}
      var batch=d.batch();
      toDelete.forEach(function(id){batch.delete(d.collection('rival_matches').doc(id));});
      return batch.commit().then(function(){alert(toDelete.length+' maç silindi.');renderRival();});
    }).catch(function(e){alert('Hata: '+(e&&e.message||String(e)));});
  }

  /* ═══════════════════════════════════════════════════════════
     5. LİDERLİK
  ═══════════════════════════════════════════════════════════ */
  function renderLeaderboard(){
    var acts=document.getElementById('ap-h-acts');
    if(acts){
      acts.innerHTML=lbBtn('daily','Günlük',false)+lbBtn('weekly','Haftalık',true)+lbBtn('monthly','Aylık',false);
      acts.querySelectorAll('.ap-lb-btn').forEach(function(b){
        b.onclick=function(){
          _lbPeriod=b.dataset.p;
          acts.querySelectorAll('.ap-lb-btn').forEach(function(x){var a=x.dataset.p===_lbPeriod;x.style.background=a?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.05)';x.style.borderColor=a?'rgba(124,58,237,0.4)':'rgba(255,255,255,0.09)';x.style.color=a?'#a78bfa':'#777';});
          loadLeaderboard();
        };
      });
    }
    loadLeaderboard();
  }

  function lbBtn(p,label,active){
    return '<button class="ap-lb-btn" data-p="'+p+'" style="padding:5px 12px;background:'+(active?'rgba(124,58,237,0.2)':'rgba(255,255,255,0.05)')+';border:1px solid '+(active?'rgba(124,58,237,0.4)':'rgba(255,255,255,0.09)')+';border-radius:8px;color:'+(active?'#a78bfa':'#777')+';font-size:11px;cursor:pointer">'+label+'</button>';
  }

  function loadLeaderboard(){
    var d=db();if(!d){showContent(errMsg('Bağlantı yok.'));return;}
    showContent('<div style="text-align:center;padding:40px;color:#333;font-size:13px">Yükleniyor…</div>');
    d.collection('leaderboards').doc(lbPeriodDoc(_lbPeriod)).collection('users').orderBy('xp','desc').limit(100).get()
      .then(function(snap){
        if(!snap.size){showContent('<div style="text-align:center;padding:40px;color:#333">Bu dönem için veri yok.</div>');return;}
        _lbUsers=[];
        snap.forEach(function(doc){_lbUsers.push(doc.data());});
        var medals=['🥇','🥈','🥉'],i=0,rows='';
        _lbUsers.forEach(function(u){
          i++;
          rows+='<tr style="border-bottom:1px solid rgba(255,255,255,0.025)">'
            +'<td style="padding:9px 12px;color:#444;font-size:12px">'+(medals[i-1]||i)+'</td>'
            +'<td style="padding:9px 12px"><div style="display:flex;align-items:center;gap:8px">'
            +'<span style="font-size:1.1rem">'+_se(u.avatar||'😊')+'</span>'
            +'<div><div style="font-size:13px;color:#fff;font-weight:600">'+_se(u.name||'?')+'</div>'
            +'<div style="font-size:10px;color:#333;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+_se(u.uid||'—')+'</div></div>'
            +'</div></td>'
            +'<td style="padding:9px 12px;text-align:right;color:#4ade80;font-weight:800;font-size:13px">'+_se(u.xp||0)+'</td>'
            +'<td style="padding:9px 12px;text-align:right;color:#aaa;font-size:12px">'+_se(u.level||1)+'</td>'
            +'<td style="padding:9px 12px;text-align:center"><span style="background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.3);border-radius:4px;padding:2px 7px;color:#a78bfa;font-size:11px">'+_se(u.cefrLevel||'—')+'</span></td>'
            +'</tr>';
        });
        showContent(
          '<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:16px">'
          +'<table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid rgba(255,255,255,0.07)">'
          +'<th style="padding:9px 12px;text-align:left;color:#444;font-size:11px">#</th>'
          +'<th style="padding:9px 12px;text-align:left;color:#444;font-size:11px">Kullanıcı</th>'
          +'<th style="padding:9px 12px;text-align:right;color:#444;font-size:11px">XP</th>'
          +'<th style="padding:9px 12px;text-align:right;color:#444;font-size:11px">Lvl</th>'
          +'<th style="padding:9px 12px;text-align:center;color:#444;font-size:11px">CEFR</th>'
          +'</tr></thead><tbody>'+rows+'</tbody></table></div>'
          +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
          +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">📊 Top 10 XP Karşılaştırması</div>'
          +'<div style="padding:14px 16px"><canvas id="ap-lb-chart" height="160" style="width:100%;display:block"></canvas></div>'
          +'</div>'
          +'<div style="margin-top:8px;font-size:11px;color:#333;text-align:right">'+snap.size+' kullanıcı · '+lbPeriodDoc(_lbPeriod)+'</div>');
        setTimeout(function(){renderLbChart(_lbUsers.slice(0,10));},50);
      })
      .catch(function(e){showContent(errMsg(e));});
  }

  function renderLbChart(users){
    var cv=document.getElementById('ap-lb-chart');if(!cv) return;
    var W=cv.offsetWidth||700,H=160; cv.width=W; cv.height=H;
    var ctx=cv.getContext('2d');
    if(!users.length)return;
    var maxXp=users[0].xp||1;
    var barH=Math.max(10,Math.floor((H-20)/users.length-4));
    var padL=100,padR=60,padT=8;
    ctx.clearRect(0,0,W,H);
    users.forEach(function(u,i){
      var y=padT+i*(barH+4);
      var bw=Math.max(4,(u.xp||0)/maxXp*(W-padL-padR));
      var t=i/users.length;
      var r=Math.round(124+t*(74-124)),g=Math.round(58+t*(222-58)),b2=Math.round(237+t*(128-237));
      ctx.fillStyle='rgb('+r+','+g+','+b2+')';
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(padL,y,bw,barH,3);else ctx.rect(padL,y,bw,barH);ctx.fill();
      ctx.fillStyle='#888';ctx.font='10px system-ui';ctx.textAlign='right';
      var name=(_se(u.name||'?')).slice(0,12);
      ctx.fillText(name,padL-4,y+barH/2+3);
      ctx.fillStyle='#aaa';ctx.textAlign='left';
      ctx.fillText(_se(u.xp||0),padL+bw+4,y+barH/2+3);
    });
  }

  /* ═══════════════════════════════════════════════════════════
     6. DUYURULAR
  ═══════════════════════════════════════════════════════════ */
  function renderAnnouncements(){
    var d=db();if(!d){showContent(errMsg('Bağlantı yok.'));return;}
    d.collection('app_config').doc('announcement').get()
      .then(function(doc){
        var data=doc.exists?doc.data():{active:false,message:'',type:'info'};
        buildAnnouncementForm(data);
      }).catch(function(){buildAnnouncementForm({active:false,message:'',type:'info'});});
  }

  function buildAnnouncementForm(data){
    var typeColors={info:'#4488ff',warning:'#ff9900',success:'#4ade80',error:'#ff4444'};
    var typeIcons={info:'📢',warning:'⚠️',success:'✅',error:'❌'};
    var html=
      '<div style="max-width:600px">'
      /* Mevcut durum */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:16px">'
      +'<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:10px">📢 Mevcut Duyuru</div>'
      +(data.active&&data.message
        ?'<div style="background:rgba('+(typeColors[data.type]||typeColors.info).replace('#','')
          +',0.1);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;display:flex;align-items:flex-start;gap:8px">'
          +'<span style="font-size:1.2rem">'+(typeIcons[data.type]||'📢')+'</span>'
          +'<div style="flex:1"><div style="font-size:13px;color:#ccc">'+_se(data.message)+'</div>'
          +'<div style="font-size:11px;color:#555;margin-top:4px">Tür: '+_se(data.type||'info')+'</div></div>'
          +'<span style="padding:2px 8px;background:rgba(74,222,128,0.2);border:1px solid rgba(74,222,128,0.3);border-radius:4px;font-size:11px;color:#4ade80">Aktif</span>'
          +'</div>'
        :'<div style="font-size:12px;color:#444;text-align:center;padding:12px">Aktif duyuru yok.</div>')
      +'</div>'
      /* Form */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px">'
      +'<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:14px">✏️ Duyuru Düzenle</div>'
      +'<div style="margin-bottom:12px">'
      +'<label style="font-size:11px;color:#666;display:block;margin-bottom:5px">Mesaj</label>'
      +'<textarea id="ap-ann-msg" rows="3" maxlength="500" style="width:100%;box-sizing:border-box;background:#13131f;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#ccc;padding:10px;font-size:13px;resize:vertical;line-height:1.5">'+_se(data.message||'')+'</textarea>'
      +'</div>'
      +'<div style="display:flex;gap:10px;margin-bottom:16px">'
      +'<div style="flex:1"><label style="font-size:11px;color:#666;display:block;margin-bottom:5px">Tür</label>'
      +'<select id="ap-ann-type" style="width:100%;background:#13131f;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#ccc;padding:8px;font-size:12px">'
      +'<option value="info"    '+(data.type==='info'   ?'selected':'')+'>📢 Bilgi</option>'
      +'<option value="warning" '+(data.type==='warning'?'selected':'')+'>⚠️ Uyarı</option>'
      +'<option value="success" '+(data.type==='success'?'selected':'')+'>✅ Başarı</option>'
      +'<option value="error"   '+(data.type==='error'  ?'selected':'')+'>❌ Hata</option>'
      +'</select></div>'
      +'<div><label style="font-size:11px;color:#666;display:block;margin-bottom:5px">Durum</label>'
      +'<label style="display:flex;align-items:center;gap:6px;padding:8px 12px;background:#13131f;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer">'
      +'<input type="checkbox" id="ap-ann-active" '+(data.active?'checked':'')+' style="width:14px;height:14px;cursor:pointer">'
      +'<span style="font-size:12px;color:#ccc">Aktif</span></label></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px">'
      +'<button id="ap-ann-save" style="flex:1;padding:10px;background:rgba(124,58,237,0.25);border:1px solid rgba(124,58,237,0.5);border-radius:8px;color:#c4b5fd;font-size:13px;cursor:pointer;font-weight:600">💾 Kaydet</button>'
      +(data.active?'<button id="ap-ann-off" style="padding:10px 16px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:8px;color:#ff8888;font-size:13px;cursor:pointer">Devre Dışı</button>':'')
      +'</div>'
      +'<div id="ap-ann-status" style="margin-top:10px;font-size:12px;min-height:18px;text-align:center"></div>'
      +'</div></div>';

    showContent(html);

    document.getElementById('ap-ann-save').onclick=function(){
      var msg=document.getElementById('ap-ann-msg').value.trim();
      var type=document.getElementById('ap-ann-type').value;
      var active=document.getElementById('ap-ann-active').checked;
      var st=document.getElementById('ap-ann-status');
      if(!msg){ if(st){st.style.color='#ff8888';st.textContent='⚠️ Mesaj boş olamaz.';} return; }
      saveAnnouncement(msg,type,active);
    };
    var offBtn=document.getElementById('ap-ann-off');
    if(offBtn) offBtn.onclick=function(){saveAnnouncement(data.message||'',data.type||'info',false);};
  }

  function saveAnnouncement(msg,type,active){
    var d=db();
    var st=document.getElementById('ap-ann-status');
    var btn2=document.getElementById('ap-ann-save');
    if(!d){
      if(st){st.style.color='#ff8888';st.textContent='❌ Firestore bağlantısı yok.';}
      return;
    }
    var fv=fsv();
    if(btn2){btn2.textContent='Kaydediliyor…';btn2.disabled=true;}
    if(st){st.textContent='';}
    d.collection('app_config').doc('announcement').set({
      active:active, message:msg, type:type,
      updatedAt: fv?fv.serverTimestamp():null
    }).then(function(){
      if(st){st.style.color='#4ade80';st.textContent='✅ Kaydedildi!';}
      if(btn2){btn2.textContent='💾 Kaydet';btn2.disabled=false;}
      setTimeout(function(){
        if(document.getElementById('ap-ann-status')) renderAnnouncements();
      },1200);
      if(window.AppConfig&&active) window.AppConfig.showBanner(msg,type);
    }).catch(function(e){
      var errTxt=e&&e.message?e.message:String(e);
      if(st){st.style.color='#ff8888';st.textContent='❌ Hata: '+errTxt;}
      console.error('[AdminPanel] saveAnnouncement hatası:',e);
      if(btn2){btn2.textContent='💾 Kaydet';btn2.disabled=false;}
    });
  }

  /* ═══════════════════════════════════════════════════════════
     7. UYGULAMA KONTROLÜ
  ═══════════════════════════════════════════════════════════ */
  var FLAG_DEFS = [
    { key:'feature_speaking_ai',    label:'Speaking AI',         desc:'AI tabanlı konuşma değerlendirme' },
    { key:'feature_notifications',  label:'Bildirimler',          desc:'Push bildirimleri' },
    { key:'feature_nexus_mode',     label:'Nexus Modu',           desc:'Nexus öğrenme modu' },
    { key:'feature_convo_mode',     label:'Quantum Modu',         desc:'Quantum konuşma pratiği modu' },
    { key:'feature_confetti',       label:'Konfeti Efekti',       desc:'XP kazanımında konfeti animasyonu' }
  ];

  function renderControl(){
    var d=db();if(!d){showContent(errMsg('Bağlantı yok.'));return;}
    d.collection('app_config').doc('flags').get()
      .then(function(doc){
        var data=doc.exists?doc.data():{};
        buildControlForm(data);
      }).catch(function(){buildControlForm({});});
  }

  function buildControlForm(data){
    var flags=Object.assign({},window.remoteFlags||{},data);

    var flagRows=FLAG_DEFS.map(function(f){
      var checked=flags[f.key]!==false&&flags[f.key]!==0&&flags[f.key]!=='false';
      return '<div style="display:flex;align-items:center;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04)">'
        +'<div style="flex:1"><div style="font-size:13px;color:#ccc;font-weight:500">'+_se(f.label)+'</div>'
        +'<div style="font-size:11px;color:#444;margin-top:2px">'+_se(f.desc)+'</div></div>'
        +'<label style="position:relative;width:40px;height:22px;cursor:pointer;flex-shrink:0">'
        +'<input type="checkbox" class="ap-flag-cb" data-key="'+f.key+'" '+(checked?'checked':'')+' style="opacity:0;position:absolute;width:0;height:0">'
        +'<span class="ap-toggle" style="position:absolute;inset:0;background:'+(checked?'rgba(124,58,237,0.6)':'rgba(255,255,255,0.08)')+';border:1px solid '+(checked?'rgba(124,58,237,0.8)':'rgba(255,255,255,0.15)')+';border-radius:11px;transition:all 0.2s">'
        +'<span style="position:absolute;width:16px;height:16px;background:#fff;border-radius:50%;top:2px;left:'+(checked?'20px':'2px')+';transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></span>'
        +'</span></label>'
        +'</div>';
    }).join('');

    var maintChecked=!!flags.maintenanceMode;
    var html=
      '<div style="max-width:600px">'
      /* Özellik bayrakları */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:14px">'
      +'<div style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">🏁 Özellik Bayrakları</div>'
      +flagRows
      +'</div>'
      /* Bakım modu */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px">'
      +'<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:12px">🔧 Bakım Modu</div>'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">'
      +'<label style="position:relative;width:44px;height:24px;cursor:pointer;flex-shrink:0">'
      +'<input type="checkbox" id="ap-maint-cb" '+(maintChecked?'checked':'')+' style="opacity:0;position:absolute">'
      +'<span style="position:absolute;inset:0;background:'+(maintChecked?'rgba(255,68,68,0.5)':'rgba(255,255,255,0.08)')+';border:1px solid '+(maintChecked?'rgba(255,68,68,0.7)':'rgba(255,255,255,0.15)')+';border-radius:12px">'
      +'<span id="ap-maint-dot" style="position:absolute;width:18px;height:18px;background:#fff;border-radius:50%;top:2px;left:'+(maintChecked?'22px':'2px')+';transition:left 0.2s"></span>'
      +'</span></label>'
      +'<span style="font-size:13px;color:'+(maintChecked?'#ff8888':'#666')+'">'+( maintChecked?'Bakım modu AKTİF — kullanıcılar uygulamaya giremez':'Bakım modu kapalı')+'</span>'
      +'</div>'
      +'<div><label style="font-size:11px;color:#555;display:block;margin-bottom:5px">Bakım mesajı</label>'
      +'<textarea id="ap-maint-msg" rows="2" maxlength="300" style="width:100%;box-sizing:border-box;background:#13131f;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#ccc;padding:10px;font-size:13px;resize:vertical">'+_se(flags.maintenanceMessage||'')+'</textarea></div>'
      +'</div>'
      /* Kaydet */
      +'<button id="ap-ctrl-save" style="width:100%;padding:11px;background:rgba(124,58,237,0.25);border:1px solid rgba(124,58,237,0.5);border-radius:10px;color:#c4b5fd;font-size:13px;cursor:pointer;font-weight:600">💾 Değişiklikleri Kaydet</button>'
      +'<div id="ap-ctrl-msg" style="text-align:center;font-size:12px;margin-top:8px;color:#4ade80;min-height:18px"></div>'
      +'</div>';

    showContent(html);

    /* Toggle interactivity */
    document.querySelectorAll('.ap-flag-cb').forEach(function(cb){
      cb.onchange=function(){
        var toggle=cb.nextElementSibling;
        var dot=toggle&&toggle.querySelector('span');
        var on=cb.checked;
        if(toggle){toggle.style.background=on?'rgba(124,58,237,0.6)':'rgba(255,255,255,0.08)';toggle.style.borderColor=on?'rgba(124,58,237,0.8)':'rgba(255,255,255,0.15)';}
        if(dot) dot.style.left=on?'20px':'2px';
      };
    });

    var maintCb=document.getElementById('ap-maint-cb');
    if(maintCb) maintCb.onchange=function(){
      var dot=document.getElementById('ap-maint-dot');
      var label=maintCb.parentElement.nextElementSibling;
      var on=maintCb.checked;
      if(dot) dot.style.left=on?'22px':'2px';
      if(maintCb.parentElement){
        var sp=maintCb.nextElementSibling;
        if(sp){sp.style.background=on?'rgba(255,68,68,0.5)':'rgba(255,255,255,0.08)';sp.style.borderColor=on?'rgba(255,68,68,0.7)':'rgba(255,255,255,0.15)';}
      }
      if(label) label.textContent=on?'Bakım modu AKTİF — kullanıcılar uygulamaya giremez':'Bakım modu kapalı';
      if(label) label.style.color=on?'#ff8888':'#666';
    };

    document.getElementById('ap-ctrl-save').onclick=function(){
      var result={};
      document.querySelectorAll('.ap-flag-cb').forEach(function(cb){result[cb.dataset.key]=cb.checked;});
      var mc=document.getElementById('ap-maint-cb');
      var mm=document.getElementById('ap-maint-msg');
      result.maintenanceMode=mc?mc.checked:false;
      result.maintenanceMessage=mm?mm.value.trim():'';
      saveFlags(result);
    };
  }

  function saveFlags(data){
    var d=db();if(!d)return;
    var fv=fsv();
    var btn2=document.getElementById('ap-ctrl-save');
    var msg=document.getElementById('ap-ctrl-msg');
    if(btn2){btn2.textContent='Kaydediliyor…';btn2.disabled=true;}
    data.updatedAt=fv?fv.serverTimestamp():null;
    d.collection('app_config').doc('flags').set(data,{merge:true})
      .then(function(){
        if(window.remoteFlags) Object.assign(window.remoteFlags,data);
        if(btn2){btn2.textContent='💾 Değişiklikleri Kaydet';btn2.disabled=false;}
        if(msg){
          var maintOn = data.maintenanceMode;
          msg.style.color = maintOn ? '#ff9900' : '#4ade80';
          msg.textContent = maintOn
            ? '✅ Kaydedildi — Bakım modu AKTİF. Sen admin olduğun için göremezsin, diğer kullanıcılar anında bakım ekranını görecek.'
            : '✅ Kaydedildi!';
          setTimeout(function(){if(msg)msg.textContent='';},6000);
        }
      })
      .catch(function(e){
        if(btn2){btn2.textContent='💾 Değişiklikleri Kaydet';btn2.disabled=false;}
        if(msg){msg.style.color='#ff8888';msg.textContent='❌ Hata: '+(e&&e.message||String(e));}
      });
  }

  /* ═══════════════════════════════════════════════════════════
     8. ANALİTİK
  ═══════════════════════════════════════════════════════════ */
  function renderAnalytics(){
    var d=db();if(!d){showContent(errMsg('Bağlantı yok.'));return;}
    showContent('<div style="text-align:center;padding:40px;color:#333;font-size:13px">Yükleniyor…</div>');
    var acts=document.getElementById('ap-h-acts');
    if(acts){
      acts.innerHTML=btn('ap-an-ref','🔄 Yenile','');
      acts.querySelector('#ap-an-ref').onclick=renderAnalytics;
    }
    Promise.all([
      d.collection('security_events').orderBy('ts','desc').limit(1000).get(),
      d.collection('rival_matches').limit(300).get().catch(function(){return {forEach:function(){}};})
    ]).then(function(res){
      var secEvs=[]; res[0].forEach(function(doc){secEvs.push(doc.data());});
      var matches=[]; res[1].forEach(function(doc){matches.push(doc.data());});

      /* DAU — son 7 gün benzersiz UID */
      var days7={},labels7=[];
      for(var i=6;i>=0;i--){
        var dd=new Date(Date.now()-i*86400000);
        var k=dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');
        days7[k]={}; labels7.push(k);
      }
      secEvs.forEach(function(e){
        if(!e.ts||!e.ts.toMillis) return;
        var d2=new Date(e.ts.toMillis());
        var k2=d2.getFullYear()+'-'+String(d2.getMonth()+1).padStart(2,'0')+'-'+String(d2.getDate()).padStart(2,'0');
        if(k2 in days7) days7[k2][e.uid||e.email||'?']=true;
      });
      var dauCounts=labels7.map(function(k){return Object.keys(days7[k]).length;});

      /* Mod kullanımı */
      var modeCounts3={translate:0,cinema:0,synesthesia:0,phantom:0};
      matches.forEach(function(m){if(m.mode&&(m.mode in modeCounts3))modeCounts3[m.mode]++;});

      /* Saatlik aktivite */
      var hourly=new Array(24).fill(0);
      secEvs.forEach(function(e){
        if(!e.ts||!e.ts.toMillis) return;
        hourly[new Date(e.ts.toMillis()).getHours()]++;
      });

      var html=
        '<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:14px">'
        +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">📈 Günlük Aktif Kullanıcı (son 7 gün)</div>'
        +'<div style="padding:12px 16px"><canvas id="ap-an-dau" height="90" style="width:100%;display:block"></canvas></div>'
        +'</div>'
        +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:14px">'
        +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">🎮 Mod Kullanımı (Rival Maçları)</div>'
        +'<div style="padding:14px 16px"><canvas id="ap-an-mode" height="80" style="width:100%;display:block"></canvas></div>'
        +'</div>'
        +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden">'
        +'<div style="padding:11px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:700;color:#fff">🕐 Saatlik Aktivite Haritası</div>'
        +'<div style="padding:14px 16px"><canvas id="ap-an-hour" height="60" style="width:100%;display:block"></canvas></div>'
        +'</div>';

      showContent(html);
      setTimeout(function(){
        renderDauChart2(labels7,dauCounts,'ap-an-dau');
        renderModeChart(modeCounts3,'ap-an-mode');
        renderHourlyChart(hourly,'ap-an-hour');
      },50);
    }).catch(function(e){showContent(errMsg(e));});
  }

  function renderDauChart2(labels,counts,canvasId){
    var cv=document.getElementById(canvasId);if(!cv)return;
    var maxVal=Math.max.apply(null,counts)||1;
    var W=cv.offsetWidth||600,H=90;cv.width=W;cv.height=H;
    var ctx=cv.getContext('2d');
    var n=labels.length,padL=28,padB=22,padR=8,padT=10;
    var slotW=(W-padL-padR)/n,barW=Math.max(12,Math.floor(slotW*0.55));
    ctx.clearRect(0,0,W,H);
    counts.forEach(function(cnt,i){
      var cx=padL+i*slotW+slotW/2-barW/2;
      var bh=Math.max(2,(cnt/maxVal)*(H-padB-padT));
      ctx.fillStyle='rgba(68,136,255,0.7)';
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(cx,H-padB-bh,barW,bh,3);else ctx.rect(cx,H-padB-bh,barW,bh);ctx.fill();
      ctx.fillStyle='#555';ctx.font='9px system-ui';ctx.textAlign='center';
      ctx.fillText(labels[i].slice(5),cx+barW/2,H-padB+13);
      if(cnt>0){ctx.fillStyle='#6ea4ff';ctx.font='bold 9px system-ui';ctx.fillText(cnt,cx+barW/2,H-padB-bh-3);}
    });
  }

  function renderModeChart(modeCounts,canvasId){
    var cv=document.getElementById(canvasId);if(!cv)return;
    var entries=Object.keys(modeCounts).map(function(k){return {k:k,v:modeCounts[k]};});
    var total=entries.reduce(function(s,e){return s+e.v;},0);
    var W=cv.offsetWidth||600,H=80;cv.width=W;cv.height=H;
    var ctx=cv.getContext('2d');
    var colors={translate:'#a78bfa',cinema:'#4488ff',synesthesia:'#4ade80',phantom:'#ff9900'};
    var n=entries.length,padL=8,padB=22,padR=8,padT=16;
    var slotW=(W-padL-padR)/n,barW=Math.max(20,Math.floor(slotW*0.6));
    var maxV=Math.max.apply(null,entries.map(function(e){return e.v;}))||1;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#444';ctx.font='10px system-ui';ctx.textAlign='left';
    ctx.fillText('Toplam: '+total+' maç',padL,padT-4);
    entries.forEach(function(e,i){
      var cx=padL+i*slotW+slotW/2-barW/2;
      var bh=Math.max(2,(e.v/maxV)*(H-padB-padT));
      ctx.fillStyle=colors[e.k]||'#888';
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(cx,H-padB-bh,barW,bh,3);else ctx.rect(cx,H-padB-bh,barW,bh);ctx.fill();
      ctx.fillStyle='#666';ctx.font='9px system-ui';ctx.textAlign='center';
      ctx.fillText(e.k.slice(0,7),cx+barW/2,H-padB+13);
      if(e.v>0){ctx.fillStyle='#fff';ctx.font='bold 9px system-ui';ctx.fillText(e.v,cx+barW/2,H-padB-bh-3);}
    });
  }

  function renderHourlyChart(hourly,canvasId){
    var cv=document.getElementById(canvasId);if(!cv)return;
    var maxVal=Math.max.apply(null,hourly)||1;
    var W=cv.offsetWidth||600,H=60;cv.width=W;cv.height=H;
    var ctx=cv.getContext('2d');
    var n=24,padL=8,padB=16,padR=8,padT=4;
    var slotW=(W-padL-padR)/n;
    ctx.clearRect(0,0,W,H);
    hourly.forEach(function(cnt,i){
      var cx=padL+i*slotW;
      var bh=Math.max(1,(cnt/maxVal)*(H-padB-padT));
      ctx.fillStyle='rgba(124,58,237,'+(0.1+cnt/maxVal*0.85).toFixed(2)+')';
      ctx.fillRect(cx+1,H-padB-bh,slotW-2,bh);
      if(i%6===0){
        ctx.fillStyle='#444';ctx.font='8px system-ui';ctx.textAlign='center';
        ctx.fillText(i+'h',cx+slotW/2,H-padB+11);
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     9. VERİTABANI YÖNETİMİ
  ═══════════════════════════════════════════════════════════ */
  function renderDatabase(){
    var d=db();if(!d){showContent(errMsg('Bağlantı yok.'));return;}
    var html=
      '<div style="max-width:600px">'
      /* Liderlik tablosu sıfırlama */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px">'
      +'<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:8px">🏆 Liderlik Tablosu Sıfırlama</div>'
      +'<div style="font-size:12px;color:#555;margin-bottom:12px">Seçili dönemin tüm kullanıcı verilerini siler. Geri alınamaz!</div>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap">'
      +'<button class="ap-db-reset" data-p="daily"   style="padding:8px 16px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:8px;color:#ff8888;font-size:12px;cursor:pointer">🗑️ Günlük Sıfırla</button>'
      +'<button class="ap-db-reset" data-p="weekly"  style="padding:8px 16px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:8px;color:#ff8888;font-size:12px;cursor:pointer">🗑️ Haftalık Sıfırla</button>'
      +'<button class="ap-db-reset" data-p="monthly" style="padding:8px 16px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:8px;color:#ff8888;font-size:12px;cursor:pointer">🗑️ Aylık Sıfırla</button>'
      +'</div>'
      +'<div id="ap-db-reset-msg" style="font-size:11px;margin-top:8px;color:#4ade80;min-height:16px"></div>'
      +'</div>'
      /* Eski maçları temizle */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:14px">'
      +'<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:8px">⚔️ Eski Rival Maçlarını Temizle</div>'
      +'<div style="font-size:12px;color:#555;margin-bottom:12px">Tamamlanmış veya eski maçları siler.</div>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap">'
      +'<button id="ap-db-clean-done" style="padding:8px 16px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.3);border-radius:8px;color:#ff8888;font-size:12px;cursor:pointer">🗑️ Tamamlananları Temizle</button>'
      +'<button id="ap-db-clean-7d" style="padding:8px 16px;background:rgba(255,153,0,0.1);border:1px solid rgba(255,153,0,0.3);border-radius:8px;color:#ff9900;font-size:12px;cursor:pointer">🗑️ 7 Günden Eskiyi Sil</button>'
      +'</div>'
      +'<div id="ap-db-clean-msg" style="font-size:11px;margin-top:8px;color:#4ade80;min-height:16px"></div>'
      +'</div>'
      /* Güvenlik olaylarını temizle */
      +'<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px">'
      +'<div style="font-size:12px;font-weight:700;color:#fff;margin-bottom:8px">🛡️ Eski Güvenlik Olaylarını Temizle</div>'
      +'<div style="font-size:12px;color:#555;margin-bottom:12px">30 günden eski güvenlik olayları silinir.</div>'
      +'<button id="ap-db-clean-sec" style="padding:8px 16px;background:rgba(255,153,0,0.1);border:1px solid rgba(255,153,0,0.3);border-radius:8px;color:#ff9900;font-size:12px;cursor:pointer">🗑️ 30 Günden Eskiyi Sil</button>'
      +'<div id="ap-db-sec-msg" style="font-size:11px;margin-top:8px;color:#4ade80;min-height:16px"></div>'
      +'</div>'
      +'</div>';

    showContent(html);

    document.querySelectorAll('.ap-db-reset').forEach(function(btn2){
      btn2.onclick=function(){
        var period=btn2.dataset.p;
        if(!confirm(period+' liderlik tablosu SİFIRLANACAK. Geri alınamaz! Emin misiniz?')) return;
        var msg2=document.getElementById('ap-db-reset-msg');
        btn2.disabled=true; btn2.textContent='Siliniyor…';
        dbDeleteCollection(d,'leaderboards/'+lbPeriodDoc(period)+'/users',function(cnt,err){
          btn2.disabled=false; btn2.textContent='🗑️ '+period+' Sıfırla';
          if(msg2) msg2.textContent=err?'❌ Hata: '+err:'✅ '+cnt+' kullanıcı silindi.';
        });
      };
    });

    document.getElementById('ap-db-clean-done').onclick=function(){
      var msg2=document.getElementById('ap-db-clean-msg');
      if(!confirm('Tamamlanmış rival maçları silinecek. Emin misiniz?')) return;
      var self=this; self.disabled=true; self.textContent='Siliniyor…';
      d.collection('rival_matches').limit(200).get().then(function(snap){
        var toDelete=[];
        snap.forEach(function(doc){var m=doc.data();if(m.hostDone&&m.guestDone)toDelete.push(doc.ref);});
        if(!toDelete.length){self.disabled=false;self.textContent='🗑️ Tamamlananları Temizle';if(msg2)msg2.textContent='Silinecek maç yok.';return;}
        var batch=d.batch();
        toDelete.forEach(function(ref){batch.delete(ref);});
        return batch.commit().then(function(){self.disabled=false;self.textContent='🗑️ Tamamlananları Temizle';if(msg2)msg2.textContent='✅ '+toDelete.length+' maç silindi.';});
      }).catch(function(e){self.disabled=false;self.textContent='🗑️ Tamamlananları Temizle';if(msg2)msg2.textContent='❌ Hata: '+(e&&e.message||String(e));});
    };

    document.getElementById('ap-db-clean-7d').onclick=function(){
      var msg2=document.getElementById('ap-db-clean-msg');
      if(!confirm('7 günden eski tüm rival maçları silinecek. Emin misiniz?')) return;
      var self=this; self.disabled=true; self.textContent='Siliniyor…';
      /* rival_matches createdAt alanı varsa kullan, yoksa tüm done olanları sil */
      var cutoff=new Date(Date.now()-7*86400000);
      d.collection('rival_matches').limit(200).get().then(function(snap){
        var toDelete=[];
        snap.forEach(function(doc){
          var m=doc.data();
          var created=m.createdAt&&m.createdAt.toMillis?m.createdAt.toMillis():null;
          if(created&&created<cutoff.getTime()) toDelete.push(doc.ref);
          else if(!created&&m.hostDone&&m.guestDone) toDelete.push(doc.ref);
        });
        if(!toDelete.length){self.disabled=false;self.textContent='🗑️ 7 Günden Eskiyi Sil';if(msg2)msg2.textContent='Silinecek maç yok.';return;}
        var batch=d.batch();
        toDelete.forEach(function(ref){batch.delete(ref);});
        return batch.commit().then(function(){self.disabled=false;self.textContent='🗑️ 7 Günden Eskiyi Sil';if(msg2)msg2.textContent='✅ '+toDelete.length+' maç silindi.';});
      }).catch(function(e){self.disabled=false;self.textContent='🗑️ 7 Günden Eskiyi Sil';if(msg2)msg2.textContent='❌ Hata: '+(e&&e.message||String(e));});
    };

    document.getElementById('ap-db-clean-sec').onclick=function(){
      var msg2=document.getElementById('ap-db-sec-msg');
      if(!confirm('30 günden eski güvenlik olayları silinecek. Emin misiniz?')) return;
      var self=this; self.disabled=true; self.textContent='Siliniyor…';
      var cutoff=new Date(Date.now()-30*86400000);
      d.collection('security_events').where('ts','<',cutoff).limit(500).get()
        .then(function(snap){
          if(!snap.size){self.disabled=false;self.textContent='🗑️ 30 Günden Eskiyi Sil';if(msg2)msg2.textContent='Silinecek olay yok.';return;}
          var batch=d.batch();
          snap.forEach(function(doc){batch.delete(doc.ref);});
          return batch.commit().then(function(){self.disabled=false;self.textContent='🗑️ 30 Günden Eskiyi Sil';if(msg2)msg2.textContent='✅ '+snap.size+' olay silindi.';});
        }).catch(function(e){self.disabled=false;self.textContent='🗑️ 30 Günden Eskiyi Sil';if(msg2)msg2.textContent='❌ Hata: '+(e&&e.message||String(e));});
    };
  }

  function dbDeleteCollection(d, path, cb){
    var parts=path.split('/');
    /* leaderboards/weekly_2026-W13/users — 3 segments */
    var colRef=(parts.length===3)?d.collection(parts[0]).doc(parts[1]).collection(parts[2]):d.collection(path);
    colRef.limit(100).get().then(function(snap){
      if(!snap.size){cb(0);return;}
      var batch=d.batch();
      snap.forEach(function(doc){batch.delete(doc.ref);});
      batch.commit().then(function(){
        if(snap.size<100){cb(snap.size);}
        else{dbDeleteCollection(d,path,function(cnt2,err2){cb(snap.size+(cnt2||0),err2);});}
      }).catch(function(e){cb(0,e&&e.message||String(e));});
    }).catch(function(e){cb(0,e&&e.message||String(e));});
  }

  /* ═══════════════════════════════════════════════════════════
     GENEL AÇMA / FAB
  ═══════════════════════════════════════════════════════════ */
  function open(tab){
    if(!document.getElementById('ap-modal')) buildPanel();
    var modal=document.getElementById('ap-modal');
    if(!modal) return;
    modal.style.display='block';
    switchTab(tab||'dashboard');
  }

  function addFAB(){
    if(document.getElementById('ap-fab')) return;
    var b=document.createElement('button');
    b.id='ap-fab'; b.title='Admin Paneli'; b.innerHTML='⚙️';
    b.style.cssText='position:fixed;bottom:80px;right:16px;z-index:9999;width:44px;height:44px;border-radius:50%;background:rgba(124,58,237,0.85);border:none;font-size:1.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.5);backdrop-filter:blur(4px)';
    b.onclick=function(){open('dashboard');};
    document.body.appendChild(b);
  }

  /* ═══════════════════════════════════════════════════════════
     PUBLIC API
  ═══════════════════════════════════════════════════════════ */
  window.AdminPanel={
    open:          open,
    close:         closePanel,
    _uDetail:      openUserDetail,
    _secDetail:    openSecDetail,
    _flag:         toggleFlag,
    _reloadRival:  renderRival,
    _delQueue:     deleteQueueEntry
  };

  window.openSecurityPanel=function(){open('security');};

  /* ═══════════════════════════════════════════════════════════
     BAŞLAT
  ═══════════════════════════════════════════════════════════ */
  var _ready=false;
  var _initCheck=setInterval(function(){
    if(_ready) return;
    if(!window.authManager) return;
    if(window.authManager.isLoggedIn){
      _ready=true; clearInterval(_initCheck);
      if(isAdmin()){ buildPanel(); addFAB(); }
    }
  },1500);

})();
