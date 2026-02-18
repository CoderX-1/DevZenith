import React, { useState, useLayoutEffect, useRef, useEffect, useCallback, Suspense } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Home from './pages/Home';
import Work from './pages/Work';
import Agency from './pages/Agency';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Experience from './components/Experience';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Performance Optimization for Mobile Scroll
    gsap.config({ nullTargetWarn: false });
    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;
    
    const ctx = gsap.context(() => {
      // 1. Watermark Parallax
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
          }
        });
      }

      // 2. Global Text Reveal (Add 'reveal-text' class to any text)
      gsap.utils.toArray('.reveal-text').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          {
            y: 0, opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isLoading, currentPath]); // Re-run on page change

  const handleLoaderComplete = useCallback(() => setIsLoading(false), []);

  const navigate = useCallback((path: string) => {
    if (path === currentPath || isTransitioning) return;
    setIsTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPath(path);
        window.scrollTo(0, 0);
        gsap.to(transitionRef.current, {
          scaleY: 0, transformOrigin: 'top center', duration: 1, ease: 'expo.inOut',
          onComplete: () => {
            setIsTransitioning(false);
            gsap.set(transitionRef.current, { display: 'none' });
            ScrollTrigger.refresh();
          }
        });
      }
    });

    tl.set(transitionRef.current, { display: 'block', scaleY: 0, transformOrigin: 'bottom center' })
      .to(transitionRef.current, { scaleY: 1, duration: 1, ease: 'expo.inOut' });
  }, [currentPath, isTransitioning]);

  const renderPage = () => {
    switch (currentPath) {
      case 'work': return <Work />;
      case 'agency': return <Agency />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="bg-[#050505] text-white selection:bg-[#FFD700] selection:text-black min-h-screen relative overflow-x-hidden">
        {isLoading && <Loader onComplete={handleLoaderComplete} />}

        {/* 3D Canvas */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <Canvas dpr={isMobile ? 1 : [1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}>
            <Suspense fallback={null}>
              <Experience isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>

        {/* Watermark */}
        <div ref={watermarkRef} className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] z-0 select-none">
          <span className="text-[35vw] font-black uppercase tracking-tighter italic whitespace-nowrap">ZENITH</span>
        </div>

        <Navbar onNavigate={navigate} currentPath={currentPath} />
        <div ref={transitionRef} className="fixed inset-0 bg-[#FFD700] z-[100] hidden" />

        <main className={`relative z-10 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {renderPage()}
        </main>
        
        {!isLoading && <ScrollToTop />}
      </div>
    </ReactLenis>
  );
};

export default App;