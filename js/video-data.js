/**
 * RHAPSODY CINEMA — Video Veritabanı
 * YouTube ID, Start/End saniyeleri ve Quiz seçenekleri
 * NOT: Tüm videolar embed izinli, resmi kanallardan seçilmiştir.
 */
const CINEMA_DATA = [
  {
    id: 1,
    videoId: "UF8uR6Z6KLc", // Steve Jobs — Stanford Commencement 2005 (Stanford Univ. kanalı)
    start: 688,
    end: 694,
    transcript: "Your time is limited, so don't waste it living someone else's life.",
    options: [
      { text: "Zamanın sınırlı, başkasının hayatını yaşayarak harcama.", isCorrect: true },
      { text: "Zamanın çok, istediğin gibi kullanabilirsin.", isCorrect: false },
      { text: "Başkalarının hayatlarını izlemek seni geliştirir.", isCorrect: false }
    ],
    points: 15,
    category: "Konuşma"
  },
  {
    id: 2,
    videoId: "UF8uR6Z6KLc", // Steve Jobs — Stanford Commencement 2005
    start: 893,
    end: 898,
    transcript: "Stay hungry. Stay foolish.",
    options: [
      { text: "Aç kal. Aptal kal. (Meraklı ve mütevazı olmayı bırakma.)", isCorrect: true },
      { text: "Her zaman doymuş ve akıllı hisset.", isCorrect: false },
      { text: "Yemek yemeyi ve öğrenmeyi bırak.", isCorrect: false }
    ],
    points: 8,
    category: "Konuşma"
  },
  {
    id: 3,
    videoId: "qp0HIF3SfI4", // Simon Sinek — How Great Leaders Inspire Action (TED)
    start: 218,
    end: 225,
    transcript: "People don't buy what you do; they buy why you do it.",
    options: [
      { text: "İnsanlar ne yaptığını değil, neden yaptığını satın alır.", isCorrect: true },
      { text: "İnsanlar her zaman en ucuz ürünü tercih eder.", isCorrect: false },
      { text: "İnsanlar kaliteye değil markaya bakar.", isCorrect: false }
    ],
    points: 12,
    category: "İş & Liderlik"
  },
  {
    id: 4,
    videoId: "qp0HIF3SfI4", // Simon Sinek — How Great Leaders Inspire Action (TED)
    start: 320,
    end: 327,
    transcript: "The goal is not to do business with everybody who needs what you have.",
    options: [
      { text: "Amaç, sahip olduğun şeye ihtiyacı olan herkesle iş yapmak değil.", isCorrect: true },
      { text: "Amaç, mümkün olduğunca çok müşteriyle çalışmak.", isCorrect: false },
      { text: "Amaç, rakiplerini alt etmek.", isCorrect: false }
    ],
    points: 12,
    category: "İş & Liderlik"
  },
  {
    id: 5,
    videoId: "iCvmsMzlF7o", // Brené Brown — The Power of Vulnerability (TED)
    start: 296,
    end: 302,
    transcript: "Vulnerability is not weakness.",
    options: [
      { text: "Kırılganlık zayıflık değildir.", isCorrect: true },
      { text: "Kırılganlık her zaman güçsüzlüktür.", isCorrect: false },
      { text: "Kırılganlık utanç verici bir şeydir.", isCorrect: false }
    ],
    points: 10,
    category: "Psikoloji"
  },
  {
    id: 6,
    videoId: "iCvmsMzlF7o", // Brené Brown — The Power of Vulnerability (TED)
    start: 820,
    end: 827,
    transcript: "Connection is why we're here. It is what gives purpose and meaning to our lives.",
    options: [
      { text: "Bağlantı burada neden olduğumuzdur; hayatımıza amaç ve anlam verir.", isCorrect: true },
      { text: "Bağımsızlık hayatımıza anlam katar.", isCorrect: false },
      { text: "Başarı hayatımızın tek amacıdır.", isCorrect: false }
    ],
    points: 15,
    category: "Psikoloji"
  },
  {
    id: 7,
    videoId: "ji5_MqicxSo", // Randy Pausch — Last Lecture (Carnegie Mellon)
    start: 82,
    end: 89,
    transcript: "We cannot change the cards we are dealt, just how we play the hand.",
    options: [
      { text: "Elimizdeki kartları değiştiremeyiz, sadece onları nasıl oynadığımızı.", isCorrect: true },
      { text: "Hayatta her şeyi değiştirme gücüne sahibiz.", isCorrect: false },
      { text: "Şans oyunları hayatı yönetir.", isCorrect: false }
    ],
    points: 12,
    category: "Motivasyon"
  },
  {
    id: 8,
    videoId: "ji5_MqicxSo", // Randy Pausch — Last Lecture
    start: 225,
    end: 232,
    transcript: "Brick walls are there for a reason. They let us prove how badly we want things.",
    options: [
      { text: "Duvarlar bir nedenden dolayı vardır; bir şeyi ne kadar istediğimizi kanıtlamamızı sağlarlar.", isCorrect: true },
      { text: "Duvarlar aşılamaz engellerdir.", isCorrect: false },
      { text: "Duvarlar bizi korumak için vardır.", isCorrect: false }
    ],
    points: 15,
    category: "Motivasyon"
  }
];
