import { useState, useEffect } from "react";
import { volunteer } from "../data/mockData";
import TopBar from "../components/layout/TopBar";
import { BASE_URL, VOLUNTEER_ID } from "../config";

const typeConfig = {
    alert: { iconBg: "#FFE8E8", iconColor: "#C0392B", icon: "⚠" },
    weather: { iconBg: "#FFF3CD", iconColor: "#D97706", icon: "◐" },
    info: { iconBg: "#EAF4FF", iconColor: "#7AAACE", icon: "i" },
    success: { iconBg: "#EAF4FF", iconColor: "#355872", icon: "✓" },
    emergency: { iconBg: "#FFE8E8", iconColor: "#C0392B", icon: "▲" },
};

export default function Alerts() {
    const [dismissed, setDismissed] = useState([]);
    const [emergencyAction, setEmergencyAction] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/notifications`);
            const data = await res.json();
            setNotifications(data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    const markRead = async (id) => {
        await fetch(`${BASE_URL}/notifications/${id}/read`, { method: "PUT" });
    };

    const emergency = notifications.find(n => n.type === "emergency");
    const feed = notifications.filter(n => n.type !== "emergency" && !dismissed.includes(n.id));

    return (
        <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
            <TopBar searchPlaceholder="Search alerts..." />
            <div style={{ padding: "32px 36px" }}>
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 4px" }}>Notification Center</h1>
                    <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>Real-time dispatch and critical fest updates.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <h2 style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: 0 }}>Recent Feed</h2>
                                <span style={{ background: "#355872", color: "#9CD5FF", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 20 }}>{feed.length}</span>
                            </div>
                            <button style={{ background: "none", border: "none", fontSize: 12, color: "#7AAACE", fontWeight: 700, cursor: "pointer" }}>Mark all as read</button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {feed.length === 0 && (
                                <div style={{ textAlign: "center", padding: "40px 0", color: "#7AAACE" }}>
                                    <div style={{ fontSize: 32, marginBottom: 8 }}>🔔</div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: "#355872", margin: "0 0 4px" }}>All clear!</p>
                                    <p style={{ fontSize: 13, margin: 0 }}>No new notifications right now.</p>
                                </div>
                            )}
                            {feed.map(n => {
                                const cfg = typeConfig[n.type] || typeConfig.info;
                                return (
                                    <div key={n.id} style={{ background: "#fff", border: "1px solid #E8EDE8", borderRadius: 14, padding: "18px 20px", display: "flex", gap: 14 }}>
                                        <div style={{ width: 38, height: 38, borderRadius: 10, background: cfg.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: cfg.iconColor, fontWeight: 800, flexShrink: 0 }}>{cfg.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: "#355872" }}>{n.title}</span>
                                                <span style={{ fontSize: 11, color: "#D6E4EE", marginLeft: 12, flexShrink: 0 }}>
                                                    {n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 13, color: "#7AAACE", margin: "0 0 8px", lineHeight: 1.6 }}>{n.body}</p>
                                            {n.type === "weather" && <button style={{ background: "none", border: "none", padding: 0, fontSize: 12, color: "#355872", fontWeight: 700, cursor: "pointer" }}>Weather Radar →</button>}
                                            {n.type === "alert" && <button style={{ background: "none", border: "none", padding: 0, fontSize: 12, color: "#355872", fontWeight: 700, cursor: "pointer" }}>View Map →</button>}
                                        </div>
                                        <button onClick={() => { setDismissed(p => [...p, n.id]); markRead(n.id); }} style={{ background: "none", border: "none", color: "#D6E4EE", cursor: "pointer", fontSize: 20, alignSelf: "flex-start", lineHeight: 1 }}>×</button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                        {emergency && !emergencyAction && (
                            <div style={{ background: "linear-gradient(135deg, #C0392B, #96281B)", borderRadius: 16, padding: "22px 20px", color: "#fff" }}>
                                <div style={{ marginBottom: 12 }}>
                                    <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 6, padding: "3px 10px", fontSize: 9, fontWeight: 800, letterSpacing: "1px" }}>▲ IMMEDIATE ACTION</span>
                                </div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.3, margin: "0 0 10px" }}>{emergency.title}</h3>
                                <p style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.6, margin: "0 0 18px" }}>{emergency.body}</p>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={() => { setEmergencyAction("onway"); markRead(emergency.id); }} style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>◉ On My Way</button>
                                    <button onClick={() => { setEmergencyAction("declined"); markRead(emergency.id); }} style={{ flex: 1, padding: "10px", background: "rgba(0,0,0,0.15)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer" }}>× Decline</button>
                                </div>
                            </div>
                        )}

                        {emergencyAction && (
                            <div style={{ background: emergencyAction === "onway" ? "#EAF4FF" : "#F7F8F0", borderRadius: 16, border: `1px solid ${emergencyAction === "onway" ? "#9CD5FF" : "#E8EDE8"}`, padding: "22px 20px", textAlign: "center" }}>
                                <div style={{ fontSize: 28, marginBottom: 8 }}>{emergencyAction === "onway" ? "🏃" : "✖"}</div>
                                <p style={{ fontSize: 15, fontWeight: 800, color: "#355872", margin: "0 0 4px" }}>{emergencyAction === "onway" ? "On your way!" : "Declined"}</p>
                                <p style={{ fontSize: 12, color: "#7AAACE", margin: 0 }}>{emergencyAction === "onway" ? "Coordinator notified. Head to the location." : "Another volunteer has been notified."}</p>
                            </div>
                        )}

                        {!emergency && !emergencyAction && (
                            <div style={{ background: "#EAF4FF", borderRadius: 16, border: "1px solid #9CD5FF", padding: "22px 20px", textAlign: "center" }}>
                                <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
                                <p style={{ fontSize: 14, fontWeight: 800, color: "#355872", margin: "0 0 4px" }}>All clear!</p>
                                <p style={{ fontSize: 12, color: "#7AAACE", margin: 0 }}>No emergency alerts right now.</p>
                            </div>
                        )}

                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "20px 22px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#355872", margin: 0 }}>Urgent Reassignment</h3>
                                <span style={{ background: "#FFF3CD", color: "#856404", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 8 }}>PENDING</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                                {[
                                    { label: "Current Role", value: "Registration Desk" },
                                    { label: "Proposed Change", value: "Stage Entry Control" },
                                ].map((item, i) => (
                                    <div key={i} style={{ background: "#F7F8F0", borderRadius: 10, padding: "10px 12px", border: "1px solid #E8EDE8" }}>
                                        <p style={{ fontSize: 9, color: "#7AAACE", fontWeight: 700, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</p>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: 0 }}>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 16px", lineHeight: 1.6, fontStyle: "italic" }}>
                                "Main stage entry is getting chaotic. We need someone experienced there ASAP." – Coordinator Meera
                            </p>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button style={{ flex: 1, padding: "10px", background: "#F7F8F0", border: "1px solid #E8EDE8", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#7AAACE" }}>Dismiss</button>
                                <button style={{ flex: 1, padding: "10px", background: "#355872", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 800, color: "#9CD5FF", cursor: "pointer" }}>✓ Confirm</button>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            {[{ label: "Radio Channel", value: volunteer.radio }, { label: "HQ Hotline", value: volunteer.hotline }].map((item, i) => (
                                <div key={i} style={{ background: "#355872", borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
                                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 6px", fontWeight: 600 }}>{item.label}</p>
                                    <p style={{ fontSize: 18, fontWeight: 800, color: "#9CD5FF", margin: 0 }}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}