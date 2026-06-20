import { useState, useEffect } from "react";

import { useLang } from "../context/LangContext";
import { useRouter } from "../context/RouterContext";
import { CATALOG } from "../constants/categories";

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

/* BREADCRUMBS */
.crumbs{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:18px;font-size:13px;}
.crumb{color:var(--muted);cursor:pointer;transition:color 0.15s;}
.crumb:hover{color:var(--emerald);}
.crumb.current{color:var(--text);font-weight:700;cursor:default;}
.crumb-sep{color:var(--muted);opacity:0.5;}

/* SUBCATS / BRANDS / MODELS GRID */
.drill-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;}
.drill-card{background:var(--card);border:1.5px solid var(--border);border-radius:16px;padding:22px 14px;text-align:center;cursor:pointer;transition:all 0.2s;}
.drill-card:hover{border-color:var(--emerald);background:var(--ebg);transform:translateY(-3px);}
.drill-icon{font-size:34px;margin-bottom:10px;}
.drill-name{font-size:13px;font-weight:700;margin-bottom:4px;}
.drill-sub{font-size:11px;color:var(--muted);}

.model-list{display:flex;flex-direction:column;gap:8px;}
.model-row{display:flex;align-items:center;justify-content:space-between;background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:14px 16px;cursor:pointer;transition:all 0.2s;}
.model-row:hover{border-color:var(--emerald);background:var(--ebg);}
.model-row-name{font-size:14px;font-weight:600;}
.model-row-arrow{color:var(--muted);font-size:18px;}

