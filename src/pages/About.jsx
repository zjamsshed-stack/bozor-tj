import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}

.header{background:rgba(15,25,35,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:0 20px;height:62px;display:flex;align-items:center;}
.logo{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:900;color:var(--emerald);}
.logo span{color:var(--text);}
.btn-back{background:transparent;border:1.5px solid var(--border);color:var(--text);padding:9px 16px;border-radius:10px;font-family:'Golos Text',sans-serif;font-weight:600;font-size:13px;cursor:pointer;}
.btn-back:hover{border-color:var(--emerald);color:var(--emerald);}

.page{max-width:900px;margin:0 auto;padding:40px 20px;}
.hero{text-align:center;margin-bottom:60px;}
.hero-title{font-family:'Unbounded',sans-serif;font-size:42px;font-weight:900;line-height:1.2;margin-bottom:14px;}
.hero-title .accent{color:var(--emerald);}
.hero-sub{font-size:16px;color:var(--muted);line-height:1.7;max-width:600px;margin:0 auto;}

.tabs{display:flex;gap:2px;margin-bottom:28px;border-bottom:1px solid var(--border);padding-bottom:0;}
.tab{padding:14px 20px;border:none;background:none;font-family:'Golos Text',sans-serif;font-weight:600;font-size:14px;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:all 0.2s;}
.tab:hover{color:var(--text);}
.tab.active{color:var(--emerald);border-bottom-color:var(--emerald);}

.content{display:none;}
.content.active{display:block;}

.section{margin-bottom:36px;}
.section-title{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:700;margin-bottom:16px;color:var(--emerald);}
.section-text{font-size:14px;line-height:1.8;color:rgba(237,242,247,0.85);margin-bottom:12px;}
.section-list{list-style:none;margin:16px 0;}
.section-list li{padding:10px 0;padding-left:28px;position:relative;font-size:14px;color:rgba(237,242,247,0.85);line-height:1.6;}
.section-list li::before{content:'✓';position:absolute;left:0;color:var(--emerald);font-weight:700;}

.card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;margin-bottom:18px;}
.card-title{font-family:'Unbounded',sans-serif;font-size:16px;font-weight:700;margin-bottom:10px;}
.card-text{font-size:13px;color:var(--muted);line-height:1.7;}

.faq{display:flex;flex-direction:column;gap:12px;}
.faq-item{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;cursor:pointer;}
.faq-question{padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;}
.faq-q{font-weight:600;font-size:14px;}
.faq-icon{font-size:18px;transition:transform 0.2s;}
.faq-item.open .faq-icon{transform:rotate(180deg);}
.faq-answer{padding:0 16px;max-height:0;overflow:hidden;transition:all 0.3s;font-size:13px;color:var(--muted);line-height:1.7;}
.faq-item.open .faq-answer{padding:0 16px 16px;max-height:500px;}

.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:28px 0;}
.stat{background:var(--card2);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:center;}
.stat-num{font-family:'Unbounded',sans-serif;font-size:28px;font-weight:700;color:var(--emerald);margin-bottom:6px;}
.stat-label{font-size:12px;color:var(--muted);}

.team{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin:28px 0;}
.team-member{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:center;}
.team-avatar{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--emerald),#00E5AD);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:#0F1923;margin:0 auto 12px;}
.team-name{font-weight:700;font-size:14px;margin-bottom:3px;}
.team-role{font-size:12px;color:var(--muted);}

