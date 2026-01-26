import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollReveal from './components/ScrollReveal';
import PropertyGrid from './components/PropertyGrid';
import PersonalBranding from './components/PersonalBranding';
import InstagramShowcase from './components/InstagramShowcase';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import ConciergeForm from './components/ConciergeForm';

const AppContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntrance(false);
      setIsLoaded(true);
      setTimeout(() => {
        setIsFormOpen(true);
      }, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const entranceVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-white selection:bg-gray-900 selection:text-white overflow-x-hidden">
      {/* Entrance Animation Overlay with Framer Motion */}
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-white flex items-center justify-center"
            variants={entranceVariants}
            initial="initial"
            exit="exit"
          >
            <motion.div 
              className="flex flex-col items-center"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center"
                variants={logoVariants}
                animate="animate"
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.span
                className="mt-8 text-xs font-semibold tracking-[1em] uppercase text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Urban Nest
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Navbar onConciergeClick={() => setIsFormOpen(true)} />
            
            <main>
              <Hero />
              
              <motion.section 
                className="py-60 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-white via-gray-50 to-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="max-w-4xl relative">
                  <motion.div 
                    className="absolute -top-20 left-1/2 -translate-x-1/2 text-9xl font-light text-gray-100 select-none serif italic uppercase tracking-[0.2em]"
                    animate={{
                      opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {t('app.excellence')}
                  </motion.div>
                  
                  <motion.h2 
                    className="serif text-4xl md:text-8xl font-light tracking-tighter mb-12 leading-[1.1] italic text-gray-900"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {t('app.living')} <br />
                    <motion.span 
                      className="text-gray-400"
                      animate={{
                        opacity: [0.4, 0.6, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {t('app.acquired')}
                    </motion.span>
                  </motion.h2>
                  <motion.div 
                    className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-12"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {t('app.belief')}
                  </motion.p>
                </div>
              </motion.section>

              <ScrollReveal />
              
              <div id="portfolio">
                <PropertyGrid />
              </div>

              <PersonalBranding />

              <InstagramShowcase />
              
              <motion.section 
                className="py-60 px-6 text-center bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.02),_transparent_70%)]"></div>
                </motion.div>
                
                <motion.div 
                  className="relative z-10 max-w-5xl mx-auto"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.span 
                    className="text-[10px] font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {t('app.inquire')}
                  </motion.span>
                  <motion.h2 
                    className="serif text-5xl md:text-[100px] font-light tracking-tighter mb-16 leading-none italic text-gray-900"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {t('app.future')} <br /> {t('app.residential')}
                  </motion.h2>
                  
                  <motion.div 
                    className="flex flex-col md:flex-row items-center justify-center gap-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.button 
                      onClick={() => setIsFormOpen(true)}
                      className="group relative overflow-hidden px-14 py-6 bg-gray-900 text-white rounded-full font-semibold shadow-xl"
                      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span 
                        className="relative z-10 uppercase text-xs tracking-widest"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {t('app.request')}
                      </motion.span>
                      <motion.div 
                        className="absolute inset-0 bg-gray-700"
                        initial={{ y: "100%" }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                    <motion.button 
                      onClick={() => setIsFormOpen(true)}
                      className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-600 py-4 border-b border-gray-300"
                      whileHover={{ color: "#111827", borderColor: "#111827" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('app.contact')}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.section>
            </main>

            <Footer />
            <AIChat />
            <ConciergeForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
