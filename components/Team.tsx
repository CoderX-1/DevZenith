
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { TEAM_MEMBERS } from '../constants';

const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-member', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="px-6 md:px-12 py-32 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
        <div>
          <span className="text-sm font-bold tracking-[0.4em] text-white/30 uppercase mb-4 block">OUR COLLECTIVE</span>
          <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none">THE TEAM</h2>
        </div>
        <p className="max-w-xs text-sm md:text-lg text-white/40 leading-relaxed font-medium">
          A SYNERGY OF SPECIALISTS DEDICATED TO TECHNICAL PRECISION AND CREATIVE EXCELLENCE.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="team-member group cursor-crosshair">
            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/5 mb-6">
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-1 transition-colors duration-300 group-hover:text-white/80">
                {member.name}
              </h4>
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase group-hover:text-white transition-colors duration-500">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
