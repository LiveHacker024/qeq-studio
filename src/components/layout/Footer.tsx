import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BUSINESS_INFO } from '../../data/initialConfig';
import { InstagramIcon } from '../common/Icons';
import { 
  MessageCircle, 
  Mail, 
  ArrowRight, 
  Check, 
  Clock, 
  Phone
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed', 'Thank you for subscribing to QeQ STUDIO updates!');
    setEmail('');
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 text-gray-400 text-sm">
      
      {/* Newsletter Banner */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C8A96B] mb-2 block">
            Studio Newsletter
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl text-white font-bold tracking-wide mb-2">
            SUBSCRIBE FOR NEW DROPS
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Get notified about new handmade design releases and seasonal collections.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="btn-luxury-primary px-6 py-2.5 text-xs uppercase tracking-widest whitespace-nowrap font-bold"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden border border-white/20">
                <img
                  src={getAssetUrl('/assets/logo/company-logo.jpeg')}
                  alt="QeQ STUDIO"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-editorial text-xl font-bold tracking-widest text-white">
                Q<span className="text-[#C8A96B]">e</span>Q <span className="text-xs font-light tracking-[0.2em] text-gray-300">STUDIO</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Handmade luxury press-on nails. Normal Collection (3 packs × 24 nails = 72 nails for ₹249) and Premium Collection (1 pack = 10 nails for ₹299).
            </p>

            {/* Direct Contact Channels */}
            <div className="flex flex-col gap-2 pt-1 text-xs text-gray-300">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {BUSINESS_INFO.whatsappDisplay}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.supportEmail}`}
                className="flex items-center gap-2 hover:text-[#C8A96B] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C8A96B]" />
                <span>{BUSINESS_INFO.supportEmail}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{BUSINESS_INFO.hours}</span>
              </div>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-editorial text-xs font-bold text-white tracking-wider uppercase mb-1">
              Shop
            </h4>
            <button onClick={() => onNavigate('/shop')} className="text-left text-xs hover:text-white transition-colors">
              All Handmade Sets
            </button>
            <button onClick={() => onNavigate('/shop/normal')} className="text-left text-xs hover:text-white transition-colors flex items-center justify-between">
              <span>Normal Collection</span>
              <span className="font-mono text-[10px] text-[#E2C98A]">₹249</span>
            </button>
            <button onClick={() => onNavigate('/shop/premium')} className="text-left text-xs hover:text-white transition-colors flex items-center justify-between">
              <span>Premium Collection</span>
              <span className="font-mono text-[10px] text-[#E2C98A]">₹299</span>
            </button>
            <button onClick={() => onNavigate('/#custom-studio')} className="text-left text-xs hover:text-white transition-colors">
              Design Your Own Nails
            </button>
            <button onClick={() => onNavigate('/try-the-look')} className="text-left text-xs text-[#C8A96B] hover:text-white transition-colors">
              Try The Look Studio
            </button>
          </div>

          {/* Col 2: Customer Care */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-editorial text-xs font-bold text-white tracking-wider uppercase mb-1">
              Customer Care
            </h4>
            <button onClick={() => onNavigate('/about')} className="text-left text-xs hover:text-white transition-colors">
              About QeQ STUDIO
            </button>
            <button onClick={() => onNavigate('/contact')} className="text-left text-xs hover:text-white transition-colors">
              Contact & Sizing Help
            </button>
            <button onClick={() => onNavigate('/account')} className="text-left text-xs hover:text-white transition-colors">
              Track Order / Account
            </button>
            <button onClick={() => onNavigate('/#custom-studio')} className="text-left text-xs hover:text-white transition-colors">
              Bulk Custom Orders
            </button>
          </div>

          {/* Col 3: Policies & Legal */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-editorial text-xs font-bold text-white tracking-wider uppercase mb-1">
              Policies & Legal
            </h4>
            <button onClick={() => onNavigate('/privacy-policy')} className="text-left text-xs hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/terms')} className="text-left text-xs hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('/shipping-policy')} className="text-left text-xs hover:text-white transition-colors">
              Shipping & Delivery
            </button>
            <button onClick={() => onNavigate('/return-policy')} className="text-left text-xs hover:text-white transition-colors">
              Return & Refund Policy
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.brandName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <span>•</span>
            <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-white transition-colors">
              Privacy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('/terms')} className="hover:text-white transition-colors">
              Terms
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
