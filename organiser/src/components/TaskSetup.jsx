import React, { useState } from 'react';

const SKILLS = ['tech', 'av', 'design', 'marketing', 'registration', 'logistics', 'admin'];
const TIME_SLOTS = ['9am-12pm', '1pm-5pm', 'Full Day'];

export default function TaskSetup({ tasks, setTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [requiredSkill, setRequiredSkill] = useState(SKILLS[0]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title) return;
    
    const newTask = {
      id: Date.now().toString(),
      title,
      requiredSkill,
      timeSlot,
      assignedVolunteer: null
    };
    
    setTasks([...tasks, newTask]);
    setTitle('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="card" style={{marginBottom: '16px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 className="section-title" style={{marginBottom: 0}}>Task Setup</h2>
        <button 
          className="btn btn-outline" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddTask} className="grid-4" style={{alignItems: 'end', marginBottom: '24px', backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px'}}>
          <div className="form-group" style={{marginBottom: 0}}>
            <label className="form-label">Task Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{marginBottom: 0}}>
            <label className="form-label">Required Skill</label>
            <select 
              className="form-control"
              value={requiredSkill}
              onChange={(e) => setRequiredSkill(e.target.value)}
            >
              {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group" style={{marginBottom: 0}}>
            <label className="form-label">Time Slot</label>
            <select 
              className="form-control"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save Task</button>
        </form>
      )}

      <div>
        {tasks.length === 0 ? (
          <p style={{color: '#64748b', fontSize: '0.9rem'}}>No tasks created.</p>
        ) : (
          <div style={{border: '1px solid #e2e8f0', borderRadius: '8px'}}>
            {tasks.map(task => (
              <div key={task.id} className="list-item">
                <div className="flex-row">
                  <span style={{fontWeight: 500}}>{task.title}</span>
                  <span className="badge badge-gray">{task.requiredSkill}</span>
                  <span className="badge badge-blue">{task.timeSlot}</span>
                </div>
                <button 
                  className="btn btn-danger" 
                  style={{height: '28px', padding: '0 10px', fontSize: '0.8rem'}}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
