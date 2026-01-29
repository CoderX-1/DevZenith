
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { REVIEWS } from '../constants';

const TestimonialCard: React.FC<{ review: typeof REVIEWS[0] }> = ({ review }) => {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[500px] h-[350px] md:h-[400px] bg-white/[0.03] border border-white/10 p-8 md:p-12 flex flex-col justify-between group transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 mx-4 md:mx-6">
      <div className="text-white/20 mb-4">
        <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
          <path d="M0 30V13.8462L6.15385 0H15.3846L10.7692 13.8462H15.3846V30H0ZM24.6154 30V13.8462L30.7692 0H40L35.3846 13.8462H40V30H24.6154Z" />
        </svg>
      </div>
      <p className="text-xl md:text-2xl font-bold uppercase tracking-tighter leading-tight whitespace-normal">
        "{review.text}"
      </p>
      <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
        <span className="text-lg font-black tracking-tight">{review.author}</span>
        <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">{review.role}</span>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the heading
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // 2. Infinite Marquee Logic
      // direction: -1 = Left, 1 = Right
      const setupMarquee = (row: HTMLDivElement | null, speed: number, direction: number = -1) => {
        if (!row) return;
        
        const rowWidth = row.offsetWidth;
        
        // Reset position based on direction
        if (direction === 1) {
          gsap.set(row, { x: -rowWidth / 2 });
        }

        const animation = gsap.to(row, {
          x: direction === -1 ? -(rowWidth / 2) : 0,
          duration: speed,
          ease: 'none',
          repeat: -1,
        });

        return animation;
      };

      // Speed is in seconds for one full loop
      const anim1 = setupMarquee(row1Ref.current, 40, -1); // Row 1: Left
      const anim2 = setupMarquee(row2Ref.current, 45, 1);  // Row 2: Right (Inverse)

      // Hover interaction to slow down
      const handleMouseEnter = (anim: gsap.core.Tween | undefined) => {
        if (anim) gsap.to(anim, { timeScale: 0.1, duration: 1, ease: 'power2.out' });
      };
      const handleMouseLeave = (anim: gsap.core.Tween | undefined) => {
        if (anim) gsap.to(anim, { timeScale: 1, duration: 1, ease: 'power2.inOut' });
      };

      row1Ref.current?.parentElement?.addEventListener('mouseenter', () => handleMouseEnter(anim1));
      row1Ref.current?.parentElement?.addEventListener('mouseleave', () => handleMouseLeave(anim1));
      
      row2Ref.current?.parentElement?.addEventListener('mouseenter', () => handleMouseEnter(anim2));
      row2Ref.current?.parentElement?.addEventListener('mouseleave', () => handleMouseLeave(anim2));

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Triple the reviews to ensure enough content to fill the loop width
  const expandedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 md:py-48 overflow-hidden bg-[#050505] border-t border-white/10"
    >
      {/* Top Center Heading */}
      <div className="text-center mb-24 md:mb-32 relative z-10">
        <h2 
          ref={headingRef}
          className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none"
        >
          KIND <span className="text-white/20 italic">WORDS</span>
        </h2>
        <div className="mt-4 flex justify-center items-center gap-4">
          <span className="h-px w-12 bg-white/20" />
          <span className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">TESTIMONIALS</span>
          <span className="h-px w-12 bg-white/20" />
        </div>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {/* Row 1: Infinite Left */}
        <div className="flex whitespace-nowrap overflow-visible cursor-grab active:cursor-grabbing">
          <div ref={row1Ref} className="flex will-change-transform">
            {expandedReviews.map((review, idx) => (
              <TestimonialCard key={`r1-${idx}`} review={review} />
            ))}
          </div>
        </div>

        {/* Row 2: Infinite Right (Inverse) */}
        <div className="flex whitespace-nowrap overflow-visible cursor-grab active:cursor-grabbing">
          <div ref={row2Ref} className="flex will-change-transform">
            {expandedReviews.map((review, idx) => (
              <TestimonialCard key={`r2-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Large Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] select-none z-0">
        <span className="text-[35vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter">
          CLIENTS
        </span>
      </div>
    </section>
  );
};

export default Testimonials;
