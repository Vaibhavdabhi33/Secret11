import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  autoStart?: boolean;
  speed?: number;
}

const chars = '!<>-_\\/[]{}—=+*^?#________';

const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  className = "", 
  autoStart = true, 
  speed = 1.5 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    iterationRef.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iterationRef.current) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iterationRef.current += 1 / speed; // Speed control
    }, 30);
  };

  useEffect(() => {
    if (autoStart) {
        // Small delay to sync with page load
        setTimeout(startScramble, 200);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span 
      className={`inline-block whitespace-pre-wrap ${className}`} 
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
};

export default TextScramble;