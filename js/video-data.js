/**
 * RHAPSODY CINEMA — Video Veritabanı (v3.0)
 * Kaynak: Archive.org kamu malı filmler — reklamsız, ücretsiz, yasal.
 *
 * Kendi klibini eklemek için:
 *   url   → MP4 dosya URL'si (Firebase Storage, Bunny.net veya archive.org)
 *   start → klip başlangıç saniyesi
 *   end   → klip bitiş saniyesi (max 15 sn fark)
 *
 * ⚠ Zaman damgaları yaklaşıktır — test edip ayarlayın.
 */
var CINEMA_DATA = [

  /* ── Duck and Cover (1951) ────────────────────────────────────
     ABD federal hükümet filmi → kamu malı (public domain)
     Amerikan İngilizcesi, yavaş ve net anlatım, kısa cümleler.
     Dosya: ~55 MB | archive.org/details/DuckandC1951
  ──────────────────────────────────────────────────────────── */
  {
    id: 1,
    url: "https://archive.org/download/DuckandC1951/DuckandC1951.mp4",
    start: 38,
    end: 48,
    film: "Duck and Cover",
    year: 1951,
    transcript: "Duck, and cover!",
    options: [
      { text: "Eğil ve koru kendini!", isCorrect: true },
      { text: "Kaç ve saklan!", isCorrect: false },
      { text: "Dur ve bekle!", isCorrect: false }
    ],
    points: 5,
    category: "Tarih"
  },
  {
    id: 2,
    url: "https://archive.org/download/DuckandC1951/DuckandC1951.mp4",
    start: 198,
    end: 210,
    film: "Duck and Cover",
    year: 1951,
    transcript: "You must be ready every day, all the time, to duck and cover.",
    options: [
      { text: "Her gün, her zaman eğilmeye ve korunmaya hazır olmalısın.", isCorrect: true },
      { text: "Sadece okuldayken hazır olman yeterli.", isCorrect: false },
      { text: "Hafta sonları daha dikkatli olmalısın.", isCorrect: false }
    ],
    points: 10,
    category: "Tarih"
  },
  {
    id: 3,
    url: "https://archive.org/download/DuckandC1951/DuckandC1951.mp4",
    start: 330,
    end: 342,
    film: "Duck and Cover",
    year: 1951,
    transcript: "At school, your teacher will tell you what to do.",
    options: [
      { text: "Okulda öğretmenin sana ne yapacağını söyleyecek.", isCorrect: true },
      { text: "Okulda hiç kimse sana yardım etmeyecek.", isCorrect: false },
      { text: "Okulda kendi başına karar vermelisin.", isCorrect: false }
    ],
    points: 8,
    category: "Tarih"
  },

  /* ── Shy Guy (1947) ───────────────────────────────────────────
     Coronet Instructional Film → Prelinger Archives → kamu malı
     Ergen diyaloğu, doğal günlük İngilizce, okul hayatı.
     Dosya: ~81 MB | archive.org/details/ShyGuy1947
  ──────────────────────────────────────────────────────────── */
  {
    id: 4,
    url: "https://archive.org/download/ShyGuy1947/ShyGuy1947.mp4",
    start: 42,
    end: 53,
    film: "Shy Guy",
    year: 1947,
    transcript: "Tom didn't know how to make friends.",
    options: [
      { text: "Tom arkadaş edinmeyi bilmiyordu.", isCorrect: true },
      { text: "Tom'un çok fazla arkadaşı vardı.", isCorrect: false },
      { text: "Tom yeni bir şehre taşınmıştı.", isCorrect: false }
    ],
    points: 8,
    category: "Sosyal"
  },
  {
    id: 5,
    url: "https://archive.org/download/ShyGuy1947/ShyGuy1947.mp4",
    start: 230,
    end: 242,
    film: "Shy Guy",
    year: 1947,
    transcript: "The first step is to stop thinking about yourself and start thinking about others.",
    options: [
      { text: "İlk adım kendini düşünmeyi bırakıp başkalarını düşünmeye başlamak.", isCorrect: true },
      { text: "İlk adım daha çok konuşmak ve dikkat çekmek.", isCorrect: false },
      { text: "İlk adım yalnız kalmaktan hoşlanmayı öğrenmek.", isCorrect: false }
    ],
    points: 12,
    category: "Sosyal"
  },
  {
    id: 6,
    url: "https://archive.org/download/ShyGuy1947/ShyGuy1947.mp4",
    start: 450,
    end: 461,
    film: "Shy Guy",
    year: 1947,
    transcript: "Making friends takes practice, just like any other skill.",
    options: [
      { text: "Arkadaş edinmek, diğer beceriler gibi pratik gerektirir.", isCorrect: true },
      { text: "Arkadaş edinmek tamamen şansa bağlıdır.", isCorrect: false },
      { text: "Arkadaş edinmek için çok para harcamak gerekir.", isCorrect: false }
    ],
    points: 12,
    category: "Sosyal"
  },

  /* ── Dating: Do's and Don'ts (1949) ──────────────────────────
     Coronet Instructional Film → Prelinger Archives → kamu malı
     Ken Nordine anlatımı, sosyal İngilizce, nezaket kalıpları.
     archive.org/details/0191_Dating_Dos_and_Donts_E00191_10_26_50_00
  ──────────────────────────────────────────────────────────── */
  {
    id: 7,
    url: "https://archive.org/download/0191_Dating_Dos_and_Donts_E00191_10_26_50_00/0191_Dating_Dos_and_Donts_E00191_10_26_50_00.mp4",
    start: 55,
    end: 66,
    film: "Dating: Do's and Don'ts",
    year: 1949,
    transcript: "Good manners make other people feel comfortable.",
    options: [
      { text: "İyi görgü kuralları başkalarının rahat hissetmesini sağlar.", isCorrect: true },
      { text: "İyi görgü kuralları sadece yemek masasında önemlidir.", isCorrect: false },
      { text: "İyi görgü kuralları artık modası geçmiş bir şeydir.", isCorrect: false }
    ],
    points: 10,
    category: "Sosyal"
  },
  {
    id: 8,
    url: "https://archive.org/download/0191_Dating_Dos_and_Donts_E00191_10_26_50_00/0191_Dating_Dos_and_Donts_E00191_10_26_50_00.mp4",
    start: 310,
    end: 322,
    film: "Dating: Do's and Don'ts",
    year: 1949,
    transcript: "Being a good listener is one of the most important social skills.",
    options: [
      { text: "İyi bir dinleyici olmak en önemli sosyal becerilerden biridir.", isCorrect: true },
      { text: "Çok konuşmak sosyal becerilerin en önemlisidir.", isCorrect: false },
      { text: "Sosyal becerilerin hiçbir önemi yoktur.", isCorrect: false }
    ],
    points: 12,
    category: "Sosyal"
  },

  /* ── Bringing Up Baby (1938) ──────────────────────────────────
     Howard Hawks — Cary Grant & Katharine Hepburn
     Kamu malı (telif yenilenmedi) — hızlı ve esprili diyalog.
     archive.org/details/bringing-up-baby-1938_202006
  ──────────────────────────────────────────────────────────── */
  {
    id: 9,
    url: "https://archive.org/download/bringing-up-baby-1938_202006/Bringing.Up.Baby.1938.mp4",
    start: 185,
    end: 196,
    film: "Bringing Up Baby",
    year: 1938,
    transcript: "Now, it isn't that I don't like you. I do like you.",
    options: [
      { text: "Seni sevmediğim anlamına gelmiyor. Seni seviyorum.", isCorrect: true },
      { text: "Seni hiç tanımıyorum ve tanımak istemiyorum.", isCorrect: false },
      { text: "Seninle hiçbir şekilde iletişim kuramıyorum.", isCorrect: false }
    ],
    points: 10,
    category: "Film"
  }

];
