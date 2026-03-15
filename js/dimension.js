'use strict';

/* ================================================================
   LANGUAGE DIMENSION — Cinematic Word Exploration Engine
   ================================================================ */

const DIMENSION_DATA = [
  {
    id: 'ephemeral',
    word: 'Ephemeral',
    phonetic: '/ɪˈfem.ər.əl/',
    pos: 'adjective',
    category: 'Time',
    icon: '🌸',
    color: '#f59e0b',
    glowRgb: '245,158,11',
    coreMeaning: 'Lasting for only a very short time; transitory.',
    alternateMeanings: [
      { sense: 'Biology', meaning: 'Living for just one day — certain plants bloom and die between dawn and dusk.' },
      { sense: 'Art & culture', meaning: 'Created to exist briefly — street murals, sand sculptures, mayfly moments.' },
      { sense: 'Technology', meaning: 'Temporary data or sessions not persisted beyond their immediate use.' },
    ],
    feeling: '"Ephemeral things carry their beauty precisely because they vanish — like dawn light on water."',
    tones: ['poetic', 'wistful', 'sophisticated'],
    examples: [
      { label: 'Literary', sentence: 'The cherry blossoms are ephemeral, yet that brief beauty draws millions each spring.' },
      { label: 'Academic', sentence: 'Ephemeral wetlands provide seasonal habitat for migratory birds.' },
      { label: 'Tech', sentence: 'The server uses ephemeral containers that are destroyed after each request.' },
      { label: 'Everyday', sentence: "Fame can be ephemeral — here today, forgotten tomorrow." },
    ],
    transforms: [
      { register: 'Formal', version: 'The phenomenon is ephemeral in nature, defying sustained observation.' },
      { register: 'Poetic', version: 'Moments, ephemeral and golden, slip through open hands.' },
      { register: 'Casual', version: "It's one of those things that barely lasts — totally ephemeral." },
    ],
    related: ['transient', 'fleeting', 'momentary', 'evanescent', 'impermanent'],
    etymology: 'From Greek ephḗmeros — "lasting only a day" (epi- "on" + hēmera "day"). First used in English c.1570s for plants that bloom and die within a day.',
  },
  {
    id: 'labyrinth',
    word: 'Labyrinth',
    phonetic: '/ˈlæb.ə.rɪnθ/',
    pos: 'noun',
    category: 'Mind',
    icon: '🌀',
    color: '#00d4ff',
    glowRgb: '0,212,255',
    coreMeaning: 'A complex network of paths or tunnels in which it is difficult to find one\'s way.',
    alternateMeanings: [
      { sense: 'Figurative', meaning: 'Any deeply complex, confusing system — bureaucracy, thought, or memory.' },
      { sense: 'Anatomy', meaning: 'The intricate cavity of the inner ear responsible for balance and hearing.' },
      { sense: 'Mythology', meaning: 'The structure built by Daedalus to contain the Minotaur in ancient Crete.' },
    ],
    feeling: '"A labyrinth isn\'t just a place — it\'s a state of mind: the feeling of turning corners that lead to more corners."',
    tones: ['mysterious', 'intellectual', 'mythic'],
    examples: [
      { label: 'Mythology', sentence: 'Theseus used Ariadne\'s thread to navigate the labyrinth and slay the Minotaur.' },
      { label: 'Literary', sentence: 'Kafka\'s novels depict the labyrinth of bureaucracy trapping ordinary people.' },
      { label: 'Academic', sentence: 'The inner ear\'s labyrinth converts sound waves into neural signals.' },
      { label: 'Everyday', sentence: 'The old city\'s alleyways form a labyrinth that even locals get lost in.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The regulatory labyrinth presents significant barriers to market entry.' },
      { register: 'Poetic', version: 'I wander the labyrinth of memory, searching for a door I may have locked myself.' },
      { register: 'Casual', version: 'This IKEA is a total labyrinth — I\'ve been in here forty minutes.' },
    ],
    related: ['maze', 'meander', 'enigma', 'complexity', 'convoluted'],
    etymology: 'From Latin labyrinthus, from Greek labyrinthos — possibly pre-Greek, linked to labrys (the double-headed axe), symbol of Minoan Crete.',
  },
  {
    id: 'serendipity',
    word: 'Serendipity',
    phonetic: '/ˌser.ənˈdɪp.ɪ.ti/',
    pos: 'noun',
    category: 'Emotion',
    icon: '✨',
    color: '#f43f5e',
    glowRgb: '244,63,94',
    coreMeaning: 'The occurrence of fortunate events by chance — a happy, unexpected discovery.',
    alternateMeanings: [
      { sense: 'Science', meaning: 'Many landmark discoveries (penicillin, X-rays, Post-it notes) happened through serendipity.' },
      { sense: 'Travel', meaning: 'The delight of stumbling onto an unmarked café that becomes a favorite memory.' },
      { sense: 'Relationships', meaning: 'Meeting someone life-changing purely by accident — a missed train, a wrong turn.' },
    ],
    feeling: '"Serendipity is the universe\'s gentle reminder that not everything worth finding can be planned."',
    tones: ['joyful', 'warm', 'philosophical'],
    examples: [
      { label: 'Science', sentence: 'Fleming\'s discovery of penicillin was pure serendipity — a contaminated petri dish changed medicine.' },
      { label: 'Romantic', sentence: 'Their meeting was serendipity — she\'d taken the wrong train and sat beside him.' },
      { label: 'Academic', sentence: 'Researchers must remain alert to serendipitous findings that challenge their hypotheses.' },
      { label: 'Everyday', sentence: 'Finding that bookshop was pure serendipity — exactly what I needed, exactly then.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The discovery arose through serendipitous circumstances rather than deliberate inquiry.' },
      { register: 'Poetic', version: 'Serendipity — the universe\'s way of whispering: you are exactly where you should be.' },
      { register: 'Casual', version: 'It was total serendipity that I ran into you today!' },
    ],
    related: ['fortuitous', 'providence', 'kismet', 'happenstance', 'chance'],
    etymology: 'Coined by Horace Walpole in 1754, from the Persian fairy tale "The Three Princes of Serendip" (old name for Sri Lanka), whose heroes made discoveries by accident and sagacity.',
  },
  {
    id: 'melancholy',
    word: 'Melancholy',
    phonetic: '/ˈmel.ən.kɒl.i/',
    pos: 'noun / adjective',
    category: 'Emotion',
    icon: '🌧️',
    color: '#f43f5e',
    glowRgb: '244,63,94',
    coreMeaning: 'A deep, pensive sadness — thoughtful and reflective rather than sharp grief.',
    alternateMeanings: [
      { sense: 'Ancient medicine', meaning: 'One of four humors — black bile believed to cause depression and introspection.' },
      { sense: 'Art & music', meaning: 'A cherished aesthetic — melancholy beauty in autumn light, minor keys, or rain.' },
      { sense: 'Philosophy', meaning: 'For Aristotle, melancholy was linked to genius; creative souls were seen as melancholic.' },
    ],
    feeling: '"Melancholy is not simple sadness — it has depth, texture, even a strange beauty. It is the feeling of feeling things deeply."',
    tones: ['contemplative', 'tender', 'artistic'],
    examples: [
      { label: 'Literary', sentence: 'Keats celebrated melancholy in his odes — sorrow as a gateway to deeper appreciation of beauty.' },
      { label: 'Music', sentence: 'Chet Baker\'s trumpet carried an unmistakable melancholy that made his listeners ache.' },
      { label: 'Everyday', sentence: 'There\'s a gentle melancholy to the last days of summer.' },
      { label: 'Academic', sentence: 'Medieval scholars associated melancholy with Saturn and the intellectual temperament.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The subject exhibited signs of protracted melancholic affect.' },
      { register: 'Poetic', version: 'She wore her melancholy like silk — quietly, beautifully, visible only in certain light.' },
      { register: 'Casual', version: 'I get this weird melancholy every time a season changes.' },
    ],
    related: ['wistful', 'pensive', 'somber', 'rueful', 'elegiac'],
    etymology: 'From Greek melankholía — melas ("black") + kholē ("bile"). Ancient Greeks believed excess black bile caused deep sadness and introspection.',
  },
  {
    id: 'resilience',
    word: 'Resilience',
    phonetic: '/rɪˈzɪl.i.əns/',
    pos: 'noun',
    category: 'Strength',
    icon: '🔥',
    color: '#7c3aed',
    glowRgb: '124,58,237',
    coreMeaning: 'The capacity to recover quickly from difficulties; toughness of spirit.',
    alternateMeanings: [
      { sense: 'Engineering', meaning: 'A material\'s ability to absorb energy and return to its original shape without permanent deformation.' },
      { sense: 'Ecology', meaning: 'An ecosystem\'s ability to recover after disturbances like drought or wildfire.' },
      { sense: 'Psychology', meaning: 'The mental capacity to adapt to trauma, adversity, and significant stress.' },
    ],
    feeling: '"Resilience isn\'t the absence of struggle — it\'s the decision, made again and again, to keep going."',
    tones: ['empowering', 'grounded', 'hopeful'],
    examples: [
      { label: 'Personal', sentence: 'Her resilience through loss inspired everyone around her.' },
      { label: 'Academic', sentence: 'Community resilience depends on social capital and distributed resources.' },
      { label: 'Engineering', sentence: 'Carbon fiber\'s resilience makes it ideal for aerospace applications.' },
      { label: 'Leadership', sentence: 'The CEO credited resilience as the team\'s greatest asset during the crisis.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The organization demonstrated remarkable institutional resilience during the transition.' },
      { register: 'Poetic', version: 'She bent like river grass in storms — always rooted, always rising.' },
      { register: 'Casual', version: 'She just bounces back from everything. Incredible resilience.' },
    ],
    related: ['tenacity', 'fortitude', 'perseverance', 'grit', 'endurance'],
    etymology: 'From Latin resilire — "to spring back" (re- "back" + salire "to jump"). The physical sense of elasticity came first; psychological use developed later.',
  },
  {
    id: 'luminous',
    word: 'Luminous',
    phonetic: '/ˈluː.mɪ.nəs/',
    pos: 'adjective',
    category: 'Nature',
    icon: '🌟',
    color: '#10b981',
    glowRgb: '16,185,129',
    coreMeaning: 'Emitting or reflecting light; radiantly bright or shining.',
    alternateMeanings: [
      { sense: 'Figurative', meaning: 'Brilliantly clear or enlightened in intellect, beauty, or expression.' },
      { sense: 'Art criticism', meaning: 'Luminosity in painting — the sense that light emanates from within the canvas itself.' },
      { sense: 'Astronomy', meaning: 'Luminosity measures the total energy output of a star per unit time.' },
    ],
    feeling: '"To call something luminous is to say it carries its own light — that it illuminates everything nearby."',
    tones: ['radiant', 'elegant', 'celebratory'],
    examples: [
      { label: 'Nature', sentence: 'The luminous glow of fireflies turned the summer meadow into a living light show.' },
      { label: 'Art', sentence: 'Vermeer\'s luminous interiors seem to generate light from within the canvas itself.' },
      { label: 'Academic', sentence: 'Astronomers calculate a star\'s luminous intensity to determine its total energy output.' },
      { label: 'Personal', sentence: 'She had a luminous quality — a kind of inner glow that drew people toward her.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The painting is distinguished by its luminous treatment of natural light.' },
      { register: 'Poetic', version: 'Your mind — luminous and endless — holds stars I have not yet named.' },
      { register: 'Casual', version: 'The city lights were absolutely luminous reflected on the water.' },
    ],
    related: ['radiant', 'incandescent', 'effulgent', 'brilliant', 'gleaming'],
    etymology: 'From Latin luminosus — "full of light," from lumen, luminis ("light"). Related to luna (moon) and illuminate. The root lux also gives luxury — original meaning: light, brightness.',
  },
  {
    id: 'tenacious',
    word: 'Tenacious',
    phonetic: '/tɪˈneɪ.ʃəs/',
    pos: 'adjective',
    category: 'Strength',
    icon: '⚡',
    color: '#7c3aed',
    glowRgb: '124,58,237',
    coreMeaning: 'Holding fast; persistent and determined; not giving up.',
    alternateMeanings: [
      { sense: 'Physics', meaning: 'A material\'s tenacity — its resistance to tearing and toughness under sustained tension.' },
      { sense: 'Memory', meaning: 'A tenacious memory retains information firmly and refuses to release it.' },
      { sense: 'Negative nuance', meaning: 'Can describe stubborn clinging — a tenacious grudge, a tenacious false belief.' },
    ],
    feeling: '"Tenacious: the word itself holds on — four syllables that refuse to let go."',
    tones: ['determined', 'forceful', 'admiring'],
    examples: [
      { label: 'Sports', sentence: 'Her tenacious defense wore down the opponent over three grueling sets.' },
      { label: 'Business', sentence: 'His tenacious pursuit of the deal paid off after eighteen months of negotiation.' },
      { label: 'Academic', sentence: 'Barnacles are tenacious organisms that adhere to surfaces with extraordinary force.' },
      { label: 'Negative', sentence: 'The tenacious rumor refused to die despite being publicly debunked.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The attorney mounted a tenacious defense against substantial evidence.' },
      { register: 'Poetic', version: 'Like lichen on granite — tenacious, patient, slow-growing into permanence.' },
      { register: 'Casual', version: 'She\'s so tenacious. She just never, ever quits.' },
    ],
    related: ['resolute', 'persistent', 'dogged', 'steadfast', 'indomitable'],
    etymology: 'From Latin tenax (genitive tenacis) — "holding fast," from tenere "to hold." Related to tenant (one who holds land), tenure, and tenable.',
  },
  {
    id: 'cascade',
    word: 'Cascade',
    phonetic: '/kæˈskeɪd/',
    pos: 'noun / verb',
    category: 'Nature',
    icon: '💧',
    color: '#10b981',
    glowRgb: '16,185,129',
    coreMeaning: 'A small waterfall, or a series of falls; to fall or pour in a continuous rush.',
    alternateMeanings: [
      { sense: 'Technology', meaning: 'A cascade of failures — each triggering the next in a chain reaction across systems.' },
      { sense: 'Chemistry', meaning: 'A cascade reaction: a sequence where each product becomes the reagent for the next step.' },
      { sense: 'Design', meaning: 'Fabric that cascades in soft, flowing folds — elegant and effortless movement.' },
    ],
    feeling: '"Cascade captures movement and inevitability — the beautiful chain of one thing flowing into another."',
    tones: ['flowing', 'dynamic', 'elemental'],
    examples: [
      { label: 'Nature', sentence: 'The waterfall cascaded over mossy rocks into a clear mountain pool below.' },
      { label: 'Tech', sentence: 'A single server failure triggered a cascade of outages across the network.' },
      { label: 'Everyday', sentence: 'Notifications cascaded across her screen faster than she could read them.' },
      { label: 'Design', sentence: 'The gown\'s silk cascaded to the floor in perfect ivory waves.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The regulatory changes triggered a cascade effect throughout the industry.' },
      { register: 'Poetic', version: 'Words cascaded from her, unstoppable — a river finally finding its sea.' },
      { register: 'Casual', version: 'The whole thing cascaded out of control pretty fast.' },
    ],
    related: ['torrent', 'surge', 'deluge', 'ripple', 'avalanche'],
    etymology: 'From French cascade, from Italian cascata — "a fall," from cascare "to fall," from Latin cadere "to fall." Related to cadence, decadent, and accident.',
  },
  {
    id: 'enigmatic',
    word: 'Enigmatic',
    phonetic: '/ˌen.ɪɡˈmæt.ɪk/',
    pos: 'adjective',
    category: 'Mind',
    icon: '🌌',
    color: '#00d4ff',
    glowRgb: '0,212,255',
    coreMeaning: 'Difficult to understand or interpret; mysterious; puzzling.',
    alternateMeanings: [
      { sense: 'People', meaning: 'An enigmatic person deliberately reveals little, keeping others curious and fascinated.' },
      { sense: 'Art', meaning: 'Enigmatic artworks resist easy interpretation — they mean differently to everyone.' },
      { sense: 'Positive vs. negative', meaning: 'Can be magnetic (an enigmatic smile) or frustrating (an enigmatic refusal to explain).' },
    ],
    feeling: '"Enigmatic things draw you in precisely because they won\'t fully reveal themselves. Mystery as invitation."',
    tones: ['mysterious', 'alluring', 'intellectual'],
    examples: [
      { label: 'Art', sentence: 'The Mona Lisa\'s enigmatic smile has inspired five centuries of debate.' },
      { label: 'Personal', sentence: 'He remained enigmatic throughout the interview, answering every question with another question.' },
      { label: 'Science', sentence: 'Dark matter remains enigmatic — detectable only by its gravitational effects.' },
      { label: 'Literary', sentence: 'Pynchon\'s novels are deliberately enigmatic, rewarding patient readers with buried patterns.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The inscription\'s enigmatic character has defied scholarly interpretation for decades.' },
      { register: 'Poetic', version: 'Enigmatic — like the space between two notes where music actually lives.' },
      { register: 'Casual', version: 'She\'s so enigmatic. You never know what she\'s actually thinking.' },
    ],
    related: ['cryptic', 'inscrutable', 'arcane', 'abstruse', 'mysterious'],
    etymology: 'From Latin aenigma, from Greek aínigma — "a riddle," from aínissesthai "to speak in riddles," from ainos "tale, story."',
  },
  {
    id: 'solace',
    word: 'Solace',
    phonetic: '/ˈsɒl.ɪs/',
    pos: 'noun / verb',
    category: 'Emotion',
    icon: '🕊️',
    color: '#f43f5e',
    glowRgb: '244,63,94',
    coreMeaning: 'Comfort or consolation in a time of distress or sadness.',
    alternateMeanings: [
      { sense: 'Active form (verb)', meaning: 'To solace someone is to actively bring comfort — to be a source of peace.' },
      { sense: 'Spiritual', meaning: 'The belief that meaning, prayer, or nature can offer solace that human words cannot.' },
      { sense: 'Literature', meaning: 'Solace literature — works that offer healing and comfort to grieving readers.' },
    ],
    feeling: '"Solace is the warm hand placed on a shoulder when words have run out. It asks nothing. It simply stays."',
    tones: ['tender', 'healing', 'gentle'],
    examples: [
      { label: 'Personal', sentence: 'She found solace in long walks and the quiet company of her garden.' },
      { label: 'Literary', sentence: 'Music was his solace through the darkest years of his illness.' },
      { label: 'Spiritual', sentence: 'For many, prayer offers solace that no human counsel can provide.' },
      { label: 'Everyday', sentence: 'She sought solace in old photographs, searching for a version of herself she recognized.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The foundation provides solace and resources for bereaved families.' },
      { register: 'Poetic', version: 'I looked for solace in the stars — they answered with silence and stayed.' },
      { register: 'Casual', version: 'Coffee is my solace on Monday mornings.' },
    ],
    related: ['consolation', 'comfort', 'refuge', 'succor', 'balm'],
    etymology: 'From Old French solas, from Latin solatium — "comfort, solace," from solari "to console." Related to consolation and inconsolable.',
  },
  {
    id: 'wander',
    word: 'Wander',
    phonetic: '/ˈwɒn.də/',
    pos: 'verb / noun',
    category: 'Nature',
    icon: '🍃',
    color: '#10b981',
    glowRgb: '16,185,129',
    coreMeaning: 'To walk or move without a fixed direction; to roam without a destination.',
    alternateMeanings: [
      { sense: 'Mind', meaning: 'When attention wanders, thoughts drift freely — sometimes the source of creative breakthroughs.' },
      { sense: 'Narrative', meaning: 'A wandering plot — one that moves non-linearly, discovering itself as it goes.' },
      { sense: 'Positive reframe', meaning: 'Not all wandering is lost — intentional wandering (flânerie) is an art form in itself.' },
    ],
    feeling: '"To wander is to trust that the path will reveal itself. It is motion without demand, freedom without destination."',
    tones: ['free', 'contemplative', 'romantic'],
    examples: [
      { label: 'Travel', sentence: 'We wandered through Lisbon\'s hills for hours, finding cafés and courtyards by accident.' },
      { label: 'Mind', sentence: 'Her mind wandered during the lecture, finding far more interesting territory on its own.' },
      { label: 'Literary', sentence: 'Wordsworth wandered through the Lake District, turning landscape into poetry.' },
      { label: 'Everyday', sentence: 'Sometimes I just wander through the city with no plan. Best days.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The subject displays a tendency to wander from the stated thesis.' },
      { register: 'Poetic', version: 'I wander not because I am lost — but because some truths only show themselves to those in motion.' },
      { register: 'Casual', version: 'I just wandered around the market for an hour. Loved it.' },
    ],
    related: ['roam', 'meander', 'drift', 'ramble', 'stray'],
    etymology: 'Old English wandrian — "to wander, roam." Related to German wandern (to hike). Shares roots with wind (to turn) — both suggest curving, non-linear movement.',
  },
  {
    id: 'fracture',
    word: 'Fracture',
    phonetic: '/ˈfræk.tʃər/',
    pos: 'noun / verb',
    category: 'Strength',
    icon: '💎',
    color: '#7c3aed',
    glowRgb: '124,58,237',
    coreMeaning: 'A crack or break, especially in bone or rock; to crack or break under stress.',
    alternateMeanings: [
      { sense: 'Social', meaning: 'Social fractures — divisions along class, race, or ideology that fragment communities.' },
      { sense: 'Geology', meaning: 'A fracture zone — where tectonic plates have broken and shifted, creating dramatic terrain.' },
      { sense: 'Emotional', meaning: 'A fractured relationship — not fully broken, but cracked, the damage visible in every interaction.' },
    ],
    feeling: '"A fracture is not always destruction. Sometimes what cracks open is what lets light in — or lets what was trapped, out."',
    tones: ['intense', 'complex', 'honest'],
    examples: [
      { label: 'Medical', sentence: 'The X-ray revealed a hairline fracture in the left radius.' },
      { label: 'Social', sentence: 'The election exposed deep fractures in the country\'s political identity.' },
      { label: 'Personal', sentence: 'Their friendship was fractured after the argument — polite but never the same.' },
      { label: 'Geological', sentence: 'The San Andreas Fault is Earth\'s most famous fracture zone.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The incident fractured the coalition\'s unity beyond repair.' },
      { register: 'Poetic', version: 'We were fractured — and the light poured in through every break we made.' },
      { register: 'Casual', version: 'That fight really fractured things between them.' },
    ],
    related: ['rupture', 'fissure', 'schism', 'breach', 'splinter'],
    etymology: 'From Latin fractura — "a breach, cleft," from frangere "to break." Related to fragile, fragment, infraction, and refraction (light "breaking" as it bends).',
  },
  {
    id: 'infinite',
    word: 'Infinite',
    phonetic: '/ˈɪn.fɪ.nɪt/',
    pos: 'adjective / noun',
    category: 'Mind',
    icon: '♾️',
    color: '#00d4ff',
    glowRgb: '0,212,255',
    coreMeaning: 'Limitless; without end, boundary, or edge.',
    alternateMeanings: [
      { sense: 'Mathematics', meaning: 'Cantor showed that some infinities are larger than others. ∞ is a concept, not a number.' },
      { sense: 'Philosophy', meaning: 'The infinite has haunted philosophy since ancient Greece — is the universe infinite? Is time?' },
      { sense: 'Everyday exaggeration', meaning: '"I have infinite patience" — colloquially means extremely great, not literally limitless.' },
    ],
    feeling: '"The word \'infinite\' has a strange effect on the mind — it opens a door that cannot be closed, into a room with no walls."',
    tones: ['awe-inspiring', 'philosophical', 'expansive'],
    examples: [
      { label: 'Mathematical', sentence: 'Between any two real numbers lie infinitely many others — an infinite density.' },
      { label: 'Cosmic', sentence: 'Whether the universe is truly infinite remains one of physics\' deepest open questions.' },
      { label: 'Philosophical', sentence: 'Pascal wrote of feeling lost between the infinite and the infinitesimal.' },
      { label: 'Everyday', sentence: 'She had infinite patience with her students, never once losing her calm.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The dataset presents an effectively infinite solution space for optimization.' },
      { register: 'Poetic', version: 'You are made of infinite — the same stuff as galaxies and the pause between heartbeats.' },
      { register: 'Casual', version: 'There are literally infinite options. It\'s overwhelming.' },
    ],
    related: ['boundless', 'eternal', 'immeasurable', 'limitless', 'inexhaustible'],
    etymology: 'From Latin infinitus — "unbounded" (in- "not" + finitus "finished, bounded"). Finis meant "end, boundary" — so infinite is simply "without end."',
  },
  {
    id: 'vehement',
    word: 'Vehement',
    phonetic: '/ˈviː.ɪ.mənt/',
    pos: 'adjective',
    category: 'Strength',
    icon: '🌊',
    color: '#7c3aed',
    glowRgb: '124,58,237',
    coreMeaning: 'Showing strong feeling; forceful, passionate, or intense in expression.',
    alternateMeanings: [
      { sense: 'Rhetoric', meaning: 'A vehement argument — delivered with such conviction it compels attention even if it doesn\'t persuade.' },
      { sense: 'Physical', meaning: 'Vehement winds, storms — physical forces of unusual and unsettling intensity.' },
      { sense: 'Negative nuance', meaning: 'Vehemence can suggest lack of control — passion that overshoots reason.' },
    ],
    feeling: '"Vehement: this is what conviction sounds like when it has run out of patience with subtlety."',
    tones: ['intense', 'passionate', 'forceful'],
    examples: [
      { label: 'Political', sentence: 'She was a vehement critic of the policy, speaking out at every public forum.' },
      { label: 'Personal', sentence: 'He vehemently denied the accusation, his voice rising with each word.' },
      { label: 'Literary', sentence: 'The characters\' vehement arguments crackle with an energy that drives the whole play.' },
      { label: 'Nature', sentence: 'The vehement storm stripped leaves from every tree on the mountain.' },
    ],
    transforms: [
      { register: 'Formal', version: 'The committee expressed its vehement opposition to the proposed amendment.' },
      { register: 'Poetic', version: 'Vehement — like the first crack of thunder that makes you realize how long you\'d been holding your breath.' },
      { register: 'Casual', version: 'She was so vehement about it. Like, it clearly really mattered to her.' },
    ],
    related: ['fervent', 'impassioned', 'ardent', 'fierce', 'zealous'],
    etymology: 'From Latin vehemens — "violent, furious, eager." Possibly from ve- (intensive prefix) + mens "mind" — carried away in one\'s mind. Or from vehere "to carry" — swept along by emotion.',
  },
  {
    id: 'whisper',
    word: 'Whisper',
    phonetic: '/ˈwɪs.pər/',
    pos: 'verb / noun',
    category: 'Emotion',
    icon: '🌬️',
    color: '#f43f5e',
    glowRgb: '244,63,94',
    coreMeaning: 'To speak very softly, using breath rather than voice; a soft, hushed sound.',
    alternateMeanings: [
      { sense: 'Figurative', meaning: 'A whisper of color, a whisper of doubt — something barely present, on the edge of perception.' },
      { sense: 'Nature', meaning: 'The whisper of wind through grass — sound as texture, as atmosphere, as presence.' },
      { sense: 'Secrecy', meaning: 'Whispers carry weight precisely because they are hushed — the quieter the voice, the more significant the words seem.' },
    ],
    feeling: '"A whisper forces you to lean in, to pay closer attention. It is intimacy by volume."',
    tones: ['intimate', 'delicate', 'evocative'],
    examples: [
      { label: 'Personal', sentence: 'She whispered his name in the dark, not wanting to wake the others.' },
      { label: 'Nature', sentence: 'The aspen leaves whispered in the wind, making the forest sound like it was breathing.' },
      { label: 'Figurative', sentence: 'There was a whisper of regret in his voice when he spoke about leaving.' },
      { label: 'Literary', sentence: 'The whole novel builds to a climax delivered not in drama, but in a whisper.' },
    ],
    transforms: [
      { register: 'Formal', version: 'There are whispers within the organization of significant leadership changes ahead.' },
      { register: 'Poetic', version: 'Even the universe whispers — in radio waves, in gravity, in the hum beneath all sound.' },
      { register: 'Casual', version: 'I heard this whispered rumor that they\'re closing the place down.' },
    ],
    related: ['murmur', 'breathe', 'hush', 'susurrus', 'intimate'],
    etymology: 'Old English hwisprian — "to whisper, murmur." An onomatopoeic word — the breath of the word itself echoes its meaning. Related to Old Norse hvísla.',
  },
];

