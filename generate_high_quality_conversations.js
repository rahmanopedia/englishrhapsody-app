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
            { userHint: "Yerel ortaklıklar kuracağımızı ve dijital pazarlamaya odaklanacağımızı söyleyin", keywords: ['local', 'partnerships', 'digital', 'marketing', 'focus', 'global'], expected: "We plan to establish local partnerships and focus heavily on digital marketing for global growth." },
            v("What is the minimum investment you are looking for today?",
              "We are interested. What's the minimum funding you need to reach the next milestone?",
              "Before we go further, what is the smallest investment amount you would accept?",
              "Bugün aradığınız minimum yatırım miktarı nedir?",
              "İlgileniyoruz. Bir sonraki aşamaya geçmek için ihtiyacınız olan minimum fon nedir?",
              "Daha ileri gitmeden önce, kabul edeceğiniz en küçük yatırım miktarı nedir?"),
            { userHint: "İki milyon dolar aradığımızı ama şartlara göre esnek olduğumuzu söyleyin", keywords: ['seeking', 'two', 'million', 'flexible', 'terms', 'conditions'], expected: "We are seeking two million dollars, but we are flexible depending on the terms." }
        ]
    },
    {
        c: 'academic', emoji: '🔬', title: "Laboratuvar Güvenlik İhlali", level: 'hard',
        turns: [
            v("Stop right there! Why are you entering the high-risk zone without a hazmat suit?",
              "Excuse me, I noticed you're entering the restricted area. Do you have your safety gear?",
              "Hey! You can't go in there like that! Where is your protective equipment?",
              "Orada dur! Neden koruyucu giysi olmadan yüksek riskli bölgeye giriyorsun?",
              "Affedersiniz, kısıtlı alana girdiğinizi fark ettim. Güvenlik ekipmanınız yanınızda mı?",
              "Hey! Oraya bu şekilde giremezsin! Koruyucu ekipmanın nerede?"),
            { userHint: "Acil bir durum olduğunu ve içeride bir sızıntı gördüğümü söyleyin", keywords: ['emergency', 'leak', 'inside', 'noticed', 'urgent'], expected: "There's an emergency! I noticed a chemical leak inside the lab." },
            v("A leak? Which sector is affected? We must evacuate the floor immediately!",
              "A leak? Thank you for reporting. Which area is it in? I'll trigger the alarm.",
              "A leak?! Why didn't you use the intercom? Tell me which sector right now!",
              "Bir sızıntı mı? Hangi sektör etkilendi? Katı hemen tahliye etmeliyiz!",
              "Sızıntı mı? Bildirdiğiniz için teşekkürler. Hangi alanda? Alarmı çalıştıracağım.",
              "Sızıntı mı?! Neden interkomu kullanmadın? Hemen hangi sektör olduğunu söyle!"),
            { userHint: "B sektöründe olduğunu ve dumanların yükseldiğini belirtin", keywords: ['sector', 'B', 'smoke', 'rising', 'visible', 'chemicals'], expected: "It's in Sector B, and I can see thick smoke rising from the chemicals." }
        ]
    },

    // --- INTERMEDIATE / MEDIUM ---
    {
        c: 'social', emoji: '🎨', title: "Modern Sanat Galerisi Eleştirisi", level: 'medium',
        turns: [
            v("What do you think of this main installation? It's quite provocative, isn't it?",
              "Isn't this piece wonderful? It really speaks to the soul, don't you agree?",
              "I find this work a bit confusing. What's your take on it?",
              "Bu ana yerleştirme hakkında ne düşünüyorsunuz? Oldukça kışkırtıcı, değil mi?",
              "Bu eser harika değil mi? Gerçekten ruha hitap ediyor, katılmaz mısınız?",
              "Bu çalışmayı biraz kafa karıştırıcı buluyorum. Sizin yorumunuz nedir?"),
            { userHint: "Renk kullanımının harika olduğunu ama anlamını tam çözemediğinizi söyleyin", keywords: ['colors', 'amazing', 'meaning', 'understand', 'concept'], expected: "The use of colors is amazing, but I'm having trouble understanding the core meaning." },
            v("The artist meant to symbolize urban decay. Does that change your perspective?",
              "Exactly! It's meant to be mysterious. Knowing it's about urban decay, do you like it more?",
              "Well, it's about urban decay. If you can't see that, maybe it's not for you. Thoughts?",
              "Sanatçı kentsel çürümeyi sembolize etmek istemiş. Bu bakış açınızı değiştiriyor mu?",
              "Kesinlikle! Gizemli olması amaçlanmış. Kentsel çürümeyle ilgili olduğunu bilmek onu daha çok sevmenizi sağlar mı?",
              "Pekala, konu kentsel çürüme. Bunu göremiyorsanız, belki de size göre değildir. Düşünceleriniz?"),
            { userHint: "Şimdi daha mantıklı geldiğini ve toplumsal bir mesajı olduğunu fark ettiğinizi söyleyin", keywords: ['makes', 'sense', 'notice', 'social', 'message', 'perspective'], expected: "That makes much more sense now. I can see the strong social message behind it." }
        ]
    }
];

