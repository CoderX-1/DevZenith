
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LeadMagnet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.magnet-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#FFD700] py-24 md:py-48 px-6 md:px-12 text-black overflow-hidden relative">
      <div className=" mx-auto flex flex-col md:flex-row items-center gap-16 justify-between">
        <div className="flex-1">
          <h2 className="magnet-reveal text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-12">
            STOP GUESSING.<br />START GROWING.
          </h2>
          <p className="magnet-reveal text-lg md:text-2xl font-bold uppercase tracking-tight max-w-xl leading-tight opacity-80">
            WE DON'T SEND GENERIC PROPOSALS. ENTER YOUR URL FOR A FREE 2-MINUTE VIDEO AUDIT OF YOUR COMPETITORS IN DUBAI & RIYADH.
          </p>
        </div>
        
        <div className="magnet-reveal w-full md:w-auto md:min-w-[400px]">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <input 
                type="url" 
                placeholder="YOURWEBSITE.COM" 
                className="w-full bg-transparent border-b-4 border-black py-6 text-2xl font-black uppercase tracking-tighter placeholder:text-black/20 focus:outline-none transition-all focus:px-4"
              />
            </div>
            <button className="bg-black text-[#FFD700] py-6 px-12 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 active:scale-95">
              GET MY AUDIT
            </button>
          </form>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 opacity-10 select-none pointer-events-none">
        <span className="text-[25vw] font-black uppercase tracking-tighter leading-none">FREE</span>
      </div>
    </section>
  );
};

export default LeadMagnet;
