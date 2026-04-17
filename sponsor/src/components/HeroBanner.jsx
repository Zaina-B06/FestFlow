import React from 'react';
import { stats } from '../data';

export default function HeroBanner({ onOpenModal }) {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="hero-tag">Sponsorship Hub</div>
        <h1>Sponsorship Dashboard</h1>
        <p>Manage campaigns and connect with college events</p>
        <button className="primary-btn" onClick={onOpenModal}>
          + Create Campaign
        </button>
      </div>
      <div className="hero-stats">
        <div style={{color: '#cbd5e1', fontSize: '0.9rem'}}>Total Sponsorship Value</div>
        <div className="hero-val">{stats.totalSponsorship}</div>
        <div className="delta">↑ {stats.deltas.totalSponsorship}</div>
      </div>
    </div>
  );
}
