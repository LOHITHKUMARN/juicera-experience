"use client";

import React, { useRef, useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

interface ChocolateBottleScrollProps {
  progress: MotionValue<number>;
}

// Persist across remounts as a global
const CHOCOLATE_IMAGE_CACHE: HTMLImageElement[] = [];

export const ChocolateBottleScroll: React.FC<ChocolateBottleScrollProps> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>(CHOCOLATE_IMAGE_CACHE);
  const [isMounted, setIsMounted] = useState(false);
  
  const FOLDER = "/images/chocolate"; // Verified path
  const frameCount = 192;

  useEffect(() => {
    setIsMounted(true);
    if (CHOCOLATE_IMAGE_CACHE.length === frameCount) return;

    let isCancelled = false;
    const load = async () => {
      const batch: HTMLImageElement[] = [];
      for (let i = 1; i <= frameCount; i++) {
        if (isCancelled) break;
        const img = new Image();
        img.src = `${FOLDER}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        await new Promise((r) => (img.onload = img.onerror = r));
        if (isCancelled) break;
        batch.push(img);
        
        // Progressive UI updates
        if (i === 1 || i % 24 === 0 || i === frameCount) {
          setImages([...batch]);
        }
      }
      
      if (!isCancelled && batch.length === frameCount) {
        CHOCOLATE_IMAGE_CACHE.length = 0;
        batch.forEach(img => CHOCOLATE_IMAGE_CACHE.push(img));
      }
    };

    load();
    return () => { isCancelled = true; };
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (val: number) => {
      const idx = Math.min(images.length - 1, Math.floor(val * (frameCount - 1)));
      const img = images[idx];
      if (!img || !img.complete) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.drawImage(img, 0, 0, img.width, img.height, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    const resizeObserver = new ResizeObserver(() => render(progress.get()));
    resizeObserver.observe(container);
    render(progress.get());

    const unsub = progress.on("change", (latest) => requestAnimationFrame(() => render(latest)));

    return () => {
      resizeObserver.disconnect();
      unsub();
    };
  }, [isMounted, images, progress]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
      {images.length < 5 && (
        <div className="absolute inset-0 flex items-center justify-center text-white/10 text-xs font-black tracking-widest animate-pulse">
           INITIALIZING COCOA SEQUENCE
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none drop-shadow-2xl" />
    </div>
  );
};
