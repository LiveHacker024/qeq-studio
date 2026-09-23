import React, { useState, useRef } from 'react';
import { Play, Pause, RotateCw, ZoomIn, Sparkles, Layers, Eye } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoPlaylist = [
    {
      title: '360° Studio Turntable',
      subtitle: 'Continuous Multi-Angle Inspection',
      src: '/assets/animation/nail-360-turntable.mp4',
      icon: RotateCw,
      desc: 'Inspect apex curve, side taper, and crystal setting from every perspective.'
    },
    {
      title: 'Macro Optical Zoom',
      subtitle: 'Crystal Facet & Gel Purity',
      src: '/assets/animation/nail-macro-zoom.mp4',
      icon: ZoomIn,
      desc: 'Precision inspection of mirror chrome finishes and Austrian crystal facets.'
    },
    {
      title: 'Hand Transformation',
      subtitle: 'Instant 10-Minute Salon Fit',
      src: '/assets/animation/nail-hand-transform.mp4',
      icon: Sparkles,
      desc: 'See natural nails transform into high-fashion salon masterpieces.'
    },
    {
      title: 'Exploded Component Assembly',
      subtitle: 'Anatomical Precision Engineering',
      src: '/assets/animation/nail-exploded-view.mp4',
      icon: Layers,
      desc: 'Dynamic separation and re-assembly of multi-tier gel polymer layers.'
    }
  ];

  const handleVideoSelect = (idx: number) => {
    setActiveVideoIdx(idx);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-2 block">
          Cinematic Perspectives
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          CINEMATIC 360° SHOWCASE
        </h2>
        <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
          Experience our nail sets in dynamic motion. Inspect high-gloss light refractions, crystal sparkle, and sculpted ergonomics.
        </p>
      </div>

      {/* Main Video Theatre Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Main Video Viewport (7 Cols) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden glass-dark border border-white/15 bg-black shadow-2xl group">
          <div className="relative aspect-video w-full overflow-hidden bg-[#0A0A0E]">
            <video
              ref={videoRef}
              src={videoPlaylist[activeVideoIdx].src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Gradient Overlay for Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Play/Pause Button Overlay */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-600/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-300 border border-white/20 shadow-xl shadow-blue-600/40"
              aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-semibold tracking-wider text-[10px] uppercase">
                {videoPlaylist[activeVideoIdx].title}
              </span>
            </div>
          </div>

          {/* Bottom Caption Bar */}
          <div className="p-6 bg-[#0B0B10] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-blue-400 font-medium block">
                {videoPlaylist[activeVideoIdx].subtitle}
              </span>
              <p className="text-gray-300 text-xs mt-0.5 leading-relaxed font-light">
                {videoPlaylist[activeVideoIdx].desc}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-[11px] text-gray-400">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Studio 4K Capture</span>
            </div>
          </div>
        </div>

        {/* Video Selectors (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 px-1">
            Select Cinematic Reel
          </div>

          {videoPlaylist.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeVideoIdx === idx;

            return (
              <button
                key={item.title}
                onClick={() => handleVideoSelect(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex items-center gap-4 ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-900/20 translate-x-2'
                    : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40' : 'bg-white/10 text-gray-300'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5 font-light">
                    {item.subtitle}
                  </p>
                </div>

                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping shrink-0" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
