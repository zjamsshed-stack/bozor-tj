import { useState, useEffect } from "react";
import { useRouter } from "../context/RouterContext";
import { getHistory, getFollowing, toggleFollow, clearHistory } from "../utils/storage";

const USER = {
  name: "Фируз Рахимов",
  phone: "+992 93 234-56-78",
  email: "firuz@gmail.com",
  telegram: "@firuz_rahimov",
  city: "Душанбе",
  avatar: "Ф",
  joined: "Февраль 2025",
  verified: true,
  phoneVerified: true,
  rating: 4.8,
  reviews: 12,
  balance: 150,
};

const MY_ADS = [
  { id:1, title:"Toyota Camry 2022, белая", price:185000, status:"active", views:312, favs:24, emoji:"🚗", date:"29.05.2025", expires:"28.06.2025" },
  { id:2, title:"iPhone 13 Pro, 256GB", price:4200, status:"active", views:89, favs:7, emoji:"📱", date:"25.05.2025", expires:"24.06.2025" },
  { id:3, title:"Диван угловой серый", price:3200, status:"inactive", views:45, favs:3, emoji:"🛋️", date:"10.05.2025", expires:"09.06.2025" },
  { id:4, title:"Ноутбук Lenovo IdeaPad", price:3800, status:"pending", views:0, favs:0, emoji:"💻", date:"29.05.2025", expires:"28.06.2025" },
];

const FAV_ADS = [
  { id:10, title:"MacBook Pro M3, 512GB", price:14200, city:"Худжанд", emoji:"💻", date:"28.05.2025" },
  { id:11, title:"2-комн. квартира, Сино", price:95000, city:"Душанбе", emoji:"🏠", date:"27.05.2025" },
  { id:12, title:"Kia K5 2023, белая", price:175000, city:"Душанбе", emoji:"🚗", date:"26.05.2025" },
];

const REVIEWS = [
  { id:1, author:"Алишер К.", avatar:"А", rating:5, text:"Отличный продавец! Всё как на фото, быстро ответил.", date:"20.05.2025" },
  { id:2, author:"Мадина С.", avatar:"М", rating:5, text:"Машина в идеальном состоянии. Рекомендую!", date:"15.04.2025" },
  { id:3, author:"Бахром Т.", avatar:"Б", rating:4, text:"Хороший продавец, немного торговался но договорились.", date:"02.03.2025" },
];

const TRANSACTIONS = [
  { id:1, type:"credit", label:"Пополнение баланса", amount:200, date:"28.05.2025" },
  { id:2, type:"debit", label:"Поднятие объявления #1", amount:-25, date:"25.05.2025" },
  { id:3, type:"debit", label:"Премиум размещение #2", amount:-25, date:"20.05.2025" },
];

