import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onProductClick: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    setQuickViewProduct, 
    addToCart 
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isPremium = product.quality_tier === 'premium';

  return (
    <div className="product-card group flex flex-col rounded-2xl overflow-hidden glass-dark border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60 bg-[#0E0E14] relative">
      
      {/* Top Image Container */}
      <div 
        onClick={() => onProductClick(product.slug)}
        className="product-image-container relative aspect-[4/5] w-full overflow-hidden cursor-pointer bg-[#0A0A0E]"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border ${
            isPremium
              ? 'bg-champagne-gold/25 text-champagne-soft border-champagne-gold/40 shadow-sm'
              : 'bg-blue-600/30 text-blue-200 border-blue-500/30'
          }`}>
            {isPremium ? 'Premium (10 Nails)' : 'Normal (72 Nails)'}
          </span>

          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-black/60 text-gray-200 border border-white/15 backdrop-blur-md">
            Handmade
          </span>
        </div>

        {/* Top Right Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
            isFavorited
              ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/40'
              : 'bg-black/40 border-white/15 text-gray-300 hover:text-white hover:bg-black/70'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-blue-600 hover:border-blue-500 transition-all shadow-xl"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          {/* Optional Verified Attributes */}
          {(product.shape || product.length) && (
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium mb-1.5 uppercase tracking-wider">
              {product.shape && <span>{product.shape}</span>}
              {product.shape && product.length && <span>•</span>}
              {product.length && <span>{product.length}</span>}
            </div>
          )}

          {/* Title */}
          <h3 
            onClick={() => onProductClick(product.slug)}
            className="font-editorial text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Packaging Details */}
          <div className="mt-2.5 p-2 rounded-xl bg-white/5 border border-white/5 text-[11px]">
            {isPremium ? (
              <div className="text-champagne-soft font-medium flex items-center justify-between">
                <span>1 Premium Pack</span>
                <strong className="text-white">10 Handmade Nails</strong>
              </div>
            ) : (
              <div className="text-blue-200 font-medium flex items-center justify-between">
                <span>3 Packs × 24 Nails</span>
                <strong className="text-white">72 Handmade Nails</strong>
              </div>
            )}
          </div>
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base sm:text-lg font-bold text-white">
              ₹{product.price}
            </span>
            {product.compare_price && (
              <span className="font-mono text-xs text-gray-400 line-through">
                ₹{product.compare_price}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 'M');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-blue-600 text-gray-200 hover:text-white border border-white/10 hover:border-blue-500 transition-all duration-300"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
