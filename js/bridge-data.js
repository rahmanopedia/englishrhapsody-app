/* ═══════════════════════════════════════════════════════════════
   KÖPRÜ — Statik Veritabanı
   250+ Türkçe ifade · Tam köprü analizi · API gerektirmez
   ═══════════════════════════════════════════════════════════════ */

const BRIDGE_CATEGORIES = [
  { id:'duygular',  label:'Duygular',        icon:'💭' },
  { id:'yorgunluk', label:'Yorgunluk',        icon:'😮‍💨' },
  { id:'yogunluk',  label:'Yoğunluk & İş',   icon:'🔥' },
  { id:'sosyal',    label:'Sosyal',           icon:'🤝' },
  { id:'deyimler',  label:'Deyimler',         icon:'🪄' },
  { id:'sasirma',   label:'Şaşırma & Tepki',  icon:'😲' },
  { id:'basari',    label:'Başarı & Başarısızlık', icon:'🎯' },
  { id:'gunluk',    label:'Günlük Hayat',     icon:'☀️' },
];

const BRIDGE_DATA = [

/* ─── DUYGULAR ──────────────────────────────────────────────── */
{
  id:1, category:'duygular',
  tr:'Canım sıkıldı',
  tags:['canım','sıkıl','can sıkıntı','sıkıntı'],
  english_primary:"I'm climbing the walls",
  alternatives:["I'm going stir-crazy","I'm so bored I could scream"],
  register:'informal',
  bridges:[
    {tr_fragment:'Canım',tr_gloss:'my soul / inner self',en_fragment:'I',bridge_type:'direct',explanation:'Birinci şahıs doğrudan karşılık geliyor'},
    {tr_fragment:'sıkıldı',tr_gloss:'was squeezed / got bored',en_fragment:'climbing the walls',bridge_type:'transform',explanation:'İçe sıkışma hissi → kaçmak isteyen fiziksel metafora dönüşüyor'}
  ],
  cultural_insight:'Türkçede "can sıkıntısı" pasif — size oluyor. İngilizcede "climbing the walls" veya "going stir-crazy" gibi ifadeler aktif ve fiziksel. Sanki kişi harekete geçmek zorundaymış gibi.',
  fluency_tip:'"I\'ve been climbing the walls all afternoon" veya "This traffic is making me stir-crazy" diyebilirsin.'
},
{
  id:2, category:'duygular',
  tr:'Moralim bozuk',
  tags:['moralim','moral','bozuk','boz'],
  english_primary:"I'm feeling down",
  alternatives:["I'm in a funk","I'm not feeling myself"],
  register:'informal',
  bridges:[
    {tr_fragment:'Moralim',tr_gloss:'my morale / spirit',en_fragment:'I',bridge_type:'direct',explanation:'Birinci şahıs karşılık geliyor'},
    {tr_fragment:'bozuk',tr_gloss:'broken / damaged',en_fragment:'feeling down',bridge_type:'transform',explanation:'Türkçe bozukluk (kırıklık) → İngilizce aşağı yönlü fiziksel metafor'}
  ],
  cultural_insight:'"Moral" Türkçede çok kullanılan bir kelime. İngilizcede "morale" resmi bağlamlarda kullanılır; günlük dilde "mood" veya "spirits" denir.',
  fluency_tip:'"My spirits are low" daha şiirsel; "I\'m feeling off" daha günlük. İkisi de doğal.'
},
{
  id:3, category:'duygular',
  tr:'Sinirden çıldırıyorum',
  tags:['sinir','çıldır','sinirlendim','sinirli','çıldırtıyor'],
  english_primary:"I'm losing my mind",
  alternatives:["I'm absolutely furious","I'm about to lose it"],
  register:'informal',
  bridges:[
    {tr_fragment:'Sinirden',tr_gloss:'from anger / nervousness',en_fragment:'absolutely',bridge_type:'multiply',explanation:'Türkçe "sinir" hem sinirlilik hem öfkeyi kapsar; İngilizcede bunlar ayrışıyor'},
    {tr_fragment:'çıldırıyorum',tr_gloss:"I'm going crazy",en_fragment:"losing my mind",bridge_type:'transform',explanation:'Delilik metaforu her iki dilde de var ama İngilizce "losing" ile aktif kayıp vurgulanıyor'}
  ],
  cultural_insight:'"Sinir" Türkçede hem fiziksel siniri hem duygusal gerginliği anlatır. İngilizcede "I\'m angry" ile "I\'m nervous" birbirinden çok farklı.',
  fluency_tip:'"I\'m at my wit\'s end" (artık ne yapacağımı bilmiyorum) çok doğal alternatif.'
},
{
  id:4, category:'duygular',
  tr:'Kendimi berbat hissediyorum',
  tags:['berbat','hisset','kendim','kötü hisset'],
  english_primary:"I feel like garbage",
  alternatives:["I feel awful","I feel terrible"],
  register:'informal',
  bridges:[
    {tr_fragment:'Kendimi',tr_gloss:'myself',en_fragment:'I feel',bridge_type:'direct',explanation:'Birinci şahıs refleksif yapı benzer'},
    {tr_fragment:'berbat',tr_gloss:'terrible / disastrous',en_fragment:'like garbage',bridge_type:'transform',explanation:'Türkçe berbat soyut; İngilizce "garbage/trash" some çöp metaforu kullanıyor'}
  ],
  cultural_insight:'"Berbat" Fransızca "bravade"dan geliyor. İngilizcede "I feel like garbage/trash" veya "I feel like crap" günlük dilde çok yaygın.',
  fluency_tip:'"I\'m not feeling great" daha nazik; "I feel like death" çok dramatik ama yaygın.'
},
{
  id:5, category:'duygular',
  tr:'Çok heyecanlıyım',
  tags:['heyecan','heyecanlı','heyecanlandım'],
  english_primary:"I'm so pumped",
  alternatives:["I'm over the moon","I'm buzzing"],
  register:'informal',
  bridges:[
    {tr_fragment:'Çok',tr_gloss:'very / so much',en_fragment:'so',bridge_type:'direct',explanation:'Yoğunlaştırıcı doğrudan eşleşiyor'},
    {tr_fragment:'heyecanlıyım',tr_gloss:"I'm excited",en_fragment:'pumped',bridge_type:'transform',explanation:'Heyecan hissi → pompalanmış, şişirilmiş enerji metaforu'}
  ],
  cultural_insight:'"Pumped" spordan geliyor — kasların pompalaması gibi enerji dolu olmak. "Buzzing" İngiliz argosunda çok yaygın.',
  fluency_tip:'"I\'m stoked" (ABD), "I\'m chuffed" (İngiltere) de öğrenmeye değer alternatifler.'
},
{
  id:6, category:'duygular',
  tr:'Endişeleniyorum',
  tags:['endişe','endişelen','kaygı','kaygılanıyorum','tedirgin'],
  english_primary:"I'm worried sick",
  alternatives:["I'm on edge","I've got butterflies in my stomach"],
  register:'neutral',
  bridges:[
    {tr_fragment:'endişeleniyorum',tr_gloss:"I'm worrying",en_fragment:'worried sick',bridge_type:'transform',explanation:'Türkçe endişe soyut; İngilizce "worried sick" hastalık metaforuyla yoğunluğu artırıyor'}
  ],
  cultural_insight:'"Worried sick" fiziksel hastalık ima eder — kaygının bedene yansıması. "Butterflies in my stomach" ise karında kelebekler: beklenti ile kaygı karışımı.',
  fluency_tip:'"I\'m a bit anxious about it" daha ölçülü; "I\'m freaking out" çok daha yoğun.'
},
{
  id:7, category:'duygular',
  tr:'Utandım / Mahçup oldum',
  tags:['utandım','mahçup','utanç','yüzüm kızardı'],
  english_primary:"I wanted to crawl into a hole",
  alternatives:["I was mortified","I was so embarrassed"],
  register:'informal',
  bridges:[
    {tr_fragment:'Utandım',tr_gloss:'I was ashamed / embarrassed',en_fragment:'mortified',bridge_type:'transform',explanation:'Utanç hissi → ölümcül bir his (mortified=sanki öldürüldüm) veya yere girmek isteme metaforuna dönüşüyor'}
  ],
  cultural_insight:'"Mortified" kelimesi "mort" (ölüm) kökünden gelir. "I wanted to die" veya "I wanted to disappear" de çok yaygın. Utanç İngilizcede sıklıkla fiziksel kaçış isteğiyle anlatılır.',
  fluency_tip:'"I could have died" abartılı ama çok doğal. "That was so cringe" daha genç nesil ifadesi.'
},
{
  id:8, category:'duygular',
  tr:'Kıskanıyorum',
  tags:['kıskan','kıskançlık','çekemiyorum','imreniyor'],
  english_primary:"I'm green with envy",
  alternatives:["I'm so jealous","I can't help but envy you"],
  register:'informal',
  bridges:[
    {tr_fragment:'Kıskanıyorum',tr_gloss:"I'm jealous",en_fragment:'green with envy',bridge_type:'transform',explanation:'Kıskançlık hissi → yeşil renk metaforu (İngilizce kültürel sembol)'}
  ],
  cultural_insight:'Yeşil renk İngiliz kültüründe kıskançlığı simgeler — Shakespeare\'den geliyor. Türkçede böyle bir renk bağlantısı yok.',
  fluency_tip:'"I\'m low-key jealous" günlük ve hafif; "I\'m insanely jealous" çok daha güçlü.'
},
{
  id:9, category:'duygular',
  tr:'Pişmanım',
  tags:['pişman','pişmanlık','keşke','nadim'],
  english_primary:"I could kick myself",
  alternatives:["I deeply regret it","I wish I could take it back"],
  register:'informal',
  bridges:[
    {tr_fragment:'Pişmanım',tr_gloss:'I regret it / I repent',en_fragment:'could kick myself',bridge_type:'transform',explanation:'Pişmanlık → kendine fiziksel zarar verme isteği metaforu'}
  ],
  cultural_insight:'"I could kick myself" güçlü pişmanlık için çok yaygın. "I regret it" daha resmi ve sakin. Türkçe "keşke" için "I wish I had/hadn\'t..." kalıbını öğren.',
  fluency_tip:'"I should have known better" (daha iyi bilmeliydim) pişmanlık ifadelerinde çok yaygın.'
},
{
  id:10, category:'duygular',
  tr:'Gururlandım',
  tags:['gurur','gururl','gururlandım','övündüm'],
  english_primary:"I'm bursting with pride",
  alternatives:["I couldn't be prouder","I'm so proud I could cry"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Gururlandım',tr_gloss:'I felt pride',en_fragment:'bursting with pride',bridge_type:'transform',explanation:'Gurur hissi → patlama noktasına gelmiş kap metaforu'}
  ],
  cultural_insight:'"Bursting" tam doluluk ve taşma hissini anlatır. Türkçe "gururlandım" tek kelime; İngilizce bunu fiziksel metaforla zenginleştiriyor.',
  fluency_tip:'"That\'s something to be proud of" (övünülecek bir şey) tebrik ederken çok kullanışlı.'
},
{
  id:11, category:'duygular',
  tr:'Kafam karıştı',
  tags:['kafam','karış','kafam karıştı','anlayamadım','anlamadım'],
  english_primary:"I'm completely lost",
  alternatives:["I'm all confused","My head is spinning"],
  register:'informal',
  bridges:[
    {tr_fragment:'Kafam',tr_gloss:'my head',en_fragment:'I',bridge_type:'multiply',explanation:'Türkçe "kafa" (baş) ile düşünce özdeşleşiyor; İngilizce "I" kişiyi bütün olarak alıyor'},
    {tr_fragment:'karıştı',tr_gloss:'got mixed up / stirred',en_fragment:'completely lost',bridge_type:'transform',explanation:'Karışma/çorba hali → kaybolma/yön şaşırma metaforuna dönüşüyor'}
  ],
  cultural_insight:'"Kafam" Türkçede düşünme merkezidir. İngilizce "I\'m lost" yön bulmamayı kullanır. "My head is spinning" ise baş dönmesi metaforiyle daha Türkçeye yakın.',
  fluency_tip:'"I\'m confused" nötr; "I have no idea what\'s going on" daha güçlü; "I\'m totally out of my depth" daha derin bir çaresizlik.'
},
{
  id:12, category:'duygular',
  tr:'Çok mutluyum',
  tags:['mutlu','mutluyum','çok mutlu','sevinçliyim','sevinç'],
  english_primary:"I'm on cloud nine",
  alternatives:["I'm over the moon","I'm absolutely thrilled"],
  register:'informal',
  bridges:[
    {tr_fragment:'Çok mutluyum',tr_gloss:"I'm very happy",en_fragment:'on cloud nine',bridge_type:'transform',explanation:'Mutluluk → dokuzuncu bulutta olmak; yükseklik ve hafiflik metaforu'}
  ],
  cultural_insight:'"Cloud nine" Amerikan argosunda zirve mutluluğu temsil eder. "Over the moon" İngiliz kültüründe çok yaygın. İkisi de oldukça abartılı — günlük konuşmada "I\'m really happy" genellikle yeterli.',
  fluency_tip:'"I\'m so happy right now" en sade ve doğal; "This made my day" (günümü güzelleştirdi) çok pratik bir ifade.'
},
{
  id:13, category:'duygular',
  tr:'Üzgünüm',
  tags:['üzgün','üzüldüm','üzüntü','kederli','keder'],
  english_primary:"I'm heartbroken",
  alternatives:["I'm devastated","I'm feeling really low"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Üzgünüm',tr_gloss:"I'm sad",en_fragment:'heartbroken',bridge_type:'transform',explanation:'Üzüntü → kalp kırılması; daha yoğun ve fiziksel bir metafor'}
  ],
  cultural_insight:'"Heartbroken" çok güçlü — genellikle aşk acısı veya büyük bir kayıp için. Günlük üzüntü için "I\'m sad" veya "I\'m bummed" daha uygun.',
  fluency_tip:'"I\'m bummed" (hayal kırıklığı), "I\'m down" (moralsiz), "I\'m gutted" (İngiltere\'de çok yaygın) iyi alternatifler.'
},
{
  id:14, category:'duygular',
  tr:'Rahatladım',
  tags:['rahatla','rahatladım','rahatlama','nefes aldım','yük kalktı'],
  english_primary:"I can finally breathe again",
  alternatives:["What a relief","I feel a weight lifted off my shoulders"],
  register:'informal',
  bridges:[
    {tr_fragment:'Rahatladım',tr_gloss:'I relaxed / I was relieved',en_fragment:'finally breathe again',bridge_type:'transform',explanation:'Rahatlama → nefes almak; baskının kalkmasıyla gelen özgürlük metaforu'}
  ],
  cultural_insight:'İngilizcede rahatlama sıklıkla nefes metaforuyla anlatılır: "breathe easy", "take a breather". Türkçe daha doğrudan.',
  fluency_tip:'"Thank goodness that\'s over" (şükür bitti) ve "I\'m so relieved" en yaygın ifadeler.'
},
{
  id:15, category:'duygular',
  tr:'Korkuyorum',
  tags:['kork','korkuyorum','korktu','korku','ürktüm','ürktüyüm'],
  english_primary:"I'm scared stiff",
  alternatives:["I'm terrified","I'm freaking out"],
  register:'informal',
  bridges:[
    {tr_fragment:'Korkuyorum',tr_gloss:"I'm scared",en_fragment:'scared stiff',bridge_type:'transform',explanation:'Korku → kasılıp donma (stiff = katı/sert); fiziksel tepki metaforu'}
  ],
  cultural_insight:'"Scared stiff" hareketsiz kalma tepkisini anlatır. "Terrified" çok güçlü; "spooked" hayalet filmi gibi hafif korku için.',
  fluency_tip:'"I\'m a little nervous" (hafif kaygı) ile "I\'m absolutely terrified" arasındaki farkı öğren.'
},

/* ─── YORGUNLUK ─────────────────────────────────────────────── */
{
  id:20, category:'yorgunluk',
  tr:'Çok yoruldum',
  tags:['yoruldum','çok yoruldum','yorgun','bitik'],
  english_primary:"I'm completely drained",
  alternatives:["I'm running on empty","I'm dead on my feet"],
  register:'informal',
  bridges:[
    {tr_fragment:'Çok',tr_gloss:'very / so much',en_fragment:'completely',bridge_type:'direct',explanation:'Yoğunlaştırıcı benzer'},
    {tr_fragment:'yoruldum',tr_gloss:'I got tired',en_fragment:'drained',bridge_type:'transform',explanation:'Yorgunluk → boşaltılmış pil/tank metaforu; enerji sıfırlandı'}
  ],
  cultural_insight:'"Drained" enerji tamamen tükenmiş demek. "Running on empty" boş tank metaforu. "Dead on my feet" ayakta ölü — çok güçlü.',
  fluency_tip:'"Exhausted" hem fiziksel hem zihinsel yorgunluk için; "wiped out" daha argo.'
},
{
  id:21, category:'yorgunluk',
  tr:'Bitik hissediyorum',
  tags:['bitik','tükenmiş','tükendim','bitirdim','bitti'],
  english_primary:"I'm burned out",
  alternatives:["I'm utterly exhausted","I've hit a wall"],
  register:'informal',
  bridges:[
    {tr_fragment:'Bitik',tr_gloss:'finished / depleted',en_fragment:'burned out',bridge_type:'transform',explanation:'Bitmişlik → yanmış ve küle dönmüş; daha dramatik ve kalıcı tükenme metaforu'}
  ],
  cultural_insight:'"Burnout" artık İngilizcede tıbbi terim. "Hit a wall" ise bir duvara çarpıp durmak — ani tükenme.',
  fluency_tip:'"I\'m mentally drained" zihinsel yorgunluk için; "My body is giving up on me" fiziksel için.'
},
{
  id:22, category:'yorgunluk',
  tr:'Uyku bastırıyor',
  tags:['uyku','uyku bastır','gözlerim kapanıyor','uyuyakaldım','uyukluyorum'],
  english_primary:"I can barely keep my eyes open",
  alternatives:["I'm fighting to stay awake","I'm nodding off"],
  register:'informal',
  bridges:[
    {tr_fragment:'Uyku bastırıyor',tr_gloss:'sleep is pressing down on me',en_fragment:"can barely keep my eyes open",bridge_type:'transform',explanation:'Türkçe uyku aktif bir baskı unsuru; İngilizce gözlerin kapanmasına direncini anlatıyor'}
  ],
  cultural_insight:'Türkçede uyku kişiye yapılan bir şey (bastırıyor). İngilizcede kişi uyuyakalmayla savaşıyor. Metaforlar zıt yönde.',
  fluency_tip:'"I\'m dead tired" (ölü gibi yorgun), "I need to crash" (uyumam lazım) çok pratik.'
},
{
  id:23, category:'yorgunluk',
  tr:'Uyuyamıyorum',
  tags:['uyuyamıyorum','uyku uyuyamadım','uykusuzluk','uyku tutmuyor'],
  english_primary:"I can't get any sleep",
  alternatives:["I've been lying awake all night","Sleep is avoiding me"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Uyuyamıyorum',tr_gloss:"I can't sleep",en_fragment:"been lying awake all night",bridge_type:'transform',explanation:'Uyuyamamak → gece boyu uyanık yatmak; süreci betimliyor'}
  ],
  cultural_insight:'"Insomnia" resmi terim; günlük dilde "I can\'t sleep" veya "I toss and turn all night" (gece boyunca debeleniyorum) kullanılır.',
  fluency_tip:'"My mind won\'t switch off" (aklım kapanmıyor) çok yaygın uyku problemi ifadesi.'
},
{
  id:24, category:'yorgunluk',
  tr:'Kendimi tükenmiş hissediyorum',
  tags:['tüken','tükendim','tükenmiş','bitap','güçsüz'],
  english_primary:"I'm running on fumes",
  alternatives:["I have nothing left in the tank","I'm completely spent"],
  register:'informal',
  bridges:[
    {tr_fragment:'tükenmiş',tr_gloss:'depleted / used up',en_fragment:'running on fumes',bridge_type:'transform',explanation:'Enerji tamamen bitti → arabanın yakıtsız sadece buharla ilerlemesi'}
  ],
  cultural_insight:'"Running on fumes" çok güçlü bir metafor. "Spent" (para gibi) tükenmiş demek. Her ikisi de benzin/enerji ekonomisini kullanıyor.',
  fluency_tip:'"I need to recharge" (şarj olmam lazım) modern ve çok yaygın.'
},

/* ─── YOĞUNLUK & İŞ ─────────────────────────────────────────── */
{
  id:30, category:'yogunluk',
  tr:'İşler çok yoğun gidiyor',
  tags:['iş','yoğun','meşgul','yogun','yoğunluk'],
  english_primary:"Things are absolutely hectic",
  alternatives:["I'm swamped","I'm up to my neck in work"],
  register:'informal',
  bridges:[
    {tr_fragment:'İşler',tr_gloss:'things / work',en_fragment:'things',bridge_type:'direct',explanation:'Genel konu referansı benzer'},
    {tr_fragment:'çok yoğun',tr_gloss:'very dense / busy',en_fragment:'absolutely hectic',bridge_type:'transform',explanation:'Yoğunluk → kaotik, kontrolsüz bir tempoya dönüşüyor (hectic = kaygı verici kargaşa)'}
  ],
  cultural_insight:'"Hectic" sadece yoğun değil, düzensiz ve bunaltıcı. "Swamped" bataklık metaforu; "up to my neck" boyuna kadar gömülmek.',
  fluency_tip:'"Crazy busy" (ABD), "mental" (İngiltere) çok yaygın günlük alternatifler.'
},
{
  id:31, category:'yogunluk',
  tr:'Boğuluyorum işlerde',
  tags:['boğul','boğuluyorum','iş','yetişemiyorum','fırsat yok'],
  english_primary:"I'm drowning in work",
  alternatives:["I'm overwhelmed","I can't keep up with everything"],
  register:'informal',
  bridges:[
    {tr_fragment:'Boğuluyorum',tr_gloss:"I'm suffocating",en_fragment:'drowning',bridge_type:'direct',explanation:'Her iki dil de ölümcül sıvı metaforunu kullanıyor — boğmak vs. drowning'},
    {tr_fragment:'işlerde',tr_gloss:'in work / tasks',en_fragment:'in work',bridge_type:'direct',explanation:'Bağlaç benzer'}
  ],
  cultural_insight:'İlginç: bu iki metafor birbirine çok yakın. Türkçe boğulmak (hava), İngilizce drowning (su). Her iki kültür de ezici iş yükünü ölüm metaforuyla anlatıyor.',
  fluency_tip:'"I\'m overwhelmed" en yaygın; "I have too much on my plate" (tabağım dolu) çok güzel bir İngilizce kalıp.'
},
{
  id:32, category:'yogunluk',
  tr:'Arkaya düştüm',
  tags:['arkaya düştüm','geri kaldım','geride kaldım','yetişemiyorum','yetiş'],
  english_primary:"I'm falling behind",
  alternatives:["I'm struggling to keep up","I'm getting behind on everything"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Arkaya düştüm',tr_gloss:'I fell to the back',en_fragment:'falling behind',bridge_type:'direct',explanation:'Her iki dil de geri kalmayı fiziksel konum olarak anlatıyor — neredeyse birebir eşleşme'}
  ],
  cultural_insight:'Bu nadir bir doğrudan köprü! Türkçe ve İngilizce aynı fiziksel metaforu kullanıyor. Diller bazen düşündüğünden daha yakın.',
  fluency_tip:'"I\'m behind on my work" veya "I need to catch up" (yetişmem lazım) çok kullanışlı.'
},
{
  id:33, category:'yogunluk',
  tr:'Her şey üstüme yığıldı',
  tags:['üstüme','yığıldı','üstüme yığıldı','bunaldım','altında kaldım'],
  english_primary:"Everything is piling up on me",
  alternatives:["I'm buried under everything","It's all catching up with me"],
  register:'informal',
  bridges:[
    {tr_fragment:'Her şey',tr_gloss:'everything',en_fragment:'everything',bridge_type:'direct',explanation:'Evrensel kapsam benzer'},
    {tr_fragment:'üstüme yığıldı',tr_gloss:'piled up on top of me',en_fragment:'piling up on me',bridge_type:'direct',explanation:'Yığılma metaforu her iki dilde de aynı; Türkçe geçmiş zaman, İngilizce süregelen bir eylem olarak görüyor'}
  ],
  cultural_insight:'Bu ifade iki dilde de çok benzer. Fark: Türkçe bitiş noktasını (yığıldı), İngilizce süreci (piling up) vurguluyor.',
  fluency_tip:'"I have a lot on my plate" ve "I\'m juggling too much" (çok şeyi dengelemeye çalışıyorum) çok kullanışlı.'
},
{
  id:34, category:'yogunluk',
  tr:'Deadline\'ım var',
  tags:['deadline','son gün','teslim','teslim tarihi','son tarih'],
  english_primary:"I'm up against a deadline",
  alternatives:["I have a deadline looming","I'm racing against the clock"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Deadline\'ım',tr_gloss:'my deadline',en_fragment:'up against a deadline',bridge_type:'transform',explanation:'Türkçe sahiplik (benim deadline\'ım); İngilizce çarpışma metaforu — deadline\'a karşı durmak'}
  ],
  cultural_insight:'"Deadline" kelimesi 1860\'lı yıllarda matbaacılıktan geliyor. "Racing against the clock" saat yarışı — çok görsel bir metafor.',
  fluency_tip:'"The deadline is tomorrow" en basit; "I\'m on a tight deadline" (sıkışık tarih) çok profesyonel.'
},
{
  id:35, category:'yogunluk',
  tr:'Çok meşgulüm',
  tags:['meşgul','çok meşgul','zamanım yok','fırsatım yok'],
  english_primary:"I'm slammed right now",
  alternatives:["I'm swamped","I don't have a free moment"],
  register:'informal',
  bridges:[
    {tr_fragment:'Çok meşgulüm',tr_gloss:"I'm very busy",en_fragment:'slammed',bridge_type:'transform',explanation:'"Meşgul" Arapça kökenli sakin bir kelime; "slammed" çok güçlü fiziksel etki metaforu'}
  ],
  cultural_insight:'"Slammed" (çarpmak) günlük İngilizcede çok yaygın. "Swamped" bataklık, "buried" gömülü — İngilizce yoğunluğu fiziksel tehlike olarak çerçeveler.',
  fluency_tip:'"I\'m tied up right now" (şu an bağlıyım) nazik bir ret için ideal.'
},

