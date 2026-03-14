// ─── READING WORKSHOP — STORIES ───────────────────────────────────────────
// Her hikaye: { title, level: 'Kolay'|'Orta'|'İleri', text, options }
// Metindeki {kelime} şeklinde işaretlenenler quiz boşlukları olur.
// options: quiz boşlukları için cevap seçenekleri (doğru + yanlışlar)

const STORIES = [

  // ────────────────────────── KOLAY ──────────────────────────

  {
    title: "Anna's Morning",
    level: 'Kolay',
    text: `Anna {wakes} up every morning at seven o'clock. She goes to the {bathroom} and washes her face. Then she eats {breakfast} in the kitchen. She drinks a cup of {tea} and reads the news on her phone. At eight o'clock she leaves the house and walks to {work}. She is always on time.`,
    options: ['wakes', 'bathroom', 'breakfast', 'tea', 'work', 'sleeps', 'living room', 'dinner', 'coffee', 'school']
  },
  {
    title: "The Park",
    level: 'Kolay',
    text: `Tom and his {dog} go to the park every afternoon. The park is big and {green}. There are many {trees} and flowers. Tom throws a {ball} and his dog runs after it. Children {play} on the swings and slide. It is a beautiful day.`,
    options: ['dog', 'green', 'trees', 'ball', 'play', 'cat', 'blue', 'rocks', 'book', 'sleep']
  },
  {
    title: "At the Supermarket",
    level: 'Kolay',
    text: `Maria goes to the {supermarket} on Saturdays. She buys {bread}, milk, eggs, and {fruit}. She puts everything in her {basket} and goes to the counter. The cashier tells her the {price} and she pays. She thanks the cashier and walks home.`,
    options: ['supermarket', 'bread', 'fruit', 'basket', 'price', 'library', 'newspaper', 'vegetables', 'bag', 'number']
  },
  {
    title: "My Family",
    level: 'Kolay',
    text: `I have a small {family}. My father is a {teacher} and my mother works in a hospital. I have one {sister}. Her name is Lisa. We live in a {house} near the city. On weekends we watch {films} together. I love my family very much.`,
    options: ['family', 'teacher', 'sister', 'house', 'films', 'country', 'doctor', 'brother', 'flat', 'books']
  },
  {
    title: "The Weather",
    level: 'Kolay',
    text: `Today the {weather} is sunny and warm. There are no {clouds} in the sky. The temperature is twenty-five {degrees}. It is a good day to go outside. People are wearing {shorts} and t-shirts. The children are swimming in the {sea}.`,
    options: ['weather', 'clouds', 'degrees', 'shorts', 'sea', 'time', 'birds', 'meters', 'coats', 'park']
  },
  {
    title: "Learning English",
    level: 'Kolay',
    text: `Every day I {study} English for one hour. I read {books} and listen to music in English. I also {watch} films without subtitles. It is sometimes {difficult} but I don't give up. My {teacher} says I am improving a lot. I hope to speak English fluently one day.`,
    options: ['study', 'books', 'watch', 'difficult', 'teacher', 'speak', 'newspapers', 'play', 'easy', 'parent']
  },
  {
    title: "A Day at the Beach",
    level: 'Kolay',
    text: `Last summer we went to the {beach}. The water was {warm} and clear. I {swam} for one hour. My father built a {sandcastle} near the water. My mother read a book under the {umbrella}. We had ice cream in the afternoon. It was a perfect day.`,
    options: ['beach', 'warm', 'swam', 'sandcastle', 'umbrella', 'mountain', 'cold', 'ran', 'house', 'tree']
  },
  {
    title: "Cooking Dinner",
    level: 'Kolay',
    text: `My mother loves to {cook}. Tonight she is making {pasta} with tomato sauce. She cuts the {onion} and garlic first. Then she adds them to the {pan}. The kitchen smells wonderful. We sit at the {table} and eat together as a family.`,
    options: ['cook', 'pasta', 'onion', 'pan', 'table', 'swim', 'rice', 'carrot', 'pot', 'chair']
  },

  // ────────────────────────── ORTA ──────────────────────────

  {
    title: "The Digital Age",
    level: 'Orta',
    text: `Technology has completely changed the way we {communicate}. Smartphones allow us to stay {connected} with people around the world in seconds. Social media platforms have become important tools for sharing {information} and opinions. However, experts {warn} that too much screen time can affect our mental health. Finding the right {balance} between online and offline life is essential for well-being.`,
    options: ['communicate', 'connected', 'information', 'warn', 'balance', 'travel', 'disconnected', 'ideas', 'suggest', 'difference']
  },
  {
    title: "Climate Change",
    level: 'Orta',
    text: `Scientists agree that climate change is one of the biggest {challenges} of our time. Rising {temperatures} are causing glaciers to melt and sea levels to rise. Extreme weather {events} such as floods and droughts are becoming more frequent. Governments around the world are working to {reduce} carbon emissions. Individual actions like recycling and using public {transport} also make a difference.`,
    options: ['challenges', 'temperatures', 'events', 'reduce', 'transport', 'problems', 'costs', 'results', 'increase', 'electricity']
  },
  {
    title: "Urban Life",
    level: 'Orta',
    text: `More than half of the world's {population} now lives in cities. Urban areas offer many {opportunities} for education, work, and culture. However, city life also comes with {problems} such as traffic congestion and air pollution. Many cities are investing in public {transport} systems to reduce these issues. Green spaces such as parks are also important for the {well-being} of city residents.`,
    options: ['population', 'opportunities', 'problems', 'transport', 'well-being', 'industry', 'activities', 'solutions', 'energy', 'health']
  },
  {
    title: "The Importance of Sleep",
    level: 'Orta',
    text: `Sleep is essential for good {health}. During sleep, the body {repairs} itself and the brain processes the day's information. Adults need between seven and nine hours of sleep each night. Lack of sleep can lead to poor {concentration}, mood changes, and a weakened immune {system}. Experts recommend {avoiding} screens before bedtime and keeping a regular sleep schedule.`,
    options: ['health', 'repairs', 'concentration', 'system', 'avoiding', 'food', 'cleans', 'memory', 'body', 'reducing']
  },
  {
    title: "Reading for Pleasure",
    level: 'Orta',
    text: `Reading is one of the most {beneficial} habits you can develop. It improves your {vocabulary} and helps you think more clearly. Reading fiction can increase your {empathy} by allowing you to experience the world through other people's eyes. Non-fiction books can teach you new {skills} and broaden your knowledge. Even just thirty minutes of reading a day can have a significant {impact} on your life.`,
    options: ['beneficial', 'vocabulary', 'empathy', 'skills', 'impact', 'dangerous', 'grammar', 'memory', 'hobbies', 'difference']
  },
  {
    title: "Fast Food Culture",
    level: 'Orta',
    text: `Fast food has become a major part of modern {culture}. It is cheap, quick, and easily {available} in most cities. However, regular consumption of fast food is linked to obesity and other health {problems}. Many restaurants are now offering healthier {options} on their menus in response to growing consumer {demand}. Cooking at home remains the healthiest and most cost-effective choice.`,
    options: ['culture', 'available', 'problems', 'options', 'demand', 'industry', 'sold', 'diseases', 'choices', 'supply']
  },
  {
    title: "Social Media and Youth",
    level: 'Orta',
    text: `Young people today spend an average of three hours a day on social {media}. These platforms help teenagers stay in touch with {friends} and discover new interests. However, studies show that excessive use can lead to {anxiety} and low self-esteem. Cyberbullying is another serious {concern}. Parents and educators encourage young people to use social media {responsibly} and take regular breaks.`,
    options: ['media', 'friends', 'anxiety', 'concern', 'responsibly', 'television', 'family', 'happiness', 'problem', 'carefully']
  },
  {
    title: "Working from Home",
    level: 'Orta',
    text: `The pandemic changed working habits around the world. Millions of people began working from {home} for the first time. Many found that they were more {productive} without the daily commute. However, some workers struggled with {isolation} and the blurring of boundaries between work and personal life. Companies are now adopting {hybrid} models that combine office and remote work. This {flexibility} has become an important factor for job seekers.`,
    options: ['home', 'productive', 'isolation', 'hybrid', 'flexibility', 'office', 'creative', 'loneliness', 'mixed', 'freedom']
  },
  {
    title: "Learning a Second Language",
    level: 'Orta',
    text: `Learning a second language has many {cognitive} benefits. Research shows that bilingual people are better at {multitasking} and problem-solving. Speaking another language also opens doors to new cultures and {opportunities}. The best time to learn a language is during {childhood}, but adults can also achieve fluency with dedication. Consistency and regular {practice} are the most important factors for success.`,
    options: ['cognitive', 'multitasking', 'opportunities', 'childhood', 'practice', 'social', 'memory', 'experiences', 'adulthood', 'study']
  },

  // ────────────────────────── İLERİ ──────────────────────────

  {
    title: "The Paradox of Choice",
    level: 'İleri',
    text: `Psychologist Barry Schwartz {argues} that having too many options can lead to decision paralysis and decreased {satisfaction}. When consumers face dozens of choices, they often experience anxiety about making the "wrong" decision. This phenomenon, known as the "paradox of choice," {suggests} that limiting options can actually increase happiness. Retailers who {curate} a smaller selection may therefore generate more loyal customers, as shoppers feel less {overwhelmed} and more confident in their purchases.`,
    options: ['argues', 'satisfaction', 'suggests', 'curate', 'overwhelmed', 'claims', 'happiness', 'implies', 'offer', 'confused']
  },
  {
    title: "Artificial Intelligence in Medicine",
    level: 'İleri',
    text: `Artificial intelligence is {transforming} diagnostic medicine at an unprecedented pace. Machine learning algorithms trained on millions of medical images can now detect certain cancers with {accuracy} that rivals experienced radiologists. However, questions remain about {accountability} when AI systems make errors. Critics also {highlight} the risk of over-reliance on technology and the potential erosion of clinical judgment. Striking the right {balance} between human expertise and algorithmic assistance remains a central challenge for the medical community.`,
    options: ['transforming', 'accuracy', 'accountability', 'highlight', 'balance', 'changing', 'speed', 'responsibility', 'warn', 'equilibrium']
  },
  {
    title: "Misinformation in the Digital Era",
    level: 'İleri',
    text: `The rapid {proliferation} of misinformation online poses a serious threat to democratic societies. False narratives spread far faster than corrections, partly because emotionally charged content is more likely to be {shared}. Platform companies face mounting pressure to {moderate} content without {infringing} upon freedom of expression. Researchers advocate for "lateral reading," a strategy where readers {verify} claims by consulting independent sources rather than relying solely on the original website.`,
    options: ['proliferation', 'shared', 'moderate', 'infringing', 'verify', 'spread', 'liked', 'control', 'violating', 'check']
  },
  {
    title: "Cognitive Biases and Decision Making",
    level: 'İleri',
    text: `Human decision-making is profoundly {shaped} by cognitive biases — systematic errors in thinking that affect our judgments. Confirmation bias leads people to {favour} information that aligns with their existing beliefs. The availability heuristic causes us to overestimate the {likelihood} of events that come easily to mind. Awareness of these biases is the first step toward more {rational} decision-making. Structured processes such as pre-mortems and devil's advocacy can help organisations {mitigate} their impact.`,
    options: ['shaped', 'favour', 'likelihood', 'rational', 'mitigate', 'influenced', 'prefer', 'probability', 'logical', 'reduce']
  },
  {
    title: "The Ethics of Gene Editing",
    level: 'İleri',
    text: `CRISPR technology has given scientists the ability to edit the human genome with {unprecedented} precision. While this holds enormous {promise} for eliminating hereditary diseases, it raises profound ethical questions. Critics fear that gene editing could be used for {enhancement} rather than therapy, creating genetic inequalities. The birth of gene-edited babies in 2018 provoked international {condemnation}, underscoring the need for robust {regulatory} frameworks before such technologies become widespread.`,
    options: ['unprecedented', 'promise', 'enhancement', 'condemnation', 'regulatory', 'unparalleled', 'potential', 'improvement', 'criticism', 'legal']
  },
  {
    title: "Urbanisation and Mental Health",
    level: 'İleri',
    text: `Research consistently links urban living with elevated rates of anxiety and {depression}, though the causal pathways remain complex. Noise pollution, overcrowding, and reduced exposure to nature are among the {proposed} mechanisms. Conversely, cities offer superior access to mental health services and social {support} networks. Urban planners increasingly recognise that incorporating green spaces and {pedestrian}-friendly designs can {mitigate} some of the psychological costs of city life, suggesting that architecture itself plays a therapeutic role.`,
    options: ['depression', 'proposed', 'support', 'pedestrian', 'mitigate', 'anxiety', 'suggested', 'care', 'bicycle', 'reduce']
  },
  {
    title: "The Future of Work",
    level: 'İleri',
    text: `Automation and artificial intelligence are poised to {disrupt} labour markets at a scale not seen since the Industrial Revolution. While technology has historically created as many jobs as it has {eliminated}, the pace of current change leaves little time for workers to {adapt}. Economists debate whether universal basic income could {cushion} the transition. Others argue that the solution lies in {reskilling} the workforce for roles that demand creativity and emotional intelligence — qualities that machines cannot easily replicate.`,
    options: ['disrupt', 'eliminated', 'adapt', 'cushion', 'reskilling', 'transform', 'destroyed', 'adjust', 'support', 'retraining']
  },
];


