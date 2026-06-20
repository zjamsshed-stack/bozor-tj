import { useState, useEffect } from "react";

const CITIES = [
  "Все города","Душанбе","Бохтар","Бустон","Вахдат","Гиссар","Гулистон",
  "Истаравшан","Истиклол","Исфара","Канибадам","Куляб","Левакант",
  "Нурек","Пенджикент","Рогун","Турсунзаде","Хорог","Худжанд",
];

const CATEGORIES = [
  { id: "all", label: "Все", icon: "🔍" },
  { id: "transport", label: "Транспорт", icon: "🚗" },
  { id: "nedvizhimost", label: "Недвижимость", icon: "🏠" },
  { id: "elektronika", label: "Электроника", icon: "📱" },
  { id: "rabota", label: "Работа", icon: "💼" },
  { id: "dom", label: "Для дома", icon: "🛋️" },
  { id: "odezhda", label: "Одежда", icon: "👗" },
];

// ── FILTER CONFIGS PER CATEGORY ──────────────────────────────────────────────

const FILTERS = {
  transport: {
    label: "Транспорт",
    fields: [
      { key: "price", type: "range", label: "💰 Цена (сомони)", presets: [["до 50К","","50000"],["50–150К","50000","150000"],["150К+","150000",""]] },
      { key: "year", type: "yearRange", label: "📅 Год выпуска" },
      { key: "mileage", type: "maxInput", label: "🛣️ Пробег (км)", presets: [["до 50K","50000"],["до 100K","100000"],["до 150K","150000"]] },
      { key: "condition", type: "check", label: "🏁 Состояние", options: ["Новый","Б/У"] },
      { key: "customs", type: "check", label: "🛃 Растаможка", options: ["Растаможен","Не растаможен"] },
      { key: "drive", type: "check", label: "⚙️ Привод", options: ["Передний","Задний","Полный"] },
      { key: "transmission", type: "check", label: "🔄 Коробка", options: ["Автомат","Механика","Робот","Вариатор"] },
      { key: "color", type: "color", label: "🎨 Цвет" },
      { key: "bodyType", type: "check", label: "🚘 Тип кузова", options: ["Седан","Внедорожник","Хэтчбек","Минивэн","Купе","Пикап"] },
    ]
  },
  nedvizhimost: {
    label: "Недвижимость",
    fields: [
      { key: "price", type: "range", label: "💰 Цена (сомони)", presets: [["до 50К","","50000"],["50–200К","50000","200000"],["200К+","200000",""]] },
      { key: "dealType", type: "check", label: "📋 Тип сделки", options: ["Продажа","Аренда посуточно","Аренда долгосрочно"] },
      { key: "roomType", type: "check", label: "🛏️ Комнаты", options: ["1 комната","2 комнаты","3 комнаты","4 комнаты","5+ комнат","Студия"] },
      { key: "propertyType", type: "check", label: "🏠 Тип жилья", options: ["Квартира","Дом","Дача","Офис","Земля","Гараж","Склад"] },
      { key: "area", type: "range", label: "📐 Площадь (м²)", presets: [["до 40м²","","40"],["40–80м²","40","80"],["80м²+","80",""]] },
      { key: "floor", type: "check", label: "🏢 Этаж", options: ["1 этаж","2–5 этаж","6–10 этаж","11+ этаж","Последний"] },
      { key: "repair", type: "check", label: "🔨 Ремонт", options: ["Евроремонт","Косметический","Без ремонта","Новостройка"] },
      { key: "furniture", type: "check", label: "🛋️ Мебель", options: ["С мебелью","Без мебели","Частично"] },
    ]
  },
  elektronika: {
    label: "Электроника",
    fields: [
      { key: "price", type: "range", label: "💰 Цена (сомони)", presets: [["до 1К","","1000"],["1–5К","1000","5000"],["5К+","5000",""]] },
      { key: "deviceType", type: "check", label: "📱 Тип устройства", options: ["Смартфон","Планшет","Ноутбук","Компьютер","ТВ","Наушники","Фотоаппарат","Игровая консоль"] },
      { key: "brand", type: "check", label: "🏷️ Производитель", options: ["Apple","Samsung","Xiaomi","Huawei","Oppo","Realme","OnePlus","Sony","LG","Lenovo","HP","Dell","Asus"] },
      { key: "condition", type: "check", label: "🏁 Состояние", options: ["Новый","Б/У отличное","Б/У хорошее","Требует ремонта"] },
      { key: "memory", type: "check", label: "💾 Память", options: ["64 ГБ","128 ГБ","256 ГБ","512 ГБ","1 ТБ"] },
      { key: "withBox", type: "check", label: "📦 Комплект", options: ["С коробкой","Без коробки"] },
    ]
  },
  rabota: {
    label: "Работа",
    fields: [
      { key: "price", type: "range", label: "💵 Зарплата (сомони)", presets: [["до 1К","","1000"],["1–3К","1000","3000"],["3К+","3000",""]] },
      { key: "jobType", type: "check", label: "💼 Тип", options: ["Вакансия","Резюме"] },
      { key: "schedule", type: "check", label: "🕐 График", options: ["Полный день","Частичная занятость","Удалённо","Сменный","Вахта"] },
      { key: "experience", type: "check", label: "📋 Опыт", options: ["Без опыта","1–3 года","3–5 лет","5+ лет"] },
      { key: "sphere", type: "check", label: "🏭 Сфера", options: ["IT / Технологии","Торговля","Строительство","Медицина","Образование","Транспорт","Финансы","Общепит","Охрана"] },
    ]
  },
  dom: {
    label: "Для дома",
    fields: [
      { key: "price", type: "range", label: "💰 Цена (сомони)", presets: [["до 500","","500"],["500–2К","500","2000"],["2К+","2000",""]] },
      { key: "itemType", type: "check", label: "🛋️ Тип товара", options: ["Мебель","Бытовая техника","Сантехника","Освещение","Декор","Посуда","Инструменты"] },
      { key: "condition", type: "check", label: "🏁 Состояние", options: ["Новый","Б/У отличное","Б/У хорошее"] },
    ]
  },
  odezhda: {
    label: "Одежда",
    fields: [
      { key: "price", type: "range", label: "💰 Цена (сомони)", presets: [["до 100","","100"],["100–500","100","500"],["500+","500",""]] },
      { key: "gender", type: "check", label: "👤 Для кого", options: ["Мужская","Женская","Детская","Унисекс"] },
      { key: "clothType", type: "check", label: "👕 Тип", options: ["Верхняя одежда","Платья","Рубашки","Джинсы","Спортивная","Обувь","Аксессуары","Нижнее бельё"] },
      { key: "size", type: "check", label: "📏 Размер", options: ["XS","S","M","L","XL","XXL","XXXL"] },
      { key: "condition", type: "check", label: "🏁 Состояние", options: ["Новый с биркой","Новый без бирки","Б/У"] },
      { key: "brand", type: "check", label: "🏷️ Бренд", options: ["Zara","H&M","Adidas","Nike","Gucci","Reebok","Lacoste","Без бренда"] },
    ]
  },
};

