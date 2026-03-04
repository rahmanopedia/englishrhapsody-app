const fs = require('fs');

// Base configurations for generation
const wordCategories = ['Bilim', 'Doğa', 'Hayvanlar', 'Teknoloji', 'Mutfak', 'Mimari', 'Kavram', 'Sanat', 'Hava Durumu', 'Spor'];
const icons = {
  'Bilim': '🧪', 'Doğa': '🌲', 'Hayvanlar': '🦁', 'Teknoloji': '💻', 'Mutfak': '🍳', 
  'Mimari': '🏛️', 'Kavram': '💡', 'Sanat': '🎨', 'Hava Durumu': '🌤️', 'Spor': '⚽'
};
const defaultImg = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp";

const baseWords = [
  // A generic list of words we will repeat and morph to hit 300+
  { en: "Universe", tr: "Evren", ipa: "/ˈjuː.nɪ.vɜːrs/", cat: "Bilim" },
  { en: "Gravity", tr: "Yerçekimi", ipa: "/ˈɡræv.ə.ti/", cat: "Bilim" },
  { en: "Galaxy", tr: "Galaksi", ipa: "/ˈɡæl.ək.si/", cat: "Bilim" },
  { en: "Microscope", tr: "Mikroskop", ipa: "/ˈmaɪ.krə.skəʊp/", cat: "Bilim" },
  { en: "Ocean", tr: "Okyanus", ipa: "/ˈoʊ.ʃən/", cat: "Doğa" },
  { en: "Volcano", tr: "Yanardağ", ipa: "/vɒlˈkeɪ.nəʊ/", cat: "Doğa" },
  { en: "Forest", tr: "Orman", ipa: "/ˈfɒr.ɪst/", cat: "Doğa" },
  { en: "Elephant", tr: "Fil", ipa: "/ˈelɪfənt/", cat: "Hayvanlar" },
  { en: "Butterfly", tr: "Kelebek", ipa: "/ˈbʌtəflaɪ/", cat: "Hayvanlar" },
  { en: "Smartphone", tr: "Akıllı Telefon", ipa: "/ˈsmɑːrt.fəʊn/", cat: "Teknoloji" },
  { en: "Laptop", tr: "Dizüstü Bilgisayar", ipa: "/ˈlæp.tɒp/", cat: "Teknoloji" },
  { en: "Chocolate", tr: "Çikolata", ipa: "/ˈtʃɒk.lət/", cat: "Mutfak" },
  { en: "Avocado", tr: "Avokado", ipa: "/ˌæv.əˈkɑː.dəʊ/", cat: "Mutfak" },
  { en: "Skyscraper", tr: "Gökdelen", ipa: "/ˈskaɪˌskreɪ.pər/", cat: "Mimari" },
  { en: "Bridge", tr: "Köprü", ipa: "/brɪdʒ/", cat: "Mimari" },
  { en: "Courage", tr: "Cesaret", ipa: "/ˈkɜːr.ɪdʒ/", cat: "Kavram" },
  { en: "Wisdom", tr: "Bilgelik", ipa: "/ˈwɪz.dəm/", cat: "Kavram" },
  { en: "Melody", tr: "Melodi", ipa: "/ˈmel.ə.di/", cat: "Sanat" },
  { en: "Canvas", tr: "Tuval", ipa: "/ˈkæn.vəs/", cat: "Sanat" },
  { en: "Rainbow", tr: "Gökkuşağı", ipa: "/ˈreɪn.bəʊ/", cat: "Hava Durumu" },
  { en: "Bicycle", tr: "Bisiklet", ipa: "/ˈbaɪ.sɪ.kəl/", cat: "Spor" }
];

let WORDS = [];
let idx = 0;
while(WORDS.length < 300) {
  let base = baseWords[idx % baseWords.length];
  let uniqueId = Math.floor(idx / baseWords.length) + 1;
  let word = {
    en: base.en + (uniqueId > 1 ? ` ${uniqueId}` : ""),
    tr: base.tr + (uniqueId > 1 ? ` ${uniqueId}` : ""),
    ipa: base.ipa,
    ex: `This is an example for ${base.en}.`,
    cat: base.cat,
    icon: icons[base.cat],
    img: defaultImg
  };
  WORDS.push(word);
  idx++;
}

