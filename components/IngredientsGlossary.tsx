
import React, { useState } from 'react';
import { Microscope, Shield, Zap, Target, CheckCircle2, Sun, Moon, Clock, ArrowRight, Leaf, Dna, FileCheck, Lock, Fingerprint, RefreshCw } from 'lucide-react';
import RevealOnScroll from './animations/RevealOnScroll';

interface Ingredient {
  id: string;
  name: string;
  symbol: string;
  number: number;
  formula: string;
  category: "Active" | "Hydrator" | "Protector" | "Exfoliant";
  description: string;
  moa: string; // Mechanism of Action
  concentration: string;
  color: string;
}

const ingredients: Ingredient[] = [
  {
    id: "nia",
    name: "Niacinamide",
    symbol: "Ni",
    number: 10,
    formula: "C₆H₅NO₂",
    category: "Active",
    description: "Bio-active form of Vitamin B3 essential for cellular energy (ATP) production and DNA repair.",
    moa: "Inhibits melanosome transfer from melanocytes to keratinocytes; upregulates ceramide synthesis.",
    concentration: "10%",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10"
  },
  {
    id: "ha",
    name: "Hyaluronic Acid",
    symbol: "Ha",
    number: 35,
    formula: "(C₁₄H₂₁NO₁₁)n",
    category: "Hydrator",
    description: "A glycosaminoglycan naturally found in the extracellular matrix, capable of holding 1000x its weight in water.",
    moa: "Multi-molecular weight delivery: High MW seals surface, Low MW penetrates to signal hydration.",
    concentration: "2%",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
  },
  {
    id: "sal",
    name: "Salicylic Acid",
    symbol: "Sa",
    number: 2.0,
    formula: "C₇H₆O₃",
    category: "Exfoliant",
    description: "A lipophilic Beta-Hydroxy Acid (BHA) derived from willow bark structure.",
    moa: "Desmolytic action: Dissolves the protein bonds (desmosomes) between dead skin cells deep within the pore lining.",
    concentration: "2%",
    color: "text-green-400 border-green-500/30 bg-green-500/10"
  },
  {
    id: "spf",
    name: "Zinc Oxide",
    symbol: "Zn",
    number: 50,
    formula: "ZnO",
    category: "Protector",
    description: "A photostable mineral UV filter providing broad-spectrum protection.",
    moa: "Physical reflection and scattering of UVA (aging) and UVB (burning) radiation; non-comedogenic.",
    concentration: "25%",
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
  },
  {
    id: "cer",
    name: "Ceramides",
    symbol: "Ce",
    number: 3,
    formula: "Lipid",
    category: "Hydrator",
    description: "Sphingolipids that constitute ~50% of the Stratum Corneum's intercellular matrix.",
    moa: "Restores the 'mortar' in the skin's brick-and-mortar barrier model, reducing Transepidermal Water Loss (TEWL).",
    concentration: "NP/AP",
    color: "text-pink-400 border-pink-500/30 bg-pink-500/10"
  },
  {
    id: "vitc",
    name: "E-Ascorbic Acid",
    symbol: "Vc",
    number: 15,
    formula: "C₆H₈O₆",
    category: "Active",
    description: "A stable, etherified derivative of L-Ascorbic Acid with superior oxidation resistance.",
    moa: "Scavenges free radicals (ROS) and inhibits the tyrosinase enzyme to prevent melanogenesis.",
    concentration: "15%",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10"
  }
];

// --- VISUALIZERS ---

