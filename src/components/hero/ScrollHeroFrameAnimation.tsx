import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollHeroFrameAnimationProps {
  totalFrames?: number;
  children?: React.ReactNode;
}

export const ScrollHeroFrameAnimation: React.FC<ScrollHeroFrameAnimationProps> = ({
  totalFrames = 300,
  children
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Canonical path: 0 -> ezgif-frame-001.jpg, 299 -> ezgif-frame-300.jpg
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = (index + 1).toString().padStart(3, '0');
    return `/assets/hero-frames/ezgif-frame-${frameNum}.jpg`;
  }, []);

  // Draw image on canvas with high-DPI scaling and precision aspect-ratio fitting
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Configure high-definition rendering quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Locate current frame or nearest ready neighbor
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Search backward for closest ready frame
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
          img = imagesRef.current[i];
          break;
        }
      }
      // Search forward if no prior frame is loaded
      if (!img || !img.complete) {
        for (let i = frameIndex + 1; i < totalFrames; i++) {
          if (imagesRef.current[i]?.complete && imagesRef.current[i]!.naturalWidth > 0) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
      // Fallback to first frame
      if (!img || !img.complete) {
        img = imagesRef.current[0];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imageRatio) {
      renderW = cw;
      renderH = cw / imageRatio;
      offsetY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imageRatio;
      offsetX = (cw - renderW) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, [totalFrames]);

  // Handle Canvas Resize with Retina / High-DPI Support
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const currentIdx = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrameRef.current)));
    drawFrame(currentIdx);
  }, [drawFrame, totalFrames]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Progressive Preloading Pipeline from Single Canonical Source
  useEffect(() => {
    let isCancelled = false;

    // 1. Load First Frame Immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setFirstFrameLoaded(true);
      updateCanvasDimensions();
    };

    // 2. Preload First Batch (0-40 frames)
    const preloadBatch = async () => {
      const initialPromises: Promise<void>[] = [];
      for (let i = 1; i < Math.min(40, totalFrames); i++) {
        initialPromises.push(
          new Promise(resolve => {
            const img = new Image();
            img.src = getFrameUrl(i);
            img.onload = () => {
              if (!isCancelled) imagesRef.current[i] = img;
              resolve();
            };
            img.onerror = () => resolve();
          })
        );
      }
      await Promise.all(initialPromises);

      // 3. Progressive Background Loading for Remaining Frames (Chunks of 25)
      const chunkSize = 25;
      for (let start = 40; start < totalFrames; start += chunkSize) {
        if (isCancelled) break;
        const chunkPromises: Promise<void>[] = [];
        for (let i = start; i < Math.min(start + chunkSize, totalFrames); i++) {
          chunkPromises.push(
            new Promise(resolve => {
              const img = new Image();
              img.src = getFrameUrl(i);
              img.onload = () => {
                if (!isCancelled) imagesRef.current[i] = img;
                resolve();
              };
              img.onerror = () => resolve();
            })
          );
        }
        await Promise.all(chunkPromises);
        // Yield briefly to ensure uninterrupted 60/120fps UI rendering
        await new Promise(r => setTimeout(r, 16));
      }
    };

    preloadBatch();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFrameUrl, updateCanvasDimensions]);

  // Window Resize Listener
  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions, { passive: true });
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Scroll Position & RAF Physics Interpolation Loop
  useEffect(() => {
    if (isReducedMotion) {
      targetFrameRef.current = 0;
      currentFrameRef.current = 0;
      drawFrame(0);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      targetFrameRef.current = progress * (totalFrames - 1);

      // Subtle Overlay opacity easing when approaching bottom of pinned sequence
      if (overlayRef.current) {
        if (progress > 0.85) {
          overlayRef.current.style.opacity = Math.max(0, 1 - (progress - 0.85) * 6.6).toString();
        } else {
          overlayRef.current.style.opacity = '1';
        }
      }

      // Hide scroll hint once user starts scrolling
      if (scrollIndicatorRef.current) {
        if (progress > 0.02) {
          scrollIndicatorRef.current.style.opacity = '0';
        } else {
          scrollIndicatorRef.current.style.opacity = '1';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Smooth RAF Loop for Jitter-Free Frame Interpolation
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        // Smooth lerp (0.16 provides cinematic fluid motion without lag)
        currentFrameRef.current += diff * 0.16;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(currentFrameRef.current)));

      if (frameIndex !== lastRenderedFrameRef.current) {
        drawFrame(frameIndex);
        lastRenderedFrameRef.current = frameIndex;
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames, drawFrame, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: isReducedMotion ? '100vh' : '400vh' }}
    >
      {/* Pinned / Sticky 100vh Hero Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black select-none">
        
        {/* Hardware-Accelerated High-Definition Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
        />

        {/* Minimal Soft Vignettes (Preserves 100% Brightness & Clarity of Nail Art) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent pointer-events-none" />

        {/* HTML Content Overlay (Interactive, SEO-readable, Crisp Typography) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
        >
          {children}
        </div>

        {/* Scroll To Explore Indicator */}
        {!isReducedMotion && (
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 transition-opacity duration-500"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 drop-shadow-md">
              Scroll to Explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1 backdrop-blur-sm bg-black/20">
              <div className="w-1 h-2 rounded-full bg-white/80 animate-bounce" />
            </div>
          </div>
        )}

        {/* Initial First Frame Fast Loader */}
        {!firstFrameLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
