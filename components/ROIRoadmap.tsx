import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADMAP_PHASES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const ROIRoadmap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use matchMedia to separate Desktop and Mobile animations
      const mm = gsap.matchMedia();

      // 1. Center Progress Line & Runner (DESKTOP ONLY)
      mm.add("(min-width: 768px)", () => {
        if (progressLineRef.current && runnerRef.current && containerRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%', // Starts when container is 60% down the viewport
              end: 'bottom 60%',
              scrub: 1.5, // Smoother scrub
            }
          });
          
          tl.to(progressLineRef.current, { height: '100%', ease: 'none' }, 0)
            .to(runnerRef.current, { top: '100%', ease: 'none' }, 0);
        }
      });

      // 2. Individual Cards Animation
      cardsRef.current.forEach((cardContainer, idx) => {
        if (!cardContainer) return;

        const cardBody = cardContainer.querySelector('.phase-card');
        const connector = cardContainer.querySelector('.phase-connector');
        const dot = cardContainer.querySelector('.node-dot');

        // DESKTOP: Complex timeline with dots, lines, and side-reveals
        mm.add("(min-width: 768px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cardContainer,
              start: 'top 80%', // Reveal just as it enters view
            }
          });

          if (dot) tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(2)' });
          
          if (connector) tl.fromTo(connector, 
            { scaleX: 0 }, 
            { scaleX: 1, transformOrigin: idx % 2 === 0 ? 'right center' : 'left center', duration: 0.6, ease: 'power3.out' }, 
            "-=0.3"
          );
          
          if (cardBody) {
            tl.fromTo(cardBody, 
              { x: idx % 2 === 0 ? -60 : 60, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 1, ease: 'expo.out' }, 
              "-=0.4"
            )
            .to(cardBody, {
              borderColor: 'rgba(255, 215, 0, 0.4)', // Subtle Gold border
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.05)',
              duration: 0.5
            }, "-=0.5");
          }
        });

        // MOBILE: Simple, clean slide-up (no complex lines/dots)
        mm.add("(max-width: 767px)", () => {
          if (cardBody) {
            gsap.fromTo(cardBody,
              { y: 50, opacity: 0 },
              { 
                y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
                scrollTrigger: {
                  trigger: cardContainer,
                  start: 'top 85%',
                }
              }
            );
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-64 px-6 md:px-12 bg-[#050505] relative overflow-hidden z-10">
      
      {/* Section Header */}
      <div className="mb-24 md:mb-48 mx-auto text-left max-w-[1600px]">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-[#FFD700]" />
          <span className="reveal-text text-[10px] text-xs font-bold tracking-[0.4em] text-[#FFD700] uppercase">
            GROWTH ARCHITECTURE
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="reveal-text text-[13vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85]">
            FROM GHOST TOWN
          </h2>
          <h2 className="reveal-text text-[13vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] text-white/10 italic">
            TO GOLDMINE.
          </h2>
        </div>
      </div>

      <div ref={containerRef} className="relative max-w-7xl mx-auto phases-container">
        
        {/* Central Vertical Power Line (Base) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />
        
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
          style={{ top: '0%', marginTop: '-8px' }}
        />

        <div className="flex flex-col gap-24 md:gap-40 py-10 relative">
          {ROADMAP_PHASES.map((phase, idx) => (
            <div 
              key={idx} 
              ref={(el) => { cardsRef.current[idx] = el; }}
              className={`relative flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Card Side */}
              <div className={`w-full md:w-1/2 flex items-center ${idx % 2 === 0 ? 'md:justify-end md:pr-24' : 'md:justify-start md:pl-24'}`}>
                
                {/* Connector Line between Card and Center Track */}
                <div className={`phase-connector hidden md:block absolute top-1/2 w-24 h-[1px] bg-white/10 z-0 ${idx % 2 === 0 ? 'right-1/2' : 'left-1/2'}`} />
                
                {/* The Phase Card - The primary visual unit */}
                <div className="phase-card relative z-10 w-full max-w-lg p-10 md:p-14 bg-[#0a0a0a] border border-white/5 transition-all duration-700 group">
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-xs md:text-sm font-black text-[#FFD700] bg-[#FFD700]/10 px-4 py-2 rounded-sm tracking-widest uppercase">
                      PHASE {phase.phase}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  
                  <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none group-hover:text-white transition-colors">
                    {phase.title}
                  </h4>
                  
                  <p className="text-sm md:text-lg text-white/40 leading-relaxed font-bold tracking-wide uppercase group-hover:text-white/70 transition-colors">
                    {phase.desc}
                  </p>
                  
                  {/* Backdrop Number Decoration */}
                  <span className="absolute bottom-4 right-6 text-8xl md:text-9xl font-black text-white/[0.02] pointer-events-none select-none italic transition-all duration-700 group-hover:scale-110">
                    {phase.phase}
                  </span>
                </div>
              </div>

              {/* Intersection Node (Center Track Dot) */}
              <div className="node-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050505] border-2 border-white/20 rounded-full z-20 hidden md:block" />

              {/* Empty Spacer Side to maintain grid balance */}
              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.015] select-none z-0 overflow-hidden mix-blend-overlay">
        <span className="text-[35vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap italic">
          BLUEPRINT
        </span>
      </div>
    </section>
  );
};

export default ROIRoadmap;