@media(max-width:640px){
  .page{padding:24px 16px;}
  .hero-title{font-size:28px;}
  .tabs{flex-wrap:wrap;}
  .tab{padding:10px 14px;font-size:12px;}
}
`;

export default function About() {
  const [activeTab, setActiveTab] = useState("about");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  return (
    <div>
      <header className="header" style={{ justifyContent: "space-between" }}>
        <div className="logo">bozor<span>.tj</span></div>
        <button className="btn-back" onClick={() => window.goTo("home")}>← Назад</button>
      </header>

      <div className="page">
        <div className="hero">
          <h1 className="hero-title">О <span className="accent">Bozor.tj</span></h1>
          <p className="hero-sub">Лучшая доска объявлений Таджикистана. Узнай больше о нас, правилах и безопасности.</p>
        </div>

        <div className="tabs">
          {[["about", "🏪 О сайте"], ["rules", "📋 Правила"], ["safety", "🔒 Безопасность"], ["faq", "❓ Вопросы"]].map(([id, label]) => (
            <button key={id} className={`tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </div>

        {/* ABOUT */}
        <div className={`content ${activeTab === "about" ? "active" : ""}`}>
          <div className="section">
            <h2 className="section-title">🇹🇯 Кто мы?</h2>
            <p className="section-text">
              Bozor.tj — это молодой и быстрорастущий проект, созданный для таджикского народа. 
              Мы верим, что каждый должен иметь возможность легко и бесплатно продавать и покупать товары, 
              искать работу и предлагать услуги.
            </p>
            <p className="section-text">
              Наша миссия простая: сделать Таджикистан более связанным через цифровые технологии.
            </p>
          </div>

          <div className="stats">
            {[["360K+", "Объявлений"], ["120K+", "Пользователей"], ["18", "Городов"], ["24/7", "Доступен"]].map(([num, label]) => (
              <div key={label} className="stat">
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="section">
            <h2 className="section-title">💡 Почему Bozor.tj?</h2>
            <ul className="section-list">
              <li>100% Бесплатно — без скрытых платежей</li>
              <li>Для Таджикистана — все 18 городов</li>
              <li>Двуязычный — русский и таджикский</li>
              <li>Безопасный — проверенные пользователи</li>
              <li>Быстрый — найди что нужно за минуту</li>
              <li>Надёжный — помощь 24/7</li>
            </ul>
          </div>

          <div className="team">
            {[["Фируз Р.", "👨‍💻", "Основатель"], ["Алишер К.", "🎨", "Дизайнер"], ["Мадина С.", "📱", "PM"], ["Бахром Т.", "🔧", "Разработчик"]].map(([name, emoji, role]) => (
              <div key={name} className="team-member">
                <div className="team-avatar">{emoji}</div>
                <div className="team-name">{name}</div>
                <div className="team-role">{role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RULES */}
        <div className={`content ${activeTab === "rules" ? "active" : ""}`}>
          <div className="section">
            <h2 className="section-title">📋 Правила сайта</h2>
            <p className="section-text">Для безопасности и комфорта всех пользователей, пожалуйста, соблюдай эти правила:</p>
          </div>

          <div className="card">
            <div className="card-title">1. Честная информация</div>
            <div className="card-text">
              ✓ Описывай товары и услуги честно<br/>
              ✓ Выкладывай реальные фото<br/>
              ✓ Указывай правильную цену<br/>
              ✗ Не обманывай и не вводи в заблуждение
            </div>
          </div>

          <div className="card">
            <div className="card-title">2. Безопасность</div>
            <div className="card-text">
              ✓ Не делись личной информацией с незнакомцами<br/>
              ✓ Встречайся в людных местах<br/>
              ✓ Проверяй товар перед оплатой<br/>
              ✗ Не отправляй деньги раньше получения товара
            </div>
          </div>

          <div className="card">
            <div className="card-title">3. Уважение</div>
            <div className="card-text">
              ✓ Общайся вежливо и вежливо<br/>
              ✓ Отвечай на сообщения быстро<br/>
              ✓ Будь пунктуален на встречах<br/>
              ✗ Не оскорбляй и не угрожай другим
            </div>
          </div>

          <div className="card">
            <div className="card-title">4. Запрещённые товары</div>
            <div className="card-text">
              Нельзя продавать или покупать:<br/>
              ✗ Оружие и боеприпасы<br/>
              ✗ Наркотики и психотропные вещества<br/>
              ✗ Поддельные и контрафактные товары<br/>
              ✗ Украденное имущество<br/>
              ✗ Товары в ущерб здоровью<br/>
            </div>
          </div>

          <div className="card">
            <div className="card-title">5. Контакты</div>
            <div className="card-text">
              ✓ Ответь на все разумные вопросы<br/>
              ✓ Оставь рабочий номер телефона<br/>
              ✓ Будь доступен для общения<br/>
              ✗ Не просматривай контакты без причины
            </div>
          </div>
        </div>

        {/* SAFETY */}
        <div className={`content ${activeTab === "safety" ? "active" : ""}`}>
          <div className="section">
            <h2 className="section-title">🔒 Безопасность и защита</h2>
            <p className="section-text">Твоя безопасность — наш приоритет. Вот как мы защищаем тебя:</p>
          </div>

          <div className="card">
            <div className="card-title">🛡️ Защита данных</div>
            <div className="card-text">
              • Шифрование всех личных данных<br/>
              • HTTPS протокол для всех соединений<br/>
              • Регулярные проверки безопасности<br/>
              • Никогда не делимся данными с третьими лицами
            </div>
          </div>

          <div className="card">
            <div className="card-title">✓ Верификация пользователей</div>
            <div className="card-text">
              • Проверка по номеру телефона<br/>
              • Рейтинговая система (⭐ 1-5 звёзд)<br/>
              • Отзывы от других пользователей<br/>
              • Блокировка подозрительных аккаунтов
            </div>
          </div>

          <div className="card">
            <div className="card-title">📞 Если что-то пошло не так</div>
            <div className="card-text">
              • Система жалоб и модерации<br/>
              • Техподдержка отвечает 24/7<br/>
              • Блокировка мошенников<br/>
              • Возврат средств в спорных ситуациях
            </div>
          </div>

          <div className="card">
            <div className="card-title">💡 Советы безопасности</div>
            <div className="card-text">
              ✓ Никогда не отправляй деньги раньше получения товара<br/>
              ✓ Встречайся только в людных местах днём<br/>
              ✓ Проверь товар перед оплатой<br/>
              ✓ Не делись паролем и кодом подтверждения<br/>
              ✓ Сообщи нам о подозрительной активности
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className={`content ${activeTab === "faq" ? "active" : ""}`}>
          <div className="section">
            <h2 className="section-title">❓ Часто задаваемые вопросы</h2>
          </div>

          <div className="faq">
            {[
              { q: "Это действительно бесплатно?", a: "Да, 100% бесплатно! Нет скрытых платежей. Все функции доступны без оплаты." },
              { q: "Как я могу проверить продавца?", a: "Смотри его рейтинг (⭐), количество продаж и отзывы от других пользователей. Чем больше звёзд, тем надёжнее." },
              { q: "Могу ли я вернуть товар?", a: "Это решают сами покупатель и продавец. Рекомендуем договориться о возврате перед покупкой." },
              { q: "Как безопасно встретиться с продавцом?", a: "Встречайтесь в людных местах, днём, возьми с собой друга, проверь товар и только потом отдай деньги." },
              { q: "Что делать если меня обманули?", a: "Создай жалобу на странице объявления. Наша команда расследует и заблокирует мошенника." },
              { q: "Как долго объявление живёт?", a: "30 дней. Если нужно продлить, просто нажми кнопку 'Продлить' в своем кабинете." },
            ].map((item, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`} onClick={() => toggleFaq(i)}>
                <div className="faq-question">
                  <div className="faq-q">{item.q}</div>
                  <span className="faq-icon">▼</span>
                </div>
                <div className="faq-answer">{item.a}</div>
              </div>
            ))}
          </div>

          <div className="section" style={{ marginTop: 36 }}>
            <div className="card">
              <div className="card-title">Всё ещё есть вопросы?</div>
              <div className="card-text" style={{ marginBottom: 0 }}>
                Напиши нам на support@bozor.tj или в чат на сайте. Мы ответим в течение часа! 💪
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
