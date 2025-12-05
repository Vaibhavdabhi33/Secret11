
import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const StickyMobileCart: React.FC = () => {
  const { cartCount, setIsCartOpen, totalPrice } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 500px)
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-[45] md:hidden animate-fade-in-up">
      <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{cartCount} Items</span>
          <span className="text-lg font-bold text-white">₹{totalPrice}</span>
        </div>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
        >
          Checkout <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCart;
