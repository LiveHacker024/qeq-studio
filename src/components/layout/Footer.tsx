import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BUSINESS_INFO } from '../../data/initialConfig';
import { InstagramIcon } from '../common/Icons';
import { 
  MessageCircle, 
  Mail, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Clock 
} from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed', 'Thank you for subscribing to QeQ STUDIO drops!');
    setEmail('');
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-gray-400 text-sm">
      
      {/* Newsletter VIP Banner */}
      <div className="border-b border-white/10 bg-gradient-to-b from-blue-950/20 to-transparent py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-2 block">
            Studio Updates
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl text-white font-bold tracking-wide mb-3">
            SUBSCRIBE FOR NEW RELEASES
          </h3>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Stay updated on new handmade design releases and exclusive seasonal collections.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <button
              type="submit"
              className="btn-luxury-primary px-7 py-3.5 text-xs uppercase tracking-widest whitespace-nowrap shadow-lg shadow-blue-600/30"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 overflow-hidden border border-blue-500/40">
                <img
                  src="/assets/logo/company-logo.jpeg"
                  alt="QeQ STUDIO"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-widest text-white">
                Q<span className="text-blue-500">e</span>Q <span className="text-sm font-light tracking-[0.25em] text-gray-300">STUDIO</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Handmade press-on nails. Normal Collection with 3 packs (72 handmade nails total) for ₹249 and Premium Collection with 1 pack (10 handmade nails) for ₹299.
            </p>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {BUSINESS_INFO.hasWhatsapp && (
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                  aria-label="Direct WhatsApp Support"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-950/40 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all"
                aria-label="Official Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.supportEmail}`}
                className="w-10 h-10 rounded-full bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Email Studio"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="flex flex-col gap-3">
            <h4 className="font-editorial text-sm font-bold text-white tracking-widest uppercase mb-1">
              Shop
            </h4>
            <button onClick={() => onNavigate('/shop')} className="text-left text-xs hover:text-blue-400 transition-colors">
              All Handmade Sets (124)
            </button>
            <button onClick={() => onNavigate('/shop/normal')} className="text-left text-xs hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <span>Normal Collection</span>
              <span className="text-[10px] text-blue-400 font-bold">₹249</span>
            </button>
            <button onClick={() => onNavigate('/shop/premium')} className="text-left text-xs hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <span>Premium Collection</span>
              <span className="text-[10px] text-champagne-gold font-bold">₹299</span>
            </button>
            <button onClick={() => onNavigate('/try-the-look')} className="text-left text-xs text-champagne-gold hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Try The Look Studio
            </button>
          </div>

          {/* Col 2: Collections */}
          <div className="flex flex-col gap-3">
            <h4 className="font-editorial text-sm font-bold text-white tracking-widest uppercase mb-1">
              Collections
            </h4>
            <button onClick={() => onNavigate('/collections')} className="text-left text-xs hover:text-blue-400 transition-colors">
              Collections Overview
            </button>
            <button onClick={() => onNavigate('/shop/normal')} className="text-left text-xs hover:text-blue-400 transition-colors">
              Normal Collection (72 Nails)
            </button>
            <button onClick={() => onNavigate('/shop/premium')} className="text-left text-xs hover:text-blue-400 transition-colors">
              Premium Collection (10 Nails)
            </button>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div className="flex flex-col gap-3">
            <h4 className="font-editorial text-sm font-bold text-white tracking-widest uppercase mb-1">
              Customer Care
            </h4>
            <button onClick={() => onNavigate('/about')} className="text-left text-xs hover:text-blue-400 transition-colors">
              Sizing & Care Guide
            </button>
            <button onClick={() => onNavigate('/account')} className="text-left text-xs hover:text-blue-400 transition-colors">
              Track Your Order
            </button>
            <button onClick={() => onNavigate('/contact')} className="text-left text-xs hover:text-blue-400 transition-colors">
              Contact Us
            </button>
          </div>

        </div>

        {/* Studio Direct Details Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
            {BUSINESS_INFO.hasWhatsapp && (
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp: {BUSINESS_INFO.whatsappDisplay}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              @{BUSINESS_INFO.instagramHandle}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {BUSINESS_INFO.hours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span>© {new Date().getFullYear()} QeQ STUDIO. All rights reserved.</span>
            <button onClick={() => onNavigate('/admin')} className="hover:text-blue-400 transition-colors">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
