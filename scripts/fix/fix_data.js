#!/usr/bin/env node
// Fix data.js: 1) replace fragment sentences  2) remove duplicate WORDS entries

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'js', 'data.js');
const raw = fs.readFileSync(DATA_FILE, 'utf8');
eval(raw.replace('const WORDS', 'global.WORDS'));

// ── 1. Fragment düzeltme haritası ─────────────────────────────────────────
const FIXES = {
  morning:        "She greeted everyone with a warm good morning smile.",
  patience:       "Learning a new language requires patience and consistent effort.",
  jurisprudence:  "He studied jurisprudence at one of the country's leading universities.",
  impeccable:     "The diplomat always maintained impeccable manners in formal settings.",
  irreproachable: "Her irreproachable conduct earned her the respect of her peers.",
  unimpeachable:  "The witness provided unimpeachable evidence that cleared the defendant.",
  incontrovertible: "The scientists presented incontrovertible proof of climate change.",
  television:     "He spent the entire evening watching television instead of studying.",
  birthday:       "They threw her a surprise birthday party she would never forget.",
  celebrate:      "The whole town gathered to celebrate the team's championship victory.",
  electricity:    "The government urged citizens to save electricity during the heatwave.",
  stereotype:     "She challenged the stereotype that women were bad at mathematics.",
  accountability: "The public demands accountability from elected officials at all levels.",
  solidarity:     "The workers showed solidarity by striking together for better wages.",
  marginalization:"The report highlighted the marginalization of minority communities in cities.",
  prejudice:      "Education is the best tool to overcome prejudice and ignorance.",
  extinction:     "Conservationists are working hard to prevent the extinction of the snow leopard.",
  transcendence:  "Meditation can lead practitioners to a profound sense of spiritual transcendence.",
  garner:         "The politician worked tirelessly to garner support for his campaign.",
  adventitious:   "The plant's adventitious roots helped it cling to the rocky surface.",
  aleatory:       "The composer experimented with aleatory techniques, leaving some notes to chance.",
  ancillary:      "The hospital provides ancillary services such as physiotherapy and nutrition counseling.",
  approbation:    "She worked tirelessly to seek approbation from her demanding mentor.",
  arcane:         "The professor's lecture was filled with arcane knowledge few could follow.",
  badinage:       "Their lighthearted badinage kept the atmosphere relaxed during the long meeting.",
  simultaneous:   "The conference required simultaneous translation into five different languages.",
  quarterly:      "The company's quarterly earnings exceeded analyst expectations this year.",
  byzantine:      "The new employee struggled with the company's byzantine bureaucracy.",
  chicanery:      "The lawyer was accused of using legal chicanery to win the case.",
  colloquial:     "He preferred to use colloquial language rather than formal expressions.",
  compunction:    "She fired the employee without compunction despite his long years of service.",
  terrain:        "The soldiers struggled to cross the difficult terrain in heavy rain.",
  elaborate:      "Could you please elaborate on your earlier point about the budget?",
  inherent:       "There are inherent risks in every new business venture one undertakes.",
  preliminary:    "The preliminary results of the clinical study look very promising.",
  subsequent:     "The subsequent analysis confirmed what the initial report had suggested.",
  superposition:  "Quantum superposition allows a particle to exist in multiple states simultaneously.",
  procrastination:"He failed the exam because he could not overcome his procrastination.",
  vulnerability:  "The therapist encouraged her to show vulnerability and express her feelings openly.",
  dilatory:       "The lawyer used dilatory tactics to delay the trial by several months.",
  disparate:      "The study brought together disparate groups to find areas of common ground.",
  right:          "Turn right at the traffic lights to reach the museum.",
  left:           "Turn left after the bridge and you will find the hotel.",
  up:             "Look up at the sky tonight to see the Northern Lights.",
  down:           "Sit down and rest your feet after the long uphill walk.",
  here:           "Come here and help me move this heavy table to the corner.",
  there:          "Go there early if you want to get a good seat.",
  inside:         "Come inside before the rain gets any heavier tonight.",
  outside:        "The children wanted to play outside despite the cold weather.",
  fiduciary:      "As a trustee, he had a fiduciary responsibility to protect all assets.",
  execrable:      "The critic described the performance as having execrable taste throughout.",
  exegesis:       "The scholar published a detailed biblical exegesis of the Book of Job.",
  exiguous:       "The charity struggled to help all those in need with its exiguous resources.",
  foment:         "The speech was designed to foment discord among rival political groups.",
  forbearance:    "The landlord showed remarkable forbearance by not evicting the late tenant.",
  fulsome:        "The acceptance speech was filled with fulsome praise for the lead director.",
  gossamer:       "The spider's web was as delicate as gossamer wings in the morning light.",
  grandiloquent:  "His grandiloquent prose impressed no one at the editorial meeting.",
  heterodox:      "The professor was known for his heterodox views on economic theory.",
  histrionic:     "Her histrionic behavior during the argument embarrassed everyone in the room.",
  speculate:      "Analysts speculate carefully before making any long-term investment recommendations.",
  drastic:        "The company had to take drastic measures to avoid going bankrupt.",
  intrinsic:      "Intrinsic motivation tends to lead to more lasting achievement than external rewards.",
  obsolete:       "The factory replaced all its obsolete technology with modern automated machinery.",
  assiduous:      "Her assiduous effort paid off when she graduated top of her class.",
  capricious:     "His capricious behavior made it very difficult for colleagues to plan ahead.",
  curtail:        "The government decided to curtail spending on all non-essential public services.",
  decorous:       "Guests were expected to maintain decorous behavior throughout the formal ceremony.",
  deter:          "Harsher penalties alone cannot effectively deter crime in a society.",
  immutable:      "Some philosophers believe that certain moral values are immutable laws of nature.",
  inchoate:       "His inchoate ideas still needed much more development before the presentation.",
  iniquity:       "The report exposed deep social iniquity within the public education system.",
  insurgent:      "Government forces clashed with insurgent groups in the northern border region.",
  latent:         "The coach spotted the latent ability in the young athlete very early on.",
  lethargic:      "He felt lethargic all morning after a night of very poor sleep.",
  limpid:         "Her limpid prose made even the most complex topics easy to understand.",
  lurid:          "The newspaper printed lurid details about the celebrity's personal life without evidence.",
  magniloquent:   "The politician's magniloquent oratory impressed the crowd but lacked real substance.",
  mawkish:        "The film was ruined by its mawkish sentiment in the final scene.",
  mendacity:      "The journalist documented years of political mendacity with carefully gathered evidence.",
  meretricious:   "The lawyer's meretricious argument failed to convince any member of the jury.",
  nefarious:      "The detective spent years tracking the criminal's nefarious dealings across the city.",
  geography:      "Students must study geography to understand climate patterns and global issues.",
  inflammation:   "The doctor prescribed anti-inflammatory medication to reduce inflammation in the knee.",
  palliative:     "The patient received palliative care to manage pain during her final weeks.",
  testimony:      "The witness was called to give testimony about what she had seen.",
  misogyny:       "The campaign aimed to challenge misogyny in the entertainment industry.",
  hegemony:       "The smaller nations worked together to resist the cultural hegemony of larger powers.",
  circumlocution: "His habit of circumlocution made his reports unnecessarily long and hard to follow.",
  litotes:        "Saying 'not bad' when you mean 'excellent' is a classic example of litotes.",
  noxious:        "Workers in the factory were exposed to noxious fumes without proper protection.",
  obdurate:       "Despite repeated pleas for mercy, the judge remained obdurate in his decision.",
  obfuscation:    "The contract was full of legal obfuscation that confused ordinary readers.",
  opprobrium:     "The politician faced public opprobrium after his dishonest remarks were revealed.",
  painstaking:    "The restorer did painstaking research before attempting to repair the ancient painting.",
  partisan:       "Partisan politics made it nearly impossible to pass any meaningful legislation.",
  pathological:   "His pathological lying eventually cost him all of his close friendships.",
  pernicious:     "The pernicious effects of misinformation spread rapidly through social media.",
  platitude:      "His speech was full of platitudes that offered no real solutions.",
  ponderous:      "The ponderous prose of the legal document made it extremely hard to read.",
  presumptuous:   "It was presumptuous of him to assume he had the job before interviewing.",
  prevaricate:    "Politicians often prevaricate when asked about controversial policy decisions.",
  profligate:     "His profligate spending left the entire company on the verge of collapse.",
  propagate:      "Social media makes it easy to propagate ideas, both helpful and harmful.",
  prosaic:        "Her prosaic writing style failed to capture the excitement of the event.",
  rapacious:      "The rapacious greed of the investors ultimately destroyed the local economy.",
  rectitude:      "His moral rectitude was evident in every decision he made as a judge.",
  reproach:       "Her work as a nurse was beyond reproach throughout her entire career.",
  scurrilous:     "The tabloid printed scurrilous gossip about the actress without any evidence.",
  spurious:       "The defense lawyer identified the spurious claims in the prosecution's argument.",
  strident:       "Her strident criticism of the policy drew both praise and sharp condemnation.",
  subversive:     "The government banned the novel for containing subversive ideas about authority.",
  superfluous:    "The editor removed all superfluous information to make the article more concise.",
  sycophancy:     "The board grew tired of the manager's flagrant sycophancy toward the CEO.",
  tacit:          "There was a tacit agreement between the two sides not to escalate tensions.",
  tendentious:    "The documentary was widely criticized for its tendentious reporting on the conflict.",
  trenchant:      "Her trenchant analysis of the budget cuts impressed the entire parliamentary committee.",
  turgid:         "The academic paper was rejected partly due to its unnecessarily turgid prose.",
  umbrage:        "She took umbrage at the suggestion that she had acted improperly.",
  unfettered:     "The journalist demanded unfettered freedom to report from the conflict zone.",
  vainglorious:   "His vainglorious boasting about his wealth made him deeply unpopular at work.",
  vapid:          "The celebrity's interview was full of vapid conversation with no real depth.",
  vicarious:      "She lived vicariously through her daughter's success as a professional athlete.",
  vilify:         "The press began to vilify the politician after the scandal broke out.",
  voluminous:     "The committee produced a voluminous research report spanning over five hundred pages.",
  wanton:         "The wanton destruction of the ancient forest was condemned by environmental groups.",
  willful:        "The judge ruled that the company's willful neglect had directly caused the accident.",
  five:           "The recipe requires five cups of flour to make enough dough for everyone.",
  six:            "The construction project will take approximately six months to complete from start to finish.",
  nine:           "Scientists once believed there were nine planets in our solar system.",
  drive:          "You should always drive carefully in wet or icy road conditions.",
  shake:          "It is customary to shake hands when meeting someone for the first time.",
  wave:           "She turned around to wave goodbye as the train slowly pulled away.",
  bolster:        "Regular praise from teachers can bolster a child's self-confidence significantly.",
  chronic:        "He has lived with chronic pain in his lower back for over ten years.",
  abstruse:       "His abstruse theory about consciousness was difficult even for experts to follow.",
  aggrandize:     "He tried to aggrandize himself by exaggerating his role in the project.",
  allay:          "The manager tried to allay fears about potential job losses at the firm.",
  apathy:         "Widespread voter apathy led to the lowest election turnout recorded in decades.",
  abdicate:       "The king chose to abdicate his responsibility rather than face the political crisis.",
  absolution:     "He sought absolution from the priest after years of guilt and deep regret.",
  alienate:       "His aggressive tone began to alienate even his most loyal long-term supporters.",
  anarchy:        "The collapse of the government plunged the country into social anarchy.",
  antiquated:     "The court system still relies on antiquated laws written centuries ago.",
  argot:          "The criminal gang developed their own argot to communicate without being detected.",
  aspersion:      "He cast aspersions on his rival's integrity without providing any solid evidence.",
  blithe:         "Her blithe indifference to the team's concerns frustrated everyone she worked with.",
  bombastic:      "His bombastic speeches attracted large crowds but rarely produced any real results.",
  boorish:        "His boorish manners at the dinner table shocked and embarrassed the other guests.",
  cacophonous:    "The construction site produced a cacophonous noise that lasted throughout the entire day.",
  capricious:     "The capricious weather made it impossible to plan any outdoor events this week.",
  caustic:        "Her caustic wit entertained some colleagues while making others feel deeply uncomfortable.",
  chastise:       "The teacher gently chastised the students for failing to complete their homework.",
  clemency:       "The judge showed clemency by reducing the sentence due to the defendant's young age.",
  commensurate:   "His salary should be commensurate with his level of experience and qualifications.",
  conjecture:     "Without more evidence, any conclusion about the cause remains mere conjecture.",
  conspicuous:    "The CEO's conspicuous absence from the board meeting raised many questions among staff.",
  contiguous:     "The two contiguous territories have been disputed between the nations for many decades.",
  convolution:    "The bureaucratic convolutions of the planning process frustrated local business owners.",
  copious:        "She took copious notes during the three-hour lecture to review later.",
  corporeal:      "Some philosophers draw a clear distinction between corporeal existence and spiritual life.",
  corrosive:      "The laboratory worker wore protective gloves when handling the corrosive acid.",
  covert:         "The intelligence agency launched a series of covert operations in foreign countries.",
  culpable:       "The court found the company culpable for the environmental damage it had caused.",
  decry:          "Environmental groups decry the government's recent decision to allow new oil drilling.",
  demur:          "She demurred when asked to sign the contract without reading it through first.",
  deprecate:      "Self-deprecating humor can be charming but should never become truly self-destructive.",
  desultory:      "He made a desultory attempt to tidy his desk before giving up entirely.",
  digress:        "The speaker began to digress from the main topic during the question session.",
  discordant:     "The discordant notes in the second movement gave the symphony an unsettling quality.",
  disillusion:    "Many young voters became disillusioned after the politician broke his key promises.",
  dissent:        "The council member was the only one to express dissent during the final vote.",
  divergent:      "The two leading experts held divergent views on the best approach to the problem.",
  duplicitous:    "His duplicitous behavior eventually came to light and permanently ended his career.",
  earnest:        "She spoke in earnest about her desire to improve conditions at the local school.",
  eclectic:       "The gallery had an eclectic collection of art from many different periods and cultures.",
  endemic:        "Malaria remains endemic to many tropical regions across Africa and Southeast Asia.",
  ephemeral:      "Internet fame is often ephemeral and can fade within a matter of days.",
  exorbitant:     "The hotel charged exorbitant prices for basic rooms during the peak holiday season.",
};

// ── 2. Duplikaları temizle ve fragmentları düzelt ─────────────────────────
const seen = new Set();
const cleaned = [];
let fixCount = 0;
let dupeCount = 0;

for (const w of WORDS) {
  const key = w.en ? w.en.toLowerCase() : w.id;

  // Tekrarı atla
  if (seen.has(key)) {
    dupeCount++;
    continue;
  }
  seen.add(key);

  // Fragment düzelt
  const fix = FIXES[w.en];
  if (fix) {
    w.ex = fix;
    fixCount++;
  }

  cleaned.push(w);
}

console.log(`Orijinal: ${WORDS.length} giriş`);
console.log(`Tekrar silindi: ${dupeCount}`);
console.log(`Fragment düzeltildi: ${fixCount}`);
console.log(`Sonuç: ${cleaned.length} giriş`);

// ── 3. Yaz ───────────────────────────────────────────────────────────────
const newContent = 'const WORDS = ' + JSON.stringify(cleaned, null, 2)
  .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, '$1:') // unquote keys
  + ';\n';

fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log('data.js güncellendi.');
