import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { City, LocationHub } from '../types';

interface HeroSectionProps {
  cities: City[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onSearch: (city: string, hub: string, durationMode: 'HOURLY' | 'DAILY' | 'MONTHLY') => void;
  onOpenFirst3D?: () => void;
  onOpenGallery?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  onSearch,
  onOpenFirst3D,
  onOpenGallery
}) => {
  const { t } = useLanguage();
  const [durationMode, setDurationMode] = useState<'HOURLY' | 'DAILY' | 'MONTHLY'>('HOURLY');
  
  const currentCityObj = cities.find(c => c.name === selectedCity) || cities[0];
  const hubs = currentCityObj ? currentCityObj.hubs : [];
  const [selectedHub, setSelectedHub] = useState<string>(hubs[0]?.name || "Kempegowda Intl Airport (BLR)");
  const [selectedDropHub, setSelectedDropHub] = useState<string>(hubs[0]?.name || "Kempegowda Intl Airport (BLR)");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCity, selectedHub, durationMode);
  };

  return (
    <div className="relative w-full min-h-[680px] lg:min-h-[740px] flex flex-col justify-center overflow-hidden border-b border-white/10">
      {/* Photorealistic Hero Image Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />
      
      {/* Luxury Vignette & Midnight Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/60" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00E5C7]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Brand Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#141416]/90 border border-[#00E5C7]/40 shadow-teal-glow">
              <span className="w-2 h-2 rounded-full bg-[#00E5C7] animate-ping"></span>
              <span className="text-xs font-bold tracking-wider text-[#00E5C7] uppercase">Pan-India Premium Mobility</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              {t('heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              {t('heroSubtitle')} Experience India's roads with instant digital booking, transparent INR rates, and zero security deposit options.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
              <div className="p-3 rounded-xl bg-[#141416]/80 border border-white/10">
                <p className="text-xl font-bold font-display text-[#00E5C7]">14+ Metros</p>
                <p className="text-[11px] text-slate-400">Airports & Tech Hubs</p>
              </div>
              <div className="p-3 rounded-xl bg-[#141416]/80 border border-white/10">
                <p className="text-xl font-bold font-display text-white">500+ Rides</p>
                <p className="text-[11px] text-slate-400">Bikes, Scooters, EVs, SUVs</p>
              </div>
              <div className="p-3 rounded-xl bg-[#141416]/80 border border-white/10">
                <p className="text-xl font-bold font-display text-[#D4AF37]">4.96 ★</p>
                <p className="text-[11px] text-slate-400">120,000+ Trips</p>
              </div>
            </div>

            {/* Multi-Angle Fleet Gallery Launch CTA */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenGallery || onOpenFirst3D}
                className="flex items-center space-x-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#141416] via-[#1E1E24] to-[#141416] border border-[#00E5C7]/50 hover:border-[#00E5C7] text-white font-semibold text-xs shadow-teal-glow transition"
              >
                <Eye className="w-4 h-4 text-[#00E5C7]" />
                <span>Explore Multi-Angle Fleet Gallery & 360°</span>
                <ChevronRight className="w-4 h-4 text-[#00E5C7]" />
              </button>
            </div>
          </div>

          {/* Right Column: Search & Booking Hub Widget */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/15 relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">{t('searchBarTitle')}</h3>
                  <p className="text-xs text-slate-400">Pickup & drop anytime across Indian hubs</p>
                </div>
                <Zap className="w-5 h-5 text-[#00E5C7]" />
              </div>

              {/* Rental Duration Mode (Hourly / Daily / Monthly) */}
              <div className="grid grid-cols-3 gap-1 bg-[#0A0A0B] p-1 rounded-xl border border-white/10 mb-5">
                {(['HOURLY', 'DAILY', 'MONTHLY'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDurationMode(mode)}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      durationMode === mode
                        ? 'bg-[#00E5C7] text-black shadow-teal-glow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'HOURLY' ? t('hourly') : mode === 'DAILY' ? t('daily') : t('monthly')}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                {/* City Picker */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {t('pickupCity')}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        onSelectCity(e.target.value);
                        const found = cities.find(c => c.name === e.target.value);
                        if (found && found.hubs.length > 0) {
                          setSelectedHub(found.hubs[0].name);
                          setSelectedDropHub(found.hubs[0].name);
                        }
                      }}
                      className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
                    >
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name} ({city.stateCode || city.state})</option>
                      ))}
                    </select>
                    <MapPin className="absolute right-3.5 top-3 w-4 h-4 text-[#00E5C7] pointer-events-none" />
                  </div>
                </div>

                {/* Pickup Hub */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {t('pickupHub')}
                  </label>
                  <select
                    value={selectedHub}
                    onChange={(e) => setSelectedHub(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
                  >
                    {hubs.map((hub) => (
                      <option key={hub.id} value={hub.name}>{hub.name} — {hub.landmark}</option>
                    ))}
                  </select>
                </div>

                {/* Drop Hub (Can be different hub!) */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {t('dropHub')}
                    </label>
                    <span className="text-[10px] text-[#00E5C7] font-semibold">Different hub allowed</span>
                  </div>
                  <select
                    value={selectedDropHub}
                    onChange={(e) => setSelectedDropHub(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
                  >
                    {hubs.map((hub) => (
                      <option key={hub.id} value={hub.name}>{hub.name}</option>
                    ))}
                  </select>
                </div>

                {/* Schedule preview */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#0A0A0B] p-2.5 rounded-xl border border-white/10">
                    <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#00E5C7]" />
                      <span>Duration</span>
                    </p>
                    <p className="text-xs font-bold text-white mt-0.5">
                      {durationMode === 'HOURLY' ? 'Min 4 Hours' : durationMode === 'DAILY' ? '24 Hours / Day' : '30 Days Monthly'}
                    </p>
                  </div>
                  <div className="bg-[#0A0A0B] p-2.5 rounded-xl border border-white/10">
                    <p className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                      <span>Inclusions</span>
                    </p>
                    <p className="text-xs font-bold text-white mt-0.5">2 Helmets + Fastag</p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#00E5C7] via-[#00DFBD] to-[#00C4A7] text-black font-extrabold text-sm shadow-teal-glow hover:opacity-95 transition flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Show Available Vehicles in {selectedCity}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
