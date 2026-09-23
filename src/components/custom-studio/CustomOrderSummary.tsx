import React from 'react';
import { CustomOrderState } from '../../types/customOrder';
import { Sparkles, CheckCircle2, ShieldAlert, FileText, Image as ImageIcon } from 'lucide-react';

interface CustomOrderSummaryProps {
  state: CustomOrderState;
}

export const CustomOrderSummary: React.FC<CustomOrderSummaryProps> = ({ state }) => {
  const isBulk = state.orderType === 'bulk';
  const colorDisplay = state.isCustomColor
    ? `Custom Color (${state.customColorHex.toUpperCase()})`
    : state.colorName;

  const quantityDisplay = isBulk
    ? `${state.bulkQuantity} Pieces (Wholesale)`
    : `${state.retailQuantity} Set${state.retailQuantity > 1 ? 's' : ''} (Personal)`;

  const contactName = isBulk
    ? (state.contactPerson || state.businessName || 'Not specified')
    : (state.name || 'Not specified');

  const contactPhone = isBulk ? (state.bulkPhone || 'Not specified') : (state.phone || 'Not specified');

  return (
    <div className="rounded-3xl bg-[#0E0E17] border border-white/15 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-champagne-gold" />
          <h4 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white">
            CUSTOM ORDER SUMMARY
          </h4>
        </div>

        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
          isBulk
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            : 'bg-blue-600/15 text-blue-300 border-blue-500/30'
        }`}>
          {isBulk ? 'Bulk Manufacturing' : 'Retail Bespoke'}
        </span>
      </div>

      {/* Summary Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        
        {/* Order Type */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
            Order Type
          </span>
          <span className="text-xs font-bold text-white block truncate">
            {isBulk ? 'Bulk Wholesale' : 'Retail Custom'}
          </span>
        </div>

        {/* Quantity */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
            Quantity
          </span>
          <span className={`text-xs font-bold block truncate ${isBulk ? 'text-amber-300' : 'text-white'}`}>
            {quantityDisplay}
          </span>
        </div>

        {/* Nail Size */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
            Nail Length
          </span>
          <span className="text-xs font-bold text-blue-300 block truncate">
            {state.size}
          </span>
        </div>

        {/* Base Color */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
            Base Color
          </span>
          <div className="flex items-center gap-1.5 truncate">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0"
              style={{ backgroundColor: state.isCustomColor ? state.customColorHex : state.colorHex }}
            />
            <span className="text-xs font-bold text-white truncate">
              {colorDisplay}
            </span>
          </div>
        </div>

      </div>

      {/* Secondary Details Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs text-gray-300">
        
        {/* Design & Reference */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Design Style
            </span>
            <span className="font-bold text-white">{state.design}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <ImageIcon className="w-3 h-3 text-blue-400" />
              <span>Reference File</span>
            </span>
            <span className="text-[11px] font-medium text-gray-300 truncate max-w-[150px]">
              {state.designReference ? state.designReference.name : 'None attached'}
            </span>
          </div>
        </div>

        {/* Contact info preview */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Contact
            </span>
            <span className="font-bold text-white truncate max-w-[160px]">
              {contactName}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Phone
            </span>
            <span className="text-[11px] font-medium text-gray-300">
              {contactPhone}
            </span>
          </div>
        </div>

      </div>

      {/* Pricing and Manufacturing Notice (Transparent & Accurate) */}
      <div className="p-4 rounded-2xl bg-[#09090F] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <span className="text-xs font-semibold text-gray-200 block">
              Custom pricing will be shared based on your requirements and quantity.
            </span>
            {isBulk && (
              <span className="text-[11px] text-amber-300/90 font-medium block mt-0.5">
                Minimum order quantity: 100 pieces
              </span>
            )}
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-gold px-2.5 py-1 rounded-lg bg-white/5 border border-champagne-gold/20 shrink-0 self-start sm:self-auto">
          WhatsApp Consultation
        </span>
      </div>

    </div>
  );
};
