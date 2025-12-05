
import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

/**
 * 1. ORBITAL CURSOR
 * A physics-based glowing ring that follows the mouse and reacts to hover states.
 */
export const OrbitalCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        // Main dot moves instantly
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        
        // Follower moves with CSS transition delay defined in styles
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if target is interactive
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      {/* The Follower Ring */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out -ml-4 -mt-4 mix-blend-screen flex items-center justify-center ${hovered ? 'scale-150 bg-cyan-500/10 border-cyan-300' : 'scale-100 opacity-50'}`}
      >
          <div className={`w-1 h-1 bg-cyan-400 rounded-full ${hovered ? 'opacity-0' : 'opacity-100'}`}></div>
      </div>
      
      {/* The Pinpoint Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] -ml-[3px] -mt-[3px] mix-blend-difference"
      ></div>
    </>
  );
};

/**
 * 2. SCROLL PROGRESS COMMAND
 * A tactical circular progress bar that sits in the bottom left.
 */
export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      setVisible(totalScroll > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const strokeDashoffset = 100 - (scrollProgress * 100);

  return (
    <div 
        className={`fixed bottom-8 left-8 z-40 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
        <button 
            onClick={scrollToTop}
            className="group relative w-12 h-12 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-white/10 transition-colors"
        >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                    className="text-gray-800"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    className="text-cyan-500 transition-all duration-100 ease-out group-hover:text-purple-500"
                    strokeDasharray="100, 100"
                    strokeDashoffset={strokeDashoffset}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
            <ArrowUp className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
        </button>
    </div>
  );
};

/**
 * 3. DYNAMIC TITLE
 * Changes tab title when user navigates away.
 */
export const DynamicTitle: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "✨ Don't forget your glow...";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return null;
};

/**
 * 4. ROUTE TRANSITION SCROLL RESET
 * Scrolls to top on route change.
 */
export const ScrollToTopOnMount: React.FC = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

const UIEnhancements: React.FC = () => {
  return (
    <>
      <OrbitalCursor />
      <ScrollProgress />
      <DynamicTitle />
      <ScrollToTopOnMount />
    </>
  );
};

export default UIEnhancements;
