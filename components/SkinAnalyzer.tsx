
import React, { useState, useRef, useEffect } from 'react';
import { Camera, AlertCircle, ScanLine, Upload, Sparkles, Activity, Droplets, Sun, Moon, Zap, User, Fingerprint, RefreshCw, ShoppingBag, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { analyzeSkinImage, fileToGenerativePart } from '../services/gemini';
import { useCart } from '../contexts/CartContext';
import { products } from './ProductList';
import { Product } from '../types';

interface AnalysisData {
  overallScore: number;
  skinAge: number;
  skinType: string;
  summary: string;
  metrics: {
    hydration: number;
    oiliness: number;
    texture: number;
    pigmentation: number;
    acne: number;
  };
  topConcerns: { name: string; severity: string }[];
  routine: {
    morning: string[];
    evening: string[];
  };
  keyIngredients: string[];
}

const FaceMeshOverlay = () => (
    <div className="absolute inset-0 z-20 pointer-events-none opacity-60">
        {/* Central Axis */}
        <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1px] bg-cyan-500/50"></div>
        <div className="absolute top-1/2 left-[20%] right-[20%] h-[1px] bg-cyan-500/50"></div>
        
        {/* Orbital Circles (Eyes) */}
        <div className="absolute top-[35%] left-[30%] w-[15%] pt-[15%] border border-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
        <div className="absolute top-[35%] right-[30%] w-[15%] pt-[15%] border border-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
        
        {/* Jawline Tracking */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 30 60 Q 50 90 70 60" fill="none" stroke="cyan" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[dash_10s_linear_infinite]" />
            <path d="M 20 40 L 30 35 L 40 40" fill="none" stroke="cyan" strokeWidth="0.2" />
            <path d="M 60 40 L 70 35 L 80 40" fill="none" stroke="cyan" strokeWidth="0.2" />
        </svg>

        {/* Dynamic Nodes */}
        {[...Array(6)].map((_, i) => (
            <div 
                key={i}
                className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full"
                style={{
                    top: `${30 + Math.random() * 40}%`,
                    left: `${30 + Math.random() * 40}%`,
                    animation: `ping 1.5s infinite ${i * 0.2}s`
                }}
            ></div>
        ))}
    </div>
);

const SkinAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanStatus, setScanStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<"none" | "oil" | "acne" | "pigmentation">("none");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart, addMultipleToCart } = useCart();

  // Simulated scanning sequence logs
  useEffect(() => {
    if (loading) {
      const statuses = [
        "Detecting Face Mesh...",
        "Mapping T-Zone Oil Levels...",
        "Analyzing Pore Structure...",
        "Measuring Pigmentation Depth...",
        "Calculating Biological Skin Age...",
        "Compiling Dermatological Report..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setScanStatus(statuses[i % statuses.length]);
        i++;
      }, 800);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target?.result as string);
    reader.readAsDataURL(file);

    setAnalysisData(null);
    setError(null);
    setLoading(true);

    try {
      const base64Data = await fileToGenerativePart(file);
      const resultJson = await analyzeSkinImage(base64Data, file.type);
      
      const cleanJson = resultJson.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      setAnalysisData(parsed);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again with a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setSelectedImage(null);
    setAnalysisData(null);
    setError(null);
    setActiveOverlay("none");
  };

  const getRecommendedProduct = (step: string) => {
      // Find exact product match from the real ProductList
      if (step.includes("Niacinamide")) return products.find(p => p.name.includes("Niacinamide"));
      if (step.includes("SPF")) return products.find(p => p.name.includes("SPF"));
      if (step.includes("Acne") || step.includes("Salicylic")) return products.find(p => p.name.includes("Acne"));
      return null;
  };

  const handleAddBundle = () => {
    if (!analysisData) return;
    const bundle: Product[] = [];
    
    // Add logic to pick distinct products from routine
    const allSteps = [...analysisData.routine.morning, ...analysisData.routine.evening];
    allSteps.forEach(step => {
        const prod = getRecommendedProduct(step);
        if (prod && !bundle.find(p => p.id === prod.id)) {
            bundle.push(prod);
        }
    });

    addMultipleToCart(bundle);
  };

  return (
    <section className="py-24 bg-transparent min-h-screen relative overflow-hidden flex flex-col justify-center">
        {/* Overlays to make text readable on galaxy bg */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {!analysisData && !loading && (
            <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-blue-400 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block border border-blue-500/20 bg-blue-500/10 rounded-full px-3 py-1 inline-block backdrop-blur-md">Powered by Secret11 Neural Engine</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">AI Skin Diagnostics</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light drop-shadow-md">
                Medical-grade computer vision analyzes 14 skin parameters to generate your personalized dermatological report.
            </p>
            </div>
        )}

        <div className="flex flex-col gap-8 items-center justify-center max-w-7xl mx-auto">
          
          {/* STATE 1: UPLOAD / LOADING */}
          {!analysisData && (
            <div className="w-full max-w-xl flex flex-col animate-fade-in-up delay-100">
                <div className="relative group">
                    {/* Glowing Border Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    
                    <div 
                        onClick={() => !loading && fileInputRef.current?.click()}
                        className={`
                        relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-1 overflow-hidden
                        ${loading ? 'cursor-wait' : 'cursor-pointer'}
                        `}
                    >
                        <div className="relative bg-black/20 rounded-[1.8rem] min-h-[400px] flex flex-col items-center justify-center overflow-hidden border border-white/5">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileSelect} 
                                accept="image/*" 
                                className="hidden" 
                            />

                            {selectedImage ? (
                                <div className="relative w-full h-[500px] flex items-center justify-center bg-black/50">
                                    <img src={selectedImage} alt="Analysis" className="w-full h-full object-cover opacity-60" />
                                    
                                    {/* SCANNING OVERLAY */}
                                    {loading && (
                                        <>
                                            <div className="absolute inset-0 bg-blue-500/10 z-10"></div>
                                            {/* Biometric Face Mesh */}
                                            <FaceMeshOverlay />
                                            
                                            {/* Moving Scan Line */}
                                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-30 animate-[scan_2s_ease-in-out_infinite]"></div>
                                            
                                            {/* Status Text */}
                                            <div className="absolute bottom-10 bg-black/60 backdrop-blur border border-cyan-500/30 px-6 py-2 rounded-full z-30">
                                                <p className="font-mono text-cyan-400 text-xs tracking-widest flex items-center gap-3">
                                                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                                                    {scanStatus}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center p-10 relative z-10">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]">
                                        <Camera className="h-10 w-10 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2 tracking-wide">Initialize Scan</h4>
                                    <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-8">Upload clear facial image</p>
                                    <span className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition">
                                        Select Image
                                    </span>
                                </div>
                            )}

                            {/* Tech Decorations */}
                            <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-blue-500 transition-colors"></div>
                            <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-blue-500 transition-colors"></div>
                            <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-blue-500 transition-colors"></div>
                            <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-blue-500 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* STATE 2: RESULTS DASHBOARD */}
          {analysisData && selectedImage && (
              <div className="w-full animate-fade-in-up">
                  {/* Dashboard Header */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl">
                      <div>
                          <h2 className="text-3xl font-bold text-white tracking-tight">Analysis Complete</h2>
                          <p className="text-gray-400 text-sm">Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      </div>
                      <div className="flex gap-3">
                         <button onClick={resetScan} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition">
                            <RefreshCw className="h-4 w-4" /> New Scan
                        </button>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* COL 1: The Face (Interactive) - SPAN 4 */}
                      <div className="lg:col-span-4 space-y-6">
                          <div className="relative rounded-3xl overflow-hidden border border-white/10 h-[500px] group bg-black">
                                <img src={selectedImage} className="w-full h-full object-cover opacity-80" alt="Analyzed Face" />
                                
                                {/* HEATMAP OVERLAYS */}
                                {activeOverlay === "oil" && (
                                    <div className="absolute inset-0 mix-blend-overlay opacity-80 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,0,0.6)_10%,transparent_50%),radial-gradient(ellipse_at_50%_30%,rgba(255,255,0,0.5)_20%,transparent_60%)] animate-pulse"></div>
                                )}
                                {activeOverlay === "acne" && (
                                    <div className="absolute inset-0 mix-blend-color-dodge opacity-60 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,0,0.5)_5%,transparent_30%),radial-gradient(circle_at_70%_50%,rgba(255,0,0,0.5)_5%,transparent_30%),radial-gradient(circle_at_50%_80%,rgba(255,0,0,0.5)_10%,transparent_40%)]"></div>
                                )}
                                {activeOverlay === "pigmentation" && (
                                    <div className="absolute inset-0 mix-blend-multiply opacity-50 bg-[radial-gradient(circle_at_20%_40%,rgba(139,69,19,0.8)_10%,transparent_40%),radial-gradient(circle_at_80%_40%,rgba(139,69,19,0.8)_10%,transparent_40%)]"></div>
                                )}

                                {/* Controls */}
                                <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-2">
                                    <button 
                                        onClick={() => setActiveOverlay(activeOverlay === "oil" ? "none" : "oil")}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${activeOverlay === "oil" ? "bg-yellow-500 text-black border-yellow-500" : "bg-black/60 text-white border-white/20 hover:bg-white/10"}`}
                                    >
                                        Oil Zones
                                    </button>
                                    <button 
                                        onClick={() => setActiveOverlay(activeOverlay === "acne" ? "none" : "acne")}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${activeOverlay === "acne" ? "bg-red-500 text-white border-red-500" : "bg-black/60 text-white border-white/20 hover:bg-white/10"}`}
                                    >
                                        Infection
                                    </button>
                                    <button 
                                        onClick={() => setActiveOverlay(activeOverlay === "pigmentation" ? "none" : "pigmentation")}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${activeOverlay === "pigmentation" ? "bg-orange-500 text-white border-orange-500" : "bg-black/60 text-white border-white/20 hover:bg-white/10"}`}
                                    >
                                        Spots
                                    </button>
                                </div>
                          </div>
                      </div>

                      {/* COL 2: Data & Prescription - SPAN 8 */}
                      <div className="lg:col-span-8 space-y-6">
                          
                          {/* Top Row: Score & Projection */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {/* Current Health */}
                               <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between relative overflow-hidden">
                                   <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>
                                   <div>
                                       <div className="flex items-center gap-2 mb-1">
                                            <Activity className="h-4 w-4 text-blue-400" />
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Score</h3>
                                       </div>
                                       <p className="text-4xl font-bold text-white">{analysisData.overallScore}</p>
                                       <p className="text-xs text-gray-500 mt-1">Skin Age: <span className="text-white">{analysisData.skinAge}</span></p>
                                   </div>
                                   <div className="text-right">
                                       <div className="text-2xl font-bold text-blue-400">{analysisData.skinType}</div>
                                       <div className="text-[10px] text-gray-500 uppercase tracking-widest">Detected Type</div>
                                   </div>
                               </div>

                               {/* Future Projection */}
                               <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between relative overflow-hidden group">
                                   <div className="absolute left-0 top-0 w-1 h-full bg-green-500"></div>
                                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                   <div>
                                       <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="h-4 w-4 text-green-400" />
                                            <h3 className="text-xs font-bold text-green-400 uppercase tracking-widest">Potential Score</h3>
                                       </div>
                                       <p className="text-4xl font-bold text-white">94</p>
                                       <p className="text-xs text-green-300/70 mt-1">with 8-Week Protocol</p>
                                   </div>
                                   <div className="h-12 w-24 flex items-end gap-1">
                                       <div className="w-1/3 bg-gray-700 h-[60%] rounded-t"></div>
                                       <div className="w-1/3 bg-blue-600 h-[75%] rounded-t"></div>
                                       <div className="w-1/3 bg-green-500 h-[95%] rounded-t animate-pulse"></div>
                                   </div>
                               </div>
                          </div>

                          {/* AI Summary */}
                          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                               <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles className="h-4 w-4 text-purple-400"/> Zonal Analysis</h3>
                               <p className="text-gray-300 leading-relaxed font-light text-sm mb-6 border-l-2 border-purple-500 pl-4">
                                   {analysisData.summary}
                               </p>
                               
                               {/* Detailed Metrics Bars */}
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                  {Object.entries(analysisData.metrics).map(([key, rawValue]) => {
                                      const value = rawValue as number;
                                      return (
                                      <div key={key}>
                                          <div className="flex justify-between text-[10px] mb-1 font-mono uppercase text-gray-400">
                                              <span>{key}</span>
                                              <span>{value}%</span>
                                          </div>
                                          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                              <div 
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${value > 70 ? 'bg-green-500' : value > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                                style={{width: `${value}%`}}
                                              ></div>
                                          </div>
                                      </div>
                                  )})}
                               </div>
                          </div>

                          {/* The Protocol Bundle */}
                          <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative">
                               <div className="absolute top-0 right-0 p-4 opacity-10">
                                   <Layers className="h-24 w-24 text-white" />
                               </div>
                               
                               <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                   Your Prescribed Protocol 
                                   <span className="bg-blue-600 text-[10px] px-2 py-0.5 rounded text-white uppercase tracking-widest">AM / PM</span>
                               </h3>

                               <div className="space-y-4 mb-8">
                                   <div className="flex gap-4 items-start">
                                       <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-500/20"><Sun className="h-4 w-4"/></div>
                                       <div>
                                           <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-1">Morning Routine</h4>
                                           <p className="text-sm text-gray-400 font-light">{analysisData.routine.morning.join(" → ")}</p>
                                       </div>
                                   </div>
                                   <div className="flex gap-4 items-start">
                                       <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-500/20"><Moon className="h-4 w-4"/></div>
                                       <div>
                                           <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-1">Evening Routine</h4>
                                           <p className="text-sm text-gray-400 font-light">{analysisData.routine.evening.join(" → ")}</p>
                                       </div>
                                   </div>
                               </div>

                               <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                                   <div>
                                       <p className="text-xs text-gray-500 font-mono mb-1">TOTAL REGIMEN VALUE</p>
                                       <div className="flex items-end gap-2">
                                           <span className="text-2xl font-bold text-white">₹1,999</span>
                                           <span className="text-sm text-gray-500 line-through mb-1">₹2,397</span>
                                           <span className="text-xs text-green-400 font-bold mb-1 ml-1">SAVE 15%</span>
                                       </div>
                                   </div>
                                   <button 
                                    onClick={handleAddBundle}
                                    className="w-full md:w-auto bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2"
                                   >
                                       <ShoppingBag className="h-4 w-4" /> Add Full Protocol
                                   </button>
                               </div>
                          </div>

                      </div>
                  </div>
              </div>
          )}

          {/* Error State */}
          {error && (
            <div className="w-full flex items-center justify-center animate-fade-in-up">
                <div className="bg-red-950/20 backdrop-blur border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-center gap-4 max-w-md">
                    <AlertCircle className="h-8 w-8 shrink-0" />
                    <div>
                        <h4 className="font-bold mb-1">Scan Error</h4>
                        <p className="text-sm opacity-80">{error}</p>
                    </div>
                    <button onClick={resetScan} className="bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded uppercase text-xs font-bold tracking-wider">Retry</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkinAnalyzer;