/* ─── SOSYAL ─────────────────────────────────────────────────── */
{
  id:40, category:'sosyal',
  tr:'Özledim seni',
  tags:['özle','özledim','özlemek','hasret','hasretim'],
  english_primary:"I've missed you like crazy",
  alternatives:["I've been thinking about you","It's been so long"],
  register:'informal',
  bridges:[
    {tr_fragment:'Özledim',tr_gloss:'I missed / I longed for',en_fragment:"I've missed you",bridge_type:'direct',explanation:'Özlem ifadesi benzer yapıda'},
    {tr_fragment:'seni',tr_gloss:'you',en_fragment:'like crazy',bridge_type:'emerge',explanation:'İngilizcede yoğunluğu artırmak için "like crazy/mad" eklenir; Türkçede bu gizli anlamdadır'}
  ],
  cultural_insight:'"I miss you" yeterli ama İngilizce native konuşmacılar genellikle yoğunlaştırıcı ekler: "terribly", "like crazy", "so much".',
  fluency_tip:'"It\'s been ages" (çok zaman oldu) ve "Where have you been hiding?" (nerede saklandın?) çok doğal karşılaşma ifadeleri.'
},
{
  id:41, category:'sosyal',
  tr:'Kavga ettik',
  tags:['kavga','kavga ettik','tartıştık','tartışma','küstük'],
  english_primary:"We had a falling out",
  alternatives:["We got into it","We had a big fight"],
  register:'informal',
  bridges:[
    {tr_fragment:'Kavga ettik',tr_gloss:'we fought',en_fragment:'had a falling out',bridge_type:'transform',explanation:'Kavga → "düşüş" metaforu; ilişkinin aşağı düşmesi/kopması'}
  ],
  cultural_insight:'"Falling out" kalıcı kopukluk ima eder. "We argued" daha hafif; "We had words" (İngiltere) kibarca kavgaya atıf.',
  fluency_tip:'"We had a disagreement" (anlaşmazlık) daha resmi; "We butted heads" (başları çarpıştı) eşit iki güç çatışması.'
},
{
  id:42, category:'sosyal',
  tr:'Barıştık',
  tags:['barıştık','barış','uzlaştık','düzeldi aramız'],
  english_primary:"We patched things up",
  alternatives:["We made up","We sorted things out"],
  register:'informal',
  bridges:[
    {tr_fragment:'Barıştık',tr_gloss:'we made peace',en_fragment:'patched things up',bridge_type:'transform',explanation:'Barış → yama yapma metaforu; ilişkinin delik kısmını onarmak'}
  ],
  cultural_insight:'"Made up" en yaygın. "Patched up" yama = geçici onarım ima edebilir. "Buried the hatchet" (baltayı gömdük) daha dramatik barış.',
  fluency_tip:'"We\'re good now" (artık iyiyiz) en pratik ve doğal ifade.'
},
{
  id:43, category:'sosyal',
  tr:'Canımı sıktı',
  tags:['canımı sıktı','sinir etti','rahatsız etti','bezdirdi'],
  english_primary:"They got on my nerves",
  alternatives:["They drove me up the wall","They really wound me up"],
  register:'informal',
  bridges:[
    {tr_fragment:'Canımı sıktı',tr_gloss:'squeezed my soul',en_fragment:'got on my nerves',bridge_type:'transform',explanation:'Türkçe ruh/can üzerindeki baskı → İngilizce sinirler üzerindeki etki'}
  ],
  cultural_insight:'"Get on my nerves" fiziksel sinir ağını kullanıyor. "Drive me up the wall" de korku/çılgınlık metaforu. İngilizce rahatsızlığı çoğunlukla fiziksel tepkiyle anlatır.',
  fluency_tip:'"They annoyed me" yeterli; "They\'re doing my head in" (İngiltere) çok yaygın.'
},
{
  id:44, category:'sosyal',
  tr:'Hayal kırıklığına uğradım',
  tags:['hayal kırıklığı','hayal kırıktı','beklenti','bekledim','olmadı'],
  english_primary:"I was gutted",
  alternatives:["I was let down","That really disappointed me"],
  register:'informal',
  bridges:[
    {tr_fragment:'Hayal kırıklığı',tr_gloss:'dream breaking',en_fragment:'gutted',bridge_type:'transform',explanation:'Hayal/rüya kırıldı → bağırsak alındı (gutted); şiddetli iç boşluk hissi'}
  ],
  cultural_insight:'"Gutted" İngiliz argosunda çok güçlü hayal kırıklığı. Kelimenin tam anlamı "iç organları çıkarılmış". Türkçe hayal kırıklığı daha şiirsel.',
  fluency_tip:'"I was really hoping for..." ve "That\'s a shame" (yazık) kibarca hayal kırıklığı için çok kullanışlı.'
},
{
  id:45, category:'sosyal',
  tr:'Burnunu sokuyor',
  tags:['burnunu sok','karışıyor','işine karışıyor','müdahale','karışma'],
  english_primary:"They keep sticking their nose in",
  alternatives:["They can't mind their own business","They're always interfering"],
  register:'informal',
  bridges:[
    {tr_fragment:'Burnunu sokuyor',tr_gloss:'sticking their nose in',en_fragment:'sticking their nose in',bridge_type:'direct',explanation:'Çok nadir doğrudan metafor eşleşmesi! İki dil de burun metaforunu kullanıyor'}
  ],
  cultural_insight:'Bu muhtemelen Türkçe deyimin İngilizceden çevrildiğini ya da iki dilin aynı beden metaforunu bağımsız geliştirdiğini gösteriyor. "Mind your own business" (kendi işine bak) temel ifade.',
  fluency_tip:'"Stay in your lane" (kendi şeridinde kal) modern ve çok yaygın.'
},
{
  id:46, category:'sosyal',
  tr:'Yüz yüze konuşalım',
  tags:['yüz yüze','birebir','konuşalım','görüşelim'],
  english_primary:"Let's talk face to face",
  alternatives:["Let's sit down and talk","I'd rather speak in person"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Yüz yüze',tr_gloss:'face to face',en_fragment:'face to face',bridge_type:'direct',explanation:'Birebir çeviri; iki dil aynı metaforu paylaşıyor'}
  ],
  cultural_insight:'İlginç bir birebir eşleşme. "In person" daha modern; "one-on-one" (bire bir) iş ortamında çok yaygın.',
  fluency_tip:'"Can we grab a coffee and chat?" (kahve içip konuşalım mı?) çok doğal davet.'
},

