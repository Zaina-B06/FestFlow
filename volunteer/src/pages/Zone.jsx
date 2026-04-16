import { zoneData } from "../data/mockData";
import TopBar from "../components/layout/TopBar";

export default function Zone() {
  const { layout, crowdLevel, liveDensity, assignment, coordinator, volunteers } = zoneData;

  return (
    <div style={{ background: "#F7F8FA", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search resources..." />
      <div style={{ padding: "32px 36px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px", margin: "0 0 4px" }}>My Zone</h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Real-time floor tracking & sector logistics</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>📍</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{zoneData.sector}</span>
              </div>
              <span style={{ background: "#DCFCE7", color: "#15803D", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: "1px solid #A7F3D0" }}>◉ LiveMap</span>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EAECF0", padding: 24, height: 280, position: "relative", marginBottom: 16 }}>
              {layout.map(zone => (
                <div key={zone.id} style={{
                  position: "absolute",
                  left: `${zone.x}%`, top: `${zone.y}%`,
                  width: `${zone.w}%`, height: `${zone.h * 1.8}px`,
                  background: zone.active ? "#F0FDF9" : "#F9FAFB",
                  border: zone.active ? "2px solid #00B894" : "1px solid #E5E7EB",
                  borderRadius: 10,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer",
                }}>
                  {zone.active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00B894", marginBottom: 5 }} />}
                  <span style={{ fontSize: 10, fontWeight: zone.active ? 700 : 500, color: zone.active ? "#00B894" : "#9CA3AF", textAlign: "center", lineHeight: 1.3 }}>{zone.label}</span>
                  {zone.active && <span style={{ fontSize: 8, background: "#DCFCE7", color: "#15803D", padding: "1px 6px", borderRadius: 4, marginTop: 3, fontWeight: 700 }}>YOU ARE HERE</span>}
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { icon: "🔒", title: "Secure Zone", desc: "Badge access required for all entry points." },
                { icon: "⚡", title: "High Power", desc: "Exposed cabling in AV Room. Follow safety protocols." },
                { icon: "📶", title: "Dedicated Mesh", desc: "Node #09 reserved for critical comms only." },
              ].map((info, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 12, border: "1px solid #EAECF0", padding: "16px 18px" }}>
                  <div style={{ fontSize: 18, marginBottom: 8 }}>{info.icon}</div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{info.title}</p>
                  <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0, lineHeight: 1.5 }}>{info.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EAECF0", padding: "20px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 10px" }}>Active Assignment</p>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#111827", margin: "0 0 16px", lineHeight: 1.3 }}>{assignment}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#6C63FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{coordinator.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, color: "#9CA3AF", margin: "0 0 1px", fontWeight: 600 }}>COORDINATOR</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: 0 }}>{coordinator.name}</p>
                </div>
                <button style={{ background: "#F0FDF9", border: "1px solid #A7F3D0", borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", color: "#00B894", fontWeight: 700 }}>✉</button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 10, color: "#9CA3AF", margin: "0 0 3px", fontWeight: 600 }}>VOLUNTEERS</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: 0 }}>{volunteers.current}<span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>/{volunteers.total}</span></p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 10, color: "#9CA3AF", margin: "0 0 3px", fontWeight: 600 }}>CROWD LVL</p>
                  <span style={{ background: "#FEF9C3", color: "#CA8A04", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>{crowdLevel}</span>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EAECF0", padding: "20px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 6px" }}>Live Density</p>
              <p style={{ fontSize: 36, fontWeight: 800, color: "#111827", margin: "0 0 8px", letterSpacing: "-1px" }}>{liveDensity}%</p>
              <div style={{ height: 8, background: "#F3F4F6", borderRadius: 10, marginBottom: 10 }}>
                <div style={{ height: "100%", width: `${liveDensity}%`, background: liveDensity > 70 ? "#F59E0B" : "#00B894", borderRadius: 10 }} />
              </div>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0, lineHeight: 1.6 }}>Within optimal range. Expected peak in 45 minutes during main stage transition.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[{ icon: "📦", label: "Log Supply" }, { icon: "🔄", label: "Swap Request" }].map((a, i) => (
                <button key={i} style={{ background: "#fff", border: "1px solid #EAECF0", borderRadius: 12, padding: "18px 10px", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{a.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{a.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}