import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC<{ onNavigateShop?: () => void }> = ({ onNavigateShop }) => {
  const { storeConfig } = useStore();

  if (!storeConfig.announcementActive) return null;

  return (
    <div className="bg-gradient-to-r from-blue-950 via-[#121829] to-blue-950 text-xs text-gray-200 border-b border-blue-500/20 py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto tracking-widest uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
          <span className="text-[11px] md:text-xs text-blue-100 font-medium">
            {storeConfig.announcementText}
          </span>
          {onNavigateShop && (
            <button 
              onClick={onNavigateShop} 
              className="hidden sm:inline-flex items-center gap-1 text-champagne-soft hover:text-white underline underline-offset-2 ml-2 transition-colors font-semibold"
            >
              Shop Now <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
