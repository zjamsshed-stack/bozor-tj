// Порядок и ключи категорий — должны совпадать с порядком t.cats в Home.jsx
export const CATEGORY_KEYS = [
  "auto", "realestate", "electronics", "jobs", "home_goods",
  "clothes", "kids", "services", "hobby", "animals", "business", "free",
];

// Полный каталог: категория -> подкатегории -> бренды -> модели
// hasBrands: true означает что у подкатегории есть бренды для дальнейшего выбора
export const CATALOG = {
  auto: {
    name: "Транспорт",
    icon: "🚗",
    desc: "Автомобили, мотоциклы, грузовики и запчасти",
    count: "111K+",
    subcats: [
      {
        id: "passenger", name: "Легковые", icon: "🚗", hasBrands: true,
        brands: [
          { id: "toyota", name: "Toyota", models: ["Corolla", "Camry", "RAV4", "Land Cruiser", "Land Cruiser Prado", "Voxy", "Prius", "Highlander", "Avensis", "Yaris", "Hilux", "Fortuner", "Alphard"] },
          { id: "hyundai", name: "Hyundai", models: ["Elantra", "Tucson", "Sonata", "Santa Fe", "Accent", "Solaris", "Creta", "Palisade", "i30"] },
          { id: "kia", name: "Kia", models: ["K5", "Sportage", "Rio", "Sorento", "Cerato", "Sephia", "Soul", "Optima"] },
          { id: "lada", name: "Lada (ВАЗ)", models: ["Granta", "Vesta", "Niva", "Largus", "2107", "2114", "Priora", "XRAY"] },
          { id: "nissan", name: "Nissan", models: ["X-Trail", "Qashqai", "Almera", "Teana", "Patrol", "Tiida", "Note", "Murano"] },
          { id: "bmw", name: "BMW", models: ["3 Series", "5 Series", "X5", "X3", "7 Series", "X1", "X6"] },
          { id: "mercedes", name: "Mercedes-Benz", models: ["C-Class", "E-Class", "GLE", "GLC", "S-Class", "Sprinter", "Vito"] },
          { id: "vw", name: "Volkswagen", models: ["Tiguan", "Passat", "Golf", "Polo", "Jetta", "Touareg"] },
          { id: "chevrolet", name: "Chevrolet", models: ["Cobalt", "Spark", "Nexia", "Malibu", "Lacetti", "Captiva", "Tracker"] },
          { id: "daewoo", name: "Daewoo", models: ["Nexia", "Matiz", "Gentra", "Cobalt"] },
          { id: "lexus", name: "Lexus", models: ["RX", "ES", "LX", "NX", "GX", "LX570"] },
          { id: "honda", name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot", "Fit"] },
          { id: "mazda", name: "Mazda", models: ["CX-5", "Mazda3", "Mazda6", "CX-9"] },
          { id: "mitsubishi", name: "Mitsubishi", models: ["Outlander", "Pajero", "ASX", "Lancer"] },
          { id: "audi", name: "Audi", models: ["A4", "A6", "Q5", "Q7", "A3"] },
          { id: "skoda", name: "Skoda", models: ["Octavia", "Rapid", "Superb", "Kodiaq"] },
          { id: "renault", name: "Renault", models: ["Duster", "Logan", "Sandero", "Arkana"] },
          { id: "ford", name: "Ford", models: ["Focus", "Explorer", "Mustang", "Kuga"] },
          { id: "geely", name: "Geely", models: ["Coolray", "Atlas", "Emgrand", "Monjaro"] },
          { id: "chery", name: "Chery", models: ["Tiggo 7", "Tiggo 8", "Arrizo 5"] },
          { id: "haval", name: "Haval", models: ["Jolion", "F7", "H6", "Dargo"] },
        ],
      },
      {
        id: "truck", name: "Грузовики", icon: "🚚", hasBrands: true,
        brands: [
          { id: "kamaz", name: "КамАЗ", models: ["5320", "65115", "43118", "5410"] },
          { id: "isuzu", name: "Isuzu", models: ["NPR", "Elf", "Forward", "Giga"] },
          { id: "hyundai_t", name: "Hyundai", models: ["HD78", "HD120", "Mighty", "HD65"] },
          { id: "man", name: "MAN", models: ["TGS", "TGX", "TGM"] },
          { id: "kia_t", name: "Kia", models: ["Bongo", "Rhino"] },
          { id: "daf", name: "DAF", models: ["XF", "CF", "LF"] },
        ],
      },
      {
        id: "moto", name: "Мотоциклы", icon: "🏍️", hasBrands: true,
        brands: [
          { id: "honda_m", name: "Honda", models: ["CB400", "CBR600", "Africa Twin", "CB500"] },
          { id: "yamaha", name: "Yamaha", models: ["MT-07", "R1", "YBR125", "Aerox"] },
          { id: "racer", name: "Racer", models: ["Magnum", "Panther", "Hunter"] },
          { id: "irbis", name: "Irbis", models: ["TTR", "Z150"] },
          { id: "suzuki_m", name: "Suzuki", models: ["GSX-R", "Boulevard"] },
        ],
      },
      { id: "parts", name: "Запчасти", icon: "🔧", hasBrands: false },
      { id: "tires", name: "Шины и диски", icon: "🛞", hasBrands: false },
    ],
  },

  electronics: {
    name: "Электроника",
    icon: "📱",
    desc: "Телефоны, ноутбуки, планшеты и аксессуары",
    count: "28K+",
    subcats: [
      {
        id: "phones", name: "Смартфоны", icon: "📱", hasBrands: true,
        brands: [
          { id: "apple", name: "Apple", models: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15", "iPhone 15 Pro Max", "iPhone 16", "iPhone 16 Pro Max"] },
          { id: "samsung", name: "Samsung", models: ["Galaxy A14", "Galaxy A54", "Galaxy S21", "Galaxy S22", "Galaxy S23", "Galaxy S24", "Galaxy S25", "Galaxy S26 Ultra", "Galaxy Z Fold"] },
          { id: "xiaomi", name: "Xiaomi", models: ["Redmi 12", "Redmi Note 12", "Redmi Note 13", "Mi 13", "Poco X6", "Poco M6"] },
          { id: "vivo", name: "Vivo", models: ["Y17", "Y27", "V27", "V29", "Y36", "X100"] },
          { id: "oppo", name: "Oppo", models: ["A78", "Reno 10", "A98", "Find X6"] },
          { id: "honor", name: "Honor", models: ["X7", "X9", "Magic 6", "90"] },
          { id: "huawei", name: "Huawei", models: ["P50", "Nova 11", "Mate 60"] },
          { id: "realme", name: "Realme", models: ["C55", "11 Pro", "GT 5"] },
          { id: "infinix", name: "Infinix", models: ["Hot 40", "Note 30", "Zero 30"] },
          { id: "tecno", name: "Tecno", models: ["Spark 10", "Camon 20", "Pova 5"] },
          { id: "nokia", name: "Nokia", models: ["G42", "C32", "105 (кнопочный)"] },
        ],
      },
      {
        id: "laptops", name: "Ноутбуки", icon: "💻", hasBrands: true,
        brands: [
          { id: "apple_mb", name: "Apple MacBook", models: ["Air M1", "Air M2", "Air M3", "Pro 14 M3", "Pro 16 M3"] },
          { id: "lenovo", name: "Lenovo", models: ["IdeaPad 3", "IdeaPad 5", "ThinkPad X1", "Legion 5"] },
          { id: "hp", name: "HP", models: ["Pavilion", "EliteBook", "Omen", "Probook"] },
          { id: "asus", name: "Asus", models: ["VivoBook", "ZenBook", "ROG Strix", "TUF Gaming"] },
          { id: "dell", name: "Dell", models: ["XPS 13", "Inspiron", "Latitude", "Vostro"] },
          { id: "acer", name: "Acer", models: ["Aspire", "Nitro 5", "Swift"] },
          { id: "msi", name: "MSI", models: ["Modern 14", "Katana", "Stealth"] },
        ],
      },
      {
        id: "tablets", name: "Планшеты", icon: "📲", hasBrands: true,
        brands: [
          { id: "apple_ip", name: "Apple iPad", models: ["iPad 9", "iPad 10", "iPad Air", "iPad Pro 11", "iPad Pro 12.9"] },
          { id: "samsung_t", name: "Samsung", models: ["Tab A9", "Tab S9", "Tab S9 Ultra"] },
          { id: "huawei_t", name: "Huawei", models: ["MatePad 11", "MatePad Pro"] },
        ],
      },
      {
        id: "tv", name: "Телевизоры", icon: "📺", hasBrands: true,
        brands: [
          { id: "samsung_tv", name: "Samsung", models: ["43\" Smart", "55\" QLED", "65\" QLED", "75\" Neo QLED"] },
          { id: "lg", name: "LG", models: ["43\" Smart", "55\" OLED", "65\" OLED"] },
          { id: "artel", name: "Artel", models: ["32\" Smart", "43\" Smart", "55\" Smart"] },
          { id: "xiaomi_tv", name: "Xiaomi", models: ["43\" Mi TV", "55\" Mi TV"] },
        ],
      },
      { id: "accessories", name: "Аксессуары", icon: "🎧", hasBrands: false },
    ],
  },

  realestate: {
    name: "Недвижимость", icon: "🏠", desc: "Квартиры, дома и земельные участки", count: "65K+",
    subcats: [
      { id: "flat_sale", name: "Квартиры — продажа", icon: "🏢", hasBrands: false },
      { id: "flat_rent", name: "Квартиры — аренда", icon: "🔑", hasBrands: false },
      { id: "house", name: "Дома", icon: "🏡", hasBrands: false },
      { id: "land", name: "Участки", icon: "🌳", hasBrands: false },
      { id: "commercial", name: "Коммерческая", icon: "🏬", hasBrands: false },
    ],
  },

  jobs: {
    name: "Работа", icon: "💼", desc: "Вакансии и резюме", count: "42K+",
    subcats: [
      { id: "vacancy", name: "Вакансии", icon: "📋", hasBrands: false },
      { id: "resume", name: "Резюме", icon: "📄", hasBrands: false },
    ],
  },

  home_goods: {
    name: "Для дома", icon: "🛋️", desc: "Мебель, техника, интерьер", count: "19K+",
    subcats: [
      { id: "furniture", name: "Мебель", icon: "🛋️", hasBrands: false },
      {
        id: "appliances", name: "Бытовая техника", icon: "🧺", hasBrands: true,
        brands: [
          { id: "samsung_a", name: "Samsung", models: ["Холодильник", "Стиральная машина", "Микроволновка", "Пылесос"] },
          { id: "lg_a", name: "LG", models: ["Холодильник", "Стиральная машина", "Кондиционер"] },
          { id: "artel_a", name: "Artel", models: ["Холодильник", "Стиральная машина", "Плита"] },
          { id: "bosch", name: "Bosch", models: ["Стиральная машина", "Посудомойка", "Холодильник"] },
          { id: "indesit", name: "Indesit", models: ["Стиральная машина", "Холодильник", "Духовка"] },
        ],
      },
      { id: "decor", name: "Интерьер и декор", icon: "🖼️", hasBrands: false },
    ],
  },

  clothes: {
    name: "Одежда", icon: "👗", desc: "Одежда и обувь", count: "15K+",
    subcats: [
      {
        id: "women", name: "Женская одежда", icon: "👗", hasBrands: true,
        brands: [
          { id: "zara", name: "Zara", models: ["Платья", "Куртки", "Джинсы", "Обувь"] },
          { id: "hm", name: "H&M", models: ["Платья", "Свитеры", "Куртки"] },
          { id: "bershka", name: "Bershka", models: ["Джинсы", "Топы", "Куртки"] },
          { id: "lcw", name: "LC Waikiki", models: ["Платья", "Костюмы", "Обувь"] },
          { id: "nobrand_w", name: "Без бренда", models: ["Разное"] },
        ],
      },
      {
        id: "men", name: "Мужская одежда", icon: "👔", hasBrands: true,
        brands: [
          { id: "nike", name: "Nike", models: ["Кроссовки", "Спортивные костюмы", "Куртки"] },
          { id: "adidas", name: "Adidas", models: ["Кроссовки", "Спортивные костюмы", "Футболки"] },
          { id: "puma", name: "Puma", models: ["Кроссовки", "Худи"] },
          { id: "lcw_m", name: "LC Waikiki", models: ["Рубашки", "Костюмы"] },
          { id: "nobrand_m", name: "Без бренда", models: ["Разное"] },
        ],
      },
      { id: "kids_clothes", name: "Детская одежда", icon: "👶", hasBrands: false },
      { id: "shoes", name: "Обувь", icon: "👟", hasBrands: false },
    ],
  },

  kids: {
    name: "Детский мир", icon: "🧸", desc: "Товары для детей", count: "12K+",
    subcats: [
      { id: "toys", name: "Игрушки", icon: "🧸", hasBrands: false },
      { id: "strollers", name: "Коляски", icon: "🍼", hasBrands: false },
      { id: "kids_furniture", name: "Детская мебель", icon: "🛏️", hasBrands: false },
    ],
  },

  services: {
    name: "Услуги", icon: "🔧", desc: "Все виды услуг", count: "31K+",
    subcats: [
      { id: "repair", name: "Ремонт и строительство", icon: "🔨", hasBrands: false },
      { id: "beauty", name: "Красота и здоровье", icon: "💅", hasBrands: false },
      { id: "education", name: "Обучение", icon: "📚", hasBrands: false },
      { id: "transport_serv", name: "Грузоперевозки", icon: "🚛", hasBrands: false },
    ],
  },

  hobby: {
    name: "Хобби", icon: "⚽", desc: "Спорт и хобби", count: "8K+",
    subcats: [
      { id: "sport", name: "Спортивные товары", icon: "⚽", hasBrands: false },
      { id: "books", name: "Книги", icon: "📖", hasBrands: false },
      { id: "music", name: "Музыкальные инструменты", icon: "🎸", hasBrands: false },
    ],
  },

  animals: {
    name: "Животные", icon: "🐾", desc: "Питомцы и товары для животных", count: "5K+",
    subcats: [
      { id: "pets", name: "Питомцы", icon: "🐶", hasBrands: false },
      { id: "pet_goods", name: "Товары для животных", icon: "🦴", hasBrands: false },
    ],
  },

  business: {
    name: "Бизнес", icon: "📊", desc: "Готовый бизнес и оборудование", count: "7K+",
    subcats: [
      { id: "ready_business", name: "Готовый бизнес", icon: "🏪", hasBrands: false },
      { id: "equipment", name: "Оборудование", icon: "⚙️", hasBrands: false },
    ],
  },

  free: {
    name: "Отдам даром", icon: "🎁", desc: "Бесплатные вещи", count: "3K+", subcats: null,
  },
};
