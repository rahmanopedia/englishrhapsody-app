// ════════════════════════════════════════════════════════════════
//  QUANTUM GAME CENTER — Sentence Building Games
// ════════════════════════════════════════════════════════════════

const QUANTUM_SCENARIOS = [
  {
    id:'s1', icon:'🍎',
    subj:{w:'I',          type:'I',  obj_form:'me'        },
    verb:{v1:'eat',     v2:'ate',      v3:'eaten',    ving:'eating'    },
    obj: {w:'an apple',       type:'sg'},
    trData:{
      act:{ subj:'Ben', obj:'bir elma',
        pres:['yerim','yemem'], prg:['yiyorum','yemiyorum'],
        past:['yedim','yemedim'], ppas:['yemiştim','yememiştim'],
        fut:['yiyeceğim','yemeyeceğim'] },
      pass:{ subj:'Bir elma', agent:'benim tarafımdan',
        pres:['yenilir','yenilmez'], prg:['yeniliyor','yenilmiyor'],
        past:['yenildi','yenilmedi'], ppas:['yenilmişti','yenilmemişti'],
        fut:['yenilecek','yenilmeyecek'] }
    }
  },
  // ── 35 new scenarios added below ────────────────────────────────
  {
    id:'s2', icon:'🐕',
    subj:{w:'The dog',    type:'sg', obj_form:'the dog'   },
    verb:{v1:'chase',   v2:'chased',   v3:'chased',   ving:'chasing'   },
    obj: {w:'the cat',        type:'sg'},
    trData:{
      act:{ subj:'Köpek', obj:'kediyi',
        pres:['kovalar','kovamaz'], prg:['kovalıyor','kovalamıyor'],
        past:['kovaladı','kovalamadı'], ppas:['kovalamıştı','kovalamamıştı'],
        fut:['kovalayacak','kovalamayacak'] },
      pass:{ subj:'Kedi', agent:'köpek tarafından',
        pres:['kovalanır','kovalanmaz'], prg:['kovalanıyor','kovalanmıyor'],
        past:['kovalandı','kovalanmadı'], ppas:['kovalanmıştı','kovalanmamıştı'],
        fut:['kovalanacak','kovalanmayacak'] }
    }
  },
  {
    id:'s3', icon:'✉️',
    subj:{w:'She',        type:'sg', obj_form:'her'       },
    verb:{v1:'write',   v2:'wrote',    v3:'written',  ving:'writing'   },
    obj: {w:'a letter',       type:'sg'},
    trData:{
      act:{ subj:'O', obj:'bir mektup',
        pres:['yazar','yazmaz'], prg:['yazıyor','yazmıyor'],
        past:['yazdı','yazmadı'], ppas:['yazmıştı','yazmamıştı'],
        fut:['yazacak','yazmayacak'] },
      pass:{ subj:'Bir mektup', agent:'onun tarafından',
        pres:['yazılır','yazılmaz'], prg:['yazılıyor','yazılmıyor'],
        past:['yazıldı','yazılmadı'], ppas:['yazılmıştı','yazılmamıştı'],
        fut:['yazılacak','yazılmayacak'] }
    }
  },
  {
    id:'s4', icon:'🌉',
    subj:{w:'They',       type:'pl', obj_form:'them'      },
    verb:{v1:'build',   v2:'built',    v3:'built',    ving:'building'  },
    obj: {w:'a bridge',       type:'sg'},
    trData:{
      act:{ subj:'Onlar', obj:'bir köprü',
        pres:['inşa ederler','inşa etmezler'], prg:['inşa ediyorlar','inşa etmiyorlar'],
        past:['inşa ettiler','inşa etmediler'], ppas:['inşa etmişlerdi','inşa etmemişlerdi'],
        fut:['inşa edecekler','inşa etmeyecekler'] },
      pass:{ subj:'Bir köprü', agent:'onlar tarafından',
        pres:['inşa edilir','inşa edilmez'], prg:['inşa ediliyor','inşa edilmiyor'],
        past:['inşa edildi','inşa edilmedi'], ppas:['inşa edilmişti','inşa edilmemişti'],
        fut:['inşa edilecek','inşa edilmeyecek'] }
    }
  },
  {
    id:'s5', icon:'💻',
    subj:{w:'The hacker', type:'sg', obj_form:'the hacker'},
    verb:{v1:'steal',   v2:'stole',    v3:'stolen',   ving:'stealing'  },
    obj: {w:'the files',      type:'pl'},
    trData:{
      act:{ subj:'Hacker', obj:'dosyaları',
        pres:['çalar','çalmaz'], prg:['çalıyor','çalmıyor'],
        past:['çaldı','çalmadı'], ppas:['çalmıştı','çalmamıştı'],
        fut:['çalacak','çalmayacak'] },
      pass:{ subj:'Dosyalar', agent:'hacker tarafından',
        pres:['çalınır','çalınmaz'], prg:['çalınıyor','çalınmıyor'],
        past:['çalındı','çalınmadı'], ppas:['çalınmıştı','çalınmamıştı'],
        fut:['çalınacak','çalınmayacak'] }
    }
  },
  {
    id:'s6', icon:'👨‍🍳',
    subj:{w:'The chef',   type:'sg', obj_form:'the chef'  },
    verb:{v1:'cook',    v2:'cooked',   v3:'cooked',   ving:'cooking'   },
    obj: {w:'the meal',       type:'sg'},
    trData:{
      act:{ subj:'Şef', obj:'yemeği',
        pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'],
        past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'],
        fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Yemek', agent:'şef tarafından',
        pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'],
        past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'],
        fut:['pişirilecek','pişirilmeyecek'] }
    }
  },
  {
    id:'s7', icon:'🪐',
    subj:{w:'We',         type:'pl', obj_form:'us'        },
    verb:{v1:'discover',v2:'discovered',v3:'discovered',ving:'discovering'},
    obj: {w:'a new planet',   type:'sg'},
    trData:{
      act:{ subj:'Biz', obj:'yeni bir gezegen',
        pres:['keşfederiz','keşfetmeyiz'], prg:['keşfediyoruz','keşfetmiyoruz'],
        past:['keşfettik','keşfetmedik'], ppas:['keşfetmiştik','keşfetmemiştik'],
        fut:['keşfedeceğiz','keşfetmeyeceğiz'] },
      pass:{ subj:'Yeni bir gezegen', agent:'bizim tarafımızdan',
        pres:['keşfedilir','keşfedilmez'], prg:['keşfediliyor','keşfedilmiyor'],
        past:['keşfedildi','keşfedilmedi'], ppas:['keşfedilmişti','keşfedilmemişti'],
        fut:['keşfedilecek','keşfedilmeyecek'] }
    }
  },
  {
    id:'s8', icon:'🤖',
    subj:{w:'The robot',  type:'sg', obj_form:'the robot' },
    verb:{v1:'destroy', v2:'destroyed',v3:'destroyed',ving:'destroying' },
    obj: {w:'the city',       type:'sg'},
    trData:{
      act:{ subj:'Robot', obj:'şehri',
        pres:['yok eder','yok etmez'], prg:['yok ediyor','yok etmiyor'],
        past:['yok etti','yok etmedi'], ppas:['yok etmişti','yok etmemişti'],
        fut:['yok edecek','yok etmeyecek'] },
      pass:{ subj:'Şehir', agent:'robot tarafından',
        pres:['yok edilir','yok edilmez'], prg:['yok ediliyor','yok edilmiyor'],
        past:['yok edildi','yok edilmedi'], ppas:['yok edilmişti','yok edilmemişti'],
        fut:['yok edilecek','yok edilmeyecek'] }
    }
  },
  {
    id:'s9', icon:'🧙',
    subj:{w:'The wizard', type:'sg', obj_form:'the wizard'},
    verb:{v1:'cast',    v2:'cast',     v3:'cast',     ving:'casting'   },
    obj: {w:'a spell',        type:'sg'},
    trData:{
      act:{ subj:'Büyücü', obj:'bir büyü',
        pres:['yapar','yapmaz'], prg:['yapıyor','yapmıyor'],
        past:['yaptı','yapmadı'], ppas:['yapmıştı','yapmamıştı'],
        fut:['yapacak','yapmayacak'] },
      pass:{ subj:'Bir büyü', agent:'büyücü tarafından',
        pres:['yapılır','yapılmaz'], prg:['yapılıyor','yapılmıyor'],
        past:['yapıldı','yapılmadı'], ppas:['yapılmıştı','yapılmamıştı'],
        fut:['yapılacak','yapılmayacak'] }
    }
  },
  {
    id:'s10', icon:'🐉',
    subj:{w:'The dragon', type:'sg', obj_form:'the dragon'},
    verb:{v1:'burn',    v2:'burned',   v3:'burned',   ving:'burning'   },
    obj: {w:'the castle',     type:'sg'},
    trData:{
      act:{ subj:'Ejderha', obj:'kaleyi',
        pres:['yakar','yakmaz'], prg:['yakıyor','yakmıyor'],
        past:['yaktı','yakmadı'], ppas:['yakmıştı','yakmamıştı'],
        fut:['yakacak','yakmayacak'] },
      pass:{ subj:'Kale', agent:'ejderha tarafından',
        pres:['yakılır','yakılmaz'], prg:['yakılıyor','yakılmıyor'],
        past:['yakıldı','yakılmadı'], ppas:['yakılmıştı','yakılmamıştı'],
        fut:['yakılacak','yakılmayacak'] }
    }
  },
  {
    id:'s11', icon:'🔍',
    subj:{w:'You',        type:'you',obj_form:'you'       },
    verb:{v1:'solve',   v2:'solved',   v3:'solved',   ving:'solving'   },
    obj: {w:'the mystery',    type:'sg'},
    trData:{
      act:{ subj:'Sen', obj:'gizemi',
        pres:['çözersin','çözmezsin'], prg:['çözüyorsun','çözmüyorsun'],
        past:['çözdün','çözmedin'], ppas:['çözmüştün','çözmemiştin'],
        fut:['çözeceksin','çözmeyeceksin'] },
      pass:{ subj:'Gizem', agent:'senin tarafından',
        pres:['çözülür','çözülmez'], prg:['çözülüyor','çözülmüyor'],
        past:['çözüldü','çözülmedi'], ppas:['çözülmüştü','çözülmemişti'],
        fut:['çözülecek','çözülmeyecek'] }
    }
  },
  {
    id:'s12', icon:'🚀',
    subj:{w:'The pilot',  type:'sg', obj_form:'the pilot' },
    verb:{v1:'land',    v2:'landed',   v3:'landed',   ving:'landing'   },
    obj: {w:'the spacecraft', type:'sg'},
    trData:{
      act:{ subj:'Pilot', obj:'uzay aracını',
        pres:['indirir','indirmez'], prg:['indiriyor','indirmiyor'],
        past:['indirdi','indirmedi'], ppas:['indirmişti','indirmemişti'],
        fut:['indirecek','indirmeyecek'] },
      pass:{ subj:'Uzay aracı', agent:'pilot tarafından',
        pres:['indirilir','indirilmez'], prg:['indiriliyor','indirilmiyor'],
        past:['indirildi','indirilmedi'], ppas:['indirilmişti','indirilmemişti'],
        fut:['indirilecek','indirilmeyecek'] }
    }
  },
  {
    id:'s13', icon:'🔭',
    subj:{w:'Scientists', type:'pl', obj_form:'scientists'},
    verb:{v1:'study',   v2:'studied',  v3:'studied',  ving:'studying'  },
    obj: {w:'the stars',      type:'pl'},
    trData:{
      act:{ subj:'Bilim insanları', obj:'yıldızları',
        pres:['incelerler','incelemezler'], prg:['inceliyorlar','incelemiyorlar'],
        past:['incelediler','incelemediler'], ppas:['incelemişlerdi','incelememişlerdi'],
        fut:['inceleyecekler','incelemeyecekler'] },
      pass:{ subj:'Yıldızlar', agent:'bilim insanları tarafından',
        pres:['incelenir','incelenmez'], prg:['inceleniyor','incelenmiyor'],
        past:['incelendi','incelenmedi'], ppas:['incelenmişti','incelenmemişti'],
        fut:['incelenecek','incelenmeyecek'] }
    }
  },
  {
    id:'s14', icon:'🎨',
    subj:{w:'The artist', type:'sg', obj_form:'the artist'},
    verb:{v1:'paint',   v2:'painted',  v3:'painted',  ving:'painting'  },
    obj: {w:'a masterpiece',  type:'sg'},
    trData:{
      act:{ subj:'Sanatçı', obj:'bir başyapıt',
        pres:['boyar','boyamaz'], prg:['boyuyor','boyamıyor'],
        past:['boyadı','boyamadı'], ppas:['boyamıştı','boyamamıştı'],
        fut:['boyayacak','boyamayacak'] },
      pass:{ subj:'Bir başyapıt', agent:'sanatçı tarafından',
        pres:['boyanır','boyanmaz'], prg:['boyanıyor','boyanmıyor'],
        past:['boyandı','boyanmadı'], ppas:['boyanmıştı','boyanmamıştı'],
        fut:['boyanacak','boyanmayacak'] }
    }
  },
  {
    id:'s15', icon:'⚔️',
    subj:{w:'The knight', type:'sg', obj_form:'the knight'},
    verb:{v1:'protect', v2:'protected',v3:'protected',ving:'protecting'},
    obj: {w:'the kingdom',    type:'sg'},
    trData:{
      act:{ subj:'Şövalye', obj:'krallığı',
        pres:['korur','korumaz'], prg:['koruyor','korumuyor'],
        past:['korudu','korumadı'], ppas:['korumuştu','korumamıştı'],
        fut:['koruyacak','korumayacak'] },
      pass:{ subj:'Krallık', agent:'şövalye tarafından',
        pres:['korunur','korunmaz'], prg:['korunuyor','korunmuyor'],
        past:['korundu','korunmadı'], ppas:['korunmuştu','korunmamıştı'],
        fut:['korunacak','korunmayacak'] }
    }
  },
  {
    id:'s16', icon:'📖',
    subj:{w:'The teacher', type:'sg', obj_form:'the teacher'},
    verb:{v1:'explain',  v2:'explained', v3:'explained', ving:'explaining'},
    obj: {w:'the lesson',     type:'sg'},
    trData:{
      act:{ subj:'Öğretmen', obj:'dersi',
        pres:['açıklar','açıklamaz'], prg:['açıklıyor','açıklamıyor'],
        past:['açıkladı','açıklamadı'], ppas:['açıklamıştı','açıklamamıştı'],
        fut:['açıklayacak','açıklamayacak'] },
      pass:{ subj:'Ders', agent:'öğretmen tarafından',
        pres:['açıklanır','açıklanmaz'], prg:['açıklanıyor','açıklanmıyor'],
        past:['açıklandı','açıklanmadı'], ppas:['açıklanmıştı','açıklanmamıştı'],
        fut:['açıklanacak','açıklanmayacak'] }
    }
  },
  {
    id:'s17', icon:'🐱',
    subj:{w:'The cat',    type:'sg', obj_form:'the cat'   },
    verb:{v1:'catch',    v2:'caught',   v3:'caught',   ving:'catching'  },
    obj: {w:'the mouse',      type:'sg'},
    trData:{
      act:{ subj:'Kedi', obj:'fareyi',
        pres:['yakalar','yakalamaz'], prg:['yakalıyor','yakalamıyor'],
        past:['yakaladı','yakalamadı'], ppas:['yakalamıştı','yakalamamıştı'],
        fut:['yakalayacak','yakalamayacak'] },
      pass:{ subj:'Fare', agent:'kedi tarafından',
        pres:['yakalanır','yakalanmaz'], prg:['yakalanıyor','yakalanmıyor'],
        past:['yakalandı','yakalanmadı'], ppas:['yakalanmıştı','yakalanmamıştı'],
        fut:['yakalanacak','yakalanmayacak'] }
    }
  },
  {
    id:'s18', icon:'📚',
    subj:{w:'The student', type:'sg', obj_form:'the student'},
    verb:{v1:'read',     v2:'read',     v3:'read',     ving:'reading'   },
    obj: {w:'a book',         type:'sg'},
    trData:{
      act:{ subj:'Öğrenci', obj:'bir kitap',
        pres:['okur','okumaz'], prg:['okuyor','okumuyor'],
        past:['okudu','okumadı'], ppas:['okumuştu','okumamıştı'],
        fut:['okuyacak','okumayacak'] },
      pass:{ subj:'Bir kitap', agent:'öğrenci tarafından',
        pres:['okunur','okunmaz'], prg:['okunuyor','okunmuyor'],
        past:['okundu','okunmadı'], ppas:['okunmuştu','okunmamıştı'],
        fut:['okunacak','okunmayacak'] }
    }
  },
  {
    id:'s19', icon:'🏥',
    subj:{w:'The doctor', type:'sg', obj_form:'the doctor'},
    verb:{v1:'save',     v2:'saved',    v3:'saved',    ving:'saving'    },
    obj: {w:'the patient',    type:'sg'},
    trData:{
      act:{ subj:'Doktor', obj:'hastayı',
        pres:['kurtarır','kurtarmaz'], prg:['kurtarıyor','kurtarmıyor'],
        past:['kurtardı','kurtarmadı'], ppas:['kurtarmıştı','kurtarmamıştı'],
        fut:['kurtaracak','kurtarmayacak'] },
      pass:{ subj:'Hasta', agent:'doktor tarafından',
        pres:['kurtarılır','kurtarılmaz'], prg:['kurtarılıyor','kurtarılmıyor'],
        past:['kurtarıldı','kurtarılmadı'], ppas:['kurtarılmıştı','kurtarılmamıştı'],
        fut:['kurtarılacak','kurtarılmayacak'] }
    }
  },
  {
    id:'s20', icon:'🕵️',
    subj:{w:'The spy',   type:'sg', obj_form:'the spy'   },
    verb:{v1:'find',     v2:'found',    v3:'found',    ving:'finding'   },
    obj: {w:'the secret',     type:'sg'},
    trData:{
      act:{ subj:'Casus', obj:'sırrı',
        pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'],
        past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'],
        fut:['bulacak','bulmayacak'] },
      pass:{ subj:'Sır', agent:'casus tarafından',
        pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'],
        past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'],
        fut:['bulunacak','bulunmayacak'] }
    }
  },
  {
    id:'s21', icon:'🧸',
    subj:{w:'The child',  type:'sg', obj_form:'the child' },
    verb:{v1:'break',    v2:'broke',    v3:'broken',   ving:'breaking'  },
    obj: {w:'the toy',        type:'sg'},
    trData:{
      act:{ subj:'Çocuk', obj:'oyuncağı',
        pres:['kırar','kırmaz'], prg:['kırıyor','kırmıyor'],
        past:['kırdı','kırmadı'], ppas:['kırmıştı','kırmamıştı'],
        fut:['kıracak','kırmayacak'] },
      pass:{ subj:'Oyuncak', agent:'çocuk tarafından',
        pres:['kırılır','kırılmaz'], prg:['kırılıyor','kırılmıyor'],
        past:['kırıldı','kırılmadı'], ppas:['kırılmıştı','kırılmamıştı'],
        fut:['kırılacak','kırılmayacak'] }
    }
  },
  {
    id:'s22', icon:'🎤',
    subj:{w:'The singer', type:'sg', obj_form:'the singer'},
    verb:{v1:'sing',     v2:'sang',     v3:'sung',     ving:'singing'   },
    obj: {w:'a song',         type:'sg'},
    trData:{
      act:{ subj:'Şarkıcı', obj:'bir şarkı',
        pres:['söyler','söylemez'], prg:['söylüyor','söylemiyor'],
        past:['söyledi','söylemedi'], ppas:['söylemişti','söylememişti'],
        fut:['söyleyecek','söylemeyecek'] },
      pass:{ subj:'Bir şarkı', agent:'şarkıcı tarafından',
        pres:['söylenir','söylenmez'], prg:['söyleniyor','söylenmiyor'],
        past:['söylendi','söylenmedi'], ppas:['söylenmişti','söylenmemişti'],
        fut:['söylenecek','söylenmeyecek'] }
    }
  },
  {
    id:'s23', icon:'🪖',
    subj:{w:'The soldier', type:'sg', obj_form:'the soldier'},
    verb:{v1:'defend',   v2:'defended', v3:'defended', ving:'defending' },
    obj: {w:'the country',    type:'sg'},
    trData:{
      act:{ subj:'Asker', obj:'ülkeyi',
        pres:['savunur','savunmaz'], prg:['savunuyor','savunmuyor'],
        past:['savundu','savunmadı'], ppas:['savunmuştu','savunmamıştı'],
        fut:['savunacak','savunmayacak'] },
      pass:{ subj:'Ülke', agent:'asker tarafından',
        pres:['savunulur','savunulmaz'], prg:['savunuluyor','savunulmuyor'],
        past:['savunuldu','savunulmadı'], ppas:['savunulmuştu','savunulmamıştı'],
        fut:['savunulacak','savunulmayacak'] }
    }
  },
  {
    id:'s24', icon:'⛈️',
    subj:{w:'The storm',  type:'sg', obj_form:'the storm' },
    verb:{v1:'hit',      v2:'hit',      v3:'hit',      ving:'hitting'   },
    obj: {w:'the ship',       type:'sg'},
    trData:{
      act:{ subj:'Fırtına', obj:'gemiyi',
        pres:['vurur','vurmaz'], prg:['vuruyor','vurmuyor'],
        past:['vurdu','vurmadı'], ppas:['vurmuştu','vurmamıştı'],
        fut:['vuracak','vurmayacak'] },
      pass:{ subj:'Gemi', agent:'fırtına tarafından',
        pres:['vurulur','vurulmaz'], prg:['vuruluyor','vurulmuyor'],
        past:['vuruldu','vurulmadı'], ppas:['vurulmuştu','vurulmamıştı'],
        fut:['vurulacak','vurulmayacak'] }
    }
  },
  {
    id:'s25', icon:'👑',
    subj:{w:'The queen',  type:'sg', obj_form:'the queen' },
    verb:{v1:'rule',     v2:'ruled',    v3:'ruled',    ving:'ruling'    },
    obj: {w:'the empire',     type:'sg'},
    trData:{
      act:{ subj:'Kraliçe', obj:'imparatorluğu',
        pres:['yönetir','yönetmez'], prg:['yönetiyor','yönetmiyor'],
        past:['yönetti','yönetmedi'], ppas:['yönetmişti','yönetmemişti'],
        fut:['yönetecek','yönetmeyecek'] },
      pass:{ subj:'İmparatorluk', agent:'kraliçe tarafından',
        pres:['yönetilir','yönetilmez'], prg:['yönetiliyor','yönetilmiyor'],
        past:['yönetildi','yönetilmedi'], ppas:['yönetilmişti','yönetilmemişti'],
        fut:['yönetilecek','yönetilmeyecek'] }
    }
  },
  {
    id:'s26', icon:'🏹',
    subj:{w:'The hunter', type:'sg', obj_form:'the hunter'},
    verb:{v1:'shoot',    v2:'shot',     v3:'shot',     ving:'shooting'  },
    obj: {w:'the wolf',       type:'sg'},
    trData:{
      act:{ subj:'Avcı', obj:'kurdu',
        pres:['vurur','vurmaz'], prg:['vuruyor','vurmuyor'],
        past:['vurdu','vurmadı'], ppas:['vurmuştu','vurmamıştı'],
        fut:['vuracak','vurmayacak'] },
      pass:{ subj:'Kurt', agent:'avcı tarafından',
        pres:['vurulur','vurulmaz'], prg:['vuruluyor','vurulmuyor'],
        past:['vuruldu','vurulmadı'], ppas:['vurulmuştu','vurulmamıştı'],
        fut:['vurulacak','vurulmayacak'] }
    }
  },
  {
    id:'s27', icon:'🎓',
    subj:{w:'The professor', type:'sg', obj_form:'the professor'},
    verb:{v1:'teach',    v2:'taught',   v3:'taught',   ving:'teaching'  },
    obj: {w:'the students',   type:'pl'},
    trData:{
      act:{ subj:'Profesör', obj:'öğrencileri',
        pres:['öğretir','öğretmez'], prg:['öğretiyor','öğretmiyor'],
        past:['öğretti','öğretmedi'], ppas:['öğretmişti','öğretmemişti'],
        fut:['öğretecek','öğretmeyecek'] },
      pass:{ subj:'Öğrenciler', agent:'profesör tarafından',
        pres:['öğretilir','öğretilmez'], prg:['öğretiliyor','öğretilmiyor'],
        past:['öğretildi','öğretilmedi'], ppas:['öğretilmişti','öğretilmemişti'],
        fut:['öğretilecek','öğretilmeyecek'] }
    }
  },
  {
    id:'s28', icon:'⚙️',
    subj:{w:'The engineer', type:'sg', obj_form:'the engineer'},
    verb:{v1:'design',   v2:'designed', v3:'designed', ving:'designing' },
    obj: {w:'the machine',    type:'sg'},
    trData:{
      act:{ subj:'Mühendis', obj:'makineyi',
        pres:['tasarlar','tasarlamaz'], prg:['tasarlıyor','tasarlamıyor'],
        past:['tasarladı','tasarlamadı'], ppas:['tasarlamıştı','tasarlamamıştı'],
        fut:['tasarlayacak','tasarlamayacak'] },
      pass:{ subj:'Makine', agent:'mühendis tarafından',
        pres:['tasarlanır','tasarlanmaz'], prg:['tasarlanıyor','tasarlanmıyor'],
        past:['tasarlandı','tasarlanmadı'], ppas:['tasarlanmıştı','tasarlanmamıştı'],
        fut:['tasarlanacak','tasarlanmayacak'] }
    }
  },
  {
    id:'s29', icon:'🏅',
    subj:{w:'The athlete', type:'sg', obj_form:'the athlete'},
    verb:{v1:'win',      v2:'won',      v3:'won',      ving:'winning'   },
    obj: {w:'the race',       type:'sg'},
    trData:{
      act:{ subj:'Sporcu', obj:'yarışı',
        pres:['kazanır','kazanmaz'], prg:['kazanıyor','kazanmıyor'],
        past:['kazandı','kazanmadı'], ppas:['kazanmıştı','kazanmamıştı'],
        fut:['kazanacak','kazanmayacak'] },
      pass:{ subj:'Yarış', agent:'sporcu tarafından',
        pres:['kazanılır','kazanılmaz'], prg:['kazanılıyor','kazanılmıyor'],
        past:['kazanıldı','kazanılmadı'], ppas:['kazanılmıştı','kazanılmamıştı'],
        fut:['kazanılacak','kazanılmayacak'] }
    }
  },
  {
    id:'s30', icon:'😈',
    subj:{w:'The villain', type:'sg', obj_form:'the villain'},
    verb:{v1:'threaten', v2:'threatened',v3:'threatened',ving:'threatening'},
    obj: {w:'the hero',       type:'sg'},
    trData:{
      act:{ subj:'Kötü adam', obj:'kahramanı',
        pres:['tehdit eder','tehdit etmez'], prg:['tehdit ediyor','tehdit etmiyor'],
        past:['tehdit etti','tehdit etmedi'], ppas:['tehdit etmişti','tehdit etmemişti'],
        fut:['tehdit edecek','tehdit etmeyecek'] },
      pass:{ subj:'Kahraman', agent:'kötü adam tarafından',
        pres:['tehdit edilir','tehdit edilmez'], prg:['tehdit ediliyor','tehdit edilmiyor'],
        past:['tehdit edildi','tehdit edilmedi'], ppas:['tehdit edilmişti','tehdit edilmemişti'],
        fut:['tehdit edilecek','tehdit edilmeyecek'] }
    }
  },
  {
    id:'s31', icon:'🦁',
    subj:{w:'The lion',   type:'sg', obj_form:'the lion'  },
    verb:{v1:'hunt',     v2:'hunted',   v3:'hunted',   ving:'hunting'   },
    obj: {w:'the zebra',      type:'sg'},
    trData:{
      act:{ subj:'Aslan', obj:'zebrayı',
        pres:['avlar','avlamaz'], prg:['avlıyor','avlamıyor'],
        past:['avladı','avlamadı'], ppas:['avlamıştı','avlamamıştı'],
        fut:['avlayacak','avlamayacak'] },
      pass:{ subj:'Zebra', agent:'aslan tarafından',
        pres:['avlanır','avlanmaz'], prg:['avlanıyor','avlanmıyor'],
        past:['avlandı','avlanmadı'], ppas:['avlanmıştı','avlanmamıştı'],
        fut:['avlanacak','avlanmayacak'] }
    }
  },
  {
    id:'s32', icon:'🩺',
    subj:{w:'The nurse',  type:'sg', obj_form:'the nurse' },
    verb:{v1:'treat',    v2:'treated',  v3:'treated',  ving:'treating'  },
    obj: {w:'the injury',     type:'sg'},
    trData:{
      act:{ subj:'Hemşire', obj:'yarayı',
        pres:['tedavi eder','tedavi etmez'], prg:['tedavi ediyor','tedavi etmiyor'],
        past:['tedavi etti','tedavi etmedi'], ppas:['tedavi etmişti','tedavi etmemişti'],
        fut:['tedavi edecek','tedavi etmeyecek'] },
      pass:{ subj:'Yara', agent:'hemşire tarafından',
        pres:['tedavi edilir','tedavi edilmez'], prg:['tedavi ediliyor','tedavi edilmiyor'],
        past:['tedavi edildi','tedavi edilmedi'], ppas:['tedavi edilmişti','tedavi edilmemişti'],
        fut:['tedavi edilecek','tedavi edilmeyecek'] }
    }
  },
  {
    id:'s33', icon:'🗺️',
    subj:{w:'The explorer', type:'sg', obj_form:'the explorer'},
    verb:{v1:'find',     v2:'found',    v3:'found',    ving:'finding'   },
    obj: {w:'the treasure',   type:'sg'},
    trData:{
      act:{ subj:'Kaşif', obj:'hazineyi',
        pres:['bulur','bulmaz'], prg:['buluyor','bulmuyor'],
        past:['buldu','bulmadı'], ppas:['bulmuştu','bulmamıştı'],
        fut:['bulacak','bulmayacak'] },
      pass:{ subj:'Hazine', agent:'kaşif tarafından',
        pres:['bulunur','bulunmaz'], prg:['bulunuyor','bulunmuyor'],
        past:['bulundu','bulunmadı'], ppas:['bulunmuştu','bulunmamıştı'],
        fut:['bulunacak','bulunmayacak'] }
    }
  },
  {
    id:'s34', icon:'💾',
    subj:{w:'The programmer', type:'sg', obj_form:'the programmer'},
    verb:{v1:'fix',      v2:'fixed',    v3:'fixed',    ving:'fixing'    },
    obj: {w:'the bug',        type:'sg'},
    trData:{
      act:{ subj:'Programcı', obj:'hatayı',
        pres:['düzeltir','düzeltmez'], prg:['düzeltiyor','düzeltmiyor'],
        past:['düzeltti','düzeltmedi'], ppas:['düzeltmişti','düzeltmemişti'],
        fut:['düzeltecek','düzeltmeyecek'] },
      pass:{ subj:'Hata', agent:'programcı tarafından',
        pres:['düzeltilir','düzeltilmez'], prg:['düzeltiliyor','düzeltilmiyor'],
        past:['düzeltildi','düzeltilmedi'], ppas:['düzeltilmişti','düzeltilmemişti'],
        fut:['düzeltilecek','düzeltilmeyecek'] }
    }
  },
  {
    id:'s35', icon:'🔎',
    subj:{w:'The detective', type:'sg', obj_form:'the detective'},
    verb:{v1:'follow',   v2:'followed', v3:'followed', ving:'following' },
    obj: {w:'the suspect',    type:'sg'},
    trData:{
      act:{ subj:'Dedektif', obj:'şüpheliyi',
        pres:['takip eder','takip etmez'], prg:['takip ediyor','takip etmiyor'],
        past:['takip etti','takip etmedi'], ppas:['takip etmişti','takip etmemişti'],
        fut:['takip edecek','takip etmeyecek'] },
      pass:{ subj:'Şüpheli', agent:'dedektif tarafından',
        pres:['takip edilir','takip edilmez'], prg:['takip ediliyor','takip edilmiyor'],
        past:['takip edildi','takip edilmedi'], ppas:['takip edilmişti','takip edilmemişti'],
        fut:['takip edilecek','takip edilmeyecek'] }
    }
  },
  {
    id:'s36', icon:'💝',
    subj:{w:'The mother', type:'sg', obj_form:'the mother'},
    verb:{v1:'love',     v2:'loved',    v3:'loved',    ving:'loving'    },
    obj: {w:'the child',      type:'sg'},
    trData:{
      act:{ subj:'Anne', obj:'çocuğu',
        pres:['sever','sevmez'], prg:['seviyor','sevmiyor'],
        past:['sevdi','sevmedi'], ppas:['sevmişti','sevmemişti'],
        fut:['sevecek','sevmeyecek'] },
      pass:{ subj:'Çocuk', agent:'anne tarafından',
        pres:['sevilir','sevilmez'], prg:['seviliyor','sevilmiyor'],
        past:['sevildi','sevilmedi'], ppas:['sevilmişti','sevilmemişti'],
        fut:['sevilecek','sevilmeyecek'] }
    }
  },
  {
    id:'s37', icon:'🍞',
    subj:{w:'The baker',  type:'sg', obj_form:'the baker' },
    verb:{v1:'bake',     v2:'baked',    v3:'baked',    ving:'baking'    },
    obj: {w:'the bread',      type:'sg'},
    trData:{
      act:{ subj:'Fırıncı', obj:'ekmeği',
        pres:['pişirir','pişirmez'], prg:['pişiriyor','pişirmiyor'],
        past:['pişirdi','pişirmedi'], ppas:['pişirmişti','pişirmemişti'],
        fut:['pişirecek','pişirmeyecek'] },
      pass:{ subj:'Ekmek', agent:'fırıncı tarafından',
        pres:['pişirilir','pişirilmez'], prg:['pişiriliyor','pişirilmiyor'],
        past:['pişirildi','pişirilmedi'], ppas:['pişirilmişti','pişirilmemişti'],
        fut:['pişirilecek','pişirilmeyecek'] }
    }
  },
  {
    id:'s38', icon:'🧛',
    subj:{w:'The vampire', type:'sg', obj_form:'the vampire'},
    verb:{v1:'bite',     v2:'bit',      v3:'bitten',   ving:'biting'    },
    obj: {w:'the victim',     type:'sg'},
    trData:{
      act:{ subj:'Vampir', obj:'kurbanı',
        pres:['ısırır','ısırmaz'], prg:['ısırıyor','ısırmıyor'],
        past:['ısırdı','ısırmadı'], ppas:['ısırmıştı','ısırmamıştı'],
        fut:['ısıracak','ısırmayacak'] },
      pass:{ subj:'Kurban', agent:'vampir tarafından',
        pres:['ısırılır','ısırılmaz'], prg:['ısırılıyor','ısırılmıyor'],
        past:['ısırıldı','ısırılmadı'], ppas:['ısırılmıştı','ısırılmamıştı'],
        fut:['ısırılacak','ısırılmayacak'] }
    }
  },
  {
    id:'s39', icon:'⚓',
    subj:{w:'The captain', type:'sg', obj_form:'the captain'},
    verb:{v1:'command',  v2:'commanded',v3:'commanded',ving:'commanding'},
    obj: {w:'the crew',       type:'sg'},
    trData:{
      act:{ subj:'Kaptan', obj:'mürettebatı',
        pres:['komuta eder','komuta etmez'], prg:['komuta ediyor','komuta etmiyor'],
        past:['komuta etti','komuta etmedi'], ppas:['komuta etmişti','komuta etmemişti'],
        fut:['komuta edecek','komuta etmeyecek'] },
      pass:{ subj:'Mürettebat', agent:'kaptan tarafından',
        pres:['komuta edilir','komuta edilmez'], prg:['komuta ediliyor','komuta edilmiyor'],
        past:['komuta edildi','komuta edilmedi'], ppas:['komuta edilmişti','komuta edilmemişti'],
        fut:['komuta edilecek','komuta edilmeyecek'] }
    }
  },
  {
    id:'s40', icon:'👽',
    subj:{w:'The alien',  type:'sg', obj_form:'the alien' },
    verb:{v1:'invade',   v2:'invaded',  v3:'invaded',  ving:'invading'  },
    obj: {w:'the planet',     type:'sg'},
    trData:{
      act:{ subj:'Uzaylı', obj:'gezegeni',
        pres:['istila eder','istila etmez'], prg:['istila ediyor','istila etmiyor'],
        past:['istila etti','istila etmedi'], ppas:['istila etmişti','istila etmemişti'],
        fut:['istila edecek','istila etmeyecek'] },
      pass:{ subj:'Gezegen', agent:'uzaylı tarafından',
        pres:['istila edilir','istila edilmez'], prg:['istila ediliyor','istila edilmiyor'],
        past:['istila edildi','istila edilmedi'], ppas:['istila edilmişti','istila edilmemişti'],
        fut:['istila edilecek','istila edilmeyecek'] }
    }
  },
  {
    id:'s41', icon:'🐺',
    subj:{w:'The wolf',   type:'sg', obj_form:'the wolf'  },
    verb:{v1:'attack',   v2:'attacked', v3:'attacked', ving:'attacking' },
    obj: {w:'the sheep',      type:'sg'},
    trData:{
      act:{ subj:'Kurt', obj:'koyuna',
        pres:['saldırır','saldırmaz'], prg:['saldırıyor','saldırmıyor'],
        past:['saldırdı','saldırmadı'], ppas:['saldırmıştı','saldırmamıştı'],
        fut:['saldıracak','saldırmayacak'] },
      pass:{ subj:'Koyun', agent:'kurt tarafından',
        pres:['saldırılır','saldırılmaz'], prg:['saldırılıyor','saldırılmıyor'],
        past:['saldırıldı','saldırılmadı'], ppas:['saldırılmıştı','saldırılmamıştı'],
        fut:['saldırılacak','saldırılmayacak'] }
    }
  },
  {
    id:'s42', icon:'🤴',
    subj:{w:'The king',   type:'sg', obj_form:'the king'  },
    verb:{v1:'reward',   v2:'rewarded', v3:'rewarded', ving:'rewarding' },
    obj: {w:'the hero',       type:'sg'},
    trData:{
      act:{ subj:'Kral', obj:'kahramanı',
        pres:['ödüllendirir','ödüllendirmez'], prg:['ödüllendiriyor','ödüllendirmiyor'],
        past:['ödüllendirdi','ödüllendirmedi'], ppas:['ödüllendirmişti','ödüllendirmemişti'],
        fut:['ödüllendirecek','ödüllendirmeyecek'] },
      pass:{ subj:'Kahraman', agent:'kral tarafından',
        pres:['ödüllendirilir','ödüllendirilmez'], prg:['ödüllendiriliyor','ödüllendirilmiyor'],
        past:['ödüllendirildi','ödüllendirilmedi'], ppas:['ödüllendirilmişti','ödüllendirilmemişti'],
        fut:['ödüllendirilecek','ödüllendirilmeyecek'] }
    }
  },
  {
    id:'s43', icon:'🦠',
    subj:{w:'The virus',  type:'sg', obj_form:'the virus' },
    verb:{v1:'infect',   v2:'infected', v3:'infected', ving:'infecting' },
    obj: {w:'the computer',   type:'sg'},
    trData:{
      act:{ subj:'Virüs', obj:'bilgisayarı',
        pres:['bulaştırır','bulaştırmaz'], prg:['bulaştırıyor','bulaştırmıyor'],
        past:['bulaştırdı','bulaştırmadı'], ppas:['bulaştırmıştı','bulaştırmamıştı'],
        fut:['bulaştıracak','bulaştırmayacak'] },
      pass:{ subj:'Bilgisayar', agent:'virüs tarafından',
        pres:['bulaştırılır','bulaştırılmaz'], prg:['bulaştırılıyor','bulaştırılmıyor'],
        past:['bulaştırıldı','bulaştırılmadı'], ppas:['bulaştırılmıştı','bulaştırılmamıştı'],
        fut:['bulaştırılacak','bulaştırılmayacak'] }
    }
  },
  {
    id:'s44', icon:'⚖️',
    subj:{w:'The judge',  type:'sg', obj_form:'the judge' },
    verb:{v1:'sentence', v2:'sentenced',v3:'sentenced',ving:'sentencing'},
    obj: {w:'the criminal',   type:'sg'},
    trData:{
      act:{ subj:'Hakim', obj:'suçluyu',
        pres:['mahkum eder','mahkum etmez'], prg:['mahkum ediyor','mahkum etmiyor'],
        past:['mahkum etti','mahkum etmedi'], ppas:['mahkum etmişti','mahkum etmemişti'],
        fut:['mahkum edecek','mahkum etmeyecek'] },
      pass:{ subj:'Suçlu', agent:'hakim tarafından',
        pres:['mahkum edilir','mahkum edilmez'], prg:['mahkum ediliyor','mahkum edilmiyor'],
        past:['mahkum edildi','mahkum edilmedi'], ppas:['mahkum edilmişti','mahkum edilmemişti'],
        fut:['mahkum edilecek','mahkum edilmeyecek'] }
    }
  },
  {
    id:'s45', icon:'🦅',
    subj:{w:'The eagle',  type:'sg', obj_form:'the eagle' },
    verb:{v1:'drop',     v2:'dropped',  v3:'dropped',  ving:'dropping'  },
    obj: {w:'the fish',       type:'sg'},
    trData:{
      act:{ subj:'Kartal', obj:'balığı',
        pres:['düşürür','düşürmez'], prg:['düşürüyor','düşürmüyor'],
        past:['düşürdü','düşürmedi'], ppas:['düşürmüştü','düşürmemişti'],
        fut:['düşürecek','düşürmeyecek'] },
      pass:{ subj:'Balık', agent:'kartal tarafından',
        pres:['düşürülür','düşürülmez'], prg:['düşürülüyor','düşürülmüyor'],
        past:['düşürüldü','düşürülmedi'], ppas:['düşürülmüştü','düşürülmemişti'],
        fut:['düşürülecek','düşürülmeyecek'] }
    }
  },
  {
    id:'s46', icon:'📕',
    subj:{w:'The author', type:'sg', obj_form:'the author'},
    verb:{v1:'publish',  v2:'published',v3:'published',ving:'publishing'},
    obj: {w:'a book',         type:'sg'},
    trData:{
      act:{ subj:'Yazar', obj:'bir kitap',
        pres:['yayımlar','yayımlamaz'], prg:['yayımlıyor','yayımlamıyor'],
        past:['yayımladı','yayımlamadı'], ppas:['yayımlamıştı','yayımlamamıştı'],
        fut:['yayımlayacak','yayımlamayacak'] },
      pass:{ subj:'Bir kitap', agent:'yazar tarafından',
        pres:['yayımlanır','yayımlanmaz'], prg:['yayımlanıyor','yayımlanmıyor'],
        past:['yayımlandı','yayımlanmadı'], ppas:['yayımlanmıştı','yayımlanmamıştı'],
        fut:['yayımlanacak','yayımlanmayacak'] }
    }
  },
  {
    id:'s47', icon:'🧙‍♀️',
    subj:{w:'The witch',  type:'sg', obj_form:'the witch' },
    verb:{v1:'curse',    v2:'cursed',   v3:'cursed',   ving:'cursing'   },
    obj: {w:'the prince',     type:'sg'},
    trData:{
      act:{ subj:'Cadı', obj:'prensi',
        pres:['lanetler','lanetlemez'], prg:['lanetliyor','lanetlemiyor'],
        past:['lanetledi','lanetlemedi'], ppas:['lanetlemişti','lanetlememişti'],
        fut:['lanetleyecek','lanetlemeyecek'] },
      pass:{ subj:'Prens', agent:'cadı tarafından',
        pres:['lanetlenir','lanetlenmez'], prg:['lanetleniyor','lanetlenmiyor'],
        past:['lanetlendi','lanetlenmedi'], ppas:['lanetlenmişti','lanetlenmemişti'],
        fut:['lanetlenecek','lanetlenmeyecek'] }
    }
  },
  {
    id:'s48', icon:'🌋',
    subj:{w:'The volcano', type:'sg', obj_form:'the volcano'},
    verb:{v1:'cover',    v2:'covered',  v3:'covered',  ving:'covering'  },
    obj: {w:'the village',    type:'sg'},
    trData:{
      act:{ subj:'Yanardağ', obj:'köyü',
        pres:['örter','örtmez'], prg:['örtüyor','örtmüyor'],
        past:['örttü','örtmedi'], ppas:['örtmüştü','örtmemişti'],
        fut:['örtecek','örtmeyecek'] },
      pass:{ subj:'Köy', agent:'yanardağ tarafından',
        pres:['örtülür','örtülmez'], prg:['örtülüyor','örtülmüyor'],
        past:['örtüldü','örtülmedi'], ppas:['örtülmüştü','örtülmemişti'],
        fut:['örtülecek','örtülmeyecek'] }
    }
  },
  {
    id:'s49', icon:'👸',
    subj:{w:'The princess', type:'sg', obj_form:'the princess'},
    verb:{v1:'rescue',   v2:'rescued',  v3:'rescued',  ving:'rescuing'  },
    obj: {w:'the dragon',     type:'sg'},
    trData:{
      act:{ subj:'Prenses', obj:'ejderhayı',
        pres:['kurtarır','kurtarmaz'], prg:['kurtarıyor','kurtarmıyor'],
        past:['kurtardı','kurtarmadı'], ppas:['kurtarmıştı','kurtarmamıştı'],
        fut:['kurtaracak','kurtarmayacak'] },
      pass:{ subj:'Ejderha', agent:'prenses tarafından',
        pres:['kurtarılır','kurtarılmaz'], prg:['kurtarılıyor','kurtarılmıyor'],
        past:['kurtarıldı','kurtarılmadı'], ppas:['kurtarılmıştı','kurtarılmamıştı'],
        fut:['kurtarılacak','kurtarılmayacak'] }
    }
  },
  {
    id:'s50', icon:'💎',
    subj:{w:'The thief',  type:'sg', obj_form:'the thief' },
    verb:{v1:'hide',     v2:'hid',      v3:'hidden',   ving:'hiding'    },
    obj: {w:'the jewel',      type:'sg'},
    trData:{
      act:{ subj:'Hırsız', obj:'mücevheri',
        pres:['saklar','saklamaz'], prg:['saklıyor','saklamıyor'],
        past:['sakladı','saklamadı'], ppas:['saklamıştı','saklamamıştı'],
        fut:['saklayacak','saklamayacak'] },
      pass:{ subj:'Mücevher', agent:'hırsız tarafından',
        pres:['saklanır','saklanmaz'], prg:['saklanıyor','saklanmıyor'],
        past:['saklandı','saklanmadı'], ppas:['saklanmıştı','saklanmamıştı'],
        fut:['saklanacak','saklanmayacak'] }
    }
  },
];

