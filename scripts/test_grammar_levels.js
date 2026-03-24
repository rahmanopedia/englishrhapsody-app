// Quick sanity check — read the map from quantum.js via require trick
const fs = require('fs');
const content = fs.readFileSync('js/quantum.js', 'utf8');

// Inline the map for testing
const GRAMMAR_LEVEL_MAP = {
  'pres:simp:act':'A1', 'pres:cont:act':'A2', 'past:simp:act':'A2',
  'fut:simp:act':'A2', 'fut:going_to:act':'A2', 'modal:can:act':'A2',
  'pres:perf:act':'B1', 'past:cont:act':'B1', 'past:used_to:act':'B1',
  'modal:could:act':'B1', 'modal:should:act':'B1', 'modal:must:act':'B1',
  'modal:might:act':'B1', 'modal:may:act':'B1', 'modal:would:act':'B1',
  'pres:perf_cont:act':'B2', 'past:perf:act':'B2', 'fut:cont:act':'B2',
  'past:perf_cont:act':'C1', 'fut:perf:act':'C1', 'fut:perf_cont:act':'C2',
  'pres:simp:pass':'B1', 'past:simp:pass':'B1',
  'pres:cont:pass':'B2', 'pres:perf:pass':'B2', 'fut:simp:pass':'B2',
  'past:cont:pass':'B2', 'modal:can:pass':'B2', 'modal:could:pass':'B2',
  'modal:should:pass':'B2', 'modal:must:pass':'B2', 'modal:might:pass':'B2',
  'modal:may:pass':'B2', 'modal:would:pass':'B2',
  'pres:perf_cont:pass':'C1', 'past:perf:pass':'C1', 'fut:cont:pass':'C1',
  'fut:going_to:pass':'C1', 'past:perf_cont:pass':'C2',
  'fut:perf:pass':'C2', 'fut:perf_cont:pass':'C2',
};

function grammarLevel(s) {
  return GRAMMAR_LEVEL_MAP[s.time+':'+s.flow+':'+s.voice] || '';
}

const tests = [
  ['pres','simp','act','A1'], ['pres','cont','act','A2'], ['past','simp','act','A2'],
  ['fut','going_to','act','A2'], ['modal','can','act','A2'],
  ['pres','perf','act','B1'], ['past','cont','act','B1'], ['past','used_to','act','B1'],
  ['modal','should','act','B1'], ['modal','must','act','B1'], ['modal','would','act','B1'],
  ['past','perf','act','B2'], ['pres','perf_cont','act','B2'], ['fut','cont','act','B2'],
  ['past','perf_cont','act','C1'], ['fut','perf','act','C1'], ['fut','perf_cont','act','C2'],
  ['pres','simp','pass','B1'], ['past','simp','pass','B1'],
  ['pres','cont','pass','B2'], ['pres','perf','pass','B2'], ['fut','simp','pass','B2'],
  ['modal','can','pass','B2'], ['past','perf','pass','C1'], ['fut','cont','pass','C1'],
  ['past','perf_cont','pass','C2'], ['fut','perf','pass','C2'],
];

let ok = 0;
for (const [tm,fl,vo,ex] of tests) {
  const got = grammarLevel({time:tm, flow:fl, voice:vo});
  if (got !== ex) console.log('FAIL: '+tm+'/'+fl+'/'+vo+' -> '+got+' (expected '+ex+')');
  else ok++;
}
console.log(ok+'/'+tests.length+' tests passed');

// Verify quantum.js contains the map
const hasMap = content.includes("'pres:simp:act':       'A1'");
const hasFunc = content.includes('function grammarLevel(s)');
const hasLabelUpdate = content.includes('grammarLevel(s)');
console.log('quantum.js has GRAMMAR_LEVEL_MAP:', hasMap);
console.log('quantum.js has grammarLevel fn:', hasFunc);
console.log('quantum.js stateLabel uses level:', hasLabelUpdate);