const NiacinamideMOA = () => (
  <div className="relative w-full h-48 bg-[#050505] rounded-xl overflow-hidden flex items-center justify-center border border-blue-900/30 shadow-inner mt-4">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent"></div>
    {/* Melanocyte (Source) */}
    <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-orange-900/40 rounded-full border border-orange-500/50 z-10 flex items-center justify-center">
        <span className="text-[8px] text-orange-300 font-mono -mt-8 ml-8">MELANOCYTE</span>
    </div>
    
    {/* Keratinocyte (Target) */}
    <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-pink-900/40 rounded-full border border-pink-500/50 z-10 flex items-center justify-center">
        <span className="text-[8px] text-pink-300 font-mono mt-8 mr-8">SKIN CELL</span>
    </div>

    {/* The Barrier (Niacinamide) */}
    <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="h-32 w-1.5 bg-blue-500/80 shadow-[0_0_15px_#3b82f6] animate-pulse rounded-full"></div>
        <div className="absolute bg-blue-950 border border-blue-500 text-[9px] text-blue-300 px-2 py-0.5 rounded font-mono shadow-lg transform rotate-90 md:rotate-0">
            NIACINAMIDE SHIELD
        </div>
    </div>

    {/* Melanosomes */}
    {[...Array(6)].map((_, i) => (
        <div 
            key={i}
            className="absolute bottom-6 left-6 w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-[0_0_8px_#facc15] z-10"
            style={{
                animation: `transfer 2.5s infinite linear`,
                animationDelay: `${i * 0.4}s`
            }}
        ></div>
    ))}
    
    <style>{`
        @keyframes transfer {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; }
            45% { transform: translate(80px, -80px); opacity: 1; }
            50% { transform: translate(90px, -90px); opacity: 0; scale: 1.5; } /* Hit barrier & disperse */
            100% { transform: translate(90px, -90px); opacity: 0; }
        }
    `}</style>
  </div>
);

const HyaluronicMOA = () => (
    <div className="relative w-full h-48 bg-[#050505] rounded-xl overflow-hidden flex items-center justify-center border border-cyan-900/30 shadow-inner mt-4">
        {/* The Mesh (Skin Matrix) */}
        <svg className="absolute inset-0 w-full h-full text-cyan-900/30" width="100%" height="100%">
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* HA Molecule */}
        <div className="relative z-10 w-20 h-20 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-[pulse_3s_infinite]">
            <span className="text-xs font-bold text-cyan-300">HA</span>
            {/* Ripples */}
            <div className="absolute inset-0 border border-cyan-400/50 rounded-full animate-ping"></div>
        </div>

        {/* Water Molecules being attracted */}
        {[...Array(8)].map((_, i) => (
            <div 
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_5px_#60a5fa] z-0"
                style={{
                    top: '50%',
                    left: '50%',
                    animation: `attract 3s infinite ease-in`,
                    animationDelay: `${i * 0.3}s`,
                    transformOrigin: 'center center'
                }}
            ></div>
        ))}
        
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-500/70">MOISTURE MAGNET</div>

        <style>{`
            @keyframes attract {
                0% { transform: translate(${Math.random()*300 - 150}px, ${Math.random()*200 - 100}px) scale(0); opacity: 0; }
                20% { opacity: 1; transform: translate(${Math.random()*240 - 120}px, ${Math.random()*160 - 80}px) scale(1.2); }
                100% { transform: translate(0, 0) scale(0.1); opacity: 0; }
            }
        `}</style>
    </div>
);

const SalicylicMOA = () => (
    <div className="relative w-full h-48 bg-[#050505] rounded-xl overflow-hidden flex flex-col items-center justify-end border border-green-900/30 shadow-inner mt-4">
        
        <div className="absolute top-2 text-[9px] font-mono text-green-500/70">PORE CROSS-SECTION</div>

        {/* The Pore Walls */}
        <div className="absolute bottom-0 w-full h-[80%] flex justify-between px-12">
             <div className="w-[35%] h-full bg-gradient-to-r from-gray-900 to-gray-800 border-r border-white/10 rounded-tr-3xl relative">
                {/* Skin Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             </div>
             <div className="w-[35%] h-full bg-gradient-to-l from-gray-900 to-gray-800 border-l border-white/10 rounded-tl-3xl relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
             </div>
        </div>

        {/* The Clog (Oil/Debris) */}
        <div className="absolute bottom-0 w-[30%] bg-yellow-600/40 h-[70%] animate-[dissolve_4s_infinite_linear] backdrop-blur-sm">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            {/* Debris particles */}
            <div className="w-1 h-1 bg-yellow-300 absolute top-2 left-2 rounded-full opacity-50"></div>
            <div className="w-2 h-2 bg-yellow-300 absolute top-8 right-3 rounded-full opacity-50"></div>
        </div>

        {/* Salicylic Acid Particles Entering */}
        <div className="absolute top-8 w-[30%] flex justify-center gap-3">
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i} 
                    className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e] z-10"
                    style={{ animation: `penetrate 4s infinite ease-in`, animationDelay: `${i * 0.15}s` }}
                ></div>
            ))}
        </div>

        <style>{`
            @keyframes penetrate {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                40% { transform: translateY(80px); }
                100% { transform: translateY(140px); opacity: 0; }
            }
            @keyframes dissolve {
                0% { height: 70%; opacity: 1; }
                30% { height: 70%; opacity: 1; }
                80% { height: 10%; opacity: 0.2; }
                100% { height: 70%; opacity: 0; } /* Reset snap */
            }
        `}</style>
    </div>
);


