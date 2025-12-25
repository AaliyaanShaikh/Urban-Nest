
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage, languageNames, Language } from '../contexts/LanguageContext';

interface NavbarProps {
  onConciergeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onConciergeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? 'apple-blur py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center group cursor-pointer hover:border-white transition-colors">
            <div className="w-3 h-3 bg-white rounded-full group-hover:scale-125 transition-transform"></div>
          </div>
          <span className="font-bold tracking-[0.4em] text-lg uppercase">Urban Nest</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            {t('nav.portfolio')}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            {t('nav.philosophy')}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            {t('nav.legacy')}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors py-1 relative group">
            {t('nav.intelligence')}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:block relative" ref={langMenuRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
              {language.toUpperCase()}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-lg overflow-hidden shadow-2xl min-w-[180px] z-50">
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code as Language);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors ${
                      language === code ? 'bg-white/10 text-white' : 'text-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{name}</span>
                      {language === code && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
          </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={onConciergeClick}
            className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 rounded-full"
          >
            {t('nav.concierge')}
          </button>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
