
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const Culture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Masked reveal for the headline
      gsap.from('.culture-headline-text', {
        y: '100%',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 90%',
        }
      });

      // Parallax for the main image
      gsap.fromTo(imageRef.current, 
        { yPercent: -10 },
        { 
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Entrance animation for the floating card
      gsap.from(cardRef.current, {
        x: 40,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="px-6 md:px-12 py-32 md:py-48 border-t border-white/10 bg-[#050505]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div ref={headlineRef} className="overflow-hidden mask-reveal">
            <h2 className="culture-headline-text text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              CULTIVATING AN<br />
              AGENCY WHERE<br />
              PEOPLE <span className="text-white/20 italic">BLOOM.</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-10">
            <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-xl">
              Happy teams are better teams. We take pride in creating a progressive environment that recognizes and rewards great work.
            </p>
            
            <button className="group relative px-8 py-4 bg-white text-black rounded-full w-fit text-xs font-black tracking-widest uppercase overflow-hidden transition-all duration-500 hover:bg-black hover:text-white border border-white flex items-center gap-3">
              <span className="relative z-10">JOIN SOMETHING SPECIAL</span>
              <ArrowUpRight size={16} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Right Side: Image + Floating Card */}
        <div className="relative order-1 lg:order-2">
          {/* Main Parallax Image */}
          <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-white/5 border border-white/10">
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-[120%] object-cover grayscale opacity-80 scale-110"
              alt="Our progressive environment"
            />
          </div>

          {/* Featured Employee Testimonial Block */}
          <div 
            ref={cardRef}
            className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-16 bg-white p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-w-[320px] md:max-w-[400px] transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          >
            <p className="text-black text-sm md:text-lg font-bold uppercase tracking-tight leading-snug mb-8 italic">
              "THE CREATIVE JOURNEY HERE IS UNLIKE ANYWHERE ELSE. WE ARE GIVEN THE SPACE TO FAIL, LEARN, AND ULTIMATELY, DISRUPT."
            </p>
            
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden grayscale border border-black/5">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                  alt="Sarah J."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-black text-xs md:text-sm font-black uppercase tracking-widest">SARAH JENSEN</span>
                <span className="text-black/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">SENIOR MANAGER</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Culture;
