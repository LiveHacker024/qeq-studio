import React, { useState } from 'react';
import { CustomOrderState, CustomNailLength, CustomOrderType, CustomDesignReference } from '../../types/customOrder';
import { BASE_COLOR_PRESETS, getCustomOrderWhatsappNumber, buildRetailWhatsappMessage, buildBulkWhatsappMessage } from '../../data/customStudioData';
import { NailCustomizerPreview } from './NailCustomizerPreview';
import { NailColorSelector } from './NailColorSelector';
import { NailDesignSelector } from './NailDesignSelector';
import { NailSizeSelector } from './NailSizeSelector';
import { CustomOrderForm } from './CustomOrderForm';
import { BulkOrderForm } from './BulkOrderForm';
import { CustomOrderSummary } from './CustomOrderSummary';
import { Sparkles, MessageCircle, AlertCircle, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

export const CustomNailStudio: React.FC = () => {
  // Master Customizer State
  const [orderState, setOrderState] = useState<CustomOrderState>({
    orderType: 'retail',
    size: 'Medium',
    colorName: BASE_COLOR_PRESETS[0].name,
    colorHex: BASE_COLOR_PRESETS[0].hex,
    isCustomColor: false,
    customColorHex: '#C89B7B',
    design: 'Solid',
    designReference: null,
    
    // Retail fields
    name: '',
    phone: '',
    email: '',
    retailQuantity: 1,
    notes: '',
    
    // Bulk fields
    businessName: '',
    contactPerson: '',
    bulkPhone: '',
    bulkEmail: '',
    bulkQuantity: 100,
    packagingRequirements: '',
    privateLabel: '',
    bulkNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Color preset change handler
  const handleSelectColorPreset = (name: string, hex: string) => {
    setOrderState(prev => ({
      ...prev,
      colorName: name,
      colorHex: hex,
      isCustomColor: false
    }));
  };

  // Custom hex color handler
  const handleCustomColorChange = (hex: string) => {
    setOrderState(prev => ({
      ...prev,
      colorName: 'Custom Color',
      colorHex: hex,
      isCustomColor: true,
      customColorHex: hex
    }));
  };

  // Design change handler
  const handleSelectDesign = (design: string) => {
    setOrderState(prev => ({ ...prev, design }));
  };

  // Reference image upload handler
  const handleUploadReference = (designReference: CustomDesignReference | null) => {
    setOrderState(prev => ({ ...prev, designReference }));
  };

  // Size change handler
  const handleSelectSize = (size: CustomNailLength) => {
    setOrderState(prev => ({ ...prev, size }));
    if (errors.size) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.size;
        return next;
      });
    }
  };

  // Order type switcher
  const handleSelectOrderType = (orderType: CustomOrderType) => {
    setOrderState(prev => ({ ...prev, orderType }));
    setErrors({});
  };

  // Field updates
  const handleFieldChange = (fields: Partial<CustomOrderState>) => {
    setOrderState(prev => ({ ...prev, ...fields }));
    // Clear errors for edited fields
    setErrors(prev => {
      const next = { ...prev };
      Object.keys(fields).forEach(key => delete next[key]);
      return next;
    });
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!orderState.size) {
      newErrors.size = 'Please select a nail length (Long, Medium, or Short).';
    }

    if (orderState.orderType === 'retail') {
      if (!orderState.name.trim()) {
        newErrors.name = 'Please enter your full name.';
      }
      const cleanPhone = orderState.phone.replace(/[^0-9]/g, '');
      if (!orderState.phone.trim() || cleanPhone.length < 10) {
        newErrors.phone = 'Please provide a valid 10-digit WhatsApp phone number.';
      }
      if (!orderState.retailQuantity || orderState.retailQuantity < 1) {
        newErrors.quantity = 'Quantity must be at least 1 set.';
      }
    } else {
      // Bulk order validations
      if (!orderState.businessName.trim()) {
        newErrors.businessName = 'Please enter your brand or business name.';
      }
      if (!orderState.contactPerson.trim()) {
        newErrors.contactPerson = 'Please enter contact person name.';
      }
      const cleanBulkPhone = orderState.bulkPhone.replace(/[^0-9]/g, '');
      if (!orderState.bulkPhone.trim() || cleanBulkPhone.length < 10) {
        newErrors.phone = 'Please provide a valid 10-digit WhatsApp contact number.';
      }
      if (!orderState.bulkEmail.trim() || !orderState.bulkEmail.includes('@')) {
        newErrors.email = 'Please provide a valid business email address.';
      }
      if (!orderState.bulkQuantity || orderState.bulkQuantity < 100) {
        newErrors.quantity = 'Bulk custom orders require a minimum quantity of 100 pieces.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit via WhatsApp
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) {
      // Scroll to error area smoothly
      const formElement = document.getElementById('custom-order-form-controls');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const whatsappNumber = getCustomOrderWhatsappNumber();
    const message = orderState.orderType === 'bulk'
      ? buildBulkWhatsappMessage(orderState)
      : buildRetailWhatsappMessage(orderState);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
    setSubmissionSuccess(true);
  };

  const isBulk = orderState.orderType === 'bulk';

  return (
    <section id="custom-studio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-[0.25em] uppercase mb-3 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Bespoke Atelier</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase mb-4">
          DESIGN YOUR OWN NAILS
        </h2>

        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          Create a nail design that feels uniquely yours.
        </p>
      </div>

      {/* 2. Main Studio Grid: Left (Preview) | Right (Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: Interactive Live Nail Preview (Sticky on desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <NailCustomizerPreview
            colorHex={orderState.isCustomColor ? orderState.customColorHex : orderState.colorHex}
            colorName={orderState.colorName}
            isCustomColor={orderState.isCustomColor}
            design={orderState.design}
            size={orderState.size}
            designReference={orderState.designReference}
            orderType={orderState.orderType}
          />

          {/* Luxury Atelier Guarantee Tag */}
          <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-gray-300 text-xs font-light">
            <ShieldCheck className="w-4 h-4 text-champagne-gold shrink-0" />
            <span>
              Every custom order is reviewed individually by QeQ STUDIO nail artists for finish perfection.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Customization Controls & Order System */}
        <div id="custom-order-form-controls" className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: Base Color */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0B10] border border-white/10 shadow-xl">
            <NailColorSelector
              selectedColorName={orderState.colorName}
              selectedColorHex={orderState.colorHex}
              isCustomColor={orderState.isCustomColor}
              customColorHex={orderState.customColorHex}
              onSelectPreset={handleSelectColorPreset}
              onCustomColorChange={handleCustomColorChange}
            />
          </div>

          {/* STEP 2: Nail Design & Optional Reference Upload */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0B10] border border-white/10 shadow-xl">
            <NailDesignSelector
              selectedDesign={orderState.design}
              onSelectDesign={handleSelectDesign}
              designReference={orderState.designReference}
              onUploadReference={handleUploadReference}
            />
          </div>

          {/* STEP 3: Nail Size (Length: Long, Medium, Short) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0B10] border border-white/10 shadow-xl">
            <NailSizeSelector
              selectedSize={orderState.size}
              onSelectSize={handleSelectSize}
              error={errors.size}
            />
          </div>

          {/* STEP 4: Order Type Tabs (Retail vs Bulk) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0B10] border border-white/10 shadow-xl space-y-6">
            
            {/* Order Type Toggle Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 block mb-1">
                Order Classification
              </span>
              <h3 className="text-base font-bold text-white tracking-tight mb-3">
                SELECT CUSTOM ORDER TYPE
              </h3>

              <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-black/50 border border-white/10">
                <button
                  type="button"
                  onClick={() => handleSelectOrderType('retail')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    !isBulk
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  RETAIL CUSTOM
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectOrderType('bulk')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                    isBulk
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/40 font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  BULK / WHOLESALE
                </button>
              </div>
            </div>

            {/* Active Form */}
            {!isBulk ? (
              <CustomOrderForm
                name={orderState.name}
                phone={orderState.phone}
                email={orderState.email}
                quantity={orderState.retailQuantity}
                notes={orderState.notes}
                errors={errors}
                onChange={handleFieldChange}
              />
            ) : (
              <BulkOrderForm
                businessName={orderState.businessName}
                contactPerson={orderState.contactPerson}
                phone={orderState.bulkPhone}
                email={orderState.bulkEmail}
                quantity={orderState.bulkQuantity}
                packagingRequirements={orderState.packagingRequirements}
                privateLabel={orderState.privateLabel}
                notes={orderState.bulkNotes}
                errors={errors}
                onChange={handleFieldChange}
              />
            )}

          </div>

          {/* STEP 5: Order Summary Card */}
          <CustomOrderSummary state={orderState} />

          {/* Global Validation Error Banner (if any) */}
          {Object.keys(errors).length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-rose-200 block">
                  Please complete all required fields before submitting:
                </span>
                <ul className="text-xs text-rose-300 list-disc list-inside mt-1 space-y-0.5">
                  {Object.values(errors).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Submission Feedback Toast */}
          {submissionSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-emerald-200">
                <span className="font-bold">WhatsApp inquiry launched!</span> If your WhatsApp app did not open automatically, check popup permissions or use the button below.
              </div>
            </div>
          )}

          {/* STEP 6: WhatsApp Action Button & Disclaimers */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppSubmit}
              className={`w-full py-4 px-8 rounded-full font-bold text-xs sm:text-sm tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl group ${
                isBulk
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/30 active:scale-[0.99]'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 active:scale-[0.99]'
              }`}
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>
                {isBulk
                  ? 'REQUEST BULK QUOTE ON WHATSAPP'
                  : 'REQUEST CUSTOM ORDER ON WHATSAPP'}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Disclaimer & Transparency Subtext */}
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-300 font-medium">
                Your request will be sent to QeQ STUDIO via WhatsApp.
              </p>
              <p className="text-[11px] text-gray-400 font-light">
                Official Studio WhatsApp: +91 84473 11551 • Custom pricing will be shared based on your requirements and quantity.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