const COLORS_LIST = ["Белый","Чёрный","Серый","Серебристый","Синий","Красный","Зелёный","Жёлтый","Коричневый","Оранжевый"];
const COLOR_MAP = {
  "Белый":"#F5F5F5","Чёрный":"#222","Серый":"#9E9E9E","Серебристый":"#C0C0C0",
  "Синий":"#2196F3","Красный":"#F44336","Зелёный":"#4CAF50","Жёлтый":"#FFEB3B",
  "Коричневый":"#795548","Оранжевый":"#FF9800",
};

const MOCK_ADS = [
  { id:1, category:"transport", title:"Toyota Camry 2022, белая", price:185000, city:"Душанбе", emoji:"🚗", year:2022, mileage:25000, color:"Белый", drive:"Передний", transmission:"Автомат", condition:"Б/У", customs:"Растаможен", bodyType:"Седан", views:312 },
  { id:2, category:"transport", title:"BMW X5 2021, чёрный", price:310000, city:"Душанбе", emoji:"🚗", year:2021, mileage:38000, color:"Чёрный", drive:"Полный", transmission:"Автомат", condition:"Б/У", customs:"Растаможен", bodyType:"Внедорожник", views:534 },
  { id:3, category:"transport", title:"Chevrolet Nexia 2019", price:52000, city:"Куляб", emoji:"🚗", year:2019, mileage:95000, color:"Синий", drive:"Передний", transmission:"Механика", condition:"Б/У", customs:"Растаможен", bodyType:"Седан", views:87 },
  { id:4, category:"transport", title:"Kia K5 2024, новая", price:195000, city:"Душанбе", emoji:"🚗", year:2024, mileage:0, color:"Белый", drive:"Передний", transmission:"Автомат", condition:"Новый", customs:"Не растаможен", bodyType:"Седан", views:421 },
  { id:5, category:"nedvizhimost", title:"2-комн. квартира, 65 м², Сино", price:95000, city:"Душанбе", emoji:"🏠", roomType:"2 комнаты", dealType:"Продажа", propertyType:"Квартира", area:65, floor:"6–10 этаж", repair:"Евроремонт", furniture:"С мебелью", views:198 },
  { id:6, category:"nedvizhimost", title:"1-комн. квартира в аренду", price:800, city:"Худжанд", emoji:"🏢", roomType:"1 комната", dealType:"Аренда долгосрочно", propertyType:"Квартира", area:38, floor:"2–5 этаж", repair:"Косметический", furniture:"С мебелью", views:145 },
  { id:7, category:"nedvizhimost", title:"3-комн. квартира, центр", price:145000, city:"Душанбе", emoji:"🏠", roomType:"3 комнаты", dealType:"Продажа", propertyType:"Квартира", area:90, floor:"6–10 этаж", repair:"Евроремонт", furniture:"Без мебели", views:267 },
  { id:8, category:"elektronika", title:"iPhone 15 Pro Max 256GB", price:8500, city:"Душанбе", emoji:"📱", deviceType:"Смартфон", brand:"Apple", condition:"Новый", memory:"256 ГБ", withBox:"С коробкой", views:312 },
  { id:9, category:"elektronika", title:"Samsung Galaxy S24 Ultra", price:7800, city:"Душанбе", emoji:"📱", deviceType:"Смартфон", brand:"Samsung", condition:"Новый", memory:"256 ГБ", withBox:"С коробкой", views:245 },
  { id:10, category:"elektronika", title:"MacBook Pro M3, 512GB", price:14200, city:"Худжанд", emoji:"💻", deviceType:"Ноутбук", brand:"Apple", condition:"Новый", memory:"512 ГБ", withBox:"С коробкой", views:187 },
  { id:11, category:"elektronika", title:"Xiaomi Redmi Note 13, б/у", price:1800, city:"Куляб", emoji:"📱", deviceType:"Смартфон", brand:"Xiaomi", condition:"Б/У хорошее", memory:"128 ГБ", withBox:"Без коробки", views:94 },
  { id:12, category:"rabota", title:"Требуется React разработчик", price:3500, city:"Душанбе", emoji:"💻", jobType:"Вакансия", schedule:"Удалённо", experience:"1–3 года", sphere:"IT / Технологии", views:312 },
  { id:13, category:"rabota", title:"Ищу работу — бухгалтер", price:2000, city:"Душанбе", emoji:"💼", jobType:"Резюме", schedule:"Полный день", experience:"3–5 лет", sphere:"Финансы", views:87 },
  { id:14, category:"dom", title:"Диван угловой, серый", price:3200, city:"Душанбе", emoji:"🛋️", itemType:"Мебель", condition:"Б/У отличное", views:134 },
  { id:15, category:"dom", title:"Холодильник Samsung, новый", price:2800, city:"Худжанд", emoji:"🔌", itemType:"Бытовая техника", condition:"Новый", views:76 },
  { id:16, category:"odezhda", title:"Зимняя куртка мужская", price:350, city:"Душанбе", emoji:"🧥", gender:"Мужская", clothType:"Верхняя одежда", size:"L", condition:"Новый с биркой", brand:"Без бренда", views:54 },
  { id:17, category:"odezhda", title:"Кроссовки Nike Air Max", price:680, city:"Душанбе", emoji:"👟", gender:"Мужская", clothType:"Обувь", size:"42", condition:"Новый с биркой", brand:"Nike", views:211 },
];

