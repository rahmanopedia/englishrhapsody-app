/**
 * RHAPSODY CINEMA — Video Veritabani
 */
var CINEMA_DATA = [

  {
    id: 1,
    url: "https://files.catbox.moe/f2bb5d.mp4",
    start: 0,
    end: 8,
    film: "Rhapsody Cinema",
    transcript: "Excuse me, where's the bus stop? Go straight, then left. Thank you.",
    segments: [
      { start: 1.62, text: "Excuse me, where's the bus stop?" },
      { start: 4.64, text: "Go straight, then left." },
      { start: 6.60, text: "Thank you." }
    ],
    questions: [
      { phrase: "Excuse me, where's the bus stop?", correct: "Affedersiniz, otobus duragi nerede?", wrong: "Affedersiniz, tren istasyonu nerede?" },
      { phrase: "Go straight, then left.", correct: "Duz gidin, sonra sola.", wrong: "Saga donun, sonra duz gidin." },
      { phrase: "Thank you.", correct: "Tesekkur ederim.", wrong: "Ozur dilerim." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 2,
    url: "https://files.catbox.moe/2x49ld.mp4",
    start: 0,
    end: 10,
    film: "Rhapsody Cinema",
    transcript: "Did you finish the report? I'm working on it. I need it soon.",
    segments: [
      { start: 2.88, text: "Did you finish the report?" },
      { start: 4.92, text: "I'm working on it." },
      { start: 7.42, text: "I need it soon." }
    ],
    questions: [
      { phrase: "Did you finish the report?", correct: "Raporu bitirdin mi?", wrong: "Raporu okudun mu?" },
      { phrase: "I'm working on it.", correct: "Uzerinde calisiyorum.", wrong: "Henuz baslamadim." },
      { phrase: "I need it soon.", correct: "En kisa zamanda lazim.", wrong: "Yarin teslim ederim." }
    ],
    points: 12,
    category: "Work"
  },

  {
    id: 3,
    url: "https://files.catbox.moe/xz21rb.mp4",
    start: 0,
    end: 11,
    film: "Rhapsody Cinema",
    transcript: "Can I get a latte? Anything else? That's all.",
    segments: [
      { start: 4.34,  text: "Can I get a latte?" },
      { start: 7.28,  text: "Anything else?" },
      { start: 10.04, text: "That's all." }
    ],
    questions: [
      { phrase: "Can I get a latte?", correct: "Bir latte alabilir miyim?", wrong: "Bir su alabilir miyim?" },
      { phrase: "Anything else?", correct: "Baska bir sey?", wrong: "Nasil yardimci olabilirim?" },
      { phrase: "That's all.", correct: "Hepsi bu.", wrong: "Devam edin lutfen." }
    ],
    points: 12,
    category: "Food & Drink"
  },


  {
    id: 4,
    url: "https://files.catbox.moe/y1qfml.mp4",
    start: 0,
    end: 8,
    film: "Rhapsody Cinema",
    transcript: "The car won't start. Let me see. This is bad.",
    segments: [
      { start: 1.34, text: "The car won't start. Let me see." },
      { start: 6.38, text: "This is bad." }
    ],
    questions: [
      { phrase: "The car won't start. Let me see.", correct: "Araba calısmiyor. Bakayim.", wrong: "Araba cok hizli gidiyor. Dikkat et." },
      { phrase: "This is bad.", correct: "Bu kotu.", wrong: "Bu harika." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 5,
    url: "https://files.catbox.moe/bsxeja.mp4",
    start: 0,
    end: 6,
    film: "Rhapsody Cinema",
    transcript: "What shall we watch? Maybe a comedy? Good idea.",
    segments: [
      { start: 0.76, text: "What shall we watch?" },
      { start: 2.54, text: "Maybe a comedy?" },
      { start: 4.22, text: "Good idea." }
    ],
    questions: [
      { phrase: "What shall we watch?", correct: "Ne izleyelim?", wrong: "Ne yiyelim?" },
      { phrase: "Maybe a comedy?", correct: "Belki bir komedi?", wrong: "Belki bir belgesel?" },
      { phrase: "Good idea.", correct: "Iyi fikir.", wrong: "Kotu fikir." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 6,
    url: "https://files.catbox.moe/9u78si.mp4",
    start: 0,
    end: 8,
    film: "Rhapsody Cinema",
    transcript: "I don't agree. Why? It's too risky.",
    segments: [
      { start: 1.00, text: "I don't agree." },
      { start: 3.50, text: "Why?" },
      { start: 4.92, text: "It's too risky." }
    ],
    questions: [
      { phrase: "I don't agree.", correct: "Katilmiyorum.", wrong: "Tamamen katiliyorum." },
      { phrase: "Why?", correct: "Neden?", wrong: "Ne zaman?" },
      { phrase: "It's too risky.", correct: "Cok riskli.", wrong: "Cok guvenli." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 7,
    url: "https://files.catbox.moe/d9n73h.mp4",
    start: 0,
    end: 10,
    film: "Rhapsody Cinema",
    transcript: "I need to decide now. What's happening? Time is running out.",
    segments: [
      { start: 0.00, text: "I need to decide now." },
      { start: 1.80, text: "What's happening?" },
      { start: 7.76, text: "Time is running out." }
    ],
    questions: [
      { phrase: "I need to decide now.", correct: "Simdi karar vermem gerekiyor.", wrong: "Daha sonra karar veririm." },
      { phrase: "What's happening?", correct: "Ne oluyor?", wrong: "Ne istiyorsun?" },
      { phrase: "Time is running out.", correct: "Zaman daraliyor.", wrong: "Cok vaktimiz var." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 8,
    url: "https://files.catbox.moe/cs10hd.mp4",
    start: 0,
    end: 10,
    film: "Rhapsody Cinema",
    transcript: "Are you free tonight? Not really. Alright.",
    segments: [
      { start: 5.04, text: "Are you free tonight?" },
      { start: 7.06, text: "Not really." },
      { start: 8.44, text: "Alright." }
    ],
    questions: [
      { phrase: "Are you free tonight?", correct: "Bu aksam musait misin?", wrong: "Bu aksam ne yapiyorsun?" },
      { phrase: "Not really.", correct: "Pek sayilmaz.", wrong: "Evet, tabii ki." },
      { phrase: "Alright.", correct: "Peki.", wrong: "Hayir." }
    ],
    points: 12,
    category: "Daily Life"
  },

  // ── AI Generated Clips (Batch 2) ──────────────────────────────

  {
    id: 9,
    url: "https://files.catbox.moe/n76qnv.mp4",
    start: 0,
    end: 15,
    film: "Rhapsody Cinema",
    transcript: "I can't do this. Come on, you've got this. I'll try again.",
    segments: [
      { start: 4.42, text: "I can't do this." },
      { start: 5.50, text: "Come on, you've got this." },
      { start: 6.66, text: "I'll try again." }
    ],
    questions: [
      { phrase: "I can't do this.", correct: "Bunu yapamam.", wrong: "Bunu yapabilirim." },
      { phrase: "Come on, you've got this.", correct: "Hadi, başarabilirsin.", wrong: "Vazgeç, çok zor." },
      { phrase: "I'll try again.", correct: "Tekrar deneyeceğim.", wrong: "Pes ediyorum." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 10,
    url: "https://files.catbox.moe/lzd24u.mp4",
    start: 0,
    end: 15,
    film: "Rhapsody Cinema",
    transcript: "Nice event, huh? Yeah, it's a good way to break the ice. Exactly.",
    segments: [
      { start: 6.06, text: "Nice event, huh?" },
      { start: 7.64, text: "Yeah, it's a good way to break the ice." },
      { start: 10.00, text: "Exactly." }
    ],
    questions: [
      { phrase: "Nice event, huh?", correct: "Güzel bir etkinlik, değil mi?", wrong: "Sıkıcı bir etkinlik, değil mi?" },
      { phrase: "It's a good way to break the ice.", correct: "Buz kırmak için iyi bir yol.", wrong: "Tartışmak için iyi bir fırsat." },
      { phrase: "Exactly.", correct: "Kesinlikle.", wrong: "Hiç de değil." }
    ],
    points: 12,
    category: "Social"
  },

  {
    id: 11,
    url: "https://files.catbox.moe/sfiqrv.mp4",
    start: 0,
    end: 15,
    film: "Rhapsody Cinema",
    transcript: "There's a problem with my room. What seems to be the issue? The air conditioning isn't working.",
    segments: [
      { start: 3.10, text: "There's a problem with my room." },
      { start: 4.82, text: "What seems to be the issue?" },
      { start: 7.68, text: "The air conditioning isn't working." }
    ],
    questions: [
      { phrase: "There's a problem with my room.", correct: "Odamda bir sorun var.", wrong: "Odamı değiştirmek istiyorum." },
      { phrase: "What seems to be the issue?", correct: "Sorun nedir?", wrong: "Ne yapmamı istersiniz?" },
      { phrase: "The air conditioning isn't working.", correct: "Klima çalışmıyor.", wrong: "Oda çok küçük." }
    ],
    points: 12,
    category: "Travel"
  },

  {
    id: 12,
    url: "https://files.catbox.moe/w19fkv.mp4",
    start: 0,
    end: 15,
    film: "Rhapsody Cinema",
    transcript: "This is getting out of hand. Yeah, it's too crowded. We should leave.",
    segments: [
      { start: 3.20, text: "This is getting out of hand." },
      { start: 4.52, text: "Yeah, it's too crowded." },
      { start: 6.10, text: "We should leave." }
    ],
    questions: [
      { phrase: "This is getting out of hand.", correct: "Bu kontrolden çıkıyor.", wrong: "Bu çok eğlenceli." },
      { phrase: "It's too crowded.", correct: "Çok kalabalık.", wrong: "Çok sessiz." },
      { phrase: "We should leave.", correct: "Gitmeliyiz.", wrong: "Kalmaya devam edelim." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 13,
    url: "https://files.catbox.moe/t7qpf6.mp4",
    start: 0,
    end: 15,
    film: "Rhapsody Cinema",
    transcript: "Can you keep an eye on him for a minute? Of course. I'll be right back.",
    segments: [
      { start: 3.50, text: "Can you keep an eye on him for a minute?" },
      { start: 5.60, text: "Of course." },
      { start: 6.54, text: "I'll be right back." }
    ],
    questions: [
      { phrase: "Can you keep an eye on him for a minute?", correct: "Bir dakika ona göz kulak olabilir misin?", wrong: "Onu bir yere götürür müsün?" },
      { phrase: "Of course.", correct: "Tabii ki.", wrong: "Hayır, yapamam." },
      { phrase: "I'll be right back.", correct: "Hemen döneceğim.", wrong: "Biraz geç kalacağım." }
    ],
    points: 12,
    category: "Daily Life"
  },

  {
    id: 14,
    url: "https://files.catbox.moe/32amjr.mp4",
    start: 0,
    end: 15,
    film: "Rhapsody Cinema",
    transcript: "I can't figure this out. Let me take a look. Be my guest.",
    segments: [
      { start: 6.00, text: "I can't figure this out." },
      { start: 8.00, text: "Let me take a look." },
      { start: 9.74, text: "Be my guest." }
    ],
    questions: [
      { phrase: "I can't figure this out.", correct: "Bunu çözemiyorum.", wrong: "Bunu kolayca yapabilirim." },
      { phrase: "Let me take a look.", correct: "Bir bakayım.", wrong: "Sana yardım edemem." },
      { phrase: "Be my guest.", correct: "Buyurun / Tabii ki.", wrong: "Hayır, dokunma." }
    ],
    points: 12,
    category: "Work"
  },

];
