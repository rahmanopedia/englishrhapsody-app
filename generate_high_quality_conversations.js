const fs = require('fs');

// Helper to generate 3 variations for bot responses
const v = (neutral, positive, negative, tr_n, tr_p, tr_ng) => {
    return {
        bot: [neutral, positive, negative],
        tr: [tr_n, tr_p, tr_ng]
    };
};

const scenarios = [
    // --- ADVANCED / HARD ---
    {
        c: 'business', emoji: '👔', title: "Yatırımcı Sunumu (Pitch)", level: 'hard',
        turns: [
            v("Welcome. We've reviewed your pitch deck. What is your primary competitive advantage?", 
              "Glad to have you here. Your deck looks promising. Tell us, what makes you stand out most?",
              "Thanks for coming, but we have some concerns. What exactly is your competitive edge?",
              "Hoş geldiniz. Sunum dosyanızı inceledik. Temel rekabet avantajınız nedir?",
              "Sizi burada görmek güzel. Sunumunuz umut verici görünüyor. Sizi en çok öne çıkaran şey nedir?",
              "Geldiğiniz için teşekkürler ama bazı endişelerimiz var. Rekabet avantajınız tam olarak nedir?"),
            { userHint: "Yapay zeka tabanlı benzersiz algoritmamızdan ve pazar payımızdan bahsedin", keywords: ['unique', 'ai', 'algorithm', 'market', 'share', 'advantage'], expected: "Our unique AI algorithm and rapidly growing market share are our biggest advantages." },
            v("Interesting. How do you plan to scale this internationally within the next year?",
              "That sounds solid. Do you have a clear strategy for international scaling this year?",
              "I see, but scaling globally is difficult. How do you intend to handle international growth?",
              "İlginç. Önümüzdeki yıl içinde bunu uluslararası düzeyde nasıl ölçeklendirmeyi planlıyorsunuz?",
              "Kulağa sağlam geliyor. Bu yıl uluslararası ölçeklendirme için net bir stratejiniz var mı?",
              "Anlıyorum ama küresel ölçeklendirme zordur. Uluslararası büyümeyi nasıl yönetmeyi düşünüyorsunuz?"),
            { userHint: "Yerel ortaklıklar kuracağımızı ve dijital pazarlamaya odaklanacağımızı söyleyin", keywords: ['local', 'partnerships', 'digital', 'marketing', 'focus', 'global'], expected: "We plan to establish local partnerships and focus heavily on digital marketing for global growth." }
        ]
    }
];

const generateFullPool = () => {
    let final = [];
    let id = 1;
    scenarios.forEach(s => { final.push({ id: `scen_v3_${id++}`, ...s }); });

    const genericTopics = [
        { name: "Maaş Pazarlığı", c: 'business', e: '💰', l: 'hard', k: 'salary' },
        { name: "Vize Mülakatı", c: 'travel', e: '🛂', l: 'medium', k: 'visa' },
        { name: "Acil Servis Hattı", c: 'emergency', e: '🚨', l: 'easy', k: 'emergency' },
        { name: "Doktor Muayenesi", c: 'medical', e: '🩺', l: 'medium', k: 'doctor' },
        { name: "Kiralık Ev Bakma", c: 'social', e: '🔑', l: 'easy', k: 'apartment' }
    ];

    genericTopics.forEach(t => {
        final.push({
            id: `gen_v3_${id++}`, c: t.c, emoji: t.e, title: t.name, level: t.l,
            turns: [
                v(`Hello. We are here to discuss your ${t.k} request. What's the latest update?`,
                  `Hi! I'm happy to help with your ${t.k} request. Tell me everything!`,
                  `We need to talk about your ${t.k} request immediately. Why is there a delay?`,
                  `Merhaba. ${t.k} talebiniz hakkında görüşmek için buradayız. Son durum nedir?`,
                  `Selam! ${t.k} talebinizle ilgili yardımcı olmaktan mutluyum. Bana her şeyi anlatın!`,
                  `Hemen ${t.k} talebiniz hakkında konuşmalıyiz. Neden bir gecikme var?`),
                { userHint: "Durumu özetleyin ve gerekli belgelerimin hazır olduğunu söyleyin", keywords: ['summary', 'situation', 'documents', 'ready', 'prepared'], expected: "I have a summary of the situation and all my documents are ready." },
                v("Understood. Let's look at the documents together.",
                  "Perfect! I love how organized you are. Let's see them!",
                  "Finally. I hope these documents are actually complete this time.",
                  "Anlaşıldı. Belgelere birlikte bakalım.",
                  "Mükemmel! Ne kadar düzenli olmanıza bayıldım. Onlara bakalım!",
                  "Nihayet. Umarım bu sefer belgeler gerçekten tamdır.")
            ]
        });
    });
    return final;
};

const finalConvos = generateFullPool();
const content = `const CONVERSATIONS = ${JSON.stringify(finalConvos, null, 2)};`;
fs.writeFileSync('js/conversations.js', content, 'utf-8');
console.log('Update complete.');
