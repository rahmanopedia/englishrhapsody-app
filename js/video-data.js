/**
 * RHAPSODY CINEMA — Video Veritabanı (v8.0)
 * Tüm klipler catbox.moe'da barındırılıyor — anında oynatma, sıfır bekleme.
 * Kaynak filmler: YouTube'dan yt-dlp+FFmpeg ile kesildi, catbox.moe'ya yüklendi.
 * Altyazılar doğrulanmış timestamp'lerle eşleştirildi.
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
      { text: "Annem hayatın acı olduğunu ama güzel göründüğünü söylerdi.", isCorrect: false },
      { text: "Hayat bir kutu çikolata gibidir, hepsinin tadı aynıdır.", isCorrect: false }
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
    end: 22,
    film: "The Shawshank Redemption",
    year: 1994,
    transcript: "Remember, Red, hope is a good thing, maybe the best of things. And no good thing ever dies.",
    options: [
      { text: "Unutma Red, umut iyi bir şeydir, belki de en iyisi. Ve hiçbir iyi şey ölmez.", isCorrect: true },
      { text: "Umut tehlikelidir, insanı hayal kırıklığına uğratır.", isCorrect: false },
      { text: "Kötü şeyler de zamanla iyiye dönüşür, sabırla bekle.", isCorrect: false }
    ],
    points: 18,
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
      { text: "Carpe diem, yani her şeyi yarına bırakın.", isCorrect: false },
      { text: "Hayatınızı sıradan tutun, olağanüstü olmak tehlikelidir.", isCorrect: false }
    ],
    points: 16,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     THE MATRIX (1999)
  ══════════════════════════════════════════════════════════ */
  {
    id: 76,
    url: "https://files.catbox.moe/xi03zy.mp4",
    start: 0,
    end: 20,
    film: "The Matrix",
    year: 1999,
    transcript: "This is your last chance. After this, there is no turning back. You take the blue pill, the story ends. You take the red pill, you stay in Wonderland.",
    options: [
      { text: "Bu son şansın. Bundan sonra geri dönüş yok. Mavi hapı alırsan hikaye biter. Kırmızı hapı alırsan Harikalar Diyarı'nda kalırsın.", isCorrect: true },
      { text: "Hangi hapı alırsan al fark etmez, sonuç aynıdır.", isCorrect: false },
      { text: "Kırmızı hap seni uyutacak, mavi hap ise gerçeği gösterecek.", isCorrect: false }
    ],
    points: 18,
    category: "Aksiyon"
  },

  /* ══════════════════════════════════════════════════════════
     GOOD WILL HUNTING (1997)
  ══════════════════════════════════════════════════════════ */
  {
    id: 77,
    url: "https://files.catbox.moe/3mhqt2.mp4",
    start: 0,
    end: 45,
    film: "Good Will Hunting",
    year: 1997,
    transcript: "It's not your fault. It's not your fault. It's not your fault.",
    options: [
      { text: "Bu senin hatan değil. Bu senin hatan değil. Bu senin hatan değil.", isCorrect: true },
      { text: "Her şey senin hatan, bunu kabul et.", isCorrect: false },
      { text: "Kimin hatası olduğu önemli değil artık.", isCorrect: false }
    ],
    points: 15,
    category: "Drama"
  },


  /* ══════════════════════════════════════════════════════════
     BIRD BOX (2018) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=j5XghrgEFLw
  ══════════════════════════════════════════════════════════ */
  {
    id: 78,
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
    id: 79,
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
    id: 80,
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
    id: 81,
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
    id: 82,
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
