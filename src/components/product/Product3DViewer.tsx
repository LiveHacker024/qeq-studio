import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../../types';
import { RotateCw, ZoomIn, Sparkles, Layers, Eye, RefreshCw } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

interface Product3DViewerProps {
  product: Product;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'3d-turntable' | 'exploded-layers' | 'macro-video'>('3d-turntable');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotationY(prev => Math.max(-45, Math.min(45, prev + deltaX * 0.4)));
    setRotationX(prev => Math.max(-25, Math.min(25, prev - deltaY * 0.3)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleReset = () => {
    setRotationX(0);
    setRotationY(0);
    setZoom(1);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      
      {/* 3D Mode Switcher Tabs */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-1.5 text-xs">
        <button
          onClick={() => setActiveTab('3d-turntable')}
          className={`flex-1 py-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === '3d-turntable' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Interactive 3D Parallax</span>
        </button>

        <button
          onClick={() => setActiveTab('exploded-layers')}
          className={`flex-1 py-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'exploded-layers' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layer Anatomy</span>
        </button>

        <button
          onClick={() => setActiveTab('macro-video')}
          className={`flex-1 py-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'macro-video' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Studio 4K Reel</span>
        </button>
      </div>

      {/* Main 3D / Interactive Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl overflow-hidden glass-dark border border-white/15 bg-[#08080C] shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      >
        {activeTab === '3d-turntable' && (
          <div 
            className="relative w-4/5 h-4/5 flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ambient Lighting Reflection */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 mix-blend-overlay transition-opacity"
              style={{
                background: `radial-gradient(circle at ${50 + rotationY}% ${50 - rotationX}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
              }}
            />

            {/* Depth Cast Shadow */}
            <div 
              className="absolute -bottom-10 w-3/4 h-8 bg-black/80 rounded-full blur-xl pointer-events-none transition-transform"
              style={{
                transform: `translateX(${-rotationY * 0.8}px) scale(${1 - Math.abs(rotationX) * 0.01})`
              }}
            />

            {/* Main Product Image with realistic 3D displacement */}
            <img
              src={getAssetUrl(product.thumbnail)}
              alt={product.name}
              className="w-full h-full object-contain rounded-2xl drop-shadow-2xl pointer-events-none"
            />
          </div>
        )}

        {activeTab === 'exploded-layers' && (
          <div className="relative w-full h-full p-4 flex items-center justify-center bg-black/40 animate-fade-in">
            <img
              src={getAssetUrl('/assets/animation/anatomy-layers.png')}
              alt="Exploded Anatomy of Gel Press-On Layers"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {activeTab === 'macro-video' && (
          <div className="relative w-full h-full bg-black animate-fade-in">
            <video
              src={getAssetUrl('/assets/animation/nail-360-turntable.mp4')}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 3D Floating Action Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-semibold text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Drag to rotate 3D angles</span>
          </span>
        </div>

        {/* Control Tools Bottom Right */}
        {activeTab === '3d-turntable' && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setZoom(prev => Math.min(1.4, prev + 0.15))}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-black/90 transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white hover:bg-black/90 transition-all"
              title="Reset Angle"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
