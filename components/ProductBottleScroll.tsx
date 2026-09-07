"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { MotionValue } from "framer-motion";

interface ProductBottleScrollProps {
  folderPath: string;
  progress: MotionValue<number>;
}

const TOTAL_FRAMES = 192;
// Global in-memory cache shared across navigations and flavors
const GLOBAL_FRAME_CACHE = new Map<string, HTMLImageElement[]>();

export const ProductBottleScroll: React.FC<ProductBottleScrollProps> = ({ folderPath, progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Keep a mutable ref to frames for zero-overhead render access
  const framesRef = useRef<HTMLImageElement[]>(
    GLOBAL_FRAME_CACHE.get(folderPath) || new Array(TOTAL_FRAMES)
  );

  const drawCurrentFrame = useCallback((progressVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = framesRef.current;
    const clampedProgress = Math.min(1, Math.max(0, progressVal));
    const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(clampedProgress * (TOTAL_FRAMES - 1)));

    // 1. Direct hit if target frame is loaded
    let selectedImg: HTMLImageElement | undefined = frames[targetIdx];

    // 2. Nearest-frame fallback search outward so user NEVER sees a freeze or blank frame
    if (!selectedImg || !selectedImg.complete || selectedImg.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = targetIdx - offset;
        if (left >= 0 && frames[left]?.complete && frames[left]!.naturalWidth > 0) {
          selectedImg = frames[left];
          break;
        }
        const right = targetIdx + offset;
        if (right < TOTAL_FRAMES && frames[right]?.complete && frames[right]!.naturalWidth > 0) {
          selectedImg = frames[right];
          break;
        }
      }
    }

    if (!selectedImg || !selectedImg.complete || selectedImg.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    ctx.clearRect(0, 0, cw, ch);

    const imgW = selectedImg.naturalWidth || 1920;
    const imgH = selectedImg.naturalHeight || 1080;

    // Responsive scaling: fit bottle centered and proportionally
    const hRatio = cw / imgW;
    const vRatio = ch / imgH;
    const ratio = Math.max(hRatio, vRatio);

    const dw = imgW * ratio;
    const dh = imgH * ratio;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(selectedImg, 0, 0, imgW, imgH, dx, dy, dw, dh);
  }, []);

  // Frame Loading Pipeline: Parallel & Keyframe-Prioritized
  useEffect(() => {
    let isCancelled = false;

    let frames = GLOBAL_FRAME_CACHE.get(folderPath);
    if (!frames) {
      frames = new Array(TOTAL_FRAMES);
      GLOBAL_FRAME_CACHE.set(folderPath, frames);
    }
    framesRef.current = frames;

    const loadSingleFrame = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (frames![idx]?.complete && frames![idx]!.naturalWidth > 0) {
          resolve(frames![idx]!);
          return;
        }
        const img = new Image();
        const padded = String(idx + 1).padStart(3, "0");
        img.src = `${folderPath}/ezgif-frame-${padded}.jpg`;

        img.onload = () => {
          if (!isCancelled) {
            frames![idx] = img;
            resolve(img);
          }
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    const runParallelLoader = async () => {
      // Phase 1: Load Frame 1 immediately (instant initial render)
      await loadSingleFrame(0);
      if (isCancelled) return;
      setIsReady(true);
      drawCurrentFrame(progress.get());

      // Phase 2: Load 16 keyframes across the sequence in parallel (~200ms)
      // This enables 360-degree rotation immediately even before all frames load!
      const keyframeIndices: number[] = [];
      const step = Math.floor(TOTAL_FRAMES / 16);
      for (let i = 0; i < TOTAL_FRAMES; i += step) {
        if (i !== 0) keyframeIndices.push(i);
      }
      if (!keyframeIndices.includes(TOTAL_FRAMES - 1)) {
        keyframeIndices.push(TOTAL_FRAMES - 1);
      }

      await Promise.all(keyframeIndices.map((k) => loadSingleFrame(k)));
      if (isCancelled) return;
      drawCurrentFrame(progress.get());

      // Phase 3: Fast concurrent pool for remaining frames (concurrency limit = 8)
      const remainingIndices: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!frames![i]) remainingIndices.push(i);
      }

      const CONCURRENCY = 8;
      let currentIndex = 0;

      const worker = async () => {
        while (currentIndex < remainingIndices.length && !isCancelled) {
          const idx = remainingIndices[currentIndex++];
          await loadSingleFrame(idx);
        }
      };

      await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
      if (!isCancelled) {
        drawCurrentFrame(progress.get());
      }
    };

    runParallelLoader();

    return () => {
      isCancelled = true;
    };
  }, [folderPath, progress, drawCurrentFrame]);

  // Canvas Sizing and Scroll Subscription
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      drawCurrentFrame(progress.get());
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);
    updateCanvasSize();

    // Subscribe to Framer Motion scroll progress updates with requestAnimationFrame
    let animationFrameId: number | null = null;
    const unsubscribe = progress.on("change", (latest) => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        drawCurrentFrame(latest);
      });
    });

    return () => {
      resizeObserver.disconnect();
      unsubscribe();
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [progress, drawCurrentFrame]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
    >
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-black tracking-widest uppercase animate-pulse z-10">
          Loading Sequence...
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
};
