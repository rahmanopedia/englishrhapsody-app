const fs = require('fs');
let content = fs.readFileSync('./js/app.js', 'utf8');

const MARKER = "  'wi-fi':         { type:'Kelime', tr:'kablosuz internet ba\u011flant\u0131s\u0131',       ex:'The caf\u00e9 offered free Wi-Fi to attract customers.' },\n};";

const entries = [
  ["less",               "daha az",                   "She spent less time on social media."],
  ["others",             "di\u011ferleri",                  "Some stayed quiet while others spoke up."],
  ["systematically",     "sistematik olarak",          "He systematically reviewed every document."],
  ["tall",               "uzun boylu",                 "The tall trees provided shade in the park."],
  ["difficult",          "zor, g\u00fc\u00e7",                  "It was difficult to concentrate in the noise."],
  ["direct",             "do\u011frudan",                   "She gave a direct answer to the question."],
  ["financial",          "finansal, mali",             "They faced serious financial difficulties."],
  ["having",             "sahip olmak",                "Having a good plan makes all the difference."],
  ["least",              "en az",                      "At least try to understand the situation."],
  ["panicking",          "pani\u011fe kap\u0131lmak",               "She stopped panicking and focused on solutions."],
  ["realized",           "fark etti, anlad\u0131",           "He realized his mistake too late."],
  ["acoustic",           "akustik",                    "The acoustic properties of the hall were excellent."],
  ["adaptability",       "uyum yetene\u011fi",               "Adaptability is a key skill in the modern workplace."],
  ["advised",            "tavsiye etti",               "The doctor advised her to rest for a week."],
  ["airline",            "havayolu \u015firketi",            "The airline cancelled the flight due to bad weather."],
  ["airport",            "havalimanı",                 "They arrived at the airport two hours early."],
  ["albeit",             "her ne kadar",               "It was a small, albeit important, change."],
  ["algorithmically",    "algoritmik olarak",          "Content is algorithmically ranked by engagement."],
  ["analyzing",          "analiz etmek",               "She spent the morning analyzing the data."],
  ["behavior",           "davran\u0131\u015f",                   "His behavior at the meeting was professional."],
  ["beings",             "varl\u0131klar",                  "Human beings are inherently social creatures."],
  ["believe",            "inanmak, d\u00fc\u015f\u00fcnmek",           "I believe we can solve this problem together."],
  ["beside",             "yan\u0131nda",                    "She sat beside her friend during the ceremony."],
  ["blew",               "\u00fcfledi, esti",                "The wind blew the leaves across the yard."],
  ["bravest",            "en cesur",                   "She was the bravest person in the group."],
  ["catastrophic",       "felaket niteli\u011finde",          "The drought had catastrophic effects on the harvest."],
  ["closer",             "daha yak\u0131n",                 "Move closer so you can hear better."],
  ["compatibilists",     "uyumcular (felsefe)",        "Compatibilists argue free will and determinism coexist."],
  ["confidently",        "g\u00fcvenle, \u00f6zg\u00fcvenle",          "She spoke confidently in front of the audience."],
  ["confined",           "s\u0131n\u0131rl\u0131, kapal\u0131",               "The discussion was confined to a single topic."],
  ["coordinated",        "koordineli",                 "A coordinated response is needed from all departments."],
  ["corner",             "k\u00f6\u015fe",                     "The cafe was tucked into a quiet corner of the street."],
  ["creativity-relevant","yaratıcılıkla ilgili",       "Intrinsic motivation is a creativity-relevant skill."],
  ["cried",              "a\u011flad\u0131",                   "She cried when she heard the news."],
  ["discovery",          "ke\u015fif, bulu\u015f",              "The discovery of penicillin changed medicine forever."],
  ["discussions",        "tart\u0131\u015fmalar",               "The discussions lasted well into the evening."],
  ["domain-relevant",    "alana \u00f6zg\u00fc",                "Domain-relevant skills are necessary for creative work."],
  ["drawn",              "\u00e7ekilmi\u015f, ilgi duymak",       "She was drawn to the quiet of the library."],
  ["dual",               "\u00e7ift, ikili",                 "The device has a dual purpose in the lab."],
  ["emergence",          "ortaya \u00e7\u0131k\u0131\u015f",              "The emergence of AI has transformed many industries."],
  ["emphasized",         "vurgulad\u0131",                  "The teacher emphasized the importance of revision."],
  ["emphasizes",         "vurgular",                   "The report emphasizes the need for urgent action."],
  ["ending",             "son, biti\u015f",                 "The story had a surprising ending."],
  ["environmentally",    "\u00e7evresel olarak",              "We need to act more environmentally responsibly."],
  ["evenings",           "ak\u015famlar",                   "She spent her evenings reading by the window."],
  ["exponentially",      "katlanarak",                 "Computing power has grown exponentially since the 1970s."],
  ["exposure",           "maruz kalma",                "Regular exposure to English improves fluency."],
  ["fact-checking",      "ger\u00e7ek do\u011frulama",            "Fact-checking is essential in digital journalism."],
  ["forty-two",          "k\u0131rk iki",                   "She is forty-two years old."],
  ["immediate",          "anl\u0131k, acil",                "The decision had an immediate impact on the team."],
  ["inevitably",         "ka\u00e7\u0131n\u0131lmaz olarak",         "Change inevitably brings uncertainty."],
  ["led",                "y\u00f6netti, \u00f6nc\u00fcl\u00fck etti",        "She led the project from start to finish."],
  ["meant",              "anlam\u0131na geldi",              "He meant well, even if his words were clumsy."],
  ["organized",          "organize, d\u00fczenlenmi\u015f",      "The event was well organized and ran smoothly."],
  ["overconsumption",    "a\u015f\u0131r\u0131 t\u00fcketim",             "Overconsumption is a driver of climate change."],
  ["perfectly",          "m\u00fckemmel \u015fekilde",            "The two parts fit together perfectly."],
  ["relied",             "g\u00fcvendi, dayand\u0131",            "She relied on her experience to make the decision."],
  ["thirty-five",        "otuz be\u015f",                   "The course lasts thirty-five hours in total."],
  ["thirty-six",         "otuz alt\u0131",                  "He ran thirty-six kilometres during the race."],
  ["understood",         "anlad\u0131, kavrad\u0131",             "She finally understood why the process mattered."],
];

const lines = entries.map(([w, tr, ex]) =>
  `  '${w}': { type:'Kelime', tr:'${tr}', ex:'${ex}' },`
).join('\n');

const replacement = MARKER.replace('\n};', '\n\n' + lines + '\n};');

if (content.includes(MARKER)) {
  content = content.replace(MARKER, replacement);
  fs.writeFileSync('./js/app.js', content, 'utf8');
  console.log('Done - added', entries.length, 'entries');
} else {
  const idx = content.indexOf("'wi-fi'");
  console.log('MARKER NOT FOUND. Snippet:', JSON.stringify(content.slice(idx, idx + 200)));
}
