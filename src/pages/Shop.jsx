import { useState, useEffect } from "react";

const SHOP = {
  id: 1,
  name: "AutoLux Tajikistan",
  category: "Автосалон",
  description: "Официальный дилер Toyota, Hyundai и Kia в Таджикистане. Продажа новых и подержанных автомобилей. Гарантия, кредит, трейд-ин. Более 5 лет на рынке.",
  avatar: "🚗",
  cover: "linear-gradient(135deg, #0D2318 0%, #162130 50%, #0a1a10 100%)",
  city: "Душанбе",
  address: "ул. Рудаки 45, ТЦ АвтоПлаза, 1 этаж",
  phone: "+992 44 123-45-67",
  phone2: "+992 93 987-65-43",
  whatsapp: true,
  telegram: true,
  website: "autolux.tj",
  workHours: "Пн–Сб: 9:00–19:00, Вс: 10:00–16:00",
  joined: "Март 2023",
  verified: true,
  rating: 4.9,
  reviews: 87,
  totalAds: 34,
  totalSales: 210,
  subscribers: 1240,
  badges: ["✓ Официальный дилер", "🏆 Топ продавец", "🎉 Bozor.tj — Бесплатно"],
};

const SHOP_ADS = [
  { id:1, title:"Toyota Camry 2023, белая", price:195000, emoji:"🚗", views:534, condition:"Новый", year:2023, isPrem:true },
  { id:2, title:"Hyundai Tucson 2022, серый", price:162000, emoji:"🚙", views:312, condition:"Новый", year:2022, isPrem:true },
  { id:3, title:"Kia K5 2023, чёрная", price:178000, emoji:"🚗", views:421, condition:"Новый", year:2023, isPrem:false },
  { id:4, title:"Toyota RAV4 2021, синий", price:220000, emoji:"🚙", views:289, condition:"Б/У", year:2021, isPrem:false },
  { id:5, title:"Hyundai Elantra 2022, белая", price:138000, emoji:"🚗", views:198, condition:"Новый", year:2022, isPrem:false },
  { id:6, title:"Kia Sportage 2023, красный", price:185000, emoji:"🚙", views:356, condition:"Новый", year:2023, isPrem:true },
  { id:7, title:"Toyota Corolla 2021, серебро", price:128000, emoji:"🚗", views:167, condition:"Б/У", year:2021, isPrem:false },
  { id:8, title:"Hyundai Santa Fe 2022", price:245000, emoji:"🚙", views:445, condition:"Новый", year:2022, isPrem:true },
];

const REVIEWS = [
  { id:1, author:"Алишер К.", avatar:"А", rating:5, text:"Отличный автосалон! Купил Camry, всё оформили быстро. Помогли с кредитом. Рекомендую всем!", date:"20.05.2025", car:"Toyota Camry 2023" },
  { id:2, author:"Фируз Р.", avatar:"Ф", rating:5, text:"Профессиональный подход, честные цены. Уже второй автомобиль беру здесь.", date:"12.04.2025", car:"Kia K5 2023" },
  { id:3, author:"Мадина С.", avatar:"М", rating:4, text:"Хороший сервис, немного долго оформляли документы, но в целом довольна покупкой.", date:"03.03.2025", car:"Hyundai Tucson 2022" },
  { id:4, author:"Бахром Т.", avatar:"Б", rating:5, text:"Взял RAV4, всё как описано. Менеджер Санжар очень помог с выбором. Спасибо!", date:"18.02.2025", car:"Toyota RAV4 2021" },
];

