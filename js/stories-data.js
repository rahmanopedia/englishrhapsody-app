/**
 * English Rhapsody - Reading Workshop Stories Data
 * 
 * Levels: "Kolay", "Orta", "İleri"
 */

const SPEAK_CHALLENGES = {
  "easy": [
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a glass of water.",
    "Where is the nearest bus station?",
    "Nice to meet you."
  ],
  "medium": [
    "I have been studying English for three years.",
    "Could you tell me how to get to the city center?",
    "I am looking forward to seeing you soon.",
    "If it rains tomorrow, we will stay at home.",
    "She has never been to Europe before.",
    "What do you usually do in your free time?",
    "The book I am reading is very interesting.",
    "I used to play basketball when I was younger."
  ],
  "hard": [
    "Despite the heavy rain, they decided to go for a walk.",
    "The mysterious disappearance of the painting remains unsolved.",
    "It is essential that everyone follows the safety guidelines.",
    "Had I known about the meeting, I would have attended it.",
    "The scientific discovery led to a breakthrough in medicine.",
    "In light of recent events, the company changed its policy.",
    "The more you practice, the more fluent you will become.",
    "Not only was she talented, but she was also very hardworking."
  ]
};

const STORIES = [
  {
    id: "s_med_002",
    title: "A Surprise Visit",
    level: "Orta",
    text: "While Jane was cooking dinner, her old friend turned up unexpectedly. They hadn't seen each other since high school.",
    annotations: [
      {
        start_index: 0, end_index: 5, surface_form: "While",
        lemma: "while", pos: "SCONJ",
        annotation_type: "word", contextual_turkish_meaning: "İken",
        short_explanation_tr: "İki eylemin aynı anda olduğunu gösteren bağlaç.",
        example_sentence_en: "While I was sleeping, the phone rang.", example_sentence_tr: "Ben uyurken telefon çaldı."
      },
      {
        start_index: 15, end_index: 26, surface_form: "was cooking",
        lemma: "cook", pos: "VERB",
        annotation_type: "grammar_structure", contextual_turkish_meaning: "pişiriyordu",
        short_explanation_tr: "Geçmişte belirli bir anda devam eden bir eylemi anlatan zaman yapısı.",
        example_sentence_en: "He was reading a book at 8 PM.", example_sentence_tr: "Saat 8'de kitap okuyordu."
      },
      {
        start_index: 39, end_index: 49, surface_form: "old friend",
        lemma: "old friend", pos: "NOUN",
        annotation_type: "noun_phrase", contextual_turkish_meaning: "eski arkadaşı",
        short_explanation_tr: "Uzun zamandır tanınan arkadaş.",
        example_sentence_en: "I met an old friend yesterday.", example_sentence_tr: "Dün eski bir arkadaşımla karşılaştım."
      },
      {
        start_index: 50, end_index: 59, surface_form: "turned up",
        lemma: "turn up", pos: "VERB",
        annotation_type: "phrasal_verb", contextual_turkish_meaning: "çıkageldi, aniden belirdi",
        short_explanation_tr: "Beklenmedik bir şekilde gelmek veya ortaya çıkmak.",
        example_sentence_en: "She turned up at the party without an invitation.", example_sentence_tr: "Davetiye olmadan partiye çıkageldi."
      },
      {
        start_index: 79, end_index: 89, surface_form: "hadn't seen",
        lemma: "see", pos: "VERB",
        annotation_type: "grammar_structure", contextual_turkish_meaning: "görmemişlerdi",
        short_explanation_tr: "Past Perfect (Miş'li Geçmiş Zaman) yapısı. Geçmişteki başka bir olaydan daha önce gerçekleşen bir durumu ifade eder.",
        example_sentence_en: "I hadn't seen him before that day.", example_sentence_tr: "Onu o günden önce hiç görmemiştim."
      },
      {
        start_index: 90, end_index: 100, surface_form: "each other",
        lemma: "each other", pos: "PRON",
        annotation_type: "word", contextual_turkish_meaning: "birbirlerini",
        short_explanation_tr: "İki veya daha fazla kişinin karşılıklı yaptığı bir eylemi anlatan zamir.",
        example_sentence_en: "They love each other.", example_sentence_tr: "Birbirlerini seviyorlar."
      },
      {
        start_index: 107, end_index: 118, surface_form: "high school",
        lemma: "high school", pos: "NOUN",
        annotation_type: "noun_phrase", contextual_turkish_meaning: "lise",
        short_explanation_tr: "Ortaokuldan sonra gidilen eğitim kurumu.",
        example_sentence_en: "My high school years were fun.", example_sentence_tr: "Lise yıllarım eğlenceliydi."
      }
    ]
  },
  {
    id: "s_easy_001",
    title: "A Sunny Day",
    level: "Kolay",
    text: "The sun was shining brightly. Sam went to the park. He saw many children playing there.",
    annotations: [
      {
        start_index: 0, end_index: 7, surface_form: "The sun",
        lemma: "sun", pos: "NOUN",
        annotation_type: "noun_phrase", contextual_turkish_meaning: "Güneş",
        short_explanation_tr: "Gökyüzündeki temel ışık ve ısı kaynağı.",
        example_sentence_en: "The sun is huge.", example_sentence_tr: "Güneş devasadır."
      },
      {
        start_index: 8, end_index: 19, surface_form: "was shining",
        lemma: "shine", pos: "VERB",
        annotation_type: "grammar_structure", contextual_turkish_meaning: "parlıyordu",
        short_explanation_tr: "Past Continuous (Sürekli Geçmiş Zaman) yapısı. O anda parlamakta olduğunu belirtir.",
        example_sentence_en: "The stars were shining in the night sky.", example_sentence_tr: "Yıldızlar gece gökyüzünde parlıyordu."
      },
      {
        start_index: 34, end_index: 38, surface_form: "went",
        lemma: "go", pos: "VERB",
        annotation_type: "word", contextual_turkish_meaning: "gitti",
        short_explanation_tr: "'Go' fiilinin geçmiş zaman (V2) hali.",
        example_sentence_en: "She went to school yesterday.", example_sentence_tr: "O dün okula gitti."
      },
      {
        start_index: 55, end_index: 63, surface_form: "children",
        lemma: "child", pos: "NOUN",
        annotation_type: "word", contextual_turkish_meaning: "çocuklar",
        short_explanation_tr: "'Child' (çocuk) kelimesinin çoğul hali.",
        example_sentence_en: "The children are very happy.", example_sentence_tr: "Çocuklar çok mutlu."
      }
    ]
  },
  {
    id: "s_medium_001",
    title: "The Big Decision",
    level: "Orta",
    text: "The young man who lives next door decided to give up his job. He wanted to travel the world.",
    annotations: [
      {
        start_index: 4, end_index: 33, surface_form: "young man who lives next door",
        lemma: null, pos: "CLAUSE",
        annotation_type: "relative_clause", contextual_turkish_meaning: "yan kapıda yaşayan genç adam",
        short_explanation_tr: "Sıfat cümleciği yapısı. 'Who' kelimesi adamı tanımlıyor.",
        example_sentence_en: "The girl who is singing is my sister.", example_sentence_tr: "Şarkı söyleyen kız benim kız kardeşimdir."
      },
      {
        start_index: 34, end_index: 44, surface_form: "decided to",
        lemma: "decide", pos: "VERB",
        annotation_type: "grammar_structure", contextual_turkish_meaning: "karar verdi",
        short_explanation_tr: "Bir eylemi yapmaya karar vermek. Arkasından fiilin yalın hali gelir.",
        example_sentence_en: "I decided to stay at home.", example_sentence_tr: "Evde kalmaya karar verdim."
      },
      {
        start_index: 45, end_index: 52, surface_form: "give up",
        lemma: "give up", pos: "VERB",
        annotation_type: "phrasal_verb", contextual_turkish_meaning: "bırakmak, vazgeçmek",
        short_explanation_tr: "Bir işi veya alışkanlığı terk etmek anlamında kullanılır.",
        example_sentence_en: "Never give up on your dreams.", example_sentence_tr: "Hayallerinden asla vazgeçme."
      },
      {
        start_index: 53, end_index: 60, surface_form: "his job",
        lemma: "job", pos: "NOUN",
        annotation_type: "noun_phrase", contextual_turkish_meaning: "işini",
        short_explanation_tr: "Sahip olduğu mesleki pozisyonu.",
        example_sentence_en: "He loves his job.", example_sentence_tr: "İşini seviyor."
      }
    ]
  },
  {
    id: "s_adv_001",
    title: "Economic Challenges",
    level: "İleri",
    text: "The local government has been grappling with the economic crisis for months. They need to make a decision soon.",
    annotations: [
      {
        start_index: 0, end_index: 20, surface_form: "The local government",
        lemma: "government", pos: "NOUN",
        annotation_type: "noun_phrase", contextual_turkish_meaning: "Yerel hükümet (belediye vb.)",
        short_explanation_tr: "Belli bir bölgeyi yöneten resmi kurum.",
        example_sentence_en: "The local government built a new park.", example_sentence_tr: "Yerel hükümet yeni bir park inşa etti."
      },
      {
        start_index: 21, end_index: 44, surface_form: "has been grappling with",
        lemma: "grapple with", pos: "VERB",
        annotation_type: "grammar_structure", contextual_turkish_meaning: "ile mücadele edip duruyor",
        short_explanation_tr: "Present Perfect Continuous yapısı. Geçmişte başlayıp hala devam eden zorlu bir süreci anlatır.",
        example_sentence_en: "I have been working here for ten years.", example_sentence_tr: "On yıldır burada çalışıyorum."
      },
      {
        start_index: 49, end_index: 64, surface_form: "economic crisis",
        lemma: "economic crisis", pos: "NOUN",
        annotation_type: "collocation", contextual_turkish_meaning: "ekonomik kriz",
        short_explanation_tr: "Ekonomide yaşanan ciddi daralma ve zorluk durumu.",
        example_sentence_en: "The company survived the economic crisis.", example_sentence_tr: "Şirket ekonomik krizi atlattı."
      },
      {
        start_index: 90, end_index: 105, surface_form: "make a decision",
        lemma: "make a decision", pos: "VERB",
        annotation_type: "idiom", contextual_turkish_meaning: "karar vermek",
        short_explanation_tr: "Bir konuda seçim yapmak, karar kılmak.",
        example_sentence_en: "It is time to make a decision about our future.", example_sentence_tr: "Geleceğimiz hakkında karar verme zamanı."
      }
    ]
  },
  {
    id: "s_split_001",
    title: "Bedtime",
    level: "Kolay",
    text: "Sam entered the room and turned the light off.",
    annotations: [
      {
        start_index: 25, end_index: 45, surface_form: "turned the light off",
        lemma: "turn off", pos: "VERB",
        annotation_type: "phrasal_verb", contextual_turkish_meaning: "ışığı kapattı",
        short_explanation_tr: "'Turn off' (kapatmak) fiili araya nesne (the light) alarak ayrılmıştır.",
        spans: [
          { start: 25, end: 31 }, // "turned"
          { start: 42, end: 45 }  // "off"
        ],
        example_sentence_en: "Please turn the TV off.", example_sentence_tr: "Lütfen televizyonu kapat."
      }
    ]
  }
];
