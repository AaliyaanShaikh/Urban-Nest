import React, { useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PROPERTIES } from '../constants';
import { Property } from '../types';
import VirtualTourModal from './VirtualTourModal';

type FilterType = 'all' | 'exclusive' | 'archived';

const PropertyGrid: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Filter properties based on active filter
  const filteredProperties = PROPERTIES.filter(property => {
    if (activeFilter === 'all') return true;
    return property.category === activeFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-40 px-6 max-w-[1600px] mx-auto bg-white relative">
      {/* Background Decorative Text */}
      <motion.div 
        className="absolute left-0 w-full overflow-hidden pointer-events-none -z-10 opacity-[0.03] select-none"
        initial={{ x: "-20%" }}
        animate={{ x: ["-20%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="text-[25vw] font-light serif uppercase whitespace-nowrap text-gray-900">
          Urban Nest Legacy Portfolio
        </div>
      </motion.div>

      <motion.div 
        className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-gray-200 pb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-xl">
          <motion.span 
            className="serif italic text-2xl text-gray-400 mb-4 block font-light"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('property.collections')}
          </motion.span>
          <motion.h2 
            className="serif text-5xl md:text-8xl font-light tracking-tighter mb-8 leading-none text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('property.excellence')}
          </motion.h2>
        </div>
        
        <motion.div 
          className="flex items-center space-x-12 text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-500"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {(['all', 'exclusive', 'archived'] as FilterType[]).map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`transition-colors pb-2 relative ${
                activeFilter === filter 
                  ? 'text-gray-900' 
                  : 'hover:text-gray-900'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(`property.${filter}`)}
              {activeFilter === filter && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gray-900"
                  layoutId="activeFilter"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {filteredProperties.map((property, idx) => {
          const isLarge = idx % 3 === 0 && property.id !== '7';
          return (
            <motion.div 
              key={property.id} 
              className={`group flex flex-col ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className={`relative overflow-hidden bg-gray-100 mb-10 cursor-pointer rounded-2xl shadow-lg ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}
                onClick={() => setSelectedProperty(property)}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.img 
                  src={property.image} 
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=2000';
                  }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  initial={{ opacity: 0.4 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Visual Label */}
                <motion.div 
                  className="absolute bottom-8 right-8 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span 
                    className="inline-block text-[10px] font-semibold uppercase tracking-[0.5em] text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                    initial={{ y: 100 }}
                    whileHover={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {t('property.explore')}
                  </motion.span>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex flex-col md:flex-row justify-between items-start gap-6 px-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div>
                  <motion.h3 
                    className="serif text-4xl font-light tracking-tight mb-3 italic text-gray-900"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {property.title}
                  </motion.h3>
                  <motion.p 
                    className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.4em]"
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {property.location}
                  </motion.p>
                </div>
                <div className="flex flex-col items-end">
                  <motion.p 
                    className="text-2xl font-light tracking-tighter mb-2 text-gray-900"
                    whileHover={{ scale: 1.05 }}
                  >
                    {property.price}
                  </motion.p>
                  <div className="flex space-x-6 text-[9px] font-medium uppercase tracking-[0.3em] text-gray-400">
                    <span>{property.beds} {t('property.bedrooms')}</span>
                    <span>{property.sqft} SQFT</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      <VirtualTourModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </section>
  );
};

export default PropertyGrid;
