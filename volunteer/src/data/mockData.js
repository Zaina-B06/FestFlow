export const volunteer = {
  name: "Arjun Mehta",
  role: "Core Volunteer",
  zone: "Main Stage Area",
  avatar: "AM",
  availability: "active",
  radio: "CH-09",
  hotline: "EXT-204",
};

export const tasks = [
  {
    id: 1,
    title: "Sound Check: Main Stage",
    status: "active",
    dueTime: "10:30 AM",
    location: "Main Stage, North Wing",
    teamAssignment: ["Arjun", "Priya", "Karan"],
    checklist: [
      { id: "c1", label: "Test mic levels for anchors", done: true },
      { id: "c2", label: "Coordinate with DJ for transitions", done: true },
      { id: "c3", label: "Check backup speaker setup", done: false },
      { id: "c4", label: "Brief the emcee on cue signals", done: false },
    ],
    notes: "DJ arrives at 10:00 AM. Make sure the green room is unlocked before then.",
  },
  {
    id: 2,
    title: "Registration Desk Cover",
    status: "pending",
    dueTime: "11:00 AM",
    location: "Main Entrance, Gate 2",
    checklist: [],
    teamAssignment: [],
    notes: "",
  },
  {
    id: 3,
    title: "Food Stall Coordination",
    status: "pending",
    dueTime: "1:00 PM",
    location: "Food Court, Block C",
    checklist: [],
    teamAssignment: [],
    notes: "Ensure all stall owners have their assigned spots. Report conflicts to coordinator.",
  },
  {
    id: 4,
    title: "Cultural Night Setup",
    status: "upcoming",
    dueTime: "4:00 PM",
    location: "Open Air Amphitheatre",
    checklist: [],
    teamAssignment: ["Arjun", "Sneha", "Rahul", "+3"],
    notes: "",
  },
];

export const schedule = [
  { time: "08:00", title: "Volunteer Briefing & Orientation", zone: "Seminar Hall B", status: "done" },
  { time: "10:00", title: "Sound Check: Main Stage", zone: "Main Stage, North Wing", status: "active", priority: "high" },
  { time: "12:30", title: "Lunch Break", zone: "", status: "break", duration: "45 Minutes" },
  { time: "14:00", title: "Cultural Performances: Round 1", zone: "Open Air Amphitheatre", status: "upcoming" },
  { time: "16:00", title: "Pronite Headliner Setup", zone: "Main Stage · Priority High", status: "upcoming", priority: "high" },
];

export const notifications = [
  {
    id: 1,
    type: "emergency",
    title: "Crowd Surge at Gate 3 — Immediate Help Needed",
    body: "Gate 3 near the food court is overcrowded. All nearby volunteers report immediately to assist with crowd management.",
    time: "Just now",
    actionable: true,
  },
  {
    id: 2,
    type: "alert",
    title: "Main Stage Entry Capacity Reached",
    body: "Main stage area has hit max capacity. Redirect incoming attendees to the overflow screen zone near Block D.",
    time: "4 min ago",
  },
  {
    id: 3,
    type: "weather",
    title: "Weather Advisory: Strong Winds Expected",
    body: "Wind speeds may pick up during the 4 PM outdoor session. Secure all banners and light structures in the amphitheatre.",
    time: "18 min ago",
  },
  {
    id: 4,
    type: "info",
    title: "Volunteer Meal Tokens Available",
    body: "Meal tokens for lunch are available at the volunteer hub near Gate 1. Collect before 12:00 PM.",
    time: "35 min ago",
  },
  {
    id: 5,
    type: "success",
    title: "Shift Swap Confirmed",
    body: "Your evening shift swap with Priya Singh has been approved by the coordinator. You're now on Cultural Night setup.",
    time: "1 hr ago",
  },
];

export const zoneData = {
  sector: "Block A: Main Stage Complex",
  currentZone: "Sound Booth",
  assignment: "Sound Booth & Stage Control",
  coordinator: { name: "Meera Nair", avatar: "MN" },
  volunteers: { current: 9, total: 12 },
  crowdLevel: "High",
  liveDensity: 78,
  layout: [
    { id: "green-room", label: "Green Room", x: 55, y: 6, w: 22, h: 16 },
    { id: "storage", label: "Props Store", x: 79, y: 6, w: 18, h: 16 },
    { id: "backstage", label: "Backstage", x: 5, y: 28, w: 28, h: 22 },
    { id: "sound-booth", label: "Sound Booth", x: 38, y: 28, w: 28, h: 28, active: true },
    { id: "tech-desk", label: "Tech Desk", x: 5, y: 58, w: 28, h: 18 },
  ],
};

