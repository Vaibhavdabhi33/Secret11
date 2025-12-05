
import React from 'react';
import { Sun, Moon, Layers, Droplet, FlaskConical } from 'lucide-react';
import RevealOnScroll from './animations/RevealOnScroll';

const ScienceSection: React.FC = () => {
  return (
    <section className="py-32 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
            <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6 backdrop-blur-md">
                    <FlaskConical className="h-4 w-4" /> Formulation Logic
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">
                    The Logic of Layering
                </h2>
                <p className="text-gray-400 font-light max-w-2xl mx-auto">
                    Skincare is chemistry. The order of application determines efficacy. 
                    We design products to work in synergy.
                </p>
            </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
            
            {/* Left: The Timeline */}
            <RevealOnScroll variant="slide">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <Layers className="h-32 w-32 text-blue-500" />
                    </div>

                    <div className="space-y-12 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-500 via-blue-500 to-purple-500 opacity-30"></div>

                        {/* Step 1 */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-yellow-500/50 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform">
                                <Sun className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">AM Routine</h3>
                                <p className="text-xs text-yellow-400 uppercase tracking-widest mb-2">Protect & Prevent</p>
                                <p className="text-gray-400 text-sm font-light">
                                    Focus on antioxidants and sun protection. Vitamin C to brighten, SPF to shield.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-blue-500/50 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform">
                                <Droplet className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Thinnest to Thickest</h3>
                                <p className="text-xs text-blue-400 uppercase tracking-widest mb-2">Absorption Physics</p>
                                <p className="text-gray-400 text-sm font-light">
                                    Water-based serums first, then emulsions, then oils. This ensures deep penetration without blocking.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex items-start gap-6 group">
                            <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-purple-500/50 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
                                <Moon className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">PM Routine</h3>
                                <p className="text-xs text-purple-400 uppercase tracking-widest mb-2">Repair & Renew</p>
                                <p className="text-gray-400 text-sm font-light">
                                    High-strength actives like Retinol or Exfoliants work best at night when skin is in repair mode.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Right: Indian Skin Science */}
            <div className="space-y-8">
                <RevealOnScroll delay={0.4}>
                    <h3 className="text-3xl font-bold text-white mb-6">Why Indian Skin is Different</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform origin-left">High</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Melanin Activity</div>
                            <p className="text-xs text-gray-400 mt-2">Prone to dark spots & tanning.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform origin-left">Weak</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Ceramide Barrier</div>
                            <p className="text-xs text-gray-400 mt-2">Easily dehydrated by pollution.</p>
                        </div>
                         <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform origin-left">Thick</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Dermis Layer</div>
                            <p className="text-xs text-gray-400 mt-2">More prone to congestion & oil.</p>
                        </div>
                         <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform origin-left">UV</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Sensitivity</div>
                            <p className="text-xs text-gray-400 mt-2">Tans quickly instead of burning.</p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ScienceSection;
