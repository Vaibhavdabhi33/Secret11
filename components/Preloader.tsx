
import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING SYSTEM...");
  const [show, setShow] = useState(true);

  useEffect(() => {
    const totalDuration = 2500; // 2.5 seconds boot time
    const intervalTime = 30;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      
      setProgress(newProgress);

      // Tech jargon updates
      if (newProgress > 10 && newProgress < 30) setStatus("LOADING NEURAL MODULES...");
      if (newProgress > 30 && newProgress < 50) setStatus("CALIBRATING BIOMETRIC SENSORS...");
      if (newProgress > 50 && newProgress < 70) setStatus("CONNECTING TO SECRET11 SECURE SERVER...");
      if (newProgress > 70 && newProgress < 90) setStatus("OPTIMIZING GRAPHICS ENGINE...");
      if (newProgress >= 90) setStatus("SYSTEM READY.");

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 500); // Wait for fade out animation
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#020010] flex flex-col items-center justify-center transition-opacity duration-500 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Logo */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter text-white mb-2 animate-pulse">SECRET11</h1>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden mb-4 border border-white/10">
            <div 
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Status Text */}
        <div className="flex justify-between items-end font-mono text-[10px] text-blue-400 uppercase tracking-widest">
            <span className="animate-pulse">{status}</span>
            <span>{progress}%</span>
        </div>

        {/* Decorative Code Block */}
        <div className="mt-12 text-[9px] text-gray-700 font-mono space-y-1 opacity-50">
            <div>&gt; MEM_ALLOC: 0x4921002</div>
            <div>&gt; MOUNT_VOL: /SKIN_DB_V2</div>
            <div>&gt; FETCH_CONFIG: SUCCESS</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
