
import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxY = scrollY * 0.5;
  const contentOpacity = Math.max(0, 1 - scrollY / 800);
  const titleScale = 1 + scrollY / 5000;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Image Container */}
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-[2.5s] ease-out ${isReady ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translateY(${parallaxY}px) scale(${1 + scrollY / 10000})` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1600607687940-477a284e68c6?auto=format&fit=crop&q=80&w=2400" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[#050505]"></div>
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-10 text-center px-6 max-w-6xl"
        style={{ opacity: contentOpacity, transform: `scale(${titleScale})` }}
      >
        <div className="line-mask mb-6">
          <span className={`line-mask-inner block text-[10px] tracking-[0.8em] uppercase text-white/40 font-bold ${isReady ? 'active' : ''}`}>
            Exclusively Lumina
          </span>
        </div>
        
        <h1 className="serif text-7xl md:text-[130px] font-extralight tracking-tight mb-10 leading-[0.85] italic transition-transform duration-1000 ease-out hover:scale-[1.02] cursor-default">
          <div className="line-mask">
            <span className={`line-mask-inner transition-all duration-1000 delay-300 ${isReady ? 'active' : ''}`}>
              The Art of
            </span>
          </div>
          <div className="line-mask mt-2">
            <span className={`line-mask-inner bg-gradient-to-r from-white via-[#f0f0f0] to-white/10 bg-clip-text text-transparent transition-all duration-1000 delay-500 ${isReady ? 'active' : ''}`}>
              Quiet Luxury.
            </span>
          </div>
        </h1>

        <div className={`flex flex-col items-center transition-all duration-[1.5s] delay-700 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            A curated collection of residences where architectural soul meets precision engineering.
          </p>
          <div className="flex items-center space-x-12">
            <button className="group relative text-[10px] font-black uppercase tracking-[0.4em] pb-2 border-b border-white/10 hover:border-white transition-all">
              Discover Estates
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></div>
            </button>
            <button className="group relative text-[10px] font-black uppercase tracking-[0.4em] pb-2 border-b border-white/10 hover:border-white transition-all">
              Private Viewings
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20">
        <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
