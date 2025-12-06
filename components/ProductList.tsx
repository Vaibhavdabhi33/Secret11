
import React, { useState, useRef, MouseEvent } from 'react';
import { Search, Heart, Info, Star, Filter, ArrowRight, ShoppingBag, Check, X, FlaskConical, Microscope, ShieldCheck, ThermometerSun, Droplets } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: "Niacinamide 10% Serum",
    description: "A multi-tasking powerhouse for Indian skin. Formulated with 10% Niacinamide (Vitamin B3) and Zinc.",
    price: 599,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    category: "Serums",
    concern: "Acne",
    rating: 4.8,
    proTip: "Use consistently for best results."
  },
  {
    id: 2,
    name: "SPF 50 Matte Sunscreen",
    description: "Your ultimate defense against the Indian sun. Broad-spectrum SPF 50 PA++++ with a matte finish.",
    price: 499,
    image: "https://images.unsplash.com/photo-1556228720-1987594b2203?auto=format&fit=crop&q=80&w=600",
    category: "Sun Protection",
    concern: "Sun Damage",
    rating: 4.9,
    proTip: "Reapply every 2-3 hours when outdoors."
  },
  {
    id: 3,
    name: "Anti-Acne Kit",
    description: "A complete dermatologist-designed regimen to combat acne. Includes cleanser, serum, and corrector.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600",
    category: "Kits",
    concern: "Acne",
    rating: 5.0,
    proTip: "Patch test active ingredients first."
  }
];

// DATA: Deep Science Content
const scienceData: Record<number, {
    indianContext: { title: string; content: string; icon: any };
    concentration: { title: string; content: string; value: string };
    synergy: { title: string; content: string; pairs: string[] };
}> = {
    1: { // Niacinamide
        indianContext: {
            title: "The Tropical Sebum Challenge",
            content: "Indian skin tends to have larger, more active sebaceous glands due to the hot, humid climate. This leads to 'chip-chip' (greasiness) and enlarged pores. Standard 5% serums often fail to penetrate this thicker sebum layer effectively.",
            icon: ThermometerSun
        },
        concentration: {
            title: "Why 10% Concentration?",
            content: "While 5% is the global standard, our R&D identified that 10% is the 'Golden Ratio' for resilient Indian skin types. It provides the necessary strength to regulate Sebum Excretion Rate (SER) significantly within 4 weeks without causing the irritation seen at 15-20%.",
            value: "10%"
        },
        synergy: {
            title: "Zinc PCA Catalyst",
            content: "Niacinamide regulates oil, but it doesn't kill bacteria. We pair it with Zinc PCA, a bacteriostatic agent that inhibits C. acnes proliferation. This dual-action approach targets both the 'fuel' (oil) and the 'fire' (bacteria).",
            pairs: ["Niacinamide (Oil Control)", "Zinc PCA (Anti-Bacterial)"]
        }
    },
    2: { // SPF
        indianContext: {
            title: "Melanin & The White Cast",
            content: "Indian skin is rich in melanin, which provides natural protection (~SPF 4) but makes 'white cast' from physical sunscreens extremely visible. Furthermore, high humidity causes standard sunscreens to sweat off, reducing efficacy.",
            icon: ShieldCheck
        },
        concentration: {
            title: "SPF 50 PA++++ Architecture",
            content: "We use 'Micronized Dispersion Technology' to break Zinc Oxide particles down to <200nm. This creates a tight lattice that reflects UV rays but allows visible light to pass through, ensuring zero white cast on Fitzpatrick IV-VI skin tones.",
            value: "PA++++"
        },
        synergy: {
            title: "Hydrophobic Matrix",
            content: "To combat Indian humidity, we encapsulate the filters in a volatile elastomer gel network. This creates a 'Matte Matrix' that repels sweat and water, ensuring the protection film stays intact even during a commute in 40°C heat.",
            pairs: ["Micronized Zinc (Protection)", "Elastomer Gel (Waterproof)"]
        }
    },
    3: { // Acne Kit
        indianContext: {
            title: "Pollution-Induced Acne",
            content: "Indian cities have high PM2.5 levels. These particles stick to oily skin, creating a cement-like plug in pores. Generic acne treatments often dry out the surface without dissolving this deep-seated debris.",
            icon: Microscope
        },
        concentration: {
            title: "The Multi-Depth Protocol",
            content: "We use a 3-tier concentration strategy: 2% Salicylic Cleanser (Wash-off, high strength for unclogging), 5% Niacinamide Serum (Leave-on, medium strength for repair), and a concentrated Spot Corrector (Targeted high strength).",
            value: "3-Step"
        },
        synergy: {
            title: "Lipophilic & Hydrophilic Balance",
            content: "Salicylic Acid is oil-soluble (Lipophilic), allowing it to dive into the oil gland. Niacinamide is water-soluble (Hydrophilic), treating the surrounding tissue. Together, they clear the pore AND heal the inflammation.",
            pairs: ["Salicylic Acid (Unclog)", "Niacinamide (Heal)"]
        }
    }
};

