import { volunteer } from "../../data/mockData";

export default function TopBar({ searchPlaceholder }) {
  return (
    <header style={{
      height: 60, background: "#fff", borderBottom: "1px solid #E8EDE8",
      display: "flex", alignItems: "center", padding: "0 32px", gap: 16,
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <input type="text" placeholder={searchPlaceholder || "Search..."}
        style={{
          width: 280, padding: "8px 16px",
          border: "1px solid #E2E8E2", borderRadius: 10,
          fontSize: 13, color: "#355872", background: "#F7F8F0", outline: "none",
        }}
      />
      <div style={{ flex: 1 }} />
      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7AAACE", fontSize: 18 }}>◫</button>
      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#7AAACE", fontSize: 18 }}>⚙</button>
      <div style={{ width: 1, height: 28, background: "#E8EDE8" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#355872" }}>{volunteer.name}</div>
          <div style={{ fontSize: 11, color: "#7AAACE", fontWeight: 600 }}>{volunteer.role}</div>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "#355872",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#9CD5FF", fontWeight: 800, fontSize: 12,
        }}>{volunteer.avatar}</div>
      </div>
    </header>
  );
}