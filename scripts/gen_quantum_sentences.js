/**
 * Quantum Mode — Tüm cümle kombinasyonlarını CSV dosyalarına yazar.
 * Çıktı: Masaüstü/quantum_sentences/ klasörü + ZIP
 */
const fs   = require('fs');
const path = require('path');
const zlib = require('zlib');

// ── quantum.js'den gerekli kısımları çek ──────────────────────────
const qSrc = fs.readFileSync(
  path.join(__dirname, '../js/quantum.js'), 'utf8'
);

// QUANTUM_SCENARIOS dizisini ve yardımcı fonksiyonları al
// Tarayıcı ortamı gerektirmeyen saf JS
const sandboxCode = `
const window = {};
${qSrc}
module.exports = { QUANTUM_SCENARIOS, generateSentence, generateTurkishTranslation };
`;
const tmpFile = path.join(__dirname, '_q_tmp.js');
fs.writeFileSync(tmpFile, sandboxCode);
const { QUANTUM_SCENARIOS, generateSentence, generateTurkishTranslation } = require(tmpFile);
fs.unlinkSync(tmpFile);

// ── Kombinasyonlar ────────────────────────────────────────────────
const CLASSIC_TIMES = ['pres','past','fut'];
const CLASSIC_FLOWS = ['simp','cont','perf','perf_cont'];
const MODALS        = ['can','could','should','must','might','would','may'];
const POLS          = ['aff','neg','que'];
const WH_POLS       = ['wh_what','wh_when','wh_where','wh_who','wh_how'];
const VOICES        = ['act','pass'];

function partsToStr(parts) {
  return parts.map(p => p.w).join(' ').replace(/\s+([?.])$/, '$1');
}

function trStr(sc, time, flow, voice, pol) {
  try { return generateTurkishTranslation(sc, time, flow, voice, pol); }
  catch(e) { return '—'; }
}

function enStr(sc, time, flow, voice, pol) {
  try { return partsToStr(generateSentence(sc, time, flow, voice, pol)); }
  catch(e) { return '—'; }
}

// ── CSV yardımcısı ────────────────────────────────────────────────
function csvRow(id, icon, title, time, flow, voice, pol, en, tr) {
  const esc = s => '"' + String(s).replace(/"/g, '""') + '"';
  return [esc(id), esc(icon), esc(title), esc(time), esc(flow), esc(voice), esc(pol), esc(en), esc(tr)].join(',');
}
const CSV_HEADER = 'scenario_id,icon,title,time,flow,voice,pol,english,turkish\n';

// ── Dosyaları oluştur ─────────────────────────────────────────────
const outDir = 'C:/Users/ruhme/OneDrive/Masaüstü/quantum_sentences';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let totalRows = 0;

function writeCSV(filename, rows) {
  const content = CSV_HEADER + rows.join('\n');
  fs.writeFileSync(path.join(outDir, filename), content, 'utf8');
  totalRows += rows.length;
  console.log(`  ✓ ${filename}: ${rows.length} satır`);
}

// ── 1. Klasik zamanlar — Aktif ────────────────────────────────────
console.log('1. Klasik zamanlar (aktif)...');
{
  const rows = [];
  for (const sc of QUANTUM_SCENARIOS) {
    for (const time of CLASSIC_TIMES) {
      for (const flow of CLASSIC_FLOWS) {
        for (const pol of POLS) {
          const en = enStr(sc, time, flow, 'act', pol);
          const tr = trStr(sc, time, flow, 'act', pol);
          rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, time, flow, 'act', pol, en, tr));
        }
      }
    }
  }
  writeCSV('01_klasik_aktif.csv', rows);
}

// ── 2. Klasik zamanlar — Edilgen ──────────────────────────────────
console.log('2. Klasik zamanlar (edilgen)...');
{
  const rows = [];
  for (const sc of QUANTUM_SCENARIOS) {
    for (const time of CLASSIC_TIMES) {
      for (const flow of CLASSIC_FLOWS) {
        for (const pol of POLS) {
          const en = enStr(sc, time, flow, 'pass', pol);
          const tr = trStr(sc, time, flow, 'pass', pol);
          rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, time, flow, 'pass', pol, en, tr));
        }
      }
    }
  }
  writeCSV('02_klasik_edilgen.csv', rows);
}

