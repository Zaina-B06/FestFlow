import React, { useState } from 'react';

export default function CampaignList({ campaigns, activeFilter, searchQuery }) {
  const [sortBy, setSortBy] = useState('matches');

  const filteredCampaigns = campaigns.filter(c => {
    const matchCat = activeFilter === 'All' || c.category === activeFilter;
    const matchSearch = c.name.toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchCat && matchSearch;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === 'matches') return b.matches - a.matches;
    if (sortBy === 'budget') {
      const budgetA = parseInt(a.budget.replace(/[^0-9]/g, '')) || 0;
      const budgetB = parseInt(b.budget.replace(/[^0-9]/g, '')) || 0;
      return budgetB - budgetA;
    }
    return 0;
  });

  return (
    <div className="campaigns-col">
      <div className="section-header">
        <div>
          <h3>Active Campaigns</h3>
          <p>Your brand campaigns seeking event matches</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select 
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', outline: 'none' }} 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="matches">Sort by: Matches</option>
            <option value="budget">Sort by: Budget</option>
          </select>
          <a href="#" className="view-all">View all</a>
        </div>
      </div>

      <div className="campaign-list">
        {sortedCampaigns.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <div className="icon-tile icon-blue" style={{ marginBottom: 0 }}>
              {campaign.icon}
            </div>
            
            <div className="campaign-details">
              <div className="campaign-name">
                {campaign.name}
                <span className={`status-badge status-${campaign.status}`}>
                  {campaign.status}
                </span>
              </div>
              <div className="campaign-meta">
                <span>{campaign.budget}</span>
                <span>•</span>
                <span className={`cat-badge cat-${campaign.category}`}>{campaign.category}</span>
              </div>
            </div>

            <div className="matches-count">
              {campaign.matches} matches
            </div>

            <button 
              className="action-btn" 
              disabled={campaign.status === 'full'}
            >
              View Matches
            </button>
          </div>
        ))}
        {sortedCampaigns.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No campaigns found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
