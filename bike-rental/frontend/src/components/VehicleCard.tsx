import React from 'react';
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

interface VehicleCardProps {
  vehicle: Vehicle;
  durationMode: 'HOURLY' | 'DAILY' | 'MONTHLY';
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

  return (
    <div className={`glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group border transition-all duration-300 ${
      isAvailable 
        ? 'border-white/10 hover:border-[#00E5C7]/50' 
        : 'border-red-500/20 opacity-90'
    }`}>
      
      {/* Top Media & Badges Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#1E1E24] to-[#141416]">
        <img 
          src={vehicle.imageUrl} 
          alt={vehicle.name}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ${
            isAvailable ? 'group-hover:scale-105' : 'grayscale-[40%]'
          }`}
          loading="lazy"
          onError={(e) => {
            // Fallback placeholder if local asset path is missing
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23141416" width="600" height="400"/><text fill="%2300E5C7" font-family="sans-serif" font-size="24" font-weight="bold" x="50%" y="50%" text-anchor="middle">TBH FLEET UNIT</text></svg>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/40" />

        {/* Category & Availability Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#0A0A0B]/80 text-[#00E5C7] border border-[#00E5C7]/30 backdrop-blur-md">
            {vehicle.category ? vehicle.category.replace(/_/g, ' ') : vehicle.vehicleType.replace(/_/g, ' ')}
          </span>
          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
            vehicle.fuelType === 'ELECTRIC' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {vehicle.fuelType}
          </span>
          <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider bg-black/80 text-white/90 border border-white/20 backdrop-blur-md">
            {vehicle.maskedRegistrationNumber || 'TS09••••1234'}
          </span>
          
          {/* Availability Status Badge */}
          {!isAvailable ? (
            <span className="px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/90 text-white border border-rose-400 backdrop-blur-md flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              CURRENTLY UNAVAILABLE
            </span>
          ) : vehicle.fleetUnitsAvailable !== undefined && vehicle.fleetUnitsAvailable > 0 ? (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 inline mr-1" />
              {vehicle.fleetUnitsAvailable} UNITS AT HUBS
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={() => onToggleWishlist(vehicle.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0A0A0B]/70 border border-white/15 flex items-center justify-center text-slate-300 hover:text-rose-400 transition"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Visual Asset Action Button (Multi-Angle Photography & 360) */}
        <div className="absolute bottom-3 right-3 flex items-center">
          <button
            onClick={() => onOpenGallery ? onOpenGallery(vehicle) : (onOpen3D && onOpen3D(vehicle))}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0A0A0B]/85 hover:bg-[#00E5C7] text-[#00E5C7] hover:text-black border border-[#00E5C7]/60 font-bold text-[11px] backdrop-blur-md transition shadow-teal-glow"
            title="Inspect 5 high-resolution angles & photographic 360"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Angles & 360°</span>
          </button>
        </div>

        {/* Real Ratings & Reviews or First Review Prompt */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-xs font-semibold text-white bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
          {vehicle.rating && vehicle.rating > 0 ? (
            <>
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>{vehicle.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({vehicle.reviewCount || 1} verified)</span>
            </>
          ) : (
            <span className="text-slate-300 text-[10px] italic">Be the first to review</span>
          )}
        </div>
      </div>

      {/* Vehicle Info & Telemetry Specs */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-slate-400">{vehicle.brand}</p>
            {vehicle.assetVerified === false && (
              <span 
                className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono"
                title="College project demonstration reference photo. Replacement required for commercial launch."
              >
                DEMO REF
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold text-white font-display leading-snug">{vehicle.name}</h4>
          <p className="text-xs text-[#00E5C7] font-medium">{vehicle.variant || vehicle.model}</p>
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
