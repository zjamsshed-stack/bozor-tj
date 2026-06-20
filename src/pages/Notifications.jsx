import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
  --red:#FF4D6D;--blue:#4E9CFF;--gold:#FFD166;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn{background:transparent;border:1.5px solid var(--border);color:var(--text);padding:9px 16px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;}
.btn:hover{border-color:var(--emerald);color:var(--emerald);}
.btn-primary{background:var(--emerald);color:#0F1923;border:none;}
.btn-primary:hover{background:var(--emerald2);}

.page{max-width:1000px;margin:0 auto;padding:24px 20px;}
.layout{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start;}

/* SIDEBAR */
.notif-sidebar{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;position:sticky;top:80px;}
.sidebar-tabs{display:flex;flex-direction:column;border-bottom:1px solid var(--border);}
.stab{padding:14px 16px;border:none;background:none;text-align:left;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;color:var(--muted);cursor:pointer;border-left:3px solid transparent;transition:all 0.15s;}
.stab:hover{color:var(--text);}
.stab.active{background:var(--ebg);color:var(--emerald);border-left-color:var(--emerald);}
.stab-badge{margin-left:auto;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px;}

.sidebar-actions{padding:12px;}
.action-btn{width:100%;padding:11px;border:none;border-radius:10px;background:var(--card2);color:var(--text);font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;margin-bottom:8px;}
.action-btn:hover{background:var(--emerald);color:#0F1923;}
.action-btn:last-child{margin-bottom:0;}

/* MAIN */
.notif-list{display:flex;flex-direction:column;}
.notif-item{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;margin-bottom:12px;cursor:pointer;transition:all 0.2s;display:flex;gap:14px;align-items:flex-start;}
.notif-item:hover{border-color:var(--emerald);background:rgba(0,200,150,0.03);}
.notif-item.unread{background:var(--card2);border-color:var(--emerald);}
.notif-item.unread::before{content:'';width:6px;height:6px;background:var(--emerald);border-radius:50%;position:absolute;left:8px;top:20px;}

.notif-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
.notif-icon.msg{background:rgba(78,156,255,0.1);}
.notif-icon.like{background:rgba(255,77,109,0.1);}
.notif-icon.sale{background:rgba(0,200,150,0.1);}
.notif-icon.review{background:rgba(255,209,102,0.1);}

.notif-content{flex:1;min-width:0;}
.notif-title{font-weight:700;font-size:14px;margin-bottom:4px;}
.notif-text{font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:6px;}
.notif-meta{display:flex;justify-content:space-between;align-items:center;}
.notif-time{font-size:11px;color:var(--muted);}
.notif-action{background:var(--emerald);color:#0F1923;border:none;padding:5px 12px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;transition:all 0.2s;}
.notif-action:hover{background:var(--emerald2);}

.notif-type{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:3px 8px;border-radius:6px;background:var(--ebg);color:var(--emerald);font-weight:600;}

.empty{text-align:center;padding:40px 20px;color:var(--muted);}
.empty-icon{font-size:48px;margin-bottom:12px;}
.empty-text{font-size:14px;}

.mark-all{padding:12px 16px;text-align:center;border-top:1px solid var(--border);}
.mark-all-btn{background:none;border:none;color:var(--emerald);font-size:12px;font-weight:600;cursor:pointer;}
.mark-all-btn:hover{text-decoration:underline;}

.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:12px 24px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);}

@media(max-width:860px){
  .layout{grid-template-columns:1fr;}
  .notif-sidebar{position:static;}
  .sidebar-tabs{flex-direction:row;overflow-x:auto;}
  .stab{white-space:nowrap;}
}
`;

const NOTIFICATIONS = [
  { id:1, type:"msg", icon:"💬", title:"Новое сообщение от Алишера", text:"Привет! Всё ещё актуально?", time:"5 мин назад", unread:true, user:"Алишер К." },
  { id:2, type:"like", icon:"❤️", title:"Мадина добавила ваше объявление", text:"MacBook Pro M3 — добавлено в избранное", time:"12 мин назад", unread:true, user:"Мадина С." },
  { id:3, type:"sale", icon:"✓", title:"Объявление одобрено!", text:"Toyota Camry 2023 успешно опубликовано", time:"25 мин назад", unread:false, user:"Bozor.tj" },
  { id:4, type:"review", icon:"⭐", title:"Новый отзыв о вас", text:"5★ — Отличный продавец! Спасибо!", time:"1 час назад", unread:false, user:"Бахром Т." },
  { id:5, type:"msg", icon:"💬", title:"Сообщение от Фирузова магазина", text:"Когда будет в наличии ещё?", time:"2 часа назад", unread:false, user:"Firouz Shop" },
  { id:6, type:"sale", icon:"🔔", title:"Ваше объявление поднято!", text:"iPhone 13 Pro теперь в топе поиска", time:"3 часа назад", unread:false, user:"Bozor.tj" },
  { id:7, type:"like", icon:"❤️", title:"Вам нравится товар?", text:"Бахром добавил диван в избранное", time:"Вчера", unread:false, user:"Бахром Т." },
  { id:8, type:"review", icon:"📝", title:"Запрос на отзыв", text:"Оцени качество обслуживания Алишера", time:"2 дня назад", unread:false, user:"Bozor.tj" },
];

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filtered = filter === "all" ? notifs 
    : filter === "unread" ? notifs.filter(n => n.unread)
    : notifs.filter(n => n.type === filter);

  const unreadCount = notifs.filter(n => n.unread).length;
  const msgCount = notifs.filter(n => n.type === "msg").length;

  const markAsRead = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, unread: false } : n));
    showToast("✅ Отмечено как прочитано");
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
    showToast("✅ Все отмечены как прочитанные");
  };

  const deleteNotif = (id) => {
    setNotifs(notifs.filter(n => n.id !== id));
    showToast("🗑️ Удалено");
  };

  return (
    <div>
      <header className="header">
        <div className="logo">bozor<span>.tj</span></div>
        <button className="btn" onClick={() => window.goTo("profile")}>← Профиль</button>
      </header>

      <div className="page">
        <div className="layout">
          {/* SIDEBAR */}
          <aside className="notif-sidebar">
            <div className="sidebar-tabs">
              {[["all","Все уведомления",unreadCount],["unread","Непрочитанные",unreadCount],["msg","Сообщения",msgCount],["like","Нравится",notifs.filter(n=>n.type==="like").length],["sale","Продажи",notifs.filter(n=>n.type==="sale").length],["review","Отзывы",notifs.filter(n=>n.type==="review").length]].map(([id,label,count]) => (
                <button key={id} className={`stab ${filter === id ? "active" : ""}`} onClick={() => setFilter(id)}>
                  {label}
                  {count > 0 && <span className="stab-badge">{count}</span>}
                </button>
              ))}
            </div>
            <div className="sidebar-actions">
              <button className="action-btn" onClick={() => showToast("📲 Push уведомления включены")}>🔔 Push уведомления</button>
              <button className="action-btn" onClick={() => showToast("⚙️ Открываем настройки...")}>⚙️ Настройки</button>
            </div>
          </aside>

          {/* MAIN */}
          <div>
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">✨</div>
                <div className="empty-text">Уведомлений нет</div>
              </div>
            ) : (
              <>
                <div className="notif-list">
                  {filtered.map(n => (
                    <div key={n.id} className={`notif-item ${n.unread ? "unread" : ""}`}>
                      <div className={`notif-icon ${n.type}`}>{n.icon}</div>
                      <div className="notif-content">
                        <div className="notif-title">{n.title}</div>
                        <div className="notif-text">{n.text}</div>
                        <div className="notif-meta">
                          <span className="notif-time">{n.time}</span>
                          {n.type === "msg" && <button className="notif-action" onClick={() => { window.goTo("chat"); showToast("Открываем чат..."); }}>Ответить</button>}
                          {n.type === "review" && <button className="notif-action" onClick={() => showToast("Открываем отзыв...")}>Оценить</button>}
                          {n.type === "like" && <button className="notif-action" onClick={() => window.goTo("search")}>Смотреть</button>}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexDirection: "column", alignItems: "center" }}>
                        {n.unread && (
                          <button style={{ background: "none", border: "none", color: "var(--emerald)", cursor: "pointer", fontSize: 12, fontWeight: 700 }} onClick={() => markAsRead(n.id)}>
                            Прочитано
                          </button>
                        )}
                        <button style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12 }} onClick={() => deleteNotif(n.id)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {unreadCount > 0 && (
                  <div className="mark-all">
                    <button className="mark-all-btn" onClick={markAllAsRead}>
                      ✓ Отметить все как прочитанные
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
