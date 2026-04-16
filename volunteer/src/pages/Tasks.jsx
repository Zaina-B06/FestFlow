import { useState, useEffect } from "react";
import { shiftPulse, volunteer } from "../data/mockData";
import TopBar from "../components/layout/TopBar";
import { BASE_URL, VOLUNTEER_ID } from "../config";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [urgency, setUrgency] = useState("med");
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/tasks`);
      const data = await res.json();
      setTasks(data.map(d => ({ ...d.task, checklist: d.checklist })));
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklistItem = async (taskId, itemId) => {
    await fetch(`${BASE_URL}/tasks/${taskId}/checklist/${itemId}`, { method: "PUT" });
    fetchTasks();
  };

  const submitReport = async (taskId) => {
    if (!description.trim()) return;
    await fetch(`${BASE_URL}/tasks/${taskId}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volunteer_id: VOLUNTEER_ID, description }),
    });
    setDescription("");
    alert("Incident reported!");
  };

  const activeTask = tasks.find(t => t.status === "active") || tasks[0];
  const pendingTasks = tasks.filter(t => t.status === "pending");
  const upcomingTask = tasks.find(t => t.status === "upcoming");
  const doneCount = activeTask?.checklist?.filter(c => c.is_done).length || 0;
  const totalCount = activeTask?.checklist?.length || 0;

  if (loading) return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search tasks..." />
      <div style={{ padding: "32px 36px", color: "#7AAACE", fontSize: 14 }}>Loading tasks...</div>
    </div>
  );

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search tasks..." />
      <div style={{ padding: "32px 36px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 6px" }}>My Tasks</h1>
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

        {tasks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#7AAACE" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>No tasks assigned yet</p>
            <p style={{ fontSize: 13, margin: 0 }}>Your coordinator will assign tasks soon.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 1fr", gap: 20 }}>

            {/* Active Task */}
            {activeTask && (
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(135deg, #355872, #7AAACE)", padding: "22px 26px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "1.2px", textTransform: "uppercase", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 20 }}>
                      {activeTask.status === "active" ? "Active Now" : activeTask.status}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Due {activeTask.due_time}</span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.3px" }}>{activeTask.title}</h2>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>📍 {activeTask.location}</p>
                </div>

                <div style={{ padding: "22px 26px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 14px" }}>Checklist</p>
                      {activeTask.checklist?.map(c => (
                        <div key={c.id}
                          onClick={() => toggleChecklistItem(activeTask.id, c.id)}
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", cursor: "pointer", borderBottom: "1px solid #F7F8F0" }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: 6, flexShrink: 0, transition: "all 0.15s",
                            border: c.is_done ? "none" : "2px solid #D6E4EE",
                            background: c.is_done ? "#355872" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {c.is_done && <span style={{ color: "#9CD5FF", fontSize: 10, fontWeight: 800 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 13, color: c.is_done ? "#7AAACE" : "#355872", textDecoration: c.is_done ? "line-through" : "none", fontWeight: c.is_done ? 400 : 500 }}>{c.label}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 14px" }}>Details</p>
                      <p style={{ fontSize: 11, color: "#7AAACE", margin: "0 0 2px", fontWeight: 600 }}>Location</p>
                      <p style={{ fontSize: 13, color: "#355872", margin: "0 0 14px", fontWeight: 500 }}>{activeTask.location}</p>
                      {activeTask.notes && (
                        <div style={{ background: "#F7F8F0", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#7AAACE", lineHeight: 1.6, border: "1px solid #E8EDE8" }}>
                          {activeTask.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7AAACE", marginBottom: 6, fontWeight: 600 }}>
                      <span>Progress</span>
                      <span style={{ color: "#355872" }}>{doneCount}/{totalCount} done</span>
                    </div>
                    <div style={{ height: 6, background: "#EAF4FF", borderRadius: 10 }}>
                      <div style={{ height: "100%", background: "linear-gradient(90deg, #355872, #7AAACE)", borderRadius: 10, width: totalCount ? `${(doneCount / totalCount) * 100}%` : "0%", transition: "width 0.3s" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pending tasks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {pendingTasks.slice(0, 2).map(task => (
                <div key={task.id} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px" }}>
                  <p style={{ fontSize: 11, color: "#7AAACE", margin: "0 0 6px", fontWeight: 500 }}>{task.due_time}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 6px" }}>{task.title}</p>
                  <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 16px", lineHeight: 1.5 }}>{task.location}</p>
                  <span style={{ background: "#FFF3CD", color: "#856404", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>PENDING</span>
                </div>
              ))}
              {upcomingTask && (
                <div style={{ background: "#EAF4FF", borderRadius: 16, border: "1px solid #9CD5FF", padding: "20px" }}>
                  <p style={{ fontSize: 11, color: "#7AAACE", margin: "0 0 6px", fontWeight: 500 }}>{upcomingTask.due_time}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 6px" }}>{upcomingTask.title}</p>
                  <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 14px", lineHeight: 1.5 }}>{upcomingTask.location}</p>
                  <span style={{ background: "#9CD5FF", color: "#355872", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>UPCOMING</span>
                </div>
              )}
            </div>

            {/* Shift Pulse + Report Issue */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>Shift Pulse</h3>
                <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 20px" }}>Live metrics for your zone</p>
                {[
                  { label: "Task Progress", value: totalCount ? Math.round((doneCount / totalCount) * 100) : 0, color: "#7AAACE", valueLabel: `${totalCount ? Math.round((doneCount / totalCount) * 100) : 0}%` },
                  { label: "Zone Density", value: 78, color: "#D97706", valueLabel: "HIGH" },
                ].map((m, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "#7AAACE", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
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

                <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Category</p>
                <select style={{ width: "100%", padding: "9px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, color: "#355872", background: "#F7F8F0", marginBottom: 14, outline: "none" }}>
                  <option>Equipment Malfunction</option>
                  <option>Medical Emergency</option>
                  <option>Security Concern</option>
                  <option>Crowd Issue</option>
                  <option>Sound / AV Problem</option>
                </select>

                <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Urgency</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {["low", "med", "high"].map(u => (
                    <button key={u} onClick={() => setUrgency(u)} style={{
                      flex: 1, padding: "8px 0", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none", transition: "all 0.15s",
                      background: urgency === u ? ({ low: "#7AAACE", med: "#D97706", high: "#C0392B" }[u]) : "#F7F8F0",
                      color: urgency === u ? "#fff" : "#7AAACE",
                    }}>{u[0].toUpperCase() + u.slice(1)}</button>
                  ))}
                </div>

                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe the problem..."
                  style={{ width: "100%", height: 72, padding: "10px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, resize: "none", background: "#F7F8F0", color: "#355872", marginBottom: 12, outline: "none" }}
                />
                <button
                  onClick={() => activeTask && submitReport(activeTask.id)}
                  style={{ width: "100%", padding: "11px", background: "#355872", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                  Submit Incident
                </button>
              </div>
            </div>
          </div>
        )}

        {upcomingTask && (
          <div style={{ marginTop: 16, background: "#fff", borderRadius: 14, border: "1px solid #E8EDE8", padding: "14px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎭</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 1px" }}>{upcomingTask.title}</p>
                <p style={{ fontSize: 11, color: "#7AAACE", margin: 0 }}>{upcomingTask.location} · {upcomingTask.due_time}</p>
              </div>
            </div>
            <button style={{ padding: "8px 18px", border: "1px solid #D6E4EE", borderRadius: 10, background: "#fff", fontSize: 12, fontWeight: 700, color: "#355872", cursor: "pointer" }}>View Details</button>
          </div>
        )}

        <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, background: "#355872", borderRadius: 10, padding: "7px 14px" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#9CD5FF" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Shift Active · Main Stage Area</span>
        </div>
      </div>
    </div>
  );
}