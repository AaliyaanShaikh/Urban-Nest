
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PROPERTIES } from '../constants';
import { Property } from '../types';
import VirtualTourModal from './VirtualTourModal';

const PropertyGrid: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-40 px-6 max-w-[1600px] mx-auto">
      {/* Background Decorative Text */}
      <div className="absolute left-0 w-full overflow-hidden pointer-events-none -z-10 opacity-[0.03] select-none">
        <div 
          className="text-[25vw] font-black serif uppercase whitespace-nowrap"
          style={{ transform: `translateX(${-20 + scrollY * 0.05}%)` }}
        >
          Lumina Legacy Portfolio
        </div>
      </div>

      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
        <div className="max-w-xl">
          <span className="serif italic text-2xl text-white/40 mb-4 block">{t('property.collections')}</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">{t('property.excellence')}</h2>
        </div>
        
        <div className="flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
          <button className="text-white border-b border-white pb-2">{t('property.all')}</button>
          <button className="hover:text-white transition-colors pb-2">{t('property.exclusive')}</button>
          <button className="hover:text-white transition-colors pb-2">{t('property.archived')}</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-12">
        {PROPERTIES.map((property, idx) => {
          const isLarge = idx % 3 === 0;
          return (
            <div 
              key={property.id} 
              className={`group flex flex-col ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
            >
              <div 
                className={`parallax-container relative overflow-hidden bg-[#0a0a0a] mb-10 cursor-pointer rounded-sm transition-all duration-700 ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/5]'}`}
                onClick={() => setSelectedProperty(property)}
              >
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="parallax-img absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                  style={{ transform: `translateY(${(scrollY * (idx % 2 === 0 ? 0.05 : -0.05))}px)` }}
                  onError={(e) => {
                    // Fallback to a default image if the URL fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=2000';
                  }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                
                {/* Visual Label */}
                <div className="absolute bottom-8 right-8 overflow-hidden">
                  <span className="inline-block text-[10px] font-black uppercase tracking-[0.5em] text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {t('property.explore')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-6 px-2">
                <div>
                  <h3 className="serif text-4xl font-light tracking-tight mb-3 italic transition-all group-hover:translate-x-2">{property.title}</h3>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{property.location}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-2xl font-extralight tracking-tighter mb-2">{property.price}</p>
                  <div className="flex space-x-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/10">
                    <span>{property.beds} {t('property.bedrooms')}</span>
                    <span>{property.sqft} SQFT</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <VirtualTourModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </section>
  );
};

export default PropertyGrid;
