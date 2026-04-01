/**
 * Story generator - computes start_index/end_index automatically from surface_form.
 * Run: node scripts/gen_10_stories.js > js/stories-data.js
 *
 * KURAL — Fiil + Zarf / Bağlamlı Birleşik Yapılar:
 *   "cried quietly", "spread quickly", "talked freely" gibi fiil+zarf birleşimleri
 *   hem bütün olarak annotate edilir (birleşik anlam),
 *   hem de individual_meanings[] dizisiyle kelime kelime açıklanır.
 *   Böylece öğrenci hem toplam ifadeyi hem her kelimeyi öğrenir.
 */

function ann(text, specs) {
  return specs.map(s => {
    const occ = s.occ || 1;
    let count = 0, idx = 0, found = -1;
    while (idx <= text.length - s.surface.length) {
      const pos = text.indexOf(s.surface, idx);
      if (pos === -1) break;
      count++;
      if (count === occ) { found = pos; break; }
      idx = pos + 1;
    }
    if (found === -1) {
      process.stderr.write(`NOT FOUND: "${s.surface}"\n`);
      return null;
    }
    const obj = {
      start_index: found,
      end_index: found + s.surface.length,
      surface_form: s.surface,
      lemma: s.lemma || null,
      pos: s.pos,
      annotation_type: s.type,
      contextual_turkish_meaning: s.tr,
      short_explanation_tr: s.expl,
      example_sentence_en: s.ex_en,
      example_sentence_tr: s.ex_tr
    };
    if (s.spans) obj.spans = s.spans;
    if (s.individuals) obj.individual_meanings = s.individuals;
    return obj;
  }).filter(Boolean);
}

