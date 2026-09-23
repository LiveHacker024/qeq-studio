import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface CartDrawerProps {
  onNavigateCheckout: () => void;
  onNavigateShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateCheckout,
  onNavigateShop
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    cartItemCount
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigateCheckout();
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    onNavigateShop();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Slide Drawer Panel */}
      <div 
        className="relative w-full max-w-md bg-[#0F0F0F] h-full shadow-2xl border-l border-white/10 flex flex-col justify-between z-10 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-300" />
            <span className="font-editorial text-base font-bold text-white tracking-wide">
              YOUR CART ({cartItemCount})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-base font-bold text-white mb-2">
                Your Cart is Empty
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mb-6 leading-relaxed">
                Explore our handmade press-on collections starting from ₹249.
              </p>
              <button
                onClick={handleContinueShopping}
                className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const isPrem = item.product.quality_tier === 'premium';
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="p-3.5 rounded-xl bg-[#171717] border border-white/10 flex gap-3.5"
                >
                  {/* Image */}
                  <div className="w-18 h-22 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                    <img
                      src={getAssetUrl(item.product.thumbnail)}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-editorial text-xs sm:text-sm font-bold text-white truncate" title={item.product.name}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          isPrem ? 'bg-[#C8A96B]/20 text-[#E2C98A]' : 'bg-blue-600/20 text-blue-300'
                        }`}>
                          {isPrem ? 'Premium' : 'Normal'}
                        </span>
                        <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span className="font-mono text-gray-200">₹{item.product.price} each</span>
                      </div>

                      <div className="text-[10px] text-gray-400 mt-1">
                        {isPrem ? '1 pack • 10 nails total' : '3 packs • 72 nails total'}
                      </div>
                    </div>

                    {/* Quantity & Line Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center rounded-lg bg-black border border-white/10 p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs sm:text-sm font-bold text-white">
                          ₹{lineTotal}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Subtotal & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0B0B0B] flex flex-col gap-3">
            
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white font-semibold">₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-mono">-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-white">
                  {cartShipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `₹${cartShipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="font-mono text-base sm:text-lg text-white">₹{cartTotal}</span>
              </div>
            </div>

            {/* Direct Checkout Action */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleCheckoutClick}
                className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-lg font-bold"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full py-2 text-center text-xs text-gray-400 hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
