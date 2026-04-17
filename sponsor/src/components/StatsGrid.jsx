import React from 'react';
import { stats } from '../data';

export default function StatsGrid() {
  const cards = [
    {
      id: 'active',
      icon: '⊞',
      iconClass: 'icon-blue',
      value: stats.activeCampaigns,
      label: 'Active Campaigns',
      delta: stats.deltas.activeCampaigns
    },
    {
      id: 'events',
      icon: '◻',
      iconClass: 'icon-green',
      value: stats.eventsApplied,
      label: 'Events Applied',
      delta: stats.deltas.eventsApplied
    },
    {
      id: 'matches',
      icon: '★',
      iconClass: 'icon-amber',
      value: stats.matchesFound,
      label: 'Matches Found',
      delta: stats.deltas.matchesFound
    },
    {
      id: 'sponsorship',
      icon: 'ⓘ',
      iconClass: 'icon-green',
      value: stats.totalSponsorship,
      label: 'Total Sponsorship',
      delta: stats.deltas.totalSponsorship
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map(card => (
        <div key={card.id} className="stat-card">
          <div className={`icon-tile ${card.iconClass}`}>
            {card.icon}
          </div>
          <div className="stat-value">{card.value}</div>
          <div className="stat-label">{card.label}</div>
          <div className="delta">↑ {card.delta}</div>
        </div>
      ))}
    </div>
  );
}
