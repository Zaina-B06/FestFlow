import React, { useState } from 'react';
import Topbar from './components/Topbar';
import HeroBanner from './components/HeroBanner';
import StatsGrid from './components/StatsGrid';
import CampaignList from './components/CampaignList';
import AIRecommendations from './components/AIRecommendations';
import CreateCampaignModal from './components/CreateCampaignModal';
import { campaigns as initialCampaigns } from './data';

function App() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddCampaign = (newCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
  };

  return (
    <div className="dashboard-layout">
      <main className="main-area">
        <Topbar 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <div className="content-scroll">
          <HeroBanner onOpenModal={() => setShowModal(true)} />
          <StatsGrid />
          
          <div className="two-cols">
            <CampaignList 
              campaigns={campaigns} 
              activeFilter={activeFilter} 
              searchQuery={searchQuery} 
            />
            <AIRecommendations />
          </div>
        </div>
      </main>

      {showModal && (
        <CreateCampaignModal 
          onClose={() => setShowModal(false)} 
          onSubmit={handleAddCampaign} 
        />
      )}
    </div>
  );
}

export default App;
