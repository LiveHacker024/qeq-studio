import React from 'react';
import { BASE_COLOR_PRESETS } from '../../data/customStudioData';
import { Check, Palette, Sparkles } from 'lucide-react';

interface NailColorSelectorProps {
  selectedColorName: string;
  selectedColorHex: string;
  isCustomColor: boolean;
  customColorHex: string;
  onSelectPreset: (name: string, hex: string) => void;
  onCustomColorChange: (hex: string) => void;
}

export const NailColorSelector: React.FC<NailColorSelectorProps> = ({
  selectedColorName,
  selectedColorHex,
  isCustomColor,
  customColorHex,
  onSelectPreset,
  onCustomColorChange
}) => {
  return (
    <div className="space-y-4">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 block mb-1">
            Step 1 • Base Palette
          </span>
          <h3 className="text-base font-bold text-white tracking-tight">
            SELECT BASE COLOR
          </h3>
        </div>

        {/* Selected indicator pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200">
          <span 
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs" 
            style={{ backgroundColor: isCustomColor ? customColorHex : selectedColorHex }}
          />
          <span className="font-semibold">
            {isCustomColor ? `Custom (${customColorHex.toUpperCase()})` : selectedColorName}
          </span>
        </div>
      </div>

      {/* Color Swatches Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3">
        {BASE_COLOR_PRESETS.map((preset) => {
          const isSelected = preset.isCustom ? isCustomColor : (!isCustomColor && selectedColorName === preset.name);
          const displayHex = preset.isCustom ? customColorHex : preset.hex;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                if (preset.isCustom) {
                  onCustomColorChange(customColorHex);
                } else {
                  onSelectPreset(preset.name, preset.hex);
                }
              }}
              className={`p-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border relative group ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-400 shadow-lg shadow-blue-900/30 -translate-y-0.5'
                  : 'bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10'
              }`}
            >
              {/* Color Disc */}
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 relative"
                style={{ 
                  backgroundColor: preset.isCustom ? customColorHex : preset.hex,
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 10px rgba(0,0,0,0.5)'
                }}
              >
                {preset.isCustom && !isSelected && (
                  <Palette className="w-4 h-4 text-white/90 drop-shadow-md" />
                )}
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>

              {/* Swatch Name */}
              <span className={`text-[10px] sm:text-[11px] font-medium tracking-tight text-center leading-tight truncate w-full px-1 ${
                isSelected ? 'text-white font-bold' : 'text-gray-300 group-hover:text-white'
              }`}>
                {preset.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Color Picker Drawer (Active when Custom Color is selected) */}
      {isCustomColor && (
        <div className="p-4 rounded-2xl bg-[#12121A] border border-blue-500/40 shadow-xl animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={customColorHex}
                onChange={(e) => onCustomColorChange(e.target.value)}
                className="w-11 h-11 rounded-xl cursor-pointer bg-transparent border-0 p-0 overflow-hidden shadow-md"
                id="custom-color-picker"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Custom Shade Mixer
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Click color box to pick any custom hexadecimal tone
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-gray-400 font-mono">HEX</span>
            <input
              type="text"
              value={customColorHex.toUpperCase()}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onCustomColorChange(val);
                }
              }}
              className="bg-black/60 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-mono uppercase tracking-wider w-24 focus:outline-none focus:border-blue-400"
              maxLength={7}
            />
          </div>
        </div>
      )}

      {/* Transparency Note */}
      <p className="text-[11px] text-gray-400 font-light leading-relaxed">
        <Sparkles className="w-3 h-3 text-champagne-gold inline mr-1" />
        Custom colors are blended to order during consultation to match your requested palette reference.
      </p>

    </div>
  );
};
