import React from 'react';
import { Sparkles, ArrowUpRight, Gem, Layers, Star } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface FeaturedCollectionsProps {
  onNavigate: (path: string) => void;
  normalPrice: number;
  premiumPrice: number;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onNavigate,
  normalPrice,
  premiumPrice
}) => {
  const cards = [
    {
      title: 'NORMAL COLLECTION',
      subtitle: '3 Packs × 24 Nails (72 Nails Total)',
      desc: 'Handmade press-on nails for everyday wear across 3 individual packs.',
      image: getAssetUrl('/assets/products/normal/JHB005.jpg'),
      badge: `₹${normalPrice} (72 Nails)`,
      badgeColor: 'bg-blue-600/30 text-blue-200 border-blue-500/40',
      path: '/shop/normal',
      priceText: `₹${normalPrice}`,
      icon: Star
    },
    {
      title: 'PREMIUM COLLECTION',
      subtitle: '1 Premium Pack (10 Handmade Nails)',
      desc: 'Handcrafted premium press-on nails with 3D embellished accents.',
      image: getAssetUrl('/assets/products/premium/1.jpg'),
      badge: `₹${premiumPrice} (10 Nails)`,
      badgeColor: 'bg-champagne-gold/20 text-champagne-soft border-champagne-gold/40',
      path: '/shop/premium',
      priceText: `₹${premiumPrice}`,
      icon: Gem
    },
    {
      title: 'COMPLETE CATALOG',
      subtitle: '124 Handmade Designs',
      desc: 'Explore the full collection of 80 Normal and 44 Premium handcrafted styles.',
      image: getAssetUrl('/assets/products/normal/JHB001.jpg'),
      badge: '124 Styles',
      badgeColor: 'bg-white/10 text-white border-white/20',
      path: '/shop',
      priceText: `From ₹${normalPrice}`,
      icon: Layers
    },
    {
      title: 'COLLECTIONS HUB',
      subtitle: 'Curated Categories',
      desc: 'Browse designs categorized by collection tier and aesthetic.',
      image: getAssetUrl('/assets/products/premium/31-1.jpg'),
      badge: 'Atelier',
      badgeColor: 'bg-purple-600/30 text-purple-200 border-purple-500/40',
      path: '/collections',
      priceText: 'Curated',
      icon: Sparkles
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-blue-400 mb-2 block">
            Curated Showroom
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            FEATURED COLLECTIONS
          </h2>
        </div>
        <p className="text-gray-400 text-sm max-w-md font-light leading-relaxed">
          Explore handcrafted press-on nail aesthetics. From understated everyday sets to statement 3D luxury designs.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigate(card.path)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer glass-dark border border-white/10 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col h-[460px]"
            >
              {/* Image Container with subtle zoom */}
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-[#0E0E14]/40 to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border backdrop-blur-md ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 bg-[#0E0E14] border-t border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-medium mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{card.subtitle}</span>
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Price</span>
                  <span className="font-bold text-white font-mono tracking-wider">{card.priceText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
