
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const PartnerClub: React.FC = () => {
  const starRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    gsap.to(starRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
  }, []);

  return (
    <section className="py-48 md:py-64 px-6 md:px-12 bg-transparent text-center overflow-hidden border-t border-white/5">
      <div className="flex flex-col items-center gap-12">
        <div className="relative">
           <Star ref={starRef} size={80} strokeWidth={1} className="text-white/20" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
           </div>
        </div>
        
        <div>
          <h2 className="text-xs font-bold tracking-[0.6em] text-white/30 uppercase mb-8">PARTNER CLUB</h2>
          <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight max-w-4xl mx-auto">
            WE DON'T HAVE 'CLIENTS,' WE HAVE <span className="italic text-white/20">PARTNERS.</span>
          </h3>
          <p className="text-sm md:text-xl font-bold uppercase tracking-widest text-white/40 mt-12 max-w-2xl mx-auto">
            80% OF OUR REVENUE COMES FROM LONG-TERM SCALING PARTNERSHIPS. WE GROW ONLY WHEN YOU GROW.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerClub;
