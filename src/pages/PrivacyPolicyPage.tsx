import React, { useEffect } from 'react';
import { BUSINESS_INFO } from '../data/initialConfig';
import { ShieldCheck, Lock, Eye, Mail, Phone, Calendar } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen text-gray-300">
      <SEOHead 
        title={`Privacy Policy | ${BUSINESS_INFO.brandName}`}
        description="Learn how QeQ STUDIO collects, uses, protects, and handles your personal information when you browse and purchase handmade press-on nails."
      />

      {/* Header */}
      <div className="text-center mb-12 pb-8 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#C8A96B] uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Data Transparency</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          PRIVACY POLICY
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
            <Lock className="w-4 h-4 text-[#C8A96B]" />
            1. Overview & Commitment
          </h2>
          <p className="mb-2">
            Welcome to <strong>{BUSINESS_INFO.brandName}</strong> ("we," "our," or "us"). We value your privacy and are committed to safeguarding your personal data in compliance with applicable consumer data protection standards and Google AdSense publisher policies.
          </p>
          <p>
            This Privacy Policy explains what personal information we collect, why we collect it, how it is used to deliver our handmade press-on nail sets, and your rights regarding your personal information.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            2. Information We Collect
          </h2>
          <p className="mb-3">
            When you interact with our website or place an order for our products, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li><strong>Contact Details:</strong> Full name, email address, mobile/WhatsApp telephone number.</li>
            <li><strong>Delivery Information:</strong> Physical shipping address, apartment/suite number, city, state, and postal PIN code.</li>
            <li><strong>Order Information:</strong> Items purchased (Normal or Premium collection nail sets), sizes selected (XS–XL or custom measurements), quantity, and transaction totals.</li>
            <li><strong>Custom Nail Design Uploads:</strong> Reference imagery or specifications provided through our bespoke studio or WhatsApp consultation.</li>
            <li><strong>Technical & Device Data:</strong> IP address, browser type, operating system, and pages visited, collected via standard non-identifying server logs to ensure optimal performance.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            3. How We Use Your Information
          </h2>
          <p className="mb-2">
            We use your data solely for lawful, legitimate business purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-300">
            <li>To process, fulfill, and dispatch your handmade press-on nail orders.</li>
            <li>To provide tracking details, order status updates, and customer support via email or WhatsApp.</li>
            <li>To accurately craft custom nail sizes and bespoke designs requested through our atelier.</li>
            <li>To maintain website security, prevent fraudulent transactions, and improve site speed and usability.</li>
            <li>To send optional product drop announcements only if you have explicitly subscribed to our newsletter.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#C8A96B]" />
            4. Cookies & Analytics
          </h2>
          <p className="mb-2">
            Our site uses essential browser cookies and local storage to retain your cart items, preferences, and wishlist. 
          </p>
          <p>
            Third-party services, including Google AdSense or analytics partners, may use cookies to serve non-intrusive advertisements or measure website engagement. You can choose to disable cookies through your individual browser settings at any time.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            5. Data Protection & Non-Disclosure
          </h2>
          <p className="mb-2">
            <strong>We do not sell, rent, trade, or share your personal information</strong> with third-party data brokers or unauthorized entities.
          </p>
          <p>
            Your information is shared only with verified logistics partners (such as Delhivery, Blue Dart, DTDC, or India Post) strictly for delivery fulfillment, and secure payment processing services to facilitate verified transactions.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            6. Your Rights & Privacy Requests
          </h2>
          <p className="mb-2">
            You have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or request the deletion of your customer record.
          </p>
          <p>
            To exercise any of these rights, please contact our privacy representative using the details below.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#111111] border border-white/10">
          <h2 className="font-editorial text-base sm:text-lg font-bold text-white mb-3">
            7. Contact Information
          </h2>
          <p className="mb-3">
            If you have questions regarding this Privacy Policy or wish to make an inquiry:
          </p>
          <div className="space-y-1.5 text-xs text-gray-300">
            <p><strong>Brand:</strong> {BUSINESS_INFO.brandName}</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#C8A96B]" /> <strong>Email:</strong> {BUSINESS_INFO.supportEmail}</p>
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> <strong>WhatsApp Support:</strong> {BUSINESS_INFO.whatsappDisplay}</p>
            <p><strong>Support Hours:</strong> {BUSINESS_INFO.hours}</p>
          </div>
        </section>

      </div>
    </div>
  );
};