.drill-empty{text-align:center;padding:60px 20px;color:var(--muted);}
.drill-empty-icon{font-size:52px;margin-bottom:14px;}
.drill-empty-text{font-size:14px;margin-bottom:18px;}
`;

// Мок-объявления для финального уровня (категория/бренд/модель)
const SAMPLE_ADS = [
  { id:1, title:"Отличное состояние, торг уместен", price:185000, city:"Душанбе", time:"5 мин", new:true, prem:true },
  { id:2, title:"Срочная продажа, все документы в порядке", price:162000, city:"Худжанд", time:"15 мин", new:true, prem:false },
  { id:3, title:"Один владелец, не битый", price:178000, city:"Душанбе", time:"30 мин", new:false, prem:false },
  { id:4, title:"Полная комплектация", price:220000, city:"Куляб", time:"1 час", new:false, prem:false },
];

export default function Category() {
  const { lang } = useLang();
  const { params } = useRouter();
  const categoryKey = params?.categoryKey || "auto";
  const cat = CATALOG[categoryKey] || CATALOG.auto;

  // Навигация внутри категории: subcats -> brands -> models -> ads
  const [subcat, setSubcat] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("new");

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // При смене категории (новый клик с главной) — сбрасываем уровень навигации
  useEffect(() => {
    setSubcat(null);
    setBrand(null);
    setModel(null);
  }, [categoryKey]);

  const t = lang === "ru"
    ? { all: "Все объявления", sub: "Подкатегории", brands: "Бренды", models: "Модели",
        new: "Новые первыми", price: "Сначала дешевле", grid: "Сетка", list: "Список",
        empty: "Пока нет объявлений", emptyDesc: "Будь первым кто разместит здесь объявление!",
        addBtn: "Подать объявление", showing: "Показано объявлений", back: "Назад" }
    : { all: "Ҳама эълонҳо", sub: "Зеркатегорияҳо", brands: "Брендҳо", models: "Моделҳо",
        new: "Аввал навҳо", price: "Аввал арзонтар", grid: "Тӯр", list: "Рӯйхат",
        empty: "Ҳоло эълон нест", emptyDesc: "Аввалин шуда эълон гузор!",
        addBtn: "Эълон гузоштан", showing: "Эълонҳо нишон дода шуд", back: "Бозгашт" };

  // ===== ОПРЕДЕЛЯЕМ ТЕКУЩИЙ УРОВЕНЬ =====
  const subcatObj = cat.subcats?.find(s => s.id === subcat);
  const brandObj = subcatObj?.brands?.find(b => b.id === brand);

  const showSubcats = !!cat.subcats && !subcat;
  const showBrands = subcatObj?.hasBrands && !brand;
  const showModels = brandObj && !model;
  const showAds = !cat.subcats || (subcatObj && !subcatObj.hasBrands) || (brandObj && model);

  const resetTo = (level) => {
    if (level === "category") { setSubcat(null); setBrand(null); setModel(null); }
    if (level === "subcat") { setBrand(null); setModel(null); }
    if (level === "brand") { setModel(null); }
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-icon">{cat.icon}</div>
          <div className="hero-text">
            <h1>{cat.name}</h1>
            <p>{cat.desc}</p>
            <div className="hero-stats">
              <div className="stat"><div className="stat-num">{cat.count}</div> {lang === "ru" ? "объявлений" : "эълон"}</div>
              <div className="stat"><div className="stat-num">18</div> {lang === "ru" ? "городов" : "шаҳр"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="page">
        {/* ХЛЕБНЫЕ КРОШКИ */}
        <div className="crumbs">
          <span className={`crumb ${!subcat ? "current" : ""}`} onClick={() => resetTo("category")}>
            {cat.icon} {cat.name}
          </span>
          {subcat && (
            <>
              <span className="crumb-sep">›</span>
              <span className={`crumb ${!brand ? "current" : ""}`} onClick={() => resetTo("subcat")}>
                {subcatObj?.name}
              </span>
            </>
          )}
          {brand && (
            <>
              <span className="crumb-sep">›</span>
              <span className={`crumb ${!model ? "current" : ""}`} onClick={() => resetTo("brand")}>
                {brandObj?.name}
              </span>
            </>
          )}
          {model && (
            <>
              <span className="crumb-sep">›</span>
              <span className="crumb current">{model}</span>
            </>
          )}
        </div>

        {/* УРОВЕНЬ 1: ПОДКАТЕГОРИИ */}
        {showSubcats && (
          <div>
            <div className="section-title" style={{ marginBottom: 14 }}>{t.sub}</div>
            <div className="drill-grid">
              {cat.subcats.map(sc => (
                <div key={sc.id} className="drill-card" onClick={() => setSubcat(sc.id)}>
                  <div className="drill-icon">{sc.icon}</div>
                  <div className="drill-name">{sc.name}</div>
                  {sc.hasBrands && <div className="drill-sub">{sc.brands.length} {lang === "ru" ? "брендов" : "бренд"}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* УРОВЕНЬ 2: БРЕНДЫ */}
        {showBrands && (
          <div>
            <div className="section-title" style={{ marginBottom: 14 }}>{t.brands}</div>
            <div className="drill-grid">
              {subcatObj.brands.map(b => (
                <div key={b.id} className="drill-card" onClick={() => setBrand(b.id)}>
                  <div className="drill-icon">{subcatObj.icon}</div>
                  <div className="drill-name">{b.name}</div>
                  <div className="drill-sub">{b.models.length} {lang === "ru" ? "моделей" : "модел"}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* УРОВЕНЬ 3: МОДЕЛИ */}
        {showModels && (
          <div>
            <div className="section-title" style={{ marginBottom: 14 }}>{t.models}</div>
            <div className="model-list">
              {brandObj.models.map(m => (
                <div key={m} className="model-row" onClick={() => setModel(m)}>
                  <span className="model-row-name">{brandObj.name} {m}</span>
                  <span className="model-row-arrow">›</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* УРОВЕНЬ 4: ОБЪЯВЛЕНИЯ */}
        {showAds && (
          <div>
            <div className="toolbar">
              <div className="toolbar-left">
                <span className="toolbar-text">{t.showing}: {SAMPLE_ADS.length}</span>
              </div>
              <div className="toolbar-right">
                <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="new">{t.new}</option>
                  <option value="price">{t.price}</option>
                </select>
                <div className="view-toggle">
                  <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>⊞</button>
                  <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>☰</button>
                </div>
              </div>
            </div>

            {view === "grid" ? (
              <div className="ads-grid">
                {SAMPLE_ADS.map(ad => (
                  <div key={ad.id} className="ad-card" onClick={() => window.goTo("ad")}>
                    <div className="ad-img">
                      {ad.prem && <span className="badge-prem">⭐ TOP</span>}
                      {ad.new && <span className="badge-new">{lang === "ru" ? "Новое" : "Нав"}</span>}
                      {cat.icon}
                    </div>
                    <div className="ad-body">
                      <div className="ad-price">{ad.price.toLocaleString()} с.</div>
                      <div className="ad-title">{model ? `${brandObj.name} ${model}` : ad.title}</div>
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
                {SAMPLE_ADS.map(ad => (
                  <div key={ad.id} className="ad-list-item" onClick={() => window.goTo("ad")}>
                    <div className="ad-list-img">{cat.icon}</div>
                    <div className="ad-list-info">
                      <div className="ad-list-title">{model ? `${brandObj.name} ${model}` : ad.title}</div>
                      <div className="ad-list-details">
                        <span className="detail-item">📍 {ad.city}</span>
                        <span className="detail-item">🕐 {ad.time}</span>
                      </div>
                      <div className="ad-list-price">{ad.price.toLocaleString()} с.</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
