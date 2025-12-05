import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number; // in ms
  suffix?: string;
  prefix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
        }
      },
      { threshold: 0.1 } // Start when 10% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  const startAnimation = () => {
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: Ease Out Quart (starts fast, slows down at the end)
      // 1 - (1 - x)^4
      const easeProgress = 1 - Math.pow(1 - progress, 4); 
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default CountUp;