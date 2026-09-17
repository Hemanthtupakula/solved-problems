import React, { useState, useMemo, useEffect } from 'react';
import { 
  Gauge, 
  Zap, 
  Shield, 
  Fuel, 
  Heart, 
  Star, 
  Layers, 
  ArrowRight, 
  Eye, 
  AlertCircle, 
  CheckCircle2, 
  BatteryCharging 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Vehicle } from '../types';
import { buildImageKitUrl } from '../services/imageKit';
import { getVehicleColourVariants, getColorRepresentativeImage } from '../services/vehicleColours';

interface VehicleCardProps {
  vehicle: Vehicle;
  durationMode: 'HOURLY' | 'DAILY' | 'MONTHLY';
  selectedCity?: string;
  onOpen3D?: (vehicle: Vehicle) => void;
  onOpenGallery?: (vehicle: Vehicle) => void;
  onQuickBook: (vehicle: Vehicle) => void;
  onToggleCompare: (vehicle: Vehicle) => void;
  isCompared: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (vehicleId: number) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  durationMode,
  selectedCity = 'Bengaluru',
  onOpen3D,
  onOpenGallery,
  onQuickBook,
  onToggleCompare,
  isCompared,
  isWishlisted,
  onToggleWishlist
}) => {
  const { t } = useLanguage();

  const isAvailable = vehicle.available && (vehicle.fleetUnitsAvailable === undefined || vehicle.fleetUnitsAvailable > 0);

  const currentPrice = 
    durationMode === 'HOURLY' ? vehicle.pricePerHour :
    durationMode === 'DAILY' ? vehicle.pricePerDay : vehicle.pricePerMonth;

  const priceUnit = 
    durationMode === 'HOURLY' ? t('perHour') :
    durationMode === 'DAILY' ? t('perDay') : t('perMonth');

  // Model-specific OEM colour palette derivation
  const colourVariants = useMemo(() => {
    return (vehicle.colourVariants && vehicle.colourVariants.length > 0)
      ? vehicle.colourVariants
      : getVehicleColourVariants(vehicle);
  }, [vehicle]);

  const defaultIndex = useMemo(() => {
    const idx = colourVariants.findIndex(c => c.photoStatus === 'AVAILABLE');
    return idx >= 0 ? idx : 0;
  }, [colourVariants]);

  const [selectedColourIndex, setSelectedColourIndex] = useState<number>(defaultIndex);

  useEffect(() => {
    setSelectedColourIndex(defaultIndex);
  }, [vehicle.id, defaultIndex]);

  const currentColour = colourVariants[selectedColourIndex] || colourVariants[0];
  const colorRepImage = getColorRepresentativeImage(currentColour);
  const isPhotoAvailable = Boolean(colorRepImage && currentColour?.galleryImages && currentColour.galleryImages.length > 0);
  const cardImageUrl = colorRepImage || vehicle.imageUrl;

  // Dynamic State Plate resolution based on selected city identity
  const getCityStatePlate = (cityName: string, id: number) => {
    // Prefer actual backend registration if assigned to fleet unit
    const actualReg = vehicle.maskedRegistrationNumber || (vehicle as any).registrationNumber;
    if (actualReg && typeof actualReg === 'string' && actualReg.trim() !== '') {
      return actualReg;
    }

    const c = cityName.toUpperCase();
    let state = 'KA';
    if (c.includes('HYDERABAD') || c.includes('TELANGANA') || c === 'TG' || c === 'TS') state = 'TS';
    else if (c.includes('CHENNAI') || c.includes('TAMIL') || c === 'TN') state = 'TN';
    else if (c.includes('MUMBAI') || c.includes('PUNE') || c.includes('MAHARASHTRA') || c === 'MH') state = 'MH';
    else if (c.includes('DELHI') || c.includes('NCR') || c === 'DL') state = 'DL';
    else if (c.includes('KOLKATA') || c.includes('WEST BENGAL') || c === 'WB') state = 'WB';
    else if (c.includes('GOA') || c === 'GA') state = 'GA';
    else if (c.includes('JAIPUR') || c.includes('RAJASTHAN') || c === 'RJ') state = 'RJ';
    else if (c.includes('AHMEDABAD') || c.includes('GUJARAT') || c === 'GJ') state = 'GJ';
    else if (c.includes('KOCHI') || c.includes('KERALA') || c === 'KL') state = 'KL';
    else if (c.includes('BENGALURU') || c.includes('BANGALORE') || c.includes('KARNATAKA') || c === 'KA') state = 'KA';

    const isEv = vehicle.fuelType === 'ELECTRIC' || id >= 42;
    const tag = isEv ? 'EV' : (id % 2 === 0 ? 'EQ' : 'TR');
    const dist = String((id % 9) + 1).padStart(2, '0');
    const digits = String(1000 + ((id * 47 + 1289) % 8999));
    return `${state}-${dist}-${tag}-${digits}`;
  };

  const formattedStockText = () => {
    if (vehicle.fleetUnitsAvailable === undefined || vehicle.fleetUnitsAvailable === null) {
      return 'AVAILABLE AT HUBS';
    }
    if (vehicle.fleetUnitsAvailable === 1) {
      return '1 UNIT AT HUB';
    }
    return `${vehicle.fleetUnitsAvailable} UNITS AT HUBS`;
  };

  return (
    <div className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group border transition-all duration-300 ${
      isAvailable 
        ? 'border-white/10 hover:border-[#00E5C7]/50' 
        : 'border-red-500/20 opacity-90'
    }`}>
      
      {/* Top Media & Badges Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#1E1E24] to-[#141416]">
        <img 
          src={buildImageKitUrl(cardImageUrl, { width: 600, quality: 85 })} 
          alt={`${vehicle.name} - ${currentColour?.name || ''}`}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ${
            isAvailable ? 'group-hover:scale-105' : 'grayscale-[40%]'
          }`}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23141416" width="600" height="400"/><text fill="%2300E5C7" font-family="sans-serif" font-size="24" font-weight="bold" x="50%" y="50%" text-anchor="middle">TBH FLEET UNIT</text></svg>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/40" />

        {/* Category & Availability Badges */}
        <div className="absolute top-3 left-3 right-12 flex flex-wrap gap-1.5 items-center">
          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-[#0A0A0B]/85 text-[#00E5C7] border border-[#00E5C7]/30 backdrop-blur-md">
            {vehicle.category ? vehicle.category.replace(/_/g, ' ') : vehicle.vehicleType.replace(/_/g, ' ')}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
            vehicle.fuelType === 'ELECTRIC' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {vehicle.fuelType}
          </span>
          
          {/* Dynamic Registration Plate matching selected city */}
          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider bg-black/85 text-slate-100 border border-white/20 backdrop-blur-md">
            {getCityStatePlate(selectedCity, vehicle.id)}
          </span>
          
          {/* Fleet Availability Status Badge */}
          {!isAvailable ? (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-rose-500/90 text-white border border-rose-400 backdrop-blur-md flex items-center space-x-1">
              <AlertCircle className="w-2.5 h-2.5 inline mr-0.5" />
              UNAVAILABLE
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center space-x-1">
              <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5" />
              {formattedStockText()}
            </span>
          )}

          {/* Secondary Photography Indicator */}
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-medium backdrop-blur-md ${
            isPhotoAvailable 
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' 
              : 'bg-black/80 text-amber-300 border border-amber-500/30'
          }`}>
            {isPhotoAvailable ? 'Photo Available' : 'Photography Pending'}
          </span>
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={() => onToggleWishlist(vehicle.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0A0A0B]/70 border border-white/15 flex items-center justify-center text-slate-300 hover:text-rose-400 transition"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Action Button: Angles & 360 */}
        <div className="absolute bottom-3 right-3 flex items-center">
          <button
            onClick={() => onOpenGallery ? onOpenGallery(vehicle) : (onOpen3D && onOpen3D(vehicle))}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0B]/85 hover:bg-[#00E5C7] text-[#00E5C7] hover:text-black border border-[#00E5C7]/60 font-bold text-[11px] backdrop-blur-md transition shadow-teal-glow"
            title="Inspect high-resolution angles & 360 photography"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Angles & 360°</span>
          </button>
        </div>

        {/* Commercial Fleet Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-xs font-semibold text-white bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/15">
          <Shield className="w-3.5 h-3.5 text-[#00E5C7]" />
          <span className="text-slate-200 text-[10px] font-medium tracking-wide">Commercial Fleet</span>
        </div>
      </div>

      {/* Vehicle Info & Telemetry Specs */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-semibold text-slate-400">{vehicle.brand}</p>
          <h4 className="text-lg font-bold text-white font-display leading-snug">{vehicle.name}</h4>
          <p className="text-xs text-[#00E5C7] font-medium">{vehicle.variant || vehicle.model}</p>
          {colourVariants && colourVariants.length > 0 && (
            <div className="mt-2.5 p-2.5 bg-[#141416]/90 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 min-w-0 pr-2">
                  <span className="text-slate-400 text-[10px] font-medium shrink-0">Shade:</span>
                  <span className="text-white font-bold text-xs truncate">{currentColour?.name}</span>
                </div>
                <div className="shrink-0 text-[10px] font-medium">
                  {isPhotoAvailable ? (
                    <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      <span>Verified Photo</span>
                    </span>
                  ) : (
                    <span className="text-amber-400/90 font-semibold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      <span>Available at Fleet • Photo Pending</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                {colourVariants.map((c, i) => {
                  const isSelected = i === selectedColourIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColourIndex(i);
                      }}
                      className={`relative group transition-all duration-200 rounded-full p-0.5 ${
                        isSelected 
                          ? 'ring-2 ring-[#00E5C7] ring-offset-2 ring-offset-[#141416] scale-110 z-10' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      title={`${c.name} (${c.photoStatus === 'AVAILABLE' ? 'Photo Available' : 'Available at Fleet • Photography Pending'})`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Performance Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 bg-[#0A0A0B]/60 p-2.5 rounded-xl border border-white/5">
          <div className="flex items-center space-x-2">
            <Gauge className="w-3.5 h-3.5 text-[#00E5C7]" />
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-semibold">{t('topSpeed')}</p>
              <p className="text-xs font-bold text-white font-mono">{vehicle.maxSpeed} km/h</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-semibold">{t('acceleration')}</p>
              <p className="text-xs font-bold text-white font-mono">{vehicle.zeroToHundred}s</p>
            </div>
          </div>
          {vehicle.fuelType === 'ELECTRIC' ? (
            <>
              <div className="flex items-center space-x-2">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Battery Pack</p>
                  <p className="text-[11px] font-bold text-slate-200 font-mono">
                    {vehicle.batteryCapacityKwh ? `${vehicle.batteryCapacityKwh} kWh` : vehicle.engineOrBattery}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">IDC Range</p>
                  <p className="text-[11px] font-bold text-slate-200 font-mono">{vehicle.mileageOrRange}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Fuel className="w-3.5 h-3.5 text-slate-400" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Engine / Power</p>
                  <p className="text-[11px] font-bold text-slate-200 truncate">
                    {vehicle.powerBhp ? `${vehicle.powerBhp} bhp` : vehicle.engineOrBattery}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold">Mileage</p>
                  <p className="text-[11px] font-bold text-slate-200">{vehicle.mileageOrRange}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Pricing & Booking Action */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Starting at</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold font-display text-white">₹{currentPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-slate-400 font-semibold">{priceUnit}</span>
            </div>
            <p className="text-[10px] text-slate-400">₹{vehicle.securityDeposit.toLocaleString('en-IN')} deposit</p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Compare Checkbox */}
            <button
              onClick={() => onToggleCompare(vehicle)}
              className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 ${
                isCompared 
                  ? 'bg-[#00E5C7]/20 border-[#00E5C7] text-[#00E5C7] shadow-teal-glow' 
                  : 'bg-[#141416] border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison table"}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Compared' : '+ Compare'}</span>
            </button>

            {/* Quick Book / Unavailable Button */}
            {isAvailable ? (
              <button
                onClick={() => onQuickBook(vehicle)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition flex items-center space-x-1.5"
              >
                <span>{t('quickBook')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 text-slate-400 border border-slate-700 font-bold text-xs cursor-not-allowed"
                title="This model currently has 0 available fleet units for rental"
              >
                Unavailable
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
