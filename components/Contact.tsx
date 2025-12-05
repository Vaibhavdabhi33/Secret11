
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Building2, Award, FileCheck, Globe } from 'lucide-react';

const DetailRow: React.FC<{ label: string; value: string; isCopyable?: boolean }> = ({ label, value, isCopyable }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!isCopyable) return;
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div 
            onClick={handleCopy}
            className={`
                group relative p-4 rounded-xl border border-white/5 bg-black/30 backdrop-blur-sm
                transition-all duration-300 flex flex-col gap-1 overflow-hidden
                ${isCopyable ? 'cursor-pointer hover:border-cyan-500/30 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]' : ''}
            `}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold relative z-10 group-hover:text-cyan-400 transition-colors">{label}</span>
            <div className="flex justify-between items-center relative z-10">
                <span className={`text-sm md:text-base text-gray-200 font-light ${isCopyable ? 'font-mono' : ''}`}>
                    {value}
                </span>
                {isCopyable && (
                    <div className="text-gray-600 group-hover:text-cyan-400 transition-colors">
                        {copied ? <Check className="h-4 w-4 text-green-500 animate-in zoom-in" /> : <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </div>
                )}
            </div>
        </div>
    );
};

const Contact: React.FC = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Footer Aurora Background */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Get in Touch Headline */}
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4 drop-shadow-md text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">Get In Touch</h2>
            <p className="text-gray-400">We'd love to hear from you. Reach out to us.</p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 max-w-6xl mx-auto">
           <a href="mailto:hello@secret11.com" className="p-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl hover:border-purple-500/50 transition duration-300 flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]">
             <div className="w-16 h-16 bg-white/5 text-purple-400 group-hover:text-white group-hover:bg-purple-500 rounded-2xl flex items-center justify-center mb-6 border border-white/5 transition-all shadow-lg group-hover:scale-110 duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
               <Mail className="h-7 w-7" />
             </div>
             <h3 className="font-bold text-white mb-2 text-xs uppercase tracking-[0.2em] group-hover:text-purple-300 transition-colors">Email Us</h3>
             <p className="text-gray-400 font-light text-base group-hover:text-white transition-colors">hello@secret11.com</p>
           </a>

           <a href="tel:+918140000723" className="p-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl hover:border-blue-500/50 transition duration-300 flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]">
             <div className="w-16 h-16 bg-white/5 text-blue-400 group-hover:text-white group-hover:bg-blue-500 rounded-2xl flex items-center justify-center mb-6 border border-white/5 transition-all shadow-lg group-hover:scale-110 duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
               <Phone className="h-7 w-7" />
             </div>
             <h3 className="font-bold text-white mb-2 text-xs uppercase tracking-[0.2em] group-hover:text-blue-300 transition-colors">Call Us</h3>
             <p className="text-gray-400 font-light text-base group-hover:text-white transition-colors">+91 81400 00723</p>
           </a>

           <div className="p-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-3xl hover:border-pink-500/50 transition duration-300 flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)]">
             <div className="w-16 h-16 bg-white/5 text-pink-400 group-hover:text-white group-hover:bg-pink-500 rounded-2xl flex items-center justify-center mb-6 border border-white/5 transition-all shadow-lg group-hover:scale-110 duration-300 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
               <MapPin className="h-7 w-7" />
             </div>
             <h3 className="font-bold text-white mb-2 text-xs uppercase tracking-[0.2em] group-hover:text-pink-300 transition-colors">Visit Us</h3>
             <p className="text-gray-400 font-light text-base group-hover:text-white transition-colors">Anand, Gujarat, India</p>
           </div>
        </div>

        {/* PRO ELITE COMPANY DETAILS VAULT */}
        <div className="max-w-5xl mx-auto">
            <div className="bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
                {/* Tech Background */}
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

                {/* Header Strip */}
                <div className="border-b border-white/5 p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-black/40 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-50"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Corporate Registry</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">Active Entity • Verified</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Certifications Badge Group */}
                    <div className="flex gap-3 relative z-10">
                        <div className="px-4 py-2 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg flex items-center gap-2 text-xs text-orange-200 hover:bg-orange-500/20 transition cursor-default">
                             <Award className="h-4 w-4 text-orange-400" /> Startup India
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2 text-xs text-blue-200 hover:bg-blue-500/20 transition cursor-default">
                             <FileCheck className="h-4 w-4 text-cyan-400" /> MSME Registered
                        </div>
                    </div>
                </div>
                
                {/* Content Grid */}
                <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    <DetailRow label="Business Name" value="Secret11 Private Limited" />
                    <DetailRow label="Registered Office" value="3A, Christian Street, Jol, Anand, Gujarat - 388315" />
                    <DetailRow label="Incorporation Date" value="5th August 2025" />
                    <DetailRow label="CIN" value="U46499GJ2025PTC165866" isCopyable={true} />
                    <DetailRow label="GSTIN" value="24ABQCS9047R1Z8" isCopyable={true} />
                    <DetailRow label="Udyam Registration" value="UDYAM-GJ-03-0067045" isCopyable={true} />
                    <DetailRow label="DPIIT Startup ID" value="DIPP218530" isCopyable={true} />
                </div>
                
                {/* Footer Note */}
                <div className="px-8 md:px-10 pb-10 relative z-10">
                    <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl flex gap-3 items-start">
                        <Globe className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light">
                            Secret11 is officially recognized under the <strong className="text-orange-400">Startup India initiative</strong> by the Department for Promotion of Industry and Internal Trade (DPIIT) and registered as an <strong className="text-cyan-400">MSME (Micro Enterprise)</strong> under the Udyam portal.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Simple Copyright */}
        <div className="text-center mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
           <p className="hover:text-cyan-400 transition-colors cursor-default">Secret11 — Conscious Skincare for the Modern Indian</p>
           <span className="hidden md:inline w-1 h-1 bg-gray-700 rounded-full"></span>
           <p className="hover:text-purple-400 transition-colors cursor-default">© 2025 Secret11. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
