import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;900&family=Golos+Text:wght@400;500;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#0F1923;--card:#1C2B3A;--card2:#162130;
  --emerald:#00C896;--emerald2:#00A87D;--ebg:rgba(0,200,150,0.08);
  --text:#EDF2F7;--muted:#5A7A94;--border:rgba(255,255,255,0.08);--red:#FF4D6D;
}
body{font-family:'Golos Text',sans-serif;background:var(--bg);color:var(--text);}

.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(135deg,#0F1923 0%,#162130 100%);}
.auth-container{max-width:420px;width:100%;}
.auth-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:40px 28px;box-shadow:0 20px 60px rgba(0,0,0,0.4);}
.auth-logo{font-family:'Unbounded',sans-serif;font-size:28px;font-weight:900;color:var(--emerald);text-align:center;margin-bottom:8px;}
.auth-logo span{color:var(--text);}
.auth-title{font-family:'Unbounded',sans-serif;font-size:20px;font-weight:700;text-align:center;margin-bottom:8px;}
.auth-sub{font-size:13px;color:var(--muted);text-align:center;margin-bottom:28px;}
.form-group{margin-bottom:18px;}
.form-label{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:8px;}
.form-input{width:100%;padding:13px 16px;background:var(--card2);border:1.5px solid var(--border);border-radius:11px;color:var(--text);font-size:14px;outline:none;font-family:'Golos Text',sans-serif;transition:border-color 0.2s;}
.form-input:focus{border-color:var(--emerald);}
.form-input::placeholder{color:var(--muted);}
.form-checkbox{display:flex;align-items:center;gap:10px;margin-bottom:20px;}
.checkbox{width:20px;height:20px;border:1.5px solid var(--border);border-radius:6px;cursor:pointer;background:var(--card2);transition:all 0.2s;}
.checkbox.checked{background:var(--emerald);border-color:var(--emerald);}
.checkbox.checked::after{content:'✓';position:absolute;color:#0F1923;font-weight:700;font-size:12px;margin-left:4px;margin-top:-1px;}
.form-checkbox label{font-size:13px;cursor:pointer;color:var(--muted);}
.form-checkbox a{color:var(--emerald);text-decoration:none;}
.form-checkbox a:hover{text-decoration:underline;}
.btn{width:100%;padding:14px;border-radius:11px;border:none;font-family:'Golos Text',sans-serif;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-primary{background:var(--emerald);color:#0F1923;box-shadow:0 8px 24px rgba(0,200,150,0.3);}
.btn-primary:hover{background:var(--emerald2);transform:translateY(-2px);}
.btn-primary:active{transform:translateY(0);}
.divider{display:flex;align-items:center;gap:12px;margin:24px 0;color:var(--muted);}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:var(--border);}
.divider span{font-size:12px;}
.social-btns{display:flex;gap:10px;}
.social-btn{flex:1;padding:12px;border-radius:10px;border:1.5px solid var(--border);background:var(--card2);color:var(--text);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.social-btn:hover{border-color:var(--emerald);color:var(--emerald);}
.auth-footer{text-align:center;margin-top:20px;font-size:13px;color:var(--muted);}
.auth-footer a{color:var(--emerald);text-decoration:none;font-weight:600;}
.auth-footer a:hover{text-decoration:underline;}
.toggle-form{display:flex;gap:8px;margin-bottom:24px;}
.toggle-btn{flex:1;padding:10px;border:none;border-radius:9px;background:var(--card2);color:var(--muted);font-weight:600;font-size:13px;cursor:pointer;transition:all 0.2s;border-bottom:2px solid transparent;}
.toggle-btn.active{background:var(--ebg);color:var(--emerald);border-bottom-color:var(--emerald);}
.error{background:rgba(255,77,109,0.1);border:1px solid rgba(255,77,109,0.3);color:#FF4D6D;padding:12px 16px;border-radius:10px;font-size:13px;margin-bottom:16px;display:none;}
.error.show{display:block;}
.success{background:var(--ebg);border:1px solid rgba(0,200,150,0.3);color:var(--emerald);padding:12px 16px;border-radius:10px;font-size:13px;margin-bottom:16px;display:none;}
.success.show{display:block;}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--emerald);color:#0F1923;padding:12px 24px;border-radius:11px;font-weight:700;font-size:14px;z-index:300;box-shadow:0 8px 28px rgba(0,200,150,0.35);animation:slideUp 0.3s ease;}
@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
`;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", phone: "", name: "", confirm: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Заполни email и пароль");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Неверный email");
      return;
    }
    setSuccess("✅ Вход успешен!");
    showToast("Добро пожаловать!");
    setTimeout(() => { setSuccess(""); setFormData({ email: "", password: "", phone: "", name: "", confirm: "" }); }, 2000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirm) {
      setError("Заполни все поля");
      return;
    }
    if (formData.password.length < 6) {
      setError("Пароль минимум 6 символов");
      return;
    }
    if (formData.password !== formData.confirm) {
      setError("Пароли не совпадают");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Неверный email");
      return;
    }
    setSuccess("✅ Регистрация успешна! Добро пожаловать в Bozor.tj");
    showToast("Аккаунт создан!");
    setTimeout(() => { setSuccess(""); setFormData({ email: "", password: "", phone: "", name: "", confirm: "" }); }, 2000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">bozor<span>.tj</span></div>
          
          <div className="toggle-form">
            <button className={`toggle-btn ${isLogin ? "active" : ""}`} onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}>
              🔐 Вход
            </button>
            <button className={`toggle-btn ${!isLogin ? "active" : ""}`} onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}>
              ✍️ Регистрация
            </button>
          </div>

          {isLogin ? (
            <>
              <div className="auth-title">Добро пожаловать!</div>
              <div className="auth-sub">Войди в свой аккаунт</div>

              {error && <div className={`error ${error ? "show" : ""}`}>⚠️ {error}</div>}
              {success && <div className={`success ${success ? "show" : ""}`}>{success}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Пароль</label>
                  <input className="form-input" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ cursor: "pointer" }} />
                  <label htmlFor="remember">Запомнить меня</label>
                </div>

                <button type="submit" className="btn btn-primary">
                  🔓 Войти
                </button>
              </form>

              <div className="auth-footer">
                Забыл пароль? <a href="#" onClick={(e) => { e.preventDefault(); showToast("Восстановление пароля — скоро!"); }}>Восстановить</a>
              </div>
            </>
          ) : (
            <>
              <div className="auth-title">Создать аккаунт</div>
              <div className="auth-sub">Присоединись к Bozor.tj</div>

              {error && <div className={`error ${error ? "show" : ""}`}>⚠️ {error}</div>}
              {success && <div className={`success ${success ? "show" : ""}`}>{success}</div>}

              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="form-label">Имя и фамилия</label>
                  <input className="form-input" type="text" name="name" placeholder="Фируз Рахимов" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Телефон</label>
                  <input className="form-input" type="tel" name="phone" placeholder="+992 93 123-45-67" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Пароль</label>
                  <input className="form-input" type="password" name="password" placeholder="Минимум 6 символов" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Повтори пароль</label>
                  <input className="form-input" type="password" name="confirm" placeholder="Повтори пароль" value={formData.confirm} onChange={handleChange} />
                </div>

                <div className="form-checkbox" style={{ marginBottom: 20 }}>
                  <input type="checkbox" id="agree" defaultChecked style={{ cursor: "pointer" }} />
                  <label htmlFor="agree">
                    Я согласен с <a href="#" onClick={(e) => e.preventDefault()}>правилами</a> сайта
                  </label>
                </div>

                <button type="submit" className="btn btn-primary">
                  ✍️ Создать аккаунт
                </button>
              </form>
            </>
          )}

          <div className="divider"><span>или</span></div>

          <div className="social-btns">
            <button className="social-btn" onClick={() => showToast("Google — скоро!")}>🔤 Google</button>
            <button className="social-btn" onClick={() => showToast("Telegram — скоро!")}>✈️ Telegram</button>
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
