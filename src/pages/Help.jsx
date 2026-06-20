import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);--blue:#4E9CFF;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}

.header{background:rgba(15,25,35,0.97);border-bottom:1px solid var(--border);padding:0 20px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn{background:transparent;border:1.5px solid var(--border);color:var(--text);padding:9px 16px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;}
.btn:hover{border-color:var(--emerald);color:var(--emerald);}

.page{max-width:900px;margin:0 auto;padding:40px 20px;}
.hero{background:linear-gradient(135deg,#0D2318,#162130);border:1px solid rgba(0,200,150,0.2);border-radius:20px;padding:40px;text-align:center;margin-bottom:40px;}
.hero-title{font-family:'Unbounded',sans-serif;font-size:36px;font-weight:900;color:var(--emerald);margin-bottom:10px;}
.hero-sub{font-size:15px;color:var(--muted);line-height:1.6;}

.search-box{display:flex;gap:10px;margin-bottom:40px;}
.search-input{flex:1;background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:13px 16px;color:var(--text);font-size:14px;outline:none;font-family:'Golos Text',sans-serif;}
.search-input:focus{border-color:var(--emerald);}
.search-btn{background:var(--emerald);color:#0F1923;border:none;padding:13px 28px;border-radius:12px;font-weight:700;font-size:14px;cursor:pointer;}
.search-btn:hover{background:var(--emerald2);}

.categories{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:40px;}
.cat-btn{background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all 0.2s;font-size:13px;font-weight:600;}
.cat-btn:hover{border-color:var(--emerald);background:var(--ebg);}
.cat-icon{font-size:24px;margin-bottom:6px;}

.articles{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;}
.article{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;cursor:pointer;transition:all 0.2s;}
.article:hover{border-color:var(--emerald);transform:translateY(-2px);}
.article-icon{font-size:32px;margin-bottom:10px;}
.article-title{font-family:'Unbounded',sans-serif;font-size:15px;font-weight:700;margin-bottom:8px;}
.article-text{font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:12px;}
.article-link{color:var(--emerald);font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px;}

.guide{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;margin:20px 0;}
.guide-step{display:flex;gap:16px;margin-bottom:18px;}
.guide-num{width:32px;height:32px;background:var(--emerald);color:#0F1923;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;}
.guide-content{flex:1;}
.guide-title{font-weight:700;margin-bottom:4px;}
.guide-text{font-size:13px;color:var(--muted);}

.contact-section{background:linear-gradient(135deg,#0D2318,#162130);border:1px solid rgba(0,200,150,0.2);border-radius:16px;padding:28px;text-align:center;margin-top:40px;}
.contact-title{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:700;margin-bottom:14px;}
.contact-text{font-size:14px;color:var(--muted);margin-bottom:18px;line-height:1.6;}
.contact-buttons{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
.contact-btn{padding:11px 20px;border-radius:10px;border:none;font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;}
.cb-email{background:var(--emerald);color:#0F1923;}
.cb-email:hover{background:var(--emerald2);}
.cb-chat{background:var(--blue);color:#fff;}
.cb-chat:hover{background:#3a7fbf;}
.cb-phone{background:var(--card);border:1.5px solid var(--border);color:var(--text);}
.cb-phone:hover{border-color:var(--emerald);}

.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:12px 24px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);}

@media(max-width:640px){
  .page{padding:24px 16px;}
  .hero{padding:24px;}
  .hero-title{font-size:24px;}
}
`;

export default function Help() {
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const articles = [
    { icon: "🏪", title: "Как подать объявление", text: "Пошаговая инструкция для новичков. Всё просто и быстро!", cat: "Новичкам" },
    { icon: "🔍", title: "Как найти нужный товар", text: "Используй фильтры и поиск, чтобы найти точно то что нужно", cat: "Покупателям" },
    { icon: "💬", title: "Как общаться в чате", text: "Советы по безопасному общению и переговорам", cat: "Безопасность" },
    { icon: "👤", title: "Настройка профиля", text: "Заполни свой профиль, добавь аватар и проверку", cat: "Профиль" },
    { icon: "⭐", title: "Как получить 5 звёзд", text: "Советы продавцов о том как завоевать доверие", cat: "Продавцам" },
    { icon: "📦", title: "Способы доставки", text: "Самовывоз, почта, курьер - выбери удобный способ", cat: "Доставка" },
    { icon: "🚫", title: "Как избежать мошенников", text: "Практические советы по защите от обмана", cat: "Безопасность" },
    { icon: "💰", title: "Способы оплаты", text: "Наличные, переводы, электронные кошельки", cat: "Платежи" },
  ];

  const categories = ["Все", "Новичкам", "Покупателям", "Продавцам", "Безопасность", "Технические"];

  return (
    <div>
      <header className="header">
        <div className="logo">bozor<span>.tj</span></div>
        <button className="btn" onClick={() => window.goTo("home")}>← Назад</button>
      </header>

      <div className="page">
        <div className="hero">
          <div className="hero-title">📚 Справка</div>
          <div className="hero-sub">Найди ответы на все вопросы о Bozor.tj. Мы здесь, чтобы помочь!</div>
        </div>

        <div className="search-box">
          <input className="search-input" type="text" placeholder="Поиск по статьям..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="search-btn" onClick={() => showToast("Поиск: " + (search || "введи вопрос"))}>🔍 Найти</button>
        </div>

        <div className="categories">
          {categories.map(cat => (
            <button key={cat} className="cat-btn" onClick={() => showToast("Категория: " + cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="articles">
          {articles.map((a, i) => (
            <div key={i} className="article" onClick={() => showToast("📖 " + a.title)}>
              <div className="article-icon">{a.icon}</div>
              <div className="article-title">{a.title}</div>
              <div className="article-text">{a.text}</div>
              <div className="article-link">Читать →</div>
            </div>
          ))}
        </div>

        <div className="guide">
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: "var(--emerald)" }}>🎯 Быстрый старт (3 шага)</div>
          
          <div className="guide-step">
            <div className="guide-num">1</div>
            <div className="guide-content">
              <div className="guide-title">Создать аккаунт</div>
              <div className="guide-text">Зарегистрируйся с телефоном и email. Это займёт 2 минуты!</div>
            </div>
          </div>

          <div className="guide-step">
            <div className="guide-num">2</div>
            <div className="guide-content">
              <div className="guide-title">Подать объявление или найти товар</div>
              <div className="guide-text">Нажми "+ Подать объявление" или используй поиск для покупки</div>
            </div>
          </div>

          <div className="guide-step">
            <div className="guide-num">3</div>
            <div className="guide-content">
              <div className="guide-title">Общайся и договаривайся</div>
              <div className="guide-text">Чат встроен в каждое объявление. Быстро договоритесь о сделке!</div>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <div className="contact-title">🤝 Всё ещё нужна помощь?</div>
          <div className="contact-text">Наша команда поддержки ответит в течение часа. Мы здесь для тебя 24/7!</div>
          <div className="contact-buttons">
            <button className="contact-btn cb-email" onClick={() => showToast("📧 support@bozor.tj")}>📧 Email</button>
            <button className="contact-btn cb-chat" onClick={() => window.goTo("chat")}>💬 Чат</button>
            <button className="contact-btn cb-phone" onClick={() => showToast("☎️ +992 93 123-45-67")}>☎️ Позвонить</button>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