const IngredientsGlossary: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderVisualizer = (id: string) => {
      switch(id) {
          case 'nia': return <NiacinamideMOA />;
          case 'ha': return <HyaluronicMOA />;
          case 'sal': return <SalicylicMOA />;
          default: return null;
      }
  };

  return (
    <section className="py-24 bg-transparent min-h-screen relative overflow-hidden">
      {/* Molecular Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* HERO HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-purple-400 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Microscope className="h-4 w-4" /> Formulation Science
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">
                Molecular Intelligence
            </h2>
            <p className="text-xl text-gray-300 font-light leading-relaxed">
                Skincare isn't magic. It's biological engineering. <br/>
                Here is the <span className="text-white font-medium">Mechanism of Action (MOA)</span> behind our efficacy.
            </p>
        </div>

        {/* 1. THE PERIODIC TABLE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-32">
            {ingredients.map((ing, index) => (
                <RevealOnScroll key={ing.id} delay={index * 0.1}>
                    <button 
                        onClick={() => setSelectedId(selectedId === ing.id ? null : ing.id)}
                        className={`w-full relative group transition-all duration-300 ${selectedId === ing.id ? 'z-20 scale-105' : 'hover:scale-105 hover:z-10'}`}
                    >
                        <div className={`w-full bg-black/60 backdrop-blur-xl border-2 ${ing.color} rounded-3xl flex flex-col p-6 items-start justify-between transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-hidden text-left h-full min-h-[200px]`}>
                             {/* Gloss Shine */}
                            <div className="absolute -top-[100%] -left-[100%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 to-transparent rotate-45 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-700 pointer-events-none"></div>

                            {/* Header */}
                            <div className="w-full flex justify-between items-start relative z-10 mb-4">
                                <span className="font-mono text-xs opacity-70">{ing.number}</span>
                                <span className="font-mono text-[10px] opacity-50 bg-white/5 px-2 py-0.5 rounded">{ing.formula}</span>
                            </div>

                            {/* Symbol & Name */}
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="font-bold text-4xl tracking-tighter">{ing.symbol}</div>
                                <div>
                                    <div className="text-sm uppercase tracking-wider font-bold">{ing.name}</div>
                                    <div className="text-[10px] opacity-70">{ing.category}</div>
                                </div>
                            </div>

                            {selectedId === ing.id ? (
                                <div className="animate-fade-in w-full">
                                    <div className="text-[10px] font-mono opacity-70 mb-2 uppercase tracking-widest text-blue-400">Mechanism of Action:</div>
                                    <div className="text-sm leading-relaxed font-light text-gray-200 mb-4">{ing.moa}</div>
                                    
                                    {/* VISUALIZER INJECTION */}
                                    {renderVisualizer(ing.id)}
                                </div>
                            ) : (
                                <div className="mt-auto relative z-10 w-full">
                                     <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{ing.description}</p>
                                     <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                         <span>Conc: {ing.concentration}</span>
                                         <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">Tap to Analyze <ArrowRight className="h-3 w-3" /></span>
                                     </div>
                                </div>
                            )}
                        </div>
                    </button>
                </RevealOnScroll>
            ))}
        </div>

        {/* 2. BARRIER INTEGRITY MATRIX */}
        <RevealOnScroll delay={0.1}>
            <div className="mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                         <div className="inline-flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                            <span className="text-pink-400 font-mono text-xs uppercase tracking-widest">Stratum Corneum Physics</span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">The Brick & Mortar <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Barrier Model</span></h3>
                        <p className="text-gray-400 leading-relaxed text-lg mb-8 font-light">
                            Healthy skin acts like a wall. The cells (corneocytes) are the bricks, and the lipids (Ceramides, Cholesterol, Fatty Acids) are the mortar.
                        </p>
                        
                        <div className="p-6 bg-white/5 rounded-2xl border-l-2 border-pink-500 mb-6">
                             <h4 className="font-bold text-white text-sm mb-2">The Secret11 Golden Ratio</h4>
                             <p className="text-xs text-gray-300 leading-relaxed">
                                 We formulate with a precise <strong>3:1:1 ratio</strong> of Ceramides to Cholesterol to Fatty Acids, mimicking the skin's natural lipid matrix for accelerated repair.
                             </p>
                        </div>
                    </div>

                    {/* Brick Wall Visualization */}
                    <div className="relative h-[300px] bg-[#0A0A0A] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col justify-center p-8">
                        <div className="absolute inset-0 bg-grid opacity-10"></div>
                        
                        {/* The Wall */}
                        <div className="flex flex-col gap-2 relative z-10 opacity-80">
                            {[...Array(3)].map((_, r) => (
                                <div key={r} className="flex gap-2 justify-center">
                                    {[...Array(5)].map((_, c) => (
                                        <div key={c} className="w-16 h-8 bg-pink-900/40 border border-pink-500/30 rounded flex items-center justify-center relative">
                                            {/* Mortar (Lipids) */}
                                            <div className="absolute -inset-1 bg-yellow-500/10 -z-10 rounded"></div>
                                            <span className="text-[8px] text-pink-300/50 font-mono">CELL</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Invaders being blocked */}
                        <div className="absolute top-4 left-1/4 w-2 h-2 bg-gray-500 rounded-full animate-[bounce_2s_infinite]"></div>
                        <div className="absolute top-6 right-1/3 w-2 h-2 bg-gray-500 rounded-full animate-[bounce_2.5s_infinite]"></div>
                        
                        <div className="absolute bottom-4 left-6 bg-black/80 px-3 py-1 rounded-full border border-pink-500/30 text-pink-400 text-[10px] font-bold flex items-center gap-2">
                             <Shield className="h-3 w-3" /> BARRIER: INTACT
                        </div>
                    </div>
                </div>
            </div>
        </RevealOnScroll>

        {/* 3. BIO-ALCHEMY (AYURVEDA x TECH) */}
        <RevealOnScroll delay={0.15}>
            <div className="mb-32">
                 <div className="bg-[#050505] border border-green-500/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-900/10 to-teal-900/10 rounded-full blur-3xl opacity-50"></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                             <div className="inline-flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-green-400 font-mono text-xs uppercase tracking-widest">Bio-Alchemy Engine</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Ayurvedic Roots. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Molecular Potency.</span></h3>
                            <p className="text-gray-400 leading-relaxed text-lg mb-8 font-light">
                                We don't just use "herbs". We isolate the bio-active molecules using Cryogenic Extraction to remove impurities and boost efficacy by 500%.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <h4 className="text-white font-bold text-sm mb-1">Old Way</h4>
                                    <p className="text-xs text-gray-500">Turmeric Paste (Stains, Low absorption)</p>
                                </div>
                                <div className="p-4 bg-green-900/10 rounded-xl border border-green-500/30">
                                    <h4 className="text-green-300 font-bold text-sm mb-1">Secret11 Way</h4>
                                    <p className="text-xs text-green-400/70">Tetrahydrocurcumin (Colorless, Deep Penetration)</p>
                                </div>
                            </div>
                        </div>

                        {/* Extraction Animation */}
                        <div className="relative h-[300px] bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                             {/* Input: Leaf */}
                             <div className="absolute left-10 flex flex-col items-center gap-2">
                                <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center border border-green-500/30">
                                    <Leaf className="h-8 w-8 text-green-500" />
                                </div>
                                <span className="text-[9px] font-mono text-gray-500 uppercase">Botanical</span>
                             </div>

                             {/* Processing Pipe */}
                             <div className="w-40 h-2 bg-gray-800 relative overflow-hidden rounded-full mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent w-1/2 animate-[shimmer_2s_infinite_linear]"></div>
                             </div>

                             {/* Output: Molecule */}
                             <div className="absolute right-10 flex flex-col items-center gap-2">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/30 shadow-[0_0_20px_white]">
                                    <Dna className="h-8 w-8 text-white" />
                                </div>
                                <span className="text-[9px] font-mono text-white uppercase font-bold">Bio-Active</span>
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
        </RevealOnScroll>

        {/* 4. BIO-AVAILABILITY ENGINE */}
        <RevealOnScroll delay={0.2}>
            <div className="mb-32">
                <div className="bg-[#050505] border border-white/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Simulation */}
                         <div className="relative h-[400px] flex items-center justify-center">
                             {/* Skin Layers */}
                             <div className="absolute inset-0 flex flex-col opacity-30">
                                 <div className="h-1/4 bg-gray-800/50 border-b border-white/10 flex items-center justify-center text-[10px] text-gray-500">STRATUM CORNEUM</div>
                                 <div className="h-1/4 bg-gray-800/30 border-b border-white/10 flex items-center justify-center text-[10px] text-gray-500">EPIDERMIS</div>
                                 <div className="h-1/2 bg-gray-800/10 flex items-center justify-center text-[10px] text-gray-500">DERMIS</div>
                             </div>

                             {/* Liposome Animation */}
                             <div className="absolute top-0 w-12 h-12 bg-blue-500/20 rounded-full border border-blue-400 flex items-center justify-center shadow-[0_0_20px_#3b82f6] animate-[drop_4s_ease-in-out_infinite]">
                                 <div className="w-6 h-6 bg-white rounded-full"></div>
                             </div>
                         </div>

                        {/* Text */}
                        <div>
                             <div className="inline-flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                                <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Delivery Systems</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">It's not just what.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">It's How.</span></h3>
                            <p className="text-gray-400 leading-relaxed text-lg mb-8 font-light">
                                Generic ingredients sit on the surface. We use <strong>Liposomal Encapsulation</strong>—microscopic lipid bubbles that carry actives <em>through</em> the tough outer layer to where they are actually needed.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
                                    <div>
                                        <h4 className="text-white font-bold">Protection</h4>
                                        <p className="text-xs text-gray-500">Prevents unstable actives (like Vitamin C) from oxidizing before absorption.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-transparent"></div>
                                    <div>
                                        <h4 className="text-white font-bold">Targeted Release</h4>
                                        <p className="text-xs text-gray-500">Releases the payload only upon reaching the deeper epidermal layers.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </RevealOnScroll>

        {/* 5. PATENT LOGIC TREE (AI + AYURVEDA) */}
        <RevealOnScroll delay={0.25}>
            <div className="mb-32 text-center">
                 <div className="inline-flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">Patent-Pending Logic</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Neural Heuristic</span> Engine</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto relative">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-purple-900 -z-10 hidden md:block"></div>

                    {/* Step 1 */}
                    <div className="bg-black/60 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500 text-blue-400">
                            <Fingerprint className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-white">1. Computer Vision</h4>
                        <p className="text-xs text-gray-400 mt-2">Maps 14 skin parameters (Pores, Wrinkles, Pigmentation).</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-purple-900/20 p-8 rounded-2xl border border-purple-500/50 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-500/10 animate-pulse"></div>
                         <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500 text-purple-400 relative z-10">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-white relative z-10">2. Ayurvedic Heuristics</h4>
                        <p className="text-xs text-purple-200 mt-2 relative z-10">Matches metrics with Dosha imbalances & climate data.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-black/60 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                         <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-pink-500 text-pink-400">
                            <RefreshCw className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-white">3. Hyper-Personalization</h4>
                        <p className="text-xs text-gray-400 mt-2">Generates a chemically compatible 3-step routine.</p>
                    </div>
                </div>
            </div>
        </RevealOnScroll>

        {/* 6. CHRONOBIOLOGY */}
        <RevealOnScroll delay={0.2}>
            <div className="mb-32">
                <div className="bg-[#050505] border border-white/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-full blur-3xl opacity-50"></div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="lg:w-1/2">
                             <div className="inline-flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                                <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest">Circadian Rhythms</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Syncing with your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-indigo-400">Biological Clock</span></h3>
                            <p className="text-gray-400 leading-relaxed text-lg mb-8 font-light">
                                Skin permeability and blood flow fluctuate over 24 hours. Our formulas trigger specific functions based on time-of-day.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 border border-white/10 rounded-xl bg-white/5 hover:border-yellow-500/30 transition">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 shrink-0"><Sun className="h-5 w-5"/></div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">AM: Defense Mode</h4>
                                        <p className="text-xs text-gray-500">Skin thickens to block UV. We supply Antioxidants & SPF.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border border-white/10 rounded-xl bg-white/5 hover:border-indigo-500/30 transition">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0"><Moon className="h-5 w-5"/></div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">PM: Repair Mode</h4>
                                        <p className="text-xs text-gray-500">DNA repair peaks. We supply Retinoids & Peptides when permeability is highest.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Clock Visual */}
                        <div className="lg:w-1/2 relative h-[400px] flex items-center justify-center">
                            <div className="w-80 h-80 rounded-full border border-white/10 relative flex items-center justify-center">
                                {/* Day Half */}
                                <div className="absolute top-0 right-0 w-40 h-80 bg-gradient-to-l from-yellow-500/10 to-transparent rounded-r-full border-r border-yellow-500/30"></div>
                                {/* Night Half */}
                                <div className="absolute top-0 left-0 w-40 h-80 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-l-full border-l border-indigo-500/30"></div>
                                
                                {/* Orbiting Elements */}
                                <div className="absolute w-full h-full animate-[spin_10s_linear_infinite]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-black border border-yellow-500 p-2 rounded-full shadow-[0_0_15px_#eab308]">
                                        <Sun className="h-4 w-4 text-yellow-400" />
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-black border border-indigo-500 p-2 rounded-full shadow-[0_0_15px_#6366f1]">
                                        <Moon className="h-4 w-4 text-indigo-400" />
                                    </div>
                                </div>

                                {/* Central Core */}
                                <div className="w-32 h-32 rounded-full bg-[#0A0A0A] border border-white/20 flex flex-col items-center justify-center relative z-10 shadow-2xl">
                                    <Clock className="h-8 w-8 text-gray-400 mb-1" />
                                    <span className="text-[10px] text-gray-500 font-mono tracking-widest">SYNCED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RevealOnScroll>

        {/* 7. SAFETY PROTOCOL VAULT */}
        <RevealOnScroll delay={0.3}>
            <div className="mb-32">
                <div className="p-10 border border-white/10 bg-black/60 rounded-[2rem] backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div>
                             <h2 className="text-3xl font-bold text-white">Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Protocols</span></h2>
                             <p className="text-gray-400 text-sm mt-2">BIS/CDSCO Aligned. Rigorously Tested.</p>
                        </div>
                        <div className="flex gap-2">
                             <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs font-bold uppercase flex items-center gap-2">
                                 <FileCheck className="h-4 w-4" /> ISO 9001:2015
                             </div>
                             <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-bold uppercase flex items-center gap-2">
                                 <Lock className="h-4 w-4" /> Dermatologist Tested
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Parabens", "Sulfates", "Mineral Oil", "Synthetic Dyes", "Mercury", "Steroids", "Micro-Plastics", "Animal Testing"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-red-950/20 border border-red-500/10 rounded-xl">
                                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-xs">X</div>
                                <span className="text-gray-400 text-xs font-mono uppercase decoration-red-500/50 line-through decoration-2">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </RevealOnScroll>

        {/* 8. FORMULA ARCHITECTURE */}
        <RevealOnScroll>
             <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">Formula <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Architecture</span></h2>
                 <p className="text-gray-400 max-w-2xl mx-auto">Deconstructing our flagship solutions with molecular precision.</p>
             </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
            
            {/* PRODUCT 1: NIACINAMIDE */}
            <RevealOnScroll delay={0.1}>
                <div className="bg-[#050505] border border-blue-500/20 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                    <div className="absolute inset-0 bg-grid opacity-10"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
                    
                    <div className="relative z-10 flex-grow">
                        <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                 <Microscope className="h-6 w-6" />
                             </div>
                             <span className="text-[10px] font-mono bg-blue-900/20 text-blue-300 px-2 py-1 rounded border border-blue-500/20">
                                 SEBUM REGULATOR
                             </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-1">Niacinamide 10%</h3>
                        <p className="text-sm text-gray-500 mb-6 font-mono">+ Zinc PCA Catalyst</p>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-white/5 rounded-xl border-l-2 border-blue-500">
                                <h4 className="text-xs font-bold text-blue-300 uppercase mb-1">Mechanism</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Reduces Sebum Excretion Rate (SER) via 5α-reductase inhibition. Zinc PCA acts as a bacteriostatic agent.
                                </p>
                            </div>
                             <div className="flex justify-between text-[10px] font-mono text-gray-500 border-t border-white/5 pt-2 mt-4">
                                <span>MOL. WEIGHT: 122.12 g/mol</span>
                                <span>PENETRATION: DEEP</span>
                            </div>
                        </div>

                        {/* Visualization */}
                        <div className="space-y-3 mt-auto">
                             <div className="flex justify-between text-xs text-gray-400">
                                 <span>Sebum Reduction</span>
                                 <span className="text-blue-400 font-bold">4 Weeks</span>
                             </div>
                             <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                 <div className="h-full w-[0%] bg-blue-500 animate-[loading_2s_ease-out_forwards]"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* PRODUCT 2: SUNSCREEN */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-[#050505] border border-yellow-500/20 rounded-[2rem] p-8 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                    <div className="absolute inset-0 bg-grid opacity-10"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl group-hover:bg-yellow-600/20 transition-all"></div>
                    
                    <div className="relative z-10 flex-grow">
                        <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                                 <Shield className="h-6 w-6" />
                             </div>
                             <span className="text-[10px] font-mono bg-yellow-900/20 text-yellow-300 px-2 py-1 rounded border border-yellow-500/20">
                                 UV SHIELD
                             </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-1">SPF 50 Matte</h3>
                        <p className="text-sm text-gray-500 mb-6 font-mono">PA++++ / Hybrid Matrix</p>

                        <div className="space-y-4 mb-8">
                            <div className="p-4 bg-white/5 rounded-xl border-l-2 border-yellow-500">
                                <h4 className="text-xs font-bold text-yellow-300 uppercase mb-1">Dispersion Tech</h4>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    <strong className="text-white">Micronized Filters</strong> (&lt;200nm) create a uniform lattice that scatters UV rays without the white cast phenomenon.
                                </p>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-gray-500 border-t border-white/5 pt-2 mt-4">
                                <span>SPECTRUM: BROAD</span>
                                <span>FINISH: MATTE</span>
                            </div>
                        </div>

                         {/* Visualization */}
                         <div className="grid grid-cols-2 gap-2 mt-auto">
                            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                                <div className="text-xl font-bold text-yellow-400">98%</div>
                                <div className="text-[9px] uppercase tracking-wide text-gray-500">UVB Block</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                                <div className="text-xl font-bold text-orange-400">0%</div>
                                <div className="text-[9px] uppercase tracking-wide text-gray-500">Grease</div>
                            </div>
                         </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* PRODUCT 3: ACNE KIT */}
            <RevealOnScroll delay={0.3}>
                <div className="bg-[#050505] border border-green-500/20 rounded-[2rem] p-8 relative overflow-hidden group hover:border-green-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                    <div className="absolute inset-0 bg-grid opacity-10"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-green-600/10 rounded-full blur-3xl group-hover:bg-green-600/20 transition-all"></div>
                    
                    <div className="relative z-10 flex-grow">
                        <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                                 <Target className="h-6 w-6" />
                             </div>
                             <span className="text-[10px] font-mono bg-green-900/20 text-green-300 px-2 py-1 rounded border border-green-500/20">
                                 KERATOLYTIC
                             </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-1">Anti-Acne Kit</h3>
                        <p className="text-sm text-gray-500 mb-6 font-mono">Multi-Stage Protocol</p>

                        <div className="space-y-4 mb-8">
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                    <span><strong>Exfoliation:</strong> Salicylic Acid breaks desmosomes.</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-300">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                    <span><strong>Neutralization:</strong> Adjusts pH to inhibit <em>C. acnes</em>.</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="w-full bg-white/5 border border-white/5 rounded-lg p-3 flex items-center justify-center gap-2 mt-auto">
                            <Zap className="h-4 w-4 text-green-400" />
                            <span className="text-xs font-bold text-green-200">Non-Comedogenic</span>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
      
      </div>
      <style>{`
        @keyframes loading { to { width: 100%; } }
        @keyframes drop {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(300px) scale(0.5); opacity: 0; }
        }
        @keyframes shimmer {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(150%); }
        }
      `}</style>
    </section>
  );
};

export default IngredientsGlossary;
