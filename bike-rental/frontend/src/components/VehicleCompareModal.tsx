import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Layers, 
  Search, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Zap, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  KeyRound, 
  Clock 
} from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleCompareModalProps {
  isOpen: boolean;
  vehicles: Vehicle[];
  allVehicles?: Vehicle[];
  onAdd: (vehicle: Vehicle) => void;
  onRemove: (vehicleId: number) => void;
  onClear: () => void;
  onClose: () => void;
  onBook: (vehicle: Vehicle) => void;
}

export const VehicleCompareModal: React.FC<VehicleCompareModalProps> = ({
  isOpen,
  vehicles,
  allVehicles = [],
  onAdd,
  onRemove,
  onClear,
  onClose,
  onBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  if (!isOpen) return null;


  // Available vehicles that are not already in comparison
  const availableToAdd = allVehicles.filter(
    av => !vehicles.some(cv => cv.id === av.id)
  ).filter(v => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return v.name.toLowerCase().includes(q) || 
           v.brand.toLowerCase().includes(q) ||
           v.vehicleType.toLowerCase().includes(q);
  });

  const handleAddVehicle = (v: Vehicle) => {
    if (vehicles.length >= 4) {
      alert('You can compare up to 4 vehicles simultaneously. Please remove one before adding another.');
      return;
    }
    onAdd(v);
    setShowPicker(false);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-6xl bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0A0A0B]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/40 flex items-center justify-center text-[#00E5C7]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 id="compare-modal-title" className="font-extrabold font-display text-lg text-white">
                  Side-by-Side Fleet Comparison
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00E5C7]/15 border border-[#00E5C7]/30 text-[#00E5C7] text-[10px] font-bold">
                  {vehicles.length} of 4 Models
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Compare verified specifications, velocity metrics, mileage, and all-inclusive rental rates
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {vehicles.length > 0 && (
              <button
                onClick={onClear}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-xs text-slate-300 hover:text-rose-300 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button 
              onClick={onClose}
              aria-label="Close comparison modal"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STATE 1: Zero Vehicles Selected (Useful Empty State) */}
          {vehicles.length === 0 ? (
            <div className="py-8 space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <Layers className="w-12 h-12 text-[#00E5C7]/60 mx-auto" />
                <h4 className="text-base font-bold text-white">No Models Selected for Comparison</h4>
                <p className="text-xs text-slate-400">
                  Select up to 4 models from the fleet below to inspect side-by-side performance, mileage, speed, and transparent prices.
                </p>
              </div>

              {/* Search Fleet Box */}
              <div className="max-w-md mx-auto relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fleet (e.g. Activa, Himalayan, Swift, Thar, Duke)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A0A0B] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5C7]"
                />
              </div>

              {/* Grid of Available Models to Add */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {availableToAdd.slice(0, 12).map((v) => (
                  <div
                    key={v.id}
                    className="p-3 rounded-2xl bg-[#0A0A0B] border border-white/10 hover:border-[#00E5C7]/40 flex flex-col justify-between transition group"
                  >
                    <div>
                      <img
                        src={v.imageUrl}
                        alt={v.name}
                        className="w-full h-28 object-cover rounded-xl mb-2 group-hover:scale-[1.02] transition-transform"
                      />
                      <span className="text-[10px] font-bold text-[#00E5C7] uppercase">{v.brand}</span>
                      <h5 className="text-xs font-bold text-white truncate">{v.name}</h5>
                      <p className="text-[11px] text-slate-400">₹{v.pricePerHour}/hr • ₹{v.pricePerDay}/day</p>
                    </div>

                    <button
                      onClick={() => handleAddVehicle(v)}
                      className="mt-3 w-full py-1.5 rounded-lg bg-[#00E5C7]/15 hover:bg-[#00E5C7] border border-[#00E5C7]/30 hover:border-[#00E5C7] text-[#00E5C7] hover:text-black font-bold text-xs transition flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Compare</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STATE 2: Synchronized Comparison Table (1 to 4 Vehicles) */
            <div className="space-y-4">
              
              {/* Add More Bar if less than 4 */}
              {vehicles.length < 4 && (
                <div className="p-3 rounded-2xl bg-[#0A0A0B] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <p className="text-xs text-slate-300">
                    Comparing <strong className="text-white">{vehicles.length}</strong> of 4 models. You can add <strong className="text-[#00E5C7]">{4 - vehicles.length} more</strong> to compare.
                  </p>
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="px-3 py-1.5 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/40 text-[#00E5C7] hover:bg-[#00E5C7] hover:text-black font-bold text-xs transition flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showPicker ? 'Close Picker' : '+ Add Another Vehicle'}</span>
                  </button>
                </div>
              )}

              {/* Inline Vehicle Picker Drawer */}
              {showPicker && (
                <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-[#00E5C7]/30 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Select a Model to Add</h5>
                    <div className="relative w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter fleet..."
                        className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#141416] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
                    {availableToAdd.slice(0, 12).map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleAddVehicle(v)}
                        className="p-2 rounded-xl bg-[#141416] hover:bg-[#00E5C7]/10 border border-white/10 hover:border-[#00E5C7]/40 text-left transition"
                      >
                        <img src={v.imageUrl} alt={v.name} className="w-full h-14 object-cover rounded-lg mb-1" />
                        <p className="text-[11px] font-bold text-white truncate">{v.name}</p>
                        <p className="text-[10px] text-[#00E5C7]">₹{v.pricePerHour}/hr</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SYNCHRONIZED COMPARISON TABLE */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0A0B]">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 w-44 min-w-[170px] text-xs font-bold uppercase tracking-wider text-slate-400 bg-[#0E0E10] align-top">
                        Vehicle
                      </th>
                      {vehicles.map((v) => (
                        <th key={v.id} className="p-4 min-w-[210px] bg-[#0A0A0B] align-top relative">
                          <button
                            onClick={() => onRemove(v.id)}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={v.imageUrl}
                            alt={v.name}
                            className="w-full h-28 object-cover rounded-xl mb-2 border border-white/10"
                          />
                          <span className="text-[10px] font-bold text-[#00E5C7] uppercase">{v.brand}</span>
                          <h4 className="text-sm font-bold text-white leading-tight truncate">{v.name}</h4>
                          <p className="text-[11px] text-slate-400">{v.variant || v.model}</p>
                        </th>
                      ))}
                      {/* Empty Slot Columns if < 4 */}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <th key={`slot-${idx}`} className="p-4 min-w-[210px] bg-[#0A0A0B]/40 border-l border-dashed border-white/10 align-middle text-center">
                          <button
                            onClick={() => setShowPicker(true)}
                            className="w-full h-36 rounded-2xl border-2 border-dashed border-white/15 hover:border-[#00E5C7]/50 flex flex-col items-center justify-center text-slate-400 hover:text-[#00E5C7] transition p-3"
                          >
                            <Plus className="w-6 h-6 mb-1" />
                            <span className="text-xs font-bold">Add Model</span>
                            <span className="text-[10px] text-slate-500">Compare up to 4</span>
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5 text-xs">
                    {/* Hourly Rent */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Hourly Rate</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-mono font-bold text-white">
                          ₹{v.pricePerHour} <span className="text-[11px] font-normal text-slate-400">/ hr</span>
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`rate-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Daily Rent */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Daily Rate</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-mono font-extrabold text-[#00E5C7]">
                          ₹{v.pricePerDay} <span className="text-[11px] font-normal text-slate-400">/ day</span>
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`daily-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Monthly Rate */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Monthly Pass</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-mono font-bold text-white">
                          ₹{v.pricePerMonth?.toLocaleString('en-IN') || (v.pricePerDay * 24).toLocaleString('en-IN')}
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`monthly-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Security Deposit */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Refundable Deposit</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-mono font-bold text-emerald-400">
                          ₹{v.securityDeposit.toLocaleString('en-IN')}
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`dep-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Category & Segment */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Category</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 text-slate-200 font-semibold uppercase">
                          {v.category ? v.category.replace(/_/g, ' ') : v.vehicleType.replace(/_/g, ' ')}
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`cat-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Fuel & Powertrain */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Fuel & Engine</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 text-slate-200">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mr-1.5 ${
                            v.fuelType === 'ELECTRIC' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {v.fuelType}
                          </span>
                          <span className="font-semibold text-white">{v.engineOrBattery}</span>
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`fuel-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Transmission */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Transmission</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-semibold text-white">
                          {v.transmission}
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`trans-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Top Speed */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Top Speed</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-mono font-bold text-[#00E5C7]">
                          {v.maxSpeed} km/h
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`speed-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* 0-100 Acceleration */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">0-100 Acceleration</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-mono font-bold text-[#D4AF37]">
                          {v.zeroToHundred}s
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`acc-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Mileage / Range */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Mileage / Range</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 font-semibold text-white">
                          {v.mileageOrRange}
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`range-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Seating */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Seating Capacity</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 text-slate-200">
                          {v.seats} Adults
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`seat-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Key Features */}
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-semibold text-slate-400 bg-[#0E0E10]">Features</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-3.5 text-slate-300">
                          <div className="space-y-1">
                            {v.features.split(',').slice(0, 3).map((f, i) => (
                              <div key={i} className="flex items-center space-x-1.5 text-[11px]">
                                <Check className="w-3 h-3 text-[#00E5C7] shrink-0" />
                                <span className="truncate">{f.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`feat-${idx}`} className="p-3.5 text-slate-600">—</td>
                      ))}
                    </tr>

                    {/* Booking CTA Row */}
                    <tr className="bg-[#0E0E10]">
                      <td className="p-4 font-bold text-white">Select Machine</td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="p-4">
                          <button
                            onClick={() => {
                              onClose();
                              onBook(v);
                            }}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition flex items-center justify-center space-x-1"
                          >
                            <span>Book {v.name.split(' ')[0]}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      ))}
                      {Array.from({ length: 4 - vehicles.length }).map((_, idx) => (
                        <td key={`cta-${idx}`} className="p-4 text-center text-slate-600">
                          Empty Slot
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
