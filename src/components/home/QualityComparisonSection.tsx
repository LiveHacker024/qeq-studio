import React from 'react';
import { Check, Gem, Sparkles, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface QualityComparisonSectionProps {
  onNavigateNormal: () => void;
  onNavigatePremium: () => void;
  normalPrice: number;
  premiumPrice: number;
}

export const QualityComparisonSection: React.FC<QualityComparisonSectionProps> = ({
  onNavigateNormal,
  onNavigatePremium,
  normalPrice,
  premiumPrice
}) => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-2 block">
          Craft & Quality Tiers
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          CHOOSE YOUR COLLECTION
        </h2>
        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
          Every QeQ STUDIO set is handcrafted with precision. Choose between our everyday Normal collection or elevated Premium designs.
        </p>
      </div>

      {/* Two Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        {/* NORMAL COLLECTION CARD (₹249) */}
        <div className="relative rounded-3xl overflow-hidden glass-dark border border-white/10 hover:border-white/20 transition-all duration-500 flex flex-col p-8 sm:p-10 group shadow-xl">
          
          {/* Top Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-300 block mb-1">
                EVERYDAY TIMELESS
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
                NORMAL COLLECTION
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                ₹{normalPrice}
              </span>
              <span className="text-[11px] text-gray-400 block font-normal">3-pack set</span>
            </div>
          </div>

          {/* Highlight Packaging Box */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-white uppercase tracking-wider">3 Packs × 24 Nails</span>
              <span className="text-blue-300 font-bold">72 Nails Total</span>
            </div>
            <div className="text-[11px] text-gray-300 font-light flex items-center justify-between">
              <span>Handmade Press-On Nails</span>
              <span className="text-emerald-400 font-medium">Handmade</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            Handmade press-on nail designs. Includes 3 individual packs of 24 nails (72 handmade press-on nails total) for multiple fresh applications.
          </p>

          {/* Visual Showcase Thumbnail */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-8 border border-white/10">
            <img
              src={getAssetUrl('/assets/products/normal/JHB003.jpg')}
              alt="Normal Collection Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-medium bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                Handmade Craftsmanship
              </span>
              <span className="text-gray-300">80 Designs</span>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-3.5 mb-10 flex-1">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span><strong>3 Individual Packs × 24 Nails</strong> (72 handmade nails total)</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Handmade press-on nail artistry</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Includes adhesive tabs for application</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onNavigateNormal}
            className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 border border-white/20 flex items-center justify-center gap-2 group-hover:border-white/40"
          >
            <span>EXPLORE NORMAL (₹{normalPrice})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* PREMIUM COLLECTION CARD (₹299) */}
        <div className="relative rounded-3xl overflow-hidden glass-dark border border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 flex flex-col p-8 sm:p-10 group shadow-2xl shadow-blue-950/40 bg-gradient-to-b from-[#12162A]/60 to-[#0C0E18]">
          
          {/* Subtle Royal Blue / Champagne Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-champagne-gold to-blue-600" />

          {/* Top Header */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-champagne-gold">
                  PREMIUM ARTISTRY
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-champagne-gold/20 text-champagne-soft border border-champagne-gold/40">
                  HANDMADE
                </span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
                PREMIUM COLLECTION
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-champagne-soft">
                ₹{premiumPrice}
              </span>
              <span className="text-[11px] text-gray-400 block font-normal">1 pack</span>
            </div>
          </div>

          {/* Highlight Packaging Box */}
          <div className="mb-6 p-4 rounded-2xl bg-champagne-gold/15 border border-champagne-gold/35 relative z-10">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-white uppercase tracking-wider">1 Premium Pack</span>
              <span className="text-champagne-soft font-bold">10 Handmade Nails</span>
            </div>
            <div className="text-[11px] text-gray-300 font-light flex items-center justify-between">
              <span>Premium Handmade Design</span>
              <span className="text-champagne-gold font-medium">Handmade</span>
            </div>
          </div>

          <p className="text-gray-200 text-sm leading-relaxed mb-6 relative z-10">
            Handmade premium press-on nail designs with 3D embellished detailing and bespoke accents.
          </p>

          {/* Visual Showcase Thumbnail */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-8 border border-blue-500/30">
            <img
              src={getAssetUrl('/assets/products/premium/31-1.jpg')}
              alt="Premium Collection Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="font-medium bg-blue-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5 text-champagne-soft">
                <Gem className="w-3.5 h-3.5 text-champagne-gold" /> Premium Handmade Design
              </span>
              <span className="text-gray-300">44 Designs</span>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-3.5 mb-10 flex-1 relative z-10">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
              <div className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/40">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span><strong>1 Premium Pack with 10 Handmade Nails</strong></span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
              <div className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/40">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Premium 3D handmade nail design</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
              <div className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/40">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Includes adhesive tabs for application</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onNavigatePremium}
            className="w-full py-4 rounded-full btn-luxury-primary text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/30"
          >
            <Gem className="w-4 h-4 text-champagne-gold" />
            <span>EXPLORE PREMIUM (₹{premiumPrice})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
