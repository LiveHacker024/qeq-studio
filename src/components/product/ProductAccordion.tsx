import React, { useState } from 'react';
import { Product } from '../../types';
import { 
  ChevronDown, 
  Sparkles, 
  PackageCheck, 
  Check, 
  ShieldCheck, 
  Truck
} from 'lucide-react';

interface ProductAccordionProps {
  product: Product;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({ product }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'details': true,
    'whats-included': true,
    'how-to-apply': false,
    'shipping': false,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isPremium = product.quality_tier === 'premium';

  const sections = [
    {
      id: 'details',
      title: 'Product Details & Packaging',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
          <p>{product.description}</p>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="font-semibold text-white mb-1">
              {isPremium ? 'PREMIUM COLLECTION' : 'NORMAL COLLECTION'}
            </div>
            <div className="text-gray-300">
              {isPremium 
                ? '1 Premium Pack • 10 Handmade Nails' 
                : '3 Packs × 24 Nails • 72 Handmade Nails Total'}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'whats-included',
      title: "What's Included",
      icon: PackageCheck,
      content: (
        <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
          <div className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-gray-200">
              {isPremium 
                ? '1 pack of 10 handmade press-on nails' 
                : '3 packs of 24 nails (72 handmade press-on nails total)'}
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-gray-200">Adhesive tabs and prep tools for easy application</span>
          </div>
        </div>
      )
    },
    {
      id: 'how-to-apply',
      title: 'How To Apply',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
          <ol className="list-decimal pl-4 space-y-2">
            <li>Clean and dry natural nails thoroughly.</li>
            <li>Select the correct size for each finger.</li>
            <li>Apply adhesive tab to the natural nail or press-on.</li>
            <li>Align with cuticle line and press firmly for 30 seconds.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: Truck,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
          <p>Free express delivery available on qualifying orders above ₹599 across India.</p>
          <p>Orders are prepared and dispatched promptly with secure packaging.</p>
        </div>
      )
    }
  ];

  return (
    <div className="divide-y divide-white/10 border-y border-white/10 my-8">
      {sections.map(sec => {
        const isOpen = !!openSections[sec.id];
        const Icon = sec.icon;

        return (
          <div key={sec.id} className="py-4">
            <button
              onClick={() => toggleSection(sec.id)}
              className="w-full flex items-center justify-between text-left py-1 text-sm sm:text-base font-bold text-white hover:text-blue-400 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="font-editorial tracking-wide">{sec.title}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="pt-3 pb-2 animate-fade-in">
                {sec.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