// 3D Card Component
const ProductCard: React.FC<{ product: Product; onViewScience: (id: number) => void }> = ({ product, onViewScience }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
  
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
  
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
      const rotateY = ((x - centerX) / centerX) * 5;
  
      setRotation({ x: rotateX, y: rotateY });
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      setRotation({ x: 0, y: 0 });
    };

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
  
    return (
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)` : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
        className="group bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-transparent flex flex-col hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.3)] relative"
      >
        {/* Holographic Border on Hover */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative h-72 bg-gray-900/50 overflow-hidden rounded-t-[23px] m-[1px]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          <button className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-pink-500 hover:text-white transition border border-white/10 z-20 group/heart">
            <Heart className="h-4 w-4 group-hover/heart:fill-current" />
          </button>
          <div className="absolute top-4 left-4 flex gap-1 items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-500/30 z-20 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
             <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
             <span className="text-xs font-bold text-white tracking-wide">{product.rating}</span>
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col relative z-10 bg-black/40 rounded-b-[23px] m-[1px] mt-0">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{product.name}</h3>
              <span className="text-cyan-300 font-bold bg-cyan-900/30 px-2 py-1 rounded text-sm border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">₹{product.price}</span>
          </div>
          <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed font-light">
            {product.description}
          </p>
          
          <div className="mt-auto space-y-4">
              {/* View Science Button */}
              {scienceData[product.id] && (
                  <button 
                    onClick={() => onViewScience(product.id)}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest text-gray-300 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2 group/science"
                  >
                      <Microscope className="h-3 w-3 group-hover/science:animate-bounce" /> View Formulation Logic
                  </button>
              )}

              <div className="bg-white/5 p-4 rounded-xl flex items-start gap-3 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                  <Info className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-400 italic">
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 not-italic">AI Tip:</span> {product.proTip}
                  </p>
              </div>
  
              <button 
                onClick={handleAddToCart}
                className={`w-full font-bold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase overflow-hidden relative shadow-lg ${added ? 'bg-green-500 text-white shadow-green-500/50' : 'bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]'}`}
              >
                  {added ? (
                      <span className="flex items-center gap-2 animate-fade-in"><Check className="h-4 w-4" /> Added</span>
                  ) : (
                      <span className="flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-purple-900"><ShoppingBag className="h-3 w-3 text-blue-900" /> Add To Cart <ArrowRight className="h-3 w-3 text-purple-900" /></span>
                  )}
              </button>
          </div>
        </div>
      </div>
    );
};

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedScienceId, setSelectedScienceId] = useState<number | null>(null);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const selectedProduct = selectedScienceId ? products.find(p => p.id === selectedScienceId) : null;
  const scienceInfo = selectedScienceId ? scienceData[selectedScienceId] : null;

  return (
    <section id="shop" className="py-24 bg-transparent border-t border-white/5">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tighter drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">Curated Collection</h2>
                <p className="text-gray-400 font-light text-lg">Science-backed formulas for every concern.</p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-transparent mb-4"></div>
        </div>

        {/* Colorful Filters */}
        <div className="glass-panel p-6 rounded-2xl mb-12 sticky top-24 z-30 shadow-2xl backdrop-blur-xl bg-black/60 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Search className="h-3 w-3" /> Search</label>
              <div className="relative group">
                 <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition text-white placeholder-gray-600 text-sm group-hover:border-cyan-500/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Filter className="h-3 w-3" /> Category</label>
              <div className="relative">
                <select 
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none text-white text-sm appearance-none cursor-pointer hover:border-purple-500/30 transition"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Serums">Serums</option>
                    <option value="Sun Protection">Sun Protection</option>
                    <option value="Kits">Kits</option>
                </select>
                <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">
                    <ChevronDownIcon />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Info className="h-3 w-3" /> Concern</label>
               <div className="relative">
                    <select className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:ring-1 focus:ring-pink-500 outline-none text-white text-sm appearance-none cursor-pointer hover:border-pink-500/30 transition"
                    defaultValue="All">
                        <option value="All">All Concerns</option>
                        <option value="Acne">Acne</option>
                        <option value="Pigmentation">Pigmentation</option>
                        <option value="Dryness">Dryness</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">
                       <ChevronDownIcon />
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {filteredProducts.map(product => (
            <ProductCard 
                key={product.id} 
                product={product} 
                onViewScience={setSelectedScienceId}
            />
          ))}
        </div>
      </div>

      {/* SCIENCE MODAL */}
      {selectedProduct && scienceInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedScienceId(null)}></div>
              
              <div className="bg-[#050505] border border-white/10 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
                  
                  {/* Left: Visual & Indian Context */}
                  <div className="md:w-1/3 bg-gradient-to-b from-gray-900 to-black p-8 relative flex flex-col">
                        <div className="absolute inset-0 bg-grid opacity-10"></div>
                        <img src={selectedProduct.image} className="w-full h-48 object-cover rounded-2xl mb-6 opacity-80 border border-white/10" alt="" />
                        
                        <h3 className="text-2xl font-bold text-white leading-none mb-1">{selectedProduct.name}</h3>
                        <p className="text-xs text-blue-400 font-mono mb-8">{selectedProduct.category}</p>

                        <div className="mt-auto bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2 text-blue-400">
                                <scienceInfo.indianContext.icon className="h-4 w-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Indian Skin Context</span>
                            </div>
                            <h4 className="text-sm font-bold text-white mb-2">{scienceInfo.indianContext.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{scienceInfo.indianContext.content}</p>
                        </div>
                  </div>

                  {/* Right: The Science */}
                  <div className="md:w-2/3 p-8 md:p-10 bg-black/95">
                      <button onClick={() => setSelectedScienceId(null)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors">
                          <X className="h-5 w-5 text-gray-400" />
                      </button>

                      <div className="mb-8">
                          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2 flex items-center gap-2">
                             <FlaskConical className="h-5 w-5 text-blue-400" /> Formula Blueprint
                          </h2>
                          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      </div>

                      <div className="grid gap-6">
                          {/* Concentration */}
                          <div className="border border-white/10 rounded-2xl p-6 bg-white/5 hover:border-purple-500/30 transition-colors">
                              <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                          <Microscope className="h-4 w-4" />
                                      </div>
                                      <h4 className="font-bold text-white text-sm">Concentration Logic</h4>
                                  </div>
                                  <span className="text-xs font-mono bg-purple-900/30 text-purple-300 px-2 py-1 rounded border border-purple-500/20">
                                      {scienceInfo.concentration.value}
                                  </span>
                              </div>
                              <h5 className="text-sm font-bold text-gray-200 mb-2">{scienceInfo.concentration.title}</h5>
                              <p className="text-xs text-gray-400 leading-relaxed font-light">{scienceInfo.concentration.content}</p>
                          </div>

                          {/* Synergy */}
                          <div className="border border-white/10 rounded-2xl p-6 bg-white/5 hover:border-green-500/30 transition-colors">
                              <div className="flex items-center gap-2 mb-4">
                                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                                      <Droplets className="h-4 w-4" />
                                  </div>
                                  <h4 className="font-bold text-white text-sm">Ingredient Synergy</h4>
                              </div>
                              <h5 className="text-sm font-bold text-gray-200 mb-2">{scienceInfo.synergy.title}</h5>
                              <p className="text-xs text-gray-400 leading-relaxed font-light mb-4">{scienceInfo.synergy.content}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                  {scienceInfo.synergy.pairs.map((pair, i) => (
                                      <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-green-400 bg-green-900/10 px-3 py-1.5 rounded-full border border-green-500/20">
                                          {pair}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                          <p className="text-[10px] text-gray-500 font-mono">
                              *CLINICALLY TESTED ON FITZPATRICK TYPE IV-VI
                          </p>
                          <button onClick={() => {addToCart(selectedProduct); setSelectedScienceId(null);}} className="bg-white text-black px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition">
                              Add to Regimen
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </section>
  );
};

const ChevronDownIcon = () => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default ProductList;
