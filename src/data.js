export const VOLUNTEER_POOL = [
  { id: 'v1', name: 'Amir Khan',    skills: ['tech', 'av'],               availability: '9am-12pm' },
  { id: 'v2', name: 'Priya Nair',   skills: ['design', 'marketing'],      availability: '9am-12pm' },
  { id: 'v3', name: 'Rohan Mehta',  skills: ['logistics', 'tech'],        availability: '1pm-5pm'  },
  { id: 'v4', name: 'Sara Osei',    skills: ['registration', 'admin'],    availability: '9am-12pm' },
  { id: 'v5', name: 'Dev Sharma',   skills: ['av', 'tech'],               availability: '1pm-5pm'  },
  { id: 'v6', name: 'Fatima Malik', skills: ['design', 'marketing'],      availability: '1pm-5pm'  },
  { id: 'v7', name: 'Omar Diallo',  skills: ['registration', 'logistics'],availability: '9am-12pm' },
  { id: 'v8', name: 'Nina Petrov',  skills: ['admin', 'registration'],    availability: '1pm-5pm'  },
];

export const organiser = {
  name: 'Meera Nair',
  role: 'Event Operations Lead',
  organisation: 'Crescendo Productions',
  avatar: 'MN',
  eventsManaged: 3,
  activeEvent: 'Crescendo 2024',
};

export const currentEvent = {
  id: 'e1',
  name: 'Crescendo 2024',
  date: 'September 14, 2024',
  venue: 'CSUDH Main Auditorium',
  description: 'Annual inter-college music fest featuring battle of bands, solo performances, and an electrifying pronite.',
  status: 'live',
  volunteerRequirements: {
    totalNeeded: 25,
    totalConfirmed: 21,
    skillsNeeded: ['av', 'tech', 'registration', 'logistics', 'admin', 'design'],
    timeSlots: ['9am-12pm', '1pm-5pm'],
  },
};

export const tasks = [
  {
    id: 't1',
    title: 'Stage AV Setup',
    requiredSkill: 'av',
    timeSlot: '9am-12pm',
    location: 'Main Stage, North Wing',
    assignedVolunteer: 'v1',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 't2',
    title: 'Welcome Desk',
    requiredSkill: 'registration',
    timeSlot: '9am-12pm',
    location: 'Main Entrance, Gate 2',
    assignedVolunteer: 'v4',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 't3',
    title: 'Branding & Signage',
    requiredSkill: 'design',
    timeSlot: '9am-12pm',
    location: 'All Entry Points',
    assignedVolunteer: 'v2',
    status: 'pending',
    priority: 'low',
  },
  {
    id: 't4',
    title: 'Afternoon AV',
    requiredSkill: 'av',
    timeSlot: '1pm-5pm',
    location: 'Main Stage, North Wing',
    assignedVolunteer: 'v5',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 't5',
    title: 'Gear Logistics',
    requiredSkill: 'logistics',
    timeSlot: '1pm-5pm',
    location: 'Loading Bay, Gate 4',
    assignedVolunteer: 'v3',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 't6',
    title: 'Session Tech Support',
    requiredSkill: 'tech',
    timeSlot: '9am-12pm',
    location: 'Sound Booth, Block A',
    assignedVolunteer: null,
    status: 'unfilled',
    priority: 'high',
  },
  {
    id: 't7',
    title: 'Social Media Live',
    requiredSkill: 'marketing',
    timeSlot: '1pm-5pm',
    location: 'Roving — All Zones',
    assignedVolunteer: 'v6',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 't8',
    title: 'Badge Printing',
    requiredSkill: 'admin',
    timeSlot: '9am-12pm',
    location: 'Volunteer Hub, Gate 1',
    assignedVolunteer: 'v4',
    status: 'pending',
    priority: 'low',
  },
];

export const schedule = [
  { id: 's1', time: '08:00 AM', title: 'Organiser & Volunteer Briefing',  location: 'Seminar Hall B',            status: 'done'     },
  { id: 's2', time: '09:00 AM', title: 'Gates Open & Registration',        location: 'Main Entrance, Gate 2',     status: 'done'     },
  { id: 's3', time: '10:00 AM', title: 'Sound Check: Main Stage',          location: 'Main Stage, North Wing',    status: 'active', priority: 'high' },
  { id: 's4', time: '12:30 PM', title: 'Volunteer Lunch Break',            location: 'Volunteer Hub, Gate 1',     status: 'break',  duration: '30 min' },
  { id: 's5', time: '01:00 PM', title: 'Cultural Performances: Round 1',   location: 'Open Air Amphitheatre',     status: 'upcoming' },
  { id: 's6', time: '03:30 PM', title: 'Sponsor & Guest Session',          location: 'Seminar Hall A',            status: 'upcoming' },
  { id: 's7', time: '04:00 PM', title: 'Pronite Headliner Setup',          location: 'Main Stage · Priority High',status: 'upcoming', priority: 'high' },
  { id: 's8', time: '06:00 PM', title: 'Pronite: Main Performance',        location: 'Main Stage, North Wing',    status: 'upcoming', priority: 'high' },
  { id: 's9', time: '09:00 PM', title: 'Teardown & Volunteer Sign-off',    location: 'All Zones',                 status: 'upcoming' },
];

export const alerts = [
  {
    id: 'a1',
    message: 'Gate 3 near food court is overcrowded. All nearby volunteers report immediately to assist with crowd control.',
    priority: 'urgent',
    time: '10:42 AM',
  },
  {
    id: 'a2',
    message: 'Main stage area has hit max capacity. Redirect incoming attendees to the overflow screen zone near Block D.',
    priority: 'urgent',
    time: '10:38 AM',
  },
  {
    id: 'a3',
    message: 'Wind speeds may pick up during the 4 PM outdoor session. All volunteers: secure banners and light structures in the amphitheatre before 3:30 PM.',
    priority: 'info',
    time: '10:24 AM',
  },
  {
    id: 'a4',
    message: 'Meal tokens are now available at the Volunteer Hub, Gate 1. Collect before 12:00 PM. One token per volunteer.',
    priority: 'reminder',
    time: '10:07 AM',
  },
];

export const activityLog = [
  { id: 'l1', type: 'warn',     msg: 'No replacement found for Session Tech Support — task remains unfilled.',  time: '10:45 AM' },
  { id: 'l2', type: 'drop',     msg: 'Omar Diallo withdrew from Session Tech Support.',                         time: '10:44 AM' },
  { id: 'l3', type: 'event',    msg: 'Auto-assignment run completed. 7 of 8 tasks filled.',                     time: '09:15 AM' },
  { id: 'l4', type: 'assign',   msg: 'Dev Sharma assigned to Afternoon AV.',                                    time: '09:15 AM' },
  { id: 'l5', type: 'assign',   msg: 'Fatima Malik assigned to Social Media Live.',                             time: '09:15 AM' },
  { id: 'l6', type: 'assign',   msg: 'Rohan Mehta assigned to Gear Logistics.',                                 time: '09:15 AM' },
  { id: 'l7', type: 'assign',   msg: 'Sara Osei assigned to Welcome Desk.',                                     time: '09:15 AM' },
  { id: 'l8', type: 'assign',   msg: 'Priya Nair assigned to Branding & Signage.',                              time: '09:15 AM' },
  { id: 'l9', type: 'assign',   msg: 'Amir Khan assigned to Stage AV Setup.',                                   time: '09:15 AM' },
  { id: 'l10', type: 'event',   msg: 'Event \'Crescendo 2024\' created and set to Live.',                         time: '08:50 AM' },
];
