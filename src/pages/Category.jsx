import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
  --gold:#FFD166;--red:#FF4D6D;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn{background:transparent;border:1.5px solid var(--border);color:var(--text);padding:9px 16px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;}
.btn:hover{border-color:var(--emerald);color:var(--emerald);}

.hero{background:linear-gradient(135deg,#0D2318,#162130);border-bottom:1px solid var(--border);padding:40px 20px;}
.hero-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:20px;}
.hero-icon{font-size:64px;}
.hero-text h1{font-family:'Unbounded',sans-serif;font-size:28px;font-weight:900;margin-bottom:8px;}
.hero-text p{color:var(--muted);font-size:14px;line-height:1.6;}
.hero-stats{display:flex;gap:20px;margin-top:14px;}
.stat{font-size:12px;color:var(--muted);}
.stat-num{font-family:'Unbounded',sans-serif;font-size:18px;font-weight:700;color:var(--emerald);}

.page{max-width:1200px;margin:0 auto;padding:24px 20px;}
.layout{display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:start;}

/* SIDEBAR */
.cat-sidebar{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;position:sticky;top:80px;}
.sidebar-section{padding:14px;}
.sidebar-section:not(:last-child){border-bottom:1px solid var(--border);}
.section-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px;}
.filter-item{padding:9px 12px;border:none;background:none;text-align:left;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;color:var(--muted);cursor:pointer;border-radius:8px;transition:all 0.15s;width:100%;display:block;}
.filter-item:hover{color:var(--text);}
.filter-item.active{background:var(--ebg);color:var(--emerald);}
.filter-check{margin-right:8px;}

