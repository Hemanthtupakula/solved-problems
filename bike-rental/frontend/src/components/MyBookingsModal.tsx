import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Key, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Booking } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (booking: Booking) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({ isOpen, onClose, onSelectBooking }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      loadBookings();
    }
  }, [isOpen, user]);

  const loadBookings = async () => {
    setLoading(true);
    setCancelError(null);
    const data = await api.getMyBookings(user?.id || 1);
    setBookings(data);
    setLoading(false);
  };

  const handleCancel = async (bookingId: number) => {
    setCancelError(null);
    if (confirm('Are you sure you want to cancel this booking? Refund of 100% deposit + 90% rental fee will be initiated.')) {
      try {
        await api.cancelBooking(bookingId, user?.id || 1);
        await loadBookings();
      } catch (err: any) {
        setCancelError(err.message || 'Failed to cancel reservation on server. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/40 flex items-center justify-center text-[#00E5C7]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold font-display text-base text-white">My Rental Passes</h3>
              <p className="text-xs text-slate-400">Active keys & trip history</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {cancelError && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{cancelError}</span>
            </div>
          )}
          {loading ? (
            <p className="text-center text-xs text-slate-400 py-8">Loading your bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No Active Reservations</p>
              <p className="text-xs text-slate-400 mt-1">Book your dream machine from our fleet today.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div 
                key={booking.id}
                className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#00E5C7]">{booking.bookingReference}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      booking.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{booking.vehicle.name}</h4>
                  <p className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#00E5C7]" />
                    <span>{booking.pickupHub} • {booking.duration} {booking.rentalMode.toLowerCase()}</span>
                  </p>
                  {booking.status === 'CANCELLED' ? (
                    <p className="text-xs text-rose-400 font-semibold flex items-center space-x-1">
                      <span>Voucher Voided • Refund Credited</span>
                    </p>
                  ) : (
                    <p className="text-xs font-mono text-white">
                      Unlock PIN: <strong className="text-[#D4AF37] font-bold text-sm">{booking.unlockPin || '••••'}</strong>
                    </p>
                  )}
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <span className="text-base font-extrabold font-display text-white">
                    ₹{booking.totalAmount.toLocaleString('en-IN')}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectBooking(booking);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#00E5C7]/15 border border-[#00E5C7]/40 text-[#00E5C7] text-xs font-bold hover:bg-[#00E5C7] hover:text-black transition"
                    >
                      Digital Pass
                    </button>
                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold hover:bg-rose-500/20 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
