import { useState } from "react";
import { schedule } from "../data/mockData";
import TopBar from "../components/layout/TopBar";

export default function Schedule() {
  const [available, setAvailable] = useState(true);

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search shifts or locations..." />
      <div style={{ padding: "32px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 28, alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 6px" }}>My Schedule</h1>
              <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>
                Your shifts for <span style={{ color: "#355872", fontWeight: 700 }}>Crescendo 2024 · August 24</span>. Stay sharp, stay ready.
              </p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px 28px" }}>
              {schedule.map((item, i) => {
                const isActive = item.status === "active";
                const isBreak = item.status === "break";
                const isDone = item.status === "done";
                return (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < schedule.length - 1 ? 6 : 0 }}>
                    <div style={{ width: 44, flexShrink: 0, paddingTop: 16, fontSize: 12, color: "#7AAACE", textAlign: "right", fontWeight: 500 }}>{item.time}</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: 12, height: 12, borderRadius: "50%", marginTop: 14, flexShrink: 0,
                        background: isActive ? "#355872" : isBreak ? "#D97706" : isDone ? "#9CD5FF" : "#D6E4EE",
                        border: isActive ? "3px solid #EAF4FF" : "3px solid transparent",
                      }} />
                      {i < schedule.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: "#EAF4FF", borderRadius: 2 }} />}
                    </div>
                    <div style={{ flex: 1, paddingBottom: 16 }}>
                      <div style={{
                        background: isActive ? "#EAF4FF" : isBreak ? "#FFFBEB" : isDone ? "transparent" : "#F7F8F0",
                        border: isActive ? "1.5px solid #9CD5FF" : isBreak ? "1.5px solid #FDE68A" : "1.5px solid transparent",
                        borderRadius: 12, padding: "14px 18px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: isActive ? 700 : 500, color: isDone ? "#7AAACE" : "#355872", textDecoration: isDone ? "line-through" : "none", margin: "0 0 3px" }}>
                              {isBreak ? "◷ " : ""}{item.title}
                            </p>
                            {item.zone && <p style={{ fontSize: 12, color: "#7AAACE", margin: 0 }}>{item.zone}</p>}
                          </div>
                          {isActive && <span style={{ background: "#355872", color: "#9CD5FF", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>ACTIVE NOW</span>}
                          {isBreak && <span style={{ color: "#D97706", fontSize: 12, fontWeight: 600 }}>{item.duration}</span>}
                          {isDone && <span style={{ color: "#9CD5FF", fontSize: 14 }}>✓</span>}
                        </div>
                        {isActive && (
                          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                            {["AM", "+3"].map((a, j) => (
                              <div key={j} style={{ width: 26, height: 26, borderRadius: "50%", background: j === 0 ? "#355872" : "#7AAACE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: j === 0 ? "#9CD5FF" : "#fff" }}>{a}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", textTransform: "uppercase", letterSpacing: "0.8px", margin: 0 }}>Availability</p>
                <div onClick={() => setAvailable(p => !p)} style={{ width: 44, height: 24, borderRadius: 12, background: available ? "#355872" : "#D6E4EE", padding: "3px 4px", cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.2s" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: available ? "#9CD5FF" : "#fff", marginLeft: available ? "auto" : 0, transition: "margin 0.2s" }} />
                </div>
              </div>
              <p style={{ fontSize: 12, color: available ? "#355872" : "#7AAACE", fontWeight: 700, margin: 0 }}>{available ? "Ready for Backup" : "Not Available"}</p>
            </div>

            <div style={{ background: "#355872", borderRadius: 16, padding: "22px", color: "#fff" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 8px", fontWeight: 600 }}>Total Hours Today</p>
              <p style={{ fontSize: 36, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-1px", color: "#fff" }}>7.5</p>
              <p style={{ fontSize: 12, color: "#9CD5FF", fontWeight: 600, margin: 0 }}>+1.2h above avg</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#355872", margin: "0 0 16px" }}>Your Team</h3>
              {[
                { name: "Priya Singh", role: "Co-Volunteer", color: "#7AAACE", init: "PS" },
                { name: "Karan Mehta", role: "Tech Support", color: "#355872", init: "KM" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i === 0 ? 12 : 0 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{m.init}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 1px" }}>{m.name}</p>
                    <p style={{ fontSize: 11, color: "#7AAACE", margin: 0 }}>{m.role}</p>
                  </div>
                </div>
              ))}
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