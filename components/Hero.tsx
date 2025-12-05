
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import TextScramble from './animations/TextScramble';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative pt-24 pb-20 overflow-hidden min-h-[85vh] flex items-center bg-transparent">
      {/* Dynamic Multi-Color Spotlight */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `
            radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%),
            radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.1), transparent 50%)
          `
        }}
      />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-15 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-[10px] md:text-xs font-bold tracking-[0.2em] mb-10 uppercase hover:bg-white/10 transition cursor-default backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)] group animate-fade-in-up hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          CONSCIOUS SKINCARE FOR THE MODERN INDIAN
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-white animate-fade-in-up delay-100 drop-shadow-2xl">
          <TextScramble text="AI-powered" speed={1} /> ingredient-first <br className="hidden lg:block" />
          routines tailored for <br className="hidden lg:block" />
          <span className="relative inline-block mt-2">
            {/* Holographic Glow behind text */}
            <span className="absolute -inset-4 blur-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-40 animate-pulse"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 animate-gradient-x drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">Indian skin.</span>
          </span>
        </h1>
        
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-blue-100/80 mb-12 leading-relaxed font-light tracking-wide animate-fade-in-up delay-200 drop-shadow-md">
          Personalized by AI. Powered by ingredients. Proven by science. <br className="hidden md:block"/> Grounded in sustainability. Reinforced by trust.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center animate-fade-in-up delay-300">
          <Link to="/scan" className="group relative px-10 py-4 bg-transparent text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.6)]">
            {/* Button Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-100 group-hover:opacity-100 transition-opacity animate-gradient-x"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <span className="relative z-10 flex items-center gap-2 tracking-[0.15em] text-xs uppercase">
              <Sparkles className="h-4 w-4 text-yellow-300" /> Get Your Free AI Skin Scan
            </span>
          </Link>
          
          <Link to="/shop" className="group px-10 py-4 bg-white/5 backdrop-blur-sm text-gray-200 border border-white/10 font-bold text-xs tracking-[0.15em] uppercase rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition flex items-center justify-center gap-2 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <span>Explore The Collection</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform text-fuchsia-400" />
          </Link>
        </div>
      </div>
      
      {/* Decorative Rainbow Line */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 via-purple-500 via-pink-500 to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;
