import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ScrollReveal: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Frame expansion logic - using viewport units
  const width = useTransform(scrollYProgress, [0, 1], ["40vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 1], ["40vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [1, 1, 0, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Backdrop with Framer Motion */}
        <motion.div 
          className="relative overflow-hidden shadow-2xl"
          style={{ 
            width: width,
            height: height,
            borderRadius: borderRadius,
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2400" 
            alt="Interior Experience" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          <motion.div 
            className="absolute inset-0 bg-white/30"
            animate={{
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Internal Content */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center"
            style={{ opacity: textOpacity }}
          >
            <motion.h3 
              className="serif text-4xl md:text-7xl font-light italic mb-8 text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-200px" }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('scroll.detail')}
            </motion.h3>
            <motion.p 
              className="text-gray-600 text-sm md:text-lg max-w-xl font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-200px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('scroll.engineering')}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating Narrative Text */}
        <motion.div 
          className="absolute z-20 pointer-events-none text-center"
          style={{ 
            opacity: headlineOpacity,
            y: headlineY,
          }}
        >
          <motion.span 
            className="text-[10px] font-semibold uppercase tracking-[1em] text-gray-400 mb-6 block"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {t('scroll.evolution')}
          </motion.span>
          <motion.h2 
            className="serif text-5xl md:text-9xl font-light tracking-tighter italic text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t('scroll.beyond')}
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollReveal;
