import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import Alerts from "./pages/Alerts";
import Help from "./pages/Help";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

const pages = { dashboard: Dashboard, events: Events, tasks: Tasks, schedule: Schedule, alerts: Alerts, help: Help, profile: Profile };

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const PageComponent = pages[activePage] || Dashboard;

  return (
    <div style={{ display: "flex", fontFamily: "'Inter', -apple-system, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ marginLeft: 200, flex: 1, minHeight: "100vh" }}>
        <PageComponent setActivePage={setActivePage} />
      </main>
    </div>
  );
}