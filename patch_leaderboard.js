const fs = require('fs');
let content = fs.readFileSync('C:/Users/ruhme/english-rhapsody-push/js/leaderboard.js', 'utf-8');

// 3a. Update period label to include liga
const oldDLabel = String.raw`d={daily:"bug\xFCn",weekly:"bu hafta",monthly:"bu ay"}[s]`;
const newDLabel = String.raw`d={daily:"bug\xFCn",weekly:"bu hafta",monthly:"bu ay",liga:"bu hafta"}[s]`;
if (!content.includes(oldDLabel)) { console.error('oldDLabel not found'); process.exit(1); }
content = content.replace(oldDLabel, newDLabel);
console.log('3a. period label updated');

// 3b. Change signature - variable after uid,  is 'd'
const oldSig = '_renderList(e,s){var u;const t=document.getElementById("lb-list");if(!t)return;const i=(u=window.authManager)==null?void 0:u.uid,';
const newSig = '_renderList(e,s,cefrFilter){var u;const t=document.getElementById("lb-list");if(!t)return;const i=(u=window.authManager)==null?void 0:u.uid;const list=cefrFilter?e.filter(function(r){return r.cefrLevel===cefrFilter;}):e;var ';
if (!content.includes(oldSig)) { console.error('oldSig not found'); process.exit(1); }
content = content.replace(oldSig, newSig);
console.log('3b. signature updated');

// 3c. Replace empty check using e.length -> list.length
// Check exact string in file
const testEmpty = String.raw`if(!e.length){t.innerHTML=`;
if (!content.includes(testEmpty)) { console.error('testEmpty not found'); process.exit(1); }
console.log('testEmpty found, good');

const oldEmpty = String.raw`if(!e.length){t.innerHTML='<div class="lb-empty">Hen`;
const idx = content.indexOf(oldEmpty);
if (idx < 0) { console.error('oldEmpty not found'); process.exit(1); }
// Find the end: ...return}t.innerHTML=e.map
const endMarker = 'return}t.innerHTML=e.map(';
const endIdx = content.indexOf(endMarker, idx);
if (endIdx < 0) { console.error('endMarker not found'); process.exit(1); }
const oldBlock = content.substring(idx, endIdx + endMarker.length);
console.log('oldBlock:', oldBlock.substring(0, 100));

const newBlock = 'if(!list.length){var oldLh2=document.getElementById("lb-liga-hd");if(oldLh2)oldLh2.remove();' +
  String.raw`t.innerHTML=s==="liga"?'<div class="lb-empty">Bu ligde hen\xFCz kimse yok \uD83C\uDF96\uFE0F</div>':'<div class="lb-empty">Hen\xFCz kimse yok \u2014 ilk sen ol! \uD83D\uDE80</div>';` +
  'const r=document.getElementById("lb-my-rank");r&&(r.style.display="none");return}' +
  'if(s==="liga"&&cefrFilter){var prevLh=document.getElementById("lb-liga-hd");if(prevLh)prevLh.remove();' +
  'var lh=document.createElement("div");lh.id="lb-liga-hd";' +
  'lh.style.cssText="margin:0 0 10px;padding:8px 14px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.3);border-radius:10px;font-size:0.8rem;color:#a78bfa;font-weight:700;text-align:center;";' +
  'lh.textContent=cefrFilter+' + String.raw`" Ligi \u2014 Ayn\u0131 seviyedeki rakiplerin";` +
  't.parentNode&&t.parentNode.insertBefore(lh,t);}' +
  't.innerHTML=list.map(';

content = content.substring(0, idx) + newBlock + content.substring(endIdx + endMarker.length);
console.log('3c. empty check updated');

// 3d. Add CEFR badge to user name row
const oldName = String.raw`<div class="lb-name">${this._esc(r.name)}</div>`;
const newName = String.raw`<div class="lb-name">${this._esc(r.name)}${r.cefrLevel?' <span class="lb-cefr-badge">'+r.cefrLevel+'</span>':''}</div>`;
if (!content.includes(oldName)) { console.error('oldName not found'); process.exit(1); }
content = content.replace(oldName, newName);
console.log('3d. CEFR badge in name added');

// 3e. Fix findIndex to use list
const oldFindIdx = 'const l=e.findIndex(r=>r.uid===i)';
const newFindIdx = 'const l=list.findIndex(r=>r.uid===i)';
if (!content.includes(oldFindIdx)) { console.error('oldFindIdx not found'); process.exit(1); }
content = content.replace(oldFindIdx, newFindIdx);
console.log('3e. findIndex updated');

fs.writeFileSync('C:/Users/ruhme/english-rhapsody-push/js/leaderboard.js', content);
console.log('All saved!');
