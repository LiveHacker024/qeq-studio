import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

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
    cartItemCount,
    freeShippingProgress,
    amountForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigateCheckout();
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    onNavigateShop();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fade-in flex justify-end">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Slide Drawer Panel */}
      <div 
        className="relative w-full max-w-md bg-[#0C0C12] h-full shadow-2xl border-l border-white/15 flex flex-col justify-between z-10 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <span className="font-editorial text-lg font-bold text-white tracking-wide">
              YOUR BAG ({cartItemCount})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Progress Bar */}
        <div className="px-6 py-3 bg-blue-950/30 border-b border-blue-500/20 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-blue-200">
              <Truck className="w-3.5 h-3.5 text-champagne-gold" />
              {freeShippingProgress >= 100 ? (
                <span className="text-emerald-400 font-bold">You unlocked FREE Express Delivery!</span>
              ) : (
                <span>Add <strong>₹{amountForFreeShipping}</strong> more for FREE Shipping</span>
              )}
            </span>
            <span className="text-[10px] text-gray-400">{freeShippingProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-champagne-gold transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-gray-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-white mb-2">
                Your Shopping Bag is Empty
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mb-6 font-light leading-relaxed">
                Discover our handmade press-on collections starting from ₹249 with complimentary prep kit.
              </p>
              <button
                onClick={handleContinueShopping}
                className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const isPrem = item.product.quality_tier === 'premium';
              const lineTotal = item.product.price * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all flex gap-4 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-editorial text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isPrem ? 'bg-champagne-gold/20 text-champagne-soft border-champagne-gold/40' : 'bg-blue-600/20 text-blue-200 border-blue-500/30'
                        }`}>
                          {isPrem ? 'Premium' : 'Normal'}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          Size: <strong className="text-white">{item.selectedSize}</strong>
                        </span>
                      </div>

                      {/* Packaging specification */}
                      <div className="mt-2 p-2 rounded-xl bg-black/40 border border-white/10 text-[10px]">
                        <div className="font-mono font-bold text-white mb-0.5">₹{item.product.price}</div>
                        {isPrem ? (
                          <div>
                            <div className="text-gray-300">1 Premium Pack</div>
                            <div className="text-champagne-soft font-semibold">10 Handmade Nails</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-gray-300">3 Packs × 24 Nails</div>
                            <div className="text-blue-200 font-semibold">72 Handmade Nails Total</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-white">
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

        {/* Bottom Checkout & Promo Section (Only if items exist) */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#08080C] flex flex-col gap-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo <strong>{appliedCoupon.code}</strong> Applied (-₹{cartDiscount})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-white p-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. BUY2GET1)"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <span className="text-[11px] text-rose-400 block mt-1">{couponError}</span>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white font-medium">₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Special Promotion Discount</span>
                  <span className="font-mono">-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span className="font-mono text-white font-medium">
                  {cartShipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${cartShipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="font-mono text-lg text-white">₹{cartTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleCheckoutClick}
                className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full py-2.5 text-center text-xs text-gray-400 hover:text-white transition-colors"
              >
                Continue Browsing
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
