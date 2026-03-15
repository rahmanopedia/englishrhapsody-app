/* ============================================================
   ENGLISH RHAPSODY — Application Core
   A professional language learning PWA
   ============================================================ */

'use strict';

// ── Constants ──────────────────────────────────────────────
const XP_PER_LEVEL    = 500;
const RANKS = [
  { icon:'🌱', name:'Çırak',   min:1  },
  { icon:'🧭', name:'Gezgin',  min:6  },
  { icon:'📚', name:'Bilgin',  min:11 },
  { icon:'🧙', name:'Usta',    min:16 },
  { icon:'👑', name:'Efsane',  min:21 },
  { icon:'⚡', name:'İlah',    min:26 },
];

const ACHIEVEMENTS_DATA = [
  { id:'first_step',  icon:'⭐', title:'İlk Adım',          desc:'İlk XP\'ini kazan',             req:{type:'xp',       val:1}    },
  { id:'xp_500',      icon:'💫', title:'Yükselen Yıldız',   desc:'500 XP biriktir',               req:{type:'xp',       val:500}  },
  { id:'xp_2500',     icon:'🌟', title:'Parlayan Yıldız',   desc:'2.500 XP biriktir',             req:{type:'xp',       val:2500} },
  { id:'xp_10k',      icon:'🌠', title:'Süpernova',         desc:'10.000 XP biriktir',            req:{type:'xp',       val:10000}},
  { id:'level_5',     icon:'🎯', title:'Nişancı',           desc:'Level 5\'e ulaş',               req:{type:'level',    val:5}    },
  { id:'level_10',    icon:'🏹', title:'Usta Nişancı',      desc:'Level 10\'a ulaş',              req:{type:'level',    val:10}   },
  { id:'level_20',    icon:'⚔️', title:'Şampiyon',          desc:'Level 20\'ye ulaş',             req:{type:'level',    val:20}   },
  { id:'streak_3',    icon:'🔥', title:'Ateş Yakıldı',      desc:'3 günlük seri yap',             req:{type:'streak',   val:3}    },
  { id:'streak_7',    icon:'🌋', title:'Haftalık Alev',     desc:'7 günlük seri yap',             req:{type:'streak',   val:7}    },
  { id:'streak_30',   icon:'☀️', title:'Güneş Tanrısı',     desc:'30 günlük seri yap',            req:{type:'streak',   val:30}   },
  { id:'words_10',    icon:'📖', title:'Okuyucu',           desc:'10 kelime öğren',               req:{type:'words',    val:10}   },
  { id:'words_50',    icon:'📚', title:'Kitaplık',          desc:'50 kelime öğren',               req:{type:'words',    val:50}   },
  { id:'words_100',   icon:'🎓', title:'Akademisyen',       desc:'100 kelime öğren',              req:{type:'words',    val:100}  },
  { id:'words_250',   icon:'🏆', title:'Kelime Ustası',     desc:'250 kelime öğren',              req:{type:'words',    val:250}  },
  { id:'words_500',   icon:'👑', title:'Kelime Şampiyonu',  desc:'500 kelime öğren',              req:{type:'words',    val:500}  },
  { id:'speak_100',   icon:'🎤', title:'Mükemmel Ses',      desc:'Konuşmada %100 puan al',        req:{type:'speak_100',val:1}    },
];

const DAILY_MISSIONS = [
  { id:'xp',      icon:'⚡', label:'100 XP kazan',      target:100, unit:'XP'     },
  { id:'session', icon:'🌀', label:'3 oturum tamamla',  target:3,   unit:'oturum' },
  { id:'streak',  icon:'🔥', label:'Seriyi koru',       target:1,   unit:'gün'    },
];

// ── Phrase Dictionary (Phrasal Verbs, Idioms, Grammar) ─────
const PHRASE_DICT = {
  // ── Phrasal Verbs ──────────────────────────────────────
  'give up':          { type:'Phrasal Verb', tr:'vazgeçmek, bırakmak',                   ex:"Don't give up on your dreams." },
  'give in':          { type:'Phrasal Verb', tr:'teslim olmak, boyun eğmek',             ex:'She refused to give in to the pressure.' },
  'give away':        { type:'Phrasal Verb', tr:'bedava vermek, ele vermek',             ex:'He gave away all his books.' },
  'give back':        { type:'Phrasal Verb', tr:'geri vermek',                           ex:'Give back what you borrowed.' },
  'look up':          { type:'Phrasal Verb', tr:'aramak (sözlükte/internette)',          ex:'Look up the word in a dictionary.' },
  'look after':       { type:'Phrasal Verb', tr:'bakmak, ilgilenmek',                   ex:'She looks after her elderly parents.' },
  'look for':         { type:'Phrasal Verb', tr:'aramak',                               ex:'I am looking for my keys.' },
  'looking for':      { type:'Phrasal Verb', tr:'aramak (-ıyor)',                       ex:'She is looking for a new job.' },
  'look forward to':  { type:'Phrasal Verb', tr:'dört gözle beklemek',                  ex:'I look forward to seeing you.' },
  'look into':        { type:'Phrasal Verb', tr:'araştırmak, incelemek',                ex:'The police will look into the matter.' },
  'look out':         { type:'Phrasal Verb', tr:'dikkat etmek',                         ex:'Look out! There is a car coming.' },
  'look through':     { type:'Phrasal Verb', tr:'gözden geçirmek',                      ex:'Look through your notes before the exam.' },
  'look back':        { type:'Phrasal Verb', tr:'geriye bakmak, geçmişi düşünmek',      ex:'Looking back, I made the right choice.' },
  'look at':          { type:'Phrasal Verb', tr:'bakmak, incelemek',                    ex:'Look at this amazing painting.' },
  'get up':           { type:'Phrasal Verb', tr:'kalkmak, yataktan çıkmak',             ex:'I get up at 7 every morning.' },
  'get over':         { type:'Phrasal Verb', tr:'atlatmak, üstesinden gelmek',          ex:'It took months to get over the flu.' },
  'get along with':   { type:'Phrasal Verb', tr:'geçinmek, iyi ilişki kurmak',          ex:'Do you get along with your neighbours?' },
  'get rid of':       { type:'Phrasal Verb', tr:'kurtulmak, elden çıkarmak',            ex:'Get rid of things you no longer need.' },
  'get used to':      { type:'Phrasal Verb', tr:'alışmak',                              ex:'It takes time to get used to a new city.' },
  'get back':         { type:'Phrasal Verb', tr:'geri dönmek, geri almak',              ex:'When did you get back from holiday?' },
  'get on':           { type:'Phrasal Verb', tr:'binmek (araç), ilerlemek',             ex:'Get on the bus at the next stop.' },
  'get off':          { type:'Phrasal Verb', tr:'inmek (araç)',                         ex:'We get off at the third stop.' },
  'get away':         { type:'Phrasal Verb', tr:'kaçmak, uzaklaşmak',                   ex:'I need to get away from the city.' },
  'put on':           { type:'Phrasal Verb', tr:'giymek, takmak',                       ex:"Put on your coat; it's cold outside." },
  'puts on':          { type:'Phrasal Verb', tr:'giymek (3. tekil)',                    ex:'She puts on her shoes before leaving.' },
  'put off':          { type:'Phrasal Verb', tr:'ertelemek',                            ex:'Stop putting off your homework.' },
  'put up with':      { type:'Phrasal Verb', tr:'katlanmak, tahammül etmek',            ex:"I can't put up with the noise." },
  'put out':          { type:'Phrasal Verb', tr:'söndürmek',                            ex:'Firefighters put out the fire quickly.' },
  'put away':         { type:'Phrasal Verb', tr:'kaldırmak, yerine koymak',             ex:'Put away your toys after playing.' },
  'put down':         { type:'Phrasal Verb', tr:'yere bırakmak, küçümsemek',            ex:'Put down the heavy bag.' },
  'put together':     { type:'Phrasal Verb', tr:'bir araya getirmek, monte etmek',      ex:'We put together a great team.' },
  'take off':         { type:'Phrasal Verb', tr:'kalkmak (uçak), çıkarmak (giysi)',     ex:'The plane takes off at noon.' },
  'take on':          { type:'Phrasal Verb', tr:'üstlenmek, işe almak',                 ex:'She took on extra responsibilities.' },
  'take care of':     { type:'Phrasal Verb', tr:'ilgilenmek, bakmak',                   ex:'Who will take care of the dog?' },
  'take part in':     { type:'Phrasal Verb', tr:'katılmak (etkinlik)',                  ex:'Everyone should take part in the discussion.' },
  'take over':        { type:'Phrasal Verb', tr:'devralmak',                            ex:'A new manager took over the department.' },
  'take up':          { type:'Phrasal Verb', tr:'başlamak (hobi), yer kaplamak',        ex:'He took up painting last year.' },
  'take away':        { type:'Phrasal Verb', tr:'götürmek, almak',                      ex:'They took away the old furniture.' },
  'take back':        { type:'Phrasal Verb', tr:'geri almak, sözünü geri almak',        ex:'I take back what I said.' },
  'turn on':          { type:'Phrasal Verb', tr:'açmak (cihaz)',                        ex:'Turn on the lights, please.' },
  'turn off':         { type:'Phrasal Verb', tr:'kapatmak (cihaz)',                     ex:'Turn off the TV before sleeping.' },
  'turn up':          { type:'Phrasal Verb', tr:'gelmek (beklenmedik), sesi artırmak',  ex:'She turned up late to the meeting.' },
  'turn down':        { type:'Phrasal Verb', tr:'reddetmek, sesi kısmak',               ex:'He turned down the job offer.' },
  'turn around':      { type:'Phrasal Verb', tr:'döndürmek, tersine çevirmek',          ex:'The new CEO turned the company around.' },
  'turn into':        { type:'Phrasal Verb', tr:'dönüşmek',                             ex:'The caterpillar turns into a butterfly.' },
  'come up with':     { type:'Phrasal Verb', tr:'bulmak, ortaya çıkarmak (fikir)',      ex:'She came up with a brilliant idea.' },
  'come across':      { type:'Phrasal Verb', tr:'tesadüfen karşılaşmak',                ex:'I came across an old photo yesterday.' },
  'come back':        { type:'Phrasal Verb', tr:'geri gelmek',                          ex:'Come back when you are ready.' },
  'come out':         { type:'Phrasal Verb', tr:'çıkmak, ortaya çıkmak',                ex:'The results came out yesterday.' },
  'come up':          { type:'Phrasal Verb', tr:'çıkmak, gündeme gelmek',               ex:'An interesting topic came up in class.' },
  'come over':        { type:'Phrasal Verb', tr:'uğramak, ziyaret etmek',               ex:'Come over for dinner tonight.' },
  'go on':            { type:'Phrasal Verb', tr:'devam etmek, olmak',                   ex:'What is going on here?' },
  'go off':           { type:'Phrasal Verb', tr:'çalmak (alarm), patlamak',             ex:'My alarm goes off at 6 AM.' },
  'go back':          { type:'Phrasal Verb', tr:'geri gitmek',                          ex:'I want to go back to my hometown.' },
  'go out':           { type:'Phrasal Verb', tr:'dışarı çıkmak',                        ex:'They go out every Friday night.' },
  'go through':       { type:'Phrasal Verb', tr:'geçirmek (zor süreç), incelemek',      ex:'She went through a difficult time.' },
  'go over':          { type:'Phrasal Verb', tr:'gözden geçirmek',                      ex:"Let's go over the main points." },
  'go ahead':         { type:'Phrasal Verb', tr:'devam etmek, buyrun',                  ex:"Go ahead; I'm listening." },
  'go away':          { type:'Phrasal Verb', tr:'uzaklaşmak, gitmek',                   ex:'The pain went away after rest.' },
  'goes for':         { type:'Phrasal Verb', tr:'geçerli olmak, gitmek (fiyat)',        ex:'This rule goes for everyone.' },
  'went to':          { type:'Phrasal Verb', tr:'gitti',                                ex:'She went to the market.' },
  'went down':        { type:'Phrasal Verb', tr:'indi, azaldı',                         ex:'Prices went down last month.' },
  'walked into':      { type:'Phrasal Verb', tr:'içeri girdi, yürüyerek girdi',         ex:'He walked into the room quietly.' },
  'climbed up':       { type:'Phrasal Verb', tr:'tırmandı, çıktı',                      ex:'She climbed up the steep hill.' },
  'make up':          { type:'Phrasal Verb', tr:'uydurmak; barışmak; oluşturmak',       ex:'Stop making up excuses.' },
  'make up for':      { type:'Phrasal Verb', tr:'telafi etmek',                         ex:'She worked extra to make up for lost time.' },
  'break down':       { type:'Phrasal Verb', tr:'bozulmak, çökmek',                     ex:'The car broke down on the highway.' },
  'break up':         { type:'Phrasal Verb', tr:'ayrılmak, parçalanmak',                ex:'They broke up after two years.' },
  'break in':         { type:'Phrasal Verb', tr:'izinsiz girmek',                       ex:'Someone broke in and stole the laptop.' },
  'break out':        { type:'Phrasal Verb', tr:'patlak vermek, kaçmak',                ex:'A fire broke out in the factory.' },
  'run out of':       { type:'Phrasal Verb', tr:'tükenmek, bitmek',                     ex:'We ran out of milk.' },
  'run into':         { type:'Phrasal Verb', tr:'rastlamak, çarpmak',                   ex:'I ran into an old friend today.' },
  'set up':           { type:'Phrasal Verb', tr:'kurmak, hazırlamak',                   ex:'They set up a new business.' },
  'set off':          { type:'Phrasal Verb', tr:'yola çıkmak, tetiklemek',              ex:'We set off early in the morning.' },
  'carry out':        { type:'Phrasal Verb', tr:'yürütmek, uygulamak',                  ex:'Scientists carried out experiments.' },
  'carry on':         { type:'Phrasal Verb', tr:'devam etmek',                          ex:'Carry on with your work.' },
  'hold on':          { type:'Phrasal Verb', tr:'beklemek, tutunmak',                   ex:"Hold on! I'll be right back." },
  'hold back':        { type:'Phrasal Verb', tr:'tutmak, geri çekmek',                  ex:'Nothing can hold back progress.' },
  'pick up':          { type:'Phrasal Verb', tr:'almak (birini), yerden almak, öğrenmek', ex:'Can you pick me up at 5?' },
  'work out':         { type:'Phrasal Verb', tr:'egzersiz yapmak; sonuçlanmak; çözmek', ex:'Everything will work out in the end.' },
  'work on':          { type:'Phrasal Verb', tr:'üzerinde çalışmak',                    ex:'She is working on a new project.' },
  'find out':         { type:'Phrasal Verb', tr:'öğrenmek, keşfetmek',                  ex:'I need to find out the truth.' },
  'figure out':       { type:'Phrasal Verb', tr:'anlamak, çözmek',                      ex:'Can you figure out the answer?' },
  'fill in':          { type:'Phrasal Verb', tr:'doldurmak (form)',                     ex:'Fill in your name on the form.' },
  'pay off':          { type:'Phrasal Verb', tr:'karşılığını vermek, işe yaramak',      ex:'Hard work always pays off.' },
  'paid off':         { type:'Phrasal Verb', tr:'karşılığını verdi, işe yaradı',        ex:'All the effort finally paid off.' },
  'wake up':          { type:'Phrasal Verb', tr:'uyanmak',                              ex:'I wake up at 7 every day.' },
  'woke up':          { type:'Phrasal Verb', tr:'uyandı (geçmiş zaman)',                ex:'She woke up early this morning.' },
  'waking up':        { type:'Phrasal Verb', tr:'uyanmak (-ıyor/gerundum)',             ex:'Waking up early is a good habit.' },
  'keep up with':     { type:'Phrasal Verb', tr:'ayak uydurmak, takip etmek',           ex:"It's hard to keep up with technology." },
  'keep on':          { type:'Phrasal Verb', tr:'devam etmek',                          ex:'Keep on trying; you will succeed.' },
  'call off':         { type:'Phrasal Verb', tr:'iptal etmek',                          ex:'They called off the meeting.' },
  'call on':          { type:'Phrasal Verb', tr:'ziyaret etmek; söz vermek',            ex:'The teacher called on a student to answer.' },
  'cut off':          { type:'Phrasal Verb', tr:'kesmek, bağlantıyı kesmek',            ex:'The storm cut off electricity.' },
  'cut down on':      { type:'Phrasal Verb', tr:'azaltmak',                             ex:'You should cut down on sugar.' },
  'check in':         { type:'Phrasal Verb', tr:'check-in yapmak, giriş yapmak',        ex:'We checked in at the hotel.' },
  'check out':        { type:'Phrasal Verb', tr:'check-out yapmak; bakmak',             ex:'Check out this amazing book.' },
  'point out':        { type:'Phrasal Verb', tr:'belirtmek, dikkat çekmek',             ex:'She pointed out a mistake in the report.' },
  'end up':           { type:'Phrasal Verb', tr:'sonuçta … olmak',                      ex:'We ended up staying until midnight.' },
  'add up':           { type:'Phrasal Verb', tr:'toplamak; mantıklı olmak',             ex:"The numbers don't add up." },
  'pass on':          { type:'Phrasal Verb', tr:'aktarmak, iletmek',                    ex:'Pass on my regards to your family.' },
  'depend on':        { type:'Phrasal Verb', tr:'bağlı olmak, güvenmek',                ex:'Success depends on hard work.' },
  'wait for':         { type:'Phrasal Verb', tr:'beklemek',                             ex:'I have been waiting for you for an hour.' },
  'aim to':           { type:'Phrasal Verb', tr:'hedeflemek',                           ex:'We aim to finish by Friday.' },
  'fail to':          { type:'Phrasal Verb', tr:'başaramamak, yapamamak',               ex:'He failed to meet the deadline.' },
  'led to':           { type:'Phrasal Verb', tr:'yol açtı, neden oldu',                 ex:'The discovery led to new treatments.' },
  'lead to':          { type:'Phrasal Verb', tr:'yol açmak',                            ex:'This path leads to the park.' },
  'listen to':        { type:'Phrasal Verb', tr:'dinlemek',                             ex:'Listen to the teacher carefully.' },
  'listened to':      { type:'Phrasal Verb', tr:'dinledi',                              ex:'She listened to the teacher carefully.' },
  'refer to':         { type:'Phrasal Verb', tr:'atıfta bulunmak, bahsetmek',           ex:'The report refers to recent research.' },
  'refers to':        { type:'Phrasal Verb', tr:'atıfta bulunur, bahseder',             ex:'This term refers to a specific process.' },
  'result in':        { type:'Phrasal Verb', tr:'sonuçlanmak, neden olmak',             ex:'Lack of sleep results in poor focus.' },
  'results in':       { type:'Phrasal Verb', tr:'sonuçlanır',                           ex:'Regular exercise results in better health.' },
  'grapple with':     { type:'Phrasal Verb', tr:'boğuşmak, mücadele etmek',             ex:'Scientists grapple with complex problems.' },
  'cope with':        { type:'Phrasal Verb', tr:'başa çıkmak',                          ex:'She copes with stress by exercising.' },
  'deal with':        { type:'Phrasal Verb', tr:'ilgilenmek, başa çıkmak',              ex:'How do you deal with difficult people?' },
  'agree with':       { type:'Phrasal Verb', tr:'hemfikir olmak',                       ex:'I completely agree with your point.' },
  'succeed in':       { type:'Phrasal Verb', tr:'başarmak',                             ex:'She succeeded in passing the exam.' },
  'believe in':       { type:'Phrasal Verb', tr:'inanmak',                              ex:'I believe in your ability to do this.' },
  'apply for':        { type:'Phrasal Verb', tr:'başvurmak',                            ex:'Did you apply for the scholarship?' },
  'belong to':        { type:'Phrasal Verb', tr:'ait olmak',                            ex:'This book belongs to the library.' },
  'contribute to':    { type:'Phrasal Verb', tr:'katkıda bulunmak',                     ex:'Everyone should contribute to society.' },
  'respond to':       { type:'Phrasal Verb', tr:'yanıt vermek',                         ex:'Please respond to my email.' },
  'clashes with':     { type:'Phrasal Verb', tr:'çakışmak, çatışmak',                   ex:'His opinion clashes with mine.' },
  'moving toward':    { type:'Phrasal Verb', tr:'doğru ilerlemek',                      ex:'We are moving toward a solution.' },
  'away from':        { type:'Phrasal Verb', tr:'uzaktan, uzağa',                       ex:'Stay away from negative people.' },
  'worry about':      { type:'Phrasal Verb', tr:'endişelenmek',                         ex:"Don't worry about small things." },
  'focused on':       { type:'Phrasal Verb', tr:'odaklanmış',                           ex:'Stay focused on your goal.' },
  'based on':         { type:'Phrasal Verb', tr:'dayalı, temel alınan',                 ex:'The film is based on a true story.' },
  'impact on':        { type:'Phrasal Verb', tr:'üzerinde etki',                        ex:'Technology has a big impact on education.' },
  'linked to':        { type:'Phrasal Verb', tr:'bağlantılı, ilişkili',                 ex:'Stress is linked to many health issues.' },
  'known for':        { type:'Phrasal Verb', tr:'ile tanınmak',                         ex:'Paris is known for its cuisine.' },
  'prepared for':     { type:'Phrasal Verb', tr:'hazırlanmak, hazır olmak',             ex:'Are you prepared for the exam?' },
  'arrived at':       { type:'Phrasal Verb', tr:'ulaşmak, varmak (bir yere)',           ex:'We arrived at the airport on time.' },
  'provided with':    { type:'Phrasal Verb', tr:'ile donatılmış, sağlanmış',            ex:'Students were provided with books.' },
  'answered with':    { type:'Phrasal Verb', tr:'cevap vermek (-ile)',                  ex:'She answered with a smile.' },
  'separating from':  { type:'Phrasal Verb', tr:'den ayrılmak',                         ex:'Separating from family is never easy.' },
  'lives in':         { type:'Phrasal Verb', tr:'yaşıyor, oturuyor',                    ex:'She lives in a small village.' },
  'confined to':      { type:'Phrasal Verb', tr:'ile sınırlı, kısıtlı',                 ex:'The problem is not confined to one area.' },
  'foster a':         { type:'Phrasal Verb', tr:'beslemek, geliştirmek',                ex:'Schools should foster a love of learning.' },
  'prioritizes over': { type:'Phrasal Verb', tr:'öncelik vermek',                       ex:'She prioritizes health over work.' },
  'pressure on':      { type:'Phrasal Verb', tr:'baskı uygulamak (üzerinde)',           ex:'There is too much pressure on students.' },
  'interested in':    { type:'Gramer Kalıbı', tr:'ilgili, meraklı  (in = -de/-da)',     ex:'She is interested in learning Spanish.' },
  'good at':          { type:'Gramer Kalıbı', tr:'iyi olmak  (at = -de)',               ex:'He is good at mathematics.' },
  'proud of':         { type:'Gramer Kalıbı', tr:'gurur duymak  (of = -den)',           ex:"I'm proud of your achievement." },
  'tired of':         { type:'Gramer Kalıbı', tr:'bıkmak, yorulmak  (of = -den)',       ex:'I am tired of waiting.' },
  'aware of':         { type:'Gramer Kalıbı', tr:'farkında olmak  (of = -den)',         ex:'Are you aware of the risks?' },
  'capable of':       { type:'Gramer Kalıbı', tr:'yapabilecek durumda  (of = -den)',    ex:'She is capable of doing it.' },
  'responsible for':  { type:'Gramer Kalıbı', tr:'sorumlu  (for = -den)',               ex:'Who is responsible for this decision?' },
  'potential for':    { type:'Gramer Kalıbı', tr:'için potansiyel/kapasite',            ex:'There is great potential for growth.' },
  // ── Deyimler (Idioms) ──────────────────────────────────
  'piece of cake':                   { type:'Deyim', tr:'çok kolay bir şey',                            ex:'The test was a piece of cake.' },
  'break a leg':                     { type:'Deyim', tr:'bol şans! (tiyatro ifadesi)',                  ex:'Break a leg on your performance tonight!' },
  'hit the nail on the head':        { type:'Deyim', tr:'tam isabetle ifade etmek',                    ex:'You hit the nail on the head with that.' },
  'under the weather':               { type:'Deyim', tr:'kendini iyi hissettmemek, hasta olmak',       ex:"I'm feeling a bit under the weather today." },
  'beat around the bush':            { type:'Deyim', tr:'lafı dolandırmak',                            ex:"Stop beating around the bush and say it." },
  'bite the bullet':                 { type:'Deyim', tr:'dişini sıkmak, zorluğa katlanmak',            ex:'Just bite the bullet and apologize.' },
  'once in a blue moon':             { type:'Deyim', tr:'kırk yılda bir',                              ex:'We meet once in a blue moon these days.' },
  'see eye to eye':                  { type:'Deyim', tr:'hemfikir olmak',                              ex:'They rarely see eye to eye on politics.' },
  'spill the beans':                 { type:'Deyim', tr:'sırrı ifşa etmek',                           ex:'Who spilled the beans about the party?' },
  'sit on the fence':                { type:'Deyim', tr:'tarafsız kalmak, kararsız olmak',             ex:'Stop sitting on the fence; pick a side.' },
  'in the nick of time':             { type:'Deyim', tr:'tam zamanında, son anda',                     ex:'The ambulance arrived in the nick of time.' },
  'blessing in disguise':            { type:'Deyim', tr:'sonradan iyi olduğu anlaşılan şey',          ex:'Losing that job was a blessing in disguise.' },
  'keep your chin up':               { type:'Deyim', tr:'cesaretini yitirmemek',                      ex:'Keep your chin up; things will improve.' },
  'no pain no gain':                 { type:'Deyim', tr:'emeksiz yemek olmaz',                        ex:'You have to train hard; no pain no gain.' },
  'not my cup of tea':               { type:'Deyim', tr:'benim için değil, sevmiyorum',               ex:"Horror films are not my cup of tea." },
  'on the ball':                     { type:'Deyim', tr:'zinde, uyanık, işinin ehli',                 ex:'She is always on the ball.' },
  'the tip of the iceberg':          { type:'Deyim', tr:'buzdağının görünen yüzü',                    ex:'What we see is only the tip of the iceberg.' },
  'through thick and thin':          { type:'Deyim', tr:'her koşulda, iyi ve kötü günde',             ex:'We have been friends through thick and thin.' },
  'up in the air':                   { type:'Deyim', tr:'belirsiz, kararsız',                         ex:'Our travel plans are still up in the air.' },
  'back to square one':              { type:'Deyim', tr:'sıfıra dönmek',                              ex:'The plan failed and we are back to square one.' },
  'hit the sack':                    { type:'Deyim', tr:'uyumaya gitmek',                             ex:"I'm exhausted; time to hit the sack." },
  'in hot water':                    { type:'Deyim', tr:'başı belada olmak',                          ex:'He is in hot water with his boss.' },
  'look on the bright side':         { type:'Deyim', tr:'olumlu tarafından bakmak',                   ex:'Look on the bright side: you learned from it.' },
  'make ends meet':                  { type:'Deyim', tr:'geçimini sağlamak',                          ex:'With two jobs she barely makes ends meet.' },
  'read between the lines':          { type:'Deyim', tr:'satır aralarını okumak',                     ex:'You need to read between the lines.' },
  'stand your ground':               { type:'Deyim', tr:'kararlı durmak, mevzisini korumak',         ex:'Stand your ground and defend your idea.' },
  'think outside the box':           { type:'Deyim', tr:'kalıpların dışında düşünmek',               ex:'Great innovations require thinking outside the box.' },
  'have a ball':                     { type:'Deyim', tr:'çok eğlenmek',                               ex:'We had a ball at the party last night.' },
  'cost an arm and a leg':           { type:'Deyim', tr:'çok pahalıya mal olmak',                    ex:'That handbag costs an arm and a leg.' },
  'miss the boat':                   { type:'Deyim', tr:'fırsatı kaçırmak',                           ex:'You missed the boat by applying too late.' },
  'bite off more than you can chew': { type:'Deyim', tr:'ağzından büyük lokma almak',                ex:"Don't bite off more than you can chew." },
  'easier said than done':           { type:'Deyim', tr:'söylemesi kolay, yapması zor',              ex:'"Just relax." Easier said than done.' },
  'every cloud has a silver lining': { type:'Deyim', tr:'her işte bir hayır vardır',                 ex:'Every cloud has a silver lining.' },
  'kill two birds':                  { type:'Deyim', tr:'bir taşla iki kuş vurmak',                  ex:'By cycling to work I kill two birds with one stone.' },
  'let the cat out of the bag':      { type:'Deyim', tr:'sırrı açığa çıkarmak',                      ex:'He let the cat out of the bag about the surprise.' },
  'under pressure':                  { type:'Deyim', tr:'baskı altında',                              ex:'She performs well even under pressure.' },
  // ── Gramer Kalıpları ──────────────────────────────────
  'used to':       { type:'Gramer Kalıbı', tr:'eskiden …(-er)di — geçmiş alışkanlık',              ex:'I used to play football as a child.' },
  'going to':      { type:'Gramer Kalıbı', tr:'yapacak olmak — gelecek niyet/plan',                ex:"I'm going to study tonight." },
  'have to':       { type:'Gramer Kalıbı', tr:'zorunda olmak — dışsal zorunluluk',                  ex:'I have to finish this report.' },
  'has to':        { type:'Gramer Kalıbı', tr:'zorunda olmak (3. tekil)',                           ex:'She has to leave by 8.' },
  'had to':        { type:'Gramer Kalıbı', tr:'zorunda oldu (geçmiş)',                             ex:'He had to cancel the meeting.' },
  'ought to':      { type:'Gramer Kalıbı', tr:'yapması gerekir — ahlaki zorunluluk',               ex:'You ought to apologize.' },
  'be able to':    { type:'Gramer Kalıbı', tr:'yapabilmek — yetenek/imkân',                        ex:'Will you be able to come?' },
  'would rather':  { type:'Gramer Kalıbı', tr:'tercih etmek (-meyi tercih ederim)',                ex:"I'd rather stay home." },
  'had better':    { type:'Gramer Kalıbı', tr:'daha iyi olur — tavsiye/uyarı',                    ex:"You'd better leave now." },
  'would like to': { type:'Gramer Kalıbı', tr:'yapmak istemek (nazik)',                            ex:"I'd like to order a coffee." },
  'not only':      { type:'Gramer Kalıbı', tr:'sadece … değil, aynı zamanda',                     ex:'She is not only smart but also kind.' },
  'as soon as':    { type:'Gramer Kalıbı', tr:'…r …maz — zaman bağlacı',                          ex:'Call me as soon as you arrive.' },
  'as long as':    { type:'Gramer Kalıbı', tr:'olduğu sürece — koşul',                            ex:"I'll help as long as you are honest." },
  'as well as':    { type:'Gramer Kalıbı', tr:'yanı sıra, hem … hem de',                          ex:'She speaks French as well as Spanish.' },
  'as if':         { type:'Gramer Kalıbı', tr:'sanki … gibi',                                     ex:'He acts as if he knows everything.' },
  'as though':     { type:'Gramer Kalıbı', tr:'sanki … gibi (yazılı)',                            ex:'She looked as though she had seen a ghost.' },
  'even though':   { type:'Gramer Kalıbı', tr:'…e rağmen — zıtlık bağlacı (gerçek)',             ex:'Even though it rained, we went out.' },
  'even if':       { type:'Gramer Kalıbı', tr:'…se bile — koşullu zıtlık',                       ex:'Even if you fail, try again.' },
  'in order to':   { type:'Gramer Kalıbı', tr:'amacıyla, için — amaç bildirme',                   ex:'Study hard in order to pass the exam.' },
  'so as to':      { type:'Gramer Kalıbı', tr:'amacıyla — resmi amaç bildirme',                   ex:'She arrived early so as to get a good seat.' },
  'due to':        { type:'Gramer Kalıbı', tr:'nedeniyle — sebep bildirme',                       ex:'The flight was cancelled due to bad weather.' },
  'because of':    { type:'Gramer Kalıbı', tr:'yüzünden, nedeniyle',                              ex:'We stayed inside because of the storm.' },
  'in spite of':   { type:'Gramer Kalıbı', tr:'rağmen — zıtlık (isim öbeği ile)',                 ex:'In spite of the cold, they played outside.' },
  'in front of':   { type:'Gramer Kalıbı', tr:'önünde',                                           ex:'Wait in front of the building.' },
  'instead of':    { type:'Gramer Kalıbı', tr:'yerine',                                           ex:'Use stairs instead of the elevator.' },
  'such as':       { type:'Gramer Kalıbı', tr:'gibi — örnek verme',                               ex:'Fruits such as oranges are rich in vitamin C.' },
  'for example':   { type:'Gramer Kalıbı', tr:'örneğin',                                          ex:'Many animals, for example lions, are endangered.' },
  'for instance':  { type:'Gramer Kalıbı', tr:'örneğin (resmi)',                                  ex:'Consider, for instance, the impact of technology.' },
  'of course':     { type:'Gramer Kalıbı', tr:'tabii ki, elbette',                                ex:"Of course I'll help you." },
  'by the way':    { type:'Gramer Kalıbı', tr:'bu arada',                                         ex:'By the way, have you met our new colleague?' },
  'a lot of':      { type:'Gramer Kalıbı', tr:'çok fazla (sayılabilir + sayılamaz)',              ex:'There are a lot of people here.' },
  'each other':    { type:'Gramer Kalıbı', tr:'birbirini/birbirine — karşılıklı eylem',           ex:'They help each other every day.' },
  'next to':       { type:'Gramer Kalıbı', tr:'yanında, yanı başında',                            ex:'Sit next to me.' },
  'at the moment': { type:'Gramer Kalıbı', tr:'şu an, şu anda',                                   ex:"I'm busy at the moment." },
  'in case':       { type:'Gramer Kalıbı', tr:'-e karşı, ihtimale karşı',                        ex:'Take an umbrella in case it rains.' },
  'no matter':     { type:'Gramer Kalıbı', tr:'fark etmez, ne olursa olsun',                     ex:'No matter what happens, I will be here.' },
  'long term':     { type:'Gramer Kalıbı', tr:'uzun vadeli',                                      ex:'We need a long term solution.' },
  'short term':    { type:'Gramer Kalıbı', tr:'kısa vadeli',                                      ex:'This is only a short term fix.' },
  'on time':       { type:'Gramer Kalıbı', tr:'zamanında — tam planlandığı gibi',                 ex:'The bus arrived on time.' },
  'in time':       { type:'Gramer Kalıbı', tr:'zamanında — geç kalmadan',                        ex:'We arrived in time for the show.' },
  'rather than':   { type:'Gramer Kalıbı', tr:'yerine tercih etmek',                              ex:'I prefer tea rather than coffee.' },
  'at the end':    { type:'Gramer Kalıbı', tr:'sonunda, en son',                                  ex:'At the end of the day, results matter.' },
  'welcome to':    { type:'Gramer Kalıbı', tr:'hoş geldiniz / hoş geldin',                       ex:'Welcome to our school!' },
  'good morning':  { type:'Gramer Kalıbı', tr:'günaydın',                                         ex:'Good morning! How are you?' },
  'good evening':  { type:'Gramer Kalıbı', tr:'iyi akşamlar',                                    ex:'Good evening, everyone.' },
  'good night':    { type:'Gramer Kalıbı', tr:'iyi geceler',                                     ex:'Good night! Sleep well.' },
  'how are you':   { type:'Gramer Kalıbı', tr:'nasılsın/nasılsınız',                             ex:"How are you today?" },
  'thank you':     { type:'Gramer Kalıbı', tr:'teşekkür ederim',                                  ex:'Thank you for your help.' },
  // ── Olumsuz Yardımcı Fiil Kalıpları ──────────────────
  'cannot':        { type:'Gramer Kalıbı', tr:'yapamaz/yapamam — can\'ın olumsuz tam hali',       ex:'I cannot attend the meeting tomorrow.' },
  'can not':       { type:'Gramer Kalıbı', tr:'yapamaz/yapamam — can\'ın olumsuz tam hali',       ex:'She can not come today.' },
  "can't":         { type:'Gramer Kalıbı', tr:'yapamaz/yapamam — cannot\'un kısaltması',          ex:"I can't believe it!" },
  'could not':     { type:'Gramer Kalıbı', tr:'yapamadı/yapamıyordu — could\'un olumsuz hali',   ex:'He could not find his keys.' },
  "couldn't":      { type:'Gramer Kalıbı', tr:'yapamadı/yapamıyordu — could not kısaltması',     ex:"She couldn't sleep last night." },
  'will not':      { type:'Gramer Kalıbı', tr:'yapmayacak — gelecek zaman olumsuz',               ex:'I will not give up easily.' },
  "won't":         { type:'Gramer Kalıbı', tr:'yapmayacak — will not kısaltması',                 ex:"He won't be here tomorrow." },
  'would not':     { type:'Gramer Kalıbı', tr:'yapmak istemedi / yapmazdı — would olumsuz',       ex:'She would not change her mind.' },
  "wouldn't":      { type:'Gramer Kalıbı', tr:'yapmak istemedi / yapmazdı — would not kısaltması', ex:"He wouldn't listen to anyone." },
  'should not':    { type:'Gramer Kalıbı', tr:'yapmamalı — tavsiye/zorunluluk olumsuz',           ex:'You should not skip breakfast.' },
  "shouldn't":     { type:'Gramer Kalıbı', tr:'yapmamalı — should not kısaltması',                ex:"You shouldn't worry so much." },
  'must not':      { type:'Gramer Kalıbı', tr:'kesinlikle yapmamalı — yasak/güçlü uyarı',         ex:'You must not enter this area.' },
  "mustn't":       { type:'Gramer Kalıbı', tr:'kesinlikle yapmamalı — must not kısaltması',       ex:"You mustn't tell anyone the secret." },
  'do not':        { type:'Gramer Kalıbı', tr:'yapmıyor/yapma — geniş zaman olumsuz (1./2. tekil/çoğul)', ex:'I do not drink coffee.' },
  "don't":         { type:'Gramer Kalıbı', tr:'yapmıyor/yapma — do not kısaltması',               ex:"Don't forget your umbrella." },
  'does not':      { type:'Gramer Kalıbı', tr:'yapmıyor — geniş zaman olumsuz (3. tekil)',        ex:'She does not like spicy food.' },
  "doesn't":       { type:'Gramer Kalıbı', tr:'yapmıyor — does not kısaltması',                   ex:"He doesn't know the answer." },
  'did not':       { type:'Gramer Kalıbı', tr:'yapmadı — geçmiş zaman olumsuz',                   ex:'I did not see him yesterday.' },
  "didn't":        { type:'Gramer Kalıbı', tr:'yapmadı — did not kısaltması',                     ex:"She didn't come to class." },
  'is not':        { type:'Gramer Kalıbı', tr:'değil — be fiili olumsuz (3. tekil geniş zaman)',  ex:'This is not what I expected.' },
  "isn't":         { type:'Gramer Kalıbı', tr:'değil — is not kısaltması',                        ex:"It isn't raining anymore." },
  'am not':        { type:'Gramer Kalıbı', tr:'değilim — be fiili 1. tekil olumsuz',              ex:'I am not ready yet.' },
  "aren't":        { type:'Gramer Kalıbı', tr:'değil/değiller — are not kısaltması',              ex:"They aren't here today." },
  'are not':       { type:'Gramer Kalıbı', tr:'değil/değiller — be fiili çoğul/2. tekil olumsuz', ex:'We are not finished yet.' },
  'was not':       { type:'Gramer Kalıbı', tr:'değildi — be fiili geçmiş zaman olumsuz (tekil)',  ex:'The movie was not very good.' },
  "wasn't":        { type:'Gramer Kalıbı', tr:'değildi — was not kısaltması',                     ex:"I wasn't home when you called." },
  'were not':      { type:'Gramer Kalıbı', tr:'değildi/değillerdi — be fiili geçmiş çoğul olumsuz', ex:'They were not surprised.' },
  "weren't":       { type:'Gramer Kalıbı', tr:'değildi/değillerdi — were not kısaltması',         ex:"We weren't expecting visitors." },
  'have not':      { type:'Gramer Kalıbı', tr:'yapmamış — present perfect olumsuz (1./2./çoğul)', ex:'I have not seen that film yet.' },
  "haven't":       { type:'Gramer Kalıbı', tr:'yapmamış — have not kısaltması',                   ex:"I haven't eaten since morning." },
  'has not':       { type:'Gramer Kalıbı', tr:'yapmamış — present perfect olumsuz (3. tekil)',    ex:'She has not replied to my message.' },
  "hasn't":        { type:'Gramer Kalıbı', tr:'yapmamış — has not kısaltması',                    ex:"He hasn't called back yet." },
  'had not':       { type:'Gramer Kalıbı', tr:'yapmamıştı — past perfect olumsuz',                ex:'She had not heard the news.' },
  "hadn't":        { type:'Gramer Kalıbı', tr:'yapmamıştı — had not kısaltması',                  ex:"We hadn't met before that day." },
  'need not':      { type:'Gramer Kalıbı', tr:'gerekmez, gerek yok — hafif olumsuz zorunluluk',   ex:'You need not worry about that.' },
  "needn't":       { type:'Gramer Kalıbı', tr:'gerekmez — need not kısaltması',                   ex:"You needn't bring anything." },
  'may not':       { type:'Gramer Kalıbı', tr:'yapamayabilir; yapmasına izin yok',                 ex:'You may not use your phone in class.' },
  'might not':     { type:'Gramer Kalıbı', tr:'yapmayabilir — zayıf ihtimal olumsuz',             ex:'She might not come to the party.' },
  "mightn't":      { type:'Gramer Kalıbı', tr:'yapmayabilir — might not kısaltması',              ex:"It mightn't be as hard as you think." },
  'ought not to':  { type:'Gramer Kalıbı', tr:'yapmamalı — ahlaki zorunluluk olumsuz',            ex:'You ought not to lie to your friends.' },
  "oughtn't to":   { type:'Gramer Kalıbı', tr:'yapmamalı — ought not to kısaltması',              ex:"You oughtn't to skip meals." },
  "it's not":      { type:'Gramer Kalıbı', tr:'değil — it is not kısaltması',                     ex:"It's not a big deal." },
  "that's not":    { type:'Gramer Kalıbı', tr:'o değil — that is not kısaltması',                 ex:"That's not what I meant." },
  "there's no":    { type:'Gramer Kalıbı', tr:'… yok — there is no',                              ex:"There's no time to waste." },
  'no longer':     { type:'Gramer Kalıbı', tr:'artık … değil/değildir',                           ex:'She no longer lives here.' },
  'not yet':       { type:'Gramer Kalıbı', tr:'henüz değil',                                      ex:'I have not finished yet.' },
  'not even':      { type:'Gramer Kalıbı', tr:'hiç, bir bile değil — güçlü olumsuz vurgu',        ex:"He didn't say not even a word." },
  // ── Eylem + Edat/Zarf Kalıpları (Geçmiş & Geniş Zaman) ─
  'looked under':   { type:'Eylem Kalıbı', tr:'altına/altında baktı',                             ex:'She looked under the bed for her shoes.' },
  'looked inside':  { type:'Eylem Kalıbı', tr:'içine/içinde baktı',                              ex:'He looked inside the box carefully.' },
  'looked behind':  { type:'Eylem Kalıbı', tr:'arkasına/arkasında baktı',                         ex:'She looked behind the curtain.' },
  'looked around':  { type:'Eylem Kalıbı', tr:'etrafına baktı, etrafa göz attı',                  ex:'He looked around the room nervously.' },
  'looked away':    { type:'Eylem Kalıbı', tr:'başını çevirdi, görmezden geldi',                  ex:'She looked away when he walked in.' },
  'looked down':    { type:'Eylem Kalıbı', tr:'aşağıya baktı',                                   ex:'He looked down at his feet.' },
  'looked up':      { type:'Eylem Kalıbı', tr:'yukarıya baktı',                                   ex:'She looked up at the stars.' },
  'looked over':    { type:'Eylem Kalıbı', tr:'üzerinden baktı; gözden geçirdi',                  ex:'He looked over the report quickly.' },
  'looked across':  { type:'Eylem Kalıbı', tr:'karşıya/öte yana baktı',                          ex:'She looked across the street.' },
  'looked out':     { type:'Eylem Kalıbı', tr:'dışarıya baktı',                                   ex:'He looked out of the window.' },
  'look under':     { type:'Eylem Kalıbı', tr:'altına/altında bakmak',                            ex:'Look under the table.' },
  'look inside':    { type:'Eylem Kalıbı', tr:'içine/içinde bakmak',                              ex:'Look inside the drawer.' },
  'look behind':    { type:'Eylem Kalıbı', tr:'arkasına bakmak',                                  ex:"Don't look behind you!" },
  'look around':    { type:'Eylem Kalıbı', tr:'etrafına bakmak',                                  ex:'Look around before crossing the street.' },
  'look away':      { type:'Eylem Kalıbı', tr:'başını çevirmek, görmezden gelmek',                ex:"Look away if you can't watch." },
  'look down':      { type:'Eylem Kalıbı', tr:'aşağıya bakmak',                                  ex:"Don't look down from the cliff." },
  'look over':      { type:'Eylem Kalıbı', tr:'üzerinden bakmak; gözden geçirmek',                ex:'Look over your answers before submitting.' },
  'look across':    { type:'Eylem Kalıbı', tr:'karşıya/öte yana bakmak',                         ex:'Look across the river — what do you see?' },
  'walked under':   { type:'Eylem Kalıbı', tr:'altından yürüyerek geçti',                        ex:'She walked under the bridge.' },
  'walked inside':  { type:'Eylem Kalıbı', tr:'içeri yürüdü',                                    ex:'He walked inside without knocking.' },
  'walked behind':  { type:'Eylem Kalıbı', tr:'arkasından yürüdü',                               ex:'She walked behind the group quietly.' },
  'walked around':  { type:'Eylem Kalıbı', tr:'etrafında yürüdü, dolaştı',                       ex:'He walked around the park.' },
  'walked away':    { type:'Eylem Kalıbı', tr:'uzaklaştı, oradan ayrıldı',                       ex:'She walked away without saying goodbye.' },
  'walked back':    { type:'Eylem Kalıbı', tr:'geri yürüdü',                                     ex:'He walked back to the car.' },
  'walked past':    { type:'Eylem Kalıbı', tr:'yanından geçti',                                  ex:'She walked past without noticing me.' },
  'walked through': { type:'Eylem Kalıbı', tr:'içinden yürüyerek geçti',                         ex:'He walked through the forest alone.' },
  'walked up':      { type:'Eylem Kalıbı', tr:'yukarı yürüdü; yanına yaklaştı',                  ex:'She walked up to the stage.' },
  'walked out':     { type:'Eylem Kalıbı', tr:'çıkıp gitti, terk etti',                          ex:'He walked out of the meeting.' },
  'walked over':    { type:'Eylem Kalıbı', tr:'yürüyerek yanına gitti',                          ex:'She walked over to say hello.' },
  'ran under':      { type:'Eylem Kalıbı', tr:'altından koşarak geçti',                          ex:'He ran under the falling tree.' },
  'ran inside':     { type:'Eylem Kalıbı', tr:'içeri koştu',                                     ex:'She ran inside when it started raining.' },
  'ran behind':     { type:'Eylem Kalıbı', tr:'arkasına koştu, gizlendi',                        ex:'The child ran behind the sofa.' },
  'ran around':     { type:'Eylem Kalıbı', tr:'etrafında koştu, oraya buraya koşturdu',           ex:'The dog ran around the yard.' },
  'ran away':       { type:'Eylem Kalıbı', tr:'kaçtı, uzaklaştı',                                ex:'The thief ran away quickly.' },
  'ran past':       { type:'Eylem Kalıbı', tr:'yanından koşarak geçti',                          ex:'She ran past without stopping.' },
  'ran through':    { type:'Eylem Kalıbı', tr:'içinden koşarak geçti; hızlıca gözden geçirdi',   ex:'He ran through the rain.' },
  'ran out':        { type:'Eylem Kalıbı', tr:'koşarak dışarı çıktı',                            ex:'She ran out of the burning building.' },
  'ran back':       { type:'Eylem Kalıbı', tr:'geri koştu',                                      ex:'He ran back to help.' },
  'ran into':       { type:'Eylem Kalıbı', tr:'çarptı; tesadüfen karşılaştı',                    ex:'I ran into my old teacher today.' },
  'went under':     { type:'Eylem Kalıbı', tr:'altından geçti; battı',                           ex:'The boat went under the bridge.' },
  'went inside':    { type:'Eylem Kalıbı', tr:'içeri girdi',                                     ex:'We went inside to escape the cold.' },
  'went behind':    { type:'Eylem Kalıbı', tr:'arkasına geçti, gizlendi',                        ex:'He went behind the counter.' },
  'went around':    { type:'Eylem Kalıbı', tr:'etrafında dolaştı; etrafından geçti',             ex:'They went around the long way.' },
  'went past':      { type:'Eylem Kalıbı', tr:'yanından geçti',                                  ex:'We went past the school by accident.' },
  'went through':   { type:'Eylem Kalıbı', tr:'içinden geçti; yaşadı (zor bir şey)',             ex:'She went through the tunnel.' },
  'went back':      { type:'Eylem Kalıbı', tr:'geri döndü',                                      ex:'He went back to his hometown.' },
  'went in':        { type:'Eylem Kalıbı', tr:'içeri girdi',                                     ex:'She knocked and went in.' },
  'went out':       { type:'Eylem Kalıbı', tr:'dışarı çıktı',                                    ex:'They went out for dinner.' },
  'went up':        { type:'Eylem Kalıbı', tr:'yukarı çıktı; arttı',                             ex:'Prices went up again this month.' },
  'went off':       { type:'Eylem Kalıbı', tr:'çaldı (alarm); patladı; bozuldu',                 ex:'The alarm went off at 6 AM.' },
  'came under':     { type:'Eylem Kalıbı', tr:'altından geçti; maruz kaldı',                     ex:'The plan came under criticism.' },
  'came inside':    { type:'Eylem Kalıbı', tr:'içeri geldi',                                     ex:'Come inside, it is cold out there.' },
  'came around':    { type:'Eylem Kalıbı', tr:'etrafından dolaştı; fikir değiştirdi; uğradı',    ex:'He came around and agreed with us.' },
  'came out':       { type:'Eylem Kalıbı', tr:'dışarı çıktı; ortaya çıktı; yayınlandı',          ex:'The results came out this morning.' },
  'came back':      { type:'Eylem Kalıbı', tr:'geri döndü',                                      ex:'She came back after an hour.' },
  'came in':        { type:'Eylem Kalıbı', tr:'içeri girdi',                                     ex:'Please come in and sit down.' },
  'came over':      { type:'Eylem Kalıbı', tr:'uğradı, ziyaret etti',                            ex:'My friend came over last night.' },
  'came up':        { type:'Eylem Kalıbı', tr:'yukarı çıktı; gündeme geldi',                     ex:'An urgent issue came up at work.' },
  'sat under':      { type:'Eylem Kalıbı', tr:'altında oturdu',                                  ex:'We sat under the tree for shade.' },
  'sat inside':     { type:'Eylem Kalıbı', tr:'içeride oturdu',                                  ex:'He sat inside all day.' },
  'sat behind':     { type:'Eylem Kalıbı', tr:'arkasında oturdu',                                ex:'She sat behind me in class.' },
  'sat down':       { type:'Eylem Kalıbı', tr:'oturdu (ayakta duruyorken)',                      ex:'Please sit down and relax.' },
  'sat back':       { type:'Eylem Kalıbı', tr:'yaslandı; rahatladı',                             ex:'He sat back and smiled.' },
  'sat next to':    { type:'Eylem Kalıbı', tr:'yanına oturdu',                                   ex:'She sat next to her best friend.' },
  'sat around':     { type:'Eylem Kalıbı', tr:'etrafında oturdu; boş oturdu',                    ex:'We sat around the campfire.' },
  'stood up':       { type:'Eylem Kalıbı', tr:'ayağa kalktı',                                    ex:'Everyone stood up when she entered.' },
  'stood behind':   { type:'Eylem Kalıbı', tr:'arkasında durdu; destekledi',                     ex:'She stood behind her decision.' },
  'stood under':    { type:'Eylem Kalıbı', tr:'altında durdu',                                   ex:'They stood under the umbrella.' },
  'stood outside':  { type:'Eylem Kalıbı', tr:'dışarıda durdu',                                  ex:'He stood outside and waited.' },
  'stood next to':  { type:'Eylem Kalıbı', tr:'yanında durdu',                                   ex:'She stood next to the window.' },
  'stood back':     { type:'Eylem Kalıbı', tr:'geri çekildi, uzak durdu',                        ex:'Everyone stood back to give him space.' },
  'stood around':   { type:'Eylem Kalıbı', tr:'etrafında durdu; avare bekledi',                  ex:'People stood around watching.' },
  'climbed over':   { type:'Eylem Kalıbı', tr:'üzerinden tırmandı/geçti',                        ex:'He climbed over the fence.' },
  'climbed through':{ type:'Eylem Kalıbı', tr:'içinden geçerek tırmandı',                        ex:'She climbed through the window.' },
  'climbed down':   { type:'Eylem Kalıbı', tr:'aşağı indi (tırmanarak)',                         ex:'He climbed down from the tree.' },
  'climbed in':     { type:'Eylem Kalıbı', tr:'içeri girdi (tırmanarak)',                        ex:'She climbed in through the hatch.' },
  'jumped over':    { type:'Eylem Kalıbı', tr:'üzerinden atladı',                                ex:'He jumped over the puddle.' },
  'jumped in':      { type:'Eylem Kalıbı', tr:'içine atladı; araya girdi',                       ex:'She jumped in the pool.' },
  'jumped out':     { type:'Eylem Kalıbı', tr:'dışarı/dışarıya atladı; fırladı',                 ex:'He jumped out of bed excited.' },
  'jumped back':    { type:'Eylem Kalıbı', tr:'geriye sıçradı',                                  ex:'She jumped back in surprise.' },
  'jumped up':      { type:'Eylem Kalıbı', tr:'yukarı zıpladı; fırlayıp kalktı',                 ex:'He jumped up when he heard the news.' },
  'fell under':     { type:'Eylem Kalıbı', tr:'altına düştü; etkisine girdi',                    ex:'She fell under his spell.' },
  'fell behind':    { type:'Eylem Kalıbı', tr:'geri kaldı, geride kaldı',                        ex:'He fell behind in his studies.' },
  'fell over':      { type:'Eylem Kalıbı', tr:'devrildi, düşüp yuvarlandı',                      ex:'The chair fell over.' },
  'fell down':      { type:'Eylem Kalıbı', tr:'aşağı düştü, yere düştü',                         ex:'She tripped and fell down.' },
  'fell apart':     { type:'Eylem Kalıbı', tr:'dağıldı, parçalandı; çöktü',                      ex:'The old house fell apart.' },
  'fell out':       { type:'Eylem Kalıbı', tr:'düştü (bir yerden); kavga etti',                  ex:'The keys fell out of his pocket.' },
  'fell in':        { type:'Eylem Kalıbı', tr:'içine düştü',                                     ex:'He fell in the river by accident.' },
  'hid behind':     { type:'Eylem Kalıbı', tr:'arkasında saklandı',                              ex:'The cat hid behind the sofa.' },
  'hid under':      { type:'Eylem Kalıbı', tr:'altında saklandı',                                ex:'The child hid under the blanket.' },
  'hid inside':     { type:'Eylem Kalıbı', tr:'içinde saklandı',                                 ex:'She hid inside the closet.' },
  'hide behind':    { type:'Eylem Kalıbı', tr:'arkasında saklanmak',                             ex:"Don't hide behind excuses." },
  'hide under':     { type:'Eylem Kalıbı', tr:'altında saklanmak',                               ex:'Kids love to hide under the table.' },
  'hide inside':    { type:'Eylem Kalıbı', tr:'içinde saklanmak',                                ex:'He had to hide inside the building.' },
  // ── İsim Tamlamaları & Sık Kullanılan Sözcük Grupları ──
  // Toplum & Siyaset
  'public opinion':       { type:'İsim Tamlaması', tr:'kamuoyu, halkın görüşü',                   ex:'Public opinion on the issue has changed.' },
  'public health':        { type:'İsim Tamlaması', tr:'halk sağlığı',                              ex:'Public health is a government priority.' },
  'public transport':     { type:'İsim Tamlaması', tr:'toplu taşıma',                              ex:'Public transport is cheaper than driving.' },
  'public sector':        { type:'İsim Tamlaması', tr:'kamu sektörü',                              ex:'She works in the public sector.' },
  'public safety':        { type:'İsim Tamlaması', tr:'kamu güvenliği',                            ex:'Public safety is everyone\'s responsibility.' },
  'human rights':         { type:'İsim Tamlaması', tr:'insan hakları',                             ex:'Human rights must be protected.' },
  'civil rights':         { type:'İsim Tamlaması', tr:'sivil haklar, yurttaşlık hakları',         ex:'The civil rights movement changed history.' },
  'equal rights':         { type:'İsim Tamlaması', tr:'eşit haklar',                               ex:'Everyone deserves equal rights.' },
  'gender equality':      { type:'İsim Tamlaması', tr:'toplumsal cinsiyet eşitliği',               ex:'Gender equality benefits the whole society.' },
  'freedom of speech':    { type:'İsim Tamlaması', tr:'ifade özgürlüğü',                          ex:'Freedom of speech is a fundamental right.' },
  'freedom of press':     { type:'İsim Tamlaması', tr:'basın özgürlüğü',                          ex:'Freedom of press is essential in democracy.' },
  'foreign policy':       { type:'İsim Tamlaması', tr:'dış politika',                             ex:'Foreign policy affects international relations.' },
  'national security':    { type:'İsim Tamlaması', tr:'ulusal güvenlik',                          ex:'National security is the state\'s top priority.' },
  'law enforcement':      { type:'İsim Tamlaması', tr:'kanun yaptırımı, emniyet kuvvetleri',      ex:'Law enforcement responded quickly.' },
  'middle class':         { type:'İsim Tamlaması', tr:'orta sınıf',                               ex:'The middle class is shrinking in many countries.' },
  'working class':        { type:'İsim Tamlaması', tr:'işçi sınıfı',                              ex:'Working class families struggled during the crisis.' },
  'upper class':          { type:'İsim Tamlaması', tr:'üst sınıf, seçkin kesim',                  ex:'Upper class neighbourhoods have better facilities.' },
  'social class':         { type:'İsim Tamlaması', tr:'sosyal sınıf',                             ex:'Social class still affects opportunities.' },
  'social media':         { type:'İsim Tamlaması', tr:'sosyal medya',                             ex:'Social media influences public opinion.' },
  'social issue':         { type:'İsim Tamlaması', tr:'toplumsal sorun',                          ex:'Poverty is a major social issue.' },
  'global issue':         { type:'İsim Tamlaması', tr:'küresel sorun',                            ex:'Climate change is a global issue.' },
  // Çevre & Enerji
  'climate change':       { type:'İsim Tamlaması', tr:'iklim değişikliği',                        ex:'Climate change is affecting weather patterns.' },
  'global warming':       { type:'İsim Tamlaması', tr:'küresel ısınma',                           ex:'Global warming is caused by greenhouse gases.' },
  'natural disaster':     { type:'İsim Tamlaması', tr:'doğal afet',                               ex:'The earthquake was a terrible natural disaster.' },
  'renewable energy':     { type:'İsim Tamlaması', tr:'yenilenebilir enerji',                     ex:'Renewable energy reduces carbon emissions.' },
  'clean energy':         { type:'İsim Tamlaması', tr:'temiz enerji',                             ex:'Clean energy is the future.' },
  'solar energy':         { type:'İsim Tamlaması', tr:'güneş enerjisi',                           ex:'Solar energy panels are becoming cheaper.' },
  'wind energy':          { type:'İsim Tamlaması', tr:'rüzgar enerjisi',                          ex:'Wind energy is widely used in Europe.' },
  'carbon footprint':     { type:'İsim Tamlaması', tr:'karbon ayak izi',                          ex:'Flying increases your carbon footprint.' },
  'greenhouse gas':       { type:'İsim Tamlaması', tr:'sera gazı',                                ex:'Greenhouse gas emissions must be reduced.' },
  'air pollution':        { type:'İsim Tamlaması', tr:'hava kirliliği',                           ex:'Air pollution is harmful to health.' },
  'water pollution':      { type:'İsim Tamlaması', tr:'su kirliliği',                             ex:'Water pollution affects aquatic life.' },
  'noise pollution':      { type:'İsim Tamlaması', tr:'gürültü kirliliği',                        ex:'Noise pollution is a growing problem in cities.' },
  'sea level':            { type:'İsim Tamlaması', tr:'deniz seviyesi',                           ex:'Sea level is rising due to ice melt.' },
  'rain forest':          { type:'İsim Tamlaması', tr:'yağmur ormanı',                            ex:'Rain forest destruction threatens biodiversity.' },
  'endangered species':   { type:'İsim Tamlaması', tr:'nesli tehlike altındaki türler',           ex:'Many endangered species need protection.' },
  'fossil fuel':          { type:'İsim Tamlaması', tr:'fosil yakıt',                              ex:'Fossil fuels contribute to global warming.' },
  'coral reef':           { type:'İsim Tamlaması', tr:'mercan resifi',                            ex:'Coral reefs are dying due to ocean warming.' },
  // Ekonomi
  'economic growth':      { type:'İsim Tamlaması', tr:'ekonomik büyüme',                          ex:'The country achieved strong economic growth.' },
  'economic crisis':      { type:'İsim Tamlaması', tr:'ekonomik kriz',                            ex:'The 2008 economic crisis affected millions.' },
  'living standards':     { type:'İsim Tamlaması', tr:'yaşam standartları',                       ex:'Living standards have improved over decades.' },
  'standard of living':   { type:'İsim Tamlaması', tr:'yaşam standardı',                         ex:'The standard of living varies by country.' },
  'cost of living':       { type:'İsim Tamlaması', tr:'geçim maliyeti',                           ex:'The cost of living in cities is rising.' },
  'quality of life':      { type:'İsim Tamlaması', tr:'yaşam kalitesi',                           ex:'Good healthcare improves quality of life.' },
  'unemployment rate':    { type:'İsim Tamlaması', tr:'işsizlik oranı',                           ex:'The unemployment rate fell to 4%.' },
  'inflation rate':       { type:'İsim Tamlaması', tr:'enflasyon oranı',                          ex:'A high inflation rate reduces purchasing power.' },
  'interest rate':        { type:'İsim Tamlaması', tr:'faiz oranı',                               ex:'The central bank raised interest rates.' },
  'birth rate':           { type:'İsim Tamlaması', tr:'doğum oranı',                              ex:'The birth rate is declining in many countries.' },
  'death rate':           { type:'İsim Tamlaması', tr:'ölüm oranı',                               ex:'The death rate from the disease has dropped.' },
  'crime rate':           { type:'İsim Tamlaması', tr:'suç oranı',                                ex:'The crime rate fell after new policies.' },
  'population growth':    { type:'İsim Tamlaması', tr:'nüfus artışı',                             ex:'Population growth puts pressure on resources.' },
  'private sector':       { type:'İsim Tamlaması', tr:'özel sektör',                              ex:'The private sector drives innovation.' },
  'job market':           { type:'İsim Tamlaması', tr:'iş piyasası',                              ex:'The job market is very competitive right now.' },
  'job opportunity':      { type:'İsim Tamlaması', tr:'iş fırsatı',                               ex:'The city offers many job opportunities.' },
  // Sağlık
  'mental health':        { type:'İsim Tamlaması', tr:'ruh sağlığı, zihinsel sağlık',             ex:'Mental health is as important as physical health.' },
  'physical health':      { type:'İsim Tamlaması', tr:'fiziksel sağlık',                          ex:'Exercise improves physical health.' },
  'blood pressure':       { type:'İsim Tamlaması', tr:'kan basıncı',                              ex:'High blood pressure can cause heart problems.' },
  'heart attack':         { type:'İsim Tamlaması', tr:'kalp krizi',                               ex:'Stress can trigger a heart attack.' },
  'heart rate':           { type:'İsim Tamlaması', tr:'kalp atış hızı',                           ex:'Exercise increases your heart rate.' },
  'immune system':        { type:'İsim Tamlaması', tr:'bağışıklık sistemi',                       ex:'Sleep strengthens the immune system.' },
  'nervous system':       { type:'İsim Tamlaması', tr:'sinir sistemi',                            ex:'The nervous system controls body functions.' },
  'mental illness':       { type:'İsim Tamlaması', tr:'zihinsel/ruhsal hastalık',                 ex:'Mental illness affects millions worldwide.' },
  'health care':          { type:'İsim Tamlaması', tr:'sağlık hizmeti, sağlık sektörü',          ex:'Access to health care is a basic right.' },
  'balanced diet':        { type:'İsim Tamlaması', tr:'dengeli beslenme',                         ex:'A balanced diet keeps you healthy.' },
  'healthy diet':         { type:'İsim Tamlaması', tr:'sağlıklı diyet',                           ex:'A healthy diet includes fruits and vegetables.' },
  'junk food':            { type:'İsim Tamlaması', tr:'abur cubur, sağlıksız yiyecek',            ex:'Eating too much junk food causes weight gain.' },
  'fast food':            { type:'İsim Tamlaması', tr:'hızlı yiyecek, fast food',                 ex:'Fast food is convenient but unhealthy.' },
  'physical activity':    { type:'İsim Tamlaması', tr:'fiziksel aktivite',                        ex:'Regular physical activity reduces disease risk.' },
  // Eğitim & Beceriler
  'higher education':     { type:'İsim Tamlaması', tr:'yükseköğretim, üniversite eğitimi',       ex:'Higher education opens more career doors.' },
  'critical thinking':    { type:'İsim Tamlaması', tr:'eleştirel düşünme',                        ex:'Critical thinking is a key skill at work.' },
  'creative thinking':    { type:'İsim Tamlaması', tr:'yaratıcı düşünme',                         ex:'Creative thinking leads to innovation.' },
  'problem solving':      { type:'İsim Tamlaması', tr:'problem çözme',                            ex:'Employers value problem solving skills.' },
  'decision making':      { type:'İsim Tamlaması', tr:'karar alma süreci',                        ex:'Good decision making requires clear information.' },
  'communication skills': { type:'İsim Tamlaması', tr:'iletişim becerileri',                      ex:'Communication skills are essential in any job.' },
  'life skills':          { type:'İsim Tamlaması', tr:'yaşam becerileri',                         ex:'Schools should teach practical life skills.' },
  'mother tongue':        { type:'İsim Tamlaması', tr:'ana dil',                                  ex:'Her mother tongue is Turkish.' },
  'body language':        { type:'İsim Tamlaması', tr:'beden dili',                               ex:'Body language reveals a lot about feelings.' },
  'role model':           { type:'İsim Tamlaması', tr:'rol modeli',                               ex:'Parents are the first role models for children.' },
  'team work':            { type:'İsim Tamlaması', tr:'takım çalışması',                          ex:'Good team work leads to better results.' },
  'team player':          { type:'İsim Tamlaması', tr:'takım oyuncusu',                           ex:'Employers want a team player, not a lone wolf.' },
  'work experience':      { type:'İsim Tamlaması', tr:'iş deneyimi',                              ex:'Work experience is valued by employers.' },
  'career path':          { type:'İsim Tamlaması', tr:'kariyer yolu',                             ex:'She chose a career path in medicine.' },
  'online learning':      { type:'İsim Tamlaması', tr:'çevrimiçi öğrenme',                       ex:'Online learning became popular after 2020.' },
  'distance learning':    { type:'İsim Tamlaması', tr:'uzaktan öğrenme',                          ex:'Distance learning gives more flexibility.' },
  // Teknoloji
  'artificial intelligence': { type:'İsim Tamlaması', tr:'yapay zeka',                           ex:'Artificial intelligence is changing every industry.' },
  'machine learning':     { type:'İsim Tamlaması', tr:'makine öğrenimi',                          ex:'Machine learning powers recommendation systems.' },
  'virtual reality':      { type:'İsim Tamlaması', tr:'sanal gerçeklik',                          ex:'Virtual reality is used in medical training.' },
  'social network':       { type:'İsim Tamlaması', tr:'sosyal ağ',                                ex:'Social networks connect people worldwide.' },
  'search engine':        { type:'İsim Tamlaması', tr:'arama motoru',                             ex:'A search engine helps you find information.' },
  // Günlük Yaşam
  'daily life':           { type:'İsim Tamlaması', tr:'günlük yaşam',                             ex:'Technology has changed daily life completely.' },
  'everyday life':        { type:'İsim Tamlaması', tr:'gündelik yaşam',                           ex:'Stress is part of everyday life for many people.' },
  'family life':          { type:'İsim Tamlaması', tr:'aile hayatı',                              ex:'A stable family life helps children grow.' },
  'social life':          { type:'İsim Tamlaması', tr:'sosyal yaşam',                             ex:'Working long hours hurts your social life.' },
  'free time':            { type:'İsim Tamlaması', tr:'boş zaman, serbest zaman',                 ex:'I spend my free time reading books.' },
  'spare time':           { type:'İsim Tamlaması', tr:'boş zaman',                               ex:'In her spare time she paints.' },
  'rush hour':            { type:'İsim Tamlaması', tr:'yoğun saat, iş çıkışı trafiği',           ex:'Avoid driving during rush hour.' },
  'traffic jam':          { type:'İsim Tamlaması', tr:'trafik sıkışıklığı',                       ex:'We were stuck in a traffic jam for an hour.' },
  'common sense':         { type:'İsim Tamlaması', tr:'sağduyu',                                  ex:'Use your common sense in this situation.' },
  'good luck':            { type:'İsim Tamlaması', tr:'iyi şans',                                 ex:'Good luck on your exam tomorrow!' },
  'bad luck':             { type:'İsim Tamlaması', tr:'kötü şans, şanssızlık',                   ex:'It was just bad luck that it rained.' },
  'hard work':            { type:'İsim Tamlaması', tr:'sıkı çalışma',                             ex:'Hard work always pays off in the end.' },
  'team spirit':          { type:'İsim Tamlaması', tr:'takım ruhu',                               ex:'Team spirit makes a big difference in sports.' },
  'good news':            { type:'İsim Tamlaması', tr:'iyi haber',                                ex:'I have some good news for you.' },
  'bad news':             { type:'İsim Tamlaması', tr:'kötü haber',                               ex:"I'm afraid it's bad news." },
  'first aid':            { type:'İsim Tamlaması', tr:'ilk yardım',                               ex:'Everyone should know basic first aid.' },
  'fresh air':            { type:'İsim Tamlaması', tr:'temiz hava',                               ex:'Open the window and get some fresh air.' },
  'open air':             { type:'İsim Tamlaması', tr:'açık hava',                                ex:'An open air concert was held in the park.' },
  'world record':         { type:'İsim Tamlaması', tr:'dünya rekoru',                             ex:'She broke the world record last year.' },
  'self confidence':      { type:'İsim Tamlaması', tr:'öz güven',                                 ex:'Self confidence is key to success.' },
  'self control':         { type:'İsim Tamlaması', tr:'öz denetim, kendine hakim olma',          ex:'Self control helps you resist temptation.' },
  'age group':            { type:'İsim Tamlaması', tr:'yaş grubu',                                ex:'The survey covered every age group.' },
  'age limit':            { type:'İsim Tamlaması', tr:'yaş sınırı',                               ex:'There is an age limit for this activity.' },
  'age gap':              { type:'İsim Tamlaması', tr:'yaş farkı',                                ex:'The age gap between them is ten years.' },
  'generation gap':       { type:'İsim Tamlaması', tr:'nesil farkı, kuşak uçurumu',              ex:'The generation gap causes misunderstandings.' },
  // ── Hikaye Metinlerinde Geçen Kelimeler (Vocabulary) ───
  'accumulate':        { type:'Kelime', tr:'birikmek, toplanmak',                              ex:'Dust accumulates on shelves quickly.' },
  'aesthetically':     { type:'Kelime', tr:'estetik açıdan, görsel olarak',                    ex:'The building is aesthetically pleasing.' },
  'ai':                { type:'Kelime', tr:'YZ — Yapay Zeka (Artificial Intelligence) kısaltması', ex:'AI is transforming many industries.' },
  'ambiguous':         { type:'Kelime', tr:'belirsiz, muğlak, iki anlama gelen',               ex:'The instructions were ambiguous and confusing.' },
  'architecture':      { type:'Kelime', tr:'mimarlık; yapı mimarisi',                          ex:'She studied architecture at university.' },
  'assist':            { type:'Kelime', tr:'yardım etmek, destek olmak',                       ex:'Can you assist me with this task?' },
  'backpacks':         { type:'Kelime', tr:'sırt çantaları',                                   ex:'They packed their backpacks for the hike.' },
  'beach':             { type:'Kelime', tr:'sahil, plaj',                                      ex:'We spent the day at the beach.' },
  'bins':              { type:'Kelime', tr:'çöp kutuları, ayrıştırma kapları',                 ex:'Put recyclables in the correct bins.' },
  'biographies':       { type:'Kelime', tr:'biyografiler, yaşam öyküleri',                     ex:'The library has many biographies of scientists.' },
  'biotechnology':     { type:'Kelime', tr:'biyoteknoloji — canlılarla teknoloji bilimi',      ex:'Biotechnology is advancing medicine rapidly.' },
  'bowl':              { type:'Kelime', tr:'kase, kâse',                                       ex:'She mixed the ingredients in a large bowl.' },
  'breathtaking':      { type:'Kelime', tr:'nefes kesen, muhteşem, çarpıcı',                   ex:'The view from the summit was breathtaking.' },
  'breeze':            { type:'Kelime', tr:'esinti, hafif rüzgar, meltem',                     ex:'A cool breeze made the hot day pleasant.' },
  'campaign':          { type:'Kelime', tr:'kampanya; seçim kampanyası',                       ex:'The city launched a recycling campaign.' },
  'chords':            { type:'Kelime', tr:'akorlar (müzikte aynı anda çalınan notalar)',      ex:'He practiced guitar chords every evening.' },
  'clothes':           { type:'Kelime', tr:'kıyafetler, giysiler',                             ex:'She bought new clothes for the party.' },
  'collection':        { type:'Kelime', tr:'koleksiyon; derleme; toplama',                     ex:'The library has a vast collection of books.' },
  'company':           { type:'Kelime', tr:'şirket; arkadaşlık, sohbet',                       ex:'She works for a tech company.' },
  'contradictory':     { type:'Kelime', tr:'çelişkili, birbirine zıt',                         ex:'The two reports gave contradictory results.' },
  'crisis':            { type:'Kelime', tr:'kriz, bunalım, kritik dönüm noktası',              ex:'The company survived the financial crisis.' },
  'dedication':        { type:'Kelime', tr:'adanmışlık, bağlılık, özveri',                     ex:'Her dedication to her work is admirable.' },
  'defense':           { type:'Kelime', tr:'savunma, müdafaa; koruma mekanizması',             ex:'People use defense mechanisms to reduce stress.' },
  'determined':        { type:'Kelime', tr:'kararlı, azimli',                                  ex:'She was determined to succeed no matter what.' },
  'discomfort':        { type:'Kelime', tr:'rahatsızlık, huzursuzluk',                         ex:'He tried to hide his discomfort.' },
  'disenfranchisement':{ type:'Kelime', tr:'hak/oy yoksunluğu; toplumsal dışlanma',            ex:'Economic disenfranchisement affects many workers.' },
  'dismiss':           { type:'Kelime', tr:'göz ardı etmek; işten çıkarmak; kovmak',           ex:"Don't dismiss ideas before hearing them out." },
  'disrupting':        { type:'Kelime', tr:'sekteye uğratmak, bozmak, altüst etmek',           ex:'AI is disrupting traditional labor markets.' },
  'dissonance':        { type:'Kelime', tr:'uyumsuzluk; bilişsel çelişki',                     ex:'Cognitive dissonance causes mental discomfort.' },
  'distractions':      { type:'Kelime', tr:'dikkat dağıtıcı şeyler; engeller',                 ex:'The library is free from distractions.' },
  'earlier':           { type:'Kelime', tr:'daha erken; daha önce; önceki',                    ex:'She arrived earlier than expected.' },
  'effort':            { type:'Kelime', tr:'çaba, gayret, emek',                               ex:'Small efforts create a massive impact.' },
  'emotions':          { type:'Kelime', tr:'duygular, hisler',                                 ex:'Stoicism helps control destructive emotions.' },
  'enhancement':       { type:'Kelime', tr:'geliştirme, iyileştirme, artırma',                 ex:'Genetic enhancement raises ethical concerns.' },
  'flour':             { type:'Kelime', tr:'un (pişirmede kullanılan öğütülmüş tahıl)',        ex:'She used flour and sugar to bake the cookies.' },
  'fortitude':         { type:'Kelime', tr:'dayanıklılık; zorluklar karşısında cesaret',       ex:'She showed great fortitude during hard times.' },
  'gadgets':           { type:'Kelime', tr:'teknolojik cihazlar, alet edevat, gizmo',          ex:"It's hard to keep up with the latest gadgets." },
  'giraffe':           { type:'Kelime', tr:'zürafa (boynu uzun Afrika hayvanı)',               ex:'The giraffe stretched its neck to reach the leaves.' },
  'guitar':            { type:'Kelime', tr:'gitar',                                            ex:'He plays guitar every evening after work.' },
  'hiking':            { type:'Kelime', tr:'doğa yürüyüşü, trekking',                         ex:'They went hiking in the mountains on the weekend.' },
  'ice':               { type:'Kelime', tr:'buz',                                             ex:'She put ice in her drink to cool it down.' },
  'implementation':    { type:'Kelime', tr:'uygulama, hayata geçirme',                         ex:'The implementation of the new policy took months.' },
  'incorporating':     { type:'Kelime', tr:'dahil etmek, bünyesine katmak',                    ex:'Architects are incorporating green spaces into designs.' },
  'inevitable':        { type:'Kelime', tr:'kaçınılmaz, önlenemez',                            ex:'Change is inevitable; we must adapt to it.' },
  'information':       { type:'Kelime', tr:'bilgi, enformasyon',                               ex:'She found the exact information she needed.' },
  'investigations':    { type:'Kelime', tr:'araştırmalar, soruşturmalar, incelemeler',         ex:'Scientific investigations revealed new findings.' },
  'landfills':         { type:'Kelime', tr:'çöp depolama alanları, düzenli çöp sahaları',      ex:'Our local landfills are becoming completely full.' },
  'librarians':        { type:'Kelime', tr:'kütüphaneciler',                                  ex:'The librarians helped visitors find information.' },
  'manipulate':        { type:'Kelime', tr:'manipüle etmek, yönlendirmek, kullanmak',         ex:'Propaganda can manipulate public opinion.' },
  'mars':              { type:'Kelime', tr:'Mars — Güneş Sistemi\'nin 4. gezegeni',            ex:'Scientists are planning missions to Mars.' },
  'microplastics':     { type:'Kelime', tr:'mikroplastikler — küçük plastik parçacıklar',      ex:'Microplastics have been found in ocean depths.' },
  'mimic':             { type:'Kelime', tr:'taklit etmek; taklitçi',                           ex:'Buildings can mimic natural processes.' },
  'modification':      { type:'Kelime', tr:'değişiklik, modifikasyon, düzenleme',              ex:'The design required a small modification.' },
  'modifying':         { type:'Kelime', tr:'değiştirmek, düzenlemek',                          ex:'Scientists are modifying DNA to cure diseases.' },
  'month':             { type:'Kelime', tr:'ay (takvim birimi; ~30 günlük süre)',              ex:'She improved significantly over one month.' },
  'months':            { type:'Kelime', tr:'aylar (takvim birimi; çoğul)',                     ex:'After three months he could play guitar smoothly.' },
  'navigate':          { type:'Kelime', tr:'yön bulmak; idare etmek, yönetmek',               ex:'It is hard to navigate modern adversity alone.' },
  'novels':            { type:'Kelime', tr:'romanlar (uzun edebi kurgu türü)',                 ex:'The library holds classic and modern novels.' },
  'occupations':       { type:'Kelime', tr:'meslekler, uğraşlar',                             ex:'Automation renders many occupations obsolete.' },
  'opinion':           { type:'Kelime', tr:'görüş, kanı, fikir',                              ex:'In my opinion, education is the key to success.' },
  'options':           { type:'Kelime', tr:'seçenekler, alternatifler',                        ex:'We have too many options and cannot decide.' },
  'organisms':         { type:'Kelime', tr:'organizmalar, canlılar (biyoloji)',                ex:'Marine organisms ingest microplastic particles.' },
  'oven':              { type:'Kelime', tr:'fırın (pişirme cihazı)',                           ex:'Put the cookies in the oven for 20 minutes.' },
  'paper':             { type:'Kelime', tr:'kağıt; araştırma makalesi',                        ex:'Separate paper from plastic for recycling.' },
  'peaks':             { type:'Kelime', tr:'zirveler, doruklar; doruk noktalar',              ex:'Microplastics have reached the highest mountain peaks.' },
  'physiology':        { type:'Kelime', tr:'fizyoloji (beden işlevleri ve sistemleri bilimi)', ex:'The effects on human physiology are still unknown.' },
  'planet':            { type:'Kelime', tr:'gezegen',                                         ex:"We must protect our planet's resources." },
  'plastic':           { type:'Kelime', tr:'plastik; plastikten yapılmış',                    ex:'Separate plastic from paper for recycling.' },
  'polymers':          { type:'Kelime', tr:'polimerler (büyük moleküllü kimyasal bileşikler)', ex:'Synthetic polymers are found in microplastics.' },
  'price':             { type:'Kelime', tr:'fiyat, bedel; bedelini ödemek',                   ex:'The price of the new phone was quite high.' },
  'processor':         { type:'Kelime', tr:'işlemci (bilgisayar veya telefon çipi)',           ex:'The new smartphone has a very fast processor.' },
  'psychological':     { type:'Kelime', tr:'psikolojik, ruhsal, zihinsel',                    ex:'Defense mechanisms reduce psychological stress.' },
  'rationalize':       { type:'Kelime', tr:'akılcılaştırmak; kendini haklı çıkarmak',         ex:'People rationalize their behavior to feel better.' },
  'reactions':         { type:'Kelime', tr:'tepkiler, reaksiyonlar; yanıtlar',                ex:'We cannot control events, only our reactions.' },
  'recycling':         { type:'Kelime', tr:'geri dönüşüm',                                    ex:'Recycling reduces waste and helps the environment.' },
  'relieved':          { type:'Kelime', tr:'rahatlamış, endişesi geçmiş',                     ex:'She felt relieved after finding the cat.' },
  'resource':          { type:'Kelime', tr:'kaynak; değerli yardımcı araç',                   ex:'The library is a vital resource for the community.' },
  'retraining':        { type:'Kelime', tr:'yeniden eğitim; meslek değişikliği eğitimi',      ex:'Retraining programs help workers learn new skills.' },
  'sand':              { type:'Kelime', tr:'kum',                                             ex:'The yellow sand at the beach was very hot.' },
  'scared':            { type:'Kelime', tr:'korkmuş, ürkmüş, endişeli',                       ex:'The cat looked scared on the high branch.' },
  'season':            { type:'Kelime', tr:'mevsim; sezon; baharatlamak',                     ex:'Summer is his favorite season of the year.' },
  'shells':            { type:'Kelime', tr:'kabuklar; deniz kabukları',                       ex:'He collected small shells along the beach.' },
  'shopping':          { type:'Kelime', tr:'alışveriş; alışveriş yapmak',                     ex:'She went shopping for a party dress.' },
  'smartphone':        { type:'Kelime', tr:'akıllı telefon',                                  ex:'He bought a new smartphone with a great camera.' },
  'smell':             { type:'Kelime', tr:'koku; koklamak; kokmak',                          ex:'The smell of fresh cookies was wonderful.' },
  'sofa':              { type:'Kelime', tr:'kanepe, üçlü koltuk',                             ex:'The cat was sleeping behind the sofa.' },
  'sprawl':            { type:'Kelime', tr:'düzensiz kentsel yayılma; uzanmak',               ex:"Urban sprawl increases cities' carbon footprint." },
  'steep':             { type:'Kelime', tr:'dik, sarp; (fiyat) yüksek; ıslatmak',            ex:'The trail was quite steep and physically demanding.' },
  'summer':            { type:'Kelime', tr:'yaz',                                             ex:'Summer is the warmest season of the year.' },
  'summit':            { type:'Kelime', tr:'zirve, doruk; liderler zirvesi (toplantı)',       ex:'When they reached the summit, the view was breathtaking.' },
  'tenet':             { type:'Kelime', tr:'ilke, temel inanç, öğreti',                       ex:"A core tenet of Stoicism is accepting what you can't control." },
  'terrible':          { type:'Kelime', tr:'berbat, korkunç, dehşetli',                       ex:"At first the guitar sounds were terrible, but he improved." },
  'threat':            { type:'Kelime', tr:'tehdit, tehlike',                                 ex:'Microplastics are an invisible threat to health.' },
  'toxicological':     { type:'Kelime', tr:'toksikolojik (zehir bilimi ile ilgili)',           ex:'Toxicological effects on humans remain ambiguous.' },
  'tranquility':       { type:'Kelime', tr:'huzur, sükunet, dinginlik',                       ex:'Stoicism helps achieve a state of mental tranquility.' },
  'tutorials':         { type:'Kelime', tr:'öğretici video/ders; rehber içerikler',           ex:'He watched online tutorials to learn guitar chords.' },
  'ubiquitous':        { type:'Kelime', tr:'her yerde bulunan, son derece yaygın',            ex:'Smartphones are ubiquitous in modern life.' },
  'view':              { type:'Kelime', tr:'manzara; görüş, bakış açısı; izlemek',            ex:'The panoramic view from the summit was spectacular.' },
  'waste':             { type:'Kelime', tr:'atık, çöp; israf; ziyan etmek',                  ex:'We produce too much waste every day.' },
  'well':              { type:'Kelime', tr:'iyi (zarf); sağlıklı; kuyu; pekâlâ',             ex:'She speaks English very well.' },
  'yoga':              { type:'Kelime', tr:'yoga (zihin-beden sağlık pratiği)',               ex:'She started doing yoga every morning to reduce stress.' },
  'zoo':               { type:'Kelime', tr:'hayvanat bahçesi',                               ex:'The school organized a trip to the city zoo.' },
  'collaborative':     { type:'Kelime', tr:'işbirlikçi, ortak çalışmaya dayalı',             ex:'The event was supported by collaborative projects.' },

  // ── Batch A ────────────────────────────────────────────────
  'ability':       { type:'Kelime', tr:'yetenek, beceri, kapasite',                    ex:'She has the ability to learn languages quickly.' },
  'absence':       { type:'Kelime', tr:'yokluk, eksiklik, gıyap',                      ex:'The absence of sunlight affects mood.' },
  'absolute':      { type:'Kelime', tr:'mutlak, kesin, tam',                           ex:'She had absolute confidence in her team.' },
  'access':        { type:'Kelime', tr:'erişim, ulaşım; erişmek',                      ex:'Everyone should have access to clean water.' },
  'accountant':    { type:'Kelime', tr:'muhasebeci, mali müşavir',                     ex:'She worked as an accountant for fifteen years.' },
  'accurate':      { type:'Kelime', tr:'doğru, kesin, isabetli',                       ex:'The weather forecast was accurate today.' },
  'achieve':       { type:'Kelime', tr:'başarmak, elde etmek, ulaşmak',               ex:'With hard work you can achieve your goals.' },
  'acknowledge':   { type:'Kelime', tr:'kabul etmek, onaylamak, teslim etmek',        ex:'He acknowledged that he had made a mistake.' },
  'acquire':       { type:'Kelime', tr:'edinmek, kazanmak, elde etmek',               ex:'She acquired new skills during the course.' },
  'action':        { type:'Kelime', tr:'eylem, hareket, aksiyon',                      ex:'Words are not enough; we need action.' },
  'activity':      { type:'Kelime', tr:'etkinlik, faaliyet, aktivite',                 ex:'Reading is a great activity for the mind.' },
  'adapt':         { type:'Kelime', tr:'uyum sağlamak, adapte olmak',                  ex:'Animals adapt to their environment over time.' },
  'adequate':      { type:'Kelime', tr:'yeterli, uygun, tatmin edici',                 ex:'The building lacked adequate ventilation.' },
  'admire':        { type:'Kelime', tr:'hayran olmak, takdir etmek',                   ex:'I admire her dedication to her work.' },
  'advance':       { type:'Kelime', tr:'ilerleme; ilerlemek; öne almak',               ex:'Science has made huge advances in medicine.' },
  'adventure':     { type:'Kelime', tr:'macera, serüven, keşif',                       ex:'Travelling alone can be a great adventure.' },
  'advocate':      { type:'Kelime', tr:'savunmak, desteklemek; savunucu',             ex:'She advocates for better public transport.' },
  'affordable':    { type:'Kelime', tr:'uygun fiyatlı, karşılanabilir',               ex:'Affordable housing is hard to find in the city.' },
  'age':           { type:'Kelime', tr:'yaş; çağ, dönem; yaşlanmak',                  ex:'We live in the digital age.' },
  'aim':           { type:'Kelime', tr:'hedef, amaç; hedeflemek, amaçlamak',          ex:'The project aims to reduce carbon emissions.' },
  'algorithm':     { type:'Kelime', tr:'algoritma (problem çözme adımları dizisi)',    ex:'The algorithm sorts the data in seconds.' },
  'allow':         { type:'Kelime', tr:'izin vermek, müsaade etmek',                   ex:'The new law allows businesses to operate online.' },
  'ancient':       { type:'Kelime', tr:'antik, eski, çok eski',                        ex:'Stoicism is an ancient Greek philosophy.' },
  'anxiety':       { type:'Kelime', tr:'kaygı, endişe, anksiyete',                     ex:'She felt anxiety before her first job interview.' },
  'apartment':     { type:'Kelime', tr:'daire, apartman katı',                         ex:'He rented a small apartment in the city.' },
  'appear':        { type:'Kelime', tr:'görünmek, ortaya çıkmak, belirmek',           ex:'A small dog appeared at the door.' },
  'apply':         { type:'Kelime', tr:'başvurmak; uygulamak; geçerli olmak',         ex:'She decided to apply for the new job.' },
  'approach':      { type:'Kelime', tr:'yaklaşım, yöntem; yaklaşmak',                 ex:'A holistic approach works best for this problem.' },
  'arabic':        { type:'Kelime', tr:'Arapça; Arap (dili)',                          ex:'She was learning Arabic as a second language.' },
  'argue':         { type:'Kelime', tr:'tartışmak, öne sürmek, iddia etmek',          ex:'Critics argue that the policy is unfair.' },
  'art':           { type:'Kelime', tr:'sanat; el becerisi; sanat eseri',              ex:'She has always had a passion for art.' },
  'artificial':    { type:'Kelime', tr:'yapay, doğal olmayan; suni',                   ex:'Artificial intelligence is changing many industries.' },
  'aspect':        { type:'Kelime', tr:'yön, boyut, açı, özellik',                     ex:'Hard work is just one aspect of success.' },
  'associate':     { type:'Kelime', tr:'ilişkilendirmek; ortak; meslektaş',            ex:'She associated the smell with her childhood.' },
  'atmosphere':    { type:'Kelime', tr:'atmosfer; hava, ortam, ambiyans',              ex:'The atmosphere at the festival was electric.' },
  'attempt':       { type:'Kelime', tr:'girişim, deneme; denemek, girişmek',           ex:'His first attempt to bake bread failed.' },
  'attention':     { type:'Kelime', tr:'dikkat, ilgi, özen',                           ex:'Pay attention to the details.' },
  'attract':       { type:'Kelime', tr:'çekmek, ilgisini çekmek, kendine çekmek',     ex:'The café began to attract new customers.' },
  'automate':      { type:'Kelime', tr:'otomatikleştirmek, makineleştirmek',           ex:'Many tasks can now be automated by software.' },
  'autumn':        { type:'Kelime', tr:'sonbahar',                                     ex:'The leaves turn red and orange in autumn.' },
  'available':     { type:'Kelime', tr:'mevcut, hazır, erişilebilir',                  ex:'The report is available online for free.' },

  // ── Batch B ────────────────────────────────────────────────
  'bake':          { type:'Kelime', tr:'fırında pişirmek; ekmek pişirmek',             ex:'She loves to bake cookies on rainy days.' },
  'baker':         { type:'Kelime', tr:'fırıncı, ekmek ustası',                        ex:'The baker had fresh bread ready by eight.' },
  'bakery':        { type:'Kelime', tr:'fırın, ekmek/pasta dükkanı',                   ex:'The bakery on the corner smells wonderful.' },
  'ball':          { type:'Kelime', tr:'top; balo; küre',                              ex:'He kicked the ball into the goal.' },
  'barely':        { type:'Kelime', tr:'güçlükle, ancak, neredeyse hiç',               ex:'She could barely keep her eyes open.' },
  'basic':         { type:'Kelime', tr:'temel, basit, birincil',                        ex:'He learned the basic rules of chess.' },
  'bathroom':      { type:'Kelime', tr:'banyo, tuvalet',                               ex:'She went to the bathroom to brush her teeth.' },
  'bed':           { type:'Kelime', tr:'yatak; yatak; tarhı (çiçek)',                  ex:'He stretched in bed before getting up.' },
  'behaviour':     { type:'Kelime', tr:'davranış, tutum, hareket biçimi',              ex:'The study analysed consumer behaviour.' },
  'belief':        { type:'Kelime', tr:'inanç, kanaat, inanma',                        ex:'Her belief in hard work never wavered.' },
  'beneath':       { type:'Kelime', tr:'altında, aşağısında, -in altında',             ex:'The habit runs beneath conscious awareness.' },
  'bicycle':       { type:'Kelime', tr:'bisiklet',                                     ex:'He rides his bicycle to school every day.' },
  'biological':    { type:'Kelime', tr:'biyolojik, canlılarla ilgili',                 ex:'Sleep is a biological necessity, not a luxury.' },
  'birth':         { type:'Kelime', tr:'doğum; başlangıç, ortaya çıkış',              ex:'Our genetic fate is not fixed at birth.' },
  'brain':         { type:'Kelime', tr:'beyin; zekâ; düşünce organı',                  ex:'The brain processes narrative more easily.' },
  'bread':         { type:'Kelime', tr:'ekmek',                                        ex:'She bought a loaf of sourdough bread.' },
  'break':         { type:'Kelime', tr:'mola, ara; kırmak; fırsat',                    ex:'She decided to take a break from social media.' },
  'breakfast':     { type:'Kelime', tr:'kahvaltı',                                     ex:'They cooked breakfast on a small fire.' },
  'brother':       { type:'Kelime', tr:'erkek kardeş, ağabey/kardeş',                  ex:'She explored the forest trails with her brother.' },
  'bus':           { type:'Kelime', tr:'otobüs',                                       ex:'She takes the bus to college every morning.' },
  'busy':          { type:'Kelime', tr:'meşgul, yoğun, kalabalık',                     ex:'The city centre is always busy on Saturdays.' },

  // ── Batch C ────────────────────────────────────────────────
  'cake':          { type:'Kelime', tr:'pasta, kek; somun (sabun)',                    ex:'She brought him a homemade cake.' },
  'calm':          { type:'Kelime', tr:'sakin, huzurlu; sakinleştirmek',               ex:'The library makes her feel calm and inspired.' },
  'camping':       { type:'Kelime', tr:'kamp yapma; kamp',                             ex:'Every year her family goes camping in the mountains.' },
  'candle':        { type:'Kelime', tr:'mum, şamdan mumu',                             ex:'The cake had eight candles on it.' },
  'capable':       { type:'Kelime', tr:'yetenekli, muktedir, becerikli',               ex:'She is capable of managing a large team.' },
  'capacity':      { type:'Kelime', tr:'kapasite, yetenek; alan, hacim',               ex:'We must build the capacity for lifelong learning.' },
  'carbon':        { type:'Kelime', tr:'karbon (kimyasal element, CO₂ ile ilgili)',    ex:'Flying has a large carbon footprint.' },
  'career':        { type:'Kelime', tr:'kariyer, meslek hayatı',                       ex:'She changed career after fifteen years.' },
  'century':       { type:'Kelime', tr:'yüzyıl, asır',                                 ex:'This is one of the challenges of the twenty-first century.' },
  'cereal':        { type:'Kelime', tr:'tahıl gevreği; hububat',                       ex:'She eats a bowl of cereal for breakfast.' },
  'challenge':     { type:'Kelime', tr:'zorluk, meydan okuma; zorlamak',              ex:'He decided to challenge himself every week.' },
  'charity':       { type:'Kelime', tr:'hayır kurumu, bağış; yardımseverlik',         ex:'He founded a charity to support rural schools.' },
  'choice':        { type:'Kelime', tr:'seçim, tercih, seçenek',                       ex:'Framing sustainability as individual choice is limiting.' },
  'chocolate':     { type:'Kelime', tr:'çikolata; kakao',                              ex:'He drinks hot chocolate and reads by the window.' },
  'citizen':       { type:'Kelime', tr:'vatandaş, yurttaş',                            ex:'A democracy needs informed citizens.' },
  'class':         { type:'Kelime', tr:'sınıf; ders; sosyal sınıf',                    ex:'She joined an art class at the community centre.' },
  'climate':       { type:'Kelime', tr:'iklim; genel ortam, hava',                     ex:'Climate change affects people around the world.' },
  'club':          { type:'Kelime', tr:'kulüp, dernek; sopa',                          ex:'She joined the school photography club.' },
  'coal':          { type:'Kelime', tr:'kömür; taş kömürü',                            ex:'Many communities depend on coal mining.' },
  'cognitive':     { type:'Kelime', tr:'bilişsel, zihinsel, kavrayışla ilgili',        ex:'Sleep deprivation impairs cognitive function.' },
  'collective':    { type:'Kelime', tr:'kolektif, ortak, toplu',                       ex:'Cultural memory is a collective framework.' },
  'college':       { type:'Kelime', tr:'yüksekokul, üniversite; kolej',               ex:'He drove to college after a full day at work.' },
  'colour':        { type:'Kelime', tr:'renk; renk vermek',                            ex:'The leaves turn many colours in autumn.' },
  'community':     { type:'Kelime', tr:'topluluk, toplum, çevre',                      ex:'The library is a vital resource for our community.' },
  'competition':   { type:'Kelime', tr:'yarışma, rekabet, müsabaka',                   ex:'Her mentor encouraged her to enter the competition.' },
  'complex':       { type:'Kelime', tr:'karmaşık, çok yönlü; kompleks',               ex:'The energy transition is a complex undertaking.' },
  'concept':       { type:'Kelime', tr:'kavram, fikir, anlayış',                       ex:'The concept of the fifteen-minute city is gaining traction.' },
  'confidence':    { type:'Kelime', tr:'güven, özgüven; inanç',                        ex:'She never had the confidence to share her work.' },
  'conscious':     { type:'Kelime', tr:'bilinçli, farkında olan',                      ex:'Make more conscious purchasing decisions.' },
  'consumer':      { type:'Kelime', tr:'tüketici; kullanan kişi',                      ex:'Consumer behaviour is shaped by advertising.' },
  'control':       { type:'Kelime', tr:'kontrol, denetim; kontrol etmek',              ex:'Autonomy means having control over your own life.' },
  'cook':          { type:'Kelime', tr:'yemek pişirmek; aşçı',                         ex:'He decided to cook something new every week.' },
  'cookies':       { type:'Kelime', tr:'kurabiye; çerezler (internet)',                ex:'They baked cookies together on a rainy day.' },
  'cooperation':   { type:'Kelime', tr:'işbirliği, koordinasyon',                      ex:'The project requires international cooperation.' },
  'core':          { type:'Kelime', tr:'öz, çekirdek, temel; merkez',                  ex:'The core of Stoicism is self-control.' },
  'cost':          { type:'Kelime', tr:'maliyet, fiyat; mal olmak',                    ex:'Solar energy costs have dropped dramatically.' },
  'course':        { type:'Kelime', tr:'kurs, ders; yol, seyir; tabak (yemek)',       ex:'She enrolled in a night-school course.' },
  'creativity':    { type:'Kelime', tr:'yaratıcılık, özgünlük',                        ex:'He had to rely on creativity rather than technology.' },
  'critic':        { type:'Kelime', tr:'eleştirmen; eleştirici kişi',                  ex:'Critics argue that the policy is unfair.' },
  'crowd':         { type:'Kelime', tr:'kalabalık, izleyici kitlesi',                  ex:'The crowd was enormous and full of energy.' },
  'culture':       { type:'Kelime', tr:'kültür; yetiştirme; medeniyet',               ex:'Globalisation has an impact on local culture.' },
  'cup':           { type:'Kelime', tr:'fincan, kupa; kap',                            ex:'Her mum made her a cup of warm tea.' },

  // ── Batch D ────────────────────────────────────────────────
  'dad':           { type:'Kelime', tr:'baba (konuşma dili)',                          ex:'Dad built a sandcastle with the youngest child.' },
  'daily':         { type:'Kelime', tr:'günlük, her gün, gündelik',                    ex:'Exercise should be part of your daily routine.' },
  'data':          { type:'Kelime', tr:'veri, veriler; bilgi',                          ex:'The platform collects data about its users.' },
  'daughter':      { type:'Kelime', tr:'kız (evlat), kız çocuğu',                     ex:'His daughter convinced him to enter the competition.' },
  'debate':        { type:'Kelime', tr:'tartışma, münazara; tartışmak',               ex:'The debate about free will remains unresolved.' },
  'decade':        { type:'Kelime', tr:'on yıl, dekat',                                ex:'Costs have dropped over the past decade.' },
  'decision':      { type:'Kelime', tr:'karar, tercih',                                ex:'It was the bravest decision he ever made.' },
  'democracy':     { type:'Kelime', tr:'demokrasi, halk yönetimi',                     ex:'Digital literacy is a prerequisite for democracy.' },
  'design':        { type:'Kelime', tr:'tasarım; tasarlamak, planlamak',               ex:'The design of the app is simple and clean.' },
  'diet':          { type:'Kelime', tr:'diyet, beslenme; besin',                       ex:'A healthy diet reduces the risk of disease.' },
  'different':     { type:'Kelime', tr:'farklı, değişik, ayrı',                        ex:'She tried something different every week.' },
  'digital':       { type:'Kelime', tr:'dijital, sayısal, elektronik',                 ex:'We live in an era of pervasive digital media.' },
  'dinner':        { type:'Kelime', tr:'akşam yemeği; öğle yemeği (resmi)',           ex:'The owner invited them to stay for dinner.' },
  'disease':       { type:'Kelime', tr:'hastalık, rahatsızlık',                        ex:'Gene editing may eradicate hereditary diseases.' },
  'diverse':       { type:'Kelime', tr:'çeşitli, farklı, çok yönlü',                  ex:'A diverse range of voices is essential in media.' },
  'dog':           { type:'Kelime', tr:'köpek',                                        ex:'A small dog appeared at the door of her house.' },
  'dream':         { type:'Kelime', tr:'rüya; hayal, düş; hayal etmek',               ex:'Her dream is to become a writer one day.' },
  'drive':         { type:'Kelime', tr:'sürmek, araba kullanmak; itici güç',          ex:'The family drove to the beach on a sunny day.' },
  'drug':          { type:'Kelime', tr:'ilaç; uyuşturucu madde',                       ex:'Quantum computers could speed up drug discovery.' },

  // ── Batch E ────────────────────────────────────────────────
  'economic':      { type:'Kelime', tr:'ekonomik, iktisadi',                           ex:'The economic impact of automation is significant.' },
  'economics':     { type:'Kelime', tr:'ekonomi, iktisat bilimi',                      ex:'She studied economics at university.' },
  'education':     { type:'Kelime', tr:'eğitim, öğretim',                              ex:'He thought about going back to education at 36.' },
  'electricity':   { type:'Kelime', tr:'elektrik; elektrik enerjisi',                  ex:'The school had no electricity, just candlelight.' },
  'email':         { type:'Kelime', tr:'e-posta; e-posta göndermek',                   ex:'She received an email offering her the position.' },
  'emotion':       { type:'Kelime', tr:'duygu, his',                                   ex:'Positive emotions are a pillar of well-being.' },
  'employ':        { type:'Kelime', tr:'istihdam etmek, çalıştırmak; kullanmak',      ex:'Platform designers employ clever design techniques.' },
  'energy':        { type:'Kelime', tr:'enerji; güç; canlılık',                        ex:'The crowd was enormous and full of energy.' },
  'engage':        { type:'Kelime', tr:'meşgul etmek; katılmak; ilgiyi çekmek',       ex:'The platform keeps users engaged for longer.' },
  'ensure':        { type:'Kelime', tr:'sağlamak, güvence altına almak',               ex:'We must ensure that all voices are heard.' },
  'environment':   { type:'Kelime', tr:'çevre, doğal ortam; atmosfer',                ex:'Epigenetics studies the effect of the environment on genes.' },
  'essential':     { type:'Kelime', tr:'temel, zorunlu, vazgeçilmez',                  ex:'Consistency is absolutely essential for forming habits.' },
  'ethical':       { type:'Kelime', tr:'etik, ahlaki, değerlere uygun',               ex:'Gene editing raises profound ethical questions.' },
  'evidence':      { type:'Kelime', tr:'kanıt, delil, ispat',                          ex:'The evidence for climate change is overwhelming.' },
  'experience':    { type:'Kelime', tr:'deneyim, tecrübe; yaşamak',                   ex:'The experience changed his perspective on education.' },
  'experiment':    { type:'Kelime', tr:'deney, deneme; denemek',                       ex:'She began experimenting with light and composition.' },
  'explore':       { type:'Kelime', tr:'keşfetmek, araştırmak',                        ex:'Mia loves to explore the forest trails.' },
  'extraordinary': { type:'Kelime', tr:'olağanüstü, sıra dışı, müthiş',              ex:'The children\'s enthusiasm for learning was extraordinary.' },

  // ── Batch F ────────────────────────────────────────────────
  'failure':       { type:'Kelime', tr:'başarısızlık, hayal kırıklığı; arıza',        ex:'Starting over is not a sign of failure.' },
  'fashion':       { type:'Kelime', tr:'moda; biçim, tarz',                            ex:'The fashion industry generates huge amounts of waste.' },
  'fear':          { type:'Kelime', tr:'korku, endişe; korkmak',                       ex:'Climate grief includes chronic fear and sadness.' },
  'festival':      { type:'Kelime', tr:'festival, şenlik',                             ex:'Thousands travel to the valley for the festival.' },
  'film':          { type:'Kelime', tr:'film, sinema; ince tabaka',                    ex:'They watched a short film inside the dome.' },
  'final':         { type:'Kelime', tr:'son, nihai, kesin',                            ex:'She submitted her final project on time.' },
  'fire':          { type:'Kelime', tr:'ateş; yangın; ateşlemek',                      ex:'They cooked breakfast on a small fire.' },
  'focus':         { type:'Kelime', tr:'odak, merkez; odaklanmak',                     ex:'She tried to focus on one task at a time.' },
  'food':          { type:'Kelime', tr:'yiyecek, gıda, besin',                         ex:'She gave the dog some food and a warm blanket.' },
  'forest':        { type:'Kelime', tr:'orman',                                        ex:'She loved exploring the forest trails.' },
  'freedom':       { type:'Kelime', tr:'özgürlük, serbestlik; bağımsızlık',           ex:'True freedom requires more than absence of coercion.' },
  'fresh':         { type:'Kelime', tr:'taze, yeni, temiz; dinç',                      ex:'He bought fresh produce at the Sunday market.' },
  'friend':        { type:'Kelime', tr:'arkadaş, dost',                                ex:'She made three close friends through the book club.' },
  'fruit':         { type:'Kelime', tr:'meyve; sonuç, ürün',                           ex:'He bought bread, milk, eggs, and some fruit.' },
  'fuel':          { type:'Kelime', tr:'yakıt, enerji kaynağı; körüklemek',           ex:'Solar energy is replacing fossil fuels.' },
  'function':      { type:'Kelime', tr:'işlev, görev; çalışmak, işlev yapmak',       ex:'Well-being is not primarily a function of wealth.' },
  'furniture':     { type:'Kelime', tr:'mobilya, ev eşyaları',                         ex:'He built and sold enough furniture to prove the idea.' },
  'future':        { type:'Kelime', tr:'gelecek, istikbal; ileride olan',              ex:'Young people face an uncertain future.' },

  // ── Batch G ────────────────────────────────────────────────
  'game':          { type:'Kelime', tr:'oyun; maç; av',                                ex:'They talked about their favourite films and games.' },
  'garden':        { type:'Kelime', tr:'bahçe; bahçe yapmak',                          ex:'Mr. Ali spends every morning in his garden.' },
  'generate':      { type:'Kelime', tr:'üretmek, oluşturmak, yaratmak',               ex:'Technology generates more jobs than it eliminates.' },
  'genetic':       { type:'Kelime', tr:'genetik, kalıtımsal',                          ex:'Gene editing can fix hereditary genetic disorders.' },
  'global':        { type:'Kelime', tr:'küresel, dünya genelinde, evrensel',           ex:'Climate change is a global challenge.' },
  'government':    { type:'Kelime', tr:'hükümet, yönetim; devlet',                    ex:'Governments must invest in lifelong learning.' },
  'grandma':       { type:'Kelime', tr:'büyükanne, babaanne/anneanne (konuşma dili)', ex:'Grandma showed her how to cut the cookies.' },
  'grandmother':   { type:'Kelime', tr:'büyükanne, babaanne/anneanne',                ex:'Sophie feels warm and happy after talking to her grandmother.' },
  'grass':         { type:'Kelime', tr:'çimen, ot, çim',                               ex:'Their dog chases squirrels through the grass.' },
  'grief':         { type:'Kelime', tr:'keder, yas, derin üzüntü',                     ex:'Climate grief is a rational response to a real threat.' },
  'guide':         { type:'Kelime', tr:'rehber; kılavuz; yol göstermek',              ex:'The museum guide showed them how planets move.' },

  // ── Batch H ────────────────────────────────────────────────
  'habit':         { type:'Kelime', tr:'alışkanlık; itiyat',                           ex:'Habits are encoded in the basal ganglia of the brain.' },
  'harvest':       { type:'Kelime', tr:'hasat, ürün toplama; hasat etmek',            ex:'The harvest was enough to share with the whole street.' },
  'health':        { type:'Kelime', tr:'sağlık, esenlik',                              ex:'Physical health is important, but so is mental health.' },
  'history':       { type:'Kelime', tr:'tarih; geçmiş',                                ex:'The social contract is foundational in political history.' },
  'holiday':       { type:'Kelime', tr:'tatil, bayram; resmi tatil',                   ex:'She says camping is her favourite holiday.' },
  'honey':         { type:'Kelime', tr:'bal; sevgilim (hitap)',                         ex:'Her mum made tea with honey and lemon.' },
  'hour':          { type:'Kelime', tr:'saat (zaman birimi)',                           ex:'They spoke for at least an hour every Sunday.' },
  'housing':       { type:'Kelime', tr:'konut, barınak; ev yapımı',                    ex:'Affordable housing is hard to find in big cities.' },
  'human':         { type:'Kelime', tr:'insan; insani, insana özgü',                   ex:'Humans are storytelling animals at their core.' },
  'hydrogen':      { type:'Kelime', tr:'hidrojen (kimyasal element, H)',               ex:'Hydrogen fuel cells are a promising clean energy source.' },

  // ── Batch I ────────────────────────────────────────────────
  'idea':          { type:'Kelime', tr:'fikir, düşünce, kavram',                       ex:'She had no idea who had sent the package.' },
  'identity':      { type:'Kelime', tr:'kimlik, benlik; özdeşlik',                     ex:'Cultural memory shapes a group\'s sense of identity.' },
  'ignore':        { type:'Kelime', tr:'görmezden gelmek, dikkate almamak',            ex:'The evidence is too strong to ignore.' },
  'impact':        { type:'Kelime', tr:'etki, darbe, tesir; etkilemek',               ex:'The impact of automation on jobs is significant.' },
  'important':     { type:'Kelime', tr:'önemli, değerli, büyük',                       ex:'Seasoning is the most important part of any recipe.' },
  'improve':       { type:'Kelime', tr:'geliştirmek, iyileştirmek, artırmak',          ex:'She joined an exchange programme to improve her English.' },
  'income':        { type:'Kelime', tr:'gelir, kazanç',                                ex:'Well-being does not depend only on income.' },
  'industry':      { type:'Kelime', tr:'endüstri, sanayi; çalışkanlık',               ex:'The fashion industry produces a lot of textile waste.' },
  'infrastructure':{ type:'Kelime', tr:'altyapı; temel tesisler',                      ex:'Cities need adequate infrastructure to function.' },
  'insight':       { type:'Kelime', tr:'içgörü, kavrayış, anlayış',                    ex:'Behavioural economics offers valuable insights.' },
  'inspire':       { type:'Kelime', tr:'ilham vermek, esinlendirmek',                  ex:'The gallery experience left her feeling inspired.' },
  'intelligence':  { type:'Kelime', tr:'zekâ, akıl; istihbarat',                      ex:'Artificial intelligence is reshaping the labour market.' },
  'interact':      { type:'Kelime', tr:'etkileşmek, karşılıklı etki etmek',           ex:'The brain interacts with the environment constantly.' },
  'invest':        { type:'Kelime', tr:'yatırım yapmak; harcamak (zaman/çaba)',        ex:'Governments must invest in education and training.' },
  'isolation':     { type:'Kelime', tr:'izolasyon, yalnızlık; tecrit',                 ex:'He made paintings during a long period of isolation.' },

  // ── Batch J-K ────────────────────────────────────────────────
  'jewellery':     { type:'Kelime', tr:'mücevher, takı',                               ex:'She started an online business selling handmade jewellery.' },
  'jog':           { type:'Kelime', tr:'hafif koşu yapmak; yavaş koşmak',             ex:'She could barely jog for ten minutes without stopping.' },
  'justice':       { type:'Kelime', tr:'adalet, hakkaniyet',                            ex:'Questions of justice are central to political philosophy.' },
  'key':           { type:'Kelime', tr:'anahtar; kilit nokta, temel; önemli',         ex:'The key insight is that habits are never truly deleted.' },
  'knee':          { type:'Kelime', tr:'diz (vücut)',                                   ex:'She pushed through knee pain and bad weather.' },
  'knowledge':     { type:'Kelime', tr:'bilgi, bilme, kavrayış',                       ex:'Cultural memory transmits knowledge about the past.' },

  // ── Batch L ────────────────────────────────────────────────
  'labour':        { type:'Kelime', tr:'emek, işgücü; çalışmak; doğum sancısı',      ex:'Automation is reshaping the global labour market.' },
  'language':      { type:'Kelime', tr:'dil, lisan; anlatım biçimi',                  ex:'Language shapes the way we perceive the world.' },
  'law':           { type:'Kelime', tr:'yasa, kanun, hukuk; ilke',                    ex:'Natural laws govern every event in determinism.' },
  'lead':          { type:'Kelime', tr:'liderlik etmek, önde gitmek; yol açmak',      ex:'A sedentary lifestyle can lead to health problems.' },
  'library':       { type:'Kelime', tr:'kütüphane',                                    ex:'The local library is a vital resource for the community.' },
  'lifestyle':     { type:'Kelime', tr:'yaşam tarzı, hayat biçimi',                   ex:'His lifestyle was unsustainable without more balance.' },
  'list':          { type:'Kelime', tr:'liste; listelemek',                             ex:'His mum sent him with a list of things to buy.' },
  'literature':    { type:'Kelime', tr:'edebiyat; yazın; kaynakça',                   ex:'The library has a vast collection of literature.' },
  'local':         { type:'Kelime', tr:'yerel, mahalli; bölgesel',                     ex:'The local library is important for the community.' },
  'loss':          { type:'Kelime', tr:'kayıp, yitim; zarar',                          ex:'Climate grief involves a sense of loss and sadness.' },
  'lunch':         { type:'Kelime', tr:'öğle yemeği',                                   ex:'They had lunch in the museum café.' },

  // ── Batch M ────────────────────────────────────────────────
  'major':         { type:'Kelime', tr:'büyük, önemli, ana; asker albayı',            ex:'She made major changes to her daily routine.' },
  'manage':        { type:'Kelime', tr:'yönetmek, idare etmek; başarmak',             ex:'She had to manage finances and hire staff.' },
  'marathon':      { type:'Kelime', tr:'maraton (42 km koşu); uzun zorlu süreç',      ex:'She decided to run a marathon for the first time.' },
  'market':        { type:'Kelime', tr:'pazar, çarşı; piyasa',                         ex:'He discovered a fantastic market every Sunday.' },
  'materials':     { type:'Kelime', tr:'malzeme, madde; materyal',                    ex:'Quantum computers are useful in materials science.' },
  'media':         { type:'Kelime', tr:'medya; iletişim araçları',                     ex:'Social media can spread information very quickly.' },
  'memory':        { type:'Kelime', tr:'hafıza, bellek; anı',                          ex:'Sleep plays a critical role in memory consolidation.' },
  'mental':        { type:'Kelime', tr:'zihinsel, akli, ruhsal',                       ex:'Stoicism helps achieve a state of mental tranquility.' },
  'mentor':        { type:'Kelime', tr:'akıl hocası, rehber, mentor',                  ex:'Her mentor encouraged her to enter the competition.' },
  'model':         { type:'Kelime', tr:'model, örnek; biçim; modellemek',             ex:'Seligman\'s PERMA model identifies five pillars.' },
  'moral':         { type:'Kelime', tr:'ahlaki, etik; ders (çıkarılan)',               ex:'Stories help establish moral norms in communities.' },
  'mountain':      { type:'Kelime', tr:'dağ',                                          ex:'Every year her family goes camping in the mountains.' },
  'movement':      { type:'Kelime', tr:'hareket, akım; kımıldama',                    ex:'The ethical consumer movement advocates conscious buying.' },
  'museum':        { type:'Kelime', tr:'müze',                                          ex:'The class went on a trip to the science museum.' },
  'music':         { type:'Kelime', tr:'müzik; melodi',                                ex:'She shared recipes and music recommendations.' },

  // ── Batch N ────────────────────────────────────────────────
  'narrative':     { type:'Kelime', tr:'anlatı, hikaye; olay örgüsü',                 ex:'A compelling narrative can shape public opinion.' },
  'natural':       { type:'Kelime', tr:'doğal, tabii; olağan',                         ex:'Human beings have a natural gift for storytelling.' },
  'neighbourhood': { type:'Kelime', tr:'mahalle, çevre; komşuluk',                    ex:'He explored the neighbourhood on foot.' },
  'network':       { type:'Kelime', tr:'ağ, şebeke; ağ oluşturmak',                   ex:'The default mode network is active during relaxation.' },
  'neural':        { type:'Kelime', tr:'sinirsel, nöronal, sinir sistemiyle ilgili',   ex:'Neural pathways are strengthened through myelination.' },
  'notice':        { type:'Kelime', tr:'fark etmek, dikkat etmek; bildirim',          ex:'Her flatmate noticed that she wasn\'t sleeping well.' },
  'novel':         { type:'Kelime', tr:'roman; yeni, özgün',                           ex:'Rosa chose a novel set in 1920s Istanbul.' },
  'nutrition':     { type:'Kelime', tr:'beslenme, gıda bilimi',                        ex:'Improved nutrition can reverse some epigenetic changes.' },

  // ── Batch O ────────────────────────────────────────────────
  'oil':           { type:'Kelime', tr:'petrol; yağ; yağlamak',                        ex:'Communities historically dependent on coal and oil.' },
  'online':        { type:'Kelime', tr:'çevrimiçi, internet üzerinden',               ex:'She set up a website and joined online platforms.' },
  'oral':          { type:'Kelime', tr:'sözlü, ağızdan; ağıza ait',                   ex:'Oral narratives transmitted culture before writing.' },
  'organisation':  { type:'Kelime', tr:'organizasyon, kuruluş, örgüt',               ex:'She felt lost in the large organisation.' },
  'outcome':       { type:'Kelime', tr:'sonuç, çıktı; netice',                         ex:'Safe environments generate more innovative outcomes.' },
  'outside':       { type:'Kelime', tr:'dışarı, dışarıda; dış taraf',                 ex:'It was raining heavily outside.' },

  // ── Batch P ────────────────────────────────────────────────
  'pain':          { type:'Kelime', tr:'ağrı, acı, sızı; üzüntü',                     ex:'She pushed through knee pain and bad weather.' },
  'painting':      { type:'Kelime', tr:'resim, tablo; boyama',                         ex:'Her favourite gift was a set of painting supplies.' },
  'park':          { type:'Kelime', tr:'park; bahçe; park etmek',                      ex:'The family goes to the park every evening.' },
  'party':         { type:'Kelime', tr:'parti, eğlence; siyasi parti; taraf',         ex:'Ten friends came to her birthday party.' },
  'passion':       { type:'Kelime', tr:'tutku, ihtiras; şiddetli duygu',              ex:'He had always had a passion for woodworking.' },
  'patient':       { type:'Kelime', tr:'sabırlı; hasta (tıpta)',                       ex:'Gardening teaches you to be patient.' },
  'period':        { type:'Kelime', tr:'dönem, süre, periyot',                         ex:'He made paintings during a long period of isolation.' },
  'philosophy':    { type:'Kelime', tr:'felsefe; dünya görüşü',                        ex:'The social contract is foundational in political philosophy.' },
  'phone':         { type:'Kelime', tr:'telefon; telefon etmek',                       ex:'Sophie calls her grandmother every Sunday by phone.' },
  'photography':   { type:'Kelime', tr:'fotoğrafçılık; fotoğraf sanatı',              ex:'Nina had always been passionate about photography.' },
  'physical':      { type:'Kelime', tr:'fiziksel, bedensel, maddi',                    ex:'Physical exercise improves both body and mind.' },
  'platform':      { type:'Kelime', tr:'platform; mecra; peron',                       ex:'She opened accounts on several online platforms.' },
  'political':     { type:'Kelime', tr:'siyasi, politik; hükümetle ilgili',           ex:'Political commitment is needed for clean energy.' },
  'positive':      { type:'Kelime', tr:'olumlu, pozitif; kesin, emin',                ex:'Positive emotions are a key pillar of well-being.' },
  'power':         { type:'Kelime', tr:'güç, iktidar; enerji; gücü olmak',            ex:'The power of narrative shapes our understanding.' },
  'prepare':       { type:'Kelime', tr:'hazırlamak, hazırlanmak',                      ex:'She prepared for the interview for two weeks.' },
  'prevent':       { type:'Kelime', tr:'önlemek, engellemek',                          ex:'Vaccines help prevent the spread of disease.' },
  'process':       { type:'Kelime', tr:'süreç, işlem; işlemek',                        ex:'Creativity is a far more structured process than we think.' },
  'produce':       { type:'Kelime', tr:'üretmek, oluşturmak; ürün, sebze-meyve',     ex:'He bought fresh produce at the Sunday market.' },
  'programme':     { type:'Kelime', tr:'program; etkinlik listesi',                   ex:'She joined an online language exchange programme.' },
  'project':       { type:'Kelime', tr:'proje; ışık yansıtmak; tahminde bulunmak',   ex:'She felt overwhelmed by the deadline for her project.' },
  'property':      { type:'Kelime', tr:'mülk, taşınmaz; özellik, nitelik',            ex:'Locke emphasised the protection of life, liberty, and property.' },
  'psychology':    { type:'Kelime', tr:'psikoloji; insan davranışı bilimi',           ex:'Positive psychology focuses on human flourishing.' },
  'public':        { type:'Kelime', tr:'kamuya ait, halka açık; kamu, halk',          ex:'Public media should be free from political interference.' },

  // ── Batch Q-R ────────────────────────────────────────────────
  'quality':       { type:'Kelime', tr:'kalite, nitelik; özellik',                     ex:'Quality of relationships matters most for happiness.' },
  'quantum':       { type:'Kelime', tr:'kuantum (fizik)',                              ex:'Quantum computers exploit the principle of superposition.' },
  'question':      { type:'Kelime', tr:'soru; sorgulamak; mesele',                    ex:'She practised answering common interview questions.' },
  'rapid':         { type:'Kelime', tr:'hızlı, çabuk, süratli',                        ex:'The rapid development of AI raises ethical questions.' },
  'rational':      { type:'Kelime', tr:'mantıklı, akılcı, rasyonel',                  ex:'Eco-anxiety is a rational response to a real threat.' },
  'recipe':        { type:'Kelime', tr:'tarif, reçete (yemek)',                        ex:'He learned that seasoning is the key to any recipe.' },
  'reduce':        { type:'Kelime', tr:'azaltmak, indirmek, düşürmek',                ex:'We need to reduce our carbon footprint.' },
  'region':        { type:'Kelime', tr:'bölge, yöre; alan',                            ex:'Habits are encoded in a region of the brain called the basal ganglia.' },
  'relationship':  { type:'Kelime', tr:'ilişki, bağ, alaka',                           ex:'The quality of relationships predicts long-term happiness.' },
  'research':      { type:'Kelime', tr:'araştırma; araştırmak, incelemek',            ex:'She researched the company thoroughly before the interview.' },
  'residents':     { type:'Kelime', tr:'sakinler, ikamet edenler',                    ex:'A group of residents decided to build a community garden.' },
  'response':      { type:'Kelime', tr:'yanıt, cevap; tepki, reaksiyon',             ex:'Eco-anxiety is a response to environmental destruction.' },
  'responsibility':{ type:'Kelime', tr:'sorumluluk, görev',                            ex:'Balancing progress with moral responsibility is crucial.' },
  'reward':        { type:'Kelime', tr:'ödül; mükâfatlandırmak',                      ex:'The reward reinforces a behaviour loop.' },
  'risk':          { type:'Kelime', tr:'risk, tehlike; riske atmak',                  ex:'Opening a café was a risk, but she took it.' },
  'role':          { type:'Kelime', tr:'rol, görev; fonksiyon',                        ex:'REM sleep plays a critical role in memory consolidation.' },
  'routine':       { type:'Kelime', tr:'rutin, alışkanlık; düzenli alışkanlık',       ex:'A good morning routine makes the whole day better.' },
  'rural':         { type:'Kelime', tr:'kırsal, köye ait, taşraya ait',               ex:'He taught mathematics at a rural primary school.' },

  // ── Batch S ────────────────────────────────────────────────
  'safe':          { type:'Kelime', tr:'güvenli, emniyetli; kasa',                    ex:'Tom wears a helmet to stay safe.' },
  'satisfaction':  { type:'Kelime', tr:'tatmin, memnuniyet, doyum',                   ex:'Internal satisfaction drives real creativity.' },
  'saturday':      { type:'Kelime', tr:'Cumartesi',                                   ex:'The family drove to the beach on a sunny Saturday.' },
  'science':       { type:'Kelime', tr:'bilim, fen; bilim dalı',                      ex:'She wanted to become a scientist one day.' },
  'sense':         { type:'Kelime', tr:'duygu, his; anlam; duyu; mantık',             ex:'The garden gives Mr. Ali a great sense of pride.' },
  'significant':   { type:'Kelime', tr:'önemli, anlamlı, kayda değer',               ex:'The changes were significant and long-lasting.' },
  'simple':        { type:'Kelime', tr:'basit, sade, kolay',                           ex:'He started with simple dishes like scrambled eggs.' },
  'sister':        { type:'Kelime', tr:'kız kardeş; hemşire',                          ex:'Her sister finally admitted she had left the gift.' },
  'skill':         { type:'Kelime', tr:'beceri, yetenek, ustalık',                    ex:'Managing stress is a skill worth practising.' },
  'social':        { type:'Kelime', tr:'sosyal, toplumsal; birlikte olan',             ex:'Social connectedness predicts long-term happiness.' },
  'society':       { type:'Kelime', tr:'toplum, cemiyet; dernek',                     ex:'Contemporary societies face many complex challenges.' },
  'software':      { type:'Kelime', tr:'yazılım; bilgisayar programları',             ex:'David was a dedicated software engineer.' },
  'solar':         { type:'Kelime', tr:'güneş enerjisiyle ilgili, solar',             ex:'Solar and wind costs have dropped dramatically.' },
  'solution':      { type:'Kelime', tr:'çözüm, çare; çözelti',                        ex:'Grid-scale storage is needed for renewable energy solutions.' },
  'source':        { type:'Kelime', tr:'kaynak; bilgi kaynağı; köken',               ex:'Social media is not always a reliable source.' },
  'space':         { type:'Kelime', tr:'alan, boşluk; uzay; mesafe',                  ex:'A disused car park had sat empty as a space for years.' },
  'specific':      { type:'Kelime', tr:'özgül, belirli, spesifik',                    ex:'She gave specific examples from her past work.' },
  'stage':         { type:'Kelime', tr:'sahne; aşama, evre; seviye',                  ex:'Her first night, she watched her favourite band on the main stage.' },
  'store':         { type:'Kelime', tr:'mağaza, dükkan; depolamak',                   ex:'He pushed the trolley around the store.' },
  'stress':        { type:'Kelime', tr:'stres, baskı; vurgu; vurgulamak',            ex:'Managing stress is a skill worth practising.' },
  'student':       { type:'Kelime', tr:'öğrenci',                                     ex:'Several students formed a study group for exams.' },
  'study':         { type:'Kelime', tr:'çalışmak, incelemek; araştırma; oda',        ex:'The study group met in the library every week.' },
  'success':       { type:'Kelime', tr:'başarı, muvaffakiyet',                         ex:'Career success is not the greatest predictor of happiness.' },
  'sugar':         { type:'Kelime', tr:'şeker',                                        ex:'They mixed butter, sugar, and flour together.' },
  'sunday':        { type:'Kelime', tr:'Pazar (günü)',                                 ex:'Sophie calls her grandmother every Sunday.' },
  'system':        { type:'Kelime', tr:'sistem, düzen, yöntem',                       ex:'The education system must adapt to new challenges.' },

  // ── Batch T ────────────────────────────────────────────────
  'teacher':       { type:'Kelime', tr:'öğretmen, hoca',                              ex:'The class had a new teacher after the holidays.' },
  'technology':    { type:'Kelime', tr:'teknoloji; teknik bilim',                      ex:'Technology is reshaping the global labour market.' },
  'tent':          { type:'Kelime', tr:'çadır',                                        ex:'They pitched a tent beside a stream.' },
  'tradition':     { type:'Kelime', tr:'gelenek, örf; tarihsel uygulama',             ex:'Local traditions risk becoming commercially diluted.' },
  'travel':        { type:'Kelime', tr:'seyahat etmek; seyahat',                       ex:'Travelling alone can be a great adventure.' },
  'trip':          { type:'Kelime', tr:'gezi, yolculuk; seyahat; tökezlemek',         ex:'The class went on a school trip to the museum.' },

  // ── Batch U ────────────────────────────────────────────────
  'unique':        { type:'Kelime', tr:'eşsiz, benzersiz, tek',                        ex:'Every person has a unique set of skills.' },
  'university':    { type:'Kelime', tr:'üniversite',                                   ex:'After finishing university, Tom volunteered abroad.' },
  'urban':         { type:'Kelime', tr:'kentsel, şehirle ilgili, şehirli',             ex:'Urban planning must prioritise affordable housing.' },

  // ── Batch V ────────────────────────────────────────────────
  'value':         { type:'Kelime', tr:'değer; kıymet; değer vermek',                  ex:'She valued the mentorship more than any salary.' },
  'vegetable':     { type:'Kelime', tr:'sebze',                                        ex:'Children learned where vegetables actually come from.' },
  'vital':         { type:'Kelime', tr:'hayati, çok önemli, yaşamsal',                ex:'The library remains a vital resource for the community.' },
  'voice':         { type:'Kelime', tr:'ses, sesli konuşma; söz hakkı',               ex:'She spoke in a calm, clear voice.' },

  // ── Batch W ────────────────────────────────────────────────
  'warm':          { type:'Kelime', tr:'sıcak, ılık; içten; ısıtmak',                 ex:'The new teacher had a warm smile.' },
  'weather':       { type:'Kelime', tr:'hava durumu; geçirmek (zor bir dönemi)',      ex:'She pushed through knee pain and bad weather.' },
  'weekend':       { type:'Kelime', tr:'hafta sonu',                                   ex:'She packed enough snacks for the whole weekend.' },
  'wellbeing':     { type:'Kelime', tr:'esenlik, refah, iyi olma hali',               ex:'Productivity depends on wellbeing, not just hard work.' },
  'window':        { type:'Kelime', tr:'pencere',                                      ex:'She sat at her favourite table near the window.' },
  'wonderful':     { type:'Kelime', tr:'muhteşem, harika, şaşırtıcı',                ex:'When the cookies were ready, the house smelled wonderful.' },
  'wood':          { type:'Kelime', tr:'ahşap, kereste; orman',                        ex:'He bought the wood and tools he needed.' },
  'worker':        { type:'Kelime', tr:'işçi, çalışan, emekçi',                       ex:'Workers need support during periods of disruption.' },

  // ── Batch Y-Z ────────────────────────────────────────────────
  'yesterday':     { type:'Kelime', tr:'dün',                                          ex:'I finished the book yesterday evening.' },
  'youngest':      { type:'Kelime', tr:'en küçük (yaş olarak)',                        ex:'Dad built a sandcastle with the youngest child.' },
  'zone':          { type:'Kelime', tr:'bölge, alan; konfor alanı; ayırmak',          ex:'Stepping out of your comfort zone can be very rewarding.' },

  // ── Extra coverage ────────────────────────────────────────────
  'able':          { type:'Kelime', tr:'yapabilir, muktedir, yetenekli',               ex:'She was able to finish the project on time.' },
  'actually':      { type:'Kelime', tr:'aslında, gerçekte, esasında',                  ex:'Children learned where vegetables actually come from.' },
  'animal':        { type:'Kelime', tr:'hayvan; insana özgü olmayan',                  ex:'Humans are storytelling animals at their core.' },
  'answer':        { type:'Kelime', tr:'cevap, yanıt; cevaplamak',                    ex:'The mentor did not give her all the answers.' },
  'area':          { type:'Kelime', tr:'alan, bölge; konu, mesele',                   ex:'AI now influences decisions in many areas.' },
  'arrive':        { type:'Kelime', tr:'varmak, ulaşmak, gelmek',                     ex:'She always arrives at work on time.' },
  'art':           { type:'Kelime', tr:'sanat; el becerisi; sanat eseri',              ex:'She had always been passionate about art.' },
  'assumption':    { type:'Kelime', tr:'varsayım, ön kabul',                           ex:'Research challenged the long-held assumption.' },
  'atmosphere':    { type:'Kelime', tr:'atmosfer; ortam, hava, ambiyans',              ex:'The atmosphere on race day was electric.' },
  'attention':     { type:'Kelime', tr:'dikkat, ilgi, özen',                           ex:'The attention economy commodifies human attention.' },
  'balanced':      { type:'Kelime', tr:'dengeli, orantılı',                            ex:'A balanced diet and regular exercise are important.' },
  'beautiful':     { type:'Kelime', tr:'güzel, hoş, etkileyici',                       ex:'She said his painting was beautiful.' },
  'benefit':       { type:'Kelime', tr:'fayda, yarar; kazanım; fayda sağlamak',       ex:'The benefits of good sleep are well documented.' },
  'best':          { type:'Kelime', tr:'en iyi; en iyi şekilde',                       ex:'It was the best day of Leo\'s life.' },
  'books':         { type:'Kelime', tr:'kitaplar (kitap çoğulu)',                      ex:'The librarian helps her find the best books.' },
  'born':          { type:'Kelime', tr:'doğmuş, doğuştan gelen',                      ex:'He was born with a passion for music.' },
  'brain':         { type:'Kelime', tr:'beyin; zekâ',                                  ex:'The brain processes stories more easily than raw data.' },
  'built':         { type:'Kelime', tr:'inşa edilmiş; yaptı (geçmiş)',                ex:'Dad built a sandcastle with the youngest child.' },
  'business':      { type:'Kelime', tr:'iş, ticaret; işletme',                         ex:'She decided to open her own small business.' },
  'calm':          { type:'Kelime', tr:'sakin, huzurlu; sakinleştirmek',               ex:'The library makes her feel calm and inspired.' },
  'carefully':     { type:'Kelime', tr:'dikkatlice, özenle',                           ex:'Ali listens carefully and learns many things.' },
  'century':       { type:'Kelime', tr:'yüzyıl, asır',                                 ex:'Clean energy is the great challenge of the century.' },
  'certain':       { type:'Kelime', tr:'belirli, belli; kesin, emin',                  ex:'Language influences certain cognitive patterns.' },
  'citizen':       { type:'Kelime', tr:'vatandaş, yurttaş',                            ex:'Digital literacy is key for an informed citizenry.' },
  'clearly':       { type:'Kelime', tr:'açıkça, net biçimde',                          ex:'She spoke clearly and gave specific examples.' },
  'colleague':     { type:'Kelime', tr:'meslektaş, iş arkadaşı',                      ex:'Her manager assigned her an experienced colleague as mentor.' },
  'collect':       { type:'Kelime', tr:'toplamak, derlemek; tahsil etmek',            ex:'They collected shells along the shore.' },
  'college':       { type:'Kelime', tr:'yüksekokul; kolej',                            ex:'Clara takes the bus to college every morning.' },
  'common':        { type:'Kelime', tr:'yaygın, ortak, sıradan',                       ex:'She practised answering common interview questions.' },
  'concept':       { type:'Kelime', tr:'kavram, fikir, anlayış',                       ex:'The concept of the fifteen-minute city is gaining traction.' },
  'conditions':    { type:'Kelime', tr:'koşullar, şartlar; durum',                    ex:'The conditions at the rural school were very basic.' },
  'consequence':   { type:'Kelime', tr:'sonuç, netice; önem',                          ex:'The consequences of overconsumption are becoming apparent.' },
  'contemporary':  { type:'Kelime', tr:'çağdaş, modern, günümüze ait',               ex:'Contemporary societies face many complex challenges.' },
  'continue':      { type:'Kelime', tr:'devam etmek, sürdürmek',                      ex:'Society continues to celebrate productivity over sleep.' },
  'cook':          { type:'Kelime', tr:'yemek pişirmek; aşçı',                         ex:'He decided to cook something new every week.' },
  'cool':          { type:'Kelime', tr:'serin; havalı, şık; soğutmak',                ex:'His friends think his bicycle is very cool.' },
  'country':       { type:'Kelime', tr:'ülke; kır, taşra',                             ex:'They drove across the country for two weeks.' },
  'creative':      { type:'Kelime', tr:'yaratıcı, üretken, orijinal',                  ex:'Creative employees generate more innovative outcomes.' },
  'criminal':      { type:'Kelime', tr:'suçlu; suç niteliğinde',                       ex:'Algorithms now influence criminal sentencing.' },
  'crucially':     { type:'Kelime', tr:'en önemlisi, kritik biçimde',                  ex:'Crucially, well-being is not about wealth alone.' },
  'culture':       { type:'Kelime', tr:'kültür; uygarlık',                             ex:'Globalisation affects local culture and identity.' },
  'daily':         { type:'Kelime', tr:'günlük, her gün',                              ex:'A daily walk improves mood and energy.' },
  'days':          { type:'Kelime', tr:'günler; dönem',                                ex:'Some days she felt strong; other days she struggled.' },
  'decade':        { type:'Kelime', tr:'on yıl, dekat',                                ex:'Costs have fallen over the past decade.' },
  'dedicated':     { type:'Kelime', tr:'adanmış, özverili; ayrılmış',                 ex:'David was a dedicated software engineer.' },
  'develop':       { type:'Kelime', tr:'geliştirmek, büyümek, oluşturmak',            ex:'They developed new frameworks for mental health.' },
  'device':        { type:'Kelime', tr:'cihaz, araç, gereç',                           ex:'Screen time on digital devices affects sleep quality.' },
  'digital':       { type:'Kelime', tr:'dijital, sayısal',                             ex:'Digital literacy is a civic competency today.' },
  'discover':      { type:'Kelime', tr:'keşfetmek, bulmak, öğrenmek',                ex:'He discovered a fantastic market every Sunday.' },
  'discuss':       { type:'Kelime', tr:'tartışmak, görüşmek, ele almak',              ex:'They began discussing everything from food to politics.' },
  'distinct':      { type:'Kelime', tr:'belirgin, ayrı, farklı',                       ex:'Psychologists documented a distinct emotional response.' },
  'diverse':       { type:'Kelime', tr:'çeşitli, farklı türden',                       ex:'A diverse workforce brings new ideas.' },
  'doctor':        { type:'Kelime', tr:'doktor, hekim; akademik doktor',              ex:'His doctor warned him that his lifestyle was unsustainable.' },
  'done':          { type:'Kelime', tr:'tamamlanmış, bitmiş; yapılmış',               ex:'She felt proud that she had done the shopping alone.' },
  'dramatically':  { type:'Kelime', tr:'dramatik biçimde, çarpıcı şekilde',           ex:'Solar energy costs have dropped dramatically.' },
  'drive':         { type:'Kelime', tr:'araba kullanmak; güdülemek; dürtü',           ex:'What drives you to keep working so hard?' },
  'earn':          { type:'Kelime', tr:'kazanmak, hak etmek',                          ex:'She earned enough to start her own business.' },
  'effective':     { type:'Kelime', tr:'etkili, verimli, işe yarayan',                ex:'Lateral reading is a more effective fact-checking strategy.' },
  'efficient':     { type:'Kelime', tr:'verimli, etkin, işlevsel',                     ex:'The new system is far more efficient than the old one.' },
  'eighth':        { type:'Kelime', tr:'sekizinci',                                    ex:'It was Lila\'s eighth birthday.' },
  'electric':      { type:'Kelime', tr:'elektrikli; heyecanlı, çarpıcı',              ex:'The atmosphere on race day was electric.' },
  'element':       { type:'Kelime', tr:'unsur, bileşen; element (kimya)',             ex:'Amabile\'s model identifies three critical elements.' },
  'embrace':       { type:'Kelime', tr:'kucaklamak; benimsemek',                      ex:'Societies should embrace the benefits of interconnectedness.' },
  'emerge':        { type:'Kelime', tr:'ortaya çıkmak, belirmek',                     ex:'Social connectedness emerges as the strongest predictor.' },
  'emission':      { type:'Kelime', tr:'emisyon, salım; yayım',                        ex:'The fashion industry produces significant carbon emissions.' },
  'employ':        { type:'Kelime', tr:'istihdam etmek; kullanmak',                   ex:'Platform designers employ clever design techniques.' },
  'encode':        { type:'Kelime', tr:'kodlamak, şifrelemek',                         ex:'Habits are encoded in the basal ganglia.' },
  'encounter':     { type:'Kelime', tr:'karşılaşmak; rastlaşma, buluşma',             ex:'People rely on the first information they encounter.' },
  'enrol':         { type:'Kelime', tr:'kayıt yaptırmak, kaydolmak',                  ex:'He enrolled in a night school accounting course.' },
  'environment':   { type:'Kelime', tr:'çevre, ortam, habitat',                        ex:'Positive changes in the environment affect gene expression.' },
  'equal':         { type:'Kelime', tr:'eşit, denk; eşit olmak',                      ex:'Equal access to education is a fundamental right.' },
  'escape':        { type:'Kelime', tr:'kaçmak, kurtulmak; kaçış',                    ex:'Rational people agree to escape the state of nature.' },
  'evidence':      { type:'Kelime', tr:'kanıt, delil',                                 ex:'There is strong evidence that sleep affects health.' },
  'exact':         { type:'Kelime', tr:'tam, kesin, doğru; tam olarak',               ex:'She found the exact information she needed.' },
  'exam':          { type:'Kelime', tr:'sınav, muayene',                               ex:'All four students passed their exams.' },
  'example':       { type:'Kelime', tr:'örnek; misal',                                 ex:'She gave specific examples from her past work.' },
  'exercise':      { type:'Kelime', tr:'egzersiz; alıştırma; uygulamak',             ex:'He started exercising thirty minutes earlier every day.' },
  'exhibition':    { type:'Kelime', tr:'sergi, fuar; gösterim',                        ex:'Her photo was selected for an exhibition.' },
  'exist':         { type:'Kelime', tr:'var olmak, mevcut olmak',                      ex:'Kindness exists everywhere in the world.' },
  'expect':        { type:'Kelime', tr:'beklemek, ummak; tahmin etmek',               ex:'She didn\'t expect to win, but she entered anyway.' },
  'exploit':       { type:'Kelime', tr:'sömürmek; yararlanmak',                        ex:'Politicians exploit compelling narratives to shape attitudes.' },
  'expression':    { type:'Kelime', tr:'ifade; deyim; gen ifadesi',                   ex:'Epigenetics studies changes in gene expression.' },
  'extreme':       { type:'Kelime', tr:'aşırı, uç; son derece',                        ex:'The qubits must be maintained at extremely low temperatures.' },
  'fabric':        { type:'Kelime', tr:'kumaş; yapı, doku',                            ex:'Stories are woven into the fabric of every culture.' },
  'fair':          { type:'Kelime', tr:'adil, hakkaniyetli; fuar; oldukça',           ex:'Products made under fair labour conditions.' },
  'fantastic':     { type:'Kelime', tr:'harika, muhteşem; fantastik',                  ex:'He discovered a fantastic market every Sunday.' },
  'fate':          { type:'Kelime', tr:'kader, yazgı; akıbet',                         ex:'Our genetic fate is not fixed at birth.' },
  'father':        { type:'Kelime', tr:'baba, peder',                                  ex:'His father taught him how to ride the bicycle.' },
  'field':         { type:'Kelime', tr:'alan, saha; tarla; uğraş alanı',             ex:'Positive psychology shifted the field\'s focus.' },
  'film':          { type:'Kelime', tr:'film; ince tabaka',                            ex:'They watched a short film inside the dome.' },
  'firm':          { type:'Kelime', tr:'şirket; sağlam, katı; sıkıca',               ex:'He now works as a bookkeeper for a local firm.' },
  'flat':          { type:'Kelime', tr:'daire, apartman; düz, yassı',                 ex:'She moved into a small flat with her children.' },
  'floor':         { type:'Kelime', tr:'zemin, yer; kat (bina)',                       ex:'The children sat quietly on the floor.' },
  'forgot':        { type:'Kelime', tr:'unuttu (forget geçmişi)',                      ex:'He almost forgot the eggs at the supermarket.' },
  'form':          { type:'Kelime', tr:'biçim, şekil; oluşturmak; form',              ex:'They decided to form a study group.' },
  'fossil':        { type:'Kelime', tr:'fosil; taşıllaşmış canlı kalıntısı',          ex:'Mia\'s favourite part was the room with fossils.' },
  'fragmented':    { type:'Kelime', tr:'parçalanmış, bölünmüş',                       ex:'Social media creates a fragmented public sphere.' },
  'friday':        { type:'Kelime', tr:'Cuma (günü)',                                  ex:'The book club met on the first Friday of every month.' },
  'friendship':    { type:'Kelime', tr:'arkadaşlık, dostluk',                          ex:'Their friendship makes both of them happy.' },
  'full':          { type:'Kelime', tr:'dolu, tam; oldukça',                           ex:'The crowd was full of energy.' },
  'gain':          { type:'Kelime', tr:'kazanmak, elde etmek; artış, kazanç',        ex:'Loss aversion means we fear losses more than equivalent gains.' },
  'game':          { type:'Kelime', tr:'oyun; maç',                                    ex:'They played a simple word game over the phone.' },
  'generally':     { type:'Kelime', tr:'genellikle, genel olarak',                    ex:'Physical exercise is generally good for mental health.' },
  'genuine':       { type:'Kelime', tr:'gerçek, hakiki, samimi',                       ex:'She had a genuine passion for helping others.' },
  'girl':          { type:'Kelime', tr:'kız, kız çocuğu',                              ex:'A girl named Priya sat next to him at lunch.' },
  'glass':         { type:'Kelime', tr:'cam; bardak',                                  ex:'She raised her glass and toasted to new beginnings.' },
  'golden':        { type:'Kelime', tr:'altın renkli; altın gibi değerli',             ex:'The dog was named Biscuit because of his golden colour.' },
  'goods':         { type:'Kelime', tr:'mallar, eşya; ticari ürünler',                ex:'Globalisation facilitated an unprecedented exchange of goods.' },
  'grace':         { type:'Kelime', tr:'zarafet, incelik; lütuf; zarif',              ex:'Stoicism helps individuals navigate adversity with grace.' },
  'gradually':     { type:'Kelime', tr:'yavaş yavaş, giderek, adım adım',            ex:'Gradually, he started making friends in the new city.' },
  'grant':         { type:'Kelime', tr:'hibe, burs; kabul etmek, vermek',            ex:'They received a small grant from the local council.' },
  'greatest':      { type:'Kelime', tr:'en büyük, en önemli',                         ex:'Close relationships are the greatest predictor of happiness.' },
  'ground':        { type:'Kelime', tr:'zemin, toprak; temel; gerekçe',              ex:'They established ground rules for the study group.' },
  'growing':       { type:'Kelime', tr:'büyüyen, gelişen; artan',                     ex:'The online platform has a growing audience.' },
  'habits':        { type:'Kelime', tr:'alışkanlıklar',                               ex:'Good habits make life easier and more productive.' },
  'half':          { type:'Kelime', tr:'yarı, yarım; ara (futbolda)',                  ex:'In the first half, the score was zero to zero.' },
  'handed':        { type:'Kelime', tr:'verdi; teslim etti',                           ex:'He handed in his resignation and never looked back.' },
  'handmade':      { type:'Kelime', tr:'el yapımı, elle yapılmış',                    ex:'She sold handmade jewellery online.' },
  'harmful':       { type:'Kelime', tr:'zararlı, kötü etkili',                         ex:'Nudge policy helps replace harmful habits.' },
  'headache':      { type:'Kelime', tr:'baş ağrısı; sorun, baş belası',              ex:'She woke up with a sore throat and a headache.' },
  'healthy':       { type:'Kelime', tr:'sağlıklı, sağlığa uygun',                     ex:'He began cooking simple, healthy meals at home.' },
  'heavily':       { type:'Kelime', tr:'yoğun şekilde; ağır biçimde',                ex:'It was raining heavily outside.' },
  'helpful':       { type:'Kelime', tr:'yardımcı, faydalı',                            ex:'The librarians are always helpful to visitors.' },
  'hidden':        { type:'Kelime', tr:'gizli, saklı, görünmeyen',                    ex:'The owner told them about a hidden waterfall nearby.' },
  'highlight':     { type:'Kelime', tr:'vurgulamak, ön plana çıkarmak; öne çıkan',  ex:'Critics highlight the risk of bias in automated systems.' },
  'hire':          { type:'Kelime', tr:'işe almak, kiralamak',                         ex:'She had to manage finances and hire staff.' },
  'hit':           { type:'Kelime', tr:'vurmak, çarpmak; isabet etmek; hit',         ex:'At mile twenty, Aisha hit what runners call the wall.' },
  'holiday':       { type:'Kelime', tr:'tatil; resmi tatil; bayram',                  ex:'She says camping is her favourite holiday.' },
  'homemade':      { type:'Kelime', tr:'ev yapımı, evde yapılmış',                   ex:'Ali brought him a homemade cake.' },
  'honey':         { type:'Kelime', tr:'bal; tatlım (hitap)',                          ex:'Mum made tea with honey and lemon.' },
  'hotel':         { type:'Kelime', tr:'otel',                                         ex:'They chose camping instead of staying in a hotel.' },
  'hours':         { type:'Kelime', tr:'saatler; mesai saatleri',                     ex:'He worked long hours every day.' },
  'household':     { type:'Kelime', tr:'hane, ev; ev halkı',                          ex:'Each household received a plot in the community garden.' },
  'huge':          { type:'Kelime', tr:'dev, çok büyük, muazzam',                     ex:'Science has made huge advances in medicine.' },
  'hurt':          { type:'Kelime', tr:'incitmek, yaralamak; acı vermek',             ex:'She didn\'t want to hurt his feelings.' },
  'ideas':         { type:'Kelime', tr:'fikirler, düşünceler',                         ex:'A diverse team brings many different ideas.' },
  'importance':    { type:'Kelime', tr:'önem, değer',                                  ex:'She understood the importance of good nutrition.' },
  'impossible':    { type:'Kelime', tr:'imkânsız, olanaksız',                          ex:'The evidence is increasingly impossible to ignore.' },
  'income':        { type:'Kelime', tr:'gelir, kazanç',                                ex:'Well-being doesn\'t depend only on income level.' },
  'increasingly':  { type:'Kelime', tr:'giderek, gittikçe daha fazla',                ex:'Renewable energy is increasingly competitive.' },
  'independent':   { type:'Kelime', tr:'bağımsız, özgür; ayrı',                       ex:'Consult independent sources when checking facts.' },
  'individual':    { type:'Kelime', tr:'birey, kişi; bireysel, tek',                  ex:'Each individual has a unique set of experiences.' },
  'influence':     { type:'Kelime', tr:'etki, nüfuz; etkilemek',                      ex:'Language influences certain cognitive patterns.' },
  'initial':       { type:'Kelime', tr:'başlangıçtaki, ilk; baş harf',               ex:'His initial attempts to bake bread were not great.' },
  'initiative':    { type:'Kelime', tr:'girişim, inisiyatif; ilk adım',               ex:'The community garden initiative transformed the car park.' },
  'innovation':    { type:'Kelime', tr:'yenilik, inovasyon; yeniliğe açıklık',       ex:'Balancing progress with responsibility fosters innovation.' },
  'inspire':       { type:'Kelime', tr:'ilham vermek, esinlendirmek',                  ex:'The gallery experience left her feeling inspired.' },
  'intense':       { type:'Kelime', tr:'yoğun, şiddetli, derin',                       ex:'Sleep is a period of intense biological activity.' },
  'internal':      { type:'Kelime', tr:'iç, dahili, içsel',                            ex:'Internal satisfaction drives real creativity.' },
  'invention':     { type:'Kelime', tr:'icat, buluş; icat etme',                      ex:'Before the invention of writing, stories were oral.' },
  'invisible':     { type:'Kelime', tr:'görünmez, gözle görülemeyen',                 ex:'Microplastics are an invisible threat to health.' },
  'involve':       { type:'Kelime', tr:'içermek, dahil etmek; gerektirmek',          ex:'The process does not involve changes to DNA.' },
  'isolation':     { type:'Kelime', tr:'izolasyon, yalnızlık, tecrit',                ex:'He made paintings during a long period of isolation.' },
  'item':          { type:'Kelime', tr:'madde, kalem, nesne; öğe',                    ex:'He checked off each item on the shopping list.' },
  'itself':        { type:'Kelime', tr:'kendisi, bizzat kendinse',                    ex:'Creativity itself is a structured process.' },
  'jacket':        { type:'Kelime', tr:'ceket, mont',                                  ex:'She put on her jacket before leaving the house.' },
  'journalism':    { type:'Kelime', tr:'gazetecilik; habercililik',                    ex:'Students struggled to distinguish sponsored content from journalism.' },
  'jump':          { type:'Kelime', tr:'zıplamak, atlamak; sıçramak',                ex:'She jumped at the chance to enter the competition.' },
  'justice':       { type:'Kelime', tr:'adalet, hakkaniyet',                           ex:'The social contract addresses questions of justice.' },
  'kick':          { type:'Kelime', tr:'tekmelemek, vurmak (ayakla)',                  ex:'They kick the leaves on the ground and listen to them crunch.' },
  'lemon':         { type:'Kelime', tr:'limon',                                        ex:'Her mum made tea with honey and lemon.' },
  'lesson':        { type:'Kelime', tr:'ders; öğrenilen şey',                         ex:'Instead of starting with a lesson, she asked each student to share.' },
  'level':         { type:'Kelime', tr:'seviye, düzey; katlı, düz',                  ex:'Students at all levels struggled with digital literacy.' },
  'liberty':       { type:'Kelime', tr:'özgürlük, hürriyet',                           ex:'Locke emphasised life, liberty, and property.' },
  'librarian':     { type:'Kelime', tr:'kütüphaneci',                                  ex:'The librarian helps her find the best books.' },
  'lifelong':      { type:'Kelime', tr:'ömür boyu, yaşam boyu',                       ex:'Governments must invest in lifelong learning.' },
  'limited':       { type:'Kelime', tr:'sınırlı, kısıtlı',                             ex:'The school had limited supplies and no electricity.' },
  'list':          { type:'Kelime', tr:'liste; listelemek',                             ex:'His mum sent him with a list of things to buy.' },
  'lively':        { type:'Kelime', tr:'canlı, neşeli, hareketli',                    ex:'The discussions were always lively.' },
  'locally':       { type:'Kelime', tr:'yerel olarak, bulunduğu yerde',               ex:'The café offered locally sourced ingredients.' },
  'lonely':        { type:'Kelime', tr:'yalnız, ıssız; yal nızlık çeken',             ex:'At first, he felt quite lonely in the new city.' },
  'longitudinal':  { type:'Kelime', tr:'boylamsal, uzun süreli (araştırma)',          ex:'Longitudinal studies confirm the role of relationships in happiness.' },
  'machine':       { type:'Kelime', tr:'makine, cihaz; otomasyon',                    ex:'These are qualities that machines cannot yet replicate.' },
  'main':          { type:'Kelime', tr:'ana, asıl, birincil; büyük boru',            ex:'She watched her favourite band on the main stage.' },
  'maintain':      { type:'Kelime', tr:'sürdürmek, devam ettirmek; bakımını yapmak', ex:'Qubits must be maintained at extremely low temperatures.' },
  'managing':      { type:'Kelime', tr:'yönetme; idare etme',                         ex:'Managing stress is a skill worth practising.' },
  'manufacturing': { type:'Kelime', tr:'imalat, üretim; sanayi üretimi',              ex:'Automation is transforming manufacturing jobs.' },
  'marine':        { type:'Kelime', tr:'denize ait, denizsel; deniz askeri',          ex:'Marine organisms ingest microplastic particles.' },
  'mass':          { type:'Kelime', tr:'kitle; kütle; toplu',                          ex:'Mass production created surplus goods after the war.' },
  'meal':          { type:'Kelime', tr:'yemek, öğün',                                  ex:'He often skipped meals and rarely exercised.' },
  'means':         { type:'Kelime', tr:'yöntem, araç; anlamına gelmek',              ex:'Stoicism emphasises self-control as a means of overcoming emotion.' },
  'mechanic':      { type:'Kelime', tr:'mekanikçi, tamirci',                           ex:'He worked as a mechanic for twenty years.' },
  'mechanism':     { type:'Kelime', tr:'mekanizma; çalışma yöntemi',                  ex:'Understanding the habit mechanism enables change.' },
  'medicine':      { type:'Kelime', tr:'ilaç; tıp, tıp bilimi',                       ex:'Biotechnology is advancing medicine rapidly.' },
  'mere':          { type:'Kelime', tr:'sadece, yalnızca; basit, önemsiz',            ex:'Sleep is not a mere absence of wakefulness.' },
  'method':        { type:'Kelime', tr:'yöntem, metot; usul',                          ex:'He had to adapt his teaching methods.' },
  'microscopic':   { type:'Kelime', tr:'mikroskobik, çok küçük',                      ex:'Microscopic synthetic polymers have infiltrated ecosystems.' },
  'mile':          { type:'Kelime', tr:'mil (1.6 km); uzak mesafe',                   ex:'At mile twenty, she hit what runners call the wall.' },
  'milk':          { type:'Kelime', tr:'süt',                                           ex:'She eats cereal with milk for breakfast.' },
  'mixing':        { type:'Kelime', tr:'karıştırma',                                   ex:'Mixing blue and yellow makes green.' },
  'mixture':       { type:'Kelime', tr:'karışım, harman',                              ex:'Zoe stirred the mixture slowly.' },
  'moderate':      { type:'Kelime', tr:'ılımlı, orta; ılımlandırmak',                ex:'Well-being levels off beyond a moderate income.' },
  'moment':        { type:'Kelime', tr:'an, lahza; önem',                              ex:'He remembered at the last moment.' },
  'monday':        { type:'Kelime', tr:'Pazartesi (günü)',                             ex:'On Monday, Class 4B went to the science museum.' },
  'mother':        { type:'Kelime', tr:'anne, ana',                                    ex:'His mother always supported his dreams.' },
  'multinational': { type:'Kelime', tr:'çok uluslu, multinasyonel',                   ex:'Multinational corporations homogenise consumer behaviour.' },
  'museum':        { type:'Kelime', tr:'müze',                                          ex:'Class 4B went to the science museum.' },
  'named':         { type:'Kelime', tr:'adlı, adlandırılmış; isimlendirildi',         ex:'They named the dog Biscuit.' },
  'national':      { type:'Kelime', tr:'ulusal, milli',                                ex:'Her mentor encouraged her to enter a national competition.' },
  'nearby':        { type:'Kelime', tr:'yakında, civarda, yakın mesafede',            ex:'The owner told them about a hidden waterfall nearby.' },
  'neighbour':     { type:'Kelime', tr:'komşu',                                        ex:'She asked her neighbours, but nobody knew.' },
  'nevertheless':  { type:'Kelime', tr:'yine de, buna rağmen, bununla birlikte',      ex:'Nevertheless, renewable energy has challenges.' },
  'newsfeed':      { type:'Kelime', tr:'haber akışı (sosyal medya)',                   ex:'Algorithmically curated newsfeeds create epistemic bubbles.' },
  'nobody':        { type:'Kelime', tr:'hiç kimse, kimse',                             ex:'When James moved to the city, he knew nobody.' },
  'norm':          { type:'Kelime', tr:'norm, kural; standart, ölçüt',               ex:'Stories help establish moral norms in a community.' },
  'note':          { type:'Kelime', tr:'not; dikkat etmek; nota',                     ex:'There was a small note in the package.' },
  'nudge':         { type:'Kelime', tr:'dürtmek; yönlendirme (politika)',             ex:'Governments use nudge policy to guide citizens.' },
  'nurture':       { type:'Kelime', tr:'beslemek, yetiştirmek; yapıp-etme (doğa karşısında)', ex:'Epigenetics studies the interaction between nature and nurture.' },
  'nutrition':     { type:'Kelime', tr:'beslenme, gıda bilimi',                        ex:'Improved nutrition can reverse some epigenetic changes.' },
  'operate':       { type:'Kelime', tr:'çalışmak; işletmek; ameliyat yapmak',        ex:'The basal ganglia operates beneath conscious awareness.' },
  'orange':        { type:'Kelime', tr:'turuncu; portakal',                            ex:'The leaves turn red, orange, and yellow in autumn.' },
  'owner':         { type:'Kelime', tr:'sahip, mal sahibi',                            ex:'The owner invited them to stay for dinner.' },
  'pack':          { type:'Kelime', tr:'paketlemek; bavul yapmak; çanta',            ex:'She packed a tent and a sleeping bag.' },
  'pain':          { type:'Kelime', tr:'ağrı, acı; üzüntü',                           ex:'She pushed through knee pain and bad weather.' },
  'passengers':    { type:'Kelime', tr:'yolcular, seyahat edenler',                   ex:'The other passengers also moved to help.' },
  'passion':       { type:'Kelime', tr:'tutku, ihtiras',                               ex:'He had always had a passion for woodworking.' },
  'past':          { type:'Kelime', tr:'geçmiş; geçen, eski; -dan geçerek',          ex:'Cultural memory connects the present to the past.' },
  'permanent':     { type:'Kelime', tr:'kalıcı, sürekli, daimi',                      ex:'No change is permanent; habits can be overwritten.' },
  'personal':      { type:'Kelime', tr:'kişisel, bireysel, özel',                     ex:'She went through major personal changes.' },
  'photo':         { type:'Kelime', tr:'fotoğraf',                                     ex:'One photo of a silver necklace went viral.' },
  'pick':          { type:'Kelime', tr:'almak, toplamak; seçmek',                     ex:'He came to pick up the dog and thanked her.' },
  'pieces':        { type:'Kelime', tr:'parçalar, bölümler',                           ex:'He measured each piece of wood carefully.' },
  'pioneer':       { type:'Kelime', tr:'öncü, öne çıkan; öncülük etmek',             ex:'Seligman pioneered positive psychology.' },
  'planet':        { type:'Kelime', tr:'gezegen',                                      ex:'The guide showed them how planets move around the sun.' },
  'plant':         { type:'Kelime', tr:'bitki; fabrika; dikmek',                       ex:'They plant flowers and water the vegetables together.' },
  'platform':      { type:'Kelime', tr:'platform, mecra; peron',                       ex:'She opened accounts on several online platforms.' },
  'pleased':       { type:'Kelime', tr:'memnun, hoşnut, mutlu',                       ex:'Mr. Hassan was very pleased with the homemade cake.' },
  'policy':        { type:'Kelime', tr:'politika, strateji; yönetim ilkesi',          ex:'Nudge policy guides citizens towards beneficial choices.' },
  'politician':    { type:'Kelime', tr:'politikacı, siyasetçi',                       ex:'Politicians exploit compelling narratives to shape opinion.' },
  'population':    { type:'Kelime', tr:'nüfus; popülasyon',                            ex:'As the urban population grows, cities must plan ahead.' },
  'pose':          { type:'Kelime', tr:'oluşturmak (tehlike); poz vermek',            ex:'Decommissioning carbon infrastructure poses challenges.' },
  'possible':      { type:'Kelime', tr:'mümkün, olanaklı, olabilir',                  ex:'Technology makes calculations possible that were not before.' },
  'powerful':      { type:'Kelime', tr:'güçlü, kuvvetli, etkili',                     ex:'Narrative is one of the most powerful tools in communication.' },
  'practice':      { type:'Kelime', tr:'pratik, uygulama; alıştırma; pratik yapmak', ex:'She started practising mindfulness every morning.' },
  'presence':      { type:'Kelime', tr:'varlık, bulunuş; hazır oluş',                ex:'The ubiquitous presence of microplastics is alarming.' },
  'present':       { type:'Kelime', tr:'mevcut, şimdiki; hediye; sunmak',            ex:'Cultural memory connects the present to the past.' },
  'primarily':     { type:'Kelime', tr:'öncelikle, esas olarak, başta',              ex:'Well-being is not primarily a function of wealth.' },
  'principle':     { type:'Kelime', tr:'ilke, prensip; temel kural',                 ex:'Quantum computers exploit the principle of superposition.' },
  'prior':         { type:'Kelime', tr:'önceki, daha önceki; önce',                  ex:'Every event is the result of prior causes.' },
  'problem':       { type:'Kelime', tr:'sorun, problem; mesele',                      ex:'Partisan media has exacerbated the information problem.' },
  'productivity':  { type:'Kelime', tr:'üretkenlik, verimlilik',                      ex:'Productivity depends on wellbeing, not just hard work.' },
  'professional':  { type:'Kelime', tr:'profesyonel, mesleki; uzman',                ex:'She started her first professional job with uncertainty.' },
  'progress':      { type:'Kelime', tr:'ilerleme, gelişme; ilerlemek',               ex:'Balancing progress with moral responsibility is crucial.' },
  'promising':     { type:'Kelime', tr:'umut vadeden, gelecek vaat eden',             ex:'Hydrogen fuel cells are particularly promising.' },
  'protein':       { type:'Kelime', tr:'protein',                                     ex:'Sleep flushes out proteins associated with brain disease.' },
  'prove':         { type:'Kelime', tr:'kanıtlamak, ispat etmek; çıkmak',           ex:'She proved something to herself on race day.' },
  'psychological': { type:'Kelime', tr:'psikolojik, ruhsal, zihinsel',               ex:'Cognitive dissonance causes psychological discomfort.' },
  'psychologist':  { type:'Kelime', tr:'psikolog, ruh bilimci',                       ex:'Psychologists have begun documenting climate grief.' },
  'pull':          { type:'Kelime', tr:'çekmek; çekim; çekiş',                       ex:'He pulls out the weeds by hand.' },
  'punishment':    { type:'Kelime', tr:'ceza; cezalandırma',                          ex:'The debate has implications for approaches to punishment.' },
  'race':          { type:'Kelime', tr:'yarış, koşu; ırk',                            ex:'On race day, the atmosphere was electric.' },
  'raise':         { type:'Kelime', tr:'yükseltmek, artırmak; büyütmek; toplamak',  ex:'They raised money through a crowdfunding campaign.' },
  'rarely':        { type:'Kelime', tr:'nadiren, seyrek olarak',                      ex:'He rarely exercised and often skipped meals.' },
  'recently':      { type:'Kelime', tr:'yakın zamanda, son olarak',                   ex:'The recent acceleration in biotechnology is remarkable.' },
  'recognise':     { type:'Kelime', tr:'tanımak; fark etmek; kabul etmek',          ex:'Sleep deprivation impairs more than most people recognise.' },
  'record':        { type:'Kelime', tr:'kayıt; rekor; kaydetmek',                    ex:'Cultural memory records and transmits the past.' },
  'recover':       { type:'Kelime', tr:'iyileşmek; geri kazanmak',                   ex:'It took her months to recover from the setback.' },
  'redefine':      { type:'Kelime', tr:'yeniden tanımlamak',                          ex:'Compatibilists redefine freedom as absence of coercion.' },
  'reflect':       { type:'Kelime', tr:'yansıtmak; düşünmek, tefekküre dalmak',     ex:'She took a moment to reflect on what had happened.' },
  'regard':        { type:'Kelime', tr:'saygı; dikkate almak; göz önünde tutmak',   ex:'Sleep was long regarded as a passive state.' },
  'regulate':      { type:'Kelime', tr:'düzenlemek, denetlemek; ayarlamak',          ex:'REM sleep helps regulate emotions.' },
  'reject':        { type:'Kelime', tr:'reddetmek, kabul etmemek',                   ex:'She was afraid her work would be rejected.' },
  'remote':        { type:'Kelime', tr:'uzak; uzaktan (erişim); ücra',               ex:'He found a café where he could work remotely.' },
  'renewable':     { type:'Kelime', tr:'yenilenebilir; tekrar kullanılabilir',        ex:'Renewable energy generation needs better storage.' },
  'rent':          { type:'Kelime', tr:'kira; kiralamak',                             ex:'He rented a small apartment in the city.' },
  'repeat':        { type:'Kelime', tr:'tekrarlamak, yinelemek',                     ex:'When a behaviour is repeated, neural pathways strengthen.' },
  'replace':       { type:'Kelime', tr:'değiştirmek; yerine koymak',                 ex:'Nudge policy helps replace harmful habits.' },
  'represent':     { type:'Kelime', tr:'temsil etmek; göstermek',                    ex:'The energy transition represents a major challenge.' },
  'require':       { type:'Kelime', tr:'gerektirmek, ihtiyaç duymak',                ex:'The project requires coordinated international cooperation.' },
  'resist':        { type:'Kelime', tr:'direnmek, karşı koymak',                     ex:'Critical thinking helps individuals resist manipulation.' },
  'result':        { type:'Kelime', tr:'sonuç, netice; olmak (sonuç olarak)',        ex:'All four students passed with stronger results.' },
  'reveal':        { type:'Kelime', tr:'ortaya çıkarmak, açıklamak, göstermek',     ex:'Research reveals that creativity is a structured process.' },
  'revenue':       { type:'Kelime', tr:'gelir, hasılat (ticari)',                    ex:'Longer engagement generates more advertising revenue.' },
  'ride':          { type:'Kelime', tr:'binmek, sürmek; yolculuk',                   ex:'His father taught him how to ride a bicycle.' },
  'ritual':        { type:'Kelime', tr:'ritüel, tören; alışkanlık',                  ex:'Cultural memory is inscribed in rituals and texts.' },
  'role':          { type:'Kelime', tr:'rol, görev; fonksiyon',                       ex:'REM sleep plays a critical role in memory consolidation.' },
  'rough':         { type:'Kelime', tr:'kaba, pürüzlü; taslak; zor',                ex:'They planned a rough route but left room for detours.' },
  'round':         { type:'Kelime', tr:'yuvarlak; tur; etraf',                        ex:'They watched a film inside a big round dome.' },
  'rule':          { type:'Kelime', tr:'kural, yasa; yönetmek',                      ex:'They established ground rules for the study group.' },
  'rush':          { type:'Kelime', tr:'acele etmek; hücum; acele',                  ex:'When the thirty days were up, she did not rush back.' },
  'sadness':       { type:'Kelime', tr:'üzüntü, keder, hüzün',                       ex:'Climate grief includes chronic fear and sadness.' },
  'sanctuary':     { type:'Kelime', tr:'sığınak, kutsal alan; huzur yeri',           ex:'The library is a peaceful sanctuary for students.' },
  'sandcastle':    { type:'Kelime', tr:'kum kalesi',                                  ex:'Dad built a sandcastle with the youngest child.' },
  'sandwich':      { type:'Kelime', tr:'sandviç, tost arası',                         ex:'They ate sandwiches and cold drinks for lunch.' },
  'satisfaction':  { type:'Kelime', tr:'tatmin, memnuniyet, doyum',                  ex:'Internal satisfaction drives real creativity.' },
  'save':          { type:'Kelime', tr:'kurtarmak; biriktirmek; saklamak',           ex:'He saved up enough money to take six months off work.' },
  'scale':         { type:'Kelime', tr:'ölçek, boyut; terazi; tırmanmak',           ex:'Social biases can be perpetuated at scale.' },
  'schedule':      { type:'Kelime', tr:'program, çizelge; planlamak',               ex:'She followed a strict schedule during training.' },
  'score':         { type:'Kelime', tr:'skor, puan; kazanmak; notasyon',             ex:'In the first half, the score was zero to zero.' },
  'scroll':        { type:'Kelime', tr:'kaydırmak (ekranda); aşağı kaymak',         ex:'After years of constant scrolling, she took a break.' },
  'seat':          { type:'Kelime', tr:'koltuk, oturak; yer; oturtmak',              ex:'She always sits in the same seat near the window.' },
  'sector':        { type:'Kelime', tr:'sektör, alan; bölüm',                        ex:'Technology creates jobs in different sectors.' },
  'seek':          { type:'Kelime', tr:'aramak, istemek; çabalamak',                ex:'Stoicism teaches practitioners to seek mental tranquility.' },
  'self-control':  { type:'Kelime', tr:'öz denetim, kendini kontrol etme',          ex:'Stoicism emphasises self-control over destructive emotions.' },
  'sensory':       { type:'Kelime', tr:'duyusal, duyu organlarıyla ilgili',          ex:'Stories activate language, sensory, and emotional networks.' },
  'serious':       { type:'Kelime', tr:'ciddi, ağır; önemli',                        ex:'He had never pursued woodworking seriously before.' },
  'serve':         { type:'Kelime', tr:'hizmet etmek; servis yapmak',               ex:'Oral narratives served to transmit cultural knowledge.' },
  'shape':         { type:'Kelime', tr:'şekil, biçim; şekillendirmek',               ex:'Language shapes the way we perceive the world.' },
  'shelf':         { type:'Kelime', tr:'raf',                                         ex:'One shelf in the bookshelf was slightly uneven.' },
  'shore':         { type:'Kelime', tr:'kıyı, sahil, deniz kenarı',                  ex:'They collected shells along the shore.' },
  'signal':        { type:'Kelime', tr:'sinyal, işaret; sinyal vermek',              ex:'Variable reward signals are used to maximise engagement.' },
  'silver':        { type:'Kelime', tr:'gümüş; gümüş renkli',                        ex:'One photo of a silver necklace went viral.' },
  'sister':        { type:'Kelime', tr:'kız kardeş; hemşire',                         ex:'Her sister finally admitted she had left the gift.' },
  'skipped':       { type:'Kelime', tr:'atladı; geçti (skip geçmişi)',               ex:'He often skipped meals because he was too busy.' },
  'slightly':      { type:'Kelime', tr:'biraz, hafifçe, az miktarda',                ex:'One shelf was slightly uneven but it looked fine.' },
  'smile':         { type:'Kelime', tr:'gülümsemek; gülümseme',                      ex:'Priya sat next to him and smiled.' },
  'snack':         { type:'Kelime', tr:'atıştırmalık, hafif yiyecek',                ex:'She packed enough snacks for the whole weekend.' },
  'society':       { type:'Kelime', tr:'toplum, cemiyet; dernek',                    ex:'Contemporary societies face many complex challenges.' },
  'software':      { type:'Kelime', tr:'yazılım; bilgisayar programları',            ex:'David was a dedicated software engineer.' },
  'solution':      { type:'Kelime', tr:'çözüm, çare; çözelti',                       ex:'Grid-scale storage is needed for clean energy solutions.' },
  'someone':       { type:'Kelime', tr:'biri, birisi',                                ex:'Someone had left a mysterious package at the door.' },
  'sound':         { type:'Kelime', tr:'ses; ses çıkarmak; sağlam',                  ex:'The guitar sounds were terrible at first.' },
  'soup':          { type:'Kelime', tr:'çorba',                                       ex:'He started with simple dishes like scrambled eggs and soup.' },
  'space':         { type:'Kelime', tr:'alan, boşluk; uzay; mesafe',                ex:'Volunteers cleared the disused car park space.' },
  'specific':      { type:'Kelime', tr:'özgül, belirli, spesifik',                   ex:'She gave specific examples from her past work.' },
  'speech':        { type:'Kelime', tr:'konuşma, nutuk; söylem',                     ex:'The coach gave them a short speech before the game.' },
  'spontaneous':   { type:'Kelime', tr:'kendiliğinden olan, spontane',               ex:'Creativity is not merely a spontaneous flash of inspiration.' },
  'spot':          { type:'Kelime', tr:'spot; nokta; fark etmek; leke',             ex:'They sometimes spot deer and rabbits in the forest.' },
  'spread':        { type:'Kelime', tr:'yayılmak; yaymak; sürmek',                   ex:'Mum spread a big towel on the sand.' },
  'squirrel':      { type:'Kelime', tr:'sincap',                                      ex:'Their dog chases squirrels through the grass.' },
  'staff':         { type:'Kelime', tr:'personel, kadro; çalışanlar',                ex:'She had to manage finances and hire staff.' },
  'standards':     { type:'Kelime', tr:'standartlar, ölçütler, normlar',             ex:'She held herself to high personal standards.' },
  'stepping':      { type:'Kelime', tr:'adım atma; adım atmak',                     ex:'Stepping out of your comfort zone can be rewarding.' },
  'store':         { type:'Kelime', tr:'mağaza, dükkan; depolamak',                  ex:'He pushed the trolley around the store.' },
  'straight':      { type:'Kelime', tr:'düz, doğru; direkt; doğruca',               ex:'The children ran straight into the sea.' },
  'strategy':      { type:'Kelime', tr:'strateji, plan, yöntem',                     ex:'Lateral reading is a more effective strategy.' },
  'streamers':     { type:'Kelime', tr:'renkli kağıt şeritler; serpantin',           ex:'Her mum decorated the house with balloons and colourful streamers.' },
  'strengthen':    { type:'Kelime', tr:'güçlendirmek, pekiştirmek',                  ex:'Neural pathways are strengthened through myelination.' },
  'struggle':      { type:'Kelime', tr:'mücadele etmek; güçlük çekmek',             ex:'Some days she felt strong; other days she struggled.' },
  'studies':       { type:'Kelime', tr:'çalışmalar, araştırmalar',                   ex:'Longitudinal studies confirm the role of relationships.' },
  'style':         { type:'Kelime', tr:'stil, tarz; biçem',                           ex:'Each artist has their own unique style.' },
  'substance':     { type:'Kelime', tr:'madde; öz, esas; içerik',                   ex:'Toxins are substances that can affect gene expression.' },
  'succeed':       { type:'Kelime', tr:'başarmak, muvaffak olmak',                   ex:'With hard work and dedication, you can succeed.' },
  'suddenly':      { type:'Kelime', tr:'aniden, birdenbire',                          ex:'Suddenly, the atmosphere in the room changed.' },
  'suitable':      { type:'Kelime', tr:'uygun, münasip, elverişli',                  ex:'She found a suitable location in the town centre.' },
  'sunny':         { type:'Kelime', tr:'güneşli, aydınlık',                           ex:'The family drove to the beach on a sunny Saturday.' },
  'supermarket':   { type:'Kelime', tr:'süpermarket, market',                         ex:'Sam\'s mum sent him to the supermarket.' },
  'supplies':      { type:'Kelime', tr:'malzemeler, erzak; ikmal',                   ex:'The school had limited supplies and no electricity.' },
  'surplus':       { type:'Kelime', tr:'fazlalık, artık; aşırı stok',               ex:'Mass production created surplus goods.' },
  'surprised':     { type:'Kelime', tr:'şaşırmış, hayrete düşmüş',                  ex:'She was surprised by how friendly everyone was.' },
  'sustainability':{ type:'Kelime', tr:'sürdürülebilirlik',                            ex:'Framing sustainability as individual choice is limiting.' },
  'sustainable':   { type:'Kelime', tr:'sürdürülebilir, kalıcı',                     ex:'We need sustainable cities shared equitably.' },
  'swim':          { type:'Kelime', tr:'yüzmek; yüzme',                              ex:'She loves to swim in the sea on hot summer days.' },
  'system':        { type:'Kelime', tr:'sistem, düzen',                               ex:'The education system must adapt to new challenges.' },
  'tackle':        { type:'Kelime', tr:'ele almak, üstesinden gelmek',               ex:'She decided to tackle one task at a time.' },
  'tail':          { type:'Kelime', tr:'kuyruk; iz sürmek',                           ex:'The dog wagged his tail when he found his new bed.' },
  'talent':        { type:'Kelime', tr:'yetenek, kabiliyet',                          ex:'Everyone has a unique talent waiting to be developed.' },
  'taught':        { type:'Kelime', tr:'öğretti (teach geçmişi)',                    ex:'His father taught him how to ride the bicycle.' },
  'teach':         { type:'Kelime', tr:'öğretmek, ders vermek',                      ex:'He taught mathematics at a rural primary school.' },
  'team':          { type:'Kelime', tr:'takım, ekip',                                 ex:'Leo and his team were nervous but excited.' },
  'tears':         { type:'Kelime', tr:'gözyaşları (tear çoğulu)',                   ex:'Tears ran down her face as she crossed the finish line.' },
  'tend':          { type:'Kelime', tr:'eğiliminde olmak; bakmak (birinin)',         ex:'People tend to fear losses more than equivalent gains.' },
  'tent':          { type:'Kelime', tr:'çadır',                                       ex:'They pitched a tent beside a stream.' },
  'term':          { type:'Kelime', tr:'terim; dönem; süre; ifade',                  ex:'Psychologists use the term eco-anxiety for climate grief.' },
  'text':          { type:'Kelime', tr:'metin, yazı; mesaj',                          ex:'Cultural memory is inscribed in texts and rituals.' },
  'themselves':    { type:'Kelime', tr:'kendileri; bizzat kendileri',                ex:'She asked each student to share something about themselves.' },
  'thoroughly':    { type:'Kelime', tr:'iyice, dikkatle, eksiksiz biçimde',          ex:'She researched the company thoroughly before the interview.' },
  'thoughtful':    { type:'Kelime', tr:'düşünceli, anlayışlı; özenli',              ex:'She said it was the most thoughtful gift she had received.' },
  'thursday':      { type:'Kelime', tr:'Perşembe (günü)',                             ex:'The study group met every Tuesday and Thursday.' },
  'thousands':     { type:'Kelime', tr:'binlerce; binler',                            ex:'Thousands of people travel to the valley for the festival.' },
  'tired':         { type:'Kelime', tr:'yorgun, bitkin',                              ex:'Everyone was tired but happy on the way back.' },
  'tomato':        { type:'Kelime', tr:'domates',                                     ex:'He grows tomatoes, cucumbers, and herbs in his garden.' },
  'toward':        { type:'Kelime', tr:'-e doğru, -e yönelik (toward/towards)',     ex:'Architecture is shifting towards sustainability.' },
  'transmit':      { type:'Kelime', tr:'iletmek, aktarmak; yayımlamak',             ex:'Oral narratives transmitted cultural knowledge.' },
  'trauma':        { type:'Kelime', tr:'travma, ruhsal yara; şok',                   ex:'The effects of trauma can be transmitted across generations.' },
  'treat':         { type:'Kelime', tr:'muamele etmek; tedavi etmek; ikram',        ex:'Society treats rest as a sign of weakness.' },
  'trigger':       { type:'Kelime', tr:'tetiklemek; tetik; başlatmak',               ex:'A cue triggers the routine in the habit loop.' },
  'tuesday':       { type:'Kelime', tr:'Salı (günü)',                                 ex:'The study group met every Tuesday and Thursday.' },
  'typically':     { type:'Kelime', tr:'genellikle, tipik olarak',                   ex:'Conventional anxiety is typically treated as a disorder.' },
  'ultimately':    { type:'Kelime', tr:'sonuçta, nihayetinde, en sonunda',           ex:'Technology has ultimately generated more jobs.' },
  'uncertain':     { type:'Kelime', tr:'belirsiz, kesin olmayan; güvensiz',          ex:'Young people face an uncertain future.' },
  'underlying':    { type:'Kelime', tr:'altta yatan, temel',                         ex:'Epigenetics doesn\'t change the underlying DNA sequence.' },
  'unit':          { type:'Kelime', tr:'birim, ünite; bölük',                        ex:'Bits are binary units that can be zero or one.' },
  'universal':     { type:'Kelime', tr:'evrensel, tüm insanlara ait',               ex:'Universal aspects of cognition operate across languages.' },
  'universe':      { type:'Kelime', tr:'evren, kâinat',                              ex:'Stoics teach us to accept the inevitable nature of the universe.' },
  'urgent':        { type:'Kelime', tr:'acil, ivedi, zorunlu',                       ex:'Microplastics necessitate urgent and comprehensive research.' },
  'user':          { type:'Kelime', tr:'kullanıcı; kullanan kişi',                   ex:'The platform keeps users engaged for longer.' },
  'usually':       { type:'Kelime', tr:'genellikle, çoğunlukla, her zaman',         ex:'She usually buys a loaf of bread and two croissants.' },
  'utility':       { type:'Kelime', tr:'fayda, kullanışlılık; kamu hizmeti',        ex:'Classical economics assumed people maximise utility.' },
  'valid':         { type:'Kelime', tr:'geçerli, haklı, meşru',                      ex:'Practitioners acknowledge the validity of the distress.' },
  'valley':        { type:'Kelime', tr:'vadi, çukur',                                 ex:'Thousands travel to the valley for the festival.' },
  'variable':      { type:'Kelime', tr:'değişken; değişebilen',                      ex:'Variable reward notifications are used to maximise engagement.' },
  'vast':          { type:'Kelime', tr:'geniş, büyük, engin; çok büyük',            ex:'The library has a vast collection of literature.' },
  'verify':        { type:'Kelime', tr:'doğrulamak, teyit etmek',                   ex:'Lateral reading involves verifying claims with other sources.' },
  'viral':         { type:'Kelime', tr:'viral, hızla yayılan; virüsle ilgili',       ex:'One photo of a silver necklace went viral.' },
  'visit':         { type:'Kelime', tr:'ziyaret etmek; ziyaret',                     ex:'She counts the weeks until she can visit her grandmother.' },
  'vital':         { type:'Kelime', tr:'hayati, çok önemli, yaşamsal',              ex:'The library remains a vital resource for the community.' },
  'volunteer':     { type:'Kelime', tr:'gönüllü; gönüllü olmak',                    ex:'Volunteers cleared the disused car park.' },
  'wake':          { type:'Kelime', tr:'uyanmak; uyandırmak',                        ex:'They wake up early and cook breakfast on a small fire.' },
  'wall':          { type:'Kelime', tr:'duvar; engel; tıkanma noktası',             ex:'At mile twenty, she hit what runners call the wall.' },
  'warn':          { type:'Kelime', tr:'uyarmak, ikaz etmek',                        ex:'His doctor warned him that his lifestyle was unsustainable.' },
  'waste':         { type:'Kelime', tr:'atık, israf; ziyan etmek',                   ex:'The fashion industry generates enormous volumes of textile waste.' },
  'wave':          { type:'Kelime', tr:'dalga; el sallamak; dalgalanmak',           ex:'Each wave of technology creates new jobs.' },
  'weeds':         { type:'Kelime', tr:'yabani ot, ot (bahçedeki istenmeyen)',      ex:'He pulls out the weeds by hand every morning.' },
  'wide':          { type:'Kelime', tr:'geniş, enli; yaygın',                        ex:'There is a wide range of books to choose from.' },
  'wind':          { type:'Kelime', tr:'rüzgâr; nefes; sarmak',                     ex:'Solar and wind technologies have seen dramatic cost reductions.' },
  'woke':          { type:'Kelime', tr:'uyandı (wake geçmişi)',                      ex:'She woke up one morning with a sore throat.' },
  'wonderful':     { type:'Kelime', tr:'harika, muhteşem, şaşırtıcı güzel',         ex:'When the cookies were ready, the house smelled wonderful.' },
  'woodworking':   { type:'Kelime', tr:'ahşap işçiliği, marangozluk',               ex:'He had always had a passion for woodworking.' },
  'workforce':     { type:'Kelime', tr:'iş gücü, çalışan kesim',                    ex:'The workforce must adapt to technological disruption.' },
  'worldwide':     { type:'Kelime', tr:'dünya genelinde, küresel ölçekte',           ex:'The fifteen-minute city concept has gained traction worldwide.' },
  'worry':         { type:'Kelime', tr:'endişe; endişelenmek, kaygılanmak',         ex:'She tried not to worry about things outside her control.' },
  'worth':         { type:'Kelime', tr:'değer; -e değer olan; -in değeri kadar',   ex:'Managing stress is a skill worth practising.' },
  'worn':          { type:'Kelime', tr:'yıpranmış; giyilmiş (wear geçmişi)',        ex:'She wore her smartest outfit to the interview.' },
  'yesterday':     { type:'Kelime', tr:'dün',                                        ex:'She finished the book yesterday evening.' },
  'youngest':      { type:'Kelime', tr:'en küçük (yaş olarak)',                     ex:'Dad built a sandcastle with the youngest child.' },
  'zone':          { type:'Kelime', tr:'bölge, alan; konfor alanı',                 ex:'Stepping out of your comfort zone can be rewarding.' },

  // ── Batch 2 — remaining coverage ───────────────────────────────────
  'everyone':      { type:'Kelime', tr:'herkes, hepsi',                              ex:'Everyone agreed it was a perfect day.' },
  'favourite':     { type:'Kelime', tr:'favori, en sevilen, gözde',                  ex:'Camping is her favourite holiday.' },
  'minute':        { type:'Kelime', tr:'dakika; küçük, ince',                        ex:'She stretches in bed for a few minutes.' },
  'cultural':      { type:'Kelime', tr:'kültürel, kültürle ilgili',                  ex:'Cultural memory transmits knowledge about the past.' },
  'year':          { type:'Kelime', tr:'yıl, sene',                                  ex:'She has been painting for twenty years.' },
  'herself':       { type:'Kelime', tr:'kendisi (kadın); bizzat kendisi',            ex:'She proved something to herself on race day.' },
  'inside':        { type:'Kelime', tr:'içeride, içinde; iç kısım',                 ex:'It was raining, so they stayed inside.' },
  'later':         { type:'Kelime', tr:'sonra, daha sonra, bir süre sonra',          ex:'Six months later, the city felt like home.' },
  'mum':           { type:'Kelime', tr:'anne (konuşma dili)',                         ex:'Mum spread a big towel on the sand.' },
  'something':     { type:'Kelime', tr:'bir şey, bir şeyler',                        ex:'Seeing her work on a wall changed something in her.' },
  'modern':        { type:'Kelime', tr:'modern, çağdaş, günümüze ait',              ex:'Historical wisdom remains relevant in modern life.' },
  'nature':        { type:'Kelime', tr:'doğa; tabiat; doğa gereği',                 ex:'Epigenetics studies the interaction between nature and nurture.' },
  'piece':         { type:'Kelime', tr:'parça, bölüm; eser; porsiyon',              ex:'Mr. Filip gives her a small piece of cake to try.' },
  'quick':         { type:'Kelime', tr:'hızlı, çabuk; anlık',                       ex:'She is quick to tell others that starting over takes courage.' },
  'ready':         { type:'Kelime', tr:'hazır, mevcut; istekli',                     ex:'The baker always has fresh bread ready by eight.' },
  'several':       { type:'Kelime', tr:'birkaç, çeşitli',                            ex:'He watched several online tutorials before starting.' },
  'whole':         { type:'Kelime', tr:'bütün, tüm; tam; bütünü',                   ex:'The whole house smelled wonderful.' },
  'city':          { type:'Kelime', tr:'şehir, kent',                                ex:'He rented a small apartment in the city.' },
  'consistent':    { type:'Kelime', tr:'tutarlı, istikrarlı; uyumlu',               ex:'Studies consistently show that external rewards undermine creativity.' },
  'enable':        { type:'Kelime', tr:'olanaklı kılmak, imkân vermek',             ex:'Quantum entanglement enables greater computational power.' },
  'entire':        { type:'Kelime', tr:'tüm, bütün, eksiksiz',                      ex:'She spent the entire afternoon in the museum.' },
  'era':           { type:'Kelime', tr:'dönem, çağ, devir',                          ex:'Consumerism emerged widely in the post-war era.' },
  'establish':     { type:'Kelime', tr:'kurmak, oluşturmak; kanıtlamak',            ex:'Stories help establish moral norms in a community.' },
  'ever':          { type:'Kelime', tr:'hiç, herhangi bir zaman; hep',              ex:'It was the best day he had ever had.' },
  'everything':    { type:'Kelime', tr:'her şey, hepsi',                             ex:'They began discussing everything from food to politics.' },
  'fundamental':   { type:'Kelime', tr:'temel, esaslı, birincil',                   ex:'Behavioural economics fundamentally challenged classical models.' },
  'international': { type:'Kelime', tr:'uluslararası, milletlerarası',              ex:'The energy transition requires coordinated international cooperation.' },
  'particularly':  { type:'Kelime', tr:'özellikle, bilhassa',                        ex:'Intrinsic motivation is particularly significant for creativity.' },
  'realise':       { type:'Kelime', tr:'fark etmek, anlamak; gerçekleştirmek',      ex:'He realised that stepping out of his comfort zone was rewarding.' },
  'recent':        { type:'Kelime', tr:'son, yakın zamanlı, yeni',                  ex:'Recent advances in biotechnology are remarkable.' },
  'scientific':    { type:'Kelime', tr:'bilimsel, fenle ilgili',                     ex:'Scientific investigations reveal the harm of microplastics.' },
  'simultaneous':  { type:'Kelime', tr:'eş zamanlı, aynı anda olan',               ex:'Stories activate multiple neural networks simultaneously.' },
  'slow':          { type:'Kelime', tr:'yavaş; yavaşlatmak',                        ex:'She slowed down but did not stop.' },
  'story':         { type:'Kelime', tr:'hikaye, öykü; kat (bina)',                  ex:'At night, they sit around the fire and tell stories.' },
  'strong':        { type:'Kelime', tr:'güçlü, kuvvetli; sağlam',                   ex:'Some days she felt strong; other days she struggled.' },
  'sun':           { type:'Kelime', tr:'güneş',                                      ex:'He gets up early before the sun gets too hot.' },
  'thing':         { type:'Kelime', tr:'şey, nesne, konu',                           ex:'Ali learns many things by listening carefully.' },
  'today':         { type:'Kelime', tr:'bugün; günümüzde',                           ex:'Today she is reading a book about dolphins.' },
  'truly':         { type:'Kelime', tr:'gerçekten, hakikaten, samimiyetle',         ex:'Stepping out of your comfort zone can be truly rewarding.' },
  'begun':         { type:'Kelime', tr:'başlamış (begin\'in geçmiş ortacı)',         ex:'Society has barely begun to address these questions.' },
  'better':        { type:'Kelime', tr:'daha iyi; daha iyi hale gelmek',            ex:'She felt better by the next morning.' },
  'centre':        { type:'Kelime', tr:'merkez, orta; ortada bulunmak',             ex:'She found a suitable location in the town centre.' },
  'chronic':       { type:'Kelime', tr:'kronik, süreğen, devamlı',                  ex:'Chronic sleep deprivation impairs cognitive function.' },
  'complete':      { type:'Kelime', tr:'tamamlamak; tam, eksiksiz',                 ex:'He was completely overwhelmed by the deadline.' },
  'computer':      { type:'Kelime', tr:'bilgisayar',                                 ex:'Classical computers process information as bits.' },
  'effect':        { type:'Kelime', tr:'etki, sonuç; sağlamak',                     ex:'The anchoring effect influences how we make judgements.' },
  'empty':         { type:'Kelime', tr:'boş; boşaltmak',                            ex:'The car park had sat empty for years.' },
  'english':       { type:'Kelime', tr:'İngilizce; İngiliz',                         ex:'She joined a programme to improve her English.' },
  'event':         { type:'Kelime', tr:'etkinlik, olay; yarışma',                   ex:'Every event is the result of prior causes.' },
  'happen':        { type:'Kelime', tr:'olmak, meydana gelmek, gerçekleşmek',       ex:'What happens when an algorithm makes a mistake?' },
  'himself':       { type:'Kelime', tr:'kendisi (erkek); bizzat kendisi',           ex:'He proved something to himself that day.' },
  'highly':        { type:'Kelime', tr:'oldukça, çok, büyük ölçüde',               ex:'Historical wisdom remains highly relevant today.' },
  'historical':    { type:'Kelime', tr:'tarihi, tarihsel; geçmişe ait',             ex:'Historical wisdom remains highly relevant in modern life.' },
  'immediately':   { type:'Kelime', tr:'hemen, derhal, anında',                     ex:'Clara immediately stood up and offered her seat.' },
  'including':     { type:'Kelime', tr:'dahil olmak üzere, içeren',                 ex:'Sleep flushes out waste, including harmful proteins.' },
  'initially':     { type:'Kelime', tr:'başlangıçta, önce, ilk olarak',             ex:'Initially, Biscuit was shy and hid under the sofa.' },
  'interesting':   { type:'Kelime', tr:'ilginç, çekici, merak uyandıran',           ex:'She asked each student to share one interesting fact.' },
  'largely':       { type:'Kelime', tr:'büyük ölçüde, genellikle, çoğunlukla',     ex:'The basal ganglia operates largely beneath conscious awareness.' },
  'majority':      { type:'Kelime', tr:'çoğunluk, büyük kısım',                    ex:'The majority of the class agreed with her.' },
  'members':       { type:'Kelime', tr:'üyeler; organlar (vücut)',                  ex:'Members took turns choosing the next book.' },
  'mountain':      { type:'Kelime', tr:'dağ',                                        ex:'Every year her family goes camping in the mountains.' },
  'originally':    { type:'Kelime', tr:'aslen, özgün olarak, başlangıçta',         ex:'She originally planned to stay for just a year.' },
  'otherwise':     { type:'Kelime', tr:'aksi takdirde; başka türlü',               ex:'How can we be held accountable for actions we couldn\'t have chosen otherwise?' },
  'outrage':       { type:'Kelime', tr:'öfke, kızgınlık; hiddet',                  ex:'Platforms prioritise outrage over accurate information.' },
  'overall':       { type:'Kelime', tr:'genel, toplam; genel olarak',              ex:'Overall, the study showed a positive result.' },
  'overcome':      { type:'Kelime', tr:'üstesinden gelmek; aşmak',                 ex:'Stoicism is a means of overcoming destructive emotions.' },
  'ownership':     { type:'Kelime', tr:'sahiplik, mülkiyet',                        ex:'Media ownership concentrated in a few powerful corporations.' },
  'package':       { type:'Kelime', tr:'paket; kutu',                               ex:'She found a small package on the step.' },
  'pair':          { type:'Kelime', tr:'çift; eşlemek',                             ex:'She was paired with Sophie for the language exchange.' },
  'paradigm':      { type:'Kelime', tr:'paradigma; örüntü, model',                 ex:'Architecture is undergoing a paradigm shift.' },
  'paradox':       { type:'Kelime', tr:'paradoks, çelişki',                         ex:'External rewards can paradoxically undermine creativity.' },
  'passive':       { type:'Kelime', tr:'pasif, edilgen; eylemsiz',                  ex:'Sleep was long regarded as a passive state.' },
  'pasta':         { type:'Kelime', tr:'makarna',                                    ex:'He started with simple dishes like pasta and soup.' },
  'perceive':      { type:'Kelime', tr:'algılamak, fark etmek, kavramak',          ex:'Language shapes the way we perceive the world.' },
  'pervasive':     { type:'Kelime', tr:'yaygın, her yere sızmış, kapsamlı',        ex:'In an era of pervasive digital media, critical thinking matters.' },
  'pessimistic':   { type:'Kelime', tr:'kötümser, karamsar',                        ex:'Economists warn against purely pessimistic forecasts.' },
  'pillar':        { type:'Kelime', tr:'sütun; dayanak; temel unsur',              ex:'Seligman\'s model identifies five pillars of well-being.' },
  'plenty':        { type:'Kelime', tr:'bol, yeterli; bolluk, bereket',             ex:'They left plenty of room for detours.' },
  'plot':          { type:'Kelime', tr:'arazi; olay örgüsü; komplo',               ex:'Each family received a plot in the community garden.' },
  'policymaker':   { type:'Kelime', tr:'politika yapıcı, karar alıcı',             ex:'Policymakers must invest in lifelong learning.' },
  'portable':      { type:'Kelime', tr:'taşınabilir, kolay taşınan',               ex:'Portable benefits systems support workers across jobs.' },
  'position':      { type:'Kelime', tr:'pozisyon; konum; tutum; görev',            ex:'She received an email offering her the position.' },
  'possess':       { type:'Kelime', tr:'sahip olmak, elinde bulundurmak',          ex:'Do human beings possess genuine free will?' },
  'post-war':      { type:'Kelime', tr:'savaş sonrası, savaş sonrasına ait',       ex:'Consumerism emerged widely in the post-war era.' },
  'potential':     { type:'Kelime', tr:'potansiyel, olası güç; olası',             ex:'Hydrogen is being explored as a potential remedy.' },
  'precise':       { type:'Kelime', tr:'kesin, tam, net',                           ex:'These are precisely the qualities machines cannot replicate.' },
  'predictor':     { type:'Kelime', tr:'öngörücü, belirleyici etken',              ex:'Autonomy is the strongest predictor of long-term happiness.' },
  'preservation':  { type:'Kelime', tr:'koruma, muhafaza, saklama',               ex:'Cultural preservation matters in a globalised world.' },
  'primary':       { type:'Kelime', tr:'birincil, temel, ilk; ilkokul',            ex:'He taught mathematics at a rural primary school.' },
  'prioritise':    { type:'Kelime', tr:'öncelik vermek, öncelikli saymak',         ex:'Urban planning must prioritise affordable housing.' },
  'proactive':     { type:'Kelime', tr:'proaktif, girişimci, öngörülü',            ex:'A proactive strategy is needed to prevent disenfranchisement.' },
  'program':       { type:'Kelime', tr:'program; yazılım; planlamak',              ex:'Retraining programs help workers transition to new roles.' },
  'progressive':   { type:'Kelime', tr:'ilerici; giderek artan',                   ex:'Myelination makes behaviour progressively more automatic.' },
  'proliferation': { type:'Kelime', tr:'çoğalma, yayılma, hızlı artış',           ex:'The proliferation of newsfeeds creates epistemic bubbles.' },
  'promote':       { type:'Kelime', tr:'desteklemek, teşvik etmek; tanıtmak',     ex:'The campaign promoted sustainable consumption.' },
  'proponent':     { type:'Kelime', tr:'destekçi, savunucu, taraftar',             ex:'Proponents argue that AI can reduce human bias.' },
  'propose':       { type:'Kelime', tr:'önermek, teklif etmek',                    ex:'The Sapir-Whorf hypothesis proposes that language shapes thought.' },
  'protect':       { type:'Kelime', tr:'korumak, savunmak',                        ex:'Locke emphasised the protection of natural rights.' },
  'provide':       { type:'Kelime', tr:'sağlamak, temin etmek',                    ex:'City planners must provide adequate infrastructure.' },
  'purchase':      { type:'Kelime', tr:'satın almak; satın alma',                  ex:'Make more conscious purchasing decisions.' },
  'purely':        { type:'Kelime', tr:'salt, yalnızca, tamamen',                  ex:'Economists warn against purely pessimistic forecasts.' },
  'pursue':        { type:'Kelime', tr:'takip etmek; peşinden gitmek; sürdürmek', ex:'He had never pursued woodworking seriously.' },
  'rabbit':        { type:'Kelime', tr:'tavşan',                                    ex:'They sometimes spot deer and rabbits in the forest.' },
  'rail':          { type:'Kelime', tr:'ray; tırabzan, korkuluk',                  ex:'She held the rail and looked out of the window.' },
  'rainy':         { type:'Kelime', tr:'yağmurlu, yağışlı',                        ex:'Zoe stayed indoors on a rainy day.' },
  'range':         { type:'Kelime', tr:'aralık; çeşit; menzil; sıralanmak',       ex:'Platform designers employ a range of techniques.' },
  'rate':          { type:'Kelime', tr:'oran, hız; değerlendirmek',                ex:'The adoption rate of clean energy is increasing.' },
  'reachable':     { type:'Kelime', tr:'ulaşılabilir, erişilebilir',               ex:'Amenities should be reachable within fifteen minutes.' },
  'reason':        { type:'Kelime', tr:'sebep, neden; mantık; düşünmek',          ex:'There is no good reason to dismiss the evidence.' },
  'rebuild':       { type:'Kelime', tr:'yeniden inşa etmek; restore etmek',       ex:'Rebuilding shared epistemic ground requires effort.' },
  'regularly':     { type:'Kelime', tr:'düzenli olarak, sık sık',                  ex:'She posted regularly on social media.' },
  'regulatory':    { type:'Kelime', tr:'düzenleyici, denetleyici',                 ex:'A regulatory framework is needed for AI accountability.' },
  'reinforce':     { type:'Kelime', tr:'pekiştirmek, güçlendirmek',               ex:'Newsfeeds reinforce existing beliefs.' },
  'relate':        { type:'Kelime', tr:'ilişkilendirmek; ilgili olmak',            ex:'These restrictions relate particularly to children.' },
  'relatively':    { type:'Kelime', tr:'görece, nispeten, karşılaştırmalı olarak', ex:'Consumerism is a relatively recent historical phenomenon.' },
  'remain':        { type:'Kelime', tr:'kalmak, sürmek; devam etmek',             ex:'The debate remains unresolved to this day.' },
  'remind':        { type:'Kelime', tr:'hatırlatmak; aklına getirmek',             ex:'The experience reminded her that kindness exists everywhere.' },
  'render':        { type:'Kelime', tr:'yapmak, dönüştürmek; sağlamak',           ex:'Automation renders many manual occupations obsolete.' },
  'researcher':    { type:'Kelime', tr:'araştırmacı, bilim insanı',               ex:'Researchers note that young people are disproportionately affected.' },
  'resolve':       { type:'Kelime', tr:'çözümlemek; kararlılık',                  ex:'Resolving these tensions requires interdisciplinary collaboration.' },
  'respect':       { type:'Kelime', tr:'saygı; saygı göstermek; açıdan',         ex:'She earned the respect of her colleagues quickly.' },
  'restrict':      { type:'Kelime', tr:'kısıtlamak, sınırlamak',                  ex:'Nudge policy guides citizens without restricting freedom.' },
  'revolve':       { type:'Kelime', tr:'etrafında dönmek; çevresinde olmak',      ex:'The debate revolves around accountability.' },
  'safety':        { type:'Kelime', tr:'güvenlik, emniyet',                        ex:'Psychological safety helps employees experiment freely.' },
  'sapir':         { type:'Kelime', tr:'Sapir-Whorf hipotezi — dil ve düşünce ilişkisi teorisi', ex:'The Sapir-Whorf hypothesis is about language and thought.' },
  'school':        { type:'Kelime', tr:'okul; eğitim vermek',                      ex:'She takes the bus to school every morning.' },
  'scramble':      { type:'Kelime', tr:'karıştırarak pişirmek; tırmanmak',        ex:'He made scrambled eggs for breakfast.' },
  'second':        { type:'Kelime', tr:'ikinci; saniye; desteklemek',              ex:'One of his paintings won second prize.' },
  'seeming':       { type:'Kelime', tr:'görünürde olan, görünüşe göre',           ex:'Loss aversion explains seemingly irrational decisions.' },
  'select':        { type:'Kelime', tr:'seçmek; seçilmiş, özenli',                ex:'Her photo was selected for an exhibition.' },
  'sequence':      { type:'Kelime', tr:'dizi, sıra; genetik sekans',              ex:'Epigenetics doesn\'t change the DNA sequence.' },
  'session':       { type:'Kelime', tr:'oturum, seans; ders',                     ex:'The study group covered one topic per session.' },
  'severe':        { type:'Kelime', tr:'ağır, şiddetli, ciddi',                   ex:'Microplastics constitute a severe environmental crisis.' },
  'shift':         { type:'Kelime', tr:'değişim, kayma; kaymak, değişmek',       ex:'Positive psychology shifted the field\'s focus.' },
  'sign':          { type:'Kelime', tr:'işaret, belirti; imzalamak',              ex:'Starting over is not a sign of failure.' },
  'similar':       { type:'Kelime', tr:'benzer, aynı türden',                     ex:'Many students had similar stories to tell.' },
  'sing':          { type:'Kelime', tr:'şarkı söylemek; şakımak',                ex:'Everyone sang happy birthday.' },
  'slight':        { type:'Kelime', tr:'hafif, az, küçük; küçümsemek',           ex:'She had a slight fever and had to stay home.' },
  'smooth':        { type:'Kelime', tr:'pürüzsüz, düzgün; sakin; düzleştirmek', ex:'She managed everything smoothly.' },
  'sniff':         { type:'Kelime', tr:'koklamak, burnunu çekmek',                ex:'He sniffed everything in his new home.' },
  'sociologist':   { type:'Kelime', tr:'sosyolog, toplumbilimci',                 ex:'Jan Assmann was a sociologist who studied cultural memory.' },
  'sourdough':     { type:'Kelime', tr:'ekşi hamur (ekmeği)',                     ex:'She usually buys a loaf of sourdough bread.' },
  'spark':         { type:'Kelime', tr:'kıvılcım; başlatmak, harekete geçirmek', ex:'Books can spark such deep conversations.' },
  'spatial':       { type:'Kelime', tr:'uzamsal, mekânsal',                       ex:'Spatial reasoning may operate independently of language.' },
  'speaker':       { type:'Kelime', tr:'konuşmacı; hoparlör',                     ex:'Speakers of different languages perceive colour differently.' },
  'sponsor':       { type:'Kelime', tr:'sponsor; desteklemek',                    ex:'Students struggled to spot sponsored content.' },
  'stoic':         { type:'Kelime', tr:'Stoacı; duygusunu belli etmeyen',        ex:'Stoicism is an ancient Greek philosophy of self-control.' },
  'stretch':       { type:'Kelime', tr:'uzanmak, germek; esnemek',               ex:'She stretches in bed for a few minutes.' },
  'stringent':     { type:'Kelime', tr:'katı, sıkı, kısıtlayıcı',                ex:'Stringent regulations are needed to prevent misuse.' },
  'structural':    { type:'Kelime', tr:'yapısal, yapıyla ilgili',                 ex:'Biases can perpetuate structural inequality at scale.' },
  'structure':     { type:'Kelime', tr:'yapı; düzen; yapılandırmak',             ex:'Creativity is a far more structured process.' },
  'substantial':   { type:'Kelime', tr:'önemli, kayda değer; büyük',             ex:'Renewable energy needs substantial investment in storage.' },
  'suggest':       { type:'Kelime', tr:'önermek, tavsiye etmek; ima etmek',      ex:'Her flatmate suggested she break the project into tasks.' },
  'surplus':       { type:'Kelime', tr:'fazlalık, artık; aşırı stok',            ex:'Mass production created surplus goods after the war.' },
  'susceptible':   { type:'Kelime', tr:'savunmasız, etkilenmeye açık',           ex:'Routine tasks are susceptible to displacement by AI.' },
  'sweet':         { type:'Kelime', tr:'tatlı, şekerli; sevimli',                ex:'The cookies were sweet and perfectly baked.' },
  'switch':        { type:'Kelime', tr:'değiştirmek; anahtar; geçiş yapmak',    ex:'Epigenetics switches genes on or off.' },
  'synthetic':     { type:'Kelime', tr:'sentetik, yapay, yapma',                 ex:'Microscopic synthetic polymers have infiltrated ecosystems.' },
  'tag':           { type:'Kelime', tr:'etiket; kimyasal işaret; etiketlemek',   ex:'Chemical tags sit on the genome and regulate expression.' },
  'takeaway':      { type:'Kelime', tr:'paket servis yemek; çıkarılan ders',     ex:'He had always relied on ready meals and takeaways.' },
  'technical':     { type:'Kelime', tr:'teknik, teknolojik; uzmanlığa ait',      ex:'She learned many technical skills during the course.' },
  'technique':     { type:'Kelime', tr:'teknik, yöntem; beceri',                 ex:'The teacher shows students different techniques each week.' },
  'technological': { type:'Kelime', tr:'teknolojik, teknikle ilgili',            ex:'Each wave of technological change creates new jobs.' },
  'teeth':         { type:'Kelime', tr:'dişler (tooth çoğulu)',                   ex:'She goes to the bathroom to brush her teeth.' },
  'temperature':   { type:'Kelime', tr:'sıcaklık, ısı; ateş (hastalık)',        ex:'Her mum took her temperature and found she had a fever.' },
  'tendency':      { type:'Kelime', tr:'eğilim, temayül, yönelim',              ex:'Loss aversion is the tendency to fear losses more than gains.' },
  'tension':       { type:'Kelime', tr:'gerilim, gerginlik',                     ex:'Resolving these tensions requires collaboration.' },
  'term':          { type:'Kelime', tr:'terim; dönem; koşul',                    ex:'Psychologists use the term eco-anxiety for climate grief.' },
  'terminology':   { type:'Kelime', tr:'terminoloji, terimler bütünü',           ex:'Languages with different colour terminology perceive colour differently.' },
  'theorist':      { type:'Kelime', tr:'teorisyen, kuramcı',                     ex:'Each theorist imagined a hypothetical state of nature.' },
  'thick':         { type:'Kelime', tr:'kalın; yoğun; katı',                     ex:'The forest floor was covered with thick leaves.' },
  'thinker':       { type:'Kelime', tr:'düşünür, fikir insanı',                  ex:'Hobbes, Locke, and Rousseau were key thinkers on the social contract.' },
  'threaten':      { type:'Kelime', tr:'tehdit etmek; tehlike arz etmek',        ex:'Climate change threatens biodiversity.' },
  'threshold':     { type:'Kelime', tr:'eşik; sınır; başlangıç noktası',        ex:'Well-being levels off beyond a moderate income threshold.' },
  'tight':         { type:'Kelime', tr:'sıkı, dar; gergin',                      ex:'She kept a tight schedule during training.' },
  'topic':         { type:'Kelime', tr:'konu, başlık, mesele',                   ex:'The study group covered one topic per session.' },
  'touch':         { type:'Kelime', tr:'dokunmak; dokunuş; etkilemek',          ex:'Mia loved the room where you could touch fossils.' },
  'towel':         { type:'Kelime', tr:'havlu',                                   ex:'Mum spread a big towel on the sand.' },
  'toxin':         { type:'Kelime', tr:'toksin, zehirli madde',                  ex:'Exposure to toxins can modify the chemical tags on the genome.' },
  'trace':         { type:'Kelime', tr:'izlemek; iz, belirti; eser',             ex:'Anthropologists trace consumerism to the post-war era.' },
  'traffic':       { type:'Kelime', tr:'trafik, araç yoğunluğu',                ex:'Fifteen-minute cities can alleviate traffic congestion.' },
  'trail':         { type:'Kelime', tr:'patika, iz yolu; iz',                    ex:'Mia loves to explore the forest trails.' },
  'transform':     { type:'Kelime', tr:'dönüştürmek; köklü değişim yapmak',    ex:'Behavioural economics has transformed our understanding of markets.' },
  'transition':    { type:'Kelime', tr:'geçiş, dönüşüm; geçiş süreci',         ex:'The energy transition is a complex undertaking.' },
  'transparency':  { type:'Kelime', tr:'şeffaflık; saydamlık',                  ex:'Transparency in AI decision-making is essential.' },
  'twenty':        { type:'Kelime', tr:'yirmi',                                   ex:'At mile twenty, she hit the wall.' },
  'ultimate':      { type:'Kelime', tr:'en yüksek, nihai, mutlak',              ex:'Balancing progress with responsibility is the ultimate challenge.' },
  'uncheck':       { type:'Kelime', tr:'denetimsiz; serbest bırakmak',          ex:'Overconsumption left unchecked leads to environmental damage.' },
  'undergo':       { type:'Kelime', tr:'geçirmek, maruz kalmak',                ex:'Architecture is undergoing a paradigm shift.' },
  'underlying':    { type:'Kelime', tr:'altta yatan, temel niteliğindeki',       ex:'Epigenetics doesn\'t alter the underlying DNA sequence.' },
  'understand':    { type:'Kelime', tr:'anlamak, kavramak',                      ex:'She was glad the others understood her point.' },
  'unfocused':     { type:'Kelime', tr:'odaksız, dağınık dikkatli',             ex:'Relaxed, unfocused mental states facilitate creative thinking.' },
  'unprecedented': { type:'Kelime', tr:'eşi görülmemiş, benzersiz, tarihin ilki', ex:'Globalisation brought an unprecedented exchange of ideas.' },
  'vacation':      { type:'Kelime', tr:'tatil, izin; tatile çıkma',             ex:'They planned a vacation to a remote mountain village.' },
  'version':       { type:'Kelime', tr:'versiyon, sürüm; biçim',               ex:'Weaker versions of the hypothesis simply claim language influences thought.' },
  'vertical':      { type:'Kelime', tr:'dikey, düşey',                           ex:'Vertical gardens help reduce the carbon footprint of buildings.' },
  'visitor':       { type:'Kelime', tr:'ziyaretçi, misafir',                    ex:'The librarians are always ready to assist visitors.' },
  'volume':        { type:'Kelime', tr:'hacim; ses yüksekliği; cilt (kitap)',   ex:'The fashion industry generates enormous volumes of textile waste.' },
  'wakefulness':   { type:'Kelime', tr:'uyanıklık, uyanık olma hali',           ex:'Sleep was long regarded as a mere absence of wakefulness.' },
  'ways':          { type:'Kelime', tr:'yollar, biçimler, yöntemler',           ex:'Qubits can be correlated in ways that have no classical equivalent.' },
  'weak':          { type:'Kelime', tr:'zayıf, güçsüz, kırılgan',              ex:'Weaker versions of the hypothesis are more widely accepted.' },
  'wear':          { type:'Kelime', tr:'giymek; aşınmak; üstünde taşımak',     ex:'Tom always wears a helmet to stay safe.' },
  'welcome':       { type:'Kelime', tr:'hoş geldin; memnuniyetle karşılamak',   ex:'Even the quietest students felt welcome in the new class.' },
  'wet':           { type:'Kelime', tr:'ıslak, nemli; ıslatmak',               ex:'The dog was wet and shivering.' },
  'whose':         { type:'Kelime', tr:'kimin; kimin ki, hangi kişinin',        ex:'Debates over whose version of the past defines heritage.' },
  'wifi':          { type:'Kelime', tr:'kablosuz internet (Wi-Fi)',              ex:'The café began offering free Wi-Fi to attract customers.' },
  'yogurt':        { type:'Kelime', tr:'yoğurt',                                 ex:'She had yogurt and fruit for breakfast.' },

  // ── Frequency-3 catch-all batch ─────────────────────────────
  'become':        { type:'Kelime', tr:'olmak, haline gelmek',                   ex:'She wanted to become a writer one day.' },
  'belong':        { type:'Kelime', tr:'ait olmak; mensup olmak',                ex:'The scarf belonged to someone who cared.' },
  'born':          { type:'Kelime', tr:'doğmuş; doğuştan gelen',                ex:'He was born with a natural gift for languages.' },
  'bought':        { type:'Kelime', tr:'satın aldı (buy geçmişi)',               ex:'He bought the wood and tools he needed.' },
  'broad':         { type:'Kelime', tr:'geniş, kapsamlı, genel',                ex:'She has a broad knowledge of history.' },
  'check':         { type:'Kelime', tr:'kontrol etmek; çek; denetlemek',        ex:'She checked the dog\'s collar and found a phone number.' },
  'clear':         { type:'Kelime', tr:'açık, net; temizlemek; berrak',         ex:'It is rarely clear who bears responsibility.' },
  'context':       { type:'Kelime', tr:'bağlam, ortam, durum',                  ex:'Historical wisdom must be understood in its context.' },
  'create':        { type:'Kelime', tr:'oluşturmak, yaratmak, meydana getirmek', ex:'Newsfeeds create epistemic bubbles.' },
  'cross':         { type:'Kelime', tr:'geçmek; çapraz; kızgın',               ex:'She crossed the finish line in four hours.' },
  'current':       { type:'Kelime', tr:'mevcut, şimdiki; akım, cereyan',       ex:'Current approaches to AI regulation are still evolving.' },
  'cut':           { type:'Kelime', tr:'kesmek; kesinti; kesim',                ex:'He learned that cutting a piece short meant starting again.' },
  'deeply':        { type:'Kelime', tr:'derinden, derin biçimde',               ex:'The story moved her deeply.' },
  'degree':        { type:'Kelime', tr:'derece; diploma; ölçü',                 ex:'To a large degree, culture shapes our habits.' },
  'despite':       { type:'Kelime', tr:'-e rağmen, -e karşın',                  ex:'Despite the rise of digital media, libraries remain vital.' },
  'draw':          { type:'Kelime', tr:'çekmek; çizmek; berabere',             ex:'Political philosophy draws on the social contract.' },
  'due':           { type:'Kelime', tr:'nedeniyle; beklenen, vadesi gelen',     ex:'Due to the rain, she decided to stay inside.' },
  'employ':        { type:'Kelime', tr:'çalıştırmak; kullanmak',                ex:'Platform designers employ clever psychological techniques.' },
  'enough':        { type:'Kelime', tr:'yeterli, yeterince',                    ex:'She had just enough money to pay at the checkout.' },
  'especially':    { type:'Kelime', tr:'özellikle, bilhassa',                   ex:'This is especially true for younger generations.' },
  'exact':         { type:'Kelime', tr:'kesin, tam; tam olarak',                ex:'She found the exact information she needed.' },
  'fail':          { type:'Kelime', tr:'başarısız olmak; vazgeçmek',            ex:'His first attempt to bake bread failed.' },
  'fair':          { type:'Kelime', tr:'adil, hakkaniyetli',                    ex:'Products should be made under fair labour conditions.' },
  'familiar':      { type:'Kelime', tr:'tanıdık, aşina; olağan',               ex:'Six months later, the city felt familiar.' },
  'far':           { type:'Kelime', tr:'uzak, ırak; çok, oldukça',              ex:'Grandma lives far away.' },
  'fast':          { type:'Kelime', tr:'hızlı; hızlıca; oruç tutmak',          ex:'The bus is the fastest way to get to college.' },
  'feature':       { type:'Kelime', tr:'özellik; öne çıkarmak',                ex:'Variable reward features are designed to maximise engagement.' },
  'finance':       { type:'Kelime', tr:'finans, maliye; para kaynağı',         ex:'She had to manage the finances of the new café.' },
  'firm':          { type:'Kelime', tr:'şirket; sağlam, kesin',                ex:'He now works as a bookkeeper for a local firm.' },
  'flash':         { type:'Kelime', tr:'parlamak; ani parlaklık',              ex:'Creativity is not a spontaneous flash of inspiration.' },
  'floor':         { type:'Kelime', tr:'yer, zemin; kat',                      ex:'The children sat quietly on the floor.' },
  'frame':         { type:'Kelime', tr:'çerçeve; çerçevelemek; kavramsal çerçeve', ex:'New frameworks acknowledge the validity of climate grief.' },
  'frequently':    { type:'Kelime', tr:'sık sık, çoğu zaman',                  ex:'She checked her phone frequently during the break.' },
  'fundamental':   { type:'Kelime', tr:'temel, esaslı',                         ex:'The energy transition is a fundamental challenge.' },
  'further':       { type:'Kelime', tr:'daha ileri; fazladan; geliştirmek',    ex:'A further quantum property is entanglement.' },
  'gain':          { type:'Kelime', tr:'kazanmak, elde etmek',                  ex:'Loss aversion means we fear losses more than we value gains.' },
  'grade':         { type:'Kelime', tr:'not, derece; sınıf; sınıflandırmak',  ex:'All four students improved their grade significantly.' },
  'grow':          { type:'Kelime', tr:'büyümek, gelişmek; yetiştirmek',       ex:'She watched her freelance client list grow steadily.' },
  'half':          { type:'Kelime', tr:'yarım, yarı',                           ex:'In the first half, the score was zero to zero.' },
  'handle':        { type:'Kelime', tr:'tutmak; ele almak; sap',               ex:'She learned how to handle stress effectively.' },
  'harm':          { type:'Kelime', tr:'zarar, hasar; zarar vermek',           ex:'Sleep deprivation harms cognitive function.' },
  'hero':          { type:'Kelime', tr:'kahraman, baş kahraman',               ex:'Every story needs a hero to drive the narrative.' },
  'high':          { type:'Kelime', tr:'yüksek; yoğun; zirve',                 ex:'She held herself to high personal standards.' },
  'hold':          { type:'Kelime', tr:'tutmak; içermek; sahip olmak',        ex:'Cognitive dissonance is holding two contradictory beliefs.' },
  'homework':      { type:'Kelime', tr:'ev ödevi, ödev',                       ex:'She finished her homework before going to the park.' },
  'honest':        { type:'Kelime', tr:'dürüst, namuslu, açık sözlü',         ex:'Helen was always honest with Amara about her challenges.' },
  'hospital':      { type:'Kelime', tr:'hastane',                              ex:'She volunteered at the local hospital every Saturday.' },
  'household':     { type:'Kelime', tr:'hane, ev; ev halkı',                  ex:'Each household received a plot in the community garden.' },
  'identify':      { type:'Kelime', tr:'tanımlamak; belirlemek; kimliğini ortaya koymak', ex:'Seligman\'s model identifies five pillars of well-being.' },
  'include':       { type:'Kelime', tr:'içermek, dahil etmek; kapsamak',      ex:'The list included bread, milk, eggs, and fruit.' },
  'indicator':     { type:'Kelime', tr:'gösterge, belirteç, ölçüt',           ex:'Sleep quality is a key indicator of overall health.' },
  'inevitable':    { type:'Kelime', tr:'kaçınılmaz, zorunlu, önlenemez',      ex:'Hard determinists view every event as inevitable.' },
  'inform':        { type:'Kelime', tr:'bilgilendirmek, haber vermek',         ex:'An informed citizenry is vital for a functioning democracy.' },
  'injury':        { type:'Kelime', tr:'yaralanma, hasar',                     ex:'She pushed through knee pain and risked further injury.' },
  'inscribe':      { type:'Kelime', tr:'kayıt altına almak; yazmak, nakşetmek', ex:'Cultural memory is inscribed in monuments and rituals.' },
  'interpret':     { type:'Kelime', tr:'yorumlamak; tercüme etmek',            ex:'Societies record, interpret, and transmit the past.' },
  'issue':         { type:'Kelime', tr:'mesele, sorun; sayı; çıkarmak',       ex:'Climate change is a critical issue for all nations.' },
  'ladder':        { type:'Kelime', tr:'merdiven; kariyer basamağı',           ex:'He climbed the career ladder one step at a time.' },
  'land':          { type:'Kelime', tr:'kara, arazi; inmek; çıkarmak',        ex:'He found a suitable location of land for his business.' },
  'largely':       { type:'Kelime', tr:'büyük ölçüde, genel olarak',          ex:'The basal ganglia operates largely beneath awareness.' },
  'latter':        { type:'Kelime', tr:'sonraki, ikinci; sonradan belirtilen', ex:'The latter is particularly significant for creativity.' },
  'launch':        { type:'Kelime', tr:'başlatmak; fırlatmak; lansman',       ex:'The council launched a campaign for the community garden.' },
  'lean':          { type:'Kelime', tr:'yaslanmak; eğilmek; yağsız',          ex:'She leaned on her mentor during difficult times.' },
  'licence':       { type:'Kelime', tr:'lisans, izin belgesi',                 ex:'He got his driving licence at the age of eighteen.' },
  'limited':       { type:'Kelime', tr:'sınırlı, kısıtlı',                    ex:'The school had limited supplies and no electricity.' },
  'link':          { type:'Kelime', tr:'bağlantı, halka; bağlamak',           ex:'Cultural memory links the present to a meaningful past.' },
  'listen':        { type:'Kelime', tr:'dinlemek, kulak vermek',               ex:'Ali listens carefully and learns many things.' },
  'literally':     { type:'Kelime', tr:'lafzen, sözcük anlamıyla; gerçekten', ex:'The village was literally cut off from the city.' },
  'load':          { type:'Kelime', tr:'yüklemek; yük; veri yüklemek',        ex:'Daniel loaded it with his books and stood back to admire.' },
  'locate':        { type:'Kelime', tr:'konumlandırmak; bulmak',              ex:'She found a suitable location in the town centre.' },
  'locked':        { type:'Kelime', tr:'kilitli; sıkışmış; sabitlenmiş',      ex:'They felt locked into a routine they couldn\'t escape.' },
  'logic':         { type:'Kelime', tr:'mantık; akıl yürütme',                ex:'Classical economics assumed people follow simple logic.' },
  'loud':          { type:'Kelime', tr:'yüksek sesli, gürültülü',             ex:'The crowd was loud and full of energy.' },
  'make':          { type:'Kelime', tr:'yapmak, üretmek; olmak',              ex:'She makes notes in a small notebook as she reads.' },
  'manage':        { type:'Kelime', tr:'yönetmek; başarmak; idare etmek',     ex:'She had to manage the finances and hire staff.' },
  'maximum':       { type:'Kelime', tr:'maksimum, azami; en yüksek',          ex:'Platform designers try to maximise engagement.' },
  'memory':        { type:'Kelime', tr:'hafıza, bellek; anı',                 ex:'Sleep plays a critical role in memory consolidation.' },
  'mention':       { type:'Kelime', tr:'bahsetmek, söz etmek',                ex:'She mentioned the hidden waterfall to her friends.' },
  'message':       { type:'Kelime', tr:'mesaj, ileti; haber',                 ex:'She sent a message to the owner of the dog.' },
  'mind':          { type:'Kelime', tr:'akıl, zihin; önem vermek',            ex:'Going for a walk helped clear her mind.' },
  'miss':          { type:'Kelime', tr:'özlemek; kaçırmak; bayan',           ex:'She missed her grandmother when she was far away.' },
  'mix':           { type:'Kelime', tr:'karıştırmak; karışım',                ex:'They mixed butter, sugar, and flour together.' },
  'mode':          { type:'Kelime', tr:'mod, kip; yöntem; biçim',            ex:'The default mode network is active during relaxation.' },
  'moment':        { type:'Kelime', tr:'an, an; önem',                        ex:'He remembered at the last moment.' },
  'moral':         { type:'Kelime', tr:'ahlaki; ders, sonuç',                 ex:'Stories help establish moral norms in communities.' },
  'motivate':      { type:'Kelime', tr:'motive etmek, harekete geçirmek',    ex:'The other students kept him motivated.' },
  'motivation':    { type:'Kelime', tr:'motivasyon, güdü',                    ex:'Intrinsic motivation is key for genuine creativity.' },
  'move':          { type:'Kelime', tr:'hareket etmek; taşınmak; etkilemek', ex:'He moved to the city for work.' },
  'multiple':      { type:'Kelime', tr:'çoklu, birden fazla; katlar',        ex:'Stories activate multiple neural networks simultaneously.' },
  'mutual':        { type:'Kelime', tr:'karşılıklı, ortak, ikili',            ex:'The language exchange was a mutual learning experience.' },
  'nearby':        { type:'Kelime', tr:'yakında, civarda',                    ex:'The owner told them about a hidden waterfall nearby.' },
  'neither':       { type:'Kelime', tr:'ne... ne de; ikisi de değil',         ex:'She spoke neither Arabic nor French.' },
  'next':          { type:'Kelime', tr:'sonraki, gelecek; bitişik',          ex:'She could not wait to come back to school the next day.' },
  'night':         { type:'Kelime', tr:'gece; gece vakti',                    ex:'At night, they sit around the fire and tell stories.' },
  'norm':          { type:'Kelime', tr:'norm, standart; toplumsal kural',    ex:'Stories help establish moral norms in a community.' },
  'notion':        { type:'Kelime', tr:'kavram, fikir; kanı',                 ex:'The notion of free will has been debated for centuries.' },
  'now':           { type:'Kelime', tr:'şimdi, şu an; artık',                 ex:'She is now working as a graphic designer.' },
  'objective':     { type:'Kelime', tr:'amaç; tarafsız; nesnel',             ex:'The objective of the meeting was to establish ground rules.' },
  'often':         { type:'Kelime', tr:'sık sık, çoğunlukla',               ex:'He often skipped meals because he was too busy.' },
  'once':          { type:'Kelime', tr:'bir kez; bir zamanlar; -dığında',    ex:'Once the cookies were ready, the whole house smelled wonderful.' },
  'operation':     { type:'Kelime', tr:'operasyon, işlem; çalışma biçimi',   ex:'Automation reduces operational costs.' },
  'opinion':       { type:'Kelime', tr:'görüş, kanı, fikir',                 ex:'Public opinion on the issue has shifted over time.' },
  'opportunity':   { type:'Kelime', tr:'fırsat, imkân',                      ex:'She seized the opportunity to enter the exhibition.' },
  'original':      { type:'Kelime', tr:'özgün, orijinal; asıl, ilk',        ex:'She kept the original design but added her own touch.' },
  'pain':          { type:'Kelime', tr:'ağrı, acı',                           ex:'She pushed through knee pain and bad weather.' },
  'particular':    { type:'Kelime', tr:'belirli, özel, özgün; titiz',        ex:'Intrinsic motivation is particularly significant.' },
  'pattern':       { type:'Kelime', tr:'örüntü, kalıp; desen; alışkanlık',  ex:'Language influences certain cognitive patterns.' },
  'permanent':     { type:'Kelime', tr:'kalıcı, sürekli, daimi',             ex:'No habit is truly permanent; they can be overwritten.' },
  'phenomenon':    { type:'Kelime', tr:'olgu, fenomen; önemli olay',        ex:'Consumerism is a relatively recent historical phenomenon.' },
  'place':         { type:'Kelime', tr:'yer, mekân; koymak; sıralama',      ex:'The park is their favourite place to relax.' },
  'plan':          { type:'Kelime', tr:'plan; planlamak',                    ex:'She followed a sixteen-week training plan.' },
  'planet':        { type:'Kelime', tr:'gezegen',                             ex:'The guide showed them how planets move around the sun.' },
  'point':         { type:'Kelime', tr:'nokta; puan; göstermek',             ex:'It was the lowest point of her life.' },
  'poll':          { type:'Kelime', tr:'anket, kamuoyu yoklaması',           ex:'Public polls showed strong support for the initiative.' },
  'poor':          { type:'Kelime', tr:'fakir; zayıf; zavallı',              ex:'Poor sleep quality affects both mood and performance.' },
  'practical':     { type:'Kelime', tr:'pratik, uygulamalı; kullanışlı',    ex:'She developed practical strategies for managing stress.' },
  'pressure':      { type:'Kelime', tr:'baskı, stres; basınç',              ex:'She refused to give in to the pressure.' },
  'probably':      { type:'Kelime', tr:'muhtemelen, büyük ihtimalle',       ex:'She would probably feel better after some rest.' },
  'profession':    { type:'Kelime', tr:'meslek, uğraş',                      ex:'Teaching is a demanding but rewarding profession.' },
  'purpose':       { type:'Kelime', tr:'amaç, hedef; niyetle',              ex:'She found a new sense of purpose through volunteering.' },
  'push':          { type:'Kelime', tr:'itmek; zorlamak; sürmek',           ex:'She pushed through knee pain and bad weather.' },
  'reasonable':    { type:'Kelime', tr:'makul, mantıklı; uygun fiyatlı',    ex:'A reasonable approach is always better than an extreme one.' },
  'relation':      { type:'Kelime', tr:'ilişki, bağ; akraba',               ex:'The relation between language and thought is contested.' },
  'relevant':      { type:'Kelime', tr:'ilgili, geçerli, uygun',            ex:'Historical wisdom remains highly relevant today.' },
  'repeat':        { type:'Kelime', tr:'tekrarlamak; yinelemek',             ex:'When a behaviour is repeated, neural pathways strengthen.' },
  'report':        { type:'Kelime', tr:'rapor; haberdar etmek',              ex:'Stanford\'s report found students struggled with digital literacy.' },
  'require':       { type:'Kelime', tr:'gerektirmek, ihtiyaç duymak',       ex:'The project requires international cooperation.' },
  'respect':       { type:'Kelime', tr:'saygı; saygı göstermek',            ex:'She earned the respect of all her colleagues.' },
  'responsible':   { type:'Kelime', tr:'sorumlu, hesap verebilir',          ex:'When an algorithm makes an error, who is responsible?' },
  'run':           { type:'Kelime', tr:'koşmak; işletmek; aday olmak',      ex:'She always dreamed of running her own café.' },
  'safe':          { type:'Kelime', tr:'güvenli, sağlam; kasa',             ex:'Tom always wears a helmet to stay safe.' },
  'same':          { type:'Kelime', tr:'aynı, özdeş',                       ex:'She always sits in the same seat near the window.' },
  'scale':         { type:'Kelime', tr:'ölçek; büyüklük; ölçmek',          ex:'Social biases can be perpetuated at scale.' },
  'screen':        { type:'Kelime', tr:'ekran; perde; taramak',             ex:'She set limits on her daily screen time.' },
  'sector':        { type:'Kelime', tr:'sektör; alan; bölüm',               ex:'Technology creates jobs in new sectors.' },
  'seek':          { type:'Kelime', tr:'aramak; peşinden gitmek',           ex:'Stoics seek a state of mental tranquility.' },
  'self':          { type:'Kelime', tr:'benlik, kişilik; kendi',            ex:'Stoicism emphasises self-control over emotions.' },
  'senior':        { type:'Kelime', tr:'kıdemli, yaşlı; üst düzey',       ex:'Helen was a senior colleague who became Amara\'s mentor.' },
  'separate':      { type:'Kelime', tr:'ayırmak; ayrı, bağımsız',         ex:'She kept her work and personal life separate.' },
  'serve':         { type:'Kelime', tr:'hizmet etmek; işe yaramak',        ex:'Cultural memory serves to anchor group identity.' },
  'set':           { type:'Kelime', tr:'koymak, ayarlamak; set',           ex:'She set strict boundaries around work hours.' },
  'shore':         { type:'Kelime', tr:'kıyı, sahil',                       ex:'They collected shells along the shore.' },
  'significant':   { type:'Kelime', tr:'önemli, kayda değer',              ex:'The changes were significant and long-lasting.' },
  'site':          { type:'Kelime', tr:'site; yer, mekân',                 ex:'She built a simple website for her jewellery business.' },
  'sixteen':       { type:'Kelime', tr:'on altı',                           ex:'She followed a sixteen-week training plan.' },
  'smart':         { type:'Kelime', tr:'zeki, akıllı; şık; akıllı (teknoloji)', ex:'She wore her smartest outfit to the interview.' },
  'somehow':       { type:'Kelime', tr:'bir şekilde, bir yolunu bulup',    ex:'She managed to finish the project somehow.' },
  'sort':          { type:'Kelime', tr:'sıralamak; tür, çeşit',           ex:'The algorithm sorts the data in seconds.' },
  'specific':      { type:'Kelime', tr:'özgül, belirli',                   ex:'She gave specific examples from her past work.' },
  'status':        { type:'Kelime', tr:'statü, konum; durum',              ex:'Consumerism turns goods into markers of identity and status.' },
  'steady':        { type:'Kelime', tr:'istikrarlı, sabit; yavaş yavaş',  ex:'Her client list grew steadily over three years.' },
  'step':          { type:'Kelime', tr:'adım; aşama; basamak',             ex:'The first step was to measure each piece carefully.' },
  'stick':         { type:'Kelime', tr:'yapıştırmak; çubuk; devam etmek', ex:'She decided to stick to her plan no matter what.' },
  'stored':        { type:'Kelime', tr:'depolanmış, saklanmış',            ex:'Cultural memory is not stored biologically.' },
  'stream':        { type:'Kelime', tr:'dere, akarsu; akış; yayın',       ex:'They pitched a tent beside a stream.' },
  'strict':        { type:'Kelime', tr:'sıkı, katı, titiz',                ex:'She set strict boundaries around work hours.' },
  'strong':        { type:'Kelime', tr:'güçlü, kuvvetli, sağlam',         ex:'Some days she felt strong; other days she struggled.' },
  'student':       { type:'Kelime', tr:'öğrenci',                          ex:'Several students formed a study group for exams.' },
  'submit':        { type:'Kelime', tr:'teslim etmek; boyun eğmek',       ex:'The project was submitted on time.' },
  'sufficient':    { type:'Kelime', tr:'yeterli, kâfi',                    ex:'A moderate income is sufficient for basic well-being.' },
  'summer':        { type:'Kelime', tr:'yaz',                               ex:'His father taught him how to ride last summer.' },
  'support':       { type:'Kelime', tr:'desteklemek; destek, yardım',     ex:'He founded a charity to support rural schools.' },
  'survive':       { type:'Kelime', tr:'hayatta kalmak; atlatmak',        ex:'The company survived the financial crisis.' },
  'take':          { type:'Kelime', tr:'almak; götürmek; sürmek',          ex:'She took a six-month break to prove her business idea.' },
  'talent':        { type:'Kelime', tr:'yetenek, kabiliyet',               ex:'Everyone has a unique talent waiting to be discovered.' },
  'target':        { type:'Kelime', tr:'hedef; hedeflemek',                ex:'The campaign targeted younger consumers.' },
  'task':          { type:'Kelime', tr:'görev, iş, ödev',                  ex:'Nina broke the project into smaller tasks.' },
  'tend':          { type:'Kelime', tr:'eğiliminde olmak; ilgilenmek',    ex:'People tend to rely on the first piece of information they see.' },
  'term':          { type:'Kelime', tr:'terim; dönem; koşul',              ex:'Psychologists use the term eco-anxiety for climate grief.' },
  'text':          { type:'Kelime', tr:'metin; mesaj',                     ex:'Cultural memory is inscribed in texts and rituals.' },
  'themselves':    { type:'Kelime', tr:'kendileri; bizzat kendileri',      ex:'She asked students to share something about themselves.' },
  'threat':        { type:'Kelime', tr:'tehdit; tehlike',                   ex:'Climate change is a genuine threat to the planet.' },
  'tight':         { type:'Kelime', tr:'sıkı, dar; gergin',               ex:'She kept a tight schedule throughout training.' },
  'tray':          { type:'Kelime', tr:'tepsi, servis tabağı',             ex:'She put the cookies on a tray before serving them.' },
  'treat':         { type:'Kelime', tr:'muamele etmek; tedavi; ikram',    ex:'Society treats rest as a sign of weakness.' },
  'trend':         { type:'Kelime', tr:'trend, eğilim; akım',             ex:'The trend towards sustainable living is growing.' },
  'trouble':       { type:'Kelime', tr:'sorun, güçlük; rahatsız etmek',  ex:'She had trouble sleeping during exam season.' },
  'trust':         { type:'Kelime', tr:'güvenmek; güven',                  ex:'She trusted her mentor completely.' },
  'turn':          { type:'Kelime', tr:'dönmek; sıra; değişmek',         ex:'The leaves turn red and orange in autumn.' },
  'twice':         { type:'Kelime', tr:'iki kez, iki defa',               ex:'She checked the list twice before leaving.' },
  'type':          { type:'Kelime', tr:'tür, çeşit; tip; yazmak',        ex:'Researchers identify a specific type of emotional response.' },
  'typical':       { type:'Kelime', tr:'tipik, olağan, alışılagelen',     ex:'This is a typical example of loss aversion.' },
  'unequal':       { type:'Kelime', tr:'eşitsiz, farklı, dengesiz',       ex:'Income inequality is an unequal distribution of wealth.' },
  'unknown':       { type:'Kelime', tr:'bilinmeyen, tanınmayan',          ex:'She discovered three unknown artists at the festival.' },
  'useful':        { type:'Kelime', tr:'kullanışlı, yararlı, faydalı',    ex:'Quantum computers are particularly useful for cryptography.' },
  'usual':         { type:'Kelime', tr:'olağan, alışılagelen, her zamanki', ex:'She sat at her usual table near the window.' },
  'value':         { type:'Kelime', tr:'değer; önem vermek',               ex:'She learned to value rest as much as hard work.' },
  'vary':          { type:'Kelime', tr:'değişmek; farklılık göstermek',   ex:'Results vary widely across different studies.' },
  'vast':          { type:'Kelime', tr:'geniş, büyük, engin',             ex:'The library has a vast collection of literature.' },
  'view':          { type:'Kelime', tr:'görüş; manzara; izlemek',        ex:'Neuroscience has overturned our view of sleep.' },
  'village':       { type:'Kelime', tr:'köy, kasaba',                      ex:'He got lost in a small mountain village.' },
  'volunteer':     { type:'Kelime', tr:'gönüllü; gönüllü olmak',         ex:'Volunteers cleared the disused car park space.' },
  'wage':          { type:'Kelime', tr:'ücret, maaş; yürütmek',          ex:'A universal basic wage might prevent economic disenfranchisement.' },
  'whole':         { type:'Kelime', tr:'bütün, tüm; bir bütün olarak',   ex:'The whole house smelled wonderful.' },
  'wide':          { type:'Kelime', tr:'geniş, enli; yaygın',             ex:'There is a wide range of books to choose from.' },
  'willing':       { type:'Kelime', tr:'istekli, gönüllü, razı',         ex:'She was willing to try something new every week.' },
  'wonder':        { type:'Kelime', tr:'merak etmek; hayranlık; mucize', ex:'She wondered who had left the mysterious package.' },
  'wooden':        { type:'Kelime', tr:'ahşap, tahta; tahta gibi',        ex:'He put the wooden bookshelf in his home office.' },
  'wrote':         { type:'Kelime', tr:'yazdı (write geçmişi)',           ex:'She wrote a poem and read it to her grandmother.' },

  // ── Final coverage batch ─────────────────────────────────────────────
  'long-term':     { type:'Kelime', tr:'uzun vadeli, uzun süreli',                  ex:'Autonomy is the strongest predictor of long-term happiness.' },
  'well-being':    { type:'Kelime', tr:'esenlik, refah, iyi oluş hali',             ex:'The science of well-being examines what makes us flourish.' },
  'caf':           { type:'Kelime', tr:'kafe, kahvehane (café)',                     ex:'She stopped at a small café and asked for directions.' },
  'cafe':          { type:'Kelime', tr:'kafe, kahvehane',                            ex:'She stopped at a local café.' },
  'center':        { type:'Kelime', tr:'merkez (Amerikan yazımı = centre)',          ex:'She found a suitable location in the city center.' },
  'eventually':    { type:'Kelime', tr:'sonunda, eninde sonunda',                    ex:'Eventually, she started making friends in the new city.' },
  'external':      { type:'Kelime', tr:'dış, harici; dışarıdan gelen',              ex:'External rewards can undermine intrinsic motivation.' },
  'favorite':      { type:'Kelime', tr:'favori, gözde (Amerikan yazımı)',           ex:'Camping is her favorite holiday.' },
  'fifteen':       { type:'Kelime', tr:'on beş',                                    ex:'She arrived fifteen minutes early for the interview.' },
  'gallery':       { type:'Kelime', tr:'galeri, sanat galerisi',                    ex:'Seeing her work on a gallery wall changed something in her.' },
  'longer':        { type:'Kelime', tr:'daha uzun; artık … değil (no longer)',      ex:'The platform keeps users engaged for longer.' },
  'planner':       { type:'Kelime', tr:'planlayıcı, planlamacı',                    ex:'City planners face the challenge of providing adequate infrastructure.' },
  'previous':      { type:'Kelime', tr:'önceki, geçmiş, daha önceki',              ex:'All four students achieved stronger results than the previous year.' },
  'profound':      { type:'Kelime', tr:'derin, köklü; büyük etkili',               ex:'Epigenetics has profoundly challenged assumptions about genetic fate.' },
  'refer':         { type:'Kelime', tr:'atıfta bulunmak; göndermek; ifade etmek',  ex:'Climate grief refers to the fear caused by environmental destruction.' },
  'state':         { type:'Kelime', tr:'durum, hal; devlet; belirtmek',             ex:'Stoics seek to achieve a state of mental tranquility.' },
  'systematic':    { type:'Kelime', tr:'sistematik, düzenli, metodlu',              ex:'Human decision-making is systematically biased.' },
  'thank':         { type:'Kelime', tr:'teşekkür etmek; teşekkürler',              ex:'He came to pick up the dog and thanked Emma warmly.' },
  'widespread':    { type:'Kelime', tr:'yaygın, geniş çaplı',                       ex:'AI could cause widespread economic disenfranchisement.' },
  'act':           { type:'Kelime', tr:'hareket etmek; eylem; kanun; davranmak',   ex:'Classical economics assumed individuals always act rationally.' },
  'adopt':         { type:'Kelime', tr:'benimsemek, kabul etmek; evlat edinmek',   ex:'Societies must adopt new approaches to energy.' },
  'birthday':      { type:'Kelime', tr:'doğum günü',                                ex:'It was Lila\'s eighth birthday.' },
  'bookshelf':     { type:'Kelime', tr:'kitaplık, kitap rafı',                      ex:'Daniel wanted to build a bookshelf for his home office.' },
  'build':         { type:'Kelime', tr:'inşa etmek, yapmak; geliştirmek',          ex:'She helped him dig new beds and build raised garden beds.' },
  'clock':         { type:'Kelime', tr:'saat (duvar/masa)',                          ex:'The baker has fresh bread ready by eight o\'clock.' },
  'colorful':      { type:'Kelime', tr:'renkli, canlı (Amerikan yazımı)',           ex:'The house was decorated with colorful streamers.' },
  'company':       { type:'Kelime', tr:'şirket; arkadaşlık',                        ex:'She researched the company thoroughly.' },
  'consequential': { type:'Kelime', tr:'önemli, sonuç doğuran',                     ex:'The energy transition is a consequential undertaking.' },
  'constant':      { type:'Kelime', tr:'sabit, değişmez; sürekli',                 ex:'After years of constant scrolling, she took a break.' },
  'content':       { type:'Kelime', tr:'içerik; memnun; tatmin olmak',             ex:'Students struggled to identify sponsored content.' },
  'decorate':      { type:'Kelime', tr:'süslemek, dekore etmek',                   ex:'Her mum had decorated the house with balloons.' },
  'deep':          { type:'Kelime', tr:'derin; derinlemesine; koyu (renk)',         ex:'Books can spark such deep conversations.' },
  'delicious':     { type:'Kelime', tr:'lezzetli, nefis',                           ex:'At the end of summer, they make big, delicious meals.' },
  'demonstrate':   { type:'Kelime', tr:'göstermek, kanıtlamak; gösteri yapmak',    ex:'Research demonstrates that well-being is not only about wealth.' },
  'depend':        { type:'Kelime', tr:'bağlı olmak, dayalı olmak; güvenmek',      ex:'Productivity depends on wellbeing, not just hard work.' },
  'dilemma':       { type:'Kelime', tr:'ikilem, çıkmaz',                            ex:'Gene editing raises profound ethical dilemmas.' },
  'dna':           { type:'Kelime', tr:'DNA (genetik bilginin taşıyıcısı)',         ex:'Epigenetics doesn\'t alter the underlying DNA sequence.' },
  'dress':         { type:'Kelime', tr:'elbise; giyinmek; hazırlamak',             ex:'She gets dressed and eats breakfast before leaving.' },
  'economist':     { type:'Kelime', tr:'ekonomist, iktisatçı',                      ex:'Economists warn against purely pessimistic forecasts.' },
  'egg':           { type:'Kelime', tr:'yumurta',                                   ex:'He almost forgot the eggs at the supermarket.' },
  'employee':      { type:'Kelime', tr:'çalışan, işçi, personel',                  ex:'Organisations where employees feel safe generate better outcomes.' },
  'enormous':      { type:'Kelime', tr:'devasa, muazzam, çok büyük',               ex:'The crowd was enormous and full of energy.' },
  'enter':         { type:'Kelime', tr:'girmek; katılmak; başvurmak',              ex:'Her mentor encouraged her to enter the competition.' },
  'epigenetic':    { type:'Kelime', tr:'epigenetik (gen ifadesini etkileyen)',      ex:'Trauma can be transmitted through epigenetic mechanisms.' },
  'explain':       { type:'Kelime', tr:'açıklamak, izah etmek',                    ex:'The default mode network explains creative thinking.' },
  'gift':          { type:'Kelime', tr:'hediye; yetenek, armağan',                 ex:'She said it was the most thoughtful gift she had received.' },
  'globalisation': { type:'Kelime', tr:'küreselleşme',                              ex:'Globalisation has facilitated an unprecedented exchange of cultures.' },
  'increase':      { type:'Kelime', tr:'artmak, artırmak; artış',                  ex:'Technology exponentially increases productivity.' },
  'introduce':     { type:'Kelime', tr:'tanıştırmak; sunmak; başlatmak',          ex:'Helen introduced Amara to contacts across the organisation.' },
  'invite':        { type:'Kelime', tr:'davet etmek, çağırmak',                    ex:'The owner invited them to stay for dinner.' },
  'manual':        { type:'Kelime', tr:'manuel, elle yapılan; kılavuz',            ex:'Many manual occupations are being automated.' },
  'medical':       { type:'Kelime', tr:'tıbbi, sağlıkla ilgili',                   ex:'Biotechnology has led to unprecedented medical breakthroughs.' },
  'neuroscientific':{ type:'Kelime', tr:'nörobilimsel, beyin bilimiyle ilgili',    ex:'The neuroscientific concept of the default mode network is key.' },
  'order':         { type:'Kelime', tr:'sipariş; düzen; emretmek; sıra',          ex:'She received over two hundred orders in a single weekend.' },
  'organised':     { type:'Kelime', tr:'düzenlenmiş, organize edilmiş',            ex:'The club organised monthly photo walks around the city.' },
  'panic':         { type:'Kelime', tr:'panik, korku; paniğe kapılmak',            ex:'Instead of panicking, she accepted the confusion.' },
  'part':          { type:'Kelime', tr:'parça, bölüm; rol; kısmı',                ex:'Partly because they face a longer exposure to consequences.' },
  'pitch':         { type:'Kelime', tr:'çadır kurmak; saha; ton; pas',            ex:'They pitch a tent beside a stream in the mountains.' },
  'practitioner':  { type:'Kelime', tr:'uygulayıcı; pratisyen hekim',             ex:'Mental health practitioners develop new frameworks.' },
  'private':       { type:'Kelime', tr:'özel, gizli; gizli tutan',                ex:'Marco had always kept his work private.' },
  'product':       { type:'Kelime', tr:'ürün, mal; sonuç',                         ex:'Products made under fair labour conditions.' },
  'profoundly':    { type:'Kelime', tr:'derinden, büyük ölçüde',                   ex:'Epigenetics has profoundly challenged old assumptions.' },
  'properly':      { type:'Kelime', tr:'gereği gibi, uygun şekilde',              ex:'AI, if properly governed, can reduce human bias.' },
  'qubit':         { type:'Kelime', tr:'kübit (kuantum bilgisayar birimi)',         ex:'Qubits exploit superposition to exist in multiple states.' },
  'rain':          { type:'Kelime', tr:'yağmur; yağmak',                            ex:'It was raining heavily outside all morning.' },
  'realise':       { type:'Kelime', tr:'fark etmek, anlamak; gerçekleştirmek',    ex:'He realised that stepping outside his comfort zone was rewarding.' },
  'relax':         { type:'Kelime', tr:'gevşemek, rahatlamak; dinlenmek',          ex:'Relaxed, unfocused mental states facilitate creative thinking.' },
  'rely':          { type:'Kelime', tr:'güvenmek, bel bağlamak; dayanmak',        ex:'He had to rely on creativity rather than technology.' },
  'remember':      { type:'Kelime', tr:'hatırlamak, anımsamak',                    ex:'He remembered at the last moment.' },
  'rest':          { type:'Kelime', tr:'dinlenme; geri kalanı; dinlenmek',         ex:'Society treats rest as a sign of weakness.' },
  'robust':        { type:'Kelime', tr:'güçlü, sağlam; dayanıklı',               ex:'A robust social safety net might prevent disenfranchisement.' },
  'runner':        { type:'Kelime', tr:'koşucu, yarışmacı',                        ex:'Thousands of runners lined up together on race day.' },
  'sang':          { type:'Kelime', tr:'şarkı söyledi (sing geçmişi)',            ex:'Everyone sang happy birthday.' },
  'scientist':     { type:'Kelime', tr:'bilim insanı, bilimci',                    ex:'Mia said she wanted to become a scientist one day.' },
  'secret':        { type:'Kelime', tr:'sır; gizli',                               ex:'The note was like a secret from a caring friend.' },
  'single':        { type:'Kelime', tr:'tek, bir; bekar; bireysel',               ex:'She received over two hundred orders in a single weekend.' },
  'small':         { type:'Kelime', tr:'küçük, ufak',                              ex:'She found a suitable location and signed a lease.' },
  'sore':          { type:'Kelime', tr:'ağrıyan, hassas; yara',                    ex:'She woke up with a sore throat and a headache.' },
  'special':       { type:'Kelime', tr:'özel, eşsiz; fevkalade',                  ex:'Seeing her work in a gallery was a special moment.' },
  'unexpected':    { type:'Kelime', tr:'beklenmedik, sürpriz',                     ex:'They discovered that the best adventures are unexpected.' },
  'unlike':        { type:'Kelime', tr:'-in aksine, -dan farklı olarak',           ex:'Unlike conventional anxiety, eco-anxiety is rational.' },
  'week':          { type:'Kelime', tr:'hafta',                                    ex:'She counts the weeks until she can visit her grandmother.' },
  'wore':          { type:'Kelime', tr:'giydi (wear geçmişi)',                    ex:'She wore her smartest outfit to the interview.' },
  'accept':        { type:'Kelime', tr:'kabul etmek; benimsemek',                  ex:'She accepted the confusion as part of the adventure.' },
  'account':       { type:'Kelime', tr:'hesap; açıklamak; saymak',               ex:'She opened accounts on several online platforms.' },
  'address':       { type:'Kelime', tr:'ele almak; adres; söylemek',              ex:'Society has barely begun to address these questions.' },
  'advisable':     { type:'Kelime', tr:'tavsiye edilir, akıllıca',                ex:'It is advisable to verify sources before sharing.' },
  'affect':        { type:'Kelime', tr:'etkilemek; duygu',                         ex:'Sleep deprivation affects judgement and stability.' },
  'agency':        { type:'Kelime', tr:'ajans; etkenlik; özne olmak',             ex:'She had her own agency with four members of staff.' },
  'alongside':     { type:'Kelime', tr:'yanında, ile birlikte',                   ex:'Green infrastructure should develop alongside affordable housing.' },
  'alteration':    { type:'Kelime', tr:'değişiklik, değişim, tadilat',            ex:'Epigenetics doesn\'t involve alterations to the DNA sequence.' },
  'ambitious':     { type:'Kelime', tr:'hırslı, iddialı; büyük hedefli',          ex:'She was ambitious enough to open her own business.' },
  'amplify':       { type:'Kelime', tr:'güçlendirmek, büyütmek; sesini yükseltmek', ex:'Globalisation enables marginalised communities to amplify their voices.' },
  'anchor':        { type:'Kelime', tr:'çıpa, langa; sabitlemek; demirlemek',     ex:'Cultural memory anchors a group\'s sense of identity.' },
  'anthropologist':{ type:'Kelime', tr:'antropolog, insanbilimci',                ex:'Anthropologists trace consumerism to the post-war era.' },
  'anyone':        { type:'Kelime', tr:'herhangi biri; kim olursa olsun',         ex:'She asked her neighbours, but anyone who knew was silent.' },
  'architect':     { type:'Kelime', tr:'mimar; tasarlayan kişi',                  ex:'Architects are incorporating biomimicry into their designs.' },
  'arousal':       { type:'Kelime', tr:'uyarılma, heyecanlanma; tahrik',          ex:'Platforms prioritise emotional arousal over accurate information.' },
  'artist':        { type:'Kelime', tr:'sanatçı, ressam, müzisyen',               ex:'She discovered three new artists she had never heard of.' },
  'asleep':        { type:'Kelime', tr:'uyuyor; uykuda',                           ex:'Mia always falls asleep looking at the stars.' },
  'assess':        { type:'Kelime', tr:'değerlendirmek, ölçmek; tahmin etmek',   ex:'Students struggled to assess the credibility of sources.' },
  'association':   { type:'Kelime', tr:'dernek; ilişkilendirme; bağlantı',       ex:'Habits are overwritten by new associations.' },
  'autonomous':    { type:'Kelime', tr:'özerk, bağımsız, kendi kendine yeten',    ex:'An autonomous system can make decisions without human input.' },
  'balance':       { type:'Kelime', tr:'denge; dengede tutmak; bakiye',          ex:'He learned that balancing work and rest improves productivity.' },
  'basal':         { type:'Kelime', tr:'bazal, taban; temel; kökle ilgili',      ex:'Habits are encoded in the basal ganglia of the brain.' },
  'base':          { type:'Kelime', tr:'taban, temel; dayandırmak',              ex:'Their argument was based on solid evidence.' },
  'battery':       { type:'Kelime', tr:'pil, akü; batarya',                       ex:'Advanced lithium-ion batteries are key for energy storage.' },
  'bear':          { type:'Kelime', tr:'taşımak; katlanmak; ayı',                ex:'It is rarely clear who bears responsibility.' },
  'beauty':        { type:'Kelime', tr:'güzellik, estetik',                       ex:'He was struck by the beauty of the gallery.' },
  'behave':        { type:'Kelime', tr:'davranmak; iyi davranmak',               ex:'The platform studies how users behave.' },
  'besides':       { type:'Kelime', tr:'bunun yanında; dışında; üstelik',        ex:'The tent was pitched beside a stream.' },
  'beyond':        { type:'Kelime', tr:'ötesinde, aşkın; öte',                   ex:'Well-being levels off beyond a moderate income.' },
  'bias':          { type:'Kelime', tr:'önyargı, yanlılık; saptırmak',           ex:'Automated systems risk encoding existing social biases.' },
  'bigger':        { type:'Kelime', tr:'daha büyük',                              ex:'Over time, Amara began taking on bigger responsibilities.' },
  'binary':        { type:'Kelime', tr:'ikili, ikilik; iki seçenekli',           ex:'Classical computers process information as binary units.' },
  'bind':          { type:'Kelime', tr:'bağlamak; ciltlemek; zorunlu kılmak',    ex:'Oral narratives bind communities together.' },
  'biomimicry':    { type:'Kelime', tr:'biyomimikri — doğadan ilham alan tasarım', ex:'Architects use biomimicry to regulate temperature naturally.' },
  'bit':           { type:'Kelime', tr:'bit (bilgisayarda en küçük veri birimi)', ex:'Classical computers process information as bits.' },
  'blow':          { type:'Kelime', tr:'üflemek; darbe; sert vuruş',             ex:'Lila blew out all eight candles in one breath.' },
  'body':          { type:'Kelime', tr:'vücut, beden; gövde',                    ex:'Sleep deprivation affects both body and immune response.' },
  'bold':          { type:'Kelime', tr:'cesur, gözüpek; kalın yazı',             ex:'She stopped doubting herself and started creating boldly.' },
  'bottle':        { type:'Kelime', tr:'şişe',                                    ex:'She refilled her water bottle before the walk.' },
  'branch':        { type:'Kelime', tr:'dal; şube; kolu',                        ex:'The company has branches in several cities.' },
  'brave':         { type:'Kelime', tr:'cesur, yiğit; cesaret etmek',            ex:'He says it was the bravest decision he ever made.' },
  'breath':        { type:'Kelime', tr:'nefes, soluk',                            ex:'Lila blew out all eight candles in one breath.' },
  'build':         { type:'Kelime', tr:'inşa etmek; geliştirmek',               ex:'He wanted to build a bookshelf for his home office.' },
  'bush':          { type:'Kelime', tr:'çalı, küçük ağaç; kır',                  ex:'They spotted a rabbit hiding behind the bushes.' },
  'calculation':   { type:'Kelime', tr:'hesaplama, hesap',                       ex:'Quantum computers can perform certain calculations much faster.' },
  'carbon-intensive': { type:'Kelime', tr:'karbon yoğun (yüksek CO₂ üreten)',   ex:'Decommissioning carbon-intensive infrastructure poses economic challenges.' },
  'care':          { type:'Kelime', tr:'umursamak; bakım; özen',                 ex:'The note said "From a friend who cares."' },
  'car':           { type:'Kelime', tr:'araba, otomobil',                         ex:'By reducing dependence on cars, cities can lower emissions.' },
  'cashier':       { type:'Kelime', tr:'kasiyer, veznedar',                      ex:'The cashier smiled and gave him his change.' },
  'cat':           { type:'Kelime', tr:'kedi',                                    ex:'She owned a cat and a small dog.' },
  'catastrophe':   { type:'Kelime', tr:'felaket, büyük yıkım',                  ex:'Scientists warn of catastrophic consequences if action is not taken.' },
  'cause':         { type:'Kelime', tr:'neden, sebep; yol açmak',               ex:'Cognitive dissonance causes mental discomfort.' },
  'celestial':     { type:'Kelime', tr:'göksel, gökyüzüne ait',                  ex:'They watched the celestial bodies move in the planetarium.' },
  'cell':          { type:'Kelime', tr:'hücre; pil; hücre (telefon)',            ex:'Hydrogen fuel cells are a promising clean energy source.' },
  'chain':         { type:'Kelime', tr:'zincir; dizi; zincirlemek',              ex:'Microplastics accumulate in the human food chain.' },
  'channel':       { type:'Kelime', tr:'kanal; yönlendirmek',                    ex:'Climate grief can be channelled into meaningful action.' },
  'chat':          { type:'Kelime', tr:'sohbet, muhabbet; sohbet etmek',        ex:'Rosa stops to chat with the baker for a few minutes.' },
  'checkout':      { type:'Kelime', tr:'kasa, çıkış; çıkış yapmak',            ex:'At the checkout, he counted his money carefully.' },
  'cheer':         { type:'Kelime', tr:'neşelendirmek; tezahürat; neşe',        ex:'Her little brother brought his toy to cheer her up.' },
  'chemical':      { type:'Kelime', tr:'kimyasal; kimyasal madde',               ex:'Chemical tags on the genome regulate gene expression.' },
  'citizenry':     { type:'Kelime', tr:'vatandaşlar topluluğu, yurttaşlar',     ex:'Building a digitally literate citizenry is essential.' },
  'civic':         { type:'Kelime', tr:'sivil, yurttaşlıkla ilgili',             ex:'Digital literacy is an indispensable civic competency.' },
  'claim':         { type:'Kelime', tr:'iddia etmek; hak talep etmek',          ex:'Lateral reading involves verifying claims with other sources.' },
  'clash':         { type:'Kelime', tr:'çatışmak; çatışma; uyuşmamak',         ex:'New information that clashes with existing beliefs causes dissonance.' },
  'clean':         { type:'Kelime', tr:'temiz; temizlemek; dürüst',             ex:'The transition to clean energy is complex but necessary.' },
  'client':        { type:'Kelime', tr:'müşteri, danışan, istemci',              ex:'Her client list grew steadily over three years.' },
  'climb':         { type:'Kelime', tr:'tırmanmak; tırmanış',                   ex:'She climbed the career ladder step by step.' },
  'cognition':     { type:'Kelime', tr:'biliş, zihinsel işlem',                  ex:'Universal aspects of human cognition operate across languages.' },
  'commemorate':   { type:'Kelime', tr:'anmak, hatırasını yaşatmak',            ex:'Cultural memory determines which events are commemorated.' },
  'commercial':    { type:'Kelime', tr:'ticari; reklam; kâra dayalı',           ex:'Traditions risk becoming commercially diluted.' },
  'compatible':    { type:'Kelime', tr:'uyumlu, bağdaşabilir',                   ex:'Compatibilists reconcile free will with determinism.' },
  'compelling':    { type:'Kelime', tr:'ikna edici, güçlü, zorlayıcı',          ex:'Politicians use compelling narratives to shape attitudes.' },
  'computational': { type:'Kelime', tr:'hesaplamalı, bilgisayarla ilgili',       ex:'Entanglement amplifies computational power enormously.' },
  'concentrate':   { type:'Kelime', tr:'yoğunlaşmak; konsantre olmak',          ex:'Media ownership is concentrated in a few corporations.' },
  'conceptualise': { type:'Kelime', tr:'kavramlaştırmak, zihinsel model oluşturmak', ex:'Language shapes how we conceptualise the world.' },
  'concern':       { type:'Kelime', tr:'endişe; ilgilendirmek; konu',           ex:'A further concern is the question of accountability.' },
  'confirm':       { type:'Kelime', tr:'onaylamak, doğrulamak',                  ex:'Longitudinal studies confirm the role of close relationships.' },
  'conflict':      { type:'Kelime', tr:'çatışma, anlaşmazlık; çatışmak',       ex:'Conflicting beliefs cause cognitive dissonance.' },
  'confront':      { type:'Kelime', tr:'yüzleşmek; karşılaşmak',               ex:'When confronted with new information, people use defence mechanisms.' },
  'confusion':     { type:'Kelime', tr:'kargaşa, karışıklık; yanılma',         ex:'She accepted the confusion as part of the adventure.' },
  'connect':       { type:'Kelime', tr:'bağlamak; iletişim kurmak; birleştirmek', ex:'The garden became a place where neighbours began to connect.' },
  'consider':      { type:'Kelime', tr:'düşünmek, dikkate almak; görmek',      ex:'Policymakers are considering legislative restrictions.' },
  'constitute':    { type:'Kelime', tr:'oluşturmak, teşkil etmek',             ex:'Microplastics constitute a severe environmental crisis.' },
  'construct':     { type:'Kelime', tr:'inşa etmek; kavramsal yapı',           ex:'The capacity to construct and deconstruct narratives is critical.' },
  'consult':       { type:'Kelime', tr:'danışmak, başvurmak',                   ex:'Lateral reading involves consulting independent sources.' },
  'consumerism':   { type:'Kelime', tr:'tüketimcilik; tüketim kültürü',         ex:'Consumerism is the cultural imperative to acquire goods.' },
  'contend':       { type:'Kelime', tr:'iddia etmek; yarışmak; mücadele etmek', ex:'Others contend that globalisation amplifies marginalised voices.' },
  'contentious':   { type:'Kelime', tr:'tartışmalı, çekişmeli',                 ex:'Free will remains one of philosophy\'s most contentious debates.' },
  'contest':       { type:'Kelime', tr:'yarışma; itiraz etmek; çekişmek',      ex:'The relationship between language and thought is contested.' },
  'contrast':      { type:'Kelime', tr:'zıtlık, karşıtlık; karşılaştırmak',   ex:'By contrast, quantum computers use qubits.' },
  'conventional':  { type:'Kelime', tr:'geleneksel, alışılagelen; uzlaşımsal', ex:'Unlike conventional anxiety, climate grief is a rational response.' },
  'convergence':   { type:'Kelime', tr:'yakınsama; birleşme; buluşma noktası', ex:'The convergence of AI and remote work is reshaping labour markets.' },
  'conversation':  { type:'Kelime', tr:'konuşma, sohbet',                       ex:'At first, the conversations were simple.' },
  'conversely':    { type:'Kelime', tr:'tam tersine, aksine',                   ex:'Conversely, improved nutrition can reverse epigenetic changes.' },
  'corporate':     { type:'Kelime', tr:'kurumsal, şirket; şirkete ait',        ex:'Corporate branding shapes consumer behaviour worldwide.' },
  'corporation':   { type:'Kelime', tr:'şirket, büyük anonim şirket',          ex:'Multinational corporations homogenise consumer behaviour.' },
  'correlate':     { type:'Kelime', tr:'bağıntılı olmak; ilişkilendirmek',     ex:'Qubits can be correlated in ways that have no classical equivalent.' },
  'country':       { type:'Kelime', tr:'ülke; kır, taşra',                      ex:'They drove across the country for two weeks.' },
  'count':         { type:'Kelime', tr:'saymak; güvenmek (count on)',           ex:'She counts the weeks until she can visit her grandmother.' },
  'cream':         { type:'Kelime', tr:'krema; krem; kremsi',                   ex:'She added cream to the soup.' },
  'creation':      { type:'Kelime', tr:'yaratma, oluşturma; eser',             ex:'The community garden was the creation of local residents.' },
  'credibility':   { type:'Kelime', tr:'güvenilirlik, inanılırlık',             ex:'Students struggled to assess the credibility of sources.' },
  'cry':           { type:'Kelime', tr:'ağlamak; bağırmak; ağlama',            ex:'That night, the puppy cried a little.' },
  'crises':        { type:'Kelime', tr:'krizler (crisis çoğulu)',               ex:'Many global crises require international cooperation.' },
  'crispr':        { type:'Kelime', tr:'CRISPR (gen düzenleme teknolojisi)',    ex:'CRISPR gene editing can fix hereditary diseases.' },
  'critically':    { type:'Kelime', tr:'eleştirel biçimde; ciddi şekilde',     ex:'Digital literacy helps engage more critically with the world.' },
  'crowdfunding':  { type:'Kelime', tr:'kitlesel fonlama, bağış toplama',       ex:'They raised money through a crowdfunding campaign.' },
  'crucial':       { type:'Kelime', tr:'kritik, hayati önem taşıyan',           ex:'Understanding cognitive dissonance is crucial.' },
  'crunch':        { type:'Kelime', tr:'çıtırtı; kıtırdamak; sıkıştırmak',   ex:'They kick leaves on the ground and listen to them crunch.' },
  'cucumber':      { type:'Kelime', tr:'salatalık',                              ex:'Mr. Ali grows tomatoes, cucumbers, and herbs.' },
  'cue':           { type:'Kelime', tr:'ipucu, işaret; tetik (alışkanlık)',    ex:'A cue triggers the routine in the habit loop.' },
  'curate':        { type:'Kelime', tr:'seçip düzenlemek; küratörlük yapmak', ex:'Algorithmically curated newsfeeds create epistemic bubbles.' },
  'cute':          { type:'Kelime', tr:'sevimli, şirin, tatlı',                 ex:'The puppy was small and very cute.' },
  'deadline':      { type:'Kelime', tr:'son teslim tarihi, süre sonu',         ex:'When the deadline arrived, she felt completely overwhelmed.' },
  'decision-making': { type:'Kelime', tr:'karar alma süreci, karar verme',     ex:'Human decision-making is systematically biased.' },
  'decommission':  { type:'Kelime', tr:'hizmet dışı bırakmak; sökmek',         ex:'Decommissioning carbon-intensive infrastructure is expensive.' },
  'deem':          { type:'Kelime', tr:'saymak, görmek; varsaymak',            ex:'Design features deemed manipulative are being restricted.' },
  'deer':          { type:'Kelime', tr:'geyik',                                 ex:'They sometimes spot deer and rabbits in the forest.' },
  'define':        { type:'Kelime', tr:'tanımlamak; belirlemek',               ex:'Debates over who should define collective heritage.' },
  'delay':         { type:'Kelime', tr:'geciktirmek; gecikme, erteleme',       ex:'A brief delay gave her time to reconsider.' },
  'delete':        { type:'Kelime', tr:'silmek, kaldırmak',                    ex:'Habits are never truly deleted — they are overwritten.' },
  'demand':        { type:'Kelime', tr:'talep; istemek, gerektirmek',          ex:'Teaching is a demanding but rewarding profession.' },
  'democratic':    { type:'Kelime', tr:'demokratik',                            ex:'Partisan media undermines democratic discourse.' },
  'demonstrate':   { type:'Kelime', tr:'göstermek; kanıtlamak; gösteri yapmak', ex:'Research demonstrates that sleep deprivation impairs cognition.' },
  'designer':      { type:'Kelime', tr:'tasarımcı',                             ex:'Platform designers employ psychological techniques.' },
  'destructive':   { type:'Kelime', tr:'yıkıcı, tahrip edici',                 ex:'Stoicism helps overcome destructive emotions.' },
  'determinism':   { type:'Kelime', tr:'determinizm; yazgıcılık',              ex:'Hard determinism argues every event is the result of prior causes.' },
  'difference':    { type:'Kelime', tr:'fark, ayrılık; önem',                  ex:'Collaboration had made the difference.' },
  'difficulty':    { type:'Kelime', tr:'güçlük, zorluk',                       ex:'She managed the difficulty with patience.' },
  'diplomacy':     { type:'Kelime', tr:'diplomasi; incelikli ilişki yönetimi', ex:'Global challenges require multilateral diplomacy.' },
  'directly':      { type:'Kelime', tr:'doğrudan, direkt olarak',              ex:'The debate has direct implications for legal systems.' },
  'discuss':       { type:'Kelime', tr:'tartışmak, görüşmek, ele almak',      ex:'They began discussing everything from food to politics.' },
  'disorder':      { type:'Kelime', tr:'düzensizlik; hastalık; bozukluk',      ex:'Conventional anxiety is typically treated as a disorder.' },
  'disproportionate': { type:'Kelime', tr:'orantısız, dengesiz',               ex:'Young people are disproportionately affected by climate grief.' },
  'distinction':   { type:'Kelime', tr:'ayrım; fark; üstünlük',               ex:'Students struggled to distinguish clear distinctions in media sources.' },
  'distress':      { type:'Kelime', tr:'sıkıntı, üzüntü; kriz',               ex:'Practitioners acknowledge the validity of the distress.' },
  'disuse':        { type:'Kelime', tr:'kullanılmaz hale gelmek; ihmal',       ex:'A disused car park had sat empty for years.' },
  'document':      { type:'Kelime', tr:'belgelemek; belge',                    ex:'Psychologists have begun documenting climate grief.' },
  'domain':        { type:'Kelime', tr:'alan, uzmanlık alanı; etki alanı',    ex:'Amabile\'s model includes domain-relevant skills.' },
  'doubt':         { type:'Kelime', tr:'şüphe; şüphe etmek',                  ex:'She stopped doubting herself and started creating boldly.' },
  'dramatic':      { type:'Kelime', tr:'dramatik, çarpıcı; tiyatroya ait',    ex:'Solar energy costs have seen dramatic reductions.' },
  'draw':          { type:'Kelime', tr:'çizmek; çekmek; berabere',            ex:'Political philosophy draws on the social contract.' },
  'dressed':       { type:'Kelime', tr:'giyinmiş; hazırlanmış',               ex:'She gets dressed and eats breakfast before leaving.' },
  'drove':         { type:'Kelime', tr:'sürdü (drive geçmişi)',               ex:'The family drove to the beach on a sunny Saturday.' },
  'duck':          { type:'Kelime', tr:'ördek; eğilmek',                       ex:'Sometimes they stop to feed the ducks at the pond.' },
  'ecological':    { type:'Kelime', tr:'ekolojik, çevresel',                   ex:'Architecture aims at ecological integration.' },
  'edit':          { type:'Kelime', tr:'düzenlemek, revize etmek',             ex:'CRISPR gene editing offers the potential to eradicate diseases.' },
  'educator':      { type:'Kelime', tr:'eğitimci, öğretmen, pedagog',         ex:'Educators now advocate for explicit instruction in lateral reading.' },
  'embed':         { type:'Kelime', tr:'gömmek; gömülü olmak',                ex:'The brain processes information embedded in a narrative.' },
  'embrace':       { type:'Kelime', tr:'kucaklamak; benimsemek',              ex:'Societies should embrace the benefits of interconnectedness.' },
  'emerge':        { type:'Kelime', tr:'ortaya çıkmak; su yüzüne çıkmak',     ex:'Social connectedness emerges as the strongest predictor.' },
  'emphasise':     { type:'Kelime', tr:'vurgulamak, üzerinde durmak',         ex:'Locke emphasised the protection of natural rights.' },
  'encourage':     { type:'Kelime', tr:'teşvik etmek, cesaretlendirmek',       ex:'Her mentor encouraged her to enter the competition.' },
  'enrich':        { type:'Kelime', tr:'zenginleştirmek; iyileştirmek',        ex:'Cultural diversity enriches human civilisation.' },
  'epistemic':     { type:'Kelime', tr:'epistemik, bilgiye ilişkin',           ex:'Newsfeeds create epistemic bubbles that reinforce existing beliefs.' },
  'equivalent':    { type:'Kelime', tr:'eşdeğer, denk; eşit',                 ex:'Qubits have no classical equivalent.' },
  'eradicate':     { type:'Kelime', tr:'yok etmek, ortadan kaldırmak',        ex:'CRISPR may eradicate hereditary diseases.' },
  'ethicist':      { type:'Kelime', tr:'etikçi, ahlak felsefecisi',           ex:'Ethicists debate the implications of gene editing.' },
  'everywhere':    { type:'Kelime', tr:'her yerde, her tarafta',               ex:'Kindness exists everywhere in the world.' },
  'evolve':        { type:'Kelime', tr:'evrilmek, gelişmek',                   ex:'Habits evolve through repetition and reward.' },
  'expense':       { type:'Kelime', tr:'masraf, gider; bedel',                ex:'Society celebrates productivity at the expense of sleep.' },
  'expert':        { type:'Kelime', tr:'uzman; uzmanlaşmış',                   ex:'Experts warn of the long-term risks of poor sleep.' },
  'explain':       { type:'Kelime', tr:'açıklamak, izah etmek',               ex:'The default mode network explains associative thinking.' },
  'explicit':      { type:'Kelime', tr:'açık, net, doğrudan ifade edilen',    ex:'Educators advocate for explicit instruction in lateral reading.' },
  'expose':        { type:'Kelime', tr:'maruz bırakmak; ortaya çıkarmak',     ex:'Exposure to toxins can modify gene expression.' },
  'facilitate':    { type:'Kelime', tr:'kolaylaştırmak, olanaklı kılmak',     ex:'Globalisation facilitated an unprecedented exchange of goods.' },
  'face':          { type:'Kelime', tr:'yüzleşmek; yüz; karşılaşmak',        ex:'City planners face the challenge of providing adequate infrastructure.' },
  'fact':          { type:'Kelime', tr:'gerçek, olgu, hakikat',               ex:'Students struggled to check facts effectively.' },
  'fiction':       { type:'Kelime', tr:'kurgu, roman; uydurma',               ex:'The library has a vast collection of fiction and non-fiction.' },
  'fifteen-minute':{ type:'Kelime', tr:'on beş dakikalık (15 dakikalık)',     ex:'The fifteen-minute city is a key concept in urban planning.' },
  'finger':        { type:'Kelime', tr:'parmak; dokunmak; incelemek',        ex:'She ran her fingers across the rough wooden shelf.' },
  'finish':        { type:'Kelime', tr:'bitirmek; bitiş; son',               ex:'She crossed the finish line in four hours.' },
  'fit':           { type:'Kelime', tr:'uygun olmak; sığmak; form',          ex:'She made sure everything fits in the study group plan.' },
  'flatmate':      { type:'Kelime', tr:'ev arkadaşı, dairekter',             ex:'Her flatmate noticed she wasn\'t sleeping well.' },
  'fly':           { type:'Kelime', tr:'uçmak; sinek',                        ex:'Flying has a large carbon footprint.' },
  'force':         { type:'Kelime', tr:'güç, kuvvet; zorlamak',              ex:'What forces are driving the transition to clean energy?' },
  'forecast':      { type:'Kelime', tr:'tahmin, öngörü; tahmin etmek',       ex:'Economists warn against purely pessimistic forecasts.' },
  'forty':         { type:'Kelime', tr:'kırk',                                ex:'At forty-two, he handed in his resignation.' },
  'foster':        { type:'Kelime', tr:'desteklemek, teşvik etmek; beslemek', ex:'Balancing progress with responsibility fosters innovation.' },
  'foundational':  { type:'Kelime', tr:'temel niteliğinde, kurucu',          ex:'The social contract is a foundational idea in political philosophy.' },
  'found':         { type:'Kelime', tr:'kurdu (find geçmişi); kurmak (found)', ex:'He founded a charity to support rural schools.' },
  'french':        { type:'Kelime', tr:'Fransızca; Fransız',                  ex:'She spoke neither Arabic nor French.' },
  'fulfil':        { type:'Kelime', tr:'yerine getirmek; gerçekleştirmek',   ex:'She worked every evening to fulfil all the orders.' },
  'fully':         { type:'Kelime', tr:'tam olarak, tamamen, eksiksiz',       ex:'The experience was fully described in his diary.' },
  'furthermore':   { type:'Kelime', tr:'ayrıca, bunun ötesinde, dahası',     ex:'Furthermore, epigenetics challenges our view of genetic fate.' },
  'ganglia':       { type:'Kelime', tr:'gangliyonlar (sinir hücre grupları)', ex:'Habits are encoded in the basal ganglia of the brain.' },
  'garage':        { type:'Kelime', tr:'garaj; tamirhane',                    ex:'He started making furniture in his garage at weekends.' },
  'gene':          { type:'Kelime', tr:'gen (genetik kalıtım birimi)',        ex:'Epigenetics studies changes in gene expression.' },
  'generation':    { type:'Kelime', tr:'nesil, kuşak; üretim',               ex:'Trauma can be transmitted across generations.' },
  'genome':        { type:'Kelime', tr:'genom (bir organizmanın tüm genleri)', ex:'Chemical tags sit on the genome and regulate expression.' },
  'glad':          { type:'Kelime', tr:'memnun, sevinçli, mutlu',             ex:'She was glad that the others understood her point.' },
  'glymphatic':    { type:'Kelime', tr:'glenfatik (beyin atık temizleme sistemi)', ex:'The glymphatic system flushes out waste during deep sleep.' },
  'govern':        { type:'Kelime', tr:'yönetmek; denetlemek',               ex:'AI, if properly governed, can reduce human bias.' },
  'graphic':       { type:'Kelime', tr:'grafik; görsel; çarpıcı',            ex:'She took a night-school course in graphic design.' },
  'grapple':       { type:'Kelime', tr:'boğuşmak, güreşmek; uğraşmak',      ex:'Philosophers grapple with questions of free will.' },
  'greek':         { type:'Kelime', tr:'Yunanca; Yunan',                      ex:'Stoicism is an ancient Greek philosophy.' },
  'greenhouse':    { type:'Kelime', tr:'sera; sera gazı',                     ex:'Greenhouse gas emissions are driving climate change.' },
  'greet':         { type:'Kelime', tr:'selamlamak, karşılamak',             ex:'He greeted her with a warm smile.' },
  'grid-scale':    { type:'Kelime', tr:'şebeke ölçekli (büyük enerji depolama)', ex:'Grid-scale storage solutions are essential for renewable energy.' },
  'hands':         { type:'Kelime', tr:'eller; yardım; el sıkışmak',        ex:'Media power concentrated in the hands of a few corporations.' },
  'heat':          { type:'Kelime', tr:'sıcaklık, ısı; ısıtmak',            ex:'Buildings can regulate heat by mimicking biological processes.' },
  'hereditary':    { type:'Kelime', tr:'kalıtsal, irsi, soydan gelen',       ex:'CRISPR may eradicate hereditary diseases.' },
  'hesitate':      { type:'Kelime', tr:'tereddüt etmek, duraksamak',         ex:'She didn\'t hesitate to offer her seat on the bus.' },
  'hid':           { type:'Kelime', tr:'saklandı (hide geçmişi)',             ex:'Biscuit was shy and hid under the sofa.' },
  'holistic':      { type:'Kelime', tr:'bütüncül, holistik',                  ex:'A holistic approach ensures future cities are sustainable.' },
  'homeland':      { type:'Kelime', tr:'vatan, analand',                      ex:'Cultural memory is tied to a sense of homeland.' },
  'homogenise':    { type:'Kelime', tr:'homojenleştirmek, tek tipleştirmek', ex:'Multinational corporations homogenise consumer behaviour.' },
  'hypothetical':  { type:'Kelime', tr:'varsayımsal, hipotetik',              ex:'Each theorist imagined a hypothetical state of nature.' },
  'identities':    { type:'Kelime', tr:'kimlikler (identity çoğulu)',         ex:'Globalisation provokes anxieties about the erosion of local identities.' },
  'imagine':       { type:'Kelime', tr:'hayal etmek, tasavvur etmek',        ex:'Each theorist imagined a hypothetical state of nature.' },
  'immense':       { type:'Kelime', tr:'muazzam, devasa, büyük',             ex:'Gene editing brings immense power and profound ethical dilemmas.' },
  'immune':        { type:'Kelime', tr:'bağışıklıklı; etkilenmez',           ex:'Sleep deprivation impairs the immune response.' },
  'impair':        { type:'Kelime', tr:'bozmak, zayıflatmak, kötüleştirmek', ex:'Sleep deprivation impairs cognitive function.' },
  'imperative':    { type:'Kelime', tr:'zorunlu; emir; emiratif',            ex:'Consumerism is the cultural imperative to acquire goods.' },
  'implement':     { type:'Kelime', tr:'uygulamak, hayata geçirmek',         ex:'Governments fail to implement adequate retraining programs.' },
  'increase':      { type:'Kelime', tr:'artmak, artırmak',                   ex:'These technologies exponentially increase productivity.' },
  'incredible':    { type:'Kelime', tr:'inanılmaz, olağanüstü, muhteşem',   ex:'She made an incredible discovery while exploring the forest.' },
  'indispensable': { type:'Kelime', tr:'vazgeçilmez, olmazsa olmaz',         ex:'Digital literacy is an indispensable civic competency.' },
  'indoor':        { type:'Kelime', tr:'iç mekân; kapalı alanda',           ex:'She had to stay indoors because it was raining.' },
  'inequality':    { type:'Kelime', tr:'eşitsizlik, adaletsizlik',           ex:'AI could exacerbate income inequality.' },
  'inevitable':    { type:'Kelime', tr:'kaçınılmaz, önlenemez',              ex:'Hard determinists view every event as inevitable.' },
  'infiltrate':    { type:'Kelime', tr:'sızmak; içine girmek',               ex:'Synthetic polymers have infiltrated the deepest oceans.' },
  'infinite':      { type:'Kelime', tr:'sonsuz, sınırsız',                   ex:'Infinite scroll is a design feature that maximises engagement.' },
  'ingest':        { type:'Kelime', tr:'yutmak, içeri almak (tüketmek)',     ex:'Marine organisms ingest microplastic particles.' },
  'inhabit':       { type:'Kelime', tr:'ikamet etmek; içinde yaşamak',       ex:'Citizens inhabit entirely different informational realities.' },
  'innovative':    { type:'Kelime', tr:'yenilikçi, inovatif, özgün',        ex:'Safe environments generate more innovative outcomes.' },
  'institutional': { type:'Kelime', tr:'kurumsal; kurumla ilgili',           ex:'Cultural memory is inscribed in institutional practices.' },
  'instruction':   { type:'Kelime', tr:'talimat; öğretim; ders',            ex:'Educators advocate for explicit instruction in lateral reading.' },
  'integration':   { type:'Kelime', tr:'entegrasyon; bütünleşme',           ex:'Architecture aims at ecological integration.' },
  'interconnectedness': { type:'Kelime', tr:'birbirine bağlılık; iç içe geçmişlik', ex:'Societies should embrace the benefits of interconnectedness.' },
  'interdisciplinary': { type:'Kelime', tr:'disiplinlerarası, çok alanlı',  ex:'Resolving ethical tensions requires interdisciplinary collaboration.' },
  'interviewer':   { type:'Kelime', tr:'mülakat yapan, görüşmeci',           ex:'The interviewer was friendly and asked about her goals.' },
  'intrinsic':     { type:'Kelime', tr:'içsel, doğuştan gelen, özsel',       ex:'Intrinsic motivation drives real creativity.' },
  'invention':     { type:'Kelime', tr:'icat, buluş',                        ex:'Before the invention of writing, stories were oral.' },
  'island':        { type:'Kelime', tr:'ada; yalıtılmış bölge',              ex:'The beautiful island was their favourite destination.' },
  'jurisdiction':  { type:'Kelime', tr:'yetki alanı; yargı yetkisi',         ex:'Several jurisdictions are restricting manipulative design features.' },
  'labor':         { type:'Kelime', tr:'emek, işgücü (Amerikan yazımı)',     ex:'AI is disrupting traditional labor markets.' },
  'lap':           { type:'Kelime', tr:'kucak; tur; eğmek',                  ex:'The cat sat on her lap while she read.' },
  'late-life':     { type:'Kelime', tr:'geç yaşamda, ileri yaşta',          ex:'Close relationships predict late-life satisfaction.' },
  'latest':        { type:'Kelime', tr:'en son, en güncel',                  ex:'The latest research confirms the importance of sleep.' },
  'lay':           { type:'Kelime', tr:'yatmak; koymak; yatırmak',          ex:'Ella lay on the sofa and watched her favourite show.' },
  'lead':          { type:'Kelime', tr:'liderlik etmek; önde gitmek',        ex:'A sedentary lifestyle can lead to health problems.' },
  'legal':         { type:'Kelime', tr:'yasal, hukuki, kanuni',              ex:'The debate has direct implications for legal systems.' },
  'legislative':   { type:'Kelime', tr:'yasama, mevzuatla ilgili',           ex:'Several jurisdictions are considering legislative restrictions.' },
  'lemon':         { type:'Kelime', tr:'limon',                               ex:'Her mum made tea with honey and lemon.' },
  'light':         { type:'Kelime', tr:'ışık; aydınlık; hafif',              ex:'Nina began experimenting with light and composition.' },
  'line':          { type:'Kelime', tr:'çizgi; satır; sıra; sınır',         ex:'She crossed the finish line in four hours.' },
  'linguistic':    { type:'Kelime', tr:'dilbilimsel, dilsel',                ex:'Linguistic relativity proposes that language shapes thought.' },
  'loaf':          { type:'Kelime', tr:'somun (ekmek)',                       ex:'She usually buys a loaf of sourdough bread.' },
  'long-held':     { type:'Kelime', tr:'uzun süredir kabul gören',           ex:'Epigenetics challenged the long-held assumption about genetic fate.' },
  'lower':         { type:'Kelime', tr:'daha alçak; düşürmek; alt',         ex:'Fifteen-minute cities can substantially lower emissions.' },
  'lower-income':  { type:'Kelime', tr:'düşük gelirli',                      ex:'Gentrification risks displacing lower-income residents.' },
  'lunar':         { type:'Kelime', tr:'Ay\'a ait, ay',                      ex:'Lunar cycles have fascinated scientists for centuries.' },
  'mark':          { type:'Kelime', tr:'işaret, iz; not vermek',             ex:'Goods as a marker of identity and status.' },
  'marketer':      { type:'Kelime', tr:'pazarlamacı, reklamcı',              ex:'Marketers exploit narrative to shape consumer attitudes.' },
  'material':      { type:'Kelime', tr:'malzeme; maddi; önemli',            ex:'Well-being is not primarily a function of material wealth.' },
  'mathematics':   { type:'Kelime', tr:'matematik',                           ex:'He taught mathematics at a rural primary school.' },
  'maximise':      { type:'Kelime', tr:'en üst düzeye çıkarmak, maksimize etmek', ex:'Platform designers try to maximise user engagement.' },
  'mean':          { type:'Kelime', tr:'anlamına gelmek; ortalama; kötü',   ex:'Cutting a piece short meant starting again.' },
  'medina':        { type:'Kelime', tr:'medina (Kuzey Afrika\'da eski şehir bölgesi)', ex:'She got lost in the medina on her first day.' },
  'metabolic':     { type:'Kelime', tr:'metabolik, metabolizmayla ilgili',   ex:'The glymphatic system flushes out metabolic waste.' },
  'minimise':      { type:'Kelime', tr:'en aza indirmek, minimize etmek',    ex:'Cities must minimise their environmental impact.' },
  'mission':       { type:'Kelime', tr:'görev, misyon; heyet',               ex:'The charity\'s mission is to support rural schools.' },
  'monkey':        { type:'Kelime', tr:'maymun',                              ex:'The zoo had many animals including monkeys.' },
  'multilateral':  { type:'Kelime', tr:'çok taraflı, çok uluslu',            ex:'Global challenges require multilateral cooperation.' },
  'necessitate':   { type:'Kelime', tr:'gerektirmek, zorunlu kılmak',        ex:'Renewable energy necessitates substantial storage investment.' },
  'neck':          { type:'Kelime', tr:'boyun',                               ex:'She rubbed her neck after a long day at her desk.' },
  'nervous':       { type:'Kelime', tr:'sinirli, endişeli, gergin',          ex:'Leo and his team were nervous but excited.' },
  'net':           { type:'Kelime', tr:'net, saf; ağ; kazanmak',            ex:'Robust social safety nets might prevent economic hardship.' },
  'neurodegenerative': { type:'Kelime', tr:'nörodejeneratif (sinir yozlaşması)', ex:'Sleep removes proteins associated with neurodegenerative disease.' },
  'night-school':  { type:'Kelime', tr:'gece okulu, akşam kursu',            ex:'He enrolled in a night-school accounting course.' },
  'older':         { type:'Kelime', tr:'daha yaşlı; daha büyük; daha eski', ex:'She explored the forest trails with her older brother.' },
  'ones':          { type:'Kelime', tr:'bunlar; onlar; belirli öğeler',      ex:'Nudge policy helps replace harmful habits with constructive ones.' },
  'onto':          { type:'Kelime', tr:'-in üzerine, üstüne',               ex:'Everyone ran onto the pitch after the goal.' },
  'openly':        { type:'Kelime', tr:'açıkça, dürüstçe',                   ex:'They met for coffee and talked openly about challenges.' },
  'optional':      { type:'Kelime', tr:'isteğe bağlı, opsiyonel',           ex:'Building a literate citizenry is no longer optional.' },
  'organise':      { type:'Kelime', tr:'organize etmek, düzenlemek',         ex:'The club organised monthly photo walks.' },
  'organizer':     { type:'Kelime', tr:'organizatör, düzenleyici',           ex:'The event organizers ensured everything ran smoothly.' },
  'origin':        { type:'Kelime', tr:'köken, başlangıç, asıl',            ex:'Cultural memory connects the present to a meaningful origin narrative.' },
  'output':        { type:'Kelime', tr:'çıktı, verim, üretim',              ex:'External rewards can undermine creative output.' },
  'overcome':      { type:'Kelime', tr:'üstesinden gelmek; aşmak; bunalmak', ex:'Stoicism helps overcome destructive emotions.' },
  'overconsume':   { type:'Kelime', tr:'aşırı tüketmek',                    ex:'Overconsumption of resources damages the environment.' },
  'oversight':     { type:'Kelime', tr:'denetim; gözetim; gözden kaçırmak', ex:'Strict oversight of AI systems is necessary.' },
  'panoramic':     { type:'Kelime', tr:'panoramik, geniş görüşlü',          ex:'The panoramic view from the summit was spectacular.' },
  'paradoxically': { type:'Kelime', tr:'paradoks olarak, çelişkili biçimde', ex:'External rewards can paradoxically undermine creativity.' },
  'part-time':     { type:'Kelime', tr:'yarı zamanlı, part-time',            ex:'He enrolled in a part-time course in woodworking.' },
  'particle':      { type:'Kelime', tr:'parçacık, zerre',                   ex:'Marine organisms ingest microplastic particles.' },
  'partisan':      { type:'Kelime', tr:'partizan, taraftarlık gözeten',     ex:'Partisan online media has exacerbated the information problem.' },
  'passionate':    { type:'Kelime', tr:'tutkulu, hevesli; ateşli',          ex:'Nina had always been passionate about photography.' },
  'perform':       { type:'Kelime', tr:'gerçekleştirmek; performans sergilemek', ex:'Quantum computers can perform calculations exponentially faster.' },
  'perma':         { type:'Kelime', tr:'PERMA (pozitif psikolojide beş refah boyutu)', ex:'Seligman\'s PERMA model identifies five pillars of well-being.' },
  'philosophically': { type:'Kelime', tr:'felsefi açıdan, felsefi olarak', ex:'Moral responsibility becomes philosophically problematic.' },
  'planetary':     { type:'Kelime', tr:'gezegensel; gezegeni ilgilendiren', ex:'Climate change has planetary consequences for all species.' },
  'please':        { type:'Kelime', tr:'memnun etmek; lütfen',              ex:'Future cities should be aesthetically pleasing.' },
  'policies':      { type:'Kelime', tr:'politikalar, strateji belgeleri',   ex:'Governments must adopt robust policies for the energy transition.' },
  'policy-making': { type:'Kelime', tr:'politika oluşturma, karar alma süreci', ex:'Behavioural economics has transformed policy-making.' },
  'post':          { type:'Kelime', tr:'gönderi; görev; paylaşmak',         ex:'She posted regularly on social media.' },
  'practise':      { type:'Kelime', tr:'pratik yapmak; uygulamak',          ex:'Stoicism is a philosophy that has been practised for centuries.' },
  'praise':        { type:'Kelime', tr:'övmek, takdir etmek; övgü',         ex:'The mentor praised her work throughout the year.' },
  'press':         { type:'Kelime', tr:'basmak; basın; baskı yapmak',       ex:'They press interesting leaves in a book.' },
  'prioritize':    { type:'Kelime', tr:'öncelik vermek (Amerikan yazımı)',   ex:'Urban planning must prioritize affordable housing.' },
  'quality':       { type:'Kelime', tr:'kalite, nitelik; özellik',          ex:'Quality of close relationships predicts happiness.' },
  'quiet':         { type:'Kelime', tr:'sessiz, sakin; sessizlik',          ex:'Kai sat quietly on the floor.' },
  'release':       { type:'Kelime', tr:'serbest bırakmak; yayımlamak',      ex:'The brain releases chemicals during exercise.' },
  'rely':          { type:'Kelime', tr:'güvenmek, bel bağlamak',            ex:'He had to rely on creativity rather than technology.' },
  'sell':          { type:'Kelime', tr:'satmak; satılmak',                  ex:'He built and sold enough furniture to prove the idea.' },
  'short-term':    { type:'Kelime', tr:'kısa vadeli, kısa süreli',          ex:'Short-term rewards can undermine long-term goals.' },
  'sixteen-week':  { type:'Kelime', tr:'on altı haftalık',                   ex:'She followed a sixteen-week training plan.' },
  'skip':          { type:'Kelime', tr:'atlamak; geçmek; sek sek oynamak',  ex:'He often skipped meals because he was too busy.' },
  'sold':          { type:'Kelime', tr:'sattı (sell geçmişi)',              ex:'He built and sold enough furniture to prove the idea.' },
  'tech':          { type:'Kelime', tr:'teknoloji (konuşma dili kısaltması)', ex:'She works for a tech company in the city.' },
  'technologist':  { type:'Kelime', tr:'teknoloji uzmanı',                   ex:'Technologists must collaborate with ethicists.' },
  'tenth':         { type:'Kelime', tr:'onuncu; onda bir',                   ex:'The fashion industry produces approximately ten percent of emissions.' },
  'thereby':       { type:'Kelime', tr:'böylece, bu yolla, bu sayede',      ex:'Automated systems perpetuate inequality, thereby reinforcing bias.' },
  'thirty':        { type:'Kelime', tr:'otuz',                               ex:'She started going for a thirty-minute walk every morning.' },
  'three-day':     { type:'Kelime', tr:'üç günlük',                         ex:'Sasha attended the three-day music festival.' },
  'three-part':    { type:'Kelime', tr:'üç bölümlü',                        ex:'Habits follow a three-part loop: cue, routine, reward.' },
  'twenty-first':  { type:'Kelime', tr:'yirmi birinci',                      ex:'This is one of the great challenges of the twenty-first century.' },
  'twenty-minute': { type:'Kelime', tr:'yirmi dakikalık',                    ex:'She started going for a twenty-minute walk every morning.' },
  'uncheck':       { type:'Kelime', tr:'denetimsiz, serbest',               ex:'Overconsumption left unchecked leads to environmental damage.' },
  'wi-fi':         { type:'Kelime', tr:'kablosuz internet bağlantısı',       ex:'The café offered free Wi-Fi to attract customers.' },

  'less': { type:'Kelime', tr:'daha az', ex:'She spent less time on social media.' },
  'others': { type:'Kelime', tr:'diğerleri', ex:'Some stayed quiet while others spoke up.' },
  'systematically': { type:'Kelime', tr:'sistematik olarak', ex:'He systematically reviewed every document.' },
  'tall': { type:'Kelime', tr:'uzun boylu', ex:'The tall trees provided shade in the park.' },
  'difficult': { type:'Kelime', tr:'zor, güç', ex:'It was difficult to concentrate in the noise.' },
  'direct': { type:'Kelime', tr:'doğrudan', ex:'She gave a direct answer to the question.' },
  'financial': { type:'Kelime', tr:'finansal, mali', ex:'They faced serious financial difficulties.' },
  'having': { type:'Kelime', tr:'sahip olmak', ex:'Having a good plan makes all the difference.' },
  'least': { type:'Kelime', tr:'en az', ex:'At least try to understand the situation.' },
  'panicking': { type:'Kelime', tr:'paniğe kapılmak', ex:'She stopped panicking and focused on solutions.' },
  'realized': { type:'Kelime', tr:'fark etti, anladı', ex:'He realized his mistake too late.' },
  'acoustic': { type:'Kelime', tr:'akustik', ex:'The acoustic properties of the hall were excellent.' },
  'adaptability': { type:'Kelime', tr:'uyum yeteneği', ex:'Adaptability is a key skill in the modern workplace.' },
  'advised': { type:'Kelime', tr:'tavsiye etti', ex:'The doctor advised her to rest for a week.' },
  'airline': { type:'Kelime', tr:'havayolu şirketi', ex:'The airline cancelled the flight due to bad weather.' },
  'airport': { type:'Kelime', tr:'havalimanı', ex:'They arrived at the airport two hours early.' },
  'albeit': { type:'Kelime', tr:'her ne kadar', ex:'It was a small, albeit important, change.' },
  'algorithmically': { type:'Kelime', tr:'algoritmik olarak', ex:'Content is algorithmically ranked by engagement.' },
  'analyzing': { type:'Kelime', tr:'analiz etmek', ex:'She spent the morning analyzing the data.' },
  'behavior': { type:'Kelime', tr:'davranış', ex:'His behavior at the meeting was professional.' },
  'beings': { type:'Kelime', tr:'varlıklar', ex:'Human beings are inherently social creatures.' },
  'believe': { type:'Kelime', tr:'inanmak, düşünmek', ex:'I believe we can solve this problem together.' },
  'beside': { type:'Kelime', tr:'yanında', ex:'She sat beside her friend during the ceremony.' },
  'blew': { type:'Kelime', tr:'üfledi, esti', ex:'The wind blew the leaves across the yard.' },
  'bravest': { type:'Kelime', tr:'en cesur', ex:'She was the bravest person in the group.' },
  'catastrophic': { type:'Kelime', tr:'felaket niteliğinde', ex:'The drought had catastrophic effects on the harvest.' },
  'closer': { type:'Kelime', tr:'daha yakın', ex:'Move closer so you can hear better.' },
  'compatibilists': { type:'Kelime', tr:'uyumcular (felsefe)', ex:'Compatibilists argue free will and determinism coexist.' },
  'confidently': { type:'Kelime', tr:'güvenle, özgüvenle', ex:'She spoke confidently in front of the audience.' },
  'confined': { type:'Kelime', tr:'sınırlı, kapalı', ex:'The discussion was confined to a single topic.' },
  'coordinated': { type:'Kelime', tr:'koordineli', ex:'A coordinated response is needed from all departments.' },
  'corner': { type:'Kelime', tr:'köşe', ex:'The cafe was tucked into a quiet corner of the street.' },
  'creativity-relevant': { type:'Kelime', tr:'yaratıcılıkla ilgili', ex:'Intrinsic motivation is a creativity-relevant skill.' },
  'cried': { type:'Kelime', tr:'ağladı', ex:'She cried when she heard the news.' },
  'discovery': { type:'Kelime', tr:'keşif, buluş', ex:'The discovery of penicillin changed medicine forever.' },
  'discussions': { type:'Kelime', tr:'tartışmalar', ex:'The discussions lasted well into the evening.' },
  'domain-relevant': { type:'Kelime', tr:'alana özgü', ex:'Domain-relevant skills are necessary for creative work.' },
  'drawn': { type:'Kelime', tr:'çekilmiş, ilgi duymak', ex:'She was drawn to the quiet of the library.' },
  'dual': { type:'Kelime', tr:'çift, ikili', ex:'The device has a dual purpose in the lab.' },
  'emergence': { type:'Kelime', tr:'ortaya çıkış', ex:'The emergence of AI has transformed many industries.' },
  'emphasized': { type:'Kelime', tr:'vurguladı', ex:'The teacher emphasized the importance of revision.' },
  'emphasizes': { type:'Kelime', tr:'vurgular', ex:'The report emphasizes the need for urgent action.' },
  'ending': { type:'Kelime', tr:'son, bitiş', ex:'The story had a surprising ending.' },
  'environmentally': { type:'Kelime', tr:'çevresel olarak', ex:'We need to act more environmentally responsibly.' },
  'evenings': { type:'Kelime', tr:'akşamlar', ex:'She spent her evenings reading by the window.' },
  'exponentially': { type:'Kelime', tr:'katlanarak', ex:'Computing power has grown exponentially since the 1970s.' },
  'exposure': { type:'Kelime', tr:'maruz kalma', ex:'Regular exposure to English improves fluency.' },
  'fact-checking': { type:'Kelime', tr:'gerçek doğrulama', ex:'Fact-checking is essential in digital journalism.' },
  'forty-two': { type:'Kelime', tr:'kırk iki', ex:'She is forty-two years old.' },
  'immediate': { type:'Kelime', tr:'anlık, acil', ex:'The decision had an immediate impact on the team.' },
  'inevitably': { type:'Kelime', tr:'kaçınılmaz olarak', ex:'Change inevitably brings uncertainty.' },
  'led': { type:'Kelime', tr:'yönetti, öncülük etti', ex:'She led the project from start to finish.' },
  'meant': { type:'Kelime', tr:'anlamına geldi', ex:'He meant well, even if his words were clumsy.' },
  'organized': { type:'Kelime', tr:'organize, düzenlenmiş', ex:'The event was well organized and ran smoothly.' },
  'overconsumption': { type:'Kelime', tr:'aşırı tüketim', ex:'Overconsumption is a driver of climate change.' },
  'perfectly': { type:'Kelime', tr:'mükemmel şekilde', ex:'The two parts fit together perfectly.' },
  'relied': { type:'Kelime', tr:'güvendi, dayandı', ex:'She relied on her experience to make the decision.' },
  'thirty-five': { type:'Kelime', tr:'otuz beş', ex:'The course lasts thirty-five hours in total.' },
  'thirty-six': { type:'Kelime', tr:'otuz altı', ex:'He ran thirty-six kilometres during the race.' },
  'understood': { type:'Kelime', tr:'anladı, kavradı', ex:'She finally understood why the process mattered.' },
  'maria': { type:'Kelime', tr:'Maria (isim)', ex:'Maria greeted everyone with a warm smile.' },
  'sam': { type:'Kelime', tr:'Sam (isim)', ex:'Sam decided to take a different route home.' },
  'sapir-whorf': { type:'Kelime', tr:'Sapir-Whorf hipotezi', ex:'The Sapir-Whorf hypothesis links language to thought.' },
};

// ── State Manager ──────────────────────────────────────────
class StateManager {
  constructor() {
    this._state = this._load();
  }

  _defaults() {
    return {
      xp:         0,
      level:      1,
      streak:     1,
      lastActive: '',
      totalCorrect: 0,
      totalAttempts: 0,
      sessions:   0,
      accent:     'en-US',
      onboarded:  false,
      speakDiff:  'easy',
      speakBest:  0,
      speakTotal: 0,
      speakSum:   0,
      speakHistory: [],
      speakShuffle: true,
      shadowMode:   false,
      autoAdvance:  false,
      readingLevel: 'Kolay',
      readingIdx:   0,
      readingShuffled: false,
      readingOrder: {},
      achievements: [],
      gems:       0,
      mastery:    {},     // { wordId: { score, interval, ease, nextReview } }
      history:    {},     // { 'YYYY-MM-DD': xp }
      sessionsToday: 0,
      missionsDate: '',
      convoCompleted: {},        // { scenarioId: { avg, ts } }
      readingMode:   'read',     // 'read' | 'shadow' | 'quiz'
      learningMode:  'balanced', // 'balanced' | 'intensive' | 'speaking' | 'grammar'
      learningGoal:  'general',  // 'general' | 'travel' | 'business' | 'academic'
      _lastMilestoneCelebrated: 0,
    };
  }

  _load() {
    try {
      const saved = localStorage.getItem('er_state');
      return saved ? { ...this._defaults(), ...JSON.parse(saved) } : this._defaults();
    } catch { return this._defaults(); }
  }

  save(immediate = false) {
    try { localStorage.setItem('er_state', JSON.stringify(this._state)); } catch {}
    // Cloud'a yalnızca: auth hazırsa + cloud state yüklenmiş veya teyit edilmişse yaz
    if (window.authManager && window.authManager.isLoggedIn &&
        window.app && window.app.cloudLoaded) {
      window.authManager.saveToCloud(this._state, immediate);
    }
  }

  get(key)                   { return this._state[key]; }
  set(key, value, imm=false) { this._state[key] = value; this.save(imm); }
  update(partial, imm=false) { Object.assign(this._state, partial); this.save(imm); }
}

// ── Audio Engine ───────────────────────────────────────────
class AudioEngine {
  constructor() {
    this._ctx = null;
  }

  _ctx_ensure() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._ctx.state === 'suspended') this._ctx.resume();
    return this._ctx;
  }

  play(type) {
    if (navigator.vibrate) {
      if (type === 'success') navigator.vibrate([20, 40, 20]);
      else navigator.vibrate(10);
    }
    try {
      const ctx = this._ctx_ensure();
      const t = ctx.currentTime;
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.setValueAtTime(554.37, t + 0.1);
        osc.frequency.setValueAtTime(659.25, t + 0.2);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
        gain.gain.setValueAtTime(0.12, t + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.start(t); osc.stop(t + 0.45);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700, t);
        osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.start(t); osc.stop(t + 0.12);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(260, t + 0.08);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.start(t); osc.stop(t + 0.08);
      }
    } catch {}
  }
}

// ── Speech Engine ──────────────────────────────────────────
class SpeechEngine {
  constructor(accent) {
    this.accent = accent;
    this.synth  = window.speechSynthesis;
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this._recognizer = null;
  }

  speak(text, rate = 0.88, onBoundary, onEnd) {
    if (!this.synth) return;
    this.stop(); 
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = this.accent;
    utt.rate = rate;
    if (onBoundary) utt.onboundary = onBoundary;
    if (onEnd) utt.onend = onEnd;
    this.synth.speak(utt);
  }

  stop() {
    if (this.synth) this.synth.cancel();
  }

  startRecognition({ onResult, onError, onEnd, onInterim }) {
    if (!this.SpeechRecognition) {
      onError && onError({ error: 'not-supported' });
      return null;
    }
    const rec = new this.SpeechRecognition();
    rec.lang = this.accent || 'en-US';
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const result = e.results[0];
      if (result.isFinal) {
        onResult && onResult(e);
      } else {
        onInterim && onInterim(result[0].transcript);
      }
    };
    rec.onerror = onError;
    rec.onend   = onEnd;
    this._recognizer = rec;
    try { rec.start(); } catch {}
    return rec;
  }

  stopRecognition() {
    if (this._recognizer) {
      try { this._recognizer.stop(); } catch {}
      this._recognizer = null;
    }
  }
}

// ── UI Helpers ─────────────────────────────────────────────
class UI {
  static toast(msg, duration = 3200) {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'toastOut 0.35s ease forwards';
      setTimeout(() => t.remove(), 360);
    }, duration);
  }

  static setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  static setWidth(id, pct) {
    const el = document.getElementById(id);
    if (el) el.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }

  static particles(x, y) {
    const colors = ['#00d4ff','#7c3aed','#f43f5e','#10b981'];
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('div');
      p.className = 'particle-fx';
      p.style.left = x + 'px';
      p.style.top  = y + 'px';
      const size = Math.random() * 6 + 4;
      p.style.cssText += `width:${size}px;height:${size}px;background:${colors[i % colors.length]}`;
      const angle = (Math.random() * Math.PI * 2);
      const dist  = Math.random() * 45 + 20;
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 820);
    }
  }
}

// ── SRS Algorithm (SM-2) ───────────────────────────────────
class SRS {
  static update(srData, wordId, isCorrect) {
    let sr = srData[wordId] || { score:0, interval:0, ease:2.5, nextReview:0 };
    if (isCorrect) {
      sr.score = Math.min(sr.score + 1, 5);
      sr.interval = sr.interval === 0 ? 1 : sr.interval === 1 ? 6 : Math.round(sr.interval * sr.ease);
      sr.ease = Math.max(1.3, sr.ease + 0.1);
    } else {
      sr.score = Math.max(0, sr.score - 1);
      sr.interval = 0;
      sr.ease = Math.max(1.3, sr.ease - 0.2);
    }
    sr.nextReview = Date.now() + sr.interval * 86400000;
    srData[wordId] = sr;
    return srData;
  }

  static getDue(words, srData) {
    const now = Date.now();
    return words.filter(w => {
      const sr = srData[w.id || w.en];
      if (!sr) return true;             // never studied — always include
      return sr.nextReview <= now;
    });
  }
}

// ── Main Application ───────────────────────────────────────
class App {
  constructor() {
    this.cloudLoaded = false; // true olana kadar saveToCloud çağrılmaz
    this.state   = new StateManager();
    this.audio   = new AudioEngine();
    this.speech  = new SpeechEngine(this.state.get('accent'));
    this.readingEngine = new ReadingEngine(this);

    // Session-level (not persisted)
    this.session = {
      view:       'home',
      learnPool:  [],
      learnIdx:   0,
      correct:    0,
      wrong:      0,
      failed:     [],
      gameMode:   'normal',
      isRecording:false,
      speakIdx:   0,
      shuffledPools: {},
      };
    this._initCanvas();
    this._initTheme();
    this._bindGlobalEvents();
    this._checkStreak();
    this._applyRankTheme();
    this._updateHeader();

    // Boot — Firebase auth sonrası splash kaldır
    this._boot();
  }

  async _boot() {
    window._splashActive = true;

    // Firebase — animasyonla paralel çalıştır
    const firebaseReady = (async () => {
      try {
        // 10 saniyelik emniyet zaman aşımı
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 10000)
        );

        await Promise.race([
          (async () => {
            if (window.authManager) await window.authManager.init();
            if (window._firebaseConfigured) {
              window.storageManager?.init();
              window.analyticsManager?.init();
              window.notificationsManager?.init();
              if (window.remoteConfigManager) await window.remoteConfigManager.init();
            }
            this._applyRemoteFlags();
          })(),
          timeout
        ]);
      } catch (e) {
        console.warn('[App] Boot timeout veya hata — misafir moduna geçiliyor:', e);
      }
    })();

    // Animasyon %100'e ulaşana kadar VE Firebase bitene kadar bekle
    // Splash için 10 saniyelik bir emniyet süresi ekliyoruz
    const splashTimeout = new Promise(resolve => setTimeout(resolve, 10000));
    
    await Promise.all([
      Promise.race([window._splashAnimDone || Promise.resolve(), splashTimeout]),
      firebaseReady
    ]);

    // "HAZIR." yaz, 2 saniye göster, sonra kapat
    const splash  = document.getElementById('splash-screen');
    const barFill = document.getElementById('sp-bar-fill');
    const barPct  = document.getElementById('sp-pct');
    const barLbl  = document.getElementById('sp-bar-lbl');
    if (splash) {
      if (barFill) barFill.style.width = '100%';
      if (barPct)  barPct.textContent  = '100%';
      if (barLbl)  barLbl.textContent  = 'HAZIR.';
      await new Promise(resolve => setTimeout(resolve, 2000));
      splash.style.transition = 'opacity 0.6s';
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.remove();
        window._splashActive = false;
        if (window.authManager?.isLoggedIn) {
          const onboarded = this.state.get('onboarded');
          this.navigate(onboarded ? 'home' : 'placement');
        } else {
          window.authUI?.open();
        }
      }, 620);
    }
  }

  // ─────────────────────────────────────────────────────────
  //  NAVIGATION
  // ─────────────────────────────────────────────────────────

  navigate(view) {
    this.session.view = view;
    this.speech.stop();
    this.session.isSpeakingStory = false;
    this._closeWordDef();

    // Cleanup phantom, nexus, quantum, leaderboard and writing if active
    if (window.phantomMod)       { window.phantomMod.destroy(); }
    if (window.nexusMod)         { window.nexusMod.destroy(); }
    if (window.quantumMod)       { window.quantumMod.destroy(); }
if (window.leaderboardManager) { window.leaderboardManager.unsubscribeAll(); }

    // Cleanup synesthesia if active (prevents memory leaks and ghost timers)
    if (this.session.synthActive || this.session.synthPaused) {
      this.session.synthActive = false;
      this.session.synthPaused = false;
      this._stopSynthDrone();
      if (this.session.synthRevealTimer) {
        clearTimeout(this.session.synthRevealTimer);
        this.session.synthRevealTimer = null;
      }
    }

    // Update nav active states
    document.querySelectorAll('.nav-item, .m-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.target === view);
    });

    const main = document.getElementById('main-content');
    const tpl  = document.getElementById(`tpl-${view}`);
    if (!main || !tpl) return;

    main.classList.remove('animate-in');
    main.innerHTML = '';
    main.appendChild(tpl.content.cloneNode(true));
    // Force reflow to restart animation
    void main.offsetWidth;
    main.classList.add('animate-in');

    const init = {
      home:        () => this._initHome(),
      learn:       () => this._initLearn(),
      reading:     () => this._initReading(),
      speak:       () => this._initSpeak(),
      analytics:   () => this._initAnalytics(),
      nexus:       () => this._initNexus(),
      quantum:     () => this._initQuantum(),
      leaderboard: () => this._initLeaderboard(),
      bridge:      () => this._initBridge(),
      placement:   () => this._initPlacement(),
    };
    if (init[view]) init[view]();

    this.audio.play('click');
    window.analyticsManager?.screenView(view);
    if (['learn', 'speak', 'reading'].includes(view)) {
      window.analyticsManager?.lessonStart(view);
    }
  }

  _initQuantum() {
    const root = document.getElementById('quantum-root');
    if (!root) return;
    window.quantumMod = new QuantumMode(this);
    window.quantumMod.init(root);
  }

  _initNexus() {
    const root = document.getElementById('nexus-root');
    if (!root) return;
    window.nexusMod = new NexusMode(this);
    window.nexusMod.init(root);
  }

  _initLeaderboard() {
    const root = document.getElementById('leaderboard-root');
    if (!root) return;
    window.leaderboardManager.unsubscribeAll();
    window.leaderboardManager.render(root);
  }

  _initBridge() {
    const root = document.getElementById('bridge-root');
    if (!root) return;
    window.bridgeMod = new BridgeModule(this);
    window.bridgeMod.init(root);
  }

  toggleFocusMode() {
    document.body.classList.toggle('focus-mode');
    this.audio.play('pop');
  }

  setAccent(accent) {
    this.state.set('accent', accent);
    this.speech.accent = accent;
    document.querySelectorAll('.accent-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.includes(accent === 'en-US' ? 'US' : 'UK'));
    });
    UI.toast(`🗣️ Aksan: ${accent === 'en-US' ? 'Amerikan İngilizcesi' : 'İngiliz İngilizcesi'}`);
  }

  speakWord(text, rate = 0.88) {
    if (!text || text === '—') return;
    this.speech.speak(text, rate);
    this.audio.play('click');

    // Shadowing Mode: If active and we are in speak view, trigger record after speech
    if (this.state.get('shadowMode') && this.session.view === 'speak') {
      const words = text.split(' ').length;
      const delay = Math.max(1500, words * 500 / rate);
      setTimeout(() => {
        if (this.session.view === 'speak' && !this.session.isRecording) {
          this.toggleRecord();
        }
      }, delay);
    }
  }

  // ─────────────────────────────────────────────────────────
  //  XP & PROGRESS
  // ─────────────────────────────────────────────────────────

  addXP(amount, difficulty = 'easy', type = '') {
    const multiplier = window.remoteFlags?.[`multiplier_${difficulty}`] || 1.0;
    // Learning mode bonus: 1.5× XP for the matching activity type
    const lMode = this.state.get('learningMode') || 'balanced';
    const modeMult = (lMode === 'intensive' && type === 'vocab') ||
                     (lMode === 'speaking'  && type === 'speak') ||
                     (lMode === 'grammar'   && type === 'nexus') ? 1.5 : 1.0;
    let baseAmount = Math.round(amount * multiplier * modeMult);
    if (modeMult > 1) UI.toast(`⚡ Mod bonusu: ×1.5 XP!`, 1500);

    // ── Streak bonusu ──────────────────────────────────────────
    const streak         = this.state.get('streak') || 1;
    const maxBonus       = window.remoteFlags?.maxStreakBonus ?? 50;
    const bonusPct       = streak >= 30 ? 0.5 : streak >= 7 ? 0.25 : streak >= 3 ? 0.1 : 0;
    const streakBonus    = Math.min(Math.round(baseAmount * bonusPct), maxBonus);
    
    let totalGain = baseAmount;
    if (streakBonus > 0) {
      totalGain += streakBonus;
      UI.toast(`🔥 ${streak} günlük seri bonusu: +${streakBonus} XP`, 2000);
    }

    let xp    = this.state.get('xp') + totalGain;
    let level = this.state.get('level');

    const today = new Date().toISOString().split('T')[0];
    const hist  = this.state.get('history') || {};
    hist[today] = (hist[today] || 0) + totalGain;
    this.state.set('history', hist);

    let leveled = false;
    let needed  = level * (window.remoteFlags?.xp_per_level || XP_PER_LEVEL);
    while (xp >= needed) {
      xp -= needed;
      level++;
      leveled = true;
      needed  = level * (window.remoteFlags?.xp_per_level || XP_PER_LEVEL);
    }
    if (leveled) {
      UI.toast(`🎉 Seviye atladın! Level ${level}`, 4000);
      this.audio.play('success');
      if (typeof confetti === 'function') {
        confetti({ particleCount:120, spread:70, origin:{y:0.6}, colors:['#00d4ff','#7c3aed','#f43f5e'] });
      }
      this._applyRankTheme();
      window.analyticsManager?.levelUp(level);
    }
    this.state.update({ xp, level }, true);
    window.analyticsManager?.xpGain(totalGain, this.session.view || 'unknown');
    this._updateHeader();
    if (this.session.view === 'home') this._updateHomeStats();

    const mastery  = this.state.get('mastery');
    const learned  = Object.values(mastery).filter(m => (m.score || 0) >= 3).length;
    const milestones = [10, 25, 50, 100, 200, 300, 400, 500];
    if (milestones.includes(learned)) {
      const prev = this.state.get('_lastMilestoneCelebrated') || 0;
      if (learned > prev) {
        UI.toast(`🏆 Harika! ${learned} kelimeye ulaştın!`, 5000);
        this.state.set('_lastMilestoneCelebrated', learned);
        if (typeof confetti === 'function') {
          setTimeout(() => confetti({ particleCount:80, spread:50, origin:{y:0.5} }), 500);
        }
      }
    }
    
    this.checkAchievements();
    window.leaderboardManager?.updateScore();
  }

  checkAchievements() {
    if (typeof ACHIEVEMENTS_DATA === 'undefined') return;
    const unlocked = this.state.get('achievements') || [];
    let newlyUnlocked = false;

    const stats = {
      xp: this.state.get('xp') + (this.state.get('level') * (this.state.get('level') - 1) / 2) * (window.remoteFlags?.xp_per_level || XP_PER_LEVEL),
      level: this.state.get('level'),
      streak: this.state.get('streak'),
      words: Object.values(this.state.get('mastery') || {}).filter(m => (m.score || 0) >= 3).length,
      speak_100: this.state.get('speakBest') === 100 ? 1 : 0
    };

    for (const ach of ACHIEVEMENTS_DATA) {
      if (!unlocked.includes(ach.id)) {
        if (stats[ach.req.type] !== undefined && stats[ach.req.type] >= ach.req.val) {
          unlocked.push(ach.id);
          newlyUnlocked = true;
          this._showAchievementToast(ach);
        }
      }
    }

    if (newlyUnlocked) {
      this.state.set('achievements', unlocked);
      if (this.session.view === 'analytics') this._renderBadges();
    }
  }

  _showAchievementToast(ach) {
    this.audio.play('success');
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="ach-toast-icon">${ach.icon}</div>
      <div class="ach-toast-info">
        <h4>Başarım Kilidi Açıldı!</h4>
        <h3>${ach.title}</h3>
        <p>${ach.desc}</p>
      </div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.2 }, colors: ['#fbbf24', '#f59e0b', '#fff'] });
    }
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  _applyRankTheme() {
    const level = this.state.get('level');
    const tier  = Math.min(Math.floor((level - 1) / 5) + 1, 6);
    document.body.className = `rank-${tier}`;
  }

  _getRank() {
    const level = this.state.get('level');
    let rank = RANKS[0];
    for (const r of RANKS) { if (level >= r.min) rank = r; }
    return rank;
  }

  _checkStreak() {
    const today      = new Date().toISOString().split('T')[0];
    const lastActive = this.state.get('lastActive');
    if (lastActive === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let streak = this.state.get('streak');
    if (lastActive === yesterday) {
      streak++;
    } else if (lastActive && lastActive !== today) {
      streak = 1;
    }
    this.state.update({ streak, lastActive: today, sessionsToday: 0 }, true);
    window.analyticsManager?.streakUpdate(streak);
  }

  _updateHeader() {
    UI.setEl('hdr-xp',     this.state.get('xp'));
    UI.setEl('hdr-level',  this.state.get('level'));
    UI.setEl('hdr-streak', this.state.get('streak'));
  }

  // Buluttan veri yüklendikten sonra tüm UI'ı yeniler
  _syncUIFromState() {
    this._updateHeader();
    this._applyRankTheme();
    this._checkStreak();
    this._initTheme();
    // Splash aktifken navigate etme — boot tamamlandıktan sonra navigate edilecek
    if (!window._splashActive) this.navigate('home');
  }

  // Remote Config flaglerine gore UI section'larini goster/gizle
  _applyRemoteFlags() {
    const flags = window.remoteFlags;
    if (!flags) return;

    // feature_speaking_ai
    const aiLabel = document.getElementById('speaking-ai-badge');
    if (aiLabel) aiLabel.style.display = flags.feature_speaking_ai ? '' : 'none';

    // feature_confetti: false ise confetti fonksiyonunu devre disi birak
    if (!flags.feature_confetti && typeof window.confetti === 'function') {
      window._confettiBackup = window._confettiBackup || window.confetti;
      window.confetti = () => {};
    } else if (flags.feature_confetti && window._confettiBackup) {
      window.confetti = window._confettiBackup;
    }

    // feature_nexus_mode: nexus nav itemlarini gizle/goster
    document.querySelectorAll('[data-target="nexus"]').forEach(el => {
      el.style.display = flags.feature_nexus_mode ? '' : 'none';
    });

    // feature_convo_mode: convo (speaking lab) butonunu gizle/goster
    document.querySelectorAll('[data-target="quantum"]').forEach(el => {
      el.style.display = flags.feature_convo_mode ? '' : 'none';
    });
  }

  // ─────────────────────────────────────────────────────────
  //  HOME VIEW
  // ─────────────────────────────────────────────────────────

  _initHome() {
    this._updateHomeStats();
    this._renderWOD();
    this._renderStreakCalendar();
    this._renderCollocTip();

    const accent = this.state.get('accent');
    document.querySelectorAll('.accent-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.includes(accent === 'en-US' ? 'US' : 'UK'));
    });
  }

  _updateHomeStats() {
    const mastery = this.state.get('mastery');
    const learned = Object.values(mastery).filter(m => (m.score || 0) >= 3).length;
    const xp      = this.state.get('xp');
    const level   = this.state.get('level');
    const streak  = this.state.get('streak');
    const total   = this.state.get('totalAttempts');
    const correct = this.state.get('totalCorrect');
    const acc     = total > 0 ? Math.round((correct / total) * 100) : 0;

    UI.setEl('home-words',  learned);
    UI.setEl('home-xp',     xp);
    UI.setEl('home-streak', `🔥${streak}`);
    UI.setEl('home-acc',    `${acc}%`);
    UI.setEl('home-lvl',    level);

    const needed = level * (window.remoteFlags?.xp_per_level || XP_PER_LEVEL);
    UI.setEl('xp-remain', `${needed - xp} XP kaldı`);
    setTimeout(() => UI.setWidth('xp-bar', (xp / needed) * 100), 100);

    const rank = this._getRank();
    UI.setEl('rank-icon',  rank.icon);
    UI.setEl('rank-name',  rank.name);
    UI.setEl('rank-level', `Level ${level}`);
    // Sidebar footer
    UI.setEl('sf-rank-icon', rank.icon);
    UI.setEl('sf-rank-name', rank.name);
    UI.setEl('sf-level-txt', `Level ${level}`);
    const needed2 = level * (window.remoteFlags?.xp_per_level || XP_PER_LEVEL);
    setTimeout(() => UI.setWidth('sf-xp-fill', Math.min((xp / needed2) * 100, 100)), 200);

    const wordsPct = WORDS && WORDS.length ? Math.round((learned / WORDS.length) * 100) : 0;
    setTimeout(() => UI.setWidth('ac-words-bar', wordsPct), 150);
    UI.setEl('ac-words-pct', `${wordsPct}%`);

    const due = SRS.getDue(WORDS, mastery);
    const dueBadge = document.getElementById('ac-due-badge');
    if (dueBadge) {
      dueBadge.textContent = due.length > 99 ? '99+' : due.length;
      dueBadge.style.display = due.length > 0 ? '' : 'none';
    }

    const bestSpeak = this.state.get('speakBest');
    const el = document.getElementById('ac-speak-hint');
    if (el) el.textContent = bestSpeak > 0 ? `En iyi: ${bestSpeak}% 🏆` : 'Bugün dene →';

    const todayKey = new Date().toISOString().split('T')[0];
    const todayXP  = (this.state.get('history')[todayKey] || 0);
    const goalXP   = window.remoteFlags?.dailyXPGoal ?? 100;
    const goalPct  = Math.min(100, Math.round((todayXP / goalXP) * 100));
    setTimeout(() => UI.setWidth('daily-goal-bar', goalPct), 200);
    UI.setEl('daily-goal-pct', `${todayXP}/${goalXP} XP`);
    const goalEl = document.getElementById('daily-goal-label');
    if (goalEl) goalEl.textContent = goalPct >= 100 ? '✅ Günlük hedef tamamlandı!' : '🎯 Günlük Hedef';

    const hour = new Date().getHours();
    const greet = hour < 12 ? '🌅 Günaydın!' : hour < 18 ? '☀️ İyi öğlenler!' : '🌙 İyi akşamlar!';
    UI.setEl('home-greeting', greet);
    UI.setEl('home-date', new Date().toLocaleDateString('tr-TR', { weekday:'long', day:'numeric', month:'long' }));
    this._updateMissions();
  }

  _updateMissions() {
    const el = document.getElementById('missions-list');
    if (!el) return;
    const today      = new Date().toISOString().split('T')[0];
    const todayXP    = (this.state.get('history') || {})[today] || 0;
    const sessions   = this.state.get('sessionsToday') || 0;
    const lastActive = this.state.get('lastActive') || '';
    const progress   = {
      xp:      Math.min(todayXP, 100),
      session: Math.min(sessions, 3),
      streak:  lastActive === today ? 1 : 0,
    };
    el.innerHTML = DAILY_MISSIONS.map(m => {
      const val  = progress[m.id];
      const pct  = Math.min(100, Math.round((val / m.target) * 100));
      const done = pct >= 100;
      return `<div class="mission-item${done ? ' mission-done' : ''}">
        <span class="mission-icon">${done ? '✅' : m.icon}</span>
        <div class="mission-info">
          <div class="mission-name">${m.label}</div>
          <div class="mission-track"><div class="mission-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="mission-val">${val}/${m.target}</span>
      </div>`;
    }).join('');
  }

  _renderWOD() {
    if (!WORDS || !WORDS.length) return;
    const day  = new Date().toDateString();
    let h = 0;
    for (const c of day) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    const wod = WORDS[Math.abs(h) % WORDS.length];
    UI.setEl('wod-icon', wod.icon || '📚');
    UI.setEl('wod-word', wod.en);
    UI.setEl('wod-ipa',  wod.ipa || '');
    UI.setEl('wod-tr',   wod.tr);
  }

  _renderStreakCalendar() {
    const el = document.getElementById('streak-cal');
    if (!el) return;
    const hist = this.state.get('history');
    const days = ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
    let html = '';
    for (let i = 6; i >= 0; i--) {
      const d   = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split('T')[0];
      const xp  = hist[key] || 0;
      const active = xp > 0;
      const label  = days[d.getDay() === 0 ? 6 : d.getDay() - 1];
      html += `<div class="streak-day ${active ? 'active' : ''}" title="${key}: ${xp} XP">
        <div class="day-dot"></div>
        <span>${label}</span>
      </div>`;
    }
    el.innerHTML = html;
  }

  _renderCollocTip() {
    const el = document.getElementById('colloc-tip-card');
    if (!el || typeof COLLOCATIONS === 'undefined' || !COLLOCATIONS.length) return;
    const day  = new Date().toDateString();
    let h = 0;
    for (const c of day) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    const tip = COLLOCATIONS[Math.abs(h) % COLLOCATIONS.length];
    el.innerHTML = `
      <div class="colloc-tip-inner">
        <div class="colloc-tip-label">💡 Dil İpucu</div>
        <div class="colloc-phrase">${tip.phrase}</div>
        <div class="colloc-tr">${tip.tr}</div>
        ${tip.warn ? `<div class="colloc-warn">${tip.warn}</div>` : ''}
      </div>`;
  }


  // ─────────────────────────────────────────────────────────
  //  SYNESTHESIA MODULE (WORLD FIRST)
  // ─────────────────────────────────────────────────────────

  _initLearn() {
    const intro   = document.getElementById('synth-intro');
    const chamber = document.getElementById('synth-chamber');
    if (!intro) return;
    if (!this._synthSessionLen)  this._synthSessionLen  = 10;
    if (!this._synthModeConfig)  this._synthModeConfig  = 'mix';
    intro.style.display = 'flex';
    if (chamber) chamber.style.display = 'none';
    const pw = document.getElementById('synth-progress-wrap');
    if (pw) pw.style.display = 'none';
    this.session.synthActive = false;
    this.session.synthPaused = false;
  }

  _setSynthCEFR(cefr, btn) {
    this._synthCEFRFilter = cefr;
    const btns = document.querySelectorAll('[data-action="set-synth-cefr"]');
    btns.forEach(b => b.classList.toggle('active', b === btn));
    this.audio.play('tick');
  }

  startSynesthesia() {
    if (this._synthModeConfig === 'phantom') {
      const wrapper = document.querySelector('.synesthesia-wrapper');
      if (!wrapper) return;
      document.getElementById('synth-intro').style.display = 'none';
      window.phantomMod = new PhantomMode(this);
      
      // Pass the CEFR filter to phantomMod
      if (this._synthCEFRFilter && this._synthCEFRFilter !== 'all') {
        window.phantomMod.cefrFilter = [this._synthCEFRFilter];
      } else {
        window.phantomMod.cefrFilter = [];
      }

      window.phantomMod.init(wrapper);
      return;
    }

    this.session.synthActive = true;
    const len = this._synthSessionLen || (window.remoteFlags?.srs_session_word_count ?? 10);

    // Filter words by CEFR if selected
    let sourcePool = WORDS;
    if (this._synthCEFRFilter && this._synthCEFRFilter !== 'all') {
      sourcePool = WORDS.filter(w => w.level === this._synthCEFRFilter);
      if (sourcePool.length === 0) {
        UI.toast(`${this._synthCEFRFilter} seviyesinde kelime bulunamadı.`);
        sourcePool = WORDS;
      }
    }

    // SRS-prioritized pool: due words first, then fill with random
    const mastery = this.state.get('mastery');
    const due = SRS.getDue(sourcePool, mastery);
    const notDue = sourcePool.filter(w => !due.includes(w)).sort(() => Math.random() - 0.5);
    const shuffledDue = [...due].sort(() => Math.random() - 0.5);
    this.session.learnPool = [...shuffledDue, ...notDue].slice(0, len);

    this.session.learnIdx           = 0;
    this.session.synthScore         = 0;
    this.session.synthStreak        = 0;
    this.session.synthPerfect       = 0;
    this.session.synthCombo         = 1;
    this.session.synthStartTime     = Date.now();
    this.session.synthMissed        = [];
    this.session.synthPaused        = false;
    this.session.synthWordHints     = 0;
    this.session.synthSpeedBonusTotal = 0;
    this.session.synthWordTimes     = [];
    this.session.synthSpellCount    = 0;
    this.session.synthChoiceCount   = 0;

    document.getElementById('synth-intro').style.display = 'none';
    document.getElementById('synth-chamber').style.display = 'flex';

    // Show virtual keyboard on touch/mobile devices
    const isMobile = window.innerWidth <= 1024 || 'ontouchstart' in window;
    const vkb = document.getElementById('synth-vkb');
    if (vkb && isMobile) {
      vkb.style.display = 'flex';
      this._renderSynthVKB();
    }

    this._startSynthDrone();
    this._loadSynthWord();
    this.audio.play('pop');
  }

  _setSynthLen(n, btn) {
    this._synthSessionLen = n;
    document.querySelectorAll('.sp-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.audio.play('click');
  }

  _startSynthDrone() {
    if (this.session.synthDrone) return;
    try {
      const ctx = this.audio._ctx_ensure();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      this.session.synthDrone = { osc, gain };
    } catch(e) {}
  }

  _stopSynthDrone() {
    if (this.session.synthDrone) {
      const { osc, gain } = this.session.synthDrone;
      const ctx = this.audio._ctx;
      this.session.synthDrone = null;
      if (ctx) {
        try {
          gain.gain.cancelScheduledValues(ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          const stopTime = ctx.currentTime + 0.6;
          osc.stop(stopTime);
        } catch(e) {
          try { osc.stop(); } catch(_) {}
        }
      } else {
        try { osc.stop(); } catch(_) {}
      }
    }
  }

  _loadSynthWord() {
    const word = this.session.learnPool[this.session.learnIdx];
    if (!word) {
      this._finishSynesthesia();
      return;
    }

    this.session.synthWord      = word;
    this.session.synthTyped     = '';
    this.session.synthFails     = 0;
    this.session.synthWordHints = 0;
    this.session.synthPaused    = false;

    // Category → accent color
    const themes = {
      'Doğa':'#10b981', 'Nature':'#10b981',
      'Tech':'#00d4ff', 'Teknoloji':'#00d4ff',
      'Eylemler':'#f43f5e', 'Action':'#f43f5e',
      'Seyahat':'#f59e0b', 'Travel':'#f59e0b',
      'Duygular':'#7c3aed', 'Feeling':'#7c3aed',
      'Ev':'#ec4899', 'Home':'#ec4899',
      'Eğitim':'#6366f1', 'Yiyecek':'#f59e0b',
      'İnsan':'#00d4ff', 'Hayvanlar':'#10b981',
    };
    const themeColor = themes[word.cat] || '#00d4ff';
    document.documentElement.style.setProperty('--synth-accent', themeColor);
    this.session.synthAccentColor = themeColor; // Cache for performance

    // Word counter + progress bar
    const idx   = this.session.learnIdx;
    const total = this.session.learnPool.length;
    const pw    = document.getElementById('synth-progress-wrap');
    const ctr   = document.getElementById('synth-counter');
    const fill  = document.getElementById('synth-prog-fill');
    if (pw)   pw.style.display   = 'flex';
    if (ctr)  ctr.textContent    = `${idx + 1} / ${total}`;
    if (fill) fill.style.width   = `${(idx / total) * 100}%`;

    // Word metadata (icon, CEFR level, category)
    const iconEl = document.getElementById('synth-word-icon');
    const cefrEl = document.getElementById('synth-cefr-badge');
    const catEl  = document.getElementById('synth-cat-badge');
    const hintEl = document.getElementById('synth-hint-used');
    if (iconEl) iconEl.textContent = word.icon || '📚';
    if (cefrEl) { cefrEl.textContent = word.level || 'A1'; cefrEl.className = `synth-cefr-badge lvl-${word.level || 'A1'}`; }
    
    if (catEl) catEl.textContent = word.cat || '';
    if (hintEl) hintEl.style.display = 'none';

    UI.setEl('synth-tr', word.tr);

    // Example sentence — delayed fade-in
    const exEl = document.getElementById('synth-ex');
    if (exEl) {
      exEl.textContent = word.ex || '';
      exEl.style.opacity = '0';
      setTimeout(() => { if (this.session.synthActive && !this.session.synthPaused) exEl.style.opacity = '1'; }, 2500);
    }

    // Reset core orb
    const core = document.getElementById('synth-core');
    const ring = document.getElementById('synth-progress-ring');
    if (core) {
      core.className  = 'synth-core';
      core.style.cssText = `transform:scale(1);box-shadow:0 0 30px ${themeColor}44;background:${themeColor}22`;
    }
    if (ring) {
      ring.style.stroke           = themeColor;
      ring.style.strokeDashoffset = '301.44';
    }

    // Determine word mode
    let wordMode = this._synthModeConfig || 'mix';
    if (wordMode === 'mix') {
      wordMode = Math.random() < 0.5 ? 'spell' : 'choice';
    }
    if (this._synthModeConfig === 'speed') wordMode = 'spell'; // Speed mode uses spell (writing) for challenge
    this.session.synthWordMode = wordMode;

    // Update mode indicator in topbar
    const modeInd = document.getElementById('synth-mode-indicator');
    if (modeInd) {
      modeInd.style.display = 'inline-flex';
      if (this._synthModeConfig === 'speed') {
        modeInd.textContent = '⚡ ZAMANA KARŞI';
        modeInd.className = 'synth-mode-ind speed';
      } else if (wordMode === 'spell') {
        modeInd.textContent = '⌨️ YAZMA';
        modeInd.className = 'synth-mode-ind spell';
      } else {
        modeInd.textContent = '🔘 SEÇME';
        modeInd.className = 'synth-mode-ind choice';
      }
    }

    // Show/hide mode UI
    const display    = document.getElementById('synth-input-display');
    const choiceArea = document.getElementById('synth-choice-area');
    const contextArea= document.getElementById('synth-context-area');
    const listenBtn  = document.getElementById('synth-hint-listen-btn');
    const trEl       = document.getElementById('synth-tr');

    if (contextArea) contextArea.style.display = 'none';
    if (trEl) trEl.style.display = 'block';
    if (wordMode === 'choice') {
      this.session.synthChoiceCount = (this.session.synthChoiceCount || 0) + 1;
      if (display)    display.style.display    = 'none';
      if (choiceArea) choiceArea.style.display = '';
      if (listenBtn)  listenBtn.style.display  = 'none';
      this._renderChoiceMode(word);
    } else {
      this.session.synthSpellCount = (this.session.synthSpellCount || 0) + 1;
      if (choiceArea) { choiceArea.style.display = 'none'; choiceArea.innerHTML = ''; }
      if (display)    display.style.display    = '';
      if (listenBtn)  listenBtn.style.display  = '';
      // Build letter blanks with synesthetic colors
      if (display) {
        const wlen = word.en.length;
        const sizeClass = wlen > 25 ? 'word-xxl' : wlen > 20 ? 'word-xl' : wlen > 15 ? 'word-lg' : wlen > 10 ? 'word-md' : '';
        display.className = sizeClass ? `synth-input-area ${sizeClass}` : 'synth-input-area';
        display.innerHTML = word.en.split('').map((ch, i) =>
          ch === ' '
            ? `<span data-idx="${i}" data-ch=" " class="synth-space-slot">⎵</span>`
            : `<span data-idx="${i}" data-ch="${ch.toLowerCase()}">_</span>`
        ).join('');
      }
      // Auto-reveal first letter after 8s (disabled in speed mode)
      if (this.session.synthRevealTimer) clearTimeout(this.session.synthRevealTimer);
      if (this._synthModeConfig !== 'speed') {
        this.session.synthRevealTimer = setTimeout(() => {
          if (this.session.synthActive && this.session.synthTyped.length === 0) {
            this._handleSynthKey(word.en[0]);
            UI.toast(`💡 İpucu: İlk harf "${word.en[0].toUpperCase()}"`, 2000);
          }
        }, 8000);
      }
    }

    // Start speed timer (both modes)
    this._startSpeedTimer();

    // Update VKB space button visibility per word
    const vkb = document.getElementById('synth-vkb');
    if (vkb && vkb.style.display !== 'none') this._renderSynthVKB();

    setTimeout(() => { if (this.session.synthActive) this.speakWord(word.en); }, 400);
  }

  _handleSynthKey(key) {
    if (this.session.synthPaused || !this.session.synthActive) return;
    const word = this.session.synthWord;
    if (!word) return;

    const targetStr  = word.en.toLowerCase();
    const targetChar = targetStr[this.session.synthTyped.length];

    if (key.toLowerCase() === targetChar) {
      this.session.synthTyped += targetChar;
      this._playSynthChime(this.session.synthTyped.length);
      this._updateSynthVisuals(true);

      if (this.session.synthTyped.length === targetStr.length) {
        // Clear reveal timer immediately on completion
        if (this.session.synthRevealTimer) {
          clearTimeout(this.session.synthRevealTimer);
          this.session.synthRevealTimer = null;
        }
        setTimeout(() => this._completeSynthWord(), 220);
      }
    } else {
      this.session.synthFails++;
      this._playSynthError();
      this._updateSynthVisuals(false);

      if (this.session.synthFails >= 3) {
        UI.toast("⚠️ 3 Hata! Doğru cevap gösteriliyor...", 2000);
        setTimeout(() => this.skipSynthWord(), 600);
      }
    }
  }

  _updateSynthVisuals(isCorrect) {
    if (!this.session.synthWord) return;
    const core    = document.getElementById('synth-core');
    const display = document.getElementById('synth-input-display');
    const ring    = document.getElementById('synth-progress-ring');
    const typedLen = this.session.synthTyped.length;
    const wordLen  = this.session.synthWord.en.length;
    const accent   = this.session.synthAccentColor || '#00d4ff';

    if (display) {
      const spans = display.querySelectorAll('span');
      spans.forEach((span, i) => {
        if (i < typedLen) {
          const ch = this.session.synthWord.en[i];
          if (ch === ' ') {
            span.textContent = '⎵';
            span.classList.add('filled', 'synth-space-filled');
            span.style.color = 'rgba(255,255,255,0.3)';
            span.style.textShadow = '';
            span.style.borderBottomColor = 'transparent';
          } else {
            const letterColor = this._getLetterColor(ch);
            span.textContent = ch;
            span.classList.add('filled');
            span.style.color      = letterColor;
            span.style.textShadow = `0 0 14px ${letterColor}cc, 0 0 30px ${letterColor}55`;
            span.style.borderBottomColor = letterColor;
          }
        }
      });
      // Shake the current blank on wrong key
      if (!isCorrect && spans[typedLen]) {
        spans[typedLen].classList.add('shake-letter');
        setTimeout(() => spans[typedLen]?.classList.remove('shake-letter'), 420);
      }
    }

    if (ring) {
      const circ   = 301.44;
      ring.style.strokeDashoffset = circ - (typedLen / wordLen) * circ;
    }

    if (core) {
      if (isCorrect) {
        const scale = 1 + (typedLen / wordLen) * 0.55;
        core.style.transform  = `scale(${scale})`;
        core.style.boxShadow  = `0 0 ${35 + typedLen * 12}px ${accent}99`;
        core.style.background = `${accent}2a`;
        core.classList.remove('error');
      } else {
        core.classList.add('error');
        setTimeout(() => {
          if (this.session.synthActive) {
            core.classList.remove('error');
            core.style.boxShadow = `0 0 ${35 + typedLen * 12}px ${accent}44`;
          }
        }, 320);
      }
    }
  }

  _completeSynthWord() {
    if (!this.session.synthWord) return;
    const word    = this.session.synthWord;
    const perfect = this.session.synthFails === 0;

    // Clear reveal timer
    if (this.session.synthRevealTimer) { clearTimeout(this.session.synthRevealTimer); this.session.synthRevealTimer = null; }

    // Particle burst + orb explosion
    const core = document.getElementById('synth-core');
    if (core) {
      const rect = core.getBoundingClientRect();
      UI.particles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      core.classList.add('explode');
    }

    // Stop speed timer + record time
    this._stopSpeedTimer();
    const elapsed = (Date.now() - (this.session.synthWordStartTime || Date.now())) / 1000;
    this.session.synthWordTimes = this.session.synthWordTimes || [];
    this.session.synthWordTimes.push(elapsed);

    // Scoring & combo
    let points = this.session.synthWordMode === 'choice' ? 10 : 20;
    if (this._synthModeConfig === 'speed') points = 30; // Speed mode gives fixed 30 XP

    if (perfect) {
      if (this._synthModeConfig !== 'speed') {
        points += this.session.synthWordMode === 'choice' ? 5 : 10;
        this.session.synthStreak++;
        this.session.synthPerfect = (this.session.synthPerfect || 0) + 1;
        if      (this.session.synthStreak >= 10) this.session.synthCombo = 3;
        else if (this.session.synthStreak >= 5)  this.session.synthCombo = 2;
        else                                     this.session.synthCombo = 1;
        points = Math.round(points * this.session.synthCombo);

        const speedBonus = this._getSpeedBonus(elapsed);
        if (speedBonus > 0) {
          points += speedBonus;
          this.session.synthSpeedBonusTotal = (this.session.synthSpeedBonusTotal || 0) + speedBonus;
          this._showSpeedBonus(speedBonus);
        }
      } else {
        // Simple combo for speed mode
        this.session.synthStreak++;
        if (this.session.synthStreak >= 5) points += 10;
      }
    } else {
      // Word not perfect — reset streak and combo
      this.session.synthStreak = 0;
      this.session.synthCombo  = 1;
      this.session.synthMissed = this.session.synthMissed || [];
      this.session.synthMissed.push(word);
    }

    this._updateSynthCombo();
    this.session.synthScore += points;
    const chip = document.getElementById('synth-score');
    if (chip) {
      chip.textContent = `${this.session.synthScore} XP`;
      chip.classList.remove('xp-bump');
      void chip.offsetWidth; // reflow to restart animation
      chip.classList.add('xp-bump');
      setTimeout(() => chip.classList.remove('xp-bump'), 360);
    }

    // Audio: base click + harmonic chord
    this.audio.play('success');
    this._playSynthCompletion(perfect);

    // Confetti for perfect word with combo
    if (perfect && this.session.synthCombo >= 2 && typeof confetti === 'function') {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.5 }, colors: ['#00d4ff', '#7c3aed', '#f59e0b'] });
    }

    this._updateMastery(word.id || word.en, perfect);

    setTimeout(() => {
      this.session.learnIdx++;
      this._loadSynthWord();
    }, 1100);
  }

  skipSynthWord() {
    if (this.session.synthPaused) return;
    if (this.session.synthRevealTimer) { clearTimeout(this.session.synthRevealTimer); this.session.synthRevealTimer = null; }
    this._stopSpeedTimer();
    const word = this.session.synthWord;
    if (word) {
      this.session.synthMissed = this.session.synthMissed || [];
      this.session.synthMissed.push(word);
    }
    this.session.synthFails++;
    this.session.synthStreak = 0;
    this.session.synthCombo  = 1;
    this._updateSynthCombo();

    const display = document.getElementById('synth-input-display');
    if (display) {
      display.innerHTML = word.en.split('').map(c => `<span class="filled error-text">${c}</span>`).join('');
    }
    
    this._playSynthError();
    this._updateMastery(word.id || word.en, false);

    setTimeout(() => {
      this.session.learnIdx++;
      this._loadSynthWord();
    }, 1500);
  }

  playSynthHint() {
    if (this.session.synthPaused || !this.session.synthWord) return;
    this.speakWord(this.session.synthWord.en);
    this.session.synthFails++;
    this.session.synthWordHints = (this.session.synthWordHints || 0) + 1;
    const hintEl  = document.getElementById('synth-hint-used');
    const countEl = document.getElementById('synth-hints-count');
    if (hintEl)  hintEl.style.display = 'block';
    if (countEl) countEl.textContent  = this.session.synthWordHints;
  }

  _playSynthChime(index) {
    try {
      const ctx    = this.audio._ctx_ensure();
      const t      = ctx.currentTime;
      const osc    = ctx.createOscillator();
      const gain   = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      const word    = this.session.synthWord;
      const wordLen = word ? word.en.length : 6;
      // CEFR-based octave: higher level = higher octave = more rewarding sound
      const cefrOct = { 'A1':1, 'A2':1, 'B1':1.5, 'B2':2, 'C1':2, 'C2':2.5 }[word?.level || 'A1'] || 1;

      if (panner) {
        panner.pan.setValueAtTime((index / wordLen) * 2 - 1, t);
        osc.connect(gain); gain.connect(panner); panner.connect(ctx.destination);
      } else {
        osc.connect(gain); gain.connect(ctx.destination);
      }

      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
      const freq  = Math.min(scale[(index - 1) % scale.length] * cefrOct, 1760);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.start(t); osc.stop(t + 0.9);
    } catch(e) {}
  }

  _playSynthCompletion(isPerfect) {
    try {
      const ctx   = this.audio._ctx_ensure();
      const t     = ctx.currentTime;
      // Perfect: ascending chord C-E-G-C5 | Imperfect: just C-E
      const freqs = isPerfect
        ? [[523.25, 0], [659.25, 0.07], [783.99, 0.14], [1046.5, 0.21]]
        : [[392.00, 0], [493.88, 0.09]];
      freqs.forEach(([freq, delay]) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + delay);
        gain.gain.setValueAtTime(0, t + delay);
        gain.gain.linearRampToValueAtTime(isPerfect ? 0.18 : 0.11, t + delay + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.75);
        osc.start(t + delay); osc.stop(t + delay + 0.75);
      });
    } catch(e) {}
  }

  _playSynthError() {
    try {
       const ctx = this.audio._ctx_ensure();
       const t = ctx.currentTime;
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       osc.connect(gain); gain.connect(ctx.destination);
       osc.type = 'sawtooth';
       osc.frequency.setValueAtTime(150, t);
       osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);
       gain.gain.setValueAtTime(0.4, t);
       gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
       osc.start(t); osc.stop(t+0.3);
       if (navigator.vibrate) navigator.vibrate(50);
    } catch(e){}
  }

  _finishSynesthesia() {
    this._stopSynthDrone();
    if (this.session.synthRevealTimer) { clearTimeout(this.session.synthRevealTimer); this.session.synthRevealTimer = null; }
    this.session.synthActive = false;
    this.session.synthPaused = false;
    this.addXP(this.session.synthScore, 'easy', 'vocab');
    this.state.update({ sessions: this.state.get('sessions') + 1, sessionsToday: (this.state.get('sessionsToday') || 0) + 1 });

    const total   = this.session.learnPool.length;
    const perfect = this.session.synthPerfect || 0;
    const missed  = this.session.synthMissed  || [];
    const acc     = total > 0 ? Math.round((perfect / total) * 100) : 0;
    const elapsed = Math.round((Date.now() - (this.session.synthStartTime || Date.now())) / 1000);
    const timeStr = elapsed >= 60 ? `${Math.floor(elapsed / 60)}d ${elapsed % 60}s` : `${elapsed}s`;

    // Grade color and text
    let gradeColor, gradeText;
    if      (acc >= 90) { gradeColor = 'var(--green)';  gradeText = '🏆 Mükemmel!'; }
    else if (acc >= 70) { gradeColor = 'var(--cyan)';   gradeText = '🎉 Harika!'; }
    else if (acc >= 50) { gradeColor = 'var(--amber)';  gradeText = '💪 İyi iş!'; }
    else                { gradeColor = 'var(--rose)';   gradeText = '🔄 Devam et!'; }

    // Missed words section
    const missedHtml = missed.length > 0 ? `
      <div class="synth-missed-section">
        <div class="synth-missed-title">📝 Tekrar Edilecekler (${missed.length})</div>
        <div class="synth-missed-words">
          ${missed.map(w => `<span class="synth-missed-chip" title="${w.tr}">${w.icon || ''} ${w.en}</span>`).join('')}
        </div>
      </div>` : '';

    // Speed stats
    const times = this.session.synthWordTimes || [];
    const avgTime = times.length ? (times.reduce((a,b) => a+b, 0) / times.length).toFixed(1) : '—';
    const fastestTime = times.length ? Math.min(...times).toFixed(1) : '—';
    const speedBonus  = this.session.synthSpeedBonusTotal || 0;

    // Mode breakdown
    const spellCount  = this.session.synthSpellCount  || 0;
    const choiceCount = this.session.synthChoiceCount || 0;
    const modeHtml = (spellCount > 0 || choiceCount > 0) ? `
      <div class="synth-finish-modes">
        ${spellCount  > 0 ? `<span class="sfm-chip spell">⌨️ ${spellCount} Yazma</span>`  : ''}
        ${choiceCount > 0 ? `<span class="sfm-chip choice">🔘 ${choiceCount} Seçme</span>` : ''}
        ${speedBonus  > 0 ? `<span class="sfm-chip speed">⚡ +${speedBonus} Hız XP</span>` : ''}
      </div>` : '';

    const chamber = document.getElementById('synth-chamber');
    if (!chamber) return;
    chamber.innerHTML = `
      <div class="synth-intro synth-finish-screen" style="display:flex">
        <div class="synth-finish-grade" style="color:${gradeColor}">${gradeText}</div>
        <h1 class="synth-title" style="font-size:1.8rem;margin-bottom:20px">BAĞLANTI TAMAMLANDI</h1>
        ${modeHtml}
        <div class="synth-finish-stats">
          <div class="sfs">
            <div class="sfs-val" style="color:var(--cyan)">${this.session.synthScore}</div>
            <div class="sfs-label">XP Kazanıldı</div>
          </div>
          <div class="sfs">
            <div class="sfs-val" style="color:var(--green)">${perfect}/${total}</div>
            <div class="sfs-label">Mükemmel</div>
          </div>
          <div class="sfs">
            <div class="sfs-val" style="color:var(--violet)">${acc}%</div>
            <div class="sfs-label">Doğruluk</div>
          </div>
          <div class="sfs">
            <div class="sfs-val" style="color:var(--amber)">${avgTime}s</div>
            <div class="sfs-label">Ort. Süre</div>
          </div>
          <div class="sfs">
            <div class="sfs-val" style="color:var(--rose)">${fastestTime}s</div>
            <div class="sfs-label">En Hızlı</div>
          </div>
          <div class="sfs">
            <div class="sfs-val" style="color:var(--text-2)">${timeStr}</div>
            <div class="sfs-label">Toplam</div>
          </div>
        </div>
        ${missedHtml}
        <div class="synth-finish-actions">
          <button class="synth-start-btn" data-action="navigate" data-target="learn">TEKRAR OYNA</button>
          <button class="synth-hint-btn synth-finish-home-btn" data-action="navigate" data-target="home">Ana Menü</button>
        </div>
      </div>
    `;
    if (typeof confetti === 'function') {
      confetti({ particleCount: acc >= 70 ? 180 : 80, spread: 100, colors: ['#00d4ff','#7c3aed','#10b981','#f59e0b'] });
    }
  }

  _updateMastery(id, isCorrect) {
    const mastery = this.state.get('mastery');
    const updated = SRS.update(mastery, id, isCorrect);
    this.state.set('mastery', updated, true);
    const total   = this.state.get('totalAttempts') + 1;
    const correct = this.state.get('totalCorrect')  + (isCorrect ? 1 : 0);
    this.state.update({ totalAttempts: total, totalCorrect: correct }, true);
  }

  _updateSynthCombo() {
    const badge = document.getElementById('synth-combo');
    const val   = document.getElementById('synth-combo-val');
    if (!badge) return;
    const combo = this.session.synthCombo || 1;
    if (combo > 1) {
      badge.style.display = 'inline-flex';
      if (val) val.textContent = combo;
      badge.style.background = combo >= 3 ? 'rgba(244,63,94,0.25)' : 'rgba(245,158,11,0.25)';
      badge.style.borderColor = combo >= 3 ? 'var(--rose)' : 'var(--amber)';
      badge.style.color       = combo >= 3 ? 'var(--rose)' : 'var(--amber)';
      badge.classList.add('combo-pop');
      setTimeout(() => badge.classList.remove('combo-pop'), 400);
    } else {
      badge.style.display = 'none';
    }
  }

  _renderSynthVKB() {
    const vkb = document.getElementById('synth-vkb');
    if (!vkb) return;
    const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
    const word = this.session.synthWord;
    const hasSpace = word && word.en.includes(' ');
    vkb.innerHTML = rows.map(row =>
      `<div class="vkb-row">${row.split('').map(k =>
        `<button class="vkb-key synth-key-btn" data-key="${k}">${k}</button>`
      ).join('')}</div>`
    ).join('') +
    `<div class="vkb-row vkb-action-row">
      ${hasSpace ? `<button class="vkb-key vkb-space synth-key-btn" data-key=" ">⎵</button>` : ''}
      <button class="vkb-key vkb-hint" data-action="play-synth-hint">🔊 Dinle</button>
      <button class="vkb-key vkb-skip" data-action="skip-synth-word">⏭ Geç</button>
    </div>`;
  }

  // ── SİNESTEZİ v5.0 YENİ METODLAR ─────────────────────────

  _setSynthMode(mode, btn) {
    this._synthModeConfig = mode;
    document.querySelectorAll('.synth-mode-card').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.audio.play('click');
  }

  // Chromesthesia letter → colour mapping (gerçek sinestezi)
  _getLetterColor(ch) {
    const map = {
      a:'#ff4466',b:'#ff7700',c:'#ffcc00',d:'#aaff00',e:'#00ffaa',
      f:'#00d4ff',g:'#5544ff',h:'#aa00ff',i:'#ff44cc',j:'#ff2255',
      k:'#ff8800',l:'#eeff00',m:'#88ff22',n:'#00ffcc',o:'#00aaff',
      p:'#3355ff',q:'#8844ff',r:'#ff66bb',s:'#ff2233',t:'#ff8833',
      u:'#ccff00',v:'#00ffd4',w:'#00ccff',x:'#ff6600',y:'#ffee00',
      z:'#dd00ff'
    };
    return map[ch.toLowerCase()] || '#00d4ff';
  }

  _startSpeedTimer() {
    this._stopSpeedTimer();
    this.session.synthWordStartTime = Date.now();
    const svg = document.getElementById('synth-speed-timer');
    const arc = document.getElementById('synth-speed-arc');
    if (!svg || !arc) return;
    svg.style.display = 'block';
    arc.style.animation = 'none';
    void arc.offsetWidth;
    
    const duration = this._synthModeConfig === 'speed' ? 8 : 20;
    arc.style.animation = `speedDrain ${duration}s linear forwards`;

    // Auto-skip after duration
    this.session.synthAutoSkipTimer = setTimeout(() => {
      if (this.session.synthActive && !this.session.synthPaused) {
        UI.toast(this.session.synthWordMode === 'speed' ? "⚡ Çok yavaş!" : "⏱️ Süre doldu!", 2000);
        this.skipSynthWord();
      }
    }, duration * 1000);
  }

  _stopSpeedTimer() {
    const svg = document.getElementById('synth-speed-timer');
    const arc = document.getElementById('synth-speed-arc');
    if (arc) arc.style.animation = 'none';
    if (svg) svg.style.display  = 'none';

    if (this.session.synthAutoSkipTimer) {
      clearTimeout(this.session.synthAutoSkipTimer);
      this.session.synthAutoSkipTimer = null;
    }
  }

  _getSpeedBonus(elapsed) {
    if (elapsed === undefined) {
      elapsed = (Date.now() - (this.session.synthWordStartTime || Date.now())) / 1000;
    }
    if (elapsed < 3)  return 15;
    if (elapsed < 6)  return 10;
    if (elapsed < 10) return 5;
    if (elapsed < 15) return 2;
    return 0;
  }

  _showSpeedBonus(bonus) {
    const el = document.getElementById('synth-speed-bonus');
    if (!el) return;
    el.textContent = `⚡ +${bonus} Hız`;
    el.style.display = 'block';
    el.classList.remove('sb-pop');
    void el.offsetWidth;
    el.classList.add('sb-pop');
    setTimeout(() => { el.style.display = 'none'; }, 1400);
  }

  _renderChoiceMode(word) {
    const choiceArea = document.getElementById('synth-choice-area');
    if (!choiceArea) return;

    // 3 distractor from same/adjacent CEFR level
    const levels = ['A1','A2','B1','B2','C1','C2'];
    const li = levels.indexOf(word.level || 'A1');
    const pool = WORDS.filter(w => {
      if ((w.id || w.en) === (word.id || word.en)) return false;
      const wi = levels.indexOf(w.level || 'A1');
      return Math.abs(wi - li) <= 1;
    }).sort(() => Math.random() - 0.5);

    let distractors = pool.slice(0, 3);
    if (distractors.length < 3) {
      const fallback = WORDS
        .filter(w => (w.id || w.en) !== (word.id || word.en) && !distractors.includes(w))
        .sort(() => Math.random() - 0.5);
      distractors = [...distractors, ...fallback].slice(0, 3);
    }

    const options = [word, ...distractors].sort(() => Math.random() - 0.5);
    const correctId = word.id || word.en;

    choiceArea.innerHTML = options.map(opt => {
      const oid = (opt.id || opt.en).replace(/'/g,"\\'");
      const cid = correctId.replace(/'/g,"\\'");
      return `<button class="synth-choice-btn" data-oid="${oid}" data-cid="${cid}">
        <span class="sc-emoji">${opt.icon || '📚'}</span>
        <span class="sc-en">${opt.en}</span>
        <span class="sc-ipa">${opt.ipa || ''}</span>
      </button>`;
    }).join('');
  }

  _handleChoiceSelect(selectedId, correctId, btn) {
    if (this.session.synthPaused || !this.session.synthActive) return;
    const word = this.session.synthWord;
    if (!word) return;

    document.querySelectorAll('.synth-choice-btn').forEach(b => { b.disabled = true; });
    this._stopSpeedTimer();

    const isCorrect = selectedId === correctId;
    if (isCorrect) {
      btn.classList.add('sc-correct');
      this.session.synthFails = 0;
      this.session.synthTyped = word.en;
      this._playSynthChime(word.en.length);
      this.audio.play('success');
      this._completeSynthWord();
    } else {
      btn.classList.add('sc-wrong');
      document.querySelectorAll('.synth-choice-btn').forEach(b => {
        if (b.querySelector('.sc-en')?.textContent === word.en) b.classList.add('sc-correct');
      });
      this._playSynthError();
      this._updateMastery(word.id || word.en, false);
      this.session.synthMissed = this.session.synthMissed || [];
      this.session.synthMissed.push(word);
      this.session.synthFails++;
      this.session.synthStreak = 0;
      this.session.synthCombo  = 1;
      this._updateSynthCombo();
      const times = this.session.synthWordTimes = this.session.synthWordTimes || [];
      times.push((Date.now() - (this.session.synthWordStartTime || Date.now())) / 1000);
      setTimeout(() => { this.session.learnIdx++; this._loadSynthWord(); }, 1600);
    }
  }

  _pauseSynesthesia() {
    if (!this.session.synthActive || this.session.synthPaused) return;
    this.session.synthPaused = true;
    // Pause speed timer animation
    const arc = document.getElementById('synth-speed-arc');
    if (arc) arc.style.animationPlayState = 'paused';
    // Suspend audio context to pause drone
    if (this.audio._ctx && this.audio._ctx.state === 'running') {
      this.audio._ctx.suspend().catch(() => {});
    }
    // Pause reveal timer
    if (this.session.synthRevealTimer) {
      clearTimeout(this.session.synthRevealTimer);
      this.session.synthRevealTimer = null;
    }
    // Pause auto-skip timer
    if (this.session.synthAutoSkipTimer) {
      const duration = this._synthModeConfig === 'speed' ? 8000 : 20000;
      const elapsed = Date.now() - (this.session.synthWordStartTime || Date.now());
      this.session.synthTimeRemaining = Math.max(0, duration - elapsed);
      clearTimeout(this.session.synthAutoSkipTimer);
      this.session.synthAutoSkipTimer = null;
    }
    const overlay = document.getElementById('synth-pause-overlay');
    if (overlay) overlay.style.display = 'flex';
  }

  resumeSynesthesia() {
    if (!this.session.synthPaused) return;
    this.session.synthPaused = false;
    // Resume speed timer animation
    const arc = document.getElementById('synth-speed-arc');
    if (arc) arc.style.animationPlayState = 'running';
    // Resume audio context
    if (this.audio._ctx && this.audio._ctx.state === 'suspended') {
      this.audio._ctx.resume().catch(() => {});
    }
    const overlay = document.getElementById('synth-pause-overlay');
    if (overlay) overlay.style.display = 'none';
    // Resume auto-skip timer
    if (this.session.synthTimeRemaining !== undefined) {
      const duration = this._synthModeConfig === 'speed' ? 8000 : 20000;
      this.session.synthWordStartTime = Date.now() - (duration - this.session.synthTimeRemaining);
      this.session.synthAutoSkipTimer = setTimeout(() => {
        if (this.session.synthActive && !this.session.synthPaused) {
          UI.toast(this.session.synthWordMode === 'speed' ? "⚡ Çok yavaş!" : "⏱️ Süre doldu!", 2000);
          this.skipSynthWord();
        }
      }, this.session.synthTimeRemaining);
    }
    // Re-arm auto-reveal timer for current word (shorter since they already waited)
    const word = this.session.synthWord;
    if (word && this.session.synthTyped.length === 0) {
      this.session.synthRevealTimer = setTimeout(() => {
        if (this.session.synthActive && !this.session.synthPaused && this.session.synthTyped.length === 0) {
          this._handleSynthKey(word.en[0]);
          UI.toast(`💡 İpucu: İlk harf "${word.en[0].toUpperCase()}"`, 2000);
        }
      }, 5000);
    }
    this.audio.play('pop');
  }

  // ─────────────────────────────────────────────────────────
  //  READING MODULE
  // ─────────────────────────────────────────────────────────

  _initReading() {
    this._activeBlank = null;
    const currentMode = this.state.get('readingMode') || 'read';
    this.setReadingMode(currentMode);
    // Sync shuffle button visual state
    const shuffleBtn = document.getElementById('btn-shuffle');
    if (shuffleBtn) shuffleBtn.classList.toggle('active', !!this.state.get('readingShuffled'));
  }

  toggleShuffle(btn) {
    const nowShuffled = !this.state.get('readingShuffled');
    this.state.set('readingShuffled', nowShuffled);
    btn.classList.toggle('active', nowShuffled);
    if (nowShuffled) {
      this._buildShuffleOrder();
      this.state.set('readingIdx', 0);
    }
    this._renderStory();
    this.audio.play('click');
  }

  _buildShuffleOrder() {
    const level = this.state.get('readingLevel');
    const n = STORIES.filter(s => s.level === level).length;
    const order = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
    const readingOrder = this.state.get('readingOrder') || {};
    readingOrder[level] = order;
    this.state.set('readingOrder', readingOrder);
  }

  _getStoryIndex() {
    const level = this.state.get('readingLevel');
    const stories = STORIES.filter(s => s.level === level);
    const rawIdx = this.state.get('readingIdx') % stories.length;
    const shuffled = this.state.get('readingShuffled');
    const order = (this.state.get('readingOrder') || {})[level];
    return (shuffled && order && order[rawIdx] !== undefined) ? order[rawIdx] : rawIdx;
  }

  setReadingLevel(level, btn) {
    this.state.update({ readingLevel: level, readingIdx: 0 });
    document.querySelectorAll('.level-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (this.state.get('readingShuffled')) this._buildShuffleOrder();
    this._activeBlank = null;
    this._renderStory();
    this.audio.play('click');
  }

  setReadingMode(mode) {
    this.state.set('readingMode', mode);
    document.querySelectorAll('.rm-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`btn-mode-${mode}`);
    if (btn) btn.classList.add('active');
    this._activeBlank = null;
    this._renderStory();
    this.audio.play('click');
  }

  _renderStory() {
    const container = document.getElementById('story-area');
    if (!container) return;
    const level  = this.state.get('readingLevel');
    const mode = this.state.get('readingMode') || 'read';
    const stories = STORIES.filter(s => s.level === level);
    if (!stories.length) { container.innerHTML = '<p>İçerik bulunamadı.</p>'; return; }

    const rawIdx = this.state.get('readingIdx') % stories.length;
    const idx    = this._getStoryIndex();
    const story  = stories[idx];

    let html = '';
    let optsHtml = '';

    const wordMap = {};
    WORDS.forEach(w => { wordMap[w.en.toLowerCase()] = w; });

    // Multi-word expressions to look for (longest first)
    const knownPhrases = [
      'welcome to', 'a lot of', 'each other', 'next to', 'in front of', 'because of',
      'good morning', 'good evening', 'good night', 'how are you', 'thank you',
      'as soon as', 'by the way', 'for example', 'at the moment', 'of course',
      'could not', 'does not', 'did not', 'was not', 'were not', 'is not', 'am not',
      'cannot', 'do not', 'will not', 'would not', 'should not', 'must not',
      'woke up', 'looked in', 'looked under', 'looked behind', 'looked inside',
      'went to', 'look at', 'tries on', 'waking up', 'paid off', 'led to',
      'refers to', 'clashes with', 'aim to', 'fail to', 'climbed up',
      'walked into', 'lives in', 'goes for', 'arrived at', 'answered with', 'provided with',
      'puts on', 'put on', 'went down', 'listened to', 'prepared for', 'due to',
      'impact on', 'responsible for', 'separating from', 'succeed in', 'grapple with',
      'confined to', 'potential for', 'prioritizes over', 'pressure on', 'results in',
      'worry about', 'moving toward', 'away from', 'believe in', 'foster a'
    ];

    if (mode === 'quiz') {
      html = story.text.replace(/\{([^}]+)\}/g, (_, word) =>
        `<span class="cloze-blank" data-answer="${word}" data-action="select-blank">____</span>`
      );
      
      html = html.replace(/(<[^>]+>)|([A-Za-z']+)/g, (match, tag, word) => {
        if (tag) return tag;
        const key = word.toLowerCase().replace(/'/g, '');
        const found = wordMap[key] || wordMap[word.toLowerCase()];
        if (!found) return word;
        return `<span class="story-vocab" data-en="${found.en.replace(/"/g,'&quot;')}" data-tr="${found.tr}" data-ipa="${found.ipa||''}">${word}</span>`;
      });

      const opts = [...story.options].sort(() => Math.random() - 0.5);
      optsHtml = opts.map(o =>
        `<button class="cloze-opt" data-word="${o.replace(/"/g,'&quot;')}">${o}</button>`
      ).join('');
    } else {
      // READ MODE
      html = this.readingEngine.markupStory(story);
    }

    container.innerHTML = `
      <div class="story-nav">
        <div>
          <div class="story-meta">
            <span class="badge badge-cyan">${level}</span>
            <span class="badge badge-violet">${rawIdx + 1}/${stories.length}${this.state.get('readingShuffled') ? ' 🔀' : ''}</span>
          </div>
          <div class="story-title">${story.title}</div>
        </div>
        <div class="story-nav-btns">
          ${idx > 0 ? `<button class="btn btn-ghost btn-sm" data-action="prev-story">← Önceki</button>` : ''}
          <button class="btn btn-ghost btn-sm" id="btn-next-story" ${mode === 'quiz' ? 'style="display:none"' : ''} data-action="next-story">Sonraki →</button>
        </div>
      </div>
      <div class="story-content-box">
        <div class="story-text ${mode === 'quiz' ? 'quiz-mode' : ''}">${html}</div>
        ${mode === 'quiz' ? `<div class="cloze-opts" id="cloze-opts">${optsHtml}</div>` : ''}
      </div>`;

    this._activeBlank = null;
  }

  _handleWordClick(word, element, event) {
    if (event) event.stopPropagation();

    // Play pronunciation
    this.speakWord(word, 1.0);

    // Highlight the word/phrase
    document.querySelectorAll('.story-word, .sw').forEach(el => el.classList.remove('playing'));
    if (element) element.classList.add('playing');

    // ── Check PHRASE_DICT first (phrasal verbs, idioms, grammar patterns) ──
    // Strip possessive 's before lookup: "Anna's" → "anna", "planet's" → "planet"
    const baseWord = word.toLowerCase().replace(/'s$/, '').replace(/s'$/, 's');
    const phraseEntry = PHRASE_DICT[word.toLowerCase()] || (baseWord !== word.toLowerCase() ? PHRASE_DICT[baseWord] : undefined);
    if (phraseEntry) {
      document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
      const typeColors = {
        'Phrasal Verb':   { bg:'#0891b2', text:'#fff' },
        'Deyim':          { bg:'#7c3aed', text:'#fff' },
        'Gramer Kalıbı':  { bg:'#b45309', text:'#fff' },
        'Eylem Kalıbı':   { bg:'#065f46', text:'#fff' },
        'İsim Tamlaması': { bg:'#be185d', text:'#fff' },
        'Kelime':         { bg:'#1d4ed8', text:'#fff' },
      };
      const tc = typeColors[phraseEntry.type] || { bg:'#374151', text:'#fff' };
      const popup = document.createElement('div');
      popup.className = 'word-def-popup';
      // Build safely with DOM methods to avoid XSS from variable data
      popup.innerHTML = '';
      const _ph = document.createElement('div'); _ph.className = 'wdp-header';
      const _ptw = document.createElement('div'); _ptw.className = 'wdp-title-wrap';
      const _pr = document.createElement('div'); _pr.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap';
      const _pts = document.createElement('span');
      _pts.style.cssText = `background:${tc.bg};color:${tc.text};font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:99px;letter-spacing:.04em`;
      _pts.textContent = phraseEntry.type;
      const _pwe = document.createElement('div'); _pwe.className = 'wdp-en'; _pwe.textContent = word;
      _pr.appendChild(_pts); _pr.appendChild(_pwe); _ptw.appendChild(_pr);
      const _pc = document.createElement('span'); _pc.className = 'wdp-close'; _pc.textContent = '✕';
      _pc.addEventListener('click', () => app._closeWordDef());
      _ph.appendChild(_ptw); _ph.appendChild(_pc);
      const _ptr = document.createElement('div'); _ptr.className = 'wdp-tr'; _ptr.textContent = phraseEntry.tr;
      const _ps = document.createElement('div'); _ps.className = 'wdp-section';
      const _pl = document.createElement('div'); _pl.className = 'wdp-label'; _pl.textContent = 'Örnek Cümle';
      const _pe = document.createElement('div'); _pe.className = 'wdp-ex'; _pe.textContent = '"' + phraseEntry.ex + '"';
      _ps.appendChild(_pl); _ps.appendChild(_pe);
      popup.appendChild(_ph); popup.appendChild(_ptr); popup.appendChild(_ps);
      document.body.appendChild(popup);
      if (event) {
        const x = Math.min(event.clientX, window.innerWidth - popup.offsetWidth - 8);
        const y = Math.min(event.clientY + 16, window.innerHeight - popup.offsetHeight - 8);
        popup.style.left = Math.max(8, x) + 'px';
        popup.style.top  = Math.max(8, y) + 'px';
      }
      this.audio.play('pop');
      setTimeout(() => { if (popup.parentElement) app._closeWordDef(); }, 9000);
      return;
    }

    // ── Context-aware multi-word phrase detection ──
    // When user clicks a word, check surrounding words to find phrasal verbs/idioms in PHRASE_DICT
    if (element) {
      const _ctxCont = element.closest('.story-text, .reading-text, .activity-text, .text-body') || element.parentElement;
      if (_ctxCont) {
        const _ctxW = Array.from(_ctxCont.querySelectorAll('.story-word, .sw'));
        const _ctxI = _ctxW.indexOf(element);
        if (_ctxI >= 0) {
          const _gw = i => _ctxW[i] ? (_ctxW[i].dataset.word || _ctxW[i].textContent.trim().toLowerCase().replace(/[^a-z'-]/g,'')) : null;
          const _c0=_gw(_ctxI), _p1=_gw(_ctxI-1), _p2=_gw(_ctxI-2), _n1=_gw(_ctxI+1), _n2=_gw(_ctxI+2);
          const _ctx=[];
          if(_p1&&_c0) _ctx.push(_p1+' '+_c0);
          if(_c0&&_n1) _ctx.push(_c0+' '+_n1);
          if(_p2&&_p1&&_c0) _ctx.push(_p2+' '+_p1+' '+_c0);
          if(_p1&&_c0&&_n1) _ctx.push(_p1+' '+_c0+' '+_n1);
          if(_c0&&_n1&&_n2) _ctx.push(_c0+' '+_n1+' '+_n2);
          for (const _phrase of _ctx) {
            const _ce = PHRASE_DICT[_phrase];
            if (_ce) {
              document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
              const _tc2 = {'Phrasal Verb':{bg:'#0891b2',text:'#fff'},'Deyim':{bg:'#7c3aed',text:'#fff'},'Gramer Kalıbı':{bg:'#b45309',text:'#fff'},'Eylem Kalıbı':{bg:'#065f46',text:'#fff'},'İsim Tamlaması':{bg:'#be185d',text:'#fff'},'Kelime':{bg:'#1d4ed8',text:'#fff'}}[_ce.type]||{bg:'#374151',text:'#fff'};
              const _cp = document.createElement('div'); _cp.className = 'word-def-popup';
              const _ch = document.createElement('div'); _ch.className = 'wdp-header';
              const _ctw = document.createElement('div'); _ctw.className = 'wdp-title-wrap';
              const _cr = document.createElement('div'); _cr.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap';
              const _cbg = document.createElement('span'); _cbg.style.cssText = `background:${_tc2.bg};color:${_tc2.text};font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:99px;letter-spacing:.04em`; _cbg.textContent = _ce.type;
              const _cen = document.createElement('div'); _cen.className = 'wdp-en'; _cen.textContent = _phrase;
              _cr.appendChild(_cbg); _cr.appendChild(_cen); _ctw.appendChild(_cr);
              const _cclose = document.createElement('span'); _cclose.className = 'wdp-close'; _cclose.textContent = '✕'; _cclose.addEventListener('click', () => app._closeWordDef());
              _ch.appendChild(_ctw); _ch.appendChild(_cclose);
              const _ctr = document.createElement('div'); _ctr.className = 'wdp-tr'; _ctr.textContent = _ce.tr;
              const _cs = document.createElement('div'); _cs.className = 'wdp-section';
              const _cl = document.createElement('div'); _cl.className = 'wdp-label'; _cl.textContent = 'Örnek Cümle';
              const _cex = document.createElement('div'); _cex.className = 'wdp-ex'; _cex.textContent = '"' + _ce.ex + '"';
              _cs.appendChild(_cl); _cs.appendChild(_cex);
              _cp.appendChild(_ch); _cp.appendChild(_ctr); _cp.appendChild(_cs);
              document.body.appendChild(_cp);
              if (event) { _cp.style.left = Math.max(8,Math.min(event.clientX,window.innerWidth-_cp.offsetWidth-8))+'px'; _cp.style.top = Math.max(8,Math.min(event.clientY+16,window.innerHeight-_cp.offsetHeight-8))+'px'; }
              this.audio.play('pop');
              setTimeout(() => { if (_cp.parentElement) app._closeWordDef(); }, 9000);
              return;
            }
          }
        }
      }
    }

    // Check if in dictionary
    const wordMap = {};
    WORDS.forEach(w => { wordMap[w.en.toLowerCase()] = w; });
    
    // Common functional words fallback
    const basicDict = {
      'the': 'belirli nesne (açıklayıcı)', 'a': 'bir', 'an': 'bir', 'and': 've', 'or': 'veya', 'but': 'fakat, ama', 
      'is': 'dır/dir (olmak)', 'am': 'ım/im (olmak)', 'are': 'lar/ler (olmak)', 'was': 'idi (geçmiş zaman)', 'were': 'idiler',
      'in': 'içinde', 'on': 'üzerinde', 'at': 'de/da', 'to': 'e/a (yönelme)', 'with': 'ile', 'from': 'den/dan',
      'i': 'ben', 'you': 'sen/siz', 'he': 'o (erkek)', 'she': 'o (kadın)', 'it': 'o (cansız/hayvan)', 'we': 'biz', 'they': 'onlar',
      'my': 'benim', 'your': 'senin', 'his': 'onun (erkek)', 'her': 'onun (kadın)', 'its': 'onun (cansız)', 'our': 'bizim', 'their': 'onların',
      'me': 'beni/bana', 'him': 'onu/ona', 'us': 'bizi/bize', 'them': 'onları/onlara',
      'this': 'bu', 'that': 'şu/o', 'these': 'bunlar', 'those': 'şunlar/onlar',
      'for': 'için', 'of': 'ın/in (aitlik)', 'as': 'olarak', 'at': 'de/da', 'by': 'tarafından/yanında',
      'can': 'ebilmek', 'will': 'ecek/acak', 'would': 'erdi/ardı', 'should': 'meli/malı', 'must': 'malı/meli (zorunluluk)',
      'not': 'değil/olumsuzluk', 'no': 'hayır', 'yes': 'evet', 'very': 'çok', 'so': 'öylece/çok',
      'have': 'sahip olmak', 'has': 'sahip olmak', 'had': 'sahip oldu', 'do': 'yapmak', 'does': 'yapmak', 'did': 'yaptı',
      'said': 'dedi/söyledi', 'says': 'der/söyler', 'say': 'demek/söylemek',
      'back': 'geri/arkaya', 'out': 'dışarı/dışarıda', 'up': 'yukarı/yukarıda', 'down': 'aşağı', 'off': 'uzakta/kapalı', 'over': 'üzerinde/bitti', 'around': 'etrafında', 'through': 'içinden/boyunca',
      'before': 'önce/daha önce', 'after': 'sonra/sonrasında', 'during': 'süresince/esnasında', 'until': 'kadar (-e kadar)', 'since': 'beri/o zamandan beri', 'while': 'iken/sırasında', 'when': 'ne zaman/iken', 'where': 'nerede', 'who': 'kim', 'what': 'ne', 'why': 'neden', 'how': 'nasıl',
      'each': 'her biri (ayrı ayrı)', 'other': 'diğer/başka', 'both': 'her ikisi de', 'all': 'hepsi/bütün', 'some': 'bazı', 'any': 'herhangi bir', 'many': 'birçok/çok sayıda', 'much': 'çok (sayılamayan)', 'few': 'az/birkaç', 'little': 'az/küçük', 'more': 'daha fazla', 'most': 'en fazla/çoğu',
      'also': 'ayrıca/da', 'too': 'de/da (ayrıca)', 'just': 'sadece/az önce', 'still': 'hâlâ/yine de', 'even': 'bile/hatta', 'only': 'sadece/yalnızca', 'already': 'zaten/çoktan', 'again': 'tekrar/yeniden', 'always': 'her zaman', 'never': 'asla/hiçbir zaman', 'often': 'sık sık', 'sometimes': 'bazen', 'usually': 'genellikle',
      'really': 'gerçekten/çok', 'quite': 'oldukça', 'almost': 'neredeyse/hemen hemen', 'rather': 'oldukça/yerine', 'enough': 'yeterince', 'together': 'birlikte', 'alone': 'yalnız (burası WORDS\'te de var)', 'there': 'orada/işte', 'here': 'burada', 'now': 'şimdi', 'then': 'o zaman/sonra', 'soon': 'yakında',
      'along': 'boyunca/birlikte', 'across': 'karşısında/boyunca', 'within': 'içinde/zarfında', 'beyond': 'ötesinde', 'between': 'arasında', 'among': 'arasında (çoğul)', 'without': 'olmadan', 'despite': 'rağmen', 'against': 'karşı', 'through': 'içinden', 'toward': 'doğru',
      'yet': 'henüz/ama', 'nor': 'ne de', 'whether': 'olup olmadığı', 'thus': 'böylece/bu nedenle', 'therefore': 'bu nedenle/dolayısıyla', 'however': 'ancak/bununla birlikte', 'although': 'her ne kadar/rağmen', 'though': 'rağmen/ise de', 'because': 'çünkü', 'if': 'eğer', 'unless': 'olmadıkça',
      'into': 'içine', 'onto': 'üstüne', 'upon': 'üzerine', 'about': 'hakkında/yaklaşık', 'above': 'üzerinde/yukarısında', 'below': 'altında', 'near': 'yakın', 'next': 'sonraki/yanındaki', 'last': 'son/geçen', 'own': 'kendi', 'right': 'doğru/hak/sağ', 'left': 'sol/geride kalan',
      'certain': 'belirli/emin', 'whole': 'bütün/tüm', 'such': 'böyle/bu tür', 'every': 'her', 'another': 'bir başka/bir tane daha', 'same': 'aynı', 'different': 'farklı', 'first': 'ilk/birinci', 'second': 'ikinci', 'third': 'üçüncü', 'fourth': 'dördüncü',
      'could': 'ebildi/ebilebilirdi', 'might': 'olabilir/ebilir', 'shall': 'ecektir (resmi)', 'been': 'olmuş (olmanın geçmişi)', 'being': 'olmak/olma', 'going': 'gitmek/gidiyor', 'getting': 'almak/oluyorum', 'coming': 'gelmek/geliyor', 'looking': 'bakmak/bakıyor', 'making': 'yapmak/yapıyor', 'putting': 'koymak/koyuyor', 'seeing': 'görmek/görüyor', 'trying': 'denemek/deniyor', 'thinking': 'düşünmek/düşünüyor',
      'its': 'onun (cansız)', 'whose': 'kimin', 'which': 'hangi/hangisi', 'whatever': 'her ne olursa', 'whoever': 'kim olursa', 'himself': 'kendisi (erkek)', 'herself': 'kendisi (kadın)', 'itself': 'kendisi (cansız)', 'themselves': 'kendileri', 'yourself': 'kendiniz', 'myself': 'ben kendim', 'ourselves': 'biz kendimiz'
    };

    const cleanWord = word.toLowerCase().replace(/[^a-z'-]/g, '');
    // Also try without possessive 's  ("Anna's" → "anna")
    const cleanBase = cleanWord.replace(/'s$/, '');
    const found = wordMap[cleanWord] || wordMap[word.toLowerCase()] || (cleanBase !== cleanWord ? wordMap[cleanBase] : null);

    // For hyphenated compounds (e.g. "non-human", "well-being"), try to derive a translation
    // by looking up each part and combining.
    const _hyphenPrefixes = {
      'non':'değil/olmayan','un':'değil/ters','in':'değil/içe','im':'değil',
      'dis':'değil/ters','anti':'karşı','pre':'ön/önceden','post':'sonra/sonrası',
      'self':'öz/kendi kendine','well':'iyi/sağlıklı','ill':'kötü/hasta',
      'multi':'çok/çoklu','over':'aşırı/üstünde','under':'yetersiz/altında',
      'out':'dışarı/fazla','up':'yukarı/artış','down':'aşağı/azalış',
      'long':'uzun','short':'kısa','high':'yüksek','low':'düşük',
      'eco':'eko/çevre','bio':'bio/biyolojik','micro':'mikro','macro':'makro',
      'cross':'çapraz/arası','co':'ortak/birlikte'
    };
    const _deriveHyphen = (w) => {
      if (w.indexOf('-') === -1) return null;
      const parts = w.split('-');
      const trs = parts.map(p => {
        const wEntry = wordMap[p];
        if (wEntry) return wEntry.tr || wEntry.en;
        if (_hyphenPrefixes[p]) return _hyphenPrefixes[p];
        return p;
      });
      return { en: w, tr: trs.join(' '), derived: true };
    };

    // For hyphenated compounds not in WORDS, derive translation from parts
    const derived = (!found && cleanWord.indexOf('-') > -1) ? _deriveHyphen(cleanWord) : null;

    if (found) {
       this._showWordDef(found.en, event);
       return;
    }

    if (derived) {
       if (event) event.stopPropagation();
       document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
       const popup = document.createElement('div');
       popup.className = 'word-def-popup';
       const _dh = document.createElement('div'); _dh.className = 'wdp-header';
       const _dtw = document.createElement('div'); _dtw.className = 'wdp-title-wrap';
       const _dwe = document.createElement('div'); _dwe.className = 'wdp-en'; _dwe.textContent = '🔗 ' + word;
       const _dipa = document.createElement('div'); _dipa.className = 'wdp-ipa'; _dipa.textContent = '/bileşik yapı/';
       _dtw.appendChild(_dwe); _dtw.appendChild(_dipa);
       const _dc = document.createElement('span'); _dc.className = 'wdp-close'; _dc.textContent = '✕';
       _dc.addEventListener('click', () => app._closeWordDef());
       _dh.appendChild(_dtw); _dh.appendChild(_dc);
       const _dtr = document.createElement('div'); _dtr.className = 'wdp-tr'; _dtr.textContent = derived.tr;
       const _ds = document.createElement('div'); _ds.className = 'wdp-section';
       const _dp = document.createElement('p'); _dp.style.cssText = 'font-size:0.75rem; color:var(--text-3); font-style:italic';
       _dp.textContent = 'Bileşik yapı — parçaların anlamından türetilmiştir.';
       _ds.appendChild(_dp);
       popup.appendChild(_dh); popup.appendChild(_dtr); popup.appendChild(_ds);
       document.body.appendChild(popup);
       return;
    }

    {
       // Check basic dictionary
       // ── Irregular verb / çekimli fiil tablosu ──
       const _IRREG = {
         'went':'go','gone':'go','was':'be','were':'be','been':'be',
         'had':'have','did':'do','done':'do',
         'took':'take','taken':'take','ran':'run','came':'come',
         'gave':'give','given':'give','saw':'see','seen':'see',
         'knew':'know','known':'know','grew':'grow','grown':'grow',
         'threw':'throw','thrown':'throw','flew':'fly','flown':'fly',
         'bought':'buy','brought':'bring','thought':'think',
         'caught':'catch','taught':'teach','made':'make',
         'found':'find','kept':'keep','left':'leave','felt':'feel',
         'met':'meet','sat':'sit','stood':'stand','got':'get',
         'told':'tell','sent':'send','spent':'spend','built':'build',
         'held':'hold','lost':'lose','led':'lead','meant':'mean',
         'paid':'pay','heard':'hear','wrote':'write','written':'write',
         'drew':'draw','drawn':'draw','broke':'break','broken':'break',
         'chose':'choose','chosen':'choose','drove':'drive','driven':'drive',
         'ate':'eat','eaten':'eat','fell':'fall','fallen':'fall',
         'forgot':'forget','forgotten':'forget','froze':'freeze','frozen':'freeze',
         'hid':'hide','hidden':'hide','rode':'ride','ridden':'ride',
         'rose':'rise','risen':'rise','shook':'shake','shaken':'shake',
         'shown':'show','spoke':'speak','spoken':'speak',
         'stole':'steal','stolen':'steal','wore':'wear','worn':'wear',
         'won':'win','woke':'wake','woken':'wake',
         'began':'begin','begun':'begin','bit':'bite','bitten':'bite',
         'blew':'blow','blown':'blow','drank':'drink','drunk':'drink',
         'lay':'lie','lain':'lie','lit':'light','shot':'shoot',
         'shrank':'shrink','shrunk':'shrink','sank':'sink','sunk':'sink',
         'slept':'sleep','swept':'sweep','swam':'swim','swum':'swim',
         'tore':'tear','torn':'tear','understood':'understand',
         'withdrew':'withdraw','withdrawn':'withdraw',
         'wove':'weave','woven':'weave','wept':'weep',
         'struck':'strike','stricken':'strike','swung':'swing',
         'dug':'dig','knelt':'kneel','slid':'slide','spread':'spread',
         'swore':'swear','sworn':'swear','strode':'stride',
         'spun':'spin','spat':'spit','sped':'speed',
         'stung':'sting','stuck':'stick','bled':'bleed',
         'crept':'creep','dealt':'deal','dreamt':'dream',
         'fled':'flee','flung':'fling','hung':'hang',
         'leapt':'leap','lent':'lend','sought':'seek',
         'shed':'shed','shone':'shine','smelt':'smell',
         'trod':'tread','trodden':'tread','withstood':'withstand',
         'wrung':'wring','forbade':'forbid','forgave':'forgive',
         'forgiven':'forgive','forbid':'forbid'
       };
       const _irregBase = _IRREG[cleanWord];
       if (_irregBase && wordMap[_irregBase]) {
         this._showWordDef(_irregBase, event);
         return;
       }

       const basicTr = basicDict[cleanWord] || (_irregBase ? `"${_irregBase}" fiilinin çekimli formu` : null);

       document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
       const popup = document.createElement('div');
       popup.className = 'word-def-popup';
       
       if (basicTr) {
         // Build safely with DOM methods to avoid XSS from variable data
         popup.innerHTML = '';
         const _bh = document.createElement('div'); _bh.className = 'wdp-header';
         const _btw = document.createElement('div'); _btw.className = 'wdp-title-wrap';
         const _bwe = document.createElement('div'); _bwe.className = 'wdp-en'; _bwe.textContent = '💡 ' + word;
         const _bipa = document.createElement('div'); _bipa.className = 'wdp-ipa'; _bipa.textContent = '/bağlam kelimesi/';
         _btw.appendChild(_bwe); _btw.appendChild(_bipa);
         const _bc = document.createElement('span'); _bc.className = 'wdp-close'; _bc.textContent = '✕';
         _bc.addEventListener('click', () => app._closeWordDef());
         _bh.appendChild(_btw); _bh.appendChild(_bc);
         const _btr = document.createElement('div'); _btr.className = 'wdp-tr'; _btr.textContent = basicTr;
         const _bs = document.createElement('div'); _bs.className = 'wdp-section';
         const _bp = document.createElement('p'); _bp.style.cssText = 'font-size:0.75rem; color:var(--text-3); font-style:italic';
         _bp.textContent = 'Bu temel bir dil bilgisi kelimesidir ve listeye eklenemez.';
         _bs.appendChild(_bp);
         popup.appendChild(_bh); popup.appendChild(_btr); popup.appendChild(_bs);
       } else {
         // Try to strip common suffixes (Lemmatization — multi-form)
         let lemma = cleanWord;
         const _alts = [];
         const _cw = cleanWord;
         if (_cw.endsWith('ing') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // running→run, taking→tak
           _alts.push(lemma+'e');                                          // taking→take, having→have
           if (lemma.length>2 && lemma[lemma.length-1]===lemma[lemma.length-2]) _alts.push(lemma.slice(0,-1)); // running→run
         } else if (_cw.endsWith('ed') && _cw.length > 4) {
           lemma = _cw.slice(0,-2);                                       // walked→walk
           _alts.push(_cw.slice(0,-1));                                   // noticed→notice, arrived→arrive
           if (lemma.length>2 && lemma[lemma.length-1]===lemma[lemma.length-2]) _alts.push(lemma.slice(0,-1)); // stopped→stop
         } else if (_cw.endsWith('ously') && _cw.length > 7) {
           lemma = _cw.slice(0,-5);                                       // obviously→obvio
           _alts.push(_cw.slice(0,-2));                                   // obviously→obvious
           _alts.push(_cw.slice(0,-5)+'e');                               // nervously→nerve
         } else if (_cw.endsWith('ation') && _cw.length > 7) {
           lemma = _cw.slice(0,-5);                                       // education→educat
           _alts.push(_cw.slice(0,-5)+'e');                               // decoration→decorate
           _alts.push(_cw.slice(0,-4));                                   // exploration→explor
         } else if (_cw.endsWith('ition') && _cw.length > 7) {
           lemma = _cw.slice(0,-5);                                       // repetition→repet
           _alts.push(_cw.slice(0,-5)+'e');                               // competition→compete
         } else if (_cw.endsWith('ness') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // happiness→happi
           _alts.push(_cw.slice(0,-4)+'y');                               // happiness→happy
           _alts.push(_cw.slice(0,-4)+'e');                               // darkness→dark
         } else if (_cw.endsWith('ment') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // employment→employ
           _alts.push(_cw.slice(0,-4)+'e');                               // engagement→engage
         } else if (_cw.endsWith('ance') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // importance→import
           _alts.push(_cw.slice(0,-4)+'ant');                             // importance→important
           _alts.push(_cw.slice(0,-4)+'e');                               // compliance→compl
         } else if (_cw.endsWith('ence') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // presence→pres
           _alts.push(_cw.slice(0,-4)+'ent');                             // presence→present
           _alts.push(_cw.slice(0,-4)+'e');                               // violence→viole
         } else if (_cw.endsWith('tion') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // pollution→pollut
           _alts.push(_cw.slice(0,-4)+'e');                               // production→produce
           _alts.push(_cw.slice(0,-3));                                   // action→act+ion
         } else if (_cw.endsWith('ism') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // nationalism→nation
           _alts.push(_cw.slice(0,-3)+'e');                               // modernism→modern
         } else if (_cw.endsWith('ist') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // nationalist→nation
           _alts.push(_cw.slice(0,-2));                                   // nationalist→national
         } else if (_cw.endsWith('ity') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // ability→abil
           _alts.push(_cw.slice(0,-2));                                   // similarity→similar
           _alts.push(_cw.slice(0,-3)+'e');                               // ability→able
         } else if (_cw.endsWith('ous') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // dangerous→danger
           _alts.push(_cw.slice(0,-3)+'e');                               // gorgeous→gorge
         } else if (_cw.endsWith('ful') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // careful→care
           _alts.push(_cw.slice(0,-3)+'y');                               // beautiful→beauty
         } else if (_cw.endsWith('less') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // careless→care, homeless→home
         } else if (_cw.endsWith('able') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // comfortable→comfort
           _alts.push(_cw.slice(0,-4)+'e');                               // valuable→value
         } else if (_cw.endsWith('ible') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // reversible→revers
           _alts.push(_cw.slice(0,-4)+'e');                               // reversible→reverse
         } else if (_cw.endsWith('ive') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // active→act
           _alts.push(_cw.slice(0,-3)+'e');                               // creative→create
         } else if (_cw.endsWith('ical') && _cw.length > 6) {
           lemma = _cw.slice(0,-4);                                       // musical→music
           _alts.push(_cw.slice(0,-2));                                   // musical→musica
         } else if (_cw.endsWith('ional') && _cw.length > 7) {
           lemma = _cw.slice(0,-5);                                       // national→nat+ion
           _alts.push(_cw.slice(0,-3));                                   // national→nation
         } else if (_cw.endsWith('al') && _cw.length > 4) {
           lemma = _cw.slice(0,-2);                                       // national→nation
           _alts.push(_cw.slice(0,-2)+'e');                               // arrival→arrive
         } else if (_cw.endsWith('ic') && _cw.length > 4) {
           lemma = _cw.slice(0,-2);                                       // periodic→period
           _alts.push(_cw.slice(0,-2)+'e');                               // acidic→acide
         } else if (_cw.endsWith('ies') && _cw.length > 5) {
           lemma = _cw.slice(0,-3)+'y';                                   // communities→community
         } else if (_cw.endsWith('es') && _cw.length > 4) {
           lemma = _cw.slice(0,-2);                                       // fixes→fix
           _alts.push(_cw.slice(0,-1));                                   // makes→make
         } else if (_cw.length > 3 && _cw.endsWith('s')) {
           lemma = _cw.slice(0,-1);                                       // cats→cat
         } else if (_cw.endsWith('ly') && _cw.length > 5) {
           lemma = _cw.slice(0,-2);                                       // slowly→slow
           _alts.push(_cw.slice(0,-4)+'le');                              // possibly→possible
         } else if (_cw.endsWith('er') && _cw.length > 4) {
           lemma = _cw.slice(0,-2);                                       // stronger→strong
           _alts.push(_cw.slice(0,-1));                                   // nicer→nice
         } else if (_cw.endsWith('est') && _cw.length > 5) {
           lemma = _cw.slice(0,-3);                                       // strongest→strong
           _alts.push(_cw.slice(0,-2));                                   // nicest→nice
         }
         const _lemmas = [lemma, ..._alts];

         const foundLemma = _lemmas.map(l => wordMap[l]).find(Boolean);
         if (foundLemma) { this._showWordDef(foundLemma.en, event); return; }

         // Check PHRASE_DICT with all lemma forms
         const lemmaPhrase = _lemmas.map(l => PHRASE_DICT[l]).find(Boolean) || PHRASE_DICT[cleanWord];
         if (lemmaPhrase) {
           const _tc = { 'Phrasal Verb':{bg:'#0891b2',text:'#fff'}, 'Deyim':{bg:'#7c3aed',text:'#fff'}, 'Gramer Kalıbı':{bg:'#b45309',text:'#fff'}, 'Eylem Kalıbı':{bg:'#065f46',text:'#fff'}, 'İsim Tamlaması':{bg:'#be185d',text:'#fff'}, 'Kelime':{bg:'#1d4ed8',text:'#fff'} }[lemmaPhrase.type] || {bg:'#374151',text:'#fff'};
           // Build popup safely using DOM construction to avoid XSS from variable data
           popup.innerHTML = '';
           const _header = document.createElement('div'); _header.className = 'wdp-header';
           const _titleWrap = document.createElement('div'); _titleWrap.className = 'wdp-title-wrap';
           const _titleRow = document.createElement('div'); _titleRow.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap';
           const _typeBadge = document.createElement('span');
           _typeBadge.style.cssText = `background:${_tc.bg};color:${_tc.text};font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:99px`;
           _typeBadge.textContent = lemmaPhrase.type;
           const _wordEl = document.createElement('div'); _wordEl.className = 'wdp-en'; _wordEl.textContent = word;
           _titleRow.appendChild(_typeBadge); _titleRow.appendChild(_wordEl);
           _titleWrap.appendChild(_titleRow);
           const _closeBtn = document.createElement('span'); _closeBtn.className = 'wdp-close'; _closeBtn.textContent = '✕';
           _closeBtn.addEventListener('click', () => app._closeWordDef());
           _header.appendChild(_titleWrap); _header.appendChild(_closeBtn);
           const _trEl = document.createElement('div'); _trEl.className = 'wdp-tr'; _trEl.textContent = lemmaPhrase.tr;
           const _section = document.createElement('div'); _section.className = 'wdp-section';
           const _label = document.createElement('div'); _label.className = 'wdp-label'; _label.textContent = 'Örnek Cümle';
           const _exEl = document.createElement('div'); _exEl.className = 'wdp-ex'; _exEl.textContent = '"' + lemmaPhrase.ex + '"';
           _section.appendChild(_label); _section.appendChild(_exEl);
           popup.appendChild(_header); popup.appendChild(_trEl); popup.appendChild(_section);
           document.body.appendChild(popup);
           if (event) { popup.style.left = Math.max(8, Math.min(event.clientX, window.innerWidth - popup.offsetWidth - 8))+'px'; popup.style.top = Math.max(8, Math.min(event.clientY+16, window.innerHeight - popup.offsetHeight - 8))+'px'; }
           this.audio.play('pop');
           setTimeout(() => { if (popup.parentElement) app._closeWordDef(); }, 9000);
           return;
         }

         // Build safely with DOM methods to avoid XSS from variable data
        popup.innerHTML = '';
        const _uh = document.createElement('div'); _uh.className = 'wdp-header';
        const _utw = document.createElement('div'); _utw.className = 'wdp-title-wrap';
        const _uwe = document.createElement('div'); _uwe.className = 'wdp-en'; _uwe.textContent = '🔊 ' + word;
        _utw.appendChild(_uwe);
        const _uc = document.createElement('span'); _uc.className = 'wdp-close'; _uc.textContent = '✕';
        _uc.addEventListener('click', () => app._closeWordDef());
        _uh.appendChild(_utw); _uh.appendChild(_uc);
        const _us = document.createElement('div'); _us.className = 'wdp-section';
        const _usb = document.createElement('button');
        _usb.className = 'btn btn-ghost btn-sm speak-word-btn'; _usb.style.width = '100%';
        _usb.dataset.word = word; _usb.textContent = '🔊 Sesi Dinle';
        _us.appendChild(_usb);
        popup.appendChild(_uh); popup.appendChild(_us);
       }
       
       document.body.appendChild(popup);
       if (event) {
         const x = Math.min(event.clientX, window.innerWidth - popup.offsetWidth - 8);
         const y = Math.min(event.clientY + 16, window.innerHeight - popup.offsetHeight - 8);
         popup.style.left = Math.max(8, x) + 'px';
         popup.style.top  = Math.max(8, y) + 'px';
       }
       setTimeout(() => { if (popup.parentElement) app._closeWordDef(); }, 8000);
    }
  }

  _showWordDef(en, event) {
    if (event) event.stopPropagation();
    const w = WORDS.find(x => x.en.toLowerCase() === en.toLowerCase());
    if (!w) return;

    // Highlight logic moved to _handleWordClick
    
    document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
    const popup = document.createElement('div');
    popup.className = 'word-def-popup';
    
    // Add Synonyms and Collocations if they exist in the data
    let synsHtml = '';
    if (w.syns && w.syns.length) {
      synsHtml = `
        <div class="wdp-section">
          <div class="wdp-label">Eş Anlamlılar</div>
          <div class="wdp-syns">${w.syns.map(s => `<span class="wdp-syn">${s}</span>`).join('')}</div>
        </div>`;
    }

    let collocsHtml = '';
    if (w.colloc && w.colloc.length) {
      collocsHtml = `
        <div class="wdp-section">
          <div class="wdp-label">Sık Kullanılan Kalıplar</div>
          <div class="wdp-collocs">${w.colloc.map(c => `<div class="wdp-colloc">${c}</div>`).join('')}</div>
        </div>`;
    }

    // Build popup safely using DOM construction to avoid XSS from variable data
    popup.innerHTML = '';
    const _wdpHeader = document.createElement('div'); _wdpHeader.className = 'wdp-header';
    const _wdpTitleWrap = document.createElement('div'); _wdpTitleWrap.className = 'wdp-title-wrap';
    const _wdpEn = document.createElement('div'); _wdpEn.className = 'wdp-en';
    if (w.icon) { const _ic = document.createElement('span'); _ic.textContent = w.icon + ' '; _wdpEn.appendChild(_ic); }
    _wdpEn.appendChild(document.createTextNode(w.en));
    _wdpTitleWrap.appendChild(_wdpEn);
    if (w.ipa) { const _ipa = document.createElement('div'); _ipa.className = 'wdp-ipa'; _ipa.textContent = w.ipa; _wdpTitleWrap.appendChild(_ipa); }
    const _wdpClose = document.createElement('span'); _wdpClose.className = 'wdp-close'; _wdpClose.textContent = '✕';
    _wdpClose.addEventListener('click', () => app._closeWordDef());
    _wdpHeader.appendChild(_wdpTitleWrap); _wdpHeader.appendChild(_wdpClose);
    popup.appendChild(_wdpHeader);
    const _wdpTr = document.createElement('div'); _wdpTr.className = 'wdp-tr'; _wdpTr.textContent = w.tr;
    popup.appendChild(_wdpTr);
    const _wdpExSec = document.createElement('div'); _wdpExSec.className = 'wdp-section';
    const _wdpExLbl = document.createElement('div'); _wdpExLbl.className = 'wdp-label'; _wdpExLbl.textContent = 'Örnek Cümle';
    const _wdpEx = document.createElement('div'); _wdpEx.className = 'wdp-ex'; _wdpEx.textContent = '"' + w.ex + '"';
    _wdpExSec.appendChild(_wdpExLbl); _wdpExSec.appendChild(_wdpEx);
    popup.appendChild(_wdpExSec);
    if (synsHtml) { const _synsDiv = document.createElement('div'); _synsDiv.innerHTML = synsHtml; popup.appendChild(_synsDiv); }
    if (collocsHtml) { const _colDiv = document.createElement('div'); _colDiv.innerHTML = collocsHtml; popup.appendChild(_colDiv); }
    const _wdpActions = document.createElement('div'); _wdpActions.className = 'wdp-actions';
    const _addBtn = document.createElement('button');
    _addBtn.className = 'btn btn-primary btn-sm mastery-add-btn';
    _addBtn.style.cssText = 'flex:1; font-size: 0.75rem;';
    _addBtn.dataset.wordId = w.id || w.en;
    _addBtn.textContent = '➕ Listeye Ekle';
    _wdpActions.appendChild(_addBtn);
    popup.appendChild(_wdpActions);
    document.body.appendChild(popup);
    if (event) {
      const x = Math.min(event.clientX, window.innerWidth - popup.offsetWidth - 8);
      const y = Math.min(event.clientY + 16, window.innerHeight - popup.offsetHeight - 8);
      popup.style.left = Math.max(8, x) + 'px';
      popup.style.top  = Math.max(8, y) + 'px';
    }
    this.audio.play('pop');
  }

  _closeWordDef() {
    document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
    document.querySelectorAll('.story-word, .story-vocab, .sw').forEach(el => el.classList.remove('playing'));
  }

  _addToMasteryFromDict(id, btn) {
    const mastery = this.state.get('mastery') || {};
    if (!mastery[id]) {
      mastery[id] = { score: 0, interval: 1, ease: 2.5, nextReview: Date.now() };
      this.state.set('mastery', mastery);
      UI.toast("Kelime öğrenilecekler listesine eklendi! 📚", 3000);
    } else {
      UI.toast("Bu kelime zaten listende.", 2000);
    }
    if (btn) {
      btn.textContent = '✅ Eklendi';
      btn.style.background = 'var(--green)';
      btn.style.color = '#fff';
      btn.disabled = true;
    }
  }

  _selectBlank(el) {
    if (el.classList.contains('filled')) return;
    document.querySelectorAll('.cloze-blank').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    this._activeBlank = el;
    this.audio.play('click');
  }

  _fillBlank(word, btn) {
    if (!this._activeBlank) { UI.toast('Önce bir boşluk seçin (___).'); return; }
    const ans = this._activeBlank.dataset.answer;
    if (word === ans) {
      this._activeBlank.textContent = word;
      this._activeBlank.classList.add('filled');
      this._activeBlank.classList.remove('active');
      btn.classList.add('used');
      this._activeBlank = null;
      this.audio.play('success');
      this.addXP(window.remoteFlags?.xp_reading_correct ?? 10, 'easy');
      this._checkStoryDone();
    } else {
      this._activeBlank.classList.add('error');
      this.audio.play('click');
      setTimeout(() => this._activeBlank?.classList.remove('error'), 380);
    }
  }

  _checkStoryDone() {
    const blanks = document.querySelectorAll('.cloze-blank');
    if ([...blanks].every(b => b.classList.contains('filled'))) {
      const opts = document.getElementById('cloze-opts');
      if (opts) opts.style.display = 'none';
      const btn = document.getElementById('btn-next-story');
      if (btn) btn.style.display = '';
      this.addXP(window.remoteFlags?.xp_reading_complete ?? 50, 'easy');
      if (typeof confetti === 'function') confetti({ particleCount:80, spread:60, origin:{y:0.6} });
    }
  }

  _nextStory() {
    const level = this.state.get('readingLevel');
    const max   = STORIES.filter(s => s.level === level).length;
    this.state.set('readingIdx', (this.state.get('readingIdx') + 1) % max);
    this._activeBlank = null;
    this._renderStory();
    this.audio.play('pop');
  }

  _prevStory() {
    const level = this.state.get('readingLevel');
    const max   = STORIES.filter(s => s.level === level).length;
    let idx = this.state.get('readingIdx') - 1;
    if (idx < 0) idx = max - 1;
    this.state.set('readingIdx', idx);
    this._activeBlank = null;
    this._renderStory();
    this.audio.play('pop');
  }

  playStory() {
    const btn = document.getElementById('btn-play-story');
    if (this.session.isSpeakingStory) {
      this.speech.stop();
      this.session.isSpeakingStory = false;
      if (btn) btn.innerHTML = '<span class="audio-icon">🎧</span> Sesli Dinle';
      document.querySelectorAll('.story-word, .sw').forEach(el => el.classList.remove('playing'));
      return;
    }

    const level = this.state.get('readingLevel');
    const stories = STORIES.filter(s => s.level === level);
    if (!stories.length) return;
    const story = stories[this._getStoryIndex()];
    
    // Process text for speech (keep mapping possible)
    const rawText = story.text.replace(/\[([^\]]+)\]/g, '$1').replace(/\*+/g, '').replace(/#+/g, '').replace(/\{([^}]+)\}/g, '$1');
    
    this.session.isSpeakingStory = true;
    if (btn) btn.innerHTML = '<span class="audio-icon">🛑</span> Durdur';

    const words = document.querySelectorAll('.story-word, .sw');
    
    this.speech.speak(rawText, 0.85, 
      (event) => {
        // Find current word by charIndex
        let charAcc = 0;
        let activeIdx = -1;
        const textParts = rawText.split(/\s+/);
        for(let i=0; i<textParts.length; i++) {
          if (event.charIndex >= charAcc && event.charIndex < charAcc + textParts[i].length + 1) {
            activeIdx = i;
            break;
          }
          charAcc += textParts[i].length + 1;
        }
        if (activeIdx !== -1 && words[activeIdx]) {
          words.forEach(el => el.classList.remove('playing'));
          words[activeIdx].classList.add('playing');
          words[activeIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      },
      () => {
        this.session.isSpeakingStory = false;
        if (btn) btn.innerHTML = '<span class="audio-icon">🎧</span> Sesli Dinle';
        words.forEach(el => el.classList.remove('playing'));
      }
    );
  }

  // ─────────────────────────────────────────────────────────
  //  SPEAKING MODULE
  // ─────────────────────────────────────────────────────────

  _initSpeak() {
    this._buildWaveform();
    this._renderSpeak();
    this._renderSpeakStats();
    this._renderSpeakHistory();
    const diff = this.state.get('speakDiff');
    document.querySelectorAll('.diff-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.diff === diff);
    });
    const sm = document.getElementById('shadow-mode');
    if (sm) sm.checked = this.state.get('shadowMode');
    const aa = document.getElementById('auto-advance');
    if (aa) aa.checked = this.state.get('autoAdvance');
    // Restore last mode tab
    const lastMode = this.session.speakMode || 'classic';
    document.querySelectorAll('.lab-mode-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === lastMode);
    });
    document.querySelectorAll('.speak-mode-panel').forEach(p => p.classList.remove('active'));
    const activePanel = document.getElementById(`speak-panel-${lastMode}`);
    if (activePanel) activePanel.classList.add('active');
    if (lastMode === 'convo')   this._renderConvoLevels();
    else if (lastMode === 'speed')   this._renderSpeedList();
    else if (lastMode === 'phoneme') this._renderPhonemeList();
  }

  _buildWaveform() {
    const el = document.getElementById('waveform');
    if (!el) return;
    el.innerHTML = Array.from({length:32}, (_, i) => {
      return `<div class="wave-bar" style="--h:8px;--dur:0.5s;animation-delay:${(i*0.03).toFixed(3)}s"></div>`;
    }).join('');
  }

  toggleShadowMode(val) {
    this.state.set('shadowMode', val);
    this.audio.play('click');
    UI.toast(`Gölge Modu ${val ? 'Açık' : 'Kapalı'}`, 1500);
  }

  toggleShuffleMode(val) {
    this.state.set('speakShuffle', val);
    this.session.shuffledPools = {}; // Reset shuffles
    this.session.speakIdx = 0;
    this._renderSpeak();
    this.audio.play('click');
    UI.toast(`Karışık Mod ${val ? 'Açık' : 'Kapalı'}`, 1500);
  }

  _startMicAnalysis() {
    if (this.session.micInterval) clearInterval(this.session.micInterval);
    if (!this.audio._ctx) this.audio._ctx_ensure();
    const ctx = this.audio._ctx;
    const pbBtn = document.getElementById('btn-playback');
    if (pbBtn) pbBtn.style.display = 'none';
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.session.micStream = stream;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const bars = document.querySelectorAll('.wave-bar');
      this.session.micInterval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        bars.forEach((bar, i) => {
          const val = dataArray[i % dataArray.length] || 0;
          const h = Math.max(8, (val / 255) * 40 + 8);
          bar.style.setProperty('--h', `${h}px`);
          bar.style.opacity = 0.3 + (val / 255) * 0.7;
        });
      }, 50);
      this.session.audioChunks = [];
      this.session.mediaRecorder = new MediaRecorder(stream);
      this.session.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.session.audioChunks.push(e.data);
      };
      this.session.mediaRecorder.onstop = () => {
        const mime = this.session.mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(this.session.audioChunks, { type: mime });
        this.session.lastAudioBlob = audioBlob;
        this.session.lastAudioMime = mime;
        this.session.lastAudioUrl = URL.createObjectURL(audioBlob);
        if (pbBtn) pbBtn.style.display = 'flex';
        // Pronunciation assessment: blob is ready, fire if speech result already arrived
        if (this.session.pendingAzureText) {
          const ref = this.session.pendingAzureText;
          this.session.pendingAzureText = null;
          const azureKey = window.remoteFlags?.azure_speech_key || localStorage.getItem('sp_azure_key');
          if (azureKey) {
            this._runAzureAssessment(audioBlob, mime, ref).then(w => { if (w) this._applyPronunciationScore(w.map(azW => {
              const acc = azW.PronunciationAssessment?.AccuracyScore ?? 0;
              const err = azW.PronunciationAssessment?.ErrorType ?? 'None';
              return { word: azW.Word?.toLowerCase(), ok: acc >= 75 && err === 'None' };
            }), ref, null); });
          } else {
            // Whisper.js: acoustic-model transcription — much less normalization than Chrome ASR
            this._runWhisperAssessment(audioBlob, ref).then(r => { if (r) this._applyPronunciationScore(r.wordResults, ref, r.transcript); });
          }
        }
      };
      this.session.mediaRecorder.start();
    }).catch(() => {});
  }

  _stopMicAnalysis() {
    if (this.session.micInterval) { clearInterval(this.session.micInterval); this.session.micInterval = null; }
    if (this.session.mediaRecorder && this.session.mediaRecorder.state !== 'inactive') { this.session.mediaRecorder.stop(); }
    if (this.session.micStream) { this.session.micStream.getTracks().forEach(t => t.stop()); this.session.micStream = null; }
    document.querySelectorAll('.wave-bar').forEach(bar => {
      bar.style.setProperty('--h', '8px');
      bar.style.opacity = '0.3';
    });
  }

  playLastRecording() {
    if (!this.session.lastAudioUrl) return;
    const audio = new Audio(this.session.lastAudioUrl);
    audio.play();
    const btn = document.getElementById('btn-playback');
    if (btn) {
      btn.style.borderColor = 'var(--cyan)';
      audio.onended = () => btn.style.borderColor = 'var(--violet)';
    }
  }

  setSpeakDiff(diff, btn) {
    this.state.set('speakDiff', diff);
    this.session.speakIdx = 0;
    document.querySelectorAll('.diff-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (this.session.isRecording) { this.speech.stopRecognition(); this._stopRecord(); }
    this._renderSpeak();
    this.audio.play('click');
  }

  _getSpeakPool() {
    const diff = this.state.get('speakDiff');
    const isShuffle = this.state.get('speakShuffle');
    const basePool = SPEAK_CHALLENGES[diff] || SPEAK_CHALLENGES.easy;
    if (!isShuffle) return basePool;
    if (!this.session.shuffledPools[diff]) {
      this.session.shuffledPools[diff] = [...basePool].sort(() => Math.random() - 0.5);
    }
    return this.session.shuffledPools[diff];
  }

  _getSentence() {
    const pool = this._getSpeakPool();
    return pool[this.session.speakIdx % pool.length];
  }

  speakSentence(rate = 0.88) { this.speakWord(this._getSentence(), rate); }

  _markupText(text, className = 'story-word') {
    // Build known phrases from PHRASE_DICT — longest first for greedy matching
    const knownPhrases = Object.keys(PHRASE_DICT)
      .filter(p => p.includes(' '))
      .sort((a, b) => b.split(' ').length - a.split(' ').length || b.length - a.length);

    let processed = text;
    
    // Step 1: Wrap known phrases
    knownPhrases.forEach(phrase => {
      const regex = new RegExp(`\\b(${phrase})\\b`, 'gi');
      processed = processed.replace(regex, (match) => {
        const cleanPhrase = match.replace(/'/g, "\\'");
        return `[[PHRASE:${cleanPhrase}]]`;
      });
    });

    // Step 2: Wrap individual words, preserving phrases and tags
    return processed.replace(/(<[^>]+>)|(\[\[PHRASE:[^\]]+\]\])|([A-Za-z']+)/g, (match, tag, phraseToken, word) => {
      if (tag) return tag;
      if (phraseToken) {
        const phraseText = phraseToken.replace('[[PHRASE:', '').replace(']]', '');
        return `<span class="${className} phrase word-click-target" data-word="${phraseText.replace(/"/g,'&quot;')}">${phraseText}</span>`;
      }
      return `<span class="${className} word-click-target" data-word="${word.replace(/"/g,'&quot;')}">${word}</span>`;
    });
  }

  _renderSpeak() {
    const pool = this._getSpeakPool();
    const idx  = this.session.speakIdx % pool.length;
    const text = pool[idx];
    UI.setEl('speak-counter', `${idx + 1}/${pool.length}`);
    
    // Sync UI components
    const shuffleBox = document.getElementById('shuffle-mode');
    if (shuffleBox) shuffleBox.checked = !!this.state.get('speakShuffle');
    const shadowBox = document.getElementById('shadow-mode');
    if (shadowBox) shadowBox.checked = !!this.state.get('shadowMode');

    setTimeout(() => UI.setWidth('speak-prog-fill', ((idx + 1) / pool.length) * 100), 50);
    const wordsEl = document.getElementById('sentence-words');
    if (wordsEl) {
      wordsEl.innerHTML = this._markupText(text, 'sw');
    }
    const transcript = document.getElementById('speak-transcript');
    if (transcript) transcript.innerHTML = '';
    const scorePanel = document.getElementById('score-panel');
    if (scorePanel) scorePanel.style.display = 'none';
    const coachPanel = document.getElementById('ai-coach-panel');
    if (coachPanel) { coachPanel.innerHTML = ''; coachPanel.style.display = 'none'; }
  }

  toggleRecord() {
    if (!this.speech.SpeechRecognition) { UI.toast("Tarayıcın ses tanıma API'sini desteklemiyor."); return; }
    if (this.session.isRecording) { this.speech.stopRecognition(); this._stopRecord(); return; }
    const scorePanel = document.getElementById('score-panel');
    if (scorePanel) scorePanel.style.display = 'none';
    const transcript = document.getElementById('speak-transcript');
    if (transcript) transcript.innerHTML = '<span style="color:var(--cyan);animation:pulse 1.5s infinite">🎙️ Dinliyorum... Konuşmaya başla</span>';
    document.querySelectorAll('.sw').forEach(el => el.className = 'sw');
    this.audio.play('pop');
    this.session.isRecording = true;
    this._setRecordUI(true);
    this._startMicAnalysis();
    this.speech.startRecognition({
      onResult: (e) => this._handleSpeechResult(e),
      onError:  (e) => {
        this._stopRecord();
        const el = document.getElementById('speak-transcript');
        const msg = e.error === 'not-allowed' ? 'Mikrofon izni gerekli.' : `Hata: ${e.error}`;
        if (el) el.innerHTML = `<span style="color:var(--rose)">${msg}</span>`;
      },
      onEnd:     () => this._stopRecord(),
      onInterim: (text) => {
        const el = document.getElementById('speak-transcript');
        if (el) el.innerHTML = `<em style="color:var(--text-2)">${text}</em>`;
      },
    });
  }

  _stopRecord() { this.session.isRecording = false; this._setRecordUI(false); this._stopMicAnalysis(); }

  _setRecordUI(recording) {
    const btn   = document.getElementById('rec-btn');
    const icon  = document.getElementById('rec-icon');
    const label = document.getElementById('rec-label');
    const wave  = document.getElementById('waveform');
    if (btn)   btn.classList.toggle('recording', recording);
    if (icon)  icon.textContent  = recording ? '⏹️' : '🎤';
    if (label) label.textContent = recording ? 'Durdur' : 'Konuş';
    if (wave)  wave.classList.toggle('recording', recording);
    const card = document.querySelector('.sentence-card');
    if (card)  card.classList.toggle('sp-recording', recording);
  }

  _handleSpeechResult(event) {
    const spoken = event.results[0][0].transcript.trim();
    const text   = this._getSentence();
    const tWords = text.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(' ').filter(Boolean);
    const normSpoken = spoken.toLowerCase()
      .replace(/i'm/g,'i am').replace(/i've/g,'i have').replace(/i'll/g,'i will')
      .replace(/i'd/g,'i would').replace(/don't/g,'do not').replace(/doesn't/g,'does not')
      .replace(/didn't/g,'did not').replace(/can't/g,'cannot').replace(/won't/g,'will not')
      .replace(/isn't/g,'is not').replace(/aren't/g,'are not').replace(/wasn't/g,'was not')
      .replace(/weren't/g,'were not').replace(/it's/g,'it is').replace(/he's/g,'he is')
      .replace(/she's/g,'she is').replace(/we're/g,'we are').replace(/they're/g,'they are')
      .replace(/there's/g,'there is').replace(/that's/g,'that is').replace(/what's/g,'what is')
      .replace(/[^a-z0-9 ]/g,'');
    const sWords = normSpoken.split(' ').filter(Boolean);
    const results = this._scoreWords(tWords, sWords);
    const score  = Math.min(Math.round(results.filter(Boolean).length / tWords.length * 100), 100);
    document.querySelectorAll('.sw').forEach((el, i) => { el.className = 'sw ' + (results[i] ? 'correct' : 'wrong'); });
    const tEl = document.getElementById('speak-transcript');
    if (tEl) tEl.innerHTML = `<em style="color:var(--text-2)">"${spoken}"</em>`;
    const panel = document.getElementById('score-panel');
    if (panel) panel.style.display = 'flex';
    this._animateScoreRing(score);
    let fb = '', xp = 0;
    if (score >= 90)      { fb = '🏆 Mükemmel! Anadili gibi!'; xp = window.remoteFlags?.xp_speak_perfect ?? 60; }
    else if (score >= 75) { fb = '🎉 Harika! Çok iyi gidiyorsun.'; xp = window.remoteFlags?.xp_speak_great ?? 40; }
    else if (score >= 55) { fb = '💪 İyi iş! Biraz daha pratik yap.'; xp = window.remoteFlags?.xp_speak_good ?? 20; }
    else                  { fb = '🔄 Tekrar dene — daha net söyle.'; xp = window.remoteFlags?.xp_speak_retry ?? 5; }
    UI.setEl('score-feedback', fb);
    const bd = document.getElementById('word-breakdown');
    if (bd) {
      bd.innerHTML = tWords.map((w, i) =>
        `<span class="wb-chip ${results[i] ? 'wb-ok' : 'wb-miss'} speak-word-btn" data-word="${w.replace(/"/g,'&quot;')}" title="Dinle ve Tekrar Et">${w}</span>`
      ).join('');
    }
    const wordMap = {};
    WORDS.forEach(wd => { wordMap[wd.en.toLowerCase()] = wd; });
    const missedWords = tWords.filter((w, i) => !results[i]);
    this._callAICoach(text, spoken, missedWords, score);

    const missedIpa = tWords
      .filter((w, i) => !results[i])
      .map(w => wordMap[w])
      .filter(wd => wd && wd.ipa)
      .map(wd => `<div class="ipa-hint-chip speak-word-btn" data-word="${wd.en.replace(/"/g,'&quot;')}">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span>${wd.icon || '🔊'} <strong>${wd.en}</strong></span>
            <em>${wd.ipa}</em>
          </div>
          <div style="font-size:0.65rem;opacity:0.7;margin-top:2px">Dinlemek için tıkla</div>
        </div>`)
      .join('');
    const ipaPanel = document.getElementById('ipa-hint-panel');
    if (ipaPanel) {
      if (missedIpa.length > 0) {
        const cards = missedIpa.map(wd => {
          // Simple syllable simulation (visual only)
          const sylls = wd.en.match(/.{1,3}/g) || [wd.en]; 
          const syllHtml = sylls.map((s,i) => `<span class="ipa-syll ${i===0?'stress':''}">${s}</span>`).join('');

          return `
          <div class="ipa-card" onclick="window._app.speech.speak('${wd.en.replace(/'/g,"\\\\'")}', 0.8)">
            <div class="ipa-word-row">
              <span class="ipa-word">${wd.en}</span>
              <span class="ipa-spelling">${wd.ipa || '/.../'}</span>
            </div>
            <div class="ipa-syllables">${syllHtml}</div>
            <div class="ipa-actions">
              <button class="ipa-btn play" onclick="event.stopPropagation(); window._app.speech.speak('${wd.en.replace(/'/g,"\\\\'")}', 1.0)">
                <span>🔊</span> Normal
              </button>
              <button class="ipa-btn slow" onclick="event.stopPropagation(); window._app.speech.speak('${wd.en.replace(/'/g,"\\\\'")}', 0.5)">
                <span>🐢</span> Yavaş
              </button>
            </div>
          </div>`;
        }).join('');

        ipaPanel.innerHTML = `
          <div class="ipa-hint-label">🎯 Telaffuz Stüdyosu</div>
          <div class="ipa-hints-grid">${cards}</div>`;
      } else {
        ipaPanel.innerHTML = '';
      }
    }    this.audio.play(score >= 75 ? 'success' : score >= 40 ? 'pop' : 'click');
    window.analyticsManager?.speakingAttempt(score, this.state.get('accent'));
    this.addXP(xp, 'hard', 'speak');
    if (score === 100) {
      const ring = document.querySelector('.score-ring-wrap');
      if (ring) { ring.classList.add('perfect-score'); setTimeout(() => ring.classList.remove('perfect-score'), 2000); }
      if (typeof confetti === 'function') { confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ['#00d4ff', '#7c3aed'] }); }
    }
    const best  = this.state.get('speakBest');
    const total = this.state.get('speakTotal') + 1;
    const sum   = this.state.get('speakSum')   + score;
    const hist  = this.state.get('speakHistory');
    hist.unshift({ score, snippet: text.slice(0, 30) + '…' });
    if (hist.length > 8) hist.pop();
    this.state.update({ speakBest: Math.max(best, score), speakTotal: total, speakSum: sum, speakHistory: hist });
    this._renderSpeakStats();
    this._renderSpeakHistory();
    // Store for Azure assessment (fires after MediaRecorder.onstop delivers the blob)
    this.session.pendingAzureText = text;
    if (this.state.get('autoAdvance') && score >= (window.remoteFlags?.speaking_auto_advance_score ?? 80)) {
      let cd = window.remoteFlags?.speaking_countdown_sec ?? 3;
      const fbEl = document.getElementById('score-feedback');
      const orig = fbEl ? fbEl.textContent : '';
      const iv = setInterval(() => { cd--; if (fbEl) fbEl.textContent = cd > 0 ? `${orig} ⏩ ${cd}s` : orig; if (cd <= 0) { clearInterval(iv); this.nextSpeak(); } }, 1000);
    }
  }

  _animateScoreRing(score) {
    const arc   = document.getElementById('score-arc');
    const numEl = document.getElementById('score-num');
    if (!arc) return;
    const circ  = 2 * Math.PI * 50;
    const color = score >= 75 ? 'var(--green)' : score >= 50 ? 'var(--amber)' : 'var(--rose)';
    arc.style.stroke = color; arc.style.strokeDasharray  = circ; arc.style.strokeDashoffset = circ;
    requestAnimationFrame(() => requestAnimationFrame(() => { arc.style.transition = 'stroke-dashoffset 1.3s var(--bounce)'; arc.style.strokeDashoffset = circ - (score / 100) * circ; }));
    if (numEl) { let cur = 0; const step = score / 55; const iv = setInterval(() => { cur = Math.min(cur + step, score); numEl.textContent = Math.round(cur); if (cur >= score) clearInterval(iv); }, 16); }
  }

  // ── AI Pronunciation Coach ────────────────────────────────────
  async _callAICoach(target, spoken, missed, score) {
    const panel = document.getElementById('ai-coach-panel');
    if (!panel) return;

    panel.style.display = 'block';
    panel.innerHTML = `
      <div class="coach-header">
        <div class="coach-avatar">🤖</div>
        <div class="coach-meta">
          <span class="coach-name">AI Telaffuz Koçu</span>
          <div class="coach-dots"><span></span><span></span><span></span></div>
        </div>
      </div>`;

    let text = '';
    const apiKey = window.remoteFlags?.coach_key || localStorage.getItem('sp_coach_key');

    if (apiKey) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 200,
            messages: [{ role: 'user', content:
              `İngilizce telaffuz koçusun. Türk öğrenci:\nHedef: "${target}"\nSöylenen: "${spoken || '(sessiz)'}"\nHatalı: ${missed.join(', ') || 'yok'} | Skor: %${score}\nTürkçe, 2-3 cümle, somut öneri + teşvik. Emoji kullan. Çok kısa ol.`
            }]
          })
        });
        const d = await res.json();
        text = d.content?.[0]?.text?.trim() || '';
      } catch(e) {}
    }

    if (!text) {
      await new Promise(r => setTimeout(r, 700 + Math.random() * 500));
      text = this._localCoachFeedback(target, spoken, missed, score);
    }

    const dots = panel.querySelector('.coach-dots');
    if (dots) dots.remove();
    const body = document.createElement('div');
    body.className = 'coach-body';
    panel.appendChild(body);

    let i = 0;
    const chars = [...text.replace(/\n/g, ' • ')];
    const iv = setInterval(() => {
      i += 3;
      body.innerHTML = chars.slice(0, i).join('') + (i < chars.length ? '<span class="coach-cursor">|</span>' : '');
      if (i >= chars.length) clearInterval(iv);
    }, 20);
  }

  _localCoachFeedback(target, spoken, missed, score) {
    if (score === 100) return '🏆 Mükemmel! Her kelime kristal netliğinde. Anadili konuşucusu gibi söyledin!';
    const lines = [];
    if (missed.length > 0) {
      const tips = missed.slice(0, 2).map(w => {
        const t = this._phonTip(w);
        return t ? `"${w}" (${t})` : `"${w}"`;
      });
      lines.push(`🎯 Dikkat: ${tips.join(' — ')}.`);
    }
    const sw = (spoken || '').trim().split(/\s+/).filter(Boolean).length;
    const tw = target.trim().split(/\s+/).length;
    if (sw < tw * 0.65) lines.push('💡 Cümlenin bir kısmı kaçtı — tüm kelimeleri söylemeye çalış.');
    if (score >= 75)      lines.push('💪 Çok iyi gidiyorsun! Az kalan eksikleri de kapatırsan mükemmel.');
    else if (score >= 50) lines.push('🔄 Önce 🐢 Yavaş modda dinle, sonra tekrar dene.');
    else                  lines.push('📢 Cümleyi parça parça pratik et, sonra bütün söyle.');
    return lines.join(' • ');
  }

  _phonTip(word) {
    const w = word.toLowerCase();
    if (/th/.test(w))              return 'dişler arası "th" sesi';
    if (/^w[aeiou]|[^a-z]w[aeiou]/.test(w)) return 'dudak yuvarlayarak "w"';
    if (/tion$|sion$/.test(w))     return 'sonu "şın" gibi';
    if (/ng$|nk/.test(w))          return 'burundan "ng"';
    if (w.endsWith('ed'))           return '"-ed" ekini duyur';
    if (/ough|augh/.test(w))        return 'özel okunuş — dinleyerek öğren';
    if (/[^aeiou]{3,}/.test(w))    return 'ünsüz yığılmasına dikkat';
    if (w.length > 9)               return 'hecelere böl: ' + (w.match(/.{1,3}/g)||[]).join('-');
    return null;
  }
  // ─────────────────────────────────────────────────────────────

  _scoreWords(tWords, sWords) {
    const _match = (s, t) => {
      if (s === t) return true;
      // Only accept legitimate inflected forms of the same word — no fuzzy matching
      if (s === t + 's'   || t === s + 's')   return true;
      if (s === t + 'es'  || t === s + 'es')  return true;
      if (s === t + 'ed'  || t === s + 'ed')  return true;
      if (s === t + 'd'   || t === s + 'd')   return true;
      if (t.endsWith('e')   && s === t.slice(0,-1) + 'ing') return true;
      if (s.endsWith('ing') && t === s.slice(0,-3) + 'e')   return true;
      if (s.endsWith('ing') && t === s.slice(0,-3))          return true;
      return false; // no Levenshtein — speech API is the only judge
    };

    // Position-aware LCS alignment: spoken words must appear in target order
    const n = tWords.length, m = sWords.length;
    const results = new Array(n).fill(false);
    let sBase = 0;
    for (let ti = 0; ti < n; ti++) {
      const limit = Math.min(m, sBase + 5); // allow up to 4 extra spoken words
      for (let si = sBase; si < limit; si++) {
        if (_match(sWords[si], tWords[ti])) {
          results[ti] = true;
          sBase = si + 1;
          break;
        }
      }
    }
    return results;
  }

  async _runAzureAssessment(audioBlob, mimeType, refText) {
    const key    = window.remoteFlags?.azure_speech_key    || localStorage.getItem('sp_azure_key');
    const region = window.remoteFlags?.azure_speech_region || localStorage.getItem('sp_azure_region') || 'eastus';
    if (!key) return null;
    const assessConfig = btoa(unescape(encodeURIComponent(JSON.stringify({
      ReferenceText: refText,
      GradingSystem: 'HundredMark',
      Dimension: 'Comprehensive',
      EnableMiscue: true
    }))));
    try {
      const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': mimeType,
          'Pronunciation-Assessment': assessConfig
        },
        body: audioBlob
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.NBest?.[0]?.Words || null;
    } catch(e) { return null; }
  }

  _applyAzureScore(azureWords, refText) {
    const panel = document.getElementById('score-panel');
    if (!panel || panel.style.display === 'none') return;
    const tWords = refText.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(Boolean);

    // Map each target word to its Azure result (threshold: AccuracyScore >= 75)
    const results = tWords.map(tw => {
      const azWord = azureWords.find(w => w.Word?.toLowerCase() === tw);
      if (!azWord) return false;
      const acc = azWord.PronunciationAssessment?.AccuracyScore ?? 0;
      const err = azWord.PronunciationAssessment?.ErrorType ?? 'None';
      return acc >= 75 && err === 'None';
    });

    const score = Math.min(Math.round(results.filter(Boolean).length / tWords.length * 100), 100);

    // Update word highlight chips
    document.querySelectorAll('.sw').forEach((el, i) => {
      el.className = 'sw ' + (results[i] ? 'correct' : 'wrong');
    });

    // Update word breakdown chips
    const bd = document.getElementById('word-breakdown');
    if (bd) {
      bd.innerHTML = tWords.map((w, i) =>
        `<span class="wb-chip ${results[i] ? 'wb-ok' : 'wb-miss'} speak-word-btn" data-word="${w.replace(/"/g,'&quot;')}" title="Dinle ve Tekrar Et">${w}</span>`
      ).join('');
    }

    // Recompute feedback and XP
    let fb = '', xp = 0;
    if (score >= 90)      { fb = '🏆 Mükemmel! Anadili gibi!'; xp = window.remoteFlags?.xp_speak_perfect ?? 60; }
    else if (score >= 75) { fb = '🎉 Harika! Çok iyi gidiyorsun.'; xp = window.remoteFlags?.xp_speak_great ?? 40; }
    else if (score >= 55) { fb = '💪 İyi iş! Biraz daha pratik yap.'; xp = window.remoteFlags?.xp_speak_good ?? 20; }
    else                  { fb = '🔄 Tekrar dene — daha net söyle.'; xp = window.remoteFlags?.xp_speak_retry ?? 5; }
    UI.setEl('score-feedback', fb);

    // Update score ring with Azure-accurate score
    this._animateScoreRing(score);

    // Re-trigger AI coach with Azure-precise missed words
    const missedWords = tWords.filter((_, i) => !results[i]);
    if (missedWords.length > 0) {
      const spokenEl = document.getElementById('speak-transcript');
      const spoken = spokenEl ? spokenEl.querySelector('em')?.textContent?.replace(/^"|"$/g,'') || '' : '';
      this._callAICoach(refText, spoken, missedWords, score);
    }

    if (score === 100) {
      const ring = document.querySelector('.score-ring-wrap');
      if (ring) { ring.classList.add('perfect-score'); setTimeout(() => ring.classList.remove('perfect-score'), 2000); }
      if (typeof confetti === 'function') { confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ['#00d4ff', '#7c3aed'] }); }
    }
  }

  // ─── Whisper.js local pronunciation assessment ───────────────────────────
  // Uses @xenova/transformers (runs in browser via WASM). Unlike Chrome ASR,
  // Whisper transcribes acoustically — "avary doy" stays "avary doy", not "every day".
  async _runWhisperAssessment(audioBlob, refText) {
    const feedbackEl = document.getElementById('score-feedback');
    try {
      // Lazy-load model (cached after first 75MB download)
      if (!window._whisperPipe) {
        if (feedbackEl) feedbackEl.textContent = '🧠 Telaffuz motoru yükleniyor...';
        const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
        window._whisperPipe = await pipeline(
          'automatic-speech-recognition',
          'Xenova/whisper-tiny.en',
          { progress_callback: p => {
              if (feedbackEl && p.status === 'progress')
                feedbackEl.textContent = `📥 Yükleniyor ${Math.round(p.progress || 0)}%...`;
            }
          }
        );
      }
      if (feedbackEl) feedbackEl.textContent = '🎯 Telaffuz analiz ediliyor...';

      // Decode blob → float32 mono 16kHz (Whisper requirement)
      const arrBuf = await audioBlob.arrayBuffer();
      const tmpCtx = new AudioContext();
      const decoded = await tmpCtx.decodeAudioData(arrBuf);
      tmpCtx.close();
      const offCtx = new OfflineAudioContext(1, Math.ceil(decoded.duration * 16000), 16000);
      const src = offCtx.createBufferSource();
      src.buffer = decoded;
      src.connect(offCtx.destination);
      src.start(0);
      const rendered = await offCtx.startRendering();
      const audioData = rendered.getChannelData(0);

      // Transcribe — Whisper is more literal, less normalized than Chrome ASR
      const out = await window._whisperPipe(audioData, { language: 'english', task: 'transcribe' });
      const transcript = (out.text || '').trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');

      const tWords = refText.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(Boolean);
      const sWords = transcript.split(' ').filter(Boolean);

      // Strict phonetic match: allow max 15% Levenshtein ratio
      let si = 0;
      const wordResults = tWords.map(tw => {
        const limit = Math.min(sWords.length, si + 4);
        for (let j = si; j < limit; j++) {
          const lev = this._levenshtein(sWords[j], tw);
          const ratio = lev / Math.max(tw.length, sWords[j].length, 1);
          if (ratio <= 0.15) { si = j + 1; return { word: tw, ok: true }; }
        }
        return { word: tw, ok: false };
      });

      return { wordResults, transcript };
    } catch(e) {
      console.warn('Whisper assessment failed:', e);
      return null;
    }
  }

  // ─── Unified pronunciation score updater (Azure or Whisper) ──────────────
  _applyPronunciationScore(wordResults, refText, whisperTranscript) {
    const panel = document.getElementById('score-panel');
    if (!panel || panel.style.display === 'none') return;
    const tWords = refText.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(Boolean);

    // wordResults can come from Azure ({word, ok}) or Whisper ({word, ok})
    const results = tWords.map((tw, i) => {
      // Try index-based first, then word-based lookup for Azure
      const wr = wordResults[i] || wordResults.find(r => r.word === tw);
      return wr ? wr.ok : false;
    });

    const score = Math.min(Math.round(results.filter(Boolean).length / tWords.length * 100), 100);

    document.querySelectorAll('.sw').forEach((el, i) => {
      el.className = 'sw ' + (results[i] ? 'correct' : 'wrong');
    });
    const bd = document.getElementById('word-breakdown');
    if (bd) {
      bd.innerHTML = tWords.map((w, i) =>
        `<span class="wb-chip ${results[i] ? 'wb-ok' : 'wb-miss'} speak-word-btn" data-word="${w.replace(/"/g,'&quot;')}" title="Dinle ve Tekrar Et">${w}</span>`
      ).join('');
    }
    this._animateScoreRing(score);
    let fb = '';
    if (score >= 90)      fb = '🏆 Mükemmel! Anadili gibi!';
    else if (score >= 75) fb = '🎉 Harika! Çok iyi gidiyorsun.';
    else if (score >= 55) fb = '💪 İyi iş! Biraz daha pratik yap.';
    else                  fb = '🔄 Tekrar dene — daha net söyle.';
    UI.setEl('score-feedback', fb);
    const missedWords = tWords.filter((_, i) => !results[i]);
    if (missedWords.length > 0) {
      const spokenEl = document.getElementById('speak-transcript');
      const spoken = spokenEl?.querySelector('em')?.textContent?.replace(/^"|"$/g,'') || whisperTranscript || '';
      this._callAICoach(refText, spoken, missedWords, score);
    }
    if (score === 100) {
      const ring = document.querySelector('.score-ring-wrap');
      if (ring) { ring.classList.add('perfect-score'); setTimeout(() => ring.classList.remove('perfect-score'), 2000); }
      if (typeof confetti === 'function') confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 }, colors: ['#00d4ff', '#7c3aed'] });
    }
  }

  _levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 3) return 99;
    const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    return dp[m][n];
  }

  retrySpeak() { if (this.session.isRecording) { this.speech.stopRecognition(); this._stopRecord(); } this._renderSpeak(); this.audio.play('pop'); }

  nextSpeak() {
    const pool = this._getSpeakPool();
    if (this.session.isRecording) { this.speech.stopRecognition(); this._stopRecord(); }
    this.session.speakIdx = (this.session.speakIdx + 1) % pool.length;
    this._renderSpeak();
    this.audio.play('pop');
  }

  _renderSpeakStats() {
    const total = this.state.get('speakTotal');
    const sum   = this.state.get('speakSum');
    const best  = this.state.get('speakBest');
    const avg   = total > 0 ? Math.round(sum / total) : 0;
    UI.setEl('sp-best',  best > 0 ? `${best}%` : '—');
    UI.setEl('sp-avg',   total > 0 ? `${avg}%` : '—');
    UI.setEl('sp-total', total);
  }

  _renderSpeakHistory() {
    const el   = document.getElementById('speak-history');
    const hist = this.state.get('speakHistory');
    if (!el) return;
    if (!hist.length) { el.innerHTML = '<p style="font-size:0.8rem;color:var(--text-3)">Henüz deneme yok</p>'; return; }
    el.innerHTML = hist.map(h => {
      const col = h.score >= 75 ? 'var(--green)' : h.score >= 50 ? 'var(--amber)' : 'var(--rose)';
      return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">
        <span style="width:8px;height:8px;border-radius:50%;background:${col};flex-shrink:0"></span>
        <span style="flex:1;font-size:0.78rem;color:var(--text-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${h.snippet}</span>
        <span style="font-size:0.78rem;font-weight:700;color:${col}">${h.score}%</span>
      </div>`;
    }).join('');
  }

  // ─────────────────────────────────────────────────────────
  //  SPEAKING LAB — MODE SYSTEM
  // ─────────────────────────────────────────────────────────

  setSpeakMode(mode, btn) {
    document.querySelectorAll('.lab-mode-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.speak-mode-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(`speak-panel-${mode}`);
    if (panel) panel.classList.add('active');
    this.session.speakMode = mode;
    if (this.session.isRecording) { this.speech.stopRecognition(); this._stopRecord(); }
    if (mode === 'convo')   this._renderConvoLevels();
    this.audio.play('click');
  }

  // ─── AI CONVERSATION MODE ────────────────────────────────────────────────

  _renderConvoLevels() {
    const el = document.getElementById('convo-content');
    if (!el) return;
    const completed = this.state.get('convoCompleted') || {};
    const counts = {
      easy:   CONVERSATIONS.filter(c => c.level === 'easy').length,
      medium: CONVERSATIONS.filter(c => c.level === 'medium').length,
      hard:   CONVERSATIONS.filter(c => c.level === 'hard').length,
    };
    const done = {
      easy:   CONVERSATIONS.filter(c => c.level === 'easy'   && completed[c.id]).length,
      medium: CONVERSATIONS.filter(c => c.level === 'medium' && completed[c.id]).length,
      hard:   CONVERSATIONS.filter(c => c.level === 'hard'   && completed[c.id]).length,
    };
    const lvls = [
      { key:'easy',   icon:'🌱', name:'Başlangıç', color:'var(--green)',  glow:'rgba(16,185,129,0.12)',
        tags:['Alışveriş','Restoran','Otel','Ulaşım','Tanışma'],
        desc:'Temel günlük iletişim' },
      { key:'medium', icon:'📚', name:'Orta',       color:'var(--amber)',  glow:'rgba(245,158,11,0.12)',
        tags:['İş görüşmesi','Seyahat','Sağlık','Bankacılık','Sosyal'],
        desc:'İş hayatı ve sosyal durumlar' },
      { key:'hard',   icon:'🔥', name:'İleri',      color:'var(--rose)',   glow:'rgba(244,63,94,0.12)',
        tags:['Müzakere','Akademik','Hukuk','Finans','Liderlik'],
        desc:'Profesyonel ve karmaşık senaryolar' },
    ];
    el.innerHTML = `
      <div class="convo-level-screen">
        <div class="cls-header">
          <div class="cls-orb">🤖</div>
          <h2 class="cls-title">AI Sohbet Koçu</h2>
          <p class="cls-sub">Gerçek hayat senaryolarında İngilizce pratik yap</p>
        </div>
        <div class="cls-levels">
          ${lvls.map(l => `
            <button class="cls-level-btn ${l.key} convo-level-btn" data-level="${l.key}" style="--lv-color:${l.color};--lv-glow:${l.glow}">
              <div class="clb-left">
                <span class="clb-icon">${l.icon}</span>
              </div>
              <div class="clb-body">
                <div class="clb-top">
                  <span class="clb-name">${l.name}</span>
                  <span class="clb-done">${done[l.key]}/${counts[l.key]}</span>
                </div>
                <div class="clb-desc">${l.desc}</div>
                <div class="clb-tags">${l.tags.map(t => `<span class="clb-tag">${t}</span>`).join('')}</div>
                <div class="clb-bar"><div class="clb-bar-fill" style="width:${Math.round(done[l.key]/counts[l.key]*100)}%;background:${l.color}"></div></div>
              </div>
              <div class="clb-arrow">›</div>
            </button>`).join('')}
        </div>
        <p class="cls-hint">💡 Her seferinde farklı bir senaryo gelir</p>
      </div>`;
  }

  startConvoByLevel(level) {
    const pool = CONVERSATIONS.filter(c => c.level === level);
    if (!pool.length) return;
    const lastId   = this.session.convo?.scenario?.id;
    const candidates = pool.length > 1 ? pool.filter(c => c.id !== lastId) : pool;
    const scenario = candidates[Math.floor(Math.random() * candidates.length)];
    this.session.convo = { scenario, level, turnIdx: 0, score: 0, total: 0, sessionXP: 0, turnLog: [] };
    this._renderConvoChat();
  }

  _renderConvoChat() {
    const el = document.getElementById('convo-content');
    if (!el) return;
    const { scenario } = this.session.convo;
    const userTurns  = scenario.turns.filter(t => t.role === 'user' || t.userHint).length;
    const levelMeta  = { easy: { label:'Başlangıç', color:'var(--green)' }, medium: { label:'Orta', color:'var(--amber)' }, hard: { label:'İleri', color:'var(--rose)' } };
    const lm = levelMeta[scenario.level] || { label:'', color:'var(--cyan)' };
    el.innerHTML = `
      <div class="convo-chat-wrap">
        <div class="convo-chat-header">
          <button class="ccb-back" onclick="window._app.setSpeakMode('convo', this)" title="Geri">←</button>
          <div class="cch-info">
            <span class="cch-emoji">${scenario.emoji || '💬'}</span>
            <div class="cch-text">
              <span class="cch-title">${scenario.title}</span>
              <span class="cch-level" style="color:${lm.color}">${lm.label}</span>
            </div>
          </div>
          <div class="cch-right">
            <span class="cch-xp" id="cch-xp">0 XP</span>
            <span class="cch-progress" id="cch-progress">0 / ${userTurns}</span>
          </div>
        </div>
        <div class="convo-chat" id="convo-chat"></div>
        <div class="convo-user-area" id="convo-user-area"></div>
      </div>`;
    // Show scene intro card first
    this._convoShowScene(scenario);
    setTimeout(() => this._convoNextTurn(), 900);
  }

  _convoShowScene(scenario) {
    const chat = document.getElementById('convo-chat');
    if (!chat) return;
    const d = document.createElement('div');
    d.className = 'convo-scene-card';
    d.innerHTML = `
      <div class="csc-badge">📍 Senaryo</div>
      <div class="csc-name">${scenario.emoji || '💬'} ${scenario.title}</div>
      <div class="csc-role">Rolün: Konuşmayı sürdür, doğal ol</div>`;
    chat.appendChild(d);
  }

  _convoNextTurn() {
    const { scenario, turnIdx, lastUserText } = this.session.convo;
    const turn = scenario.turns[turnIdx];
    if (!turn) { this._convoFinish(); return; }

    const isBot = turn.role === 'bot' || !!turn.bot;
    if (isBot) {
      let text = turn.text || turn.bot;
      let tr   = turn.tr || '';

      // If bot has variations (array), pick the most context-relevant one
      if (Array.isArray(text)) {
        text = this._getDynamicBotResponse(text, lastUserText, turn.tr);
        // tr might also be an array matching text, or we can use a generic one
        if (Array.isArray(tr)) tr = tr[text._idx] || tr[0];
      }

      const delay = Math.min(2800, 900 + text.length * 28);
      this._convoShowTyping();
      setTimeout(() => {
        this._convoHideTyping();
        this._convoAddBotBubble(text, tr);
        this.speech.speak(text, 0.88);
        this.session.convo.turnIdx++;
        setTimeout(() => this._convoNextTurn(), 500);
      }, delay);
    } else {
      const userTurns     = scenario.turns.filter(t => t.role === 'user' || t.userHint).length;
      const doneUserTurns = scenario.turns.slice(0, turnIdx).filter(t => t.role === 'user' || t.userHint).length;
      const prog = document.getElementById('cch-progress');
      if (prog) prog.textContent = `${doneUserTurns} / ${userTurns}`;
      this._convoShowUserPrompt(turn);
    }
  }

  // Simple heuristic to pick a response based on keywords in user input
  _getDynamicBotResponse(variations, userText, translations) {
    if (!userText) return variations[0];
    const ut = userText.toLowerCase();
    
    // Logic to select variation:
    // 0: Neutral/Default, 1: Positive/Agreeing, 2: Negative/Concerned/Questioning (if provided)
    let idx = 0;
    if (ut.includes('yes') || ut.includes('sure') || ut.includes('okay') || ut.includes('great')) idx = 1;
    if (ut.includes('no') || ut.includes('not') || ut.includes('sorry') || ut.includes('problem')) idx = Math.min(2, variations.length - 1);
    
    const selected = variations[idx] || variations[0];
    selected._idx = idx; // meta for translation sync
    return selected;
  }

  _convoShowTyping() {
    const chat = document.getElementById('convo-chat');
    if (!chat || document.getElementById('convo-typing')) return;
    const d = document.createElement('div');
    d.id = 'convo-typing';
    d.className = 'convo-bubble bot';
    d.innerHTML = `<div class="cb-avatar">🤖</div><div class="cb-typing"><span></span><span></span><span></span></div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  _convoHideTyping() {
    const el = document.getElementById('convo-typing');
    if (el) el.remove();
  }

  _convoAddBotBubble(text, tr) {
    const chat = document.getElementById('convo-chat');
    if (!chat) return;
    const d = document.createElement('div');
    d.className = 'convo-bubble bot';
    d.innerHTML = `
      <div class="cb-avatar">🤖</div>
      <div class="cb-content">
        <div class="cb-text">${text}</div>
        ${tr ? `<div class="cb-tr">${tr}</div>` : ''}
        <button class="cb-replay speak-btn" data-text="${text.replace(/"/g,'&quot;')}">🔊</button>
      </div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  _convoAddUserBubble(text, score) {
    const chat = document.getElementById('convo-chat');
    if (!chat) return;
    const color = score >= 80 ? 'var(--green)' : score >= 65 ? 'var(--amber)' : 'var(--rose)';
    const label = score >= 80 ? 'Harika' : score >= 65 ? 'İyi' : 'Tekrar et';
    const d = document.createElement('div');
    d.className = 'convo-bubble user';
    d.innerHTML = `
      <div class="cb-content right">
        <div class="cb-text">${text || '(sessiz)'}</div>
        <div class="cb-score" style="color:${color}">%${score} · ${label}</div>
      </div>
      <div class="cb-avatar">👤</div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  _convoShowUserPrompt(turn, isRetry = false) {
    const area = document.getElementById('convo-user-area');
    if (!area) return;
    const hint     = turn.hint || turn.userHint || '';
    const expected = turn.expected || '';
    area.innerHTML = `
      <div class="convo-prompt${isRetry ? ' retry' : ''}">
        <div class="cp-header">
          <span class="cp-icon">${isRetry ? '🔄' : '💬'}</span>
          <span class="cp-hint">${isRetry ? 'Tekrar dene: ' : ''}${hint}</span>
        </div>
        ${expected ? `<div class="cp-expected"><span class="cp-ex-label">Örnek:</span> <em>${expected}</em></div>` : ''}
        <div class="cp-mic-row">
          <button class="speak-side-btn cp-skip-btn" data-action="skip-convo-turn">⏭ Geç</button>
          <button class="convo-mic-btn" id="convo-rec-btn" data-action="toggle-convo-record">
            <span id="convo-rec-icon">🎤</span>
            <span id="convo-rec-label">Konuş</span>
          </button>
          <div class="cp-spacer"></div>
        </div>
        <div id="convo-transcript" class="cp-transcript"></div>
      </div>`;
  }

  toggleConvoRecord() {
    if (!this.speech.SpeechRecognition) { UI.toast("Ses tanıma bu tarayıcıda desteklenmiyor."); return; }
    if (this.session.isRecording) { this.speech.stopRecognition(); this._stopConvoRecord(); return; }
    const turn = this.session.convo.scenario.turns[this.session.convo.turnIdx];
    const btn = document.getElementById('convo-rec-btn');
    const icon = document.getElementById('convo-rec-icon');
    const label = document.getElementById('convo-rec-label');
    if (icon) icon.textContent = '⏹️';
    if (label) label.textContent = 'Durdur';
    if (btn) btn.classList.add('recording');
    const t = document.getElementById('convo-transcript');
    if (t) t.innerHTML = '<span class="cp-listening">🎙️ Dinliyorum…</span>';
    this.session.isRecording = true;
    this.speech.startRecognition({
      onResult:  (e) => this._handleConvoResult(e, turn),
      onError:   () => this._stopConvoRecord(),
      onEnd:     () => this._stopConvoRecord(),
      onInterim: (text) => {
        const t = document.getElementById('convo-transcript');
        if (t) t.innerHTML = `<em style="color:var(--text-2)">${text}</em>`;
      },
    });
  }

  _stopConvoRecord() {
    this.session.isRecording = false;
    const btn = document.getElementById('convo-rec-btn');
    const icon = document.getElementById('convo-rec-icon');
    const label = document.getElementById('convo-rec-label');
    if (icon) icon.textContent = '🎤';
    if (label) label.textContent = 'Konuş';
    if (btn) btn.classList.remove('recording');
  }

  _handleConvoResult(event, turn) {
    this._stopConvoRecord();
    const raw      = event.results[0][0].transcript.trim();
    const spoken   = raw.toLowerCase();
    const keywords = turn.keywords || [];
    const matched  = keywords.filter(k => spoken.includes(k.toLowerCase()));
    const score    = keywords.length
      ? Math.min(100, Math.round((matched.length / Math.max(keywords.length * 0.4, 1)) * 100))
      : 70;

    this._convoAddUserBubble(raw, score);
    this.session.convo.score += score;
    this.session.convo.total++;
    this.session.convo.lastTurnScore = score;
    (this.session.convo.turnLog = this.session.convo.turnLog || []).push({ score });

    // Show expected with keyword highlights + optional retry
    const expected = turn.expected || '';
    const area     = document.getElementById('convo-user-area');
    if (area && expected) {
      let highlighted = expected;
      keywords.forEach(k => {
        const color = matched.includes(k) ? 'var(--green)' : 'var(--rose)';
        highlighted = highlighted.replace(
          new RegExp(`\\b${k}\\b`, 'gi'),
          `<mark style="background:none;color:${color};font-weight:700">$&</mark>`
        );
      });
      const xpGain = Math.round(score / 100 * (window.remoteFlags?.xp_speaking_max ?? 80));
      area.innerHTML = `
        <div class="cp-reveal">
          <div class="cp-reveal-label">Model cevap:</div>
          <div class="cp-reveal-text">${highlighted}</div>
          ${score < 65
            ? `<button class="cp-retry-btn" data-action="convo-retry">🔄 Tekrar Dene</button>`
            : `<div class="cp-xp-chip">+${xpGain} XP</div>`
          }
        </div>`;
      // Update live XP in header — only for passing turns (keeps header in sync with final award)
      if (score >= 65) {
        this.session.convo.sessionXP = (this.session.convo.sessionXP || 0) + xpGain;
        const xpEl = document.getElementById('cch-xp');
        if (xpEl) xpEl.textContent = `${this.session.convo.sessionXP} XP`;
      }
    } else if (area) {
      area.innerHTML = '';
    }

    if (score >= 65) {
      this.session.convo.turnIdx++;
      setTimeout(() => {
        if (area) area.innerHTML = '';
        this._convoNextTurn();
      }, score < 80 ? 2500 : 1800);
    }
  }

  _convoRetry() {
    const turn = this.session.convo.scenario.turns[this.session.convo.turnIdx];
    const lastScore = this.session.convo.lastTurnScore || 0;
    this.session.convo.score -= lastScore;
    this.session.convo.total--;
    this.session.convo.turnLog.pop(); // başarısız denemeyi breakdown'dan çıkar
    this.session.convo.lastTurnScore = 0;
    this._convoShowUserPrompt(turn, true);
  }

  skipConvoTurn() {
    const turn     = this.session.convo.scenario.turns[this.session.convo.turnIdx];
    const expected = turn?.expected || turn?.hint || turn?.userHint || '';
    this._convoAddUserBubble('(atlandı)', 0);
    this.session.convo.total++;
    this.session.convo.turnIdx++;
    const area = document.getElementById('convo-user-area');
    if (area && expected) {
      area.innerHTML = `<div class="cp-reveal"><div class="cp-reveal-label">Model cevap:</div><div class="cp-reveal-text">${expected}</div></div>`;
      setTimeout(() => { if (area) area.innerHTML = ''; this._convoNextTurn(); }, 2000);
    } else {
      if (area) area.innerHTML = '';
      setTimeout(() => this._convoNextTurn(), 400);
    }
  }

  _convoFinish() {
    const { score, total, level, scenario, turnLog = [] } = this.session.convo;
    const avg = total > 0 ? Math.round(score / total) : 0;
    const xp  = Math.round(avg / 100 * (window.remoteFlags?.xp_speaking_max ?? 80));
    this.addXP(xp, 'hard');

    // Persist completion
    const completed = this.state.get('convoCompleted') || {};
    completed[scenario.id] = { avg, ts: Date.now() };
    this.state.set('convoCompleted', completed);

    // Grade
    const grade     = avg >= 90 ? 'S' : avg >= 75 ? 'A' : avg >= 55 ? 'B' : 'C';
    const gradeColor = { S:'var(--cyan)', A:'var(--green)', B:'var(--amber)', C:'var(--rose)' }[grade];
    const gradeMsg   = { S:'Mükemmel!', A:'Harika!', B:'İyi iş!', C:'Devam et!' }[grade];

    // Turn breakdown
    const turnRows = turnLog.map((t, i) => {
      const bar = Math.round(t.score / 10);
      const fill = '█'.repeat(bar) + '░'.repeat(10 - bar);
      return `<div class="cf-turn-row"><span class="cf-turn-num">${i+1}</span><span class="cf-turn-bar">${fill}</span><span class="cf-turn-pct">${t.score}%</span></div>`;
    }).join('');

    const area = document.getElementById('convo-user-area');
    const chat = document.getElementById('convo-chat');
    if (area) area.innerHTML = '';
    if (chat) {
      const d = document.createElement('div');
      d.className = 'convo-finish-card';
      d.innerHTML = `
        <div class="cf-grade-badge" style="color:${gradeColor};border-color:${gradeColor}">${grade}</div>
        <div class="cf-title">${gradeMsg}</div>
        <div class="cf-score-row">
          <div class="cf-score-val" style="color:${gradeColor}">${avg}%</div>
          <div class="cf-score-label">Ortalama Başarı</div>
        </div>
        <div class="cf-xp">+${xp} XP kazandın</div>
        ${turnRows ? `<div class="cf-turns">${turnRows}</div>` : ''}
        <div class="cf-actions">
          <button class="btn btn-primary convo-level-btn" data-level="${level}">Sonraki Senaryo →</button>
          <button class="btn btn-ghost btn-sm" data-action="render-convo-levels">Seviye Değiştir</button>
        </div>`;
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
    }
    if (avg >= 75 && typeof confetti === 'function') confetti({ particleCount: 90, spread: 65, origin: { y: 0.6 } });
  }

  // ─────────────────────────────────────────────────────────
  //  ANALYTICS MODULE
  // ─────────────────────────────────────────────────────────

  // ═══════════════════════════════════════════════════════════
  //  PLACEMENT TEST — First-time level assessment
  // ═══════════════════════════════════════════════════════════

  _initPlacement() {
    const GRAMMAR_QS = [
      { level:'A2', q:'She ___ coffee every morning.', choices:['drink','drinks','drinking','drunk'], answer:'drinks', tip:'He/She/It için fiil -s alır' },
      { level:'B1', q:'I ___ never tried sushi before.', choices:['has','have','had','having'], answer:'have', tip:'Present Perfect: I/You/We/They → have' },
      { level:'B2', q:'If she ___ harder, she would succeed.', choices:['study','studies','studied','studying'], answer:'studied', tip:'2nd Conditional: If + Past Simple' },
    ];
    const SPEAK_SENTENCE = 'I drink coffee every morning.';
    const vocabQs = this._buildPlacementVocab();
    const allQs   = [...vocabQs, ...GRAMMAR_QS];

    this.session.pl = {
      questions: allQs,
      speakSentence: SPEAK_SENTENCE,
      qIdx: 0,
      stage: 'intro',  // intro | quiz | speak | result
      levelScores: { A1:0, A2:0, B1:0, B2:0 },
      grammarCorrect: 0,
      speakScore: null,
    };
    this._renderPlacementIntro();
  }

  _buildPlacementVocab() {
    const levels = ['A1','A2','B1','B2'];
    const questions = [];
    const usedIds = new Set();
    levels.forEach(lvl => {
      const pool = WORDS.filter(w => w.level === lvl && w.tr && w.en && w.en.split(' ').length === 1);
      for (let i = 0; i < 2 && i < pool.length; i++) {
        let word;
        let attempts = 0;
        do { word = pool[Math.floor(Math.random() * pool.length)]; attempts++; }
        while (usedIds.has(word.id || word.en) && attempts < 20);
        usedIds.add(word.id || word.en);
        const wrongs = WORDS.filter(w => w !== word && w.tr && w.tr !== word.tr)
          .sort(() => Math.random() - 0.5).slice(0, 3);
        const choices = [{ text: word.tr, correct: true, ans: word.tr },
          ...wrongs.map(w => ({ text: w.tr, correct: false, ans: w.tr }))
        ].sort(() => Math.random() - 0.5);
        questions.push({ type:'vocab', level: lvl, q: word.en.toUpperCase(), choices });
      }
    });
    return questions.sort(() => Math.random() - 0.5);
  }

  _renderPlacementIntro() {
    const wrap = document.getElementById('pl-wrap');
    if (!wrap) return;
    wrap.innerHTML = `
      <div class="pl-intro">
        <div class="pl-intro-icon">🎯</div>
        <h1 class="pl-intro-title">Seviyeni Belirleyelim</h1>
        <p class="pl-intro-sub">Kısa bir test yapacağız — kelime, gramer ve konuşma.<br>Sonunda sana özel bir öğrenim planı oluşturulacak.</p>
        <div class="pl-intro-stages">
          <div class="pl-stage-item"><div class="pl-stage-icon">📚</div><div>Kelime Testi<br><small>8 soru</small></div></div>
          <div class="pl-stage-sep">→</div>
          <div class="pl-stage-item"><div class="pl-stage-icon">🧩</div><div>Gramer Testi<br><small>3 soru</small></div></div>
          <div class="pl-stage-sep">→</div>
          <div class="pl-stage-item"><div class="pl-stage-icon">🎙️</div><div>Telaffuz<br><small>1 cümle</small></div></div>
        </div>
        <button class="pl-btn-primary" onclick="window._app._placementStart()">Teste Başla →</button>
        <button class="pl-btn-skip" onclick="window._app._placementSkip()">Şimdi değil, ev ekranına git</button>
      </div>`;
  }

  _placementStart() {
    this.session.pl.stage = 'quiz';
    this.session.pl.qIdx = 0;
    this._renderPlacementQ();
  }

  _renderPlacementQ() {
    const { questions, qIdx } = this.session.pl;
    const wrap = document.getElementById('pl-wrap');
    if (!wrap || qIdx >= questions.length) { this._renderPlacementSpeak(); return; }
    const q      = questions[qIdx];
    const total  = questions.length;
    const pct    = Math.round((qIdx / total) * 100);
    const isGram = !q.type;
    const stageLabel = isGram ? '🧩 Gramer' : '📚 Kelime';
    const levelTag   = { A1:'Başlangıç', A2:'Temel', B1:'Orta', B2:'Orta Üstü' }[q.level] || q.level;
    wrap.innerHTML = `
      <div class="pl-quiz">
        <div class="pl-progress-bar"><div class="pl-progress-fill" style="width:${pct}%"></div></div>
        <div class="pl-q-meta">
          <span class="pl-stage-tag">${stageLabel}</span>
          <span class="pl-q-count">${qIdx + 1} / ${total}</span>
          <span class="pl-level-tag">${levelTag}</span>
        </div>
        <div class="pl-question-card" id="pl-qcard">
          <div class="pl-q-text">${q.q}</div>
          ${!isGram ? '<div class="pl-q-hint">Bu kelime Türkçede ne demek?</div>' : ''}
        </div>
        <div class="pl-choices" id="pl-choices">
          ${q.choices.map((c, i) => `
            <button class="pl-choice" data-correct="${c.correct}" data-level="${q.level}"
              onclick="window._app._placementAnswer(this, ${c.correct}, '${q.level}')">
              ${c.text || c}
            </button>`).join('')}
        </div>
        ${isGram && q.tip ? `<div class="pl-tip" id="pl-tip" style="display:none">💡 ${q.tip}</div>` : ''}
      </div>`;
  }

  _placementAnswer(btn, isCorrect, level) {
    // Disable all buttons
    document.querySelectorAll('.pl-choice').forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
    btn.classList.add(isCorrect ? 'pl-correct' : 'pl-wrong');
    // Show correct if wrong
    if (!isCorrect) {
      document.querySelectorAll('.pl-choice[data-correct="true"]').forEach(b => b.classList.add('pl-correct'));
    }
    // Show tip for grammar
    const tip = document.getElementById('pl-tip');
    if (tip) tip.style.display = 'block';
    // Update scores
    if (isCorrect) {
      if (this.session.pl.levelScores[level] !== undefined) this.session.pl.levelScores[level]++;
      else this.session.pl.grammarCorrect++;
    }
    const q = this.session.pl.questions[this.session.pl.qIdx];
    if (!q.type && isCorrect) this.session.pl.grammarCorrect++; // grammar question
    this.audio.play(isCorrect ? 'success' : 'click');
    setTimeout(() => {
      this.session.pl.qIdx++;
      this._renderPlacementQ();
    }, 900);
  }

  _renderPlacementSpeak() {
    this.session.pl.stage = 'speak';
    const sentence = this.session.pl.speakSentence;
    const wrap = document.getElementById('pl-wrap');
    if (!wrap) return;
    wrap.innerHTML = `
      <div class="pl-speak">
        <div class="pl-speak-icon">🎙️</div>
        <h2 class="pl-speak-title">Şimdi Bu Cümleyi Söyle</h2>
        <div class="pl-speak-sentence">"${sentence}"</div>
        <div class="pl-speak-status" id="pl-speak-status">Hazır olunca mikrofona bas</div>
        <button class="pl-btn-mic" id="pl-btn-mic" onclick="window._app._placementStartSpeak()">🎤 Başla</button>
        <button class="pl-btn-skip" onclick="window._app._placementShowResult(null)">Bu adımı atla</button>
      </div>`;
  }

  _placementStartSpeak() {
    const sentence = this.session.pl.speakSentence;
    const statusEl = document.getElementById('pl-speak-status');
    const micBtn   = document.getElementById('pl-btn-mic');
    if (statusEl) statusEl.textContent = '🔴 Dinleniyor...';
    if (micBtn)   { micBtn.textContent = '…'; micBtn.disabled = true; }

    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = this.state.get('accent') || 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = e => {
      const spoken = e.results[0][0].transcript.toLowerCase().replace(/[^a-z ]/g,'');
      const target = sentence.toLowerCase().replace(/[^a-z ]/g,'');
      const tW = target.split(' ').filter(Boolean);
      const sW = spoken.split(' ').filter(Boolean);
      const matched = tW.filter(tw => sW.some(sw => sw === tw || this._levenshtein(sw,tw) <= 1)).length;
      const score = Math.round((matched / tW.length) * 100);
      this._placementShowResult(score);
    };
    rec.onerror = () => this._placementShowResult(null);
    rec.onend = () => {};
    rec.start();
  }

  _placementShowResult(speakScore) {
    this.session.pl.speakScore = speakScore;
    const { levelScores, grammarCorrect } = this.session.pl;

    // Determine CEFR level
    const LEVELS = ['A1','A2','B1','B2'];
    let level = 'A1';
    if ((levelScores.A1 || 0) >= 1) level = 'A2';
    if ((levelScores.A2 || 0) >= 1) level = 'B1';
    if ((levelScores.B1 || 0) >= 2) level = 'B2';
    if ((levelScores.B2 || 0) >= 2) level = 'C1';
    // Grammar bonus
    if (grammarCorrect >= 3 && LEVELS.indexOf(level) < LEVELS.indexOf('B2')) level = 'B1';
    if (grammarCorrect === 3 && level === 'B1') level = 'B2';

    // Determine recommended mode
    let mode = 'balanced';
    let modeReason = 'Her beceriden dengeli pratik yaparsın';
    if (speakScore !== null && speakScore < 60) {
      mode = 'speaking'; modeReason = 'Telaffuz pratiğine öncelik verelim';
    } else if (grammarCorrect >= 3) {
      mode = 'grammar'; modeReason = 'Gramer yapılarını pekiştirmeye odaklanıyoruz';
    } else if ((levelScores.B1 || 0) + (levelScores.B2 || 0) === 0) {
      mode = 'intensive'; modeReason = 'Kelime dağarcığını hızla genişletelim';
    }

    const CEFR_LABELS = { A1:'Başlangıç', A2:'Temel', B1:'Orta', B2:'Orta Üstü', C1:'İleri', C2:'Uzman' };
    const CEFR_COLORS = { A1:'#10b981', A2:'#4ade80', B1:'#00d4ff', B2:'#6366f1', C1:'#7c3aed', C2:'#f43f5e' };
    const MODE_ICONS  = { balanced:'⚖️', intensive:'🔥', speaking:'🎙️', grammar:'🧩' };
    const MODE_NAMES  = { balanced:'Dengeli', intensive:'Yoğun Kelime', speaking:'Konuşma', grammar:'Gramer' };

    const wrap = document.getElementById('pl-wrap');
    if (!wrap) return;
    wrap.innerHTML = `
      <div class="pl-result">
        <div class="pl-result-burst"></div>
        <div class="pl-result-badge" style="color:${CEFR_COLORS[level] || '#00d4ff'}">${level}</div>
        <div class="pl-result-label">${CEFR_LABELS[level] || level} Seviyesi</div>
        <div class="pl-result-desc">Testin tamamlandı! İşte sana özel plan:</div>

        <div class="pl-result-cards">
          <div class="pl-result-card">
            <div class="pl-rc-icon">${MODE_ICONS[mode]}</div>
            <div class="pl-rc-name">Önerilen Mod</div>
            <div class="pl-rc-val">${MODE_NAMES[mode]}</div>
            <div class="pl-rc-why">${modeReason}</div>
          </div>
          ${speakScore !== null ? `
          <div class="pl-result-card">
            <div class="pl-rc-icon">🎙️</div>
            <div class="pl-rc-name">Telaffuz Skoru</div>
            <div class="pl-rc-val">${speakScore}%</div>
            <div class="pl-rc-why">${speakScore >= 80 ? 'Harika telaffuz!' : speakScore >= 60 ? 'Gelişiyor' : 'Çalışmaya devam'}</div>
          </div>` : ''}
          <div class="pl-result-card">
            <div class="pl-rc-icon">📚</div>
            <div class="pl-rc-name">Kelime Skoru</div>
            <div class="pl-rc-val">${Object.values(levelScores).reduce((a,b)=>a+b,0)} / ${Object.keys(levelScores).length * 2}</div>
            <div class="pl-rc-why">${level} kelimelerinde iyi durumdasın</div>
          </div>
        </div>

        <button class="pl-btn-primary pl-btn-start" onclick="window._app._placementFinish('${level}','${mode}')">
          🚀 Öğrenmeye Başla!
        </button>
        <div class="pl-result-note">Bu ayarlar istediğin zaman Analitik sayfasından değiştirilebilir.</div>
      </div>`;

    // Confetti!
    if (typeof confetti === 'function') confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: [CEFR_COLORS[level], '#00d4ff', '#7c3aed'] });
  }

  _placementFinish(level, mode) {
    // Save results to state
    this.state.update({ onboarded: true, learningMode: mode });
    // Pre-seed mastery bias toward detected level so app starts at right level
    const bias = { A1:'A1', A2:'A1', B1:'A2', B2:'B1', C1:'B2' }[level] || 'A1';
    // Navigate home with mode active
    this.navigate('home');
  }

  _placementSkip() {
    this.state.update({ onboarded: true });
    this.navigate('home');
  }

  _initAnalytics() {
    const mastery  = this.state.get('mastery');
    const learned  = Object.values(mastery).filter(m => (m.score || 0) >= 3).length;
    const streak   = this.state.get('streak');
    const total    = this.state.get('totalAttempts');
    const correct  = this.state.get('totalCorrect');
    const acc      = total > 0 ? Math.round((correct / total) * 100) : 0;
    const due      = SRS.getDue(WORDS, mastery);

    UI.setEl('an-words', learned);
    UI.setEl('an-streak', streak);
    UI.setEl('an-acc', `${acc}%`);
    UI.setEl('an-due', due.length);

    this._renderAnHero(mastery);
    this._renderModeSelector();
    this._renderGoalSelector();
    this._renderRecommendation(mastery, due.length);
    this._renderLevelRoadmap(mastery);
    this._renderWeakSpots(mastery);
    this._renderHeatmap();
    this._renderCategoryChart();
    this._renderCefrChart();
    this._renderWeeklyChart();
    this._renderBadges();
  }

  _detectCefrLevel(mastery) {
    const levels = ['A1','A2','B1','B2','C1','C2'];
    let current = 'A1';
    for (const lvl of levels) {
      const pool = WORDS.filter(w => w.level === lvl);
      if (!pool.length) continue;
      const pct = pool.filter(w => (mastery[w.id||w.en]?.score||0) >= 3).length / pool.length;
      if (pct >= 0.7) current = lvl;
    }
    const idx  = levels.indexOf(current);
    const next = levels[idx + 1] || 'C2';
    const nextPool = WORDS.filter(w => w.level === next);
    const nextPct  = nextPool.length
      ? Math.round(nextPool.filter(w => (mastery[w.id||w.en]?.score||0) >= 3).length / nextPool.length * 100)
      : 100;
    return { level: current, next, nextPct, idx };
  }

  _renderAnHero(mastery) {
    // Inject SVG gradient defs once
    if (!document.getElementById('an-svg-defs')) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg','svg');
      defs.id = 'an-svg-defs';
      defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      defs.innerHTML = `<defs><linearGradient id="an-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#00d4ff"/></linearGradient></defs>`;
      document.body.appendChild(defs);
    }
    const CEFR_LABELS = { A1:'Başlangıç', A2:'Temel', B1:'Orta', B2:'Orta Üstü', C1:'İleri', C2:'Uzman' };
    const { level, next, nextPct } = this._detectCefrLevel(mastery);
    const badge = document.getElementById('an-hero-badge');
    const cefrEl = document.getElementById('an-hero-cefr');
    const nextEl = document.getElementById('an-hero-next');
    const nextPctEl = document.getElementById('an-next-pct');
    const arc = document.getElementById('an-arc-prog');
    if (badge)   badge.textContent = level;
    if (cefrEl)  cefrEl.textContent = `${level} — ${CEFR_LABELS[level] || ''}`;
    if (nextEl)  nextEl.innerHTML   = next !== level ? `${next}'ye <strong id="an-next-pct">${nextPct}%</strong> tamamlandı` : '🏆 En yüksek seviye!';
    if (arc) {
      const circ = 2 * Math.PI * 58;
      arc.style.strokeDasharray = circ;
      arc.style.strokeDashoffset = circ; // start at 0
      setTimeout(() => { arc.style.strokeDashoffset = circ - (circ * nextPct / 100); }, 300);
    }
    // Color badge by level
    const CEFR_COLORS = { A1:'#10b981', A2:'#4ade80', B1:'#00d4ff', B2:'#6366f1', C1:'#7c3aed', C2:'#f43f5e' };
    if (badge) badge.style.color = CEFR_COLORS[level] || '#00d4ff';
  }

  _renderModeSelector() {
    const mode  = this.state.get('learningMode') || 'balanced';
    document.querySelectorAll('.an-mode-card').forEach(card => {
      card.classList.toggle('active', card.dataset.mode === mode);
    });
  }

  _renderGoalSelector() {
    const goal = this.state.get('learningGoal') || 'general';
    document.querySelectorAll('.an-goal-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.goal === goal);
    });
  }

  setLearningMode(mode, el) {
    this.state.update({ learningMode: mode });
    document.querySelectorAll('.an-mode-card').forEach(c => c.classList.remove('active'));
    if (el) el.classList.add('active');
    // Ripple feedback
    el?.classList.add('mode-pulse');
    setTimeout(() => el?.classList.remove('mode-pulse'), 600);
    // Re-render recommendation with new mode
    const mastery = this.state.get('mastery');
    const due     = SRS.getDue(WORDS, mastery);
    this._renderRecommendation(mastery, due.length);
    this.audio.play('click');
  }

  setLearningGoal(goal, el) {
    this.state.update({ learningGoal: goal });
    document.querySelectorAll('.an-goal-pill').forEach(p => p.classList.remove('active'));
    if (el) el.classList.add('active');
    const mastery = this.state.get('mastery');
    const due     = SRS.getDue(WORDS, mastery);
    this._renderRecommendation(mastery, due.length);
    this.audio.play('click');
  }

  _renderRecommendation(mastery, dueCount) {
    const mode   = this.state.get('learningMode') || 'balanced';
    const goal   = this.state.get('learningGoal') || 'general';
    const { level } = this._detectCefrLevel(mastery);
    const speakAvg = this.state.get('speakTotal') > 0
      ? Math.round(this.state.get('speakSum') / this.state.get('speakTotal'))
      : 0;

    const GOAL_LABELS = { general:'Genel İngilizce', travel:'Seyahat', business:'İş Hayatı', academic:'Akademik' };

    const subEl  = document.getElementById('an-rec-sub');
    const taskEl = document.getElementById('an-rec-tasks');
    if (!taskEl) return;
    if (subEl) subEl.textContent = `${level} seviye · ${GOAL_LABELS[goal]} · ${mode === 'balanced' ? 'Dengeli' : mode === 'intensive' ? 'Yoğun Kelime' : mode === 'speaking' ? 'Konuşma' : 'Gramer'} modu`;

    const tasks = [];

    if (mode === 'intensive') {
      tasks.push({ icon:'📚', text:`${dueCount} tekrar bekliyor — şimdi bitir`, nav:'learn', btn:'Kelime Çalış' });
      tasks.push({ icon:'🔥', text:'Bugün 20 yeni kelime öğren',               nav:'learn', btn:'Başla' });
      if (speakAvg < 70) tasks.push({ icon:'💡', text:'Telaffuz puanın düşük — biraz konuşma pratiği yap', nav:'speak', btn:'Konuşma Lab' });
    } else if (mode === 'speaking') {
      tasks.push({ icon:'🎙️', text:'3 farklı zorlukta cümle sesli söyle',     nav:'speak', btn:'Konuşma Lab' });
      tasks.push({ icon:'🤖', text:'AI Koç hatalarını analiz etsin',           nav:'speak', btn:'Koça Git' });
      if (dueCount > 5) tasks.push({ icon:'📚', text:`${dueCount} kelime tekrarı bekleniyor`, nav:'learn', btn:'Tekrar Et' });
    } else if (mode === 'grammar') {
      tasks.push({ icon:'🧩', text:'5 Nexus gramer oyunu oyna',                nav:'nexus',   btn:'Nexus Oyna' });
      tasks.push({ icon:'📖', text:'Bağlam okuma — yapı analizi yap',          nav:'reading', btn:'Okumaya Geç' });
      if (dueCount > 0) tasks.push({ icon:'📚', text:`${dueCount} kelime tekrarı`, nav:'learn', btn:'Tekrar' });
    } else {
      // balanced — tailor by level
      if (dueCount > 0) tasks.push({ icon:'📚', text:`${dueCount} kelime seni bekliyor — SRS zamanı`, nav:'learn', btn:'Tekrar Et' });
      tasks.push({ icon:'🎙️', text:'Günlük konuşma: 1 cümle sesli söyle',     nav:'speak', btn:'Konuşma Lab' });
      tasks.push({ icon:'🧩', text:'3 Nexus gramer oyunu',                     nav:'nexus', btn:'Oyna' });
      if (level === 'A1' || level === 'A2') {
        tasks.push({ icon:'💡', text:'A1-A2 kelimelerine odaklan — temel sağlam olsun', nav:'learn', btn:'A1-A2 Kelimeler' });
      }
    }

    taskEl.innerHTML = tasks.map(t => `
      <div class="an-rec-task">
        <div class="an-rec-task-icon">${t.icon}</div>
        <div class="an-rec-task-text">${t.text}</div>
        <button class="an-rec-task-btn" onclick="window._app.navigate('${t.nav}')">${t.btn}</button>
      </div>`).join('');
  }

  _renderLevelRoadmap(mastery) {
    const el = document.getElementById('an-roadmap');
    if (!el) return;
    const levels = ['A1','A2','B1','B2','C1','C2'];
    const LABELS = { A1:'Başlangıç', A2:'Temel', B1:'Orta', B2:'Orta Üstü', C1:'İleri', C2:'Uzman' };
    const COLORS = { A1:'#10b981', A2:'#4ade80', B1:'#00d4ff', B2:'#6366f1', C1:'#7c3aed', C2:'#f43f5e' };
    const { level: curLevel } = this._detectCefrLevel(mastery);

    el.innerHTML = levels.map((lvl, i) => {
      const pool    = WORDS.filter(w => w.level === lvl);
      const mastered = pool.filter(w => (mastery[w.id||w.en]?.score||0) >= 3).length;
      const pct      = pool.length ? Math.round(mastered / pool.length * 100) : 0;
      const isCurrent = lvl === curLevel;
      const isDone    = pct >= 70 && levels.indexOf(lvl) < levels.indexOf(curLevel);
      const isLocked  = levels.indexOf(lvl) > levels.indexOf(curLevel) + 1;
      return `
        <div class="an-rm-node ${isCurrent ? 'current' : isDone ? 'done' : isLocked ? 'locked' : ''}">
          <div class="an-rm-dot" style="--node-color:${COLORS[lvl]}">
            ${isDone ? '✓' : isCurrent ? '★' : lvl}
          </div>
          <div class="an-rm-info">
            <div class="an-rm-level">${lvl}</div>
            <div class="an-rm-label">${LABELS[lvl]}</div>
            <div class="an-rm-bar-wrap"><div class="an-rm-bar" style="width:${pct}%;background:${COLORS[lvl]}"></div></div>
            <div class="an-rm-pct">${pct}%</div>
          </div>
        </div>
        ${i < levels.length - 1 ? '<div class="an-rm-line"></div>' : ''}`;
    }).join('');
  }

  _renderWeakSpots(mastery) {
    const el = document.getElementById('an-weak-list');
    if (!el) return;
    // Words seen but with low mastery score
    const weak = WORDS
      .filter(w => mastery[w.id||w.en] && (mastery[w.id||w.en].score || 0) < 3)
      .sort((a, b) => (mastery[a.id||a.en]?.score||0) - (mastery[b.id||b.en]?.score||0))
      .slice(0, 8);
    if (!weak.length) {
      el.innerHTML = '<div class="an-weak-empty">🎉 Harika! Gördüğün tüm kelimeleri iyi biliyorsun.</div>';
      return;
    }
    el.innerHTML = weak.map(w => {
      const sc = mastery[w.id||w.en]?.score || 0;
      const bars = [1,2,3,4,5].map(i => `<div class="an-weak-dot ${i <= sc ? 'fill' : ''}"></div>`).join('');
      return `
        <div class="an-weak-chip" onclick="window._app.speech.speak('${w.en.replace(/'/g,"\\'")}',1)">
          <div class="an-weak-en">${w.en}</div>
          <div class="an-weak-tr">${w.tr || ''}</div>
          <div class="an-weak-score">${bars}</div>
        </div>`;
    }).join('');
  }

  _renderBadges() {
    const el = document.getElementById('badges-grid');
    if (!el || typeof ACHIEVEMENTS_DATA === 'undefined') return;
    const unlocked = this.state.get('achievements') || [];
    el.innerHTML = ACHIEVEMENTS_DATA.map(ach => {
      const isUnlocked = unlocked.includes(ach.id);
      return `<div class="badge-card ${isUnlocked ? 'unlocked' : ''}"><div class="badge-icon">${ach.icon}</div><div class="badge-title">${ach.title}</div><div class="badge-desc">${ach.desc}</div></div>`;
    }).join('');
  }

  _renderHeatmap() {
    const el = document.getElementById('heatmap-grid');
    if (!el) return;
    const hist = this.state.get('history');
    let html = '';
    for (let i = 90; i >= 0; i--) {
      const d   = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split('T')[0];
      const xp  = hist[key] || 0;
      const cls = xp > 500 ? 'l3' : xp > 150 ? 'l2' : xp > 0 ? 'l1' : '';
      const label = d.toLocaleDateString('tr-TR', { day:'numeric', month:'short' });
      html += `<div class="hm-cell ${cls}" data-tip="${label}: ${xp} XP"></div>`;
    }
    el.innerHTML = html;
  }

  _renderCategoryChart() {
    const ctx = document.getElementById('cat-chart');
    if (!ctx || typeof Chart === 'undefined') return;
    const mastery = this.state.get('mastery');
    const cats    = [...new Set(WORDS.map(w => w.cat))];
    const data    = cats.map(c => { const pool = WORDS.filter(w => w.cat === c); return Math.round((pool.filter(w => (mastery[w.id||w.en]?.score||0) >= 3).length / pool.length) * 100); });
    try {
      new Chart(ctx, { type: 'radar', data: { labels: cats, datasets: [{ label: 'Ustalık %', data, backgroundColor: 'rgba(0,212,255,0.15)', borderColor: '#00d4ff', pointBackgroundColor: '#00d4ff', pointRadius: 3 }]}, options: { scales: { r: { beginAtZero:true, max:100, grid: { color:'rgba(255,255,255,0.07)' }, angleLines: { color:'rgba(255,255,255,0.07)' }, ticks: { color:'#4a5568', backdropColor:'transparent', font:{size:10} }, pointLabels:{ color:'#8b9cb8', font:{size:11} }}}, plugins: { legend:{display:false} } }});
    } catch {}
  }

  _renderCefrChart() {
    const ctx = document.getElementById('cefr-chart');
    if (!ctx || typeof Chart === 'undefined') return;
    const levels  = ['A1','A2','B1','B2','C1','C2'];
    const mastery = this.state.get('mastery');
    const data    = levels.map(lvl => { const pool = WORDS.filter(w => w.level === lvl); return pool.length ? Math.round((pool.filter(w => (mastery[w.id||w.en]?.score||0) >= 3).length / pool.length) * 100) : 0; });
    const colors  = ['#10b981','#4ade80','#00d4ff','#6366f1','#7c3aed','#f43f5e'];
    try {
      new Chart(ctx, { type: 'bar', data: { labels: levels, datasets: [{ label: 'Ustalık %', data, backgroundColor: colors, borderRadius: 6, borderSkipped: false }]}, options: { scales: { y: { beginAtZero:true, max:100, grid:{color:'rgba(255,255,255,0.06)'}, ticks:{color:'#4a5568'} }, x: { grid:{display:false}, ticks:{color:'#8b9cb8'} }}, plugins: { legend:{display:false} } }});
    } catch {}
  }

  _renderWeeklyChart() {
    const ctx = document.getElementById('week-chart');
    if (!ctx || typeof Chart === 'undefined') return;
    const hist   = this.state.get('history') || {};
    const labels = [];
    const data   = [];
    for (let i = 6; i >= 0; i--) {
      const d   = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split('T')[0];
      labels.push(d.toLocaleDateString('tr-TR', { weekday:'short' }));
      data.push(hist[key] || 0);
    }
    try {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label:'XP', data,
            backgroundColor: data.map((_, i) => i === 6 ? '#00d4ff' : 'rgba(0,212,255,0.25)'),
            borderRadius: 6, borderSkipped: false }]
        },
        options: {
          scales: {
            y: { beginAtZero:true, grid:{color:'rgba(255,255,255,0.06)'}, ticks:{color:'#4a5568'} },
            x: { grid:{display:false}, ticks:{color:'#8b9cb8'} }
          },
          plugins: { legend:{display:false} }
        }
      });
    } catch {}
  }

  // ─────────────────────────────────────────────────────────
  //  THEME SYSTEM
  // ─────────────────────────────────────────────────────────

  _THEMES = [
    { id: 'nebula',   icon: '🌌', name: 'Nebula',   desc: 'Kozmik karanlık — derin uzay',     starColor: '#00d4ff' },
    { id: 'magma',    icon: '🌋', name: 'Magma',    desc: 'Volkanik derinlik — kor kırmızı',  starColor: '#ef4444' },
  ];

  _initTheme() {
    const saved = localStorage.getItem('er-theme') || 'nebula';
    this.setTheme(saved, true);
  }

  setTheme(id, silent = false) {
    const valid = ['nebula','magma'];
    if (!valid.includes(id)) id = 'nebula';
    document.body.classList.remove(...valid.map(t => `theme-${t}`));
    if (id !== 'nebula') document.body.classList.add(`theme-${id}`);
    else document.body.classList.add('theme-nebula');
    localStorage.setItem('er-theme', id);
    this._currentTheme = id;
    // Update canvas star color
    const theme = this._THEMES.find(t => t.id === id);
    if (theme) this._canvasStarColor = theme.starColor;
    // Close picker if open
    if (!silent) {
      document.getElementById('theme-picker-overlay')?.remove();
    }
  }

  openThemePicker() {
    document.getElementById('theme-picker-overlay')?.remove();
    const current = this._currentTheme || 'nebula';
    const cards = this._THEMES.map(t => `
      <div class="tp-card tp-${t.id} ${current === t.id ? 'active' : ''} theme-pick-btn" data-theme-id="${t.id}">
        <div class="tp-check">✓</div>
        <div class="tp-card-icon">${t.icon}</div>
        <div class="tp-card-name">${t.name}</div>
        <div class="tp-card-desc">${t.desc}</div>
        <div class="tp-swatches">
          ${this._themeSwatches(t.id)}
        </div>
      </div>`).join('');

    const overlay = document.createElement('div');
    overlay.id = 'theme-picker-overlay';
    overlay.className = 'theme-picker-overlay';
    overlay.innerHTML = `
      <div class="theme-picker-panel">
        <div class="tp-header">
          <div>
            <div class="tp-title">Tema Seç</div>
            <div class="tp-subtitle">2 tema — koyu karanlık</div>
          </div>
          <button class="tp-close" data-action="close-theme-picker">✕</button>
        </div>
        <div class="tp-grid">${cards}</div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  _refreshPickerActive(id) {
    document.querySelectorAll('.tp-card').forEach(c => c.classList.remove('active'));
    document.querySelector(`.tp-${id}`)?.classList.add('active');
  }

  _themeSwatches(id) {
    const map = {
      nebula:   ['#00d4ff','#7c3aed','#f59e0b','#10b981'],
      magma:    ['#ef4444','#f97316','#fbbf24','#22c55e'],
    };
    return (map[id] || map.nebula).map(c =>
      `<div class="tp-swatch" style="background:${c}"></div>`
    ).join('');
  }

  // ─────────────────────────────────────────────────────────
  //  CANVAS BACKGROUND
  // ─────────────────────────────────────────────────────────

  _initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const stars = Array.from({length:160}, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, s: Math.random() * 1.8, v: Math.random() * 0.4 + 0.08 }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const level = this.state.get('level');
      const speedMult = 1 + level * 0.035;
      // Use theme star color if set, else level-based palette
      const levelPalettes = ['#00d4ff','#10b981','#f59e0b','#7c3aed','#f43f5e','#ff9d00'];
      const tier = Math.min(Math.floor((level - 1) / 5) + 1, 6);
      ctx.fillStyle = this._canvasStarColor || levelPalettes[tier - 1] || '#00d4ff';
      ctx.globalAlpha = 0.45;

      stars.forEach(star => {
        star.y -= star.v * speedMult;
        if (star.y < 0) { star.y = canvas.height; star.x = Math.random() * canvas.width; }
        ctx.beginPath(); 
        ctx.arc(star.x, star.y, star.s, 0, Math.PI * 2); 
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }

  _bindGlobalEvents() {
    // ── Sidebar hover-to-open / leave-to-close ─────────────
    const sidebar   = document.querySelector('.sidebar');
    const sidebarTab = document.getElementById('sidebar-tab');
    let   sidebarCloseTimer = null;

    const openSidebar = () => {
      clearTimeout(sidebarCloseTimer);
      document.body.classList.remove('sidebar-closed');
    };
    const closeSidebar = (delay = 400) => {
      clearTimeout(sidebarCloseTimer);
      sidebarCloseTimer = setTimeout(() => {
        document.body.classList.add('sidebar-closed');
      }, delay);
    };

    // Open when mouse is within 8px of left edge; close when clearly outside sidebar
    document.addEventListener('mousemove', e => {
      if (document.body.classList.contains('sidebar-closed')) {
        if (e.clientX <= 8) openSidebar();
      } else {
        const sidebarWidth = sidebar ? sidebar.offsetWidth : 220;
        if (e.clientX > sidebarWidth + 16) {
          closeSidebar();
        } else {
          clearTimeout(sidebarCloseTimer);
        }
      }
    });

    // Click on tab also opens sidebar
    if (sidebarTab) {
      sidebarTab.addEventListener('click', openSidebar);
    }

    // Start with sidebar closed
    document.body.classList.add('sidebar-closed');

    window.addEventListener('beforeunload', () => {
      if (window.authManager && window.authManager.isLoggedIn && this.cloudLoaded) {
        window.authManager.saveToCloud(this.state._state, true);
      }
    });

    // Delegated handler for data-action attributes (replaces inline onclick handlers in HTML)
    document.addEventListener('click', e => {
      const actionEl = e.target.closest('[data-action]');
      if (actionEl) {
        const action = actionEl.dataset.action;
        switch (action) {
          case 'navigate':          this.navigate(actionEl.dataset.target); return;
          case 'auth-open':         if (window.authUI) authUI.open(); return;
          case 'open-theme-picker': this.openThemePicker(); return;
          case 'toggle-focus-mode': this.toggleFocusMode(); return;
          case 'auth-modal-backdrop': if (e.target === actionEl && window.authManager?.isLoggedIn && window.authUI) authUI.close(); return;
          case 'auth-switch-tab':   if (window.authUI) authUI.switchTab(actionEl.dataset.tab); return;
          case 'auth-show-reset':   if (window.authUI) authUI.showReset(); return;
          case 'auth-google':       if (window.authUI) authUI.submitGoogle(); return;
          case 'auth-logout':       if (window.authManager) authManager.logout(); return;
          case 'set-accent':        this.setAccent(actionEl.dataset.accent); return;
          case 'wod-speak':         this.speakWord(document.getElementById('wod-word')?.textContent || ''); return;
          case 'set-synth-mode':    this._setSynthMode(actionEl.dataset.mode, actionEl); return;
          case 'set-synth-len':     this._setSynthLen(parseInt(actionEl.dataset.len), actionEl); return;
          case 'set-synth-cefr':    this._setSynthCEFR(actionEl.dataset.cefr, actionEl); return;
          case 'start-synesthesia': this.startSynesthesia(); return;

          case 'resume-synesthesia':this.resumeSynesthesia(); return;
          case 'pause-synesthesia': this._pauseSynesthesia(); return;
          case 'play-synth-hint':   this.playSynthHint(); return;
          case 'skip-synth-word':   this.skipSynthWord(); return;
          case 'set-reading-mode':  this.setReadingMode(actionEl.dataset.mode); return;
          case 'play-story':        this.playStory(); return;
          case 'set-reading-level': this.setReadingLevel(actionEl.dataset.level, actionEl); return;
          case 'toggle-shuffle':    this.toggleShuffle(actionEl); return;
          case 'set-speak-mode':    this.setSpeakMode(actionEl.dataset.mode, actionEl); return;
          case 'set-speak-diff':    this.setSpeakDiff(actionEl.dataset.diff, actionEl); return;
          case 'next-speak':        this.nextSpeak(); return;
          case 'speak-sentence':    this.speakSentence(); return;
          case 'speak-sentence-slow': this.speakSentence(0.55); return;
          case 'toggle-record':     this.toggleRecord(); return;
          case 'play-last-recording': this.playLastRecording(); return;
          case 'retry-speak':           this.retrySpeak(); return;
          case 'prev-story':            this._prevStory(); return;
          case 'next-story':            this._nextStory(); return;
          case 'select-blank':          this._selectBlank(actionEl); return;
          case 'render-convo-levels':   this._renderConvoLevels(); return;
          case 'skip-convo-turn':       this.skipConvoTurn(); return;
          case 'toggle-convo-record':   this.toggleConvoRecord(); return;
          case 'convo-retry':           this._convoRetry(); return;
          case 'close-theme-picker':    { const _tpo = document.getElementById('theme-picker-overlay'); if (_tpo) _tpo.remove(); } return;
        }
      }
    });

    // Delegated handler for data-action form submits
    document.addEventListener('submit', e => {
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;
      e.preventDefault();
      const action = actionEl.dataset.action;
      switch (action) {
        case 'auth-submit-login':  if (window.authUI) authUI.submitLogin(); break;
        case 'auth-submit-signup': if (window.authUI) authUI.submitSignup(); break;
        case 'auth-submit-reset':  if (window.authUI) authUI.submitReset(); break;
      }
    });

    // Delegated handler for data-action change events (checkboxes)
    document.addEventListener('change', e => {
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;
      const action = actionEl.dataset.action;
      switch (action) {
        case 'toggle-shadow-mode':  this.toggleShadowMode(actionEl.checked); break;
        case 'toggle-shuffle-mode': this.toggleShuffleMode(actionEl.checked); break;
        case 'toggle-auto-advance': this.state.set('autoAdvance', actionEl.checked); break;
      }
    });

    document.addEventListener('click', e => {
      const navItem = e.target.closest('.nav-item, .m-nav-item');
      if (navItem) { this.navigate(navItem.dataset.target); return; }

      // Delegated: speak button (cb-replay, speak-btn class)
      const speakBtn = e.target.closest('.speak-btn');
      if (speakBtn) { app.speech.speak(speakBtn.dataset.text, 0.88); return; }

      // Delegated: v2 reading annotations
      const swV2 = e.target.closest('.sw-v2');
      if (swV2) {
        const annId = swV2.dataset.annId;
        const level = app.state.get('readingLevel');
        const storyIdx = app._getStoryIndex();
        const stories = STORIES.filter(s => s.level === level);
        const story = stories[storyIdx];
        if (story && story.annotations && story.annotations[annId]) {
          app.readingEngine.handleAnnotationClick(story.annotations[annId], swV2, e);
        }
        return;
      }

      // Delegated: word/phrase click targets (story-vocab, sw spans)
      const storyVocab = e.target.closest('.story-vocab');
      if (storyVocab) { app._showWordDef(storyVocab.dataset.en, e); return; }

      // Delegated: cloze option buttons
      const clozeOpt = e.target.closest('.cloze-opt');
      if (clozeOpt) { app._fillBlank(clozeOpt.dataset.word, clozeOpt); return; }

      // Delegated: word-click targets in _markupText (speak/reading sections)
      const wordClickTarget = e.target.closest('.word-click-target');
      if (wordClickTarget) { app._handleWordClick(wordClickTarget.dataset.word, wordClickTarget, e); return; }

      // Delegated: speak-word buttons (wb-chip, ipa-hint-chip, popup speak)
      const speakWordBtn = e.target.closest('.speak-word-btn');
      if (speakWordBtn) { app.speakWord(speakWordBtn.dataset.word); return; }

      // Delegated: conversation level buttons
      const convoLevelBtn = e.target.closest('.convo-level-btn');
      if (convoLevelBtn) { app.startConvoByLevel(convoLevelBtn.dataset.level); return; }

      // Delegated: theme picker cards
      const themePickBtn = e.target.closest('.theme-pick-btn');
      if (themePickBtn) { app.setTheme(themePickBtn.dataset.themeId); app._refreshPickerActive(themePickBtn.dataset.themeId); return; }

      // Delegated: synth keyboard keys
      const synthKeyBtn = e.target.closest('.synth-key-btn');
      if (synthKeyBtn) { app._handleSynthKey(synthKeyBtn.dataset.key); return; }

      // Delegated: synth choice buttons
      const synthChoiceBtn = e.target.closest('.synth-choice-btn');
      if (synthChoiceBtn) { app._handleChoiceSelect(synthChoiceBtn.dataset.oid, synthChoiceBtn.dataset.cid, synthChoiceBtn); return; }

      // Delegated: mastery add-from-dict buttons
      const masteryAddBtn = e.target.closest('.mastery-add-btn');
      if (masteryAddBtn) { app._addToMasteryFromDict(masteryAddBtn.dataset.wordId, masteryAddBtn); return; }

      if (e.target.closest('button, .action-card, .mode-card, .deck-card')) { UI.particles(e.clientX, e.clientY); }
    });

    document.addEventListener('mousedown', e => {
      const popup = document.querySelector('.word-def-popup');
      if (popup && !popup.contains(e.target)) {
        app._closeWordDef();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.code === 'Enter' && e.target.id === 'active-write-input') { e.preventDefault(); this._checkWritingV2(); }
        return;
      }
      const view = this.session.view;
      if (e.key === '1') { e.preventDefault(); this.navigate('home'); return; }
      if (e.key === '2') { e.preventDefault(); this.navigate('learn'); return; }
      if (e.key === '3') { e.preventDefault(); this.navigate('reading'); return; }
      if (e.key === '4') { e.preventDefault(); this.navigate('speak'); return; }
      if (e.key === '5') { e.preventDefault(); this.navigate('analytics'); return; }
      if (e.key === '6') { e.preventDefault(); this.navigate('nexus'); return; }

      if (view === 'learn' && (this.session.synthActive || this.session.synthPaused)) {
        if (e.code === 'Escape') {
          e.preventDefault();
          if (this.session.synthPaused) this.resumeSynesthesia();
          else this._pauseSynesthesia();
          return;
        }
      }
      if (view === 'learn' && this.session.synthActive) {
        if (e.code === 'Space') {
          e.preventDefault();
          const word = this.session.synthWord;
          const nextChar = word?.en[this.session.synthTyped.length];
          if (nextChar === ' ') {
            this._handleSynthKey(' ');
          } else {
            this.playSynthHint();
          }
        }
        else if (e.key.length === 1 && /[a-zA-ZçğıöşüÇĞİÖŞÜ' -]/.test(e.key)) {
          e.preventDefault();
          this._handleSynthKey(e.key);
        }
      }
      if (view === 'speak') {
        if (e.code === 'Space') { e.preventDefault(); this.toggleRecord(); }
        if (e.code === 'ArrowRight') { e.preventDefault(); this.nextSpeak(); }
        if (e.code === 'KeyR') { e.preventDefault(); this.retrySpeak(); }
      }
      if (view === 'reading') {
        if (e.code === 'ArrowRight') { e.preventDefault(); this._nextStory(); }
        if (e.code === 'ArrowLeft') { e.preventDefault(); this._prevStory(); }
        if (e.code === 'Escape') document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
      }
      if (e.code === 'Escape') { document.querySelectorAll('.word-def-popup').forEach(p => p.remove()); }
    });
  }
}

window.app = new App();
