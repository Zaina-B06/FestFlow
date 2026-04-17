import React, { useState } from 'react';

export default function CreateCampaignModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    category: 'Tech',
    audience: '',
    wants: {
      LogoPlacement: false,
      StageMention: false,
      SocialMediaTag: false,
      StallSpace: false,
      MCShoutout: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        wants: {
          ...prev.wants,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: 'c' + Date.now(),
      name: formData.name,
      budget: formData.budget || '₹0',
      category: formData.category,
      status: 'active',
      matches: 0,
      icon: formData.category === 'Tech' ? '💻' : formData.category === 'Sports' ? '🏆' : formData.category === 'Cultural' ? '🪔' : '✨'
    });
    setFormData({
      name: '',
      budget: '',
      category: 'Tech',
      audience: '',
      wants: {
        LogoPlacement: false,
        StageMention: false,
        SocialMediaTag: false,
        StallSpace: false,
        MCShoutout: false
      }
    }); // Form state resets naturally if unmounted but good to be explicit
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Create New Campaign</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Campaign name</label>
            <input 
              type="text" 
              name="name"
              className="form-control" 
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Budget</label>
            <input 
              type="text" 
              name="budget"
              className="form-control" 
              placeholder="e.g. ₹2,00,000"
              required
              value={formData.budget}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Tech">Tech</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div className="form-group">
            <label>Target audience description</label>
            <textarea 
              name="audience"
              className="form-control"
              value={formData.audience}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>What you want in return</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" name="LogoPlacement" checked={formData.wants.LogoPlacement} onChange={handleChange} /> Logo Placement
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="StageMention" checked={formData.wants.StageMention} onChange={handleChange} /> Stage Mention
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="SocialMediaTag" checked={formData.wants.SocialMediaTag} onChange={handleChange} /> Social Media Tag
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="StallSpace" checked={formData.wants.StallSpace} onChange={handleChange} /> Stall Space
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="MCShoutout" checked={formData.wants.MCShoutout} onChange={handleChange} /> MC Shoutout
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">Create Campaign</button>
        </form>
      </div>
    </div>
  );
}
