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
      achievements: [],
      mastery:    {},     // { wordId: { score, interval, ease, nextReview } }
      history:    {},     // { 'YYYY-MM-DD': xp }
    };
  }

  _load() {
    try {
      const saved = localStorage.getItem('er_state');
      return saved ? { ...this._defaults(), ...JSON.parse(saved) } : this._defaults();
    } catch { return this._defaults(); }
  }

  save() {
    try { localStorage.setItem('er_state', JSON.stringify(this._state)); } catch {}
  }

  get(key)        { return this._state[key]; }
  set(key, value) { this._state[key] = value; this.save(); }
  update(partial) { Object.assign(this._state, partial); this.save(); }
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

  startRecognition({ onResult, onError, onEnd }) {
    if (!this.SpeechRecognition) {
      onError && onError({ error: 'not-supported' });
      return null;
    }
    const rec = new this.SpeechRecognition();
    rec.lang = this.accent || 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = onResult;
    rec.onerror  = onError;
    rec.onend    = onEnd;
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
    this.state   = new StateManager();
    this.audio   = new AudioEngine();
    this.speech  = new SpeechEngine(this.state.get('accent'));

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
    this._bindGlobalEvents();
    this._checkStreak();
    this._applyRankTheme();
    this._updateHeader();

    // Boot
    setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.style.transition = 'opacity 0.5s';
        splash.style.opacity = '0';
        setTimeout(() => {
          splash.remove();
          this.navigate('home');
          if (!this.state.get('onboarded')) this._showOnboarding();
        }, 520);
      }
    }, 900);
  }

  // ─────────────────────────────────────────────────────────
  //  NAVIGATION
  // ─────────────────────────────────────────────────────────

  navigate(view) {
    this.session.view = view;
    this.speech.stop();
    this.session.isSpeakingStory = false;

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
      home:      () => this._initHome(),
      learn:     () => this._initLearn(),
      reading:   () => this._initReading(),
      speak:     () => this._initSpeak(),
      analytics: () => this._initAnalytics(),
    };
    if (init[view]) init[view]();

    this.audio.play('click');
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

  addXP(amount) {
    let xp    = this.state.get('xp') + amount;
    let level = this.state.get('level');
    const needed = level * XP_PER_LEVEL;

    const today = new Date().toISOString().split('T')[0];
    const hist  = this.state.get('history');
    hist[today] = (hist[today] || 0) + amount;
    this.state.set('history', hist);

    if (xp >= needed) {
      xp -= needed;
      level++;
      UI.toast(`🎉 Seviye atladın! Level ${level}`, 4000);
      this.audio.play('success');
      if (typeof confetti === 'function') {
        confetti({ particleCount:120, spread:70, origin:{y:0.6}, colors:['#00d4ff','#7c3aed','#f43f5e'] });
      }
      this._applyRankTheme();
    }
    this.state.update({ xp, level });
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
  }

  checkAchievements() {
    if (typeof ACHIEVEMENTS_DATA === 'undefined') return;
    const unlocked = this.state.get('achievements') || [];
    let newlyUnlocked = false;

    const stats = {
      xp: this.state.get('xp') + (this.state.get('level') - 1) * XP_PER_LEVEL,
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
    const today     = new Date().toDateString();
    const lastActive = this.state.get('lastActive');
    if (lastActive === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let streak = this.state.get('streak');
    if (lastActive === yesterday) {
      streak++;
    } else if (lastActive && lastActive !== today) {
      streak = 1;
    }
    this.state.update({ streak, lastActive: today });
  }

  _updateHeader() {
    UI.setEl('hdr-xp',     this.state.get('xp'));
    UI.setEl('hdr-level',  this.state.get('level'));
    UI.setEl('hdr-streak', this.state.get('streak'));
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

    const needed = level * XP_PER_LEVEL;
    UI.setEl('xp-remain', `${needed - xp} XP kaldı`);
    setTimeout(() => UI.setWidth('xp-bar', (xp / needed) * 100), 100);

    const rank = this._getRank();
    UI.setEl('rank-icon',  rank.icon);
    UI.setEl('rank-name',  rank.name);
    UI.setEl('rank-level', `Level ${level}`);

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
    const goalXP   = 100;
    const goalPct  = Math.min(100, Math.round((todayXP / goalXP) * 100));
    setTimeout(() => UI.setWidth('daily-goal-bar', goalPct), 200);
    UI.setEl('daily-goal-pct', `${todayXP}/${goalXP} XP`);
    const goalEl = document.getElementById('daily-goal-label');
    if (goalEl) goalEl.textContent = goalPct >= 100 ? '✅ Günlük hedef tamamlandı!' : '🎯 Günlük Hedef';

    const hour = new Date().getHours();
    const greet = hour < 12 ? '🌅 Günaydın!' : hour < 18 ? '☀️ İyi öğlenler!' : '🌙 İyi akşamlar!';
    UI.setEl('home-greeting', greet);
    UI.setEl('home-date', new Date().toLocaleDateString('tr-TR', { weekday:'long', day:'numeric', month:'long' }));
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
  //  ONBOARDING
  // ─────────────────────────────────────────────────────────

  _showOnboarding() {
    this._ob = { step: 0, score: 0 };
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '1';
    });
    this._renderObStep();
  }

  _obQuestions() {
    return [
      {
        icon:'🤔', title:'Seviyeni Belirle',
        sub:'Sana uygun içeriği hazırlayalım',
        opts:[
          {label:'Hiç bilmiyorum', sub:'A1 · Sıfırdan', pts:0},
          {label:'Biraz biliyorum', sub:'A2 · Temel', pts:1},
          {label:'Orta seviyeyim', sub:'B1/B2', pts:3},
          {label:'İleri düzeydeyim', sub:'C1+', pts:5},
        ]
      },
      {
        icon:'📖', title:'"Galaxy" ne demek?',
        sub:'Doğru seçeneği tıkla',
        opts:[
          {label:'☀️ Güneş', pts:0},
          {label:'🌀 Galaksi', pts:2, correct:true},
          {label:'⭐ Yıldız', pts:0},
          {label:'🪐 Gezegen', pts:0},
        ]
      },
      {
        icon:'✍️', title:'"I\'m looking forward to ___ you."',
        sub:'Doğru seçeneği seç',
        opts:[
          {label:'meet', pts:0},
          {label:'meeting', pts:2, correct:true},
          {label:'met', pts:0},
          {label:'to meet', pts:0},
        ]
      },
    ];
  }

  _renderObStep() {
    const screen = document.getElementById('ob-screen');
    const progress = document.getElementById('ob-progress');
    const fill = document.getElementById('ob-progress-fill');
    if (!screen) return;

    const step = this._ob.step;
    const qs = this._obQuestions();

    if (step === 0) {
      if (progress) progress.style.display = 'none';
      screen.innerHTML = `
        <div class="ob-card">
          <div class="ob-icon">🎓</div>
          <h2 class="ob-title">English<span style="color:var(--cyan)"> Rhapsody</span>'ye<br>Hoş Geldin!</h2>
          <p class="ob-sub">Birkaç soruda seviyeni belirleyelim ve sana özel bir öğrenme deneyimi oluşturalım.</p>
          <button class="btn btn-primary btn-lg" style="margin-top:8px" onclick="app._obNext()">Başla →</button>
        </div>`;
      return;
    }

    const q = qs[step - 1];
    if (!q) { this._obFinish(); return; }

    const pct = ((step - 1) / qs.length) * 100;
    if (progress) { progress.style.display = 'block'; }
    if (fill) fill.style.width = `${pct}%`;

    screen.innerHTML = `
      <div class="ob-card">
        <div class="ob-icon">${q.icon}</div>
        <h2 class="ob-title">${q.title}</h2>
        <p class="ob-sub">${q.sub}</p>
        <div class="ob-options">
          ${q.opts.map((o, i) => `
            <button class="ob-option" onclick="app._obSelect(${step - 1}, ${i})">
              <span>${o.label}</span>
              ${o.sub ? `<span class="ob-opt-sub">${o.sub}</span>` : ''}
            </button>`).join('')}
        </div>
      </div>`;
  }

  _obSelect(qIdx, optIdx) {
    const q   = this._obQuestions()[qIdx];
    const opt = q.opts[optIdx];
    const btns = document.querySelectorAll('.ob-option');
    btns.forEach(b => b.disabled = true);
    btns[optIdx].classList.add('selected');
    this._ob.score += (opt.pts || 0);

    if (q.opts.some(o => o.correct)) {
      if (opt.correct) btns[optIdx].classList.add('correct');
      else {
        btns[optIdx].classList.add('wrong');
        const ci = q.opts.findIndex(o => o.correct);
        if (ci >= 0 && btns[ci]) btns[ci].classList.add('correct');
      }
    }

    this.audio.play('pop');
    setTimeout(() => this._obNext(), 750);
  }

  _obNext() {
    this._ob.step++;
    const screen = document.getElementById('ob-screen');
    if (screen) {
      screen.style.opacity = '0';
      screen.style.transform = 'translateX(20px)';
      setTimeout(() => {
        screen.style.transition = 'none';
        screen.style.transform = 'translateX(-20px)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          screen.style.transition = 'opacity 0.3s, transform 0.3s var(--bounce)';
          screen.style.opacity = '1';
          screen.style.transform = 'translateX(0)';
          this._renderObStep();
        }));
      }, 180);
    }
  }

  _obFinish() {
    const score = this._ob.score;
    let speakDiff, bonus, levelLabel;
    if (score <= 2)     { speakDiff='easy';   bonus=0;   levelLabel='Başlangıç 🌱'; }
    else if (score <= 6){ speakDiff='medium'; bonus=200; levelLabel='Orta Seviye 📚'; }
    else                { speakDiff='hard';   bonus=500; levelLabel='İleri Seviye 🏆'; }

    const fill = document.getElementById('ob-progress-fill');
    if (fill) fill.style.width = '100%';

    const screen = document.getElementById('ob-screen');
    if (screen) screen.innerHTML = `
      <div class="ob-card">
        <div class="ob-icon">🎯</div>
        <h2 class="ob-title">Seviyeni Belirledik!</h2>
        <p class="ob-sub" style="margin-bottom:8px"><strong style="color:var(--cyan)">${levelLabel}</strong></p>
        ${bonus > 0 ? `<p class="ob-sub">⚡ Başlangıç bonusu: +${bonus} XP</p>` : ''}
        <button class="btn btn-primary btn-lg" style="margin-top:20px" onclick="app._obComplete('${speakDiff}', ${bonus})">
          Hadi Başlayalım!
        </button>
      </div>`;
  }

  _obComplete(speakDiff, bonus) {
    this.state.update({ onboarded: true, speakDiff });
    if (bonus > 0) this.addXP(bonus);
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.4s';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 420);
    }
    this.audio.play('success');
    UI.toast(`✅ Seviye belirlendi! Öğrenmeye başla.`);
    this._initHome();
  }

  skipOnboarding() {
    this.state.set('onboarded', true);
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.3s';
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.display = 'none'; }, 320);
    }
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

  startSynesthesia() {
    this.session.synthActive = true;
    const len = this._synthSessionLen || 10;

    // SRS-prioritized pool: due words first, then fill with random
    const mastery = this.state.get('mastery');
    const due = SRS.getDue(WORDS, mastery);
    const notDue = WORDS.filter(w => !due.includes(w)).sort(() => Math.random() - 0.5);
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
      if (ctx) {
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
        setTimeout(() => { try { osc.stop(); } catch(e){} }, 1000);
      }
      this.session.synthDrone = null;
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
    if (catEl)  catEl.textContent  = word.cat || '';
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
      const r = Math.random();
      if (r < 0.33) wordMode = 'spell';
      else if (r < 0.66) wordMode = 'choice';
      else wordMode = 'context';
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
      } else if (wordMode === 'context') {
        modeInd.textContent = '🧩 BAĞLAM';
        modeInd.className = 'synth-mode-ind context';
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
    } else if (wordMode === 'context') {
      if (display)    display.style.display    = '';
      if (choiceArea) { choiceArea.style.display = 'none'; choiceArea.innerHTML = ''; }
      if (listenBtn)  listenBtn.style.display  = '';
      if (trEl)       trEl.style.display       = 'none'; // Hide direct translation in context mode
      if (contextArea) {
        contextArea.style.display = 'block';
        // Simple sentence generation if no specific ex exists, otherwise use ex
        let sentence = word.ex || `I need to remember the word ${word.en} for my exam.`;
        // Replace target word with blanks
        const regex = new RegExp(`\\b${word.en}\\b`, 'gi');
        if (!regex.test(sentence)) sentence = `Here is an example for the word ${word.en}.`; // fallback
        const blanked = sentence.replace(regex, `<span style="color:var(--cyan); border-bottom:2px solid var(--cyan)">${'_'.repeat(word.en.length)}</span>`);
        contextArea.innerHTML = blanked;
      }
      
      if (display) {
        display.innerHTML = word.en.split('').map((ch, i) =>
          `<span data-idx="${i}" data-ch="${ch.toLowerCase()}">_</span>`
        ).join('');
      }
      // Auto-reveal first letter after 8s
      if (this.session.synthRevealTimer) clearTimeout(this.session.synthRevealTimer);
      this.session.synthRevealTimer = setTimeout(() => {
        if (this.session.synthActive && this.session.synthTyped.length === 0) {
          this._handleSynthKey(word.en[0]);
          UI.toast(`💡 İpucu: İlk harf "${word.en[0].toUpperCase()}"`, 2000);
        }
      }, 8000);
    } else {
      this.session.synthSpellCount = (this.session.synthSpellCount || 0) + 1;
      if (choiceArea) { choiceArea.style.display = 'none'; choiceArea.innerHTML = ''; }
      if (display)    display.style.display    = '';
      if (listenBtn)  listenBtn.style.display  = '';
      // Build letter blanks with synesthetic colors
      if (display) {
        display.innerHTML = word.en.split('').map((ch, i) =>
          `<span data-idx="${i}" data-ch="${ch.toLowerCase()}">_</span>`
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
          const letterColor = this._getLetterColor(ch);
          span.textContent = ch;
          span.classList.add('filled');
          span.style.color      = letterColor;
          span.style.textShadow = `0 0 14px ${letterColor}cc, 0 0 30px ${letterColor}55`;
          span.style.borderBottomColor = letterColor;
        }
      });
      // Shake the current blank on wrong key
      if (!isCorrect && spans[typedLen]) {
        spans[typedLen].classList.add('shake-letter');
        setTimeout(() => spans[typedLen]?.classList.remove('shake-letter'), 420);
      }
    }

    // Update Context Area if active
    const contextArea = document.getElementById('synth-context-area');
    if (this.session.synthWordMode === 'context' && contextArea) {
      const word = this.session.synthWord;
      let sentence = word.ex || `I need to remember the word ${word.en} for my exam.`;
      const regex = new RegExp(`\\b${word.en}\\b`, 'gi');
      if (!regex.test(sentence)) sentence = `Here is an example for the word ${word.en}.`;
      
      const typed = this.session.synthTyped;
      const remainingBlanks = '_'.repeat(Math.max(0, word.en.length - typed.length));
      
      let displayHtml = '';
      for (let i = 0; i < typed.length; i++) {
        const ch = typed[i];
        const letterColor = this._getLetterColor(ch);
        displayHtml += `<span style="color:${letterColor}; text-shadow: 0 0 10px ${letterColor}88;">${ch}</span>`;
      }
      displayHtml += `<span style="color:var(--text-3); opacity:0.5">${remainingBlanks}</span>`;

      const blanked = sentence.replace(regex, `<span style="border-bottom:2px solid var(--cyan)">${displayHtml}</span>`);
      contextArea.innerHTML = blanked;
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
    if (this.session.synthWordMode === 'context') points = 25;
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
    this.addXP(this.session.synthScore);
    this.state.update({ sessions: this.state.get('sessions') + 1 });

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
          <button class="synth-start-btn" onclick="app.navigate('learn')">TEKRAR OYNA</button>
          <button class="synth-hint-btn synth-finish-home-btn" onclick="app.navigate('home')">Ana Menü</button>
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
    this.state.set('mastery', updated);
    const total   = this.state.get('totalAttempts') + 1;
    const correct = this.state.get('totalCorrect')  + (isCorrect ? 1 : 0);
    this.state.update({ totalAttempts: total, totalCorrect: correct });
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
    vkb.innerHTML = rows.map(row =>
      `<div class="vkb-row">${row.split('').map(k =>
        `<button class="vkb-key" onclick="app._handleSynthKey('${k}')">${k}</button>`
      ).join('')}</div>`
    ).join('') +
    `<div class="vkb-row vkb-action-row">
      <button class="vkb-key vkb-hint" onclick="app.playSynthHint()">🔊 Dinle</button>
      <button class="vkb-key vkb-skip" onclick="app.skipSynthWord()">⏭ Geç</button>
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
    
    const duration = this._synthModeConfig === 'speed' ? 10 : 20;
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
      return `<button class="synth-choice-btn" onclick="app._handleChoiceSelect('${oid}','${cid}',this)">
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
      const duration = this._synthModeConfig === 'speed' ? 6000 : 20000;
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
      const duration = this._synthModeConfig === 'speed' ? 6000 : 20000;
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
  }

  setReadingLevel(level, btn) {
    this.state.update({ readingLevel: level, readingIdx: 0 });
    document.querySelectorAll('.level-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
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

    const idx   = this.state.get('readingIdx') % stories.length;
    const story = stories[idx];

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
        `<span class="cloze-blank" data-answer="${word}" onclick="app._selectBlank(this)">____</span>`
      );
      
      html = html.replace(/(<[^>]+>)|([A-Za-z']+)/g, (match, tag, word) => {
        if (tag) return tag;
        const key = word.toLowerCase().replace(/'/g, '');
        const found = wordMap[key] || wordMap[word.toLowerCase()];
        if (!found) return word;
        return `<span class="story-vocab" data-en="${found.en}" data-tr="${found.tr}" data-ipa="${found.ipa||''}" onclick="app._showWordDef('${found.en.replace(/'/g,"\\'")}',event)">${word}</span>`;
      });

      const opts = [...story.options].sort(() => Math.random() - 0.5);
      optsHtml = opts.map(o =>
        `<button class="cloze-opt" onclick="app._fillBlank('${o.replace(/'/g,"\\'")}', this)">${o}</button>`
      ).join('');
    } else {
      // READ MODE
      const plainText = story.text.replace(/\{([^}]+)\}/g, '$1');
      html = this._markupText(plainText, 'story-word');
    }

    container.innerHTML = `
      <div class="story-nav">
        <div>
          <div class="story-meta">
            <span class="badge badge-cyan">${level}</span>
            <span class="badge badge-violet">${idx + 1}/${stories.length}</span>
          </div>
          <div class="story-title">${story.title}</div>
        </div>
        <div style="display:flex;gap:8px">
          ${idx > 0 ? `<button class="btn btn-ghost btn-sm" onclick="app._prevStory()">← Önceki</button>` : ''}
          <button class="btn btn-ghost btn-sm" id="btn-next-story" ${mode === 'quiz' ? 'style="display:none"' : ''} onclick="app._nextStory()">Sonraki →</button>
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
      popup.innerHTML = `
        <div class="wdp-header">
          <div class="wdp-title-wrap">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="background:${tc.bg};color:${tc.text};font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:99px;letter-spacing:.04em">${phraseEntry.type}</span>
              <div class="wdp-en">${word}</div>
            </div>
          </div>
          <span class="wdp-close" onclick="app._closeWordDef()">✕</span>
        </div>
        <div class="wdp-tr">${phraseEntry.tr}</div>
        <div class="wdp-section">
          <div class="wdp-label">Örnek Cümle</div>
          <div class="wdp-ex">"${phraseEntry.ex}"</div>
        </div>
      `;
      document.body.appendChild(popup);
      if (event) {
        const x = Math.min(event.clientX, window.innerWidth - 300);
        const y = Math.min(event.clientY + 16, window.innerHeight - 200);
        popup.style.left = x + 'px';
        popup.style.top  = y + 'px';
      }
      this.audio.play('pop');
      setTimeout(() => { if (popup.parentElement) app._closeWordDef(); }, 9000);
      return;
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
      'said': 'dedi/söyledi', 'says': 'der/söyler', 'say': 'demek/söylemek'
    };

    const cleanWord = word.toLowerCase().replace(/[^a-z']/g, '');
    // Also try without possessive 's  ("Anna's" → "anna")
    const cleanBase = cleanWord.replace(/'s$/, '');
    const found = wordMap[cleanWord] || wordMap[word.toLowerCase()] || (cleanBase !== cleanWord ? wordMap[cleanBase] : null);

    if (found) {
       this._showWordDef(found.en, event);
    } else {
       // Check basic dictionary
       const basicTr = basicDict[cleanWord];
       
       document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
       const popup = document.createElement('div');
       popup.className = 'word-def-popup';
       
       if (basicTr) {
         popup.innerHTML = `
           <div class="wdp-header">
             <div class="wdp-title-wrap">
               <div class="wdp-en">💡 ${word}</div>
               <div class="wdp-ipa">/bağlam kelimesi/</div>
             </div>
             <span class="wdp-close" onclick="app._closeWordDef()">✕</span>
             </div>
             <div class="wdp-tr">${basicTr}</div>
             <div class="wdp-section">
             <p style="font-size:0.75rem; color:var(--text-3); font-style:italic">Bu temel bir dil bilgisi kelimesidir ve listeye eklenemez.</p>
           </div>
         `;
       } else {
         // Try to strip common suffixes (Lemmatization)
         let lemma = cleanWord;
         if (cleanWord.endsWith('ing')) lemma = cleanWord.slice(0, -3);
         else if (cleanWord.endsWith('ed')) lemma = cleanWord.slice(0, -2);
         else if (cleanWord.endsWith('es')) lemma = cleanWord.slice(0, -2);
         else if (cleanWord.endsWith('s') && cleanWord.length > 3) lemma = cleanWord.slice(0, -1);

         const foundLemma = wordMap[lemma];
         if (foundLemma) { this._showWordDef(foundLemma.en, event); return; }

         // Check PHRASE_DICT with lemma form (e.g. "accumulating" → "accumulate")
         const lemmaPhrase = PHRASE_DICT[lemma] || PHRASE_DICT[cleanWord];
         if (lemmaPhrase) {
           const _tc = { 'Phrasal Verb':{bg:'#0891b2',text:'#fff'}, 'Deyim':{bg:'#7c3aed',text:'#fff'}, 'Gramer Kalıbı':{bg:'#b45309',text:'#fff'}, 'Eylem Kalıbı':{bg:'#065f46',text:'#fff'}, 'İsim Tamlaması':{bg:'#be185d',text:'#fff'}, 'Kelime':{bg:'#1d4ed8',text:'#fff'} }[lemmaPhrase.type] || {bg:'#374151',text:'#fff'};
           popup.innerHTML = `<div class="wdp-header"><div class="wdp-title-wrap"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span style="background:${_tc.bg};color:${_tc.text};font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:99px">${lemmaPhrase.type}</span><div class="wdp-en">${word}</div></div></div><span class="wdp-close" onclick="app._closeWordDef()">✕</span></div><div class="wdp-tr">${lemmaPhrase.tr}</div><div class="wdp-section"><div class="wdp-label">Örnek Cümle</div><div class="wdp-ex">"${lemmaPhrase.ex}"</div></div>`;
           document.body.appendChild(popup);
           if (event) { popup.style.left = Math.min(event.clientX, window.innerWidth-300)+'px'; popup.style.top = Math.min(event.clientY+16, window.innerHeight-200)+'px'; }
           this.audio.play('pop');
           setTimeout(() => { if (popup.parentElement) app._closeWordDef(); }, 9000);
           return;
         }

         popup.innerHTML = `
           <div class="wdp-header">
             <div class="wdp-title-wrap">
               <div class="wdp-en">🔊 ${word}</div>
             </div>
             <span class="wdp-close" onclick="app._closeWordDef()">✕</span>
           </div>
           <div class="wdp-section">
             <button class="btn btn-ghost btn-sm" style="width:100%" onclick="app.speakWord('${word.replace(/'/g,"\\'")}')">🔊 Sesi Dinle</button>
           </div>
         `;
       }
       
       document.body.appendChild(popup);
       if (event) {
         const x = Math.min(event.clientX, window.innerWidth - 300);
         const y = Math.min(event.clientY + 16, window.innerHeight - 200);
         popup.style.left = x + 'px';
         popup.style.top  = y + 'px';
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

    popup.innerHTML = `
      <div class="wdp-header">
        <div class="wdp-title-wrap">
          <div class="wdp-en">${w.icon || ''} ${w.en}</div>
          ${w.ipa ? `<div class="wdp-ipa">${w.ipa}</div>` : ''}
        </div>
        <span class="wdp-close" onclick="app._closeWordDef()">✕</span>
      </div>
      <div class="wdp-tr">${w.tr}</div>
      <div class="wdp-section">
        <div class="wdp-label">Örnek Cümle</div>
        <div class="wdp-ex">"${w.ex}"</div>
      </div>
      ${synsHtml}
      ${collocsHtml}
      <div class="wdp-actions">
        <button class="btn btn-primary btn-sm" style="flex:1; font-size: 0.75rem;" onclick="app._addToMasteryFromDict('${w.id || w.en}', this)">
          ➕ Listeye Ekle
        </button>
      </div>
    `;
    document.body.appendChild(popup);
    if (event) {
      const x = Math.min(event.clientX, window.innerWidth - 300);
      const y = Math.min(event.clientY + 16, window.innerHeight - 300);
      popup.style.left = x + 'px';
      popup.style.top  = y + 'px';
    }
    this.audio.play('pop');
  }

  _closeWordDef() {
    document.querySelectorAll('.word-def-popup').forEach(p => p.remove());
    document.querySelectorAll('.story-word, .story-vocab').forEach(el => el.classList.remove('playing'));
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
      this.addXP(10);
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
      this.addXP(50);
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
    const story = stories[this.state.get('readingIdx') % stories.length];
    
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
    if (lastMode === 'convo')   this._renderConvoList();
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
        const audioBlob = new Blob(this.session.audioChunks, { type: 'audio/wav' });
        this.session.lastAudioUrl = URL.createObjectURL(audioBlob);
        if (pbBtn) pbBtn.style.display = 'flex';
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
        return `<span class="${className} phrase" onclick="app._handleWordClick('${phraseText}', this, event)">${phraseText}</span>`;
      }
      const cleanWord = word.replace(/'/g, "\\'");
      return `<span class="${className}" onclick="app._handleWordClick('${cleanWord}', this, event)">${word}</span>`;
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
      onEnd: () => this._stopRecord(),
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
    const results = tWords.map(tw => {
      if (sWords.includes(tw)) return true;
      const stem = tw.endsWith('s') ? tw.slice(0,-1) : tw + 's';
      if (sWords.includes(stem)) return true;
      for (const sw of sWords) { if (this._levenshtein(sw, tw) <= (tw.length <= 4 ? 1 : 2)) return true; }
      return false;
    });
    const score  = Math.min(Math.round(results.filter(Boolean).length / tWords.length * 100), 100);
    document.querySelectorAll('.sw').forEach((el, i) => { el.className = 'sw ' + (results[i] ? 'correct' : 'wrong'); });
    const tEl = document.getElementById('speak-transcript');
    if (tEl) tEl.innerHTML = `<em style="color:var(--text-2)">"${spoken}"</em>`;
    const panel = document.getElementById('score-panel');
    if (panel) panel.style.display = 'flex';
    this._animateScoreRing(score);
    let fb = '', xp = 0;
    if (score >= 90)      { fb = '🏆 Mükemmel! Anadili gibi!'; xp = 60; }
    else if (score >= 75) { fb = '🎉 Harika! Çok iyi gidiyorsun.'; xp = 40; }
    else if (score >= 55) { fb = '💪 İyi iş! Biraz daha pratik yap.'; xp = 20; }
    else                  { fb = '🔄 Tekrar dene — daha net söyle.'; xp = 5; }
    UI.setEl('score-feedback', fb);
    const bd = document.getElementById('word-breakdown');
    if (bd) {
      bd.innerHTML = tWords.map((w, i) =>
        `<span class="wb-chip ${results[i] ? 'wb-ok' : 'wb-miss'}" onclick="app.speakWord('${w.replace(/'/g,"\\'")}')" title="Dinle ve Tekrar Et">${w}</span>`
      ).join('');
    }
    const wordMap = {};
    WORDS.forEach(wd => { wordMap[wd.en.toLowerCase()] = wd; });
    const missedIpa = tWords
      .filter((w, i) => !results[i])
      .map(w => wordMap[w])
      .filter(wd => wd && wd.ipa)
      .map(wd => `<div class="ipa-hint-chip" onclick="app.speakWord('${wd.en.replace(/'/g,"\\'")}')">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span>${wd.icon || '🔊'} <strong>${wd.en}</strong></span>
            <em>${wd.ipa}</em>
          </div>
          <div style="font-size:0.65rem;opacity:0.7;margin-top:2px">Dinlemek için tıkla</div>
        </div>`)
      .join('');
    const ipaPanel = document.getElementById('ipa-hint-panel');
    if (ipaPanel) { ipaPanel.innerHTML = missedIpa ? `<div class="ipa-hint-label">🎯 Telaffuzunu Geliştir:</div><div class="ipa-hints-grid">${missedIpa}</div>` : ''; }
    this.audio.play(score >= 75 ? 'success' : score >= 40 ? 'pop' : 'click');
    this.addXP(xp);
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
    if (this.state.get('autoAdvance') && score >= 80) {
      let cd = 3;
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
    if (mode === 'convo')   this._renderConvoList();
    this.audio.play('click');
  }

  // ─── AI CONVERSATION MODE ────────────────────────────────────────────────

  _renderConvoList() {
    const el = document.getElementById('convo-content');
    if (!el) return;
    el.innerHTML = `
      <div class="convo-list-header">
        <h2>Senaryo Seç</h2>
        <p>Gerçek hayat durumlarında İngilizce konuş</p>
      </div>
      <div class="convo-scenarios">
        ${CONVERSATIONS.map(c => `
          <div class="convo-scenario-card" onclick="app.startConvo('${c.id}')">
            <div class="csc-emoji">${c.emoji}</div>
            <div class="csc-title">${c.title}</div>
            <div class="csc-level level-${c.level}">${c.level === 'easy' ? '🌱 Kolay' : c.level === 'medium' ? '📚 Orta' : '🔥 İleri'}</div>
            <div class="csc-turns">${c.turns.filter(t => t.role === 'user').length} konuşma turu</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  startConvo(id) {
    const scenario = CONVERSATIONS.find(c => c.id === id);
    if (!scenario) return;
    this.session.convo = { scenario, turnIdx: 0, score: 0, total: 0 };
    this._renderConvoChat();
  }

  _renderConvoChat() {
    const el = document.getElementById('convo-content');
    if (!el) return;
    const { scenario } = this.session.convo;
    el.innerHTML = `
      <div class="convo-chat-header">
        <button class="btn btn-ghost btn-sm" onclick="app._renderConvoList()">← Senaryolar</button>
        <div class="cch-title">${scenario.emoji} ${scenario.title}</div>
        <div class="cch-progress" id="cch-progress">0/${scenario.turns.filter(t => t.role === 'user').length}</div>
      </div>
      <div class="convo-chat" id="convo-chat"></div>
      <div class="convo-user-area" id="convo-user-area"></div>
    `;
    setTimeout(() => this._convoNextTurn(), 400);
  }

  _convoNextTurn() {
    const { scenario, turnIdx } = this.session.convo;
    const turn = scenario.turns[turnIdx];
    if (!turn) { this._convoFinish(); return; }
    if (turn.role === 'bot') {
      this._convoAddBotBubble(turn.text, turn.tr);
      setTimeout(() => this.speech.speak(turn.text, 0.85), 300);
      this.session.convo.turnIdx++;
      setTimeout(() => this._convoNextTurn(), 2000);
    } else {
      const userTurns = scenario.turns.filter(t => t.role === 'user').length;
      const doneUserTurns = scenario.turns.slice(0, turnIdx).filter(t => t.role === 'user').length;
      const prog = document.getElementById('cch-progress');
      if (prog) prog.textContent = `${doneUserTurns}/${userTurns}`;
      this._convoShowUserPrompt(turn);
    }
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
        <button class="cb-replay" onclick="app.speech.speak(${JSON.stringify(text)}, 0.85)">🔊</button>
      </div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  _convoAddUserBubble(text, score) {
    const chat = document.getElementById('convo-chat');
    if (!chat) return;
    const color = score >= 80 ? 'var(--green)' : score >= 50 ? 'var(--amber)' : 'var(--rose)';
    const d = document.createElement('div');
    d.className = 'convo-bubble user';
    d.innerHTML = `
      <div class="cb-content right">
        <div class="cb-text">${text || '(sessiz)'}</div>
        <div class="cb-score" style="color:${color}">%${score}</div>
      </div>
      <div class="cb-avatar">👤</div>`;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
  }

  _convoShowUserPrompt(turn) {
    const area = document.getElementById('convo-user-area');
    if (!area) return;
    area.innerHTML = `
      <div class="convo-prompt">
        <div class="cp-hint">💬 ${turn.hint}</div>
        <div class="cp-expected">Örnek: <em>"${turn.expected}"</em></div>
        <div class="convo-controls">
          <button class="speak-rec-btn" id="convo-rec-btn" onclick="app.toggleConvoRecord()">
            <span id="convo-rec-icon">🎤</span>
            <small id="convo-rec-label">Konuş</small>
          </button>
          <button class="speak-side-btn" onclick="app.skipConvoTurn()">⏭ Geç</button>
        </div>
        <div id="convo-transcript" style="text-align:center;color:var(--text-2);font-size:0.85rem;min-height:24px;margin-top:8px"></div>
      </div>`;
  }

  toggleConvoRecord() {
    if (!this.speech.SpeechRecognition) { UI.toast("Ses tanıma desteklenmiyor."); return; }
    if (this.session.isRecording) { this.speech.stopRecognition(); this._stopConvoRecord(); return; }
    const turn = this.session.convo.scenario.turns[this.session.convo.turnIdx];
    const btn = document.getElementById('convo-rec-btn');
    const icon = document.getElementById('convo-rec-icon');
    const label = document.getElementById('convo-rec-label');
    if (icon) icon.textContent = '⏹️';
    if (label) label.textContent = 'Durdur';
    if (btn) btn.classList.add('recording');
    const t = document.getElementById('convo-transcript');
    if (t) t.innerHTML = '<span style="color:var(--cyan)">🎙️ Dinliyorum...</span>';
    this.session.isRecording = true;
    this.speech.startRecognition({
      onResult: (e) => this._handleConvoResult(e, turn),
      onError: () => this._stopConvoRecord(),
      onEnd: () => this._stopConvoRecord(),
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
    const spoken = event.results[0][0].transcript.trim().toLowerCase();
    const keywords = turn.keywords || [];
    const matched = keywords.filter(k => spoken.includes(k.toLowerCase())).length;
    const score = Math.min(100, Math.round((matched / Math.max(keywords.length * 0.4, 1)) * 100));
    const t = document.getElementById('convo-transcript');
    if (t) t.innerHTML = `<em>"${event.results[0][0].transcript.trim()}"</em>`;
    this._convoAddUserBubble(event.results[0][0].transcript.trim(), score);
    this.session.convo.score += score;
    this.session.convo.total++;
    this.session.convo.turnIdx++;
    const area = document.getElementById('convo-user-area');
    if (area) area.innerHTML = '';
    setTimeout(() => this._convoNextTurn(), 700);
  }

  skipConvoTurn() {
    this._convoAddUserBubble('(atlandı)', 0);
    const area = document.getElementById('convo-user-area');
    if (area) area.innerHTML = '';
    this.session.convo.turnIdx++;
    this.session.convo.total++;
    setTimeout(() => this._convoNextTurn(), 400);
  }

  _convoFinish() {
    const { score, total, scenario } = this.session.convo;
    const avg = total > 0 ? Math.round(score / total) : 0;
    const xp = Math.round(avg / 100 * 80);
    this.addXP(xp);
    const area = document.getElementById('convo-user-area');
    const chat = document.getElementById('convo-chat');
    if (chat) {
      const d = document.createElement('div');
      d.className = 'convo-finish-card';
      d.innerHTML = `
        <div class="cf-emoji">🎉</div>
        <div class="cf-title">Sohbet Tamamlandı!</div>
        <div class="cf-score-row">
          <div class="cf-score-val" style="color:${avg >= 75 ? 'var(--green)' : avg >= 50 ? 'var(--amber)' : 'var(--rose)'}">${avg}%</div>
          <div class="cf-score-label">Ortalama Skor</div>
        </div>
        <div class="cf-xp">+${xp} XP kazandın!</div>
        <button class="btn btn-primary" style="margin-top:12px" onclick="app._renderConvoList()">Yeni Senaryo Seç</button>
      `;
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
    }
    if (area) area.innerHTML = '';
    if (avg >= 80 && typeof confetti === 'function') confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  }

  // ─────────────────────────────────────────────────────────
  //  ANALYTICS MODULE
  // ─────────────────────────────────────────────────────────

  _initAnalytics() {
    const mastery   = this.state.get('mastery');
    const learned   = Object.values(mastery).filter(m => (m.score || 0) >= 3).length;
    const sessions  = this.state.get('sessions');
    const streak    = this.state.get('streak');
    const total     = this.state.get('totalAttempts');
    const correct   = this.state.get('totalCorrect');
    const acc       = total > 0 ? Math.round((correct / total) * 100) : 0;
    UI.setEl('an-words', learned); UI.setEl('an-sessions', sessions); UI.setEl('an-streak', streak); UI.setEl('an-acc', `${acc}%`);
    this._renderHeatmap(); this._renderCategoryChart(); this._renderCefrChart(); this._renderBadges();
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

  // ─────────────────────────────────────────────────────────
  //  CANVAS BACKGROUND
  // ─────────────────────────────────────────────────────────

  _initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    const stars = Array.from({length:140}, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, s: Math.random() * 1.8, v: Math.random() * 0.4 + 0.08 }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const level = this.state.get('level');
      const tier  = Math.min(Math.floor((level - 1) / 5) + 1, 6);
      const palettes  = ['#00d4ff','#10b981','#f59e0b','#7c3aed','#f43f5e','#ff9d00'];
      ctx.fillStyle   = palettes[tier - 1] || '#00d4ff';
      ctx.globalAlpha = 0.4;
      const speedMult = 1 + level * 0.035;

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
    document.addEventListener('click', e => {
      const navItem = e.target.closest('.nav-item, .m-nav-item');
      if (navItem) { this.navigate(navItem.dataset.target); return; }
      if (e.target.closest('button, .action-card, .mode-card, .deck-card')) { UI.particles(e.clientX, e.clientY); }
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
          this.playSynthHint();
        }
        else if (e.key.length === 1 && /[a-zA-ZçğıöşüÇĞİÖŞÜ'-]/.test(e.key)) {
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

const app = new App();
