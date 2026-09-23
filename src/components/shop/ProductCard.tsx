import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Eye } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface ProductCardProps {
  product: Product;
  onProductClick: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { 
    setQuickViewProduct, 
    addToCart 
  } = useStore();

  const isPremium = product.quality_tier === 'premium';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'M', 1);
  };

  return (
    <div className="product-card group flex flex-col rounded-2xl overflow-hidden bg-[#111111] border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      
      {/* Top Image Container */}
      <div 
        onClick={() => onProductClick(product.slug)}
        className="product-image-container relative aspect-[4/5] w-full overflow-hidden cursor-pointer bg-[#0A0A0A]"
      >
        <img
          src={getAssetUrl(product.thumbnail)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border backdrop-blur-md ${
            isPremium
              ? 'bg-black/70 text-[#E2C98A] border-[#C8A96B]/50'
              : 'bg-black/70 text-blue-300 border-blue-500/40'
          }`}>
            {isPremium ? 'Premium (10 Nails)' : 'Normal (72 Nails)'}
          </span>
        </div>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          {/* Product Name */}
          <h3 
            onClick={() => onProductClick(product.slug)}
            className="font-editorial text-sm sm:text-base font-bold text-white group-hover:text-gray-200 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pack Information */}
          <div className="mt-1 text-[11px] text-gray-400">
            {isPremium ? (
              <span className="text-[#E2C98A] font-medium">1 pack • 10 handmade nails total</span>
            ) : (
              <span className="text-gray-300 font-medium">3 packs × 24 nails • 72 nails total</span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
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
            onClick={handleQuickAdd}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#1A56DB] text-white text-xs font-semibold tracking-wide border border-white/15 hover:border-blue-500 transition-colors flex items-center gap-1.5 shadow-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  );
};
