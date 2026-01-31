
import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

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
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-bottom-reveal', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-bottom-reveal',
          start: 'top 95%',
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="px-6 md:px-12 py-12 md:py-24 border-t border-white/10 overflow-hidden bg-[#050505]">
      
      {/* Centered "Let's Talk" Call to Action */}
      <div className="relative group cursor-pointer py-24 md:py-48 flex items-center justify-center">
        <h2 className="text-[12vw] font-black uppercase tracking-tighter leading-none transition-opacity group-hover:opacity-30 duration-500 text-center">
          LET'S TALK
        </h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
           <ArrowUpRight size={120} strokeWidth={3} className="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24 border-t border-white/10 mt-12">
        <div className="footer-bottom-reveal flex flex-col gap-6">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">ADDRESS</span>
          <p className="text-sm text-white/70 max-w-[200px]">
            DUBAI DESIGN DISTRICT<br />
            BUILDING 6, OFFICE 102<br />
            DUBAI, UAE
          </p>
        </div>
        
        <div className="footer-bottom-reveal flex flex-col gap-6">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">SAY HELLO</span>
          <div className="flex flex-col gap-3">
            <RollingLink 
              href="mailto:hello@devzenith.agency" 
              label="HELLO@DEVZENITH.AGENCY" 
              className="text-xl font-bold"
            />
            <RollingLink 
              href="mailto:careers@devzenith.agency" 
              label="CAREERS@DEVZENITH.AGENCY" 
              className="text-xl font-bold"
            />
          </div>
        </div>

        <div className="footer-bottom-reveal flex flex-col gap-6">
          <span className="text-xs font-bold tracking-widest text-white/40 uppercase">SOCIAL</span>
          <div className="flex gap-6">
            {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-sm font-bold hover:text-white/40 transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 opacity-50">
        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
          © 2026 DEVZENITH. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
          DEVELOPED BY AWARDS TEAM
        </span>
      </div>
    </footer>
  );
};

export default Footer;