import { useState, useEffect } from "react";
import { useLang } from "../context/LangContext";
import { CATEGORY_KEYS } from "../constants/categories";

const CITIES = ["Все города","Душанбе","Худжанд","Куляб","Бохтар","Хорог","Истаравшан","Турсунзаде","Нурек","Вахдат","Гиссар","Пенджикент","Канибадам","Исфара","Бустон","Гулистон","Истиклол","Левакант","Рогун"];

const T = {
  ru: {
    subtitle: "Купи и продай всё в Таджикистане",
    search: "Поиск товаров...",
    searchBtn: "Найти",
    cityLabel: "Город",
    stats: ["360K+\nОбъявлений","120K+\nПользователей","18\nГородов","24/7\nПоддержка"],
    cats: [
      {icon:"🚗",name:"Транспорт",count:"111K+"},
      {icon:"🏠",name:"Недвижимость",count:"65K+"},
      {icon:"📱",name:"Электроника",count:"28K+"},
      {icon:"💼",name:"Работа",count:"42K+"},
      {icon:"🛋️",name:"Для дома",count:"19K+"},
      {icon:"👗",name:"Одежда",count:"15K+"},
      {icon:"🧸",name:"Детский мир",count:"12K+"},
      {icon:"🔧",name:"Услуги",count:"31K+"},
      {icon:"⚽",name:"Хобби",count:"8K+"},
      {icon:"🐾",name:"Животные",count:"5K+"},
      {icon:"📊",name:"Бизнес",count:"7K+"},
      {icon:"🎁",name:"Отдам даром",count:"3K+"},
    ],
    newAds: "Свежие объявления",
    freeLabel: "Всё бесплатно!",
    freeDesc: "Подавай объявления без ограничений",
    addBtn: "Подать объявление",
    seeAll: "Смотреть все",
    new: "Новое",
    footer: "© 2026 Bozor.tj — Доска объявлений Таджикистана",
  },
  tj: {
    subtitle: "Тоҷикистонда ҳама чизро харед ва фурӯшед",
    search: "Ҷустуҷӯи мол...",
    searchBtn: "Ёфтан",
    cityLabel: "Шаҳр",
    stats: ["360K+\nЭълонҳо","120K+\nКорбарон","18\nШаҳрҳо","24/7\nДастгирӣ"],
    cats: [
      {icon:"🚗",name:"Нақлиёт",count:"111K+"},
      {icon:"🏠",name:"Амвол",count:"65K+"},
      {icon:"📱",name:"Электроника",count:"28K+"},
      {icon:"💼",name:"Кор",count:"42K+"},
      {icon:"🛋️",name:"Барои хона",count:"19K+"},
      {icon:"👗",name:"Либос",count:"15K+"},
      {icon:"🧸",name:"Олами кӯдак",count:"12K+"},
      {icon:"🔧",name:"Хидматҳо",count:"31K+"},
      {icon:"⚽",name:"Ҳаваскорӣ",count:"8K+"},
      {icon:"🐾",name:"Ҳайвонот",count:"5K+"},
      {icon:"📊",name:"Бизнес",count:"7K+"},
      {icon:"🎁",name:"Ройгон медиҳам",count:"3K+"},
    ],
    newAds: "Эълонҳои нав",
    freeLabel: "Ҳама чиз ройгон!",
    freeDesc: "Эълонҳоро бидуни маҳдудият гузоред",
    addBtn: "Эълон гузоштан",
    seeAll: "Ҳамаашро бин",
    new: "Нав",
    footer: "© 2026 Bozor.tj — Огоҳиномаи Тоҷикистон",
  },
};

