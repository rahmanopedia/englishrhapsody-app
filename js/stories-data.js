/**
 * English Rhapsody - Reading Workshop Stories Data (Batch 2/100)
 * 
 * Bu veri seti 1000 hikaye hedefinin ilk 100'lük dilimini devam ettirir.
 * Format: Bağlam-odaklı, derin analizli, öğretmen titizliğinde.
 */

const STORIES = [
  {
    id: "s_001",
    title: "Morning Routine",
    level: "Kolay",
    text: "Tom wakes up at seven o'clock. He has breakfast with his family and then goes to school.",
    annotations: [
      {
        start_index: 4, end_index: 12, surface_form: "wakes up",
        lemma: "wake up", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "uyanır",
        short_explanation_tr: "Uykudan uyanmak anlamında kullanılan birleşik fiil.",
        example_sentence_en: "I usually wake up early.", example_sentence_tr: "Genelde erken uyanırım."
      },
      {
        start_index: 31, end_index: 44, surface_form: "has breakfast",
        lemma: "have breakfast", pos: "VERB", annotation_type: "collocation",
        contextual_turkish_meaning: "kahvaltı yapar",
        short_explanation_tr: "Sabah yemeği yemek. 'Have' fiili burada 'yemek/yapmak' anlamındadır.",
        example_sentence_en: "What time do you have breakfast?", example_sentence_tr: "Saat kaçta kahvaltı yaparsın?"
      },
      {
        start_index: 73, end_index: 77, surface_form: "goes",
        lemma: "go", pos: "VERB", annotation_type: "word",
        contextual_turkish_meaning: "gider",
        short_explanation_tr: "'Go' fiilinin geniş zaman (He/She/It) çekimi.",
        example_sentence_en: "He goes to the gym every day.", example_sentence_tr: "O her gün spor salonuna gider."
      }
    ]
  },
  {
    id: "s_002",
    title: "The New Teacher",
    level: "Orta",
    text: "The teacher who joined our school yesterday is very smart. She grew up in London.",
    annotations: [
      {
        start_index: 0, end_index: 46, surface_form: "The teacher who joined our school yesterday",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "okulumuza dün katılan öğretmen",
        short_explanation_tr: "Öğretmeni tanımlayan sıfat cümleciği. 'Who' yapısı ismi niteler.",
        example_sentence_en: "The man who is talking is my uncle.", example_sentence_tr: "Konuşan adam benim amcam."
      },
      {
        start_index: 63, end_index: 71, surface_form: "grew up",
        lemma: "grow up", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "büyüdü",
        short_explanation_tr: "Bir yerde çocukluğunu geçirmek, yetişmek.",
        example_sentence_en: "I grew up in a small village.", example_sentence_tr: "Küçük bir köyde büyüdüm."
      }
    ]
  },
  {
    id: "s_003",
    title: "Space Exploration",
    level: "İleri",
    text: "Mars is being explored by robots. Scientists have been looking for water for decades.",
    annotations: [
      {
        start_index: 8, end_index: 25, surface_form: "is being explored",
        lemma: "explore", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "keşfediliyor",
        short_explanation_tr: "Şimdiki zaman edilgen yapı. Eylemin şu an yapıldığını vurgular.",
        example_sentence_en: "The ocean is being explored.", example_sentence_tr: "Okyanus keşfediliyor."
      },
      {
        start_index: 48, end_index: 64, surface_form: "have been looking",
        lemma: "look", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "arayıp duruyorlar",
        short_explanation_tr: "Eylemin geçmişten başlayıp hala devam ettiğini gösteren yapı.",
        example_sentence_en: "They have been living here since 1990.", example_sentence_tr: "1990'dan beri burada yaşıyorlar."
      },
      {
        start_index: 73, end_index: 84, surface_form: "for decades",
        lemma: "decade", pos: "NOUN", annotation_type: "collocation",
        contextual_turkish_meaning: "onlarca yıldır",
        short_explanation_tr: "Uzun bir zaman dilimini (on yıllar) ifade eden kalıp.",
        example_sentence_en: "I haven't seen him for decades.", example_sentence_tr: "Onu onlarca yıldır görmedim."
      }
    ]
  },
  {
    id: "s_004",
    title: "The Secret Message",
    level: "Kolay",
    text: "Alice picked the phone up. She heard a voice that whispered her name.",
    annotations: [
      {
        start_index: 6, end_index: 25, surface_form: "picked the phone up",
        lemma: "pick up", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "telefonu açtı/kaldırdı",
        short_explanation_tr: "Araya nesne girmiş ayrılabilir phrasal verb örneği.",
        spans: [{start: 6, end: 12}, {start: 23, end: 25}],
        example_sentence_en: "Pick up the trash.", example_sentence_tr: "Çöpü yerden kaldır."
      },
      {
        start_index: 37, end_index: 68, surface_form: "a voice that whispered her name",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "adını fısıldayan bir ses",
        short_explanation_tr: "Sesi tanımlayan sıfat cümleciği.",
        example_sentence_en: "I saw a car that was blue.", example_sentence_tr: "Mavi bir araba gördüm."
      }
    ]
  },
  {
    id: "s_005",
    title: "Business Trip",
    level: "Orta",
    text: "The manager has to put off the meeting. He is too busy to attend it today.",
    annotations: [
      {
        start_index: 12, end_index: 21, surface_form: "has to",
        lemma: "have to", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "zorunda",
        short_explanation_tr: "Zorunluluk bildiren yardımcı yapı.",
        example_sentence_en: "I have to go now.", example_sentence_tr: "Şimdi gitmem gerekiyor."
      },
      {
        start_index: 22, end_index: 29, surface_form: "put off",
        lemma: "put off", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "ertelemek",
        short_explanation_tr: "Bir işi daha sonraki bir zamana bırakmak.",
        example_sentence_en: "Don't put off your homework.", example_sentence_tr: "Ödevini erteleme."
      },
      {
        start_index: 43, end_index: 54, surface_form: "too busy to",
        lemma: "busy", pos: "ADJ", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "katılamayacak kadar meşgul",
        short_explanation_tr: "Bir şeyi yapamayacak kadar (aşırı) anlamı katar.",
        example_sentence_en: "The soup is too hot to eat.", example_sentence_tr: "Çorba içilemeyecek kadar sıcak."
      }
    ]
  },
  {
    id: "s_006",
    title: "Climate Change",
    level: "İleri",
    text: "Unless we take action, the situation will get worse. We must cut down on pollution.",
    annotations: [
      {
        start_index: 0, end_index: 20, surface_form: "Unless we take action",
        lemma: null, pos: "CLAUSE", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "Eğer harekete geçmezsek",
        short_explanation_tr: "'Unless', 'if not' (eğer olmazsa) anlamında bir koşul bağlacıdır.",
        example_sentence_en: "Unless you study, you will fail.", example_sentence_tr: "Çalışmazsan kalırsın."
      },
      {
        start_index: 42, end_index: 51, surface_form: "get worse",
        lemma: "get worse", pos: "VERB", annotation_type: "idiom",
        contextual_turkish_meaning: "kötüleşmek",
        short_explanation_tr: "Bir durumun daha kötü bir hale gelmesi.",
        example_sentence_en: "The weather is getting worse.", example_sentence_tr: "Hava kötüleşiyor."
      },
      {
        start_index: 61, end_index: 72, surface_form: "cut down on",
        lemma: "cut down on", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "azaltmak",
        short_explanation_tr: "Tüketimi veya miktarı düşürmek.",
        example_sentence_en: "You should cut down on sugar.", example_sentence_tr: "Şekeri azaltmalısın."
      }
    ]
  },
  {
    id: "s_007",
    title: "At the Airport",
    level: "Kolay",
    text: "The plane took off on time. Sam was sitting next to the window.",
    annotations: [
      {
        start_index: 10, end_index: 18, surface_form: "took off",
        lemma: "take off", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "havalandı",
        short_explanation_tr: "Uçağın yerden yükselmesi.",
        example_sentence_en: "The flight takes off at 9 AM.", example_sentence_tr: "Uçuş saat 9'da kalkıyor."
      },
      {
        start_index: 19, end_index: 26, surface_form: "on time",
        lemma: "on time", pos: "ADV", annotation_type: "idiom",
        contextual_turkish_meaning: "vaktinde",
        short_explanation_tr: "Tam zamanında, geç kalmadan.",
        example_sentence_en: "Please arrive on time.", example_sentence_tr: "Lütfen vaktinde gelin."
      },
      {
        start_index: 32, end_index: 43, surface_form: "was sitting",
        lemma: "sit", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "oturuyordu",
        short_explanation_tr: "Geçmiş zaman çekimi (Past Continuous).",
        example_sentence_en: "She was sitting on the grass.", example_sentence_tr: "Çimenlerin üzerinde oturuyordu."
      }
    ]
  },
  {
    id: "s_008",
    title: "Job Interview",
    level: "Orta",
    text: "I am looking forward to working with you. Please fill out this form.",
    annotations: [
      {
        start_index: 5, end_index: 23, surface_form: "looking forward to",
        lemma: "look forward to", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "dört gözle beklemek",
        short_explanation_tr: "Bir şeyi heyecanla beklemek.",
        example_sentence_en: "I look forward to your reply.", example_sentence_tr: "Cevabınızı heyecanla bekliyorum."
      },
      {
        start_index: 50, end_index: 58, surface_form: "fill out",
        lemma: "fill out", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "doldurmak",
        short_explanation_tr: "Bir belge veya formu tamamlamak.",
        example_sentence_en: "Fill out the application form.", example_sentence_tr: "Başvuru formunu doldurun."
      }
    ]
  },
  {
    id: "s_009",
    title: "The Old Library",
    level: "İleri",
    text: "The library, which was built in 1920, contains many rare books.",
    annotations: [
      {
        start_index: 13, end_index: 36, surface_form: "which was built in 1920",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "1920'de inşa edilen",
        short_explanation_tr: "Kütüphane hakkında ek bilgi veren tanımlayıcı olmayan sıfat cümleciği.",
        example_sentence_en: "My car, which is old, still works.", example_sentence_tr: "Eski olan arabam hala çalışıyor."
      },
      {
        start_index: 53, end_index: 63, surface_form: "rare books",
        lemma: "rare book", pos: "NOUN", annotation_type: "noun_phrase",
        contextual_turkish_meaning: "nadir kitaplar",
        short_explanation_tr: "Bulunması güç, kıymetli eserler.",
        example_sentence_en: "He collects rare books.", example_sentence_tr: "Nadir kitaplar biriktiriyor."
      }
    ]
  },
  {
    id: "s_010",
    title: "Hiking Adventure",
    level: "Orta",
    text: "They ran into a bear while they were hiking. They had to keep calm.",
    annotations: [
      {
        start_index: 5, end_index: 13, surface_form: "ran into",
        lemma: "run into", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "rastladılar / karşılaştılar",
        short_explanation_tr: "Beklenmedik bir şekilde karşılaşmak.",
        example_sentence_en: "I ran into an old friend.", example_sentence_tr: "Eski bir arkadaşıma rastladım."
      },
      {
        start_index: 54, end_index: 63, surface_form: "keep calm",
        lemma: "keep calm", pos: "VERB", annotation_type: "idiom",
        contextual_turkish_meaning: "sakin kalmak",
        short_explanation_tr: "Heyecanlanmadan soğukkanlılığını korumak.",
        example_sentence_en: "Keep calm and carry on.", example_sentence_tr: "Sakin ol ve devam et."
      }
    ]
  },
  {
    id: "s_011",
    title: "Lost at Sea",
    level: "İleri",
    text: "If they hadn't seen the lighthouse, they would have been lost. The ship was being pushed by the waves.",
    annotations: [
      {
        start_index: 0, end_index: 61, surface_form: "If they hadn't seen the lighthouse, they would have been lost",
        lemma: null, pos: "CLAUSE", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "Deniz fenerini görmeselerdi, kaybolmuş olacaklardı",
        short_explanation_tr: "Type 3 Conditional (Koşul Yapısı). Geçmişte gerçekleşmemiş bir varsayımı anlatır.",
        example_sentence_en: "If I had studied, I would have passed.", example_sentence_tr: "Çalışsaydım, geçerdim."
      },
      {
        start_index: 72, end_index: 89, surface_form: "was being pushed",
        lemma: "push", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "itiliyordu",
        short_explanation_tr: "Past Continuous Passive (Geçmiş Zaman Sürekli Edilgen) yapı.",
        example_sentence_en: "The car was being repaired.", example_sentence_tr: "Araba tamir ediliyordu."
      }
    ]
  },
  {
    id: "s_012",
    title: "The Cooking Class",
    level: "Kolay",
    text: "Sarah is learning how to cook. She wants to make a delicious meal for her parents.",
    annotations: [
      {
        start_index: 9, end_index: 29, surface_form: "learning how to cook",
        lemma: "learn", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "nasıl yemek pişirileceğini öğreniyor",
        short_explanation_tr: "Bir beceriyi nasıl yapacağını öğrenme yapısı.",
        example_sentence_en: "He is learning how to swim.", example_sentence_tr: "Yüzmeyi öğreniyor."
      },
      {
        start_index: 44, end_index: 65, surface_form: "make a delicious meal",
        lemma: "meal", pos: "NOUN", annotation_type: "noun_phrase",
        contextual_turkish_meaning: "lezzetli bir yemek yapmak",
        short_explanation_tr: "Sıfat ve isimden oluşan anlamlı bir grup.",
        example_sentence_en: "I want to eat a delicious meal.", example_sentence_tr: "Lezzetli bir yemek yemek istiyorum."
      }
    ]
  },
  {
    id: "s_013",
    title: "Unexpected News",
    level: "Orta",
    text: "They had to call the party off because of the rain. Everyone was disappointed.",
    annotations: [
      {
        start_index: 12, end_index: 30, surface_form: "call the party off",
        lemma: "call off", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "partiyi iptal etmek",
        short_explanation_tr: "Araya nesne girmiş ayrılabilir phrasal verb örneği. 'Call off' iptal etmek demektir.",
        spans: [{start: 12, end: 16}, {start: 27, end: 30}],
        example_sentence_en: "Call off the search.", example_sentence_tr: "Aramayı durdurun."
      },
      {
        start_index: 31, end_index: 50, surface_form: "because of the rain",
        lemma: "because of", pos: "PREP", annotation_type: "prepositional_phrase",
        contextual_turkish_meaning: "yağmur yüzünden",
        short_explanation_tr: "Bir neden belirten edat grubu.",
        example_sentence_en: "I stayed home because of the snow.", example_sentence_tr: "Kar yüzünden evde kaldım."
      }
    ]
  },
  {
    id: "s_014",
    title: "A Day in the City",
    level: "Kolay",
    text: "They enjoyed walking around the city. They went shopping in the afternoon.",
    annotations: [
      {
        start_index: 13, end_index: 27, surface_form: "walking around",
        lemma: "walk around", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "etrafta yürümek / gezmek",
        short_explanation_tr: "Belirli bir hedef olmadan dolaşmak.",
        example_sentence_en: "We walked around the park.", example_sentence_tr: "Parkta dolaştık."
      },
      {
        start_index: 43, end_index: 56, surface_form: "went shopping",
        lemma: "go shopping", pos: "VERB", annotation_type: "collocation",
        contextual_turkish_meaning: "alışverişe gitti",
        short_explanation_tr: "Alışveriş yapmak eylemi.",
        example_sentence_en: "Let's go shopping tomorrow.", example_sentence_tr: "Yarın alışverişe gidelim."
      }
    ]
  },
  {
    id: "s_015",
    title: "Global Warming",
    level: "İleri",
    text: "Avoiding pollution is crucial for the environment. We should stop cutting down trees.",
    annotations: [
      {
        start_index: 0, end_index: 18, surface_form: "Avoiding pollution",
        lemma: "avoid", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "Kirlilikten kaçınmak",
        short_explanation_tr: "Gerund (İsim-fiil) yapısı. Cümlenin öznesi durumundadır.",
        example_sentence_en: "Smoking is bad for health.", example_sentence_tr: "Sigara içmek sağlık için kötüdür."
      },
      {
        start_index: 60, end_index: 85, surface_form: "stop cutting down trees",
        lemma: "stop", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "ağaçları kesmeyi durdurmak",
        short_explanation_tr: "Bir eylemi tamamen bırakmak/durdurmak.",
        example_sentence_en: "Please stop making noise.", example_sentence_tr: "Lütfen gürültü yapmayı bırakın."
      }
    ]
  },
  {
    id: "s_016",
    title: "The Interview",
    level: "Orta",
    text: "The applicant said that he used to work in a bank. He is looking for a new challenge.",
    annotations: [
      {
        start_index: 14, end_index: 50, surface_form: "said that he used to work in a bank",
        lemma: null, pos: "CLAUSE", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "bir bankada çalışmış olduğunu söyledi",
        short_explanation_tr: "Aktarılan söz (Reported Speech) ve geçmişteki alışkanlık (Used to) yapısı bir arada.",
        example_sentence_en: "I used to play tennis.", example_sentence_tr: "Eskiden tenis oynardım."
      },
      {
        start_index: 71, end_index: 84, surface_form: "new challenge",
        lemma: "challenge", pos: "NOUN", annotation_type: "noun_phrase",
        contextual_turkish_meaning: "yeni bir heyecan / zorluk",
        short_explanation_tr: "Kişiyi geliştirecek yeni bir fırsat veya görev.",
        example_sentence_en: "I need a new challenge in my life.", example_sentence_tr: "Hayatımda yeni bir meydan okumaya ihtiyacım var."
      }
    ]
  },
  {
    id: "s_017",
    title: "Shopping Spree",
    level: "Kolay",
    text: "How much is this shirt? I don't have many coins in my pocket.",
    annotations: [
      {
        start_index: 0, end_index: 8, surface_form: "How much",
        lemma: "how much", pos: "ADV", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "Ne kadar (fiyat)",
        short_explanation_tr: "Fiyat veya miktar sormak için kullanılan soru kalıbı.",
        example_sentence_en: "How much is this car?", example_sentence_tr: "Bu araba ne kadar?"
      },
      {
        start_index: 34, end_index: 44, surface_form: "many coins",
        lemma: "many", pos: "DET", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "çok madeni para",
        short_explanation_tr: "Sayılabilen nesneler için 'çok' anlamında kullanılır.",
        example_sentence_en: "There are many books on the shelf.", example_sentence_tr: "Rafta çok kitap var."
      }
    ]
  },
  {
    id: "s_018",
    title: "Scientific Discovery",
    level: "İleri",
    text: "The scientist, whose work was famous, won a prize. He had been studying biology for years.",
    annotations: [
      {
        start_index: 15, end_index: 34, surface_form: "whose work was famous",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "çalışması meşhur olan",
        short_explanation_tr: "İyelik bildiren (sahiplik) sıfat cümleciği yapısı.",
        example_sentence_en: "The man whose dog died is sad.", example_sentence_tr: "Köpeği ölen adam üzgün."
      },
      {
        start_index: 52, end_index: 69, surface_form: "had been studying",
        lemma: "study", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "çalışmaktaydı",
        short_explanation_tr: "Past Perfect Continuous. Geçmişte bir noktaya kadar devam eden eylemi anlatır.",
        example_sentence_en: "I had been waiting for an hour.", example_sentence_tr: "Bir saattir beklemekteydim."
      }
    ]
  },
  {
    id: "s_019",
    title: "Weekend Trip",
    level: "Orta",
    text: "We are going to visit my grandmother this weekend. I think it will be fun.",
    annotations: [
      {
        start_index: 3, end_index: 18, surface_form: "are going to visit",
        lemma: "visit", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "ziyaret edeceğiz",
        short_explanation_tr: "Planlanmış gelecek zaman (be going to).",
        example_sentence_en: "We are going to see a movie.", example_sentence_tr: "Film izleyeceğiz."
      },
      {
        start_index: 59, end_index: 66, surface_form: "will be",
        lemma: "be", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "olacak",
        short_explanation_tr: "Tahmin bildiren gelecek zaman (will).",
        example_sentence_en: "It will be cold tomorrow.", example_sentence_tr: "Yarın soğuk olacak."
      }
    ]
  },
  {
    id: "s_020",
    title: "Pet Care",
    level: "Kolay",
    text: "You must feed your dog every day. You should take it for a walk.",
    annotations: [
      {
        start_index: 4, end_index: 8, surface_form: "must",
        lemma: "must", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "zorundasın",
        short_explanation_tr: "Güçlü bir gereklilik ve zorunluluk bildiren modal yapı.",
        example_sentence_en: "You must stop at the red light.", example_sentence_tr: "Kırmızı ışıkta durmalısın."
      },
      {
        start_index: 38, end_index: 44, surface_form: "should",
        lemma: "should", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "-meli/-malı (tavsiye)",
        short_explanation_tr: "Öğüt ve tavsiye vermek için kullanılan modal yapı.",
        example_sentence_en: "You should eat more fruits.", example_sentence_tr: "Daha fazla meyve yemelisin."
      }
    ]
  }
];

const SPEAK_CHALLENGES = {
  "easy": ["Hello, how are you?", "I like reading."],
  "medium": ["I look forward to meeting you.", "The weather is changing."],
  "hard": ["Space is being explored.", "Unless we act, things will get worse."]
};
