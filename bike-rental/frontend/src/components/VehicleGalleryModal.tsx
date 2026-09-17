import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleColourVariant } from '../types';
import { getVehicleColourVariants, getColorGallery } from '../services/vehicleColours';
import { buildImageKitUrl } from '../services/imageKit';
import { 
  X, 
  ShieldCheck, 
  Gauge, 
  Zap, 
  Fuel, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCw,
  Palette,
  Info,
  Camera,
  Clock,
  Sparkles
} from 'lucide-react';
import { Photographic360Viewer } from './Photographic360Viewer';

interface VehicleGalleryModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (vehicle: Vehicle) => void;
}

export const VehicleGalleryModal: React.FC<VehicleGalleryModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onBook
}) => {
  const [activeTab, setActiveTab] = useState<'GALLERY' | '360'>('GALLERY');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColour, setSelectedColour] = useState<VehicleColourVariant | null>(null);

  // Compute authentic OEM colour variants directly from verified registry
  const colourVariants: VehicleColourVariant[] = vehicle 
    ? getVehicleColourVariants(vehicle)
    : [];

  const primaryColour = colourVariants.find(c => c.photoStatus === 'AVAILABLE' && c.galleryImages.length > 0) || colourVariants[0];

  // Active colour object fallback
  const currentColour = selectedColour || primaryColour;

  // Active displayed images:
  // Strictly display only images belonging to currentColour via getColorGallery helper.
  const displayedImages: string[] = getColorGallery(currentColour);

  const isPending = displayedImages.length === 0;

  useEffect(() => {
    if (vehicle) {
      const variants = getVehicleColourVariants(vehicle);
      const primary = variants.find(c => c.photoStatus === 'AVAILABLE' && c.galleryImages.length > 0) || variants[0];
      setSelectedColour(primary || null);
      setActiveImageIndex(0);
      setActiveTab('GALLERY');
    }
  }, [vehicle?.id]);

  const handlePrev = () => {
    if (displayedImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + displayedImages.length) % displayedImages.length);
  };

  const handleNext = () => {
    if (displayedImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % displayedImages.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, displayedImages.length]);

  if (!isOpen || !vehicle) return null;

  const angleLabels = [
    'Front 3/4 (Hero Perspective)',
    'Front View',
    'Side Profile',
    'Rear Perspective',
    'Cockpit / Instrument Cluster'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#141416] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0B]/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/30 flex items-center justify-center text-[#00E5C7]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#00E5C7]">
                  Production Vehicle Showcase
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 inline mr-1" />
                  Indian-Market Specification • Verified Fleet Unit
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-display">
                {vehicle.name} <span className="text-[#00E5C7] text-sm font-normal">({vehicle.variant || vehicle.model})</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Switcher Tabs */}
            <div className="hidden sm:flex bg-black/50 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('GALLERY')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center space-x-1.5 ${
                  activeTab === 'GALLERY' ? 'bg-[#00E5C7] text-black shadow-teal-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Photographs ({displayedImages.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('360')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center space-x-1.5 ${
                  activeTab === '360' ? 'bg-[#00E5C7] text-black shadow-teal-glow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>4 Exterior Perspectives</span>
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="sm:hidden flex bg-[#0A0A0B] p-1.5 border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('GALLERY')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition text-center ${
              activeTab === 'GALLERY' ? 'bg-[#00E5C7] text-black' : 'text-slate-400'
            }`}
          >
            Photographs ({displayedImages.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('360')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition text-center ${
              activeTab === '360' ? 'bg-[#00E5C7] text-black' : 'text-slate-400'
            }`}
          >
            4 Exterior Perspectives
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Visual Showcase (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {activeTab === '360' ? (
              <Photographic360Viewer
                frames={
                  (currentColour?.spin360Images && currentColour.spin360Images.length > 0)
                    ? currentColour.spin360Images
                    : (displayedImages.length > 0 ? displayedImages.slice(0, 7) : [])
                }
                vehicleName={`${vehicle.name} (${currentColour?.name || ''})`}
                onSwitchToGallery={() => setActiveTab('GALLERY')}
              />
            ) : (
              <>
                {/* Primary Photo Container */}
                <div className="relative w-full aspect-[16/10] bg-[#0A0A0B] rounded-2xl overflow-hidden border border-white/10 group shadow-inner">
                  <img
                    src={buildImageKitUrl(displayedImages[activeImageIndex] || vehicle.imageUrl, { width: 1200, quality: 85 })}
                    alt={`${vehicle.name} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = buildImageKitUrl(vehicle.imageUrl);
                    }}
                  />

                  {/* Honest PHOTO PENDING Overlay Banner */}
                  {isPending && (
                    <div className="absolute top-3 inset-x-3 bg-[#181206]/90 backdrop-blur-md border border-amber-500/40 rounded-xl p-3 z-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-2xl">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/25 text-amber-300 font-bold text-[9px] uppercase tracking-wider">
                              PHOTO PENDING — Available in Fleet
                            </span>
                            <span className="text-[11px] text-white font-bold">
                              {currentColour?.name}
                            </span>
                          </div>
                          <p className="text-[10px] text-amber-200/80 leading-tight mt-0.5">
                            Commercial studio multi-angle photography for {currentColour?.name} is pending. Displaying {primaryColour?.name} reference photography.
                          </p>
                        </div>
                      </div>
                      {primaryColour && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedColour(primaryColour);
                            setActiveImageIndex(0);
                          }}
                          className="self-start sm:self-auto px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 text-[11px] font-semibold transition shrink-0"
                        >
                          Switch to {primaryColour.name} (Photos Available)
                        </button>
                      )}
                    </div>
                  )}

                  {/* Navigation Overlay Arrows */}
                  {displayedImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        aria-label="Previous angle"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition backdrop-blur-sm opacity-80 hover:opacity-100 hover:scale-110 shadow-lg z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        aria-label="Next angle"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition backdrop-blur-sm opacity-80 hover:opacity-100 hover:scale-110 shadow-lg z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Top-Left Angle Badge (Shown when not obscured by pending banner) */}
                  {!isPending && (
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold text-white flex items-center space-x-1.5 z-10">
                      <Compass className="w-3.5 h-3.5 text-[#00E5C7]" />
                      <span>{angleLabels[activeImageIndex] || `Angle ${activeImageIndex + 1}`}</span>
                    </div>
                  )}

                  {/* Bottom-Left Reference Watermark if Pending */}
                  {isPending && (
                    <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] text-amber-300 font-mono z-10">
                      Reference: {primaryColour?.name} • {currentColour?.name} Ingestion Pending
                    </div>
                  )}

                  {/* Top-Right Expand Lightbox Button */}
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 border border-white/15 text-white hover:border-[#00E5C7] transition backdrop-blur-md z-10"
                    title="Expand fullscreen view"
                  >
                    <Maximize2 className="w-4 h-4 text-[#00E5C7]" />
                  </button>

                  {/* Bottom-Right Angle Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] text-slate-300 font-mono z-10">
                    {activeImageIndex + 1} / {displayedImages.length} Angles
                  </div>
                </div>

                {/* 5-Angle Thumbnail Strip */}
                <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-thin">
                  {displayedImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative flex-shrink-0 w-24 sm:w-28 h-16 rounded-xl overflow-hidden border-2 transition ${
                        activeImageIndex === idx
                          ? 'border-[#00E5C7] shadow-teal-glow scale-105'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={buildImageKitUrl(imgUrl, { width: 300, quality: 80 })} 
                        alt={`Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = buildImageKitUrl(vehicle.imageUrl);
                        }}
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/85 py-0.5 text-[8px] text-center font-bold text-slate-300 truncate px-1">
                        {angleLabels[idx] || `Angle ${idx + 1}`}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Authentic OEM Factory Colour Variants Section */}
            <div className="p-4 bg-[#0A0A0B]/80 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-[#00E5C7]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Factory Colour Palette (Indian OEM Specification)
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-semibold text-white">
                    {currentColour?.name}
                  </span>
                  {currentColour?.photoStatus === 'AVAILABLE' ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Photos Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                      Photo Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Colour Swatches Grid */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {colourVariants.map((c) => {
                  const isSelected = currentColour?.name === c.name;
                  const isAvail = c.photoStatus === 'AVAILABLE';
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setSelectedColour(c);
                        setActiveImageIndex(0);
                      }}
                      className={`group relative flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-[#00E5C7] bg-[#00E5C7]/15 text-white shadow-teal-glow ring-1 ring-[#00E5C7]'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-inner" 
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span className="truncate max-w-[130px]">{c.name}</span>
                      {isAvail ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Photographs available" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" title="Photo pending ingestion" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Honest Colour Status / Source Notice */}
              {isPending ? (
                <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p>
                      Commercial studio multi-angle photography for <strong>{currentColour?.name}</strong> is currently pending.
                    </p>
                    <p className="text-slate-400 text-[10px]">
                      This vehicle is fully available at our fleet hubs. Zero synthetic transformations or artificial recolouring.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>
                      Authentic color-specific studio gallery for <strong>{currentColour?.name}</strong> ({displayedImages.length} Images)
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {currentColour?.manufacturer}
                  </span>
                </div>
              )}
            </div>

            {/* Authentic Photography Sourcing & Educational Fair Use Disclaimer */}
            <div className="p-3 bg-[#0A0A0B]/60 rounded-xl border border-white/5 text-[11px] text-slate-400 flex items-start space-x-2.5">
              <Award className="w-4 h-4 text-[#00E5C7] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-300">Verified Vehicle Reference Images:</span> All multi-angle photographs represent Indian-market production vehicles cross-referenced with manufacturer catalog specifications. Sourced for academic and demonstration reference under educational fair use. Zero AI-generated frames.
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Real Telemetry (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Technical Specifications Grid */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                Indian-Market Production Specifications
              </h4>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Peak Power</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    {vehicle.powerBhp ? `${vehicle.powerBhp} BHP` : 'High Output'}
                  </div>
                </div>

                <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Gauge className="w-3.5 h-3.5 text-[#00E5C7]" />
                    <span>Max Torque</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    {vehicle.torqueNm ? `${vehicle.torqueNm} Nm` : 'Optimized'}
                  </div>
                </div>

                <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Fuel className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Efficiency / Range</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono truncate">
                    {vehicle.mileageOrRange}
                  </div>
                </div>

                <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5">
                  <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ground Clearance</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    {vehicle.groundClearanceMm ? `${vehicle.groundClearanceMm} mm` : '165 mm'}
                  </div>
                </div>
              </div>

              {/* Vehicle Highlights */}
              <div className="p-3.5 bg-[#0A0A0B] rounded-xl border border-white/5 space-y-2">
                <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">Key Features</p>
                <div className="space-y-1.5">
                  {vehicle.features ? vehicle.features.split(',').map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C7] flex-shrink-0" />
                      <span>{feat.trim()}</span>
                    </div>
                  )) : null}
                </div>
              </div>

              {/* Selected Colour Summary */}
              <div className="p-3 bg-[#0A0A0B] rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Selected OEM Shade</span>
                  <span className="font-bold text-white flex items-center space-x-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-white/30 inline-block" 
                      style={{ backgroundColor: currentColour?.hex }} 
                    />
                    <span>{currentColour?.name}</span>
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentColour?.sourceInfo}
                </div>
              </div>

              {/* Rental Rates Summary */}
              <div className="p-3.5 bg-gradient-to-br from-[#0A0A0B] to-[#1a1a20] rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Hourly Rate</span>
                  <span className="font-bold text-white font-mono">₹{vehicle.pricePerHour} / hr</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Daily Rate</span>
                  <span className="font-bold text-white font-mono">₹{vehicle.pricePerDay} / day</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Refundable Deposit</span>
                  <span className="font-bold text-emerald-400 font-mono">₹{vehicle.securityDeposit}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center space-x-3">
              {vehicle.available && (vehicle.fleetUnitsAvailable === undefined || vehicle.fleetUnitsAvailable > 0) ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBook(vehicle);
                  }}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-sm shadow-teal-glow hover:opacity-95 transition flex items-center justify-center space-x-2"
                >
                  <span>Reserve {vehicle.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 font-bold text-sm cursor-not-allowed flex items-center justify-center"
                >
                  <span>Currently Unavailable (0 Fleet Units)</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
            <span className="text-xs text-slate-400 mr-2">
              {angleLabels[activeImageIndex] || `Angle ${activeImageIndex + 1}`} ({activeImageIndex + 1}/{displayedImages.length})
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          <img
            src={buildImageKitUrl(displayedImages[activeImageIndex] || vehicle.imageUrl, { width: 1920, quality: 90 })}
            alt={`${vehicle.name} fullscreen view`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {displayedImages.length > 1 && (
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="pointer-events-auto p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="pointer-events-auto p-3 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