/* ─── DEYİMLER ──────────────────────────────────────────────── */
{
  id:50, category:'deyimler',
  tr:'Üstümden yük kalktı',
  tags:['üstümden yük kalktı','yük kalktı','rahatlama','kurtuldum','nefes aldım'],
  english_primary:"A weight has been lifted off my shoulders",
  alternatives:["I feel like a new person","What a load off my mind"],
  register:'informal',
  bridges:[
    {tr_fragment:'Üstümden',tr_gloss:'from on top of me',en_fragment:'off my shoulders',bridge_type:'transform',explanation:'Türkçe üst (tüm vücut); İngilizce omuzlar (responsibility=omuzlara yüklenen şey)'},
    {tr_fragment:'yük kalktı',tr_gloss:'the weight/load rose',en_fragment:'a weight has been lifted',bridge_type:'direct',explanation:'Yük/weight metaforu iki dilde de benzer; kalkma/lifting hareketi aynı'}
  ],
  cultural_insight:'"Shoulders" sorumluluk taşıma merkezi olarak İngilizcede çok simgesel. "Load off my mind" ise zihinsel yükü vurguluyor.',
  fluency_tip:'"That\'s such a relief" en kısa ve yaygın tepki.'
},
{
  id:51, category:'deyimler',
  tr:'Burnumdan getirdi',
  tags:['burnumdan getirdi','bunalttı','canımı çıkardı','bezdirdi','çıldırttı'],
  english_primary:"They drove me absolutely crazy",
  alternatives:["They really pushed my buttons","They wore me down"],
  register:'informal',
  bridges:[
    {tr_fragment:'Burnumdan',tr_gloss:'from my nose',en_fragment:'absolutely',bridge_type:'disappear',explanation:'Türkçe burun metaforu İngilizcede kaybolur — karşılığı yok'},
    {tr_fragment:'getirdi',tr_gloss:'brought (me to)',en_fragment:'drove me crazy',bridge_type:'transform',explanation:'Getirme eylemi → sürme/zorla götürme; İngilizce aktif bir ulaştırma metaforu kullanıyor'}
  ],
  cultural_insight:'Türkçe "burnumdan getirmek" çok özgün. İngilizcede bunu tam karşılayan tek bir deyim yok. En yakını "drove me up the wall" veya "pushed me to my limit".',
  fluency_tip:'"I\'ve had it up to here" (buraya kadar doldum) jestli söylendiğinde çok etkili.'
},
{
  id:52, category:'deyimler',
  tr:'Ağzı açık kaldı',
  tags:['ağzı açık','şaşırdı','şaşkına döndü','donup kaldı'],
  english_primary:"Their jaw dropped",
  alternatives:["They were gobsmacked","They couldn't believe their eyes"],
  register:'informal',
  bridges:[
    {tr_fragment:'Ağzı açık kaldı',tr_gloss:'their mouth stayed open',en_fragment:'jaw dropped',bridge_type:'transform',explanation:'Türkçe ağız açık kalmak (statik); İngilizce çene düşmek (dinamik hareket)'}
  ],
  cultural_insight:'Her iki dil de ağız/çene ile şaşkınlığı anlatıyor. Türkçede ağız açık kalır (dondurulmuş); İngilizcede çene aşağı düşer (hareketi var). "Gobsmacked" İngiltere\'de çok yaygın.',
  fluency_tip:'"They were speechless" (sözsüz kaldı) ve "They didn\'t know what to say" çok kullanışlı.'
},
{
  id:53, category:'deyimler',
  tr:'Lafı dolandırmak',
  tags:['lafı dolandır','doğrudan söyleme','etrafından dolan','çevresinde dol'],
  english_primary:"Beating around the bush",
  alternatives:["Not getting to the point","Dancing around the issue"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Lafı dolandırmak',tr_gloss:'winding the words around',en_fragment:'beating around the bush',bridge_type:'transform',explanation:'Türkçe kelime dolandırma (dönme); İngilizce çalı etrafında vurma — ikisi de dolaylı olmayı anlatıyor'}
  ],
  cultural_insight:'"Beating around the bush" avlanmadan geliyor: avı doğrudan yakalamak yerine çalıları dövmek. Türkçe metafor dil üzerine, İngilizce eylem üzerine.',
  fluency_tip:'"Just get to the point" (direkt söyle) veya "Stop sugarcoating it" (şekerlemeyi bırak) iyi tepkiler.'
},
{
  id:54, category:'deyimler',
  tr:'Parmak ısırmak',
  tags:['parmak ısır','inanılmaz','şaşırtıcı','çok güzel','hayran kaldı'],
  english_primary:"Absolutely jaw-dropping",
  alternatives:["Mind-blowingly good","Out of this world"],
  register:'informal',
  bridges:[
    {tr_fragment:'Parmak ısırmak',tr_gloss:'finger biting',en_fragment:'jaw-dropping',bridge_type:'transform',explanation:'Türkçe parmak ısırmak (hayranlıkla/kıskançlıkla) → İngilizce çene düşme; beden dili metaforu'}
  ],
  cultural_insight:'"Parmak ısırmak" kıskanma + hayranlık karışımı; tam İngilizce karşılığı yok. "Jaw-dropping" sadece hayranlık. "Eat your heart out" kıskanma kısmını yakalıyor.',
  fluency_tip:'"It was insane" (deliceydi), "That blew my mind" (aklımı uçurdu) çok modern.'
},
{
  id:55, category:'deyimler',
  tr:'Dili tutuldu',
  tags:['dili tutuldu','söyleyemedi','susup kaldı','konuşamadı'],
  english_primary:"They were lost for words",
  alternatives:["They were at a loss for words","They went completely silent"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Dili tutuldu',tr_gloss:'their tongue was held/caught',en_fragment:'lost for words',bridge_type:'transform',explanation:'Türkçe dil pasif olarak tutuluyor (dışarıdan); İngilizce kelimeler kaybolup bulunamazlaşıyor'}
  ],
  cultural_insight:'Türkçede dil (tongue) konuşma merkezi; İngilizcede "words" konuşma merkezi. Her iki dil de konuşamamayı anlatıyor ama beden organı vs. araç olarak.',
  fluency_tip:'"Speechless" en kısa; "I was dumbfounded" (dumb=suskun+founded=temelini attı) güçlü ve kalıcı.'
},
{
  id:56, category:'deyimler',
  tr:'Gözü açık değil',
  tags:['gözü açık değil','farkında değil','anlamıyor','görmüyor','naif','saf'],
  english_primary:"They don't know what hit them",
  alternatives:["They have no idea what's going on","They're completely oblivious"],
  register:'informal',
  bridges:[
    {tr_fragment:'Gözü açık değil',tr_gloss:'their eye is not open',en_fragment:'oblivious',bridge_type:'transform',explanation:'Türkçe göz metaforu → İngilizce bilinç yokluğu; görmek ile farkında olmak arasındaki köprü'}
  ],
  cultural_insight:'"Gözü açık olmak" deneyim ve farkındalık demek. İngilizcede "eyes wide open" tam bilinç için; "oblivious" (Latince: unutulmuş) ise farkındalık yokluğu.',
  fluency_tip:'"They have no clue" (hiç fikri yok) çok günlük ve yaygın.'
},
{
  id:57, category:'deyimler',
  tr:'Sonu gelmedi',
  tags:['sonu gelmedi','bitmedi','bitmiyor','sonsuz','uzun sürdü'],
  english_primary:"It went on forever",
  alternatives:["It never seemed to end","It dragged on and on"],
  register:'informal',
  bridges:[
    {tr_fragment:'Sonu gelmedi',tr_gloss:"its end didn't come",en_fragment:'went on forever',bridge_type:'transform',explanation:'Türkçe son/uç gelmemesi → İngilizce sonsuzluğa uzama; zaman algısı farklı çerçeveleniyor'}
  ],
  cultural_insight:'"Dragging on" çok görsel — bir şeyi zorla uzatmak. "Forever" (sonsuza dek) abartı, "It felt like hours" ise daha ölçülü.',
  fluency_tip:'"That was never-ending" ve "I thought it would never end" çok doğal.'
},
{
  id:58, category:'deyimler',
  tr:'Ağzından laf almak güç',
  tags:['ağzından laf almak','konuşmuyor','anlatmıyor','bilgi almak güç','suskunluk'],
  english_primary:"Getting blood from a stone",
  alternatives:["You can't get a word out of them","Like pulling teeth"],
  register:'informal',
  bridges:[
    {tr_fragment:'Ağzından laf almak',tr_gloss:'to take words from their mouth',en_fragment:'getting blood from a stone',bridge_type:'transform',explanation:'Türkçe ağızdan kelime çıkarmak → İngilizce taştan kan çıkarmak; imkansızlık metaforu güçleniyor'}
  ],
  cultural_insight:'"Like pulling teeth" (diş çekmeye benziyor) çok çarpıcı. "Taştan kan" ve "diş çekmek" — İngilizce daha ağrılı metafor kullanıyor.',
  fluency_tip:'"They\'re not very forthcoming" daha resmi; "I can\'t get them to open up" (içini açtıramıyorum) çok doğal.'
},
{
  id:59, category:'deyimler',
  tr:'Eli boş geldi',
  tags:['eli boş','boş el','hediyesiz geldi','bir şey getirmedi'],
  english_primary:"They showed up empty-handed",
  alternatives:["They came with nothing","They didn't bring anything"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Eli boş',tr_gloss:'their hand empty',en_fragment:'empty-handed',bridge_type:'direct',explanation:'Bu çok nadir birebir eşleşme! Türkçe ve İngilizce aynı beden metaforunu kullanıyor'}
  ],
  cultural_insight:'"Empty-handed" ve "eli boş" neredeyse birebir çeviri. İki dil bu kavramı aynı şekilde kavrıyor: boş el = getirilen bir şey yok.',
  fluency_tip:'"They didn\'t come bearing gifts" (hediyelerle gelmediler) daha şiirsel; "They arrived without anything" daha düz.'
},
{
  id:60, category:'deyimler',
  tr:'Dört gözle beklemek',
  tags:['dört gözle','sabırsızlıkla bekliyorum','bekliyor','dört gözle bekle'],
  english_primary:"I'm looking forward to it so much",
  alternatives:["I can hardly wait","I'm counting down the days"],
  register:'informal',
  bridges:[
    {tr_fragment:'Dört gözle',tr_gloss:'with four eyes',en_fragment:'looking forward',bridge_type:'transform',explanation:'Türkçe dört göz (çift beklenti, iki göz yetmiyor); İngilizce ileriye bakmak (ilerleme metaforu)'}
  ],
  cultural_insight:'"Dört gözle" görme kapasitesini ikiye katlıyor — o kadar meraklı. "Looking forward to" ise bakışı geleceğe yöneltiyor. Güzel bir metafor farkı.',
  fluency_tip:'"Can\'t wait" (bekleyemiyorum) en kısa ve en yaygın ifade.'
},
{
  id:61, category:'deyimler',
  tr:'Sözünden dönmek',
  tags:['sözünden döndü','vaadini tutmadı','sözünü tutmadı','vaat','söz'],
  english_primary:"They went back on their word",
  alternatives:["They broke their promise","They didn't follow through"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Sözünden dönmek',tr_gloss:'to return from their word',en_fragment:'went back on their word',bridge_type:'direct',explanation:'Her iki dil de "söz/word"den geri dönmek metaforunu kullanıyor — çok yakın eşleşme'}
  ],
  cultural_insight:'"Word" (söz) İngilizcede de söz verme anlamında kutsal: "I give you my word". "They didn\'t keep their word" da çok doğal.',
  fluency_tip:'"They let me down" (hayal kırıklığına uğrattı) bu durumda daha duygusal bir ifade.'
},
{
  id:62, category:'deyimler',
  tr:'İşi gücü bu',
  tags:['işi gücü bu','başka işi yok','hep böyle yapıyor','sürekli'],
  english_primary:"That's all they ever do",
  alternatives:["It's always the same with them","That's their whole thing"],
  register:'informal',
  bridges:[
    {tr_fragment:'İşi gücü bu',tr_gloss:'their work and labor is this',en_fragment:"that's all they ever do",bridge_type:'transform',explanation:'Türkçe iş+güç (emek metaforu) → İngilizce tekrar+daima; kalıp davranış vurgusu farklı çerçeveleniyor'}
  ],
  cultural_insight:'Türkçe "iş gücü" ekonomik bir metafor; bütün emeği buna gidiyor. İngilizce sadece frekansa odaklanıyor: her zaman bu.',
  fluency_tip:'"They never change" ve "Same old, same old" çok yaygın kalıplar.'
},

