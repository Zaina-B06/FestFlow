import React from 'react';
import { sponsor } from '../data';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">
        <span style={{ background: 'var(--navy)', color: 'white', padding: '4px', borderRadius: '4px' }}>FF</span>
        FestFlow
      </h2>
      
      <div className="nav-section">
        <div className="nav-label">Main</div>
        <div className="nav-item">
          <span>Dashboard</span>
        </div>
        <div className="nav-item">
          <span>Events</span>
          <span className="badge">12</span>
        </div>
        <div className="nav-item active">
          <span>Sponsorships</span>
          <span className="badge">5</span>
        </div>
        <div className="nav-item">
          <span>Campaigns</span>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Insights</div>
        <div className="nav-item">
          <span>Analytics</span>
        </div>
        <div className="nav-item">
          <span>Profile</span>
        </div>
      </div>

      <div className="user-profile">
        <div className="avatar">{sponsor.avatar}</div>
        <div className="user-info">
          <div className="name">{sponsor.name}</div>
          <div className="role">{sponsor.role}</div>
        </div>
      </div>
    </aside>
  );
}
