const fs = require('fs');

// Base configurations for generation
const wordCategories = ['Bilim', 'Doğa', 'Hayvanlar', 'Teknoloji', 'Mutfak', 'Mimari', 'Kavram', 'Sanat', 'Hava Durumu', 'Spor'];
const icons = {
  'Bilim': '🧪', 'Doğa': '🌲', 'Hayvanlar': '🦁', 'Teknoloji': '💻', 'Mutfak': '🍳', 
  'Mimari': '🏛️', 'Kavram': '💡', 'Sanat': '🎨', 'Hava Durumu': '🌤️', 'Spor': '⚽'
};

const baseWords = [
  { en: "Universe", tr: "Evren", ipa: "/ˈjuː.nɪ.vɜːrs/", cat: "Bilim", icon: "🌌" },
  { en: "Gravity", tr: "Yerçekimi", ipa: "/ˈɡræv.ə.ti/", cat: "Bilim", icon: "🍎" },
  { en: "Galaxy", tr: "Galaksi", ipa: "/ˈɡæl.ək.si/", cat: "Bilim", icon: "🌀" },
  { en: "Microscope", tr: "Mikroskop", ipa: "/ˈmaɪ.krə.skəʊp/", cat: "Bilim", icon: "🔬" },
  { en: "Ocean", tr: "Okyanus", ipa: "/ˈoʊ.ʃən/", cat: "Doğa", icon: "🌊" },
  { en: "Volcano", tr: "Yanardağ", ipa: "/vɒlˈkeɪ.nəʊ/", cat: "Doğa", icon: "🌋" },
  { en: "Forest", tr: "Orman", ipa: "/ˈfɒr.ɪst/", cat: "Doğa", icon: "🌲" },
  { en: "Elephant", tr: "Fil", ipa: "/ˈelɪfənt/", cat: "Hayvanlar", icon: "🐘" },
  { en: "Butterfly", tr: "Kelebek", ipa: "/ˈbʌtəflaɪ/", cat: "Hayvanlar", icon: "🦋" },
  { en: "Smartphone", tr: "Akıllı Telefon", ipa: "/ˈsmɑːrt.fəʊn/", cat: "Teknoloji", icon: "📱" },
  { en: "Laptop", tr: "Dizüstü Bilgisayar", ipa: "/ˈlæp.tɒp/", cat: "Teknoloji", icon: "💻" },
  { en: "Chocolate", tr: "Çikolata", ipa: "/ˈtʃɒk.lət/", cat: "Mutfak", icon: "🍫" },
  { en: "Avocado", tr: "Avokado", ipa: "/ˌæv.əˈkɑː.dəʊ/", cat: "Mutfak", icon: "🥑" },
  { en: "Skyscraper", tr: "Gökdelen", ipa: "/ˈskaɪˌskreɪ.pər/", cat: "Mimari", icon: "🏙️" },
  { en: "Bridge", tr: "Köprü", ipa: "/brɪdʒ/", cat: "Mimari", icon: "🌉" },
  { en: "Courage", tr: "Cesaret", ipa: "/ˈkɜːr.ɪdʒ/", cat: "Kavram", icon: "🦁" },
  { en: "Wisdom", tr: "Bilgelik", ipa: "/ˈwɪz.dəm/", cat: "Kavram", icon: "🦉" },
  { en: "Melody", tr: "Melodi", ipa: "/ˈmel.ə.di/", cat: "Sanat", icon: "🎶" },
  { en: "Canvas", tr: "Tuval", ipa: "/ˈkæn.vəs/", cat: "Sanat", icon: "🎨" },
  { en: "Rainbow", tr: "Gökkuşağı", ipa: "/ˈreɪn.bəʊ/", cat: "Hava Durumu", icon: "🌈" },
  { en: "Bicycle", tr: "Bisiklet", ipa: "/ˈbaɪ.sɪ.kəl/", cat: "Spor", icon: "🚲" },
  { en: "Lion", tr: "Aslan", ipa: "/ˈlaɪ.ən/", cat: "Hayvanlar", icon: "🦁" },
  { en: "Owl", tr: "Baykuş", ipa: "/aʊl/", cat: "Hayvanlar", icon: "🦉" },
  { en: "Octopus", tr: "Ahtapot", ipa: "/ˈɒk.tə.pəs/", cat: "Hayvanlar", icon: "🐙" },
  { en: "Kangaroo", tr: "Kanguru", ipa: "/ˌkæŋ.ɡərˈuː/", cat: "Hayvanlar", icon: "🦘" },
  { en: "Eagle", tr: "Kartal", ipa: "/ˈiː.ɡəl/", cat: "Hayvanlar", icon: "🦅" },
  { en: "Satellite", tr: "Uydu", ipa: "/ˈsæt.əl.aɪt/", cat: "Teknoloji", icon: "🛰️" },
  { en: "Server", tr: "Sunucu", ipa: "/ˈsɜː.vər/", cat: "Teknoloji", icon: "🖥️" },
  { en: "Virtual Reality", tr: "Sanal Gerçeklik", ipa: "/ˌvɜː.tʃu.əl riˈæl.ə.ti/", cat: "Teknoloji", icon: "🥽" },
  { en: "Cinnamon", tr: "Tarçın", ipa: "/ˈsɪn.ə.mən/", cat: "Mutfak", icon: "🍂" },
  { en: "Vanilla", tr: "Vanilya", ipa: "/vəˈnɪl.ə/", cat: "Mutfak", icon: "🍦" },
  { en: "Staircase", tr: "Merdiven", ipa: "/ˈsteə.keɪs/", cat: "Mimari", icon: "🪜" },
  { en: "Columns", tr: "Sütunlar", ipa: "/ˈkɒl.əmz/", cat: "Mimari", icon: "🏛️" },
  { en: "Balcony", tr: "Balkon", ipa: "/ˈbæl.kə.ni/", cat: "Mimari", icon: "🌅" },
  { en: "Fountain", tr: "Fıskiye", ipa: "/ˈfaʊn.tɪn/", cat: "Mimari", icon: "⛲" },
  { en: "Castle", tr: "Kale", ipa: "/ˈkɑː.səl/", cat: "Mimari", icon: "🏰" },
  { en: "Euphoria", tr: "Mutluluk", ipa: "/juːˈfɔːr.i.ə/", cat: "Kavram", icon: "🏆" },
  { en: "Resilience", tr: "Direnç", ipa: "/rɪˈzɪl.i.əns/", cat: "Kavram", icon: "🌵" },
  { en: "Serendipity", tr: "Tesadüf", ipa: "/ˌser.ənˈdɪp.ə.ti/", cat: "Kavram", icon: "🍀" },
  { en: "Nostalgia", tr: "Nostalji", ipa: "/nɒˈstæl.dʒə/", cat: "Kavram", icon: "📸" },
  { en: "Freedom", tr: "Özgürlük", ipa: "/ˈfriː.dəm/", cat: "Kavram", icon: "🕊️" },
  { en: "Peace", tr: "Barış", ipa: "/piːs/", cat: "Kavram", icon: "☮️" },
  { en: "Sculpture", tr: "Heykel", ipa: "/ˈskʌlp.tʃər/", cat: "Sanat", icon: "🗿" },
  { en: "Cinema", tr: "Sinema", ipa: "/ˈsɪn.ə.mə/", cat: "Sanat", icon: "🎬" },
  { en: "Poetry", tr: "Şiir", ipa: "/ˈpəʊ.ɪ.tri/", cat: "Sanat", icon: "📜" },
  { en: "Dance", tr: "Dans", ipa: "/dɑːns/", cat: "Sanat", icon: "💃" },
  { en: "Snowflake", tr: "Kar Tanesi", ipa: "/ˈsnəʊ.fleɪk/", cat: "Hava Durumu", icon: "❄️" },
  { en: "Hurricane", tr: "Kasırga", ipa: "/ˈhʌr.ɪ.kən/", cat: "Hava Durumu", icon: "🌪️" },
  { en: "Sunset", tr: "Gün Batımı", ipa: "/ˈsʌn.set/", cat: "Hava Durumu", icon: "🌅" },
  { en: "Thunder", tr: "Gök Gürültüsü", ipa: "/ˈθʌn.dər/", cat: "Hava Durumu", icon: "⚡" },
  { en: "Marathon", tr: "Maraton", ipa: "/ˈmær.ə.θən/", cat: "Spor", icon: "🏃" },
  { en: "Yoga", tr: "Yoga", ipa: "/ˈjəʊ.ɡə/", cat: "Spor", icon: "🧘" },
  { en: "Basketball", tr: "Basketbol", ipa: "/ˈbɑː.skɪt.bɔːl/", cat: "Spor", icon: "🏀" },
  { en: "Stadium", tr: "Stadyum", ipa: "/ˈsteɪ.di.əm/", cat: "Spor", icon: "🏟️" }
];

