// Diversified AI Conversations
const CONVERSATIONS = [
  {
    "id": "scen_1",
    "c": "travel",
    "emoji": "🏨",
    "title": "Lüks Otelde Şikayet",
    "level": "hard",
    "turns": [
      {
        "bot": "I'm very sorry to hear that, sir. What exactly is the problem with your suite?",
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
        "bot": "That is unacceptable. I will send a technician right away or move you to another room. Which would you prefer?",
        "tr": "Bu kabul edilemez. Hemen bir teknisyen göndereceğim ya da sizi başka bir odaya alacağım. Hangisini tercih edersiniz?"
      },
      {
        "userHint": "Oda değiştirmek istediğinizi söyleyin",
        "keywords": [
          "prefer",
          "change",
          "move",
          "another",
          "room"
        ],
        "expected": "I would prefer to move to another room, please."
      }
    ]
  },
  {
    "id": "scen_2",
    "c": "travel",
    "emoji": "🚉",
    "title": "Tren İstasyonunda Kayıp Eşya",
    "level": "medium",
    "turns": [
      {
        "bot": "Lost and found office. How can I help you?",
        "tr": "Kayıp eşya ofisi. Size nasıl yardımcı olabilirim?"
      },
      {
        "userHint": "Sırt çantanızı trende unuttuğunuzu söyleyin",
        "keywords": [
          "forgot",
          "left",
          "backpack",
          "bag",
          "train"
        ],
        "expected": "I think I left my backpack on the train."
      },
      {
        "bot": "Can you describe the bag and tell me which train you were on?",
        "tr": "Çantayı tarif edebilir misiniz ve hangi trende olduğunuzu söyleyebilir misiniz?"
      },
      {
        "userHint": "Mavi bir çanta olduğunu ve 10:15 treni olduğunu söyleyin",
        "keywords": [
          "blue",
          "bag",
          "10:15",
          "ten",
          "fifteen",
          "train"
        ],
        "expected": "It's a blue bag and I was on the 10:15 train."
      }
    ]
  },
  {
    "id": "scen_3",
    "c": "business",
    "emoji": "📊",
    "title": "Maaş Pazarlığı",
    "level": "hard",
    "turns": [
      {
        "bot": "We are very happy with your performance, but your salary request is a bit high for this role.",
        "tr": "Performansınızdan çok memnunuz ancak maaş talebiniz bu rol için biraz yüksek."
      },
      {
        "userHint": "Piyasa değerinizi ve başarılarınızı hatırlatın",
        "keywords": [
          "market",
          "value",
          "achievements",
          "skills",
          "deserve"
        ],
        "expected": "Based on my achievements and market value, I believe I deserve this amount."
      },
      {
        "bot": "I see. If we can't meet that number, would you consider extra vacation days instead?",
        "tr": "Anlıyorum. Eğer bu rakamı karşılayamazsak, yerine ekstra tatil günlerini düşünür müsünüz?"
      },
      {
        "userHint": "Düşünebileceğinizi ama maaşın öncelikli olduğunu söyleyin",
        "keywords": [
          "think",
          "consider",
          "salary",
          "priority",
          "main"
        ],
        "expected": "I can consider it, but the salary is my main priority."
      }
    ]
  },
  {
    "id": "scen_4",
    "c": "emergency",
    "emoji": "🔥",
    "title": "Yangın İhbarı",
    "level": "easy",
    "turns": [
      {
        "bot": "Emergency services. What is the location of the fire?",
        "tr": "Acil servisler. Yangının konumu nedir?"
      },
      {
        "userHint": "Mutfakta yangın çıktığını ve adresinizi söyleyin",
        "keywords": [
          "fire",
          "kitchen",
          "address",
          "is",
          "help"
        ],
        "expected": "There is a fire in my kitchen! My address is 5th Avenue."
      },
      {
        "bot": "Are there any people trapped inside the building?",
        "tr": "Binanın içinde mahsur kalan kimse var mı?"
      },
      {
        "userHint": "Herkesin dışarıda olduğunu söyleyin",
        "keywords": [
          "everyone",
          "outside",
          "safe",
          "nobody",
          "inside"
        ],
        "expected": "No, everyone is outside and safe."
      }
    ]
  },
  {
    "id": "scen_5",
    "c": "social",
    "emoji": "🎉",
    "title": "Parti Davetini Reddetme",
    "level": "medium",
    "turns": [
      {
        "bot": "Hey! We are having a big party this Friday. You're coming, right?",
        "tr": "Hey! Bu Cuma büyük bir parti veriyoruz. Geliyorsun, değil mi?"
      },
      {
        "userHint": "Gelemediğiniz için üzgün olduğunuzu ve planınız olduğunu söyleyin",
        "keywords": [
          "sorry",
          "cannot",
          "come",
          "plans",
          "already"
        ],
        "expected": "I'm sorry, I can't come. I already have plans."
      },
      {
        "bot": "Oh, that's a shame! What are you doing instead?",
        "tr": "Ah, ne yazık! Yerine ne yapıyorsun?"
      },
      {
        "userHint": "Bir arkadaşınızın doğum günü olduğunu söyleyin",
        "keywords": [
          "friend",
          "birthday",
          "going",
          "celebrate"
        ],
        "expected": "It is my best friend's birthday."
      }
    ]
  },
  {
    "id": "scen_6",
    "c": "tech",
    "emoji": "🔧",
    "title": "Bilgisayar Tamiri",
    "level": "medium",
    "turns": [
      {
        "bot": "Technical support. What seems to be the problem with your laptop?",
        "tr": "Teknik destek. Laptopunuzdaki sorun nedir?"
      },
      {
        "userHint": "Ekranın açılmadığını söyleyin",
        "keywords": [
          "screen",
          "black",
          "turning",
          "on",
          "won't"
        ],
        "expected": "The screen is black and it won't turn on."
      },
      {
        "bot": "Did you try connecting the charger to see if it's a battery issue?",
        "tr": "Batarya sorunu olup olmadığını anlamak için şarj aletini bağlamayı denediniz mi?"
      },
      {
        "userHint": "Denediğinizi ama hala çalışmadığını söyleyin",
        "keywords": [
          "tried",
          "still",
          "working",
          "charger",
          "plugged"
        ],
        "expected": "Yes, I tried that, but it is still not working."
      }
    ]
  },
  {
    "id": "scen_7",
    "c": "academic",
    "emoji": "📝",
    "title": "Ödev Erteleme İsteği",
    "level": "hard",
    "turns": [
      {
        "bot": "Professor, I wanted to ask if I can have an extension on my essay.",
        "tr": "Profesör, ödevim için ek süre alıp alamayacağımı sormak istemiştim."
      },
      {
        "userHint": "Neden ek süre istediğinizi açıklayın (hastalık)",
        "keywords": [
          "extension",
          "essay",
          "sick",
          "ill",
          "deadline"
        ],
        "expected": "Could I have an extension because I've been very sick lately?"
      },
      {
        "bot": "I usually don't allow that. Do you have a doctor's note?",
        "tr": "Normalde buna izin vermem. Doktor raporunuz var mı?"
      },
      {
        "userHint": "Evet, raporum yanımda deyin",
        "keywords": [
          "yes",
          "have",
          "note",
          "doctor",
          "with",
          "me"
        ],
        "expected": "Yes, I have the doctor's note right here."
      }
    ]
  },
  {
    "id": "gen_8",
    "title": "Müze Gezisi - Varyasyon 1",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_9",
    "title": "Spor Salonu Kaydı - Varyasyon 1",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_10",
    "title": "Kütüphane Üyeliği - Varyasyon 1",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_11",
    "title": "Araba Kiralama - Varyasyon 1",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_12",
    "title": "İş Toplantısı - Varyasyon 1",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_13",
    "title": "Doktor Randevusu - Varyasyon 1",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_14",
    "title": "Market Alışverişi - Varyasyon 1",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_15",
    "title": "Sinema Bileti - Varyasyon 1",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_16",
    "title": "İşten Ayrılma - Varyasyon 1",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_17",
    "title": "Yeni Bir Şehir - Varyasyon 1",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_18",
    "title": "Müze Gezisi - Varyasyon 2",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_19",
    "title": "Spor Salonu Kaydı - Varyasyon 2",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_20",
    "title": "Kütüphane Üyeliği - Varyasyon 2",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_21",
    "title": "Araba Kiralama - Varyasyon 2",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_22",
    "title": "İş Toplantısı - Varyasyon 2",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_23",
    "title": "Doktor Randevusu - Varyasyon 2",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_24",
    "title": "Market Alışverişi - Varyasyon 2",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_25",
    "title": "Sinema Bileti - Varyasyon 2",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_26",
    "title": "İşten Ayrılma - Varyasyon 2",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_27",
    "title": "Yeni Bir Şehir - Varyasyon 2",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_28",
    "title": "Müze Gezisi - Varyasyon 3",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_29",
    "title": "Spor Salonu Kaydı - Varyasyon 3",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_30",
    "title": "Kütüphane Üyeliği - Varyasyon 3",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_31",
    "title": "Araba Kiralama - Varyasyon 3",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_32",
    "title": "İş Toplantısı - Varyasyon 3",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_33",
    "title": "Doktor Randevusu - Varyasyon 3",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_34",
    "title": "Market Alışverişi - Varyasyon 3",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_35",
    "title": "Sinema Bileti - Varyasyon 3",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_36",
    "title": "İşten Ayrılma - Varyasyon 3",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_37",
    "title": "Yeni Bir Şehir - Varyasyon 3",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_38",
    "title": "Müze Gezisi - Varyasyon 4",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_39",
    "title": "Spor Salonu Kaydı - Varyasyon 4",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_40",
    "title": "Kütüphane Üyeliği - Varyasyon 4",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_41",
    "title": "Araba Kiralama - Varyasyon 4",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_42",
    "title": "İş Toplantısı - Varyasyon 4",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_43",
    "title": "Doktor Randevusu - Varyasyon 4",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_44",
    "title": "Market Alışverişi - Varyasyon 4",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_45",
    "title": "Sinema Bileti - Varyasyon 4",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_46",
    "title": "İşten Ayrılma - Varyasyon 4",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_47",
    "title": "Yeni Bir Şehir - Varyasyon 4",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_48",
    "title": "Müze Gezisi - Varyasyon 5",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_49",
    "title": "Spor Salonu Kaydı - Varyasyon 5",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_50",
    "title": "Kütüphane Üyeliği - Varyasyon 5",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_51",
    "title": "Araba Kiralama - Varyasyon 5",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_52",
    "title": "İş Toplantısı - Varyasyon 5",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_53",
    "title": "Doktor Randevusu - Varyasyon 5",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_54",
    "title": "Market Alışverişi - Varyasyon 5",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_55",
    "title": "Sinema Bileti - Varyasyon 5",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_56",
    "title": "İşten Ayrılma - Varyasyon 5",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_57",
    "title": "Yeni Bir Şehir - Varyasyon 5",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_58",
    "title": "Müze Gezisi - Varyasyon 6",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_59",
    "title": "Spor Salonu Kaydı - Varyasyon 6",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_60",
    "title": "Kütüphane Üyeliği - Varyasyon 6",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_61",
    "title": "Araba Kiralama - Varyasyon 6",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_62",
    "title": "İş Toplantısı - Varyasyon 6",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_63",
    "title": "Doktor Randevusu - Varyasyon 6",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_64",
    "title": "Market Alışverişi - Varyasyon 6",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_65",
    "title": "Sinema Bileti - Varyasyon 6",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_66",
    "title": "İşten Ayrılma - Varyasyon 6",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_67",
    "title": "Yeni Bir Şehir - Varyasyon 6",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_68",
    "title": "Müze Gezisi - Varyasyon 7",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_69",
    "title": "Spor Salonu Kaydı - Varyasyon 7",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_70",
    "title": "Kütüphane Üyeliği - Varyasyon 7",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_71",
    "title": "Araba Kiralama - Varyasyon 7",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_72",
    "title": "İş Toplantısı - Varyasyon 7",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_73",
    "title": "Doktor Randevusu - Varyasyon 7",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_74",
    "title": "Market Alışverişi - Varyasyon 7",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_75",
    "title": "Sinema Bileti - Varyasyon 7",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_76",
    "title": "İşten Ayrılma - Varyasyon 7",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_77",
    "title": "Yeni Bir Şehir - Varyasyon 7",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_78",
    "title": "Müze Gezisi - Varyasyon 8",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_79",
    "title": "Spor Salonu Kaydı - Varyasyon 8",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_80",
    "title": "Kütüphane Üyeliği - Varyasyon 8",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_81",
    "title": "Araba Kiralama - Varyasyon 8",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_82",
    "title": "İş Toplantısı - Varyasyon 8",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_83",
    "title": "Doktor Randevusu - Varyasyon 8",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_84",
    "title": "Market Alışverişi - Varyasyon 8",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_85",
    "title": "Sinema Bileti - Varyasyon 8",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_86",
    "title": "İşten Ayrılma - Varyasyon 8",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_87",
    "title": "Yeni Bir Şehir - Varyasyon 8",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_88",
    "title": "Müze Gezisi - Varyasyon 9",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_89",
    "title": "Spor Salonu Kaydı - Varyasyon 9",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_90",
    "title": "Kütüphane Üyeliği - Varyasyon 9",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_91",
    "title": "Araba Kiralama - Varyasyon 9",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_92",
    "title": "İş Toplantısı - Varyasyon 9",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_93",
    "title": "Doktor Randevusu - Varyasyon 9",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_94",
    "title": "Market Alışverişi - Varyasyon 9",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_95",
    "title": "Sinema Bileti - Varyasyon 9",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_96",
    "title": "İşten Ayrılma - Varyasyon 9",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_97",
    "title": "Yeni Bir Şehir - Varyasyon 9",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_98",
    "title": "Müze Gezisi - Varyasyon 10",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_99",
    "title": "Spor Salonu Kaydı - Varyasyon 10",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_100",
    "title": "Kütüphane Üyeliği - Varyasyon 10",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_101",
    "title": "Araba Kiralama - Varyasyon 10",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_102",
    "title": "İş Toplantısı - Varyasyon 10",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_103",
    "title": "Doktor Randevusu - Varyasyon 10",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_104",
    "title": "Market Alışverişi - Varyasyon 10",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_105",
    "title": "Sinema Bileti - Varyasyon 10",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_106",
    "title": "İşten Ayrılma - Varyasyon 10",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_107",
    "title": "Yeni Bir Şehir - Varyasyon 10",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_108",
    "title": "Müze Gezisi - Varyasyon 11",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_109",
    "title": "Spor Salonu Kaydı - Varyasyon 11",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_110",
    "title": "Kütüphane Üyeliği - Varyasyon 11",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_111",
    "title": "Araba Kiralama - Varyasyon 11",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_112",
    "title": "İş Toplantısı - Varyasyon 11",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_113",
    "title": "Doktor Randevusu - Varyasyon 11",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_114",
    "title": "Market Alışverişi - Varyasyon 11",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_115",
    "title": "Sinema Bileti - Varyasyon 11",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_116",
    "title": "İşten Ayrılma - Varyasyon 11",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_117",
    "title": "Yeni Bir Şehir - Varyasyon 11",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_118",
    "title": "Müze Gezisi - Varyasyon 12",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_119",
    "title": "Spor Salonu Kaydı - Varyasyon 12",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_120",
    "title": "Kütüphane Üyeliği - Varyasyon 12",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_121",
    "title": "Araba Kiralama - Varyasyon 12",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_122",
    "title": "İş Toplantısı - Varyasyon 12",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_123",
    "title": "Doktor Randevusu - Varyasyon 12",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_124",
    "title": "Market Alışverişi - Varyasyon 12",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_125",
    "title": "Sinema Bileti - Varyasyon 12",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_126",
    "title": "İşten Ayrılma - Varyasyon 12",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_127",
    "title": "Yeni Bir Şehir - Varyasyon 12",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_128",
    "title": "Müze Gezisi - Varyasyon 13",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_129",
    "title": "Spor Salonu Kaydı - Varyasyon 13",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_130",
    "title": "Kütüphane Üyeliği - Varyasyon 13",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_131",
    "title": "Araba Kiralama - Varyasyon 13",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_132",
    "title": "İş Toplantısı - Varyasyon 13",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_133",
    "title": "Doktor Randevusu - Varyasyon 13",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_134",
    "title": "Market Alışverişi - Varyasyon 13",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_135",
    "title": "Sinema Bileti - Varyasyon 13",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_136",
    "title": "İşten Ayrılma - Varyasyon 13",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_137",
    "title": "Yeni Bir Şehir - Varyasyon 13",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_138",
    "title": "Müze Gezisi - Varyasyon 14",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_139",
    "title": "Spor Salonu Kaydı - Varyasyon 14",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_140",
    "title": "Kütüphane Üyeliği - Varyasyon 14",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_141",
    "title": "Araba Kiralama - Varyasyon 14",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_142",
    "title": "İş Toplantısı - Varyasyon 14",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_143",
    "title": "Doktor Randevusu - Varyasyon 14",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_144",
    "title": "Market Alışverişi - Varyasyon 14",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_145",
    "title": "Sinema Bileti - Varyasyon 14",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_146",
    "title": "İşten Ayrılma - Varyasyon 14",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_147",
    "title": "Yeni Bir Şehir - Varyasyon 14",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_148",
    "title": "Müze Gezisi - Varyasyon 15",
    "emoji": "🏛️",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the museum?",
        "tr": "Hoş geldiniz! museum konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the museum, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_149",
    "title": "Spor Salonu Kaydı - Varyasyon 15",
    "emoji": "🏋️",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the gym?",
        "tr": "Hoş geldiniz! gym konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the gym, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_150",
    "title": "Kütüphane Üyeliği - Varyasyon 15",
    "emoji": "📚",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the library?",
        "tr": "Hoş geldiniz! library konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the library, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_151",
    "title": "Araba Kiralama - Varyasyon 15",
    "emoji": "🚗",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the car?",
        "tr": "Hoş geldiniz! car konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the car, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_152",
    "title": "İş Toplantısı - Varyasyon 15",
    "emoji": "💼",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the meeting?",
        "tr": "Hoş geldiniz! meeting konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the meeting, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_153",
    "title": "Doktor Randevusu - Varyasyon 15",
    "emoji": "🩺",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the doctor?",
        "tr": "Hoş geldiniz! doctor konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the doctor, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_154",
    "title": "Market Alışverişi - Varyasyon 15",
    "emoji": "🛒",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the market?",
        "tr": "Hoş geldiniz! market konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the market, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_155",
    "title": "Sinema Bileti - Varyasyon 15",
    "emoji": "🎬",
    "level": "easy",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the cinema?",
        "tr": "Hoş geldiniz! cinema konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the cinema, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_156",
    "title": "İşten Ayrılma - Varyasyon 15",
    "emoji": "🚪",
    "level": "hard",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the quit?",
        "tr": "Hoş geldiniz! quit konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the quit, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "gen_157",
    "title": "Yeni Bir Şehir - Varyasyon 15",
    "emoji": "🌆",
    "level": "medium",
    "turns": [
      {
        "role": "bot",
        "text": "Welcome! How can I help you with the city?",
        "tr": "Hoş geldiniz! city konusunda size nasıl yardımcı olabilirim?"
      },
      {
        "role": "user",
        "hint": "Yardım isteyin",
        "keywords": [
          "help",
          "need",
          "want",
          "please"
        ],
        "expected": "I need some help with the city, please."
      },
      {
        "role": "bot",
        "text": "Of course. What are the details?",
        "tr": "Tabii ki. Detaylar nedir?"
      },
      {
        "role": "user",
        "hint": "Bir detay verin",
        "keywords": [
          "detail",
          "info",
          "about"
        ],
        "expected": "I want to know more about the prices."
      },
      {
        "role": "bot",
        "text": "I can help with that. Anything else?",
        "tr": "Bu konuda yardımcı olabilirim. Başka bir şey var mı?"
      },
      {
        "role": "user",
        "hint": "Teşekkür edin",
        "keywords": [
          "no",
          "thanks",
          "all"
        ],
        "expected": "No, that is all for now. Thank you."
      }
    ]
  },
  {
    "id": "scen_space",
    "title": "Mars'ta İlk Gün",
    "emoji": "🚀",
    "level": "hard",
    "turns": [
      {
        "bot": "Commander, we have landed on Mars. What is our first mission?",
        "tr": "Komutanım, Mars'a iniş yaptık. İlk görevimiz nedir?"
      },
      {
        "userHint": "Su kaynağı aramamız gerektiğini söyleyin",
        "keywords": [
          "search",
          "water",
          "source",
          "find",
          "first"
        ],
        "expected": "Our first mission is to search for a water source."
      },
      {
        "bot": "Oxygen levels are at 80%. Should we deploy the robots?",
        "tr": "Oksijen seviyeleri %80'de. Robotları konuşlandıralım mı?"
      },
      {
        "userHint": "Evet, hemen başlayın deyin",
        "keywords": [
          "yes",
          "deploy",
          "start",
          "now",
          "robots"
        ],
        "expected": "Yes, deploy the robots and start now."
      }
    ]
  }
];
