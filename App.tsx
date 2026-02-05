
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

  // Performance Optimization: Reactive mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!watermarkRef.current) return;
    
    const ctx = gsap.context(() => {
      // Background Watermark Parallax
      gsap.to(watermarkRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    }, watermarkRef);
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

  const navigate = useCallback((path: string) => {
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
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
      <div className="bg-[#050505] text-white selection:bg-[#FFD700] selection:text-black min-h-screen relative">
        <Loader onComplete={handleLoaderComplete} />

        {/* 3D Background Layer Optimized */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas 
            dpr={isMobile ? 1 : [1, 2]} 
            gl={{ 
              antialias: !isMobile, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            camera={{ fov: 45, position: [0, 0, 8] }}
          >
            <Suspense fallback={null}>
              <Experience isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>

        {/* Background Watermark */}
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
