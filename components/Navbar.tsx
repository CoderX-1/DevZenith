
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { X, Menu as MenuIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavLinkProps {
  label: string;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ label, onClick, className, isActive }) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative overflow-hidden block text-left cursor-pointer ${className}`}
    >
      <div className={`relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${isActive ? 'italic' : ''}`}>
        <span className="block">{label}</span>
        <span className="absolute top-full left-0 block italic text-white/40">
          {label}
        </span>
      </div>
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
      )}
    </button>
  );
};

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isAnimating = useRef(false);

  // We use a persistent context to avoid 'pop' on state changes
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          setIsScrolled(self.scroll() > 50);
        }
      });
    });
    return () => contextRef.current?.revert();
  }, []);

  useLayoutEffect(() => {
    if (!contextRef.current) return;

    contextRef.current.add(() => {
      if (isOpen) {
        // OPENING ANIMATION
        isAnimating.current = true;
        gsap.set(menuRef.current, { display: 'flex' });
        
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
          }
        });

        tl.set(bgRef.current, { y: '-100%' });
        tl.set('.mobile-link-container', { y: 100, opacity: 0 });
        tl.set('.mobile-extra-item', { y: 40, opacity: 0 });

        tl.to(bgRef.current, { 
          y: '0%', 
          duration: 1.2, 
          ease: 'expo.inOut' 
        });

        tl.to('.mobile-link-container', { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: 'expo.out' 
        }, "-=0.6");

        tl.to('.mobile-extra-item', { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'expo.out' 
        }, "-=0.8");

      } else {
        // CLOSING ANIMATION
        isAnimating.current = true;
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, { display: 'none' });
            isAnimating.current = false;
          }
        });

        tl.to('.mobile-extra-item', { 
          y: -20, 
          opacity: 0, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: 'power3.in' 
        });

        tl.to('.mobile-link-container', { 
          y: -40, 
          opacity: 0, 
          duration: 0.6, 
          stagger: 0.05, 
          ease: 'power3.in' 
        }, "-=0.4");

        tl.to(bgRef.current, { 
          y: '-100%', 
          duration: 1, 
          ease: 'expo.inOut' 
        }, "-=0.4");
      }
    });
  }, [isOpen]);

  const toggleMenu = () => {
    if (isAnimating.current) return;
    setIsOpen(!isOpen);
  };

  const handleNav = (path: string) => {
    if (isAnimating.current) return;
    setIsOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[70] flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] px-6 md:px-12 pointer-events-none 
          ${isScrolled 
            ? 'py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'py-8 bg-transparent'}`}
      >
        {/* Subtle overlay to ensure mix-blend-difference doesn't make text unreadable against the glass background */}
        <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="flex items-center pointer-events-auto mix-blend-difference">
          <button onClick={() => handleNav('home')} className="text-xl font-black tracking-tighter text-white uppercase">DEVZENITH.</button>
        </div>
        
        <div className="flex items-center gap-8 md:gap-12 pointer-events-auto mix-blend-difference">
          <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.4em] text-white">
            <NavLink onClick={() => handleNav('work')} label="WORK" isActive={currentPath === 'work'} />
            <NavLink onClick={() => handleNav('agency')} label="AGENCY" isActive={currentPath === 'agency'} />
            <NavLink onClick={() => handleNav('contact')} label="CONTACT" isActive={currentPath === 'contact'} />
          </div>

          <button 
            onClick={toggleMenu}
            className={`md:hidden px-5 py-2 border rounded-full text-[10px] font-bold tracking-widest transition-all flex items-center gap-2 
              ${isScrolled 
                ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                : 'border-white text-white hover:bg-white hover:text-black'}`}
          >
            {isOpen ? <X size={14} /> : <MenuIcon size={14} />}
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      <div 
        ref={menuRef} 
        className="fixed inset-0 z-[65] hidden flex-col justify-center px-6 sm:px-12 pointer-events-auto md:hidden overflow-hidden"
      >
        <div ref={bgRef} className="absolute inset-0 bg-[#050505] border-b border-white/10" />
        
        <div className="relative z-10 flex flex-col gap-4">
          {['WORK', 'AGENCY', 'CONTACT'].map((label) => (
            <div key={label} className="overflow-hidden mobile-link-container">
              <NavLink 
                onClick={() => handleNav(label.toLowerCase())} 
                label={label}
                className="text-[11vw] font-black uppercase tracking-tighter leading-none text-white"
                isActive={currentPath === label.toLowerCase()}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex flex-col gap-8">
          <div className="flex flex-col gap-2 mobile-extra-item">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">OFFICE</span>
            <span className="text-sm font-bold text-white/80 tracking-tight uppercase">DUBAI / RIYADH / KARACHI</span>
          </div>
          <div className="flex flex-col gap-2 mobile-extra-item">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">CONNECT</span>
            <div className="flex gap-8">
              {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map(s => (
                <a key={s} href="#" className="text-xs font-bold text-white/60 hover:text-white transition-colors tracking-widest uppercase">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
