
import React, { useEffect, useState } from 'react';
import { Property } from '../types';

interface VirtualTourModalProps {
  property: Property | null;
  onClose: () => void;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ property, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (property) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [property]);

  if (!property) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-pointer"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10 group">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{property.title}</h3>
            <p className="text-white/60 text-sm">{property.location} — Experience In 4K</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* The Tour Frame */}
        {property.virtualTourUrl ? (
          <iframe 
            src={property.virtualTourUrl}
            className="w-full h-full border-none"
            allow="autoplay; encrypted-media; fullscreen; vr"
            title={`Virtual Tour: ${property.title}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-center px-6">
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
               </svg>
            </div>
            <h4 className="text-2xl font-semibold mb-2">Immersive Experience Coming Soon</h4>
            <p className="text-white/40 max-w-md">We are currently capturing this residence in high-fidelity 3D. Please check back shortly for the full virtual walkthrough.</p>
          </div>
        )}

        {/* Controls Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           Use gestures to explore the space
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
