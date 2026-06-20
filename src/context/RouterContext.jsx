import { createContext, useContext, useState, useCallback } from "react";

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [params, setParams] = useState({});

  const goTo = useCallback((newPage, newParams = {}) => {
    setPage(newPage);
    setParams(newParams);
    setHistory(prev => [...prev, newPage]);
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setPage(newHistory[newHistory.length - 1]);
      window.scrollTo(0, 0);
    }
  }, [history]);

  // Глобальный доступ
  window.goTo = goTo;
  window.goBack = goBack;

  return (
    <RouterContext.Provider value={{ page, goTo, goBack, params, history }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

export default RouterContext;
