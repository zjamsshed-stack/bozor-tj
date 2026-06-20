import { useLang } from "../context/LangContext";

export default function CreateModal({ onClose, onSelect }) {
  const { t } = useLang();

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--card)",
          borderRadius: "24px 24px 0 0",
          width: "100%", maxWidth: "520px",
          padding: "20px 16px 36px",
          animation: "slideUp 0.3s cubic-bezier(0.34,1.4,0.64,1)",
        }}
      >
        {/* Handle */}
        <div style={{
          width: "40px", height: "4px",
          background: "var(--border)", borderRadius: "2px",
          margin: "0 auto 16px",
        }} />

        <div style={{
          fontFamily: "'Unbounded', sans-serif",
          fontSize: "16px", fontWeight: "700",
          marginBottom: "14px", textAlign: "center",
        }}>
          {t.createTitle}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {t.createOpts.map((opt, i) => (
            <div
              key={i}
              onClick={() => { onSelect?.(opt); onClose?.(); }}
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px", borderRadius: "14px",
                background: "var(--card2)",
                border: "1.5px solid var(--border)",
                cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--emerald)";
                e.currentTarget.style.background = "var(--ebg)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--card2)";
              }}
            >
              <span style={{ fontSize: "26px" }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "2px" }}>{opt.title}</div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>{opt.desc}</div>
              </div>
              <span style={{ color: "var(--muted)", fontSize: "18px" }}>›</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%", marginTop: "10px", padding: "14px",
            borderRadius: "14px", border: "1.5px solid var(--border)",
            background: "none", color: "var(--muted)",
            fontWeight: "700", fontSize: "13px", cursor: "pointer",
            fontFamily: "'Golos Text', sans-serif", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
