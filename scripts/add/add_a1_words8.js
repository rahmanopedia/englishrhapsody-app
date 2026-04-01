const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');
const existing = new Set(WORDS.map(w => w.en.toLowerCase().trim()));

const newA1 = [
  { en:'advertisement',tr:'reklam',        ipa:'/ədˈvɜːtɪsmənt/',cat:'Medya',    icon:'📢', ex:'I saw an advertisement on TV.' },
  { en:'address',    tr:'adres',           ipa:'/əˈdres/',       cat:'Genel',     icon:'📍', ex:'Write your address here.' },
  { en:'career',     tr:'kariyer / meslek',ipa:'/kəˈrɪə/',       cat:'İş',        icon:'💼', ex:'She wants a career in medicine.' },
  { en:'certificate',tr:'sertifika',       ipa:'/səˈtɪfɪkət/',  cat:'Okul',      icon:'📜', ex:'She got a certificate after the course.' },
  { en:'charity',    tr:'hayır kurumu / bağış',ipa:'/ˈtʃærɪti/', cat:'Genel',    icon:'❤️', ex:'She gave money to charity.' },
  { en:'cinema',     tr:'sinema',          ipa:'/ˈsɪnɪmə/',     cat:'Eğlence',   icon:'🎬', ex:'Let\'s go to the cinema tonight.' },
  { en:'curtain',    tr:'perde',           ipa:'/ˈkɜːtən/',     cat:'Ev',        icon:'🪟', ex:'Open the curtains to let in the light.' },
  { en:'customer',   tr:'müşteri',         ipa:'/ˈkʌstəmə/',    cat:'Alışveriş', icon:'🛒', ex:'The shop is full of customers.' },
  { en:'dessert',    tr:'tatlı (yemek sonrası)',ipa:'/dɪˈzɜːt/', cat:'Yiyecekler',icon:'🍰', ex:'She had ice cream for dessert.' },
  { en:'environment',tr:'çevre',           ipa:'/ɪnˈvaɪrənmənt/',cat:'Doğa',     icon:'🌍', ex:'We should protect the environment.' },
  { en:'equipment',  tr:'ekipman / donanım',ipa:'/ɪˈkwɪpmənt/', cat:'Genel',     icon:'🔧', ex:'The gym has modern equipment.' },
  { en:'experience', tr:'deneyim',         ipa:'/ɪkˈspɪəriəns/',cat:'Genel',     icon:'⭐', ex:'She has a lot of experience.' },
  { en:'explanation',tr:'açıklama',        ipa:'/ˌekspləˈneɪʃən/',cat:'Genel',  icon:'💡', ex:'The teacher gave a clear explanation.' },
  { en:'factory',    tr:'fabrika',         ipa:'/ˈfæktri/',     cat:'İş',        icon:'🏭', ex:'He works in a car factory.' },
  { en:'glass',      tr:'cam (malzeme)',   ipa:'/ɡlɑːs/',       cat:'Malzeme',   icon:'🪟', ex:'The vase is made of glass.' },
  { en:'government', tr:'hükümet',         ipa:'/ˈɡʌvənmənt/',  cat:'Toplum',    icon:'🏛️', ex:'The government built new roads.' },
  { en:'instrument', tr:'enstrüman / alet',ipa:'/ˈɪnstrəmənt/', cat:'Müzik',     icon:'🎸', ex:'She plays a musical instrument.' },
  { en:'invitation', tr:'davetiye',        ipa:'/ˌɪnvɪˈteɪʃən/',cat:'Genel',   icon:'✉️', ex:'She sent me an invitation to her party.' },
  { en:'law',        tr:'yasa / hukuk',    ipa:'/lɔː/',          cat:'Genel',     icon:'⚖️', ex:'Everyone must follow the law.' },
  { en:'licence',    tr:'lisans / ehliyet',ipa:'/ˈlaɪsəns/',    cat:'Genel',     icon:'🪪', ex:'You need a licence to drive a car.' },
  { en:'manner',     tr:'davranış / tarz', ipa:'/ˈmænə/',       cat:'Genel',     icon:'🤝', ex:'She spoke in a polite manner.' },
  { en:'material',   tr:'malzeme / kumaş',ipa:'/məˈtɪəriəl/',  cat:'Malzeme',   icon:'🧵', ex:'This bag is made of strong material.' },
  { en:'nationality',tr:'milliyet',        ipa:'/ˌnæʃəˈnælɪti/',cat:'Genel',    icon:'🌍', ex:'What is your nationality?' },
  { en:'neighbour',  tr:'komşu',           ipa:'/ˈneɪbə/',      cat:'İnsanlar',  icon:'🏠', ex:'Our new neighbour is very friendly.' },
  { en:'occupation', tr:'meslek / uğraş',  ipa:'/ˌɒkjʊˈpeɪʃən/',cat:'İş',      icon:'💼', ex:'What is your occupation?' },
  { en:'opinion',    tr:'görüş / fikir',   ipa:'/əˈpɪnjən/',    cat:'Genel',     icon:'💬', ex:'In my opinion, this is wrong.' },
  { en:'path',       tr:'yol / patika',    ipa:'/pɑːθ/',        cat:'Coğrafya',  icon:'🛤️', ex:'Follow the path through the wood.' },
  { en:'pattern',    tr:'desen / model',   ipa:'/ˈpætən/',      cat:'Genel',     icon:'🔷', ex:'The wallpaper has a flower pattern.' },
  { en:'percent',    tr:'yüzde',           ipa:'/pəˈsent/',     cat:'Sayılar',   icon:'%', ex:'Ninety percent of students passed.' },
  { en:'permission', tr:'izin',            ipa:'/pəˈmɪʃən/',    cat:'Genel',     icon:'✅', ex:'You need permission to park here.' },
  { en:'population', tr:'nüfus',           ipa:'/ˌpɒpjʊˈleɪʃən/',cat:'Genel',   icon:'👥', ex:'The population of this city is large.' },
  { en:'programme',  tr:'program',         ipa:'/ˈprəʊɡræm/',   cat:'Genel',     icon:'📺', ex:'What programme is on TV tonight?' },
  { en:'pronunciation',tr:'telaffuz',      ipa:'/prəˌnʌnsiˈeɪʃən/',cat:'Dil',  icon:'🗣️', ex:'Her pronunciation is very clear.' },
  { en:'queue',      tr:'kuyruk',          ipa:'/kjuː/',        cat:'Genel',     icon:'🧑‍🤝‍🧑', ex:'There is a long queue at the bank.' },
  { en:'receipt',    tr:'fiş / makbuz',    ipa:'/rɪˈsiːt/',     cat:'Alışveriş', icon:'🧾', ex:'Keep your receipt in case of a return.' },
  { en:'refreshments',tr:'ikram / hafif yiyecek',ipa:'/rɪˈfreʃmənts/',cat:'Yiyecekler',icon:'☕', ex:'Refreshments will be served after the meeting.' },
  { en:'relative',   tr:'akraba / göreceli',ipa:'/ˈrelɪtɪv/',  cat:'Aile',      icon:'👨‍👩‍👧', ex:'All her relatives came to the wedding.' },
  { en:'reward',     tr:'ödül / mükafat',  ipa:'/rɪˈwɔːd/',    cat:'Genel',     icon:'🏅', ex:'She got a reward for her hard work.' },
  { en:'routine',    tr:'rutin',           ipa:'/ruːˈtiːn/',    cat:'Genel',     icon:'🔄', ex:'She has a morning routine.' },
  { en:'sample',     tr:'örnek',           ipa:'/ˈsɑːmpəl/',   cat:'Genel',     icon:'🔬', ex:'Try a sample of the new cheese.' },
  { en:'section',    tr:'bölüm',           ipa:'/ˈsekʃən/',    cat:'Genel',     icon:'📑', ex:'Read the first section of the book.' },
  { en:'service',    tr:'servis / hizmet', ipa:'/ˈsɜːvɪs/',    cat:'Genel',     icon:'🛎️', ex:'The service in that restaurant is excellent.' },
  { en:'situation',  tr:'durum / koşul',   ipa:'/ˌsɪtʃuˈeɪʃən/',cat:'Genel',   icon:'💬', ex:'It was a difficult situation.' },
  { en:'solution',   tr:'çözüm',           ipa:'/səˈluːʃən/',   cat:'Genel',     icon:'💡', ex:'She found a solution to the problem.' },
  { en:'speed',      tr:'hız',             ipa:'/spiːd/',       cat:'Genel',     icon:'⚡', ex:'The car was going at high speed.' },
  { en:'style',      tr:'tarz / stil',     ipa:'/staɪl/',       cat:'Genel',     icon:'💅', ex:'She has her own unique style.' },
  { en:'support',    tr:'destek vermek',   ipa:'/səˈpɔːt/',     cat:'Fiiller',   icon:'🤝', ex:'Thank you for your support.' },
  { en:'surface',    tr:'yüzey',           ipa:'/ˈsɜːfɪs/',    cat:'Genel',     icon:'🔲', ex:'The surface of the table is smooth.' },
  { en:'symbol',     tr:'sembol / simge',  ipa:'/ˈsɪmbəl/',    cat:'Genel',     icon:'⭐', ex:'The heart is a symbol of love.' },
  { en:'timetable',  tr:'ders/tren programı',ipa:'/ˈtaɪmteɪbəl/',cat:'Okul',   icon:'📅', ex:'Check the bus timetable online.' },
  { en:'tradition',  tr:'gelenek',         ipa:'/trəˈdɪʃən/',   cat:'Kültür',    icon:'🎎', ex:'It is a family tradition.' },
  { en:'transport',  tr:'ulaşım',          ipa:'/ˈtrænspɔːt/',  cat:'Ulaşım',    icon:'🚌', ex:'The city has good public transport.' },
  { en:'umbrella',   tr:'şemsiye',         ipa:'/ʌmˈbrelə/',   cat:'Kıyafetler',icon:'☂️', ex:'Bring an umbrella — it might rain.' },
  { en:'valley',     tr:'vadi',            ipa:'/ˈvæli/',       cat:'Doğa',      icon:'🏞️', ex:'The village is in a green valley.' },
  { en:'view',       tr:'manzara / görüş', ipa:'/vjuː/',        cat:'Genel',     icon:'🌄', ex:'There is a beautiful view from the window.' },
  { en:'visitor',    tr:'ziyaretçi',       ipa:'/ˈvɪzɪtə/',    cat:'İnsanlar',  icon:'🧳', ex:'The museum had many visitors today.' },
  { en:'vocabulary', tr:'kelime bilgisi',  ipa:'/vəˈkæbjʊlɛri/',cat:'Dil',      icon:'📖', ex:'Improve your vocabulary by reading.' },
  { en:'voice',      tr:'ses (insan)',     ipa:'/vɔɪs/',        cat:'Genel',     icon:'🗣️', ex:'She has a beautiful singing voice.' },
  { en:'waste',      tr:'israf etmek / atık',ipa:'/weɪst/',     cat:'Genel',     icon:'🗑️', ex:'Don\'t waste food.' },
  { en:'weight',     tr:'ağırlık / kilo',  ipa:'/weɪt/',        cat:'Ölçüler',   icon:'⚖️', ex:'What is the weight of this parcel?' },
  { en:'winner',     tr:'kazanan',         ipa:'/ˈwɪnə/',       cat:'Spor',      icon:'🏆', ex:'The winner got a gold medal.' },
  { en:'wood',       tr:'ahşap / ağaç',    ipa:'/wʊd/',         cat:'Doğa',      icon:'🌲', ex:'The house is built of wood.' },
  { en:'zoo',        tr:'hayvanat bahçesi',ipa:'/zuː/',          cat:'Yerler',    icon:'🦁', ex:'We visited the zoo last Sunday.' },
  { en:'loser',      tr:'kaybeden',        ipa:'/ˈluːzə/',      cat:'Spor',      icon:'😔', ex:'Be a good loser — don\'t be angry.' },
  { en:'visitor',    tr:'ziyaretçi / misafir',ipa:'/ˈvɪzɪtə/', cat:'İnsanlar',  icon:'🧳', ex:'We had a visitor this afternoon.' },
  { en:'winner',     tr:'birinci',         ipa:'/ˈwɪnə/',       cat:'Genel',     icon:'🥇', ex:'She was the winner of the competition.' },
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
