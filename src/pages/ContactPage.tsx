import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/initialConfig';
import { InstagramIcon } from '../components/common/Icons';
import { 
  MessageCircle, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order & Custom Sizing Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Sent', 'Thank you! Your message has been received.');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <Mail className="w-3.5 h-3.5 text-blue-400" />
          <span>Customer Support</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          CONNECT WITH QeQ STUDIO
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
          Need sizing assistance, order support, or styling inquiries? Get in touch with our team.
        </p>
      </div>

      {/* 2-Column Contact Info + Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT: Direct Contact Channels (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* WhatsApp Card - Only if configured */}
          {BUSINESS_INFO.hasWhatsapp && (
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl glass-dark border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 flex items-center justify-between group bg-emerald-950/20 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                    Direct Support
                  </span>
                  <h4 className="font-editorial text-base font-bold text-white">WhatsApp Support</h4>
                  <span className="text-xs text-gray-300 font-mono">{BUSINESS_INFO.whatsappDisplay}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </a>
          )}

          {/* Instagram Card */}
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-3xl glass-dark border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 flex items-center justify-between group bg-pink-950/20 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-600/30 group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 block">
                  Official Instagram
                </span>
                <h4 className="font-editorial text-base font-bold text-white">@{BUSINESS_INFO.instagramHandle}</h4>
                <span className="text-xs text-gray-300">Design releases & updates</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
          </a>

          {/* Email Support Card */}
          <a
            href={`mailto:${BUSINESS_INFO.supportEmail}`}
            className="p-6 rounded-3xl glass-dark border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 flex items-center justify-between group bg-blue-950/20 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block">
                  Email Inquiries
                </span>
                <h4 className="font-editorial text-base font-bold text-white">{BUSINESS_INFO.supportEmail}</h4>
                <span className="text-xs text-gray-300">Support & general inquiries</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </a>

          {/* Working Hours */}
          <div className="p-6 rounded-3xl glass-dark border border-white/10 flex items-start gap-4">
            <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Operating Hours</strong>
              <p>{BUSINESS_INFO.hours}</p>
            </div>
          </div>

        </div>

        {/* RIGHT: Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl glass-dark border border-white/15 shadow-2xl flex flex-col gap-6 bg-[#0E0E16]">
            
            <div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-gray-400 font-light">
                Fill out the form below and we will respond to your inquiry.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-editorial text-xl font-bold text-white">Message Received</h4>
                <p className="text-xs text-gray-300 max-w-sm font-light leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. We have received your message and will get back to you at <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Order & Custom Sizing Inquiry', message: '' });
                  }}
                  className="btn-luxury-secondary text-xs uppercase tracking-widest py-2.5 px-6 mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Mobile Number (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#161622] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Order & Custom Sizing Inquiry">Custom Sizing & Fit</option>
                      <option value="Order Tracking">Order Tracking & Dispatch</option>
                      <option value="Normal Collection Inquiry">Normal Collection (₹249)</option>
                      <option value="Premium Collection Inquiry">Premium Collection (₹299)</option>
                      <option value="General Support">General Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your sizing questions or inquiry..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
