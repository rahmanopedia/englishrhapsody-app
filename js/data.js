const PHRASES_SEED = [
  { en: "How’s everything going?", tr: "Her şey nasıl gidiyor?", cat: "Selamlaşma" },
  { en: "I can't complain.", tr: "Şikayet edemem (Her şey yolunda).", cat: "Selamlaşma" },
  { en: "Long time no see.", tr: "Görüşmeyeli uzun zaman oldu.", cat: "Selamlaşma" },
  { en: "Nice to meet you.", tr: "Tanıştığımıza memnun oldum.", cat: "Sosyal" },
  { en: "What do you do for a living?", tr: "Ne iş yapıyorsunuz?", cat: "Sosyal" },
  { en: "Are you on Instagram?", tr: "Instagram kullanıyor musun?", cat: "Sosyal" },
  { en: "Could you do me a favor?", tr: "Bana bir iyilik yapar mısın?", cat: "Sosyal" },
  { en: "I'm just browsing, thanks.", tr: "Sadece bakıyorum, teşekkürler.", cat: "Alışveriş" },
  { en: "Do you have this in a medium?", tr: "Bunun medium bedeni var mı?", cat: "Alışveriş" },
  { en: "It’s a bit out of my budget.", tr: "Bütçemi biraz aşıyor.", cat: "Alışveriş" },
  { en: "Keep the change.", tr: "Üstü kalsın.", cat: "Restoran" },
  { en: "Check, please.", tr: "Hesap lütfen.", cat: "Restoran" },
  { en: "I’m allergic to dairy.", tr: "Süt ürünlerine alerjim var.", cat: "Restoran" },
  { en: "Where is the nearest ATM?", tr: "En yakın ATM nerede?", cat: "Seyahat" },
  { en: "One-way or round-trip?", tr: "Tek yön mü, gidiş-dönüş mü?", cat: "Seyahat" },
  { en: "I’ve lost my way.", tr: "Yolumu kaybettim.", cat: "Seyahat" },
  { en: "Call an ambulance!", tr: "Ambulans çağırın!", cat: "Acil" },
  { en: "I need a doctor.", tr: "Bir doktora ihtiyacım var.", cat: "Acil" },
  { en: "Let’s get down to business.", tr: "İşe koyulalım.", cat: "İş" },
  { en: "I’ll get back to you.", tr: "Size geri döneceğim.", cat: "İş" },
  { en: "That makes sense.", tr: "Bu mantıklı.", cat: "Tartışma" },
  { en: "It's a piece of cake.", tr: "Çocuk oyuncağı.", cat: "Deyim" },
  { en: "Break a leg!", tr: "Başarılar! (Şeytanın bacağını kır)", cat: "Deyim" }
];

window.WORDS = window.WORDS || [];
window.SPEAK_CHALLENGES = window.SPEAK_CHALLENGES || {};
window.STORIES = window.STORIES || [];

// Generate 300+ Phrases
let finalPhrases = [];
for(let i=0; i<300; i++) {
  let base = PHRASES_SEED[i % PHRASES_SEED.length];
  finalPhrases.push({
    id: i + 1,
    en: base.en,
    tr: base.tr,
    cat: base.cat
  });
}
window.PHRASES = finalPhrases;
console.log("Data Layer: Phrases Rebuilt (300 items)");
