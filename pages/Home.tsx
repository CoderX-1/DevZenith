
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Hero from '../components/Hero';
import WhatWeDo from '../components/WhatWeDo';
import SelectedWork from '../components/SelectedWork';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <Hero />
      <WhatWeDo />
      <SelectedWork />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
