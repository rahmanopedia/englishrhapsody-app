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

];
