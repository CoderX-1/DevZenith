import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const lenis = useLenis((lenisInstance) => {
    const scrollPos = lenisInstance.scroll;
    if (scrollPos > 400) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
    }
  });

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.set(buttonRef.current, { display: 'flex' });
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out'
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          if (buttonRef.current) {
             buttonRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [isVisible]);

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, {
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleScrollToTop}
      style={{ display: 'none', opacity: 0, transform: 'translateY(30px) scale(0.8)' }}
      className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-white text-black rounded-full items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] group hover:bg-black hover:text-white border border-white"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default ScrollToTop;