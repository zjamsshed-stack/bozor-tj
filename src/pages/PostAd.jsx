import { useState, useEffect, useRef } from "react";
import { useLang } from "../context/LangContext";
import { useRouter } from "../context/RouterContext";

const CITIES = ["Душанбе","Худжанд","Куляб","Бохтар","Хорог","Истаравшан","Турсунзаде","Нурек","Вахдат","Гиссар","Пенджикент","Канибадам","Исфара","Бустон","Гулистон","Истиклол","Левакант","Рогун"];

const T = {
  ru: {
    title: "Новое объявление",
    sub: "Заполни поля — это займёт 2 минуты",
    photos: "Фотографии",
    photosHint: "До 10 фото. Первое фото будет на обложке",
    addPhoto: "Добавить",
    adTitle: "Заголовок объявления",
    adTitlePh: "Например: Toyota Camry 2023, белая",
    desc: "Описание",
    descPh: "Расскажи подробнее о товаре: состояние, особенности, причина продажи...",
    price: "Цена",
    pricePh: "0",
    free: "Бесплатно (отдам даром)",
    city: "Город",
    selectCity: "Выбери город",
    phone: "Телефон для связи",
    phonePh: "+992 __ ___-__-__",
    submit: "Опубликовать объявление",
    required: "Обязательно для заполнения",
    successTitle: "Готово! 🎉",
    successText: "Объявление отправлено и появится на сайте после быстрой проверки",
    backHome: "На главную",
    category: "Категория",
    changeCategory: "Изменить",
    errorFill: "Заполни все обязательные поля",
  },
  tj: {
    title: "Эълони нав",
    sub: "Майдонҳоро пур кун — 2 дақиқа вақт мегирад",
    photos: "Аксҳо",
    photosHint: "То 10 акс. Акси якум муқова мешавад",
    addPhoto: "Илова кардан",
    adTitle: "Сарлавҳаи эълон",
    adTitlePh: "Масалан: Toyota Camry 2023, сафед",
    desc: "Тавсиф",
    descPh: "Дар бораи мол муфассал нависед: ҳолат, хусусиятҳо, сабаби фурӯш...",
    price: "Нарх",
    pricePh: "0",
    free: "Ройгон (медиҳам)",
    city: "Шаҳр",
    selectCity: "Шаҳрро интихоб кун",
    phone: "Телефон барои тамос",
    phonePh: "+992 __ ___-__-__",
    submit: "Эълонро нашр кардан",
    required: "Пуркунӣ ҳатмист",
    successTitle: "Тайёр! 🎉",
    successText: "Эълон фиристода шуд ва пас аз тафтиши зуд дар сайт пайдо мешавад",
    backHome: "Ба сарҳафа",
    category: "Категория",
    changeCategory: "Иваз кардан",
    errorFill: "Ҳама майдонҳои ҳатмиро пур кунед",
  },
};

const css = `
.postad-page{max-width:560px;margin:0 auto;padding:20px 16px 40px;}
.postad-cat-badge{display:flex;align-items:center;gap:10px;background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:20px;}
.postad-cat-icon{font-size:28px;}
.postad-cat-info{flex:1;}
.postad-cat-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.3px;}
.postad-cat-name{font-size:15px;font-weight:700;}
.postad-cat-change{background:none;border:1.5px solid var(--border);color:var(--muted);padding:7px 12px;border-radius:9px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.postad-cat-change:hover{border-color:var(--emerald);color:var(--emerald);}

.postad-title{font-family:'Unbounded',sans-serif;font-size:22px;font-weight:800;margin-bottom:4px;}
.postad-sub{font-size:13px;color:var(--muted);margin-bottom:24px;}

.postad-group{margin-bottom:20px;}
.postad-label{display:block;font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.3px;margin-bottom:8px;}
.postad-label .req{color:var(--red);}
.postad-hint{font-size:11px;color:var(--muted);margin-top:6px;}

.postad-photos{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.postad-photo-slot{aspect-ratio:1;border-radius:12px;border:1.5px dashed var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;background:var(--card2);transition:all 0.2s;position:relative;overflow:hidden;font-size:22px;color:var(--muted);}
.postad-photo-slot:hover{border-color:var(--emerald);color:var(--emerald);}
.postad-photo-slot img{width:100%;height:100%;object-fit:cover;}
.postad-photo-remove{position:absolute;top:3px;right:3px;width:18px;height:18px;background:rgba(0,0,0,0.7);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;}
.postad-photo-cover{position:absolute;bottom:3px;left:3px;background:var(--emerald);color:#0F1923;font-size:8px;font-weight:700;padding:1px 5px;border-radius:4px;}

.postad-price-row{display:flex;gap:10px;align-items:center;}
.postad-free-check{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;color:var(--muted);cursor:pointer;}

.postad-submit-wrap{position:sticky;bottom:0;background:var(--bg);padding:16px 0 4px;margin-top:8px;}
.postad-error{background:rgba(255,77,109,0.1);border:1px solid rgba(255,77,109,0.3);color:var(--red);padding:11px 14px;border-radius:10px;font-size:13px;margin-bottom:14px;}

.postad-success{text-align:center;padding:60px 20px;}
.postad-success-icon{font-size:64px;margin-bottom:16px;animation:bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1);}
@keyframes bounceIn{from{opacity:0;transform:scale(0.5);}to{opacity:1;transform:scale(1);}}
.postad-success-title{font-family:'Unbounded',sans-serif;font-size:22px;font-weight:800;color:var(--emerald);margin-bottom:10px;}
.postad-success-text{font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:24px;}
`;

