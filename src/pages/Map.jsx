import { useState, useEffect, useRef } from "react";
import { useLang } from "../context/LangContext";

// Все регионы Таджикистана с координатами (примерные центры)
const REGIONS = [
  { id: "dushanbe",     name: "Душанбе",          nameTj: "Душанбе",          lat: 38.559,  lon: 68.773,  capital: true },
  { id: "sughd",        name: "Согдийская обл.",   nameTj: "Вилояти Суғд",     lat: 40.216,  lon: 69.732 },
  { id: "khatlon",      name: "Хатлонская обл.",   nameTj: "Вилояти Хатлон",   lat: 37.800,  lon: 69.200 },
  { id: "gorno",        name: "ГБАО",              nameTj: "ВМКБ",              lat: 38.000,  lon: 73.500 },
  { id: "rrs",          name: "РРС",               nameTj: "НТҶ",               lat: 38.900,  lon: 69.200 },
];

// Города по регионам
const CITIES_BY_REGION = {
  dushanbe: ["Душанбе"],
  sughd:    ["Худжанд", "Истаравшан", "Бустон", "Гулистон", "Истиклол", "Канибадам", "Исфара"],
  khatlon:  ["Бохтар", "Куляб", "Левакант", "Нурек"],
  gorno:    ["Хорог"],
  rrs:      ["Вахдат", "Гиссар", "Пенджикент", "Рогун", "Турсунзаде"],
};

const CATEGORIES = [
  { id: "all",         icon: "🗺️", name: "Все",          nameTj: "Ҳама" },
  { id: "auto",        icon: "🚗", name: "Транспорт",     nameTj: "Нақлиёт" },
  { id: "realestate",  icon: "🏠", name: "Недвижимость",  nameTj: "Амвол" },
  { id: "electronics", icon: "📱", name: "Электроника",   nameTj: "Электроника" },
  { id: "jobs",        icon: "💼", name: "Работа",        nameTj: "Кор" },
  { id: "home_goods",  icon: "🛋️", name: "Для дома",     nameTj: "Барои хона" },
  { id: "clothes",     icon: "👗", name: "Одежда",        nameTj: "Либос" },
  { id: "services",    icon: "🔧", name: "Услуги",        nameTj: "Хидматҳо" },
  { id: "animals",     icon: "🐾", name: "Животные",      nameTj: "Ҳайвонот" },
];

const SAMPLE_ADS = [
  { id:1, emoji:"🚗", name:"Toyota Camry 2023", addr:"ул. Рудаки, 45",   dist:"0.5 км", price:185000, cat:"auto",        region:"dushanbe" },
  { id:2, emoji:"📱", name:"iPhone 13 Pro",     addr:"маг. на Исмаила",  dist:"0.8 км", price:4200,   cat:"electronics", region:"dushanbe" },
  { id:3, emoji:"🏠", name:"2-комн. квартира",  addr:"пр. Борбад, 12",   dist:"1.2 км", price:95000,  cat:"realestate",  region:"dushanbe" },
  { id:4, emoji:"🚗", name:"Hyundai Tucson",    addr:"ул. Айни, 89",     dist:"1.8 км", price:162000, cat:"auto",        region:"dushanbe" },
  { id:5, emoji:"🛋️", name:"Диван угловой",    addr:"Центральный рынок",dist:"2.1 км", price:3200,   cat:"home_goods",  region:"dushanbe" },
  { id:6, emoji:"🚗", name:"Nexia 3",           addr:"ул. Ленина, 7",    dist:"2.5 км", price:14500,  cat:"auto",        region:"dushanbe" },
  { id:7, emoji:"🏠", name:"1-комн. квартира",  addr:"мкр. Сино, 4",     dist:"3.1 км", price:55000,  cat:"realestate",  region:"dushanbe" },
  { id:8, emoji:"📱", name:"Samsung S24 Ultra", addr:"ТЦ Душанбе Сити",  dist:"3.5 км", price:6800,   cat:"electronics", region:"dushanbe" },
  { id:9, emoji:"🚗", name:"Kia K5 2022",       addr:"ул. Сомони, 33",   dist:"4.0 км", price:178000, cat:"auto",        region:"sughd" },
  { id:10,emoji:"🔧", name:"Ремонт телефонов",  addr:"ул. Победы, 15",   dist:"4.5 км", price:200,    cat:"services",    region:"sughd" },
  { id:11,emoji:"👗", name:"Платье вечернее",   addr:"Рынок Корвон",     dist:"5.0 км", price:450,    cat:"clothes",     region:"khatlon" },
  { id:12,emoji:"🐾", name:"Щенок хаски",       addr:"мкр. Зарнисор",   dist:"5.8 км", price:1500,   cat:"animals",     region:"khatlon" },
];

