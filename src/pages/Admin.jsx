import { useState, useEffect } from "react";

const STATS_DAILY = [
  { day: "Пн", ads: 42, users: 18, views: 1240 },
  { day: "Вт", ads: 67, users: 31, views: 1890 },
  { day: "Ср", ads: 53, users: 24, views: 1560 },
  { day: "Чт", ads: 89, users: 47, views: 2340 },
  { day: "Пт", ads: 74, users: 38, views: 2100 },
  { day: "Сб", ads: 112, users: 62, views: 3200 },
  { day: "Вс", ads: 95, users: 55, views: 2780 },
];

const CATEGORY_DATA = [
  { name: "Транспорт", value: 31, color: "#00C896" },
  { name: "Недвижимость", value: 18, color: "#FFD166" },
  { name: "Электроника", value: 22, color: "#4E9CFF" },
  { name: "Работа", value: 10, color: "#FF6B6B" },
  { name: "Одежда", value: 8, color: "#4ECDC4" },
  { name: "Другое", value: 11, color: "#A8DADC" },
];

const MOCK_ADS = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", user: "Алишер К.", city: "Душанбе", price: 8500, category: "Электроника", status: "active", date: "29.05.2025", views: 124, reports: 0 },
  { id: 2, title: "Toyota Camry 2022 белая", user: "Фируз Р.", city: "Душанбе", price: 185000, category: "Транспорт", status: "active", date: "29.05.2025", views: 312, reports: 1 },
  { id: 3, title: "2-комн. квартира, 65 м²", user: "Мадина С.", city: "Худжанд", price: 95000, category: "Недвижимость", status: "pending", date: "28.05.2025", views: 89, reports: 0 },
  { id: 4, title: "MacBook Pro M3, 512GB", user: "Бахром Т.", city: "Худжанд", price: 14200, category: "Электроника", status: "active", date: "28.05.2025", views: 67, reports: 0 },
  { id: 5, title: "Продаю котят Мейн-кун", user: "Зарина О.", city: "Куляб", price: 1200, category: "Животные", status: "blocked", date: "27.05.2025", views: 234, reports: 3 },
  { id: 6, title: "Требуется React разработчик", user: "TechCorp TJ", city: "Душанбе", price: null, category: "Работа", status: "active", date: "27.05.2025", views: 198, reports: 0 },
  { id: 7, title: "Диван угловой серый", user: "Умед Н.", city: "Бохтар", price: 3200, category: "Для дома", status: "pending", date: "26.05.2025", views: 45, reports: 0 },
  { id: 8, title: "Samsung Galaxy S24 Ultra", user: "Дилором М.", city: "Душанбе", price: 7800, category: "Электроника", status: "active", date: "26.05.2025", views: 156, reports: 0 },
];

const MOCK_USERS = [
  { id: 1, name: "Алишер Каримов", phone: "+992 91 123-45-67", city: "Душанбе", ads: 12, joined: "12.01.2025", status: "active", verified: true },
  { id: 2, name: "Фируз Рахимов", phone: "+992 93 234-56-78", city: "Душанбе", ads: 5, joined: "03.02.2025", status: "active", verified: true },
  { id: 3, name: "Мадина Саидова", phone: "+992 98 345-67-89", city: "Худжанд", ads: 8, joined: "18.03.2025", status: "active", verified: false },
  { id: 4, name: "Бахром Турсунов", phone: "+992 92 456-78-90", city: "Худжанд", ads: 3, joined: "25.03.2025", status: "active", verified: false },
  { id: 5, name: "Зарина Олимова", phone: "+992 77 567-89-01", city: "Куляб", ads: 7, joined: "10.04.2025", status: "blocked", verified: false },
  { id: 6, name: "Умед Насимов", phone: "+992 91 678-90-12", city: "Бохтар", ads: 2, joined: "22.04.2025", status: "active", verified: false },
  { id: 7, name: "Дилором Мирзоева", phone: "+992 93 789-01-23", city: "Душанбе", ads: 15, joined: "05.05.2025", status: "active", verified: true },
  { id: 8, name: "Саид Хасанов", phone: "+992 98 890-12-34", city: "Турсунзаде", ads: 1, joined: "20.05.2025", status: "active", verified: false },
];