/* TOOLBAR */
.toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:10px;flex-wrap:wrap;}
.toolbar-left{display:flex;align-items:center;gap:10px;}
.toolbar-text{font-size:13px;color:var(--muted);}
.toolbar-right{display:flex;gap:8px;}
.sort-select{background:var(--card);border:1.5px solid var(--border);color:var(--text);padding:9px 12px;border-radius:10px;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;}
.view-toggle{display:flex;gap:4px;}
.view-btn{width:36px;height:36px;border-radius:9px;border:1.5px solid var(--border);background:var(--card2);color:var(--muted);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all 0.15s;}
.view-btn.active{background:var(--emerald);color:#0F1923;border-color:var(--emerald);}

/* GRID */
.ads-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;}
.ad-card{background:var(--card);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;cursor:pointer;transition:all 0.22s;}
.ad-card:hover{border-color:var(--emerald);transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.35);}
.ad-img{height:150px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;}
.badge-new{position:absolute;top:8px;right:8px;background:var(--emerald);color:#0F1923;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;}
.badge-prem{position:absolute;top:8px;left:8px;background:var(--gold);color:#000;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;}
.ad-body{padding:12px;}
.ad-price{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;color:var(--emerald);}
.ad-title{font-size:12px;font-weight:600;margin-top:4px;line-height:1.4;}
.ad-footer{display:flex;justify-content:space-between;margin-top:8px;}
.ad-city{font-size:11px;color:var(--muted);}
.ad-time{font-size:11px;color:var(--muted);}

/* LIST VIEW */
.ads-list{display:flex;flex-direction:column;gap:12px;}
.ad-list-item{background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:14px;display:flex;gap:14px;cursor:pointer;transition:all 0.2s;}
.ad-list-item:hover{border-color:var(--emerald);background:rgba(0,200,150,0.03);}
.ad-list-img{width:100px;height:100px;border-radius:10px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:36px;flex-shrink:0;}
.ad-list-info{flex:1;}
.ad-list-title{font-weight:700;font-size:14px;margin-bottom:6px;}
.ad-list-details{display:flex;gap:16px;margin-bottom:8px;flex-wrap:wrap;}
.detail-item{font-size:12px;color:var(--muted);}
.ad-list-price{font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700;color:var(--emerald);}

/* PAGINATION */
.pagination{display:flex;gap:6px;justify-content:center;margin-top:28px;padding:20px;}
.page-btn{padding:8px 12px;border-radius:9px;border:1.5px solid var(--border);background:var(--card2);color:var(--muted);font-weight:600;font-size:12px;cursor:pointer;transition:all 0.15s;}
.page-btn:hover{border-color:var(--emerald);color:var(--emerald);}
.page-btn.active{background:var(--emerald);color:#0F1923;border-color:var(--emerald);}

.empty{text-align:center;padding:40px 20px;color:var(--muted);}
.empty-icon{font-size:48px;margin-bottom:12px;}

@media(max-width:860px){
  .layout{grid-template-columns:1fr;}
  .cat-sidebar{position:static;}
  .hero-inner{flex-direction:column;text-align:center;}
}
`;

const CATEGORIES = {
  auto: {
    name: "Транспорт",
    icon: "🚗",
    desc: "Автомобили, мотоциклы, велосипеды и запчасти",
    count: "111K+",
    subcats: ["Все", "Легковые", "Грузовики", "Мотоциклы", "Запчасти"],
  },
  real: {
    name: "Недвижимость",
    icon: "🏠",
    desc: "Квартиры, дома, земельные участки",
    count: "65K+",
    subcats: ["Все", "Квартиры", "Дома", "Участки", "Коммерция"],
  },
  tech: {
    name: "Электроника",
    icon: "📱",
    desc: "Телефоны, ноутбуки, планшеты, аксессуары",
    count: "28K+",
    subcats: ["Все", "Телефоны", "Ноутбуки", "Планшеты", "Аксессуары"],
  },
};

const ADS_DATA = {
  auto: [
    { id:1, emoji:"🚗", title:"Toyota Camry 2023, белая", price:185000, city:"Душанбе", time:"5 мин", new:true, prem:true },
    { id:2, emoji:"🚙", title:"Hyundai Tucson 2022, серый", price:162000, city:"Худжанд", time:"15 мин", new:true, prem:false },
    { id:3, emoji:"🚗", title:"Kia K5 2023, чёрная", price:178000, city:"Душанбе", time:"30 мин", new:false, prem:false },
    { id:4, emoji:"🚙", title:"Toyota RAV4 2021, синий", price:220000, city:"Куляб", time:"1 час", new:false, prem:false },
    { id:5, emoji:"🚗", title:"Hyundai Elantra 2022", price:138000, city:"Душанбе", time:"2 часа", new:false, prem:false },
    { id:6, emoji:"🏎️", title:"BMW 3 Series 2020", price:280000, city:"Худжанд", time:"3 часа", new:false, prem:true },
    { id:7, emoji:"🚗", title:"Mercedes C-Class 2019", price:260000, city:"Душанбе", time:"4 часа", new:false, prem:false },
    { id:8, emoji:"🚙", title:"Volkswagen Tiguan 2021", price:195000, city:"Бохтар", time:"5 часов", new:false, prem:false },
  ],
  real: [
    { id:1, emoji:"🏠", title:"2-комн. квартира, 65 м²", price:95000, city:"Душанбе", time:"10 мин", new:true, prem:true },
    { id:2, emoji:"🏢", title:"Студия 35 м², Сино", price:45000, city:"Душанбе", time:"20 мин", new:true, prem:false },
    { id:3, emoji:"🏠", title:"3-комн. квартира, 85 м²", price:128000, city:"Худжанд", time:"1 час", new:false, prem:false },
    { id:4, emoji:"🏡", title:"Дом 200 м² с участком", price:350000, city:"Гиссар", time:"2 часа", new:false, prem:true },
    { id:5, emoji:"🏢", title:"1-комн. квартира, 45 м²", price:62000, city:"Душанбе", time:"3 часа", new:false, prem:false },
    { id:6, emoji:"🏠", title:"4-комн. квартира, 120 м²", price:185000, city:"Худжанд", time:"4 часа", new:false, prem:false },
  ],
  tech: [
    { id:1, emoji:"📱", title:"iPhone 15 Pro Max, 256GB", price:8500, city:"Душанбе", time:"5 мин", new:true, prem:true },
    { id:2, emoji:"💻", title:"MacBook Pro M3, 512GB", price:14200, city:"Худжанд", time:"15 мин", new:true, prem:false },
    { id:3, emoji:"📱", title:"Samsung Galaxy S24", price:6800, city:"Душанбе", time:"1 час", new:false, prem:false },
    { id:4, emoji:"⌨️", title:"iPad Pro 12.9", price:7200, city:"Куляб", time:"2 часа", new:false, prem:false },
    { id:5, emoji:"📱", title:"iPhone 13 Pro, 128GB", price:4200, city:"Душанбе", time:"3 часа", new:false, prem:false },
    { id:6, emoji:"💻", title:"Lenovo IdeaPad 5", price:3800, city:"Бохтар", time:"5 часов", new:false, prem:true },
  ],
};

export default function Category() {
  const [catKey, setCatKey] = useState("auto");
  const [subcat, setSubcat] = useState("Все");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const cat = CATEGORIES[catKey];
  const ads = ADS_DATA[catKey] || [];
  
  const sortedAds = [...ads].sort((a, b) => {
    if (sort === "new") return 0;
    if (sort === "price") return a.price - b.price;
    return 0;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedAds.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const paginatedAds = sortedAds.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <header className="header">
        <div className="logo">bozor<span>.tj</span></div>
        <button className="btn" onClick={() => window.goTo("search")}>← Назад к поиску</button>
      </header>

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-icon">{cat.icon}</div>
          <div className="hero-text">
            <h1>{cat.name}</h1>
            <p>{cat.desc}</p>
            <div className="hero-stats">
              <div className="stat"><div className="stat-num">{cat.count}</div> объявлений</div>
              <div className="stat"><div className="stat-num">{ads.length}</div> на странице</div>
              <div className="stat"><div className="stat-num">18</div> городов ТЖ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="page">
        <div className="layout">
          {/* SIDEBAR */}
          <aside className="cat-sidebar">
            <div className="sidebar-section">
              <div className="section-title">Подкатегории</div>
              {cat.subcats.map(sc => (
                <button key={sc} className={`filter-item ${subcat === sc ? "active" : ""}`} onClick={() => { setSubcat(sc); setPage(1); }}>
                  {sc}
                </button>
              ))}
            </div>
            <div className="sidebar-section">
              <div className="section-title">Цена</div>
              {["0-100K", "100K-200K", "200K-500K", "500K+"].map(p => (
                <label key={p} className="filter-item" style={{ display: "flex", alignItems: "center" }}>
                  <input type="checkbox" className="filter-check" onChange={(e) => showToast("Фильтр: " + p)} />
                  {p} с.
                </label>
              ))}
            </div>
            <div className="sidebar-section">
              <div className="section-title">Город</div>
              {["Душанбе", "Худжанд", "Куляб", "Бохтар"].map(city => (
                <button key={city} className="filter-item" onClick={() => showToast("Город: " + city)}>
                  📍 {city}
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN */}
          <div>
            {/* TOOLBAR */}
            <div className="toolbar">
              <div className="toolbar-left">
                <span className="toolbar-text">Показано {paginatedAds.length} из {ads.length}</span>
              </div>
              <div className="toolbar-right">
                <select className="sort-select" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                  <option value="new">Новые первыми</option>
                  <option value="price">Сначала дешевле</option>
                </select>
                <div className="view-toggle">
                  <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>⊞</button>
                  <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>☰</button>
                </div>
              </div>
            </div>

            {/* ADS */}
            {view === "grid" ? (
              <div className="ads-grid">
                {paginatedAds.map(ad => (
                  <div key={ad.id} className="ad-card" onClick={() => window.goTo("ad")}>
                    <div className="ad-img">
                      {ad.prem && <span className="badge-prem">⭐ TOP</span>}
                      {ad.new && <span className="badge-new">Новое</span>}
                      {ad.emoji}
                    </div>
                    <div className="ad-body">
                      <div className="ad-price">{ad.price.toLocaleString()} с.</div>
                      <div className="ad-title">{ad.title}</div>
                      <div className="ad-footer">
                        <span className="ad-city">📍 {ad.city}</span>
                        <span className="ad-time">{ad.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ads-list">
                {paginatedAds.map(ad => (
                  <div key={ad.id} className="ad-list-item" onClick={() => window.goTo("ad")}>
                    <div className="ad-list-img">{ad.emoji}</div>
                    <div className="ad-list-info">
                      <div className="ad-list-title">{ad.title}</div>
                      <div className="ad-list-details">
                        <span className="detail-item">📍 {ad.city}</span>
                        <span className="detail-item">🕐 {ad.time}</span>
                        {ad.prem && <span className="detail-item" style={{ color: "var(--gold)" }}>⭐ TOP</span>}
                        {ad.new && <span className="detail-item" style={{ color: "var(--emerald)" }}>🆕 Новое</span>}
                      </div>
                      <div className="ad-list-price">{ad.price.toLocaleString()} с.</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn ${page === i + 1 ? "active" : ""}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        background: "var(--emerald)", color: "#0F1923", padding: "12px 24px",
        borderRadius: 11, fontWeight: 700, fontSize: 14, zIndex: 300,
        boxShadow: "0 8px 28px rgba(0,200,150,0.35)"
      }}>{toast}</div>}
    </div>
  );
}
