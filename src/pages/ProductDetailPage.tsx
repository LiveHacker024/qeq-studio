import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, NailSize } from '../types';
import { ProductGallery } from '../components/product/ProductGallery';
import { Product3DViewer } from '../components/product/Product3DViewer';
import { SizeSelector } from '../components/product/SizeSelector';
import { SizeGuideModal } from '../components/product/SizeGuideModal';
import { ProductAccordion } from '../components/product/ProductAccordion';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { SEOHead } from '../components/common/SEOHead';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Plus, 
  Minus 
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigateShop: () => void;
  onNavigateCheckout: () => void;
  onProductClick: (slug: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigateShop,
  onNavigateCheckout,
  onProductClick
}) => {
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setIsSizeGuideOpen 
  } = useStore();

  const product = products.find((p: Product) => p.slug === slug) || products[0];

  const [selectedSize, setSelectedSize] = useState<NailSize>('M');
  const [customSizes, setCustomSizes] = useState({
    thumb: '16mm',
    index: '12mm',
    middle: '13mm',
    ring: '12mm',
    pinky: '9mm'
  });
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'gallery' | '3d'>('3d');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-editorial text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <button onClick={onNavigateShop} className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6">
          Browse Catalog
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isPremium = product.quality_tier === 'premium';

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity, selectedSize === 'CUSTOM' ? customSizes : undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity, selectedSize === 'CUSTOM' ? customSizes : undefined);
    onNavigateCheckout();
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <SEOHead 
        title={`${product.name} | QeQ STUDIO`}
        description={product.description}
        image={product.thumbnail}
        product={product}
      />

      {/* Breadcrumb Bar */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
        <button onClick={onNavigateShop} className="hover:text-white transition-colors">Home</button>
        <span>/</span>
        <button onClick={onNavigateShop} className="hover:text-white transition-colors">Shop</button>
        <span>/</span>
        <button 
          onClick={onNavigateShop} 
          className="capitalize hover:text-white transition-colors"
        >
          {product.quality_tier} Collection
        </button>
        <span>/</span>
        <span className="text-gray-200 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main PDP 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: Gallery & Interactive 3D Presentation (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Presentation Mode Switcher */}
          <div className="flex items-center gap-2 self-start bg-white/5 border border-white/10 rounded-full p-1 text-xs mb-1">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                viewMode === '3d' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Interactive 3D Stage
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
                viewMode === 'gallery' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              High-Res Gallery
            </button>
          </div>

          {viewMode === '3d' ? (
            <Product3DViewer product={product} />
          ) : (
            <ProductGallery product={product} />
          )}

          {/* Value Assurances Box */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl glass-dark border border-white/10 text-center text-xs mt-4">
            <div>
              <Sparkles className="w-4 h-4 text-champagne-gold mx-auto mb-1" />
              <span className="text-gray-300 font-medium block">Handmade Press-Ons</span>
              <span className="text-[10px] text-gray-500">Quality Crafted</span>
            </div>
            <div>
              <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-gray-300 font-medium block">Complete Set</span>
              <span className="text-[10px] text-gray-500">Adhesive Included</span>
            </div>
            <div>
              <Truck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-gray-300 font-medium block">Express Dispatch</span>
              <span className="text-[10px] text-gray-500">Pan-India</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Product Buy Box & Configuration (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Top Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isPremium
                  ? 'bg-champagne-gold/20 text-champagne-soft border-champagne-gold/40'
                  : 'bg-blue-600/20 text-blue-200 border-blue-500/30'
              }`}>
                {isPremium ? 'Premium Collection (₹299)' : 'Normal Collection (₹249)'}
              </span>
              <span className="text-xs text-gray-400">SKU: {product.sku}</span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              {product.name}
            </h1>

            {/* Price Display */}
            <div className="pb-6 border-b border-white/10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white">
                  ₹{product.price}
                </span>
                {product.compare_price && (
                  <span className="font-mono text-base text-gray-400 line-through">
                    ₹{product.compare_price}
                  </span>
                )}
              </div>

              {/* Packaging & Quantity Information Directly Below Price */}
              <div className={`mt-4 p-4 rounded-2xl border ${
                isPremium 
                  ? 'bg-gradient-to-r from-champagne-gold/15 via-champagne-gold/5 to-transparent border-champagne-gold/35 shadow-lg shadow-champagne-gold/5' 
                  : 'bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-transparent border-blue-500/30 shadow-lg shadow-blue-950/20'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${
                    isPremium
                      ? 'bg-champagne-gold/20 text-champagne-soft border-champagne-gold/40'
                      : 'bg-blue-600/20 text-blue-200 border-blue-500/30'
                  }`}>
                    {isPremium ? 'PREMIUM COLLECTION' : 'NORMAL COLLECTION'}
                  </span>
                  <span className="text-[11px] font-semibold text-champagne-soft flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-gold" /> Handmade
                  </span>
                </div>

                {isPremium ? (
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white tracking-wide">
                      1 Premium Pack
                    </div>
                    <div className="text-sm font-semibold text-champagne-soft">
                      10 Handmade Nails
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white tracking-wide">
                      3 Packs × 24 Nails
                    </div>
                    <div className="text-sm font-semibold text-blue-200">
                      72 Handmade Nails Total
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
            {product.description}
          </p>

          {/* Size Selector */}
          <SizeSelector
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            customSizes={customSizes}
            onCustomSizesChange={setCustomSizes}
          />

          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Quantity
            </span>
            <div className="flex items-center rounded-xl bg-white/5 border border-white/15 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-luxury-primary text-xs uppercase tracking-widest py-4 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag (₹{product.price * quantity})</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  isFavorited
                    ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-white/5 border-white/15 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest border border-white/20 hover:border-white/40 transition-all"
            >
              Express Checkout
            </button>
          </div>

          {/* Detailed Accordion */}
          <ProductAccordion product={product} />

        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal />

      {/* Related Products Carousel */}
      <RelatedProducts 
        currentProduct={product}
        allProducts={products}
        onProductClick={onProductClick}
      />
    </div>
  );
};