/* ─── ŞAŞIRMA & TEPKİ ───────────────────────────────────────── */
{
  id:70, category:'sasirma',
  tr:'İnanamıyorum',
  tags:['inanamıyorum','inanılmaz','inanmak','şok oldum','hayrete düştüm'],
  english_primary:"I can't believe this",
  alternatives:["No way!","Are you serious right now?"],
  register:'informal',
  bridges:[
    {tr_fragment:'İnanamıyorum',tr_gloss:"I can't believe it",en_fragment:"I can't believe this",bridge_type:'direct',explanation:'Neredeyse birebir karşılık — iki dil de inanç yokluğunu kullanıyor'}
  ],
  cultural_insight:'"No way!" kısa ve çok yaygın. "You\'re kidding me" (şaka yapıyorsun) veya "Get out of here" (gidiversene) şaşkınlığı daha renkli ifade ediyor.',
  fluency_tip:'"Shut up!" (ABD argosunda) "beni şaşırttın" anlamında kullanılıyor — Türkçe "sus" ile karıştırma.'
},
{
  id:71, category:'sasirma',
  tr:'Aklım almıyor',
  tags:['aklım almıyor','anlamıyorum','kavrayamıyorum','idrak edemiyorum'],
  english_primary:"I can't wrap my head around it",
  alternatives:["It's beyond me","I just can't grasp it"],
  register:'informal',
  bridges:[
    {tr_fragment:'Aklım almıyor',tr_gloss:"my mind doesn't take it / accept it",en_fragment:"can't wrap my head around it",bridge_type:'transform',explanation:'Türkçe akıl pasif (almıyor/reddediyor); İngilizce aktif kucaklama/sarma metaforu — kafa etrafını sarmak'}
  ],
  cultural_insight:'İlginç metafor farkı: Türkçe anlayış kabul/reddetme; İngilizce anlayış fiziksel sarma. "It\'s beyond me" ise sınır/boyut metaforu.',
  fluency_tip:'"That makes no sense to me" daha doğrudan; "I\'m having trouble understanding" daha nazik.'
},
{
  id:72, category:'sasirma',
  tr:'Bu nasıl mümkün',
  tags:['nasıl mümkün','mümkün değil','imkansız','olamaz','bu nasıl'],
  english_primary:"How on earth is that possible?",
  alternatives:["That can't be right","I don't see how that's possible"],
  register:'informal',
  bridges:[
    {tr_fragment:'Bu nasıl mümkün',tr_gloss:'how is this possible',en_fragment:'How on earth',bridge_type:'emerge',explanation:'"On earth" İngilizcede vurgu için eklenen ifade; Türkçede karşılığı yok ama çok doğal hissettiriyor'}
  ],
  cultural_insight:'"On earth" neden orada? Yeryüzündeki imkansızlığı vurguluyor. "In the world", "on earth", "the hell" hepsi aynı vurgu işlevini görüyor.',
  fluency_tip:'"That\'s impossible" direkt; "No way that\'s real" şaşkın tepki; "How?!" tek kelime ama çok güçlü.'
},
{
  id:73, category:'sasirma',
  tr:'Şaşırdım kaldım',
  tags:['şaşırdım','şaşkın','şaşkına döndüm','donup kaldım','dona kaldım'],
  english_primary:"I was completely taken aback",
  alternatives:["I was floored","I didn't see that coming"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Şaşırdım kaldım',tr_gloss:'I was surprised and remained',en_fragment:'taken aback',bridge_type:'transform',explanation:'Türkçe dondurulmuş/sabitlenmiş kalma; İngilizce geri itilme (aback=geriye) metaforu'}
  ],
  cultural_insight:'"Taken aback" yelken metaforundan geliyor: rüzgâr ters yönden gelip gemiyi geri iter. "Floored" ise yere serilmek gibi dramatik.',
  fluency_tip:'"That caught me off guard" (hazırlıksız yakaladı) çok pratik; "I wasn\'t expecting that" en sade.'
},
{
  id:74, category:'sasirma',
  tr:'Tam zamanında',
  tags:['tam zamanında','tam vaktinde','iyi ki geldin','tam zamanı','yerinde'],
  english_primary:"Just in the nick of time",
  alternatives:["Right on cue","Not a moment too soon"],
  register:'informal',
  bridges:[
    {tr_fragment:'Tam zamanında',tr_gloss:'exactly on time',en_fragment:'nick of time',bridge_type:'transform',explanation:'Türkçe hassas zaman eşleşmesi → İngilizce çentik metaforu (nick=küçük çentik, dar boşluk)'}
  ],
  cultural_insight:'"Nick" eski İngilizcede "anda" demekmiş. Saatin tam o noktasına gelme. Türkçe zamana odaklanıyor; İngilizce boşluk/sığınma metaforu kullanıyor.',
  fluency_tip:'"Perfect timing!" ve "You arrived just in time" en günlük ifadeler.'
},
{
  id:75, category:'sasirma',
  tr:'Gerçekten mi',
  tags:['gerçekten mi','ciddiye mi','şaka mı yapıyorsun','ciddi mi'],
  english_primary:"Are you serious?",
  alternatives:["For real?","You're not joking?"],
  register:'informal',
  bridges:[
    {tr_fragment:'Gerçekten mi',tr_gloss:'really? / truly?',en_fragment:'Are you serious?',bridge_type:'transform',explanation:'Türkçe gerçeklik sorgular (bu gerçek mi?); İngilizce kişinin niyetini/ciddiyetini sorgular'}
  ],
  cultural_insight:'Türkçe "gerçekten mi" dışsal gerçeği; İngilizce "are you serious" iç niyeti soruyor. Sonuç aynı ama çerçeve farklı.',
  fluency_tip:'"Seriously?!" tonla söylendiğinde çok güçlü; "No kidding?" (şaka etmiyor değil mi) de yaygın.'
},

