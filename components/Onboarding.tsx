
import React, { useState } from 'react';
import { UserProfile, LifeFocus } from '../types';

interface OnboardingProps {
  onSubmit: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    focus: LifeFocus.WEALTH,
    gender: 'Prefer not to say'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.dob && formData.tob && formData.pob) {
      onSubmit(formData as UserProfile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-xl animate-in fade-in duration-1000">
        <div className="mb-16">
          <div className="w-12 h-[0.5px] bg-[#D4AF37] mb-6"></div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight italic">Initiate Your<br/>Celestial Record</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase font-light max-w-md leading-relaxed">
            The movements of the spheres are unique to the moment of your arrival. Please provide the precise details of that instance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="group border-b border-white/10 focus-within:border-[#D4AF37] transition-all duration-700">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-[#D4AF37] mb-2 font-bold">Full Identity</label>
              <input
                required
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent py-4 text-base md:text-lg focus:outline-none transition-all placeholder:text-white/10"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="group border-b border-white/10 focus-within:border-[#D4AF37] transition-all duration-700">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-[#D4AF37] mb-2 font-bold">Birthplace</label>
              <input
                required
                type="text"
                placeholder="City, Country"
                className="w-full bg-transparent py-4 text-base md:text-lg focus:outline-none transition-all placeholder:text-white/10"
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
              />
            </div>

            <div className="group border-b border-white/10 focus-within:border-[#D4AF37] transition-all duration-700">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-[#D4AF37] mb-2 font-bold">Birth Date</label>
              <input
                required
                type="date"
                className="w-full bg-transparent py-4 text-base md:text-lg focus:outline-none transition-all [color-scheme:dark]"
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>

            <div className="group border-b border-white/10 focus-within:border-[#D4AF37] transition-all duration-700">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-[#D4AF37] mb-2 font-bold">Exact Time</label>
              <input
                required
                type="time"
                className="w-full bg-transparent py-4 text-base md:text-lg focus:outline-none transition-all [color-scheme:dark]"
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
              />
            </div>

            <div className="group border-b border-white/10 focus-within:border-[#D4AF37] transition-all duration-700 md:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-[#D4AF37] mb-2 font-bold">Strategic Ambition</label>
              <select
                className="w-full bg-transparent py-4 text-base md:text-lg focus:outline-none transition-all appearance-none cursor-pointer"
                onChange={(e) => setFormData({ ...formData, focus: e.target.value as LifeFocus })}
              >
                {Object.values(LifeFocus).map(focus => (
                  <option key={focus} value={focus} className="bg-black">{focus}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="group flex items-center gap-6 text-[11px] uppercase tracking-[0.5em] font-bold text-white hover:text-[#D4AF37] transition-all duration-700"
            >
              <span>Commit to the Record</span>
              <div className="w-16 h-[1px] bg-white/20 group-hover:bg-[#D4AF37] group-hover:w-24 transition-all duration-700"></div>
            </button>
            <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-white/10 italic">Your data remains absolute and private.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