const RADIUS_MARKS = [1, 2, 5, 10, 15, 20, 30, 50];

const css = `
.map-page{display:flex;flex-direction:column;height:calc(100vh - var(--header-h) - var(--nav-h));overflow:hidden;}

/* MAP CANVAS */
.map-canvas{
  flex:1;position:relative;overflow:hidden;
  background:linear-gradient(145deg,#0a1f15 0%,#0F1923 40%,#162130 100%);
  min-height:200px;
}
.map-bg-grid{
  position:absolute;inset:0;opacity:0.06;
  background-image:linear-gradient(rgba(0,200,150,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,1) 1px,transparent 1px);
  background-size:40px 40px;
}
.map-country-label{
  position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);
  font-family:'Unbounded',sans-serif;font-size:clamp(28px,6vw,64px);
  font-weight:900;color:rgba(0,200,150,0.08);
  white-space:nowrap;pointer-events:none;
  letter-spacing:4px;
}

/* MAP MARKERS */
.map-pin{position:absolute;transform:translate(-50%,-50%);cursor:pointer;z-index:10;transition:transform 0.2s;}
.map-pin:hover{transform:translate(-50%,-50%) scale(1.15);}
.map-pin-dot{
  width:14px;height:14px;background:var(--emerald);border-radius:50%;
  border:2px solid rgba(0,200,150,0.3);
  box-shadow:0 0 0 4px rgba(0,200,150,0.15);
  transition:all 0.2s;
}
.map-pin.capital .map-pin-dot{width:18px;height:18px;background:var(--emerald);box-shadow:0 0 0 6px rgba(0,200,150,0.2);}
.map-pin.active .map-pin-dot{background:var(--red);box-shadow:0 0 0 6px rgba(255,77,109,0.25);}
.map-pin-label{
  position:absolute;top:18px;left:50%;transform:translateX(-50%);
  background:rgba(15,25,35,0.92);border:1px solid var(--border);
  color:var(--text);font-size:10px;font-weight:700;
  padding:2px 8px;border-radius:6px;white-space:nowrap;
}
.map-pin.capital .map-pin-label{color:var(--emerald);border-color:rgba(0,200,150,0.4);}

/* AD PINS ON MAP */
.ad-pin{
  position:absolute;transform:translate(-50%,-100%);cursor:pointer;z-index:20;
  animation:pinDrop 0.3s cubic-bezier(0.34,1.4,0.64,1);
}
@keyframes pinDrop{from{transform:translate(-50%,-80%) scale(0.5);opacity:0;}to{transform:translate(-50%,-100%);opacity:1;}}
.ad-pin-bubble{
  background:var(--card);border:1.5px solid var(--border);
  border-radius:10px;padding:4px 8px;
  font-size:11px;font-weight:700;
  display:flex;align-items:center;gap:5px;
  box-shadow:0 4px 12px rgba(0,0,0,0.4);
  transition:all 0.2s;white-space:nowrap;
}
.ad-pin-bubble:hover{border-color:var(--emerald);transform:scale(1.05);}
.ad-pin-bubble.selected{border-color:var(--emerald);background:var(--ebg);}
.ad-pin-price{color:var(--emerald);}
.ad-pin-arrow{
  position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);
  width:10px;height:6px;
  background:var(--card);clip-path:polygon(0 0,100% 0,50% 100%);
  border-bottom:1.5px solid var(--border);
}

/* MAP CONTROLS */
.map-zoom-btns{position:absolute;bottom:20px;left:16px;display:flex;flex-direction:column;gap:6px;z-index:30;}
.zoom-btn{
  width:40px;height:40px;border-radius:10px;
  background:var(--card);border:1.5px solid var(--border);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:18px;font-weight:700;
  color:var(--text);transition:all 0.2s;
}
.zoom-btn:hover{border-color:var(--emerald);color:var(--emerald);}

/* REGION BADGES ON MAP */
.region-badge{
  position:absolute;transform:translate(-50%,-50%);
  background:rgba(0,200,150,0.12);border:1px solid rgba(0,200,150,0.25);
  border-radius:8px;padding:3px 10px;
  font-size:10px;font-weight:700;color:rgba(0,200,150,0.7);
  white-space:nowrap;pointer-events:none;
}

/* BOTTOM PANEL */
.map-bottom{
  background:var(--bg);border-top:1px solid var(--border);
  display:flex;flex-direction:column;
  max-height:55vh;
  position:relative;
}

/* TABS (Region / Filters / List) */
.map-tabs{display:flex;border-bottom:1px solid var(--border);padding:0 16px;gap:4px;flex-shrink:0;}
.map-tab{
  padding:10px 14px;font-size:12px;font-weight:700;
  background:none;border:none;color:var(--muted);cursor:pointer;
  border-bottom:2px solid transparent;margin-bottom:-1px;transition:all 0.2s;
  font-family:'Golos Text',sans-serif;white-space:nowrap;
}
.map-tab.active{color:var(--emerald);border-bottom-color:var(--emerald);}

/* PANEL CONTENT */
.panel-scroll{overflow-y:auto;flex:1;padding:16px;}
.panel-scroll::-webkit-scrollbar{width:3px;}
.panel-scroll::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:2px;}

/* REGIONS TAB */
.regions-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-bottom:16px;}
.region-card{
  background:var(--card);border:1.5px solid var(--border);
  border-radius:14px;padding:14px;cursor:pointer;
  transition:all 0.2s;text-align:center;
}
.region-card:hover{border-color:var(--emerald);background:var(--ebg);}
.region-card.active{border-color:var(--emerald);background:var(--ebg);}
.region-card-icon{font-size:24px;margin-bottom:6px;}
.region-card-name{font-size:12px;font-weight:700;margin-bottom:3px;}
.region-card-sub{font-size:10px;color:var(--muted);}

.cities-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:10px;}
.cities-chips{display:flex;flex-wrap:wrap;gap:6px;}
.city-chip{
  padding:6px 14px;border-radius:20px;
  border:1.5px solid var(--border);
  background:var(--card2);font-size:12px;font-weight:600;
  cursor:pointer;transition:all 0.2s;color:var(--text);
}
.city-chip:hover,.city-chip.active{border-color:var(--emerald);color:var(--emerald);background:var(--ebg);}

/* FILTERS TAB */
.filter-section{margin-bottom:20px;}
.filter-label{display:block;font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:10px;}

/* RADIUS SLIDER */
.radius-slider-wrap{position:relative;margin-bottom:12px;}
.radius-slider{
  width:100%;-webkit-appearance:none;appearance:none;
  height:5px;border-radius:5px;outline:none;cursor:pointer;
  background:linear-gradient(to right,var(--emerald) 0%,var(--emerald) var(--pct,40%),var(--border) var(--pct,40%),var(--border) 100%);
}
.radius-slider::-webkit-slider-thumb{
  -webkit-appearance:none;width:22px;height:22px;
  border-radius:50%;background:var(--emerald);cursor:pointer;
  box-shadow:0 2px 8px rgba(0,200,150,0.5);
  border:3px solid #0F1923;transition:transform 0.15s;
}
.radius-slider::-webkit-slider-thumb:hover{transform:scale(1.15);}
.radius-marks{display:flex;justify-content:space-between;margin-top:6px;}
.radius-mark{font-size:9px;color:var(--muted);}
.radius-value{
  display:flex;align-items:center;justify-content:space-between;margin-top:8px;
}
.radius-badge{
  background:var(--emerald);color:#0F1923;
  font-size:13px;font-weight:800;font-family:'Unbounded',sans-serif;
  padding:4px 14px;border-radius:20px;
}

/* CATEGORY PILLS */
.cat-pills{display:flex;flex-wrap:wrap;gap:8px;}
.cat-pill{
  display:flex;align-items:center;gap:6px;
  padding:8px 14px;border-radius:20px;
  border:1.5px solid var(--border);
  background:var(--card2);cursor:pointer;
  font-size:12px;font-weight:600;transition:all 0.2s;
}
.cat-pill:hover{border-color:var(--emerald);}
.cat-pill.active{border-color:var(--emerald);background:var(--ebg);color:var(--emerald);}

/* ADS LIST TAB */
.ad-map-card{
  display:flex;gap:12px;padding:12px;
  background:var(--card);border:1.5px solid var(--border);
  border-radius:12px;margin-bottom:8px;cursor:pointer;
  transition:all 0.2s;
}
.ad-map-card:hover,.ad-map-card.active{border-color:var(--emerald);}
.ad-map-icon{
  width:50px;height:50px;border-radius:10px;
  background:var(--card2);display:flex;align-items:center;
  justify-content:center;font-size:24px;flex-shrink:0;
}
.ad-map-info{flex:1;min-width:0;}
.ad-map-name{font-size:13px;font-weight:700;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.ad-map-addr{font-size:11px;color:var(--muted);margin-bottom:4px;}
.ad-map-row{display:flex;justify-content:space-between;align-items:center;}
.ad-map-dist{font-size:11px;color:var(--emerald);font-weight:600;}
.ad-map-price{font-family:'Unbounded',sans-serif;font-size:13px;font-weight:700;color:var(--emerald);}

.empty-map{text-align:center;padding:30px 20px;color:var(--muted);}
.empty-map-icon{font-size:40px;margin-bottom:10px;}

/* PANEL DRAG HANDLE */
.panel-handle{
  width:40px;height:4px;background:var(--border);
  border-radius:2px;margin:10px auto 0;cursor:pointer;flex-shrink:0;
}

/* SORT ROW */
.sort-row{display:flex;gap:8px;margin-top:12px;}
.sort-btn{
  flex:1;padding:8px;border-radius:10px;
  border:1.5px solid var(--border);background:var(--card2);
  font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;
  transition:all 0.2s;font-family:'Golos Text',sans-serif;
}
.sort-btn.active{border-color:var(--emerald);color:var(--emerald);}

/* TOAST */
.toast{
  position:fixed;top:68px;left:50%;transform:translateX(-50%);
  background:var(--emerald);color:#0F1923;
  padding:10px 20px;border-radius:20px;
  font-weight:700;font-size:12px;z-index:300;
  box-shadow:0 6px 20px rgba(0,200,150,0.4);
  animation:toastIn 0.3s cubic-bezier(0.34,1.4,0.64,1);
  white-space:nowrap;pointer-events:none;
}
@keyframes toastIn{
  from{opacity:0;transform:translateX(-50%) translateY(-8px);}
  to{opacity:1;transform:translateX(-50%) translateY(0);}
}
`;

