
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLines = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textLines.current,
        { y: '100%' },
        { 
          y: '0%', 
          duration: 1.5, 
          stagger: 0.2, 
          ease: 'power4.out',
          delay: 0.5 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textLines.current.includes(el)) {
      textLines.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col md:justify-center px-6 md:px-12 pt-32">
      <div className="max-w-[1400px]">
        <div className="overflow-hidden mb-[-1.5vw]">
          <h1 ref={addToRefs} className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase">
            TECHNICAL
          </h1>
        </div>
        <div className="overflow-hidden mb-[-1.5vw]">
          <h1 ref={addToRefs} className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase">
            MASTERY
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={addToRefs} className="text-[14vw] md:text-[10vw] font-black leading-[0.9] tracking-tighter uppercase text-white/20">
            FOR BRANDS
          </h1>
        </div>
      </div>
      
      <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-8 gap-8">
        <p className="max-w-md text-sm md:text-lg text-white/60 leading-relaxed font-medium">
          WE PARTNER WITH DISRUPTIVE BRANDS TO ENGINEER HIGH-CONVERSION DIGITAL EXPERIENCES THROUGH METICULOUS DESIGN AND TECHNICAL EXCELLENCE.
        </p>
        <div className="flex gap-4">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">DUBAI / KARACHI</span>
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">EST. 2026 </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
