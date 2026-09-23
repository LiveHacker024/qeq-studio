import React, { useState } from 'react';
import { NailSize } from '../../types';
import { Ruler, Sparkles, HelpCircle } from 'lucide-react';

interface SizeSelectorProps {
  selectedSize: NailSize;
  onSelectSize: (size: NailSize) => void;
  onOpenSizeGuide: () => void;
  customSizes?: {
    thumb: string;
    index: string;
    middle: string;
    ring: string;
    pinky: string;
  };
  onCustomSizesChange?: (sizes: {
    thumb: string;
    index: string;
    middle: string;
    ring: string;
    pinky: string;
  }) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
  customSizes = { thumb: '16mm', index: '12mm', middle: '13mm', ring: '12mm', pinky: '9mm' },
  onCustomSizesChange
}) => {
  const sizes: NailSize[] = ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'];

  const handleCustomChange = (finger: keyof typeof customSizes, val: string) => {
    if (onCustomSizesChange) {
      onCustomSizesChange({
        ...customSizes,
        [finger]: val
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-200">
            Select Size
          </span>
          <span className="text-xs text-blue-400 font-semibold">
            (Selected: {selectedSize})
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="text-xs text-champagne-soft hover:text-white underline flex items-center gap-1.5 transition-colors font-medium"
        >
          <Ruler className="w-3.5 h-3.5 text-champagne-gold" />
          <span>How to measure your nails</span>
        </button>
      </div>

      {/* Size Buttons Grid */}
      <div className="grid grid-cols-6 gap-2">
        {sizes.map(size => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`py-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-102'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/10'
              }`}
            >
              <span>{size}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Size Form if CUSTOM is selected */}
      {selectedSize === 'CUSTOM' && (
        <div className="p-4 rounded-2xl bg-white/5 border border-blue-500/30 mt-2 flex flex-col gap-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-blue-300">Custom Atelier Fit (mm)</span>
            <span className="text-[10px] text-gray-400">Specify width of nail beds</span>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Thumb</label>
              <input
                type="text"
                value={customSizes.thumb}
                onChange={e => handleCustomChange('thumb', e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg py-1.5 px-2 text-center text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Index</label>
              <input
                type="text"
                value={customSizes.index}
                onChange={e => handleCustomChange('index', e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg py-1.5 px-2 text-center text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Middle</label>
              <input
                type="text"
                value={customSizes.middle}
                onChange={e => handleCustomChange('middle', e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg py-1.5 px-2 text-center text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Ring</label>
              <input
                type="text"
                value={customSizes.ring}
                onChange={e => handleCustomChange('ring', e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg py-1.5 px-2 text-center text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Pinky</label>
              <input
                type="text"
                value={customSizes.pinky}
                onChange={e => handleCustomChange('pinky', e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-lg py-1.5 px-2 text-center text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
