import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const WorkCard: React.FC<{ project: typeof PROJECTS[0]; index: number }> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const layoutStyles = [
    "w-full md:w-[65%] self-start", "w-full md:w-[45%] self-end md:-mt-32",
    "w-full md:w-[50%] self-start md:-mt-16", "w-full md:w-[70%] self-end md:-mt-24"
  ];
  
  const currentStyle = layoutStyles[index % layoutStyles.length];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, { yPercent: -10, scale: 1.1 }, { yPercent: 10, scale: 1, ease: 'none', scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from(containerRef.current, { y: 100, opacity: 0, duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: containerRef.current, start: 'top 90%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`group cursor-pointer mb-32 md:mb-64 relative flex flex-col ${currentStyle}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
        <img ref={imageRef} src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-[120%] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/20 opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
        {project.successMetric && (
          <div className="absolute top-8 left-8 z-20 bg-[#FFD700] text-black px-4 py-1 text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl">
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
            <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-white/30 uppercase">{project.category}</span>
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
  return (
    <div className="pt-40 z-10 relative">
      <section className="px-6 md:px-12 mb-48">
        <div className="overflow-hidden mb-[-2vw]">
          <h1 className="reveal-text text-[16vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.85]">
            SELECTED
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="reveal-text text-[16vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.85] text-white/5 italic">
            WORKS
          </h1>
        </div>
        <div className="mt-8 md:mt-12 max-w-2xl">
           <p className="reveal-text text-lg md:text-3xl text-white/40 font-bold leading-tight uppercase tracking-tight">
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