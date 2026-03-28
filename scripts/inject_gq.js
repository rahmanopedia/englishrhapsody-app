const fs = require('fs');

const extra = JSON.parse(fs.readFileSync(__dirname + '/gq_extra.json', 'utf8'));
let code = fs.readFileSync(__dirname + '/../js/quantum.js', 'utf8');

function findArrayEnd(code) {
  const idx = code.indexOf('GRAMMAR_QUEST_Q=');
  const arrStart = idx + 'GRAMMAR_QUEST_Q='.length;
  let depth = 0;
  for (let i = arrStart; i < code.length; i++) {
    if (code[i] === '[') depth++;
    else if (code[i] === ']') { depth--; if (depth === 0) return i; }
  }
}

const end = findArrayEnd(code);
console.log('Inserting', extra.length, 'questions at index', end);

// Serialize each question the same way as existing data (no spaces, double quotes)
function serialize(q) {
  const esc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const choices = q.c.map(c => `"${esc(c)}"`).join(',');
  return `{level:"${q.level}",topic:"${esc(q.topic)}",q:"${esc(q.q)}",c:[${choices}],a:${q.a},hint:"${esc(q.hint)}"}`;
}

const insertion = ',' + extra.map(serialize).join(',');
const newCode = code.slice(0, end) + insertion + code.slice(end);
fs.writeFileSync(__dirname + '/../js/quantum.js', newCode, 'utf8');

// Verify
const seg = newCode.slice(newCode.indexOf('GRAMMAR_QUEST_Q='), findArrayEnd(newCode));
['A1','A2','B1','B2','C1','C2'].forEach(l => {
  const count = (seg.match(new RegExp(`level:"${l}"`, 'g')) || []).length;
  console.log(`${l}: ${count} questions`);
});
console.log('Total:', ['A1','A2','B1','B2','C1','C2'].reduce((t, l) => t + (seg.match(new RegExp(`level:"${l}"`, 'g')) || []).length, 0));
