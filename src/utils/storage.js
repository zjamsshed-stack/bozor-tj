// Общий слой хранения для функций без бэкенда: история просмотров,
// подписки на продавцов, заблокированные пользователи, сохранённые поиски.
// Данные хранятся в localStorage браузера (переживают перезагрузку страницы).

const KEYS = {
  history: "bozor_view_history",
  following: "bozor_following_sellers",
  blocked: "bozor_blocked_users",
  savedSearches: "bozor_saved_searches",
};

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — тихо игнорируем
  }
}

// ===== ИСТОРИЯ ПРОСМОТРОВ =====
export function addToHistory(item) {
  let list = read(KEYS.history).filter(x => x.id !== item.id);
  list.unshift({ ...item, viewedAt: Date.now() });
  list = list.slice(0, 20);
  write(KEYS.history, list);
  return list;
}
export function getHistory() {
  return read(KEYS.history);
}
export function clearHistory() {
  write(KEYS.history, []);
}

// ===== ПОДПИСКА НА ПРОДАВЦОВ =====
export function isFollowing(sellerId) {
  return read(KEYS.following).some(s => s.id === sellerId);
}
export function toggleFollow(seller) {
  let list = read(KEYS.following);
  const exists = list.some(s => s.id === seller.id);
  list = exists ? list.filter(s => s.id !== seller.id) : [...list, seller];
  write(KEYS.following, list);
  return !exists;
}
export function getFollowing() {
  return read(KEYS.following);
}

// ===== ЗАБЛОКИРОВАННЫЕ ПОЛЬЗОВАТЕЛИ =====
export function isBlocked(userId) {
  return read(KEYS.blocked).includes(userId);
}
export function toggleBlock(userId) {
  let list = read(KEYS.blocked);
  const exists = list.includes(userId);
  list = exists ? list.filter(id => id !== userId) : [...list, userId];
  write(KEYS.blocked, list);
  return !exists;
}
export function getBlocked() {
  return read(KEYS.blocked);
}

// ===== СОХРАНЁННЫЕ ПОИСКИ =====
export function getSavedSearches() {
  return read(KEYS.savedSearches);
}
export function addSavedSearch(search) {
  const list = read(KEYS.savedSearches);
  list.unshift({ ...search, id: Date.now(), createdAt: Date.now() });
  write(KEYS.savedSearches, list);
  return list;
}
export function removeSavedSearch(id) {
  const list = read(KEYS.savedSearches).filter(s => s.id !== id);
  write(KEYS.savedSearches, list);
  return list;
}