const SAMPLE_ADS = [
  {id:1,emoji:"🚗",title:"Toyota Camry 2023",price:"185 000 с.",city:"Душанбе",time:"5 мин"},
  {id:2,emoji:"🏠",title:"2-комн. квартира, 65м²",price:"95 000 с.",city:"Худжанд",time:"12 мин"},
  {id:3,emoji:"📱",title:"iPhone 15 Pro Max",price:"8 500 с.",city:"Душанбе",time:"20 мин"},
  {id:4,emoji:"💻",title:"MacBook Pro M3",price:"14 200 с.",city:"Куляб",time:"1 час"},
  {id:5,emoji:"🛋️",title:"Диван угловой",price:"3 200 с.",city:"Бохтар",time:"2 часа"},
  {id:6,emoji:"👗",title:"Платье вечернее",price:"450 с.",city:"Душанбе",time:"3 часа"},
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
  --gold:#FFD166;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}

/* HERO */
.hero{
  background:linear-gradient(160deg,#0D2318 0%,#0F1923 60%,#162130 100%);
  padding:28px 16px 24px;
  position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;top:-40px;right:-40px;
  width:200px;height:200px;
  background:radial-gradient(circle,rgba(0,200,150,0.12),transparent 70%);
}
.hero-title{
  font-family:'Unbounded',sans-serif;
  font-size:clamp(22px,5vw,32px);
  font-weight:900;line-height:1.2;
  margin-bottom:8px;
}
.hero-title .accent{color:var(--emerald);}
.hero-sub{font-size:13px;color:var(--muted);margin-bottom:20px;line-height:1.5;}

/* SEARCH */
.search-wrap{display:flex;gap:8px;margin-bottom:16px;}
.search-input{
  flex:1;padding:13px 14px;
  background:rgba(255,255,255,0.06);
  border:1.5px solid var(--border);border-radius:12px;
  color:var(--text);font-size:14px;outline:none;
  font-family:'Golos Text',sans-serif;
  transition:border-color 0.2s;
}
.search-input:focus{border-color:var(--emerald);}
.search-input::placeholder{color:var(--muted);}
.search-btn{
  padding:13px 18px;background:var(--emerald);
  color:#0F1923;border:none;border-radius:12px;
  font-weight:700;font-size:13px;cursor:pointer;
  white-space:nowrap;transition:all 0.2s;
}
.search-btn:active{transform:scale(0.96);}

.city-select{
  width:100%;padding:11px 14px;
  background:rgba(255,255,255,0.04);
  border:1.5px solid var(--border);border-radius:12px;
  color:var(--text);font-size:13px;
  font-family:'Golos Text',sans-serif;cursor:pointer;
}

/* STATS */
.stats{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:8px;padding:16px;
}
.stat{
  background:var(--card);border:1px solid var(--border);
  border-radius:12px;padding:12px 8px;text-align:center;
  transition:transform 0.2s;
}
.stat:active{transform:scale(0.97);}
.stat-num{
  font-family:'Unbounded',sans-serif;
  font-size:15px;font-weight:700;color:var(--emerald);
  margin-bottom:3px;
}
.stat-label{font-size:9px;color:var(--muted);line-height:1.3;}

/* SECTIONS */
.section{padding:0 16px 24px;}
.section-header{
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:14px;
}
.section-title{
  font-family:'Unbounded',sans-serif;
  font-size:15px;font-weight:700;
}
.see-all{
  font-size:12px;color:var(--emerald);font-weight:600;
  background:none;border:none;cursor:pointer;
}

/* CATEGORIES */
.cats-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:8px;
}
.cat-item{
  background:var(--card);border:1px solid var(--border);
  border-radius:14px;padding:14px 10px;text-align:center;
  cursor:pointer;transition:all 0.2s;
}
.cat-item:active{transform:scale(0.95);border-color:var(--emerald);}
.cat-icon{font-size:26px;margin-bottom:6px;}
.cat-name{font-size:11px;font-weight:700;margin-bottom:2px;}
.cat-count{font-size:10px;color:var(--muted);}

/* ADS */
.ads-scroll{
  display:flex;gap:12px;
  overflow-x:auto;padding-bottom:8px;
  scrollbar-width:none;
}
.ads-scroll::-webkit-scrollbar{display:none;}
.ad-card{
  background:var(--card);border:1.5px solid var(--border);
  border-radius:14px;overflow:hidden;
  min-width:160px;cursor:pointer;transition:all 0.2s;flex-shrink:0;
}
.ad-card:active{transform:scale(0.97);border-color:var(--emerald);}
.ad-img{
  height:110px;background:var(--card2);
  display:flex;align-items:center;justify-content:center;
  font-size:40px;position:relative;
}
.badge-new{
  position:absolute;top:6px;right:6px;
  background:var(--emerald);color:#0F1923;
  font-size:9px;font-weight:700;
  padding:2px 7px;border-radius:5px;
}
.ad-body{padding:10px;}
.ad-price{
  font-family:'Unbounded',sans-serif;
  font-size:13px;font-weight:700;color:var(--emerald);
  margin-bottom:3px;
}
.ad-title{font-size:11px;font-weight:600;margin-bottom:4px;line-height:1.3;}
.ad-meta{display:flex;justify-content:space-between;}
.ad-city,.ad-time{font-size:10px;color:var(--muted);}

/* FREE BANNER */
.free-banner{
  margin:0 16px 24px;
  background:linear-gradient(135deg,#0D2318,#162130);
  border:1px solid rgba(0,200,150,0.3);
  border-radius:16px;padding:20px;
  display:flex;gap:14px;align-items:center;
}
.free-icon{font-size:36px;flex-shrink:0;}
.free-title{
  font-family:'Unbounded',sans-serif;
  font-size:14px;font-weight:700;
  color:var(--emerald);margin-bottom:4px;
}
.free-desc{font-size:12px;color:var(--muted);margin-bottom:10px;line-height:1.4;}
.free-btn{
  padding:10px 18px;background:var(--emerald);
  color:#0F1923;border:none;border-radius:9px;
  font-weight:700;font-size:12px;cursor:pointer;
  transition:all 0.2s;
}
.free-btn:active{transform:scale(0.97);}

/* FOOTER */
.footer{
  padding:20px 16px;border-top:1px solid var(--border);
  text-align:center;font-size:11px;color:var(--muted);
}

/* ANIMATIONS */
@keyframes fadeInUp{
  from{opacity:0;transform:translateY(16px);}
  to{opacity:1;transform:translateY(0);}
}
.anim{animation:fadeInUp 0.4s ease both;}
.anim-1{animation-delay:0.05s;}
.anim-2{animation-delay:0.1s;}
.anim-3{animation-delay:0.15s;}
.anim-4{animation-delay:0.2s;}
`;

export default function Home() {
  const { lang } = useLang();
  const [city, setCity] = useState("Все города");
  const [search, setSearch] = useState("");
  const t = T[lang];

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title anim anim-1">
          <span className="accent">Bozor</span>.tj
        </h1>
        <p className="hero-sub anim anim-2">{t.subtitle}</p>
        <div className="search-wrap anim anim-3">
          <input
            className="search-input"
            placeholder={t.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="search-btn" onClick={() => window.goTo("search")}>
            {t.searchBtn}
          </button>
        </div>
        <select className="city-select anim anim-4" value={city} onChange={e => setCity(e.target.value)}>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* STATS */}
      <div className="stats">
        {t.stats.map((s, i) => {
          const [num, label] = s.split("\n");
          return (
            <div key={i} className="stat">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          );
        })}
      </div>

      {/* CATEGORIES */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">
            {lang === "ru" ? "Категории" : "Категорияҳо"}
          </div>
        </div>
        <div className="cats-grid">
          {t.cats.map((c, i) => (
            <div key={i} className="cat-item" onClick={() => window.goTo("category", { categoryKey: CATEGORY_KEYS[i] })}>
              <div className="cat-icon">{c.icon}</div>
              <div className="cat-name">{c.name}</div>
              <div className="cat-count">{c.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FREE BANNER */}
      <div className="free-banner">
        <div className="free-icon">🎉</div>
        <div>
          <div className="free-title">{t.freeLabel}</div>
          <div className="free-desc">{t.freeDesc}</div>
          <button className="free-btn" onClick={() => window.goTo("auth")}>
            {t.addBtn}
          </button>
        </div>
      </div>

      {/* NEW ADS */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">{t.newAds}</div>
          <button className="see-all" onClick={() => window.goTo("search")}>
            {t.seeAll} →
          </button>
        </div>
        <div className="ads-scroll">
          {SAMPLE_ADS.map(ad => (
            <div key={ad.id} className="ad-card" onClick={() => window.goTo("ad")}>
              <div className="ad-img">
                <span className="badge-new">{t.new}</span>
                {ad.emoji}
              </div>
              <div className="ad-body">
                <div className="ad-price">{ad.price}</div>
                <div className="ad-title">{ad.title}</div>
                <div className="ad-meta">
                  <span className="ad-city">📍 {ad.city}</span>
                  <span className="ad-time">{ad.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">{t.footer}</div>
    </div>
  );
}