const stories = [

  // ─── KOLAY 1 ────────────────────────────────────────────────
  {
    id: "s_001",
    title: "A New School",
    level: "Kolay",
    _text: "Tom started at a new school last Monday. He felt very nervous on his first day. His classroom was on the second floor of a big building. The teacher, who was very kind, welcomed everyone with a big smile. She asked the students to introduce themselves one by one. Tom stood up and said his name clearly. After the lesson, a boy named Sam came over and asked if he wanted to play football. Tom said yes without thinking twice. They played together until the bell rang. When they walked back inside, they were already laughing like old friends. Tom went home that evening feeling much happier than before. He could not wait to go back to school the next day.",
    get annotations() {
      return ann(this._text, [
        { surface: "felt very nervous", pos: "VERB", type: "grammar_structure", lemma: "feel",
          tr: "çok gergin hissetti",
          expl: "'felt', 'feel' fiilinin geçmiş biçimidir. 'very nervous' ile birlikte o anki yoğun duyguyu aktarır.",
          ex_en: "She felt very nervous before the exam.", ex_tr: "Sınavdan önce çok gergin hissetti." },
        { surface: "who was very kind", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "çok nazik olan (öğretmen)",
          expl: "'who' burada öğretmeni niteleyen bir sıfat cümleciği başlatır.",
          ex_en: "The nurse who was very kind helped me.", ex_tr: "Çok nazik olan hemşire bana yardım etti." },
        { surface: "welcomed everyone", pos: "VERB", type: "collocation", lemma: "welcome",
          tr: "herkesi sıcaklıkla karşıladı",
          expl: "'welcomed' geçmiş zamandır. 'welcome everyone' = herkese resmi ve samimi bir karşılama yapmak.",
          ex_en: "The host welcomed everyone at the door.", ex_tr: "Ev sahibi kapıda herkesi karşıladı." },
        { surface: "introduce themselves", pos: "VERB", type: "collocation", lemma: "introduce",
          tr: "kendilerini tanıtmak",
          expl: "Reflexive yapı. 'themselves' öğrencilerin kendi kendilerini tanıtacağını vurgular.",
          ex_en: "Please introduce yourselves to the group.", ex_tr: "Lütfen gruba kendinizi tanıtın." },
        { surface: "stood up", pos: "VERB", type: "phrasal_verb", lemma: "stand up",
          tr: "ayağa kalktı",
          expl: "'stand up': oturduğu ya da durduğu yerden kalkmak. 'stood' geçmiş biçimidir.",
          ex_en: "He stood up when his name was called.", ex_tr: "Adı çağrılınca ayağa kalktı." },
        { surface: "said his name clearly", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "ismini açıkça / net bir sesle söyledi",
          expl: "Fiil + zarf birleşimi. 'clearly' eylemin nasıl gerçekleştiğini gösterir: tereddütsüz, anlaşılır biçimde.",
          ex_en: "She said her name clearly so everyone could hear.", ex_tr: "Herkes duyabilsin diye ismini net bir şekilde söyledi.",
          individuals: [
            { word: "said", meaning: "söyledi", note: "'say' fiilinin geçmiş biçimi" },
            { word: "clearly", meaning: "açıkça / anlaşılır biçimde", note: "Eylemin nasıl yapıldığını gösteren zarf" }
          ]},
        { surface: "came over", pos: "VERB", type: "phrasal_verb", lemma: "come over",
          tr: "yanına geldi",
          expl: "'come over' = birisinin bulunduğu yere doğru gelmek.",
          ex_en: "She came over to say hello.", ex_tr: "Merhaba demek için yanıma geldi." },
        { surface: "without thinking twice", pos: "ADV", type: "idiom", lemma: null,
          tr: "hiç tereddüt etmeden / anında",
          expl: "Deyimsel ifade. İki kez düşünmeye gerek kalmadan, hemen ve kararsızlık göstermeden.",
          ex_en: "She accepted the offer without thinking twice.", ex_tr: "Teklifi hiç düşünmeden kabul etti." },
        { surface: "walked back inside", pos: "VERB", type: "phrasal_verb", lemma: "walk back inside",
          tr: "içeri geri döndüler",
          expl: "'walk back' = geri yürümek; 'inside' iç mekâna girişi pekiştirir.",
          ex_en: "We walked back inside after the break.", ex_tr: "Moladan sonra içeri geri döndük." },
        { surface: "much happier than before", pos: "ADJ", type: "grammar_structure", lemma: null,
          tr: "öncesinden çok daha mutlu",
          expl: "Comparative yapı. 'much' karşılaştırmayı güçlendirir; 'than before' önceki hâlle kıyaslar.",
          ex_en: "He looks much happier than before.", ex_tr: "Öncesinden çok daha mutlu görünüyor." },
        { surface: "could not wait", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "sabırsızlanıyordu / dört gözle bekliyordu",
          expl: "'could not wait' kalıbı: bir şeyi yapmak için çok heyecanlı olmak, sabırsızlanmak.",
          ex_en: "I could not wait to see her again.", ex_tr: "Onu tekrar görmek için sabırsızlanıyordum." },
      ]);
    }
  },

  // ─── KOLAY 2 ────────────────────────────────────────────────
  {
    id: "s_002",
    title: "A Rainy Afternoon",
    level: "Kolay",
    _text: "It was raining heavily outside, so Anna decided to stay at home. She looked out of the window and watched the raindrops run down the glass. She made herself a cup of tea and sat down on the sofa. She picked up her favourite book and started reading. The story was about a girl who lived alone in a lighthouse. Anna felt so absorbed in the book that she forgot about everything else. When her mother called her for dinner, she did not hear it at first. Her mother had to call her name three times before she finally looked up. Anna put her book down and went to the kitchen. The food smelled delicious and she was very hungry by then. After dinner, she helped her mother wash the dishes. That evening, they watched an old film together and laughed a lot.",
    get annotations() {
      return ann(this._text, [
        { surface: "raining heavily", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "şiddetli yağmur yağıyordu",
          expl: "Fiil + zarf birleşimi. 'raining' devamlı eylemi, 'heavily' yoğunluğu gösterir. İkisi birlikte kuvvetli bir yağışı anlatır.",
          ex_en: "It was raining heavily all night.", ex_tr: "Bütün gece şiddetli yağmur yağıyordu.",
          individuals: [
            { word: "raining", meaning: "yağmur yağıyor", note: "Present Continuous; süregelen hava durumu" },
            { word: "heavily", meaning: "şiddetli biçimde / yoğun olarak", note: "Eylemin yoğunluğunu gösteren zarf" }
          ]},
        { surface: "stay at home", pos: "VERB", type: "collocation", lemma: "stay",
          tr: "evde kalmak",
          expl: "Sık kullanılan kalıp. 'stay at home' = dışarı çıkmayıp evde vakit geçirmek.",
          ex_en: "I decided to stay at home and rest.", ex_tr: "Evde kalıp dinlenmeye karar verdim." },
        { surface: "looked out of the window", pos: "VERB", type: "phrasal_verb", lemma: "look out of",
          tr: "pencereden dışarı baktı",
          expl: "'look out of' = bir açıklıktan dışarıya bakmak.",
          ex_en: "She looked out of the window at the snow.", ex_tr: "Pencereden dışarıdaki kara baktı." },
        { surface: "made herself a cup of tea", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "kendine bir fincan çay yaptı",
          expl: "Reflexive yapı: 'herself' eylemi kendi için yaptığını gösterir. 'a cup of tea' standart içecek ifadesi.",
          ex_en: "He made himself a sandwich.", ex_tr: "Kendine bir sandviç yaptı." },
        { surface: "sat down", pos: "VERB", type: "phrasal_verb", lemma: "sit down",
          tr: "oturdu",
          expl: "'sit down': bir yere oturmak eylemini tamamlanmış olarak ifade eder.",
          ex_en: "Please sit down and make yourself comfortable.", ex_tr: "Lütfen oturun ve rahat edin." },
        { surface: "picked up", pos: "VERB", type: "phrasal_verb", lemma: "pick up",
          tr: "aldı / elinden tuttu",
          expl: "'pick up': bir nesneyi yerden ya da bir yerden alıp eline geçirmek.",
          ex_en: "She picked up the pen from the floor.", ex_tr: "Kalemi yerden aldı." },
        { surface: "who lived alone in a lighthouse", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "bir deniz fenerinde yalnız yaşayan (kız)",
          expl: "'who' kız hakkında ek bilgi verir. 'alone' = yalnız başına; 'lighthouse' = deniz feneri.",
          ex_en: "The boy who lived alone was very brave.", ex_tr: "Yalnız yaşayan çocuk çok cesurdu." },
        { surface: "absorbed in the book", pos: "ADJ", type: "word", lemma: "absorbed",
          tr: "kitaba dalmış / kendini kaptırmış",
          expl: "'absorbed in' = bir şeye o kadar konsantre olmak ki çevreden habersiz kalmak.",
          ex_en: "He was completely absorbed in his work.", ex_tr: "İşine tamamen dalmıştı." },
        { surface: "had to call", pos: "VERB", type: "grammar_structure", lemma: "have to",
          tr: "çağırmak zorunda kaldı",
          expl: "'had to' = geçmişteki zorunluluk. Başka seçenek olmadığı için yapmak durumunda kalmak.",
          ex_en: "I had to wait for an hour.", ex_tr: "Bir saat beklemek zorunda kaldım." },
        { surface: "smelled delicious", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "nefis kokuyordu",
          expl: "Bağlaç fiil (linking verb) + sıfat. 'smelled' duyuyu aktarır; 'delicious' onu niteler. Eylem değil, durum ifade eder.",
          ex_en: "The soup smelled delicious.", ex_tr: "Çorba nefis kokuyordu.",
          individuals: [
            { word: "smelled", meaning: "kokuyordu", note: "'smell' linking verb olarak kullanılmış; eylem değil durum" },
            { word: "delicious", meaning: "nefis / iştah açıcı", note: "Yiyecek/içecek için kullanılan sıfat" }
          ]},
        { surface: "put her book down", pos: "VERB", type: "phrasal_verb", lemma: "put down",
          tr: "kitabını bıraktı / elindeki kitabı yere koydu",
          expl: "Split phrasal verb: 'put ... down' = elindeki nesneyi bırakmak. Nesne aradaki konuma girmiş.",
          ex_en: "She put the newspaper down and looked at me.", ex_tr: "Gazeteyi bırakıp bana baktı." },
        { surface: "wash the dishes", pos: "VERB", type: "collocation", lemma: "wash",
          tr: "bulaşıkları yıkamak",
          expl: "Yerleşik standart ifade. 'do the dishes' ile eş anlamlıdır.",
          ex_en: "Can you wash the dishes after dinner?", ex_tr: "Yemekten sonra bulaşıkları yıkayabilir misin?" },
      ]);
    }
  },

  // ─── KOLAY 3 ────────────────────────────────────────────────
  {
    id: "s_003",
    title: "My First Bicycle",
    level: "Kolay",
    _text: "On my eighth birthday, my parents gave me a red bicycle as a gift. I was so excited that I could not sleep the night before. The next morning, my father took me to the park to teach me how to ride it. At first, I kept falling off and hurting my knees. My father held the back of the bicycle to help me balance. After trying many times, I finally managed to ride on my own. I felt like I was flying. My father let go of the bicycle without telling me. When I looked back and saw that he was not holding it, I nearly fell. But I kept going and did not stop. That day, I learned that making mistakes is part of learning. I still have that red bicycle in the garden.",
    get annotations() {
      return ann(this._text, [
        { surface: "gave me a red bicycle as a gift", pos: "VERB", type: "collocation", lemma: "give",
          tr: "bana kırmızı bir bisiklet hediye etti",
          expl: "'give ... as a gift' = bir şeyi hediye olarak vermek. 'gave' geçmiş biçimidir.",
          ex_en: "She gave him a book as a gift.", ex_tr: "Ona hediye olarak bir kitap verdi." },
        { surface: "could not sleep", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "uyuyamadı",
          expl: "'could not' = geçmişte yapılamamış eylem. Heyecandan uyuma imkânı yoktu.",
          ex_en: "He could not sleep because of the noise.", ex_tr: "Gürültü yüzünden uyuyamadı." },
        { surface: "kept falling off", pos: "VERB", type: "grammar_structure", lemma: "keep",
          tr: "düşmeye devam etti / bir türlü düşmekten kurtulamadı",
          expl: "'keep + gerund' = bir eylemi defalarca yapmak ya da durdurmakta güçlük çekmek.",
          ex_en: "She kept making the same mistake.", ex_tr: "Aynı hatayı yapmaya devam etti." },
        { surface: "help me balance", pos: "VERB", type: "grammar_structure", lemma: "help",
          tr: "dengeyi sağlamama yardımcı olmak",
          expl: "'help + object + bare infinitive': İngilizcede 'help' sonrasında to'suz mastar kullanımı yaygındır.",
          ex_en: "Can you help me carry this box?", ex_tr: "Bu kutuyu taşımama yardım eder misin?" },
        { surface: "managed to ride on my own", pos: "VERB", type: "grammar_structure", lemma: "manage to",
          tr: "kendi başıma sürebildim",
          expl: "'manage to' = güçlüğe rağmen bir şeyi başarmak. 'on my own' = yardımsız, tek başına.",
          ex_en: "She managed to finish the project on time.", ex_tr: "Projeyi zamanında bitirmeyi başardı." },
        { surface: "let go of the bicycle", pos: "VERB", type: "phrasal_verb", lemma: "let go of",
          tr: "bisikleti bıraktı / elini çekti",
          expl: "'let go of' = tuttuğu bir şeyi serbest bırakmak, elini çekmek.",
          ex_en: "He let go of the rope and fell.", ex_tr: "İpi bıraktı ve düştü." },
        { surface: "without telling me", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "bana söylemeden / haber vermeksizin",
          expl: "'without + gerund' = bir eylem yapılmadan önce başka bir eylemin gerçekleşmediğini gösterir.",
          ex_en: "She left without saying goodbye.", ex_tr: "Vedalaşmadan ayrıldı." },
        { surface: "looked back", pos: "VERB", type: "phrasal_verb", lemma: "look back",
          tr: "arkasına baktı",
          expl: "'look back' = arkaya, geride kalan yöne bakmak.",
          ex_en: "He looked back and waved.", ex_tr: "Arkasına bakıp el salladı." },
        { surface: "nearly fell", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "neredeyse düştü",
          expl: "Zarf + fiil birleşimi. 'nearly' eylemin gerçekleşmeye çok yaklaştığını ama olmadığını gösterir.",
          ex_en: "She nearly fell on the ice.", ex_tr: "Buzda neredeyse düşüyordu.",
          individuals: [
            { word: "nearly", meaning: "neredeyse / az kalsın", note: "Eylemin çok az farkla gerçekleşmediğini gösteren zarf" },
            { word: "fell", meaning: "düştü", note: "'fall' fiilinin geçmiş biçimi" }
          ]},
        { surface: "kept going", pos: "VERB", type: "grammar_structure", lemma: "keep going",
          tr: "gitmeye devam etti / durmadı",
          expl: "'keep going' = durmayarak devam etmek.",
          ex_en: "Despite the rain, they kept going.", ex_tr: "Yağmura rağmen devam ettiler." },
        { surface: "making mistakes is part of learning", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "hata yapmak öğrenmenin bir parçasıdır",
          expl: "Gerund'ün özne olarak kullanımı: 'making mistakes' cümlenin öznesidir.",
          ex_en: "Asking questions is part of understanding.", ex_tr: "Soru sormak anlamanın bir parçasıdır." },
      ]);
    }
  },

  // ─── ORTA 1 ─────────────────────────────────────────────────
  {
    id: "s_004",
    title: "The Unexpected Visitor",
    level: "Orta",
    _text: "Maya was just about to leave for work when the doorbell rang. She opened the door and found her old friend Leila standing there with two heavy bags. They had not seen each other for nearly three years. Maya could not believe her eyes. She gave Leila a big hug and pulled her inside immediately. Leila explained that she had been travelling in Southeast Asia for months and had decided to stop by on her way back. Maya put the kettle on and they sat down at the kitchen table. They talked for hours, catching up on everything they had missed. Leila told Maya about the places she had visited and the people she had met. Maya listened carefully, asking questions whenever she wanted to know more. At some point, Maya realised she had completely forgotten about work. She sent a quick message to her manager saying she would not be coming in. Her manager, who was usually quite strict, replied that it was fine just this once. That afternoon, they cooked a meal together and shared stories late into the evening. Leila stayed for three nights in the end, and when she finally left, Maya felt that something important had been restored between them.",
    get annotations() {
      return ann(this._text, [
        { surface: "was just about to leave", pos: "VERB", type: "grammar_structure", lemma: "be about to",
          tr: "tam işe gitmek üzereydi",
          expl: "'be about to + infinitive' = bir eylem yapmak üzere olan, tam o anda gerçekleşmesine çok az kalan.",
          ex_en: "I was about to call you.", ex_tr: "Tam seni arayacaktım." },
        { surface: "could not believe her eyes", pos: "VERB", type: "idiom", lemma: null,
          tr: "gözlerine inanamadı",
          expl: "Deyim. Beklenmedik bir şey karşısında çok şaşırmak.",
          ex_en: "She could not believe her eyes when she saw the prize.", ex_tr: "Ödülü görünce gözlerine inanamadı." },
        { surface: "pulled her inside", pos: "VERB", type: "phrasal_verb", lemma: "pull inside",
          tr: "onu içeri çekti",
          expl: "'pull inside' = birini dışarıdan içeriye doğru çekmek. Burada sıcak karşılama jesti.",
          ex_en: "He pulled her inside out of the rain.", ex_tr: "Onu yağmurdan korumak için içeri çekti." },
        { surface: "had been travelling", pos: "VERB", type: "grammar_structure", lemma: "travel",
          tr: "seyahat etmekteydi / aylarca seyahat etmişti",
          expl: "Past Perfect Continuous: geçmişte belirli bir noktadan önce başlayıp süren eylem.",
          ex_en: "She had been working there for five years.", ex_tr: "Beş yıldır orada çalışmaktaydı." },
        { surface: "stop by", pos: "VERB", type: "phrasal_verb", lemma: "stop by",
          tr: "uğramak / kısa bir ziyaret yapmak",
          expl: "'stop by' = yolunun üzerinde kısa bir ziyaret yapmak, uğramak.",
          ex_en: "Can you stop by the office later?", ex_tr: "Daha sonra ofise uğrayabilir misin?" },
        { surface: "put the kettle on", pos: "VERB", type: "idiom", lemma: "put the kettle on",
          tr: "çay/kahve için su ısıtmaya başladı",
          expl: "İngiliz kültürüne özgü deyimsel kullanım. Kettleı ocağa koymak = misafir için sıcak içecek hazırlamak.",
          ex_en: "Shall I put the kettle on?", ex_tr: "Bir çay koyayım mı?" },
        { surface: "catching up on", pos: "VERB", type: "phrasal_verb", lemma: "catch up on",
          tr: "kaçırdıklarını telafi etmek / haberleşmek",
          expl: "'catch up on' = uzun süredir öğrenilemeyen ya da yaşanmayan şeyleri birlikte konuşarak tamamlamak.",
          ex_en: "We spent hours catching up on old times.", ex_tr: "Eski günleri konuşarak saatler geçirdik." },
        { surface: "listened carefully", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "dikkatle / dikkatlice dinledi",
          expl: "Fiil + zarf birleşimi. 'carefully' dinlemenin kalitesini gösterir: her ayrıntıya önem vererek.",
          ex_en: "She listened carefully to every word.", ex_tr: "Her kelimeyi dikkatlice dinledi.",
          individuals: [
            { word: "listened", meaning: "dinledi", note: "'listen' fiilinin geçmiş biçimi; dikkatli ve kasıtlı dinleme" },
            { word: "carefully", meaning: "dikkatlice / özenle", note: "Eylemin nasıl yapıldığını gösteren zarf" }
          ]},
        { surface: "had completely forgotten about work", pos: "VERB", type: "grammar_structure", lemma: "forget",
          tr: "işi tamamen unutmuştu",
          expl: "Past Perfect: fark etme anından önce unutmanın gerçekleştiğini gösterir.",
          ex_en: "She had forgotten about the meeting.", ex_tr: "Toplantıyı unutmuştu." },
        { surface: "coming in", pos: "VERB", type: "phrasal_verb", lemma: "come in",
          tr: "işe gelmek",
          expl: "'come in' = işyerine / bir mekâna gelmek. Burada işe gelmemek anlamındadır.",
          ex_en: "I won't be coming in tomorrow.", ex_tr: "Yarın işe gelmeyeceğim." },
        { surface: "who was usually quite strict", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "genellikle oldukça katı olan (müdürü)",
          expl: "'who' müdürü niteler. 'usually' genel alışkanlığı, 'quite strict' ise katılık derecesini gösterir.",
          ex_en: "The boss, who was quite strict, agreed.", ex_tr: "Oldukça katı olan patron kabul etti." },
        { surface: "just this once", pos: "ADV", type: "idiom", lemma: null,
          tr: "sadece bu sefer / bu kez istisna olarak",
          expl: "Deyimsel ifade. Normalde yapılmayan bir şeye yalnızca bu kez izin verildiğini vurgular.",
          ex_en: "I'll let it go just this once.", ex_tr: "Sadece bu sefer görmezden geleceğim." },
        { surface: "late into the evening", pos: "ADV", type: "collocation", lemma: null,
          tr: "akşamın geç saatlerine kadar",
          expl: "'late into the evening/night' = gece ya da akşamın oldukça geç saatlerine dek süren eylem.",
          ex_en: "They danced late into the night.", ex_tr: "Gecenin geç saatlerine kadar dans ettiler." },
        { surface: "in the end", pos: "ADV", type: "idiom", lemma: null,
          tr: "sonunda / nihayetinde",
          expl: "'in the end' = sonuç olarak, her şey bittiğinde.",
          ex_en: "In the end, everything worked out fine.", ex_tr: "Sonunda her şey yoluna girdi." },
        { surface: "had been restored", pos: "VERB", type: "grammar_structure", lemma: "restore",
          tr: "yeniden kurulmuştu / onarılmıştı",
          expl: "Past Perfect Passive: 'restore' edilmek. Aralarındaki bağın yeniden sağlandığını pasif yapıyla anlatır.",
          ex_en: "Trust had been restored between them.", ex_tr: "Aralarındaki güven yeniden sağlanmıştı." },
      ]);
    }
  },

  // ─── ORTA 2 ─────────────────────────────────────────────────
  {
    id: "s_005",
    title: "The Decision",
    level: "Orta",
    _text: "For weeks, Kemal had been trying to make up his mind about whether to accept the job offer. The new position paid much better than his current one, but it required him to move to another city. He talked it over with his wife, who understood how difficult the decision was. She told him that she would support whatever he decided, but she also admitted that leaving their hometown would not be easy. Kemal made a list of the advantages and disadvantages to help him think more clearly. He also called his mentor, a man he had known since university, to ask for advice. His mentor told him that opportunities like this did not come along very often and that he should not let fear stop him from moving forward. Kemal sat with the idea for another few days. He found himself imagining what life in the new city might be like. One morning, he woke up and simply knew what he wanted to do. He called the company and told them he was ready to accept. When he broke the news to his family, his children took it surprisingly well. His daughter, who was twelve at the time, said she was looking forward to making new friends. By the end of the week, Kemal had already started to look for a flat in the new city. He knew the road ahead would be hard, but he felt at peace with his choice for the first time in months.",
    get annotations() {
      return ann(this._text, [
        { surface: "make up his mind", pos: "VERB", type: "idiom", lemma: "make up one's mind",
          tr: "karar vermek / kafasında karara varmak",
          expl: "Deyim. Uzun süre düşündükten sonra bir karara ulaşmak.",
          ex_en: "Have you made up your mind yet?", ex_tr: "Henüz karar verdin mi?" },
        { surface: "paid much better than", pos: "VERB", type: "grammar_structure", lemma: "pay",
          tr: "çok daha iyi maaş ödüyordu",
          expl: "Comparative + 'much' güçlendirici. 'paid' burada ücret anlamıyla geçmiş zamanda.",
          ex_en: "This job paid much better than the last.", ex_tr: "Bu iş bir öncekinden çok daha iyi ödüyordu." },
        { surface: "talked it over with", pos: "VERB", type: "phrasal_verb", lemma: "talk over",
          tr: "onunla konuşup tartıştı / enine boyuna değerlendirdi",
          expl: "Split phrasal verb: 'talk ... over with' = bir konuyu birileriyle ayrıntılı şekilde konuşmak.",
          ex_en: "We talked it over with the whole team.", ex_tr: "Bütün ekiple enine boyuna konuştuk." },
        { surface: "who understood how difficult the decision was", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "kararın ne kadar zor olduğunu anlayan (eşi)",
          expl: "'who' eşini niteleyen relative clause. 'how difficult' dolaylı soru yapısıdır.",
          ex_en: "She was a friend who understood everything.", ex_tr: "Her şeyi anlayan bir arkadaştı." },
        { surface: "admitted that", pos: "VERB", type: "word", lemma: "admit",
          tr: "itiraf etti / kabul etti",
          expl: "'admit' = hoş olmayan bir gerçeği kabullenmek ya da söylemek.",
          ex_en: "He admitted that it would be hard.", ex_tr: "Bunun zor olacağını kabul etti." },
        { surface: "come along", pos: "VERB", type: "phrasal_verb", lemma: "come along",
          tr: "ortaya çıkmak / yolu düşmek",
          expl: "'come along' = bir fırsatın kendiliğinden ortaya çıkması.",
          ex_en: "Chances like this don't come along often.", ex_tr: "Bu türden fırsatlar sık sık çıkmaz." },
        { surface: "let fear stop him from moving forward", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "korkunun onu ilerlemekten alıkoymasına izin vermemeli",
          expl: "'let + nesne + bare infinitive + from + gerund': yapı izin/sebep olma anlamı taşır.",
          ex_en: "Don't let doubt stop you from trying.", ex_tr: "Şüphenin seni denemekten alıkoymasına izin verme." },
        { surface: "found himself imagining", pos: "VERB", type: "grammar_structure", lemma: "find oneself",
          tr: "farkında olmadan hayal ettiğini fark etti",
          expl: "'find oneself + gerund' = kişinin kasıtsız olarak kendini bir eylem içinde bulması.",
          ex_en: "I found myself smiling without knowing why.", ex_tr: "Neden olduğunu bilmeden gülümsediğimi fark ettim." },
        { surface: "simply knew", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "öylesine / birden biliyordu — analiz etmeden, içgüdüsel olarak",
          expl: "Zarf + fiil birleşimi. 'simply' burada 'just' anlamında: açıklaması olmayan, kendiliğinden gelen bir bilgiyi anlatır.",
          ex_en: "She woke up and simply knew it was over.", ex_tr: "Uyandı ve birden her şeyin bittiğini bildi.",
          individuals: [
            { word: "simply", meaning: "öylesine / sadece / birden", note: "Burada 'just' anlamında; fazla düşünmeden, kendiliğinden" },
            { word: "knew", meaning: "bildi / fark etti", note: "'know' fiilinin geçmiş biçimi; içgüdüsel farkındalık" }
          ]},
        { surface: "broke the news", pos: "VERB", type: "idiom", lemma: "break the news",
          tr: "haberi verdi / açıkladı",
          expl: "Deyim. Önemli (çoğunlukla beklenmedik) bir haberi birine iletmek.",
          ex_en: "He broke the news to her gently.", ex_tr: "Haberi ona nazikçe verdi." },
        { surface: "took it surprisingly well", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "bunu şaşırtıcı derecede iyi karşıladı",
          expl: "Fiil + zarf + sıfat/zarf birleşimi. 'surprisingly' beklentinin ötesinde bir tepkiyi işaret eder.",
          ex_en: "He took the bad news surprisingly well.", ex_tr: "Kötü haberi şaşırtıcı biçimde iyi karşıladı.",
          individuals: [
            { word: "took", meaning: "karşıladı / aldı", note: "'take news well/badly' = bir haberi iyi/kötü karşılamak" },
            { word: "surprisingly", meaning: "şaşırtıcı biçimde", note: "Beklentilerin ötesinde olduğunu vurgular" },
            { word: "well", meaning: "iyi / güzel bir şekilde", note: "Burada zarf; tepkinin olumluluğunu gösterir" }
          ]},
        { surface: "who was twelve at the time", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "o sırada on iki yaşında olan (kızı)",
          expl: "'who' kızı niteler. 'at the time' = o anın zaman dilimine atıf.",
          ex_en: "Her son, who was six at the time, cried.", ex_tr: "O sırada altı yaşında olan oğlu ağladı." },
        { surface: "looking forward to making new friends", pos: "VERB", type: "phrasal_verb", lemma: "look forward to",
          tr: "yeni arkadaşlar edinmeyi dört gözle bekliyordu",
          expl: "'look forward to + gerund': heyecanla beklemek. 'to'dan sonra fiil -ing alır.",
          ex_en: "I am looking forward to starting.", ex_tr: "Başlamayı dört gözle bekliyorum." },
        { surface: "at peace with his choice", pos: "ADJ", type: "prepositional_phrase", lemma: null,
          tr: "kararıyla barışık / içi rahat",
          expl: "'at peace with' = bir durumu kabullenerek huzur içinde olmak.",
          ex_en: "She is finally at peace with her past.", ex_tr: "Sonunda geçmişiyle barışık." },
      ]);
    }
  },

  // ─── ORTA 3 ─────────────────────────────────────────────────
  {
    id: "s_006",
    title: "Learning to Cook",
    level: "Orta",
    _text: "Selin had never really learned to cook properly, so she decided to start from scratch. She bought a thick cookery book and chose a recipe that looked simple enough. The dish required onions, garlic, tomatoes, olive oil, and a handful of fresh herbs. She read through the instructions carefully before she began. First, she had to chop the onions very finely, which made her eyes water. Then she heated the oil in a pan and added the garlic, but she left it too long and it burned slightly. She had to throw it away and start again. This time she paid more attention and managed to get the base right. As the sauce started to simmer, the kitchen filled with a wonderful smell. She added the herbs, tasted the mixture, and realised it needed more salt. When she finally served the dish, her flatmate took one bite and said it was delicious. Selin was so pleased with herself that she immediately decided to try a more difficult recipe next time. Cooking, she discovered, was not as hard as she had thought. It just took patience and a willingness to make mistakes.",
    get annotations() {
      return ann(this._text, [
        { surface: "start from scratch", pos: "VERB", type: "idiom", lemma: "start from scratch",
          tr: "sıfırdan başlamak / en baştan başlamak",
          expl: "Deyim. Temel bilgi ya da malzeme olmaksızın başlamak.",
          ex_en: "We had to start from scratch after the fire.", ex_tr: "Yangından sonra sıfırdan başlamak zorunda kaldık." },
        { surface: "looked simple enough", pos: "VERB", type: "grammar_structure", lemma: "look",
          tr: "yeterince basit görünüyordu",
          expl: "'look + adjective' = görünmek. 'enough' sıfat sonrasında 'yeterince' anlamı katar.",
          ex_en: "The task looked easy enough.", ex_tr: "Görev yeterince kolay görünüyordu." },
        { surface: "a handful of fresh herbs", pos: "NOUN", type: "noun_phrase", lemma: null,
          tr: "bir avuç taze ot",
          expl: "'a handful of' = bir avuç kadar belirsiz miktar ifadesi.",
          ex_en: "Add a handful of nuts to the salad.", ex_tr: "Salataya bir avuç fındık ekle." },
        { surface: "read through", pos: "VERB", type: "phrasal_verb", lemma: "read through",
          tr: "baştan sona okudu / dikkatli okuyup geçti",
          expl: "'read through' = bir metni eksiksiz biçimde başından sonuna kadar okumak.",
          ex_en: "Read through the contract before signing.", ex_tr: "İmzalamadan önce sözleşmeyi baştan sona oku." },
        { surface: "chop the onions very finely", pos: "VERB", type: "collocation", lemma: "chop",
          tr: "soğanları çok ince kesmek / doğramak",
          expl: "'chop finely' = ince ince doğramak. Mutfak dilinde yaygın collocation.",
          ex_en: "Chop the onions finely before cooking.", ex_tr: "Soğanları pişirmeden önce ince ince doğra." },
        { surface: "made her eyes water", pos: "VERB", type: "grammar_structure", lemma: "make",
          tr: "gözlerini yaşarttı",
          expl: "'make + nesne + bare infinitive' yapısı: soğanların gözleri yaşartmasına neden oldu.",
          ex_en: "The cold wind made his eyes water.", ex_tr: "Soğuk rüzgâr gözlerini yaşarttı." },
        { surface: "burned slightly", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "hafifçe yandı / birazcık kavruldu",
          expl: "Fiil + zarf birleşimi. 'slightly' yanmanın minimal düzeyde olduğunu gösterir; tam yanma değil.",
          ex_en: "The garlic burned slightly but was still usable.", ex_tr: "Sarımsak hafifçe yandı ama hâlâ kullanılabilirdi.",
          individuals: [
            { word: "burned", meaning: "yandı / kavruldu", note: "'burn' fiilinin geçmiş biçimi; burada hafif yanma" },
            { word: "slightly", meaning: "hafifçe / birazcık", note: "Eylemin minimalliğini vurgular; çok az miktarda" }
          ]},
        { surface: "throw it away", pos: "VERB", type: "phrasal_verb", lemma: "throw away",
          tr: "çöpe atmak / atmak",
          expl: "'throw away' = istenmeyen bir şeyden kurtulmak için atmak.",
          ex_en: "Don't throw it away — it can be recycled.", ex_tr: "Atmayın, geri dönüştürülebilir." },
        { surface: "paid more attention", pos: "VERB", type: "collocation", lemma: "pay attention",
          tr: "daha dikkatli oldu / daha fazla dikkat etti",
          expl: "'pay attention' = dikkat etmek. 'more' karşılaştırmalı yoğunluk katar.",
          ex_en: "Please pay more attention in class.", ex_tr: "Lütfen derste daha dikkatli ol." },
        { surface: "started to simmer", pos: "VERB", type: "word", lemma: "simmer",
          tr: "hafifçe kaynamaya başladı",
          expl: "'simmer' = sıvının tam kaynamadan hafifçe fokurdaması.",
          ex_en: "Let the soup simmer for twenty minutes.", ex_tr: "Çorbanın yirmi dakika hafifçe kaynamasını sağla." },
        { surface: "filled with a wonderful smell", pos: "VERB", type: "grammar_structure", lemma: "fill",
          tr: "harika bir kokuyla doldu",
          expl: "'fill with' = bir şeyle dolmak. Mutfak kendiliğinden dolmuş.",
          ex_en: "The room filled with laughter.", ex_tr: "Oda kahkahalarla doldu." },
        { surface: "immediately decided", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "hemen / anında karar verdi",
          expl: "Zarf + fiil birleşimi. 'immediately' kararsızlık yaşamadan, hiç beklemeden eyleme geçtiğini gösterir.",
          ex_en: "She immediately decided to try again.", ex_tr: "Hemen tekrar denemek için karar verdi.",
          individuals: [
            { word: "immediately", meaning: "hemen / anında", note: "Gecikme olmaksızın gerçekleştiğini gösteren zarf" },
            { word: "decided", meaning: "karar verdi", note: "'decide' fiilinin geçmiş biçimi" }
          ]},
        { surface: "pleased with herself", pos: "ADJ", type: "grammar_structure", lemma: "pleased",
          tr: "kendinden memnundu / başardığı için mutluydu",
          expl: "Reflexive yapı: 'pleased with herself' = kendi başarısından hoşnutluk duymak.",
          ex_en: "She was very pleased with herself.", ex_tr: "Kendinden çok memnundu." },
        { surface: "a willingness to make mistakes", pos: "NOUN", type: "noun_phrase", lemma: null,
          tr: "hata yapmaya isteklilik / hata yapmaktan çekinmemek",
          expl: "'willingness to + infinitive' = bir şeyi yapmaya istekli olma hâli.",
          ex_en: "Success requires a willingness to fail.", ex_tr: "Başarı, başarısız olmaya isteklilik gerektirir." },
      ]);
    }
  },

  // ─── ORTA 4 ─────────────────────────────────────────────────
  {
    id: "s_007",
    title: "The Journey Home",
    level: "Orta",
    _text: "Daniel had not been back to his hometown for five years. When he finally boarded the train, he felt a strange mixture of excitement and anxiety. He had left under difficult circumstances, and he was not sure how people would react to seeing him again. The train journey took nearly four hours. He spent most of it staring out of the window, watching the familiar landscape slowly come into view. When the train pulled into the station, his heart started beating faster. He stepped onto the platform and looked around. His sister was waiting for him near the exit, holding a small sign with his name on it as a joke. They both laughed, and the tension he had been carrying for months disappeared in an instant. She drove him to their parents' house, and the whole family had gathered to welcome him. His mother had cooked all his favourite dishes. Over dinner, they talked freely without bringing up any of the old arguments. His father, who had always found it hard to express his feelings, quietly placed his hand on Daniel's shoulder at one point. Daniel understood what that meant. He lay awake that night, thinking about all the years he had stayed away. He promised himself that things would be different from now on.",
    get annotations() {
      return ann(this._text, [
        { surface: "had not been back", pos: "VERB", type: "grammar_structure", lemma: "be back",
          tr: "geri dönmemişti / memlekete uğramamıştı",
          expl: "Past Perfect olumsuz. Beş yıl öncesinden bu yana hiç dönmediğini anlatır.",
          ex_en: "She had not been back since 2019.", ex_tr: "2019'dan beri geri dönmemişti." },
        { surface: "boarded the train", pos: "VERB", type: "collocation", lemma: "board",
          tr: "trene bindi",
          expl: "'board' = toplu taşıma araçlarına binmek. Uçak, tren, gemi için resmi/yazılı dilde yaygın.",
          ex_en: "Passengers, please board the train.", ex_tr: "Yolcular, lütfen trene binin." },
        { surface: "under difficult circumstances", pos: "ADV", type: "prepositional_phrase", lemma: null,
          tr: "zor koşullar altında / güç bir ortamda",
          expl: "'under ... circumstances' = belirli koşullar altında. 'difficult' ağır bir durumu niteler.",
          ex_en: "She worked under very difficult circumstances.", ex_tr: "Çok zor koşullar altında çalıştı." },
        { surface: "how people would react to seeing him again", pos: "CLAUSE", type: "grammar_structure", lemma: null,
          tr: "insanların onu yeniden görünce nasıl tepki vereceğini",
          expl: "Dolaylı soru (Indirect question). 'how + S + would + V' yapısı; 'react to + gerund' tepki vermek anlamında.",
          ex_en: "I didn't know how she would react to the news.", ex_tr: "Habere nasıl tepki vereceğini bilmiyordum." },
        { surface: "slowly come into view", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "yavaş yavaş görünür hâle gelmek / ağır ağır belirmek",
          expl: "Zarf + phrasal verb birleşimi. 'slowly' hareketin temposunu gösterir; 'come into view' görünür olmayı.",
          ex_en: "The village slowly came into view through the fog.", ex_tr: "Köy sisten yavaş yavaş belirdi.",
          individuals: [
            { word: "slowly", meaning: "yavaş yavaş / ağır ağır", note: "Hareketin hızını belirten zarf" },
            { word: "come into view", meaning: "görünür hâle gelmek / gözükmeye başlamak", note: "Phrasal verb: görüş alanına girmek" }
          ]},
        { surface: "pulled into the station", pos: "VERB", type: "phrasal_verb", lemma: "pull into",
          tr: "istasyona girdi / yavaşlayarak durağa yanaştı",
          expl: "'pull into' = araç ya da trenin bir yere yavaşlayarak girmesi.",
          ex_en: "The bus pulled into the stop.", ex_tr: "Otobüs durağa yanaştı." },
        { surface: "the tension he had been carrying for months", pos: "CLAUSE", type: "grammar_structure", lemma: null,
          tr: "aylardır taşıdığı gerilim",
          expl: "Past Perfect Continuous + sıfır relative pronoun: 'he had been carrying' tanımsız gerginliği niteler.",
          ex_en: "The worry she had been carrying finally faded.", ex_tr: "Aylardır taşıdığı endişe nihayet dağıldı." },
        { surface: "in an instant", pos: "ADV", type: "idiom", lemma: null,
          tr: "bir anda / anında",
          expl: "'in an instant' = çok kısa sürede, saniyeler içinde.",
          ex_en: "Everything changed in an instant.", ex_tr: "Her şey bir anda değişti." },
        { surface: "talked freely", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "özgürce / rahatça konuştular",
          expl: "Fiil + zarf birleşimi. 'freely' konuşmanın kısıtlama olmaksızın, açık yüreklilikle yapıldığını gösterir.",
          ex_en: "For the first time, they talked freely about everything.", ex_tr: "İlk kez her şeyi özgürce konuştular.",
          individuals: [
            { word: "talked", meaning: "konuştular", note: "'talk' fiilinin geçmiş biçimi; karşılıklı konuşmak" },
            { word: "freely", meaning: "özgürce / serbestçe / çekinmeden", note: "Kısıtlama veya çekince olmaksızın yapıldığını gösterir" }
          ]},
        { surface: "without bringing up", pos: "VERB", type: "grammar_structure", lemma: "bring up",
          tr: "gündeme getirmeden / söz açmadan",
          expl: "'without + gerund' + 'bring up' phrasal verb: bir konuyu ortaya atmadan.",
          ex_en: "They met without bringing up the past.", ex_tr: "Geçmişi gündeme getirmeden buluştular." },
        { surface: "quietly placed his hand on Daniel's shoulder", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "sessizce / usulca elini Daniel'ın omzuna koydu",
          expl: "Zarf + fiil + nesne birleşimi. 'quietly' eylemin sessizce, kelimesiz gerçekleştiğini gösterir; sözden güçlü bir jest.",
          ex_en: "She quietly placed her hand on his arm.", ex_tr: "Usulca elini koluna koydu.",
          individuals: [
            { word: "quietly", meaning: "sessizce / usulca", note: "Eylemin gürültüsüz, dikkat çekmeden yapıldığını gösterir" },
            { word: "placed", meaning: "koydu / yerleştirdi", note: "'place' fiilinin geçmiş biçimi; 'put'tan daha özenli, nazik bir eylem" }
          ]},
        { surface: "who had always found it hard to express his feelings", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "her zaman duygularını ifade etmekte güçlük çeken (babası)",
          expl: "'who' babasını niteler. 'find it hard to' = bir şeyi yapmayı güç bulmak kalıbı.",
          ex_en: "He was a man who found it hard to talk about emotions.", ex_tr: "Duygularını konuşmakta güçlük çeken biriydi." },
        { surface: "had stayed away", pos: "VERB", type: "phrasal_verb", lemma: "stay away",
          tr: "uzak durmuştu / gelmemişti",
          expl: "'stay away' = bir yerden ya da kişiden kasıtlı olarak uzak durmak.",
          ex_en: "He had stayed away from home for years.", ex_tr: "Yıllarca evden uzak durmuştu." },
        { surface: "from now on", pos: "ADV", type: "idiom", lemma: null,
          tr: "bundan böyle / artık",
          expl: "'from now on' = bu andan itibaren sürekli olarak.",
          ex_en: "From now on, I will be more careful.", ex_tr: "Bundan böyle daha dikkatli olacağım." },
      ]);
    }
  },

  // ─── İLERİ 1 ────────────────────────────────────────────────
  {
    id: "s_008",
    title: "The Last Bookshop",
    level: "İleri",
    _text: "The sign had been hanging in the window for three weeks before anyone paid serious attention to it: CLOSING DOWN SALE — EVERYTHING MUST GO. Edmund, who had owned the shop for thirty-one years, had put it there himself one grey Tuesday morning, then locked the back office and cried quietly for about twenty minutes. He had not told anyone in advance, not even his closest assistant, Clara. Clara had found out by arriving at work and reading the sign from the pavement. She had not spoken to Edmund for the rest of that day. The news spread quickly through the neighbourhood. People who had not set foot in the shop for years suddenly appeared, browsing the shelves with what seemed to Edmund like guilt rather than interest. He had watched this kind of performance before — the sudden sentimentality people felt for things they had never truly valued until they were about to disappear. Still, he was glad they came. By the end of the first week, nearly a third of the stock had been sold. Regulars who had been coming in every Saturday for decades left with armfuls of books, some of them visibly upset. One elderly woman, whose late husband had proposed to her in the poetry section forty years ago, stood in that corner for a long time without picking anything up. Edmund did not disturb her. On the final day, after the last customer had left and the lights had been switched off, Edmund sat alone among the empty shelves. He had built something here that he had once believed would outlast him. He was wrong, of course. But that night, sitting in the dark with the smell of old paper still in the air, he found he was not entirely sorry.",
    get annotations() {
      return ann(this._text, [
        { surface: "had been hanging in the window", pos: "VERB", type: "grammar_structure", lemma: "hang",
          tr: "vitreyde asılı duruyordu",
          expl: "Past Perfect Continuous: önceki bir andan üç hafta boyunca süregelen durum.",
          ex_en: "The painting had been hanging there for years.", ex_tr: "Tablo yıllardır orada asılı duruyordu." },
        { surface: "who had owned the shop for thirty-one years", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "otuz bir yıldır dükkânın sahibi olan (Edmund)",
          expl: "'who' Edmund'u niteler. 'had owned' Past Perfect: o ana kadar süregelen sahiplik.",
          ex_en: "The man, who had run the café for decades, retired.", ex_tr: "On yıllardır kafeyi işleten adam emekli oldu." },
        { surface: "cried quietly", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "sessizce ağladı",
          expl: "Fiil + zarf birleşimi. 'cried' geçmiş biçimiyle 'ağladı'; 'quietly' bunu kimseye belli etmeden, içe kapanarak yaptığını gösterir. Duygusal kontrolü yitirme ile dışa vurmama arasındaki gerilimi anlatır.",
          ex_en: "She closed the door and cried quietly.", ex_tr: "Kapıyı kapattı ve sessizce ağladı.",
          individuals: [
            { word: "cried", meaning: "ağladı", note: "'cry' fiilinin geçmiş biçimi" },
            { word: "quietly", meaning: "sessizce / kimseye belli etmeden", note: "Eylemin fark ettirmeden, içe kapanarak yapıldığını gösterir" }
          ]},
        { surface: "had not told anyone in advance", pos: "VERB", type: "grammar_structure", lemma: "tell",
          tr: "önceden kimseye söylememişti",
          expl: "Past Perfect olumsuz. 'in advance' = önceden.",
          ex_en: "She had not told anyone in advance.", ex_tr: "Önceden kimseye söylememişti." },
        { surface: "had found out by arriving at work", pos: "VERB", type: "grammar_structure", lemma: "find out",
          tr: "işe gelip tabelayı okuyarak öğrenmişti",
          expl: "'find out' = bir şeyi keşfetmek. 'by + gerund' yöntemi gösterir.",
          ex_en: "She found out by checking the website.", ex_tr: "Web sitesini kontrol ederek öğrendi." },
        { surface: "spread quickly", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "hızla yayıldı",
          expl: "Fiil + zarf birleşimi. 'spread' bir haberin dağılmasını; 'quickly' bu yayılmanın ne kadar hızlı gerçekleştiğini gösterir.",
          ex_en: "The rumour spread quickly through the school.", ex_tr: "Söylenti okulda hızla yayıldı.",
          individuals: [
            { word: "spread", meaning: "yayıldı", note: "'spread' düzensiz fiil; hem past tense hem de base form aynı" },
            { word: "quickly", meaning: "hızla / çabucak", note: "Yayılmanın hızını gösteren zarf" }
          ]},
        { surface: "suddenly appeared", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "birdenbire / aniden ortaya çıktı",
          expl: "Zarf + fiil birleşimi. 'suddenly' eylemin beklenmedik ve ani biçimde gerçekleştiğini vurgular.",
          ex_en: "A figure suddenly appeared in the doorway.", ex_tr: "Kapı aralığında birdenbire bir figür belirdi.",
          individuals: [
            { word: "suddenly", meaning: "birdenbire / aniden", note: "Eylemin beklenmedik ve ani gerçekleştiğini vurgular" },
            { word: "appeared", meaning: "ortaya çıktı / göründü", note: "'appear' fiilinin geçmiş biçimi; var olmaya başlamak" }
          ]},
        { surface: "set foot in", pos: "VERB", type: "idiom", lemma: "set foot in",
          tr: "adım atmamıştı / uğramamıştı",
          expl: "Deyim. 'set foot in' = bir yere girmek ya da gitmek. Çoğunlukla olumsuzda kullanılır.",
          ex_en: "He had never set foot in a theatre before.", ex_tr: "Daha önce hiç tiyatroya adım atmamıştı." },
        { surface: "browsing the shelves", pos: "VERB", type: "collocation", lemma: "browse",
          tr: "raflara göz gezdirmek / raflarda dolaşmak",
          expl: "'browse' = hedef belirtmeksizin dolaşarak bakmak.",
          ex_en: "She spent an hour browsing the shelves.", ex_tr: "Raflara göz gezdirerek bir saat geçirdi." },
        { surface: "about to disappear", pos: "VERB", type: "grammar_structure", lemma: "be about to",
          tr: "kaybolmak üzere olan",
          expl: "'be about to' = çok yakın gelecekte gerçekleşmesi beklenen eylem.",
          ex_en: "The species is about to disappear.", ex_tr: "Tür yok olmak üzere." },
        { surface: "a third of the stock", pos: "NOUN", type: "noun_phrase", lemma: null,
          tr: "stoğun üçte biri",
          expl: "'a third of' = kesir ifadesi. Stoğun yüzde otuz üçü satılmış demektir.",
          ex_en: "A third of the students passed.", ex_tr: "Öğrencilerin üçte biri geçti." },
        { surface: "had been coming in every Saturday for decades", pos: "VERB", type: "grammar_structure", lemma: "come in",
          tr: "on yıllardır her cumartesi uğruyorlardı",
          expl: "Past Perfect Continuous: geçmişte uzun süre tekrar eden alışkanlık.",
          ex_en: "He had been visiting every Sunday for years.", ex_tr: "Yıllarca her pazar ziyaret etmekteydi." },
        { surface: "visibly upset", pos: "ADJ", type: "verb_phrase", lemma: null,
          tr: "gözle görülür biçimde üzgün / açıkça belli olan üzüntüyle",
          expl: "Zarf + sıfat birleşimi. 'visibly' üzüntünün içe atılmadığını, dışarıdan fark edilebildiğini gösterir.",
          ex_en: "She was visibly upset after the call.", ex_tr: "Telefon sonrası açıkça üzgün görünüyordu.",
          individuals: [
            { word: "visibly", meaning: "gözle görülür biçimde / açıkça", note: "Dışarıdan fark edilebilen bir durumu gösterir" },
            { word: "upset", meaning: "üzgün / rahatsız / sinirlenmiş", note: "Sıfat; duygusal dengesizlik" }
          ]},
        { surface: "whose late husband had proposed to her", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "merhum kocasının kendisine evlenme teklifi ettiği (yaşlı kadın)",
          expl: "'whose' sahiplik bildiren relative pronoun. 'late husband' = merhum koca.",
          ex_en: "The woman whose son had won the prize was proud.", ex_tr: "Oğlu ödül kazanan kadın gururluydu." },
        { surface: "did not disturb her", pos: "VERB", type: "word", lemma: "disturb",
          tr: "onu rahatsız etmedi",
          expl: "'disturb' = birinin sessizliğini, huzurunu ya da konsantrasyonunu bozmak.",
          ex_en: "Please do not disturb me.", ex_tr: "Lütfen beni rahatsız etme." },
        { surface: "outlast him", pos: "VERB", type: "word", lemma: "outlast",
          tr: "ondan daha uzun ömürlü olmak / ondan sonra da varlığını sürdürmek",
          expl: "'outlast' = bir şeyin ya da kişinin daha uzun süre ayakta kalması.",
          ex_en: "He hoped his work would outlast him.", ex_tr: "Eserinin kendisinden daha uzun yaşamasını umuyordu." },
        { surface: "not entirely sorry", pos: "ADJ", type: "grammar_structure", lemma: null,
          tr: "tamamen pişman da değil / bir yandan hüzünsüz ama bir yandan da barışık",
          expl: "Litotes (zayıflatılmış olumsuz): 'not entirely sorry' = tamamen üzgün değil ama tam mutlu sayılmaz.",
          ex_en: "She was not entirely unhappy with the result.", ex_tr: "Sonuçtan tamamen mutsuz da değildi." },
      ]);
    }
  },

  // ─── İLERİ 2 ────────────────────────────────────────────────
  {
    id: "s_009",
    title: "What the Silence Said",
    level: "İleri",
    _text: "For the first six months after their argument, neither Hana nor her brother Riku had made any attempt to get in touch. It was not stubbornness exactly — or at least that is what Hana told herself — but rather a kind of paralysis that settled in whenever she thought about picking up the phone. The argument itself had not even been about something important. It had started over something trivial said at a family dinner, a careless remark that Riku had let slip without thinking. Hana had reacted more strongly than she had intended to, and Riku, instead of apologising, had doubled down. By the time either of them could have stepped back, something had hardened between them. Their mother, who refused to take sides, had tried on several occasions to bring them together, but both had always found a reason to decline. Hana worked in a hospital and used her long shifts as an excuse not to engage with anything outside work. Riku had moved to a different part of the city and seemed to have thrown himself into a new social life with an energy that Hana found almost offensive. It was their mother's sudden illness that finally broke the silence. When Hana arrived at the hospital and found Riku already sitting in the corridor outside their mother's room, she had expected things to be awkward. They were. But after an hour of sitting side by side in near silence, Riku looked at her and said simply, 'I should have called.' Hana did not answer straight away. She had been rehearsing responses to this moment for months without ever expecting it to actually arrive. 'You should have,' she said at last. 'So should I.' That was enough for now.",
    get annotations() {
      return ann(this._text, [
        { surface: "get in touch", pos: "VERB", type: "idiom", lemma: "get in touch",
          tr: "iletişime geçmek / haberleşmek",
          expl: "Deyim. Telefon, mesaj veya başka bir yolla birisiyle bağlantı kurmak.",
          ex_en: "Please get in touch if you need help.", ex_tr: "Yardıma ihtiyacın olursa iletişime geç." },
        { surface: "that settled in", pos: "VERB", type: "phrasal_verb", lemma: "settle in",
          tr: "yerleşen / çöken (felç hissi)",
          expl: "'settle in' = bir durum ya da hissin zamanla yerleşmesi, ağırlığını koyması.",
          ex_en: "A deep sadness had settled in.", ex_tr: "Derin bir üzüntü yerleşmişti." },
        { surface: "picking up the phone", pos: "VERB", type: "phrasal_verb", lemma: "pick up the phone",
          tr: "telefonu açmak / aramak",
          expl: "'pick up the phone' = telefona cevap vermek ya da birini aramak için telefonu eline almak.",
          ex_en: "She couldn't bring herself to pick up the phone.", ex_tr: "Kendini telefonu açmaya zorlayamadı." },
        { surface: "let slip", pos: "VERB", type: "phrasal_verb", lemma: "let slip",
          tr: "ağzından kaçırmak / farkında olmadan söylemek",
          expl: "'let slip' = kasıtsız olarak söylemek ya da bir bilgiyi dikkatsizce ifşa etmek.",
          ex_en: "He let slip that he was leaving.", ex_tr: "Gideceğini ağzından kaçırdı." },
        { surface: "had reacted more strongly than she had intended to", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "niyetlendiğinden daha sert tepki vermişti",
          expl: "Past Perfect karşılaştırma: iki Past Perfect eylem kıyaslanıyor.",
          ex_en: "He had spoken more harshly than he had meant to.", ex_tr: "Kastettiğinden daha sert konuşmuştu." },
        { surface: "doubled down", pos: "VERB", type: "phrasal_verb", lemma: "double down",
          tr: "tutumunu sertleştirdi / daha da ısrar etti / geri adım atmadı",
          expl: "'double down' = zor durum karşısında geri çekilmek yerine aynı tutumda daha kararlı durmak.",
          ex_en: "Instead of apologising, he doubled down.", ex_tr: "Özür dilemek yerine daha da ısrar etti." },
        { surface: "had hardened between them", pos: "VERB", type: "word", lemma: "harden",
          tr: "aralarında sertleşmişti / katılaşmıştı",
          expl: "'harden' = bir şeyin sertleşmesi, esnekliğini yitirmesi. Aralarındaki duvarın kalıplaştığını anlatır.",
          ex_en: "Attitudes had hardened on both sides.", ex_tr: "Her iki taraftaki tutumlar sertleşmişti." },
        { surface: "who refused to take sides", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "taraf tutmayı reddeden (anneleri)",
          expl: "'who' annelerini niteler. 'take sides' = taraf tutmak; 'refuse' reddetmek.",
          ex_en: "She was a judge who refused to take sides.", ex_tr: "Taraf tutmayı reddeden bir hâkimdi." },
        { surface: "thrown himself into", pos: "VERB", type: "phrasal_verb", lemma: "throw oneself into",
          tr: "kendini atmıştı / kendini kaptırmıştı",
          expl: "'throw oneself into' = bir aktiviteye ya da hayata tüm enerjisiyle dalmak.",
          ex_en: "She threw herself into her new job.", ex_tr: "Kendini yeni işine adadı." },
        { surface: "found almost offensive", pos: "ADJ", type: "verb_phrase", lemma: null,
          tr: "neredeyse rahatsız edici bulduğu / âdeta saldırgan hissettiği",
          expl: "Zarf + sıfat birleşimi. 'almost' tam anlamıyla saldırgan değil ama çok yakın; 'offensive' rahatsız edici bulma.",
          ex_en: "She found his cheerfulness almost offensive.", ex_tr: "Neşesini neredeyse rahatsız edici buldu.",
          individuals: [
            { word: "almost", meaning: "neredeyse / âdeta", note: "Tam olarak değil ama çok yakın; sınırda olan bir durum" },
            { word: "offensive", meaning: "rahatsız edici / saldırgan / incitici", note: "Bir şeyin başkasını rahatsız etme özelliği" }
          ]},
        { surface: "broke the silence", pos: "VERB", type: "idiom", lemma: "break the silence",
          tr: "sessizliği bozdu / sükûtu çiğnedi",
          expl: "Deyim. Uzun süren sessizliği sona erdiren bir eylem ya da söz.",
          ex_en: "A loud noise broke the silence.", ex_tr: "Yüksek bir ses sessizliği bozdu." },
        { surface: "side by side", pos: "ADV", type: "idiom", lemma: null,
          tr: "yan yana",
          expl: "Deyimsel zarf. İki kişinin fiziksel olarak yanyana bulunması.",
          ex_en: "They sat side by side on the bench.", ex_tr: "Bankta yan yana oturdular." },
        { surface: "said simply", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "yalın bir şekilde / sade olarak dedi",
          expl: "Fiil + zarf birleşimi. 'simply' burada gereksiz söz ya da süsleme olmaksızın, doğrudan ve yalın biçimde demeyi anlatır.",
          ex_en: "He looked at her and said simply, 'I'm sorry.'", ex_tr: "Ona bakıp yalınca 'Üzgünüm' dedi.",
          individuals: [
            { word: "said", meaning: "dedi / söyledi", note: "'say' fiilinin geçmiş biçimi" },
            { word: "simply", meaning: "yalın bir şekilde / sadece / doğrudan", note: "Fazla söz ya da süsleme olmaksızın; doğrudan ve özlü" }
          ]},
        { surface: "I should have called", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "aramalıydım — ama aramadım",
          expl: "'should have + past participle' = geçmişte yapılması gereken ama yapılmayan eylemi pişmanlıkla ifade eder.",
          ex_en: "I should have told you earlier.", ex_tr: "Sana daha önce söylemeliydim." },
        { surface: "had been rehearsing responses", pos: "VERB", type: "grammar_structure", lemma: "rehearse",
          tr: "yanıtlar hazırlayıp duruyordu / zihninde defalarca prova yapmıştı",
          expl: "Past Perfect Continuous: o ana kadar süregelen zihinsel hazırlık.",
          ex_en: "She had been rehearsing her speech for weeks.", ex_tr: "Konuşmasını haftalarca prova yapmaktaydı." },
        { surface: "at last", pos: "ADV", type: "idiom", lemma: null,
          tr: "sonunda / nihayet",
          expl: "'at last' = uzun bir bekleme ya da mücadelenin ardından sonunda.",
          ex_en: "She smiled at last.", ex_tr: "Sonunda güldü." },
      ]);
    }
  },

  // ─── İLERİ 3 ────────────────────────────────────────────────
  {
    id: "s_010",
    title: "Starting Over",
    level: "İleri",
    _text: "The removal van had barely turned the corner before Yasmin started wondering whether she had made the right choice. She was forty-three years old, recently divorced, and standing in the middle of a flat she had never seen in person before signing the lease. The walls were white and bare, the floors uncarpeted, and the only sound was the distant hum of traffic coming through the window she had left slightly open. She had been warned by well-meaning friends that starting over at her age was either very brave or very foolish, and she had not yet decided which. The city itself was not entirely unfamiliar — she had lived here briefly in her twenties — but it was a different city now, or perhaps she was a different person. She unpacked the few boxes she had brought: books, kitchen things, a lamp her daughter had given her, and a framed photograph that she placed on the windowsill without looking at it directly. The first week passed in a blur of small logistics — getting a library card, finding a decent coffee shop, working out which bus stopped where. She called her daughter every evening. Her daughter, who was worried but trying not to show it, always found something cheerful to say. On the eighth day, Yasmin went for a long walk along the canal and found herself thinking not about what she had left behind but about what might still be possible. It was not a dramatic realisation. It arrived quietly, like light coming into a room that has been closed for a long time. She bought herself a coffee, sat on a bench, and watched the water move. For the first time in months, she did not feel the need to be anywhere else.",
    get annotations() {
      return ann(this._text, [
        { surface: "had barely turned the corner before", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "köşeyi dönmeden hemen önce / köşeyi dönür dönmez",
          expl: "'had barely ... before' = bir eylem bitmeden hemen başka bir şeyin gerçekleşmesi.",
          ex_en: "She had barely sat down before the phone rang.", ex_tr: "Daha oturur oturmaz telefon çaldı." },
        { surface: "had made the right choice", pos: "VERB", type: "grammar_structure", lemma: "make",
          tr: "doğru seçimi yapmış mıydı",
          expl: "Past Perfect: merak etme anından daha önce gerçekleşen karar.",
          ex_en: "She wondered if she had made the right choice.", ex_tr: "Doğru seçimi yapıp yapmadığını merak etti." },
        { surface: "in person", pos: "ADV", type: "prepositional_phrase", lemma: null,
          tr: "bizzat / yüz yüze / fiziksel olarak",
          expl: "'in person' = fiilen, gerçekte orada bulunarak.",
          ex_en: "I had never met him in person.", ex_tr: "Onu hiç bizzat tanımamıştım." },
        { surface: "signing the lease", pos: "VERB", type: "collocation", lemma: "sign the lease",
          tr: "kira sözleşmesini imzalamak",
          expl: "'sign the lease' = kira kontratına imza atmak.",
          ex_en: "They signed the lease on Friday.", ex_tr: "Cumartesi kira sözleşmesini imzaladılar." },
        { surface: "lived here briefly", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "kısa bir süreliğine burada yaşamıştı",
          expl: "Fiil + zarf birleşimi. 'briefly' yaşamanın uzun sürmediğini, geçici olduğunu gösterir.",
          ex_en: "He had lived there briefly before moving abroad.", ex_tr: "Yurt dışına taşınmadan önce kısa bir süre orada yaşamıştı.",
          individuals: [
            { word: "lived", meaning: "yaşadı / ikamet etti", note: "'live' fiilinin geçmiş biçimi" },
            { word: "briefly", meaning: "kısa süreliğine / kısaca", note: "Zamanın sınırlı ve geçici olduğunu gösterir" }
          ]},
        { surface: "starting over", pos: "VERB", type: "phrasal_verb", lemma: "start over",
          tr: "yeniden başlamak / hayatı sıfırlamak",
          expl: "'start over' = her şeyi bırakıp yeni bir sayfa açmak.",
          ex_en: "It's never too late to start over.", ex_tr: "Yeniden başlamak için asla geç değildir." },
        { surface: "not entirely unfamiliar", pos: "ADJ", type: "grammar_structure", lemma: null,
          tr: "tamamen yabancı da değil / bir ölçüde tanıdık",
          expl: "Litotes: çift olumsuzla yumuşatılmış ifade. 'biraz tanıdık' anlamı taşır.",
          ex_en: "The feeling was not entirely unfamiliar.", ex_tr: "His tamamen yabancı değildi." },
        { surface: "passed in a blur of small logistics", pos: "VERB", type: "idiom", lemma: null,
          tr: "küçük pratik ayrıntıların girdabında geçip gitti",
          expl: "'in a blur' = bulanık, hızla. 'small logistics' = ev kurmanın küçük ayrıntıları.",
          ex_en: "The day passed in a blur.", ex_tr: "Gün çarçabuk, bulanık geçti." },
        { surface: "working out which bus stopped where", pos: "VERB", type: "phrasal_verb", lemma: "work out",
          tr: "hangi otobüsün nerede durduğunu çözmek / anlamak",
          expl: "'work out' = bir şeyi düşünerek ya da deneyerek çözmek, anlamak.",
          ex_en: "I'm still working out how the system works.", ex_tr: "Sistemin nasıl işlediğini hâlâ çözmeye çalışıyorum." },
        { surface: "who was worried but trying not to show it", pos: "CLAUSE", type: "relative_clause", lemma: null,
          tr: "endişeli olmasına rağmen bunu belli etmemeye çalışan (kızı)",
          expl: "'who' kızı niteler. İki zıt durumu 'but' ile birleştiren karmaşık relative clause.",
          ex_en: "He was a man who was scared but tried not to show it.", ex_tr: "Korkmuş ama belli etmemeye çalışan biriydi." },
        { surface: "found herself thinking", pos: "VERB", type: "grammar_structure", lemma: "find oneself",
          tr: "kendini düşünürken buldu / farkında olmadan düşünüyordu",
          expl: "'find oneself + gerund' = kişinin niyetsizce kendini bir eylem içinde bulması.",
          ex_en: "I found myself crying during the film.", ex_tr: "Film sırasında ağladığımı fark ettim." },
        { surface: "what she had left behind", pos: "CLAUSE", type: "phrasal_verb", lemma: "leave behind",
          tr: "geride bıraktığı şeyler",
          expl: "'leave behind' = bir yeri terk ederken bazı şeyleri, insanları ya da geçmişi orada bırakmak.",
          ex_en: "She missed what she had left behind.", ex_tr: "Geride bıraktıklarını özlüyordu." },
        { surface: "arrived quietly", pos: "VERB", type: "verb_phrase", lemma: null,
          tr: "sessizce / usulca geldi — fark ettirmeden ulaştı",
          expl: "Fiil + zarf birleşimi. 'arrived' farkındalığın ulaşmasını; 'quietly' bunu gürültüsüz, dramatik olmadan yaptığını anlatır.",
          ex_en: "Understanding arrived quietly, without fanfare.", ex_tr: "Anlayış, gürültüsüz ve sessizce geldi.",
          individuals: [
            { word: "arrived", meaning: "geldi / ulaştı", note: "'arrive' fiilinin geçmiş biçimi; bir yere ya da bir duruma ulaşmak" },
            { word: "quietly", meaning: "sessizce / usulca / dramatik olmadan", note: "Eylemin fark ettirmeden, yavaşça gerçekleştiğini gösterir" }
          ]},
        { surface: "like light coming into a room that has been closed for a long time", pos: "CLAUSE", type: "grammar_structure", lemma: null,
          tr: "uzun süre kapalı kalmış bir odaya giren ışık gibi",
          expl: "Teşbih (simile) + relative clause: 'that has been closed' = uzun süre kapalı olan; gelen farkındalığı nazikçe açılan ışığa benzetir.",
          ex_en: "Hope arrived like light entering a dark room.", ex_tr: "Umut, karanlık bir odaya giren ışık gibi geldi." },
        { surface: "did not feel the need to be anywhere else", pos: "VERB", type: "grammar_structure", lemma: null,
          tr: "başka bir yerde olma ihtiyacı duymuyordu / tam orada olmak yeterliydi",
          expl: "'feel the need to' = bir şeye ihtiyaç duymak. Olumsuz yapı huzuru ve doyumu anlatır.",
          ex_en: "For once, she did not feel the need to escape.", ex_tr: "İlk kez kaçma ihtiyacı duymadı." },
      ]);
    }
  },

];

// ── Output ──────────────────────────────────────────────────────
const output = stories.map(s => ({
  id: s.id,
  title: s.title,
  level: s.level,
  text: s._text,
  annotations: s.annotations
}));

const js = `/**
 * English Rhapsody - Reading Workshop Stories Data
 * 10 hikaye: 3 Kolay / 4 Orta / 3 İleri
 * Derin bağlamsal annotation sistemi — v4.0
 *
 * YENİ: Fiil+zarf / zarf+sıfat birleşimleri (cried quietly, spread quickly...):
 *   - annotation_type: "verb_phrase" olarak işaretlenir
 *   - individual_meanings[] ile her kelime ayrıca açıklanır
 *   - Popup hem birleşik anlamı hem kelime kelime gösterir
 */

const STORIES = ${JSON.stringify(output, null, 2)};

const SPEAK_CHALLENGES = {
  "easy": [],
  "medium": [],
  "hard": []
};
`;

process.stdout.write(js);
