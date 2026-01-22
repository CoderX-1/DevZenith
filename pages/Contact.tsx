
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import Footer from '../components/Footer';

interface ContactLinkProps {
  href: string;
  label: string;
  className?: string;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, label, className }) => {
  return (
    <a 
      href={href} 
      className={`group relative overflow-hidden block ${className}`}
    >
      <div className="relative flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {/* Primary State */}
        <span className="block">{label}</span>
        {/* Hover State - Slides up from below */}
        <span className="absolute top-full left-0 block italic text-white/40">
          {label}
        </span>
      </div>
    </a>
  );
};

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-40">
      <section className="px-6 md:px-12 mb-40">
        <div className="overflow-hidden">
          <h1 className="contact-reveal text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none">
            READY TO
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="contact-reveal text-[14vw] md:text-[10vw] font-black uppercase tracking-tighter leading-none text-white/20">
            DISRUPT?
          </h1>
        </div>
      </section>

      <section className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
        <div className="contact-reveal">
          <p className="text-sm md:text-lg text-white/60 leading-relaxed max-w-md">
            WHETHER YOU'RE A GLOBAL LEADER OR A FAST-GROWING STARTUP, WE'RE READY TO ENGINEER YOUR NEXT SUCCESS STORY.
          </p>
          
          <div className="mt-16 flex flex-col gap-10">
             <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">NEW BUSINESS</span>
                <ContactLink 
                  href="mailto:hello@devzenith.agency" 
                  label="hello@devzenith.agency" 
                  className="text-2xl md:text-4xl font-black uppercase tracking-tighter"
                />
             </div>
             <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">JOIN THE TEAM</span>
                <ContactLink 
                  href="mailto:careers@devzenith.agency" 
                  label="careers@devzenith.agency" 
                  className="text-2xl md:text-4xl font-black uppercase tracking-tighter"
                />
             </div>
          </div>
        </div>

        <div className="contact-reveal border border-white/10 p-8 md:p-12 bg-white/[0.02]">
           <h3 className="text-xs font-bold tracking-[0.4em] text-white/30 uppercase mb-12">SEND A BRIEF</h3>
           <form className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">NAME</label>
                 <input type="text" className="bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-colors text-xl font-bold uppercase tracking-tighter" />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">EMAIL</label>
                 <input type="email" className="bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-colors text-xl font-bold uppercase tracking-tighter" />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">MESSAGE</label>
                 <textarea rows={4} className="bg-transparent border-b border-white/10 py-4 focus:border-white outline-none transition-colors text-xl font-bold uppercase tracking-tighter resize-none" />
              </div>
              <button className="group mt-8 flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
                 SUBMIT INQUIRY <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
           </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;