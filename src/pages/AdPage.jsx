import { useState, useEffect } from "react";

const AD = {
  id: 3,
  title: "Toyota Camry 2022, белая, 25 000 км",
  price: 185000,
  category: "Транспорт",
  subcategory: "Легковые авто",
  city: "Душанбе",
  district: "Район Сино",
  date: "29 мая 2025",
  views: 312,
  description: `Продаю Toyota Camry 2022 года в отличном состоянии. Один хозяин, не бита, не крашена. Полная комплектация: кожаный салон, подогрев сидений, камера заднего вида, парктроники, круиз-контроль.

Двигатель 2.5L, АКПП, передний привод. Пробег 25 000 км — только по городу. Регулярное ТО у официального дилера, все чеки есть.

Состояние: идеальное, без замечаний. Торг уместен при осмотре.`,
  specs: [
    ["Год выпуска", "2022"],
    ["Пробег", "25 000 км"],
    ["Двигатель", "2.5L, 181 л.с."],
    ["Коробка", "Автомат"],
    ["Привод", "Передний"],
    ["Цвет", "Белый перламутр"],
    ["Состояние", "Отличное"],
    ["Таможня", "Растаможена"],
  ],
  seller: {
    name: "Фируз Рахимов",
    phone: "+992 93 234-56-78",
    joined: "Февраль 2025",
    ads: 5,
    verified: true,
    avatar: "Ф",
  },
  photos: ["🚗", "🚙", "🛞", "💺", "🔧", "📋"],
  similar: [
    { id: 4, title: "Toyota Camry 2021, серебро", price: 165000, city: "Душанбе", emoji: "🚗", views: 198 },
    { id: 5, title: "Toyota Camry 2020, чёрная", price: 145000, city: "Худжанд", emoji: "🚗", views: 87 },
    { id: 6, title: "Hyundai Sonata 2022", price: 155000, city: "Душанбе", emoji: "🚙", views: 134 },
    { id: 7, title: "Kia K5 2023, белая", price: 175000, city: "Душанбе", emoji: "🚗", views: 221 },
  ],
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923; --card:#1C2B3A; --card2:#162130;
  --emerald:#00C896; --emerald2:#00A87D; --emerald-bg:rgba(0,200,150,0.08);
  --gold:#FFD166; --red:#FF4D6D; --blue:#4E9CFF;
  --text:#EDF2F7; --muted:#5A7A94; --border:rgba(255,255,255,0.08);
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

/* HEADER */
.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 24px;position:sticky;top:0;z-index:100;}
.header-inner{max-width:1200px;margin:0 auto;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);cursor:pointer;}
.logo span{color:var(--text);}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted);flex-wrap:wrap;}
.breadcrumb span{cursor:pointer;transition:color 0.15s;}
.breadcrumb span:hover{color:var(--emerald);}
.breadcrumb-sep{color:var(--border);}
.header-btns{display:flex;gap:8px;}
.btn{padding:9px 18px;border-radius:10px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.btn-ghost{background:transparent;color:var(--text);border:1.5px solid var(--border);}
.btn-ghost:hover{border-color:var(--emerald);color:var(--emerald);}
.btn-primary{background:var(--emerald);color:#0F1923;}
.btn-primary:hover{background:var(--emerald2);transform:translateY(-1px);}
.btn-outline{background:var(--emerald-bg);color:var(--emerald);border:1.5px solid rgba(0,200,150,0.3);}
.btn-outline:hover{background:rgba(0,200,150,0.15);}
.btn-red{background:rgba(255,77,109,0.1);color:var(--red);border:1.5px solid rgba(255,77,109,0.25);}
.btn-red:hover{background:rgba(255,77,109,0.18);}

/* LAYOUT */
.page{max-width:1200px;margin:0 auto;padding:24px;}
.grid{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;}

/* GALLERY */
.gallery{background:var(--card);border:1px solid var(--border);border-radius:18px;overflow:hidden;margin-bottom:16px;}
.main-photo{height:420px;display:flex;align-items:center;justify-content:center;background:var(--card2);font-size:120px;position:relative;cursor:zoom-in;}
.photo-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(15,25,35,0.7);border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;color:var(--text);font-size:18px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;}
.photo-nav:hover{background:rgba(0,200,150,0.3);}
.photo-nav.left{left:14px;}
.photo-nav.right{right:14px;}
.photo-counter{position:absolute;bottom:14px;right:14px;background:rgba(0,0,0,0.6);padding:4px 10px;border-radius:20px;font-size:12px;font-weight:600;}
.thumbs{display:flex;gap:8px;padding:12px;overflow-x:auto;}
.thumb{width:70px;height:55px;flex-shrink:0;border-radius:9px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;border:2px solid transparent;transition:all 0.15s;}
.thumb.active{border-color:var(--emerald);}
.thumb:hover{border-color:rgba(0,200,150,0.4);}

/* AD BODY */
.ad-card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:22px;margin-bottom:16px;}
.ad-meta-top{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;}
.ad-cat{font-size:12px;color:var(--emerald);font-weight:600;background:var(--emerald-bg);padding:3px 10px;border-radius:20px;}
.ad-date{font-size:12px;color:var(--muted);}
.ad-views{font-size:12px;color:var(--muted);}
.ad-title{font-family:'Unbounded',sans-serif;font-size:22px;font-weight:700;line-height:1.3;margin-bottom:12px;}
.ad-price-row{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.ad-price{font-family:'Unbounded',sans-serif;font-size:30px;font-weight:700;color:var(--emerald);}
.ad-price-usd{font-size:16px;color:var(--muted);font-weight:500;}
.ad-location{display:flex;align-items:center;gap:6px;font-size:14px;color:var(--muted);margin-bottom:18px;}
.ad-actions{display:flex;gap:10px;flex-wrap:wrap;}

/* DESCRIPTION */
.desc-card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:22px;margin-bottom:16px;}
.section-title{font-size:16px;font-weight:700;margin-bottom:14px;}
.desc-text{font-size:14px;line-height:1.8;color:rgba(237,242,247,0.85);white-space:pre-line;}
.show-more{color:var(--emerald);font-size:13px;font-weight:600;background:none;border:none;cursor:pointer;margin-top:10px;padding:0;}

