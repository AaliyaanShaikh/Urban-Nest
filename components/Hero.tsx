import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // Convert scroll progress to smooth transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const gradientVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Animated Background Image Container */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: backgroundY,
          scale: backgroundScale,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <motion.img 
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2400" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover brightness-[0.85]"
          initial={{ scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute inset-0 bg-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </motion.div>

      {/* Hero Content with Framer Motion */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl"
        style={{ 
          opacity: contentOpacity,
          scale: titleScale,
          y: titleY,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-6"
          variants={itemVariants}
        >
          <motion.span 
            className="block text-[10px] tracking-[0.8em] uppercase text-gray-500 font-medium"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('hero.exclusively')}
          </motion.span>
        </motion.div>
        
        <motion.h1 
          className="serif text-7xl md:text-[130px] font-light tracking-tight mb-10 leading-[0.85] italic cursor-default text-gray-900"
          variants={titleVariants}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t('hero.title1')}
          </motion.div>
          <motion.div 
            className="mt-2"
            variants={gradientVariants}
          >
            <motion.span 
              className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {t('hero.title2')}
            </motion.span>
          </motion.div>
        </motion.h1>

        <motion.div 
          className="flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>
          <motion.div 
            className="flex items-center space-x-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button 
              className="group relative text-[10px] font-semibold uppercase tracking-[0.4em] pb-2 border-b border-gray-300 text-gray-700"
              whileHover={{ scale: 1.05, color: "#111827" }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.discover')}
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-gray-900"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button 
              className="group relative text-[10px] font-semibold uppercase tracking-[0.4em] pb-2 border-b border-gray-300 text-gray-700"
              whileHover={{ scale: 1.05, color: "#111827" }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.viewings')}
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-gray-900"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          className="w-[1px] h-24 bg-gradient-to-b from-gray-900 to-transparent"
          animate={{
            scaleY: [1, 0.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
