import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 py-12 md:py-24 border-t border-white/10 overflow-hidden bg-[#050505] relative z-10">
      
      {/* Centered "Let's Talk" Call to Action */}
      <div className="relative group cursor-pointer py-24 md:py-48 flex items-center justify-center">
        <h2 className="text-[16vw] md:text-[11vw] font-black uppercase tracking-tighter leading-[0.85] transition-opacity group-hover:opacity-30 duration-500 text-center">
          LET'S TALK
        </h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
           <ArrowUpRight size={100} strokeWidth={3} className="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 border-t border-white/10 mt-12">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">ADDRESS</span>
          <p className="text-sm text-white/70 max-w-[200px]">
            DUBAI DESIGN DISTRICT<br />BUILDING 6, OFFICE 102<br />DUBAI, UAE
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">SAY HELLO</span>
          <div className="flex flex-col gap-3">
            <a href="mailto:hello@devzenith.agency" className="text-lg md:text-xl font-bold hover:italic transition-all">HELLO@DEVZENITH.AGENCY</a>
            <a href="mailto:careers@devzenith.agency" className="text-lg md:text-xl font-bold hover:italic transition-all">CAREERS@DEVZENITH.AGENCY</a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/40 uppercase">SOCIAL</span>
          <div className="flex gap-6">
            {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map((social) => (
              <a key={social} href="#" className="text-sm font-bold hover:text-white/40 transition-colors duration-300">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 opacity-50">
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase text-center">
          © 2026 DEVZENITH. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase text-center">
          ENGINEERED IN DUBAI / KARACHI
        </span>
      </div>
    </footer>
  );
};

export default Footer;