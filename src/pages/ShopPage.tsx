import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/shop/ProductCard';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { SortDropdown, SortOption } from '../components/shop/SortDropdown';
import { QualityTier, Product } from '../types';
import { Filter, Sparkles, Gem } from 'lucide-react';

interface ShopPageProps {
  initialTier?: QualityTier | 'all';
  initialCategory?: string;
  onProductClick: (slug: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialTier = 'all',
  initialCategory = '',
  onProductClick
}) => {
  const { products, storeConfig } = useStore();

  const [filters, setFilters] = useState({
    tier: initialTier,
    shape: '',
    length: '',
    finish: '',
    color: '',
    inStockOnly: false,
    maxPrice: 1000
  });

  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialTier) {
      setFilters(prev => ({ ...prev, tier: initialTier }));
    }
  }, [initialTier]);

  const handleResetFilters = () => {
    setFilters({
      tier: 'all',
      shape: '',
      length: '',
      finish: '',
      color: '',
      inStockOnly: false,
      maxPrice: 1000
    });
  };

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    let result = products.filter((p: Product) => {
      if (filters.tier !== 'all' && p.quality_tier !== filters.tier) return false;
      if (initialCategory && p.category && p.category.toLowerCase() !== initialCategory.toLowerCase()) return false;
      if (filters.shape && p.shape !== filters.shape) return false;
      if (filters.length && p.length !== filters.length) return false;
      if (filters.finish && p.finish !== filters.finish) return false;
      if (filters.color && p.color !== filters.color) return false;
      return true;
    });

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a: Product, b: Product) => b.price - a.price);
    } else if (sortOption === 'name') {
      result.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
    } else if (sortOption === 'newest') {
      result.sort((a: Product, b: Product) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [products, filters, sortOption, initialCategory]);

  const pageTitle = filters.tier === 'premium'
    ? 'PREMIUM COLLECTION'
    : filters.tier === 'normal'
    ? 'NORMAL COLLECTION'
    : initialCategory
    ? `${initialCategory.toUpperCase()} COLLECTION`
    : 'ALL HANDMADE NAILS';

  const pageSubtitle = filters.tier === 'premium'
    ? `1 Premium Pack (10 Handmade Nails) • ₹${storeConfig.premiumPrice}`
    : filters.tier === 'normal'
    ? `3 Packs × 24 Nails (72 Handmade Nails Total) • ₹${storeConfig.normalPrice}`
    : 'Browse all 124 handmade press-on nail sets';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
          {filters.tier === 'premium' ? <Gem className="w-3.5 h-3.5 text-champagne-gold" /> : <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />}
          <span>{filters.tier === 'premium' ? 'Premium 3D Handmade Collection' : 'Normal Handmade Collection'}</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
          {pageTitle}
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
          {pageSubtitle}
        </p>
      </div>

      {/* Top Bar (Mobile Filter Trigger & Sort) */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white font-semibold"
        >
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Filters</span>
          <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
            {filteredProducts.length}
          </span>
        </button>

        <span className="hidden lg:block text-xs text-gray-400 font-light">
          Showing <strong className="text-white">{filteredProducts.length}</strong> handmade sets
        </span>

        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      {/* Main Grid with Sidebar */}
      <div className="flex gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
          totalResults={filteredProducts.length}
          normalPrice={storeConfig.normalPrice}
          premiumPrice={storeConfig.premiumPrice}
        />

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center glass-dark rounded-3xl border border-white/10 p-8">
              <h3 className="font-editorial text-xl font-bold text-white mb-2">No Matching Sets Found</h3>
              <p className="text-xs text-gray-400 mb-6 max-w-sm mx-auto font-light">
                Try clearing selected filters to explore our full collection.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
