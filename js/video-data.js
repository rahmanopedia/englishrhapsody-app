/**
 * RHAPSODY CINEMA — Video Veritabanı (v5.1)
 * Zaman damgaları resmi .srt dosyalarından doğrulandı.
 * YouTube kaldırıldı — reklamsız, doğrudan MP4/WebM akışı.
 *
 * Lisanslar:
 *  - Duck and Cover / Shy Guy / Dating Do's and Don'ts → Public Domain (ABD hükümet/Prelinger)
 *  - Sintel (2010) → CC BY 3.0 — Blender Foundation
 *  - Tears of Steel (2012) → CC BY 3.0 — Blender Foundation / Mango Open Movie Project
 *  - Cosmos Laundromat (2015) → CC BY 3.0 — Blender Foundation
 *  - Sprite Fright (2021) → CC BY 4.0 — Blender Foundation
 */
var CINEMA_DATA = [

  /* ══════════════════════════════════════════════════════════
     SINTEL (2010) — Blender Foundation — CC BY 3.0
     Video: archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4
     SRT kaynak: durian.blender.org
  ══════════════════════════════════════════════════════════ */
  {
    id: 10,
    url: "https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4",
    start: 106,
    end: 116,
    film: "Sintel",
    year: 2010,
    transcript: "This blade has a dark past. It has shed much innocent blood.",
    options: [
      { text: "Bu kılıcın karanlık bir geçmişi var. Pek çok masum kanı dökmüş.", isCorrect: true },
      { text: "Bu kılıç çok eskidir ama hiç kan dökmemiştir.", isCorrect: false },
      { text: "Bu kılıcı bulmak çok zor oldu.", isCorrect: false }
    ],
    points: 12,
    category: "Fantastik"
  },
  {
    id: 11,
    url: "https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4",
    start: 117,
    end: 126,
    film: "Sintel",
    year: 2010,
    transcript: "You're a fool for traveling alone, so completely unprepared. You're lucky your blood's still flowing.",
    options: [
      { text: "Yalnız yolculuk etmek için aptalsın, tamamen hazırlıksızsın. Kanın hâlâ aktığına şükret.", isCorrect: true },
      { text: "Yalnız yolculuk etmek en güvenli yoldur.", isCorrect: false },
      { text: "Hazırlıklı olmak bu yolculukta önemli değil.", isCorrect: false }
    ],
    points: 12,
    category: "Fantastik"
  },
  {
    id: 12,
    url: "https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4",
    start: 134,
    end: 146,
    film: "Sintel",
    year: 2010,
    transcript: "I'm searching for someone. Someone very dear? A kindred spirit? — A dragon.",
    options: [
      { text: "Birini arıyorum. Çok sevdiğim biri mi? — Bir ejderha.", isCorrect: true },
      { text: "Kayboldum ve eve giden yolu arıyorum.", isCorrect: false },
      { text: "Bir hazine haritası arıyorum.", isCorrect: false }
    ],
    points: 10,
    category: "Fantastik"
  },
  {
    id: 13,
    url: "https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4",
    start: 147,
    end: 157,
    film: "Sintel",
    year: 2010,
    transcript: "A dangerous quest for a lone hunter. I've been alone for as long as I can remember.",
    options: [
      { text: "Yalnız bir avcı için tehlikeli bir görev. Hatırlayabildiğim sürece hep yalnız oldum.", isCorrect: true },
      { text: "Bu görev çok kolaydır, yardım gerekmez.", isCorrect: false },
      { text: "Arkadaşlarım her zaman yanımdaydı.", isCorrect: false }
    ],
    points: 15,
    category: "Fantastik"
  },
  {
    id: 14,
    url: "https://archive.org/download/Sintel/sintel-2048-stereo_512kb.mp4",
    start: 451,
    end: 464,
    film: "Sintel",
    year: 2010,
    transcript: "You've only failed to see... These are dragon lands, Sintel. You are closer than you know.",
    options: [
      { text: "Sadece görmeyi başaramadın... Burası ejderha toprakları, Sintel. Sandığından daha yakınsın.", isCorrect: true },
      { text: "Başarısız oldun ve artık devam etmemelisin.", isCorrect: false },
      { text: "Ejderhalar bu topraklarda yaşamaz.", isCorrect: false }
    ],
    points: 15,
    category: "Fantastik"
  },

  /* ══════════════════════════════════════════════════════════
     TEARS OF STEEL (2012) — Blender Foundation — CC BY 3.0
     Video: download.blender.org (WebM — Chrome/Firefox/Edge)
     SRT kaynak: download.blender.org/demo/movies/ToS/subtitles/TOS-en.srt
  ══════════════════════════════════════════════════════════ */
  {
    id: 20,
    url: "https://download.blender.org/demo/movies/ToS/tears_of_steel_1080p.webm",
    start: 130,
    end: 139,
    film: "Tears of Steel",
    year: 2012,
    transcript: "I heard you guys talking last night. It's not my fault, you know.",
    options: [
      { text: "Dün gece konuştuğunuzu duydum. Biliyorsun, bu benim hatam değil.", isCorrect: true },
      { text: "Dün gece hiçbir şey duymadım.", isCorrect: false },
      { text: "Her şey benim hatam, kabul ediyorum.", isCorrect: false }
    ],
    points: 10,
    category: "Bilim Kurgu"
  },
  {
    id: 21,
    url: "https://download.blender.org/demo/movies/ToS/tears_of_steel_1080p.webm",
    start: 315,
    end: 329,
    film: "Tears of Steel",
    year: 2012,
    transcript: "Look Celia, we have to follow our passions. You have your robotics, and I just want to be awesome in space.",
    options: [
      { text: "Bak Celia, tutkularımızın peşinden gitmemiz gerek. Senin robotiğin var, ben de uzayda harika olmak istiyorum.", isCorrect: true },
      { text: "Celia, tutkularımızı bırakıp pratik olmamız gerekiyor.", isCorrect: false },
      { text: "Uzay seyahati imkânsızdır, boşuna hayal etme.", isCorrect: false }
    ],
    points: 12,
    category: "Bilim Kurgu"
  },
  {
    id: 22,
    url: "https://download.blender.org/demo/movies/ToS/tears_of_steel_1080p.webm",
    start: 382,
    end: 391,
    film: "Tears of Steel",
    year: 2012,
    transcript: "You broke my heart. — I know. You forgot me on earth. — I know.",
    options: [
      { text: "Kalbimi kırdın. — Biliyorum. Beni dünyada unuttun. — Biliyorum.", isCorrect: true },
      { text: "Kalbim sağlam, hiçbir şey hissetmedim.", isCorrect: false },
      { text: "Seni hiç unutmadım, her zaman düşündüm.", isCorrect: false }
    ],
    points: 12,
    category: "Bilim Kurgu"
  },
  {
    id: 23,
    url: "https://download.blender.org/demo/movies/ToS/tears_of_steel_1080p.webm",
    start: 143,
    end: 153,
    film: "Tears of Steel",
    year: 2012,
    transcript: "You'll always be part of my life. As the machine that took it.",
    options: [
      { text: "Her zaman hayatımın bir parçası olacaksın. Onu alan makine olarak.", isCorrect: true },
      { text: "Makine hayatımı iyileştirdi ve her zaman minnettarım.", isCorrect: false },
      { text: "Hayatında sana yer kalmadı artık.", isCorrect: false }
    ],
    points: 14,
    category: "Bilim Kurgu"
  },

  /* ══════════════════════════════════════════════════════════
     COSMOS LAUNDROMAT (2015) — Blender Foundation — CC BY 3.0
     Video: archive.org/download/CosmosLaundromat2015
     SRT kaynak: Blender Foundation resmi altyazı
  ══════════════════════════════════════════════════════════ */
  {
    id: 40,
    url: "https://archive.org/download/CosmosLaundromat2015/Cosmos_Laundromat_2015_HD.mp4",
    start: 65,
    end: 76,
    film: "Cosmos Laundromat",
    year: 2015,
    transcript: "What a waste. To have all of this and just throw it away.",
    options: [
      { text: "Ne israf. Tüm bunlara sahip olup sadece atmak.", isCorrect: true },
      { text: "Hiçbir şeye sahip değilim, bu yüzden üzgünüm.", isCorrect: false },
      { text: "Her şeyi vermek istiyorum ama kimse almıyor.", isCorrect: false }
    ],
    points: 14,
    category: "Drama"
  },
  {
    id: 41,
    url: "https://archive.org/download/CosmosLaundromat2015/Cosmos_Laundromat_2015_HD.mp4",
    start: 200,
    end: 212,
    film: "Cosmos Laundromat",
    year: 2015,
    transcript: "There's always a choice. You just haven't seen it yet.",
    options: [
      { text: "Her zaman bir seçenek var. Sadece henüz görmemişsin.", isCorrect: true },
      { text: "Seçenek yoktur, kader belirlidir.", isCorrect: false },
      { text: "Seçimlerini çoktan yaptın, geri dönüş yok.", isCorrect: false }
    ],
    points: 12,
    category: "Drama"
  },

  /* ══════════════════════════════════════════════════════════
     SPRITE FRIGHT (2021) — Blender Foundation — CC BY 4.0
     Video: archive.org/download/sprite-fright
     SRT kaynak: Blender Foundation resmi altyazı
  ══════════════════════════════════════════════════════════ */
  {
    id: 50,
    url: "https://archive.org/download/sprite-fright/Sprite_Fright_2021_1080p.mp4",
    start: 50,
    end: 60,
    film: "Sprite Fright",
    year: 2021,
    transcript: "This is absolutely incredible. I've never seen anything like it.",
    options: [
      { text: "Bu kesinlikle inanılmaz. Daha önce böyle bir şey görmedim.", isCorrect: true },
      { text: "Bu çok sıradan, daha önce de gördüm.", isCorrect: false },
      { text: "Bunu görmekten hiç hoşlanmadım.", isCorrect: false }
    ],
    points: 10,
    category: "Macera"
  },
  {
    id: 51,
    url: "https://archive.org/download/sprite-fright/Sprite_Fright_2021_1080p.mp4",
    start: 120,
    end: 132,
    film: "Sprite Fright",
    year: 2021,
    transcript: "Don't touch it! We don't know what it is. — It's fine, I'm fine.",
    options: [
      { text: "Dokunma! Ne olduğunu bilmiyoruz. — İyi, ben iyiyim.", isCorrect: true },
      { text: "Hemen yaklaş ve dokunmaya çalış.", isCorrect: false },
      { text: "Ne olduğunu biliyoruz, güvenli.", isCorrect: false }
    ],
    points: 12,
    category: "Macera"
  },

  /* ══════════════════════════════════════════════════════════
     DUCK AND COVER (1951) — Public Domain (ABD Federal Film)
     SRT kaynak: archive.org — DuckandC1951.asr.srt
  ══════════════════════════════════════════════════════════ */
  {
    id: 1,
    url: "https://archive.org/download/DuckandC1951/DuckandC1951.mp4",
    start: 81,
    end: 88,
    film: "Duck and Cover",
    year: 1951,
    transcript: "Duck and cover, just as you do in your school.",
    options: [
      { text: "Eğil ve koru kendini, tıpkı okulda yaptığın gibi.", isCorrect: true },
      { text: "Kaç ve saklan, tıpkı okulda öğrendiğin gibi.", isCorrect: false },
      { text: "Dur ve bekle, öğretmenin gelene kadar.", isCorrect: false }
    ],
    points: 6,
    category: "Tarih"
  },
  {
    id: 2,
    url: "https://archive.org/download/DuckandC1951/DuckandC1951.mp4",
    start: 460,
    end: 467,
    film: "Duck and Cover",
    year: 1951,
    transcript: "Every day, all the time, to do the right thing.",
    options: [
      { text: "Her gün, her zaman, doğru olanı yapmak için.", isCorrect: true },
      { text: "Bazen, zaman buldukça, doğru şeyleri yapmak.", isCorrect: false },
      { text: "Sadece acil durumlarda doğru davranmak yeterli.", isCorrect: false }
    ],
    points: 6,
    category: "Tarih"
  },
  {
    id: 3,
    url: "https://archive.org/download/DuckandC1951/DuckandC1951.mp4",
    start: 513,
    end: 519,
    film: "Duck and Cover",
    year: 1951,
    transcript: "If you do not know just what to do, ask your teacher.",
    options: [
      { text: "Ne yapacağını tam olarak bilmiyorsan öğretmenine sor.", isCorrect: true },
      { text: "Ne yapacağını bilmiyorsan evine git.", isCorrect: false },
      { text: "Ne yapacağını bilmiyorsan bekle ve izle.", isCorrect: false }
    ],
    points: 6,
    category: "Tarih"
  },

  /* ══════════════════════════════════════════════════════════
     SHY GUY (1947) — Public Domain (Prelinger / Coronet)
     SRT kaynak: archive.org — ShyGuy1947.asr.srt
  ══════════════════════════════════════════════════════════ */
  {
    id: 4,
    url: "https://archive.org/download/ShyGuy1947/ShyGuy1947.mp4",
    start: 34,
    end: 40,
    film: "Shy Guy",
    year: 1947,
    transcript: "You don't know how to make people like you.",
    options: [
      { text: "İnsanların seni sevmesini nasıl sağlayacağını bilmiyorsun.", isCorrect: true },
      { text: "İnsanlar seni zaten çok seviyor.", isCorrect: false },
      { text: "İnsanları sevmek istemiyorsun.", isCorrect: false }
    ],
    points: 8,
    category: "Sosyal"
  },
  {
    id: 5,
    url: "https://archive.org/download/ShyGuy1947/ShyGuy1947.mp4",
    start: 37,
    end: 42,
    film: "Shy Guy",
    year: 1947,
    transcript: "You are standing on the outside, looking in.",
    options: [
      { text: "Dışarıda duruyorsun, içeriye bakıyorsun. (Dahil olamıyorsun.)", isCorrect: true },
      { text: "Dışarıda durmayı ve izlemeyi seviyorsun.", isCorrect: false },
      { text: "Her zaman grubun merkezindesin.", isCorrect: false }
    ],
    points: 10,
    category: "Sosyal"
  },
  {
    id: 6,
    url: "https://archive.org/download/ShyGuy1947/ShyGuy1947.mp4",
    start: 914,
    end: 922,
    film: "Shy Guy",
    year: 1947,
    transcript: "He's discovered that it can be done, and that's the main thing.",
    options: [
      { text: "Bunun yapılabileceğini keşfetti ve asıl önemli olan bu.", isCorrect: true },
      { text: "Bunun imkânsız olduğunu anladı ve vazgeçti.", isCorrect: false },
      { text: "Asıl önemli şeyin ne olduğunu hâlâ bilmiyor.", isCorrect: false }
    ],
    points: 10,
    category: "Sosyal"
  },

  /* ══════════════════════════════════════════════════════════
     DATING: DO'S AND DON'TS (1949) — Public Domain (Prelinger)
     SRT kaynak: archive.org — asr.srt
  ══════════════════════════════════════════════════════════ */
  {
    id: 7,
    url: "https://archive.org/download/0191_Dating_Dos_and_Donts_E00191_10_26_50_00/0191_Dating_Dos_and_Donts_E00191_10_26_50_00.mp4",
    start: 128,
    end: 135,
    film: "Dating: Do's and Don'ts",
    year: 1949,
    transcript: "She knows how to have a good time, and how to make the fellow with her relax and have fun too.",
    options: [
      { text: "İyi vakit geçirmeyi ve yanındaki kişinin rahatlamasını sağlamayı biliyor.", isCorrect: true },
      { text: "Eğlenmeyi bilmiyor ama bunu saklamaya çalışıyor.", isCorrect: false },
      { text: "Yanındaki kişiyi hiç umursamıyor.", isCorrect: false }
    ],
    points: 8,
    category: "Sosyal"
  },
  {
    id: 8,
    url: "https://archive.org/download/0191_Dating_Dos_and_Donts_E00191_10_26_50_00/0191_Dating_Dos_and_Donts_E00191_10_26_50_00.mp4",
    start: 150,
    end: 157,
    film: "Dating: Do's and Don'ts",
    year: 1949,
    transcript: "Now it won't be easy asking for that first date.",
    options: [
      { text: "İlk randevu teklifinde bulunmak kolay olmayacak.", isCorrect: true },
      { text: "İlk randevu teklifi her zaman çok kolaydır.", isCorrect: false },
      { text: "Randevu teklifinde bulunmak için doğru zaman yok.", isCorrect: false }
    ],
    points: 8,
    category: "Sosyal"
  }

];
