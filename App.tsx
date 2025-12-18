
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollReveal from './components/ScrollReveal';
import PropertyGrid from './components/PropertyGrid';
import AIChat from './components/AIChat';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntrance(false);
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-white selection:text-black overflow-x-hidden">
      {/* Entrance Animation Overlay */}
      {showEntrance && (
        <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center transition-all duration-1000">
           <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse">
                <div className="w-6 h-6 bg-black rounded-full"></div>
              </div>
              <span className="mt-8 text-xs font-bold tracking-[1em] uppercase opacity-40 animate-pulse">Lumina</span>
           </div>
        </div>
      )}

      {isLoaded && (
        <div className="animate-in fade-in duration-[2000ms]">
          <Navbar />
          
          <main>
            <Hero />
            
            <section className="py-60 flex flex-col items-center justify-center text-center px-6">
              <div className="max-w-4xl relative">
                {/* Decorative Elements */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-9xl font-black text-white/[0.02] select-none serif italic uppercase tracking-[0.2em]">Excellence</div>
                
                <h2 className="serif text-4xl md:text-8xl font-light tracking-tighter mb-12 leading-[1.1] italic">
                  Living is an <br />
                  <span className="text-white/30">acquired taste.</span>
                </h2>
                <div className="w-16 h-[2px] bg-white/20 mx-auto mb-12"></div>
                <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light max-w-2xl mx-auto">
                  At Lumina, we believe a home is the most profound expression of one's identity. 
                  We represent the avant-garde of global real estate.
                </p>
              </div>
            </section>

            <ScrollReveal />
            
            <div id="portfolio">
              <PropertyGrid />
            </div>
            
            {/* Signature Section */}
            <section className="py-60 px-6 text-center bg-[#0a0a0a] relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.05),_transparent_70%)]"></div>
              </div>
              
              <div className="relative z-10 max-w-5xl mx-auto">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8 block">Inquire Privately</span>
                <h2 className="serif text-5xl md:text-[100px] font-extralight tracking-tighter mb-16 leading-none italic">
                  The future <br /> is residential.
                </h2>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                  <button className="group relative overflow-hidden px-14 py-6 bg-white text-black rounded-none font-bold transition-all">
                    <span className="relative z-10 uppercase text-xs tracking-widest">Request Presentation</span>
                    <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                  <button className="text-xs font-black uppercase tracking-[0.3em] text-white hover:text-white/60 transition-colors py-4 border-b border-white/20">
                    Contact Advisory
                  </button>
                </div>
              </div>
            </section>
          </main>

          <Footer />
          <AIChat />
        </div>
      )}
    </div>
  );
};

export default App;