/* ================================================================
   LANGUAGE DIMENSION MODE
   ================================================================ */

class LanguageDimensionMode {
  constructor(app) {
    this.app  = app;
    this.root = null;
    this._panel    = null;
    this._backdrop = null;
    this._boundKey = this._handleKey.bind(this);
  }

  init(root) {
    this.root = root;
    root.innerHTML = this._renderShell();
    this._panel    = root.querySelector('.dim-panel');
    this._backdrop = root.querySelector('.dim-panel-backdrop');

    this._showEntryCard();

    root.querySelector('#dim-enter-btn')?.addEventListener('click', () => this._enterGrid());
    root.addEventListener('click', (e) => this._handleClick(e));
    this._backdrop?.addEventListener('click', () => this._closePanel());
    document.addEventListener('keydown', this._boundKey);
  }

  destroy() {
    document.removeEventListener('keydown', this._boundKey);
    document.body.style.overflow = '';
    this.root = null;
  }

  /* ------------------------------------------------------------------ */
  /*  Shell                                                               */
  /* ------------------------------------------------------------------ */
  _renderShell() {
    return `
<div class="dim-root">
  <div class="dim-ambient">
    <div class="dim-orb-1"></div>
    <div class="dim-orb-2"></div>
    <div class="dim-orb-3"></div>
    <div class="dim-orb-4"></div>
  </div>
  <div class="dim-grid-overlay"></div>

  <!-- Entry portal -->
  <div class="dim-entry-card" id="dim-entry-card">
    <div class="dim-entry-glow"></div>
    <div class="dim-entry-content">
      <div class="dim-entry-icon">🌌</div>
      <h1 class="dim-entry-title">Language<br><em>Dimension</em></h1>
      <p class="dim-entry-sub">Enter the cinematic space where words reveal their full depth — meaning, feeling, history, and transformation.</p>
      <button class="dim-enter-btn" id="dim-enter-btn">
        <span class="dim-enter-icon">✦</span> Begin Exploration
      </button>
      <div class="dim-entry-stats">
        <span>${DIMENSION_DATA.length} words</span>
        <span class="dim-entry-dot">·</span>
        <span>5 categories</span>
        <span class="dim-entry-dot">·</span>
        <span>Deep meanings</span>
      </div>
    </div>
  </div>

  <!-- Main view -->
  <div class="dim-view" id="dim-view" style="display:none;">
    <div class="dim-hero">
      <h2 class="dim-hero-title">Language <span class="dim-hero-em">Dimension</span></h2>
      <p class="dim-hero-sub">Explore the living architecture of English words</p>
    </div>
    <div class="dim-filter-bar">
      <button class="dim-filter-btn active" data-filter="all">All Words</button>
      <button class="dim-filter-btn" data-filter="Emotion">Emotion</button>
      <button class="dim-filter-btn" data-filter="Mind">Mind</button>
      <button class="dim-filter-btn" data-filter="Nature">Nature</button>
      <button class="dim-filter-btn" data-filter="Strength">Strength</button>
      <button class="dim-filter-btn" data-filter="Time">Time</button>
    </div>
    <div class="dim-grid" id="dim-grid"></div>
  </div>

  <!-- Expanded panel -->
  <div class="dim-panel-backdrop"></div>
  <div class="dim-panel" id="dim-panel">
    <div class="dim-panel-inner" id="dim-panel-inner"></div>
  </div>
</div>`;
  }