/* ─── BAŞARI & BAŞARISIZLIK ─────────────────────────────────── */
{
  id:80, category:'basari',
  tr:'Başardım sonunda',
  tags:['başardım','sonunda başardım','yaptım','becerdim','hallettim'],
  english_primary:"I finally pulled it off",
  alternatives:["I did it!","I finally made it happen"],
  register:'informal',
  bridges:[
    {tr_fragment:'Başardım',tr_gloss:'I succeeded',en_fragment:'pulled it off',bridge_type:'transform',explanation:'Başarı → bir şeyi çekerek kurtarmak; zor bir şeyi başarıyla tamamlama metaforu'},
    {tr_fragment:'sonunda',tr_gloss:'finally / at the end',en_fragment:'finally',bridge_type:'direct',explanation:'Zaman belirteci doğrudan karşılık geliyor'}
  ],
  cultural_insight:'"Pull it off" başarının zor olduğunu ima eder. Sadece "I succeeded" yeterli ama renksiz. "Nailed it" (çivi çaktım) tam isabetle başarmak.',
  fluency_tip:'"I actually did it" (gerçekten yaptım) şaşkın bir başarı ifadesi; "I crushed it" çok güçlü ve modern.'
},
{
  id:81, category:'basari',
  tr:'Mahvettim her şeyi',
  tags:['mahvettim','berbat ettim','mahvettim her şeyi','alt üst ettim','mahvoldu'],
  english_primary:"I completely screwed it up",
  alternatives:["I messed everything up","I really blew it"],
  register:'informal',
  bridges:[
    {tr_fragment:'Mahvettim',tr_gloss:'I ruined / destroyed',en_fragment:'screwed it up',bridge_type:'transform',explanation:'Türkçe mahvetmek genel yıkım; İngilizce vida/vida sökme metaforu ile fiziksel bozma'}
  ],
  cultural_insight:'"Screw up" vida metaforundan geliyor. "Blow it" üfleyip dağıtmak. "Botch it" amatörce bozmak. Türkçe "mahvettim" daha dramatik ve geniş kapsamlı.',
  fluency_tip:'"That was my fault" (benim hatam) ve "I take full responsibility" daha resmi kabul ifadeleri.'
},
{
  id:82, category:'basari',
  tr:'Elinden geleni yaptı',
  tags:['elinden geleni yaptı','elinden geleni yap','çabaladı','uğraştı','çok denedi'],
  english_primary:"They gave it their all",
  alternatives:["They did their best","They went all out"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Elinden geleni',tr_gloss:'what comes from their hand',en_fragment:'their all',bridge_type:'transform',explanation:'Türkçe el metaforu (kapasitesini elleriyle veriyor); İngilizce tüm varlığı verme (all=tümü)'}
  ],
  cultural_insight:'"Gave it their all" çok yaygın ve güçlü. "Did their best" daha günlük. "Went above and beyond" ise beklentiyi aşmak için.',
  fluency_tip:'"They tried their hardest" ve "You couldn\'t ask for more" güzel takdir ifadeleri.'
},
{
  id:83, category:'basari',
  tr:'Artık yeter',
  tags:['artık yeter','yeter','bıktım','dayanamıyorum','tahammülüm kalmadı'],
  english_primary:"I've had enough",
  alternatives:["That's it, I'm done","I've reached my limit"],
  register:'informal',
  bridges:[
    {tr_fragment:'Artık',tr_gloss:'anymore / now',en_fragment:"I've had",bridge_type:'emerge',explanation:'"I\'ve had" geçmiş deneyim birikimini vurguluyor — Türkçede bu zaman boyutu gizli'},
    {tr_fragment:'yeter',tr_gloss:'enough / sufficient',en_fragment:'enough',bridge_type:'direct',explanation:'Yeterlilik ifadesi benzer'}
  ],
  cultural_insight:'"I\'ve had enough" birikmiş yorgunluğu anlatır. "That\'s it" (işte bu kadar) sınırı ilan eder. "I\'m done" ise tamamen çekilmeyi.',
  fluency_tip:'"I\'m over it" (bitirdim artık) çok modern; "I wash my hands of this" (ellerimi yıkıyorum — sorumluluk bırakmak) daha güçlü.'
},
{
  id:84, category:'basari',
  tr:'Vazgeçiyorum',
  tags:['vazgeçiyorum','vazgeçtim','bırakıyorum','bıraktım','terk ediyorum'],
  english_primary:"I'm throwing in the towel",
  alternatives:["I give up","I'm calling it quits"],
  register:'informal',
  bridges:[
    {tr_fragment:'Vazgeçiyorum',tr_gloss:"I'm letting go / releasing",en_fragment:'throwing in the towel',bridge_type:'transform',explanation:'Türkçe bırakmak → İngilizce boks havluyunu ringe atmak; pes etme ritüeli'}
  ],
  cultural_insight:'"Throwing in the towel" bokstan geliyor: antrenör havlu atar ve maçı durdurur. "I give up" daha basit ama "throwing in the towel" dramayı ve kararlılığı yansıtıyor.',
  fluency_tip:'"I\'m done trying" ve "I can\'t do this anymore" daha günlük ve duygusal.'
},
{
  id:85, category:'basari',
  tr:'İlk denemede başardım',
  tags:['ilk denemede','ilk seferde','birinci denemede','anında başardım'],
  english_primary:"I got it on the first try",
  alternatives:["I nailed it first time","First attempt, done"],
  register:'informal',
  bridges:[
    {tr_fragment:'İlk denemede',tr_gloss:'in the first attempt',en_fragment:'on the first try',bridge_type:'direct',explanation:'İlk deneme kavramı iki dilde benzer; preposition farkı var (de → on)'},
    {tr_fragment:'başardım',tr_gloss:'I succeeded',en_fragment:'I got it',bridge_type:'transform',explanation:'Başarı → elde etmek; "got it" anlamayı veya almayı da kastediyor'}
  ],
  cultural_insight:'"Nailed it" (çivi çaktım) tam, kesin başarı için. "Aced it" (as aldım) de çok yaygın. Her ikisi de ilk denemede mükemmeliyeti ima ediyor.',
  fluency_tip:'"First try" yerine "first attempt" daha resmi; "one and done" (bir ve bitti) serbest bir ifade.'
},

