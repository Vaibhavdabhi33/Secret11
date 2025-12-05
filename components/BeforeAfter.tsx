
import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ 
  beforeImage, 
  afterImage,
  beforeLabel = "Week 1",
  afterLabel = "Week 8"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove as any);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMove as any);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove as any);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Before Image (Background) */}
      <img 
        src={beforeImage} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
        {beforeLabel}
      </div>

      {/* After Image (Foreground - Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover max-w-none" 
          style={{ width: '100%' }} // Keep image static, just clip container
        />
        <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
            {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-lg">
           <MoveHorizontal className="h-4 w-4 text-cyan-400" />
        </div>
      </div>
      
      {/* Grid Overlay for Tech Feel */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default BeforeAfter;
