import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Sparkles, Gem } from 'lucide-react';

interface SearchModalProps {
  onSelectProduct: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectProduct }) => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.shape && p.shape.toLowerCase().includes(q)) ||
          (p.finish && p.finish.toLowerCase().includes(q)) ||
          (p.color && p.color.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          p.quality_tier.toLowerCase().includes(q)
        );
      });

  const handleSelect = (slug: string) => {
    setIsSearchOpen(false);
    onSelectProduct(slug);
  };

  const trendingSearches = [
    'Normal Collection', 'Premium 3D', 'Almond Shape', 'Mirror Chrome', 'Bridal', 'Velvet Matte', 'Cat Eye'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center pt-20 px-4 sm:px-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0C0C14] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-blue-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, shape, finish, color or tier..."
            className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-10 py-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Trending Suggestions */}
        {query.trim() === '' && (
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Trending Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-blue-600/30 hover:text-blue-200 border border-white/10 text-xs text-gray-300 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query.trim() !== '' && (
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
            <div className="text-xs text-gray-400 pb-1 border-b border-white/10">
              Found {filtered.length} matching nail sets
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xs font-light">
                No nail sets matched "{query}". Try searching "Almond", "Premium", or "Chrome".
              </div>
            ) : (
              filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.slug)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-12 h-14 rounded-lg object-cover bg-black/40 border border-white/10 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-white group-hover:text-blue-400 transition-colors truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-gray-400 block">
                        {item.quality_tier === 'premium' ? '1 Premium Pack • 10 Handmade Nails' : '3 Packs × 24 Nails • 72 Nails Total'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-sm font-bold text-white">
                      ₹{item.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
