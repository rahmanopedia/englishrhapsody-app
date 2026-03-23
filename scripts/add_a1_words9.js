const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');
const existing = new Set(WORDS.map(w => w.en.toLowerCase().trim()));

const newA1 = [
  { en:'airport',    tr:'havalimanı',      ipa:'/ˈeəpɔːt/',     cat:'Seyahat',   icon:'✈️', ex:'We arrived at the airport two hours early.' },
  { en:'ankle',      tr:'ayak bileği',     ipa:'/ˈæŋkl/',       cat:'Vücut',     icon:'🦵', ex:'She twisted her ankle.' },
  { en:'appetite',   tr:'iştah',           ipa:'/ˈæpɪtaɪt/',   cat:'Genel',     icon:'🍽️', ex:'She has a good appetite.' },
  { en:'arrival',    tr:'varış / geliş',   ipa:'/əˈraɪvəl/',   cat:'Seyahat',   icon:'🛬', ex:'The arrival time is ten o\'clock.' },
  { en:'bakery',     tr:'fırın',           ipa:'/ˈbeɪkəri/',   cat:'Yerler',    icon:'🥖', ex:'She bought croissants at the bakery.' },
  { en:'canal',      tr:'kanal / su yolu', ipa:'/kəˈnæl/',     cat:'Doğa',      icon:'🚤', ex:'Boats travel along the canal.' },
  { en:'capital',    tr:'başkent',         ipa:'/ˈkæpɪtl/',    cat:'Coğrafya',  icon:'🏛️', ex:'Ankara is the capital of Turkey.' },
  { en:'cave',       tr:'mağara',          ipa:'/keɪv/',        cat:'Doğa',      icon:'🏔️', ex:'Bats live inside the cave.' },
  { en:'competition',tr:'yarışma',         ipa:'/ˌkɒmpɪˈtɪʃən/',cat:'Genel',   icon:'🏅', ex:'He won the swimming competition.' },
  { en:'continent',  tr:'kıta',            ipa:'/ˈkɒntɪnənt/', cat:'Coğrafya',  icon:'🌍', ex:'Europe is a continent.' },
  { en:'crossing',   tr:'geçit / kavşak',  ipa:'/ˈkrɒsɪŋ/',   cat:'Coğrafya',  icon:'🚸', ex:'Use the pedestrian crossing.' },
  { en:'desert',     tr:'çöl',             ipa:'/ˈdezət/',     cat:'Doğa',      icon:'🏜️', ex:'The Sahara is the largest hot desert.' },
  { en:'direction',  tr:'yön / talimat',   ipa:'/dɪˈrekʃən/', cat:'Genel',     icon:'🧭', ex:'Go in the direction of the school.' },
  { en:'distance',   tr:'mesafe',          ipa:'/ˈdɪstəns/',  cat:'Genel',     icon:'📏', ex:'The school is a short distance away.' },
  { en:'downtown',   tr:'şehir merkezi',   ipa:'/ˌdaʊnˈtaʊn/',cat:'Coğrafya',  icon:'🏙️', ex:'She works downtown.' },
  { en:'earthquake', tr:'deprem',          ipa:'/ˈɜːθkweɪk/', cat:'Doğa',      icon:'🌋', ex:'The earthquake damaged many buildings.' },
  { en:'emergency exit',tr:'acil çıkış',   ipa:'/ɪˈmɜːdʒənsi ˈeksɪt/',cat:'Genel',icon:'🚨', ex:'Use the emergency exit if there is a fire.' },
  { en:'entrance',   tr:'giriş',           ipa:'/ˈentrəns/',  cat:'Yerler',    icon:'🚪', ex:'Meet me at the entrance.' },
  { en:'goal',       tr:'hedef',           ipa:'/ɡəʊl/',       cat:'Genel',     icon:'🎯', ex:'Her goal is to become a doctor.' },
  { en:'ground floor',tr:'zemin kat',      ipa:'/ɡraʊnd flɔː/',cat:'Ev',       icon:'🏢', ex:'The shop is on the ground floor.' },
  { en:'income',     tr:'gelir',           ipa:'/ˈɪŋkʌm/',    cat:'İş',        icon:'💰', ex:'She has a good income.' },
  { en:'island',     tr:'ada',             ipa:'/ˈaɪlənd/',   cat:'Coğrafya',  icon:'🏝️', ex:'They went on holiday to a small island.' },
  { en:'midnight',   tr:'gece yarısı',     ipa:'/ˈmɪdnaɪt/', cat:'Zaman',     icon:'🌙', ex:'The party ended at midnight.' },
  { en:'midnight',   tr:'gece yarısı',     ipa:'/ˈmɪdnaɪt/', cat:'Zaman',     icon:'🌙', ex:'It is midnight — time for bed.' },
  { en:'nature',     tr:'doğa',            ipa:'/ˈneɪtʃə/',  cat:'Doğa',      icon:'🌿', ex:'She loves walking in nature.' },
  { en:'ocean',      tr:'okyanus',         ipa:'/ˈəʊʃən/',   cat:'Doğa',      icon:'🌊', ex:'The Atlantic Ocean is very wide.' },
  { en:'opposite',   tr:'karşı / zıt',     ipa:'/ˈɒpəzɪt/',  cat:'Genel',     icon:'↔️', ex:'The bank is opposite the post office.' },
  { en:'organisation',tr:'organizasyon',   ipa:'/ˌɔːɡənaɪˈzeɪʃən/',cat:'Genel',icon:'🏢', ex:'She works for a big organisation.' },
  { en:'playground', tr:'oyun parkı',      ipa:'/ˈpleɪɡraʊnd/',cat:'Yerler',  icon:'🛝', ex:'The children love the playground.' },
  { en:'population', tr:'nüfus',           ipa:'/ˌpɒpjʊˈleɪʃən/',cat:'Coğrafya',icon:'👥', ex:'The population of Turkey is large.' },
  { en:'port',       tr:'liman',           ipa:'/pɔːt/',      cat:'Yerler',    icon:'⚓', ex:'The ship arrived at the port.' },
  { en:'pound',      tr:'pound (para)',     ipa:'/paʊnd/',     cat:'Genel',     icon:'💷', ex:'The ticket costs ten pounds.' },
  { en:'rush',       tr:'acele etmek',     ipa:'/rʌʃ/',       cat:'Fiiller',   icon:'🏃', ex:'Don\'t rush — we have plenty of time.' },
  { en:'century',    tr:'yüzyıl',          ipa:'/ˈsentʃəri/', cat:'Zaman',     icon:'📅', ex:'The castle is from the twelfth century.' },
  { en:'slope',      tr:'eğim / yamaç',    ipa:'/sləʊp/',     cat:'Doğa',      icon:'⛷️', ex:'They skied down the snowy slope.' },
  { en:'speech',     tr:'konuşma',         ipa:'/spiːtʃ/',    cat:'Genel',     icon:'🎙️', ex:'She gave a speech at the graduation.' },
  { en:'stairs',     tr:'merdiven',        ipa:'/steəz/',     cat:'Ev',        icon:'🪜', ex:'She climbed the stairs to the top floor.' },
  { en:'straight',   tr:'düz / doğruca',   ipa:'/streɪt/',   cat:'Yönler',    icon:'➡️', ex:'Go straight ahead.' },
  { en:'suburb',     tr:'banliyö',         ipa:'/ˈsʌbɜːb/',  cat:'Coğrafya',  icon:'🏡', ex:'She lives in the suburbs.' },
  { en:'temperature',tr:'sıcaklık',        ipa:'/ˈtemprɪtʃə/',cat:'Hava',     icon:'🌡️', ex:'The temperature is below zero today.' },
  { en:'thumb',      tr:'baş parmak',      ipa:'/θʌm/',       cat:'Vücut',     icon:'👍', ex:'She hurt her thumb.' },
  { en:'timetable',  tr:'program',         ipa:'/ˈtaɪmteɪbəl/',cat:'Genel',  icon:'📅', ex:'Check the train timetable.' },
  { en:'topic',      tr:'konu',            ipa:'/ˈtɒpɪk/',   cat:'Genel',     icon:'📌', ex:'What is the topic of today\'s lesson?' },
  { en:'turn left',  tr:'sola dön',        ipa:'/tɜːn left/', cat:'Yönler',    icon:'↩️', ex:'Turn left at the traffic lights.' },
  { en:'turn right', tr:'sağa dön',        ipa:'/tɜːn raɪt/',cat:'Yönler',    icon:'↪️', ex:'Turn right at the corner.' },
  { en:'university', tr:'üniversite',      ipa:'/ˌjuːnɪˈvɜːsɪti/',cat:'Okul', icon:'🎓', ex:'She studies at university.' },
  { en:'upstairs',   tr:'üst kat',         ipa:'/ˌʌpˈsteəz/', cat:'Ev',       icon:'⬆️', ex:'My bedroom is upstairs.' },
  { en:'village',    tr:'köy',             ipa:'/ˈvɪlɪdʒ/',  cat:'Coğrafya',  icon:'🏡', ex:'She grew up in a small village.' },
  { en:'voyage',     tr:'deniz/hava yolculuğu',ipa:'/ˈvɔɪɪdʒ/',cat:'Seyahat',icon:'🚢', ex:'They went on a long sea voyage.' },
  { en:'wrist',      tr:'bilek',           ipa:'/rɪst/',      cat:'Vücut',     icon:'⌚', ex:'She wore a bracelet on her wrist.' },
  { en:'youth',      tr:'gençlik / genç',  ipa:'/juːθ/',      cat:'Genel',     icon:'🧒', ex:'Youth is the best time of life.' },
  { en:'charity',    tr:'yardım kuruluşu', ipa:'/ˈtʃærɪti/', cat:'Toplum',    icon:'❤️', ex:'He volunteers for a local charity.' },
  { en:'downtown',   tr:'merkez',          ipa:'/ˌdaʊnˈtaʊn/',cat:'Coğrafya', icon:'🏙️', ex:'The hotel is in the downtown area.' },
  { en:'flour',      tr:'un',              ipa:'/flaʊə/',     cat:'Yiyecekler',icon:'🌾', ex:'Add two cups of flour to the bowl.' },
  { en:'porridge',   tr:'yulaf lapası',    ipa:'/ˈpɒrɪdʒ/',  cat:'Yiyecekler',icon:'🥣', ex:'She has porridge for breakfast.' },
  { en:'cereal',     tr:'mısır gevreği / tahıl',ipa:'/ˈsɪəriəl/',cat:'Yiyecekler',icon:'🥣', ex:'He eats cereal with milk every morning.' },
  { en:'sausage',    tr:'sosis / sucuk',   ipa:'/ˈsɒsɪdʒ/',  cat:'Yiyecekler',icon:'🌭', ex:'She fried sausages for breakfast.' },
  { en:'cucumber',   tr:'salatalık',       ipa:'/ˈkjuːkʌmbə/',cat:'Sebzeler', icon:'🥒', ex:'Add cucumber slices to the salad.' },
  { en:'celery',     tr:'kereviz',         ipa:'/ˈseləri/',  cat:'Sebzeler',  icon:'🥬', ex:'She added celery to the soup.' },
  { en:'cabbage',    tr:'lahana',          ipa:'/ˈkæbɪdʒ/', cat:'Sebzeler',  icon:'🥬', ex:'She put cabbage in the stew.' },
  { en:'cauliflower',tr:'karnabahar',      ipa:'/ˈkɒlɪflaʊə/',cat:'Sebzeler',icon:'🥦', ex:'She boiled the cauliflower.' },
  { en:'lemon',      tr:'limon',           ipa:'/ˈlemən/',   cat:'Meyveler',  icon:'🍋', ex:'Add a squeeze of lemon to the salad.' },
  { en:'lime',       tr:'misket limonu',   ipa:'/laɪm/',     cat:'Meyveler',  icon:'🍋', ex:'She put lime juice in the drink.' },
  { en:'papaya',     tr:'papaya',          ipa:'/pəˈpaɪə/', cat:'Meyveler',  icon:'🍈', ex:'Papaya is sweet and tropical.' },
  { en:'kiwi',       tr:'kivi',            ipa:'/ˈkiːwiː/', cat:'Meyveler',  icon:'🥝', ex:'She sliced a kiwi for the fruit salad.' },
  { en:'fig',        tr:'incir',           ipa:'/fɪɡ/',      cat:'Meyveler',  icon:'🍑', ex:'Figs are sweet and full of seeds.' },
];

let added = 0, skipped = 0;
const toAdd = [];
for (const w of newA1) {
  const key = w.en.toLowerCase().trim();
  if (existing.has(key)) { skipped++; continue; }
  toAdd.push({
    id: w.en.toLowerCase().replace(/\s+/g,'_'),
    en: w.en, tr: w.tr, ipa: w.ipa, level: 'A1',
    cat: w.cat, icon: w.icon, ex: w.ex, syns: [], colloc: [],
  });
  existing.add(key);
  added++;
}

console.log('Added: ' + added + ', Skipped: ' + skipped);
const combined = WORDS.concat(toAdd);
const levels = {};
for (const w of combined) levels[w.level] = (levels[w.level]||0)+1;
console.log('Level counts:', JSON.stringify(levels));
fs.writeFileSync(path.join(__dirname,'../js/data.js'),
  'const WORDS = '+JSON.stringify(combined,null,2)+';\n');
console.log('Written.');
