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
          { id: "toyota", name: "Toyota", models: ["Corolla", "Camry", "RAV4", "Land Cruiser", "Voxy", "Prius", "Highlander", "Avensis"] },
          { id: "hyundai", name: "Hyundai", models: ["Elantra", "Tucson", "Sonata", "Santa Fe", "Accent", "Solaris"] },
          { id: "kia", name: "Kia", models: ["K5", "Sportage", "Rio", "Sorento", "Cerato", "Sephia"] },
          { id: "bmw", name: "BMW", models: ["3 Series", "5 Series", "X5", "X3", "7 Series"] },
          { id: "mercedes", name: "Mercedes-Benz", models: ["C-Class", "E-Class", "GLE", "GLC", "S-Class"] },
          { id: "vw", name: "Volkswagen", models: ["Tiguan", "Passat", "Golf", "Polo", "Jetta"] },
          { id: "chevrolet", name: "Chevrolet", models: ["Cobalt", "Spark", "Nexia", "Malibu", "Lacetti"] },
          { id: "lexus", name: "Lexus", models: ["RX", "ES", "LX", "NX"] },
        ],
      },
      {
        id: "truck", name: "Грузовики", icon: "🚚", hasBrands: true,
        brands: [
          { id: "kamaz", name: "КамАЗ", models: ["5320", "65115", "43118"] },
          { id: "isuzu", name: "Isuzu", models: ["NPR", "Elf", "Forward"] },
          { id: "hyundai_t", name: "Hyundai", models: ["HD78", "HD120", "Mighty"] },
          { id: "man", name: "MAN", models: ["TGS", "TGX"] },
        ],
      },
      {
        id: "moto", name: "Мотоциклы", icon: "🏍️", hasBrands: true,
        brands: [
          { id: "honda", name: "Honda", models: ["CB400", "CBR600", "Africa Twin"] },
          { id: "yamaha", name: "Yamaha", models: ["MT-07", "R1", "YBR125"] },
          { id: "racer", name: "Racer", models: ["Magnum", "Panther"] },
        ],
      },
      { id: "parts", name: "Запчасти", icon: "🔧", hasBrands: false },
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
          { id: "apple", name: "Apple", models: ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 15 Pro Max", "iPhone 16", "iPhone 16 Pro Max"] },
          { id: "samsung", name: "Samsung", models: ["Galaxy S21", "Galaxy S22", "Galaxy S23", "Galaxy S24", "Galaxy S25", "Galaxy S26 Ultra"] },
          { id: "xiaomi", name: "Xiaomi", models: ["Redmi Note 12", "Redmi Note 13", "Mi 13", "Poco X6"] },
          { id: "vivo", name: "Vivo", models: ["V27", "V29", "Y36", "X100"] },
          { id: "oppo", name: "Oppo", models: ["Reno 10", "A98", "Find X6"] },
          { id: "honor", name: "Honor", models: ["X9", "Magic 6", "90"] },
        ],
      },
      {
        id: "laptops", name: "Ноутбуки", icon: "💻", hasBrands: true,
        brands: [
          { id: "apple_mb", name: "Apple MacBook", models: ["Air M2", "Air M3", "Pro 14 M3", "Pro 16 M3"] },
          { id: "lenovo", name: "Lenovo", models: ["IdeaPad 5", "ThinkPad X1", "Legion 5"] },
          { id: "hp", name: "HP", models: ["Pavilion", "EliteBook", "Omen"] },
          { id: "asus", name: "Asus", models: ["VivoBook", "ZenBook", "ROG Strix"] },
          { id: "dell", name: "Dell", models: ["XPS 13", "Inspiron", "Latitude"] },
        ],
      },
      {
        id: "tablets", name: "Планшеты", icon: "📲", hasBrands: true,
        brands: [
          { id: "apple_ip", name: "Apple iPad", models: ["iPad 10", "iPad Air", "iPad Pro 11", "iPad Pro 12.9"] },
          { id: "samsung_t", name: "Samsung", models: ["Tab S9", "Tab A9", "Tab S9 Ultra"] },
        ],
      },
      { id: "accessories", name: "Аксессуары", icon: "🎧", hasBrands: false },
    ],
  },

  realestate: { name: "Недвижимость", icon: "🏠", desc: "Квартиры, дома и земельные участки", count: "65K+", subcats: null },
  jobs:       { name: "Работа",       icon: "💼", desc: "Вакансии и резюме",                    count: "42K+", subcats: null },
  home_goods: { name: "Для дома",     icon: "🛋️", desc: "Мебель, техника, интерьер",            count: "19K+", subcats: null },
  clothes:    { name: "Одежда",       icon: "👗", desc: "Одежда и обувь",                        count: "15K+", subcats: null },
  kids:       { name: "Детский мир",  icon: "🧸", desc: "Товары для детей",                      count: "12K+", subcats: null },
  services:   { name: "Услуги",       icon: "🔧", desc: "Все виды услуг",                        count: "31K+", subcats: null },
  hobby:      { name: "Хобби",        icon: "⚽", desc: "Спорт и хобби",                         count: "8K+",  subcats: null },
  animals:    { name: "Животные",     icon: "🐾", desc: "Питомцы и товары для животных",         count: "5K+",  subcats: null },
  business:   { name: "Бизнес",       icon: "📊", desc: "Готовый бизнес и оборудование",         count: "7K+",  subcats: null },
  free:       { name: "Отдам даром",  icon: "🎁", desc: "Бесплатные вещи",                       count: "3K+",  subcats: null },
};
