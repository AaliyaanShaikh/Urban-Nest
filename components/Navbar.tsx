import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const navVariants = {
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "saturate(180%) blur(24px)",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    normal: {
      backgroundColor: "transparent",
      backdropFilter: "none",
      paddingTop: "2rem",
      paddingBottom: "2rem",
      boxShadow: "none",
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100]"
      variants={navVariants}
      animate={isScrolled ? "scrolled" : "normal"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-[1600px] mx-auto px-8 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1, borderColor: "#111827" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-3 h-3 bg-gray-900 rounded-full"
              whileHover={{ scale: 1.25 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </motion.div>
          <motion.span 
            className="font-semibold tracking-[0.4em] text-lg uppercase text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Urban Nest
          </motion.span>
        </motion.div>
        
        <motion.div 
          className="hidden lg:flex items-center space-x-12 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['portfolio', 'philosophy', 'legacy', 'intelligence'].map((item, index) => (
            <motion.a
              key={item}
              href={item === 'portfolio' ? '#portfolio' : '#'}
              className="relative py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ color: "#111827" }}
            >
              {t(`nav.${item}`)}
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-gray-900"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="flex items-center space-x-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hidden md:block relative" ref={langMenuRef}>
            <motion.button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 flex items-center gap-2"
              whileHover={{ color: "#111827" }}
              whileTap={{ scale: 0.95 }}
            >
              {language.toUpperCase()}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: isLangOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-2xl border border-gray-200 rounded-lg overflow-hidden shadow-2xl min-w-[180px] z-50"
                >
                  {Object.entries(languageNames).map(([code, name], index) => (
                    <motion.button
                      key={code}
                      onClick={() => {
                        setLanguage(code as Language);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        language === code ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{name}</span>
                        {language === code && (
                          <motion.svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button 
            onClick={onConciergeClick}
            className="px-8 py-3 bg-gray-900 text-white text-[10px] font-semibold uppercase tracking-widest rounded-full shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            {t('nav.concierge')}
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
