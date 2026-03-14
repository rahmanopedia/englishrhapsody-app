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
    id: "s_easy_001",
    title: "A Sunny Day",
    level: "Kolay",
    text: "The sun was shining brightly. Sam went to the park. He saw many children playing there.",
    annotations: [
      {
        start_index: 4, end_index: 7, surface_form: "sun",
        annotation_type: "word", contextual_turkish_meaning: "güneş",
        short_explanation_tr: "Gökyüzündeki parlak yıldız.",
        example_sentence_en: "The sun is very hot.", example_sentence_tr: "Güneş çok sıcaktır."
      },
      {
        start_index: 8, end_index: 19, surface_form: "was shining",
        annotation_type: "verb_phrase", contextual_turkish_meaning: "parlıyordu",
        short_explanation_tr: "Past Continuous (Sürekli Geçmiş Zaman) yapısı. O anda parlamakta olduğunu belirtir.",
        example_sentence_en: "The stars were shining in the night sky.", example_sentence_tr: "Yıldızlar gece gökyüzünde parlıyordu."
      },
      {
        start_index: 34, end_index: 38, surface_form: "went",
        annotation_type: "word", contextual_turkish_meaning: "gitti",
        short_explanation_tr: "'Go' fiilinin geçmiş zaman (V2) hali.",
        example_sentence_en: "She went to school yesterday.", example_sentence_tr: "O dün okula gitti."
      },
      {
        start_index: 55, end_index: 63, surface_form: "children",
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
        annotation_type: "relative_clause", contextual_turkish_meaning: "yan kapıda yaşayan genç adam",
        short_explanation_tr: "Sıfat cümleciği yapısı. 'Who' kelimesi adamı tanımlıyor.",
        example_sentence_en: "The girl who is singing is my sister.", example_sentence_tr: "Şarkı söyleyen kız benim kız kardeşimdir."
      },
      {
        start_index: 45, end_index: 52, surface_form: "give up",
        annotation_type: "phrasal_verb", contextual_turkish_meaning: "bırakmak, vazgeçmek",
        short_explanation_tr: "Bir işi veya alışkanlığı terk etmek anlamında kullanılır.",
        example_sentence_en: "Never give up on your dreams.", example_sentence_tr: "Hayallerinden asla vazgeçme."
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
        start_index: 21, end_index: 44, surface_form: "has been grappling with",
        annotation_type: "grammar_structure", contextual_turkish_meaning: "ile mücadele edip duruyor",
        short_explanation_tr: "Present Perfect Continuous yapısı. Geçmişte başlayıp hala devam eden zorlu bir süreci anlatır.",
        example_sentence_en: "I have been working here for ten years.", example_sentence_tr: "On yıldır burada çalışıyorum."
      },
      {
        start_index: 90, end_index: 105, surface_form: "make a decision",
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
