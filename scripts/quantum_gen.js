#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
//  QUANTUM GEN — Claude API ile Türkçe çekim üretici + iyileştirici
//
//  Kullanım:
//    Yeni senaryo ekle:
//      node scripts/quantum_gen.js new "🏀" "The basketball player" "throw,threw,thrown,throwing" "the ball" sg
//
//    Tek senaryo iyileştir:
//      node scripts/quantum_gen.js improve s1
//
//    Tüm senaryoları iyileştir:
//      node scripts/quantum_gen.js improve-all
//
//  .env dosyasına ekle: ANTHROPIC_API_KEY=sk-ant-...
// ═══════════════════════════════════════════════════════════════════

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const QUANTUM_FILE = path.join(__dirname, '..', 'js', 'quantum.js');
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Prompt ─────────────────────────────────────────────────────────
const SYSTEM = `Sen mükemmel bir Türkçe dil bilgisi uzmanısın. İngilizce fiil/özne/nesne bilgisi verildiğinde Türkçe çekim formlarını üretirsin.

Kurallar:
- Sesli harf uyumuna (büyük/küçük ünlü uyumu) kesinlikle uy
- Fiil çekimleri: geniş zaman, şimdiki zaman, geçmiş zaman, geniş geçmiş (miş'li geçmiş), gelecek zaman
- Edilgen (pasif) çatı için doğru edilgen ekleri kullan (-il, -in, -en, -l vs.)
- Olumsuzlar için doğru olumsuzluk eki (-me/-ma, -mı/-mi/-mu/-mü)
- Nesne belirtme hali (accusative): doğru -i/-ı/-u/-ü/-yi/-yı/-yu/-yü eki
- 3. tekil şahıs kullan (o)
- Sadece JSON döndür, başka hiçbir açıklama yazma`;

function buildPrompt(subjEn, verbForms, objEn, existingTrData = null) {
  const [v1, v2, v3, ving] = verbForms.split(',').map(s => s.trim());
  const improveNote = existingTrData
    ? `\n\nMevcut çeviriler (doğrula ve gerekirse düzelt):\n${JSON.stringify(existingTrData, null, 2)}`
    : '';

  return `İngilizce senaryo:
- Özne: "${subjEn}"
- Fiil: v1="${v1}", geçmiş="${v2}", 3.hal="${v3}", -ing="${ving}"
- Nesne: "${objEn}"${improveNote}

Şu JSON formatını üret (başka hiçbir şey yazma):
{
  "act": {
    "subj": "Türkçe özne (yalın hal, ör: Öğrenci)",
    "obj": "Türkçe nesne belirtme hali (ör: elmayı, kitabı)",
    "pres": ["3.tekil geniş zaman olumlu", "olumsuz"],
    "prg": ["şimdiki zaman olumlu", "olumsuz"],
    "past": ["belirli geçmiş olumlu (-di)", "olumsuz"],
    "ppas": ["belirsiz geçmiş olumlu (-miş)", "olumsuz"],
    "fut": ["gelecek zaman olumlu (-ecek)", "olumsuz"]
  },
  "pass": {
    "subj": "Türkçe pasif özne (ör: Elma, Kitap)",
    "agent": "özne tarafından (ör: öğrenci tarafından)",
    "pres": ["edilgen geniş olumlu", "olumsuz"],
    "prg": ["edilgen şimdiki olumlu", "olumsuz"],
    "past": ["edilgen geçmiş olumlu", "olumsuz"],
    "ppas": ["edilgen belirsiz geçmiş olumlu", "olumsuz"],
    "fut": ["edilgen gelecek olumlu", "olumsuz"]
  }
}

Örnek (verb=eat, subj=The student, obj=the apple):
{"act":{"subj":"Öğrenci","obj":"elmayı","pres":["yer","yemez"],"prg":["yiyor","yemiyor"],"past":["yedi","yemedi"],"ppas":["yemişti","yememişti"],"fut":["yiyecek","yemeyecek"]},"pass":{"subj":"Elma","agent":"öğrenci tarafından","pres":["yenilir","yenilmez"],"prg":["yeniliyor","yenilmiyor"],"past":["yenildi","yenilmedi"],"ppas":["yenilmişti","yenilmemişti"],"fut":["yenilecek","yenilmeyecek"]}}`;
}

