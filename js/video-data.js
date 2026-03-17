/**
 * RHAPSODY CINEMA — Video Veritabanı (v7.0)
 * Tüm klipler catbox.moe'da barındırılıyor — anında oynatma, sıfır bekleme.
 * Kaynak filmler: YouTube'dan yt-dlp+FFmpeg ile kesildi, catbox.moe'ya yüklendi.
 */
var CINEMA_DATA = [

  /* ══════════════════════════════════════════════════════════
     THE SHAWSHANK REDEMPTION (1994)
  ══════════════════════════════════════════════════════════ */
  {
    id: 69,
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
     THE DARK KNIGHT (2008)
  ══════════════════════════════════════════════════════════ */
  {
    id: 71,
    url: "https://files.catbox.moe/fo06v0.mp4",
    start: 0,
    end: 15,
    film: "The Dark Knight",
    year: 2008,
    transcript: "Why so serious? Let's put a smile on that face!",
    options: [
      { text: "Neden bu kadar ciddisin? O yüze bir gülümseme katalım!", isCorrect: true },
      { text: "Neden gülümsüyorsun? Ciddi ol biraz.", isCorrect: false },
      { text: "Gülümsemek güçlüğün işaretidir.", isCorrect: false }
    ],
    points: 14,
    category: "Aksiyon"
  },


  /* ══════════════════════════════════════════════════════════
     FORREST GUMP (1994) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=SqOnkiQRCUU
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
     THE SHAWSHANK REDEMPTION (1994) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=9K30e9O3Nng
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
     DEAD POETS SOCIETY (1989) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=vi0Lbjs5ECI
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
     THE DARK KNIGHT (2008) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=PoyejjJGajk
  ══════════════════════════════════════════════════════════ */
  {
    id: 75,
    url: "https://files.catbox.moe/fo06v0.mp4",
    start: 0,
    end: 15,
    film: "The Dark Knight",
    year: 2008,
    transcript: "Why so serious? Let's put a smile on that face!",
    options: [
      { text: "Neden bu kadar ciddisin? O yüze bir gülümseme katalım!", isCorrect: true },
      { text: "Neden gülümsüyorsun? Ciddi ol biraz.", isCorrect: false },
      { text: "Gülümsemek güçlüğün işaretidir.", isCorrect: false }
    ],
    points: 14,
    category: "Aksiyon"
  },


  /* ══════════════════════════════════════════════════════════
     THE MATRIX (1999) — Fair Use / Eğitim
     Kaynak: https://www.youtube.com/watch?v=zE7PKRjrid4
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

];
