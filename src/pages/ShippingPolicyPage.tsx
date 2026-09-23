import React, { useEffect } from 'react';
import { BUSINESS_INFO, INITIAL_STORE_CONFIG } from '../data/initialConfig';
import { Truck, Clock, PackageCheck, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const ShippingPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen text-gray-300">
      <SEOHead 
        title={`Shipping Policy | ${BUSINESS_INFO.brandName}`}
        description="Learn about dispatch timelines, pan-India delivery, express courier partners, and free shipping on orders above ₹599 from QeQ STUDIO."
      />

      {/* Header */}
      <div className="text-center mb-12 pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#C8A96B] uppercase tracking-widest mb-3">
          <Truck className="w-3.5 h-3.5" />
          <span>Pan-India Delivery</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          SHIPPING & DELIVERY POLICY
        </h1>
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last Updated: September 2026</span>
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed font-light">
        
        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C8A96B]" />
            1. Order Processing & Dispatch Timelines
          </h2>
          <p className="mb-2">
            Because every {BUSINESS_INFO.brandName} nail set is handcrafted with high attention to detail:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li><strong>Ready Catalog Sets (Normal & Premium):</strong> Handcrafted and dispatched within <strong>24 to 48 business hours</strong> of order placement.</li>
            <li><strong>Bespoke Custom Orders:</strong> Handcrafted to your exact specifications within <strong>3 to 5 business days</strong> before dispatch.</li>
            <li>Orders placed on Sundays or public holidays are processed on the following business day.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-400" />
            2. Shipping Rates & Free Delivery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-bold text-white block mb-1">Standard Express Shipping</span>
              <span className="font-mono text-base font-bold text-white block">₹{INITIAL_STORE_CONFIG.shippingCost}</span>
              <span className="text-[11px] text-gray-400">On orders below ₹{INITIAL_STORE_CONFIG.freeShippingThreshold}</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <span className="text-xs font-bold text-emerald-300 block mb-1">FREE Express Delivery</span>
              <span className="font-mono text-base font-bold text-emerald-400 block">₹0</span>
              <span className="text-[11px] text-gray-300">On all orders above ₹{INITIAL_STORE_CONFIG.freeShippingThreshold}</span>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            3. Estimated Transit Times
          </h2>
          <p className="mb-2">
            We partner with reliable express couriers (Delhivery, Blue Dart, DTDC, India Post) across India:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li><strong>Metro Cities (Mumbai, Delhi NCR, Bengaluru, Chennai, Kolkata, Hyderabad, Pune):</strong> 2 to 4 business days after dispatch.</li>
            <li><strong>Rest of India / Tier 2 & 3 Cities:</strong> 3 to 6 business days after dispatch.</li>
            <li><strong>Remote / Northeast Regions:</strong> 5 to 7 business days after dispatch.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-[#C8A96B]" />
            4. Order Tracking & Packaging
          </h2>
          <p className="mb-2">
            Once your order is handed over to our courier partner, you will receive an automated tracking link via email and WhatsApp.
          </p>
          <p>
            Every order is securely packed in reinforced, crush-resistant luxury gift packaging ensuring your handmade press-on nails and prep kit arrive in pristine condition.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            5. Delivery Inquiries
          </h2>
          <p className="mb-3">
            If your package is delayed or you require address redirection:
          </p>
          <div className="space-y-1.5 text-xs text-gray-300">
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#C8A96B]" /> <strong>Email:</strong> {BUSINESS_INFO.supportEmail}</p>
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> <strong>WhatsApp:</strong> {BUSINESS_INFO.whatsappDisplay}</p>
            <p><strong>Support Hours:</strong> {BUSINESS_INFO.hours}</p>
          </div>
        </section>

      </div>
    </div>
  );
};