// Позиции на "карте" в % от размера canvas
const MAP_POSITIONS = {
  dushanbe: { x: 50, y: 52 },
  sughd:    { x: 42, y: 22 },
  khatlon:  { x: 52, y: 70 },
  gorno:    { x: 75, y: 48 },
  rrs:      { x: 45, y: 42 },
};

const AD_POSITIONS = {
  1:  { x:49, y:51 }, 2:  { x:51, y:53 }, 3:  { x:50, y:49 },
  4:  { x:48, y:52 }, 5:  { x:52, y:50 }, 6:  { x:47, y:54 },
  7:  { x:53, y:48 }, 8:  { x:50, y:55 }, 9:  { x:41, y:23 },
  10: { x:43, y:21 }, 11: { x:51, y:69 }, 12: { x:53, y:71 },
};

export default function Map() {
  const { lang } = useLang();
  const [tab, setTab] = useState("regions");
  const [region, setRegion] = useState("dushanbe");
  const [city, setCity] = useState("Душанбе");
  const [category, setCategory] = useState("all");
  const [radius, setRadius] = useState(5);
  const [sortBy, setSortBy] = useState("dist");
  const [selectedAd, setSelectedAd] = useState(null);
  const [toast, setToast] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const filteredAds = SAMPLE_ADS.filter(ad => {
    const distNum = parseFloat(ad.dist);
    const catOk = category === "all" || ad.cat === category;
    const radOk = distNum <= radius;
    const regOk = region === "all" || ad.region === region;
    return catOk && radOk && regOk;
  });

  const sorted = [...filteredAds].sort((a, b) =>
    sortBy === "dist" ? parseFloat(a.dist) - parseFloat(b.dist) : a.price - b.price
  );

  const pct = ((radius - 1) / (50 - 1)) * 100;

  const tl = lang === "tj";
  const regionName = (r) => tl ? r.nameTj : r.name;

  return (
    <div className="map-page">
      {/* MAP CANVAS */}
      <div className="map-canvas" ref={canvasRef}>
        <div className="map-bg-grid" />
        <div className="map-country-label">TAJIKISTAN</div>

        {/* Регионы на карте */}
        {REGIONS.map(r => (
          <div
            key={r.id}
            className={`map-pin ${r.capital ? "capital" : ""} ${region === r.id ? "active" : ""}`}
            style={{ left: `${MAP_POSITIONS[r.id].x}%`, top: `${MAP_POSITIONS[r.id].y}%` }}
            onClick={() => {
              setRegion(r.id);
              const cities = CITIES_BY_REGION[r.id];
              setCity(cities[0]);
              setTab("regions");
              showToast(`📍 ${regionName(r)}`);
            }}
          >
            <div className="map-pin-dot" />
            <div className="map-pin-label">{regionName(r)}</div>
          </div>
        ))}

        {/* Объявления на карте */}
        {sorted.map(ad => {
          const pos = AD_POSITIONS[ad.id];
          if (!pos) return null;
          return (
            <div
              key={ad.id}
              className="ad-pin"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => { setSelectedAd(ad); setTab("list"); showToast(ad.name); }}
            >
              <div className={`ad-pin-bubble ${selectedAd?.id === ad.id ? "selected" : ""}`}>
                <span>{ad.emoji}</span>
                <span className="ad-pin-price">{ad.price.toLocaleString()} с.</span>
              </div>
              <div className="ad-pin-arrow" />
            </div>
          );
        })}

        {/* Кнопки зума */}
        <div className="map-zoom-btns">
          <button className="zoom-btn" onClick={() => showToast("Приближение")}>+</button>
          <button className="zoom-btn" onClick={() => showToast("Отдаление")}>−</button>
        </div>
      </div>

      {/* BOTTOM PANEL */}
      <div className="map-bottom">
        <div className="panel-handle" onClick={() => setTab(t => t === "list" ? "regions" : "list")} />

        <div className="map-tabs">
          {[
            { id:"regions", label: tl ? "Регионҳо" : "Регионы",  icon:"🗺️" },
            { id:"filters", label: tl ? "Филтрҳо"  : "Фильтры",  icon:"⚙️" },
            { id:"list",    label: tl ? "Эълонҳо"  : `Объявления (${sorted.length})`, icon:"📋" },
          ].map(t => (
            <button key={t.id} className={`map-tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="panel-scroll">

          {/* ===== РЕГИОНЫ ===== */}
          {tab === "regions" && (
            <div>
              <div className="regions-grid">
                {REGIONS.map(r => (
                  <div
                    key={r.id}
                    className={`region-card ${region === r.id ? "active" : ""}`}
                    onClick={() => { setRegion(r.id); setCity(CITIES_BY_REGION[r.id][0]); }}
                  >
                    <div className="region-card-icon">{r.capital ? "🏛️" : "🌍"}</div>
                    <div className="region-card-name">{regionName(r)}</div>
                    <div className="region-card-sub">{CITIES_BY_REGION[r.id].length} {tl ? "шаҳр" : "городов"}</div>
                  </div>
                ))}
              </div>

              {/* Города выбранного региона */}
              {region && (
                <div>
                  <div className="cities-title">
                    {tl ? "Шаҳрҳо" : "Города"} — {tl ? REGIONS.find(r=>r.id===region)?.nameTj : REGIONS.find(r=>r.id===region)?.name}
                  </div>
                  <div className="cities-chips">
                    {CITIES_BY_REGION[region]?.map(c => (
                      <button key={c} className={`city-chip ${city === c ? "active" : ""}`} onClick={() => setCity(c)}>
                        📍 {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== ФИЛЬТРЫ ===== */}
          {tab === "filters" && (
            <div>
              {/* РАДИУС */}
              <div className="filter-section">
                <label className="filter-label">📏 {tl ? "Радиуси ҷустуҷӯ" : "Радиус поиска"}</label>
                <div className="radius-value">
                  <span style={{ fontSize:12, color:"var(--muted)" }}>1 км</span>
                  <div className="radius-badge">{radius} км</div>
                  <span style={{ fontSize:12, color:"var(--muted)" }}>50 км</span>
                </div>
                <div className="radius-slider-wrap">
                  <input
                    type="range" className="radius-slider"
                    min={1} max={50} step={1} value={radius}
                    style={{ "--pct": `${pct}%` }}
                    onChange={e => setRadius(Number(e.target.value))}
                  />
                </div>
                <div className="radius-marks">
                  {RADIUS_MARKS.map(m => (
                    <span key={m} className="radius-mark"
                      style={{ color: radius >= m ? "var(--emerald)" : "var(--muted)", fontWeight: radius === m ? "700" : "400" }}>
                      {m}
                    </span>
                  ))}
                </div>

                {/* Быстрые кнопки радиуса */}
                <div style={{ display:"flex", gap:6, marginTop:12, flexWrap:"wrap" }}>
                  {[1,2,5,10,20,50].map(v => (
                    <button key={v}
                      onClick={() => setRadius(v)}
                      style={{
                        padding:"6px 14px", borderRadius:20,
                        border: `1.5px solid ${radius === v ? "var(--emerald)" : "var(--border)"}`,
                        background: radius === v ? "var(--ebg)" : "var(--card2)",
                        color: radius === v ? "var(--emerald)" : "var(--muted)",
                        fontSize:12, fontWeight:700, cursor:"pointer", transition:"all 0.2s",
                        fontFamily:"'Golos Text',sans-serif",
                      }}>
                      {v} км
                    </button>
                  ))}
                </div>
              </div>

              {/* КАТЕГОРИИ */}
              <div className="filter-section">
                <label className="filter-label">🏷️ {tl ? "Категория" : "Категории"}</label>
                <div className="cat-pills">
                  {CATEGORIES.map(c => (
                    <button key={c.id} className={`cat-pill ${category === c.id ? "active" : ""}`}
                      onClick={() => setCategory(c.id)}>
                      <span>{c.icon}</span>
                      <span>{tl ? c.nameTj : c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* СОРТИРОВКА */}
              <div className="filter-section">
                <label className="filter-label">📊 {tl ? "Тартиб" : "Сортировка"}</label>
                <div className="sort-row">
                  <button className={`sort-btn ${sortBy === "dist" ? "active" : ""}`} onClick={() => setSortBy("dist")}>
                    📍 {tl ? "Аз дур" : "По расстоянию"}
                  </button>
                  <button className={`sort-btn ${sortBy === "price" ? "active" : ""}`} onClick={() => setSortBy("price")}>
                    💰 {tl ? "Аз нарх" : "По цене"}
                  </button>
                </div>
              </div>

              <div style={{ padding:"12px 0", textAlign:"center" }}>
                <div style={{ fontSize:13, color:"var(--muted)" }}>
                  {tl ? "Дар ин радиус ёфт шуд:" : "Найдено в этом радиусе:"} <strong style={{ color:"var(--emerald)" }}>{sorted.length}</strong> {tl ? "эълон" : "объявлений"}
                </div>
              </div>
            </div>
          )}

          {/* ===== СПИСОК ОБЪЯВЛЕНИЙ ===== */}
          {tab === "list" && (
            <div>
              {sorted.length === 0 ? (
                <div className="empty-map">
                  <div className="empty-map-icon">🗺️</div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:6 }}>
                    {tl ? "Эълон ёфт нашуд" : "Объявлений не найдено"}
                  </div>
                  <div style={{ fontSize:12, color:"var(--muted)" }}>
                    {tl ? "Радиуси ҷустуҷӯро зиёд кун" : "Увеличь радиус поиска или смени категорию"}
                  </div>
                  <button
                    onClick={() => setTab("filters")}
                    style={{ marginTop:12, padding:"8px 20px", borderRadius:20, border:"1.5px solid var(--emerald)", background:"var(--ebg)", color:"var(--emerald)", fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"'Golos Text',sans-serif" }}>
                    ⚙️ {tl ? "Филтрҳо" : "Открыть фильтры"}
                  </button>
                </div>
              ) : (
                sorted.map(ad => (
                  <div key={ad.id}
                    className={`ad-map-card ${selectedAd?.id === ad.id ? "active" : ""}`}
                    onClick={() => { setSelectedAd(ad); showToast(ad.name); window.goTo("ad"); }}>
                    <div className="ad-map-icon">{ad.emoji}</div>
                    <div className="ad-map-info">
                      <div className="ad-map-name">{ad.name}</div>
                      <div className="ad-map-addr">📍 {ad.addr}</div>
                      <div className="ad-map-row">
                        <span className="ad-map-dist">🚶 {ad.dist}</span>
                        <span className="ad-map-price">{ad.price.toLocaleString()} с.</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