// ── Claude API çağrısı ──────────────────────────────────────────────
async function generateTrData(subjEn, verbForms, objEn, existingTrData = null) {
  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 800,
    system: SYSTEM,
    messages: [{ role: 'user', content: buildPrompt(subjEn, verbForms, objEn, existingTrData) }],
  });
  const text = msg.content[0].text.trim();
  // JSON bloğunu çıkar
  const match = text.match(/\{[\s\S]+\}/);
  if (!match) throw new Error('JSON bulunamadı:\n' + text);
  return JSON.parse(match[0]);
}

// ── quantum.js parse ────────────────────────────────────────────────
function readQuantumFile() {
  return fs.readFileSync(QUANTUM_FILE, 'utf8');
}

function writeQuantumFile(content) {
  fs.writeFileSync(QUANTUM_FILE, content, 'utf8');
}

function parseScenarios(content) {
  // id, subj, verb, obj ve trData'yı regex ile çıkar
  const scenarios = [];
  const re = /\{\s*id:'(s\d+)'[\s\S]*?(?=\},?\s*\{|\];)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    scenarios.push({ id: m[1], raw: m[0] });
  }
  return scenarios;
}

function extractScenarioFields(raw) {
  const id    = (raw.match(/id:'(s\d+)'/) || [])[1];
  const icon  = (raw.match(/icon:'([^']+)'/) || [])[1];
  const subjW = (raw.match(/subj:\{w:'([^']+)'/) || [])[1];
  const verbM = raw.match(/verb:\{v1:'([^']+)',\s*v2:'([^']+)',\s*v3:'([^']+)',\s*ving:'([^']+)'\}/);
  const objW  = (raw.match(/obj:\{w:'([^']+)'/) || [])[1];
  const subjType = (raw.match(/type:'([^']+)'/) || [])[1];
  const objForm  = (raw.match(/obj_form:'([^']+)'/) || [])[1];

  if (!id || !subjW || !verbM || !objW) return null;
  return {
    id, icon,
    subjEn: subjW,
    verbForms: `${verbM[1]},${verbM[2]},${verbM[3]},${verbM[4]}`,
    objEn: objW,
    subjType: subjType || 'sg',
    objForm: objForm || subjW.toLowerCase(),
  };
}

function buildScenarioLine(fields, trData) {
  const { id, icon, subjEn, verbForms, objEn, subjType, objForm } = fields;
  const [v1, v2, v3, ving] = verbForms.split(',');
  const a = trData.act;
  const p = trData.pass;

  return `  {
    id:'${id}', icon:'${icon}',
    subj:{w:'${subjEn}', type:'${subjType}', obj_form:'${objForm}'},
    verb:{v1:'${v1}', v2:'${v2}', v3:'${v3}', ving:'${ving}'},
    obj:{w:'${objEn}', type:'sg'},
    trData:{
      act:{ subj:'${a.subj}', obj:'${a.obj}', pres:['${a.pres[0]}','${a.pres[1]}'], prg:['${a.prg[0]}','${a.prg[1]}'], past:['${a.past[0]}','${a.past[1]}'], ppas:['${a.ppas[0]}','${a.ppas[1]}'], fut:['${a.fut[0]}','${a.fut[1]}'] },
      pass:{ subj:'${p.subj}', agent:'${p.agent}', pres:['${p.pres[0]}','${p.pres[1]}'], prg:['${p.prg[0]}','${p.prg[1]}'], past:['${p.past[0]}','${p.past[1]}'], ppas:['${p.ppas[0]}','${p.ppas[1]}'], fut:['${p.fut[0]}','${p.fut[1]}'] }
    }
  }`;
}

// ── Komutlar ────────────────────────────────────────────────────────

// YENİ senaryo ekle
async function cmdNew(icon, subjEn, verbForms, objEn, subjType = 'sg') {
  console.log(`Üretiliyor: "${subjEn}" / "${verbForms}" / "${objEn}" ...`);
  const trData = await generateTrData(subjEn, verbForms, objEn);
  console.log('Üretilen trData:', JSON.stringify(trData, null, 2));

  const content = readQuantumFile();
  // Son senaryo ID'sini bul
  const ids = [...content.matchAll(/id:'s(\d+)'/g)].map(m => parseInt(m[1]));
  const nextId = 's' + (Math.max(...ids) + 1);

  const fields = {
    id: nextId, icon,
    subjEn, verbForms, objEn,
    subjType,
    objForm: subjEn.toLowerCase(),
  };
  const newLine = buildScenarioLine(fields, trData);

  // Son senaryodan önce ]; bulup oraya ekle
  const updated = content.replace(/\n\];\s*$/, `,\n${newLine}\n];`);
  writeQuantumFile(updated);
  console.log(`✅ ${nextId} eklendi → quantum.js güncellendi.`);
}

// TEK senaryo iyileştir
async function cmdImprove(targetId) {
  const content = readQuantumFile();
  // Hedef senaryoyu bul
  const re = new RegExp(`(  \\{\\s*id:'${targetId}'[\\s\\S]*?\\}\\s*\\})`, 'g');
  const match = re.exec(content);
  if (!match) { console.error(`ID bulunamadı: ${targetId}`); process.exit(1); }

  const raw = match[1];
  const fields = extractScenarioFields(raw);
  if (!fields) { console.error('Alan çıkarılamadı.'); process.exit(1); }

  // Mevcut trData'yı çıkar
  const trMatch = raw.match(/trData:\s*\{([\s\S]+)\}\s*\}/);
  let existingTrData = null;
  try {
    // Kabaca parse
    const trRaw = '{' + trMatch[1] + '}';
    existingTrData = eval('(' + trRaw + ')'); // nosec: controlled input
  } catch (e) { /* mevcut parse edilemedi, yeniden üret */ }

  console.log(`İyileştiriliyor: ${targetId} — "${fields.subjEn}" / "${fields.verbForms}" / "${fields.objEn}"`);
  const trData = await generateTrData(fields.subjEn, fields.verbForms, fields.objEn, existingTrData);
  console.log('Yeni trData:', JSON.stringify(trData, null, 2));

  const newBlock = buildScenarioLine(fields, trData);
  const updated = content.replace(match[0], newBlock);
  writeQuantumFile(updated);
  console.log(`✅ ${targetId} güncellendi.`);
}

