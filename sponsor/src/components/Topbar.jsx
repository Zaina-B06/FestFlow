import React from 'react';
import { sponsor } from '../data';

export default function Topbar({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) {
  const filters = ["All", "Tech", "Cultural", "Sports"];

  return (
    <header className="topbar">
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: 500, color: 'var(--navy)', marginRight: '20px' }}>
        <span style={{ background: 'var(--navy)', color: 'white', padding: '4px', borderRadius: '4px', fontSize: '1rem' }}>FF</span>
        FestFlow
      </div>

      <input 
        type="text" 
        className="search-input" 
        placeholder="Search campaigns..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="filter-chips">
        {filters.map(f => (
          <button 
            key={f}
            className={`chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="topbar-actions">
        <button className="icon-button">
          🔔
        </button>
        <div className="avatar" style={{width: 32, height: 32, fontSize: '0.8rem'}}>
          {sponsor.avatar}
        </div>
      </div>
    </header>
  );
}
