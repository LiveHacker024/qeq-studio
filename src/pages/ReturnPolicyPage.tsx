import React, { useEffect } from 'react';
import { BUSINESS_INFO } from '../data/initialConfig';
import { RefreshCw, Sparkles, ShieldCheck, Mail, Phone, Calendar, AlertTriangle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const ReturnPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen text-gray-300">
      <SEOHead 
        title={`Return & Refund Policy | ${BUSINESS_INFO.brandName}`}
        description="Learn about our return, exchange, transit damage replacement, and refund policies for handmade press-on nails."
      />

      {/* Header */}
      <div className="text-center mb-12 pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#C8A96B] uppercase tracking-widest mb-3">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Customer Assurance</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          RETURN & REFUND POLICY
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
            <ShieldCheck className="w-4 h-4 text-[#C8A96B]" />
            1. Hygiene & Handmade Product Standards
          </h2>
          <p className="mb-2">
            Due to the intimate cosmetic nature of press-on nails and strict sanitary hygiene regulations, <strong>we cannot accept returns or exchanges for opened, worn, or tried-on sets</strong>.
          </p>
          <p>
            We take pride in our artisan craftsmanship and provide detailed sizing charts and an interactive Sizing Guide to help you select your perfect fit prior to purchase.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-emerald-400" />
            2. Damaged or Defective Items in Transit
          </h2>
          <p className="mb-2">
            In the rare event that your package arrives damaged during courier transit, or if there is a verified crafting defect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li>Please contact us within <strong>48 hours of delivery</strong> via WhatsApp (+91 84473 11551) or email (contact@qeqstudio.com).</li>
            <li>Provide your order number along with a clear photo or short unboxing video of the damaged item and packaging.</li>
            <li>Once verified, our team will dispatch a <strong>complimentary replacement set immediately</strong> at zero additional shipping cost to you.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            3. Order Cancellations
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li><strong>Standard Catalog Orders:</strong> You may cancel your order within <strong>6 hours of placement</strong> before your set enters hand-crafting or dispatch queue.</li>
            <li><strong>Custom Atelier Orders:</strong> Bespoke custom designs and bulk orders cannot be cancelled once hand-painting or production has started.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C8A96B]" />
            4. Refund Processing
          </h2>
          <p className="mb-2">
            Approved refunds (for eligible cancellations or out-of-stock items) are processed back to the original method of payment (bank account or UPI) within <strong>3 to 5 business days</strong>.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            5. Contact Support for Returns
          </h2>
          <p className="mb-3">
            For assistance with an order, sizing concern, or transit claim:
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
