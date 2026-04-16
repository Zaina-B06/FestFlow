const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "events", label: "Events", icon: "◈" },
  { id: "tasks", label: "Tasks", icon: "✓" },
  { id: "schedule", label: "Schedule", icon: "◷" },
  { id: "alerts", label: "Alerts", icon: "◎" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "help", label: "Help", icon: "?" },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside style={{
      width: 210, minHeight: "100vh",
      background: "#355872",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
    }}>
      <div style={{ padding: "28px 20px 22px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "#9CD5FF",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#355872", fontSize: 15, fontWeight: 800 }}>F</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>FestFlow</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 500 }}>Volunteer Portal</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActivePage(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", marginBottom: 2,
            background: activePage === item.id ? "rgba(156,213,255,0.15)" : "transparent",
            border: "none", borderRadius: 10, cursor: "pointer",
            color: activePage === item.id ? "#9CD5FF" : "rgba(255,255,255,0.5)",
            fontSize: 13, fontWeight: activePage === item.id ? 700 : 500,
            textAlign: "left", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 13, width: 18, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={{
          width: "100%", padding: "10px 12px",
          background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, color: "#fff", fontSize: 12,
          fontWeight: 700, cursor: "pointer", marginBottom: 6,
        }}>
          ⚠ Report Issue
        </button>
        <button style={{
          width: "100%", display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px", background: "transparent", border: "none",
          color: "rgba(255,255,255,0.3)", fontSize: 12, cursor: "pointer", fontWeight: 500,
        }}>
          ⚙ Settings
        </button>
      </div>
    </aside>
  );
}