/* ─── GÜNLÜK HAYAT ──────────────────────────────────────────── */
{
  id:90, category:'gunluk',
  tr:'Harika bir gün geçirdim',
  tags:['harika gün','iyi gün','güzel gün','muhteşem gün','güzel geçti'],
  english_primary:"I had an amazing day",
  alternatives:["Today was absolutely brilliant","What a great day it's been"],
  register:'informal',
  bridges:[
    {tr_fragment:'Harika',tr_gloss:'wonderful / amazing',en_fragment:'amazing',bridge_type:'direct',explanation:'Pozitif sıfat benzer anlam taşıyor'},
    {tr_fragment:'gün geçirdim',tr_gloss:'I spent the day',en_fragment:'I had',bridge_type:'transform',explanation:'Türkçe günü geçirmek (harcamak); İngilizce günü sahiplenmek/almak (had)'}
  ],
  cultural_insight:'"Spent" zaman harcamak = para gibi. "Had" sahiplik. İngilizce günü bir deneyim olarak alıyor, Türkçe ise içinden geçiyor.',
  fluency_tip:'"Today was great" en sade; "I had a blast" (patlamak gibi eğlendim) çok enerjik.'
},
{
  id:91, category:'gunluk',
  tr:'Rezil bir gün geçirdim',
  tags:['rezil gün','berbat gün','kötü gün','kötü geçti','süper olmadı'],
  english_primary:"Today was an absolute nightmare",
  alternatives:["I had the worst day","Today was a disaster from start to finish"],
  register:'informal',
  bridges:[
    {tr_fragment:'Rezil',tr_gloss:'disgraceful / terrible',en_fragment:'absolute nightmare',bridge_type:'transform',explanation:'Rezil sosyal utanç içeriyor; "nightmare" (kabus) tamamen farklı bir metafor: uyku korkusu gibi korkunç'}
  ],
  cultural_insight:'"Nightmare" uyku sırasındaki korku — ama İngilizce bunu gerçek hayattaki kötü deneyimlere uyguluyor. Türkçe "rezil" utanç odaklı; İngilizce korku odaklı.',
  fluency_tip:'"Rough day" (sert/zor gün) daha hafif; "Today was a mess" (bugün bir kaos) çok doğal.'
},
{
  id:92, category:'gunluk',
  tr:'Çok eğlendim',
  tags:['çok eğlendim','eğlendim','eğlenceli','çok güldüm','güldük'],
  english_primary:"I had a blast",
  alternatives:["We had so much fun","It was an absolute riot"],
  register:'informal',
  bridges:[
    {tr_fragment:'Çok eğlendim',tr_gloss:'I had a lot of fun',en_fragment:'had a blast',bridge_type:'transform',explanation:'Eğlenmek → patlama (blast=patlama); eğlencenin şiddeti patlayıcı olarak anlatılıyor'}
  ],
  cultural_insight:'"Blast" patlayıcı metafor. "Riot" isyan; eğlence o kadar büyük ki kontrol kayboldu. "We killed it" (öldürdük) başarılı performans için de kullanılıyor.',
  fluency_tip:'"That was so much fun" sade ve etkili; "I haven\'t laughed that hard in ages" çok duygusal.'
},
{
  id:93, category:'gunluk',
  tr:'Geçmiş olsun',
  tags:['geçmiş olsun','iyi olursun','çabuk iyileş','şifalar'],
  english_primary:"Get well soon",
  alternatives:["I hope you feel better","Take care of yourself"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Geçmiş olsun',tr_gloss:'may it pass / let it pass',en_fragment:'get well',bridge_type:'transform',explanation:'Türkçe hastalığın geçmesini dilemek (pasif, zaman içinde geçer); İngilizce iyileşme eylemini vurguluyor (get well = iyileş)'}
  ],
  cultural_insight:'Türkçe "geçsin" zamanın şifayla gelmesini diliyor. İngilizcede aktif iyileşme beklentisi var. "I\'m sorry to hear that" Batı kültüründe empati bildirme için çok önemli.',
  fluency_tip:'"Hope you feel better soon" çok yaygın; "Sending you good vibes" (iyi enerji gönderiyorum) modern.'
},
{
  id:94, category:'gunluk',
  tr:'Kahve içelim mi',
  tags:['kahve içelim','kahve','bir içelim','buluşalım','görüşelim'],
  english_primary:"Want to grab a coffee?",
  alternatives:["Shall we catch up over coffee?","Let's get coffee sometime"],
  register:'informal',
  bridges:[
    {tr_fragment:'Kahve içelim mi',tr_gloss:'shall we drink coffee?',en_fragment:'grab a coffee',bridge_type:'transform',explanation:'Türkçe içmek (yudumlamak); İngilizce grab (yakalamak/almak) — kahve hızlı ve pratik bir şey olarak çerçeveleniyor'}
  ],
  cultural_insight:'"Grab" hız ve gündelik pratikliği anlatıyor. İngilizce kültüründe "coffee" sosyalleşme için evrensel bir davettir. "Let\'s catch up" (haberleşelim) sosyal yeniden bağlantı.',
  fluency_tip:'"Coffee?" tek kelime ama tonla çok şey anlatır; "My treat" (ben ısmarlıyorum) ekleyebilirsin.'
},
{
  id:95, category:'gunluk',
  tr:'Nasıl geçti',
  tags:['nasıl geçti','nasıldı','iyi miydi','nasıl gitti'],
  english_primary:"How did it go?",
  alternatives:["How was it?","How'd everything go?"],
  register:'informal',
  bridges:[
    {tr_fragment:'Nasıl geçti',tr_gloss:'how did it pass?',en_fragment:'how did it go?',bridge_type:'transform',explanation:'Türkçe zaman/deneyim geçiyor (pasif akış); İngilizce eylem gidiyor (go=gitmek)'}
  ],
  cultural_insight:'İngilizce "go" (gitmek) deneyimin hareket ettiğini ima ediyor. Türkçe "geçmek" zamanın akmasını. Her iki dil de tamamlanmış deneyimi soruyor ama metafor farklı.',
  fluency_tip:'"How was your day?" standart; "How did it turn out?" (nasıl sonuçlandı?) meraklı takip sorusu.'
},
{
  id:96, category:'gunluk',
  tr:'Kendine iyi bak',
  tags:['kendine iyi bak','iyi bak','sağlıklı ol','güvende kal'],
  english_primary:"Take care of yourself",
  alternatives:["Look after yourself","Stay safe"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Kendine',tr_gloss:'to yourself',en_fragment:'yourself',bridge_type:'direct',explanation:'Refleksif yapı benzer'},
    {tr_fragment:'iyi bak',tr_gloss:'look after well',en_fragment:'take care',bridge_type:'transform',explanation:'Türkçe "bakmak" (gözlemlemek/korumak); İngilizce "take care" (özen göstermek/almak) — bakım almak vs. vermek'}
  ],
  cultural_insight:'"Take care" vedalaşırken çok yaygın. "Look after yourself" biraz daha İngiliz kültürüne özgü. "Stay safe" pandemi sonrası çok popüler.',
  fluency_tip:'"Take care!" vedada tek başına yeterli ve çok doğal.'
},
{
  id:97, category:'gunluk',
  tr:'Kolay gelsin',
  tags:['kolay gelsin','iyi çalışmalar','güle güle çalış'],
  english_primary:"Good luck with it",
  alternatives:["Hope it goes smoothly","All the best with it"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Kolay gelsin',tr_gloss:'may it come easy',en_fragment:'Hope it goes smoothly',bridge_type:'transform',explanation:'Türkçe kolaylık diliyor (zorluk gelmesin); İngilizce pürüzsüz gidişini diliyor. Her ikisi de aynı niyetle farklı metafor'},
    {tr_fragment:'(yok)',tr_gloss:'(absence)',en_fragment:'Good luck',bridge_type:'emerge',explanation:'"Luck" (şans) Türkçe "kolay gelsin"de yok; İngilizce karşılığı şans kavramı ekliyor'}
  ],
  cultural_insight:'"Kolay gelsin" Türkçeye özgü güzel bir dilek. İngilizcede tam karşılığı yok. "Good luck" şansa odaklanıyor; "Hope it\'s not too bad" (çok kötü olmaz umarım) daha yakın ama garip.',
  fluency_tip:'"Hope everything goes well!" veya "Let me know how it goes" (nasıl gittiğini söyle) çok doğal.'
},
{
  id:98, category:'gunluk',
  tr:'Acelem var',
  tags:['acelem var','acele','koşuyorum','geç kalıyorum','acelem'],
  english_primary:"I'm in a rush",
  alternatives:["I'm running late","I've got to run"],
  register:'informal',
  bridges:[
    {tr_fragment:'Acelem var',tr_gloss:'I have haste',en_fragment:"I'm in a rush",bridge_type:'transform',explanation:'Türkçe acelenim var (sahiplik); İngilizce bir koşu içindeyim (hareket metaforu)'}
  ],
  cultural_insight:'"Rush" (acele koşu) hareket içeriyor. "Running late" (koşarak geç) de koşu metaforu. İngilizce aceleyi fiziksel hareketle anlatıyor; Türkçe sahiplik.',
  fluency_tip:'"Gotta run!" (koşmam lazım) çok yaygın veda; "I\'ll catch you later" (sonra görüşürüz) bununla harika gider.'
},
{
  id:99, category:'gunluk',
  tr:'Aklıma gelmedi',
  tags:['aklıma gelmedi','unuttu','hatırlamadım','düşünemedim','aklıma gelme'],
  english_primary:"It slipped my mind",
  alternatives:["I completely forgot","It didn't occur to me"],
  register:'informal',
  bridges:[
    {tr_fragment:'Aklıma gelmedi',tr_gloss:"it didn't come to my mind",en_fragment:'slipped my mind',bridge_type:'transform',explanation:'Türkçe bilgi zihne gelmiyor (yokluğu); İngilizce bilgi oradayken kayıp gidiyor (slipped=kaydı)'}
  ],
  cultural_insight:'"Slipped" kaymak — bilgi vardı ama tutamadım. Türkçe bilgi hiç gelmedi. İki farklı unutma metaforu: biri gelmiyor, biri kaçıyor.',
  fluency_tip:'"My bad, I forgot" (benim hatamdı, unutmuştum) özür için çok doğal; "It\'s been on my to-do list" (yapacaklar listesindeydi) hafif mizah içeriyor.'
},
{
  id:100, category:'gunluk',
  tr:'Merak ediyorum',
  tags:['merak ediyorum','merak','merak etti','acaba','öğrenmek istiyorum'],
  english_primary:"I'm curious about it",
  alternatives:["I wonder about it","I'd love to know"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Merak ediyorum',tr_gloss:"I'm curious / I wonder",en_fragment:"I'm curious",bridge_type:'direct',explanation:'Merak = curiosity; neredeyse birebir eşleşme'}
  ],
  cultural_insight:'"Curious" (Latince: cura=özen) bilgi için özen göstermek. "I wonder" daha spekülatif. "I\'d love to know" arzuyu vurguluyor.',
  fluency_tip:'"Just wondering..." (sadece merak ettim) kibarca soru sormaya çok uygun giriş.'
},
{
  id:101, category:'gunluk',
  tr:'Nasılsın',
  tags:['nasılsın','nasıl','naber','ne var ne yok','iyi misin'],
  english_primary:"How are you doing?",
  alternatives:["How's it going?","What's up?"],
  register:'informal',
  bridges:[
    {tr_fragment:'Nasılsın',tr_gloss:'how are you',en_fragment:'How are you doing?',bridge_type:'transform',explanation:'Türkçe durumu soruyor (nasılsın); İngilizce eylemi soruyor (ne yapıyorsun/nasıl gidiyor)'}
  ],
  cultural_insight:'"How are you?" genellikle gerçek soru değil, selamlama. "Fine, thanks" standart cevap. Türkçe "nasılsın" daha samimi merak içerebilir.',
  fluency_tip:'"What\'s new?" (ne yenilik var?), "How\'s life treating you?" (hayat nasıl gidiyor?) daha sıcak alternatifler.'
},
{
  id:102, category:'gunluk',
  tr:'Hiç beklentim yoktu',
  tags:['beklentim yoktu','beklemiyordum','sürpriz oldu','tahmin edemedim'],
  english_primary:"I had no expectations at all",
  alternatives:["I didn't see that coming","I went in with an open mind"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Hiç beklentim yoktu',tr_gloss:'I had zero expectation',en_fragment:'went in with an open mind',bridge_type:'transform',explanation:'Türkçe beklenti yokluğu → İngilizce açık fikirlilik; pasif yokluk vs. aktif açıklık'}
  ],
  cultural_insight:'"Open mind" (açık akıl) pozitif bir tutum. Türkçe beklenti yokluğu nötr. İngilizce aynı durumu olumlu bir tutum olarak çerçeveler.',
  fluency_tip:'"I was pleasantly surprised" (güzel şekilde şaşırdım) harika bir follow-up ifade.'
},

