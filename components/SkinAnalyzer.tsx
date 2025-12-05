
import React, { useState, useRef, useEffect } from 'react';
import { Camera, AlertCircle, ScanLine, Upload, Sparkles, Activity, Droplets, Sun, Moon, Zap, User, Fingerprint, RefreshCw } from 'lucide-react';
import { analyzeSkinImage, fileToGenerativePart } from '../services/gemini';

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

const SkinAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanStatus, setScanStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated scanning sequence logs
  useEffect(() => {
    if (loading) {
      const statuses = [
        "Detecting Face Mesh...",
        "Calibrating Light Levels...",
        "Analyzing Pore Structure...",
        "Measuring Pigmentation...",
        "Calculating Skin Age...",
        "Generating Report..."
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

        <div className="flex flex-col gap-8 items-center justify-center max-w-6xl mx-auto">
          
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
                                            {/* Grid Overlay */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-10"></div>
                                            
                                            {/* Moving Scan Line */}
                                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20 animate-[scan_2s_ease-in-out_infinite]"></div>
                                            
                                            {/* Central Target */}
                                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                                <div className="w-64 h-64 border-2 border-cyan-500/50 rounded-full animate-ping opacity-20"></div>
                                                <div className="absolute w-48 h-48 border border-blue-500/80 rounded-full"></div>
                                                <div className="absolute w-52 h-52 border-t-2 border-b-2 border-cyan-400 rounded-full animate-spin"></div>
                                            </div>

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
          {analysisData && (
              <div className="w-full animate-fade-in-up">
                  {/* Dashboard Header */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                      <div>
                          <h2 className="text-3xl font-bold text-white tracking-tight">Analysis Complete</h2>
                          <p className="text-gray-400 text-sm">Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      </div>
                      <button onClick={resetScan} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition">
                          <RefreshCw className="h-4 w-4" /> New Scan
                      </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* COL 1: Main Stats */}
                      <div className="space-y-6">
                          {/* Overall Score Card */}
                          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Activity className="h-4 w-4"/> Health Score</h3>
                               
                               <div className="flex items-center justify-center mb-6 relative">
                                   <svg className="w-40 h-40 transform -rotate-90">
                                       <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-800" />
                                       <circle 
                                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                                        strokeDasharray={440} 
                                        strokeDashoffset={440 - (440 * analysisData.overallScore) / 100}
                                        className={`text-blue-500 transition-all duration-1000 ease-out`} 
                                       />
                                   </svg>
                                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                                       <span className="text-5xl font-bold text-white tracking-tighter">{analysisData.overallScore}</span>
                                       <span className="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Excellent</span>
                                   </div>
                               </div>
                               
                               <div className="flex justify-between items-center border-t border-white/5 pt-4">
                                   <div className="text-center">
                                       <p className="text-[10px] text-gray-500 uppercase tracking-wider">Skin Age</p>
                                       <p className="text-xl font-bold text-white">{analysisData.skinAge}</p>
                                   </div>
                                   <div className="w-px h-8 bg-white/10"></div>
                                   <div className="text-center">
                                       <p className="text-[10px] text-gray-500 uppercase tracking-wider">Type</p>
                                       <p className="text-xl font-bold text-white">{analysisData.skinType}</p>
                                   </div>
                               </div>
                          </div>

                          {/* Key Ingredients */}
                          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Fingerprint className="h-4 w-4"/> Prescription</h3>
                              <div className="flex flex-wrap gap-2">
                                  {analysisData.keyIngredients?.map((ing, i) => (
                                      <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded text-xs font-mono">
                                          {ing}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>

                      {/* COL 2: Metrics Breakdown */}
                      <div className="lg:col-span-2 space-y-6">
                          {/* AI Summary */}
                          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                               <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                               <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-purple-400"/> AI Diagnosis</h3>
                               <p className="text-gray-300 leading-relaxed font-light text-sm pl-4">
                                   {analysisData.summary}
                               </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Detailed Metrics */}
                              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><ScanLine className="h-4 w-4"/> Detailed Metrics</h3>
                                  <div className="space-y-5">
                                      {Object.entries(analysisData.metrics).map(([key, rawValue]) => {
                                          const value = rawValue as number;
                                          return (
                                          <div key={key}>
                                              <div className="flex justify-between text-xs mb-2">
                                                  <span className="text-white capitalize font-medium">{key}</span>
                                                  <span className="text-gray-400 font-mono">{value}/100</span>
                                              </div>
                                              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                  <div 
                                                    className={`h-full rounded-full ${value > 70 ? 'bg-green-500' : value > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                                    style={{width: `${value}%`}}
                                                  ></div>
                                              </div>
                                          </div>
                                      )})}
                                  </div>
                              </div>

                              {/* Routine */}
                              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col">
                                   <div className="mb-6">
                                       <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Sun className="h-4 w-4"/> Morning</h3>
                                       <ul className="space-y-2">
                                           {analysisData.routine.morning.map((step, i) => (
                                               <li key={i} className="text-xs text-gray-400 flex gap-2">
                                                   <span className="text-gray-600 font-mono">0{i+1}</span> {step}
                                               </li>
                                           ))}
                                       </ul>
                                   </div>
                                   <div className="pt-6 border-t border-white/5">
                                       <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Moon className="h-4 w-4"/> Evening</h3>
                                       <ul className="space-y-2">
                                           {analysisData.routine.evening.map((step, i) => (
                                               <li key={i} className="text-xs text-gray-400 flex gap-2">
                                                   <span className="text-gray-600 font-mono">0{i+1}</span> {step}
                                               </li>
                                           ))}
                                       </ul>
                                   </div>
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
