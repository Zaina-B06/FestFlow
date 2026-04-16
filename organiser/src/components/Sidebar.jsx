import React from 'react';
import { Calendar, Users, LayoutDashboard, Bell, Activity, PlusCircle, LayoutList } from 'lucide-react';
import { organiser } from '../data';

const SECTIONS = [
  { id: 'dashboard', label: 'Tasks & Assignment', icon: LayoutDashboard },
  { id: 'schedule', label: 'Daily Agenda', icon: Calendar },
  { id: 'assignments', label: 'Assignments', icon: Users },
  { id: 'alerts', label: 'Alerts Board', icon: Bell },
  { id: 'log', label: 'Activity Log', icon: Activity },
  { id: 'post-event', label: 'Create Event', icon: PlusCircle }
];

export default function Sidebar({ event, activeSection, setActiveSection }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div style={{width: 32, height: 32, backgroundColor: 'var(--primary-orange)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <LayoutList size={20} color="white" />
        </div>
        <span className="sidebar-brand">FestFlow</span>
      </div>

      <div style={{padding: '0 24px', marginBottom: '24px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px'}}>
          <div className="avatar" style={{width: 36, height: 36, fontSize: '0.8rem'}}>
            {organiser.avatar}
          </div>
          <div>
            <div style={{fontSize: '0.85rem', fontWeight: 600}}>{organiser.name}</div>
            <div style={{fontSize: '0.7rem', color: '#94A3B8'}}>{organiser.role}</div>
          </div>
        </div>
      </div>

      <div className="sidebar-nav">
        <div style={{padding: '0 16px', marginBottom: 8, fontSize: '0.75rem', fontWeight: 600, color: '#64748B', letterSpacing: '1px'}}>
          MANAGEMENT CONSOLE
        </div>
        {SECTIONS.map(section => {
          const Icon = section.icon;
          return (
            <div 
              key={section.id} 
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <Icon size={18} strokeWidth={2.5} />
              {section.label}
            </div>
          );
        })}
      </div>

      <div style={{padding: '24px'}}>
        {event && (
          <div style={{background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
              <span className={`status-pill ${event.status}`}>{event.status}</span>
            </div>
            <div style={{fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px'}}>{event.name}</div>
            <div style={{fontSize: '0.75rem', color: '#94A3B8'}}>{event.date}</div>
          </div>
        )}
      </div>
    </div>
  );
}
