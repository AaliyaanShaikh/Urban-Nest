import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const PersonalBranding: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const stats = [
    { number: '500+', label: 'Properties Sold' },
    { number: '₹2,500Cr+', label: 'Total Value' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Client Satisfaction' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-gray-100 to-transparent rounded-full blur-3xl opacity-40"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        <motion.div 
          className="absolute top-20 right-20 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span 
            className="text-xs font-semibold uppercase tracking-[0.5em] text-gray-400 mb-6 block"
            variants={itemVariants}
          >
            Personal Brand
          </motion.span>
          <motion.h2 
            className="serif text-6xl md:text-8xl font-light tracking-tight mb-8 text-gray-900 italic"
            variants={itemVariants}
          >
            The Vision Behind
            <br />
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
              Urban Nest
            </motion.span>
          </motion.h2>
          <motion.div 
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-16 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left: Image with Animation */}
          <motion.div 
            className="relative group"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-2xl"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"
                alt="Real Estate Professional"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 0 }}
              />
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                <motion.div 
                  className="text-2xl font-semibold text-gray-900"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  15+
                </motion.div>
                <div className="text-xs font-medium uppercase tracking-widest text-gray-500">Years</div>
              </motion.div>
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-200 rounded-full blur-2xl opacity-50 -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -top-6 -right-6 w-40 h-40 bg-gray-200 rounded-full blur-2xl opacity-30 -z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            className="flex flex-col justify-center space-y-8"
            variants={itemVariants}
          >
            <div>
              <motion.h3 
                className="serif text-4xl md:text-5xl font-light text-gray-900 mb-6 italic"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                Crafting Dreams,
                <br />
                Building Legacies
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                With over 15 years of expertise in luxury real estate, I've dedicated my career to transforming 
                property transactions into life-changing experiences. Every client relationship is built on trust, 
                transparency, and an unwavering commitment to excellence.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                Urban Nest represents more than a brand—it's a philosophy. We don't just sell properties; 
                we curate lifestyles, connect communities, and create spaces where memories are made and 
                futures are built.
              </motion.p>
            </div>

            {/* Values */}
            <motion.div 
              className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { emoji: '🏆', title: 'Excellence', desc: 'Uncompromising quality in every transaction' },
                { emoji: '🤝', title: 'Integrity', desc: 'Honest, transparent, and client-focused' },
                { emoji: '✨', title: 'Innovation', desc: 'Cutting-edge technology and methods' },
                { emoji: '❤️', title: 'Passion', desc: 'Genuine love for real estate' },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="text-3xl mb-2"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {value.emoji}
                  </motion.div>
                  <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#d1d5db",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-5xl md:text-6xl font-light text-gray-900 mb-3"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs font-medium uppercase tracking-widest text-gray-500">
                  {stat.label}
                </div>
              </div>
              
              {/* Animated Border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                whileHover={{ borderColor: "#d1d5db" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalBranding;
