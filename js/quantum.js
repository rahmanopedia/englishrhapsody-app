// ════════════════════════════════════════════════════════════════
//  QUANTUM GAME CENTER — Sentence Building Games
// ════════════════════════════════════════════════════════════════

const QUANTUM_SCENARIOS = [

  {
    id:'s1', icon:'🍎',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the code', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'kodu', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Kod', agent:'programcı tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s2', icon:'📚',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'suyu', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Su', agent:'öğrenci tarafından', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
  {
    id:'s3', icon:'👨‍🍳',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir salatayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir salata', agent:'benim tarafımdan', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s4', icon:'💻',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the lesson', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'dersi', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Ders', agent:'onun tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s5', icon:'🚜',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'suyu', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Su', agent:'senin tarafından', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
  {
    id:'s6', icon:'🎨',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'an apple', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir elmayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir elma', agent:'benim tarafımdan', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s7', icon:'🔬',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the website', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'web sitesini', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Web sitesi', agent:'şef tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s8', icon:'✉️',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the article', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Makale', agent:'programcı tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s9', icon:'🏥',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the computer', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bilgisayarı', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Bilgisayar', agent:'öğrenci tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s10', icon:'🏫',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the newspaper', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'gazeteyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Gazete', agent:'yazar tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s11', icon:'🌻',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'romanı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Roman', agent:'doktor tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s12', icon:'✈️',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'sistemi', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Sistem', agent:'onun tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s13', icon:'🎨',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a letter', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'bir mektubu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir mektup', agent:'şef tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s14', icon:'🔬',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the website', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'web sitesini', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Web sitesi', agent:'onun tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s15', icon:'🔧',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'a letter', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'bir mektubu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir mektup', agent:'pilot tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s16', icon:'💻',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'romanı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Roman', agent:'doktor tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s17', icon:'🚜',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'kahvaltıyı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'öğretmen tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s18', icon:'🚒',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a meal', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'bir yemeği', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir yemek', agent:'senin tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s19', icon:'👮',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'bir salatayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir salata', agent:'programcı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s20', icon:'⚖️',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the website', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'web sitesini', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Web sitesi', agent:'öğrenci tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s21', icon:'🥖',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'romanı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Roman', agent:'öğretmen tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s22', icon:'🍷',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the code', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'kodu', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Kod', agent:'onun tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s23', icon:'📷',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'an apple', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'bir elmayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir elma', agent:'pilot tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s24', icon:'🏗️',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the article', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Makale', agent:'yazar tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s25', icon:'🏆',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a cake', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'bir pastayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir pasta', agent:'senin tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s26', icon:'🎵',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a book', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'bir kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir kitap', agent:'senin tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s27', icon:'🚌',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a meal', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir yemeği', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir yemek', agent:'onun tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s28', icon:'🧵',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'sistemi', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Sistem', agent:'öğrenci tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s29', icon:'🎣',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'bir raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir rapor', agent:'doktor tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s30', icon:'🚀',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'coffee', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'kahveyi', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Kahve', agent:'benim tarafımdan', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
  {
    id:'s31', icon:'🧹',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'a book', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'bir kitabı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir kitap', agent:'senin tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s32', icon:'✏️',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'suyu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Su', agent:'senin tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s33', icon:'💼',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the article', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Makale', agent:'şef tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s34', icon:'🔍',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the computer', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'bilgisayarı', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Bilgisayar', agent:'yazar tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s35', icon:'🛡️',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the article', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Makale', agent:'benim tarafımdan', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s36', icon:'📄',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'romanı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Roman', agent:'benim tarafımdan', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s37', icon:'📊',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'sistemi', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Sistem', agent:'onun tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s38', icon:'📁',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'suyu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Su', agent:'yazar tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s39', icon:'📱',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the app', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'uygulamayı', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Uygulama', agent:'pilot tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s40', icon:'🌐',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'milk', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'sütü', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Süt', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s41', icon:'🍎',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'kahvaltıyı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Kahvaltı', agent:'senin tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s42', icon:'📚',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the lesson', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'dersi', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Ders', agent:'programcı tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s43', icon:'👨‍🍳',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'tea', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'çayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Çay', agent:'öğretmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s44', icon:'💻',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'romanı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Roman', agent:'öğrenci tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s45', icon:'🚜',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'sistemi', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Sistem', agent:'pilot tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s46', icon:'🎨',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'kahvaltıyı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'programcı tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s47', icon:'🔬',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the article', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Makale', agent:'senin tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s48', icon:'✉️',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir rapor', agent:'onun tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s49', icon:'🏥',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a pizza', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'bir pizzayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir pizza', agent:'pilot tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s50', icon:'🏫',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir rapor', agent:'benim tarafımdan', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s51', icon:'🌻',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the math', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'matematiği', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Matematik', agent:'öğretmen tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s52', icon:'✈️',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the problem', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'sorunu', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Sorun', agent:'öğretmen tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s53', icon:'🎨',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bir salatayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir salata', agent:'öğrenci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s54', icon:'🔬',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'the dinner', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'akşam yemeğini', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Akşam yemeği', agent:'doktor tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s55', icon:'🔧',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'the soup', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'çorbayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Çorba', agent:'yazar tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s56', icon:'💻',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'an apple', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'bir elmayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir elma', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s57', icon:'🚜',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'suyu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Su', agent:'onun tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s58', icon:'🚒',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a letter', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'bir mektubu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir mektup', agent:'öğretmen tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s59', icon:'👮',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a book', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir kitap', agent:'onun tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s60', icon:'⚖️',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the computer', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'bilgisayarı', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Bilgisayar', agent:'yazar tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s61', icon:'🥖',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the code', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'kodu', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Kod', agent:'benim tarafımdan', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s62', icon:'🍷',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the code', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'kodu', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Kod', agent:'öğretmen tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s63', icon:'📷',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'sistemi', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Sistem', agent:'yazar tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s64', icon:'🏗️',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a book', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'bir kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir kitap', agent:'yazar tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s65', icon:'🏆',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'the dinner', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'akşam yemeğini', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Akşam yemeği', agent:'öğrenci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s66', icon:'🎵',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir salatayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir salata', agent:'onun tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s67', icon:'🚌',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a meal', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'bir yemeği', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir yemek', agent:'programcı tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s68', icon:'🧵',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the article', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Makale', agent:'pilot tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s69', icon:'🎣',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the math', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'matematiği', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Matematik', agent:'pilot tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s70', icon:'🚀',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'coffee', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'kahveyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Kahve', agent:'öğrenci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s71', icon:'🧹',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'romanı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Roman', agent:'pilot tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s72', icon:'✏️',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'milk', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'sütü', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Süt', agent:'senin tarafından', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
  {
    id:'s73', icon:'💼',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the lesson', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'dersi', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Ders', agent:'doktor tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s74', icon:'🔍',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir rapor', agent:'benim tarafımdan', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s75', icon:'🛡️',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the math', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'matematiği', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Matematik', agent:'şef tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s76', icon:'📄',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir salatayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir salata', agent:'onun tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s77', icon:'📊',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the question', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'soruyu', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Soru', agent:'onun tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s78', icon:'📁',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a cake', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir pastayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir pasta', agent:'benim tarafımdan', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s79', icon:'📱',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'bir salatayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir salata', agent:'öğretmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s80', icon:'🌐',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a book', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir kitap', agent:'onun tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s81', icon:'🍎',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'bir salatayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir salata', agent:'doktor tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s82', icon:'📚',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'bir raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir rapor', agent:'programcı tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s83', icon:'👨‍🍳',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir salatayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir salata', agent:'benim tarafımdan', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s84', icon:'💻',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the problem', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'sorunu', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Sorun', agent:'şef tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s85', icon:'🚜',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'sistemi', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Sistem', agent:'senin tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s86', icon:'🎨',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'the soup', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'çorbayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Çorba', agent:'pilot tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s87', icon:'🔬',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'tea', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'çayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Çay', agent:'senin tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s88', icon:'✉️',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a meal', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bir yemeği', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir yemek', agent:'öğrenci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s89', icon:'🏥',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'milk', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'sütü', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Süt', agent:'onun tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s90', icon:'🏫',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'kahvaltıyı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'şef tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s91', icon:'🌻',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the problem', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'sorunu', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Sorun', agent:'öğretmen tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s92', icon:'✈️',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'the dinner', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'akşam yemeğini', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Akşam yemeği', agent:'onun tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s93', icon:'🎨',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a cake', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'bir pastayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir pasta', agent:'öğretmen tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s94', icon:'🔬',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'kahvaltıyı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'öğretmen tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s95', icon:'🔧',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'the dinner', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'akşam yemeğini', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Akşam yemeği', agent:'doktor tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s96', icon:'💻',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the newspaper', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'gazeteyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Gazete', agent:'öğretmen tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s97', icon:'🚜',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the code', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'kodu', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Kod', agent:'pilot tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s98', icon:'🚒',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'bir salatayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir salata', agent:'senin tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s99', icon:'👮',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the app', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'uygulamayı', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Uygulama', agent:'şef tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s100', icon:'⚖️',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bir raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir rapor', agent:'öğrenci tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s101', icon:'🥖',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the computer', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'bilgisayarı', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Bilgisayar', agent:'öğretmen tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s102', icon:'🍷',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'kahvaltıyı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'senin tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s103', icon:'📷',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the app', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'uygulamayı', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Uygulama', agent:'şef tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s104', icon:'🏗️',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'coffee', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'kahveyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Kahve', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s105', icon:'🏆',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a pizza', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'bir pizzayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir pizza', agent:'programcı tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s106', icon:'🎵',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'sistemi', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Sistem', agent:'onun tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s107', icon:'🚌',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the lesson', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'dersi', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Ders', agent:'pilot tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s108', icon:'🧵',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a cake', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bir pastayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir pasta', agent:'öğrenci tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s109', icon:'🎣',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'sistemi', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Sistem', agent:'şef tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s110', icon:'🚀',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the newspaper', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'gazeteyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Gazete', agent:'öğrenci tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s111', icon:'🧹',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'tea', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'çayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Çay', agent:'onun tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s112', icon:'✏️',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the computer', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'bilgisayarı', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Bilgisayar', agent:'pilot tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s113', icon:'💼',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'suyu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Su', agent:'onun tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s114', icon:'🔍',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'bir salatayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir salata', agent:'şef tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s115', icon:'🛡️',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'suyu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Su', agent:'benim tarafımdan', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s116', icon:'📄',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'bir salatayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir salata', agent:'programcı tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s117', icon:'📊',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'fix', v2:'fixed', v3:'fixed', ving:'fixing'},
    obj:{w:'the app', type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'uygulamayı', pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'], fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Uygulama', agent:'doktor tarafından', pres:['düzeltilir','düzeltilmez'], prg:['düzeltiyor','düzeltmiyor'], past:['düzeltildi','düzeltmedi'], ppas:['düzeltilmişti','düzeltmemişti'], fut:['düzeltilecek','düzeltmeyecek'] }
    }
  },
  {
    id:'s118', icon:'📁',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir rapor', agent:'onun tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s119', icon:'📱',
    subj:{w:'You', type:'you', obj_form:'you'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the newspaper', type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'gazeteyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Gazete', agent:'senin tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s120', icon:'🌐',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'the soup', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'çorbayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Çorba', agent:'yazar tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s121', icon:'🍎',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the math', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'matematiği', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Matematik', agent:'onun tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s122', icon:'📚',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'an apple', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bir elmayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir elma', agent:'öğrenci tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s123', icon:'👨‍🍳',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the question', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'soruyu', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Soru', agent:'pilot tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s124', icon:'💻',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a pizza', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'bir pizzayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir pizza', agent:'öğretmen tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s125', icon:'🚜',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'kahvaltıyı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'yazar tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s126', icon:'🎨',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the lesson', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'dersi', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Ders', agent:'öğretmen tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s127', icon:'🔬',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'the breakfast', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'kahvaltıyı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Kahvaltı', agent:'yazar tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s128', icon:'✉️',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the question', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'soruyu', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Soru', agent:'öğretmen tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s129', icon:'🏥',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'coffee', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'kahveyi', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Kahve', agent:'öğrenci tarafından', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
  {
    id:'s130', icon:'🏫',
    subj:{w:'He', type:'sg', obj_form:'him'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'a report', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir rapor', agent:'onun tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s131', icon:'🌻',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'},
    obj:{w:'the newspaper', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'gazeteyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Gazete', agent:'programcı tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s132', icon:'✈️',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'bir salatayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir salata', agent:'yazar tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s133', icon:'🎨',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'coffee', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'kahveyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Kahve', agent:'öğretmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s134', icon:'🔬',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the app', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'uygulamayı', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Uygulama', agent:'öğretmen tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s135', icon:'🔧',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'read', v2:'read', v3:'read', ving:'reading'},
    obj:{w:'the novel', type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'romanı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Roman', agent:'öğrenci tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s136', icon:'💻',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'the dinner', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'akşam yemeğini', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Akşam yemeği', agent:'pilot tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s137', icon:'🚜',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'an apple', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir elmayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir elma', agent:'benim tarafımdan', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s138', icon:'🚒',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the website', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'web sitesini', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Web sitesi', agent:'pilot tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s139', icon:'👮',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the system', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'sistemi', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Sistem', agent:'öğretmen tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s140', icon:'⚖️',
    subj:{w:'The writer', type:'sg', obj_form:'the writer'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the app', type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'uygulamayı', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Uygulama', agent:'yazar tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s141', icon:'🥖',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'tea', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'çayı', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Çay', agent:'öğretmen tarafından', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
  {
    id:'s142', icon:'🍷',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'eat', v2:'ate', v3:'eaten', ving:'eating'},
    obj:{w:'a cake', type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'bir pastayı', pres:['yer','yemez'], prg:['yiyor','yemiyor'], past:['yedi','yemedi'], ppas:['yemişti','yememişti'], fut:['yiyecek','yemeyecek'] },
      pass:{ subj:'Bir pasta', agent:'programcı tarafından', pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'], past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'], fut:['yenilecek','yenilmeyecek'] }
    }
  },
  {
    id:'s143', icon:'📷',
    subj:{w:'She', type:'sg', obj_form:'her'},
    verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'},
    obj:{w:'the website', type:'sg'},
    trData:{
      act:{ subj:'O', obj:'web sitesini', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememişti'], fut:['güncelleyecek','güncellemeyecek'] },
      pass:{ subj:'Web sitesi', agent:'onun tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] }
    }
  },
  {
    id:'s144', icon:'🏗️',
    subj:{w:'The chef', type:'sg', obj_form:'the chef'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'a salad', type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'bir salatayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Bir salata', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s145', icon:'🏆',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'teach', v2:'taught', v3:'taught', ving:'teaching'},
    obj:{w:'the problem', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'sorunu', pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'], past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'], fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Sorun', agent:'pilot tarafından', pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'], past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'], fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s146', icon:'🎵',
    subj:{w:'The pilot', type:'sg', obj_form:'the pilot'},
    verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'},
    obj:{w:'the website', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'web sitesini', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Web sitesi', agent:'pilot tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s147', icon:'🚌',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'},
    obj:{w:'the problem', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'sorunu', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] },
      pass:{ subj:'Sorun', agent:'benim tarafımdan', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s148', icon:'🧵',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'},
    obj:{w:'milk', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'sütü', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] },
      pass:{ subj:'Süt', agent:'öğretmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] }
    }
  },
  {
    id:'s149', icon:'🎣',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'},
    obj:{w:'a meal', type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'bir yemeği', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Bir yemek', agent:'öğretmen tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirmeyecek'] }
    }
  },
  {
    id:'s150', icon:'🚀',
    subj:{w:'I', type:'I', obj_form:'me'},
    verb:{v1:'drink', v2:'drank', v3:'drunk', ving:'drinking'},
    obj:{w:'water', type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'suyu', pres:['içer','içmez'], prg:['içiyor','içmiyor'], past:['içti','içmedi'], ppas:['içmişti','içmemişti'], fut:['içecek','içmeyecek'] },
      pass:{ subj:'Su', agent:'benim tarafımdan', pres:['içilir','içilmez'], prg:['içiliyor','içilmiyor'], past:['içildi','içilmedi'], ppas:['içilmişti','içilmemişti'], fut:['içilecek','içilmeyecek'] }
    }
  },
{ id:'s151', icon:'📊', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'araştırmacı tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s152', icon:'🎭', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'manage', v2:'managed', v3:'managed', ving:'managing'}, obj:{w:'the project', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'projeyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Proje', agent:'müdür tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s153', icon:'✉️', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the website', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'web sitesini', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Web sitesi', agent:'programcı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s154', icon:'📄', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'cerrah tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s155', icon:'🌉', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the license', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'lisansı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Lisans', agent:'polis tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s156', icon:'🎨', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'eczacı tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s157', icon:'🏗️', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Kitap', agent:'yazar tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s158', icon:'🌐', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Kitap', agent:'profesör tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s159', icon:'🔧', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Makale', agent:'psikolog tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s160', icon:'🚀', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the tool', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'aracı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Araç', agent:'tamirci tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s161', icon:'🔧', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Makale', agent:'araştırmacı tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s162', icon:'📊', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the website', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'web sitesini', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Web sitesi', agent:'tasarımcı tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s163', icon:'🌐', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'müdür tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s164', icon:'📱', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'tedaviyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tedavi', agent:'cerrah tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s165', icon:'🔑', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'doktor tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s166', icon:'🔑', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Rapor', agent:'doktor tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s167', icon:'🧪', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Rapor', agent:'bilim insanı tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s168', icon:'📊', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'belgeyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Belge', agent:'çevirmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s169', icon:'🚀', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'deliver', v2:'delivered', v3:'delivered', ving:'delivering'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'ekmeği', pres:['teslim eder','teslim etmez'], prg:['teslim ediyor','teslim etmiyor'], past:['teslim etti','teslim etmedi'], ppas:['teslim etmişti','teslim etmemişti'], fut:['teslim edecek','teslim etmeyecek'] }, pass:{ subj:'Ekmek', agent:'fırıncı tarafından', pres:['teslim edilir','teslim edilmez'], prg:['teslim ediliyor','teslim edilmiyor'], past:['teslim edildi','teslim edilmedi'], ppas:['teslim edilmişti','teslim edilmemişti'], fut:['teslim edilecek','teslim edilmeyecek'] } } },
  { id:'s170', icon:'📋', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'}, obj:{w:'the problem', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'sorunu', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] }, pass:{ subj:'Sorun', agent:'doktor tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] } } },
  { id:'s171', icon:'🎯', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'performansı', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Performans', agent:'şarkıcı tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s172', icon:'🎬', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'planı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Plan', agent:'antrenör tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s173', icon:'📝', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'}, obj:{w:'the soup', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'çorbayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] }, pass:{ subj:'Çorba', agent:'şef tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirilmeyecek'] } } },
  { id:'s174', icon:'🎪', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'belgeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Belge', agent:'hakim tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s175', icon:'🏆', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'install', v2:'installed', v3:'installed', ving:'installing'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sistemi', pres:['kurar','kurmaz'], prg:['kuruyor','kurmuyor'], past:['kurdu','kurmadı'], ppas:['kurmuştu','kurmamıştı'], fut:['kuracak','kurmayacak'] }, pass:{ subj:'Sistem', agent:'mühendis tarafından', pres:['kurulur','kurulmaz'], prg:['kuruluyor','kurulmuyor'], past:['kuruldu','kurulmadı'], ppas:['kurulmuştu','kurulmamıştı'], fut:['kurulacak','kurulmayacak'] } } },
  { id:'s176', icon:'🧩', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'raporu', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Rapor', agent:'muhasebeci tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s177', icon:'🔐', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'antrenör tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s178', icon:'🎯', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'invite', v2:'invited', v3:'invited', ving:'inviting'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'performansı', pres:['davet eder','davet etmez'], prg:['davet ediyor','davet etmiyor'], past:['davet etti','davet etmedi'], ppas:['davet etmişti','davet etmemişti'], fut:['davet edecek','davet etmeyecek'] }, pass:{ subj:'Performans', agent:'şarkıcı tarafından', pres:['davet edilir','davet edilmez'], prg:['davet ediliyor','davet edilmiyor'], past:['davet edildi','davet edilmedi'], ppas:['davet edilmişti','davet edilmemişti'], fut:['davet edilecek','davet edilmeyecek'] } } },
  { id:'s179', icon:'📦', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'manage', v2:'managed', v3:'managed', ving:'managing'}, obj:{w:'the library', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'kütüphaneyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Kütüphane', agent:'kütüphaneci tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s180', icon:'💻', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'çevirmen tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s181', icon:'🔐', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'translate', v2:'translated', v3:'translated', ving:'translating'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'belgeyi', pres:['çevirir','çevirmez'], prg:['çeviriyor','çevirmiyor'], past:['çevirdi','çevirmedi'], ppas:['çevirmişti','çevirmemişti'], fut:['çevirecek','çevirmeyecek'] }, pass:{ subj:'Belge', agent:'çevirmen tarafından', pres:['çevrilir','çevrilmez'], prg:['çevriliyor','çevrilmiyor'], past:['çevrildi','çevrilmedi'], ppas:['çevrilmişti','çevrilmemişti'], fut:['çevrilecek','çevrilmeyecek'] } } },
  { id:'s182', icon:'📁', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the server', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'sunucuyu', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Sunucu', agent:'programcı tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s183', icon:'🧩', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'approve', v2:'approved', v3:'approved', ving:'approving'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'bütçeyi', pres:['onaylar','onaylamaz'], prg:['onaylıyor','onaylamıyor'], past:['onayladı','onaylamadı'], ppas:['onaylamıştı','onaylamamıştı'], fut:['onaylayacak','onaylamayacak'] }, pass:{ subj:'Bütçe', agent:'yönetmen tarafından', pres:['onaylanır','onaylanmaz'], prg:['onaylanıyor','onaylanmıyor'], past:['onaylandı','onaylanmadı'], ppas:['onaylanmıştı','onaylanmamıştı'], fut:['onaylanacak','onaylanmayacak'] } } },
  { id:'s184', icon:'📋', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the house', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'evi', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Ev', agent:'itfaiyeci tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s185', icon:'🔑', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'makineyi', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Makine', agent:'elektrikçi tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s186', icon:'🏛️', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'deneyi', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Deney', agent:'araştırmacı tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s187', icon:'🔧', subj:{w:'The sailor', type:'sg', obj_form:'the sailor'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Denizci', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'denizci tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s188', icon:'☕', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'dansçı tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s189', icon:'🔧', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'binayı', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] }, pass:{ subj:'Bina', agent:'mühendis tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] } } },
  { id:'s190', icon:'☕', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'}, obj:{w:'the database', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'veritabanını', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememiş'], fut:['güncelleyecek','güncellemeyecek'] }, pass:{ subj:'Veritabanı', agent:'programcı tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] } } },
  { id:'s191', icon:'🔐', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the tool', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'aracı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Araç', agent:'çiftçi tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s192', icon:'🏆', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'öğretmen tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s193', icon:'🔑', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'planı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Plan', agent:'mimar tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s194', icon:'📚', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the program', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'programı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Program', agent:'mühendis tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s195', icon:'📝', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'makaleyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Makale', agent:'gazeteci tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s196', icon:'🎯', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the device', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'cihazı', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Cihaz', agent:'mühendis tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s197', icon:'🔭', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'ilacı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'İlaç', agent:'hemşire tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s198', icon:'🏠', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'albümü', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Albüm', agent:'müzisyen tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s199', icon:'🧩', subj:{w:'The dentist', type:'sg', obj_form:'the dentist'}, verb:{v1:'clean', v2:'cleaned', v3:'cleaned', ving:'cleaning'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Diş hekimi', obj:'aleti', pres:['temizler','temizlemez'], prg:['temizliyor','temizlemiyor'], past:['temizledi','temizlemedi'], ppas:['temizlemişti','temizlememişti'], fut:['temizleyecek','temizlemeyecek'] }, pass:{ subj:'Alet', agent:'diş hekimi tarafından', pres:['temizlenir','temizlenmez'], prg:['temizleniyor','temizlenmiyor'], past:['temizlendi','temizlenmedi'], ppas:['temizlenmişti','temizlenmemişti'], fut:['temizlenecek','temizlenmeyecek'] } } },
  { id:'s200', icon:'🏛️', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the hospital', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'hastaneyi', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Hastane', agent:'polis tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s201', icon:'🌿', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'improve', v2:'improved', v3:'improved', ving:'improving'}, obj:{w:'the program', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'programı', pres:['geliştirir','geliştirmez'], prg:['geliştiriyor','geliştirmiyor'], past:['geliştirdi','geliştirmedi'], ppas:['geliştirmişti','geliştirmemişti'], fut:['geliştirecek','geliştirmeyecek'] }, pass:{ subj:'Program', agent:'programcı tarafından', pres:['geliştirilir','geliştirilmez'], prg:['geliştiriliyor','geliştirilmiyor'], past:['geliştirildi','geliştirilmedi'], ppas:['geliştirilmişti','geliştirilmemişti'], fut:['geliştirilecek','geliştirilmeyecek'] } } },
  { id:'s202', icon:'🔐', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'sunumu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Sunum', agent:'müdür tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s203', icon:'⚗️', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the painting', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'tabloyu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tablo', agent:'sanatçı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s204', icon:'🏗️', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'heat', v2:'heated', v3:'heated', ving:'heating'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'ekmeği', pres:['ısıtır','ısıtmaz'], prg:['ısıtıyor','ısıtmıyor'], past:['ısıttı','ısıtmadı'], ppas:['ısıtmıştı','ısıtmamıştı'], fut:['ısıtacak','ısıtmayacak'] }, pass:{ subj:'Ekmek', agent:'fırıncı tarafından', pres:['ısıtılır','ısıtılmaz'], prg:['ısıtılıyor','ısıtılmıyor'], past:['ısıtıldı','ısıtılmadı'], ppas:['ısıtılmıştı','ısıtılmamıştı'], fut:['ısıtılacak','ısıtılmayacak'] } } },
  { id:'s205', icon:'🎬', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'deneyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Deney', agent:'bilim insanı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s206', icon:'💼', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Kitap', agent:'öğretmen tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s207', icon:'🔧', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'makaleyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Makale', agent:'yazar tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s208', icon:'🏛️', subj:{w:'The plumber', type:'sg', obj_form:'the plumber'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Tesisatçı', obj:'ekipmanı', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Ekipman', agent:'tesisatçı tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s209', icon:'🌉', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'bilim insanı tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s210', icon:'🔑', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the program', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'programı', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Program', agent:'programcı tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s211', icon:'📄', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'aleti', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Alet', agent:'cerrah tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s212', icon:'🏠', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'makineyi', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Makine', agent:'mühendis tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s213', icon:'📄', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'sözleşmeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Sözleşme', agent:'avukat tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s214', icon:'🎯', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'clean', v2:'cleaned', v3:'cleaned', ving:'cleaning'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'makineyi', pres:['temizler','temizlemez'], prg:['temizliyor','temizlemiyor'], past:['temizledi','temizlemedi'], ppas:['temizlemişti','temizlememişti'], fut:['temizleyecek','temizlemeyecek'] }, pass:{ subj:'Makine', agent:'tamirci tarafından', pres:['temizlenir','temizlenmez'], prg:['temizleniyor','temizlenmiyor'], past:['temizlendi','temizlenmedi'], ppas:['temizlenmişti','temizlenmemişti'], fut:['temizlenecek','temizlenmeyecek'] } } },
  { id:'s215', icon:'🧪', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'görüntüyü', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Görüntü', agent:'tasarımcı tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s216', icon:'🏗️', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'psikolog tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s217', icon:'🌿', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'dosyayı', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Dosya', agent:'programcı tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s218', icon:'🧪', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'accept', v2:'accepted', v3:'accepted', ving:'accepting'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'sözleşmeyi', pres:['kabul eder','kabul etmez'], prg:['kabul ediyor','kabul etmiyor'], past:['kabul etti','kabul etmedi'], ppas:['kabul etmişti','kabul etmemişti'], fut:['kabul edecek','kabul etmeyecek'] }, pass:{ subj:'Sözleşme', agent:'aktör tarafından', pres:['kabul edilir','kabul edilmez'], prg:['kabul ediliyor','kabul edilmiyor'], past:['kabul edildi','kabul edilmedi'], ppas:['kabul edilmişti','kabul edilmemişti'], fut:['kabul edilecek','kabul edilmeyecek'] } } },
  { id:'s219', icon:'🏗️', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'cerrah tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s220', icon:'⚗️', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Rapor', agent:'muhasebeci tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s221', icon:'🏫', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'heat', v2:'heated', v3:'heated', ving:'heating'}, obj:{w:'the soup', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'çorbayı', pres:['ısıtır','ısıtmaz'], prg:['ısıtıyor','ısıtmıyor'], past:['ısıttı','ısıtmadı'], ppas:['ısıtmıştı','ısıtmamıştı'], fut:['ısıtacak','ısıtmayacak'] }, pass:{ subj:'Çorba', agent:'şef tarafından', pres:['ısıtılır','ısıtılmaz'], prg:['ısıtılıyor','ısıtılmıyor'], past:['ısıtıldı','ısıtılmadı'], ppas:['ısıtılmıştı','ısıtılmamıştı'], fut:['ısıtılacak','ısıtılmayacak'] } } },
  { id:'s222', icon:'🎯', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'programı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Program', agent:'öğrenci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s223', icon:'🌿', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'cut', v2:'cut', v3:'cut', ving:'cutting'}, obj:{w:'the cake', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'pastayı', pres:['keser','kesmez'], prg:['kesiyor','kesmiyor'], past:['kesti','kesmedi'], ppas:['kesmişti','kesmemişti'], fut:['kesecek','kesmeyecek'] }, pass:{ subj:'Pasta', agent:'şef tarafından', pres:['kesilir','kesilmez'], prg:['kesiliyor','kesilmiyor'], past:['kesildi','kesilmedi'], ppas:['kesilmişti','kesilmemişti'], fut:['kesilecek','kesilmeyecek'] } } },
  { id:'s224', icon:'🎵', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the movie', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'filmi', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Film', agent:'aktör tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s225', icon:'🏛️', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'programı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Program', agent:'antrenör tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s226', icon:'⚗️', subj:{w:'The sailor', type:'sg', obj_form:'the sailor'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Denizci', obj:'haritayı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Harita', agent:'denizci tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s227', icon:'🌿', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'fotoğrafçı tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s228', icon:'📋', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the movie', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'filmi', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Film', agent:'yönetmen tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s229', icon:'📊', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the road', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'yolu', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Yol', agent:'asker tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s230', icon:'🔭', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'doktor tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s231', icon:'🚀', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'profesör tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s232', icon:'💼', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'atlet tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s233', icon:'🏆', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'publish', v2:'published', v3:'published', ving:'publishing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'raporu', pres:['yayınlar','yayınlamaz'], prg:['yayınlıyor','yayınlamıyor'], past:['yayınladı','yayınlamadı'], ppas:['yayınlamıştı','yayınlamamıştı'], fut:['yayınlayacak','yayınlamayacak'] }, pass:{ subj:'Rapor', agent:'araştırmacı tarafından', pres:['yayınlanır','yayınlanmaz'], prg:['yayınlanıyor','yayınlanmıyor'], past:['yayınlandı','yayınlanmadı'], ppas:['yayınlanmıştı','yayınlanmamıştı'], fut:['yayınlanacak','yayınlanmayacak'] } } },
  { id:'s234', icon:'📚', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the package', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'paketi', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Paket', agent:'şoför tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s235', icon:'📁', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'invite', v2:'invited', v3:'invited', ving:'inviting'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'performansı', pres:['davet eder','davet etmez'], prg:['davet ediyor','davet etmiyor'], past:['davet etti','davet etmedi'], ppas:['davet etmişti','davet etmemişti'], fut:['davet edecek','davet etmeyecek'] }, pass:{ subj:'Performans', agent:'aktör tarafından', pres:['davet edilir','davet edilmez'], prg:['davet ediliyor','davet edilmiyor'], past:['davet edildi','davet edilmedi'], ppas:['davet edilmişti','davet edilmemişti'], fut:['davet edilecek','davet edilmeyecek'] } } },
  { id:'s236', icon:'🎵', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'join', v2:'joined', v3:'joined', ving:'joining'}, obj:{w:'the concert', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'konseri', pres:['katılır','katılmaz'], prg:['katılıyor','katılmıyor'], past:['katıldı','katılmadı'], ppas:['katılmıştı','katılmamıştı'], fut:['katılacak','katılmayacak'] }, pass:{ subj:'Konser', agent:'dansçı tarafından', pres:['katılınır','katılınmaz'], prg:['katılınıyor','katılınmıyor'], past:['katılındı','katılınmadı'], ppas:['katılınmıştı','katılınmamıştı'], fut:['katılınacak','katılınmayacak'] } } },
  { id:'s237', icon:'💼', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'sort', v2:'sorted', v3:'sorted', ving:'sorting'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'kitabı', pres:['sıralar','sıralamaz'], prg:['sıralıyor','sıralamıyor'], past:['sıraladı','sıralamadı'], ppas:['sıralamıştı','sıralamamıştı'], fut:['sıralayacak','sıralamayacak'] }, pass:{ subj:'Kitap', agent:'kütüphaneci tarafından', pres:['sıralanır','sıralanmaz'], prg:['sıralanıyor','sıralanmıyor'], past:['sıralandı','sıralanmadı'], ppas:['sıralanmıştı','sıralanmamıştı'], fut:['sıralanacak','sıralanmayacak'] } } },
  { id:'s238', icon:'🏠', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'collect', v2:'collected', v3:'collected', ving:'collecting'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'kitabı', pres:['toplar','toplamaz'], prg:['topluyor','toplamıyor'], past:['topladı','toplamadı'], ppas:['toplamıştı','toplamamıştı'], fut:['toplayacak','toplamayacak'] }, pass:{ subj:'Kitap', agent:'kütüphaneci tarafından', pres:['toplanır','toplanmaz'], prg:['toplanıyor','toplanmıyor'], past:['toplandı','toplanmadı'], ppas:['toplanmıştı','toplanmamıştı'], fut:['toplanacak','toplanmayacak'] } } },
  { id:'s239', icon:'🧪', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'hide', v2:'hid', v3:'hidden', ving:'hiding'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'belgeyi', pres:['saklar','saklamaz'], prg:['saklıyor','saklamıyor'], past:['sakladı','saklamadı'], ppas:['saklamıştı','saklamamıştı'], fut:['saklayacak','saklamayacak'] }, pass:{ subj:'Belge', agent:'avukat tarafından', pres:['saklanır','saklanmaz'], prg:['saklanıyor','saklanmıyor'], past:['saklandı','saklanmadı'], ppas:['saklanmıştı','saklanmamıştı'], fut:['saklanacak','saklanmayacak'] } } },
  { id:'s240', icon:'🔑', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'antrenör tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s241', icon:'📊', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'heat', v2:'heated', v3:'heated', ving:'heating'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'yemeği', pres:['ısıtır','ısıtmaz'], prg:['ısıtıyor','ısıtmıyor'], past:['ısıttı','ısıtmadı'], ppas:['ısıtmıştı','ısıtmamıştı'], fut:['ısıtacak','ısıtmayacak'] }, pass:{ subj:'Yemek', agent:'şef tarafından', pres:['ısıtılır','ısıtılmaz'], prg:['ısıtılıyor','ısıtılmıyor'], past:['ısıtıldı','ısıtılmadı'], ppas:['ısıtılmıştı','ısıtılmamıştı'], fut:['ısıtılacak','ısıtılmayacak'] } } },
  { id:'s242', icon:'🔭', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the video', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'videoyu', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Video', agent:'gazeteci tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s243', icon:'📚', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'antrenör tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s244', icon:'📝', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'belgeyi', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Belge', agent:'yazar tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s245', icon:'🏥', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'leave', v2:'left', v3:'left', ving:'leaving'}, obj:{w:'the forest', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'ormanı', pres:['terk eder','terk etmez'], prg:['terk ediyor','terk etmiyor'], past:['terk etti','terk etmedi'], ppas:['terk etmişti','terk etmemişti'], fut:['terk edecek','terk etmeyecek'] }, pass:{ subj:'Orman', agent:'kaşif tarafından', pres:['terk edilir','terk edilmez'], prg:['terk ediliyor','terk edilmiyor'], past:['terk edildi','terk edilmedi'], ppas:['terk edilmişti','terk edilmemişti'], fut:['terk edilecek','terk edilmeyecek'] } } },
  { id:'s246', icon:'🏠', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'hakim tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s247', icon:'🌐', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'approve', v2:'approved', v3:'approved', ving:'approving'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'sözleşmeyi', pres:['onaylar','onaylamaz'], prg:['onaylıyor','onaylamıyor'], past:['onayladı','onaylamadı'], ppas:['onaylamıştı','onaylamamıştı'], fut:['onaylayacak','onaylamayacak'] }, pass:{ subj:'Sözleşme', agent:'avukat tarafından', pres:['onaylanır','onaylanmaz'], prg:['onaylanıyor','onaylanmıyor'], past:['onaylandı','onaylanmadı'], ppas:['onaylanmıştı','onaylanmamıştı'], fut:['onaylanacak','onaylanmayacak'] } } },
  { id:'s248', icon:'🧪', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'çiftçi tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s249', icon:'🔬', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'görüntüyü', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] }, pass:{ subj:'Görüntü', agent:'sanatçı tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] } } },
  { id:'s250', icon:'🏠', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'tedaviyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Tedavi', agent:'hemşire tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s251', icon:'📊', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'ilacı', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'İlaç', agent:'hemşire tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s252', icon:'🎭', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'manage', v2:'managed', v3:'managed', ving:'managing'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'bütçeyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Bütçe', agent:'müdür tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s253', icon:'🚀', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'psikolog tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s254', icon:'🎪', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'take', v2:'took', v3:'taken', ving:'taking'}, obj:{w:'the test', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'testi', pres:['alır','almaz'], prg:['alıyor','almıyor'], past:['aldı','almadı'], ppas:['almıştı','almamıştı'], fut:['alacak','almayacak'] }, pass:{ subj:'Test', agent:'öğrenci tarafından', pres:['alınır','alınmaz'], prg:['alınıyor','alınmıyor'], past:['alındı','alınmadı'], ppas:['alınmıştı','alınmamıştı'], fut:['alınacak','alınmayacak'] } } },
  { id:'s255', icon:'🏆', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'doktor tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s256', icon:'📁', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'planı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Plan', agent:'atlet tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s257', icon:'⚗️', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'dosyayı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Dosya', agent:'öğrenci tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s258', icon:'🏆', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'planı', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Plan', agent:'mimar tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s259', icon:'📦', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'programı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Program', agent:'profesör tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s260', icon:'🧪', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'makineyi', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Makine', agent:'mühendis tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s261', icon:'🏥', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'ekipmanı', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Ekipman', agent:'astronot tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s262', icon:'⚗️', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'planı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Plan', agent:'avukat tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s263', icon:'💼', subj:{w:'The plumber', type:'sg', obj_form:'the plumber'}, verb:{v1:'install', v2:'installed', v3:'installed', ving:'installing'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Tesisatçı', obj:'sistemi', pres:['kurar','kurmaz'], prg:['kuruyor','kurmuyor'], past:['kurdu','kurmadı'], ppas:['kurmuştu','kurmamıştı'], fut:['kuracak','kurmayacak'] }, pass:{ subj:'Sistem', agent:'tesisatçı tarafından', pres:['kurulur','kurulmaz'], prg:['kuruluyor','kurulmuyor'], past:['kuruldu','kurulmadı'], ppas:['kurulmuştu','kurulmamıştı'], fut:['kurulacak','kurulmayacak'] } } },
  { id:'s264', icon:'🔬', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'dosyayı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Dosya', agent:'avukat tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s265', icon:'🚀', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'albümü', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Albüm', agent:'fotoğrafçı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s266', icon:'💼', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'haritayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Harita', agent:'kaptan tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s267', icon:'✉️', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'reject', v2:'rejected', v3:'rejected', ving:'rejecting'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'tedaviyi', pres:['reddeder','reddetmez'], prg:['reddediyor','reddetmiyor'], past:['reddetti','reddetmedi'], ppas:['reddetmişti','reddetmemişti'], fut:['reddedecek','reddetmeyecek'] }, pass:{ subj:'Tedavi', agent:'doktor tarafından', pres:['reddedilir','reddedilmez'], prg:['reddediliyor','reddedilmiyor'], past:['reddedildi','reddedilmedi'], ppas:['reddedilmişti','reddedilmemişti'], fut:['reddedilecek','reddedilmeyecek'] } } },
  { id:'s268', icon:'🎪', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the recipe', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'tarifi', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Tarif', agent:'fırıncı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s269', icon:'📚', subj:{w:'The plumber', type:'sg', obj_form:'the plumber'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Tesisatçı', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'tesisatçı tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s270', icon:'📊', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'raporu', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Rapor', agent:'araştırmacı tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s271', icon:'📊', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'binayı', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Bina', agent:'itfaiyeci tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s272', icon:'🎯', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'hakim tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s273', icon:'💻', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'draw', v2:'drew', v3:'drawn', ving:'drawing'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'görüntüyü', pres:['çizer','çizmez'], prg:['çiziyor','çizmiyor'], past:['çizdi','çizmedi'], ppas:['çizmişti','çizmemişti'], fut:['çizecek','çizmeyecek'] }, pass:{ subj:'Görüntü', agent:'tasarımcı tarafından', pres:['çizilir','çizilmez'], prg:['çiziliyor','çizilmiyor'], past:['çizildi','çizilmedi'], ppas:['çizilmişti','çizilmemişti'], fut:['çizilecek','çizilmeyecek'] } } },
  { id:'s274', icon:'💻', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'}, obj:{w:'the application', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'uygulamayı', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememiş'], fut:['güncelleyecek','güncellemeyecek'] }, pass:{ subj:'Uygulama', agent:'programcı tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] } } },
  { id:'s275', icon:'🔐', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'accept', v2:'accepted', v3:'accepted', ving:'accepting'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'tedaviyi', pres:['kabul eder','kabul etmez'], prg:['kabul ediyor','kabul etmiyor'], past:['kabul etti','kabul etmedi'], ppas:['kabul etmişti','kabul etmemişti'], fut:['kabul edecek','kabul etmeyecek'] }, pass:{ subj:'Tedavi', agent:'doktor tarafından', pres:['kabul edilir','kabul edilmez'], prg:['kabul ediliyor','kabul edilmiyor'], past:['kabul edildi','kabul edilmedi'], ppas:['kabul edilmişti','kabul edilmemişti'], fut:['kabul edilecek','kabul edilmeyecek'] } } },
  { id:'s276', icon:'📋', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'publish', v2:'published', v3:'published', ving:'publishing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'makaleyi', pres:['yayınlar','yayınlamaz'], prg:['yayınlıyor','yayınlamıyor'], past:['yayınladı','yayınlamadı'], ppas:['yayınlamıştı','yayınlamamıştı'], fut:['yayınlayacak','yayınlamayacak'] }, pass:{ subj:'Makale', agent:'gazeteci tarafından', pres:['yayınlanır','yayınlanmaz'], prg:['yayınlanıyor','yayınlanmıyor'], past:['yayınlandı','yayınlanmadı'], ppas:['yayınlanmıştı','yayınlanmamıştı'], fut:['yayınlanacak','yayınlanmayacak'] } } },
  { id:'s277', icon:'🌿', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'öğretmen tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s278', icon:'🎬', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'dansçı tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s279', icon:'⚗️', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'araştırmacı tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s280', icon:'💼', subj:{w:'The sailor', type:'sg', obj_form:'the sailor'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Denizci', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'denizci tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s281', icon:'💊', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'belgeyi', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Belge', agent:'muhasebeci tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s282', icon:'🚀', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'muhabir tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s283', icon:'📁', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'aleti', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Alet', agent:'cerrah tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s284', icon:'🎭', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'invite', v2:'invited', v3:'invited', ving:'inviting'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'toplantıyı', pres:['davet eder','davet etmez'], prg:['davet ediyor','davet etmiyor'], past:['davet etti','davet etmedi'], ppas:['davet etmişti','davet etmemişti'], fut:['davet edecek','davet etmeyecek'] }, pass:{ subj:'Toplantı', agent:'yönetmen tarafından', pres:['davet edilir','davet edilmez'], prg:['davet ediliyor','davet edilmiyor'], past:['davet edildi','davet edilmedi'], ppas:['davet edilmişti','davet edilmemişti'], fut:['davet edilecek','davet edilmeyecek'] } } },
  { id:'s285', icon:'🎭', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'psikolog tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s286', icon:'🌉', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Rapor', agent:'doktor tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s287', icon:'⚗️', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the novel', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'romanı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Roman', agent:'yazar tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s288', icon:'🏠', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'bütçeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bütçe', agent:'müdür tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s289', icon:'🌐', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'avukat tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s290', icon:'📋', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'raporu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Rapor', agent:'psikolog tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s291', icon:'🏠', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sistemi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Sistem', agent:'mühendis tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s292', icon:'🔬', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'give', v2:'gave', v3:'given', ving:'giving'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'tedaviyi', pres:['verir','vermez'], prg:['veriyor','vermiyor'], past:['verdi','vermedi'], ppas:['vermişti','vermemişti'], fut:['verecek','vermeyecek'] }, pass:{ subj:'Tedavi', agent:'psikolog tarafından', pres:['verilir','verilmez'], prg:['veriliyor','verilmiyor'], past:['verildi','verilmedi'], ppas:['verilmişti','verilmemişti'], fut:['verilecek','verilmeyecek'] } } },
  { id:'s293', icon:'🏫', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'accept', v2:'accepted', v3:'accepted', ving:'accepting'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'sözleşmeyi', pres:['kabul eder','kabul etmez'], prg:['kabul ediyor','kabul etmiyor'], past:['kabul etti','kabul etmedi'], ppas:['kabul etmişti','kabul etmemişti'], fut:['kabul edecek','kabul etmeyecek'] }, pass:{ subj:'Sözleşme', agent:'avukat tarafından', pres:['kabul edilir','kabul edilmez'], prg:['kabul ediliyor','kabul edilmiyor'], past:['kabul edildi','kabul edilmedi'], ppas:['kabul edilmişti','kabul edilmemişti'], fut:['kabul edilecek','kabul edilmeyecek'] } } },
  { id:'s294', icon:'🎯', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Rapor', agent:'psikolog tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s295', icon:'🔐', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'kaptan tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s296', icon:'🚀', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the soup', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'çorbayı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Çorba', agent:'garson tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s297', icon:'📋', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'}, obj:{w:'the website', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'web sitesini', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] }, pass:{ subj:'Web sitesi', agent:'programcı tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] } } },
  { id:'s298', icon:'🍕', subj:{w:'The dentist', type:'sg', obj_form:'the dentist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Diş hekimi', obj:'tedaviyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tedavi', agent:'diş hekimi tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s299', icon:'🏥', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'mühendis tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s300', icon:'📁', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'makaleyi', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Makale', agent:'yazar tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s301', icon:'🌉', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'enter', v2:'entered', v3:'entered', ving:'entering'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'binayı', pres:['girer','girmez'], prg:['giriyor','girmiyor'], past:['girdi','girmedi'], ppas:['girmişti','girmemişti'], fut:['girecek','girmeyecek'] }, pass:{ subj:'Bina', agent:'itfaiyeci tarafından', pres:['girilir','girilmez'], prg:['giriliyor','girilmiyor'], past:['girildi','girilmedi'], ppas:['girilmişti','girilmemişti'], fut:['girilecek','girilmeyecek'] } } },
  { id:'s302', icon:'📊', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'}, obj:{w:'the website', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'web sitesini', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememiş'], fut:['güncelleyecek','güncellemeyecek'] }, pass:{ subj:'Web sitesi', agent:'tasarımcı tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] } } },
  { id:'s303', icon:'📊', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'albümü', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Albüm', agent:'fotoğrafçı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s304', icon:'🔧', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'}, obj:{w:'the website', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'web sitesini', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] }, pass:{ subj:'Web sitesi', agent:'tasarımcı tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] } } },
  { id:'s305', icon:'🏆', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'update', v2:'updated', v3:'updated', ving:'updating'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sistemi', pres:['günceller','güncellemez'], prg:['güncelliyor','güncellemiyor'], past:['güncelledi','güncellemedi'], ppas:['güncellemişti','güncellememiş'], fut:['güncelleyecek','güncellemeyecek'] }, pass:{ subj:'Sistem', agent:'mühendis tarafından', pres:['güncellenir','güncellenmez'], prg:['güncelleniyor','güncellenmiyor'], past:['güncellendi','güncellenmedi'], ppas:['güncellenmişti','güncellenmemişti'], fut:['güncellenecek','güncellenmeyecek'] } } },
  { id:'s306', icon:'🏗️', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'binayı', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] }, pass:{ subj:'Bina', agent:'mimar tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] } } },
  { id:'s307', icon:'📄', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'serve', v2:'served', v3:'served', ving:'serving'}, obj:{w:'the soup', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'çorbayı', pres:['servis eder','servis etmez'], prg:['servis ediyor','servis etmiyor'], past:['servis etti','servis etmedi'], ppas:['servis etmişti','servis etmemişti'], fut:['servis edecek','servis etmeyecek'] }, pass:{ subj:'Çorba', agent:'garson tarafından', pres:['servis edilir','servis edilmez'], prg:['servis ediliyor','servis edilmiyor'], past:['servis edildi','servis edilmedi'], ppas:['servis edilmişti','servis edilmemişti'], fut:['servis edilecek','servis edilmeyecek'] } } },
  { id:'s308', icon:'📦', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'serve', v2:'served', v3:'served', ving:'serving'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'yemeği', pres:['servis eder','servis etmez'], prg:['servis ediyor','servis etmiyor'], past:['servis etti','servis etmedi'], ppas:['servis etmişti','servis etmemişti'], fut:['servis edecek','servis etmeyecek'] }, pass:{ subj:'Yemek', agent:'şef tarafından', pres:['servis edilir','servis edilmez'], prg:['servis ediliyor','servis edilmiyor'], past:['servis edildi','servis edilmedi'], ppas:['servis edilmişti','servis edilmemişti'], fut:['servis edilecek','servis edilmeyecek'] } } },
  { id:'s309', icon:'💻', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the bridge', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'köprüyü', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Köprü', agent:'mimar tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s310', icon:'🏆', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'count', v2:'counted', v3:'counted', ving:'counting'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'bütçeyi', pres:['sayar','saymaz'], prg:['sayıyor','saymıyor'], past:['saydı','saymadı'], ppas:['saymıştı','saymamıştı'], fut:['sayacak','saymayacak'] }, pass:{ subj:'Bütçe', agent:'muhasebeci tarafından', pres:['sayılır','sayılmaz'], prg:['sayılıyor','sayılmıyor'], past:['sayıldı','sayılmadı'], ppas:['sayılmıştı','sayılmamıştı'], fut:['sayılacak','sayılmayacak'] } } },
  { id:'s311', icon:'🌍', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the cake', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'pastayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Pasta', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s312', icon:'🔑', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'raporu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Rapor', agent:'doktor tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s313', icon:'🔧', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'ekonomist tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s314', icon:'🎭', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'raporu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Rapor', agent:'muhabir tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s315', icon:'🚀', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'planı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Plan', agent:'yönetmen tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s316', icon:'🔑', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the painting', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'tabloyu', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Tablo', agent:'sanatçı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s317', icon:'🏫', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'makineyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Makine', agent:'tamirci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s318', icon:'🔐', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'aleti', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Alet', agent:'cerrah tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s319', icon:'📦', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'makineyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Makine', agent:'astronot tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s320', icon:'🍕', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'freeze', v2:'froze', v3:'frozen', ving:'freezing'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'yemeği', pres:['dondurur','dondurmaz'], prg:['donduruyor','dondurmuyor'], past:['dondurdu','dondurmadı'], ppas:['dondurmuştu','dondurmamıştı'], fut:['donduracak','dondurmayacak'] }, pass:{ subj:'Yemek', agent:'şef tarafından', pres:['dondurulur','dondurulmaz'], prg:['donduruluyor','dondurulmuyor'], past:['donduruldu','dondurulmadı'], ppas:['dondurulmuştu','dondurulmamıştı'], fut:['dondurulacak','dondurulmayacak'] } } },
  { id:'s321', icon:'🚀', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'sell', v2:'sold', v3:'sold', ving:'selling'}, obj:{w:'the photo', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'fotoğrafı', pres:['satar','satmaz'], prg:['satıyor','satmıyor'], past:['sattı','satmadı'], ppas:['satmıştı','satmamıştı'], fut:['satacak','satmayacak'] }, pass:{ subj:'Fotoğraf', agent:'fotoğrafçı tarafından', pres:['satılır','satılmaz'], prg:['satılıyor','satılmıyor'], past:['satıldı','satılmadı'], ppas:['satılmıştı','satılmamıştı'], fut:['satılacak','satılmayacak'] } } },
  { id:'s322', icon:'📚', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'belgeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Belge', agent:'polis tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s323', icon:'💼', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'install', v2:'installed', v3:'installed', ving:'installing'}, obj:{w:'the device', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'cihazı', pres:['kurar','kurmaz'], prg:['kuruyor','kurmuyor'], past:['kurdu','kurmadı'], ppas:['kurmuştu','kurmamıştı'], fut:['kuracak','kurmayacak'] }, pass:{ subj:'Cihaz', agent:'elektrikçi tarafından', pres:['kurulur','kurulmaz'], prg:['kuruluyor','kurulmuyor'], past:['kuruldu','kurulmadı'], ppas:['kurulmuştu','kurulmamıştı'], fut:['kurulacak','kurulmayacak'] } } },
  { id:'s324', icon:'💊', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'approve', v2:'approved', v3:'approved', ving:'approving'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'belgeyi', pres:['onaylar','onaylamaz'], prg:['onaylıyor','onaylamıyor'], past:['onayladı','onaylamadı'], ppas:['onaylamıştı','onaylamamıştı'], fut:['onaylayacak','onaylamayacak'] }, pass:{ subj:'Belge', agent:'hakim tarafından', pres:['onaylanır','onaylanmaz'], prg:['onaylanıyor','onaylanmıyor'], past:['onaylandı','onaylanmadı'], ppas:['onaylanmıştı','onaylanmamıştı'], fut:['onaylanacak','onaylanmayacak'] } } },
  { id:'s325', icon:'🔑', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'sell', v2:'sold', v3:'sold', ving:'selling'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'albümü', pres:['satar','satmaz'], prg:['satıyor','satmıyor'], past:['sattı','satmadı'], ppas:['satmıştı','satmamıştı'], fut:['satacak','satmayacak'] }, pass:{ subj:'Albüm', agent:'şarkıcı tarafından', pres:['satılır','satılmaz'], prg:['satılıyor','satılmıyor'], past:['satıldı','satılmadı'], ppas:['satılmıştı','satılmamıştı'], fut:['satılacak','satılmayacak'] } } },
  { id:'s326', icon:'☕', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'harvest', v2:'harvested', v3:'harvested', ving:'harvesting'}, obj:{w:'the field', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'tarlayı', pres:['biçer','biçmez'], prg:['biçiyor','biçmiyor'], past:['biçti','biçmedi'], ppas:['biçmişti','biçmemişti'], fut:['biçecek','biçmeyecek'] }, pass:{ subj:'Tarla', agent:'çiftçi tarafından', pres:['biçilir','biçilmez'], prg:['biçiliyor','biçilmiyor'], past:['biçildi','biçilmedi'], ppas:['biçilmişti','biçilmemişti'], fut:['biçilecek','biçilmeyecek'] } } },
  { id:'s327', icon:'🧩', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'measure', v2:'measured', v3:'measured', ving:'measuring'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'binayı', pres:['ölçer','ölçmez'], prg:['ölçüyor','ölçmüyor'], past:['ölçtü','ölçmedi'], ppas:['ölçmüştü','ölçmemişti'], fut:['ölçecek','ölçmeyecek'] }, pass:{ subj:'Bina', agent:'mimar tarafından', pres:['ölçülür','ölçülmez'], prg:['ölçülüyor','ölçülmüyor'], past:['ölçüldü','ölçülmedi'], ppas:['ölçülmüştü','ölçülmemişti'], fut:['ölçülecek','ölçülmeyecek'] } } },
  { id:'s328', icon:'📋', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'itfaiyeci tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s329', icon:'🏥', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'sunumu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Sunum', agent:'profesör tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s330', icon:'📋', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'deneyi', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Deney', agent:'araştırmacı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s331', icon:'💻', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'yemeği', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Yemek', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s332', icon:'📚', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'translate', v2:'translated', v3:'translated', ving:'translating'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'makaleyi', pres:['çevirir','çevirmez'], prg:['çeviriyor','çevirmiyor'], past:['çevirdi','çevirmedi'], ppas:['çevirmişti','çevirmemişti'], fut:['çevirecek','çevirmeyecek'] }, pass:{ subj:'Makale', agent:'çevirmen tarafından', pres:['çevrilir','çevrilmez'], prg:['çevriliyor','çevrilmiyor'], past:['çevrildi','çevrilmedi'], ppas:['çevrilmişti','çevrilmemişti'], fut:['çevrilecek','çevrilmeyecek'] } } },
  { id:'s333', icon:'🔬', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'sunumu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Sunum', agent:'müdür tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s334', icon:'🌍', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'serve', v2:'served', v3:'served', ving:'serving'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'yemeği', pres:['servis eder','servis etmez'], prg:['servis ediyor','servis etmiyor'], past:['servis etti','servis etmedi'], ppas:['servis etmişti','servis etmemişti'], fut:['servis edecek','servis etmeyecek'] }, pass:{ subj:'Yemek', agent:'garson tarafından', pres:['servis edilir','servis edilmez'], prg:['servis ediliyor','servis edilmiyor'], past:['servis edildi','servis edilmedi'], ppas:['servis edilmişti','servis edilmemişti'], fut:['servis edilecek','servis edilmeyecek'] } } },
  { id:'s335', icon:'📄', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'reach', v2:'reached', v3:'reached', ving:'reaching'}, obj:{w:'the river', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'nehri', pres:['ulaşır','ulaşmaz'], prg:['ulaşıyor','ulaşmıyor'], past:['ulaştı','ulaşmadı'], ppas:['ulaşmıştı','ulaşmamıştı'], fut:['ulaşacak','ulaşmayacak'] }, pass:{ subj:'Nehir', agent:'kaşif tarafından', pres:['ulaşılır','ulaşılmaz'], prg:['ulaşılıyor','ulaşılmıyor'], past:['ulaşıldı','ulaşılmadı'], ppas:['ulaşılmıştı','ulaşılmamıştı'], fut:['ulaşılacak','ulaşılmayacak'] } } },
  { id:'s336', icon:'🚀', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'görüntüyü', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Görüntü', agent:'programcı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s337', icon:'🏆', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the recipe', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'tarifi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tarif', agent:'şef tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s338', icon:'🏗️', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'ilacı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'İlaç', agent:'doktor tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s339', icon:'💊', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the video', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'videoyu', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Video', agent:'astronot tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s340', icon:'🏆', subj:{w:'The pilot', type:'sg', obj_form:'the pilot'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Pilot', obj:'haritayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Harita', agent:'pilot tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s341', icon:'📄', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'dosyayı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Dosya', agent:'muhasebeci tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s342', icon:'📱', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'tedaviyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Tedavi', agent:'doktor tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s343', icon:'💊', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'yemeği', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Yemek', agent:'garson tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s344', icon:'🧪', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'distribute', v2:'distributed', v3:'distributed', ving:'distributing'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'ekmeği', pres:['dağıtır','dağıtmaz'], prg:['dağıtıyor','dağıtmıyor'], past:['dağıttı','dağıtmadı'], ppas:['dağıtmıştı','dağıtmamıştı'], fut:['dağıtacak','dağıtmayacak'] }, pass:{ subj:'Ekmek', agent:'fırıncı tarafından', pres:['dağıtılır','dağıtılmaz'], prg:['dağıtılıyor','dağıtılmıyor'], past:['dağıtıldı','dağıtılmadı'], ppas:['dağıtılmıştı','dağıtılmamıştı'], fut:['dağıtılacak','dağıtılmayacak'] } } },
  { id:'s345', icon:'🌉', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'publish', v2:'published', v3:'published', ving:'publishing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'makaleyi', pres:['yayınlar','yayınlamaz'], prg:['yayınlıyor','yayınlamıyor'], past:['yayınladı','yayınlamadı'], ppas:['yayınlamıştı','yayınlamamıştı'], fut:['yayınlayacak','yayınlamayacak'] }, pass:{ subj:'Makale', agent:'profesör tarafından', pres:['yayınlanır','yayınlanmaz'], prg:['yayınlanıyor','yayınlanmıyor'], past:['yayınlandı','yayınlanmadı'], ppas:['yayınlanmıştı','yayınlanmamıştı'], fut:['yayınlanacak','yayınlanmayacak'] } } },
  { id:'s346', icon:'🌉', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'bilim insanı tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s347', icon:'💻', subj:{w:'The pilot', type:'sg', obj_form:'the pilot'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Pilot', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'pilot tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s348', icon:'🔭', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'gazeteci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s349', icon:'🚀', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'sell', v2:'sold', v3:'sold', ving:'selling'}, obj:{w:'the product', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'ürünü', pres:['satar','satmaz'], prg:['satıyor','satmıyor'], past:['sattı','satmadı'], ppas:['satmıştı','satmamıştı'], fut:['satacak','satmayacak'] }, pass:{ subj:'Ürün', agent:'çiftçi tarafından', pres:['satılır','satılmaz'], prg:['satılıyor','satılmıyor'], past:['satıldı','satılmadı'], ppas:['satılmıştı','satılmamıştı'], fut:['satılacak','satılmayacak'] } } },
  { id:'s350', icon:'🏫', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'reach', v2:'reached', v3:'reached', ving:'reaching'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'binayı', pres:['ulaşır','ulaşmaz'], prg:['ulaşıyor','ulaşmıyor'], past:['ulaştı','ulaşmadı'], ppas:['ulaşmıştı','ulaşmamıştı'], fut:['ulaşacak','ulaşmayacak'] }, pass:{ subj:'Bina', agent:'itfaiyeci tarafından', pres:['ulaşılır','ulaşılmaz'], prg:['ulaşılıyor','ulaşılmıyor'], past:['ulaşıldı','ulaşılmadı'], ppas:['ulaşılmıştı','ulaşılmamıştı'], fut:['ulaşılacak','ulaşılmayacak'] } } },
  { id:'s351', icon:'🔑', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'mühendis tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s352', icon:'🔑', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the chart', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'grafiği', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Grafik', agent:'ekonomist tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s353', icon:'🌉', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the bridge', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'köprüyü', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Köprü', agent:'asker tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s354', icon:'🌐', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'measure', v2:'measured', v3:'measured', ving:'measuring'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'aleti', pres:['ölçer','ölçmez'], prg:['ölçüyor','ölçmüyor'], past:['ölçtü','ölçmedi'], ppas:['ölçmüştü','ölçmemişti'], fut:['ölçecek','ölçmeyecek'] }, pass:{ subj:'Alet', agent:'mühendis tarafından', pres:['ölçülür','ölçülmez'], prg:['ölçülüyor','ölçülmüyor'], past:['ölçüldü','ölçülmedi'], ppas:['ölçülmüştü','ölçülmemişti'], fut:['ölçülecek','ölçülmeyecek'] } } },
  { id:'s355', icon:'🔬', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'planı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Plan', agent:'mimar tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s356', icon:'🧩', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'elektrikçi tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s357', icon:'⚗️', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'sanatçı tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s358', icon:'💼', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'albümü', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Albüm', agent:'şarkıcı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s359', icon:'🚀', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'dosyayı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Dosya', agent:'araştırmacı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s360', icon:'📁', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'connect', v2:'connected', v3:'connected', ving:'connecting'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'sistemi', pres:['bağlar','bağlamaz'], prg:['bağlıyor','bağlamıyor'], past:['bağladı','bağlamadı'], ppas:['bağlamıştı','bağlamamıştı'], fut:['bağlayacak','bağlamayacak'] }, pass:{ subj:'Sistem', agent:'elektrikçi tarafından', pres:['bağlanır','bağlanmaz'], prg:['bağlanıyor','bağlanmıyor'], past:['bağlandı','bağlanmadı'], ppas:['bağlanmıştı','bağlanmamıştı'], fut:['bağlanacak','bağlanmayacak'] } } },
  { id:'s361', icon:'📦', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'leave', v2:'left', v3:'left', ving:'leaving'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'binayı', pres:['terk eder','terk etmez'], prg:['terk ediyor','terk etmiyor'], past:['terk etti','terk etmedi'], ppas:['terk etmişti','terk etmemişti'], fut:['terk edecek','terk etmeyecek'] }, pass:{ subj:'Bina', agent:'asker tarafından', pres:['terk edilir','terk edilmez'], prg:['terk ediliyor','terk edilmiyor'], past:['terk edildi','terk edilmedi'], ppas:['terk edilmişti','terk edilmemişti'], fut:['terk edilecek','terk edilmeyecek'] } } },
  { id:'s362', icon:'💼', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'deliver', v2:'delivered', v3:'delivered', ving:'delivering'}, obj:{w:'the package', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'paketi', pres:['teslim eder','teslim etmez'], prg:['teslim ediyor','teslim etmiyor'], past:['teslim etti','teslim etmedi'], ppas:['teslim etmişti','teslim etmemişti'], fut:['teslim edecek','teslim etmeyecek'] }, pass:{ subj:'Paket', agent:'şoför tarafından', pres:['teslim edilir','teslim edilmez'], prg:['teslim ediliyor','teslim edilmiyor'], past:['teslim edildi','teslim edilmedi'], ppas:['teslim edilmişti','teslim edilmemişti'], fut:['teslim edilecek','teslim edilmeyecek'] } } },
  { id:'s363', icon:'💻', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'pour', v2:'poured', v3:'poured', ving:'pouring'}, obj:{w:'the wine', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'şarabı', pres:['döker','dökmez'], prg:['döküyor','dökmüyor'], past:['döktü','dökmedi'], ppas:['dökmüştü','dökmemişti'], fut:['dökecek','dökmeyecek'] }, pass:{ subj:'Şarap', agent:'garson tarafından', pres:['dökülür','dökülmez'], prg:['dökülüyor','dökülmüyor'], past:['döküldü','dökülmedi'], ppas:['dökülmüştü','dökülmemişti'], fut:['dökülecek','dökülmeyecek'] } } },
  { id:'s364', icon:'🎵', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'order', v2:'ordered', v3:'ordered', ving:'ordering'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'yemeği', pres:['sipariş verir','sipariş vermez'], prg:['sipariş veriyor','sipariş vermiyor'], past:['sipariş verdi','sipariş vermedi'], ppas:['sipariş vermişti','sipariş vermemişti'], fut:['sipariş verecek','sipariş vermeyecek'] }, pass:{ subj:'Yemek', agent:'garson tarafından', pres:['sipariş verilir','sipariş verilmez'], prg:['sipariş veriliyor','sipariş verilmiyor'], past:['sipariş verildi','sipariş verilmedi'], ppas:['sipariş verilmişti','sipariş verilmemişti'], fut:['sipariş verilecek','sipariş verilmeyecek'] } } },
  { id:'s365', icon:'🔐', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'bütçeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bütçe', agent:'yönetmen tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s366', icon:'🚀', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'cut', v2:'cut', v3:'cut', ving:'cutting'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'ekmeği', pres:['keser','kesmez'], prg:['kesiyor','kesmiyor'], past:['kesti','kesmedi'], ppas:['kesmişti','kesmemişti'], fut:['kesecek','kesmeyecek'] }, pass:{ subj:'Ekmek', agent:'fırıncı tarafından', pres:['kesilir','kesilmez'], prg:['kesiliyor','kesilmiyor'], past:['kesildi','kesilmedi'], ppas:['kesilmişti','kesilmemişti'], fut:['kesilecek','kesilmeyecek'] } } },
  { id:'s367', icon:'🔭', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'asker tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s368', icon:'⚗️', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'measure', v2:'measured', v3:'measured', ving:'measuring'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'örneği', pres:['ölçer','ölçmez'], prg:['ölçüyor','ölçmüyor'], past:['ölçtü','ölçmedi'], ppas:['ölçmüştü','ölçmemişti'], fut:['ölçecek','ölçmeyecek'] }, pass:{ subj:'Örnek', agent:'bilim insanı tarafından', pres:['ölçülür','ölçülmez'], prg:['ölçülüyor','ölçülmüyor'], past:['ölçüldü','ölçülmedi'], ppas:['ölçülmüştü','ölçülmemişti'], fut:['ölçülecek','ölçülmeyecek'] } } },
  { id:'s369', icon:'⚗️', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'plant', v2:'planted', v3:'planted', ving:'planting'}, obj:{w:'the field', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'tarlayı', pres:['diker','dikmez'], prg:['dikiyor','dikmiyor'], past:['dikti','dikmedi'], ppas:['dikmişti','dikmemişti'], fut:['dikecek','dikmeyecek'] }, pass:{ subj:'Tarla', agent:'çiftçi tarafından', pres:['dikilir','dikilmez'], prg:['dikiliyor','dikilmiyor'], past:['dikildi','dikilmedi'], ppas:['dikilmişti','dikilmemişti'], fut:['dikilecek','dikilmeyecek'] } } },
  { id:'s370', icon:'📋', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'improve', v2:'improved', v3:'improved', ving:'improving'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'planı', pres:['geliştirir','geliştirmez'], prg:['geliştiriyor','geliştirmiyor'], past:['geliştirdi','geliştirmedi'], ppas:['geliştirmişti','geliştirmemişti'], fut:['geliştirecek','geliştirmeyecek'] }, pass:{ subj:'Plan', agent:'antrenör tarafından', pres:['geliştirilir','geliştirilmez'], prg:['geliştiriliyor','geliştirilmiyor'], past:['geliştirildi','geliştirilmedi'], ppas:['geliştirilmişti','geliştirilmemişti'], fut:['geliştirilecek','geliştirilmeyecek'] } } },
  { id:'s371', icon:'📚', subj:{w:'The plumber', type:'sg', obj_form:'the plumber'}, verb:{v1:'connect', v2:'connected', v3:'connected', ving:'connecting'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Tesisatçı', obj:'ekipmanı', pres:['bağlar','bağlamaz'], prg:['bağlıyor','bağlamıyor'], past:['bağladı','bağlamadı'], ppas:['bağlamıştı','bağlamamıştı'], fut:['bağlayacak','bağlamayacak'] }, pass:{ subj:'Ekipman', agent:'tesisatçı tarafından', pres:['bağlanır','bağlanmaz'], prg:['bağlanıyor','bağlanmıyor'], past:['bağlandı','bağlanmadı'], ppas:['bağlanmıştı','bağlanmamıştı'], fut:['bağlanacak','bağlanmayacak'] } } },
  { id:'s372', icon:'📊', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'lead', v2:'led', v3:'led', ving:'leading'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'toplantıyı', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Toplantı', agent:'müdür tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s373', icon:'📱', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'enter', v2:'entered', v3:'entered', ving:'entering'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'gemiyi', pres:['girer','girmez'], prg:['giriyor','girmiyor'], past:['girdi','girmedi'], ppas:['girmişti','girmemişti'], fut:['girecek','girmeyecek'] }, pass:{ subj:'Gemi', agent:'kaptan tarafından', pres:['girilir','girilmez'], prg:['giriliyor','girilmiyor'], past:['girildi','girilmedi'], ppas:['girilmişti','girilmemişti'], fut:['girilecek','girilmeyecek'] } } },
  { id:'s374', icon:'🏗️', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'arabayı', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Araba', agent:'polis tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s375', icon:'📚', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'accept', v2:'accepted', v3:'accepted', ving:'accepting'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'sözleşmeyi', pres:['kabul eder','kabul etmez'], prg:['kabul ediyor','kabul etmiyor'], past:['kabul etti','kabul etmedi'], ppas:['kabul etmişti','kabul etmemişti'], fut:['kabul edecek','kabul etmeyecek'] }, pass:{ subj:'Sözleşme', agent:'hakim tarafından', pres:['kabul edilir','kabul edilmez'], prg:['kabul ediliyor','kabul edilmiyor'], past:['kabul edildi','kabul edilmedi'], ppas:['kabul edilmişti','kabul edilmemişti'], fut:['kabul edilecek','kabul edilmeyecek'] } } },
  { id:'s376', icon:'🎭', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'publish', v2:'published', v3:'published', ving:'publishing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'makaleyi', pres:['yayınlar','yayınlamaz'], prg:['yayınlıyor','yayınlamıyor'], past:['yayınladı','yayınlamadı'], ppas:['yayınlamıştı','yayınlamamıştı'], fut:['yayınlayacak','yayınlamayacak'] }, pass:{ subj:'Makale', agent:'bilim insanı tarafından', pres:['yayınlanır','yayınlanmaz'], prg:['yayınlanıyor','yayınlanmıyor'], past:['yayınlandı','yayınlanmadı'], ppas:['yayınlanmıştı','yayınlanmamıştı'], fut:['yayınlanacak','yayınlanmayacak'] } } },
  { id:'s377', icon:'🎵', subj:{w:'The pilot', type:'sg', obj_form:'the pilot'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Pilot', obj:'raporu', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Rapor', agent:'pilot tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s378', icon:'🔬', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'raporu', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Rapor', agent:'profesör tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s379', icon:'📋', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'programı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Program', agent:'kaptan tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s380', icon:'✉️', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the song', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'şarkıyı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Şarkı', agent:'şarkıcı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s381', icon:'🔬', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'arabayı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Araba', agent:'polis tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s382', icon:'🔧', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'müzisyen tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s383', icon:'📋', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'makaleyi', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Makale', agent:'muhabir tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s384', icon:'🌉', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'change', v2:'changed', v3:'changed', ving:'changing'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'planı', pres:['değiştirir','değiştirmez'], prg:['değiştiriyor','değiştirmiyor'], past:['değiştirdi','değiştirmedi'], ppas:['değiştirmişti','değiştirmemişti'], fut:['değiştirecek','değiştirmeyecek'] }, pass:{ subj:'Plan', agent:'antrenör tarafından', pres:['değiştirilir','değiştirilmez'], prg:['değiştiriliyor','değiştirilmiyor'], past:['değiştirildi','değiştirilmedi'], ppas:['değiştirilmişti','değiştirilmemişti'], fut:['değiştirilecek','değiştirilmeyecek'] } } },
  { id:'s385', icon:'🍕', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'bütçeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bütçe', agent:'muhasebeci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s386', icon:'🎪', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'connect', v2:'connected', v3:'connected', ving:'connecting'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sistemi', pres:['bağlar','bağlamaz'], prg:['bağlıyor','bağlamıyor'], past:['bağladı','bağlamadı'], ppas:['bağlamıştı','bağlamamıştı'], fut:['bağlayacak','bağlamayacak'] }, pass:{ subj:'Sistem', agent:'mühendis tarafından', pres:['bağlanır','bağlanmaz'], prg:['bağlanıyor','bağlanmıyor'], past:['bağlandı','bağlanmadı'], ppas:['bağlanmıştı','bağlanmamıştı'], fut:['bağlanacak','bağlanmayacak'] } } },
  { id:'s387', icon:'⚗️', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Kitap', agent:'öğrenci tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s388', icon:'🏥', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'haritayı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Harita', agent:'kaptan tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s389', icon:'✉️', subj:{w:'The sailor', type:'sg', obj_form:'the sailor'}, verb:{v1:'leave', v2:'left', v3:'left', ving:'leaving'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Denizci', obj:'gemiyi', pres:['terk eder','terk etmez'], prg:['terk ediyor','terk etmiyor'], past:['terk etti','terk etmedi'], ppas:['terk etmişti','terk etmemişti'], fut:['terk edecek','terk etmeyecek'] }, pass:{ subj:'Gemi', agent:'denizci tarafından', pres:['terk edilir','terk edilmez'], prg:['terk ediliyor','terk edilmiyor'], past:['terk edildi','terk edilmedi'], ppas:['terk edilmişti','terk edilmemişti'], fut:['terk edilecek','terk edilmeyecek'] } } },
  { id:'s390', icon:'🏫', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'reject', v2:'rejected', v3:'rejected', ving:'rejecting'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'sözleşmeyi', pres:['reddeder','reddetmez'], prg:['reddediyor','reddetmiyor'], past:['reddetti','reddetmedi'], ppas:['reddetmişti','reddetmemişti'], fut:['reddedecek','reddetmeyecek'] }, pass:{ subj:'Sözleşme', agent:'avukat tarafından', pres:['reddedilir','reddedilmez'], prg:['reddediliyor','reddedilmiyor'], past:['reddedildi','reddedilmedi'], ppas:['reddedilmişti','reddedilmemişti'], fut:['reddedilecek','reddedilmeyecek'] } } },
  { id:'s391', icon:'🏗️', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'raporu', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Rapor', agent:'ekonomist tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s392', icon:'🌉', subj:{w:'The psychologist', type:'sg', obj_form:'the psychologist'}, verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'}, obj:{w:'the problem', type:'sg'}, trData:{ act:{ subj:'Psikolog', obj:'sorunu', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] }, pass:{ subj:'Sorun', agent:'psikolog tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] } } },
  { id:'s393', icon:'📱', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'reject', v2:'rejected', v3:'rejected', ving:'rejecting'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'sözleşmeyi', pres:['reddeder','reddetmez'], prg:['reddediyor','reddetmiyor'], past:['reddetti','reddetmedi'], ppas:['reddetmişti','reddetmemişti'], fut:['reddedecek','reddetmeyecek'] }, pass:{ subj:'Sözleşme', agent:'hakim tarafından', pres:['reddedilir','reddedilmez'], prg:['reddediliyor','reddedilmiyor'], past:['reddedildi','reddedilmedi'], ppas:['reddedilmişti','reddedilmemişti'], fut:['reddedilecek','reddedilmeyecek'] } } },
  { id:'s394', icon:'🏗️', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'kitabı', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Kitap', agent:'öğrenci tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s395', icon:'📱', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'arabayı', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Araba', agent:'tamirci tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s396', icon:'🎬', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'hemşire tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s397', icon:'💊', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'belgeyi', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Belge', agent:'çevirmen tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s398', icon:'🏥', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the video', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'videoyu', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Video', agent:'fotoğrafçı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s399', icon:'✉️', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'install', v2:'installed', v3:'installed', ving:'installing'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'ekipmanı', pres:['kurar','kurmaz'], prg:['kuruyor','kurmuyor'], past:['kurdu','kurmadı'], ppas:['kurmuştu','kurmamıştı'], fut:['kuracak','kurmayacak'] }, pass:{ subj:'Ekipman', agent:'tamirci tarafından', pres:['kurulur','kurulmaz'], prg:['kuruluyor','kurulmuyor'], past:['kuruldu','kurulmadı'], ppas:['kurulmuştu','kurulmamıştı'], fut:['kurulacak','kurulmayacak'] } } },
  { id:'s400', icon:'🏆', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'manage', v2:'managed', v3:'managed', ving:'managing'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'gemiyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Gemi', agent:'kaptan tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s401', icon:'🎯', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'ekipmanı', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Ekipman', agent:'sanatçı tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s402', icon:'🔐', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'yemeği', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] }, pass:{ subj:'Yemek', agent:'şef tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirilmeyecek'] } } },
  { id:'s403', icon:'🎬', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'manage', v2:'managed', v3:'managed', ving:'managing'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'bütçeyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Bütçe', agent:'ekonomist tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s404', icon:'🚀', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'give', v2:'gave', v3:'given', ving:'giving'}, obj:{w:'the vaccine', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'aşıyı', pres:['verir','vermez'], prg:['veriyor','vermiyor'], past:['verdi','vermedi'], ppas:['vermişti','vermemişti'], fut:['verecek','vermeyecek'] }, pass:{ subj:'Aşı', agent:'hemşire tarafından', pres:['verilir','verilmez'], prg:['veriliyor','verilmiyor'], past:['verildi','verilmedi'], ppas:['verilmişti','verilmemişti'], fut:['verilecek','verilmeyecek'] } } },
  { id:'s405', icon:'🏠', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'distribute', v2:'distributed', v3:'distributed', ving:'distributing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'makaleyi', pres:['dağıtır','dağıtmaz'], prg:['dağıtıyor','dağıtmıyor'], past:['dağıttı','dağıtmadı'], ppas:['dağıtmıştı','dağıtmamıştı'], fut:['dağıtacak','dağıtmayacak'] }, pass:{ subj:'Makale', agent:'profesör tarafından', pres:['dağıtılır','dağıtılmaz'], prg:['dağıtılıyor','dağıtılmıyor'], past:['dağıtıldı','dağıtılmadı'], ppas:['dağıtılmıştı','dağıtılmamıştı'], fut:['dağıtılacak','dağıtılmayacak'] } } },
  { id:'s406', icon:'⚗️', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the story', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'hikayeyi', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Hikaye', agent:'muhabir tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s407', icon:'📝', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'programı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Program', agent:'aktör tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s408', icon:'📱', subj:{w:'The pilot', type:'sg', obj_form:'the pilot'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Pilot', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'pilot tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s409', icon:'✉️', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the video', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'videoyu', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Video', agent:'muhabir tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s410', icon:'🏆', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'approve', v2:'approved', v3:'approved', ving:'approving'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'raporu', pres:['onaylar','onaylamaz'], prg:['onaylıyor','onaylamıyor'], past:['onayladı','onaylamadı'], ppas:['onaylamıştı','onaylamamıştı'], fut:['onaylayacak','onaylamayacak'] }, pass:{ subj:'Rapor', agent:'hakim tarafından', pres:['onaylanır','onaylanmaz'], prg:['onaylanıyor','onaylanmıyor'], past:['onaylandı','onaylanmadı'], ppas:['onaylanmıştı','onaylanmamıştı'], fut:['onaylanacak','onaylanmayacak'] } } },
  { id:'s411', icon:'🚀', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'pour', v2:'poured', v3:'poured', ving:'pouring'}, obj:{w:'the coffee', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'kahveyi', pres:['döker','dökmez'], prg:['döküyor','dökmüyor'], past:['döktü','dökmedi'], ppas:['dökmüştü','dökmemişti'], fut:['dökecek','dökmeyecek'] }, pass:{ subj:'Kahve', agent:'garson tarafından', pres:['dökülür','dökülmez'], prg:['dökülüyor','dökülmüyor'], past:['döküldü','dökülmedi'], ppas:['dökülmüştü','dökülmemişti'], fut:['dökülecek','dökülmeyecek'] } } },
  { id:'s412', icon:'🧪', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the painting', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'tabloyu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Tablo', agent:'sanatçı tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s413', icon:'🔑', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'ekonomist tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s414', icon:'🎯', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'elektrikçi tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s415', icon:'🎵', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'performansı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Performans', agent:'dansçı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s416', icon:'💻', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'binayı', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Bina', agent:'asker tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s417', icon:'🎨', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'hemşire tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s418', icon:'📚', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'upload', v2:'uploaded', v3:'uploaded', ving:'uploading'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'görüntüyü', pres:['yükler','yüklemez'], prg:['yüklüyor','yüklemiyor'], past:['yükledi','yüklemedi'], ppas:['yüklemişti','yüklememiş'], fut:['yükleyecek','yüklemeyecek'] }, pass:{ subj:'Görüntü', agent:'fotoğrafçı tarafından', pres:['yüklenir','yüklenmez'], prg:['yükleniyor','yüklenmiyor'], past:['yüklendi','yüklenmedi'], ppas:['yüklenmişti','yüklenmemişti'], fut:['yüklenecek','yüklenmeyecek'] } } },
  { id:'s419', icon:'🏫', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'pack', v2:'packed', v3:'packed', ving:'packing'}, obj:{w:'the cake', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'pastayı', pres:['paketler','paketlemez'], prg:['paketliyor','paketlemiyor'], past:['paketledi','paketlemedi'], ppas:['paketlemişti','paketlememişti'], fut:['paketleyecek','paketlemeyecek'] }, pass:{ subj:'Pasta', agent:'fırıncı tarafından', pres:['paketlenir','paketlenmez'], prg:['paketleniyor','paketlenmiyor'], past:['paketlendi','paketlenmedi'], ppas:['paketlenmişti','paketlenmemişti'], fut:['paketlenecek','paketlenmeyecek'] } } },
  { id:'s420', icon:'🎭', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'give', v2:'gave', v3:'given', ving:'giving'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'ilacı', pres:['verir','vermez'], prg:['veriyor','vermiyor'], past:['verdi','vermedi'], ppas:['vermişti','vermemişti'], fut:['verecek','vermeyecek'] }, pass:{ subj:'İlaç', agent:'doktor tarafından', pres:['verilir','verilmez'], prg:['veriliyor','verilmiyor'], past:['verildi','verilmedi'], ppas:['verilmişti','verilmemişti'], fut:['verilecek','verilmeyecek'] } } },
  { id:'s421', icon:'🎬', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'sistemi', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Sistem', agent:'elektrikçi tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s422', icon:'📋', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'kitabı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Kitap', agent:'kütüphaneci tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s423', icon:'🏠', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the device', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'cihazı', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Cihaz', agent:'mühendis tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s424', icon:'💊', subj:{w:'The dentist', type:'sg', obj_form:'the dentist'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Diş hekimi', obj:'aleti', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Alet', agent:'diş hekimi tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s425', icon:'🌍', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the concert', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'konseri', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Konser', agent:'şarkıcı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s426', icon:'📄', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'performansı', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Performans', agent:'müzisyen tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s427', icon:'🏥', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'give', v2:'gave', v3:'given', ving:'giving'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'ilacı', pres:['verir','vermez'], prg:['veriyor','vermiyor'], past:['verdi','vermedi'], ppas:['vermişti','vermemişti'], fut:['verecek','vermeyecek'] }, pass:{ subj:'İlaç', agent:'hemşire tarafından', pres:['verilir','verilmez'], prg:['veriliyor','verilmiyor'], past:['verildi','verilmedi'], ppas:['verilmişti','verilmemişti'], fut:['verilecek','verilmeyecek'] } } },
  { id:'s428', icon:'🧪', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'raporu', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Rapor', agent:'müdür tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s429', icon:'📚', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'bütçeyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Bütçe', agent:'müdür tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s430', icon:'🔐', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'enter', v2:'entered', v3:'entered', ving:'entering'}, obj:{w:'the forest', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'ormanı', pres:['girer','girmez'], prg:['giriyor','girmiyor'], past:['girdi','girmedi'], ppas:['girmişti','girmemişti'], fut:['girecek','girmeyecek'] }, pass:{ subj:'Orman', agent:'kaşif tarafından', pres:['girilir','girilmez'], prg:['giriliyor','girilmiyor'], past:['girildi','girilmedi'], ppas:['girilmişti','girilmemişti'], fut:['girilecek','girilmeyecek'] } } },
  { id:'s431', icon:'📁', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'pour', v2:'poured', v3:'poured', ving:'pouring'}, obj:{w:'the juice', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'suyu', pres:['döker','dökmez'], prg:['döküyor','dökmüyor'], past:['döktü','dökmedi'], ppas:['dökmüştü','dökmemişti'], fut:['dökecek','dökmeyecek'] }, pass:{ subj:'Su', agent:'garson tarafından', pres:['dökülür','dökülmez'], prg:['dökülüyor','dökülmüyor'], past:['döküldü','dökülmedi'], ppas:['dökülmüştü','dökülmemişti'], fut:['dökülecek','dökülmeyecek'] } } },
  { id:'s432', icon:'🔐', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'programı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Program', agent:'öğretmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s433', icon:'📋', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'measure', v2:'measured', v3:'measured', ving:'measuring'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'ekipmanı', pres:['ölçer','ölçmez'], prg:['ölçüyor','ölçmüyor'], past:['ölçtü','ölçmedi'], ppas:['ölçmüştü','ölçmemişti'], fut:['ölçecek','ölçmeyecek'] }, pass:{ subj:'Ekipman', agent:'mühendis tarafından', pres:['ölçülür','ölçülmez'], prg:['ölçülüyor','ölçülmüyor'], past:['ölçüldü','ölçülmedi'], ppas:['ölçülmüştü','ölçülmemişti'], fut:['ölçülecek','ölçülmeyecek'] } } },
  { id:'s434', icon:'🧩', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'leave', v2:'left', v3:'left', ving:'leaving'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'binayı', pres:['terk eder','terk etmez'], prg:['terk ediyor','terk etmiyor'], past:['terk etti','terk etmedi'], ppas:['terk etmişti','terk etmemişti'], fut:['terk edecek','terk etmeyecek'] }, pass:{ subj:'Bina', agent:'itfaiyeci tarafından', pres:['terk edilir','terk edilmez'], prg:['terk ediliyor','terk edilmiyor'], past:['terk edildi','terk edilmedi'], ppas:['terk edilmişti','terk edilmemişti'], fut:['terk edilecek','terk edilmeyecek'] } } },
  { id:'s435', icon:'🏥', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'atlet tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s436', icon:'📁', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the database', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'veritabanını', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Veritabanı', agent:'programcı tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s437', icon:'🏫', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'belgeyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Belge', agent:'hakim tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s438', icon:'🌍', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'take', v2:'took', v3:'taken', ving:'taking'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'örneği', pres:['alır','almaz'], prg:['alıyor','almıyor'], past:['aldı','almadı'], ppas:['almıştı','almamıştı'], fut:['alacak','almayacak'] }, pass:{ subj:'Örnek', agent:'hemşire tarafından', pres:['alınır','alınmaz'], prg:['alınıyor','alınmıyor'], past:['alındı','alınmadı'], ppas:['alınmıştı','alınmamıştı'], fut:['alınacak','alınmayacak'] } } },
  { id:'s439', icon:'🔬', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'binayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bina', agent:'polis tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s440', icon:'🧩', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'bütçeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bütçe', agent:'ekonomist tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s441', icon:'🧪', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'görüntüyü', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Görüntü', agent:'tasarımcı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s442', icon:'✉️', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'raporu', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Rapor', agent:'öğretmen tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s443', icon:'🏫', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'sunumu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Sunum', agent:'profesör tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s444', icon:'📝', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'raporu', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Rapor', agent:'ekonomist tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s445', icon:'🔬', subj:{w:'The judge', type:'sg', obj_form:'the judge'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Hakim', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'hakim tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s446', icon:'📄', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'makaleyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Makale', agent:'yazar tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s447', icon:'🔭', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'enter', v2:'entered', v3:'entered', ving:'entering'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'arabayı', pres:['girer','girmez'], prg:['giriyor','girmiyor'], past:['girdi','girmedi'], ppas:['girmişti','girmemişti'], fut:['girecek','girmeyecek'] }, pass:{ subj:'Araba', agent:'şoför tarafından', pres:['girilir','girilmez'], prg:['giriliyor','girilmiyor'], past:['girildi','girilmedi'], ppas:['girilmişti','girilmemişti'], fut:['girilecek','girilmeyecek'] } } },
  { id:'s448', icon:'🏥', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'deliver', v2:'delivered', v3:'delivered', ving:'delivering'}, obj:{w:'the meal', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'yemeği', pres:['teslim eder','teslim etmez'], prg:['teslim ediyor','teslim etmiyor'], past:['teslim etti','teslim etmedi'], ppas:['teslim etmişti','teslim etmemişti'], fut:['teslim edecek','teslim etmeyecek'] }, pass:{ subj:'Yemek', agent:'garson tarafından', pres:['teslim edilir','teslim edilmez'], prg:['teslim ediliyor','teslim edilmiyor'], past:['teslim edildi','teslim edilmedi'], ppas:['teslim edilmişti','teslim edilmemişti'], fut:['teslim edilecek','teslim edilmeyecek'] } } },
  { id:'s449', icon:'📋', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'performansı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Performans', agent:'aktör tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s450', icon:'🔬', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'hemşire tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s451', icon:'🎵', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the song', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'şarkıyı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Şarkı', agent:'müzisyen tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s452', icon:'🧪', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'collect', v2:'collected', v3:'collected', ving:'collecting'}, obj:{w:'the product', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'ürünü', pres:['toplar','toplamaz'], prg:['topluyor','toplamıyor'], past:['topladı','toplamadı'], ppas:['toplamıştı','toplamamıştı'], fut:['toplayacak','toplamayacak'] }, pass:{ subj:'Ürün', agent:'çiftçi tarafından', pres:['toplanır','toplanmaz'], prg:['toplanıyor','toplanmıyor'], past:['toplandı','toplanmadı'], ppas:['toplanmıştı','toplanmamıştı'], fut:['toplanacak','toplanmayacak'] } } },
  { id:'s453', icon:'📋', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'binayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bina', agent:'itfaiyeci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s454', icon:'🏛️', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the problem', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'sorunu', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Sorun', agent:'doktor tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s455', icon:'🏗️', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'belgeyi', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Belge', agent:'polis tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s456', icon:'🍕', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'improve', v2:'improved', v3:'improved', ving:'improving'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'planı', pres:['geliştirir','geliştirmez'], prg:['geliştiriyor','geliştirmiyor'], past:['geliştirdi','geliştirmedi'], ppas:['geliştirmişti','geliştirmemişti'], fut:['geliştirecek','geliştirmeyecek'] }, pass:{ subj:'Plan', agent:'mimar tarafından', pres:['geliştirilir','geliştirilmez'], prg:['geliştiriliyor','geliştirilmiyor'], past:['geliştirildi','geliştirilmedi'], ppas:['geliştirilmişti','geliştirilmemişti'], fut:['geliştirilecek','geliştirilmeyecek'] } } },
  { id:'s457', icon:'🏫', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'makaleyi', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Makale', agent:'gazeteci tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s458', icon:'🌐', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'bütçeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bütçe', agent:'muhasebeci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s459', icon:'📋', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'solve', v2:'solved', v3:'solved', ving:'solving'}, obj:{w:'the problem', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sorunu', pres:['çözer','çözmez'], prg:['çözüyor','çözmüyor'], past:['çözdü','çözmedi'], ppas:['çözmüştü','çözmemişti'], fut:['çözecek','çözmeyecek'] }, pass:{ subj:'Sorun', agent:'mühendis tarafından', pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'], past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'], fut:['çözülecek','çözülmeyecek'] } } },
  { id:'s460', icon:'🎭', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'raporu', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Rapor', agent:'ekonomist tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s461', icon:'📱', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the vaccine', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'aşıyı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Aşı', agent:'hemşire tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s462', icon:'✉️', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'reach', v2:'reached', v3:'reached', ving:'reaching'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'binayı', pres:['ulaşır','ulaşmaz'], prg:['ulaşıyor','ulaşmıyor'], past:['ulaştı','ulaşmadı'], ppas:['ulaşmıştı','ulaşmamıştı'], fut:['ulaşacak','ulaşmayacak'] }, pass:{ subj:'Bina', agent:'şoför tarafından', pres:['ulaşılır','ulaşılmaz'], prg:['ulaşılıyor','ulaşılmıyor'], past:['ulaşıldı','ulaşılmadı'], ppas:['ulaşılmıştı','ulaşılmamıştı'], fut:['ulaşılacak','ulaşılmayacak'] } } },
  { id:'s463', icon:'💼', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s464', icon:'🚀', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'manage', v2:'managed', v3:'managed', ving:'managing'}, obj:{w:'the project', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'projeyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Proje', agent:'yönetmen tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s465', icon:'🌉', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'mix', v2:'mixed', v3:'mixed', ving:'mixing'}, obj:{w:'the salad', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'salatayı', pres:['karıştırır','karıştırmaz'], prg:['karıştırıyor','karıştırmıyor'], past:['karıştırdı','karıştırmadı'], ppas:['karıştırmıştı','karıştırmamıştı'], fut:['karıştıracak','karıştırmayacak'] }, pass:{ subj:'Salata', agent:'şef tarafından', pres:['karıştırılır','karıştırılmaz'], prg:['karıştırılıyor','karıştırılmıyor'], past:['karıştırıldı','karıştırılmadı'], ppas:['karıştırılmıştı','karıştırılmamıştı'], fut:['karıştırılacak','karıştırılmayacak'] } } },
  { id:'s466', icon:'🎵', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'ekipmanı', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Ekipman', agent:'antrenör tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s467', icon:'📱', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'deneyi', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Deney', agent:'bilim insanı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s468', icon:'🚀', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'hide', v2:'hid', v3:'hidden', ving:'hiding'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'belgeyi', pres:['saklar','saklamaz'], prg:['saklıyor','saklamıyor'], past:['sakladı','saklamadı'], ppas:['saklamıştı','saklamamıştı'], fut:['saklayacak','saklamayacak'] }, pass:{ subj:'Belge', agent:'eczacı tarafından', pres:['saklanır','saklanmaz'], prg:['saklanıyor','saklanmıyor'], past:['saklandı','saklanmadı'], ppas:['saklanmıştı','saklanmamıştı'], fut:['saklanacak','saklanmayacak'] } } },
  { id:'s469', icon:'🌐', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'programı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Program', agent:'atlet tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s470', icon:'📝', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the field', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'tarlayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Tarla', agent:'çiftçi tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s471', icon:'🔑', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'mix', v2:'mixed', v3:'mixed', ving:'mixing'}, obj:{w:'the coffee', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'kahveyi', pres:['karıştırır','karıştırmaz'], prg:['karıştırıyor','karıştırmıyor'], past:['karıştırdı','karıştırmadı'], ppas:['karıştırmıştı','karıştırmamıştı'], fut:['karıştıracak','karıştırmayacak'] }, pass:{ subj:'Kahve', agent:'şef tarafından', pres:['karıştırılır','karıştırılmaz'], prg:['karıştırılıyor','karıştırılmıyor'], past:['karıştırıldı','karıştırılmadı'], ppas:['karıştırılmıştı','karıştırılmamıştı'], fut:['karıştırılacak','karıştırılmayacak'] } } },
  { id:'s472', icon:'☕', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the concert', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'konseri', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Konser', agent:'müzisyen tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s473', icon:'🎵', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'aleti', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Alet', agent:'müzisyen tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s474', icon:'💼', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'müdür tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s475', icon:'🧩', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the program', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'programı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Program', agent:'programcı tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s476', icon:'🌍', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'sunumu', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Sunum', agent:'öğretmen tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s477', icon:'📦', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'measure', v2:'measured', v3:'measured', ving:'measuring'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['ölçer','ölçmez'], prg:['ölçüyor','ölçmüyor'], past:['ölçtü','ölçmedi'], ppas:['ölçmüştü','ölçmemişti'], fut:['ölçecek','ölçmeyecek'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['ölçülür','ölçülmez'], prg:['ölçülüyor','ölçülmüyor'], past:['ölçüldü','ölçülmedi'], ppas:['ölçülmüştü','ölçülmemişti'], fut:['ölçülecek','ölçülmeyecek'] } } },
  { id:'s478', icon:'🚀', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the project', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'projeyi', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Proje', agent:'müdür tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s479', icon:'🔬', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the tool', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'aracı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Araç', agent:'tamirci tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s480', icon:'🌐', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the movie', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'filmi', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Film', agent:'aktör tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s481', icon:'📦', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Makale', agent:'öğrenci tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s482', icon:'🌉', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s483', icon:'🏫', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'itfaiyeci tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s484', icon:'🔧', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'doktor tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s485', icon:'📋', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'fotoğrafçı tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s486', icon:'🎨', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the school', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'okulu', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Okul', agent:'polis tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s487', icon:'💻', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'upload', v2:'uploaded', v3:'uploaded', ving:'uploading'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'dosyayı', pres:['yükler','yüklemez'], prg:['yüklüyor','yüklemiyor'], past:['yükledi','yüklemedi'], ppas:['yüklemişti','yüklememiş'], fut:['yükleyecek','yüklemeyecek'] }, pass:{ subj:'Dosya', agent:'programcı tarafından', pres:['yüklenir','yüklenmez'], prg:['yükleniyor','yüklenmiyor'], past:['yüklendi','yüklenmedi'], ppas:['yüklenmişti','yüklenmemişti'], fut:['yüklenecek','yüklenmeyecek'] } } },
  { id:'s488', icon:'✉️', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'sort', v2:'sorted', v3:'sorted', ving:'sorting'}, obj:{w:'the database', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'veritabanını', pres:['sıralar','sıralamaz'], prg:['sıralıyor','sıralamıyor'], past:['sıraladı','sıralamadı'], ppas:['sıralamıştı','sıralamamıştı'], fut:['sıralayacak','sıralamayacak'] }, pass:{ subj:'Veritabanı', agent:'programcı tarafından', pres:['sıralanır','sıralanmaz'], prg:['sıralanıyor','sıralanmıyor'], past:['sıralandı','sıralanmadı'], ppas:['sıralanmıştı','sıralanmamıştı'], fut:['sıralanacak','sıralanmayacak'] } } },
  { id:'s489', icon:'🌐', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'atlet tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s490', icon:'🚀', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'arabayı', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Araba', agent:'tamirci tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s491', icon:'📋', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'haritayı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Harita', agent:'şoför tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s492', icon:'🏆', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'bütçeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Bütçe', agent:'ekonomist tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s493', icon:'📝', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'collect', v2:'collected', v3:'collected', ving:'collecting'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'örneği', pres:['toplar','toplamaz'], prg:['topluyor','toplamıyor'], past:['topladı','toplamadı'], ppas:['toplamıştı','toplamamıştı'], fut:['toplayacak','toplamayacak'] }, pass:{ subj:'Örnek', agent:'araştırmacı tarafından', pres:['toplanır','toplanmaz'], prg:['toplanıyor','toplanmıyor'], past:['toplandı','toplanmadı'], ppas:['toplanmıştı','toplanmamıştı'], fut:['toplanacak','toplanmayacak'] } } },
  { id:'s494', icon:'📁', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'serve', v2:'served', v3:'served', ving:'serving'}, obj:{w:'the coffee', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'kahveyi', pres:['servis eder','servis etmez'], prg:['servis ediyor','servis etmiyor'], past:['servis etti','servis etmedi'], ppas:['servis etmişti','servis etmemişti'], fut:['servis edecek','servis etmeyecek'] }, pass:{ subj:'Kahve', agent:'garson tarafından', pres:['servis edilir','servis edilmez'], prg:['servis ediliyor','servis edilmiyor'], past:['servis edildi','servis edilmedi'], ppas:['servis edilmişti','servis edilmemişti'], fut:['servis edilecek','servis edilmeyecek'] } } },
  { id:'s495', icon:'🌐', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'yazar tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s496', icon:'🌍', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'asker tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s497', icon:'📦', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'makaleyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Makale', agent:'çevirmen tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s498', icon:'🔧', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'invite', v2:'invited', v3:'invited', ving:'inviting'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'performansı', pres:['davet eder','davet etmez'], prg:['davet ediyor','davet etmiyor'], past:['davet etti','davet etmedi'], ppas:['davet etmişti','davet etmemişti'], fut:['davet edecek','davet etmeyecek'] }, pass:{ subj:'Performans', agent:'müzisyen tarafından', pres:['davet edilir','davet edilmez'], prg:['davet ediliyor','davet edilmiyor'], past:['davet edildi','davet edilmedi'], ppas:['davet edilmişti','davet edilmemişti'], fut:['davet edilecek','davet edilmeyecek'] } } },
  { id:'s499', icon:'🔧', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'reach', v2:'reached', v3:'reached', ving:'reaching'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'binayı', pres:['ulaşır','ulaşmaz'], prg:['ulaşıyor','ulaşmıyor'], past:['ulaştı','ulaşmadı'], ppas:['ulaşmıştı','ulaşmamıştı'], fut:['ulaşacak','ulaşmayacak'] }, pass:{ subj:'Bina', agent:'asker tarafından', pres:['ulaşılır','ulaşılmaz'], prg:['ulaşılıyor','ulaşılmıyor'], past:['ulaşıldı','ulaşılmadı'], ppas:['ulaşılmıştı','ulaşılmamıştı'], fut:['ulaşılacak','ulaşılmayacak'] } } },
  { id:'s500', icon:'🏥', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'ekipmanı', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Ekipman', agent:'çiftçi tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s501', icon:'✉️', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'makineyi', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Makine', agent:'mühendis tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s502', icon:'📝', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'öğrenci tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s503', icon:'🔑', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the story', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'hikayeyi', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Hikaye', agent:'gazeteci tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s504', icon:'💊', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'arabayı', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Araba', agent:'şoför tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s505', icon:'🎯', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'performansı', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Performans', agent:'aktör tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s506', icon:'🔬', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'binayı', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Bina', agent:'mühendis tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s507', icon:'📝', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'clean', v2:'cleaned', v3:'cleaned', ving:'cleaning'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'aleti', pres:['temizler','temizlemez'], prg:['temizliyor','temizlemiyor'], past:['temizledi','temizlemedi'], ppas:['temizlemişti','temizlememişti'], fut:['temizleyecek','temizlemeyecek'] }, pass:{ subj:'Alet', agent:'cerrah tarafından', pres:['temizlenir','temizlenmez'], prg:['temizleniyor','temizlenmiyor'], past:['temizlendi','temizlenmedi'], ppas:['temizlenmişti','temizlenmemişti'], fut:['temizlenecek','temizlenmeyecek'] } } },
  { id:'s508', icon:'🏫', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'haritayı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Harita', agent:'kaşif tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s509', icon:'📚', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'sell', v2:'sold', v3:'sold', ving:'selling'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'albümü', pres:['satar','satmaz'], prg:['satıyor','satmıyor'], past:['sattı','satmadı'], ppas:['satmıştı','satmamıştı'], fut:['satacak','satmayacak'] }, pass:{ subj:'Albüm', agent:'müzisyen tarafından', pres:['satılır','satılmaz'], prg:['satılıyor','satılmıyor'], past:['satıldı','satılmadı'], ppas:['satılmıştı','satılmamıştı'], fut:['satılacak','satılmayacak'] } } },
  { id:'s510', icon:'🎨', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'makaleyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Makale', agent:'muhabir tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s511', icon:'🌉', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the coffee', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'kahveyi', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Kahve', agent:'garson tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s512', icon:'🔬', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'deneyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Deney', agent:'bilim insanı tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s513', icon:'🔬', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'tedaviyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tedavi', agent:'hemşire tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s514', icon:'🍕', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'öğretmen tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s515', icon:'📝', subj:{w:'The sailor', type:'sg', obj_form:'the sailor'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Denizci', obj:'gemiyi', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Gemi', agent:'denizci tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s516', icon:'🌐', subj:{w:'The firefighter', type:'sg', obj_form:'the firefighter'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'İtfaiyeci', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'itfaiyeci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s517', icon:'📊', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the application', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'uygulamayı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Uygulama', agent:'programcı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s518', icon:'🎪', subj:{w:'The mechanic', type:'sg', obj_form:'the mechanic'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Tamirci', obj:'arabayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Araba', agent:'tamirci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s519', icon:'💊', subj:{w:'The dentist', type:'sg', obj_form:'the dentist'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Diş hekimi', obj:'tedaviyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Tedavi', agent:'diş hekimi tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s520', icon:'📱', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s521', icon:'🔐', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the email', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'e-postayı', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'E-posta', agent:'müdür tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s522', icon:'📚', subj:{w:'The reporter', type:'sg', obj_form:'the reporter'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Muhabir', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'muhabir tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s523', icon:'📊', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'design', v2:'designed', v3:'designed', ving:'designing'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sistemi', pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'], past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'], fut:['tasarlayacak','tasarlamayacak'] }, pass:{ subj:'Sistem', agent:'mühendis tarafından', pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'], past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'], fut:['tasarlanacak','tasarlanmayacak'] } } },
  { id:'s524', icon:'🎨', subj:{w:'The soldier', type:'sg', obj_form:'the soldier'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Asker', obj:'planı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Plan', agent:'asker tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s525', icon:'📊', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the treatment', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'tedaviyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tedavi', agent:'doktor tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s526', icon:'☕', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'count', v2:'counted', v3:'counted', ving:'counting'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['sayar','saymaz'], prg:['sayıyor','saymıyor'], past:['saydı','saymadı'], ppas:['saymıştı','saymamıştı'], fut:['sayacak','saymayacak'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['sayılır','sayılmaz'], prg:['sayılıyor','sayılmıyor'], past:['sayıldı','sayılmadı'], ppas:['sayılmıştı','sayılmamıştı'], fut:['sayılacak','sayılmayacak'] } } },
  { id:'s527', icon:'🌿', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the recipe', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'tarifi', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Tarif', agent:'şef tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s528', icon:'💼', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'haritayı', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Harita', agent:'kaşif tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s529', icon:'🔧', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'join', v2:'joined', v3:'joined', ving:'joining'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'toplantıyı', pres:['katılır','katılmaz'], prg:['katılıyor','katılmıyor'], past:['katıldı','katılmadı'], ppas:['katılmıştı','katılmamıştı'], fut:['katılacak','katılmayacak'] }, pass:{ subj:'Toplantı', agent:'öğrenci tarafından', pres:['katılınır','katılınmaz'], prg:['katılınıyor','katılınmıyor'], past:['katılındı','katılınmadı'], ppas:['katılınmıştı','katılınmamıştı'], fut:['katılınacak','katılınmayacak'] } } },
  { id:'s530', icon:'☕', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'build', v2:'built', v3:'built', ving:'building'}, obj:{w:'the bridge', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'köprüyü', pres:['inşa eder','inşa etmez'], prg:['inşa ediyor','inşa etmiyor'], past:['inşa etti','inşa etmedi'], ppas:['inşa etmişti','inşa etmemişti'], fut:['inşa edecek','inşa etmeyecek'] }, pass:{ subj:'Köprü', agent:'mühendis tarafından', pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'], past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'], fut:['inşa edilecek','inşa edilmeyecek'] } } },
  { id:'s531', icon:'🎭', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'yönetmen tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s532', icon:'🎨', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'sunumu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Sunum', agent:'öğrenci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s533', icon:'📋', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'ekipmanı', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Ekipman', agent:'şarkıcı tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s534', icon:'🏆', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'leave', v2:'left', v3:'left', ving:'leaving'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'arabayı', pres:['terk eder','terk etmez'], prg:['terk ediyor','terk etmiyor'], past:['terk etti','terk etmedi'], ppas:['terk etmişti','terk etmemişti'], fut:['terk edecek','terk etmeyecek'] }, pass:{ subj:'Araba', agent:'şoför tarafından', pres:['terk edilir','terk edilmez'], prg:['terk ediliyor','terk edilmiyor'], past:['terk edildi','terk edilmedi'], ppas:['terk edilmişti','terk edilmemişti'], fut:['terk edilecek','terk edilmeyecek'] } } },
  { id:'s535', icon:'🏠', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'plant', v2:'planted', v3:'planted', ving:'planting'}, obj:{w:'the garden', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'bahçeyi', pres:['diker','dikmez'], prg:['dikiyor','dikmiyor'], past:['dikti','dikmedi'], ppas:['dikmişti','dikmemişti'], fut:['dikecek','dikmeyecek'] }, pass:{ subj:'Bahçe', agent:'çiftçi tarafından', pres:['dikilir','dikilmez'], prg:['dikiliyor','dikilmiyor'], past:['dikildi','dikilmedi'], ppas:['dikilmişti','dikilmemişti'], fut:['dikilecek','dikilmeyecek'] } } },
  { id:'s536', icon:'📚', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'makaleyi', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Makale', agent:'çevirmen tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s537', icon:'⚗️', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'sell', v2:'sold', v3:'sold', ving:'selling'}, obj:{w:'the painting', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'tabloyu', pres:['satar','satmaz'], prg:['satıyor','satmıyor'], past:['sattı','satmadı'], ppas:['satmıştı','satmamıştı'], fut:['satacak','satmayacak'] }, pass:{ subj:'Tablo', agent:'sanatçı tarafından', pres:['satılır','satılmaz'], prg:['satılıyor','satılmıyor'], past:['satıldı','satılmadı'], ppas:['satılmıştı','satılmamıştı'], fut:['satılacak','satılmayacak'] } } },
  { id:'s538', icon:'🎯', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the car', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'arabayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Araba', agent:'şoför tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s539', icon:'☕', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'profesör tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s540', icon:'🍕', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'gazeteci tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s541', icon:'📱', subj:{w:'The dentist', type:'sg', obj_form:'the dentist'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Diş hekimi', obj:'aleti', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Alet', agent:'diş hekimi tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s542', icon:'🍕', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'control', v2:'controlled', v3:'controlled', ving:'controlling'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'gemiyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Gemi', agent:'kaptan tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s543', icon:'⚗️', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the theory', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'teoriyi', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Teori', agent:'bilim insanı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s544', icon:'🏛️', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'pour', v2:'poured', v3:'poured', ving:'pouring'}, obj:{w:'the juice', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'suyu', pres:['döker','dökmez'], prg:['döküyor','dökmüyor'], past:['döktü','dökmedi'], ppas:['dökmüştü','dökmemişti'], fut:['dökecek','dökmeyecek'] }, pass:{ subj:'Su', agent:'şef tarafından', pres:['dökülür','dökülmez'], prg:['dökülüyor','dökülmüyor'], past:['döküldü','dökülmedi'], ppas:['dökülmüştü','dökülmemişti'], fut:['dökülecek','dökülmeyecek'] } } },
  { id:'s545', icon:'🔬', subj:{w:'The nurse', type:'sg', obj_form:'the nurse'}, verb:{v1:'pour', v2:'poured', v3:'poured', ving:'pouring'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Hemşire', obj:'ilacı', pres:['döker','dökmez'], prg:['döküyor','dökmüyor'], past:['döktü','dökmedi'], ppas:['dökmüştü','dökmemişti'], fut:['dökecek','dökmeyecek'] }, pass:{ subj:'İlaç', agent:'hemşire tarafından', pres:['dökülür','dökülmez'], prg:['dökülüyor','dökülmüyor'], past:['döküldü','dökülmedi'], ppas:['dökülmüştü','dökülmemişti'], fut:['dökülecek','dökülmeyecek'] } } },
  { id:'s546', icon:'✉️', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'kütüphaneci tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s547', icon:'📝', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'planı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Plan', agent:'mimar tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s548', icon:'🌿', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'ekmeği', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] }, pass:{ subj:'Ekmek', agent:'şef tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirilmeyecek'] } } },
  { id:'s549', icon:'🎬', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'draw', v2:'drew', v3:'drawn', ving:'drawing'}, obj:{w:'the painting', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'tabloyu', pres:['çizer','çizmez'], prg:['çiziyor','çizmiyor'], past:['çizdi','çizmedi'], ppas:['çizmişti','çizmemişti'], fut:['çizecek','çizmeyecek'] }, pass:{ subj:'Tablo', agent:'sanatçı tarafından', pres:['çizilir','çizilmez'], prg:['çiziliyor','çizilmiyor'], past:['çizildi','çizilmedi'], ppas:['çizilmişti','çizilmemişti'], fut:['çizilecek','çizilmeyecek'] } } },
  { id:'s550', icon:'🎯', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'programı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Program', agent:'kütüphaneci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s551', icon:'🚀', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'improve', v2:'improved', v3:'improved', ving:'improving'}, obj:{w:'the website', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'web sitesini', pres:['geliştirir','geliştirmez'], prg:['geliştiriyor','geliştirmiyor'], past:['geliştirdi','geliştirmedi'], ppas:['geliştirmişti','geliştirmemişti'], fut:['geliştirecek','geliştirmeyecek'] }, pass:{ subj:'Web sitesi', agent:'tasarımcı tarafından', pres:['geliştirilir','geliştirilmez'], prg:['geliştiriliyor','geliştirilmiyor'], past:['geliştirildi','geliştirilmedi'], ppas:['geliştirilmişti','geliştirilmemişti'], fut:['geliştirilecek','geliştirilmeyecek'] } } },
  { id:'s552', icon:'📋', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'measure', v2:'measured', v3:'measured', ving:'measuring'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'örneği', pres:['ölçer','ölçmez'], prg:['ölçüyor','ölçmüyor'], past:['ölçtü','ölçmedi'], ppas:['ölçmüştü','ölçmemişti'], fut:['ölçecek','ölçmeyecek'] }, pass:{ subj:'Örnek', agent:'doktor tarafından', pres:['ölçülür','ölçülmez'], prg:['ölçülüyor','ölçülmüyor'], past:['ölçüldü','ölçülmedi'], ppas:['ölçülmüştü','ölçülmemişti'], fut:['ölçülecek','ölçülmeyecek'] } } },
  { id:'s553', icon:'🌐', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'öğrenci tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s554', icon:'📁', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'distribute', v2:'distributed', v3:'distributed', ving:'distributing'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'kitabı', pres:['dağıtır','dağıtmaz'], prg:['dağıtıyor','dağıtmıyor'], past:['dağıttı','dağıtmadı'], ppas:['dağıtmıştı','dağıtmamıştı'], fut:['dağıtacak','dağıtmayacak'] }, pass:{ subj:'Kitap', agent:'kütüphaneci tarafından', pres:['dağıtılır','dağıtılmaz'], prg:['dağıtılıyor','dağıtılmıyor'], past:['dağıtıldı','dağıtılmadı'], ppas:['dağıtılmıştı','dağıtılmamıştı'], fut:['dağıtılacak','dağıtılmayacak'] } } },
  { id:'s555', icon:'🎨', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the story', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'hikayeyi', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Hikaye', agent:'yazar tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s556', icon:'🏫', subj:{w:'The economist', type:'sg', obj_form:'the economist'}, verb:{v1:'reduce', v2:'reduced', v3:'reduced', ving:'reducing'}, obj:{w:'the budget', type:'sg'}, trData:{ act:{ subj:'Ekonomist', obj:'bütçeyi', pres:['azaltır','azaltmaz'], prg:['azaltıyor','azaltmıyor'], past:['azalttı','azaltmadı'], ppas:['azaltmıştı','azaltmamıştı'], fut:['azaltacak','azaltmayacak'] }, pass:{ subj:'Bütçe', agent:'ekonomist tarafından', pres:['azaltılır','azaltılmaz'], prg:['azaltılıyor','azaltılmıyor'], past:['azaltıldı','azaltılmadı'], ppas:['azaltılmıştı','azaltılmamıştı'], fut:['azaltılacak','azaltılmayacak'] } } },
  { id:'s557', icon:'🎭', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'search', v2:'searched', v3:'searched', ving:'searching'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'binayı', pres:['arar','aramaz'], prg:['arıyor','aramıyor'], past:['aradı','aramadı'], ppas:['aramıştı','aramamıştı'], fut:['arayacak','aramayacak'] }, pass:{ subj:'Bina', agent:'polis tarafından', pres:['aranır','aranmaz'], prg:['aranıyor','aranmıyor'], past:['arandı','aranmadı'], ppas:['aranmıştı','aranmamıştı'], fut:['aranacak','aranmayacak'] } } },
  { id:'s558', icon:'📊', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'örneği', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Örnek', agent:'doktor tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s559', icon:'💻', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'delete', v2:'deleted', v3:'deleted', ving:'deleting'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'dosyayı', pres:['siler','silmez'], prg:['siliyor','silmiyor'], past:['sildi','silmedi'], ppas:['silmişti','silmemişti'], fut:['silecek','silmeyecek'] }, pass:{ subj:'Dosya', agent:'programcı tarafından', pres:['silinir','silinmez'], prg:['siliniyor','silinmiyor'], past:['silindi','silinmedi'], ppas:['silinmişti','silinmemişti'], fut:['silinecek','silinmeyecek'] } } },
  { id:'s560', icon:'💼', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'join', v2:'joined', v3:'joined', ving:'joining'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'toplantıyı', pres:['katılır','katılmaz'], prg:['katılıyor','katılmıyor'], past:['katıldı','katılmadı'], ppas:['katılmıştı','katılmamıştı'], fut:['katılacak','katılmayacak'] }, pass:{ subj:'Toplantı', agent:'atlet tarafından', pres:['katılınır','katılınmaz'], prg:['katılınıyor','katılınmıyor'], past:['katılındı','katılınmadı'], ppas:['katılınmıştı','katılınmamıştı'], fut:['katılınacak','katılınmayacak'] } } },
  { id:'s561', icon:'📋', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'sell', v2:'sold', v3:'sold', ving:'selling'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'ekmeği', pres:['satar','satmaz'], prg:['satıyor','satmıyor'], past:['sattı','satmadı'], ppas:['satmıştı','satmamıştı'], fut:['satacak','satmayacak'] }, pass:{ subj:'Ekmek', agent:'fırıncı tarafından', pres:['satılır','satılmaz'], prg:['satılıyor','satılmıyor'], past:['satıldı','satılmadı'], ppas:['satılmıştı','satılmamıştı'], fut:['satılacak','satılmayacak'] } } },
  { id:'s562', icon:'🌍', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the problem', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'sorunu', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Sorun', agent:'muhasebeci tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s563', icon:'🏫', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the album', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'albümü', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Albüm', agent:'müzisyen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s564', icon:'🧩', subj:{w:'The artist', type:'sg', obj_form:'the artist'}, verb:{v1:'paint', v2:'painted', v3:'painted', ving:'painting'}, obj:{w:'the painting', type:'sg'}, trData:{ act:{ subj:'Sanatçı', obj:'tabloyu', pres:['boyar','boyamaz'], prg:['boyuyor','boyamıyor'], past:['boyadı','boyamadı'], ppas:['boyamıştı','boyamamıştı'], fut:['boyayacak','boyamayacak'] }, pass:{ subj:'Tablo', agent:'sanatçı tarafından', pres:['boyanır','boyanmaz'], prg:['boyanıyor','boyanmıyor'], past:['boyandı','boyanmadı'], ppas:['boyanmıştı','boyanmamıştı'], fut:['boyanacak','boyanmayacak'] } } },
  { id:'s565', icon:'🔭', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'örneği', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Örnek', agent:'bilim insanı tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s566', icon:'🧪', subj:{w:'The pilot', type:'sg', obj_form:'the pilot'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the device', type:'sg'}, trData:{ act:{ subj:'Pilot', obj:'cihazı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Cihaz', agent:'pilot tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s567', icon:'🏫', subj:{w:'The sailor', type:'sg', obj_form:'the sailor'}, verb:{v1:'clean', v2:'cleaned', v3:'cleaned', ving:'cleaning'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Denizci', obj:'gemiyi', pres:['temizler','temizlemez'], prg:['temizliyor','temizlemiyor'], past:['temizledi','temizlemedi'], ppas:['temizlemişti','temizlememişti'], fut:['temizleyecek','temizlemeyecek'] }, pass:{ subj:'Gemi', agent:'denizci tarafından', pres:['temizlenir','temizlenmez'], prg:['temizleniyor','temizlenmiyor'], past:['temizlendi','temizlenmedi'], ppas:['temizlenmişti','temizlenmemişti'], fut:['temizlenecek','temizlenmeyecek'] } } },
  { id:'s568', icon:'📋', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'share', v2:'shared', v3:'shared', ving:'sharing'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'görüntüyü', pres:['paylaşır','paylaşmaz'], prg:['paylaşıyor','paylaşmıyor'], past:['paylaştı','paylaşmadı'], ppas:['paylaşmıştı','paylaşmamıştı'], fut:['paylaşacak','paylaşmayacak'] }, pass:{ subj:'Görüntü', agent:'tasarımcı tarafından', pres:['paylaşılır','paylaşılmaz'], prg:['paylaşılıyor','paylaşılmıyor'], past:['paylaşıldı','paylaşılmadı'], ppas:['paylaşılmıştı','paylaşılmamıştı'], fut:['paylaşılacak','paylaşılmayacak'] } } },
  { id:'s569', icon:'💻', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'kitabı', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Kitap', agent:'aktör tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s570', icon:'🏥', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'dosyayı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Dosya', agent:'programcı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s571', icon:'🔐', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'deneyi', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Deney', agent:'bilim insanı tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s572', icon:'🏗️', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'sort', v2:'sorted', v3:'sorted', ving:'sorting'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['sıralar','sıralamaz'], prg:['sıralıyor','sıralamıyor'], past:['sıraladı','sıralamadı'], ppas:['sıralamıştı','sıralamamıştı'], fut:['sıralayacak','sıralamayacak'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['sıralanır','sıralanmaz'], prg:['sıralanıyor','sıralanmıyor'], past:['sıralandı','sıralanmadı'], ppas:['sıralanmıştı','sıralanmamıştı'], fut:['sıralanacak','sıralanmayacak'] } } },
  { id:'s573', icon:'🏠', subj:{w:'The engineer', type:'sg', obj_form:'the engineer'}, verb:{v1:'improve', v2:'improved', v3:'improved', ving:'improving'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Mühendis', obj:'sistemi', pres:['geliştirir','geliştirmez'], prg:['geliştiriyor','geliştirmiyor'], past:['geliştirdi','geliştirmedi'], ppas:['geliştirmişti','geliştirmemişti'], fut:['geliştirecek','geliştirmeyecek'] }, pass:{ subj:'Sistem', agent:'mühendis tarafından', pres:['geliştirilir','geliştirilmez'], prg:['geliştiriliyor','geliştirilmiyor'], past:['geliştirildi','geliştirilmedi'], ppas:['geliştirilmişti','geliştirilmemişti'], fut:['geliştirilecek','geliştirilmeyecek'] } } },
  { id:'s574', icon:'📁', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'programı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Program', agent:'öğrenci tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s575', icon:'📱', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'deneyi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Deney', agent:'astronot tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s576', icon:'🧪', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'show', v2:'showed', v3:'shown', ving:'showing'}, obj:{w:'the performance', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'performansı', pres:['gösterir','göstermez'], prg:['gösteriyor','göstermiyor'], past:['gösterdi','göstermedi'], ppas:['göstermişti','göstermemişti'], fut:['gösterecek','göstermeyecek'] }, pass:{ subj:'Performans', agent:'dansçı tarafından', pres:['gösterilir','gösterilmez'], prg:['gösteriliyor','gösterilmiyor'], past:['gösterildi','gösterilmedi'], ppas:['gösterilmişti','gösterilmemişti'], fut:['gösterilecek','gösterilmeyecek'] } } },
  { id:'s577', icon:'🌉', subj:{w:'The surgeon', type:'sg', obj_form:'the surgeon'}, verb:{v1:'test', v2:'tested', v3:'tested', ving:'testing'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Cerrah', obj:'aleti', pres:['test eder','test etmez'], prg:['test ediyor','test etmiyor'], past:['test etti','test etmedi'], ppas:['test etmişti','test etmemişti'], fut:['test edecek','test etmeyecek'] }, pass:{ subj:'Alet', agent:'cerrah tarafından', pres:['test edilir','test edilmez'], prg:['test ediliyor','test edilmiyor'], past:['test edildi','test edilmedi'], ppas:['test edilmişti','test edilmemişti'], fut:['test edilecek','test edilmeyecek'] } } },
  { id:'s578', icon:'💼', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'programı', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Program', agent:'müdür tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s579', icon:'🔭', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'install', v2:'installed', v3:'installed', ving:'installing'}, obj:{w:'the system', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'sistemi', pres:['kurar','kurmaz'], prg:['kuruyor','kurmuyor'], past:['kurdu','kurmadı'], ppas:['kurmuştu','kurmamıştı'], fut:['kuracak','kurmayacak'] }, pass:{ subj:'Sistem', agent:'elektrikçi tarafından', pres:['kurulur','kurulmaz'], prg:['kuruluyor','kurulmuyor'], past:['kuruldu','kurulmadı'], ppas:['kurulmuştu','kurulmamıştı'], fut:['kurulacak','kurulmayacak'] } } },
  { id:'s580', icon:'🌍', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the song', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'şarkıyı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Şarkı', agent:'müzisyen tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s581', icon:'🎬', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'atlet tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s582', icon:'📊', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'kaşif tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s583', icon:'🚀', subj:{w:'The programmer', type:'sg', obj_form:'the programmer'}, verb:{v1:'download', v2:'downloaded', v3:'downloaded', ving:'downloading'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Programcı', obj:'dosyayı', pres:['indirir','indirmez'], prg:['indiriyor','indirmiyor'], past:['indirdi','indirmedi'], ppas:['indirmişti','indirmemişti'], fut:['indirecek','indirmeyecek'] }, pass:{ subj:'Dosya', agent:'programcı tarafından', pres:['indirilir','indirilmez'], prg:['indiriliyor','indirilmiyor'], past:['indirildi','indirilmedi'], ppas:['indirilmişti','indirilmemişti'], fut:['indirilecek','indirilmeyecek'] } } },
  { id:'s584', icon:'🎵', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'publish', v2:'published', v3:'published', ving:'publishing'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'kitabı', pres:['yayınlar','yayınlamaz'], prg:['yayınlıyor','yayınlamıyor'], past:['yayınladı','yayınlamadı'], ppas:['yayınlamıştı','yayınlamamıştı'], fut:['yayınlayacak','yayınlamayacak'] }, pass:{ subj:'Kitap', agent:'yazar tarafından', pres:['yayınlanır','yayınlanmaz'], prg:['yayınlanıyor','yayınlanmıyor'], past:['yayınlandı','yayınlanmadı'], ppas:['yayınlanmıştı','yayınlanmamıştı'], fut:['yayınlanacak','yayınlanmayacak'] } } },
  { id:'s585', icon:'🏆', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'eczacı tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s586', icon:'🏆', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'şarkıcı tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s587', icon:'📋', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'sözleşmeyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Sözleşme', agent:'avukat tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s588', icon:'🎨', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'}, obj:{w:'the bread', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'ekmeği', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] }, pass:{ subj:'Ekmek', agent:'fırıncı tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirilmeyecek'] } } },
  { id:'s589', icon:'📋', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'download', v2:'downloaded', v3:'downloaded', ving:'downloading'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'görüntüyü', pres:['indirir','indirmez'], prg:['indiriyor','indirmiyor'], past:['indirdi','indirmedi'], ppas:['indirmişti','indirmemişti'], fut:['indirecek','indirmeyecek'] }, pass:{ subj:'Görüntü', agent:'fotoğrafçı tarafından', pres:['indirilir','indirilmez'], prg:['indiriliyor','indirilmiyor'], past:['indirildi','indirilmedi'], ppas:['indirilmişti','indirilmemişti'], fut:['indirilecek','indirilmeyecek'] } } },
  { id:'s590', icon:'✉️', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'haritayı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Harita', agent:'kaşif tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s591', icon:'🎭', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'sort', v2:'sorted', v3:'sorted', ving:'sorting'}, obj:{w:'the database', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'veritabanını', pres:['sıralar','sıralamaz'], prg:['sıralıyor','sıralamıyor'], past:['sıraladı','sıralamadı'], ppas:['sıralamıştı','sıralamamıştı'], fut:['sıralayacak','sıralamayacak'] }, pass:{ subj:'Veritabanı', agent:'polis tarafından', pres:['sıralanır','sıralanmaz'], prg:['sıralanıyor','sıralanmıyor'], past:['sıralandı','sıralanmadı'], ppas:['sıralanmıştı','sıralanmamıştı'], fut:['sıralanacak','sıralanmayacak'] } } },
  { id:'s592', icon:'📝', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'görüntüyü', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Görüntü', agent:'fotoğrafçı tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s593', icon:'📄', subj:{w:'The electrician', type:'sg', obj_form:'the electrician'}, verb:{v1:'repair', v2:'repaired', v3:'repaired', ving:'repairing'}, obj:{w:'the device', type:'sg'}, trData:{ act:{ subj:'Elektrikçi', obj:'cihazı', pres:['tamir eder','tamir etmez'], prg:['tamir ediyor','tamir etmiyor'], past:['tamir etti','tamir etmedi'], ppas:['tamir etmişti','tamir etmemişti'], fut:['tamir edecek','tamir etmeyecek'] }, pass:{ subj:'Cihaz', agent:'elektrikçi tarafından', pres:['tamir edilir','tamir edilmez'], prg:['tamir ediliyor','tamir edilmiyor'], past:['tamir edildi','tamir edilmedi'], ppas:['tamir edilmişti','tamir edilmemişti'], fut:['tamir edilecek','tamir edilmeyecek'] } } },
  { id:'s594', icon:'🎨', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'programı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Program', agent:'dansçı tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s595', icon:'🌐', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the device', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'cihazı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Cihaz', agent:'astronot tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s596', icon:'🎬', subj:{w:'The athlete', type:'sg', obj_form:'the athlete'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Atlet', obj:'ekipmanı', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Ekipman', agent:'atlet tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s597', icon:'🔑', subj:{w:'The musician', type:'sg', obj_form:'the musician'}, verb:{v1:'buy', v2:'bought', v3:'bought', ving:'buying'}, obj:{w:'the instrument', type:'sg'}, trData:{ act:{ subj:'Müzisyen', obj:'aleti', pres:['satın alır','satın almaz'], prg:['satın alıyor','satın almıyor'], past:['satın aldı','satın almadı'], ppas:['satın almıştı','satın almamıştı'], fut:['satın alacak','satın almayacak'] }, pass:{ subj:'Alet', agent:'müzisyen tarafından', pres:['satın alınır','satın alınmaz'], prg:['satın alınıyor','satın alınmıyor'], past:['satın alındı','satın alınmadı'], ppas:['satın alınmıştı','satın alınmamıştı'], fut:['satın alınacak','satın alınmayacak'] } } },
  { id:'s598', icon:'📦', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'makaleyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Makale', agent:'çevirmen tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s599', icon:'📁', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'protect', v2:'protected', v3:'protected', ving:'protecting'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'binayı', pres:['korur','korumaz'], prg:['koruyor','korumuyor'], past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'], fut:['koruyacak','korumayacak'] }, pass:{ subj:'Bina', agent:'polis tarafından', pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'], past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'], fut:['korunacak','korunmayacak'] } } },
  { id:'s600', icon:'📝', subj:{w:'The coach', type:'sg', obj_form:'the coach'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the solution', type:'sg'}, trData:{ act:{ subj:'Antrenör', obj:'çözümü', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Çözüm', agent:'antrenör tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s601', icon:'📄', subj:{w:'The designer', type:'sg', obj_form:'the designer'}, verb:{v1:'create', v2:'created', v3:'created', ving:'creating'}, obj:{w:'the image', type:'sg'}, trData:{ act:{ subj:'Tasarımcı', obj:'görüntüyü', pres:['oluşturur','oluşturmaz'], prg:['oluşturuyor','oluşturmuyor'], past:['oluşturdu','oluşturmadı'], ppas:['oluşturmuştu','oluşturmamıştı'], fut:['oluşturacak','oluşturmayacak'] }, pass:{ subj:'Görüntü', agent:'tasarımcı tarafından', pres:['oluşturulur','oluşturulmaz'], prg:['oluşturuluyor','oluşturulmuyor'], past:['oluşturuldu','oluşturulmadı'], ppas:['oluşturulmuştu','oluşturulmamıştı'], fut:['oluşturulacak','oluşturulmayacak'] } } },
  { id:'s602', icon:'🏫', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'lead', v2:'led', v3:'led', ving:'leading'}, obj:{w:'the project', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'projeyi', pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'], past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'], fut:['yönetecek','yönetmeyecek'] }, pass:{ subj:'Proje', agent:'yönetmen tarafından', pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'], past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'], fut:['yönetilecek','yönetilmeyecek'] } } },
  { id:'s603', icon:'🚀', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'kitabı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Kitap', agent:'yazar tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s604', icon:'🏫', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'ekipmanı', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Ekipman', agent:'astronot tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s605', icon:'📋', subj:{w:'The accountant', type:'sg', obj_form:'the accountant'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Muhasebeci', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'muhasebeci tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s606', icon:'🏆', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'belgeyi', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Belge', agent:'avukat tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s607', icon:'💊', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'launch', v2:'launched', v3:'launched', ving:'launching'}, obj:{w:'the machine', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'makineyi', pres:['fırlatır','fırlatmaz'], prg:['fırlatıyor','fırlatmıyor'], past:['fırlattı','fırlatmadı'], ppas:['fırlatmıştı','fırlatmamıştı'], fut:['fırlatacak','fırlatmayacak'] }, pass:{ subj:'Makine', agent:'astronot tarafından', pres:['fırlatılır','fırlatılmaz'], prg:['fırlatılıyor','fırlatılmıyor'], past:['fırlatıldı','fırlatılmadı'], ppas:['fırlatılmıştı','fırlatılmamıştı'], fut:['fırlatılacak','fırlatılmayacak'] } } },
  { id:'s608', icon:'🔑', subj:{w:'The singer', type:'sg', obj_form:'the singer'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the concert', type:'sg'}, trData:{ act:{ subj:'Şarkıcı', obj:'konseri', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Konser', agent:'şarkıcı tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s609', icon:'🍕', subj:{w:'The captain', type:'sg', obj_form:'the captain'}, verb:{v1:'leave', v2:'left', v3:'left', ving:'leaving'}, obj:{w:'the ship', type:'sg'}, trData:{ act:{ subj:'Kaptan', obj:'gemiyi', pres:['terk eder','terk etmez'], prg:['terk ediyor','terk etmiyor'], past:['terk etti','terk etmedi'], ppas:['terk etmişti','terk etmemişti'], fut:['terk edecek','terk etmeyecek'] }, pass:{ subj:'Gemi', agent:'kaptan tarafından', pres:['terk edilir','terk edilmez'], prg:['terk ediliyor','terk edilmiyor'], past:['terk edildi','terk edilmedi'], ppas:['terk edilmişti','terk edilmemişti'], fut:['terk edilecek','terk edilmeyecek'] } } },
  { id:'s610', icon:'🍕', subj:{w:'The driver', type:'sg', obj_form:'the driver'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Şoför', obj:'haritayı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Harita', agent:'şoför tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s611', icon:'🔑', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the story', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'hikayeyi', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Hikaye', agent:'yazar tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s612', icon:'🔧', subj:{w:'The student', type:'sg', obj_form:'the student'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the article', type:'sg'}, trData:{ act:{ subj:'Öğrenci', obj:'makaleyi', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Makale', agent:'öğrenci tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s613', icon:'🌉', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'reject', v2:'rejected', v3:'rejected', ving:'rejecting'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'planı', pres:['reddeder','reddetmez'], prg:['reddediyor','reddetmiyor'], past:['reddetti','reddetmedi'], ppas:['reddetmişti','reddetmemişti'], fut:['reddedecek','reddetmeyecek'] }, pass:{ subj:'Plan', agent:'müdür tarafından', pres:['reddedilir','reddedilmez'], prg:['reddediliyor','reddedilmiyor'], past:['reddedildi','reddedilmedi'], ppas:['reddedilmişti','reddedilmemişti'], fut:['reddedilecek','reddedilmeyecek'] } } },
  { id:'s614', icon:'🔭', subj:{w:'The writer', type:'sg', obj_form:'the writer'}, verb:{v1:'write', v2:'wrote', v3:'written', ving:'writing'}, obj:{w:'the novel', type:'sg'}, trData:{ act:{ subj:'Yazar', obj:'romanı', pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'], past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'], fut:['yazacak','yazmayacak'] }, pass:{ subj:'Roman', agent:'yazar tarafından', pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'], past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'], fut:['yazılacak','yazılmayacak'] } } },
  { id:'s615', icon:'📦', subj:{w:'The police officer', type:'sg', obj_form:'the police officer'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the passport', type:'sg'}, trData:{ act:{ subj:'Polis', obj:'pasaportu', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Pasaport', agent:'polis tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s616', icon:'🏠', subj:{w:'The architect', type:'sg', obj_form:'the architect'}, verb:{v1:'draw', v2:'drew', v3:'drawn', ving:'drawing'}, obj:{w:'the building', type:'sg'}, trData:{ act:{ subj:'Mimar', obj:'binayı', pres:['çizer','çizmez'], prg:['çiziyor','çizmiyor'], past:['çizdi','çizmedi'], ppas:['çizmişti','çizmemişti'], fut:['çizecek','çizmeyecek'] }, pass:{ subj:'Bina', agent:'mimar tarafından', pres:['çizilir','çizilmez'], prg:['çiziliyor','çizilmiyor'], past:['çizildi','çizilmedi'], ppas:['çizilmişti','çizilmemişti'], fut:['çizilecek','çizilmeyecek'] } } },
  { id:'s617', icon:'📚', subj:{w:'The farmer', type:'sg', obj_form:'the farmer'}, verb:{v1:'water', v2:'watered', v3:'watered', ving:'watering'}, obj:{w:'the garden', type:'sg'}, trData:{ act:{ subj:'Çiftçi', obj:'bahçeyi', pres:['sular','sulamaz'], prg:['suluyor','sulamıyor'], past:['suladı','sulamadı'], ppas:['sulamıştı','sulamamıştı'], fut:['sulayacak','sulamayacak'] }, pass:{ subj:'Bahçe', agent:'çiftçi tarafından', pres:['sulanır','sulanmaz'], prg:['sulanıyor','sulanmıyor'], past:['sulandı','sulanmadı'], ppas:['sulanmıştı','sulanmamıştı'], fut:['sulanacak','sulanmayacak'] } } },
  { id:'s618', icon:'🌉', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'distribute', v2:'distributed', v3:'distributed', ving:'distributing'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'kitabı', pres:['dağıtır','dağıtmaz'], prg:['dağıtıyor','dağıtmıyor'], past:['dağıttı','dağıtmadı'], ppas:['dağıtmıştı','dağıtmamıştı'], fut:['dağıtacak','dağıtmayacak'] }, pass:{ subj:'Kitap', agent:'öğretmen tarafından', pres:['dağıtılır','dağıtılmaz'], prg:['dağıtılıyor','dağıtılmıyor'], past:['dağıtıldı','dağıtılmadı'], ppas:['dağıtılmıştı','dağıtılmamıştı'], fut:['dağıtılacak','dağıtılmayacak'] } } },
  { id:'s619', icon:'🔑', subj:{w:'The translator', type:'sg', obj_form:'the translator'}, verb:{v1:'translate', v2:'translated', v3:'translated', ving:'translating'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Çevirmen', obj:'kitabı', pres:['çevirir','çevirmez'], prg:['çeviriyor','çevirmiyor'], past:['çevirdi','çevirmedi'], ppas:['çevirmişti','çevirmemişti'], fut:['çevirecek','çevirmeyecek'] }, pass:{ subj:'Kitap', agent:'çevirmen tarafından', pres:['çevrilir','çevrilmez'], prg:['çevriliyor','çevrilmiyor'], past:['çevrildi','çevrilmedi'], ppas:['çevrilmişti','çevrilmemişti'], fut:['çevrilecek','çevrilmeyecek'] } } },
  { id:'s620', icon:'🏥', subj:{w:'The dentist', type:'sg', obj_form:'the dentist'}, verb:{v1:'take', v2:'took', v3:'taken', ving:'taking'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Diş hekimi', obj:'örneği', pres:['alır','almaz'], prg:['alıyor','almıyor'], past:['aldı','almadı'], ppas:['almıştı','almamıştı'], fut:['alacak','almayacak'] }, pass:{ subj:'Örnek', agent:'diş hekimi tarafından', pres:['alınır','alınmaz'], prg:['alınıyor','alınmıyor'], past:['alındı','alınmadı'], ppas:['alınmıştı','alınmamıştı'], fut:['alınacak','alınmayacak'] } } },
  { id:'s621', icon:'✉️', subj:{w:'The doctor', type:'sg', obj_form:'the doctor'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Doktor', obj:'belgeyi', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Belge', agent:'doktor tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s622', icon:'💊', subj:{w:'The professor', type:'sg', obj_form:'the professor'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Profesör', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'profesör tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s623', icon:'✉️', subj:{w:'The waiter', type:'sg', obj_form:'the waiter'}, verb:{v1:'pour', v2:'poured', v3:'poured', ving:'pouring'}, obj:{w:'the tea', type:'sg'}, trData:{ act:{ subj:'Garson', obj:'çayı', pres:['döker','dökmez'], prg:['döküyor','dökmüyor'], past:['döktü','dökmedi'], ppas:['dökmüştü','dökmemişti'], fut:['dökecek','dökmeyecek'] }, pass:{ subj:'Çay', agent:'garson tarafından', pres:['dökülür','dökülmez'], prg:['dökülüyor','dökülmüyor'], past:['döküldü','dökülmedi'], ppas:['dökülmüştü','dökülmemişti'], fut:['dökülecek','dökülmeyecek'] } } },
  { id:'s624', icon:'📊', subj:{w:'The manager', type:'sg', obj_form:'the manager'}, verb:{v1:'change', v2:'changed', v3:'changed', ving:'changing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Müdür', obj:'programı', pres:['değiştirir','değiştirmez'], prg:['değiştiriyor','değiştirmiyor'], past:['değiştirdi','değiştirmedi'], ppas:['değiştirmişti','değiştirmemişti'], fut:['değiştirecek','değiştirmeyecek'] }, pass:{ subj:'Program', agent:'müdür tarafından', pres:['değiştirilir','değiştirilmez'], prg:['değiştiriliyor','değiştirilmiyor'], past:['değiştirildi','değiştirilmedi'], ppas:['değiştirilmişti','değiştirilmemişti'], fut:['değiştirilecek','değiştirilmeyecek'] } } },
  { id:'s625', icon:'🎯', subj:{w:'The journalist', type:'sg', obj_form:'the journalist'}, verb:{v1:'take', v2:'took', v3:'taken', ving:'taking'}, obj:{w:'the photo', type:'sg'}, trData:{ act:{ subj:'Gazeteci', obj:'fotoğrafı', pres:['alır','almaz'], prg:['alıyor','almıyor'], past:['aldı','almadı'], ppas:['almıştı','almamıştı'], fut:['alacak','almayacak'] }, pass:{ subj:'Fotoğraf', agent:'gazeteci tarafından', pres:['alınır','alınmaz'], prg:['alınıyor','alınmıyor'], past:['alındı','alınmadı'], ppas:['alınmıştı','alınmamıştı'], fut:['alınacak','alınmayacak'] } } },
  { id:'s626', icon:'🌿', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'organize', v2:'organized', v3:'organized', ving:'organizing'}, obj:{w:'the meeting', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'toplantıyı', pres:['organize eder','organize etmez'], prg:['organize ediyor','organize etmiyor'], past:['organize etti','organize etmedi'], ppas:['organize etmişti','organize etmemişti'], fut:['organize edecek','organize etmeyecek'] }, pass:{ subj:'Toplantı', agent:'öğretmen tarafından', pres:['organize edilir','organize edilmez'], prg:['organize ediliyor','organize edilmiyor'], past:['organize edildi','organize edilmedi'], ppas:['organize edilmişti','organize edilmemişti'], fut:['organize edilecek','organize edilmeyecek'] } } },
  { id:'s627', icon:'☕', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'kitabı', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Kitap', agent:'kütüphaneci tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s628', icon:'🎨', subj:{w:'The pilot', type:'sg', obj_form:'the pilot'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the schedule', type:'sg'}, trData:{ act:{ subj:'Pilot', obj:'programı', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Program', agent:'pilot tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s629', icon:'📋', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'give', v2:'gave', v3:'given', ving:'giving'}, obj:{w:'the book', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'kitabı', pres:['verir','vermez'], prg:['veriyor','vermiyor'], past:['verdi','vermedi'], ppas:['vermişti','vermemişti'], fut:['verecek','vermeyecek'] }, pass:{ subj:'Kitap', agent:'öğretmen tarafından', pres:['verilir','verilmez'], prg:['veriliyor','verilmiyor'], past:['verildi','verilmedi'], ppas:['verilmişti','verilmemişti'], fut:['verilecek','verilmeyecek'] } } },
  { id:'s630', icon:'💻', subj:{w:'The teacher', type:'sg', obj_form:'the teacher'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the presentation', type:'sg'}, trData:{ act:{ subj:'Öğretmen', obj:'sunumu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Sunum', agent:'öğretmen tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s631', icon:'🔑', subj:{w:'The dancer', type:'sg', obj_form:'the dancer'}, verb:{v1:'hear', v2:'heard', v3:'heard', ving:'hearing'}, obj:{w:'the song', type:'sg'}, trData:{ act:{ subj:'Dansçı', obj:'şarkıyı', pres:['duyar','duymaz'], prg:['duyuyor','duymuyor'], past:['duydu','duymadı'], ppas:['duymuştu','duymamıştı'], fut:['duyacak','duymayacak'] }, pass:{ subj:'Şarkı', agent:'dansçı tarafından', pres:['duyulur','duyulmaz'], prg:['duyuluyor','duyulmuyor'], past:['duyuldu','duyulmadı'], ppas:['duyulmuştu','duyulmamıştı'], fut:['duyulacak','duyulmayacak'] } } },
  { id:'s632', icon:'🏠', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'ekipmanı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Ekipman', agent:'kaşif tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s633', icon:'✉️', subj:{w:'The chef', type:'sg', obj_form:'the chef'}, verb:{v1:'cook', v2:'cooked', v3:'cooked', ving:'cooking'}, obj:{w:'the cake', type:'sg'}, trData:{ act:{ subj:'Şef', obj:'pastayı', pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'], past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'], fut:['pişirecek','pişirmeyecek'] }, pass:{ subj:'Pasta', agent:'şef tarafından', pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'], past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'], fut:['pişirilecek','pişirilmeyecek'] } } },
  { id:'s634', icon:'🔐', subj:{w:'The director', type:'sg', obj_form:'the director'}, verb:{v1:'change', v2:'changed', v3:'changed', ving:'changing'}, obj:{w:'the plan', type:'sg'}, trData:{ act:{ subj:'Yönetmen', obj:'planı', pres:['değiştirir','değiştirmez'], prg:['değiştiriyor','değiştirmiyor'], past:['değiştirdi','değiştirmedi'], ppas:['değiştirmişti','değiştirmemişti'], fut:['değiştirecek','değiştirmeyecek'] }, pass:{ subj:'Plan', agent:'yönetmen tarafından', pres:['değiştirilir','değiştirilmez'], prg:['değiştiriliyor','değiştirilmiyor'], past:['değiştirildi','değiştirilmedi'], ppas:['değiştirilmişti','değiştirilmemişti'], fut:['değiştirilecek','değiştirilmeyecek'] } } },
  { id:'s635', icon:'🔧', subj:{w:'The researcher', type:'sg', obj_form:'the researcher'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the report', type:'sg'}, trData:{ act:{ subj:'Araştırmacı', obj:'raporu', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Rapor', agent:'araştırmacı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s636', icon:'🎭', subj:{w:'The photographer', type:'sg', obj_form:'the photographer'}, verb:{v1:'take', v2:'took', v3:'taken', ving:'taking'}, obj:{w:'the photo', type:'sg'}, trData:{ act:{ subj:'Fotoğrafçı', obj:'fotoğrafı', pres:['alır','almaz'], prg:['alıyor','almıyor'], past:['aldı','almadı'], ppas:['almıştı','almamıştı'], fut:['alacak','almayacak'] }, pass:{ subj:'Fotoğraf', agent:'fotoğrafçı tarafından', pres:['alınır','alınmaz'], prg:['alınıyor','alınmıyor'], past:['alındı','alınmadı'], ppas:['alınmıştı','alınmamıştı'], fut:['alınacak','alınmayacak'] } } },
  { id:'s637', icon:'🚀', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'carry', v2:'carried', v3:'carried', ving:'carrying'}, obj:{w:'the equipment', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'ekipmanı', pres:['taşır','taşımaz'], prg:['taşıyor','taşımıyor'], past:['taşıdı','taşımadı'], ppas:['taşımıştı','taşımamıştı'], fut:['taşıyacak','taşımayacak'] }, pass:{ subj:'Ekipman', agent:'astronot tarafından', pres:['taşınır','taşınmaz'], prg:['taşınıyor','taşınmıyor'], past:['taşındı','taşınmadı'], ppas:['taşınmıştı','taşınmamıştı'], fut:['taşınacak','taşınmayacak'] } } },
  { id:'s638', icon:'🔭', subj:{w:'The explorer', type:'sg', obj_form:'the explorer'}, verb:{v1:'follow', v2:'followed', v3:'followed', ving:'following'}, obj:{w:'the map', type:'sg'}, trData:{ act:{ subj:'Kaşif', obj:'haritayı', pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'], past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'], fut:['takip edecek','takip etmeyecek'] }, pass:{ subj:'Harita', agent:'kaşif tarafından', pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'], past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'], fut:['takip edilecek','takip edilmeyecek'] } } },
  { id:'s639', icon:'🔭', subj:{w:'The plumber', type:'sg', obj_form:'the plumber'}, verb:{v1:'use', v2:'used', v3:'used', ving:'using'}, obj:{w:'the tool', type:'sg'}, trData:{ act:{ subj:'Tesisatçı', obj:'aracı', pres:['kullanır','kullanmaz'], prg:['kullanıyor','kullanmıyor'], past:['kullandı','kullanmadı'], ppas:['kullanmıştı','kullanmamıştı'], fut:['kullanacak','kullanmayacak'] }, pass:{ subj:'Araç', agent:'tesisatçı tarafından', pres:['kullanılır','kullanılmaz'], prg:['kullanılıyor','kullanılmıyor'], past:['kullanıldı','kullanılmadı'], ppas:['kullanılmıştı','kullanılmamıştı'], fut:['kullanılacak','kullanılmayacak'] } } },
  { id:'s640', icon:'🔬', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'save', v2:'saved', v3:'saved', ving:'saving'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'dosyayı', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Dosya', agent:'kütüphaneci tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s641', icon:'⚗️', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'collect', v2:'collected', v3:'collected', ving:'collecting'}, obj:{w:'the sample', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'örneği', pres:['toplar','toplamaz'], prg:['topluyor','toplamıyor'], past:['topladı','toplamadı'], ppas:['toplamıştı','toplamamıştı'], fut:['toplayacak','toplamayacak'] }, pass:{ subj:'Örnek', agent:'bilim insanı tarafından', pres:['toplanır','toplanmaz'], prg:['toplanıyor','toplanmıyor'], past:['toplandı','toplanmadı'], ppas:['toplanmıştı','toplanmamıştı'], fut:['toplanacak','toplanmayacak'] } } },
  { id:'s642', icon:'🏗️', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'prepare', v2:'prepared', v3:'prepared', ving:'preparing'}, obj:{w:'the recipe', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'tarifi', pres:['hazırlar','hazırlamaz'], prg:['hazırlıyor','hazırlamıyor'], past:['hazırladı','hazırlamadı'], ppas:['hazırlamıştı','hazırlamamıştı'], fut:['hazırlayacak','hazırlamayacak'] }, pass:{ subj:'Tarif', agent:'fırıncı tarafından', pres:['hazırlanır','hazırlanmaz'], prg:['hazırlanıyor','hazırlanmıyor'], past:['hazırlandı','hazırlanmadı'], ppas:['hazırlanmıştı','hazırlanmamıştı'], fut:['hazırlanacak','hazırlanmayacak'] } } },
  { id:'s643', icon:'📝', subj:{w:'The astronaut', type:'sg', obj_form:'the astronaut'}, verb:{v1:'record', v2:'recorded', v3:'recorded', ving:'recording'}, obj:{w:'the experiment', type:'sg'}, trData:{ act:{ subj:'Astronot', obj:'deneyi', pres:['kaydeder','kaydetmez'], prg:['kaydediyor','kaydetmiyor'], past:['kaydetti','kaydetmedi'], ppas:['kaydetmişti','kaydetmemişti'], fut:['kaydedecek','kaydetmeyecek'] }, pass:{ subj:'Deney', agent:'astronot tarafından', pres:['kaydedilir','kaydedilmez'], prg:['kaydediliyor','kaydedilmiyor'], past:['kaydedildi','kaydedilmedi'], ppas:['kaydedilmişti','kaydedilmemişti'], fut:['kaydedilecek','kaydedilmeyecek'] } } },
  { id:'s644', icon:'📱', subj:{w:'The scientist', type:'sg', obj_form:'the scientist'}, verb:{v1:'find', v2:'found', v3:'found', ving:'finding'}, obj:{w:'the problem', type:'sg'}, trData:{ act:{ subj:'Bilim insanı', obj:'sorunu', pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'], past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'], fut:['bulacak','bulmayacak'] }, pass:{ subj:'Sorun', agent:'bilim insanı tarafından', pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'], past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'], fut:['bulunacak','bulunmayacak'] } } },
  { id:'s645', icon:'🔑', subj:{w:'The pharmacist', type:'sg', obj_form:'the pharmacist'}, verb:{v1:'give', v2:'gave', v3:'given', ving:'giving'}, obj:{w:'the medicine', type:'sg'}, trData:{ act:{ subj:'Eczacı', obj:'ilacı', pres:['verir','vermez'], prg:['veriyor','vermiyor'], past:['verdi','vermedi'], ppas:['vermişti','vermemişti'], fut:['verecek','vermeyecek'] }, pass:{ subj:'İlaç', agent:'eczacı tarafından', pres:['verilir','verilmez'], prg:['veriliyor','verilmiyor'], past:['verildi','verilmedi'], ppas:['verilmişti','verilmemişti'], fut:['verilecek','verilmeyecek'] } } },
  { id:'s646', icon:'📄', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'read', v2:'read', v3:'read', ving:'reading'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'sözleşmeyi', pres:['okur','okumaz'], prg:['okuyor','okumuyor'], past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'], fut:['okuyacak','okumayacak'] }, pass:{ subj:'Sözleşme', agent:'avukat tarafından', pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'], past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'], fut:['okunacak','okunmayacak'] } } },
  { id:'s647', icon:'☕', subj:{w:'The baker', type:'sg', obj_form:'the baker'}, verb:{v1:'mix', v2:'mixed', v3:'mixed', ving:'mixing'}, obj:{w:'the cake', type:'sg'}, trData:{ act:{ subj:'Fırıncı', obj:'pastayı', pres:['karıştırır','karıştırmaz'], prg:['karıştırıyor','karıştırmıyor'], past:['karıştırdı','karıştırmadı'], ppas:['karıştırmıştı','karıştırmamıştı'], fut:['karıştıracak','karıştırmayacak'] }, pass:{ subj:'Pasta', agent:'fırıncı tarafından', pres:['karıştırılır','karıştırılmaz'], prg:['karıştırılıyor','karıştırılmıyor'], past:['karıştırıldı','karıştırılmadı'], ppas:['karıştırılmıştı','karıştırılmamıştı'], fut:['karıştırılacak','karıştırılmayacak'] } } },
  { id:'s648', icon:'🌿', subj:{w:'The librarian', type:'sg', obj_form:'the librarian'}, verb:{v1:'check', v2:'checked', v3:'checked', ving:'checking'}, obj:{w:'the document', type:'sg'}, trData:{ act:{ subj:'Kütüphaneci', obj:'belgeyi', pres:['kontrol eder','kontrol etmez'], prg:['kontrol ediyor','kontrol etmiyor'], past:['kontrol etti','kontrol etmedi'], ppas:['kontrol etmişti','kontrol etmemişti'], fut:['kontrol edecek','kontrol etmeyecek'] }, pass:{ subj:'Belge', agent:'kütüphaneci tarafından', pres:['kontrol edilir','kontrol edilmez'], prg:['kontrol ediliyor','kontrol edilmiyor'], past:['kontrol edildi','kontrol edilmedi'], ppas:['kontrol edilmişti','kontrol edilmemişti'], fut:['kontrol edilecek','kontrol edilmeyecek'] } } },
  { id:'s649', icon:'📋', subj:{w:'The lawyer', type:'sg', obj_form:'the lawyer'}, verb:{v1:'send', v2:'sent', v3:'sent', ving:'sending'}, obj:{w:'the file', type:'sg'}, trData:{ act:{ subj:'Avukat', obj:'dosyayı', pres:['gönderir','göndermez'], prg:['gönderiyor','göndermiyor'], past:['gönderdi','göndermedi'], ppas:['göndermişti','göndermemişti'], fut:['gönderecek','göndermeyecek'] }, pass:{ subj:'Dosya', agent:'avukat tarafından', pres:['gönderilir','gönderilmez'], prg:['gönderiliyor','gönderilmiyor'], past:['gönderildi','gönderilmedi'], ppas:['gönderilmişti','gönderilmemişti'], fut:['gönderilecek','gönderilmeyecek'] } } },
  { id:'s650', icon:'📚', subj:{w:'The actor', type:'sg', obj_form:'the actor'}, verb:{v1:'reject', v2:'rejected', v3:'rejected', ving:'rejecting'}, obj:{w:'the contract', type:'sg'}, trData:{ act:{ subj:'Aktör', obj:'sözleşmeyi', pres:['reddeder','reddetmez'], prg:['reddediyor','reddetmiyor'], past:['reddetti','reddetmedi'], ppas:['reddetmişti','reddetmemişti'], fut:['reddedecek','reddetmeyecek'] }, pass:{ subj:'Sözleşme', agent:'aktör tarafından', pres:['reddedilir','reddedilmez'], prg:['reddediliyor','reddedilmiyor'], past:['reddedildi','reddedilmedi'], ppas:['reddedilmişti','reddedilmemişti'], fut:['reddedilecek','reddedilmeyecek'] } } },
];


const TR_LABELS = {
  time:  { pres:'Şimdiki', past:'Geçmiş',     fut:'Gelecek'         },
  flow:  { simp:'Basit',   cont:'Süregelen',   perf:'Tamamlanmış',   perf_cont:'Süreç-Tamamlanmış' },
  voice: { act:'Etken',    pass:'Edilgen'                            },
  pol:   { aff:'Olumlu',   neg:'Olumsuz',      que:'Soru'            },
};

// ── Grammar Engine ───────────────────────────────────────────────
function generateSentence(sc, time, flow, voice, pol) {
  const subj     = voice === 'act' ? sc.subj : sc.obj;
  const origSubj = sc.subj;
  const stype    = subj.type;
  const isTsg    = !['I','you','we','they','pl'].includes(stype);
  const isPl     = ['you','we','they','pl'].includes(stype);

  const be_p  = stype==='I' ? 'am' : (isPl ? 'are' : 'is');
  const be_pa = isPl ? 'were' : 'was';
  const hv    = (stype==='I'||isPl) ? 'have' : 'has';

  const {v1,v2,v3,ving} = sc.verb;
  let vs = v1;
  if (isTsg) {
    if      (v1.endsWith('y') && !'aeiou'.includes(v1[v1.length-2])) vs = v1.slice(0,-1)+'ies';
    else if (v1.match(/(ch|sh|s|x|z|o)$/))                           vs = v1+'es';
    else                                                               vs = v1+'s';
  }

  let aux=[], mv='';

  if (voice==='act') {
    if      (time==='pres'&&flow==='simp')      { if(pol==='aff') mv=vs; else {aux=[isTsg?'does':'do'];mv=v1;} }
    else if (time==='pres'&&flow==='cont')      { aux=[be_p]; mv=ving; }
    else if (time==='pres'&&flow==='perf')      { aux=[hv]; mv=v3; }
    else if (time==='pres'&&flow==='perf_cont') { aux=[hv,'been']; mv=ving; }
    else if (time==='past'&&flow==='simp')      { if(pol==='aff') mv=v2; else {aux=['did'];mv=v1;} }
    else if (time==='past'&&flow==='cont')      { aux=[be_pa]; mv=ving; }
    else if (time==='past'&&flow==='perf')      { aux=['had']; mv=v3; }
    else if (time==='past'&&flow==='perf_cont') { aux=['had','been']; mv=ving; }
    else if (time==='fut' &&flow==='simp')      { aux=['will']; mv=v1; }
    else if (time==='fut' &&flow==='cont')      { aux=['will','be']; mv=ving; }
    else if (time==='fut' &&flow==='perf')      { aux=['will','have']; mv=v3; }
    else if (time==='fut' &&flow==='perf_cont') { aux=['will','have','been']; mv=ving; }
  } else {
    if      (time==='pres'&&flow==='simp')      { aux=[be_p]; mv=v3; }
    else if (time==='pres'&&flow==='cont')      { aux=[be_p,'being']; mv=v3; }
    else if (time==='pres'&&flow==='perf')      { aux=[hv,'been']; mv=v3; }
    else if (time==='pres'&&flow==='perf_cont') { aux=[hv,'been','being']; mv=v3; }
    else if (time==='past'&&flow==='simp')      { aux=[be_pa]; mv=v3; }
    else if (time==='past'&&flow==='cont')      { aux=[be_pa,'being']; mv=v3; }
    else if (time==='past'&&flow==='perf')      { aux=['had','been']; mv=v3; }
    else if (time==='past'&&flow==='perf_cont') { aux=['had','been','being']; mv=v3; }
    else if (time==='fut' &&flow==='simp')      { aux=['will','be']; mv=v3; }
    else if (time==='fut' &&flow==='cont')      { aux=['will','be','being']; mv=v3; }
    else if (time==='fut' &&flow==='perf')      { aux=['will','have','been']; mv=v3; }
    else if (time==='fut' &&flow==='perf_cont') { aux=['will','have','been','being']; mv=v3; }
  }

  if (pol==='neg' && aux.length>0) {
    if      (aux[0]==='will') aux[0]="won't";
    else if (aux[0]==='am')   aux.splice(1,0,'not');
    else                      aux[0]=aux[0]+"n't";
  }

  const parts=[];
  if (pol==='que' && aux.length>0) {
    const fa=aux.shift();
    parts.push({w:fa[0].toUpperCase()+fa.slice(1), c:'aux'});
    parts.push({w:subj.w.toLowerCase(), c:'subj'});
  } else {
    parts.push({w:subj.w[0].toUpperCase()+subj.w.slice(1), c:'subj'});
  }
  aux.forEach(a=>parts.push({w:a,c:'aux'}));
  if (mv) parts.push({w:mv,c:'verb'});
  const punct = pol==='que' ? '?' : '.';
  if (voice==='act') {
    parts.push({w:sc.obj.w+punct, c:'obj'});
  } else {
    const ag = origSubj.obj_form||origSubj.w.toLowerCase();
    parts.push({w:`by ${ag}${punct}`, c:'obj'});
  }
  return parts;
}

// ── Turkish Translation Engine ───────────────────────────────────
function _trConjugate(verb, subjType, time) {
  if (!verb) return '';
  const lastVowel = (v) => {
    const vowels = v.match(/[aeıioöuü]/g);
    return vowels ? vowels[vowels.length - 1] : 'a';
  };
  const harmony = (v) => {
    const lv = lastVowel(v);
    if ('ae'.includes(lv)) return 'e';
    if ('ıi'.includes(lv)) return 'i';
    if ('ou'.includes(lv)) return 'u';
    return 'ü';
  };
  const harmony4 = (v) => {
    const lv = lastVowel(v);
    if ('aı'.includes(lv)) return 'ı';
    if ('ei'.includes(lv)) return 'i';
    if ('ou'.includes(lv)) return 'u';
    return 'ü';
  };

  const isBen = subjType === 'I';
  const isSen = subjType === 'you';
  const isBiz = subjType === 'we';
  const isSiz = subjType === 'you_pl'; // hypothetical
  const isOnlar = subjType === 'they' || subjType === 'pl';

  // -yor (şimdiki zaman) özel durum
  if (verb.endsWith('yor') || verb.includes('yordu')) {
    if (isBen) return verb + (verb.includes('yordu') ? 'dum' : 'um');
    if (isSen) return verb + (verb.includes('yordu') ? 'dun' : 'sun');
    if (isBiz) return verb + (verb.includes('yordu') ? 'duk' : 'uz');
    if (isOnlar) return verb + 'lar';
    return verb;
  }

  // -ecek / -acak (gelecek zaman) özel durum
  if (verb.endsWith('ecek') || verb.endsWith('acak')) {
    let base = verb;
    if (isBen || isBiz) {
      base = verb.slice(0, -1) + 'ğ'; // yumuşama: içecek -> içeceği-
    }
    if (isBen) return base + (base.endsWith('ğ') ? (harmony4(base) === 'i' ? 'im' : 'ım') : '');
    if (isSen) return verb + (harmony4(verb) === 'i' ? 'sin' : 'sın');
    if (isBiz) return base + (base.endsWith('ğ') ? (harmony4(base) === 'i' ? 'iz' : 'ız') : '');
    if (isOnlar) return verb + 'lar';
    return verb;
  }

  // -di / -ti (geçmiş zaman)
  if (verb.match(/[dt][ıiiuü]$/) || verb.match(/[dt][ıiiuü][sh]tu$/)) {
    if (isBen) return verb + 'm';
    if (isSen) return verb + 'n';
    if (isBiz) return verb + 'k';
    if (isOnlar) return verb + 'lar';
    return verb;
  }

  // Geniş zaman (-r, -ar, -er)
  if (verb.match(/[ae]r$/) || verb.endsWith('z')) {
    if (isBen) return verb + (verb.endsWith('z') ? 'um' : (harmony4(verb) === 'i' ? 'im' : 'ım'));
    if (isSen) return verb + (harmony4(verb) === 'i' ? 'sin' : 'sın');
    if (isBiz) return verb + (verb.endsWith('z') ? 'uz' : (harmony4(verb) === 'i' ? 'iz' : 'ız'));
    if (isOnlar) return verb + 'lar';
    return verb;
  }

  return verb;
}

function trQueForm(verb) {
  const vowelMap = {a:'mı',e:'mi',ı:'mı',i:'mi',o:'mu',ö:'mü',u:'mu',ü:'mü'};
  for (let i=verb.length-1; i>=0; i--) {
    if (vowelMap[verb[i]]) return verb+' '+vowelMap[verb[i]]+'?';
  }
  return verb+' mi?';
}

function generateTurkishTranslation(sc, time, flow, voice, pol) {
  const d = sc.trData;
  if (!d) return '—';
  const side = d[voice];
  const pi = pol === 'neg' ? 1 : 0; // polarity index
  const subjType = voice === 'act' ? sc.subj.type : sc.obj.type;

  let trSubj = side.subj;
  if (voice === 'act') {
    if (sc.subj.type === 'I') trSubj = 'Ben';
    else if (sc.subj.type === 'you') trSubj = 'Sen';
    else if (sc.subj.type === 'we') trSubj = 'Biz';
    else if (sc.subj.type === 'they') trSubj = 'Onlar';
  }

  // ── Yardımcı: -mıştı/-mişti/-muştu/-müştü → -mış/-miş/-muş/-müş ──────────
  function toMiş(v) {
    if (v.endsWith('mıştı'))   return v.slice(0,-2);
    if (v.endsWith('mişti'))   return v.slice(0,-2);
    if (v.endsWith('muştu'))   return v.slice(0,-2);
    if (v.endsWith('müştü'))   return v.slice(0,-2);
    return v;
  }

  function toPastCont(v) { return v + 'du'; }

  let verb;
  if      (time==='pres' && flow==='simp')       verb = side.pres[pi];
  else if (time==='pres' && flow==='cont')       verb = side.prg[pi];
  else if (time==='pres' && flow==='perf')       verb = toMiş(side.ppas[pi]);
  else if (time==='pres' && flow==='perf_cont')  verb = side.prg[pi] + ' olmuş';
  else if (time==='past' && flow==='simp')       verb = side.past[pi];
  else if (time==='past' && flow==='cont')       verb = toPastCont(side.prg[pi]);
  else if (time==='past' && flow==='perf')       verb = side.ppas[pi];
  else if (time==='past' && flow==='perf_cont')  verb = side.prg[pi] + ' olmuştu';
  else if (time==='fut'  && flow==='simp')       verb = side.fut[pi];
  else if (time==='fut'  && flow==='cont')       verb = side.prg[pi] + ' olacak';
  else if (time==='fut'  && flow==='perf')       verb = toMiş(side.ppas[pi]) + ' olacak';
  else if (time==='fut'  && flow==='perf_cont')  verb = side.prg[pi] + ' olmuş olacak';
  else                                           verb = side.pres[pi];

  // Çekimle
  verb = _trConjugate(verb, subjType, time);

  if (pol === 'que') {
    return voice === 'act'
      ? `${trSubj} ${side.obj} ${trQueForm(verb)}`
      : `${side.subj} ${side.agent} ${trQueForm(verb)}`;
  }
  return voice === 'act'
    ? `${trSubj} ${side.obj} ${verb}.`
    : `${side.subj} ${side.agent} ${verb}.`;
}

function stateLabel(s) {
  return `${TR_LABELS.pol[s.pol]} · ${TR_LABELS.time[s.time]} ${TR_LABELS.flow[s.flow]} · ${TR_LABELS.voice[s.voice]}`;
}

function shuffle(arr) { return [...arr].sort(()=>Math.random()-0.5); }
function randScenario() { return QUANTUM_SCENARIOS[Math.floor(Math.random()*QUANTUM_SCENARIOS.length)]; }

// ── Meaning Card ─────────────────────────────────────────────────
function showMeaningCard(shellId, parts, tr, tenseLabel) {
  const shell = document.getElementById(shellId);
  if (!shell) return;
  const old = shell.querySelector('.meaning-card');
  if (old) old.remove();
  const card = document.createElement('div');
  card.className = 'meaning-card';
  card.innerHTML = `
    <div class="mc-en">${parts.map(p=>`<span class="qw-${p.c}">${p.w}</span>`).join(' ')}</div>
    <div class="mc-divider">🇹🇷 Türkçe Anlamı</div>
    <div class="mc-tr">${tr}</div>
    <div class="mc-tense">${tenseLabel}</div>`;
  shell.appendChild(card);
  requestAnimationFrame(()=>card.classList.add('mc-show'));
}

function clearMeaningCard(shellId) {
  const card = document.getElementById(shellId)?.querySelector('.meaning-card');
  if (card) card.remove();
}

// ── Main Hub ─────────────────────────────────────────────────────
class QuantumMode {
  constructor(app) { this.app=app; this.root=null; }

  init(root) { this.root=root; window._qmode=this; this.renderHub(); }
  destroy()  { this.root.innerHTML=''; }
  addXP(n, diff = 'hard')   { if(this.app?.addXP) this.app.addXP(n, diff); }
  confetti() { if(typeof confetti==='function') confetti({particleCount:160,spread:90,origin:{y:0.6},colors:['#00d4ff','#7c3aed','#ec4899']}); }

  renderHub() {
    const wins  = localStorage.getItem('q_wins')  || '0';
    const best  = localStorage.getItem('q_best')  || '—';
    const games = localStorage.getItem('q_games') || '0';

    this.root.innerHTML = `
<div class="qhub-shell">
  <div class="qhub-header">
    <div class="qhub-logo">⚛️</div>
    <h1 class="qhub-title">QUANTUM GAME CENTER</h1>
    <p class="qhub-sub">2 farklı cümle kurma oyunu ile gramer ustası ol</p>
  </div>

  <div class="qhub-stats-bar">
    <div class="qhs-item"><span class="qhs-val">${wins}</span><span class="qhs-lbl">Zafer</span></div>
    <div class="qhs-item"><span class="qhs-val cyan">${best}</span><span class="qhs-lbl">En İyi Skor</span></div>
    <div class="qhs-item"><span class="qhs-val violet">${games}</span><span class="qhs-lbl">Oynanan</span></div>
  </div>

  <div class="qhub-grid">

    <div class="qhub-card blitz" onclick="window._qmode.startGame('rush')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">⚡</div>
      <div class="qhc-body">
        <h2>Sentence Rush</h2>
        <p>10 cümlede kelimeleri doğru sıraya diz. Her cümle için 20 saniye. Hızlı ol, bonus kazan!</p>
        <div class="qhc-tags">
          <span class="qhc-tag">20s / Cümle</span>
          <span class="qhc-tag">10 Cümle</span>
          <span class="qhc-tag amber">+20 XP/cümle</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

    <div class="qhub-card scramble" onclick="window._qmode.startGame('scramble')">
      <div class="qhc-glow"></div>
      <div class="qhc-icon">🧩</div>
      <div class="qhc-body">
        <h2>Sentence Scramble</h2>
        <p>Karışık kelimeleri doğru gramer sırasına yerleştir. Renkler seni yönlendirir.</p>
        <div class="qhc-tags">
          <span class="qhc-tag">8 Cümle</span>
          <span class="qhc-tag">3 Can</span>
          <span class="qhc-tag amber">150 XP</span>
        </div>
      </div>
      <div class="qhc-arrow">→</div>
    </div>

  </div>
</div>`;
  }

  startGame(type) {
    this.root.innerHTML='';
    if (type==='rush')     new SentenceRush(this).start();
    if (type==='scramble') new SentenceScramble(this).start();
  }

  backToHub() { this.renderHub(); }

  recordBest(score) {
    const prev = parseInt(localStorage.getItem('q_best')||'0');
    if (score>prev) localStorage.setItem('q_best', String(score));
  }

  recordWin() {
    localStorage.setItem('q_wins', parseInt(localStorage.getItem('q_wins')||'0')+1);
  }

  recordGame() {
    localStorage.setItem('q_games', parseInt(localStorage.getItem('q_games')||'0')+1);
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 1 — SENTENCE RUSH (20s per sentence)
// ════════════════════════════════════════════════════════════════
class SentenceRush {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.score=0; this.solved=0;
    this.round=0; this.maxRound=10;
    this.timeLeft=20; this.timer=null;
    this.placed=[]; this.remaining=[];
    this.parts=[]; this.sc=null; this.st=null;
  }

  start() {
    this.root.innerHTML=`
<div class="qgame-shell" id="rush-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" onclick="window._rush._stopTimer(); window._qmode.backToHub();">← Hub</button>
    <div class="rush-time-wrap">
      <span class="rush-time-val" id="rush-time">20</span>
      <span class="rush-time-lbl">s</span>
    </div>
    <div class="qgame-topbar-right">
      <span class="rush-solved" id="rush-solved">✓ 0</span>
      <span class="qtb-score" id="rush-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="rush-fill" style="background:var(--amber);width:100%"></div></div>

  <div class="rush-info-bar">
    <span class="rush-icon" id="rush-icon">🍎</span>
    <div style="flex:1">
      <span class="rush-label" id="rush-label">Cümleyi doğru sıraya diz</span>
      <div style="font-size:0.72rem;color:var(--text-3);margin-top:2px" id="rush-round">1/10</div>
    </div>
  </div>

  <div class="sc-drop-zone" id="rush-drop" style="min-height:60px"></div>
  <div class="sc-word-pool" id="rush-pool"></div>

  <div class="rush-actions">
    <button class="sc-clear-btn" onclick="window._rush.clear()">↺ Sıfırla</button>
    <button class="sc-check-btn" onclick="window._rush.check()">✓ Gönder</button>
  </div>

  <div class="arena-feedback" id="rush-feedback"></div>
</div>`;

    window._rush=this;
    this._newSentence();
  }

  _startTimer() {
    this.timeLeft=20; this._stopTimer();
    const fill=document.getElementById('rush-fill');
    const disp=document.getElementById('rush-time');
    if(fill){ fill.style.width='100%'; fill.style.background='var(--amber)'; }
    if(disp){ disp.textContent='20'; disp.style.color='#f59e0b'; }
    this.timer=setInterval(()=>{
      this.timeLeft--;
      if(fill){ fill.style.width=(this.timeLeft/20*100)+'%'; fill.style.background=this.timeLeft<7?'#f43f5e':'var(--amber)'; }
      if(disp){ disp.textContent=this.timeLeft; disp.style.color=this.timeLeft<7?'#f43f5e':'#f59e0b'; }
      if(this.timeLeft<=0){ this._stopTimer(); this._timeOut(); }
    },1000);
  }

  _stopTimer() { if(this.timer){ clearInterval(this.timer); this.timer=null; } }

  _timeOut() {
    this._feedback('⏱️ Süre doldu!','wrong');
    const tr=generateTurkishTranslation(this.sc,this.st.time,this.st.flow,this.st.voice,this.st.pol);
    showMeaningCard('rush-shell',this.parts,tr,stateLabel(this.st));
    setTimeout(()=>this._newSentence(),2800);
  }

  _newSentence() {
    if(this.round>=this.maxRound){ this._stopTimer(); this._over(); return; }
    this.round++;
    this.placed=[];
    clearMeaningCard('rush-shell');
    this.sc=randScenario();
    this.st={
      time: ['pres','past','fut'][Math.floor(Math.random()*3)],
      flow: ['simp','cont','perf'][Math.floor(Math.random()*3)],
      voice:'act',
      pol:  Math.random()>0.3?'aff':'neg',
    };
    this.parts=generateSentence(this.sc,this.st.time,this.st.flow,this.st.voice,this.st.pol);
    this.remaining=shuffle(this.parts.map(p=>({w:p.w.replace(/[?.]/g,''),c:p.c})));

    document.getElementById('rush-icon').textContent=this.sc.icon;
    document.getElementById('rush-label').textContent=stateLabel(this.st);
    document.getElementById('rush-round').textContent=`${this.round}/${this.maxRound}`;

    this._renderPool();
    this._renderDrop();
    this._startTimer();
  }

  _renderPool() {
    const el=document.getElementById('rush-pool');
    if(!el)return;
    el.innerHTML=this.remaining.map((w,i)=>
      `<button class="sc-word-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-word-chip').forEach(btn=>{
      btn.onclick=()=>{
        const i=parseInt(btn.dataset.i);
        this.placed.push(this.remaining[i]);
        this.remaining.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  _renderDrop() {
    const el=document.getElementById('rush-drop');
    if(!el)return;
    if(!this.placed.length){ el.innerHTML='<div class="sc-dz-placeholder">Kelimelere tıkla →</div>'; return; }
    el.innerHTML=this.placed.map((w,i)=>
      `<button class="sc-placed-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-placed-chip').forEach(btn=>{
      btn.onclick=()=>{
        const i=parseInt(btn.dataset.i);
        this.remaining.push(this.placed[i]);
        this.placed.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  clear() {
    this.remaining=[...this.remaining,...this.placed];
    this.placed=[];
    this._renderPool(); this._renderDrop();
  }

  check() {
    const correctWords=this.parts.map(p=>p.w.replace(/[?.]/g,'').toLowerCase());
    const userWords=this.placed.map(w=>w.w.toLowerCase());
    if(userWords.length!==correctWords.length){
      this._feedback('⚠️ Tüm kelimeleri kullan!','warn'); return;
    }
    const ok=correctWords.every((w,i)=>w===userWords[i]);
    if(ok){
      this._stopTimer();
      this.solved++;
      const bonus=20+this.timeLeft*2;
      this.score+=bonus;
      document.getElementById('rush-solved').textContent=`✓ ${this.solved}`;
      document.getElementById('rush-score').textContent=this.score;
      const sh=document.getElementById('rush-shell');
      if(sh){sh.classList.add('flash-green');setTimeout(()=>sh.classList.remove('flash-green'),400);}
      this._feedback(`✅ +${bonus} puan!`,'correct');
      const tr=generateTurkishTranslation(this.sc,this.st.time,this.st.flow,this.st.voice,this.st.pol);
      showMeaningCard('rush-shell',this.parts,tr,stateLabel(this.st));
      setTimeout(()=>this._newSentence(),2500);
    } else {
      const sh=document.getElementById('rush-shell');
      if(sh){sh.classList.add('shake');setTimeout(()=>sh.classList.remove('shake'),400);}
      this._feedback('❌ Yanlış sıra! Tekrar dene.','wrong');
    }
  }

  _feedback(msg,type){
    const el=document.getElementById('rush-feedback');
    if(!el)return;
    el.textContent=msg; el.className=`arena-feedback fb-${type} fb-show`;
    setTimeout(()=>el.classList.remove('fb-show'),900);
  }

  _over(){
    this.qm.recordGame();
    this.qm.recordBest(this.score);
    const won=this.solved>=5;
    const baseWin = window.remoteFlags?.xp_quantum_win ?? 100;
    const mult = window.remoteFlags?.multiplier_hard ?? 2.0;
    
    const baseXP = won ? baseWin : this.solved * 10;
    const finalXP = Math.round(baseXP * mult);

    if(won){ 
      this.qm.recordWin(); 
      this.qm.addXP(baseXP, 'hard'); 
      this.qm.confetti(); 
    } else { 
      this.qm.addXP(baseXP, 'hard'); 
    }
    
    this.root.innerHTML=_resultHTML('⚡','Sentence Rush',won,this.score,`${this.solved}/10 cümle çözüldü`,finalXP,'rush');
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 2 — SENTENCE SCRAMBLE (color-coded)
// ════════════════════════════════════════════════════════════════
class SentenceScramble {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.round=0; this.maxRound=8;
    this.lives=3; this.score=0; this.solved=0;
    this.placed=[]; this.remaining=[];
    this.parts=[]; this.sc=null; this.st=null;
    this.timer=null; this.timeLeft=30;
    this._busy=false; // prevents double-submit during feedback delay
  }

  start() {
    this.root.innerHTML=`
<div class="qgame-shell" id="ss-shell">
  <div class="qgame-topbar">
    <button class="qback-btn" onclick="window._ss._stopTimer(); window._qmode.backToHub();">← Hub</button>
    <div class="qgame-topbar-center">
      <span class="qtb-label">Round</span>
      <span class="qtb-val" id="ss-round">1/8</span>
    </div>
    <div class="qgame-topbar-right">
      <span id="ss-lives">❤️❤️❤️</span>
      <span class="qtb-score" id="ss-score">0</span>
    </div>
  </div>

  <div class="arena-timer-bar"><div class="arena-timer-fill" id="ss-timer" style="background:var(--green)"></div></div>

  <div class="ss-info-card">
    <span class="ss-icon" id="ss-icon">🍎</span>
    <div class="ss-info-mid">
      <div class="atc-label">HEDEF YAPI</div>
      <div class="atc-state" id="ss-state">—</div>
    </div>
    <span class="ss-time" id="ss-time">30s</span>
  </div>

  <div class="ss-legend">
    <span class="ss-lg c-subj">Özne</span>
    <span class="ss-lg c-aux">Yardımcı</span>
    <span class="ss-lg c-verb">Fiil</span>
    <span class="ss-lg c-obj">Nesne</span>
  </div>

  <div class="sc-drop-zone" id="ss-drop"></div>
  <div class="sc-word-pool" id="ss-pool"></div>

  <div class="sc-controls">
    <button class="sc-clear-btn" onclick="window._ss.clear()">↺ Sıfırla</button>
    <button class="sc-check-btn" onclick="window._ss.check()">✓ Gönder</button>
  </div>

  <div class="arena-feedback" id="ss-feedback"></div>
</div>`;

    window._ss=this;
    this._newRound();
  }

  _newRound() {
    if(this.round>=this.maxRound){ this._over(true); return; }
    this.round++;
    this.placed=[];
    this._busy=false;
    clearMeaningCard('ss-shell');
    this.sc=randScenario();
    this.st={
      time:  ['pres','past','fut'][Math.floor(Math.random()*3)],
      flow:  ['simp','cont','perf','perf_cont'][Math.floor(Math.random()*4)],
      voice: Math.random()>0.4?'act':'pass',
      pol:   Math.random()>0.3?'aff':'neg',
    };
    this.parts=generateSentence(this.sc,this.st.time,this.st.flow,this.st.voice,this.st.pol);
    this.remaining=shuffle(this.parts.map(p=>({w:p.w.replace(/[?.]/g,''),c:p.c})));

    document.getElementById('ss-round').textContent=`${this.round}/${this.maxRound}`;
    document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    document.getElementById('ss-score').textContent=this.score;
    document.getElementById('ss-icon').textContent=this.sc.icon;
    document.getElementById('ss-state').textContent=stateLabel(this.st);

    this._renderPool(); this._renderDrop();
    this._startTimer();
  }

  _renderPool() {
    const el=document.getElementById('ss-pool');
    if(!el)return;
    el.innerHTML=this.remaining.map((w,i)=>
      `<button class="sc-word-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-word-chip').forEach(btn=>{
      btn.onclick=()=>{
        if(this._busy)return;
        const i=parseInt(btn.dataset.i);
        this.placed.push(this.remaining[i]);
        this.remaining.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  _renderDrop() {
    const el=document.getElementById('ss-drop');
    if(!el)return;
    if(!this.placed.length){ el.innerHTML='<div class="sc-dz-placeholder">Kelimelere tıkla, cümleyi kur →</div>'; return; }
    el.innerHTML=this.placed.map((w,i)=>
      `<button class="sc-placed-chip c-${w.c}" data-i="${i}">${w.w}</button>`
    ).join('');
    el.querySelectorAll('.sc-placed-chip').forEach(btn=>{
      btn.onclick=()=>{
        if(this._busy)return;
        const i=parseInt(btn.dataset.i);
        this.remaining.push(this.placed[i]);
        this.placed.splice(i,1);
        this._renderPool(); this._renderDrop();
      };
    });
  }

  clear() {
    if(this._busy)return;
    this.remaining=[...this.remaining,...this.placed];
    this.placed=[];
    this._renderPool(); this._renderDrop();
  }

  check() {
    if(this._busy)return;
    const correct=this.parts.map(p=>p.w.replace(/[?.]/g,'').toLowerCase());
    const user=this.placed.map(w=>w.w.toLowerCase());
    if(user.length!==correct.length){ this._feedback('⚠️ Tüm kelimeleri kullan!','warn'); return; }

    this._stopTimer();
    const ok=correct.every((w,i)=>w===user[i]);
    const tr=generateTurkishTranslation(this.sc,this.st.time,this.st.flow,this.st.voice,this.st.pol);

    if(ok){
      const bonus=25+Math.ceil(this.timeLeft*2);
      this.score+=bonus;
      this.solved++;
      this._feedback(`✅ Harika! +${bonus} puan`,'correct');
      const sh=document.getElementById('ss-shell');
      if(sh){sh.classList.add('flash-green');setTimeout(()=>sh.classList.remove('flash-green'),500);}
      document.getElementById('ss-score').textContent=this.score;
      showMeaningCard('ss-shell',this.parts,tr,stateLabel(this.st));
      this._busy=true;
      setTimeout(()=>this._newRound(),2800);
    } else {
      this.lives--;
      this._feedback('❌ Yanlış sıra! −1 can','wrong');
      const sh=document.getElementById('ss-shell');
      if(sh){sh.classList.add('shake');setTimeout(()=>sh.classList.remove('shake'),500);}
      document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
      showMeaningCard('ss-shell',this.parts,tr,stateLabel(this.st));
      this._busy=true;
      if(this.lives<=0){ setTimeout(()=>this._over(false),2800); return; }
      setTimeout(()=>{
        clearMeaningCard('ss-shell');
        this.clear();
        this._busy=false;
        this._startTimer();
      },2800);
    }
  }

  _startTimer() {
    this.timeLeft=30; this._stopTimer();
    const fill=document.getElementById('ss-timer');
    const disp=document.getElementById('ss-time');
    this.timer=setInterval(()=>{
      this.timeLeft--;
      if(fill){ fill.style.width=(this.timeLeft/30*100)+'%'; fill.style.background=this.timeLeft<10?'#f43f5e':'var(--green)'; }
      if(disp) disp.textContent=`${this.timeLeft}s`;
      if(this.timeLeft<=0){ this._stopTimer(); this._timeOut(); }
    },1000);
  }

  _stopTimer(){ if(this.timer){ clearInterval(this.timer); this.timer=null; } }

  _timeOut(){
    this.lives--;
    this._feedback('⏱️ Süre doldu! −1 can','wrong');
    document.getElementById('ss-lives').textContent='❤️'.repeat(this.lives)+'🖤'.repeat(3-this.lives);
    const tr=generateTurkishTranslation(this.sc,this.st.time,this.st.flow,this.st.voice,this.st.pol);
    showMeaningCard('ss-shell',this.parts,tr,stateLabel(this.st));
    this._busy=true;
    if(this.lives<=0){ setTimeout(()=>this._over(false),2800); return; }
    setTimeout(()=>this._newRound(),2800);
  }

  _feedback(msg,type){
    const el=document.getElementById('ss-feedback');
    if(!el)return;
    el.textContent=msg; el.className=`arena-feedback fb-${type} fb-show`;
    setTimeout(()=>el.classList.remove('fb-show'),2000);
  }

  _over(won) {
    this._stopTimer();
    this.qm.recordGame();
    this.qm.recordBest(this.score);
    const baseWin = window.remoteFlags?.xp_quantum_win ?? 100;
    const mult = window.remoteFlags?.multiplier_hard ?? 2.0;

    const baseXP  = won ? baseWin : this.solved * 25;
    const finalXP = Math.round(baseXP * mult);

    if(won){ 
      this.qm.recordWin(); 
      this.qm.addXP(baseXP, 'hard'); 
      this.qm.confetti(); 
    } else { 
      this.qm.addXP(baseXP, 'hard'); 
    }
    this.root.innerHTML=_resultHTML('🧩','Sentence Scramble',won,this.score,`${this.maxRound} cümle`,finalXP,'scramble');
  }
}

// ── Shared Result Screen ──────────────────────────────────────────
function _resultHTML(icon,game,won,score,sub,xp,gameKey){
  return `
<div class="qresult-shell">
  <div class="qresult-icon">${icon}</div>
  <h1 class="qresult-title">${won?'TAMAMLANDI!':'GAME OVER'}</h1>
  <div class="qresult-score">${score}</div>
  <div class="qresult-sub">${game} · ${sub}</div>
  <div class="qresult-xp">+${xp} XP kazandın!</div>
  <div class="qresult-btns">
    <button class="qres-btn primary" onclick="window._qmode.startGame('${gameKey}')">🔄 Tekrar Oyna</button>
    <button class="qres-btn ghost" onclick="window._qmode.backToHub()">← Hub</button>
  </div>
</div>`;
}

window.QuantumMode = QuantumMode;
