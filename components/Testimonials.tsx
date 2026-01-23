"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVIEWS } from "../constants";

const Testimonials: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;

      if (!section || !trigger) return;

      const getScrollWidth = () =>
        section.scrollWidth - window.innerWidth;

      gsap.to(section, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, triggerRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={triggerRef}
      className="bg-[#050505] border-t border-white/10"
    >
      {/* overflow-hidden MUST be inside, not on pinned element */}
      <div className="overflow-hidden">
        <div
          ref={sectionRef}
          className="flex items-center h-screen px-6 md:px-12 gap-10 md:gap-20 whitespace-nowrap"
        >
          {/* LEFT TITLE */}
          <div className="flex-shrink-0">
            <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none opacity-20">
              KIND
              <br />
              WORDS
            </h2>
          </div>

          {/* REVIEWS */}
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-[85vw] md:w-[600px] h-[50vh] md:h-[60vh] bg-white/[0.03] border border-white/10 p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 hover:bg-white/[0.06]"
            >
              <p className="text-xl md:text-3xl font-bold uppercase tracking-tighter leading-tight whitespace-normal">
                “{review.text}”
              </p>

              <div className="flex flex-col gap-1">
                <span className="text-lg font-black tracking-tight">
                  {review.author}
                </span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">
                  {review.role}
                </span>
              </div>
            </div>
          ))}

          {/* RIGHT TITLE */}
          <div className="flex-shrink-0 pr-40 md:pr-80">
            <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none text-white/10 italic">
              YOUR NEXT
              <br />
              SUCCESS
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
