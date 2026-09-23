import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { VideoHero } from '../components/hero/VideoHero';
import { HeroContentOverlay } from '../components/hero/HeroContentOverlay';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { QualityComparisonSection } from '../components/home/QualityComparisonSection';
import { CustomNailStudio } from '../components/custom-studio/CustomNailStudio';
import { AnatomyOfLuxury } from '../components/home/AnatomyOfLuxury';
import { VideoShowcase } from '../components/home/VideoShowcase';
import { SizeAndCareGuideSection } from '../components/home/SizeAndCareGuideSection';
import { ProductCard } from '../components/shop/ProductCard';
import { Sparkles, Gem, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onProductClick: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onProductClick }) => {
  const { products, storeConfig } = useStore();

  const featuredList = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. CINEMATIC HERO VIDEO ANIMATION */}
      <VideoHero>
        <HeroContentOverlay
          onShopClick={() => onNavigate('/shop')}
          onExplorePremiumClick={() => onNavigate('/shop/premium')}
          onCustomStudioClick={() => {
            const el = document.getElementById('custom-studio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </VideoHero>

      {/* 2. VALUE TICKER */}
      <section className="bg-[#050508] border-y border-white/10 py-5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-around gap-6 text-xs text-gray-300 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne-gold" />
            <span className="font-semibold text-white">100% Handmade Press-On Nails</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">Normal: 3 Packs × 24 Nails (₹{storeConfig.normalPrice})</span>
          </div>
          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4 text-champagne-gold" />
            <span className="font-semibold text-white">Premium: 1 Pack × 10 Nails (₹{storeConfig.premiumPrice})</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">Free Express Shipping Above ₹{storeConfig.freeShippingThreshold}</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <FeaturedCollections
        onNavigate={onNavigate}
        normalPrice={storeConfig.normalPrice}
        premiumPrice={storeConfig.premiumPrice}
      />

      {/* 4. QUALITY COMPARISON: NORMAL ₹249 vs PREMIUM ₹299 */}
      <QualityComparisonSection
        onNavigateNormal={() => onNavigate('/shop/normal')}
        onNavigatePremium={() => onNavigate('/shop/premium')}
        normalPrice={storeConfig.normalPrice}
        premiumPrice={storeConfig.premiumPrice}
      />

      {/* 5. HANDMADE NAIL SHOWCASE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-blue-400 mb-2 block">
              Handmade Designs
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              FEATURED DESIGNS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/shop')}
            className="btn-luxury-secondary text-xs uppercase tracking-widest py-3 px-6 inline-flex items-center gap-2 self-start md:self-auto"
          >
            <span>View All {products.length} Sets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredList.map((p: Product) => (
            <ProductCard
              key={p.id}
              product={p}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* 6. DESIGN YOUR OWN NAILS (BESPOKE STUDIO & BULK ORDER SYSTEM) */}
      <CustomNailStudio />

      {/* 7. THE ANATOMY OF CRAFT */}
      <AnatomyOfLuxury onNavigateShop={() => onNavigate('/shop')} />

      {/* 7. CINEMATIC VIDEO SHOWCASE */}
      <VideoShowcase />

      {/* 8. TRY THE LOOK VIRTUAL FITTING BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl glass-dark border border-blue-500/30 p-8 sm:p-14 relative overflow-hidden bg-gradient-to-r from-[#11162C] via-[#0D0D14] to-[#12162A] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-champagne-gold mb-2 block">
              Virtual Studio
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white mb-3">
              TRY THE LOOK ON YOUR HANDS
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Upload your hand photo and preview any of our 124 press-on styles with our interactive Before/After comparison slider.
            </p>
            <button
              onClick={() => onNavigate('/try-the-look')}
              className="btn-luxury-primary text-xs uppercase tracking-widest py-3.5 px-8 inline-flex items-center gap-2 shadow-xl shadow-blue-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Virtual Fitting Room</span>
            </button>
          </div>

          <div className="w-full md:w-80 aspect-video rounded-2xl overflow-hidden border border-white/20 shrink-0 shadow-2xl">
            <img
              src={getAssetUrl('/assets/animation/hero-hand-editorial.png')}
              alt="Try The Look Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 9. SIZE AND CARE GUIDE */}
      <SizeAndCareGuideSection />

    </div>
  );
};
