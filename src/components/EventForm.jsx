import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Tags, ArrowRight } from 'lucide-react';

const SKILLS = ['tech', 'av', 'design', 'marketing', 'registration', 'logistics', 'admin'];
const TIME_SLOTS = ['9am-12pm', '1pm-5pm', 'Full Day'];

export default function EventForm({ onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    description: '',
    skillsNeeded: [],
    volunteersNeeded: '',
    timeSlots: []
  });

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.includes(skill)
        ? prev.skillsNeeded.filter(s => s !== skill)
        : [...prev.skillsNeeded, skill]
    }));
  };

  const handleSlotToggle = (slot) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    onSave(formData);
  };

  return (
    <div className="content-wrapper">
      <div style={{marginBottom: '40px'}}>
        <span className="header-label">GET STARTED</span>
        <h1 className="section-title">Create Event</h1>
        <p className="section-subtitle">Set up your next big festival or summit.</p>
      </div>

      <div className="card" style={{padding: '40px'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{marginBottom: '32px'}}>
            <label className="form-label">Event Name</label>
            <input 
              type="text" 
              className="form-control" 
              style={{fontSize: '1.2rem', padding: '16px 20px'}}
              placeholder="e.g. Summer Solstice Festival 2024"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="grid-2" style={{marginBottom: '32px'}}>
            <div className="form-group">
              <label className="form-label" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <CalendarIcon size={16} color="var(--primary-orange)" /> Date
              </label>
              <input 
                type="date" 
                className="form-control" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <MapPin size={16} color="var(--primary-orange)" /> Venue
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Starlight Theater"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group" style={{marginBottom: '40px'}}>
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              placeholder="Brief overview of the event..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <hr style={{border: 'none', borderTop: '1px solid #F1F5F9', margin: '40px 0'}} />

          <h3 style={{fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Users size={20} color="var(--primary-dark)" />
            Volunteer Requirements
          </h3>

          <div className="form-group" style={{marginBottom: '32px'}}>
             <label className="form-label" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
               <Tags size={16} color="var(--text-muted)" /> Skills Needed
             </label>
             <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px'}}>
               {SKILLS.map(skill => (
                 <div 
                   key={skill}
                   onClick={() => handleSkillToggle(skill)}
                   style={{
                     padding: '8px 16px',
                     borderRadius: '20px',
                     backgroundColor: formData.skillsNeeded.includes(skill) ? 'var(--primary-dark)' : '#F1F5F9',
                     color: formData.skillsNeeded.includes(skill) ? 'white' : 'var(--text-muted)',
                     fontSize: '0.85rem',
                     fontWeight: 600,
                     cursor: 'pointer',
                     transition: 'all 0.2s',
                     textTransform: 'capitalize'
                   }}
                 >
                   {skill}
                 </div>
               ))}
             </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Number of Volunteers</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="e.g. 50"
                value={formData.volunteersNeeded}
                onChange={(e) => setFormData({...formData, volunteersNeeded: e.target.value})}
                min="1"
              />
            </div>
            <div className="form-group">
               <label className="form-label">Available Time Slots</label>
               <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px'}}>
                 {TIME_SLOTS.map(slot => (
                   <div 
                     key={slot}
                     onClick={() => handleSlotToggle(slot)}
                     style={{
                       padding: '8px 16px',
                       borderRadius: '8px',
                       backgroundColor: formData.timeSlots.includes(slot) ? '#DBEAFE' : '#F1F5F9',
                       color: formData.timeSlots.includes(slot) ? '#1D4ED8' : 'var(--text-muted)',
                       border: formData.timeSlots.includes(slot) ? '1px solid #BFDBFE' : '1px solid transparent',
                       fontSize: '0.85rem',
                       fontWeight: 600,
                       cursor: 'pointer',
                       transition: 'all 0.2s'
                     }}
                   >
                     {slot}
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div style={{marginTop: '40px', display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" className="btn btn-primary" style={{padding: '0 32px', height: '52px', fontSize: '1.05rem'}}>
              Create Event <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
