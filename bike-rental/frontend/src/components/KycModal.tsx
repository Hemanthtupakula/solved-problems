import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileText, 
  Sparkles, 
  RefreshCw,
  Building,
  Calendar,
  Lock,
  QrCode,
  Check,
  Eye,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';
import { LicenseVerification } from '../types';
import { useAuth } from '../context/AuthContext';

interface KycModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  onOpenAuth?: () => void;
  onVerificationSuccess?: () => void;
}

export const KycModal: React.FC<KycModalProps> = ({
  isOpen,
  onClose,
  userId,
  onOpenAuth,
  onVerificationSuccess
}) => {
  const { user, isAuthenticated } = useAuth();
  const effectiveUserId = userId || user?.id;

  const [kycData, setKycData] = useState<LicenseVerification | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // All 28 Indian States + 8 Union Territories for RTO Licence verification
  const INDIAN_RTO_STATES = [
    { code: 'AP', name: 'Andhra Pradesh' },
    { code: 'AR', name: 'Arunachal Pradesh' },
    { code: 'AS', name: 'Assam' },
    { code: 'BR', name: 'Bihar' },
    { code: 'CG', name: 'Chhattisgarh' },
    { code: 'GA', name: 'Goa' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'HR', name: 'Haryana' },
    { code: 'HP', name: 'Himachal Pradesh' },
    { code: 'JH', name: 'Jharkhand' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'KL', name: 'Kerala' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'MH', name: 'Maharashtra' },
    { code: 'MN', name: 'Manipur' },
    { code: 'ML', name: 'Meghalaya' },
    { code: 'MZ', name: 'Mizoram' },
    { code: 'NL', name: 'Nagaland' },
    { code: 'OD', name: 'Odisha' },
    { code: 'PB', name: 'Punjab' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'SK', name: 'Sikkim' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'TS', name: 'Telangana' },
    { code: 'TR', name: 'Tripura' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'UK', name: 'Uttarakhand' },
    { code: 'WB', name: 'West Bengal' },
    { code: 'AN', name: 'Andaman & Nicobar (UT)' },
    { code: 'CH', name: 'Chandigarh (UT)' },
    { code: 'DN', name: 'Dadra & Nagar Haveli (UT)' },
    { code: 'DD', name: 'Daman & Diu (UT)' },
    { code: 'DL', name: 'Delhi NCR (UT)' },
    { code: 'JK', name: 'Jammu & Kashmir (UT)' },
    { code: 'LA', name: 'Ladakh (UT)' },
    { code: 'LD', name: 'Lakshadweep (UT)' },
    { code: 'PY', name: 'Puducherry (UT)' },
  ];

  // Step 1: Upload Form fields
  const [licenseNumber, setLicenseNumber] = useState('');
  const [issuingState, setIssuingState] = useState('TS');
  const [expiryDate, setExpiryDate] = useState('2032-12-31');
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const handleLicenseNumberChange = (value: string) => {
    const upper = value.toUpperCase();
    setLicenseNumber(upper);
    const clean = upper.replace(/[^A-Z0-9]/g, '');
    if (clean.length >= 2) {
      const prefix = clean.substring(0, 2);
      const match = INDIAN_RTO_STATES.find(s => s.code === prefix);
      if (match) {
        setIssuingState(match.code);
      }
    }
  };

  // Step 2: Extracted Information & Confirmation fields
  const [confirmedName, setConfirmedName] = useState('');
  const [confirmedDl, setConfirmedDl] = useState('');
  const [confirmedDob, setConfirmedDob] = useState('');
  const [confirmedExpiry, setConfirmedExpiry] = useState('');
  const [confirmedClasses, setConfirmedClasses] = useState('');
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  const syncConfirmationFields = (data: LicenseVerification) => {
    setConfirmedName(data.extractedName || '');
    setConfirmedDl(data.extractedLicenseNumber || data.maskedLicenseNumber || '');
    setConfirmedDob(data.extractedDob || data.dateOfBirth || '');
    setConfirmedExpiry(data.extractedExpiryDate || data.expiryDate || '');
    setConfirmedClasses(data.extractedVehicleClasses || 'MCWG, LMV');
    setIsConsentChecked(false);
  };

  const fetchStatus = async () => {
    if (!effectiveUserId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await api.getKycStatus(effectiveUserId);
      setKycData(data);
      if (data.maskedLicenseNumber) {
        setLicenseNumber(data.maskedLicenseNumber);
      }
      if (data.issuingState) {
        setIssuingState(data.issuingState);
      }
      if (data.expiryDate) {
        setExpiryDate(data.expiryDate);
      }
      syncConfirmationFields(data);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch verification status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && effectiveUserId) {
      fetchStatus();
    }
  }, [isOpen, effectiveUserId]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseNumber || licenseNumber.trim().length < 6) {
      setError('Please provide a valid Indian driving licence number.');
      return;
    }
    if (!frontFile || !backFile) {
      setError('Both front and back photos of your driving licence are required.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('licenseNumber', licenseNumber.trim().toUpperCase());
      fd.append('issuingState', issuingState);
      fd.append('expiryDate', expiryDate);
      if (frontFile) fd.append('frontDocument', frontFile);
      if (backFile) fd.append('backDocument', backFile);

      const res = await api.uploadKyc(fd);
      setKycData(res);
      syncConfirmationFields(res);

      if (res.status === 'CUSTOMER_CONFIRMATION_REQUIRED') {
        setSuccessMsg('Document scanned with Tesseract OCR! Please review and confirm the extracted details below.');
      } else if (res.verified) {
        setSuccessMsg('Driving licence verified successfully.');
        if (onVerificationSuccess) onVerificationSuccess();
        setTimeout(() => onClose(), 1500);
      } else {
        setSuccessMsg('Driving licence uploaded and queued for review.');
      }
    } catch (e: any) {
      setError(e.message || 'Verification submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmExtracted = async () => {
    if (!kycData?.id) return;
    if (!isConsentChecked) {
      setError('You must confirm that the details are authentic and match your driving licence.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await api.confirmKyc({
        kycId: kycData.id,
        confirmed: true,
        name: confirmedName,
        licenseNumber: confirmedDl,
        dob: confirmedDob,
        expiryDate: confirmedExpiry,
        vehicleClasses: confirmedClasses
      });
      setKycData(res);
      setSuccessMsg('Driving licence details confirmed! Application queued for administrator review.');
      if (onVerificationSuccess) {
        onVerificationSuccess();
      }
    } catch (e: any) {
      setError(e.message || 'Confirmation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isVerified = kycData?.verified === true || kycData?.status === 'VERIFIED' || kycData?.status === 'TBH_VERIFIED';
  const isPendingReview = kycData?.status === 'PENDING_ADMIN_REVIEW' || kycData?.status === 'MANUAL_REVIEW' || kycData?.status === 'SUBMITTED';
  const isConfirmationRequired = kycData?.status === 'CUSTOMER_CONFIRMATION_REQUIRED';
  const isReuploadRequired = kycData?.status === 'REUPLOAD_REQUIRED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Driving Licence (KYC) Verification</h3>
              <p className="text-xs text-white/50">TBH Motor Vehicles Compliance & Rental Eligibility</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {/* Unauthenticated State */}
          {!isAuthenticated || !user ? (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <div>
                <h4 className="text-base font-bold text-white">Sign In to Verify Licence</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Government driving licence verification requires an active rider profile. Please sign in or register to proceed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenAuth) onOpenAuth();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition"
              >
                Sign In / Register
              </button>
            </div>
          ) : isVerified ? (
            /* 1. Verified State */
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-400 text-sm">TBH Verified & Rental Authorised</span>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      TBH_VERIFIED
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Driving Licence approved by TBH Administrator. Rental bookings are fully unlocked.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-500/20 text-xs">
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">Licence</span>
                  <span className="font-mono text-white font-medium">{kycData?.maskedLicenseNumber || 'Verified'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">State RTO</span>
                  <span className="text-white font-medium">{kycData?.issuingState || 'DL'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">Valid Upto</span>
                  <span className="text-white font-medium">{kycData?.expiryDate || 'Active'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">Vehicle Classes</span>
                  <span className="font-mono text-[#00E5C7] font-semibold">{kycData?.extractedVehicleClasses || 'MCWG, LMV'}</span>
                </div>
              </div>
            </div>
          ) : isPendingReview ? (
            /* 2. Pending Admin Review State */
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-400 text-sm">Pending Administrator Review</span>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      PENDING_REVIEW
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Your driving licence documents and confirmed details have been securely recorded and queued for manual inspection by a TBH administrator.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-500/20 text-xs">
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">Licence</span>
                  <span className="font-mono text-white font-medium">{kycData?.maskedLicenseNumber || 'DL Submitted'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">Vehicle Classes</span>
                  <span className="font-mono text-[#00E5C7] font-semibold">{kycData?.extractedVehicleClasses || 'Pending Review'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-white/50 uppercase">Submitted</span>
                  <span className="text-white font-medium">{kycData?.submittedAt ? new Date(kycData.submittedAt).toLocaleDateString() : 'Recent'}</span>
                </div>
              </div>
            </div>
          ) : isReuploadRequired ? (
            /* 3. Re-upload Required Banner */
            <div className="p-4 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-orange-400 text-sm">Re-upload Required by Administrator</span>
                <p className="text-xs text-white/80 mt-0.5">
                  <strong>Notes:</strong> {kycData?.rejectionReason || 'Please upload clearer front and back photos of your driving licence.'}
                </p>
              </div>
            </div>
          ) : null}

          {/* Feedback alerts */}
          {error && (
            <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Step 2: Extracted Information & Confirmation Screen */}
          {isAuthenticated && user && isConfirmationRequired && kycData && (
            <div className="space-y-4 pt-1">
              <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Automated OCR & Document Check
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    Review & Confirm
                  </span>
                </div>
                <p className="text-xs text-white/70">
                  Verify the OCR-extracted details below. You may correct any text errors before final submission to the TBH administrator.
                </p>
              </div>

              {/* Automated Check Badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[10px] text-white/50 uppercase font-semibold">Quality Check</p>
                  <p className={`text-xs font-bold mt-0.5 ${kycData.documentQualityStatus === 'FAILED' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {kycData.documentQualityStatus || 'GOOD'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[10px] text-white/50 uppercase font-semibold">Tesseract OCR</p>
                  <p className={`text-xs font-bold mt-0.5 ${kycData.ocrStatus === 'OCR_SUCCESS' ? 'text-emerald-400' : kycData.ocrStatus === 'OCR_INCOMPLETE' ? 'text-amber-400' : 'text-slate-400'}`}>
                    {kycData.ocrStatus || 'OCR_UNAVAILABLE'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[10px] text-white/50 uppercase font-semibold">Assistive QR</p>
                  <p className={`text-xs font-bold mt-0.5 ${kycData.qrStatus === 'QR_DETECTED' ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {kycData.qrStatus === 'QR_DETECTED' ? 'DETECTED' : 'NOT DETECTED'}
                  </p>
                </div>
              </div>

              {/* Extracted Details Form */}
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div>
                  <label className="block text-[11px] font-medium text-white/60 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={confirmedName}
                    onChange={(e) => setConfirmedName(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                    placeholder="Full Name as shown on DL"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-white/60 mb-1">Driving Licence Number</label>
                  <input
                    type="text"
                    value={confirmedDl}
                    onChange={(e) => setConfirmedDl(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-mono"
                    placeholder="DL Number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-white/60 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={confirmedDob}
                      onChange={(e) => setConfirmedDob(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-white/60 mb-1">Valid Till / Expiry</label>
                    <input
                      type="date"
                      value={confirmedExpiry}
                      onChange={(e) => setConfirmedExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-white/60 mb-1">Vehicle Transport Classes</label>
                  <input
                    type="text"
                    value={confirmedClasses}
                    onChange={(e) => setConfirmedClasses(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-mono"
                    placeholder="e.g. MCWG, LMV"
                  />
                  <span className="text-[10px] text-white/40 mt-0.5 block">
                    MCWG = Two-wheelers (Bikes/Scooters) • LMV = Light Motor Vehicles (Cars)
                  </span>
                </div>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConsentChecked}
                  onChange={(e) => setIsConsentChecked(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 text-teal-500 focus:ring-0 focus:ring-offset-0 bg-white/5"
                />
                <span className="text-xs text-white/80 leading-relaxed">
                  I confirm under penalty of Indian Motor Vehicles Act that the uploaded documents belong to me, the extracted details are accurate, and I hold valid authorisation to ride/drive in India.
                </span>
              </label>

              {/* Confirm Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setKycData(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white text-xs font-semibold"
                >
                  Upload Different Photo
                </button>
                <button
                  type="button"
                  disabled={submitting || !isConsentChecked}
                  onClick={handleConfirmExtracted}
                  className="flex-1 py-2.5 px-4 bg-[#00E5C7] hover:bg-[#00E5C7]/90 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>Confirm & Submit for Review</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Upload Document Form (Shown when unverified and not in confirmation step) */}
          {isAuthenticated && user && (!isVerified || isReuploadRequired) && !isConfirmationRequired && (
            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-1">
              <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                {isReuploadRequired ? 'Upload New Clear Licence Images' : 'Upload Driving Licence Document'}
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-white/40" />
                  Driving Licence Number
                </label>
                <input
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={e => handleLicenseNumberChange(e.target.value)}
                  placeholder="e.g. AP203 20250001194"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-teal-500 font-mono transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-white/40" />
                    Issuing State RTO
                  </label>
                  <select
                    value={issuingState}
                    onChange={e => setIssuingState(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#18181B] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    {INDIAN_RTO_STATES.map(s => (
                      <option key={s.code} value={s.code}>
                        {s.code} — {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={e => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Document upload fields */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-teal-400" />
                    DL Front Photo (Required)
                  </label>
                  <label className="cursor-pointer flex flex-col items-center justify-center p-3.5 border border-dashed border-white/20 hover:border-teal-500/50 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <span className="text-xs text-white/70 truncate max-w-[150px]">
                      {frontFile ? frontFile.name : 'Select Front Photo'}
                    </span>
                    <span className="text-[10px] text-teal-400/80 mt-1 font-medium">Required (Name & DL No)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      className="hidden"
                      onChange={e => setFrontFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-teal-400" />
                    DL Back Photo (Required)
                  </label>
                  <label className="cursor-pointer flex flex-col items-center justify-center p-3.5 border border-dashed border-white/20 hover:border-teal-500/50 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <span className="text-xs text-white/70 truncate max-w-[150px]">
                      {backFile ? backFile.name : 'Select Back Photo'}
                    </span>
                    <span className="text-[10px] text-teal-400/80 mt-1 font-medium">Required (QR & Classes)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      className="hidden"
                      onChange={e => setBackFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center gap-2 text-[11px] text-white/40 pt-1">
                <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Private storage vault. Raw QR payloads never persisted or exposed.</span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-white/90 text-black font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>Scan & Process</span>
                </button>
              </div>
            </form>
          )}

          {/* Close button if verified or pending review */}
          {(isVerified || isPendingReview) && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