// TÜM senaryoları iyileştir (batch, 2sn aralıkla)
async function cmdImproveAll() {
  const content = readQuantumFile();
  const re = /id:'(s\d+)'/g;
  const ids = [];
  let m;
  while ((m = re.exec(content)) !== null) ids.push(m[1]);

  console.log(`Toplam ${ids.length} senaryo iyileştirilecek...`);
  let done = 0;
  for (const id of ids) {
    try {
      await cmdImprove(id);
      done++;
      console.log(`[${done}/${ids.length}] ${id} ✅`);
      await new Promise(r => setTimeout(r, 2000)); // rate limit
    } catch (e) {
      console.error(`[${id}] HATA:`, e.message);
    }
  }
  console.log(`\nTamamlandı: ${done}/${ids.length} senaryo iyileştirildi.`);
}

// ── CLI ─────────────────────────────────────────────────────────────
const [,, cmd, ...args] = process.argv;

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('HATA: ANTHROPIC_API_KEY bulunamadı. .env dosyasına ekle.');
  process.exit(1);
}

(async () => {
  if (cmd === 'new') {
    const [icon, subjEn, verbForms, objEn, subjType] = args;
    if (!icon || !subjEn || !verbForms || !objEn) {
      console.error('Kullanım: node scripts/quantum_gen.js new <icon> <subjEn> <v1,v2,v3,ving> <objEn> [subjType]');
      process.exit(1);
    }
    await cmdNew(icon, subjEn, verbForms, objEn, subjType);
  } else if (cmd === 'improve') {
    if (!args[0]) { console.error('Kullanım: node scripts/quantum_gen.js improve <id>'); process.exit(1); }
    await cmdImprove(args[0]);
  } else if (cmd === 'improve-all') {
    await cmdImproveAll();
  } else {
    console.log(`Quantum Gen — Kullanım:
  Yeni senaryo:   node scripts/quantum_gen.js new "🏀" "The player" "throw,threw,thrown,throwing" "the ball"
  Tek iyileştir:  node scripts/quantum_gen.js improve s1
  Tümünü iyileştir: node scripts/quantum_gen.js improve-all`);
  }
})();