const CITIES = ["Душанбе","Бохтар","Бустон","Вахдат","Гиссар","Гулистон","Истаравшан","Истиклол","Исфара","Канибадам","Куляб","Левакант","Нурек","Пенджикент","Рогун","Турсунзаде","Хорог","Худжанд"];

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

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;position:sticky;top:0;z-index:100;}
.header-inner{max-width:1200px;margin:0 auto;height:62px;display:flex;align-items:center;justify-content:space-between;gap:14px;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);cursor:pointer;}
.logo span{color:var(--text);}
.btn{padding:8px 16px;border-radius:9px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.btn-primary{background:var(--emerald);color:#0F1923;}
.btn-primary:hover{background:var(--emerald2);}
.btn-ghost{background:transparent;color:var(--text);border:1.5px solid var(--border);}
.btn-ghost:hover{border-color:var(--emerald);color:var(--emerald);}
.btn-danger{background:rgba(255,77,109,0.1);color:var(--red);border:1px solid rgba(255,77,109,0.2);}
.btn-danger:hover{background:rgba(255,77,109,0.2);}
.btn-warn{background:rgba(255,209,102,0.1);color:var(--gold);border:1px solid rgba(255,209,102,0.2);}
.btn-warn:hover{background:rgba(255,209,102,0.2);}
.btn-sm{padding:5px 12px;font-size:12px;}

.page{max-width:1200px;margin:0 auto;padding:24px 20px;}
.layout{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start;}

/* SIDEBAR */
.sidebar{background:var(--card);border:1px solid var(--border);border-radius:18px;overflow:hidden;position:sticky;top:82px;}

.profile-hero{padding:28px 20px;text-align:center;border-bottom:1px solid var(--border);background:linear-gradient(135deg,var(--card2),var(--card));}
.avatar{width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:30px;font-weight:700;color:#0F1923;margin:0 auto 14px;border:3px solid rgba(0,200,150,0.3);}
.profile-name{font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700;margin-bottom:4px;}
.profile-phone{font-size:13px;color:var(--muted);}
.profile-joined{font-size:11px;color:var(--muted);margin-top:4px;}
.profile-tg-link{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:#229ED9;font-weight:600;margin-top:8px;cursor:pointer;}
.phone-verified-mini{font-size:10px;color:var(--emerald);font-weight:600;margin-left:4px;}
.verified-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--emerald);font-weight:600;background:var(--ebg);padding:3px 10px;border-radius:20px;margin-top:8px;}
.rating-row{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:12px;}
.stars{color:var(--gold);font-size:14px;letter-spacing:1px;}
.rating-val{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;}
.rating-count{font-size:12px;color:var(--muted);}

.profile-stats{display:flex;border-bottom:1px solid var(--border);}
.pstat{flex:1;text-align:center;padding:14px 8px;}
.pstat:not(:last-child){border-right:1px solid var(--border);}
.pstat-val{font-family:'Unbounded',sans-serif;font-size:18px;font-weight:700;color:var(--emerald);}
.pstat-label{font-size:11px;color:var(--muted);margin-top:2px;}

.sidebar-nav{padding:10px;}
.snav-item{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:10px;cursor:pointer;transition:all 0.15s;font-size:14px;font-weight:500;color:var(--muted);border:none;background:none;width:100%;text-align:left;position:relative;}
.snav-item:hover{background:var(--card2);color:var(--text);}
.snav-item.active{background:var(--ebg);color:var(--emerald);}
.snav-icon{font-size:17px;width:22px;text-align:center;}
.snav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:8px;}

/* BALANCE */
.balance-card{background:linear-gradient(135deg,#0D2318,#162130);border:1px solid rgba(0,200,150,0.2);border-radius:12px;padding:16px;margin:10px;display:flex;align-items:center;justify-content:space-between;}
.balance-label{font-size:11px;color:var(--muted);margin-bottom:4px;}
.balance-val{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:700;color:var(--emerald);}

/* MAIN CONTENT */
.content-card{background:var(--card);border:1px solid var(--border);border-radius:18px;overflow:hidden;}
.content-head{padding:18px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.content-title{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;}

/* TABS */
.tabs{display:flex;background:var(--card2);border-radius:10px;padding:3px;gap:2px;margin-bottom:18px;}
.tab{flex:1;padding:9px;border-radius:7px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.18s;background:none;color:var(--muted);text-align:center;}
.tab.active{background:var(--emerald);color:#0F1923;}

/* AD ITEM */
.ad-item{display:flex;gap:14px;padding:16px 20px;border-bottom:1px solid var(--border);transition:background 0.15s;align-items:flex-start;}
.ad-item:hover{background:rgba(255,255,255,0.02);}
.ad-item:last-child{border-bottom:none;}
.ad-emoji{width:64px;height:64px;background:var(--card2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;}
.ad-info{flex:1;min-width:0;}
.ad-title-item{font-size:14px;font-weight:700;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ad-price-item{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;color:var(--emerald);margin-bottom:6px;}
.ad-meta-row{display:flex;gap:14px;flex-wrap:wrap;}
.ad-meta-item{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:4px;}
.ad-actions-row{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;}

.badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.badge-active{background:var(--ebg);color:var(--emerald);}
.badge-inactive{background:rgba(90,122,148,0.12);color:var(--muted);}
.badge-pending{background:rgba(255,209,102,0.12);color:var(--gold);}

/* FAV GRID */
.fav-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;padding:16px 20px;}
.fav-card{background:var(--card2);border:1px solid var(--border);border-radius:12px;overflow:hidden;cursor:pointer;transition:all 0.2s;}
.fav-card:hover{border-color:var(--emerald);transform:translateY(-2px);}
.fav-img{height:110px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:42px;}
.fav-body{padding:10px;}
.fav-price{font-family:'Unbounded',sans-serif;font-size:13px;font-weight:700;color:var(--emerald);}
.fav-title{font-size:12px;font-weight:600;margin-top:3px;}
.fav-city{font-size:11px;color:var(--muted);margin-top:3px;}

/* REVIEWS */
.review-item{padding:16px 20px;border-bottom:1px solid var(--border);}
.review-item:last-child{border-bottom:none;}
.review-top{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.rev-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#0F1923;flex-shrink:0;}
.rev-name{font-size:14px;font-weight:700;}
.rev-date{font-size:11px;color:var(--muted);}
.rev-stars{color:var(--gold);font-size:14px;}
.rev-text{font-size:13px;color:rgba(237,242,247,0.85);line-height:1.6;}

/* SETTINGS FORM */
.settings-form{padding:20px;}
.form-group{margin-bottom:18px;}
.form-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.6px;display:block;margin-bottom:7px;}
.form-input{width:100%;padding:11px 14px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;color:var(--text);font-size:14px;outline:none;font-family:'Golos Text',sans-serif;transition:border-color 0.2s;}
.form-input:focus{border-color:var(--emerald);}
.form-input::placeholder{color:var(--muted);}
.form-select{width:100%;padding:11px 14px;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;color:var(--text);font-size:14px;outline:none;font-family:'Golos Text',sans-serif;cursor:pointer;}
.form-select option{background:var(--card);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.avatar-upload{display:flex;align-items:center;gap:16px;margin-bottom:22px;}
.avatar-large{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:32px;font-weight:700;color:#0F1923;}
.upload-info{font-size:13px;color:var(--muted);line-height:1.6;}

/* NOTIFY TOGGLES */
.notify-row{display:flex;align-items:center;justify-content:space-between;padding:13px 0;border-bottom:1px solid var(--border);}
.notify-row:last-child{border-bottom:none;}
.notify-label{font-size:14px;font-weight:500;}
.notify-sub{font-size:12px;color:var(--muted);margin-top:2px;}
.toggle{width:42px;height:22px;border-radius:11px;cursor:pointer;transition:background 0.2s;border:none;position:relative;flex-shrink:0;}
.toggle.on{background:var(--emerald);}
.toggle.off{background:var(--card2);border:1px solid var(--border);}
.toggle::after{content:'';position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:3px;transition:left 0.2s;}
.toggle.on::after{left:23px;}
.toggle.off::after{left:3px;}

/* TRANSACTIONS */
.tx-item{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border);}
.tx-item:last-child{border-bottom:none;}
.tx-icon{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.tx-icon.credit{background:var(--ebg);}
.tx-icon.debit{background:rgba(255,77,109,0.1);}
.tx-label{font-size:14px;font-weight:600;flex:1;}
.tx-date{font-size:12px;color:var(--muted);margin-top:2px;}
.tx-amount{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;}
.tx-amount.credit{color:var(--emerald);}
.tx-amount.debit{color:var(--red);}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.2s;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.modal{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:26px;max-width:420px;width:100%;animation:slideUp 0.25s ease;}
@keyframes slideUp{from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;}}
.modal-title{font-family:'Unbounded',sans-serif;font-size:17px;font-weight:700;margin-bottom:18px;}
.modal-btns{display:flex;gap:10px;margin-top:20px;}
.modal-btns .btn{flex:1;justify-content:center;padding:12px;}

/* EMPTY */
.empty{text-align:center;padding:50px 20px;color:var(--muted);}
.empty-icon{font-size:48px;margin-bottom:12px;}
.empty-title{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px;}
.empty-sub{font-size:13px;margin-bottom:18px;}

/* TOAST */
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:11px 22px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);animation:tin 0.3s ease;white-space:nowrap;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

@media(max-width:860px){
  .layout{grid-template-columns:1fr;}
  .sidebar{position:static;}
  .form-row{grid-template-columns:1fr;}
}
`;

export default function ProfilePage() {
  const { goTo } = useRouter();
  const [section, setSection] = useState("myads");
  const [adsTab, setAdsTab] = useState("active");
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [ads, setAds] = useState(MY_ADS);
  const [favs, setFavs] = useState(FAV_ADS);
  const [history, setHistory] = useState([]);
  const [following, setFollowing] = useState([]);
  const [notifs, setNotifs] = useState({ messages: true, views: true, price: false, news: false });
  const [editForm, setEditForm] = useState({ name: USER.name, phone: USER.phone, email: USER.email, city: USER.city });

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    setHistory(getHistory());
    setFollowing(getFollowing());
  }, [section]);

  const handleUnfollow = (sellerId) => {
    toggleFollow({ id: sellerId });
    setFollowing(getFollowing());
    showToast("Подписка отменена");
  };

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const deactivateAd = id => {
    setAds(a => a.map(x => x.id === id ? { ...x, status: x.status === "active" ? "inactive" : "active" } : x));
    showToast("✅ Статус изменён");
    setModal(null);
  };
  const deleteAd = id => { setAds(a => a.filter(x => x.id !== id)); showToast("🗑️ Объявление удалено"); setModal(null); };
  const removeFav = id => { setFavs(f => f.filter(x => x.id !== id)); showToast("Убрано из избранного"); };

  const filteredAds = adsTab === "all" ? ads : ads.filter(a =>
    adsTab === "active" ? a.status === "active" :
    adsTab === "inactive" ? a.status === "inactive" : a.status === "pending"
  );

  const SNAV = [
    { id:"myads", icon:"📋", label:"Мои объявления", badge: ads.filter(a=>a.status==="pending").length || null },
    { id:"favs", icon:"❤️", label:"Избранное", badge: null },
    { id:"history", icon:"🕐", label:"Просмотренные", badge: null },
    { id:"following", icon:"🔔", label:"Я слежу", badge: null },
    { id:"reviews", icon:"⭐", label:"Отзывы", badge: null },
    { id:"balance", icon:"🎉", label:"Бесплатно!", badge: null },
    { id:"settings", icon:"⚙️", label:"Настройки профиля", badge: null },
    { id:"notifs", icon:"🔔", label:"Уведомления", badge: null },
    { id:"security", icon:"🔒", label:"Безопасность", badge: null },
  ];

  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <div className="logo">bozor<span>.tj</span></div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button className="btn btn-primary" onClick={() => showToast("Открываем форму...")}>+ Подать объявление</button>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--emerald),#00E5AD)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Unbounded",fontSize:14,fontWeight:700,color:"#0F1923",cursor:"pointer" }}>{USER.avatar}</div>
          </div>
        </div>
      </header>

      <div className="page">
        <div className="layout">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="profile-hero">
              <div className="avatar">{USER.avatar}</div>
              <div className="profile-name">{USER.name}</div>
              <div className="profile-phone">
                {USER.phone}
                {USER.phoneVerified && <span className="phone-verified-mini">✓ подтверждён</span>}
              </div>
              {USER.verified && <div className="verified-badge">✓ Верифицирован</div>}
              <div className="profile-joined">📅 На сайте с {USER.joined}</div>
              {USER.telegram && (
                <div className="profile-tg-link" onClick={() => showToast("Telegram: " + USER.telegram)}>
                  ✈️ {USER.telegram}
                </div>
              )}
              <div className="rating-row">
                <div className="stars">{"★".repeat(Math.floor(USER.rating))}{"☆".repeat(5-Math.floor(USER.rating))}</div>
                <div className="rating-val">{USER.rating}</div>
                <div className="rating-count">({USER.reviews} отзывов)</div>
              </div>
            </div>

            <div className="profile-stats">
              {[
                { val: ads.filter(a=>a.status==="active").length, label:"Активных" },
                { val: ads.reduce((s,a)=>s+a.views,0), label:"Просмотров" },
                { val: favs.length, label:"Избранных" },
              ].map(s => (
                <div key={s.label} className="pstat">
                  <div className="pstat-val">{s.val}</div>
                  <div className="pstat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ margin:"10px", background:"linear-gradient(135deg,#0D2318,#162130)", border:"1px solid rgba(0,200,150,0.2)", borderRadius:12, padding:"12px 16px", textAlign:"center" }}>
              <div style={{ fontFamily:"Unbounded", fontSize:15, fontWeight:700, color:"var(--emerald)" }}>🎉 Всё бесплатно!</div>
              <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>Безлимит объявлений · 0 сомони</div>
            </div>

            <nav className="sidebar-nav">
              {SNAV.map(n => (
                <button key={n.id} className={`snav-item ${section === n.id ? "active" : ""}`} onClick={() => setSection(n.id)}>
                  <span className="snav-icon">{n.icon}</span>
                  <span>{n.label}</span>
                  {n.badge > 0 && <span className="snav-badge">{n.badge}</span>}
                </button>
              ))}
              <button className="snav-item" style={{ color:"var(--red)", marginTop:4 }} onClick={() => showToast("Вы вышли из аккаунта")}>
                <span className="snav-icon">🚪</span>
                <span>Выйти</span>
              </button>
            </nav>
          </aside>

          {/* CONTENT */}
          <div>

            {/* МОИ ОБЪЯВЛЕНИЯ */}
            {section === "myads" && (
              <div className="content-card">
                <div className="content-head">
                  <div className="content-title">📋 Мои объявления</div>
                  <button className="btn btn-primary btn-sm" onClick={() => showToast("Открываем форму...")}>+ Новое объявление</button>
                </div>
                <div style={{ padding:"16px 20px 0" }}>
                  <div className="tabs">
                    {[["all","Все"],["active","Активные"],["inactive","Неактивные"],["pending","На модерации"]].map(([id,label]) => (
                      <button key={id} className={`tab ${adsTab===id?"active":""}`} onClick={() => setAdsTab(id)}>
                        {label} {id==="pending" && ads.filter(a=>a.status==="pending").length > 0 && `(${ads.filter(a=>a.status==="pending").length})`}
                      </button>
                    ))}
                  </div>
                </div>
                {filteredAds.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">📭</div>
                    <div className="empty-title">Объявлений нет</div>
                    <div className="empty-sub">Подайте своё первое объявление</div>
                    <button className="btn btn-primary" onClick={() => showToast("Открываем форму...")}>+ Подать объявление</button>
                  </div>
                ) : filteredAds.map(ad => (
                  <div key={ad.id} className="ad-item">
                    <div className="ad-emoji">{ad.emoji}</div>
                    <div className="ad-info">
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                        <div className="ad-title-item">{ad.title}</div>
                        <span className={`badge badge-${ad.status}`} style={{ flexShrink:0 }}>
                          {ad.status==="active"?"✓ Активно":ad.status==="inactive"?"⏸ Неактивно":"⏳ Модерация"}
                        </span>
                      </div>
                      <div className="ad-price-item">{ad.price.toLocaleString()} с.</div>
                      <div className="ad-meta-row">
                        <span className="ad-meta-item">👁 {ad.views} просмотров</span>
                        <span className="ad-meta-item">❤️ {ad.favs} в избранном</span>
                        <span className="ad-meta-item">📅 до {ad.expires}</span>
                      </div>
                      <div className="ad-actions-row">
                        <button className="btn btn-ghost btn-sm" onClick={() => goTo("postad", { editAd: ad })}>✏️ Редактировать</button>
                        <button className="btn btn-warn btn-sm" onClick={() => showToast("⭐ Объявление поднято!")}>⬆️ Поднять бесплатно</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => deactivateAd(ad.id)}>
                          {ad.status==="active" ? "⏸ Снять" : "▶ Активировать"}
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => setModal({ type:"delete", id:ad.id, title:ad.title })}>🗑️</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ИЗБРАННОЕ */}
            {section === "favs" && (
              <div className="content-card">
                <div className="content-head">
                  <div className="content-title">❤️ Избранное</div>
                  <span style={{ fontSize:13, color:"var(--muted)" }}>{favs.length} объявлений</span>
                </div>
                {favs.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">🤍</div>
                    <div className="empty-title">Избранное пусто</div>
                    <div className="empty-sub">Сохраняйте понравившиеся объявления</div>
                    <button className="btn btn-primary" onClick={() => showToast("Открываем каталог...")}>Смотреть объявления</button>
                  </div>
                ) : (
                  <div className="fav-grid">
                    {favs.map(ad => (
                      <div key={ad.id} className="fav-card">
                        <div className="fav-img">{ad.emoji}</div>
                        <div className="fav-body">
                          <div className="fav-price">{ad.price.toLocaleString()} с.</div>
                          <div className="fav-title">{ad.title}</div>
                          <div className="fav-city">📍 {ad.city}</div>
                          <button className="btn btn-danger btn-sm" style={{ marginTop:8, width:"100%", justifyContent:"center" }} onClick={() => removeFav(ad.id)}>
                            🗑️ Убрать
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ПРОСМОТРЕННЫЕ */}
            {section === "history" && (
              <div className="content-card">
                <div className="content-head">
                  <div className="content-title">🕐 Недавно просмотренные</div>
                  {history.length > 0 && (
                    <button className="btn btn-ghost btn-sm" onClick={() => { clearHistory(); setHistory([]); showToast("История очищена"); }}>
                      Очистить
                    </button>
                  )}
                </div>
                {history.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">🕐</div>
                    <div className="empty-title">История пуста</div>
                    <div className="empty-sub">Здесь появятся объявления, которые вы открывали</div>
                  </div>
                ) : (
                  <div className="fav-grid">
                    {history.map(item => (
                      <div key={item.id} className="fav-card" onClick={() => goTo("ad")} style={{ cursor: "pointer" }}>
                        <div className="fav-img">{item.emoji}</div>
                        <div className="fav-body">
                          <div className="fav-price">{item.price?.toLocaleString()} с.</div>
                          <div className="fav-title">{item.title}</div>
                          <div className="fav-city">📍 {item.city}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Я СЛЕЖУ */}
            {section === "following" && (
              <div className="content-card">
                <div className="content-head">
                  <div className="content-title">🔔 Я слежу за продавцами</div>
                  <span style={{ fontSize:13, color:"var(--muted)" }}>{following.length}</span>
                </div>
                {following.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">🔔</div>
                    <div className="empty-title">Вы пока ни за кем не следите</div>
                    <div className="empty-sub">Подпишитесь на продавца на странице объявления, чтобы узнавать о новых товарах</div>
                  </div>
                ) : (
                  following.map(s => (
                    <div key={s.id} className="ad-item">
                      <div className="ad-emoji">{s.avatar || "👤"}</div>
                      <div className="ad-info">
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <div className="ad-title-item">{s.name}</div>
                          <button className="btn btn-ghost btn-sm" onClick={() => handleUnfollow(s.id)}>Отписаться</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ОТЗЫВЫ */}
            {section === "reviews" && (
              <div className="content-card">
                <div className="content-head">
                  <div className="content-title">⭐ Отзывы о вас</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ color:"var(--gold)", fontSize:18 }}>{"★".repeat(5)}</span>
                    <span style={{ fontFamily:"Unbounded", fontWeight:700 }}>{USER.rating}</span>
                    <span style={{ fontSize:13, color:"var(--muted)" }}>({USER.reviews} отзывов)</span>
                  </div>
                </div>
                {REVIEWS.map(r => (
                  <div key={r.id} className="review-item">
                    <div className="review-top">
                      <div className="rev-avatar">{r.avatar}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", justifyContent:"space-between" }}>
                          <div className="rev-name">{r.author}</div>
                          <div className="rev-date">{r.date}</div>
                        </div>
                        <div className="rev-stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                      </div>
                    </div>
                    <div className="rev-text">{r.text}</div>
                  </div>
                ))}
              </div>
            )}

            {/* БЕСПЛАТНО */}
            {section === "balance" && (
              <div>
                <div className="content-card" style={{ marginBottom:16 }}>
                  <div className="content-head">
                    <div className="content-title">🎉 Всё бесплатно!</div>
                  </div>
                  <div style={{ padding:24, textAlign:"center" }}>
                    <div style={{ fontSize:64, marginBottom:16 }}>🎁</div>
                    <div style={{ fontFamily:"Unbounded", fontSize:22, fontWeight:700, color:"var(--emerald)", marginBottom:10 }}>
                      100% Бесплатно
                    </div>
                    <div style={{ fontSize:14, color:"var(--muted)", lineHeight:1.9, marginBottom:24, maxWidth:480, margin:"0 auto 24px" }}>
                      На старте Bozor.tj все функции полностью бесплатны для всех пользователей.
                      Подавайте неограниченное количество объявлений — без оплаты!
                    </div>
                    <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:10, marginBottom:24 }}>
                      {[
                        "✓ Безлимит объявлений",
                        "✓ Поднятие вверх",
                        "✓ Страница магазина",
                        "✓ Чат с покупателями",
                        "✓ До 10 фото на объявление",
                        "✓ Все 18 городов ТЖ",
                        "✓ Поиск с фильтрами",
                        "✓ Избранное",
                      ].map(f => (
                        <div key={f} style={{ background:"var(--ebg)", border:"1px solid rgba(0,200,150,0.2)", borderRadius:20, padding:"6px 14px", fontSize:13, color:"var(--emerald)", fontWeight:600 }}>{f}</div>
                      ))}
                    </div>
                    <div style={{ background:"linear-gradient(135deg,#0D2318,#162130)", border:"1px solid rgba(0,200,150,0.2)", borderRadius:14, padding:18, display:"inline-block" }}>
                      <div style={{ fontFamily:"Unbounded", fontSize:28, fontWeight:900, color:"var(--emerald)" }}>0 сомони</div>
                      <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>навсегда бесплатно</div>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <div className="content-head"><div className="content-title">📊 Активность</div></div>
                  <div style={{ padding:20, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12 }}>
                    {[
                      { label:"Активных объявлений", val:ads.filter(a=>a.status==="active").length, color:"var(--emerald)", icon:"📋" },
                      { label:"Всего просмотров", val:ads.reduce((s,a)=>s+a.views,0), color:"var(--blue)", icon:"👁" },
                      { label:"В избранном у других", val:ads.reduce((s,a)=>s+a.favs,0), color:"var(--red)", icon:"❤️" },
                    ].map(s => (
                      <div key={s.label} style={{ background:"var(--card2)", border:"1px solid var(--border)", borderRadius:12, padding:16 }}>
                        <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                        <div style={{ fontFamily:"Unbounded", fontSize:22, fontWeight:700, color:s.color }}>{s.val}</div>
                        <div style={{ fontSize:12, color:"var(--muted)", marginTop:4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* НАСТРОЙКИ */}
            {section === "settings" && (
              <div className="content-card">
                <div className="content-head">
                  <div className="content-title">⚙️ Настройки профиля</div>
                </div>
                <div className="settings-form">
                  <div className="avatar-upload">
                    <div className="avatar-large">{USER.avatar}</div>
                    <div>
                      <button className="btn btn-ghost btn-sm" onClick={() => showToast("Загрузка фото — скоро!")}>📷 Изменить фото</button>
                      <div className="upload-info">JPG или PNG, до 5 МБ<br />Рекомендуем квадратное фото</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Имя и фамилия</label>
                      <input className="form-input" value={editForm.name} onChange={e => setEditForm(f=>({...f,name:e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Телефон</label>
                      <input className="form-input" value={editForm.phone} onChange={e => setEditForm(f=>({...f,phone:e.target.value}))} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input className="form-input" type="email" value={editForm.email} onChange={e => setEditForm(f=>({...f,email:e.target.value}))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Город</label>
                      <select className="form-select" value={editForm.city} onChange={e => setEditForm(f=>({...f,city:e.target.value}))}>
                        {CITIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ padding:"12px 28px" }} onClick={() => showToast("✅ Профиль сохранён!")}>
                    💾 Сохранить изменения
                  </button>
                </div>
              </div>
            )}

            {/* УВЕДОМЛЕНИЯ */}
            {section === "notifs" && (
              <div className="content-card">
                <div className="content-head"><div className="content-title">🔔 Уведомления</div></div>
                <div style={{ padding:"10px 20px" }}>
                  {[
                    { key:"messages", label:"Новые сообщения", sub:"Когда кто-то написал вам" },
                    { key:"views", label:"Просмотры объявления", sub:"Статистика по вашим объявлениям" },
                    { key:"price", label:"Снижение цены", sub:"Когда цена в избранном снизилась" },
                    { key:"news", label:"Новости и акции", sub:"Специальные предложения от Bozor.tj" },
                  ].map(n => (
                    <div key={n.key} className="notify-row">
                      <div>
                        <div className="notify-label">{n.label}</div>
                        <div className="notify-sub">{n.sub}</div>
                      </div>
                      <button className={`toggle ${notifs[n.key] ? "on" : "off"}`} onClick={() => { setNotifs(p=>({...p,[n.key]:!p[n.key]})); showToast(`${n.label}: ${!notifs[n.key] ? "Включено ✅" : "Выключено"}`); }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* БЕЗОПАСНОСТЬ */}
            {section === "security" && (
              <div className="content-card">
                <div className="content-head"><div className="content-title">🔒 Безопасность</div></div>
                <div className="settings-form">
                  <div className="form-group">
                    <label className="form-label">Текущий пароль</label>
                    <input className="form-input" type="password" placeholder="Введите текущий пароль" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Новый пароль</label>
                      <input className="form-input" type="password" placeholder="Минимум 8 символов" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Повторите пароль</label>
                      <input className="form-input" type="password" placeholder="Повторите пароль" />
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ padding:"12px 28px" }} onClick={() => showToast("✅ Пароль изменён!")}>
                    🔒 Изменить пароль
                  </button>
                  <div style={{ marginTop:28, paddingTop:20, borderTop:"1px solid var(--border)" }}>
                    <div style={{ fontWeight:700, marginBottom:12 }}>Активные сессии</div>
                    {[["📱 iPhone 13", "Душанбе • Сейчас активен"], ["💻 Chrome на Windows", "Душанбе • 2 часа назад"]].map(([d,m]) => (
                      <div key={d} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600 }}>{d}</div>
                          <div style={{ fontSize:12, color:"var(--muted)" }}>{m}</div>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => showToast("Сессия завершена")}>Завершить</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MODAL */}
      {modal?.type === "delete" && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div style={{ fontSize:44, textAlign:"center", marginBottom:10 }}>🗑️</div>
            <div className="modal-title" style={{ textAlign:"center" }}>Удалить объявление?</div>
            <div style={{ fontSize:13, color:"var(--muted)", textAlign:"center", lineHeight:1.6, marginBottom:4 }}>"{modal.title}" удалится навсегда и не подлежит восстановлению.</div>
            <div className="modal-btns">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Отмена</button>
              <button className="btn btn-danger" onClick={() => deleteAd(modal.id)}>Удалить</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
