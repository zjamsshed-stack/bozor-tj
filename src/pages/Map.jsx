import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
  --red:#FF4D6D;--blue:#4E9CFF;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn{background:transparent;border:1.5px solid var(--border);color:var(--text);padding:9px 16px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;}
.btn:hover{border-color:var(--emerald);color:var(--emerald);}
.btn-primary{background:var(--emerald);color:#0F1923;border:none;}
.btn-primary:hover{background:var(--emerald2);}

.map-container{display:grid;grid-template-columns:1fr 320px;height:calc(100vh - 62px);}

/* MAP */
.map-area{background:var(--card2);position:relative;overflow:hidden;}
.map-canvas{width:100%;height:100%;background:linear-gradient(135deg,#0D2318,#162130);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:48px;}
.map-controls{position:absolute;top:20px;left:20px;display:flex;flex-direction:column;gap:10px;z-index:10;}
.map-btn{width:44px;height:44px;background:var(--card);border:1.5px solid var(--border);border-radius:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all 0.2s;}
.map-btn:hover{border-color:var(--emerald);background:var(--emerald);color:#0F1923;}

.location-marker{position:absolute;width:40px;height:40px;cursor:pointer;animation:pulse 2s infinite;}
@keyframes pulse{0%{transform:scale(1);}50%{transform:scale(1.1);}100%{transform:scale(1);}}

.marker{width:100%;height:100%;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid var(--emerald);background:rgba(0,200,150,0.2);}

.marker-popup{position:absolute;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px;min-width:200px;box-shadow:0 10px 30px rgba(0,0,0,0.5);bottom:50px;left:-100px;z-index:20;}
.marker-popup-name{font-weight:700;font-size:13px;margin-bottom:4px;}
.marker-popup-addr{font-size:11px;color:var(--muted);margin-bottom:8px;}
.marker-popup-price{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;color:var(--emerald);margin-bottom:8px;}
.marker-popup-btn{width:100%;padding:8px;background:var(--emerald);color:#0F1923;border:none;border-radius:8px;font-weight:700;font-size:12px;cursor:pointer;}

/* SIDEBAR */
.map-sidebar{background:var(--card);border-left:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column;}
.sidebar-head{padding:16px;border-bottom:1px solid var(--border);flex-shrink:0;}
.search-box{display:flex;gap:8px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;overflow:hidden;}
.search-box input{flex:1;padding:9px 12px;background:none;border:none;outline:none;color:var(--text);font-size:13px;}
.search-box button{padding:0 12px;border:none;background:none;color:var(--muted);cursor:pointer;}

.filters{padding:12px;border-bottom:1px solid var(--border);flex-shrink:0;}
.filter-group{margin-bottom:12px;}
.filter-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px;display:block;}
.filter-select{width:100%;padding:8px;background:var(--card2);border:1.5px solid var(--border);border-radius:8px;color:var(--text);font-size:12px;font-family:'Golos Text',sans-serif;cursor:pointer;}

.ads-list{flex:1;overflow-y:auto;padding:12px;}
.ad-item{background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;cursor:pointer;transition:all 0.2s;}
.ad-item:hover{border-color:var(--emerald);background:rgba(0,200,150,0.05);}
.ad-icon{font-size:24px;margin-bottom:6px;}
.ad-name{font-weight:700;font-size:12px;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ad-addr{font-size:10px;color:var(--muted);margin-bottom:3px;}
.ad-dist{font-size:11px;color:var(--emerald);font-weight:600;}
.ad-price{font-family:'Unbounded',sans-serif;font-size:13px;font-weight:700;color:var(--emerald);margin-top:6px;}

.empty{text-align:center;padding:30px 16px;color:var(--muted);}
.empty-icon{font-size:40px;margin-bottom:10px;}

.location-info{padding:12px;background:var(--ebg);border:1px solid rgba(0,200,150,0.2);border-radius:10px;margin-bottom:12px;font-size:12px;}
.location-label{color:var(--muted);margin-bottom:3px;}
.location-value{font-weight:700;color:var(--emerald);}

.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:12px 24px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);}

@media(max-width:768px){
  .map-container{grid-template-columns:1fr;}
  .map-sidebar{position:absolute;right:0;top:0;width:300px;height:100%;z-index:50;border-radius:0;}
}
`;

const ADS_ON_MAP = [
  { id:1, emoji:"🚗", name:"Toyota Camry 2023", addr:"ул. Рудаки, 45", price:185000, lat:36.73, lng:69.18, dist:"0.5 км" },
  { id:2, emoji:"🏠", name:"2-комн. квартира", addr:"ТЦ Сино, 1 этаж", price:95000, lat:36.74, lng:69.19, dist:"1.2 км" },
  { id:3, emoji:"📱", name:"iPhone 13 Pro", addr:"магазин на Исмаила", price:4200, lat:36.72, lng:69.17, dist:"0.8 км" },
  { id:4, emoji:"💻", name:"MacBook Pro M3", addr:"офис AutoLux", price:14200, lat:36.75, lng:69.20, dist:"1.5 км" },
  { id:5, emoji:"🛋️", name:"Диван угловой", addr:"склад на Шоселе", price:3200, lat:36.71, lng:69.16, dist:"2.1 км" },
];

export default function Map() {
  const [selectedAd, setSelectedAd] = useState(null);
  const [radius, setRadius] = useState(5);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("dist");
  const [searchText, setSearchText] = useState("");
  const [toast, setToast] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 36.73, lng: 69.18, addr: "Душанбе, Таджикистан" });

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filtered = ADS_ON_MAP.filter(ad => {
    const matchSearch = ad.name.toLowerCase().includes(searchText.toLowerCase()) || ad.addr.toLowerCase().includes(searchText.toLowerCase());
    const matchRadius = parseFloat(ad.dist) <= radius;
    return matchSearch && matchRadius;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "dist") return parseFloat(a.dist) - parseFloat(b.dist);
    if (sortBy === "price") return a.price - b.price;
    return 0;
  });

  return (
    <div>
      <header className="header">
        <div className="logo">bozor<span>.tj</span></div>
        <button className="btn" onClick={() => window.goTo("search")}>← Назад</button>
      </header>

      <div className="map-container">
        {/* MAP */}
        <div className="map-area">
          <div className="map-canvas">🗺️</div>

          {/* MAP CONTROLS */}
          <div className="map-controls">
            <div className="map-btn" onClick={() => showToast("📍 Мой адрес загруженный")}>📍</div>
            <div className="map-btn" onClick={() => showToast("🔍 Поиск по карте")}>🔍</div>
            <div className="map-btn" onClick={() => showToast("➕ Приблизить")}>➕</div>
            <div className="map-btn" onClick={() => showToast("➖ Отдалить")}>➖</div>
          </div>

          {/* MARKERS */}
          {sorted.map(ad => (
            <div key={ad.id} className="location-marker" style={{
              left: `${(ad.lng - 69.15) * 100 + 50}%`,
              top: `${(36.8 - ad.lat) * 100 + 50}%`,
            }} onClick={() => setSelectedAd(ad)}>
              <div className="marker">{ad.emoji}</div>
              {selectedAd?.id === ad.id && (
                <div className="marker-popup">
                  <div className="marker-popup-name">{ad.name}</div>
                  <div className="marker-popup-addr">📍 {ad.addr}</div>
                  <div className="marker-popup-price">{ad.price.toLocaleString()} с.</div>
                  <button className="marker-popup-btn" onClick={() => window.goTo("ad")}>Смотреть →</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <div className="map-sidebar">
          {/* SEARCH */}
          <div className="sidebar-head">
            <div className="search-box">
              <input placeholder="Поиск по карте..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <button>🔍</button>
            </div>
          </div>

          {/* LOCATION INFO */}
          <div style={{ padding: "12px" }}>
            <div className="location-info">
              <div className="location-label">📍 Ваше местоположение</div>
              <div className="location-value">{userLocation.addr}</div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="filters">
            <div className="filter-group">
              <label className="filter-label">Радиус поиска</label>
              <input type="range" min="0.5" max="10" step="0.5" value={radius} onChange={(e) => setRadius(e.target.value)} style={{
                width: "100%", cursor: "pointer", accentColor: "#00C896"
              }} />
              <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>До {radius} км</div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Категория</label>
              <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">Все категории</option>
                <option value="auto">🚗 Транспорт</option>
                <option value="real">🏠 Недвижимость</option>
                <option value="tech">📱 Электроника</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Сортировка</label>
              <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="dist">По расстоянию</option>
                <option value="price">По цене</option>
              </select>
            </div>
          </div>

          {/* ADS LIST */}
          <div className="ads-list">
            {sorted.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">🗺️</div>
                <div>Товары не найдены</div>
              </div>
            ) : sorted.map(ad => (
              <div key={ad.id} className="ad-item" onClick={() => { setSelectedAd(ad); showToast(ad.name); }}>
                <div className="ad-icon">{ad.emoji}</div>
                <div className="ad-name">{ad.name}</div>
                <div className="ad-addr">{ad.addr}</div>
                <div className="ad-dist">📍 {ad.dist}</div>
                <div className="ad-price">{ad.price.toLocaleString()} с.</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
