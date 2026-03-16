/**
 * RHAPSODY CINEMA — Video Veritabanı
 * YouTube ID, Start/End saniyeleri ve Quiz seçenekleri
 */
const CINEMA_DATA = [
  {
    id: 1,
    videoId: "ky7XHo_YRYY", // Finding Nemo
    start: 45,
    end: 49,
    transcript: "Just keep swimming. Just keep swimming.",
    options: [
      { text: "Sadece yüzmeye devam et.", isCorrect: true },
      { text: "Hemen sudan çıkmalısın.", isCorrect: false }
    ],
    points: 8,
    category: "Animasyon"
  },
  {
    id: 2,
    videoId: "UeSInYQuZsc", // Pursuit of Happyness
    start: 55,
    end: 61,
    transcript: "Don't ever let somebody tell you you can't do something.",
    options: [
      { text: "Kimsenin sana bir şeyi yapamayacağını söylemesine izin verme.", isCorrect: true },
      { text: "Başkalarının ne dediğini her zaman dinlemelisin.", isCorrect: false }
    ],
    points: 12,
    category: "Drama"
  },
  {
    id: 3,
    videoId: "d6wRkzCW5qI", // The Dark Knight
    start: 10,
    end: 14,
    transcript: "Why so serious?",
    options: [
      { text: "Neden bu kadar ciddisin?", isCorrect: true },
      { text: "Neden bu kadar üzgünsün?", isCorrect: false }
    ],
    points: 5,
    category: "Aksiyon"
  },
  {
    id: 4,
    videoId: "m8e-FF8MsqU", // Interstellar
    start: 145,
    end: 150,
    transcript: "We used to look up at the sky and wonder about our place in the stars.",
    options: [
      { text: "Eskiden gökyüzüne bakıp yıldızlardaki yerimizi merak ederdik.", isCorrect: true },
      { text: "Gökyüzüne bakmak bizi her zaman korkuturdu.", isCorrect: false }
    ],
    points: 15,
    category: "Bilim Kurgu"
  },
  {
    id: 5,
    videoId: "vKSaZMcOOIc", // Harry Potter
    start: 32,
    end: 36,
    transcript: "You're a wizard, Harry.",
    options: [
      { text: "Sen bir büyücüsün, Harry.", isCorrect: true },
      { text: "Sen çok akıllısın, Harry.", isCorrect: false }
    ],
    points: 5,
    category: "Fantastik"
  }
];
