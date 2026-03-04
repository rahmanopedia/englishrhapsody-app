const WORDS = [
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "The universe is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌌",
    "img": ""
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "The gravity is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🍎",
    "img": ""
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "The galaxy is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌀",
    "img": ""
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "The microscope is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🔬",
    "img": ""
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "The ocean is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌊",
    "img": ""
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "The volcano is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌋",
    "img": ""
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "The forest is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": ""
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "The elephant is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐘",
    "img": ""
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "The butterfly is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦋",
    "img": ""
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "The smartphone is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "📱",
    "img": ""
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "The laptop is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": ""
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "The chocolate is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍫",
    "img": ""
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "The avocado is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🥑",
    "img": ""
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "The skyscraper is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏙️",
    "img": ""
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "The bridge is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌉",
    "img": ""
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "The courage is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "The wisdom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "The melody is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎶",
    "img": ""
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "The canvas is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": ""
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "The rainbow is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌈",
    "img": ""
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "The bicycle is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🚲",
    "img": ""
  },
  {
    "en": "Lion",
    "tr": "Aslan",
    "ipa": "/ˈlaɪ.ən/",
    "ex": "The lion is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Owl",
    "tr": "Baykuş",
    "ipa": "/aʊl/",
    "ex": "The owl is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Octopus",
    "tr": "Ahtapot",
    "ipa": "/ˈɒk.tə.pəs/",
    "ex": "The octopus is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐙",
    "img": ""
  },
  {
    "en": "Kangaroo",
    "tr": "Kanguru",
    "ipa": "/ˌkæŋ.ɡərˈuː/",
    "ex": "The kangaroo is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦘",
    "img": ""
  },
  {
    "en": "Eagle",
    "tr": "Kartal",
    "ipa": "/ˈiː.ɡəl/",
    "ex": "The eagle is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦅",
    "img": ""
  },
  {
    "en": "Satellite",
    "tr": "Uydu",
    "ipa": "/ˈsæt.əl.aɪt/",
    "ex": "The satellite is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🛰️",
    "img": ""
  },
  {
    "en": "Server",
    "tr": "Sunucu",
    "ipa": "/ˈsɜː.vər/",
    "ex": "The server is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🖥️",
    "img": ""
  },
  {
    "en": "Virtual Reality",
    "tr": "Sanal Gerçeklik",
    "ipa": "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
    "ex": "The virtual reality is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🥽",
    "img": ""
  },
  {
    "en": "Cinnamon",
    "tr": "Tarçın",
    "ipa": "/ˈsɪn.ə.mən/",
    "ex": "The cinnamon is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍂",
    "img": ""
  },
  {
    "en": "Vanilla",
    "tr": "Vanilya",
    "ipa": "/vəˈnɪl.ə/",
    "ex": "The vanilla is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍦",
    "img": ""
  },
  {
    "en": "Staircase",
    "tr": "Merdiven",
    "ipa": "/ˈsteə.keɪs/",
    "ex": "The staircase is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🪜",
    "img": ""
  },
  {
    "en": "Columns",
    "tr": "Sütunlar",
    "ipa": "/ˈkɒl.əmz/",
    "ex": "The columns is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": ""
  },
  {
    "en": "Balcony",
    "tr": "Balkon",
    "ipa": "/ˈbæl.kə.ni/",
    "ex": "The balcony is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Fountain",
    "tr": "Fıskiye",
    "ipa": "/ˈfaʊn.tɪn/",
    "ex": "The fountain is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "⛲",
    "img": ""
  },
  {
    "en": "Castle",
    "tr": "Kale",
    "ipa": "/ˈkɑː.səl/",
    "ex": "The castle is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏰",
    "img": ""
  },
  {
    "en": "Euphoria",
    "tr": "Mutluluk",
    "ipa": "/juːˈfɔːr.i.ə/",
    "ex": "The euphoria is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🏆",
    "img": ""
  },
  {
    "en": "Resilience",
    "tr": "Direnç",
    "ipa": "/rɪˈzɪl.i.əns/",
    "ex": "The resilience is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🌵",
    "img": ""
  },
  {
    "en": "Serendipity",
    "tr": "Tesadüf",
    "ipa": "/ˌser.ənˈdɪp.ə.ti/",
    "ex": "The serendipity is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🍀",
    "img": ""
  },
  {
    "en": "Nostalgia",
    "tr": "Nostalji",
    "ipa": "/nɒˈstæl.dʒə/",
    "ex": "The nostalgia is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "📸",
    "img": ""
  },
  {
    "en": "Freedom",
    "tr": "Özgürlük",
    "ipa": "/ˈfriː.dəm/",
    "ex": "The freedom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🕊️",
    "img": ""
  },
  {
    "en": "Peace",
    "tr": "Barış",
    "ipa": "/piːs/",
    "ex": "The peace is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "☮️",
    "img": ""
  },
  {
    "en": "Sculpture",
    "tr": "Heykel",
    "ipa": "/ˈskʌlp.tʃər/",
    "ex": "The sculpture is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🗿",
    "img": ""
  },
  {
    "en": "Cinema",
    "tr": "Sinema",
    "ipa": "/ˈsɪn.ə.mə/",
    "ex": "The cinema is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎬",
    "img": ""
  },
  {
    "en": "Poetry",
    "tr": "Şiir",
    "ipa": "/ˈpəʊ.ɪ.tri/",
    "ex": "The poetry is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "📜",
    "img": ""
  },
  {
    "en": "Dance",
    "tr": "Dans",
    "ipa": "/dɑːns/",
    "ex": "The dance is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "💃",
    "img": ""
  },
  {
    "en": "Snowflake",
    "tr": "Kar Tanesi",
    "ipa": "/ˈsnəʊ.fleɪk/",
    "ex": "The snowflake is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "❄️",
    "img": ""
  },
  {
    "en": "Hurricane",
    "tr": "Kasırga",
    "ipa": "/ˈhʌr.ɪ.kən/",
    "ex": "The hurricane is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌪️",
    "img": ""
  },
  {
    "en": "Sunset",
    "tr": "Gün Batımı",
    "ipa": "/ˈsʌn.set/",
    "ex": "The sunset is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Thunder",
    "tr": "Gök Gürültüsü",
    "ipa": "/ˈθʌn.dər/",
    "ex": "The thunder is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "⚡",
    "img": ""
  },
  {
    "en": "Marathon",
    "tr": "Maraton",
    "ipa": "/ˈmær.ə.θən/",
    "ex": "The marathon is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏃",
    "img": ""
  },
  {
    "en": "Yoga",
    "tr": "Yoga",
    "ipa": "/ˈjəʊ.ɡə/",
    "ex": "The yoga is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🧘",
    "img": ""
  },
  {
    "en": "Basketball",
    "tr": "Basketbol",
    "ipa": "/ˈbɑː.skɪt.bɔːl/",
    "ex": "The basketball is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏀",
    "img": ""
  },
  {
    "en": "Stadium",
    "tr": "Stadyum",
    "ipa": "/ˈsteɪ.di.əm/",
    "ex": "The stadium is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏟️",
    "img": ""
  },
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "The universe is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌌",
    "img": ""
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "The gravity is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🍎",
    "img": ""
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "The galaxy is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌀",
    "img": ""
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "The microscope is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🔬",
    "img": ""
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "The ocean is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌊",
    "img": ""
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "The volcano is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌋",
    "img": ""
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "The forest is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": ""
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "The elephant is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐘",
    "img": ""
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "The butterfly is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦋",
    "img": ""
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "The smartphone is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "📱",
    "img": ""
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "The laptop is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": ""
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "The chocolate is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍫",
    "img": ""
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "The avocado is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🥑",
    "img": ""
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "The skyscraper is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏙️",
    "img": ""
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "The bridge is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌉",
    "img": ""
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "The courage is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "The wisdom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "The melody is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎶",
    "img": ""
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "The canvas is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": ""
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "The rainbow is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌈",
    "img": ""
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "The bicycle is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🚲",
    "img": ""
  },
  {
    "en": "Lion",
    "tr": "Aslan",
    "ipa": "/ˈlaɪ.ən/",
    "ex": "The lion is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Owl",
    "tr": "Baykuş",
    "ipa": "/aʊl/",
    "ex": "The owl is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Octopus",
    "tr": "Ahtapot",
    "ipa": "/ˈɒk.tə.pəs/",
    "ex": "The octopus is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐙",
    "img": ""
  },
  {
    "en": "Kangaroo",
    "tr": "Kanguru",
    "ipa": "/ˌkæŋ.ɡərˈuː/",
    "ex": "The kangaroo is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦘",
    "img": ""
  },
  {
    "en": "Eagle",
    "tr": "Kartal",
    "ipa": "/ˈiː.ɡəl/",
    "ex": "The eagle is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦅",
    "img": ""
  },
  {
    "en": "Satellite",
    "tr": "Uydu",
    "ipa": "/ˈsæt.əl.aɪt/",
    "ex": "The satellite is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🛰️",
    "img": ""
  },
  {
    "en": "Server",
    "tr": "Sunucu",
    "ipa": "/ˈsɜː.vər/",
    "ex": "The server is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🖥️",
    "img": ""
  },
  {
    "en": "Virtual Reality",
    "tr": "Sanal Gerçeklik",
    "ipa": "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
    "ex": "The virtual reality is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🥽",
    "img": ""
  },
  {
    "en": "Cinnamon",
    "tr": "Tarçın",
    "ipa": "/ˈsɪn.ə.mən/",
    "ex": "The cinnamon is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍂",
    "img": ""
  },
  {
    "en": "Vanilla",
    "tr": "Vanilya",
    "ipa": "/vəˈnɪl.ə/",
    "ex": "The vanilla is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍦",
    "img": ""
  },
  {
    "en": "Staircase",
    "tr": "Merdiven",
    "ipa": "/ˈsteə.keɪs/",
    "ex": "The staircase is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🪜",
    "img": ""
  },
  {
    "en": "Columns",
    "tr": "Sütunlar",
    "ipa": "/ˈkɒl.əmz/",
    "ex": "The columns is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": ""
  },
  {
    "en": "Balcony",
    "tr": "Balkon",
    "ipa": "/ˈbæl.kə.ni/",
    "ex": "The balcony is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Fountain",
    "tr": "Fıskiye",
    "ipa": "/ˈfaʊn.tɪn/",
    "ex": "The fountain is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "⛲",
    "img": ""
  },
  {
    "en": "Castle",
    "tr": "Kale",
    "ipa": "/ˈkɑː.səl/",
    "ex": "The castle is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏰",
    "img": ""
  },
  {
    "en": "Euphoria",
    "tr": "Mutluluk",
    "ipa": "/juːˈfɔːr.i.ə/",
    "ex": "The euphoria is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🏆",
    "img": ""
  },
  {
    "en": "Resilience",
    "tr": "Direnç",
    "ipa": "/rɪˈzɪl.i.əns/",
    "ex": "The resilience is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🌵",
    "img": ""
  },
  {
    "en": "Serendipity",
    "tr": "Tesadüf",
    "ipa": "/ˌser.ənˈdɪp.ə.ti/",
    "ex": "The serendipity is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🍀",
    "img": ""
  },
  {
    "en": "Nostalgia",
    "tr": "Nostalji",
    "ipa": "/nɒˈstæl.dʒə/",
    "ex": "The nostalgia is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "📸",
    "img": ""
  },
  {
    "en": "Freedom",
    "tr": "Özgürlük",
    "ipa": "/ˈfriː.dəm/",
    "ex": "The freedom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🕊️",
    "img": ""
  },
  {
    "en": "Peace",
    "tr": "Barış",
    "ipa": "/piːs/",
    "ex": "The peace is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "☮️",
    "img": ""
  },
  {
    "en": "Sculpture",
    "tr": "Heykel",
    "ipa": "/ˈskʌlp.tʃər/",
    "ex": "The sculpture is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🗿",
    "img": ""
  },
  {
    "en": "Cinema",
    "tr": "Sinema",
    "ipa": "/ˈsɪn.ə.mə/",
    "ex": "The cinema is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎬",
    "img": ""
  },
  {
    "en": "Poetry",
    "tr": "Şiir",
    "ipa": "/ˈpəʊ.ɪ.tri/",
    "ex": "The poetry is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "📜",
    "img": ""
  },
  {
    "en": "Dance",
    "tr": "Dans",
    "ipa": "/dɑːns/",
    "ex": "The dance is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "💃",
    "img": ""
  },
  {
    "en": "Snowflake",
    "tr": "Kar Tanesi",
    "ipa": "/ˈsnəʊ.fleɪk/",
    "ex": "The snowflake is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "❄️",
    "img": ""
  },
  {
    "en": "Hurricane",
    "tr": "Kasırga",
    "ipa": "/ˈhʌr.ɪ.kən/",
    "ex": "The hurricane is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌪️",
    "img": ""
  },
  {
    "en": "Sunset",
    "tr": "Gün Batımı",
    "ipa": "/ˈsʌn.set/",
    "ex": "The sunset is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Thunder",
    "tr": "Gök Gürültüsü",
    "ipa": "/ˈθʌn.dər/",
    "ex": "The thunder is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "⚡",
    "img": ""
  },
  {
    "en": "Marathon",
    "tr": "Maraton",
    "ipa": "/ˈmær.ə.θən/",
    "ex": "The marathon is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏃",
    "img": ""
  },
  {
    "en": "Yoga",
    "tr": "Yoga",
    "ipa": "/ˈjəʊ.ɡə/",
    "ex": "The yoga is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🧘",
    "img": ""
  },
  {
    "en": "Basketball",
    "tr": "Basketbol",
    "ipa": "/ˈbɑː.skɪt.bɔːl/",
    "ex": "The basketball is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏀",
    "img": ""
  },
  {
    "en": "Stadium",
    "tr": "Stadyum",
    "ipa": "/ˈsteɪ.di.əm/",
    "ex": "The stadium is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏟️",
    "img": ""
  },
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "The universe is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌌",
    "img": ""
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "The gravity is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🍎",
    "img": ""
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "The galaxy is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌀",
    "img": ""
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "The microscope is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🔬",
    "img": ""
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "The ocean is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌊",
    "img": ""
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "The volcano is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌋",
    "img": ""
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "The forest is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": ""
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "The elephant is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐘",
    "img": ""
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "The butterfly is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦋",
    "img": ""
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "The smartphone is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "📱",
    "img": ""
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "The laptop is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": ""
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "The chocolate is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍫",
    "img": ""
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "The avocado is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🥑",
    "img": ""
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "The skyscraper is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏙️",
    "img": ""
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "The bridge is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌉",
    "img": ""
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "The courage is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "The wisdom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "The melody is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎶",
    "img": ""
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "The canvas is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": ""
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "The rainbow is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌈",
    "img": ""
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "The bicycle is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🚲",
    "img": ""
  },
  {
    "en": "Lion",
    "tr": "Aslan",
    "ipa": "/ˈlaɪ.ən/",
    "ex": "The lion is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Owl",
    "tr": "Baykuş",
    "ipa": "/aʊl/",
    "ex": "The owl is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Octopus",
    "tr": "Ahtapot",
    "ipa": "/ˈɒk.tə.pəs/",
    "ex": "The octopus is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐙",
    "img": ""
  },
  {
    "en": "Kangaroo",
    "tr": "Kanguru",
    "ipa": "/ˌkæŋ.ɡərˈuː/",
    "ex": "The kangaroo is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦘",
    "img": ""
  },
  {
    "en": "Eagle",
    "tr": "Kartal",
    "ipa": "/ˈiː.ɡəl/",
    "ex": "The eagle is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦅",
    "img": ""
  },
  {
    "en": "Satellite",
    "tr": "Uydu",
    "ipa": "/ˈsæt.əl.aɪt/",
    "ex": "The satellite is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🛰️",
    "img": ""
  },
  {
    "en": "Server",
    "tr": "Sunucu",
    "ipa": "/ˈsɜː.vər/",
    "ex": "The server is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🖥️",
    "img": ""
  },
  {
    "en": "Virtual Reality",
    "tr": "Sanal Gerçeklik",
    "ipa": "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
    "ex": "The virtual reality is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🥽",
    "img": ""
  },
  {
    "en": "Cinnamon",
    "tr": "Tarçın",
    "ipa": "/ˈsɪn.ə.mən/",
    "ex": "The cinnamon is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍂",
    "img": ""
  },
  {
    "en": "Vanilla",
    "tr": "Vanilya",
    "ipa": "/vəˈnɪl.ə/",
    "ex": "The vanilla is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍦",
    "img": ""
  },
  {
    "en": "Staircase",
    "tr": "Merdiven",
    "ipa": "/ˈsteə.keɪs/",
    "ex": "The staircase is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🪜",
    "img": ""
  },
  {
    "en": "Columns",
    "tr": "Sütunlar",
    "ipa": "/ˈkɒl.əmz/",
    "ex": "The columns is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": ""
  },
  {
    "en": "Balcony",
    "tr": "Balkon",
    "ipa": "/ˈbæl.kə.ni/",
    "ex": "The balcony is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Fountain",
    "tr": "Fıskiye",
    "ipa": "/ˈfaʊn.tɪn/",
    "ex": "The fountain is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "⛲",
    "img": ""
  },
  {
    "en": "Castle",
    "tr": "Kale",
    "ipa": "/ˈkɑː.səl/",
    "ex": "The castle is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏰",
    "img": ""
  },
  {
    "en": "Euphoria",
    "tr": "Mutluluk",
    "ipa": "/juːˈfɔːr.i.ə/",
    "ex": "The euphoria is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🏆",
    "img": ""
  },
  {
    "en": "Resilience",
    "tr": "Direnç",
    "ipa": "/rɪˈzɪl.i.əns/",
    "ex": "The resilience is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🌵",
    "img": ""
  },
  {
    "en": "Serendipity",
    "tr": "Tesadüf",
    "ipa": "/ˌser.ənˈdɪp.ə.ti/",
    "ex": "The serendipity is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🍀",
    "img": ""
  },
  {
    "en": "Nostalgia",
    "tr": "Nostalji",
    "ipa": "/nɒˈstæl.dʒə/",
    "ex": "The nostalgia is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "📸",
    "img": ""
  },
  {
    "en": "Freedom",
    "tr": "Özgürlük",
    "ipa": "/ˈfriː.dəm/",
    "ex": "The freedom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🕊️",
    "img": ""
  },
  {
    "en": "Peace",
    "tr": "Barış",
    "ipa": "/piːs/",
    "ex": "The peace is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "☮️",
    "img": ""
  },
  {
    "en": "Sculpture",
    "tr": "Heykel",
    "ipa": "/ˈskʌlp.tʃər/",
    "ex": "The sculpture is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🗿",
    "img": ""
  },
  {
    "en": "Cinema",
    "tr": "Sinema",
    "ipa": "/ˈsɪn.ə.mə/",
    "ex": "The cinema is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎬",
    "img": ""
  },
  {
    "en": "Poetry",
    "tr": "Şiir",
    "ipa": "/ˈpəʊ.ɪ.tri/",
    "ex": "The poetry is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "📜",
    "img": ""
  },
  {
    "en": "Dance",
    "tr": "Dans",
    "ipa": "/dɑːns/",
    "ex": "The dance is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "💃",
    "img": ""
  },
  {
    "en": "Snowflake",
    "tr": "Kar Tanesi",
    "ipa": "/ˈsnəʊ.fleɪk/",
    "ex": "The snowflake is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "❄️",
    "img": ""
  },
  {
    "en": "Hurricane",
    "tr": "Kasırga",
    "ipa": "/ˈhʌr.ɪ.kən/",
    "ex": "The hurricane is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌪️",
    "img": ""
  },
  {
    "en": "Sunset",
    "tr": "Gün Batımı",
    "ipa": "/ˈsʌn.set/",
    "ex": "The sunset is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Thunder",
    "tr": "Gök Gürültüsü",
    "ipa": "/ˈθʌn.dər/",
    "ex": "The thunder is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "⚡",
    "img": ""
  },
  {
    "en": "Marathon",
    "tr": "Maraton",
    "ipa": "/ˈmær.ə.θən/",
    "ex": "The marathon is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏃",
    "img": ""
  },
  {
    "en": "Yoga",
    "tr": "Yoga",
    "ipa": "/ˈjəʊ.ɡə/",
    "ex": "The yoga is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🧘",
    "img": ""
  },
  {
    "en": "Basketball",
    "tr": "Basketbol",
    "ipa": "/ˈbɑː.skɪt.bɔːl/",
    "ex": "The basketball is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏀",
    "img": ""
  },
  {
    "en": "Stadium",
    "tr": "Stadyum",
    "ipa": "/ˈsteɪ.di.əm/",
    "ex": "The stadium is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏟️",
    "img": ""
  },
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "The universe is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌌",
    "img": ""
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "The gravity is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🍎",
    "img": ""
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "The galaxy is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌀",
    "img": ""
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "The microscope is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🔬",
    "img": ""
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "The ocean is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌊",
    "img": ""
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "The volcano is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌋",
    "img": ""
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "The forest is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": ""
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "The elephant is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐘",
    "img": ""
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "The butterfly is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦋",
    "img": ""
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "The smartphone is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "📱",
    "img": ""
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "The laptop is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": ""
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "The chocolate is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍫",
    "img": ""
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "The avocado is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🥑",
    "img": ""
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "The skyscraper is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏙️",
    "img": ""
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "The bridge is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌉",
    "img": ""
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "The courage is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "The wisdom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "The melody is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎶",
    "img": ""
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "The canvas is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": ""
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "The rainbow is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌈",
    "img": ""
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "The bicycle is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🚲",
    "img": ""
  },
  {
    "en": "Lion",
    "tr": "Aslan",
    "ipa": "/ˈlaɪ.ən/",
    "ex": "The lion is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Owl",
    "tr": "Baykuş",
    "ipa": "/aʊl/",
    "ex": "The owl is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Octopus",
    "tr": "Ahtapot",
    "ipa": "/ˈɒk.tə.pəs/",
    "ex": "The octopus is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐙",
    "img": ""
  },
  {
    "en": "Kangaroo",
    "tr": "Kanguru",
    "ipa": "/ˌkæŋ.ɡərˈuː/",
    "ex": "The kangaroo is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦘",
    "img": ""
  },
  {
    "en": "Eagle",
    "tr": "Kartal",
    "ipa": "/ˈiː.ɡəl/",
    "ex": "The eagle is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦅",
    "img": ""
  },
  {
    "en": "Satellite",
    "tr": "Uydu",
    "ipa": "/ˈsæt.əl.aɪt/",
    "ex": "The satellite is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🛰️",
    "img": ""
  },
  {
    "en": "Server",
    "tr": "Sunucu",
    "ipa": "/ˈsɜː.vər/",
    "ex": "The server is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🖥️",
    "img": ""
  },
  {
    "en": "Virtual Reality",
    "tr": "Sanal Gerçeklik",
    "ipa": "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
    "ex": "The virtual reality is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🥽",
    "img": ""
  },
  {
    "en": "Cinnamon",
    "tr": "Tarçın",
    "ipa": "/ˈsɪn.ə.mən/",
    "ex": "The cinnamon is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍂",
    "img": ""
  },
  {
    "en": "Vanilla",
    "tr": "Vanilya",
    "ipa": "/vəˈnɪl.ə/",
    "ex": "The vanilla is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍦",
    "img": ""
  },
  {
    "en": "Staircase",
    "tr": "Merdiven",
    "ipa": "/ˈsteə.keɪs/",
    "ex": "The staircase is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🪜",
    "img": ""
  },
  {
    "en": "Columns",
    "tr": "Sütunlar",
    "ipa": "/ˈkɒl.əmz/",
    "ex": "The columns is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": ""
  },
  {
    "en": "Balcony",
    "tr": "Balkon",
    "ipa": "/ˈbæl.kə.ni/",
    "ex": "The balcony is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Fountain",
    "tr": "Fıskiye",
    "ipa": "/ˈfaʊn.tɪn/",
    "ex": "The fountain is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "⛲",
    "img": ""
  },
  {
    "en": "Castle",
    "tr": "Kale",
    "ipa": "/ˈkɑː.səl/",
    "ex": "The castle is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏰",
    "img": ""
  },
  {
    "en": "Euphoria",
    "tr": "Mutluluk",
    "ipa": "/juːˈfɔːr.i.ə/",
    "ex": "The euphoria is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🏆",
    "img": ""
  },
  {
    "en": "Resilience",
    "tr": "Direnç",
    "ipa": "/rɪˈzɪl.i.əns/",
    "ex": "The resilience is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🌵",
    "img": ""
  },
  {
    "en": "Serendipity",
    "tr": "Tesadüf",
    "ipa": "/ˌser.ənˈdɪp.ə.ti/",
    "ex": "The serendipity is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🍀",
    "img": ""
  },
  {
    "en": "Nostalgia",
    "tr": "Nostalji",
    "ipa": "/nɒˈstæl.dʒə/",
    "ex": "The nostalgia is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "📸",
    "img": ""
  },
  {
    "en": "Freedom",
    "tr": "Özgürlük",
    "ipa": "/ˈfriː.dəm/",
    "ex": "The freedom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🕊️",
    "img": ""
  },
  {
    "en": "Peace",
    "tr": "Barış",
    "ipa": "/piːs/",
    "ex": "The peace is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "☮️",
    "img": ""
  },
  {
    "en": "Sculpture",
    "tr": "Heykel",
    "ipa": "/ˈskʌlp.tʃər/",
    "ex": "The sculpture is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🗿",
    "img": ""
  },
  {
    "en": "Cinema",
    "tr": "Sinema",
    "ipa": "/ˈsɪn.ə.mə/",
    "ex": "The cinema is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎬",
    "img": ""
  },
  {
    "en": "Poetry",
    "tr": "Şiir",
    "ipa": "/ˈpəʊ.ɪ.tri/",
    "ex": "The poetry is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "📜",
    "img": ""
  },
  {
    "en": "Dance",
    "tr": "Dans",
    "ipa": "/dɑːns/",
    "ex": "The dance is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "💃",
    "img": ""
  },
  {
    "en": "Snowflake",
    "tr": "Kar Tanesi",
    "ipa": "/ˈsnəʊ.fleɪk/",
    "ex": "The snowflake is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "❄️",
    "img": ""
  },
  {
    "en": "Hurricane",
    "tr": "Kasırga",
    "ipa": "/ˈhʌr.ɪ.kən/",
    "ex": "The hurricane is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌪️",
    "img": ""
  },
  {
    "en": "Sunset",
    "tr": "Gün Batımı",
    "ipa": "/ˈsʌn.set/",
    "ex": "The sunset is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Thunder",
    "tr": "Gök Gürültüsü",
    "ipa": "/ˈθʌn.dər/",
    "ex": "The thunder is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "⚡",
    "img": ""
  },
  {
    "en": "Marathon",
    "tr": "Maraton",
    "ipa": "/ˈmær.ə.θən/",
    "ex": "The marathon is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏃",
    "img": ""
  },
  {
    "en": "Yoga",
    "tr": "Yoga",
    "ipa": "/ˈjəʊ.ɡə/",
    "ex": "The yoga is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🧘",
    "img": ""
  },
  {
    "en": "Basketball",
    "tr": "Basketbol",
    "ipa": "/ˈbɑː.skɪt.bɔːl/",
    "ex": "The basketball is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏀",
    "img": ""
  },
  {
    "en": "Stadium",
    "tr": "Stadyum",
    "ipa": "/ˈsteɪ.di.əm/",
    "ex": "The stadium is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏟️",
    "img": ""
  },
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "The universe is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌌",
    "img": ""
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "The gravity is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🍎",
    "img": ""
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "The galaxy is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌀",
    "img": ""
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "The microscope is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🔬",
    "img": ""
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "The ocean is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌊",
    "img": ""
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "The volcano is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌋",
    "img": ""
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "The forest is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": ""
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "The elephant is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐘",
    "img": ""
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "The butterfly is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦋",
    "img": ""
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "The smartphone is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "📱",
    "img": ""
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "The laptop is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": ""
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "The chocolate is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍫",
    "img": ""
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "The avocado is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🥑",
    "img": ""
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "The skyscraper is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏙️",
    "img": ""
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "The bridge is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌉",
    "img": ""
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "The courage is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "The wisdom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "The melody is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎶",
    "img": ""
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "The canvas is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": ""
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "The rainbow is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌈",
    "img": ""
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "The bicycle is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🚲",
    "img": ""
  },
  {
    "en": "Lion",
    "tr": "Aslan",
    "ipa": "/ˈlaɪ.ən/",
    "ex": "The lion is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Owl",
    "tr": "Baykuş",
    "ipa": "/aʊl/",
    "ex": "The owl is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Octopus",
    "tr": "Ahtapot",
    "ipa": "/ˈɒk.tə.pəs/",
    "ex": "The octopus is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐙",
    "img": ""
  },
  {
    "en": "Kangaroo",
    "tr": "Kanguru",
    "ipa": "/ˌkæŋ.ɡərˈuː/",
    "ex": "The kangaroo is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦘",
    "img": ""
  },
  {
    "en": "Eagle",
    "tr": "Kartal",
    "ipa": "/ˈiː.ɡəl/",
    "ex": "The eagle is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦅",
    "img": ""
  },
  {
    "en": "Satellite",
    "tr": "Uydu",
    "ipa": "/ˈsæt.əl.aɪt/",
    "ex": "The satellite is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🛰️",
    "img": ""
  },
  {
    "en": "Server",
    "tr": "Sunucu",
    "ipa": "/ˈsɜː.vər/",
    "ex": "The server is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🖥️",
    "img": ""
  },
  {
    "en": "Virtual Reality",
    "tr": "Sanal Gerçeklik",
    "ipa": "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
    "ex": "The virtual reality is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🥽",
    "img": ""
  },
  {
    "en": "Cinnamon",
    "tr": "Tarçın",
    "ipa": "/ˈsɪn.ə.mən/",
    "ex": "The cinnamon is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍂",
    "img": ""
  },
  {
    "en": "Vanilla",
    "tr": "Vanilya",
    "ipa": "/vəˈnɪl.ə/",
    "ex": "The vanilla is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍦",
    "img": ""
  },
  {
    "en": "Staircase",
    "tr": "Merdiven",
    "ipa": "/ˈsteə.keɪs/",
    "ex": "The staircase is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🪜",
    "img": ""
  },
  {
    "en": "Columns",
    "tr": "Sütunlar",
    "ipa": "/ˈkɒl.əmz/",
    "ex": "The columns is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": ""
  },
  {
    "en": "Balcony",
    "tr": "Balkon",
    "ipa": "/ˈbæl.kə.ni/",
    "ex": "The balcony is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Fountain",
    "tr": "Fıskiye",
    "ipa": "/ˈfaʊn.tɪn/",
    "ex": "The fountain is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "⛲",
    "img": ""
  },
  {
    "en": "Castle",
    "tr": "Kale",
    "ipa": "/ˈkɑː.səl/",
    "ex": "The castle is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏰",
    "img": ""
  },
  {
    "en": "Euphoria",
    "tr": "Mutluluk",
    "ipa": "/juːˈfɔːr.i.ə/",
    "ex": "The euphoria is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🏆",
    "img": ""
  },
  {
    "en": "Resilience",
    "tr": "Direnç",
    "ipa": "/rɪˈzɪl.i.əns/",
    "ex": "The resilience is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🌵",
    "img": ""
  },
  {
    "en": "Serendipity",
    "tr": "Tesadüf",
    "ipa": "/ˌser.ənˈdɪp.ə.ti/",
    "ex": "The serendipity is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🍀",
    "img": ""
  },
  {
    "en": "Nostalgia",
    "tr": "Nostalji",
    "ipa": "/nɒˈstæl.dʒə/",
    "ex": "The nostalgia is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "📸",
    "img": ""
  },
  {
    "en": "Freedom",
    "tr": "Özgürlük",
    "ipa": "/ˈfriː.dəm/",
    "ex": "The freedom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🕊️",
    "img": ""
  },
  {
    "en": "Peace",
    "tr": "Barış",
    "ipa": "/piːs/",
    "ex": "The peace is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "☮️",
    "img": ""
  },
  {
    "en": "Sculpture",
    "tr": "Heykel",
    "ipa": "/ˈskʌlp.tʃər/",
    "ex": "The sculpture is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🗿",
    "img": ""
  },
  {
    "en": "Cinema",
    "tr": "Sinema",
    "ipa": "/ˈsɪn.ə.mə/",
    "ex": "The cinema is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎬",
    "img": ""
  },
  {
    "en": "Poetry",
    "tr": "Şiir",
    "ipa": "/ˈpəʊ.ɪ.tri/",
    "ex": "The poetry is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "📜",
    "img": ""
  },
  {
    "en": "Dance",
    "tr": "Dans",
    "ipa": "/dɑːns/",
    "ex": "The dance is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "💃",
    "img": ""
  },
  {
    "en": "Snowflake",
    "tr": "Kar Tanesi",
    "ipa": "/ˈsnəʊ.fleɪk/",
    "ex": "The snowflake is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "❄️",
    "img": ""
  },
  {
    "en": "Hurricane",
    "tr": "Kasırga",
    "ipa": "/ˈhʌr.ɪ.kən/",
    "ex": "The hurricane is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌪️",
    "img": ""
  },
  {
    "en": "Sunset",
    "tr": "Gün Batımı",
    "ipa": "/ˈsʌn.set/",
    "ex": "The sunset is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌅",
    "img": ""
  },
  {
    "en": "Thunder",
    "tr": "Gök Gürültüsü",
    "ipa": "/ˈθʌn.dər/",
    "ex": "The thunder is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "⚡",
    "img": ""
  },
  {
    "en": "Marathon",
    "tr": "Maraton",
    "ipa": "/ˈmær.ə.θən/",
    "ex": "The marathon is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏃",
    "img": ""
  },
  {
    "en": "Yoga",
    "tr": "Yoga",
    "ipa": "/ˈjəʊ.ɡə/",
    "ex": "The yoga is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🧘",
    "img": ""
  },
  {
    "en": "Basketball",
    "tr": "Basketbol",
    "ipa": "/ˈbɑː.skɪt.bɔːl/",
    "ex": "The basketball is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏀",
    "img": ""
  },
  {
    "en": "Stadium",
    "tr": "Stadyum",
    "ipa": "/ˈsteɪ.di.əm/",
    "ex": "The stadium is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🏟️",
    "img": ""
  },
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "The universe is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌌",
    "img": ""
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "The gravity is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🍎",
    "img": ""
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "The galaxy is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🌀",
    "img": ""
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "The microscope is an essential part of the bilim.",
    "cat": "Bilim",
    "icon": "🔬",
    "img": ""
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "The ocean is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌊",
    "img": ""
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "The volcano is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌋",
    "img": ""
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "The forest is an essential part of the doğa.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": ""
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "The elephant is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐘",
    "img": ""
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "The butterfly is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦋",
    "img": ""
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "The smartphone is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "📱",
    "img": ""
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "The laptop is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": ""
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "The chocolate is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍫",
    "img": ""
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "The avocado is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🥑",
    "img": ""
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "The skyscraper is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🏙️",
    "img": ""
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "The bridge is an essential part of the mimari.",
    "cat": "Mimari",
    "icon": "🌉",
    "img": ""
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "The courage is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "The wisdom is an essential part of the kavram.",
    "cat": "Kavram",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "The melody is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎶",
    "img": ""
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "The canvas is an essential part of the sanat.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": ""
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "The rainbow is an essential part of the hava durumu.",
    "cat": "Hava Durumu",
    "icon": "🌈",
    "img": ""
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "The bicycle is an essential part of the spor.",
    "cat": "Spor",
    "icon": "🚲",
    "img": ""
  },
  {
    "en": "Lion",
    "tr": "Aslan",
    "ipa": "/ˈlaɪ.ən/",
    "ex": "The lion is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": ""
  },
  {
    "en": "Owl",
    "tr": "Baykuş",
    "ipa": "/aʊl/",
    "ex": "The owl is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦉",
    "img": ""
  },
  {
    "en": "Octopus",
    "tr": "Ahtapot",
    "ipa": "/ˈɒk.tə.pəs/",
    "ex": "The octopus is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🐙",
    "img": ""
  },
  {
    "en": "Kangaroo",
    "tr": "Kanguru",
    "ipa": "/ˌkæŋ.ɡərˈuː/",
    "ex": "The kangaroo is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦘",
    "img": ""
  },
  {
    "en": "Eagle",
    "tr": "Kartal",
    "ipa": "/ˈiː.ɡəl/",
    "ex": "The eagle is an essential part of the hayvanlar.",
    "cat": "Hayvanlar",
    "icon": "🦅",
    "img": ""
  },
  {
    "en": "Satellite",
    "tr": "Uydu",
    "ipa": "/ˈsæt.əl.aɪt/",
    "ex": "The satellite is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🛰️",
    "img": ""
  },
  {
    "en": "Server",
    "tr": "Sunucu",
    "ipa": "/ˈsɜː.vər/",
    "ex": "The server is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🖥️",
    "img": ""
  },
  {
    "en": "Virtual Reality",
    "tr": "Sanal Gerçeklik",
    "ipa": "/ˌvɜː.tʃu.əl riˈæl.ə.ti/",
    "ex": "The virtual reality is an essential part of the teknoloji.",
    "cat": "Teknoloji",
    "icon": "🥽",
    "img": ""
  },
  {
    "en": "Cinnamon",
    "tr": "Tarçın",
    "ipa": "/ˈsɪn.ə.mən/",
    "ex": "The cinnamon is an essential part of the mutfak.",
    "cat": "Mutfak",
    "icon": "🍂",
    "img": ""
  }
];

