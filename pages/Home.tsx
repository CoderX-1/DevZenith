
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ROIRoadmap from '../components/ROIRoadmap';
import LeadMagnet from '../components/LeadMagnet';
import WhatWeDo from '../components/WhatWeDo';
import SelectedWork from '../components/SelectedWork';
import Testimonials from '../components/Testimonials';
import PartnerClub from '../components/PartnerClub';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
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
            duration: 1.5, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
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
      <Services />
      <ROIRoadmap />
      <WhatWeDo />
      <LeadMagnet />
      <SelectedWork />
      <Testimonials />
      <PartnerClub />
      <Footer />
    </div>
  );
};

export default Home;
