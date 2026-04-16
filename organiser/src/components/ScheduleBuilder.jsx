import React from 'react';
import { Calendar as CalendarIcon, MapPin, MoreVertical } from 'lucide-react';

export default function ScheduleBuilder({ schedule }) {
  return (
    <div className="content-wrapper">
      <div style={{marginBottom: '40px'}}>
        <span className="header-label">EDITOR'S CHOICE</span>
        <h1 className="section-title">Daily<br/>Agenda.</h1>
        <p className="section-subtitle">Saturday, October 12th</p>
      </div>

      <div className="timeline">
        {schedule.map((session, index) => {
          const isActive = session.status === 'active';
          
          return (
             <div key={session.id} className={`timeline-item ${isActive ? 'active' : ''}`}>
               <div className="timeline-dot"></div>
               
               <div style={{display: 'flex', gap: '24px', alignItems: 'flex-start'}}>
                 <div style={{width: '70px', flexShrink: 0}}>
                   <span style={{fontSize: '0.85rem', fontWeight: 700, color: isActive ? 'var(--primary-orange)' : 'var(--primary-dark)'}}>
                     {session.time}
                   </span>
                 </div>
                 
                 <div className={`schedule-card ${isActive ? 'active' : ''}`} style={{flexGrow: 1, padding: isActive ? '28px' : '20px', marginTop: '-16px'}}>
                   <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                     <div>
                       <h3 style={{fontSize: isActive ? '1.4rem' : '1.1rem', color: isActive ? 'white' : 'var(--text-main)', marginBottom: '8px'}}>
                         {session.title}
                       </h3>
                       <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: isActive ? '#94A3B8' : 'var(--text-muted)'}}>
                         <MapPin size={14} />
                         {session.location}
                       </div>
                     </div>
                     <button style={{background: 'none', border: 'none', color: isActive ? '#475569' : '#CBD5E1', cursor: 'pointer'}}>
                       <MoreVertical size={20} />
                     </button>
                   </div>
                 </div>
               </div>
             </div>
          )
        })}
      </div>
      
      <div style={{marginTop: '32px', display: 'flex', justifyContent: 'center'}}>
        <button className="btn btn-dark" style={{padding: '0 32px'}}>
          <CalendarIcon size={18} /> Click + to schedule next activity
        </button>
      </div>
    </div>
  );
}
