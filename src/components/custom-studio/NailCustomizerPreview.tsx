import React, { useState } from 'react';
import { CustomNailLength, CustomDesignReference } from '../../types/customOrder';
import { Sparkles, Eye, Image as ImageIcon, Check } from 'lucide-react';

interface NailCustomizerPreviewProps {
  colorHex: string;
  colorName: string;
  isCustomColor: boolean;
  design: string;
  size: CustomNailLength;
  designReference: CustomDesignReference | null;
  orderType: 'retail' | 'bulk';
}

export const NailCustomizerPreview: React.FC<NailCustomizerPreviewProps> = ({
  colorHex,
  colorName,
  isCustomColor,
  design,
  size,
  designReference,
  orderType
}) => {
  const [viewMode, setViewMode] = useState<'stand' | 'hand'>('stand');

  // Nail geometric properties based on length
  const lengthConfig = {
    Long: {
      height: 'h-36 sm:h-44',
      scale: 1.25,
      shapeClass: 'rounded-t-[32px] rounded-b-[10px]',
      apexLabel: 'Long Sculpted Apex',
      crescentHeight: 'h-10'
    },
    Medium: {
      height: 'h-28 sm:h-36',
      scale: 1.0,
      shapeClass: 'rounded-t-[24px] rounded-b-[12px]',
      apexLabel: 'Medium Salon Taper',
      crescentHeight: 'h-8'
    },
    Short: {
      height: 'h-20 sm:h-26',
      scale: 0.75,
      shapeClass: 'rounded-t-[18px] rounded-b-[14px]',
      apexLabel: 'Short Ergonomic Curve',
      crescentHeight: 'h-6'
    }
  }[size];

  // 5 nails configuration for proportional display
  const nails = [
    { label: 'Thumb', width: 'w-8 sm:w-11', heightMod: 'scale-y-[0.96]', z: 1 },
    { label: 'Index', width: 'w-7 sm:w-9', heightMod: 'scale-y-[1.0]', z: 2 },
    { label: 'Middle', width: 'w-7.5 sm:w-10', heightMod: 'scale-y-[1.04]', z: 3 },
    { label: 'Ring', width: 'w-7 sm:w-9', heightMod: 'scale-y-[1.0]', z: 2 },
    { label: 'Pinky', width: 'w-6 sm:w-8', heightMod: 'scale-y-[0.88]', z: 1 }
  ];

  return (
    <div className="w-full bg-[#0C0C12] rounded-3xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      
      {/* Subtle Background Glows */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: colorHex }}
      />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-gray-300">
            Design Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Order Type Tag */}
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border ${
            orderType === 'bulk' 
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
              : 'bg-blue-600/15 text-blue-300 border-blue-500/30'
          }`}>
            {orderType === 'bulk' ? 'Bulk Studio (100+)' : 'Retail Bespoke'}
          </span>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'stand' ? 'hand' : 'stand')}
            className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-white px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors inline-flex items-center gap-1.5"
            title="Switch presentation angle"
          >
            <Eye className="w-3 h-3 text-blue-400" />
            <span>{viewMode === 'stand' ? 'Stand View' : 'Array View'}</span>
          </button>
        </div>
      </div>

      {/* Center Interactive Nail Display Stage */}
      <div className="relative z-10 py-6 sm:py-10 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[320px]">
        
        {/* Luxury Pedestal Stand Base */}
        <div className="relative w-full max-w-md mx-auto flex items-end justify-center gap-2 sm:gap-3.5 px-4">
          
          {nails.map((nail, idx) => (
            <div 
              key={nail.label}
              className={`relative flex flex-col items-center group/nail transition-all duration-500 ${nail.heightMod}`}
              style={{ zIndex: nail.z }}
            >
              {/* Nail Item */}
              <div
                className={`relative ${nail.width} ${lengthConfig.height} ${lengthConfig.shapeClass} overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer`}
                style={{
                  backgroundColor: colorHex,
                  boxShadow: `0 14px 28px -6px rgba(0,0,0,0.85), inset 2px 2px 6px rgba(255,255,255,0.45), inset -2px -2px 8px rgba(0,0,0,0.55)`
                }}
              >
                {/* 1. Design Layer: French Tip */}
                {design === 'French Tip' && (
                  <div 
                    className={`absolute top-0 left-0 right-0 ${lengthConfig.crescentHeight} rounded-t-[28px] border-b-2 border-white/60 bg-gradient-to-b from-white/90 via-white/80 to-white/30 backdrop-blur-xs`}
                  />
                )}

                {/* 2. Design Layer: Ombre */}
                {design === 'Ombre' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/80 pointer-events-none" />
                )}

                {/* 3. Design Layer: Glitter */}
                {design === 'Glitter' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-200/40 via-yellow-100/20 to-transparent pointer-events-none flex flex-col justify-between p-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/90 animate-ping opacity-75 self-end" />
                    <div className="w-1 h-1 rounded-full bg-amber-200/90 self-start ml-1" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/90 self-center" />
                  </div>
                )}

                {/* 4. Design Layer: Floral */}
                {design === 'Floral' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-white/80 drop-shadow-sm">
                      <path d="M12 2a4 4 0 0 0-4 4c0 2 2 4 4 4s4-2 4-4a4 4 0 0 0-4-4z" strokeWidth="1.5"/>
                      <path d="M12 10v12M8 14c-2 0-4 1-4 3s2 3 4 3M16 14c2 0 4 1 4 3s-2 3-4 3" strokeWidth="1.5"/>
                    </svg>
                  </div>
                )}

                {/* 5. Design Layer: Minimal */}
                {design === 'Minimal' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[1.5px] h-3/4 bg-white/70 shadow-sm" />
                    <div className="absolute top-3 w-1.5 h-1.5 rounded-full bg-champagne-gold shadow-sm" />
                  </div>
                )}

                {/* 6. Design Layer: Custom Design */}
                {design === 'Custom Design' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-1 bg-black/20 pointer-events-none">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
                    <span className="text-[7px] font-bold text-white uppercase tracking-tighter mt-0.5 opacity-90">
                      Bespoke
                    </span>
                  </div>
                )}

                {/* Realistic Specular Gloss Curve & Curvature Highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute top-1 left-1.5 w-1 h-3/5 rounded-full bg-white/35 blur-[0.5px] pointer-events-none" />
              </div>

              {/* Pedestal Shadow */}
              <div className="w-full h-1.5 bg-black/60 rounded-full blur-xs mt-2" />

              {/* Sub-label */}
              <span className="text-[9px] text-gray-400 font-medium tracking-wider mt-1 opacity-70 group-hover/nail:opacity-100 transition-opacity">
                {nail.label}
              </span>
            </div>
          ))}

        </div>

        {/* Presentation Stand Shadow / Base Bar */}
        <div className="w-full max-w-xs sm:max-w-sm h-3 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xs mt-3" />
      </div>

      {/* Uploaded Reference Visual Badge (if uploaded) */}
      {designReference && (
        <div className="relative z-10 mb-4 p-3 rounded-2xl bg-[#14141E] border border-blue-500/30 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black">
              <img 
                src={designReference.previewUrl} 
                alt="Uploaded Reference" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="text-xs font-semibold text-white truncate">
                  Custom Reference Attached
                </span>
              </div>
              <p className="text-[11px] text-gray-400 truncate">
                {designReference.name}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 shrink-0 flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>Ready</span>
          </span>
        </div>
      )}

      {/* Bottom Configuration Badges */}
      <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        {/* Color Pill */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">
            Base Color
          </span>
          <div className="flex items-center gap-1.5">
            <span 
              className="w-3 h-3 rounded-full border border-white/30 shadow-xs shrink-0" 
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-xs font-bold text-white truncate">
              {isCustomColor ? 'Custom Shade' : colorName}
            </span>
          </div>
        </div>

        {/* Design Pill */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">
            Design
          </span>
          <span className="text-xs font-bold text-white truncate">
            {design}
          </span>
        </div>

        {/* Length Pill */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 mb-1">
            Nail Length
          </span>
          <span className="text-xs font-bold text-blue-300 truncate">
            {size.toUpperCase()}
          </span>
        </div>
      </div>

    </div>
  );
};