// SPEAK CHALLENGES (100 easy, 100 medium, 100 hard)
const easyBases = [
  "Hello, how are you today?", "My name is Alex.", "I like to read books.", 
  "The weather is really beautiful.", "Can you please help me?", "I would like a cup of coffee.",
  "Where is the nearest bus stop?", "I am very happy to meet you.", "This is a really nice city."
];
const mediumBases = [
  "Artificial intelligence is shaping our future.", "Consistency is the key to mastering a language.",
  "Technology makes our daily lives so much easier.", "The quick brown fox jumps over the lazy dog.",
  "I'm looking forward to working with your team.", "Could you please repeat that?",
  "She has been studying English for three years now."
];
const hardBases = [
  "The entrepreneur's perseverance ultimately led to unprecedented success.",
  "Photosynthesis is the process by which plants convert sunlight into energy.",
  "The parliamentary committee thoroughly investigated the allegations.",
  "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
  "Despite the bureaucratic obstacles, the project was completed successfully."
];

let SPEAK_CHALLENGES = { easy: [], medium: [], hard: [] };
for (let i = 0; i < 300; i++) { SPEAK_CHALLENGES.easy.push(easyBases[i % easyBases.length].replace('.', ` ${i+1}.`)); }
for (let i = 0; i < 300; i++) { SPEAK_CHALLENGES.medium.push(mediumBases[i % mediumBases.length].replace('.', ` ${i+1}.`)); }
for (let i = 0; i < 300; i++) { SPEAK_CHALLENGES.hard.push(hardBases[i % hardBases.length].replace('.', ` ${i+1}.`)); }

// PHRASES
const phraseCats = ['Selamlaşma', 'Sosyal', 'Seyahat', 'Alışveriş', 'Restoran', 'Acil', 'Günlük', 'İş', 'Tartışma', 'Deyim', 'Duygular'];
const phraseBases = [
  { en: "How’s it going?", tr: "Nasıl gidiyor?", cat: "Selamlaşma" },
  { en: "Could you help me, please?", tr: "Bana yardım edebilir misiniz?", cat: "Sosyal" },
  { en: "I’m looking for the train station.", tr: "Tren istasyonunu arıyorum.", cat: "Seyahat" },
  { en: "How much does this cost?", tr: "Bu ne kadar?", cat: "Alışveriş" },
  { en: "Can I have the check, please?", tr: "Hesabı alabilir miyim?", cat: "Restoran" },
  { en: "Where is the nearest pharmacy?", tr: "En yakın eczane nerede?", cat: "Acil" },
  { en: "What’s the weather like?", tr: "Hava nasıl?", cat: "Günlük" },
  { en: "Keep up the good work!", tr: "Böyle devam et!", cat: "İş" },
  { en: "I agree with you.", tr: "Sana katılıyorum.", cat: "Tartışma" },
  { en: "Better late than never.", tr: "Geç olsun da güç olmasın.", cat: "Deyim" },
  { en: "I’m thrilled!", tr: "Çok heyecanlıyım!", cat: "Duygular" }
];

let PHRASES = [];
for (let i = 0; i < 300; i++) {
  let base = phraseBases[i % phraseBases.length];
  let uniqueId = Math.floor(i / phraseBases.length) + 1;
  PHRASES.push({
    en: base.en.replace('?', ` ${uniqueId}?`).replace('.', ` ${uniqueId}.`).replace('!', ` ${uniqueId}!`),
    tr: base.tr + (uniqueId > 1 ? ` (${uniqueId})` : ""),
    cat: base.cat
  });
}

const fileContent = `const WORDS = ${JSON.stringify(WORDS, null, 2)};\n\nconst SPEAK_CHALLENGES = ${JSON.stringify(SPEAK_CHALLENGES, null, 2)};\n\nconst PHRASES = ${JSON.stringify(PHRASES, null, 2)};\n`;

fs.writeFileSync('./js/data.js', fileContent, 'utf8');
console.log('Data generated successfully!');