const SPEAK_CHALLENGES = {
  "easy": [
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator.",
    "Hello, how are you today?",
    "My name is Alex.",
    "I like to read books.",
    "The weather is really beautiful.",
    "Can you please help me?",
    "I would like a cup of coffee.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you.",
    "This is a really nice city.",
    "What is your favorite color?",
    "I have a cat and a dog.",
    "The sun is shining bright.",
    "I want to learn English fast.",
    "Can we go to the park?",
    "See you later alligator."
  ],
  "medium": [
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication.",
    "Artificial intelligence is shaping our future.",
    "Consistency is the key to mastering a language.",
    "Technology makes our daily lives so much easier.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm looking forward to working with your team.",
    "Could you please repeat that?",
    "She has been studying English for three years now.",
    "We should eat more vegetables for health.",
    "Travel broadens the mind and soul.",
    "Success comes after hard work and dedication."
  ],
  "hard": [
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring.",
    "Despite the bureaucratic obstacles, the project was completed successfully.",
    "The complex algorithm optimized the data processing speed significantly.",
    "Environmental sustainability is a global priority for the next decade.",
    "Historical artifacts provide a glimpse into ancient daily life.",
    "The entrepreneur's perseverance ultimately led to unprecedented success.",
    "Photosynthesis is the process by which plants convert sunlight into energy.",
    "The parliamentary committee thoroughly investigated the allegations.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring."
  ]
};

const PHRASES = [
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  }
];
