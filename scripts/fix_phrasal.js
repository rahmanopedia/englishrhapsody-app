const fs = require('fs');
const path = require('path');

function fixLevels(filePath, fixes) {
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  for (const [phrase, from, to] of fixes) {
    // Match the line with this phrase key and its level field
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      "('".concat(escaped, "'\\s*:\\s*\\{[^}]*?level\\s*:\\s*')").concat(from, "(')")
    );
    const before = content;
    content = content.replace(regex, `$1${to}$2`);
    if (content !== before) {
      console.log(`${phrase}: ${from} -> ${to}`);
      fixed++;
    } else {
      console.warn(`  MISS: ${phrase} (${from} -> ${to})`);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`\nFixed ${fixed} entries in ${path.basename(filePath)}`);
  return fixed;
}

// ── phrasal_verbs_ext.js ──────────────────────────────────────────────────────
const extFixes = [
  // C2 → B2
  ['trickle down',   'C2', 'B2'],
  // C1 → B2
  ['allow for',      'C1', 'B2'],
  ['account for',    'C1', 'B2'],
  ['crack down on',  'C1', 'B2'],
  ['narrow down',    'C1', 'B2'],
  ['opt out',        'C1', 'B2'],
  ['phase out',      'C1', 'B2'],
  ['rule out',       'C1', 'B2'],
  ['flag up',        'C1', 'B2'],
  ['stand up for',   'C1', 'B2'],
  ['do away with',   'C1', 'B2'],
];

// ── phrasal_verbs_ext2.js ─────────────────────────────────────────────────────
const ext2Fixes = [
  // C1 → B2
  ['abide by',       'C1', 'B2'],
  ['bail on',        'C1', 'B2'],
  ['bog down',       'C1', 'B2'],
  ['lie low',        'C1', 'B2'],
  ['narrow down',    'C1', 'B2'],
  ['reason with',    'C1', 'B2'],
  ['walk out on',    'C1', 'B2'],
  ['stick up for',   'C1', 'B2'],
  ['ease off',       'C1', 'B2'],
  ['ease up',        'C1', 'B2'],
];

const extPath  = path.join(__dirname, '../js/phrasal_verbs_ext.js');
const ext2Path = path.join(__dirname, '../js/phrasal_verbs_ext2.js');

fixLevels(extPath,  extFixes);
console.log('');
fixLevels(ext2Path, ext2Fixes);

// Final level counts
for (const [label, fp] of [['ext', extPath], ['ext2', ext2Path]]) {
  const PHRASE_DICT = {};
  eval(fs.readFileSync(fp, 'utf8'));
  const counts = {};
  for (const v of Object.values(PHRASE_DICT)) counts[v.level] = (counts[v.level]||0)+1;
  console.log(`\n${label} levels:`, JSON.stringify(counts));
}