export default function PostAd() {
  const { lang, t: tGlobal } = useLang();
  const { params, goTo } = useRouter();
  const t = T[lang];
  const fileRef = useRef(null);

  const categoryIcon = params?.icon || "📦";
  const categoryName = params?.categoryLabel || (lang === "ru" ? "Другое" : "Дигар");

  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  const handlePhotoAdd = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 10 - photos.length);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotos(prev => [...prev, ev.target.result].slice(0, 10));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removePhoto = (idx) => setPhotos(photos.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    if (!title.trim() || !city || !phone.trim() || (!isFree && !price)) {
      setError(t.errorFill);
      return;
    }
    setError("");
    setSuccess(true);
    window.scrollTo(0, 0);
  };

  if (success) {
    return (
      <div className="postad-page">
        <div className="postad-success">
          <div className="postad-success-icon">🎉</div>
          <div className="postad-success-title">{t.successTitle}</div>
          <div className="postad-success-text">{t.successText}</div>
          <button className="btn btn-primary btn-full" onClick={() => goTo("home")}>
            {t.backHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="postad-page">
      <div className="postad-cat-badge">
        <div className="postad-cat-icon">{categoryIcon}</div>
        <div className="postad-cat-info">
          <div className="postad-cat-label">{t.category}</div>
          <div className="postad-cat-name">{categoryName}</div>
        </div>
        <button className="postad-cat-change" onClick={() => goTo("home")}>{t.changeCategory}</button>
      </div>

      <div className="postad-title">{t.title}</div>
      <div className="postad-sub">{t.sub}</div>

      {error && <div className="postad-error">⚠️ {error}</div>}

      {/* PHOTOS */}
      <div className="postad-group">
        <label className="postad-label">{t.photos}</label>
        <div className="postad-photos">
          {photos.map((p, i) => (
            <div key={i} className="postad-photo-slot">
              <img src={p} alt="" />
              {i === 0 && <span className="postad-photo-cover">{lang === "ru" ? "Обложка" : "Муқова"}</span>}
              <div className="postad-photo-remove" onClick={() => removePhoto(i)}>✕</div>
            </div>
          ))}
          {photos.length < 10 && (
            <div className="postad-photo-slot" onClick={() => fileRef.current?.click()}>
              📷
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handlePhotoAdd} />
        <div className="postad-hint">{t.photosHint}</div>
      </div>

      {/* TITLE */}
      <div className="postad-group">
        <label className="postad-label">{t.adTitle} <span className="req">*</span></label>
        <input className="input" placeholder={t.adTitlePh} value={title} onChange={e => setTitle(e.target.value)} maxLength={80} />
      </div>

      {/* DESCRIPTION */}
      <div className="postad-group">
        <label className="postad-label">{t.desc}</label>
        <textarea className="input" placeholder={t.descPh} value={desc} onChange={e => setDesc(e.target.value)} rows={5} style={{ resize: "vertical", minHeight: 100 }} />
      </div>

      {/* PRICE */}
      <div className="postad-group">
        <label className="postad-label">{t.price} <span className="req">*</span></label>
        <div className="postad-price-row">
          <input
            className="input" type="number" placeholder={t.pricePh}
            value={price} onChange={e => setPrice(e.target.value)}
            disabled={isFree}
            style={{ opacity: isFree ? 0.5 : 1 }}
          />
          <span style={{ color: "var(--muted)", fontWeight: 600, flexShrink: 0 }}>с.</span>
        </div>
        <label className="postad-free-check">
          <input type="checkbox" checked={isFree} onChange={e => { setIsFree(e.target.checked); if (e.target.checked) setPrice(""); }} />
          {t.free}
        </label>
      </div>

      {/* CITY */}
      <div className="postad-group">
        <label className="postad-label">{t.city} <span className="req">*</span></label>
        <select className="input" value={city} onChange={e => setCity(e.target.value)}>
          <option value="">{t.selectCity}</option>
          {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* PHONE */}
      <div className="postad-group">
        <label className="postad-label">{t.phone} <span className="req">*</span></label>
        <input className="input" type="tel" placeholder={t.phonePh} value={phone} onChange={e => setPhone(e.target.value)} />
      </div>

      <div className="postad-submit-wrap">
        <button className="btn btn-primary btn-full" onClick={handleSubmit}>
          {t.submit}
        </button>
      </div>
    </div>
  );
}
