import React, { useState } from 'react';
import { aiRecommendations } from '../data';

export default function AIRecommendations() {
  const [applyState, setApplyState] = useState('idle');

  const handleApply = () => {
    setApplyState('loading');
    setTimeout(() => {
      setApplyState('applied');
    }, 1500);
  };

  return (
    <div className="recommendations-col">
      <div className="ai-panel">
        <div className="ai-header">
          <span className="ai-icon">✨</span>
          AI Recommendations
        </div>
        <div className="ai-subtitle">Smart picks for DevSpark Tech Summit</div>

        {aiRecommendations.map((rec, i) => (
          <div key={i} className={`rec-card rec-${rec.rank}`}>
            <div className="rec-rank">{rec.label}</div>
            <div className="rec-event">{rec.eventName}</div>
            <ul className="rec-points">
              {rec.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

        <button 
          className="auto-apply-btn" 
          onClick={handleApply}
          disabled={applyState !== 'idle'}
          style={applyState === 'applied' ? { background: 'var(--green)', cursor: 'default' } : {}}
        >
          {applyState === 'idle' && <><span>🚀</span> Auto Apply</>}
          {applyState === 'loading' && 'Applying...'}
          {applyState === 'applied' && <><span>✓</span> Successfully Applied</>}
        </button>
      </div>
    </div>
  );
}
