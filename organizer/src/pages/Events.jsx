import { useState } from "react";
import { events } from "../data/mockData";
import TopBar from "../components/layout/TopBar";

const categories = ["All", "Music", "Cultural", "Technology", "Business", "Sports", "Arts"];

const BASE_URL = "http://localhost:8000";

async function applyToEvent(eventId, volunteerId) {
    const res = await fetch(`${BASE_URL}/events/${eventId}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteer_id: volunteerId }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

async function withdrawApplication(eventId, volunteerId) {
    const res = await fetch(`${BASE_URL}/events/${eventId}/withdraw`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteer_id: volunteerId }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export default function Events() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [applied, setApplied] = useState({});
    const [loading, setLoading] = useState({});
    const [toast, setToast] = useState(null);

    const VOLUNTEER_ID = "volunteer_arjun_001";

    const filtered = events.filter(e => {
        const matchCat = filter === "All" || e.category === filter;
        const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.location.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleApply = async (event) => {
        if (event.status === "full") return;
        setLoading(p => ({ ...p, [event.id]: true }));
        try {
            await applyToEvent(event.id, VOLUNTEER_ID);
        } catch (_) { }
        setApplied(p => ({ ...p, [event.id]: "pending" }));
        showToast(`Applied to ${event.name}! Awaiting confirmation.`);
        setSelectedEvent(null);
        setLoading(p => ({ ...p, [event.id]: false }));
    };

    const handleWithdraw = async (eventId) => {
        setLoading(p => ({ ...p, [eventId]: true }));
        try {
            await withdrawApplication(eventId, VOLUNTEER_ID);
        } catch (_) { }
        setApplied(p => ({ ...p, [eventId]: null }));
        showToast("Application withdrawn.");
        setLoading(p => ({ ...p, [eventId]: false }));
    };

    return (
        <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
            <TopBar searchPlaceholder="Search events..." />
            <div style={{ padding: "32px 36px" }}>

                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 4px" }}>Events</h1>
                    <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>Discover fests and sign up to volunteer.</p>
                </div>

                {/* Search + filters */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                    <input
                        type="text" placeholder="Search by name or location..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: 300, padding: "10px 16px", border: "1px solid #D6E4EE", borderRadius: 12, fontSize: 13, background: "#fff", color: "#355872", outline: "none" }}
                    />
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setFilter(cat)} style={{
                                padding: "8px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                background: filter === cat ? "#355872" : "#fff",
                                color: filter === cat ? "#fff" : "#7AAACE",
                                border: filter === cat ? "none" : "1px solid #D6E4EE",
                                transition: "all 0.15s",
                            }}>{cat}</button>
                        ))}
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: selectedEvent ? "1fr 380px" : "1fr", gap: 20 }}>

                    {/* Cards grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16, alignContent: "start" }}>
                        {filtered.map(event => {
                            const appSt = applied[event.id];
                            const isSelected = selectedEvent?.id === event.id;
                            const fillPct = ((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100;

                            return (
                                <div key={event.id} onClick={() => setSelectedEvent(isSelected ? null : event)} style={{
                                    background: "#fff", borderRadius: 16,
                                    border: isSelected ? "2px solid #7AAACE" : "1px solid #E8EDE8",
                                    padding: "20px", cursor: "pointer", transition: "all 0.15s",
                                    boxShadow: isSelected ? "0 0 0 4px rgba(122,170,206,0.12)" : "none",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 12, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                                            {event.image}
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                                            <span style={{ background: "#EAF4FF", color: "#355872", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{event.category}</span>
                                            {appSt === "pending" && <span style={{ background: "#FFF3CD", color: "#856404", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Applied</span>}
                                            {appSt === "confirmed" && <span style={{ background: "#D4EDDA", color: "#155724", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Confirmed ✓</span>}
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 6px" }}>{event.name}</h3>
                                    <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 4px" }}>📅 {event.date}</p>
                                    <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 16px" }}>📍 {event.location}</p>

                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7AAACE", marginBottom: 5, fontWeight: 600 }}>
                                            <span>Spots filled</span>
                                            <span style={{ color: event.status === "full" ? "#C0392B" : event.spotsLeft <= 5 ? "#D97706" : "#355872" }}>
                                                {event.status === "full" ? "Full" : `${event.spotsLeft} left`}
                                            </span>
                                        </div>
                                        <div style={{ height: 5, background: "#EAF4FF", borderRadius: 10 }}>
                                            <div style={{ height: "100%", width: `${fillPct}%`, background: event.status === "full" ? "#C0392B" : fillPct > 70 ? "#D97706" : "#7AAACE", borderRadius: 10 }} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={e => { e.stopPropagation(); appSt ? handleWithdraw(event.id) : handleApply(event); }}
                                        disabled={event.status === "full" || loading[event.id]}
                                        style={{
                                            width: "100%", padding: "9px", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700,
                                            cursor: event.status === "full" ? "default" : "pointer", transition: "all 0.15s",
                                            background: event.status === "full" ? "#F0F0F0" : appSt ? "#FFF0F0" : "#355872",
                                            color: event.status === "full" ? "#9CA3AF" : appSt ? "#C0392B" : "#fff",
                                        }}
                                    >
                                        {loading[event.id] ? "..." : event.status === "full" ? "Sold Out" : appSt ? "Withdraw Application" : "Apply to Volunteer"}
                                    </button>
                                </div>
                            );
                        })}

                        {filtered.length === 0 && (
                            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#7AAACE" }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                                <p style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>No events found</p>
                                <p style={{ fontSize: 13, margin: 0, color: "#7AAACE" }}>Try a different search or category.</p>
                            </div>
                        )}
                    </div>

                    {/* Detail panel */}
                    {selectedEvent && (
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px", position: "sticky", top: 80, alignSelf: "start" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 14, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                                    {selectedEvent.image}
                                </div>
                                <button onClick={() => setSelectedEvent(null)} style={{ background: "#F7F8F0", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 16, color: "#7AAACE" }}>×</button>
                            </div>

                            <span style={{ background: "#EAF4FF", color: "#355872", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{selectedEvent.category}</span>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#355872", margin: "10px 0 8px", letterSpacing: "-0.3px" }}>{selectedEvent.name}</h2>
                            <p style={{ fontSize: 13, color: "#7AAACE", margin: "0 0 18px", lineHeight: 1.7 }}>{selectedEvent.description}</p>

                            <div style={{ background: "#F7F8F0", borderRadius: 12, padding: "14px 16px", marginBottom: 18 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                    {[
                                        { label: "Date", value: selectedEvent.date },
                                        { label: "Location", value: selectedEvent.location },
                                        { label: "Spots Left", value: selectedEvent.status === "full" ? "Full" : `${selectedEvent.spotsLeft} / ${selectedEvent.totalSpots}` },
                                        { label: "Category", value: selectedEvent.category },
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <p style={{ fontSize: 10, color: "#7AAACE", fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</p>
                                            <p style={{ fontSize: 13, color: "#355872", fontWeight: 600, margin: 0 }}>{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p style={{ fontSize: 11, fontWeight: 700, color: "#355872", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Available Roles</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                                {selectedEvent.roles.map((role, i) => (
                                    <span key={i} style={{ background: "#EAF4FF", color: "#355872", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20 }}>{role}</span>
                                ))}
                            </div>

                            {applied[selectedEvent.id] && (
                                <div style={{ background: "#EAF4FF", border: "1px solid #9CD5FF", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, fontWeight: 600, color: "#355872" }}>
                                    ⏳ Application pending organizer review.
                                </div>
                            )}

                            <button
                                onClick={() => applied[selectedEvent.id] ? handleWithdraw(selectedEvent.id) : handleApply(selectedEvent)}
                                disabled={selectedEvent.status === "full" || loading[selectedEvent.id]}
                                style={{
                                    width: "100%", padding: "13px", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer",
                                    background: selectedEvent.status === "full" ? "#F0F0F0" : applied[selectedEvent.id] ? "#FFF0F0" : "#355872",
                                    color: selectedEvent.status === "full" ? "#9CA3AF" : applied[selectedEvent.id] ? "#C0392B" : "#fff",
                                }}
                            >
                                {loading[selectedEvent.id] ? "Processing..." : selectedEvent.status === "full" ? "This Event is Full" : applied[selectedEvent.id] ? "Withdraw Application" : "Apply to Volunteer →"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {toast && (
                <div style={{
                    position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
                    background: "#355872", color: "#9CD5FF", padding: "12px 28px", borderRadius: 12,
                    fontSize: 13, fontWeight: 700, zIndex: 1000,
                }}>
                    {toast}
                </div>
            )}
        </div>
    );
}