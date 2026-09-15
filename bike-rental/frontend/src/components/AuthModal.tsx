import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  UploadCloud, 
  Lock,
  UserCheck
} from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'SIGN_IN' | 'SIGN_UP';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'SIGN_IN' 
}) => {
  const { user, isAuthenticated, verifyLicense } = useAuth();

  const [activeTab, setActiveTab] = useState<'SIGN_IN' | 'SIGN_UP' | 'LICENSE'>('SIGN_IN');
  const [licenseNumber, setLicenseNumber] = useState<string>(user?.drivingLicenseNumber || '');
  const [isLicenseUploading, setIsLicenseUploading] = useState<boolean>(false);
  const [licenseSuccess, setLicenseSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setLicenseSuccess(false);
      if (isAuthenticated) {
        setActiveTab('LICENSE');
      } else {
        setActiveTab(initialTab);
      }
    }
  }, [isOpen, isAuthenticated, initialTab]);

  if (!isOpen) return null;

  const handleVerifyLicenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!licenseNumber || licenseNumber.trim().length < 6) {
      setErrorMessage('Please enter a valid Indian driving licence number.');
      return;
    }
    setIsLicenseUploading(true);
    try {
      await verifyLicense(licenseNumber.trim().toUpperCase());
      setIsLicenseUploading(false);
      setLicenseSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setIsLicenseUploading(false);
      setLicenseSuccess(false);
      setErrorMessage(err.message || 'Driving licence verification failed on server.');
    }
  };

  const clerkAppearance = {
    variables: {
      colorPrimary: '#00E5C7',
      colorBackground: '#141416',
      colorText: '#FFFFFF',
      colorTextSecondary: '#94A3B8',
      colorInputBackground: '#0A0A0B',
      colorInputBorder: 'rgba(255, 255, 255, 0.12)',
      borderRadius: '0.75rem',
      fontFamily: 'Inter, sans-serif'
    },
    elements: {
      rootBox: 'w-full flex justify-center',
      card: 'bg-transparent border-0 shadow-none w-full p-0',
      headerTitle: 'text-white font-display text-lg font-bold',
      headerSubtitle: 'text-slate-400 text-xs',
      socialButtonsBlockButton: 'bg-[#0A0A0B] border border-white/15 text-white hover:bg-white/5 transition rounded-xl',
      formButtonPrimary: 'bg-[#00E5C7] text-black font-extrabold hover:bg-[#00E5C7]/90 text-xs shadow-teal-glow transition py-2.5 rounded-xl',
      formFieldInput: 'bg-[#0A0A0B] border border-white/15 text-white focus:border-[#00E5C7] text-xs rounded-xl',
      footerActionLink: 'text-[#00E5C7] hover:underline text-xs font-semibold',
      identityPreview: 'bg-[#0A0A0B] border border-white/10 text-white rounded-xl',
      formHeaderTitle: 'text-white text-base font-bold',
      formHeaderSubtitle: 'text-slate-400 text-xs',
      dividerLine: 'bg-white/10',
      dividerText: 'text-slate-500 text-xs font-semibold'
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto"
    >
      <div className="relative w-full max-w-md bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#00E5C7]/15 border border-[#00E5C7]/40 flex items-center justify-center text-[#00E5C7] font-bold">
              TBH
            </div>
            <div>
              <h3 id="auth-modal-title" className="font-extrabold font-display text-base text-white">
                {isAuthenticated ? 'Rider Licence & KYC' : 'Rider Authentication'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isAuthenticated ? 'Motor Vehicles Act Identity Compliance' : 'Secure Sign In & Account Creation'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close authentication modal"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Only when unauthenticated) */}
        {!isAuthenticated && (
          <div className="grid grid-cols-2 gap-1 p-2 bg-[#0A0A0B] border-b border-white/10">
            <button
              onClick={() => { setActiveTab('SIGN_IN'); setErrorMessage(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'SIGN_IN' 
                  ? 'bg-[#141416] text-[#00E5C7] border border-[#00E5C7]/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('SIGN_UP'); setErrorMessage(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'SIGN_UP' 
                  ? 'bg-[#141416] text-[#00E5C7] border border-[#00E5C7]/40' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Unauthenticated: Clerk Sign In */}
          {!isAuthenticated && activeTab === 'SIGN_IN' && (
            <div className="clerk-auth-container">
              <SignIn 
                routing="virtual"
                appearance={clerkAppearance}
              />
            </div>
          )}

          {/* Unauthenticated: Clerk Sign Up */}
          {!isAuthenticated && activeTab === 'SIGN_UP' && (
            <div className="clerk-auth-container">
              <SignUp 
                routing="virtual"
                appearance={clerkAppearance}
              />
            </div>
          )}

          {/* Authenticated: Driving Licence & KYC Verification */}
          {isAuthenticated && (
            <form onSubmit={handleVerifyLicenseSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-[#00E5C7]/30 flex items-center space-x-3">
                <ShieldCheck className="w-7 h-7 text-[#00E5C7]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Driving License & DigiLocker KYC</h4>
                  <p className="text-[10px] text-slate-400">Required by Indian Motor Vehicles Act for self-drive rentals</p>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Driving License Number (DL)
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. KA-01-2023-0048192"
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-[#00E5C7]"
                  required
                />
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-white/15 hover:border-[#00E5C7]/50 text-center cursor-pointer bg-[#0A0A0B]/50 transition">
                <UploadCloud className="w-8 h-8 text-[#00E5C7] mx-auto mb-1" />
                <p className="text-xs font-bold text-white">Upload DL Photo or Fetch via DigiLocker</p>
                <p className="text-[10px] text-slate-400">Parivahan Sarathi Gov Database Sync</p>
              </div>

              {licenseSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>License Verified Successfully!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isLicenseUploading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition"
                >
                  {isLicenseUploading ? 'Verifying with Parivahan Gov...' : 'Verify License & Complete KYC'}
                </button>
              )}
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

