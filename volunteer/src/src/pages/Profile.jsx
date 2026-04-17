import { useState, useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import { BASE_URL, VOLUNTEER_ID } from "../config";
const ALL_SKILLS = [
    "Marketing", "Design", "AV Tech", "Registrations",
    "Admin", "Logistics", "Medical/First Aid", "Photography",
    "Security", "Stage Management", "Social Media", "Crowd Control"
];

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/profile`)
            .then(async r => {
                if (!r.ok) {
                    const text = await r.text();
                    throw new Error(`Server returned ${r.status}: ${text}`);
                }
                return r.json();
            })
            .then(data => {
                setProfile(data);
                if (data.skills) {
                    try {
                        setSelectedSkills(JSON.parse(data.skills));
                    } catch (e) {
                        setSelectedSkills([]);
                    }
                }
            }).catch(err => {
                console.error(err);
                setError("Could not load profile. Did you run db_migrate.py?");
                // Fallback basic profile so it doesn't get stuck simply "Loading..." permanently
                setProfile({ name: "Volunteer", email: "volunteer@example.com", role: "Volunteer", radio_channel: "CH-09" });
            });
    }, []);

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch(`${BASE_URL}/volunteers/${VOLUNTEER_ID}/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ skills: JSON.stringify(selectedSkills) })
            });
        } catch (e) {
            console.error("Failed to save profile", e);
            alert("Failed to save. Is your backend running? Have you run db_migrate.py?");
        } finally {
            setTimeout(() => setSaving(false), 800);
        }
    };

    if (!profile) return (
        <div style={{ background: "#F7F8F0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#7AAACE", fontWeight: 600 }}>Loading profile...</p>
        </div>
    );

    return (
        <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
            <TopBar searchPlaceholder="Search..." />

            <div style={{ padding: "32px 36px", maxWidth: 900 }}>
                {error && (
                    <div style={{ background: "#FFF0F0", border: "1px solid #C0392B", color: "#C0392B", padding: "16px", borderRadius: 12, marginBottom: 24, fontWeight: 600 }}>
                        ⚠️ Cannot pull your real profile data from the database. <br /><br />
                        <span style={{ fontSize: 13, fontWeight: "normal" }}>
                            You just need to restart your backend to sync the changes! <br />
                            Please go to your backend terminal, stop the server (<b>Ctrl+C</b>), and run <b>uvicorn main:app --reload</b> again.
                        </span>
                    </div>
                )}

                <h1 style={{ fontSize: 24, fontWeight: 800, color: "#355872", marginBottom: 24 }}>My Profile</h1>

                {/* Volunteer ID Card */}
                <div style={{
                    background: "linear-gradient(135deg, #355872 0%, #1e3547 100%)",
                    borderRadius: 20, padding: 0, border: "1px solid #E8EDE8",
                    marginBottom: 24, display: "flex", overflow: "hidden", color: "#fff",
                    boxShadow: "0 10px 30px rgba(53, 88, 114, 0.15)"
                }}>
                    <div style={{ width: 12, background: "#7AAACE" }} />

                    <div style={{ padding: "32px", flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                            <div style={{ width: 90, height: 90, borderRadius: 16, background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#355872", border: "2px solid #fff" }}>
                                {profile.name ? profile.name.charAt(0) : "V"}
                            </div>

                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                                    <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>{profile.name}</h2>
                                    <span style={{ background: "rgba(156,213,255,0.2)", color: "#9CD5FF", padding: "4px 10px", borderRadius: 12, fontSize: 10, fontWeight: 800, letterSpacing: "1px" }}>
                                        VOL-{1000 + (profile.id || 12)}
                                    </span>
                                </div>
                                <p style={{ margin: "0 0 12px", fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{profile.role?.toUpperCase()}</p>

                                <div style={{ display: "flex", gap: 24 }}>
                                    <div>
                                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: "0 0 2px", textTransform: "uppercase" }}>Email</p>
                                        <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{profile.email}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: "0 0 2px", textTransform: "uppercase" }}>Radio</p>
                                        <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{profile.radio_channel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fake QR Code */}
                        <div style={{ background: "#fff", padding: 8, borderRadius: 12 }}>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=FESTFLOW_VOL_${profile.id || 12}`} alt="QR Code" style={{ display: "block" }} />
                        </div>
                    </div>
                </div>

                {/* Skills Box */}
                <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #E8EDE8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <p style={{ margin: 0, fontSize: 13, color: "#7AAACE", fontWeight: 700, textTransform: "uppercase" }}>Volunteer Skills</p>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                background: saving ? "#9CA3AF" : "#355872",
                                color: "#fff", border: "none", borderRadius: 8,
                                padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer",
                            }}
                        >
                            {saving ? "Saving..." : "Save Selection"}
                        </button>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {ALL_SKILLS.map(skill => {
                            const isSelected = selectedSkills.includes(skill);
                            return (
                                <button
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    style={{
                                        background: isSelected ? "#355872" : "#F7F8F0",
                                        color: isSelected ? "#fff" : "#355872",
                                        border: isSelected ? "1px solid #355872" : "1px solid #E8EDE8",
                                        borderRadius: 8, padding: "8px 12px",
                                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                                    }}
                                >
                                    {isSelected ? "✓ " : "+ "}{skill}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
