
import React, { useEffect, useRef } from 'react';

const GalaxyBackground: React.FC = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // OPTIMIZED PARALLAX LOGIC
      // requestAnimationFrame ensures smooth 60fps animation without jitter
      requestId = requestAnimationFrame(() => {
        // LAYER 1: STARS (Furthest)
        // Use background-position-y for infinite scrolling without clipping
        if (starsRef.current) {
          starsRef.current.style.backgroundPositionY = `${scrollY * 0.1}px`;
        }
        
        // LAYER 2: NEBULA ORBS (Mid-Depth)
        // Move slightly faster than stars but slower than foreground content
        // Using translate3d enables GPU acceleration
        if (orbsRef.current) {
          orbsRef.current.style.transform = `translate3d(0, ${scrollY * -0.15}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="galaxy-background">
      <div ref={starsRef} className="star-field"></div>
      
      <div ref={orbsRef} className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out will-change-transform">
        <div className="nebula-orb orb-1"></div>
        <div className="nebula-orb orb-2"></div>
        <div className="nebula-orb orb-3"></div>
        <div className="nebula-orb orb-4"></div>
        <div className="nebula-orb orb-5"></div>
        <div className="nebula-orb orb-6"></div>
        <div className="nebula-orb orb-7"></div>
      </div>
    </div>
  );
};

export default GalaxyBackground;