const SORTS = [
  { val:"new", label:"Сначала новые" },
  { val:"cheap", label:"Сначала дешевле" },
  { val:"expensive", label:"Сначала дороже" },
  { val:"popular", label:"По популярности" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --gold:#FFD166;--red:#FF4D6D;--text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;position:sticky;top:0;z-index:100;}
.header-inner{max-width:1280px;margin:0 auto;height:62px;display:flex;align-items:center;gap:14px;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);cursor:pointer;flex-shrink:0;}
.logo span{color:var(--text);}
.search-bar{flex:1;display:flex;background:var(--card);border:1.5px solid var(--border);border-radius:11px;overflow:hidden;transition:border-color 0.2s;}
.search-bar:focus-within{border-color:var(--emerald);}
.search-bar input{flex:1;padding:10px 14px;background:none;border:none;outline:none;color:var(--text);font-size:14px;font-family:'Golos Text',sans-serif;}
.search-bar input::placeholder{color:var(--muted);}
.search-btn{background:var(--emerald);border:none;padding:0 18px;color:#0F1923;font-weight:700;cursor:pointer;font-size:15px;}
.search-btn:hover{background:var(--emerald2);}
.btn{padding:8px 16px;border-radius:9px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:5px;}
.btn-primary{background:var(--emerald);color:#0F1923;}
.btn-primary:hover{background:var(--emerald2);}
.btn-ghost{background:transparent;color:var(--text);border:1.5px solid var(--border);}
.btn-ghost:hover{border-color:var(--emerald);color:var(--emerald);}

/* CAT TABS */
.cat-tabs{background:var(--card);border-bottom:1px solid var(--border);padding:0 20px;overflow-x:auto;white-space:nowrap;}
.cat-tabs-inner{max-width:1280px;margin:0 auto;display:flex;gap:2px;}
.cat-tab{padding:13px 16px;border:none;background:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:all 0.18s;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;}
.cat-tab:hover{color:var(--text);}
.cat-tab.active{color:var(--emerald);border-bottom-color:var(--emerald);}

.page{max-width:1280px;margin:0 auto;padding:20px;}
.layout{display:grid;grid-template-columns:268px 1fr;gap:18px;align-items:start;}

/* FILTER SIDEBAR */
.sidebar{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;position:sticky;top:82px;max-height:calc(100vh - 100px);overflow-y:auto;}
.sidebar-head{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--card);z-index:2;}
.sidebar-title{font-family:'Unbounded',sans-serif;font-size:13px;font-weight:700;}
.reset-btn{font-size:12px;color:var(--emerald);font-weight:600;background:none;border:none;cursor:pointer;}

.fsec{padding:14px 18px;border-bottom:1px solid var(--border);}
.fsec:last-child{border-bottom:none;}
.flabel{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none;}
.farrow{font-size:9px;transition:transform 0.2s;}
.farrow.open{transform:rotate(180deg);}

.range-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:8px;}
.f-input{width:100%;padding:8px 11px;background:var(--card2);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;outline:none;font-family:'Golos Text',sans-serif;}
.f-input:focus{border-color:var(--emerald);}
.f-input::placeholder{color:var(--muted);}
.f-select{width:100%;padding:8px 11px;background:var(--card2);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;outline:none;cursor:pointer;font-family:'Golos Text',sans-serif;}
.f-select:focus{border-color:var(--emerald);}
.f-select option{background:var(--card);}
.presets{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px;}
.preset-btn{padding:4px 10px;border-radius:7px;border:1px solid var(--border);background:var(--card2);color:var(--muted);font-size:11px;cursor:pointer;transition:all 0.15s;font-family:'Golos Text',sans-serif;}
.preset-btn:hover{border-color:var(--emerald);color:var(--emerald);}

.check-list{display:flex;flex-direction:column;gap:7px;}
.check-item{display:flex;align-items:center;gap:8px;cursor:pointer;padding:2px 0;}
.check-box{width:17px;height:17px;border-radius:5px;border:1.5px solid var(--border);background:var(--card2);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.15s;}
.check-box.on{background:var(--emerald);border-color:var(--emerald);}
.check-tick{font-size:10px;color:#0F1923;font-weight:800;}
.check-text{font-size:13px;}

.color-wrap{display:flex;flex-wrap:wrap;gap:7px;}
.cswatch{width:26px;height:26px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all 0.15s;position:relative;}
.cswatch:hover{transform:scale(1.15);}
.cswatch.on{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--emerald);}
.cswatch-inner{width:100%;height:100%;border-radius:50%;border:1px solid rgba(255,255,255,0.15);}
.color-chosen{font-size:11px;color:var(--emerald);margin-top:7px;}

.year-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;}