  /* ------------------------------------------------------------------ */
  /*  Entry card                                                          */
  /* ------------------------------------------------------------------ */
  _showEntryCard() {
    const card = this.root.querySelector('#dim-entry-card');
    if (card) requestAnimationFrame(() => card.classList.add('dim-entry-visible'));
  }

  _enterGrid() {
    const entry = this.root.querySelector('#dim-entry-card');
    const view  = this.root.querySelector('#dim-view');
    if (!entry || !view) return;
    entry.classList.add('dim-entry-exit');
    setTimeout(() => {
      entry.style.display = 'none';
      view.style.display  = 'block';
      requestAnimationFrame(() => {
        view.classList.add('dim-view-visible');
        this._buildGrid('all');
      });
    }, 500);
  }

  /* ------------------------------------------------------------------ */
  /*  Grid                                                                */
  /* ------------------------------------------------------------------ */
  _buildGrid(filter) {
    const grid = this.root.querySelector('#dim-grid');
    if (!grid) return;
    const items = filter === 'all'
      ? DIMENSION_DATA
      : DIMENSION_DATA.filter(d => d.category === filter);
    grid.innerHTML = '';
    items.forEach((item, i) => grid.appendChild(this._makeCard(item, i)));
  }

  _makeCard(item, index) {
    const el = document.createElement('div');
    el.className  = 'dim-card';
    el.dataset.id = item.id;
    el.style.cssText = `--card-color:${item.color};--card-rgb:${item.glowRgb};animation-delay:${index * 55}ms`;
    el.innerHTML = `
      <div class="dim-card-top">
        <span class="dim-card-icon">${item.icon}</span>
        <span class="dim-card-cat">${item.category}</span>
      </div>
      <div class="dim-card-word">${item.word}</div>
      <div class="dim-card-phonetic">${item.phonetic}</div>
      <div class="dim-card-pos">${item.pos}</div>
      <p class="dim-card-meaning">${item.coreMeaning}</p>
      <div class="dim-card-tones">
        ${item.tones.map(t => `<span class="dim-tone-tag">${t}</span>`).join('')}
      </div>
      <div class="dim-card-cta">Explore <span>→</span></div>`;
    return el;
  }

