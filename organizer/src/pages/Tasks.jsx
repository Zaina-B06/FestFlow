import { useState } from "react";
import { tasks, shiftPulse } from "../data/mockData";
import TopBar from "../components/layout/TopBar";

export default function Tasks() {
  const [checklist, setChecklist] = useState(tasks[0].checklist);
  const [urgency, setUrgency] = useState("med");
  const [showTeam, setShowTeam] = useState(false);
  const activeTask = tasks[0];
  const doneCount = checklist.filter(c => c.done).length;

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search tasks..." />
      <div style={{ padding: "32px 36px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 4px" }}>My Tasks</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7AAACE" }} />
              <span style={{ fontSize: 13, color: "#7AAACE", fontWeight: 600 }}>Active Zone: Main Stage Area</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Filter", "Today"].map(l => (
              <button key={l} style={{ padding: "8px 18px", border: "1px solid #D6E4EE", borderRadius: 10, background: "#fff", fontSize: 12, fontWeight: 600, color: "#355872", cursor: "pointer" }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 1fr", gap: 20 }}>

          {/* Active Task */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #355872, #7AAACE)", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "1.2px", textTransform: "uppercase", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 20 }}>Active Now</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Due {activeTask.dueTime}</span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.3px" }}>{activeTask.title}</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: 0 }}>📍 {activeTask.location}</p>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 12 }}>Checklist</p>
                  {checklist.map(c => (
                    <div key={c.id} onClick={() => setChecklist(p => p.map(x => x.id === c.id ? { ...x, done: !x.done } : x))}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", cursor: "pointer" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 6, border: c.done ? "none" : "2px solid #D6E4EE", background: c.done ? "#355872" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                        {c.done && <span style={{ color: "#9CD5FF", fontSize: 10, fontWeight: 800 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, color: c.done ? "#7AAACE" : "#355872", textDecoration: c.done ? "line-through" : "none", fontWeight: c.done ? 400 : 500 }}>{c.label}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 12 }}>Details</p>
                  <p style={{ fontSize: 11, color: "#7AAACE", marginBottom: 2, fontWeight: 600 }}>Location</p>
                  <p style={{ fontSize: 13, color: "#355872", marginBottom: 12 }}>{activeTask.location}</p>
                  <p style={{ fontSize: 11, color: "#7AAACE", marginBottom: 2, fontWeight: 600 }}>Team</p>
                  <p style={{ fontSize: 13, color: "#355872", marginBottom: 12 }}>{activeTask.teamAssignment.join(", ")}</p>
                  {activeTask.notes && (
                    <div style={{ background: "#F7F8F0", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#7AAACE", lineHeight: 1.6, border: "1px solid #E8EDE8" }}>
                      {activeTask.notes}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7AAACE", marginBottom: 6 }}>
                  <span>Progress</span>
                  <span style={{ color: "#355872", fontWeight: 700 }}>{doneCount}/{checklist.length}</span>
                </div>
                <div style={{ height: 6, background: "#EAF4FF", borderRadius: 10 }}>
                  <div style={{ height: "100%", background: "linear-gradient(90deg, #355872, #7AAACE)", borderRadius: 10, width: `${(doneCount / checklist.length) * 100}%`, transition: "width 0.3s" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Pending tasks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tasks.slice(1, 3).map(task => (
              <div key={task.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: 20 }}>
                <p style={{ fontSize: 11, color: "#7AAACE", marginBottom: 6, fontWeight: 500 }}>{task.dueTime}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#355872", marginBottom: 6 }}>{task.title}</p>
                <p style={{ fontSize: 12, color: "#7AAACE", marginBottom: 14, lineHeight: 1.5 }}>{task.location}</p>
                <span style={{ background: "#FFF3CD", color: "#856404", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>PENDING</span>
              </div>
            ))}
          </div>

          {/* Shift Pulse + Report Issue */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>Shift Pulse</h3>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 20px" }}>Live metrics for your zone</p>
              {[
                { label: "Task Progress", value: shiftPulse.taskProgress, color: "#7AAACE", valueLabel: `${shiftPulse.taskProgress}%` },
                { label: "Zone Density", value: 78, color: "#C0392B", valueLabel: "HIGH" },
              ].map((m, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "#7AAACE", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <span>{m.label}</span>
                    <span style={{ color: m.color }}>{m.valueLabel}</span>
                  </div>
                  <div style={{ height: 6, background: "#EAF4FF", borderRadius: 10 }}>
                    <div style={{ height: "100%", background: m.color, borderRadius: 10, width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>
                <span style={{ color: "#C0392B" }}>▲</span> Report Issue
              </h3>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 18px" }}>Flag a problem in your zone</p>

              <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Category</p>
              <select style={{ width: "100%", padding: "9px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, color: "#355872", background: "#F7F8F0", marginBottom: 14 }}>
                <option>Equipment Malfunction</option>
                <option>Medical Emergency</option>
                <option>Security Concern</option>
                <option>Crowd Issue</option>
              </select>

              <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Urgency</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {["low", "med", "high"].map(u => (
                  <button key={u} onClick={() => setUrgency(u)} style={{
                    flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
                    background: urgency === u ? ({ low: "#7AAACE", med: "#D97706", high: "#C0392B" }[u]) : "#F7F8F0",
                    color: urgency === u ? "#fff" : "#7AAACE",
                    transition: "all 0.15s",
                  }}>{u[0].toUpperCase() + u.slice(1)}</button>
                ))}
              </div>

              <textarea placeholder="Describe the problem..." style={{ width: "100%", height: 72, padding: "10px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, resize: "none", background: "#F7F8F0", color: "#355872", marginBottom: 12 }} />
              <button style={{ width: "100%", padding: "11px", background: "#355872", border: "none", borderRadius: 10, color: "#9CD5FF", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                Submit Incident
              </button>
            </div>
          </div>
        </div>

        {/* Bottom task row */}
        <div style={{ marginTop: 16, background: "#fff", borderRadius: 14, border: "1px solid #E8EDE8", padding: "14px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎭</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 1px" }}>Cultural Night Setup</p>
                <p style={{ fontSize: 11, color: "#7AAACE", margin: 0 }}>Open Air Amphitheatre · 4:00 PM – 6:00 PM</p>
              </div>
              <div style={{ display: "flex" }}>
                {["A", "S", "R", "+3"].map((a, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: ["#355872", "#7AAACE", "#9CD5FF", "#D6E4EE"][i], border: "2px solid #fff", marginLeft: i ? -7 : 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: i < 3 ? "#fff" : "#355872" }}>{a}</div>
                ))}
              </div>
            </div>
            <button onClick={() => setShowTeam(!showTeam)} style={{ padding: "8px 18px", border: "1px solid #D6E4EE", borderRadius: 10, background: "#fff", fontSize: 12, fontWeight: 700, color: "#355872", cursor: "pointer" }}>
              {showTeam ? "Hide Shift Team" : "View Shift Team"}
            </button>
          </div>
          {showTeam && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #E8EDE8", display: "flex", gap: 20 }}>
              {[
                { name: "Arjun Reddy", role: "Stage Manager", color: "#355872", init: "A" },
                { name: "Sneha Rao", role: "Co-Volunteer", color: "#7AAACE", init: "S" },
                { name: "Rohan Das", role: "Tech Support", color: "#9CD5FF", init: "R" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{m.init}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 1px" }}>{m.name}</p>
                    <p style={{ fontSize: 11, color: "#7AAACE", margin: 0 }}>{m.role}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#D6E4EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#355872" }}>+3</div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 1px" }}>Others</p>
                  <p style={{ fontSize: 11, color: "#7AAACE", margin: 0 }}>On shift</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, background: "#355872", borderRadius: 10, padding: "7px 14px" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#9CD5FF" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Shift Active · Main Stage</span>
        </div>
      </div>
    </div>
  );
}