/* SPECS */
.specs-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;}
.spec-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid var(--border);}
.spec-row:last-child{border-bottom:none;}
.spec-key{font-size:13px;color:var(--muted);}
.spec-val{font-size:13px;font-weight:600;}

/* SIDEBAR */
.sticky-sidebar{position:sticky;top:84px;}

/* SELLER CARD */
.seller-card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;margin-bottom:14px;}
.seller-top{display:flex;align-items:center;gap:14px;margin-bottom:16px;}
.seller-avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:22px;font-weight:700;color:#0F1923;flex-shrink:0;}
.seller-name{font-size:16px;font-weight:700;}
.seller-verified{display:inline-flex;align-items:center;gap:4px;font-size:11px;color:var(--emerald);font-weight:600;margin-top:3px;}
.seller-joined{font-size:12px;color:var(--muted);margin-top:2px;}
.seller-stats{display:flex;gap:0;border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:16px;}
.seller-stat{flex:1;text-align:center;padding:10px 8px;}
.seller-stat:not(:last-child){border-right:1px solid var(--border);}
.seller-stat-val{font-family:'Unbounded',sans-serif;font-size:17px;font-weight:700;color:var(--emerald);}
.seller-stat-label{font-size:11px;color:var(--muted);margin-top:2px;}
.phone-btn{width:100%;padding:13px;border-radius:12px;border:none;font-family:'Golos Text',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.2s;margin-bottom:10px;display:flex;align-items:center;justify-content:center;gap:8px;}
.phone-btn.show{background:var(--emerald);color:#0F1923;}
.phone-btn.show:hover{background:var(--emerald2);}
.phone-btn.chat{background:var(--card2);color:var(--text);border:1.5px solid var(--border);}
.phone-btn.chat:hover{border-color:var(--emerald);color:var(--emerald);}
.safety-tip{background:rgba(255,209,102,0.08);border:1px solid rgba(255,209,102,0.2);border-radius:12px;padding:12px 14px;font-size:12px;color:rgba(255,209,102,0.9);line-height:1.6;}

/* SIMILAR */
.similar-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin-top:16px;}
.similar-card{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden;cursor:pointer;transition:all 0.2s;}
.similar-card:hover{border-color:var(--emerald);transform:translateY(-3px);}
.similar-img{height:130px;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:50px;}
.similar-body{padding:12px;}
.similar-price{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;color:var(--emerald);}
.similar-title{font-size:13px;font-weight:500;margin-top:4px;line-height:1.4;}
.similar-city{font-size:11px;color:var(--muted);margin-top:4px;}

