
import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? 'apple-blur py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center group cursor-pointer hover:border-white transition-colors">
            <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-transform"></div>
          </div>
          <span className="font-bold tracking-[0.4em] text-lg uppercase">Lumina</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            Portfolio
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            Philosophy
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            Legacy
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            Intelligence
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hidden md:block text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            EN / FR
          </button>
          <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 rounded-full">
            Concierge
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
