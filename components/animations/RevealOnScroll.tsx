import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Delay in seconds
  variant?: "blur" | "fade" | "slide";
  className?: string;
}

const RevealOnScroll: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0, 
  variant = "blur",
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only animate once
      }
    }, {
      threshold: 0.15, // Trigger when 15% of element is visible
      rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before reaching absolute bottom
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  const getTransformStyle = () => {
    // Base hidden state styles
    if (!isVisible) {
      switch (variant) {
        case 'blur': return 'opacity-0 translate-y-8 blur-sm scale-95';
        case 'slide': return 'opacity-0 -translate-x-10';
        case 'fade': return 'opacity-0';
        default: return 'opacity-0 translate-y-4';
      }
    }
    // Visible state is handled by removing the classes above via transition
    return 'opacity-100 translate-y-0 blur-0 scale-100 translate-x-0';
  };

  return (
    <div 
      ref={ref} 
      style={{ width, transitionDelay: `${delay}s` }} 
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-[opacity,transform,filter] ${getTransformStyle()} ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;