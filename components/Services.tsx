
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard: React.FC<{ service: typeof SERVICES[0] }> = ({ service }) => {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[650px] h-[450px] md:h-[550px] bg-[#0a0a0a] border border-white/10 p-8 md:p-16 flex flex-col justify-between relative overflow-hidden group hover:border-[#FFD700]/30 transition-colors duration-700">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="relative z-10 overflow-hidden">
        <div className="flex justify-between items-start mb-12">
          <span className="text-2xl md:text-6xl font-black text-white/10 italic group-hover:text-[#FFD700] group-hover:not-italic transition-all duration-700">
            {service.id}
          </span>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-[#FFD700] uppercase">STATUS: ACTIVE</span>
            <div className="w-12 h-[2px] bg-[#FFD700]/20 overflow-hidden">
               <div className="w-full h-full bg-[#FFD700] animate-[shimmer_2s_infinite]" style={{ transform: 'translateX(-100%)' }} />
            </div>
          </div>
        </div>
        
        <h3 className="text-[2.5rem] md:text-[6vw] lg:text-[6vw] xl:text-[5vw] 2xl:text-[4vw] font-black uppercase tracking-tighter leading-none mb-14 md:mb-8 group-hover:translate-x-4 transition-transform duration-700 ease-expo">
          {service.title}
        </h3>
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <p className="text-sm md:text-lg font-bold tracking-tight text-white/40 leading-tight uppercase group-hover:text-white/70 transition-colors duration-500 max-w-sm">
          {service.description}
        </p>
        
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase group-hover:text-white/40 transition-colors">
            ENGINEERING SPEC_0{service.id}
          </span>
        </div>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10 group-hover:border-[#FFD700]/40 transition-colors" />
    </div>
  );
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = horizontalRef.current!.scrollWidth;
      const amountToScroll = scrollWidth - window.innerWidth;

      // Horizontal Scroll Animation
      gsap.to(horizontalRef.current, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress Bar Animation
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${scrollWidth}`,
          scrub: 1,
        }
      });

      // Header Staggered Reveal
      gsap.from('.services-header span', {
        y: '100%',
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-transparent overflow-hidden">
      {/* Introduction Header */}
      <div className="px-6 md:px-12 md:pt-64 mb-12 md:mb-24">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-12 bg-[#FFD700]" />
          <span className="text-[12px] md:text-[14px] font-black tracking-[0.5em] text-[#FFD700] uppercase">CAPABILITIES</span>
        </div>
        <div className="services-header overflow-hidden">
          <h2 className="text-[13vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none">
            <span className="block">CORE</span>
            <span className="block text-white/10 italic">SYSTEMS.</span>
          </h2>
        </div>
      </div>

      {/* Pinning Trigger & Horizontal Container */}
      <div ref={triggerRef} className="h-[750px] flex items-center">
        <div ref={horizontalRef} className="flex gap-8 md:gap-16 px-6 md:px-32 relative will-change-transform">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          
          {/* Final Aesthetic Card */}
          <div className="flex-shrink-0 w-[85vw] md:w-[650px] h-[450px] md:h-[550px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
             <span className="text-[10px] font-black tracking-[1em] text-white/20 uppercase mb-8">NEXT GEN READY</span>
             <h4 className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-tighter italic">
                YOUR GROWTH<br />ENGINE HERE.
             </h4>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .ease-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </section>
  );
};

export default Services;