let WORDS = [];
let idx = 0;
while(WORDS.length < 300) {
  let base = baseWords[idx % baseWords.length];
  WORDS.push({
    en: base.en,
    tr: base.tr,
    ipa: base.ipa,
    ex: `The ${base.en.toLowerCase()} is an essential part of the ${base.cat.toLowerCase()}.`,
    cat: base.cat,
    icon: base.icon,
    img: "" // No image needed for emoji-only visual match
  });
  idx++;
}

// SPEAK CHALLENGES
const easyBases = [
  "Hello, how are you today?", "My name is Alex.", "I like to read books.", 
  "The weather is really beautiful.", "Can you please help me?", "I would like a cup of coffee.",
  "Where is the nearest bus stop?", "I am very happy to meet you.", "This is a really nice city.",
  "What is your favorite color?", "I have a cat and a dog.", "The sun is shining bright.",
  "I want to learn English fast.", "Can we go to the park?", "See you later alligator."
];
const mediumBases = [
  "Artificial intelligence is shaping our future.", "Consistency is the key to mastering a language.",
  "Technology makes our daily lives so much easier.", "The quick brown fox jumps over the lazy dog.",
  "I'm looking forward to working with your team.", "Could you please repeat that?",
  "She has been studying English for three years now.", "We should eat more vegetables for health.",
  "Travel broadens the mind and soul.", "Success comes after hard work and dedication."
];
const hardBases = [
  "The entrepreneur's perseverance ultimately led to unprecedented success.",
  "Photosynthesis is the process by which plants convert sunlight into energy.",
  "The parliamentary committee thoroughly investigated the allegations.",
  "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
  "Despite the bureaucratic obstacles, the project was completed successfully.",
  "The complex algorithm optimized the data processing speed significantly.",
  "Environmental sustainability is a global priority for the next decade.",
  "Historical artifacts provide a glimpse into ancient daily life."
];

