import { useLang } from "../context/LangContext";
import { useRouter } from "../context/RouterContext";

export default function BottomNav({ onCreateClick }) {
  const { t } = useLang();
  const { page, goTo } = useRouter();

  const items = [
    { id: "home",    icon: "🏠", label: t.home },
    { id: "search",  icon: "🔍", label: t.search },
    { id: "create",  icon: "➕", label: t.create, special: true },
    { id: "map",     icon: "🗺️", label: t.map },
    { id: "profile", icon: "👤", label: t.profile },
  ];

  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(15,25,35,0.97)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid var(--border)",
      height: "var(--nav-h)",
      display: "flex", alignItems: "center",
      justifyContent: "space-around", padding: "0 4px",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {items.map(item => {
        const isActive = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => item.special ? onCreateClick?.() : goTo(item.id)}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "3px",
              padding: "6px 10px", borderRadius: "14px",
              border: "none", background: "none",
              color: isActive ? "var(--emerald)" : "var(--muted)",
              cursor: "pointer", transition: "all 0.2s",
              flex: 1, fontFamily: "'Golos Text', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(0.95)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              width: item.special ? "42px" : "36px",
              height: item.special ? "42px" : "36px",
              borderRadius: item.special ? "14px" : "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: item.special ? "22px" : "20px",
              background: item.special
                ? "var(--emerald)"
                : isActive ? "var(--ebg)" : "transparent",
              color: item.special ? "#0F1923" : "inherit",
              boxShadow: item.special ? "var(--shadow-emerald)" : "none",
              transform: isActive && !item.special ? "translateY(-2px)" : "none",
              transition: "all 0.2s",
            }}>
              {item.icon}
            </div>
            <span style={{
              fontSize: "9px", fontWeight: "700",
              letterSpacing: "0.2px",
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
