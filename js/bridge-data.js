/* ═══════════════════════════════════════════════════════════════
   KÖPRÜ — Statik Veritabanı
   298+ Türkçe ifade · Tam köprü analizi · API gerektirmez
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
