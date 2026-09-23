import React from 'react';
import { QualityTier, NailShape, NailLength, NailFinish } from '../../types';
import { Filter, X, RotateCcw, Check } from 'lucide-react';

interface FilterState {
  tier: QualityTier | 'all';
  shape: string;
  length: string;
  finish: string;
  color: string;
  inStockOnly: boolean;
  maxPrice: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalResults: number;
  normalPrice: number;
  premiumPrice: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
  totalResults,
  normalPrice,
  premiumPrice
}) => {
  const shapes: NailShape[] = ['Almond', 'Coffin', 'Square', 'Oval', 'Stiletto', 'Ballerina'];
  const lengths: NailLength[] = ['Short', 'Medium', 'Long'];
  const finishes: NailFinish[] = [
    'High Gloss Gel',
    'Velvet Matte',
    '3D Embellished',
    'Magnetic Cat Eye',
    'Mirror Chrome',
    'Glitter Accent',
    'French Luxe',
    'Blush Ombre'
  ];

  const colors = [
    { name: 'Nude Blush', hex: '#E8B4B8' },
    { name: 'Opal Glaze', hex: '#F0E6EF' },
    { name: 'Smoky Rose', hex: '#C28B93' },
    { name: 'Milky Pearl', hex: '#FDFBF7' },
    { name: 'Royal Sapphire', hex: '#1A56DB' },
    { name: 'Champagne Shimmer', hex: '#E5C158' },
    { name: 'Midnight Obsidian', hex: '#1C1C24' },
    { name: 'Emerald Mirage', hex: '#1B493A' },
  ];

  const handleTierToggle = (tier: QualityTier | 'all') => {
    onFilterChange({ ...filters, tier });
  };

  const handleShapeToggle = (shape: string) => {
    onFilterChange({ ...filters, shape: filters.shape === shape ? '' : shape });
  };

  const handleLengthToggle = (length: string) => {
    onFilterChange({ ...filters, length: filters.length === length ? '' : length });
  };

  const handleFinishToggle = (finish: string) => {
    onFilterChange({ ...filters, finish: filters.finish === finish ? '' : finish });
  };

  const handleColorToggle = (color: string) => {
    onFilterChange({ ...filters, color: filters.color === color ? '' : color });
  };

  const content = (
    <div className="flex flex-col gap-6 text-sm text-gray-300">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-400" />
          <span className="font-editorial text-sm font-bold uppercase tracking-wider text-white">
            Filters ({totalResults} Results)
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* 1. Quality Tier Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3">
          Quality Tier
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => handleTierToggle('all')}
            className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              filters.tier === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleTierToggle('normal')}
            className={`py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center ${
              filters.tier === 'normal'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <span>Normal</span>
            <span className="text-[10px] text-blue-200">₹{normalPrice}</span>
          </button>
          <button
            onClick={() => handleTierToggle('premium')}
            className={`py-2 px-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center ${
              filters.tier === 'premium'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <span>Premium</span>
            <span className="text-[10px] text-champagne-soft">₹{premiumPrice}</span>
          </button>
        </div>
      </div>

      {/* 2. Shape Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3">
          Nail Shape
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {shapes.map(s => {
            const isSelected = filters.shape === s;
            return (
              <button
                key={s}
                onClick={() => handleShapeToggle(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600/40 text-blue-200 border border-blue-500 font-bold'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Length Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3">
          Length
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {lengths.map(len => {
            const isSelected = filters.length === len;
            return (
              <button
                key={len}
                onClick={() => handleLengthToggle(len)}
                className={`py-2 text-center rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600/40 text-blue-200 border border-blue-500 font-bold'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {len}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Finish Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3">
          Finish & Technique
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {finishes.map(fin => {
            const isSelected = filters.finish === fin;
            return (
              <button
                key={fin}
                onClick={() => handleFinishToggle(fin)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600/20 text-blue-200 font-semibold'
                    : 'hover:bg-white/5 text-gray-400'
                }`}
              >
                <span>{fin}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Color Palette Swatches */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-3">
          Color Palette
        </h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(c => {
            const isSelected = filters.color === c.name;
            return (
              <button
                key={c.name}
                onClick={() => handleColorToggle(c.name)}
                title={c.name}
                className={`w-7 h-7 rounded-full transition-all relative border flex items-center justify-center ${
                  isSelected ? 'scale-110 border-blue-400 ring-2 ring-blue-500' : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && <Check className="w-3 h-3 text-black drop-shadow" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. In Stock Only */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-300 font-medium">In Stock Only</span>
        <button
          onClick={() => onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          className={`w-11 h-6 rounded-full transition-colors relative ${
            filters.inStockOnly ? 'bg-blue-600' : 'bg-white/20'
          }`}
        >
          <span
            className={`block w-4 h-4 rounded-full bg-white transition-transform ${
              filters.inStockOnly ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 glass-dark rounded-3xl p-6 border border-white/10 h-fit sticky top-28">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-xs bg-[#0C0C12] h-full p-6 overflow-y-auto border-l border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
                <span className="font-editorial text-lg font-bold text-white">Filter Catalog</span>
                <button onClick={onCloseMobile} className="text-gray-400 hover:text-white p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>
              {content}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <button
                onClick={onCloseMobile}
                className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5"
              >
                Show {totalResults} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
