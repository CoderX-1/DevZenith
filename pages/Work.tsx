
import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const WorkCard: React.FC<{ project: typeof PROJECTS[0]; index: number }> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const layoutStyles = [
    "w-full md:w-[65%] self-start",
    "w-full md:w-[45%] self-end md:-mt-32",
    "w-full md:w-[50%] self-start md:-mt-16",
    "w-full md:w-[70%] self-end md:-mt-24"
  ];
  
  const currentStyle = layoutStyles[index % layoutStyles.length];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, 
        { yPercent: -10, scale: 1.1 },
        { 
          yPercent: 10,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      gsap.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%'
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    gsap.to(badgeRef.current, {
      x: clientX - rect.left - 50,
      y: clientY - rect.top - 50,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className={`group cursor-none mb-32 md:mb-64 relative flex flex-col ${currentStyle}`}
    >
      {/* Interactive Floating Badge */}
      <div 
        ref={badgeRef}
        className="fixed w-32 h-32 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-black tracking-widest uppercase text-center p-4 z-30 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 pointer-events-none transition-all duration-500"
      >
        VIEW CASE STUDY
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
        <img 
          ref={imageRef}
          src={project.imageUrl} 
          alt={project.title} 
          className="absolute inset-0 w-full h-[120%] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
        
        {/* Metric Overlay */}
        {project.successMetric && (
          <div className="absolute top-8 left-8 z-20 bg-[#FFD700] text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-2xl">
            {project.successMetric}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between items-end border-b border-white/10 pb-10">
        <div>
          <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:italic transition-all duration-700">
            {project.title}
          </h3>
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-white/20 group-hover:w-24 group-hover:bg-[#FFD700] transition-all duration-700" />
            <span className="text-[10px] font-bold tracking-[0.5em] text-white/30 uppercase">{project.category}</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] font-black text-[#FFD700] italic mb-2 tracking-[0.3em]">0{index + 1}</span>
          <span className="text-2xl font-black text-white/10 group-hover:text-white transition-colors duration-700">{project.year}</span>
        </div>
      </div>
    </div>
  );
};

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header-reveal', {
        y: '100%',
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40">
      <section className="px-6 md:px-12 mb-48">
        <div className="overflow-hidden mb-[-2vw]">
          <h1 className="work-header-reveal text-[15vw] md:text-[13vw] font-black uppercase tracking-tighter leading-none">
            SELECTED
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="work-header-reveal text-[15vw] md:text-[13vw] font-black uppercase tracking-tighter leading-none text-white/5 italic">
            WORKS
          </h1>
        </div>
        <div className="mt-16 max-w-2xl">
           <p className="text-lg md:text-3xl text-white/40 font-bold leading-tight uppercase tracking-tight">
             WE ENGINEER INFRASTRUCTURE FOR THE WORLD'S MOST AMBITIOUS BRANDS. NO FRILLS. PURE PERFORMANCE.
           </p>
        </div>
      </section>

      <section className="px-6 md:px-12 flex flex-col mb-40 relative z-10">
        <div className="flex flex-col w-full max-w-[1700px] mx-auto">
          {PROJECTS.map((project, idx) => (
            <WorkCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Work;