const SIMILAR_SHOPS = [
  { id:2, name:"ТехноМаркет TJ", category:"Электроника", avatar:"📱", rating:4.7, ads:89, city:"Душанбе" },
  { id:3, name:"Квартиры Душанбе", category:"Недвижимость", avatar:"🏠", rating:4.8, ads:45, city:"Душанбе" },
  { id:4, name:"MotoShop TJ", category:"Мотоциклы", avatar:"🏍️", rating:4.6, ads:28, city:"Худжанд" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --gold:#FFD166;--red:#FF4D6D;--blue:#4E9CFF;
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

/* HEADER */
.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;position:sticky;top:0;z-index:100;}
.header-inner{max-width:1200px;margin:0 auto;height:62px;display:flex;align-items:center;justify-content:space-between;gap:14px;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);cursor:pointer;}
.logo span{color:var(--text);}
.btn{padding:9px 18px;border-radius:10px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:7px;}
.btn-primary{background:var(--emerald);color:#0F1923;box-shadow:0 4px 16px rgba(0,200,150,0.25);}
.btn-primary:hover{background:var(--emerald2);transform:translateY(-1px);}
.btn-ghost{background:transparent;color:var(--text);border:1.5px solid var(--border);}
.btn-ghost:hover{border-color:var(--emerald);color:var(--emerald);}
.btn-sm{padding:7px 14px;font-size:13px;}
.btn-outline{background:var(--ebg);color:var(--emerald);border:1.5px solid rgba(0,200,150,0.3);}
.btn-outline:hover{background:rgba(0,200,150,0.15);}

/* COVER */
.shop-cover{height:220px;background:${SHOP.cover};position:relative;overflow:hidden;}
.shop-cover::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(15,25,35,0.95));}
.cover-pattern{position:absolute;inset:0;opacity:0.05;background-image:radial-gradient(circle,#00C896 1px,transparent 1px);background-size:30px 30px;}

/* SHOP HERO */
.shop-hero{max-width:1200px;margin:-60px auto 0;padding:0 20px;position:relative;z-index:2;}
.shop-hero-inner{display:flex;align-items:flex-end;gap:20px;flex-wrap:wrap;}
.shop-logo{width:100px;height:100px;border-radius:20px;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-size:44px;border:3px solid var(--bg);flex-shrink:0;box-shadow:0 8px 24px rgba(0,0,0,0.4);}
.shop-info{flex:1;padding-bottom:4px;}
.shop-name{font-family:'Unbounded',sans-serif;font-size:24px;font-weight:900;line-height:1.2;margin-bottom:6px;}
.shop-cat{font-size:13px;color:var(--emerald);font-weight:600;}
.shop-badges{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px;}
.shop-badge{font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:var(--ebg);border:1px solid rgba(0,200,150,0.2);color:var(--emerald);}
.shop-actions{display:flex;gap:8px;padding-bottom:4px;flex-wrap:wrap;}

/* SHOP STATS */
.shop-stats{max-width:1200px;margin:0 auto;padding:20px 20px 0;}
.stats-row{display:flex;gap:0;background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;}
.stat-item{flex:1;text-align:center;padding:16px 12px;border-right:1px solid var(--border);}
.stat-item:last-child{border-right:none;}
.stat-val{font-family:'Unbounded',sans-serif;font-size:22px;font-weight:700;color:var(--emerald);}
.stat-label{font-size:12px;color:var(--muted);margin-top:3px;}
.rating-stars{color:var(--gold);font-size:13px;}

/* PAGE LAYOUT */
.page{max-width:1200px;margin:0 auto;padding:20px;}
.layout{display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start;}

/* TABS */
.page-tabs{display:flex;gap:2px;margin-bottom:20px;border-bottom:1px solid var(--border);}
.ptab{padding:12px 20px;border:none;background:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:14px;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:all 0.18s;}
.ptab:hover{color:var(--text);}
.ptab.active{color:var(--emerald);border-bottom-color:var(--emerald);}

/* ADS */
.ads-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;}
.ac{background:var(--card);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;cursor:pointer;transition:all 0.2s;}
.ac:hover{border-color:var(--emerald);transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,0.3);}
.ac-img{height:150px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:52px;position:relative;}
.bp-prem{position:absolute;top:8px;left:8px;background:var(--gold);color:#000;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;}
.bp-new{position:absolute;top:8px;right:8px;background:var(--emerald);color:#0F1923;font-size:10px;font-weight:700;padding:2px 7px;border-radius:5px;}
.ac-body{padding:12px;}
.ac-price{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;color:var(--emerald);}
.ac-title{font-size:13px;font-weight:600;margin-top:4px;line-height:1.4;}
.ac-tags{display:flex;gap:5px;margin-top:7px;flex-wrap:wrap;}
.ac-tag{font-size:10px;padding:2px 7px;border-radius:8px;background:var(--card2);color:var(--muted);border:1px solid var(--border);}
.ac-foot{display:flex;justify-content:space-between;margin-top:8px;}
.ac-views{font-size:11px;color:var(--muted);}

/* ABOUT */
.about-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:16px;}
.about-title{font-size:15px;font-weight:700;margin-bottom:12px;}
.about-text{font-size:14px;color:rgba(237,242,247,0.85);line-height:1.8;}
.info-rows{margin-top:16px;display:flex;flex-direction:column;gap:0;}
.info-row{display:flex;align-items:flex-start;gap:12px;padding:11px 0;border-bottom:1px solid var(--border);}
.info-row:last-child{border-bottom:none;}
.info-icon{font-size:16px;width:20px;flex-shrink:0;margin-top:1px;}
.info-label{font-size:12px;color:var(--muted);margin-bottom:2px;}
.info-val{font-size:14px;font-weight:500;}

/* REVIEWS */
.reviews-summary{display:flex;gap:20px;align-items:center;padding:20px;background:var(--card2);border-radius:14px;margin-bottom:18px;}
.big-rating{font-family:'Unbounded',sans-serif;font-size:52px;font-weight:900;color:var(--emerald);line-height:1;}
.rating-breakdown{flex:1;}
.rb-row{display:flex;align-items:center;gap:8px;margin-bottom:5px;}
.rb-label{font-size:12px;color:var(--muted);width:20px;}
.rb-bar{flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden;}
.rb-fill{height:100%;border-radius:3px;background:var(--gold);}
.rb-count{font-size:12px;color:var(--muted);width:20px;text-align:right;}

.review-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;margin-bottom:12px;}
.rev-top{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
.rev-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#0F1923;flex-shrink:0;}
.rev-name{font-size:14px;font-weight:700;}
.rev-car{font-size:11px;color:var(--emerald);margin-top:2px;}
.rev-date{font-size:11px;color:var(--muted);margin-left:auto;}
.rev-stars{color:var(--gold);font-size:15px;margin-bottom:8px;}
.rev-text{font-size:13px;color:rgba(237,242,247,0.85);line-height:1.6;}

/* SIDEBAR */
.contact-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:14px;position:sticky;top:82px;}
.contact-title{font-size:14px;font-weight:700;margin-bottom:14px;}
.contact-btn{width:100%;padding:13px;border-radius:12px;border:none;font-family:'Golos Text',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.2s;margin-bottom:9px;display:flex;align-items:center;justify-content:center;gap:8px;}
.contact-btn.call{background:var(--emerald);color:#0F1923;}
.contact-btn.call:hover{background:var(--emerald2);}
.contact-btn.wa{background:#25D366;color:#fff;}
.contact-btn.wa:hover{background:#1fba59;}
.contact-btn.tg{background:#229ED9;color:#fff;}
.contact-btn.tg:hover{background:#1a8abf;}
.contact-btn.msg{background:var(--card2);color:var(--text);border:1.5px solid var(--border);}
.contact-btn.msg:hover{border-color:var(--emerald);color:var(--emerald);}
.work-hours{background:var(--ebg);border:1px solid rgba(0,200,150,0.15);border-radius:10px;padding:12px;font-size:13px;margin-top:14px;display:flex;align-items:flex-start;gap:8px;}

.similar-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all 0.18s;margin-bottom:10px;}
.similar-card:hover{border-color:var(--emerald);}
.similar-logo{width:46px;height:46px;border-radius:12px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
.similar-name{font-size:13px;font-weight:700;}
.similar-cat{font-size:11px;color:var(--muted);margin-top:2px;}
.similar-rating{font-size:11px;color:var(--gold);}

/* SUBSCRIBE */
.sub-btn{width:100%;padding:12px;border-radius:12px;border:1.5px solid var(--border);background:var(--card2);color:var(--text);font-family:'Golos Text',sans-serif;font-weight:700;font-size:14px;cursor:pointer;transition:all 0.2s;margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:8px;}
.sub-btn.active{background:var(--ebg);border-color:var(--emerald);color:var(--emerald);}
.sub-btn:hover{border-color:var(--emerald);}

/* TOAST */
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:11px 22px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);animation:tin 0.3s ease;white-space:nowrap;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

/* EMPTY */
.empty{text-align:center;padding:50px 20px;color:var(--muted);}
.empty-icon{font-size:48px;margin-bottom:12px;}

@media(max-width:860px){
  .layout{grid-template-columns:1fr;}
  .shop-hero-inner{flex-direction:column;align-items:flex-start;}
  .stats-row{flex-wrap:wrap;}
  .stat-item{min-width:50%;}
}
`;

export default function ShopPage() {
  const [tab, setTab] = useState("ads");
  const [subscribed, setSubscribed] = useState(false);
  const [toast, setToast] = useState(null);
  const [adsFilter, setAdsFilter] = useState("all");

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filteredAds = adsFilter === "all" ? SHOP_ADS
    : adsFilter === "new" ? SHOP_ADS.filter(a => a.condition === "Новый")
    : SHOP_ADS.filter(a => a.condition === "Б/У");

  const ratingBreakdown = [
    { stars: 5, count: 71, pct: 82 },
    { stars: 4, count: 10, pct: 11 },
    { stars: 3, count: 4, pct: 5 },
    { stars: 2, count: 1, pct: 1 },
    { stars: 1, count: 1, pct: 1 },
  ];

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">bozor<span>.tj</span></div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => showToast("Назад...")}>← Назад</button>
            <button className="btn btn-primary btn-sm" onClick={() => showToast("Открываем форму...")}>+ Подать объявление</button>
          </div>
        </div>
      </header>

      {/* COVER */}
      <div className="shop-cover">
        <div className="cover-pattern" />
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:0.07, fontSize:120 }}>
          {SHOP.avatar}
        </div>
      </div>

      {/* SHOP HERO */}
      <div className="shop-hero">
        <div className="shop-hero-inner">
          <div className="shop-logo">{SHOP.avatar}</div>
          <div className="shop-info">
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <div className="shop-name">{SHOP.name}</div>
              {SHOP.verified && (
                <div style={{ background:"var(--ebg)", border:"1px solid rgba(0,200,150,0.3)", borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:700, color:"var(--emerald)", flexShrink:0 }}>
                  ✓ Верифицирован
                </div>
              )}
            </div>
            <div className="shop-cat">📂 {SHOP.category} • 📍 {SHOP.city}</div>
            <div className="shop-badges">
              {SHOP.badges.map(b => <span key={b} className="shop-badge">{b}</span>)}
            </div>
          </div>
          <div className="shop-actions">
            <button
              className={`sub-btn ${subscribed ? "active" : ""}`}
              style={{ width:"auto", padding:"9px 18px", margin:0 }}
              onClick={() => { setSubscribed(!subscribed); showToast(subscribed ? "Отписались" : "✅ Подписались на магазин!"); }}
            >
              {subscribed ? "✓ Подписан" : "🔔 Подписаться"}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => showToast("Жалоба отправлена")}>⚠️ Жалоба</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="shop-stats">
        <div className="stats-row">
          {[
            { val: SHOP.totalAds, label: "Объявлений" },
            { val: SHOP.totalSales, label: "Продаж" },
            { val: SHOP.subscribers.toLocaleString(), label: "Подписчиков" },
            { val: <>{SHOP.rating} <span className="rating-stars">★</span></>, label: `${SHOP.reviews} отзывов` },
            { val: SHOP.joined, label: "На сайте с" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="page">
        <div className="layout">
          <div>
            {/* TABS */}
            <div className="page-tabs">
              {[["ads","📋 Объявления"],["about","ℹ️ О магазине"],["reviews","⭐ Отзывы"]].map(([id,label]) => (
                <button key={id} className={`ptab ${tab===id?"active":""}`} onClick={() => setTab(id)}>{label}</button>
              ))}
            </div>

            {/* ADS TAB */}
            {tab === "ads" && (
              <>
                <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                  {[["all","Все"],["new","Новые"],["used","Б/У"]].map(([id,label]) => (
                    <button key={id} style={{
                      padding:"7px 16px", borderRadius:20, border:"1.5px solid",
                      borderColor: adsFilter===id ? "var(--emerald)" : "var(--border)",
                      background: adsFilter===id ? "var(--ebg)" : "none",
                      color: adsFilter===id ? "var(--emerald)" : "var(--muted)",
                      fontFamily:"'Golos Text',sans-serif", fontWeight:600, fontSize:13, cursor:"pointer"
                    }} onClick={() => setAdsFilter(id)}>{label}</button>
                  ))}
                  <span style={{ marginLeft:"auto", fontSize:13, color:"var(--muted)", alignSelf:"center" }}>
                    {filteredAds.length} объявлений
                  </span>
                </div>
                <div className="ads-grid">
                  {filteredAds.map(ad => (
                    <div key={ad.id} className="ac" onClick={() => showToast("Открываем объявление...")}>
                      <div className="ac-img">
                        {ad.isPrem && <span className="bp-prem">⭐ Топ</span>}
                        {ad.condition === "Новый" && <span className="bp-new">Новый</span>}
                        <span>{ad.emoji}</span>
                      </div>
                      <div className="ac-body">
                        <div className="ac-price">{ad.price.toLocaleString()} с.</div>
                        <div className="ac-title">{ad.title}</div>
                        <div className="ac-tags">
                          <span className="ac-tag">{ad.year} г.</span>
                          <span className="ac-tag">{ad.condition}</span>
                        </div>
                        <div className="ac-foot">
                          <span className="ac-views">👁 {ad.views}</span>
                          <span style={{ fontSize:11, color:"var(--emerald)", fontWeight:600 }}>Смотреть →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ABOUT TAB */}
            {tab === "about" && (
              <>
                <div className="about-card">
                  <div className="about-title">О магазине</div>
                  <div className="about-text">{SHOP.description}</div>
                  <div className="info-rows">
                    {[
                      ["📍", "Адрес", SHOP.address],
                      ["📞", "Телефон", SHOP.phone],
                      ["📱", "Второй телефон", SHOP.phone2],
                      ["🌐", "Сайт", SHOP.website],
                      ["🕐", "Режим работы", SHOP.workHours],
                      ["📅", "На сайте с", SHOP.joined],
                    ].map(([icon, label, val]) => (
                      <div key={label} className="info-row">
                        <span className="info-icon">{icon}</span>
                        <div>
                          <div className="info-label">{label}</div>
                          <div className="info-val">{val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="about-card">
                  <div className="about-title">🗺️ На карте</div>
                  <div style={{ background:"var(--card2)", borderRadius:12, height:200, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)", fontSize:14, border:"1px solid var(--border)" }}>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:40, marginBottom:10 }}>📍</div>
                      <div>{SHOP.address}</div>
                      <button className="btn btn-outline btn-sm" style={{ marginTop:12 }} onClick={() => showToast("Открываем карту...")}>
                        Открыть карту
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* REVIEWS TAB */}
            {tab === "reviews" && (
              <>
                <div className="reviews-summary">
                  <div>
                    <div className="big-rating">{SHOP.rating}</div>
                    <div style={{ color:"var(--gold)", fontSize:20, marginTop:4 }}>{"★".repeat(5)}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginTop:4 }}>{SHOP.reviews} отзывов</div>
                  </div>
                  <div className="rating-breakdown">
                    {ratingBreakdown.map(r => (
                      <div key={r.stars} className="rb-row">
                        <span className="rb-label">{r.stars}★</span>
                        <div className="rb-bar"><div className="rb-fill" style={{ width:`${r.pct}%` }} /></div>
                        <span className="rb-count">{r.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary" style={{ marginBottom:16 }} onClick={() => showToast("Форма отзыва — скоро!")}>
                  ✍️ Написать отзыв
                </button>

                {REVIEWS.map(r => (
                  <div key={r.id} className="review-card">
                    <div className="rev-top">
                      <div className="rev-avatar">{r.avatar}</div>
                      <div style={{ flex:1 }}>
                        <div className="rev-name">{r.author}</div>
                        <div className="rev-car">🚗 {r.car}</div>
                      </div>
                      <div className="rev-date">{r.date}</div>
                    </div>
                    <div className="rev-stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                    <div className="rev-text">{r.text}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div>
            <div className="contact-card">
              <div className="contact-title">📞 Связаться с магазином</div>
              <button className="contact-btn call" onClick={() => showToast(`Звоним: ${SHOP.phone}`)}>
                📞 Позвонить
              </button>
              {SHOP.whatsapp && (
                <button className="contact-btn wa" onClick={() => showToast("Открываем WhatsApp...")}>
                  💬 WhatsApp
                </button>
              )}
              {SHOP.telegram && (
                <button className="contact-btn tg" onClick={() => showToast("Открываем Telegram...")}>
                  ✈️ Telegram
                </button>
              )}
              <button className="contact-btn msg" onClick={() => showToast("Открываем чат...")}>
                💌 Написать сообщение
              </button>
              <div className="work-hours">
                <span>🕐</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:13, marginBottom:2 }}>Режим работы</div>
                  <div style={{ color:"var(--muted)", fontSize:12, lineHeight:1.6 }}>{SHOP.workHours}</div>
                </div>
              </div>
            </div>

            {/* ПОХОЖИЕ МАГАЗИНЫ */}
            <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:18 }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>🏪 Другие магазины</div>
              {SIMILAR_SHOPS.map(s => (
                <div key={s.id} className="similar-card" onClick={() => showToast("Открываем магазин...")}>
                  <div className="similar-logo">{s.avatar}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="similar-name">{s.name}</div>
                    <div className="similar-cat">{s.category} · {s.city}</div>
                    <div className="similar-rating">★ {s.rating} · {s.ads} объявлений</div>
                  </div>
                </div>
              ))}
              <button className="btn btn-outline" style={{ width:"100%", justifyContent:"center", marginTop:4 }} onClick={() => showToast("Все магазины...")}>
                Все магазины →
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
