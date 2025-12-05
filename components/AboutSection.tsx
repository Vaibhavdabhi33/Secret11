
import React from 'react';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import RevealOnScroll from './animations/RevealOnScroll';
import CountUp from './animations/CountUp';

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 bg-transparent border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Vision & Story */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <div className="mb-24">
            <RevealOnScroll>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tighter drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">Our Vision</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2} variant="blur">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light drop-shadow">
                To democratize expert-grade, India-specific skincare for over <span className="text-white font-semibold"><CountUp end={10} suffix=" million Indians" /></span> by 2030, while creating <span className="text-white font-semibold"><CountUp end={500} suffix="+" /></span> rural livelihoods and reducing <span className="text-white font-semibold"><CountUp end={10000} suffix="+" /></span> kg of plastic waste annually.
                </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll width="100%">
            <div className="text-left bg-black/40 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors duration-500 shadow-2xl">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
                
                <div className="absolute left-0 top-10 w-1 h-20 bg-blue-500 rounded-r-full"></div>

                <h2 className="text-3xl font-bold mb-8 relative z-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Our Story</h2>
                <div className="space-y-6 text-gray-300 relative z-10 font-light text-lg leading-relaxed">
                    <RevealOnScroll delay={0.1}>
                        <p>Secret11 was born out of a powerful realization — that most skincare in India is either imported, imitated, or indifferent.</p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <p>Despite the vibrant diversity of Indian skin tones, climates, and lifestyles, what we saw on the shelves were generic global products, often misaligned with what real Indian skin actually needs. Formulas that ignored melanin, marketing that overlooked regional concerns, and routines that were more complicated than caring.</p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.3}>
                        <p>We believed skincare deserved better — and so did the people using it.</p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.4}>
                        <p>Rooted in the culturally rich city of <span className="text-white font-medium">Anand, Gujarat</span>, Secret11 was founded by a trio of minds from different disciplines: <span className="text-white font-medium">pharmacy, social work, and engineering</span>. What united us wasn’t just passion — it was purpose.</p>
                    </RevealOnScroll>
                    
                    <div className="my-8">
                        <RevealOnScroll variant="slide" delay={0.5}>
                            <p className="text-white font-medium italic text-xl leading-relaxed border-l-4 border-blue-500 pl-6">
                                We asked: What if skincare was built not just on ingredients, but intelligence? What if it reflected India's climate, culture, and complexion — instead of contradicting it? What if tech and tradition could work together to deliver simple, personalized care — backed by science, not guesswork?
                            </p>
                        </RevealOnScroll>
                    </div>

                    <RevealOnScroll delay={0.6}>
                        <p>That’s the vision that shaped Secret11.</p>
                    </RevealOnScroll>
                </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Team */}
        <RevealOnScroll>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold tracking-tight drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">Our Team</h2>
            </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.2}>
            <p className="text-center max-w-3xl mx-auto text-gray-300 mb-16 font-light leading-relaxed">
                At the heart of Secret11 is a founding team that blends science, empathy, and operational expertise to bring smart, ingredient-first skincare to Indian consumers. With backgrounds across pharmacy, social work, and engineering, our team approaches skincare not just as a product — but as a purpose.
            </p>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Member 1 */}
            <RevealOnScroll delay={0.1} className="h-full">
                <div className="bg-black/30 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 transition duration-500 text-center group hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">Ripal Dabhi</h3>
                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">Director & Co-Founder</p>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light flex-grow">
                        With a Master's in Social Work, Ripal Dabhi leads Secret11 with a strong focus on inclusive wellness and community-centered care. Her experience in social impact and empathy-driven leadership shapes the brand's commitment to accessibility, trust, and sustainable values.
                    </p>
                    <div className="flex justify-center gap-5 text-gray-500 mt-auto">
                        <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Globe className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </RevealOnScroll>

             {/* Member 2 */}
             <RevealOnScroll delay={0.3} className="h-full">
                <div className="bg-black/30 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 transition duration-500 text-center group hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>

                    <h3 className="text-xl font-bold text-white mb-2">Shruti Patelia</h3>
                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">Head of Research & Product Innovation</p>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light flex-grow">
                        A Doctor of Pharmacy (Post baccalaureate), Shruti drives all things product — from ingredient selection to safety testing. Her pharmaceutical background ensures every formulation is science-backed, skin-safe, and precisely tailored to Indian conditions.
                    </p>
                    <div className="flex justify-center gap-5 text-gray-500 mt-auto">
                        <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Globe className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </RevealOnScroll>

             {/* Member 3 */}
             <RevealOnScroll delay={0.5} className="h-full">
                <div className="bg-black/30 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 transition duration-500 text-center group hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.1)] relative overflow-hidden flex flex-col h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>

                    <h3 className="text-xl font-bold text-white mb-2">Vaibhav Dabhi</h3>
                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">Co-Founder & Technology + Operations Lead</p>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light flex-grow">
                        With a background in Mechanical Engineering and experience as a procurement specialist, Vaibhav oversees supply chain systems and digital infrastructure. He is the architect behind Secret11's AI-powered personalization engine and sustainable packaging operations.
                    </p>
                    <div className="flex justify-center gap-5 text-gray-500 mt-auto">
                        <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Globe className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