const MOCK_REPORTS = [
  { id: 1, adTitle: "Toyota Camry 2022", reporter: "Анонимный", reason: "Подозрительная цена", date: "29.05.2025", status: "new" },
  { id: 2, adTitle: "Продаю котят Мейн-кун", reporter: "Алишер К.", reason: "Мошенничество", date: "28.05.2025", status: "new" },
  { id: 3, adTitle: "Продаю котят Мейн-кун", reporter: "Фируз Р.", reason: "Недостоверная информация", date: "28.05.2025", status: "reviewed" },
];

const CATEGORIES_MANAGE = [
  { id: 1, name: "Транспорт", icon: "🚗", ads: 111644, active: true },
  { id: 2, name: "Недвижимость", icon: "🏠", ads: 65002, active: true },
  { id: 3, name: "Электроника", icon: "📱", ads: 28073, active: true },
  { id: 4, name: "Работа", icon: "💼", ads: 8242, active: true },
  { id: 5, name: "Для дома", icon: "🛋️", ads: 60738, active: true },
  { id: 6, name: "Одежда", icon: "👗", ads: 23387, active: true },
];

// ── Mini Bar Chart (pure SVG) ──────────────────────────────────────────────
function BarChart({ data, color = "#00C896" }) {
  const max = Math.max(...data.map(d => d.value));
  const W = 340, H = 120, barW = 30, gap = (W - data.length * barW) / (data.length + 1);
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 24}`} style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const h = (d.value / max) * H;
        const x = gap + i * (barW + gap);
        const y = H - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={5} fill={color} opacity={0.85} />
            <text x={x + barW / 2} y={H + 16} textAnchor="middle" fontSize={11} fill="#5A7A94">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Mini Line Chart (pure SVG) ─────────────────────────────────────────────
function LineChart({ data, color = "#00C896" }) {
  const max = Math.max(...data.map(d => d.value));
  const W = 340, H = 100;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (d.value / max) * H;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${H} ` + pts.join(" ") + ` ${W},${H}`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 24}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#grad)" />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * W;
        const y = H - (d.value / max) * H;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill={color} />
            <text x={x} y={H + 16} textAnchor="middle" fontSize={11} fill="#5A7A94">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Donut Chart (pure SVG) ─────────────────────────────────────────────────
