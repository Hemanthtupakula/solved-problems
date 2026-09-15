import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Tag,
  User as UserIcon
} from 'lucide-react';
import { Vehicle, City, Booking } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PhoneVerificationModal } from './PhoneVerificationModal';

interface BookingModalProps {
  vehicle: Vehicle | null;
  cities: City[];
  selectedCity: string;
  onClose: () => void;
  onOpenKyc?: () => void;
  onOpenAuth?: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const BookingModal: React.FC<BookingModalProps> = ({
  vehicle,
  cities,
  selectedCity,
  onClose,
  onOpenKyc,
  onOpenAuth,
  onBookingSuccess
}) => {
  const { user, isAuthenticated, updateUser, refreshUser } = useAuth();
  const currentCityObj = cities.find(c => c.name === selectedCity) || cities[0];
  const hubs = currentCityObj ? currentCityObj.hubs : [];

  const [pickupCity, setPickupCity] = useState<string>(selectedCity);
  const [dropCity, setDropCity] = useState<string>(selectedCity);
  
  const dropCityObj = cities.find(c => c.name === dropCity) || currentCityObj;
  const dropHubs = dropCityObj ? dropCityObj.hubs : hubs;

  const [pickupHub, setPickupHub] = useState<string>(hubs[0]?.name || "Hitech City Hub");
  const [dropHub, setDropHub] = useState<string>(dropHubs[0]?.name || "Hitech City Hub");
  const [rentalMode, setRentalMode] = useState<'HOURLY' | 'DAILY' | 'MONTHLY'>('HOURLY');

  // 10-Day Availability Window Constraints
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const maxDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  const todayFormatted = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const maxDateFormatted = maxDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  const [pickupDate, setPickupDate] = useState<string>(todayStr);
  const [pickupTime, setPickupTime] = useState<string>('10:00');
  const [aadhaarNumber, setAadhaarNumber] = useState<string>(user?.aadhaarNumber || '');
  const [isKycVerifiedState, setIsKycVerifiedState] = useState<boolean>(user?.drivingLicenseVerified === true);

  // Mask Aadhaar helper to protect sensitive customer PII
  const maskAadhaar = (val?: string | null): string => {
    if (!val || val.trim().length < 4) return '•••• •••• ••••';
    const clean = val.replace(/\D/g, '');
    return clean.length >= 4 ? `•••• •••• ${clean.slice(-4)}` : '•••• •••• ••••';
  };

  // Dynamically sync KYC status with backend on modal mount
  useEffect(() => {
    if (user?.id) {
      api.getKycStatus(user.id).then((status) => {
        if (status && (status.status === 'TBH_VERIFIED' || status.status === 'VERIFIED' || status.verified === true)) {
          setIsKycVerifiedState(true);
        }
      }).catch(() => {
        // Fallback to existing user object state
      });
    }
  }, [user?.id]);

  // Remaining days within the 10-day window
  const chosenDateObj = new Date(pickupDate);
  const remainingDaysInWindow = Math.max(1, Math.min(10, Math.floor((maxDate.getTime() - chosenDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1));

  const [duration, setDuration] = useState<number>(rentalMode === 'HOURLY' ? 6 : rentalMode === 'DAILY' ? Math.min(2, remainingDaysInWindow) : 1);
  const [includeZeroDep, setIncludeZeroDep] = useState<boolean>(true);
  const [includeFastag, setIncludeFastag] = useState<boolean>(vehicle?.vehicleType.includes('CAR') || false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [serverQuote, setServerQuote] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);
  const [couponCodeInput, setCouponCodeInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);

  // Sync dropHub when dropCity changes
  useEffect(() => {
    if (dropHubs && dropHubs.length > 0) {
      setDropHub(dropHubs[0].name);
    }
  }, [dropCity]);

  // Live Server-Side Pricing Engine Hook with pickupCity, dropCity & couponCode
  useEffect(() => {
    if (!vehicle) return;
    let isMounted = true;
    setErrorMessage(null);
    api.getPricingQuote({
      vehicleId: vehicle.id,
      pickupCity,
      dropCity,
      rentalMode,
      duration,
      insurancePlan: includeZeroDep ? 'ZERO_DEPRECIATION' : 'PREMIUM',
      couponCode: appliedCoupon || undefined
    }).then(quote => {
      if (isMounted) setServerQuote(quote);
    }).catch(() => {
      // Fallback to local
    });
    return () => { isMounted = false; };
  }, [vehicle?.id, pickupCity, dropCity, rentalMode, duration, includeZeroDep, appliedCoupon]);

  if (!vehicle) return null;

  // Pricing values (authoritative server quote or local fallback)
  const isCrossCity = dropCity !== pickupCity;
  const isCar = vehicle.vehicleType.includes('CAR');
  const baseRent = serverQuote ? serverQuote.baseAmount : (
    rentalMode === 'HOURLY' ? vehicle.pricePerHour * duration :
    rentalMode === 'DAILY' ? vehicle.pricePerDay * duration : vehicle.pricePerMonth * duration
  );
  const discountAmount = serverQuote ? serverQuote.discountAmount : 0;
  const insuranceRate = serverQuote ? serverQuote.insuranceAmount : (isCar ? 299 : 99);
  const crossCityFee = serverQuote ? serverQuote.crossCityFee : (isCrossCity ? 1499 : 0);
  const gstAmount = serverQuote ? serverQuote.gstAmount : Math.round((baseRent + insuranceRate + crossCityFee) * 0.18);
  const securityDeposit = serverQuote ? serverQuote.securityDeposit : vehicle.securityDeposit;
  const totalPayable = serverQuote ? serverQuote.totalAmount : (baseRent + insuranceRate + crossCityFee + gstAmount + securityDeposit);

  // KYC Verified Status (Checks user object or fresh status from backend)
  const isKycVerified = isKycVerifiedState || user?.drivingLicenseVerified === true;

  // Strict Authoritative Mobile Verification Gate: strictly user.mobileVerified === true
  const isMobileVerified = user?.mobileVerified === true;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim() || !vehicle) return;
    setIsApplyingCoupon(true);
    setCouponError(null);
    try {
      const code = couponCodeInput.trim().toUpperCase();
      const quote = await api.getPricingQuote({
        vehicleId: vehicle.id,
        pickupCity,
        dropCity,
        rentalMode,
        duration,
        insurancePlan: includeZeroDep ? 'ZERO_DEPRECIATION' : 'PREMIUM',
        couponCode: code
      });
      if (quote && (quote.couponDiscount ?? 0) > 0) {
        setAppliedCoupon(code);
        setServerQuote(quote);
        setCouponError(null);
      } else {
        setCouponError('Invalid, expired, or non-applicable coupon code.');
      }
    } catch (err: any) {
      setCouponError(err.message || 'Unable to apply coupon code.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError(null);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    setErrorMessage(null);

    // Strict Authentication Gate
    if (!isAuthenticated || !user) {
      setErrorMessage("Please sign in or register to reserve this vehicle.");
      if (onOpenAuth) {
        setTimeout(() => onOpenAuth(), 300);
      }
      return;
    }

    // Strict KYC Verification Gate
    if (!isKycVerified) {
      setErrorMessage("Driving Licence KYC verification is required to confirm reservation under Indian Motor Vehicles Act.");
      if (onOpenKyc) {
        setTimeout(() => onOpenKyc(), 600);
      }
      return;
    }

    // Strict Authoritative Mobile Verification Gate
    if (!isMobileVerified) {
      setErrorMessage("Mobile verification is required before completing this booking. Please verify your mobile number.");
      setIsPhoneModalOpen(true);
      return;
    }

    // Strict 10-Day Advance Booking Window Gate
    if (pickupDate < todayStr || pickupDate > maxDateStr) {
      setErrorMessage(`Reservations are strictly permitted up to 10 days from today (${todayFormatted} to ${maxDateFormatted}).`);
      return;
    }

    setIsProcessing(true);

    try {
      const bookingData = {
        userId: user.id,
        vehicleId: vehicle.id,
        pickupCity,
        dropCity,
        pickupHub,
        dropHub,
        rentalMode,
        duration,
        includeZeroDep,
        includeFastag,
        pickupDateTime: `${pickupDate}T${pickupTime}:00`,
        aadhaarNumber: aadhaarNumber || user?.aadhaarNumber || '',
        couponCode: appliedCoupon || undefined,
        paymentMethod: paymentMethod === 'UPI' ? 'Razorpay UPI - GPay / PhonePe' : 'Razorpay Secure Card'
      };

      // 1. Transactional reservation hold creation (status: PENDING, payment: INITIATED)
      const pendingBooking = await api.createBooking(bookingData);

      const isMockOrder = !pendingBooking.razorpayOrderId || 
                          pendingBooking.razorpayOrderId.startsWith('order_tbh_') || 
                          pendingBooking.razorpayKeyId === 'rzp_test_tbh_mock_key';

      if (isMockOrder) {
        // Local dev mock payment verification flow
        const mockVerifyRes = await api.verifyPayment({
          bookingReference: pendingBooking.bookingReference,
          razorpayOrderId: pendingBooking.razorpayOrderId || 'order_mock',
          razorpayPaymentId: 'pay_mock_' + Math.random().toString(36).substring(2, 12),
          razorpaySignature: 'sig_mock_auto_verified'
        });

        if (mockVerifyRes.status !== 'SUCCESS') {
          throw new Error(mockVerifyRes.message || 'Payment verification was not successful.');
        }

        const confirmedBooking: Booking = mockVerifyRes.booking || {
          ...pendingBooking,
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          unlockPin: mockVerifyRes.unlockPin,
          user: {
            ...user,
            aadhaarNumber: aadhaarNumber || user?.aadhaarNumber || ''
          }
        };

        if (confirmedBooking.user) {
          confirmedBooking.user.aadhaarNumber = aadhaarNumber || confirmedBooking.user.aadhaarNumber || '';
        }

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        setIsProcessing(false);
        onBookingSuccess(confirmedBooking);
        return;
      }

      // 2. Real Razorpay modal checkout
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setIsProcessing(false);
        setErrorMessage("Unable to connect to Razorpay payment gateway. Please check your network connection.");
        return;
      }

      const options = {
        key: pendingBooking.razorpayKeyId || 'rzp_test_tbh_mock_key',
        amount: Math.round(pendingBooking.totalAmount * 100),
        currency: 'INR',
        name: 'TBH - Ride Beyond Limits',
        description: `Reservation ${pendingBooking.bookingReference} - ${vehicle.name}`,
        order_id: pendingBooking.razorpayOrderId,
        prefill: {
          name: user.fullName || '',
          email: user.email || '',
          contact: user.phoneNumber || ''
        },
        theme: {
          color: '#00E5C7'
        },
        handler: async function (response: any) {
          try {
            // Authentic server-side HMAC-SHA256 signature verification
            const verifyRes = await api.verifyPayment({
              bookingReference: pendingBooking.bookingReference,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            if (verifyRes.status !== 'SUCCESS') {
              throw new Error(verifyRes.message || 'Payment verification was not successful.');
            }

            const confirmedBooking: Booking = verifyRes.booking || {
              ...pendingBooking,
              status: 'CONFIRMED',
              paymentStatus: 'PAID',
              unlockPin: verifyRes.unlockPin,
              user: {
                ...user,
                aadhaarNumber: aadhaarNumber || user?.aadhaarNumber || ''
              }
            };

            if (confirmedBooking.user) {
              confirmedBooking.user.aadhaarNumber = aadhaarNumber || confirmedBooking.user.aadhaarNumber || '';
            }


            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });

            setIsProcessing(false);
            onBookingSuccess(confirmedBooking);
          } catch (verErr: any) {
            setIsProcessing(false);
            setErrorMessage(verErr.message || 'Payment signature verification failed. Please contact TBH support.');
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setErrorMessage("Payment was not completed. Your vehicle reservation hold will automatically expire in 15 minutes.");
          }
        }
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp: any) {
        setIsProcessing(false);
        setErrorMessage(resp.error?.description || 'Transaction was declined by issuing bank.');
      });
      razorpayInstance.open();

    } catch (err: any) {
      setIsProcessing(false);
      const msg = err.message || 'Vehicle reservation could not be processed.';
      setErrorMessage(msg);
      if (msg.includes('KYC') || msg.includes('licence') || msg.includes('422')) {
        if (onOpenKyc) {
          setTimeout(() => onOpenKyc(), 1000);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl max-h-[88vh] bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="shrink-0 bg-[#141416] px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/40 flex items-center justify-center text-[#00E5C7] font-bold text-xs">
              TBH
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-display">Instant Reservation</h3>
              <p className="text-xs text-slate-400">10-Day Availability Window • Instant Key Voucher</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Selected Vehicle Snapshot */}
          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#0A0A0B] border border-white/10">
            <img 
              src={vehicle.imageUrl} 
              alt={vehicle.name} 
              className="w-18 h-14 object-cover rounded-xl border border-white/10" 
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#00E5C7] uppercase">{vehicle.brand}</span>
              <h4 className="text-sm font-bold text-white truncate">{vehicle.name}</h4>
              <p className="text-xs text-slate-400">{vehicle.model} • {vehicle.fuelType} • {vehicle.maxSpeed} km/h</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold font-display text-white">₹{vehicle.pricePerHour}</span>
              <span className="text-[10px] text-slate-400">/hr</span>
            </div>
          </div>

          {/* Rider Identity & Driving Licence / Aadhaar KYC Section */}
          {!isAuthenticated || !user ? (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-400 text-sm">Account Sign In Required</p>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    Please sign in or create an account to reserve this vehicle and generate your printable rental ticket.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenAuth && onOpenAuth()}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] hover:opacity-90 text-black font-bold rounded-xl text-xs shrink-0 transition-all shadow-sm flex items-center justify-center space-x-1.5"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            </div>
          ) : isKycVerified ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    Verified Rider Credentials (Printed on Ticket)
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
                  KYC Clear
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px]">Rider Name:</span>
                  <p className="font-bold text-white truncate mt-0.5">{user.fullName || 'Hemanth Rider'}</p>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px]">Aadhaar Identity:</span>
                  <p className="font-mono font-bold text-teal-300 truncate mt-0.5">
                    {maskAadhaar(user.aadhaarNumber || aadhaarNumber)}
                  </p>
                  <span className="text-[8px] text-slate-400">Masked for Privacy</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-slate-400 text-[10px]">Driving Licence:</span>
                  <p className="font-mono font-bold text-emerald-300 truncate mt-0.5">
                    {user.drivingLicenseNumber || (user.drivingLicenseVerified ? 'DL Verified' : 'Not Uploaded')}
                  </p>
                  <span className="text-[8px] text-slate-400">{user.drivingLicenseVerified ? 'Licence Verified' : 'KYC Pending'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-400 text-sm">Driving Licence KYC Required</p>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    Under Indian Motor Vehicles Act, valid licence verification is legally mandatory before reserving a vehicle.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenKyc}
                className="w-full sm:w-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl text-xs shrink-0 transition-colors shadow-sm flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Complete DL Verification</span>
              </button>
            </div>
          )}

          {/* Authoritative Mobile Verification Gate Card */}
          {isAuthenticated && user && (
            isMobileVerified ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-300">Verified Mobile Number:</span>
                    <span className="font-mono text-white ml-2">{user.phoneNumber || '+91 ••••• •••••'}</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-bold tracking-wide">
                  ✓ Mobile Verified
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-400 text-sm">Mobile Verification Required</p>
                    <p className="text-[11px] text-white/70 mt-0.5">
                      {user.phoneNumber 
                        ? `Phone number ${user.phoneNumber} is recorded but not verified. One-time SMS OTP verification is required.` 
                        : 'Authentic mobile verification via Clerk SMS OTP is required for roadside assistance and booking confirmation.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPhoneModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] hover:opacity-90 text-black font-bold rounded-xl text-xs shrink-0 transition-all shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Verify Mobile</span>
                </button>
              </div>
            )
          )}

          {/* Step 1: 10-Day Availability Window Calendar Picker */}
          <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-[#00E5C7]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#00E5C7]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Pickup Date & Time (Calendar)
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00E5C7]/15 text-[#00E5C7] border border-[#00E5C7]/30">
                10-Day Window Policy
              </span>
            </div>

            <div className="p-2 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300 flex items-center justify-between">
              <span>Availability: <strong>{todayFormatted}</strong> to <strong>{maxDateFormatted}</strong></span>
              <span className="text-[10px] text-emerald-400 font-semibold font-mono">Max 10 Days in Advance</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                  Pickup Date (Up to 10 days from today)
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={todayStr}
                  max={maxDateStr}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val < todayStr || val > maxDateStr) {
                      setErrorMessage(`Reservations are strictly permitted up to 10 days from today (${todayFormatted} to ${maxDateFormatted}).`);
                      return;
                    }
                    setPickupDate(val);
                    setErrorMessage(null);
                    const newDate = new Date(val);
                    const newRem = Math.max(1, Math.min(10, Math.floor((maxDate.getTime() - newDate.getTime()) / (1000 * 60 * 60 * 24)) + 1));
                    if (rentalMode === 'DAILY' && duration > newRem) {
                      setDuration(newRem);
                    }
                  }}
                  className="w-full bg-[#141416] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-[#141416] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Rental Duration Mode */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Rental Duration Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['HOURLY', 'DAILY', 'MONTHLY'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setRentalMode(mode);
                    if (mode === 'HOURLY') setDuration(6);
                    else if (mode === 'DAILY') setDuration(Math.min(2, remainingDaysInWindow));
                    else setDuration(1);
                  }}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                    rentalMode === mode 
                      ? 'bg-[#00E5C7]/15 border-[#00E5C7] text-[#00E5C7] glow-teal' 
                      : 'bg-[#0A0A0B] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Duration Slider with 10-day clamp */}
            <div className="mt-2.5 p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300">
                  Duration: <strong className="text-[#00E5C7] font-mono text-sm">{duration} {rentalMode.toLowerCase()}{duration > 1 ? 's' : ''}</strong>
                </span>
                {rentalMode === 'DAILY' && (
                  <p className="text-[10px] text-slate-400">Max {remainingDaysInWindow} day(s) allowed within the 10-day window</p>
                )}
                {rentalMode === 'MONTHLY' && (
                  <p className="text-[10px] text-amber-400">Notice: Advance booking capped at 10-day active fleet window</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                  className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (rentalMode === 'DAILY' && duration >= remainingDaysInWindow) {
                      setErrorMessage(`Cannot book beyond ${remainingDaysInWindow} days. Reservations are restricted to the 10-day availability window.`);
                      return;
                    }
                    if (rentalMode === 'HOURLY' && duration >= 24) {
                      setErrorMessage('Switch to Daily mode for rentals greater than 24 hours.');
                      return;
                    }
                    setDuration(duration + 1);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#00E5C7] text-black font-bold flex items-center justify-center hover:opacity-90"
                >
                  +
                </button>
              </div>
            </div>
          </div>


          {/* Step 2: Multi-City Pickup & Drop Hub Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pickup Location */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Pickup City & Hub
              </label>
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name} ({city.stateCode || city.state})</option>
                ))}
              </select>
              <select
                value={pickupHub}
                onChange={(e) => setPickupHub(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
              >
                {hubs.map((hub) => (
                  <option key={hub.id} value={hub.name}>{hub.name}</option>
                ))}
              </select>
            </div>

            {/* Drop Location (Cross-City Permitted) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Drop-off City & Hub
                </label>
                {isCrossCity && (
                  <span className="text-[10px] text-[#00E5C7] font-semibold">Cross-City (+₹1,499)</span>
                )}
              </div>
              <select
                value={dropCity}
                onChange={(e) => setDropCity(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name} ({city.stateCode || city.state})</option>
                ))}
              </select>
              <select
                value={dropHub}
                onChange={(e) => setDropHub(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-medium focus:outline-none focus:border-[#00E5C7]"
              >
                {dropHubs.map((hub) => (
                  <option key={hub.id} value={hub.name}>{hub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Add-ons & Protection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Protection & Add-ons
            </label>
            <div 
              onClick={() => setIncludeZeroDep(!includeZeroDep)}
              className="p-3 rounded-xl bg-[#0A0A0B] border border-white/10 flex items-center justify-between cursor-pointer hover:border-[#00E5C7]/40 transition"
            >
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00E5C7]" />
                <div>
                  <p className="text-xs font-bold text-white">Zero Depreciation Damage Waiver</p>
                  <p className="text-[10px] text-slate-400">Zero liability for accidental scratches or minor dents</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#00E5C7]">
                {includeZeroDep ? `+₹${isCar ? 250 : 120}` : 'Add'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0A0A0B] border border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-xs font-bold text-white">Complimentary Helmets & 24/7 Roadside SOS</p>
                  <p className="text-[10px] text-slate-400">2 sanitized ISI helmets included with every bike</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400">FREE</span>
            </div>
          </div>

          {/* Step: Promotional Coupon Code Input */}
          <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#00E5C7]" />
                Coupons & Offers
              </span>
              {appliedCoupon && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
                  Applied: {appliedCoupon}
                </span>
              )}
            </div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-300">{appliedCoupon}</span>
                    <span className="text-slate-400 ml-2">saving ₹{serverQuote?.couponDiscount ?? 0}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-slate-400 hover:text-rose-400 text-[11px] font-semibold underline underline-offset-2"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code (e.g. TBHWELCOME, RIDE10)"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-[#141416] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#00E5C7]"
                />
                <button
                  type="button"
                  disabled={isApplyingCoupon || !couponCodeInput.trim()}
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl bg-[#00E5C7]/15 hover:bg-[#00E5C7]/25 text-[#00E5C7] border border-[#00E5C7]/40 text-xs font-bold transition disabled:opacity-50"
                >
                  {isApplyingCoupon ? 'Checking...' : 'Apply'}
                </button>
              </div>
            )}
            {couponError && (
              <p className="text-[11px] text-rose-400">{couponError}</p>
            )}
          </div>

          {/* Step 4: Transparent INR Price Breakdown */}
          <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/10 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Base Rent ({duration} {rentalMode.toLowerCase()})</span>
              <span className="font-mono text-white font-semibold">₹{baseRent.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                <span>Multi-Day Duration Discount</span>
                <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {serverQuote?.couponDiscount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                <span>Coupon Discount ({serverQuote.couponCode || appliedCoupon})</span>
                <span className="font-mono">-₹{serverQuote.couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {serverQuote?.offerDiscount > 0 && (
              <div className="flex justify-between text-xs text-[#00E5C7] font-semibold">
                <span>Promotional Offer ({serverQuote.offerName || 'Special Promo'})</span>
                <span className="font-mono">-₹{serverQuote.offerDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            {crossCityFee > 0 && (
              <div className="flex justify-between text-xs text-[#00E5C7] font-semibold">
                <span>Cross-City Transit Logistics ({pickupCity} → {dropCity})</span>
                <span className="font-mono">+₹{crossCityFee.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-300">
              <span>{includeZeroDep ? 'Zero-Dep Insurance Protection' : 'Standard Insurance'}</span>
              <span className="font-mono text-white font-semibold">₹{insuranceRate}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>GST (18% Indian Tax)</span>
              <span className="font-mono text-white font-semibold">₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400 border-b border-white/10 pb-2">
              <span>Refundable Security Deposit (Returned on drop)</span>
              <span className="font-mono text-white font-semibold">₹{securityDeposit.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <div>
                <p className="text-sm font-extrabold text-white">Total Payable Amount</p>
                <p className="text-[10px] text-slate-400">Includes 100% refundable deposit</p>
              </div>
              <span className="text-2xl font-extrabold font-display text-[#00E5C7]">
                ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Step 5: Payment Gateway */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Payment Gateway (Razorpay India)
              </label>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                Razorpay Test Mode
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Project Mode: Authentic Razorpay Checkout enabled. Use Razorpay test credentials or UPI sandbox. No real money will be charged.</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-1 transition ${
                  paymentMethod === 'UPI' 
                    ? 'bg-[#00E5C7]/15 border-[#00E5C7] text-[#00E5C7]' 
                    : 'bg-[#0A0A0B] border-white/10 text-slate-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-1 transition ${
                  paymentMethod === 'CARD' 
                    ? 'bg-[#00E5C7]/15 border-[#00E5C7] text-[#00E5C7]' 
                    : 'bg-[#0A0A0B] border-white/10 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('NETBANKING')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-1 transition ${
                  paymentMethod === 'NETBANKING' 
                    ? 'bg-[#00E5C7]/15 border-[#00E5C7] text-[#00E5C7]' 
                    : 'bg-[#0A0A0B] border-white/10 text-slate-400'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>NetBanking</span>
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Collision or Input Error Banner */}
        {errorMessage && (
          <div className="mx-6 my-3 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2.5 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Modal Footer Submit */}
        <div className="sticky bottom-0 bg-[#141416]/95 backdrop-blur-md px-6 py-4 border-t border-white/10">
          <button
            onClick={!isAuthenticated ? (onOpenAuth || handleConfirmBooking) : handleConfirmBooking}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5C7] via-[#00DFBD] to-[#00C4A7] text-black font-extrabold text-sm shadow-teal-glow hover:opacity-95 transition flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                <span>Securing Fleet Unit & Authorizing Pass...</span>
              </div>
            ) : !isAuthenticated ? (
              <>
                <UserIcon className="w-4 h-4" />
                <span>Sign In to Reserve (₹{totalPayable.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : !isKycVerified ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Complete DL Verification to Reserve</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : !isMobileVerified ? (
              <>
                <Smartphone className="w-4 h-4" />
                <span>Verify Mobile to Reserve</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Pay ₹{totalPayable.toLocaleString('en-IN')} & Generate Rental Pass</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Clerk Phone Verification Modal */}
      <PhoneVerificationModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        onVerificationSuccess={(phone) => {
          updateUser({ mobileVerified: true, phoneNumber: phone });
          refreshUser();
          setIsPhoneModalOpen(false);
        }}
      />
    </div>
  );
};
