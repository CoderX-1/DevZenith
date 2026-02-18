import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { METRICS } from '../constants';

const MetricCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  
  useLayoutEffect(() => {
    if (!numberRef.current) return;
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
    const prefix = value.startsWith('+') ? '+' : '';
    const suffix = value.endsWith('%') ? '%' : '';
    
    const ctx = gsap.context(() => {
      const obj = { count: 0 };
      gsap.to(obj, {
        count: numericPart, duration: 2.5, ease: 'power3.out',
        scrollTrigger: { trigger: numberRef.current, start: 'top 85%' },
        onUpdate: () => {
          if (numberRef.current) numberRef.current.innerText = `${prefix}${Math.floor(obj.count)}${suffix}`;
        }
      });
    }, numberRef);
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="reveal-text flex flex-col border-t border-white/10 pt-6">
      <span ref={numberRef} className="text-5xl md:text-7xl font-black mb-2 text-[#FFD700]">0</span>
      <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">
        {label}
      </span>
    </div>
  );
};

const WhatWeDo: React.FC = () => {
  return (
    <section id="agency" className="py-24 md:py-48 px-6 md:px-12 bg-transparent z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 max-w-[1600px] mx-auto">
        <div>
           <div className="mb-6">
              <span className="reveal-text text-[10px] md:text-xs font-bold tracking-[0.5em] text-[#FFD700] uppercase block">CORE PHILOSOPHY</span>
           </div>
           <div className="space-y-2">
              <h2 className="reveal-text text-[13vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85]">
                WE BUILD
              </h2>
              <h2 className="reveal-text text-[13vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] text-white/10 italic">
                REVENUE ENGINES
              </h2>
           </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-16">
            <p className="reveal-text text-lg md:text-3xl text-white/70 leading-tight max-w-2xl font-bold uppercase tracking-tight">
              OUR APPROACH COMBINES DEEP TECHNICAL SEO KNOWLEDGE WITH HIGH-END CREATIVE EXECUTION. WE DON'T JUST BUILD WEBSITES; WE BUILD SCALABLE PERFORMANCE SYSTEMS.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {METRICS.map((metric, idx) => (
              <MetricCounter key={idx} value={metric.value} label={metric.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;