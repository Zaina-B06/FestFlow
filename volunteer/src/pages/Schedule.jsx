import { useState, useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import { BASE_URL, VOLUNTEER_ID } from "../config";

export default function Schedule() {
  const [available, setAvailable] = useState(true);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/schedule/today`)
      .then(r => r.json())
      .then(data => { setShifts(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const updateAvailability = async (status) => {
    setAvailable(status === "active");
    await fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/availability?status=${status}`, { method: "PUT" });
  };

  const totalHours = shifts.reduce((acc, s) => {
    if (s.start_time && s.end_time) {
      const diff = (new Date(s.end_time) - new Date(s.start_time)) / 3600000;
      return acc + diff;
    }
    return acc;
  }, 0);

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search shifts or locations..." />
      <div style={{ padding: "32px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 28, alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 6px" }}>My Schedule</h1>
              <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>
                Your shifts for today · Stay sharp, stay ready.
              </p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px 28px" }}>
              {loading ? (
                <p style={{ fontSize: 13, color: "#7AAACE", textAlign: "center", padding: "40px 0" }}>Loading schedule...</p>
              ) : shifts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📅</div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>No shifts today</p>
                  <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>Your coordinator hasn't assigned any shifts yet.</p>
                </div>
              ) : (
                shifts.map((item, i) => {
                  const isActive = item.status === "active";
                  const isBreak = item.status === "break";
                  const isDone = item.status === "done";
                  const timeLabel = item.start_time ? new Date(item.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
                  return (
                    <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < shifts.length - 1 ? 4 : 0 }}>
                      <div style={{ width: 48, flexShrink: 0, paddingTop: 18, fontSize: 12, color: "#7AAACE", textAlign: "right", fontWeight: 600 }}>{timeLabel}</div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{
                          width: 13, height: 13, borderRadius: "50%", marginTop: 16, flexShrink: 0,
                          background: isActive ? "#355872" : isBreak ? "#D97706" : isDone ? "#9CD5FF" : "#D6E4EE",
                          border: isActive ? "3px solid #EAF4FF" : "3px solid transparent",
                        }} />
                        {i < shifts.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 20, background: "#EAF4FF", borderRadius: 2, margin: "4px 0" }} />}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 18 }}>
                        <div style={{
                          background: isActive ? "#EAF4FF" : isBreak ? "#FFFBEB" : isDone ? "transparent" : "#F7F8F0",
                          border: isActive ? "1.5px solid #9CD5FF" : isBreak ? "1.5px solid #FDE68A" : "1.5px solid transparent",
                          borderRadius: 12, padding: "14px 18px",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                              <p style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isDone ? "#7AAACE" : "#355872", textDecoration: isDone ? "line-through" : "none", margin: "0 0 4px" }}>
                                {isBreak ? "☕ " : ""}{item.title}
                              </p>
                              {item.zone && <p style={{ fontSize: 12, color: "#7AAACE", margin: 0 }}>{item.zone}</p>}
                            </div>
                            {isActive && <span style={{ background: "#355872", color: "#9CD5FF", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.5px", flexShrink: 0 }}>ACTIVE NOW</span>}
                            {isDone && <span style={{ color: "#9CD5FF", fontSize: 16 }}>✓</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 2px" }}>Availability</p>
                  <p style={{ fontSize: 12, color: available ? "#355872" : "#7AAACE", fontWeight: 700, margin: 0 }}>{available ? "Ready for Backup" : "Not Available"}</p>
                </div>
                <div
                  onClick={() => updateAvailability(available ? "busy" : "active")}
                  style={{ width: 46, height: 26, borderRadius: 13, background: available ? "#355872" : "#D6E4EE", padding: "3px 4px", cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.2s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: available ? "#9CD5FF" : "#fff", marginLeft: available ? "auto" : 0, transition: "margin 0.2s" }} />
                </div>
              </div>
            </div>

            <div style={{ background: "#355872", borderRadius: 16, padding: "22px", color: "#fff" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px", fontWeight: 600 }}>Total Hours Today</p>
              <p style={{ fontSize: 38, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-1.5px", color: "#fff" }}>
                {totalHours > 0 ? totalHours.toFixed(1) : "—"}
              </p>
              <p style={{ fontSize: 12, color: "#9CD5FF", fontWeight: 600, margin: 0 }}>scheduled today</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#355872", margin: "0 0 6px" }}>Shift Validator</h3>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 14px" }}>Show this to your coordinator for sign-off.</p>
              <button style={{ width: "100%", padding: "10px", background: "#F7F8F0", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#355872", cursor: "pointer" }}>
                Generate Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}