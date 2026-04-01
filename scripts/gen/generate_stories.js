const fs = require('fs');
const path = require('path');

// Bu betik, promptunuzdaki tüm kuralları içeren sistem promptunu kullanarak 
// hikaye üretimi sürecini otomatize etmek için hazırlanmıştır.
// Eğer bir LLM API (örneğin Gemini API) bağlarsanız, döngü içinde çalıştırarak
// kolayca 1000 hikaye üretebilirsiniz.

const SYSTEM_PROMPT = `
İngilizce öğrenme sitemin Reading Workshop / Hikâye modülü üzerinde çalışıyorsun.
Görevin İngilizce hikâyeler üretmek ve her hikâye için bağlamı anlayan gelişmiş bir açıklama sistemi kurmak.
Öğrenci bir kelimeye, ifadeye veya dilbilgisel yapıya tıkladığında o öğenin TAM OLARAK o cümledeki doğru Türkçe anlamını görmelidir.

DİLBİLİMSEL ANALİZ:
• lemmatization, POS tagging, dependency parsing, phrase chunking, grammar structure detection mantığıyla analiz et.
• Çıktı kullanıcı için basit ve anlaşılır olmalıdır.

KURALLAR:
1. BAĞLAM ÖNCELİKLİ: Anlamı her zaman cümle bağlamından çıkar. Belirsizlik varsa en olası bağlamsal anlamı seç.
2. FİİL ÇEKİMLERİ: Fiiller mastar olarak değil cümledeki gerçek zaman anlamıyla çevrilmelidir (went → gitti).
3. PHRASAL VERBLER: Tek parça veya ayrı olsalar da (split phrasal verb) tek yapı olarak işaretle.
4. PREPOSITION & İSİM TAMLAMALARI & DEYİMLER: Anlamlı grupları tek parça olarak ele al.
5. GRAMER YAPILARI: Relative clause, passive voice, tense yapılarını yapısal olarak açıkla.
6. AÇIKLAMA DİLİ: Sade, çocuklara ve beginner seviyesine uygun Türkçe.
7. ANNOTATION YOĞUNLUĞU: Dengeli olmalı, her kelime tıklanmamalı.
8. ÖZEL İSİMLER & FUNCTION WORDS: Gerekmedikçe annotate edilmemelidir.
9. SPAN SİSTEMİ: Karakter index tabanlı olmalı.

ÇIKTI JSON FORMATI:
{
  "id": "benzersiz_id",
  "title": "Hikaye Başlığı",
  "level": "Kolay | Orta | İleri",
  "text": "Hikaye metni...",
  "annotations": [
    {
      "start_index": 0,
      "end_index": 5,
      "surface_form": "Kelime veya Yapı",
      "lemma": "kök_hali",
      "pos": "VERB/NOUN/vb",
      "annotation_type": "word | phrasal_verb | idiom | collocation | noun_phrase | grammar_structure | relative_clause",
      "contextual_turkish_meaning": "o bağlamdaki anlamı",
      "short_explanation_tr": "sade açıklama",
      "example_sentence_en": "Kısa ingilizce örnek.",
      "example_sentence_tr": "Örneğin çevirisi.",
      "spans": [{"start": 0, "end": 2}] // Sadece split phrasal verb'ler için (opsiyonel)
    }
  ]
}
`;

console.log("-----------------------------------------------------------------");
console.log("1000 Hikaye Üretim Aracı - Şablonu");
console.log("-----------------------------------------------------------------");
console.log("Talimatlar sisteme tam olarak entegre edildi.");
console.log("Bu sistem promptu, bir API entegrasyonu ile (ör. OpenAI, Gemini) ");
console.log("döngüye sokularak 1000 hikayelik dev veritabanı JSON olarak basılabilir.");
console.log("Sistem promptu: \n", SYSTEM_PROMPT.substring(0, 300) + "...\n");
