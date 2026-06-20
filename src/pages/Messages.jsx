import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn{background:transparent;border:1.5px solid var(--border);color:var(--text);padding:9px 16px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;}
.btn:hover{border-color:var(--emerald);color:var(--emerald);}

.page{max-width:1000px;margin:0 auto;padding:24px 20px;}
.layout{display:grid;grid-template-columns:300px 1fr;gap:20px;height:calc(100vh - 100px);}

/* SIDEBAR - Conversations */
.msg-sidebar{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;}
.sidebar-head{padding:16px;border-bottom:1px solid var(--border);}
.sidebar-search{display:flex;background:var(--card2);border:1.5px solid var(--border);border-radius:10px;overflow:hidden;}
.sidebar-search input{flex:1;padding:9px 12px;background:none;border:none;outline:none;color:var(--text);font-size:13px;}
.sidebar-search button{padding:0 12px;border:none;background:none;color:var(--muted);cursor:pointer;}

.conv-list{overflow-y:auto;flex:1;}
.conv-item{display:flex;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background 0.15s;align-items:center;}
.conv-item:hover{background:rgba(255,255,255,0.02);}
.conv-item.active{background:var(--ebg);}
.conv-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:18px;font-weight:700;color:#0F1923;flex-shrink:0;position:relative;}
.online-dot{width:10px;height:10px;background:#44D62C;border:2px solid var(--card);border-radius:50%;position:absolute;bottom:0;right:0;}
.conv-info{flex:1;min-width:0;}
.conv-name{font-weight:700;font-size:13px;margin-bottom:2px;}
.conv-last{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.conv-meta{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;}
.conv-time{font-size:10px;color:var(--muted);}
.unread-badge{width:16px;height:16px;background:var(--emerald);color:#0F1923;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;}

.empty-conv{text-align:center;padding:40px 20px;color:var(--muted);}
.empty-icon{font-size:42px;margin-bottom:10px;}

/* MAIN - Chat */
.msg-main{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;}

.msg-topbar{padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.msg-user-info{display:flex;align-items:center;gap:12px;}
.msg-user-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-size:16px;color:#0F1923;}
.msg-user-details h3{font-size:14px;font-weight:700;}
.msg-user-details p{font-size:11px;color:var(--muted);}
.msg-actions{display:flex;gap:8px;}
.msg-icon-btn{width:36px;height:36px;border-radius:9px;background:var(--card2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all 0.2s;}
.msg-icon-btn:hover{border-color:var(--emerald);}

.msg-history{overflow-y:auto;flex:1;padding:20px;display:flex;flex-direction:column;gap:12px;}
.msg-row{display:flex;gap:8px;margin-bottom:4px;}
.msg-row.me{flex-direction:row-reverse;}
.msg-avatar{width:32px;height:32px;border-radius:50%;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;border:1px solid var(--border);}
.msg-avatar.me{background:linear-gradient(135deg,var(--emerald),#00E5AD);color:#0F1923;}
.bubble{max-width:60%;padding:11px 14px;border-radius:14px;font-size:13px;line-height:1.5;word-break:break-word;}
.bubble.other{background:var(--card2);border-radius:4px 14px 14px 14px;}
.bubble.me{background:var(--emerald);color:#0F1923;border-radius:14px 4px 14px 14px;}
.msg-time{font-size:10px;color:var(--muted);margin-top:3px;text-align:right;}
.msg-row.me .msg-time{text-align:left;}

.msg-input-area{padding:14px 20px;border-top:1px solid var(--border);}
.msg-input-row{display:flex;gap:10px;align-items:flex-end;}
.msg-input-box{flex:1;background:var(--card2);border:1.5px solid var(--border);border-radius:12px;padding:10px 14px;color:var(--text);font-size:13px;outline:none;resize:none;max-height:100px;font-family:'Golos Text',sans-serif;}
.msg-input-box:focus{border-color:var(--emerald);}
.msg-send-btn{width:40px;height:40px;border-radius:11px;background:var(--emerald);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all 0.2s;flex-shrink:0;}
.msg-send-btn:hover{background:var(--emerald2);}

.empty-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);}
.empty-main-icon{font-size:56px;margin-bottom:14px;}

.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:12px 24px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);}

@media(max-width:860px){
  .layout{grid-template-columns:1fr;}
  .msg-sidebar{display:none;}
  .msg-sidebar.show{position:absolute;inset:60px 0 0 0;z-index:50;}
}
`;

const CONVERSATIONS = [
  { id:1, user:"Алишер К.", avatar:"А", online:true, last:"Машина ещё есть?", time:"5 мин", unread:2, ad:"Toyota Camry" },
  { id:2, user:"Мадина С.", avatar:"М", online:false, last:"Спасибо за быструю доставку!", time:"30 мин", unread:0, ad:"iPhone 13" },
  { id:3, user:"Бахром Т.", avatar:"Б", online:true, last:"Когда можно посмотреть?", time:"1 час", unread:1, ad:"Диван" },
  { id:4, user:"FiruzShop", avatar:"🏪", online:false, last:"Есть ещё в наличии?", time:"2 часа", unread:0, ad:"MacBook Pro" },
  { id:5, user:"Зарина О.", avatar:"З", online:true, last:"Окей, жду вас", time:"5 часов", unread:0, ad:"Детская коляска" },
];

export default function Messages() {
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([
    { id:1, from:"other", text:"Привет! Машина ещё продаётся?", time:"10:14" },
    { id:2, from:"me", text:"Да, продаётся. Состояние отличное.", time:"10:16" },
    { id:3, from:"other", text:"Когда можно посмотреть?", time:"10:17" },
    { id:4, from:"me", text:"После 18:00 могу. Где вам удобно?", time:"10:20" },
    { id:5, from:"other", text:"Давайте у ТЦ Душанбе Сити", time:"10:22" },
  ]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const conv = CONVERSATIONS.find(c => c.id === selected);
  const filtered = search ? CONVERSATIONS.filter(c => c.user.toLowerCase().includes(search.toLowerCase())) : CONVERSATIONS;

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    setMessages([...messages, { id: Date.now(), from: "me", text: input, time }]);
    setInput("");
    setTimeout(() => {
      const replies = ["Ок, спасибо!", "Согласен!", "Хорошо, жду!", "Звучит классно!"];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, { id: Date.now(), from: "other", text: reply, time }]);
    }, 1000);
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
          <div className="msg-sidebar">
            <div className="sidebar-head">
              <div className="sidebar-search">
                <input placeholder="Поиск по диалогам..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <button>🔍</button>
              </div>
            </div>
            <div className="conv-list">
              {filtered.length === 0 ? (
                <div className="empty-conv">
                  <div className="empty-icon">💬</div>
                  <div>Диалогов не найдено</div>
                </div>
              ) : filtered.map(c => (
                <div key={c.id} className={`conv-item ${selected === c.id ? "active" : ""}`} onClick={() => setSelected(c.id)}>
                  <div className="conv-avatar">
                    {c.avatar}
                    {c.online && <div className="online-dot" />}
                  </div>
                  <div className="conv-info">
                    <div className="conv-name">{c.user}</div>
                    <div className="conv-last">{c.last}</div>
                  </div>
                  <div className="conv-meta">
                    <div className="conv-time">{c.time}</div>
                    {c.unread > 0 && <div className="unread-badge">{c.unread}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN */}
          <div className="msg-main">
            {!conv ? (
              <div className="empty-main">
                <div className="empty-main-icon">💬</div>
                <div>Выбери диалог</div>
              </div>
            ) : (
              <>
                <div className="msg-topbar">
                  <div className="msg-user-info">
                    <div className="msg-user-avatar">{conv.avatar}</div>
                    <div className="msg-user-details">
                      <h3>{conv.user}</h3>
                      <p>{conv.online ? "● Онлайн" : "Был(а) недавно"}</p>
                    </div>
                  </div>
                  <div className="msg-actions">
                    <div className="msg-icon-btn" onClick={() => showToast("📞 Звонок...")}>📞</div>
                    <div className="msg-icon-btn" onClick={() => showToast("ℹ️ Профиль...")}>ℹ️</div>
                    <div className="msg-icon-btn" onClick={() => showToast("⋮ Меню...")}>⋮</div>
                  </div>
                </div>

                <div className="msg-history">
                  {messages.map(m => (
                    <div key={m.id} className={`msg-row ${m.from === "me" ? "me" : ""}`}>
                      <div className={`msg-avatar ${m.from === "me" ? "me" : ""}`}>
                        {m.from === "me" ? "Я" : conv.avatar}
                      </div>
                      <div>
                        <div className={`bubble ${m.from === "me" ? "me" : "other"}`}>{m.text}</div>
                        <div className="msg-time">{m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="msg-input-area">
                  <div className="msg-input-row">
                    <textarea 
                      className="msg-input-box" 
                      placeholder="Напиши сообщение..."
                      value={input} 
                      onChange={(e) => setInput(e.target.value)}
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <button className="msg-send-btn" onClick={sendMessage}>➤</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
