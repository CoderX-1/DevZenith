
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '../constants';
import Footer from '../components/Footer';

const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
      });
      
      const cards = gsap.utils.toArray('.work-grid-card');
      cards.forEach((card: any) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%'
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40">
      <section className="px-6 md:px-12 mb-32">
        <div className="overflow-hidden">
          <h1 className="work-header-text text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none">
            SELECTED
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="work-header-text text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none text-white/20">
            WORKS
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 mb-40">
        {PROJECTS.map((project) => (
          <div key={project.id} className="work-grid-card group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden bg-white/5 border border-white/5 mb-8">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{project.title}</h3>
                <span className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">{project.category}</span>
              </div>
              <span className="text-xl font-black text-white/20">{project.year}</span>
            </div>
          </div>
        ))}
      </section>
      
      <Footer />
    </div>
  );
};

export default Work;
