import React, { useState } from 'react';
import './App.css';
import { VOLUNTEER_POOL, currentEvent, tasks as initialTasks, schedule as initialSchedule, alerts as initialAlerts, activityLog as initialLog } from './data';
import Sidebar from './components/Sidebar';
import EventForm from './components/EventForm';
import ScheduleBuilder from './components/ScheduleBuilder';
import AssignmentPanel from './components/AssignmentPanel';
import LiveDashboard from './components/LiveDashboard';
import AlertsBoard from './components/AlertsBoard';
import ActivityLog from './components/ActivityLog';

function App() {
  const [event, setEvent] = useState(currentEvent);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [tasks, setTasks] = useState(initialTasks);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activityLog, setActivityLog] = useState(initialLog);
  const [flashMap, setFlashMap] = useState({});
  const [activeSection, setActiveSection] = useState('dashboard');

  const addLog = (msg, type) => {
    const newLog = {
      id: Date.now().toString() + Math.random(),
      msg,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivityLog(prev => [newLog, ...prev]);
  };

  const handleCreateEvent = (eventData) => {
    setEvent({ ...eventData, id: Date.now().toString(), status: 'live' });
    setActiveSection('schedule');
    addLog(`Event ${eventData.name} created`, 'event');
  };

  const performAssignment = (currentTasks) => {
    const updatedTasks = currentTasks.map(t => ({ ...t }));
    let assignedCount = 0;
    
    for (let task of updatedTasks) {
      if (task.assignedVolunteer) continue;

      for (let vol of VOLUNTEER_POOL) {
        if (!vol.skills.includes(task.requiredSkill)) continue;
        if (vol.availability !== task.timeSlot && vol.availability !== 'Full Day') continue;
        
        const isBusy = updatedTasks.some(t => 
          t.assignedVolunteer === vol.id && 
          t.id !== task.id &&
          (t.timeSlot === task.timeSlot || t.timeSlot === 'Full Day' || task.timeSlot === 'Full Day')
        );

        if (!isBusy) {
          task.assignedVolunteer = vol.id;
          task.status = 'pending';
          assignedCount++;
          addLog(`${vol.name} assigned to ${task.title}`, 'assign');
          break;
        }
      }
    }
    return { updatedTasks, assignedCount };
  };

  const handleAutoAssign = () => {
    const { updatedTasks, assignedCount } = performAssignment(tasks);
    setTasks(updatedTasks);
    addLog(`Auto-assignment run completed. ${assignedCount} roles filled.`, 'event');
  };

  const handleResetAssignments = () => {
    const cleared = tasks.map(t => ({ ...t, assignedVolunteer: null, status: 'unfilled' }));
    setTasks(cleared);
    addLog('Assignments reset to unfilled', 'event');
  };

  const flashTask = (taskId, status) => {
    setFlashMap(prev => ({ ...prev, [taskId]: status }));
    setTimeout(() => {
      setFlashMap(prev => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });
    }, 1000);
  };

  const handleWithdraw = (volunteerId, taskId) => {
    const vol = VOLUNTEER_POOL.find(v => v.id === volunteerId);
    const task = tasks.find(t => t.id === taskId);
    
    addLog(`${vol?.name} withdrew from ${task?.title}`, 'drop');

    let updatedTasks = tasks.map(t => {
      if (t.id === taskId) return { ...t, assignedVolunteer: null, status: 'unfilled' };
      return t;
    });

    const taskToReassign = updatedTasks.find(t => t.id === taskId);
    let reassigned = false;
    let replacementName = '';

    if (taskToReassign) {
      for (let poolVol of VOLUNTEER_POOL) {
        if (poolVol.id === volunteerId) continue;
        if (!poolVol.skills.includes(taskToReassign.requiredSkill)) continue;
        if (poolVol.availability !== taskToReassign.timeSlot && poolVol.availability !== 'Full Day') continue;
        
        const isBusy = updatedTasks.some(t => 
          t.assignedVolunteer === poolVol.id && 
          (t.timeSlot === taskToReassign.timeSlot || t.timeSlot === 'Full Day' || taskToReassign.timeSlot === 'Full Day')
        );

        if (!isBusy) {
          taskToReassign.assignedVolunteer = poolVol.id;
          taskToReassign.status = 'pending';
          reassigned = true;
          replacementName = poolVol.name;
          addLog(`${poolVol.name} auto-reassigned to ${taskToReassign.title}`, 'reassign');
          break;
        }
      }
    }

    if (!reassigned) {
      addLog(`No replacement found for ${task?.title}.`, 'warn');
    }

    setTasks(updatedTasks);
    flashTask(taskId, reassigned ? 'green' : 'red');

    return { reassigned, replacementName, volName: vol?.name, taskName: task?.title };
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'post-event': return <EventForm onSave={handleCreateEvent} />;
      case 'schedule': return <ScheduleBuilder schedule={schedule} setSchedule={setSchedule} event={event} />;
      case 'assignments': return <AssignmentPanel tasks={tasks} onAutoAssign={handleAutoAssign} onReset={handleResetAssignments} event={event} />;
      case 'dashboard': return <LiveDashboard tasks={tasks} flashMap={flashMap} onWithdraw={handleWithdraw} event={event} setTasks={setTasks} onAutoAssign={handleAutoAssign} />;
      case 'alerts': return <AlertsBoard alerts={alerts} setAlerts={setAlerts} event={event} />;
      case 'log': return <ActivityLog log={activityLog} />;
      default: return <LiveDashboard tasks={tasks} flashMap={flashMap} onWithdraw={handleWithdraw} event={event} setTasks={setTasks} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar event={event} activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