export const coordinators = [
  {
    name: "Meera Nair",
    role: "Stage Lead",
    phone: "+91 98400 12345",
    location: "Main Stage · Block A",
    avatar: "MN",
  },
  {
    name: "Rohan Verma",
    role: "Emergency Response",
    phone: "+91 98400 67890",
    location: "Medical Tent · Gate 2",
    avatar: "RV",
  },
];

export const faqs = [
  {
    q: "What do I do if I can't make my shift?",
    a: "Notify your zone coordinator at least 2 hours before your shift via the portal. For last-minute issues, hit the SOS button and someone will cover.",
  },
  {
    q: "Where is the volunteer rest area?",
    a: "The volunteer lounge is in Seminar Hall B, Ground Floor. Show your volunteer badge for access. Free snacks and water available.",
  },
  {
    q: "How do I collect my meal tokens?",
    a: "Meal tokens are distributed at the Volunteer Hub near Gate 1. You get one token per shift. Collect before 12 PM for lunch.",
  },
  {
    q: "What if there's an emergency in my zone?",
    a: "Use the radio on your assigned channel first. If no response, call the hotline EXT-204. For medical emergencies, go straight to the medical tent at Gate 2.",
  },
];

export const shiftPulse = {
  taskProgress: 50,
  zoneDensity: "high",
};

export const events = [
  {
    id: 1,
    name: "Crescendo 2024",
    date: "September 14, 2024",
    location: "CSUDH Main Auditorium",
    category: "Music",
    spotsLeft: 10,
    totalSpots: 25,
    description: "The annual inter-college music fest featuring battle of bands, solo performances, and an electrifying pronite with a headlining artist.",
    roles: ["Stage Manager", "Sound Crew", "Crowd Control", "Registration Desk", "Backstage Assist"],
    status: "open",
    image: "🎸",
  },
  {
    id: 2,
    name: "Riwaaj Cultural Fest",
    date: "September 28, 2024",
    location: "Open Air Amphitheatre, Block C",
    category: "Cultural",
    spotsLeft: 4,
    totalSpots: 20,
    description: "A celebration of South Asian culture — classical dance, folk music, street food, and traditional attire competitions across two days.",
    roles: ["Event Host Assist", "Décor & Setup", "Guest Relations", "Photography Aid", "Stall Management"],
    status: "open",
    image: "🪔",
  },
  {
    id: 3,
    name: "HackSphere 2024",
    date: "October 5–6, 2024",
    location: "CS Department Labs, Block F",
    category: "Technology",
    spotsLeft: 0,
    totalSpots: 15,
    description: "A 24-hour hackathon where student teams build real solutions. Volunteers help with check-in, meals, mentorship coordination, and logistics.",
    roles: ["Check-in Desk", "Meal Distribution", "Mentor Liaison", "Setup & Teardown"],
    status: "full",
    image: "💻",
  },
  {
    id: 4,
    name: "Spark — Entrepreneurship Summit",
    date: "October 18, 2024",
    location: "Seminar Hall A & B",
    category: "Business",
    spotsLeft: 12,
    totalSpots: 18,
    description: "Student startup pitches, investor panels, and workshops on product thinking and funding. Great for networking and behind-the-scenes experience.",
    roles: ["Session Coordinator", "AV Support", "Guest Greeter", "Social Media Desk"],
    status: "open",
    image: "🚀",
  },
  {
    id: 5,
    name: "Sportika 2024",
    date: "November 2–3, 2024",
    location: "University Sports Complex",
    category: "Sports",
    spotsLeft: 18,
    totalSpots: 30,
    description: "Inter-college sports tournament covering cricket, football, basketball, and athletics. Volunteers manage ground logistics, scorekeeping, and hospitality.",
    roles: ["Ground Marshal", "Score Keeper", "First Aid Assist", "Refreshment Counter", "Entry Management"],
    status: "open",
    image: "🏆",
  },
  {
    id: 6,
    name: "Frames — Photography Fest",
    date: "November 16, 2024",
    location: "Art Block & Campus Grounds",
    category: "Arts",
    spotsLeft: 6,
    totalSpots: 12,
    description: "Campus-wide photography contest, exhibition, and workshop day. Volunteers help with exhibit setup, participant coordination, and judging logistics.",
    roles: ["Exhibit Setup", "Participant Coordinator", "Judging Assistant", "Public Relations"],
    status: "open",
    image: "📸",
  },
];