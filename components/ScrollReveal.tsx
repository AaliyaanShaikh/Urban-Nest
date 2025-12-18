
import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      
      // Calculate how much of the container has passed through the viewport
      const currentProgress = Math.max(0, Math.min(1, -rect.top / (containerHeight - windowHeight)));
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Frame expansion logic: Start as a small box, grow to full screen
  const width = 40 + (progress * 60); // Starts at 40vw, grows to 100vw
  const height = 40 + (progress * 60); // Starts at 40vh, grows to 100vh
  const borderRadius = 80 - (progress * 80); // Smoothly squares off
  const textOpacity = progress < 0.3 ? (progress * 3) : (1 - (progress - 0.7) * 3);
  const headlineY = 20 - (progress * 40);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Backdrop */}
        <div 
          className="relative overflow-hidden transition-all duration-75 ease-out shadow-[0_0_100px_rgba(255,255,255,0.02)]"
          style={{ 
            width: `${width}vw`, 
            height: `${height}vh`,
            borderRadius: `${borderRadius}px`
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=2400" 
            alt="Interior Experience" 
            className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
            style={{ transform: `scale(${1.2 - progress * 0.1})` }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Internal Content */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center"
            style={{ opacity: Math.max(0, progress * 1.5 - 0.5) }}
          >
             <h3 className="serif text-4xl md:text-7xl font-extralight italic mb-8">Uncompromising Detail.</h3>
             <p className="text-white/40 text-sm md:text-lg max-w-xl font-light tracking-wide">
               Our engineering team spends over 4,000 hours on every project ensuring that every joint, material, and light fixture is a masterpiece of intent.
             </p>
          </div>
        </div>

        {/* Floating Narrative Text */}
        <div 
          className="absolute z-20 pointer-events-none text-center"
          style={{ 
            opacity: textOpacity,
            transform: `translateY(${headlineY}px)`
          }}
        >
          <span className="text-[10px] font-black uppercase tracking-[1em] text-white/30 mb-6 block">Evolution</span>
          <h2 className="serif text-5xl md:text-9xl font-light tracking-tighter italic">Beyond Walls.</h2>
        </div>
      </div>
    </div>
  );
};

export default ScrollReveal;
