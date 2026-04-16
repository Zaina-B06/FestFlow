import React, { useState } from 'react';
import { PlayCircle, MoreHorizontal, AlertTriangle, Users } from 'lucide-react';
import { VOLUNTEER_POOL } from '../data';

export default function LiveDashboard({ tasks, flashMap, onWithdraw, event }) {
  const [selectedVol, setSelectedVol] = useState('');
  const [banner, setBanner] = useState(null);

  const filledTasks = tasks.filter(t => t.assignedVolunteer);
  const assignedVolunteersList = VOLUNTEER_POOL.filter(v => tasks.some(t => t.assignedVolunteer === v.id));

  const handleWithdrawClick = () => {
    if (!selectedVol) return;
    const task = tasks.find(t => t.assignedVolunteer === selectedVol);
    if (!task) return;

    const { reassigned, replacementName, volName, taskName } = onWithdraw(selectedVol, task.id);
    
    setBanner({
      msg: `${volName} withdrew from ${taskName}. ${reassigned ? `Replacement found (${replacementName}).` : 'No replacement available.'}`,
      type: reassigned ? 'success' : 'warning'
    });
    
    setSelectedVol('');
  };

  return (
    <div className="content-wrapper">
      {banner && (
        <div className="top-banner" style={{
          backgroundColor: banner.type === 'success' ? '#121E2C' : '#FFF7ED',
          color: banner.type === 'success' ? 'white' : '#C2410C',
          border: banner.type === 'warning' ? '1px solid #FFEDD5' : 'none'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <AlertTriangle size={20} />
            <span style={{fontWeight: 500}}>{banner.msg}</span>
          </div>
          <button 
            style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit'}}
            onClick={() => setBanner(null)}
          >
            &times;
          </button>
        </div>
      )}

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px'}}>
        <div>
          <span className="header-label">MANAGEMENT CONSOLE</span>
          <h1 className="section-title">Tasks & Assignment</h1>
          <p className="section-subtitle">Coordinate assignments across {event.name}.</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <div className="avatar-group">
            {assignedVolunteersList.slice(0, 3).map((v, i) => (
              <div key={v.id} className="avatar" style={{width: 36, height: 36, fontSize: '0.75rem', zIndex: 3-i}}>
                {v.name.split(' ').map(n=>n[0]).join('')}
              </div>
            ))}
            {assignedVolunteersList.length > 3 && (
              <div className="avatar" style={{width: 36, height: 36, fontSize: '0.75rem', backgroundColor: '#F1F5F9', color: '#64748B', zIndex: 0}}>
                +{assignedVolunteersList.length - 3}
              </div>
            )}
          </div>
          <button className="btn btn-outline" style={{height: '36px', fontSize: '0.85rem'}}>
            Manage Team
          </button>
        </div>
      </div>

      <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: 700}}>
          <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444'}}></div>
          Priority: Critical
        </div>
        <span className="badge badge-red" style={{borderRadius: '4px'}}>{tasks.filter(t=>t.priority==='high').length} TASKS</span>
      </div>

      <div className="task-list" style={{marginBottom: '40px'}}>
        {tasks.filter(t => t.priority === 'high').map(task => {
          const assignee = VOLUNTEER_POOL.find(v => v.id === task.assignedVolunteer);
          const flashClass = flashMap[task.id] === 'green' ? 'flash-green-anim' : (flashMap[task.id] === 'red' ? 'flash-red-anim' : '');

          return (
            <div key={task.id} className={`task-item ${flashClass}`}>
              <div className="task-item-header">
                <span className="badge badge-orange">{task.requiredSkill}</span>
                <MoreHorizontal size={20} color="#CBD5E1" />
              </div>
              <h3 style={{fontSize: '1.25rem', marginBottom: '16px'}}>{task.title}</h3>
              
              <div className="task-progress">
                 <div className="task-progress-bar" style={{width: assignee ? '100%' : '20%', backgroundColor: assignee ? 'var(--primary-dark)' : '#CBD5E1'}}></div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  {assignee ? (
                    <>
                      <div className="avatar" style={{width: 28, height: 28, fontSize: '0.6rem'}}>{assignee.name.split(' ').map(n=>n[0]).join('')}</div>
                      <span style={{fontSize: '0.85rem', fontWeight: 600}}>{assignee.name}</span>
                    </>
                  ) : (
                    <>
                      <div className="avatar" style={{width: 28, height: 28, fontSize: '0.6rem', background: '#F1F5F9', color: '#94A3B8'}}>?</div>
                      <span style={{fontSize: '0.85rem', fontWeight: 500, color: '#94A3B8'}}>Unassigned</span>
                    </>
                  )}
                </div>
                <span style={{fontSize: '0.8rem', fontWeight: 700, color: '#EF4444'}}>
                   {task.timeSlot}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 700}}>
          <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--blue-main)'}}></div>
          Active Flow
        </div>
        <span className="badge badge-gray" style={{borderRadius: '4px'}}>{tasks.filter(t=>t.priority!=='high').length} TASKS</span>
      </div>

      <div className="task-list" style={{marginBottom: '40px'}}>
        {tasks.filter(t => t.priority !== 'high').map(task => {
          const assignee = VOLUNTEER_POOL.find(v => v.id === task.assignedVolunteer);
          const flashClass = flashMap[task.id] === 'green' ? 'flash-green-anim' : (flashMap[task.id] === 'red' ? 'flash-red-anim' : '');

          return (
            <div key={task.id} className={`task-item ${flashClass}`} style={{opacity: 0.9}}>
              <div className="task-item-header">
                <span className="badge badge-gray">{task.requiredSkill}</span>
                <MoreHorizontal size={20} color="#CBD5E1" />
              </div>
              <h3 style={{fontSize: '1.1rem'}}>{task.title}</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px'}}>
                 <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  {assignee && <div className="avatar" style={{width: 24, height: 24, fontSize: '0.5rem'}}>{assignee.name.split(' ').map(n=>n[0]).join('')}</div>}
                  <span style={{fontSize: '0.8rem', color: '#64748B'}}>{assignee ? assignee.name : 'Unassigned'}</span>
                 </div>
                 <span style={{fontSize: '0.75rem', color: '#94A3B8'}}>{task.timeSlot}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card" style={{border: '1px solid #FFEDD5', backgroundColor: '#FFF7ED'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <div className="alert-icon-wrapper icon-orange"><AlertTriangle size={20}/></div>
          <div>
            <h3 style={{fontSize: '1.1rem', color: '#C2410C'}}>Simulate Withdrawal</h3>
            <p style={{fontSize: '0.85rem', color: '#EA580C'}}>Test logic by dropping a volunteer.</p>
          </div>
        </div>
        <div style={{display: 'flex', gap: '16px'}}>
          <select 
            className="form-control" 
            style={{background: 'white'}}
            value={selectedVol}
            onChange={(e) => setSelectedVol(e.target.value)}
          >
            <option value="">-- Select Volunteer --</option>
            {assignedVolunteersList.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
          <button className="btn btn-primary" style={{flexShrink: 0}} onClick={handleWithdrawClick} disabled={!selectedVol}>
            Mark Withdrawn
          </button>
        </div>
      </div>
    </div>
  );
}