// ── 3. Modal fiiller ──────────────────────────────────────────────
console.log('3. Modal fiiller...');
{
  const rows = [];
  for (const sc of QUANTUM_SCENARIOS) {
    for (const modal of MODALS) {
      for (const voice of VOICES) {
        for (const pol of POLS) {
          const en = enStr(sc, 'modal', modal, voice, pol);
          const tr = trStr(sc, 'modal', modal, voice, pol);
          rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, 'modal', modal, voice, pol, en, tr));
        }
      }
    }
  }
  writeCSV('03_modal_fiiller.csv', rows);
}

// ── 4. Going to + Used to ─────────────────────────────────────────
console.log('4. Going to + Used to...');
{
  const rows = [];
  for (const sc of QUANTUM_SCENARIOS) {
    for (const voice of VOICES) {
      for (const pol of POLS) {
        const en1 = enStr(sc, 'fut', 'going_to', voice, pol);
        const tr1 = trStr(sc, 'fut', 'going_to', voice, pol);
        rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, 'fut', 'going_to', voice, pol, en1, tr1));

        const en2 = enStr(sc, 'past', 'used_to', voice, pol);
        const tr2 = trStr(sc, 'past', 'used_to', voice, pol);
        rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, 'past', 'used_to', voice, pol, en2, tr2));
      }
    }
  }
  writeCSV('04_going_to_used_to.csv', rows);
}

// ── 5. WH-soruları ────────────────────────────────────────────────
console.log('5. WH-soruları...');
{
  const rows = [];
  for (const sc of QUANTUM_SCENARIOS) {
    for (const time of CLASSIC_TIMES) {
      for (const flow of ['simp','cont','perf']) {
        for (const whPol of WH_POLS) {
          const en = enStr(sc, time, flow, 'act', whPol);
          const tr = trStr(sc, time, flow, 'act', whPol);
          rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, time, flow, 'act', whPol, en, tr));
        }
      }
    }
  }
  writeCSV('05_wh_sorular.csv', rows);
}

// ── 6. Özet: Tüm grammar pattern örnekleri (1 senaryo) ───────────
console.log('6. Grammar pattern özeti (s1 senaryosu örnek)...');
{
  const sc = QUANTUM_SCENARIOS[0]; // s1: The programmer designs the code
  const rows = [];

  // Classic
  for (const time of CLASSIC_TIMES)
    for (const flow of CLASSIC_FLOWS)
      for (const voice of VOICES)
        for (const pol of POLS) {
          rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`,
            time, flow, voice, pol,
            enStr(sc,time,flow,voice,pol), trStr(sc,time,flow,voice,pol)));
        }
  // Modals
  for (const modal of MODALS)
    for (const voice of VOICES)
      for (const pol of POLS) {
        rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`,
          'modal', modal, voice, pol,
          enStr(sc,'modal',modal,voice,pol), trStr(sc,'modal',modal,voice,pol)));
      }
  // Going to / Used to
  for (const voice of VOICES)
    for (const pol of POLS) {
      rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, 'fut','going_to',voice,pol, enStr(sc,'fut','going_to',voice,pol), trStr(sc,'fut','going_to',voice,pol)));
      rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`, 'past','used_to',voice,pol, enStr(sc,'past','used_to',voice,pol), trStr(sc,'past','used_to',voice,pol)));
    }
  // WH
  for (const time of CLASSIC_TIMES)
    for (const flow of ['simp','cont','perf'])
      for (const wh of WH_POLS) {
        rows.push(csvRow(sc.id, sc.icon, `${sc.subj.w} ${sc.verb.v1} ${sc.obj.w}`,
          time, flow, 'act', wh, enStr(sc,time,flow,'act',wh), trStr(sc,time,flow,'act',wh)));
      }

  writeCSV('06_ornek_tum_pattern.csv', rows);
}

// ── Özet ──────────────────────────────────────────────────────────
console.log(`\nToplam: ${totalRows.toLocaleString()} satır`);
console.log(`Klasörde CSV dosyaları: ${outDir}`);
console.log('\nDosya listesi:');
fs.readdirSync(outDir).forEach(f => {
  const size = fs.statSync(path.join(outDir, f)).size;
  console.log(`  ${f}  (${(size/1024).toFixed(0)} KB)`);
});