/* RESULTS */
.results-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px;}
.res-count{font-size:13px;color:var(--muted);}
.res-count strong{color:var(--text);font-family:'Unbounded',sans-serif;font-size:15px;}
.res-right{display:flex;align-items:center;gap:8px;}
.sort-sel{padding:8px 12px;background:var(--card);border:1.5px solid var(--border);border-radius:9px;color:var(--text);font-size:13px;font-weight:600;outline:none;cursor:pointer;font-family:'Golos Text',sans-serif;}
.sort-sel option{background:var(--card);}
.view-toggle{display:flex;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:3px;}
.vbtn{padding:5px 9px;border-radius:5px;border:none;background:none;cursor:pointer;font-size:15px;color:var(--muted);transition:all 0.15s;}
.vbtn.on{background:var(--ebg);color:var(--emerald);}

.active-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;}
.atag{display:flex;align-items:center;gap:5px;padding:4px 10px;background:var(--ebg);border:1px solid rgba(0,200,150,0.25);border-radius:16px;font-size:11px;font-weight:600;color:var(--emerald);}
.atag-x{background:none;border:none;cursor:pointer;color:var(--emerald);font-size:13px;padding:0;opacity:0.7;line-height:1;}
.atag-x:hover{opacity:1;}

/* AD CARDS GRID */
.ads-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:13px;}
.ac{background:var(--card);border:1.5px solid var(--border);border-radius:13px;overflow:hidden;cursor:pointer;transition:all 0.2s;}
.ac:hover{border-color:var(--emerald);transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,0.3);}
.ac-img{height:150px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;}
.ac-body{padding:12px;}
.ac-price{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;color:var(--emerald);}
.ac-title{font-size:13px;font-weight:600;margin-top:4px;line-height:1.4;}
.ac-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:7px;}
.ac-tag{font-size:10px;padding:2px 7px;border-radius:8px;background:var(--card2);color:var(--muted);border:1px solid var(--border);}
.ac-foot{display:flex;justify-content:space-between;margin-top:8px;}
.ac-city{font-size:11px;color:var(--muted);}
.ac-views{font-size:11px;color:var(--muted);}

/* AD LIST */
.ads-list{display:flex;flex-direction:column;gap:10px;}
.al{background:var(--card);border:1.5px solid var(--border);border-radius:13px;overflow:hidden;cursor:pointer;transition:all 0.2s;display:flex;}
.al:hover{border-color:var(--emerald);box-shadow:0 6px 20px rgba(0,0,0,0.3);}
.al-img{width:160px;flex-shrink:0;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:56px;}
.al-body{padding:14px;flex:1;}
.al-price{font-family:'Unbounded',sans-serif;font-size:17px;font-weight:700;color:var(--emerald);}
.al-title{font-size:14px;font-weight:700;margin-top:5px;}
.al-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:9px;}
.al-tag{font-size:11px;padding:3px 9px;border-radius:8px;background:var(--card2);color:var(--muted);border:1px solid var(--border);}
.al-meta{display:flex;gap:12px;margin-top:9px;font-size:11px;color:var(--muted);}

