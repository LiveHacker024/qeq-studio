import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getAssetUrl } from '../../utils/assetUrl';

interface HeroCanvasSequenceProps {
  totalFrames?: number;
  fps?: number;
  onLoadedFirstFrame?: () => void;
}

export const HeroCanvasSequence: React.FC<HeroCanvasSequenceProps> = ({
  totalFrames = 300,
  fps = 25,
  onLoadedFirstFrame
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const frameInterval = 1000 / fps;

  // Format frame index: 1 -> "001", 12 -> "012", 120 -> "120"
  const getFrameUrl = useCallback((index: number) => {
    const num = (index + 1).toString().padStart(3, '0');
    return getAssetUrl(`/assets/hero-frames/ezgif-frame-${num}.jpg`);
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let isCancelled = false;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setLoadedCount(prev => prev + 1);
      setIsReady(true);
      onLoadedFirstFrame?.();
    };

    // Load initial 30 frames for immediate smooth play
    const loadInitialBatch = async () => {
      const initialPromises: Promise<void>[] = [];
      for (let i = 1; i < Math.min(40, totalFrames); i++) {
        initialPromises.push(
          new Promise(resolve => {
            const img = new Image();
            img.src = getFrameUrl(i);
            img.onload = () => {
              if (!isCancelled) {
                imagesRef.current[i] = img;
                setLoadedCount(prev => prev + 1);
              }
              resolve();
            };
            img.onerror = () => resolve();
          })
        );
      }
      await Promise.all(initialPromises);

      // Load remaining frames in background chunks of 20
      if (isCancelled) return;
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
                if (!isCancelled) {
                  imagesRef.current[i] = img;
                  setLoadedCount(prev => prev + 1);
                }
                resolve();
              };
              img.onerror = () => resolve();
            })
          );
        }
        await Promise.all(chunkPromises);
        // Small yield to browser thread
        await new Promise(r => setTimeout(r, 20));
      }
    };

    loadInitialBatch();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, getFrameUrl, onLoadedFirstFrame]);

  // Render frame to canvas with responsive object-fit: cover center alignment
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    // Calculate object-fit cover dimensions
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

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, []);

  // Resize canvas according to container
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Draw current frame
      const currentImg = imagesRef.current[currentFrameRef.current] || imagesRef.current[0];
      if (currentImg && currentImg.complete) {
        drawFrame(currentImg);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Main animation loop
  useEffect(() => {
    let forward = true;

    const render = (timestamp: number) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
      const elapsed = timestamp - lastFrameTimeRef.current;

      if (elapsed > frameInterval) {
        lastFrameTimeRef.current = timestamp - (elapsed % frameInterval);

        // Next frame calculation
        let nextFrame = currentFrameRef.current + (forward ? 1 : -1);

        if (nextFrame >= totalFrames) {
          nextFrame = 0; // Seamless loop
        } else if (nextFrame < 0) {
          nextFrame = totalFrames - 1;
        }

        // Check if next frame image is available, otherwise retain current
        if (imagesRef.current[nextFrame] && imagesRef.current[nextFrame]?.complete) {
          currentFrameRef.current = nextFrame;
          drawFrame(imagesRef.current[nextFrame]!);
        } else if (imagesRef.current[0]) {
          drawFrame(imagesRef.current[0]!);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames, frameInterval, drawFrame]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none pointer-events-none">
      {/* HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Poster Fallback during initial boot */}
      {!isReady && (
        <img
          src={getAssetUrl('/assets/hero-frames/ezgif-frame-001.jpg')}
          alt="QeQ Studio Hero Presentation"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
      )}

      {/* Subtle luxury dark gradient overlay to ensure text readability while keeping animation visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-black/45 to-black/65" />
      <div className="absolute inset-0 bg-radial-luxury opacity-40 mix-blend-screen" />
    </div>
  );
};
