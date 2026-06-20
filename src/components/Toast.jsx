export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", top: "68px", left: "50%",
      transform: "translateX(-50%)",
      background: "var(--emerald)", color: "#0F1923",
      padding: "10px 20px", borderRadius: "20px",
      fontWeight: "700", fontSize: "12px", zIndex: 300,
      boxShadow: "var(--shadow-emerald)",
      animation: "fadeSlide 0.3s cubic-bezier(0.34,1.4,0.64,1)",
      whiteSpace: "nowrap", pointerEvents: "none",
    }}>
      {message}
    </div>
  );
}
