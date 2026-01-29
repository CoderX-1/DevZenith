
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADMAP_PHASES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const ROIRoadmap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Progress Line & Runner Animation
      // This line "fills" and the "runner" dot moves down as the user scrolls through the container
      gsap.to(progressLineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.phases-container',
          start: 'top 40%',
          end: 'bottom 55%',
          scrub: 1,
        }
      });

      gsap.to(runnerRef.current, {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.phases-container',
          start: 'top 40%',
          end: 'bottom 55%',
          scrub: 1,
        }
      });

      // 2. Individual Card Reveal Animations
      ROADMAP_PHASES.forEach((_, idx) => {
        const cardContainer = cardsRef.current[idx];
        if (!cardContainer) return;

        const cardBody = cardContainer.querySelector('.phase-card');
        const connector = cardContainer.querySelector('.phase-connector');
        const dot = cardContainer.querySelector('.node-dot');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardContainer,
            start: 'top 80%', // Reveal earlier so user sees them
          }
        });

        tl.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)'
        })
        .from(connector, {
          scaleX: 0,
          transformOrigin: idx % 2 === 0 ? 'right center' : 'left center',
          duration: 0.6,
          ease: 'power2.out'
        }, "-=0.2")
        .from(cardBody, {
          x: idx % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.1,
          ease: 'expo.out'
        }, "-=0.4")
        .to(cardBody, {
          opacity: 1,
          borderColor: '#FFD700',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.05)',
          duration: 0.1
        }, "-=0.2");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-48 md:py-80 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Section Header */}
      <div className="mb-48 md:mb-64 max-w-[1400px] mx-auto text-center md:text-left">
        <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
          <span className="h-px w-12 bg-[#FFD700]" />
          <span className="text-[10px] font-black tracking-[0.5em] text-[#FFD700] uppercase">GROWTH ARCHITECTURE</span>
        </div>
        <h3 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-4">
          FROM GHOST TOWN<br />
          <span className="text-white/10 italic">TO GOLDMINE.</span>
        </h3>
      </div>

      <div className="relative max-w-7xl mx-auto phases-container">
        {/* Central Vertical Power Line (Base) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />
        
        {/* Glowing "Processing" Line (Progress Overlay) */}
        <div 
          ref={progressLineRef} 
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-[#FFD700] shadow-[0_0_20px_#FFD700] origin-top z-10 hidden md:block"
          style={{ height: '0%' }}
        />

        {/* The Runner (Moving head of the line) */}
        <div 
          ref={runnerRef}
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFD700] rounded-full z-20 shadow-[0_0_30px_#FFD700] hidden md:block"
          style={{ top: '0%' }}
        />

        <div className="flex flex-col gap-32 md:gap-64 py-20 relative">
          {ROADMAP_PHASES.map((phase, idx) => (
            <div 
              key={idx} 
              ref={(el) => { cardsRef.current[idx] = el; }}
              className={`relative flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Card Side */}
              <div className={`w-full md:w-1/2 flex items-center ${idx % 2 === 0 ? 'md:justify-end md:pr-32' : 'md:justify-start md:pl-32'}`}>
                
                {/* Connector Line between Card and Center Track */}
                <div className={`phase-connector hidden md:block absolute top-1/2 w-32 h-[1px] bg-white/10 z-0 ${idx % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} />
                
                {/* The Phase Card - The primary visual unit */}
                <div className="phase-card relative z-10 w-full max-w-lg p-10 md:p-14 bg-[#0a0a0a] border border-white/5 transition-all duration-1000 group hover:bg-[#0d0d0d]">
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-xl font-black text-[#FFD700] bg-[#FFD700]/10 px-4 py-1 rounded-sm tracking-widest uppercase">
                      PHASE {phase.phase}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  
                  <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none group-hover:text-white transition-colors">
                    {phase.title}
                  </h4>
                  
                  <p className="text-base md:text-xl text-white/40 leading-relaxed font-bold tracking-wide uppercase group-hover:text-white/60 transition-colors">
                    {phase.desc}
                  </p>
                  
                  {/* Backdrop Number Decoration */}
                  <span className="absolute bottom-6 right-8 text-9xl font-black text-white/[0.02] pointer-events-none select-none italic">
                    {phase.phase}
                  </span>
                </div>
              </div>

              {/* Intersection Node (Center Track Dot) */}
              <div className="node-dot absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] border border-white/20 rounded-full z-20 hidden md:block" />

              {/* Empty Spacer Side to maintain grid balance */}
              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.01] select-none z-0 overflow-hidden">
        <span className="text-[40vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
          BLUEPRINT
        </span>
      </div>
    </section>
  );
};

export default ROIRoadmap;
