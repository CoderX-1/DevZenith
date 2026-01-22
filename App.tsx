
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Work from './pages/Work';
import Agency from './pages/Agency';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);

  const navigate = (path: string) => {
    if (path === currentPath || isTransitioning) return;

    setIsTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPath(path);
        window.scrollTo(0, 0);
        // Fade out transition curtain
        gsap.to(transitionRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsTransitioning(false);
            gsap.set(transitionRef.current, { y: '100%' });
          }
        });
      }
    });

    // Fade in transition curtain
    tl.set(transitionRef.current, { y: '100%', display: 'block' })
      .to(transitionRef.current, {
        y: '0%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
  };

  const renderPage = () => {
    switch (currentPath) {
      case 'work': return <Work />;
      case 'agency': return <Agency />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <div className="bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen">
        <Navbar onNavigate={navigate} currentPath={currentPath} />
        
        {/* Page Transition Curtain */}
        <div 
          ref={transitionRef} 
          className="fixed inset-0 bg-white z-[100] hidden translate-y-full"
        />

        <main>
          {renderPage()}
        </main>
        
        <ScrollToTop />
      </div>
    </ReactLenis>
  );
};

export default App;
