
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(watermarkRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath || isTransitioning) return;

    setIsTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPath(path);
        window.scrollTo(0, 0);
        
        gsap.to(transitionRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.2,
          ease: 'expo.inOut',
          onComplete: () => {
            setIsTransitioning(false);
            gsap.set(transitionRef.current, { display: 'none' });
          }
        });
      }
    });

    tl.set(transitionRef.current, { display: 'block', scaleY: 0, transformOrigin: 'bottom center' })
      .to(transitionRef.current, {
        scaleY: 1,
        duration: 1.2,
        ease: 'expo.inOut'
      });
  };

  const renderPage = () => {
    switch (currentPath) {
      case 'work': return <Work />;
      case 'agency': return <Agency />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <div className="bg-[#050505] text-white selection:bg-[#FFD700] selection:text-black min-h-screen relative">
        <Loader onComplete={handleLoaderComplete} />

        {/* 3D Background Layer */}
        <div className="fixed inset-0 z-0">
          <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </Canvas>
        </div>

        {/* Background Watermark (Kept subtle behind content) */}
        <div ref={watermarkRef} className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.01] z-0 overflow-hidden select-none">
          <span className="text-[35vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap italic">ZENITH</span>
        </div>

        <Navbar onNavigate={navigate} currentPath={currentPath} />
        
        <div 
          ref={transitionRef} 
          className="fixed inset-0 bg-[#FFD700] z-[100] hidden shadow-[0_0_100px_rgba(255,215,0,0.2)]"
        />

        <main className={`relative z-10 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {renderPage()}
        </main>
        
        {!isLoading && <ScrollToTop />}
      </div>
    </ReactLenis>
  );
};

export default App;
