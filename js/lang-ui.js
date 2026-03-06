'use strict';
/* ============================================================
   English Rhapsody — UI Language Strings
   Supported: TR (Turkish) · EN (English) · ES (Spanish)
   ============================================================ */

const LANG_UI = {
  tr: {
    // Navigation
    nav_home:     'Ana Sayfa',
    nav_reading:  'Okuma',
    nav_speak:    'Konuşma',
    nav_learn:    'Pratik',
    nav_settings: 'Ayarlar',

    // Reading Workshop
    reading_title:    'Okuma Atölyesi',
    reading_subtitle: 'Gerçek metinlerle bağlamı hisset, kelimeleri yaşa.',
    reading_mode_read: '📚 Okuma',
    reading_mode_quiz: '🧩 Egzersiz',
    reading_listen:    '🎧 Sesli Dinle',
    reading_stop:      '🛑 Durdur',
    reading_prev:      '← Önceki',
    reading_next:      'Sonraki →',
    reading_shuffle:   '🔀 Karıştır',
    level_easy:        '🌱 Kolay',
    level_mid:         '📚 Orta',
    level_adv:         '🔥 İleri',
    no_content:        'İçerik bulunamadı.',

    // Speaking Module
    speak_title:       'Konuşma Pratiği',
    speak_subtitle:    'Telaffuz ve vurgunu geliştir.',

    // Learn / Practice Module
    learn_title:       'Kelime Pratiği',

    // Settings
    settings_title:    'Ayarlar',
    settings_lang:     'Arayüz Dili',
    settings_theme:    'Tema',
    settings_reset:    'Sıfırla',

    // Popup word type labels
    type_word:         'Kelime',
    type_phrasal:      'Phrasal Verb',
    type_idiom:        'Deyim',
    type_grammar:      'Gramer Kalıbı',
    type_verb_pattern: 'Eylem Kalıbı',
    type_noun_phrase:  'İsim Tamlaması',
    type_phrase:       'İfade',

    // Popup labels
    popup_meaning:     'Anlam',
    popup_example:     'Örnek',
    popup_no_entry:    'Bu kelime şu an veritabanında yok',

    // Quiz / Cloze
    quiz_correct:      '✓ Doğru!',
    quiz_wrong:        '✗ Yanlış',
    quiz_fill:         'Boşluğu doldurun',

    // Misc
    xp_label:          'XP',
    streak_label:      '🔥 Seri',
    loading:           'Yükleniyor…',
  },

  en: {
    // Navigation
    nav_home:     'Home',
    nav_reading:  'Reading',
    nav_speak:    'Speaking',
    nav_learn:    'Practice',
    nav_settings: 'Settings',

    // Reading Workshop
    reading_title:    'Reading Workshop',
    reading_subtitle: 'Feel the context through real texts, live the words.',
    reading_mode_read: '📚 Read',
    reading_mode_quiz: '🧩 Exercise',
    reading_listen:    '🎧 Listen',
    reading_stop:      '🛑 Stop',
    reading_prev:      '← Previous',
    reading_next:      'Next →',
    reading_shuffle:   '🔀 Shuffle',
    level_easy:        '🌱 Easy',
    level_mid:         '📚 Medium',
    level_adv:         '🔥 Advanced',
    no_content:        'No content found.',

    // Speaking Module
    speak_title:       'Speaking Practice',
    speak_subtitle:    'Improve your pronunciation and intonation.',

    // Learn / Practice Module
    learn_title:       'Vocabulary Practice',

    // Settings
    settings_title:    'Settings',
    settings_lang:     'Interface Language',
    settings_theme:    'Theme',
    settings_reset:    'Reset',

    // Popup word type labels
    type_word:         'Word',
    type_phrasal:      'Phrasal Verb',
    type_idiom:        'Idiom',
    type_grammar:      'Grammar Pattern',
    type_verb_pattern: 'Verb Pattern',
    type_noun_phrase:  'Noun Phrase',
    type_phrase:       'Expression',

    // Popup labels
    popup_meaning:     'Meaning',
    popup_example:     'Example',
    popup_no_entry:    'This word is not in the database yet',

    // Quiz / Cloze
    quiz_correct:      '✓ Correct!',
    quiz_wrong:        '✗ Wrong',
    quiz_fill:         'Fill in the blank',

    // Misc
    xp_label:          'XP',
    streak_label:      '🔥 Streak',
    loading:           'Loading…',
  },

  es: {
    // Navigation
    nav_home:     'Inicio',
    nav_reading:  'Lectura',
    nav_speak:    'Hablar',
    nav_learn:    'Práctica',
    nav_settings: 'Ajustes',

    // Reading Workshop
    reading_title:    'Taller de Lectura',
    reading_subtitle: 'Siente el contexto con textos reales, vive las palabras.',
    reading_mode_read: '📚 Leer',
    reading_mode_quiz: '🧩 Ejercicio',
    reading_listen:    '🎧 Escuchar',
    reading_stop:      '🛑 Detener',
    reading_prev:      '← Anterior',
    reading_next:      'Siguiente →',
    reading_shuffle:   '🔀 Mezclar',
    level_easy:        '🌱 Fácil',
    level_mid:         '📚 Medio',
    level_adv:         '🔥 Avanzado',
    no_content:        'No se encontró contenido.',

    // Speaking Module
    speak_title:       'Práctica de Conversación',
    speak_subtitle:    'Mejora tu pronunciación y entonación.',

    // Learn / Practice Module
    learn_title:       'Práctica de Vocabulario',

    // Settings
    settings_title:    'Ajustes',
    settings_lang:     'Idioma de la Interfaz',
    settings_theme:    'Tema',
    settings_reset:    'Restablecer',

    // Popup word type labels
    type_word:         'Palabra',
    type_phrasal:      'Verbo Frasal',
    type_idiom:        'Modismo',
    type_grammar:      'Patrón Gramatical',
    type_verb_pattern: 'Patrón Verbal',
    type_noun_phrase:  'Expresión Nominal',
    type_phrase:       'Expresión',

    // Popup labels
    popup_meaning:     'Significado',
    popup_example:     'Ejemplo',
    popup_no_entry:    'Esta palabra aún no está en la base de datos',

    // Quiz / Cloze
    quiz_correct:      '✓ ¡Correcto!',
    quiz_wrong:        '✗ Incorrecto',
    quiz_fill:         'Rellena el espacio',

    // Misc
    xp_label:          'XP',
    streak_label:      '🔥 Racha',
    loading:           'Cargando…',
  },
};

// Word-type display name helper
function getTypeName(rawType, lang) {
  const map = {
    'Kelime':         { tr:'Kelime',         en:'Word',             es:'Palabra'           },
    'Phrasal Verb':   { tr:'Phrasal Verb',   en:'Phrasal Verb',     es:'Verbo Frasal'      },
    'Deyim':          { tr:'Deyim',          en:'Idiom',            es:'Modismo'           },
    'Gramer Kalıbı':  { tr:'Gramer Kalıbı',  en:'Grammar Pattern',  es:'Patrón Gramatical' },
    'Eylem Kalıbı':   { tr:'Eylem Kalıbı',   en:'Verb Pattern',     es:'Patrón Verbal'     },
    'İsim Tamlaması': { tr:'İsim Tamlaması', en:'Noun Phrase',      es:'Expresión Nominal' },
  };
  const entry = map[rawType];
  if (!entry) return rawType;
  return entry[lang] || entry.tr;
}
