import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { METRICS } from '../constants';

const MetricCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  
  useLayoutEffect(() => {
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
    const prefix = value.startsWith('+') ? '+' : '';
    const suffix = value.endsWith('%') ? '%' : '';
    
    const ctx = gsap.context(() => {
      const obj = { count: 0 };
      gsap.to(obj, {
        count: numericPart,
        duration: 3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 90%',
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = `${prefix}${Math.floor(obj.count)}${suffix}`;
          }
        }
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="flex flex-col">
      <span ref={numberRef} className="text-4xl md:text-6xl font-black mb-2">0</span>
      <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/40 uppercase">
        {label}
      </span>
    </div>
  );
};

const WhatWeDo: React.FC = () => {
  return (
    <section id="agency" className="reveal-section py-32 px-6 md:px-12 border-t border-white/10 mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-12">
            WE BUILD<br />REVENUE ENGINES
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm md:text-lg text-white/60 leading-relaxed mb-16 max-w-xl">
            Our approach combines deep technical SEO knowledge with high-end creative execution. We don't just build websites; we build scalable performance systems that outpace the market.
          </p>
          
          <div className="flex gap-12 border-t border-white/10 pt-12">
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