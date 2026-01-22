
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { METRICS } from '../constants';
import Team from '../components/Team';
import Culture from '../components/Culture';
import Footer from '../components/Footer';

const Agency: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.agency-reveal', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40">
      <section className="px-6 md:px-12 mb-40">
        <div className="max-w-4xl">
          <h1 className="agency-reveal text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">
            WE ARE <span className="text-white/20 italic">DEVZENITH.</span>
          </h1>
          <p className="agency-reveal text-sm md:text-lg text-white/70 leading-relaxed font-medium">
            A TECHNICAL CREATIVE AGENCY BORN IN THE INTERSECTION OF ENGINEERING PRECISION AND BOLD AESTHETICS. WE SCALE BRANDS BY BUILDING THE FUTURE OF DIGITAL PERFORMANCE.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 py-32 border-t border-white/10">
        <div className="agency-reveal">
          <h2 className="text-sm font-bold tracking-[0.4em] text-white/30 uppercase mb-4">OUR PHILOSOPHY</h2>
          <h3 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none">
            DATA DRIVEN.<br />DESIGN LED.
          </h3>
        </div>
        <div className="agency-reveal flex flex-col gap-8">
          <p className="text-sm md:text-lg text-white/50 leading-relaxed">
            We believe that beautiful design is only effective when backed by robust technical architecture. Our team of engineers and designers work in tight feedback loops to ensure every pixel serves a purpose and every line of code contributes to conversion.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-8">
            {METRICS.map((m, i) => (
              <div key={i} className="flex flex-col border-t border-white/10 pt-6">
                <span className="text-4xl font-black mb-2">{m.value}</span>
                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Team />
      
      <Culture />

      <section className="px-6 md:px-12 py-32 border-t border-white/10 mb-20">
        <h2 className="text-sm font-bold tracking-[0.4em] text-white/30 uppercase mb-20">THE STUDIO</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-[3/4] bg-white/5 border border-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               <img src={`https://picsum.photos/seed/studio-${i}/800/1066`} className="w-full h-full object-cover" alt="studio" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agency;