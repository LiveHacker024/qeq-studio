import React from 'react';
import { CustomNailLength } from '../../types/customOrder';
import { NAIL_LENGTH_CARDS } from '../../data/customStudioData';
import { Check, Sparkles } from 'lucide-react';

interface NailSizeSelectorProps {
  selectedSize: CustomNailLength;
  onSelectSize: (size: CustomNailLength) => void;
  error?: string;
}

export const NailSizeSelector: React.FC<NailSizeSelectorProps> = ({
  selectedSize,
  onSelectSize,
  error
}) => {
  return (
    <div className="space-y-4">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 block mb-1">
            Step 3 • Silhouette Length <span className="text-rose-400 font-semibold">*Required</span>
          </span>
          <h3 className="text-base font-bold text-white tracking-tight">
            CHOOSE NAIL LENGTH
          </h3>
        </div>

        <div className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-xs text-blue-300 font-bold uppercase tracking-wider">
          {selectedSize}
        </div>
      </div>

      {/* 3 Length Cards: Long, Medium, Short */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {NAIL_LENGTH_CARDS.map((card) => {
          const isSelected = selectedSize === card.length;

          return (
            <button
              key={card.length}
              type="button"
              onClick={() => onSelectSize(card.length)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-blue-950/50 border-blue-400 shadow-xl shadow-blue-950/40 ring-1 ring-blue-400/50 -translate-y-1'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {/* Header with Visual Bar & Check */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold tracking-widest uppercase ${
                    isSelected ? 'text-white' : 'text-gray-200'
                  }`}>
                    {card.title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    • {card.subtitle}
                  </span>
                </div>

                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/50">
                    <Check className="w-3 h-3" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                )}
              </div>

              {/* Silhouette Visual Indicator Bar */}
              <div className="w-full bg-black/40 rounded-xl p-2.5 mb-3 flex items-center justify-center border border-white/5">
                <div 
                  className={`w-5 rounded-t-xl rounded-b-md bg-gradient-to-t from-gray-500 to-white/90 shadow-sm transition-all duration-300 ${card.visualHeight} ${
                    isSelected ? 'from-blue-600 to-blue-300 shadow-blue-500/40' : 'opacity-60'
                  }`}
                />
              </div>

              {/* Description */}
              <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Inline Validation Error */}
      {error && (
        <p className="text-xs text-rose-400 font-semibold mt-1 animate-fade-in">
          {error}
        </p>
      )}

      {/* Sizing Information Note */}
      <p className="text-[11px] text-gray-400 font-light leading-relaxed">
        <Sparkles className="w-3 h-3 text-champagne-gold inline mr-1" />
        Individual custom nail sizing measurements are confirmed directly with our nail master upon WhatsApp order submission.
      </p>

    </div>
  );
};