function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -90;
  const R = 60, cx = 80, cy = 80;
  const slices = data.map(d => {
    const sweep = (d.value / total) * 360;
    const start = angle;
    angle += sweep;
    return { ...d, start, sweep };
  });
  const toRad = deg => (deg * Math.PI) / 180;
  const arc = (cx, cy, r, startDeg, sweepDeg) => {
    const s = toRad(startDeg), e = toRad(startDeg + sweepDeg);
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    const large = sweepDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  return (
    <svg width={160} height={160} viewBox="0 0 160 160">
      {slices.map((s, i) => (
        <path key={i} d={arc(cx, cy, R, s.start, s.sweep - 2)}
          stroke={s.color} strokeWidth={20} fill="none" strokeLinecap="round" />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={18} fontWeight="700" fill="#EDF2F7">362K</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="#5A7A94">объявлений</text>
    </svg>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#080E14; --surface:#0F1923; --card:#141F2B; --card2:#1A2737;
  --emerald:#00C896; --emerald2:#00A87D; --gold:#FFD166; --red:#FF4D6D;
  --blue:#4E9CFF; --text:#EDF2F7; --muted:#5A7A94; --border:rgba(255,255,255,0.07);
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}
.layout{display:flex;min-height:100vh;}
.sidebar{width:230px;flex-shrink:0;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
.sidebar-logo{padding:22px 18px 18px;border-bottom:1px solid var(--border);}
.logo-text{font-family:'Unbounded',sans-serif;font-size:18px;font-weight:900;color:var(--emerald);}
.logo-text span{color:var(--text);}
.logo-badge{font-size:10px;font-weight:700;background:rgba(0,200,150,0.15);color:var(--emerald);padding:2px 8px;border-radius:4px;margin-top:5px;display:inline-block;text-transform:uppercase;letter-spacing:1px;}
.nav{padding:12px 8px;flex:1;}
.nav-label{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1px;padding:8px 10px 4px;}
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:all 0.15s;font-size:14px;font-weight:500;color:var(--muted);border:none;background:none;width:100%;text-align:left;margin-bottom:2px;}
.nav-item:hover{background:var(--card);color:var(--text);}
.nav-item.active{background:rgba(0,200,150,0.12);color:var(--emerald);}
.nav-icon{font-size:17px;width:22px;text-align:center;}
.nav-badge{margin-left:auto;background:var(--red);color:#fff;font-size:11px;font-weight:700;padding:2px 7px;border-radius:10px;}
.sidebar-footer{padding:14px;border-top:1px solid var(--border);}
.admin-info{display:flex;align-items:center;gap:10px;}
.admin-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:14px;font-weight:700;color:#0F1923;flex-shrink:0;}
.admin-name{font-size:13px;font-weight:600;}
.admin-role{font-size:11px;color:var(--muted);}
.main{flex:1;overflow:auto;min-width:0;}
.topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:0 24px;height:58px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
.page-title{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;}
.topbar-right{display:flex;align-items:center;gap:10px;}
.notif-btn{width:36px;height:36px;border-radius:10px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;position:relative;transition:border-color 0.15s;}
.notif-btn:hover{border-color:var(--emerald);}
.notif-dot{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:50%;background:var(--red);border:1.5px solid var(--surface);}
.content{padding:24px;}
.metrics{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:24px;}
.metric{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;transition:all 0.2s;}
.metric:hover{border-color:var(--emerald);transform:translateY(-2px);}
.metric-icon{font-size:24px;margin-bottom:10px;}
.metric-val{font-family:'Unbounded',sans-serif;font-size:26px;font-weight:700;}
.metric-val.green{color:var(--emerald);}
.metric-val.gold{color:var(--gold);}
.metric-val.red{color:var(--red);}
.metric-val.blue{color:var(--blue);}
.metric-label{font-size:12px;color:var(--muted);margin-top:4px;}
.metric-change{font-size:12px;font-weight:600;margin-top:6px;}
.metric-change.up{color:var(--emerald);}
.metric-change.down{color:var(--red);}
.charts-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:24px;}
.chart-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;}
.chart-title{font-size:13px;font-weight:700;margin-bottom:14px;}
.table-card{background:var(--card);border:1px solid var(--border);border-radius:14px;margin-bottom:18px;overflow:hidden;}
.table-header{padding:16px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);flex-wrap:wrap;gap:10px;}
.table-title{font-size:14px;font-weight:700;}
table{width:100%;border-collapse:collapse;}
thead tr{background:var(--card2);}
th{padding:11px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;}
td{padding:12px 14px;font-size:13px;border-top:1px solid var(--border);}
tr:hover td{background:rgba(255,255,255,0.02);}
.td-bold{font-weight:600;}
.td-price{font-family:'Unbounded',sans-serif;font-size:12px;color:var(--emerald);}
.td-muted{color:var(--muted);font-size:12px;}
.badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.badge-active{background:rgba(0,200,150,0.12);color:var(--emerald);}
.badge-pending{background:rgba(255,209,102,0.12);color:var(--gold);}
.badge-blocked{background:rgba(255,77,109,0.12);color:var(--red);}
.badge-new{background:rgba(78,156,255,0.12);color:var(--blue);}
.badge-reviewed{background:rgba(90,122,148,0.12);color:var(--muted);}
.btn{padding:7px 14px;border-radius:8px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:12px;cursor:pointer;transition:all 0.15s;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;}
.btn-primary{background:var(--emerald);color:#0F1923;}
.btn-primary:hover{background:var(--emerald2);}
.btn-ghost{background:var(--card2);color:var(--text);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--emerald);color:var(--emerald);}
.btn-danger{background:rgba(255,77,109,0.12);color:var(--red);border:1px solid rgba(255,77,109,0.2);}
.btn-danger:hover{background:rgba(255,77,109,0.22);}
.btn-warn{background:rgba(255,209,102,0.12);color:var(--gold);border:1px solid rgba(255,209,102,0.2);}
.btn-warn:hover{background:rgba(255,209,102,0.22);}
.btn-success{background:rgba(0,200,150,0.12);color:var(--emerald);border:1px solid rgba(0,200,150,0.2);}
.btn-success:hover{background:rgba(0,200,150,0.22);}
.btn-row{display:flex;gap:6px;flex-wrap:wrap;}
.search-input{padding:8px 12px;background:var(--card2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;outline:none;font-family:'Golos Text',sans-serif;width:200px;}
.search-input:focus{border-color:var(--emerald);}
.search-input::placeholder{color:var(--muted);}
.filter-select{padding:8px 12px;background:var(--card2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;outline:none;cursor:pointer;font-family:'Golos Text',sans-serif;}
.filter-select option{background:var(--card);}
.settings-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;}
.setting-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;}
.setting-card-title{font-size:14px;font-weight:700;margin-bottom:14px;}
.setting-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);}
.setting-row:last-of-type{border-bottom:none;}
.setting-label{font-size:13px;}
.setting-sub{font-size:11px;color:var(--muted);margin-top:2px;}
.toggle{width:42px;height:22px;border-radius:11px;cursor:pointer;transition:background 0.2s;border:none;position:relative;flex-shrink:0;}
.toggle.on{background:var(--emerald);}
.toggle.off{background:var(--card2);border:1px solid var(--border);}
.toggle::after{content:'';position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:3px;transition:left 0.2s;}
.toggle.on::after{left:23px;}
.toggle.off::after{left:3px;}
.form-input{width:100%;padding:9px 12px;background:var(--card2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;outline:none;font-family:'Golos Text',sans-serif;margin-top:6px;}
.form-input:focus{border-color:var(--emerald);}
.form-label{font-size:11px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;}
.activity-item{display:flex;align-items:flex-start;gap:10px;padding:10px;border-radius:8px;transition:background 0.15s;}
.activity-item:hover{background:var(--card2);}
.activity-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;margin-top:4px;}
.activity-text{font-size:13px;line-height:1.4;}
.activity-time{font-size:11px;color:var(--muted);margin-top:2px;}
.cat-row{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid var(--border);gap:14px;transition:background 0.15s;}
.cat-row:hover{background:var(--card2);}
.cat-row:last-child{border-bottom:none;}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.modal{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:26px;max-width:380px;width:90%;animation:slideUp 0.25s ease;}
@keyframes slideUp{from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;}}
.modal-icon{font-size:44px;text-align:center;margin-bottom:10px;}
.modal-title{font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700;text-align:center;margin-bottom:8px;}
.modal-desc{font-size:13px;color:var(--muted);text-align:center;line-height:1.6;margin-bottom:22px;}
.modal-btns{display:flex;gap:10px;}
.modal-btns .btn{flex:1;justify-content:center;padding:11px;}
.toast{position:fixed;bottom:22px;right:22px;background:var(--card);border:1px solid var(--emerald);color:var(--text);padding:12px 18px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,0.5);animation:toastIn 0.3s ease;}
@keyframes toastIn{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:translateX(0);}}
@media(max-width:768px){.charts-row{grid-template-columns:1fr;}.sidebar{width:56px;}.admin-name,.admin-role,.nav-item span:not(.nav-icon),.nav-label,.logo-badge{display:none;}.logo-text{font-size:14px;}}
`;

export default function BozorAdmin() {
  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [ads, setAds] = useState(MOCK_ADS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [adSearch, setAdSearch] = useState("");
  const [adFilter, setAdFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");
  const [settings, setSettings] = useState({
    moderation: true, smsVerify: true, freeAds: true,
    premiumEnabled: true, maintenanceMode: false, newRegs: true,
  });

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const doConfirm = (cfg) => setConfirm(cfg);

  const changeAdStatus = (id, status) => {
    setAds(a => a.map(x => x.id === id ? { ...x, status } : x));
    showToast(status === "blocked" ? "🚫 Объявление заблокировано" : "✅ Объявление одобрено");
    setConfirm(null);
  };
  const deleteAd = (id) => { setAds(a => a.filter(x => x.id !== id)); showToast("🗑️ Удалено"); setConfirm(null); };
  const changeUserStatus = (id, status) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, status } : x));
    showToast(status === "blocked" ? "🚫 Пользователь заблокирован" : "✅ Разблокирован");
    setConfirm(null);
  };
  const resolveReport = (id) => { setReports(r => r.map(x => x.id === id ? { ...x, status: "reviewed" } : x)); showToast("✅ Жалоба рассмотрена"); };

  const filteredAds = ads.filter(a =>
    (a.title.toLowerCase().includes(adSearch.toLowerCase()) || a.user.toLowerCase().includes(adSearch.toLowerCase())) &&
    (adFilter === "all" || a.status === adFilter)
  );
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.phone.includes(userSearch));
  const newReports = reports.filter(r => r.status === "new").length;
  const pendingAds = ads.filter(a => a.status === "pending").length;

  const NAV = [
    { id: "dashboard", icon: "📊", label: "Дашборд" },
    { id: "ads", icon: "📋", label: "Объявления", badge: pendingAds },
    { id: "users", icon: "👥", label: "Пользователи" },
    { id: "reports", icon: "🚨", label: "Жалобы", badge: newReports },
    { id: "categories", icon: "🗂️", label: "Категории" },
    { id: "settings", icon: "⚙️", label: "Настройки" },
  ];

  const PAGES = { dashboard: "Дашборд", ads: "Объявления", users: "Пользователи", reports: "Жалобы", categories: "Категории", settings: "Настройки" };

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-text">bozor<span>.tj</span></div>
          <div className="logo-badge">Admin</div>
        </div>
        <nav className="nav">
          <div className="nav-label">Управление</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge > 0 && <span className="nav-badge">{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">A</div>
            <div><div className="admin-name">Администратор</div><div className="admin-role">Владелец</div></div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <div className="topbar">
          <div className="page-title">{PAGES[page]}</div>
          <div className="topbar-right">
            <div className="notif-btn" onClick={() => setPage("reports")}>🔔<div className="notif-dot" /></div>
            <button className="btn btn-primary" onClick={() => showToast("Открываем bozor.tj...")}>🌐 Сайт</button>
          </div>
        </div>

        <div className="content">

          {/* DASHBOARD */}
          {page === "dashboard" && <>
            <div className="metrics">
              {[
                { label: "Объявлений", val: "362K", icon: "📋", cls: "green", ch: "↑ +12% за неделю", up: true },
                { label: "Пользователей", val: "124K", icon: "👥", cls: "blue", ch: "↑ +8% за неделю", up: true },
                { label: "Новые сегодня", val: "532", icon: "🆕", cls: "gold", ch: "↑ +24% вчера", up: true },
                { label: "Жалобы", val: String(newReports), icon: "🚨", cls: "red", ch: newReports > 0 ? "Требует внимания" : "Всё чисто", up: false },
                { label: "Доход (с.)", val: "14 800", icon: "💰", cls: "gold", ch: "↑ +18% месяц", up: true },
                { label: "На модерации", val: String(pendingAds), icon: "⏳", cls: "blue", ch: pendingAds > 0 ? "Требует проверки" : "Очередь пуста", up: pendingAds === 0 },
              ].map(m => (
                <div key={m.label} className="metric">
                  <div className="metric-icon">{m.icon}</div>
                  <div className={`metric-val ${m.cls}`}>{m.val}</div>
                  <div className="metric-label">{m.label}</div>
                  <div className={`metric-change ${m.up ? "up" : "down"}`}>{m.ch}</div>
                </div>
              ))}
            </div>

            <div className="charts-row">
              <div className="chart-card">
                <div className="chart-title">📈 Объявления за неделю</div>
                <LineChart data={STATS_DAILY.map(d => ({ label: d.day, value: d.ads }))} color="#00C896" />
              </div>
              <div className="chart-card">
                <div className="chart-title">👥 Новые пользователи</div>
                <BarChart data={STATS_DAILY.map(d => ({ label: d.day, value: d.users }))} color="#4E9CFF" />
              </div>
              <div className="chart-card">
                <div className="chart-title">🍩 По категориям</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <DonutChart data={CATEGORY_DATA} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 12px", marginTop: 6 }}>
                  {CATEGORY_DATA.map(c => (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--muted)" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
                      {c.name} {c.value}%
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">⚡ Последние действия</div>
              {[
                { color: "#00C896", text: "Новое объявление: iPhone 15 Pro", time: "2 мин назад" },
                { color: "#4E9CFF", text: "Регистрация: Саид Хасанов", time: "8 мин назад" },
                { color: "#FFD166", text: "Жалоба на объявление Toyota Camry", time: "15 мин назад" },
                { color: "#00C896", text: "Объявление одобрено модератором", time: "22 мин назад" },
                { color: "#FF4D6D", text: "Пользователь Зарина О. заблокирован", time: "1 час назад" },
              ].map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ background: a.color }} />
                  <div><div className="activity-text">{a.text}</div><div className="activity-time">{a.time}</div></div>
                </div>
              ))}
            </div>
          </>}

          {/* ADS */}
          {page === "ads" && (
            <div className="table-card">
              <div className="table-header">
                <div className="table-title">Все объявления <span style={{ color: "var(--muted)", fontWeight: 400 }}>({filteredAds.length})</span></div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input className="search-input" placeholder="🔍 Поиск..." value={adSearch} onChange={e => setAdSearch(e.target.value)} />
                  <select className="filter-select" value={adFilter} onChange={e => setAdFilter(e.target.value)}>
                    <option value="all">Все статусы</option>
                    <option value="active">Активные</option>
                    <option value="pending">На модерации</option>
                    <option value="blocked">Заблокированные</option>
                  </select>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>#</th><th>Объявление</th><th>Автор</th><th>Цена</th><th>Статус</th><th>👁</th><th>⚠️</th><th>Дата</th><th>Действия</th></tr></thead>
                  <tbody>
                    {filteredAds.map(ad => (
                      <tr key={ad.id}>
                        <td className="td-muted">{ad.id}</td>
                        <td>
                          <div className="td-bold" style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ad.title}</div>
                          <div className="td-muted">{ad.category} · {ad.city}</div>
                        </td>
                        <td>{ad.user}</td>
                        <td><span className="td-price">{ad.price ? `${ad.price.toLocaleString()} с.` : "Договорн."}</span></td>
                        <td><span className={`badge badge-${ad.status}`}>{ad.status === "active" ? "✓ Активно" : ad.status === "pending" ? "⏳ Модерация" : "🚫 Блок"}</span></td>
                        <td className="td-muted">{ad.views}</td>
                        <td>{ad.reports > 0 ? <span style={{ color: "var(--red)", fontWeight: 700 }}>⚠️ {ad.reports}</span> : <span className="td-muted">—</span>}</td>
                        <td className="td-muted">{ad.date}</td>
                        <td>
                          <div className="btn-row">
                            {ad.status === "pending" && <button className="btn btn-success" onClick={() => doConfirm({ title: "Одобрить?", desc: `"${ad.title}"`, icon: "✅", onOk: () => changeAdStatus(ad.id, "active"), okLabel: "Одобрить", okCls: "btn-success" })}>✓</button>}
                            {ad.status !== "blocked" && <button className="btn btn-warn" onClick={() => doConfirm({ title: "Заблокировать?", desc: `"${ad.title}" будет скрыто`, icon: "🚫", onOk: () => changeAdStatus(ad.id, "blocked"), okLabel: "Блок", okCls: "btn-warn" })}>🚫</button>}
                            {ad.status === "blocked" && <button className="btn btn-success" onClick={() => changeAdStatus(ad.id, "active")}>↩</button>}
                            <button className="btn btn-danger" onClick={() => doConfirm({ title: "Удалить?", desc: "Удалится навсегда", icon: "🗑️", onOk: () => deleteAd(ad.id), okLabel: "Удалить", okCls: "btn-danger" })}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS */}
          {page === "users" && (
            <div className="table-card">
              <div className="table-header">
                <div className="table-title">Пользователи <span style={{ color: "var(--muted)", fontWeight: 400 }}>({filteredUsers.length})</span></div>
                <input className="search-input" placeholder="🔍 Поиск по имени или телефону..." value={userSearch} onChange={e => setUserSearch(e.target.value)} />
              </div>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>#</th><th>Имя</th><th>Телефон</th><th>Город</th><th>Объявл.</th><th>Верификация</th><th>Статус</th><th>Регистрация</th><th>Действия</th></tr></thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td className="td-muted">{u.id}</td>
                        <td className="td-bold">{u.name}</td>
                        <td className="td-muted">{u.phone}</td>
                        <td>{u.city}</td>
                        <td style={{ fontFamily: "'Unbounded'", color: "var(--emerald)", fontSize: 13 }}>{u.ads}</td>
                        <td>{u.verified ? <span className="badge badge-active" style={{ fontSize: 10 }}>✓ Верифицирован</span> : <span className="td-muted">—</span>}</td>
                        <td><span className={`badge badge-${u.status}`}>{u.status === "active" ? "✓ Активен" : "🚫 Блок"}</span></td>
                        <td className="td-muted">{u.joined}</td>
                        <td>
                          {u.status === "active"
                            ? <button className="btn btn-warn" onClick={() => doConfirm({ title: "Заблокировать?", desc: `${u.name} не сможет войти`, icon: "🚫", onOk: () => changeUserStatus(u.id, "blocked"), okLabel: "Блок", okCls: "btn-warn" })}>🚫 Блок</button>
                            : <button className="btn btn-success" onClick={() => changeUserStatus(u.id, "active")}>↩ Разблок</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {page === "reports" && (
            <div className="table-card">
              <div className="table-header">
                <div className="table-title">Жалобы {newReports > 0 && <span style={{ color: "var(--red)", marginLeft: 6 }}>● {newReports} новых</span>}</div>
              </div>
              <table>
                <thead><tr><th>#</th><th>Объявление</th><th>От кого</th><th>Причина</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead>
                <tbody>
                  {reports.map(r => (
                    <tr key={r.id}>
                      <td className="td-muted">{r.id}</td>
                      <td className="td-bold">{r.adTitle}</td>
                      <td>{r.reporter}</td>
                      <td className="td-muted">{r.reason}</td>
                      <td className="td-muted">{r.date}</td>
                      <td><span className={`badge badge-${r.status}`}>{r.status === "new" ? "🆕 Новая" : "✓ Рассмотрена"}</span></td>
                      <td>
                        {r.status === "new" && (
                          <div className="btn-row">
                            <button className="btn btn-success" onClick={() => resolveReport(r.id)}>✓ Ок</button>
                            <button className="btn btn-danger" onClick={() => { resolveReport(r.id); showToast("🚫 Объявление заблокировано"); }}>🚫 Блок</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CATEGORIES */}
          {page === "categories" && (
            <div className="table-card">
              <div className="table-header">
                <div className="table-title">Категории</div>
                <button className="btn btn-primary" onClick={() => showToast("Добавление категории — скоро!")}>+ Добавить</button>
              </div>
              {CATEGORIES_MANAGE.map(c => (
                <div key={c.id} className="cat-row">
                  <span style={{ fontSize: 28 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.ads.toLocaleString()} объявлений</div>
                  </div>
                  <span className={`badge badge-${c.active ? "active" : "blocked"}`}>{c.active ? "✓ Активна" : "🚫 Скрыта"}</span>
                  <div className="btn-row">
                    <button className="btn btn-ghost" onClick={() => showToast("Редактирование — скоро!")}>✏️</button>
                    <button className="btn btn-warn" onClick={() => showToast("Категория скрыта")}>🙈</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS */}
          {page === "settings" && (
            <div className="settings-grid">
              <div className="setting-card">
                <div className="setting-card-title">⚙️ Основные</div>
                {[
                  { key: "moderation", label: "Модерация объявлений", sub: "Проверка перед публикацией" },
                  { key: "freeAds", label: "Бесплатное размещение", sub: "Разрешить бесплатные объявления" },
                  { key: "newRegs", label: "Регистрация открыта", sub: "Новые пользователи могут регистрироваться" },
                  { key: "maintenanceMode", label: "Режим обслуживания", sub: "Сайт закрыт для пользователей" },
                ].map(s => (
                  <div key={s.key} className="setting-row">
                    <div><div className="setting-label">{s.label}</div><div className="setting-sub">{s.sub}</div></div>
                    <button className={`toggle ${settings[s.key] ? "on" : "off"}`} onClick={() => { setSettings(p => ({ ...p, [s.key]: !p[s.key] })); showToast(`${s.label}: ${!settings[s.key] ? "Включено ✅" : "Выключено"}`); }} />
                  </div>
                ))}
              </div>
              <div className="setting-card">
                <div className="setting-card-title">💰 Монетизация</div>
                {[
                  { key: "premiumEnabled", label: "Премиум объявления", sub: "Платное продвижение" },
                  { key: "smsVerify", label: "SMS верификация", sub: "Подтверждение номера" },
                ].map(s => (
                  <div key={s.key} className="setting-row">
                    <div><div className="setting-label">{s.label}</div><div className="setting-sub">{s.sub}</div></div>
                    <button className={`toggle ${settings[s.key] ? "on" : "off"}`} onClick={() => { setSettings(p => ({ ...p, [s.key]: !p[s.key] })); showToast(`${s.label} ${!settings[s.key] ? "включено ✅" : "выключено"}`); }} />
                  </div>
                ))}
                <div style={{ marginTop: 14 }}>
                  <div className="form-label">Цена премиум (сомони / 7 дней)</div>
                  <input className="form-input" type="number" defaultValue={25} />
                  <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => showToast("Тариф сохранён ✅")}>Сохранить</button>
                </div>
              </div>
              <div className="setting-card">
                <div className="setting-card-title">📬 Контакты</div>
                {[["Email поддержки", "support@bozor.tj"], ["Telegram", "@bozortj_bot"], ["Телефон", "+992 44 000-00-00"]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div className="form-label">{label}</div>
                    <input className="form-input" defaultValue={val} />
                  </div>
                ))}
                <button className="btn btn-primary" onClick={() => showToast("Сохранено ✅")}>💾 Сохранить</button>
              </div>
              <div className="setting-card">
                <div className="setting-card-title">🌐 SEO</div>
                {[["Название сайта", "Bozor.tj — Доска объявлений"], ["Описание", "Купи и продай всё в Таджикистане"]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div className="form-label">{label}</div>
                    <input className="form-input" defaultValue={val} />
                  </div>
                ))}
                <button className="btn btn-primary" onClick={() => showToast("SEO сохранено ✅")}>💾 Сохранить</button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* CONFIRM */}
      {confirm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setConfirm(null)}>
          <div className="modal">
            <div className="modal-icon">{confirm.icon}</div>
            <div className="modal-title">{confirm.title}</div>
            <div className="modal-desc">{confirm.desc}</div>
            <div className="modal-btns">
              <button className="btn btn-ghost" onClick={() => setConfirm(null)}>Отмена</button>
              <button className={`btn ${confirm.okCls}`} onClick={confirm.onOk}>{confirm.okLabel}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
