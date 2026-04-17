export const sponsor = {
  name: "Arjun Mehta",
  role: "Brand Manager",
  avatar: "AM",
  company: "NovaBrands Pvt. Ltd.",
};

export const campaigns = [
  { id: "c1", name: "DevSpark Tech Summit 2025", budget: "₹3,50,000", category: "Tech",     status: "active",  matches: 8,  icon: "💻" },
  { id: "c2", name: "Rang De Cultural Fest",     budget: "₹2,00,000", category: "Cultural", status: "active",  matches: 5,  icon: "🪔" },
  { id: "c3", name: "Arena Sports Championship", budget: "₹4,80,000", category: "Sports",   status: "pending", matches: 3,  icon: "🏆" },
  { id: "c4", name: "Spark Entrepreneurship Summit", budget: "₹1,50,000", category: "Tech", status: "active",  matches: 6,  icon: "🚀" },
  { id: "c5", name: "Frames Photography Fest",   budget: "₹75,000",   category: "Cultural", status: "full",    matches: 2,  icon: "📸" },
];

export const stats = {
  activeCampaigns: 5,
  eventsApplied: 28,
  matchesFound: 14,
  totalSponsorship: "₹18.4L",
  deltas: {
    activeCampaigns: "+2 this month",
    eventsApplied: "+6 this week",
    matchesFound: "+4 new today",
    totalSponsorship: "+32% vs last quarter",
  },
};

export const aiRecommendations = [
  {
    rank: "best",
    label: "Best event for your campaign",
    eventName: "Techzilla 2025 — IIT Hyderabad",
    matchScore: 92,
    points: [
      "High audience match (92%)",
      "8,000+ tech-savvy footfall",
      "Strong past sponsorship ROI",
      "National IIT-level visibility",
    ],
  },
  {
    rank: "runner",
    label: "Runner up",
    eventName: "HackSphere 2025 — BITS Pilani",
    matchScore: 84,
    points: [
      "Strong dev community (84%)",
      "3,200 registered hackers",
      "Media coverage included",
    ],
  },
];
