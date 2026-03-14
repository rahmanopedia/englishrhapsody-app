// Diversified AI Conversations
const CONVERSATIONS = [
  {
    "id": "scen_1",
    "c": "travel",
    "emoji": "🏨",
    "title": "Lüks Otelde Klima Krizi",
    "level": "hard",
    "turns": [
      {
        "bot": "I apologize for the inconvenience. Could you please specify the issue in your room?",
        "tr": "Bunu duyduğuma çok üzüldüm efendim. Süitinizdeki sorun tam olarak nedir?"
      },
      {
        "userHint": "Klimanın çalışmadığını ve odanın çok sıcak olduğunu söyleyin",
        "keywords": [
          "air",
          "conditioning",
          "working",
          "hot",
          "room"
        ],
        "expected": "The air conditioning is not working and the room is too hot."
      },
      {
        "bot": "This is not the standard we aim for. I can offer a room change or immediate repair. What do you think?",
        "tr": "Bu kabul edilemez. Hemen bir teknisyen göndereceğim ya da sizi başka bir odaya alacağım. Hangisini tercih edersiniz?"
      },
      {
        "userHint": "Oda değiştirmek istediğinizi ama deniz manzaralı olmasını istediğinizi söyleyin",
        "keywords": [
          "prefer",
          "change",
          "another",
          "room",
          "sea",
          "view"
        ],
        "expected": "I would prefer to move to another room, but it must have a sea view."
      },
      {
        "bot": "Certainly. There is a sea-view suite on the top floor. Would you like me to arrange a bellboy for your bags?",
        "tr": "Tabii ki. Beşinci katta boş bir delüks süitimiz var. Güzel bir balkonu var. Valizleriniz için birini göndermemi ister misiniz?"
      },
      {
        "userHint": "Evet lütfen, ve bu rahatsızlık için bir telafi yapılıp yapılamayacağını sorun",
        "keywords": [
          "yes",
          "please",
          "compensation",
          "discount",
          "trouble",
          "inconvenience"
        ],
        "expected": "Yes please, and could you offer some compensation for this inconvenience?"
      }
    ]
  },
  {
    "id": "scen_2",
    "c": "travel",
    "emoji": "🛂",
    "title": "Pasaport Kontrolünde Soruşturma",
    "level": "hard",
    "turns": [
      {
        "bot": "Good afternoon. May I see your passport and travel documents, please?",
        "tr": "Tünaydın. Pasaportunuzu ve seyahat belgelerinizi görebilir miyim lütfen?"
      },
      {
        "userHint": "Pasaportunuzu uzatın ve tatil için geldiğinizi söyleyin",
        "keywords": [
          "here",
          "passport",
          "vacation",
          "holiday",
          "visiting"
        ],
        "expected": "Here is my passport. I am here for a vacation."
      },
      {
        "bot": "What is the intended duration of your stay and your local address?",
        "tr": "Ülkede ne kadar kalmayı planlıyorsunuz ve nerede konaklayacaksınız?"
      },
      {
        "userHint": "İki hafta kalacağınızı ve şehir merkezindeki bir otelde kalacağınızı söyleyin",
        "keywords": [
          "staying",
          "two",
          "weeks",
          "hotel",
          "city",
          "center"
        ],
        "expected": "I'll be staying for two weeks at a hotel in the city center."
      },
      {
        "bot": "Can you provide proof of return travel and financial stability for this trip?",
        "tr": "Dönüş biletiniz ve konaklamanız için yeterli fonunuz var mı?"
      },
      {
        "userHint": "Dönüş biletinizin dijital kopyasını gösterebileceğinizi söyleyin",
        "keywords": [
          "show",
          "digital",
          "copy",
          "return",
          "ticket",
          "phone"
        ],
        "expected": "Yes, I can show you a digital copy of my return ticket on my phone."
      }
    ]
  },
  {
    "id": "gen_3",
    "c": "social",
    "emoji": "🍴",
    "title": "Paris'da İtalyan Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our İtalyan restaurant in Paris. Do you have a reservation?",
        "tr": "Paris'daki İtalyan restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_4",
    "c": "social",
    "emoji": "🍴",
    "title": "Tokyo'da Çin Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Çin restaurant in Tokyo. Do you have a reservation?",
        "tr": "Tokyo'daki Çin restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_5",
    "c": "social",
    "emoji": "🍴",
    "title": "New York'da Meksika Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Meksika restaurant in New York. Do you have a reservation?",
        "tr": "New York'daki Meksika restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_6",
    "c": "social",
    "emoji": "🍴",
    "title": "London'da Fransız Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Fransız restaurant in London. Do you have a reservation?",
        "tr": "London'daki Fransız restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_7",
    "c": "social",
    "emoji": "🍴",
    "title": "Berlin'da Türk Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Türk restaurant in Berlin. Do you have a reservation?",
        "tr": "Berlin'daki Türk restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_8",
    "c": "social",
    "emoji": "🍴",
    "title": "Rome'da Hint Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Hint restaurant in Rome. Do you have a reservation?",
        "tr": "Rome'daki Hint restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_9",
    "c": "social",
    "emoji": "🍴",
    "title": "Dubai'da Japon Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Japon restaurant in Dubai. Do you have a reservation?",
        "tr": "Dubai'daki Japon restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_10",
    "c": "social",
    "emoji": "🍴",
    "title": "Istanbul'da Yunan Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Yunan restaurant in Istanbul. Do you have a reservation?",
        "tr": "Istanbul'daki Yunan restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_11",
    "c": "social",
    "emoji": "🍴",
    "title": "Barcelona'da Lübnan Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Lübnan restaurant in Barcelona. Do you have a reservation?",
        "tr": "Barcelona'daki Lübnan restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_12",
    "c": "social",
    "emoji": "🍴",
    "title": "Sydney'da Tayland Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Tayland restaurant in Sydney. Do you have a reservation?",
        "tr": "Sydney'daki Tayland restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_13",
    "c": "social",
    "emoji": "🍴",
    "title": "Amsterdam'da Vietnam Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Vietnam restaurant in Amsterdam. Do you have a reservation?",
        "tr": "Amsterdam'daki Vietnam restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_14",
    "c": "social",
    "emoji": "🍴",
    "title": "Vienna'da Kore Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Kore restaurant in Vienna. Do you have a reservation?",
        "tr": "Vienna'daki Kore restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_15",
    "c": "social",
    "emoji": "🍴",
    "title": "Prague'da Brezilya Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Brezilya restaurant in Prague. Do you have a reservation?",
        "tr": "Prague'daki Brezilya restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_16",
    "c": "social",
    "emoji": "🍴",
    "title": "Lisbon'da İspanyol Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our İspanyol restaurant in Lisbon. Do you have a reservation?",
        "tr": "Lisbon'daki İspanyol restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_17",
    "c": "social",
    "emoji": "🍴",
    "title": "Seoul'da Amerikan Restoranı",
    "level": "medium",
    "turns": [
      {
        "bot": "Welcome to our Amerikan restaurant in Seoul. Do you have a reservation?",
        "tr": "Seoul'daki Amerikan restoranımıza hoş geldiniz. Rezervasyonunuz var mı?"
      },
      {
        "userHint": "İki kişilik rezervasyonunuz olduğunu söyleyin",
        "keywords": [
          "reservation",
          "two",
          "people",
          "name",
          "table"
        ],
        "expected": "Yes, I have a reservation for two people under my name."
      },
      {
        "bot": "Perfect, follow me please. Here is the menu. Would you like to start with some drinks?",
        "tr": "Mükemmel, beni takip edin lütfen. İşte menü. İçeceklerle başlamak ister misiniz?"
      },
      {
        "userHint": "Sadece su alacağınızı ve menüyü incelemek için zamana ihtiyacınız olduğunu söyleyin",
        "keywords": [
          "just",
          "water",
          "need",
          "time",
          "menu",
          "look"
        ],
        "expected": "Just water for now, please. We need a moment to look at the menu."
      },
      {
        "bot": "Take your time. Our special today is the chef's signature dish. Shall I come back in five minutes?",
        "tr": "Acele etmeyin. Bugünün özeli şefin imza yemeği. Beş dakika sonra geleyim mi?"
      },
      {
        "userHint": "Evet lütfen, ve bugünün özel yemeğinin ne olduğunu sorun",
        "keywords": [
          "yes",
          "please",
          "what",
          "special",
          "dish",
          "today"
        ],
        "expected": "Yes please, and could you tell us what today's special dish is?"
      },
      {
        "bot": "Today's special is a unique fusion of local and traditional flavors. It's very popular.",
        "tr": "Bugünün özeli yerel ve geleneksel tatların eşsiz bir karışımıdır. Çok popülerdir."
      },
      {
        "userHint": "Kulağa harika geliyor, onu denemek istediğinizi söyleyin",
        "keywords": [
          "sounds",
          "great",
          "try",
          "special",
          "order"
        ],
        "expected": "That sounds great. I'd like to try the special, please."
      }
    ]
  },
  {
    "id": "gen_18",
    "c": "social",
    "emoji": "🛍️",
    "title": "Ayakkabı Alışverişi",
    "level": "easy",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new shoes today?",
        "tr": "Merhaba! Bugün yeni bir ayakkabı mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir ayakkabı aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "shoes",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a shoes, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_19",
    "c": "social",
    "emoji": "🛍️",
    "title": "Telefon Alışverişi",
    "level": "easy",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new phone today?",
        "tr": "Merhaba! Bugün yeni bir telefon mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir telefon aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "phone",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a phone, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_20",
    "c": "social",
    "emoji": "🛍️",
    "title": "Kitap Alışverişi",
    "level": "easy",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new book today?",
        "tr": "Merhaba! Bugün yeni bir kitap mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir kitap aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "book",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a book, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_21",
    "c": "social",
    "emoji": "🛍️",
    "title": "Hediye Alışverişi",
    "level": "easy",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new gift today?",
        "tr": "Merhaba! Bugün yeni bir hediye mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir hediye aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "gift",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a gift, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_22",
    "c": "social",
    "emoji": "🛍️",
    "title": "Elbise Alışverişi",
    "level": "easy",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new dress today?",
        "tr": "Merhaba! Bugün yeni bir elbise mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir elbise aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "dress",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a dress, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_23",
    "c": "social",
    "emoji": "🛍️",
    "title": "Saat Alışverişi",
    "level": "easy",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new watch today?",
        "tr": "Merhaba! Bugün yeni bir saat mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir saat aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "watch",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a watch, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_24",
    "c": "social",
    "emoji": "🛍️",
    "title": "Laptop Alışverişi",
    "level": "medium",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new laptop today?",
        "tr": "Merhaba! Bugün yeni bir laptop mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir laptop aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "laptop",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a laptop, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_25",
    "c": "social",
    "emoji": "🛍️",
    "title": "Kamera Alışverişi",
    "level": "medium",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new camera today?",
        "tr": "Merhaba! Bugün yeni bir kamera mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir kamera aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "camera",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a camera, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_26",
    "c": "social",
    "emoji": "🛍️",
    "title": "Kulaklık Alışverişi",
    "level": "medium",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new headphones today?",
        "tr": "Merhaba! Bugün yeni bir kulaklık mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir kulaklık aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "headphones",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a headphones, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_27",
    "c": "social",
    "emoji": "🛍️",
    "title": "Parfüm Alışverişi",
    "level": "medium",
    "turns": [
      {
        "bot": "Hello! Are you looking for a new perfume today?",
        "tr": "Merhaba! Bugün yeni bir parfüm mı bakıyorsunuz?"
      },
      {
        "userHint": "Evet, bir parfüm aradığımı ama kalitesinden emin olmak istediğimi söyleyin",
        "keywords": [
          "yes",
          "looking",
          "perfume",
          "quality",
          "sure"
        ],
        "expected": "Yes, I'm looking for a perfume, but I want to be sure about the quality."
      },
      {
        "bot": "We only sell top-quality products. We have a two-year warranty on all items. What is your budget?",
        "tr": "Sadece en kaliteli ürünleri satıyoruz. Tüm ürünlerimizde iki yıl garanti var. Bütçeniz nedir?"
      },
      {
        "userHint": "Bütçemin esnek olduğunu ama iyi bir fırsat aradığımı söyleyin",
        "keywords": [
          "budget",
          "flexible",
          "looking",
          "good",
          "deal",
          "value"
        ],
        "expected": "My budget is flexible, but I'm looking for a good deal."
      },
      {
        "bot": "I understand. This model is currently on sale. It's very popular this season.",
        "tr": "Anlıyorum. Bu model şu anda indirimde. Bu sezon çok popüler."
      },
      {
        "userHint": "Fiyatı ne kadar ve başka renkleri var mı?",
        "keywords": [
          "how",
          "much",
          "price",
          "other",
          "colors",
          "available"
        ],
        "expected": "How much is the price, and are there other colors available?"
      },
      {
        "bot": "It's 20% off today. We have it in black, silver, and gold.",
        "tr": "Bugün %20 indirimli. Siyah, gümüş ve altın renkleri mevcut."
      },
      {
        "userHint": "Gümüş olanı denemek istediğinizi söyleyin",
        "keywords": [
          "try",
          "silver",
          "one",
          "please",
          "check"
        ],
        "expected": "I'd like to try the silver one, please."
      }
    ]
  },
  {
    "id": "gen_28",
    "c": "emergency",
    "emoji": "🔥",
    "title": "Yangın Durumu",
    "level": "easy",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Yangın olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "fire",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a fire emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_29",
    "c": "emergency",
    "emoji": "🚨",
    "title": "Kaza Durumu",
    "level": "medium",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Kaza olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "accident",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a accident emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_30",
    "c": "emergency",
    "emoji": "👮",
    "title": "Hırsızlık Durumu",
    "level": "hard",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Hırsızlık olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "robbery",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a robbery emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_31",
    "c": "emergency",
    "emoji": "👦",
    "title": "Kayıp Çocuk Durumu",
    "level": "hard",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Kayıp Çocuk olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "lost",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a lost child emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_32",
    "c": "emergency",
    "emoji": "🌊",
    "title": "Su Baskını Durumu",
    "level": "medium",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Su Baskını olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "flood",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a flood emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_33",
    "c": "emergency",
    "emoji": "🔌",
    "title": "Elektrik Kesintisi Durumu",
    "level": "easy",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Elektrik Kesintisi olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "power",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a power cut emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_34",
    "c": "emergency",
    "emoji": "🚗",
    "title": "Yolda Kalma Durumu",
    "level": "medium",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Yolda Kalma olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "breakdown",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a breakdown emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_35",
    "c": "emergency",
    "emoji": "🚑",
    "title": "Yaralanma Durumu",
    "level": "hard",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Yaralanma olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "injury",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a injury emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_36",
    "c": "emergency",
    "emoji": "👛",
    "title": "Kayıp Cüzdan Durumu",
    "level": "medium",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Kayıp Cüzdan olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "lost",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a lost wallet emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  },
  {
    "id": "gen_37",
    "c": "emergency",
    "emoji": "🧪",
    "title": "Gaz Kaçağı Durumu",
    "level": "hard",
    "turns": [
      {
        "bot": "Emergency services. Please state the nature of your emergency.",
        "tr": "Acil servisler. Lütfen acil durumunuzun niteliğini belirtin."
      },
      {
        "userHint": "Gaz Kaçağı olduğunu ve yardım istediğinizi söyleyin",
        "keywords": [
          "gas",
          "emergency",
          "help",
          "now",
          "need"
        ],
        "expected": "I have a gas leak emergency and I need help immediately."
      },
      {
        "bot": "I understand. What is your exact location so we can send help?",
        "tr": "Anlıyorum. Yardım gönderebilmemiz için tam konumunuz nedir?"
      },
      {
        "userHint": "Konumunuzu ve etraftaki belirgin bir yeri söyleyin",
        "keywords": [
          "location",
          "near",
          "address",
          "street",
          "here"
        ],
        "expected": "I'm at the main square, near the big fountain."
      },
      {
        "bot": "Help is on the way. Are you in a safe place right now?",
        "tr": "Yardım yolda. Şu an güvenli bir yerde misiniz?"
      },
      {
        "userHint": "Güvende olduğunuzu ama çok endişeli olduğunuzu söyleyin",
        "keywords": [
          "safe",
          "scared",
          "worried",
          "waiting",
          "anxious"
        ],
        "expected": "I'm safe for now, but I'm very anxious and waiting for you."
      }
    ]
  }
];