/* FAV BTN */
.fav-btn{width:42px;height:42px;border-radius:10px;border:1.5px solid var(--border);background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:all 0.2s;flex-shrink:0;}
.fav-btn:hover{border-color:var(--red);}
.fav-btn.active{border-color:var(--red);background:rgba(255,77,109,0.1);}

/* SHARE */
.share-row{display:flex;gap:8px;margin-top:12px;}
.share-btn{flex:1;padding:9px;border-radius:9px;border:1px solid var(--border);background:var(--card2);color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;gap:5px;}
.share-btn:hover{border-color:var(--emerald);color:var(--emerald);}

/* TOAST */
.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:12px 24px;border-radius:12px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 30px rgba(0,200,150,0.35);animation:tin 0.3s ease;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(12px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

@media(max-width:860px){
  .grid{grid-template-columns:1fr;}
  .sticky-sidebar{position:static;}
  .ad-title{font-size:18px;}
  .ad-price{font-size:24px;}
  .specs-grid{grid-template-columns:1fr;}
}
`;

export default function AdPage() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [fav, setFav] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const prevPhoto = () => setActivePhoto(p => (p - 1 + AD.photos.length) % AD.photos.length);
  const nextPhoto = () => setActivePhoto(p => (p + 1) % AD.photos.length);

  const shortDesc = AD.description.slice(0, 220) + "...";

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">bozor<span>.tj</span></div>
          <div className="breadcrumb">
            <span>Главная</span><span className="breadcrumb-sep">›</span>
            <span>{AD.category}</span><span className="breadcrumb-sep">›</span>
            <span>{AD.subcategory}</span><span className="breadcrumb-sep">›</span>
            <span style={{ color: "var(--text)" }}>{AD.title.slice(0, 30)}...</span>
          </div>
          <div className="header-btns">
            <button className="btn btn-ghost">Войти</button>
            <button className="btn btn-primary">+ Подать объявление</button>
          </div>
        </div>
      </header>

      <div className="page">
        <div className="grid">
          {/* LEFT COLUMN */}
          <div>
            {/* GALLERY */}
            <div className="gallery">
              <div className="main-photo">
                <span>{AD.photos[activePhoto]}</span>
                <button className="photo-nav left" onClick={prevPhoto}>‹</button>
                <button className="photo-nav right" onClick={nextPhoto}>›</button>
                <div className="photo-counter">{activePhoto + 1} / {AD.photos.length}</div>
              </div>
              <div className="thumbs">
                {AD.photos.map((p, i) => (
                  <div key={i} className={`thumb ${activePhoto === i ? "active" : ""}`} onClick={() => setActivePhoto(i)}>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* AD INFO */}
            <div className="ad-card">
              <div className="ad-meta-top">
                <span className="ad-cat">{AD.category} · {AD.subcategory}</span>
                <span className="ad-date">📅 {AD.date}</span>
                <span className="ad-views">👁 {AD.views} просмотров</span>
              </div>
              <div className="ad-title">{AD.title}</div>
              <div className="ad-price-row">
                <div className="ad-price">{AD.price.toLocaleString()} с.</div>
                <div className="ad-price-usd">≈ $17 300</div>
              </div>
              <div className="ad-location">
                <span>📍</span>
                <span>{AD.city}, {AD.district}</span>
              </div>
              <div className="ad-actions">
                <button
                  className={`fav-btn ${fav ? "active" : ""}`}
                  onClick={() => { setFav(!fav); showToast(fav ? "Убрано из избранного" : "❤️ Добавлено в избранное"); }}
                >
                  {fav ? "❤️" : "🤍"}
                </button>
                <button className="btn btn-outline" onClick={() => showToast("Жалоба отправлена")}>⚠️ Пожаловаться</button>
              </div>
              <div className="share-row">
                {["📱 Telegram", "💬 WhatsApp", "🔗 Копировать ссылку"].map(s => (
                  <button key={s} className="share-btn" onClick={() => showToast("Скопировано!")}>{s}</button>
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="desc-card">
              <div className="section-title">📝 Описание</div>
              <div className="desc-text">{showFull ? AD.description : shortDesc}</div>
              <button className="show-more" onClick={() => setShowFull(!showFull)}>
                {showFull ? "Свернуть ↑" : "Читать полностью ↓"}
              </button>
            </div>

            {/* SPECS */}
            <div className="desc-card">
              <div className="section-title">📊 Характеристики</div>
              <div className="specs-grid">
                {AD.specs.map(([k, v]) => (
                  <div key={k} className="spec-row">
                    <span className="spec-key">{k}</span>
                    <span className="spec-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIMILAR */}
            <div>
              <div className="section-title">🔁 Похожие объявления</div>
              <div className="similar-grid">
                {AD.similar.map(s => (
                  <div key={s.id} className="similar-card" onClick={() => showToast("Открываем объявление...")}>
                    <div className="similar-img">{s.emoji}</div>
                    <div className="similar-body">
                      <div className="similar-price">{s.price.toLocaleString()} с.</div>
                      <div className="similar-title">{s.title}</div>
                      <div className="similar-city">📍 {s.city} · 👁 {s.views}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sticky-sidebar">
            <div className="seller-card">
              <div className="seller-top">
                <div className="seller-avatar">{AD.seller.avatar}</div>
                <div>
                  <div className="seller-name">{AD.seller.name}</div>
                  {AD.seller.verified && <div className="seller-verified">✓ Верифицирован</div>}
                  <div className="seller-joined">На сайте с {AD.seller.joined}</div>
                </div>
              </div>
              <div className="seller-stats">
                <div className="seller-stat">
                  <div className="seller-stat-val">{AD.seller.ads}</div>
                  <div className="seller-stat-label">Объявлений</div>
                </div>
                <div className="seller-stat">
                  <div className="seller-stat-val">4.8</div>
                  <div className="seller-stat-label">Рейтинг</div>
                </div>
                <div className="seller-stat">
                  <div className="seller-stat-val">98%</div>
                  <div className="seller-stat-label">Отзывы</div>
                </div>
              </div>

              <button
                className="phone-btn show"
                onClick={() => { setShowPhone(true); showToast("Будьте осторожны при сделке!"); }}
              >
                📞 {showPhone ? AD.seller.phone : "Показать телефон"}
              </button>
              <button className="phone-btn chat" onClick={() => showToast("Чат — скоро!")}>
                💬 Написать продавцу
              </button>

              <div className="safety-tip">
                ⚠️ Никогда не переводите деньги вперёд. Проверяйте товар при встрече. Bozor.tj не несёт ответственности за сделки.
              </div>
            </div>

            {/* ID карточка */}
            <div className="seller-card" style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Номер объявления</div>
              <div style={{ fontFamily: "'Unbounded'", fontSize: 14, fontWeight: 700 }}>#00{AD.id}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>Опубликовано: {AD.date}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Просмотров: {AD.views}</div>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