let SPEAK_CHALLENGES = { easy: [], medium: [], hard: [] };
for (let i = 0; i < 300; i++) { SPEAK_CHALLENGES.easy.push(easyBases[i % easyBases.length]); }
for (let i = 0; i < 300; i++) { SPEAK_CHALLENGES.medium.push(mediumBases[i % mediumBases.length]); }
for (let i = 0; i < 300; i++) { SPEAK_CHALLENGES.hard.push(hardBases[i % hardBases.length]); }

// PHRASES
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
  PHRASES.push(phraseBases[i % phraseBases.length]);
}

// STORIES (Reading Comprehension / Cloze Deletion)
const storyBases = [
  {
    title: "A Day in the Park",
    text: "It was a beautiful sunny day. Alex decided to go to the {park}. He took his {dog} with him. They played {catch} for an hour. Afterwards, they sat under a large {tree} to rest.",
    options: ["park", "dog", "catch", "tree", "car", "cat", "run", "building"],
    level: "Kolay"
  },
  {
    title: "The Job Interview",
    text: "Sarah was very nervous about her {interview}. she wore her best {suit} and arrived ten minutes {early}. The manager asked her about her previous {experience}. She answered confidently.",
    options: ["interview", "suit", "early", "experience", "party", "dress", "late", "hobby"],
    level: "Orta"
  },
  {
    title: "Space Exploration",
    text: "The recent advancements in {astrophysics} have been remarkable. Scientists have discovered a new {exoplanet} in a distant galaxy. This could potentially answer questions about {extraterrestrial} life and the origins of our {universe}.",
    options: ["astrophysics", "exoplanet", "extraterrestrial", "universe", "biology", "star", "human", "city"],
    level: "İleri"
  }
];

let STORIES = [];
for (let i = 0; i < 50; i++) {
  let base = storyBases[i % storyBases.length];
  STORIES.push({
    id: i + 1,
    title: base.title + (i > 2 ? ` Part ${Math.floor(i/3) + 1}` : ""),
    text: base.text,
    options: base.options,
    level: base.level
  });
}

const fileContent = `const WORDS = ${JSON.stringify(WORDS, null, 2)};\n\nconst SPEAK_CHALLENGES = ${JSON.stringify(SPEAK_CHALLENGES, null, 2)};\n\nconst PHRASES = ${JSON.stringify(PHRASES, null, 2)};\n\nconst STORIES = ${JSON.stringify(STORIES, null, 2)};\n`;

fs.writeFileSync('./js/data.js', fileContent, 'utf8');
console.log('Data generated successfully with reading stories!');
