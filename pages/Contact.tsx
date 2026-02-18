import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';

const GlobalClock: React.FC<{ city: string; offset: number }> = ({ city, offset }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const nd = new Date(utc + (3600000 * offset));
      setTime(nd.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [offset]);

  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">{city}</span>
      <span className="text-lg md:text-xl font-black tracking-tighter text-white/60">{time}</span>
    </div>
  );
};

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [budget, setBudget] = useState(15000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div ref={containerRef} className="pt-40 min-h-screen z-10 relative">
      <section className="px-6 md:px-12 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <div className="overflow-hidden mb-[-2vw]">
              <h1 className="reveal-text text-[16vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.85]">
                INITIATE
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="reveal-text text-[16vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.85] text-white/5 italic">
                STRATEGY.
              </h1>
            </div>
          </div>
          <div className="flex gap-12 md:gap-24 reveal-text">
             <GlobalClock city="DUBAI" offset={4} />
             <GlobalClock city="RIYADH" offset={3} />
             <GlobalClock city="LONDON" offset={0} />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 mb-48 items-start">
        <div className="reveal-text space-y-16">
          <p className="text-lg md:text-3xl text-white/60 leading-tight font-bold uppercase tracking-tight max-w-md">
            WHETHER YOU'RE IN DUBAI, RIYADH, OR LONDON, WE'RE READY TO ENGINEER YOUR NEXT REVENUE STREAK.
          </p>
          <div className="flex flex-col gap-12">
             <div className="flex flex-col gap-4">
                <span className="text-[10px] md:text-xs font-black tracking-[0.5em] text-[#FFD700] uppercase">ENCRYPTED_MAIL</span>
                <a href="mailto:hello@devzenith.agency" className="text-2xl md:text-4xl font-black uppercase tracking-tighter transition delay-300 duration-200 ease-in hover:italic transition-all">hello@devzenith.agency</a>
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-[10px] md:text-xs font-black tracking-[0.5em] text-[#FFD700] uppercase">DIRECT_WHATSAPP</span>
                <a href="#" className="text-2xl md:text-4xl font-black uppercase tracking-tighter transition delay-300 duration-200 ease-in hover:italic transition-all">+971 00 000 0000</a>
             </div>
          </div>
        </div>

        <div className="relative">
          {!isSubmitted ? (
            <form ref={formRef} onSubmit={handleSubmit} className="reveal-text border border-white/10 p-8 md:p-16 bg-[#0a0a0a] space-y-12">
               <div className="space-y-4">
                  <label className="text-[10px] md:text-xs font-black text-white/20 uppercase tracking-[0.4em]">IDENTIFICATION</label>
                  <input required type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl font-black uppercase tracking-tighter outline-none focus:border-[#FFD700] transition-colors" />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] md:text-xs font-black text-white/20 uppercase tracking-[0.4em]">INDUSTRY / SECTOR</label>
                  <div className="flex flex-wrap gap-4">
                     {['TECH', 'REAL ESTATE', 'FINANCE', 'E-COMMERCE'].map(cat => (
                       <label key={cat} className="cursor-pointer group">
                          <input type="radio" name="industry" className="hidden" />
                          <span className="px-6 py-2 border border-white/10 text-[10px] md:text-xs font-black uppercase tracking-widest group-hover:border-[#FFD700] transition-all group-has-[:checked]:bg-[#FFD700] group-has-[:checked]:text-black">{cat}</span>
                       </label>
                     ))}
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] md:text-xs font-black text-white/20 uppercase tracking-[0.4em]">PROJECT_BUDGET</label>
                    <span className="text-xl md:text-2xl font-black text-[#FFD700] italic">${budget.toLocaleString()}+</span>
                  </div>
                  <input type="range" min="3000" max="50000" step="1000" value={budget} onChange={(e) => setBudget(parseInt(e.target.value))} className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-[#FFD700]" />
               </div>
               <button className="w-full bg-white text-black py-8 text-lg md:text-xl font-black uppercase tracking-widest hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-4 group">
                  TRANSMIT BRIEF <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
               </button>
            </form>
          ) : (
            <div className="border border-[#FFD700]/30 p-16 md:p-24 bg-[#0a0a0a] text-center flex flex-col items-center gap-8 shadow-[0_0_60px_rgba(255,215,0,0.1)]">
               <CheckCircle2 size={80} className="text-[#FFD700] animate-bounce" />
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                 BLUEPRINT<br/>PREPARING.
               </h2>
               <p className="text-sm md:text-lg font-bold uppercase tracking-widest text-white/40 max-w-xs">
                 YOUR DATA IS BEING PROCESSED. OUR STRATEGIST WILL RESPOND WITHIN 12 HOURS.
               </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;