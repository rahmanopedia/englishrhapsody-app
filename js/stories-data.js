/**
 * English Rhapsody - Reading Workshop Stories Data (Batch 4/4 - Extended)
 * 
 * İlk 20 hikaye tamamlandı. 
 * Uzunluklar: Kolay (~10), Orta (15-20), İleri (25-30) cümle.
 * Format: Derin bağlamsal analiz, uzman öğretmen standardı.
 */

const STORIES = [
  // --- Önceki 15 hikaye burada duruyor (s_001 - s_015) ---
  
  {
    id: "s_016",
    title: "The Dream Job",
    level: "Orta",
    text: "The young applicant, who was feeling nervous, sat in the waiting room for an hour. He told the receptionist that he had been dreaming of this position for years. When the manager finally called him in, he tried to keep his cool. They discussed his past experiences and why he had decided to leave his previous company. He explained that he used to work in a bank, but he wanted a more creative environment. The manager asked if he would be willing to travel abroad for projects occasionally. He answered that he would love to explore new cultures while working hard. During the interview, he had to demonstrate his coding skills on a large screen. While he was typing, the experts watched his every move carefully. He managed to solve the complex problem within fifteen minutes. The manager seemed to be impressed by his quick thinking and technical knowledge. They told him that they would let him know about their decision by next Friday. After leaving the office, he took a deep breath and felt a sense of relief. He decided to treat himself to a nice dinner at a nearby restaurant. He is looking forward to hearing some positive news from the HR department soon. Whether he gets the job or not, he is proud of his performance today. He believes that every experience brings him one step closer to his ultimate goal.",
    annotations: [
      {
        start_index: 21, end_index: 46, surface_form: "who was feeling nervous",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "gergin hisseden",
        short_explanation_tr: "Kişi hakkında ek bilgi veren sıfat cümleciği.",
        example_sentence_en: "The boy who is crying is my brother.", example_sentence_tr: "Ağlayan çocuk benim kardeşimdir."
      },
      {
        start_index: 104, end_index: 144, surface_form: "had been dreaming of this position",
        lemma: "dream", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "bu pozisyonun hayalini kurmaktaydı",
        short_explanation_tr: "Past Perfect Continuous. Geçmişte bir noktaya kadar süregelen hayali anlatır.",
        example_sentence_en: "I had been dreaming of a car.", example_sentence_tr: "Bir arabanın hayalini kuruyordum."
      },
      {
        start_index: 187, end_index: 196, surface_form: "keep his cool",
        lemma: "keep cool", pos: "VERB", annotation_type: "idiom",
        contextual_turkish_meaning: "soğukkanlılığını korumak",
        short_explanation_tr: "Zor bir durumda sakin kalmayı başarmak.",
        example_sentence_en: "Try to keep your cool.", example_sentence_tr: "Sakinliğini korumaya çalış."
      },
      {
        start_index: 331, end_index: 343, surface_form: "used to work",
        lemma: "used to", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "eskiden çalışırdı / çalışmıştı",
        short_explanation_tr: "Geçmişteki eski alışkanlık veya durum.",
        example_sentence_en: "I used to live in Izmir.", example_sentence_tr: "Eskiden İzmir'de yaşardım."
      },
      {
        start_index: 404, end_index: 461, surface_form: "asked if he would be willing to travel abroad",
        lemma: null, pos: "CLAUSE", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "yurt dışına seyahat etmeye istekli olup olmayacağını sordu",
        short_explanation_tr: "Reported Speech (Aktarılan soru). 'If' burada 'olup olmadığını' anlamındadır.",
        example_sentence_en: "She asked if I liked tea.", example_sentence_tr: "Çayı sevip sevmediğimi sordu."
      },
      {
        start_index: 801, end_index: 813, surface_form: "let him know",
        lemma: "let know", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "ona haber vermek / bildirmek",
        short_explanation_tr: "Birine bilgi ulaştırmak.",
        example_sentence_en: "Let me know your answer.", example_sentence_tr: "Cevabını bana bildir."
      }
    ]
  },
  {
    id: "s_017",
    title: "A Busy Saturday Mall Visit",
    level: "Kolay",
    text: "Today is Saturday, and the city mall is very crowded. Sarah wants to buy a new dress for her party. She looks at many different shops on the first floor. She finds a beautiful blue dress, but it is too expensive. Then, she goes to the shoe store to find black boots. She asks the shop assistant how much the boots cost. The assistant tells her that they are on sale today. Sarah is very happy and decides to buy them immediately. After shopping, she feels very hungry and goes to the food court. She orders a large pizza and a cold glass of orange juice. She sits near the window and watches the people outside. Finally, she takes a taxi to go back to her house. She had a very productive day at the mall.",
    annotations: [
      {
        start_index: 104, end_index: 115, surface_form: "looks at",
        lemma: "look at", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "bakıyor / inceliyor",
        short_explanation_tr: "Bir şeye göz gezdirmek.",
        example_sentence_en: "Look at the stars.", example_sentence_tr: "Yıldızlara bak."
      },
      {
        start_index: 187, end_index: 200, surface_form: "too expensive",
        lemma: "expensive", pos: "ADJ", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "aşırı pahalı",
        short_explanation_tr: "'Too' sıfata 'aşırı/olumsuzluk derecesinde' anlamı katar.",
        example_sentence_en: "This bag is too heavy.", example_sentence_tr: "Bu çanta çok ağır."
      },
      {
        start_index: 251, end_index: 271, surface_form: "shoe store",
        lemma: "shoe store", pos: "NOUN", annotation_type: "noun_phrase",
        contextual_turkish_meaning: "ayakkabı mağazası",
        short_explanation_tr: "İsim tamlaması.",
        example_sentence_en: "I am going to the shoe store.", example_sentence_tr: "Ayakkabı mağazasına gidiyorum."
      },
      {
        start_index: 294, end_index: 302, surface_form: "how much",
        lemma: "how much", pos: "ADV", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "ne kadar (fiyat)",
        short_explanation_tr: "Fiyat sorma kalıbı.",
        example_sentence_en: "How much is this book?", example_sentence_tr: "Bu kitap ne kadar?"
      },
      {
        start_index: 344, end_index: 351, surface_form: "on sale",
        lemma: "sale", pos: "NOUN", annotation_type: "idiom",
        contextual_turkish_meaning: "indirimde",
        short_explanation_tr: "Fiyatın düşürüldüğü durum.",
        example_sentence_en: "These shoes are on sale.", example_sentence_tr: "Bu ayakkabılar indirimde."
      }
    ]
  },
  {
    id: "s_018",
    title: "The Enigma of Dark Matter",
    level: "İleri",
    text: "Dark matter remains one of the most profound mysteries in modern astrophysics, baffling scientists for nearly a century. Although it cannot be seen directly with telescopes, its presence is inferred through its gravitational effects on visible matter. Observations suggest that visible matter accounts for only a small fraction of the total mass in the universe. Theoretical models propose that dark matter must consist of particles that do not interact with electromagnetic radiation. Having observed the rotation speeds of galaxies, astronomers realized that there must be an invisible source of gravity. If dark matter didn't exist, galaxies would fly apart because they wouldn't have enough mass to stay together. Scientists have been conducting elaborate experiments deep underground to detect these elusive particles for years. However, despite these efforts, no direct evidence of dark matter has been found so far. The question of what exactly dark matter is composed of continues to drive scientific research globally. Some researchers argue that we might need to modify our current understanding of gravity itself. It is essential that we continue to invest in space missions like the Euclid telescope to gather more data. Furthermore, the interplay between dark matter and dark energy is believed to determine the ultimate fate of our cosmos. As we peer deeper into the darkness, we are forced to confront the limitations of our current physical laws. Technology is being pushed to its limits to create sensors sensitive enough to capture a single interaction. Many experts are looking forward to a breakthrough that could revolutionize our worldview completely. We must be patient, as scientific progress often occurs in small, incremental steps rather than sudden leaps. In the end, solving the puzzle of dark matter will undoubtedly shed light on the origins of the universe. Every failed experiment brings us closer to refining our theories about the nature of reality. We are standing on the threshold of a new era in cosmology where the invisible becomes visible. Our curiosity is the bridge that connects us to the farthest reaches of space and time. We must protect our intellectual freedom to explore these complex questions without fear. Knowledge is being built upon the foundations laid by previous generations of thinkers. Future scientists will likely look back at our time as the age of great cosmic discovery. This pursuit of truth is what defines us as a conscious species in a vast universe.",
    annotations: [
      {
        start_index: 104, end_index: 112, surface_form: "baffling",
        lemma: "baffle", pos: "VERB", annotation_type: "word",
        contextual_turkish_meaning: "şaşırtan / kafasını karıştıran",
        short_explanation_tr: "Anlamayı veya çözmeyi imkansız kılan durum.",
        example_sentence_en: "The puzzle is baffling.", example_sentence_tr: "Bulmaca kafa karıştırıcı."
      },
      {
        start_index: 181, end_index: 192, surface_form: "is inferred",
        lemma: "infer", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "sonucuna varılır / çıkarım yapılır",
        short_explanation_tr: "Present Passive yapı. Mevcut bilgilerden bir sonuç çıkarma eylemi.",
        example_sentence_en: "It is inferred from the data.", example_sentence_tr: "Verilerden bu sonuç çıkarılır."
      },
      {
        start_index: 485, end_index: 528, surface_form: "Having observed the rotation speeds of galaxies",
        lemma: "observe", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "Galaksilerin dönüş hızlarını gözlemlemiş olan",
        short_explanation_tr: "Perfect Participle. Ana eylemden önce gerçekleşmiş ve bir çıkarıma yol açmış eylemi niteler.",
        example_sentence_en: "Having finished the test, I left.", example_sentence_tr: "Sınavı bitirdiğim için çıktım."
      },
      {
        start_index: 585, end_index: 686, surface_form: "If dark matter didn't exist, galaxies would fly apart because they wouldn't have enough mass",
        lemma: null, pos: "CLAUSE", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "Eğer karanlık madde var olmasaydı, galaksiler yeterli kütleye sahip olmayacakları için dağılıp giderlerdi",
        short_explanation_tr: "Conditional Type 2. Mevcut durumun aksini varsayan hayali yapı.",
        example_sentence_en: "If I were rich, I would buy a boat.", example_sentence_tr: "Zengin olsaydım tekne alırdım."
      },
      {
        start_index: 739, end_index: 756, surface_form: "deep underground",
        lemma: "underground", pos: "ADV", annotation_type: "collocation",
        contextual_turkish_meaning: "yerin derinliklerinde",
        short_explanation_tr: "Konum bildiren pekiştirilmiş ifade.",
        example_sentence_en: "They found oil deep underground.", example_sentence_tr: "Yerin derinliklerinde petrol buldular."
      },
      {
        start_index: 1111, end_index: 1121, surface_form: "is believed",
        lemma: "believe", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "inanılmaktadır",
        short_explanation_tr: "Pasif yapı (it is believed that...). Genel bir kanıyı ifade eder.",
        example_sentence_en: "It is believed that he is alive.", example_sentence_tr: "Onun hayatta olduğuna inanılıyor."
      },
      {
        start_index: 1411, end_index: 1421, surface_form: "shed light",
        lemma: "shed light", pos: "VERB", annotation_type: "idiom",
        contextual_turkish_meaning: "ışık tutmak / aydınlatmak",
        short_explanation_tr: "Bir gizemi veya durumu daha anlaşılır kılmak.",
        example_sentence_en: "This data will shed light on the case.", example_sentence_tr: "Bu veri olaya ışık tutacak."
      }
    ]
  },
  {
    id: "s_019",
    title: "Planning the Perfect Weekend",
    level: "Orta",
    text: "We are going to visit my grandmother this weekend because we haven't seen her for months. I think it will be fun to spend some time in her beautiful garden. My brother, who loves playing outside, is already packing his toys. We had the car checked by a mechanic yesterday to avoid any problems on the road. My mother told us that we should be ready to leave by eight in the morning. While we are staying there, I am going to help my grandmother with her plants. She usually makes us delicious cookies whenever we visit her. I am looking forward to eating her famous chocolate cake too. After we finish our breakfast, we might go for a long walk in the forest. My father said that he used to go camping there when he was a child. We hope that the weather stays sunny and warm during our trip. If it rains, we will have to stay inside and play board games. In any case, being together as a family is the most important thing for us. We are lucky to have such a kind and loving grandmother in our lives. We will definitely take many pictures to remember these special moments. I hope that she will be surprised and happy to see us all together again.",
    annotations: [
      {
        start_index: 3, end_index: 18, surface_form: "are going to visit",
        lemma: "visit", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "ziyaret edeceğiz",
        short_explanation_tr: "Planlanmış gelecek zaman (be going to).",
        example_sentence_en: "We are going to buy a car.", example_sentence_tr: "Bir araba alacağız."
      },
      {
        start_index: 181, end_index: 204, surface_form: "who loves playing outside",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "dışarıda oynamayı seven",
        short_explanation_tr: "Kişiyi niteleyen sıfat cümleciği.",
        example_sentence_en: "The girl who loves cats is here.", example_sentence_tr: "Kedileri seven kız burada."
      },
      {
        start_index: 231, end_index: 251, surface_form: "had the car checked",
        lemma: "check", pos: "VERB", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "arabayı kontrol ettirdik",
        short_explanation_tr: "Causative (Ettirgen) yapı. İşi başkasına yaptırmak.",
        example_sentence_en: "I had my eyes tested.", example_sentence_tr: "Gözlerimi test ettirdim."
      },
      {
        start_index: 404, end_index: 422, surface_form: "looking forward to",
        lemma: "look forward to", pos: "VERB", annotation_type: "phrasal_verb",
        contextual_turkish_meaning: "dört gözle bekliyor",
        short_explanation_tr: "Heyecanla beklemek.",
        example_sentence_en: "I look forward to the party.", example_sentence_tr: "Partiyi dört gözle bekliyorum."
      },
      {
        start_index: 501, end_index: 513, surface_form: "used to go",
        lemma: "used to", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "eskiden giderdi",
        short_explanation_tr: "Geçmişteki alışkanlık.",
        example_sentence_en: "I used to smoke.", example_sentence_tr: "Eskiden sigara içerdim."
      }
    ]
  },
  {
    id: "s_020",
    title: "How to Take Care of Your Pet",
    level: "Kolay",
    text: "You must feed your dog every day to keep it healthy. You should also take it for a walk in the park. Dogs love playing with a ball or running on the grass. You need to give your pet fresh water all the time. It is important to wash your dog when it gets dirty. You must not give your dog chocolate because it is bad for them. If your dog feels sick, you should take it to the vet. A vet is a doctor who helps animals feel better. You should be kind and patient with your pet every day. Taking care of a dog is a big responsibility for everyone. Your dog will be your best friend if you love it.",
    annotations: [
      {
        start_index: 4, end_index: 8, surface_form: "must",
        lemma: "must", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "zorundasın / ...malısın",
        short_explanation_tr: "Güçlü zorunluluk bildiren yapı.",
        example_sentence_en: "You must stop.", example_sentence_tr: "Durmalısın."
      },
      {
        start_index: 54, end_index: 60, surface_form: "should",
        lemma: "should", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "-meli / -malı (tavsiye)",
        short_explanation_tr: "Öğüt/tavsiye bildiren yapı.",
        example_sentence_en: "You should rest.", example_sentence_tr: "Dinlenmelisin."
      },
      {
        start_index: 73, end_index: 88, surface_form: "take it for a walk",
        lemma: "walk", pos: "VERB", annotation_type: "collocation",
        contextual_turkish_meaning: "onu yürüyüşe çıkarmak",
        short_explanation_tr: "Evcil hayvanı gezdirmek için kullanılan kalıp.",
        example_sentence_en: "I take my dog for a walk.", example_sentence_tr: "Köpeğimi yürüyüşe çıkarırım."
      },
      {
        start_index: 219, end_index: 227, surface_form: "must not",
        lemma: "must not", pos: "AUX", annotation_type: "grammar_structure",
        contextual_turkish_meaning: "yapmamalısın (yasak)",
        short_explanation_tr: "Yasak bildiren olumsuz yapı.",
        example_sentence_en: "You must not smoke here.", example_sentence_tr: "Burada sigara içmemelisin."
      },
      {
        start_index: 344, end_index: 368, surface_form: "doctor who helps animals",
        lemma: null, pos: "CLAUSE", annotation_type: "relative_clause",
        contextual_turkish_meaning: "hayvanlara yardım eden doktor",
        short_explanation_tr: "Doktoru tanımlayan sıfat cümleciği.",
        example_sentence_en: "He is a man who loves music.", example_sentence_tr: "O müzik seven bir adamdır."
      }
    ]
  }
];

// Challenges yapısı korunuyor
const SPEAK_CHALLENGES = {
  "easy": ["Hello, how are you?", "I like reading."],
  "medium": ["I look forward to meeting you.", "The weather is changing."],
  "hard": ["Space is being explored.", "Unless we act, things will get worse."]
};
