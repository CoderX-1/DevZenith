
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = false;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // 1. Counter Logic: Non-linear counting
      const counterObj = { value: 0 };
      
      // Phase 1: Fast to 90
      gsap.to(counterObj, {
        value: 90,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(counterObj.value));
        },
      });

      // Phase 2: Slower to 100
      gsap.to(counterObj, {
        value: 100,
        duration: 0.8,
        delay: 2.2,
        ease: "power4.out",
        onUpdate: () => {
          setCount(Math.floor(counterObj.value));
        },
      });

      // 2. "Dev" to "Zenith" Morph (Fade & Slide)
      tl.fromTo(wordRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .to(wordRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        delay: 1.2,
        onComplete: () => {
          if (wordRef.current) wordRef.current.innerText = "DEVZENITH";
        }
      })
      .to(wordRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out"
      });

      // 3. Exit Sequence (Triggered after counter reaches 100)
      tl.add(() => {
        // Timeline anchor
      }, "+=0.5");

      // Flash effect
      tl.to(flashRef.current, {
        scaleX: 1,
        duration: 0.6,
        ease: "expo.inOut"
      }, "+=0.2")
      .to(flashRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.6,
        ease: "expo.inOut"
      });

      // Screen Reveal (Clip-path)
      tl.to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.4,
        ease: "expo.inOut"
      }, "-=0.4");

      // Hide loader completely
      tl.set(containerRef.current, { display: 'none' });

    }, containerRef);

    return () => ctx.revert();
  }, []); // Empty dependencies to run only once

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      {/* Background Watermark during load */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[40vw] font-black tracking-tighter">DZ</span>
      </div>

      <div className="relative flex flex-col items-end md:gap-4 ">
        <div className="overflow-hidden h-8 md:h-10 lg:h-14 flex items-center justify-center">
          <span ref={wordRef} className="text-[8vw] font-black tracking-[0.4em] uppercase text-white/40">DEVZENITH</span>
        </div>
        
        <div className="flex items-baseline">
          <span className="flex items-end text-[4vw] md:text-[2vw] font-black tracking-tighter leading-none">
            LOADING {count.toString().padStart(3, '0')}
          </span>
          <span className="text-[4vw] md:text-[2vw] font-black ml-2 text-[#FFD700]">%</span>
        </div>
      </div>

      {/* The Flash Line */}
      <div 
        ref={flashRef}
        className="absolute bottom-[20%] left-0 w-full h-[2px] bg-[#FFD700] scale-x-0 origin-left"
      />

      <div className="absolute bottom-12 right-12 flex flex-col gap-2">
        <span className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">SYSTEM INITIALIZING</span>
        <div className="w-32 h-[1px] bg-white/5 relative">
          <div className="absolute top-0 left-0 h-full bg-white/20 transition-all duration-300" style={{ width: `${count}%` }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