// ─── SPEAKING LAB — CHALLENGES ────────────────────────────────────────────
// SPEAK_CHALLENGES[difficulty] = array of English sentences to pronounce

const SPEAK_CHALLENGES = {
  easy: [
    "Hello, my name is Anna.",
    "I go to school every day.",
    "The weather is sunny today.",
    "I like to eat apples and oranges.",
    "She has a big dog named Max.",
    "We live in a small house near the park.",
    "He drinks coffee every morning.",
    "The children are playing in the garden.",
    "I read books before going to sleep.",
    "My mother is a doctor.",
    "The cat is sitting on the chair.",
    "I take the bus to work.",
    "It is raining outside today.",
    "She is learning to cook.",
    "We go to the beach every summer.",
    "I have two brothers and one sister.",
    "The supermarket is open on Sundays.",
    "He is watching television in the living room.",
    "I brush my teeth twice a day.",
    "She wakes up early every morning.",
    "The library is next to the school.",
    "We eat dinner together as a family.",
    "He plays football with his friends.",
    "I am happy to meet you.",
    "The train arrives at eight o'clock.",
    "She buys vegetables at the market.",
    "My favourite colour is blue.",
    "It is cold in winter and hot in summer.",
    "I send emails to my colleagues.",
    "He is a very good teacher.",
  ],
  medium: [
    "Technology has changed the way we communicate with each other.",
    "Regular exercise is essential for maintaining good health.",
    "She decided to learn a new language to improve her career prospects.",
    "The government introduced new regulations to reduce air pollution.",
    "Climate change is one of the most pressing issues of our time.",
    "Reading fiction can help develop empathy and emotional intelligence.",
    "He managed to complete the project ahead of the deadline.",
    "The company invested heavily in renewable energy sources.",
    "She was surprised by the results of the scientific experiment.",
    "Urban areas are experiencing rapid population growth.",
    "The quality of education varies significantly between regions.",
    "She gave an impressive presentation to the board of directors.",
    "He struggled to find a work-life balance after moving to the city.",
    "The researchers published their findings in a peer-reviewed journal.",
    "Social media platforms have a significant influence on public opinion.",
    "The new policy aims to reduce inequality and increase social mobility.",
    "She applied for a scholarship to study abroad.",
    "The documentary explored the impact of plastic pollution on marine life.",
    "He took a proactive approach to solving the team's communication problems.",
    "The survey revealed that most people prefer working from home.",
    "Developing critical thinking skills is crucial in the information age.",
    "The company launched a new product aimed at environmentally conscious consumers.",
    "She negotiated a better deal by preparing thoroughly in advance.",
    "The study found a strong correlation between sleep and academic performance.",
    "He demonstrated excellent leadership skills during the crisis.",
    "The museum's new exhibition attracted thousands of visitors.",
    "She volunteered at the local community centre every weekend.",
    "The city council proposed a new public transport initiative.",
    "He adapted quickly to the challenges of working in a new country.",
    "The report highlighted several areas for improvement in the healthcare system.",
  ],
  hard: [
    "The proliferation of misinformation online poses a fundamental threat to democratic discourse.",
    "Cognitive biases systematically distort our perception of risk and probability.",
    "The ethical implications of gene editing extend far beyond the scientific community.",
    "Economists remain divided on whether automation will ultimately create or destroy employment.",
    "The paradox of choice suggests that an abundance of options can paradoxically reduce satisfaction.",
    "Urbanisation has profoundly altered social structures and mental health outcomes across the globe.",
    "The boundary between legitimate content moderation and censorship remains deeply contentious.",
    "Achieving sustainability requires reconciling economic development with environmental stewardship.",
    "Neuroplasticity demonstrates that the adult brain retains a remarkable capacity for adaptation.",
    "The geopolitical ramifications of climate change are increasingly reshaping international relations.",
    "Artificial intelligence challenges our conventional understanding of creativity and authorship.",
    "The erosion of privacy in the digital age raises fundamental questions about individual autonomy.",
    "Socioeconomic inequality is both a driver and a consequence of inadequate educational access.",
    "The philosophical distinction between free will and determinism has profound implications for jurisprudence.",
    "Quantitative easing remains a controversial monetary policy tool with uncertain long-term consequences.",
    "The epistemological foundations of empiricism and rationalism continue to shape contemporary scientific methodology.",
    "Cultural hegemony perpetuates structural inequalities that are often invisible to those who benefit from them.",
    "The commodification of personal data has generated unprecedented wealth for a handful of technology corporations.",
    "Interdisciplinary research is increasingly essential for addressing complex, multifaceted global challenges.",
    "The rhetoric of populism frequently obscures rather than clarifies the underlying socioeconomic tensions it exploits.",
    "Regulatory frameworks for artificial intelligence must balance innovation with accountability and transparency.",
    "The tension between national sovereignty and international law is particularly acute in the context of humanitarian intervention.",
    "Postmodern critiques of metanarratives have profoundly influenced literary theory and cultural studies.",
    "The scalability of renewable energy infrastructure depends critically on advances in battery storage technology.",
    "Behavioural economics has fundamentally challenged the rational actor model that underpins classical economic theory.",
    "The phenotypic expression of complex traits is determined by an intricate interplay of genetic and environmental factors.",
    "Algorithmic amplification of extremist content raises urgent questions about platform liability and content governance.",
    "The philosophical concept of moral relativism is frequently misapplied in contemporary political discourse.",
    "Longitudinal studies provide stronger causal evidence than cross-sectional analyses, though they are considerably more resource-intensive.",
    "The symbiotic relationship between technological innovation and institutional change is central to understanding economic growth.",
  ],
};
