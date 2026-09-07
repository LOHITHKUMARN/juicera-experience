"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { MotionValue } from "framer-motion";

interface ProductBottleScrollProps {
  folderPath: string;
  progress: MotionValue<number>;
}

// Module-level cache to share loaded images across page navigations/switches
const globalFrameCache: Record<string, HTMLImageElement[]> = {};

/**
 * ProductBottleScroll
 * A high-performance, canvas-based scrollytelling component.
 */
export const ProductBottleScroll: React.FC<ProductBottleScrollProps> = ({ folderPath, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Local state for tracking loaded images in the current component instance
  const [images, setImages] = useState<HTMLImageElement[]>(() => globalFrameCache[folderPath] ?? []);
  const [isMounted, setIsMounted] = useState(false);
  
  const frameCount = 192; // Standard frame count

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Image Loading & Caching Pipeline
  useEffect(() => {
    if (globalFrameCache[folderPath]?.length === frameCount) {
      setImages(globalFrameCache[folderPath]);
      return;
    }

    setImages([]);
    let isCancelled = false;
    const loadedBatch: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 1; i <= frameCount; i++) {
        if (isCancelled) break;

        const img = new Image();
        const paddedIndex = String(i).padStart(3, '0');
        img.src = `${folderPath}/ezgif-frame-${paddedIndex}.jpg`;

        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); 
        });

        if (isCancelled) break;
        loadedBatch.push(img);

        // Update UI in small batches for responsiveness
        if (i === 1 || i % 10 === 0 || i === frameCount) {
          setImages([...loadedBatch]);
        }
      }

      if (!isCancelled && loadedBatch.length === frameCount) {
        globalFrameCache[folderPath] = loadedBatch;
      }
    };

    loadImages();
    return () => { isCancelled = true; };
  }, [folderPath]);

  // Main Rendering Logic
  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /**
     * Renders a specific frame to the canvas
     */
    const renderFrame = (progressValue: number) => {
      // Local check of images
      const currentImages = globalFrameCache[folderPath] || images;
      if (!currentImages.length) return;

      const totalSubFrames = currentImages.length;
      let frameIndex = Math.floor(progressValue * (frameCount - 1));
      
      if (frameIndex >= totalSubFrames) frameIndex = totalSubFrames - 1;
      if (frameIndex < 0) frameIndex = 0;

      const img = currentImages[frameIndex];
      if (!img || !img.complete) return;

      const canvasW = canvas.width;
      const canvasH = canvas.height;
      if (canvasW === 0 || canvasH === 0) return;

      ctx.clearRect(0, 0, canvasW, canvasH);

      const hRatio = canvasW / img.naturalWidth;
      const vRatio = canvasH / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      
      const drawW = img.naturalWidth * ratio;
      const drawH = img.naturalHeight * ratio;
      const drawX = (canvasW - drawW) / 2;
      const drawY = (canvasH - drawH) / 2;

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawW, drawH);
    };

    /**
     * Resizing handler
     */
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || (window.innerHeight - 64);
      renderFrame(progress.get());
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Immediate draw attempt
    updateSize();

    // Redraw whenever images state updates
    if (images.length > 0) {
      renderFrame(progress.get());
    }

    const unsubscribe = progress.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    return () => {
      resizeObserver.disconnect();
      unsubscribe();
    };
  }, [isMounted, images, progress, folderPath]);

  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef}
      className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center justify-center z-0"
    >
      {images.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 z-10">
          <div className="text-[10px] font-black tracking-[0.8em] uppercase animate-pulse">
            Syncing Sequence
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
};
