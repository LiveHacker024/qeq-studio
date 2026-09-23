import React from 'react';
import { Sparkles, ArrowRight, Gem, ShieldCheck } from 'lucide-react';

interface HeroContentOverlayProps {
  onShopClick: () => void;
  onExplorePremiumClick: () => void;
  onCustomStudioClick?: () => void;
}

export const HeroContentOverlay: React.FC<HeroContentOverlayProps> = ({
  onShopClick,
  onExplorePremiumClick,
  onCustomStudioClick
}) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 z-20 pointer-events-none select-none">
      
      {/* Top Section: Brand Eyebrow */}
      <div 
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-gray-200 text-xs sm:text-sm font-medium tracking-[0.28em] uppercase animate-fade-in pointer-events-auto"
        style={{ animationDuration: '0.8s', animationDelay: '0.1s', animationFillMode: 'both' }}
      >
        <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
        <span className="font-semibold text-white">QeQ STUDIO</span>
        <span className="w-1 h-1 rounded-full bg-white/40" />
        <span className="text-[11px] text-gray-300 tracking-widest font-light">ATELIER</span>
      </div>

      {/* Center Section: Luxury Editorial Headline & Subtitle */}
      <div className="max-w-4xl mx-auto flex flex-col items-center my-auto pt-6 sm:pt-8">
        {/* Main Heading */}
        <h1 
          className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white uppercase leading-[1.12] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-fade-in-up"
          style={{ animationDuration: '0.9s', animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          HANDMADE PRESS-ON NAILS
        </h1>

        {/* Supporting Subtitle */}
        <p 
          className="text-sm sm:text-base md:text-lg text-gray-200 font-light max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] animate-fade-in-up"
          style={{ animationDuration: '0.9s', animationDelay: '0.35s', animationFillMode: 'both' }}
        >
          Elevated nail designs, handcrafted for your style.
        </p>

        {/* CTA Buttons: Refined, Minimal & Tactile */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto pointer-events-auto animate-fade-in-up flex-wrap"
          style={{ animationDuration: '0.9s', animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          {/* Primary CTA: Shop */}
          <button
            onClick={onShopClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:shadow-white/10 active:scale-[0.98] inline-flex items-center justify-center gap-2 group"
          >
            <span>SHOP COLLECTION</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary CTA: Design Your Own */}
          <button
            onClick={onCustomStudioClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600/90 text-white font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] inline-flex items-center justify-center gap-2 border border-blue-400/40 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold transition-transform group-hover:scale-110" />
            <span>DESIGN YOUR OWN</span>
          </button>

          {/* Tertiary CTA: Premium */}
          <button
            onClick={onExplorePremiumClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black/50 backdrop-blur-md text-white font-medium text-xs sm:text-sm tracking-[0.16em] uppercase border border-white/25 transition-all duration-300 hover:border-white/60 hover:bg-black/70 active:scale-[0.98] inline-flex items-center justify-center gap-2 group"
          >
            <Gem className="w-3.5 h-3.5 text-champagne-gold transition-transform duration-300 group-hover:scale-110" />
            <span>VIEW PREMIUM</span>
            <span className="text-[11px] text-champagne-soft font-semibold ml-0.5">₹299</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Subtle Trust Badges */}
      <div 
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-gray-300 font-medium tracking-wider pointer-events-auto animate-fade-in"
        style={{ animationDuration: '1s', animationDelay: '0.65s', animationFillMode: 'both' }}
      >
        <div className="flex items-center gap-1.5 drop-shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>100% Handmade Nails</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
        <div className="flex items-center gap-1.5 drop-shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Normal: 72 Nails (3 Packs × 24)</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
        <div className="flex items-center gap-1.5 drop-shadow-md">
          <Gem className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Premium: 10 Nails (₹299)</span>
        </div>
      </div>

    </div>
  );
};
