
import React from 'react';
import { Leaf, Heart, ShieldCheck, Sparkles, FlaskConical, Anchor } from 'lucide-react';
import RevealOnScroll from './animations/RevealOnScroll';

const Features: React.FC = () => {
  const features = [
    { 
        title: "Personalized by AI",
        description: "Our free AI scan analyzes 14 parameters to recommend personalized routines. It identifies concerns like acne marks, excess oil, and enlarged pores, often suggesting targeted solutions like our Niacinamide 10% Serum.",
        color: "text-blue-400", 
        border: "group-hover:border-blue-500/50", 
        glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]", 
        icon: Sparkles 
    },
    { 
        title: "Sustainability Built In", 
        description: "Bamboo packaging, refill systems, and plastic reduction — good for your skin and the planet.",
        color: "text-green-400", 
        border: "group-hover:border-green-500/50", 
        glow: "group-hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]", 
        icon: Leaf 
    },
    { 
        title: "Ingredient-First Formulas", 
        description: "Science-backed actives like niacinamide and SPF 50, tailored to Indian skin and climate.",
        color: "text-purple-400", 
        border: "group-hover:border-purple-500/50", 
        glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]", 
        icon: FlaskConical 
    },
    { 
        title: "Trust & Transparency", 
        description: "Every product is BIS/CDSCO-tested, QR-verified, and dermatologist-level safe.",
        color: "text-red-400", 
        border: "group-hover:border-red-500/50", 
        glow: "group-hover:shadow-[0_0_30px_rgba(248,113,113,0.2)]", 
        icon: Heart 
    }
  ];

  return (
    <section className="py-32 bg-transparent relative border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        
        {/* Colorful Header */}
        <div className="max-w-4xl mx-auto mb-20">
             <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">Our Promise, Our Process</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full opacity-50"></div>
             </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 0.15} className="h-full">
                <div className={`group bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 transition-all duration-500 flex flex-col items-center text-center hover:bg-black/40 ${feature.border} ${feature.glow} hover:-translate-y-2 h-full relative overflow-hidden`}>
                {/* Top Gradient Line */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity ${feature.color.replace('text', 'bg')}`}></div>
                
                <div className={`flex-shrink-0 p-4 rounded-2xl bg-white/5 border border-white/5 ${feature.color} group-hover:scale-110 transition-transform duration-300 mb-6 shadow-inner`}>
                    <feature.icon className="h-8 w-8 drop-shadow-md" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-tight">{feature.title}</h3>
                
                <p className="text-gray-400 font-light text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                </p>
                </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