// Re-generate the full list with variations
const generateFullPool = () => {
    let final = [];
    let id = 1;

    // Add the hand-crafted ones
    scenarios.forEach(s => {
        final.push({ id: `scen_v3_${id++}`, ...s });
    });

    // Add automated variants for common topics to ensure quantity
    const topics = [
        { name: "Avukat ile Görüşme", c: 'business', e: '⚖️', l: 'hard', k: 'legal' },
        { name: "Psikolog Randevusu", c: 'medical', e: '🧠', l: 'medium', k: 'psychology' },
        { name: "Araba Kiralama", c: 'travel', e: '🚗', l: 'easy', k: 'car rental' },
        { name: "Ev Sahibi ile Tartışma", c: 'social', e: '🏠', l: 'medium', k: 'landlord' }
    ];

    topics.forEach(t => {
        final.push({
            id: `gen_v3_${id++}`, c: t.c, emoji: t.e, title: t.name, level: t.l,
            turns: [
                v(`Hello. I'm glad we could meet regarding your ${t.k} issue. How can I help?`,
                  `Hi! It's great to see you. Let's talk about your ${t.k} situation. Ready?`,
                  `Finally, you're here. We need to settle this ${t.k} matter quickly. What's the status?`,
                  `Merhaba. ${t.k} meselenizle ilgili görüşebildiğimize sevindim. Nasıl yardımcı olabilirim?`,
                  `Selam! Seni görmek harika. Hadi ${t.k} durumun hakkında konuşalım. Hazır mısın?`,
                  `Nihayet geldin. Bu ${t.k} konusunu hızlıca halletmemiz gerek. Durum nedir?`),
                { userHint: "Detayları anlatmaya başlamak istediğinizi söyleyin", keywords: ['start', 'explaining', 'details', 'situation', 'happen'], expected: "I'd like to start by explaining the details of the situation." },
                v("I'm listening. Please be as specific as possible.",
                  "Go ahead! I'm all ears and ready to support you.",
                  "Fine, but please be brief. We don't have much time.",
                  "Dinliyorum. Lütfen mümkün olduğunca spesifik olun.",
                  "Devam et! Seni can kulağıyla dinliyorum ve desteklemeye hazırım.",
                  "Güzel ama lütfen kısa kes. Çok vaktimiz yok."),
                { userHint: "Geçen hafta olan olaydan bahsedin", keywords: ['happened', 'last', 'week', 'incident', 'event'], expected: "Everything started with the incident that happened last week." }
            ]
        });
    });

    return final;
};

const finalConvos = generateFullPool();
const content = `// REACTIVE AI CONVERSATIONS V3
const CONVERSATIONS = ${JSON.stringify(finalConvos, null, 2)};
`;

fs.writeFileSync('englishrhapsody-fix/js/conversations.js', content, 'utf-8');
console.log('Generated ' + finalConvos.length + ' reactive scenarios with 3-way branching logic.');