const TR_LABELS = {
  time:  { pres:'Şimdiki', past:'Geçmiş',     fut:'Gelecek'         },
  flow:  { simp:'Basit',   cont:'Süregelen',   perf:'Tamamlanmış',   perf_cont:'Süreçsel' },
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

  let cat;
  if      (time==='pres' && flow==='simp')                        cat='pres';
  else if (flow==='cont')                                         cat='prg';
  else if (time==='pres' && (flow==='perf'||flow==='perf_cont'))  cat='past';
  else if (time==='past' && flow==='simp')                        cat='past';
  else if (time==='past' && (flow==='perf'||flow==='perf_cont'))  cat='ppas';
  else if (time==='fut')                                          cat='fut';
  else                                                            cat='pres';

  const [affVerb, negVerb] = side[cat];
  const verb = pol==='neg' ? negVerb : affVerb;

  if (pol==='que') {
    return voice==='act'
      ? `${side.subj} ${side.obj} ${trQueForm(affVerb)}`
      : `${side.subj} ${side.agent} ${trQueForm(affVerb)}`;
  }
  return voice==='act'
    ? `${side.subj} ${side.obj} ${verb}.`
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
  addXP(n)   { if(this.app?.addXP) this.app.addXP(n); }
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
    if(won){ this.qm.recordWin(); this.qm.addXP(this.solved*20); this.qm.confetti(); }
    this.root.innerHTML=_resultHTML('⚡','Sentence Rush',won,this.score,`${this.solved}/10 cümle çözüldü`,this.solved*20,'rush');
  }
}

// ════════════════════════════════════════════════════════════════
//  GAME 2 — SENTENCE SCRAMBLE (color-coded)
// ════════════════════════════════════════════════════════════════
class SentenceScramble {
  constructor(qm) {
    this.qm=qm; this.root=qm.root;
    this.round=0; this.maxRound=8;
    this.lives=3; this.score=0;
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
    if(won){ this.qm.recordWin(); this.qm.addXP(150); this.qm.confetti(); }
    this.root.innerHTML=_resultHTML('🧩','Sentence Scramble',won,this.score,`${this.maxRound} cümle`,won?150:0,'scramble');
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
