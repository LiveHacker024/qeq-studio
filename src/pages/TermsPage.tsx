import React, { useEffect } from 'react';
import { BUSINESS_INFO } from '../data/initialConfig';
import { FileText, CheckCircle2, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen text-gray-300">
      <SEOHead 
        title={`Terms & Conditions | ${BUSINESS_INFO.brandName}`}
        description="Review the terms of service, handmade product standards, order terms, and conditions for purchasing from QeQ STUDIO."
      />

      {/* Header */}
      <div className="text-center mb-12 pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#C8A96B] uppercase tracking-widest mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last Updated: September 2026</span>
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed font-light">
        
        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            1. Agreement to Terms
          </h2>
          <p className="mb-2">
            By visiting or purchasing from <strong>{BUSINESS_INFO.brandName}</strong>, you agree to comply with and be bound by these Terms and Conditions. Please review them carefully before placing an order.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C8A96B]" />
            2. Handmade Products & Craftsmanship Disclosure
          </h2>
          <p className="mb-2">
            All nail sets offered on {BUSINESS_INFO.brandName} are 100% handmade and artisan-crafted. Because each piece is individual and hand-painted:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li>Subtle, organic variations in art, pigment tone, and foil placement may occur compared to display photos. These are natural hallmarks of authentic handmade artistry.</li>
            <li>We offer two distinct collection tiers:
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Normal Collection (₹249):</strong> 3 packs × 24 nails = 72 handmade nails total.</li>
                <li><strong>Premium Collection (₹299):</strong> 1 premium pack = 10 handmade nails total.</li>
              </ul>
            </li>
            <li>Each order includes a complimentary prep application kit (adhesive tabs/glue, cuticle stick, prep wipe, and mini buffer).</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            3. Pricing & Payment Terms
          </h2>
          <p className="mb-2">
            All prices on our catalog are listed in Indian Rupees (INR) and are inclusive of standard applicable taxes.
          </p>
          <p>
            Payment must be completed during checkout via our verified payment options (UPI, Debit/Credit Card, Net Banking, or Cash on Delivery where eligible). Prices are subject to change without prior notice, but confirmed orders will always be honored at the booked price.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            4. Custom & Bulk Orders
          </h2>
          <p className="mb-2">
            For bespoke designs requested through our "Design Your Own Nails" studio or WhatsApp (+91 84473 11551):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li>Retail custom orders are hand-crafted according to the customer's selected length, color palette, and uploaded reference design.</li>
            <li>Bulk/wholesale orders require a minimum quantity of 100 pieces and are confirmed via custom quote and timeline agreement.</li>
            <li>Because custom sets are crafted exclusively to individual specifications, custom orders cannot be cancelled once production has commenced.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            5. Intellectual Property
          </h2>
          <p>
            All original photography, website graphics, logo branding, copy text, and styling content displayed on {BUSINESS_INFO.brandName} are the exclusive intellectual property of {BUSINESS_INFO.brandName} and may not be reproduced, copied, or exploited without written permission.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            {BUSINESS_INFO.brandName} will not be liable for indirect, incidental, or consequential damages resulting from improper nail application, misuse of nail glue, or allergic reactions to cosmetic adhesives. Customers are advised to perform patch tests and follow our included Application & Care Guide.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            7. Contact & Support
          </h2>
          <div className="space-y-1.5 text-xs text-gray-300">
            <p><strong>Brand:</strong> {BUSINESS_INFO.brandName}</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#C8A96B]" /> <strong>Email:</strong> {BUSINESS_INFO.supportEmail}</p>
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> <strong>WhatsApp:</strong> {BUSINESS_INFO.whatsappDisplay}</p>
            <p><strong>Hours:</strong> {BUSINESS_INFO.hours}</p>
          </div>
        </section>

      </div>
    </div>
  );
};
