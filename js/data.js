const WORDS = [
  {
    "en": "Universe",
    "tr": "Evren",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity",
    "tr": "Yerçekimi",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy",
    "tr": "Galaksi",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope",
    "tr": "Mikroskop",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean",
    "tr": "Okyanus",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano",
    "tr": "Yanardağ",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest",
    "tr": "Orman",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant",
    "tr": "Fil",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly",
    "tr": "Kelebek",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone",
    "tr": "Akıllı Telefon",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop",
    "tr": "Dizüstü Bilgisayar",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate",
    "tr": "Çikolata",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado",
    "tr": "Avokado",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper",
    "tr": "Gökdelen",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge",
    "tr": "Köprü",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage",
    "tr": "Cesaret",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom",
    "tr": "Bilgelik",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody",
    "tr": "Melodi",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas",
    "tr": "Tuval",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow",
    "tr": "Gökkuşağı",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle",
    "tr": "Bisiklet",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 2",
    "tr": "Evren 2",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 2",
    "tr": "Yerçekimi 2",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 2",
    "tr": "Galaksi 2",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 2",
    "tr": "Mikroskop 2",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 2",
    "tr": "Okyanus 2",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 2",
    "tr": "Yanardağ 2",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 2",
    "tr": "Orman 2",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 2",
    "tr": "Fil 2",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 2",
    "tr": "Kelebek 2",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 2",
    "tr": "Akıllı Telefon 2",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 2",
    "tr": "Dizüstü Bilgisayar 2",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 2",
    "tr": "Çikolata 2",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 2",
    "tr": "Avokado 2",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 2",
    "tr": "Gökdelen 2",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 2",
    "tr": "Köprü 2",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 2",
    "tr": "Cesaret 2",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 2",
    "tr": "Bilgelik 2",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 2",
    "tr": "Melodi 2",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 2",
    "tr": "Tuval 2",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 2",
    "tr": "Gökkuşağı 2",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 2",
    "tr": "Bisiklet 2",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 3",
    "tr": "Evren 3",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 3",
    "tr": "Yerçekimi 3",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 3",
    "tr": "Galaksi 3",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 3",
    "tr": "Mikroskop 3",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 3",
    "tr": "Okyanus 3",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 3",
    "tr": "Yanardağ 3",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 3",
    "tr": "Orman 3",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 3",
    "tr": "Fil 3",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 3",
    "tr": "Kelebek 3",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 3",
    "tr": "Akıllı Telefon 3",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 3",
    "tr": "Dizüstü Bilgisayar 3",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 3",
    "tr": "Çikolata 3",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 3",
    "tr": "Avokado 3",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 3",
    "tr": "Gökdelen 3",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 3",
    "tr": "Köprü 3",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 3",
    "tr": "Cesaret 3",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 3",
    "tr": "Bilgelik 3",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 3",
    "tr": "Melodi 3",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 3",
    "tr": "Tuval 3",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 3",
    "tr": "Gökkuşağı 3",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 3",
    "tr": "Bisiklet 3",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 4",
    "tr": "Evren 4",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 4",
    "tr": "Yerçekimi 4",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 4",
    "tr": "Galaksi 4",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 4",
    "tr": "Mikroskop 4",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 4",
    "tr": "Okyanus 4",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 4",
    "tr": "Yanardağ 4",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 4",
    "tr": "Orman 4",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 4",
    "tr": "Fil 4",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 4",
    "tr": "Kelebek 4",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 4",
    "tr": "Akıllı Telefon 4",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 4",
    "tr": "Dizüstü Bilgisayar 4",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 4",
    "tr": "Çikolata 4",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 4",
    "tr": "Avokado 4",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 4",
    "tr": "Gökdelen 4",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 4",
    "tr": "Köprü 4",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 4",
    "tr": "Cesaret 4",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 4",
    "tr": "Bilgelik 4",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 4",
    "tr": "Melodi 4",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 4",
    "tr": "Tuval 4",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 4",
    "tr": "Gökkuşağı 4",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 4",
    "tr": "Bisiklet 4",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 5",
    "tr": "Evren 5",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 5",
    "tr": "Yerçekimi 5",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 5",
    "tr": "Galaksi 5",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 5",
    "tr": "Mikroskop 5",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 5",
    "tr": "Okyanus 5",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 5",
    "tr": "Yanardağ 5",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 5",
    "tr": "Orman 5",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 5",
    "tr": "Fil 5",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 5",
    "tr": "Kelebek 5",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 5",
    "tr": "Akıllı Telefon 5",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 5",
    "tr": "Dizüstü Bilgisayar 5",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 5",
    "tr": "Çikolata 5",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 5",
    "tr": "Avokado 5",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 5",
    "tr": "Gökdelen 5",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 5",
    "tr": "Köprü 5",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 5",
    "tr": "Cesaret 5",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 5",
    "tr": "Bilgelik 5",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 5",
    "tr": "Melodi 5",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 5",
    "tr": "Tuval 5",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 5",
    "tr": "Gökkuşağı 5",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 5",
    "tr": "Bisiklet 5",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 6",
    "tr": "Evren 6",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 6",
    "tr": "Yerçekimi 6",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 6",
    "tr": "Galaksi 6",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 6",
    "tr": "Mikroskop 6",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 6",
    "tr": "Okyanus 6",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 6",
    "tr": "Yanardağ 6",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 6",
    "tr": "Orman 6",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 6",
    "tr": "Fil 6",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 6",
    "tr": "Kelebek 6",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 6",
    "tr": "Akıllı Telefon 6",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 6",
    "tr": "Dizüstü Bilgisayar 6",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 6",
    "tr": "Çikolata 6",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 6",
    "tr": "Avokado 6",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 6",
    "tr": "Gökdelen 6",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 6",
    "tr": "Köprü 6",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 6",
    "tr": "Cesaret 6",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 6",
    "tr": "Bilgelik 6",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 6",
    "tr": "Melodi 6",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 6",
    "tr": "Tuval 6",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 6",
    "tr": "Gökkuşağı 6",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 6",
    "tr": "Bisiklet 6",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 7",
    "tr": "Evren 7",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 7",
    "tr": "Yerçekimi 7",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 7",
    "tr": "Galaksi 7",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 7",
    "tr": "Mikroskop 7",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 7",
    "tr": "Okyanus 7",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 7",
    "tr": "Yanardağ 7",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 7",
    "tr": "Orman 7",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 7",
    "tr": "Fil 7",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 7",
    "tr": "Kelebek 7",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 7",
    "tr": "Akıllı Telefon 7",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 7",
    "tr": "Dizüstü Bilgisayar 7",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 7",
    "tr": "Çikolata 7",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 7",
    "tr": "Avokado 7",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 7",
    "tr": "Gökdelen 7",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 7",
    "tr": "Köprü 7",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 7",
    "tr": "Cesaret 7",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 7",
    "tr": "Bilgelik 7",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 7",
    "tr": "Melodi 7",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 7",
    "tr": "Tuval 7",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 7",
    "tr": "Gökkuşağı 7",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 7",
    "tr": "Bisiklet 7",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 8",
    "tr": "Evren 8",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 8",
    "tr": "Yerçekimi 8",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 8",
    "tr": "Galaksi 8",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 8",
    "tr": "Mikroskop 8",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 8",
    "tr": "Okyanus 8",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 8",
    "tr": "Yanardağ 8",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 8",
    "tr": "Orman 8",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 8",
    "tr": "Fil 8",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 8",
    "tr": "Kelebek 8",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 8",
    "tr": "Akıllı Telefon 8",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 8",
    "tr": "Dizüstü Bilgisayar 8",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 8",
    "tr": "Çikolata 8",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 8",
    "tr": "Avokado 8",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 8",
    "tr": "Gökdelen 8",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 8",
    "tr": "Köprü 8",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 8",
    "tr": "Cesaret 8",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 8",
    "tr": "Bilgelik 8",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 8",
    "tr": "Melodi 8",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 8",
    "tr": "Tuval 8",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 8",
    "tr": "Gökkuşağı 8",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 8",
    "tr": "Bisiklet 8",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 9",
    "tr": "Evren 9",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 9",
    "tr": "Yerçekimi 9",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 9",
    "tr": "Galaksi 9",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 9",
    "tr": "Mikroskop 9",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 9",
    "tr": "Okyanus 9",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 9",
    "tr": "Yanardağ 9",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 9",
    "tr": "Orman 9",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 9",
    "tr": "Fil 9",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 9",
    "tr": "Kelebek 9",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 9",
    "tr": "Akıllı Telefon 9",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 9",
    "tr": "Dizüstü Bilgisayar 9",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 9",
    "tr": "Çikolata 9",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 9",
    "tr": "Avokado 9",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 9",
    "tr": "Gökdelen 9",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 9",
    "tr": "Köprü 9",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 9",
    "tr": "Cesaret 9",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 9",
    "tr": "Bilgelik 9",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 9",
    "tr": "Melodi 9",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 9",
    "tr": "Tuval 9",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 9",
    "tr": "Gökkuşağı 9",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 9",
    "tr": "Bisiklet 9",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 10",
    "tr": "Evren 10",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 10",
    "tr": "Yerçekimi 10",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 10",
    "tr": "Galaksi 10",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 10",
    "tr": "Mikroskop 10",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 10",
    "tr": "Okyanus 10",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 10",
    "tr": "Yanardağ 10",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 10",
    "tr": "Orman 10",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 10",
    "tr": "Fil 10",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 10",
    "tr": "Kelebek 10",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 10",
    "tr": "Akıllı Telefon 10",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 10",
    "tr": "Dizüstü Bilgisayar 10",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 10",
    "tr": "Çikolata 10",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 10",
    "tr": "Avokado 10",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 10",
    "tr": "Gökdelen 10",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 10",
    "tr": "Köprü 10",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 10",
    "tr": "Cesaret 10",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 10",
    "tr": "Bilgelik 10",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 10",
    "tr": "Melodi 10",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 10",
    "tr": "Tuval 10",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 10",
    "tr": "Gökkuşağı 10",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 10",
    "tr": "Bisiklet 10",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 11",
    "tr": "Evren 11",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 11",
    "tr": "Yerçekimi 11",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 11",
    "tr": "Galaksi 11",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 11",
    "tr": "Mikroskop 11",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 11",
    "tr": "Okyanus 11",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 11",
    "tr": "Yanardağ 11",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 11",
    "tr": "Orman 11",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 11",
    "tr": "Fil 11",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 11",
    "tr": "Kelebek 11",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 11",
    "tr": "Akıllı Telefon 11",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 11",
    "tr": "Dizüstü Bilgisayar 11",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 11",
    "tr": "Çikolata 11",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 11",
    "tr": "Avokado 11",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 11",
    "tr": "Gökdelen 11",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 11",
    "tr": "Köprü 11",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 11",
    "tr": "Cesaret 11",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 11",
    "tr": "Bilgelik 11",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 11",
    "tr": "Melodi 11",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 11",
    "tr": "Tuval 11",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 11",
    "tr": "Gökkuşağı 11",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 11",
    "tr": "Bisiklet 11",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 12",
    "tr": "Evren 12",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 12",
    "tr": "Yerçekimi 12",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 12",
    "tr": "Galaksi 12",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 12",
    "tr": "Mikroskop 12",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 12",
    "tr": "Okyanus 12",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 12",
    "tr": "Yanardağ 12",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 12",
    "tr": "Orman 12",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 12",
    "tr": "Fil 12",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 12",
    "tr": "Kelebek 12",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 12",
    "tr": "Akıllı Telefon 12",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 12",
    "tr": "Dizüstü Bilgisayar 12",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 12",
    "tr": "Çikolata 12",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 12",
    "tr": "Avokado 12",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 12",
    "tr": "Gökdelen 12",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 12",
    "tr": "Köprü 12",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 12",
    "tr": "Cesaret 12",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 12",
    "tr": "Bilgelik 12",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 12",
    "tr": "Melodi 12",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 12",
    "tr": "Tuval 12",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 12",
    "tr": "Gökkuşağı 12",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 12",
    "tr": "Bisiklet 12",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 13",
    "tr": "Evren 13",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 13",
    "tr": "Yerçekimi 13",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 13",
    "tr": "Galaksi 13",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 13",
    "tr": "Mikroskop 13",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 13",
    "tr": "Okyanus 13",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 13",
    "tr": "Yanardağ 13",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 13",
    "tr": "Orman 13",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 13",
    "tr": "Fil 13",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 13",
    "tr": "Kelebek 13",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 13",
    "tr": "Akıllı Telefon 13",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 13",
    "tr": "Dizüstü Bilgisayar 13",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 13",
    "tr": "Çikolata 13",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 13",
    "tr": "Avokado 13",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 13",
    "tr": "Gökdelen 13",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 13",
    "tr": "Köprü 13",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 13",
    "tr": "Cesaret 13",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 13",
    "tr": "Bilgelik 13",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 13",
    "tr": "Melodi 13",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 13",
    "tr": "Tuval 13",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 13",
    "tr": "Gökkuşağı 13",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 13",
    "tr": "Bisiklet 13",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 14",
    "tr": "Evren 14",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 14",
    "tr": "Yerçekimi 14",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 14",
    "tr": "Galaksi 14",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 14",
    "tr": "Mikroskop 14",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 14",
    "tr": "Okyanus 14",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 14",
    "tr": "Yanardağ 14",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Forest 14",
    "tr": "Orman 14",
    "ipa": "/ˈfɒr.ɪst/",
    "ex": "This is an example for Forest.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Elephant 14",
    "tr": "Fil 14",
    "ipa": "/ˈelɪfənt/",
    "ex": "This is an example for Elephant.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Butterfly 14",
    "tr": "Kelebek 14",
    "ipa": "/ˈbʌtəflaɪ/",
    "ex": "This is an example for Butterfly.",
    "cat": "Hayvanlar",
    "icon": "🦁",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Smartphone 14",
    "tr": "Akıllı Telefon 14",
    "ipa": "/ˈsmɑːrt.fəʊn/",
    "ex": "This is an example for Smartphone.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Laptop 14",
    "tr": "Dizüstü Bilgisayar 14",
    "ipa": "/ˈlæp.tɒp/",
    "ex": "This is an example for Laptop.",
    "cat": "Teknoloji",
    "icon": "💻",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Chocolate 14",
    "tr": "Çikolata 14",
    "ipa": "/ˈtʃɒk.lət/",
    "ex": "This is an example for Chocolate.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Avocado 14",
    "tr": "Avokado 14",
    "ipa": "/ˌæv.əˈkɑː.dəʊ/",
    "ex": "This is an example for Avocado.",
    "cat": "Mutfak",
    "icon": "🍳",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Skyscraper 14",
    "tr": "Gökdelen 14",
    "ipa": "/ˈskaɪˌskreɪ.pər/",
    "ex": "This is an example for Skyscraper.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bridge 14",
    "tr": "Köprü 14",
    "ipa": "/brɪdʒ/",
    "ex": "This is an example for Bridge.",
    "cat": "Mimari",
    "icon": "🏛️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Courage 14",
    "tr": "Cesaret 14",
    "ipa": "/ˈkɜːr.ɪdʒ/",
    "ex": "This is an example for Courage.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Wisdom 14",
    "tr": "Bilgelik 14",
    "ipa": "/ˈwɪz.dəm/",
    "ex": "This is an example for Wisdom.",
    "cat": "Kavram",
    "icon": "💡",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Melody 14",
    "tr": "Melodi 14",
    "ipa": "/ˈmel.ə.di/",
    "ex": "This is an example for Melody.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Canvas 14",
    "tr": "Tuval 14",
    "ipa": "/ˈkæn.vəs/",
    "ex": "This is an example for Canvas.",
    "cat": "Sanat",
    "icon": "🎨",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Rainbow 14",
    "tr": "Gökkuşağı 14",
    "ipa": "/ˈreɪn.bəʊ/",
    "ex": "This is an example for Rainbow.",
    "cat": "Hava Durumu",
    "icon": "🌤️",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Bicycle 14",
    "tr": "Bisiklet 14",
    "ipa": "/ˈbaɪ.sɪ.kəl/",
    "ex": "This is an example for Bicycle.",
    "cat": "Spor",
    "icon": "⚽",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Universe 15",
    "tr": "Evren 15",
    "ipa": "/ˈjuː.nɪ.vɜːrs/",
    "ex": "This is an example for Universe.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Gravity 15",
    "tr": "Yerçekimi 15",
    "ipa": "/ˈɡræv.ə.ti/",
    "ex": "This is an example for Gravity.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Galaxy 15",
    "tr": "Galaksi 15",
    "ipa": "/ˈɡæl.ək.si/",
    "ex": "This is an example for Galaxy.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Microscope 15",
    "tr": "Mikroskop 15",
    "ipa": "/ˈmaɪ.krə.skəʊp/",
    "ex": "This is an example for Microscope.",
    "cat": "Bilim",
    "icon": "🧪",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Ocean 15",
    "tr": "Okyanus 15",
    "ipa": "/ˈoʊ.ʃən/",
    "ex": "This is an example for Ocean.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  },
  {
    "en": "Volcano 15",
    "tr": "Yanardağ 15",
    "ipa": "/vɒlˈkeɪ.nəʊ/",
    "ex": "This is an example for Volcano.",
    "cat": "Doğa",
    "icon": "🌲",
    "img": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop&q=30&fm=webp"
  }
];

const SPEAK_CHALLENGES = {
  "easy": [
    "Hello, how are you today?",
    "My name is Alex 2.",
    "I like to read books 3.",
    "The weather is really beautiful 4.",
    "Can you please help me?",
    "I would like a cup of coffee 6.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 8.",
    "This is a really nice city 9.",
    "Hello, how are you today?",
    "My name is Alex 11.",
    "I like to read books 12.",
    "The weather is really beautiful 13.",
    "Can you please help me?",
    "I would like a cup of coffee 15.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 17.",
    "This is a really nice city 18.",
    "Hello, how are you today?",
    "My name is Alex 20.",
    "I like to read books 21.",
    "The weather is really beautiful 22.",
    "Can you please help me?",
    "I would like a cup of coffee 24.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 26.",
    "This is a really nice city 27.",
    "Hello, how are you today?",
    "My name is Alex 29.",
    "I like to read books 30.",
    "The weather is really beautiful 31.",
    "Can you please help me?",
    "I would like a cup of coffee 33.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 35.",
    "This is a really nice city 36.",
    "Hello, how are you today?",
    "My name is Alex 38.",
    "I like to read books 39.",
    "The weather is really beautiful 40.",
    "Can you please help me?",
    "I would like a cup of coffee 42.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 44.",
    "This is a really nice city 45.",
    "Hello, how are you today?",
    "My name is Alex 47.",
    "I like to read books 48.",
    "The weather is really beautiful 49.",
    "Can you please help me?",
    "I would like a cup of coffee 51.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 53.",
    "This is a really nice city 54.",
    "Hello, how are you today?",
    "My name is Alex 56.",
    "I like to read books 57.",
    "The weather is really beautiful 58.",
    "Can you please help me?",
    "I would like a cup of coffee 60.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 62.",
    "This is a really nice city 63.",
    "Hello, how are you today?",
    "My name is Alex 65.",
    "I like to read books 66.",
    "The weather is really beautiful 67.",
    "Can you please help me?",
    "I would like a cup of coffee 69.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 71.",
    "This is a really nice city 72.",
    "Hello, how are you today?",
    "My name is Alex 74.",
    "I like to read books 75.",
    "The weather is really beautiful 76.",
    "Can you please help me?",
    "I would like a cup of coffee 78.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 80.",
    "This is a really nice city 81.",
    "Hello, how are you today?",
    "My name is Alex 83.",
    "I like to read books 84.",
    "The weather is really beautiful 85.",
    "Can you please help me?",
    "I would like a cup of coffee 87.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 89.",
    "This is a really nice city 90.",
    "Hello, how are you today?",
    "My name is Alex 92.",
    "I like to read books 93.",
    "The weather is really beautiful 94.",
    "Can you please help me?",
    "I would like a cup of coffee 96.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 98.",
    "This is a really nice city 99.",
    "Hello, how are you today?",
    "My name is Alex 101.",
    "I like to read books 102.",
    "The weather is really beautiful 103.",
    "Can you please help me?",
    "I would like a cup of coffee 105.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 107.",
    "This is a really nice city 108.",
    "Hello, how are you today?",
    "My name is Alex 110.",
    "I like to read books 111.",
    "The weather is really beautiful 112.",
    "Can you please help me?",
    "I would like a cup of coffee 114.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 116.",
    "This is a really nice city 117.",
    "Hello, how are you today?",
    "My name is Alex 119.",
    "I like to read books 120.",
    "The weather is really beautiful 121.",
    "Can you please help me?",
    "I would like a cup of coffee 123.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 125.",
    "This is a really nice city 126.",
    "Hello, how are you today?",
    "My name is Alex 128.",
    "I like to read books 129.",
    "The weather is really beautiful 130.",
    "Can you please help me?",
    "I would like a cup of coffee 132.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 134.",
    "This is a really nice city 135.",
    "Hello, how are you today?",
    "My name is Alex 137.",
    "I like to read books 138.",
    "The weather is really beautiful 139.",
    "Can you please help me?",
    "I would like a cup of coffee 141.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 143.",
    "This is a really nice city 144.",
    "Hello, how are you today?",
    "My name is Alex 146.",
    "I like to read books 147.",
    "The weather is really beautiful 148.",
    "Can you please help me?",
    "I would like a cup of coffee 150.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 152.",
    "This is a really nice city 153.",
    "Hello, how are you today?",
    "My name is Alex 155.",
    "I like to read books 156.",
    "The weather is really beautiful 157.",
    "Can you please help me?",
    "I would like a cup of coffee 159.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 161.",
    "This is a really nice city 162.",
    "Hello, how are you today?",
    "My name is Alex 164.",
    "I like to read books 165.",
    "The weather is really beautiful 166.",
    "Can you please help me?",
    "I would like a cup of coffee 168.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 170.",
    "This is a really nice city 171.",
    "Hello, how are you today?",
    "My name is Alex 173.",
    "I like to read books 174.",
    "The weather is really beautiful 175.",
    "Can you please help me?",
    "I would like a cup of coffee 177.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 179.",
    "This is a really nice city 180.",
    "Hello, how are you today?",
    "My name is Alex 182.",
    "I like to read books 183.",
    "The weather is really beautiful 184.",
    "Can you please help me?",
    "I would like a cup of coffee 186.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 188.",
    "This is a really nice city 189.",
    "Hello, how are you today?",
    "My name is Alex 191.",
    "I like to read books 192.",
    "The weather is really beautiful 193.",
    "Can you please help me?",
    "I would like a cup of coffee 195.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 197.",
    "This is a really nice city 198.",
    "Hello, how are you today?",
    "My name is Alex 200.",
    "I like to read books 201.",
    "The weather is really beautiful 202.",
    "Can you please help me?",
    "I would like a cup of coffee 204.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 206.",
    "This is a really nice city 207.",
    "Hello, how are you today?",
    "My name is Alex 209.",
    "I like to read books 210.",
    "The weather is really beautiful 211.",
    "Can you please help me?",
    "I would like a cup of coffee 213.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 215.",
    "This is a really nice city 216.",
    "Hello, how are you today?",
    "My name is Alex 218.",
    "I like to read books 219.",
    "The weather is really beautiful 220.",
    "Can you please help me?",
    "I would like a cup of coffee 222.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 224.",
    "This is a really nice city 225.",
    "Hello, how are you today?",
    "My name is Alex 227.",
    "I like to read books 228.",
    "The weather is really beautiful 229.",
    "Can you please help me?",
    "I would like a cup of coffee 231.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 233.",
    "This is a really nice city 234.",
    "Hello, how are you today?",
    "My name is Alex 236.",
    "I like to read books 237.",
    "The weather is really beautiful 238.",
    "Can you please help me?",
    "I would like a cup of coffee 240.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 242.",
    "This is a really nice city 243.",
    "Hello, how are you today?",
    "My name is Alex 245.",
    "I like to read books 246.",
    "The weather is really beautiful 247.",
    "Can you please help me?",
    "I would like a cup of coffee 249.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 251.",
    "This is a really nice city 252.",
    "Hello, how are you today?",
    "My name is Alex 254.",
    "I like to read books 255.",
    "The weather is really beautiful 256.",
    "Can you please help me?",
    "I would like a cup of coffee 258.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 260.",
    "This is a really nice city 261.",
    "Hello, how are you today?",
    "My name is Alex 263.",
    "I like to read books 264.",
    "The weather is really beautiful 265.",
    "Can you please help me?",
    "I would like a cup of coffee 267.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 269.",
    "This is a really nice city 270.",
    "Hello, how are you today?",
    "My name is Alex 272.",
    "I like to read books 273.",
    "The weather is really beautiful 274.",
    "Can you please help me?",
    "I would like a cup of coffee 276.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 278.",
    "This is a really nice city 279.",
    "Hello, how are you today?",
    "My name is Alex 281.",
    "I like to read books 282.",
    "The weather is really beautiful 283.",
    "Can you please help me?",
    "I would like a cup of coffee 285.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 287.",
    "This is a really nice city 288.",
    "Hello, how are you today?",
    "My name is Alex 290.",
    "I like to read books 291.",
    "The weather is really beautiful 292.",
    "Can you please help me?",
    "I would like a cup of coffee 294.",
    "Where is the nearest bus stop?",
    "I am very happy to meet you 296.",
    "This is a really nice city 297.",
    "Hello, how are you today?",
    "My name is Alex 299.",
    "I like to read books 300."
  ],
  "medium": [
    "Artificial intelligence is shaping our future 1.",
    "Consistency is the key to mastering a language 2.",
    "Technology makes our daily lives so much easier 3.",
    "The quick brown fox jumps over the lazy dog 4.",
    "I'm looking forward to working with your team 5.",
    "Could you please repeat that?",
    "She has been studying English for three years now 7.",
    "Artificial intelligence is shaping our future 8.",
    "Consistency is the key to mastering a language 9.",
    "Technology makes our daily lives so much easier 10.",
    "The quick brown fox jumps over the lazy dog 11.",
    "I'm looking forward to working with your team 12.",
    "Could you please repeat that?",
    "She has been studying English for three years now 14.",
    "Artificial intelligence is shaping our future 15.",
    "Consistency is the key to mastering a language 16.",
    "Technology makes our daily lives so much easier 17.",
    "The quick brown fox jumps over the lazy dog 18.",
    "I'm looking forward to working with your team 19.",
    "Could you please repeat that?",
    "She has been studying English for three years now 21.",
    "Artificial intelligence is shaping our future 22.",
    "Consistency is the key to mastering a language 23.",
    "Technology makes our daily lives so much easier 24.",
    "The quick brown fox jumps over the lazy dog 25.",
    "I'm looking forward to working with your team 26.",
    "Could you please repeat that?",
    "She has been studying English for three years now 28.",
    "Artificial intelligence is shaping our future 29.",
    "Consistency is the key to mastering a language 30.",
    "Technology makes our daily lives so much easier 31.",
    "The quick brown fox jumps over the lazy dog 32.",
    "I'm looking forward to working with your team 33.",
    "Could you please repeat that?",
    "She has been studying English for three years now 35.",
    "Artificial intelligence is shaping our future 36.",
    "Consistency is the key to mastering a language 37.",
    "Technology makes our daily lives so much easier 38.",
    "The quick brown fox jumps over the lazy dog 39.",
    "I'm looking forward to working with your team 40.",
    "Could you please repeat that?",
    "She has been studying English for three years now 42.",
    "Artificial intelligence is shaping our future 43.",
    "Consistency is the key to mastering a language 44.",
    "Technology makes our daily lives so much easier 45.",
    "The quick brown fox jumps over the lazy dog 46.",
    "I'm looking forward to working with your team 47.",
    "Could you please repeat that?",
    "She has been studying English for three years now 49.",
    "Artificial intelligence is shaping our future 50.",
    "Consistency is the key to mastering a language 51.",
    "Technology makes our daily lives so much easier 52.",
    "The quick brown fox jumps over the lazy dog 53.",
    "I'm looking forward to working with your team 54.",
    "Could you please repeat that?",
    "She has been studying English for three years now 56.",
    "Artificial intelligence is shaping our future 57.",
    "Consistency is the key to mastering a language 58.",
    "Technology makes our daily lives so much easier 59.",
    "The quick brown fox jumps over the lazy dog 60.",
    "I'm looking forward to working with your team 61.",
    "Could you please repeat that?",
    "She has been studying English for three years now 63.",
    "Artificial intelligence is shaping our future 64.",
    "Consistency is the key to mastering a language 65.",
    "Technology makes our daily lives so much easier 66.",
    "The quick brown fox jumps over the lazy dog 67.",
    "I'm looking forward to working with your team 68.",
    "Could you please repeat that?",
    "She has been studying English for three years now 70.",
    "Artificial intelligence is shaping our future 71.",
    "Consistency is the key to mastering a language 72.",
    "Technology makes our daily lives so much easier 73.",
    "The quick brown fox jumps over the lazy dog 74.",
    "I'm looking forward to working with your team 75.",
    "Could you please repeat that?",
    "She has been studying English for three years now 77.",
    "Artificial intelligence is shaping our future 78.",
    "Consistency is the key to mastering a language 79.",
    "Technology makes our daily lives so much easier 80.",
    "The quick brown fox jumps over the lazy dog 81.",
    "I'm looking forward to working with your team 82.",
    "Could you please repeat that?",
    "She has been studying English for three years now 84.",
    "Artificial intelligence is shaping our future 85.",
    "Consistency is the key to mastering a language 86.",
    "Technology makes our daily lives so much easier 87.",
    "The quick brown fox jumps over the lazy dog 88.",
    "I'm looking forward to working with your team 89.",
    "Could you please repeat that?",
    "She has been studying English for three years now 91.",
    "Artificial intelligence is shaping our future 92.",
    "Consistency is the key to mastering a language 93.",
    "Technology makes our daily lives so much easier 94.",
    "The quick brown fox jumps over the lazy dog 95.",
    "I'm looking forward to working with your team 96.",
    "Could you please repeat that?",
    "She has been studying English for three years now 98.",
    "Artificial intelligence is shaping our future 99.",
    "Consistency is the key to mastering a language 100.",
    "Technology makes our daily lives so much easier 101.",
    "The quick brown fox jumps over the lazy dog 102.",
    "I'm looking forward to working with your team 103.",
    "Could you please repeat that?",
    "She has been studying English for three years now 105.",
    "Artificial intelligence is shaping our future 106.",
    "Consistency is the key to mastering a language 107.",
    "Technology makes our daily lives so much easier 108.",
    "The quick brown fox jumps over the lazy dog 109.",
    "I'm looking forward to working with your team 110.",
    "Could you please repeat that?",
    "She has been studying English for three years now 112.",
    "Artificial intelligence is shaping our future 113.",
    "Consistency is the key to mastering a language 114.",
    "Technology makes our daily lives so much easier 115.",
    "The quick brown fox jumps over the lazy dog 116.",
    "I'm looking forward to working with your team 117.",
    "Could you please repeat that?",
    "She has been studying English for three years now 119.",
    "Artificial intelligence is shaping our future 120.",
    "Consistency is the key to mastering a language 121.",
    "Technology makes our daily lives so much easier 122.",
    "The quick brown fox jumps over the lazy dog 123.",
    "I'm looking forward to working with your team 124.",
    "Could you please repeat that?",
    "She has been studying English for three years now 126.",
    "Artificial intelligence is shaping our future 127.",
    "Consistency is the key to mastering a language 128.",
    "Technology makes our daily lives so much easier 129.",
    "The quick brown fox jumps over the lazy dog 130.",
    "I'm looking forward to working with your team 131.",
    "Could you please repeat that?",
    "She has been studying English for three years now 133.",
    "Artificial intelligence is shaping our future 134.",
    "Consistency is the key to mastering a language 135.",
    "Technology makes our daily lives so much easier 136.",
    "The quick brown fox jumps over the lazy dog 137.",
    "I'm looking forward to working with your team 138.",
    "Could you please repeat that?",
    "She has been studying English for three years now 140.",
    "Artificial intelligence is shaping our future 141.",
    "Consistency is the key to mastering a language 142.",
    "Technology makes our daily lives so much easier 143.",
    "The quick brown fox jumps over the lazy dog 144.",
    "I'm looking forward to working with your team 145.",
    "Could you please repeat that?",
    "She has been studying English for three years now 147.",
    "Artificial intelligence is shaping our future 148.",
    "Consistency is the key to mastering a language 149.",
    "Technology makes our daily lives so much easier 150.",
    "The quick brown fox jumps over the lazy dog 151.",
    "I'm looking forward to working with your team 152.",
    "Could you please repeat that?",
    "She has been studying English for three years now 154.",
    "Artificial intelligence is shaping our future 155.",
    "Consistency is the key to mastering a language 156.",
    "Technology makes our daily lives so much easier 157.",
    "The quick brown fox jumps over the lazy dog 158.",
    "I'm looking forward to working with your team 159.",
    "Could you please repeat that?",
    "She has been studying English for three years now 161.",
    "Artificial intelligence is shaping our future 162.",
    "Consistency is the key to mastering a language 163.",
    "Technology makes our daily lives so much easier 164.",
    "The quick brown fox jumps over the lazy dog 165.",
    "I'm looking forward to working with your team 166.",
    "Could you please repeat that?",
    "She has been studying English for three years now 168.",
    "Artificial intelligence is shaping our future 169.",
    "Consistency is the key to mastering a language 170.",
    "Technology makes our daily lives so much easier 171.",
    "The quick brown fox jumps over the lazy dog 172.",
    "I'm looking forward to working with your team 173.",
    "Could you please repeat that?",
    "She has been studying English for three years now 175.",
    "Artificial intelligence is shaping our future 176.",
    "Consistency is the key to mastering a language 177.",
    "Technology makes our daily lives so much easier 178.",
    "The quick brown fox jumps over the lazy dog 179.",
    "I'm looking forward to working with your team 180.",
    "Could you please repeat that?",
    "She has been studying English for three years now 182.",
    "Artificial intelligence is shaping our future 183.",
    "Consistency is the key to mastering a language 184.",
    "Technology makes our daily lives so much easier 185.",
    "The quick brown fox jumps over the lazy dog 186.",
    "I'm looking forward to working with your team 187.",
    "Could you please repeat that?",
    "She has been studying English for three years now 189.",
    "Artificial intelligence is shaping our future 190.",
    "Consistency is the key to mastering a language 191.",
    "Technology makes our daily lives so much easier 192.",
    "The quick brown fox jumps over the lazy dog 193.",
    "I'm looking forward to working with your team 194.",
    "Could you please repeat that?",
    "She has been studying English for three years now 196.",
    "Artificial intelligence is shaping our future 197.",
    "Consistency is the key to mastering a language 198.",
    "Technology makes our daily lives so much easier 199.",
    "The quick brown fox jumps over the lazy dog 200.",
    "I'm looking forward to working with your team 201.",
    "Could you please repeat that?",
    "She has been studying English for three years now 203.",
    "Artificial intelligence is shaping our future 204.",
    "Consistency is the key to mastering a language 205.",
    "Technology makes our daily lives so much easier 206.",
    "The quick brown fox jumps over the lazy dog 207.",
    "I'm looking forward to working with your team 208.",
    "Could you please repeat that?",
    "She has been studying English for three years now 210.",
    "Artificial intelligence is shaping our future 211.",
    "Consistency is the key to mastering a language 212.",
    "Technology makes our daily lives so much easier 213.",
    "The quick brown fox jumps over the lazy dog 214.",
    "I'm looking forward to working with your team 215.",
    "Could you please repeat that?",
    "She has been studying English for three years now 217.",
    "Artificial intelligence is shaping our future 218.",
    "Consistency is the key to mastering a language 219.",
    "Technology makes our daily lives so much easier 220.",
    "The quick brown fox jumps over the lazy dog 221.",
    "I'm looking forward to working with your team 222.",
    "Could you please repeat that?",
    "She has been studying English for three years now 224.",
    "Artificial intelligence is shaping our future 225.",
    "Consistency is the key to mastering a language 226.",
    "Technology makes our daily lives so much easier 227.",
    "The quick brown fox jumps over the lazy dog 228.",
    "I'm looking forward to working with your team 229.",
    "Could you please repeat that?",
    "She has been studying English for three years now 231.",
    "Artificial intelligence is shaping our future 232.",
    "Consistency is the key to mastering a language 233.",
    "Technology makes our daily lives so much easier 234.",
    "The quick brown fox jumps over the lazy dog 235.",
    "I'm looking forward to working with your team 236.",
    "Could you please repeat that?",
    "She has been studying English for three years now 238.",
    "Artificial intelligence is shaping our future 239.",
    "Consistency is the key to mastering a language 240.",
    "Technology makes our daily lives so much easier 241.",
    "The quick brown fox jumps over the lazy dog 242.",
    "I'm looking forward to working with your team 243.",
    "Could you please repeat that?",
    "She has been studying English for three years now 245.",
    "Artificial intelligence is shaping our future 246.",
    "Consistency is the key to mastering a language 247.",
    "Technology makes our daily lives so much easier 248.",
    "The quick brown fox jumps over the lazy dog 249.",
    "I'm looking forward to working with your team 250.",
    "Could you please repeat that?",
    "She has been studying English for three years now 252.",
    "Artificial intelligence is shaping our future 253.",
    "Consistency is the key to mastering a language 254.",
    "Technology makes our daily lives so much easier 255.",
    "The quick brown fox jumps over the lazy dog 256.",
    "I'm looking forward to working with your team 257.",
    "Could you please repeat that?",
    "She has been studying English for three years now 259.",
    "Artificial intelligence is shaping our future 260.",
    "Consistency is the key to mastering a language 261.",
    "Technology makes our daily lives so much easier 262.",
    "The quick brown fox jumps over the lazy dog 263.",
    "I'm looking forward to working with your team 264.",
    "Could you please repeat that?",
    "She has been studying English for three years now 266.",
    "Artificial intelligence is shaping our future 267.",
    "Consistency is the key to mastering a language 268.",
    "Technology makes our daily lives so much easier 269.",
    "The quick brown fox jumps over the lazy dog 270.",
    "I'm looking forward to working with your team 271.",
    "Could you please repeat that?",
    "She has been studying English for three years now 273.",
    "Artificial intelligence is shaping our future 274.",
    "Consistency is the key to mastering a language 275.",
    "Technology makes our daily lives so much easier 276.",
    "The quick brown fox jumps over the lazy dog 277.",
    "I'm looking forward to working with your team 278.",
    "Could you please repeat that?",
    "She has been studying English for three years now 280.",
    "Artificial intelligence is shaping our future 281.",
    "Consistency is the key to mastering a language 282.",
    "Technology makes our daily lives so much easier 283.",
    "The quick brown fox jumps over the lazy dog 284.",
    "I'm looking forward to working with your team 285.",
    "Could you please repeat that?",
    "She has been studying English for three years now 287.",
    "Artificial intelligence is shaping our future 288.",
    "Consistency is the key to mastering a language 289.",
    "Technology makes our daily lives so much easier 290.",
    "The quick brown fox jumps over the lazy dog 291.",
    "I'm looking forward to working with your team 292.",
    "Could you please repeat that?",
    "She has been studying English for three years now 294.",
    "Artificial intelligence is shaping our future 295.",
    "Consistency is the key to mastering a language 296.",
    "Technology makes our daily lives so much easier 297.",
    "The quick brown fox jumps over the lazy dog 298.",
    "I'm looking forward to working with your team 299.",
    "Could you please repeat that?"
  ],
  "hard": [
    "The entrepreneur's perseverance ultimately led to unprecedented success 1.",
    "Photosynthesis is the process by which plants convert sunlight into energy 2.",
    "The parliamentary committee thoroughly investigated the allegations 3.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 4.",
    "Despite the bureaucratic obstacles, the project was completed successfully 5.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 6.",
    "Photosynthesis is the process by which plants convert sunlight into energy 7.",
    "The parliamentary committee thoroughly investigated the allegations 8.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 9.",
    "Despite the bureaucratic obstacles, the project was completed successfully 10.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 11.",
    "Photosynthesis is the process by which plants convert sunlight into energy 12.",
    "The parliamentary committee thoroughly investigated the allegations 13.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 14.",
    "Despite the bureaucratic obstacles, the project was completed successfully 15.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 16.",
    "Photosynthesis is the process by which plants convert sunlight into energy 17.",
    "The parliamentary committee thoroughly investigated the allegations 18.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 19.",
    "Despite the bureaucratic obstacles, the project was completed successfully 20.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 21.",
    "Photosynthesis is the process by which plants convert sunlight into energy 22.",
    "The parliamentary committee thoroughly investigated the allegations 23.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 24.",
    "Despite the bureaucratic obstacles, the project was completed successfully 25.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 26.",
    "Photosynthesis is the process by which plants convert sunlight into energy 27.",
    "The parliamentary committee thoroughly investigated the allegations 28.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 29.",
    "Despite the bureaucratic obstacles, the project was completed successfully 30.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 31.",
    "Photosynthesis is the process by which plants convert sunlight into energy 32.",
    "The parliamentary committee thoroughly investigated the allegations 33.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 34.",
    "Despite the bureaucratic obstacles, the project was completed successfully 35.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 36.",
    "Photosynthesis is the process by which plants convert sunlight into energy 37.",
    "The parliamentary committee thoroughly investigated the allegations 38.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 39.",
    "Despite the bureaucratic obstacles, the project was completed successfully 40.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 41.",
    "Photosynthesis is the process by which plants convert sunlight into energy 42.",
    "The parliamentary committee thoroughly investigated the allegations 43.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 44.",
    "Despite the bureaucratic obstacles, the project was completed successfully 45.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 46.",
    "Photosynthesis is the process by which plants convert sunlight into energy 47.",
    "The parliamentary committee thoroughly investigated the allegations 48.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 49.",
    "Despite the bureaucratic obstacles, the project was completed successfully 50.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 51.",
    "Photosynthesis is the process by which plants convert sunlight into energy 52.",
    "The parliamentary committee thoroughly investigated the allegations 53.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 54.",
    "Despite the bureaucratic obstacles, the project was completed successfully 55.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 56.",
    "Photosynthesis is the process by which plants convert sunlight into energy 57.",
    "The parliamentary committee thoroughly investigated the allegations 58.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 59.",
    "Despite the bureaucratic obstacles, the project was completed successfully 60.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 61.",
    "Photosynthesis is the process by which plants convert sunlight into energy 62.",
    "The parliamentary committee thoroughly investigated the allegations 63.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 64.",
    "Despite the bureaucratic obstacles, the project was completed successfully 65.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 66.",
    "Photosynthesis is the process by which plants convert sunlight into energy 67.",
    "The parliamentary committee thoroughly investigated the allegations 68.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 69.",
    "Despite the bureaucratic obstacles, the project was completed successfully 70.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 71.",
    "Photosynthesis is the process by which plants convert sunlight into energy 72.",
    "The parliamentary committee thoroughly investigated the allegations 73.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 74.",
    "Despite the bureaucratic obstacles, the project was completed successfully 75.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 76.",
    "Photosynthesis is the process by which plants convert sunlight into energy 77.",
    "The parliamentary committee thoroughly investigated the allegations 78.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 79.",
    "Despite the bureaucratic obstacles, the project was completed successfully 80.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 81.",
    "Photosynthesis is the process by which plants convert sunlight into energy 82.",
    "The parliamentary committee thoroughly investigated the allegations 83.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 84.",
    "Despite the bureaucratic obstacles, the project was completed successfully 85.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 86.",
    "Photosynthesis is the process by which plants convert sunlight into energy 87.",
    "The parliamentary committee thoroughly investigated the allegations 88.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 89.",
    "Despite the bureaucratic obstacles, the project was completed successfully 90.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 91.",
    "Photosynthesis is the process by which plants convert sunlight into energy 92.",
    "The parliamentary committee thoroughly investigated the allegations 93.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 94.",
    "Despite the bureaucratic obstacles, the project was completed successfully 95.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 96.",
    "Photosynthesis is the process by which plants convert sunlight into energy 97.",
    "The parliamentary committee thoroughly investigated the allegations 98.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 99.",
    "Despite the bureaucratic obstacles, the project was completed successfully 100.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 101.",
    "Photosynthesis is the process by which plants convert sunlight into energy 102.",
    "The parliamentary committee thoroughly investigated the allegations 103.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 104.",
    "Despite the bureaucratic obstacles, the project was completed successfully 105.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 106.",
    "Photosynthesis is the process by which plants convert sunlight into energy 107.",
    "The parliamentary committee thoroughly investigated the allegations 108.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 109.",
    "Despite the bureaucratic obstacles, the project was completed successfully 110.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 111.",
    "Photosynthesis is the process by which plants convert sunlight into energy 112.",
    "The parliamentary committee thoroughly investigated the allegations 113.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 114.",
    "Despite the bureaucratic obstacles, the project was completed successfully 115.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 116.",
    "Photosynthesis is the process by which plants convert sunlight into energy 117.",
    "The parliamentary committee thoroughly investigated the allegations 118.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 119.",
    "Despite the bureaucratic obstacles, the project was completed successfully 120.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 121.",
    "Photosynthesis is the process by which plants convert sunlight into energy 122.",
    "The parliamentary committee thoroughly investigated the allegations 123.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 124.",
    "Despite the bureaucratic obstacles, the project was completed successfully 125.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 126.",
    "Photosynthesis is the process by which plants convert sunlight into energy 127.",
    "The parliamentary committee thoroughly investigated the allegations 128.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 129.",
    "Despite the bureaucratic obstacles, the project was completed successfully 130.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 131.",
    "Photosynthesis is the process by which plants convert sunlight into energy 132.",
    "The parliamentary committee thoroughly investigated the allegations 133.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 134.",
    "Despite the bureaucratic obstacles, the project was completed successfully 135.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 136.",
    "Photosynthesis is the process by which plants convert sunlight into energy 137.",
    "The parliamentary committee thoroughly investigated the allegations 138.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 139.",
    "Despite the bureaucratic obstacles, the project was completed successfully 140.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 141.",
    "Photosynthesis is the process by which plants convert sunlight into energy 142.",
    "The parliamentary committee thoroughly investigated the allegations 143.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 144.",
    "Despite the bureaucratic obstacles, the project was completed successfully 145.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 146.",
    "Photosynthesis is the process by which plants convert sunlight into energy 147.",
    "The parliamentary committee thoroughly investigated the allegations 148.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 149.",
    "Despite the bureaucratic obstacles, the project was completed successfully 150.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 151.",
    "Photosynthesis is the process by which plants convert sunlight into energy 152.",
    "The parliamentary committee thoroughly investigated the allegations 153.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 154.",
    "Despite the bureaucratic obstacles, the project was completed successfully 155.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 156.",
    "Photosynthesis is the process by which plants convert sunlight into energy 157.",
    "The parliamentary committee thoroughly investigated the allegations 158.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 159.",
    "Despite the bureaucratic obstacles, the project was completed successfully 160.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 161.",
    "Photosynthesis is the process by which plants convert sunlight into energy 162.",
    "The parliamentary committee thoroughly investigated the allegations 163.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 164.",
    "Despite the bureaucratic obstacles, the project was completed successfully 165.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 166.",
    "Photosynthesis is the process by which plants convert sunlight into energy 167.",
    "The parliamentary committee thoroughly investigated the allegations 168.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 169.",
    "Despite the bureaucratic obstacles, the project was completed successfully 170.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 171.",
    "Photosynthesis is the process by which plants convert sunlight into energy 172.",
    "The parliamentary committee thoroughly investigated the allegations 173.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 174.",
    "Despite the bureaucratic obstacles, the project was completed successfully 175.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 176.",
    "Photosynthesis is the process by which plants convert sunlight into energy 177.",
    "The parliamentary committee thoroughly investigated the allegations 178.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 179.",
    "Despite the bureaucratic obstacles, the project was completed successfully 180.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 181.",
    "Photosynthesis is the process by which plants convert sunlight into energy 182.",
    "The parliamentary committee thoroughly investigated the allegations 183.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 184.",
    "Despite the bureaucratic obstacles, the project was completed successfully 185.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 186.",
    "Photosynthesis is the process by which plants convert sunlight into energy 187.",
    "The parliamentary committee thoroughly investigated the allegations 188.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 189.",
    "Despite the bureaucratic obstacles, the project was completed successfully 190.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 191.",
    "Photosynthesis is the process by which plants convert sunlight into energy 192.",
    "The parliamentary committee thoroughly investigated the allegations 193.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 194.",
    "Despite the bureaucratic obstacles, the project was completed successfully 195.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 196.",
    "Photosynthesis is the process by which plants convert sunlight into energy 197.",
    "The parliamentary committee thoroughly investigated the allegations 198.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 199.",
    "Despite the bureaucratic obstacles, the project was completed successfully 200.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 201.",
    "Photosynthesis is the process by which plants convert sunlight into energy 202.",
    "The parliamentary committee thoroughly investigated the allegations 203.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 204.",
    "Despite the bureaucratic obstacles, the project was completed successfully 205.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 206.",
    "Photosynthesis is the process by which plants convert sunlight into energy 207.",
    "The parliamentary committee thoroughly investigated the allegations 208.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 209.",
    "Despite the bureaucratic obstacles, the project was completed successfully 210.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 211.",
    "Photosynthesis is the process by which plants convert sunlight into energy 212.",
    "The parliamentary committee thoroughly investigated the allegations 213.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 214.",
    "Despite the bureaucratic obstacles, the project was completed successfully 215.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 216.",
    "Photosynthesis is the process by which plants convert sunlight into energy 217.",
    "The parliamentary committee thoroughly investigated the allegations 218.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 219.",
    "Despite the bureaucratic obstacles, the project was completed successfully 220.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 221.",
    "Photosynthesis is the process by which plants convert sunlight into energy 222.",
    "The parliamentary committee thoroughly investigated the allegations 223.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 224.",
    "Despite the bureaucratic obstacles, the project was completed successfully 225.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 226.",
    "Photosynthesis is the process by which plants convert sunlight into energy 227.",
    "The parliamentary committee thoroughly investigated the allegations 228.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 229.",
    "Despite the bureaucratic obstacles, the project was completed successfully 230.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 231.",
    "Photosynthesis is the process by which plants convert sunlight into energy 232.",
    "The parliamentary committee thoroughly investigated the allegations 233.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 234.",
    "Despite the bureaucratic obstacles, the project was completed successfully 235.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 236.",
    "Photosynthesis is the process by which plants convert sunlight into energy 237.",
    "The parliamentary committee thoroughly investigated the allegations 238.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 239.",
    "Despite the bureaucratic obstacles, the project was completed successfully 240.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 241.",
    "Photosynthesis is the process by which plants convert sunlight into energy 242.",
    "The parliamentary committee thoroughly investigated the allegations 243.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 244.",
    "Despite the bureaucratic obstacles, the project was completed successfully 245.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 246.",
    "Photosynthesis is the process by which plants convert sunlight into energy 247.",
    "The parliamentary committee thoroughly investigated the allegations 248.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 249.",
    "Despite the bureaucratic obstacles, the project was completed successfully 250.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 251.",
    "Photosynthesis is the process by which plants convert sunlight into energy 252.",
    "The parliamentary committee thoroughly investigated the allegations 253.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 254.",
    "Despite the bureaucratic obstacles, the project was completed successfully 255.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 256.",
    "Photosynthesis is the process by which plants convert sunlight into energy 257.",
    "The parliamentary committee thoroughly investigated the allegations 258.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 259.",
    "Despite the bureaucratic obstacles, the project was completed successfully 260.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 261.",
    "Photosynthesis is the process by which plants convert sunlight into energy 262.",
    "The parliamentary committee thoroughly investigated the allegations 263.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 264.",
    "Despite the bureaucratic obstacles, the project was completed successfully 265.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 266.",
    "Photosynthesis is the process by which plants convert sunlight into energy 267.",
    "The parliamentary committee thoroughly investigated the allegations 268.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 269.",
    "Despite the bureaucratic obstacles, the project was completed successfully 270.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 271.",
    "Photosynthesis is the process by which plants convert sunlight into energy 272.",
    "The parliamentary committee thoroughly investigated the allegations 273.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 274.",
    "Despite the bureaucratic obstacles, the project was completed successfully 275.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 276.",
    "Photosynthesis is the process by which plants convert sunlight into energy 277.",
    "The parliamentary committee thoroughly investigated the allegations 278.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 279.",
    "Despite the bureaucratic obstacles, the project was completed successfully 280.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 281.",
    "Photosynthesis is the process by which plants convert sunlight into energy 282.",
    "The parliamentary committee thoroughly investigated the allegations 283.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 284.",
    "Despite the bureaucratic obstacles, the project was completed successfully 285.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 286.",
    "Photosynthesis is the process by which plants convert sunlight into energy 287.",
    "The parliamentary committee thoroughly investigated the allegations 288.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 289.",
    "Despite the bureaucratic obstacles, the project was completed successfully 290.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 291.",
    "Photosynthesis is the process by which plants convert sunlight into energy 292.",
    "The parliamentary committee thoroughly investigated the allegations 293.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 294.",
    "Despite the bureaucratic obstacles, the project was completed successfully 295.",
    "The entrepreneur's perseverance ultimately led to unprecedented success 296.",
    "Photosynthesis is the process by which plants convert sunlight into energy 297.",
    "The parliamentary committee thoroughly investigated the allegations 298.",
    "Her enthusiasm for astrophysics was truly extraordinary and inspiring 299.",
    "Despite the bureaucratic obstacles, the project was completed successfully 300."
  ]
};

const PHRASES = [
  {
    "en": "How’s it going 1?",
    "tr": "Nasıl gidiyor?",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 1?",
    "tr": "Bana yardım edebilir misiniz?",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 1.",
    "tr": "Tren istasyonunu arıyorum.",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 1?",
    "tr": "Bu ne kadar?",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 1?",
    "tr": "Hesabı alabilir miyim?",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 1?",
    "tr": "En yakın eczane nerede?",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 1?",
    "tr": "Hava nasıl?",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 1!",
    "tr": "Böyle devam et!",
    "cat": "İş"
  },
  {
    "en": "I agree with you 1.",
    "tr": "Sana katılıyorum.",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 1.",
    "tr": "Geç olsun da güç olmasın.",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 1!",
    "tr": "Çok heyecanlıyım!",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 2?",
    "tr": "Nasıl gidiyor? (2)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 2?",
    "tr": "Bana yardım edebilir misiniz? (2)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 2.",
    "tr": "Tren istasyonunu arıyorum. (2)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 2?",
    "tr": "Bu ne kadar? (2)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 2?",
    "tr": "Hesabı alabilir miyim? (2)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 2?",
    "tr": "En yakın eczane nerede? (2)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 2?",
    "tr": "Hava nasıl? (2)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 2!",
    "tr": "Böyle devam et! (2)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 2.",
    "tr": "Sana katılıyorum. (2)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 2.",
    "tr": "Geç olsun da güç olmasın. (2)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 2!",
    "tr": "Çok heyecanlıyım! (2)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 3?",
    "tr": "Nasıl gidiyor? (3)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 3?",
    "tr": "Bana yardım edebilir misiniz? (3)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 3.",
    "tr": "Tren istasyonunu arıyorum. (3)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 3?",
    "tr": "Bu ne kadar? (3)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 3?",
    "tr": "Hesabı alabilir miyim? (3)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 3?",
    "tr": "En yakın eczane nerede? (3)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 3?",
    "tr": "Hava nasıl? (3)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 3!",
    "tr": "Böyle devam et! (3)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 3.",
    "tr": "Sana katılıyorum. (3)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 3.",
    "tr": "Geç olsun da güç olmasın. (3)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 3!",
    "tr": "Çok heyecanlıyım! (3)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 4?",
    "tr": "Nasıl gidiyor? (4)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 4?",
    "tr": "Bana yardım edebilir misiniz? (4)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 4.",
    "tr": "Tren istasyonunu arıyorum. (4)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 4?",
    "tr": "Bu ne kadar? (4)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 4?",
    "tr": "Hesabı alabilir miyim? (4)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 4?",
    "tr": "En yakın eczane nerede? (4)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 4?",
    "tr": "Hava nasıl? (4)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 4!",
    "tr": "Böyle devam et! (4)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 4.",
    "tr": "Sana katılıyorum. (4)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 4.",
    "tr": "Geç olsun da güç olmasın. (4)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 4!",
    "tr": "Çok heyecanlıyım! (4)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 5?",
    "tr": "Nasıl gidiyor? (5)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 5?",
    "tr": "Bana yardım edebilir misiniz? (5)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 5.",
    "tr": "Tren istasyonunu arıyorum. (5)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 5?",
    "tr": "Bu ne kadar? (5)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 5?",
    "tr": "Hesabı alabilir miyim? (5)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 5?",
    "tr": "En yakın eczane nerede? (5)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 5?",
    "tr": "Hava nasıl? (5)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 5!",
    "tr": "Böyle devam et! (5)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 5.",
    "tr": "Sana katılıyorum. (5)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 5.",
    "tr": "Geç olsun da güç olmasın. (5)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 5!",
    "tr": "Çok heyecanlıyım! (5)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 6?",
    "tr": "Nasıl gidiyor? (6)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 6?",
    "tr": "Bana yardım edebilir misiniz? (6)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 6.",
    "tr": "Tren istasyonunu arıyorum. (6)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 6?",
    "tr": "Bu ne kadar? (6)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 6?",
    "tr": "Hesabı alabilir miyim? (6)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 6?",
    "tr": "En yakın eczane nerede? (6)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 6?",
    "tr": "Hava nasıl? (6)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 6!",
    "tr": "Böyle devam et! (6)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 6.",
    "tr": "Sana katılıyorum. (6)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 6.",
    "tr": "Geç olsun da güç olmasın. (6)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 6!",
    "tr": "Çok heyecanlıyım! (6)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 7?",
    "tr": "Nasıl gidiyor? (7)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 7?",
    "tr": "Bana yardım edebilir misiniz? (7)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 7.",
    "tr": "Tren istasyonunu arıyorum. (7)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 7?",
    "tr": "Bu ne kadar? (7)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 7?",
    "tr": "Hesabı alabilir miyim? (7)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 7?",
    "tr": "En yakın eczane nerede? (7)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 7?",
    "tr": "Hava nasıl? (7)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 7!",
    "tr": "Böyle devam et! (7)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 7.",
    "tr": "Sana katılıyorum. (7)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 7.",
    "tr": "Geç olsun da güç olmasın. (7)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 7!",
    "tr": "Çok heyecanlıyım! (7)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 8?",
    "tr": "Nasıl gidiyor? (8)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 8?",
    "tr": "Bana yardım edebilir misiniz? (8)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 8.",
    "tr": "Tren istasyonunu arıyorum. (8)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 8?",
    "tr": "Bu ne kadar? (8)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 8?",
    "tr": "Hesabı alabilir miyim? (8)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 8?",
    "tr": "En yakın eczane nerede? (8)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 8?",
    "tr": "Hava nasıl? (8)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 8!",
    "tr": "Böyle devam et! (8)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 8.",
    "tr": "Sana katılıyorum. (8)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 8.",
    "tr": "Geç olsun da güç olmasın. (8)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 8!",
    "tr": "Çok heyecanlıyım! (8)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 9?",
    "tr": "Nasıl gidiyor? (9)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 9?",
    "tr": "Bana yardım edebilir misiniz? (9)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 9.",
    "tr": "Tren istasyonunu arıyorum. (9)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 9?",
    "tr": "Bu ne kadar? (9)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 9?",
    "tr": "Hesabı alabilir miyim? (9)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 9?",
    "tr": "En yakın eczane nerede? (9)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 9?",
    "tr": "Hava nasıl? (9)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 9!",
    "tr": "Böyle devam et! (9)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 9.",
    "tr": "Sana katılıyorum. (9)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 9.",
    "tr": "Geç olsun da güç olmasın. (9)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 9!",
    "tr": "Çok heyecanlıyım! (9)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 10?",
    "tr": "Nasıl gidiyor? (10)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 10?",
    "tr": "Bana yardım edebilir misiniz? (10)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 10.",
    "tr": "Tren istasyonunu arıyorum. (10)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 10?",
    "tr": "Bu ne kadar? (10)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 10?",
    "tr": "Hesabı alabilir miyim? (10)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 10?",
    "tr": "En yakın eczane nerede? (10)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 10?",
    "tr": "Hava nasıl? (10)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 10!",
    "tr": "Böyle devam et! (10)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 10.",
    "tr": "Sana katılıyorum. (10)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 10.",
    "tr": "Geç olsun da güç olmasın. (10)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 10!",
    "tr": "Çok heyecanlıyım! (10)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 11?",
    "tr": "Nasıl gidiyor? (11)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 11?",
    "tr": "Bana yardım edebilir misiniz? (11)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 11.",
    "tr": "Tren istasyonunu arıyorum. (11)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 11?",
    "tr": "Bu ne kadar? (11)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 11?",
    "tr": "Hesabı alabilir miyim? (11)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 11?",
    "tr": "En yakın eczane nerede? (11)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 11?",
    "tr": "Hava nasıl? (11)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 11!",
    "tr": "Böyle devam et! (11)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 11.",
    "tr": "Sana katılıyorum. (11)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 11.",
    "tr": "Geç olsun da güç olmasın. (11)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 11!",
    "tr": "Çok heyecanlıyım! (11)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 12?",
    "tr": "Nasıl gidiyor? (12)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 12?",
    "tr": "Bana yardım edebilir misiniz? (12)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 12.",
    "tr": "Tren istasyonunu arıyorum. (12)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 12?",
    "tr": "Bu ne kadar? (12)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 12?",
    "tr": "Hesabı alabilir miyim? (12)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 12?",
    "tr": "En yakın eczane nerede? (12)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 12?",
    "tr": "Hava nasıl? (12)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 12!",
    "tr": "Böyle devam et! (12)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 12.",
    "tr": "Sana katılıyorum. (12)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 12.",
    "tr": "Geç olsun da güç olmasın. (12)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 12!",
    "tr": "Çok heyecanlıyım! (12)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 13?",
    "tr": "Nasıl gidiyor? (13)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 13?",
    "tr": "Bana yardım edebilir misiniz? (13)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 13.",
    "tr": "Tren istasyonunu arıyorum. (13)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 13?",
    "tr": "Bu ne kadar? (13)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 13?",
    "tr": "Hesabı alabilir miyim? (13)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 13?",
    "tr": "En yakın eczane nerede? (13)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 13?",
    "tr": "Hava nasıl? (13)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 13!",
    "tr": "Böyle devam et! (13)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 13.",
    "tr": "Sana katılıyorum. (13)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 13.",
    "tr": "Geç olsun da güç olmasın. (13)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 13!",
    "tr": "Çok heyecanlıyım! (13)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 14?",
    "tr": "Nasıl gidiyor? (14)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 14?",
    "tr": "Bana yardım edebilir misiniz? (14)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 14.",
    "tr": "Tren istasyonunu arıyorum. (14)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 14?",
    "tr": "Bu ne kadar? (14)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 14?",
    "tr": "Hesabı alabilir miyim? (14)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 14?",
    "tr": "En yakın eczane nerede? (14)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 14?",
    "tr": "Hava nasıl? (14)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 14!",
    "tr": "Böyle devam et! (14)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 14.",
    "tr": "Sana katılıyorum. (14)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 14.",
    "tr": "Geç olsun da güç olmasın. (14)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 14!",
    "tr": "Çok heyecanlıyım! (14)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 15?",
    "tr": "Nasıl gidiyor? (15)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 15?",
    "tr": "Bana yardım edebilir misiniz? (15)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 15.",
    "tr": "Tren istasyonunu arıyorum. (15)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 15?",
    "tr": "Bu ne kadar? (15)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 15?",
    "tr": "Hesabı alabilir miyim? (15)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 15?",
    "tr": "En yakın eczane nerede? (15)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 15?",
    "tr": "Hava nasıl? (15)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 15!",
    "tr": "Böyle devam et! (15)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 15.",
    "tr": "Sana katılıyorum. (15)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 15.",
    "tr": "Geç olsun da güç olmasın. (15)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 15!",
    "tr": "Çok heyecanlıyım! (15)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 16?",
    "tr": "Nasıl gidiyor? (16)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 16?",
    "tr": "Bana yardım edebilir misiniz? (16)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 16.",
    "tr": "Tren istasyonunu arıyorum. (16)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 16?",
    "tr": "Bu ne kadar? (16)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 16?",
    "tr": "Hesabı alabilir miyim? (16)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 16?",
    "tr": "En yakın eczane nerede? (16)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 16?",
    "tr": "Hava nasıl? (16)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 16!",
    "tr": "Böyle devam et! (16)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 16.",
    "tr": "Sana katılıyorum. (16)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 16.",
    "tr": "Geç olsun da güç olmasın. (16)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 16!",
    "tr": "Çok heyecanlıyım! (16)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 17?",
    "tr": "Nasıl gidiyor? (17)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 17?",
    "tr": "Bana yardım edebilir misiniz? (17)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 17.",
    "tr": "Tren istasyonunu arıyorum. (17)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 17?",
    "tr": "Bu ne kadar? (17)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 17?",
    "tr": "Hesabı alabilir miyim? (17)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 17?",
    "tr": "En yakın eczane nerede? (17)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 17?",
    "tr": "Hava nasıl? (17)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 17!",
    "tr": "Böyle devam et! (17)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 17.",
    "tr": "Sana katılıyorum. (17)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 17.",
    "tr": "Geç olsun da güç olmasın. (17)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 17!",
    "tr": "Çok heyecanlıyım! (17)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 18?",
    "tr": "Nasıl gidiyor? (18)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 18?",
    "tr": "Bana yardım edebilir misiniz? (18)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 18.",
    "tr": "Tren istasyonunu arıyorum. (18)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 18?",
    "tr": "Bu ne kadar? (18)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 18?",
    "tr": "Hesabı alabilir miyim? (18)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 18?",
    "tr": "En yakın eczane nerede? (18)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 18?",
    "tr": "Hava nasıl? (18)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 18!",
    "tr": "Böyle devam et! (18)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 18.",
    "tr": "Sana katılıyorum. (18)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 18.",
    "tr": "Geç olsun da güç olmasın. (18)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 18!",
    "tr": "Çok heyecanlıyım! (18)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 19?",
    "tr": "Nasıl gidiyor? (19)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 19?",
    "tr": "Bana yardım edebilir misiniz? (19)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 19.",
    "tr": "Tren istasyonunu arıyorum. (19)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 19?",
    "tr": "Bu ne kadar? (19)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 19?",
    "tr": "Hesabı alabilir miyim? (19)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 19?",
    "tr": "En yakın eczane nerede? (19)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 19?",
    "tr": "Hava nasıl? (19)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 19!",
    "tr": "Böyle devam et! (19)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 19.",
    "tr": "Sana katılıyorum. (19)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 19.",
    "tr": "Geç olsun da güç olmasın. (19)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 19!",
    "tr": "Çok heyecanlıyım! (19)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 20?",
    "tr": "Nasıl gidiyor? (20)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 20?",
    "tr": "Bana yardım edebilir misiniz? (20)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 20.",
    "tr": "Tren istasyonunu arıyorum. (20)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 20?",
    "tr": "Bu ne kadar? (20)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 20?",
    "tr": "Hesabı alabilir miyim? (20)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 20?",
    "tr": "En yakın eczane nerede? (20)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 20?",
    "tr": "Hava nasıl? (20)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 20!",
    "tr": "Böyle devam et! (20)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 20.",
    "tr": "Sana katılıyorum. (20)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 20.",
    "tr": "Geç olsun da güç olmasın. (20)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 20!",
    "tr": "Çok heyecanlıyım! (20)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 21?",
    "tr": "Nasıl gidiyor? (21)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 21?",
    "tr": "Bana yardım edebilir misiniz? (21)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 21.",
    "tr": "Tren istasyonunu arıyorum. (21)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 21?",
    "tr": "Bu ne kadar? (21)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 21?",
    "tr": "Hesabı alabilir miyim? (21)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 21?",
    "tr": "En yakın eczane nerede? (21)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 21?",
    "tr": "Hava nasıl? (21)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 21!",
    "tr": "Böyle devam et! (21)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 21.",
    "tr": "Sana katılıyorum. (21)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 21.",
    "tr": "Geç olsun da güç olmasın. (21)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 21!",
    "tr": "Çok heyecanlıyım! (21)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 22?",
    "tr": "Nasıl gidiyor? (22)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 22?",
    "tr": "Bana yardım edebilir misiniz? (22)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 22.",
    "tr": "Tren istasyonunu arıyorum. (22)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 22?",
    "tr": "Bu ne kadar? (22)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 22?",
    "tr": "Hesabı alabilir miyim? (22)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 22?",
    "tr": "En yakın eczane nerede? (22)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 22?",
    "tr": "Hava nasıl? (22)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 22!",
    "tr": "Böyle devam et! (22)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 22.",
    "tr": "Sana katılıyorum. (22)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 22.",
    "tr": "Geç olsun da güç olmasın. (22)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 22!",
    "tr": "Çok heyecanlıyım! (22)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 23?",
    "tr": "Nasıl gidiyor? (23)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 23?",
    "tr": "Bana yardım edebilir misiniz? (23)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 23.",
    "tr": "Tren istasyonunu arıyorum. (23)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 23?",
    "tr": "Bu ne kadar? (23)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 23?",
    "tr": "Hesabı alabilir miyim? (23)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 23?",
    "tr": "En yakın eczane nerede? (23)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 23?",
    "tr": "Hava nasıl? (23)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 23!",
    "tr": "Böyle devam et! (23)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 23.",
    "tr": "Sana katılıyorum. (23)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 23.",
    "tr": "Geç olsun da güç olmasın. (23)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 23!",
    "tr": "Çok heyecanlıyım! (23)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 24?",
    "tr": "Nasıl gidiyor? (24)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 24?",
    "tr": "Bana yardım edebilir misiniz? (24)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 24.",
    "tr": "Tren istasyonunu arıyorum. (24)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 24?",
    "tr": "Bu ne kadar? (24)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 24?",
    "tr": "Hesabı alabilir miyim? (24)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 24?",
    "tr": "En yakın eczane nerede? (24)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 24?",
    "tr": "Hava nasıl? (24)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 24!",
    "tr": "Böyle devam et! (24)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 24.",
    "tr": "Sana katılıyorum. (24)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 24.",
    "tr": "Geç olsun da güç olmasın. (24)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 24!",
    "tr": "Çok heyecanlıyım! (24)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 25?",
    "tr": "Nasıl gidiyor? (25)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 25?",
    "tr": "Bana yardım edebilir misiniz? (25)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 25.",
    "tr": "Tren istasyonunu arıyorum. (25)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 25?",
    "tr": "Bu ne kadar? (25)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 25?",
    "tr": "Hesabı alabilir miyim? (25)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 25?",
    "tr": "En yakın eczane nerede? (25)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 25?",
    "tr": "Hava nasıl? (25)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 25!",
    "tr": "Böyle devam et! (25)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 25.",
    "tr": "Sana katılıyorum. (25)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 25.",
    "tr": "Geç olsun da güç olmasın. (25)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 25!",
    "tr": "Çok heyecanlıyım! (25)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 26?",
    "tr": "Nasıl gidiyor? (26)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 26?",
    "tr": "Bana yardım edebilir misiniz? (26)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 26.",
    "tr": "Tren istasyonunu arıyorum. (26)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 26?",
    "tr": "Bu ne kadar? (26)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 26?",
    "tr": "Hesabı alabilir miyim? (26)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 26?",
    "tr": "En yakın eczane nerede? (26)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 26?",
    "tr": "Hava nasıl? (26)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 26!",
    "tr": "Böyle devam et! (26)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 26.",
    "tr": "Sana katılıyorum. (26)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 26.",
    "tr": "Geç olsun da güç olmasın. (26)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 26!",
    "tr": "Çok heyecanlıyım! (26)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 27?",
    "tr": "Nasıl gidiyor? (27)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 27?",
    "tr": "Bana yardım edebilir misiniz? (27)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 27.",
    "tr": "Tren istasyonunu arıyorum. (27)",
    "cat": "Seyahat"
  },
  {
    "en": "How much does this cost 27?",
    "tr": "Bu ne kadar? (27)",
    "cat": "Alışveriş"
  },
  {
    "en": "Can I have the check, please 27?",
    "tr": "Hesabı alabilir miyim? (27)",
    "cat": "Restoran"
  },
  {
    "en": "Where is the nearest pharmacy 27?",
    "tr": "En yakın eczane nerede? (27)",
    "cat": "Acil"
  },
  {
    "en": "What’s the weather like 27?",
    "tr": "Hava nasıl? (27)",
    "cat": "Günlük"
  },
  {
    "en": "Keep up the good work 27!",
    "tr": "Böyle devam et! (27)",
    "cat": "İş"
  },
  {
    "en": "I agree with you 27.",
    "tr": "Sana katılıyorum. (27)",
    "cat": "Tartışma"
  },
  {
    "en": "Better late than never 27.",
    "tr": "Geç olsun da güç olmasın. (27)",
    "cat": "Deyim"
  },
  {
    "en": "I’m thrilled 27!",
    "tr": "Çok heyecanlıyım! (27)",
    "cat": "Duygular"
  },
  {
    "en": "How’s it going 28?",
    "tr": "Nasıl gidiyor? (28)",
    "cat": "Selamlaşma"
  },
  {
    "en": "Could you help me, please 28?",
    "tr": "Bana yardım edebilir misiniz? (28)",
    "cat": "Sosyal"
  },
  {
    "en": "I’m looking for the train station 28.",
    "tr": "Tren istasyonunu arıyorum. (28)",
    "cat": "Seyahat"
  }
];
