import { useState, useEffect, useRef } from "react";

const ME = { id: 1, name: "Фируз Рахимов", avatar: "Ф" };

const CHATS = [
  {
    id: 1,
    user: { id: 2, name: "Алишер Каримов", avatar: "А", online: true },
    ad: { title: "Toyota Camry 2022, белая", price: 185000, emoji: "🚗" },
    unread: 2,
    messages: [
      { id: 1, from: 2, text: "Салом! Машина ещё продаётся?", time: "10:14", date: "Сегодня" },
      { id: 2, from: 1, text: "Салом! Да, продаётся.", time: "10:16", date: "Сегодня" },
      { id: 3, from: 2, text: "Можно посмотреть сегодня вечером?", time: "10:17", date: "Сегодня" },
      { id: 4, from: 1, text: "Да, после 18:00 могу. Где вам удобно?", time: "10:20", date: "Сегодня" },
      { id: 5, from: 2, text: "Давайте у ТЦ Душанбе Сити, это удобно?", time: "10:22", date: "Сегодня" },
      { id: 6, from: 2, text: "И ещё — торг возможен?", time: "10:23", date: "Сегодня" },
    ],
  },
  {
    id: 2,
    user: { id: 3, name: "Мадина Саидова", avatar: "М", online: false },
    ad: { title: "iPhone 13 Pro, 256GB", price: 4200, emoji: "📱" },
    unread: 0,
    messages: [
      { id: 1, from: 3, text: "Здравствуйте, телефон в каком состоянии?", time: "Вчера", date: "Вчера" },
      { id: 2, from: 1, text: "Отличное, без царапин. Использовался 8 месяцев.", time: "Вчера", date: "Вчера" },
      { id: 3, from: 3, text: "Коробка и документы есть?", time: "Вчера", date: "Вчера" },
      { id: 4, from: 1, text: "Да, полный комплект — коробка, зарядка, чехол.", time: "Вчера", date: "Вчера" },
      { id: 5, from: 3, text: "Хорошо, подумаю и напишу вам.", time: "Вчера", date: "Вчера" },
    ],
  },
  {
    id: 3,
    user: { id: 4, name: "Бахром Турсунов", avatar: "Б", online: true },
    ad: { title: "Диван угловой, серый", price: 3200, emoji: "🛋️" },
    unread: 1,
    messages: [
      { id: 1, from: 4, text: "Привет! Диван ещё актуален?", time: "09:00", date: "Сегодня" },
      { id: 2, from: 4, text: "Можете скинуть ещё фото?", time: "09:01", date: "Сегодня" },
    ],
  },
  {
    id: 4,
    user: { id: 5, name: "Зарина Олимова", avatar: "З", online: false },
    ad: { title: "MacBook Pro M3", price: 14200, emoji: "💻" },
    unread: 0,
    messages: [
      { id: 1, from: 1, text: "Здравствуйте! Интересует ваш MacBook.", time: "Пн", date: "Понедельник" },
      { id: 2, from: 5, text: "Здравствуйте! Да, можем встретиться.", time: "Пн", date: "Понедельник" },
      { id: 3, from: 5, text: "Когда вам удобно?", time: "Пн", date: "Понедельник" },
    ],
  },
];

