const GRAMMAR_DATA = {
  levelInfo: {
    A1:{ label:'Başlangıç', color:'#10b981', glow:'rgba(16,185,129,.3)', icon:'🌱', desc:'Temel kelimeler ve basit cümleler' },
    A2:{ label:'Temel',    color:'#06b6d4', glow:'rgba(6,182,212,.3)',  icon:'🌿', desc:'Günlük yaşam konuşma kalıpları' },
    B1:{ label:'Orta',     color:'#3b82f6', glow:'rgba(59,130,246,.3)', icon:'🌊', desc:'Karmaşık cümleler ve zamanlar' },
    B2:{ label:'Orta-Üst', color:'#8b5cf6', glow:'rgba(139,92,246,.3)', icon:'⚡', desc:'İleri yapılar ve nüanslar' },
    C1:{ label:'İleri',    color:'#ec4899', glow:'rgba(236,72,153,.3)', icon:'🔥', desc:'Akademik ve profesyonel dil' },
    C2:{ label:'Uzman',    color:'#f59e0b', glow:'rgba(245,158,11,.3)', icon:'💎', desc:'Anadili konuşan seviyesi' },
  },
  rules: [

  // ══════════════ A1 ══════════════
  {
    id:'a1-tobe', level:'A1', cat:'Temel Fiiller', icon:'🔵',
    title:'To Be: am / is / are', sub:'Olmak Fiili — Varlık ve Kimlik',
    desc:'"Am, is, are" olmak fiilinin geniş zaman çekimidir. Kimlik, özellik, konum ve durum bildirmek için kullanılır.',
    contrast:'Türkçede "o doktor" denir — olmak fiili yoktur. İngilizcede "He IS a doctor" — to be her zaman zorunludur.',
    register:{ formal:90, informal:95, written:90, spoken:95 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'am/is/are',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'Tamamlayıcı',c:'#f59e0b'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'is',r:'To Be (yüklem)',c:'#10b981'},{w:'a',r:'Tanımsız artikel',c:'#f59e0b'},{w:'doctor.',r:'İsim (meslek)',c:'#8b5cf6'}],
    exs:[
      {en:'I am happy today.',        tr:'Bugün mutluyum.'},
      {en:'They are good students.',  tr:'Onlar iyi öğrenciler.'},
      {en:'The sky is not green.',    tr:'Gökyüzü yeşil değil.'},
    ],
    err:{w:'She doctor.',r:'She is a doctor.',tip:'İngilizcede olmak fiilini (is/am/are) asla atlatamazsın!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:',        words:['very','We','happy','are'],              ans:'We are very happy'},
      {type:'clash',  q:'Hangisi doğru?',                a:'He a teacher.',    b:'He is a teacher.',    correct:'b'},
      {type:'mutate', sentence:'They ___ my best friends.', opts:['am','is','are','be'],                ans:2, tip:'They → çoğul → "are" kullanılır.'},
      {type:'decode', sentence:'The weather is perfect today.', target:'is', q:'"is" burada ne görevi üstleniyor?', opts:['Nesne','Yüklem (To Be)','Zarf','Artikel'], ans:1},
    ]
  },
  {
    id:'a1-pres-simple', level:'A1', cat:'Zaman Kipleri', icon:'🟢',
    title:'Present Simple', sub:'Geniş Zaman — Alışkanlıklar ve Gerçekler',
    desc:'Rutinler, alışkanlıklar ve değişmeyen gerçekler için kullanılır. 3. tekil şahısta (he/she/it) fiile -s/-es eklenir.',
    contrast:'Türkçede "o çalışır" — fiil her zaman özneye uyar. İngilizcede sadece he/she/it için -s eklenir, diğerleri değişmez.',
    register:{ formal:85, informal:90, written:85, spoken:90 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'Fiil (+s/es)',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'Nesne/Zarf',c:'#f59e0b'}],
    dna:[{w:'She',r:'Özne (3. tekil)',c:'#3b82f6'},{w:'reads',r:'Fiil+s (3. şahıs)',c:'#10b981'},{w:'books',r:'Nesne',c:'#f59e0b'},{w:'every night.',r:'Zaman zarfı',c:'#8b5cf6'}],
    exs:[
      {en:'She reads books every night.',   tr:'O her gece kitap okur.'},
      {en:'Water boils at 100 degrees.',    tr:'Su 100 derecede kaynar.'},
      {en:'They do not work on Sundays.',   tr:'Onlar Pazar günleri çalışmaz.'},
    ],
    err:{w:'She read books every day.',r:'She reads books every day.',tip:'3. tekil şahıs (he/she/it) için fiile -s/-es ekle!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:',         words:['every','morning','He','runs'],           ans:'He runs every morning'},
      {type:'clash',  q:'Hangisi doğru?',                 a:'They plays football.',  b:'They play football.',  correct:'b'},
      {type:'mutate', sentence:'My sister ___ in a hospital.', opts:['work','works','working','worked'],   ans:1, tip:'She → 3. tekil → -s ekle.'},
      {type:'decode', sentence:'The sun rises in the east.',   target:'rises', q:'"rises" bu cümlede ne?', opts:['Özne','Fiil (3. tekil)','Nesne','Sıfat'], ans:1},
    ]
  },
  {
    id:'a1-pres-neg', level:'A1', cat:'Zaman Kipleri', icon:'🔴',
    title:'Present Simple — Olumsuz', sub:'do not / does not',
    desc:'Olumsuz cümleler için "do not (don\'t)" veya "does not (doesn\'t)" kullanılır. 3. tekil şahısta "does not" gelir, asıl fiile -s eklenmez.',
    contrast:'Türkçede "çalışmaz" — olumsuzluk eke gelir. İngilizcede yardımcı fiil (do/does) + not + yalın fiil kullanılır.',
    register:{ formal:80, informal:90, written:80, spoken:90 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'do/does not',c:'#ef4444'},{t:'+',c:'#6b7280'},{t:'Fiil (yalın)',c:'#10b981'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'does not',r:'Olumsuz yardımcı',c:'#ef4444'},{w:'like',r:'Fiil (yalın)',c:'#10b981'},{w:'coffee.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'She does not like coffee.',    tr:'O kahve sevmez.'},
      {en:'We don\'t have a car.',        tr:'Bizim arabamız yok.'},
      {en:'He doesn\'t study at night.',  tr:'O gece çalışmaz.'},
    ],
    err:{w:'She doesn\'t likes coffee.',r:'She doesn\'t like coffee.',tip:'"Does not" ile asıl fiile -s eklenmez!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:',    words:['not','play','does','He','tennis'],        ans:'He does not play tennis'},
      {type:'mutate', sentence:'I ___ like spicy food.', opts:['doesn\'t','don\'t','not','no'],       ans:1, tip:'I ile "don\'t" kullanılır.'},
      {type:'clash',  q:'Hangisi doğru?',            a:'She doesn\'t likes it.',  b:'She doesn\'t like it.',  correct:'b'},
    ]
  },
  {
    id:'a1-pres-q', level:'A1', cat:'Zaman Kipleri', icon:'❓',
    title:'Present Simple — Soru', sub:'Do / Does ile Soru Kurma',
    desc:'Soru cümlelerinde "Do" veya "Does" cümle başına gelir. 3. tekil şahıs için "Does" kullanılır ve fiile -s eklenmez.',
    contrast:'Türkçede soru eki (-mı/-mi) fiile gelir. İngilizcede Do/Does cümle başına alınır.',
    register:{ formal:75, informal:95, written:75, spoken:95 },
    formula:[{t:'Do/Does',c:'#ef4444'},{t:'+',c:'#6b7280'},{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'Fiil (yalın)',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'?',c:'#6b7280'}],
    dna:[{w:'Does',r:'Soru yardımcısı',c:'#ef4444'},{w:'she',r:'Özne',c:'#3b82f6'},{w:'speak',r:'Fiil (yalın)',c:'#10b981'},{w:'English?',r:'Nesne+soru',c:'#f59e0b'}],
    exs:[
      {en:'Do you like pizza?',         tr:'Pizza sever misin?'},
      {en:'Does he work here?',         tr:'O burada çalışıyor mu?'},
      {en:'Do they have any questions?',tr:'Onların soruları var mı?'},
    ],
    err:{w:'Does she speaks English?',r:'Does she speak English?',tip:'"Does" kullandığında fiile -s ekleme!'},
    drills:[
      {type:'forge',  prompt:'Soru cümlesi oluştur:', words:['she','Does','French','speak'],           ans:'Does she speak French'},
      {type:'mutate', sentence:'___ you like chocolate?', opts:['Does','Do','Is','Are'],               ans:1, tip:'"You" için "Do" kullanılır.'},
      {type:'clash',  q:'Hangisi doğru?',               a:'Does he works here?',  b:'Does he work here?', correct:'b'},
    ]
  },
  {
    id:'a1-articles', level:'A1', cat:'Determiners', icon:'📌',
    title:'Artikeller: a / an / the', sub:'Belirsiz ve Belirli Artikeller',
    desc:'"A/An" belirsiz (ilk kez bahsedilen), "The" belirli (her iki tarafça bilinen) nesneler için kullanılır. Sesli harfle başlayan sözcükler "an" alır.',
    contrast:'Türkçede artikel yoktur — "bir" bazen belirsiz, "o" bazen belirli görevi görür. İngilizcede artikel kullanımı zorunludur.',
    register:{ formal:90, informal:95, written:90, spoken:95 },
    formula:[{t:'a/an',c:'#f59e0b'},{t:'+ belirsiz isim',c:'#6b7280'},{t:'|',c:'#6b7280'},{t:'the',c:'#06b6d4'},{t:'+ belirli isim',c:'#6b7280'}],
    dna:[{w:'I saw',r:'Özne+fiil',c:'#3b82f6'},{w:'a',r:'Belirsiz artikel',c:'#f59e0b'},{w:'dog.',r:'İsim',c:'#10b981'},{w:'The dog',r:'Belirli artikel+isim',c:'#06b6d4'},{w:'was friendly.',r:'Sıfat tümleği',c:'#8b5cf6'}],
    exs:[
      {en:'I saw a dog. The dog was huge.',  tr:'Bir köpek gördüm. Köpek çok büyüktü.'},
      {en:'She is an engineer.',             tr:'O bir mühendis.'},
      {en:'The sun rises in the east.',      tr:'Güneş doğudan doğar.'},
    ],
    err:{w:'She is engineer.',r:'She is an engineer.',tip:'Meslek bildiren isimlerde belirsiz artikel (a/an) zorunludur!'},
    drills:[
      {type:'mutate', sentence:'She ate ___ apple for breakfast.', opts:['a','an','the','—'],          ans:1, tip:'"apple" sesli harfle başlar → "an" kullanılır.'},
      {type:'clash',  q:'Hangisi doğru?',                           a:'He is a honest man.',  b:'He is an honest man.', correct:'b'},
      {type:'mutate', sentence:'___ Eiffel Tower is in Paris.',    opts:['A','An','The','—'],          ans:2, tip:'Eiffel Tower herkesçe bilinen tek bir yapı → "The"'},
      {type:'forge',  prompt:'Cümleyi tamamla:',  words:['saw','I','elephant','an'],                   ans:'I saw an elephant'},
    ]
  },
  {
    id:'a1-plurals', level:'A1', cat:'İsimler', icon:'📦',
    title:'Çoğul İsimler', sub:'Singular → Plural Dönüşüm Kuralları',
    desc:'Çoğu isim -s alır. -s/-sh/-ch/-x/-z ile bitenler -es. -y ile bitenler -ies. Düzensiz çoğullar (child→children, man→men) ezberlenmelidir.',
    contrast:'Türkçede çoğul eki -lar/-ler basittir. İngilizce çoğullarda birden fazla kural ve düzensiz biçimler vardır.',
    register:{ formal:85, informal:90, written:85, spoken:90 },
    formula:[{t:'İsim',c:'#3b82f6'},{t:'+ -s / -es / -ies',c:'#10b981'},{t:'veya düzensiz',c:'#f59e0b'}],
    dna:[{w:'Three',r:'Sayı',c:'#6b7280'},{w:'children',r:'Düzensiz çoğul (child)',c:'#ef4444'},{w:'and two',r:'Bağlaç+sayı',c:'#6b7280'},{w:'buses',r:'Düzenli çoğul (-es)',c:'#10b981'}],
    exs:[
      {en:'Two buses and three children.',  tr:'İki otobüs ve üç çocuk.'},
      {en:'The women carry heavy bags.',    tr:'Kadınlar ağır çantalar taşıyor.'},
      {en:'I have three boxes of books.',   tr:'Üç kutu kitabım var.'},
    ],
    err:{w:'I have two childs.',r:'I have two children.',tip:'"Child" → "children" düzensiz bir çoğuldur!'},
    drills:[
      {type:'mutate', sentence:'There are five ___ in the park.',  opts:['childs','childrens','children','child'],  ans:2, tip:'child → children (düzensiz çoğul)'},
      {type:'clash',  q:'Hangisi doğru?',  a:'Three womans came.',  b:'Three women came.',  correct:'b'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['boxes','shelves','two','and','three','I','have'], ans:'I have two boxes and three shelves'},
    ]
  },
  {
    id:'a1-there-is', level:'A1', cat:'Yapılar', icon:'📍',
    title:'There is / There are', sub:'Varlık Bildirme',
    desc:'"There is" tekil/sayılamayan isimler, "There are" çoğul isimler için kullanılır. Olumsuz: there is not / there are no.',
    contrast:'Türkçede "masanın üstünde bir kitap var" — var/yok kullanılır. İngilizcede There is/are yapısı zorunludur.',
    register:{ formal:80, informal:90, written:80, spoken:90 },
    formula:[{t:'There',c:'#6b7280'},{t:'+',c:'#6b7280'},{t:'is/are',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'İsim',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'Yer',c:'#f59e0b'}],
    dna:[{w:'There',r:'Yapı kelimesi',c:'#6b7280'},{w:'are',r:'To Be (çoğul)',c:'#10b981'},{w:'three cats',r:'Özne (çoğul)',c:'#3b82f6'},{w:'in the garden.',r:'Yer',c:'#f59e0b'}],
    exs:[
      {en:'There is a book on the table.',  tr:'Masanın üstünde bir kitap var.'},
      {en:'There are no seats left.',       tr:'Hiç yer kalmadı.'},
      {en:'There is some water in the jug.',tr:'Sürahide biraz su var.'},
    ],
    err:{w:'Is a problem.',r:'There is a problem.',tip:'"There is/are" yapısını unutma — cümle "there" ile başlar!'},
    drills:[
      {type:'mutate', sentence:'___ many people at the concert.',  opts:['There is','There are','It is','They are'], ans:1, tip:'"people" çoğul → "There are"'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['the','in','is','a','There','fridge','milk'],    ans:'There is milk in the fridge'},
      {type:'clash',  q:'Hangisi doğru?',  a:'There is five students.',  b:'There are five students.',  correct:'b'},
    ]
  },
  {
    id:'a1-imperative', level:'A1', cat:'Yapılar', icon:'⚡',
    title:'Imperative — Emir Cümlesi', sub:'Yönerge ve Komutlar',
    desc:'Emir cümlelerinde yalın fiil kullanılır, özne (you) söylenmez. Olumsuz: "Don\'t + fiil".',
    contrast:'Türkçede emir çekimi vardır (git!, gel!). İngilizcede yalın fiil yeterlidir (Go!, Come!).',
    register:{ formal:60, informal:90, written:70, spoken:90 },
    formula:[{t:'Fiil (yalın)',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'Nesne/Tamamlayıcı',c:'#f59e0b'}],
    dna:[{w:'Open',r:'Emir fiili (yalın)',c:'#10b981'},{w:'the window',r:'Nesne',c:'#f59e0b'},{w:'please.',r:'Kibarlık ifadesi',c:'#6b7280'}],
    exs:[
      {en:'Open the door, please.',    tr:'Kapıyı açar mısın / Kapıyı aç.'},
      {en:'Don\'t touch that!',        tr:'Ona dokunma!'},
      {en:'Be quiet in the library.',  tr:'Kütüphanede sessiz ol.'},
    ],
    err:{w:'You open the door.',r:'Open the door.',tip:'Emir cümlelerinde "you" kullanılmaz — direkt yalın fiil gelir.'},
    drills:[
      {type:'forge',  prompt:'Emir cümlesi oluştur:', words:['the','Turn','right','at','corner'],        ans:'Turn right at the corner'},
      {type:'clash',  q:'Hangisi emir cümlesi?',  a:'You should sit down.',  b:'Sit down!',  correct:'b'},
      {type:'mutate', sentence:'___ run in the corridor!', opts:['You don\'t','Don\'t','Not','No'],      ans:1, tip:'Olumsuz emir: "Don\'t + fiil"'},
    ]
  },
  {
    id:'a1-pronouns', level:'A1', cat:'Zamirler', icon:'👤',
    title:'Kişi Zamirleri & İyelik', sub:'I/My · You/Your · He/His · She/Her · We/Our · They/Their',
    desc:'Özne zamirleri (I, you, he...) cümle başında gelir. İyelik sıfatları (my, your, his...) isimden önce kullanılır.',
    contrast:'Türkçede cinsiyet ayrımı yoktur (o = he/she/it). İngilizcede he/she/it ayrımı zorunludur.',
    register:{ formal:90, informal:95, written:90, spoken:95 },
    formula:[{t:'Özne Zamiri',c:'#3b82f6'},{t:'→',c:'#6b7280'},{t:'İyelik Sıfatı',c:'#10b981'},{t:'+ İsim',c:'#f59e0b'}],
    dna:[{w:'She',r:'Özne zamiri (3. tekil dişil)',c:'#3b82f6'},{w:'loves',r:'Fiil',c:'#10b981'},{w:'her',r:'İyelik sıfatı',c:'#8b5cf6'},{w:'cat.',r:'İsim',c:'#f59e0b'}],
    exs:[
      {en:'He forgot his wallet.',     tr:'O cüzdanını unuttu.'},
      {en:'They love their dog.',      tr:'Onlar köpeklerini seviyor.'},
      {en:'We live in our own house.', tr:'Kendi evimizde yaşıyoruz.'},
    ],
    err:{w:'She lost her wallet. She is sad because it keys are inside.',r:'She lost her wallet. She is sad because her keys are inside.',tip:'"Her" dişil iyelik — karıştırma!'},
    drills:[
      {type:'mutate', sentence:'John forgot ___ keys at home.',   opts:['his','her','its','their'],       ans:0, tip:'John → erkek → his'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['cat','loves','her','She'],                       ans:'She loves her cat'},
      {type:'clash',  q:'Hangisi doğru?',  a:'They lost their bags.',  b:'They lost them bags.',  correct:'a'},
    ]
  },
  {
    id:'a1-have-has', level:'A1', cat:'Temel Fiiller', icon:'✋',
    title:'Have / Has', sub:'Sahip Olma ve Deneyim',
    desc:'"Have" I/you/we/they için, "Has" he/she/it için kullanılır. Olumsuz: don\'t have / doesn\'t have.',
    contrast:'Türkçede "benim arabam var" — sahiplik iyelikle anlatılır. İngilizcede "I have a car" — have fiili zorunludur.',
    register:{ formal:85, informal:95, written:85, spoken:95 },
    formula:[{t:'I/You/We/They',c:'#3b82f6'},{t:'+ have',c:'#10b981'},{t:'|',c:'#6b7280'},{t:'He/She/It',c:'#8b5cf6'},{t:'+ has',c:'#10b981'}],
    dna:[{w:'She',r:'Özne (3. tekil)',c:'#3b82f6'},{w:'has',r:'Has (3. şahıs)',c:'#10b981'},{w:'two',r:'Sayı',c:'#6b7280'},{w:'sisters.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'I have a lot of homework.',   tr:'Çok fazla ödevim var.'},
      {en:'She has two sisters.',        tr:'Onun iki kız kardeşi var.'},
      {en:'They don\'t have any money.', tr:'Onların hiç parası yok.'},
    ],
    err:{w:'He have a new car.',r:'He has a new car.',tip:'He/she/it → "has" kullanılır, "have" değil!'},
    drills:[
      {type:'mutate', sentence:'My brother ___ a dog and two cats.',  opts:['have','has','is having','had'],  ans:1, tip:'My brother (he) → has'},
      {type:'clash',  q:'Hangisi doğru?',  a:'She have long hair.',  b:'She has long hair.',  correct:'b'},
      {type:'forge',  prompt:'Olumsuz cümle oluştur:', words:['a','They','don\'t','car','have'],  ans:'They don\'t have a car'},
    ]
  },

  // ══════════════ A2 ══════════════
  {
    id:'a2-pres-cont', level:'A2', cat:'Zaman Kipleri', icon:'🔄',
    title:'Present Continuous', sub:'Şimdiki Zaman — Şu An Olan Eylemler',
    desc:'Şu anda gerçekleşen eylemler için kullanılır. "am/is/are + fiil-ing" yapısı kurulur.',
    contrast:'Türkçede "-yor" eki ile benzer. Ancak İngilizcede "to be" fiili zorunlu — "She -ing" yanlış, "She IS going" doğru.',
    register:{ formal:75, informal:95, written:70, spoken:95 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'am/is/are',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'Fiil-ing',c:'#06b6d4'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'is',r:'To Be',c:'#10b981'},{w:'reading',r:'Fiil-ing',c:'#06b6d4'},{w:'a novel',r:'Nesne',c:'#f59e0b'},{w:'right now.',r:'Zaman zarfı',c:'#6b7280'}],
    exs:[
      {en:'She is reading a novel right now.',  tr:'O şu an bir roman okuyor.'},
      {en:'They are not watching TV.',          tr:'Onlar TV izlemiyor.'},
      {en:'What are you doing tonight?',        tr:'Bu gece ne yapıyorsun?'},
    ],
    err:{w:'She reading a book.',r:'She is reading a book.',tip:'"is/am/are" olmadan present continuous olmaz!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['are','They','in','the','playing','park'],       ans:'They are playing in the park'},
      {type:'mutate', sentence:'I ___ listen to music right now.', opts:['am','am listening','listening','listen'], ans:1, tip:'am + fiil-ing yapısını kullan.'},
      {type:'clash',  q:'Hangisi doğru?',  a:'He is cook dinner.',  b:'He is cooking dinner.',  correct:'b'},
      {type:'decode', sentence:'We are building a new house.', target:'building', q:'"building" burada ne?', opts:['İsim','Sıfat','Fiil (-ing)','Zarf'], ans:2},
    ]
  },
  {
    id:'a2-past-simple', level:'A2', cat:'Zaman Kipleri', icon:'⏮️',
    title:'Past Simple', sub:'Geçmiş Zaman — Tamamlanan Eylemler',
    desc:'Geçmişte belirli bir anda başlayıp biten eylemler için kullanılır. Düzenli fiiller -ed alır. Düzensizler ezberlenmelidir.',
    contrast:'Türkçede "-di" eki geçmişi anlatır. İngilizcede düzenli (-ed) ve düzensiz (go→went) olmak üzere iki grup vardır.',
    register:{ formal:85, informal:90, written:85, spoken:90 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'Fiil-ed / V2',c:'#8b5cf6'},{t:'+',c:'#6b7280'},{t:'Nesne',c:'#f59e0b'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'visited',r:'Fiil-ed (düzenli)',c:'#8b5cf6'},{w:'Paris',r:'Nesne',c:'#f59e0b'},{w:'last summer.',r:'Zaman zarfı',c:'#6b7280'}],
    exs:[
      {en:'She visited Paris last summer.',  tr:'O geçen yaz Paris\'e gitti.'},
      {en:'They went to the beach yesterday.',tr:'Onlar dün plaja gitti.'},
      {en:'I didn\'t sleep well last night.',tr:'Dün gece iyi uyuyamadım.'},
    ],
    err:{w:'She goed to the market.',r:'She went to the market.',tip:'"go" düzensiz bir fiildir — geçmiş zaman "went"!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['the','movie','We','watched','yesterday'],       ans:'We watched the movie yesterday'},
      {type:'mutate', sentence:'He ___ his keys at school.',  opts:['lose','loses','lost','losing'],     ans:2, tip:'"lose" düzensiz — geçmiş: "lost"'},
      {type:'clash',  q:'Hangisi doğru?', a:'She goed home early.',  b:'She went home early.',  correct:'b'},
      {type:'decode', sentence:'They bought a new TV last week.', target:'bought', q:'"bought" hangi fiilden geliyor?', opts:['bring','buy','build','break'], ans:1},
    ]
  },
  {
    id:'a2-going-to', level:'A2', cat:'Gelecek Zaman', icon:'🚀',
    title:'Going to — Gelecek Zaman', sub:'Planlı ve Niyetli Eylemler',
    desc:'"Going to" önceden planlanmış veya kanıta dayanan gelecek için kullanılır. Yapı: am/is/are + going to + yalın fiil.',
    contrast:'Türkçede "-acak/-ecek" hem plan hem rastlantı ifade eder. İngilizcede plan için "going to", ani karar için "will" tercih edilir.',
    register:{ formal:70, informal:90, written:65, spoken:90 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'am/is/are',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'going to',c:'#06b6d4'},{t:'+',c:'#6b7280'},{t:'Fiil (yalın)',c:'#f59e0b'}],
    dna:[{w:'We',r:'Özne',c:'#3b82f6'},{w:'are',r:'To Be',c:'#10b981'},{w:'going to',r:'Gelecek zaman işareti',c:'#06b6d4'},{w:'visit',r:'Fiil (yalın)',c:'#f59e0b'},{w:'Rome.',r:'Nesne',c:'#8b5cf6'}],
    exs:[
      {en:'We are going to visit Rome.',        tr:'Biz Roma\'yı ziyaret edeceğiz (planımız var).'},
      {en:'It is going to rain. Look at the clouds!', tr:'Yağmur yağacak. Şu bulutlara bak!'},
      {en:'She isn\'t going to quit her job.',  tr:'O işini bırakmayacak.'},
    ],
    err:{w:'I going to travel tomorrow.',r:'I am going to travel tomorrow.',tip:'"going to" yapısında "am/is/are" unutulmamalı!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['to','is','She','going','study','medicine'],     ans:'She is going to study medicine'},
      {type:'mutate', sentence:'They ___ build a new school here.',  opts:['going to','are going to','is going to','go to'], ans:1, tip:'They → "are going to"'},
      {type:'clash',  q:'Hangisi doğru?',  a:'He going to call you.',  b:'He is going to call you.',  correct:'b'},
    ]
  },
  {
    id:'a2-will', level:'A2', cat:'Gelecek Zaman', icon:'💫',
    title:'Will — Gelecek Zaman', sub:'Ani Kararlar, Tahminler ve Vaatler',
    desc:'"Will" ani kararlar, tahminler ve vaatler için kullanılır. Yapı: will + yalın fiil (tüm özneler için aynı).',
    contrast:'"Will" ani kararlarda güçlüdür — "The phone is ringing." → "I\'ll answer it!" Türkçe "-acak" her ikisini de karşılar.',
    register:{ formal:80, informal:85, written:80, spoken:85 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'will',c:'#06b6d4'},{t:'+',c:'#6b7280'},{t:'Fiil (yalın)',c:'#f59e0b'}],
    dna:[{w:'I',r:'Özne',c:'#3b82f6'},{w:'will',r:'Modal (gelecek)',c:'#06b6d4'},{w:'help',r:'Fiil (yalın)',c:'#f59e0b'},{w:'you',r:'Nesne',c:'#8b5cf6'},{w:'tomorrow.',r:'Zaman zarfı',c:'#6b7280'}],
    exs:[
      {en:'I will help you tomorrow.',     tr:'Sana yarın yardım edeceğim (vaat).'},
      {en:'It will probably snow tonight.',tr:'Bu gece muhtemelen kar yağacak (tahmin).'},
      {en:'I\'ll carry that for you.',     tr:'Onu senin için taşıyayım (ani karar).'},
    ],
    err:{w:'She wills go to the party.',r:'She will go to the party.',tip:'"will" tüm öznelerde değişmez — "wills" diye bir şey yok!'},
    drills:[
      {type:'mutate', sentence:'Don\'t worry. I ___ help you.',  opts:['will','wills','am going to','going'],  ans:0, tip:'Ani karar/vaat → will'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['next','will','They','year','travel'],           ans:'They will travel next year'},
      {type:'clash',  q:'Hangisi doğru?',  a:'He wills come back.',  b:'He will come back.',  correct:'b'},
    ]
  },
  {
    id:'a2-comparative', level:'A2', cat:'Sıfatlar', icon:'⚖️',
    title:'Karşılaştırmalı Sıfatlar', sub:'Comparatives: -er / more',
    desc:'İki şeyi karşılaştırmak için kısa sıfatlara -er, uzun sıfatlara "more" eklenir. Karşılaştırma "than" ile yapılır.',
    contrast:'Türkçede "daha" sözcüğü yeterlidir (daha hızlı). İngilizcede kısa/uzun sıfata göre -er veya more seçilir.',
    register:{ formal:80, informal:90, written:80, spoken:90 },
    formula:[{t:'Sıfat-er',c:'#10b981'},{t:'/ more + Sıfat',c:'#06b6d4'},{t:'+',c:'#6b7280'},{t:'than',c:'#f59e0b'}],
    dna:[{w:'This car',r:'Özne',c:'#3b82f6'},{w:'is',r:'To Be',c:'#10b981'},{w:'faster',r:'Karşılaştırmalı sıfat',c:'#06b6d4'},{w:'than',r:'Karşılaştırma bağlacı',c:'#f59e0b'},{w:'that one.',r:'Nesne',c:'#8b5cf6'}],
    exs:[
      {en:'This car is faster than that one.',       tr:'Bu araba o arabadan daha hızlı.'},
      {en:'English is more difficult than Turkish?', tr:'İngilizce Türkçeden daha zor mu?'},
      {en:'He is taller than his brother.',          tr:'O erkek kardeşinden daha uzun.'},
    ],
    err:{w:'She is more tall than me.',r:'She is taller than me.',tip:'"tall" kısa sıfat → -er eklenir, "more tall" değil!'},
    drills:[
      {type:'mutate', sentence:'This test is ___ than the last one.',  opts:['more hard','harder','more harder','hardest'], ans:1, tip:'"hard" kısa sıfat → harder'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['expensive','This','is','phone','than','more','mine'], ans:'This phone is more expensive than mine'},
      {type:'clash',  q:'Hangisi doğru?',  a:'She runs more fast than him.',  b:'She runs faster than him.',  correct:'b'},
    ]
  },
  {
    id:'a2-modal-can', level:'A2', cat:'Modal Fiiller', icon:'💪',
    title:'Can / Can\'t — Yetenek ve İzin', sub:'Yetenek, Olasılık ve İzin',
    desc:'"Can" yetenek, izin ve olasılık için kullanılır. Tüm öznelerde değişmez. Olumsuz: cannot / can\'t.',
    contrast:'Türkçede "-ebilir/-abilir" yetenek, "olabilir" olasılık anlatır. İngilizcede "can" her ikisini de karşılar.',
    register:{ formal:70, informal:95, written:70, spoken:95 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'can',c:'#8b5cf6'},{t:'+',c:'#6b7280'},{t:'Fiil (yalın)',c:'#10b981'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'can',r:'Modal fiil',c:'#8b5cf6'},{w:'speak',r:'Fiil (yalın)',c:'#10b981'},{w:'five languages.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'She can speak five languages.',  tr:'O beş dil konuşabiliyor.'},
      {en:'Can I use your phone?',          tr:'Telefonunu kullanabilir miyim?'},
      {en:'He can\'t swim very well.',      tr:'O çok iyi yüzemiyor.'},
    ],
    err:{w:'She cans drive a car.',r:'She can drive a car.',tip:'"can" modal fiilidir — hiçbir özneyle -s almaz!'},
    drills:[
      {type:'mutate', sentence:'___ you help me with this?',  opts:['Can','Could','Do','Are'],           ans:0, tip:'Yetenek/izin sormak → can'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['guitar','can','He','play','the'],               ans:'He can play the guitar'},
      {type:'clash',  q:'Hangisi doğru?',  a:'She cans sing beautifully.',  b:'She can sing beautifully.',  correct:'b'},
    ]
  },
  {
    id:'a2-modal-must', level:'A2', cat:'Modal Fiiller', icon:'📋',
    title:'Must / Should — Zorunluluk ve Öneri', sub:'Gereklilik, Ödev ve Tavsiye',
    desc:'"Must" güçlü zorunluluk, "should" öneri/tavsiye bildirir. Her ikisi de tüm öznelerde değişmez.',
    contrast:'Türkçede "zorunda olmak" ve "gerekli" için farklı yapılar var. İngilizcede must/should basit ve değişmez.',
    register:{ formal:80, informal:80, written:80, spoken:80 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'must/should',c:'#ec4899'},{t:'+',c:'#6b7280'},{t:'Fiil (yalın)',c:'#10b981'}],
    dna:[{w:'You',r:'Özne',c:'#3b82f6'},{w:'must',r:'Zorunluluk modal',c:'#ec4899'},{w:'wear',r:'Fiil (yalın)',c:'#10b981'},{w:'a seatbelt.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'You must wear a seatbelt.',    tr:'Emniyet kemeri takman zorunlu.'},
      {en:'You should eat more vegetables.',tr:'Daha fazla sebze yemelisin.'},
      {en:'She must not be late again.',  tr:'Bir daha geç kalmamalı.'},
    ],
    err:{w:'You must to study harder.',r:'You must study harder.',tip:'"must" sonrasında "to" gelmez — direkt yalın fiil!'},
    drills:[
      {type:'mutate', sentence:'You ___ drink more water every day.',  opts:['must to','should','should to','musts'], ans:1, tip:'Tavsiye → should (to yok!)'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['must','You','your','do','homework'],            ans:'You must do your homework'},
      {type:'clash',  q:'Hangisi doğru?',  a:'He should to rest.',  b:'He should rest.',  correct:'b'},
    ]
  },

  // ══════════════ B1 ══════════════
  {
    id:'b1-pres-perfect', level:'B1', cat:'Zaman Kipleri', icon:'✅',
    title:'Present Perfect', sub:'Deneyim, Değişim ve Süregelen Etkiler',
    desc:'"Have/has + past participle (V3)" yapısıdır. Geçmişte yaşanan ama şimdiki anla bağlantısı olan durumlar için kullanılır.',
    contrast:'Türkçede "gitmiş" (duyulan geçmiş) bazen karşılık verir ama tam değil. Türkçede bu kip net bir karşılık bulmaz — en büyük zorluklardan biri!',
    register:{ formal:85, informal:80, written:90, spoken:80 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'have/has',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'V3 (geçmiş ortaç)',c:'#8b5cf6'}],
    dna:[{w:'I',r:'Özne',c:'#3b82f6'},{w:'have',r:'Yardımcı (have)',c:'#10b981'},{w:'never',r:'Zarf (never)',c:'#6b7280'},{w:'eaten',r:'V3 (eat→eaten)',c:'#8b5cf6'},{w:'sushi.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'I have never eaten sushi.',          tr:'Hiç suşi yemedim. (deneyim)'},
      {en:'She has lived here for ten years.',  tr:'O on yıldır burada yaşıyor. (süre)'},
      {en:'They have just arrived.',            tr:'Onlar az önce geldi. (yeni tamamlanan)'},
    ],
    err:{w:'I have went to Paris.',r:'I have been to Paris.',tip:'"go"nun V3\'ü "gone" veya "been" — "went" Simple Past için!'},
    drills:[
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['never','I','been','have','to','Japan'],         ans:'I have never been to Japan'},
      {type:'mutate', sentence:'She ___ already finished her project.',  opts:['have','has','had','is'], ans:1, tip:'She → has + V3'},
      {type:'clash',  q:'Hangisi doğru?',  a:'He has went home.',  b:'He has gone home.',  correct:'b'},
      {type:'decode', sentence:'We have lived here since 2015.', target:'have lived', q:'Bu yapı neden present perfect?', opts:['Geçmişte bitti','Hâlâ devam ediyor','Yarın olacak','Alışkanlık'], ans:1},
    ]
  },
  {
    id:'b1-first-cond', level:'B1', cat:'Koşul Cümleleri', icon:'🔀',
    title:'1. Koşul Cümlesi', sub:'Gerçek ve Olası Durumlar',
    desc:'"If + Present Simple, will + yalın fiil" yapısıdır. Gerçekleşmesi mümkün olan durumları anlatır.',
    contrast:'Türkçede "-rsa/-rse" ile koşul kurulur. İngilizcede If-cümlesinde simple present, sonuç cümlesinde will kullanılır.',
    register:{ formal:80, informal:85, written:80, spoken:85 },
    formula:[{t:'If',c:'#6b7280'},{t:'+ Pres. Simple,',c:'#3b82f6'},{t:'will',c:'#06b6d4'},{t:'+ Fiil (yalın)',c:'#10b981'}],
    dna:[{w:'If',r:'Koşul bağlacı',c:'#6b7280'},{w:'it rains',r:'Koşul (Pres.Simple)',c:'#3b82f6'},{w:'tomorrow,',r:'Zaman zarfı',c:'#6b7280'},{w:'we will',r:'Sonuç (will)',c:'#06b6d4'},{w:'stay home.',r:'Fiil+nesne',c:'#10b981'}],
    exs:[
      {en:'If it rains tomorrow, we will stay home.',  tr:'Yarın yağmur yağarsa evde kalacağız.'},
      {en:'If you study hard, you will pass the exam.',tr:'Çok çalışırsan sınavı geçeceksin.'},
      {en:'She will call us if she has time.',         tr:'Zamanı olursa bizi arayacak.'},
    ],
    err:{w:'If it will rain, I will stay home.',r:'If it rains, I will stay home.',tip:'If-cümlesinde "will" kullanılmaz — Simple Present yeterli!'},
    drills:[
      {type:'mutate', sentence:'If you ___ hard, you will succeed.',  opts:['work','will work','worked','working'], ans:0, tip:'If + Simple Present → No will!'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['miss','you','be','If','late,','will','you','the','bus'], ans:'If you are late you will miss the bus'},
      {type:'clash',  q:'Hangisi doğru?',  a:'If she will come, I will be happy.',  b:'If she comes, I will be happy.',  correct:'b'},
    ]
  },
  {
    id:'b1-passive-pres', level:'B1', cat:'Edilgen Çatı', icon:'🔃',
    title:'Passive Voice — Present Simple', sub:'Nesneyi Öne Çıkarmak',
    desc:'Edilgen çatı yapısı "am/is/are + past participle (V3)" şeklindedir. Eylemi yapanı değil, etkileneni öne çıkarır.',
    contrast:'Türkçede "-il/-ül/-in" ekleri edilgen yapar. İngilizcede to be + V3 kullanılır. "By" ile yapan kişi belirtilir.',
    register:{ formal:90, informal:70, written:90, spoken:70 },
    formula:[{t:'Nesne/Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'am/is/are',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'V3',c:'#8b5cf6'},{t:'(+ by ...)',c:'#6b7280'}],
    dna:[{w:'Coffee',r:'Konu (özne)',c:'#3b82f6'},{w:'is',r:'To Be',c:'#10b981'},{w:'grown',r:'V3 (grow)',c:'#8b5cf6'},{w:'in Brazil.',r:'Yer zarfı',c:'#f59e0b'}],
    exs:[
      {en:'Coffee is grown in Brazil.',       tr:'Kahve Brezilya\'da yetiştirilir.'},
      {en:'English is spoken worldwide.',     tr:'İngilizce dünya genelinde konuşulur.'},
      {en:'The windows are cleaned every week.',tr:'Pencereler her hafta temizlenir.'},
    ],
    err:{w:'Coffee is grew in Brazil.',r:'Coffee is grown in Brazil.',tip:'Passive\'de fiil V3 (past participle) olmalı — "grew" V2!'},
    drills:[
      {type:'mutate', sentence:'This bridge ___ built in 1920.',  opts:['is','was','were','be'],         ans:1, tip:'Geçmişte yapıldı → was (past passive)'},
      {type:'forge',  prompt:'Pasif cümle oluştur:', words:['sent','Emails','the','are','to','daily','team'], ans:'Emails are sent to the team daily'},
      {type:'clash',  q:'Hangisi doğru pasif cümle?',  a:'The cake is bake by Maria.',  b:'The cake is baked by Maria.',  correct:'b'},
    ]
  },
  {
    id:'b1-gerund-inf', level:'B1', cat:'Fiil Yapıları', icon:'🔗',
    title:'Gerund ve İnfinitif', sub:'Fiilden Sonra -ing mi, to + Fiil mi?',
    desc:'Bazı fiiller gerund (-ing) alır (enjoy, avoid, finish), bazıları infinitif (to+fiil) alır (want, hope, decide). Bazıları her ikisini de alabilir.',
    contrast:'Türkçede "-mak/-mek" isim-fiil yeterlidir. İngilizcede fiilin ne aldığı ezberlenmelidir.',
    register:{ formal:85, informal:85, written:85, spoken:85 },
    formula:[{t:'Fiil (enjoy/want)',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'-ing VEYA to+fiil',c:'#ec4899'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'enjoys',r:'Ana fiil (gerund alır)',c:'#10b981'},{w:'reading',r:'Gerund (-ing)',c:'#ec4899'},{w:'novels.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'She enjoys reading novels.',          tr:'O roman okumaktan zevk alıyor. (enjoy + -ing)'},
      {en:'He decided to study medicine.',       tr:'O tıp okumaya karar verdi. (decide + to)'},
      {en:'They avoid making mistakes.',         tr:'Onlar hata yapmaktan kaçınıyor. (avoid + -ing)'},
    ],
    err:{w:'She enjoys to read.',r:'She enjoys reading.',tip:'"enjoy" her zaman -ing alır, infinitif değil!'},
    drills:[
      {type:'mutate', sentence:'I finished ___ the report.',  opts:['to write','write','writing','to writing'], ans:2, tip:'"finish" → gerund (-ing)'},
      {type:'mutate', sentence:'She wants ___ a doctor.',  opts:['becoming','become','to become','becomes'],   ans:2, tip:'"want" → infinitif (to+fiil)'},
      {type:'clash',  q:'Hangisi doğru?',  a:'I avoided to make mistakes.',  b:'I avoided making mistakes.',  correct:'b'},
    ]
  },
  {
    id:'b1-relative', level:'B1', cat:'Bağımlı Cümleler', icon:'🔗',
    title:'Relative Clauses: who/which/that', sub:'İlgi Zamiri ile Tanımlama',
    desc:'İnsan için "who", nesne için "which", her ikisi için "that" kullanılır. Cümle içinde ismi tanımlayan yan cümle kurar.',
    contrast:'Türkçede sıfat-fiil (okuyan, gelen, yapılan) ismi niteler. İngilizcede ilgi zamiri isimden SONRA gelir.',
    register:{ formal:85, informal:80, written:90, spoken:80 },
    formula:[{t:'İsim',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'who/which/that',c:'#06b6d4'},{t:'+',c:'#6b7280'},{t:'Yan Cümle',c:'#10b981'}],
    dna:[{w:'The woman',r:'İsim (ana)',c:'#3b82f6'},{w:'who',r:'İlgi zamiri (insan)',c:'#06b6d4'},{w:'lives next door',r:'Yan cümle',c:'#10b981'},{w:'is a nurse.',r:'Yüklem',c:'#f59e0b'}],
    exs:[
      {en:'The woman who lives next door is a nurse.',  tr:'Yan dairede yaşayan kadın hemşire.'},
      {en:'I love books which make me think.',         tr:'Beni düşündüren kitapları severim.'},
      {en:'The car that he bought is red.',            tr:'Aldığı araba kırmızı.'},
    ],
    err:{w:'The man which works here is kind.',r:'The man who works here is kind.',tip:'İnsanlar için "who" — "which" nesneler/hayvanlar için!'},
    drills:[
      {type:'mutate', sentence:'She is the person ___ helped me.',  opts:['which','who','what','where'],  ans:1, tip:'Person (insan) → who'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['The','book','I','read','which','was','amazing'], ans:'The book which I read was amazing'},
      {type:'clash',  q:'Hangisi doğru?',  a:'The dog which bit me was large.',  b:'The dog who bit me was large.',  correct:'a'},
    ]
  },
  {
    id:'b1-past-cont', level:'B1', cat:'Zaman Kipleri', icon:'⏸️',
    title:'Past Continuous', sub:'Geçmişte Süregelen Eylem',
    desc:'"was/were + fiil-ing" yapısıdır. Geçmişte belirli bir anda devam eden eylemleri anlatır. Genellikle Simple Past ile birlikte kullanılır.',
    contrast:'Türkçede "-yordu" eki benzer anlam taşır. İngilizcede was/were + -ing yapısı zorunludur.',
    register:{ formal:80, informal:85, written:80, spoken:85 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'was/were',c:'#10b981'},{t:'+',c:'#6b7280'},{t:'Fiil-ing',c:'#8b5cf6'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'was',r:'To Be (geçmiş)',c:'#10b981'},{w:'reading',r:'Fiil-ing',c:'#8b5cf6'},{w:'when',r:'Bağlaç',c:'#6b7280'},{w:'he called.',r:'Ana olay (Simple Past)',c:'#f59e0b'}],
    exs:[
      {en:'She was reading when he called.',      tr:'O aradığında o okuyordu.'},
      {en:'They were sleeping at midnight.',      tr:'Gece yarısı uyuyorlardı.'},
      {en:'What were you doing yesterday at 8?', tr:'Dün saat 8\'de ne yapıyordun?'},
    ],
    err:{w:'I was study when you called.',r:'I was studying when you called.',tip:'"was" + fiil-ing yapısı — fiil -ing almalı!'},
    drills:[
      {type:'mutate', sentence:'He ___ TV when the lights went out.',  opts:['watched','was watching','is watching','watches'], ans:1, tip:'O an devam eden eylem → was + -ing'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['at','were','They','the','dancing','party'],    ans:'They were dancing at the party'},
      {type:'clash',  q:'Hangisi doğru?',  a:'I was slept all day.',  b:'I was sleeping all day.',  correct:'b'},
    ]
  },
  {
    id:'b1-zero-cond', level:'B1', cat:'Koşul Cümleleri', icon:'🌡️',
    title:'0. Koşul Cümlesi', sub:'Genel Gerçekler ve Bilimsel Yasalar',
    desc:'"If + Present Simple, Present Simple" yapısıdır. Her zaman geçerli olan gerçekler ve yasalar için kullanılır.',
    contrast:'Türkçede "-rsa, -r" yapısı benzer. İngilizcede her iki cümle de Simple Present kullanır — will yok!',
    register:{ formal:85, informal:75, written:90, spoken:75 },
    formula:[{t:'If',c:'#6b7280'},{t:'+ Pres. Simple,',c:'#3b82f6'},{t:'Pres. Simple',c:'#10b981'}],
    dna:[{w:'If',r:'Koşul bağlacı',c:'#6b7280'},{w:'you heat water',r:'Koşul (P.Simple)',c:'#3b82f6'},{w:'to 100°C,',r:'Zarf',c:'#6b7280'},{w:'it boils.',r:'Sonuç (P.Simple)',c:'#10b981'}],
    exs:[
      {en:'If you heat water to 100°C, it boils.',  tr:'Suyu 100°C\'ye ısıtırsan kaynar. (bilimsel)'},
      {en:'If it rains, the ground gets wet.',       tr:'Yağmur yağarsa yer ıslanır.'},
      {en:'Plants die if they don\'t get water.',    tr:'Bitkiler su almadığında ölür.'},
    ],
    err:{w:'If you freeze water, it will become ice.',r:'If you freeze water, it becomes ice.',tip:'0. koşulda her iki cümle de Present Simple — will yok!'},
    drills:[
      {type:'mutate', sentence:'If you mix red and blue, you ___ purple.',  opts:['will get','get','got','getting'],  ans:1, tip:'0. Koşul → sonuç cümlesi Simple Present'},
      {type:'clash',  q:'Hangisi doğru?',  a:'If you heat ice, it will melt.',  b:'If you heat ice, it melts.',  correct:'b'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['you','If','not','eat,','hungry','get','you'],   ans:'If you do not eat you get hungry'},
    ]
  },
  {
    id:'b1-reported', level:'B1', cat:'Aktarmalı Anlatım', icon:'💬',
    title:'Reported Speech — İfadeler', sub:'Söylenenin Aktarılması',
    desc:'Birinin sözlerini aktarırken zaman bir geri kayar: Simple Present → Past Simple, will → would, can → could.',
    contrast:'Türkçede "-dığını söyledi" gibi yapılar kullanılır. İngilizcede zaman kayması (backshift) zorunludur.',
    register:{ formal:85, informal:75, written:90, spoken:75 },
    formula:[{t:'She said (that)',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'Özne',c:'#06b6d4'},{t:'+',c:'#6b7280'},{t:'Fiil (geri kayar)',c:'#8b5cf6'}],
    dna:[{w:'"I am tired."',r:'Doğrudan söz',c:'#f59e0b'},{w:'→',r:'Dönüşüm',c:'#6b7280'},{w:'She said',r:'Aktaran fiil',c:'#3b82f6'},{w:'she',r:'Zamir değişir',c:'#06b6d4'},{w:'was tired.',r:'Fiil geri kayar',c:'#8b5cf6'}],
    exs:[
      {en:'"I am tired." → She said she was tired.',       tr:'"Yorgunum." → Yorgun olduğunu söyledi.'},
      {en:'"I will call you." → He said he would call.',  tr:'"Seni arayacağım." → Arayacağını söyledi.'},
      {en:'"I can swim." → She said she could swim.',     tr:'"Yüzebiliyorum." → Yüzebildiğini söyledi.'},
    ],
    err:{w:'She said she is tired.',r:'She said she was tired.',tip:'Reported speech\'te zaman geri kayar: is → was'},
    drills:[
      {type:'mutate', sentence:'"I love this city." → She said she ___ that city.',  opts:['loves','loved','will love','is loving'], ans:1, tip:'love → loved (zaman kayar)'},
      {type:'forge',  prompt:'"I can help." → He said he ___:', words:['help','he','could','said','He'],  ans:'He said he could help'},
      {type:'clash',  q:'Hangisi doğru reported speech?',  a:'He said he will come.',  b:'He said he would come.',  correct:'b'},
    ]
  },

  // ══════════════ B2 ══════════════
  {
    id:'b2-second-cond', level:'B2', cat:'Koşul Cümleleri', icon:'🌀',
    title:'2. Koşul Cümlesi', sub:'Hayali ve Gerçekdışı Durumlar',
    desc:'"If + Past Simple, would + yalın fiil" yapısıdır. Şu anda gerçek olmayan, hayal edilen durumlar için kullanılır.',
    contrast:'Türkçede "-seydi, -di" yapısı benzer. İngilizcede If-cümlesinde Simple Past görünse de anlam şimdiki zamandadır.',
    register:{ formal:80, informal:80, written:80, spoken:80 },
    formula:[{t:'If',c:'#6b7280'},{t:'+ Past Simple,',c:'#8b5cf6'},{t:'would',c:'#06b6d4'},{t:'+ Fiil (yalın)',c:'#10b981'}],
    dna:[{w:'If',r:'Koşul bağlacı',c:'#6b7280'},{w:'I had',r:'Koşul (Past — hayali)',c:'#8b5cf6'},{w:'more time,',r:'Nesne',c:'#6b7280'},{w:'I would',r:'Would (sonuç)',c:'#06b6d4'},{w:'travel more.',r:'Fiil',c:'#10b981'}],
    exs:[
      {en:'If I had more time, I would travel more.',      tr:'Daha fazla zamanım olsaydı daha çok seyahat ederdim.'},
      {en:'She would be happier if she exercised.',        tr:'Egzersiz yapsa daha mutlu olurdu.'},
      {en:'If I were you, I wouldn\'t say that.',          tr:'Senin yerinde olsam bunu söylemezdim.'},
    ],
    err:{w:'If I will have money, I would buy it.',r:'If I had money, I would buy it.',tip:'2. Koşul\'da If-cümlesinde PAST Simple — will yok!'},
    drills:[
      {type:'mutate', sentence:'If she ___ more confident, she would apply for the job.',  opts:['is','was','were','will be'], ans:2, tip:'"were" 2. koşulda "to be" için tercih edilir.'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['would','If','fly,','I','had','wings','I'],       ans:'If I had wings I would fly'},
      {type:'clash',  q:'Hangisi doğru?',  a:'If I was rich, I will buy a castle.',  b:'If I were rich, I would buy a castle.',  correct:'b'},
    ]
  },
  {
    id:'b2-third-cond', level:'B2', cat:'Koşul Cümleleri', icon:'⏳',
    title:'3. Koşul Cümlesi', sub:'Geçmişe Pişmanlık ve Gerçekdışı Geçmiş',
    desc:'"If + Past Perfect, would have + V3" yapısıdır. Geçmişte olmayan ama olabilirdi denen durumlar için kullanılır.',
    contrast:'Türkçede "-saydı, -mış olurdu" yapısı benzer. Bu kip pişmanlık veya hayal etme için kullanılır.',
    register:{ formal:80, informal:75, written:85, spoken:75 },
    formula:[{t:'If',c:'#6b7280'},{t:'+ Past Perfect,',c:'#8b5cf6'},{t:'would have',c:'#06b6d4'},{t:'+ V3',c:'#ec4899'}],
    dna:[{w:'If',r:'Koşul bağlacı',c:'#6b7280'},{w:'she had studied',r:'Past Perfect (hayali geçmiş)',c:'#8b5cf6'},{w:'harder,',r:'Zarf',c:'#6b7280'},{w:'she would have',r:'would have',c:'#06b6d4'},{w:'passed.',r:'V3',c:'#ec4899'}],
    exs:[
      {en:'If she had studied harder, she would have passed.',  tr:'Daha çok çalışsaydı geçmiş olurdu.'},
      {en:'If they had left earlier, they wouldn\'t have missed the train.', tr:'Daha erken çıksalardı treni kaçırmazlardı.'},
      {en:'I would have called if I had known.',               tr:'Bilseydim arardım.'},
    ],
    err:{w:'If I studied harder, I would have passed.',r:'If I had studied harder, I would have passed.',tip:'3. Koşul\'da IF-cümlesinde Past PERFECT gerekli!'},
    drills:[
      {type:'mutate', sentence:'If he ___ the warning, he would have been safe.',  opts:['heard','had heard','would hear','has heard'], ans:1, tip:'3. Koşul: If + Past Perfect → had heard'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['had','we','early,','arrived','missed','have','not','would','If','we'], ans:'If we had arrived early we would not have missed'},
      {type:'clash',  q:'Hangisi doğru?',  a:'If she has studied, she would pass.',  b:'If she had studied, she would have passed.',  correct:'b'},
    ]
  },
  {
    id:'b2-past-perfect', level:'B2', cat:'Zaman Kipleri', icon:'⏪',
    title:'Past Perfect', sub:'Geçmişteki Geçmiş',
    desc:'"had + V3" yapısıdır. Geçmişte iki olay olduğunda, önce gerçekleşen eylem Past Perfect ile anlatılır.',
    contrast:'Türkçede "-mıştı" yapısı benzer. İngilizcede bu zaman, geçmişte kronolojik sırayı netleştirmek için kritiktir.',
    register:{ formal:85, informal:75, written:90, spoken:75 },
    formula:[{t:'Özne',c:'#3b82f6'},{t:'+',c:'#6b7280'},{t:'had',c:'#8b5cf6'},{t:'+',c:'#6b7280'},{t:'V3',c:'#10b981'}],
    dna:[{w:'When I arrived,',r:'Sonradan olan (Simple Past)',c:'#f59e0b'},{w:'she',r:'Özne',c:'#3b82f6'},{w:'had already',r:'had + already',c:'#8b5cf6'},{w:'left.',r:'V3 (leave→left)',c:'#10b981'}],
    exs:[
      {en:'When I arrived, she had already left.',      tr:'Ben geldiğimde o çoktan gitmiş.'},
      {en:'He had finished dinner before they came.',  tr:'Onlar gelmeden önce yemeğini bitirdi.'},
      {en:'She had never seen snow before that day.',  tr:'O güne kadar hiç kar görmemişti.'},
    ],
    err:{w:'When I arrived, she already left.',r:'When I arrived, she had already left.',tip:'Önce gerçekleşen olay Past Perfect almalı: had + V3'},
    drills:[
      {type:'mutate', sentence:'By the time we got there, the film ___ already started.',  opts:['has','had','was','did'], ans:1, tip:'Önce başlayan eylem: had + V3'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['had','He','the','by','already','left','time','she','arrived'], ans:'He had already left by the time she arrived'},
      {type:'clash',  q:'Hangisi doğru?',  a:'She fainted because she didn\'t eat.',  b:'She fainted because she hadn\'t eaten.',  correct:'b'},
    ]
  },
  {
    id:'b2-modal-perf', level:'B2', cat:'Modal Fiiller', icon:'🎯',
    title:'Modal Perfect: must have / could have / should have', sub:'Geçmişe Yönelik Çıkarım ve Pişmanlık',
    desc:'Modal + have + V3 yapısı geçmişe yönelik tahmini, pişmanlığı veya imkânı ifade eder.',
    contrast:'Türkçede "olmalıydı, yapabilirdi" gibi yapılar benzer. İngilizcede must have (kesin tahmin), should have (pişmanlık), could have (imkân).',
    register:{ formal:85, informal:75, written:85, spoken:75 },
    formula:[{t:'must/should/could',c:'#ec4899'},{t:'+ have +',c:'#6b7280'},{t:'V3',c:'#8b5cf6'}],
    dna:[{w:'She',r:'Özne',c:'#3b82f6'},{w:'must have',r:'Kesin tahmin (geçmiş)',c:'#ec4899'},{w:'forgotten',r:'V3 (forget)',c:'#8b5cf6'},{w:'the meeting.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'She must have forgotten the meeting.',  tr:'Toplantıyı unutmuş olmalı. (kesin tahmin)'},
      {en:'You should have called an ambulance.',  tr:'Ambulans çağırman gerekirdi. (pişmanlık)'},
      {en:'He could have been a great musician.',  tr:'Harika bir müzisyen olabilirdi. (imkân)'},
    ],
    err:{w:'She must forgot the meeting.',r:'She must have forgotten the meeting.',tip:'Geçmişe tahmin için: modal + have + V3 yapısı!'},
    drills:[
      {type:'mutate', sentence:'You ___ studied more. Now you regret it.',  opts:['should have','must have','could','should'],  ans:0, tip:'Pişmanlık → should have + V3'},
      {type:'clash',  q:'Hangisi "kesin geçmiş tahmini" için doğru?',  a:'He could have left.',  b:'He must have left.',  correct:'b'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['have','She','the','should','checked','email'],  ans:'She should have checked the email'},
    ]
  },
  {
    id:'b2-mixed-cond', level:'B2', cat:'Koşul Cümleleri', icon:'🌪️',
    title:'Mixed Conditional', sub:'Karışık Koşul — Geçmiş+Şimdi',
    desc:'If + Past Perfect (geçmiş), would + yalın fiil (şimdiki etki). Geçmişteki bir durumun şimdiye etkisini anlatır.',
    contrast:'Türkçede "olsaydı, şimdi olurdu" benzer. İngilizcede iki farklı koşul kipi birleştirilir.',
    register:{ formal:80, informal:65, written:85, spoken:65 },
    formula:[{t:'If + Past Perfect',c:'#8b5cf6'},{t:',',c:'#6b7280'},{t:'would + yalın fiil',c:'#06b6d4'}],
    dna:[{w:'If she had',r:'Past Perfect (geçmişte olan)',c:'#8b5cf6'},{w:'studied medicine,',r:'Konu',c:'#6b7280'},{w:'she would be',r:'Would + be (şu an)',c:'#06b6d4'},{w:'a doctor now.',r:'Sonuç',c:'#10b981'}],
    exs:[
      {en:'If she had studied medicine, she would be a doctor now.', tr:'Tıp okumuş olsaydı şu an doktor olurdu.'},
      {en:'If I hadn\'t moved here, I wouldn\'t know you.',          tr:'Buraya taşınmasaydım seni tanımazdım.'},
    ],
    err:{w:'If she studied medicine, she would have been a doctor.',r:'If she had studied medicine, she would be a doctor now.',tip:'Karışık koşulda: geçmiş (had+V3) + şimdiki etki (would+fiil)'},
    drills:[
      {type:'mutate', sentence:'If he had practised more, he ___ a professional player now.',  opts:['would be','would have been','was','will be'], ans:0, tip:'Şimdiki etki: would + fiil'},
      {type:'clash',  q:'Hangisi mixed conditional?',  a:'If I had saved money, I would have bought it.',  b:'If I had saved money, I would be rich now.',  correct:'b'},
    ]
  },
  {
    id:'b2-non-defining', level:'B2', cat:'Bağımlı Cümleler', icon:'📎',
    title:'Non-defining Relative Clauses', sub:'Virgüllü İlgi Cümleleri',
    desc:'Virgülle ayrılan relative clause, ekstra bilgi verir — kaldırılsa da cümle anlamlıdır. "That" kullanılamaz, sadece who/which.',
    contrast:'Türkçede bu ayrım yoktur. İngilizce\'de defining (virgülsüz) ve non-defining (virgüllü) ayrımı anlamı değiştirir.',
    register:{ formal:90, informal:60, written:95, spoken:60 },
    formula:[{t:'İsim,',c:'#3b82f6'},{t:'who/which',c:'#06b6d4'},{t:'+ ekstra bilgi,',c:'#10b981'},{t:'+ ana yüklem',c:'#f59e0b'}],
    dna:[{w:'My sister,',r:'İsim (tanımlı)',c:'#3b82f6'},{w:'who lives in London,',r:'Non-defining clause (ekstra)',c:'#06b6d4'},{w:'is a doctor.',r:'Ana yüklem',c:'#10b981'}],
    exs:[
      {en:'My sister, who lives in London, is a doctor.',  tr:'Londra\'da yaşayan kız kardeşim (ki Londra\'da yaşar) doktor.'},
      {en:'The Eiffel Tower, which was built in 1889, is in Paris.', tr:'Eyfel Kulesi, 1889\'da inşa edildi ve Paris\'te.'},
    ],
    err:{w:'My sister, that lives in London, is a doctor.',r:'My sister, who lives in London, is a doctor.',tip:'Non-defining relative clause\'da "that" kullanılamaz!'},
    drills:[
      {type:'mutate', sentence:'Shakespeare, ___ wrote Hamlet, was English.',  opts:['that','which','who','whom'], ans:2, tip:'İnsan için "who"; "that" non-defining\'de yasak!'},
      {type:'clash',  q:'Hangisi doğru?',  a:'Paris, that is in France, is beautiful.',  b:'Paris, which is in France, is beautiful.',  correct:'b'},
    ]
  },

  // ══════════════ C1 ══════════════
  {
    id:'c1-inversion', level:'C1', cat:'İleri Yapılar', icon:'🔄',
    title:'Inversion — Devrik Cümle', sub:'Vurgu İçin Özne-Fiil Yer Değişimi',
    desc:'Olumsuz veya kısıtlayıcı zarflarla (never, rarely, not only, no sooner) cümle başladığında özne-yardımcı fiil yeri değişir.',
    contrast:'Türkçede vurgu sözcük sırasıyla değil aksanla yapılır. İngilizce devrik yapı güçlü yazılı etki yaratır.',
    register:{ formal:95, informal:30, written:95, spoken:30 },
    formula:[{t:'Never/Rarely/Not only',c:'#ec4899'},{t:'+ Yardımcı Fiil',c:'#8b5cf6'},{t:'+ Özne',c:'#3b82f6'},{t:'+ Ana Fiil',c:'#10b981'}],
    dna:[{w:'Never',r:'Olumsuz zarf (cümle başı)',c:'#ec4899'},{w:'have',r:'Yardımcı (devrik)',c:'#8b5cf6'},{w:'I',r:'Özne',c:'#3b82f6'},{w:'seen',r:'V3',c:'#10b981'},{w:'such beauty.',r:'Nesne',c:'#f59e0b'}],
    exs:[
      {en:'Never have I seen such beauty.',              tr:'Böyle bir güzelliği hiç görmedim. (vurgulu)'},
      {en:'Not only did she win, but she broke a record.',tr:'Sadece kazanmadı, rekor da kırdı.'},
      {en:'Rarely does he speak in public.',             tr:'Nadiren kamuoyu önünde konuşur.'},
    ],
    err:{w:'Never I have seen such a thing.',r:'Never have I seen such a thing.',tip:'Devrik yapıda yardımcı fiil özneden ÖNCE gelir!'},
    drills:[
      {type:'forge',  prompt:'Devrik cümle oluştur:', words:['had','Seldom','she','so','felt','alive'],  ans:'Seldom had she felt so alive'},
      {type:'clash',  q:'Hangisi doğru inversion?',  a:'Not only she won the race.',  b:'Not only did she win the race.',  correct:'b'},
      {type:'mutate', sentence:'Hardly ___ she sat down when the phone rang.',  opts:['has','did','had','was'], ans:2, tip:'"Hardly" ile Past Perfect devriği: had'},
    ]
  },
  {
    id:'c1-cleft-it', level:'C1', cat:'İleri Yapılar', icon:'🔍',
    title:'Cleft Sentences: It is/was...that', sub:'Odaklama ve Vurgu',
    desc:'"It is/was + vurgulanan öge + that + geri kalan" yapısıdır. Cümlenin belirli bir parçasını vurgulamak için kullanılır.',
    contrast:'Türkçede vurgu sözcük sırasıyla veya aksanla yapılır. İngilizcede cleft yapı yazılı metin için güçlü bir vurgu aracıdır.',
    register:{ formal:90, informal:55, written:90, spoken:55 },
    formula:[{t:'It is/was',c:'#6b7280'},{t:'+ Vurgulanan',c:'#ec4899'},{t:'+ that',c:'#6b7280'},{t:'+ Geri kalan',c:'#3b82f6'}],
    dna:[{w:'It was',r:'Cleft başlangıcı',c:'#6b7280'},{w:'John',r:'Vurgulanan öge',c:'#ec4899'},{w:'that',r:'Bağlaç',c:'#6b7280'},{w:'broke the window.',r:'Geri kalan',c:'#3b82f6'}],
    exs:[
      {en:'It was John that broke the window.',         tr:'Camı kıran John\'du. (John vurgulu)'},
      {en:'It is hard work that leads to success.',    tr:'Başarıya götüren şey sıkı çalışmaktır.'},
      {en:'It was in 1969 that humans landed on the moon.', tr:'İnsanların aya indiği yıl 1969\'du.'},
    ],
    err:{w:'It was John who he broke the window.',r:'It was John who broke the window.',tip:'"that" veya "who" — ikinci özne (he) kullanılmaz!'},
    drills:[
      {type:'forge',  prompt:'Cleft cümle oluştur:', words:['won','It','the','was','she','that','race'],  ans:'It was she that won the race'},
      {type:'clash',  q:'Hangisi doğru?',  a:'It is determination that makes the difference.',  b:'It is determination which it makes the difference.',  correct:'a'},
    ]
  },
  {
    id:'c1-cleft-what', level:'C1', cat:'İleri Yapılar', icon:'💡',
    title:'Cleft Sentences: What...is/are', sub:'"What" ile Vurgu',
    desc:'"What + özne + fiil + is/are + vurgulanan" yapısıdır. Özellikle konuşmada güçlü vurgu sağlar.',
    register:{ formal:85, informal:65, written:85, spoken:65 },
    formula:[{t:'What',c:'#06b6d4'},{t:'+ Özne + Fiil',c:'#3b82f6'},{t:'+ is/are',c:'#10b981'},{t:'+ Vurgulanan',c:'#ec4899'}],
    dna:[{w:'What',r:'What-cleft başlangıcı',c:'#06b6d4'},{w:'I need',r:'Özne + fiil',c:'#3b82f6'},{w:'is',r:'Bağlama fiili',c:'#10b981'},{w:'more sleep.',r:'Vurgulanan öge',c:'#ec4899'}],
    exs:[
      {en:'What I need is more sleep.',             tr:'İhtiyacım olan şey daha fazla uyku.'},
      {en:'What surprised me was his silence.',    tr:'Beni şaşırtan şey onun sessizliğiydi.'},
      {en:'What she did was call the police.',     tr:'Yaptığı şey polisi aramaktı.'},
    ],
    err:{w:'What I need it is more sleep.',r:'What I need is more sleep.',tip:'"What I need IS" — ekstra "it" kullanılmaz!'},
    drills:[
      {type:'mutate', sentence:'___ annoys me is people being rude.',  opts:['That','It','What','Which'], ans:2, tip:'What-cleft: What + özne + fiil + is'},
      {type:'forge',  prompt:'Cümleyi oluştur:', words:['What','understand','I','cannot','is','his','attitude'], ans:'What I cannot understand is his attitude'},
    ]
  },
  {
    id:'c1-participle', level:'C1', cat:'İleri Yapılar', icon:'🧩',
    title:'Participle Clauses', sub:'Eylem Ortacı ile Yan Cümle',
    desc:'Participle clause, özne ortak olduğunda yan cümleyi kısaltır. -ing (etken) veya past participle (edilgen) kullanılır.',
    contrast:'Türkçede sıfat-fiil eklerine benzer ("-arak, -ıp"). İngilizcede participle clause özne tekrarını önler ve akademik yazıda çok kullanılır.',
    register:{ formal:95, informal:40, written:95, spoken:40 },
    formula:[{t:'Participle (-ing/V3)',c:'#8b5cf6'},{t:'+ nesne/zarf,',c:'#6b7280'},{t:'ana cümle',c:'#3b82f6'}],
    dna:[{w:'Having finished',r:'-ing (önce biten eylem)',c:'#8b5cf6'},{w:'her work,',r:'Nesne',c:'#6b7280'},{w:'she',r:'Özne (ortak)',c:'#3b82f6'},{w:'went home.',r:'Ana eylem',c:'#10b981'}],
    exs:[
      {en:'Having finished her work, she went home.',    tr:'İşini bitirdikten sonra eve gitti.'},
      {en:'Exhausted by the journey, he fell asleep.',  tr:'Yolculuktan yorgun düşerek uyudu.'},
      {en:'Walking down the street, she saw an old friend.', tr:'Sokakta yürürken eski bir arkadaşını gördü.'},
    ],
    err:{w:'Walking down the street, a dog barked at her.',r:'Walking down the street, she heard a dog bark.',tip:'Participle clause\'un öznesi ana cümlenin öznesiyle aynı olmalı!'},
    drills:[
      {type:'mutate', sentence:'___ the report, she realised the error.',  opts:['Read','Reading','Having read','To read'], ans:2, tip:'Önce okudu, sonra fark etti: Having read'},
      {type:'clash',  q:'Hangisi doğru participle clause?',  a:'Exhausted from the race, the medal was won.',  b:'Exhausted from the race, she won the medal.',  correct:'b'},
    ]
  },
  {
    id:'c1-nominalization', level:'C1', cat:'İleri Yapılar', icon:'🔬',
    title:'Nominalization — Adlaştırma', sub:'Fiil ve Sıfatları İsme Dönüştürme',
    desc:'Fiil ve sıfatları isme çevirmek (nominalization) akademik ve resmi yazının temel özelliğidir. Cümleyi yoğunlaştırır.',
    contrast:'Türkçede "-me/-ma, -iş" ekleri benzer işlev görür. İngilizcede -tion, -ment, -ness, -ity gibi ekler yaygındır.',
    register:{ formal:95, informal:20, written:98, spoken:20 },
    formula:[{t:'Fiil/Sıfat',c:'#3b82f6'},{t:'→',c:'#6b7280'},{t:'İsim (-tion/-ment/-ness)',c:'#ec4899'}],
    dna:[{w:'The government',r:'Özne',c:'#3b82f6'},{w:'announced',r:'Fiil',c:'#10b981'},{w:'the implementation',r:'Nominalization (implement→)',c:'#ec4899'},{w:'of new policies.',r:'Tamamlayıcı',c:'#8b5cf6'}],
    exs:[
      {en:'They decided → Their decision was unanimous.',      tr:'Karar verdiler → Kararları oybirliğiydi.'},
      {en:'The government implemented → The implementation was swift.', tr:'Hükümet uyguladı → Uygulama hızlıydı.'},
      {en:'She is creative → Her creativity is remarkable.',  tr:'O yaratıcı → Yaratıcılığı dikkat çekici.'},
    ],
    err:{w:'The argue about this is long.',r:'The argument about this is lengthy.',tip:'"argue" fiil → "argument" isim; sıfat da uygun seçilmeli.'},
    drills:[
      {type:'mutate', sentence:'His ___ to lead was impressive. (decide)',  opts:['decision','decide','decided','deciding'], ans:0, tip:'decide → decision (fiil→isim)'},
      {type:'clash',  q:'Hangisi nominalization kullanıyor?',  a:'They failed to achieve the goal.',  b:'Their failure to achieve the goal was significant.',  correct:'b'},
    ]
  },
  {
    id:'c1-subjunctive', level:'C1', cat:'İleri Yapılar', icon:'🎩',
    title:'Subjunctive — Dilek Kipi', sub:'Resmi Dilek, Talep ve Öneri',
    desc:'Resmi İngilizcede "suggest/recommend/insist/demand + that + özne + yalın fiil (subjunctive)" kullanılır.',
    contrast:'Türkçede dilek kipi geniş kullanılır. İngilizcede subjunctive sadece resmi bağlamlarda ve belirli fiillerden sonra gelir.',
    register:{ formal:95, informal:20, written:95, spoken:20 },
    formula:[{t:'suggest/recommend/insist',c:'#ec4899'},{t:'+ that +',c:'#6b7280'},{t:'Özne + Fiil (yalın)',c:'#3b82f6'}],
    dna:[{w:'I suggest',r:'Öneri fiili',c:'#ec4899'},{w:'that',r:'Bağlaç',c:'#6b7280'},{w:'he',r:'Özne',c:'#3b82f6'},{w:'be',r:'Yalın fiil (subjunctive)',c:'#8b5cf6'},{w:'more careful.',r:'Tamamlayıcı',c:'#f59e0b'}],
    exs:[
      {en:'I suggest that he be more careful.',       tr:'Daha dikkatli olmasını öneririm. (resmi)'},
      {en:'The doctor recommended she rest for a week.', tr:'Doktor bir hafta dinlenmesini önerdi.'},
      {en:'The board insisted that funds be released.', tr:'Yönetim kurulu fonların serbest bırakılmasında ısrar etti.'},
    ],
    err:{w:'I suggest that he is more careful.',r:'I suggest that he be more careful.',tip:'Subjunctive\'de "be" kullanılır — "is" değil (resmi bağlam)!'},
    drills:[
      {type:'mutate', sentence:'The committee recommends that the report ___ revised.',  opts:['is','was','be','being'], ans:2, tip:'Subjunctive: yalın fiil → "be"'},
      {type:'clash',  q:'Hangisi doğru (resmi subjunctive)?',  a:'I demand that she is punished.',  b:'I demand that she be punished.',  correct:'b'},
    ]
  },
  {
    id:'c1-ellipsis', level:'C1', cat:'Söylem Yapıları', icon:'✂️',
    title:'Ellipsis ve Substitution', sub:'Tekrarı Önlemek İçin Kısaltma',
    desc:'Ellipsis tekrarlanan öğeleri kaldırır (A: "Can you help?" B: "I can."). Substitution bunların yerine "so/do/one" gibi sözcükler kullanır.',
    contrast:'Türkçede benzer kısaltmalar vardır. İngilizce ellipsis ve substitution kuralları yazılı/sözlü metinlerde tutarlılık sağlar.',
    register:{ formal:75, informal:90, written:75, spoken:90 },
    formula:[{t:'Kısaltma:',c:'#6b7280'},{t:'Yardımcı fiil',c:'#10b981'},{t:'+ geri kalan kaldırılır',c:'#6b7280'}],
    dna:[{w:'"Will you come?"',r:'Soru',c:'#3b82f6'},{w:'"I might."',r:'Ellipsis (come kaldırıldı)',c:'#10b981'},{w:'"I think so."',r:'Substitution (so=gelme)',c:'#ec4899'}],
    exs:[
      {en:'She can swim and so can he.',          tr:'O yüzebiliyor, o da yüzebiliyor.'},
      {en:'"Did you enjoy it?" "I did."',         tr:'"Beğendin mi?" "Beğendim." (enjoy kaldırıldı)'},
      {en:'I said she was right, and she is.',    tr:'Haklı olduğunu söyledim ve öyle.'},
    ],
    err:{w:'She can swim and he can swim too.',r:'She can swim and so can he.',tip:'Tekrarı önlemek için: "so can he" → daha doğal ve kısa!'},
    drills:[
      {type:'mutate', sentence:'"Are you coming?" "I think ___."',  opts:['it','that','so','yes'], ans:2, tip:'Substitution: "so" = "that I am coming"'},
      {type:'clash',  q:'Hangisi doğru ellipsis?',  a:'She left early and John left early too.',  b:'She left early and so did John.',  correct:'b'},
    ]
  },

  // ══════════════ C2 ══════════════
  {
    id:'c2-complex-inv', level:'C2', cat:'Uzman Yapılar', icon:'💎',
    title:'Koşullu Devrik: Had / Were / Should', sub:'"If" Olmadan Koşul',
    desc:'"Had I known..." / "Were it not for..." / "Should you need..." — bunlar resmi İngilizcede "if" olmadan koşul kurar.',
    contrast:'Türkçede bu yapının doğrudan karşılığı yoktur. İngilizce edebiyat ve hukuk metinlerinde sık kullanılır.',
    register:{ formal:98, informal:5, written:98, spoken:5 },
    formula:[{t:'Had/Were/Should',c:'#f59e0b'},{t:'+ Özne + ...,',c:'#3b82f6'},{t:'sonuç cümlesi',c:'#10b981'}],
    dna:[{w:'Had',r:'Koşul (=If I had)',c:'#f59e0b'},{w:'I known',r:'Past Perfect devriği',c:'#3b82f6'},{w:'the truth,',r:'Nesne',c:'#6b7280'},{w:'I would have acted differently.',r:'Sonuç',c:'#10b981'}],
    exs:[
      {en:'Had I known, I would have acted differently.',        tr:'Bilseydim farklı davranırdım. (=If I had known)'},
      {en:'Were it not for her help, I would have failed.',     tr:'Yardımı olmasaydı başarısız olurdum.'},
      {en:'Should you require assistance, please contact us.',  tr:'Yardıma ihtiyaç duyarsanız lütfen bizimle iletişime geçin.'},
    ],
    err:{w:'Had I will know the truth, I would acted.',r:'Had I known the truth, I would have acted differently.',tip:'"Had I known" = Past Perfect devrik — "will" gelmez, sonuçta "would have + V3"!'},
    drills:[
      {type:'mutate', sentence:'___ it not for the rain, we would have stayed longer.',  opts:['Had','Were','Should','If'], ans:1, tip:'"Were it not for" → koşulsuz devrik yapı'},
      {type:'clash',  q:'Hangisi doğru resmi devrik koşul?',  a:'If you should need help, call us.',  b:'Should you need help, call us.',  correct:'b'},
    ]
  },
  {
    id:'c2-fronting', level:'C2', cat:'Uzman Yapılar', icon:'🏆',
    title:'Fronting — Öne Alma', sub:'Bilgi Odaklaması için Sözcük Sırası',
    desc:'Normalde cümle sonunda gelen öge vurgu için başa alınır. Özne-yardımcı fiil sırası korunur (inversion gerekmez).',
    contrast:'Türkçede sözcük sırası daha esnek olduğundan vurgu kolaydır. İngilizce fronting yazılı ve akademik metinde çok etki yaratır.',
    register:{ formal:90, informal:45, written:95, spoken:45 },
    formula:[{t:'Vurgulanan öge',c:'#ec4899'},{t:'+ normal cümle sırası',c:'#3b82f6'}],
    dna:[{w:'This problem',r:'Fronted object (vurgu)',c:'#ec4899'},{w:'we',r:'Özne',c:'#3b82f6'},{w:'have been',r:'Yardımcı',c:'#10b981'},{w:'trying to solve',r:'Ana fiil',c:'#8b5cf6'},{w:'for years.',r:'Zaman zarfı',c:'#f59e0b'}],
    exs:[
      {en:'This problem we have been trying to solve for years.',  tr:'Bu sorunu yıllardır çözmeye çalışıyoruz. (vurgu: sorun)'},
      {en:'Interesting he certainly is, but reliable he is not.', tr:'İlginç kesinlikle, ama güvenilir değil.'},
    ],
    err:{w:'This problem, we been trying to solve it for years.',r:'This problem we have been trying to solve for years.',tip:'Fronting\'de ek bir "it" kullanılmaz — nesne zaten başa taşındı!'},
    drills:[
      {type:'clash',  q:'Hangisi doğru fronting?',  a:'That book I read it last year.',  b:'That book I read last year.',  correct:'b'},
    ]
  },
  {
    id:'c2-discourse', level:'C2', cat:'Söylem Yetkinliği', icon:'🌐',
    title:'İleri Söylem Belirteçleri', sub:'Söylem Bağlantısı ve Argüman Yönetimi',
    desc:'Söylem belirteçleri metni birbirine bağlar. C2 seviyesinde daha ince nüanslar: "admittedly, notwithstanding, inasmuch as, by the same token".',
    contrast:'Türkçede "bununla birlikte, öte yandan" gibi belirteçler var. İngilizce C2 belirteçleri akademik yazının omurgasıdır.',
    register:{ formal:98, informal:10, written:98, spoken:10 },
    formula:[{t:'Söylem belirteci,',c:'#f59e0b'},{t:'+ cümle yapısı',c:'#3b82f6'}],
    dna:[{w:'Notwithstanding',r:'Karşıt söylem belirteci',c:'#f59e0b'},{w:'these concerns,',r:'Bağlam',c:'#6b7280'},{w:'the policy was implemented.',r:'Ana cümle',c:'#3b82f6'}],
    exs:[
      {en:'Admittedly, the data is limited; nevertheless, the trend is clear.',   tr:'Verilerin sınırlı olduğu kabul edilse de eğilim açıktır.'},
      {en:'Notwithstanding these concerns, the project proceeded.',               tr:'Bu kaygılara karşın proje devam etti.'},
      {en:'By the same token, increased funding does not guarantee success.',     tr:'Aynı şekilde, artan finansman başarıyı garantilemez.'},
    ],
    err:{w:'Despite of the rain, they continued.',r:'Despite the rain, they continued.',tip:'"Despite" + isim/gerund (of yok!); "in spite of" → of var.'},
    drills:[
      {type:'mutate', sentence:'The results were poor. ___, the team remained optimistic.',  opts:['Despite','Nevertheless','Although','Because'], ans:1, tip:'"Nevertheless" = buna rağmen (cümle başında)'},
      {type:'clash',  q:'Hangisi C2 söylem belirteci doğru?',  a:'Despite of the cost, it was worth it.',  b:'Notwithstanding the cost, it was worth it.',  correct:'b'},
    ]
  },
  {
    id:'c2-register', level:'C2', cat:'Söylem Yetkinliği', icon:'🎭',
    title:'Register Geçişi', sub:'Resmi ve Gayri-resmi Dil Arasında Geçiş',
    desc:'Aynı fikri farklı register\'larda ifade edebilmek C2\'nin özüdür. Sözcük seçimi, yapı karmaşıklığı ve tonal farklılıklar.',
    contrast:'Türkçede yazı-konuşma farkı belirgindir. İngilizce\'de formal/informal geçiş hem sözcük hem de gramer yapısını etkiler.',
    register:{ formal:90, informal:90, written:90, spoken:90 },
    formula:[{t:'Informal: get, nice, good',c:'#10b981'},{t:'↔',c:'#6b7280'},{t:'Formal: obtain, pleasant, satisfactory',c:'#8b5cf6'}],
    dna:[{w:'We need to look at',r:'Informal ifade',c:'#10b981'},{w:'↔',r:'Dönüşüm',c:'#6b7280'},{w:'An examination of',r:'Formal nominalization',c:'#8b5cf6'},{w:'the data is required.',r:'Resmi yapı',c:'#f59e0b'}],
    exs:[
      {en:'Inf: "We need to look at the data." → Form: "An examination of the data is required."', tr:'Resmi→Gayriresmi dönüşüm'},
      {en:'Inf: "The plan didn\'t work." → Form: "The initiative proved unsuccessful."',            tr:'Başarısız oldu → başarısız kanıtlandı.'},
    ],
    err:{w:'Dear John, I am writing to inquire, what\'s up?',r:'Dear John, I am writing to inquire about...',tip:'Resmi mektupta "what\'s up" register hatasıdır!'},
    drills:[
      {type:'clash',  q:'Hangisi resmi (formal) versiyonu?',  a:'They got rid of the problem.',  b:'The issue was subsequently resolved.',  correct:'b'},
      {type:'mutate', sentence:'The project ___ (resmi) significant challenges.',  opts:['got lots of','encountered','had lots of','faced up to'], ans:1, tip:'"encountered" resmi — "got lots of" informal'},
    ]
  },

  ] // rules end
}; // GRAMMAR_DATA end
