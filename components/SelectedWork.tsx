
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '../constants';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; index: number }> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation (Bottom-Left Reveal)
      // We use a slightly different start for each card to create a natural scroll-based stagger
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0, 
          x: -200, 
          y: 250, 
          rotation: -8,
          scale: 0.85
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 105%', // Starts earlier for a longer journey
            end: 'top 40%',
            scrub: 1.5,
          }
        }
      );

      // 2. Parallax effect for the image inside the frame
      gsap.fromTo(imageRef.current, 
        { yPercent: -20 }, 
        { 
          yPercent: 20, 
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // 3. Staggered reveal for text content - delayed relative to card landing
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`group relative w-full mb-40 md:mb-96 flex flex-col cursor-pointer ${isEven ? 'items-start' : 'items-end'}`}
    >
      <div className={`relative h-[55vh] md:h-[85vh] w-full md:w-[85%] overflow-hidden bg-white/5 border border-white/5 shadow-2xl`}>
        <img
          ref={imageRef}
          src={project.imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-[140%] object-cover transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Project Index Number - Subtle Background element */}
        <span className="absolute top-10 right-10 text-[15vw] font-black text-white/5 select-none pointer-events-none leading-none">
          0{index + 1}
        </span>
      </div>

      <div 
        ref={contentRef}
        className={`mt-10 flex flex-col md:flex-row justify-between w-full md:w-[85%] gap-6`}
      >
        <div className="flex-1">
          <div className="overflow-hidden">
            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4 text-white/70 group-hover:text-white transition-all duration-500 ease-out">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-700" />
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-white/40 group-hover:text-white/80 uppercase transition-colors duration-500">
              {project.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-end">
          <span className="text-2xl md:text-4xl font-black text-white/10 group-hover:text-white transition-colors duration-500">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
};

const SelectedWork: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleLine1 = useRef<HTMLDivElement>(null);
  const titleLine2 = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      });

      tl.fromTo([titleLine1.current, titleLine2.current],
        { y: '100%' },
        { y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.6"
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="px-6 md:px-12 py-32 border-t border-white/10 bg-[#050505]">
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-48 gap-8">
        <div>
          <div className="overflow-hidden mb-4">
            <h2 ref={subtitleRef} className="text-sm font-bold tracking-[0.4em] uppercase text-white/30">
              FEATURED PORTFOLIO
            </h2>
          </div>
          <div className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85]">
            <div className="overflow-hidden">
              <div ref={titleLine1}>SELECTED</div>
            </div>
            <div className="overflow-hidden">
              <div ref={titleLine2}>WORK</div>
            </div>
          </div>
        </div>
        <div className="max-w-xs text-sm md:text-lg text-white/40 font-medium leading-relaxed uppercase tracking-wider pb-4">
          A collection of high-performance digital solutions built for global leaders, engineered for maximum impact and conversion.
        </div>
      </div>
      
      <div className="flex flex-col max-w-[1600px] mx-auto">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
