import React from 'react';
import { Settings, Zap, History, UserMinus, AlertCircle, PlusCircle } from 'lucide-react';

export default function ActivityLog({ log }) {
  const getLogStyle = (type) => {
    switch (type) {
      case 'event': return { icon: <Zap size={20} color="#16A34A" />, bgClass: 'icon-green', title: 'System Automation Run' };
      case 'assign': return { icon: <PlusCircle size={20} color="#3B82F6" />, bgClass: 'icon-blue', title: 'Role Assigned' };
      case 'drop': return { icon: <UserMinus size={20} color="#EF4444" />, bgClass: 'icon-red', title: 'Shift Dropped' };
      case 'warn': return { icon: <AlertCircle size={20} color="#F97316" />, bgClass: 'icon-orange', title: 'System Alert' };
      case 'reassign': return { icon: <History size={20} color="#0D9488" />, bgClass: 'icon-teal', title: 'Immediate Reassignment' };
      default: return { icon: <Settings size={20} color="#64748B" />, bgClass: 'icon-gray', title: 'System Event' };
    }
  };

  return (
    <div className="content-wrapper">
      <div style={{marginBottom: '40px'}}>
        <h1 className="section-title">Activity</h1>
        <p className="section-subtitle">Real-time system events and audit trails.</p>
      </div>

      <div className="filters-row">
        <div className="filter-pill active">All events</div>
        <div className="filter-pill">Assignments</div>
        <div className="filter-pill">System Runs</div>
      </div>

      <div style={{marginTop: '32px'}}>
        <div className="header-label" style={{marginBottom: '16px', color: '#94A3B8'}}>TODAY</div>
        
        {log.map(entry => {
          const style = getLogStyle(entry.type);
          return (
             <div key={entry.id} className="log-item" style={{boxShadow: entry.type === 'drop' ? '0 0 0 1px #FEE2E2' : 'var(--shadow-sm)'}}>
               <div className={`alert-icon-wrapper ${style.bgClass}`}>
                 {style.icon}
               </div>
               <div style={{flexGrow: 1}}>
                 <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <h3 style={{fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      {style.title}
                    </h3>
                    <span style={{fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8'}}>{entry.time}</span>
                 </div>
                 <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '12px'}}>
                   {entry.msg}
                 </p>
                 <div style={{display: 'flex', gap: '8px'}}>
                   {entry.type === 'event' && <span className="badge badge-teal">OPTIMIZED</span>}
                   {entry.type === 'drop' && <span className="badge badge-red">IMMEDIATE ACTION REQ.</span>}
                   {entry.type === 'warn' && <span className="badge badge-orange">ATTENTION</span>}
                 </div>
               </div>
             </div>
          )
        })}
      </div>
      
      <div style={{marginTop: '32px', display: 'flex', justifyContent: 'center'}}>
        <button className="btn btn-outline" style={{padding: '0 32px'}}>
          View Historical Logs
        </button>
      </div>
    </div>
  );
}
