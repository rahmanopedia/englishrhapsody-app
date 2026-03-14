const CONVERSATIONS = [
  {
    "id": "scen_v3_1",
    "c": "business",
    "emoji": "👔",
    "title": "Yatırımcı Sunumu (Pitch)",
    "level": "hard",
    "turns": [
      {
        "bot": [
          "Welcome. We've reviewed your pitch deck. What is your primary competitive advantage?",
          "Glad to have you here. Your deck looks promising. Tell us, what makes you stand out most?",
          "Thanks for coming, but we have some concerns. What exactly is your competitive edge?"
        ],
        "tr": [
          "Hoş geldiniz. Sunum dosyanızı inceledik. Temel rekabet avantajınız nedir?",
          "Sizi burada görmek güzel. Sunumunuz umut verici görünüyor. Sizi en çok öne çıkaran şey nedir?",
          "Geldiğiniz için teşekkürler ama bazı endişelerimiz var. Rekabet avantajınız tam olarak nedir?"
        ]
      },
      {
        "userHint": "Yapay zeka tabanlı benzersiz algoritmamızdan ve pazar payımızdan bahsedin",
        "keywords": [
          "unique",
          "ai",
          "algorithm",
          "market",
          "share",
          "advantage"
        ],
        "expected": "Our unique AI algorithm and rapidly growing market share are our biggest advantages."
      },
      {
        "bot": [
          "Interesting. How do you plan to scale this internationally within the next year?",
          "That sounds solid. Do you have a clear strategy for international scaling this year?",
          "I see, but scaling globally is difficult. How do you intend to handle international growth?"
        ],
        "tr": [
          "İlginç. Önümüzdeki yıl içinde bunu uluslararası düzeyde nasıl ölçeklendirmeyi planlıyorsunuz?",
          "Kulağa sağlam geliyor. Bu yıl uluslararası ölçeklendirme için net bir stratejiniz var mı?",
          "Anlıyorum ama küresel ölçeklendirme zordur. Uluslararası büyümeyi nasıl yönetmeyi düşünüyorsunuz?"
        ]
      },
      {
        "userHint": "Yerel ortaklıklar kuracağımızı ve dijital pazarlamaya odaklanacağımızı söyleyin",
        "keywords": [
          "local",
          "partnerships",
          "digital",
          "marketing",
          "focus",
          "global"
        ],
        "expected": "We plan to establish local partnerships and focus heavily on digital marketing for global growth."
      }
    ]
  },
  {
    "id": "gen_v3_2",
    "c": "business",
    "emoji": "💰",
    "title": "Maaş Pazarlığı",
    "level": "hard",
    "turns": [
      {
        "bot": [
          "Hello. We are here to discuss your salary request. What's the latest update?",
          "Hi! I'm happy to help with your salary request. Tell me everything!",
          "We need to talk about your salary request immediately. Why is there a delay?"
        ],
        "tr": [
          "Merhaba. salary talebiniz hakkında görüşmek için buradayız. Son durum nedir?",
          "Selam! salary talebinizle ilgili yardımcı olmaktan mutluyum. Bana her şeyi anlatın!",
          "Hemen salary talebiniz hakkında konuşmalıyiz. Neden bir gecikme var?"
        ]
      },
      {
        "userHint": "Durumu özetleyin ve gerekli belgelerimin hazır olduğunu söyleyin",
        "keywords": [
          "summary",
          "situation",
          "documents",
          "ready",
          "prepared"
        ],
        "expected": "I have a summary of the situation and all my documents are ready."
      },
      {
        "bot": [
          "Understood. Let's look at the documents together.",
          "Perfect! I love how organized you are. Let's see them!",
          "Finally. I hope these documents are actually complete this time."
        ],
        "tr": [
          "Anlaşıldı. Belgelere birlikte bakalım.",
          "Mükemmel! Ne kadar düzenli olmanıza bayıldım. Onlara bakalım!",
          "Nihayet. Umarım bu sefer belgeler gerçekten tamdır."
        ]
      }
    ]
  },
  {
    "id": "gen_v3_3",
    "c": "travel",
    "emoji": "🛂",
    "title": "Vize Mülakatı",
    "level": "medium",
    "turns": [
      {
        "bot": [
          "Hello. We are here to discuss your visa request. What's the latest update?",
          "Hi! I'm happy to help with your visa request. Tell me everything!",
          "We need to talk about your visa request immediately. Why is there a delay?"
        ],
        "tr": [
          "Merhaba. visa talebiniz hakkında görüşmek için buradayız. Son durum nedir?",
          "Selam! visa talebinizle ilgili yardımcı olmaktan mutluyum. Bana her şeyi anlatın!",
          "Hemen visa talebiniz hakkında konuşmalıyiz. Neden bir gecikme var?"
        ]
      },
      {
        "userHint": "Durumu özetleyin ve gerekli belgelerimin hazır olduğunu söyleyin",
        "keywords": [
          "summary",
          "situation",
          "documents",
          "ready",
          "prepared"
        ],
        "expected": "I have a summary of the situation and all my documents are ready."
      },
      {
        "bot": [
          "Understood. Let's look at the documents together.",
          "Perfect! I love how organized you are. Let's see them!",
          "Finally. I hope these documents are actually complete this time."
        ],
        "tr": [
          "Anlaşıldı. Belgelere birlikte bakalım.",
          "Mükemmel! Ne kadar düzenli olmanıza bayıldım. Onlara bakalım!",
          "Nihayet. Umarım bu sefer belgeler gerçekten tamdır."
        ]
      }
    ]
  },
  {
    "id": "gen_v3_4",
    "c": "emergency",
    "emoji": "🚨",
    "title": "Acil Servis Hattı",
    "level": "easy",
    "turns": [
      {
        "bot": [
          "Hello. We are here to discuss your emergency request. What's the latest update?",
          "Hi! I'm happy to help with your emergency request. Tell me everything!",
          "We need to talk about your emergency request immediately. Why is there a delay?"
        ],
        "tr": [
          "Merhaba. emergency talebiniz hakkında görüşmek için buradayız. Son durum nedir?",
          "Selam! emergency talebinizle ilgili yardımcı olmaktan mutluyum. Bana her şeyi anlatın!",
          "Hemen emergency talebiniz hakkında konuşmalıyiz. Neden bir gecikme var?"
        ]
      },
      {
        "userHint": "Durumu özetleyin ve gerekli belgelerimin hazır olduğunu söyleyin",
        "keywords": [
          "summary",
          "situation",
          "documents",
          "ready",
          "prepared"
        ],
        "expected": "I have a summary of the situation and all my documents are ready."
      },
      {
        "bot": [
          "Understood. Let's look at the documents together.",
          "Perfect! I love how organized you are. Let's see them!",
          "Finally. I hope these documents are actually complete this time."
        ],
        "tr": [
          "Anlaşıldı. Belgelere birlikte bakalım.",
          "Mükemmel! Ne kadar düzenli olmanıza bayıldım. Onlara bakalım!",
          "Nihayet. Umarım bu sefer belgeler gerçekten tamdır."
        ]
      }
    ]
  },
  {
    "id": "gen_v3_5",
    "c": "medical",
    "emoji": "🩺",
    "title": "Doktor Muayenesi",
    "level": "medium",
    "turns": [
      {
        "bot": [
          "Hello. We are here to discuss your doctor request. What's the latest update?",
          "Hi! I'm happy to help with your doctor request. Tell me everything!",
          "We need to talk about your doctor request immediately. Why is there a delay?"
        ],
        "tr": [
          "Merhaba. doctor talebiniz hakkında görüşmek için buradayız. Son durum nedir?",
          "Selam! doctor talebinizle ilgili yardımcı olmaktan mutluyum. Bana her şeyi anlatın!",
          "Hemen doctor talebiniz hakkında konuşmalıyiz. Neden bir gecikme var?"
        ]
      },
      {
        "userHint": "Durumu özetleyin ve gerekli belgelerimin hazır olduğunu söyleyin",
        "keywords": [
          "summary",
          "situation",
          "documents",
          "ready",
          "prepared"
        ],
        "expected": "I have a summary of the situation and all my documents are ready."
      },
      {
        "bot": [
          "Understood. Let's look at the documents together.",
          "Perfect! I love how organized you are. Let's see them!",
          "Finally. I hope these documents are actually complete this time."
        ],
        "tr": [
          "Anlaşıldı. Belgelere birlikte bakalım.",
          "Mükemmel! Ne kadar düzenli olmanıza bayıldım. Onlara bakalım!",
          "Nihayet. Umarım bu sefer belgeler gerçekten tamdır."
        ]
      }
    ]
  },
  {
    "id": "gen_v3_6",
    "c": "social",
    "emoji": "🔑",
    "title": "Kiralık Ev Bakma",
    "level": "easy",
    "turns": [
      {
        "bot": [
          "Hello. We are here to discuss your apartment request. What's the latest update?",
          "Hi! I'm happy to help with your apartment request. Tell me everything!",
          "We need to talk about your apartment request immediately. Why is there a delay?"
        ],
        "tr": [
          "Merhaba. apartment talebiniz hakkında görüşmek için buradayız. Son durum nedir?",
          "Selam! apartment talebinizle ilgili yardımcı olmaktan mutluyum. Bana her şeyi anlatın!",
          "Hemen apartment talebiniz hakkında konuşmalıyiz. Neden bir gecikme var?"
        ]
      },
      {
        "userHint": "Durumu özetleyin ve gerekli belgelerimin hazır olduğunu söyleyin",
        "keywords": [
          "summary",
          "situation",
          "documents",
          "ready",
          "prepared"
        ],
        "expected": "I have a summary of the situation and all my documents are ready."
      },
      {
        "bot": [
          "Understood. Let's look at the documents together.",
          "Perfect! I love how organized you are. Let's see them!",
          "Finally. I hope these documents are actually complete this time."
        ],
        "tr": [
          "Anlaşıldı. Belgelere birlikte bakalım.",
          "Mükemmel! Ne kadar düzenli olmanıza bayıldım. Onlara bakalım!",
          "Nihayet. Umarım bu sefer belgeler gerçekten tamdır."
        ]
      }
    ]
  }
];