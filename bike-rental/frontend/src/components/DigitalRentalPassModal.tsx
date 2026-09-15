import React from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Key, 
  QrCode, 
  Download, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import { Booking } from '../types';

interface DigitalRentalPassModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const DigitalRentalPassModal: React.FC<DigitalRentalPassModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const isCancelled = booking.status === 'CANCELLED';

  const getCityPlate = () => {
    if (booking.fleetUnit?.registrationNumber) return booking.fleetUnit.registrationNumber;
    const city = (booking.pickupCity || '').toLowerCase();
    if (city.includes('bengaluru') || city.includes('bangalore')) return 'KA-01-TBH-2041';
    if (city.includes('chennai')) return 'TN-09-TBH-3102';
    if (city.includes('mumbai')) return 'MH-01-TBH-4019';
    if (city.includes('pune')) return 'MH-12-TBH-5284';
    if (city.includes('delhi')) return 'DL-01-TBH-6192';
    if (city.includes('kolkata')) return 'WB-02-TBH-7045';
    if (city.includes('goa')) return 'GA-07-TBH-8120';
    if (city.includes('jaipur')) return 'RJ-14-TBH-9031';
    if (city.includes('ahmedabad')) return 'GJ-01-TBH-1842';
    if (city.includes('kochi')) return 'KL-07-TBH-2950';
    return 'TS-09-TBH-1048';
  };

  const plateNumber = getCityPlate();
  const unitIdentifier = booking.fleetUnit?.demoIdentifier || `DEMO-${plateNumber.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        id="printable-rental-ticket"
        className={`relative w-full max-w-lg max-h-[88vh] bg-[#141416] border rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
          isCancelled ? 'border-rose-500/40' : 'border-[#00E5C7]/40'
        }`}
      >
        
        {/* Top Banner (Header) */}
        <div className={`p-4 shrink-0 text-black flex items-center justify-between ${
          isCancelled 
            ? 'bg-gradient-to-r from-rose-500 to-rose-700 text-white' 
            : 'bg-gradient-to-r from-[#00E5C7] to-[#00B4D8]'
        }`}>
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <div>
              <h3 className="font-extrabold font-display text-base leading-tight">
                {isCancelled ? 'Reservation Cancelled' : 'Rental Confirmed & Boarding Pass'}
              </h3>
              <p className="text-[11px] font-semibold opacity-90">
                {isCancelled ? 'Voucher Voided • Refund Credited' : 'Official Keyless Vehicle Rental Voucher'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className={`no-print p-1.5 rounded-full transition ${
              isCancelled ? 'bg-black/30 hover:bg-black/50 text-white' : 'bg-black/20 hover:bg-black/40 text-black'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Boarding Pass Body - Scrollable to ensure it fits screen perfectly */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">
          
          {/* Reference & QR Code Section */}
          <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-white/10 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Booking Reference</p>
                {isCancelled && (
                  <span className="px-1.5 py-0.2 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[9px] font-extrabold uppercase">
                    VOIDED
                  </span>
                )}
              </div>
              <p className={`text-lg font-extrabold font-mono ${isCancelled ? 'text-rose-400 line-through' : 'text-[#00E5C7]'}`}>
                {booking.bookingReference}
              </p>
              <p className="text-xs text-white mt-0.5 font-bold">{booking.vehicle.name} ({booking.vehicle.model})</p>
              <p className="text-[10px] text-slate-400">{booking.vehicle.variant || booking.vehicle.brand} • {booking.vehicle.fuelType}</p>
            </div>

            {/* QR Code Graphic */}
            <div className={`flex flex-col items-center p-1.5 rounded-xl text-black shadow-lg shrink-0 ${isCancelled ? 'bg-slate-300 opacity-60' : 'bg-white'}`}>
              <QrCode className="w-16 h-16 text-black" />
              <span className="text-[8px] font-mono font-bold tracking-wider mt-0.5">
                {isCancelled ? 'PASS-VOID' : 'HUB-SCAN-PASS'}
              </span>
            </div>
          </div>

          {/* Assigned State Registration Plate */}
          <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Assigned City RTO Registration Plate</p>
              <p className="text-lg font-black font-mono text-white tracking-wider mt-0.5">
                {plateNumber}
              </p>
              <p className="text-[10px] font-mono text-slate-400">
                Unit ID: {unitIdentifier} • {booking.pickupCity || 'City Hub'}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase">
                RTO Approved Unit
              </span>
              <p className="text-[9px] text-slate-400 mt-0.5">{booking.pickupCity || 'Metropolitan'} Fleet</p>
            </div>
          </div>

          {/* User Name, Aadhaar & Driving Licence Credentials Stamp */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Verified Rider Credentials (Government ID)
                </span>
              </div>
              <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                <p className="text-[9px] uppercase font-bold text-slate-400">Rider Full Name</p>
                <p className="text-xs font-extrabold text-white truncate mt-0.5">
                  {booking.user?.fullName || 'Authorized Rider'}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                <p className="text-[9px] uppercase font-bold text-slate-400">Identity Number</p>
                <p className="text-xs font-mono font-bold text-teal-300 mt-0.5">
                  {booking.user?.aadhaarNumber || 'VERIFIED ON FILE'}
                </p>
                <span className="text-[8px] text-slate-400">Rider Identity Record</span>
              </div>

              <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                <p className="text-[9px] uppercase font-bold text-slate-400">Driving Licence</p>
                <p className="text-xs font-mono font-bold text-emerald-300 mt-0.5">
                  {booking.user?.drivingLicenseNumber || (booking.user?.drivingLicenseVerified ? 'DL Verified' : 'Pending Verification')}
                </p>
                <span className="text-[8px] text-slate-400">KYC Status</span>
              </div>
            </div>
          </div>

          {/* Keyless Unlock PIN Box OR Cancelled State */}
          {isCancelled ? (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-rose-400">VOUCHER VOIDED • KEY PIN DEACTIVATED</p>
                <p className="text-xs text-slate-300">Reservation cancelled. Vehicle key unlock PIN is deactivated.</p>
                <p className="text-[10px] text-emerald-400 font-semibold">
                  {booking.paymentStatus === 'REFUNDED' 
                    ? 'Refund Status: 100% Deposit + 90% Rental Credited' 
                    : booking.paymentStatus === 'PAID'
                    ? 'Refund Status: Cancellation processed / Refund initiated'
                    : 'Refund Status: Voided (No payment captured)'}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs">
                VOID
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#141416] via-[#1C1C22] to-[#141416] border border-[#D4AF37]/50 flex items-center justify-between shadow-gold-glow">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-[#D4AF37]">Vehicle Smart Key PIN</p>
                  <p className="text-[11px] text-slate-300">Enter on vehicle console or present to hub</p>
                </div>
              </div>
              <span className="text-xl font-mono font-black text-white tracking-widest bg-black/60 px-3 py-1 rounded-lg border border-white/10">
                {booking.unlockPin}
              </span>
            </div>
          )}

          {/* Trip Details Grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-[#0A0A0B] border border-white/5">
              <p className="text-[9px] text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#00E5C7]" />
                <span>Pickup Location</span>
              </p>
              <p className="font-bold text-white text-xs mt-0.5">{booking.pickupHub}</p>
              <p className="text-[10px] text-[#00E5C7]">{booking.pickupCity}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0A0A0B] border border-white/5">
              <p className="text-[9px] text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span>Drop Location</span>
              </p>
              <p className="font-bold text-white text-xs mt-0.5">{booking.dropHub}</p>
              <p className="text-[10px] text-[#D4AF37]">
                {booking.dropCity || booking.pickupCity} {booking.dropCity && booking.dropCity !== booking.pickupCity ? '(Cross-City)' : ''}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0A0A0B] border border-white/5">
              <p className="text-[9px] text-slate-400 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-[#00E5C7]" />
                <span>Duration Mode</span>
              </p>
              <p className="font-bold text-white text-xs mt-0.5">{booking.duration} {booking.rentalMode.toLowerCase()}</p>
              <p className="text-[9px] text-slate-400">Within 10-day active window</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0A0A0B] border border-white/5">
              <p className="text-[9px] text-slate-400 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Total Paid (All-Inclusive)</span>
              </p>
              <p className="font-bold text-[#00E5C7] text-xs mt-0.5">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
              <p className="text-[9px] text-emerald-400">Tax Invoice & Security Deposit Included</p>
            </div>
          </div>

          {/* Action Buttons (Hidden when printing) */}
          <div className="no-print flex items-center space-x-2.5 pt-1">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <Download className="w-4 h-4 text-[#00E5C7]" />
              <span>Print / Save Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#00E5C7] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition"
            >
              Done & View Fleet
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

