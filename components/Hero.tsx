
import React, { useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Filter out null refs before animation to avoid "GSAP target null not found"
      const validLines = linesRef.current.filter(line => line !== null);
      
      if (validLines.length > 0) {
        // Entrance Mask Reveal
        gsap.fromTo(
          validLines,
          { y: '100%', opacity: 0 },
          { 
            y: '0%', 
            opacity: 1,
            duration: 1.6, 
            stagger: 0.15, 
            ease: 'power4.out',
            delay: 0.8
          }
        );
      }

      // Scroll Fade - Target the containerRef directly to avoid selector lookup issues
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = useCallback((el: HTMLDivElement | null, index: number) => {
    linesRef.current[index] = el;
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col md:justify-center px-6 md:px-12 pt-32 relative z-10">
      <div className="max-w-[1400px]">
        <div className="overflow-hidden mb-[-1.5vw]">
          <h1 ref={(el) => addToRefs(el, 0)} className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
            TECHNICAL
          </h1>
        </div>
        <div className="overflow-hidden mb-[-1.5vw]">
          <h1 ref={(el) => addToRefs(el, 1)} className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
            MASTERY
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={(el) => addToRefs(el, 2)} className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase text-white/5 italic">
            FOR BRANDS
          </h1>
        </div>
      </div>
      
      <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-8 gap-8">
        <div className="overflow-hidden max-w-md">
          <p ref={(el) => addToRefs(el, 3)} className="text-sm md:text-base text-white/60 leading-relaxed font-medium uppercase tracking-tight">
            WE PARTNER WITH DISRUPTIVE BRANDS TO ENGINEER HIGH-CONVERSION DIGITAL EXPERIENCES THROUGH METICULOUS DESIGN AND TECHNICAL EXCELLENCE.
          </p>
        </div>
        <div className="flex gap-10 overflow-hidden">
          <div ref={(el) => addToRefs(el, 4)} className="flex flex-col">
            <span className="text-[10px] font-black text-[#FFD700] tracking-widest uppercase mb-1">LOCATION</span>
            <span className="text-xs font-bold tracking-widest text-white/60 uppercase">DUBAI / DXB</span>
          </div>
          <div ref={(el) => addToRefs(el, 5)} className="flex flex-col">
            <span className="text-[10px] font-black text-[#FFD700] tracking-widest uppercase mb-1">FOUNDED</span>
            <span className="text-xs font-bold tracking-widest text-white/60 uppercase">EST. 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
