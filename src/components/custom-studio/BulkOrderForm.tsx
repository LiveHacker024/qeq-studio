import React from 'react';
import { Building2, User, Phone, Mail, Package, Tag, FileText, AlertTriangle, Info } from 'lucide-react';

interface BulkOrderFormProps {
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  quantity: number;
  packagingRequirements: string;
  privateLabel: string;
  notes: string;
  errors: Record<string, string>;
  onChange: (fields: Partial<{
    businessName: string;
    contactPerson: string;
    phone: string;
    email: string;
    quantity: number;
    packagingRequirements: string;
    privateLabel: string;
    notes: string;
  }>) => void;
}

export const BulkOrderForm: React.FC<BulkOrderFormProps> = ({
  businessName,
  contactPerson,
  phone,
  email,
  quantity,
  packagingRequirements,
  privateLabel,
  notes,
  errors,
  onChange
}) => {
  const isQuantityValid = quantity >= 100;

  return (
    <div className="space-y-4">
      
      {/* Header & Prominent Bulk Notice */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400 block mb-1">
          Step 4 • Wholesale & Private Label Manufacturing
        </span>
        <h3 className="text-base font-bold text-white tracking-tight">
          BULK CUSTOM ORDER INQUIRY
        </h3>
        <p className="text-xs text-gray-300 mt-1 font-light">
          Tell us how you want your custom nail collection manufactured.
        </p>
      </div>

      {/* Prominent Minimum Bulk Quantity Badge */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold text-amber-200">
            Minimum bulk order: 100 pieces
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-amber-400/90 font-mono bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
          MOQ 100 PCS
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Brand / Business Name (Required) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Brand / Business Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={businessName}
              onChange={(e) => onChange({ businessName: e.target.value })}
              placeholder="e.g. Lumina Nail Lounge / ABC Store"
              className={`w-full bg-[#12121A] border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.businessName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/15 focus:border-amber-400'
              }`}
            />
          </div>
          {errors.businessName && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.businessName}</p>
          )}
        </div>

        {/* Contact Person (Required) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Contact Person <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => onChange({ contactPerson: e.target.value })}
              placeholder="e.g. John Doe / Sanya Verma"
              className={`w-full bg-[#12121A] border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.contactPerson ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/15 focus:border-amber-400'
              }`}
            />
          </div>
          {errors.contactPerson && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.contactPerson}</p>
          )}
        </div>

        {/* Phone Number (Required) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            WhatsApp Phone Number <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
              className={`w-full bg-[#12121A] border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/15 focus:border-amber-400'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Address (Required for Bulk) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Official Business Email <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="e.g. contact@business.com"
              className={`w-full bg-[#12121A] border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/15 focus:border-amber-400'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Bulk Quantity (Min 100) */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-gray-300">
              Bulk Quantity (Pieces) <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-amber-400 font-mono font-semibold">
              Min: 100 pcs
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Package className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min={1}
                value={quantity || ''}
                onChange={(e) => onChange({ quantity: parseInt(e.target.value, 10) || 0 })}
                placeholder="100"
                className={`w-full bg-[#12121A] border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono placeholder-gray-500 focus:outline-none transition-colors ${
                  !isQuantityValid || errors.quantity
                    ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-950/20'
                    : 'border-white/15 focus:border-amber-400'
                }`}
              />
            </div>

            {/* Quick Bulk Preset Buttons */}
            <div className="flex items-center gap-1.5">
              {[100, 250, 500, 1000].map((presetQty) => (
                <button
                  key={presetQty}
                  type="button"
                  onClick={() => onChange({ quantity: presetQty })}
                  className={`px-2.5 py-2 rounded-xl text-xs font-mono font-semibold transition-colors border ${
                    quantity === presetQty
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  {presetQty}
                </button>
              ))}
            </div>
          </div>

          {/* Validation Warning if < 100 */}
          {!isQuantityValid && (
            <div className="flex items-center gap-2 mt-2 text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/30 p-2.5 rounded-xl animate-fade-in">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Bulk custom orders require a minimum quantity of 100 pieces.</span>
            </div>
          )}
        </div>

        {/* Packaging Requirements (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Packaging Requirements <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Package className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={packagingRequirements}
              onChange={(e) => onChange({ packagingRequirements: e.target.value })}
              placeholder="e.g. Custom branded backing cards, eco boxes..."
              className="w-full bg-[#12121A] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Private Label / Branding Requirements (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Private Label / Branding <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Tag className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={privateLabel}
              onChange={(e) => onChange({ privateLabel: e.target.value })}
              placeholder="e.g. Custom logo stamping, barcode labels..."
              className="w-full bg-[#12121A] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

      </div>

      {/* Additional Requirements Textarea */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          Additional Manufacturing Requirements <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <textarea
            value={notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Specify any size distributions, launch timelines, finishing requirements, or special instructions..."
            rows={3}
            className="w-full bg-[#12121A] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>
      </div>

    </div>
  );
};
