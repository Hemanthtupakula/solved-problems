import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown,
  Layers
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VehicleCard } from './components/VehicleCard';
import { VehicleGalleryModal } from './components/VehicleGalleryModal';
import { BookingModal } from './components/BookingModal';
import { DigitalRentalPassModal } from './components/DigitalRentalPassModal';
import { VehicleCompareModal } from './components/VehicleCompareModal';
import { CompareDrawer } from './components/CompareDrawer';
import { AuthModal } from './components/AuthModal';
import { KycModal } from './components/KycModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AdminRoute } from './components/AdminRoute';
import { AdminDashboard } from './components/AdminDashboard';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { Footer } from './components/Footer';
import { api, INITIAL_CITIES, INITIAL_VEHICLES } from './services/api';
import { Vehicle, City, Booking, VehicleCategory } from './types';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  
  const [cities, setCities] = useState<City[]>(INITIAL_CITIES);
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [durationMode, setDurationMode] = useState<'HOURLY' | 'DAILY' | 'MONTHLY'>('HOURLY');
  
  // Filters
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('ALL');
  const [fuelFilter, setFuelFilter] = useState<'ALL' | 'PETROL' | 'DIESEL' | 'ELECTRIC'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'POPULAR' | 'PRICE_ASC' | 'PRICE_DESC' | 'SPEED'>('POPULAR');

  // Modals
  const [selectedGalleryVehicle, setSelectedGalleryVehicle] = useState<Vehicle | null>(null);
  const [selectedBookingVehicle, setSelectedBookingVehicle] = useState<Vehicle | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isKycOpen, setIsKycOpen] = useState<boolean>(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  useEffect(() => {
    loadData();
  }, [selectedCity]);

  const loadData = async () => {
    const cityList = await api.getCities();
    if (cityList && cityList.length > 0) setCities(cityList);

    const vehicleList = await api.getVehicles(selectedCity);
    if (vehicleList && vehicleList.length > 0) setVehicles(vehicleList);
  };

  const handleToggleCompare = (v: Vehicle) => {
    if (comparedVehicles.some(item => item.id === v.id)) {
      setComparedVehicles(comparedVehicles.filter(item => item.id !== v.id));
    } else {
      if (comparedVehicles.length >= 4) {
        alert('You can compare up to 4 vehicles simultaneously. Please remove one to add another.');
        return;
      }
      setComparedVehicles([...comparedVehicles, v]);
    }
  };

  const handleToggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleToggleAvailability = async (id: number) => {
    // Optimistic UI update
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, available: !v.available } : v));
    try {
      await api.toggleVehicleAvailability(id);
    } catch (err) {
      console.warn('Backend toggle failed or unauthenticated, reverting optimistic state:', err);
      setVehicles(prev => prev.map(v => v.id === id ? { ...v, available: !v.available } : v));
      alert('Failed to update vehicle status on server. Please ensure you are authenticated as Operations Admin.');
    }
  };


  // Filter and Sort Fleet
  const filteredVehicles = vehicles
    .filter(v => {
      // Category filter
      if (activeCategory !== 'ALL' && v.vehicleType !== activeCategory) return false;
      // Fuel filter
      if (fuelFilter !== 'ALL' && v.fuelType !== fuelFilter) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = v.name.toLowerCase().includes(query);
        const matchBrand = v.brand.toLowerCase().includes(query);
        const matchModel = v.model.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchModel) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = durationMode === 'HOURLY' ? a.pricePerHour : durationMode === 'DAILY' ? a.pricePerDay : a.pricePerMonth;
      const priceB = durationMode === 'HOURLY' ? b.pricePerHour : durationMode === 'DAILY' ? b.pricePerDay : b.pricePerMonth;
      
      if (sortBy === 'PRICE_ASC') return priceA - priceB;
      if (sortBy === 'PRICE_DESC') return priceB - priceA;
      if (sortBy === 'SPEED') return b.maxSpeed - a.maxSpeed;
      return b.rating - a.rating;
    });

  if (currentPath === '/admin') {
    return (
      <AdminRoute
        onRedirectToHome={() => navigateTo('/')}
        onOpenAuth={() => setIsAuthOpen(true)}
      >
        <AdminDashboard
          onBackToHome={() => navigateTo('/')}
          onOpenAuth={() => setIsAuthOpen(true)}
          vehicles={vehicles}
          cities={cities}
          onToggleAvailability={handleToggleAvailability}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </AdminRoute>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col justify-between selection:bg-[#00E5C7] selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
        compareCount={comparedVehicles.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenBookings={() => setIsBookingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => navigateTo('/admin')}
        onOpenKyc={() => setIsKycOpen(true)}
      />

      {/* Hero Section with Bengaluru 3D Background */}
      <HeroSection
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
        onSearch={(city, _hub, mode) => {
          setSelectedCity(city);
          setDurationMode(mode);
          const fleetSection = document.getElementById('fleet-explorer');
          if (fleetSection) fleetSection.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFirst3D={() => setSelectedGalleryVehicle(vehicles[2] || vehicles[0])} // Opens flagship in multi-angle gallery & 360
      />

      {/* Fleet Explorer Main Content */}
      <main id="fleet-explorer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold text-[#00E5C7] uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full India Rental Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Available Machines in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              From Royal Enfield thump to KTM adrenaline, Activa ease to Thar 4x4 dominance.
            </p>
          </div>

          {/* Rental Duration Mode Switcher */}
          <div className="flex items-center space-x-1 bg-[#141416] p-1.5 rounded-2xl border border-white/10">
            {(['HOURLY', 'DAILY', 'MONTHLY'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDurationMode(mode)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                  durationMode === mode
                    ? 'bg-[#00E5C7] text-black shadow-teal-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {mode === 'HOURLY' ? t('hourly') : mode === 'DAILY' ? t('daily') : t('monthly')}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'ALL', label: 'All Fleet' },
            { id: 'BIKE', label: 'Superbikes & Cruisers' },
            { id: 'SCOOTER', label: 'Petrol Scooters' },
            { id: 'ELECTRIC_SCOOTER', label: '⚡ Electric Scooters' },
            { id: 'ELECTRIC_BIKE', label: '⚡ Electric Motorcycles' },
            { id: 'PETROL_CAR', label: 'Petrol Cars' },
            { id: 'DIESEL_CAR', label: 'Diesel & 4x4 SUVs' },
            { id: 'ELECTRIC_CAR', label: '⚡ Electric Cars' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as VehicleCategory)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition ${
                activeCategory === cat.id
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-[#141416] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Secondary Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141416] p-4 rounded-2xl border border-white/10">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, bike or car model..."
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5C7]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Fuel & Sort Selectors */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Fuel Filter */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs text-slate-400 font-medium">Fuel:</span>
              <select
                value={fuelFilter}
                onChange={(e) => setFuelFilter(e.target.value as any)}
                className="bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
              >
                <option value="ALL">All Fuel Types</option>
                <option value="PETROL">Petrol Only</option>
                <option value="DIESEL">Diesel Only</option>
                <option value="ELECTRIC">Electric (EV)</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
              >
                <option value="POPULAR">Most Popular</option>
                <option value="SPEED">Top Speed (Fastest)</option>
                <option value="PRICE_ASC">Price: Low to High</option>
                <option value="PRICE_DESC">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-20 bg-[#141416]/50 rounded-3xl border border-white/10">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-base font-bold text-white">No vehicles found matching current filters</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting category or search criteria.</p>
            <button
              onClick={() => { setActiveCategory('ALL'); setFuelFilter('ALL'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#00E5C7] text-black font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                durationMode={durationMode}
                onOpen3D={(v) => setSelectedGalleryVehicle(v)}
                onOpenGallery={(v) => setSelectedGalleryVehicle(v)}
                onQuickBook={(v) => setSelectedBookingVehicle(v)}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedVehicles.some(c => c.id === vehicle.id)}
                isWishlisted={wishlist.includes(vehicle.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Concierge Assistant & SOS Helpline */}
      <ConciergeChatModal />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedGalleryVehicle && (
        <VehicleGalleryModal
          vehicle={selectedGalleryVehicle}
          isOpen={Boolean(selectedGalleryVehicle)}
          onClose={() => setSelectedGalleryVehicle(null)}
          onBook={(v) => {
            setSelectedGalleryVehicle(null);
            setSelectedBookingVehicle(v);
          }}
        />
      )}

      {selectedBookingVehicle && (
        <BookingModal
          vehicle={selectedBookingVehicle}
          cities={cities}
          selectedCity={selectedCity}
          onClose={() => setSelectedBookingVehicle(null)}
          onOpenKyc={() => setIsKycOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onBookingSuccess={(b) => {
            setSelectedBookingVehicle(null);
            setConfirmedBooking(b);
          }}
        />
      )}

      {confirmedBooking && (
        <DigitalRentalPassModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}

      <VehicleCompareModal
        isOpen={isCompareOpen}
        vehicles={comparedVehicles}
        allVehicles={vehicles}
        onAdd={(v) => {
          if (comparedVehicles.length < 4 && !comparedVehicles.some(item => item.id === v.id)) {
            setComparedVehicles([...comparedVehicles, v]);
          }
        }}
        onRemove={(id) => setComparedVehicles(comparedVehicles.filter(v => v.id !== id))}
        onClear={() => setComparedVehicles([])}
        onClose={() => setIsCompareOpen(false)}
        onBook={(v) => {
          setIsCompareOpen(false);
          setSelectedBookingVehicle(v);
        }}
      />

      <CompareDrawer
        vehicles={comparedVehicles}
        onRemove={(id) => setComparedVehicles(comparedVehicles.filter(v => v.id !== id))}
        onClear={() => setComparedVehicles([])}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <KycModal
        isOpen={isKycOpen}
        onClose={() => setIsKycOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onVerificationSuccess={() => {
          loadData();
        }}
      />

      <MyBookingsModal
        isOpen={isBookingsOpen}
        onClose={() => setIsBookingsOpen(false)}
        onSelectBooking={(b) => {
          setIsBookingsOpen(false);
          setConfirmedBooking(b);
        }}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        vehicles={vehicles}
        cities={cities}
        onToggleAvailability={handleToggleAvailability}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
