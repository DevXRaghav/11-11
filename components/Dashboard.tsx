
import React from 'react';
import { DailyBriefing, UserProfile } from '../types';
import { Icons } from '../constants.tsx';

interface DashboardProps {
  briefing: DailyBriefing | null;
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ briefing, profile }) => {
  if (!briefing) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-24">
      {/* Date Header */}
      <section className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold mb-3">Intelligence Report</h2>
          <p className="font-serif text-4xl text-white italic">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-1">Subject</p>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">{profile.name}</p>
        </div>
      </section>

      {/* Hero: Core Resonance */}
      <section className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/70">The Daily Nexus</span>
          </div>
          <p className="font-serif text-4xl md:text-5xl text-white leading-[1.2] italic">
            "{briefing.tone}"
          </p>
        </div>
        <div className="md:col-span-5 flex justify-center md:justify-end">
           {/* Abstract Celestial Visual */}
           <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-60">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]/30">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="2" fill="currentColor" className="animate-pulse" />
                <line x1="50" y1="50" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                <circle cx="80" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
           </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="grid md:grid-cols-2 gap-x-20 gap-y-16">
        <article className="group">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold text-[#D4AF37]/40 font-mono tracking-tighter">01</span>
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-white/80 font-bold">Capital & Strategy</h4>
            <div className="flex-1 h-[0.5px] bg-white/5"></div>
          </div>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed font-serif italic group-hover:text-white transition-all duration-700">
            {briefing.wealthInsight}
          </p>
        </article>

        <article className="group">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-bold text-[#D4AF37]/40 font-mono tracking-tighter">02</span>
            <h4 className="text-[11px] uppercase tracking-[0.4em] text-white/80 font-bold">Interpersonal Dynamics</h4>
            <div className="flex-1 h-[0.5px] bg-white/5"></div>
          </div>
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed font-serif italic group-hover:text-white transition-all duration-700">
            {briefing.relationshipInsight}
          </p>
        </article>
      </section>

      {/* The Advice Card */}
      <section className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[2rem] text-center relative overflow-hidden group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] aspect-square bg-[#D4AF37]/[0.02] rounded-full -translate-y-3/4 group-hover:scale-110 transition-transform duration-[3s]"></div>
        <div className="relative z-10 space-y-8">
          <Icons.GoldStar />
          <h3 className="text-[11px] uppercase tracking-[0.6em] text-[#D4AF37] font-black">Strategic Advisory</h3>
          <p className="font-serif text-3xl md:text-4xl text-white italic max-w-3xl mx-auto leading-tight">
            {briefing.advisoryNote}
          </p>
          <div className="pt-4">
             <div className="w-1 h-8 bg-[#D4AF37]/40 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