const QUICK_REPLIES = [
  "Ещё продаётся?",
  "Торг возможен?",
  "Можно посмотреть?",
  "Где находитесь?",
  "Отправите фото?",
  "Цена окончательная?",
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --gold:#FFD166;--red:#FF4D6D;--blue:#4E9CFF;
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
  --msg-me:linear-gradient(135deg,#00A87D,#00C896);
  --msg-other:#1C2B3A;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);height:100vh;overflow:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-thumb{background:var(--emerald2);border-radius:3px;}

/* HEADER */
.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;height:60px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn{padding:8px 16px;border-radius:9px;border:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
.btn-primary{background:var(--emerald);color:#0F1923;}
.btn-ghost{background:transparent;color:var(--text);border:1.5px solid var(--border);}
.btn-ghost:hover{border-color:var(--emerald);color:var(--emerald);}

/* LAYOUT */
.chat-layout{display:grid;grid-template-columns:320px 1fr;height:calc(100vh - 60px);}

/* SIDEBAR */
.chat-sidebar{background:var(--card2);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;}
.sidebar-head{padding:16px;border-bottom:1px solid var(--border);flex-shrink:0;}
.sidebar-title{font-family:'Unbounded',sans-serif;font-size:14px;font-weight:700;margin-bottom:12px;}
.search-box{display:flex;background:var(--card);border:1.5px solid var(--border);border-radius:10px;overflow:hidden;}
.search-box input{flex:1;padding:9px 12px;background:none;border:none;outline:none;color:var(--text);font-size:13px;font-family:'Golos Text',sans-serif;}
.search-box input::placeholder{color:var(--muted);}
.search-icon{padding:0 12px;color:var(--muted);display:flex;align-items:center;}

.chat-list{overflow-y:auto;flex:1;}
.chat-item{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;cursor:pointer;transition:background 0.15s;border-bottom:1px solid var(--border);position:relative;}
.chat-item:hover{background:rgba(255,255,255,0.03);}
.chat-item.active{background:var(--ebg);border-left:2px solid var(--emerald);}
.chat-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:18px;font-weight:700;color:#0F1923;flex-shrink:0;position:relative;}
.online-dot{position:absolute;bottom:1px;right:1px;width:11px;height:11px;border-radius:50%;background:#44D62C;border:2px solid var(--card2);}
.chat-info{flex:1;min-width:0;}
.chat-name{font-size:14px;font-weight:700;margin-bottom:2px;}
.chat-ad{font-size:11px;color:var(--emerald);font-weight:600;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-last{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-meta{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0;}
.chat-time{font-size:11px;color:var(--muted);}
.unread-badge{background:var(--emerald);color:#0F1923;font-size:11px;font-weight:700;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;}

/* MAIN CHAT */
.chat-main{display:flex;flex-direction:column;overflow:hidden;}

/* CHAT TOPBAR */
.chat-topbar{padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;flex-shrink:0;background:var(--card2);}
.chat-topbar-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700;color:#0F1923;position:relative;flex-shrink:0;}
.chat-topbar-info{flex:1;}
.chat-topbar-name{font-size:15px;font-weight:700;}
.chat-topbar-status{font-size:12px;color:var(--muted);}
.chat-topbar-status.online{color:#44D62C;}
.chat-topbar-actions{display:flex;gap:8px;}
.icon-btn{width:36px;height:36px;border-radius:9px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:all 0.15s;}
.icon-btn:hover{border-color:var(--emerald);}

/* AD BANNER */
.ad-banner{padding:10px 20px;background:var(--ebg);border-bottom:1px solid rgba(0,200,150,0.15);display:flex;align-items:center;gap:12px;flex-shrink:0;}
.ad-banner-emoji{font-size:24px;}
.ad-banner-info{flex:1;}
.ad-banner-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ad-banner-price{font-family:'Unbounded',sans-serif;font-size:13px;font-weight:700;color:var(--emerald);}
.ad-banner-btn{font-size:11px;font-weight:700;color:var(--emerald);background:none;border:1px solid rgba(0,200,150,0.3);padding:4px 10px;border-radius:7px;cursor:pointer;white-space:nowrap;}

/* MESSAGES */
.messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:4px;}
.date-sep{text-align:center;margin:12px 0;}
.date-sep span{background:var(--card);border:1px solid var(--border);padding:4px 14px;border-radius:20px;font-size:11px;color:var(--muted);}

.msg-row{display:flex;gap:8px;align-items:flex-end;margin-bottom:2px;}
.msg-row.me{flex-direction:row-reverse;}
.msg-row.me + .msg-row.me .msg-avatar,
.msg-row:not(.me) + .msg-row:not(.me) .msg-avatar{visibility:hidden;}
.msg-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--card),var(--card2));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;border:1px solid var(--border);}
.msg-avatar.me{background:linear-gradient(135deg,var(--emerald),#00E5AD);color:#0F1923;}

.bubble{max-width:65%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;position:relative;word-break:break-word;}
.bubble.other{background:var(--card);border-radius:4px 16px 16px 16px;}
.bubble.me{background:var(--msg-me);color:#0F1923;border-radius:16px 4px 16px 16px;}
.bubble-time{font-size:10px;margin-top:4px;text-align:right;opacity:0.6;}
.bubble.me .bubble-time{color:#0F1923;}
.bubble.other .bubble-time{color:var(--muted);}
.msg-status{font-size:12px;margin-left:3px;}

/* TYPING */
.typing-indicator{display:flex;align-items:center;gap:6px;padding:0 20px 8px;}
.typing-dots{display:flex;gap:3px;align-items:center;}
.typing-dot{width:7px;height:7px;border-radius:50%;background:var(--muted);animation:bounce 1.2s infinite;}
.typing-dot:nth-child(2){animation-delay:0.2s;}
.typing-dot:nth-child(3){animation-delay:0.4s;}
@keyframes bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-5px);}}
.typing-text{font-size:12px;color:var(--muted);}

/* QUICK REPLIES */
.quick-replies{padding:8px 20px 0;display:flex;gap:7px;overflow-x:auto;flex-shrink:0;}
.quick-replies::-webkit-scrollbar{display:none;}
.qr-btn{padding:6px 14px;border-radius:18px;border:1px solid var(--border);background:var(--card);color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.15s;font-family:'Golos Text',sans-serif;}
.qr-btn:hover{border-color:var(--emerald);color:var(--emerald);}

/* INPUT */
.chat-input-area{padding:12px 20px 16px;border-top:1px solid var(--border);flex-shrink:0;background:var(--card2);}
.input-row{display:flex;gap:10px;align-items:flex-end;}
.input-tools{display:flex;gap:6px;}
.tool-btn{width:38px;height:38px;border-radius:9px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;transition:all 0.15s;flex-shrink:0;}
.tool-btn:hover{border-color:var(--emerald);}
.input-box{flex:1;background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:10px 14px;color:var(--text);font-size:14px;outline:none;resize:none;font-family:'Golos Text',sans-serif;max-height:100px;min-height:40px;line-height:1.5;transition:border-color 0.2s;}
.input-box:focus{border-color:var(--emerald);}
.input-box::placeholder{color:var(--muted);}
.send-btn{width:42px;height:42px;border-radius:12px;background:var(--emerald);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all 0.2s;flex-shrink:0;}
.send-btn:hover{background:var(--emerald2);transform:scale(1.05);}
.send-btn:disabled{background:var(--card);opacity:0.5;cursor:not-allowed;transform:none;}

/* EMPTY STATE */
.chat-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--muted);}
.chat-empty-icon{font-size:64px;}
.chat-empty-title{font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700;color:var(--text);}
.chat-empty-sub{font-size:14px;text-align:center;max-width:320px;line-height:1.6;}

/* TOAST */
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:10px 20px;border-radius:10px;font-weight:700;font-size:13px;z-index:300;box-shadow:0 8px 24px rgba(0,200,150,0.3);animation:tin 0.3s ease;white-space:nowrap;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(8px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

@media(max-width:768px){
  .chat-layout{grid-template-columns:1fr;}
  .chat-sidebar{display:none;}
  .chat-sidebar.show{display:flex;position:fixed;inset:60px 0 0 0;z-index:50;width:100%;}
}
`;

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState(CHATS);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [toast, setToast] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, chats]);

  // Simulate typing response
  const simulateReply = (chatId) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replies = [
        "Хорошо, подумаю!",
        "Понял вас, спасибо.",
        "Договорились, увидимся!",
        "Ладно, напишу позже.",
        "Отлично! Жду вас.",
        "Можно немного уступить?",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const now = new Date();
      const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
      setChats(prev => prev.map(c => c.id === chatId ? {
        ...c,
        messages: [...c.messages, { id: Date.now(), from: c.user.id, text: reply, time, date: "Сегодня" }]
      } : c));
    }, 1500);
  };

  const sendMessage = (text = input.trim()) => {
    if (!text || !activeChat) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    setChats(prev => prev.map(c => c.id === activeChat ? {
      ...c,
      unread: 0,
      messages: [...c.messages, { id: Date.now(), from: ME.id, text, time, date: "Сегодня" }]
    } : c));
    setInput("");
    inputRef.current?.focus();
    setTimeout(() => simulateReply(activeChat), 500);
  };

  const openChat = (id) => {
    setActiveChat(id);
    setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const current = chats.find(c => c.id === activeChat);
  const filteredChats = chats.filter(c =>
    c.user.name.toLowerCase().includes(search.toLowerCase()) ||
    c.ad.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalUnread = chats.reduce((s, c) => s + c.unread, 0);

  // Group messages by date
  const groupedMessages = () => {
    if (!current) return [];
    const groups = [];
    let lastDate = null;
    current.messages.forEach(msg => {
      if (msg.date !== lastDate) {
        groups.push({ type: "date", date: msg.date });
        lastDate = msg.date;
      }
      groups.push({ type: "msg", ...msg });
    });
    return groups;
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh" }}>
      {/* HEADER */}
      <header className="header">
        <div className="logo">bozor<span>.tj</span></div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {totalUnread > 0 && (
            <div style={{ background:"var(--red)", color:"#fff", fontSize:12, fontWeight:700, padding:"2px 8px", borderRadius:10 }}>
              {totalUnread} новых
            </div>
          )}
          <button className="btn btn-primary" onClick={() => showToast("Открываем объявления...")}>
            ← Объявления
          </button>
        </div>
      </header>

      <div className="chat-layout">
        {/* SIDEBAR */}
        <div className="chat-sidebar">
          <div className="sidebar-head">
            <div className="sidebar-title">
              💬 Сообщения
              {totalUnread > 0 && <span style={{ marginLeft:8, background:"var(--red)", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 7px", borderRadius:10 }}>{totalUnread}</span>}
            </div>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input placeholder="Поиск диалогов..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="chat-list">
            {filteredChats.length === 0 ? (
              <div style={{ padding:30, textAlign:"center", color:"var(--muted)", fontSize:13 }}>
                Диалоги не найдены
              </div>
            ) : filteredChats.map(chat => {
              const last = chat.messages[chat.messages.length - 1];
              const isMe = last?.from === ME.id;
              return (
                <div key={chat.id} className={`chat-item ${activeChat === chat.id ? "active" : ""}`} onClick={() => openChat(chat.id)}>
                  <div className="chat-avatar">
                    {chat.user.avatar}
                    {chat.user.online && <div className="online-dot" />}
                  </div>
                  <div className="chat-info">
                    <div className="chat-name">{chat.user.name}</div>
                    <div className="chat-ad">{chat.ad.emoji} {chat.ad.title}</div>
                    <div className="chat-last">
                      {isMe && <span style={{ color:"var(--emerald)" }}>Вы: </span>}
                      {last?.text}
                    </div>
                  </div>
                  <div className="chat-meta">
                    <div className="chat-time">{last?.time}</div>
                    {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN */}
        <div className="chat-main">
          {!current ? (
            <div className="chat-empty">
              <div className="chat-empty-icon">💬</div>
              <div className="chat-empty-title">Выберите диалог</div>
              <div className="chat-empty-sub">Нажмите на диалог слева, чтобы начать общение с продавцом или покупателем</div>
            </div>
          ) : (
            <>
              {/* TOPBAR */}
              <div className="chat-topbar">
                <div className="chat-topbar-avatar">
                  {current.user.avatar}
                  {current.user.online && <div className="online-dot" />}
                </div>
                <div className="chat-topbar-info">
                  <div className="chat-topbar-name">{current.user.name}</div>
                  <div className={`chat-topbar-status ${current.user.online ? "online" : ""}`}>
                    {current.user.online ? "● Онлайн" : "Был(а) недавно"}
                  </div>
                </div>
                <div className="chat-topbar-actions">
                  <div className="icon-btn" title="Позвонить" onClick={() => showToast("Звонок — скоро!")}>📞</div>
                  <div className="icon-btn" title="Профиль" onClick={() => showToast("Открываем профиль...")}>👤</div>
                  <div className="icon-btn" title="Ещё" onClick={() => showToast("Меню чата...")}>⋮</div>
                </div>
              </div>

              {/* AD BANNER */}
              <div className="ad-banner">
                <div className="ad-banner-emoji">{current.ad.emoji}</div>
                <div className="ad-banner-info">
                  <div className="ad-banner-title">{current.ad.title}</div>
                  <div className="ad-banner-price">{current.ad.price.toLocaleString()} с.</div>
                </div>
                <button className="ad-banner-btn" onClick={() => showToast("Открываем объявление...")}>
                  Смотреть →
                </button>
              </div>

              {/* MESSAGES */}
              <div className="messages">
                {groupedMessages().map((item, i) =>
                  item.type === "date" ? (
                    <div key={`date-${i}`} className="date-sep">
                      <span>{item.date}</span>
                    </div>
                  ) : (
                    <div key={item.id} className={`msg-row ${item.from === ME.id ? "me" : ""}`}>
                      <div className={`msg-avatar ${item.from === ME.id ? "me" : ""}`}>
                        {item.from === ME.id ? ME.avatar : current.user.avatar}
                      </div>
                      <div className={`bubble ${item.from === ME.id ? "me" : "other"}`}>
                        {item.text}
                        <div className="bubble-time">
                          {item.time}
                          {item.from === ME.id && <span className="msg-status"> ✓✓</span>}
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* TYPING */}
                {typing && (
                  <div className="msg-row">
                    <div className="msg-avatar">{current.user.avatar}</div>
                    <div className="bubble other" style={{ padding:"12px 16px" }}>
                      <div className="typing-dots">
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                        <div className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* QUICK REPLIES */}
              <div className="quick-replies">
                {QUICK_REPLIES.map(q => (
                  <button key={q} className="qr-btn" onClick={() => sendMessage(q)}>{q}</button>
                ))}
              </div>

              {/* INPUT */}
              <div className="chat-input-area">
                <div className="input-row">
                  <div className="input-tools">
                    <div className="tool-btn" onClick={() => showToast("Прикрепить фото — скоро!")}>📎</div>
                    <div className="tool-btn" onClick={() => showToast("Геолокация — скоро!")}>📍</div>
                  </div>
                  <textarea
                    ref={inputRef}
                    className="input-box"
                    placeholder="Написать сообщение..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    rows={1}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button className="send-btn" disabled={!input.trim()} onClick={() => sendMessage()}>
                    ➤
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
