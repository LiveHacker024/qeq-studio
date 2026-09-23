import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { 
  Upload, 
  Sparkles, 
  Sliders, 
  RefreshCw, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  AlertCircle,
  Camera,
  Layers
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface TryTheLookStudioProps {
  initialProduct?: Product;
}

export const TryTheLookStudio: React.FC<TryTheLookStudioProps> = ({ initialProduct }) => {
  const { products, addToCart, setIsCartOpen } = useStore();

  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    return initialProduct || products[0] || {} as Product;
  });

  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Default models or custom user uploaded hand photo
  const defaultModels = [
    { name: 'Model Fair Skin', image: getAssetUrl('/assets/animation/hero-hand-editorial.png') },
    { name: 'Studio Natural', image: getAssetUrl('/assets/products/premium/1.jpg') },
    { name: 'Model Warm Olive', image: getAssetUrl('/assets/products/normal/JHB001.jpg') },
  ];

  const [activeModelImage, setActiveModelImage] = useState(defaultModels[0].image);
  const [userCustomImage, setUserCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUserCustomImage(reader.result as string);
          setActiveModelImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Interactive Virtual Fitting Room</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          TRY THE LOOK
        </h1>
        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          Upload your hand photo or choose a studio model. Drag the interactive slider to compare your natural nails with your selected QeQ STUDIO set.
        </p>

        {/* Note Alert */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-300/90 bg-amber-950/30 border border-amber-500/20 px-4 py-1.5 rounded-full">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Simulated preview for visual reference only. Natural nail fit will be customized to your selected tip sizes.</span>
        </div>
      </div>

      {/* Main Studio Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Before/After Interactive Split Viewer (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden glass-dark border border-white/20 select-none cursor-ew-resize shadow-2xl bg-black"
          >
            {/* BACKGROUND LAYER: AFTER (With Selected Press-On Design) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={getAssetUrl(selectedProduct.thumbnail || activeModelImage)}
                alt="After - With Press On Nails"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white tracking-wider uppercase border border-white/20 shadow-lg">
                After: {selectedProduct.name?.split('(')[0] || 'Selected Set'}
              </div>
            </div>

            {/* FOREGROUND LAYER: BEFORE (Natural Hand) - Clipped via Slider % */}
            <div
              className="absolute inset-0 h-full overflow-hidden border-r-2 border-white pointer-events-none shadow-2xl"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={getAssetUrl(activeModelImage)}
                alt="Before - Natural Hand"
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-200 tracking-wider uppercase border border-white/20">
                Before: Natural
              </div>
            </div>

            {/* DRAGGABLE SLIDER HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl border-2 border-white -ml-0.5">
                <Sliders className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Slider Instruction */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] text-gray-300 border border-white/10 pointer-events-none">
              ← Drag slider left or right to compare →
            </div>
          </div>

          {/* Model Hand Options & Custom Upload */}
          <div className="p-4 rounded-2xl glass-dark border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-300">Skin Tone Reference:</span>
              <div className="flex items-center gap-2">
                {defaultModels.map(model => (
                  <button
                    key={model.name}
                    onClick={() => setActiveModelImage(model.image)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeModelImage === model.image && !userCustomImage
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-luxury-secondary text-xs py-2 px-4 inline-flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5 text-blue-400" />
                <span>Upload My Hand Photo</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Selected Product Card & Design Selector (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Active Product Details Card */}
          <div className="p-6 rounded-3xl glass-dark border border-white/15 shadow-xl flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                  selectedProduct.quality_tier === 'premium'
                    ? 'bg-champagne-gold/20 text-champagne-soft border-champagne-gold/40'
                    : 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                }`}>
                  {selectedProduct.quality_tier === 'premium' ? 'Premium (₹299)' : 'Normal (₹249)'}
                </span>
                <h3 className="font-editorial text-xl font-bold text-white mt-2">
                  {selectedProduct.name}
                </h3>
              </div>
              <span className="text-2xl font-bold font-mono text-white">
                ₹{selectedProduct.price}
              </span>
            </div>

            <div className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold mb-0.5">Packaging & Quantity</span>
              <span className="text-white font-medium">
                {selectedProduct.quality_tier === 'premium' ? '1 Premium Pack • 10 Handmade Nails' : '3 Packs × 24 Nails • 72 Handmade Nails Total'}
              </span>
            </div>

            {/* Quick Add to Bag */}
            <button
              onClick={() => {
                addToCart(selectedProduct, 'M');
                setIsCartOpen(true);
              }}
              className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add This Look to Bag</span>
            </button>
          </div>

          {/* Quick Design Switcher Grid */}
          <div className="p-6 rounded-3xl glass-dark border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-widest text-gray-300">
                Choose Design To Preview
              </span>
              <span className="text-gray-400">{products.length} Designs</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {products.slice(0, 18).map(prod => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`relative rounded-xl overflow-hidden aspect-square border transition-all ${
                    selectedProduct.id === prod.id
                      ? 'border-blue-500 ring-2 ring-blue-500 scale-102 shadow-lg'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getAssetUrl(prod.thumbnail)}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-[9px] text-white truncate font-medium text-center">
                    ₹{prod.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
