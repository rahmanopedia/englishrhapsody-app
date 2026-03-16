/**
 * RHAPSODY CINEMA — Video Veritabanı (v3.1)
 * Zaman damgaları Archive.org ASR (.asr.srt) dosyalarından doğrulandı.
 * Kaynak: Archive.org kamu malı filmler — reklamsız, ücretsiz, yasal.
 */
var CINEMA_DATA = [

  /* ── Duck and Cover (1951) ────────────────────────────────────
     SRT: archive.org/download/DuckandC1951/DuckandC1951.asr.srt
  ──────────────────────────────────────────────────────────── */
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
    points: 8,
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
    points: 8,
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
    points: 8,
    category: "Tarih"
  },

  /* ── Shy Guy (1947) ───────────────────────────────────────────
     SRT: archive.org/download/ShyGuy1947/ShyGuy1947.asr.srt
  ──────────────────────────────────────────────────────────── */
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
    points: 12,
    category: "Sosyal"
  },

  /* ── Dating: Do's and Don'ts (1949) ──────────────────────────
     SRT: archive.org/download/.../0191...asr.srt
  ──────────────────────────────────────────────────────────── */
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
    points: 10,
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
    points: 10,
    category: "Sosyal"
  }

];
