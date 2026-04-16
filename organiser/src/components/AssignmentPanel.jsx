import React from 'react';
import { Zap, RotateCcw, MoreHorizontal } from 'lucide-react';
import { VOLUNTEER_POOL } from '../data';

export default function AssignmentPanel({ tasks, onAutoAssign, onReset, event }) {
  const filledTasks = tasks.filter(t => t.assignedVolunteer);
  const unfilledTasks = tasks.length - filledTasks.length;

  return (
    <div className="content-wrapper">
      <div style={{marginBottom: '40px'}}>
        <span className="header-label">MANAGEMENT CONSOLE</span>
        <h1 className="section-title">Assignments</h1>
        <p className="section-subtitle">{event.name} — Optimize your shift workflow.</p>
      </div>

      <div className="metrics-row">
        <div className="metric-tile">
          <span className="metric-label">FILLED</span>
          <span className="metric-value">{filledTasks.length.toString().padStart(2, '0')}</span>
        </div>
        <div className="metric-tile highlight">
          <span className="metric-label">UNFILLED</span>
          <span className="metric-value">{unfilledTasks.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <div className="card-dark" style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center'}}>
        <div>
          <h3 style={{color: 'white', fontSize: '1.25rem', marginBottom: '8px'}}>Optimize Workflow</h3>
          <p style={{color: '#94A3B8', fontSize: '0.9rem', maxWidth: '400px'}}>
            Let FestFlow balance the shifts based on volunteer preferences, skills, and availability.
          </p>
        </div>
        <button className="btn btn-primary" style={{width: '100%', maxWidth: '300px', height: '52px', fontSize: '1.1rem'}} onClick={onAutoAssign}>
          <Zap fill="currentColor" size={20} />
          Auto-Assign
        </button>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', marginBottom: '20px'}}>
        <h3 style={{fontSize: '1.25rem', fontWeight: 700}}>Active Rosters</h3>
        <button 
          onClick={onReset}
          style={{background: 'none', border: 'none', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase'}}
        >
          <RotateCcw size={14} /> RESET ASSIGNMENTS
        </button>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {tasks.map(task => {
          const assignee = VOLUNTEER_POOL.find(v => v.id === task.assignedVolunteer);
          
          return (
            <div key={task.id} className="card" style={{padding: '16px 20px', marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                {assignee ? (
                  <div className="avatar" style={{width: 44, height: 44, backgroundColor: '#3B82F6'}}>
                    {assignee.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                ) : (
                  <div className="avatar" style={{width: 44, height: 44, backgroundColor: '#F1F5F9', color: '#CBD5E1'}}>
                    ?
                  </div>
                )}
                
                <div>
                  <div style={{fontWeight: 700, fontSize: '1rem', color: assignee ? 'var(--text-main)' : '#94A3B8'}}>
                    {assignee ? assignee.name : 'Unassigned Slot'}
                  </div>
                  <div style={{fontSize: '0.85rem', color: assignee ? 'var(--text-muted)' : '#F97316', fontWeight: assignee ? 500 : 600}}>
                    {assignee ? task.title : `Requires ${task.requiredSkill.toUpperCase()}`}
                  </div>
                </div>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <span className={`badge ${assignee ? 'badge-blue' : 'badge-orange'}`} style={{fontSize: '0.65rem'}}>
                  {task.timeSlot}
                </span>
                <button className="btn-icon">
                   <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
