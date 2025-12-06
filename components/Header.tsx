
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Search, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './animations/Magnetic';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path 
    ? "text-white font-semibold after:scale-x-100" 
    : "text-gray-400 hover:text-white after:scale-x-0 hover:after:scale-x-100";

  const linkStyles = "relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:origin-right after:transition-transform after:duration-300 hover:after:origin-left inline-block";

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-blue-900/5' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left Aligned */}
          <div className="flex-shrink-0 flex items-center">
             <Link to="/" className="group flex items-center gap-2">
               <div className="relative">
                 {/* Unified Colourful Logo with Glitch Effect on Hover */}
                 <span className="relative text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all font-sans glitch-hover drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]">
                  SECRET11
                 </span>
                 <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
             </Link>
          </div>

          {/* Desktop Menu - STRICTLY RIGHT ALIGNED */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            
            {/* 1. AI Skin Scan - PRIMARY POSITION */}
            <Magnetic strength={20}>
                <Link to="/scan" className="relative group mr-2 inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative flex items-center gap-2 px-6 py-2.5 bg-[#0A0A0A] rounded-full leading-none text-[11px] font-bold uppercase tracking-wider text-white border border-white/10 group-hover:border-white/20 transition duration-200">
                    <Sparkles className="h-3 w-3 text-blue-400 group-hover:animate-pulse" />
                    AI Skin Scan
                </div>
                </Link>
            </Magnetic>

            {/* 2. Navigation Links */}
            <div className="flex items-center space-x-8">
                <Magnetic><Link to="/shop" className={`${linkStyles} ${isActive('/shop')}`}>Shop</Link></Magnetic>
                <Magnetic><Link to="/science" className={`${linkStyles} ${isActive('/science')}`}>Science</Link></Magnetic>
                <Magnetic><Link to="/about" className={`${linkStyles} ${isActive('/about')}`}>About</Link></Magnetic>
                <Magnetic><Link to="/careers" className={`${linkStyles} ${isActive('/careers')}`}>Careers</Link></Magnetic>
                <Magnetic><Link to="/contact" className={`${linkStyles} ${isActive('/contact')}`}>Contact</Link></Magnetic>
            </div>
            
            <div className="h-4 w-[1px] bg-white/10"></div>
            
            {/* 3. Utility Icons */}
            <div className="flex items-center space-x-6 pl-2">
                <button className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                    <Search className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                    <User className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="text-gray-400 hover:text-white relative transition-colors duration-300 group hover:scale-110 transform"
                >
                    <ShoppingBag className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-black shadow-sm shadow-blue-500/50 animate-bounce">
                        {cartCount}
                      </span>
                    )}
                </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
                  onClick={() => setIsCartOpen(true)}
                  className="text-gray-400 hover:text-white relative"
                >
                    <ShoppingBag className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-black">
                        {cartCount}
                      </span>
                    )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl absolute w-full left-0 z-50 animate-fade-in-up">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link to="/scan" onClick={() => setIsOpen(false)} className="block px-4 py-4 text-blue-400 font-bold tracking-widest uppercase border-l-2 border-blue-500 bg-blue-500/5">AI Skin Scan</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-white/5 tracking-widest uppercase text-xs font-bold border-l-2 border-transparent hover:border-white/20 transition-all">Shop</Link>
            <Link to="/science" onClick={() => setIsOpen(false)} className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-white/5 tracking-widest uppercase text-xs font-bold border-l-2 border-transparent hover:border-white/20 transition-all">Science</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-white/5 tracking-widest uppercase text-xs font-bold border-l-2 border-transparent hover:border-white/20 transition-all">About</Link>
            <Link to="/careers" onClick={() => setIsOpen(false)} className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-white/5 tracking-widest uppercase text-xs font-bold border-l-2 border-transparent hover:border-white/20 transition-all">Careers</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-4 text-gray-300 hover:text-white hover:bg-white/5 tracking-widest uppercase text-xs font-bold border-l-2 border-transparent hover:border-white/20 transition-all">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
