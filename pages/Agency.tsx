import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { METRICS, ROADMAP_PHASES } from '../constants';
import Culture from '../components/Culture';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const TechMarquee: React.FC = () => {
  const stack = ["NEXT.JS", "GSAP", "STRIPE", "AWS", "LENIS", "FRAMER", "RTL_READY", "SEO_MAX"];
  return (
    <div className="py-20 border-y border-white/5 overflow-hidden whitespace-nowrap group">
      <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[...stack, ...stack, ...stack].map((tech, i) => (
          <div key={i} className="flex items-center mx-12">
            <span className="text-4xl md:text-6xl font-black text-white/10 uppercase tracking-tighter hover:text-[#FFD700] transition-colors cursor-default italic">
              {tech}
            </span>
            <div className="w-3 h-3 bg-[#FFD700] rounded-full ml-12 opacity-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Blueprint: React.FC = () => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(horizontalRef.current!.scrollWidth - window.innerWidth);
      gsap.to(horizontalRef.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current, start: 'top top', end: () => `+=${horizontalRef.current!.scrollWidth}`, pin: true, scrub: 1, invalidateOnRefresh: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[#0a0a0a] overflow-hidden">
      <div ref={horizontalRef} className="flex items-center h-full px-[10vw] gap-32 will-change-transform">
        <div className="flex-shrink-0 w-[400px]">
          <h2 className="text-[13vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter italic text-white/5">THE ENGINE</h2>
        </div>
        {ROADMAP_PHASES.map((phase) => (
          <div key={phase.phase} className="flex-shrink-0 w-[85vw] md:w-[600px] border border-white/10 p-12 md:p-16 bg-[#050505] relative group hover:border-[#FFD700]/30 transition-colors duration-700">
            <span className="text-[10vw] font-black text-white/[0.03] absolute top-8 right-8 italic">{phase.phase}</span>
            <span className="text-[10px] md:text-xs font-black tracking-[0.5em] text-[#FFD700] uppercase mb-12 block">PHASE_0{phase.phase}</span>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 group-hover:text-white transition-colors">{phase.title}</h3>
            <p className="text-sm md:text-xl font-bold uppercase tracking-tight text-white/40 leading-tight group-hover:text-white/80 transition-all">
              {phase.desc}
            </p>
          </div>
        ))}
        <div className="flex-shrink-0 w-[400px]">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight italic text-[#FFD700] opacity-20">READY FOR<br/>DOMINATION.</h2>
        </div>
      </div>
    </section>
  );
};

const Agency: React.FC = () => {
  return (
    <div className="pt-40 z-10 relative">
      <section className="px-6 md:px-12 mb-40">
        <div className="max-w-6xl">
          <div className="overflow-hidden">
            <h1 className="reveal-text text-[16vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.7] mb-8">
              CRAFTING <span className="text-white/20 italic">DIGITAL</span><br/>SUPREMACY
            </h1>
          </div>
          <p className="reveal-text text-lg md:text-3xl text-white/60 leading-tight font-bold uppercase tracking-tight max-w-4xl">
            A TECHNICAL CREATIVE STUDIO ENGINEERED FOR BRANDS WHO REFUSE TO SETTLE FOR MEDIOCRITY. WE CONVERT AMBITION INTO PERFORMANCE.
          </p>
        </div>
      </section>

      <TechMarquee />

      <section className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 py-48 border-t border-white/10">
        <div className="reveal-text">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-[#FFD700]" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#FFD700] uppercase">PHILOSOPHY</span>
          </div>
          <h2 className="text-[13vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85]">
            NO ART.<br/><span className="italic text-white/10">JUST ROI.</span>
          </h2>
        </div>
        <div className="reveal-text flex flex-col gap-12">
          <p className="text-lg md:text-3xl text-white/50 leading-tight font-bold">
            WE DISCARD THE FLUFF. EVERY PIXEL IS A CONVERSION OPPORTUNITY. EVERY LINE OF CODE IS AN INFRASTRUCTURE INVESTMENT. WE BUILD ENGINES THAT RUN FASTER, RANK HIGHER, AND REVENUE HARDER.
          </p>
          <div className="grid grid-cols-2 gap-12 mt-8">
            {METRICS.map((m, i) => (
              <div key={i} className="flex flex-col border-t border-white/10 pt-8">
                <span className="text-4xl md:text-7xl font-black mb-2 text-white italic">{m.value}</span>
                <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-[#FFD700] uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Blueprint />
      <Culture />
      <Footer />
      
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

export default Agency;