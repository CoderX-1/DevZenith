
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface RollingLinkProps {
  href: string;
  label: string;
  className?: string;
}

const RollingLink: React.FC<RollingLinkProps> = ({ href, label, className }) => {
  return (
    <a 
      href={href} 
      className={`group relative overflow-hidden block ${className}`}
    >
      <div className="relative flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {/* Primary State */}
        <span className="block">{label}</span>
        {/* Hover State - Slides up from below */}
        <span className="absolute top-full left-0 block italic text-white/40 whitespace-nowrap">
          {label}
        </span>
      </div>
    </a>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 py-12 md:py-24 border-t border-white/10 overflow-hidden">
      <div className="relative group cursor-pointer py-24 md:py-48 flex items-center justify-center">
        <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none transition-opacity group-hover:opacity-30 duration-500 text-center">
          LET'S TALK
        </h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
           <ArrowUpRight size={120} strokeWidth={3} className="text-white" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between pt-24 border-t border-white/10 mt-12">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">ADDRESS</span>
          <p className="text-xs sm:text-sm text-white/70 max-w-[200px]">DUBAI DESIGN DISTRICT<br />
            BUILDING 6, OFFICE 102<br />
            DUBAI, UAE
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">SAY HELLO</span>
          <div className="flex flex-col gap-3">
            <RollingLink 
              href="mailto:hello@devzenith.agency" 
              label="HELLO@DEVZENITH.AGENCY" 
              className="text-base md:text-xl font-bold"
            />
            <RollingLink 
              href="mailto:careers@devzenith.agency" 
              label="CAREERS@DEVZENITH.AGENCY" 
              className="text-base md:text-xl font-bold"
            />
            <a href="tel:+9710000000" className="text-sm md:text-base text-white/50 hover:text-white transition-colors duration-300">
              +971 (0) 4 555 1234
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">SOCIAL</span>
          <div className="flex gap-6">
            {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-sm font-bold hover:opacity-50 transition-opacity duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12">
        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
          © 2026 DEVZENITH. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
          DEVELOPED BY DEVZENITH TEAM
        </span>
      </div>
    </footer>
  );
};

export default Footer;