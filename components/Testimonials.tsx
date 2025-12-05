
import React from 'react';
import { Quote } from 'lucide-react';
import RevealOnScroll from './animations/RevealOnScroll';

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 text-center relative z-10">
        
        <RevealOnScroll>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">What Our Community Says</h2>
        </RevealOnScroll>

        <RevealOnScroll width="100%" variant="blur">
            <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl p-12 md:p-20 rounded-[2rem] border border-white/5 relative hover:border-blue-500/20 transition-colors duration-500 shadow-2xl">
            <div className="absolute top-10 left-10 text-white/5">
                <Quote className="h-24 w-24" fill="currentColor" />
            </div>
            
            <div className="relative z-10">
                <p className="text-2xl md:text-4xl text-white font-light italic mb-12 leading-tight tracking-wide drop-shadow-md">
                "I was skeptical about an AI skin scan, but it was so easy and insightful. The personalized routine it created has been a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 not-italic font-bold">game-changer</span>."
                </p>
                <div className="flex flex-col items-center">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
                <h4 className="font-bold text-white text-xl tracking-wide">Ankit R.</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Verified User • Mumbai</p>
                </div>
            </div>
            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Testimonials;
