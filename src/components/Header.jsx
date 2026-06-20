import { useLang } from "../context/LangContext";
import { useRouter } from "../context/RouterContext";

export default function Header({ unread = 0, onNotifClick }) {
  const { lang, setLang, t } = useLang();
  const { goTo } = useRouter();

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(15,25,35,0.97)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
      height: "var(--header-h)",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px", gap: "8px",
    }}>
      {/* LOGO */}
      <div
        onClick={() => goTo("home")}
        style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: "20px", fontWeight: "900",
          color: "var(--emerald)", cursor: "pointer",
          whiteSpace: "nowrap", flexShrink: 0,
        }}
      >
        bozor<span style={{ color: "var(--text)" }}>.tj</span>
      </div>

      {/* SEARCH */}
      <div
        onClick={() => goTo("search")}
        style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "var(--card2)",
          border: "1.5px solid var(--border)",
          borderRadius: "10px", padding: "0 12px",
          height: "36px", cursor: "pointer",
          transition: "border-color 0.2s", minWidth: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--emerald)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
      >
        <span style={{
          fontSize: "12px", color: "var(--muted)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          🔍 {t.searchPlaceholder}
        </span>
      </div>

      {/* RIGHT SECTION */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
        {/* NOTIFICATIONS */}
        <div
          onClick={() => onNotifClick?.()}
          style={{
            position: "relative", width: "36px", height: "36px",
            borderRadius: "10px",
            background: "var(--card2)", border: "1.5px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: "16px", transition: "border-color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--emerald)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          🔔
          {unread > 0 && (
            <div style={{
              position: "absolute", top: "-4px", right: "-4px",
              background: "var(--red)", color: "#fff",
              fontSize: "9px", fontWeight: "700",
              width: "16px", height: "16px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid var(--bg)",
            }}>
              {unread > 9 ? "9+" : unread}
            </div>
          )}
        </div>

        {/* LANGUAGE */}
        <div style={{ display: "flex", gap: "4px" }}>
          {["ru", "tj"].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "5px 10px", borderRadius: "20px",
                border: `1.5px solid ${lang === l ? "var(--emerald)" : "var(--border)"}`,
                background: lang === l ? "var(--emerald)" : "transparent",
                color: lang === l ? "#0F1923" : "var(--muted)",
                fontWeight: "700", fontSize: "11px", cursor: "pointer",
                transition: "all 0.2s", fontFamily: "'Golos Text', sans-serif",
              }}
            >
              {l === "ru" ? "РУ" : "ТЧ"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
