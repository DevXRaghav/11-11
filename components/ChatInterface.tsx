
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { gemini } from '../services/geminiService';

interface ChatInterfaceProps {
  profile: UserProfile;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await gemini.sendMessage(profile, messages, input);
      const modelMessage: ChatMessage = {
        role: 'model',
        text: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-16rem)] flex flex-col animate-in fade-in duration-1000">
      {/* Thread Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 md:px-0 space-y-16 pb-12 pt-8"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent mb-8"></div>
            <h3 className="font-serif text-3xl text-white italic mb-4 opacity-80">Consultation Protocol</h3>
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/30 max-w-xs leading-relaxed">
              Inquire regarding temporal strategy, legacy navigation, or private clarity.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-700 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div className="inline-block w-full">
              <p className={`text-[9px] uppercase tracking-[0.4em] mb-4 font-bold ${m.role === 'user' ? 'text-[#D4AF37]/50' : 'text-white/20'}`}>
                {m.role === 'user' ? profile.name.split(' ')[0] : 'The Private Advisor'}
              </p>
              <div className={`
                relative p-0
                ${m.role === 'user' 
                  ? 'text-white text-xl md:text-2xl font-serif italic leading-relaxed' 
                  : 'text-white/60 text-lg md:text-xl font-light leading-relaxed font-serif italic md:pl-12 border-l border-white/5'
                }
              `}>
                {m.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="max-w-2xl mx-auto text-left opacity-40">
            <p className="text-[9px] uppercase tracking-[0.4em] mb-4 font-bold text-white/20">The Private Advisor</p>
            <div className="md:pl-12">
               <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
                 <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse [animation-delay:0.2s]"></div>
                 <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse [animation-delay:0.4s]"></div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Zone */}
      <div className="mt-12 max-w-2xl mx-auto w-full">
        <form 
          onSubmit={handleSend}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-[#D4AF37]/5 rounded-full blur-xl group-focus-within:bg-[#D4AF37]/10 transition-all duration-700 opacity-0 group-focus-within:opacity-100"></div>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Whisper your inquiry..."
            className="relative w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-5 text-base focus:border-[#D4AF37]/40 focus:outline-none transition-all duration-700 placeholder:italic placeholder:text-white/10 text-white"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-[#D4AF37] transition-all duration-500 disabled:opacity-0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
            </svg>
          </button>
        </form>
        <div className="flex justify-center mt-6">
           <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
