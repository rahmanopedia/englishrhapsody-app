const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');
const existing = new Set(WORDS.map(w => w.en.toLowerCase().trim()));

const newA1 = [
  // ── Completely new verbs ──────────────────────────────────────────────────
  { en:'afford',     tr:'karşılayabilmek', ipa:'/əˈfɔːd/',       cat:'Fiiller',   icon:'💰', ex:'I cannot afford a new car.' },
  { en:'admit',      tr:'kabul etmek',     ipa:'/ədˈmɪt/',       cat:'Fiiller',   icon:'💬', ex:'He admitted he was wrong.' },
  { en:'borrow',     tr:'ödünç almak',     ipa:'/ˈbɒrəʊ/',       cat:'Fiiller',   icon:'📚', ex:'Can I borrow your pen?' },
  { en:'lend',       tr:'ödünç vermek',    ipa:'/lend/',          cat:'Fiiller',   icon:'🤝', ex:'She lent him her bicycle.' },
  { en:'count',      tr:'saymak',          ipa:'/kaʊnt/',         cat:'Fiiller',   icon:'🔢', ex:'Count the students in the room.' },
  { en:'guess',      tr:'tahmin etmek',    ipa:'/ɡes/',           cat:'Fiiller',   icon:'🤔', ex:'Guess my age!' },
  { en:'imagine',    tr:'hayal etmek',     ipa:'/ɪˈmædʒɪn/',    cat:'Fiiller',   icon:'💭', ex:'Imagine living near the sea.' },
  { en:'introduce',  tr:'tanıştırmak',     ipa:'/ˌɪntrəˈdjuːs/', cat:'Fiiller',   icon:'🤝', ex:'Let me introduce my friend.' },
  { en:'invite',     tr:'davet etmek',     ipa:'/ɪnˈvaɪt/',      cat:'Fiiller',   icon:'📨', ex:'She invited everyone to her party.' },
  { en:'knock',      tr:'vurmak / çalmak', ipa:'/nɒk/',           cat:'Fiiller',   icon:'🚪', ex:'Knock on the door first.' },
  { en:'pack',       tr:'bavul yapmak / paketlemek',ipa:'/pæk/', cat:'Fiiller',   icon:'🧳', ex:'Pack your bags for the holiday.' },
  { en:'pour',       tr:'dökmek',          ipa:'/pɔː/',           cat:'Fiiller',   icon:'🫗', ex:'Pour the tea into the cup.' },
  { en:'promise',    tr:'söz vermek',      ipa:'/ˈprɒmɪs/',      cat:'Fiiller',   icon:'🤞', ex:'I promise to be on time.' },
  { en:'relax',      tr:'rahatlamak',      ipa:'/rɪˈlæks/',      cat:'Fiiller',   icon:'😌', ex:'Relax — you did a great job.' },
  { en:'remind',     tr:'hatırlatmak',     ipa:'/rɪˈmaɪnd/',     cat:'Fiiller',   icon:'🔔', ex:'Remind me to call Mum.' },
  { en:'rent',       tr:'kiralamak',       ipa:'/rent/',          cat:'Fiiller',   icon:'🏠', ex:'They rent a flat in the city.' },
  { en:'share',      tr:'paylaşmak',       ipa:'/ʃeə/',           cat:'Fiiller',   icon:'🤝', ex:'Share your sweets with your sister.' },
  { en:'spend',      tr:'harcamak',        ipa:'/spend/',         cat:'Fiiller',   icon:'💸', ex:'She spent all her pocket money.' },
  { en:'switch',     tr:'değiştirmek / açıp kapamak',ipa:'/swɪtʃ/',cat:'Fiiller',icon:'🔘', ex:'Switch the light off when you leave.' },
  { en:'wake',       tr:'uyandırmak / uyanmak',ipa:'/weɪk/',     cat:'Fiiller',   icon:'⏰', ex:'I wake up early every day.' },
  { en:'win',        tr:'kazanmak',        ipa:'/wɪn/',           cat:'Fiiller',   icon:'🏆', ex:'She won first prize.' },
  { en:'wonder',     tr:'merak etmek',     ipa:'/ˈwʌndə/',       cat:'Fiiller',   icon:'🤔', ex:'I wonder what the weather will be like.' },
  // ── New adjectives ────────────────────────────────────────────────────────
  { en:'bright',     tr:'parlak / zeki',   ipa:'/braɪt/',         cat:'Sıfatlar',  icon:'✨', ex:'She is a very bright student.' },
  { en:'broken',     tr:'kırık / bozuk',   ipa:'/ˈbrəʊkən/',     cat:'Sıfatlar',  icon:'💔', ex:'The screen is broken.' },
  { en:'cold',       tr:'soğuk',           ipa:'/kəʊld/',         cat:'Sıfatlar',  icon:'🥶', ex:'It is cold outside — wear a coat.' },
  { en:'cool',       tr:'serin / harika',  ipa:'/kuːl/',          cat:'Sıfatlar',  icon:'😎', ex:'It is cool today — wear a jacket.' },
  { en:'crowded',    tr:'kalabalık',       ipa:'/ˈkraʊdɪd/',     cat:'Sıfatlar',  icon:'👥', ex:'The market was very crowded.' },
  { en:'dead',       tr:'ölü / boş (pil)', ipa:'/ded/',           cat:'Sıfatlar',  icon:'💀', ex:'The battery is dead.' },
  { en:'delicious',  tr:'nefis / çok lezzetli',ipa:'/dɪˈlɪʃəs/', cat:'Sıfatlar', icon:'😋', ex:'The cake was absolutely delicious.' },
  { en:'empty',      tr:'boş',             ipa:'/ˈempti/',       cat:'Sıfatlar',  icon:'🕳️', ex:'The box is empty.' },
  { en:'equal',      tr:'eşit',            ipa:'/ˈiːkwəl/',      cat:'Sıfatlar',  icon:'⚖️', ex:'Both pieces are equal.' },
  { en:'final',      tr:'son / final',     ipa:'/ˈfaɪnəl/',      cat:'Sıfatlar',  icon:'🏁', ex:'This is the final exam.' },
  { en:'fit',        tr:'uygun / formda',  ipa:'/fɪt/',           cat:'Sıfatlar',  icon:'💪', ex:'This shirt does not fit me.' },
  { en:'full',       tr:'dolu',            ipa:'/fʊl/',           cat:'Sıfatlar',  icon:'🍽️', ex:'I am full — I can\'t eat another bite.' },
  { en:'glad',       tr:'memnun / sevinen',ipa:'/ɡlæd/',          cat:'Duygular',  icon:'😊', ex:'I am glad you could come.' },
  { en:'lost',       tr:'kaybolmuş',       ipa:'/lɒst/',          cat:'Sıfatlar',  icon:'🗺️', ex:'We got lost in the city.' },
  { en:'missing',    tr:'kayıp / eksik',   ipa:'/ˈmɪsɪŋ/',       cat:'Sıfatlar',  icon:'❓', ex:'One page is missing from the book.' },
  { en:'neat',       tr:'düzenli / temiz', ipa:'/niːt/',          cat:'Sıfatlar',  icon:'✨', ex:'Keep your desk neat and tidy.' },
  { en:'poor',       tr:'fakir / zavallı', ipa:'/pɔː/',           cat:'Sıfatlar',  icon:'😢', ex:'The poor dog was cold and hungry.' },
  { en:'rich',       tr:'zengin',          ipa:'/rɪtʃ/',          cat:'Sıfatlar',  icon:'💰', ex:'He is not rich but he is happy.' },
  { en:'ripe',       tr:'olgun (meyve)',   ipa:'/raɪp/',          cat:'Sıfatlar',  icon:'🍎', ex:'Wait until the bananas are ripe.' },
  { en:'silly',      tr:'saçma / aptal',   ipa:'/ˈsɪli/',        cat:'Sıfatlar',  icon:'🤪', ex:'Don\'t be silly!' },
  { en:'slow',       tr:'yavaş',           ipa:'/sləʊ/',          cat:'Sıfatlar',  icon:'🐌', ex:'The traffic was slow this morning.' },
  { en:'smart',      tr:'akıllı / şık',    ipa:'/smɑːt/',         cat:'Sıfatlar',  icon:'🧠', ex:'She looks very smart in that suit.' },
  { en:'straight',   tr:'düz',             ipa:'/streɪt/',        cat:'Sıfatlar',  icon:'📏', ex:'Stand up straight.' },
  { en:'strange',    tr:'garip / tuhaf',   ipa:'/streɪndʒ/',     cat:'Sıfatlar',  icon:'🤨', ex:'That is a strange noise.' },
  { en:'strong',     tr:'güçlü',           ipa:'/strɒŋ/',         cat:'Sıfatlar',  icon:'💪', ex:'He is strong enough to lift the box.' },
  { en:'sunny',      tr:'güneşli',         ipa:'/ˈsʌni/',        cat:'Hava',      icon:'☀️', ex:'It is sunny today.' },
  { en:'tiny',       tr:'minicik / küçücük',ipa:'/ˈtaɪni/',      cat:'Sıfatlar',  icon:'🐜', ex:'There is a tiny spider on the wall.' },
  { en:'weak',       tr:'zayıf',           ipa:'/wiːk/',          cat:'Sıfatlar',  icon:'😔', ex:'She felt weak after the illness.' },
  { en:'yellow',     tr:'sarı',            ipa:'/ˈjeləʊ/',       cat:'Renkler',   icon:'💛', ex:'The sun is bright yellow.' },
  // ── New nouns ─────────────────────────────────────────────────────────────
  { en:'bin',        tr:'çöp kutusu',      ipa:'/bɪn/',           cat:'Ev',        icon:'🗑️', ex:'Put the rubbish in the bin.' },
  { en:'blanket',    tr:'battaniye',       ipa:'/ˈblæŋkɪt/',     cat:'Ev',        icon:'🛏️', ex:'She pulled the blanket over her.' },
  { en:'pillow',     tr:'yastık',          ipa:'/ˈpɪləʊ/',       cat:'Ev',        icon:'🛏️', ex:'She needs a softer pillow.' },
  { en:'shelf',      tr:'raf',             ipa:'/ʃelf/',          cat:'Ev',        icon:'📚', ex:'Put the book back on the shelf.' },
  { en:'corner',     tr:'köşe',            ipa:'/ˈkɔːnə/',       cat:'Genel',     icon:'📐', ex:'Wait for me at the corner.' },
  { en:'step',       tr:'adım / basamak',  ipa:'/step/',          cat:'Genel',     icon:'👣', ex:'Mind the step at the door.' },
  { en:'turn',       tr:'sıra / viraj',    ipa:'/tɜːn/',          cat:'Genel',     icon:'🔄', ex:'It is your turn.' },
  { en:'chance',     tr:'şans / fırsat',   ipa:'/tʃɑːns/',       cat:'Genel',     icon:'🍀', ex:'Give me one more chance.' },
  { en:'choice',     tr:'seçim',           ipa:'/tʃɔɪs/',        cat:'Genel',     icon:'☑️', ex:'It was a difficult choice.' },
  { en:'mistake',    tr:'hata',            ipa:'/mɪˈsteɪk/',     cat:'Genel',     icon:'❌', ex:'I made a mistake in my homework.' },
  { en:'sign',       tr:'tabela / işaret', ipa:'/saɪn/',          cat:'Genel',     icon:'🪧', ex:'Follow the signs to the exit.' },
  { en:'colour',     tr:'renk',            ipa:'/ˈkʌlə/',        cat:'Genel',     icon:'🌈', ex:'Use different colours for the chart.' },
  { en:'noise',      tr:'gürültü',         ipa:'/nɔɪz/',          cat:'Genel',     icon:'🔊', ex:'Please keep the noise down.' },
  { en:'space',      tr:'alan / uzay',     ipa:'/speɪs/',         cat:'Genel',     icon:'🚀', ex:'There is enough space for everyone.' },
  { en:'air',        tr:'hava',            ipa:'/eə/',            cat:'Doğa',      icon:'💨', ex:'The air in the mountains is clean.' },
  { en:'nature',     tr:'doğa',            ipa:'/ˈneɪtʃə/',      cat:'Doğa',      icon:'🌿', ex:'She loves being in nature.' },
  { en:'environment',tr:'çevre',           ipa:'/ɪnˈvaɪrənmənt/',cat:'Doğa',      icon:'🌍', ex:'We must protect the environment.' },
  { en:'neighbour',  tr:'komşu',           ipa:'/ˈneɪbə/',       cat:'İnsanlar',  icon:'🏠', ex:'My neighbour is very kind.' },
  { en:'stranger',   tr:'yabancı',         ipa:'/ˈstreɪndʒə/',   cat:'İnsanlar',  icon:'🧑', ex:'Do not talk to strangers.' },
  { en:'crowd',      tr:'kalabalık',       ipa:'/kraʊd/',         cat:'İnsanlar',  icon:'👥', ex:'There was a big crowd at the concert.' },
  { en:'team',       tr:'takım',           ipa:'/tiːm/',          cat:'Spor',      icon:'👥', ex:'She is the captain of the team.' },
  { en:'club',       tr:'kulüp',           ipa:'/klʌb/',          cat:'Genel',     icon:'🏅', ex:'He joined the football club.' },
  { en:'class',      tr:'sınıf',           ipa:'/klɑːs/',         cat:'Okul',      icon:'🏫', ex:'There are thirty students in my class.' },
  { en:'group',      tr:'grup',            ipa:'/ɡruːp/',        cat:'Genel',     icon:'👥', ex:'Work in groups of three.' },
  { en:'noise',      tr:'ses / gürültü',   ipa:'/nɔɪz/',          cat:'Genel',     icon:'🔊', ex:'What is that noise?' },
  { en:'break',      tr:'ara / teneffüs',  ipa:'/breɪk/',         cat:'Okul',      icon:'⏸️', ex:'We have a fifteen-minute break.' },
  { en:'picnic',     tr:'piknik',          ipa:'/ˈpɪknɪk/',      cat:'Eğlence',   icon:'🧺', ex:'We had a picnic in the park.' },
  { en:'barbecue',   tr:'barbekü',         ipa:'/ˈbɑːbɪkjuː/',  cat:'Eğlence',   icon:'🍖', ex:'We had a barbecue in the garden.' },
  { en:'concert',    tr:'konser',          ipa:'/ˈkɒnsət/',      cat:'Eğlence',   icon:'🎸', ex:'We went to a pop concert last night.' },
  { en:'festival',   tr:'festival',        ipa:'/ˈfestɪvəl/',    cat:'Eğlence',   icon:'🎪', ex:'The summer festival is in July.' },
  { en:'exhibition', tr:'sergi',           ipa:'/ˌeksɪˈbɪʃən/', cat:'Eğlence',   icon:'🖼️', ex:'We visited an art exhibition.' },
  { en:'show',       tr:'gösteri / program',ipa:'/ʃəʊ/',          cat:'Eğlence',   icon:'🎭', ex:'We watched a comedy show on TV.' },
  { en:'prize',      tr:'ödül',            ipa:'/praɪz/',         cat:'Genel',     icon:'🏅', ex:'She won first prize in the competition.' },
  { en:'competition',tr:'yarışma',         ipa:'/ˌkɒmpɪˈtɪʃən/',cat:'Genel',     icon:'🏅', ex:'She entered the art competition.' },
  { en:'accident',   tr:'kaza',            ipa:'/ˈæksɪdənt/',   cat:'Genel',     icon:'🚑', ex:'There was an accident on the road.' },
  { en:'emergency',  tr:'acil durum',      ipa:'/ɪˈmɜːdʒənsi/', cat:'Sağlık',    icon:'🚨', ex:'Call the emergency services.' },
  { en:'fire station',tr:'itfaiye istasyonu',ipa:'/ˈfaɪə ˌsteɪʃən/',cat:'Yerler',icon:'🚒', ex:'The fire station is near the school.' },
  { en:'police station',tr:'polis karakolu',ipa:'/pəˈliːs ˌsteɪʃən/',cat:'Yerler',icon:'🚓', ex:'Report the theft at the police station.' },
  { en:'ambulance',  tr:'ambulans',        ipa:'/ˈæmbjʊləns/',  cat:'Sağlık',    icon:'🚑', ex:'Call an ambulance — he is hurt.' },
  { en:'fire engine',tr:'itfaiye aracı',   ipa:'/ˈfaɪər ˌendʒɪn/',cat:'Ulaşım', icon:'🚒', ex:'The fire engine arrived quickly.' },
  { en:'crossroads', tr:'kavşak',          ipa:'/ˈkrɒsrəʊdz/', cat:'Coğrafya',  icon:'🛣️', ex:'Turn left at the crossroads.' },
  { en:'traffic lights',tr:'trafik ışıkları',ipa:'/ˈtræfɪk laɪts/',cat:'Ulaşım',icon:'🚦', ex:'Stop at the red traffic lights.' },
  { en:'pavement',   tr:'kaldırım',        ipa:'/ˈpeɪvmənt/',   cat:'Coğrafya',  icon:'🛤️', ex:'Walk on the pavement.' },
  { en:'zebra crossing',tr:'yaya geçidi',  ipa:'/ˈzebrə ˈkrɒsɪŋ/',cat:'Coğrafya',icon:'🚸', ex:'Cross the road at the zebra crossing.' },
  // ── Food preparation & cooking ────────────────────────────────────────────
  { en:'ingredient', tr:'malzeme / içerik',ipa:'/ɪnˈɡriːdiənt/', cat:'Yiyecekler',icon:'🥕', ex:'Mix all the ingredients together.' },
  { en:'recipe',     tr:'tarif',           ipa:'/ˈresɪpi/',      cat:'Yiyecekler',icon:'📋', ex:'Follow the recipe step by step.' },
  { en:'slice',      tr:'dilim',           ipa:'/slaɪs/',        cat:'Yiyecekler',icon:'🍕', ex:'Cut a slice of bread.' },
  { en:'piece',      tr:'parça',           ipa:'/piːs/',          cat:'Genel',     icon:'🧩', ex:'Would you like a piece of cake?' },
  { en:'portion',    tr:'porsiyon',        ipa:'/ˈpɔːʃən/',      cat:'Yiyecekler',icon:'🍽️', ex:'The portions are very large here.' },
  { en:'tablespoon', tr:'yemek kaşığı',    ipa:'/ˈteɪblspuːn/',  cat:'Yiyecekler',icon:'🥄', ex:'Add two tablespoons of sugar.' },
  { en:'teaspoon',   tr:'çay kaşığı',      ipa:'/ˈtiːspuːn/',    cat:'Yiyecekler',icon:'🥄', ex:'Add one teaspoon of salt.' },
  { en:'litre',      tr:'litre',           ipa:'/ˈliːtə/',       cat:'Ölçüler',   icon:'🫙', ex:'Buy two litres of milk.' },
  { en:'kilogram',   tr:'kilogram',        ipa:'/ˈkɪləɡræm/',   cat:'Ölçüler',   icon:'⚖️', ex:'She bought a kilogram of apples.' },
  { en:'gram',       tr:'gram',            ipa:'/ɡræm/',          cat:'Ölçüler',   icon:'⚖️', ex:'Add two hundred grams of flour.' },
  { en:'metre',      tr:'metre',           ipa:'/ˈmiːtə/',       cat:'Ölçüler',   icon:'📏', ex:'The room is five metres long.' },
  { en:'centimetre', tr:'santimetre',      ipa:'/ˈsentɪmiːtə/', cat:'Ölçüler',   icon:'📏', ex:'The line is ten centimetres long.' },
  { en:'kilometre',  tr:'kilometre',       ipa:'/kɪˈlɒmɪtə/',   cat:'Ölçüler',   icon:'🗺️', ex:'The school is two kilometres away.' },
  // ── Birthday / celebrations ───────────────────────────────────────────────
  { en:'wedding',    tr:'düğün',           ipa:'/ˈwedɪŋ/',       cat:'Eğlence',   icon:'💒', ex:'They had a beautiful wedding.' },
  { en:'celebration',tr:'kutlama',         ipa:'/ˌselɪˈbreɪʃən/',cat:'Eğlence',  icon:'🎉', ex:'It was a great celebration.' },
  { en:'invitation', tr:'davetiye',        ipa:'/ˌɪnvɪˈteɪʃən/',cat:'İletişim', icon:'✉️', ex:'I got an invitation to her party.' },
  { en:'decoration', tr:'süsleme / dekorasyon',ipa:'/ˌdekəˈreɪʃən/',cat:'Ev',   icon:'🎊', ex:'She put up Christmas decorations.' },
  { en:'candle',     tr:'mum',             ipa:'/ˈkændl/',       cat:'Genel',     icon:'🕯️', ex:'She blew out the candles on her cake.' },
  { en:'balloon',    tr:'balon',           ipa:'/bəˈluːn/',      cat:'Genel',     icon:'🎈', ex:'The balloons were red and blue.' },
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
