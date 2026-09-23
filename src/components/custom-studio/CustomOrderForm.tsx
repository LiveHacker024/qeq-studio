import React from 'react';
import { User, Phone, Mail, Plus, Minus, FileText } from 'lucide-react';

interface CustomOrderFormProps {
  name: string;
  phone: string;
  email: string;
  quantity: number;
  notes: string;
  errors: Record<string, string>;
  onChange: (fields: Partial<{
    name: string;
    phone: string;
    email: string;
    quantity: number;
    notes: string;
  }>) => void;
}

export const CustomOrderForm: React.FC<CustomOrderFormProps> = ({
  name,
  phone,
  email,
  quantity,
  notes,
  errors,
  onChange
}) => {
  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 block mb-1">
          Step 4 • Retail Bespoke Details
        </span>
        <h3 className="text-base font-bold text-white tracking-tight">
          YOUR CONTACT & ORDER PREFERENCES
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Enter your contact details so our nail artisan can reach out on WhatsApp with quotes & options.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Name (Required) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Ananya Sharma"
              className={`w-full bg-[#12121A] border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/15 focus:border-blue-400'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone (Required) */}
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
                errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/15 focus:border-blue-400'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Email Address <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="e.g. ananya@example.com"
              className="w-full bg-[#12121A] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>

        {/* Quantity (Retail Normal Quantity Selector) */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Set Quantity <span className="text-rose-400">*</span>
          </label>
          <div className="flex items-center gap-3 bg-[#12121A] border border-white/15 rounded-xl px-3 py-1.5">
            <button
              type="button"
              onClick={() => onChange({ quantity: Math.max(1, quantity - 1) })}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="flex-1 text-center font-bold text-sm text-white">
              {quantity} {quantity === 1 ? 'Set' : 'Sets'}
            </span>

            <button
              type="button"
              onClick={() => onChange({ quantity: quantity + 1 })}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Additional Notes Textarea */}
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          Additional Notes or Specific Instructions <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <textarea
            value={notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Tell us about specific finger sizes, accent preferences, or finish details..."
            rows={3}
            className="w-full bg-[#12121A] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors resize-none"
          />
        </div>
      </div>

    </div>
  );
};
