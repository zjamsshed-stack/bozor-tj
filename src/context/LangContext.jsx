import { createContext, useContext, useState } from "react";

const translations = {
  ru: {
    // NAV
    home: "Главная",
    profile: "Профиль",
    chat: "Чат",
    create: "Создать",
    map: "Карта",
    search: "Поиск",
    notifications: "Уведомления",
    messages: "Сообщения",
    settings: "Настройки",
    help: "Помощь",
    about: "О сайте",

    // COMMON
    back: "Назад",
    cancel: "Отмена",
    save: "Сохранить",
    delete: "Удалить",
    edit: "Редактировать",
    close: "Закрыть",
    yes: "Да",
    no: "Нет",
    ok: "ОК",
    seeAll: "Смотреть все",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",

    // HOME
    heroTitle: "Bozor.tj",
    heroSub: "Купи и продай всё в Таджикистане",
    searchPlaceholder: "Поиск товаров...",
    searchBtn: "Найти",
    cityLabel: "Город",
    allCities: "Все города",
    newAds: "Свежие объявления",
    categories: "Категории",
    freeTitle: "Всё бесплатно!",
    freeDesc: "Подавай объявления без ограничений",
    addAdBtn: "Подать объявление",
    newBadge: "Новое",

    // CATEGORIES
    transport: "Транспорт",
    realestate: "Недвижимость",
    electronics: "Электроника",
    jobs: "Работа",
    home_goods: "Для дома",
    clothes: "Одежда",
    kids: "Детский мир",
    services: "Услуги",
    hobby: "Хобби",
    animals: "Животные",
    business: "Бизнес",
    free: "Отдам даром",

    // CREATE MODAL
    createTitle: "Что публикуем?",
    createOpts: [
      { icon: "🚗", title: "Транспорт", desc: "Авто, мото, запчасти" },
      { icon: "🏠", title: "Недвижимость", desc: "Квартира, дом, аренда" },
      { icon: "📱", title: "Электроника", desc: "Телефон, ноутбук, гаджеты" },
      { icon: "💼", title: "Работа", desc: "Вакансия или резюме" },
      { icon: "🛋️", title: "Для дома", desc: "Мебель, техника, интерьер" },
      { icon: "📦", title: "Другое", desc: "Любой товар или услуга" },
    ],

    // AUTH
    login: "Войти",
    register: "Регистрация",
    email: "Email",
    password: "Пароль",
    phone: "Телефон",
    name: "Имя",
    confirmPassword: "Повтори пароль",
    forgotPassword: "Забыл пароль?",
    loginBtn: "Войти",
    registerBtn: "Создать аккаунт",
    welcomeBack: "Добро пожаловать!",
    createAccount: "Создать аккаунт",
    orLoginWith: "или войти через",

    // FOOTER
    footer: "© 2026 Bozor.tj — Доска объявлений Таджикистана",
  },

  tj: {
    // NAV
    home: "Сарҳаф",
    profile: "Профили",
    chat: "Гуфтугӯ",
    create: "Эълон",
    map: "Харита",
    search: "Ҷустуҷӯ",
    notifications: "Огоҳиҳо",
    messages: "Паёмҳо",
    settings: "Танзимот",
    help: "Кӯмак",
    about: "Дар бораи мо",

    // COMMON
    back: "Бозгашт",
    cancel: "Бекор кардан",
    save: "Захира кардан",
    delete: "Нест кардан",
    edit: "Таҳрир",
    close: "Пӯшидан",
    yes: "Бале",
    no: "Не",
    ok: "Хуб",
    seeAll: "Ҳамаашро бин",
    loading: "Боркунӣ...",
    error: "Хато",
    success: "Бомуваффақият",

    // HOME
    heroTitle: "Bozor.tj",
    heroSub: "Тоҷикистонда ҳама чизро харед ва фурӯшед",
    searchPlaceholder: "Ҷустуҷӯи мол...",
    searchBtn: "Ёфтан",
    cityLabel: "Шаҳр",
    allCities: "Ҳама шаҳрҳо",
    newAds: "Эълонҳои нав",
    categories: "Категорияҳо",
    freeTitle: "Ҳама чиз ройгон!",
    freeDesc: "Эълонҳоро бидуни маҳдудият гузоред",
    addAdBtn: "Эълон гузоштан",
    newBadge: "Нав",

    // CATEGORIES
    transport: "Нақлиёт",
    realestate: "Амвол",
    electronics: "Электроника",
    jobs: "Кор",
    home_goods: "Барои хона",
    clothes: "Либос",
    kids: "Олами кӯдак",
    services: "Хидматҳо",
    hobby: "Ҳаваскорӣ",
    animals: "Ҳайвонот",
    business: "Бизнес",
    free: "Ройгон медиҳам",

    // CREATE MODAL
    createTitle: "Чӣ нашр мекунем?",
    createOpts: [
      { icon: "🚗", title: "Нақлиёт", desc: "Мошин, мото, эҳтиёт қисмҳо" },
      { icon: "🏠", title: "Амвол", desc: "Хона, квартира, ижора" },
      { icon: "📱", title: "Электроника", desc: "Телефон, ноутбук, гаджетҳо" },
      { icon: "💼", title: "Кор", desc: "Вакансия ё резюме" },
      { icon: "🛋️", title: "Барои хона", desc: "Мебел, техника, интерьер" },
      { icon: "📦", title: "Дигар", desc: "Ҳар гуна мол ё хидмат" },
    ],

    // AUTH
    login: "Вуруд",
    register: "Бақайдгирӣ",
    email: "Почтаи электронӣ",
    password: "Рамзи убур",
    phone: "Телефон",
    name: "Ном",
    confirmPassword: "Рамзро такрор кун",
    forgotPassword: "Рамзро фаромӯш кардӣ?",
    loginBtn: "Вуруд",
    registerBtn: "Аккаунт сохтан",
    welcomeBack: "Хуш омадед!",
    createAccount: "Аккаунт сохтан",
    orLoginWith: "ё тавассути вуруд",

    // FOOTER
    footer: "© 2026 Bozor.tj — Огоҳиномаи Тоҷикистон",
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState("ru");
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export { translations };
export default LangContext;
