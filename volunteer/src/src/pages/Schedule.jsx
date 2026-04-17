import React, { useState } from "react";
import TopBar from "../components/layout/TopBar";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Today");

  const DUMMY_SCHEDULE = {
    "Yesterday": [
      { id: 1, time: "09:00 AM - 12:00 PM", title: "Information Desk", location: "Main Entrance", status: "completed" },
      { id: 2, time: "01:00 PM - 04:00 PM", title: "Crowd Control", location: "Stage B", status: "completed" },
    ],
    "Today": [
      { id: 3, time: "10:00 AM - 01:00 PM", title: "Artist Reception", location: "Backstage A", status: "completed" },
      { id: 4, time: "02:00 PM - 05:00 PM", title: "Merchandise Stall", location: "Zone C", status: "active" },
      { id: 5, time: "06:00 PM - 09:00 PM", title: "Stage Setup Assistance", location: "Main Stage", status: "upcoming" },
    ],
    "Tomorrow": [
      { id: 6, time: "11:00 AM - 02:00 PM", title: "VIP Area Escort", location: "VIP Lounge", status: "upcoming" },
      { id: 7, time: "04:00 PM - 08:00 PM", title: "Closing Ceremony Prep", location: "Main Arena", status: "upcoming" },
    ]
  };

  const currentSchedule = DUMMY_SCHEDULE[activeDay] || [];

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search schedule..." />
      <div style={{ padding: "32px 36px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 6px" }}>My Schedule</h1>
          <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>View your upcoming shifts and completed hours.</p>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {["Yesterday", "Today", "Tomorrow"].map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              style={{
                padding: "10px 24px",
                borderRadius: 20,
                border: "none",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                background: activeDay === day ? "#355872" : "#EAF4FF",
                color: activeDay === day ? "#fff" : "#7AAACE",
                transition: "all 0.2s"
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px 28px" }}>
          {currentSchedule.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#7AAACE" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#355872", margin: "0 0 4px" }}>No shifts scheduled</p>
              <p style={{ fontSize: 13, margin: 0 }}>You have no shifts on this day.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {currentSchedule.map(shift => {
                const isCompleted = shift.status === "completed";
                const isActive = shift.status === "active";
                return (
                  <div key={shift.id} style={{ 
                    display: "flex", 
                    gap: 20, 
                    padding: "16px", 
                    background: isActive ? "#EAF4FF" : "#F7F8F0", 
                    borderRadius: 12, 
                    border: `1px solid ${isActive ? "#9CD5FF" : "#E8EDE8"}`,
                    opacity: isCompleted ? 0.7 : 1
                  }}>
                    <div style={{ 
                      width: 80, 
                      textAlign: "right", 
                      fontSize: 13, 
                      fontWeight: 700, 
                      color: isActive ? "#355872" : "#7AAACE",
                      paddingTop: 4
                    }}>
                      {shift.time.split(" - ")[0]}
                      <div style={{ fontSize: 11, fontWeight: 500, color: "#94A3B8" }}>
                        to {shift.time.split(" - ")[1]}
                      </div>
                    </div>
                    <div style={{ 
                      width: 4, 
                      background: isActive ? "#355872" : isCompleted ? "#D6E4EE" : "#9CD5FF", 
                      borderRadius: 2 
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                         <h3 style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: 0, textDecoration: isCompleted ? "line-through" : "none" }}>{shift.title}</h3>
                         {isActive && <span style={{ background: "#355872", color: "#9CD5FF", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>NOW</span>}
                         {isCompleted && <span style={{ color: "#7AAACE", fontSize: 12, fontWeight: 700 }}>✓ Done</span>}
                      </div>
                      <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>📍 {shift.location}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}