/* ─── EK GÜNLÜK İFADELER ─────────────────────────────────────── */
{
  id:110, category:'duygular',
  tr:'Neşeliydim bugün',
  tags:['neşeli','neşeliyim','keyifliyim','keyfim yerinde'],
  english_primary:"I was in a great mood today",
  alternatives:["I was feeling upbeat","I was on top of the world"],
  register:'informal',
  bridges:[
    {tr_fragment:'Neşeliyim',tr_gloss:"I'm cheerful",en_fragment:'great mood',bridge_type:'transform',explanation:'Türkçe neşe iç ses/ışık; İngilizce "mood" (hava durumu gibi) geçici durum'}
  ],
  cultural_insight:'"Mood" hava durumu gibi gelip giden bir şey. "In good spirits" içsel durum. "On top of the world" en yüksek mutluluk.',
  fluency_tip:'"I woke up on the right side of the bed" (yataktan doğru taraftan kalktım) gününün iyi başladığını anlatır.'
},
{
  id:111, category:'gunluk',
  tr:'Sıkıntı yok',
  tags:['sıkıntı yok','sorun yok','tamam','olur','evet'],
  english_primary:"No worries",
  alternatives:["No problem","All good"],
  register:'informal',
  bridges:[
    {tr_fragment:'Sıkıntı yok',tr_gloss:'there is no trouble',en_fragment:'no worries',bridge_type:'transform',explanation:'Türkçe sıkıntı (genel sorun); İngilizce worries (kaygılar) — zihinsel endişe boyutunu ekliyor'}
  ],
  cultural_insight:'"No worries" Avustralya kökenli, artık globalde çok yaygın. "No problem" Amerikan standardı. "Don\'t mention it" daha kibar.',
  fluency_tip:'"All good!" çok modern; "Don\'t sweat it" (terini dökme yani endişelenme) biraz daha Amerikan.'
},
{
  id:112, category:'yogunluk',
  tr:'Biraz nefes almam lazım',
  tags:['nefes almam lazım','biraz ara','mola','dinlenmem lazım','duraksama'],
  english_primary:"I need a breather",
  alternatives:["I need to step back","I need to take a break"],
  register:'informal',
  bridges:[
    {tr_fragment:'nefes almam lazım',tr_gloss:'I need to breathe',en_fragment:'need a breather',bridge_type:'direct',explanation:'Her iki dil de nefes metaforunu kullanıyor; "breather" kısa nefes duraklama'}
  ],
  cultural_insight:'"Breather" kısa mola için çok doğal. "Take five" (beş al) set ortamından geliyor. "Decompress" (basıncı azalt) daha zihinsel.',
  fluency_tip:'"Let\'s take a ten-minute break" somut; "I need to clear my head" (kafamı temizlemem lazım) metaforik.'
},
{
  id:113, category:'sosyal',
  tr:'Ne zamandır görüşmedik',
  tags:['ne zamandır','uzun zaman','görüşmedik','görmedin'],
  english_primary:"It's been ages",
  alternatives:["Long time no see","We haven't crossed paths in forever"],
  register:'informal',
  bridges:[
    {tr_fragment:'Ne zamandır görüşmedik',tr_gloss:"it's been so long since we met",en_fragment:"it's been ages",bridge_type:'transform',explanation:'Türkçe soru + olumsuz (ne zamandır göremiyoruz?); İngilizce çağlar (ages) = tarihsel uzunluk'}
  ],
  cultural_insight:'"Ages" (çağlar) abartılı ama çok doğal. "Long time no see" Çince yapısından gelen ilginç bir kalıp. İkisi de çok yaygın.',
  fluency_tip:'"Where have you been hiding?" (nerede saklandın?) şakacı ve samimi.'
},
{
  id:114, category:'deyimler',
  tr:'Her şeyi mahvetti',
  tags:['her şeyi mahvetti','mahvetti','berbat etti','alt üst etti','rezil etti'],
  english_primary:"They ruined everything",
  alternatives:["They threw a wrench in the works","They spoiled it for everyone"],
  register:'informal',
  bridges:[
    {tr_fragment:'Her şeyi mahvetti',tr_gloss:'ruined everything',en_fragment:'threw a wrench in the works',bridge_type:'transform',explanation:'Mahvetmek genel yıkım → makineye anahtar atmak; spesifik sabotaj metaforu'}
  ],
  cultural_insight:'"Throw a wrench in the works" (İngiltere: spanner in the works) makineye alet atmak = sistemi bozmak. Türkçeden daha spesifik ve görsel.',
  fluency_tip:'"They messed it all up" en doğrudan; "They were a loose cannon" (dizginsiz top) öngörülemeyen biri için.'
},
{
  id:115, category:'sasirma',
  tr:'Bu çok tuhaf',
  tags:['tuhaf','garip','acayip','ilginç','anlaşılmaz'],
  english_primary:"That's really bizarre",
  alternatives:["That's weird","That's out of the ordinary"],
  register:'informal',
  bridges:[
    {tr_fragment:'çok tuhaf',tr_gloss:'very strange / odd',en_fragment:'really bizarre',bridge_type:'direct',explanation:'Her iki dil de yabancılık/anormallık için benzer sıfat kullanıyor; yoğunlaştırıcılar eşleşiyor'}
  ],
  cultural_insight:'"Bizarre" Fransızcadan geliyor. "Weird" daha günlük. "Out of left field" (soldan gelen) beyzboldan — beklenmedik ve garip.',
  fluency_tip:'"That\'s odd" nötr; "That\'s out there" (çok uzakta) modern argoda çok tuhaf demek.'
},
{
  id:116, category:'basari',
  tr:'İşi bitirdim',
  tags:['işi bitirdim','hallettim','tamamladım','bitti','tamam ettim'],
  english_primary:"I wrapped it up",
  alternatives:["I got it done","I finished the job"],
  register:'informal',
  bridges:[
    {tr_fragment:'İşi bitirdim',tr_gloss:'I finished the work',en_fragment:'wrapped it up',bridge_type:'transform',explanation:'Bitirmek → sarmak/paketlemek; iş güzel bir şekilde tamamlandı ve "paketlendi" metaforu'}
  ],
  cultural_insight:'"Wrapped up" bir şeyi hediye gibi sarıp bitirmek. "Got it done" (hallettim) çok pratik. "Mission accomplished" dramatik ama eğlenceli.',
  fluency_tip:'"That\'s done and dusted" (bitti ve tuzlandı — İngiltere) veya "That\'s in the bag" (çantada keklik) çok renkli ifadeler.'
},
{
  id:117, category:'gunluk',
  tr:'Dikkatimi dağıttı',
  tags:['dikkatimi dağıttı','dikkat dağıtıcı','konsantre olamıyorum','odak'],
  english_primary:"It threw me off",
  alternatives:["It broke my concentration","It was really distracting"],
  register:'informal',
  bridges:[
    {tr_fragment:'Dikkatimi dağıttı',tr_gloss:'scattered my attention',en_fragment:'threw me off',bridge_type:'transform',explanation:'Türkçe dağıtmak (saçılma); İngilizce fırlatmak (throw off=yoldan çıkarmak)'}
  ],
  cultural_insight:'"Throw off" yoldan çıkarmak, dengesini bozmak. "Distracted" daha nötr akademik kelime. "I lost my train of thought" (düşünce trenini kaybettim) klasik bir metafor.',
  fluency_tip:'"I lost my focus" en sade; "I zoned out" (alandan çıktım) konsantrasyonu kaybetme.'
},
{
  id:118, category:'duygular',
  tr:'İçim daraldı',
  tags:['içim daraldı','bunaldım','sıkıştım','nefes alamıyorum','bunaltı'],
  english_primary:"I felt suffocated",
  alternatives:["I felt closed in","I felt overwhelmed"],
  register:'informal',
  bridges:[
    {tr_fragment:'İçim daraldı',tr_gloss:'my inside narrowed',en_fragment:'felt suffocated',bridge_type:'transform',explanation:'Türkçe iç mekan daralması (içim daraldı); İngilizce boğulma — darlık → hava yok etkisi'}
  ],
  cultural_insight:'"Suffocated" nefessiz kalmak; çok güçlü. "Claustrophobic" kapalı alan korkusu. "Trapped" tuzağa düşmüş. Türkçe "daralma" daha ince.',
  fluency_tip:'"I needed some space" (biraz alan istedim) çok yaygın; "I felt hemmed in" (etrafı çevrilmiş) de iyi.'
},
{
  id:119, category:'yorgunluk',
  tr:'Gözüm açılmıyor',
  tags:['gözüm açılmıyor','gözlerim kapanıyor','sabah','kalkmak istemiyorum','uyanamıyorum'],
  english_primary:"I can barely open my eyes",
  alternatives:["I'm not fully awake yet","I'm still half asleep"],
  register:'informal',
  bridges:[
    {tr_fragment:'Gözüm açılmıyor',tr_gloss:"my eye won't open",en_fragment:"can barely open my eyes",bridge_type:'direct',explanation:'Göz açılmama metaforu her iki dilde de benzer; Türkçe daha pasif (açılmıyor), İngilizce aktif (açamıyorum)'}
  ],
  cultural_insight:'İlginç pasif/aktif fark: Türkçede göz açılmıyor (kendiliğinden olmuyor); İngilizcede "I can\'t open them" (aktif çaba gerektiriyor).',
  fluency_tip:'"I need my coffee" veya "I\'m not a morning person" (sabahçı değilim) çok evrensel.'
},
{
  id:120, category:'sosyal',
  tr:'Çok hoş geldiniz',
  tags:['hoşgeldiniz','hoş geldin','buyurun','bekleriz','memnun olduk'],
  english_primary:"Welcome, so glad you're here",
  alternatives:["Great to have you","Come on in"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Çok hoş geldiniz',tr_gloss:'you came very pleasantly',en_fragment:'so glad you\'re here',bridge_type:'transform',explanation:'Türkçe hoşluk gelen kişide; İngilizce sevinç onu karşılayanda — bakış açısı tersine dönüyor'}
  ],
  cultural_insight:'Türkçe "hoş geldiniz" misafirin gelişi güzel (hoş=güzel). İngilizce "welcome" karşılama eylemi. Bakış açısı tam ters: misafir güzel mi geldi, yoksa ev sahibi memnun mu?',
  fluency_tip:'"Make yourself at home" (kendinizi evde hissettirin) ev sıcaklığını en iyi anlatan ifade.'
},

