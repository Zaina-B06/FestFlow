import { useState } from "react";
import { coordinators, faqs } from "../data/mockData";
import TopBar from "../components/layout/TopBar";

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [subject, setSubject] = useState("Equipment Issue");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: "#F7F8F0", minHeight: "100vh" }}>
      <TopBar searchPlaceholder="Search FAQs or coordinators..." />
      <div style={{ padding: "32px 36px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#355872", letterSpacing: "-0.5px", margin: "0 0 4px" }}>Help Center</h1>
          <p style={{ fontSize: 13, color: "#7AAACE", margin: 0 }}>Need help? Your coordinators and answers are right here.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Coordinators */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: "0 0 3px" }}>Your Coordinators</h2>
                  <p style={{ fontSize: 12, color: "#7AAACE", margin: 0 }}>Direct points of contact during the fest.</p>
                </div>
                <span style={{ background: "#EAF4FF", color: "#355872", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>● Online Now</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {coordinators.map((c, i) => (
                  <div key={i} style={{ border: "1px solid #E8EDE8", borderRadius: 12, padding: "18px 20px", background: "#F7F8F0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: "50%",
                        background: i === 0 ? "#355872" : "#7AAACE",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 800,
                        color: i === 0 ? "#9CD5FF" : "#fff",
                      }}>{c.avatar}</div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#355872", margin: "0 0 2px" }}>{c.name}</p>
                        <p style={{ fontSize: 10, color: "#7AAACE", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>{c.role}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#355872", margin: "0 0 3px", fontWeight: 500 }}>📞 {c.phone}</p>
                    <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 14px" }}>📍 {c.location}</p>
                    <button style={{ width: "100%", padding: "9px", background: "#fff", border: "1px solid #D6E4EE", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#355872", cursor: "pointer" }}>
                      Connect via Radio
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "24px 28px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 20px" }}>Quick answers for common fest day questions.</p>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid #F7F8F0" : "none" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%", padding: "16px 0", background: "none", border: "none",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#355872" }}>{faq.q}</span>
                    <span style={{
                      fontSize: 18, color: "#7AAACE", flexShrink: 0, marginLeft: 12,
                      transform: openFaq === i ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s", display: "inline-block",
                    }}>▾</span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: 13, color: "#7AAACE", paddingBottom: 16, margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Support ticket */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E8EDE8", padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#355872", margin: "0 0 4px" }}>Send a Support Ticket</h3>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 20px" }}>Non-urgent issues answered within 1 hour.</p>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#355872", margin: "0 0 4px" }}>Ticket Submitted!</p>
                  <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 16px" }}>We'll get back to you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setMessage(""); }}
                    style={{ padding: "8px 20px", background: "#F7F8F0", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#355872", cursor: "pointer" }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Subject</p>
                  <select
                    value={subject} onChange={e => setSubject(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, color: "#355872", background: "#F7F8F0", marginBottom: 16, outline: "none" }}
                  >
                    <option>Equipment Issue</option>
                    <option>Schedule Conflict</option>
                    <option>Crowd Emergency</option>
                    <option>Food / Stall Issue</option>
                    <option>Other</option>
                  </select>

                  <p style={{ fontSize: 11, fontWeight: 700, color: "#7AAACE", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Message</p>
                  <textarea
                    value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your issue..."
                    style={{ width: "100%", height: 110, padding: "10px 12px", border: "1px solid #D6E4EE", borderRadius: 10, fontSize: 13, resize: "none", background: "#F7F8F0", color: "#355872", marginBottom: 16, outline: "none" }}
                  />
                  <button
                    onClick={() => message.trim() && setSubmitted(true)}
                    style={{ width: "100%", padding: "12px", background: "#355872", border: "none", borderRadius: 10, color: "#9CD5FF", fontWeight: 800, fontSize: 13, cursor: "pointer" }}
                  >
                    Submit Ticket
                  </button>
                </>
              )}
            </div>

            {/* Emergency callout */}
            <div style={{ background: "#EAF4FF", borderRadius: 14, border: "1px solid #9CD5FF", padding: "18px 20px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 6px" }}>🚨 Medical Emergency?</p>
              <p style={{ fontSize: 12, color: "#7AAACE", margin: "0 0 12px", lineHeight: 1.6 }}>
                Go directly to the <span style={{ fontWeight: 800, color: "#355872" }}>Medical Tent at Gate 2</span>. Don't wait — call <span style={{ fontWeight: 800, color: "#355872" }}>EXT-204</span> immediately.
              </p>
              <div style={{ background: "#355872", borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#9CD5FF" }}>EXT-204</span>
              </div>
            </div>

            {/* Volunteer tips */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E8EDE8", padding: "18px 20px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#355872", margin: "0 0 14px" }}>💡 Quick Tips</p>
              {[
                "Carry your volunteer badge at all times.",
                "Stay hydrated — water stations are at every gate.",
                "If lost, your radio channel CH-09 connects to all coordinators.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9CD5FF", marginTop: 5, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: "#7AAACE", margin: 0, lineHeight: 1.6 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}