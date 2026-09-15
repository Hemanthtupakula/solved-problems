import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { X, Phone, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationSuccess: (phone: string) => void;
}

export const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerificationSuccess,
}) => {
  const { user: clerkUser, isLoaded } = useUser();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'INPUT' | 'VERIFY' | 'SUCCESS'>('INPUT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clerkPhoneObj, setClerkPhoneObj] = useState<any>(null);

  if (!isOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clerkUser) {
      setError('Please sign in to verify your mobile number.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Format number to E.164 if missing +91
      let formatted = phoneNumber.trim().replace(/\s+/g, '');
      if (!formatted.startsWith('+')) {
        formatted = formatted.startsWith('91') ? `+${formatted}` : `+91${formatted}`;
      }

      // Check if number already exists on user profile
      let phoneObj = clerkUser.phoneNumbers.find((p: any) => p.phoneNumber === formatted);
      if (!phoneObj) {
        phoneObj = await clerkUser.createPhoneNumber({ phoneNumber: formatted });
      }

      await (phoneObj as any).prepareVerification({ strategy: 'phone_code' });
      setClerkPhoneObj(phoneObj);
      setStep('VERIFY');
    } catch (err: any) {
      console.error('[CLERK PHONE] Error preparing verification:', err);
      setError(err.errors?.[0]?.longMessage || err.message || 'Failed to dispatch verification code. Please check your phone number.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clerkPhoneObj) {
      setError('No active verification session found. Please re-enter your number.');
      setStep('INPUT');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await clerkPhoneObj.attemptVerification({ code: verificationCode.trim() });
      if (res.verification.status === 'verified') {
        // Authoritative backend sync
        await api.syncClerkMobile();
        setStep('SUCCESS');
        setTimeout(() => {
          onVerificationSuccess(res.phoneNumber);
          onClose();
        }, 1500);
      } else {
        setError(`Verification status: ${res.verification.status}. Please check code.`);
      }
    } catch (err: any) {
      console.error('[CLERK PHONE] Error attempting verification:', err);
      setError(err.errors?.[0]?.longMessage || err.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#141416] border border-white/10 p-6 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#00E5C7]/10 text-[#00E5C7] border border-[#00E5C7]/20">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">Mobile Verification</h3>
            <p className="text-xs text-slate-400">TBH — Ride Beyond Limits</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'INPUT' && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              For booking security and roadside assistance, an authorized mobile number verified via Clerk is required before completing your reservation.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Mobile Number (India)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">+91</span>
                <input
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={phoneNumber.replace(/^\+?91/, '')}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#00E5C7] transition-colors text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#00E5C7] text-black font-bold text-sm tracking-wide hover:bg-[#00E5C7]/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Code...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === 'VERIFY' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter the 6-digit SMS verification code sent to <strong className="text-[#00E5C7]">{clerkPhoneObj?.phoneNumber}</strong>
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="• • • • • •"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 text-center tracking-[0.4em] font-mono text-lg rounded-xl bg-[#0A0A0B] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#00E5C7] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || verificationCode.length < 6}
              className="w-full py-3.5 rounded-xl bg-[#00E5C7] text-black font-bold text-sm tracking-wide hover:bg-[#00E5C7]/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Verification</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setStep('INPUT'); setError(null); }}
              className="w-full text-center text-xs text-slate-400 hover:text-white transition-colors py-1"
            >
              Change phone number
            </button>
          </form>
        )}

        {step === 'SUCCESS' && (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#00E5C7] mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">Mobile Verified Successfully</h4>
            <p className="text-xs text-slate-400">Your profile is synchronized. Proceeding with booking...</p>
          </div>
        )}
      </div>
    </div>
  );
};
