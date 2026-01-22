
import React, { useState, useRef, useLayoutEffect } from 'react';
import { X, Menu as MenuIcon } from 'lucide-react';
import gsap from 'gsap';

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
  const menuRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(menuRef.current, { display: 'flex' });
        gsap.fromTo(bgRef.current, 
          { y: '-100%' }, 
          { y: '0%', duration: 1, ease: 'power4.inOut' }
        );
        gsap.fromTo('.mobile-link-container', 
          { y: 150, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.4 }
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            if (!isOpen) gsap.set(menuRef.current, { display: 'none' });
          }
        });
        tl.to('.mobile-link-container', { y: -50, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.in' })
          .to(bgRef.current, { y: '-100%', duration: 0.8, ease: 'power4.inOut' }, "-=0.2");
      }
    });
    return () => ctx.revert();
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (path: string) => {
    setIsOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[70] flex justify-between items-center px-6 py-8 md:px-12 mix-blend-difference pointer-events-none">
        <div className="flex items-center pointer-events-auto">
          <button onClick={() => handleNav('home')} className="text-xl font-black tracking-tighter text-white uppercase">DEVZENITH.</button>
        </div>
        
        <div className="flex items-center gap-8 md:gap-12 pointer-events-auto">
          <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.4em] text-white">
            <NavLink onClick={() => handleNav('work')} label="WORK" isActive={currentPath === 'work'} />
            <NavLink onClick={() => handleNav('agency')} label="AGENCY" isActive={currentPath === 'agency'} />
            <NavLink onClick={() => handleNav('contact')} label="CONTACT" isActive={currentPath === 'contact'} />
          </div>

          <button 
            onClick={toggleMenu}
            className="md:hidden px-5 py-2 border border-white rounded-full text-[10px] font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all flex items-center gap-2"
          >
            {isOpen ? <X size={14} /> : <MenuIcon size={14} />}
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      <div 
        ref={menuRef} 
        className="fixed inset-0 z-[65] hidden flex-col justify-center px-6 sm:px-12 pointer-events-auto md:hidden"
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

        <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">OFFICE</span>
            <span className="text-sm font-medium text-white/70">DUBAI / KARACHI</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">CONNECT</span>
            <div className="flex gap-6">
              {['IG', 'LI', 'BE'].map(s => (
                <a key={s} href="#" className="text-sm font-bold text-white/70 hover:text-white transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;