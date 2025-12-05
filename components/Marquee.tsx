
import React from 'react';
import { Star } from 'lucide-react';

const Marquee: React.FC = () => {
  const items = [
    "DERMATOLOGIST APPROVED",
    "CRUELTY FREE",
    "VEGAN",
    "MADE FOR INDIAN SKIN",
    "AI POWERED DIAGNOSTICS",
    "SUSTAINABLE PACKAGING",
    "BIS CERTIFIED",
    "SCIENCE BACKED",
    "NO PARABENS"
  ];

  return (
    <div className="relative w-full py-4 bg-[#050505] border-y border-white/5 overflow-hidden flex items-center z-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 opacity-50"></div>
      
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mx-6">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-gray-400 uppercase flex items-center gap-4">
                  {item}
                </span>
                <Star className="h-3 w-3 text-blue-500/50 fill-blue-500/50" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
