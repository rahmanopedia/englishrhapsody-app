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

];
