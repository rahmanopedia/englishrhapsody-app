const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');
const existing = new Set(WORDS.map(w => w.en.toLowerCase().trim()));

const newA1 = [
  { en:'abroad',       tr:'yurt dışı',        ipa:'/əˈbrɔːd/',      cat:'Seyahat',   icon:'✈️', ex:'She went abroad for the first time.' },
  { en:'afterwards',   tr:'sonrasında',        ipa:'/ˈɑːftəwədz/',   cat:'Zaman',     icon:'⏩', ex:'We had lunch and went for a walk afterwards.' },
  { en:'although',     tr:'her ne kadar ... olsa da',ipa:'/ɔːlˈðəʊ/',cat:'Bağlaçlar',icon:'↔️', ex:'Although it was cold, we went out.' },
  { en:'anywhere',     tr:'herhangi bir yerde',ipa:'/ˈeniweə/',      cat:'Genel',     icon:'📍', ex:'I can\'t find my keys anywhere.' },
  { en:'arrive',       tr:'varmak',            ipa:'/əˈraɪv/',       cat:'Fiiller',   icon:'📍', ex:'What time does the train arrive?' },
  { en:'August',       tr:'Ağustos',           ipa:'/ˈɔːɡəst/',      cat:'Aylar',     icon:'☀️', ex:'We go on holiday in August.' },
  { en:'avoid',        tr:'kaçınmak',          ipa:'/əˈvɔɪd/',       cat:'Fiiller',   icon:'🚫', ex:'Avoid eating too much sugar.' },
  { en:'bakery',       tr:'unlu mamüller dükkanı',ipa:'/ˈbeɪkəri/',  cat:'Yerler',    icon:'🥐', ex:'She bought a loaf from the bakery.' },
  { en:'belong',       tr:'ait olmak',         ipa:'/bɪˈlɒŋ/',       cat:'Fiiller',   icon:'🏷️', ex:'Who does this jacket belong to?' },
  { en:'bottom',       tr:'alt',               ipa:'/ˈbɒtəm/',       cat:'Yönler',    icon:'⬇️', ex:'The answer is at the bottom of the page.' },
  { en:'carefully',    tr:'dikkatlice',        ipa:'/ˈkeəfəli/',     cat:'Zarflar',   icon:'⚠️', ex:'Read the question carefully.' },
  { en:'cheerful',     tr:'neşeli',            ipa:'/ˈtʃɪəfəl/',     cat:'Duygular',  icon:'😄', ex:'She is always cheerful in the morning.' },
  { en:'cloudy',       tr:'bulutlu',           ipa:'/ˈklaʊdi/',      cat:'Hava',      icon:'☁️', ex:'It is cloudy but not raining.' },
  { en:'cold',         tr:'soğuk (hava)',       ipa:'/kəʊld/',        cat:'Hava',      icon:'🥶', ex:'It is very cold today.' },
  { en:'comfortable',  tr:'rahat',             ipa:'/ˈkʌmftəbəl/',   cat:'Sıfatlar',  icon:'🛋️', ex:'This chair is very comfortable.' },
  { en:'complain',     tr:'şikayet etmek',     ipa:'/kəmˈpleɪn/',    cat:'Fiiller',   icon:'😤', ex:'He always complains about the food.' },
  { en:'contain',      tr:'içermek',           ipa:'/kənˈteɪn/',     cat:'Fiiller',   icon:'📦', ex:'This drink contains a lot of sugar.' },
  { en:'crowded',      tr:'kalabalık',         ipa:'/ˈkraʊdɪd/',     cat:'Sıfatlar',  icon:'👥', ex:'The shop was very crowded.' },
  { en:'dark',         tr:'karanlık',          ipa:'/dɑːk/',          cat:'Sıfatlar',  icon:'🌑', ex:'It gets dark early in winter.' },
  { en:'delicious',    tr:'lezzetli',          ipa:'/dɪˈlɪʃəs/',     cat:'Sıfatlar',  icon:'😋', ex:'The soup was absolutely delicious.' },
  { en:'describe',     tr:'tanımlamak',        ipa:'/dɪˈskraɪb/',    cat:'Fiiller',   icon:'🖊️', ex:'Describe the picture in two sentences.' },
  { en:'diet',         tr:'diyet / beslenme',  ipa:'/ˈdaɪət/',       cat:'Sağlık',    icon:'🥗', ex:'She followed a healthy diet.' },
  { en:'direction',    tr:'yön / yönlendirme', ipa:'/dɪˈrekʃən/',   cat:'Yönler',    icon:'🧭', ex:'She went in the wrong direction.' },
  { en:'distance',     tr:'mesafe',            ipa:'/ˈdɪstəns/',     cat:'Ölçüler',   icon:'📏', ex:'The station is a short distance away.' },
  { en:'effect',       tr:'etki',              ipa:'/ɪˈfekt/',       cat:'Genel',     icon:'💥', ex:'The medicine had a good effect.' },
  { en:'electricity',  tr:'elektrik',          ipa:'/ɪˌlekˈtrɪsɪti/',cat:'Genel',    icon:'⚡', ex:'The electricity came back on.' },
  { en:'entrance',     tr:'giriş kapısı',      ipa:'/ˈentrəns/',     cat:'Yerler',    icon:'🚪', ex:'The entrance to the museum is free.' },
  { en:'equipment',    tr:'donanım',           ipa:'/ɪˈkwɪpmənt/',   cat:'Genel',     icon:'🔧', ex:'Bring the right equipment for the job.' },
  { en:'excite',       tr:'heyecanlandırmak',  ipa:'/ɪkˈsaɪt/',     cat:'Fiiller',   icon:'🎉', ex:'The news excited everyone.' },
  { en:'expensive',    tr:'pahalı',            ipa:'/ɪkˈspensɪv/',  cat:'Sıfatlar',  icon:'💸', ex:'The hotel was very expensive.' },
  { en:'experience',   tr:'deneyim',           ipa:'/ɪkˈspɪəriəns/',cat:'Genel',     icon:'⭐', ex:'She has a lot of work experience.' },
  { en:'explain',      tr:'açıklamak',         ipa:'/ɪkˈspleɪn/',   cat:'Fiiller',   icon:'💡', ex:'Can you explain the rules again?' },
  { en:'factory',      tr:'fabrika',           ipa:'/ˈfæktri/',     cat:'İş',        icon:'🏭', ex:'My father works in a factory.' },
  { en:'familiar',     tr:'tanıdık / bildik',  ipa:'/fəˈmɪliə/',    cat:'Sıfatlar',  icon:'😊', ex:'That song sounds familiar.' },
  { en:'fantastic',    tr:'harika',            ipa:'/fænˈtæstɪk/', cat:'Sıfatlar',  icon:'🌟', ex:'The view from the top was fantastic.' },
  { en:'fiction',      tr:'kurgu / roman',     ipa:'/ˈfɪkʃən/',     cat:'Okul',      icon:'📚', ex:'She loves reading science fiction.' },
  { en:'fifteen',      tr:'on beş',            ipa:'/ˌfɪfˈtiːn/',   cat:'Sayılar',   icon:'🔢', ex:'She is fifteen years old.' },
  { en:'flight',       tr:'uçuş',              ipa:'/flaɪt/',        cat:'Seyahat',   icon:'✈️', ex:'Our flight leaves at noon.' },
  { en:'floor',        tr:'kat',               ipa:'/flɔː/',         cat:'Ev',        icon:'🏢', ex:'They live on the third floor.' },
  { en:'folk',         tr:'halk',              ipa:'/fəʊk/',         cat:'Kültür',    icon:'🎵', ex:'She likes folk music.' },
  { en:'forever',      tr:'sonsuza kadar',     ipa:'/fərˈevə/',     cat:'Zaman',     icon:'♾️', ex:'I will remember this forever.' },
  { en:'forward',      tr:'ileriye doğru',     ipa:'/ˈfɔːwəd/',     cat:'Yönler',    icon:'➡️', ex:'She leaned forward to hear better.' },
  { en:'free time',    tr:'boş zaman',         ipa:'/friː taɪm/',   cat:'Genel',     icon:'😌', ex:'What do you do in your free time?' },
  { en:'freshwater',   tr:'tatlı su',          ipa:'/ˈfreʃwɔːtə/',  cat:'Doğa',      icon:'💧', ex:'This lake has freshwater.' },
  { en:'frightened',   tr:'korkmuş',           ipa:'/ˈfraɪtnd/',   cat:'Duygular',  icon:'😱', ex:'The loud noise frightened the baby.' },
  { en:'golden',       tr:'altın renkli / altın',ipa:'/ˈɡəʊldən/', cat:'Sıfatlar',  icon:'🥇', ex:'She has golden hair.' },
  { en:'grocer',       tr:'bakkal',            ipa:'/ˈɡrəʊsə/',    cat:'Meslekler', icon:'🛒', ex:'She bought vegetables from the grocer.' },
  { en:'hammer',       tr:'çekiç',             ipa:'/ˈhæmə/',      cat:'Araçlar',   icon:'🔨', ex:'He used a hammer to put up the shelf.' },
  { en:'headline',     tr:'manşet / başlık',   ipa:'/ˈhedlaɪn/',   cat:'Medya',     icon:'📰', ex:'The news headline was shocking.' },
  { en:'hedge',        tr:'çit / çalı çiti',   ipa:'/hedʒ/',        cat:'Bahçe',     icon:'🌿', ex:'He cut the hedge in the garden.' },
  { en:'illness',      tr:'hastalık',          ipa:'/ˈɪlnəs/',     cat:'Sağlık',    icon:'🤒', ex:'She missed school due to illness.' },
  { en:'indoor',       tr:'iç mekan',          ipa:'/ˈɪndɔː/',     cat:'Genel',     icon:'🏠', ex:'We played indoor games.' },
  { en:'instructions', tr:'talimatlar / yönergeler',ipa:'/ɪnˈstrʌkʃənz/',cat:'Genel',icon:'📋', ex:'Follow the instructions carefully.' },
  { en:'jealous',      tr:'kıskanç',           ipa:'/ˈdʒeləs/',    cat:'Duygular',  icon:'😒', ex:'He was jealous of his sister\'s new toy.' },
  { en:'ladder',       tr:'merdiven (el)',      ipa:'/ˈlædə/',      cat:'Araçlar',   icon:'🪜', ex:'She climbed the ladder to fix the roof.' },
  { en:'landmark',     tr:'işaret / simge yapı',ipa:'/ˈlændmɑːk/', cat:'Coğrafya',  icon:'🗿', ex:'Big Ben is a famous landmark.' },
  { en:'lifestyle',    tr:'yaşam tarzı',        ipa:'/ˈlaɪfstaɪl/', cat:'Genel',     icon:'🌟', ex:'She leads a healthy lifestyle.' },
  { en:'meanwhile',    tr:'bu sırada',          ipa:'/ˈmiːnwaɪl/',  cat:'Zaman',     icon:'⏱️', ex:'Meanwhile, she prepared the food.' },
  { en:'midnight',     tr:'gece yarısı',        ipa:'/ˈmɪdnaɪt/',  cat:'Zaman',     icon:'🌙', ex:'The clock struck midnight.' },
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
