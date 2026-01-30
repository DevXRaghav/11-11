
import React, { useState, useEffect } from 'react';
import { UserProfile, DailyBriefing, AppState } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import { gemini } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    profile: null,
    briefing: null,
    history: [],
    loading: true,
  });

  const [activeTab, setActiveTab] = useState<'briefing' | 'advisor'>('briefing');

  useEffect(() => {
    const savedProfile = localStorage.getItem('astrology_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      fetchBriefing(profile);
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const fetchBriefing = async (profile: UserProfile) => {
    setState(prev => ({ ...prev, profile, loading: true }));
    try {
      const briefing = await gemini.getDailyBriefing(profile);
      setState(prev => ({ ...prev, briefing, loading: false }));
    } catch (error) {
      console.error("Failed to fetch briefing", error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    localStorage.setItem('astrology_profile', JSON.stringify(profile));
    fetchBriefing(profile);
  };

  const resetProfile = () => {
    if (confirm("Resetting will disconnect you from the current celestial resonance. Continue?")) {
      localStorage.removeItem('astrology_profile');
      setState({
        profile: null,
        briefing: null,
        history: [],
        loading: false,
      });
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-[0.5px] border-[#D4AF37]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border-[0.5px] border-[#D4AF37]/40 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full gold-glow animate-pulse"></div>
            </div>
          </div>
          <p className="font-serif italic text-[#888] tracking-widest text-sm uppercase">Synchronizing with the Absolute</p>
        </div>
      </div>
    );
  }

  if (!state.profile) {
    return <Onboarding onSubmit={handleProfileSubmit} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Premium Navigation */}
      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto group cursor-default">
          <h1 className="font-serif text-2xl tracking-[0.2em] uppercase text-white leading-none">The Celestial Advisor</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="h-[0.5px] w-8 bg-[#D4AF37]/40 group-hover:w-12 transition-all duration-700"></div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]/80 font-medium">Bespoke Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8 pointer-events-auto">
          <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-medium">
            <button 
              onClick={() => setActiveTab('briefing')}
              className={`transition-all duration-500 pb-1 border-b ${activeTab === 'briefing' ? 'text-white border-[#D4AF37]' : 'text-white/30 border-transparent hover:text-white/60'}`}
            >
              Intelligence
            </button>
            <button 
              onClick={() => setActiveTab('advisor')}
              className={`transition-all duration-500 pb-1 border-b ${activeTab === 'advisor' ? 'text-white border-[#D4AF37]' : 'text-white/30 border-transparent hover:text-white/60'}`}
            >
              Consultation
            </button>
          </div>
          <button 
            onClick={resetProfile}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-500"
            title="Disconnect Session"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 mt-24 max-w-5xl mx-auto w-full px-6 md:px-12 pb-32">
        {activeTab === 'briefing' ? (
          <Dashboard briefing={state.briefing} profile={state.profile} />
        ) : (
          <ChatInterface profile={state.profile} />
        )}
      </main>

      {/* Mobile Sticky Navigation */}
      <nav className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-2 flex gap-1 shadow-2xl">
        <button
          onClick={() => setActiveTab('briefing')}
          className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
            activeTab === 'briefing' ? 'bg-[#D4AF37] text-black' : 'text-white/40'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setActiveTab('advisor')}
          className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 ${
            activeTab === 'advisor' ? 'bg-[#D4AF37] text-black' : 'text-white/40'
          }`}
        >
          Advisor
        </button>
      </nav>
      
      {/* Decorative footer element */}
      <footer className="fixed bottom-0 left-0 w-full p-8 pointer-events-none flex justify-between items-end opacity-20">
         <div className="text-[9px] uppercase tracking-[0.3em] font-light">Resonance Index: Optimal</div>
         <div className="text-[9px] uppercase tracking-[0.3em] font-light">Confidential — Level VII</div>
      </footer>
    </div>
  );
};

export default App;
