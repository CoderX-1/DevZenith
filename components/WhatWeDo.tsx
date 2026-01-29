
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
        ease: 'expo.out',
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 95%',
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
    <div className="flex flex-col border-t border-white/10 pt-8">
      <span ref={numberRef} className="text-5xl md:text-8xl font-black mb-4">0</span>
      <span className="text-[10px] md:text-sm font-bold tracking-[0.5em] text-white/40 uppercase">
        {label}
      </span>
    </div>
  );
};

const WhatWeDo: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.querySelectorAll('.reveal span'), {
        y: '100%',
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        }
      });
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="agency" ref={textRef} className="reveal-section py-32 md:py-64 px-6 md:px-12 bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
           <div className="overflow-hidden reveal mb-8">
              <span className="text-xs font-bold tracking-[0.5em] text-white/30 uppercase block">CORE PHILOSOPHY</span>
           </div>
           <div className="overflow-hidden reveal">
              <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] mb-12">
                <span>WE BUILD</span><br />
                <span className="text-white/10 italic">REVENUE ENGINES</span>
              </h2>
           </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="overflow-hidden reveal">
            <p className="text-2xl md:text-4xl text-white/70 leading-tight mb-20 max-w-2xl font-black uppercase tracking-tighter">
              <span>OUR APPROACH COMBINES DEEP TECHNICAL SEO KNOWLEDGE WITH HIGH-END CREATIVE EXECUTION. WE DON'T JUST BUILD WEBSITES; WE BUILD SCALABLE PERFORMANCE SYSTEMS.</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
