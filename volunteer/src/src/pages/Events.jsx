import { useState, useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import { BASE_URL, VOLUNTEER_ID } from "../config";

const categories = ["All", "Music", "Cultural", "Technology", "Business", "Sports", "Arts"];
const ROLES = ["Stage Manager", "Sound Crew", "Crowd Control", "Registration Desk", "Backstage Assist", "Photography Aid", "Guest Relations", "AV Support", "Floor Manager", "Any Role"];
const SKILLS = ["Marketing", "Design", "AV Tech", "Registrations", "Admin", "Logistics", "Medical/First Aid", "Photography", "Security", "Stage Management", "Social Media", "Crowd Control"];
const SLOTS = ["9am-12pm", "1pm-5pm", "Full Day"];

export default function Events() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [applied, setApplied] = useState({});
    const [loading, setLoading] = useState({});
    const [fetching, setFetching] = useState(true);
    const [toast, setToast] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [applyingTo, setApplyingTo] = useState(null);
    const [form, setForm] = useState({
        role_preference: "", skills_offered: [], availability: "", motivation: ""
    });

    useEffect(() => {
        fetchEvents();
        fetchApplications();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${BASE_URL}/events/`);
            const data = await res.json();
            setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch events", err);
        } finally {
            setFetching(false);
        }
    };

    const fetchApplications = async () => {
        try {
            const res = await fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/applications`);
            const data = await res.json();
            const map = {};
            if (Array.isArray(data)) data.forEach(app => { map[app.event_id] = app.status; });
            setApplied(map);
        } catch (err) {
            console.error("Failed to fetch applications", err);
        }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3500);
    };

    const openApplyForm = (event) => {
        setApplyingTo(event);
        setShowForm(true);
        setForm({ role_preference: "", skills_offered: [], availability: "", motivation: "" });
    };

    const toggleSkill = (skill) => {
        setForm(p => ({
            ...p,
            skills_offered: p.skills_offered.includes(skill)
                ? p.skills_offered.filter(s => s !== skill)
                : [...p.skills_offered, skill],
        }));
    };

    const handleApply = async () => {
        if (!applyingTo) return;
        setLoading(p => ({ ...p, [applyingTo.id]: true }));
        try {
            const res = await fetch(`${BASE_URL}/events/${applyingTo.id}/apply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    volunteer_id: VOLUNTEER_ID,
                    role_preference: form.role_preference,
                    skills_offered: JSON.stringify(form.skills_offered),
                    availability: form.availability,
                    motivation: form.motivation,
                }),
            });
            if (!res.ok) throw new Error();
            setApplied(p => ({ ...p, [applyingTo.id]: "pending" }));
            showToast(`Applied to ${applyingTo.name}! Awaiting confirmation.`);
            setShowForm(false);
            setApplyingTo(null);
            fetchEvents();
        } catch {
            showToast("Something went wrong. Try again.");
        } finally {
            setLoading(p => ({ ...p, [applyingTo?.id]: false }));
        }
    };

    const handleWithdraw = async (eventId) => {
        setLoading(p => ({ ...p, [eventId]: true }));
        try {
            const res = await fetch(`${BASE_URL}/events/${eventId}/withdraw`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ volunteer_id: VOLUNTEER_ID }),
            });
            if (!res.ok) throw new Error();
            setApplied(p => ({ ...p, [eventId]: null }));
            showToast("Application withdrawn.");
            fetchEvents();
        } catch {
            showToast("Something went wrong.");
        } finally {
            setLoading(p => ({ ...p, [eventId]: false }));
        }
    };

    const filtered = events.filter(e => {
        const matchCat = filter === "All" || e.category === filter;
        const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.location.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
            <TopBar searchPlaceholder="Search events..." />
            <div style={{ padding: "32px 36px" }}>

                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", margin: "0 0 4px" }}>Events</h1>
                    <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>Discover fests and sign up to volunteer.</p>
                </div>

                {/* Application Form Modal */}
                {showForm && applyingTo && (
                    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", width: 520, maxHeight: "88vh", overflowY: "auto", position: "relative" }}>
                            <button onClick={() => { setShowForm(false); setApplyingTo(null); }} style={{ position: "absolute", top: 16, right: 16, background: "#F7F8F0", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 18, color: "#7AAACE" }}>×</button>

                            <span style={{ background: "#EAF4FF", color: "#355872", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{applyingTo.category}</span>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#355872", margin: "10px 0 4px" }}>Apply to Volunteer</h2>
                            <p style={{ fontSize: 13, color: "#7AAACE", margin: "0 0 24px" }}>{applyingTo.name} · {applyingTo.date}</p>

                            {/* Role */}
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Preferred Role *</p>
                            <select
                                value={form.role_preference}
                                onChange={e => setForm(p => ({ ...p, role_preference: e.target.value }))}
                                style={{ width: "100%", padding: "9px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, color: "#355872", background: "#F7F8F0", marginBottom: 18, outline: "none" }}
                            >
                                <option value="">Select a role...</option>
                                {ROLES.map(r => <option key={r}>{r}</option>)}
                            </select>

                            {/* Skills */}
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Skills</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                                {SKILLS.map(skill => (
                                    <div key={skill} onClick={() => toggleSkill(skill)} style={{
                                        padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
                                        background: form.skills_offered.includes(skill) ? "#355872" : "#F7F8F0",
                                        color: form.skills_offered.includes(skill) ? "#9CD5FF" : "#7AAACE",
                                        border: form.skills_offered.includes(skill) ? "none" : "1px solid #D6E4EE",
                                    }}>
                                        {form.skills_offered.includes(skill) ? "✓ " : ""}{skill}
                                    </div>
                                ))}
                            </div>

                            {/* Availability */}
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Availability *</p>
                            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                                {SLOTS.map(slot => (
                                    <div key={slot} onClick={() => setForm(p => ({ ...p, availability: slot }))} style={{
                                        flex: 1, padding: "9px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "center", transition: "all 0.15s",
                                        background: form.availability === slot ? "#355872" : "#F7F8F0",
                                        color: form.availability === slot ? "#9CD5FF" : "#7AAACE",
                                        border: form.availability === slot ? "none" : "1px solid #D6E4EE",
                                    }}>{slot}</div>
                                ))}
                            </div>

                            {/* Motivation */}
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Why do you want to volunteer?</p>
                            <textarea
                                value={form.motivation}
                                onChange={e => setForm(p => ({ ...p, motivation: e.target.value }))}
                                placeholder="Tell us about yourself and why you'd like to help..."
                                style={{ width: "100%", height: 88, padding: "10px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, resize: "none", background: "#F7F8F0", color: "#355872", marginBottom: 20, outline: "none" }}
                            />

                            <button
                                onClick={handleApply}
                                disabled={!form.role_preference || !form.availability || loading[applyingTo.id]}
                                style={{
                                    width: "100%", padding: "13px", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer",
                                    background: (!form.role_preference || !form.availability) ? "#D6E4EE" : "#355872",
                                    color: "#fff",
                                }}
                            >
                                {loading[applyingTo.id] ? "Submitting..." : "Submit Application →"}
                            </button>
                        </div>
                    </div>
                )}

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

                {fetching ? (
                    <div style={{ textAlign: "center", padding: "60px 0", color: "#7AAACE", fontSize: 14 }}>Loading events...</div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: selectedEvent ? "1fr 380px" : "1fr", gap: 20 }}>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16, alignContent: "start" }}>
                            {filtered.map(event => {
                                const appSt = applied[event.id];
                                const isSelected = selectedEvent?.id === event.id;
                                const fillPct = ((event.total_spots - event.spots_left) / event.total_spots) * 100;

                                return (
                                    <div key={event.id} onClick={() => setSelectedEvent(isSelected ? null : event)} style={{
                                        background: "#fff", borderRadius: 16,
                                        border: isSelected ? "2px solid #7AAACE" : "1px solid #E8EDE8",
                                        padding: "20px", cursor: "pointer", transition: "all 0.15s",
                                        boxShadow: isSelected ? "0 0 0 4px rgba(122,170,206,0.12)" : "none",
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎉</div>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                                                <span style={{ background: "#EAF4FF", color: "#355872", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{event.category}</span>
                                                {appSt === "pending" && <span style={{ background: "#FFF3CD", color: "#856404", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Applied ⏳</span>}
                                                {appSt === "confirmed" && <span style={{ background: "#D4EDDA", color: "#155724", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Confirmed ✓</span>}
                                                {appSt === "rejected" && <span style={{ background: "#FFE8E8", color: "#C0392B", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Rejected</span>}
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 6px" }}>{event.name}</h3>
                                        <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 4px" }}>📅 {event.date}</p>
                                        <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 16px" }}>📍 {event.location}</p>

                                        <div style={{ marginBottom: 14 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7AAACE", marginBottom: 5, fontWeight: 600 }}>
                                                <span>Spots filled</span>
                                                <span style={{ color: event.status === "full" ? "#C0392B" : event.spots_left <= 5 ? "#D97706" : "#355872" }}>
                                                    {event.status === "full" ? "Full" : `${event.spots_left} left`}
                                                </span>
                                            </div>
                                            <div style={{ height: 5, background: "#EAF4FF", borderRadius: 10 }}>
                                                <div style={{ height: "100%", width: `${fillPct}%`, background: event.status === "full" ? "#C0392B" : fillPct > 70 ? "#D97706" : "#7AAACE", borderRadius: 10 }} />
                                            </div>
                                        </div>

                                        <button
                                            onClick={e => {
                                                e.stopPropagation();
                                                if (appSt) handleWithdraw(event.id);
                                                else openApplyForm(event);
                                            }}
                                            disabled={event.status === "full" || loading[event.id]}
                                            style={{
                                                width: "100%", padding: "9px", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700,
                                                cursor: event.status === "full" ? "default" : "pointer", transition: "all 0.15s",
                                                background: event.status === "full" ? "#F0F0F0" : appSt ? "#FFF0F0" : "#355872",
                                                color: event.status === "full" ? "#9CA3AF" : appSt ? "#C0392B" : "#fff",
                                            }}
                                        >
                                            {loading[event.id] ? "..." : event.status === "full" ? "Sold Out" : appSt ? "Withdraw" : "Apply to Volunteer"}
                                        </button>
                                    </div>
                                );
                            })}

                            {filtered.length === 0 && (
                                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#7AAACE" }}>
                                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                                    <p style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>No events found</p>
                                    <p style={{ fontSize: 13, margin: 0 }}>Try a different search or category.</p>
                                </div>
                            )}
                        </div>

                        {selectedEvent && (
                            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px", position: "sticky", top: 80, alignSelf: "start" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🎉</div>
                                    <button onClick={() => setSelectedEvent(null)} style={{ background: "#F7F8F0", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 16, color: "#7AAACE" }}>×</button>
                                </div>

                                <span style={{ background: "#EAF4FF", color: "#355872", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{selectedEvent.category}</span>
                                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#355872", margin: "10px 0 8px" }}>{selectedEvent.name}</h2>
                                <p style={{ fontSize: 13, color: "#7AAACE", margin: "0 0 18px", lineHeight: 1.7 }}>{selectedEvent.description}</p>

                                <div style={{ background: "#F7F8F0", borderRadius: 12, padding: "14px 16px", marginBottom: 18 }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                        {[
                                            { label: "Date", value: selectedEvent.date },
                                            { label: "Location", value: selectedEvent.location },
                                            { label: "Spots Left", value: selectedEvent.status === "full" ? "Full" : `${selectedEvent.spots_left} / ${selectedEvent.total_spots}` },
                                            { label: "Category", value: selectedEvent.category },
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <p style={{ fontSize: 10, color: "#7AAACE", fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</p>
                                                <p style={{ fontSize: 13, color: "#355872", fontWeight: 600, margin: 0 }}>{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {applied[selectedEvent.id] === "pending" && (
                                    <div style={{ background: "#EAF4FF", border: "1px solid #9CD5FF", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, fontWeight: 600, color: "#355872" }}>
                                        ⏳ Application pending organizer review.
                                    </div>
                                )}
                                {applied[selectedEvent.id] === "confirmed" && (
                                    <div style={{ background: "#D4EDDA", border: "1px solid #A7F3D0", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, fontWeight: 600, color: "#155724" }}>
                                        ✅ You're confirmed for this event!
                                    </div>
                                )}

                                <button
                                    onClick={() => applied[selectedEvent.id] ? handleWithdraw(selectedEvent.id) : openApplyForm(selectedEvent)}
                                    disabled={selectedEvent.status === "full" || loading[selectedEvent.id]}
                                    style={{
                                        width: "100%", padding: "13px", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer",
                                        background: selectedEvent.status === "full" ? "#F0F0F0" : applied[selectedEvent.id] ? "#FFF0F0" : "#355872",
                                        color: selectedEvent.status === "full" ? "#9CA3AF" : applied[selectedEvent.id] ? "#C0392B" : "#fff",
                                    }}
                                >
                                    {loading[selectedEvent.id] ? "Processing..." : selectedEvent.status === "full" ? "Full" : applied[selectedEvent.id] ? "Withdraw Application" : "Apply to Volunteer →"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {toast && (
                <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#355872", color: "#9CD5FF", padding: "12px 28px", borderRadius: 12, fontSize: 13, fontWeight: 700, zIndex: 1000 }}>
                    {toast}
                </div>
            )}
        </div>
    );
}