/* ─── EKSTRA DEYİMLER & KALIPLAR ─────────────────────────────── */
{
  id:130, category:'deyimler',
  tr:'Ağzından bal damlıyor',
  tags:['ağzından bal damlıyor','çok tatlı konuşuyor','dili tatlı','ikiyüzlü','yağcılık'],
  english_primary:"They could charm the birds off the trees",
  alternatives:["They have a silver tongue","They're incredibly smooth-talking"],
  register:'informal',
  bridges:[
    {tr_fragment:'Ağzından bal damlıyor',tr_gloss:'honey drips from their mouth',en_fragment:'silver tongue',bridge_type:'transform',explanation:'Türkçe ağızdan tatlı sıvı akar; İngilizce dil değerli metalden (gümüş) — ikisi de dil güzelliği ama farklı metafor'}
  ],
  cultural_insight:'Türkçe bal (doğal tatlılık); İngilizce gümüş (değerli ve parlak ama yapay). Türkçe daha güvenilir; İngilizce biraz manipülatif ima taşıyabilir.',
  fluency_tip:'"They could sell ice to an Eskimo" (Eskimo\'ya buz satar) çok abartılı ikna gücü için.'
},
{
  id:131, category:'deyimler',
  tr:'Taşın altına elini koyamıyor',
  tags:['taşın altına','sorumluluk almıyor','üstüne yıkıyor','kaçınıyor','sorumsuz'],
  english_primary:"They won't step up",
  alternatives:["They dodge responsibility","They always pass the buck"],
  register:'informal',
  bridges:[
    {tr_fragment:'Taşın altına elini koyamıyor',tr_gloss:"can't put their hand under the stone",en_fragment:'pass the buck',bridge_type:'transform',explanation:'Türkçe fiziksel ağırlık taşımak (el altında); İngilizce kova (buck) geçirmek — sorumluluk transfer metaforu'}
  ],
  cultural_insight:'"Pass the buck" poker oynamaktan geliyor: dealer pozisyonunu bir sonrakine geçirmek. "Buck stops here" (kova burada duruyor) sorumluluk almak demek.',
  fluency_tip:'"They never own up to anything" (hiçbir şeyin sahibi olmuyor) çok işlevsel.'
},
{
  id:132, category:'deyimler',
  tr:'Gemisini yürütüyor',
  tags:['gemisini yürütüyor','işini çeviriyor','idare ediyor','geçiniyor','hayatı idare ediyor'],
  english_primary:"They're keeping things afloat",
  alternatives:["They're managing","They're making it work"],
  register:'neutral',
  bridges:[
    {tr_fragment:'Gemisini yürütüyor',tr_gloss:'sailing their own ship',en_fragment:'keeping afloat',bridge_type:'direct',explanation:'Her iki dil de gemi/su metaforunu kullanıyor! Türkçe gemi yürüyor; İngilizce su üstünde kalmak'}
  ],
  cultural_insight:'Hem Türkçe hem İngilizce gemi metaforu kullanıyor — ama farklı yön. Türkçe gemi hareket ediyor (aktif); İngilizce gemi batmıyor (savunma). İki kültür aynı denizi farklı görüyor.',
  fluency_tip:'"Treading water" (suda tepinerek ilerlemek) de benzer; "Just getting by" (zar zor geçinmek) daha somut.'
},
{
  id:133, category:'sosyal',
  tr:'Yüz vermemek',
  tags:['yüz vermemek','cesaretlendirmemek','sınır koy','ciddiye alma'],
  english_primary:"Don't encourage them",
  alternatives:["Don't give them an inch","Set limits with them"],
  register:'informal',
  bridges:[
    {tr_fragment:'Yüz vermemek',tr_gloss:"not giving face / not showing face",en_fragment:"don't give them an inch",bridge_type:'transform',explanation:'Türkçe yüz (onur/izin verme metaforu); İngilizce inç (küçük ödün vermeme; eğer bir inç verirsen bir mil alır)'}
  ],
  cultural_insight:'"Give an inch, take a mile" (bir inç ver, mil al) tam atasözü. Türkçe yüz verme daha kişisel ilgi/onay alanında.',
  fluency_tip:'"Don\'t let them walk all over you" (seni yerde sürüklettirme) daha güçlü versiyon.'
},
{
  id:134, category:'gunluk',
  tr:'Kafayı yiyor musun',
  tags:['kafayı yiyor','deli misin','aklın mı yok','ne yapıyorsun','saçmalık'],
  english_primary:"Have you lost your mind?",
  alternatives:["Are you crazy?","What are you thinking?"],
  register:'informal',
  bridges:[
    {tr_fragment:'Kafayı yiyor musun',tr_gloss:'are you eating the head?',en_fragment:'lost your mind',bridge_type:'transform',explanation:'Türkçe kafayı yemek (garip yiyecek metaforu); İngilizce aklı kaybetmek (kayıp metaforu)'}
  ],
  cultural_insight:'"Kafayı yemek" çok özgün Türkçe metafor — aklı yiyip bitirmek. İngilizce "lost your mind" ya da "gone off the deep end" (derin uca atladı) alternatifleri var.',
  fluency_tip:'"What were you thinking?" (ne düşünüyordun?) hem suçlama hem merak ifadesi.'
},
{
  id:135, category:'duygular',
  tr:'İçim geçmiyor',
  tags:['içim geçmiyor','gönlüm razı değil','vicdanim rahat değil','zoruma gidiyor'],
  english_primary:"I can't bring myself to do it",
  alternatives:["My heart isn't in it","I feel uneasy about it"],
  register:'neutral',
  bridges:[
    {tr_fragment:'İçim geçmiyor',tr_gloss:"my inside doesn't pass",en_fragment:"can't bring myself",bridge_type:'transform',explanation:'Türkçe iç/ruh geçmiyor (onay vermiyor); İngilizce kendini bir yere getirememe (active self-direction)'}
  ],
  cultural_insight:'"Bring myself" aktif bir çaba ve başarısızlık. Türkçe "içim geçmemek" daha pasif — içinden gelmiyor. "My conscience won\'t allow it" daha dramatik.',
  fluency_tip:'"I don\'t have the heart for it" (bunun için kalbim yok) çok güzel eşdeğer.'
},
];

/* ─── EŞLEŞME MOTORU ─────────────────────────────────────────── */
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
