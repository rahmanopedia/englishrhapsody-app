const fs = require("fs");
const path = require("path");
const content = fs.readFileSync(path.join(__dirname, "../js/data.js"), "utf8");
const arrStr = content.match(/const WORDS\s*=\s*(\[\s\S]*\]);\s*$/)[1];
const WORDS = eval("(" + arrStr + ")");

const toB1 = new Set([
  "jog","best","half","huge","entire","truly","himself","otherwise",
  "round","scroll","mile","wooden","center","longer",
  "involve","recently","remind","suggest","thick","flash","link",
  "mention","twice","usual","depend","blow","cell","client",
  "delay","document","drove","greet","hid","latest","least",
  "airline","beings","closer","evenings","relied","wore","sore",
  "press","tag","site","senior","poll","notion","mutual",
  "worn","nurture","locally","liberty","increasingly","homemade",
  "heavily","enrol","encounter","element","rapid","assess",
  "chemical","contrast","consult","instruction",
  "had to","not only","even though","in spite of","of course",
  "in case","rather than","would not","is not","has not","no longer",
  "looked around","looked out","look down","walked around","walked out",
  "ran away","went under","went back","came inside","came up",
  "sat next to","stood next to","climbed in","fell under","fell in",
  "hide inside",
  "look into","look through","take on","come up with","go off","go away",
  "make up for","break in","carry out","hold back","figure out",
  "cut down on","pass on","lead to","results in","believe in",
  "moving toward","linked to","separating from","interested in","responsible for",
  "human rights","foreign policy","social class","natural disaster",
  "greenhouse gas","endangered species","birth rate","job opportunity",
  "immune system","junk food","problem solving","role model",
  "distance learning","daily life","rush hour","team spirit",
  "world record","generation gap"
]);

const toB2 = new Set([
  "beat around the bush","in the nick of time","the tip of the iceberg",
  "look on the bright side","cost an arm and a leg",
  "bite off more than you can chew","let the cat out of the bag",
  "put up with","fend off","flesh out","gloss over","hammer out",
  "hold out for","loom over","pass off as","sweep under the rug","tide over",
  "cognitive","acquire","automate","critic","literature","portable",
  "predictor","prioritise","proponent","stoic","stringent","susceptible",
  "wakefulness","feeble","depression","cliff","laissez faire",
  "repository","container","scalability","latency","decryption","hashing",
  "proxy","endpoint","staging","uptime","proprietary software",
  "wireframe","velocity","user story","acceptance criteria",
  "thread","asynchronous","backlog","sprint",
  "monetary policy","fiscal policy","liquidity","equity",
  "bull market","bear market","diversification","leverage",
  "hedge fund","insider trading","foreclosure","insolvency",
  "cartel","protectionism","embargo","austerity","nationalization",
  "stimulus","bailout","microeconomics","macroeconomics",
  "opportunity cost","comparative advantage","equilibrium","utility",
  "marginal","public good","free rider","behavioral economics",
  "human capital","social capital","offshoring","sovereign debt",
  "debt restructuring","maturity","volatility","hedging",
  "futures","options","swap","underwriting","blue chip",
  "mixed economy","command economy","foreign direct investment",
  "remittance","microfinance","circular economy","shadow economy",
  "money laundering","tax haven","universal basic income",
  "surgeon","zoologist","data scientist","occupational therapist",
  "radiologist","subtitler","meteorologist","philosopher",
  "sociologist","anthropologist","archaeologist","paleontologist",
  "statistician","underwriter","notary","clerk of court",
  "prosecutor","diplomat","ambassador","consul",
  "archipelago","estuary","altimeter","topography","cartography",
  "equinox","solstice","sediment","tectonics","geyser",
  "tributary","confluence","geothermal","biofuel"
]);

const toRemove = new Set([
  "encryption 1","latency 1","saas 1","scalability 1","latency 2",
  "protectionism 1","liquidity 1","leverage 1","offshoring 1",
  "saas","api","ui","ux","devops","ssl/tls","rest api","git","github",
  "ppp","human development index",
  "single sign-on","multi factor authentication",
  "agile manifesto","burn down chart",
  "sapir-whorf","sahel",
  "how are you","waking up","monday","tuesday",
  "yogurt","bookshelf","monkey","squirrel","flatmate","react"
]);

let fixed = 0, removed = 0;
const cleanWords = [];

for (const w of WORDS) {
  if (w.level !== "C1") { cleanWords.push(w); continue; }
  const en = w.en.toLowerCase().trim();
  if (toRemove.has(en)) { console.log("REMOVE: " + w.en); removed++; continue; }
  let newLevel = null;
  if (toB1.has(en)) newLevel = "B1";
  else if (toB2.has(en)) newLevel = "B2";
  if (newLevel) { console.log(w.en + ": C1 -> " + newLevel); w.level = newLevel; fixed++; }
  cleanWords.push(w);
}

console.log("\nFixed: " + fixed + ", Removed: " + removed);
const levels = {};
for (const w of cleanWords) levels[w.level] = (levels[w.level]||0)+1;
console.log("Level counts:", JSON.stringify(levels));
fs.writeFileSync(path.join(__dirname, "../js/data.js"), "const WORDS = " + JSON.stringify(cleanWords, null, 2) + ";\n");
console.log("Written.");
