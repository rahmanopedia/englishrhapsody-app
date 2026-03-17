/**
 * RHAPSODY CINEMA — Video Veritabanı (v9.0)
 * Kısa sahneler: max 1-3 cümle, 8-16 saniye.
 */
var CINEMA_DATA = [

  /* ══════════════════════════════════════════════════════════
     FORREST GUMP (1994)
  ══════════════════════════════════════════════════════════ */
  {
    id: 72,
    url: "https://files.catbox.moe/e36yyr.mp4",
    start: 0,
    end: 14,
    film: "Forrest Gump",
    year: 1994,
    transcript: "My mama always said life was like a box of chocolates. You never know what you're gonna get.",
    options: [
      { text: "Annem her zaman hayatın bir kutu çikolataya benzediğini söylerdi. Ne çıkacağını asla bilemezsin.", isCorrect: true },
      { text: "Annem hayatın acı olduğunu ama güzel göründüğünü söylerdi.", isCorrect: false }
    ],
    points: 16,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     THE SHAWSHANK REDEMPTION (1994)
  ══════════════════════════════════════════════════════════ */
  {
    id: 73,
    url: "https://files.catbox.moe/gzuj91.mp4",
    start: 0,
    end: 15,
    film: "The Shawshank Redemption",
    year: 1994,
    transcript: "Hope is a good thing, maybe the best of things. And no good thing ever dies.",
    options: [
      { text: "Umut iyi bir şeydir, belki de en iyisi. Ve hiçbir iyi şey ölmez.", isCorrect: true },
      { text: "Umut tehlikelidir, insanı hayal kırıklığına uğratır.", isCorrect: false }
    ],
    points: 16,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     DEAD POETS SOCIETY (1989)
  ══════════════════════════════════════════════════════════ */
  {
    id: 74,
    url: "https://files.catbox.moe/osemfp.mp4",
    start: 0,
    end: 15,
    film: "Dead Poets Society",
    year: 1989,
    transcript: "Carpe diem. Seize the day, boys. Make your lives extraordinary.",
    options: [
      { text: "Carpe diem. Günü yakala, çocuklar. Hayatınızı olağanüstü kılın.", isCorrect: true },
      { text: "Carpe diem, yani her şeyi yarına bırakın.", isCorrect: false }
    ],
    points: 15,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     THE MATRIX (1999)
  ══════════════════════════════════════════════════════════ */
  {
    id: 76,
    url: "https://files.catbox.moe/xi03zy.mp4",
    start: 0,
    end: 12,
    film: "The Matrix",
    year: 1999,
    transcript: "This is your last chance. After this, there is no turning back.",
    options: [
      { text: "Bu son şansın. Bundan sonra geri dönüş yok.", isCorrect: true },
      { text: "Bu ilk şansın. Bundan sonra her şey daha iyi olacak.", isCorrect: false }
    ],
    points: 14,
    category: "Aksiyon"
  },

  /* ══════════════════════════════════════════════════════════
     GOOD WILL HUNTING (1997)
  ══════════════════════════════════════════════════════════ */
  {
    id: 77,
    url: "https://files.catbox.moe/3mhqt2.mp4",
    start: 0,
    end: 14,
    film: "Good Will Hunting",
    year: 1997,
    transcript: "It's not your fault. It's not your fault.",
    options: [
      { text: "Bu senin hatan değil. Bu senin hatan değil.", isCorrect: true },
      { text: "Her şey senin hatan. Bunu kabul etmelisin.", isCorrect: false }
    ],
    points: 14,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     BIRD BOX (2018) — Netflix
  ══════════════════════════════════════════════════════════ */
  {
    id: 78,
    url: "https://files.catbox.moe/dfsnzq.mp4",
    start: 0,
    end: 12,
    film: "Bird Box",
    year: 2018,
    transcript: "Under no circumstance are you allowed to take off your blindfold. Do not take your blindfold off.",
    options: [
      { text: "Hiçbir koşulda göz bağını çıkarmanıza izin verilmiyor. Göz bağını çıkarma.", isCorrect: true },
      { text: "Tehlike geçince göz bağını çıkar ve etrafa bak.", isCorrect: false }
    ],
    points: 15,
    category: "Gerilim"
  },

  /* ══════════════════════════════════════════════════════════
     KNIVES OUT (2019) — Netflix
  ══════════════════════════════════════════════════════════ */
  {
    id: 79,
    url: "https://files.catbox.moe/snnhnj.mp4",
    start: 0,
    end: 15,
    film: "Knives Out",
    year: 2019,
    transcript: "There is at least one truly guilty party behind it all, guilty in the true sense of acting with malice.",
    options: [
      { text: "Tüm bunların arkasında gerçekten suçlu en az bir kişi var; kötü niyetle hareket etmiş.", isCorrect: true },
      { text: "Herkes masumdur, bu bir kazadır; kimse kasıtlı kötülük yapmadı.", isCorrect: false }
    ],
    points: 17,
    category: "Gizem"
  },

  /* ══════════════════════════════════════════════════════════
     MARRIAGE STORY (2019) — Netflix
  ══════════════════════════════════════════════════════════ */
  {
    id: 80,
    url: "https://files.catbox.moe/c8o6po.mp4",
    start: 0,
    end: 12,
    film: "Marriage Story",
    year: 2019,
    transcript: "He loves being a dad. He cries easily in movies.",
    options: [
      { text: "Baba olmayı seviyor. Filmlerde kolayca ağlıyor.", isCorrect: true },
      { text: "Baba olmaktan nefret ediyor. Filmlerde hiç ağlamıyor.", isCorrect: false }
    ],
    points: 13,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     EXTRACTION (2020) — Netflix
  ══════════════════════════════════════════════════════════ */
  {
    id: 81,
    url: "https://files.catbox.moe/n3yrhr.mp4",
    start: 0,
    end: 10,
    film: "Extraction",
    year: 2020,
    transcript: "You drown not by falling into the river, but by staying submerged in it.",
    options: [
      { text: "Nehre düşerek boğulmazsın; nehirde kalmaya devam ederek boğulursun.", isCorrect: true },
      { text: "Nehre düşersen hemen yüz, yoksa boğulursun.", isCorrect: false }
    ],
    points: 15,
    category: "Aksiyon"
  },

  /* ══════════════════════════════════════════════════════════
     HUSTLE (2022) — Netflix
  ══════════════════════════════════════════════════════════ */
  {
    id: 82,
    url: "https://files.catbox.moe/7rmg07.mp4",
    start: 0,
    end: 14,
    film: "Hustle",
    year: 2022,
    transcript: "Do you love the game? Because the game don't love you back.",
    options: [
      { text: "Oyunu seviyor musun? Çünkü oyun seni sevmiyor.", isCorrect: true },
      { text: "Oyunu sevmek zorunda değilsin, sadece para kazan.", isCorrect: false }
    ],
    points: 14,
    category: "Spor"
  },


  /* ══════════════════════════════════════════════════════════
     THE PURSUIT OF HAPPYNESS (2006) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=UZb2NOHPA2A
  ══════════════════════════════════════════════════════════ */
  {
    id: 83,
    url: "https://files.catbox.moe/alnp21.mp4",
    start: 0,
    end: 29,
    film: "The Pursuit of Happyness",
    year: 2006,
    transcript: "Don't ever let somebody tell you you can't do something. Not even me. You got a dream, you got to protect it.",
    options: [
      { text: "Asla kimsenin sana bir şeyi yapamayacağını söylemesine izin verme. Ben dahil. Bir hayalin var, onu koruman lazım.", isCorrect: true },
      { text: "Her zaman başkalarının tavsiyelerine uyu. Hayallerinden vazgeçmek bazen daha akıllıcadır.", isCorrect: false },
      { text: "Birileri sana yapamayacağını söylediğinde muhtemelen haklıdır, dikkat et.", isCorrect: false }
    ],
    points: 17,
    category: "Drama"
  },


  /* ══════════════════════════════════════════════════════════
     ROCKY BALBOA (2006) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=6E8cDw4EHMA
  ══════════════════════════════════════════════════════════ */
  {
    id: 84,
    url: "https://files.catbox.moe/xevpjj.mp4",
    start: 0,
    end: 14,
    film: "Rocky Balboa",
    year: 2006,
    transcript: "It ain't about how hard you hit. It's about how hard you can get hit and keep moving forward. That's how winning is done.",
    options: [
      { text: "Ne kadar sert vurduğunla ilgili değil. Ne kadar sert yenilgi alıp yine de ilerlemeye devam edebileceğinle ilgili. Kazanmak böyle yapılır.", isCorrect: true },
      { text: "En sert vuranlar her zaman kazanır. Gücün varsa hiç yenilmezsin.", isCorrect: false },
      { text: "Kazanmak için asla yenilgi almaman gerekir; yenilmek seni zayıf yapar.", isCorrect: false }
    ],
    points: 17,
    category: "Spor"
  },


  /* ══════════════════════════════════════════════════════════
     INCEPTION (2010) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=i3-jlhJgU9U
  ══════════════════════════════════════════════════════════ */
  {
    id: 85,
    url: "https://files.catbox.moe/951utj.mp4",
    start: 0,
    end: 25,
    film: "Inception",
    year: 2010,
    transcript: "When we're asleep, our mind can do almost anything. In a dream, we create and perceive our world simultaneously.",
    options: [
      { text: "Uyuduğumuzda zihnimiz neredeyse her şeyi yapabilir. Rüyada dünyamızı aynı anda hem yaratır hem de algılarız.", isCorrect: true },
      { text: "Uyuduğumuzda zihnimiz tamamen kapanır ve hiçbir şeyi algılayamayız.", isCorrect: false },
      { text: "Rüyada sadece gözlemleriz; hiçbir şey yaratamayız.", isCorrect: false }
    ],
    points: 16,
    category: "Bilim Kurgu"
  },


  /* ══════════════════════════════════════════════════════════
     LA LA LAND (2016) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=RHz9rXVt3cQ
  ══════════════════════════════════════════════════════════ */
  {
    id: 86,
    url: "https://files.catbox.moe/fnfpil.mp4",
    start: 0,
    end: 16,
    film: "La La Land",
    year: 2016,
    transcript: "Do you like the music you're playing? Because if you're gonna give up your dream, I think it matters that you like what you're playing.",
    options: [
      { text: "Çaldığın müziği seviyor musun? Çünkü hayalinden vazgeçeceksen, çaldığın şeyi sevmeni önemli buluyorum.", isCorrect: true },
      { text: "Çaldığın müziği sevmek zorunda değilsin; para kazanmak daha önemlidir.", isCorrect: false },
      { text: "Hayalinden vazgeçmek kolay değildir ama müziğin önemi yoktur.", isCorrect: false }
    ],
    points: 15,
    category: "Müzikal"
  },


  /* ══════════════════════════════════════════════════════════
     SPIDER-MAN (2002) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=kb4jEHmH_kU
  ══════════════════════════════════════════════════════════ */
  {
    id: 87,
    url: "https://files.catbox.moe/5kqsqm.mp4",
    start: 0,
    end: 14,
    film: "Spider-Man",
    year: 2002,
    transcript: "With great power comes great responsibility. This is my gift, my curse.",
    options: [
      { text: "Büyük güç, büyük sorumluluk getirir. Bu benim armağanım, lanetim.", isCorrect: true },
      { text: "Büyük güç, büyük özgürlük getirir. Bunu bir lütuf olarak kabul et.", isCorrect: false },
      { text: "Güç sorumluluk gerektirmez; sadece kendin için kullan.", isCorrect: false }
    ],
    points: 15,
    category: "Aksiyon"
  },


  /* ══════════════════════════════════════════════════════════
     BIRD BOX (2018) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=j5XghrgEFLw
  ══════════════════════════════════════════════════════════ */
  {
    id: 88,
    url: "https://files.catbox.moe/dfsnzq.mp4",
    start: 0,
    end: 24,
    film: "Bird Box",
    year: 2018,
    transcript: "Under no circumstance are you allowed to take off your blindfold. Do not take your blindfold off. If you hear something in the woods, you tell me. If you hear something in the water, you tell me. But you never, ever take off your blindfold.",
    options: [
      { text: "Hiçbir koşulda göz bağını çıkarmanıza izin verilmiyor. Göz bağını çıkarma. Ormanda bir şey duyarsan bana söyle. Suda bir şey duyarsan bana söyle. Ama asla, asla göz bağını çıkarma.", isCorrect: true },
      { text: "Göz bağını istediğinde çıkarabilirsin, sadece dikkatli ol ve sessiz kal.", isCorrect: false },
      { text: "Tehlike geçince göz bağını çıkar ve etrafa bak, ne gördüğünü söyle.", isCorrect: false }
    ],
    points: 17,
    category: "Gerilim"
  },


  /* ══════════════════════════════════════════════════════════
     KNIVES OUT (2019) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=FRlGQL5BJjM
  ══════════════════════════════════════════════════════════ */
  {
    id: 89,
    url: "https://files.catbox.moe/snnhnj.mp4",
    start: 0,
    end: 30,
    film: "Knives Out",
    year: 2019,
    transcript: "There is at least one truly guilty party behind it all, guilty in the true sense of acting with malice and committing a heinous crime with selfish intent.",
    options: [
      { text: "Tüm bunların arkasında en az bir gerçekten suçlu kişi var; kötü niyetle hareket etmek ve bencil amaçlarla iğrenç bir suç işlemek anlamında gerçekten suçlu.", isCorrect: true },
      { text: "Herkes masumdur, bu bir kaza; kimse kasıtlı olarak kötü bir şey yapmadı.", isCorrect: false },
      { text: "Suçlu kişi pişmandır ve her şeyi itiraf etmeye hazırdır.", isCorrect: false }
    ],
    points: 18,
    category: "Gizem"
  },


  /* ══════════════════════════════════════════════════════════
     MARRIAGE STORY (2019) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=UPubdNMDGUM
  ══════════════════════════════════════════════════════════ */
  {
    id: 90,
    url: "https://files.catbox.moe/c8o6po.mp4",
    start: 0,
    end: 40,
    film: "Marriage Story",
    year: 2019,
    transcript: "You know what I love about Charlie? He loves being a dad. He cries easily in movies. He's very competitive. He's a great dresser. He takes all of my moods steadily.",
    options: [
      { text: "Charlie hakkında ne sevdiğimi biliyor musun? Baba olmayı seviyor. Filmlerde kolayca ağlıyor. Çok rekabetçidir. Harika giyiniyor. Tüm ruh hallerimi sabırla karşılıyor.", isCorrect: true },
      { text: "Charlie hakkında ne sevdiğimi biliyor musun? Hiçbir zaman evde olmaz ve beni umursamaz.", isCorrect: false },
      { text: "Charlie sabırsız ve duygusuz biridir; kimseyle iyi geçinemez.", isCorrect: false }
    ],
    points: 16,
    category: "Drama"
  },


  /* ══════════════════════════════════════════════════════════
     EXTRACTION (2020) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=qGIgrU6lFD0
  ══════════════════════════════════════════════════════════ */
  {
    id: 91,
    url: "https://files.catbox.moe/n3yrhr.mp4",
    start: 0,
    end: 40,
    film: "Extraction",
    year: 2020,
    transcript: "You drown not by falling into the river, but by staying submerged in it.",
    options: [
      { text: "Nehre düşerek boğulmazsın; nehirde kalmaya devam ederek boğulursun.", isCorrect: true },
      { text: "Nehre düştüğünde en hızlı şekilde yüzmeli ve kıyıya çıkmalısın.", isCorrect: false },
      { text: "Nehirde boğulmak için önce suya girmen gerekir, düşmek yetmez.", isCorrect: false }
    ],
    points: 15,
    category: "Aksiyon"
  },


  /* ══════════════════════════════════════════════════════════
     HUSTLE (2022) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=Oyl40PC-dQ8
  ══════════════════════════════════════════════════════════ */
  {
    id: 92,
    url: "https://files.catbox.moe/7rmg07.mp4",
    start: 0,
    end: 70,
    film: "Hustle",
    year: 2022,
    transcript: "Do you love the game? I need to know. Do you love it? Because the game don't love you back.",
    options: [
      { text: "Oyunu seviyor musun? Bilmem lazım. Onu seviyor musun? Çünkü oyun seni sevmiyor.", isCorrect: true },
      { text: "Oyunu sevmek zorunda değilsin; para kazanmak için oynamak yeterlidir.", isCorrect: false },
      { text: "Oyun seni sever ama sen onu sevmiyorsun, bu yüzden başaramıyorsun.", isCorrect: false }
    ],
    points: 15,
    category: "Spor"
  },

];
