import React, { useState, useRef, useEffect } from 'react';
import { getAssetUrl } from '../../utils/assetUrl';

interface VideoHeroProps {
  children?: React.ReactNode;
}

export const VideoHero: React.FC<VideoHeroProps> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled silently: browser will respect muted autoplay policy
        });
      }
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none flex items-center justify-center">
      {/* Background Video Animation / Fallback */}
      {videoError ? (
        <img
          src={getAssetUrl('/assets/hero-frames/ezgif-frame-001.jpg')}
          alt="QeQ STUDIO Atelier"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={getAssetUrl('/assets/hero-frames/ezgif-frame-001.jpg')}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src={getAssetUrl('/assets/hero animation.mp4')} type="video/mp4" />
          <source src={getAssetUrl('/assets/animation/Camera_zooming_on_nail_art_20260922170206.mp4')} type="video/mp4" />
          <img
            src={getAssetUrl('/assets/hero-frames/ezgif-frame-001.jpg')}
            alt="QeQ STUDIO Atelier"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      )}

      {/* Luxury Vignettes & Depth Gradients for Readability and Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/30 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* HTML Content Overlay (Interactive, SEO-readable, Preserves all HTML text & CTAs) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {children}
      </div>
    </section>
  );
};
