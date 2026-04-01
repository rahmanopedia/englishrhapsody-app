const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');
const existing = new Set(WORDS.map(w => w.en.toLowerCase().trim()));

const newA1 = [
  // ── Unique brand-new entries ──────────────────────────────────────────────
  { en:'straw',      tr:'pipet / saman',   ipa:'/strɔː/',        cat:'Genel',     icon:'🥤', ex:'She drank through a straw.' },
  { en:'lid',        tr:'kapak',           ipa:'/lɪd/',           cat:'Ev',        icon:'🍳', ex:'Put the lid on the pot.' },
  { en:'handle',     tr:'sap / tutacak',   ipa:'/ˈhændl/',       cat:'Ev',        icon:'🚪', ex:'Pull the handle to open the door.' },
  { en:'label',      tr:'etiket',          ipa:'/ˈleɪbəl/',      cat:'Genel',     icon:'🏷️', ex:'Read the label on the bottle.' },
  { en:'bin',        tr:'çöp tenekesi',    ipa:'/bɪn/',           cat:'Ev',        icon:'🗑️', ex:'Throw the rubbish in the bin.' },
  { en:'hook',       tr:'kanca',           ipa:'/hʊk/',           cat:'Ev',        icon:'🪝', ex:'Hang your coat on the hook.' },
  { en:'nail',       tr:'çivi',            ipa:'/neɪl/',          cat:'Araçlar',   icon:'🔨', ex:'Knock the nail into the wall.' },
  { en:'wire',       tr:'tel / kablo',     ipa:'/waɪə/',          cat:'Araçlar',   icon:'🔌', ex:'Connect the wire to the socket.' },
  { en:'plug',       tr:'fiş / tapa',      ipa:'/plʌɡ/',          cat:'Ev',        icon:'🔌', ex:'Plug in the charger.' },
  { en:'switch',     tr:'anahtar / düğme', ipa:'/swɪtʃ/',        cat:'Ev',        icon:'💡', ex:'Press the switch to turn on the light.' },
  { en:'torch',      tr:'el feneri',       ipa:'/tɔːtʃ/',        cat:'Ev',        icon:'🔦', ex:'Use a torch in the dark room.' },
  { en:'ladder',     tr:'merdiven',        ipa:'/ˈlædə/',        cat:'Araçlar',   icon:'🪜', ex:'He climbed the ladder to reach the roof.' },
  { en:'mat',        tr:'paspas / küçük halı',ipa:'/mæt/',       cat:'Ev',        icon:'🏡', ex:'Wipe your feet on the mat.' },
  { en:'tray',       tr:'tepsi',           ipa:'/treɪ/',          cat:'Ev',        icon:'🍽️', ex:'She brought the tea on a tray.' },
  { en:'jug',        tr:'sürahi',          ipa:'/dʒʌɡ/',          cat:'Ev',        icon:'🫗', ex:'He poured water from a jug.' },
  { en:'tin',        tr:'teneke kutu',     ipa:'/tɪn/',           cat:'Ev',        icon:'🥫', ex:'She opened a tin of tomatoes.' },
  { en:'jar',        tr:'kavanoz',         ipa:'/dʒɑː/',          cat:'Ev',        icon:'🫙', ex:'There is jam in the jar.' },
  { en:'comb',       tr:'tarak',           ipa:'/kəʊm/',          cat:'Kişisel',   icon:'🪮', ex:'She combed her hair.' },
  { en:'razor',      tr:'tıraş makinesi',  ipa:'/ˈreɪzə/',       cat:'Kişisel',   icon:'🪒', ex:'He shaved with a razor.' },
  { en:'deodorant',  tr:'deodorant',       ipa:'/diˈəʊdərənt/',  cat:'Kişisel',   icon:'🧴', ex:'She put on deodorant after her shower.' },
  { en:'hairdryer',  tr:'saç kurutma makinesi',ipa:'/ˈheədraɪə/',cat:'Kişisel',  icon:'💨', ex:'She dried her hair with a hairdryer.' },
  { en:'plaster',    tr:'yara bandı',      ipa:'/ˈplɑːstə/',     cat:'Sağlık',    icon:'🩹', ex:'Put a plaster on the cut.' },
  { en:'tissues',    tr:'kağıt mendil',    ipa:'/ˈtɪʃuːz/',      cat:'Kişisel',   icon:'🤧', ex:'She took some tissues from her bag.' },
  { en:'cotton wool',tr:'pamuk',           ipa:'/ˈkɒtən wʊl/',   cat:'Sağlık',    icon:'🩹', ex:'Clean the wound with cotton wool.' },
  { en:'calendar',   tr:'takvim',          ipa:'/ˈkælɪndə/',     cat:'Genel',     icon:'📅', ex:'Mark the date on the calendar.' },
  { en:'diary',      tr:'günlük / ajanda', ipa:'/ˈdaɪəri/',      cat:'Genel',     icon:'📓', ex:'She writes in her diary every night.' },
  { en:'poster',     tr:'afiş / poster',   ipa:'/ˈpəʊstə/',      cat:'Genel',     icon:'🖼️', ex:'She put a poster on her bedroom wall.' },
  { en:'sticker',    tr:'çıkartma / sticker',ipa:'/ˈstɪkə/',     cat:'Genel',     icon:'⭐', ex:'She decorated her notebook with stickers.' },
  { en:'flag',       tr:'bayrak',          ipa:'/flæɡ/',          cat:'Genel',     icon:'🏳️', ex:'Each country has its own flag.' },
  { en:'coin',       tr:'madeni para',     ipa:'/kɔɪn/',          cat:'Genel',     icon:'🪙', ex:'She found a coin on the ground.' },
  { en:'note',       tr:'kağıt para',      ipa:'/nəʊt/',          cat:'Genel',     icon:'💵', ex:'She paid with a ten-pound note.' },
  { en:'purse',      tr:'para çantası',    ipa:'/pɜːs/',          cat:'Kişisel',   icon:'👛', ex:'She kept her money in her purse.' },
  { en:'drawer',     tr:'çekmece',         ipa:'/drɔː/',          cat:'Ev',        icon:'🗄️', ex:'The knife is in the drawer.' },
  { en:'wardrobe',   tr:'gardırop',        ipa:'/ˈwɔːdrəʊb/',   cat:'Ev',        icon:'👔', ex:'She opened her wardrobe to choose a dress.' },
  { en:'hanger',     tr:'elbise askısı',   ipa:'/ˈhæŋə/',        cat:'Ev',        icon:'👕', ex:'Hang your shirt on the hanger.' },
  { en:'cushion',    tr:'minder / yastık', ipa:'/ˈkʊʃən/',       cat:'Ev',        icon:'🛋️', ex:'She placed cushions on the sofa.' },
  { en:'remote control',tr:'uzaktan kumanda',ipa:'/rɪˌməʊt kənˈtrəʊl/',cat:'Ev',icon:'📺', ex:'Where is the remote control?' },
  { en:'alarm clock',tr:'çalar saat',      ipa:'/əˈlɑːm klɒk/', cat:'Ev',        icon:'⏰', ex:'She set her alarm clock for seven.' },
  { en:'computer',   tr:'bilgisayar',      ipa:'/kəmˈpjuːtə/',  cat:'Teknoloji', icon:'💻', ex:'He uses a computer for work.' },
  { en:'internet',   tr:'internet',        ipa:'/ˈɪntənet/',     cat:'Teknoloji', icon:'🌐', ex:'I looked it up on the internet.' },
  { en:'television', tr:'televizyon',      ipa:'/ˈtelɪvɪʒən/',  cat:'Teknoloji', icon:'📺', ex:'She watched television after dinner.' },
  { en:'website',    tr:'web sitesi',      ipa:'/ˈwebsaɪt/',    cat:'Teknoloji', icon:'🌐', ex:'Check the website for more details.' },
  { en:'email',      tr:'e-posta',         ipa:'/ˈiːmeɪl/',     cat:'Teknoloji', icon:'📧', ex:'Send me an email with the details.' },
  { en:'message',    tr:'mesaj',           ipa:'/ˈmesɪdʒ/',     cat:'İletişim',  icon:'💬', ex:'I got a message from my mum.' },
  { en:'selfie',     tr:'selfie / özçekim',ipa:'/ˈselfi/',      cat:'Teknoloji', icon:'🤳', ex:'They took a selfie at the beach.' },
  { en:'post',       tr:'gönderi (sosyal medya)',ipa:'/pəʊst/',  cat:'Teknoloji', icon:'📱', ex:'She posted a photo on social media.' },
  { en:'app',        tr:'uygulama',        ipa:'/æp/',            cat:'Teknoloji', icon:'📱', ex:'Download the app on your phone.' },
  { en:'video',      tr:'video',           ipa:'/ˈvɪdiəʊ/',     cat:'Teknoloji', icon:'🎥', ex:'She watched a funny video.' },
  { en:'photo',      tr:'fotoğraf',        ipa:'/ˈfəʊtəʊ/',     cat:'Teknoloji', icon:'📷', ex:'She took a photo of the view.' },
  // ── Sports & Games ────────────────────────────────────────────────────────
  { en:'goalkeeper', tr:'kaleci',          ipa:'/ˈɡəʊlkiːpə/',  cat:'Spor',      icon:'🥅', ex:'The goalkeeper stopped the ball.' },
  { en:'referee',    tr:'hakem',           ipa:'/ˌrefəˈriː/',   cat:'Spor',      icon:'🟨', ex:'The referee blew the whistle.' },
  { en:'whistle',    tr:'düdük',           ipa:'/ˈwɪsəl/',      cat:'Spor',      icon:'🎺', ex:'The teacher blew the whistle to start the game.' },
  { en:'helmet',     tr:'kask / miğfer',   ipa:'/ˈhelmɪt/',     cat:'Spor',      icon:'⛑️', ex:'Always wear a helmet when cycling.' },
  { en:'gym',        tr:'spor salonu',     ipa:'/dʒɪm/',         cat:'Spor',      icon:'🏋️', ex:'She goes to the gym every morning.' },
  { en:'skateboard', tr:'kaykay',          ipa:'/ˈskeɪtbɔːd/', cat:'Spor',      icon:'🛹', ex:'He learned to ride a skateboard.' },
  { en:'chess',      tr:'satranç',         ipa:'/tʃes/',         cat:'Eğlence',   icon:'♟️', ex:'They played chess for two hours.' },
  { en:'puzzle',     tr:'bulmaca / yapboz',ipa:'/ˈpʌzəl/',      cat:'Eğlence',   icon:'🧩', ex:'She did a puzzle on a rainy day.' },
  { en:'board game', tr:'kutu oyunu',      ipa:'/ˈbɔːd ɡeɪm/',  cat:'Eğlence',   icon:'🎲', ex:'They played a board game after dinner.' },
  { en:'card game',  tr:'kart oyunu',      ipa:'/kɑːd ɡeɪm/',   cat:'Eğlence',   icon:'🃏', ex:'Let\'s play a card game.' },
  // ── Nature / environment ─────────────────────────────────────────────────
  { en:'vegetable',  tr:'sebze',           ipa:'/ˈvedʒtəbəl/',  cat:'Sebzeler',  icon:'🥦', ex:'Eat more fruit and vegetables.' },
  { en:'plant',      tr:'bitki',           ipa:'/plɑːnt/',       cat:'Doğa',      icon:'🌿', ex:'Water the plants every day.' },
  { en:'petal',      tr:'yaprak (çiçek)',  ipa:'/ˈpetl/',        cat:'Doğa',      icon:'🌸', ex:'Rose petals fell on the ground.' },
  { en:'nest',       tr:'yuva / kuş yuvası',ipa:'/nest/',        cat:'Doğa',      icon:'🐦', ex:'The bird built a nest in the tree.' },
  { en:'web',        tr:'ağ / örümcek ağı',ipa:'/web/',          cat:'Doğa',      icon:'🕸️', ex:'There is a spider web in the corner.' },
  { en:'wing',       tr:'kanat',           ipa:'/wɪŋ/',          cat:'Doğa',      icon:'🕊️', ex:'The bird spread its wings.' },
  { en:'feather',    tr:'tüy',             ipa:'/ˈfeðə/',        cat:'Doğa',      icon:'🪶', ex:'She found a feather on the ground.' },
  { en:'shell',      tr:'kabuk / midye kabuğu',ipa:'/ʃel/',      cat:'Doğa',      icon:'🐚', ex:'She collected shells on the beach.' },
  { en:'paw',        tr:'pençe / patı',    ipa:'/pɔː/',           cat:'Hayvanlar', icon:'🐾', ex:'The dog held up its paw.' },
  { en:'tail',       tr:'kuyruk',          ipa:'/teɪl/',          cat:'Hayvanlar', icon:'🐕', ex:'The dog wagged its tail.' },
  { en:'fur',        tr:'kürk / tüy',      ipa:'/fɜː/',           cat:'Hayvanlar', icon:'🐈', ex:'The cat has soft white fur.' },
  { en:'horn',       tr:'boynuz',          ipa:'/hɔːn/',          cat:'Hayvanlar', icon:'🦏', ex:'The cow has sharp horns.' },
  { en:'stripe',     tr:'çizgi / şerit',   ipa:'/straɪp/',       cat:'Genel',     icon:'🦓', ex:'Tigers have orange and black stripes.' },
  { en:'spot',       tr:'nokta / leke',    ipa:'/spɒt/',          cat:'Genel',     icon:'🐆', ex:'Leopards have dark spots.' },
  // ── Clothes / fashion ─────────────────────────────────────────────────────
  { en:'sleeve',     tr:'kol (gömlek)',    ipa:'/sliːv/',        cat:'Kıyafetler',icon:'👕', ex:'She rolled up her sleeves.' },
  { en:'collar',     tr:'yaka',            ipa:'/ˈkɒlə/',        cat:'Kıyafetler',icon:'👔', ex:'The collar was too tight.' },
  { en:'zip',        tr:'fermuar',         ipa:'/zɪp/',           cat:'Kıyafetler',icon:'🤐', ex:'Pull the zip up on your jacket.' },
  { en:'uniform',    tr:'üniforma / okul kıyafeti',ipa:'/ˈjuːnɪfɔːm/',cat:'Kıyafetler',icon:'👕', ex:'All students wear a uniform.' },
  { en:'tie',        tr:'kravat',          ipa:'/taɪ/',           cat:'Kıyafetler',icon:'👔', ex:'He wore a blue tie to the interview.' },
  { en:'shorts',     tr:'şort',            ipa:'/ʃɔːts/',        cat:'Kıyafetler',icon:'🩳', ex:'He wore shorts at the beach.' },
  { en:'swimsuit',   tr:'mayo',            ipa:'/ˈswɪmsuːt/',   cat:'Kıyafetler',icon:'🩱', ex:'She put on her swimsuit for the pool.' },
  { en:'tracksuit',  tr:'eşofman',        ipa:'/ˈtræksuːt/',   cat:'Kıyafetler',icon:'🏃', ex:'He wore a tracksuit to the gym.' },
  { en:'apron',      tr:'önlük',           ipa:'/ˈeɪprən/',     cat:'Kıyafetler',icon:'👨‍🍳', ex:'She wore an apron in the kitchen.' },
  { en:'nightgown',  tr:'gecelik',         ipa:'/ˈnaɪtɡaʊn/',  cat:'Kıyafetler',icon:'😴', ex:'She put on her nightgown before bed.' },
  // ── School / lesson extras ────────────────────────────────────────────────
  { en:'paragraph',  tr:'paragraf',        ipa:'/ˈpærəɡrɑːf/', cat:'Okul',      icon:'📝', ex:'Write a short paragraph about your family.' },
  { en:'title',      tr:'başlık',          ipa:'/ˈtaɪtl/',      cat:'Okul',      icon:'📋', ex:'Write the title at the top of the page.' },
  { en:'chapter',    tr:'bölüm (kitap)',   ipa:'/ˈtʃæptə/',     cat:'Okul',      icon:'📖', ex:'Read chapter three for homework.' },
  { en:'summary',    tr:'özet',            ipa:'/ˈsʌməri/',     cat:'Okul',      icon:'📝', ex:'Write a summary of the story.' },
  { en:'clue',       tr:'ipucu',           ipa:'/kluː/',          cat:'Okul',      icon:'🔍', ex:'Use the clue to find the answer.' },
  { en:'gap',        tr:'boşluk',          ipa:'/ɡæp/',           cat:'Okul',      icon:'🕳️', ex:'Fill in the gap with the correct word.' },
  // ── Misc ─────────────────────────────────────────────────────────────────
  { en:'forward',    tr:'ileri / öne',     ipa:'/ˈfɔːwəd/',     cat:'Yönler',    icon:'➡️', ex:'Move forward three steps.' },
  { en:'backward',   tr:'geri / arkaya',   ipa:'/ˈbækwəd/',     cat:'Yönler',    icon:'⬅️', ex:'She walked backward.' },
  { en:'upstairs',   tr:'yukarı kat',      ipa:'/ˌʌpˈsteəz/',   cat:'Yönler',    icon:'⬆️', ex:'Her bedroom is upstairs.' },
  { en:'downstairs', tr:'aşağı kat',       ipa:'/ˌdaʊnˈsteəz/', cat:'Yönler',    icon:'⬇️', ex:'The kitchen is downstairs.' },
  { en:'indoor',     tr:'iç mekan',        ipa:'/ˈɪndɔː/',      cat:'Genel',     icon:'🏠', ex:'We played an indoor game.' },
  { en:'outdoor',    tr:'dış mekan / açık hava',ipa:'/ˈaʊtdɔː/',cat:'Genel',    icon:'🌳', ex:'She loves outdoor activities.' },
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
