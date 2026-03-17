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
    url: "https://files.catbox.moe/s8k9ep.mp4",
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
    url: "https://files.catbox.moe/5b3q6j.mp4",
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
    url: "https://files.catbox.moe/m581qt.mp4",
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
     HUSTLE (2022) — Netflix
  ══════════════════════════════════════════════════════════ */
  {
    id: 82,
    url: "https://files.catbox.moe/m8f5zl.mp4",
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
    url: "https://files.catbox.moe/vxryvs.mp4",
    start: 0,
    end: 15,
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
    url: "https://files.catbox.moe/v06msa.mp4",
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
    url: "https://files.catbox.moe/dqdn7b.mp4",
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
    url: "https://files.catbox.moe/09jf04.mp4",
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
     WALL STREET (1987) — Fair Use / Eğitim
  ══════════════════════════════════════════════════════════ */
  {
    id: 88,
    url: "https://files.catbox.moe/fojdn1.mp4",
    start: 0,
    end: 16,
    film: "Wall Street",
    year: 1987,
    transcript: "The point is, ladies and gentlemen, that greed, for lack of a better word, is good. Greed is right. Greed works.",
    options: [
      { text: "Mesele şu, bayanlar ve baylar: açgözlülük, daha iyi bir kelime olmadığından, iyidir. Açgözlülük doğrudur. Açgözlülük işe yarar.", isCorrect: true },
      { text: "Açgözlülük sizi mahveder. Dürüstlük ve erdem başarının tek yoludur.", isCorrect: false }
    ],
    points: 15,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     BRAVEHEART (1995) — Fair Use / Eğitim
  ══════════════════════════════════════════════════════════ */
  {
    id: 89,
    url: "https://files.catbox.moe/d85bng.mp4",
    start: 0,
    end: 14,
    film: "Braveheart",
    year: 1995,
    transcript: "They may take our lives, but they'll never take our freedom!",
    options: [
      { text: "Hayatlarımızı alabilirler, ama özgürlüğümüzü asla alamazlar!", isCorrect: true },
      { text: "Hayatlarımızı kurtarmak için özgürlüğümüzden vazgeçmeliyiz.", isCorrect: false }
    ],
    points: 14,
    category: "Aksiyon"
  },

  /* ══════════════════════════════════════════════════════════
     INDEPENDENCE DAY (1996) — Fair Use / Eğitim
  ══════════════════════════════════════════════════════════ */
  {
    id: 90,
    url: "https://files.catbox.moe/c5rkme.mp4",
    start: 0,
    end: 22,
    film: "Independence Day",
    year: 1996,
    transcript: "We will not go quietly into the night. We will not vanish without a fight. We're going to live on. We're going to survive. Today we celebrate our Independence Day!",
    options: [
      { text: "Geceye sessizce girmeyeceğiz. Savaşmadan yok olmayacağız. Yaşamaya devam edeceğiz. Hayatta kalacağız. Bugün Bağımsızlık Günümüzü kutluyoruz!", isCorrect: true },
      { text: "Geceye sessizce gireceğiz. Bu savaşı kazanamayız, teslim olmaktan başka seçeneğimiz yok.", isCorrect: false }
    ],
    points: 17,
    category: "Aksiyon"
  },

  /* ══════════════════════════════════════════════════════════
     DARKEST HOUR (2017) — Fair Use / Eğitim
  ══════════════════════════════════════════════════════════ */
  {
    id: 91,
    url: "https://files.catbox.moe/tfzs8f.mp4",
    start: 0,
    end: 24,
    film: "Darkest Hour",
    year: 2017,
    transcript: "We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.",
    options: [
      { text: "Sahillerde savaşacağız, çıkarma alanlarında savaşacağız, tarlalarda ve sokaklarda savaşacağız, tepelerde savaşacağız; asla teslim olmayacağız.", isCorrect: true },
      { text: "Sahillerde barış görüşmeleri yapacağız. Düşmanla uzlaşmak en akıllıca yoldur.", isCorrect: false }
    ],
    points: 17,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     FENCES (2016) — Fair Use / Eğitim
  ══════════════════════════════════════════════════════════ */
  {
    id: 92,
    url: "https://files.catbox.moe/1ow43r.mp4",
    start: 0,
    end: 16,
    film: "Fences",
    year: 2016,
    transcript: "A man is supposed to take care of his family. You live in my house, you put a sir on the end of it. Because you're my son. Because it's my duty to take care of you.",
    options: [
      { text: "Bir adam ailesine bakmak zorundadır. Benim evimde yaşıyorsun, konuşurken 'efendim' diyeceksin. Çünkü oğlumsun. Çünkü sana bakmak benim görevim.", isCorrect: true },
      { text: "Bir adam ailesinden bağımsız olmalıdır. Evimde yaşaman için sana borçlu değilim.", isCorrect: false }
    ],
    points: 15,
    category: "Drama"
  },

];
