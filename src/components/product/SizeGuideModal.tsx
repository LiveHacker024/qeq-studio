import React from 'react';
import { useStore } from '../../context/StoreContext';
import { SIZE_CHART_DATA } from '../../data/initialConfig';
import { X, Ruler, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden glass-dark-elevated border border-white/20 shadow-2xl bg-[#0C0C14] max-h-[90vh] flex flex-col p-6 sm:p-8 overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
            <Ruler className="w-4 h-4 text-champagne-gold" />
            <span>Atelier Measurement Guide</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
            FIND YOUR PERFECT NAIL SIZE
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm font-light mt-1">
            Follow our 3-step tape measurement method to identify your exact custom nail fit.
          </p>
        </div>

        {/* Step-by-Step Measurement Illustration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 1</span>
            <h4 className="font-bold text-white mb-1">Apply Clear Tape</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Place clear tape horizontally across the widest point of your natural nail bed.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 2</span>
            <h4 className="font-bold text-white mb-1">Mark Sidewalls</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Use a fine pen to mark the precise left and right edges where nail meets skin.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="font-mono text-blue-400 font-bold block mb-1">STEP 3</span>
            <h4 className="font-bold text-white mb-1">Measure in Millimeters</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Remove tape, stick flat on a metric ruler, and measure millimeters between marks.
            </p>
          </div>
        </div>

        {/* Standard Sizes Chart Table */}
        <div className="mb-6">
          <h3 className="font-editorial text-sm font-bold text-white uppercase tracking-wider mb-3">
            Standard Size Breakdown
          </h3>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/10 text-white font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Thumb</th>
                  <th className="py-2.5 px-3">Index</th>
                  <th className="py-2.5 px-3">Middle</th>
                  <th className="py-2.5 px-3">Ring</th>
                  <th className="py-2.5 px-3">Pinky</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-[#08080C]">
                {SIZE_CHART_DATA.map(row => (
                  <tr key={row.size} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-blue-400 font-mono">{row.size}</td>
                    <td className="py-2.5 px-3">{row.thumb}</td>
                    <td className="py-2.5 px-3">{row.index}</td>
                    <td className="py-2.5 px-3">{row.middle}</td>
                    <td className="py-2.5 px-3">{row.ring}</td>
                    <td className="py-2.5 px-3">{row.pinky}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Atelier Pro Tip */}
        <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-gray-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-champagne-gold shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white font-semibold">Atelier Pro Tip:</strong> If your measurements fall between two standard sizes, we recommend selecting the smaller size for adhesive tabs, or the larger size if you plan to gently file sidewalls for a bespoke contour fit.
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6"
          >
            Got It, Thanks
          </button>
        </div>

      </div>
    </div>
  );
};
