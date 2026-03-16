/* ═══════════════════════════════════════════════════════════════
   KÖPRÜ — Statik Veritabanı
   800+ Türkçe ifade · Tam köprü analizi · API gerektirmez
   ═══════════════════════════════════════════════════════════════ */

const BRIDGE_CATEGORIES = [
  { id: 'duygular',  label: 'Duygular',        icon: '💭' },
  { id: 'yorgunluk', label: 'Yorgunluk',        icon: '😮‍💨' },
  { id: 'yogunluk',  label: 'Yoğunluk & İş',   icon: '🔥' },
  { id: 'sosyal',    label: 'Sosyal',           icon: '🤝' },
  { id: 'deyimler',  label: 'Deyimler',         icon: '🪄' },
  { id: 'sasirma',   label: 'Şaşırma & Tepki',  icon: '😲' },
  { id: 'basari',    label: 'Başarı & Başarısızlık', icon: '🎯' },
  { id: 'gunluk',    label: 'Günlük Hayat',     icon: '☀️' },
];

var BRIDGE_DATA = [
  {
    "id": 1001,
    "category": "sosyal",
    "tr": "Yüz yüze konuşalım",
    "tags": ["yüz", "konuş", "yüzyüze", "görüş"],
    "english_primary": "Let's talk face to face",
    "alternatives": ["Let's meet in person", "Let's hash it out together"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Yüz yüze", "tr_gloss": "face to face", "en_fragment": "face to face", "bridge_type": "direct", "explanation": "Doğrudan çeviri mevcut." }
    ],
    "cultural_insight": "Türkçede de İngilizcede de 'face to face' (yüz yüze) samimiyet ve netlik belirtir.",
    "fluency_tip": "Resmi durumlarda 'in person' (şahsen) daha sık kullanılır."
  },
  {
    "id": 1002,
    "category": "duygular",
    "tr": "Burnumdan getirdi",
    "tags": ["burun", "getir", "sinir", "bık", "usan"],
    "english_primary": "They drove me absolutely crazy",
    "alternatives": ["They gave me a hard time", "They made my life a living hell"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Burnumdan getirdi", "tr_gloss": "made it come out of my nose", "en_fragment": "drove me crazy", "bridge_type": "transform", "explanation": "Türkçe bedensel bir deyim (burundan gelme) → İngilizce zihinsel bir deyim (çıldırtma)." }
    ],
    "cultural_insight": "Türkçedeki 'burundan gelme' bir zevkin veya sürecin zehir olmasıdır. İngilizcede 'gave me a hard time' bu zorluğu karşılar.",
    "fluency_tip": "'He's really giving me a hard time about the report' diyerek iş hayatında kullanabilirsin."
  },
  {
    "id": 1003,
    "category": "deyimler",
    "tr": "Lafı dolandırdı",
    "tags": ["laf", "dolan", "dolandır", "konuş", "net"],
    "english_primary": "He's beating around the bush",
    "alternatives": ["Stop dancing around the subject", "He's avoidng the point"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Lafı dolandırdı", "tr_gloss": "wandered the word", "en_fragment": "beating around the bush", "bridge_type": "transform", "explanation": "Lafı gezdirmek → Çalının etrafında dolanmak (avcılık metaforu)." }
    ],
    "cultural_insight": "'Beating around the bush', avcılıkta kuşları çalının içinden çıkarmak yerine etrafında vurma işleminden gelir.",
    "fluency_tip": "'Get to the point' (Sadede gel) bu deyimin tam zıttıdır."
  },
  {
    "id": 1004,
    "category": "sasirma",
    "tr": "Dili tutuldu",
    "tags": ["dil", "tutul", "şaşır", "söz", "konuş"],
    "english_primary": "He was lost for words",
    "alternatives": ["He was tongue-tied", "He was speechless"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Dili tutuldu", "tr_gloss": "his tongue was caught", "en_fragment": "lost for words", "bridge_type": "transform", "explanation": "Fiziksel tutulma → Kelimelerin kaybolması." }
    ],
    "cultural_insight": "Türkçede 'dil' organ olarak tutulur, İngilizcede ise 'words' (kelimeler) kaybolur.",
    "fluency_tip": "Eğer çok şaşırdıysan 'I'm speechless' diyebilirsin."
  },
  {
    "id": 1005,
    "category": "gunluk",
    "tr": "Sonu gelmedi",
    "tags": ["son", "gel", "bit", "uzun", "sür"],
    "english_primary": "It went on forever",
    "alternatives": ["There was no end in sight", "It dragged on and on"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Sonu gelmedi", "tr_gloss": "the end didn't come", "en_fragment": "on forever", "bridge_type": "transform", "explanation": "Sonun gelmemesi → Sonsuzluk vurgusu." }
    ],
    "cultural_insight": "'Drag on' deyimi bir şeyin sıkıcı bir şekilde uzamasını çok iyi betimler.",
    "fluency_tip": "'The meeting just dragged on for hours' (Toplantı saatlerce uzadı gitti)."
  },
  {
    "id": 1,
    "category": "duygular",
    "tr": "Canım sıkıldı",
    "tags": [
      "canım",
      "sıkıl",
      "can sıkıntı",
      "sıkıntı"
    ],
    "english_primary": "I'm climbing the walls",
    "alternatives": [
      "I'm going stir-crazy",
      "I'm so bored I could scream"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Canım",
        "tr_gloss": "my soul / inner self",
        "en_fragment": "I",
        "bridge_type": "direct",
        "explanation": "Birinci şahıs doğrudan karşılık geliyor"
      },
      {
        "tr_fragment": "sıkıldı",
        "tr_gloss": "was squeezed / got bored",
        "en_fragment": "climbing the walls",
        "bridge_type": "transform",
        "explanation": "İçe sıkışma hissi → kaçmak isteyen fiziksel metafora dönüşüyor"
      }
    ],
    "cultural_insight": "Türkçede \"can sıkıntısı\" pasif — size oluyor. İngilizcede \"climbing the walls\" veya \"going stir-crazy\" gibi ifadeler aktif ve fiziksel. Sanki kişi harekete geçmek zorundaymış gibi.",
    "fluency_tip": "\"I've been climbing the walls all afternoon\" veya \"This traffic is making me stir-crazy\" diyebilirsin."
  },
  {
    "id": 2,
    "category": "duygular",
    "tr": "Moralim bozuk",
    "tags": [
      "moralim",
      "moral",
      "bozuk",
      "boz"
    ],
    "english_primary": "I'm feeling down",
    "alternatives": [
      "I'm in a funk",
      "I'm not feeling myself"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Moralim",
        "tr_gloss": "my morale / spirit",
        "en_fragment": "I",
        "bridge_type": "direct",
        "explanation": "Birinci şahıs karşılık geliyor"
      },
      {
        "tr_fragment": "bozuk",
        "tr_gloss": "broken / damaged",
        "en_fragment": "feeling down",
        "bridge_type": "transform",
        "explanation": "Türkçe bozukluk (kırıklık) → İngilizce aşağı yönlü fiziksel metafor"
      }
    ],
    "cultural_insight": "\"Moral\" Türkçede çok kullanılan bir kelime. İngilizcede \"morale\" resmi bağlamlarda kullanılır; günlük dilde \"mood\" veya \"spirits\" denir.",
    "fluency_tip": "\"My spirits are low\" daha şiirsel; \"I'm feeling off\" daha günlük. İkisi de doğal."
  },
  {
    "id": 3,
    "category": "duygular",
    "tr": "Sinirden çıldırıyorum",
    "tags": [
      "sinir",
      "çıldır",
      "sinirlendim",
      "sinirli",
      "çıldırtıyor"
    ],
    "english_primary": "I'm losing my mind",
    "alternatives": [
      "I'm absolutely furious",
      "I'm about to lose it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Sinirden",
        "tr_gloss": "from anger / nervousness",
        "en_fragment": "absolutely",
        "bridge_type": "multiply",
        "explanation": "Türkçe \"sinir\" hem sinirlilik hem öfkeyi kapsar; İngilizcede bunlar ayrışıyor"
      },
      {
        "tr_fragment": "çıldırıyorum",
        "tr_gloss": "I'm going crazy",
        "en_fragment": "losing my mind",
        "bridge_type": "transform",
        "explanation": "Delilik metaforu her iki dilde de var ama İngilizce \"losing\" ile aktif kayıp vurgulanıyor"
      }
    ],
    "cultural_insight": "\"Sinir\" Türkçede hem fiziksel siniri hem duygusal gerginliği anlatır. İngilizcede \"I'm angry\" ile \"I'm nervous\" birbirinden çok farklı.",
    "fluency_tip": "\"I'm at my wit's end\" (artık ne yapacağımı bilmiyorum) çok doğal alternatif."
  },
  {
    "id": 4,
    "category": "duygular",
    "tr": "Kendimi berbat hissediyorum",
    "tags": [
      "berbat",
      "hisset",
      "kendim",
      "kötü hisset"
    ],
    "english_primary": "I feel like garbage",
    "alternatives": [
      "I feel awful",
      "I feel terrible"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kendimi",
        "tr_gloss": "myself",
        "en_fragment": "I feel",
        "bridge_type": "direct",
        "explanation": "Birinci şahıs refleksif yapı benzer"
      },
      {
        "tr_fragment": "berbat",
        "tr_gloss": "terrible / disastrous",
        "en_fragment": "like garbage",
        "bridge_type": "transform",
        "explanation": "Türkçe berbat soyut; İngilizce \"garbage/trash\" some çöp metaforu kullanıyor"
      }
    ],
    "cultural_insight": "\"Berbat\" Fransızca \"bravade\"dan geliyor. İngilizcede \"I feel like garbage/trash\" veya \"I feel like crap\" günlük dilde çok yaygın.",
    "fluency_tip": "\"I'm not feeling great\" daha nazik; \"I feel like death\" çok dramatik ama yaygın."
  },
  {
    "id": 5,
    "category": "duygular",
    "tr": "Çok heyecanlıyım",
    "tags": [
      "heyecan",
      "heyecanlı",
      "heyecanlandım"
    ],
    "english_primary": "I'm so pumped",
    "alternatives": [
      "I'm over the moon",
      "I'm buzzing"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Çok",
        "tr_gloss": "very / so much",
        "en_fragment": "so",
        "bridge_type": "direct",
        "explanation": "Yoğunlaştırıcı doğrudan eşleşiyor"
      },
      {
        "tr_fragment": "heyecanlıyım",
        "tr_gloss": "I'm excited",
        "en_fragment": "pumped",
        "bridge_type": "transform",
        "explanation": "Heyecan hissi → pompalanmış, şişirilmiş enerji metaforu"
      }
    ],
    "cultural_insight": "\"Pumped\" spordan geliyor — kasların pompalaması gibi enerji dolu olmak. \"Buzzing\" İngiliz argosunda çok yaygın.",
    "fluency_tip": "\"I'm stoked\" (ABD), \"I'm chuffed\" (İngiltere) de öğrenmeye değer alternatifler."
  },
  {
    "id": 6,
    "category": "duygular",
    "tr": "Endişeleniyorum",
    "tags": [
      "endişe",
      "endişelen",
      "kaygı",
      "kaygılanıyorum",
      "tedirgin"
    ],
    "english_primary": "I'm worried sick",
    "alternatives": [
      "I'm on edge",
      "I've got butterflies in my stomach"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "endişeleniyorum",
        "tr_gloss": "I'm worrying",
        "en_fragment": "worried sick",
        "bridge_type": "transform",
        "explanation": "Türkçe endişe soyut; İngilizce \"worried sick\" hastalık metaforuyla yoğunluğu artırıyor"
      }
    ],
    "cultural_insight": "\"Worried sick\" fiziksel hastalık ima eder — kaygının bedene yansıması. \"Butterflies in my stomach\" ise karında kelebekler: beklenti ile kaygı karışımı.",
    "fluency_tip": "\"I'm a bit anxious about it\" daha ölçülü; \"I'm freaking out\" çok daha yoğun."
  },
  {
    "id": 7,
    "category": "duygular",
    "tr": "Utandım / Mahçup oldum",
    "tags": [
      "utandım",
      "mahçup",
      "utanç",
      "yüzüm kızardı"
    ],
    "english_primary": "I wanted to crawl into a hole",
    "alternatives": [
      "I was mortified",
      "I was so embarrassed"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Utandım",
        "tr_gloss": "I was ashamed / embarrassed",
        "en_fragment": "mortified",
        "bridge_type": "transform",
        "explanation": "Utanç hissi → ölümcül bir his (mortified=sanki öldürüldüm) veya yere girmek isteme metaforuna dönüşüyor"
      }
    ],
    "cultural_insight": "\"Mortified\" kelimesi \"mort\" (ölüm) kökünden gelir. \"I wanted to die\" veya \"I wanted to disappear\" de çok yaygın. Utanç İngilizcede sıklıkla fiziksel kaçış isteğiyle anlatılır.",
    "fluency_tip": "\"I could have died\" abartılı ama çok doğal. \"That was so cringe\" daha genç nesil ifadesi."
  },
  {
    "id": 8,
    "category": "duygular",
    "tr": "Kıskanıyorum",
    "tags": [
      "kıskan",
      "kıskançlık",
      "çekemiyorum",
      "imreniyor"
    ],
    "english_primary": "I'm green with envy",
    "alternatives": [
      "I'm so jealous",
      "I can't help but envy you"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kıskanıyorum",
        "tr_gloss": "I'm jealous",
        "en_fragment": "green with envy",
        "bridge_type": "transform",
        "explanation": "Kıskançlık hissi → yeşil renk metaforu (İngilizce kültürel sembol)"
      }
    ],
    "cultural_insight": "Yeşil renk İngiliz kültüründe kıskançlığı simgeler — Shakespeare'den geliyor. Türkçede böyle bir renk bağlantısı yok.",
    "fluency_tip": "\"I'm low-key jealous\" günlük ve hafif; \"I'm insanely jealous\" çok daha güçlü."
  },
  {
    "id": 9,
    "category": "duygular",
    "tr": "Pişmanım",
    "tags": [
      "pişman",
      "pişmanlık",
      "keşke",
      "nadim"
    ],
    "english_primary": "I could kick myself",
    "alternatives": [
      "I deeply regret it",
      "I wish I could take it back"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Pişmanım",
        "tr_gloss": "I regret it / I repent",
        "en_fragment": "could kick myself",
        "bridge_type": "transform",
        "explanation": "Pişmanlık → kendine fiziksel zarar verme isteği metaforu"
      }
    ],
    "cultural_insight": "\"I could kick myself\" güçlü pişmanlık için çok yaygın. \"I regret it\" daha resmi ve sakin. Türkçe \"keşke\" için \"I wish I had/hadn't...\" kalıbını öğren.",
    "fluency_tip": "\"I should have known better\" (daha iyi bilmeliydim) pişmanlık ifadelerinde çok yaygın."
  },
  {
    "id": 10,
    "category": "duygular",
    "tr": "Gururlandım",
    "tags": [
      "gurur",
      "gururl",
      "gururlandım",
      "övündüm"
    ],
    "english_primary": "I'm bursting with pride",
    "alternatives": [
      "I couldn't be prouder",
      "I'm so proud I could cry"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gururlandım",
        "tr_gloss": "I felt pride",
        "en_fragment": "bursting with pride",
        "bridge_type": "transform",
        "explanation": "Gurur hissi → patlama noktasına gelmiş kap metaforu"
      }
    ],
    "cultural_insight": "\"Bursting\" tam doluluk ve taşma hissini anlatır. Türkçe \"gururlandım\" tek kelime; İngilizce bunu fiziksel metaforla zenginleştiriyor.",
    "fluency_tip": "\"That's something to be proud of\" (övünülecek bir şey) tebrik ederken çok kullanışlı."
  },
  {
    "id": 11,
    "category": "duygular",
    "tr": "Kafam karıştı",
    "tags": [
      "kafam",
      "karış",
      "kafam karıştı",
      "anlayamadım",
      "anlamadım"
    ],
    "english_primary": "I'm completely lost",
    "alternatives": [
      "I'm all confused",
      "My head is spinning"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kafam",
        "tr_gloss": "my head",
        "en_fragment": "I",
        "bridge_type": "multiply",
        "explanation": "Türkçe \"kafa\" (baş) ile düşünce özdeşleşiyor; İngilizce \"I\" kişiyi bütün olarak alıyor"
      },
      {
        "tr_fragment": "karıştı",
        "tr_gloss": "got mixed up / stirred",
        "en_fragment": "completely lost",
        "bridge_type": "transform",
        "explanation": "Karışma/çorba hali → kaybolma/yön şaşırma metaforuna dönüşüyor"
      }
    ],
    "cultural_insight": "\"Kafam\" Türkçede düşünme merkezidir. İngilizce \"I'm lost\" yön bulmamayı kullanır. \"My head is spinning\" ise baş dönmesi metaforiyle daha Türkçeye yakın.",
    "fluency_tip": "\"I'm confused\" nötr; \"I have no idea what's going on\" daha güçlü; \"I'm totally out of my depth\" daha derin bir çaresizlik."
  },
  {
    "id": 12,
    "category": "duygular",
    "tr": "Çok mutluyum",
    "tags": [
      "mutlu",
      "mutluyum",
      "çok mutlu",
      "sevinçliyim",
      "sevinç"
    ],
    "english_primary": "I'm on cloud nine",
    "alternatives": [
      "I'm over the moon",
      "I'm absolutely thrilled"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Çok mutluyum",
        "tr_gloss": "I'm very happy",
        "en_fragment": "on cloud nine",
        "bridge_type": "transform",
        "explanation": "Mutluluk → dokuzuncu bulutta olmak; yükseklik ve hafiflik metaforu"
      }
    ],
    "cultural_insight": "\"Cloud nine\" Amerikan argosunda zirve mutluluğu temsil eder. \"Over the moon\" İngiliz kültüründe çok yaygın. İkisi de oldukça abartılı — günlük konuşmada \"I'm really happy\" genellikle yeterli.",
    "fluency_tip": "\"I'm so happy right now\" en sade ve doğal; \"This made my day\" (günümü güzelleştirdi) çok pratik bir ifade."
  },
  {
    "id": 13,
    "category": "duygular",
    "tr": "Üzgünüm",
    "tags": [
      "üzgün",
      "üzüldüm",
      "üzüntü",
      "kederli",
      "keder"
    ],
    "english_primary": "I'm heartbroken",
    "alternatives": [
      "I'm devastated",
      "I'm feeling really low"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Üzgünüm",
        "tr_gloss": "I'm sad",
        "en_fragment": "heartbroken",
        "bridge_type": "transform",
        "explanation": "Üzüntü → kalp kırılması; daha yoğun ve fiziksel bir metafor"
      }
    ],
    "cultural_insight": "\"Heartbroken\" çok güçlü — genellikle aşk acısı veya büyük bir kayıp için. Günlük üzüntü için \"I'm sad\" veya \"I'm bummed\" daha uygun.",
    "fluency_tip": "\"I'm bummed\" (hayal kırıklığı), \"I'm down\" (moralsiz), \"I'm gutted\" (İngiltere'de çok yaygın) iyi alternatifler."
  },
  {
    "id": 14,
    "category": "duygular",
    "tr": "Rahatladım",
    "tags": [
      "rahatla",
      "rahatladım",
      "rahatlama",
      "nefes aldım",
      "yük kalktı"
    ],
    "english_primary": "I can finally breathe again",
    "alternatives": [
      "What a relief",
      "I feel a weight lifted off my shoulders"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Rahatladım",
        "tr_gloss": "I relaxed / I was relieved",
        "en_fragment": "finally breathe again",
        "bridge_type": "transform",
        "explanation": "Rahatlama → nefes almak; baskının kalkmasıyla gelen özgürlük metaforu"
      }
    ],
    "cultural_insight": "İngilizcede rahatlama sıklıkla nefes metaforuyla anlatılır: \"breathe easy\", \"take a breather\". Türkçe daha doğrudan.",
    "fluency_tip": "\"Thank goodness that's over\" (şükür bitti) ve \"I'm so relieved\" en yaygın ifadeler."
  },
  {
    "id": 15,
    "category": "duygular",
    "tr": "Korkuyorum",
    "tags": [
      "kork",
      "korkuyorum",
      "korktu",
      "korku",
      "ürktüm",
      "ürktüyüm"
    ],
    "english_primary": "I'm scared stiff",
    "alternatives": [
      "I'm terrified",
      "I'm freaking out"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Korkuyorum",
        "tr_gloss": "I'm scared",
        "en_fragment": "scared stiff",
        "bridge_type": "transform",
        "explanation": "Korku → kasılıp donma (stiff = katı/sert); fiziksel tepki metaforu"
      }
    ],
    "cultural_insight": "\"Scared stiff\" hareketsiz kalma tepkisini anlatır. \"Terrified\" çok güçlü; \"spooked\" hayalet filmi gibi hafif korku için.",
    "fluency_tip": "\"I'm a little nervous\" (hafif kaygı) ile \"I'm absolutely terrified\" arasındaki farkı öğren."
  },
  {
    "id": 20,
    "category": "yorgunluk",
    "tr": "Çok yoruldum",
    "tags": [
      "yoruldum",
      "çok yoruldum",
      "yorgun",
      "bitik"
    ],
    "english_primary": "I'm completely drained",
    "alternatives": [
      "I'm running on empty",
      "I'm dead on my feet"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Çok",
        "tr_gloss": "very / so much",
        "en_fragment": "completely",
        "bridge_type": "direct",
        "explanation": "Yoğunlaştırıcı benzer"
      },
      {
        "tr_fragment": "yoruldum",
        "tr_gloss": "I got tired",
        "en_fragment": "drained",
        "bridge_type": "transform",
        "explanation": "Yorgunluk → boşaltılmış pil/tank metaforu; enerji sıfırlandı"
      }
    ],
    "cultural_insight": "\"Drained\" enerji tamamen tükenmiş demek. \"Running on empty\" boş tank metaforu. \"Dead on my feet\" ayakta ölü — çok güçlü.",
    "fluency_tip": "\"Exhausted\" hem fiziksel hem zihinsel yorgunluk için; \"wiped out\" daha argo."
  },
  {
    "id": 21,
    "category": "yorgunluk",
    "tr": "Bitik hissediyorum",
    "tags": [
      "bitik",
      "tükenmiş",
      "tükendim",
      "bitirdim",
      "bitti"
    ],
    "english_primary": "I'm burned out",
    "alternatives": [
      "I'm utterly exhausted",
      "I've hit a wall"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Bitik",
        "tr_gloss": "finished / depleted",
        "en_fragment": "burned out",
        "bridge_type": "transform",
        "explanation": "Bitmişlik → yanmış ve küle dönmüş; daha dramatik ve kalıcı tükenme metaforu"
      }
    ],
    "cultural_insight": "\"Burnout\" artık İngilizcede tıbbi terim. \"Hit a wall\" ise bir duvara çarpıp durmak — ani tükenme.",
    "fluency_tip": "\"I'm mentally drained\" zihinsel yorgunluk için; \"My body is giving up on me\" fiziksel için."
  },
  {
    "id": 22,
    "category": "yorgunluk",
    "tr": "Uyku bastırıyor",
    "tags": [
      "uyku",
      "uyku bastır",
      "gözlerim kapanıyor",
      "uyuyakaldım",
      "uyukluyorum"
    ],
    "english_primary": "I can barely keep my eyes open",
    "alternatives": [
      "I'm fighting to stay awake",
      "I'm nodding off"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Uyku bastırıyor",
        "tr_gloss": "sleep is pressing down on me",
        "en_fragment": "can barely keep my eyes open",
        "bridge_type": "transform",
        "explanation": "Türkçe uyku aktif bir baskı unsuru; İngilizce gözlerin kapanmasına direncini anlatıyor"
      }
    ],
    "cultural_insight": "Türkçede uyku kişiye yapılan bir şey (bastırıyor). İngilizcede kişi uyuyakalmayla savaşıyor. Metaforlar zıt yönde.",
    "fluency_tip": "\"I'm dead tired\" (ölü gibi yorgun), \"I need to crash\" (uyumam lazım) çok pratik."
  },
  {
    "id": 23,
    "category": "yorgunluk",
    "tr": "Uyuyamıyorum",
    "tags": [
      "uyuyamıyorum",
      "uyku uyuyamadım",
      "uykusuzluk",
      "uyku tutmuyor"
    ],
    "english_primary": "I can't get any sleep",
    "alternatives": [
      "I've been lying awake all night",
      "Sleep is avoiding me"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Uyuyamıyorum",
        "tr_gloss": "I can't sleep",
        "en_fragment": "been lying awake all night",
        "bridge_type": "transform",
        "explanation": "Uyuyamamak → gece boyu uyanık yatmak; süreci betimliyor"
      }
    ],
    "cultural_insight": "\"Insomnia\" resmi terim; günlük dilde \"I can't sleep\" veya \"I toss and turn all night\" (gece boyunca debeleniyorum) kullanılır.",
    "fluency_tip": "\"My mind won't switch off\" (aklım kapanmıyor) çok yaygın uyku problemi ifadesi."
  },
  {
    "id": 24,
    "category": "yorgunluk",
    "tr": "Kendimi tükenmiş hissediyorum",
    "tags": [
      "tüken",
      "tükendim",
      "tükenmiş",
      "bitap",
      "güçsüz"
    ],
    "english_primary": "I'm running on fumes",
    "alternatives": [
      "I have nothing left in the tank",
      "I'm completely spent"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "tükenmiş",
        "tr_gloss": "depleted / used up",
        "en_fragment": "running on fumes",
        "bridge_type": "transform",
        "explanation": "Enerji tamamen bitti → arabanın yakıtsız sadece buharla ilerlemesi"
      }
    ],
    "cultural_insight": "\"Running on fumes\" çok güçlü bir metafor. \"Spent\" (para gibi) tükenmiş demek. Her ikisi de benzin/enerji ekonomisini kullanıyor.",
    "fluency_tip": "\"I need to recharge\" (şarj olmam lazım) modern ve çok yaygın."
  },
  {
    "id": 30,
    "category": "yogunluk",
    "tr": "İşler çok yoğun gidiyor",
    "tags": [
      "iş",
      "yoğun",
      "meşgul",
      "yogun",
      "yoğunluk"
    ],
    "english_primary": "Things are absolutely hectic",
    "alternatives": [
      "I'm swamped",
      "I'm up to my neck in work"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İşler",
        "tr_gloss": "things / work",
        "en_fragment": "things",
        "bridge_type": "direct",
        "explanation": "Genel konu referansı benzer"
      },
      {
        "tr_fragment": "çok yoğun",
        "tr_gloss": "very dense / busy",
        "en_fragment": "absolutely hectic",
        "bridge_type": "transform",
        "explanation": "Yoğunluk → kaotik, kontrolsüz bir tempoya dönüşüyor (hectic = kaygı verici kargaşa)"
      }
    ],
    "cultural_insight": "\"Hectic\" sadece yoğun değil, düzensiz ve bunaltıcı. \"Swamped\" bataklık metaforu; \"up to my neck\" boyuna kadar gömülmek.",
    "fluency_tip": "\"Crazy busy\" (ABD), \"mental\" (İngiltere) çok yaygın günlük alternatifler."
  },
  {
    "id": 31,
    "category": "yogunluk",
    "tr": "Boğuluyorum işlerde",
    "tags": [
      "boğul",
      "boğuluyorum",
      "iş",
      "yetişemiyorum",
      "fırsat yok"
    ],
    "english_primary": "I'm drowning in work",
    "alternatives": [
      "I'm overwhelmed",
      "I can't keep up with everything"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Boğuluyorum",
        "tr_gloss": "I'm suffocating",
        "en_fragment": "drowning",
        "bridge_type": "direct",
        "explanation": "Her iki dil de ölümcül sıvı metaforunu kullanıyor — boğmak vs. drowning"
      },
      {
        "tr_fragment": "işlerde",
        "tr_gloss": "in work / tasks",
        "en_fragment": "in work",
        "bridge_type": "direct",
        "explanation": "Bağlaç benzer"
      }
    ],
    "cultural_insight": "İlginç: bu iki metafor birbirine çok yakın. Türkçe boğulmak (hava), İngilizce drowning (su). Her iki kültür de ezici iş yükünü ölüm metaforuyla anlatıyor.",
    "fluency_tip": "\"I'm overwhelmed\" en yaygın; \"I have too much on my plate\" (tabağım dolu) çok güzel bir İngilizce kalıp."
  },
  {
    "id": 32,
    "category": "yogunluk",
    "tr": "Arkaya düştüm",
    "tags": [
      "arkaya düştüm",
      "geri kaldım",
      "geride kaldım",
      "yetişemiyorum",
      "yetiş"
    ],
    "english_primary": "I'm falling behind",
    "alternatives": [
      "I'm struggling to keep up",
      "I'm getting behind on everything"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Arkaya düştüm",
        "tr_gloss": "I fell to the back",
        "en_fragment": "falling behind",
        "bridge_type": "direct",
        "explanation": "Her iki dil de geri kalmayı fiziksel konum olarak anlatıyor — neredeyse birebir eşleşme"
      }
    ],
    "cultural_insight": "Bu nadir bir doğrudan köprü! Türkçe ve İngilizce aynı fiziksel metaforu kullanıyor. Diller bazen düşündüğünden daha yakın.",
    "fluency_tip": "\"I'm behind on my work\" veya \"I need to catch up\" (yetişmem lazım) çok kullanışlı."
  },
  {
    "id": 33,
    "category": "yogunluk",
    "tr": "Her şey üstüme yığıldı",
    "tags": [
      "üstüme",
      "yığıldı",
      "üstüme yığıldı",
      "bunaldım",
      "altında kaldım"
    ],
    "english_primary": "Everything is piling up on me",
    "alternatives": [
      "I'm buried under everything",
      "It's all catching up with me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Her şey",
        "tr_gloss": "everything",
        "en_fragment": "everything",
        "bridge_type": "direct",
        "explanation": "Evrensel kapsam benzer"
      },
      {
        "tr_fragment": "üstüme yığıldı",
        "tr_gloss": "piled up on top of me",
        "en_fragment": "piling up on me",
        "bridge_type": "direct",
        "explanation": "Yığılma metaforu her iki dilde de aynı; Türkçe geçmiş zaman, İngilizce süregelen bir eylem olarak görüyor"
      }
    ],
    "cultural_insight": "Bu ifade iki dilde de çok benzer. Fark: Türkçe bitiş noktasını (yığıldı), İngilizce süreci (piling up) vurguluyor.",
    "fluency_tip": "\"I have a lot on my plate\" ve \"I'm juggling too much\" (çok şeyi dengelemeye çalışıyorum) çok kullanışlı."
  },
  {
    "id": 34,
    "category": "yogunluk",
    "tr": "Deadline'ım var",
    "tags": [
      "deadline",
      "son gün",
      "teslim",
      "teslim tarihi",
      "son tarih"
    ],
    "english_primary": "I'm up against a deadline",
    "alternatives": [
      "I have a deadline looming",
      "I'm racing against the clock"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Deadline'ım",
        "tr_gloss": "my deadline",
        "en_fragment": "up against a deadline",
        "bridge_type": "transform",
        "explanation": "Türkçe sahiplik (benim deadline'ım); İngilizce çarpışma metaforu — deadline'a karşı durmak"
      }
    ],
    "cultural_insight": "\"Deadline\" kelimesi 1860'lı yıllarda matbaacılıktan geliyor. \"Racing against the clock\" saat yarışı — çok görsel bir metafor.",
    "fluency_tip": "\"The deadline is tomorrow\" en basit; \"I'm on a tight deadline\" (sıkışık tarih) çok profesyonel."
  },
  {
    "id": 35,
    "category": "yogunluk",
    "tr": "Çok meşgulüm",
    "tags": [
      "meşgul",
      "çok meşgul",
      "zamanım yok",
      "fırsatım yok"
    ],
    "english_primary": "I'm slammed right now",
    "alternatives": [
      "I'm swamped",
      "I don't have a free moment"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Çok meşgulüm",
        "tr_gloss": "I'm very busy",
        "en_fragment": "slammed",
        "bridge_type": "transform",
        "explanation": "\"Meşgul\" Arapça kökenli sakin bir kelime; \"slammed\" çok güçlü fiziksel etki metaforu"
      }
    ],
    "cultural_insight": "\"Slammed\" (çarpmak) günlük İngilizcede çok yaygın. \"Swamped\" bataklık, \"buried\" gömülü — İngilizce yoğunluğu fiziksel tehlike olarak çerçeveler.",
    "fluency_tip": "\"I'm tied up right now\" (şu an bağlıyım) nazik bir ret için ideal."
  },
  {
    "id": 40,
    "category": "sosyal",
    "tr": "Özledim seni",
    "tags": [
      "özle",
      "özledim",
      "özlemek",
      "hasret",
      "hasretim"
    ],
    "english_primary": "I've missed you like crazy",
    "alternatives": [
      "I've been thinking about you",
      "It's been so long"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Özledim",
        "tr_gloss": "I missed / I longed for",
        "en_fragment": "I've missed you",
        "bridge_type": "direct",
        "explanation": "Özlem ifadesi benzer yapıda"
      },
      {
        "tr_fragment": "seni",
        "tr_gloss": "you",
        "en_fragment": "like crazy",
        "bridge_type": "add",
        "explanation": "İngilizcede yoğunluğu artırmak için \"like crazy/mad\" eklenir; Türkçede bu gizli anlamdadır"
      }
    ],
    "cultural_insight": "\"I miss you\" yeterli ama İngilizce native konuşmacılar genellikle yoğunlaştırıcı ekler: \"terribly\", \"like crazy\", \"so much\".",
    "fluency_tip": "\"It's been ages\" (çok zaman oldu) ve \"Where have you been hiding?\" (nerede saklandın?) çok doğal karşılaşma ifadeleri."
  },
  {
    "id": 41,
    "category": "sosyal",
    "tr": "Kavga ettik",
    "tags": [
      "kavga",
      "kavga ettik",
      "tartıştık",
      "tartışma",
      "küstük"
    ],
    "english_primary": "We had a falling out",
    "alternatives": [
      "We got into it",
      "We had a big fight"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kavga ettik",
        "tr_gloss": "we fought",
        "en_fragment": "had a falling out",
        "bridge_type": "transform",
        "explanation": "Kavga → \"düşüş\" metaforu; ilişkinin aşağı düşmesi/kopması"
      }
    ],
    "cultural_insight": "\"Falling out\" kalıcı kopukluk ima eder. \"We argued\" daha hafif; \"We had words\" (İngiltere) kibarca kavgaya atıf.",
    "fluency_tip": "\"We had a disagreement\" (anlaşmazlık) daha resmi; \"We butted heads\" (başları çarpıştı) eşit iki güç çatışması."
  },
  {
    "id": 42,
    "category": "sosyal",
    "tr": "Barıştık",
    "tags": [
      "barıştık",
      "barış",
      "uzlaştık",
      "düzeldi aramız"
    ],
    "english_primary": "We patched things up",
    "alternatives": [
      "We made up",
      "We sorted things out"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Barıştık",
        "tr_gloss": "we made peace",
        "en_fragment": "patched things up",
        "bridge_type": "transform",
        "explanation": "Barış → yama yapma metaforu; ilişkinin delik kısmını onarmak"
      }
    ],
    "cultural_insight": "\"Made up\" en yaygın. \"Patched up\" yama = geçici onarım ima edebilir. \"Buried the hatchet\" (baltayı gömdük) daha dramatik barış.",
    "fluency_tip": "\"We're good now\" (artık iyiyiz) en pratik ve doğal ifade."
  },
  {
    "id": 43,
    "category": "sosyal",
    "tr": "Canımı sıktı",
    "tags": [
      "canımı sıktı",
      "sinir etti",
      "rahatsız etti",
      "bezdirdi"
    ],
    "english_primary": "They got on my nerves",
    "alternatives": [
      "They drove me up the wall",
      "They really wound me up"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Canımı sıktı",
        "tr_gloss": "squeezed my soul",
        "en_fragment": "got on my nerves",
        "bridge_type": "transform",
        "explanation": "Türkçe ruh/can üzerindeki baskı → İngilizce sinirler üzerindeki etki"
      }
    ],
    "cultural_insight": "\"Get on my nerves\" fiziksel sinir ağını kullanıyor. \"Drive me up the wall\" de korku/çılgınlık metaforu. İngilizce rahatsızlığı çoğunlukla fiziksel tepkiyle anlatır.",
    "fluency_tip": "\"They annoyed me\" yeterli; \"They're doing my head in\" (İngiltere) çok yaygın."
  },
  {
    "id": 44,
    "category": "sosyal",
    "tr": "Hayal kırıklığına uğradım",
    "tags": [
      "hayal kırıklığı",
      "hayal kırıktı",
      "beklenti",
      "bekledim",
      "olmadı"
    ],
    "english_primary": "I was gutted",
    "alternatives": [
      "I was let down",
      "That really disappointed me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Hayal kırıklığı",
        "tr_gloss": "dream breaking",
        "en_fragment": "gutted",
        "bridge_type": "transform",
        "explanation": "Hayal/rüya kırıldı → bağırsak alındı (gutted); şiddetli iç boşluk hissi"
      }
    ],
    "cultural_insight": "\"Gutted\" İngiliz argosunda çok güçlü hayal kırıklığı. Kelimenin tam anlamı \"iç organları çıkarılmış\". Türkçe hayal kırıklığı daha şiirsel.",
    "fluency_tip": "\"I was really hoping for...\" ve \"That's a shame\" (yazık) kibarca hayal kırıklığı için çok kullanışlı."
  },
  {
    "id": 45,
    "category": "sosyal",
    "tr": "Burnunu sokuyor",
    "tags": [
      "burnunu sok",
      "karışıyor",
      "işine karışıyor",
      "müdahale",
      "karışma"
    ],
    "english_primary": "They keep sticking their nose in",
    "alternatives": [
      "They can't mind their own business",
      "They're always interfering"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Burnunu sokuyor",
        "tr_gloss": "sticking their nose in",
        "en_fragment": "sticking their nose in",
        "bridge_type": "direct",
        "explanation": "Çok nadir doğrudan metafor eşleşmesi! İki dil de burun metaforunu kullanıyor"
      }
    ],
    "cultural_insight": "Bu muhtemelen Türkçe deyimin İngilizceden çevrildiğini ya da iki dilin aynı beden metaforunu bağımsız geliştirdiğini gösteriyor. \"Mind your own business\" (kendi işine bak) temel ifade.",
    "fluency_tip": "\"Stay in your lane\" (kendi şeridinde kal) modern ve çok yaygın."
  },
  {
    "id": 46,
    "category": "sosyal",
    "tr": "Yüz yüze konuşalım",
    "tags": [
      "yüz yüze",
      "birebir",
      "konuşalım",
      "görüşelim"
    ],
    "english_primary": "Let's talk face to face",
    "alternatives": [
      "Let's sit down and talk",
      "I'd rather speak in person"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Yüz yüze",
        "tr_gloss": "face to face",
        "en_fragment": "face to face",
        "bridge_type": "direct",
        "explanation": "Birebir çeviri; iki dil aynı metaforu paylaşıyor"
      }
    ],
    "cultural_insight": "İlginç bir birebir eşleşme. \"In person\" daha modern; \"one-on-one\" (bire bir) iş ortamında çok yaygın.",
    "fluency_tip": "\"Can we grab a coffee and chat?\" (kahve içip konuşalım mı?) çok doğal davet."
  },
  {
    "id": 50,
    "category": "deyimler",
    "tr": "Üstümden yük kalktı",
    "tags": [
      "üstümden yük kalktı",
      "yük kalktı",
      "rahatlama",
      "kurtuldum",
      "nefes aldım"
    ],
    "english_primary": "A weight has been lifted off my shoulders",
    "alternatives": [
      "I feel like a new person",
      "What a load off my mind"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Üstümden",
        "tr_gloss": "from on top of me",
        "en_fragment": "off my shoulders",
        "bridge_type": "transform",
        "explanation": "Türkçe üst (tüm vücut); İngilizce omuzlar (responsibility=omuzlara yüklenen şey)"
      },
      {
        "tr_fragment": "yük kalktı",
        "tr_gloss": "the weight/load rose",
        "en_fragment": "a weight has been lifted",
        "bridge_type": "direct",
        "explanation": "Yük/weight metaforu iki dilde de benzer; kalkma/lifting hareketi aynı"
      }
    ],
    "cultural_insight": "\"Shoulders\" sorumluluk taşıma merkezi olarak İngilizcede çok simgesel. \"Load off my mind\" ise zihinsel yükü vurguluyor.",
    "fluency_tip": "\"That's such a relief\" en kısa ve yaygın tepki."
  },
  {
    "id": 51,
    "category": "deyimler",
    "tr": "Burnumdan getirdi",
    "tags": [
      "burnumdan getirdi",
      "bunalttı",
      "canımı çıkardı",
      "bezdirdi",
      "çıldırttı"
    ],
    "english_primary": "They drove me absolutely crazy",
    "alternatives": [
      "They really pushed my buttons",
      "They wore me down"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Burnumdan",
        "tr_gloss": "from my nose",
        "en_fragment": "absolutely",
        "bridge_type": "drop",
        "explanation": "Türkçe burun metaforu İngilizcede kaybolur — karşılığı yok"
      },
      {
        "tr_fragment": "getirdi",
        "tr_gloss": "brought (me to)",
        "en_fragment": "drove me crazy",
        "bridge_type": "transform",
        "explanation": "Getirme eylemi → sürme/zorla götürme; İngilizce aktif bir ulaştırma metaforu kullanıyor"
      }
    ],
    "cultural_insight": "Türkçe \"burnumdan getirmek\" çok özgün. İngilizcede bunu tam karşılayan tek bir deyim yok. En yakını \"drove me up the wall\" veya \"pushed me to my limit\".",
    "fluency_tip": "\"I've had it up to here\" (buraya kadar doldum) jestli söylendiğinde çok etkili."
  },
  {
    "id": 52,
    "category": "deyimler",
    "tr": "Ağzı açık kaldı",
    "tags": [
      "ağzı açık",
      "şaşırdı",
      "şaşkına döndü",
      "donup kaldı"
    ],
    "english_primary": "Their jaw dropped",
    "alternatives": [
      "They were gobsmacked",
      "They couldn't believe their eyes"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzı açık kaldı",
        "tr_gloss": "their mouth stayed open",
        "en_fragment": "jaw dropped",
        "bridge_type": "transform",
        "explanation": "Türkçe ağız açık kalmak (statik); İngilizce çene düşmek (dinamik hareket)"
      }
    ],
    "cultural_insight": "Her iki dil de ağız/çene ile şaşkınlığı anlatıyor. Türkçede ağız açık kalır (dondurulmuş); İngilizcede çene aşağı düşer (hareketi var). \"Gobsmacked\" İngiltere'de çok yaygın.",
    "fluency_tip": "\"They were speechless\" (sözsüz kaldı) ve \"They didn't know what to say\" çok kullanışlı."
  },
  {
    "id": 53,
    "category": "deyimler",
    "tr": "Lafı dolandırdı",
    "tags": [
      "lafı dolandır",
      "doğrudan söyleme",
      "etrafından dolan",
      "çevresinde dol"
    ],
    "english_primary": "Beating around the bush",
    "alternatives": [
      "Not getting to the point",
      "Dancing around the issue"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Lafı dolandırdı",
        "tr_gloss": "winding the words around",
        "en_fragment": "beating around the bush",
        "bridge_type": "transform",
        "explanation": "Türkçe kelime dolandırma (dönme); İngilizce çalı etrafında vurma — ikisi de dolaylı olmayı anlatıyor"
      }
    ],
    "cultural_insight": "\"Beating around the bush\" avlanmadan geliyor: avı doğrudan yakalamak yerine çalıları dövmek. Türkçe metafor dil üzerine, İngilizce eylem üzerine.",
    "fluency_tip": "\"Just get to the point\" (direkt söyle) veya \"Stop sugarcoating it\" (şekerlemeyi bırak) iyi tepkiler."
  },
  {
    "id": 54,
    "category": "deyimler",
    "tr": "Parmak ısırdı",
    "tags": [
      "parmak ısır",
      "inanılmaz",
      "şaşırtıcı",
      "çok güzel",
      "hayran kaldı"
    ],
    "english_primary": "Absolutely jaw-dropping",
    "alternatives": [
      "Mind-blowingly good",
      "Out of this world"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Parmak ısırdı",
        "tr_gloss": "finger biting",
        "en_fragment": "jaw-dropping",
        "bridge_type": "transform",
        "explanation": "Türkçe parmak ısırmak (hayranlıkla/kıskançlıkla) → İngilizce çene düşme; beden dili metaforu"
      }
    ],
    "cultural_insight": "\"Parmak ısırmak\" kıskanma + hayranlık karışımı; tam İngilizce karşılığı yok. \"Jaw-dropping\" sadece hayranlık. \"Eat your heart out\" kıskanma kısmını yakalıyor.",
    "fluency_tip": "\"It was insane\" (deliceydi), \"That blew my mind\" (aklımı uçurdu) çok modern."
  },
  {
    "id": 55,
    "category": "deyimler",
    "tr": "Dili tutuldu",
    "tags": [
      "dili tutuldu",
      "söyleyemedi",
      "susup kaldı",
      "konuşamadı"
    ],
    "english_primary": "They were lost for words",
    "alternatives": [
      "They were at a loss for words",
      "They went completely silent"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dili tutuldu",
        "tr_gloss": "their tongue was held/caught",
        "en_fragment": "lost for words",
        "bridge_type": "transform",
        "explanation": "Türkçe dil pasif olarak tutuluyor (dışarıdan); İngilizce kelimeler kaybolup bulunamazlaşıyor"
      }
    ],
    "cultural_insight": "Türkçede dil (tongue) konuşma merkezi; İngilizcede \"words\" konuşma merkezi. Her iki dil de konuşamamayı anlatıyor ama beden organı vs. araç olarak.",
    "fluency_tip": "\"Speechless\" en kısa; \"I was dumbfounded\" (dumb=suskun+founded=temelini attı) güçlü ve kalıcı."
  },
  {
    "id": 56,
    "category": "deyimler",
    "tr": "Gözü açık değil",
    "tags": [
      "gözü açık değil",
      "farkında değil",
      "anlamıyor",
      "görmüyor",
      "naif",
      "saf"
    ],
    "english_primary": "They don't know what hit them",
    "alternatives": [
      "They have no idea what's going on",
      "They're completely oblivious"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gözü açık değil",
        "tr_gloss": "their eye is not open",
        "en_fragment": "oblivious",
        "bridge_type": "transform",
        "explanation": "Türkçe göz metaforu → İngilizce bilinç yokluğu; görmek ile farkında olmak arasındaki köprü"
      }
    ],
    "cultural_insight": "\"Gözü açık olmak\" deneyim ve farkındalık demek. İngilizcede \"eyes wide open\" tam bilinç için; \"oblivious\" (Latince: unutulmuş) ise farkındalık yokluğu.",
    "fluency_tip": "\"They have no clue\" (hiç fikri yok) çok günlük ve yaygın."
  },
  {
    "id": 57,
    "category": "deyimler",
    "tr": "Sonu gelmedi",
    "tags": [
      "sonu gelmedi",
      "bitmedi",
      "bitmiyor",
      "sonsuz",
      "uzun sürdü"
    ],
    "english_primary": "It went on forever",
    "alternatives": [
      "It never seemed to end",
      "It dragged on and on"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Sonu gelmedi",
        "tr_gloss": "its end didn't come",
        "en_fragment": "went on forever",
        "bridge_type": "transform",
        "explanation": "Türkçe son/uç gelmemesi → İngilizce sonsuzluğa uzama; zaman algısı farklı çerçeveleniyor"
      }
    ],
    "cultural_insight": "\"Dragging on\" çok görsel — bir şeyi zorla uzatmak. \"Forever\" (sonsuza dek) abartı, \"It felt like hours\" ise daha ölçülü.",
    "fluency_tip": "\"That was never-ending\" ve \"I thought it would never end\" çok doğal."
  },
  {
    "id": 58,
    "category": "deyimler",
    "tr": "Ağzından laf almak güç",
    "tags": [
      "ağzından laf almak",
      "konuşmuyor",
      "anlatmıyor",
      "bilgi almak güç",
      "suskunluk"
    ],
    "english_primary": "Getting blood from a stone",
    "alternatives": [
      "You can't get a word out of them",
      "Like pulling teeth"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzından laf almak",
        "tr_gloss": "to take words from their mouth",
        "en_fragment": "getting blood from a stone",
        "bridge_type": "transform",
        "explanation": "Türkçe ağızdan kelime çıkarmak → İngilizce taştan kan çıkarmak; imkansızlık metaforu güçleniyor"
      }
    ],
    "cultural_insight": "\"Like pulling teeth\" (diş çekmeye benziyor) çok çarpıcı. \"Taştan kan\" ve \"diş çekmek\" — İngilizce daha ağrılı metafor kullanıyor.",
    "fluency_tip": "\"They're not very forthcoming\" daha resmi; \"I can't get them to open up\" (içini açtıramıyorum) çok doğal."
  },
  {
    "id": 59,
    "category": "deyimler",
    "tr": "Eli boş geldi",
    "tags": [
      "eli boş",
      "boş el",
      "hediyesiz geldi",
      "bir şey getirmedi"
    ],
    "english_primary": "They showed up empty-handed",
    "alternatives": [
      "They came with nothing",
      "They didn't bring anything"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Eli boş",
        "tr_gloss": "their hand empty",
        "en_fragment": "empty-handed",
        "bridge_type": "direct",
        "explanation": "Bu çok nadir birebir eşleşme! Türkçe ve İngilizce aynı beden metaforunu kullanıyor"
      }
    ],
    "cultural_insight": "\"Empty-handed\" ve \"eli boş\" neredeyse birebir çeviri. İki dil bu kavramı aynı şekilde kavrıyor: boş el = getirilen bir şey yok.",
    "fluency_tip": "\"They didn't come bearing gifts\" (hediyelerle gelmediler) daha şiirsel; \"They arrived without anything\" daha düz."
  },
  {
    "id": 60,
    "category": "deyimler",
    "tr": "Dört gözle bekledi",
    "tags": [
      "dört gözle",
      "sabırsızlıkla bekliyorum",
      "bekliyor",
      "dört gözle bekle"
    ],
    "english_primary": "I'm looking forward to it so much",
    "alternatives": [
      "I can hardly wait",
      "I'm counting down the days"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Dört gözle",
        "tr_gloss": "with four eyes",
        "en_fragment": "looking forward",
        "bridge_type": "transform",
        "explanation": "Türkçe dört göz (çift beklenti, iki göz yetmiyor); İngilizce ileriye bakmak (ilerleme metaforu)"
      }
    ],
    "cultural_insight": "\"Dört gözle\" görme kapasitesini ikiye katlıyor — o kadar meraklı. \"Looking forward to\" ise bakışı geleceğe yöneltiyor. Güzel bir metafor farkı.",
    "fluency_tip": "\"Can't wait\" (bekleyemiyorum) en kısa ve en yaygın ifade."
  },
  {
    "id": 61,
    "category": "deyimler",
    "tr": "Sözünden döndü",
    "tags": [
      "sözünden döndü",
      "vaadini tutmadı",
      "sözünü tutmadı",
      "vaat",
      "söz"
    ],
    "english_primary": "They went back on their word",
    "alternatives": [
      "They broke their promise",
      "They didn't follow through"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Sözünden döndü",
        "tr_gloss": "to return from their word",
        "en_fragment": "went back on their word",
        "bridge_type": "direct",
        "explanation": "Her iki dil de \"söz/word\"den geri dönmek metaforunu kullanıyor — çok yakın eşleşme"
      }
    ],
    "cultural_insight": "\"Word\" (söz) İngilizcede de söz verme anlamında kutsal: \"I give you my word\". \"They didn't keep their word\" da çok doğal.",
    "fluency_tip": "\"They let me down\" (hayal kırıklığına uğrattı) bu durumda daha duygusal bir ifade."
  },
  {
    "id": 62,
    "category": "deyimler",
    "tr": "İşi gücü bu",
    "tags": [
      "işi gücü bu",
      "başka işi yok",
      "hep böyle yapıyor",
      "sürekli"
    ],
    "english_primary": "That's all they ever do",
    "alternatives": [
      "It's always the same with them",
      "That's their whole thing"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İşi gücü bu",
        "tr_gloss": "their work and labor is this",
        "en_fragment": "that's all they ever do",
        "bridge_type": "transform",
        "explanation": "Türkçe iş+güç (emek metaforu) → İngilizce tekrar+daima; kalıp davranış vurgusu farklı çerçeveleniyor"
      }
    ],
    "cultural_insight": "Türkçe \"iş gücü\" ekonomik bir metafor; bütün emeği buna gidiyor. İngilizce sadece frekansa odaklanıyor: her zaman bu.",
    "fluency_tip": "\"They never change\" ve \"Same old, same old\" çok yaygın kalıplar."
  },
  {
    "id": 70,
    "category": "sasirma",
    "tr": "İnanamıyorum",
    "tags": [
      "inanamıyorum",
      "inanılmaz",
      "inanmak",
      "şok oldum",
      "hayrete düştüm"
    ],
    "english_primary": "I can't believe this",
    "alternatives": [
      "No way!",
      "Are you serious right now?"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İnanamıyorum",
        "tr_gloss": "I can't believe it",
        "en_fragment": "I can't believe this",
        "bridge_type": "direct",
        "explanation": "Neredeyse birebir karşılık — iki dil de inanç yokluğunu kullanıyor"
      }
    ],
    "cultural_insight": "\"No way!\" kısa ve çok yaygın. \"You're kidding me\" (şaka yapıyorsun) veya \"Get out of here\" (gidiversene) şaşkınlığı daha renkli ifade ediyor.",
    "fluency_tip": "\"Shut up!\" (ABD argosunda) \"beni şaşırttın\" anlamında kullanılıyor — Türkçe \"sus\" ile karıştırma."
  },
  {
    "id": 71,
    "category": "sasirma",
    "tr": "Aklım almıyor",
    "tags": [
      "aklım almıyor",
      "anlamıyorum",
      "kavrayamıyorum",
      "idrak edemiyorum"
    ],
    "english_primary": "I can't wrap my head around it",
    "alternatives": [
      "It's beyond me",
      "I just can't grasp it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aklım almıyor",
        "tr_gloss": "my mind doesn't take it / accept it",
        "en_fragment": "can't wrap my head around it",
        "bridge_type": "transform",
        "explanation": "Türkçe akıl pasif (almıyor/reddediyor); İngilizce aktif kucaklama/sarma metaforu — kafa etrafını sarmak"
      }
    ],
    "cultural_insight": "İlginç metafor farkı: Türkçe anlayış kabul/reddetme; İngilizce anlayış fiziksel sarma. \"It's beyond me\" ise sınır/boyut metaforu.",
    "fluency_tip": "\"That makes no sense to me\" daha doğrudan; \"I'm having trouble understanding\" daha nazik."
  },
  {
    "id": 72,
    "category": "sasirma",
    "tr": "Bu nasıl mümkün",
    "tags": [
      "nasıl mümkün",
      "mümkün değil",
      "imkansız",
      "olamaz",
      "bu nasıl"
    ],
    "english_primary": "How on earth is that possible?",
    "alternatives": [
      "That can't be right",
      "I don't see how that's possible"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Bu nasıl mümkün",
        "tr_gloss": "how is this possible",
        "en_fragment": "How on earth",
        "bridge_type": "add",
        "explanation": "\"On earth\" İngilizcede vurgu için eklenen ifade; Türkçede karşılığı yok ama çok doğal hissettiriyor"
      }
    ],
    "cultural_insight": "\"On earth\" neden orada? Yeryüzündeki imkansızlığı vurguluyor. \"In the world\", \"on earth\", \"the hell\" hepsi aynı vurgu işlevini görüyor.",
    "fluency_tip": "\"That's impossible\" direkt; \"No way that's real\" şaşkın tepki; \"How?!\" tek kelime ama çok güçlü."
  },
  {
    "id": 73,
    "category": "sasirma",
    "tr": "Şaşırdım kaldım",
    "tags": [
      "şaşırdım",
      "şaşkın",
      "şaşkına döndüm",
      "donup kaldım",
      "dona kaldım"
    ],
    "english_primary": "I was completely taken aback",
    "alternatives": [
      "I was floored",
      "I didn't see that coming"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Şaşırdım kaldım",
        "tr_gloss": "I was surprised and remained",
        "en_fragment": "taken aback",
        "bridge_type": "transform",
        "explanation": "Türkçe dondurulmuş/sabitlenmiş kalma; İngilizce geri itilme (aback=geriye) metaforu"
      }
    ],
    "cultural_insight": "\"Taken aback\" yelken metaforundan geliyor: rüzgâr ters yönden gelip gemiyi geri iter. \"Floored\" ise yere serilmek gibi dramatik.",
    "fluency_tip": "\"That caught me off guard\" (hazırlıksız yakaladı) çok pratik; \"I wasn't expecting that\" en sade."
  },
  {
    "id": 74,
    "category": "sasirma",
    "tr": "Tam zamanında",
    "tags": [
      "tam zamanında",
      "tam vaktinde",
      "iyi ki geldin",
      "tam zamanı",
      "yerinde"
    ],
    "english_primary": "Just in the nick of time",
    "alternatives": [
      "Right on cue",
      "Not a moment too soon"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Tam zamanında",
        "tr_gloss": "exactly on time",
        "en_fragment": "nick of time",
        "bridge_type": "transform",
        "explanation": "Türkçe hassas zaman eşleşmesi → İngilizce çentik metaforu (nick=küçük çentik, dar boşluk)"
      }
    ],
    "cultural_insight": "\"Nick\" eski İngilizcede \"anda\" demekmiş. Saatin tam o noktasına gelme. Türkçe zamana odaklanıyor; İngilizce boşluk/sığınma metaforu kullanıyor.",
    "fluency_tip": "\"Perfect timing!\" ve \"You arrived just in time\" en günlük ifadeler."
  },
  {
    "id": 75,
    "category": "sasirma",
    "tr": "Gerçekten mi",
    "tags": [
      "gerçekten mi",
      "ciddiye mi",
      "şaka mı yapıyorsun",
      "ciddi mi"
    ],
    "english_primary": "Are you serious?",
    "alternatives": [
      "For real?",
      "You're not joking?"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gerçekten mi",
        "tr_gloss": "really? / truly?",
        "en_fragment": "Are you serious?",
        "bridge_type": "transform",
        "explanation": "Türkçe gerçeklik sorgular (bu gerçek mi?); İngilizce kişinin niyetini/ciddiyetini sorgular"
      }
    ],
    "cultural_insight": "Türkçe \"gerçekten mi\" dışsal gerçeği; İngilizce \"are you serious\" iç niyeti soruyor. Sonuç aynı ama çerçeve farklı.",
    "fluency_tip": "\"Seriously?!\" tonla söylendiğinde çok güçlü; \"No kidding?\" (şaka etmiyor değil mi) de yaygın."
  },
  {
    "id": 80,
    "category": "basari",
    "tr": "Başardım sonunda",
    "tags": [
      "başardım",
      "sonunda başardım",
      "yaptım",
      "becerdim",
      "hallettim"
    ],
    "english_primary": "I finally pulled it off",
    "alternatives": [
      "I did it!",
      "I finally made it happen"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Başardım",
        "tr_gloss": "I succeeded",
        "en_fragment": "pulled it off",
        "bridge_type": "transform",
        "explanation": "Başarı → bir şeyi çekerek kurtarmak; zor bir şeyi başarıyla tamamlama metaforu"
      },
      {
        "tr_fragment": "sonunda",
        "tr_gloss": "finally / at the end",
        "en_fragment": "finally",
        "bridge_type": "direct",
        "explanation": "Zaman belirteci doğrudan karşılık geliyor"
      }
    ],
    "cultural_insight": "\"Pull it off\" başarının zor olduğunu ima eder. Sadece \"I succeeded\" yeterli ama renksiz. \"Nailed it\" (çivi çaktım) tam isabetle başarmak.",
    "fluency_tip": "\"I actually did it\" (gerçekten yaptım) şaşkın bir başarı ifadesi; \"I crushed it\" çok güçlü ve modern."
  },
  {
    "id": 81,
    "category": "basari",
    "tr": "Mahvettim her şeyi",
    "tags": [
      "mahvettim",
      "berbat ettim",
      "mahvettim her şeyi",
      "alt üst ettim",
      "mahvoldu"
    ],
    "english_primary": "I completely screwed it up",
    "alternatives": [
      "I messed everything up",
      "I really blew it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Mahvettim",
        "tr_gloss": "I ruined / destroyed",
        "en_fragment": "screwed it up",
        "bridge_type": "transform",
        "explanation": "Türkçe mahvetmek genel yıkım; İngilizce vida/vida sökme metaforu ile fiziksel bozma"
      }
    ],
    "cultural_insight": "\"Screw up\" vida metaforundan geliyor. \"Blow it\" üfleyip dağıtmak. \"Botch it\" amatörce bozmak. Türkçe \"mahvettim\" daha dramatik ve geniş kapsamlı.",
    "fluency_tip": "\"That was my fault\" (benim hatam) ve \"I take full responsibility\" daha resmi kabul ifadeleri."
  },
  {
    "id": 82,
    "category": "basari",
    "tr": "Elinden geleni yaptı",
    "tags": [
      "elinden geleni yaptı",
      "elinden geleni yap",
      "çabaladı",
      "uğraştı",
      "çok denedi"
    ],
    "english_primary": "They gave it their all",
    "alternatives": [
      "They did their best",
      "They went all out"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Elinden geleni",
        "tr_gloss": "what comes from their hand",
        "en_fragment": "their all",
        "bridge_type": "transform",
        "explanation": "Türkçe el metaforu (kapasitesini elleriyle veriyor); İngilizce tüm varlığı verme (all=tümü)"
      }
    ],
    "cultural_insight": "\"Gave it their all\" çok yaygın ve güçlü. \"Did their best\" daha günlük. \"Went above and beyond\" ise beklentiyi aşmak için.",
    "fluency_tip": "\"They tried their hardest\" ve \"You couldn't ask for more\" güzel takdir ifadeleri."
  },
  {
    "id": 83,
    "category": "basari",
    "tr": "Artık yeter",
    "tags": [
      "artık yeter",
      "yeter",
      "bıktım",
      "dayanamıyorum",
      "tahammülüm kalmadı"
    ],
    "english_primary": "I've had enough",
    "alternatives": [
      "That's it, I'm done",
      "I've reached my limit"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Artık",
        "tr_gloss": "anymore / now",
        "en_fragment": "I've had",
        "bridge_type": "add",
        "explanation": "\"I've had\" geçmiş deneyim birikimini vurguluyor — Türkçede bu zaman boyutu gizli"
      },
      {
        "tr_fragment": "yeter",
        "tr_gloss": "enough / sufficient",
        "en_fragment": "enough",
        "bridge_type": "direct",
        "explanation": "Yeterlilik ifadesi benzer"
      }
    ],
    "cultural_insight": "\"I've had enough\" birikmiş yorgunluğu anlatır. \"That's it\" (işte bu kadar) sınırı ilan eder. \"I'm done\" ise tamamen çekilmeyi.",
    "fluency_tip": "\"I'm over it\" (bitirdim artık) çok modern; \"I wash my hands of this\" (ellerimi yıkıyorum — sorumluluk bırakmak) daha güçlü."
  },
  {
    "id": 84,
    "category": "basari",
    "tr": "Vazgeçiyorum",
    "tags": [
      "vazgeçiyorum",
      "vazgeçtim",
      "bırakıyorum",
      "bıraktım",
      "terk ediyorum"
    ],
    "english_primary": "I'm throwing in the towel",
    "alternatives": [
      "I give up",
      "I'm calling it quits"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Vazgeçiyorum",
        "tr_gloss": "I'm letting go / releasing",
        "en_fragment": "throwing in the towel",
        "bridge_type": "transform",
        "explanation": "Türkçe bırakmak → İngilizce boks havluyunu ringe atmak; pes etme ritüeli"
      }
    ],
    "cultural_insight": "\"Throwing in the towel\" bokstan geliyor: antrenör havlu atar ve maçı durdurur. \"I give up\" daha basit ama \"throwing in the towel\" dramayı ve kararlılığı yansıtıyor.",
    "fluency_tip": "\"I'm done trying\" ve \"I can't do this anymore\" daha günlük ve duygusal."
  },
  {
    "id": 85,
    "category": "basari",
    "tr": "İlk denemede başardım",
    "tags": [
      "ilk denemede",
      "ilk seferde",
      "birinci denemede",
      "anında başardım"
    ],
    "english_primary": "I got it on the first try",
    "alternatives": [
      "I nailed it first time",
      "First attempt, done"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İlk denemede",
        "tr_gloss": "in the first attempt",
        "en_fragment": "on the first try",
        "bridge_type": "direct",
        "explanation": "İlk deneme kavramı iki dilde benzer; preposition farkı var (de → on)"
      },
      {
        "tr_fragment": "başardım",
        "tr_gloss": "I succeeded",
        "en_fragment": "I got it",
        "bridge_type": "transform",
        "explanation": "Başarı → elde etmek; \"got it\" anlamayı veya almayı da kastediyor"
      }
    ],
    "cultural_insight": "\"Nailed it\" (çivi çaktım) tam, kesin başarı için. \"Aced it\" (as aldım) de çok yaygın. Her ikisi de ilk denemede mükemmeliyeti ima ediyor.",
    "fluency_tip": "\"First try\" yerine \"first attempt\" daha resmi; \"one and done\" (bir ve bitti) serbest bir ifade."
  },
  {
    "id": 90,
    "category": "gunluk",
    "tr": "Harika bir gün geçirdim",
    "tags": [
      "harika gün",
      "iyi gün",
      "güzel gün",
      "muhteşem gün",
      "güzel geçti"
    ],
    "english_primary": "I had an amazing day",
    "alternatives": [
      "Today was absolutely brilliant",
      "What a great day it's been"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Harika",
        "tr_gloss": "wonderful / amazing",
        "en_fragment": "amazing",
        "bridge_type": "direct",
        "explanation": "Pozitif sıfat benzer anlam taşıyor"
      },
      {
        "tr_fragment": "gün geçirdim",
        "tr_gloss": "I spent the day",
        "en_fragment": "I had",
        "bridge_type": "transform",
        "explanation": "Türkçe günü geçirmek (harcamak); İngilizce günü sahiplenmek/almak (had)"
      }
    ],
    "cultural_insight": "\"Spent\" zaman harcamak = para gibi. \"Had\" sahiplik. İngilizce günü bir deneyim olarak alıyor, Türkçe ise içinden geçiyor.",
    "fluency_tip": "\"Today was great\" en sade; \"I had a blast\" (patlamak gibi eğlendim) çok enerjik."
  },
  {
    "id": 91,
    "category": "gunluk",
    "tr": "Rezil bir gün geçirdim",
    "tags": [
      "rezil gün",
      "berbat gün",
      "kötü gün",
      "kötü geçti",
      "süper olmadı"
    ],
    "english_primary": "Today was an absolute nightmare",
    "alternatives": [
      "I had the worst day",
      "Today was a disaster from start to finish"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Rezil",
        "tr_gloss": "disgraceful / terrible",
        "en_fragment": "absolute nightmare",
        "bridge_type": "transform",
        "explanation": "Rezil sosyal utanç içeriyor; \"nightmare\" (kabus) tamamen farklı bir metafor: uyku korkusu gibi korkunç"
      }
    ],
    "cultural_insight": "\"Nightmare\" uyku sırasındaki korku — ama İngilizce bunu gerçek hayattaki kötü deneyimlere uyguluyor. Türkçe \"rezil\" utanç odaklı; İngilizce korku odaklı.",
    "fluency_tip": "\"Rough day\" (sert/zor gün) daha hafif; \"Today was a mess\" (bugün bir kaos) çok doğal."
  },
  {
    "id": 92,
    "category": "gunluk",
    "tr": "Çok eğlendim",
    "tags": [
      "çok eğlendim",
      "eğlendim",
      "eğlenceli",
      "çok güldüm",
      "güldük"
    ],
    "english_primary": "I had a blast",
    "alternatives": [
      "We had so much fun",
      "It was an absolute riot"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Çok eğlendim",
        "tr_gloss": "I had a lot of fun",
        "en_fragment": "had a blast",
        "bridge_type": "transform",
        "explanation": "Eğlenmek → patlama (blast=patlama); eğlencenin şiddeti patlayıcı olarak anlatılıyor"
      }
    ],
    "cultural_insight": "\"Blast\" patlayıcı metafor. \"Riot\" isyan; eğlence o kadar büyük ki kontrol kayboldu. \"We killed it\" (öldürdük) başarılı performans için de kullanılıyor.",
    "fluency_tip": "\"That was so much fun\" sade ve etkili; \"I haven't laughed that hard in ages\" çok duygusal."
  },
  {
    "id": 93,
    "category": "gunluk",
    "tr": "Geçmiş olsun",
    "tags": [
      "geçmiş olsun",
      "iyi olursun",
      "çabuk iyileş",
      "şifalar"
    ],
    "english_primary": "Get well soon",
    "alternatives": [
      "I hope you feel better",
      "Take care of yourself"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Geçmiş olsun",
        "tr_gloss": "may it pass / let it pass",
        "en_fragment": "get well",
        "bridge_type": "transform",
        "explanation": "Türkçe hastalığın geçmesini dilemek (pasif, zaman içinde geçer); İngilizce iyileşme eylemini vurguluyor (get well = iyileş)"
      }
    ],
    "cultural_insight": "Türkçe \"geçsin\" zamanın şifayla gelmesini diliyor. İngilizcede aktif iyileşme beklentisi var. \"I'm sorry to hear that\" Batı kültüründe empati bildirme için çok önemli.",
    "fluency_tip": "\"Hope you feel better soon\" çok yaygın; \"Sending you good vibes\" (iyi enerji gönderiyorum) modern."
  },
  {
    "id": 94,
    "category": "gunluk",
    "tr": "Kahve içelim mi",
    "tags": [
      "kahve içelim",
      "kahve",
      "bir içelim",
      "buluşalım",
      "görüşelim"
    ],
    "english_primary": "Want to grab a coffee?",
    "alternatives": [
      "Shall we catch up over coffee?",
      "Let's get coffee sometime"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kahve içelim mi",
        "tr_gloss": "shall we drink coffee?",
        "en_fragment": "grab a coffee",
        "bridge_type": "transform",
        "explanation": "Türkçe içmek (yudumlamak); İngilizce grab (yakalamak/almak) — kahve hızlı ve pratik bir şey olarak çerçeveleniyor"
      }
    ],
    "cultural_insight": "\"Grab\" hız ve gündelik pratikliği anlatıyor. İngilizce kültüründe \"coffee\" sosyalleşme için evrensel bir davettir. \"Let's catch up\" (haberleşelim) sosyal yeniden bağlantı.",
    "fluency_tip": "\"Coffee?\" tek kelime ama tonla çok şey anlatır; \"My treat\" (ben ısmarlıyorum) ekleyebilirsin."
  },
  {
    "id": 95,
    "category": "gunluk",
    "tr": "Nasıl geçti",
    "tags": [
      "nasıl geçti",
      "nasıldı",
      "iyi miydi",
      "nasıl gitti"
    ],
    "english_primary": "How did it go?",
    "alternatives": [
      "How was it?",
      "How'd everything go?"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Nasıl geçti",
        "tr_gloss": "how did it pass?",
        "en_fragment": "how did it go?",
        "bridge_type": "transform",
        "explanation": "Türkçe zaman/deneyim geçiyor (pasif akış); İngilizce eylem gidiyor (go=gitmek)"
      }
    ],
    "cultural_insight": "İngilizce \"go\" (gitmek) deneyimin hareket ettiğini ima ediyor. Türkçe \"geçmek\" zamanın akmasını. Her iki dil de tamamlanmış deneyimi soruyor ama metafor farklı.",
    "fluency_tip": "\"How was your day?\" standart; \"How did it turn out?\" (nasıl sonuçlandı?) meraklı takip sorusu."
  },
  {
    "id": 96,
    "category": "gunluk",
    "tr": "Kendine iyi bak",
    "tags": [
      "kendine iyi bak",
      "iyi bak",
      "sağlıklı ol",
      "güvende kal"
    ],
    "english_primary": "Take care of yourself",
    "alternatives": [
      "Look after yourself",
      "Stay safe"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kendine",
        "tr_gloss": "to yourself",
        "en_fragment": "yourself",
        "bridge_type": "direct",
        "explanation": "Refleksif yapı benzer"
      },
      {
        "tr_fragment": "iyi bak",
        "tr_gloss": "look after well",
        "en_fragment": "take care",
        "bridge_type": "transform",
        "explanation": "Türkçe \"bakmak\" (gözlemlemek/korumak); İngilizce \"take care\" (özen göstermek/almak) — bakım almak vs. vermek"
      }
    ],
    "cultural_insight": "\"Take care\" vedalaşırken çok yaygın. \"Look after yourself\" biraz daha İngiliz kültürüne özgü. \"Stay safe\" pandemi sonrası çok popüler.",
    "fluency_tip": "\"Take care!\" vedada tek başına yeterli ve çok doğal."
  },
  {
    "id": 97,
    "category": "gunluk",
    "tr": "Kolay gelsin",
    "tags": [
      "kolay gelsin",
      "iyi çalışmalar",
      "güle güle çalış"
    ],
    "english_primary": "Good luck with it",
    "alternatives": [
      "Hope it goes smoothly",
      "All the best with it"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kolay gelsin",
        "tr_gloss": "may it come easy",
        "en_fragment": "Hope it goes smoothly",
        "bridge_type": "transform",
        "explanation": "Türkçe kolaylık diliyor (zorluk gelmesin); İngilizce pürüzsüz gidişini diliyor. Her ikisi de aynı niyetle farklı metafor"
      },
      {
        "tr_fragment": "(yok)",
        "tr_gloss": "(absence)",
        "en_fragment": "Good luck",
        "bridge_type": "add",
        "explanation": "\"Luck\" (şans) Türkçe \"kolay gelsin\"de yok; İngilizce karşılığı şans kavramı ekliyor"
      }
    ],
    "cultural_insight": "\"Kolay gelsin\" Türkçeye özgü güzel bir dilek. İngilizcede tam karşılığı yok. \"Good luck\" şansa odaklanıyor; \"Hope it's not too bad\" (çok kötü olmaz umarım) daha yakın ama garip.",
    "fluency_tip": "\"Hope everything goes well!\" veya \"Let me know how it goes\" (nasıl gittiğini söyle) çok doğal."
  },
  {
    "id": 98,
    "category": "gunluk",
    "tr": "Acelem var",
    "tags": [
      "acelem var",
      "acele",
      "koşuyorum",
      "geç kalıyorum",
      "acelem"
    ],
    "english_primary": "I'm in a rush",
    "alternatives": [
      "I'm running late",
      "I've got to run"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Acelem var",
        "tr_gloss": "I have haste",
        "en_fragment": "I'm in a rush",
        "bridge_type": "transform",
        "explanation": "Türkçe acelenim var (sahiplik); İngilizce bir koşu içindeyim (hareket metaforu)"
      }
    ],
    "cultural_insight": "\"Rush\" (acele koşu) hareket içeriyor. \"Running late\" (koşarak geç) de koşu metaforu. İngilizce aceleyi fiziksel hareketle anlatıyor; Türkçe sahiplik.",
    "fluency_tip": "\"Gotta run!\" (koşmam lazım) çok yaygın veda; \"I'll catch you later\" (sonra görüşürüz) bununla harika gider."
  },
  {
    "id": 99,
    "category": "gunluk",
    "tr": "Aklıma gelmedi",
    "tags": [
      "aklıma gelmedi",
      "unuttu",
      "hatırlamadım",
      "düşünemedim",
      "aklıma gelme"
    ],
    "english_primary": "It slipped my mind",
    "alternatives": [
      "I completely forgot",
      "It didn't occur to me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aklıma gelmedi",
        "tr_gloss": "it didn't come to my mind",
        "en_fragment": "slipped my mind",
        "bridge_type": "transform",
        "explanation": "Türkçe bilgi zihne gelmiyor (yokluğu); İngilizce bilgi oradayken kayıp gidiyor (slipped=kaydı)"
      }
    ],
    "cultural_insight": "\"Slipped\" kaymak — bilgi vardı ama tutamadım. Türkçe bilgi hiç gelmedi. İki farklı unutma metaforu: biri gelmiyor, biri kaçıyor.",
    "fluency_tip": "\"My bad, I forgot\" (benim hatamdı, unutmuştum) özür için çok doğal; \"It's been on my to-do list\" (yapacaklar listesindeydi) hafif mizah içeriyor."
  },
  {
    "id": 100,
    "category": "gunluk",
    "tr": "Merak ediyorum",
    "tags": [
      "merak ediyorum",
      "merak",
      "merak etti",
      "acaba",
      "öğrenmek istiyorum"
    ],
    "english_primary": "I'm curious about it",
    "alternatives": [
      "I wonder about it",
      "I'd love to know"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Merak ediyorum",
        "tr_gloss": "I'm curious / I wonder",
        "en_fragment": "I'm curious",
        "bridge_type": "direct",
        "explanation": "Merak = curiosity; neredeyse birebir eşleşme"
      }
    ],
    "cultural_insight": "\"Curious\" (Latince: cura=özen) bilgi için özen göstermek. \"I wonder\" daha spekülatif. \"I'd love to know\" arzuyu vurguluyor.",
    "fluency_tip": "\"Just wondering...\" (sadece merak ettim) kibarca soru sormaya çok uygun giriş."
  },
  {
    "id": 101,
    "category": "gunluk",
    "tr": "Nasılsın",
    "tags": [
      "nasılsın",
      "nasıl",
      "naber",
      "ne var ne yok",
      "iyi misin"
    ],
    "english_primary": "How are you doing?",
    "alternatives": [
      "How's it going?",
      "What's up?"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Nasılsın",
        "tr_gloss": "how are you",
        "en_fragment": "How are you doing?",
        "bridge_type": "transform",
        "explanation": "Türkçe durumu soruyor (nasılsın); İngilizce eylemi soruyor (ne yapıyorsun/nasıl gidiyor)"
      }
    ],
    "cultural_insight": "\"How are you?\" genellikle gerçek soru değil, selamlama. \"Fine, thanks\" standart cevap. Türkçe \"nasılsın\" daha samimi merak içerebilir.",
    "fluency_tip": "\"What's new?\" (ne yenilik var?), \"How's life treating you?\" (hayat nasıl gidiyor?) daha sıcak alternatifler."
  },
  {
    "id": 102,
    "category": "gunluk",
    "tr": "Hiç beklentim yoktu",
    "tags": [
      "beklentim yoktu",
      "beklemiyordum",
      "sürpriz oldu",
      "tahmin edemedim"
    ],
    "english_primary": "I had no expectations at all",
    "alternatives": [
      "I didn't see that coming",
      "I went in with an open mind"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Hiç beklentim yoktu",
        "tr_gloss": "I had zero expectation",
        "en_fragment": "went in with an open mind",
        "bridge_type": "transform",
        "explanation": "Türkçe beklenti yokluğu → İngilizce açık fikirlilik; pasif yokluk vs. aktif açıklık"
      }
    ],
    "cultural_insight": "\"Open mind\" (açık akıl) pozitif bir tutum. Türkçe beklenti yokluğu nötr. İngilizce aynı durumu olumlu bir tutum olarak çerçeveler.",
    "fluency_tip": "\"I was pleasantly surprised\" (güzel şekilde şaşırdım) harika bir follow-up ifade."
  },
  {
    "id": 110,
    "category": "duygular",
    "tr": "Neşeliydim bugün",
    "tags": [
      "neşeli",
      "neşeliyim",
      "keyifliyim",
      "keyfim yerinde"
    ],
    "english_primary": "I was in a great mood today",
    "alternatives": [
      "I was feeling upbeat",
      "I was on top of the world"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Neşeliyim",
        "tr_gloss": "I'm cheerful",
        "en_fragment": "great mood",
        "bridge_type": "transform",
        "explanation": "Türkçe neşe iç ses/ışık; İngilizce \"mood\" (hava durumu gibi) geçici durum"
      }
    ],
    "cultural_insight": "\"Mood\" hava durumu gibi gelip giden bir şey. \"In good spirits\" içsel durum. \"On top of the world\" en yüksek mutluluk.",
    "fluency_tip": "\"I woke up on the right side of the bed\" (yataktan doğru taraftan kalktım) gününün iyi başladığını anlatır."
  },
  {
    "id": 111,
    "category": "gunluk",
    "tr": "Sıkıntı yok",
    "tags": [
      "sıkıntı yok",
      "sorun yok",
      "tamam",
      "olur",
      "evet"
    ],
    "english_primary": "No worries",
    "alternatives": [
      "No problem",
      "All good"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Sıkıntı yok",
        "tr_gloss": "there is no trouble",
        "en_fragment": "no worries",
        "bridge_type": "transform",
        "explanation": "Türkçe sıkıntı (genel sorun); İngilizce worries (kaygılar) — zihinsel endişe boyutunu ekliyor"
      }
    ],
    "cultural_insight": "\"No worries\" Avustralya kökenli, artık globalde çok yaygın. \"No problem\" Amerikan standardı. \"Don't mention it\" daha kibar.",
    "fluency_tip": "\"All good!\" çok modern; \"Don't sweat it\" (terini dökme yani endişelenme) biraz daha Amerikan."
  },
  {
    "id": 112,
    "category": "yogunluk",
    "tr": "Biraz nefes almam lazım",
    "tags": [
      "nefes almam lazım",
      "biraz ara",
      "mola",
      "dinlenmem lazım",
      "duraksama"
    ],
    "english_primary": "I need a breather",
    "alternatives": [
      "I need to step back",
      "I need to take a break"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "nefes almam lazım",
        "tr_gloss": "I need to breathe",
        "en_fragment": "need a breather",
        "bridge_type": "direct",
        "explanation": "Her iki dil de nefes metaforunu kullanıyor; \"breather\" kısa nefes duraklama"
      }
    ],
    "cultural_insight": "\"Breather\" kısa mola için çok doğal. \"Take five\" (beş al) set ortamından geliyor. \"Decompress\" (basıncı azalt) daha zihinsel.",
    "fluency_tip": "\"Let's take a ten-minute break\" somut; \"I need to clear my head\" (kafamı temizlemem lazım) metaforik."
  },
  {
    "id": 113,
    "category": "sosyal",
    "tr": "Ne zamandır görüşmedik",
    "tags": [
      "ne zamandır",
      "uzun zaman",
      "görüşmedik",
      "görmedin"
    ],
    "english_primary": "It's been ages",
    "alternatives": [
      "Long time no see",
      "We haven't crossed paths in forever"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ne zamandır görüşmedik",
        "tr_gloss": "it's been so long since we met",
        "en_fragment": "it's been ages",
        "bridge_type": "transform",
        "explanation": "Türkçe soru + olumsuz (ne zamandır göremiyoruz?); İngilizce çağlar (ages) = tarihsel uzunluk"
      }
    ],
    "cultural_insight": "\"Ages\" (çağlar) abartılı ama çok doğal. \"Long time no see\" Çince yapısından gelen ilginç bir kalıp. İkisi de çok yaygın.",
    "fluency_tip": "\"Where have you been hiding?\" (nerede saklandın?) şakacı ve samimi."
  },
  {
    "id": 114,
    "category": "deyimler",
    "tr": "Her şeyi mahvetti",
    "tags": [
      "her şeyi mahvetti",
      "mahvetti",
      "berbat etti",
      "alt üst etti",
      "rezil etti"
    ],
    "english_primary": "They ruined everything",
    "alternatives": [
      "They threw a wrench in the works",
      "They spoiled it for everyone"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Her şeyi mahvetti",
        "tr_gloss": "ruined everything",
        "en_fragment": "threw a wrench in the works",
        "bridge_type": "transform",
        "explanation": "Mahvetmek genel yıkım → makineye anahtar atmak; spesifik sabotaj metaforu"
      }
    ],
    "cultural_insight": "\"Throw a wrench in the works\" (İngiltere: spanner in the works) makineye alet atmak = sistemi bozmak. Türkçeden daha spesifik ve görsel.",
    "fluency_tip": "\"They messed it all up\" en doğrudan; \"They were a loose cannon\" (dizginsiz top) öngörülemeyen biri için."
  },
  {
    "id": 115,
    "category": "sasirma",
    "tr": "Bu çok tuhaf",
    "tags": [
      "tuhaf",
      "garip",
      "acayip",
      "ilginç",
      "anlaşılmaz"
    ],
    "english_primary": "That's really bizarre",
    "alternatives": [
      "That's weird",
      "That's out of the ordinary"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "çok tuhaf",
        "tr_gloss": "very strange / odd",
        "en_fragment": "really bizarre",
        "bridge_type": "direct",
        "explanation": "Her iki dil de yabancılık/anormallık için benzer sıfat kullanıyor; yoğunlaştırıcılar eşleşiyor"
      }
    ],
    "cultural_insight": "\"Bizarre\" Fransızcadan geliyor. \"Weird\" daha günlük. \"Out of left field\" (soldan gelen) beyzboldan — beklenmedik ve garip.",
    "fluency_tip": "\"That's odd\" nötr; \"That's out there\" (çok uzakta) modern argoda çok tuhaf demek."
  },
  {
    "id": 116,
    "category": "basari",
    "tr": "İşi bitirdim",
    "tags": [
      "işi bitirdim",
      "hallettim",
      "tamamladım",
      "bitti",
      "tamam ettim"
    ],
    "english_primary": "I wrapped it up",
    "alternatives": [
      "I got it done",
      "I finished the job"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İşi bitirdim",
        "tr_gloss": "I finished the work",
        "en_fragment": "wrapped it up",
        "bridge_type": "transform",
        "explanation": "Bitirmek → sarmak/paketlemek; iş güzel bir şekilde tamamlandı ve \"paketlendi\" metaforu"
      }
    ],
    "cultural_insight": "\"Wrapped up\" bir şeyi hediye gibi sarıp bitirmek. \"Got it done\" (hallettim) çok pratik. \"Mission accomplished\" dramatik ama eğlenceli.",
    "fluency_tip": "\"That's done and dusted\" (bitti ve tuzlandı — İngiltere) veya \"That's in the bag\" (çantada keklik) çok renkli ifadeler."
  },
  {
    "id": 117,
    "category": "gunluk",
    "tr": "Dikkatimi dağıttı",
    "tags": [
      "dikkatimi dağıttı",
      "dikkat dağıtıcı",
      "konsantre olamıyorum",
      "odak"
    ],
    "english_primary": "It threw me off",
    "alternatives": [
      "It broke my concentration",
      "It was really distracting"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Dikkatimi dağıttı",
        "tr_gloss": "scattered my attention",
        "en_fragment": "threw me off",
        "bridge_type": "transform",
        "explanation": "Türkçe dağıtmak (saçılma); İngilizce fırlatmak (throw off=yoldan çıkarmak)"
      }
    ],
    "cultural_insight": "\"Throw off\" yoldan çıkarmak, dengesini bozmak. \"Distracted\" daha nötr akademik kelime. \"I lost my train of thought\" (düşünce trenini kaybettim) klasik bir metafor.",
    "fluency_tip": "\"I lost my focus\" en sade; \"I zoned out\" (alandan çıktım) konsantrasyonu kaybetme."
  },
  {
    "id": 118,
    "category": "duygular",
    "tr": "İçim daraldı",
    "tags": [
      "içim daraldı",
      "bunaldım",
      "sıkıştım",
      "nefes alamıyorum",
      "bunaltı"
    ],
    "english_primary": "I felt suffocated",
    "alternatives": [
      "I felt closed in",
      "I felt overwhelmed"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçim daraldı",
        "tr_gloss": "my inside narrowed",
        "en_fragment": "felt suffocated",
        "bridge_type": "transform",
        "explanation": "Türkçe iç mekan daralması (içim daraldı); İngilizce boğulma — darlık → hava yok etkisi"
      }
    ],
    "cultural_insight": "\"Suffocated\" nefessiz kalmak; çok güçlü. \"Claustrophobic\" kapalı alan korkusu. \"Trapped\" tuzağa düşmüş. Türkçe \"daralma\" daha ince.",
    "fluency_tip": "\"I needed some space\" (biraz alan istedim) çok yaygın; \"I felt hemmed in\" (etrafı çevrilmiş) de iyi."
  },
  {
    "id": 119,
    "category": "yorgunluk",
    "tr": "Gözüm açılmıyor",
    "tags": [
      "gözüm açılmıyor",
      "gözlerim kapanıyor",
      "sabah",
      "kalkmak istemiyorum",
      "uyanamıyorum"
    ],
    "english_primary": "I can barely open my eyes",
    "alternatives": [
      "I'm not fully awake yet",
      "I'm still half asleep"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gözüm açılmıyor",
        "tr_gloss": "my eye won't open",
        "en_fragment": "can barely open my eyes",
        "bridge_type": "direct",
        "explanation": "Göz açılmama metaforu her iki dilde de benzer; Türkçe daha pasif (açılmıyor), İngilizce aktif (açamıyorum)"
      }
    ],
    "cultural_insight": "İlginç pasif/aktif fark: Türkçede göz açılmıyor (kendiliğinden olmuyor); İngilizcede \"I can't open them\" (aktif çaba gerektiriyor).",
    "fluency_tip": "\"I need my coffee\" veya \"I'm not a morning person\" (sabahçı değilim) çok evrensel."
  },
  {
    "id": 120,
    "category": "sosyal",
    "tr": "Çok hoş geldiniz",
    "tags": [
      "hoşgeldiniz",
      "hoş geldin",
      "buyurun",
      "bekleriz",
      "memnun olduk"
    ],
    "english_primary": "Welcome, so glad you're here",
    "alternatives": [
      "Great to have you",
      "Come on in"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Çok hoş geldiniz",
        "tr_gloss": "you came very pleasantly",
        "en_fragment": "so glad you're here",
        "bridge_type": "transform",
        "explanation": "Türkçe hoşluk gelen kişide; İngilizce sevinç onu karşılayanda — bakış açısı tersine dönüyor"
      }
    ],
    "cultural_insight": "Türkçe \"hoş geldiniz\" misafirin gelişi güzel (hoş=güzel). İngilizce \"welcome\" karşılama eylemi. Bakış açısı tam ters: misafir güzel mi geldi, yoksa ev sahibi memnun mu?",
    "fluency_tip": "\"Make yourself at home\" (kendinizi evde hissettirin) ev sıcaklığını en iyi anlatan ifade."
  },
  {
    "id": 130,
    "category": "deyimler",
    "tr": "Ağzından bal damlıyor",
    "tags": [
      "ağzından bal damlıyor",
      "çok tatlı konuşuyor",
      "dili tatlı",
      "ikiyüzlü",
      "yağcılık"
    ],
    "english_primary": "They could charm the birds off the trees",
    "alternatives": [
      "They have a silver tongue",
      "They're incredibly smooth-talking"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzından bal damlıyor",
        "tr_gloss": "honey drips from their mouth",
        "en_fragment": "silver tongue",
        "bridge_type": "transform",
        "explanation": "Türkçe ağızdan tatlı sıvı akar; İngilizce dil değerli metalden (gümüş) — ikisi de dil güzelliği ama farklı metafor"
      }
    ],
    "cultural_insight": "Türkçe bal (doğal tatlılık); İngilizce gümüş (değerli ve parlak ama yapay). Türkçe daha güvenilir; İngilizce biraz manipülatif ima taşıyabilir.",
    "fluency_tip": "\"They could sell ice to an Eskimo\" (Eskimo'ya buz satar) çok abartılı ikna gücü için."
  },
  {
    "id": 131,
    "category": "deyimler",
    "tr": "Taşın altına elini koyamıyor",
    "tags": [
      "taşın altına",
      "sorumluluk almıyor",
      "üstüne yıkıyor",
      "kaçınıyor",
      "sorumsuz"
    ],
    "english_primary": "They won't step up",
    "alternatives": [
      "They dodge responsibility",
      "They always pass the buck"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Taşın altına elini koyamıyor",
        "tr_gloss": "can't put their hand under the stone",
        "en_fragment": "pass the buck",
        "bridge_type": "transform",
        "explanation": "Türkçe fiziksel ağırlık taşımak (el altında); İngilizce kova (buck) geçirmek — sorumluluk transfer metaforu"
      }
    ],
    "cultural_insight": "\"Pass the buck\" poker oynamaktan geliyor: dealer pozisyonunu bir sonrakine geçirmek. \"Buck stops here\" (kova burada duruyor) sorumluluk almak demek.",
    "fluency_tip": "\"They never own up to anything\" (hiçbir şeyin sahibi olmuyor) çok işlevsel."
  },
  {
    "id": 132,
    "category": "deyimler",
    "tr": "Gemisini yürütüyor",
    "tags": [
      "gemisini yürütüyor",
      "işini çeviriyor",
      "idare ediyor",
      "geçiniyor",
      "hayatı idare ediyor"
    ],
    "english_primary": "They're keeping things afloat",
    "alternatives": [
      "They're managing",
      "They're making it work"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gemisini yürütüyor",
        "tr_gloss": "sailing their own ship",
        "en_fragment": "keeping afloat",
        "bridge_type": "direct",
        "explanation": "Her iki dil de gemi/su metaforunu kullanıyor! Türkçe gemi yürüyor; İngilizce su üstünde kalmak"
      }
    ],
    "cultural_insight": "Hem Türkçe hem İngilizce gemi metaforu kullanıyor — ama farklı yön. Türkçe gemi hareket ediyor (aktif); İngilizce gemi batmıyor (savunma). İki kültür aynı denizi farklı görüyor.",
    "fluency_tip": "\"Treading water\" (suda tepinerek ilerlemek) de benzer; \"Just getting by\" (zar zor geçinmek) daha somut."
  },
  {
    "id": 133,
    "category": "sosyal",
    "tr": "Yüz vermedi",
    "tags": [
      "yüz vermemek",
      "cesaretlendirmemek",
      "sınır koy",
      "ciddiye alma"
    ],
    "english_primary": "Don't encourage them",
    "alternatives": [
      "Don't give them an inch",
      "Set limits with them"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Yüz vermedi",
        "tr_gloss": "not giving face / not showing face",
        "en_fragment": "don't give them an inch",
        "bridge_type": "transform",
        "explanation": "Türkçe yüz (onur/izin verme metaforu); İngilizce inç (küçük ödün vermeme; eğer bir inç verirsen bir mil alır)"
      }
    ],
    "cultural_insight": "\"Give an inch, take a mile\" (bir inç ver, mil al) tam atasözü. Türkçe yüz verme daha kişisel ilgi/onay alanında.",
    "fluency_tip": "\"Don't let them walk all over you\" (seni yerde sürüklettirme) daha güçlü versiyon."
  },
  {
    "id": 134,
    "category": "gunluk",
    "tr": "Kafayı yiyor musun",
    "tags": [
      "kafayı yiyor",
      "deli misin",
      "aklın mı yok",
      "ne yapıyorsun",
      "saçmalık"
    ],
    "english_primary": "Have you lost your mind?",
    "alternatives": [
      "Are you crazy?",
      "What are you thinking?"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kafayı yiyor musun",
        "tr_gloss": "are you eating the head?",
        "en_fragment": "lost your mind",
        "bridge_type": "transform",
        "explanation": "Türkçe kafayı yemek (garip yiyecek metaforu); İngilizce aklı kaybetmek (kayıp metaforu)"
      }
    ],
    "cultural_insight": "\"Kafayı yemek\" çok özgün Türkçe metafor — aklı yiyip bitirmek. İngilizce \"lost your mind\" ya da \"gone off the deep end\" (derin uca atladı) alternatifleri var.",
    "fluency_tip": "\"What were you thinking?\" (ne düşünüyordun?) hem suçlama hem merak ifadesi."
  },
  {
    "id": 135,
    "category": "duygular",
    "tr": "İçim geçmiyor",
    "tags": [
      "içim geçmiyor",
      "gönlüm razı değil",
      "vicdanim rahat değil",
      "zoruma gidiyor"
    ],
    "english_primary": "I can't bring myself to do it",
    "alternatives": [
      "My heart isn't in it",
      "I feel uneasy about it"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçim geçmiyor",
        "tr_gloss": "my inside doesn't pass",
        "en_fragment": "can't bring myself",
        "bridge_type": "transform",
        "explanation": "Türkçe iç/ruh geçmiyor (onay vermiyor); İngilizce kendini bir yere getirememe (active self-direction)"
      }
    ],
    "cultural_insight": "\"Bring myself\" aktif bir çaba ve başarısızlık. Türkçe \"içim geçmemek\" daha pasif — içinden gelmiyor. \"My conscience won't allow it\" daha dramatik.",
    "fluency_tip": "\"I don't have the heart for it\" (bunun için kalbim yok) çok güzel eşdeğer."
  },
  {
    "id": 140,
    "category": "sasirma",
    "tr": "Dilim tutuldu",
    "tags": [
      "dilim tutuldu",
      "konuşamadım",
      "nutkum tutuldu",
      "söyleyecek söz bulamadım"
    ],
    "english_primary": "I was speechless",
    "alternatives": [
      "I was at a loss for words",
      "Cat got your tongue?"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dilim tutuldu",
        "tr_gloss": "my tongue was caught/held",
        "en_fragment": "speechless",
        "bridge_type": "transform",
        "explanation": "Türkçe dil organının tutulması (fiziksel engel); İngilizce konuşma yetisinin kaybı (speech-less)"
      }
    ],
    "cultural_insight": "\"Cat got your tongue?\" (Kedini dilini mi kaptı?) sessiz kalan birine sorulan klasik bir İngiliz deyimidir.",
    "fluency_tip": "\"I don't know what to say\" (Ne diyeceğimi bilemiyorum) her durumda kurtarıcıdır."
  },
  {
    "id": 141,
    "category": "sosyal",
    "tr": "Lafı ağzımdan aldın",
    "tags": [
      "lafı ağzımdan aldın",
      "aynısını diyecektim",
      "tam ben söyleyecektim",
      "aklımı okudun"
    ],
    "english_primary": "You took the words right out of my mouth",
    "alternatives": [
      "I was just about to say that",
      "Great minds think alike"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Lafı ağzımdan aldın",
        "tr_gloss": "you took the word from my mouth",
        "en_fragment": "took the words right out of my mouth",
        "bridge_type": "direct",
        "explanation": "Tam birebir metafor eşleşmesi! İki kültür de sözü fiziksel bir nesne gibi ağızdan alınabilir görüyor."
      }
    ],
    "cultural_insight": "Bu kadar net bir eşleşme nadirdir. \"Great minds think alike\" (Büyük zihinler benzer düşünür) ise şakacı bir övgü olarak eklenir.",
    "fluency_tip": "\"Jinx!\" (aynı anda aynı şeyi söyleyince) çocuksu ama eğlenceli bir tepki."
  },
  {
    "id": 142,
    "category": "sosyal",
    "tr": "Kulak misafiri oldum",
    "tags": [
      "kulak misafiri",
      "duydum",
      "istemeden duydum",
      "kulak kabarttım"
    ],
    "english_primary": "I couldn't help overhearing",
    "alternatives": [
      "I happened to hear",
      "I eavesdropped (kasıtlı)"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kulak misafiri",
        "tr_gloss": "ear guest",
        "en_fragment": "overhearing",
        "bridge_type": "transform",
        "explanation": "Türkçe \"misafir\" diyerek kibarlaştırıyor (davetsiz ama nazik); İngilizce \"over-hear\" (üstten/fazla duymak) ile mekansal bir tanım yapıyor."
      }
    ],
    "cultural_insight": "Türkçe \"misafir\" metaforu eylemi masumlaştırır. İngilizcede \"eavesdropping\" (saçak altından dinlemek) genelde kaba/kasıtlıdır; \"overhear\" ise tesadüfidir.",
    "fluency_tip": "\"Sorry to butt in, but...\" (Araya girdiğim için üzgünüm ama...) söze girmek için kibar bir yol."
  },
  {
    "id": 150,
    "category": "gunluk",
    "tr": "Zaman öldürüyorum",
    "tags": [
      "zaman öldürüyorum",
      "vakit geçiriyorum",
      "oyalanıyorum",
      "boş boş duruyorum"
    ],
    "english_primary": "I'm killing time",
    "alternatives": [
      "Just whiling away the time",
      "Hanging around"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Zaman öldürüyorum",
        "tr_gloss": "killing time",
        "en_fragment": "killing time",
        "bridge_type": "direct",
        "explanation": "Birebir eşleşme. İki dil de zamanı canlı bir varlık gibi \"öldürülebilir\" görüyor."
      }
    ],
    "cultural_insight": "Modern yaşamda zaman bir düşman veya kaynak gibi görülür. \"Wasting time\" (zaman harcamak) negatif; \"killing time\" ise nötr bir bekleme eylemidir.",
    "fluency_tip": "\"I have some time to kill\" (Öldürecek biraz vaktim var) beklerken söylenebilir."
  },
  {
    "id": 151,
    "category": "gunluk",
    "tr": "Ucu ucuna yetiştim",
    "tags": [
      "ucu ucuna",
      "son anda",
      "kıl payı",
      "zor yetiştim"
    ],
    "english_primary": "I made it by the skin of my teeth",
    "alternatives": [
      "I barely made it",
      "It was a close call"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ucu ucuna",
        "tr_gloss": "tip to tip",
        "en_fragment": "skin of my teeth",
        "bridge_type": "transform",
        "explanation": "Türkçe iki ucun değmesi (mesafe); İngilizce dişin derisi (olmayan bir şey/imkansızlık sınırında) metaforu."
      }
    ],
    "cultural_insight": "\"Skin of my teeth\" İncil kökenli (Eyüp) çok eski bir deyim. Dişin derisi yoktur, yani \"hiç pay kalmadı\" demektir.",
    "fluency_tip": "\"Cut it fine\" (ince kesmek) zamanı çok dar kullanmak anlamında yaygındır."
  },
  {
    "id": 152,
    "category": "yogunluk",
    "tr": "İki ayağım bir pabuca girdi",
    "tags": [
      "iki ayağım bir pabuca",
      "sıkıştım",
      "telaşlandım",
      "panik oldum"
    ],
    "english_primary": "I was running around like a headless chicken",
    "alternatives": [
      "I was in a mad rush",
      "Everything happened at once"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İki ayağım bir pabuca",
        "tr_gloss": "two feet in one shoe",
        "en_fragment": "headless chicken",
        "bridge_type": "transform",
        "explanation": "Türkçe daralma/sıkışma metaforu (ayakkabı); İngilizce amaçsız/panik halindeki hareket (kafasız tavuk)."
      }
    ],
    "cultural_insight": "Türkçe sıkışıklığı vurgular, İngilizce ise o sıkışıklığın yarattığı kaotik hareketi. \"Headless chicken\" çok görsel ve komik bir İngiliz deyimidir.",
    "fluency_tip": "\"It was chaotic\" veya \"It was a madhouse\" (tımarhane gibiydi) durumun karmaşasını anlatır."
  },
  {
    "id": 160,
    "category": "duygular",
    "tr": "İçime doğdu",
    "tags": [
      "içime doğdu",
      "hissettim",
      "malum oldu",
      "sezdim"
    ],
    "english_primary": "I had a gut feeling",
    "alternatives": [
      "I had a hunch",
      "Something told me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçime doğdu",
        "tr_gloss": "born into me",
        "en_fragment": "gut feeling",
        "bridge_type": "transform",
        "explanation": "Türkçe bilginin içte doğması (ruhsal/kalbi); İngilizce bağırsağın hissetmesi (fiziksel içgüdü)."
      }
    ],
    "cultural_insight": "Batı kültüründe \"gut\" (bağırsak/karın) içgüdünün merkezidir. Türkçede ise \"iç\" veya \"kalp\". \"My gut tells me...\" çok güvenilen bir histir.",
    "fluency_tip": "\"I just knew it\" (Sadece biliyordum) açıklayamadığınız bilgiler için."
  },
  {
    "id": 161,
    "category": "duygular",
    "tr": "Gözümden düştü",
    "tags": [
      "gözümden düştü",
      "değerini yitirdi",
      "soğudum",
      "artık sevmiyorum"
    ],
    "english_primary": "They fell from grace",
    "alternatives": [
      "I lost all respect for them",
      "They went down in my estimation"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözümden düştü",
        "tr_gloss": "fell from my eye",
        "en_fragment": "fell from grace",
        "bridge_type": "transform",
        "explanation": "Türkçe gözden (bakış alanından/değerden) düşmek; İngilizce lütuftan/kutsallıktan (grace) düşmek."
      }
    ],
    "cultural_insight": "\"Fall from grace\" dini kökenli (Cennetten kovulma). Günlük hayatta saygınlığını yitirenler için kullanılır. Türkçe göz metaforu daha kişiseldir.",
    "fluency_tip": "\"You really let me down\" (Beni hayal kırıklığına uğrattın) yüzüne söylerken daha uygundur."
  },
  {
    "id": 162,
    "category": "duygular",
    "tr": "Kanım ısındı",
    "tags": [
      "kanım ısındı",
      "sevdim",
      "yakın hissettim",
      "sempati duydum"
    ],
    "english_primary": "I warmed up to them",
    "alternatives": [
      "We hit it off",
      "I took a shine to them"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kanım ısındı",
        "tr_gloss": "my blood warmed",
        "en_fragment": "warmed up to",
        "bridge_type": "transform",
        "explanation": "Türkçe kanın ısınması (biyolojik sempati); İngilizce genel ısınma (ilişki sıcaklığı). Isı metaforu ortak."
      }
    ],
    "cultural_insight": "\"Warm up to\" zamanla sevmek anlamı da taşır. \"Hit it off\" ise anında kaynaşmak demektir (frekans tutması).",
    "fluency_tip": "\"We clicked\" (tık diye oturduk/uyduk) anında anlaşmayı anlatır."
  },
  {
    "id": 163,
    "category": "duygular",
    "tr": "Tadı kaçtı",
    "tags": [
      "tadı kaçtı",
      "keyfi kalmadı",
      "bozuldu",
      "eski tadı yok"
    ],
    "english_primary": "It lost its charm",
    "alternatives": [
      "It turned sour",
      "The novelty wore off"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Tadı kaçtı",
        "tr_gloss": "its taste fled",
        "en_fragment": "lost its charm",
        "bridge_type": "transform",
        "explanation": "Türkçe tat/lezzet metaforu; İngilizce büyü/cazibe (charm) kaybı veya ekşime (sour)."
      }
    ],
    "cultural_insight": "\"The novelty wore off\" (yeniliği aşındı/eskidi) bir şeye olan ilginin zamanla azalması için çok sık kullanılır.",
    "fluency_tip": "\"It's not the same anymore\" (Artık aynı değil) nostaljik bir hayal kırıklığı ifadesidir."
  },
  {
    "id": 170,
    "category": "basari",
    "tr": "İğneyle kuyu kazdı",
    "tags": [
      "iğneyle kuyu",
      "zor iş",
      "sabır",
      "imkansız gibi",
      "didinmek"
    ],
    "english_primary": "Doing it the hard way",
    "alternatives": [
      "Like digging a hole with a spoon",
      "An uphill battle"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İğneyle kuyu kazdı",
        "tr_gloss": "digging a well with a needle",
        "en_fragment": "hard way / uphill battle",
        "bridge_type": "transform",
        "explanation": "Türkçe mikro aletle makro iş yapma (sabır); İngilizce yokuş yukarı savaş (zorluk/direnç) metaforu."
      }
    ],
    "cultural_insight": "Türkçe deyim sabrı ve titizliği vurgular. İngilizce \"uphill battle\" ise görevin zorluğunu ve yoruculuğunu. \"Sisyphus task\" (Sisifos görevi) hiç bitmeyen işler için akademik bir tanımdır.",
    "fluency_tip": "\"It's a grind\" (öğütücü bir iş) çok çaba gerektiren sıkıcı süreçler için kullanılır."
  },
  {
    "id": 171,
    "category": "basari",
    "tr": "Havanda su dövdü",
    "tags": [
      "havanda su",
      "boşa uğraşmak",
      "nafile",
      "sonuçsuz",
      "boşuna"
    ],
    "english_primary": "Beating a dead horse",
    "alternatives": [
      "Spinning your wheels",
      "Going around in circles"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Havanda su dövdü",
        "tr_gloss": "pounding water in a mortar",
        "en_fragment": "beating a dead horse",
        "bridge_type": "transform",
        "explanation": "Türkçe şekil almaz bir şeyi (su) dövmek; İngilizce tepki vermeyecek bir şeyi (ölü at) dövmek/sürmek."
      }
    ],
    "cultural_insight": "\"Beating a dead horse\" genellikle kapanmış bir konuyu tartışmaya devam etmek için kullanılır. \"Spinning your wheels\" (patinaj çekmek) ilerleyememek demektir.",
    "fluency_tip": "\"We're getting nowhere\" (Hiçbir yere varamıyoruz) toplantılarda çok işe yarar."
  },
  {
    "id": 172,
    "category": "basari",
    "tr": "Çorbada tuzum olsun",
    "tags": [
      "çorbada tuzum",
      "katkı",
      "yardım",
      "küçük destek",
      "ben de yardım edeyim"
    ],
    "english_primary": "Do my bit",
    "alternatives": [
      "Chip in",
      "Make a contribution"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Çorbada tuzum",
        "tr_gloss": "salt in the soup",
        "en_fragment": "do my bit",
        "bridge_type": "transform",
        "explanation": "Türkçe lezzet verici küçük katkı (tuz); İngilizce küçük parça (bit/chip) sağlama."
      }
    ],
    "cultural_insight": "\"Pitch in\" veya \"Chip in\" genellikle para veya emek birleştirme durumlarında kullanılır. Kolektif çalışma kültürünün parçasıdır.",
    "fluency_tip": "\"Every little helps\" (Her küçük şey yardımcı olur) Tesco süpermarketinin sloganıydı, artık günlük dile yerleşti."
  },
  {
    "id": 200,
    "category": "sosyal",
    "tr": "Aramız limoni",
    "tags": [
      "aramız limoni",
      "soğukluk",
      "gergin",
      "mesafeli"
    ],
    "english_primary": "Things are a bit sour between us",
    "alternatives": [
      "We're on rocky ground",
      "There's some tension"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "limoni",
        "tr_gloss": "lemony (sour)",
        "en_fragment": "sour",
        "bridge_type": "direct",
        "explanation": "Limon/ekşi metaforu iki dilde de bozuk ilişkiler için kullanılır"
      }
    ],
    "cultural_insight": "\"Sour\" (ekşi) ilişkilerde bozulmayı anlatır. \"Sweet\" (tatlı) ise iyiyi. Tat metaforları evrenseldir.",
    "fluency_tip": "\"We're not on speaking terms\" (konuşmuyoruz) daha ciddi bir durumu anlatır."
  },
  {
    "id": 201,
    "category": "sosyal",
    "tr": "Göz hapsine aldı",
    "tags": [
      "göz hapsi",
      "izliyor",
      "dik dik bakıyor",
      "takipte"
    ],
    "english_primary": "They kept a close eye on me",
    "alternatives": [
      "They were watching me like a hawk",
      "I was under surveillance"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Göz hapsi",
        "tr_gloss": "eye imprisonment",
        "en_fragment": "close eye / watch like a hawk",
        "bridge_type": "transform",
        "explanation": "Türkçe hapis (kısıtlama); İngilizce şahin gibi izlemek (avcı bakışı)"
      }
    ],
    "cultural_insight": "\"Watch like a hawk\" çok keskin ve kaçırmayan bakış demek. Türkçe \"hapis\" metaforu daha kısıtlayıcı hissettiriyor.",
    "fluency_tip": "\"I couldn't make a move without them knowing\" durumu çok iyi özetler."
  },
  {
    "id": 202,
    "category": "sosyal",
    "tr": "Naz yapıyor",
    "tags": [
      "naz",
      "nazlanıyor",
      "isteksiz gibi",
      "kapris"
    ],
    "english_primary": "Playing hard to get",
    "alternatives": [
      "Being coy",
      "Acting indifferent"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Naz yapıyor",
        "tr_gloss": "making coyness",
        "en_fragment": "playing hard to get",
        "bridge_type": "transform",
        "explanation": "Türkçe naz (kültürel bir davranış); İngilizce \"elde edilmesi zor olanı oynamak\" (oyun metaforu)"
      }
    ],
    "cultural_insight": "\"Naz\" Türk kültüründe özel bir yere sahip. İngilizcede \"hard to get\" bir taktik/oyun olarak görülür. \"Coy\" ise utangaç cilve.",
    "fluency_tip": "\"Stop playing games\" (oyun oynamayı bırak) naz yapan birine tepki olabilir."
  },
  {
    "id": 203,
    "category": "sosyal",
    "tr": "Baştan çıkardı",
    "tags": [
      "baştan çıkardı",
      "kandırdı",
      "ayarttı",
      "cezbetti"
    ],
    "english_primary": "They seduced me",
    "alternatives": [
      "They led me astray",
      "I was tempted"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Baştan çıkardı",
        "tr_gloss": "took out of the head",
        "en_fragment": "led astray / seduced",
        "bridge_type": "transform",
        "explanation": "Türkçe baştan/akıldan çıkarma (kontrol kaybı); İngilizce yoldan çıkarma (astray) veya ayartma"
      }
    ],
    "cultural_insight": "\"Lead astray\" doğru yoldan saptırmak demek. \"Seduce\" genellikle romantik/cinsel ama \"seduced by the idea\" gibi mecazi de kullanılır.",
    "fluency_tip": "\"I couldn't resist\" (karşı koyamadım) sorumluluğu hafifletir."
  },
  {
    "id": 204,
    "category": "sosyal",
    "tr": "Kafama takıldı",
    "tags": [
      "kafama takıldı",
      "düşünüyorum",
      "aklımda",
      "saplantı"
    ],
    "english_primary": "It's stuck in my head",
    "alternatives": [
      "I can't stop thinking about it",
      "It's been on my mind"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kafama takıldı",
        "tr_gloss": "got hooked/stuck to my head",
        "en_fragment": "stuck in my head",
        "bridge_type": "direct",
        "explanation": "Takılmak/stuck benzer fiziksel metaforlar"
      }
    ],
    "cultural_insight": "Bir şarkı için \"earworm\" (kulak kurdu) denir. Bir düşünce için \"dwelling on it\" (üzerinde ikamet etmek/durmak).",
    "fluency_tip": "\"I can't get it out of my head\" en yaygın ifade."
  },
  {
    "id": 205,
    "category": "sosyal",
    "tr": "Kendini ağırdan satıyor",
    "tags": [
      "ağırdan satmak",
      "değerli göster",
      "hemen kabul etme"
    ],
    "english_primary": "Selling themselves short (TERSİ: underselling)",
    "alternatives": [
      "Playing it cool",
      "Knowing their worth"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağırdan satıyor",
        "tr_gloss": "selling heavily/slowly",
        "en_fragment": "playing it cool",
        "bridge_type": "transform",
        "explanation": "Türkçe ticaret metaforu (ağır satmak); İngilizce ısı metaforu (cool = serin/sakin kalmak)"
      }
    ],
    "cultural_insight": "Dikkat: \"Selling yourself short\" kendini hafife almak demek (ucuza satmak). Ağırdan satmak için \"playing hard to get\" veya \"knowing one's worth\" daha uygun.",
    "fluency_tip": "\"Don't sell yourself short\" (kendine haksızlık etme) çok önemli bir tavsiye."
  },
  {
    "id": 206,
    "category": "sosyal",
    "tr": "Üstüne titriyor",
    "tags": [
      "üstüne titriyor",
      "çok seviyor",
      "koruyor",
      "gözünden sakınıyor"
    ],
    "english_primary": "They dote on them",
    "alternatives": [
      "They wrap them in cotton wool",
      "They are very protective"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Üstüne titriyor",
        "tr_gloss": "shivering over them",
        "en_fragment": "dote on / wrap in cotton wool",
        "bridge_type": "transform",
        "explanation": "Türkçe titreme (heyecan/korku); İngilizce pamuğa sarma (yumuşak koruma)"
      }
    ],
    "cultural_insight": "\"Wrap in cotton wool\" aşırı korumacılık (pamuklara sarmak). \"Dote on\" sevgiyle şımartmak demek.",
    "fluency_tip": "\"They are the apple of their eye\" (gözbebeği) çok klasik bir sevgi ifadesi."
  },
  {
    "id": 207,
    "category": "sosyal",
    "tr": "Kalbimi kırdı",
    "tags": [
      "kalbimi kırdı",
      "üzdü",
      "incitti",
      "yaraladı"
    ],
    "english_primary": "They broke my heart",
    "alternatives": [
      "They hurt my feelings",
      "I was crushed"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kalbimi kırdı",
        "tr_gloss": "broke my heart",
        "en_fragment": "broke my heart",
        "bridge_type": "direct",
        "explanation": "Tam eşleşme; kalp kırma metaforu evrensel"
      }
    ],
    "cultural_insight": "Kalp metaforu neredeyse tüm dillerde duygu merkezidir. \"Crushed\" (ezilmiş) daha fiziksel ve ağır bir üzüntü.",
    "fluency_tip": "\"It really stung\" (batti/acıttı) daha hafif, anlık acı için."
  },
  {
    "id": 208,
    "category": "sosyal",
    "tr": "Pot kırdım",
    "tags": [
      "pot kırdım",
      "gaf yaptım",
      "yanlış söyledim",
      "çam devirdim"
    ],
    "english_primary": "I put my foot in my mouth",
    "alternatives": [
      "I made a faux pas",
      "I dropped a clanger"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Pot kırdım",
        "tr_gloss": "broke a pot",
        "en_fragment": "foot in my mouth",
        "bridge_type": "transform",
        "explanation": "Türkçe pot kırmak (dokuma hatası); İngilizce ayağını ağzına sokmak (utanç verici durum)"
      }
    ],
    "cultural_insight": "\"Put my foot in it\" çok yaygın. \"Faux pas\" (Fransızca: yanlış adım) sosyal hata. \"Dropped a clanger\" (İngiltere) gürültülü hata yapmak.",
    "fluency_tip": "\"I wish I hadn't said that\" (keşke demeseydim) en doğal pişmanlık."
  },
  {
    "id": 209,
    "category": "sosyal",
    "tr": "Aramızı yap",
    "tags": [
      "aramızı yap",
      "tanıştır",
      "çöpçatanlık",
      "birleştir"
    ],
    "english_primary": "Set us up",
    "alternatives": [
      "Play matchmaker",
      "Hook us up"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aramızı yap",
        "tr_gloss": "make our between",
        "en_fragment": "set us up",
        "bridge_type": "transform",
        "explanation": "Türkçe arayı yapmak (inşa etmek); İngilizce düzenek kurmak (setup)"
      }
    ],
    "cultural_insight": "\"Fix up\" veya \"set up\" randevu ayarlamak demek. \"Blind date\" (kör randevu) tanımadığın biriyle görüşmek.",
    "fluency_tip": "\"Can you introduce us?\" (bizi tanıştırır mısın?) daha doğrudan ve basit."
  },
  {
    "id": 251,
    "category": "yogunluk",
    "tr": "Etekleri tutuştu",
    "tags": [
      "etekleri tutuştu",
      "telaşlandı",
      "panikledi",
      "korktu"
    ],
    "english_primary": "They got into a flap",
    "alternatives": [
      "They hit the panic button",
      "They were running around like crazy"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Etekleri tutuştu",
        "tr_gloss": "skirts caught fire",
        "en_fragment": "got into a flap",
        "bridge_type": "transform",
        "explanation": "Türkçe ateş metaforu; İngilizce kanat çırpma (flap) veya kuş paniği"
      }
    ],
    "cultural_insight": "\"In a flap\" kuşların panikle kanat çırpmasından gelir. \"Panic mode\" modern teknoloji metaforu.",
    "fluency_tip": "\"Don't panic\" sakinleştirmek için; \"Chill out\" daha argo."
  },
  {
    "id": 252,
    "category": "yogunluk",
    "tr": "İşleri boşladı",
    "tags": [
      "işleri boşladı",
      "saldı",
      "umursamıyor",
      "gevşedi"
    ],
    "english_primary": "They're slacking off",
    "alternatives": [
      "They're dropping the ball",
      "They're coasting"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Boşladı",
        "tr_gloss": "let loose / emptied",
        "en_fragment": "slacking off",
        "bridge_type": "transform",
        "explanation": "Türkçe boşluk/gevşeklik; İngilizce \"slack\" (gevşek ip) metaforu — ip gergin değil"
      }
    ],
    "cultural_insight": "\"Slacker\" tembel kişi demek. \"Dropping the ball\" spordan gelir: hatayla topu düşürmek. \"Coasting\" yokuş aşağı pedalsız gitmek.",
    "fluency_tip": "\"You need to pick up the slack\" (gevşekliği topla) başkasının yapmadığı işi yapmak."
  },
  {
    "id": 253,
    "category": "yogunluk",
    "tr": "Kılı kırk yardı",
    "tags": [
      "kılı kırk yarmak",
      "titiz",
      "detaycı",
      "ince elemek"
    ],
    "english_primary": "Splitting hairs",
    "alternatives": [
      "Nitpicking",
      "Being pedantic"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kılı kırk yardı",
        "tr_gloss": "splitting a hair forty times",
        "en_fragment": "splitting hairs",
        "bridge_type": "direct",
        "explanation": "Kıl yarma metaforu ortak! Türkçe \"kırk\" diyerek abartıyı artırıyor"
      }
    ],
    "cultural_insight": "\"Splitting hairs\" gereksiz detay ayrımı demek. \"Nitpicking\" bit ayıklamak (çok ince iş). İkisi de negatif (aşırı titiz) anlam taşıyabilir.",
    "fluency_tip": "\"Let's not get bogged down in details\" (detaylarda boğulmayalım) iş ortamında çok yararlı."
  },
  {
    "id": 254,
    "category": "yogunluk",
    "tr": "İş başa düştü",
    "tags": [
      "iş başa düştü",
      "bana kaldı",
      "kendim yapmalıyım",
      "mecburum"
    ],
    "english_primary": "It's up to me now",
    "alternatives": [
      "I have to take charge",
      "The buck stops here"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İş başa düştü",
        "tr_gloss": "work fell to the head",
        "en_fragment": "it's up to me",
        "bridge_type": "transform",
        "explanation": "Türkçe işin başa (kafaya) düşmesi; İngilizce \"up to me\" (bana bağlı/yukarıda)"
      }
    ],
    "cultural_insight": "\"If you want something done right, do it yourself\" (iyi olsun istiyorsan kendin yap) bu durumu özetleyen atasözü.",
    "fluency_tip": "\"I'll handle it\" (ben hallederim) inisiyatif almak için en iyi ifade."
  },
  {
    "id": 255,
    "category": "yogunluk",
    "tr": "Ayağını kaydırdılar",
    "tags": [
      "ayağını kaydırdılar",
      "işten attırdılar",
      "kuyusunu kazdılar",
      "sabote ettiler"
    ],
    "english_primary": "They pushed him out",
    "alternatives": [
      "They stabbed him in the back",
      "They pulled the rug out from under him"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ayağını kaydırdılar",
        "tr_gloss": "made his foot slip",
        "en_fragment": "pulled the rug out",
        "bridge_type": "transform",
        "explanation": "Türkçe doğrudan ayak teması; İngilizce halıyı çekerek düşürme metaforu"
      }
    ],
    "cultural_insight": "\"Stab in the back\" (sırtından bıçaklama) ihanet. \"Pull the rug out\" ani destek kaybı. İş dünyası metaforları genellikle serttir.",
    "fluency_tip": "\"He was forced out\" (zorla çıkarıldı) daha resmi ve kibar."
  },
  {
    "id": 256,
    "category": "yogunluk",
    "tr": "Gözden çıkardım",
    "tags": [
      "gözden çıkardım",
      "vazgeçtim",
      "feda ettim",
      "harcadım"
    ],
    "english_primary": "I've written it off",
    "alternatives": [
      "I consider it a loss",
      "I've let it go"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözden çıkardım",
        "tr_gloss": "took out of the eye",
        "en_fragment": "written it off",
        "bridge_type": "transform",
        "explanation": "Türkçe gözden (görüş/değer alanından) çıkarma; İngilizce muhasebe defterinden silme (write off)"
      }
    ],
    "cultural_insight": "\"Write off\" muhasebe terimi (zarar yazmak). Türkçe metafor daha kişisel ve görsel. İngilizce daha finansal.",
    "fluency_tip": "\"Cut your losses\" (zararı kes) daha fazla kaybetmemek için durmak."
  },
  {
    "id": 257,
    "category": "yogunluk",
    "tr": "İpi göğüsledi",
    "tags": [
      "ipi göğüsledi",
      "kazandı",
      "birinci oldu",
      "bitirdi"
    ],
    "english_primary": "They crossed the finish line first",
    "alternatives": [
      "They took the lead",
      "They clinched the victory"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İpi göğüsledi",
        "tr_gloss": "chested the rope",
        "en_fragment": "crossed the finish line",
        "bridge_type": "transform",
        "explanation": "Türkçe atletizm ipine göğüsle değmek; İngilizce çizgiyi geçmek"
      }
    ],
    "cultural_insight": "Spor metaforları iş dünyasında çok yaygın. \"Clinched\" (garantilemek/kitlemek) kesin zafer için kullanılır.",
    "fluency_tip": "\"It was a photo finish\" (foto-finiş) çok yakın biten yarış/rekabet için."
  },
  {
    "id": 258,
    "category": "yogunluk",
    "tr": "Hakkını verdi",
    "tags": [
      "hakkını verdi",
      "iyi yaptı",
      "layıkıyla yaptı",
      "başardı"
    ],
    "english_primary": "They did it justice",
    "alternatives": [
      "They really delivered",
      "They executed it perfectly"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Hakkını verdi",
        "tr_gloss": "gave its right/due",
        "en_fragment": "did it justice",
        "bridge_type": "direct",
        "explanation": "Adalet/hak (justice/right) kavramı her iki dilde de performansa uygulanıyor"
      }
    ],
    "cultural_insight": "\"Do justice\" bir şeyin potansiyelini tam yansıtmak demek (örn: \"The photo doesn't do you justice\"). \"Deliver\" (teslim etmek) sonuç üretmek.",
    "fluency_tip": "\"You really nailed that presentation\" (sunumu harika yaptın) somut övgü."
  },
  {
    "id": 259,
    "category": "yogunluk",
    "tr": "Kesenin ağzını açtı",
    "tags": [
      "kesenin ağzını açtı",
      "para harcadı",
      "cömert",
      "harcama"
    ],
    "english_primary": "They splashed out",
    "alternatives": [
      "They spared no expense",
      "They loosened the purse strings"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kesenin ağzını",
        "tr_gloss": "mouth of the pouch",
        "en_fragment": "purse strings",
        "bridge_type": "direct",
        "explanation": "Kese/cüzdan ipleri metaforu birebir eşleşiyor (purse strings)"
      }
    ],
    "cultural_insight": "\"Splash out\" su gibi para harcamak. \"Spare no expense\" (masraftan kaçınmamak) daha resmi ve büyük organizasyonlar için.",
    "fluency_tip": "\"It cost an arm and a leg\" (kol ve bacağa mal oldu) çok pahalı demek."
  },
  {
    "id": 260,
    "category": "yogunluk",
    "tr": "Pireyi deve yaptı",
    "tags": [
      "pireyi deve",
      "abarttı",
      "büyüttü",
      "aşırı tepki"
    ],
    "english_primary": "Made a mountain out of a molehill",
    "alternatives": [
      "Blew it out of proportion",
      "Overreacted"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Pireyi deve",
        "tr_gloss": "flea to camel",
        "en_fragment": "molehill to mountain",
        "bridge_type": "transform",
        "explanation": "Küçük→Büyük dönüşümü: Türkçe hayvan (pire-deve), İngilizce coğrafya (köstebek yuvası-dağ) kullanıyor"
      }
    ],
    "cultural_insight": "İki kültür de \"küçük şeyi devasa yapma\" kavramına sahip. İngilizce alliterasyon (M-M: mountain-molehill) sever.",
    "fluency_tip": "\"Don't make a big deal out of it\" (bunu mesele yapma) sakinleştirmek için."
  },
  {
    "id": 301,
    "category": "duygular",
    "tr": "Kan beynime sıçradı",
    "tags": [
      "kan beynime",
      "çok sinirlendim",
      "öfkelendim",
      "delirdim"
    ],
    "english_primary": "My blood boiled",
    "alternatives": [
      "I saw red",
      "I hit the roof"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kan",
        "tr_gloss": "blood",
        "en_fragment": "blood",
        "bridge_type": "direct",
        "explanation": "Kan öfke sembolü"
      },
      {
        "tr_fragment": "beynime sıçradı",
        "tr_gloss": "splashed to my brain",
        "en_fragment": "boiled",
        "bridge_type": "transform",
        "explanation": "Türkçe ani basınç/sıçrama; İngilizce ısı/kaynama metaforu"
      }
    ],
    "cultural_insight": "\"Seeing red\" boğa güreşinden (yanlış bilinen efsane ama dilimize yerleşmiş). \"Hit the roof\" (tavana çarpmak) patlayan basınç.",
    "fluency_tip": "\"I was fuming\" (dumanım tütüyordu) sessiz ama yoğun öfke."
  },
  {
    "id": 302,
    "category": "duygular",
    "tr": "İçim cız etti",
    "tags": [
      "içim cız",
      "üzüldüm",
      "acıdım",
      "yüreğim yandı"
    ],
    "english_primary": "My heart sank",
    "alternatives": [
      "I felt a pang of sadness",
      "It tugged at my heartstrings"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçim cız etti",
        "tr_gloss": "my inside made a sizzling sound",
        "en_fragment": "heart sank",
        "bridge_type": "transform",
        "explanation": "Türkçe \"cız\" (yanma sesi); İngilizce \"sank\" (batma/ağırlık) hissi"
      }
    ],
    "cultural_insight": "\"Heart sank\" kötü haber alınca midede hissedilen düşüş. \"Tug at heartstrings\" daha duygusal, ağlatan film gibi durumlar için.",
    "fluency_tip": "\"I felt so bad for them\" (onlar adına üzüldüm) empati için standart."
  },
  {
    "id": 303,
    "category": "duygular",
    "tr": "Aklı çıktı",
    "tags": [
      "aklı çıktı",
      "çok korktu",
      "ödü patladı",
      "korkudan öldü"
    ],
    "english_primary": "Scared the living daylights out of them",
    "alternatives": [
      "Scared to death",
      "Jumped out of their skin"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aklı çıktı",
        "tr_gloss": "mind left",
        "en_fragment": "scared the daylights out",
        "bridge_type": "transform",
        "explanation": "Türkçe akıl/öd çıkıyor (beden terk ediyor); İngilizce \"daylights\" (canlılık/göz feri) çıkıyor"
      }
    ],
    "cultural_insight": "\"Living daylights\" eski argoda gözler/canlılık demekti. \"Jumped out of my skin\" (derimden fırladım) ani şok için harika bir görsel.",
    "fluency_tip": "\"You gave me a heart attack!\" (bana kalp krizi geçirttin) şakacı korku tepkisi."
  },
  {
    "id": 304,
    "category": "duygular",
    "tr": "Havasından geçilmiyor",
    "tags": [
      "havasından",
      "kibirli",
      "burnu havada",
      "övünen"
    ],
    "english_primary": "They're full of themselves",
    "alternatives": [
      "They have a big head",
      "They're on a high horse"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Havasından",
        "tr_gloss": "from their air/atmosphere",
        "en_fragment": "full of themselves",
        "bridge_type": "transform",
        "explanation": "Türkçe dışsal \"hava\" yayıyor; İngilizce \"kendiyle dolu\" (yer yok)"
      }
    ],
    "cultural_insight": "\"Big head\" (büyük kafa) ego şişmesi. \"High horse\" ahlaki üstünlük taslama. Türkçe \"hava\" boş ama etkileyici gaz metaforu.",
    "fluency_tip": "\"Get over yourself\" (kendini aş/kendine gel) egoist birine tersleme."
  },
  {
    "id": 305,
    "category": "duygular",
    "tr": "Dünya başıma yıkıldı",
    "tags": [
      "dünya başıma",
      "yıkıldı",
      "çok üzüldüm",
      "mahvoldum"
    ],
    "english_primary": "My whole world fell apart",
    "alternatives": [
      "I was crushed",
      "It felt like the end of the world"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Dünya başıma yıkıldı",
        "tr_gloss": "world collapsed on my head",
        "en_fragment": "world fell apart",
        "bridge_type": "direct",
        "explanation": "Dünya yıkılması metaforu her iki dilde de var; Türkçe \"başıma\" (kişisel hedef), İngilizce \"apart\" (parçalanma)"
      }
    ],
    "cultural_insight": "Büyük travmalar için evrensel \"yıkım\" metaforu. İngilizcede \"crashing down\" da kullanılır.",
    "fluency_tip": "\"I hit rock bottom\" (dibe vurdum) en kötü nokta için kullanılır."
  },
  {
    "id": 351,
    "category": "gunluk",
    "tr": "Lafın gelişi",
    "tags": [
      "lafın gelişi",
      "öylesine",
      "ciddi değil",
      "söz gelimi"
    ],
    "english_primary": "Figure of speech",
    "alternatives": [
      "Just a manner of speaking",
      "I didn't mean it literally"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Lafın gelişi",
        "tr_gloss": "arrival of the word",
        "en_fragment": "figure of speech",
        "bridge_type": "transform",
        "explanation": "Türkçe sözün akışı/gelişi; İngilizce konuşma figürü/şekli"
      }
    ],
    "cultural_insight": "\"Literally\" vs \"Figuratively\". \"Figure of speech\" mecaz demek. Günlük dilde \"It's just a saying\" denir.",
    "fluency_tip": "\"Don't take it literally\" (harfiyen alma) yanlış anlaşılmayı önler."
  },
  {
    "id": 352,
    "category": "gunluk",
    "tr": "Dilimin ucunda",
    "tags": [
      "dilimin ucunda",
      "hatırlayamadım",
      "söyleyeceğim",
      "unuttum"
    ],
    "english_primary": "It's on the tip of my tongue",
    "alternatives": [
      "I can almost remember it",
      "It's escaping me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Dilimin ucunda",
        "tr_gloss": "on the tip of my tongue",
        "en_fragment": "on the tip of my tongue",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Hafıza psikolojisinde evrensel bir fenomen"
      }
    ],
    "cultural_insight": "Bu fenomene \"lethologica\" denir ama herkes \"tip of my tongue\" der. İki dilin aynı noktayı (dil ucu) seçmesi harika.",
    "fluency_tip": "\"It'll come to me\" (aklıma gelecek) bekleme süresi isterken."
  },
  {
    "id": 353,
    "category": "gunluk",
    "tr": "Kulak asma",
    "tags": [
      "kulak asma",
      "dinleme",
      "önemseme",
      "takma"
    ],
    "english_primary": "Pay no attention",
    "alternatives": [
      "Turn a deaf ear",
      "Don't listen to them"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kulak asma",
        "tr_gloss": "don't hang an ear",
        "en_fragment": "turn a deaf ear",
        "bridge_type": "transform",
        "explanation": "Türkçe kulak asmak (aktif dinleme); İngilizce sağır kulağını dönmek (aktif reddetme)"
      }
    ],
    "cultural_insight": "\"Turn a deaf ear\" kasıtlı olarak duymamak. \"Ignore them\" en basit emir.",
    "fluency_tip": "\"Let it go in one ear and out the other\" (bir kulağından girip diğerinden çıksın) çok görsel bir tavsiye."
  },
  {
    "id": 354,
    "category": "gunluk",
    "tr": "Gözden geçirdi",
    "tags": [
      "gözden geçirmek",
      "incelemek",
      "kontrol etmek",
      "bakmak"
    ],
    "english_primary": "Look over / Go over",
    "alternatives": [
      "Review",
      "Run through"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözden geçirdi",
        "tr_gloss": "pass through the eye",
        "en_fragment": "look over",
        "bridge_type": "transform",
        "explanation": "Türkçe gözden geçirmek (içinden); İngilizce üzerinden bakmak (over)"
      }
    ],
    "cultural_insight": "\"Go over\" detaylı inceleme; \"look over\" daha hızlı olabilir. \"Scan\" veya \"skim\" hızlıca taramak.",
    "fluency_tip": "\"Can you take a quick look at this?\" (şuna hızlıca bakabilir misin?) iş arkadaşına rica."
  },
  {
    "id": 355,
    "category": "gunluk",
    "tr": "Başının çaresine baktı",
    "tags": [
      "başının çaresi",
      "kendi kendine",
      "halletmek",
      "idare etmek"
    ],
    "english_primary": "Fend for yourself",
    "alternatives": [
      "Stand on your own two feet",
      "Look after number one"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başının çaresine",
        "tr_gloss": "look for the remedy of your head",
        "en_fragment": "fend for yourself",
        "bridge_type": "transform",
        "explanation": "Türkçe dert/baş için çare aramak; İngilizce savunmak (fend) veya kendi ayakları üzerinde durmak"
      }
    ],
    "cultural_insight": "\"Fend\" (defend'den gelir) kendini savunmak/geçindirmek. \"Stand on your own two feet\" bağımsızlık vurgular.",
    "fluency_tip": "\"You're on your own\" (tek başınasın) bazen terk etme, bazen güçlendirme anlamında."
  },
  {
    "id": 400,
    "category": "deyimler",
    "tr": "Eli mahkum",
    "tags": [
      "eli mahkum",
      "mecbur",
      "başka şansı yok",
      "çaresiz"
    ],
    "english_primary": "Their hands are tied",
    "alternatives": [
      "They have no choice",
      "They're forced into it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Eli mahkum",
        "tr_gloss": "their hand is a prisoner",
        "en_fragment": "hands are tied",
        "bridge_type": "direct",
        "explanation": "El kısıtlaması (mahkum/bağlı) metaforu iki dilde de mecburiyet için kullanılıyor"
      }
    ],
    "cultural_insight": "İngilizcede \"tied\" (bağlı) daha fiziksel, Türkçede \"mahkum\" (hükümlü) daha hukuki/kaderci bir ton taşır.",
    "fluency_tip": "\"I'd help if I could, but my hands are tied\" iş hayatında nazik bir ret için çok uygundur."
  },
  {
    "id": 401,
    "category": "deyimler",
    "tr": "Canı burnunda",
    "tags": [
      "canı burnunda",
      "çok öfkeli",
      "patlamak üzere",
      "tahammülsüz"
    ],
    "english_primary": "At the end of their tether",
    "alternatives": [
      "Ready to snap",
      "Losing their patience"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Canı burnunda",
        "tr_gloss": "their soul is at their nose",
        "en_fragment": "at the end of their tether",
        "bridge_type": "transform",
        "explanation": "Türkçe canın çıkış noktasına gelmesi; İngilizce hayvanın bağlı olduğu ipin (tether) sonuna gelmesi"
      }
    ],
    "cultural_insight": "\"Tether\" bir hayvanın hareket alanını kısıtlayan iptir. Sonuna gelmek, artık sabrın bittiği noktadır.",
    "fluency_tip": "\"I'm at my wit's end\" de çok benzer bir çaresizlik/sabrın sonu ifadesidir."
  },
  {
    "id": 402,
    "category": "deyimler",
    "tr": "Kulağına küpe olsun",
    "tags": [
      "kulağına küpe",
      "unutma",
      "ders olsun",
      "nasihat"
    ],
    "english_primary": "Let that be a lesson to you",
    "alternatives": [
      "Bear that in mind",
      "Take it to heart"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kulağına küpe",
        "tr_gloss": "earring for the ear",
        "en_fragment": "lesson",
        "bridge_type": "transform",
        "explanation": "Türkçe kalıcı bir aksesuar (küpe) metaforu; İngilizce deneyimden ders çıkarma (lesson)"
      }
    ],
    "cultural_insight": "Türkçe metafor çok görseldir — hiç çıkmayacak bir hatırlatıcı. İngilizce ise eğitici sürece (lesson) odaklanır.",
    "fluency_tip": "\"A word to the wise\" (bilgeye bir söz) de bir öğüt vermeden önce kullanılır."
  },
  {
    "id": 403,
    "category": "deyimler",
    "tr": "Burnundan kıl aldırmıyor",
    "tags": [
      "burnundan kıl aldırmıyor",
      "kibirli",
      "huysuz",
      "eleştiri kabul etmez"
    ],
    "english_primary": "On a high horse",
    "alternatives": [
      "Too proud for their own good",
      "Touchy"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Burnundan kıl",
        "tr_gloss": "hair from the nose",
        "en_fragment": "high horse",
        "bridge_type": "transform",
        "explanation": "Türkçe hassas bir fiziksel müdahale metaforu; İngilizce yüksek at (üstünlük) metaforu"
      }
    ],
    "cultural_insight": "\"High horse\" ortaçağda soyluların bindiği büyük atlardan gelir. Türkçe deyim ise kişinin aşırı hassasiyetini ve kibrini vurgular.",
    "fluency_tip": "\"Get off your high horse\" birine kibrini bırakmasını söylemek için kullanılır."
  },
  {
    "id": 404,
    "category": "deyimler",
    "tr": "İçli dışlı oldu",
    "tags": [
      "içli dışlı",
      "samimi",
      "yakın",
      "çok görüşen"
    ],
    "english_primary": "As thick as thieves",
    "alternatives": [
      "On very intimate terms",
      "Hand in glove"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçli dışlı oldular",
        "tr_gloss": "with inside and outside",
        "en_fragment": "thick as thieves",
        "bridge_type": "transform",
        "explanation": "Türkçe derinlik/şeffaflık metaforu; İngilizce hırsızların suç ortaklığı (yoğunluk) metaforu"
      }
    ],
    "cultural_insight": "\"Thick as thieves\" (hırsızlar kadar yoğun/yakın) suç ortağı gibi her şeyi paylaşanlar için kullanılır.",
    "fluency_tip": "\"They've become very close\" en sade karşılığıdır."
  },
  {
    "id": 405,
    "category": "deyimler",
    "tr": "Göz boyadı",
    "tags": [
      "göz boyamak",
      "kandırmak",
      "aldatmak",
      "gösteriş"
    ],
    "english_primary": "Pull the wool over someone's eyes",
    "alternatives": [
      "Window dressing (iş dünyasında)",
      "Deceive"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Göz boyadı",
        "tr_gloss": "to paint the eye",
        "en_fragment": "pull the wool over eyes",
        "bridge_type": "transform",
        "explanation": "Türkçe boya ile görüşü kapatma; İngilizce yün (peruk) ile gözü örtme metaforu"
      }
    ],
    "cultural_insight": "\"Pull the wool\" deyimi 18. yüzyıldaki büyük peruklardan gelir; peruğu aşağı çekip kişinin görmesini engellemek anlamındadır.",
    "fluency_tip": "\"It's just for show\" (sadece gösteriş için) de benzer bir durumu anlatır."
  },
  {
    "id": 406,
    "category": "deyimler",
    "tr": "Lafı ağzına tıkadı",
    "tags": [
      "lafı ağzına tıkadı",
      "susturdu",
      "konuşturmadı",
      "sözünü kesti"
    ],
    "english_primary": "Shut them down",
    "alternatives": [
      "Cut them short",
      "Silenced them"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Lafı ağzına tıkadı",
        "tr_gloss": "stuffed the word into their mouth",
        "en_fragment": "shut them down",
        "bridge_type": "transform",
        "explanation": "Türkçe fiziksel bir engelleme (tıkama) metaforu; İngilizce sistemi kapatma (shut down) metaforu"
      }
    ],
    "cultural_insight": "İngilizce \"shut down\" modern ve teknolojik bir tona sahipken, Türkçe deyim daha fiziksel ve agresiftir.",
    "fluency_tip": "\"Don't cut me off!\" (sözümü kesme!) tartışmalarda sık kullanılır."
  },
  {
    "id": 407,
    "category": "deyimler",
    "tr": "Kabuğuna çekildi",
    "tags": [
      "kabuğuna çekilmek",
      "yalnız kalmak",
      "sosyallikten kaçmak",
      "içe dönmek"
    ],
    "english_primary": "Retreat into one's shell",
    "alternatives": [
      "Withdraw",
      "Close oneself off"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kabuğuna çekildi",
        "tr_gloss": "to withdraw into one's shell",
        "en_fragment": "retreat into one's shell",
        "bridge_type": "direct",
        "explanation": "Kaplumbağa/salyangoz metaforu her iki dilde de izolasyon için aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir metafor. \"Shrinking violet\" ise aşırı utangaç kişiler için kullanılan bir çiçektir.",
    "fluency_tip": "\"They've gone quiet lately\" birinin kabuğuna çekildiğini anlatmanın doğal yoludur."
  },
  {
    "id": 408,
    "category": "deyimler",
    "tr": "Kök söktürdü",
    "tags": [
      "kök söktürdü",
      "çok uğraştırdı",
      "zorluk çıkardı",
      "canından bezdirdi"
    ],
    "english_primary": "Gave them a run for their money",
    "alternatives": [
      "Made it extremely difficult",
      "Put them through the wringer"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kök söktürdü",
        "tr_gloss": "made them pull out roots",
        "en_fragment": "put through the wringer",
        "bridge_type": "transform",
        "explanation": "Türkçe tarımsal zorluk (kök sökmek); İngilizce çamaşır sıkma merdanesi (wringer) metaforu"
      }
    ],
    "cultural_insight": "\"Put through the wringer\" (merdaneden geçirmek) birini aşırı zorlamak ve yıpratmak demektir.",
    "fluency_tip": "\"They made life difficult for me\" en basit ve net karşılıktır."
  },
  {
    "id": 409,
    "category": "deyimler",
    "tr": "Tepesi attı",
    "tags": [
      "tepesi attı",
      "çok sinirlendi",
      "fırladı",
      "öfkelendi"
    ],
    "english_primary": "Flipped their lid",
    "alternatives": [
      "Lost their cool",
      "Blew a fuse"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Tepesi attı",
        "tr_gloss": "their top jumped/flipped",
        "en_fragment": "flipped their lid",
        "bridge_type": "direct",
        "explanation": "Kapak/tepe atma metaforu her iki dilde de anlık öfke patlaması için aynıdır"
      }
    ],
    "cultural_insight": "\"Blow a fuse\" (sigorta attırmak) elektriksel bir öfke metaforudur. Türkçe \"tepe\" ve İngilizce \"lid\" (kapak) aynı basınç etkisini anlatır.",
    "fluency_tip": "\"They just snapped\" (aniden koptu/patladı) çok doğal bir ifadedir."
  },
  {
    "id": 410,
    "category": "sosyal",
    "tr": "Ağzı laf yapıyor",
    "tags": [
      "ağzı laf yapıyor",
      "ikna edici",
      "konuşkan",
      "hitabeti güçlü"
    ],
    "english_primary": "Gift of the gab",
    "alternatives": [
      "Well-spoken",
      "Articulate"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzı laf yapıyor",
        "tr_gloss": "their mouth makes words",
        "en_fragment": "gift of the gab",
        "bridge_type": "transform",
        "explanation": "Türkçe aktif üretim (laf yapmak); İngilizce \"gab\" (boş boğazlık/konuşma) yeteneği/hediyesi"
      }
    ],
    "cultural_insight": "\"Gift of the gab\" (konuşma hediyesi) İrlanda kökenli bir deyimdir ve etkileyici konuşma yeteneğini anlatır.",
    "fluency_tip": "\"They're a smooth talker\" (pürüzsüz konuşuyor) biraz daha manipülatif bir ima taşıyabilir."
  },
  {
    "id": 411,
    "category": "sosyal",
    "tr": "Laf aramızda",
    "tags": [
      "laf aramızda",
      "gizli",
      "kimseye söyleme",
      "aramızda kalsın"
    ],
    "english_primary": "Between you and me",
    "alternatives": [
      "Off the record",
      "Just between us"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Laf aramızda",
        "tr_gloss": "the word is between us",
        "en_fragment": "between you and me",
        "bridge_type": "direct",
        "explanation": "Mekansal gizlilik metaforu (aramızda) her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Off the record\" gazetecilikten gelen bir terimdir. \"Just between these four walls\" (bu dört duvar arasında) daha dramatik bir gizlilik vurgusudur.",
    "fluency_tip": "\"Don't breathe a word of this to anyone\" (kimseye tek kelime bile sızdırma) çok güçlü bir uyarıdır."
  },
  {
    "id": 412,
    "category": "sosyal",
    "tr": "Can ciğer kuzu sarması",
    "tags": [
      "can ciğer",
      "çok yakın dost",
      "ayrılmaz ikili",
      "samimi"
    ],
    "english_primary": "Joined at the hip",
    "alternatives": [
      "Inseparable",
      "Thick as thieves"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Can ciğer",
        "tr_gloss": "soul and liver",
        "en_fragment": "joined at the hip",
        "bridge_type": "transform",
        "explanation": "Türkçe iç organ (can/ciğer) yakınlığı; İngilizce kalça (hip) hizasından yapışıklık metaforu"
      }
    ],
    "cultural_insight": "Türkçede ciğer en yakın dostluğu temsil ederken, İngilizcede \"joined at the hip\" (kalçadan yapışık) ayrılmazlığı fiziksel olarak vurgular.",
    "fluency_tip": "\"They do everything together\" en doğal açıklamadır."
  },
  {
    "id": 413,
    "category": "sosyal",
    "tr": "İçini döktü",
    "tags": [
      "içini dökmek",
      "anlatmak",
      "rahatlamak",
      "paylaşmak"
    ],
    "english_primary": "Pour one's heart out",
    "alternatives": [
      "Get it off your chest",
      "Open up"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçini döktü",
        "tr_gloss": "to pour out one's inside",
        "en_fragment": "pour one's heart out",
        "bridge_type": "direct",
        "explanation": "Sıvı/dökme metaforu her iki dilde de duyguların paylaşımı için aynıdır"
      }
    ],
    "cultural_insight": "\"Get it off your chest\" (göğsünden indir) bir rahatlama sağlar. \"Pour out\" ise daha yoğun bir paylaşımı anlatır.",
    "fluency_tip": "\"I just needed someone to talk to\" bu durumun ardındaki ihtiyacı özetler."
  },
  {
    "id": 414,
    "category": "sosyal",
    "tr": "Üstüne vardı",
    "tags": [
      "üstüne varmak",
      "zorlamak",
      "baskı yapmak",
      "sıkıştırmak"
    ],
    "english_primary": "Pressure someone",
    "alternatives": [
      "Corner someone",
      "Push someone too hard"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Üstüne vardı",
        "tr_gloss": "to go upon someone",
        "en_fragment": "push someone",
        "bridge_type": "transform",
        "explanation": "Türkçe yaklaşma/üzerine gitme (mesafe); İngilizce itme (push) metaforu"
      }
    ],
    "cultural_insight": "\"Cornered\" (köşeye sıkışmış) hissetmek, üstüne varılan kişinin duygusunu anlatır.",
    "fluency_tip": "\"Don't push them\" veya \"Give them some space\" bu eyleme karşı verilen tavsiyelerdir."
  },
  {
    "id": 431,
    "category": "gunluk",
    "tr": "Oldu bittiye getirdi",
    "tags": [
      "oldu bitti",
      "aceleye getir",
      "emrivaki",
      "çabucak halletti"
    ],
    "english_primary": "Presented a fait accompli",
    "alternatives": [
      "Rushed it through",
      "Railroaded it"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Oldu bitti",
        "tr_gloss": "it happened and finished",
        "en_fragment": "fait accompli",
        "bridge_type": "transform",
        "explanation": "Türkçe zaman/bitiş vurgusu; İngilizce (Fransızca kökenli) \"tamamlanmış gerçek\" terimi"
      }
    ],
    "cultural_insight": "\"Fait accompli\" geri dönüşü olmayan bir kararın oldu bittiye getirilmesidir. \"Railroaded\" ise birini bir şeye zorla sürüklemek demektir.",
    "fluency_tip": "\"They didn't give me a choice\" bu durumun sonucunu anlatır."
  },
  {
    "id": 432,
    "category": "gunluk",
    "tr": "Eşek şakası",
    "tags": [
      "eşek şakası",
      "ağır şaka",
      "kaba şaka",
      "pratik şaka"
    ],
    "english_primary": "Practical joke",
    "alternatives": [
      "Prank",
      "Horseplay"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Eşek şakası",
        "tr_gloss": "donkey joke",
        "en_fragment": "practical joke / horseplay",
        "bridge_type": "transform",
        "explanation": "Türkçe eşek (kabalık sembolü); İngilizce \"practical\" (uygulamalı) veya \"horse\" (at oyunu/kabalaşma) metaforu"
      }
    ],
    "cultural_insight": "\"Horseplay\" kaba ve gürültülü fiziksel şakalaşmalar için kullanılır. \"Prank\" ise daha planlı şakalardır.",
    "fluency_tip": "\"That went too far\" (bu çok ileri gitti) ağır bir eşek şakasına verilen tepkidir."
  },
  {
    "id": 433,
    "category": "gunluk",
    "tr": "Havadan sudan konuştu",
    "tags": [
      "havadan sudan",
      "boş konuşma",
      "sohbet",
      "small talk"
    ],
    "english_primary": "Small talk",
    "alternatives": [
      "Make conversation",
      "Chat about nothing in particular"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Havadan sudan",
        "tr_gloss": "of air and water",
        "en_fragment": "small talk",
        "bridge_type": "transform",
        "explanation": "Türkçe doğa unsurları (hava/su); İngilizce boyut (küçük/small) metaforu"
      }
    ],
    "cultural_insight": "İngiliz kültüründe \"small talk\" sosyal bir zorunluluktur ve genellikle hava durumuyla başlar (Türkçe ile benzerlik!).",
    "fluency_tip": "\"We were just making small talk\" toplantı öncesi sohbetleri anlatır."
  },
  {
    "id": 434,
    "category": "gunluk",
    "tr": "Gününü gün etti",
    "tags": [
      "gününü gün etmek",
      "keyif sürmek",
      "eğlenmek",
      "hayatını yaşamak"
    ],
    "english_primary": "Live it up",
    "alternatives": [
      "Have the time of one's life",
      "Make the most of the day"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gününü gün etti",
        "tr_gloss": "to make one's day a day",
        "en_fragment": "live it up",
        "bridge_type": "transform",
        "explanation": "Türkçe zamanı gerçek kılma (gün etmek); İngilizce hayatı \"yukarıda\" yaşama metaforu"
      }
    ],
    "cultural_insight": "\"Live it up\" lüks ve eğlence dolu bir yaşamı anlatır. \"Carpe diem\" (gününü yakala) ise daha felsefi bir yaklaşımdır.",
    "fluency_tip": "\"You only live once\" (YOLO) bu yaşam tarzının popüler sloganıdır."
  },
  {
    "id": 435,
    "category": "gunluk",
    "tr": "Dili damağı kurumuş",
    "tags": [
      "dili damağı kurudu",
      "çok susamış",
      "susuzluk"
    ],
    "english_primary": "Parched",
    "alternatives": [
      "Spitting feathers (İngiltere)",
      "Gasping for a drink"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dili damağı kurumuş",
        "tr_gloss": "tongue and palate dried",
        "en_fragment": "parched",
        "bridge_type": "transform",
        "explanation": "Türkçe fiziksel betimleme; İngilizce \"parch\" (kavrulmuş toprak gibi kuruma) metaforu"
      }
    ],
    "cultural_insight": "\"Spitting feathers\" (tüy tükürmek) ağzın o kadar kuru olduğunu ve tüy tükürüyormuş hissi verdiğini anlatır.",
    "fluency_tip": "\"I'm dying for a glass of water\" çok susamışken söylenecek en doğal ifadedir."
  },
  {
    "id": 451,
    "category": "duygular",
    "tr": "Aklı havada",
    "tags": [
      "aklı havada",
      "dalgın",
      "hayalci",
      "odaklanamayan"
    ],
    "english_primary": "Head in the clouds",
    "alternatives": [
      "Airhead (hakaretvari)",
      "Spacey"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aklı havada",
        "tr_gloss": "mind in the air",
        "en_fragment": "head in the clouds",
        "bridge_type": "direct",
        "explanation": "Hava/bulut (yükseklik/uzaklık) metaforu dalgınlık için iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir metafor. \"Grounded\" (yere basan) ise bunun tam zıttıdır — gerçekçi kişi.",
    "fluency_tip": "\"Earth to [Name]!\" dalgın birinin dikkatini çekmek için kullanılır."
  },
  {
    "id": 452,
    "category": "duygular",
    "tr": "Pirelendi",
    "tags": [
      "pirelenmek",
      "şüphelenmek",
      "huylanmak",
      "tedirgin olmak"
    ],
    "english_primary": "Smell a rat",
    "alternatives": [
      "Suspect something is wrong",
      "Get a bad vibe"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Pirelendi",
        "tr_gloss": "to be infested with fleas",
        "en_fragment": "smell a rat",
        "bridge_type": "transform",
        "explanation": "Türkçe kaşıntı/huzursuzluk (pire); İngilizce koku/fare (rat) metaforu"
      }
    ],
    "cultural_insight": "Her iki dil de şüpheyi küçük/zararlı hayvanlar üzerinden anlatır. \"Fleas\" (pireler) kişisel huzursuzluk; \"Rat\" (fare) dışsal bir tehlike/ihanet kokusu.",
    "fluency_tip": "\"Something doesn't feel right\" en yaygın sezgi ifadesidir."
  },
  {
    "id": 453,
    "category": "duygular",
    "tr": "Şafak attı",
    "tags": [
      "şafak attı",
      "aniden anladı",
      "jeton düştü",
      "farkına vardı"
    ],
    "english_primary": "The penny dropped",
    "alternatives": [
      "It finally clicked",
      "It dawned on me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Şafak attı",
        "tr_gloss": "the dawn broke (suddenly)",
        "en_fragment": "the penny dropped",
        "bridge_type": "transform",
        "explanation": "Türkçe ışık/sabah (şafak) metaforu; İngilizce jeton (penny) düşme metaforu"
      }
    ],
    "cultural_insight": "\"The penny dropped\" eski otomatlardan gelir; paranın düşmesiyle makinenin çalışması gibi anlayışın gelmesidir.",
    "fluency_tip": "\"Lightbulb moment\" (ampul anı) ani fikirler için harikadır."
  },
  {
    "id": 454,
    "category": "duygular",
    "tr": "Kırk fırın ekmek yemesi lazım",
    "tags": [
      "kırk fırın",
      "tecrübesiz",
      "daha çok yol var",
      "yetersiz"
    ],
    "english_primary": "A long way to go",
    "alternatives": [
      "Still a greenhorn",
      "Needs a lot more experience"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kırk fırın ekmek",
        "tr_gloss": "needs to eat forty ovens of bread",
        "en_fragment": "a long way to go",
        "bridge_type": "transform",
        "explanation": "Türkçe gıda/büyüme metaforu; İngilizce mesafe/yol metaforu"
      }
    ],
    "cultural_insight": "Türkçe deyim büyüme ve beslenme üzerinden olgunlaşmayı anlatırken, İngilizce bunu katedilecek bir yol olarak görür.",
    "fluency_tip": "\"They're still learning the ropes\" (hala ipleri/işi öğreniyor) daha profesyonel bir tondur."
  },
  {
    "id": 500,
    "category": "deyimler",
    "tr": "İçli dışlı oldular",
    "tags": [
      "içli dışlı",
      "samimi",
      "çok yakın",
      "ayrılmaz"
    ],
    "english_primary": "Inseparable",
    "alternatives": [
      "Thick as thieves",
      "Hand in glove"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçli dışlı oldular",
        "tr_gloss": "with inside and outside",
        "en_fragment": "inseparable",
        "bridge_type": "transform",
        "explanation": "Türkçe şeffaflık/yakınlık (iç ve dış bir); İngilizce ayrılmazlık (ayrılamaz)"
      }
    ],
    "cultural_insight": "\"Thick as thieves\" çok yakın dostluğu biraz gizemli/suç ortağı gibi bir tonda anlatır.",
    "fluency_tip": "\"They're always together\" en basit ve yaygın karşılıktır."
  },
  {
    "id": 501,
    "category": "gunluk",
    "tr": "Dile kolay",
    "tags": [
      "dile kolay",
      "kolay değil",
      "söylemesi kolay",
      "zor iş"
    ],
    "english_primary": "Easier said than done",
    "alternatives": [
      "It sounds simple, but it's not",
      "Easier said than accomplished"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dile kolay",
        "tr_gloss": "easy for the tongue",
        "en_fragment": "easier said than done",
        "bridge_type": "direct",
        "explanation": "Söyleme/dil metaforu iki dilde de zorluğu vurgulamak için aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir gerçek: konuşmak (dil) kolaydır, yapmak (eylem) zordur. İngilizce bunu bir karşılaştırma olarak kurar.",
    "fluency_tip": "\"That's easier said than done\" bir tavsiyeye karşı verilen en klasik tepkidir."
  },
  {
    "id": 502,
    "category": "sosyal",
    "tr": "Canı sağ olsun",
    "tags": [
      "canı sağ olsun",
      "önemli değil",
      "affettim",
      "boşver"
    ],
    "english_primary": "No hard feelings",
    "alternatives": [
      "Let it be",
      "It doesn't matter"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Canı sağ olsun",
        "tr_gloss": "may their soul be healthy",
        "en_fragment": "no hard feelings",
        "bridge_type": "transform",
        "explanation": "Türkçe sağlık dileğiyle affetme; İngilizce kötü duygu yokluğu (hard feelings)"
      }
    ],
    "cultural_insight": "Türkçede bir zarar gördüğümüzde bile kişinin sağlığına odaklanıp konuyu kapatmak çok derin bir kültürel tavırdır.",
    "fluency_tip": "\"I bear no grudge\" (kin beslemiyorum) daha resmi ve ağır bir karşılıktır."
  },
  {
    "id": 503,
    "category": "duygular",
    "tr": "Gözlerim doldu",
    "tags": [
      "gözlerim doldu",
      "ağlamak üzere",
      "duygulandım",
      "hüzünlendim"
    ],
    "english_primary": "I got choked up",
    "alternatives": [
      "I welled up",
      "I was on the verge of tears"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gözlerim doldu",
        "tr_gloss": "my eyes filled",
        "en_fragment": "welled up / choked up",
        "bridge_type": "transform",
        "explanation": "Türkçe gözdeki su (dolma); İngilizce kuyudan su çıkması (well up) veya boğazın düğümlenmesi (choke up)"
      }
    ],
    "cultural_insight": "\"Choked up\" fiziksel olarak konuşamama halini de içerir. \"Welled up\" ise gözlerin dolması metaforuna çok yakındır.",
    "fluency_tip": "\"It was a tear-jerker\" (gözyaşı çekici) çok duygusal filmler için kullanılır."
  },
  {
    "id": 504,
    "category": "yogunluk",
    "tr": "Ağzıyla kuş tutsa da",
    "tags": [
      "ağzıyla kuş tutsa",
      "ne yapsa boş",
      "yaranamaz",
      "imkansız"
    ],
    "english_primary": "No matter what they do",
    "alternatives": [
      "Even if they moved mountains",
      "It wouldn't make a difference"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzıyla kuş tutsa",
        "tr_gloss": "even if they catch a bird with their mouth",
        "en_fragment": "move mountains",
        "bridge_type": "transform",
        "explanation": "Türkçe imkansız/garip bir eylem; İngilizce devasa bir kütleyi hareket ettirme (dağları oynatmak)"
      }
    ],
    "cultural_insight": "Türkçe deyim, birinin ne kadar \"üstün\" veya \"garip\" bir çaba sarf etse de sonucun değişmeyeceğini anlatır.",
    "fluency_tip": "\"Nothing they do will satisfy me\" durumun duygusal özetidir."
  },
  {
    "id": 505,
    "category": "deyimler",
    "tr": "Başına buyruk",
    "tags": [
      "başına buyruk",
      "özgür",
      "kendi bildiğini okur",
      "inatçı"
    ],
    "english_primary": "A law unto themselves",
    "alternatives": [
      "Strong-willed",
      "Independent-minded"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başına buyruk",
        "tr_gloss": "command of their own head",
        "en_fragment": "a law unto themselves",
        "bridge_type": "transform",
        "explanation": "Türkçe kendi kafasından emir alma; İngilizce kendi başına bir \"yasa\" olma metaforu"
      }
    ],
    "cultural_insight": "\"A law unto themselves\" (kendileri için bir yasa) kural tanımayan, sadece kendi kurallarıyla yaşayan kişiler için harika bir tanımdır.",
    "fluency_tip": "\"They follow their own path\" (kendi yolunu izler) daha pozitif bir tondur."
  },
  {
    "id": 506,
    "category": "gunluk",
    "tr": "Şeytanın bacağını kırdı",
    "tags": [
      "şeytanın bacağını",
      "şansızlığı kırmak",
      "başarmak",
      "nihayet"
    ],
    "english_primary": "Break the ice / Break the cycle",
    "alternatives": [
      "Finally break through",
      "A stroke of luck"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Şeytanın bacağını",
        "tr_gloss": "to break the devil's leg",
        "en_fragment": "break through",
        "bridge_type": "transform",
        "explanation": "Türkçe kötülüğü/engeli (şeytanın bacağı) fiziksel olarak kırma; İngilizce bariyeri aşma (break through)"
      }
    ],
    "cultural_insight": "Şeytanın bacağını kırmak, uzun süren bir şanssızlığın aniden bitmesidir. İngilizcede \"Break the jinx\" (uğursuzluğu bozmak) tam karşılıktır.",
    "fluency_tip": "\"I finally had a bit of luck\" en sade ve doğal ifade."
  },
  {
    "id": 507,
    "category": "sasirma",
    "tr": "Eli ayağına dolaştı",
    "tags": [
      "eli ayağına",
      "telaşlandı",
      "panik",
      "beceremedi"
    ],
    "english_primary": "All fingers and thumbs",
    "alternatives": [
      "Clumsy",
      "Panic-stricken"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Eli ayağına dolaştı",
        "tr_gloss": "hands and feet got tangled",
        "en_fragment": "all fingers and thumbs",
        "bridge_type": "transform",
        "explanation": "Türkçe uzuvların birbirine karışması; İngilizce sadece başparmak ve parmaklardan oluşma (beceriksizlik) metaforu"
      }
    ],
    "cultural_insight": "\"All fingers and thumbs\" bir şeyi el becerisiyle yapamama durumudur. Türkçe ise panik anındaki koordinasyon kaybını anlatır.",
    "fluency_tip": "\"I was in such a rush that I couldn't do anything right\" durumu açıklar."
  },
  {
    "id": 508,
    "category": "sosyal",
    "tr": "İki elin kanda olsa da gel",
    "tags": [
      "iki elin kanda",
      "mutlaka gel",
      "çok önemli",
      "bekliyorum"
    ],
    "english_primary": "No matter what, be there",
    "alternatives": [
      "Drop everything and come",
      "Make it your top priority"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İki elin kanda",
        "tr_gloss": "even if your two hands are in blood",
        "en_fragment": "drop everything",
        "bridge_type": "transform",
        "explanation": "Türkçe en uç durum/suç/kan hali (abartılı); İngilizce her şeyi bırakma (drop everything)"
      }
    ],
    "cultural_insight": "Türkçe deyimdeki \"kan\" en büyük engeli veya suçluluk halini bile kapsayan bir sadakat vurgusudur.",
    "fluency_tip": "\"This is non-negotiable\" (bu tartışılamaz) iş ortamında \"mutlaka yapılmalı\" anlamında kullanılır."
  },
  {
    "id": 509,
    "category": "duygular",
    "tr": "İçini ferah tut",
    "tags": [
      "içini ferah tut",
      "rahat ol",
      "endişelenme",
      "huzurlu ol"
    ],
    "english_primary": "Rest assured",
    "alternatives": [
      "Keep an open mind",
      "Don't lose heart"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçini ferah tut",
        "tr_gloss": "keep your inside spacious",
        "en_fragment": "rest assured",
        "bridge_type": "transform",
        "explanation": "Türkçe mekansal genişlik (ferahlık); İngilizce emin olma/dinlenme (rest) metaforu"
      }
    ],
    "cultural_insight": "\"Rest assured\" (garanti veriyorum, emin ol) birine güven verirken kullanılır. Türkçe \"ferahlık\" daha ruhsal bir huzuru anlatır.",
    "fluency_tip": "\"Everything will be fine\" en klasik teselli cümlesidir."
  },
  {
    "id": 510,
    "category": "deyimler",
    "tr": "Kulağı delikti",
    "tags": [
      "kulağı delik",
      "haber alan",
      "her şeyi duyan",
      "bilgili"
    ],
    "english_primary": "Ear to the ground",
    "alternatives": [
      "Well-informed",
      "Connected"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kulağı delikti",
        "tr_gloss": "ear with a hole",
        "en_fragment": "ear to the ground",
        "bridge_type": "transform",
        "explanation": "Türkçe kalıcı bir hassasiyet (delik kulak); İngilizce yeri dinleme (iz sürme) metaforu"
      }
    ],
    "cultural_insight": "\"Ear to the ground\" (kulağı yerde) bir haberin önceden veya gizlice duyulması için çaba göstermek demektir.",
    "fluency_tip": "\"They always know what's going on before anyone else\" durumu çok iyi özetler."
  },
  {
    "id": 511,
    "category": "yogunluk",
    "tr": "Başından savdı",
    "tags": [
      "başından savdı",
      "umursamadı",
      "yolladı",
      "dinlemedi"
    ],
    "english_primary": "Brushed them off",
    "alternatives": [
      "Dismissed them",
      "Paid them no mind"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Başından savdı",
        "tr_gloss": "fended off from their head",
        "en_fragment": "brushed off",
        "bridge_type": "transform",
        "explanation": "Türkçe uzaklaştırma/defetme; İngilizce toz gibi fırçalayıp atma (brush off) metaforu"
      }
    ],
    "cultural_insight": "\"Brush off\" (fırçalamak) karşıdakini önemsiz bir toz parçası gibi görüp ciddiye almamaktır.",
    "fluency_tip": "\"They didn't even listen to my proposal\" (teklifimi dinlemediler bile) hayal kırıklığını anlatır."
  },
  {
    "id": 512,
    "category": "sosyal",
    "tr": "İple çekiyorum",
    "tags": [
      "iple çekiyorum",
      "sabırsızım",
      "bekliyorum",
      "heyecanlıyım"
    ],
    "english_primary": "I'm counting down the days",
    "alternatives": [
      "I can't wait",
      "I'm looking forward to it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İple çekiyorum",
        "tr_gloss": "pulling with a rope",
        "en_fragment": "counting down the days",
        "bridge_type": "transform",
        "explanation": "Türkçe zamanı kendine çekme (aktif çaba); İngilizce günleri sayma (pasif bekleyiş)"
      }
    ],
    "cultural_insight": "Türkçe deyimdeki \"ip\" zamanın sanki fiziksel bir nesne gibi yaklaşıp gelmesini isteme arzusudur.",
    "fluency_tip": "\"I'm so excited for the weekend\" günlük hayatta en sık duyacağın versiyondur."
  },
  {
    "id": 513,
    "category": "duygular",
    "tr": "Burnunda tütüyor",
    "tags": [
      "burnunda tütüyor",
      "çok özledi",
      "hasret",
      "yanıp tutuşuyor"
    ],
    "english_primary": "I'm pining for it",
    "alternatives": [
      "I miss it terribly",
      "I'm homesick (vatan için)"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Burnunda tütüyor",
        "tr_gloss": "smoking in the nose",
        "en_fragment": "pining / longing",
        "bridge_type": "transform",
        "explanation": "Türkçe koku/duman (yakınlık) metaforu; İngilizce acı çekerek özleme (pine)"
      }
    ],
    "cultural_insight": "\"Pine for\" (özlemle zayıf düşmek) çok derin bir hasardır. Türkçe deyimdeki koku/duman ise o kişinin hayalinin çok yakın olduğunu anlatır.",
    "fluency_tip": "\"I really miss my mom's cooking\" (annemin yemeklerini çok özledim) klasik bir örnek."
  },
  {
    "id": 514,
    "category": "deyimler",
    "tr": "Astarı yüzünden pahalıya geldi",
    "tags": [
      "astarı yüzünden pahalı",
      "gereksiz masraf",
      "değmez",
      "pahalıya mal oldu"
    ],
    "english_primary": "It costs more than it's worth",
    "alternatives": [
      "A white elephant",
      "Diminishing returns"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Astarı yüzünden",
        "tr_gloss": "lining is more expensive than the face",
        "en_fragment": "costs more than worth",
        "bridge_type": "direct",
        "explanation": "Kumaş/terzilik metaforu (astarı yüzünü geçti) vs. değer karşılaştırması"
      }
    ],
    "cultural_insight": "\"White elephant\" (beyaz fil) bakımı kendinden pahalı olan, işe yaramayan mülkler için kullanılır.",
    "fluency_tip": "\"It's not worth the effort\" (çabaya değmez) en genel karşılıktır."
  },
  {
    "id": 515,
    "category": "sasirma",
    "tr": "Dudağı uçukladı",
    "tags": [
      "dudağı uçukladı",
      "çok şaşırdı",
      "korktu",
      "şok oldu"
    ],
    "english_primary": "They were flabbergasted",
    "alternatives": [
      "Taken aback",
      "Speechless"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Dudağı uçukladı",
        "tr_gloss": "their lip had a cold sore",
        "en_fragment": "flabbergasted",
        "bridge_type": "transform",
        "explanation": "Türkçe şokun fiziksel sonucu (uçuk); İngilizce şaşkınlığın ses yansıması (flabbergasted)"
      }
    ],
    "cultural_insight": "Türkçe şaşkınlığın veya korkunun bedendeki (dudaktaki) izine odaklanırken, İngilizce kelimenin kendisiyle (flabbergasted) durumu abartır.",
    "fluency_tip": "\"I was stunned\" (sersemledim/dondum) kısa ve etkili bir karşılık."
  },
  {
    "id": 516,
    "category": "gunluk",
    "tr": "Can damarından yakaladı",
    "tags": [
      "can damarı",
      "tam isabet",
      "zayıf nokta",
      "en önemli yer"
    ],
    "english_primary": "Hit a nerve",
    "alternatives": [
      "Hit the nail on the head",
      "Targeted the weak spot"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Can damarı",
        "tr_gloss": "life vein",
        "en_fragment": "nerve",
        "bridge_type": "direct",
        "explanation": "Damar/sinir (vital organ) metaforu hassas noktayı bulmak için aynıdır"
      }
    ],
    "cultural_insight": "\"Hit a nerve\" (sinire dokunmak) genellikle birini rahatsız edecek bir gerçeği söylemek demektir. \"Hit the nail\" ise doğru tespiti yapmaktır.",
    "fluency_tip": "\"You really got me there\" (beni oradan yakaladın/vurdun) tartışmalarda kullanılır."
  },
  {
    "id": 518,
    "category": "sosyal",
    "tr": "Burnundan soluyor",
    "tags": [
      "burnundan soluyor",
      "çok öfkeli",
      "sinirli",
      "patlamaya hazır"
    ],
    "english_primary": "Fuming",
    "alternatives": [
      "Seeing red",
      "Losing their cool"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Burnundan soluyor",
        "tr_gloss": "breathing through the nose",
        "en_fragment": "fuming",
        "bridge_type": "transform",
        "explanation": "Türkçe hızlı/öfkeli nefes (boğa gibi); İngilizce dumanı tütme (fuming) metaforu"
      }
    ],
    "cultural_insight": "\"Fuming\" (dumanı tüten) birinin içindeki öfke ateşinin dışa vurmasını anlatır. \"Seeing red\" ise tamamen öfkeyle kör olma hali.",
    "fluency_tip": "\"Stay out of their way, they're fuming\" (yolundan çekil, dumanı tütüyor/çok sinirli) iyi bir uyarıdır."
  },
  {
    "id": 519,
    "category": "duygular",
    "tr": "İçim açıldı",
    "tags": [
      "içim açıldı",
      "ferahladım",
      "mutlu oldum",
      "güzelleşti"
    ],
    "english_primary": "It brightened up my day",
    "alternatives": [
      "I feel refreshed",
      "My spirits were lifted"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçim açıldı",
        "tr_gloss": "my inside opened up",
        "en_fragment": "brightened up",
        "bridge_type": "transform",
        "explanation": "Türkçe ferahlık/açılma; İngilizce ışık/parlaklık (brighten) metaforu"
      }
    ],
    "cultural_insight": "Türkçe darlığın gitmesine (açılma), İngilizce karanlığın gitmesine (ışık) odaklanır.",
    "fluency_tip": "\"That really cheered me up\" (bu beni gerçekten neşelendirdi) en doğal karşılık."
  },
  {
    "id": 520,
    "category": "deyimler",
    "tr": "Ağzı kulaklarına varıyor",
    "tags": [
      "ağzı kulaklarına",
      "çok mutlu",
      "gülüyor",
      "seviniyor"
    ],
    "english_primary": "Grinning from ear to ear",
    "alternatives": [
      "Beaming with joy",
      "Radiating happiness"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzı kulaklarına",
        "tr_gloss": "mouth reaching to the ears",
        "en_fragment": "grinning from ear to ear",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Mutluluktan gülümsemenin fiziksel boyutu her iki dilde de aynı"
      }
    ],
    "cultural_insight": "Bu evrensel bir beden dili betimlemesidir. \"Beaming\" (ışık saçmak) ise mutluluğun nur gibi yayılmasını anlatır.",
    "fluency_tip": "\"They look so happy\" en sade ama bu deyimi kullanmak \"fluency\" (akıcılık) katar."
  },
  {
    "id": 600,
    "category": "sasirma",
    "tr": "Gözlerime inanamadım",
    "tags": [
      "gözlerime inanamadım",
      "şaşkınlık",
      "inanılmaz",
      "gördüm ama"
    ],
    "english_primary": "I couldn't believe my eyes",
    "alternatives": [
      "It was a sight to behold",
      "I was stunned"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözlerime inanamadım",
        "tr_gloss": "I couldn't believe my eyes",
        "en_fragment": "couldn't believe my eyes",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! İki dil de görme duyusuyla inanç arasındaki çatışmayı aynı anlatıyor"
      }
    ],
    "cultural_insight": "Neredeyse her kültürde \"görmek inanmaktır\" (seeing is believing). Bu yüzden şaşkınlık gözler üzerinden anlatılır.",
    "fluency_tip": "\"I had to double-check\" (iki kez bakmam/kontrol etmem gerekti) şaşkınlığı anlatmanın pratik yolu."
  },
  {
    "id": 601,
    "category": "gunluk",
    "tr": "İçim kıyıldı",
    "tags": [
      "içim kıyıldı",
      "acıktım",
      "çok acıktım",
      "mide kazınması"
    ],
    "english_primary": "I'm famished",
    "alternatives": [
      "My stomach is growling",
      "I'm starving"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçim kıyıldı",
        "tr_gloss": "my inside was shredded",
        "en_fragment": "famished / starving",
        "bridge_type": "transform",
        "explanation": "Türkçe fiziksel parçalanma (kıyılma) hissi; İngilizce açlıktan ölme (starving) metaforu"
      }
    ],
    "cultural_insight": "\"Famished\" (aşırı aç) \"famine\" (kıtlık) kökenlidir. Türkçe \"kıyılmak\" ise daha çok midenin boşluktan gelen o garip hissini anlatır.",
    "fluency_tip": "\"I could eat a horse!\" (bir atı yiyebilirim!) çok yaygın bir açlık abartısıdır."
  },
  {
    "id": 602,
    "category": "sosyal",
    "tr": "Hatırın kalmasın",
    "tags": [
      "hatırın kalmasın",
      "kırmamak için",
      "senin için",
      "ayıp olmasın"
    ],
    "english_primary": "For old times' sake",
    "alternatives": [
      "Just to please you",
      "Out of respect for you"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Hatır",
        "tr_gloss": "memory / respect / sake",
        "en_fragment": "sake",
        "bridge_type": "direct",
        "explanation": "Hatır/sake (hatır için) kavramları iki dilde de sosyal borç ve saygıyı anlatır"
      }
    ],
    "cultural_insight": "\"For old times' sake\" (eski günlerin hatırına) geçmişteki dostluğa vurgu yapar. Türkçe \"hatır\" çok daha geniş bir \"sosyal kredi\" sistemidir.",
    "fluency_tip": "\"Let's do it for the sake of peace\" (huzur hatırına yapalım) tartışmaları bitirmek için kullanılır."
  },
  {
    "id": 603,
    "category": "duygular",
    "tr": "Yerin dibine girdim",
    "tags": [
      "yerin dibi",
      "utandım",
      "çok utandım",
      "rezil oldum"
    ],
    "english_primary": "I wanted the ground to swallow me up",
    "alternatives": [
      "I was mortified",
      "I felt so small"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Yerin dibine girdim",
        "tr_gloss": "I entered the bottom of the ground",
        "en_fragment": "ground to swallow me up",
        "bridge_type": "direct",
        "explanation": "Yerin içine saklanma isteği iki dilde de aşırı utanç için aynı metaforu kullanır"
      }
    ],
    "cultural_insight": "Utancın en temel fiziksel arzusu: yok olmak. Her iki dil de bunu yerin altına girmek olarak görür.",
    "fluency_tip": "\"I was so embarrassed, I just wanted to disappear\" en doğal duygusal açıklama."
  },
  {
    "id": 604,
    "category": "yogunluk",
    "tr": "Elim ayağım buz kesti",
    "tags": [
      "elim ayağım buz kesti",
      "korku",
      "şok",
      "donup kalma"
    ],
    "english_primary": "I froze in my tracks",
    "alternatives": [
      "I went cold all over",
      "My blood ran cold"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Buz kesti",
        "tr_gloss": "cut/became ice",
        "en_fragment": "went cold / froze",
        "bridge_type": "direct",
        "explanation": "Korku veya şok anındaki soğuma/donma hissi evrenseldir"
      }
    ],
    "cultural_insight": "\"My blood ran cold\" (kanım soğuk aktı) dehşet anları için klasik bir İngilizce deyimdir.",
    "fluency_tip": "\"I stood there like a statue\" (heykel gibi durdum) şok anındaki hareketsizliği anlatır."
  },
  {
    "id": 605,
    "category": "deyimler",
    "tr": "Ağzına bir parmak bal çaldı",
    "tags": [
      "ağzına bal çalmak",
      "kandırmak",
      "küçük vaat",
      "oyalamak"
    ],
    "english_primary": "Sugarcoat the pill",
    "alternatives": [
      "Give someone a sweetener",
      "Dangle a carrot"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Bal çalmak",
        "tr_gloss": "to smear honey",
        "en_fragment": "sugarcoat",
        "bridge_type": "transform",
        "explanation": "Türkçe doğrudan tatlı sürme; İngilizce hapın acısını şekerle örtme metaforu"
      }
    ],
    "cultural_insight": "\"Dangle a carrot\" (havuç sallamak) birini bir ödüle koşturmak için oyalamak demektir. İkisi de geçici/aldatıcı tatlılık sunar.",
    "fluency_tip": "\"Don't fall for it\" (buna kanma) birinin \"ağzına bal çalındığında\" verilen uyarıdır."
  },
  {
    "id": 606,
    "category": "gunluk",
    "tr": "İşi yokuşa sürüyor",
    "tags": [
      "işi yokuşa sürmek",
      "zorlaştırmak",
      "engel çıkarmak",
      "direnç"
    ],
    "english_primary": "Making things difficult",
    "alternatives": [
      "Being obstructive",
      "Dragging their feet"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Yokuş",
        "tr_gloss": "uphill slope",
        "en_fragment": "dragging feet / obstructive",
        "bridge_type": "transform",
        "explanation": "Türkçe coğrafi zorluk (yokuş); İngilizce fiziksel direnç (ayak sürümek)"
      }
    ],
    "cultural_insight": "\"Dragging your feet\" (ayaklarını sürümek) bir işi bilerek yavaşlatmak ve zorlaştırmak demektir.",
    "fluency_tip": "\"Stop making excuses\" (bahane üretmeyi bırak) yokuşa süren birine tepki olabilir."
  },
  {
    "id": 607,
    "category": "sosyal",
    "tr": "Başa baş",
    "tags": [
      "başa baş",
      "eşit",
      "denk",
      "aynı seviyede"
    ],
    "english_primary": "Neck and neck",
    "alternatives": [
      "Evenly matched",
      "On par"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başa baş",
        "tr_gloss": "head to head",
        "en_fragment": "neck and neck",
        "bridge_type": "direct",
        "explanation": "Beden organı (kafa/boyun) yakınlığı üzerinden eşitlik metaforu"
      }
    ],
    "cultural_insight": "\"Neck and neck\" at yarışlarından gelir. Atların boyun boyuna olması. Türkçe \"başa baş\" da benzer bir fiziksel yakınlığı anlatır.",
    "fluency_tip": "\"The two teams are on par with each other\" (iki takım birbirine denk) profesyonel bir tondur."
  },
  {
    "id": 608,
    "category": "duygular",
    "tr": "Can attı",
    "tags": [
      "can attı",
      "çok istedi",
      "sabırsızlandı",
      "istekli"
    ],
    "english_primary": "Was dying to do it",
    "alternatives": [
      "Eager to",
      "Can't wait to"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Can attı",
        "tr_gloss": "threw their soul/life",
        "en_fragment": "dying to",
        "bridge_type": "transform",
        "explanation": "Türkçe canını ortaya koyma (atma); İngilizce arzu uğruna ölme (dying) metaforu"
      }
    ],
    "cultural_insight": "Aşırı istek her iki dilde de \"can/yaşam\" ile ilişkilendirilir. \"I'm dying to see the new movie\" gibi.",
    "fluency_tip": "\"I'm really keen on...\" (bir şeye çok hevesliyim) biraz daha İngiliz tarzıdır."
  },
  {
    "id": 609,
    "category": "deyimler",
    "tr": "Bir taşla iki kuş",
    "tags": [
      "bir taşla iki kuş",
      "verim",
      "çift kazanç",
      "aynı anda"
    ],
    "english_primary": "Kill two birds with one stone",
    "alternatives": [
      "Two for the price of one",
      "Double benefit"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Bir taşla iki kuş",
        "tr_gloss": "two birds with one stone",
        "en_fragment": "kill two birds with one stone",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Avcılık kökenli bu metafor her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "Çok yaygın bir eşleşme. Verimliliğin evrensel sembolü haline gelmiştir.",
    "fluency_tip": "\"It's a win-win situation\" (kazan-kazan durumu) iş dünyasında bu deyimin modern karşılığıdır."
  },
  {
    "id": 610,
    "category": "gunluk",
    "tr": "Havadan sudan",
    "tags": [
      "havadan sudan",
      "boş konuşma",
      "sohbet",
      "önemsiz"
    ],
    "english_primary": "Small talk",
    "alternatives": [
      "Chitchat",
      "About nothing in particular"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Havadan sudan",
        "tr_gloss": "from air and water",
        "en_fragment": "small talk",
        "bridge_type": "transform",
        "explanation": "Türkçe doğa elementleri; İngilizce boyut (küçük) metaforu"
      }
    ],
    "cultural_insight": "İlginçtir ki her iki kültürde de önemsiz konuşmalar doğa veya boyut ile küçültülür.",
    "fluency_tip": "\"We were just shooting the breeze\" (rüzgarı vuruyorduk/uçuruyorduk) çok samimi ve doğal bir Amerikan deyimidir."
  },
  {
    "id": 611,
    "category": "sosyal",
    "tr": "Ağız aradı",
    "tags": [
      "ağız aramak",
      "bilgi sızdırmak",
      "yoklamak",
      "ipucu almak"
    ],
    "english_primary": "Fish for information",
    "alternatives": [
      "Sound someone out",
      "Probe"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağız aradı",
        "tr_gloss": "to search the mouth",
        "en_fragment": "fish for",
        "bridge_type": "transform",
        "explanation": "Türkçe doğrudan konuşma organına odaklanır; İngilizce sabırla bilgi \"yakalama\" (balık tutma) metaforu kullanır"
      }
    ],
    "cultural_insight": "\"Sound someone out\" (birini seslendirmek/yoklamak) birinin fikrini dolaylı yoldan öğrenmek için çok kullanılır.",
    "fluency_tip": "\"I was just testing the waters\" (suları test ediyordum) tepkiyi ölçmek için bir şeyler söylemek."
  },
  {
    "id": 612,
    "category": "duygular",
    "tr": "İçine kapanık",
    "tags": [
      "içine kapanık",
      "utangaç",
      "sessiz",
      "sosyal değil"
    ],
    "english_primary": "Withdrawn",
    "alternatives": [
      "Introverted",
      "Introvert"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçine kapanık",
        "tr_gloss": "closed into oneself",
        "en_fragment": "withdrawn",
        "bridge_type": "direct",
        "explanation": "Her iki dil de \"kendine çekilme/kapanma\" yönünü kullanır"
      }
    ],
    "cultural_insight": "\"Wallflower\" (duvar çiçeği) partilerde kimseyle konuşmayan, kenarda duran kişiler için kullanılan tatlı bir deyimdir.",
    "fluency_tip": "\"They keep to themselves\" (kendi başlarına takılırlar) birini kırmadan içe kapanık olduğunu söyleme yoludur."
  },
  {
    "id": 613,
    "category": "yogunluk",
    "tr": "Su gibi akıp geçti",
    "tags": [
      "su gibi",
      "hızlı",
      "zaman geçti",
      "çabucak"
    ],
    "english_primary": "Time flies",
    "alternatives": [
      "It went by in a flash",
      "It was over before I knew it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Su gibi",
        "tr_gloss": "like water",
        "en_fragment": "flies",
        "bridge_type": "transform",
        "explanation": "Türkçe zamanın sıvı gibi akışı (akışkanlık); İngilizce zamanın uçuşu (hız) metaforu"
      }
    ],
    "cultural_insight": "Türkçe zamanı dere gibi görür, İngilizce ise kuş gibi. Her iki durumda da tutulamazlık vurgulanır.",
    "fluency_tip": "\"How time flies!\" (zaman nasıl da uçuyor!) en klasik zaman şikayeti."
  },
  {
    "id": 615,
    "category": "basari",
    "tr": "Turnayı gözünden vurdu",
    "tags": [
      "turnayı gözünden vurmak",
      "büyük başarı",
      "şans",
      "tam isabet"
    ],
    "english_primary": "Hit the jackpot",
    "alternatives": [
      "Hit the bullseye",
      "Struck gold"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Turnayı gözünden",
        "tr_gloss": "hit the crane in the eye",
        "en_fragment": "hit the jackpot / struck gold",
        "bridge_type": "transform",
        "explanation": "Türkçe avcılık başarısı; İngilizce kumar (jackpot) veya madencilik (gold) başarısı"
      }
    ],
    "cultural_insight": "\"Hit the bullseye\" (boğa gözünü vurmak) dart oyunundan gelir ve tam isabetli bir başarıyı anlatır.",
    "fluency_tip": "\"You really hit the nail on the head\" (çiviyi tam kafasından vurdun) doğru bir tespit yaptığında söylenir."
  },
  {
    "id": 616,
    "category": "gunluk",
    "tr": "Kulak misafiri",
    "tags": [
      "kulak misafiri",
      "duydum",
      "istemeden",
      "dinleme"
    ],
    "english_primary": "Eavesdrop (kasıtlı) / Overhear (tesadüf)",
    "alternatives": [
      "Happened to hear",
      "Caught a snippet of conversation"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Misafir",
        "tr_gloss": "guest",
        "en_fragment": "over-hear",
        "bridge_type": "transform",
        "explanation": "Türkçe \"misafir\" diyerek eylemi kibarlaştırır; İngilizce üstten duyma (over) metaforunu kullanır"
      }
    ],
    "cultural_insight": "\"Eavesdropping\" saçak altından su damlamasını dinlemekten gelir. Genelde kaba bir eylemdir. \"Overhear\" ise tamamen masumdur.",
    "fluency_tip": "\"I couldn't help overhearing...\" (istemeden duydum ama...) söze girmenin en kibar yolu."
  },
  {
    "id": 617,
    "category": "sosyal",
    "tr": "Can ciğer",
    "tags": [
      "can ciğer",
      "yakın dost",
      "samimi",
      "çok sevilen"
    ],
    "english_primary": "Bosom buddies",
    "alternatives": [
      "Besties",
      "Close knit"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Can ciğer",
        "tr_gloss": "soul and liver",
        "en_fragment": "bosom buddies",
        "bridge_type": "transform",
        "explanation": "Türkçe iç organ yakınlığı; İngilizce göğüs/bağır (bosom) yakınlığı"
      }
    ],
    "cultural_insight": "\"Bosom\" (göğüs) İngilizcede duyguların merkezidir. Türkçe \"ciğer\" ise en derin sevgi bağını temsil eder.",
    "fluency_tip": "\"We're like family\" (aile gibiyiz) dostluğu anlatmanın en güçlü yolu."
  },
  {
    "id": 618,
    "category": "duygular",
    "tr": "İçi kan ağladı",
    "tags": [
      "içi kan ağlamak",
      "çok üzülmek",
      "belli etmemek",
      "derin acı"
    ],
    "english_primary": "Bleeding inside",
    "alternatives": [
      "Heart is breaking silently",
      "Pain behind the smile"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçi kan ağladı",
        "tr_gloss": "inside crying blood",
        "en_fragment": "bleeding inside",
        "bridge_type": "direct",
        "explanation": "İçsel kanama/acı metaforu iki dilde de saklı derin acı için aynıdır"
      }
    ],
    "cultural_insight": "Türkçe \"kan ağlamak\" çok daha dramatik bir ifadedir. İngilizcede \"My heart bleeds for you\" bazen alaycı (sahte acıma) olarak da kullanılabilir, dikkat!",
    "fluency_tip": "\"I was hurting more than I let on\" (gösterdiğimden daha çok acı çekiyordum) duygusal dürüstlük ifadesidir."
  },
  {
    "id": 620,
    "category": "sasirma",
    "tr": "Nutku tutuldu",
    "tags": [
      "nutku tutulmak",
      "şaşırmak",
      "konuşamamak",
      "donup kalmak"
    ],
    "english_primary": "Speechless",
    "alternatives": [
      "Stunned into silence",
      "Dumbstruck"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Nutku tutuldu",
        "tr_gloss": "speech held",
        "en_fragment": "speechless",
        "bridge_type": "direct",
        "explanation": "Konuşma yetisinin (nutuk/speech) fiziksel olarak engellenmesi"
      }
    ],
    "cultural_insight": "\"Dumbstruck\" (aptallaşmış gibi vurulmuş) şokun zekayı bile anlık durdurmasını anlatır.",
    "fluency_tip": "\"I didn't know what hit me\" (bana ne çarptığını anlamadım) şaşkınlık sonrası tepki."
  },
  {
    "id": 621,
    "category": "gunluk",
    "tr": "İpe un serdi",
    "tags": [
      "ipe un sermek",
      "bahane üretmek",
      "istememek",
      "zorlaştırmak"
    ],
    "english_primary": "Making excuses",
    "alternatives": [
      "Dragging one's feet",
      "Creating obstacles"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İpe un serdi",
        "tr_gloss": "to spread flour on a rope",
        "en_fragment": "making excuses",
        "bridge_type": "transform",
        "explanation": "Türkçe imkansız bir eylemle bahane üretme; İngilizce sadece eylemin adı"
      }
    ],
    "cultural_insight": "Türkçe deyim Nasreddin Hoca hikayesine dayanır ve absürt bir bahaneyi anlatır. İngilizcede \"Cock and bull story\" (horoz ve boğa hikayesi) uydurma bahaneler için kullanılır.",
    "fluency_tip": "\"Don't give me that!\" (bana bunu anlatma!) uydurma bir bahaneye karşı sert bir tepkidir."
  },
  {
    "id": 622,
    "category": "sosyal",
    "tr": "Yüzsüz",
    "tags": [
      "yüzsüz",
      "utanmaz",
      "çekinmez",
      "arsız"
    ],
    "english_primary": "Thick-skinned",
    "alternatives": [
      "Shameless",
      "Brazen"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Yüzsüz",
        "tr_gloss": "faceless",
        "en_fragment": "thick-skinned",
        "bridge_type": "transform",
        "explanation": "Türkçe onur organının (yüz) yokluğu; İngilizce derinin kalınlığı (etkilenmeme) metaforu"
      }
    ],
    "cultural_insight": "\"Thick-skinned\" İngilizcede bazen eleştiriden etkilenmeyen (pozitif) anlamda da kullanılır. \"Shameless\" ise tamamen negatiftir.",
    "fluency_tip": "\"How could they do that after everything?\" (tüm olanlardan sonra bunu nasıl yapabildiler?) yüzsüzlük karşısında şaşkınlık sorusu."
  },
  {
    "id": 623,
    "category": "duygular",
    "tr": "İçine doğdu",
    "tags": [
      "içine doğmak",
      "hissetmek",
      "sezmek",
      "malum olmak"
    ],
    "english_primary": "Had a hunch",
    "alternatives": [
      "A gut feeling",
      "Instinct told me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçine doğdu",
        "tr_gloss": "to be born into one's inside",
        "en_fragment": "hunch / gut feeling",
        "bridge_type": "transform",
        "explanation": "Türkçe bilginin içte doğuşu; İngilizce fiziksel içgüdü (bağırsak/gut) veya kambur (hunch) metaforu"
      }
    ],
    "cultural_insight": "\"Gut feeling\" Batı dünyasında mantık kadar güvenilen bir \"karın\" hissidir.",
    "fluency_tip": "\"I had a sneaking suspicion\" (gizli bir şüphem vardı) yavaş yavaş emin olduğun hisler için kullanılır."
  },
  {
    "id": 624,
    "category": "yogunluk",
    "tr": "Başından aştı",
    "tags": [
      "başından aşmak",
      "çok fazla",
      "yetişememek",
      "yoğunluk"
    ],
    "english_primary": "Up to one's ears in it",
    "alternatives": [
      "Overwhelmed",
      "Buried in work"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aşmak",
        "tr_gloss": "to exceed/pass over",
        "en_fragment": "up to ears",
        "bridge_type": "transform",
        "explanation": "Türkçe seviyenin kafayı geçmesi; İngilizce seviyenin kulaklara kadar gelmesi metaforu"
      }
    ],
    "cultural_insight": "Her iki dilde de iş yükü bir su veya toprak yığını gibi görülür ve beden seviyesiyle ölçülür.",
    "fluency_tip": "\"I'm struggling to keep my head above water\" (suyun üzerinde kalmaya çalışıyorum) yoğunlukla başa çıkma çabası."
  },
  {
    "id": 625,
    "category": "sasirma",
    "tr": "Gözü dışarıda",
    "tags": [
      "gözü dışarıda",
      "sadakatsiz",
      "hep fazlasını isteyen",
      "doyumsuz"
    ],
    "english_primary": "A wandering eye",
    "alternatives": [
      "Looking for something else",
      "Not content"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gözü dışarıda",
        "tr_gloss": "eye is outside",
        "en_fragment": "wandering eye",
        "bridge_type": "direct",
        "explanation": "Gözün odak dışına (dışarı/gezintiye) çıkması iki dilde de sadakatsizlik metaforudur"
      }
    ],
    "cultural_insight": "\"Wandering eye\" (gezen göz) genellikle ilişkilerde partnerinden başkasına bakanlar için kullanılır.",
    "fluency_tip": "\"They're never satisfied with what they have\" (ellerindekilerle asla yetinmezler) genel bir doyumsuzluk ifadesidir."
  },
  {
    "id": 626,
    "category": "basari",
    "tr": "Havlu attı",
    "tags": [
      "havlu atmak",
      "vazgeçmek",
      "pes etmek",
      "bitirmek"
    ],
    "english_primary": "Throw in the towel",
    "alternatives": [
      "Give up",
      "Call it quits"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Havlu attı",
        "tr_gloss": "throwing the towel",
        "en_fragment": "throw in the towel",
        "bridge_type": "direct",
        "explanation": "Birebir eşleşme! Boks kökenli pes etme metaforu evrenseldir"
      }
    ],
    "cultural_insight": "Spor dünyasından dile yerleşmiş en güçlü metaforlardan biridir.",
    "fluency_tip": "\"Never give up!\" (asla pes etme!) en yaygın motivasyon cümlesidir."
  },
  {
    "id": 627,
    "category": "gunluk",
    "tr": "Ağzı sıkı",
    "tags": [
      "ağzı sıkı",
      "sır saklayan",
      "güvenilir",
      "konuşmaz"
    ],
    "english_primary": "Tight-lipped",
    "alternatives": [
      "Keep a secret",
      "Close-mouthed"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ağzı sıkı",
        "tr_gloss": "tight mouth",
        "en_fragment": "tight-lipped",
        "bridge_type": "direct",
        "explanation": "Ağzın/dudakların sıkılığı metaforu iki dilde de sır saklamak için aynıdır"
      }
    ],
    "cultural_insight": "\"My lips are sealed\" (dudaklarım mühürlü) sır saklayacağına dair verilen en güçlü sözdür.",
    "fluency_tip": "\"You can trust me, I won't say a word\" (bana güvenebilirsin, tek kelime etmem) güven verme cümlesidir."
  },
  {
    "id": 628,
    "category": "sosyal",
    "tr": "İçten pazarlıklı çıktı",
    "tags": [
      "içten pazarlıklı",
      "sinsi",
      "gizli niyetli",
      "hesapçı"
    ],
    "english_primary": "Had an ulterior motive",
    "alternatives": [
      "Two-faced",
      "Devious"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçten pazarlıklı çıktı",
        "tr_gloss": "bargaining from inside",
        "en_fragment": "ulterior motive",
        "bridge_type": "transform",
        "explanation": "Türkçe içsel ticaret/hesap metaforu; İngilizce gizli/arka plan amacı metaforu"
      }
    ],
    "cultural_insight": "\"Ulterior motive\" (ötesindeki amaç) bir iyiliğin altında yatan bencil çıkarı anlatır.",
    "fluency_tip": "\"What's the catch?\" (işin bit yeniği/hilesi ne?) çok iyi görünen bir teklif karşısında sorulur."
  },
  {
    "id": 629,
    "category": "duygular",
    "tr": "Dünya umurunda değil",
    "tags": [
      "dünya umurunda değil",
      "rahat",
      "kaygısız",
      "vurdumduymaz"
    ],
    "english_primary": "Without a care in the world",
    "alternatives": [
      "Happy-go-lucky",
      "Indifferent"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dünya umurunda değil",
        "tr_gloss": "doesn't care about the world",
        "en_fragment": "without a care in the world",
        "bridge_type": "direct",
        "explanation": "Dünya/care yokluğu metaforu kaygısızlık için neredeyse aynıdır"
      }
    ],
    "cultural_insight": "\"Happy-go-lucky\" hayatı geldiği gibi yaşayan, her durumda mutlu olan kişiler için kullanılır.",
    "fluency_tip": "\"I wish I could be that relaxed\" (keşke ben de o kadar rahat olabilsem) bir özenme ifadesidir."
  },
  {
    "id": 630,
    "category": "yogunluk",
    "tr": "Göz açtırmadı",
    "tags": [
      "göz açtırmadı",
      "fırsat vermedi",
      "baskı yaptı",
      "çok yoğundu"
    ],
    "english_primary": "Didn't give them a moment's peace",
    "alternatives": [
      "Kept them on their toes",
      "Relentless"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Göz açtırmadı",
        "tr_gloss": "didn't let open the eye",
        "en_fragment": "kept on toes",
        "bridge_type": "transform",
        "explanation": "Türkçe görme/dikkat engeli; İngilizce ayak parmakları üzerinde tutma (sürekli tetikte olma) metaforu"
      }
    ],
    "cultural_insight": "\"Keep someone on their toes\" (birini parmak uçlarında tutmak) onu sürekli çalışmaya veya hazır olmaya zorlamak demektir.",
    "fluency_tip": "\"My boss is really keeping me on my toes lately\" iş hayatında çok sık duyulur."
  },
  {
    "id": 700,
    "category": "gunluk",
    "tr": "Sağlık olsun",
    "tags": [
      "sağlık olsun",
      "önemli değil",
      "canın sağolsun",
      "boşver"
    ],
    "english_primary": "It's not the end of the world",
    "alternatives": [
      "Never mind",
      "These things happen"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Sağlık olsun",
        "tr_gloss": "may there be health",
        "en_fragment": "not the end of the world",
        "bridge_type": "transform",
        "explanation": "Türkçe sağlığın her şeyden üstünlüğü; İngilizce olayın büyüklüğünün (kıyamet değil) reddi metaforu"
      }
    ],
    "cultural_insight": "Türkçede kayıplar karşısında \"sağlık olsun\" diyerek teselli bulmak çok yaygındır. İngilizcede \"It could be worse\" (daha kötü olabilirdi) benzer bir teselli verir.",
    "fluency_tip": "\"Don't let it get you down\" (bunun seni üzmesine izin verme) harika bir teselli cümlesidir."
  },
  {
    "id": 701,
    "category": "deyimler",
    "tr": "Ayıkla pirincin taşını",
    "tags": [
      "ayıkla pirincin taşını",
      "karışık iş",
      "sorun",
      "çıkmaza girdi"
    ],
    "english_primary": "What a fine mess!",
    "alternatives": [
      "A real can of worms",
      "In a pickle"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ayıkla",
        "tr_gloss": "sort out / clean",
        "en_fragment": "mess / can of worms",
        "bridge_type": "transform",
        "explanation": "Türkçe gıdadaki (pirinç) zor ayıklanan madde; İngilizce solucan kutusu (can of worms) veya turşu (pickle) metaforu"
      }
    ],
    "cultural_insight": "\"A can of worms\" açıldığında kontrol edilemeyen karmaşık sorunları anlatır. \"In a pickle\" ise sıkışık ve zor bir durumu.",
    "fluency_tip": "\"We've got a situation here\" (bir durumumuz/sorunumuz var) iş hayatında kibarca sorun belirtme yoludur."
  },
  {
    "id": 702,
    "category": "sosyal",
    "tr": "Ağzından çıkanı kulağı duymuyor",
    "tags": [
      "ağzından çıkan",
      "ne dediğini bilmiyor",
      "öfkeli",
      "düşüncesiz"
    ],
    "english_primary": "They don't know what they're saying",
    "alternatives": [
      "They're talking nonsense",
      "They lost control of their tongue"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzından çıkan",
        "tr_gloss": "what comes out of their mouth",
        "en_fragment": "what they're saying",
        "bridge_type": "direct",
        "explanation": "Konuşma eylemi iki dilde de benzer; Türkçe kulak/duyma (kontrol) eksikliğini vurguluyor"
      }
    ],
    "cultural_insight": "Türkçe deyim, kişinin öfke anında mantık kontrolünü tamamen kaybettiğini çok güzel bir fiziksel döngüyle (ağız-kulak) anlatır.",
    "fluency_tip": "\"Think before you speak\" (konuşmadan önce düşün) bu duruma verilen en iyi tavsiyedir."
  },
  {
    "id": 703,
    "category": "duygular",
    "tr": "İçim rahat",
    "tags": [
      "içim rahat",
      "huzurluyum",
      "vicdanım temiz",
      "endişem yok"
    ],
    "english_primary": "My mind is at ease",
    "alternatives": [
      "I have a clear conscience",
      "I can rest easy"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçim",
        "tr_gloss": "my inside",
        "en_fragment": "my mind",
        "bridge_type": "transform",
        "explanation": "Türkçe \"iç\" (ruh/kalp); İngilizce \"mind\" (zihin) merkezli huzur metaforu"
      }
    ],
    "cultural_insight": "\"Clear conscience\" (temiz vicdan) etik bir huzuru anlatır. \"At ease\" ise genel bir rahatlık halidir.",
    "fluency_tip": "\"I've done my best, so I'm at peace with it\" (elimden geleni yaptım, bu yüzden huzurluyum) çok doğal bir ifade."
  },
  {
    "id": 704,
    "category": "yogunluk",
    "tr": "Burnundan kıl aldırmadı",
    "tags": [
      "burnundan kıl aldırmamak",
      "kibirli",
      "eleştiriye kapalı",
      "gururlu"
    ],
    "english_primary": "Too proud for one's own good",
    "alternatives": [
      "High and mighty",
      "Full of oneself"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kıl aldırmamak",
        "tr_gloss": "not letting a hair be taken",
        "en_fragment": "proud / high and mighty",
        "bridge_type": "transform",
        "explanation": "Türkçe aşırı hassasiyet ve dokunulmazlık; İngilizce yükseklik (high) ve güç (mighty) metaforu"
      }
    ],
    "cultural_insight": "\"High and mighty\" (yüksek ve güçlü) başkalarına üstten bakan kibirli kişiler için tam karşılıktır.",
    "fluency_tip": "\"Don't take it so personally\" (bunu bu kadar kişisel alma) bu tip kişilere verilen bir tavsiyedir."
  },
  {
    "id": 705,
    "category": "sasirma",
    "tr": "Şaka gibi",
    "tags": [
      "şaka gibi",
      "inanılmaz",
      "olamaz",
      "gerçek mi"
    ],
    "english_primary": "You've got to be joking",
    "alternatives": [
      "Is this for real?",
      "Unbelievable"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Şaka",
        "tr_gloss": "joke",
        "en_fragment": "joking",
        "bridge_type": "direct",
        "explanation": "İnanılmaz bir durumu şaka metaforuyla anlatmak her iki dilde de ortaktır"
      }
    ],
    "cultural_insight": "\"You're pulling my leg\" (bacağımı çekiyorsun) şaka yaptığını veya kandırdığını söylemenin çok klasik bir İngilizce yoludur.",
    "fluency_tip": "\"No way!\" şaşkınlık anında en çok duyacağın tepkidir."
  },
  {
    "id": 707,
    "category": "gunluk",
    "tr": "Vakit nakittir",
    "tags": [
      "vakit nakittir",
      "zaman değerli",
      "acele et",
      "zaman para"
    ],
    "english_primary": "Time is money",
    "alternatives": [
      "Don't waste time",
      "Make every second count"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Vakit nakittir",
        "tr_gloss": "time is cash",
        "en_fragment": "time is money",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Zamanın ekonomik bir değer olduğu fikri evrenseldir"
      }
    ],
    "cultural_insight": "Modern dünyanın en temel hız ve verimlilik sloganıdır.",
    "fluency_tip": "\"We're on a tight schedule\" (sıkışık bir takvimimiz var) iş hayatında çok yaygındır."
  },
  {
    "id": 708,
    "category": "sosyal",
    "tr": "Gönlünü aldı",
    "tags": [
      "gönlünü almak",
      "barışmak",
      "özür dilemek",
      "affettirmek"
    ],
    "english_primary": "Make it up to someone",
    "alternatives": [
      "Win someone over",
      "Smooth things over"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gönlünü",
        "tr_gloss": "heart / soul",
        "en_fragment": "make it up",
        "bridge_type": "transform",
        "explanation": "Türkçe kalbi \"almak\" (iyileştirmek); İngilizce durumu \"telafi etmek\" (make up) metaforu"
      }
    ],
    "cultural_insight": "\"Make it up to you\" (sana telafi edeceğim) hatadan sonra yapılan jestleri anlatır.",
    "fluency_tip": "\"Let me buy you lunch to make it up to you\" (telafi için sana öğle yemeği ısmarlayayım) çok doğal."
  },
  {
    "id": 710,
    "category": "yogunluk",
    "tr": "İş işten geçti",
    "tags": [
      "iş işten geçti",
      "geç kaldın",
      "artık çok geç",
      "fırsat kaçtı"
    ],
    "english_primary": "That ship has sailed",
    "alternatives": [
      "Missed the boat",
      "Too little too late"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İş işten geçti",
        "tr_gloss": "work passed from work",
        "en_fragment": "ship has sailed",
        "bridge_type": "transform",
        "explanation": "Türkçe zamanın akışı; İngilizce geminin (fırsatın) limandan ayrılması metaforu"
      }
    ],
    "cultural_insight": "\"Missed the boat\" ve \"That ship has sailed\" kaçırılan fırsatlar için en yaygın İngilizce deyimlerdir.",
    "fluency_tip": "\"It's water under the bridge now\" (artık köprü altındaki su — geçti bitti) olanları değiştiremeyeceğinizi anlatır."
  },
  {
    "id": 711,
    "category": "sasirma",
    "tr": "Aklım durdu",
    "tags": [
      "aklım durdu",
      "şaşırdım",
      "anlayamadım",
      "şok"
    ],
    "english_primary": "My mind went blank",
    "alternatives": [
      "I'm at a loss",
      "I can't process this"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Aklım durdu",
        "tr_gloss": "my mind stopped",
        "en_fragment": "mind went blank",
        "bridge_type": "transform",
        "explanation": "Türkçe makineleşmiş akılın durması; İngilizce ekranın/sayfanın beyazlaşması (boşluk) metaforu"
      }
    ],
    "cultural_insight": "\"Mind went blank\" genellikle sınavda veya sahnede her şeyi unutmak anlamında da kullanılır.",
    "fluency_tip": "\"I drew a blank\" (boşluk çizdim/buldum) bir ismi veya bilgiyi hatırlayamadığında söylenir."
  },
  {
    "id": 712,
    "category": "basari",
    "tr": "Kendi ayakları üzerinde durdu",
    "tags": [
      "kendi ayakları üzerinde",
      "bağımsız",
      "özgür",
      "başarılı"
    ],
    "english_primary": "Stand on one's own two feet",
    "alternatives": [
      "Be independent",
      "Self-sufficient"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kendi ayakları",
        "tr_gloss": "own feet",
        "en_fragment": "own two feet",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Bağımsızlık ve yetişkinlik metaforu beden dengesi üzerinden aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir gelişim ve başarı sembolüdür.",
    "fluency_tip": "\"They're finally standing on their own two feet\" (nihayet kendi ayakları üzerinde duruyorlar) ekonomik bağımsızlık için sık kullanılır."
  },
  {
    "id": 713,
    "category": "gunluk",
    "tr": "Laf olsun diye",
    "tags": [
      "laf olsun",
      "öylesine",
      "ciddi değil",
      "sohbet olsun"
    ],
    "english_primary": "Just for the sake of it",
    "alternatives": [
      "Just talking",
      "For no particular reason"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Laf olsun",
        "tr_gloss": "let there be word",
        "en_fragment": "for the sake of it",
        "bridge_type": "transform",
        "explanation": "Türkçe konuşmanın varlığı için; İngilizce eylemin/nedenin hatırı için metaforu"
      }
    ],
    "cultural_insight": "\"Just for the sake of talking\" (sadece konuşmuş olmak için) tam karşılıktır.",
    "fluency_tip": "\"Don't take them seriously, they're just talking for the sake of it\" (onları ciddiye alma, öylesine konuşuyorlar) iyi bir uyarıdır."
  },
  {
    "id": 714,
    "category": "sosyal",
    "tr": "Arkasından konuştu",
    "tags": [
      "arkasından konuşmak",
      "dedikodu",
      "gıybet",
      "ihanet"
    ],
    "english_primary": "Talk behind someone's back",
    "alternatives": [
      "Backstab (daha ağır)",
      "Gossip"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Arkadan",
        "tr_gloss": "behind",
        "en_fragment": "behind someone's back",
        "bridge_type": "direct",
        "explanation": "Mekansal gizlilik (arka taraf) metaforu dedikodu için iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Backstabbing\" (arkadan bıçaklama) sadece konuşmak değil, aktif bir ihaneti anlatır.",
    "fluency_tip": "\"If you have something to say, say it to my face\" (bir diyeceğin varsa yüzüme söyle) dedikoduya karşı en klasik tepkidir."
  },
  {
    "id": 715,
    "category": "duygular",
    "tr": "İçi içine sığmadı",
    "tags": [
      "içi içine sığmamak",
      "çok heyecanlı",
      "mutlu",
      "sabırsız"
    ],
    "english_primary": "Was bursting with excitement",
    "alternatives": [
      "Can't contain oneself",
      "Full of beans"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İçi içine sığmadı",
        "tr_gloss": "inside doesn't fit inside",
        "en_fragment": "bursting",
        "bridge_type": "transform",
        "explanation": "Türkçe hacimsel sığmama; İngilizce patlama (burst) metaforu"
      }
    ],
    "cultural_insight": "\"Full of beans\" (fasulye dolu) özellikle çocuklar için \"enerji dolu ve neşeli\" anlamında çok tatlı bir deyimdir.",
    "fluency_tip": "\"I'm so excited I can't even sit still!\" (o kadar heyecanlıyım ki yerimde duramıyorum) bu duyguyu anlatmanın doğal yoludur."
  },
  {
    "id": 716,
    "category": "yogunluk",
    "tr": "Başını kaşıyacak vakti yok",
    "tags": [
      "başını kaşıyacak vakit",
      "çok meşgul",
      "yogun",
      "nefes alamıyor"
    ],
    "english_primary": "Was run off their feet",
    "alternatives": [
      "Extremely busy",
      "Doesn't have a spare second"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Başını kaşıyacak",
        "tr_gloss": "to scratch the head",
        "en_fragment": "run off feet",
        "bridge_type": "transform",
        "explanation": "Türkçe küçük bir kişisel eyleme bile vakit yokluğu; İngilizce çok koşuşturmaktan ayakların bitmesi metaforu"
      }
    ],
    "cultural_insight": "\"Run off my feet\" (ayaklarımın feri gitti/koşmaktan bittim) özellikle hizmet sektöründe yoğun günü anlatmak için kullanılır.",
    "fluency_tip": "\"I haven't had a moment to myself all day\" (tüm gün kendime bir an bile ayıramadım) çok yaygın bir serzeniştir."
  },
  {
    "id": 717,
    "category": "sasirma",
    "tr": "Dudak büktü",
    "tags": [
      "dudak bükmek",
      "beğenmedi",
      "küçümsedi",
      "önemsemedi"
    ],
    "english_primary": "Turned up their nose at it",
    "alternatives": [
      "Looked down on",
      "Wasn't impressed"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dudak",
        "tr_gloss": "lip",
        "en_fragment": "nose",
        "bridge_type": "transform",
        "explanation": "Türkçe dudak hareketi; İngilizce burun kıvırma (turn up the nose) hareketi üzerinden beğenmeme metaforu"
      }
    ],
    "cultural_insight": "Her iki dil de beğenmemeyi yüzdeki mimikler üzerinden anlatır ama odak organları farklıdır.",
    "fluency_tip": "\"They weren't exactly thrilled\" (pek de heyecanlanmadılar) birinin bir şeyi beğenmediğini kibarca söyleme yoludur."
  },
  {
    "id": 718,
    "category": "basari",
    "tr": "Emeklemekten yürümeye geçti",
    "tags": [
      "emeklemek",
      "adım adım",
      "başlangıç",
      "gelişim"
    ],
    "english_primary": "Learn to walk before you run",
    "alternatives": [
      "Step by step",
      "Start from scratch"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Emeklemek",
        "tr_gloss": "crawling",
        "en_fragment": "walk",
        "bridge_type": "transform",
        "explanation": "Gelişim evreleri metaforu; İngilizce yürüme ve koşma arasındaki aşamaya odaklanır"
      }
    ],
    "cultural_insight": "\"You have to crawl before you can walk\" (yürümeden önce emeklemelisin) sabırlı gelişim için evrensel bir öğüttür.",
    "fluency_tip": "\"Take it one step at a time\" (adım adım ilerle) en çok duyacağın tavsiye cümlesidir."
  },
  {
    "id": 719,
    "category": "gunluk",
    "tr": "Havalar nasıl olursa olsun",
    "tags": [
      "havalar nasıl",
      "fark etmez",
      "her koşulda",
      "her zaman"
    ],
    "english_primary": "Come rain or shine",
    "alternatives": [
      "Whatever the weather",
      "In any case"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Havalar",
        "tr_gloss": "weathers",
        "en_fragment": "rain or shine",
        "bridge_type": "direct",
        "explanation": "Hava koşulları üzerinden \"her durumda\" anlamı yaratma metaforu ortaktır"
      }
    ],
    "cultural_insight": "\"Come rain or shine\" (yağmur da yağsa güneş de açsa) bir söz verirken sadakati vurgulamak için çok kullanılır.",
    "fluency_tip": "\"I'll be there, come rain or shine\" (ne olursa olsun orada olacağım) güçlü bir sözdür."
  },
  {
    "id": 720,
    "category": "sosyal",
    "tr": "Ağzı kulaklarında",
    "tags": [
      "ağzı kulaklarında",
      "çok mutlu",
      "gülüyor",
      "neşeli"
    ],
    "english_primary": "Grinning like a Cheshire cat",
    "alternatives": [
      "Beaming",
      "Smiling from ear to ear"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzı kulaklarında",
        "tr_gloss": "mouth at the ears",
        "en_fragment": "smiling from ear to ear",
        "bridge_type": "direct",
        "explanation": "Gülümsemenin genişliği metaforu her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "\"Cheshire cat\" Alice Harikalar Diyarında'ki hep gülen kediden gelir. \"Ear to ear\" ise en yaygın kullanılan versiyondur.",
    "fluency_tip": "\"You look like you've just won the lottery!\" (lotoyu kazanmış gibi görünüyorsun!) çok mutlu birine söylenir."
  },
  {
    "id": 721,
    "category": "duygular",
    "tr": "Canı sıkkın",
    "tags": [
      "canı sıkkın",
      "üzgün",
      "keyifsiz",
      "mutsuz"
    ],
    "english_primary": "Down in the dumps",
    "alternatives": [
      "Feeling blue",
      "Out of sorts"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Canı sıkkın",
        "tr_gloss": "soul is squeezed",
        "en_fragment": "down in the dumps",
        "bridge_type": "transform",
        "explanation": "Türkçe içsel baskı; İngilizce çöplükte/aşağıda (down) olma metaforu"
      }
    ],
    "cultural_insight": "\"Feeling blue\" (mavi hissetmek) caz müziğinden gelen bir hüzün metaforudur. \"Down in the dumps\" ise moralin çok bozuk olduğunu anlatır.",
    "fluency_tip": "\"Are you okay? You seem a bit down today\" (İyi misin? Bugün biraz moralsiz görünüyorsun) empati sorusudur."
  },
  {
    "id": 722,
    "category": "yogunluk",
    "tr": "İğne atsan yere düşmez",
    "tags": [
      "iğne atsan yere düşmez",
      "çok kalabalık",
      "tıklım tıklım",
      "insan seli"
    ],
    "english_primary": "Packed like sardines",
    "alternatives": [
      "Wall-to-wall people",
      "Bursting at the seams"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İğne",
        "tr_gloss": "needle",
        "en_fragment": "sardines",
        "bridge_type": "transform",
        "explanation": "Türkçe yer yokluğu (iğne bile düşmez); İngilizce konserve kutusundaki balıklar (sardalyalar) gibi sıkışıklık metaforu"
      }
    ],
    "cultural_insight": "\"Bursting at the seams\" (dikişlerinden patlıyor) bir yerin kapasitesinden çok daha fazla dolu olduğunu anlatır.",
    "fluency_tip": "\"The place was absolutely packed\" (orda iğne atsan yere düşmezdi/tıklım tıklımdı) en sade karşılıktır."
  },
  {
    "id": 723,
    "category": "sasirma",
    "tr": "Gözleri fal taşı gibi açıldı",
    "tags": [
      "gözleri fal taşı",
      "şaşırdı",
      "şok oldu",
      "hayret"
    ],
    "english_primary": "Eyes popped out of their head",
    "alternatives": [
      "Wide-eyed",
      "Starring in amazement"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Fal taşı",
        "tr_gloss": "fortune stone (large)",
        "en_fragment": "popped out",
        "bridge_type": "transform",
        "explanation": "Türkçe gözün boyutu (taş gibi); İngilizce gözün yuvasından fırlaması (pop out) metaforu"
      }
    ],
    "cultural_insight": "Aşırı şaşkınlık anındaki fiziksel göz büyümesini her iki dil de abartılı bir şekilde anlatır.",
    "fluency_tip": "\"You should have seen the look on their face!\" (yüzlerindeki ifadeyi görmeliydin!) şaşırtıcı bir olayı anlatırken kullanılır."
  },
  {
    "id": 724,
    "category": "basari",
    "tr": "Tereyağından kıl çeker gibi",
    "tags": [
      "tereyağından kıl çeker gibi",
      "çok kolay",
      "pürüzsüz",
      "sorunsuz"
    ],
    "english_primary": "Like a knife through butter",
    "alternatives": [
      "A piece of cake",
      "As easy as pie"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Tereyağı",
        "tr_gloss": "butter",
        "en_fragment": "butter",
        "bridge_type": "direct",
        "explanation": "Tereyağı/yağ metaforu pürüzsüzlük ve kolaylık için her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "\"A piece of cake\" (bir dilim kek) ve \"Easy as pie\" (turta kadar kolay) günlük hayatta en çok duyacağın \"kolay\" deyimleridir.",
    "fluency_tip": "\"No problem at all, it was a breeze\" (hiç sorun değil, çok kolaydı/meltem gibiydi) çok doğal bir cevaptır."
  },
  {
    "id": 726,
    "category": "sosyal",
    "tr": "Ağız birliği etti",
    "tags": [
      "ağız birliği",
      "anlaşmak",
      "aynı şeyi söylemek",
      "sözleşmek"
    ],
    "english_primary": "Were on the same page",
    "alternatives": [
      "Sing from the same hymn sheet",
      "In cahoots (negatif)"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ağız birliği",
        "tr_gloss": "unity of mouth",
        "en_fragment": "same page",
        "bridge_type": "transform",
        "explanation": "Türkçe konuşma organının birliği; İngilizce bir kitabın/belgenin aynı sayfasında olma metaforu"
      }
    ],
    "cultural_insight": "\"On the same page\" iş dünyasının en temel \"anlaşma\" deyimidir. \"In cahoots\" ise genellikle gizli ve kötü bir iş için anlaşmayı ima eder.",
    "fluency_tip": "\"Let's make sure we're all on the same page before the meeting\" toplantı öncesi çok kullanılır."
  },
  {
    "id": 727,
    "category": "duygular",
    "tr": "Yüreği ağzına geldi",
    "tags": [
      "yüreği ağzına gelmek",
      "çok korkmak",
      "ani şok",
      "heyecan"
    ],
    "english_primary": "Had their heart in their mouth",
    "alternatives": [
      "Scared out of one's wits",
      "Jumped out of my skin"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Yüreği ağzına",
        "tr_gloss": "heart in the mouth",
        "en_fragment": "heart in one's mouth",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Korkudan kalbin yukarı çıkma hissi iki dilde de aynı metaforla anlatılır"
      }
    ],
    "cultural_insight": "Bu nadir eşleşmelerden biridir. Korku veya aşırı heyecan anındaki fiziksel kalp çarpıntısı hissini anlatır.",
    "fluency_tip": "\"My heart skipped a beat\" (kalbim bir atışı atladı) heyecan veya hafif korku için harikadır."
  },
  {
    "id": 728,
    "category": "yogunluk",
    "tr": "İpin ucunu kaçırdı",
    "tags": [
      "ipin ucunu kaçırmak",
      "kontrolü kaybetmek",
      "aşırıya kaçmak",
      "yönetememek"
    ],
    "english_primary": "Lost track of things",
    "alternatives": [
      "Let things get out of hand",
      "Go overboard"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İpin ucu",
        "tr_gloss": "end of the rope",
        "en_fragment": "lose track / out of hand",
        "bridge_type": "transform",
        "explanation": "Türkçe tutulan bir nesnenin (ip) kaybı; İngilizce elden çıkma veya izi kaybetme metaforu"
      }
    ],
    "cultural_insight": "\"Go overboard\" (gemiden dışarı atlamak) bir şeyi aşırı derecede yapmak, dozu kaçırmak demektir.",
    "fluency_tip": "\"Sorry, I lost track of time\" (üzgünüm, zamanın nasıl geçtiğini anlamadım/ipin ucunu kaçırdım) çok yaygın bir özürdür."
  },
  {
    "id": 729,
    "category": "sasirma",
    "tr": "Ağzı bir karış açık kaldı",
    "tags": [
      "ağzı bir karış açık",
      "şaşırdı",
      "dondu",
      "hayret"
    ],
    "english_primary": "Flabbergasted",
    "alternatives": [
      "Jaw dropped",
      "Stunned"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzı açık",
        "tr_gloss": "mouth open",
        "en_fragment": "jaw dropped",
        "bridge_type": "direct",
        "explanation": "Şaşkınlık anındaki ağız hareketi her iki dilde de benzerdir"
      }
    ],
    "cultural_insight": "Türkçedeki \"bir karış\" ölçüsü abartıyı artırır. İngilizcede \"flabbergasted\" kelimesi şaşkınlığın en üst seviyesini anlatır.",
    "fluency_tip": "\"I was totally speechless\" (tamamen sözsüz kaldım) etkileyici bir olaydan sonra söylenir."
  },
  {
    "id": 730,
    "category": "basari",
    "tr": "Alnının akıyla çıktı",
    "tags": [
      "alnının akıyla",
      "başarıyla bitirmek",
      "onuruyla başarmak",
      "temiz"
    ],
    "english_primary": "Passed with flying colors",
    "alternatives": [
      "Did them proud",
      "Came out on top"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Alın aklığı",
        "tr_gloss": "whiteness of the forehead",
        "en_fragment": "flying colors",
        "bridge_type": "transform",
        "explanation": "Türkçe onur/temizlik (ak alın); İngilizce denizcilikteki zafer bayrakları (flying colors) metaforu"
      }
    ],
    "cultural_insight": "\"With flying colors\" eski gemilerin savaştan zaferle dönerken bayraklarını dalgalandırmasından gelir. Türkçe ise kişinin onuruna (alnına) odaklanır.",
    "fluency_tip": "\"She passed her driving test with flying colors!\" (ehliyet sınavını başarıyla/alnının akıyla geçti!) klasik bir örnek."
  },
  {
    "id": 831,
    "category": "gunluk",
    "tr": "Kabak tadı verdi",
    "tags": [
      "kabak tadı",
      "bıktırdı",
      "uzadı",
      "sıkıcı oldu"
    ],
    "english_primary": "Got tedious",
    "alternatives": [
      "Got old quickly",
      "Overstay its welcome"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kabak",
        "tr_gloss": "zucchini / squash",
        "en_fragment": "tedious / old",
        "bridge_type": "transform",
        "explanation": "Türkçe tatsız bir sebze (kabak) metaforu; İngilizce eskime veya sıkıcılık kavramı"
      }
    ],
    "cultural_insight": "\"Overstay its welcome\" (karşılanma süresini aşmak) bir şeyin artık istenmediği, bıktırdığı noktayı çok güzel anlatır.",
    "fluency_tip": "\"This joke is starting to get old\" (bu şaka artık bayatlamaya/sıkmaya başladı) harika bir karşılıktır."
  },
  {
    "id": 832,
    "category": "sosyal",
    "tr": "Ağız tadıyla",
    "tags": [
      "ağız tadıyla",
      "huzurla",
      "keyifle",
      "sorunsuz"
    ],
    "english_primary": "In peace and quiet",
    "alternatives": [
      "Enjoyed it to the fullest",
      "Enjoyably"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ağız tadı",
        "tr_gloss": "taste of the mouth",
        "en_fragment": "peace and quiet",
        "bridge_type": "transform",
        "explanation": "Türkçe lezzet (tat) metaforu; İngilizce sessizlik ve huzur (peace/quiet) metaforu"
      }
    ],
    "cultural_insight": "Türkçede huzur \"tat\" ile, İngilizcede ise \"sessizlik\" (quiet) ile eşleştirilir. \"Ağız tadıyla bir yemek yiyemedik\" gibi.",
    "fluency_tip": "\"I just want to finish this in peace\" (şunu huzurla/ağız tadıyla bitirmek istiyorum) çok doğal bir istektir."
  },
  {
    "id": 833,
    "category": "duygular",
    "tr": "Burnundan geldi",
    "tags": [
      "burnundan gelmek",
      "pişman olmak",
      "zehir olmak",
      "mutsuz"
    ],
    "english_primary": "Paid dearly for it",
    "alternatives": [
      "Regretted it bitterly",
      "It backfired"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Burnundan",
        "tr_gloss": "from the nose",
        "en_fragment": "pay dearly",
        "bridge_type": "transform",
        "explanation": "Türkçe fiziksel bir \"geri çıkış\" (burun) metaforu; İngilizce bedel ödeme (pay) metaforu"
      }
    ],
    "cultural_insight": "\"Pay dearly\" (ağır bedel ödemek) bir keyfin sonradan çok büyük bir soruna dönüşmesini anlatır.",
    "fluency_tip": "\"They made me regret even going there\" (gittiğime pişman ettiler/burnumdan getirdiler) çok doğal bir serzeniştir."
  },
  {
    "id": 834,
    "category": "yogunluk",
    "tr": "Canını dişine taktı",
    "tags": [
      "canını dişine takmak",
      "çok çabalamak",
      "özveri",
      "gayret"
    ],
    "english_primary": "Worked their fingers to the bone",
    "alternatives": [
      "Gave it everything",
      "Strained every nerve"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Diş",
        "tr_gloss": "tooth",
        "en_fragment": "bone",
        "bridge_type": "transform",
        "explanation": "Türkçe diş (dayanıklılık); İngilizce kemik (aşırı çalışma sonu) metaforu"
      }
    ],
    "cultural_insight": "\"Work fingers to the bone\" (parmakları kemiğine kadar çalıştırmak) aşırı fiziksel ve zihinsel çabayı anlatır.",
    "fluency_tip": "\"I'm working my socks off!\" (çoraplarımı çıkarana kadar — yani çok — çalışıyorum) daha samimi bir versiyondur."
  },
  {
    "id": 835,
    "category": "deyimler",
    "tr": "Ekmeğine yağ sürdü",
    "tags": [
      "ekmeğine yağ sürmek",
      "işine yaramak",
      "fayda sağlamak",
      "istemeden yardım"
    ],
    "english_primary": "Played right into their hands",
    "alternatives": [
      "Gave them an advantage",
      "Worked in their favor"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ekmek/Yağ",
        "tr_gloss": "bread and butter",
        "en_fragment": "hands",
        "bridge_type": "transform",
        "explanation": "Türkçe gıda/lezzet artırma; İngilizce kontrolün/avantajın ellere (hands) geçmesi metaforu"
      }
    ],
    "cultural_insight": "\"Play into someone's hands\" genellikle rakibinin işine yarayacak bir hata yapıldığında kullanılır.",
    "fluency_tip": "\"By getting angry, you're just playing into their hands\" (sinirlenerek onların ekmeğine yağ sürüyorsun) harika bir uyarıdır."
  },
  {
    "id": 836,
    "category": "sosyal",
    "tr": "Ateş püskürüyor",
    "tags": [
      "ateş püskürmek",
      "çok öfkeli",
      "kızgın",
      "gazap"
    ],
    "english_primary": "Breathing fire",
    "alternatives": [
      "Incensed",
      "Livid"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ateş püskürmek",
        "tr_gloss": "spitting fire",
        "en_fragment": "breathing fire",
        "bridge_type": "direct",
        "explanation": "Ejderha/ateş metaforu aşırı öfke için her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir öfke sembolü. \"Livid\" ise öfkeden morarmış/solmuş anlamında çok güçlü bir sıfattır.",
    "fluency_tip": "\"Watch out, the boss is breathing fire today\" iş ortamında bir uyarı olabilir."
  },
  {
    "id": 837,
    "category": "sasirma",
    "tr": "Kanı dondu",
    "tags": [
      "kanı donmak",
      "dehşet",
      "korku",
      "şok"
    ],
    "english_primary": "Their blood ran cold",
    "alternatives": [
      "Was chilled to the bone",
      "Frozen with fear"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kan",
        "tr_gloss": "blood",
        "en_fragment": "blood",
        "bridge_type": "direct",
        "explanation": "Kan ve sıcaklık değişimi metaforu korku için her iki dilde de ortaktır"
      }
    ],
    "cultural_insight": "Korkunun vücut ısısını düşürmesi evrensel bir biyolojik gözlemdir. İngilizcede \"blood ran cold\" (kan soğuk aktı) şeklinde ifade edilir.",
    "fluency_tip": "\"It was a blood-curdling scream\" (kan donduran bir çığlık) korku hikayelerinde çok geçer."
  },
  {
    "id": 838,
    "category": "basari",
    "tr": "Önünü kesti",
    "tags": [
      "önünü kesmek",
      "engel olmak",
      "durdurmak",
      "sabotaj"
    ],
    "english_primary": "Stood in their way",
    "alternatives": [
      "Blocked their path",
      "Thwarted their plans"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Önünü kesti",
        "tr_gloss": "to cut the front",
        "en_fragment": "stand in the way",
        "bridge_type": "direct",
        "explanation": "Yol/mekan engeli metaforu engelleme için iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Thwart\" (boşa çıkarmak) daha resmi bir kelimedir. \"Don't stand in my way\" (yolumda durma/önümü kesme) bir kararlılık ifadesidir.",
    "fluency_tip": "\"Nothing can stop me now\" (beni artık hiçbir şey durduramaz) başarının önündeki engeller kalktığında söylenir."
  },
  {
    "id": 839,
    "category": "gunluk",
    "tr": "Göz ardı etti",
    "tags": [
      "göz ardı",
      "ihmal",
      "görmezden gelmek",
      "unurmamak"
    ],
    "english_primary": "Overlooked it",
    "alternatives": [
      "Turned a blind eye",
      "Ignored it"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Göz ardı",
        "tr_gloss": "behind the eye",
        "en_fragment": "over-look",
        "bridge_type": "transform",
        "explanation": "Türkçe görüşün \"arkasına\" atma; İngilizce görüşün \"üstünden\" bakma (görmeme) metaforu"
      }
    ],
    "cultural_insight": "\"Turn a blind eye\" (kör gözünü dönmek) Amiral Nelson'ın bir savaştaki hikayesinden gelir; bilerek görmezden gelmek demektir.",
    "fluency_tip": "\"We can't afford to overlook this detail\" (bu detayı göz ardı edemeyiz) profesyonel bir uyarıdır."
  },
  {
    "id": 840,
    "category": "sosyal",
    "tr": "İpini kopardı",
    "tags": [
      "ipini koparmış",
      "başıboş",
      "kontrolsüz",
      "özgür ama kötü"
    ],
    "english_primary": "A loose cannon",
    "alternatives": [
      "Off the leash",
      "Uncontrollable"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İp",
        "tr_gloss": "rope",
        "en_fragment": "cannon / leash",
        "bridge_type": "transform",
        "explanation": "Türkçe hayvan bağı (ip); İngilizce denizcilikteki tehlikeli serbest top (loose cannon) veya tasma (leash) metaforu"
      }
    ],
    "cultural_insight": "\"Loose cannon\" (gevşek top) gemide bağı kopan ve sağa sola çarparak zarar veren toplardan gelir. Öngörülemeyen kişiler için kullanılır.",
    "fluency_tip": "\"They're a bit of a loose cannon, so be careful\" (biraz öngörülemez biri, dikkat et) sosyal bir uyarıdır."
  },
  {
    "id": 841,
    "category": "duygular",
    "tr": "İçi cız etti",
    "tags": [
      "içi cız etmek",
      "üzülmek",
      "acıma",
      "şefkat"
    ],
    "english_primary": "Felt a pang of guilt",
    "alternatives": [
      "My heart went out to them",
      "It tugged at my heartstrings"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Cız",
        "tr_gloss": "sizzling sound",
        "en_fragment": "pang",
        "bridge_type": "transform",
        "explanation": "Türkçe yanma sesi; İngilizce ani keskin acı (pang) metaforu"
      }
    ],
    "cultural_insight": "\"My heart goes out to you\" (kalbim sana gidiyor) birine taziye veya derin üzüntü bildirirken kullanılan en sıcak kalıptır.",
    "fluency_tip": "\"I felt so sorry for him, my heart just sank\" (onun için çok üzüldüm, içim cız etti/kalbim düştü) çok doğal."
  },
  {
    "id": 842,
    "category": "yogunluk",
    "tr": "İşi başından aşkın",
    "tags": [
      "işi başından aşkın",
      "çok meşgul",
      "yetişemiyor",
      "boğulmuş"
    ],
    "english_primary": "Was snowed under",
    "alternatives": [
      "Up to one's eyeballs in work",
      "Swamped"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Başından aşkın",
        "tr_gloss": "exceeding the head",
        "en_fragment": "snowed under",
        "bridge_type": "transform",
        "explanation": "Türkçe seviyenin kafayı geçmesi; İngilizce kar altında kalma (snowed under) metaforu"
      }
    ],
    "cultural_insight": "\"Snowed under\" (kar altında kalmış) iş yükünün bir doğal afet gibi birikmesini anlatır. İngilizcede yoğunluk hep \"gömülmek\" ile ilişkilidir.",
    "fluency_tip": "\"I'd love to help, but I'm absolutely snowed under right now\" kibar bir \"hayır\" cevabıdır."
  },
  {
    "id": 844,
    "category": "basari",
    "tr": "Dikiş tutturamadı",
    "tags": [
      "dikiş tutturamamak",
      "başarısızlık",
      "istikrarsız",
      "tutunamadı"
    ],
    "english_primary": "Can't seem to make it stick",
    "alternatives": [
      "Fail to establish oneself",
      "Inconsistent"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Dikiş",
        "tr_gloss": "stitch",
        "en_fragment": "stick",
        "bridge_type": "transform",
        "explanation": "Türkçe terzilik metaforu (dikiş); İngilizce yapışma (stick) metaforu — her ikisi de kalıcılık arayışıdır"
      }
    ],
    "cultural_insight": "\"Make it stick\" (yapışmasını sağlamak) bir başarının veya kuralın kalıcı olması demektir. Türkçe \"dikiş\" metaforu daha zanaatkâr bir kökene sahiptir.",
    "fluency_tip": "\"They've tried many jobs but none of them stuck\" (birçok iş denediler ama hiçbirinde dikiş tutturamadılar) klasik bir kullanım."
  },
  {
    "id": 845,
    "category": "gunluk",
    "tr": "Lafı ağzında geveledi",
    "tags": [
      "lafı gevelemek",
      "doğrudan söylememek",
      "çekinmek",
      "belirsiz"
    ],
    "english_primary": "Mumbled and hemmed and hawed",
    "alternatives": [
      "Didn't give a straight answer",
      "Beat around the bush"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Gevelemek",
        "tr_gloss": "to chew (words)",
        "en_fragment": "hem and haw",
        "bridge_type": "transform",
        "explanation": "Türkçe çiğneme (geveleme) hareketi; İngilizce öksürme/ses çıkarma (hem/haw) sesleri"
      }
    ],
    "cultural_insight": "\"Hem and haw\" kararsızlık anında çıkarılan seslerden türemiştir. Doğrudan cevap vermekten kaçınanlar için kullanılır.",
    "fluency_tip": "\"Stop hemming and hawing and just tell me!\" (lafı ağzında gevelemeyi bırak da söyle!) sabırsız bir tepkidir."
  },
  {
    "id": 846,
    "category": "sosyal",
    "tr": "Arası bozuldu",
    "tags": [
      "arası bozulmak",
      "küsmek",
      "kavga",
      "uzaklaşmak"
    ],
    "english_primary": "Had a falling out",
    "alternatives": [
      "Was on bad terms",
      "Drifted apart"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Arası bozuldu",
        "tr_gloss": "the between got broken",
        "en_fragment": "falling out",
        "bridge_type": "transform",
        "explanation": "Türkçe mekanik bozulma; İngilizce yerçekimi/düşme (falling) metaforu"
      }
    ],
    "cultural_insight": "\"Drift apart\" (ayrı sürüklenmek) kavga olmadan, zamanla uzaklaşan ilişkiler için kullanılır. \"Falling out\" daha çok bir tartışma sonrası olur.",
    "fluency_tip": "\"We had a bit of a falling out over money\" (para yüzünden aramız biraz bozuldu) yaygın bir açıklama."
  },
  {
    "id": 847,
    "category": "duygular",
    "tr": "İçi yandı",
    "tags": [
      "içi yanmak",
      "çok üzülmek",
      "acı çekmek",
      "hasret"
    ],
    "english_primary": "Was grief-stricken",
    "alternatives": [
      "Had a heavy heart",
      "Burning with sorrow"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Yanmak",
        "tr_gloss": "burning",
        "en_fragment": "burning / grief",
        "bridge_type": "direct",
        "explanation": "Acının ısı/ateş (burning) metaforuyla anlatılması iki dilde de ortaktır"
      }
    ],
    "cultural_insight": "Türkçede \"içim yanıyor\" çok derin bir feryattır. İngilizcede \"My heart is heavy\" (kalbim ağır) daha sessiz ve vakur bir üzüntüyü anlatır.",
    "fluency_tip": "\"I'm so sorry for your loss\" (kaybınız için çok üzgünüm) en temel taziye cümlesidir."
  },
  {
    "id": 848,
    "category": "yogunluk",
    "tr": "Eli kolu bağlıydı",
    "tags": [
      "eli kolu bağlı",
      "çaresiz",
      "müdahale edemiyor",
      "engelli"
    ],
    "english_primary": "My hands are tied",
    "alternatives": [
      "Powerless",
      "Helpless"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Eli bağlı",
        "tr_gloss": "hands tied",
        "en_fragment": "hands are tied",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Çaresizlik metaforu fiziksel kısıtlama üzerinden aynıdır"
      }
    ],
    "cultural_insight": "İş hayatında yetkisi olmayan ama yardım etmek isteyenlerin sığındığı evrensel bir deyimdir.",
    "fluency_tip": "\"I wish I could help, but my hands are tied by the regulations\" (yardım etmek isterdim ama kurallar elimi kolumu bağlıyor) profesyonel bir ifade."
  },
  {
    "id": 849,
    "category": "sasirma",
    "tr": "Gözlerine inanamadı",
    "tags": [
      "gözlerine inanamamak",
      "şaşırmak",
      "hayret",
      "mucize"
    ],
    "english_primary": "I couldn't believe my eyes",
    "alternatives": [
      "Is this a dream?",
      "Am I seeing things?"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözlerine inanamadı",
        "tr_gloss": "I couldn't believe my eyes",
        "en_fragment": "couldn't believe my eyes",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Görsel kanıt ve inanç çatışması her iki dilde de aynı anlatılır"
      }
    ],
    "cultural_insight": "\"Am I seeing things?\" (bir şeyler mi görüyorum/hayal mi görüyorum?) gördüğünden şüphe duyduğunda sorulan bir sorudur.",
    "fluency_tip": "\"I had to rub my eyes to make sure I wasn't dreaming\" (rüya görmediğimden emin olmak için gözlerimi ovuşturmam gerekti) abartılı şaşkınlık."
  },
  {
    "id": 850,
    "category": "basari",
    "tr": "Zirveye oynadı",
    "tags": [
      "zirveye oynamak",
      "en iyisi olmak",
      "hedef büyük",
      "başarı odaklı"
    ],
    "english_primary": "Aimed for the top",
    "alternatives": [
      "Reached for the stars",
      "Was at the top of their game"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Zirve",
        "tr_gloss": "peak / summit",
        "en_fragment": "top / stars",
        "bridge_type": "direct",
        "explanation": "Yükseklik metaforu başarı hedefi için her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Reach for the stars\" (yıldızlara uzan) çok yüksek hedefleri olanlar için motivasyonel bir deyimdir.",
    "fluency_tip": "\"You should always aim high\" (daima yükseği hedeflemelisin) güzel bir kariyer tavsiyesidir."
  },
  {
    "id": 851,
    "category": "gunluk",
    "tr": "Ağzı kulaklarına vardı",
    "tags": [
      "ağzı kulaklarına",
      "mutlu",
      "gülümsemek",
      "neşeli"
    ],
    "english_primary": "Grinning from ear to ear",
    "alternatives": [
      "Beaming with joy",
      "Smiling broadly"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzı kulaklarına",
        "tr_gloss": "mouth to the ears",
        "en_fragment": "grinning from ear to ear",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Geniş gülümseme metaforu beden dili üzerinden aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir mutluluk ifadesi. \"Beaming\" (ışık saçmak) ise mutluluğun yüzde parlamasını anlatır.",
    "fluency_tip": "\"What are you so happy about? You're grinning from ear to ear!\" arkadaşına sorabileceğin bir soru."
  },
  {
    "id": 854,
    "category": "yogunluk",
    "tr": "Burnundan soluyordu",
    "tags": [
      "burnundan solumak",
      "çok kızgın",
      "öfkeli",
      "patlamaya hazır"
    ],
    "english_primary": "Was fuming",
    "alternatives": [
      "Saw red",
      "Was livid"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Burun",
        "tr_gloss": "nose",
        "en_fragment": "fume",
        "bridge_type": "transform",
        "explanation": "Türkçe sert nefes; İngilizce duman (fume) metaforu"
      }
    ],
    "cultural_insight": "\"Fuming\" (dumanı tüten) birinin içindeki öfke ateşinin dışa vurmasını anlatır. \"Seeing red\" ise tamamen öfkeyle kör olma hali.",
    "fluency_tip": "\"Stay out of their way, they're fuming\" (yolundan çekil, dumanı tütüyor/çok sinirli) iyi bir uyarıdır."
  },
  {
    "id": 862,
    "category": "basari",
    "tr": "Adım adım",
    "tags": [
      "adım adım",
      "yavaş yavaş",
      "istikrar",
      "gelişim"
    ],
    "english_primary": "Step by step",
    "alternatives": [
      "One step at a time",
      "Gradually"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Adım adım",
        "tr_gloss": "step by step",
        "en_fragment": "step by step",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Süreç ve ilerleme metaforu yürüyüş üzerinden aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir gelişim ilkesidir. \"Rome wasn't built in a day\" (Roma bir günde inşa edilmedi) sabrı vurgulayan harika bir İngiliz atasözüdür.",
    "fluency_tip": "\"Let's just take it one step at a time\" (haydi sadece adım adım ilerleyelim) sakinleştirici bir tavsiyedir."
  },
  {
    "id": 863,
    "category": "gunluk",
    "tr": "Ne olursa olsun",
    "tags": [
      "ne olursa olsun",
      "fark etmez",
      "her koşulda",
      "her zaman"
    ],
    "english_primary": "No matter what",
    "alternatives": [
      "Come rain or shine",
      "At any cost"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ne olursa olsun",
        "tr_gloss": "whatever happens",
        "en_fragment": "no matter what",
        "bridge_type": "direct",
        "explanation": "Kararlılık ifadesi her iki dilde de koşulsuzluk üzerinden benzerdir"
      }
    ],
    "cultural_insight": "\"Come rain or shine\" (yağmur da yağsa güneş de açsa) bir söz verirken sadakati vurgulamak için çok kullanılır.",
    "fluency_tip": "\"I'll be there for you, no matter what\" (ne olursa olsun senin için orada olacağım) en güven verici cümledir."
  },
  {
    "id": 864,
    "category": "sosyal",
    "tr": "Güler yüzlüydü",
    "tags": [
      "güler yüzlü",
      "neşeli",
      "pozitif",
      "canayakın"
    ],
    "english_primary": "Had a sunny disposition",
    "alternatives": [
      "Cheerful",
      "Friendly"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Güler yüz",
        "tr_gloss": "laughing face",
        "en_fragment": "sunny",
        "bridge_type": "transform",
        "explanation": "Türkçe eylem (gülme); İngilizce doğa (güneşli) metaforu"
      }
    ],
    "cultural_insight": "İngilizcede karakter özellikleri sıklıkla hava durumuyla anlatılır. \"Sunny\" (güneşli) pozitif bir karakteri simgeler.",
    "fluency_tip": "\"She always has a smile on her face\" (yüzünde hep bir gülümseme var) bu durumu anlatmanın en sade yoludur."
  },
  {
    "id": 875,
    "category": "gunluk",
    "tr": "Dünya küçük",
    "tags": [
      "dünya küçük",
      "rastlantı",
      "karşılaşma",
      "şaşırtıcı"
    ],
    "english_primary": "It's a small world",
    "alternatives": [
      "What a coincidence!",
      "Small world, isn't it?"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Dünya küçük",
        "tr_gloss": "world is small",
        "en_fragment": "small world",
        "bridge_type": "direct",
        "explanation": "Beklenmedik karşılaşmalar için dünya boyutu metaforu her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir klişe. \"What are the odds?\" (olasılıklar nedir? / ne büyük tesadüf!) de benzer durumlarda çok kullanılır.",
    "fluency_tip": "\"I can't believe I ran into you here! Small world!\" (Sana burada rastladığıma inanamıyorum! Dünya küçük!) en doğal selamlaşmadır."
  },
  {
    "id": 876,
    "category": "sosyal",
    "tr": "Gözden ırak olan gönülden de ırak olur",
    "tags": [
      "gözden ırak",
      "uzaklık",
      "unutmak",
      "ilişki"
    ],
    "english_primary": "Out of sight, out of mind",
    "alternatives": [
      "Absence makes the heart grow fonder (ZIT ANLAM)",
      "Forgotten"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözden ırak",
        "tr_gloss": "far from the eye",
        "en_fragment": "out of sight",
        "bridge_type": "direct",
        "explanation": "Görüş alanı dışı = zihin dışı eşleşmesi her iki dilde de neredeyse aynıdır"
      }
    ],
    "cultural_insight": "\"Absence makes the heart grow fonder\" (Yokluk kalbi daha tutkulu yapar) bu deyimin tam zıttıdır. İki kültür de mesafe hakkında zıt görüşlere sahiptir.",
    "fluency_tip": "\"I haven't thought about them in years. Out of sight, out of mind, I guess.\" (Yıllardır onları düşünmedim. Gözden ırak, gönülden ırak, sanırım.)"
  },
  {
    "id": 878,
    "category": "yogunluk",
    "tr": "Zaman öldürdü",
    "tags": [
      "zaman öldürmek",
      "vakit geçirmek",
      "oyalanmak",
      "boş durmak"
    ],
    "english_primary": "Killed time",
    "alternatives": [
      "Whiled away the time",
      "Hanging around"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Zaman öldürdü",
        "tr_gloss": "to kill time",
        "en_fragment": "kill time",
        "bridge_type": "direct",
        "explanation": "Zamanın \"öldürülmesi\" (tüketilmesi) metaforu her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "Zamanı bir düşman veya kaynak gibi görüp onu \"yok etme\" eylemi modern dünyada evrenselleşmiştir.",
    "fluency_tip": "\"I have an hour to kill before my train\" (Trenimden önce öldürecek bir saatim var) beklemeyi anlatmak için çok yaygındır."
  },
  {
    "id": 879,
    "category": "sasirma",
    "tr": "Gökten düşmüş gibi",
    "tags": [
      "gökten düşmüş",
      "aniden",
      "şaşırtıcı",
      "nereden geldi"
    ],
    "english_primary": "Out of the blue",
    "alternatives": [
      "Out of nowhere",
      "Suddenly"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gökten",
        "tr_gloss": "from the sky",
        "en_fragment": "blue (sky)",
        "bridge_type": "direct",
        "explanation": "Beklenmedik bir şeyin gökyüzünden (mavi) gelmesi metaforu ortaktır"
      }
    ],
    "cultural_insight": "\"Out of the blue\" (mavilikten dışarı) bulutsuz bir havada aniden düşen yıldırım gibi şaşırtıcı olayları anlatır.",
    "fluency_tip": "\"Then, out of the blue, she called me after three years!\" (Sonra, aniden/durup dururken, üç yıl sonra beni aradı!)"
  },
  {
    "id": 880,
    "category": "basari",
    "tr": "İşin ehliydi",
    "tags": [
      "işin ehli",
      "usta",
      "uzman",
      "profesyonel"
    ],
    "english_primary": "A master of one's craft",
    "alternatives": [
      "An old hand",
      "A pro"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İşin ehliydi",
        "tr_gloss": "competent of the work",
        "en_fragment": "master of craft",
        "bridge_type": "direct",
        "explanation": "Ustalık ve uzmanlık kavramı iki dilde de benzer zanaat metaforlarıyla anlatılır"
      }
    ],
    "cultural_insight": "\"An old hand\" (eski bir el) bir işte çok tecrübeli ve deneyimli olan kişiler için kullanılan samimi bir deyimdir.",
    "fluency_tip": "\"If you want it done right, ask him. He's an old hand at this.\" (Eğer doğru yapılmasını istiyorsan ona sor. O bu işin eskisidir/ehlidir.)"
  },
  {
    "id": 900,
    "category": "deyimler",
    "tr": "İnce eleyip sık dokudu",
    "tags": [
      "titiz",
      "detaycı",
      "dikkatli",
      "kılı kırk yarmak"
    ],
    "english_primary": "Go over it with a fine-tooth comb",
    "alternatives": [
      "Was fastidious",
      "Nitpicked"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İnce eleyip",
        "tr_gloss": "sifting finely",
        "en_fragment": "fine-tooth comb",
        "bridge_type": "transform",
        "explanation": "Türkçe un/eleme; İngilizce ince dişli tarak (temizlik) metaforu"
      }
    ],
    "cultural_insight": "Her iki dil de aşırı titizliği küçük parçaları/ayrıntıları ayıran bir alet (elek/tarak) üzerinden anlatır.",
    "fluency_tip": "\"We need to go over the contract with a fine-tooth comb before signing it.\" (Sözleşmeyi imzalamadan önce çok titiz/ince eleyip sık dokuyarak incelemeliyiz.)"
  },
  {
    "id": 901,
    "category": "gunluk",
    "tr": "Sözümü geri alıyorum",
    "tags": [
      "sözümü geri aldım",
      "yanlış anlama",
      "özür",
      "iptal"
    ],
    "english_primary": "I take it back",
    "alternatives": [
      "I stand corrected",
      "Forget what I said"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Geri alıyorum",
        "tr_gloss": "I am taking back",
        "en_fragment": "take it back",
        "bridge_type": "direct",
        "explanation": "Sözün fiziksel bir nesne gibi \"geri alınması\" metaforu her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "\"I stand corrected\" (düzeltilmiş olarak duruyorum) bir hatayı kabul etmenin daha resmi ve nazik bir yoludur.",
    "fluency_tip": "\"Wait, I take that back. I just realized I was wrong.\" (Bekle, sözümü geri alıyorum. Az önce yanıldığımı fark ettim.)"
  },
  {
    "id": 902,
    "category": "sosyal",
    "tr": "Aramıza soğukluk girdi",
    "tags": [
      "soğukluk",
      "mesafe",
      "küslük",
      "eskisi gibi değil"
    ],
    "english_primary": "Was on thin ice",
    "alternatives": [
      "Had a chilly relationship",
      "Drifted apart"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Soğukluk",
        "tr_gloss": "coldness",
        "en_fragment": "chilly / ice",
        "bridge_type": "direct",
        "explanation": "Soğukluk/buz metaforu bozulan ilişkiler için evrensel bir ısı düşüşü sembolüdür"
      }
    ],
    "cultural_insight": "\"On thin ice\" (ince buz üzerinde) birinin sabrını taşırmak üzere olduğunu ve tehlikede olduğunu anlatır.",
    "fluency_tip": "\"There's been some tension between us lately.\" (Son zamanlarda aramızda biraz gerginlik/soğukluk var.)"
  },
  {
    "id": 903,
    "category": "duygular",
    "tr": "İçim karardı",
    "tags": [
      "içim karardı",
      "hüzün",
      "karamsarlık",
      "mutsuzluk"
    ],
    "english_primary": "I feel gloomy",
    "alternatives": [
      "I'm in a dark mood",
      "It's weighing on me"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçim karardı",
        "tr_gloss": "my inside got dark",
        "en_fragment": "gloomy / dark mood",
        "bridge_type": "direct",
        "explanation": "Karanlık/ışık yokluğu metaforu üzüntü için her iki dilde de ortaktır"
      }
    ],
    "cultural_insight": "\"Gloomy\" (kasvetli) hem hava durumu hem de ruh hali için kullanılır. Türkçe \"kararmak\" ise daha içsel ve anlık bir çöküşü anlatır.",
    "fluency_tip": "\"This movie is so depressing, it's making me feel gloomy.\" (Bu film çok bunaltıcı, içimi karartıyor.)"
  },
  {
    "id": 904,
    "category": "yogunluk",
    "tr": "İşleri yoluna koydu",
    "tags": [
      "yoluna koymak",
      "düzeltmek",
      "halletmek",
      "organize etmek"
    ],
    "english_primary": "Got things sorted",
    "alternatives": [
      "Got back on track",
      "Straightened things out"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Yoluna koymak",
        "tr_gloss": "to put on the road/track",
        "en_fragment": "back on track",
        "bridge_type": "direct",
        "explanation": "Yol/iz (track) metaforu işlerin düzene girmesi için her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Straighten out\" (düzeltmek) karmaşık bir durumu bir ipi düzeltir gibi halletmeyi anlatır.",
    "fluency_tip": "\"It took a while, but we finally got everything sorted out.\" (Biraz sürdü ama sonunda her şeyi yoluna koyduk/hallettik.)"
  },
  {
    "id": 905,
    "category": "deyimler",
    "tr": "Ateşle oynadı",
    "tags": [
      "ateşle oynamak",
      "tehlike",
      "risk",
      "uyarı"
    ],
    "english_primary": "Played with fire",
    "alternatives": [
      "Walked on thin ice",
      "Courted disaster"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ateşle oynadı",
        "tr_gloss": "playing with fire",
        "en_fragment": "playing with fire",
        "bridge_type": "direct",
        "explanation": "Tehlikeli bir eylem için ateş metaforu her iki dilde de birebir aynıdır"
      }
    ],
    "cultural_insight": "Evrensel bir metafor. \"Court disaster\" (felaketle flört etmek) daha edebi bir risk uyarısıdır.",
    "fluency_tip": "\"Don't mess with him, you're playing with fire.\" (Onunla uğraşma, ateşle oynuyorsun.)"
  },
  {
    "id": 906,
    "category": "gunluk",
    "tr": "Başüstüne",
    "tags": [
      "başüstüne",
      "tamam",
      "emredersiniz",
      "kabul"
    ],
    "english_primary": "Consider it done",
    "alternatives": [
      "Will do",
      "At your service"
    ],
    "register": "formal",
    "bridges": [
      {
        "tr_fragment": "Başüstüne",
        "tr_gloss": "on my head",
        "en_fragment": "consider it done",
        "bridge_type": "transform",
        "explanation": "Türkçe başın üzerinde taşıma (saygı); İngilizce eylemin bitmiş kabul edilmesi (verimlilik) metaforu"
      }
    ],
    "cultural_insight": "\"Will do\" (yapacağım/yaparım) günlük hayatta en sık duyacağın \"başüstüne/tamam\" cevabıdır.",
    "fluency_tip": "\"Can you send that email?\" - \"Consider it done!\" (O e-postayı atar mısın? - Başüstüne/Atılmış bil!)"
  },
  {
    "id": 907,
    "category": "sosyal",
    "tr": "İstifini bozmadı",
    "tags": [
      "istifini bozmamak",
      "sakin",
      "soğukkanlı",
      "etkilenmemek"
    ],
    "english_primary": "Kept their cool",
    "alternatives": [
      "Didn't bat an eyelid",
      "Remained unruffled"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İstifini bozmadı",
        "tr_gloss": "not to break one's arrangement",
        "en_fragment": "keep one's cool / not bat an eyelid",
        "bridge_type": "transform",
        "explanation": "Türkçe düzenin/duruşun bozulmaması; İngilizce ısının korunması (cool) veya göz kırpmama metaforu"
      }
    ],
    "cultural_insight": "\"Not bat an eyelid\" (göz kapağını bile oynatmamak) en sarsıcı olaylar karşısında bile tepki vermeyenler için kullanılır.",
    "fluency_tip": "\"Even when the alarm went off, he didn't bat an eyelid.\" (Alarm çaldığında bile istifini bozmadı/gözünü bile kırpmadı.)"
  },
  {
    "id": 908,
    "category": "duygular",
    "tr": "Ağzının payını verdi",
    "tags": [
      "ağzının payını vermek",
      "susturmak",
      "had bildirmek",
      "cevap vermek"
    ],
    "english_primary": "Put them in their place",
    "alternatives": [
      "Gave them a piece of their mind",
      "Shut them down"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzının payı",
        "tr_gloss": "share of the mouth",
        "en_fragment": "put in their place",
        "bridge_type": "transform",
        "explanation": "Türkçe ağza odaklı bir ders/pay verme; İngilizce kişinin sosyal yerini (limitini) hatırlatma metaforu"
      }
    ],
    "cultural_insight": "\"Give someone a piece of my mind\" (aklımdan bir parça vermek) birine çok sinirlenip ona haddini bildirmek demektir.",
    "fluency_tip": "\"He was so rude that I finally had to put him in his place.\" (O kadar kaba davranıyordu ki sonunda ağzının payını vermem gerekti.)"
  },
  {
    "id": 909,
    "category": "basari",
    "tr": "Emeği geçti",
    "tags": [
      "emeği geçmek",
      "katkı sağlamak",
      "yardım etmek",
      "payı olmak"
    ],
    "english_primary": "Had a hand in it",
    "alternatives": [
      "Contributed to it",
      "Played a part"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Emek",
        "tr_gloss": "effort",
        "en_fragment": "hand",
        "bridge_type": "transform",
        "explanation": "Türkçe doğrudan eylem (emek); İngilizce vücut organı (el/hand) metaforu üzerinden katkı anlatılır"
      }
    ],
    "cultural_insight": "\"To have a hand in it\" (işte eli olmak) bir başarının veya olayın gerçekleşmesinde payı olmak demektir.",
    "fluency_tip": "\"Many people had a hand in the success of this project.\" (Bu projenin başarısında birçok kişinin emeği geçti.)"
  },
  {
    "id": 917,
    "category": "deyimler",
    "tr": "Ağzı laf yapmıyor",
    "tags": [
      "ağzı laf yapmak",
      "konuşkan",
      "ikna edici",
      "hitabeti güçlü"
    ],
    "english_primary": "Gift of the gab",
    "alternatives": [
      "Silver-tongued",
      "Articulate"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Laf yapmak",
        "tr_gloss": "to make words",
        "en_fragment": "gift of the gab",
        "bridge_type": "transform",
        "explanation": "Türkçe konuşma üretimi; İngilizce konuşma yeteneği (gab) hediyesi metaforu"
      }
    ],
    "cultural_insight": "\"Gift of the gab\" etkileyici konuşma yeteneğini anlatır. \"Silver-tongued\" (gümüş dilli) ise ikna edici ve zarif konuşanlar içindir.",
    "fluency_tip": "\"To be a successful salesperson, you need the gift of the gab.\" (Başarılı bir satışçı olmak için ağzının laf yapması/konuşma yeteneğinin olması gerekir.)"
  },
  {
    "id": 919,
    "category": "duygular",
    "tr": "Ağzından çıkanı kulağı duymadı",
    "tags": [
      "ne dediğini bilmemek",
      "öfkeli",
      "düşüncesizce konuşmak",
      "kontrolsüz"
    ],
    "english_primary": "Didn't know what they were saying",
    "alternatives": [
      "Talked nonsense",
      "Lost control of their tongue"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzından çıkan",
        "tr_gloss": "what comes out of mouth",
        "en_fragment": "what one is saying",
        "bridge_type": "direct",
        "explanation": "Konuşma eylemi iki dilde de benzer; Türkçe kulak/kontrol eksikliğini vurgular"
      }
    ],
    "cultural_insight": "Türkçede öfke anında ağız ile kulak arasındaki mantık bağının koptuğu harika bir fiziksel döngüyle anlatılır.",
    "fluency_tip": "\"He was so angry that he didn't know what he was saying.\" (O kadar kızgındı ki ağzından çıkanı kulağı duymuyordu/ne dediğini bilmiyordu.)"
  },
  {
    "id": 920,
    "category": "yogunluk",
    "tr": "Ağzından girip burnundan çıktı",
    "tags": [
      "ikna etmek",
      "kandırmak",
      "etkilemek",
      "ısrar etmek"
    ],
    "english_primary": "Talked them into it",
    "alternatives": [
      "Twisted their arm",
      "Swayed them"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Ağzından/Burnundan",
        "tr_gloss": "from mouth/to nose",
        "en_fragment": "talk someone into",
        "bridge_type": "transform",
        "explanation": "Türkçe tüm kanallardan müdahale metaforu; İngilizce birinin \"kolunu bükme\" (zorlama/ikna) metaforu"
      }
    ],
    "cultural_insight": "\"Twist someone's arm\" (birinin kolunu bükmek) birini bir şeyi yapması için ikna etmek veya zorlamak demektir.",
    "fluency_tip": "\"I didn't want to go, but they talked me into it.\" (Gitmek istemiyordum ama ağzımdan girip burnumdan çıktılar/beni ikna ettiler.)"
  },
  {
    "id": 921,
    "category": "sasirma",
    "tr": "Ağzını bıçak açmadı",
    "tags": [
      "ağzını bıçak açmamak",
      "hiç konuşmamak",
      "üzgün",
      "sessiz"
    ],
    "english_primary": "Tight-lipped",
    "alternatives": [
      "Didn't say a word",
      "Was silent as a grave"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Bıçak açmamak",
        "tr_gloss": "not even a knife opens (mouth)",
        "en_fragment": "tight-lipped",
        "bridge_type": "transform",
        "explanation": "Türkçe ağzın kilitlenmişliği; İngilizce dudakların sıkılığı metaforu"
      }
    ],
    "cultural_insight": "\"Silent as a grave\" (mezar gibi sessiz) tamamen sessiz kalma halini çok güçlü ve dramatik bir şekilde anlatır.",
    "fluency_tip": "\"She has been tight-lipped about the secret ever since.\" (O zamandan beri sır hakkında ağzını bıçak açmıyor/tek kelime etmiyor.)"
  },
  {
    "id": 922,
    "category": "basari",
    "tr": "Ağzıyla kuş tutsa yaranamaz",
    "tags": [
      "ağzıyla kuş tutsa",
      "ne yapsa boş",
      "yetersiz",
      "takdir edilmeyen"
    ],
    "english_primary": "Moved heaven and earth to no avail",
    "alternatives": [
      "No matter what they do",
      "It won't be enough"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kuş tutmak",
        "tr_gloss": "to catch a bird with mouth",
        "en_fragment": "move heaven and earth",
        "bridge_type": "transform",
        "explanation": "Türkçe imkansız/garip bir eylem; İngilizce göğü ve yeri oynatma (devasa çaba) metaforu"
      }
    ],
    "cultural_insight": "Türkçe deyim, ne kadar \"üstün\" veya \"sıra dışı\" bir çaba gösterilirse gösterilsin takdir edilmeyeceğini anlatır.",
    "fluency_tip": "\"I feel like I could move heaven and earth and still not satisfy my boss.\" (Gökleri ve yeri oynatsam bile — yani ne yapsam da — patronumu tatmin edemeyecekmişim gibi hissediyorum.)"
  },
  {
    "id": 923,
    "category": "gunluk",
    "tr": "Başı sıkıştı",
    "tags": [
      "başı sıkışmak",
      "zor durumda kalmak",
      "yardıma ihtiyacı olmak",
      "sıkıntı"
    ],
    "english_primary": "Was in a tight spot",
    "alternatives": [
      "Was in a fix",
      "Was hard-pressed"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başın sıkışması",
        "tr_gloss": "head getting squeezed",
        "en_fragment": "tight spot",
        "bridge_type": "direct",
        "explanation": "Her iki dilde de zor durumlar \"sıkışıklık/dar alan\" metaforuyla anlatılır"
      }
    ],
    "cultural_insight": "\"In a fix\" (zor durumda) genellikle çözülmesi gereken karmaşık bir sorun için kullanılır.",
    "fluency_tip": "\"If you ever find yourself in a tight spot, don't hesitate to call me.\" (Eğer başın sıkışırsa/zor durumda kalırsan beni aramaktan çekinme.)"
  },
  {
    "id": 924,
    "category": "sosyal",
    "tr": "Başına gelen pişmiş tavuğun başına gelmedi",
    "tags": [
      "pişmiş tavuk",
      "çok talihsizlik",
      "üst üste gelen sorunlar",
      "felaket"
    ],
    "english_primary": "Had a string of bad luck",
    "alternatives": [
      "Went through the wringer",
      "Everything went wrong"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Pişmiş tavuk",
        "tr_gloss": "cooked chicken",
        "en_fragment": "wringer / bad luck",
        "bridge_type": "transform",
        "explanation": "Türkçe absürt bir talihsizlik metaforu; İngilizce çamaşır merdanesinden (zorluk) geçme metaforu"
      }
    ],
    "cultural_insight": "Türkçe deyim, talihsizliklerin ne kadar \"imkansız\" ve \"üst üste\" olduğunu esprili ve acı bir dille anlatır.",
    "fluency_tip": "\"Lately, I've really been through the wringer.\" (Son zamanlarda gerçekten çok zor şeylerden geçtim/başıma gelenler pişmiş tavuğun başına gelmedi.)"
  },
  {
    "id": 925,
    "category": "duygular",
    "tr": "Başına talih kuşu kondu",
    "tags": [
      "talih kuşu",
      "büyük şans",
      "beklenmedik kazanç",
      "piyango"
    ],
    "english_primary": "A stroke of luck",
    "alternatives": [
      "A windfall",
      "Hit the jackpot"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Talih kuşu",
        "tr_gloss": "bird of fortune",
        "en_fragment": "stroke of luck / windfall",
        "bridge_type": "transform",
        "explanation": "Türkçe kuş (kader) metaforu; İngilizce ani darbe (stroke) veya rüzgarla düşen meyve (windfall) metaforu"
      }
    ],
    "cultural_insight": "\"Windfall\" (rüzgar düşürmesi) rüzgarın ağaçtan düşürdüğü meyveler gibi, zahmetsizce kazanılan parayı/şansı anlatır.",
    "fluency_tip": "\"Winning the lottery was a real windfall for the family.\" (Piyangoyu kazanmak aile için gerçek bir talih kuşu/beklenmedik kazanç oldu.)"
  },
  {
    "id": 926,
    "category": "yogunluk",
    "tr": "Başını kaldırmadı",
    "tags": [
      "başını kaldırmamak",
      "çok çalışmak",
      "odaklanmak",
      "aralıksız"
    ],
    "english_primary": "Had their head down",
    "alternatives": [
      "Was buried in work",
      "Worked non-stop"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başını kaldırmadı",
        "tr_gloss": "not lifting the head",
        "en_fragment": "head down / buried",
        "bridge_type": "direct",
        "explanation": "Çalışma anındaki fiziksel duruş (başın eğik olması) her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Buried in work\" (işe gömülmüş) yoğunluğun kişinin tüm görüş alanını kapattığını anlatır.",
    "fluency_tip": "\"They've had their heads down all week trying to finish the report.\" (Raporu bitirmek için tüm hafta başlarını kaldırmadan/odaklanarak çalıştılar.)"
  },
  {
    "id": 927,
    "category": "sasirma",
    "tr": "Başını sardı",
    "tags": [
      "başına iş açmak",
      "sorun yaratmak",
      "uğraşmak",
      "dert"
    ],
    "english_primary": "Landed in trouble",
    "alternatives": [
      "Got into a mess",
      "Opened a can of worms"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Başını sardı",
        "tr_gloss": "to wrap around the head",
        "en_fragment": "land in trouble",
        "bridge_type": "transform",
        "explanation": "Türkçe sorunun başa \"dolandığı\" (sarmak) metaforu; İngilizce bir yere \"inmek/konmak\" (land) metaforu"
      }
    ],
    "cultural_insight": "\"Open a can of worms\" (solucan kutusu açmak) bir kez başladığında durdurulması zor olan karmaşık bir dert açmak demektir.",
    "fluency_tip": "\"I think we just opened a can of worms with this decision.\" (Bence bu kararla başımıza büyük bir dert açtık/iş sardık.)"
  },
  {
    "id": 928,
    "category": "basari",
    "tr": "Başının tacı yaptı",
    "tags": [
      "başının tacı",
      "çok değer vermek",
      "baş üstünde tutmak",
      "saygı"
    ],
    "english_primary": "Put them on a pedestal",
    "alternatives": [
      "Treated with utmost respect",
      "Treasured them"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başının tacı",
        "tr_gloss": "crown of the head",
        "en_fragment": "pedestal",
        "bridge_type": "transform",
        "explanation": "Türkçe taç (hükümdarlık/değer); İngilizce kaide/heykel (yükseklik/kutsallık) metaforu"
      }
    ],
    "cultural_insight": "Her iki dil de değerli görülen kişiyi fiziksel olarak \"yukarıda\" bir yere (taç/kaide) yerleştirir.",
    "fluency_tip": "\"They really put their grandmother on a pedestal.\" (Büyükannelerini gerçekten başlarının tacı yapıyorlar/ona çok değer veriyorlar.)"
  },
  {
    "id": 929,
    "category": "gunluk",
    "tr": "Baştan aşağı",
    "tags": [
      "baştan aşağı",
      "tamamen",
      "komple",
      "her yeriyle"
    ],
    "english_primary": "From top to bottom",
    "alternatives": [
      "From head to toe",
      "Through and through"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Baştan aşağı",
        "tr_gloss": "from head to bottom",
        "en_fragment": "top to bottom / head to toe",
        "bridge_type": "direct",
        "explanation": "Bütünlük ifadesi vücut veya yükseklik üzerinden her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"From head to toe\" (baştan ayağa) genellikle giyim veya fiziksel durumlar için kullanılır. \"Through and through\" ise karakter özellikleri için (tamamen) kullanılır.",
    "fluency_tip": "\"They cleaned the house from top to bottom.\" (Evi baştan aşağı/dip bucak temizlediler.)"
  },
  {
    "id": 930,
    "category": "sosyal",
    "tr": "Baştan savma",
    "tags": [
      "baştan savma",
      "özensiz",
      "üstünkörü",
      "dikkat etmeden"
    ],
    "english_primary": "Half-baked",
    "alternatives": [
      "Slipshod",
      "Careless"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Baştan savma",
        "tr_gloss": "fending off from head",
        "en_fragment": "half-baked",
        "bridge_type": "transform",
        "explanation": "Türkçe hızla uzaklaştırma; İngilizce gıda (yarı pişmiş) metaforu üzerinden özensizlik"
      }
    ],
    "cultural_insight": "\"Half-baked\" (yarı pişmiş) tam olgunlaşmamış, yeterince düşünülmemiş fikirler veya özensiz işler için kullanılır.",
    "fluency_tip": "\"That was a half-baked plan and it was doomed to fail.\" (O baştan savma/yeterince düşünülmemiş bir plandı ve başarısız olmaya mahkumdu.)"
  },
  {
    "id": 951,
    "category": "deyimler",
    "tr": "İki ayağını bir pabuca soktu",
    "tags": [
      "sıkıştırmak",
      "telaşlandırmak",
      "zorlamak",
      "acele ettirmek"
    ],
    "english_primary": "Rushed them",
    "alternatives": [
      "Put pressure on them",
      "Hassled them"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "İki ayak bir pabuç",
        "tr_gloss": "two feet in one shoe",
        "en_fragment": "rush / pressure",
        "bridge_type": "transform",
        "explanation": "Türkçe dar alan/sıkışma; İngilizce doğrudan hız/baskı metaforu"
      }
    ],
    "cultural_insight": "Türkçe deyim dar ayakkabı (fiziksel sıkışıklık) üzerinden telaşı ve baskıyı çok görsel anlatır.",
    "fluency_tip": "\"Don't rush me, I can't think clearly!\" (beni acele ettirme/iki ayağımı bir pabuca sokma, net düşünemiyorum!)"
  },
  {
    "id": 952,
    "category": "gunluk",
    "tr": "Sağır sultan bile duydu",
    "tags": [
      "herkes duydu",
      "gizli kalmadı",
      "aşikar",
      "biliniyor"
    ],
    "english_primary": "Common knowledge",
    "alternatives": [
      "It's public knowledge",
      "Everyone and their brother knows"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Sağır sultan",
        "tr_gloss": "deaf sultan",
        "en_fragment": "everyone knows",
        "bridge_type": "transform",
        "explanation": "Türkçe en duymayacak kişinin (sağır sultan) bile duyması; İngilizce \"herkes ve kardeşi\" (geniş kitle) metaforu"
      }
    ],
    "cultural_insight": "\"Everyone and their brother\" (herkes ve kardeşi) bir haberin ne kadar yayıldığını ve artık kimse için sürpriz olmadığını anlatır.",
    "fluency_tip": "\"You're just finding out? Everyone and their brother already knows about the secret!\""
  },
  {
    "id": 953,
    "category": "sosyal",
    "tr": "Yüzüne gözüne bulaştırdı",
    "tags": [
      "başaramamak",
      "rezil olmak",
      "hata yapmak",
      "beceremedi"
    ],
    "english_primary": "Made a mess of it",
    "alternatives": [
      "Messed it up",
      "Botched it"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Yüzüne gözüne",
        "tr_gloss": "face and eye",
        "en_fragment": "make a mess",
        "bridge_type": "transform",
        "explanation": "Türkçe kirlenmenin (bulaşma) yüze/göze sıçraması; İngilizce karmaşa (mess) veya özensiz iş (botch) metaforu"
      }
    ],
    "cultural_insight": "\"Botch\" (berbat etmek) genellikle teknik bir işi yanlış yapmak için kullanılır. \"Mess up\" ise daha genel bir hata/başarısızlık ifadesidir.",
    "fluency_tip": "\"I tried to fix the car myself but I really made a mess of it.\" (Arabayı kendim tamir etmeye çalıştım ama yüzüme gözüme bulaştırdım.)"
  },
  {
    "id": 955,
    "category": "yogunluk",
    "tr": "Eli boş döndü",
    "tags": [
      "eli boş dönmek",
      "başarısız olmak",
      "kazançsız",
      "yetersiz"
    ],
    "english_primary": "Came away empty-handed",
    "alternatives": [
      "Returned with nothing",
      "Failed their mission"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Eli boş",
        "tr_gloss": "empty hand",
        "en_fragment": "empty-handed",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Başarısızlığı boş eller üzerinden anlatmak her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Empty-handed\" (eli boş) sadece somut bir şey için değil, bir anlaşma veya mülakat sonucu için de kullanılır.",
    "fluency_tip": "\"I went to the store for bread but they were all out, so I came away empty-handed.\" (Ekmek için dükkana gittim ama bitmişti, eli boş döndüm.)"
  },
  {
    "id": 956,
    "category": "sasirma",
    "tr": "Gözden kaçırdı",
    "tags": [
      "gözden kaçırmak",
      "fark etmemek",
      "hata",
      "ihmal"
    ],
    "english_primary": "Missed it / Overlooked it",
    "alternatives": [
      "Let it slip",
      "Failed to notice"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Gözden kaçırdı",
        "tr_gloss": "missing from the eye",
        "en_fragment": "overlook / miss",
        "bridge_type": "direct",
        "explanation": "Görüş alanının \"kaçırılması\" metaforu hata/ihmal için iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Let something slip\" (bir şeyin kayıp gitmesine izin vermek) daha çok bir sırrı ağızdan kaçırmak veya bir fırsatı yitirmek için kullanılır.",
    "fluency_tip": "\"I'm sorry, I must have overlooked that email.\" (Üzgünüm, o e-postayı gözden kaçırmış olmalıyım.)"
  },
  {
    "id": 957,
    "category": "basari",
    "tr": "Alın teri döktü",
    "tags": [
      "alın teri",
      "çok çalışmak",
      "çaba",
      "emek"
    ],
    "english_primary": "Sweat of one's brow",
    "alternatives": [
      "Worked hard",
      "Put in the effort"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Alın teri",
        "tr_gloss": "sweat of the forehead",
        "en_fragment": "sweat of one's brow",
        "bridge_type": "direct",
        "explanation": "Tam birebir eşleşme! Çok çalışmanın fiziksel sonucu (alın teri/brow sweat) her iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "Emeğin ve dürüst kazancın en temel evrensel sembolüdür.",
    "fluency_tip": "\"Everything I have was earned by the sweat of my brow.\" (Sahip olduğum her şeyi alnımın teriyle kazandım.)"
  },
  {
    "id": 958,
    "category": "gunluk",
    "tr": "Boş ver",
    "tags": [
      "boş ver",
      "önemseme",
      "unut gitsin",
      "aldırma"
    ],
    "english_primary": "Never mind",
    "alternatives": [
      "Forget about it",
      "Let it go"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Boş ver",
        "tr_gloss": "give empty",
        "en_fragment": "never mind",
        "bridge_type": "transform",
        "explanation": "Türkçe nesneyi/durumu boşluğa bırakma; İngilizce zihnin (mind) asla (never) takılmaması metaforu"
      }
    ],
    "cultural_insight": "\"Never mind\" (önemi yok/zihnini yorma) konuyu kapatmak için en sık kullanılan İngilizce kalıptır.",
    "fluency_tip": "\"Oh, I forgot what I was going to say... never mind!\""
  },
  {
    "id": 959,
    "category": "sosyal",
    "tr": "Ağız tadı",
    "tags": [
      "ağız tadı",
      "huzur",
      "keyif",
      "mutluluk"
    ],
    "english_primary": "Peace and quiet",
    "alternatives": [
      "Harmony",
      "Happiness"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Ağız tadı",
        "tr_gloss": "taste of the mouth",
        "en_fragment": "peace / harmony",
        "bridge_type": "transform",
        "explanation": "Türkçe lezzet (tat); İngilizce huzur/uyum (peace/harmony) metaforu"
      }
    ],
    "cultural_insight": "Türkçede aile içi huzur \"ağız tadı\" (yemek lezzeti) ile anlatılırken, İngilizcede \"harmony\" (uyum) veya \"peace\" (huzur) tercih edilir.",
    "fluency_tip": "\"We just want some peace and quiet in this house!\" (Bu evde biraz ağız tadı/huzur istiyoruz!)"
  },
  {
    "id": 960,
    "category": "duygular",
    "tr": "İçi parçalandı",
    "tags": [
      "içi parçalanmak",
      "çok üzülmek",
      "merhamet",
      "acı"
    ],
    "english_primary": "Heart is breaking",
    "alternatives": [
      "Was heartbroken",
      "Felt devastated"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "İçi parçalandı",
        "tr_gloss": "inside being torn apart",
        "en_fragment": "heart is breaking",
        "bridge_type": "direct",
        "explanation": "Duygusal yıkımın fiziksel parçalanma metaforuyla anlatılması iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Devastated\" (harap olmuş) en ağır hüzün ve yıkım anları için kullanılan en güçlü sıfattır.",
    "fluency_tip": "\"It broke my heart to see them so sad.\" (Onları o kadar üzgün görmek içimi parçaladı/kalbimi kırdı.)"
  },
  {
    "id": 961,
    "category": "yogunluk",
    "tr": "Başını sokacak bir yer",
    "tags": [
      "başını sokacak yer",
      "ev",
      "barınak",
      "küçük bir yuva"
    ],
    "english_primary": "A roof over one's head",
    "alternatives": [
      "Somewhere to stay",
      "A place to call home"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Başını sokacak",
        "tr_gloss": "place to put the head",
        "en_fragment": "roof over head",
        "bridge_type": "direct",
        "explanation": "Barınma ihtiyacının baş/çatı üzerinden anlatılması iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"A roof over my head\" (başımın üstünde bir çatı) en temel barınma şükranını veya ihtiyacını anlatır.",
    "fluency_tip": "\"As long as I have a roof over my head, I'm happy.\" (Başımı sokacak bir yerim/çatım olduğu sürece mutluyum.)"
  },
  {
    "id": 962,
    "category": "sasirma",
    "tr": "Jeton düştü",
    "tags": [
      "jeton düştü",
      "nihayet anladı",
      "farkına vardı",
      "çözdü"
    ],
    "english_primary": "The penny dropped",
    "alternatives": [
      "Finally clicked",
      "It dawned on me"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Jeton düştü",
        "tr_gloss": "token dropped",
        "en_fragment": "penny dropped",
        "bridge_type": "direct",
        "explanation": "Otomat/para (penny/jeton) düşme metaforu anlayışın gelmesi için iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "Her iki dilde de bir şeyin anlaşıldığı o \"aydınlanma\" anını para düşme sesiyle anlatır.",
    "fluency_tip": "\"It took a while, but finally the penny dropped!\" (Biraz sürdü ama sonunda jeton düştü!)"
  },
  {
    "id": 964,
    "category": "gunluk",
    "tr": "Üstüne bir bardak soğuk su iç",
    "tags": [
      "soğuk su iç",
      "vazgeç",
      "kaybettin",
      "umudu kes"
    ],
    "english_primary": "Kiss it goodbye",
    "alternatives": [
      "Wave goodbye to it",
      "Forget about ever getting it back"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Soğuk su",
        "tr_gloss": "cold water",
        "en_fragment": "kiss it goodbye",
        "bridge_type": "transform",
        "explanation": "Türkçe sindirme/soğutma (su); İngilizce vedalaşma (öpmek) metaforu"
      }
    ],
    "cultural_insight": "\"Kiss it goodbye\" (onunla öpüşerek vedalaş) bir şeyi bir daha asla göremeyeceğin/alamayacağın anlamına gelir.",
    "fluency_tip": "\"If you lend him money, you can just kiss it goodbye!\" (Ona borç verirsen üstüne bir bardak soğuk su iç!)"
  },
  {
    "id": 965,
    "category": "sosyal",
    "tr": "Dost kara günde belli olur",
    "tags": [
      "dost",
      "kara gün",
      "sadakat",
      "yardım"
    ],
    "english_primary": "A friend in need is a friend indeed",
    "alternatives": [
      "Friends are for the bad times",
      "True friends stand by you"
    ],
    "register": "neutral",
    "bridges": [
      {
        "tr_fragment": "Kara gün",
        "tr_gloss": "black day",
        "en_fragment": "friend in need",
        "bridge_type": "transform",
        "explanation": "Türkçe kötü zamanın rengi (kara); İngilizce \"ihtiyaç duyulan an\" (need) metaforu"
      }
    ],
    "cultural_insight": "Sadakat her iki dilde de zor zamanlar üzerinden test edilir.",
    "fluency_tip": "\"You really helped me out when I was struggling. A friend in need is a friend indeed.\""
  },
  {
    "id": 966,
    "category": "duygular",
    "tr": "Kanı kaynadı",
    "tags": [
      "kanı kaynamak",
      "sevmek",
      "sıcaklık",
      "anında enerji"
    ],
    "english_primary": "Warmed to them",
    "alternatives": [
      "Took an instant liking",
      "Hit it off"
    ],
    "register": "informal",
    "bridges": [
      {
        "tr_fragment": "Kanı kaynadı",
        "tr_gloss": "blood boiling (with liking)",
        "en_fragment": "warm to someone",
        "bridge_type": "direct",
        "explanation": "Isı/sıcaklık metaforu anında sevgi/sempati için iki dilde de aynıdır"
      }
    ],
    "cultural_insight": "\"Hit it off\" (anında kaynaşmak) iki kişinin ilk tanışmada çok iyi anlaşması demektir. Türkçe \"kan kaynaması\" daha biyolojik bir sıcaklıktır.",
    "fluency_tip": "\"I really warmed to him the moment we met.\" (Tanıştığımız an ona kanım kaynadı/ısındı.)"
  }
,
/* ─── DUYGULAR (967-1036) ─── */
{id:967,category:'duygular',tr:'Kalbi hop etti',tags:['kalp','hop et','ürper','irkil','şaşır'],english_primary:"Their heart skipped a beat",alternatives:["Got a sudden fright","Had a jolt"],register:'informal',bridges:[{tr_fragment:'Kalbi',tr_gloss:'their heart',en_fragment:'heart',bridge_type:'direct',explanation:'Kalp doğrudan eşleşiyor'},{tr_fragment:'hop etti',tr_gloss:'jumped/hopped',en_fragment:'skipped a beat',bridge_type:'transform',explanation:'"Hop etmek" ani fiziksel sıçrama; İngilizce ritim metaforu'}],cultural_insight:'Türkçede kalp fiziksel sıçrama yapar; İngilizcede ritim atlar. İkisi de ani şoku anlatır.',fluency_tip:'"My heart skipped a beat when I saw him" çok doğal.'},
{id:968,category:'duygular',tr:'Gözleri doldu',tags:['göz','dol','ağla','duygulan','gözyaşı'],english_primary:"Their eyes welled up",alternatives:["Teared up","Got misty-eyed"],register:'neutral',bridges:[{tr_fragment:'Gözleri',tr_gloss:'their eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz doğrudan eşleşiyor'},{tr_fragment:'doldu',tr_gloss:'filled up',en_fragment:'welled up',bridge_type:'direct',explanation:'Dolmak = well up; ikisi de gözyaşı birikmesini anlatır'}],cultural_insight:'Her iki dil de gözün doluşunu su metaforuyla anlatır.',fluency_tip:'"Her eyes welled up at the news" veya "He teared up during the speech."'},
{id:969,category:'duygular',tr:'İçi burkuldu',tags:['iç','burkul','üzül','sıkıl','hüzün'],english_primary:"Their heart sank",alternatives:["Felt a pang of sorrow","Their stomach dropped"],register:'neutral',bridges:[{tr_fragment:'İçi',tr_gloss:'inner self/gut',en_fragment:'heart',bridge_type:'transform',explanation:'"İç" karın/göğüs bölgesi; İngilizce kalbi kullanır'},{tr_fragment:'burkuldu',tr_gloss:'twisted/wrenched',en_fragment:'sank',bridge_type:'transform',explanation:'Burkulmak = bükülmek; İngilizce batma metaforu'}],cultural_insight:'Türkçede duygu fiziksel bükülme; İngilizcede batma. İkisi de hüznü somutlaştırır.',fluency_tip:'"My heart sank when I heard the news" çok yaygın.'},
{id:970,category:'duygular',tr:'Ruhu daraldı',tags:['ruh','daral','sıkıl','boğul','baskı'],english_primary:"Felt suffocated",alternatives:["Felt hemmed in","Felt trapped"],register:'neutral',bridges:[{tr_fragment:'Ruhu',tr_gloss:'their soul/spirit',en_fragment:'they',bridge_type:'drop',explanation:'Türkçe ruhu özne; İngilizce kişiyi özne yapar'},{tr_fragment:'daraldı',tr_gloss:'narrowed/constricted',en_fragment:'suffocated',bridge_type:'transform',explanation:'Daralma → boğulma; baskı hissi farklı metaforla'}],cultural_insight:'"Ruh" Türkçede hem ruh hem psikolojik hal için kullanılır.',fluency_tip:'"I feel suffocated in this job" veya "I feel trapped" diyebilirsin.'},
{id:971,category:'duygular',tr:'Keyfi kaçtı',tags:['keyif','kaç','bozul','moral','mood'],english_primary:"Their mood took a nosedive",alternatives:["Lost their enthusiasm","Their vibe shifted"],register:'informal',bridges:[{tr_fragment:'Keyfi',tr_gloss:'their mood/pleasure',en_fragment:'mood',bridge_type:'direct',explanation:'Keyif → mood benzer anlam'},{tr_fragment:'kaçtı',tr_gloss:'fled/escaped',en_fragment:'took a nosedive',bridge_type:'transform',explanation:'Kaçmak (escape) → sert düşüş (nosedive); her ikisi de ani bozulmayı anlatır'}],cultural_insight:'"Keyif" hem fiziksel zevk hem psikolojik hal anlamına gelir.',fluency_tip:'"My mood took a nosedive after that meeting" çok doğal.'},
{id:972,category:'duygular',tr:'Canından bezdirdi',tags:['can','bez','bık','nefret','usandır'],english_primary:"Drove them absolutely crazy",alternatives:["Made their life miserable","Wore them down completely"],register:'informal',bridges:[{tr_fragment:'Canından',tr_gloss:'of their soul/life',en_fragment:'absolutely',bridge_type:'transform',explanation:'"Canından bezdirmek" hayatı kabusa çevirme; İngilizce "crazy" yoğunluğu başka yoldan verir'},{tr_fragment:'bezdirdi',tr_gloss:'made sick of',en_fragment:'drove...crazy',bridge_type:'transform',explanation:'Bezdirmek = tiksinmek; crazy metaforu delilik üzerinden'}],cultural_insight:'"Canından bezdirmek" Türkçede çok ağır bir şikâyet ifadesidir.',fluency_tip:'"This commute is driving me absolutely crazy" çok yaygın.'},
{id:973,category:'duygular',tr:'Yüreği sıkıştı',tags:['yürek','sıkış','kaygı','panik','bunalt'],english_primary:"Their chest tightened with anxiety",alternatives:["Their heart clenched","Felt a knot in their chest"],register:'neutral',bridges:[{tr_fragment:'Yüreği',tr_gloss:'their heart/core',en_fragment:'chest',bridge_type:'direct',explanation:'Yürek = kalp/göğüs bölgesi'},{tr_fragment:'sıkıştı',tr_gloss:'squeezed/constricted',en_fragment:'tightened',bridge_type:'direct',explanation:'İkisi de fiziksel baskı metaforu'}],cultural_insight:'"Yürek" Türkçede hem cesaret hem duygu merkezi anlamında.',fluency_tip:'"My chest tightened when they called my name."'},
{id:974,category:'duygular',tr:'Aklı takıldı',tags:['akıl','takıl','takıntı','obsesyon','düşün'],english_primary:"Got stuck on it",alternatives:["Couldn't get it out of their head","Became fixated"],register:'informal',bridges:[{tr_fragment:'Aklı',tr_gloss:'their mind',en_fragment:'they',bridge_type:'drop',explanation:'Türkçe aklı özne; İngilizce kişi özne'},{tr_fragment:'takıldı',tr_gloss:'got caught/stuck',en_fragment:'stuck on it',bridge_type:'direct',explanation:'Takılmak = stuck; ikisi de zihinsel takılıp kalmayı anlatır'}],cultural_insight:'Türkçe "akıl" Arapça kökenli; hem mantık hem zihin demek.',fluency_tip:'"I can\'t stop thinking about it" veya "I\'m fixated on this idea."'},
{id:975,category:'duygular',tr:'Sinirleri gerildi',tags:['sinir','geril','stres','gergin','tansiyon'],english_primary:"Their nerves were on edge",alternatives:["Was wound tight","Felt strung out"],register:'neutral',bridges:[{tr_fragment:'Sinirleri',tr_gloss:'their nerves',en_fragment:'nerves',bridge_type:'direct',explanation:'Sinir = nerve; doğrudan eşleşme'},{tr_fragment:'gerildi',tr_gloss:'tensed/stretched',en_fragment:'on edge',bridge_type:'transform',explanation:'Gerilmek (stretch) → on edge (kıyıda olmak); ikisi de gerginliği anlatır'}],cultural_insight:'"Sinir" hem anatomi hem duygu için kullanılır.',fluency_tip:'"My nerves were completely on edge before the exam."'},
{id:976,category:'duygular',tr:'Kahroldu',tags:['kahrolan','yıkıl','ezil','büyük üzüntü','derin acı'],english_primary:"Was devastated",alternatives:["Was crushed","Was heartbroken"],register:'neutral',bridges:[{tr_fragment:'Kahroldu',tr_gloss:'was tormented/crushed',en_fragment:'devastated',bridge_type:'transform',explanation:'"Kahrolan" Arapça kökenli; yıkılma hissi; İngilizce "devastate" = harap etmek'}],cultural_insight:'"Kahrolmak" Türkçede çok ağır bir yıkım ifadesidir, sıradan üzüntüden fazlasıdır.',fluency_tip:'"She was absolutely devastated when she heard the news."'},
{id:977,category:'duygular',tr:'Içi ezildi',tags:['iç','ezil','acı','üzüntü','derin hüzün'],english_primary:"Their heart was crushed",alternatives:["Felt utterly broken","Was deeply wounded"],register:'neutral',bridges:[{tr_fragment:'İçi',tr_gloss:'their inner self',en_fragment:'heart',bridge_type:'transform',explanation:'"İç" iç dünya; İngilizce kalbi kullanır'},{tr_fragment:'ezildi',tr_gloss:'was crushed/ground down',en_fragment:'crushed',bridge_type:'direct',explanation:'Ezilmek ve crushed ikisi de fiziksel baskı metaforu'}],cultural_insight:'Türkçede "iç" duygusal merkez olarak kalbin yerini tutar.',fluency_tip:'"I felt utterly crushed after what he said."'},
{id:978,category:'duygular',tr:'Çok mutluydu',tags:['mutlu','sevinç','neşe','mutluluk','keyif'],english_primary:"Was on cloud nine",alternatives:["Was over the moon","Was absolutely thrilled"],register:'informal',bridges:[{tr_fragment:'Çok',tr_gloss:'very/so much',en_fragment:'cloud nine / over the moon',bridge_type:'transform',explanation:'Türkçe düz yoğunlaştırıcı; İngilizce mekânsal metaforlar (bulut/ay) kullanır'}],cultural_insight:'İngilizce çok mutluluğu gökyüzü metaforuyla anlatır: bulut 9, ay üzeri.',fluency_tip:'"She was on cloud nine after the promotion."'},
{id:979,category:'duygular',tr:'Özlem çekti',tags:['özlem','özle','hasret','çek','arzu'],english_primary:"Was overcome with longing",alternatives:["Missed them terribly","Yearned for home"],register:'neutral',bridges:[{tr_fragment:'Özlem',tr_gloss:'longing/yearning',en_fragment:'longing',bridge_type:'direct',explanation:'"Özlem" ve "longing" çok yakın anlam'},{tr_fragment:'çekti',tr_gloss:'pulled/drew',en_fragment:'overcome with',bridge_type:'transform',explanation:'"Çekmek" fiziksel çekim; İngilizce "overcome" üstesinden gelinememe'}],cultural_insight:'"Özlem" Türk kültüründe çok derin anlam taşır; "hüzün" ile yakın.',fluency_tip:'"I yearn for the old days" veya "I\'ve been missing you terribly."'},
{id:980,category:'duygular',tr:'Gururu kırıldı',tags:['gurur','kırıl','onur','incin','rencide'],english_primary:"Their pride was wounded",alternatives:["Had their ego bruised","Felt humiliated"],register:'neutral',bridges:[{tr_fragment:'Gururu',tr_gloss:'their pride',en_fragment:'pride',bridge_type:'direct',explanation:'Gurur = pride; doğrudan'},{tr_fragment:'kırıldı',tr_gloss:'was broken',en_fragment:'wounded',bridge_type:'transform',explanation:'"Kırılmak" kırılma; İngilizce "wound" yaralama; ikisi de zarar metaforu'}],cultural_insight:'"Gurur" Türkçede hem pozitif (onur) hem negatif (kibir) anlam taşıyabilir.',fluency_tip:'"His pride was wounded when they chose someone else."'},
{id:981,category:'duygular',tr:'Huzur buldu',tags:['huzur','bul','rahatla','dingin','sükunet'],english_primary:"Found peace of mind",alternatives:["Felt at ease","Found their calm"],register:'neutral',bridges:[{tr_fragment:'Huzur',tr_gloss:'peace/tranquility',en_fragment:'peace of mind',bridge_type:'direct',explanation:'Huzur = peace; yakın eşleşme'},{tr_fragment:'buldu',tr_gloss:'found',en_fragment:'found',bridge_type:'direct',explanation:'Bulmak = find; doğrudan'}],cultural_insight:'"Huzur" Arapça kökenli; dinî ve günlük bağlamda çok kullanılır.',fluency_tip:'"I finally found peace of mind after leaving that job."'},
{id:982,category:'duygular',tr:'Pişman oldu',tags:['pişman','pişmanlık','nedamet','üzül','üzgün'],english_primary:"Was filled with regret",alternatives:["Deeply regretted it","Wished they could take it back"],register:'neutral',bridges:[{tr_fragment:'Pişman',tr_gloss:'regretful/remorseful',en_fragment:'regret',bridge_type:'direct',explanation:'Pişman = regretful; doğrudan'},{tr_fragment:'oldu',tr_gloss:'became',en_fragment:'was filled with',bridge_type:'transform',explanation:'"Olmak" (become) → "filled with" (dolmak); İngilizce duygunun içi doldurduğunu anlatır'}],cultural_insight:'"Pişmanlık" hem günlük pişmanlık hem dinî tövbe anlamı taşır.',fluency_tip:'"I deeply regret what I said to her."'},
{id:983,category:'duygular',tr:'Cesareti kırıldı',tags:['cesaret','kırıl','yıldır','moral boz','vazgeç'],english_primary:"Lost their nerve",alternatives:["Got discouraged","Had their confidence shaken"],register:'neutral',bridges:[{tr_fragment:'Cesareti',tr_gloss:'their courage',en_fragment:'nerve',bridge_type:'transform',explanation:'"Cesaret" soyut cesaret; "nerve" hem sinir hem cesaret'},{tr_fragment:'kırıldı',tr_gloss:'was broken',en_fragment:'lost',bridge_type:'transform',explanation:'"Kırılmak" → "lost"; biri kırılma biri yitirme metaforu'}],cultural_insight:'"Cesaret" Arapça kökenli; hem fiziksel cesaret hem yüreklilik.',fluency_tip:'"Don\'t lose your nerve at the last moment."'},
{id:984,category:'duygular',tr:'Kıskanç oldu',tags:['kıskan','haset','çekemez','rekabet','çek'],english_primary:"Turned green with envy",alternatives:["Was eaten up with jealousy","Couldn't stand their success"],register:'informal',bridges:[{tr_fragment:'Kıskanç',tr_gloss:'jealous/envious',en_fragment:'green with envy',bridge_type:'transform',explanation:'Türkçe doğrudan; İngilizce renk metaforu (yeşil = kıskançlık)'},{tr_fragment:'oldu',tr_gloss:'became',en_fragment:'turned',bridge_type:'direct',explanation:'Olmak → turned; dönüşüm fiili'}],cultural_insight:'İngilizcede kıskançlık rengi yeşildir; "green-eyed monster" Shakespeare\'den gelir.',fluency_tip:'"She turned green with envy when she heard about the promotion."'},
{id:985,category:'duygular',tr:'Utancından yere girecek oldu',tags:['utanç','mahcup','utandı','rezil','yüzü kızardı'],english_primary:"Wanted to sink through the floor",alternatives:["Was mortified","Died of embarrassment"],register:'informal',bridges:[{tr_fragment:'Utancından',tr_gloss:'from shame',en_fragment:'embarrassment',bridge_type:'direct',explanation:'Utanç = embarrassment; doğrudan'},{tr_fragment:'yere girecek oldu',tr_gloss:'was about to go into the ground',en_fragment:'sink through the floor',bridge_type:'transform',explanation:'Her iki dil de yere batmayı kullanıyor; Türkçe yere girmek, İngilizce floor\'a batmak'}],cultural_insight:'Utanç → yere batma metaforu iki dilde de var; evrensel beden tepkisi.',fluency_tip:'"I wanted to sink through the floor when I tripped on stage."'},
{id:986,category:'duygular',tr:'Şüpheye düştü',tags:['şüphe','düş','güven','sor','şüphelen'],english_primary:"Had doubts creep in",alternatives:["Started second-guessing","Got suspicious"],register:'neutral',bridges:[{tr_fragment:'Şüpheye',tr_gloss:'into doubt',en_fragment:'doubts',bridge_type:'direct',explanation:'Şüphe = doubt; doğrudan'},{tr_fragment:'düştü',tr_gloss:'fell into',en_fragment:'creep in',bridge_type:'transform',explanation:'"Düşmek" (fall) → "creep in" (sızma); farklı hareket metaforları'}],cultural_insight:'"Şüphe Arapça kökenli; gündelik konuşmada çok yaygın.',fluency_tip:'"Doubts started creeping in about the whole plan."'},
{id:987,category:'duygular',tr:'Ağlamaklı oldu',tags:['ağla','duygulan','gözyaşı','hüzün','melankolik'],english_primary:"Was on the verge of tears",alternatives:["Was about to break down","Felt a lump in their throat"],register:'neutral',bridges:[{tr_fragment:'Ağlamaklı',tr_gloss:'tearful/about to cry',en_fragment:'verge of tears',bridge_type:'direct',explanation:'İkisi de ağlama eşiğini anlatır'},{tr_fragment:'oldu',tr_gloss:'became',en_fragment:'was on the',bridge_type:'direct',explanation:'Dönüşüm ifadesi'}],cultural_insight:'Boğazda yumru hissi iki kültürde de ortak: "boğazı düğümlendi".',fluency_tip:'"She was on the verge of tears during the whole speech."'},
{id:988,category:'duygular',tr:'Kendinden geçti',tags:['kendinden geç','coşku','neşe','taşkın','çılgın mutlu'],english_primary:"Was beside themselves with joy",alternatives:["Was ecstatic","Was out of their mind with happiness"],register:'informal',bridges:[{tr_fragment:'Kendinden',tr_gloss:'from oneself',en_fragment:'beside themselves',bridge_type:'transform',explanation:'Türkçe "kendinden geçmek" benlikten çıkma; İngilizce "beside oneself" de aynı metafor'},{tr_fragment:'geçti',tr_gloss:'passed beyond',en_fragment:'with joy',bridge_type:'add',explanation:'İngilizce duygunun adını ekliyor'}],cultural_insight:'İki dil de aşırı duygu için "kendinin dışına çıkma" metaforu kullanır.',fluency_tip:'"She was beside herself with joy when she got the news."'},
{id:989,category:'duygular',tr:'Neşesi yerine geldi',tags:['neşe','yerine gel','iyileş','moral bul','düzel'],english_primary:"Got their spirits back up",alternatives:["Perked right up","Bounced back to their old self"],register:'informal',bridges:[{tr_fragment:'Neşesi',tr_gloss:'their joy/spirits',en_fragment:'spirits',bridge_type:'direct',explanation:'Neşe ≈ spirits; duygu hali'},{tr_fragment:'yerine geldi',tr_gloss:'came back to its place',en_fragment:'back up',bridge_type:'transform',explanation:'"Yerine gelmek" (return to place) → "back up" (yukarı geri dön)'}],cultural_insight:'"Yerine gelmek" Türkçede hem fiziksel iyileşme hem ruhsal toparlanma.',fluency_tip:'"He perked right up after a good meal."'},
{id:990,category:'duygular',tr:'Kalbine dokundu',tags:['kalp','dokun','duygulan','etkilendi','içine işledi'],english_primary:"Touched their heart",alternatives:["Moved them deeply","Hit them right in the feels"],register:'neutral',bridges:[{tr_fragment:'Kalbine',tr_gloss:'to their heart',en_fragment:'heart',bridge_type:'direct',explanation:'Kalp = heart; doğrudan'},{tr_fragment:'dokundu',tr_gloss:'touched',en_fragment:'touched',bridge_type:'direct',explanation:'Dokunmak = touch; doğrudan eşleşme'}],cultural_insight:'Duyguyu kalbe dokunma olarak anlatma iki kültürde ortaktır.',fluency_tip:'"That story really touched my heart" veya "It hit me right in the feels."'},
{id:991,category:'duygular',tr:'Öfkesini yuttu',tags:['öfke','yut','sabret','kontrol et','bastır'],english_primary:"Swallowed their anger",alternatives:["Held their tongue","Bit their lip"],register:'neutral',bridges:[{tr_fragment:'Öfkesini',tr_gloss:'their anger',en_fragment:'anger',bridge_type:'direct',explanation:'Öfke = anger; doğrudan'},{tr_fragment:'yuttu',tr_gloss:'swallowed',en_fragment:'swallowed',bridge_type:'direct',explanation:'İkisi de duyguyu yutma metaforu kullanır'}],cultural_insight:'Öfkeyi yutma metaforu iki dilde de var; duyguyu içinde tutmak.',fluency_tip:'"She swallowed her anger and smiled politely."'},
{id:992,category:'duygular',tr:'Büyük hayal kırıklığı yaşadı',tags:['hayal kırıklığı','yaşa','hayal kır','beklenti','umut'],english_primary:"Was sorely disappointed",alternatives:["Had their hopes dashed","Was let down badly"],register:'neutral',bridges:[{tr_fragment:'Büyük',tr_gloss:'great/big',en_fragment:'sorely',bridge_type:'transform',explanation:'"Büyük" (büyük) → "sorely" (acı verici şekilde); iki farklı yoğunlaştırıcı'},{tr_fragment:'hayal kırıklığı yaşadı',tr_gloss:'experienced disappointment',en_fragment:'disappointed',bridge_type:'direct',explanation:'Hayal kırıklığı = disappointment'}],cultural_insight:'"Hayal kırıklığı" harfiyen "hayal kırılması"dır; hayalin/rüyanın kırılması.',fluency_tip:'"He was sorely disappointed by the outcome."'},
{id:993,category:'duygular',tr:'Panikle doldu',tags:['panik','dol','kork','dehşet','telaş'],english_primary:"Was gripped by panic",alternatives:["Panicked completely","Was seized with dread"],register:'neutral',bridges:[{tr_fragment:'Panikle',tr_gloss:'with panic',en_fragment:'panic',bridge_type:'direct',explanation:'Panik = panic; alıntı kelime'},{tr_fragment:'doldu',tr_gloss:'filled with',en_fragment:'gripped by',bridge_type:'transform',explanation:'"Dolmak" (fill) → "gripped by" (kavranmak); farklı fiziksel metafor'}],cultural_insight:'"Panik" Türkçeye İtalyancadan geçmiş; evrensel kelime.',fluency_tip:'"She was gripped by panic when she realized her purse was gone."'},
{id:994,category:'duygular',tr:'Rahatladı nefes aldı',tags:['rahatla','nefes al','ferahlama','gerilim git','oh dedi'],english_primary:"Breathed a sigh of relief",alternatives:["Finally exhaled","Felt the tension melt away"],register:'neutral',bridges:[{tr_fragment:'Rahatladı',tr_gloss:'relaxed/was relieved',en_fragment:'relief',bridge_type:'direct',explanation:'Rahatlamak ≈ relief; anlam yakın'},{tr_fragment:'nefes aldı',tr_gloss:'took a breath',en_fragment:'sigh',bridge_type:'direct',explanation:'Nefes = breath/sigh; nefes alma rahatlama ifadesi'}],cultural_insight:'Nefes alma rahatlama metaforu evrensel; stresten kurtulunca derin nefes.',fluency_tip:'"We all breathed a sigh of relief when it was over."'},
{id:995,category:'duygular',tr:'Tepesi attı',tags:['tepesi at','çıldır','öfke','kızdı','fıkırdadı'],english_primary:"Blew their top",alternatives:["Lost it completely","Hit the roof"],register:'informal',bridges:[{tr_fragment:'Tepesi',tr_gloss:'their top/peak',en_fragment:'top',bridge_type:'direct',explanation:'"Tepe" = top; ikisi de başın üstünü kullanır'},{tr_fragment:'attı',tr_gloss:'flew off',en_fragment:'blew',bridge_type:'transform',explanation:'Atmak = throw/fling; İngilizce üflemek metaforu'}],cultural_insight:'Öfkenin başın üstünden fışkırması metaforu iki dilde de var.',fluency_tip:'"He blew his top when he saw the bill."'},
{id:996,category:'duygular',tr:'Kafası karıştı',tags:['kafa','karış','anlamadı','şaşır','bocaladı'],english_primary:"Was all mixed up",alternatives:["Was totally confused","Lost the thread"],register:'informal',bridges:[{tr_fragment:'Kafası',tr_gloss:'their head',en_fragment:'they',bridge_type:'transform',explanation:'"Kafa" baş/zihin; İngilizce kişiyi özne yapar'},{tr_fragment:'karıştı',tr_gloss:'got mixed up',en_fragment:'mixed up',bridge_type:'direct',explanation:'Karışmak = mix up; doğrudan'}],cultural_insight:'"Kafa" Türkçede hem baş hem zihin anlamında kullanılır.',fluency_tip:'"I\'m all mixed up — can you explain it again?"'},
{id:997,category:'duygular',tr:'Buruk kaldı',tags:['buruk','kal','acı tatlı','hüzünlü sevinç','tuhaf his'],english_primary:"Was left with a bittersweet feeling",alternatives:["Had mixed emotions","Felt conflicted"],register:'neutral',bridges:[{tr_fragment:'Buruk',tr_gloss:'bittersweet/slightly sour',en_fragment:'bittersweet',bridge_type:'direct',explanation:'"Buruk" tat olarak hafif acı; İngilizce "bittersweet" acı+tatlı'},{tr_fragment:'kaldı',tr_gloss:'was left/remained',en_fragment:'was left with',bridge_type:'direct',explanation:'Kalmak = remain/be left'}],cultural_insight:'"Buruk" Türkçeye özgü; tatlı acının eşiğindeki his için kullanılır.',fluency_tip:'"It was a bittersweet moment — happy but sad at the same time."'},
{id:998,category:'duygular',tr:'Tatminsizlik duydu',tags:['tatminsiz','yetmez','eksik','doyumlanmadı','boşluk'],english_primary:"Was left feeling unfulfilled",alternatives:["Felt a sense of emptiness","Couldn't feel satisfied"],register:'neutral',bridges:[{tr_fragment:'Tatminsizlik',tr_gloss:'dissatisfaction',en_fragment:'unfulfilled',bridge_type:'direct',explanation:'Tatminsizlik ≈ unfulfilled; tat almamak'},{tr_fragment:'duydu',tr_gloss:'felt/sensed',en_fragment:'was left feeling',bridge_type:'direct',explanation:'Duymak = feel; duygu yaşamak'}],cultural_insight:'"Tatminsizlik" harfiyen "tat almamak"tır; zevk/doyum eksikliği.',fluency_tip:'"I was left feeling unfulfilled despite the success."'},
{id:999,category:'duygular',tr:'Nefret dolu bakışlar attı',tags:['nefret','bakış','öfke','gözlerle konuş','hiddet'],english_primary:"Shot them a look that could kill",alternatives:["Gave them a withering stare","Glared daggers at them"],register:'informal',bridges:[{tr_fragment:'Nefret dolu',tr_gloss:'hatred-filled',en_fragment:'could kill',bridge_type:'transform',explanation:'Nefret dolu bakış → öldürebilecek bakış; yoğunluk farklı metaforla'},{tr_fragment:'bakışlar attı',tr_gloss:'threw glances',en_fragment:'shot them a look',bridge_type:'direct',explanation:'İkisi de bakışı fırlatma metaforu kullanır'}],cultural_insight:'Bakışı silah gibi kullanma metaforu iki dilde de var.',fluency_tip:'"She shot him a look that could kill when he interrupted her."'},
{id:1000,category:'duygular',tr:'Gözleri parladı',tags:['göz','parla','heyecan','sevinç','merak'],english_primary:"Their eyes lit up",alternatives:["Their face lit up","Eyes sparkled with excitement"],register:'neutral',bridges:[{tr_fragment:'Gözleri',tr_gloss:'their eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz = eye; doğrudan'},{tr_fragment:'parladı',tr_gloss:'shone/sparkled',en_fragment:'lit up',bridge_type:'transform',explanation:'"Parlamak" (shine/sparkle) → "lit up" (aydınlandı); ışık metaforu her ikisinde de var'}],cultural_insight:'Mutluluğu gözlerin parlaması ile anlatmak evrensel bir metafordur.',fluency_tip:'"Her eyes lit up when she saw the cake."'},
{id:1001,category:'duygular',tr:'Kaygıyla uyandı',tags:['kaygı','uyan','sabah','endişe','korku'],english_primary:"Woke up with a knot in their stomach",alternatives:["Woke up anxious","Started the day with dread"],register:'neutral',bridges:[{tr_fragment:'Kaygıyla',tr_gloss:'with anxiety',en_fragment:'knot in their stomach',bridge_type:'transform',explanation:'Kaygı soyut; İngilizce midedeki yumru ile somutlaştırır'},{tr_fragment:'uyandı',tr_gloss:'woke up',en_fragment:'woke up',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'Kaygıyı midede hissetme metaforu evrensel; Türkçe de "midem bulandı" der.',fluency_tip:'"I woke up with a knot in my stomach before the interview."'},
{id:1002,category:'duygular',tr:'Beklenmedik bir coşkuya kapıldı',tags:['coşku','kapıl','ani','heyecan','dalgalandı'],english_primary:"Was swept up in the moment",alternatives:["Got caught up in the excitement","Was carried away"],register:'informal',bridges:[{tr_fragment:'coşkuya',tr_gloss:'by excitement/enthusiasm',en_fragment:'moment',bridge_type:'transform',explanation:'Coşku duygusu → an; genel durum ifadesine dönüşüm'},{tr_fragment:'kapıldı',tr_gloss:'was seized by',en_fragment:'swept up',bridge_type:'direct',explanation:'Kapılmak = seized; swept = süpürülmek; ikisi de pasif alınıp götürme'}],cultural_insight:'"Coşku" Türkçede hem sevinç hem taşkınlık.',fluency_tip:'"Don\'t get carried away — stay focused."'},
{id:1003,category:'duygular',tr:'Kendine güveni yerine geldi',tags:['güven','yerine gel','özgüven','toparlan','moral'],english_primary:"Got their confidence back",alternatives:["Regained their self-esteem","Found their footing again"],register:'neutral',bridges:[{tr_fragment:'Kendine güveni',tr_gloss:'self-confidence',en_fragment:'confidence',bridge_type:'direct',explanation:'Doğrudan eşleşme'},{tr_fragment:'yerine geldi',tr_gloss:'came back to place',en_fragment:'got...back',bridge_type:'direct',explanation:'Yerine gelmek = get back; kazanım metaforu'}],cultural_insight:'"Kendine güven" bileşik yapı; Batı dillerinde "self-confidence" ile aynı fikir.',fluency_tip:'"She got her confidence back after the coaching sessions."'},
{id:1004,category:'duygular',tr:'Bunaltıya girdi',tags:['bunalt','gir','boğul','baskı','overwhelm'],english_primary:"Was completely overwhelmed",alternatives:["Was at their breaking point","Felt buried under it all"],register:'neutral',bridges:[{tr_fragment:'Bunaltıya',tr_gloss:'into oppression/suffocation',en_fragment:'overwhelmed',bridge_type:'transform',explanation:'"Bunaltı" boğucu his; "overwhelmed" dalgaların üstünden geçmesi'},{tr_fragment:'girdi',tr_gloss:'entered/went into',en_fragment:'was',bridge_type:'transform',explanation:'"Girmek" (enter) → "was"; Türkçe duruma giriş, İngilizce hal belirtimi'}],cultural_insight:'"Bunaltı" ve "overwhelm" ikisi de boğulma/baskı hissi; farklı metafor kanalları.',fluency_tip:'"I\'m completely overwhelmed with everything on my plate."'},
{id:1005,category:'duygular',tr:'Sevinçten havalara uçtu',tags:['sevinç','uç','hava','mutlu','coştu'],english_primary:"Was walking on air",alternatives:["Was floating on cloud nine","Felt like they were flying"],register:'informal',bridges:[{tr_fragment:'Sevinçten',tr_gloss:'from joy',en_fragment:'air',bridge_type:'transform',explanation:'Türkçe sevinçten havaya uçar; İngilizce hava üstünde yürür'},{tr_fragment:'havalara uçtu',tr_gloss:'flew into the skies',en_fragment:'walking on air',bridge_type:'transform',explanation:'İkisi de hava/gökyüzü metaforu; Türkçe daha dramatik'}],cultural_insight:'Sevinç → gökyüzüne çıkma metaforu iki dilde de var.',fluency_tip:'"She was walking on air after getting the promotion."'},
{id:1006,category:'duygular',tr:'Canı yandı',tags:['can','yan','acı','incin','rencide'],english_primary:"Was really hurt",alternatives:["Had their feelings hurt","Was stung by it"],register:'neutral',bridges:[{tr_fragment:'Canı',tr_gloss:'their soul/self',en_fragment:'they',bridge_type:'transform',explanation:'"Can" Türkçede hem can hem duygu merkezi; İngilizce özneyi kullanır'},{tr_fragment:'yandı',tr_gloss:'burned',en_fragment:'hurt/stung',bridge_type:'transform',explanation:'"Yanmak" (burn) → "hurt" veya "sting"; acıyı farklı fiziksel metaforla anlatır'}],cultural_insight:'"Canı yanmak" fiziksel ve duygusal acı için kullanılır; Türkçeye özgü çok yönlü ifade.',fluency_tip:'"I was really stung by her comment."'},
{id:1007,category:'duygular',tr:'Kötü his bıraktı',tags:['his','bırak','rahatsız','nahoş','negatif'],english_primary:"Left a bad taste in their mouth",alternatives:["Left them feeling uneasy","Didn\'t sit right with them"],register:'informal',bridges:[{tr_fragment:'Kötü his',tr_gloss:'bad feeling',en_fragment:'bad taste',bridge_type:'transform',explanation:'Kötü his soyut; İngilizce ağızdaki tat ile somutlaştırır'},{tr_fragment:'bıraktı',tr_gloss:'left behind',en_fragment:'left',bridge_type:'direct',explanation:'Bırakmak = leave; doğrudan'}],cultural_insight:'"Ağızda kötü tat bırakmak" deyimi İngilizcede çok yaygın; Türkçede de kullanılır.',fluency_tip:'"The whole experience left a bad taste in my mouth."'},
{id:1008,category:'duygular',tr:'Minnettarlık duydu',tags:['minnet','şükran','teşekkür','duy','takdir'],english_primary:"Was deeply grateful",alternatives:["Felt a surge of gratitude","Was touched by the gesture"],register:'neutral',bridges:[{tr_fragment:'Minnettarlık',tr_gloss:'gratitude/thankfulness',en_fragment:'grateful',bridge_type:'direct',explanation:'Minnettarlık ≈ gratitude; Arapça kökenli'},{tr_fragment:'duydu',tr_gloss:'felt',en_fragment:'was',bridge_type:'transform',explanation:'Duymak = feel; İngilizce "was" ile hal belirtimi'}],cultural_insight:'"Minnet" Arapça kökenli; derin bir yükümlülük ve şükran hissi içerir.',fluency_tip:'"I\'m deeply grateful for everything you\'ve done."'},
{id:1009,category:'duygular',tr:'İçi ferahladı',tags:['iç','ferahla','rahatla','iyileş','açıldı'],english_primary:"Felt a wave of relief wash over them",alternatives:["Felt lighter inside","Their heart lifted"],register:'neutral',bridges:[{tr_fragment:'İçi',tr_gloss:'their inner self',en_fragment:'inside/heart',bridge_type:'direct',explanation:'"İç" iç dünya; İngilizce "inside" veya "heart"'},{tr_fragment:'ferahladı',tr_gloss:'became fresh/airy',en_fragment:'wave of relief',bridge_type:'transform',explanation:'"Ferahlamak" havalanma/açılma; İngilizce dalga metaforu'}],cultural_insight:'"Ferahlık" Arapça kökenli; açık hava hissi; Türkçede hem fiziksel hem duygusal.',fluency_tip:'"I felt a wave of relief when I heard the results."'},
{id:1010,category:'duygular',tr:'Ağır depresyon yaşadı',tags:['depresyon','yaşa','ağır','karanlık','çöktü'],english_primary:"Sank into a deep depression",alternatives:["Hit rock bottom","Was consumed by darkness"],register:'neutral',bridges:[{tr_fragment:'Ağır',tr_gloss:'heavy/severe',en_fragment:'deep',bridge_type:'transform',explanation:'"Ağır" ağırlık metaforu; "deep" derinlik metaforu; ikisi de yoğunluk'},{tr_fragment:'depresyon yaşadı',tr_gloss:'experienced depression',en_fragment:'sank into depression',bridge_type:'transform',explanation:'"Yaşamak" deneyim; "sink into" batma metaforu'}],cultural_insight:'Depresyon için "batmak" metaforu İngilizcede çok yaygın.',fluency_tip:'"He sank into a deep depression after losing his job."'},
{id:1011,category:'duygular',tr:'Heyecandan titredi',tags:['heyecan','titre','bekle','sabırsız','gergin'],english_primary:"Trembled with excitement",alternatives:["Was shaking with anticipation","Was buzzing with nerves"],register:'informal',bridges:[{tr_fragment:'Heyecandan',tr_gloss:'from excitement',en_fragment:'with excitement',bridge_type:'direct',explanation:'Doğrudan eşleşme; sadece kelime sırası farklı'},{tr_fragment:'titredi',tr_gloss:'trembled/shook',en_fragment:'trembled',bridge_type:'direct',explanation:'Titremek = tremble; doğrudan'}],cultural_insight:'Titremenin hem soğuğu hem coşkuyu anlatması evrensel.',fluency_tip:'"She was literally trembling with excitement before the concert."'},
{id:1012,category:'duygular',tr:'Şüpheleri giderildi',tags:['şüphe','gider','rahatla','emin ol','kanaat'],english_primary:"Had their doubts put to rest",alternatives:["Was convinced","Their worries were alleviated"],register:'neutral',bridges:[{tr_fragment:'Şüpheleri',tr_gloss:'their doubts',en_fragment:'doubts',bridge_type:'direct',explanation:'Şüphe = doubt'},{tr_fragment:'giderildi',tr_gloss:'were removed/cleared',en_fragment:'put to rest',bridge_type:'transform',explanation:'"Gidermek" (remove) → "put to rest" (uyutmak); ikisi de şüpheyi bitirme'}],cultural_insight:'Şüpheyi "uyutmak" İngilizcede yaygın; ölüme değil uykuya yatırmak.',fluency_tip:'"The doctor put my doubts to rest after the check-up."'},
{id:1013,category:'duygular',tr:'Haksızlığa uğradı',tags:['haksız','uğra','adalet','incin','mağdur'],english_primary:"Was treated unfairly",alternatives:["Got a raw deal","Was wronged"],register:'neutral',bridges:[{tr_fragment:'Haksızlığa',tr_gloss:'to injustice/unfairness',en_fragment:'unfairly',bridge_type:'direct',explanation:'Haksızlık = unfairness; doğrudan'},{tr_fragment:'uğradı',tr_gloss:'was subjected to',en_fragment:'was treated',bridge_type:'transform',explanation:'"Uğramak" (to be exposed to) → "was treated"; İngilizce aktif muamele'}],cultural_insight:'"Haksızlık" hak+sızlık; hakkın yokluğu; adalet eksikliği.',fluency_tip:'"She got a raw deal from that company."'},
{id:1014,category:'duygular',tr:'Gülümsemesini yitirdi',tags:['gülümse','yitir','mutsuz','hüzün','kasvet'],english_primary:"Lost their smile",alternatives:["The light went out of their eyes","Seemed to lose their spark"],register:'neutral',bridges:[{tr_fragment:'Gülümsemesini',tr_gloss:'their smile',en_fragment:'smile',bridge_type:'direct',explanation:'Doğrudan eşleşme'},{tr_fragment:'yitirdi',tr_gloss:'lost/misplaced',en_fragment:'lost',bridge_type:'direct',explanation:'Yitirmek = lose; edebi versiyonu'}],cultural_insight:'"Yitirmek" "kaybetmek"ten daha edebi ve ağır bir yitiriş ifadesi.',fluency_tip:'"Since the accident, he seems to have lost his spark."'},
{id:1015,category:'duygular',tr:'Beklenti içindeydi',tags:['beklenti','iç','bekle','umut','sabırsız'],english_primary:"Was filled with anticipation",alternatives:["Was eagerly waiting","Was on tenterhooks"],register:'neutral',bridges:[{tr_fragment:'Beklenti',tr_gloss:'expectation/anticipation',en_fragment:'anticipation',bridge_type:'direct',explanation:'Beklenti ≈ anticipation; bekleme hali'},{tr_fragment:'içindeydi',tr_gloss:'was inside/within',en_fragment:'filled with',bridge_type:'transform',explanation:'"İçinde olmak" (to be inside) → "filled with" (dolmak); beklentinin içinde vs. beklentiyle dolmak'}],cultural_insight:'"Tenterhooks" çivi/kanca üstünde durmak; gerilim ifadesi.',fluency_tip:'"We were on tenterhooks waiting for the results."'},
{id:1016,category:'duygular',tr:'Suçluluk hissetti',tags:['suçluluk','hisset','vicdan','pişman','sorumluluk'],english_primary:"Was ridden with guilt",alternatives:["Had a guilty conscience","Felt terrible about it"],register:'neutral',bridges:[{tr_fragment:'Suçluluk',tr_gloss:'guilt',en_fragment:'guilt',bridge_type:'direct',explanation:'Doğrudan eşleşme'},{tr_fragment:'hissetti',tr_gloss:'felt',en_fragment:'ridden with',bridge_type:'transform',explanation:'"Hissetmek" (feel) → "ridden with" (üzerine binmiş); İngilizce yük metaforu'}],cultural_insight:'"Ridden with guilt" suçluluğun binit gibi üstüne binmesi; yük metaforu.',fluency_tip:'"He was ridden with guilt for days after the argument."'},
{id:1017,category:'duygular',tr:'Korkuya kapıldı',tags:['korku','kapıl','dehşet','panik','ürper'],english_primary:"Was seized with fear",alternatives:["Was gripped by terror","Froze in fright"],register:'neutral',bridges:[{tr_fragment:'Korkuya',tr_gloss:'by fear',en_fragment:'fear',bridge_type:'direct',explanation:'Korku = fear'},{tr_fragment:'kapıldı',tr_gloss:'was seized/taken',en_fragment:'seized',bridge_type:'direct',explanation:'Kapılmak = be seized; doğrudan eşleşme'}],cultural_insight:'Korkuya kapılma metaforu iki dilde de var; korku bir şey gibi seni kavrar.',fluency_tip:'"I was seized with fear when I heard the sound."'},
{id:1018,category:'duygular',tr:'Sevinci yarım kaldı',tags:['sevinç','yarım kal','eksik','gölge','mahkum'],english_primary:"Their joy was dampened",alternatives:["The moment was bittersweet","Couldn\'t fully enjoy it"],register:'neutral',bridges:[{tr_fragment:'Sevinci',tr_gloss:'their joy',en_fragment:'joy',bridge_type:'direct',explanation:'Sevinç = joy'},{tr_fragment:'yarım kaldı',tr_gloss:'remained half/incomplete',en_fragment:'dampened',bridge_type:'transform',explanation:'"Yarım kalmak" (stay half) → "dampened" (söndürülmek/ıslatmak)'}],cultural_insight:'"Dampened" ıslanma/söndürme metaforu; sevinci söndürmek.',fluency_tip:'"The news dampened our celebration."'},
{id:1019,category:'duygular',tr:'Iç sıkıntısı çekti',tags:['iç sıkıntı','çek','can sıkıntı','bıkkın','bezgin'],english_primary:"Was utterly bored",alternatives:["Felt restless and stuck","Was going stir-crazy"],register:'informal',bridges:[{tr_fragment:'İç sıkıntısı',tr_gloss:'inner distress/boredom',en_fragment:'bored',bridge_type:'transform',explanation:'"İç sıkıntısı" iç baskı; İngilizce sadece "bored" der ama "stir-crazy" daha yakın'},{tr_fragment:'çekti',tr_gloss:'suffered/bore',en_fragment:'utterly',bridge_type:'drop',explanation:'"Çekmek" (endure/pull) duyguyu taşımayı anlatır; İngilizce bunu atlar'}],cultural_insight:'"Stir-crazy" kapalı yerde çıldırma; Türkçe iç sıkıntısı daha ruhsal.',fluency_tip:'"I was going stir-crazy sitting home all day."'},
{id:1020,category:'duygular',tr:'Yas tuttu',tags:['yas','tut','kayıp','ağıt','üzüntü'],english_primary:"Was in mourning",alternatives:["Grieved deeply","Was consumed by grief"],register:'neutral',bridges:[{tr_fragment:'Yas',tr_gloss:'mourning/grief',en_fragment:'mourning',bridge_type:'direct',explanation:'Yas = mourning; doğrudan'},{tr_fragment:'tuttu',tr_gloss:'held/observed',en_fragment:'was in',bridge_type:'transform',explanation:'"Tutmak" (hold/observe) → "was in" (içinde olmak); hal belirtimi farklı'}],cultural_insight:'"Yas tutmak" geleneksel yas ritüellerini de kapsar; kültürel yük taşır.',fluency_tip:'"She is still in mourning; be gentle with her."'},
{id:1021,category:'duygular',tr:'Duygularını bastırdı',tags:['duygu','bastır','gizle','içine at','kontrol'],english_primary:"Bottled up their emotions",alternatives:["Kept their feelings inside","Suppressed everything"],register:'neutral',bridges:[{tr_fragment:'Duygularını',tr_gloss:'their emotions',en_fragment:'emotions',bridge_type:'direct',explanation:'Duygu = emotion'},{tr_fragment:'bastırdı',tr_gloss:'suppressed/pressed down',en_fragment:'bottled up',bridge_type:'transform',explanation:'"Bastırmak" (press down) → "bottle up" (şişeye tıkmak); ikisi de gizleme metaforu'}],cultural_insight:'"Bottle up" duygular şişelenmiş sıvı gibi; açılınca taşar.',fluency_tip:'"You can\'t keep bottling up your emotions like this."'},
{id:1022,category:'duygular',tr:'Kalbini açtı',tags:['kalp','aç','paylaş','itiraf','sır'],english_primary:"Opened up about their feelings",alternatives:["Bared their soul","Let their guard down"],register:'neutral',bridges:[{tr_fragment:'Kalbini',tr_gloss:'their heart',en_fragment:'heart/feelings',bridge_type:'direct',explanation:'Kalp = heart; doğrudan'},{tr_fragment:'açtı',tr_gloss:'opened',en_fragment:'opened up',bridge_type:'direct',explanation:'Açmak = open; doğrudan eşleşme'}],cultural_insight:'"Kalbini açmak" manevî samimiyet; "bare one\'s soul" ruhsal çıplaklık.',fluency_tip:'"He finally opened up about his struggles."'},
{id:1023,category:'duygular',tr:'Hayal kurdu',tags:['hayal','kur','rüya','fantezi','dalıp git'],english_primary:"Got lost in daydreams",alternatives:["Drifted off into fantasy","Had their head in the clouds"],register:'informal',bridges:[{tr_fragment:'Hayal',tr_gloss:'dream/fantasy',en_fragment:'daydreams',bridge_type:'direct',explanation:'Hayal = dream/vision; daydream = gündüz hayali'},{tr_fragment:'kurdu',tr_gloss:'built/set up',en_fragment:'got lost in',bridge_type:'transform',explanation:'"Kurmak" (build) → "get lost in" (kaybolmak); Türkçe yaratma, İngilizce içinde kaybolma'}],cultural_insight:'"Hayal kurmak" harfiyen hayal inşa etmek; yaratıcı ve aktif bir süreç.',fluency_tip:'"Stop daydreaming and focus on the task."'},
{id:1024,category:'duygular',tr:'İçi daraldı',tags:['iç','daral','sıkıl','bunalt','kısıl'],english_primary:"Felt hemmed in",alternatives:["Felt claustrophobic","Couldn\'t breathe emotionally"],register:'neutral',bridges:[{tr_fragment:'İçi',tr_gloss:'inner self',en_fragment:'they',bridge_type:'transform',explanation:'"İç" özne; İngilizce kişi özne'},{tr_fragment:'daraldı',tr_gloss:'narrowed/constricted',en_fragment:'hemmed in',bridge_type:'transform',explanation:'"Daralmak" daralma; "hemmed in" çevrilmiş/sıkıştırılmış'}],cultural_insight:'Psikolojik daralma için fiziksel sıkışma metaforu çok yaygın.',fluency_tip:'"I feel hemmed in by all these rules."'},
{id:1025,category:'duygular',tr:'Kırgın oldu',tags:['kırgın','üzgün','küs','kırıldı','alındı'],english_primary:"Was left feeling hurt and let down",alternatives:["Was nursing a wounded pride","Felt betrayed"],register:'neutral',bridges:[{tr_fragment:'Kırgın',tr_gloss:'hurt/resentful',en_fragment:'hurt and let down',bridge_type:'direct',explanation:'"Kırgın" kırılmışlık hissi; "let down" yarı yolda bırakılma'},{tr_fragment:'oldu',tr_gloss:'became',en_fragment:'was left feeling',bridge_type:'direct',explanation:'Olmak → be left feeling; hal dönüşümü'}],cultural_insight:'"Kırgınlık" kırılıp incinme; "let down" hayal kırıklığıyla bırakılma — ikisi yakın.',fluency_tip:'"She was hurt and let down by his response."'},
{id:1026,category:'duygular',tr:'Zihin yorgunluğu yaşadı',tags:['zihin','yorgun','mental','tüken','düşün'],english_primary:"Was mentally exhausted",alternatives:["Had brain fog","Hit a mental wall"],register:'neutral',bridges:[{tr_fragment:'Zihin yorgunluğu',tr_gloss:'mental fatigue',en_fragment:'mentally exhausted',bridge_type:'direct',explanation:'Doğrudan eşleşme'},{tr_fragment:'yaşadı',tr_gloss:'experienced/lived',en_fragment:'was',bridge_type:'transform',explanation:'"Yaşamak" (experience) → "was" (olmak); Türkçe deneyim aktif, İngilizce hal'}],cultural_insight:'"Zihin yorgunluğu" son yıllarda yaygınlaşan kavram; "burnout" ile örtüşür.',fluency_tip:'"I\'m completely mentally exhausted — I need a break."'},
{id:1027,category:'duygular',tr:'Kendini yalnız hissetti',tags:['yalnız','hisset','tek','izole','kimse yok'],english_primary:"Felt utterly alone",alternatives:["Felt isolated","Felt like no one understood them"],register:'neutral',bridges:[{tr_fragment:'Kendini',tr_gloss:'themselves',en_fragment:'they',bridge_type:'direct',explanation:'Refleksif yapı benzer'},{tr_fragment:'yalnız hissetti',tr_gloss:'felt lonely',en_fragment:'felt utterly alone',bridge_type:'direct',explanation:'Doğrudan eşleşme; "utterly" yoğunlaştırıcı'}],cultural_insight:'"Yalnızlık" ve "loneliness" arasında ince fark; yalnızlık hem seçim hem kader.',fluency_tip:'"Sometimes you can feel utterly alone even in a crowd."'},
{id:1028,category:'duygular',tr:'Sevincini paylaştı',tags:['sevinç','paylaş','müjde','haber ver','coştu'],english_primary:"Shared their joy with everyone",alternatives:["Spread the good news","Couldn\'t keep the excitement to themselves"],register:'neutral',bridges:[{tr_fragment:'Sevincini',tr_gloss:'their joy',en_fragment:'joy',bridge_type:'direct',explanation:'Sevinç = joy'},{tr_fragment:'paylaştı',tr_gloss:'shared',en_fragment:'shared',bridge_type:'direct',explanation:'Paylaşmak = share; doğrudan'}],cultural_insight:'"Müjde vermek" (good news) Türk kültüründe çok önemli; haberi paylaşmak sorumluluk.',fluency_tip:'"She couldn\'t keep the excitement to herself and told everyone."'},
{id:1029,category:'duygular',tr:'Nefret besledi',tags:['nefret','besle','kin','düşmanlık','iç'],english_primary:"Harboured a deep hatred",alternatives:["Held a grudge","Nursed a bitter resentment"],register:'neutral',bridges:[{tr_fragment:'Nefret',tr_gloss:'hatred',en_fragment:'hatred',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'besledi',tr_gloss:'nourished/fed',en_fragment:'harboured',bridge_type:'transform',explanation:'"Beslemek" (nourish/feed) → "harbour" (barındırmak); her ikisi de duyguyu içinde tutma'}],cultural_insight:'"Harbour" liman anlamı da var; nefreti liman gibi içinde tutmak.',fluency_tip:'"He harboured a deep hatred for years without showing it."'},
{id:1030,category:'duygular',tr:'İkircikli kaldı',tags:['ikircik','kal','kararsız','hem hem','çelişki'],english_primary:"Was torn between two feelings",alternatives:["Had mixed feelings","Couldn\'t make up their mind emotionally"],register:'neutral',bridges:[{tr_fragment:'İkircikli',tr_gloss:'ambivalent/two-sided',en_fragment:'torn',bridge_type:'transform',explanation:'"İkircikli" iki yönlü; "torn" yırtılmış; ikisi de bölünmüşlük'},{tr_fragment:'kaldı',tr_gloss:'remained',en_fragment:'was',bridge_type:'direct',explanation:'Hal devam metaforu'}],cultural_insight:'"İkircikli" Türkçeye özgü; çelişkili duyguların birarada yaşanması.',fluency_tip:'"I have mixed feelings about the whole situation."'},
{id:1031,category:'duygular',tr:'Tatlı bir heyecan sardı',tags:['tatlı','heyecan','sar','coştu','beklenti'],english_primary:"Was wrapped in sweet anticipation",alternatives:["Felt a pleasant buzz","Had butterflies in a good way"],register:'neutral',bridges:[{tr_fragment:'Tatlı bir',tr_gloss:'sweet',en_fragment:'sweet',bridge_type:'direct',explanation:'Tatlı = sweet; doğrudan'},{tr_fragment:'heyecan sardı',tr_gloss:'excitement wrapped them',en_fragment:'wrapped in anticipation',bridge_type:'direct',explanation:'Sarmak = wrap; ikisi de sarılma metaforu'}],cultural_insight:'İyi heyecanda kelebekler çok yaygın İngilizce metaforu; Türkçe sarmayı kullanır.',fluency_tip:'"I had butterflies in the best way before the date."'},
{id:1032,category:'duygular',tr:'Gözünü kararttı',tags:['göz','karar','körleş','öfke','aklını kaybetti'],english_primary:"Saw red",alternatives:["Lost all reason","Was blinded by rage"],register:'informal',bridges:[{tr_fragment:'Gözünü',tr_gloss:'their eyes',en_fragment:'saw',bridge_type:'direct',explanation:'Görme organı her ikisinde de'},{tr_fragment:'kararttı',tr_gloss:'darkened',en_fragment:'red',bridge_type:'transform',explanation:'Türkçe karartma (dark) → İngilizce kırmızı görmek; öfkeyi renk metaforuyla anlatma'}],cultural_insight:'Öfkeyi renk/görme bozulması ile anlatmak; Türkçe kararma, İngilizce kırmızı.',fluency_tip:'"When I saw what he did, I just saw red."'},
{id:1033,category:'duygular',tr:'Sevinçle dolup taştı',tags:['sevinç','dol','taş','coş','neşe'],english_primary:"Was brimming with happiness",alternatives:["Was overflowing with joy","Couldn\'t contain their happiness"],register:'informal',bridges:[{tr_fragment:'Sevinçle',tr_gloss:'with happiness',en_fragment:'happiness',bridge_type:'direct',explanation:'Sevinç = happiness/joy'},{tr_fragment:'dolup taştı',tr_gloss:'filled up and overflowed',en_fragment:'brimming',bridge_type:'direct',explanation:'"Dolup taşmak" ve "brimming" ikisi de taşma metaforu'}],cultural_insight:'Mutluluğu kap gibi taşan bir sıvıya benzetmek evrensel.',fluency_tip:'"She was absolutely brimming with happiness on her wedding day."'},
{id:1034,category:'duygular',tr:'Sıkıntıdan bunaldı',tags:['sıkıntı','bun','overwhelm','baskı','boğul'],english_primary:"Was overwhelmed by their troubles",alternatives:["Felt crushed under the weight of it all","Was drowning in problems"],register:'neutral',bridges:[{tr_fragment:'Sıkıntıdan',tr_gloss:'from trouble/distress',en_fragment:'troubles',bridge_type:'direct',explanation:'Sıkıntı ≈ trouble/distress'},{tr_fragment:'bunaldı',tr_gloss:'was suffocated/overwhelmed',en_fragment:'overwhelmed',bridge_type:'direct',explanation:'Bunalmak = overwhelm; doğrudan eşleşme'}],cultural_insight:'"Sıkıntı" çok geniş bir kelime; hem can sıkıntısı hem dert hem baskı.',fluency_tip:'"She was drowning in problems at work."'},
{id:1035,category:'duygular',tr:'Derinden etkilendi',tags:['derin','etkile','sarsıldı','iz bıraktı','içini çekti'],english_primary:"Was deeply moved",alternatives:["Was profoundly affected","Was shaken to the core"],register:'neutral',bridges:[{tr_fragment:'Derinden',tr_gloss:'deeply/from the depths',en_fragment:'deeply',bridge_type:'direct',explanation:'Derin = deep; doğrudan'},{tr_fragment:'etkilendi',tr_gloss:'was affected',en_fragment:'moved',bridge_type:'transform',explanation:'"Etkilenmek" (be affected) → "moved" (hareket ettirilmek); İngilizce hareket metaforu'}],cultural_insight:'"Moved" İngilizcede duygusal hareketi anlatır; duyguların sizi oynatması.',fluency_tip:'"The documentary deeply moved me."'},
{id:1036,category:'duygular',tr:'Kendinden utandı',tags:['utanç','kendi','utandı','mahcup','vicdan'],english_primary:"Was ashamed of themselves",alternatives:["Felt deep shame","Couldn\'t look at themselves in the mirror"],register:'neutral',bridges:[{tr_fragment:'Kendinden',tr_gloss:'of themselves',en_fragment:'of themselves',bridge_type:'direct',explanation:'Reflexif yapı aynı'},{tr_fragment:'utandı',tr_gloss:'was ashamed',en_fragment:'was ashamed',bridge_type:'direct',explanation:'Utanmak = be ashamed; doğrudan'}],cultural_insight:'Utancın aynaya bakamamakla anlatılması iki dilde de yaygın.',fluency_tip:'"He was deeply ashamed of how he had acted."'},
/* ─── YORGUNLUK (1037-1091) ─── */
{id:1037,category:'yorgunluk',tr:'Gözleri kapandı',tags:['göz','kapat','uyu','uykusu gel','yorgun'],english_primary:"Could barely keep their eyes open",alternatives:["Was nodding off","Was dead on their feet"],register:'informal',bridges:[{tr_fragment:'Gözleri',tr_gloss:'their eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz = eye'},{tr_fragment:'kapandı',tr_gloss:'closed/shut',en_fragment:'keep...open',bridge_type:'transform',explanation:'Kapanmak (close) → not keep open; ters metafor ile aynı anlam'}],cultural_insight:'Yorgunlukta gözlerin kapanması evrensel; fiziksel tepki.',fluency_tip:'"I can barely keep my eyes open — I need coffee."'},
{id:1038,category:'yorgunluk',tr:'Yorgunluktan çöktü',tags:['yorgunluk','çök','bit','tüken','düştü'],english_primary:"Collapsed from exhaustion",alternatives:["Hit the wall","Fell apart from tiredness"],register:'informal',bridges:[{tr_fragment:'Yorgunluktan',tr_gloss:'from exhaustion',en_fragment:'from exhaustion',bridge_type:'direct',explanation:'Doğrudan eşleşme'},{tr_fragment:'çöktü',tr_gloss:'collapsed/crumbled',en_fragment:'collapsed',bridge_type:'direct',explanation:'Çökmek = collapse; doğrudan'}],cultural_insight:'"Hit the wall" koşucudan geliyor; duvarla çarpışma = tamamen tükenmek.',fluency_tip:'"I completely hit the wall after the marathon."'},
{id:1039,category:'yorgunluk',tr:'Gece boyunca gözünü kırpmadı',tags:['gece','göz kırp','uyu','uykusuz','insomnia'],english_primary:"Didn\'t sleep a wink all night",alternatives:["Was up all night","Lay awake for hours"],register:'informal',bridges:[{tr_fragment:'Gece boyunca',tr_gloss:'throughout the night',en_fragment:'all night',bridge_type:'direct',explanation:'Doğrudan zaman belirteci'},{tr_fragment:'gözünü kırpmadı',tr_gloss:'didn\'t blink',en_fragment:'a wink',bridge_type:'transform',explanation:'Göz kırpmamak = didn\'t blink; İngilizce "wink" de göz kırpma; aynı fiziksel hareket!'}],cultural_insight:'İki dil de uyku için göz hareketini metafor olarak kullanır; kırpmamak = uyumamak.',fluency_tip:'"I didn\'t sleep a wink last night worrying about the presentation."'},
{id:1040,category:'yorgunluk',tr:'Enerji deposu bitti',tags:['enerji','bit','tüken','pil','güç'],english_primary:"Ran out of steam",alternatives:["Hit empty","The battery died on them"],register:'informal',bridges:[{tr_fragment:'Enerji deposu',tr_gloss:'energy tank',en_fragment:'steam',bridge_type:'transform',explanation:'"Enerji deposu" yakıt tankı; İngilizce buharlı makine metaforu (steam)'},{tr_fragment:'bitti',tr_gloss:'ran out/ended',en_fragment:'ran out of',bridge_type:'direct',explanation:'Bitmek = run out; doğrudan'}],cultural_insight:'"Run out of steam" buhar makinesi döneminden; yakıtsız kalan makine.',fluency_tip:'"We started strong but ran out of steam by the third hour."'},
{id:1041,category:'yorgunluk',tr:'Sabah kalkmakta zorlandı',tags:['sabah','kalk','zor','yatak','ağır'],english_primary:"Could hardly drag themselves out of bed",alternatives:["Struggled to get up","Hit snooze five times"],register:'informal',bridges:[{tr_fragment:'Sabah kalkmakta',tr_gloss:'getting up in the morning',en_fragment:'out of bed',bridge_type:'direct',explanation:'Yataktan kalkma, doğrudan'},{tr_fragment:'zorlandı',tr_gloss:'struggled/had difficulty',en_fragment:'could hardly drag',bridge_type:'transform',explanation:'"Zorlanmak" güçlük; "drag" sürüklemek; İngilizce kendini sürükleyen kişiyi anlatır'}],cultural_insight:'"Drag yourself out of bed" yorgunlukta vücudun ağır gelmesi; çekim metaforu.',fluency_tip:'"I could hardly drag myself out of bed this morning."'},
{id:1042,category:'yorgunluk',tr:'Dinlenemeden çalıştı',tags:['dinlen','çalış','mola','dur','kesintisiz'],english_primary:"Worked without a break",alternatives:["Powered through without resting","Burned the candle at both ends"],register:'neutral',bridges:[{tr_fragment:'Dinlenemeden',tr_gloss:'without resting',en_fragment:'without a break',bridge_type:'direct',explanation:'Doğrudan eşleşme'},{tr_fragment:'çalıştı',tr_gloss:'worked',en_fragment:'worked',bridge_type:'direct',explanation:'Çalışmak = work'}],cultural_insight:'"Burn the candle at both ends" her iki ucundan yakmak; geceden ve gündüzden çalmak.',fluency_tip:'"She\'s been burning the candle at both ends for weeks."'},
{id:1043,category:'yorgunluk',tr:'Bedenini dinlemedi',tags:['beden','dinle','ihmal','zorla','uyar'],english_primary:"Ignored their body\'s warning signs",alternatives:["Pushed past their limits","Refused to slow down"],register:'neutral',bridges:[{tr_fragment:'Bedenini',tr_gloss:'their body',en_fragment:'body\'s',bridge_type:'direct',explanation:'Beden = body'},{tr_fragment:'dinlemedi',tr_gloss:'didn\'t listen to',en_fragment:'ignored',bridge_type:'transform',explanation:'"Dinlememek" (not listen) → "ignore" (görmezden gelmek); farklı duyular'}],cultural_insight:'"Bedeni dinlemek" modern sağlık dilinde de kullanılıyor; Türkçe ve İngilizce paralel.',fluency_tip:'"Listen to your body — if you\'re tired, rest."'},
{id:1044,category:'yorgunluk',tr:'Sürüne sürüne eve vardı',tags:['sürün','eve var','bitik','ağır adım','yıprandı'],english_primary:"Dragged themselves home",alternatives:["Barely made it home","Shuffled through the door exhausted"],register:'informal',bridges:[{tr_fragment:'Sürüne sürüne',tr_gloss:'crawling/dragging',en_fragment:'dragged themselves',bridge_type:'direct',explanation:'İkisi de sürüklenme metaforu'},{tr_fragment:'eve vardı',tr_gloss:'arrived home',en_fragment:'home',bridge_type:'direct',explanation:'Doğrudan yer belirteci'}],cultural_insight:'"Sürüne sürüne" tekrarlı yapı yoğunluğu artırır; İngilizce tekil fiil kullanır.',fluency_tip:'"I just dragged myself home and crashed on the couch."'},
{id:1045,category:'yorgunluk',tr:'Yorgunluktan yüzü soldu',tags:['yorgunluk','yüz','sol','beti benzi','renk'],english_primary:"Looked pale and washed out",alternatives:["Had a haggard look","Looked utterly drained"],register:'neutral',bridges:[{tr_fragment:'Yorgunluktan',tr_gloss:'from tiredness',en_fragment:'washed out',bridge_type:'transform',explanation:'Yorgunluk → solgunluk; "washed out" yıkanmış/renksiz'},{tr_fragment:'yüzü soldu',tr_gloss:'their face paled',en_fragment:'pale',bridge_type:'direct',explanation:'Solmak = pale; doğrudan'}],cultural_insight:'"Washed out" renklerin yıkanıp uçması; solgunluğu güneşte solmuş kumaşa benzetiyor.',fluency_tip:'"You look totally washed out — did you sleep at all?"'},
{id:1046,category:'yorgunluk',tr:'Hafızası dumura uğradı',tags:['hafıza','dumur','bellek','unut','beyin'],english_primary:"Their mind went blank",alternatives:["Had a complete brain freeze","Couldn\'t remember a thing"],register:'informal',bridges:[{tr_fragment:'Hafızası',tr_gloss:'their memory',en_fragment:'mind',bridge_type:'transform',explanation:'"Hafıza" (memory) → "mind" (zihin); yakın ama farklı'},{tr_fragment:'dumura uğradı',tr_gloss:'became paralyzed',en_fragment:'went blank',bridge_type:'transform',explanation:'"Dumur" felç/uyuşma; "blank" boşluk; ikisi de işlevsizliği anlatır'}],cultural_insight:'"Brain freeze" hem soğuk içecek hem zihin donması için kullanılır.',fluency_tip:'"My mind went completely blank during the presentation."'},
{id:1047,category:'yorgunluk',tr:'Bir an bile durmadı',tags:['dur','an','mola','sürekli','kesintisiz'],english_primary:"Didn\'t stop for a single moment",alternatives:["Was on the go non-stop","Never had a moment to breathe"],register:'neutral',bridges:[{tr_fragment:'Bir an bile',tr_gloss:'not even for a moment',en_fragment:'a single moment',bridge_type:'direct',explanation:'Doğrudan eşleşme; "even" → "single" yoğunluk'},{tr_fragment:'durmadı',tr_gloss:'didn\'t stop',en_fragment:'didn\'t stop',bridge_type:'direct',explanation:'Durmamak = not stop'}],cultural_insight:'"Not a moment to breathe" nefes alacak vakit yok; nefes = hayat metaforu.',fluency_tip:'"She was on the go non-stop from 6 AM to midnight."'},
{id:1048,category:'yorgunluk',tr:'Ayakta duracak hali kalmadı',tags:['ayak','dur','hal','güç','bit'],english_primary:"Could barely stand up straight",alternatives:["Was dead on their feet","Had nothing left in the tank"],register:'informal',bridges:[{tr_fragment:'Ayakta duracak',tr_gloss:'to stand upright',en_fragment:'stand up straight',bridge_type:'direct',explanation:'Ayakta durma doğrudan'},{tr_fragment:'hali kalmadı',tr_gloss:'had no condition left',en_fragment:'barely',bridge_type:'transform',explanation:'"Hal kalmamak" mecalsizlik; İngilizce "barely" yeterlilik eşiği'}],cultural_insight:'"Dead on your feet" yorgunluktan adeta ölü olmak; abartı metaforu.',fluency_tip:'"I\'m dead on my feet — I need to sit down."'},
{id:1049,category:'yorgunluk',tr:'Sabaha kadar gözlerini kapamadı',tags:['sabah','göz kapat','uyu','gece','uykusuz'],english_primary:"Was awake until the crack of dawn",alternatives:["Stayed up all night","Tossed and turned all night"],register:'neutral',bridges:[{tr_fragment:'Sabaha kadar',tr_gloss:'until morning',en_fragment:'until the crack of dawn',bridge_type:'transform',explanation:'"Sabaha kadar" gece boyunca; "crack of dawn" şafağın çatlaması; poetik'},{tr_fragment:'gözlerini kapamadı',tr_gloss:'didn\'t close their eyes',en_fragment:'awake',bridge_type:'transform',explanation:'Göz kapamamak = uyumamak; İngilizce "awake" doğrudan'}],cultural_insight:'"Crack of dawn" şafağın ilk ışığı; sanki gece çatlıyor; güzel bir metafor.',fluency_tip:'"I tossed and turned all night — couldn\'t sleep at all."'},
{id:1050,category:'yorgunluk',tr:'Kendini yeniledi',tags:['yenile','enerji topla','toparlan','dinlen','şarj'],english_primary:"Recharged their batteries",alternatives:["Got their energy back","Hit the reset button"],register:'informal',bridges:[{tr_fragment:'Kendini',tr_gloss:'themselves',en_fragment:'their batteries',bridge_type:'transform',explanation:'"Kendini yenilemek" öz yenileme; "recharge batteries" batarya metaforu'},{tr_fragment:'yeniledi',tr_gloss:'renewed',en_fragment:'recharged',bridge_type:'transform',explanation:'Yenilemek = renew; recharge = yeniden şarj etmek; yakın anlam'}],cultural_insight:'"Recharge" pil teknolojisiyle gelen; modern yaşam metaforu.',fluency_tip:'"I spent the weekend doing nothing — really recharged my batteries."'},
{id:1051,category:'yorgunluk',tr:'Kronik yorgunluk içindeydi',tags:['kronik','yorgunluk','sürekli','tüken','bitik'],english_primary:"Was chronically exhausted",alternatives:["Was running on empty permanently","Never seemed to recover"],register:'neutral',bridges:[{tr_fragment:'Kronik',tr_gloss:'chronic',en_fragment:'chronically',bridge_type:'direct',explanation:'Uluslararası kelime; doğrudan'},{tr_fragment:'yorgunluk içindeydi',tr_gloss:'was within exhaustion',en_fragment:'exhausted',bridge_type:'transform',explanation:'"İçinde olmak" içinde yaşamak; İngilizce doğrudan hal belirtimi'}],cultural_insight:'"Burnout" ve "kronik yorgunluk" modern çalışma kültürünün ürünleri.',fluency_tip:'"I\'m chronically exhausted — this job is taking everything from me."'},
{id:1052,category:'yorgunluk',tr:'Koltukta uyuyakaldı',tags:['koltuk','uyuya kal','dinlen','uyku','yorgun'],english_primary:"Fell asleep in the armchair",alternatives:["Dozed off on the couch","Passed out sitting up"],register:'informal',bridges:[{tr_fragment:'Koltukta',tr_gloss:'in the armchair',en_fragment:'in the armchair',bridge_type:'direct',explanation:'Doğrudan yer belirteci'},{tr_fragment:'uyuyakaldı',tr_gloss:'fell asleep',en_fragment:'fell asleep',bridge_type:'direct',explanation:'Uyuyakalmak = fall asleep; doğrudan'}],cultural_insight:'"Doze off" hafifçe uyuyakalma; "pass out" daha derin düşme.',fluency_tip:'"He dozed off on the couch during the movie."'},
{id:1053,category:'yorgunluk',tr:'Tatil özlemi çekti',tags:['tatil','özle','mola','kaçış','dinlen'],english_primary:"Was desperately in need of a holiday",alternatives:["Was burnt out and craving rest","Was counting down the days to vacation"],register:'neutral',bridges:[{tr_fragment:'Tatil özlemi',tr_gloss:'vacation longing',en_fragment:'in need of a holiday',bridge_type:'transform',explanation:'"Özlem" derin arzu; "in need of" ihtiyaç; anlam kayması ama yakın'},{tr_fragment:'çekti',tr_gloss:'felt/suffered',en_fragment:'desperately',bridge_type:'transform',explanation:'"Çekmek" (endure) → "desperately" (çaresizce); yoğunluğu farklı aktarır'}],cultural_insight:'"Burnt out" tamamen yanmış; Türkçede "bitik" veya "tükenmiş" karşılığı.',fluency_tip:'"I\'m completely burnt out — I need a real break."'},
{id:1054,category:'yorgunluk',tr:'Beyin fırtınası sonrası tükendi',tags:['beyin fırtınası','tüken','bitik','fikir','üret'],english_primary:"Was mentally drained after the brainstorm",alternatives:["Had nothing left after the session","Was creatively tapped out"],register:'neutral',bridges:[{tr_fragment:'Beyin fırtınası',tr_gloss:'brainstorm',en_fragment:'brainstorm',bridge_type:'direct',explanation:'Alıntı kelime; doğrudan'},{tr_fragment:'tükendi',tr_gloss:'was depleted',en_fragment:'mentally drained',bridge_type:'direct',explanation:'Tükenmek = depleted/drained; doğrudan'}],cultural_insight:'"Tapped out" musluğun açık ama bitmesi; kaynak metaforu.',fluency_tip:'"After a full day of brainstorming, I was completely tapped out."'},
{id:1055,category:'yorgunluk',tr:'Konsantrasyonu dağıldı',tags:['konsantrasyon','dağıl','dikkat','odak','kaybol'],english_primary:"Lost their concentration",alternatives:["Couldn\'t focus anymore","Their mind started wandering"],register:'neutral',bridges:[{tr_fragment:'Konsantrasyonu',tr_gloss:'their concentration',en_fragment:'concentration',bridge_type:'direct',explanation:'Uluslararası kelime'},{tr_fragment:'dağıldı',tr_gloss:'scattered/dispersed',en_fragment:'lost',bridge_type:'transform',explanation:'"Dağılmak" (scatter) → "lost" (yitirmek); farklı metafor ama aynı son'}],cultural_insight:'"Mind wandering" zihnin gezmeye çıkması; Türkçede "aklı başka yere gitmek".',fluency_tip:'"After hour three, I completely lost my concentration."'},
{id:1056,category:'yorgunluk',tr:'Gündüz uyur gibi geçirdi',tags:['gündüz','uyu','zombi','uyuşuk','durgun'],english_primary:"Sleepwalked through the day",alternatives:["Was on autopilot all day","Moved like a zombie"],register:'informal',bridges:[{tr_fragment:'Gündüz uyur gibi',tr_gloss:'as if sleeping during the day',en_fragment:'sleepwalked',bridge_type:'direct',explanation:'İkisi de uyurken yürüme/yaşama metaforu'},{tr_fragment:'geçirdi',tr_gloss:'spent/passed',en_fragment:'through the day',bridge_type:'direct',explanation:'Günü geçirmek = spend the day'}],cultural_insight:'"Sleepwalk through" farkındasız yaşamak; otopilot gibi.',fluency_tip:'"I just sleepwalked through Monday — couldn\'t focus at all."'},
{id:1057,category:'yorgunluk',tr:'Molayı hak etti',tags:['mola','hak et','dayan','çalış','dinlen'],english_primary:"Earned a well-deserved rest",alternatives:["Deserved a break","Had put in enough to warrant a pause"],register:'neutral',bridges:[{tr_fragment:'Molayı',tr_gloss:'the break',en_fragment:'rest',bridge_type:'direct',explanation:'Mola ≈ rest/break'},{tr_fragment:'hak etti',tr_gloss:'deserved/earned',en_fragment:'earned / well-deserved',bridge_type:'direct',explanation:'Hak etmek = earn/deserve; doğrudan'}],cultural_insight:'"Well-deserved" hak kazanılmış; emeğin karşılığı olduğunu vurgular.',fluency_tip:'"Take the weekend off — you\'ve earned it."'},
{id:1058,category:'yorgunluk',tr:'Vücudu çığlık attı',tags:['vücut','çığlık at','acı','sinyal','dinlen'],english_primary:"Their body was crying out for rest",alternatives:["Every muscle ached","Was falling apart physically"],register:'neutral',bridges:[{tr_fragment:'Vücudu',tr_gloss:'their body',en_fragment:'body',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çığlık attı',tr_gloss:'screamed',en_fragment:'crying out',bridge_type:'direct',explanation:'İkisi de vücudun sesli isyan metaforu; screaming ≈ crying out'}],cultural_insight:'Vücudu kişileştirip sesini dinlemek modern sağlık söyleminin parçası.',fluency_tip:'"My body is crying out for rest — I need to stop."'},
{id:1059,category:'yorgunluk',tr:'Uyku borcu biriktirdi',tags:['uyku','borç','biriktir','uykusuz','açık'],english_primary:"Built up a serious sleep debt",alternatives:["Was running a sleep deficit","Needed to catch up on sleep"],register:'neutral',bridges:[{tr_fragment:'Uyku borcu',tr_gloss:'sleep debt',en_fragment:'sleep debt',bridge_type:'direct',explanation:'Uluslararası kavram; birebir aynı'},{tr_fragment:'biriktirdi',tr_gloss:'accumulated',en_fragment:'built up',bridge_type:'direct',explanation:'Biriktirmek = accumulate/build up; doğrudan'}],cultural_insight:'"Sleep debt" bilimsel terim; uyku açığı ekonomik metaforla anlatılıyor.',fluency_tip:'"I need the whole weekend to catch up on sleep."'},
{id:1060,category:'yorgunluk',tr:'Hafta sonu yatak\'tan çıkmadı',tags:['hafta sonu','yatak','çıkma','dinlen','uyku'],english_primary:"Spent the whole weekend in bed",alternatives:["Didn\'t move from the sofa all weekend","Hibernated the entire weekend"],register:'informal',bridges:[{tr_fragment:'Hafta sonu',tr_gloss:'weekend',en_fragment:'weekend',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'yataktan çıkmadı',tr_gloss:'didn\'t get out of bed',en_fragment:'in bed',bridge_type:'direct',explanation:'Doğrudan; yatak = bed'}],cultural_insight:'"Hibernate" kış uykusu metaforu; insanın hayvan gibi uyuması.',fluency_tip:'"I basically hibernated the whole weekend — needed it badly."'},
{id:1061,category:'yorgunluk',tr:'Adımları ağırlaştı',tags:['adım','ağır','yavaş','yorgun','çöktü'],english_primary:"Their steps grew heavy",alternatives:["Trudged along","Could barely put one foot in front of the other"],register:'neutral',bridges:[{tr_fragment:'Adımları',tr_gloss:'their steps',en_fragment:'steps',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'ağırlaştı',tr_gloss:'grew heavy',en_fragment:'grew heavy',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'"Trudge" ağır ve yorgun yürümek; İngilizcede özgün fiil.',fluency_tip:'"By mile 20 of the marathon, my steps had grown incredibly heavy."'},
{id:1062,category:'yorgunluk',tr:'Dinlenmeden devam etti',tags:['dinlen','devam','ısrar','azim','köle'],english_primary:"Pressed on without rest",alternatives:["Kept going through sheer willpower","Refused to stop"],register:'neutral',bridges:[{tr_fragment:'Dinlenmeden',tr_gloss:'without resting',en_fragment:'without rest',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'devam etti',tr_gloss:'continued',en_fragment:'pressed on',bridge_type:'transform',explanation:'"Devam etmek" sürdürme; "press on" ilerleme baskısı; İngilizce daha aktif'}],cultural_insight:'"Press on" baskıyla ilerleme; askeri bağlamdan; kararlılık içerir.',fluency_tip:'"Despite being exhausted, she pressed on until it was done."'},
{id:1063,category:'yorgunluk',tr:'Mola vermeden 10 saat çalıştı',tags:['mola','çalış','saat','dinlenmeden','uzun'],english_primary:"Worked ten hours straight without a break",alternatives:["Put in a ten-hour marathon shift","Ground through ten hours non-stop"],register:'neutral',bridges:[{tr_fragment:'Mola vermeden',tr_gloss:'without giving a break',en_fragment:'without a break',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'10 saat çalıştı',tr_gloss:'worked 10 hours',en_fragment:'ten hours straight',bridge_type:'direct',explanation:'"Straight" kesintisiz anlamı ekler'}],cultural_insight:'"Straight" burada kesintisiz anlamında; "ten hours straight" = ten straight hours.',fluency_tip:'"She worked twelve hours straight to meet the deadline."'},
{id:1064,category:'yorgunluk',tr:'Sabah kalktığında yorgun uyandı',tags:['sabah','kalk','yorgun','uyku','dinlen'],english_primary:"Woke up more tired than when they went to bed",alternatives:["Didn\'t get any restorative sleep","Slept but didn\'t rest"],register:'neutral',bridges:[{tr_fragment:'Sabah kalktığında',tr_gloss:'when they woke up in the morning',en_fragment:'woke up',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'yorgun uyandı',tr_gloss:'woke up tired',en_fragment:'more tired',bridge_type:'direct',explanation:'Yorgun uyanma; daha yorgun uyanma karşılığı'}],cultural_insight:'Dinlendirmeyen uyku; "unrestorative sleep" tıbbi terim.',fluency_tip:'"I slept nine hours but woke up even more tired."'},
{id:1065,category:'yorgunluk',tr:'Göz altı morlukları oluştu',tags:['göz altı','morluk','uykusuz','yorgun','iz'],english_primary:"Had dark circles under their eyes",alternatives:["Looked like they hadn\'t slept in days","Had raccoon eyes"],register:'informal',bridges:[{tr_fragment:'Göz altı morlukları',tr_gloss:'under-eye bruises/circles',en_fragment:'dark circles',bridge_type:'direct',explanation:'Doğrudan; morluk = circles'},{tr_fragment:'oluştu',tr_gloss:'formed/appeared',en_fragment:'had',bridge_type:'transform',explanation:'"Oluşmak" (form) → "had" (sahip olmak); oluşma vs. sahip olma'}],cultural_insight:'"Raccoon eyes" rakun gözleri; koyu halkaların rakuna benzetilmesi.',fluency_tip:'"The raccoon eyes gave away that he hadn\'t slept in two days."'},
{id:1066,category:'yorgunluk',tr:'Her gece geç saate kadar ayakta kaldı',tags:['gece','geç','ayakta kal','gece kuşu','uykusuz'],english_primary:"Burned the midnight oil every night",alternatives:["Was a chronic night owl","Stayed up past midnight regularly"],register:'neutral',bridges:[{tr_fragment:'Her gece',tr_gloss:'every night',en_fragment:'every night',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'geç saate kadar ayakta kaldı',tr_gloss:'stayed up until late',en_fragment:'burned the midnight oil',bridge_type:'transform',explanation:'Gece geç kalmak → gece yarısı yağ yakmak; gaz lambası döneminden idiom'}],cultural_insight:'"Burn the midnight oil" gaz lambası dönemine ait; gece geç çalışmak.',fluency_tip:'"She was burning the midnight oil every night to finish the thesis."'},
{id:1067,category:'yorgunluk',tr:'Haftalar geçince bitik düştü',tags:['hafta','geç','bitik','düş','uzun süre'],english_primary:"Was completely worn out after weeks of it",alternatives:["Was ground down over time","Eventually hit a wall"],register:'neutral',bridges:[{tr_fragment:'Haftalar geçince',tr_gloss:'as weeks passed',en_fragment:'after weeks of it',bridge_type:'direct',explanation:'Zaman ifadesi; doğrudan'},{tr_fragment:'bitik düştü',tr_gloss:'fell completely done',en_fragment:'worn out',bridge_type:'direct',explanation:'"Bitik" (done/finished) → "worn out" (eskimiş/yıpranmış)'}],cultural_insight:'"Worn out" aşınma metaforu; kumaşın ya da makinenin eskimesi gibi.',fluency_tip:'"After weeks of overtime, she was completely worn out."'},
{id:1068,category:'yorgunluk',tr:'Beyin kapandı',tags:['beyin','kapat','düşünemez','kilitlen','işlemez'],english_primary:"Their brain shut down",alternatives:["Went into mental lockdown","Could no longer process anything"],register:'informal',bridges:[{tr_fragment:'Beyin',tr_gloss:'brain',en_fragment:'brain',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kapandı',tr_gloss:'shut/closed',en_fragment:'shut down',bridge_type:'direct',explanation:'Kapanmak = shut down; bilgisayar metaforu'}],cultural_insight:'"Shut down" bilgisayar diliyle zihin yorgunluğunu anlatmak modern bir metafor.',fluency_tip:'"By 10 PM, my brain just shuts down — I can\'t do any more work."'},
{id:1069,category:'yorgunluk',tr:'Tatilde bile dinlenemedi',tags:['tatil','dinlen','durumu yok','sürekli gergin','stres'],english_primary:"Couldn\'t even relax on vacation",alternatives:["Was mentally switched on the whole trip","Took the stress with them"],register:'neutral',bridges:[{tr_fragment:'Tatilde bile',tr_gloss:'even on vacation',en_fragment:'even on vacation',bridge_type:'direct',explanation:'Doğrudan; "bile" = even'},{tr_fragment:'dinlenemedi',tr_gloss:'couldn\'t rest',en_fragment:'couldn\'t relax',bridge_type:'direct',explanation:'Dinlenememek = couldn\'t relax/rest'}],cultural_insight:'"Always-on culture" tatilde de çalışma baskısı; modern yorgunluğun semptomu.',fluency_tip:'"I was mentally switched on the whole vacation — couldn\'t unwind."'},
{id:1070,category:'yorgunluk',tr:'Sonu gelmeyen listeyle boğuştu',tags:['liste','boğuş','bitmez','sonu yok','iş yükü'],english_primary:"Was buried under a never-ending to-do list",alternatives:["Was drowning in tasks","Couldn\'t see the end of it"],register:'informal',bridges:[{tr_fragment:'Sonu gelmeyen',tr_gloss:'never-ending',en_fragment:'never-ending',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'listeyle boğuştu',tr_gloss:'wrestled with the list',en_fragment:'buried under',bridge_type:'transform',explanation:'"Boğuşmak" (wrestle) → "buried under" (altında gömülü); farklı fiziksel metafor'}],cultural_insight:'"Buried under" kazı metaforu; görevlerin üstüne yığılma.',fluency_tip:'"I\'m completely buried under a never-ending to-do list."'},
{id:1071,category:'yorgunluk',tr:'Halsizlik çekti',tags:['halsiz','çek','güçsüz','bitkin','mecalsiz'],english_primary:"Was overcome with weakness",alternatives:["Felt drained of all energy","Had no strength left"],register:'neutral',bridges:[{tr_fragment:'Halsizlik',tr_gloss:'weakness/feebleness',en_fragment:'weakness',bridge_type:'direct',explanation:'Halsizlik = weakness; doğrudan'},{tr_fragment:'çekti',tr_gloss:'suffered/endured',en_fragment:'overcome with',bridge_type:'transform',explanation:'"Çekmek" acı çekmek; "overcome" üstesinden gelinemeyen'}],cultural_insight:'"Halsizlik" hal+sızlık; halin/güçün yoksunluğu; Arapça kökenli.',fluency_tip:'"I was overcome with weakness after the fever broke."'},
{id:1072,category:'yorgunluk',tr:'Güne başlayacak enerji bulamadı',tags:['gün','başla','enerji','bul','sabah'],english_primary:"Couldn\'t muster the energy to start the day",alternatives:["Had no motivation to get going","Struggled to face the morning"],register:'neutral',bridges:[{tr_fragment:'Güne başlayacak',tr_gloss:'to start the day',en_fragment:'to start the day',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'enerji bulamadı',tr_gloss:'couldn\'t find the energy',en_fragment:'muster the energy',bridge_type:'transform',explanation:'"Bulmak" (find) → "muster" (bir araya toplamak); İngilizce askeri terim'}],cultural_insight:'"Muster" asker toplama; enerji toplamak için güç bir eylemmiş gibi.',fluency_tip:'"I couldn\'t muster the energy to even make breakfast."'},
{id:1073,category:'yorgunluk',tr:'Yatağa düştü hasta gibi',tags:['yatak','düş','hasta','yat','kapandı'],english_primary:"Took to their bed",alternatives:["Was flat out in bed","Crashed and couldn\'t get up"],register:'neutral',bridges:[{tr_fragment:'Yatağa düştü',tr_gloss:'fell into bed',en_fragment:'took to their bed',bridge_type:'transform',explanation:'"Yatağa düşmek" (fall into bed) → "take to bed" (yatağa çekilmek); eski İngilizce ifade'},{tr_fragment:'hasta gibi',tr_gloss:'like a sick person',en_fragment:'flat out',bridge_type:'transform',explanation:'"Hasta gibi" = gibi hastalık; "flat out" tamamen uzanmış/düz'}],cultural_insight:'"Take to bed" eski ve edebi; "flat out in bed" daha modern.',fluency_tip:'"After the race, she took to her bed for two full days."'},
{id:1074,category:'yorgunluk',tr:'Gündüz uykusu çekti',tags:['gündüz','uyku','şekerleme','kestir','dinlen'],english_primary:"Took a midday nap",alternatives:["Had a quick power nap","Stole a few hours of sleep"],register:'informal',bridges:[{tr_fragment:'Gündüz uykusu',tr_gloss:'daytime sleep',en_fragment:'midday nap',bridge_type:'direct',explanation:'Gündüz uykusu = nap; doğrudan'},{tr_fragment:'çekti',tr_gloss:'took/drew',en_fragment:'took',bridge_type:'direct',explanation:'Çekmek → take; doğrudan'}],cultural_insight:'"Power nap" kısa ama etkili uyku; İspanya\'da "siesta" kültürü yaygın.',fluency_tip:'"A 20-minute power nap can completely reset your energy."'},
{id:1075,category:'yorgunluk',tr:'Düşünmeden hareket etti',tags:['düşün','hareket','otomatik','robot','bilinçsiz'],english_primary:"Was running on autopilot",alternatives:["Was going through the motions","Functioned like a robot"],register:'informal',bridges:[{tr_fragment:'Düşünmeden',tr_gloss:'without thinking',en_fragment:'autopilot',bridge_type:'transform',explanation:'"Düşünmeden hareket" bilişsiz eylem; "autopilot" uçuş otomasyonu metaforu'},{tr_fragment:'hareket etti',tr_gloss:'moved/acted',en_fragment:'running on',bridge_type:'transform',explanation:'Hareket = action; running on = çalışmak üzerine'}],cultural_insight:'"Autopilot" uçak kültüründen günlük dile geçmiş; bilinçsiz işleyiş.',fluency_tip:'"I was just running on autopilot by Thursday."'},
{id:1076,category:'yorgunluk',tr:'Sabahı zor etti',tags:['sabah','zor','geçir','çek','güç'],english_primary:"Struggled to get through the morning",alternatives:["Barely made it to noon","The morning crawled by"],register:'informal',bridges:[{tr_fragment:'Sabahı',tr_gloss:'the morning',en_fragment:'morning',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'zor etti',tr_gloss:'made it through with difficulty',en_fragment:'struggled to get through',bridge_type:'direct',explanation:'Zor etmek = struggle; get through = geçmek'}],cultural_insight:'"Crawl by" zaman ağır ilerler; salyangoz gibi; beklemeyi yorgunlukla bağlar.',fluency_tip:'"The morning crawled by — I was so tired."'},
{id:1077,category:'yorgunluk',tr:'Masa başında uyuyakaldı',tags:['masa','uyuya kal','çalış','ofis','yorgun'],english_primary:"Fell asleep at their desk",alternatives:["Dozed off while working","Dropped off mid-task"],register:'informal',bridges:[{tr_fragment:'Masa başında',tr_gloss:'at the desk',en_fragment:'at their desk',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'uyuyakaldı',tr_gloss:'fell asleep',en_fragment:'fell asleep',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'Masada uyuya kalmak çalışma kültüründe hem yorgunluk hem bağlılık simgesi.',fluency_tip:'"He fell asleep at his desk during the night shift."'},
{id:1078,category:'yorgunluk',tr:'Araba kullanırken uyuklamak üzere oldu',tags:['araba','uyu','tehlike','direksiyon','gözler kapandı'],english_primary:"Was dozing off at the wheel",alternatives:["Was dangerously tired while driving","Kept nodding off while driving"],register:'neutral',bridges:[{tr_fragment:'Araba kullanırken',tr_gloss:'while driving',en_fragment:'at the wheel',bridge_type:'transform',explanation:'"Araba kullanmak" → "at the wheel" (direksiyonun başında); daha idiomatic'},{tr_fragment:'uyuklamak üzere oldu',tr_gloss:'was about to doze off',en_fragment:'dozing off',bridge_type:'direct',explanation:'Uyuklamak ≈ doze off; yakın anlam'}],cultural_insight:'"At the wheel" direksiyon metaforu; araç kontrolüyle özdeşleşmiş.',fluency_tip:'"Pull over if you\'re dozing off at the wheel — it\'s dangerous."'},
{id:1079,category:'yorgunluk',tr:'Hafta sonunu tamamen dinlenerek geçirdi',tags:['hafta sonu','dinlen','geçir','tam','iyi uyku'],english_primary:"Had a completely restful weekend",alternatives:["Fully recharged over the weekend","Did absolutely nothing and loved it"],register:'neutral',bridges:[{tr_fragment:'Tamamen',tr_gloss:'completely',en_fragment:'completely',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'dinlenerek geçirdi',tr_gloss:'spent resting',en_fragment:'restful',bridge_type:'direct',explanation:'Dinlenmek = rest; restful = dinlendirici; yakın'}],cultural_insight:'"Restful" dinlendirici; sıfat olarak İngilizcede yaygın; "restful sleep" gibi.',fluency_tip:'"I had a completely restful weekend — no plans, no screens."'},
{id:1080,category:'yorgunluk',tr:'Yoğun programdan nefesi kesildi',tags:['program','nefes','yoğun','kesil','tempo'],english_primary:"Was left breathless by the packed schedule",alternatives:["Was overwhelmed by the pace","Could barely keep up"],register:'neutral',bridges:[{tr_fragment:'Yoğun programdan',tr_gloss:'from the packed schedule',en_fragment:'packed schedule',bridge_type:'direct',explanation:'Yoğun program = packed schedule; doğrudan'},{tr_fragment:'nefesi kesildi',tr_gloss:'their breath was cut',en_fragment:'breathless',bridge_type:'direct',explanation:'Nefes kesilmek = breathless; doğrudan'}],cultural_insight:'"Breathless" harfiyen nefessiz; tempo yüzünden nefes alamama metaforu.',fluency_tip:'"The packed schedule left everyone breathless."'},
{id:1081,category:'yorgunluk',tr:'Dinlendirici bir uyku çekti',tags:['dinlendirici','uyku','çek','derin','iyi'],english_primary:"Had a deep and restful sleep",alternatives:["Slept like a log","Got the best sleep in months"],register:'neutral',bridges:[{tr_fragment:'Dinlendirici',tr_gloss:'restful/refreshing',en_fragment:'restful',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'bir uyku çekti',tr_gloss:'had a sleep',en_fragment:'had a sleep',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'"Sleep like a log" kütük gibi uyumak; hareketsiz ve derin uyku.',fluency_tip:'"I slept like a log — didn\'t move all night."'},
{id:1082,category:'yorgunluk',tr:'Hafızası geçici olarak durdu',tags:['hafıza','dur','geçici','boş','blok'],english_primary:"Had a temporary memory block",alternatives:["Drew a complete blank","Their memory froze"],register:'neutral',bridges:[{tr_fragment:'Hafızası',tr_gloss:'their memory',en_fragment:'memory',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'geçici olarak durdu',tr_gloss:'temporarily stopped',en_fragment:'block',bridge_type:'transform',explanation:'"Durmak" (stop) → "block" (engel); ikisi de işlev durdurma'}],cultural_insight:'"Draw a blank" çizim yapmak ama boş sayfa gelmek; zihin boşluğu.',fluency_tip:'"I drew a complete blank when asked my own phone number."'},
{id:1083,category:'yorgunluk',tr:'Ayaklarını yere zor bastı',tags:['ayak','yer','zor','bas','adım'],english_primary:"Could barely put one foot in front of the other",alternatives:["Was stumbling along","Was walking on leaden feet"],register:'neutral',bridges:[{tr_fragment:'Ayaklarını yere',tr_gloss:'feet to the ground',en_fragment:'foot in front of the other',bridge_type:'direct',explanation:'Ayak = foot; yere basmak = stepping'},{tr_fragment:'zor bastı',tr_gloss:'barely pressed',en_fragment:'barely',bridge_type:'direct',explanation:'Zor = barely; yoğunluk belirteci'}],cultural_insight:'"Leaden feet" kurşun ayaklar; ağırlık ve yavaşlık metaforu.',fluency_tip:'"By the end of the hike, I could barely put one foot in front of the other."'},
{id:1084,category:'yorgunluk',tr:'Bütün gün hiç oturmadı',tags:['gün','otur','ayakta','çalış','dinlen'],english_primary:"Was on their feet all day",alternatives:["Didn\'t get a moment to sit down","Was standing non-stop"],register:'neutral',bridges:[{tr_fragment:'Bütün gün',tr_gloss:'all day',en_fragment:'all day',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'hiç oturmadı',tr_gloss:'didn\'t sit at all',en_fragment:'on their feet',bridge_type:'transform',explanation:'"Oturmamak" (not sit) → "on feet" (ayaklarda olmak); ters tanım'}],cultural_insight:'"On your feet" ayakta olmak; fiziksel iş için sık kullanılan ifade.',fluency_tip:'"Nurses are on their feet all day — it\'s exhausting."'},
{id:1085,category:'yorgunluk',tr:'Uzun yolculuktan kasları tutuldu',tags:['yolculuk','kas','tutul','uçuş','araç'],english_primary:"Had stiff muscles after the long journey",alternatives:["Arrived stiff as a board","Needed to stretch after hours of travel"],register:'neutral',bridges:[{tr_fragment:'Uzun yolculuktan',tr_gloss:'from the long journey',en_fragment:'after the long journey',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kasları tutuldu',tr_gloss:'muscles seized up',en_fragment:'stiff muscles',bridge_type:'direct',explanation:'Kaslar tutulmak = muscles stiff/seize up; doğrudan'}],cultural_insight:'"Stiff as a board" tahta gibi katı; uzun yolculuk sonrası kas tutulması.',fluency_tip:'"I arrived stiff as a board after the twelve-hour flight."'},
{id:1086,category:'yorgunluk',tr:'Yorgunlukla gelen baş ağrısı sardı',tags:['yorgunluk','baş ağrısı','sar','migren','acı'],english_primary:"Was hit by a fatigue headache",alternatives:["Got a tension headache from exhaustion","The tiredness triggered a migraine"],register:'neutral',bridges:[{tr_fragment:'Yorgunlukla gelen',tr_gloss:'brought on by tiredness',en_fragment:'fatigue headache',bridge_type:'direct',explanation:'Doğrudan; yorgunluk = fatigue'},{tr_fragment:'sardı',tr_gloss:'wrapped around/hit',en_fragment:'was hit by',bridge_type:'transform',explanation:'"Sarmak" (wrap) → "hit by" (çarpmak); baş ağrısının sarması vs. çarpması'}],cultural_insight:'"Tension headache" stres kasılması baş ağrısı; yorgunlukla gelen çok yaygın.',fluency_tip:'"I always get a tension headache when I\'m overtired."'},
{id:1087,category:'yorgunluk',tr:'Kısa bir molada kendine geldi',tags:['mola','kendi','gel','toparlan','ferahla'],english_primary:"Recovered with a short break",alternatives:["The break did wonders","Bounced back after resting"],register:'neutral',bridges:[{tr_fragment:'Kısa bir molada',tr_gloss:'with a short break',en_fragment:'with a short break',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kendine geldi',tr_gloss:'came to themselves',en_fragment:'recovered',bridge_type:'transform',explanation:'"Kendine gelmek" kendine dönmek; "recovered" iyileşmek'}],cultural_insight:'"Do wonders" mucize yaratmak; bir şeyin beklenmedik kadar iyi işe yaraması.',fluency_tip:'"A short break did absolute wonders for my productivity."'},
{id:1088,category:'yorgunluk',tr:'Geç yatıp erken kalktı',tags:['geç','yat','erken','kalk','az uyu'],english_primary:"Burnt the candle at both ends",alternatives:["Lived on minimal sleep","Sacrificed sleep for work"],register:'informal',bridges:[{tr_fragment:'Geç yatıp erken kalktı',tr_gloss:'went to bed late and woke up early',en_fragment:'burnt the candle at both ends',bridge_type:'transform',explanation:'İki uçtan yakan mum = geç yatan erken kalkan kişi; tam karşılık'}],cultural_insight:'Mum her iki ucundan yanınca iki kez hızlı eriyip biter; ömür kısalır.',fluency_tip:'"You\'ve been burning the candle at both ends — something has to give."'},
{id:1089,category:'yorgunluk',tr:'Kapandı uyudu',tags:['kapat','uyu','gözler kapandı','derin uyku','geç'],english_primary:"Was out like a light",alternatives:["Dropped off the moment their head hit the pillow","Was fast asleep instantly"],register:'informal',bridges:[{tr_fragment:'Kapandı',tr_gloss:'closed/shut',en_fragment:'out',bridge_type:'transform',explanation:'"Kapanmak" (close/shut) → "out" (bilinçsiz); ışık gibi söndü'},{tr_fragment:'uyudu',tr_gloss:'slept',en_fragment:'like a light',bridge_type:'transform',explanation:'Uyumak; ışık gibi sönme metaforu'}],cultural_insight:'"Out like a light" ışık gibi anında sönmek; çok hızlı uyuya kalmak.',fluency_tip:'"She was out like a light the moment she lay down."'},
{id:1090,category:'yorgunluk',tr:'Yorgunluğunu yüzüne vurdu',tags:['yorgunluk','yüz','vur','belli','göster'],english_primary:"The tiredness showed on their face",alternatives:["Looked visibly exhausted","Wore their exhaustion on their face"],register:'neutral',bridges:[{tr_fragment:'Yorgunluğunu',tr_gloss:'their tiredness',en_fragment:'tiredness',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'yüzüne vurdu',tr_gloss:'hit/struck their face',en_fragment:'showed on their face',bridge_type:'transform',explanation:'"Vurdu" (strike/hit) → "showed" (gösterdi); fiziksel vurma → görünür olma'}],cultural_insight:'"Wear it on your face" bir şeyi yüzünde taşımak; yorgunluk maskesi.',fluency_tip:'"You can\'t hide it — the exhaustion is written all over your face."'},
{id:1091,category:'yorgunluk',tr:'Bedenini toparladı',tags:['beden','topla','iyileş','güçlen','toparlan'],english_primary:"Got their body back in shape",alternatives:["Physically recovered","Started feeling like themselves again"],register:'neutral',bridges:[{tr_fragment:'Bedenini',tr_gloss:'their body',en_fragment:'body',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'toparladı',tr_gloss:'pulled together/recovered',en_fragment:'back in shape',bridge_type:'transform',explanation:'"Toplamak" bir araya getirmek; "back in shape" şekle dönmek'}],cultural_insight:'"Back in shape" fiziksel form; hem kondisyon hem toparlanma için kullanılır.',fluency_tip:'"After the illness, it took weeks to get his body back in shape."'},,
/* ─── YOGUNLUK ─── */
{id:1092,category:'yogunluk',tr:'İşleri dağ gibi yığıldı',tags:['iş','dağ','yığıl','fazla','birik'],english_primary:"Was buried under a mountain of work",alternatives:["Had work piling up endlessly","Was swamped"],register:'informal',bridges:[{tr_fragment:'dağ gibi',tr_gloss:'like a mountain',en_fragment:'mountain of work',bridge_type:'direct',explanation:'İkisi de dağ metaforu'},{tr_fragment:'yığıldı',tr_gloss:'piled up',en_fragment:'buried under',bridge_type:'transform',explanation:'Yığılmak → gömülmek; baskı metaforu'}],cultural_insight:'"Buried under" kazı metaforu; işlerin üstünde gömülmek.',fluency_tip:'"I\'m absolutely swamped this week — can we reschedule?"'},
{id:1093,category:'yogunluk',tr:'Son teslim tarihi yaklaştı',tags:['son tarih','yaklaş','deadline','baskı','zaman'],english_primary:"The deadline was closing in",alternatives:["Was racing against the clock","The clock was ticking"],register:'neutral',bridges:[{tr_fragment:'Son teslim tarihi',tr_gloss:'final delivery date',en_fragment:'deadline',bridge_type:'direct',explanation:'Birebir aynı kavram'},{tr_fragment:'yaklaştı',tr_gloss:'approached/closed in',en_fragment:'closing in',bridge_type:'direct',explanation:'Yaklaşmak = close in; doğrudan'}],cultural_insight:'"Race against the clock" saat ile yarışmak; zamanla mücadele.',fluency_tip:'"The deadline is closing in — let\'s pick up the pace."'},
{id:1094,category:'yogunluk',tr:'Bütün gece ofiste kaldı',tags:['gece','ofis','kal','mesai','çalış'],english_primary:"Pulled an all-nighter at the office",alternatives:["Worked through the night","Camped at the office"],register:'informal',bridges:[{tr_fragment:'Bütün gece',tr_gloss:'all night',en_fragment:'all-nighter',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'ofiste kaldı',tr_gloss:'stayed at the office',en_fragment:'at the office',bridge_type:'direct',explanation:'Doğrudan yer belirteci'}],cultural_insight:'"Pull an all-nighter" tüm geceyi çekmek; amerikan kampüs kültüründen gelir.',fluency_tip:'"We pulled an all-nighter to finish the pitch deck."'},
{id:1095,category:'yogunluk',tr:'Toplantıdan toplantıya koştu',tags:['toplantı','koş','gün','doldu','program'],english_primary:"Rushed from meeting to meeting",alternatives:["Was double-booked all day","Had back-to-back meetings"],register:'neutral',bridges:[{tr_fragment:'Toplantıdan toplantıya',tr_gloss:'from meeting to meeting',en_fragment:'meeting to meeting',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'koştu',tr_gloss:'ran',en_fragment:'rushed',bridge_type:'direct',explanation:'Koşmak = rush; doğrudan'}],cultural_insight:'"Back-to-back" sırt sırta; aralıksız toplantı zinciri.',fluency_tip:'"I had back-to-back meetings from 9 AM to 5 PM — exhausting."'},
{id:1096,category:'yogunluk',tr:'Projeyi yetiştirmeye çalıştı',tags:['proje','yetiştir','çalış','zaman','deadline'],english_primary:"Was rushing to meet the project deadline",alternatives:["Was scrambling to finish","Was in a race to complete it"],register:'neutral',bridges:[{tr_fragment:'Projeyi yetiştirmeye',tr_gloss:'to deliver the project in time',en_fragment:'meet the deadline',bridge_type:'transform',explanation:'"Yetiştirmek" (deliver in time) → "meet the deadline"; kavram aynı, ifade farklı'},{tr_fragment:'çalıştı',tr_gloss:'tried/worked',en_fragment:'rushing',bridge_type:'transform',explanation:'Çalışmak → rushing; hız vurgusu'}],cultural_insight:'"Scramble" karışık/dağınık hızlı eylem; aceleyle tamamlamaya çalışmak.',fluency_tip:'"We were scrambling to finish before the client called."'},
{id:1097,category:'yogunluk',tr:'E-posta kutusunu boşaltamadı',tags:['eposta','kutu','boşalt','dolu','mesaj'],english_primary:"Couldn\'t get on top of their inbox",alternatives:["Was drowning in emails","Had hundreds of unread messages"],register:'informal',bridges:[{tr_fragment:'E-posta kutusunu',tr_gloss:'email inbox',en_fragment:'inbox',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'boşaltamadı',tr_gloss:'couldn\'t empty',en_fragment:'couldn\'t get on top of',bridge_type:'transform',explanation:'"Boşaltmak" (empty) → "get on top of" (üstüne çıkmak); hâkimiyet metaforu'}],cultural_insight:'"Inbox zero" boş gelen kutusu; modern çalışma kültürü hedefi.',fluency_tip:'"I\'m drowning in emails — there\'s no end in sight."'},
{id:1098,category:'yogunluk',tr:'İki işi aynı anda yürüttü',tags:['iki iş','aynı','yürüt','çoklu','paralel'],english_primary:"Juggled two jobs at once",alternatives:["Kept multiple plates spinning","Was multitasking constantly"],register:'neutral',bridges:[{tr_fragment:'İki işi aynı anda',tr_gloss:'two jobs at the same time',en_fragment:'at once',bridge_type:'direct',explanation:'Doğrudan zaman ifadesi'},{tr_fragment:'yürüttü',tr_gloss:'ran/managed',en_fragment:'juggled',bridge_type:'transform',explanation:'"Yürütmek" (run/manage) → "juggle" (hokkabazlık); İngilizce sirk metaforu'}],cultural_insight:'"Juggle" hokkabaz; birden fazla şeyi havada tutmak.',fluency_tip:'"She was juggling three clients at once — incredible focus."'},
{id:1099,category:'yogunluk',tr:'Hafta sonu da çalışmak zorunda kaldı',tags:['hafta sonu','çalış','zorunda','mesai','özgürlük'],english_primary:"Had to work through the weekend",alternatives:["Gave up the weekend for work","Sacrificed their days off"],register:'neutral',bridges:[{tr_fragment:'Hafta sonu da',tr_gloss:'even on the weekend',en_fragment:'through the weekend',bridge_type:'direct',explanation:'Doğrudan zaman belirteci'},{tr_fragment:'zorunda kaldı',tr_gloss:'was forced to',en_fragment:'had to',bridge_type:'direct',explanation:'Zorunda kalmak = had to; doğrudan'}],cultural_insight:'"Work-life balance" hafta sonu çalışmayla bozulur; kültürel geriliim.',fluency_tip:'"I had to work through the weekend — the deadline was Monday."'},
{id:1100,category:'yogunluk',tr:'Odaklanmakta güçlük çekti',tags:['odak','güçlük','dikkat','dağıl','konsantre'],english_primary:"Had trouble staying focused",alternatives:["Kept losing their train of thought","Struggled to concentrate"],register:'neutral',bridges:[{tr_fragment:'Odaklanmakta',tr_gloss:'in focusing',en_fragment:'focused',bridge_type:'direct',explanation:'Odak = focus; doğrudan'},{tr_fragment:'güçlük çekti',tr_gloss:'had difficulty',en_fragment:'had trouble staying',bridge_type:'direct',explanation:'"Güçlük çekmek" = have trouble; doğrudan'}],cultural_insight:'"Train of thought" düşüncenin treni; düşünce akışının kesilmesi.',fluency_tip:'"I keep losing my train of thought — too many distractions."'},
{id:1101,category:'yogunluk',tr:'Öncelikleri karıştı',tags:['öncelik','karış','bocaladı','sıra','düzen'],english_primary:"Lost track of their priorities",alternatives:["Got their priorities scrambled","Didn\'t know what to tackle first"],register:'neutral',bridges:[{tr_fragment:'Öncelikleri',tr_gloss:'their priorities',en_fragment:'priorities',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'karıştı',tr_gloss:'got mixed up',en_fragment:'lost track of',bridge_type:'transform',explanation:'"Karışmak" (mix) → "lost track" (iz kaybı); farklı metafor'}],cultural_insight:'"Lost track" iz kaybetmek; düzeni yitirmek.',fluency_tip:'"With so many tasks, I completely lost track of my priorities."'},
{id:1102,category:'yogunluk',tr:'Sorumluluğun altında ezildi',tags:['sorumluluk','ez','baskı','yük','ağır'],english_primary:"Was crushed under the weight of responsibility",alternatives:["Felt the burden was too much","Was overwhelmed by what was expected"],register:'neutral',bridges:[{tr_fragment:'Sorumluluğun altında',tr_gloss:'under responsibility',en_fragment:'under the weight of responsibility',bridge_type:'direct',explanation:'Doğrudan; altında = under'},{tr_fragment:'ezildi',tr_gloss:'was crushed',en_fragment:'was crushed',bridge_type:'direct',explanation:'Ezilmek = be crushed; doğrudan'}],cultural_insight:'"Weight of responsibility" sorumluluğun ağırlığı; fiziksel yük metaforu.',fluency_tip:'"The weight of responsibility was crushing him."'},
{id:1103,category:'yogunluk',tr:'Bütçeyi aştı',tags:['bütçe','aş','para','fazla','harca'],english_primary:"Went over budget",alternatives:["Blew the budget","Spent more than planned"],register:'neutral',bridges:[{tr_fragment:'Bütçeyi',tr_gloss:'the budget',en_fragment:'budget',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'aştı',tr_gloss:'exceeded/surpassed',en_fragment:'went over',bridge_type:'direct',explanation:'Aşmak = go over/exceed; doğrudan'}],cultural_insight:'"Blow the budget" bütçeyi patlatmak; aşırı harcama.',fluency_tip:'"We blew the budget in the first month of the project."'},
{id:1104,category:'yogunluk',tr:'Müşteriyle ciddi bir toplantı yaptı',tags:['müşteri','toplantı','ciddi','iş','sunum'],english_primary:"Had a high-stakes meeting with the client",alternatives:["Sat down for a serious client discussion","Was in a make-or-break meeting"],register:'formal',bridges:[{tr_fragment:'Ciddi bir toplantı',tr_gloss:'a serious meeting',en_fragment:'high-stakes meeting',bridge_type:'transform',explanation:'"Ciddi" (serious) → "high-stakes" (yüksek riskli); İngilizce daha spesifik'},{tr_fragment:'yaptı',tr_gloss:'did/held',en_fragment:'had',bridge_type:'direct',explanation:'Yapmak = have/hold; doğrudan'}],cultural_insight:'"High-stakes" bahis yüksek; kayıp veya kazancın büyük olduğu an.',fluency_tip:'"It was a make-or-break meeting for the whole deal."'},
{id:1105,category:'yogunluk',tr:'Fazla mesai yaptı',tags:['fazla mesai','yap','ekstra','zaman','çalış'],english_primary:"Did overtime",alternatives:["Put in extra hours","Clocked in extra time"],register:'neutral',bridges:[{tr_fragment:'Fazla mesai',tr_gloss:'extra working time',en_fragment:'overtime',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'yaptı',tr_gloss:'did',en_fragment:'did',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Overtime" zaman dışı; normal çalışma saatlerinin ötesine geçmek.',fluency_tip:'"I\'ve been doing overtime every day this week."'},
{id:1106,category:'yogunluk',tr:'Teslim tarihi kaçırdı',tags:['teslim','tarih','kaçır','gecik','deadline'],english_primary:"Missed the deadline",alternatives:["Didn\'t deliver on time","Fell behind schedule"],register:'neutral',bridges:[{tr_fragment:'Teslim tarihi',tr_gloss:'delivery date',en_fragment:'deadline',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kaçırdı',tr_gloss:'missed',en_fragment:'missed',bridge_type:'direct',explanation:'Kaçırmak = miss; doğrudan'}],cultural_insight:'"Deadline" ölüm çizgisi; geçilince "ölür" — sert bir metafor.',fluency_tip:'"We missed the deadline by two days — the client wasn\'t happy."'},
{id:1107,category:'yogunluk',tr:'Takvimi doldu taştı',tags:['takvim','dol','taş','program','randevu'],english_primary:"Had a packed schedule",alternatives:["Was booked solid","Had no free slots"],register:'neutral',bridges:[{tr_fragment:'Takvimi',tr_gloss:'their calendar',en_fragment:'schedule',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'doldu taştı',tr_gloss:'filled and overflowed',en_fragment:'packed',bridge_type:'transform',explanation:'"Dolup taşmak" (fill and overflow) → "packed" (sıkıştırılmış); her ikisi de dolu olma'}],cultural_insight:'"Booked solid" tamamen dolu; her randevunun birini tamamladığı.',fluency_tip:'"I\'m booked solid until Friday — can we do next week?"'},
{id:1108,category:'yogunluk',tr:'Kritik bir karar aldı',tags:['kritik','karar','al','önemli','belirleyici'],english_primary:"Made a pivotal decision",alternatives:["Took a critical call","Made a defining choice"],register:'formal',bridges:[{tr_fragment:'Kritik bir',tr_gloss:'critical/pivotal',en_fragment:'pivotal',bridge_type:'direct',explanation:'Doğrudan; kritik ≈ pivotal'},{tr_fragment:'karar aldı',tr_gloss:'took a decision',en_fragment:'made a decision',bridge_type:'direct',explanation:'Karar almak = make a decision; doğrudan'}],cultural_insight:'"Pivotal" menteşe noktası; dönüm noktası anlamı.',fluency_tip:'"That was a pivotal decision that changed everything."'},
{id:1109,category:'yogunluk',tr:'Stresle başa çıkmayı öğrendi',tags:['stres','başa çık','öğren','yönet','baş et'],english_primary:"Learned to manage stress",alternatives:["Found ways to cope","Got a handle on the pressure"],register:'neutral',bridges:[{tr_fragment:'Stresle başa çıkmayı',tr_gloss:'coping with stress',en_fragment:'manage stress',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'öğrendi',tr_gloss:'learned',en_fragment:'learned to',bridge_type:'direct',explanation:'Öğrenmek = learn; doğrudan'}],cultural_insight:'"Get a handle on" tutmak/kavramak; kontrolü ele almak.',fluency_tip:'"Over time, I\'ve learned to get a handle on work pressure."'},
{id:1110,category:'yogunluk',tr:'İşten eve geç geldi',tags:['işten','eve','geç','gel','mesai'],english_primary:"Got home late from work",alternatives:["Arrived home exhausted and behind schedule","Didn\'t make it home until late"],register:'neutral',bridges:[{tr_fragment:'İşten',tr_gloss:'from work',en_fragment:'from work',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'eve geç geldi',tr_gloss:'came home late',en_fragment:'got home late',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'İşten geç dönmek modern çalışma hayatının ortak deneyimi.',fluency_tip:'"I got home so late — dinner was cold."'},
{id:1111,category:'yogunluk',tr:'Acil durumla baş etmek zorunda kaldı',tags:['acil','baş et','zorunda','kriz','ani'],english_primary:"Had to deal with an emergency",alternatives:["Was thrown into crisis mode","Had to handle an urgent situation"],register:'neutral',bridges:[{tr_fragment:'Acil durumla',tr_gloss:'with an emergency',en_fragment:'emergency',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'baş etmek zorunda kaldı',tr_gloss:'was forced to cope',en_fragment:'had to deal with',bridge_type:'direct',explanation:'Baş etmek zorunda = had to deal; doğrudan'}],cultural_insight:'"Crisis mode" kriz modu; anında devreye giren acil tepki.',fluency_tip:'"We were thrown into crisis mode when the server went down."'},
{id:1112,category:'yogunluk',tr:'Her şeyi tek başına yaptı',tags:['tek başına','yap','her şey','yalnız','sorumluluk'],english_primary:"Did everything single-handedly",alternatives:["Handled it all on their own","Carried the whole weight alone"],register:'neutral',bridges:[{tr_fragment:'Her şeyi',tr_gloss:'everything',en_fragment:'everything',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'tek başına yaptı',tr_gloss:'did alone',en_fragment:'single-handedly',bridge_type:'direct',explanation:'Tek başına = single-handedly; doğrudan'}],cultural_insight:'"Single-handedly" tek elle; bir elin çok işi anlatması.',fluency_tip:'"She single-handedly saved the whole project."'},
{id:1113,category:'yogunluk',tr:'Ekibini motive etti',tags:['ekip','motive','et','ilham','lider'],english_primary:"Rallied the team",alternatives:["Pumped up the team","Fired everyone up"],register:'neutral',bridges:[{tr_fragment:'Ekibini',tr_gloss:'their team',en_fragment:'the team',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'motive etti',tr_gloss:'motivated',en_fragment:'rallied',bridge_type:'transform',explanation:'"Motive etmek" → "rally"; toplanıp güçlenme metaforu'}],cultural_insight:'"Rally" mitinge çağırmak; grubu bir araya getirip güçlendirmek.',fluency_tip:'"She really rallied the team when morale was low."'},
{id:1114,category:'yogunluk',tr:'Sabah 5\'te uyandı çalışmak için',tags:['sabah','erken','uyan','çalış','5'],english_primary:"Was up at 5 AM to get a head start",alternatives:["Beat the sun to work","Started the day before sunrise"],register:'informal',bridges:[{tr_fragment:'Sabah 5\'te uyandı',tr_gloss:'woke up at 5 AM',en_fragment:'up at 5 AM',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çalışmak için',tr_gloss:'in order to work',en_fragment:'to get a head start',bridge_type:'transform',explanation:'"Çalışmak için" → "head start"; erken başlama avantajı'}],cultural_insight:'"Head start" koşu başlangıcında öne geçmek; erken avantaj.',fluency_tip:'"I get up at 5 AM to get a head start before the house wakes up."'},
{id:1115,category:'yogunluk',tr:'Tüm hafta boyunca koşturdu',tags:['hafta','koştur','meşgul','yoğun','program'],english_primary:"Was on the run all week",alternatives:["Had a hectic week","Was non-stop all week"],register:'informal',bridges:[{tr_fragment:'Tüm hafta boyunca',tr_gloss:'throughout the entire week',en_fragment:'all week',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'koşturdu',tr_gloss:'ran around',en_fragment:'on the run',bridge_type:'direct',explanation:'Koşturmak = run around; on the run = koşar halde'}],cultural_insight:'"On the run" kaçarken değil, sürekli hareket halinde; koşuşturma.',fluency_tip:'"I was on the run all week — barely had time to eat."'},
{id:1116,category:'yogunluk',tr:'Toplantıyı erteledi',tags:['toplantı','ertele','değiştir','iptal','zaman'],english_primary:"Pushed back the meeting",alternatives:["Rescheduled the meeting","Moved the meeting to a later time"],register:'neutral',bridges:[{tr_fragment:'Toplantıyı',tr_gloss:'the meeting',en_fragment:'meeting',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'erteledi',tr_gloss:'postponed',en_fragment:'pushed back',bridge_type:'direct',explanation:'Ertelemek = push back; doğrudan'}],cultural_insight:'"Push back" bir şeyi geriye itmek; ertelemenin yön metaforu.',fluency_tip:'"Can we push back the meeting to Thursday?"'},
{id:1117,category:'yogunluk',tr:'Sonuca odaklandı',tags:['sonuç','odak','hedef','çalış','netice'],english_primary:"Kept their eyes on the prize",alternatives:["Stayed goal-oriented","Never lost sight of the objective"],register:'neutral',bridges:[{tr_fragment:'Sonuca',tr_gloss:'on the result',en_fragment:'prize',bridge_type:'transform',explanation:'"Sonuç" (result) → "prize" (ödül); hedefi ödül olarak çerçeveler'},{tr_fragment:'odaklandı',tr_gloss:'focused',en_fragment:'kept their eyes on',bridge_type:'transform',explanation:'Odaklanmak → gözlerini tutmak; görme metaforu'}],cultural_insight:'"Keep your eyes on the prize" yarış ödülüne bakmak; odak metaforu.',fluency_tip:'"Despite the setbacks, she kept her eyes on the prize."'},
{id:1118,category:'yogunluk',tr:'Plan değişikliğine adapte oldu',tags:['plan','değişiklik','adapte','uyum','esnek'],english_primary:"Adapted to the change of plans",alternatives:["Rolled with the punches","Pivoted seamlessly"],register:'neutral',bridges:[{tr_fragment:'Plan değişikliğine',tr_gloss:'to the change of plans',en_fragment:'change of plans',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'adapte oldu',tr_gloss:'adapted',en_fragment:'adapted',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Roll with the punches" yumrukları yuvarlanarak atlatmak; boks metaforu.',fluency_tip:'"The best teams can roll with the punches and adapt fast."'},
{id:1119,category:'yogunluk',tr:'Yeni bir strateji geliştirdi',tags:['strateji','geliştir','plan','yeni','yaklaşım'],english_primary:"Developed a new strategy",alternatives:["Came up with a fresh approach","Devised a new game plan"],register:'formal',bridges:[{tr_fragment:'Yeni bir strateji',tr_gloss:'a new strategy',en_fragment:'new strategy',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'geliştirdi',tr_gloss:'developed',en_fragment:'developed',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Game plan" spor kelimesi; stratejiyi oyun planına benzetmek.',fluency_tip:'"We need to devise a new game plan before the next quarter."'},
{id:1120,category:'yogunluk',tr:'Şirket içi çatışmayı çözdü',tags:['şirket','çatışma','çöz','uzlaş','arabulucu'],english_primary:"Resolved the internal conflict",alternatives:["Smoothed things over","Brokered a resolution"],register:'formal',bridges:[{tr_fragment:'Şirket içi',tr_gloss:'internal/within the company',en_fragment:'internal',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çatışmayı çözdü',tr_gloss:'resolved the conflict',en_fragment:'resolved the conflict',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'"Smooth things over" pürüzlü yüzeyi düzeltmek; çatışmayı gidermek.',fluency_tip:'"She managed to smooth things over between the two departments."'},
{id:1121,category:'yogunluk',tr:'İş yükünü paylaştı',tags:['iş yükü','paylaş','delege','dağıt','takım'],english_primary:"Shared the workload",alternatives:["Delegated tasks","Distributed the burden"],register:'neutral',bridges:[{tr_fragment:'İş yükünü',tr_gloss:'the workload',en_fragment:'workload',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'paylaştı',tr_gloss:'shared',en_fragment:'shared',bridge_type:'direct',explanation:'Paylaşmak = share; doğrudan'}],cultural_insight:'"Delegate" yetki devri; liderlerin öğrenmesi gereken beceri.',fluency_tip:'"A good manager knows when to delegate and share the workload."'},
{id:1122,category:'yogunluk',tr:'Sabah erken geldi ofise',tags:['sabah','erken','ofis','gel','başla'],english_primary:"Came in early to get ahead",alternatives:["Beat everyone to the office","Arrived before the rush"],register:'neutral',bridges:[{tr_fragment:'Sabah erken',tr_gloss:'early morning',en_fragment:'early',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'geldi ofise',tr_gloss:'came to the office',en_fragment:'came in',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Get ahead" ilerlemek; erken gelişin avantajı.',fluency_tip:'"I came in early to get ahead before the chaos starts."'},
{id:1123,category:'yogunluk',tr:'Müzakere masasına oturdu',tags:['müzakere','masa','otur','anlaş','görüş'],english_primary:"Sat down at the negotiating table",alternatives:["Entered into negotiations","Came to the table"],register:'formal',bridges:[{tr_fragment:'Müzakere masasına',tr_gloss:'to the negotiating table',en_fragment:'negotiating table',bridge_type:'direct',explanation:'Uluslararası kavram; doğrudan'},{tr_fragment:'oturdu',tr_gloss:'sat down',en_fragment:'sat down at',bridge_type:'direct',explanation:'Oturmak = sit down; doğrudan'}],cultural_insight:'"Come to the table" müzakereye gelmek; masanın tarafsız zemin anlamı.',fluency_tip:'"Both sides finally came to the table after months of tension."'},
{id:1124,category:'yogunluk',tr:'Hedefini tutturdu',tags:['hedef','tuttur','başar','ulaş','tamamla'],english_primary:"Hit their target",alternatives:["Nailed the goal","Delivered exactly what was expected"],register:'neutral',bridges:[{tr_fragment:'Hedefini',tr_gloss:'their target',en_fragment:'target',bridge_type:'direct',explanation:'Hedef = target; doğrudan'},{tr_fragment:'tutturdu',tr_gloss:'hit/caught',en_fragment:'hit',bridge_type:'direct',explanation:'Tutturmak = hit; doğrudan; okçuluk metaforu'}],cultural_insight:'"Hit the target" hedefi vurmak; okçuluk/ateşli silah metaforu.',fluency_tip:'"She hit every target this quarter — outstanding performance."'},
{id:1125,category:'yogunluk',tr:'Raporu son dakikada yetiştirdi',tags:['rapor','son dakika','yetiştir','baskı','zaman'],english_primary:"Got the report in at the last minute",alternatives:["Submitted it just under the wire","Delivered it in the nick of time"],register:'informal',bridges:[{tr_fragment:'Son dakikada',tr_gloss:'at the last minute',en_fragment:'last minute',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'yetiştirdi',tr_gloss:'delivered in time',en_fragment:'got...in',bridge_type:'transform',explanation:'"Yetiştirmek" (deliver in time) → "get in" (teslim etmek); İngilizce daha düz'}],cultural_insight:'"Under the wire" tel altından; son anda geçmek; yarış metaforu.',fluency_tip:'"I submitted it just under the wire — two minutes to spare."'},
{id:1126,category:'yogunluk',tr:'Bütçe kısıntısıyla çalıştı',tags:['bütçe','kısıntı','çalış','sınırlı','kaynak'],english_primary:"Worked with a tight budget",alternatives:["Made do with limited resources","Operated on a shoestring"],register:'neutral',bridges:[{tr_fragment:'Bütçe kısıntısıyla',tr_gloss:'with budget constraint',en_fragment:'tight budget',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çalıştı',tr_gloss:'worked',en_fragment:'worked with',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"On a shoestring" ayakkabı bağı bütçesi; çok kısıtlı para ile iş yapma.',fluency_tip:'"We built the whole campaign on a shoestring budget."'},
{id:1127,category:'yogunluk',tr:'Kendi işini kurdu',tags:['iş','kur','girişim','bağımsız','kendi'],english_primary:"Started their own business",alternatives:["Went out on their own","Set up their own venture"],register:'neutral',bridges:[{tr_fragment:'Kendi işini',tr_gloss:'their own business',en_fragment:'own business',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kurdu',tr_gloss:'set up/established',en_fragment:'started',bridge_type:'direct',explanation:'Kurmak = start/set up; doğrudan'}],cultural_insight:'"Go out on your own" bağımsız olmak; risk alarak ayrılmak.',fluency_tip:'"After ten years in the corporate world, she went out on her own."'},
{id:1128,category:'yogunluk',tr:'Kritik sunumu başarıyla tamamladı',tags:['sunum','başarı','tamamla','kritik','şirket'],english_primary:"Nailed the crucial presentation",alternatives:["Delivered a knockout presentation","Knocked it out of the park"],register:'informal',bridges:[{tr_fragment:'Kritik sunumu',tr_gloss:'the crucial presentation',en_fragment:'crucial presentation',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'başarıyla tamamladı',tr_gloss:'successfully completed',en_fragment:'nailed',bridge_type:'transform',explanation:'"Başarıyla tamamlamak" → "nail" (çivi çakmak); kesin isabet metaforu'}],cultural_insight:'"Nail it" çiviyi tam çakmak; mükemmel yapmak.',fluency_tip:'"She absolutely nailed the presentation — the investors were impressed."'},
{id:1129,category:'yogunluk',tr:'Projeyi zamanında teslim etti',tags:['proje','zamanında','teslim','et','başar'],english_primary:"Delivered the project on time",alternatives:["Met the deadline","Came through on schedule"],register:'neutral',bridges:[{tr_fragment:'Zamanında',tr_gloss:'on time',en_fragment:'on time',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'teslim etti',tr_gloss:'delivered',en_fragment:'delivered',bridge_type:'direct',explanation:'Teslim etmek = deliver; doğrudan'}],cultural_insight:'"Come through" vadini yerine getirmek; güvenilirlik.',fluency_tip:'"Despite the challenges, the team came through on schedule."'},
{id:1130,category:'yogunluk',tr:'Gereksiz işleri kesti',tags:['gereksiz','kes','sadeleş','verimli','temizle'],english_primary:"Cut out the unnecessary work",alternatives:["Streamlined the process","Eliminated the fluff"],register:'neutral',bridges:[{tr_fragment:'Gereksiz işleri',tr_gloss:'unnecessary tasks',en_fragment:'unnecessary work',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kesti',tr_gloss:'cut',en_fragment:'cut out',bridge_type:'direct',explanation:'Kesmek = cut out; doğrudan'}],cultural_insight:'"Streamline" aerodinamik yapmak; süreçleri sadeleştirmek.',fluency_tip:'"We streamlined the whole process and saved hours each week."'},
{id:1131,category:'yogunluk',tr:'Ekip ruhu çöktü',tags:['ekip','ruh','çök','moral','motivasyon'],english_primary:"Team morale hit rock bottom",alternatives:["The team spirit collapsed","Everyone was demoralised"],register:'neutral',bridges:[{tr_fragment:'Ekip ruhu',tr_gloss:'team spirit',en_fragment:'team morale',bridge_type:'direct',explanation:'Doğrudan; ruh = morale/spirit'},{tr_fragment:'çöktü',tr_gloss:'collapsed',en_fragment:'hit rock bottom',bridge_type:'transform',explanation:'"Çökmek" (collapse) → "hit rock bottom" (en dibe çarpmak)'}],cultural_insight:'"Rock bottom" kayalık taban; düşülebilecek en derin yer.',fluency_tip:'"Morale hit rock bottom after the layoffs."'},
{id:1132,category:'yogunluk',tr:'Müşteriyi memnun etti',tags:['müşteri','memnun','et','başar','hizmet'],english_primary:"Kept the client happy",alternatives:["Delivered beyond expectations","Satisfied the customer completely"],register:'neutral',bridges:[{tr_fragment:'Müşteriyi',tr_gloss:'the client',en_fragment:'client',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'memnun etti',tr_gloss:'pleased',en_fragment:'kept...happy',bridge_type:'transform',explanation:'"Memnun etmek" (please) → "keep happy" (mutlu tutmak); süreklilik vurgusu'}],cultural_insight:'"Deliver beyond expectations" beklentilerin ötesine geçmek; müşteri memnuniyeti.',fluency_tip:'"Great service means consistently keeping the client happy."'},
{id:1133,category:'yogunluk',tr:'Kendini kanıtladı',tags:['kanıtla','kendin','ispat','değer','göster'],english_primary:"Proved themselves",alternatives:["Showed what they were made of","Earned their place"],register:'neutral',bridges:[{tr_fragment:'Kendini',tr_gloss:'themselves',en_fragment:'themselves',bridge_type:'direct',explanation:'Refleksif yapı aynı'},{tr_fragment:'kanıtladı',tr_gloss:'proved',en_fragment:'proved',bridge_type:'direct',explanation:'Kanıtlamak = prove; doğrudan'}],cultural_insight:'"Show what you\'re made of" neden yapıldığını göstermek; öz anlatımı.',fluency_tip:'"This was her chance to show what she was made of."'},
{id:1134,category:'yogunluk',tr:'Risk aldı ve kazandı',tags:['risk','al','kazan','cesur','girişim'],english_primary:"Took a risk and it paid off",alternatives:["Gambled and won","Bet on themselves and came out ahead"],register:'neutral',bridges:[{tr_fragment:'Risk aldı',tr_gloss:'took a risk',en_fragment:'took a risk',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kazandı',tr_gloss:'won',en_fragment:'paid off',bridge_type:'transform',explanation:'"Kazanmak" (win) → "pay off" (meyvesini vermek); kazanım farklı metaforla'}],cultural_insight:'"Pay off" borcu ödemek → yatırımın karşılığını vermek; ekonomi metaforu.',fluency_tip:'"She took a huge risk leaving her job, and it really paid off."'},
{id:1135,category:'yogunluk',tr:'Gece yarısına kadar çalıştı',tags:['gece yarısı','çalış','geç','saate kadar','mesai'],english_primary:"Worked until midnight",alternatives:["Was up working past midnight","Kept at it until the small hours"],register:'neutral',bridges:[{tr_fragment:'Gece yarısına kadar',tr_gloss:'until midnight',en_fragment:'until midnight',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çalıştı',tr_gloss:'worked',en_fragment:'worked',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Small hours" gece yarısından sonra saat 1-4 arası; saat küçük çünkü gece.',fluency_tip:'"He was still at it until the small hours of the morning."'},
{id:1136,category:'yogunluk',tr:'Başarılı bir çıkış yaptı',tags:['çıkış','başarı','etkileyici','son','kapan'],english_primary:"Went out on a high note",alternatives:["Finished strong","Left on a positive note"],register:'neutral',bridges:[{tr_fragment:'Başarılı bir',tr_gloss:'a successful',en_fragment:'high note',bridge_type:'transform',explanation:'"Başarılı" (successful) → "high note" (yüksek nota); müzik metaforu'},{tr_fragment:'çıkış yaptı',tr_gloss:'made an exit',en_fragment:'went out on',bridge_type:'direct',explanation:'Çıkış yapmak = go out; doğrudan'}],cultural_insight:'"High note" müziğin zirvesi; güçlü ve olumlu bir bitiş.',fluency_tip:'"She retired by going out on a real high note."'},
{id:1137,category:'yogunluk',tr:'Dolu dolu bir gün geçirdi',tags:['dolu','gün','geçir','verimli','yoğun'],english_primary:"Had a packed and productive day",alternatives:["Made the most of every hour","Had a full-on day"],register:'informal',bridges:[{tr_fragment:'Dolu dolu',tr_gloss:'full-full / jam-packed',en_fragment:'packed',bridge_type:'direct',explanation:'Dolu dolu = packed; tekrarlı yapı yoğunluğu artırır'},{tr_fragment:'bir gün geçirdi',tr_gloss:'spent a day',en_fragment:'day',bridge_type:'direct',explanation:'Gün geçirmek = spend a day; doğrudan'}],cultural_insight:'"Full-on" tamamen dolu; hem yoğunluk hem tempo.',fluency_tip:'"It was a full-on day — but I got so much done."'},
{id:1138,category:'yogunluk',tr:'Süreçleri optimize etti',tags:['süreç','optimize','geliştir','verimli','iyileştir'],english_primary:"Optimised the processes",alternatives:["Fine-tuned the workflow","Streamlined operations"],register:'formal',bridges:[{tr_fragment:'Süreçleri',tr_gloss:'the processes',en_fragment:'processes',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'optimize etti',tr_gloss:'optimised',en_fragment:'optimised',bridge_type:'direct',explanation:'Uluslararası kelime; doğrudan'}],cultural_insight:'"Fine-tune" ince ayar; müzik enstrümanını akort etmek gibi süreç geliştirme.',fluency_tip:'"We fine-tuned the workflow and cut processing time in half."'},
{id:1139,category:'yogunluk',tr:'İş arkadaşından destek aldı',tags:['iş arkadaşı','destek','al','yardım','iş birliği'],english_primary:"Got support from a colleague",alternatives:["Had a colleague back them up","Wasn\'t alone in facing the challenge"],register:'neutral',bridges:[{tr_fragment:'İş arkadaşından',tr_gloss:'from a colleague',en_fragment:'from a colleague',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'destek aldı',tr_gloss:'received support',en_fragment:'got support',bridge_type:'direct',explanation:'Destek almak = get support; doğrudan'}],cultural_insight:'"Back them up" arkasını kollamak; destek ve güvence.',fluency_tip:'"It really helped having a colleague back me up in that meeting."'},
{id:1140,category:'yogunluk',tr:'Kendini işe verdi',tags:['iş','ver','kendini','adanmış','tutkulu'],english_primary:"Threw themselves into the work",alternatives:["Was completely dedicated","Gave it everything they had"],register:'neutral',bridges:[{tr_fragment:'Kendini',tr_gloss:'themselves',en_fragment:'themselves',bridge_type:'direct',explanation:'Refleksif yapı'},{tr_fragment:'işe verdi',tr_gloss:'gave to the work',en_fragment:'threw...into the work',bridge_type:'transform',explanation:'"Vermek" (give) → "throw into" (içine atmak); İngilizce daha dinamik'}],cultural_insight:'"Throw yourself into" işe kendini atmak; tam bağlılık.',fluency_tip:'"He threw himself into the new role and thrived."'},
{id:1141,category:'yogunluk',tr:'Aksilik üstüne aksilik geldi',tags:['aksilik','üstüne','gel','şanssız','engel'],english_primary:"Hit one setback after another",alternatives:["Was plagued by bad luck","Nothing seemed to go right"],register:'neutral',bridges:[{tr_fragment:'Aksilik üstüne aksilik',tr_gloss:'setback upon setback',en_fragment:'one setback after another',bridge_type:'direct',explanation:'Doğrudan; üstüne = upon/after'},{tr_fragment:'geldi',tr_gloss:'came',en_fragment:'hit',bridge_type:'transform',explanation:'"Gelmek" (come) → "hit" (çarpmak); İngilizce daha aktif ve şiddetli'}],cultural_insight:'"Plagued by" vebayla vurulmak; sürekli şanssızlığın salgın gibi gelmesi.',fluency_tip:'"We were hit by one setback after another — felt like a curse."'},
{id:1142,category:'yogunluk',tr:'Rekabetin üstesinden geldi',tags:['rekabet','üstesinden','gel','kazan','aş'],english_primary:"Came out on top of the competition",alternatives:["Beat the competition","Rose above the rivals"],register:'neutral',bridges:[{tr_fragment:'Rekabetin',tr_gloss:'the competition',en_fragment:'competition',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'üstesinden geldi',tr_gloss:'came on top of',en_fragment:'came out on top',bridge_type:'direct',explanation:'"Üstesinden gelmek" ve "come out on top" birebir aynı metafor!'}],cultural_insight:'"üstesinden gelmek" ve "come out on top" her iki dil üst/zirve metaforu kullanır.',fluency_tip:'"Despite everything, they came out on top of the competition."'},
{id:1143,category:'yogunluk',tr:'Masanın altında kalan işi tamamladı',tags:['masa','altı','kal','iş','geciktir'],english_primary:"Finished the backlog",alternatives:["Cleared the pile of outstanding tasks","Caught up on everything pending"],register:'neutral',bridges:[{tr_fragment:'Masanın altında kalan iş',tr_gloss:'work left under the table',en_fragment:'backlog',bridge_type:'transform',explanation:'Türkçe "masa altı" deyimi; İngilizce "backlog" birikmiş iş listesi'},{tr_fragment:'tamamladı',tr_gloss:'completed',en_fragment:'finished',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Backlog" birikim; oyunculukta sırayı bekleyen işler.',fluency_tip:'"It took two days but I finally cleared the backlog."'},
{id:1144,category:'yogunluk',tr:'İş değiştirdi',tags:['iş','değiştir','yeni','kariyer','ayrıl'],english_primary:"Made a career move",alternatives:["Changed jobs","Jumped ship"],register:'neutral',bridges:[{tr_fragment:'İş değiştirdi',tr_gloss:'changed jobs',en_fragment:'made a career move',bridge_type:'transform',explanation:'"İş değiştirmek" → "career move" (kariyer hamlesi); İngilizce daha stratejik çerçeveler'}],cultural_insight:'"Jump ship" batmadan önce gemiyi terk etmek; işten ayrılma metaforu.',fluency_tip:'"After five years, she decided to jump ship and start fresh."'},
{id:1145,category:'yogunluk',tr:'Büyük bir anlaşma imzaladı',tags:['anlaşma','imzala','büyük','iş','sözleşme'],english_primary:"Signed a major deal",alternatives:["Closed a big contract","Sealed the deal"],register:'formal',bridges:[{tr_fragment:'Büyük bir anlaşma',tr_gloss:'a major deal',en_fragment:'major deal',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'imzaladı',tr_gloss:'signed',en_fragment:'signed / sealed',bridge_type:'direct',explanation:'İmzalamak = sign; "seal" da aynı metafor; mühürleme'}],cultural_insight:'"Seal the deal" anlaşmayı mühürlemek; anlaşmanın kesinleşmesi.',fluency_tip:'"The handshake sealed the deal — they were officially partners."'},
{id:1146,category:'yogunluk',tr:'Kariyerinde zirveye ulaştı',tags:['kariyer','zirve','ulaş','başarı','üst'],english_primary:"Reached the peak of their career",alternatives:["Hit the pinnacle","Was at the top of their game professionally"],register:'neutral',bridges:[{tr_fragment:'Kariyerinde zirveye',tr_gloss:'to the peak of their career',en_fragment:'peak of their career',bridge_type:'direct',explanation:'Doğrudan; zirve = peak'},{tr_fragment:'ulaştı',tr_gloss:'reached',en_fragment:'reached',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Pinnacle" doruk noktası; dağın en yüksek ucu.',fluency_tip:'"At 45, she reached the absolute pinnacle of her career."'},
{id:1147,category:'yogunluk',tr:'Görev dağılımı belirsizdi',tags:['görev','dağılım','belirsiz','karışık','kim ne'],english_primary:"Roles and responsibilities were unclear",alternatives:["No one knew who was doing what","There was a lack of clarity"],register:'formal',bridges:[{tr_fragment:'Görev dağılımı',tr_gloss:'task distribution',en_fragment:'roles and responsibilities',bridge_type:'direct',explanation:'Doğrudan; görev = role'},{tr_fragment:'belirsizdi',tr_gloss:'was unclear',en_fragment:'were unclear',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Clarity" netlik; modern iş yerinde en değerli kaynaklardan biri.',fluency_tip:'"We need clarity on who owns what — the confusion is killing productivity."'},
{id:1148,category:'yogunluk',tr:'Çalışma ortamı iyiydi',tags:['çalışma','ortam','iyi','pozitif','ekip'],english_primary:"Had a great working environment",alternatives:["Worked in a positive atmosphere","The team culture was excellent"],register:'neutral',bridges:[{tr_fragment:'Çalışma ortamı',tr_gloss:'working environment',en_fragment:'working environment',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'iyiydi',tr_gloss:'was good',en_fragment:'great',bridge_type:'direct',explanation:'İyi = good/great; derece farkı'}],cultural_insight:'"Work culture" çalışma kültürü; şirketin değerlerini yansıtan ortam.',fluency_tip:'"The work culture here is incredible — people actually support each other."'},
{id:1149,category:'yogunluk',tr:'Girişim sermayesi buldu',tags:['girişim','sermaye','yatırım','para','fon'],english_primary:"Secured venture capital funding",alternatives:["Found investors","Got the funding they needed"],register:'formal',bridges:[{tr_fragment:'Girişim sermayesi',tr_gloss:'venture capital',en_fragment:'venture capital',bridge_type:'direct',explanation:'Uluslararası kavram; doğrudan'},{tr_fragment:'buldu',tr_gloss:'found',en_fragment:'secured',bridge_type:'transform',explanation:'"Bulmak" (find) → "secure" (güvence altına almak); İngilizce daha resmî'}],cultural_insight:'"Secure funding" fonlamayı güvence altına almak; girişim dünyasında kritik.',fluency_tip:'"After six months of pitching, she finally secured venture capital."'},
{id:1150,category:'yogunluk',tr:'Çözüm yolu aradı',tags:['çözüm','yol','ara','problem','alternatif'],english_primary:"Looked for a way forward",alternatives:["Searched for a solution","Tried to find a workaround"],register:'neutral',bridges:[{tr_fragment:'Çözüm yolu',tr_gloss:'solution path/way',en_fragment:'way forward',bridge_type:'direct',explanation:'Doğrudan; yol = way'},{tr_fragment:'aradı',tr_gloss:'searched for',en_fragment:'looked for',bridge_type:'direct',explanation:'Aramak = look for; doğrudan'}],cultural_insight:'"Way forward" ileriye giden yol; impasse\'dan çıkış.',fluency_tip:'"Let\'s focus on finding a way forward instead of dwelling on the problem."'},
{id:1151,category:'yogunluk',tr:'Tempoyu yüksek tuttu',tags:['tempo','yüksek','tut','sürdür','hız'],english_primary:"Kept up the pace",alternatives:["Maintained the momentum","Never let the tempo drop"],register:'neutral',bridges:[{tr_fragment:'Tempoyu',tr_gloss:'the pace/tempo',en_fragment:'pace',bridge_type:'direct',explanation:'Doğrudan; tempo = pace'},{tr_fragment:'yüksek tuttu',tr_gloss:'kept high',en_fragment:'kept up',bridge_type:'transform',explanation:'"Yüksek tutmak" (keep high) → "keep up" (sürdürmek); farklı yön ama aynı anlam'}],cultural_insight:'"Momentum" ivme; bir kez yakalayan hız; fizikten iş diline geçmiş.',fluency_tip:'"We need to maintain momentum — don\'t slow down now."'},
{id:1152,category:'yogunluk',tr:'Verimliliği artırdı',tags:['verimlilik','artır','daha fazla','üret','gelişim'],english_primary:"Boosted productivity",alternatives:["Increased output","Made significant efficiency gains"],register:'formal',bridges:[{tr_fragment:'Verimliliği',tr_gloss:'productivity',en_fragment:'productivity',bridge_type:'direct',explanation:'Doğrudan; uluslararası kelime'},{tr_fragment:'artırdı',tr_gloss:'increased/boosted',en_fragment:'boosted',bridge_type:'direct',explanation:'Artırmak = boost/increase; doğrudan'}],cultural_insight:'"Boost" itici güç; bir şeyi yukarı fırlatmak.',fluency_tip:'"The new tools boosted our productivity by 30%."'},
{id:1153,category:'yogunluk',tr:'Uygulamayı piyasaya sürdü',tags:['uygulama','piyasa','sür','launch','yeni'],english_primary:"Launched the app",alternatives:["Released the product","Went live with the application"],register:'neutral',bridges:[{tr_fragment:'Uygulamayı',tr_gloss:'the application',en_fragment:'app',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'piyasaya sürdü',tr_gloss:'released to market',en_fragment:'launched',bridge_type:'direct',explanation:'"Piyasaya sürmek" = launch; doğrudan'}],cultural_insight:'"Launch" uzay fırlatması metaforu; ürünü rokete benzetmek.',fluency_tip:'"We launched the app and got a thousand downloads in the first hour."'},
{id:1154,category:'yogunluk',tr:'Maaş zammı istedi',tags:['maaş','zam','iste','arttır','terfi'],english_primary:"Asked for a raise",alternatives:["Negotiated a pay increase","Made a case for higher compensation"],register:'neutral',bridges:[{tr_fragment:'Maaş zammı',tr_gloss:'salary raise',en_fragment:'raise',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'istedi',tr_gloss:'asked for',en_fragment:'asked for',bridge_type:'direct',explanation:'İstemek = ask for; doğrudan'}],cultural_insight:'"Make a case" bir dava açmak; ikna edici argüman sunmak.',fluency_tip:'"She made a compelling case for a raise — and got it."'},
{id:1155,category:'yogunluk',tr:'Gece vardiyasında çalıştı',tags:['gece','vardiya','çalış','gece nöbeti','geç'],english_primary:"Worked the night shift",alternatives:["Did a graveyard shift","Worked through the night"],register:'neutral',bridges:[{tr_fragment:'Gece vardiyası',tr_gloss:'night shift',en_fragment:'night shift',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çalıştı',tr_gloss:'worked',en_fragment:'worked',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Graveyard shift" mezarlık vardiyası; gece yarısından sonra çalışmak.',fluency_tip:'"The graveyard shift wrecks your sleep schedule."'},
{id:1156,category:'yogunluk',tr:'Ciddi bir hata yaptı',tags:['hata','ciddi','yap','kapat','fark'],english_primary:"Made a costly mistake",alternatives:["Dropped the ball badly","Got it seriously wrong"],register:'neutral',bridges:[{tr_fragment:'Ciddi bir hata',tr_gloss:'a serious mistake',en_fragment:'costly mistake',bridge_type:'transform',explanation:'"Ciddi" (serious) → "costly" (maliyetli); İngilizce sonuçlarıyla değerlendirir'},{tr_fragment:'yaptı',tr_gloss:'made',en_fragment:'made',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Drop the ball" topu düşürmek; beklenen görevi yapmamak.',fluency_tip:'"He really dropped the ball on that account — it cost us the client."'},
/* ─── SOSYAL ─── */
{id:1157,category:'sosyal',tr:'Yabancıyla kolayca kaynaştı',tags:['yabancı','kaynaş','sosyal','tanış','uyum'],english_primary:"Clicked with strangers instantly",alternatives:["Made friends effortlessly","Was a natural at meeting new people"],register:'informal',bridges:[{tr_fragment:'Yabancıyla',tr_gloss:'with strangers',en_fragment:'with strangers',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kolayca kaynaştı',tr_gloss:'blended in easily',en_fragment:'clicked...instantly',bridge_type:'transform',explanation:'"Kaynaşmak" (merge/blend) → "click" (tıklamak); anında bağ kurma sesi'}],cultural_insight:'"Click" anında uyum; düğmeye basmak gibi bağ kurulması.',fluency_tip:'"We clicked immediately — it felt like we\'d known each other for years."'},
{id:1158,category:'sosyal',tr:'Topluluk önünde konuşmaktan çekindi',tags:['topluluk','konuş','çekin','utangaç','sahne'],english_primary:"Was nervous about speaking in public",alternatives:["Got stage fright","Froze up in front of the crowd"],register:'neutral',bridges:[{tr_fragment:'Topluluk önünde',tr_gloss:'in front of the crowd',en_fragment:'in public',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çekindi',tr_gloss:'shied away',en_fragment:'nervous about',bridge_type:'transform',explanation:'"Çekinmek" (shy away) → "nervous about"; korkuya yakın ama farklı ifade'}],cultural_insight:'"Stage fright" sahne korkusu; performans kaygısı.',fluency_tip:'"She got stage fright even at small meetings — needed coaching."'},
{id:1159,category:'sosyal',tr:'Arkadaşları için orada oldu',tags:['arkadaş','orda ol','destek','yanında','güvenilir'],english_primary:"Was there for their friends",alternatives:["Had their friends\' backs","Showed up when it mattered"],register:'neutral',bridges:[{tr_fragment:'Arkadaşları için',tr_gloss:'for their friends',en_fragment:'for their friends',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'orada oldu',tr_gloss:'was there',en_fragment:'was there',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'"Show up" göründüğünde olmak; fiziksel ve duygusal varlık.',fluency_tip:'"Real friends show up when it matters most."'},
{id:1160,category:'sosyal',tr:'Kavga edip barıştılar',tags:['kavga','barış','uzlaş','küs','arkadaş'],english_primary:"Had a fight and made up",alternatives:["Patched things up","Buried the hatchet"],register:'informal',bridges:[{tr_fragment:'Kavga edip',tr_gloss:'having fought',en_fragment:'had a fight',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'barıştılar',tr_gloss:'made peace',en_fragment:'made up',bridge_type:'direct',explanation:'"Barışmak" (make peace) → "make up" (telafi etmek/barışmak); doğrudan'}],cultural_insight:'"Bury the hatchet" baltayı gömmek; barışın kalıcı olması.',fluency_tip:'"They finally buried the hatchet after two months of silence."'},
{id:1161,category:'sosyal',tr:'Sözünü tuttu',tags:['söz','tut','vaat','güven','dürüst'],english_primary:"Kept their word",alternatives:["Was true to their promise","Followed through"],register:'neutral',bridges:[{tr_fragment:'Sözünü',tr_gloss:'their word/promise',en_fragment:'word',bridge_type:'direct',explanation:'Söz = word; doğrudan'},{tr_fragment:'tuttu',tr_gloss:'kept/held',en_fragment:'kept',bridge_type:'direct',explanation:'Tutmak = keep; doğrudan'}],cultural_insight:'"Keep your word" sözünü tutmak; güvenilirliğin temel taşı.',fluency_tip:'"He always keeps his word — that\'s why everyone trusts him."'},
{id:1162,category:'sosyal',tr:'Dedikodu yaptı',tags:['dedikodu','yap','arkasından','konuş','gossip'],english_primary:"Was gossiping behind people\'s backs",alternatives:["Was spreading rumours","Was dishing the dirt"],register:'informal',bridges:[{tr_fragment:'Dedikodu',tr_gloss:'gossip',en_fragment:'gossiping',bridge_type:'direct',explanation:'Doğrudan; Türkçe Arapça kökenli'},{tr_fragment:'yaptı',tr_gloss:'did',en_fragment:'was',bridge_type:'transform',explanation:'Yapmak → was (doing); süreklilik vurgusu'}],cultural_insight:'"Dish the dirt" kirliliği servis etmek; dedikodunun kirletme metaforu.',fluency_tip:'"She was dishing the dirt about everyone at the office party."'},
{id:1163,category:'sosyal',tr:'Birinin sözünü kesti',tags:['söz','kes','atla','konuş','saygısız'],english_primary:"Cut someone off mid-sentence",alternatives:["Interrupted rudely","Talked over them"],register:'informal',bridges:[{tr_fragment:'Sözünü',tr_gloss:'their speech/words',en_fragment:'sentence',bridge_type:'direct',explanation:'Söz = speech; doğrudan'},{tr_fragment:'kesti',tr_gloss:'cut',en_fragment:'cut off',bridge_type:'direct',explanation:'Kesmek = cut off; doğrudan'}],cultural_insight:'"Cut off" keserek akışı durdurmak; sohbet akışı metaforu.',fluency_tip:'"He cut me off mid-sentence — so rude."'},
{id:1164,category:'sosyal',tr:'Birini manipüle etti',tags:['manipüle','yönlendir','kontrol','kullan','aldatıcı'],english_primary:"Manipulated someone",alternatives:["Pulled strings to get what they wanted","Had them wrapped around their finger"],register:'neutral',bridges:[{tr_fragment:'Birini',tr_gloss:'someone',en_fragment:'someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'manipüle etti',tr_gloss:'manipulated',en_fragment:'manipulated',bridge_type:'direct',explanation:'Uluslararası kelime; doğrudan'}],cultural_insight:'"Have someone wrapped around your finger" parmağına sarmak; tam kontrol.',fluency_tip:'"She had him wrapped around her finger from day one."'},
{id:1165,category:'sosyal',tr:'Kibarca reddetti',tags:['kibarca','reddet','hayır','nezaket','nazik'],english_primary:"Politely turned them down",alternatives:["Let them down gently","Said no in the kindest way"],register:'neutral',bridges:[{tr_fragment:'Kibarca',tr_gloss:'politely',en_fragment:'politely',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'reddetti',tr_gloss:'refused/rejected',en_fragment:'turned them down',bridge_type:'transform',explanation:'"Reddetmek" (refuse) → "turn down" (aşağı çevirmek); yön metaforu'}],cultural_insight:'"Let down gently" yumuşakça bırakmak; reddi nazikleştirme.',fluency_tip:'"She let him down gently — no drama, just honest and kind."'},
{id:1166,category:'sosyal',tr:'Toplantıya geç kaldı',tags:['toplantı','geç','kal','özür','gecikme'],english_primary:"Showed up late to the meeting",alternatives:["Arrived behind schedule","Kept everyone waiting"],register:'neutral',bridges:[{tr_fragment:'Toplantıya',tr_gloss:'to the meeting',en_fragment:'to the meeting',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'geç kaldı',tr_gloss:'was late',en_fragment:'showed up late',bridge_type:'direct',explanation:'Geç kalmak = show up late; doğrudan'}],cultural_insight:'"Keep everyone waiting" herkesi bekletmek; sosyal bir saygısızlık.',fluency_tip:'"He kept everyone waiting for twenty minutes — no apology."'},
{id:1167,category:'sosyal',tr:'Tanışma partisinde herkesle selamlaştı',tags:['tanışma','parti','selamlaş','sosyal','network'],english_primary:"Worked the room at the party",alternatives:["Mingled with everyone","Made the rounds"],register:'informal',bridges:[{tr_fragment:'Tanışma partisinde',tr_gloss:'at the meeting party',en_fragment:'at the party',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'herkesle selamlaştı',tr_gloss:'greeted everyone',en_fragment:'worked the room',bridge_type:'transform',explanation:'"Selamlaşmak" → "work the room" (odayı çalıştırmak); İngilizce strateji metaforu'}],cultural_insight:'"Work the room" odayı çalıştırmak; ağ kurma stratejisi.',fluency_tip:'"She worked the room effortlessly — everyone knew her by the end."'},
{id:1168,category:'sosyal',tr:'Sırrını kimseyle paylaşmadı',tags:['sır','paylaş','gizle','kimse','güven'],english_primary:"Didn\'t breathe a word to anyone",alternatives:["Kept it completely to themselves","Took it to the grave"],register:'neutral',bridges:[{tr_fragment:'Sırrını',tr_gloss:'their secret',en_fragment:'word',bridge_type:'transform',explanation:'"Sır" (secret) → "word" (kelime); İngilizce "kelime dahi söylememek" metaforu'},{tr_fragment:'kimseyle paylaşmadı',tr_gloss:'didn\'t share with anyone',en_fragment:'didn\'t breathe...to anyone',bridge_type:'transform',explanation:'"Paylaşmamak" → "not breathe"; sırrı nefes gibi tutmak'}],cultural_insight:'"Breathe a word" kelimeyi nefesle çıkarmak; nefes = iletişim.',fluency_tip:'"I didn\'t breathe a word to anyone — your secret is safe."'},
{id:1169,category:'sosyal',tr:'Övgüyle karşılandı',tags:['övgü','karşıla','alkış','takdir','saygı'],english_primary:"Was met with praise",alternatives:["Received glowing reviews","Was applauded for their efforts"],register:'neutral',bridges:[{tr_fragment:'Övgüyle',tr_gloss:'with praise',en_fragment:'praise',bridge_type:'direct',explanation:'Övgü = praise; doğrudan'},{tr_fragment:'karşılandı',tr_gloss:'was met with',en_fragment:'was met with',bridge_type:'direct',explanation:'Karşılanmak = be met with; doğrudan'}],cultural_insight:'"Glowing review" parlayan yorum; çok olumlu geri bildirim.',fluency_tip:'"The performance was met with glowing reviews from the critics."'},
{id:1170,category:'sosyal',tr:'Eleştiriyi kabullenemedi',tags:['eleştiri','kabul','kişisel','al','ego'],english_primary:"Took the criticism personally",alternatives:["Couldn\'t take feedback well","Got defensive"],register:'neutral',bridges:[{tr_fragment:'Eleştiriyi',tr_gloss:'the criticism',en_fragment:'criticism',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kabullenemedi',tr_gloss:'couldn\'t accept',en_fragment:'took...personally',bridge_type:'transform',explanation:'"Kabullenememek" → "take personally"; şahsileştirme metaforu'}],cultural_insight:'"Take it personally" kişisel algılamak; profesyonel eleştiriyi bireysel saldırı saymak.',fluency_tip:'"Try not to take feedback personally — it\'s about the work, not you."'},
{id:1171,category:'sosyal',tr:'Samimi bir özür diledi',tags:['özür','dile','samimi','af','itiraf'],english_primary:"Offered a sincere apology",alternatives:["Gave a heartfelt sorry","Made a genuine amends"],register:'neutral',bridges:[{tr_fragment:'Samimi bir',tr_gloss:'sincere/genuine',en_fragment:'sincere',bridge_type:'direct',explanation:'Samimi = sincere; doğrudan'},{tr_fragment:'özür diledi',tr_gloss:'asked forgiveness',en_fragment:'apology',bridge_type:'direct',explanation:'Özür dilemek = apologise; doğrudan'}],cultural_insight:'"Make amends" tazminatta bulunmak; özürün ötesinde eylemle düzeltme.',fluency_tip:'"He offered a sincere apology and meant every word."'},
{id:1172,category:'sosyal',tr:'İtibarını korudu',tags:['itibar','koru','saygı','isim','onur'],english_primary:"Protected their reputation",alternatives:["Kept their good name intact","Guarded their standing"],register:'formal',bridges:[{tr_fragment:'İtibarını',tr_gloss:'their reputation',en_fragment:'reputation',bridge_type:'direct',explanation:'İtibar = reputation; Arapça kökenli'},{tr_fragment:'korudu',tr_gloss:'protected',en_fragment:'protected',bridge_type:'direct',explanation:'Korumak = protect; doğrudan'}],cultural_insight:'"Good name" iyi isim; itibarın isme bağlı olması.',fluency_tip:'"She worked hard to keep her good name intact."'},
{id:1173,category:'sosyal',tr:'Bakışlarıyla mesaj verdi',tags:['bakış','mesaj','göz','iletişim','sessiz'],english_primary:"Said it all with a look",alternatives:["Communicated without words","Spoke volumes with their eyes"],register:'informal',bridges:[{tr_fragment:'Bakışlarıyla',tr_gloss:'with their looks/glances',en_fragment:'with a look',bridge_type:'direct',explanation:'Doğrudan; bakış = look'},{tr_fragment:'mesaj verdi',tr_gloss:'gave a message',en_fragment:'said it all',bridge_type:'transform',explanation:'"Mesaj vermek" (give message) → "say it all" (her şeyi söylemek)'}],cultural_insight:'"Speak volumes" cilt cilt kitap konuşmak; sözsüz iletişimin gücü.',fluency_tip:'"She spoke volumes with just one look — no words needed."'},
{id:1174,category:'sosyal',tr:'Birisinin niyetini sorguladı',tags:['niyet','sorgula','güven','şüphe','gerçek'],english_primary:"Questioned someone\'s motives",alternatives:["Was suspicious of their intentions","Doubted what was really going on"],register:'neutral',bridges:[{tr_fragment:'Niyetini',tr_gloss:'their intention/motive',en_fragment:'motives',bridge_type:'direct',explanation:'Niyet = motive; doğrudan'},{tr_fragment:'sorguladı',tr_gloss:'questioned',en_fragment:'questioned',bridge_type:'direct',explanation:'Sorgulamak = question; doğrudan'}],cultural_insight:'"Motives" güdüler; "intentions" niyetler; ikisi farklı ama yakın.',fluency_tip:'"I started questioning their motives after that comment."'},
{id:1175,category:'sosyal',tr:'Güven kırıldı',tags:['güven','kır','ihanet','arkadaş','incin'],english_primary:"The trust was broken",alternatives:["The bond was shattered","Faith was lost"],register:'neutral',bridges:[{tr_fragment:'Güven',tr_gloss:'trust',en_fragment:'trust',bridge_type:'direct',explanation:'Güven = trust; doğrudan'},{tr_fragment:'kırıldı',tr_gloss:'was broken',en_fragment:'was broken',bridge_type:'direct',explanation:'Kırılmak = be broken; doğrudan'}],cultural_insight:'"Shattered" cam kırılması; güvenin kırılganlığını cam metaforuyla anlatmak.',fluency_tip:'"Once trust is broken, it\'s very hard to rebuild."'},
{id:1176,category:'sosyal',tr:'Birlikte kahkaha attılar',tags:['kahkaha','at','güldüler','keyif','birlikte'],english_primary:"Laughed their heads off together",alternatives:["Cracked up together","Had a great laugh"],register:'informal',bridges:[{tr_fragment:'Kahkaha attılar',tr_gloss:'threw laughter',en_fragment:'laughed their heads off',bridge_type:'transform',explanation:'Türkçe "atmak" (throw) → İngilizce "laugh off" (kafayı kopararak güler); ikisi de abartılı gülme'},{tr_fragment:'Birlikte',tr_gloss:'together',en_fragment:'together',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Laugh your head off" kafanı kopararak güler; Türkçe kahkaha "atar".',fluency_tip:'"We laughed our heads off at his impression — couldn\'t breathe."'},
{id:1177,category:'sosyal',tr:'Sevilmeyen biri olmaya başladı',tags:['sevilme','popüler','kaybet','sosyal','yalnız'],english_primary:"Started rubbing people the wrong way",alternatives:["Was losing their social standing","Was becoming unpopular"],register:'neutral',bridges:[{tr_fragment:'Sevilmeyen biri',tr_gloss:'an unlikeable person',en_fragment:'rubbing people the wrong way',bridge_type:'transform',explanation:'Sevilmemek → yanlış yönde sürtmek; İngilizce dokunma metaforu'},{tr_fragment:'olmaya başladı',tr_gloss:'began to become',en_fragment:'started',bridge_type:'direct',explanation:'Doğrudan; başlamak = start'}],cultural_insight:'"Rub the wrong way" tüyü ters taramak; ters tüylerin kaşıntı yapması.',fluency_tip:'"He started rubbing people the wrong way with his comments."'},
{id:1178,category:'sosyal',tr:'Kalabalıktan sıyrıldı',tags:['kalabalık','sıyrıl','ayrışt','farklılaş','öne çık'],english_primary:"Stood out from the crowd",alternatives:["Set themselves apart","Was a cut above the rest"],register:'neutral',bridges:[{tr_fragment:'Kalabalıktan',tr_gloss:'from the crowd',en_fragment:'from the crowd',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'sıyrıldı',tr_gloss:'broke free/slipped away',en_fragment:'stood out',bridge_type:'transform',explanation:'"Sıyrılmak" (slip/break free) → "stand out" (öne çıkmak); farklı yön ama aynı ayrışma'}],cultural_insight:'"Cut above the rest" kalanlardan bir kesim üstte; nitelik farkı.',fluency_tip:'"Her work ethic made her a cut above the rest."'},
{id:1179,category:'sosyal',tr:'Sınırlarını çizdi',tags:['sınır','çiz','hayır de','korun','kişisel'],english_primary:"Set their boundaries",alternatives:["Drew a clear line","Made their limits known"],register:'neutral',bridges:[{tr_fragment:'Sınırlarını',tr_gloss:'their limits/boundaries',en_fragment:'boundaries',bridge_type:'direct',explanation:'Sınır = boundary; doğrudan'},{tr_fragment:'çizdi',tr_gloss:'drew',en_fragment:'set / drew',bridge_type:'direct',explanation:'Çizmek = draw; çizgi çekmek = set limits'}],cultural_insight:'"Set boundaries" modern psikoloji dili; Türkçede de "sınır koymak" denir.',fluency_tip:'"You need to set clear boundaries with people who drain your energy."'},
{id:1180,category:'sosyal',tr:'Birini dışladı',tags:['dışla','sosyal dışlama','grup','yalnız','ignore'],english_primary:"Left someone out",alternatives:["Excluded them from the group","Gave them the cold shoulder"],register:'neutral',bridges:[{tr_fragment:'Birini',tr_gloss:'someone',en_fragment:'someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'dışladı',tr_gloss:'excluded',en_fragment:'left out',bridge_type:'transform',explanation:'"Dışlamak" (exclude) → "leave out" (dışarıda bırakmak); ters yönlü ama aynı eylem'}],cultural_insight:'"Cold shoulder" soğuk omuz; birini bilinçli olarak yok saymak.',fluency_tip:'"She gave him the cold shoulder for a week after the argument."'},
{id:1181,category:'sosyal',tr:'İnsanları bir araya getirdi',tags:['insanlar','bir araya','getir','topla','birleştir'],english_primary:"Brought people together",alternatives:["United the group","Was the glue that held everyone together"],register:'neutral',bridges:[{tr_fragment:'İnsanları',tr_gloss:'people',en_fragment:'people',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'bir araya getirdi',tr_gloss:'brought together',en_fragment:'brought together',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'"Glue" yapıştırıcı; birini grubu bir arada tutan yapışkan.',fluency_tip:'"She was the glue that held the whole group together."'},
{id:1182,category:'sosyal',tr:'Birine minnetini ifade etti',tags:['minnet','ifade','teşekkür','takdir','göster'],english_primary:"Expressed their gratitude to someone",alternatives:["Showed their appreciation","Let them know how much it meant"],register:'neutral',bridges:[{tr_fragment:'Minnetini',tr_gloss:'their gratitude',en_fragment:'gratitude',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'ifade etti',tr_gloss:'expressed',en_fragment:'expressed',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Show appreciation" takdiri göstermek; söylemekten öte eylemle.',fluency_tip:'"It\'s always good to express your gratitude — don\'t assume they know."'},
{id:1183,category:'sosyal',tr:'Sosyal çevre kurdu',tags:['sosyal','çevre','kur','network','bağlantı'],english_primary:"Built a social network",alternatives:["Expanded their circle","Made valuable connections"],register:'neutral',bridges:[{tr_fragment:'Sosyal çevre',tr_gloss:'social circle',en_fragment:'social network',bridge_type:'direct',explanation:'Doğrudan; çevre = circle/network'},{tr_fragment:'kurdu',tr_gloss:'built/established',en_fragment:'built',bridge_type:'direct',explanation:'Kurmak = build; doğrudan'}],cultural_insight:'"Your network is your net worth" networking\'in kariyer değeri.',fluency_tip:'"Take every chance to expand your circle — you never know who\'ll matter."'},
{id:1184,category:'sosyal',tr:'Bir konuşmaya girmekten kaçındı',tags:['konuşma','kaçın','karışma','ihtiyatlı','mesafeli'],english_primary:"Steered clear of the conversation",alternatives:["Avoided getting involved","Kept out of it"],register:'neutral',bridges:[{tr_fragment:'Bir konuşmaya girmekten',tr_gloss:'from entering a conversation',en_fragment:'the conversation',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'kaçındı',tr_gloss:'avoided',en_fragment:'steered clear of',bridge_type:'transform',explanation:'"Kaçınmak" (avoid) → "steer clear" (dümen çevirmek); denizcilik metaforu'}],cultural_insight:'"Steer clear" kayadan uzak dümen tutmak; tehlikenin etrafından dolanmak.',fluency_tip:'"I steered clear of that conversation — not my business."'},
{id:1185,category:'sosyal',tr:'Arkadaşına kötü haberi iletti',tags:['arkadaş','kötü haber','ilet','zor','söyle'],english_primary:"Broke the bad news to their friend",alternatives:["Had to deliver difficult news","Let their friend know gently"],register:'neutral',bridges:[{tr_fragment:'Kötü haberi',tr_gloss:'the bad news',en_fragment:'bad news',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'iletti',tr_gloss:'conveyed/delivered',en_fragment:'broke',bridge_type:'transform',explanation:'"İletmek" (convey) → "break" (kırmak); haber kırılarak iletilir'}],cultural_insight:'"Break the news" haberi kırmak; beklentileri yıkma gibi.',fluency_tip:'"It was hard, but she broke the news as gently as she could."'},
{id:1186,category:'sosyal',tr:'Konuyu değiştirdi',tags:['konu','değiştir','atlat','kaç','farklı'],english_primary:"Changed the subject",alternatives:["Steered the conversation elsewhere","Switched topics"],register:'informal',bridges:[{tr_fragment:'Konuyu',tr_gloss:'the subject',en_fragment:'subject',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'değiştirdi',tr_gloss:'changed',en_fragment:'changed',bridge_type:'direct',explanation:'Değiştirmek = change; doğrudan'}],cultural_insight:'"Steer the conversation" konuşmaya dümen tutmak; yönlendirme.',fluency_tip:'"He quickly changed the subject whenever it got too personal."'},
{id:1187,category:'sosyal',tr:'Yanlış anlaşıldı',tags:['yanlış','anlaş','iletişim','niyetim bu değildi','hata'],english_primary:"Was misunderstood",alternatives:["Was taken the wrong way","Got the wrong reaction"],register:'neutral',bridges:[{tr_fragment:'Yanlış',tr_gloss:'wrong',en_fragment:'mis-',bridge_type:'direct',explanation:'Yanlış = mis- (hatalı); doğrudan'},{tr_fragment:'anlaşıldı',tr_gloss:'was understood',en_fragment:'understood',bridge_type:'direct',explanation:'Anlaşılmak = be understood; doğrudan'}],cultural_insight:'"Taken the wrong way" yanlış yönde alınmak; yorumun niyetten sapması.',fluency_tip:'"My comment was completely taken the wrong way — I meant it positively."'},
{id:1188,category:'sosyal',tr:'Zorlu bir konuşma yaptı',tags:['zorlu','konuşma','yap','dürüst','hassas'],english_primary:"Had a difficult conversation",alternatives:["Tackled a hard topic","Had a heart-to-heart"],register:'neutral',bridges:[{tr_fragment:'Zorlu bir',tr_gloss:'a difficult',en_fragment:'difficult',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'konuşma yaptı',tr_gloss:'held a conversation',en_fragment:'conversation',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Heart-to-heart" kalp kalpten; dürüst ve samimi konuşma.',fluency_tip:'"We need to have a heart-to-heart about what\'s been going on."'},
{id:1189,category:'sosyal',tr:'Bir yanlış anlaşılmayı düzeltti',tags:['yanlış anlama','düzelt','açıkla','netleştir','özür'],english_primary:"Cleared up a misunderstanding",alternatives:["Set the record straight","Got to the bottom of the mix-up"],register:'neutral',bridges:[{tr_fragment:'Yanlış anlaşılmayı',tr_gloss:'the misunderstanding',en_fragment:'misunderstanding',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'düzeltti',tr_gloss:'corrected/fixed',en_fragment:'cleared up',bridge_type:'transform',explanation:'"Düzeltmek" (fix) → "clear up" (temizlemek); şeffaflık metaforu'}],cultural_insight:'"Set the record straight" kaydı düzeltmek; yanlış bilgiyi doğrulamak.',fluency_tip:'"Let me set the record straight — that\'s not what happened."'},
{id:1190,category:'sosyal',tr:'Karşılıklı saygı gösterdiler',tags:['saygı','karşılıklı','göster','ilişki','denge'],english_primary:"Showed mutual respect",alternatives:["Treated each other with dignity","Had a respectful dynamic"],register:'neutral',bridges:[{tr_fragment:'Karşılıklı',tr_gloss:'mutual',en_fragment:'mutual',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'saygı gösterdiler',tr_gloss:'showed respect',en_fragment:'respect',bridge_type:'direct',explanation:'Saygı göstermek = show respect; doğrudan'}],cultural_insight:'"Mutual respect" karşılıklı saygı; sağlıklı ilişkinin temeli.',fluency_tip:'"A good working relationship is built on mutual respect."'},
{id:1191,category:'sosyal',tr:'Birinin arkasını kolladı',tags:['arka','kolla','destek','güven','koru'],english_primary:"Had someone\'s back",alternatives:["Looked out for them","Was their safety net"],register:'informal',bridges:[{tr_fragment:'Birinin arkasını',tr_gloss:'someone\'s back',en_fragment:'back',bridge_type:'direct',explanation:'Arka = back; doğrudan'},{tr_fragment:'kolladı',tr_gloss:'watched over',en_fragment:'had',bridge_type:'transform',explanation:'"Kollamak" (watch over) → "have someone\'s back" (arkasını tutmak)'}],cultural_insight:'"Have someone\'s back" arkayı tutmak; savaşta arkadan gelmesini engellemek.',fluency_tip:'"Don\'t worry — I\'ve got your back no matter what."'},
{id:1192,category:'sosyal',tr:'Herkesin önünde utandırdı',tags:['utandır','herkes','önünde','aşağıla','rencide'],english_primary:"Called them out in front of everyone",alternatives:["Publicly embarrassed them","Put them on the spot"],register:'informal',bridges:[{tr_fragment:'Herkesin önünde',tr_gloss:'in front of everyone',en_fragment:'in front of everyone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'utandırdı',tr_gloss:'embarrassed',en_fragment:'called them out',bridge_type:'transform',explanation:'"Utandırmak" → "call out" (seslenmek); İngilizce daha yüzleşme odaklı'}],cultural_insight:'"Call out" alenen yüzleştirmek; sosyal damgalamaya dikkat çekmek.',fluency_tip:'"He called her out in front of everyone — that was uncalled for."'},
{id:1193,category:'sosyal',tr:'Birinin acısına ortak oldu',tags:['acı','ortak','empati','yanında','yas'],english_primary:"Shared in their grief",alternatives:["Was there in their pain","Offered comfort in sorrow"],register:'neutral',bridges:[{tr_fragment:'Birinin acısına',tr_gloss:'in someone\'s pain',en_fragment:'grief',bridge_type:'direct',explanation:'Acı = grief/pain; doğrudan'},{tr_fragment:'ortak oldu',tr_gloss:'became a partner in',en_fragment:'shared in',bridge_type:'direct',explanation:'"Ortak olmak" (share/partner) → "share in" (paylaşmak); doğrudan'}],cultural_insight:'"Grief" özellikle kayıp acısı; "pain" daha geniş; Türkçe "acı" her ikisini kapsar.',fluency_tip:'"I shared in her grief when she lost her father."'},
{id:1194,category:'sosyal',tr:'Birinin yanında sessizce durdu',tags:['sessiz','dur','yanında','destek','varlık'],english_primary:"Was quietly there for someone",alternatives:["Offered silent support","Didn\'t need to say anything — just showed up"],register:'neutral',bridges:[{tr_fragment:'Birinin yanında',tr_gloss:'beside someone',en_fragment:'there for someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'sessizce durdu',tr_gloss:'stood quietly',en_fragment:'quietly',bridge_type:'direct',explanation:'Sessizce = quietly; doğrudan'}],cultural_insight:'"Presence" varlık; bazen kelimeden çok yanında olmak yeter.',fluency_tip:'"Sometimes just showing up is the best thing you can do."'},
{id:1195,category:'sosyal',tr:'Tartışmada tutarlı kaldı',tags:['tartışma','tutarlı','kal','savun','inan'],english_primary:"Held their ground in the argument",alternatives:["Stood firm","Didn\'t back down"],register:'neutral',bridges:[{tr_fragment:'Tartışmada',tr_gloss:'in the argument',en_fragment:'in the argument',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'tutarlı kaldı',tr_gloss:'remained consistent',en_fragment:'held their ground',bridge_type:'transform',explanation:'"Tutarlı kalmak" (stay consistent) → "hold ground" (zemin tutmak); toprak savunma metaforu'}],cultural_insight:'"Hold your ground" askeri metafor; pozisyonundan geri adım atmamak.',fluency_tip:'"She held her ground and refused to compromise on her principles."'},
{id:1196,category:'sosyal',tr:'Söylenenden fazlasını anladı',tags:['söyle','anla','oku','sezgi','derin'],english_primary:"Read between the lines",alternatives:["Picked up on what wasn\'t said","Understood the subtext"],register:'neutral',bridges:[{tr_fragment:'Söylenenden fazlasını',tr_gloss:'more than what was said',en_fragment:'between the lines',bridge_type:'transform',explanation:'"Söylenenden fazlası" → "between the lines" (satır araları); İngilizce okuma metaforu'},{tr_fragment:'anladı',tr_gloss:'understood',en_fragment:'read',bridge_type:'transform',explanation:'"Anlamak" (understand) → "read" (okumak); anlama = okuma'}],cultural_insight:'"Between the lines" satır arasını okumak; gizli anlamı yakalamak.',fluency_tip:'"You need to read between the lines with him — he rarely says what he means."'},
{id:1197,category:'sosyal',tr:'Biriyle yollarını ayırdı',tags:['yol','ayır','ayrılık','bitir','ilişki'],english_primary:"Parted ways with someone",alternatives:["Went their separate ways","Called it quits"],register:'neutral',bridges:[{tr_fragment:'Yollarını',tr_gloss:'their paths/ways',en_fragment:'ways',bridge_type:'direct',explanation:'Yol = way; doğrudan'},{tr_fragment:'ayırdı',tr_gloss:'separated',en_fragment:'parted',bridge_type:'direct',explanation:'Ayırmak = part; doğrudan'}],cultural_insight:'"Go separate ways" yollar ayrılmak; evrensel metafor iki dilde de.',fluency_tip:'"They parted ways amicably after ten years as business partners."'},
{id:1198,category:'sosyal',tr:'Birini temsil etti',tags:['temsil','et','vekil','adına','konuş'],english_primary:"Spoke on someone\'s behalf",alternatives:["Represented their interests","Stepped in for them"],register:'formal',bridges:[{tr_fragment:'Birini',tr_gloss:'someone',en_fragment:'someone\'s',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'temsil etti',tr_gloss:'represented',en_fragment:'behalf / represented',bridge_type:'direct',explanation:'Temsil etmek = represent; doğrudan'}],cultural_insight:'"On behalf of" adına; resmi temsil ifadesi.',fluency_tip:'"I\'m speaking on behalf of the entire team when I say we appreciate this."'},
{id:1199,category:'sosyal',tr:'Birini suçladı ama yanılıyordu',tags:['suçla','yanıl','hatalı','özür','yanlış'],english_primary:"Pointed the finger at the wrong person",alternatives:["Blamed someone unfairly","Got the wrong end of the stick"],register:'neutral',bridges:[{tr_fragment:'Birini suçladı',tr_gloss:'accused someone',en_fragment:'pointed the finger',bridge_type:'transform',explanation:'"Suçlamak" → "point the finger" (parmak göstermek); suçlamayı parmak metaforuyla anlatmak'},{tr_fragment:'ama yanılıyordu',tr_gloss:'but was wrong',en_fragment:'at the wrong person',bridge_type:'direct',explanation:'Doğrudan; yanlış kişi'}],cultural_insight:'"Get the wrong end of the stick" sopanın yanlış ucunu tutmak; yanlış anlamak.',fluency_tip:'"He pointed the finger at the wrong person and had to apologise."'},
{id:1200,category:'sosyal',tr:'Birini omuzlarında taşıdı',tags:['omuz','taşı','destek','aşırı yükle','yardım'],english_primary:"Carried someone on their shoulders",alternatives:["Bore the weight for someone else","Took on their burdens"],register:'neutral',bridges:[{tr_fragment:'Birini omuzlarında',tr_gloss:'someone on their shoulders',en_fragment:'on their shoulders',bridge_type:'direct',explanation:'Doğrudan; fiziksel metafor'},{tr_fragment:'taşıdı',tr_gloss:'carried',en_fragment:'carried',bridge_type:'direct',explanation:'Taşımak = carry; doğrudan'}],cultural_insight:'Birini omuzlarda taşıma metaforu hem yük hem saygı/zafer anlamı taşır.',fluency_tip:'"She carried the whole team on her shoulders through the crisis."'},
{id:1201,category:'sosyal',tr:'Güzel bir jest yaptı',tags:['jest','güzel','yap','nezaket','jest'],english_primary:"Made a thoughtful gesture",alternatives:["Did something really kind","Showed they cared"],register:'neutral',bridges:[{tr_fragment:'Güzel bir',tr_gloss:'beautiful/lovely',en_fragment:'thoughtful',bridge_type:'transform',explanation:'"Güzel" (beautiful) → "thoughtful" (düşünceli); değer odaklı farklı nitelendirme'},{tr_fragment:'jest yaptı',tr_gloss:'made a gesture',en_fragment:'gesture',bridge_type:'direct',explanation:'Jest = gesture; doğrudan'}],cultural_insight:'"Thoughtful" düşünceli; birini aklında tutarak hareket etmek.',fluency_tip:'"It was such a thoughtful gesture — she remembered my favourite cake."'},
{id:1202,category:'sosyal',tr:'Komşusuyla iyi geçindi',tags:['komşu','geçin','iyi','ilişki','barış'],english_primary:"Got along well with the neighbours",alternatives:["Was on good terms with them","Had a friendly relationship"],register:'neutral',bridges:[{tr_fragment:'Komşusuyla',tr_gloss:'with the neighbour',en_fragment:'with the neighbours',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'iyi geçindi',tr_gloss:'got along well',en_fragment:'got along well',bridge_type:'direct',explanation:'İyi geçinmek = get along well; doğrudan'}],cultural_insight:'"Good neighbours" iyi komşular; pek çok kültürde önemli sosyal değer.',fluency_tip:'"We\'ve always been on good terms with our neighbours."'},
{id:1203,category:'sosyal',tr:'Tanıdıklarına haber saldı',tags:['tanıdık','haber','sal','bildir','iletişim'],english_primary:"Reached out to their contacts",alternatives:["Got in touch with people they knew","Put the word out"],register:'neutral',bridges:[{tr_fragment:'Tanıdıklarına',tr_gloss:'to their contacts/acquaintances',en_fragment:'contacts',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'haber saldı',tr_gloss:'sent news/word',en_fragment:'reached out',bridge_type:'transform',explanation:'"Haber salmak" (send news) → "reach out" (uzanmak); iletişim başlatma'}],cultural_insight:'"Reach out" uzanmak; iletişim kurmak için uzanma metaforu.',fluency_tip:'"I reached out to everyone I knew in the industry."'},
{id:1204,category:'sosyal',tr:'Doğum günü sürprizini organize etti',tags:['doğum günü','sürpriz','organize','plan','gizle'],english_primary:"Organised a surprise birthday party",alternatives:["Put together a surprise celebration","Pulled off the perfect surprise"],register:'informal',bridges:[{tr_fragment:'Sürprizi',tr_gloss:'the surprise',en_fragment:'surprise',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'organize etti',tr_gloss:'organised',en_fragment:'organised',bridge_type:'direct',explanation:'Doğrudan; uluslararası kelime'}],cultural_insight:'"Pull off" beklenmedik bir şeyi başarmak; perde arkasından çekip çıkarmak.',fluency_tip:'"She pulled off the most incredible surprise party — he was speechless."'},
{id:1205,category:'sosyal',tr:'Çirkin bir şaka yaptı',tags:['şaka','çirkin','kötü','incit','kaba'],english_primary:"Made a tasteless joke",alternatives:["Crossed a line with humour","Said something that went down badly"],register:'informal',bridges:[{tr_fragment:'Çirkin bir',tr_gloss:'ugly/bad',en_fragment:'tasteless',bridge_type:'transform',explanation:'"Çirkin" (ugly) → "tasteless" (tatsız); kötü şakayı farklı duyularla niteleyen'},{tr_fragment:'şaka yaptı',tr_gloss:'made a joke',en_fragment:'joke',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Tasteless" tatsız; beğeni/estetik anlayışının dışında kalan.',fluency_tip:'"That joke was in really poor taste — he should apologise."'},
{id:1206,category:'sosyal',tr:'Birinin özel alanına girdi',tags:['özel','alan','gir','sınır','kişisel'],english_primary:"Invaded their personal space",alternatives:["Got too close for comfort","Crossed into their bubble"],register:'neutral',bridges:[{tr_fragment:'Özel alanına',tr_gloss:'their personal space',en_fragment:'personal space',bridge_type:'direct',explanation:'Doğrudan; uluslararası kavram'},{tr_fragment:'girdi',tr_gloss:'entered',en_fragment:'invaded',bridge_type:'transform',explanation:'"Girmek" (enter) → "invade" (işgal etmek); müdahale şiddeti'}],cultural_insight:'"Personal bubble" kişisel baloncuk; görünmez mahremiyet bölgesi.',fluency_tip:'"She invaded my personal space — it made me uncomfortable."'},
{id:1207,category:'sosyal',tr:'Bir konuşmada ağırlığını koydu',tags:['konuşma','ağırlık','koy','söyle','çarptı'],english_primary:"Made their voice heard",alternatives:["Spoke up and made an impact","Put their foot down in the discussion"],register:'neutral',bridges:[{tr_fragment:'Ağırlığını',tr_gloss:'their weight',en_fragment:'voice',bridge_type:'transform',explanation:'"Ağırlık koymak" (put weight) → "make voice heard"; ağırlık metaforu → ses metaforu'},{tr_fragment:'koydu',tr_gloss:'put/placed',en_fragment:'made...heard',bridge_type:'direct',explanation:'Koymak = make/put; doğrudan'}],cultural_insight:'"Put your foot down" ayağını yere basmak; kesin tavır almak.',fluency_tip:'"She finally made her voice heard in the meeting — and it changed everything."'},
{id:1208,category:'sosyal',tr:'Birini cesaretlendirdi',tags:['cesaret','ver','destekle','ilham','güven'],english_primary:"Encouraged someone",alternatives:["Gave them a boost of confidence","Was their biggest cheerleader"],register:'neutral',bridges:[{tr_fragment:'Birini',tr_gloss:'someone',en_fragment:'someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'cesaretlendirdi',tr_gloss:'encouraged/emboldened',en_fragment:'encouraged',bridge_type:'direct',explanation:'Cesaret+lendirmek = encourage; doğrudan'}],cultural_insight:'"Cheerleader" amigo; birinin en coşkulu destekçisi olmak.',fluency_tip:'"She was his biggest cheerleader throughout the whole competition."'},
{id:1209,category:'sosyal',tr:'Birinden özür bekledi ama gelmedi',tags:['özür','bekle','gel','hayal kırıklığı','kabul'],english_primary:"Waited for an apology that never came",alternatives:["Was left without closure","Never got the sorry they deserved"],register:'neutral',bridges:[{tr_fragment:'Özür bekledi',tr_gloss:'waited for an apology',en_fragment:'waited for an apology',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'ama gelmedi',tr_gloss:'but it didn\'t come',en_fragment:'that never came',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Closure" kapanış; bitmemiş duygusal meselelerin tamamlanması.',fluency_tip:'"She waited for an apology that never came — she had to find her own closure."'},
{id:1210,category:'sosyal',tr:'Birine iltifat etti',tags:['iltifat','et','söyle','güzel','tamamla'],english_primary:"Paid someone a compliment",alternatives:["Said something nice about them","Gave them a genuine compliment"],register:'neutral',bridges:[{tr_fragment:'Birine',tr_gloss:'to someone',en_fragment:'someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'iltifat etti',tr_gloss:'complimented',en_fragment:'paid a compliment',bridge_type:'transform',explanation:'"İltifat etmek" → "pay a compliment" (iltifat ödemek); İngilizce ekonomik metafor'}],cultural_insight:'"Pay a compliment" iltifat ödemek; güzel sözün bir bedeli olan metafor.',fluency_tip:'"He paid her a genuine compliment and she lit up."'},
{id:1211,category:'sosyal',tr:'Yardım teklif etti ama reddedildi',tags:['yardım','teklif','reddet','ego','bağımsız'],english_primary:"Offered help but was turned down",alternatives:["Had the offer rejected","Was told they didn\'t need it"],register:'neutral',bridges:[{tr_fragment:'Yardım teklif etti',tr_gloss:'offered help',en_fragment:'offered help',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'ama reddedildi',tr_gloss:'but was refused',en_fragment:'was turned down',bridge_type:'direct',explanation:'"Reddedilmek" = be turned down; doğrudan'}],cultural_insight:'"Turn down" aşağı çevirmek; reddin yön metaforu.',fluency_tip:'"I offered to help but was politely turned down."'},
{id:1212,category:'sosyal',tr:'Birine hak verdi',tags:['hak ver','anlayış','kabul','haklı bul','destekle'],english_primary:"Agreed with someone",alternatives:["Saw their point","Sided with them"],register:'neutral',bridges:[{tr_fragment:'Birine',tr_gloss:'to someone',en_fragment:'with someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'hak verdi',tr_gloss:'gave right to',en_fragment:'agreed',bridge_type:'transform',explanation:'"Hak vermek" (give right) → "agree with"; Türkçede haklılığı tanıma aktif bir verme eylemi'}],cultural_insight:'"Hak vermek" haklılığı tanımak; ikrar etmek; İngilizcede "agree" daha nötr.',fluency_tip:'"I have to agree with her on this one — she has a point."'},
{id:1213,category:'sosyal',tr:'Çevresine olumlu enerji yaydı',tags:['enerji','yay','pozitif','çevre','atmosfer'],english_primary:"Radiated positive energy",alternatives:["Lit up the room","Had an infectious good vibe"],register:'informal',bridges:[{tr_fragment:'Olumlu enerji',tr_gloss:'positive energy',en_fragment:'positive energy',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'yaydı',tr_gloss:'spread/radiated',en_fragment:'radiated',bridge_type:'direct',explanation:'Yaymak = radiate/spread; doğrudan'}],cultural_insight:'"Light up the room" odayı aydınlatmak; varlığıyla ortamı iyileştirmek.',fluency_tip:'"She just lights up every room she walks into."'},
{id:1214,category:'sosyal',tr:'Birinin canını çok sıktı',tags:['can','sık','sinir','bıktır','sabır'],english_primary:"Got on someone\'s nerves",alternatives:["Drove them up the wall","Was a serious irritant"],register:'informal',bridges:[{tr_fragment:'Birinin canını',tr_gloss:'someone\'s soul/patience',en_fragment:'on someone\'s nerves',bridge_type:'transform',explanation:'"Can sıkmak" ruh/can eziyet; "on nerves" sinir üstüne basmak'},{tr_fragment:'çok sıktı',tr_gloss:'really tightened/oppressed',en_fragment:'got',bridge_type:'transform',explanation:'Sıkmak (squeeze) → got (ulaştı); eylem transferi'}],cultural_insight:'"Drive up the wall" duvarın üstüne çıkartmak; çıldırtma metaforu.',fluency_tip:'"He gets on my nerves with that constant humming."'},
{id:1215,category:'sosyal',tr:'Birinin hatalarını gözden kaçırdı',tags:['hata','gözden kaçır','hoşgör','af','bak'],english_primary:"Turned a blind eye to their mistakes",alternatives:["Let it slide","Chose not to see it"],register:'neutral',bridges:[{tr_fragment:'Birinin hatalarını',tr_gloss:'their mistakes',en_fragment:'mistakes',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'gözden kaçırdı',tr_gloss:'missed from eye/sight',en_fragment:'turned a blind eye',bridge_type:'direct',explanation:'"Gözden kaçırmak" görmemek; "blind eye" kör göz; ikisi de görmeme metaforu'}],cultural_insight:'"Blind eye" kör göz; tarihsel olarak deniz komutanından geliyor.',fluency_tip:'"The manager turned a blind eye to small infractions to keep the peace."'},
{id:1216,category:'sosyal',tr:'İki kişi arasında arabuluculuk yaptı',tags:['arabulucu','iki','arasında','uzlaştır','yardım'],english_primary:"Mediated between the two sides",alternatives:["Played peacemaker","Helped them reach a compromise"],register:'neutral',bridges:[{tr_fragment:'İki kişi arasında',tr_gloss:'between two people',en_fragment:'between the two sides',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'arabuluculuk yaptı',tr_gloss:'did mediation',en_fragment:'mediated',bridge_type:'direct',explanation:'Arabuluculuk = mediation; doğrudan'}],cultural_insight:'"Peacemaker" barış yapan; aktif barış inşasını ima eder.',fluency_tip:'"She stepped in as peacemaker and resolved the dispute in an hour."'},
{id:1217,category:'sosyal',tr:'Arkadaşlık için çaba gösterdi',tags:['arkadaşlık','çaba','göster','sürdür','ilişki'],english_primary:"Made an effort to keep the friendship alive",alternatives:["Put in the work to stay close","Nurtured the friendship"],register:'neutral',bridges:[{tr_fragment:'Arkadaşlık için',tr_gloss:'for the friendship',en_fragment:'friendship',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'çaba gösterdi',tr_gloss:'made an effort',en_fragment:'made an effort',bridge_type:'direct',explanation:'Çaba göstermek = make an effort; doğrudan'}],cultural_insight:'"Nurture" beslemek/büyütmek; ilişkilerin de bakım gerektirdiği fikri.',fluency_tip:'"Good friendships take work — you have to nurture them."'},
{id:1218,category:'sosyal',tr:'Birisine gerçeği söyledi',tags:['gerçek','söyle','dürüst','açık','yüz yüze'],english_primary:"Told someone the truth to their face",alternatives:["Was brutally honest","Gave it to them straight"],register:'neutral',bridges:[{tr_fragment:'Gerçeği',tr_gloss:'the truth',en_fragment:'truth',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'söyledi',tr_gloss:'told',en_fragment:'told',bridge_type:'direct',explanation:'Söylemek = tell; doğrudan'}],cultural_insight:'"Give it to them straight" doğruca vermek; süslemeden gerçeği iletmek.',fluency_tip:'"He gave it to her straight — the truth, no sugarcoating."'},
{id:1219,category:'sosyal',tr:'Toplulukta saygın biri oldu',tags:['topluluk','saygın','ol','itibar','sosyal'],english_primary:"Became a respected figure in the community",alternatives:["Was looked up to by everyone","Had high standing in the group"],register:'neutral',bridges:[{tr_fragment:'Toplulukta',tr_gloss:'in the community',en_fragment:'in the community',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'saygın biri oldu',tr_gloss:'became a respected person',en_fragment:'respected figure',bridge_type:'direct',explanation:'Doğrudan'}],cultural_insight:'"Look up to" birine yukarı bakmak; saygı ve hayranlık.',fluency_tip:'"Everyone in the village looked up to her."'},
{id:1220,category:'sosyal',tr:'Birisini hayal kırıklığına uğrattı',tags:['hayal kırıklığı','uğrat','yüzüstü bırak','güven','vaat'],english_primary:"Let someone down",alternatives:["Failed to meet their expectations","Disappointed them"],register:'neutral',bridges:[{tr_fragment:'Birini',tr_gloss:'someone',en_fragment:'someone',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'hayal kırıklığına uğrattı',tr_gloss:'caused disappointment to',en_fragment:'let...down',bridge_type:'transform',explanation:'"Hayal kırıklığına uğratmak" → "let down" (aşağı bırakmak); her ikisi de hayal yıkımı ama farklı metafor'}],cultural_insight:'"Let down" tutunulan birini bırakmak; Türkçedeki hayal kırma metaforuna paralel.',fluency_tip:'"I really let them down — I should have done better."'},
{id:1221,category:'sosyal',tr:'Sözlü bir anlaşmaya vardılar',tags:['sözlü','anlaşma','el sıkış','tamamdır','güven'],english_primary:"Came to a verbal agreement",alternatives:["Shook on it","Reached a gentleman\'s agreement"],register:'neutral',bridges:[{tr_fragment:'Sözlü bir anlaşmaya',tr_gloss:'to a verbal agreement',en_fragment:'verbal agreement',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'vardılar',tr_gloss:'arrived/reached',en_fragment:'came to',bridge_type:'direct',explanation:'Varmak = arrive/come to; doğrudan'}],cultural_insight:'"Gentleman\'s agreement" centilmen anlaşması; yazısız güvene dayalı.',fluency_tip:'"They shook on it — a gentleman\'s agreement that held for twenty years."'},
{id:1222,category:'sosyal',tr:'Grupta lider olarak öne çıktı',tags:['grup','lider','öne çık','doğal lider','otorite'],english_primary:"Emerged as the natural leader",alternatives:["Stepped into the leadership role","Rose to the top of the group"],register:'neutral',bridges:[{tr_fragment:'Grupta',tr_gloss:'in the group',en_fragment:'of the group',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'lider olarak öne çıktı',tr_gloss:'came forward as leader',en_fragment:'emerged as leader',bridge_type:'direct',explanation:'Öne çıkmak = emerge; doğrudan'}],cultural_insight:'"Natural leader" doğal lider; belirli kişilerin organik lider oluşu.',fluency_tip:'"He emerged as the natural leader within the first week."'},
{id:1223,category:'sosyal',tr:'Birinin arkasında fısıldadı',tags:['fısılda','arka','arkasından','gizli','dedikodu'],english_primary:"Whispered behind their back",alternatives:["Talked behind their back","Gossiped quietly"],register:'informal',bridges:[{tr_fragment:'Birinin arkasında',tr_gloss:'behind someone',en_fragment:'behind their back',bridge_type:'direct',explanation:'Doğrudan; arkasında = behind their back'},{tr_fragment:'fısıldadı',tr_gloss:'whispered',en_fragment:'whispered',bridge_type:'direct',explanation:'Fısıldamak = whisper; doğrudan'}],cultural_insight:'"Behind someone\'s back" ikincilik; yüze değil arkaya konuşmak.',fluency_tip:'"Stop whispering behind people\'s backs — say it to their face."'},
{id:1224,category:'sosyal',tr:'Bir topluluğa dahil oldu',tags:['topluluk','dahil','katıl','gir','grup'],english_primary:"Became part of a community",alternatives:["Joined the group","Found their tribe"],register:'neutral',bridges:[{tr_fragment:'Bir topluluğa',tr_gloss:'to a community',en_fragment:'a community',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'dahil oldu',tr_gloss:'was included in',en_fragment:'became part of',bridge_type:'direct',explanation:'"Dahil olmak" = become part of; doğrudan'}],cultural_insight:'"Find your tribe" kabileni bulmak; benzer insanlarla group oluşturmak.',fluency_tip:'"She finally found her tribe — people who understood her."'},
{id:1225,category:'sosyal',tr:'Zorlu birini sabırla dinledi',tags:['zorlu','sabır','dinle','anlayış','empati'],english_primary:"Patiently listened to a difficult person",alternatives:["Kept their cool while listening","Lent an ear without judgment"],register:'neutral',bridges:[{tr_fragment:'Zorlu birini',tr_gloss:'a difficult person',en_fragment:'a difficult person',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'sabırla dinledi',tr_gloss:'patiently listened',en_fragment:'patiently listened',bridge_type:'direct',explanation:'Doğrudan eşleşme'}],cultural_insight:'"Lend an ear" kulak ödünç vermek; aktif ve cömert dinleme.',fluency_tip:'"Just lend them an ear — sometimes people need to be heard."'},
{id:1226,category:'sosyal',tr:'Geçmişi bırakıp ilerledi',tags:['geçmiş','bırak','ilerle','affet','yeni başlangıç'],english_primary:"Let go of the past and moved on",alternatives:["Turned over a new leaf","Drew a line under it"],register:'neutral',bridges:[{tr_fragment:'Geçmişi bırakıp',tr_gloss:'letting go of the past',en_fragment:'let go of the past',bridge_type:'direct',explanation:'Doğrudan'},{tr_fragment:'ilerledi',tr_gloss:'moved forward',en_fragment:'moved on',bridge_type:'direct',explanation:'İlerlemek = move on/forward; doğrudan'}],cultural_insight:'"Turn over a new leaf" yeni bir yaprak çevirmek; kitabın yeni sayfası.',fluency_tip:'"She turned over a new leaf and never looked back."'},,
{id:1227,category:'deyimler',tr:'Bardağı taşırdı',tags:['bardak','taşır','son damla','sabır'],english_primary:"It was the last straw",alternatives:["It pushed things over the edge","It broke the camel's back"],register:'informal',bridges:[{tr_fragment:'Bardağı',tr_gloss:'the glass/cup',en_fragment:'straw',bridge_type:'cultural',explanation:'Türkçe taşan bardak, İngilizcede kıran saman çöpü'},{tr_fragment:'taşırdı',tr_gloss:'overflowed',en_fragment:'last',bridge_type:'transform',explanation:'Taşmak → son noktaya ulaşmak'}],cultural_insight:'İki kültürde de bir sınırın aşılmasını sembolize eder; nesne farklı.',fluency_tip:'"That meeting was the last straw." derken öfkenin biriktiğini ima edersin.'},
{id:1228,category:'deyimler',tr:'Ağzı bir karış açık kaldı',tags:['ağız','açık','şaşkın','deyim'],english_primary:"Their jaw dropped",alternatives:["They were left speechless","Their mouth fell open"],register:'informal',bridges:[{tr_fragment:'Ağzı',tr_gloss:'their mouth',en_fragment:'jaw',bridge_type:'transform',explanation:'Ağız → çene'},{tr_fragment:'bir karış açık kaldı',tr_gloss:'stayed open a span',en_fragment:'dropped',bridge_type:'transform',explanation:'Açık kalmak → düşmek; aşırı şaşkınlık'}],cultural_insight:'Bedensel tepki metaforu her iki dilde de benzerdir.',fluency_tip:'"My jaw dropped when I saw the price." şeklinde kullanılır.'},
{id:1229,category:'deyimler',tr:'Kafayı yedi',tags:['kafa','ye','deli','çıldır'],english_primary:"They lost their mind",alternatives:["They went crazy","They flipped out"],register:'informal',bridges:[{tr_fragment:'Kafayı',tr_gloss:'the head/mind',en_fragment:'mind',bridge_type:'direct',explanation:'Kafa = zihin'},{tr_fragment:'yedi',tr_gloss:'ate/consumed',en_fragment:'lost',bridge_type:'cultural',explanation:'Yemek → tüketmek; İngilizcede kaybetmek'}],cultural_insight:'Zihnin kontrolden çıkması iki dilde farklı metaforla anlatılır.',fluency_tip:'"She lost her mind over that deadline." şeklinde kullanılır.'},
{id:1230,category:'deyimler',tr:'Eli böğründe kaldı',tags:['el','böğür','çaresiz','boşa çık'],english_primary:"They were left empty-handed",alternatives:["They ended up with nothing","They were left high and dry"],register:'neutral',bridges:[{tr_fragment:'Eli',tr_gloss:'their hand',en_fragment:'empty-handed',bridge_type:'direct',explanation:'El doğrudan eşleşiyor'},{tr_fragment:'böğründe kaldı',tr_gloss:'stayed at their side',en_fragment:'left',bridge_type:'transform',explanation:'Böğründe kalmak → boşa çıkmak'}],cultural_insight:'Çaresizlik ve hayal kırıklığını anlatır.',fluency_tip:'"He was left empty-handed after the deal fell through."'},
{id:1231,category:'deyimler',tr:'Baltayı taşa vurdu',tags:['balta','taş','hata','geri tep'],english_primary:"It backfired on them",alternatives:["Their plan blew up in their face","They shot themselves in the foot"],register:'informal',bridges:[{tr_fragment:'Baltayı',tr_gloss:'the axe',en_fragment:'backfired',bridge_type:'cultural',explanation:'Balta taşa çarpmak → ters tepmek'},{tr_fragment:'taşa vurdu',tr_gloss:'hit the stone',en_fragment:'on them',bridge_type:'transform',explanation:'Taşa çarpmak → kendi aleyhine sonuç'}],cultural_insight:'Türkçe balta metaforu, İngilizcede geri tepme ya da ayağa kurşun sıkmak olur.',fluency_tip:'"The plan backfired on them spectacularly."'},
{id:1232,category:'deyimler',tr:'Gözden düştü',tags:['göz','düş','itibar','kaybetti'],english_primary:"They fell out of favor",alternatives:["They lost face","They fell from grace"],register:'neutral',bridges:[{tr_fragment:'Gözden',tr_gloss:'from (someone\'s) eyes',en_fragment:'favor',bridge_type:'cultural',explanation:'Gözden düşmek = onay kaybetmek'},{tr_fragment:'düştü',tr_gloss:'fell',en_fragment:'fell out of',bridge_type:'direct',explanation:'Düşmek → fall out of'}],cultural_insight:'İtibar kaybı her iki dilde de düşme metaforuyla anlatılır.',fluency_tip:'"He fell out of favor with management after missing that deadline."'},
{id:1233,category:'deyimler',tr:'Parmak ısırdı',tags:['parmak','ısır','şaşır','beğen'],english_primary:"They were blown away",alternatives:["They were utterly impressed","Their eyes lit up"],register:'informal',bridges:[{tr_fragment:'Parmak ısırdı',tr_gloss:'bit their finger',en_fragment:'blown away',bridge_type:'cultural',explanation:'Parmak ısırmak → büyük etki altında kalmak'}],cultural_insight:'Türkçede hayranlık veya şaşkınlık için; İngilizcede "blown away" daha yaygın.',fluency_tip:'"I was blown away by her performance."'},
{id:1234,category:'deyimler',tr:'Dili tutuldu',tags:['dil','tutul','susan','şoke'],english_primary:"They were struck dumb",alternatives:["They lost their voice","They were at a loss for words"],register:'neutral',bridges:[{tr_fragment:'Dili',tr_gloss:'their tongue',en_fragment:'dumb/words',bridge_type:'direct',explanation:'Dil = tongue; konuşamamak'},{tr_fragment:'tutuldu',tr_gloss:'was held/seized',en_fragment:'struck',bridge_type:'transform',explanation:'Tutulmak → çarpılmak'}],cultural_insight:'Şoke olunca susup kalmak evrensel bir tepkidir.',fluency_tip:'"She was struck dumb by the news."'},
{id:1235,category:'deyimler',tr:'Boynu büküldü',tags:['boyun','bük','üzgün','çaresiz'],english_primary:"They hung their head",alternatives:["They felt downcast","They were dejected"],register:'neutral',bridges:[{tr_fragment:'Boynu',tr_gloss:'their neck',en_fragment:'head',bridge_type:'transform',explanation:'Boyun bükülmesi → baş eğmek'},{tr_fragment:'büküldü',tr_gloss:'bent/drooped',en_fragment:'hung',bridge_type:'direct',explanation:'Büküldü → hung'}],cultural_insight:'Üzüntü ve çaresizliği ifade eden bedensel dil metaforu.',fluency_tip:'"He hung his head in shame."'},
{id:1236,category:'deyimler',tr:'Yüreği ağzına geldi',tags:['yürek','ağız','korku','şoke'],english_primary:"Their heart leapt into their throat",alternatives:["They were scared stiff","Their stomach dropped"],register:'informal',bridges:[{tr_fragment:'Yüreği',tr_gloss:'their heart',en_fragment:'heart',bridge_type:'direct',explanation:'Yürek = kalp'},{tr_fragment:'ağzına geldi',tr_gloss:'came to their mouth',en_fragment:'leapt into their throat',bridge_type:'transform',explanation:'Ağza gelmek → boğaza sıçramak; aşırı korku'}],cultural_insight:'Ani korku için her iki dilde de kalp hareketi metaforu kullanılır.',fluency_tip:'"My heart leapt into my throat when I heard the crash."'},
{id:1237,category:'deyimler',tr:'Kulak misafiri oldu',tags:['kulak','misafir','dinle','fark etmeden'],english_primary:"They overheard it",alternatives:["They happened to overhear","They caught it by chance"],register:'neutral',bridges:[{tr_fragment:'Kulak misafiri',tr_gloss:'ear guest',en_fragment:'overheard',bridge_type:'cultural',explanation:'Kulak misafiri = kasıtlı olmayan dinleme'},{tr_fragment:'oldu',tr_gloss:'became',en_fragment:'it',bridge_type:'drop',explanation:'Türkçe "oldu" işlevsel, İngilizcede karşılıksız düşüyor'}],cultural_insight:'"Misafir" metaforu kasıtsız dinlemenin kibar anlatımı.',fluency_tip:'"I overheard them talking about the surprise party."'},
{id:1238,category:'deyimler',tr:'Kabına sığmadı',tags:['kap','sığ','taşkın','coşku','sevinç'],english_primary:"They were bursting with excitement",alternatives:["They could barely contain themselves","They were over the moon"],register:'informal',bridges:[{tr_fragment:'Kabına',tr_gloss:'their container/vessel',en_fragment:'bursting',bridge_type:'transform',explanation:'Kaba sığmamak → patlamak üzere olmak'},{tr_fragment:'sığmadı',tr_gloss:'didn\'t fit',en_fragment:'with excitement',bridge_type:'cultural',explanation:'Sığmamak → içinde tutamamak'}],cultural_insight:'Duygunun taşması her iki dilde benzer metaforla anlatılır.',fluency_tip:'"She was bursting with excitement before the trip."'},
{id:1239,category:'deyimler',tr:'Sırtını dayayandı',tags:['sırt','daya','güven','destek'],english_primary:"They had someone to lean on",alternatives:["They had a strong backer","They had support behind them"],register:'neutral',bridges:[{tr_fragment:'Sırtını',tr_gloss:'their back',en_fragment:'lean on',bridge_type:'direct',explanation:'Sırt dayamak → birine yaslanmak'},{tr_fragment:'dayayandı',tr_gloss:'what they leaned on',en_fragment:'someone',bridge_type:'transform',explanation:'Dayanan kişi → destek olan'}],cultural_insight:'Güven ve destek için bedensel metafor her iki dilde de güçlü.',fluency_tip:'"It helped knowing I had someone to lean on."'},
{id:1240,category:'deyimler',tr:'Eli uzun',tags:['el','uzun','nüfuz','güç'],english_primary:"They have a long reach",alternatives:["They have a lot of pull","They have far-reaching influence"],register:'neutral',bridges:[{tr_fragment:'Eli',tr_gloss:'their hand/arm',en_fragment:'reach',bridge_type:'direct',explanation:'El uzunluğu → etki alanı'},{tr_fragment:'uzun',tr_gloss:'long',en_fragment:'long',bridge_type:'direct',explanation:'Uzun → long; doğrudan'}],cultural_insight:'Güç ve nüfuz için el metaforu her iki dilde de kullanılır.',fluency_tip:'"Be careful — she has a very long reach in this industry."'},
{id:1241,category:'deyimler',tr:'Ayakları yere basmadı',tags:['ayak','yer','mutlu','uçmak'],english_primary:"They were walking on air",alternatives:["They were floating on cloud nine","They were on top of the world"],register:'informal',bridges:[{tr_fragment:'Ayakları',tr_gloss:'their feet',en_fragment:'walking',bridge_type:'direct',explanation:'Ayaklar → walking'},{tr_fragment:'yere basmadı',tr_gloss:'didn\'t touch the ground',en_fragment:'on air',bridge_type:'transform',explanation:'Yere basmamak → havada yürümek; mutluluktan uçmak'}],cultural_insight:'Sevinçten uçmak evrensel metafor; İngilizcede "walking on air" klasik.',fluency_tip:'"After getting the promotion she was walking on air."'},
{id:1242,category:'deyimler',tr:'Ağzından baklayı çıkardı',tags:['ağız','bakla','itiraf','açıkla'],english_primary:"They finally spilled the beans",alternatives:["They came clean","They let the cat out of the bag"],register:'informal',bridges:[{tr_fragment:'Ağzından',tr_gloss:'from their mouth',en_fragment:'spilled',bridge_type:'transform',explanation:'Ağızdan çıkmak → dökmek'},{tr_fragment:'baklayı çıkardı',tr_gloss:'took out the bean',en_fragment:'the beans',bridge_type:'cultural',explanation:'Bakla → fasulye; gizli bilgi metaforu'}],cultural_insight:'Gizli bir şeyin açığa çıkması için her iki dilde de yiyecek metaforu kullanılır.',fluency_tip:'"He finally spilled the beans about the surprise party."'},
{id:1243,category:'deyimler',tr:'Dağı taşı inletti',tags:['dağ','taş','inle','gürültü','ağla'],english_primary:"They made the walls shake",alternatives:["They raised the roof","They made a deafening noise"],register:'informal',bridges:[{tr_fragment:'Dağı taşı',tr_gloss:'mountains and rocks',en_fragment:'walls',bridge_type:'transform',explanation:'Doğa öğeleri → bina öğeleri'},{tr_fragment:'inletti',tr_gloss:'made groan',en_function:'shake',bridge_type:'transform',explanation:'İnletmek → sallamak'}],cultural_insight:'Türkçede doğa imgesiyle büyük ses; İngilizcede yapı imgesiyle.',fluency_tip:'"The crowd raised the roof when the team scored."'},
{id:1244,category:'deyimler',tr:'Tuttuğunu koparır',tags:['tut','kopar','kararlı','başar'],english_primary:"They always get what they go after",alternatives:["They're a real go-getter","They always pull it off"],register:'informal',bridges:[{tr_fragment:'Tuttuğunu',tr_gloss:'what they grab',en_fragment:'what they go after',bridge_type:'transform',explanation:'Tutmak → peşinden gitmek'},{tr_fragment:'koparır',tr_gloss:'tears off/gets',en_fragment:'get',bridge_type:'transform',explanation:'Koparmak → elde etmek'}],cultural_insight:'Kararlılık ve başarı için güçlü deyim.',fluency_tip:'"She\'s a real go-getter — always gets what she goes after."'},
{id:1245,category:'deyimler',tr:'İki yakası bir araya gelmedi',tags:['yaka','araya gel','maddi','geçim'],english_primary:"They could barely make ends meet",alternatives:["They were always strapped for cash","They lived paycheck to paycheck"],register:'neutral',bridges:[{tr_fragment:'İki yakası',tr_gloss:'two sides/lapels',en_fragment:'ends',bridge_type:'cultural',explanation:'Yakalar buluşmak → uçlar buluşmak; geçim sağlamak'},{tr_fragment:'bir araya gelmedi',tr_gloss:'didn\'t come together',en_fragment:'barely make',bridge_type:'transform',explanation:'Bir araya gelmemek → zar zor yetmek'}],cultural_insight:'Geçim sıkıntısı için her iki dilde de "buluşma" metaforu.',fluency_tip:'"They could barely make ends meet on a single salary."'},
{id:1246,category:'deyimler',tr:'Aklını başına devşirdi',tags:['akıl','baş','topla','kendine gel'],english_primary:"They pulled themselves together",alternatives:["They came to their senses","They got their act together"],register:'neutral',bridges:[{tr_fragment:'Aklını',tr_gloss:'their mind/sense',en_fragment:'themselves',bridge_type:'transform',explanation:'Akıl → kendisi; toparlanmak'},{tr_fragment:'başına devşirdi',tr_gloss:'gathered to their head',en_fragment:'pulled together',bridge_type:'transform',explanation:'Başına toplamak → bir araya çekmek'}],cultural_insight:'Zihinsel toparlanma için her iki dilde de güçlü ifade.',fluency_tip:'"She pulled herself together before the big presentation."'},
{id:1247,category:'deyimler',tr:'Gözü açıldı',tags:['göz','aç','anla','fark et','uyar'],english_primary:"Their eyes were opened",alternatives:["They saw the light","They had an eye-opener"],register:'neutral',bridges:[{tr_fragment:'Gözü',tr_gloss:'their eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz → eye; doğrudan'},{tr_fragment:'açıldı',tr_gloss:'opened',en_fragment:'were opened',bridge_type:'direct',explanation:'Açılmak → to be opened'}],cultural_insight:'Gerçeği görmek için açılan göz metaforu evrensel.',fluency_tip:'"That documentary was a real eye-opener for me."'},
{id:1248,category:'deyimler',tr:'Kulağına kar suyu kaçtı',tags:['kulak','kar','su','şaşır','beklenmedik'],english_primary:"It came out of nowhere for them",alternatives:["It caught them totally off guard","They didn't see it coming"],register:'informal',bridges:[{tr_fragment:'Kulağına',tr_gloss:'into their ear',en_fragment:'out of nowhere',bridge_type:'cultural',explanation:'Kulağa kar suyu kaçması = ani şaşkınlık'},{tr_fragment:'kar suyu kaçtı',tr_gloss:'cold water got in',en_fragment:'caught them off guard',bridge_type:'cultural',explanation:'Soğuk su = şok; beklenmedik etki'}],cultural_insight:'Türkçeye özgü deyim; İngilizcede "caught off guard" daha yaygın.',fluency_tip:'"The announcement caught them completely off guard."'},
{id:1249,category:'deyimler',tr:'Burnunun dibinde',tags:['burun','dip','yakın','gözden kaçır'],english_primary:"Right under their nose",alternatives:["Staring them in the face","Just in front of them"],register:'informal',bridges:[{tr_fragment:'Burnunun',tr_gloss:'of their nose',en_fragment:'under their nose',bridge_type:'direct',explanation:'Burun → nose; doğrudan'},{tr_fragment:'dibinde',tr_gloss:'at the bottom/base of',en_fragment:'right',bridge_type:'transform',explanation:'Dip → yakın mesafe vurgusu'}],cultural_insight:'Gözden kaçırılan bir şeyin yakınlığı için her iki dilde de burun metaforu.',fluency_tip:'"The answer was right under their nose the whole time."'},
{id:1250,category:'deyimler',tr:'Ateş olmayan yerden duman çıkmaz',tags:['ateş','duman','sebep','sonuç'],english_primary:"There's no smoke without fire",alternatives:["Where there's smoke, there's fire","Every rumor has a grain of truth"],register:'neutral',bridges:[{tr_fragment:'Ateş olmayan yerden',tr_gloss:'from a place with no fire',en_fragment:'without fire',bridge_type:'direct',explanation:'Ateş → fire; doğrudan'},{tr_fragment:'duman çıkmaz',tr_gloss:'smoke doesn\'t come out',en_fragment:'there\'s no smoke',bridge_type:'transform',explanation:'Çıkmaz → there\'s no'}],cultural_insight:'Bu atasözü neredeyse bire bir eşleşiyor; kültürler arası nadir örnek.',fluency_tip:'"There\'s no smoke without fire — I\'d look into those rumors."'},
{id:1251,category:'deyimler',tr:'Yüzüne gözüne bulaştırdı',tags:['yüz','göz','bulaştır','berbat et'],english_primary:"They made a complete mess of it",alternatives:["They botched it badly","They bungled the whole thing"],register:'informal',bridges:[{tr_fragment:'Yüzüne gözüne',tr_gloss:'all over their face and eyes',en_fragment:'complete mess',bridge_type:'cultural',explanation:'Yüze bulaşmak → mahcubiyet ve hata bütünü'},{tr_fragment:'bulaştırdı',tr_gloss:'smeared/got dirty',en_fragment:'made of it',bridge_type:'transform',explanation:'Bulaştırmak → berbat etmek'}],cultural_insight:'Başarısızlık ve utancın bedensel imgelerle anlatımı.',fluency_tip:'"He made a complete mess of the client presentation."'},
{id:1252,category:'deyimler',tr:'Gözü kara',tags:['göz','kara','cesur','gözü pek'],english_primary:"They were fearless",alternatives:["They were bold as brass","They had nerves of steel"],register:'neutral',bridges:[{tr_fragment:'Gözü',tr_gloss:'their eye',en_fragment:'fearless',bridge_type:'cultural',explanation:'Gözü kara = korkusuz; karanlık göz metaforu'},{tr_fragment:'kara',tr_gloss:'black/dark',en_fragment:'nerves of steel',bridge_type:'cultural',explanation:'Kara → sert, güçlü; çelik sinirler'}],cultural_insight:'Cesareti renk metaforuyla anlatmak Türkçeye özgü.',fluency_tip:'"She was fearless when presenting to the board."'},
{id:1253,category:'deyimler',tr:'Kuyruğunu kıstırdı',tags:['kuyruk','kıstır','çekil','kork'],english_primary:"They tucked their tail between their legs",alternatives:["They backed down in shame","They retreated cowardly"],register:'informal',bridges:[{tr_fragment:'Kuyruğunu',tr_gloss:'their tail',en_fragment:'tail',bridge_type:'direct',explanation:'Kuyruk → tail; doğrudan'},{tr_fragment:'kıstırdı',tr_gloss:'squeezed/tucked',en_fragment:'tucked between their legs',bridge_type:'transform',explanation:'Kıstırmak → bacaklar arasına sokmak'}],cultural_insight:'Köpek davranışından alınan korkaklık metaforu her iki dilde güçlü.',fluency_tip:'"After losing the argument, he tucked his tail between his legs."'},
{id:1254,category:'deyimler',tr:'Taş üstüne taş koymadı',tags:['taş','koy','yıkım','bırak'],english_primary:"They didn't leave a stone on a stone",alternatives:["They razed everything","They left nothing standing"],register:'neutral',bridges:[{tr_fragment:'Taş üstüne taş',tr_gloss:'stone upon stone',en_fragment:'a stone on a stone',bridge_type:'direct',explanation:'Birebir eşleşen inşaat metaforu'},{tr_fragment:'koymadı',tr_gloss:'didn\'t place',en_fragment:'didn\'t leave',bridge_type:'transform',explanation:'Koymamak → bırakmamak'}],cultural_insight:'Yıkımı taş imgesiyle anlatmak İngilizcede de mevcuttur.',fluency_tip:'"The storm didn\'t leave a stone on a stone in the old part of town."'},
{id:1255,category:'deyimler',tr:'Sözünde durdu',tags:['söz','dur','güven','tut'],english_primary:"They kept their word",alternatives:["They stayed true to their promise","They followed through"],register:'neutral',bridges:[{tr_fragment:'Sözünde',tr_gloss:'in their word/promise',en_fragment:'their word',bridge_type:'direct',explanation:'Söz = word; doğrudan'},{tr_fragment:'durdu',tr_gloss:'stood/stayed',en_fragment:'kept',bridge_type:'transform',explanation:'Durmak → korumak, tutmak'}],cultural_insight:'Söze sadakat için her iki dilde de kelime/duruş metaforu.',fluency_tip:'"He always keeps his word — that\'s why we trust him."'},
{id:1256,category:'deyimler',tr:'Gözünü daldan budaktan sakınmadı',tags:['göz','dal','budak','cesaret','risk'],english_primary:"They didn't bat an eye",alternatives:["They went for it without hesitation","They charged ahead fearlessly"],register:'informal',bridges:[{tr_fragment:'Gözünü',tr_gloss:'their eye',en_fragment:'bat an eye',bridge_type:'direct',explanation:'Göz → eye'},{tr_fragment:'sakınmadı',tr_gloss:'didn\'t protect',en_fragment:'didn\'t',bridge_type:'direct',explanation:'Sakınmamak → tereddüt etmemek'}],cultural_insight:'Dal ve budaktan sakınmama → keskin dallara bakmadan geçmek; cesaret.',fluency_tip:'"She didn\'t bat an eye when asked to lead the project."'},
{id:1257,category:'deyimler',tr:'Kılı kıpırdamadı',tags:['kıl','kıpırda','soğukkanlı','etkilenme'],english_primary:"They didn't flinch",alternatives:["They kept a cool head","Not a hair moved on them"],register:'neutral',bridges:[{tr_fragment:'Kılı',tr_gloss:'their hair/bristle',en_fragment:'flinch',bridge_type:'cultural',explanation:'Kıl kıpırdamamak → tepkisiz kalmak'},{tr_fragment:'kıpırdamadı',tr_gloss:'didn\'t stir',en_fragment:'didn\'t',bridge_type:'direct',explanation:'Kıpırdamamak → not moving'}],cultural_insight:'Soğukkanlılığı kıl imgesiyle anlatmak Türkçeye özgü.',fluency_tip:'"He didn\'t flinch when they challenged his decision."'},
{id:1258,category:'deyimler',tr:'Göz yumdu',tags:['göz','yum','görmezden gel','hoş gör'],english_primary:"They turned a blind eye",alternatives:["They looked the other way","They let it slide"],register:'neutral',bridges:[{tr_fragment:'Göz yumdu',tr_gloss:'closed their eye',en_fragment:'turned a blind eye',bridge_type:'transform',explanation:'Göz yummak → kör bir göz döndürmek; görmezden gelmek'}],cultural_insight:'Görmezden gelmeyi kapalı göz imgesiyle anlatmak her iki dilde güçlü.',fluency_tip:'"Management turned a blind eye to the safety issues."'},
{id:1259,category:'deyimler',tr:'Dişini sıktı',tags:['diş','sık','dayan','sabret'],english_primary:"They gritted their teeth",alternatives:["They toughed it out","They bit the bullet"],register:'neutral',bridges:[{tr_fragment:'Dişini',tr_gloss:'their teeth',en_fragment:'teeth',bridge_type:'direct',explanation:'Diş → teeth; doğrudan'},{tr_fragment:'sıktı',tr_gloss:'clenched/pressed',en_fragment:'gritted',bridge_type:'direct',explanation:'Sıkmak → grit'}],cultural_insight:'Dayanma ve sabırseverlik için diş imgesi her iki dilde kullanılır.',fluency_tip:'"She gritted her teeth and got through the difficult week."'},
{id:1260,category:'deyimler',tr:'Burnunu sokmak istedi',tags:['burun','sok','karış','müdahale'],english_primary:"They wanted to stick their nose in it",alternatives:["They tried to meddle","They attempted to butt in"],register:'informal',bridges:[{tr_fragment:'Burnunu',tr_gloss:'their nose',en_fragment:'nose',bridge_type:'direct',explanation:'Burun → nose; doğrudan'},{tr_fragment:'sokmak istedi',tr_gloss:'wanted to insert',en_fragment:'stick in',bridge_type:'direct',explanation:'Sokmak → stick into'}],cultural_insight:'Burun sokmak = müdahil olmak; her iki dilde aynı metafor.',fluency_tip:'"He always wants to stick his nose into other people\'s business."'},
{id:1261,category:'deyimler',tr:'Yolu açıldı',tags:['yol','aç','imkân','fırsat'],english_primary:"The path opened up for them",alternatives:["Opportunities opened up","Doors were opened for them"],register:'neutral',bridges:[{tr_fragment:'Yolu',tr_gloss:'their path/way',en_fragment:'path',bridge_type:'direct',explanation:'Yol → path; doğrudan'},{tr_fragment:'açıldı',tr_gloss:'was opened',en_fragment:'opened up',bridge_type:'direct',explanation:'Açılmak → to open up'}],cultural_insight:'Fırsatın önünde engel kalmadığında yol açılır; evrensel metafor.',fluency_tip:'"After the promotion, the path really opened up for her."'},
{id:1262,category:'deyimler',tr:'Mühlet tanıdı',tags:['mühlet','tanı','süre','izin'],english_primary:"They gave them a grace period",alternatives:["They extended a deadline","They bought them some time"],register:'neutral',bridges:[{tr_fragment:'Mühlet',tr_gloss:'grace period/deadline extension',en_fragment:'grace period',bridge_type:'direct',explanation:'Mühlet = grace period; doğrudan'},{tr_fragment:'tanıdı',tr_gloss:'granted/recognized',en_fragment:'gave',bridge_type:'transform',explanation:'Tanımak → vermek; süre bağışı'}],cultural_insight:'Süre tanıma iş ve hukuk bağlamında her iki dilde de yaygın.',fluency_tip:'"The bank gave them a 30-day grace period on the payment."'},
{id:1263,category:'deyimler',tr:'Canını dişine takarak çalıştı',tags:['can','diş','tak','çalış','inat'],english_primary:"They worked their fingers to the bone",alternatives:["They slogged it out","They put in blood, sweat, and tears"],register:'informal',bridges:[{tr_fragment:'Canını dişine takarak',tr_gloss:'gripping their life with their teeth',en_fragment:'to the bone',bridge_type:'cultural',explanation:'Can + diş → yaşamsal güç; kemik → son sınır'},{tr_fragment:'çalıştı',tr_gloss:'worked',en_fragment:'worked their fingers',bridge_type:'transform',explanation:'Çalışmak → parmaklar çalışmak'}],cultural_insight:'Aşırı çalışma için beden parçası metaforu her iki dilde farklı ama aynı yoğunluk.',fluency_tip:'"She worked her fingers to the bone to finish the project on time."'},
{id:1264,category:'deyimler',tr:'Pabucu dama atıldı',tags:['pabuç','dam','at','işi bitti','moda geçti'],english_primary:"They were cast aside",alternatives:["They were put out to pasture","They were sidelined"],register:'informal',bridges:[{tr_fragment:'Pabucu',tr_gloss:'their shoe',en_fragment:'cast aside',bridge_type:'cultural',explanation:'Eski pabucu atmak → artık işe yaramamak'},{tr_fragment:'dama atıldı',tr_gloss:'thrown on the roof',en_fragment:'sidelined',bridge_type:'cultural',explanation:'Dama atmak → kenara koymak'}],cultural_insight:'Türkçeye özgü güçlü mecaz; pabuç = eski ve işe yaramaz.',fluency_tip:'"After 20 years, he was simply cast aside when the company restructured."'},
{id:1265,category:'deyimler',tr:'Eline su dökemez',tags:['el','su','dök','yetersiz','kıyas'],english_primary:"They can't hold a candle to them",alternatives:["They're not even in the same league","They pale in comparison"],register:'informal',bridges:[{tr_fragment:'Eline su dökemez',tr_gloss:'can\'t pour water on their hand',en_fragment:'can\'t hold a candle',bridge_type:'cultural',explanation:'Türkçede hizmet etme imgesi; İngilizcede mum tutma imgesi'},{tr_fragment:'',tr_gloss:'',en_fragment:'to them',bridge_type:'drop',explanation:'Türkçede özne zımni'}],cultural_insight:'Yetersizlik kıyaslaması için metafor farklı ama anlam aynı.',fluency_tip:'"That restaurant can\'t hold a candle to the one downtown."'},
{id:1266,category:'deyimler',tr:'Tencere yuvarlanmış kapağını bulmuş',tags:['tencere','yuvarlak','kapak','eş','benzer'],english_primary:"Birds of a feather flock together",alternatives:["Like attracts like","They found their match"],register:'informal',bridges:[{tr_fragment:'Tencere yuvarlanmış kapağını bulmuş',tr_gloss:'the pot rolled and found its lid',en_fragment:'birds of a feather',bridge_type:'cultural',explanation:'Tencere+kapak → benzer kişilerin bir araya gelmesi'},{tr_fragment:'',tr_gloss:'',en_fragment:'flock together',bridge_type:'add',explanation:'İngilizcede hareketi belirten fiil eklendi'}],cultural_insight:'Her iki dilde benzer kişilerin çekildiğini söylüyor; nesne tamamen farklı.',fluency_tip:'"They\'re perfect together — birds of a feather really do flock together."'},
{id:1267,category:'deyimler',tr:'Deveye hendek atlatmak',tags:['deve','hendek','zor','imkânsız','abartı'],english_primary:"Like getting blood from a stone",alternatives:["Like moving a mountain","An impossible ask"],register:'informal',bridges:[{tr_fragment:'Deveye',tr_gloss:'to a camel',en_fragment:'from a stone',bridge_type:'cultural',explanation:'Deve → kaya; imkânsız nesne metaforu değişiyor'},{tr_fragment:'hendek atlatmak',tr_gloss:'making it jump a ditch',en_fragment:'getting blood',bridge_type:'cultural',explanation:'Hendek atlatmak → kan almak; imkânsız eylem'}],cultural_insight:'İmkânsızlık için her iki kültür farklı imgeler kullanır.',fluency_tip:'"Convincing him to change his mind is like getting blood from a stone."'},
{id:1268,category:'deyimler',tr:'Elini çabuk tuttu',tags:['el','çabuk','hızlı','tez'],english_primary:"They moved quickly",alternatives:["They got a move on","They wasted no time"],register:'neutral',bridges:[{tr_fragment:'Elini',tr_gloss:'their hand',en_fragment:'moved',bridge_type:'cultural',explanation:'El hızı → genel hareket hızı'},{tr_fragment:'çabuk tuttu',tr_gloss:'held fast/quickly',en_fragment:'quickly',bridge_type:'direct',explanation:'Çabuk → quickly; doğrudan'}],cultural_insight:'El hızı = iş hızı; yetkinlik metaforu.',fluency_tip:'"They need to move quickly if they want to close the deal."'},
{id:1269,category:'deyimler',tr:'Maskeyi düşürdü',tags:['maske','düşür','gerçek yüz','aç'],english_primary:"The mask slipped",alternatives:["Their true face was revealed","They dropped the act"],register:'neutral',bridges:[{tr_fragment:'Maskeyi',tr_gloss:'the mask',en_fragment:'mask',bridge_type:'direct',explanation:'Maske → mask; doğrudan'},{tr_fragment:'düşürdü',tr_gloss:'dropped',en_fragment:'slipped',bridge_type:'transform',explanation:'Düşürmek → kayıp; maske metaforu'}],cultural_insight:'Gerçek kimliğin ortaya çıkması için maske metaforu evrensel.',fluency_tip:'"The mask slipped during the interview and they saw what he was really like."'},
{id:1270,category:'deyimler',tr:'Çuvaldızı kendine batırdı',tags:['çuvaldız','bat','öz eleştiri','hesap'],english_primary:"They turned the finger on themselves",alternatives:["They took a hard look in the mirror","They held themselves accountable"],register:'neutral',bridges:[{tr_fragment:'Çuvaldızı',tr_gloss:'the sacking needle',en_fragment:'finger',bridge_type:'cultural',explanation:'Sivri alet → eleştiri imgesi'},{tr_fragment:'kendine batırdı',tr_gloss:'stabbed into themselves',en_fragment:'on themselves',bridge_type:'transform',explanation:'Batırmak → çevirmek; öz eleştiri'}],cultural_insight:'Öz eleştiriyi keskin alet metaforuyla anlatmak Türkçeye özgüdür.',fluency_tip:'"He held himself accountable and didn\'t blame anyone else."'},
{id:1271,category:'deyimler',tr:'Kazın ayağı öyle değil',tags:['kaz','ayak','yanlış anla','aslında'],english_primary:"That's not how things actually stand",alternatives:["That's not the way it is","You've got it wrong"],register:'informal',bridges:[{tr_fragment:'Kazın ayağı',tr_gloss:'the goose\'s foot',en_fragment:'how things actually stand',bridge_type:'cultural',explanation:'Kaz ayağı = gerçek durum; Türkçeye özgü'},{tr_fragment:'öyle değil',tr_gloss:'isn\'t like that',en_fragment:'not',bridge_type:'direct',explanation:'Değil → not'}],cultural_insight:'Yanılgıyı düzeltmek için Türkçeye özgü güçlü deyim.',fluency_tip:'"That\'s not how things actually stand — let me explain."'},
{id:1272,category:'deyimler',tr:'Tüyleri diken diken oldu',tags:['tüy','diken','ürper','korku','heyecan'],english_primary:"They got goosebumps",alternatives:["Their skin crawled","A chill ran down their spine"],register:'informal',bridges:[{tr_fragment:'Tüyleri',tr_gloss:'their feathers/hair',en_fragment:'goosebumps',bridge_type:'transform',explanation:'Tüyler → kazın tüyleri gibi kabarma'},{tr_fragment:'diken diken oldu',tr_gloss:'became thorny/prickly',en_fragment:'got',bridge_type:'transform',explanation:'Diken diken → kabarık noktalı deri'}],cultural_insight:'Korku veya heyecanın deri belirtisi her iki dilde de hayvan imgesiyle.',fluency_tip:'"I got goosebumps when they played the opening scene."'},
{id:1273,category:'deyimler',tr:'Döktürdü',tags:['dök','performans','müthiş','harika'],english_primary:"They nailed it",alternatives:["They killed it","They absolutely crushed it"],register:'informal',bridges:[{tr_fragment:'Döktürdü',tr_gloss:'poured it out',en_fragment:'nailed it',bridge_type:'cultural',explanation:'Dökmek → performansı ortaya koymak'},{tr_fragment:'',tr_gloss:'',en_fragment:'it',bridge_type:'add',explanation:'İngilizcede hedef nesne ekleniyor'}],cultural_insight:'Türkçede "dökmek" performans zaferini anlatır; İngilizcede çakma imgesi.',fluency_tip:'"She absolutely nailed her audition."'},
{id:1274,category:'deyimler',tr:'Suya düşen hayaller',tags:['su','düş','hayal','hayal kırıklığı'],english_primary:"Their dreams went up in smoke",alternatives:["Their hopes were dashed","Their plans fell through"],register:'neutral',bridges:[{tr_fragment:'Suya düşen',tr_gloss:'fallen into water',en_fragment:'went up in smoke',bridge_type:'cultural',explanation:'Suya düşmek → yok olmak; duman metaforu farklı'},{tr_fragment:'hayaller',tr_gloss:'dreams',en_fragment:'dreams',bridge_type:'direct',explanation:'Hayal = dream; doğrudan'}],cultural_insight:'Türkçede su, İngilizcede duman; iki farklı yıkım imgesi.',fluency_tip:'"After the funding fell through, their dreams went up in smoke."'},
{id:1275,category:'deyimler',tr:'Hava cıva',tags:['hava','cıva','boş','anlamsız','şişirme'],english_primary:"All smoke and mirrors",alternatives:["Full of hot air","Pure fluff"],register:'informal',bridges:[{tr_fragment:'Hava',tr_gloss:'air',en_fragment:'smoke',bridge_type:'cultural',explanation:'Hava = boşluk; duman da aldatıcı görünüm'},{tr_fragment:'cıva',tr_gloss:'mercury/quicksilver',en_fragment:'mirrors',bridge_type:'cultural',explanation:'Cıva = kaygan, yanıltıcı; ayna = yansıma'}],cultural_insight:'Yanıltıcı görüntüyü anlatmak için her iki dilde farklı imgeler kullanılır.',fluency_tip:'"That company\'s pitch was all smoke and mirrors."'},
{id:1276,category:'deyimler',tr:'Burnunu havaya kaldırdı',tags:['burun','hava','kibirli','küçümse'],english_primary:"They turned their nose up",alternatives:["They looked down their nose","They acted high and mighty"],register:'informal',bridges:[{tr_fragment:'Burnunu',tr_gloss:'their nose',en_fragment:'nose',bridge_type:'direct',explanation:'Burun → nose; doğrudan'},{tr_fragment:'havaya kaldırdı',tr_gloss:'lifted to the air',en_fragment:'turned up',bridge_type:'transform',explanation:'Havaya kaldırmak → yukarı çevirmek'}],cultural_insight:'Kibir için burun hareketi metaforu her iki dilde güçlü.',fluency_tip:'"She turned her nose up at the budget restaurant."'},
{id:1277,category:'deyimler',tr:'Kendini bilmez',tags:['kendini bil','saygısız','haddini aş'],english_primary:"They don't know their place",alternatives:["They have no self-awareness","They overstep constantly"],register:'informal',bridges:[{tr_fragment:'Kendini',tr_gloss:'themselves',en_fragment:'their place',bridge_type:'cultural',explanation:'Kendini bilmek → haddi bilmek; yer/sınır metaforu'},{tr_fragment:'bilmez',tr_gloss:'doesn\'t know',en_fragment:'don\'t know',bridge_type:'direct',explanation:'Bilmemek → not knowing'}],cultural_insight:'Sosyal sınır aşımını Türkçe öz bilgi eksikliğiyle anlatır.',fluency_tip:'"He constantly oversteps — he really doesn\'t know his place."'},
{id:1278,category:'deyimler',tr:'Kafa kafaya verdi',tags:['kafa','ver','ortak','düşün','planlama'],english_primary:"They put their heads together",alternatives:["They brainstormed together","They collaborated closely"],register:'neutral',bridges:[{tr_fragment:'Kafa kafaya',tr_gloss:'head to head',en_fragment:'heads together',bridge_type:'direct',explanation:'Kafa → head; doğrudan'},{tr_fragment:'verdi',tr_gloss:'gave',en_fragment:'put',bridge_type:'transform',explanation:'Vermek → bir araya getirmek'}],cultural_insight:'Ortak düşünmeyi baş imgesiyle anlatmak her iki dilde birebir.',fluency_tip:'"They put their heads together and came up with a great solution."'},
{id:1279,category:'deyimler',tr:'Kirli çamaşırlarını ortaya döktü',tags:['çamaşır','kirli','döktür','ifşa'],english_primary:"They aired their dirty laundry",alternatives:["They exposed their private matters","They washed their dirty linen in public"],register:'informal',bridges:[{tr_fragment:'Kirli çamaşırlarını',tr_gloss:'their dirty laundry',en_fragment:'dirty laundry',bridge_type:'direct',explanation:'Kirli çamaşır → dirty laundry; birebir'},{tr_fragment:'ortaya döktü',tr_gloss:'poured out into the open',en_fragment:'aired',bridge_type:'transform',explanation:'Dökmek → havalandırmak'}],cultural_insight:'Özel sorunların herkese açılması için her iki dilde de çamaşır metaforu.',fluency_tip:'"She aired their dirty laundry in a very public interview."'},
{id:1280,category:'deyimler',tr:'Yüzü tutmadı',tags:['yüz','tut','utanç','cesaret'],english_primary:"They didn't have the nerve",alternatives:["They couldn't bring themselves to do it","They lacked the guts"],register:'informal',bridges:[{tr_fragment:'Yüzü',tr_gloss:'their face',en_fragment:'nerve',bridge_type:'cultural',explanation:'Yüzü tutmak → yüz bulmak; cesaret'},{tr_fragment:'tutmadı',tr_gloss:'didn\'t hold',en_fragment:'didn\'t have',bridge_type:'transform',explanation:'Tutmamak → sahip olmamak'}],cultural_insight:'Türkçede yüz = onur/cesaret; İngilizcede sinir = cesaret.',fluency_tip:'"She didn\'t have the nerve to confront him directly."'},
{id:1281,category:'deyimler',tr:'Ağzı açık kaldı',tags:['ağız','açık','şaşır','beklenmedik'],english_primary:"They were left speechless",alternatives:["Their jaw dropped","They were dumbfounded"],register:'informal',bridges:[{tr_fragment:'Ağzı',tr_gloss:'their mouth',en_fragment:'speechless',bridge_type:'cultural',explanation:'Açık kalan ağız → konuşamama'},{tr_fragment:'açık kaldı',tr_gloss:'stayed open',en_fragment:'left',bridge_type:'transform',explanation:'Açık kalmak → speechless bırakmak'}],cultural_insight:'Şaşkınlığın fiziksel belirtisi evrensel.',fluency_tip:'"She was completely speechless when she won the award."'},
{id:1282,category:'deyimler',tr:'Kulağı delik',tags:['kulak','delik','dikkatli','dinle'],english_primary:"They keep their ear to the ground",alternatives:["They\'re always in the know","They stay tuned in"],register:'neutral',bridges:[{tr_fragment:'Kulağı',tr_gloss:'their ear',en_fragment:'ear',bridge_type:'direct',explanation:'Kulak → ear; doğrudan'},{tr_fragment:'delik',tr_gloss:'holed/pierced',en_fragment:'to the ground',bridge_type:'cultural',explanation:'Kulak deliği → yere dayalı kulak; bilgi almak için dikkat'}],cultural_insight:'Dikkatli dinlemeyi kulak imgesiyle anlatmak her iki dilde benzer.',fluency_tip:'"She always keeps her ear to the ground for industry news."'},
{id:1283,category:'deyimler',tr:'Ağzını aramak',tags:['ağız','ara','öğren','yokla'],english_primary:"To sound someone out",alternatives:["To fish for information","To probe them"],register:'neutral',bridges:[{tr_fragment:'Ağzını',tr_gloss:'their mouth',en_fragment:'sound out',bridge_type:'cultural',explanation:'Ağzı aramak → ne düşündüğünü öğrenmek'},{tr_fragment:'aramak',tr_gloss:'to search',en_fragment:'someone',bridge_type:'transform',explanation:'Aramak → araştırmak, yoklamak'}],cultural_insight:'Düşünce yoklamayı ağız metaforuyla anlatmak Türkçeye özgü.',fluency_tip:'"She tried to sound out her manager before making the request."'},
{id:1284,category:'deyimler',tr:'Ağzından yel alıyor',tags:['ağız','yel','boş','anlamsız'],english_primary:"They\'re just blowing hot air",alternatives:["Their words are empty","They talk a big game"],register:'informal',bridges:[{tr_fragment:'Ağzından',tr_gloss:'from their mouth',en_fragment:'blowing',bridge_type:'transform',explanation:'Ağızdan çıkmak → üflemek'},{tr_fragment:'yel alıyor',tr_gloss:'the wind takes it',en_fragment:'hot air',bridge_type:'cultural',explanation:'Yel = rüzgar; boş hava'}],cultural_insight:'Boş konuşmayı rüzgar/hava metaforuyla anlatmak yaygın.',fluency_tip:'"Don\'t listen to him — he\'s just blowing hot air."'},
{id:1285,category:'deyimler',tr:'Yeri gelince',tags:['yer','gel','zaman','durum','uygun'],english_primary:"When the time is right",alternatives:["At the appropriate moment","When the occasion calls for it"],register:'neutral',bridges:[{tr_fragment:'Yeri gelince',tr_gloss:'when its place comes',en_fragment:'when the time is right',bridge_type:'transform',explanation:'Yer → zaman; yer/zaman metaforu'}],cultural_insight:'"Yer" hem mekân hem zaman anlamına gelir; esnek kullanım.',fluency_tip:'"We\'ll address that when the time is right."'},
{id:1286,category:'deyimler',tr:'İşi sıkı tuttu',tags:['iş','sıkı','tut','disiplin','kontrol'],english_primary:"They kept a tight grip on things",alternatives:["They ran a tight ship","They kept everything in check"],register:'neutral',bridges:[{tr_fragment:'İşi',tr_gloss:'the work/matter',en_fragment:'grip on things',bridge_type:'transform',explanation:'İş → şeyler; kontrol nesnesi'},{tr_fragment:'sıkı tuttu',tr_gloss:'held firmly',en_fragment:'kept tight',bridge_type:'direct',explanation:'Sıkı tutmak → tight grip'}],cultural_insight:'Sıkı kontrol için tutma imgesi her iki dilde benzer.',fluency_tip:'"She kept a tight grip on the project from start to finish."'},
{id:1287,category:'deyimler',tr:'Elbet bir gün',tags:['elbet','gün','umut','bekle','zaman'],english_primary:"One day, surely",alternatives:["Someday, without a doubt","It\'ll happen eventually"],register:'neutral',bridges:[{tr_fragment:'Elbet',tr_gloss:'certainly/surely',en_fragment:'surely',bridge_type:'direct',explanation:'Elbet = kesinlikle; doğrudan'},{tr_fragment:'bir gün',tr_gloss:'one day',en_fragment:'one day',bridge_type:'direct',explanation:'Bir gün → one day; doğrudan'}],cultural_insight:'Umut dolu bekleyişi anlatmak için sade ama güçlü ifade.',fluency_tip:'"One day, surely, things will get better."'},
{id:1288,category:'deyimler',tr:'Gözünü seveyim',tags:['göz','sev','rica','yalvar'],english_primary:"Please, for the love of me",alternatives:["I\'m begging you","Do it for me"],register:'informal',bridges:[{tr_fragment:'Gözünü',tr_gloss:'your eye',en_fragment:'for the love',bridge_type:'cultural',explanation:'Göz sevgisi → sevgi için rica'},{tr_fragment:'seveyim',tr_gloss:'may I love',en_fragment:'of me',bridge_type:'cultural',explanation:'Seveyim → sevgi imgesiyle yalvarmak'}],cultural_insight:'Türkçeye özgü sevecen yalvarma ifadesi; İngilizcede daha doğrudan.',fluency_tip:'"Please, I\'m begging you, just this once."'},
{id:1289,category:'deyimler',tr:'Saat gibi çalıştı',tags:['saat','çalış','düzenli','mükemmel'],english_primary:"It ran like clockwork",alternatives:["Everything went smoothly","It worked perfectly"],register:'neutral',bridges:[{tr_fragment:'Saat gibi',tr_gloss:'like a clock',en_fragment:'like clockwork',bridge_type:'direct',explanation:'Saat → clock; doğrudan'},{tr_fragment:'çalıştı',tr_gloss:'worked/ran',en_fragment:'ran',bridge_type:'direct',explanation:'Çalışmak → to run (machinery)'}],cultural_insight:'Saat imgesi düzen ve mükemmeliyeti her iki dilde simgeler.',fluency_tip:'"The event ran like clockwork — not a single hitch."'},
{id:1290,category:'deyimler',tr:'Ayakları birbirine dolandı',tags:['ayak','dolaş','tökezle','karıştı'],english_primary:"They got their feet tangled up",alternatives:["They stumbled over themselves","They got confused in the moment"],register:'informal',bridges:[{tr_fragment:'Ayakları',tr_gloss:'their feet',en_fragment:'feet',bridge_type:'direct',explanation:'Ayak → feet; doğrudan'},{tr_fragment:'birbirine dolandı',tr_gloss:'got tangled with each other',en_fragment:'tangled up',bridge_type:'direct',explanation:'Dolanmak → tangle'}],cultural_insight:'Fiziksel ya da zihinsel karışıklık için ayak imgesi yaygın.',fluency_tip:'"He got his feet tangled up when trying to explain the situation."'},
{id:1291,category:'deyimler',tr:'Canı sıkkın',tags:['can','sık','bunalt','mutsuz','kasvet'],english_primary:"They were feeling down",alternatives:["They were in low spirits","They felt gloomy"],register:'informal',bridges:[{tr_fragment:'Canı',tr_gloss:'their spirit/soul',en_fragment:'feeling',bridge_type:'cultural',explanation:'Can = ruh; duygu kaynağı'},{tr_fragment:'sıkkın',tr_gloss:'bored/depressed',en_fragment:'down',bridge_type:'transform',explanation:'Sıkkın → aşağı; mutsuz ruh hali'}],cultural_insight:'"Can" Türkçede hem hayat hem duygu merkezi; çok yönlü metafor.',fluency_tip:'"They\'ve been feeling down since the news broke."'},
{id:1292,category:'deyimler',tr:'Ne kadar bilirsen bil',tags:['bil','limit','bilgi','karşı'],english_primary:"No matter how much you know",alternatives:["Regardless of how knowledgeable you are","Even with all your knowledge"],register:'neutral',bridges:[{tr_fragment:'Ne kadar',tr_gloss:'however much',en_fragment:'no matter how much',bridge_type:'direct',explanation:'Ne kadar → no matter how much'},{tr_fragment:'bilirsen bil',tr_gloss:'you may know',en_fragment:'you know',bridge_type:'direct',explanation:'Bilmek → know; doğrudan'}],cultural_insight:'Bilginin sınırını kabul etmek için yaygın deyimsel giriş.',fluency_tip:'"No matter how much you know, there\'s always more to learn."'},
{id:1293,category:'deyimler',tr:'Fırtına öncesi sessizlik',tags:['fırtına','sessizlik','gerilim','bekle'],english_primary:"The calm before the storm",alternatives:["Quiet before the chaos","Uneasy stillness before trouble"],register:'neutral',bridges:[{tr_fragment:'Fırtına',tr_gloss:'storm',en_fragment:'storm',bridge_type:'direct',explanation:'Fırtına → storm; doğrudan'},{tr_fragment:'öncesi sessizlik',tr_gloss:'the silence before',en_fragment:'the calm before',bridge_type:'transform',explanation:'Sessizlik → calm; öncesi → before'}],cultural_insight:'Bu deyim neredeyse birebir eşleşiyor; her iki kültürde kullanılır.',fluency_tip:'"Things seem quiet now — it\'s just the calm before the storm."'},
{id:1294,category:'deyimler',tr:'Kafası çalıştı',tags:['kafa','çalış','akıl','zeka','hızlı'],english_primary:"Their mind was working fast",alternatives:["Their brain clicked","They thought on their feet"],register:'informal',bridges:[{tr_fragment:'Kafası',tr_gloss:'their head/mind',en_fragment:'mind',bridge_type:'direct',explanation:'Kafa = zihin'},{tr_fragment:'çalıştı',tr_gloss:'worked/ran',en_fragment:'was working fast',bridge_type:'direct',explanation:'Çalışmak → to work/run'}],cultural_insight:'Zihni makine gibi çalışan biri için her iki dilde makine metaforu.',fluency_tip:'"Her mind was working fast and she solved it in seconds."'},
{id:1295,category:'deyimler',tr:'Yol gösterdi',tags:['yol','göster','kılavuz','öğret'],english_primary:"They showed the way",alternatives:["They guided them","They led the way"],register:'neutral',bridges:[{tr_fragment:'Yol',tr_gloss:'path/way',en_fragment:'way',bridge_type:'direct',explanation:'Yol → way; doğrudan'},{tr_fragment:'gösterdi',tr_gloss:'showed',en_fragment:'showed',bridge_type:'direct',explanation:'Göstermek → to show; doğrudan'}],cultural_insight:'Rehberliği yol imgesiyle anlatmak evrensel.',fluency_tip:'"She led the way for women in the industry."'},
{id:1296,category:'deyimler',tr:'Meydanı boş buldu',tags:['meydan','boş','fırsat','yararlan'],english_primary:"They seized the open field",alternatives:["They took advantage of the opening","They jumped at the opportunity"],register:'informal',bridges:[{tr_fragment:'Meydanı',tr_gloss:'the square/field',en_fragment:'open field',bridge_type:'transform',explanation:'Meydan = alan; boş alan fırsatı'},{tr_fragment:'boş buldu',tr_gloss:'found it empty',en_fragment:'seized',bridge_type:'cultural',explanation:'Boş bulmak → ele geçirmek'}],cultural_insight:'Fırsat anında harekete geçmeyi alan metaforuyla anlatmak yaygın.',fluency_tip:'"He jumped at the opportunity the moment it appeared."'},
{id:1297,category:'deyimler',tr:'İnce eleyip sık dokudu',tags:['ince','elek','doku','dikkat','titiz'],english_primary:"They went through it with a fine-tooth comb",alternatives:["They scrutinized every detail","They were meticulously thorough"],register:'neutral',bridges:[{tr_fragment:'İnce eleyip',tr_gloss:'sifting finely',en_fragment:'fine-tooth comb',bridge_type:'cultural',explanation:'İnce elek → ince diş tarak; ayıklama imgesi'},{tr_fragment:'sık dokudu',tr_gloss:'wove tightly',en_fragment:'went through',bridge_type:'cultural',explanation:'Sık dokumak → dikkatli incelemek'}],cultural_insight:'Titizlik için dokumayla ilgili imgeler her iki dilde de kullanılır.',fluency_tip:'"She went through the contract with a fine-tooth comb."'},
{id:1298,category:'deyimler',tr:'Atı alan Üsküdar\'ı geçti',tags:['at','Üsküdar','geç','geç kal','fırsat kaç'],english_primary:"The ship has sailed",alternatives:["It\'s too late now","That train has left the station"],register:'neutral',bridges:[{tr_fragment:'Atı alan Üsküdar\'ı geçti',tr_gloss:'the one who took the horse has crossed Üsküdar',en_fragment:'the ship has sailed',bridge_type:'cultural',explanation:'Türkçe coğrafi; İngilizce denizcilik; ikisi de kaçırılan fırsat'}],cultural_insight:'Türkçe Boğaz geçişi metaforu; İngilizcede gemi kalkmış.',fluency_tip:'"There\'s no point in worrying about it now — the ship has sailed."'},
{id:1299,category:'deyimler',tr:'Ağzı var dili yok',tags:['ağız','dil','sessiz','konuşamaz'],english_primary:"They can\'t find the words",alternatives:["They were tongue-tied","They couldn\'t speak up"],register:'informal',bridges:[{tr_fragment:'Ağzı var',tr_gloss:'has a mouth',en_fragment:'find the words',bridge_type:'cultural',explanation:'Ağız → söz üretme yeri'},{tr_fragment:'dili yok',tr_gloss:'has no tongue',en_fragment:'tongue-tied',bridge_type:'direct',explanation:'Dil yok → dil bağlı'}],cultural_insight:'Sessizliği ağız/dil imgesiyle anlatmak her iki dilde güçlü.',fluency_tip:'"She wanted to speak up but was completely tongue-tied."'},
{id:1300,category:'deyimler',tr:'Gün doğmadan neler doğar',tags:['gün','doğ','beklenmedik','sabır'],english_primary:"Anything can happen before the day is out",alternatives:["You never know what tomorrow holds","Things can turn around quickly"],register:'neutral',bridges:[{tr_fragment:'Gün doğmadan',tr_gloss:'before the day is born',en_fragment:'before the day is out',bridge_type:'transform',explanation:'Gün doğmadan → gün bitmeden; zaman metaforu'},{tr_fragment:'neler doğar',tr_gloss:'what is born',en_fragment:'anything can happen',bridge_type:'cultural',explanation:'Doğmak → olmak; beklenmedik gelişme'}],cultural_insight:'Belirsizliği ve umudu gün imgesiyle anlatmak Türkçeye özgü.',fluency_tip:'"Hang in there — anything can happen before the day is out."'},
{id:1301,category:'deyimler',tr:'Dört gözle bekledi',tags:['göz','bekle','heyecan','sabırsız'],english_primary:"They waited with bated breath",alternatives:["They eagerly awaited","They couldn\'t wait"],register:'neutral',bridges:[{tr_fragment:'Dört gözle',tr_gloss:'with four eyes',en_fragment:'with bated breath',bridge_type:'cultural',explanation:'Dört göz = yoğun beklenti; nefes tutmak = gerilim'},{tr_fragment:'bekledi',tr_gloss:'waited',en_fragment:'waited',bridge_type:'direct',explanation:'Beklemek → wait; doğrudan'}],cultural_insight:'Yoğun beklentiyi anlatmak için her iki dilde beden imgesi kullanılır.',fluency_tip:'"They waited with bated breath for the final results."'},
{id:1302,category:'deyimler',tr:'Canını yakmak',tags:['can','yak','acıt','zarar'],english_primary:"To hurt them deeply",alternatives:["To sting them","To cut them to the quick"],register:'informal',bridges:[{tr_fragment:'Canını',tr_gloss:'their soul/life',en_fragment:'deeply',bridge_type:'cultural',explanation:'Can = duygu merkezi; derin anlamı'},{tr_fragment:'yakmak',tr_gloss:'to burn',en_fragment:'hurt',bridge_type:'transform',explanation:'Yakmak → acı vermek; ateş metaforu'}],cultural_insight:'Derin acıyı ateş imgesiyle anlatmak Türkçede yaygın.',fluency_tip:'"His words really cut her to the quick."'},
{id:1303,category:'deyimler',tr:'Yüzü kızardı',tags:['yüz','kızar','utanç','mahcup'],english_primary:"Their face turned red",alternatives:["They blushed","They were flushed with embarrassment"],register:'neutral',bridges:[{tr_fragment:'Yüzü',tr_gloss:'their face',en_fragment:'face',bridge_type:'direct',explanation:'Yüz → face; doğrudan'},{tr_fragment:'kızardı',tr_gloss:'reddened',en_fragment:'turned red',bridge_type:'direct',explanation:'Kızarmak → turn red; doğrudan'}],cultural_insight:'Utancın evrensel fiziksel belirtisi; iki dilde birebir.',fluency_tip:'"Her face turned red when they called on her unexpectedly."'},
{id:1304,category:'deyimler',tr:'Yüzüne karşı söyledi',tags:['yüz','karşı','söyle','doğrudan','cesur'],english_primary:"They said it straight to their face",alternatives:["They told them directly","They didn\'t sugarcoat it"],register:'informal',bridges:[{tr_fragment:'Yüzüne karşı',tr_gloss:'against their face',en_fragment:'straight to their face',bridge_type:'direct',explanation:'Yüzüne karşı → yüzüne karşı; doğrudan'},{tr_fragment:'söyledi',tr_gloss:'said/told',en_fragment:'said',bridge_type:'direct',explanation:'Söylemek → to say; doğrudan'}],cultural_insight:'Açıksözlülük için yüz imgesi her iki dilde benzer.',fluency_tip:'"She said it straight to his face — no sugar-coating."'},
{id:1305,category:'deyimler',tr:'Bir çırpıda bitirdi',tags:['çırpı','bitir','hızlı','kolay'],english_primary:"They knocked it out in no time",alternatives:["They finished it in a flash","They wrapped it up quickly"],register:'informal',bridges:[{tr_fragment:'Bir çırpıda',tr_gloss:'in one flick/splash',en_fragment:'in no time',bridge_type:'cultural',explanation:'Çırpı = hızlı hareket; no time = çok kısa süre'},{tr_fragment:'bitirdi',tr_gloss:'finished',en_fragment:'knocked it out',bridge_type:'transform',explanation:'Bitirmek → yapmak ve bitirmek'}],cultural_insight:'Hızlı bitirme için her iki dilde de anlık hareket imgesi.',fluency_tip:'"She knocked out the report in no time."'},
{id:1306,category:'deyimler',tr:'Hazır elbise giymek',tags:['hazır','elbise','genel','herkese uyan'],english_primary:"A one-size-fits-all approach",alternatives:["A cookie-cutter solution","A ready-made answer"],register:'neutral',bridges:[{tr_fragment:'Hazır elbise',tr_gloss:'ready-made clothing',en_fragment:'one-size-fits-all',bridge_type:'cultural',explanation:'Hazır elbise → hazır çözüm; özelleştirilmemiş'},{tr_fragment:'giymek',tr_gloss:'to wear',en_fragment:'approach',bridge_type:'transform',explanation:'Giymek → uygulamak'}],cultural_insight:'Bireyselleştirilmemiş çözümü kıyafet metaforuyla anlatmak ilginç.',fluency_tip:'"A one-size-fits-all approach won\'t work here — we need customization."'},
{id:1307,category:'deyimler',tr:'Pireyi deve yaptı',tags:['pire','deve','abartı','büyüt'],english_primary:"They made a mountain out of a molehill",alternatives:["They blew it out of proportion","They overreacted"],register:'informal',bridges:[{tr_fragment:'Pireyi',tr_gloss:'the flea',en_fragment:'molehill',bridge_type:'cultural',explanation:'Pire = küçük hayvan; molehill = küçük tepe'},{tr_fragment:'deve yaptı',tr_gloss:'made it a camel',en_fragment:'mountain',bridge_type:'cultural',explanation:'Deve = büyük hayvan; mountain = büyük engel'}],cultural_insight:'Abartıyı hayvan/doğa büyüklük metaforuyla anlatmak; imgeler farklı.',fluency_tip:'"Stop making a mountain out of a molehill — it\'s a small issue."'},
{id:1308,category:'deyimler',tr:'Gözü açık uyudu',tags:['göz','aç','uyku','dikkat','tetikte'],english_primary:"They slept with one eye open",alternatives:["They stayed on high alert","They never fully let their guard down"],register:'informal',bridges:[{tr_fragment:'Gözü açık',tr_gloss:'with eye open',en_fragment:'with one eye open',bridge_type:'direct',explanation:'Göz açık → one eye open; doğrudan'},{tr_fragment:'uyudu',tr_gloss:'slept',en_fragment:'slept',bridge_type:'direct',explanation:'Uyumak → sleep; doğrudan'}],cultural_insight:'Sürekli tetikte olmayı uyku imgesiyle anlatmak her iki dilde benzer.',fluency_tip:'"He\'s been sleeping with one eye open since the incident."'},
{id:1309,category:'deyimler',tr:'Her işe burnunu soktu',tags:['burun','sok','karış','meraklı'],english_primary:"They stuck their nose into everything",alternatives:["They meddled in everything","They were a busybody"],register:'informal',bridges:[{tr_fragment:'Her işe',tr_gloss:'into every matter',en_fragment:'into everything',bridge_type:'direct',explanation:'Her iş → everything; doğrudan'},{tr_fragment:'burnunu soktu',tr_gloss:'stuck their nose',en_fragment:'stuck their nose',bridge_type:'direct',explanation:'Burun sokmak → stick one\'s nose; birebir'}],cultural_insight:'Karışkanlık için burun imgesi her iki dilde birebir eşleşiyor.',fluency_tip:'"She stuck her nose into everyone\'s business at the office."'},
{id:1310,category:'deyimler',tr:'Aklı karıştı',tags:['akıl','karış','şaşır','ne yapacak'],english_primary:"Their mind was all mixed up",alternatives:["They were confused","Their thoughts were in a jumble"],register:'neutral',bridges:[{tr_fragment:'Aklı',tr_gloss:'their mind/reason',en_fragment:'mind',bridge_type:'direct',explanation:'Akıl = mind; doğrudan'},{tr_fragment:'karıştı',tr_gloss:'got mixed up',en_fragment:'all mixed up',bridge_type:'direct',explanation:'Karışmak → to get mixed up; doğrudan'}],cultural_insight:'Karışık düşünceyi "karışmak" fiiliyle anlatmak her iki dilde benzer.',fluency_tip:'"My mind is all mixed up — I need a moment to think."'},
{id:1311,category:'deyimler',tr:'Kollarını sıvadı',tags:['kol','sıva','hazır','işe koyul'],english_primary:"They rolled up their sleeves",alternatives:["They got down to business","They readied themselves for work"],register:'neutral',bridges:[{tr_fragment:'Kollarını',tr_gloss:'their arms/sleeves',en_fragment:'sleeves',bridge_type:'transform',explanation:'Kol → sleeve; kıyafet parçası'},{tr_fragment:'sıvadı',tr_gloss:'rolled up',en_fragment:'rolled up',bridge_type:'direct',explanation:'Sıvamak → roll up; doğrudan'}],cultural_insight:'Çalışmaya hazırlığı kıyafet hareketi imgesiyle anlatmak her iki dilde birebir.',fluency_tip:'"The team rolled up their sleeves and got to work."'},
{id:1312,category:'deyimler',tr:'Göbek attı',tags:['göbek','at','dans','eğlen','coştu'],english_primary:"They cut loose",alternatives:["They let their hair down","They busted a move"],register:'informal',bridges:[{tr_fragment:'Göbek',tr_gloss:'belly/navel',en_fragment:'loose',bridge_type:'cultural',explanation:'Göbek atmak = raksetmek, coşmak; cut loose = serbest kalmak'},{tr_fragment:'attı',tr_gloss:'threw/did',en_fragment:'cut',bridge_type:'transform',explanation:'Atmak → kesmek; eylem}'}],cultural_insight:'Göbek dansı Türk kültürüne özgü; İngilizcede serbest kalmak daha geniş.',fluency_tip:'"After the exam he really cut loose and celebrated."'},
{id:1313,category:'deyimler',tr:'El altından',tags:['el','alt','gizli','sessiz'],english_primary:"Under the table",alternatives:["On the sly","Behind the scenes"],register:'informal',bridges:[{tr_fragment:'El altından',tr_gloss:'from under the hand',en_fragment:'under the table',bridge_type:'cultural',explanation:'El altı = gizli bölge; masa altı = gizli anlaşma'},{tr_fragment:'',tr_gloss:'',en_fragment:'',bridge_type:'drop',explanation:'Türkçede yeterli; İngilizcede masa imgesi'}],cultural_insight:'Gizli işlemleri el/masa imgesiyle anlatmak yaygın.',fluency_tip:'"The deal was made completely under the table."'},
{id:1314,category:'deyimler',tr:'Kaşla göz arasında',tags:['kaş','göz','hızlı','anlık'],english_primary:"In the blink of an eye",alternatives:["In an instant","Before you know it"],register:'neutral',bridges:[{tr_fragment:'Kaşla göz arasında',tr_gloss:'between the eyebrow and the eye',en_fragment:'in the blink of an eye',bridge_type:'cultural',explanation:'Kaş-göz arası kısalığı → göz kırpması kısalığı'},{tr_fragment:'',tr_gloss:'',en_fragment:'',bridge_type:'drop',explanation:'Türkçe fiilsiz; İngilizcede blink eylemi var'}],cultural_insight:'Anlık geçişi göz imgesiyle anlatmak her iki dilde güçlü.',fluency_tip:'"It was over in the blink of an eye."'},
{id:1315,category:'deyimler',tr:'Ne oldum delisi',tags:['ne oldum','deli','kibir','zenginlik'],english_primary:"A nouveau riche show-off",alternatives:["Someone who flaunts new money","Newly rich and arrogant"],register:'informal',bridges:[{tr_fragment:'Ne oldum',tr_gloss:'what did I become',en_fragment:'nouveau riche',bridge_type:'cultural',explanation:'Ne olduğunu unutmak → yeni zengin'},{tr_fragment:'delisi',tr_gloss:'madman of',en_fragment:'show-off',bridge_type:'cultural',explanation:'Deli → aşırı, kontrolsüz; gösteriş yapan'}],cultural_insight:'Sosyal yükseliş kibrine Türkçe özgün bir isim vermiş.',fluency_tip:'"He became a total nouveau riche show-off after selling his company."'},
{id:1316,category:'deyimler',tr:'Duman etmek',tags:['duman','et','mahvet','boz'],english_primary:"To mess it all up",alternatives:["To blow it","To ruin everything"],register:'informal',bridges:[{tr_fragment:'Duman',tr_gloss:'smoke',en_fragment:'mess',bridge_type:'cultural',explanation:'Duman etmek → dumana kesmek; yok etmek'},{tr_fragment:'etmek',tr_gloss:'to make/do',en_fragment:'up',bridge_type:'transform',explanation:'Etmek → to make it happen (negatively)'}],cultural_insight:'Türkçede duman = tahribat imgesi; İngilizcede karışıklık.',fluency_tip:'"He really messed it all up with that last-minute change."'},,
{id:1317,category:'sasirma',tr:'Nutku tutuldu',tags:['nutuk','tutul','konus','sok'],english_primary:"They were speechless",alternatives:["They were at a loss for words","They couldn't get a word out"],register:'neutral',bridges:[{tr_fragment:'Nutku',tr_gloss:'their speech/sermon',en_fragment:'speechless',bridge_type:'transform',explanation:'Nutuk = speech; tutulmak = to be held back'},{tr_fragment:'tutuldu',tr_gloss:'was held',en_fragment:'loss for words',bridge_type:'transform',explanation:'Tutulmak -> unable to speak'}],cultural_insight:'Konuşma yetisinin geçici kaybı şaşkınlığın evrensel işaretidir.',fluency_tip:'"I was absolutely speechless when I heard the news."'},
{id:1318,category:'sasirma',tr:'Donup kaldı',tags:['don','kal','sok','hareketsiz'],english_primary:"They froze",alternatives:["They were rooted to the spot","They stood like a statue"],register:'neutral',bridges:[{tr_fragment:'Donup',tr_gloss:'freezing',en_fragment:'froze',bridge_type:'direct',explanation:'Donmak = freeze; birebir'},{tr_fragment:'kaldı',tr_gloss:'remained',en_fragment:'spot',bridge_type:'drop',explanation:'Kalmak eylemi İngilizcede fiilin içinde (froze) erir'}],cultural_insight:'Şok anında hareketsizlik (donma) tepkisi her iki dilde ortaktır.',fluency_tip:'"He just froze when he saw the car coming."'},
{id:1319,category:'sasirma',tr:'Aklı başından gitti',tags:['akil','bas','git','sasir','kork'],english_primary:"They were scared out of their wits",alternatives:["They lost their head","It blew their mind"],register:'informal',bridges:[{tr_fragment:'Aklı',tr_gloss:'their mind/reason',en_fragment:'wits',bridge_type:'direct',explanation:'Akıl = wits/mind'},{tr_fragment:'başından gitti',tr_gloss:'went from their head',en_fragment:'scared out of',bridge_type:'cultural',explanation:'Aklın baştan gitmesi -> zihnin bedeni terk etmesi'}],cultural_insight:'Aşırı korku veya şaşkınlıkta aklın uçup gitmesi metaforu.',fluency_tip:'"That loud noise scared me out of my wits!"'},
{id:1320,category:'sasirma',tr:'Gözlerine inanamadı',tags:['goz','inan','sok','gormek'],english_primary:"They couldn't believe their eyes",alternatives:["They did a double take","They were incredulous"],register:'neutral',bridges:[{tr_fragment:'Gözlerine',tr_gloss:'their eyes',en_fragment:'their eyes',bridge_type:'direct',explanation:'Göz = eyes'},{tr_fragment:'inanamadı',tr_gloss:'could not believe',en_fragment:'couldn\'t believe',bridge_type:'direct',explanation:'İnanamamak = not believe'}],cultural_insight:'Görsel şüphe şaşkınlığın en temel ifadesidir.',fluency_tip:'"I couldn\'t believe my eyes when I saw the total."'},
{id:1321,category:'sasirma',tr:'Küçük dilini yuttu',tags:['kucuk dil','yut','sok','hayret'],english_primary:"They were dumbfounded",alternatives:["They were flabbergasted","They were gobsmacked"],register:'informal',bridges:[{tr_fragment:'Küçük dilini',tr_gloss:'their uvula (little tongue)',en_fragment:'dumbfounded',bridge_type:'cultural',explanation:'Küçük dil yutmak -> nefessiz kalmak/konuşamamak'},{tr_fragment:'yuttu',tr_gloss:'swallowed',en_fragment:'gobsmacked',bridge_type:'transform',explanation:'Yutmak -> şoktan ağzı açık kalmak'}],cultural_insight:'Türkçede "küçük dil" anatomik detayı kullanılır, İngilizcede "dumb" (dilsiz) veya "gob" (ağız) vurgusu vardır.',fluency_tip:'"She was completely dumbfounded by the surprise party."'},
{id:1322,category:'sasirma',tr:'Etekleri tutuştu',tags:['etek','tutus','panik','telas'],english_primary:"They hit the panic button",alternatives:["They got into a flap","They ran around like a headless chicken"],register:'informal',bridges:[{tr_fragment:'Etekleri',tr_gloss:'their skirts',en_fragment:'panic',bridge_type:'cultural',explanation:'Etek tutuşması -> yangın/acil durum telaşı'},{tr_fragment:'tutuştu',tr_gloss:'caught fire',en_fragment:'button',bridge_type:'transform',explanation:'Tutuşmak -> paniklemek'}],cultural_insight:'Telaş ve paniği yangın metaforuyla anlatmak Türkçeye özgüdür.',fluency_tip:'"When the deadline moved up, everyone hit the panic button."'},
{id:1323,category:'sasirma',tr:'Tepesi attı',tags:['tepe','at','kiz','sinir','sok'],english_primary:"They blew their top",alternatives:["They hit the roof","They flew off the handle"],register:'informal',bridges:[{tr_fragment:'Tepesi',tr_gloss:'their top/hill',en_fragment:'top',bridge_type:'direct',explanation:'Tepe = top (of head)'},{tr_fragment:'attı',tr_gloss:'popped/threw',en_fragment:'blew',bridge_type:'transform',explanation:'Atmak -> patlamak (blew)'}],cultural_insight:'Öfke patlamasını "kapak atması" veya "çatıya vurma" ile anlatmak benzerdir.',fluency_tip:'"He blew his top when he saw the scratch on his car."'},
{id:1324,category:'sasirma',tr:'Kanı dondu',tags:['kan','don','kork','dehset'],english_primary:"Their blood ran cold",alternatives:["They were chilled to the bone","It gave them the creeps"],register:'neutral',bridges:[{tr_fragment:'Kanı',tr_gloss:'their blood',en_fragment:'blood',bridge_type:'direct',explanation:'Kan = blood'},{tr_fragment:'dondu',tr_gloss:'froze',en_fragment:'ran cold',bridge_type:'transform',explanation:'Donmak -> soğumak/akmamak'}],cultural_insight:'Korku anında vücut ısısının düşmesi hissi evrenseldir.',fluency_tip:'"My blood ran cold when I heard the scream."'},
{id:1325,category:'sasirma',tr:'Yüreği ağzına geldi',tags:['yurek','agiz','kork','heyecan'],english_primary:"Their heart was in their mouth",alternatives:["Their heart leaped into their throat","They were scared stiff"],register:'neutral',bridges:[{tr_fragment:'Yüreği',tr_gloss:'their heart',en_fragment:'heart',bridge_type:'direct',explanation:'Yürek = heart'},{tr_fragment:'ağzına geldi',tr_gloss:'came to their mouth',en_fragment:'in their mouth',bridge_type:'direct',explanation:'Ağza gelmek -> in the mouth'}],cultural_insight:'Kalbin yerinden çıkacak gibi atması hissi birebir aynıdır.',fluency_tip:'"My heart was in my mouth as I waited for the results."'},
{id:1326,category:'sasirma',tr:'Dudak uçuklattı',tags:['dudak','ucukla','fiyat','sasirtici'],english_primary:"It was jaw-dropping",alternatives:["It was mind-boggling","It cost an arm and a leg"],register:'informal',bridges:[{tr_fragment:'Dudak',tr_gloss:'lip',en_fragment:'jaw',bridge_type:'transform',explanation:'Dudak -> çene/ağız bölgesi'},{tr_fragment:'uçuklattı',tr_gloss:'made break out in cold sores',en_fragment:'dropping',bridge_type:'cultural',explanation:'Uçuklamak -> aşırı stres/şok belirtisi'}],cultural_insight:'Aşırı pahalılık veya şaşırtıcılık fiziksel bir "uçuk" ile anlatılır.',fluency_tip:'"The prices at that restaurant are jaw-dropping."'},
{id:1327,category:'sasirma',tr:'Şaka gibi',tags:['saka','inanilmaz','sacma'],english_primary:"It's a joke",alternatives:["You've got to be kidding me","It's surreal"],register:'informal',bridges:[{tr_fragment:'Şaka',tr_gloss:'joke',en_fragment:'joke',bridge_type:'direct',explanation:'Şaka = joke'},{tr_fragment:'gibi',tr_gloss:'like',en_fragment:'is',bridge_type:'transform',explanation:'Gibi -> karşılaştırma'}],cultural_insight:'İnanılmaz durumlara "şaka" tepkisi vermek ortaktır.',fluency_tip:'"This weather is a joke — it was sunny five minutes ago!"'},
{id:1328,category:'sasirma',tr:'Yok artık',tags:['yok','artik','inanmam','hadi'],english_primary:"No way",alternatives:["Get out of here","You're joking"],register:'informal',bridges:[{tr_fragment:'Yok',tr_gloss:'non-existent',en_fragment:'no',bridge_type:'direct',explanation:'Yok = no'},{tr_fragment:'artık',tr_gloss:'anymore/now',en_fragment:'way',bridge_type:'cultural',explanation:'Artık -> bu kadarı da fazla'}],cultural_insight:'Reddediş yoluyla şaşkınlık ifadesi.',fluency_tip:'"No way! Did you really win the lottery?"'},
{id:1329,category:'sasirma',tr:'Hadi canım',tags:['hadi','can','inanmam','sacma'],english_primary:"Come off it",alternatives:["Get real","Don't give me that"],register:'informal',bridges:[{tr_fragment:'Hadi',tr_gloss:'come on',en_fragment:'come off',bridge_type:'direct',explanation:'Hadi = come on'},{tr_fragment:'canım',tr_gloss:'my soul/dear',en_fragment:'it',bridge_type:'drop',explanation:'Canım hitabı cümleyi yumuşatır, İngilizcede atılır'}],cultural_insight:'İnanmama veya küçümseme ifadesi.',fluency_tip:'"Come off it, you know that\'s not true."'},
{id:1330,category:'sasirma',tr:'Ağzı açık kaldı',tags:['agiz','acik','sok','hayran'],english_primary:"They were agog",alternatives:["Their mouth hung open","They were wide-eyed"],register:'neutral',bridges:[{tr_fragment:'Ağzı',tr_gloss:'their mouth',en_fragment:'mouth',bridge_type:'direct',explanation:'Ağız = mouth'},{tr_fragment:'açık kaldı',tr_gloss:'stayed open',en_fragment:'hung open',bridge_type:'direct',explanation:'Açık kalmak = hang open'}],cultural_insight:'Merak ve şaşkınlıkla bakakalmak.',fluency_tip:'"The kids were agog at the magician\'s tricks."'},
{id:1331,category:'sasirma',tr:'Başından aşağı kaynar sular döküldü',tags:['bas','su','kaynar','sok','utanc'],english_primary:"Their heart sank",alternatives:["They were mortified","They felt a cold shower"],register:'neutral',bridges:[{tr_fragment:'Başından aşağı',tr_gloss:'down from their head',en_fragment:'sank',bridge_type:'cultural',explanation:'Baştan aşağı dökülmek -> içine çökmek'},{tr_fragment:'kaynar sular',tr_gloss:'boiling waters',en_fragment:'heart',bridge_type:'transform',explanation:'Kaynar su -> şok ve utanç ateşi'}],cultural_insight:'Büyük bir hayal kırıklığı veya utanç anında yaşanan fiziksel his.',fluency_tip:'"My heart sank when I realized I lost the tickets."'},
{id:1332,category:'sasirma',tr:'Nevri döndü',tags:['nevr','don','sinir','sok'],english_primary:"They saw red",alternatives:["They lost it","They snapped"],register:'informal',bridges:[{tr_fragment:'Nevri',tr_gloss:'their mood/color',en_fragment:'red',bridge_type:'cultural',explanation:'Nevir (yüz rengi/hali) -> kırmızı (öfke rengi)'},{tr_fragment:'döndü',tr_gloss:'turned',en_fragment:'saw',bridge_type:'transform',explanation:'Dönmek -> görmek (durum değişimi)'}],cultural_insight:'Ani sinirlenme ve kontrol kaybı.',fluency_tip:'"He saw red when they insulted his family."'},
{id:1333,category:'sasirma',tr:'Cinleri tepesine çıktı',tags:['cin','tepe','sinir','ofke'],english_primary:"They hit the ceiling",alternatives:["They went ballistic","They blew a fuse"],register:'informal',bridges:[{tr_fragment:'Cinleri',tr_gloss:'their genies/demons',en_fragment:'ceiling',bridge_type:'cultural',explanation:'Cinler (doğaüstü varlıklar) -> tavan (sınır)'},{tr_fragment:'tepesine çıktı',tr_gloss:'climbed to their top',en_fragment:'hit',bridge_type:'transform',explanation:'Tepeye çıkmak -> tavana vurmak'}],cultural_insight:'Öfkenin başa vurması metaforu.',fluency_tip:'"Dad hit the ceiling when he saw the phone bill."'},
{id:1334,category:'sasirma',tr:'Gözlerine inanamadı',tags:['goz','inan','sok'],english_primary:"Couldn't believe their eyes",alternatives:["Was stunned","Rubbed their eyes"],register:'neutral',bridges:[{tr_fragment:'Gözlerine',tr_gloss:'to their eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz = eyes'},{tr_fragment:'inanamadı',tr_gloss:'could not believe',en_fragment:'couldn\'t believe',bridge_type:'direct',explanation:'Birebir çeviri'}],cultural_insight:'Görsel kanıta rağmen inanamama hali.',fluency_tip:'"I couldn\'t believe my eyes — it was huge!"'},
{id:1335,category:'sasirma',tr:'Nutku tutuldu',tags:['nutuk','tutul','konusamadi'],english_primary:"Tongue-tied",alternatives:["Lost for words","Speechless"],register:'neutral',bridges:[{tr_fragment:'Nutku',tr_gloss:'speech',en_fragment:'tongue',bridge_type:'transform',explanation:'Nutuk -> dil'},{tr_fragment:'tutuldu',tr_gloss:'held',en_fragment:'tied',bridge_type:'transform',explanation:'Tutulmak -> bağlanmak'}],cultural_insight:'Heyecandan konuşamama durumu.',fluency_tip:'"He got tongue-tied when he met the celebrity."'},
{id:1336,category:'sasirma',tr:'Dili damağına yapıştı',tags:['dil','damak','susuzluk','korku'],english_primary:"Parched with fear",alternatives:["Mouth went dry","Spitless"],register:'informal',bridges:[{tr_fragment:'Dili',tr_gloss:'tongue',en_fragment:'mouth',bridge_type:'transform',explanation:'Dil -> ağız geneli'},{tr_fragment:'damağına yapıştı',tr_gloss:'stuck to palate',en_fragment:'dry',bridge_type:'cultural',explanation:'Yapışmak -> kuruluktan'}],cultural_insight:'Korku veya susuzluktan ağzın kuruması.',fluency_tip:'"My mouth went dry before the presentation."'},
{id:1337,category:'sasirma',tr:'Felfecir okuyor',tags:['felfecir','goz','kurnaz','saskin'],english_primary:"Eyes darting around",alternatives:["Shifty-eyed","Up to something"],register:'informal',bridges:[{tr_fragment:'Felfecir',tr_gloss:'dawn/flicker',en_fragment:'darting',bridge_type:'cultural',explanation:'Felfecir (kıvılcım) -> hızlı hareket'},{tr_fragment:'okuyor',tr_gloss:'reading',en_fragment:'around',bridge_type:'drop',explanation:'Okumak burada mecaz'}],cultural_insight:'Gözlerin cin gibi bakması, kurnazlık veya telaş belirtisi.',fluency_tip:'"His eyes were darting around looking for an exit."'},
{id:1338,category:'sasirma',tr:'Baka kaldı',tags:['bak','kal','saskin','donuk'],english_primary:"Gaped",alternatives:["Stared in disbelief","Gawked"],register:'neutral',bridges:[{tr_fragment:'Baka',tr_gloss:'looking',en_fragment:'gaped',bridge_type:'transform',explanation:'Bakmak -> ağzı açık bakmak'},{tr_fragment:'kaldı',tr_gloss:'remained',en_fragment:'ed',bridge_type:'drop',explanation:'Süreklilik eki'}],cultural_insight:'Donup kalarak bakmak.',fluency_tip:'"Passersby gaped at the accident scene."'},
{id:1339,category:'sasirma',tr:'Şok oldu',tags:['sok','ol','sasir'],english_primary:"Was shocked",alternatives:["Taken aback","Stunned"],register:'neutral',bridges:[{tr_fragment:'Şok',tr_gloss:'shock',en_fragment:'shocked',bridge_type:'direct',explanation:'Şok = shock'},{tr_fragment:'oldu',tr_gloss:'became',en_fragment:'was',bridge_type:'transform',explanation:'Olmak -> to be'}],cultural_insight:'Modern, doğrudan ifade.',fluency_tip:'"I was shocked to hear he left."'},
{id:1340,category:'sasirma',tr:'Dondum kaldım',tags:['don','kal','sok'],english_primary:"I was transfixed",alternatives:["Frozen in place","Mesmerized"],register:'neutral',bridges:[{tr_fragment:'Dondum',tr_gloss:'I froze',en_fragment:'transfixed',bridge_type:'transform',explanation:'Donmak -> çakılıp kalmak'},{tr_fragment:'kaldım',tr_gloss:'remained',en_fragment:'was',bridge_type:'drop',explanation:'Pekiştirme'}],cultural_insight:'Hem korku hem hayranlıktan hareket edememek.',fluency_tip:'"I was transfixed by the horror on the screen."'},
{id:1341,category:'sasirma',tr:'Ağzı kulaklarına vardı',tags:['agiz','kulak','sevin','sasir'],english_primary:"Grinned from ear to ear",alternatives:["Beamed","Smiled broadly"],register:'informal',bridges:[{tr_fragment:'Ağzı',tr_gloss:'mouth',en_fragment:'grinned',bridge_type:'transform',explanation:'Ağız hareketi -> sırıtmak'},{tr_fragment:'kulaklarına vardı',tr_gloss:'reached ears',en_fragment:'ear to ear',bridge_type:'direct',explanation:'Kulaktan kulağa = kulaklarına varmak'}],cultural_insight:'Aşırı sevinç ve şaşkınlık gülümsemesi.',fluency_tip:'"She grinned from ear to ear when she opened the gift."'},
{id:1342,category:'sasirma',tr:'Gözleri fal taşı gibi açıldı',tags:['goz','fal tasi','ac','sok'],english_primary:"Eyes popped out",alternatives:["Bug-eyed","Eyes widened"],register:'informal',bridges:[{tr_fragment:'Gözleri',tr_gloss:'eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz = eye'},{tr_fragment:'fal taşı gibi',tr_gloss:'like fortune stones',en_fragment:'popped out',bridge_type:'cultural',explanation:'Fal taşı (büyük taş) -> dışarı fırlamak'}],cultural_insight:'Gözlerin aşırı büyümesi.',fluency_tip:'"His eyes popped out when he saw the bill."'},
{id:1343,category:'sasirma',tr:'Yeri yerinden oynattı',tags:['yer','oynat','sok','olay'],english_primary:"Shook things up",alternatives:["Caused a stir","Rocked the boat"],register:'informal',bridges:[{tr_fragment:'Yeri',tr_gloss:'the ground',en_fragment:'things',bridge_type:'transform',explanation:'Yer -> genel durum'},{tr_fragment:'yerinden oynattı',tr_gloss:'moved from place',en_fragment:'shook up',bridge_type:'transform',explanation:'Oynatmak -> sallamak'}],cultural_insight:'Büyük etki veya kargaşa yaratmak.',fluency_tip:'"Her resignation really shook things up at the office."'},
{id:1344,category:'sasirma',tr:'Başına yıkıldı',tags:['bas','yik','hayalkirikligi','sok'],english_primary:"Came crashing down",alternatives:["Collapsed around them","Fell apart"],register:'neutral',bridges:[{tr_fragment:'Başına',tr_gloss:'on their head',en_fragment:'down',bridge_type:'transform',explanation:'Başa düşmek -> aşağı çökmek'},{tr_fragment:'yıkıldı',tr_gloss:'collapsed',en_fragment:'crashing',bridge_type:'direct',explanation:'Yıkılmak = crash/collapse'}],cultural_insight:'Dünyası başına yıkılmak; büyük hayal kırıklığı.',fluency_tip:'"Her whole world came crashing down."'},
{id:1345,category:'sasirma',tr:'Sudan çıkmış balığa döndü',tags:['su','balik','saskin','yabanci'],english_primary:"Like a fish out of water",alternatives:["Disoriented","Out of place"],register:'informal',bridges:[{tr_fragment:'Sudan çıkmış',tr_gloss:'out of water',en_fragment:'out of water',bridge_type:'direct',explanation:'Su dışı = out of water'},{tr_fragment:'balığa döndü',tr_gloss:'turned into a fish',en_fragment:'fish',bridge_type:'direct',explanation:'Balık = fish'}],cultural_insight:'Yabancılık ve uyumsuzluk hissi birebir aynı metafordur.',fluency_tip:'"I felt like a fish out of water at the fancy party."'},
{id:1346,category:'sasirma',tr:'Çarpılmışa döndü',tags:['carpil','sok','kork'],english_primary:"Looked like they'd seen a ghost",alternatives:["Went pale","Looked stricken"],register:'informal',bridges:[{tr_fragment:'Çarpılmışa',tr_gloss:'struck/cursed',en_fragment:'seen a ghost',bridge_type:'cultural',explanation:'Çarpılmak (cin çarpması) -> hayalet görmek'},{tr_fragment:'döndü',tr_gloss:'turned into',en_fragment:'looked like',bridge_type:'transform',explanation:'Dönmek -> benzemek'}],cultural_insight:'Korkudan rengi atmak ve donuklaşmak.',fluency_tip:'"You look like you\'ve seen a ghost! What happened?"'},
{id:1347,category:'sasirma',tr:'Aklı çıktı',tags:['akil','cik','kork','sok'],english_primary:"Freaked out",alternatives:["Lost their cool","Panicked"],register:'slang',bridges:[{tr_fragment:'Aklı',tr_gloss:'mind',en_fragment:'freaked',bridge_type:'transform',explanation:'Akıl -> kontrol'},{tr_fragment:'çıktı',tr_gloss:'went out',en_fragment:'out',bridge_type:'direct',explanation:'Çıkmak = out'}],cultural_insight:'Ani korku ve telaş.',fluency_tip:'"Don\'t freak out, but I crashed the car."'},
{id:1348,category:'sasirma',tr:'Eli ayağı birbirine dolaştı',tags:['el','ayak','telas','saskin'],english_primary:"Got all flustered",alternatives:["Was in a tizzy","Trip over oneself"],register:'informal',bridges:[{tr_fragment:'Eli ayağı',tr_gloss:'hand and foot',en_fragment:'flustered',bridge_type:'cultural',explanation:'Uzuvların karışması -> zihinsel karmaşa'},{tr_fragment:'dolaştı',tr_gloss:'tangled',en_fragment:'tizzy',bridge_type:'transform',explanation:'Dolaşmak -> paniklemek'}],cultural_insight:'Heyecandan sakarlık yapmak.',fluency_tip:'"He got all flustered when she spoke to him."'},
{id:1349,category:'sasirma',tr:'Kal geldi',tags:['kal','gel','don','sok'],english_primary:"Blanked out",alternatives:["Brain freeze","Zoned out"],register:'slang',bridges:[{tr_fragment:'Kal',tr_gloss:'stay/state',en_fragment:'blanked',bridge_type:'cultural',explanation:'Kal gelmek -> donup kalmak'},{tr_fragment:'geldi',tr_gloss:'came',en_fragment:'out',bridge_type:'drop',explanation:'Gelmek yardımcı fiil'}],cultural_insight:'Bir anlık duraksama, tepki verememe.',fluency_tip:'"I just blanked out during the interview."'},
{id:1350,category:'sasirma',tr:'Beynim yandı',tags:['beyin','yan','karis','zor'],english_primary:"My brain is fried",alternatives:["My head is spinning","I'm overwhelmed"],register:'slang',bridges:[{tr_fragment:'Beynim',tr_gloss:'my brain',en_fragment:'brain',bridge_type:'direct',explanation:'Beyin = brain'},{tr_fragment:'yandı',tr_gloss:'burned',en_fragment:'fried',bridge_type:'direct',explanation:'Yanmak = fry (kızarmak/yanmak)'}],cultural_insight:'Zihinsel yorgunluk veya aşırı bilgi yüklemesi.',fluency_tip:'"After that exam, my brain is totally fried."'},
{id:1351,category:'sasirma',tr:'Dumura uğradı',tags:['dumur','sok','iptal'],english_primary:"Was stupefied",alternatives:["Catatonic","Shell-shocked"],register:'slang',bridges:[{tr_fragment:'Dumura',tr_gloss:'atrophy/stunt',en_fragment:'stupefied',bridge_type:'cultural',explanation:'Dumur (körelme) -> hissizleşme'},{tr_fragment:'uğradı',tr_gloss:'underwent',en_fragment:'was',bridge_type:'drop',explanation:'Uğramak eylemi'}],cultural_insight:'Şoktan dolayı tepkisiz kalma hali.',fluency_tip:'"She was stupefied by the audacity of his request."'},
{id:1352,category:'sasirma',tr:'Tüyleri diken diken oldu',tags:['tuy','diken','kork','urperti'],english_primary:"Got goosebumps",alternatives:["Hair stood on end","Shuddered"],register:'neutral',bridges:[{tr_fragment:'Tüyleri',tr_gloss:'hairs/feathers',en_fragment:'goosebumps',bridge_type:'cultural',explanation:'Tüy dikelmesi -> kaz derisi (goosebumps)'},{tr_fragment:'diken diken oldu',tr_gloss:'became thorns',en_fragment:'stood on end',bridge_type:'transform',explanation:'Dikenleşmek -> dikelmek'}],cultural_insight:'Ürperti veya korku fiziksel tepkisi.',fluency_tip:'"That movie gave me goosebumps."'},
{id:1353,category:'sasirma',tr:'Aklı durdu',tags:['akil','dur','sok','dusunememe'],english_primary:"Mind went blank",alternatives:["Couldn't think straight","Brain stopped working"],register:'neutral',bridges:[{tr_fragment:'Aklı',tr_gloss:'mind',en_fragment:'mind',bridge_type:'direct',explanation:'Akıl = mind'},{tr_fragment:'durdu',tr_gloss:'stopped',en_fragment:'went blank',bridge_type:'transform',explanation:'Durmak -> boşalmak'}],cultural_insight:'Düşünemez hale gelmek.',fluency_tip:'"My mind went blank when they asked for my ID."'},
{id:1354,category:'sasirma',tr:'Gözüne uyku girmedi',tags:['goz','uyku','gir','endise','saskin'],english_primary:"Lost sleep over it",alternatives:["Tossed and turned","Couldn't sleep a wink"],register:'neutral',bridges:[{tr_fragment:'Gözüne',tr_gloss:'into eye',en_fragment:'sleep',bridge_type:'transform',explanation:'Göz -> uyku merkezi'},{tr_fragment:'uyku girmedi',tr_gloss:'sleep did not enter',en_fragment:'lost sleep',bridge_type:'transform',explanation:'Girmemek -> kaybetmek'}],cultural_insight:'Endişe veya şaşkınlıktan uyuyamamak.',fluency_tip:'"He lost sleep over the mistake he made."'},
{id:1355,category:'sasirma',tr:'Kafayı yedi',tags:['kafa','ye','sok','delir'],english_primary:"Lost their marbles",alternatives:["Went nuts","Cracked up"],register:'slang',bridges:[{tr_fragment:'Kafayı',tr_gloss:'head',en_fragment:'marbles',bridge_type:'cultural',explanation:'Kafa -> bilyeler (akıl)'},{tr_fragment:'yedi',tr_gloss:'ate',en_fragment:'lost',bridge_type:'transform',explanation:'Yemek -> kaybetmek'}],cultural_insight:'Delirmek, aklını kaçırmak.',fluency_tip:'"Have you lost your marbles? It\'s raining and you\'re swimming!"'},
{id:1356,category:'sasirma',tr:'İçi cız etti',tags:['ic','ciz','uzuntu','sok'],english_primary:"Felt a pang of pity",alternatives:["Heart went out to","Felt a twinge"],register:'informal',bridges:[{tr_fragment:'İçi',tr_gloss:'inside',en_fragment:'pang',bridge_type:'transform',explanation:'İç -> ani sızı (pang)'},{tr_fragment:'cız etti',tr_gloss:'made sizzle sound',en_fragment:'pity',bridge_type:'cultural',explanation:'Cız sesi -> acıma hissi'}],cultural_insight:'Başkası adına ani üzüntü hissetmek.',fluency_tip:'"My heart went out to the stray kitten."'},
{id:1357,category:'sasirma',tr:'Yüreği cız etti',tags:['yurek','ciz','uzuntu'],english_primary:"Heart sank",alternatives:["Felt heartbroken","Was gutted"],register:'neutral',bridges:[{tr_fragment:'Yüreği',tr_gloss:'heart',en_fragment:'heart',bridge_type:'direct',explanation:'Yürek = heart'},{tr_fragment:'cız etti',tr_gloss:'sizzled',en_fragment:'sank',bridge_type:'cultural',explanation:'Yanma hissi -> çökme hissi'}],cultural_insight:'Derin üzüntü veya hayal kırıklığı.',fluency_tip:'"My heart sank when I saw the damage."'},
{id:1358,category:'sasirma',tr:'Bet beniz kalmadı',tags:['bet','beniz','kork','sol'],english_primary:"Drained of color",alternatives:["White as a sheet","Ashen-faced"],register:'informal',bridges:[{tr_fragment:'Bet beniz',tr_gloss:'complexion',en_fragment:'color',bridge_type:'direct',explanation:'Bet beniz = renk'},{tr_fragment:'kalmadı',tr_gloss:'remained not',en_fragment:'drained',bridge_type:'transform',explanation:'Kalmamak -> çekilmek'}],cultural_insight:'Korkudan yüzün sararması.',fluency_tip:'"She was white as a sheet after the accident."'},
{id:1359,category:'sasirma',tr:'Dili damağı kurudu',tags:['dil','damak','kuru','susuz','kork'],english_primary:"Bone dry",alternatives:["Cotton-mouthed","Parched"],register:'neutral',bridges:[{tr_fragment:'Dili damağı',tr_gloss:'tongue and palate',en_fragment:'bone',bridge_type:'cultural',explanation:'Ağız içi -> kemik (kuruluk sembolü)'},{tr_fragment:'kurudu',tr_gloss:'dried',en_fragment:'dry',bridge_type:'direct',explanation:'Kurumak = dry'}],cultural_insight:'Aşırı susuzluk veya korku.',fluency_tip:'"My throat was bone dry before the speech."'},
{id:1360,category:'sasirma',tr:'Gözleri faltaşı gibi',tags:['goz','fal tasi','saskin'],english_primary:"Wide-eyed",alternatives:["Staring","Bugging out"],register:'neutral',bridges:[{tr_fragment:'Gözleri',tr_gloss:'eyes',en_fragment:'eyes',bridge_type:'direct',explanation:'Göz = eye'},{tr_fragment:'faltaşı',tr_gloss:'fortune stone',en_fragment:'wide',bridge_type:'cultural',explanation:'Büyük taş -> geniş'}],cultural_insight:'Şaşkın bakış.',fluency_tip:'"He listened wide-eyed to the story."'},
{id:1361,category:'sasirma',tr:'Ağzı kulaklarına varmak',tags:['agiz','kulak','mutlu'],english_primary:"Beam with joy",alternatives:["Smile wide","Look radiant"],register:'neutral',bridges:[{tr_fragment:'Ağzı kulaklarına',tr_gloss:'mouth to ears',en_fragment:'beam',bridge_type:'transform',explanation:'Geniş ağız -> ışımak'},{tr_fragment:'varmak',tr_gloss:'reach',en_fragment:'with joy',bridge_type:'drop',explanation:'Eylem'}],cultural_insight:'Çok mutlu olmak.',fluency_tip:'"She beamed with joy at the graduation."'},
{id:1362,category:'sasirma',tr:'Şaştı kaldı',tags:['sas','kal','saskin'],english_primary:"Was baffled",alternatives:["Perplexed","Mystified"],register:'neutral',bridges:[{tr_fragment:'Şaştı',tr_gloss:'was surprised',en_fragment:'baffled',bridge_type:'direct',explanation:'Şaşmak = be baffled'},{tr_fragment:'kaldı',tr_gloss:'remained',en_fragment:'was',bridge_type:'drop',explanation:'Durum'}],cultural_insight:'Ne yapacağını bilememek, kafası karışmak.',fluency_tip:'"I was completely baffled by the instructions."'},
{id:1363,category:'sasirma',tr:'Nutkum tutuldu',tags:['nutuk','saskin','sessiz'],english_primary:"Lost for words",alternatives:["Can't speak","Speechless"],register:'neutral',bridges:[{tr_fragment:'Nutkum',tr_gloss:'my speech',en_fragment:'words',bridge_type:'transform',explanation:'Nutuk -> kelimeler'},{tr_fragment:'tutuldu',tr_gloss:'held',en_fragment:'lost',bridge_type:'transform',explanation:'Tutulmak -> kaybolmak'}],cultural_insight:'Duygusal yoğunluktan konuşamamak.',fluency_tip:'"I was lost for words when they thanked me."'},
{id:1364,category:'sasirma',tr:'Donup kalmak',tags:['don','kal','sok'],english_primary:"Freeze in one's tracks",alternatives:["Stop dead","Halt"],register:'neutral',bridges:[{tr_fragment:'Donup',tr_gloss:'freezing',en_fragment:'freeze',bridge_type:'direct',explanation:'Donmak = freeze'},{tr_fragment:'kalmak',tr_gloss:'remain',en_fragment:'tracks',bridge_type:'cultural',explanation:'Yerinde kalmak -> izinde durmak'}],cultural_insight:'Ani duruş.',fluency_tip:'"He froze in his tracks when he heard the noise."'},
{id:1365,category:'sasirma',tr:'Aklı başından gitmek',tags:['akil','bas','git','sasir'],english_primary:"Take leave of one's senses",alternatives:["Go mad","Lose judgment"],register:'formal',bridges:[{tr_fragment:'Aklı',tr_gloss:'mind',en_fragment:'senses',bridge_type:'direct',explanation:'Akıl = senses'},{tr_fragment:'başından gitmek',tr_gloss:'go from head',en_fragment:'take leave',bridge_type:'transform',explanation:'Gitmek -> ayrılmak'}],cultural_insight:'Mantıksız davranmak.',fluency_tip:'"It seems he has taken leave of his senses."'},
{id:1366,category:'sasirma',tr:'Gözlerine inanamamak',tags:['goz','inan','sok'],english_primary:"Hard to believe",alternatives:["Unbelievable","Incredible"],register:'neutral',bridges:[{tr_fragment:'Gözlerine',tr_gloss:'eyes',en_fragment:'believe',bridge_type:'transform',explanation:'Gözle görmek -> inanmak'},{tr_fragment:'inanamamak',tr_gloss:'not believe',en_fragment:'hard',bridge_type:'transform',explanation:'İnanamamak -> zorluk'}],cultural_insight:'İnanılması güç durum.',fluency_tip:'"It is hard to believe how fast he runs."'},
{id:1367,category:'basari',tr:'Dört ayak üstüne düştü',tags:['dort','ayak','sans','basari'],english_primary:"Landed on their feet",alternatives:["Came out smelling like roses","Lucked out"],register:'informal',bridges:[{tr_fragment:'Dört ayak üstüne',tr_gloss:'on four feet',en_fragment:'on their feet',bridge_type:'direct',explanation:'Kedi gibi düşmek metaforu her iki dilde de aynı.'},{tr_fragment:'düştü',tr_gloss:'fell',en_fragment:'landed',bridge_type:'transform',explanation:'Düşmek -> yere basmak/inmek'}],cultural_insight:'Zor durumdan zarar görmeden çıkmak.',fluency_tip:'"Despite the layoffs, she landed on her feet with a new job."'},
{id:1368,category:'basari',tr:'Turnayı gözünden vurdu',tags:['turna','goz','vur','basari','sans'],english_primary:"Hit the jackpot",alternatives:["Struck gold","Hit a home run"],register:'informal',bridges:[{tr_fragment:'Turnayı',tr_gloss:'the crane (bird)',en_fragment:'jackpot',bridge_type:'cultural',explanation:'Turna avlamak -> büyük ikramiye kazanmak'},{tr_fragment:'gözünden vurdu',tr_gloss:'shot from the eye',en_fragment:'hit',bridge_type:'transform',explanation:'Tam isabet -> kazanmak'}],cultural_insight:'Büyük ve şanslı bir başarı elde etmek.',fluency_tip:'"He really hit the jackpot with that investment."'},
{id:1369,category:'basari',tr:'Yüzünün akıyla çıktı',tags:['yuz','ak','cik','basari','onur'],english_primary:"Came through with flying colors",alternatives:["Passed with distinction","Did oneself proud"],register:'neutral',bridges:[{tr_fragment:'Yüzünün akıyla',tr_gloss:'with whiteness of face',en_fragment:'flying colors',bridge_type:'cultural',explanation:'Yüz akı (onur) -> dalgalanan bayraklar (zafer)'},{tr_fragment:'çıktı',tr_gloss:'came out',en_fragment:'came through',bridge_type:'direct',explanation:'Çıkmak = come through'}],cultural_insight:'Zor bir işi onurla ve başarıyla tamamlamak.',fluency_tip:'"She came through the interview with flying colors."'},
{id:1370,category:'basari',tr:'Boyunun ölçüsünü aldı',tags:['boy','olcu','al','basarisizlik','ders'],english_primary:"Learned their lesson",alternatives:["Met their match","Got what was coming to them"],register:'informal',bridges:[{tr_fragment:'Boyunun ölçüsünü',tr_gloss:'measurement of their height',en_fragment:'lesson',bridge_type:'cultural',explanation:'Boy ölçüsü (haddini bilmek) -> dersini almak'},{tr_fragment:'aldı',tr_gloss:'took',en_fragment:'learned',bridge_type:'transform',explanation:'Almak -> öğrenmek'}],cultural_insight:'Başarısız olup haddini bilmek.',fluency_tip:'"He tried to fix it himself and learned his lesson."'},
{id:1371,category:'basari',tr:'Çuvalladı',tags:['cuval','hata','basarisizlik'],english_primary:"Screwed up",alternatives:["Bombed","Flunked"],register:'slang',bridges:[{tr_fragment:'Çuvalladı',tr_gloss:'put in a sack/stumbled',en_fragment:'screwed up',bridge_type:'cultural',explanation:'Çuvala girmek (hareket edememek) -> işi batırmak'}],cultural_insight:'Büyük hata yapmak, başarısız olmak.',fluency_tip:'"I totally screwed up the presentation."'},
{id:1372,category:'basari',tr:'Sınıfta kaldı',tags:['sinif','kal','basarisizlik'],english_primary:"Failed",alternatives:["Didn't make the grade","Flunked out"],register:'neutral',bridges:[{tr_fragment:'Sınıfta',tr_gloss:'in class',en_fragment:'failed',bridge_type:'cultural',explanation:'Sınıf tekrarı -> başarısızlık'},{tr_fragment:'kaldı',tr_gloss:'remained',en_fragment:'ed',bridge_type:'drop',explanation:'Kalmak'}],cultural_insight:'Mecazen bir işte yetersiz kalmak.',fluency_tip:'"The government failed on its promise."'},
{id:1373,category:'basari',tr:'Gözüne girdi',tags:['goz','gir','basari','begenilmek'],english_primary:"Got in their good graces",alternatives:["Won them over","Made a good impression"],register:'neutral',bridges:[{tr_fragment:'Gözüne',tr_gloss:'into their eye',en_fragment:'good graces',bridge_type:'cultural',explanation:'Göze girmek (fark edilmek/sevilmek) -> lütfa mazhar olmak'},{tr_fragment:'girdi',tr_gloss:'entered',en_fragment:'got in',bridge_type:'direct',explanation:'Girmek = get in'}],cultural_insight:'Takdir kazanmak.',fluency_tip:'"He worked hard to get in the boss\'s good graces."'},
{id:1374,category:'basari',tr:'Havanda su dövdü',tags:['havan','su','dov','bosa','basarisiz'],english_primary:"Spun their wheels",alternatives:["Wasted their breath","Beat a dead horse"],register:'informal',bridges:[{tr_fragment:'Havanda su',tr_gloss:'water in mortar',en_fragment:'wheels',bridge_type:'cultural',explanation:'Suyu dövmek (sonuçsuz iş) -> tekerleğin boşa dönmesi'},{tr_fragment:'dövdü',tr_gloss:'beat',en_fragment:'spun',bridge_type:'transform',explanation:'Dövmek -> dönmek (boşa)'}],cultural_insight:'Sonuçsuz uğraş vermek.',fluency_tip:'"We\'ve been spinning our wheels on this project for weeks."'},
{id:1375,category:'basari',tr:'Tereyağından kıl çeker gibi',tags:['tereyag','kil','kolay','basari'],english_primary:"Smooth sailing",alternatives:["A piece of cake","Like a hot knife through butter"],register:'informal',bridges:[{tr_fragment:'Tereyağından kıl',tr_gloss:'hair from butter',en_fragment:'hot knife through butter',bridge_type:'cultural',explanation:'Yağdan kıl çekmek (kolaylık) -> yağdan bıçak geçmesi'},{tr_fragment:'çeker gibi',tr_gloss:'like pulling',en_fragment:'like',bridge_type:'transform',explanation:'Gibi -> like'}],cultural_insight:'İşin çok kolay ve sorunsuz halledilmesi.',fluency_tip:'"Once we got approval, it was smooth sailing."'},
{id:1376,category:'basari',tr:'Baltayı taşa vurdu',tags:['balta','tas','hata','basarisiz'],english_primary:"Put their foot in their mouth",alternatives:["Dropped a clanger","Made a faux pas"],register:'informal',bridges:[{tr_fragment:'Baltayı',tr_gloss:'axe',en_fragment:'foot',bridge_type:'cultural',explanation:'Balta (keskin alet) -> ayak (gaf)'},{tr_fragment:'taşa vurdu',tr_gloss:'hit stone',en_fragment:'in mouth',bridge_type:'transform',explanation:'Taşa vurmak (yanlış yer) -> ağza sokmak (yanlış söz)'}],cultural_insight:'Pot kırmak, yanlış bir şey söylemek/yapmak.',fluency_tip:'"I really put my foot in my mouth when I asked about her ex."'},
{id:1377,category:'basari',tr:'Dimyat\'a pirince giderken evdeki bulgurdan oldu',tags:['dimyat','pirinc','bulgur','kayip'],english_primary:"Lost it all trying to get more",alternatives:["Bit off more than they could chew","Penny wise, pound foolish"],register:'proverb',bridges:[{tr_fragment:'Pirince giderken',tr_gloss:'going for rice',en_fragment:'trying to get more',bridge_type:'transform',explanation:'Pirinç (daha iyi) -> daha fazlası'},{tr_fragment:'evdeki bulgurdan oldu',tr_gloss:'lost the bulgur at home',en_fragment:'lost it all',bridge_type:'transform',explanation:'Mevcut olandan olmak -> hepsini kaybetmek'}],cultural_insight:'Daha fazlasını isterken elindekini kaybetmek.',fluency_tip:'"He gambled his savings and lost it all trying to get more."'},
{id:1378,category:'basari',tr:'Ekmeğini taştan çıkarır',tags:['ekmek','tas','cikar','caliskan','basari'],english_primary:"Can make a living from anything",alternatives:["Is a real go-getter","Is resourceful"],register:'neutral',bridges:[{tr_fragment:'Ekmeğini',tr_gloss:'their bread',en_fragment:'living',bridge_type:'cultural',explanation:'Ekmek -> geçim kaynağı'},{tr_fragment:'taştan çıkarır',tr_gloss:'extracts from stone',en_fragment:'from anything',bridge_type:'cultural',explanation:'Taş (zorluk) -> her şeyden fırsat yaratmak'}],cultural_insight:'Çok çalışkan ve becerikli olmak.',fluency_tip:'"She\'s so resourceful, she can make a living from anything."'},
{id:1379,category:'basari',tr:'Sırtı yere gelmez',tags:['sirt','yer','guclu','yenilmez'],english_primary:"Indestructible",alternatives:["Unbeatable","Too big to fail"],register:'informal',bridges:[{tr_fragment:'Sırtı',tr_gloss:'their back',en_fragment:'indestructible',bridge_type:'cultural',explanation:'Sırtı yere gelmemek (güreş metaforu) -> yenilmezlik'},{tr_fragment:'yere gelmez',tr_gloss:'does not come to ground',en_fragment:'unbeatable',bridge_type:'transform',explanation:'Yere gelmemek -> yenilmemek'}],cultural_insight:'Güçlü ve yenilmez olmak.',fluency_tip:'"With that kind of funding, the company is practically indestructible."'},
{id:1380,category:'basari',tr:'Ayağını kaydırdı',tags:['ayak','kaydir','rakip','basari'],english_primary:"Pulled the rug out from under",alternatives:["Sabotaged","Undermined"],register:'informal',bridges:[{tr_fragment:'Ayağını',tr_gloss:'their foot',en_fragment:'rug',bridge_type:'cultural',explanation:'Ayak -> halı (zemin)'},{tr_fragment:'kaydırdı',tr_gloss:'made slide',en_fragment:'pulled out',bridge_type:'transform',explanation:'Kaydırmak -> altından çekmek'}],cultural_insight:'Birini işinden veya konumundan etmek.',fluency_tip:'"They pulled the rug out from under him just before the promotion."'},
{id:1381,category:'basari',tr:'Yıldızı parladı',tags:['yildiz','parla','un','basari'],english_primary:"Rose to stardom",alternatives:["Shot to fame","Made a name for oneself"],register:'neutral',bridges:[{tr_fragment:'Yıldızı',tr_gloss:'their star',en_fragment:'stardom',bridge_type:'direct',explanation:'Yıldız = star'},{tr_fragment:'parladı',tr_gloss:'shined',en_fragment:'rose',bridge_type:'transform',explanation:'Parlamak -> yükselmek'}],cultural_insight:'Ünlü veya başarılı olmak.',fluency_tip:'"She rose to stardom after her first movie."'},
{id:1382,category:'basari',tr:'Dikiş tutturamadı',tags:['dikis','tut','basarisiz','is'],english_primary:"Couldn't hold down a job",alternatives:["Couldn't make it stick","Failed to settle"],register:'informal',bridges:[{tr_fragment:'Dikiş',tr_gloss:'stitch/seam',en_fragment:'job',bridge_type:'cultural',explanation:'Dikiş tutmak (birleşmek) -> işte kalıcı olmak'},{tr_fragment:'tutturamadı',tr_gloss:'could not make hold',en_fragment:'couldn\'t hold down',bridge_type:'transform',explanation:'Tutmamak -> tutunamamak'}],cultural_insight:'Bir işte veya yerde kalıcı olamamak.',fluency_tip:'"He tried acting but couldn\'t make it stick."'},
{id:1383,category:'basari',tr:'Boynuz kulağı geçti',tags:['boynuz','kulak','gec','basari','ogrenci'],english_primary:"The student surpassed the master",alternatives:["Outshined the teacher","Went beyond expectations"],register:'proverb',bridges:[{tr_fragment:'Boynuz',tr_gloss:'horn',en_fragment:'student',bridge_type:'cultural',explanation:'Boynuz (sonradan çıkan) -> öğrenci'},{tr_fragment:'kulağı geçti',tr_gloss:'passed the ear',en_fragment:'surpassed master',bridge_type:'cultural',explanation:'Kulak (eski olan) -> usta'}],cultural_insight:'Çırağın ustayı geçmesi.',fluency_tip:'"Looks like the student has surpassed the master."'},
{id:1384,category:'basari',tr:'Havasını aldı',tags:['hava','al','basarisiz','red'],english_primary:"Got snubbed",alternatives:["Left with nothing","Got the cold shoulder"],register:'slang',bridges:[{tr_fragment:'Havasını',tr_gloss:'their air',en_fragment:'snubbed',bridge_type:'cultural',explanation:'Hava almak (eli boş dönmek) -> reddedilmek'},{tr_fragment:'aldı',tr_gloss:'took',en_fragment:'got',bridge_type:'direct',explanation:'Almak = get'}],cultural_insight:'Beklediğini bulamamak, reddedilmek.',fluency_tip:'"He went for a raise but just got snubbed."'},
{id:1385,category:'basari',tr:'Köşeyi döndü',tags:['kose','don','zengin','basari'],english_primary:"Struck it rich",alternatives:["Made a fortune","Hit the big time"],register:'informal',bridges:[{tr_fragment:'Köşeyi',tr_gloss:'the corner',en_fragment:'rich',bridge_type:'cultural',explanation:'Köşeyi dönmek (hayatın dönüm noktası) -> zengin olmak'},{tr_fragment:'döndü',tr_gloss:'turned',en_fragment:'struck',bridge_type:'transform',explanation:'Dönmek -> vurmak (maden)'}],cultural_insight:'Kısa sürede zengin olmak.',fluency_tip:'"After selling his app, he really struck it rich."'},
{id:1386,category:'basari',tr:'Nalları topladı',tags:['nal','topla','ol','basarisiz','iflas'],english_primary:"Kicked the bucket",alternatives:["Belly up","Went bust"],register:'slang',bridges:[{tr_fragment:'Nalları',tr_gloss:'horseshoes',en_fragment:'bucket',bridge_type:'cultural',explanation:'Nalları dikmek/toplamak -> ölmek/iflas etmek'},{tr_fragment:'topladı',tr_gloss:'collected',en_fragment:'kicked',bridge_type:'drop',explanation:'Eylem'}],cultural_insight:'Ölmek veya iflas etmek (bağlama göre).',fluency_tip:'"The company went belly up last year."'},
{id:1387,category:'basari',tr:'Suya düştü',tags:['su','dus','hayal','basarisiz'],english_primary:"Fell through",alternatives:["Went down the drain","Came to naught"],register:'neutral',bridges:[{tr_fragment:'Suya',tr_gloss:'into water',en_fragment:'through',bridge_type:'cultural',explanation:'Suya düşmek (kaybolmak) -> gerçekleşmemek'},{tr_fragment:'düştü',tr_gloss:'fell',en_fragment:'fell',bridge_type:'direct',explanation:'Düşmek = fall'}],cultural_insight:'Planların gerçekleşmemesi.',fluency_tip:'"Our vacation plans fell through."'},
{id:1388,category:'basari',tr:'Ağzıyla kuş tutsa',tags:['agiz','kus','tut','yaranamaz','basari'],english_primary:"Bend over backwards",alternatives:["Jump through hoops","Do the impossible"],register:'informal',bridges:[{tr_fragment:'Ağzıyla kuş tutsa',tr_gloss:'even if catches bird with mouth',en_fragment:'bend over backwards',bridge_type:'cultural',explanation:'İmkansızı yapmak -> aşırı çabalamak'}],cultural_insight:'Ne yaparsa yapsın yaranamamak.',fluency_tip:'"Even if he bends over backwards, they won\'t like him."'},
{id:1389,category:'basari',tr:'Başı göğe erdi',tags:['bas','gok','er','mutlu','basari'],english_primary:"Walk on air",alternatives:["On cloud nine","Over the moon"],register:'informal',bridges:[{tr_fragment:'Başı',tr_gloss:'head',en_fragment:'air',bridge_type:'cultural',explanation:'Başı göğe ermek (yükselmek) -> havada yürümek'},{tr_fragment:'göğe erdi',tr_gloss:'reached sky',en_fragment:'walk',bridge_type:'transform',explanation:'Göğe ulaşmak -> bulutlarda olmak'}],cultural_insight:'Aşırı mutluluk ve tatmin.',fluency_tip:'"She\'s been walking on air since the promotion."'},
{id:1390,category:'basari',tr:'Çorbada tuzu bulunmak',tags:['corba','tuz','katki','basari'],english_primary:"Do one's bit",alternatives:["Contribute","Pitch in"],register:'neutral',bridges:[{tr_fragment:'Çorbada',tr_gloss:'in the soup',en_fragment:'bit',bridge_type:'cultural',explanation:'Çorba (ortak iş) -> parça/pay'},{tr_fragment:'tuzu bulunmak',tr_gloss:'have salt exist',en_fragment:'do',bridge_type:'transform',explanation:'Tuz katmak -> katkıda bulunmak'}],cultural_insight:'Küçük de olsa katkı sağlamak.',fluency_tip:'"I just want to do my bit for the team."'},
{id:1391,category:'basari',tr:'İpi göğüsledi',tags:['ip','gogus','kazan','basari'],english_primary:"Crossed the finish line first",alternatives:["Won the race","Took the gold"],register:'neutral',bridges:[{tr_fragment:'İpi',tr_gloss:'the rope/tape',en_fragment:'finish line',bridge_type:'direct',explanation:'İp = finish line tape'},{tr_fragment:'göğüsledi',tr_gloss:'chested',en_fragment:'crossed',bridge_type:'transform',explanation:'Göğüslemek -> geçmek'}],cultural_insight:'Yarışı kazanmak.',fluency_tip:'"He crossed the finish line first in the sales contest."'},
{id:1392,category:'basari',tr:'Nal toplattı',tags:['nal','toplat','ustun','basari'],english_primary:"Left them in the dust",alternatives:["Ran rings around","Outperformed"],register:'informal',bridges:[{tr_fragment:'Nal',tr_gloss:'horseshoe',en_fragment:'dust',bridge_type:'cultural',explanation:'Nal toplatmak (arkada bırakmak) -> toz yutturmak'},{tr_fragment:'toplattı',tr_gloss:'made collect',en_fragment:'left',bridge_type:'transform',explanation:'Eylem -> bırakmak'}],cultural_insight:'Rakiplerine büyük fark atmak.',fluency_tip:'"Our team left them in the dust."'},
{id:1393,category:'basari',tr:'Yüzüne gözüne bulaştırdı',tags:['yuz','goz','bulastir','hata','basarisiz'],english_primary:"Botched it",alternatives:["Made a mess of it","Bungled"],register:'informal',bridges:[{tr_fragment:'Yüzüne gözüne',tr_gloss:'to face and eye',en_fragment:'mess',bridge_type:'cultural',explanation:'Yüze bulaştırmak -> berbat etmek'},{tr_fragment:'bulaştırdı',tr_gloss:'smeared',en_fragment:'botched',bridge_type:'transform',explanation:'Bulaştırmak -> bozmak'}],cultural_insight:'Bir işi yapayım derken berbat etmek.',fluency_tip:'"He tried to fix the sink but totally botched it."'},
{id:1394,category:'basari',tr:'Altın bilezik',tags:['altin','bilezik','meslek','deger'],english_primary:"A meal ticket",alternatives:["A valuable skill","Bread and butter"],register:'proverb',bridges:[{tr_fragment:'Altın',tr_gloss:'gold',en_fragment:'valuable',bridge_type:'direct',explanation:'Altın = değerli'},{tr_fragment:'bilezik',tr_gloss:'bracelet',en_fragment:'skill',bridge_type:'cultural',explanation:'Bilezik (zenginlik/süs) -> meslek/beceri'}],cultural_insight:'Geçerli meslek veya beceri.',fluency_tip:'"Coding is a real golden bracelet these days."'},
{id:1395,category:'basari',tr:'Meyvesini vermek',tags:['meyve','ver','sonuc','basari'],english_primary:"Bear fruit",alternatives:["Pay off","Yield results"],register:'neutral',bridges:[{tr_fragment:'Meyvesini',tr_gloss:'its fruit',en_fragment:'fruit',bridge_type:'direct',explanation:'Meyve = fruit'},{tr_fragment:'vermek',tr_gloss:'to give',en_fragment:'bear',bridge_type:'direct',explanation:'Vermek = bear/give'}],cultural_insight:'Çabaların sonucunu almak.',fluency_tip:'"Our hard work is finally starting to bear fruit."'},
{id:1396,category:'basari',tr:'Kolu kanadı kırılmak',tags:['kol','kanat','kiril','caresiz','basarisiz'],english_primary:"Have one's wings clipped",alternatives:["Feel defeated","Lose one's power"],register:'neutral',bridges:[{tr_fragment:'Kolu kanadı',tr_gloss:'arm and wing',en_fragment:'wings',bridge_type:'direct',explanation:'Kanat = wing'},{tr_fragment:'kırılmak',tr_gloss:'broken',en_fragment:'clipped',bridge_type:'transform',explanation:'Kırılmak -> kesilmek'}],cultural_insight:'Gücünü veya desteğini kaybetmek.',fluency_tip:'"After the funding cut, his wings were clipped."'},
{id:1397,category:'basari',tr:'Sıfırı tüketti',tags:['sifir','tuket','iflas','bitis'],english_primary:"Hit rock bottom",alternatives:["Went broke","Reached the end of the line"],register:'informal',bridges:[{tr_fragment:'Sıfırı',tr_gloss:'zero',en_fragment:'rock bottom',bridge_type:'cultural',explanation:'Sıfır -> dip nokta'},{tr_fragment:'tüketti',tr_gloss:'consumed',en_fragment:'hit',bridge_type:'transform',explanation:'Tüketmek -> çarpmak'}],cultural_insight:'Maddi veya manevi olarak bitmek.',fluency_tip:'"He hit rock bottom before turning his life around."'},
{id:1398,category:'basari',tr:'Zirveye oynadı',tags:['zirve','oyna','basari','hirs'],english_primary:"Aimed for the top",alternatives:["Shot for the stars","Went for gold"],register:'neutral',bridges:[{tr_fragment:'Zirveye',tr_gloss:'to the summit',en_fragment:'top',bridge_type:'direct',explanation:'Zirve = top'},{tr_fragment:'oynadı',tr_gloss:'played',en_fragment:'aimed',bridge_type:'transform',explanation:'Oynamak -> hedeflemek'}],cultural_insight:'En iyisini hedeflemek.',fluency_tip:'"She always aimed for the top in her career."'},
{id:1399,category:'basari',tr:'Adını altın harflerle yazdırmak',tags:['ad','altin','yaz','basari','tarih'],english_primary:"Go down in history",alternatives:["Make a mark","Leave a legacy"],register:'formal',bridges:[{tr_fragment:'Adını',tr_gloss:'their name',en_fragment:'history',bridge_type:'transform',explanation:'Adını yazdırmak -> tarihe geçmek'},{tr_fragment:'altın harflerle',tr_gloss:'with gold letters',en_fragment:'go down',bridge_type:'drop',explanation:'Altın harf -> kalıcılık'}],cultural_insight:'Büyük ve kalıcı başarı.',fluency_tip:'"This team will go down in history."'},
{id:1400,category:'basari',tr:'Çığır açmak',tags:['cigir','ac','yenilik','basari'],english_primary:"Break new ground",alternatives:["Blaze a trail","Pioneer"],register:'neutral',bridges:[{tr_fragment:'Çığır',tr_gloss:'path/avalanche path',en_fragment:'ground',bridge_type:'cultural',explanation:'Çığır (yol) -> yeni zemin'},{tr_fragment:'açmak',tr_gloss:'open',en_fragment:'break',bridge_type:'transform',explanation:'Açmak -> kırmak (başlatmak)'}],cultural_insight:'Yenilik yapmak, öncü olmak.',fluency_tip:'"The research broke new ground in medicine."'},
{id:1401,category:'basari',tr:'Damgasını vurmak',tags:['damga','vur','etki','basari'],english_primary:"Leave one's mark",alternatives:["Make an impact","Stamp one's authority"],register:'neutral',bridges:[{tr_fragment:'Damgasını',tr_gloss:'their stamp',en_fragment:'mark',bridge_type:'direct',explanation:'Damga = stamp/mark'},{tr_fragment:'vurmak',tr_gloss:'hit',en_fragment:'leave',bridge_type:'transform',explanation:'Vurmak -> bırakmak'}],cultural_insight:'Kalıcı etki bırakmak.',fluency_tip:'"She really left her mark on the industry."'},
{id:1402,category:'basari',tr:'Geri adım atmak',tags:['geri','adim','vazgec','basarisiz'],english_primary:"Back down",alternatives:["Retreat","Throw in the towel"],register:'neutral',bridges:[{tr_fragment:'Geri',tr_gloss:'back',en_fragment:'back',bridge_type:'direct',explanation:'Geri = back'},{tr_fragment:'adım atmak',tr_gloss:'take step',en_fragment:'down',bridge_type:'transform',explanation:'Adım atmak -> inmek/çekilmek'}],cultural_insight:'İddiasından vazgeçmek veya yenilgiyi kabul etmek.',fluency_tip:'"He refused to back down from the challenge."'},
{id:1403,category:'basari',tr:'Hüsrana uğramak',tags:['husran','ugra','hayalkirikligi'],english_primary:"Meet with disappointment",alternatives:["Be frustrated","Have hopes dashed"],register:'formal',bridges:[{tr_fragment:'Hüsrana',tr_gloss:'to frustration',en_fragment:'disappointment',bridge_type:'direct',explanation:'Hüsran = disappointment'},{tr_fragment:'uğramak',tr_gloss:'stop by/undergo',en_fragment:'meet with',bridge_type:'direct',explanation:'Uğramak = meet with'}],cultural_insight:'Beklentinin gerçekleşmemesi.',fluency_tip:'"The project met with disappointment."'},
{id:1404,category:'basari',tr:'İflas bayrağını çekmek',tags:['iflas','bayrak','cek','yenilgi'],english_primary:"Raise the white flag",alternatives:["Declare bankruptcy","Give up"],register:'informal',bridges:[{tr_fragment:'İflas bayrağını',tr_gloss:'bankruptcy flag',en_fragment:'white flag',bridge_type:'cultural',explanation:'İflas bayrağı -> teslim bayrağı'},{tr_fragment:'çekmek',tr_gloss:'pull/hoist',en_fragment:'raise',bridge_type:'direct',explanation:'Çekmek = raise'}],cultural_insight:'Tükenmek, pes etmek.',fluency_tip:'"We had to raise the white flag and ask for help."'},
{id:1405,category:'basari',tr:'Koltukları kabarmak',tags:['koltuk','kabar','gurur','basari'],english_primary:"Swell with pride",alternatives:["Be puffed up","Feel proud"],register:'informal',bridges:[{tr_fragment:'Koltukları',tr_gloss:'armpits',en_fragment:'pride',bridge_type:'cultural',explanation:'Koltuk (koltuk altı) -> göğüs/gurur'},{tr_fragment:'kabarmak',tr_gloss:'swell',en_fragment:'swell',bridge_type:'direct',explanation:'Kabarmak = swell'}],cultural_insight:'Gururlanmak.',fluency_tip:'"My chest swelled with pride when I heard the news."'},
{id:1406,category:'basari',tr:'Pot kırmak',tags:['pot','kir','hata','gaf'],english_primary:"Make a gaffe",alternatives:["Drop a brick","Put foot in mouth"],register:'informal',bridges:[{tr_fragment:'Pot',tr_gloss:'crease/blunder',en_fragment:'gaffe',bridge_type:'direct',explanation:'Pot = gaffe'},{tr_fragment:'kırmak',tr_gloss:'break',en_fragment:'make',bridge_type:'transform',explanation:'Kırmak -> yapmak'}],cultural_insight:'İstemeden yanlış bir şey söylemek.',fluency_tip:'"I made a huge gaffe at the dinner party."'},
{id:1407,category:'basari',tr:'Rüzgarı arkasına almak',tags:['ruzgar','arka','al','sans','destek'],english_primary:"Ride the wave",alternatives:["Have the wind at one's back","Momentum"],register:'neutral',bridges:[{tr_fragment:'Rüzgarı',tr_gloss:'wind',en_fragment:'wave/wind',bridge_type:'direct',explanation:'Rüzgar = wind'},{tr_fragment:'arkasına almak',tr_gloss:'take behind',en_fragment:'at back',bridge_type:'direct',explanation:'Arkaya almak = at back'}],cultural_insight:'Şartların lehte olması.',fluency_tip:'"With the economy improving, we have the wind at our back."'},
{id:1408,category:'basari',tr:'Şeytanın bacağını kırmak',tags:['seytan','bacak','kir','sans','basari'],english_primary:"Break the jinx",alternatives:["Turn the corner","End a losing streak"],register:'informal',bridges:[{tr_fragment:'Şeytanın bacağını',tr_gloss:'devil\'s leg',en_fragment:'jinx',bridge_type:'cultural',explanation:'Şeytan bacağı -> uğursuzluk'},{tr_fragment:'kırmak',tr_gloss:'break',en_fragment:'break',bridge_type:'direct',explanation:'Kırmak = break'}],cultural_insight:'Uzun süren şanssızlığı yenmek.',fluency_tip:'"We finally broke the jinx and won a game."'},
{id:1409,category:'basari',tr:'Yaya kalmak',tags:['yaya','kal','geride','basarisiz'],english_primary:"Be left behind",alternatives:["Fall behind","Miss the boat"],register:'informal',bridges:[{tr_fragment:'Yaya',tr_gloss:'pedestrian',en_fragment:'behind',bridge_type:'cultural',explanation:'Yaya (yavaş) -> geride'},{tr_fragment:'kalmak',tr_gloss:'remain',en_fragment:'left',bridge_type:'transform',explanation:'Kalmak -> bırakılmak'}],cultural_insight:'Gelişmelere ayak uyduramamak.',fluency_tip:'"If you don\'t upgrade, you\'ll be left behind."'},
{id:1410,category:'basari',tr:'Yeri göğü inletmek',tags:['yer','gok','inlet','basari','ses'],english_primary:"Bring the house down",alternatives:["Make a splash","Resound"],register:'informal',bridges:[{tr_fragment:'Yeri göğü',tr_gloss:'earth and sky',en_fragment:'house',bridge_type:'cultural',explanation:'Yer gök -> tüm mekan'},{tr_fragment:'inletmek',tr_gloss:'make groan/resound',en_fragment:'bring down',bridge_type:'transform',explanation:'İnletmek -> yıkmak (alkıştan)'}],cultural_insight:'Büyük başarı ve alkış almak.',fluency_tip:'"Her performance brought the house down."'},
{id:1411,category:'basari',tr:'Alnının akıyla',tags:['alin','ak','onur','basari'],english_primary:"With honor",alternatives:["Fair and square","Head held high"],register:'neutral',bridges:[{tr_fragment:'Alnının',tr_gloss:'forehead',en_fragment:'head',bridge_type:'transform',explanation:'Alın -> baş'},{tr_fragment:'akıyla',tr_gloss:'with whiteness',en_fragment:'high/honor',bridge_type:'cultural',explanation:'Ak (temiz) -> onur'}],cultural_insight:'Hile yapmadan, dürüstçe başarmak.',fluency_tip:'"We won the contract fair and square."'},
{id:1412,category:'basari',tr:'Bir taşla iki kuş vurmak',tags:['tas','kus','vur','kar','basari'],english_primary:"Kill two birds with one stone",alternatives:["Double whammy","Multitask"],register:'proverb',bridges:[{tr_fragment:'Bir taşla',tr_gloss:'with one stone',en_fragment:'one stone',bridge_type:'direct',explanation:'Taş = stone'},{tr_fragment:'iki kuş vurmak',tr_gloss:'hit two birds',en_fragment:'kill two birds',bridge_type:'direct',explanation:'Kuş vurmak -> kuş öldürmek'}],cultural_insight:'Tek hareketle iki kazanç sağlamak. Birebir aynı.',fluency_tip:'"I\'ll kill two birds with one stone by shopping on my way home."'},
{id:1413,category:'basari',tr:'Çam devirmek',tags:['cam','devir','gaf','hata'],english_primary:"Put one's foot in it",alternatives:["Blunder","Make a faux pas"],register:'informal',bridges:[{tr_fragment:'Çam',tr_gloss:'pine tree',en_fragment:'foot',bridge_type:'cultural',explanation:'Çam (büyük ağaç) -> büyük hata'},{tr_fragment:'devirmek',tr_gloss:'topple',en_fragment:'put in',bridge_type:'transform',explanation:'Devirmek -> içine basmak'}],cultural_insight:'İstemeden büyük laf etmek, kalp kırmak.',fluency_tip:'"I think I really put my foot in it with that comment."'},
{id:1414,category:'basari',tr:'Gözden düşmek',tags:['goz','dus','deger','basarisiz'],english_primary:"Fall from grace",alternatives:["Lose favor","Be discredited"],register:'neutral',bridges:[{tr_fragment:'Gözden',tr_gloss:'from eye',en_fragment:'grace',bridge_type:'cultural',explanation:'Göz (değer) -> lütuf'},{tr_fragment:'düşmek',tr_gloss:'fall',en_fragment:'fall',bridge_type:'direct',explanation:'Düşmek = fall'}],cultural_insight:'Saygınlığını kaybetmek.',fluency_tip:'"The politician fell from grace after the scandal."'},
{id:1415,category:'basari',tr:'Havlu atmak',tags:['havlu','at','pes','yenilgi'],english_primary:"Throw in the towel",alternatives:["Give up","Quit"],register:'informal',bridges:[{tr_fragment:'Havlu',tr_gloss:'towel',en_fragment:'towel',bridge_type:'direct',explanation:'Havlu = towel'},{tr_fragment:'atmak',tr_gloss:'throw',en_fragment:'throw in',bridge_type:'direct',explanation:'Atmak = throw'}],cultural_insight:'Pes etmek. Boks terimi, iki dilde de aynı.',fluency_tip:'"It\'s too early to throw in the towel."'},
{id:1416,category:'basari',tr:'İşleri tıkırında',tags:['is','tikir','iyi','basari'],english_primary:"Things are running smoothly",alternatives:["On a roll","Like clockwork"],register:'informal',bridges:[{tr_fragment:'İşleri',tr_gloss:'works',en_fragment:'things',bridge_type:'direct',explanation:'İşler = things'},{tr_fragment:'tıkırında',tr_gloss:'clicking/ticking',en_fragment:'smoothly',bridge_type:'cultural',explanation:'Tıkır (saat sesi) -> düzenli işleyiş'}],cultural_insight:'Her şeyin yolunda gitmesi.',fluency_tip:'"Everything is running like clockwork."'},
{id:1417,category:'gunluk',tr:'Ağzına layık',tags:['agiz','layik','lezzetli','yemek'],english_primary:"Fit for a king",alternatives:["Delicious","Mouth-watering"],register:'informal',bridges:[{tr_fragment:'Ağzına',tr_gloss:'to your mouth',en_fragment:'fit',bridge_type:'transform',explanation:'Ağıza uygun -> krala layık'},{tr_fragment:'layık',tr_gloss:'worthy',en_fragment:'king',bridge_type:'cultural',explanation:'Layık olmak -> en iyisi'}],cultural_insight:'Çok lezzetli yemek.',fluency_tip:'"This dinner is fit for a king."'},
{id:1418,category:'gunluk',tr:'Bal dök yala',tags:['bal','dok','yala','temiz'],english_primary:"Spic and span",alternatives:["Squeaky clean","Spotless"],register:'informal',bridges:[{tr_fragment:'Bal dök',tr_gloss:'pour honey',en_fragment:'spic',bridge_type:'cultural',explanation:'O kadar temiz ki bal döküp yersin'},{tr_fragment:'yala',tr_gloss:'lick',en_fragment:'span',bridge_type:'drop',explanation:'Temizlik vurgusu'}],cultural_insight:'Aşırı temizlik.',fluency_tip:'"The house was spic and span for the guests."'},
{id:1419,category:'gunluk',tr:'Başının etini yemek',tags:['bas','et','ye','konusmak','bikkinlik'],english_primary:"Chew someone's ear off",alternatives:["Nag someone to death","Talk someone's head off"],register:'informal',bridges:[{tr_fragment:'Başının etini',tr_gloss:'meat of head',en_fragment:'ear',bridge_type:'transform',explanation:'Baş eti -> kulak'},{tr_fragment:'yemek',tr_gloss:'eat',en_fragment:'chew off',bridge_type:'direct',explanation:'Yemek -> çiğnemek'}],cultural_insight:'Sürekli konuşarak rahatsız etmek.',fluency_tip:'"She chewed my ear off about her problems."'},
{id:1420,category:'gunluk',tr:'Can boğazdan gelir',tags:['can','bogaz','yemek','saglik'],english_primary:"An army marches on its stomach",alternatives:["Food is fuel","You are what you eat"],register:'proverb',bridges:[{tr_fragment:'Can',tr_gloss:'life/soul',en_fragment:'army',bridge_type:'cultural',explanation:'Can (yaşam) -> ordu (güç)'},{tr_fragment:'boğazdan gelir',tr_gloss:'comes from throat',en_fragment:'stomach',bridge_type:'transform',explanation:'Boğaz -> mide'}],cultural_insight:'Yemenin gücün kaynağı olduğu.',fluency_tip:'"Let\'s eat first; an army marches on its stomach."'},
{id:1421,category:'gunluk',tr:'Çayı tazelemek',tags:['cay','tazele','ikram'],english_primary:"Top up the tea",alternatives:["Refill","Freshen up"],register:'neutral',bridges:[{tr_fragment:'Çayı',tr_gloss:'tea',en_fragment:'tea',bridge_type:'direct',explanation:'Çay = tea'},{tr_fragment:'tazelemek',tr_gloss:'freshen',en_fragment:'top up',bridge_type:'transform',explanation:'Tazelemek -> üstünü doldurmak'}],cultural_insight:'Çay bardağını doldurmak.',fluency_tip:'"Let me top up your tea."'},
{id:1422,category:'gunluk',tr:'Damak tadı',tags:['damak','tat','yemek','zev'],english_primary:"Palate",alternatives:["Taste","Preference"],register:'neutral',bridges:[{tr_fragment:'Damak',tr_gloss:'palate',en_fragment:'palate',bridge_type:'direct',explanation:'Damak = palate'},{tr_fragment:'tadı',tr_gloss:'taste',en_fragment:'taste',bridge_type:'drop',explanation:'Tadı'}],cultural_insight:'Yemek zevki.',fluency_tip:'"He has a very sophisticated palate."'},
{id:1423,category:'gunluk',tr:'Dilinin ucunda',tags:['dil','uc','hatirla'],english_primary:"On the tip of one's tongue",alternatives:["Almost remembered","Slipped my mind"],register:'neutral',bridges:[{tr_fragment:'Dilinin',tr_gloss:'tongue',en_fragment:'tongue',bridge_type:'direct',explanation:'Dil = tongue'},{tr_fragment:'ucunda',tr_gloss:'at tip',en_fragment:'tip',bridge_type:'direct',explanation:'Uç = tip'}],cultural_insight:'Hatırlamak üzere olmak. Birebir aynı.',fluency_tip:'"His name is on the tip of my tongue."'},
{id:1424,category:'gunluk',tr:'El lezzeti',tags:['el','lezzet','yemek','beceri'],english_primary:"Culinary touch",alternatives:["Knack for cooking","Magic touch"],register:'neutral',bridges:[{tr_fragment:'El',tr_gloss:'hand',en_fragment:'touch',bridge_type:'transform',explanation:'El -> dokunuş'},{tr_fragment:'lezzeti',tr_gloss:'flavor',en_fragment:'culinary',bridge_type:'transform',explanation:'Lezzet -> mutfak becerisi'}],cultural_insight:'Kişiye özgü yemek yapma becerisi.',fluency_tip:'"She has a real culinary touch."'},
{id:1425,category:'gunluk',tr:'Göz hakkı',tags:['goz','hak','yemek','ikram'],english_primary:"Share for looking",alternatives:["Taster's share","Fair share"],register:'cultural',bridges:[{tr_fragment:'Göz',tr_gloss:'eye',en_fragment:'looking',bridge_type:'direct',explanation:'Göz -> bakmak'},{tr_fragment:'hakkı',tr_gloss:'right',en_fragment:'share',bridge_type:'transform',explanation:'Hak -> pay'}],cultural_insight:'Yemeği görenin onu tatma hakkı olduğu inancı.',fluency_tip:'"You must have a taste, it\'s only fair since you saw it."'},
{id:1426,category:'gunluk',tr:'İçi kıyılmak',tags:['ic','kiyil','aclik'],english_primary:"Feel peckish",alternatives:["Starving","Have a craving"],register:'informal',bridges:[{tr_fragment:'İçi',tr_gloss:'inside',en_fragment:'peckish',bridge_type:'transform',explanation:'İç -> mide hissi'},{tr_fragment:'kıyılmak',tr_gloss:'minced',en_fragment:'feel',bridge_type:'cultural',explanation:'Kıyılmak -> hafif açlık hissi'}],cultural_insight:'Hafif açlık veya midede kazınma.',fluency_tip:'"I\'m feeling a bit peckish, shall we get a snack?"'},
{id:1427,category:'gunluk',tr:'Karnı zil çalmak',tags:['karin','zil','cal','aclik'],english_primary:"Stomach growling",alternatives:["Famished","Starving"],register:'informal',bridges:[{tr_fragment:'Karnı',tr_gloss:'stomach',en_fragment:'stomach',bridge_type:'direct',explanation:'Karın = stomach'},{tr_fragment:'zil çalmak',tr_gloss:'ring bell',en_fragment:'growling',bridge_type:'cultural',explanation:'Zil çalmak -> guruldamak'}],cultural_insight:'Çok acıkmak.',fluency_tip:'"My stomach is growling, let\'s eat."'},
{id:1428,category:'gunluk',tr:'Kesenin ağzını açmak',tags:['kese','agiz','ac','para','harcama'],english_primary:"Loosen the purse strings",alternatives:["Splash out","Spend freely"],register:'informal',bridges:[{tr_fragment:'Kesenin',tr_gloss:'pouch/purse',en_fragment:'purse',bridge_type:'direct',explanation:'Kese = purse'},{tr_fragment:'ağzını açmak',tr_gloss:'open mouth',en_fragment:'loosen strings',bridge_type:'transform',explanation:'Açmak -> gevşetmek'}],cultural_insight:'Cömertçe harcamak.',fluency_tip:'"The company loosened the purse strings for the party."'},
{id:1429,category:'gunluk',tr:'Lokma dökmek',tags:['lokma','dok','tatli','kultur'],english_primary:"Make doughnuts",alternatives:["Serve sweet balls","Treat"],register:'cultural',bridges:[{tr_fragment:'Lokma',tr_gloss:'morsel/doughnut',en_fragment:'doughnut',bridge_type:'direct',explanation:'Lokma tatlısı'},{tr_fragment:'dökmek',tr_gloss:'pour',en_fragment:'make',bridge_type:'transform',explanation:'Hamur dökmek -> yapmak'}],cultural_insight:'Hayır için tatlı dağıtmak.',fluency_tip:'"They made doughnuts for the charity event."'},
{id:1430,category:'gunluk',tr:'Masayı donatmak',tags:['masa','donat','yemek','ziyafet'],english_primary:"Lay out a spread",alternatives:["Feast","Set a banquet"],register:'neutral',bridges:[{tr_fragment:'Masayı',tr_gloss:'table',en_fragment:'spread',bridge_type:'transform',explanation:'Masa -> sergi'},{tr_fragment:'donatmak',tr_gloss:'equip/deck out',en_fragment:'lay out',bridge_type:'transform',explanation:'Donatmak -> sermek'}],cultural_insight:'Zengin bir sofra hazırlamak.',fluency_tip:'"They laid out a huge spread for breakfast."'},
{id:1431,category:'gunluk',tr:'Ocağına incir ağacı dikmek',tags:['ocak','incir','agac','dik','kotuluk'],english_primary:"Ruin someone's home/life",alternatives:["Destroy a family","Wipe out"],register:'idiom',bridges:[{tr_fragment:'Ocağına',tr_gloss:'to their hearth',en_fragment:'home',bridge_type:'cultural',explanation:'Ocak -> ev/yuva'},{tr_fragment:'incir ağacı dikmek',tr_gloss:'plant fig tree',en_fragment:'ruin',bridge_type:'cultural',explanation:'İncir ağacı (kökleri evi yıkar) -> yok etmek'}],cultural_insight:'Birinin yuvasını söndürmek, mahvetmek.',fluency_tip:'"Gambling ruined his home life."'},
{id:1432,category:'gunluk',tr:'Parmaklarını yemek',tags:['parmak','ye','lezzet','yemek'],english_primary:"Finger-licking good",alternatives:["Delicious","Scrumptious"],register:'informal',bridges:[{tr_fragment:'Parmaklarını',tr_gloss:'fingers',en_fragment:'finger',bridge_type:'direct',explanation:'Parmak = finger'},{tr_fragment:'yemek',tr_gloss:'eat',en_fragment:'licking',bridge_type:'transform',explanation:'Yemek -> yalamak (lezzet)'}],cultural_insight:'Çok lezzetli.',fluency_tip:'"That chicken was finger-licking good."'},
{id:1433,category:'gunluk',tr:'Sudan ucuz',tags:['su','ucuz','fiyat'],english_primary:"Dirt cheap",alternatives:["A steal","Cost peanuts"],register:'informal',bridges:[{tr_fragment:'Sudan',tr_gloss:'than water',en_fragment:'dirt',bridge_type:'cultural',explanation:'Sudan -> topraktan (bol bulunan)'},{tr_fragment:'ucuz',tr_gloss:'cheap',en_fragment:'cheap',bridge_type:'direct',explanation:'Ucuz = cheap'}],cultural_insight:'Çok ucuz.',fluency_tip:'"I got this shirt dirt cheap."'},
{id:1434,category:'gunluk',tr:'Tadında bırakmak',tags:['tat','birak','doz','yeter'],english_primary:"Quit while one's ahead",alternatives:["Leave on a high note","Don't overdo it"],register:'neutral',bridges:[{tr_fragment:'Tadında',tr_gloss:'in its taste',en_fragment:'ahead',bridge_type:'cultural',explanation:'Tadı bozulmadan -> zirvedeyken'},{tr_fragment:'bırakmak',tr_gloss:'leave',en_fragment:'quit',bridge_type:'direct',explanation:'Bırakmak = quit'}],cultural_insight:'Uzatıp bezdirmemek.',fluency_tip:'"You should quit while you\'re ahead."'},
{id:1435,category:'gunluk',tr:'Tuz biber ekmek',tags:['tuz','biber','ek','kotu','artirmak'],english_primary:"Add insult to injury",alternatives:["Rub salt in the wound","Make matters worse"],register:'informal',bridges:[{tr_fragment:'Tuz biber',tr_gloss:'salt pepper',en_fragment:'insult/salt',bridge_type:'cultural',explanation:'Acıya tuz biber -> yaraya tuz'},{tr_fragment:'ekmek',tr_gloss:'sow',en_fragment:'add',bridge_type:'transform',explanation:'Ekmek -> eklemek'}],cultural_insight:'Kötü bir durumu daha da kötüleştirmek.',fluency_tip:'"Losing my keys just added insult to injury after the bad day."'},
{id:1436,category:'gunluk',tr:'Yemeden yanında yat',tags:['ye','yat','lezzet','guzel'],english_primary:"Too good to eat",alternatives:["Feast for the eyes","Look delicious"],register:'idiom',bridges:[{tr_fragment:'Yemeden',tr_gloss:'without eating',en_fragment:'too good',bridge_type:'cultural',explanation:'Yemeye kıyamamak -> çok güzel'},{tr_fragment:'yanında yat',tr_gloss:'sleep beside',en_fragment:'eat',bridge_type:'drop',explanation:'Seyretmek'}],cultural_insight:'Görünüşü veya tadı harika.',fluency_tip:'"This cake looks too good to eat."'},
{id:1437,category:'gunluk',tr:'Zehir zemberek',tags:['zehir','zemberek','aci','kotu'],english_primary:"Bitterly cold/sharp",alternatives:["Scathing","Vicious"],register:'informal',bridges:[{tr_fragment:'Zehir',tr_gloss:'poison',en_fragment:'bitter',bridge_type:'cultural',explanation:'Zehir -> acı'},{tr_fragment:'zemberek',tr_gloss:'spring',en_fragment:'sharp',bridge_type:'drop',explanation:'Pekiştirme'}],cultural_insight:'Çok acı (yemek veya söz) veya çok soğuk.',fluency_tip:'"His review was scathing."'},
{id:1438,category:'gunluk',tr:'Aç ayı oynamaz',tags:['ac','ayi','oyna','yemek','is'],english_primary:"Can't work on an empty stomach",alternatives:["Need fuel","Feed the beast"],register:'proverb',bridges:[{tr_fragment:'Aç ayı',tr_gloss:'hungry bear',en_fragment:'empty stomach',bridge_type:'cultural',explanation:'Ayı -> mide'},{tr_fragment:'oynamaz',tr_gloss:'does not dance',en_fragment:'work',bridge_type:'transform',explanation:'Oynamak -> çalışmak'}],cultural_insight:'İş yapmadan önce yemek gerek.',fluency_tip:'"I can\'t focus; I can\'t work on an empty stomach."'},
{id:1439,category:'gunluk',tr:'Ağzının suyu akmak',tags:['agiz','su','ak','istek','yemek'],english_primary:"Mouth water",alternatives:["Drool over","Crave"],register:'informal',bridges:[{tr_fragment:'Ağzının suyu',tr_gloss:'water of mouth',en_fragment:'mouth water',bridge_type:'direct',explanation:'Ağız suyu = tükürük'},{tr_fragment:'akmak',tr_gloss:'flow',en_fragment:'water',bridge_type:'transform',explanation:'Akmak -> sulanmak'}],cultural_insight:'Çok istemek, imrenmek.',fluency_tip:'"My mouth waters whenever I smell pizza."'},
{id:1440,category:'gunluk',tr:'Balık kavağa çıkınca',tags:['balik','kavak','cik','imkansiz'],english_primary:"When pigs fly",alternatives:["Never","In a month of Sundays"],register:'idiom',bridges:[{tr_fragment:'Balık',tr_gloss:'fish',en_fragment:'pigs',bridge_type:'cultural',explanation:'Balık (imkansız yer) -> domuz (uçmak)'},{tr_fragment:'kavağa çıkınca',tr_gloss:'climbs poplar tree',en_fragment:'fly',bridge_type:'transform',explanation:'Ağaca çıkmak -> uçmak'}],cultural_insight:'Asla olmayacak şey.',fluency_tip:'"He\'ll pay you back when pigs fly."'},
{id:1441,category:'gunluk',tr:'Beş parasız',tags:['bes','para','fakir'],english_primary:"Flat broke",alternatives:["Penniless","Skint"],register:'informal',bridges:[{tr_fragment:'Beş',tr_gloss:'five',en_fragment:'flat',bridge_type:'cultural',explanation:'Beş para (en küçük birim) yok -> tamamen'},{tr_fragment:'parasız',tr_gloss:'moneyless',en_fragment:'broke',bridge_type:'direct',explanation:'Parasız = broke'}],cultural_insight:'Hiç parası olmamak.',fluency_tip:'"I\'m flat broke until payday."'},
{id:1442,category:'gunluk',tr:'Çulsuz',tags:['culsuz','fakir','parasiz'],english_primary:"Destitute",alternatives:["Broke","Down and out"],register:'slang',bridges:[{tr_fragment:'Çulsuz',tr_gloss:'without horsecloth',en_fragment:'destitute',bridge_type:'cultural',explanation:'Çul (eski kıyafet) bile yok -> sefil'}],cultural_insight:'Çok fakir.',fluency_tip:'"He died destitute."'},
{id:1443,category:'gunluk',tr:'Elden ayaktan düşmek',tags:['el','ayak','dus','yasli','hasta'],english_primary:"Become decrepit",alternatives:["Lose one's faculties","Become infirm"],register:'idiom',bridges:[{tr_fragment:'Elden ayaktan',tr_gloss:'from hand and foot',en_fragment:'decrepit',bridge_type:'cultural',explanation:'El ayak tutmamak -> düşkünleşmek'},{tr_fragment:'düşmek',tr_gloss:'fall',en_fragment:'become',bridge_type:'transform',explanation:'Düşmek -> olmak'}],cultural_insight:'Yaşlanıp bakıma muhtaç olmak.',fluency_tip:'"She became infirm in her old age."'},
{id:1444,category:'gunluk',tr:'Gözü yüksekte',tags:['goz','yuksek','hirs'],english_primary:"Ambitious",alternatives:["Aiming high","Has high hopes"],register:'neutral',bridges:[{tr_fragment:'Gözü',tr_gloss:'eye',en_fragment:'aiming',bridge_type:'transform',explanation:'Gözü olmak -> hedeflemek'},{tr_fragment:'yüksekte',tr_gloss:'at high',en_fragment:'high',bridge_type:'direct',explanation:'Yüksek = high'}],cultural_insight:'Büyük hedefleri olmak.',fluency_tip:'"He\'s aiming high with his new startup."'},
{id:1445,category:'gunluk',tr:'Hal vakit yerinde',tags:['hal','vakit','zengin','durum'],english_primary:"Well-off",alternatives:["Comfortable","Well-to-do"],register:'neutral',bridges:[{tr_fragment:'Hal vakit',tr_gloss:'state time',en_fragment:'well',bridge_type:'cultural',explanation:'Durumu iyi -> zengin'},{tr_fragment:'yerinde',tr_gloss:'in place',en_fragment:'off',bridge_type:'transform',explanation:'Yerinde -> iyi durumda'}],cultural_insight:'Maddi durumu iyi.',fluency_tip:'"They come from a well-off family."'},
{id:1446,category:'gunluk',tr:'İğne atsan yere düşmez',tags:['igne','at','dus','kalabalik'],english_primary:"Packed like sardines",alternatives:["Jam-packed","Crowded"],register:'informal',bridges:[{tr_fragment:'İğne atsan',tr_gloss:'if throw needle',en_fragment:'packed',bridge_type:'cultural',explanation:'İğne düşecek yer yok -> sıkışık'},{tr_fragment:'yere düşmez',tr_gloss:'wont fall to ground',en_fragment:'sardines',bridge_type:'cultural',explanation:'Boşluk yok -> sardalya gibi'}],cultural_insight:'Çok kalabalık.',fluency_tip:'"The bus was packed like sardines."'},
{id:1447,category:'gunluk',tr:'Kafasına göre',tags:['kafa','gore','ozgur','rahat'],english_primary:"As one pleases",alternatives:["Do one's own thing","Play it by ear"],register:'informal',bridges:[{tr_fragment:'Kafasına',tr_gloss:'to head',en_fragment:'pleases',bridge_type:'cultural',explanation:'Kafa (istek) -> keyfine göre'},{tr_fragment:'göre',tr_gloss:'according to',en_fragment:'as',bridge_type:'direct',explanation:'Göre = as'}],cultural_insight:'İstediği gibi davranmak.',fluency_tip:'"He just does as he pleases."'},
{id:1448,category:'gunluk',tr:'Kılı kırk yarmak',tags:['kil','kirk','yar','detay','titiz'],english_primary:"Split hairs",alternatives:["Nitpick","Be fastidious"],register:'idiom',bridges:[{tr_fragment:'Kılı',tr_gloss:'hair',en_fragment:'hairs',bridge_type:'direct',explanation:'Kıl = hair'},{tr_fragment:'kırk yarmak',tr_gloss:'split forty times',en_fragment:'split',bridge_type:'transform',explanation:'Kırk yarmak -> bölmek'}],cultural_insight:'Aşırı detaycı olmak. Birebir aynı.',fluency_tip:'"Stop splitting hairs and look at the big picture."'},
{id:1449,category:'gunluk',tr:'Lafı ağzına tıkamak',tags:['laf','agiz','tika','susturmak'],english_primary:"Cut someone short",alternatives:["Interrupt","Shut someone down"],register:'informal',bridges:[{tr_fragment:'Lafı',tr_gloss:'word',en_fragment:'short',bridge_type:'transform',explanation:'Laf -> kısa kesmek'},{tr_fragment:'ağzına tıkamak',tr_gloss:'stuff in mouth',en_fragment:'cut',bridge_type:'cultural',explanation:'Ağıza tıkmak -> sözünü kesmek'}],cultural_insight:'Konuşturmamak, susturmak.',fluency_tip:'"She cut him short before he could explain."'},
{id:1450,category:'gunluk',tr:'Maymun iştahlı',tags:['maymun','istah','kararsiz'],english_primary:"Fickle",alternatives:["Flighty","Can't stick to anything"],register:'idiom',bridges:[{tr_fragment:'Maymun',tr_gloss:'monkey',en_fragment:'fickle',bridge_type:'cultural',explanation:'Maymun (daldan dala) -> kararsız'},{tr_fragment:'iştahlı',tr_gloss:'appetited',en_fragment:'stick',bridge_type:'drop',explanation:'İştah -> ilgi'}],cultural_insight:'Çabuk heveslenip çabuk vazgeçen.',fluency_tip:'"He\'s too fickle to keep a hobby for long."'},
{id:1451,category:'gunluk',tr:'Nabza göre şerbet',tags:['nabiz','serbet','uyum'],english_primary:"Play to the audience",alternatives:["Tell people what they want to hear","Adapt"],register:'idiom',bridges:[{tr_fragment:'Nabza göre',tr_gloss:'according to pulse',en_fragment:'audience',bridge_type:'cultural',explanation:'Nabız (durum) -> kitle'},{tr_fragment:'şerbet',tr_gloss:'sherbet',en_fragment:'play',bridge_type:'transform',explanation:'Şerbet vermek -> oynamak/uyum sağlamak'}],cultural_insight:'Duruma veya kişiye uygun davranmak.',fluency_tip:'"A politician has to play to the audience."'},
{id:1452,category:'gunluk',tr:'Ölüsü kınalı',tags:['olu','kinali','sansli'],english_primary:"Born under a lucky star",alternatives:["Charmed life","Lucky devil"],register:'idiom',bridges:[{tr_fragment:'Ölüsü',tr_gloss:'corpse',en_fragment:'star',bridge_type:'cultural',explanation:'Ölüsü bile değerli -> şanslı'},{tr_fragment:'kınalı',tr_gloss:'hennaed',en_fragment:'lucky',bridge_type:'transform',explanation:'Kına (süs) -> şans'}],cultural_insight:'Çok şanslı kişi.',fluency_tip:'"He was born under a lucky star."'},
{id:1453,category:'gunluk',tr:'Para sızdırmak',tags:['para','sizdir','dolandir'],english_primary:"Extort money",alternatives:["Bleed dry","Squeeze money out of"],register:'informal',bridges:[{tr_fragment:'Para',tr_gloss:'money',en_fragment:'money',bridge_type:'direct',explanation:'Para = money'},{tr_fragment:'sızdırmak',tr_gloss:'leak',en_fragment:'extort/squeeze',bridge_type:'transform',explanation:'Sızdırmak -> zorla almak'}],cultural_insight:'Kurnazlıkla para almak.',fluency_tip:'"They tried to squeeze money out of the tourists."'},
{id:1454,category:'gunluk',tr:'Renkten renge girmek',tags:['renk','gir','utan','heyecan'],english_primary:"Change color",alternatives:["Go red/white","Be embarrassed"],register:'neutral',bridges:[{tr_fragment:'Renkten renge',tr_gloss:'from color to color',en_fragment:'change color',bridge_type:'direct',explanation:'Renk = color'},{tr_fragment:'girmek',tr_gloss:'enter',en_fragment:'change',bridge_type:'transform',explanation:'Girmek -> değişmek'}],cultural_insight:'Utanmak veya heyecanlanmak.',fluency_tip:'"She changed color when they mentioned his name."'},
{id:1455,category:'gunluk',tr:'Saman alevi gibi',tags:['saman','alev','gibi','gecici','ofke'],english_primary:"Flash in the pan",alternatives:["Short-lived","Flare up"],register:'idiom',bridges:[{tr_fragment:'Saman alevi',tr_gloss:'straw flame',en_fragment:'flash',bridge_type:'cultural',explanation:'Saman alevi (hızlı yanıp sönen) -> anlık parlama'},{tr_fragment:'gibi',tr_gloss:'like',en_fragment:'pan',bridge_type:'drop',explanation:'Benzetme'}],cultural_insight:'Çabuk parlayıp sönen öfke veya heves.',fluency_tip:'"His anger is like a flash in the pan; it\'s over quickly."'},
{id:1456,category:'gunluk',tr:'Tadı kaçmak',tags:['tat','kac','keyif','bozuk'],english_primary:"Turn sour",alternatives:["Lose its charm","Go pear-shaped"],register:'informal',bridges:[{tr_fragment:'Tadı',tr_gloss:'taste',en_fragment:'sour',bridge_type:'transform',explanation:'Tat -> ekşi (bozuk)'},{tr_fragment:'kaçmak',tr_gloss:'escape',en_fragment:'turn',bridge_type:'transform',explanation:'Kaçmak -> dönmek'}],cultural_insight:'Keyifsizleşmek.',fluency_tip:'"The relationship turned sour after the argument."'},
{id:1457,category:'gunluk',tr:'Ucu ucuna',tags:['uc','yetismek','zor'],english_primary:"By the skin of one's teeth",alternatives:["Barely","Just in time"],register:'idiom',bridges:[{tr_fragment:'Ucu ucuna',tr_gloss:'tip to tip',en_fragment:'skin of teeth',bridge_type:'cultural',explanation:'Uç uca (zorla) -> diş derisi kadar az farkla'}],cultural_insight:'Tam sınırda, zorla.',fluency_tip:'"We caught the train by the skin of our teeth."'},
{id:1458,category:'gunluk',tr:'Üstüne gitmek',tags:['ust','git','baski'],english_primary:"Press someone",alternatives:["Push","Pressure"],register:'neutral',bridges:[{tr_fragment:'Üstüne',tr_gloss:'onto',en_fragment:'press',bridge_type:'transform',explanation:'Üstüne varmak -> baskılamak'},{tr_fragment:'gitmek',tr_gloss:'go',en_fragment:'push',bridge_type:'transform',explanation:'Gitmek -> itmek'}],cultural_insight:'Birini zorlamak veya sıkıştırmak.',fluency_tip:'"Don\'t press him too hard on this issue."'},
{id:1459,category:'gunluk',tr:'Vakit öldürmek',tags:['vakit','oldur','bos'],english_primary:"Kill time",alternatives:["While away the hours","Twiddle thumbs"],register:'informal',bridges:[{tr_fragment:'Vakit',tr_gloss:'time',en_fragment:'time',bridge_type:'direct',explanation:'Vakit = time'},{tr_fragment:'öldürmek',tr_gloss:'kill',en_fragment:'kill',bridge_type:'direct',explanation:'Öldürmek = kill'}],cultural_insight:'Zaman geçirmek. Birebir aynı.',fluency_tip:'"We were just killing time at the airport."'},
{id:1460,category:'gunluk',tr:'Yaka silkmek',tags:['yaka','silk','bikmak'],english_primary:"Be fed up with",alternatives:["Sick and tired","Had it up to here"],register:'informal',bridges:[{tr_fragment:'Yaka',tr_gloss:'collar',en_fragment:'fed up',bridge_type:'cultural',explanation:'Yaka silkmek (bıkkınlık hareketi) -> doymak (bıkmak)'},{tr_fragment:'silkmek',tr_gloss:'shake off',en_fragment:'with',bridge_type:'drop',explanation:'Eylem'}],cultural_insight:'Bıkmak, usanmak.',fluency_tip:'"I\'m absolutely fed up with this traffic."'},
{id:1461,category:'gunluk',tr:'Zıvanadan çıkmak',tags:['zivana','cik','delirmek','sinir'],english_primary:"Go off the rails",alternatives:["Go berserk","Lose control"],register:'informal',bridges:[{tr_fragment:'Zıvanadan',tr_gloss:'from the tenon',en_fragment:'off rails',bridge_type:'cultural',explanation:'Zıvana (ray/yol) -> raydan çıkmak'},{tr_fragment:'çıkmak',tr_gloss:'go out',en_fragment:'go',bridge_type:'direct',explanation:'Çıkmak = go'}],cultural_insight:'Kontrolden çıkmak, çıldırmak.',fluency_tip:'"The party went off the rails after midnight."'},
{id:1462,category:'gunluk',tr:'Açık kapı bırakmak',tags:['acik','kapi','birak','firsat'],english_primary:"Leave the door open",alternatives:["Keep options open","Not rule out"],register:'neutral',bridges:[{tr_fragment:'Açık kapı',tr_gloss:'open door',en_fragment:'open door',bridge_type:'direct',explanation:'Açık kapı = open door'},{tr_fragment:'bırakmak',tr_gloss:'leave',en_fragment:'leave',bridge_type:'direct',explanation:'Bırakmak = leave'}],cultural_insight:'İmkan tanımak. Birebir aynı.',fluency_tip:'"They left the door open for future negotiations."'},
{id:1463,category:'gunluk',tr:'Başına buyruk',tags:['bas','buyruk','ozgur'],english_primary:"Independent",alternatives:["Maverick","Self-willed"],register:'neutral',bridges:[{tr_fragment:'Başına',tr_gloss:'to head',en_fragment:'self',bridge_type:'transform',explanation:'Baş -> kendi'},{tr_fragment:'buyruk',tr_gloss:'order',en_fragment:'willed',bridge_type:'transform',explanation:'Buyruk -> irade'}],cultural_insight:'Kimseden emir almayan.',fluency_tip:'"She\'s a very independent spirit."'},
{id:1464,category:'gunluk',tr:'Canla başla',tags:['can','bas','calismak','gayret'],english_primary:"Heart and soul",alternatives:["Tooth and nail","With all one's might"],register:'neutral',bridges:[{tr_fragment:'Canla',tr_gloss:'with soul',en_fragment:'heart',bridge_type:'direct',explanation:'Can = heart/soul'},{tr_fragment:'başla',tr_gloss:'with head',en_fragment:'soul',bridge_type:'transform',explanation:'Baş -> bütünlük'}],cultural_insight:'Tüm gücüyle çalışmak.',fluency_tip:'"He put his heart and soul into this project."'},
{id:1465,category:'gunluk',tr:'Çantada keklik',tags:['canta','keklik','kolay','garanti'],english_primary:"In the bag",alternatives:["Sure thing","Done deal"],register:'informal',bridges:[{tr_fragment:'Çantada',tr_gloss:'in bag',en_fragment:'in bag',bridge_type:'direct',explanation:'Çanta = bag'},{tr_fragment:'keklik',tr_gloss:'partridge',en_fragment:'it',bridge_type:'drop',explanation:'Keklik (av) -> kazanılmış şey'}],cultural_insight:'Garanti görülmek. Birebir benzerlik.',fluency_tip:'"The election is in the bag."'},
{id:1466,category:'gunluk',tr:'Dişini sıkmak',tags:['dis','sik','sabir','dayanmak'],english_primary:"Grin and bear it",alternatives:["Bite the bullet","Tough it out"],register:'idiom',bridges:[{tr_fragment:'Dişini',tr_gloss:'tooth',en_fragment:'grin',bridge_type:'cultural',explanation:'Diş sıkmak (acıya dayanmak) -> sırıtıp katlanmak'},{tr_fragment:'sıkmak',tr_gloss:'clench',en_fragment:'bear',bridge_type:'transform',explanation:'Sıkmak -> taşımak'}],cultural_insight:'Zorluğa sabretmek.',fluency_tip:'"You just have to grin and bear it for now."'},

  /* ──────────────────────────────────────────────────────────────
     YORGUNLUK — Genişletilmiş (id 2001–2020)
     ────────────────────────────────────────────────────────────── */
  {
    "id": 2001, "category": "yorgunluk",
    "tr": "Yorgun düştüm",
    "tags": ["yorgun","düştüm","düş","bit","tüken","yıkıl"],
    "english_primary": "I'm worn out",
    "alternatives": ["I'm exhausted","I'm dead tired","I'm wiped out"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Yorgun", "tr_gloss": "tired/weary", "en_fragment": "worn", "bridge_type": "direct", "explanation": "Yorgun → worn: Her iki dilde de yorgunluk kavramı." },
      { "tr_fragment": "düştüm", "tr_gloss": "I fell / I collapsed", "en_fragment": "out", "bridge_type": "transform", "explanation": "Düşmek (fiziksel düşüş) → 'out': Türkçede çöküş; İngilizcede yıpranma/kullanılmışlık." }
    ],
    "cultural_insight": "Türkçede yorgunluk fiziksel bir çöküş ('düşmek') olarak betimlenir. İngilizcede 'worn out' ise bir kumaşın yıpranması gibi — insan nesne gibi aşınmıştır.",
    "fluency_tip": "\"I'm completely worn out after that presentation\" diyebilirsin.",
    "context_sentences": ["I'm completely worn out after three back-to-back shifts.", "She looked worn out from caring for the kids all week."]
  },
  {
    "id": 2002, "category": "yorgunluk",
    "tr": "Gözlerimi açamıyorum",
    "tags": ["göz","aç","uyku","uyuşuk","mahmur","uyanamıyorum"],
    "english_primary": "I can barely keep my eyes open",
    "alternatives": ["I'm fighting to stay awake","I'm nodding off","I'm half asleep"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Gözlerimi açamıyorum", "tr_gloss": "I can't open my eyes", "en_fragment": "can barely keep my eyes open", "bridge_type": "transform", "explanation": "Açmak (open) ↔ keep open: Türkçede olumsuz/edilgen; İngilizcede aktif bir mücadele gerektirir." }
    ],
    "cultural_insight": "İki dilde de gözler yorgunluğun metaforu. Yön farklı: Türkçede 'açamamak', İngilizcede 'açık tutmak için mücadele etmek'.",
    "fluency_tip": "\"I can barely keep my eyes open — I need an espresso\" diyebilirsin.",
    "context_sentences": ["I can barely keep my eyes open during this lecture.", "After the night shift, he could barely keep his eyes open on the commute home."]
  },
  {
    "id": 2003, "category": "yorgunluk",
    "tr": "Gece gözümü kırpmadım",
    "tags": ["gece","göz","kırp","uyku","uyuyamadım","uykusuz","sabaha kadar"],
    "english_primary": "I didn't sleep a wink",
    "alternatives": ["I was up all night","I couldn't get a wink of sleep"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "gözümü kırpmadım", "tr_gloss": "I didn't blink my eye", "en_fragment": "didn't sleep a wink", "bridge_type": "transform", "explanation": "Göz kırpmamak → wink: Her iki dil de gözü referans alır ama İngilizcede 'wink' anlık bir uyku kıvılcımıdır." }
    ],
    "cultural_insight": "'A wink of sleep' anlık bir uyku demektir. Türkçe 'kırpmamak' da göz hareketsizliğini betimler — ortak beden metaforu.",
    "fluency_tip": "\"I didn't sleep a wink last night — the baby was crying non-stop\" diyebilirsin.",
    "context_sentences": ["I didn't sleep a wink with all that noise outside.", "She didn't sleep a wink before the big interview."]
  },
  {
    "id": 2004, "category": "yorgunluk",
    "tr": "Ayakta duramıyorum neredeyse",
    "tags": ["ayak","dur","tutun","derman","yorgun","bitkin"],
    "english_primary": "I'm dead on my feet",
    "alternatives": ["I'm running on fumes","I'm completely wiped out"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Ayakta duramıyorum", "tr_gloss": "I can barely stand", "en_fragment": "dead on my feet", "bridge_type": "transform", "explanation": "Ayakta duramama → ayakta ölmek: İngilizcede 'dead' tükenmişliği dramatize eder." },
      { "tr_fragment": "neredeyse", "tr_gloss": "almost / barely", "en_fragment": "dead", "bridge_type": "disappear", "explanation": "'Neredeyse' sınırı İngilizcede 'dead' ile tam tükenmişe dönüşür — sınır kaybolur." }
    ],
    "cultural_insight": "Türkçede sınır ('neredeyse') korunurken İngilizcede 'dead on my feet' mutlak tükenmişliği anlatır.",
    "fluency_tip": "\"After the double shift, I'm dead on my feet\" diyebilirsin.",
    "context_sentences": ["After working a double shift, she was dead on her feet.", "By the end of the hike, everyone was dead on their feet."]
  },
  {
    "id": 2005, "category": "yorgunluk",
    "tr": "Dermanım kalmadı",
    "tags": ["derman","güç","tüken","bit","enerji","takât"],
    "english_primary": "I've got nothing left in the tank",
    "alternatives": ["I'm running on empty","I've burnt out completely"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Derman", "tr_gloss": "strength / remedy / vitality", "en_fragment": "tank", "bridge_type": "transform", "explanation": "'Derman' (güç, çare) → tank (yakıt deposu): Türkçede tıp/klasik metafor, İngilizcede araç metaforu." },
      { "tr_fragment": "kalmadı", "tr_gloss": "none remained", "en_fragment": "nothing left", "bridge_type": "direct", "explanation": "Kalmamak → nothing left: Aynı anlam, farklı sözdizimi." }
    ],
    "cultural_insight": "'Derman' eski Türkçede hem güç hem çare anlamına gelir. 'Nothing left in the tank' ise spor/araç imgesidir.",
    "fluency_tip": "\"I've got nothing left in the tank — need a real holiday\" diyebilirsin.",
    "context_sentences": ["After the final exams, I've got nothing left in the tank.", "The team played brilliantly but had nothing left in the tank at the end."]
  },
  {
    "id": 2006, "category": "yorgunluk",
    "tr": "Kafam çalışmıyor",
    "tags": ["kafa","çalış","düşün","beyin","odaklan","konsantre"],
    "english_primary": "My brain has switched off",
    "alternatives": ["I can't think straight","My mind has gone blank"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Kafam", "tr_gloss": "my head", "en_fragment": "my brain", "bridge_type": "direct", "explanation": "Kafa/beyin → brain: Düşünme merkezi." },
      { "tr_fragment": "çalışmıyor", "tr_gloss": "isn't working", "en_fragment": "switched off", "bridge_type": "transform", "explanation": "Çalışmamak → switched off: Türkçede makine metaforu; İngilizcede modern elektrik anahtarı metaforu." }
    ],
    "cultural_insight": "Türkçede beyin 'çalışır' ya da 'çalışmaz' — mekanik bir imgedir. İngilizcede 'switched off' elektronik çağın ürünü.",
    "fluency_tip": "\"My brain has completely switched off — ask me tomorrow\" diyebilirsin.",
    "context_sentences": ["After six hours of debugging, my brain has completely switched off.", "Don't ask me to decide anything now — my brain has switched off."]
  },
  {
    "id": 2007, "category": "yorgunluk",
    "tr": "Bitik hissediyorum",
    "tags": ["bitik","bit","tüken","derman","hisset","çökmek"],
    "english_primary": "I'm completely drained",
    "alternatives": ["I'm burnt out","I'm zapped","I'm spent"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Bitik", "tr_gloss": "finished / done for", "en_fragment": "drained", "bridge_type": "transform", "explanation": "Bitmek (to end) → drained (boşaltılmış): Türkçede varlık sona erer; İngilizcede enerji boşaltılır." }
    ],
    "cultural_insight": "'Drained' kelimesi bir şeyin içinin boşaltılması görüntüsünü çağrıştırır — sanki kişinin içindeki enerji akar gibi çekilmiş.",
    "fluency_tip": "\"I'm completely drained — that conversation took it all out of me\" diyebilirsin.",
    "context_sentences": ["I'm completely drained after that emotional conversation.", "Caring for others all day leaves me totally drained by evening."]
  },
  {
    "id": 2008, "category": "yorgunluk",
    "tr": "Kendimi sürükleyerek çalışıyorum",
    "tags": ["sürükle","zorluk","çalış","zor","ağır","motivasyon"],
    "english_primary": "I'm dragging myself through the day",
    "alternatives": ["I'm barely getting through","I'm crawling through the day"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "sürükleyerek", "tr_gloss": "by dragging", "en_fragment": "dragging myself", "bridge_type": "direct", "explanation": "Sürüklemek → drag: İki dilde de aynı fiziksel hareket metaforu." },
      { "tr_fragment": "çalışıyorum", "tr_gloss": "I'm working", "en_fragment": "through the day", "bridge_type": "transform", "explanation": "Çalışmak → through the day: İngilizce günü de geçilmesi gereken bir engel yapar." }
    ],
    "cultural_insight": "İki dilde ortak sürükleme metaforu. İngilizcede 'through the day' zamanı da bir engel haline getirir.",
    "fluency_tip": "\"Just dragging myself through the day — need the weekend\" diyebilirsin.",
    "context_sentences": ["After the sleepless night, I was dragging myself through the day.", "She's been dragging herself through the day all week."]
  },
  {
    "id": 2009, "category": "yorgunluk",
    "tr": "Uyku borcum var",
    "tags": ["uyku","borç","birikmek","eksik","dinlen","uykusuz"],
    "english_primary": "I've built up a sleep debt",
    "alternatives": ["I'm severely sleep-deprived","I've been running on no sleep"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Uyku borcu", "tr_gloss": "sleep debt", "en_fragment": "sleep debt", "bridge_type": "direct", "explanation": "Sleep debt kavramı her iki dilde de aynı — bilimsel bir terim." },
      { "tr_fragment": "var", "tr_gloss": "there is / I have", "en_fragment": "I've built up", "bridge_type": "transform", "explanation": "'Var' varlık belirtir; 'built up' birikme sürecini aktif olarak vurgular." }
    ],
    "cultural_insight": "'Sleep debt' WHO terminolojisinden gündelik dile geçmiş bir kavram. Borcun uyku fazlasıyla tam ödenip ödenmeyeceği bilimsel olarak tartışmalıdır.",
    "fluency_tip": "\"I've built up a massive sleep debt this week — need ten hours minimum\" diyebilirsin.",
    "context_sentences": ["Working nights has built up quite a sleep debt for me.", "You can't really pay back a sleep debt just by sleeping in on weekends."]
  },
  {
    "id": 2010, "category": "yorgunluk",
    "tr": "Pil bitti",
    "tags": ["pil","bit","şarj","enerji","tüken","doldurmak"],
    "english_primary": "My battery is dead",
    "alternatives": ["I'm running on low","I'm out of juice","I need to recharge"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Pil", "tr_gloss": "battery", "en_fragment": "battery", "bridge_type": "direct", "explanation": "Pil = battery — teknoloji metaforu her iki dilde de aynı." },
      { "tr_fragment": "bitti", "tr_gloss": "it ended / it's gone", "en_fragment": "dead", "bridge_type": "transform", "explanation": "Bitmek (to end) → dead: Türkçede nesne biter; İngilizcede ölür — daha dramatik." }
    ],
    "cultural_insight": "Modern teknoloji dili her iki kültürü de şekillendiriyor. 'Battery is dead' artık hem nesneler hem insanlar için kullanılıyor.",
    "fluency_tip": "\"Sorry I missed your call — my battery died\" ya da kişi için \"I'm absolutely dead — need to recharge\" diyebilirsin.",
    "context_sentences": ["My phone battery is dead and I can't find a charger.", "\"I'm done for today — completely dead, need to recharge.\""]
  },
  {
    "id": 2011, "category": "yorgunluk",
    "tr": "Kendime gelemiyorum",
    "tags": ["kendim","gel","toparlan","iyileş","tüken","topla"],
    "english_primary": "I can't seem to bounce back",
    "alternatives": ["I can't snap out of it","I haven't recovered yet","I can't get back on track"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Kendime gelemiyorum", "tr_gloss": "I can't come back to myself", "en_fragment": "can't bounce back", "bridge_type": "transform", "explanation": "Kendine gelmek (return to oneself) → bounce back: Türkçede öze dönüş; İngilizcede elastikiyet/yaylanma metaforu." }
    ],
    "cultural_insight": "Türkçe 'kendine gelmek' kişinin özüne dönmesini ima eder. İngilizce 'bounce back' yaylanma gibi aktif, enerjik bir toparlanmayı betimler.",
    "fluency_tip": "\"I'm still tired from last week — I just can't bounce back\" diyebilirsin.",
    "context_sentences": ["After the illness, she couldn't seem to bounce back for weeks.", "I don't know why I can't bounce back — maybe I need a real break."]
  },
  {
    "id": 2012, "category": "yorgunluk",
    "tr": "Mecalsiz kaldım",
    "tags": ["mecal","güç","derman","enerji","zayıf","takât"],
    "english_primary": "I'm running on empty",
    "alternatives": ["I'm completely zapped","I've got no energy left","I'm out of steam"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Mecalsiz", "tr_gloss": "without strength / enfeebled", "en_fragment": "running on empty", "bridge_type": "transform", "explanation": "'Mecal' (Arapça köken — güç, tâkat) → empty tank: Klasik Türkçe sözcük, modern yakıt metaforuyla karşılaşıyor." },
      { "tr_fragment": "kaldım", "tr_gloss": "I was left / I remained", "en_fragment": "running", "bridge_type": "transform", "explanation": "Kalmak (pasif kalış) → running: Türkçede edilgen bırakılış; İngilizcede aktif ama boş devam." }
    ],
    "cultural_insight": "'Mecal' sözcüğü derin yorgunluğu anlatır — sadece fiziksel değil, ruhsal güçsüzlük de. 'Running on empty' ise araç metaforuyla gündelik İngilizce.",
    "fluency_tip": "\"I'm absolutely running on empty — haven't eaten since morning\" diyebilirsin.",
    "context_sentences": ["By Friday afternoon, I'm always running on empty.", "After three weeks of overtime, the whole team was running on empty."]
  },
  {
    "id": 2013, "category": "yorgunluk",
    "tr": "Gözlerim kapanıyor",
    "tags": ["göz","kapa","uyu","uyuşuk","uyku","sarkmak"],
    "english_primary": "My eyes are drooping",
    "alternatives": ["I'm nodding off","I'm falling asleep where I stand"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Gözlerim kapanıyor", "tr_gloss": "my eyes are closing", "en_fragment": "eyes are drooping", "bridge_type": "transform", "explanation": "Kapanmak (to close/shut) → drooping (sarkma): Türkçede kapı gibi kapanır; İngilizcede ağırlaşarak sarkar." }
    ],
    "cultural_insight": "Her iki dilde gözler üzerinden uyku gelir. İngilizce 'droop' daha görsel — ağırlaşan göz kapakları imgesi.",
    "fluency_tip": "\"My eyes are drooping — I really need to go to bed\" diyebilirsin.",
    "context_sentences": ["His eyes were drooping during the evening meeting.", "I could feel my eyes drooping after the second hour of the lecture."]
  },
  {
    "id": 2014, "category": "yorgunluk",
    "tr": "Tükenmiş hissediyorum",
    "tags": ["tüken","bit","yorgun","çökmek","derman","sendrom"],
    "english_primary": "I'm burnt out",
    "alternatives": ["I've hit a wall","I'm completely fried","I'm running on fumes"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Tükenmiş", "tr_gloss": "depleted / used up / exhausted", "en_fragment": "burnt out", "bridge_type": "transform", "explanation": "Tükenmek (depleted) → burnt out (yanıp kül olmuş): Türkçede eksiklik; İngilizcede yanma/yıkım metaforu." }
    ],
    "cultural_insight": "'Burnout' WHO tarafından tıbbi bir kavram olarak tanınmıştır. Türkçe 'tükenmişlik sendromu' da aynı kavramı karşılar — diller burada buluşuyor.",
    "fluency_tip": "\"I'm completely burnt out — I need at least a week off\" diyebilirsin.",
    "context_sentences": ["After two years of non-stop work, she was completely burnt out.", "Burnout is real — if you ignore the signs, recovery takes much longer."]
  },
  {
    "id": 2015, "category": "yorgunluk",
    "tr": "Mola vermem lazım",
    "tags": ["mola","ver","dinlen","dur","nefes","ara"],
    "english_primary": "I need to recharge",
    "alternatives": ["I need a breather","I need to step back","I need some downtime"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Mola vermek", "tr_gloss": "to give a break", "en_fragment": "recharge", "bridge_type": "transform", "explanation": "Mola vermek (duruş) → recharge (şarj etmek): Türkçede duraklama; İngilizcede enerji yenileme metaforu." }
    ],
    "cultural_insight": "'Recharge' modern teknoloji dilinden gelen bir metafor. 'Breather' ise nefes almakla ilişkili daha eski bir ifade — iki çağ bir arada.",
    "fluency_tip": "\"I really need to recharge this weekend — no plans, just rest\" diyebilirsin.",
    "context_sentences": ["I need to recharge before the next phase of the project.", "Taking a walk at lunch helps me recharge for the afternoon."]
  },
  {
    "id": 2016, "category": "yorgunluk",
    "tr": "Beyin yorgunluğu yaşıyorum",
    "tags": ["beyin","yorgunluk","zihin","mental","tüken","odak","konsantrasyon"],
    "english_primary": "I'm mentally exhausted",
    "alternatives": ["I've got serious brain fog","I'm cognitively drained"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Beyin yorgunluğu", "tr_gloss": "brain fatigue", "en_fragment": "mentally exhausted", "bridge_type": "transform", "explanation": "'Beyin yorgunluğu' organ-merkezli; 'mentally exhausted' soyut zihin kavramını kullanır." }
    ],
    "cultural_insight": "'Brain fog' İngilizcede hem tıbbi hem gündelik bir terim — bulanık düşünme hali. 'Beyin yorgunluğu' daha doğrudan fiziksel bir anlam taşır.",
    "fluency_tip": "\"I've got serious brain fog today — can't focus on anything\" diyebilirsin.",
    "context_sentences": ["After the intense project sprint, I'm mentally exhausted and need a break.", "Brain fog is real — I've been mentally exhausted for days now."]
  },
  {
    "id": 2017, "category": "yorgunluk",
    "tr": "Uyuya kaldım",
    "tags": ["uyu","kal","dal","farkında","uyuya","istem"],
    "english_primary": "I dozed off",
    "alternatives": ["I drifted off","I fell asleep without realizing","I nodded off"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Uyuya kaldım", "tr_gloss": "I was left sleeping / stayed asleep", "en_fragment": "dozed off", "bridge_type": "transform", "explanation": "Uyuya kalmak (pasif kalış) → doze off (aktif kayma): Türkçede farkındasız bırakılma; İngilizcede sürüklenme." }
    ],
    "cultural_insight": "'Doze off' ve 'drift off' uykunun yumuşak, farkında olmadan gelmesini anlatır. Türkçe 'kalmak' beklenmedikliği ve kontrolü kaybetmeyi çağrıştırır.",
    "fluency_tip": "\"I dozed off on the bus and missed my stop\" diyebilirsin.",
    "context_sentences": ["I dozed off during the film and woke up at the credits.", "She dozed off at her desk after lunch — classic post-meal slump."]
  },
  {
    "id": 2018, "category": "yorgunluk",
    "tr": "Sabaha kadar çalıştım",
    "tags": ["sabah","gece","çalış","gece boyunca","uykusuz","bütün gece"],
    "english_primary": "I pulled an all-nighter",
    "alternatives": ["I worked through the night","I was up all night"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Sabaha kadar", "tr_gloss": "until morning", "en_fragment": "all-nighter", "bridge_type": "transform", "explanation": "Sabaha kadar (zaman noktası) → all-nighter (bir gecelik iş): Türkçede bitiş anı; İngilizcede bütün gece tek paket olarak." }
    ],
    "cultural_insight": "'Pull an all-nighter' öğrenci ve startup kültüründe yaygın bir ifade — gecenin tamamını çekerek çalışmak.",
    "fluency_tip": "\"I pulled an all-nighter to finish the proposal\" diyebilirsin.",
    "context_sentences": ["I pulled an all-nighter and submitted the report at 6 AM.", "She pulled an all-nighter before the final exam — not ideal, but it worked."]
  },
  {
    "id": 2019, "category": "yorgunluk",
    "tr": "Koltuktan kalkamıyorum",
    "tags": ["koltuk","kalk","ağır","uyuşuk","otur","dinlen"],
    "english_primary": "I'm glued to the sofa",
    "alternatives": ["I can't get off the couch","I'm couch-locked","I've melted into the couch"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Koltuktan kalkamıyorum", "tr_gloss": "I can't get up from the armchair", "en_fragment": "glued to the sofa", "bridge_type": "transform", "explanation": "Kalkamamak (inability to rise) → glued (yapışmak): Türkçede fiziksel yetersizlik; İngilizcede yapışkanlık metaforu çok daha güçlü." }
    ],
    "cultural_insight": "'Glued to the sofa' görsel ve karikatürist bir ifade — yapıştırılmış gibi kıpırdayamayan biri.",
    "fluency_tip": "\"I'm completely glued to the sofa today — zero motivation to move\" diyebilirsin.",
    "context_sentences": ["After a week of back-to-back meetings, she was just glued to the sofa.", "I was so tired on Sunday I couldn't get off the couch all day."]
  },
  {
    "id": 2020, "category": "yorgunluk",
    "tr": "Tek gözümle uyudum",
    "tags": ["göz","uyu","dikkat","yarım","uyku","tetikte"],
    "english_primary": "I slept with one eye open",
    "alternatives": ["I barely slept","I couldn't fully relax"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Tek gözümle uyudum", "tr_gloss": "I slept with one eye", "en_fragment": "slept with one eye open", "bridge_type": "direct", "explanation": "İki dilde de birebir aynı metafor — dikkatli, tetikde uyku." }
    ],
    "cultural_insight": "Bu ifade evrensel bir metafor — her iki dil de tetikte/yarım uyuyan birini tek gözle ifade eder. Genellikle stres veya kaygı nedeniyle tam uyuyamama anlatır.",
    "fluency_tip": "\"I slept with one eye open all night — the storm was too loud\" diyebilirsin.",
    "context_sentences": ["With the baby in the next room, I slept with one eye open all night.", "He always sleeps with one eye open before a big presentation."]
  },

  /* ──────────────────────────────────────────────────────────────
     DEYİMLER — Genişletilmiş (id 2021–2035)
     ────────────────────────────────────────────────────────────── */
  {
    "id": 2021, "category": "deyimler",
    "tr": "Devede kulak",
    "tags": ["deve","kulak","küçük","önemsiz","az"],
    "english_primary": "A drop in the ocean",
    "alternatives": ["A drop in the bucket","A mere fraction"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Devede kulak", "tr_gloss": "an ear on a camel", "en_fragment": "a drop in the ocean", "bridge_type": "transform", "explanation": "Dev bir hayvana oranla küçücük kulak → dev okyanus içinde tek damla: İki dil de devasa/küçük oranını anlatır, ama imgeler farklı." }
    ],
    "cultural_insight": "Türkçe çöl hayvanından yola çıkarken İngilizce okyanus imgesi kullanır. İkisi de küçüklüğü abartılı bir büyüklüğe oranla anlatır.",
    "fluency_tip": "\"Our donation is just a drop in the ocean compared to what's needed\" diyebilirsin.",
    "context_sentences": ["The government's aid was a drop in the ocean for the affected communities.", "One person's effort feels like a drop in the ocean, but it matters."]
  },
  {
    "id": 2022, "category": "deyimler",
    "tr": "Ağzından baklayı çıkarmak",
    "tags": ["ağız","bakla","çıkar","söyle","itiraf","sır"],
    "english_primary": "Spill the beans",
    "alternatives": ["Let the cat out of the bag","Come clean","Reveal the secret"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Ağzından", "tr_gloss": "from one's mouth", "en_fragment": "spill", "bridge_type": "transform", "explanation": "Ağızdan çıkarmak → dökmek/dağıtmak: İkisi de gizlinin ortaya saçılmasını anlatır." },
      { "tr_fragment": "baklayı", "tr_gloss": "the fava bean", "en_fragment": "the beans", "bridge_type": "transform", "explanation": "Bakla (eski oy sayım geleneği) → beans: Her iki kültürde fasulye/baklagil gizli sır metaforu olarak kullanılmış." }
    ],
    "cultural_insight": "Türkçede 'bakla' eski Yunan oylamasından gelir — renkli taşlarla/baklalarla oy kullanılırdı. İngilizcede de benzer bir köken teorisi var.",
    "fluency_tip": "\"Come on, spill the beans — what happened at the meeting?\" diyebilirsin.",
    "context_sentences": ["She finally spilled the beans about the surprise party.", "Don't spill the beans before the announcement — it's still a secret."]
  },
  {
    "id": 2023, "category": "deyimler",
    "tr": "Kıl payı kurtulmak",
    "tags": ["kıl","pay","kurtar","az","kaç","sıyrıl"],
    "english_primary": "Escape by the skin of your teeth",
    "alternatives": ["Have a narrow escape","Barely make it","Squeak by"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Kıl payı", "tr_gloss": "by a hair's breadth", "en_fragment": "by the skin of your teeth", "bridge_type": "transform", "explanation": "Kıl kalınlığı (hair) → diş derisi (skin of teeth): Her iki dil de vücuttan alınan çok ince bir şeyle olağanüstü küçük bir marjı anlatır." }
    ],
    "cultural_insight": "'Skin of your teeth' İncil'deki Eyüp kitabından gelir. 'Kıl payı' ise kılın inceliğini ölçü birimi olarak kullanır. Ortak tema: minimum farkla kurtuluş.",
    "fluency_tip": "\"I escaped by the skin of my teeth — the train doors closed right behind me\" diyebilirsin.",
    "context_sentences": ["She escaped by the skin of her teeth — one more second and she'd have missed the flight.", "He passed the exam by the skin of his teeth with 51%."]
  },
  {
    "id": 2024, "category": "deyimler",
    "tr": "Daldan dala konmak",
    "tags": ["dal","kon","atla","geç","değiş","kararsız"],
    "english_primary": "Jump from one thing to another",
    "alternatives": ["Flit from branch to branch","Never settle","Be all over the place"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Daldan dala konmak", "tr_gloss": "to perch from branch to branch", "en_fragment": "jump from one thing to another", "bridge_type": "disappear", "explanation": "Kuş imgesi Türkçede korunur; İngilizcede metafor kaybolur ve soyut 'jump from one thing to another' kullanılır." }
    ],
    "cultural_insight": "Türkçedeki kuş imgesi kararsızlığı ve yerleşememeyi güzel bir doğa tablosuyla anlatır. İngilizcede 'all over the place' daha yaygın gündelik ifadedir.",
    "fluency_tip": "\"He's always jumping from one project to another — nothing ever gets finished\" diyebilirsin.",
    "context_sentences": ["She jumps from one hobby to another without ever mastering any.", "Stop jumping from one thing to another and focus on finishing what you started."]
  },
  {
    "id": 2025, "category": "deyimler",
    "tr": "Söz uçar yazı kalır",
    "tags": ["söz","uç","yazı","kal","belge","ispat"],
    "english_primary": "Words fly, writing remains",
    "alternatives": ["Get it in writing","Put it on paper","Verbal agreements don't count"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Söz uçar", "tr_gloss": "words fly away", "en_fragment": "words fly", "bridge_type": "direct", "explanation": "Doğrudan çeviri mümkün — uçma metaforu her iki dilde aynı." },
      { "tr_fragment": "yazı kalır", "tr_gloss": "writing remains", "en_fragment": "writing remains", "bridge_type": "direct", "explanation": "Kalıcılık ifadesi her iki dilde birebir örtüşür." }
    ],
    "cultural_insight": "Latince 'Verba volant, scripta manent' bu ifadenin köküdür — hem Türkçeye hem İngilizceye geçmiştir. Evrensel bir bilgelik.",
    "fluency_tip": "\"Make sure you get the agreement in writing — words fly, writing remains\" diyebilirsin.",
    "context_sentences": ["Always get your contracts in writing — words fly, writing remains.", "He promised it verbally, but remember: words fly, writing remains."]
  },
  {
    "id": 2026, "category": "deyimler",
    "tr": "İki taşı bir arada kaynatmak",
    "tags": ["taş","kaynat","iki","bir arada","verimli","aynı anda"],
    "english_primary": "Kill two birds with one stone",
    "alternatives": ["Hit two targets at once","Get two things done in one go"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "İki taşı bir arada kaynatmak", "tr_gloss": "boil two stones together", "en_fragment": "kill two birds with one stone", "bridge_type": "transform", "explanation": "Taş + kaynatmak (ısı metaforu) → kuş + taş atmak (av metaforu): İki farklı kültürel eylem, aynı anlam: tek hamlede iki iş." }
    ],
    "cultural_insight": "Türkçe metafor mutfaktan (kaynatmak), İngilizce avdan (bird hunting) gelir. İkisi de kaynak kültürün günlük hayatını yansıtır.",
    "fluency_tip": "\"I'll stop by the grocery store on my way to the gym — kill two birds with one stone\" diyebilirsin.",
    "context_sentences": ["I'll do the meeting in person — kill two birds with one stone since I need to pick up the documents anyway.", "She killed two birds with one stone by doing her research at the library and returning books."]
  },
  {
    "id": 2027, "category": "deyimler",
    "tr": "Göz yummak",
    "tags": ["göz","yum","görmemek","izin","hoşgörü","geçiştir"],
    "english_primary": "Turn a blind eye",
    "alternatives": ["Look the other way","Overlook","Pretend not to notice"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Göz yummak", "tr_gloss": "to close one's eye", "en_fragment": "turn a blind eye", "bridge_type": "transform", "explanation": "Gözü yummak (kapatmak) → kör göz çevirmek: Türkçede göz kapanır; İngilizcede kör bir göz kasıtlı olarak döndürülür." }
    ],
    "cultural_insight": "'Turn a blind eye' Amiral Nelson'dan gelir — savaşta teleskopu kör gözüne tuttuğu anlatılır. Türkçe daha evrensel bir göz kapatma imgesi.",
    "fluency_tip": "\"The manager turned a blind eye to the team's minor violations\" diyebilirsin.",
    "context_sentences": ["She turned a blind eye to her colleague's constant lateness.", "We can't keep turning a blind eye to these issues — they need to be addressed."]
  },
  {
    "id": 2028, "category": "deyimler",
    "tr": "Parmak ısırmak",
    "tags": ["parmak","ısır","hayret","şaşır","etkilendim","inanamıyorum"],
    "english_primary": "Mind-blowing",
    "alternatives": ["Jaw-dropping","Absolutely incredible","Blow your mind"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Parmak ısırmak", "tr_gloss": "to bite one's finger", "en_fragment": "mind-blowing", "bridge_type": "disappear", "explanation": "Parmak ısırma fiziksel hayranlık jesti → zihin patlatma: Türkçe beden; İngilizce tamamen bilişsel metafor. Fizik kaybolur." }
    ],
    "cultural_insight": "Türkçe 'parmak ısırmak' somut bir beden hareketi — şaşkınlıktan parmağı ısırmak. İngilizce 'mind-blowing' ise soyut bir patlama imgesidir.",
    "fluency_tip": "\"That magic trick was absolutely mind-blowing\" diyebilirsin.",
    "context_sentences": ["The view from the top was mind-blowing — I couldn't speak.", "Her performance was mind-blowing — the audience gave a standing ovation."]
  },
  {
    "id": 2029, "category": "deyimler",
    "tr": "Palabracı",
    "tags": ["palavra","palabracı","laf","övün","boş","yalan"],
    "english_primary": "Full of hot air",
    "alternatives": ["A blowhard","All talk and no action","A windbag"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Palabracı", "tr_gloss": "one who talks nonsense / boaster", "en_fragment": "full of hot air", "bridge_type": "transform", "explanation": "'Palavra' (Portekizce köken — boş laf) → hot air (sıcak hava): Her iki dil de ağızdan çıkan boş hava/nefes metaforunu kullanır." }
    ],
    "cultural_insight": "'Palavra' Portekizce kökenli olup Türkçeye geçmiştir. 'Hot air' İngilizcede boş, şişirilmiş konuşmayı anlatır — şişen bir balon gibi.",
    "fluency_tip": "\"Don't listen to him — he's full of hot air\" diyebilirsin.",
    "context_sentences": ["The politician was full of hot air — no concrete plans, just empty promises.", "She's all talk and no action — completely full of hot air."]
  },
  {
    "id": 2030, "category": "deyimler",
    "tr": "Göbek atmak",
    "tags": ["göbek","at","dans","eğlen","coşku","kutla"],
    "english_primary": "Let your hair down",
    "alternatives": ["Kick back and relax","Cut loose","Have a ball"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Göbek atmak", "tr_gloss": "to throw one's belly", "en_fragment": "let your hair down", "bridge_type": "transform", "explanation": "Göbek atma (karın dansı hareketi) → saçları serbest bırakmak: İki dil de beden üzerinden özgürlüğü/coşkuyu anlatır ama farklı bedenlere odaklanır." }
    ],
    "cultural_insight": "'Göbek atmak' Türkçede karın dansını/coşkuyu çağrıştırır. İngilizcede 'let your hair down' saçları topuzdan çözüp serbest bırakmaktır — toplumsal kısıtlamalardan kurtuluş.",
    "fluency_tip": "\"Come on, let your hair down — it's the weekend!\" diyebilirsin.",
    "context_sentences": ["After months of hard work, they finally let their hair down at the company party.", "It's Friday night — let your hair down and forget about work for a bit."]
  },
  {
    "id": 2031, "category": "deyimler",
    "tr": "El altından iş çevirmek",
    "tags": ["el","alt","iş","gizli","dolaylı","fısıltı","arka"],
    "english_primary": "Pull strings behind the scenes",
    "alternatives": ["Work under the table","Pull strings","Operate in the shadows"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "El altından", "tr_gloss": "from under the hand", "en_fragment": "behind the scenes", "bridge_type": "transform", "explanation": "El altı (gizli, el geçmez) → sahne arkası: İkisi de görünmezliği anlatır; Türkçe fiziksel saklanma, İngilizce tiyatro metaforu." },
      { "tr_fragment": "iş çevirmek", "tr_gloss": "to turn/spin work", "en_fragment": "pull strings", "bridge_type": "transform", "explanation": "İş çevirmek (manipüle etmek) → ip çekmek: İkisi de gizlice yönlendirmeyi anlatır." }
    ],
    "cultural_insight": "'Pull strings' kukla oyununu çağrıştırır — görünmez ipleri çeken birisi. Türkçe 'el altından' daha fiziksel ve gizli bir dokunuşu ima eder.",
    "fluency_tip": "\"He pulled strings behind the scenes to get the contract\" diyebilirsin.",
    "context_sentences": ["She pulled strings behind the scenes to make sure the project was approved.", "Things like this rarely happen openly — it's all done behind the scenes."]
  },
  {
    "id": 2032, "category": "deyimler",
    "tr": "Çuvaldızı kendine batırmak",
    "tags": ["çuvaldız","iğne","kendine","batr","özeleştiri","dürüst"],
    "english_primary": "Look in the mirror",
    "alternatives": ["Take a hard look at yourself","Practice self-reflection","Physician, heal thyself"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Çuvaldızı kendine batırmak", "tr_gloss": "to poke the coarse needle into oneself", "en_fragment": "look in the mirror", "bridge_type": "transform", "explanation": "Kendine iğne batırmak (acı verici öz-eleştiri) → aynaya bakmak: Türkçede fiziksel acı; İngilizcede görsel yüzleşme." }
    ],
    "cultural_insight": "Türkçe özgün deyim bir çuval iğnesinin acısıyla özeleştiriyi birleştirir — güçlü bir imgedir. İngilizce 'mirror' daha nazik ama etkili.",
    "fluency_tip": "\"Before criticizing others, take a good look in the mirror\" diyebilirsin.",
    "context_sentences": ["He always finds fault in others but never looks in the mirror.", "Before judging your team, take a good look in the mirror — are you leading them well?"]
  },
  {
    "id": 2033, "category": "deyimler",
    "tr": "İşi gücü bırakmak",
    "tags": ["iş","bırak","uğraş","vazgeç","her şey","durur"],
    "english_primary": "Drop everything",
    "alternatives": ["Put everything on hold","Stop what you're doing","Down tools"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "İşi gücü bırakmak", "tr_gloss": "to leave one's work and occupation", "en_fragment": "drop everything", "bridge_type": "transform", "explanation": "İş ve güç (iki farklı kelime) → everything (tek kelime): Türkçede çiftleme vurgu yapar; İngilizce 'everything' ile toplar." }
    ],
    "cultural_insight": "Türkçede 'iş + güç' çiftlemesi tüm uğraşları kapsar. 'Down tools' İngilizcede iş bırakma grevini de çağrıştırabilir.",
    "fluency_tip": "\"Drop everything and come — it's an emergency\" diyebilirsin.",
    "context_sentences": ["She dropped everything when she heard her mother was in hospital.", "When a client calls in crisis, we're expected to drop everything and respond."]
  },
  {
    "id": 2034, "category": "deyimler",
    "tr": "Yüzü kızarmak",
    "tags": ["yüz","kızar","utan","mahcup","ar","rezil"],
    "english_primary": "To go red in the face",
    "alternatives": ["To blush","To be red-faced","To flush with embarrassment"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Yüzü kızarmak", "tr_gloss": "one's face reddening", "en_fragment": "go red in the face", "bridge_type": "direct", "explanation": "Yüzün kızarması → go red: Her iki dil de utanç veya öfkede yüzün kızarması fiziksel tepkisini kullanır." }
    ],
    "cultural_insight": "Utanç kızarması evrensel — hem Türkçe hem İngilizce aynı fizyolojik tepkiyi deyimleştirir. 'Red-faced' İngilizcede utancın yanı sıra öfkeyi de anlatabilir.",
    "fluency_tip": "\"She went red in the face when they called her name out loud\" diyebilirsin.",
    "context_sentences": ["He went red in the face when his mistake was pointed out in front of everyone.", "She blushed and went red in the face — it was obvious she was embarrassed."]
  },
  {
    "id": 2035, "category": "deyimler",
    "tr": "Derdi ne?",
    "tags": ["dert","ne","sorun","problem","ne istiyor","şikâyet"],
    "english_primary": "What's their problem?",
    "alternatives": ["What's eating them?","What's got into them?","What's their deal?"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Derdi", "tr_gloss": "their trouble / their ailment", "en_fragment": "problem", "bridge_type": "transform", "explanation": "'Dert' (ağır, kronik sorun/acı) → 'problem': Türkçe daha derin bir sıkıntıyı ima eder; İngilizce daha nötr." },
      { "tr_fragment": "ne?", "tr_gloss": "what?", "en_fragment": "what's their", "bridge_type": "multiply", "explanation": "Tek 'ne?' sorusu → 'what's their' + 'problem': İngilizce özne ve fiil ekler." }
    ],
    "cultural_insight": "'What's eating them?' daha derin ve sempatik; 'What's their problem?' ise daha agresif bir ifadedir. 'Dert' Türkçede her ikisini de karşılayabilir.",
    "fluency_tip": "\"What's their problem today — they've been cold all morning\" diyebilirsin.",
    "context_sentences": ["What's their problem? They've been rude to everyone all day.", "I don't know what's got into her — she seemed fine yesterday."]
  },

  /* ──────────────────────────────────────────────────────────────
     BAŞARI & BAŞARISIZLIK — Genişletilmiş (id 2036–2045)
     ────────────────────────────────────────────────────────────── */
  {
    "id": 2036, "category": "basari",
    "tr": "Alın teri dökmek",
    "tags": ["alın","ter","dök","çalış","emek","mücadele"],
    "english_primary": "Sweat blood",
    "alternatives": ["Put in the hard yards","Work tooth and nail","Bust your gut"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Alın teri", "tr_gloss": "forehead sweat", "en_fragment": "sweat blood", "bridge_type": "transform", "explanation": "Alın teri (onurlu emek, sıradan ter) → kan terlemek: İngilizcede aşırı çabanın vurgusu 'ter' yerine 'kan'la yapılır." }
    ],
    "cultural_insight": "Türkçede 'alın teri' dürüst ve onurlu emeki simgeler — toplumsal saygınlığı olan bir ifade. İngilizce 'sweat blood' çok daha aşırı bir yoğunluğu anlatır.",
    "fluency_tip": "\"They sweated blood to get this project off the ground\" diyebilirsin.",
    "context_sentences": ["She sweated blood to build her business from nothing.", "You can see they sweated blood over every detail of this design."]
  },
  {
    "id": 2037, "category": "basari",
    "tr": "Sıfırdan başlamak",
    "tags": ["sıfır","başla","yeni","baştan","taban","temel"],
    "english_primary": "Start from scratch",
    "alternatives": ["Start from zero","Build from the ground up","Begin anew"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Sıfırdan", "tr_gloss": "from zero", "en_fragment": "from scratch", "bridge_type": "transform", "explanation": "Sıfır (rakam) → scratch (çizgi): Türkçede matematiksel başlangıç; İngilizce at yarışında başlangıç çizgisinden gelir." }
    ],
    "cultural_insight": "'Scratch' at yarışında en arkadan başlayan atın çizgisini ifade eder. 'Sıfır' ise matematiksel — her ikisi de en başı anlatır.",
    "fluency_tip": "\"We had to scrap everything and start from scratch\" diyebilirsin.",
    "context_sentences": ["After the flood damaged the shop, they had to start from scratch.", "She started from scratch at 40 and built a successful business."]
  },
  {
    "id": 2038, "category": "basari",
    "tr": "Zirveye çıkmak",
    "tags": ["zirve","çık","başarı","en üst","ulaş","doruk"],
    "english_primary": "Rise to the top",
    "alternatives": ["Reach the pinnacle","Make it to the top","Climb to the summit"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Zirveye çıkmak", "tr_gloss": "to reach the peak/summit", "en_fragment": "rise to the top", "bridge_type": "transform", "explanation": "Zirve (dağ doruk noktası) → top (üst): İkisi de hiyerarşinin en üstünü anlatır ama Türkçe daha coğrafi bir imge kullanır." }
    ],
    "cultural_insight": "Dağ metaforu evrensel. 'Rise' İngilizcede yavaş ve organik bir yükselişi; 'climb' ise çaba gerektiren bir tırmanışı anlatır.",
    "fluency_tip": "\"She rose to the top through sheer determination\" diyebilirsin.",
    "context_sentences": ["He rose to the top of his field within a decade.", "Rising to the top requires talent, hard work, and a little bit of luck."]
  },
  {
    "id": 2039, "category": "basari",
    "tr": "İşi yoluna koymak",
    "tags": ["iş","yol","koy","düzelt","çöz","hallettim"],
    "english_primary": "Get things sorted",
    "alternatives": ["Get things on track","Set things right","Sort it out"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Yola koymak", "tr_gloss": "to put on the road", "en_fragment": "get things on track", "bridge_type": "transform", "explanation": "Yol metaforu → track (ray/yol): Her iki dil de düzeni yol/rota imgesiyle anlatır." }
    ],
    "cultural_insight": "'Sort out' İngilizcede hem düzeltmek hem çözmek anlamına gelir. 'Get on track' raylı sistemden gelen bir metafora referans verir.",
    "fluency_tip": "\"Give me a week and I'll get everything sorted\" diyebilirsin.",
    "context_sentences": ["It took a month but we finally got things sorted after the merger.", "Let me get this sorted before we move on to the next phase."]
  },
  {
    "id": 2040, "category": "basari",
    "tr": "Çubuğu fazla esnetmek",
    "tags": ["çubuk","esnet","aşır","sınır","abart","fazla"],
    "english_primary": "Push the envelope",
    "alternatives": ["Go too far","Push the boundaries","Take it to the limit"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Çubuğu esnetmek", "tr_gloss": "to stretch the stick/bar", "en_fragment": "push the envelope", "bridge_type": "transform", "explanation": "Esnek çubuk (fiziksel sınır testi) → zarf itmek (test uçuş terminolojisi): İkisi de sınırı zorlamayı anlatır, imgeler tamamen farklı." }
    ],
    "cultural_insight": "'Push the envelope' WWII test pilotlarından gelir — uçağın hız/irtifa zarfını zorlamak. Türkçe metafor fiziksel esneme/büküm imgesiyle sınırı test eder.",
    "fluency_tip": "\"We need to push the envelope if we want to stay ahead of the competition\" diyebilirsin.",
    "context_sentences": ["The new design really pushes the envelope in terms of user experience.", "She always pushes the envelope — that's why her campaigns are so memorable."]
  },
  {
    "id": 2041, "category": "basari",
    "tr": "Gol atmak",
    "tags": ["gol","at","başar","hedef","kazandım","başarıldı"],
    "english_primary": "Score a goal",
    "alternatives": ["Nail it","Hit the mark","Achieve the target"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Gol atmak", "tr_gloss": "to throw/score a goal", "en_fragment": "score a goal", "bridge_type": "direct", "explanation": "Gol atmak = score a goal: Spor dili olarak birebir örtüşür — metafor olarak da aynı şekilde kullanılır." }
    ],
    "cultural_insight": "Futbol metaforu evrensel. Her iki dilde de 'gol atmak/score a goal' somut başarıyı anlatır. Gündelik hayata da taşınır.",
    "fluency_tip": "\"We really scored a goal with that client presentation\" diyebilirsin.",
    "context_sentences": ["The team scored a goal with their new marketing strategy.", "She really scored a goal by landing that major account."]
  },
  {
    "id": 2042, "category": "basari",
    "tr": "Çıtayı yükseltmek",
    "tags": ["çıta","yükselt","standart","beklenti","hedef","ölçü"],
    "english_primary": "Raise the bar",
    "alternatives": ["Set a higher standard","Up the ante","Raise the stakes"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Çıtayı yükseltmek", "tr_gloss": "to raise the bar/lath", "en_fragment": "raise the bar", "bridge_type": "direct", "explanation": "Çıta = bar (atlamada kullanılan çubuk): İki dilde de yüksek atlama imgesi — neredeyse birebir." }
    ],
    "cultural_insight": "Her iki dil yüksek atlama sporundaki 'çıta/bar' imgesiyle beklenti/standardı anlatır. Evrensel bir spor metaforu.",
    "fluency_tip": "\"Their first album raised the bar for the whole genre\" diyebilirsin.",
    "context_sentences": ["This product has really raised the bar in terms of design and performance.", "Her work raises the bar for everyone else on the team."]
  },
  {
    "id": 2043, "category": "basari",
    "tr": "Büyük balık küçük gölde",
    "tags": ["balık","göl","büyük","küçük","lider","önemli"],
    "english_primary": "Big fish in a small pond",
    "alternatives": ["Top of the local league","A large fish in a small sea"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Büyük balık", "tr_gloss": "big fish", "en_fragment": "big fish", "bridge_type": "direct", "explanation": "Birebir çeviri mümkün." },
      { "tr_fragment": "küçük gölde", "tr_gloss": "in a small lake", "en_fragment": "in a small pond", "bridge_type": "direct", "explanation": "Göl ≈ pond: Küçük bir su ortamı metaforu her iki dilde de aynı." }
    ],
    "cultural_insight": "Bu metafor evrenseldir — her iki kültür de balık/su imgesiyle sınırlı bir alandaki büyüklüğü anlatır.",
    "fluency_tip": "\"He's a big fish in a small pond — he should try a bigger market\" diyebilirsin.",
    "context_sentences": ["She was a big fish in a small pond at her local firm, but struggled in the big city.", "Sometimes it's better to be a big fish in a small pond than a small fish in the ocean."]
  },
  {
    "id": 2044, "category": "basari",
    "tr": "Fırsatı tepetaklak etmek",
    "tags": ["fırsat","tepetaklak","kaçır","berbat","mahvet","çöker"],
    "english_primary": "Blow the opportunity",
    "alternatives": ["Miss the boat","Fumble the chance","Squander the opportunity"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Fırsatı tepetaklak etmek", "tr_gloss": "to flip the opportunity upside down", "en_fragment": "blow the opportunity", "bridge_type": "transform", "explanation": "Tepetaklak etmek (devirip bozmak) → blow (patlatmak, berbat etmek): Her iki dil de fırsatın yok edilmesini anlatır ama imgeler farklı." }
    ],
    "cultural_insight": "'Blow' İngilizcede hem patlatmak hem mahvetmek anlamına gelir. 'Miss the boat' ise zamanlama hatası olarak ayrı bir metafordur.",
    "fluency_tip": "\"Don't blow this opportunity — it might not come again\" diyebilirsin.",
    "context_sentences": ["He completely blew the opportunity by arriving late to the interview.", "Don't blow this chance — prepare properly and give it your all."]
  },
  {
    "id": 2045, "category": "basari",
    "tr": "Elmas gibi parlamak",
    "tags": ["elmas","parla","parlak","başarı","göze çarp","dikkat"],
    "english_primary": "Shine like a diamond",
    "alternatives": ["Stand out from the crowd","Be a cut above","Outshine everyone"],
    "register": "neutral",
    "bridges": [
      { "tr_fragment": "Elmas gibi parlamak", "tr_gloss": "to shine like a diamond", "en_fragment": "shine like a diamond", "bridge_type": "direct", "explanation": "Birebir aynı metafor — evrensel bir değerli taş imgesi." }
    ],
    "cultural_insight": "Elmas/diamond metaforu evrensel. Her kültürde değerli taşlar çoğunlukla mükemmelliği ve parlaklığı simgeler.",
    "fluency_tip": "\"She really shone like a diamond in that presentation\" diyebilirsin.",
    "context_sentences": ["In a room full of talented people, she still managed to shine like a diamond.", "His work ethic makes him shine like a diamond among his peers."]
  },

  /* ──────────────────────────────────────────────────────────────
     ŞAŞIRMA & TEPKİ — Genişletilmiş (id 2046–2050)
     ────────────────────────────────────────────────────────────── */
  {
    "id": 2046, "category": "sasirma",
    "tr": "Ağzım açık kaldı",
    "tags": ["ağız","aç","şaşır","hayret","donup","inanamıyorum"],
    "english_primary": "My jaw dropped",
    "alternatives": ["I was left speechless","I was gobsmacked","I couldn't believe my eyes"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Ağzım açık kaldı", "tr_gloss": "my mouth stayed open", "en_fragment": "my jaw dropped", "bridge_type": "transform", "explanation": "Ağzın açık kalması (pasif) → çenenin düşmesi (aktif): Türkçede donup kalma; İngilizcede düşme hareketiyle şaşkınlık." }
    ],
    "cultural_insight": "İki dil de ağız/çene üzerinden şaşkınlığı anlatır. Türkçede ağız açık kalır; İngilizcede çene düşer — hareket yönü farklı.",
    "fluency_tip": "\"My jaw literally dropped when I saw the price\" diyebilirsin.",
    "context_sentences": ["My jaw dropped when I saw the final result — I couldn't believe it.", "The audience's jaws dropped when the magician revealed the trick."]
  },
  {
    "id": 2047, "category": "sasirma",
    "tr": "Yere geçtim",
    "tags": ["yer","geç","utan","mahcup","rezil","yok olmak"],
    "english_primary": "I wanted the ground to swallow me up",
    "alternatives": ["I was mortified","I could have died of embarrassment","I wished I could disappear"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Yere geçtim", "tr_gloss": "I sank into the ground", "en_fragment": "wanted the ground to swallow me up", "bridge_type": "transform", "explanation": "Yere geçmek (kişi yerin içine girer) → yerin yutması (yer kişiyi yutar): Türkçede aktif geçiş; İngilizcede edilgen yutulma. Aynı yer metaforu, farklı yönler." }
    ],
    "cultural_insight": "Her iki dil de derin utancı yerin içine girmek isteme olarak ifade eder — evrensel bir utanç tepkisi.",
    "fluency_tip": "\"I wanted the ground to swallow me up when they called out my wrong answer\" diyebilirsin.",
    "context_sentences": ["I wanted the ground to swallow me up when I called the manager by the wrong name.", "She spilled coffee on the CEO's shirt and just wanted the ground to swallow her up."]
  },
  {
    "id": 2048, "category": "sasirma",
    "tr": "Gözlerime inanamadım",
    "tags": ["göz","inan","şaşır","hayret","görüntü","gerçek mi"],
    "english_primary": "I couldn't believe my eyes",
    "alternatives": ["I had to do a double take","I rubbed my eyes in disbelief"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Gözlerime inanamadım", "tr_gloss": "I couldn't believe my eyes", "en_fragment": "couldn't believe my eyes", "bridge_type": "direct", "explanation": "Birebir aynı ifade — iki dil de görme duyusu üzerinden şaşkınlığı anlatır." }
    ],
    "cultural_insight": "Bu ifade evrensel bir metafor. Gözlere inanmamak — görme organının aktardığı bilginin kabul edilememesi. Her kültürde benzer kullanım.",
    "fluency_tip": "\"I couldn't believe my eyes when I saw the transformation\" diyebilirsin.",
    "context_sentences": ["I couldn't believe my eyes when the underdog team won the championship.", "She couldn't believe her eyes — the renovation had completely transformed the space."]
  },
  {
    "id": 2049, "category": "sasirma",
    "tr": "Yerinde donup kaldım",
    "tags": ["don","kal","yerinde","şok","hareket","tepki","durmak"],
    "english_primary": "I was frozen to the spot",
    "alternatives": ["I was rooted to the spot","I froze up","I was paralyzed with shock"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Donup kaldım", "tr_gloss": "I froze and stayed", "en_fragment": "frozen to the spot", "bridge_type": "direct", "explanation": "Donup kalmak = frozen to the spot: Her iki dil de şok anında hareket edememe halini donmak üzerinden anlatır." }
    ],
    "cultural_insight": "Şok ve donma metaforu evrensel bir fizyolojik tepkiyi yansıtır — fight-or-flight tepkisinde 'freeze' modu. Her iki dil bunu donmakla ifade eder.",
    "fluency_tip": "\"I was frozen to the spot when I heard the news\" diyebilirsin.",
    "context_sentences": ["She was frozen to the spot when the car ran the red light right in front of her.", "I was frozen to the spot — I didn't know whether to run or stay."]
  },
  {
    "id": 2050, "category": "sasirma",
    "tr": "Şoke oldum",
    "tags": ["şok","ol","şaşır","duygu","beklenmedik","hayret"],
    "english_primary": "I was blown away",
    "alternatives": ["I was shocked","I was stunned","It blew my mind"],
    "register": "informal",
    "bridges": [
      { "tr_fragment": "Şoke oldum", "tr_gloss": "I was shocked / electrocuted metaphorically", "en_fragment": "blown away", "bridge_type": "transform", "explanation": "'Şok' (elektrik/etki) → blown away (uçup gitmek): Türkçe elektrik etkisini; İngilizce şiddetli rüzgarla savrulan birini çağrıştırır." }
    ],
    "cultural_insight": "'Blown away' pozitif de olabilir, negatif de. 'Şok' ise genellikle ani ve güçlü etkiyi anlatır — olumlu veya olumsuz.",
    "fluency_tip": "\"I was absolutely blown away by the performance\" diyebilirsin.",
    "context_sentences": ["I was blown away by how much the city had changed in just five years.", "The team was blown away by the standing ovation they received."]
  }
];
function findBridgeMatch(inputRaw) {
  const input = inputRaw.toLowerCase()
    .replace(/[.,!?;:()"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const inputWords = input.split(' ').filter(w => w.length > 1);

  let best = null;
  let bestScore = 0;

  BRIDGE_DATA.forEach(function(entry) {
    let score = 0;

    // 1. Tam eşleşme (en yüksek puan)
    if (entry.tr.toLowerCase() === inputRaw.toLowerCase()) {
      score = 100;
    } else {
      // 2. Girdi, ifadeyi içeriyor mu?
      if (input.includes(entry.tr.toLowerCase())) {
        score = 90;
      } else {
        // 3. Tag eşleşmesi
        const matchedTags = entry.tags.filter(function(tag) {
          return input.includes(tag.toLowerCase());
        });
        if (matchedTags.length > 0) {
          score = Math.round((matchedTags.length / entry.tags.length) * 70) + 10;
        } else {
          // 4. Kelime düzeyinde örtüşme
          const entryWords = entry.tr.toLowerCase().split(' ');
          const overlap = inputWords.filter(function(w) {
            return entryWords.some(function(ew) {
              return ew.includes(w) || w.includes(ew);
            });
          });
          if (overlap.length > 0) {
            score = Math.round((overlap.length / Math.max(inputWords.length, entryWords.length)) * 40);
          }
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  });

  // Eşik değer: en az 15 puan
  return bestScore >= 15 ? { entry: best, confidence: bestScore } : null;
}

function getTopMatches(inputRaw, count) {
  count = count || 3;
  const input = inputRaw.toLowerCase().replace(/[.,!?;:()"]/g, ' ').trim();
  const inputWords = input.split(' ').filter(function(w) { return w.length > 1; });

  const scored = BRIDGE_DATA.map(function(entry) {
    let score = 0;
    if (entry.tr.toLowerCase() === inputRaw.toLowerCase()) {
      score = 100;
    } else if (input.includes(entry.tr.toLowerCase())) {
      score = 85;
    } else {
      const matchedTags = entry.tags.filter(function(tag) {
        return input.includes(tag.toLowerCase());
      });
      if (matchedTags.length > 0) {
        score = Math.round((matchedTags.length / entry.tags.length) * 70) + 10;
      } else {
        const entryWords = entry.tr.toLowerCase().split(' ');
        const overlap = inputWords.filter(function(w) {
          return entryWords.some(function(ew) { return ew.includes(w) || w.includes(ew); });
        });
        if (overlap.length > 0) {
          score = Math.round((overlap.length / Math.max(inputWords.length, entryWords.length)) * 40);
        }
      }
    }
    return { entry: entry, score: score };
  });

  return scored
    .filter(function(s) { return s.score >= 10; })
    .sort(function(a, b) { return b.score - a.score; })
    .slice(0, count)
    .map(function(s) { return s.entry; });
}

function getByCategory(categoryId) {
  return BRIDGE_DATA.filter(function(e) { return e.category === categoryId; });
}

function getRandomEntries(count) {
  const shuffled = BRIDGE_DATA.slice().sort(function() { return Math.random() - 0.5; });
  return shuffled.slice(0, count || 5);
}
