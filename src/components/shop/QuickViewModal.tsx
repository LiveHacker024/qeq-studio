import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NailSize } from '../../types';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Ruler, 
  Sparkles, 
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface QuickViewModalProps {
  onNavigateToProduct: (slug: string) => void;
  onNavigateCheckout: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  onNavigateToProduct,
  onNavigateCheckout
}) => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist,
    setIsSizeGuideOpen 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<NailSize>('M');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const isPremium = quickViewProduct.quality_tier === 'premium';
  const sizes: NailSize[] = ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'];

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    handleClose();
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    handleClose();
    onNavigateCheckout();
  };

  const handleViewFullPage = () => {
    const slug = quickViewProduct.slug;
    handleClose();
    onNavigateToProduct(slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden glass-dark-elevated border border-white/20 shadow-2xl bg-[#0C0C12] max-h-[90vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: Product Image & Gallery */}
        <div className="md:w-1/2 relative bg-[#07070A] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
          <div className="relative aspect-[4/5] w-full max-w-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <img
              src={getAssetUrl(quickViewProduct.thumbnail)}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border ${
                isPremium
                  ? 'bg-champagne-gold/25 text-champagne-soft border-champagne-gold/40'
                  : 'bg-blue-600/30 text-blue-200 border-blue-500/30'
              }`}>
                {isPremium ? 'Premium (10 Nails)' : 'Normal (72 Nails)'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Product Details & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
          
          <div>
            {/* Optional verified info */}
            {(quickViewProduct.shape || quickViewProduct.length) && (
              <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
                {quickViewProduct.shape && <span>{quickViewProduct.shape}</span>}
                {quickViewProduct.shape && quickViewProduct.length && <span>•</span>}
                {quickViewProduct.length && <span>{quickViewProduct.length}</span>}
              </div>
            )}

            {/* Product Title */}
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-3">
              {quickViewProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-3xl font-bold text-white">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.compare_price && (
                <span className="font-mono text-sm text-gray-400 line-through">
                  ₹{quickViewProduct.compare_price}
                </span>
              )}
            </div>

            {/* Packaging & Quantity Information Directly Below Price */}
            <div className={`mb-4 p-3 rounded-xl border ${
              isPremium
                ? 'bg-champagne-gold/10 border-champagne-gold/30'
                : 'bg-blue-950/40 border-blue-500/30'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isPremium ? 'text-champagne-soft' : 'text-blue-300'
                }`}>
                  {isPremium ? 'PREMIUM COLLECTION' : 'NORMAL COLLECTION'}
                </span>
                <span className="text-[10px] font-semibold text-champagne-soft flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-champagne-gold" /> Handmade
                </span>
              </div>
              {isPremium ? (
                <div>
                  <div className="text-xs font-bold text-white">1 Premium Pack</div>
                  <div className="text-xs font-semibold text-champagne-soft">10 Handmade Nails</div>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-bold text-white">3 Packs × 24 Nails</div>
                  <div className="text-xs font-semibold text-blue-200">72 Handmade Nails Total</div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Select Nail Size
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-champagne-soft hover:text-white underline flex items-center gap-1 transition-colors"
                >
                  <Ruler className="w-3 h-3" /> Size Guide
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-center rounded-xl text-xs font-bold transition-all border ${
                      selectedSize === sz
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border-white/10'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Quantity
              </span>
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold font-mono text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-lg font-bold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{quickViewProduct.price * quantity})</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                  isFavorited
                    ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-white/5 border-white/15 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                title="Save to Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 rounded-2xl bg-[#C8A96B] hover:bg-[#E2C98A] text-black text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Buy Now — Direct Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleViewFullPage}
              className="text-center text-xs text-gray-400 hover:text-white underline underline-offset-4 transition-colors pt-2"
            >
              View Complete Product Page & Details →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
