import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Gem } from 'lucide-react';

interface CollectionsHubPageProps {
  onNavigateShop: (category?: string, tier?: 'all' | 'normal' | 'premium') => void;
}

export const CollectionsHubPage: React.FC<CollectionsHubPageProps> = ({ onNavigateShop }) => {
  const { storeConfig } = useStore();

  const collections = [
    {
      title: 'Normal Collection',
      slug: 'normal',
      subtitle: `3 Packs × 24 Nails (72 Nails Total) • ₹${storeConfig.normalPrice}`,
      desc: 'Clean, elegant, lightweight handmade gel press-ons with 72 nails across 3 individual packs.',
      image: '/assets/products/normal/JHB001.jpg',
      badge: `₹${storeConfig.normalPrice} (72 Nails)`,
      badgeColor: 'bg-blue-600/30 text-blue-200 border-blue-500/40',
      action: () => onNavigateShop(undefined, 'normal')
    },
    {
      title: 'Premium Collection',
      slug: 'premium',
      subtitle: `1 Premium Pack (10 Handmade Nails) • ₹${storeConfig.premiumPrice}`,
      desc: 'Handcrafted premium 3D artistry, luxury embellishments, and layered gel aesthetics.',
      image: '/assets/products/premium/1.jpg',
      badge: `₹${storeConfig.premiumPrice} (10 Nails)`,
      badgeColor: 'bg-champagne-gold/25 text-champagne-soft border-champagne-gold/40',
      action: () => onNavigateShop(undefined, 'premium')
    },
    {
      title: 'Bridal & Couture',
      slug: 'bridal',
      subtitle: 'Wedding & Celebration Atelier',
      desc: 'Pearl inlays, lace embellishments, and opulent white-gold French tips.',
      image: '/assets/products/premium/31-1.jpg',
      badge: 'Haute Couture',
      badgeColor: 'bg-pink-600/30 text-pink-200 border-pink-500/40',
      action: () => onNavigateShop('Bridal')
    },
    {
      title: 'Cat-Eye & Chrome',
      slug: 'chrome',
      subtitle: 'Reflective Mirror Finish',
      desc: 'Liquid velvet magnetic cat-eye and high-voltage mirror chrome.',
      image: '/assets/products/normal/JHB014.jpg',
      badge: 'Liquid Metal',
      badgeColor: 'bg-cyan-600/30 text-cyan-200 border-cyan-500/40',
      action: () => onNavigateShop('Chrome')
    },
    {
      title: 'Minimal Elegance',
      slug: 'minimal',
      subtitle: 'Understated Nude Aesthetics',
      desc: 'Soft blush ombres, glazed donut finishes, and micro French tips.',
      image: '/assets/products/normal/JHB006.jpg',
      badge: 'Clean Girl',
      badgeColor: 'bg-white/10 text-gray-200 border-white/20',
      action: () => onNavigateShop('Minimal')
    },
    {
      title: 'Party & Glamour',
      slug: 'party',
      subtitle: 'Midnight Shimmer & Gems',
      desc: 'High-sparkle shimmer, radiant gloss, and statement evening nail silhouettes.',
      image: '/assets/products/premium/10.jpg',
      badge: 'After Dark',
      badgeColor: 'bg-purple-600/30 text-purple-200 border-purple-500/40',
      action: () => onNavigateShop('Party')
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Curated Aesthetics</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
          EXPLORE COLLECTIONS
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
          Discover our curated thematic edits engineered to match every mood, occasion, and style aesthetic.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map(col => (
          <div
            key={col.title}
            onClick={col.action}
            className="group relative rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-blue-500/40 transition-all duration-500 cursor-pointer flex flex-col h-[480px] shadow-2xl hover:-translate-y-2 hover:shadow-blue-950/40"
          >
            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-[#0E0E14]/40 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${col.badgeColor}`}>
                  {col.badge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-[#0E0E14] border-t border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-xs text-blue-400 font-semibold block mb-1">
                  {col.subtitle}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                  {col.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2">
                  {col.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-300 group-hover:text-blue-300">
                <span className="font-semibold uppercase tracking-wider">Browse Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
