const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const arrStr = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
const WORDS = eval('(' + arrStr + ')');
const existing = new Set(WORDS.map(w => w.en.toLowerCase().trim()));

const newA1 = [
  // ── Verbs (new unique ones) ────────────────────────────────────────────────
  { en:'add',        tr:'eklemek',         ipa:'/æd/',            cat:'Fiiller',   icon:'➕', ex:'Add two numbers together.' },
  { en:'subtract',   tr:'çıkarmak',        ipa:'/səbˈtrækt/',    cat:'Fiiller',   icon:'➖', ex:'Subtract five from ten.' },
  { en:'divide',     tr:'bölmek',          ipa:'/dɪˈvaɪd/',      cat:'Fiiller',   icon:'➗', ex:'Divide the cake into eight slices.' },
  { en:'multiply',   tr:'çarpmak',         ipa:'/ˈmʌltɪplaɪ/',  cat:'Fiiller',   icon:'✖️', ex:'Multiply three by four.' },
  { en:'fill',       tr:'doldurmak',       ipa:'/fɪl/',           cat:'Fiiller',   icon:'🫙', ex:'Fill the glass with water.' },
  { en:'empty',      tr:'boşaltmak',       ipa:'/ˈempti/',       cat:'Fiiller',   icon:'🫙', ex:'Empty the bin before you go out.' },
  { en:'cover',      tr:'kaplamak / örtmek',ipa:'/ˈkʌvə/',       cat:'Fiiller',   icon:'🛏️', ex:'Cover the pot with a lid.' },
  { en:'wrap',       tr:'sarmak',          ipa:'/ræp/',           cat:'Fiiller',   icon:'🎁', ex:'She wrapped the present in paper.' },
  { en:'open',       tr:'açmak',           ipa:'/ˈəʊpən/',       cat:'Fiiller',   icon:'🔓', ex:'Open the box carefully.' },
  { en:'close',      tr:'kapatmak',        ipa:'/kləʊz/',        cat:'Fiiller',   icon:'🔒', ex:'Close the fridge door.' },
  { en:'connect',    tr:'bağlamak',        ipa:'/kəˈnekt/',      cat:'Fiiller',   icon:'🔗', ex:'Connect the cable to the computer.' },
  { en:'download',   tr:'indirmek',        ipa:'/ˈdaʊnləʊd/',   cat:'Fiiller',   icon:'⬇️', ex:'Download the app to your phone.' },
  { en:'upload',     tr:'yüklemek',        ipa:'/ˈʌpləʊd/',     cat:'Fiiller',   icon:'⬆️', ex:'Upload the photo to the website.' },
  { en:'charge',     tr:'şarj etmek',      ipa:'/tʃɑːdʒ/',      cat:'Fiiller',   icon:'🔋', ex:'Charge your phone overnight.' },
  { en:'press',      tr:'basmak',          ipa:'/pres/',          cat:'Fiiller',   icon:'👆', ex:'Press the button to start.' },
  { en:'click',      tr:'tıklamak',        ipa:'/klɪk/',          cat:'Fiiller',   icon:'🖱️', ex:'Click the link to open the page.' },
  { en:'scroll',     tr:'kaydırmak',       ipa:'/skrəʊl/',       cat:'Fiiller',   icon:'📱', ex:'Scroll down to see more.' },
  { en:'zoom',       tr:'yakınlaştırmak',  ipa:'/zuːm/',          cat:'Fiiller',   icon:'🔍', ex:'Zoom in to see the photo more clearly.' },
  { en:'record',     tr:'kaydetmek (video/ses)',ipa:'/rɪˈkɔːd/', cat:'Fiiller',   icon:'🎙️', ex:'Record the lesson so you can watch later.' },
  { en:'sort',       tr:'sıralamak / ayırmak',ipa:'/sɔːt/',      cat:'Fiiller',   icon:'🗂️', ex:'Sort the cards into two groups.' },
  { en:'match',      tr:'eşleştirmek',     ipa:'/mætʃ/',          cat:'Fiiller',   icon:'🔗', ex:'Match the words to the pictures.' },
  { en:'colour',     tr:'renklendirmek',   ipa:'/ˈkʌlə/',        cat:'Fiiller',   icon:'🖌️', ex:'Colour the picture with your crayons.' },
  { en:'underline',  tr:'altını çizmek',   ipa:'/ˌʌndəˈlaɪn/',  cat:'Fiiller',   icon:'📝', ex:'Underline the correct answer.' },
  { en:'circle',     tr:'yuvarlak içine almak',ipa:'/ˈsɜːkl/',   cat:'Fiiller',   icon:'⭕', ex:'Circle the odd word.' },
  { en:'tick',       tr:'işaretlemek',     ipa:'/tɪk/',           cat:'Fiiller',   icon:'✅', ex:'Tick the correct answer.' },
  { en:'cross out',  tr:'üstünü çizmek',   ipa:'/krɒs aʊt/',     cat:'Fiiller',   icon:'❌', ex:'Cross out the wrong answer.' },
  { en:'complete',   tr:'tamamlamak',      ipa:'/kəmˈpliːt/',    cat:'Fiiller',   icon:'✅', ex:'Complete the sentence.' },
  { en:'translate',  tr:'çevirmek',        ipa:'/trænsˈleɪt/',   cat:'Fiiller',   icon:'🌐', ex:'Translate the word into English.' },
  { en:'pronounce',  tr:'telaffuz etmek',  ipa:'/prəˈnaʊns/',    cat:'Fiiller',   icon:'🗣️', ex:'How do you pronounce this word?' },
  { en:'spell',      tr:'hecelemek',       ipa:'/spel/',          cat:'Fiiller',   icon:'🔤', ex:'Spell your name please.' },
  { en:'guess',      tr:'tahmin etmek',    ipa:'/ɡes/',           cat:'Fiiller',   icon:'🤔', ex:'Guess the number I am thinking of.' },
  { en:'win',        tr:'kazanmak',        ipa:'/wɪn/',           cat:'Fiiller',   icon:'🏆', ex:'Our team won the match.' },
  { en:'lose',       tr:'kaybetmek (maç)',  ipa:'/luːz/',          cat:'Fiiller',   icon:'😢', ex:'We lost the game by one point.' },
  { en:'score',      tr:'gol atmak / puan yapmak',ipa:'/skɔː/',  cat:'Fiiller',   icon:'⚽', ex:'She scored three goals.' },
  { en:'pass',       tr:'geçmek / geçirmek',ipa:'/pɑːs/',         cat:'Fiiller',   icon:'✅', ex:'She passed the driving test.' },
  { en:'fail',       tr:'başarısız olmak', ipa:'/feɪl/',           cat:'Fiiller',   icon:'❌', ex:'He failed the exam.' },
  // ── Classroom / Language tools ─────────────────────────────────────────────
  { en:'crayon',     tr:'boya kalemi',     ipa:'/ˈkreɪɒn/',      cat:'Okul',      icon:'🖍️', ex:'Colour the picture with crayons.' },
  { en:'highlighter',tr:'fosforlu kalem',  ipa:'/ˈhaɪlaɪtə/',   cat:'Okul',      icon:'🖊️', ex:'Use a highlighter for important words.' },
  { en:'glue',       tr:'yapıştırıcı',     ipa:'/ɡluː/',          cat:'Okul',      icon:'🔧', ex:'Stick the pictures with glue.' },
  { en:'tape',       tr:'bant',            ipa:'/teɪp/',          cat:'Okul',      icon:'🎁', ex:'Use tape to attach the poster.' },
  { en:'whiteboard', tr:'beyaz tahta',     ipa:'/ˈwaɪtbɔːd/',   cat:'Okul',      icon:'📋', ex:'Write the words on the whiteboard.' },
  { en:'projector',  tr:'projektör',       ipa:'/prəˈdʒektə/',   cat:'Okul',      icon:'📽️', ex:'The teacher used a projector to show the video.' },
  { en:'flashcard',  tr:'kartela / kelime kartı',ipa:'/ˈflæʃkɑːd/',cat:'Okul',   icon:'🃏', ex:'Study the new words with flashcards.' },
  { en:'worksheet',  tr:'çalışma kâğıdı', ipa:'/ˈwɜːkʃiːt/',   cat:'Okul',      icon:'📄', ex:'Complete the worksheet for tomorrow.' },
  { en:'textbook',   tr:'ders kitabı',     ipa:'/ˈtekstbʊk/',   cat:'Okul',      icon:'📚', ex:'Open your textbook at page twelve.' },
  { en:'activity',   tr:'etkinlik / aktivite',ipa:'/ækˈtɪvɪti/', cat:'Okul',      icon:'✏️', ex:'Do the activity at the bottom of the page.' },
  // ── House / Rooms ─────────────────────────────────────────────────────────
  { en:'flat',       tr:'daire',           ipa:'/flæt/',          cat:'Ev',        icon:'🏢', ex:'She lives in a flat on the fifth floor.' },
  { en:'house',      tr:'ev / müstakil ev',ipa:'/haʊs/',          cat:'Ev',        icon:'🏠', ex:'They bought a house in the village.' },
  { en:'apartment',  tr:'apartman dairesi',ipa:'/əˈpɑːtmənt/',   cat:'Ev',        icon:'🏢', ex:'He rents an apartment in the city.' },
  { en:'building',   tr:'bina',            ipa:'/ˈbɪldɪŋ/',      cat:'Ev',        icon:'🏢', ex:'The office is in that tall building.' },
  { en:'lift',       tr:'asansör',         ipa:'/lɪft/',          cat:'Ev',        icon:'🛗', ex:'Take the lift to the fourth floor.' },
  { en:'heating',    tr:'ısıtma sistemi',  ipa:'/ˈhiːtɪŋ/',      cat:'Ev',        icon:'🔥', ex:'Turn on the heating — it is cold.' },
  { en:'parking',    tr:'otopark',         ipa:'/ˈpɑːkɪŋ/',      cat:'Ev',        icon:'🅿️', ex:'There is free parking at the supermarket.' },
  // ── Personal Items ────────────────────────────────────────────────────────
  { en:'purse',      tr:'cüzdan / para çantası',ipa:'/pɜːs/',     cat:'Aksesuar',  icon:'👛', ex:'She put the coins in her purse.' },
  { en:'wallet',     tr:'cüzdan',          ipa:'/ˈwɒlɪt/',       cat:'Aksesuar',  icon:'👛', ex:'He forgot his wallet at home.' },
  { en:'keys',       tr:'anahtarlar',      ipa:'/kiːz/',          cat:'Genel',     icon:'🔑', ex:'Don\'t forget your keys.' },
  { en:'sunglasses', tr:'güneş gözlüğü',  ipa:'/ˈsʌnɡlɑːsɪz/', cat:'Aksesuar',  icon:'🕶️', ex:'She wore sunglasses on the beach.' },
  { en:'backpack',   tr:'sırt çantası',    ipa:'/ˈbækpæk/',      cat:'Aksesuar',  icon:'🎒', ex:'She carried all her books in her backpack.' },
  { en:'handbag',    tr:'el çantası',      ipa:'/ˈhændbæɡ/',     cat:'Aksesuar',  icon:'👜', ex:'She left her handbag on the chair.' },
  // ── At the restaurant / shopping ─────────────────────────────────────────
  { en:'menu',       tr:'menü',            ipa:'/ˈmenjuː/',       cat:'Restoran',  icon:'🍽️', ex:'Can I see the menu please?' },
  { en:'order',      tr:'sipariş vermek',  ipa:'/ˈɔːdə/',        cat:'Restoran',  icon:'🛎️', ex:'Are you ready to order?' },
  { en:'waiter',     tr:'garson (erkek)',  ipa:'/ˈweɪtə/',       cat:'Restoran',  icon:'🧑‍🍳', ex:'The waiter brought the food.' },
  { en:'waitress',   tr:'garson (kadın)', ipa:'/ˈweɪtrɪs/',     cat:'Restoran',  icon:'🧑‍🍳', ex:'The waitress took our order.' },
  { en:'bill',       tr:'hesap',           ipa:'/bɪl/',           cat:'Restoran',  icon:'🧾', ex:'Can we have the bill, please?' },
  { en:'tip',        tr:'bahşiş',          ipa:'/tɪp/',           cat:'Restoran',  icon:'💰', ex:'They left a tip on the table.' },
  { en:'cash',       tr:'nakit',           ipa:'/kæʃ/',           cat:'Alışveriş', icon:'💵', ex:'Do you pay by cash or card?' },
  { en:'change',     tr:'para üstü',       ipa:'/tʃeɪndʒ/',      cat:'Alışveriş', icon:'🪙', ex:'Here is your change.' },
  { en:'queue',      tr:'kuyruk / sıra',   ipa:'/kjuː/',          cat:'Genel',     icon:'🧑‍🤝‍🧑', ex:'Please join the queue.' },
  // ── Feelings / emotions (new ones) ───────────────────────────────────────
  { en:'love',       tr:'aşk / sevgi',     ipa:'/lʌv/',           cat:'Duygular',  icon:'❤️', ex:'She loves her family very much.' },
  { en:'hate',       tr:'nefret',          ipa:'/heɪt/',          cat:'Duygular',  icon:'😠', ex:'I hate spiders!' },
  { en:'hope',       tr:'umut',            ipa:'/həʊp/',          cat:'Duygular',  icon:'🌟', ex:'She has hope for the future.' },
  { en:'fun',        tr:'eğlence',         ipa:'/fʌn/',           cat:'Duygular',  icon:'😄', ex:'The party was great fun.' },
  { en:'favourite',  tr:'favori',          ipa:'/ˈfeɪvərɪt/',    cat:'Genel',     icon:'⭐', ex:'What is your favourite film?' },
  // ── Numbers ───────────────────────────────────────────────────────────────
  { en:'half',       tr:'yarım / yarı',    ipa:'/hɑːf/',          cat:'Sayılar',   icon:'½', ex:'Cut the apple in half.' },
  { en:'quarter',    tr:'çeyrek',          ipa:'/ˈkwɔːtə/',      cat:'Sayılar',   icon:'¼', ex:'A quarter of the class is absent.' },
  { en:'twice',      tr:'iki kez / iki kat',ipa:'/twaɪs/',        cat:'Sayılar',   icon:'2️⃣', ex:'She visits her parents twice a week.' },
  { en:'once',       tr:'bir kez',         ipa:'/wʌns/',          cat:'Sayılar',   icon:'1️⃣', ex:'He goes to the gym once a week.' },
  { en:'dozen',      tr:'düzine (12)',      ipa:'/ˈdʌzən/',       cat:'Sayılar',   icon:'🥚', ex:'She bought a dozen eggs.' },
  { en:'pair',       tr:'çift',            ipa:'/peə/',           cat:'Sayılar',   icon:'👟', ex:'She bought a new pair of shoes.' },
  // ── Time (more) ───────────────────────────────────────────────────────────
  { en:'midnight',   tr:'gece yarısı',     ipa:'/ˈmɪdnaɪt/',     cat:'Zaman',     icon:'🌙', ex:'The party finished at midnight.' },
  { en:'noon',       tr:'öğle',            ipa:'/nuːn/',          cat:'Zaman',     icon:'☀️', ex:'We eat lunch at noon.' },
  { en:'dawn',       tr:'şafak',           ipa:'/dɔːn/',          cat:'Zaman',     icon:'🌅', ex:'She woke up at dawn.' },
  { en:'dusk',       tr:'alacakaranlık',   ipa:'/dʌsk/',          cat:'Zaman',     icon:'🌆', ex:'They walked home at dusk.' },
  { en:'past',       tr:'geçti (saat için)',ipa:'/pɑːst/',        cat:'Zaman',     icon:'⏰', ex:'It is twenty past three.' },
  { en:'to',         tr:'kala (saat için)',ipa:'/tuː/',            cat:'Zaman',     icon:'⏰', ex:'It is ten to four.' },
  // ── Basic Grammar & Useful Phrases ───────────────────────────────────────
  { en:'this',       tr:'bu',              ipa:'/ðɪs/',           cat:'Göstericiler',icon:'👆', ex:'This is my book.' },
  { en:'that',       tr:'şu / o',          ipa:'/ðæt/',           cat:'Göstericiler',icon:'👇', ex:'That is a beautiful picture.' },
  { en:'these',      tr:'bunlar',          ipa:'/ðiːz/',          cat:'Göstericiler',icon:'👆', ex:'These are my friends.' },
  { en:'those',      tr:'şunlar / onlar',  ipa:'/ðəʊz/',          cat:'Göstericiler',icon:'👇', ex:'Those books belong to the teacher.' },
  { en:'here',       tr:'burada',          ipa:'/hɪə/',           cat:'Zarflar',   icon:'📍', ex:'Come here, please.' },
  { en:'there',      tr:'orada',           ipa:'/ðeə/',           cat:'Zarflar',   icon:'📍', ex:'Put the box over there.' },
  { en:'yes',        tr:'evet',            ipa:'/jes/',           cat:'İfadeler',  icon:'✅', ex:'Yes, I would like some tea.' },
  { en:'no',         tr:'hayır',           ipa:'/nəʊ/',           cat:'İfadeler',  icon:'❌', ex:'No, thank you.' },
  { en:'please',     tr:'lütfen',          ipa:'/pliːz/',         cat:'İfadeler',  icon:'🙏', ex:'Can you help me, please?' },
  { en:'thank you',  tr:'teşekkür ederim', ipa:'/θæŋk juː/',     cat:'İfadeler',  icon:'🙏', ex:'Thank you for your help.' },
  { en:'sorry',      tr:'özür dilerim',    ipa:'/ˈsɒri/',        cat:'İfadeler',  icon:'😔', ex:'Sorry, I did not hear you.' },
  { en:'hello',      tr:'merhaba',         ipa:'/həˈləʊ/',       cat:'İfadeler',  icon:'👋', ex:'Hello! My name is Ali.' },
  { en:'goodbye',    tr:'hoşça kal',       ipa:'/ˌɡʊdˈbaɪ/',    cat:'İfadeler',  icon:'👋', ex:'Goodbye! See you tomorrow.' },
  // ── Rooms in home ─────────────────────────────────────────────────────────
  { en:'entrance',   tr:'giriş',           ipa:'/ˈentrəns/',     cat:'Ev',        icon:'🚪', ex:'Leave your shoes at the entrance.' },
  { en:'exit',       tr:'çıkış',           ipa:'/ˈeksɪt/',       cat:'Ev',        icon:'🚪', ex:'The emergency exit is at the back.' },
  { en:'hall',       tr:'koridor / hol',   ipa:'/hɔːl/',          cat:'Ev',        icon:'🚪', ex:'The hall leads to all the rooms.' },
  { en:'basement',   tr:'bodrum katı',     ipa:'/ˈbeɪsmənt/',   cat:'Ev',        icon:'🏚️', ex:'He keeps his tools in the basement.' },
  { en:'attic',      tr:'tavan arası',     ipa:'/ˈætɪk/',        cat:'Ev',        icon:'🏠', ex:'Old boxes are stored in the attic.' },
  // ── More Animals ─────────────────────────────────────────────────────────
  { en:'goldfish',   tr:'akvaryum balığı', ipa:'/ˈɡəʊldfɪʃ/',   cat:'Hayvanlar', icon:'🐟', ex:'She keeps a goldfish in a bowl.' },
  { en:'ladybird',   tr:'uğur böceği',     ipa:'/ˈleɪdibɜːd/',  cat:'Hayvanlar', icon:'🐞', ex:'A ladybird landed on her hand.' },
  { en:'swan',       tr:'kuğu',            ipa:'/swɒn/',          cat:'Hayvanlar', icon:'🦢', ex:'Swans swim on the lake.' },
  { en:'pigeon',     tr:'güvercin',        ipa:'/ˈpɪdʒɪn/',     cat:'Hayvanlar', icon:'🕊️', ex:'Pigeons sit on the roof.' },
  { en:'sparrow',    tr:'serçe',           ipa:'/ˈspærəʊ/',      cat:'Hayvanlar', icon:'🐦', ex:'A sparrow sat on the branch.' },
  { en:'deer',       tr:'geyik',           ipa:'/dɪə/',           cat:'Hayvanlar', icon:'🦌', ex:'We saw a deer in the forest.' },
  { en:'squirrel',   tr:'sincap',          ipa:'/ˈskwɪrəl/',     cat:'Hayvanlar', icon:'🐿️', ex:'The squirrel hid its nuts.' },
  { en:'hedgehog',   tr:'kirpi',           ipa:'/ˈhedʒhɒɡ/',    cat:'Hayvanlar', icon:'🦔', ex:'A hedgehog came into the garden.' },
  // ── Household chores ──────────────────────────────────────────────────────
  { en:'tidy',       tr:'düzenlemek / toplamak',ipa:'/ˈtaɪdi/',   cat:'Ev',        icon:'🧹', ex:'Tidy your room before dinner.' },
  { en:'vacuum',     tr:'elektrikli süpürge',ipa:'/ˈvækjuəm/',   cat:'Ev',        icon:'🧹', ex:'She vacuums the carpet every week.' },
  { en:'mop',        tr:'paspaslamak',      ipa:'/mɒp/',           cat:'Ev',        icon:'🧹', ex:'Mop the kitchen floor.' },
  { en:'sweep',      tr:'süpürmek',         ipa:'/swiːp/',         cat:'Ev',        icon:'🧹', ex:'Sweep the leaves from the path.' },
  { en:'iron',       tr:'ütülemek',         ipa:'/ˈaɪən/',        cat:'Ev',        icon:'👔', ex:'She ironed her shirt for work.' },
  // ── Feelings (simple words) ───────────────────────────────────────────────
  { en:'miss',       tr:'özlemek',          ipa:'/mɪs/',           cat:'Duygular',  icon:'💔', ex:'I miss my hometown.' },
  { en:'enjoy',      tr:'keyif almak / zevk almak',ipa:'/ɪnˈdʒɔɪ/',cat:'Duygular',icon:'😊', ex:'Did you enjoy the film?' },
  { en:'surprise',   tr:'şaşırtmak',       ipa:'/səˈpraɪz/',     cat:'Duygular',  icon:'🎁', ex:'She surprised him with a gift.' },
  { en:'smile',      tr:'gülümsemek',      ipa:'/smaɪl/',         cat:'Duygular',  icon:'😊', ex:'She smiled when she saw him.' },
  { en:'laugh',      tr:'gülmek (sesli)',   ipa:'/lɑːf/',          cat:'Duygular',  icon:'😄', ex:'Everyone laughed at the joke.' },
  { en:'cry',        tr:'ağlamak',          ipa:'/kraɪ/',          cat:'Duygular',  icon:'😢', ex:'The baby started to cry.' },
  // ── Health vocab ──────────────────────────────────────────────────────────
  { en:'sneeze',     tr:'hapşırmak',        ipa:'/sniːz/',         cat:'Sağlık',    icon:'🤧', ex:'Sneeze into a tissue.' },
  { en:'cough',      tr:'öksürmek',         ipa:'/kɒf/',           cat:'Sağlık',    icon:'🤒', ex:'She coughed all night.' },
  { en:'fever',      tr:'ateş (yüksek)',    ipa:'/ˈfiːvə/',       cat:'Sağlık',    icon:'🌡️', ex:'He has a high fever.' },
  { en:'pill',       tr:'hap / tablet',     ipa:'/pɪl/',           cat:'Sağlık',    icon:'💊', ex:'Take one pill three times a day.' },
  { en:'bandage',    tr:'bandaj / sargı',   ipa:'/ˈbændɪdʒ/',    cat:'Sağlık',    icon:'🩹', ex:'She put a bandage on the cut.' },
  { en:'injection',  tr:'enjeksiyon / iğne',ipa:'/ɪnˈdʒekʃən/',  cat:'Sağlık',    icon:'💉', ex:'He was scared of the injection.' },
  // ── Sport / games ─────────────────────────────────────────────────────────
  { en:'score',      tr:'skor / puan',      ipa:'/skɔː/',          cat:'Spor',      icon:'🏅', ex:'What is the score?' },
  { en:'match',      tr:'maç',              ipa:'/mætʃ/',          cat:'Spor',      icon:'⚽', ex:'We won the match.' },
  { en:'coach',      tr:'antrenör',         ipa:'/kəʊtʃ/',        cat:'Spor',      icon:'🏋️', ex:'The coach trained the team every day.' },
  { en:'bat',        tr:'yarasa sopası / kriket sopası',ipa:'/bæt/',cat:'Spor',    icon:'🏏', ex:'He hit the ball with the bat.' },
  { en:'racket',     tr:'raket',            ipa:'/ˈrækɪt/',       cat:'Spor',      icon:'🎾', ex:'She bought a new tennis racket.' },
  { en:'net',        tr:'file / ağ',        ipa:'/net/',           cat:'Spor',      icon:'🏐', ex:'Kick the ball into the net.' },
  { en:'pitch',      tr:'saha (futbol)',     ipa:'/pɪtʃ/',          cat:'Spor',      icon:'⚽', ex:'The pitch was very muddy.' },
  { en:'pool',       tr:'yüzme havuzu',     ipa:'/puːl/',          cat:'Spor',      icon:'🏊', ex:'She swims in the pool every morning.' },
  // ── Nature extras ─────────────────────────────────────────────────────────
  { en:'pond',       tr:'gölet / havuz',    ipa:'/pɒnd/',          cat:'Doğa',      icon:'🌊', ex:'Ducks swim on the pond.' },
  { en:'bush',       tr:'çalı / funda',     ipa:'/bʊʃ/',           cat:'Doğa',      icon:'🌿', ex:'The bird built its nest in the bush.' },
  { en:'soil',       tr:'toprak',           ipa:'/sɔɪl/',          cat:'Doğa',      icon:'🌱', ex:'Plant the seeds in the soil.' },
  { en:'grass',      tr:'çimen',            ipa:'/ɡrɑːs/',        cat:'Doğa',      icon:'🌿', ex:'The grass is green after the rain.' },
  { en:'mud',        tr:'çamur',            ipa:'/mʌd/',           cat:'Doğa',      icon:'🟤', ex:'His shoes are covered in mud.' },
  { en:'bark',       tr:'kabuk (ağaç)',     ipa:'/bɑːk/',          cat:'Doğa',      icon:'🌲', ex:'The bark of the oak tree is rough.' },
  { en:'root',       tr:'kök',              ipa:'/ruːt/',          cat:'Doğa',      icon:'🌱', ex:'Trees grow their roots deep into the ground.' },
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
