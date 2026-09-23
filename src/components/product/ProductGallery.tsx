import React, { useState } from 'react';
import { Product } from '../../types';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const images = product.images.length > 0 ? product.images : [product.thumbnail];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleNext = () => {
    setSelectedIdx(prev => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIdx(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* Main Image Stage */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden glass-dark border border-white/15 bg-[#08080C] group shadow-2xl">
        <img
          src={images[selectedIdx]}
          alt={`${product.name} View ${selectedIdx + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Floating Lightbox Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-gray-300 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
          title="Fullscreen High-Res Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Navigation Arrows if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Rail */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                selectedIdx === idx
                  ? 'border-blue-500 ring-2 ring-blue-500/40 scale-105'
                  : 'border-white/10 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in select-none">
          <button
            onClick={() => { setIsLightboxOpen(false); setIsZoomed(false); }}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Close Fullscreen View"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center cursor-zoom-in overflow-hidden"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <img
              src={images[selectedIdx]}
              alt={product.name}
              className={`max-w-full max-h-[85vh] object-contain transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
              }`}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs text-gray-300 border border-white/10">
            Click image to {isZoomed ? 'Zoom Out' : 'Zoom In'} • Press Esc to close
          </div>
        </div>
      )}

    </div>
  );
};
