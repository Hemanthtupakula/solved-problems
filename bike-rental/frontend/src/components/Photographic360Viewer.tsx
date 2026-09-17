import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  Eye, 
  Clock
} from 'lucide-react';
import { buildImageKitUrl } from '../services/imageKit';

interface Photographic360ViewerProps {
  frames?: string[];
  vehicleName: string;
  onSwitchToGallery: () => void;
}

export const Photographic360Viewer: React.FC<Photographic360ViewerProps> = ({
  frames = [],
  vehicleName,
  onSwitchToGallery
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragSensitivity = 15; // Pixels per frame shift

  const hasFrames = frames && frames.length > 1;

  // Frame Preloading
  useEffect(() => {
    if (!hasFrames) return;
    let count = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.src = buildImageKitUrl(src, { width: 800, quality: 80 });
      img.onload = () => {
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        count++;
        setLoadedCount(count);
      };
    });
  }, [frames]);

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || !hasFrames) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frames.length);
    }, 600);
    return () => clearInterval(interval);
  }, [isAutoRotating, hasFrames, frames.length]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasFrames) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !hasFrames) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) >= dragSensitivity) {
      const step = Math.trunc(diff / dragSensitivity);
      setCurrentIndex((prev) => {
        const next = (prev - step + frames.length) % frames.length;
        return next;
      });
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasFrames || e.touches.length === 0) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoRotating(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !hasFrames || e.touches.length === 0) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) >= dragSensitivity) {
      const step = Math.trunc(diff / dragSensitivity);
      setCurrentIndex((prev) => {
        const next = (prev - step + frames.length) % frames.length;
        return next;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  if (!hasFrames) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[#0A0A0B] rounded-2xl border border-white/10 text-center space-y-4 aspect-[16/10]">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <RotateCw className="w-7 h-7" />
        </div>
        <div className="max-w-md space-y-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider font-mono">
            Licensing / Ingestion Pending
          </span>
          <h4 className="text-base font-bold text-white font-display">
            Photographic 360° Sequence Pending
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            TBH strictly enforces zero synthetic/AI-generated rotation. Continuous 36-frame photographic 360° sequences for <strong>{vehicleName}</strong> are currently pending commercial studio ingestion.
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitchToGallery}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Explore 5 Verified Production Angles</span>
        </button>
      </div>
    );
  }

  const isPreloading = loadedCount < frames.length;
  const progressPercent = Math.round((loadedCount / frames.length) * 100);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-[16/10] bg-[#0A0A0B] rounded-2xl overflow-hidden border border-white/10 select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 360 Active Frame */}
      <img
        src={buildImageKitUrl(frames[currentIndex], { width: 800, quality: 80 })}
        alt={`${vehicleName} perspective ${currentIndex + 1}`}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Progress Bar during frame preloading */}
      {isPreloading && (
        <div className="absolute top-0 inset-x-0 h-1 bg-black/60 z-20">
          <div 
            className="h-full bg-gradient-to-r from-[#00E5C7] to-[#D4AF37] transition-all duration-200"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Top HUD */}
      <div className="absolute top-3 left-3 flex items-center space-x-2 pointer-events-none z-10">
        <span className="px-2.5 py-1 rounded-lg bg-black/75 border border-[#00E5C7]/40 text-[#00E5C7] text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md flex items-center space-x-1.5 shadow-teal-glow">
          <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
          <span>4 Exterior Perspectives</span>
        </span>
        <span className="px-2 py-1 rounded-lg bg-black/75 border border-white/10 text-slate-300 text-[10px] font-mono backdrop-blur-md">
          Perspective {currentIndex + 1} / {frames.length}
        </span>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className="p-2 rounded-xl bg-black/75 border border-white/15 text-white hover:border-[#00E5C7] transition backdrop-blur-md"
          title={isAutoRotating ? "Pause perspective cycle" : "Auto-cycle perspectives"}
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5 text-[#00E5C7]" /> : <Play className="w-3.5 h-3.5 text-[#00E5C7]" />}
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-black/75 border border-white/15 text-white hover:border-white/30 transition backdrop-blur-md"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Honest Multi-Angle Exterior Scrubbing Disclaimer */}
      {frames.length < 12 && (
        <div className="absolute top-12 left-3 max-w-[360px] pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-lg bg-black/85 border border-amber-500/30 text-amber-300 text-[9px] font-medium backdrop-blur-md block leading-tight shadow-md">
            4 Exterior Perspectives • 5th photo (Cockpit/Interior) excluded from rotation • Full 36-frame continuous turntable pending studio ingestion
          </span>
        </div>
      )}

      {/* Drag Instruction Banner */}
      <div className="absolute bottom-12 inset-x-0 flex justify-center pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-[10px] text-slate-300 backdrop-blur-md shadow-lg flex items-center space-x-1.5">
          <RotateCw className="w-3 h-3 text-[#00E5C7]" />
          <span>Drag horizontally or swipe on mobile to rotate perspectives</span>
        </span>
      </div>

      {/* Bottom Scrubber Bar */}
      <div className="absolute bottom-3 inset-x-4 flex items-center space-x-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
        <span className="text-[9px] font-mono text-slate-400">1</span>
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          value={currentIndex}
          onChange={(e) => {
            setCurrentIndex(parseInt(e.target.value, 10));
            setIsAutoRotating(false);
          }}
          className="w-full accent-[#00E5C7] h-1.5 bg-white/20 rounded-lg cursor-pointer"
        />
        <span className="text-[9px] font-mono text-slate-400">{frames.length}</span>
      </div>
    </div>
  );
};