  /* ------------------------------------------------------------------ */
  /*  Panel                                                               */
  /* ------------------------------------------------------------------ */
  _expandWord(id) {
    const item = DIMENSION_DATA.find(d => d.id === id);
    if (!item) return;
    const inner = this.root.querySelector('#dim-panel-inner');
    if (!inner) return;

    inner.innerHTML = this._renderPanel(item);
    this._panel.style.setProperty('--panel-color', item.color);
    this._panel.style.setProperty('--panel-rgb', item.glowRgb);

    // Related chip navigation
    inner.querySelectorAll('.dim-related-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const rel = DIMENSION_DATA.find(d => d.word.toLowerCase() === chip.dataset.word.toLowerCase());
        if (rel) this._expandWord(rel.id);
        else {
          // Scroll to top and filter if not found in current view
          inner.scrollTop = 0;
        }
      });
    });

    requestAnimationFrame(() => {
      this._backdrop.classList.add('dim-backdrop-visible');
      this._panel.classList.add('dim-panel-open');
      inner.scrollTop = 0;
    });
    document.body.style.overflow = 'hidden';
  }

  _renderPanel(item) {
    const altRows = item.alternateMeanings.map(m => `
      <div class="dim-alt-row">
        <div class="dim-alt-sense">${m.sense}</div>
        <div class="dim-alt-text">${m.meaning}</div>
      </div>`).join('');

    const examples = item.examples.map(e => `
      <div class="dim-example-row">
        <span class="dim-ex-label">${e.label}</span>
        <p class="dim-ex-sentence">&ldquo;${e.sentence}&rdquo;</p>
      </div>`).join('');

    const transforms = item.transforms.map(t => `
      <div class="dim-transform-card">
        <div class="dim-tf-register">${t.register}</div>
        <p class="dim-tf-text">${t.version || t.sentence}</p>
      </div>`).join('');

    const related = item.related.map(w => `
      <span class="dim-related-chip" data-word="${w}">${w}</span>`).join('');

    return `
      <div class="dim-panel-header">
        <button class="dim-panel-close" data-action="close-panel" aria-label="Close">✕</button>
        <div class="dim-panel-icon">${item.icon}</div>
        <div class="dim-panel-word">${item.word}</div>
        <div class="dim-panel-phonetic">${item.phonetic}</div>
        <div class="dim-panel-meta">
          <span class="dim-panel-pos">${item.pos}</span>
          <span class="dim-panel-cat-badge">${item.category}</span>
        </div>
      </div>

      <div class="dim-panel-body">

        <section class="dim-section">
          <div class="dim-section-label">Core Meaning</div>
          <p class="dim-core-text">${item.coreMeaning}</p>
        </section>

        <section class="dim-section dim-feeling-section">
          <div class="dim-section-label">Feeling &amp; Tone</div>
          <blockquote class="dim-feeling-quote">${item.feeling}</blockquote>
          <div class="dim-tone-row">
            ${item.tones.map(t => `<span class="dim-tone-pill">${t}</span>`).join('')}
          </div>
        </section>

        <section class="dim-section">
          <div class="dim-section-label">Alternate Meanings</div>
          <div class="dim-alt-list">${altRows}</div>
        </section>

        <section class="dim-section">
          <div class="dim-section-label">Sentence Transformation</div>
          <div class="dim-transforms">${transforms}</div>
        </section>

        <section class="dim-section">
          <div class="dim-section-label">In Context</div>
          <div class="dim-examples">${examples}</div>
        </section>

        <section class="dim-section">
          <div class="dim-section-label">Related Words</div>
          <div class="dim-related-chips">${related}</div>
        </section>

        <section class="dim-section dim-etym-section">
          <div class="dim-section-label">Etymology</div>
          <p class="dim-etym-text">${item.etymology}</p>
        </section>

      </div>`;
  }

  _closePanel() {
    this._panel?.classList.remove('dim-panel-open');
    this._backdrop?.classList.remove('dim-backdrop-visible');
    document.body.style.overflow = '';
  }

  /* ------------------------------------------------------------------ */
  /*  Events                                                              */
  /* ------------------------------------------------------------------ */
  _handleClick(e) {
    const filterBtn = e.target.closest('.dim-filter-btn');
    if (filterBtn) {
      this.root.querySelectorAll('.dim-filter-btn').forEach(b => b.classList.remove('active'));
      filterBtn.classList.add('active');
      this._buildGrid(filterBtn.dataset.filter);
      return;
    }
    const card = e.target.closest('.dim-card');
    if (card) { this._expandWord(card.dataset.id); return; }
    if (e.target.closest('[data-action="close-panel"]')) { this._closePanel(); return; }
  }

  _handleKey(e) {
    if (e.key === 'Escape') this._closePanel();
  }
}
