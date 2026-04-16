import React, { useState } from 'react';
import { Send, AlertTriangle, Info, BellRing } from 'lucide-react';

export default function AlertsBoard({ alerts, setAlerts, event }) {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('info');
  const [filter, setFilter] = useState('all');

  const handlePost = (e) => {
    e.preventDefault();
    if (!message) return;

    const newAlert = {
      id: Date.now().toString(),
      message,
      priority,
      time: 'JUST NOW'
    };

    setAlerts([newAlert, ...alerts]);
    setMessage('');
    setPriority('info');
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : filter === 'critical' ? alerts.filter(a => a.priority === 'urgent')
    : alerts;

  const getPriorityStyle = (pri) => {
    switch (pri) {
      case 'urgent': return { badgeClass: 'badge-red', label: 'CRITICAL', icon: <AlertTriangle size={20} color="#EF4444" /> };
      case 'reminder': return { badgeClass: 'badge-orange', label: 'WARNING', icon: <BellRing size={20} color="#F97316" /> };
      default: return { badgeClass: 'badge-blue', label: 'INFO', icon: <Info size={20} color="#3B82F6" /> };
    }
  };

  return (
    <div className="content-wrapper">
      <div style={{marginBottom: '40px'}}>
        <span className="header-label">COMMUNICATIONS</span>
        <h1 className="section-title">Alerts Board</h1>
        <p className="section-subtitle">Broadcast real-time updates.</p>
      </div>

      <div className="card" style={{padding: '32px', marginBottom: '40px'}}>
        <span className="header-label" style={{marginBottom: '16px'}}>NEW UPDATE</span>
        <form onSubmit={handlePost}>
          <div className="form-group">
            <textarea
              className="form-control"
              style={{backgroundColor: '#F8FAFC', border: 'none', borderRadius: '16px', padding: '20px', fontSize: '1rem'}}
              placeholder="What's happening at the festival?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{display: 'flex', gap: '12px'}}>
              <button type="button" className={`badge ${priority === 'urgent' ? 'badge-red' : 'badge-gray'}`} style={{border: 'none', cursor: 'pointer', outline: priority === 'urgent' ? '2px solid #FECACA' : 'none'}} onClick={() => setPriority('urgent')}>CRITICAL</button>
              <button type="button" className={`badge ${priority === 'reminder' ? 'badge-orange' : 'badge-gray'}`} style={{border: 'none', cursor: 'pointer'}} onClick={() => setPriority('reminder')}>WARNING</button>
              <button type="button" className={`badge ${priority === 'info' ? 'badge-blue' : 'badge-gray'}`} style={{border: 'none', cursor: 'pointer'}} onClick={() => setPriority('info')}>INFO</button>
            </div>
            <button type="submit" className="btn btn-dark" style={{width: '48px', height: '48px', borderRadius: '50%', padding: 0}}>
              <Send size={20} style={{marginLeft: '-2px'}}/>
            </button>
          </div>
        </form>
      </div>

      <div className="filters-row">
        <span>FILTER BY:</span>
        <div className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={()=>setFilter('all')}>All Alerts</div>
        <div className={`filter-pill ${filter === 'posts' ? 'active' : ''}`} onClick={()=>setFilter('posts')}>My Posts</div>
        <div className={`filter-pill ${filter === 'critical' ? 'active' : ''}`} onClick={()=>setFilter('critical')}>Critical Only</div>
      </div>

      <div>
        {filteredAlerts.map(alert => {
          const style = getPriorityStyle(alert.priority);
          return (
            <div key={alert.id} className="alert-feed-item">
              <div style={{flexGrow: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                  <span className={`badge ${style.badgeClass}`}>{style.label}</span>
                  <span style={{fontSize: '0.75rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase'}}>{alert.time}</span>
                </div>
                <h3 style={{fontSize: '1.2rem', marginBottom: '16px', lineHeight: 1.4, color: 'var(--primary-dark)'}}>
                  {alert.message}
                </h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div className="avatar" style={{width: 24, height: 24, fontSize: '0.6rem'}}>MN</div>
                  <span style={{fontSize: '0.85rem', color: '#64748B', fontWeight: 500}}>Meera N. <span style={{color: '#CBD5E1'}}>• Operations</span></span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
