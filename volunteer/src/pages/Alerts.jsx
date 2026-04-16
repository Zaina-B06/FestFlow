import { useState, useEffect } from "react";
import { volunteer } from "../data/mockData";
import TopBar from "../components/layout/TopBar";
import { BASE_URL, VOLUNTEER_ID } from "../config";

export default function Dashboard() {
  const [available, setAvailable] = useState(true);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    tasks_completed: 0, hours_volunteered: 0,
    shifts_completed: 0, impact_score: 0
  });

  useEffect(() => {
    fetch(`${BASE_URL}/events/`)
      .then(r => r.json()).then(setEvents).catch(console.error);
    fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/notifications`)
      .then(r => r.json()).then(setNotifications).catch(console.error);
    fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/stats`)
      .then(r => r.json()).then(setStats).catch(console.error);
  }, []);

  const statCards = [
    { label: "Events Applied", value: String(stats.shifts_completed), sub: "confirmed", accent: "#355872" },
    { label: "Shifts Completed", value: String(stats.shifts_completed), sub: "this month", accent: "#7AAACE" },
    { label: "Hours Volunteered", value: `${stats.hours_volunteered}h`, sub: "across events", accent: "#355872" },
    { label: "Impact Score", value: String(stats.impact_score), sub: "Top volunteer", accent: "#7AAACE" },
  ];

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search anything..." />
      <div style={{ padding: "32px 36px" }}>

        {/* Welcome Banner */}
        <div style={{
          background: "#355872", borderRadius: 20, padding: "36px 44px", marginBottom: 32,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(156,213,255,0.06) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          <div style={{ position: "absolute", right: -60, top: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(122,170,206,0.1)" }} />
          <div style={{ position: "absolute", right: 100, bottom: -80, width: 220, height: 220, borderRadius: "50%", background: "rgba(156,213,255,0.07)" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#9CD5FF" }} />
              <span style={{ fontSize: 11, color: "#9CD5FF", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                College Fest · Volunteer Portal
              </span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-1px", lineHeight: 1.15 }}>
              Hey {volunteer.name.split(" ")[0]}! 👋
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>
              {volunteer.role} &nbsp;·&nbsp; {volunteer.zone}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: "0 0 8px", letterSpacing: "1px", textTransform: "uppercase" }}>Status</p>
              <div onClick={() => setAvailable(p => !p)} style={{
                width: 56, height: 30, borderRadius: 15, cursor: "pointer",
                background: available ? "#7AAACE" : "rgba(255,255,255,0.1)",
                padding: "4px 5px", transition: "background 0.25s",
                display: "flex", alignItems: "center", margin: "0 auto 8px",
              }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", marginLeft: available ? "auto" : 0, transition: "margin 0.25s" }} />
              </div>
              <span style={{ fontSize: 11, color: available ? "#9CD5FF" : "rgba(255,255,255,0.3)", fontWeight: 700 }}>
                {available ? "Available" : "Busy"}
              </span>
            </div>

            <div style={{ width: 1, height: 60, background: "rgba(255,255,255,0.08)" }} />

            <div style={{ display: "flex", gap: 12 }}>
              {[{ label: "Radio", value: volunteer.radio }, { label: "Hotline", value: volunteer.hotline }].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 20px", textAlign: "center" }}>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "0 0 4px", letterSpacing: "0.8px", textTransform: "uppercase" }}>{item.label}</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#9CD5FF", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {statCards.map((card, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", border: "1px solid #E8EDE8", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: card.accent, borderRadius: "16px 16px 0 0" }} />
              <p style={{ fontSize: 11, color: "#7AAACE", fontWeight: 600, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.6px" }}>{card.label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: "#355872", margin: "0 0 4px", letterSpacing: "-1px", lineHeight: 1 }}>{card.value}</p>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: 0, fontWeight: 600 }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>

          {/* Events preview */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#355872", margin: "0 0 4px" }}>Upcoming Events</h2>
                <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>Find opportunities to volunteer</p>
              </div>
              <button style={{ background: "#F7F8F0", border: "1px solid #E8EDE8", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, color: "#355872", cursor: "pointer" }}>
                Browse all →
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {events.length === 0 && (
                <p style={{ fontSize: 13, color: "#7AAACE", textAlign: "center", padding: "20px 0" }}>No events yet.</p>
              )}
              {events.slice(0, 3).map(event => (
                <div key={event.id} style={{ display: "flex", gap: 16, padding: "16px", background: "#F7F8F0", borderRadius: 12, border: "1px solid #E8EDE8", alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    🎉
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#355872", margin: 0 }}>{event.name}</p>
                      {event.status === "full" && <span style={{ background: "#FFE8E8", color: "#C0392B", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>FULL</span>}
                      {event.spots_left <= 5 && event.status !== "full" && <span style={{ background: "#FFF3CD", color: "#856404", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{event.spots_left} spots left</span>}
                    </div>
                    <p style={{ fontSize: 12, color: "#7AAACE", margin: 0 }}>📅 {event.date} &nbsp;·&nbsp; 📍 {event.location}</p>
                  </div>
                  <button disabled={event.status === "full"} style={{
                    padding: "8px 16px", border: "none", borderRadius: 10,
                    background: event.status === "full" ? "#F0F0F0" : "#355872",
                    color: event.status === "full" ? "#9CA3AF" : "#fff",
                    fontSize: 12, fontWeight: 700,
                    cursor: event.status === "full" ? "default" : "pointer", flexShrink: 0,
                  }}>
                    {event.status === "full" ? "Full" : "Apply"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: 0 }}>Recent Alerts</h3>
                <button style={{ background: "none", border: "none", fontSize: 12, color: "#7AAACE", fontWeight: 700, cursor: "pointer" }}>View all →</button>
              </div>
              {notifications.length === 0 && (
                <p style={{ fontSize: 13, color: "#7AAACE", textAlign: "center", padding: "10px 0" }}>No alerts yet.</p>
              )}
              {notifications.slice(0, 4).map((n, i) => {
                const dotColor = { alert: "#C0392B", weather: "#D97706", info: "#7AAACE", success: "#355872", emergency: "#C0392B" }[n.type] || "#7AAACE";
                return (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid #F7F8F0" : "none" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#355872", margin: "0 0 2px", lineHeight: 1.3 }}>{n.title}</p>
                      <p style={{ fontSize: 11, color: "#7AAACE", margin: 0 }}>
                        {n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 16px" }}>Quick Actions</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "📅", label: "Browse Events", bg: "#EAF4FF", color: "#355872" },
                  { icon: "🕒", label: "My Schedule", bg: "#F0F6FF", color: "#7AAACE" },
                  { icon: "⚠️", label: "Report Issue", bg: "#FFF0F0", color: "#C0392B" },
                  { icon: "❓", label: "Get Help", bg: "#F7F8F0", color: "#355872" },
                ].map((a, i) => (
                  <button key={i} style={{ background: a.bg, border: "none", borderRadius: 12, padding: "16px 10px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{a.icon}</div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: a.color, margin: 0 }}>{a.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}