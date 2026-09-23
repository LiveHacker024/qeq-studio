import React from 'react';
import { BUSINESS_INFO } from '../data/initialConfig';
import { Sparkles, Gem, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

export const AboutPage: React.FC<{ onNavigateShop: () => void }> = ({ onNavigateShop }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen animate-fade-in">
      
      {/* Editorial Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Handmade Nail Artistry</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
          CRAFTED FOR ELEGANCE. <br />
          <span className="text-blue-400">HANDMADE WITH CARE.</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
          At {BUSINESS_INFO.brandName}, we create handmade press-on nails for everyday elegance and statement looks.
        </p>
      </div>

      {/* Main Image & Story Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden glass-dark border border-white/15 shadow-2xl">
            <img
              src={getAssetUrl('/assets/animation/hero-hand-editorial.png')}
              alt="QeQ Studio Handcrafted Press-On Nails"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">
            Our Brand
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
            HANDMADE PRESS-ON NAILS
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
            {BUSINESS_INFO.brandName} offers thoughtfully crafted handmade press-on nails designed to enhance your personal style with ease and versatility.
          </p>
          <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
            Every set is handcrafted by artisans. We provide two official tiers: the Normal Collection with 3 individual packs (72 nails total) and the Premium Collection with 1 pack (10 nails).
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="font-mono text-2xl font-bold text-blue-400 block mb-1">₹249</span>
              <span className="text-xs text-white font-semibold block">Normal Collection</span>
              <span className="text-[10px] text-gray-400">3 Packs × 24 Nails (72 Total)</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-champagne-gold/30">
              <span className="font-mono text-2xl font-bold text-champagne-soft block mb-1">₹299</span>
              <span className="text-xs text-white font-semibold block">Premium Collection</span>
              <span className="text-[10px] text-gray-400">1 Premium Pack (10 Nails)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-champagne-gold mb-2 block">
            Craftsmanship Pillars
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-white">
            WHY QeQ STUDIO
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-editorial text-base font-bold text-white">100% Handmade</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Every press-on nail is handcrafted with care by skilled nail artists, ensuring distinct attention to detail.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-champagne-gold/20 text-champagne-soft flex items-center justify-center mb-2">
              <Gem className="w-6 h-6" />
            </div>
            <h4 className="font-editorial text-base font-bold text-white">3D Embellished Tier</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Our premium collection delivers statement 3D handcrafted nail designs for special moments and elevated aesthetics.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-2">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-editorial text-base font-bold text-white">Clear Packaging & Sizing</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Transparent packaging breakdowns, standard sizing options (XS–XL), and custom measurement options.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-dark border border-white/15 text-center flex flex-col items-center gap-6 mb-16 bg-gradient-to-b from-[#101428] to-[#0A0A0E]">
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
          EXPLORE OUR HANDMADE CATALOG
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md font-light leading-relaxed">
          Browse all 124 handmade designs across Normal and Premium tiers.
        </p>
        <button
          onClick={onNavigateShop}
          className="btn-luxury-primary text-xs uppercase tracking-widest py-3.5 px-8 inline-flex items-center gap-2"
        >
          <span>Explore All 124 Sets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
