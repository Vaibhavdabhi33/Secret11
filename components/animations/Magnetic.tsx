import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // How strong the pull is (higher = moves further)
}

const Magnetic: React.FC<MagneticProps> = ({ children, strength = 30 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x: x * 0.3, y: y * 0.3 }); // 0.3 is the friction factor
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)' // Spring physics feel
      }}
      className="inline-block"
    >
      {React.cloneElement(children, {
        // Clone children to ensure events bubble properly if needed
      })}
    </div>
  );
};

export default Magnetic;