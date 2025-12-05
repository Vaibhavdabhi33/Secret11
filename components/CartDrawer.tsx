
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  const FREE_SHIPPING_THRESHOLD = 999;
  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFree = FREE_SHIPPING_THRESHOLD - totalPrice;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#050505]/95 border-l border-white/10 backdrop-blur-2xl z-[101] shadow-2xl shadow-blue-900/20 transform transition-transform duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Your Bag <span className="text-gray-500 text-sm ml-2">({cart.length} items)</span></h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-4 bg-black/40 border-b border-white/5">
            <div className="flex justify-between text-xs mb-2 font-medium">
                {remainingForFree > 0 ? (
                    <span className="text-gray-300">Add <span className="text-cyan-400 font-bold">₹{remainingForFree}</span> for Free Shipping</span>
                ) : (
                    <span className="text-green-400 font-bold flex items-center gap-1"><Truck className="h-3 w-3" /> You've unlocked Free Shipping!</span>
                )}
                <span className="text-gray-500">{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-500 ${remainingForFree <= 0 ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}
                    style={{ width: `${shippingProgress}%` }}
                ></div>
            </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-xl font-medium text-gray-400">Your bag is empty</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 text-sm uppercase tracking-widest font-bold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 animate-fade-in-up">
                <div className="w-20 h-24 bg-gray-900 rounded-lg overflow-hidden border border-white/10 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-xs">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg border border-white/5 px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-white text-gray-500 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-white text-gray-500 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-right">
                       <p className="text-cyan-400 font-bold text-sm">₹{item.price * item.quantity}</p>
                       <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-red-400 hover:text-red-300 underline mt-1"
                       >
                         Remove
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm">
                <span>Shipping</span>
                {remainingForFree <= 0 ? (
                    <span className="text-green-400 font-bold">FREE</span>
                ) : (
                    <span className="text-white">₹99</span>
                )}
              </div>
              <div className="flex justify-between text-white text-lg font-bold pt-4 border-t border-white/10">
                <span>Total</span>
                <span>₹{remainingForFree <= 0 ? totalPrice : totalPrice + 99}</span>
              </div>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
              Checkout Securely <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> SSL Encrypted Payment
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
