import React, { useState } from 'react';
import { Layers, Sparkles, Shield, Eye, Droplet, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export const AnatomyOfLuxury: React.FC<{ onNavigateShop?: () => void }> = ({ onNavigateShop }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      title: '1. Gloss Top Coat',
      desc: 'Protective clear gloss layer ensuring smooth finish and vibrant color retention.',
      icon: Shield,
      highlight: 'Protective Finish'
    },
    {
      title: '2. Hand-Applied Embellishments',
      desc: 'Handcrafted design accents and 3D detailing placed individually by hand.',
      icon: Sparkles,
      highlight: 'Handmade Detail'
    },
    {
      title: '3. Reflective Accent Layer',
      desc: 'Fine shimmer and color-shifting particles that elevate the visual aesthetic.',
      icon: Eye,
      highlight: 'Visual Dimension'
    },
    {
      title: '4. High-Pigment Color Base',
      desc: 'Rich base color application formulated for full opacity and clean gradients.',
      icon: Droplet,
      highlight: 'Color Depth'
    },
    {
      title: '5. Ergonomic Flexible Nail Base',
      desc: 'Comfortable flexible base designed for natural nail alignment and comfortable wear.',
      icon: Layers,
      highlight: 'Comfort Fit'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* LEFT: Visual Exploded Layer Graphic */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden glass-dark border border-white/10 p-4 sm:p-6 group">
            
            <div className="relative rounded-2xl overflow-hidden bg-black/40">
              <img
                src={getAssetUrl('/assets/animation/anatomy-layers.png')}
                alt="QeQ Studio Press-On Nail Anatomical Layer Breakdown"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-102"
              />
              
              {/* Overlay Interactive Badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-2 text-xs text-champagne-soft">
                <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                <span>Handmade Layer Architecture</span>
              </div>
            </div>

            {/* Bottom mini caption */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-400 px-2">
              <span>Handmade Craftsmanship</span>
              <span className="text-blue-400 font-semibold">Layered Artistry</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Layer Selector & Craft Explanation */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-2 block">
            Inside The Atelier
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            THE ANATOMY OF CRAFT
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-8">
            Every QeQ STUDIO press-on nail is handcrafted in layers to combine lightweight comfort with refined design aesthetic.
          </p>

          {/* Interactive Layer Selector */}
          <div className="space-y-3 mb-8">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isActive = activeLayer === idx;

              return (
                <div
                  key={layer.title}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-950/50'
                      : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-semibold tracking-wide ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}>
                        {layer.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                      {layer.highlight}
                    </span>
                  </div>

                  {isActive && (
                    <p className="mt-3 text-xs text-gray-300 leading-relaxed pl-10 animate-fade-in font-light">
                      {layer.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {onNavigateShop && (
            <div>
              <button
                onClick={onNavigateShop}
                className="btn-luxury-primary text-xs uppercase tracking-widest py-3.5 px-7 inline-flex items-center gap-2"
              >
                <span>Browse All Designs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
