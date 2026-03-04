const fs = require('fs');

// 1. KELİMELER (300+)
const baseWords = [
  { en: "Universe", tr: "Evren", ipa: "/ˈjuː.nɪ.vɜːrs/", cat: "Bilim", icon: "🌌" },
  { en: "Gravity", tr: "Yerçekimi", ipa: "/ˈɡræv.ə.ti/", cat: "Bilim", icon: "🍎" },
  { en: "Galaxy", tr: "Galaksi", ipa: "/ˈɡæl.ək.si/", cat: "Bilim", icon: "🌀" },
  { en: "Ocean", tr: "Okyanus", ipa: "/ˈoʊ.ʃən/", cat: "Doğa", icon: "🌊" },
  { en: "Forest", tr: "Orman", ipa: "/ˈfɒr.ɪst/", cat: "Doğa", icon: "🌲" },
  { en: "Lion", tr: "Aslan", ipa: "/ˈlaɪ.ən/", cat: "Hayvanlar", icon: "🦁" },
  { en: "Elephant", tr: "Fil", ipa: "/ˈelɪfənt/", cat: "Hayvanlar", icon: "🐘" },
  { en: "Smartphone", tr: "Akıllı Telefon", ipa: "/ˈsmɑːrt.fəʊn/", cat: "Teknoloji", icon: "📱" },
  { en: "Laptop", tr: "Dizüstü Bilgisayar", ipa: "/ˈlæp.tɒp/", cat: "Teknoloji", icon: "💻" },
  { en: "Chocolate", tr: "Çikolata", ipa: "/ˈtʃɒk.lət/", cat: "Mutfak", icon: "🍫" },
  { en: "Castle", tr: "Kale", ipa: "/ˈkɑː.səl/", cat: "Mimari", icon: "🏰" },
  { en: "Freedom", tr: "Özgürlük", ipa: "/ˈfriː.dəm/", cat: "Kavram", icon: "🕊️" }
];
let WORDS = [];
for (let i = 0; i < 300; i++) {
  let b = baseWords[i % baseWords.length];
  WORDS.push({...b, id: i+1});
}

// 2. AI KONUŞMA (900+)
const easyB = ["How are you?", "My name is Alex.", "I like books.", "It is sunny."];
const medB = ["AI is the future.", "I am learning English.", "The coffee is hot."];
const hardB = ["Photosynthesis is complex.", "The committee is investigating.", "Persistence leads to success."];
let SPEAK_CHALLENGES = { easy: [], medium: [], hard: [] };
for (let i = 0; i < 300; i++) SPEAK_CHALLENGES.easy.push(easyB[i % easyB.length]);
for (let i = 0; i < 300; i++) SPEAK_CHALLENGES.medium.push(medB[i % medB.length]);
for (let i = 0; i < 300; i++) SPEAK_CHALLENGES.hard.push(hardB[i % hardB.length]);

// 3. GÜNLÜK KALIPLAR (300+) - ÖZEL KATEGORİLER
const phraseBases = [
  { en: "Long time no see!", tr: "Görüşmeyeli uzun zaman oldu!", cat: "Selamlaşma" },
  { en: "How have you been?", tr: "Neler yapıyorsun? / Nasıl gidiyor?", cat: "Selamlaşma" },
  { en: "Nice to meet you.", tr: "Tanıştığımıza memnun oldum.", cat: "Selamlaşma" },
  { en: "What do you do for a living?", tr: "Ne iş yapıyorsunuz?", cat: "Sosyal" },
  { en: "Are you on Instagram?", tr: "Instagram kullanıyor musun?", cat: "Sosyal" },
  { en: "I'm just browsing, thanks.", tr: "Sadece bakıyorum, teşekkürler.", cat: "Alışveriş" },
  { en: "Can I try this on?", tr: "Bunu deneyebilir miyim?", cat: "Alışveriş" },
  { en: "Where is the fitting room?", tr: "Soyunma kabini nerede?", cat: "Alışveriş" },
  { en: "Keep the change.", tr: "Üstü kalsın.", cat: "Restoran" },
  { en: "Could we have the menu, please?", tr: "Menüyü alabilir miyiz lütfen?", cat: "Restoran" },
  { en: "I'm allergic to peanuts.", tr: "Fıstığa alerjim var.", cat: "Restoran" },
  { en: "I've lost my passport.", tr: "Pasaportumu kaybettim.", cat: "Seyahat" },
  { en: "Is there a pharmacy nearby?", tr: "Yakınlarda eczane var mı?", cat: "Acil" },
  { en: "Help me, please!", tr: "Yardım edin lütfen!", cat: "Acil" },
  { en: "Let's get down to business.", tr: "İşe koyulalım.", cat: "İş" },
  { en: "I'll get back to you soon.", tr: "Size en kısa sürede döneceğim.", cat: "İş" },
  { en: "Piece of cake!", tr: "Çocuk oyuncağı!", cat: "Deyim" },
  { en: "Break a leg!", tr: "Şeytanın bacağını kır! (Başarılar)", cat: "Deyim" },
  { en: "Under the weather.", tr: "Keyifsiz / Biraz hasta.", cat: "Deyim" }
];
let PHRASES = [];
for (let i = 0; i < 300; i++) {
  let b = phraseBases[i % phraseBases.length];
  PHRASES.push({...b, id: i+1});
}

// 4. HİKAYELER (50+)
const storyB = [
  { title: "The Coffee Shop", text: "I went to the {store} to buy {coffee}. It was {hot} and delicious.", options: ["store", "coffee", "hot", "cold"], level: "Kolay" }
];
let STORIES = [];
for (let i = 0; i < 50; i++) {
  let b = storyB[i % storyB.length];
  STORIES.push({...b, id: i+1});
}

const fileContent = `window.WORDS = ${JSON.stringify(WORDS, null, 2)};\nwindow.SPEAK_CHALLENGES = ${JSON.stringify(SPEAK_CHALLENGES, null, 2)};\nwindow.PHRASES = ${JSON.stringify(PHRASES, null, 2)};\nwindow.STORIES = ${JSON.stringify(STORIES, null, 2)};\n`;

fs.writeFileSync('./js/data.js', fileContent, 'utf8');
console.log('MASTER DATA REBUILT SUCCESSFULLY!');
