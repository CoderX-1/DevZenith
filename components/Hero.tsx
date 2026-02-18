import React, { useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomWrapperRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const validLines = linesRef.current.filter(line => line !== null);
      if (validLines.length > 0) {
        gsap.fromTo(validLines,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out', delay: 0.5 }
        );
      }
      if (zoomWrapperRef.current && containerRef.current) {
        gsap.to(zoomWrapperRef.current, {
          scale: 4, opacity: 0, filter: "blur(20px)",
          scrollTrigger: {
            trigger: containerRef.current, start: 'top top', end: '+=100%', scrub: 1, pin: true,
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
    <section ref={containerRef} className="h-screen flex flex-col justify-center px-6 md:px-12 relative z-10 overflow-hidden">
      <div ref={zoomWrapperRef} className="w-full mx-auto flex flex-col items-start will-change-transform">
        
        <div className="overflow-hidden mb-[-2vw]">
          <h1 ref={(el) => addToRefs(el, 0)} className="text-[16vw] md:text-[11vw] font-black leading-[0.85] tracking-tighter uppercase drop-shadow-2xl text-left">
            TECHNICAL
          </h1>
        </div>
        <div className="overflow-hidden mb-[-2vw]">
          <h1 ref={(el) => addToRefs(el, 1)} className="text-[16vw] md:text-[11vw] font-black leading-[0.85] tracking-tighter uppercase drop-shadow-2xl text-[#FFD700] text-left">
            MASTERY
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={(el) => addToRefs(el, 2)} className="text-[16vw] md:text-[11vw] font-black leading-[0.85] tracking-tighter uppercase text-white/20 italic text-left">
            FOR BRANDS
          </h1>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-6 gap-6 w-full">
          <div className="overflow-hidden max-w-lg">
            <p ref={(el) => addToRefs(el, 3)} className="text-lg md:text-3xl text-white/60 leading-tight font-bold uppercase tracking-tight text-left">
              WE PARTNER WITH DISRUPTIVE BRANDS TO ENGINEER HIGH-CONVERSION DIGITAL EXPERIENCES.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;