.bp-new{position:absolute;top:8px;left:8px;background:var(--emerald);color:#0F1923;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;}
.bp-top{position:absolute;top:8px;right:8px;background:var(--gold);color:#000;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;}

.no-res{text-align:center;padding:60px 20px;color:var(--muted);}
.no-res-icon{font-size:52px;margin-bottom:12px;}
.no-res-title{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px;}
.load-more{width:100%;padding:13px;background:var(--card);border:1.5px solid var(--border);border-radius:11px;color:var(--text);font-family:'Golos Text',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;margin-top:14px;}
.load-more:hover{border-color:var(--emerald);color:var(--emerald);}

.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:11px 22px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);animation:tin 0.3s ease;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

@media(max-width:860px){
  .layout{grid-template-columns:1fr;}
  .sidebar{position:static;max-height:none;}
  .al-img{width:110px;font-size:40px;}
}
`;

// ── helpers ──────────────────────────────────────────────────────────────────
function Sec({ title, children, open: initOpen = true }) {
  const [open, setOpen] = useState(initOpen);
  return (
    <div className="fsec">
      <div className="flabel" onClick={() => setOpen(!open)}>
        {title} <span className={`farrow ${open ? "open" : ""}`}>▼</span>
      </div>
      {open && children}
    </div>
  );
}

function Checks({ options, selected, toggle }) {
  return (
    <div className="check-list">
      {options.map(o => (
        <label key={o} className="check-item" onClick={() => toggle(o)}>
          <div className={`check-box ${selected.includes(o) ? "on" : ""}`}>
            {selected.includes(o) && <span className="check-tick">✓</span>}
          </div>
          <span className="check-text">{o}</span>
        </label>
      ))}
    </div>
  );
}

function RangeField({ label, from, setFrom, to, setTo, presets }) {
  return (
    <Sec title={label}>
      <div className="range-row">
        <input className="f-input" type="number" placeholder="От" value={from} onChange={e => setFrom(e.target.value)} />
        <input className="f-input" type="number" placeholder="До" value={to} onChange={e => setTo(e.target.value)} />
      </div>
      {presets && (
        <div className="presets">
          {presets.map(([l, f, t]) => (
            <button key={l} className="preset-btn" onClick={() => { setFrom(f); setTo(t); }}>{l}</button>
          ))}
        </div>
      )}
    </Sec>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("new");
  const [visible, setVisible] = useState(12);
  const [toast, setToast] = useState(null);

  // Common
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [city, setCity] = useState("Все города");

  // Transport
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [mileageMax, setMileageMax] = useState("");
  const [drives, setDrives] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [colors, setColors] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [carCondition, setCarCondition] = useState([]);
  const [customs, setCustoms] = useState([]);

  // Nedvizhimost
  const [roomTypes, setRoomTypes] = useState([]);
  const [dealTypes, setDealTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [floors, setFloors] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");

  // Elektronika
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [elCondition, setElCondition] = useState([]);
  const [memories, setMemories] = useState([]);
  const [withBox, setWithBox] = useState([]);

  // Rabota
  const [jobTypes, setJobTypes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [spheres, setSpheres] = useState([]);

  // Dom
  const [itemTypes, setItemTypes] = useState([]);
  const [domCondition, setDomCondition] = useState([]);

  // Odezhda
  const [genders, setGenders] = useState([]);
  const [clothTypes, setClothTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [clothCondition, setClothCondition] = useState([]);
  const [clothBrands, setClothBrands] = useState([]);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const tog = (arr, set, v) => set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const resetAll = () => {
    setPriceFrom(""); setPriceTo(""); setCity("Все города");
    setYearFrom(""); setYearTo(""); setMileageMax("");
    setDrives([]); setTransmissions([]); setColors([]); setBodyTypes([]); setCarCondition([]); setCustoms([]);
    setRoomTypes([]); setDealTypes([]); setPropertyTypes([]); setFloors([]); setRepairs([]); setFurnitures([]);
    setAreaFrom(""); setAreaTo("");
    setDeviceTypes([]); setBrands([]); setElCondition([]); setMemories([]); setWithBox([]);
    setJobTypes([]); setSchedules([]); setExperiences([]); setSpheres([]);
    setItemTypes([]); setDomCondition([]);
    setGenders([]); setClothTypes([]); setSizes([]); setClothCondition([]); setClothBrands([]);
    showToast("Фильтры сброшены");
  };

  const years = Array.from({ length: 26 }, (_, i) => 2025 - i);

  // Active tags
  const tags = [
    ...(priceFrom ? [`от ${Number(priceFrom).toLocaleString()} с.`] : []),
    ...(priceTo ? [`до ${Number(priceTo).toLocaleString()} с.`] : []),
    ...(city !== "Все города" ? [city] : []),
    ...carCondition, ...customs, ...drives, ...transmissions, ...colors, ...bodyTypes,
    ...(yearFrom ? [`с ${yearFrom} г.`] : []),
    ...(yearTo ? [`по ${yearTo} г.`] : []),
    ...(mileageMax ? [`до ${Number(mileageMax).toLocaleString()} км`] : []),
    ...roomTypes, ...dealTypes, ...propertyTypes, ...floors, ...repairs, ...furnitures,
    ...(areaFrom ? [`от ${areaFrom} м²`] : []),
    ...(areaTo ? [`до ${areaTo} м²`] : []),
    ...deviceTypes, ...brands, ...elCondition, ...memories, ...withBox,
    ...jobTypes, ...schedules, ...experiences, ...spheres,
    ...itemTypes, ...domCondition,
    ...genders, ...clothTypes, ...sizes, ...clothCondition, ...clothBrands,
  ];

  // Filter ads
  let result = MOCK_ADS.filter(ad => {
    if (cat !== "all" && ad.category !== cat) return false;
    if (search && !ad.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (priceFrom && ad.price < Number(priceFrom)) return false;
    if (priceTo && ad.price > Number(priceTo)) return false;
    if (city !== "Все города" && ad.city !== city) return false;
    // transport
    if (carCondition.length && !carCondition.includes(ad.condition)) return false;
    if (customs.length && !customs.includes(ad.customs)) return false;
    if (drives.length && !drives.includes(ad.drive)) return false;
    if (transmissions.length && !transmissions.includes(ad.transmission)) return false;
    if (colors.length && !colors.includes(ad.color)) return false;
    if (bodyTypes.length && !bodyTypes.includes(ad.bodyType)) return false;
    if (yearFrom && ad.year && ad.year < Number(yearFrom)) return false;
    if (yearTo && ad.year && ad.year > Number(yearTo)) return false;
    if (mileageMax && ad.mileage !== undefined && ad.mileage > Number(mileageMax)) return false;
    // nedvizhimost
    if (roomTypes.length && !roomTypes.includes(ad.roomType)) return false;
    if (dealTypes.length && !dealTypes.includes(ad.dealType)) return false;
    if (propertyTypes.length && !propertyTypes.includes(ad.propertyType)) return false;
    if (floors.length && !floors.includes(ad.floor)) return false;
    if (repairs.length && !repairs.includes(ad.repair)) return false;
    if (furnitures.length && !furnitures.includes(ad.furniture)) return false;
    if (areaFrom && ad.area && ad.area < Number(areaFrom)) return false;
    if (areaTo && ad.area && ad.area > Number(areaTo)) return false;
    // elektronika
    if (deviceTypes.length && !deviceTypes.includes(ad.deviceType)) return false;
    if (brands.length && !brands.includes(ad.brand)) return false;
    if (elCondition.length && !elCondition.includes(ad.condition)) return false;
    if (memories.length && !memories.includes(ad.memory)) return false;
    if (withBox.length && !withBox.includes(ad.withBox)) return false;
    // rabota
    if (jobTypes.length && !jobTypes.includes(ad.jobType)) return false;
    if (schedules.length && !schedules.includes(ad.schedule)) return false;
    if (experiences.length && !experiences.includes(ad.experience)) return false;
    if (spheres.length && !spheres.includes(ad.sphere)) return false;
    // dom
    if (itemTypes.length && !itemTypes.includes(ad.itemType)) return false;
    if (domCondition.length && !domCondition.includes(ad.condition)) return false;
    // odezhda
    if (genders.length && !genders.includes(ad.gender)) return false;
    if (clothTypes.length && !clothTypes.includes(ad.clothType)) return false;
    if (sizes.length && !sizes.includes(ad.size)) return false;
    if (clothCondition.length && !clothCondition.includes(ad.condition)) return false;
    if (clothBrands.length && !clothBrands.includes(ad.brand)) return false;
    return true;
  });

  if (sort === "cheap") result.sort((a, b) => a.price - b.price);
  else if (sort === "expensive") result.sort((a, b) => b.price - a.price);
  else if (sort === "popular") result.sort((a, b) => b.views - a.views);

  const shown = result.slice(0, visible);

  // Ad tags display
  const adTags = ad => {
    if (ad.category === "transport") return [ad.year && `${ad.year} г.`, ad.mileage !== undefined && `${ad.mileage.toLocaleString()} км`, ad.transmission, ad.drive, ad.condition].filter(Boolean);
    if (ad.category === "nedvizhimost") return [ad.roomType, ad.dealType, ad.area && `${ad.area} м²`, ad.repair].filter(Boolean);
    if (ad.category === "elektronika") return [ad.brand, ad.memory, ad.condition, ad.withBox].filter(Boolean);
    if (ad.category === "rabota") return [ad.jobType, ad.schedule, ad.experience].filter(Boolean);
    if (ad.category === "dom") return [ad.itemType, ad.condition].filter(Boolean);
    if (ad.category === "odezhda") return [ad.gender, ad.size, ad.condition, ad.brand].filter(Boolean);
    return [];
  };

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">bozor<span>.tj</span></div>
          <div className="search-bar">
            <input placeholder="Поиск объявлений..." value={search} onChange={e => setSearch(e.target.value)} />
            <button className="search-btn">🔍</button>
          </div>
          <button className="btn btn-primary" style={{ flexShrink: 0 }}>+ Подать объявление</button>
        </div>
      </header>

      {/* CATEGORY TABS */}
      <div className="cat-tabs">
        <div className="cat-tabs-inner">
          {CATEGORIES.map(c => (
            <button key={c.id} className={`cat-tab ${cat === c.id ? "active" : ""}`} onClick={() => { setCat(c.id); setVisible(12); }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page">
        <div className="layout">

          {/* ── SIDEBAR FILTERS ── */}
          <aside className="sidebar">
            <div className="sidebar-head">
              <div className="sidebar-title">🎛️ Фильтры</div>
              {tags.length > 0 && <button className="reset-btn" onClick={resetAll}>Сбросить все</button>}
            </div>

            {/* CITY — always shown */}
            <Sec title="📍 Город">
              <select className="f-select" value={city} onChange={e => setCity(e.target.value)}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </Sec>

            {/* PRICE — always shown */}
            <RangeField label="💰 Цена (сомони)" from={priceFrom} setFrom={setPriceFrom} to={priceTo} setTo={setPriceTo}
              presets={[["до 50К","","50000"],["50–150К","50000","150000"],["150К+","150000",""]]} />

            {/* TRANSPORT */}
            {(cat === "all" || cat === "transport") && <>
              <Sec title="🏁 Состояние авто">
                <Checks options={["Новый","Б/У"]} selected={carCondition} toggle={v => tog(carCondition, setCarCondition, v)} />
              </Sec>
              <Sec title="🛃 Растаможка">
                <Checks options={["Растаможен","Не растаможен"]} selected={customs} toggle={v => tog(customs, setCustoms, v)} />
              </Sec>
              <Sec title="📅 Год выпуска">
                <div className="year-row">
                  <select className="f-select" value={yearFrom} onChange={e => setYearFrom(e.target.value)}>
                    <option value="">С года</option>{years.map(y => <option key={y}>{y}</option>)}
                  </select>
                  <select className="f-select" value={yearTo} onChange={e => setYearTo(e.target.value)}>
                    <option value="">По год</option>{years.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </Sec>
              <Sec title="🛣️ Пробег (км)">
                <input className="f-input" type="number" placeholder="Максимум" value={mileageMax} onChange={e => setMileageMax(e.target.value)} style={{width:"100%"}} />
                <div className="presets">
                  {[["до 50K","50000"],["до 100K","100000"],["до 150K","150000"]].map(([l,v]) => (
                    <button key={l} className="preset-btn" onClick={() => setMileageMax(v)}>{l}</button>
                  ))}
                </div>
              </Sec>
              <Sec title="⚙️ Привод">
                <Checks options={["Передний","Задний","Полный"]} selected={drives} toggle={v => tog(drives, setDrives, v)} />
              </Sec>
              <Sec title="🔄 Коробка передач">
                <Checks options={["Автомат","Механика","Робот","Вариатор"]} selected={transmissions} toggle={v => tog(transmissions, setTransmissions, v)} />
              </Sec>
              <Sec title="🚘 Тип кузова">
                <Checks options={["Седан","Внедорожник","Хэтчбек","Минивэн","Купе","Пикап"]} selected={bodyTypes} toggle={v => tog(bodyTypes, setBodyTypes, v)} />
              </Sec>
              <Sec title="🎨 Цвет" defaultOpen={false}>
                <div className="color-wrap">
                  {COLORS_LIST.map(c => (
                    <div key={c} className={`cswatch ${colors.includes(c) ? "on" : ""}`} title={c} onClick={() => tog(colors, setColors, c)}>
                      <div className="cswatch-inner" style={{ background: COLOR_MAP[c] }} />
                    </div>
                  ))}
                </div>
                {colors.length > 0 && <div className="color-chosen">{colors.join(", ")}</div>}
              </Sec>
            </>}

            {/* NEDVIZHIMOST */}
            {(cat === "all" || cat === "nedvizhimost") && <>
              <Sec title="📋 Тип сделки">
                <Checks options={["Продажа","Аренда посуточно","Аренда долгосрочно"]} selected={dealTypes} toggle={v => tog(dealTypes, setDealTypes, v)} />
              </Sec>
              <Sec title="🏠 Тип жилья">
                <Checks options={["Квартира","Дом","Дача","Офис","Земля","Гараж"]} selected={propertyTypes} toggle={v => tog(propertyTypes, setPropertyTypes, v)} />
              </Sec>
              <Sec title="🛏️ Количество комнат">
                <Checks options={["1 комната","2 комнаты","3 комнаты","4 комнаты","5+ комнат","Студия"]} selected={roomTypes} toggle={v => tog(roomTypes, setRoomTypes, v)} />
              </Sec>
              <RangeField label="📐 Площадь (м²)" from={areaFrom} setFrom={setAreaFrom} to={areaTo} setTo={setAreaTo}
                presets={[["до 40м²","","40"],["40–80м²","40","80"],["80м²+","80",""]]} />
              <Sec title="🏢 Этаж">
                <Checks options={["1 этаж","2–5 этаж","6–10 этаж","11+ этаж","Последний"]} selected={floors} toggle={v => tog(floors, setFloors, v)} />
              </Sec>
              <Sec title="🔨 Ремонт">
                <Checks options={["Евроремонт","Косметический","Без ремонта","Новостройка"]} selected={repairs} toggle={v => tog(repairs, setRepairs, v)} />
              </Sec>
              <Sec title="🛋️ Мебель">
                <Checks options={["С мебелью","Без мебели","Частично"]} selected={furnitures} toggle={v => tog(furnitures, setFurnitures, v)} />
              </Sec>
            </>}

            {/* ELEKTRONIKA */}
            {(cat === "all" || cat === "elektronika") && <>
              <Sec title="📱 Тип устройства">
                <Checks options={["Смартфон","Планшет","Ноутбук","Компьютер","ТВ","Наушники","Фотоаппарат"]} selected={deviceTypes} toggle={v => tog(deviceTypes, setDeviceTypes, v)} />
              </Sec>
              <Sec title="🏷️ Производитель">
                <Checks options={["Apple","Samsung","Xiaomi","Huawei","Oppo","Realme","Sony","LG","Lenovo","HP","Dell","Asus"]} selected={brands} toggle={v => tog(brands, setBrands, v)} />
              </Sec>
              <Sec title="🏁 Состояние">
                <Checks options={["Новый","Б/У отличное","Б/У хорошее","Требует ремонта"]} selected={elCondition} toggle={v => tog(elCondition, setElCondition, v)} />
              </Sec>
              <Sec title="💾 Память">
                <Checks options={["64 ГБ","128 ГБ","256 ГБ","512 ГБ","1 ТБ"]} selected={memories} toggle={v => tog(memories, setMemories, v)} />
              </Sec>
              <Sec title="📦 Комплект">
                <Checks options={["С коробкой","Без коробки"]} selected={withBox} toggle={v => tog(withBox, setWithBox, v)} />
              </Sec>
            </>}

            {/* RABOTA */}
            {(cat === "all" || cat === "rabota") && <>
              <Sec title="💼 Тип">
                <Checks options={["Вакансия","Резюме"]} selected={jobTypes} toggle={v => tog(jobTypes, setJobTypes, v)} />
              </Sec>
              <Sec title="🕐 График работы">
                <Checks options={["Полный день","Частичная занятость","Удалённо","Сменный","Вахта"]} selected={schedules} toggle={v => tog(schedules, setSchedules, v)} />
              </Sec>
              <Sec title="📋 Опыт работы">
                <Checks options={["Без опыта","1–3 года","3–5 лет","5+ лет"]} selected={experiences} toggle={v => tog(experiences, setExperiences, v)} />
              </Sec>
              <Sec title="🏭 Сфера">
                <Checks options={["IT / Технологии","Торговля","Строительство","Медицина","Образование","Транспорт","Финансы","Общепит","Охрана"]} selected={spheres} toggle={v => tog(spheres, setSpheres, v)} />
              </Sec>
            </>}

            {/* DOM */}
            {(cat === "all" || cat === "dom") && <>
              <Sec title="🛋️ Тип товара">
                <Checks options={["Мебель","Бытовая техника","Сантехника","Освещение","Декор","Посуда","Инструменты"]} selected={itemTypes} toggle={v => tog(itemTypes, setItemTypes, v)} />
              </Sec>
              <Sec title="🏁 Состояние">
                <Checks options={["Новый","Б/У отличное","Б/У хорошее"]} selected={domCondition} toggle={v => tog(domCondition, setDomCondition, v)} />
              </Sec>
            </>}

            {/* ODEZHDA */}
            {(cat === "all" || cat === "odezhda") && <>
              <Sec title="👤 Для кого">
                <Checks options={["Мужская","Женская","Детская","Унисекс"]} selected={genders} toggle={v => tog(genders, setGenders, v)} />
              </Sec>
              <Sec title="👕 Тип одежды">
                <Checks options={["Верхняя одежда","Платья","Рубашки","Джинсы","Спортивная","Обувь","Аксессуары"]} selected={clothTypes} toggle={v => tog(clothTypes, setClothTypes, v)} />
              </Sec>
              <Sec title="📏 Размер">
                <Checks options={["XS","S","M","L","XL","XXL","XXXL"]} selected={sizes} toggle={v => tog(sizes, setSizes, v)} />
              </Sec>
              <Sec title="🏁 Состояние">
                <Checks options={["Новый с биркой","Новый без бирки","Б/У"]} selected={clothCondition} toggle={v => tog(clothCondition, setClothCondition, v)} />
              </Sec>
              <Sec title="🏷️ Бренд">
                <Checks options={["Zara","H&M","Adidas","Nike","Gucci","Reebok","Lacoste","Без бренда"]} selected={clothBrands} toggle={v => tog(clothBrands, setClothBrands, v)} />
              </Sec>
            </>}

          </aside>

          {/* ── RESULTS ── */}
          <div>
            <div className="results-top">
              <div className="res-count">Найдено: <strong>{result.length}</strong> объявлений</div>
              <div className="res-right">
                <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value)}>
                  {SORTS.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
                </select>
                <div className="view-toggle">
                  <button className={`vbtn ${view === "grid" ? "on" : ""}`} onClick={() => setView("grid")}>⊞</button>
                  <button className={`vbtn ${view === "list" ? "on" : ""}`} onClick={() => setView("list")}>☰</button>
                </div>
              </div>
            </div>

            {tags.length > 0 && (
              <div className="active-tags">
                {tags.map((t, i) => (
                  <div key={i} className="atag">
                    {t} <button className="atag-x" onClick={resetAll}>×</button>
                  </div>
                ))}
              </div>
            )}

            {result.length === 0 ? (
              <div className="no-res">
                <div className="no-res-icon">🔍</div>
                <div className="no-res-title">Ничего не найдено</div>
                <div style={{ fontSize: 14, marginBottom: 18 }}>Попробуйте изменить параметры фильтров</div>
                <button className="btn btn-primary" onClick={resetAll}>Сбросить фильтры</button>
              </div>
            ) : view === "grid" ? (
              <div className="ads-grid">
                {shown.map(ad => (
                  <div key={ad.id} className="ac" onClick={() => showToast("Открываем объявление...")}>
                    <div className="ac-img">
                      {ad.id <= 2 && <span className="bp-top">⭐ Топ</span>}
                      {(ad.condition === "Новый" || ad.condition === "Новый с биркой") && <span className="bp-new">Новое</span>}
                      <span>{ad.emoji}</span>
                    </div>
                    <div className="ac-body">
                      <div className="ac-price">{ad.price.toLocaleString()} с.</div>
                      <div className="ac-title">{ad.title}</div>
                      <div className="ac-tags">
                        {adTags(ad).map(t => <span key={t} className="ac-tag">{t}</span>)}
                      </div>
                      <div className="ac-foot">
                        <span className="ac-city">📍 {ad.city}</span>
                        <span className="ac-views">👁 {ad.views}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ads-list">
                {shown.map(ad => (
                  <div key={ad.id} className="al" onClick={() => showToast("Открываем объявление...")}>
                    <div className="al-img">{ad.emoji}</div>
                    <div className="al-body">
                      <div className="al-price">{ad.price.toLocaleString()} с.</div>
                      <div className="al-title">{ad.title}</div>
                      <div className="al-tags">
                        {adTags(ad).map(t => <span key={t} className="al-tag">{t}</span>)}
                      </div>
                      <div className="al-meta">
                        <span>📍 {ad.city}</span>
                        <span>👁 {ad.views} просмотров</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {visible < result.length && (
              <button className="load-more" onClick={() => setVisible(v => v + 12)}>
                Показать ещё ({result.length - visible} осталось)
              </button>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
