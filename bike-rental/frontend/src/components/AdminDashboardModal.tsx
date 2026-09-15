import React, { useState, useEffect } from 'react';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  MapPin, 
  RefreshCw, 
  FileText 
} from 'lucide-react';
import { Vehicle, City, LicenseVerification, AdminMetrics } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  cities?: City[];
  onToggleAvailability: (vehicleId: number) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  cities = [],
  onToggleAvailability
}) => {
  const { user, loginWithEmail } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const [adminLoggingIn, setAdminLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'FLEET' | 'KYC' | 'PRICING'>('FLEET');
  const [pendingKyc, setPendingKyc] = useState<LicenseVerification[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [loadingKyc, setLoadingKyc] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const fetchMetrics = async () => {
    try {
      const data = await api.getAdminMetrics();
      setMetrics(data);
    } catch (e) {
      console.warn('Failed to load admin metrics', e);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchMetrics();
      if (activeTab === 'KYC') {
        fetchPendingKyc();
      }
    }
  }, [isOpen, activeTab, isAdmin]);

  const handleAdminQuickLogin = async () => {
    setAdminLoggingIn(true);
    try {
      const ok = await loginWithEmail('admin@tbhrentals.in', 'admin123');
      if (ok) {
        fetchMetrics();
        if (activeTab === 'KYC') {
          fetchPendingKyc();
        }
      }
    } catch (e) {
      alert('Admin authentication failed');
    } finally {
      setAdminLoggingIn(false);
    }
  };

  const fetchPendingKyc = async () => {
    setLoadingKyc(true);
    try {
      const list = await api.getPendingKyc();
      setPendingKyc(list || []);
    } catch (e) {
      console.warn('Failed to load pending kyc', e);
    } finally {
      setLoadingKyc(false);
    }
  };

  const handleReview = async (kycId: number, approve: boolean) => {
    setActionLoading(kycId);
    try {
      await api.reviewKyc(kycId, approve ? 'VERIFIED' : 'REJECTED');
      await fetchPendingKyc();
    } catch (e) {
      alert('Review action failed. Please ensure you are signed in as Operations Admin.');
    } finally {
      setActionLoading(null);
    }
  };

  if (!isOpen) return null;

  const totalFleet = metrics?.totalVehicles ?? vehicles.length;
  const availableFleet = metrics?.availableVehicles ?? vehicles.filter(v => v.available).length;
  const activeBookings = metrics?.activeBookings ?? (totalFleet - availableFleet);
  const liveRevenue = metrics?.totalRevenue ?? 0;
  const utilization = metrics?.fleetUtilizationRate ?? '0.0%';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#141416] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-white">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#141416]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5C7]">TBH Operations HQ</span>
            <h3 className="font-extrabold font-display text-lg text-white">Central Operations & Fleet Control</h3>
          </div>
          <div className="flex items-center space-x-2">
            {/* Tabs */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 mr-3">
              <button
                onClick={() => setActiveTab('FLEET')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'FLEET' ? 'bg-[#00E5C7] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fleet Units ({totalFleet})
              </button>
              <button
                onClick={() => setActiveTab('KYC')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center space-x-1 ${
                  activeTab === 'KYC' ? 'bg-[#00E5C7] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>KYC Queue</span>
                {pendingKyc.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-black font-extrabold text-[9px] flex items-center justify-center">
                    {pendingKyc.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('PRICING')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'PRICING' ? 'bg-[#00E5C7] text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                City Hubs ({cities.length || 11})
              </button>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin RBAC Status Banner */}
        {!isAdmin ? (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Browsing in read-only mode. Sign in as Admin to toggle live vehicle availability or verify KYC.</span>
            </div>
            <button
              onClick={handleAdminQuickLogin}
              disabled={adminLoggingIn}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg transition text-xs flex items-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{adminLoggingIn ? 'Authenticating...' : 'Sign In as Operations Admin (admin@tbhrentals.in)'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Authenticated as <strong>{user?.fullName}</strong> ({user?.email})</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
              ROLE_ADMIN VERIFIED
            </span>
          </div>
        )}


        {/* Operational Stats */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/10">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Total Fleet Units</p>
              <p className="text-2xl font-extrabold font-display text-white mt-1">{totalFleet}</p>
              <p className="text-[10px] text-[#00E5C7] mt-0.5">Across 11 Indian Metros</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/10">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Live Available</p>
              <p className="text-2xl font-extrabold font-display text-emerald-400 mt-1">{availableFleet}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{activeBookings} active / on trip</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/10">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Platform Revenue</p>
              <p className="text-2xl font-extrabold font-display text-[#D4AF37] mt-1">₹{Number(liveRevenue).toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">Live captured bookings</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/10">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Fleet Utilization</p>
              <p className="text-2xl font-extrabold font-display text-teal-300 mt-1">{utilization}</p>
              <p className="text-[10px] text-[#00E5C7] mt-0.5">TBH Operations Gated</p>
            </div>
          </div>

          {/* TAB 1: FLEET INVENTORY */}
          {activeTab === 'FLEET' && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Fleet Inventory & Instant Availability Toggle
              </h4>
              <div className="space-y-2">
                {vehicles.map((v) => (
                  <div 
                    key={v.id}
                    className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={v.imageUrl} alt={v.name} className="w-12 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h5 className="text-xs font-bold text-white">{v.name}</h5>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                            {v.maskedRegistrationNumber || 'TS09••••1234'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">{v.vehicleType} • ₹{v.pricePerHour}/hr • ₹{v.pricePerDay}/day</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`text-[11px] font-bold ${v.available ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {v.available ? 'Available' : 'Reserved / Maintenance'}
                      </span>
                      <button
                        onClick={() => onToggleAvailability(v.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          v.available ? 'bg-rose-500/15 text-rose-400 hover:bg-rose-500/25' : 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                        }`}
                      >
                        {v.available ? 'Mark Reserved' : 'Make Available'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: KYC VERIFICATION QUEUE */}
          {activeTab === 'KYC' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Driving Licence (KYC) Verification Queue
                </h4>
                <button
                  onClick={fetchPendingKyc}
                  className="flex items-center space-x-1 text-xs text-[#00E5C7] hover:underline"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingKyc ? 'animate-spin' : ''}`} />
                  <span>Refresh Queue</span>
                </button>
              </div>

              {pendingKyc.length === 0 ? (
                <div className="p-8 text-center bg-[#0A0A0B] rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">All KYC Submissions Cleared</p>
                  <p className="text-xs text-slate-400 mt-0.5">No driving licences pending review at this moment.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingKyc.map((kyc) => (
                    <div key={kyc.id} className="p-4 rounded-xl bg-[#0A0A0B] border border-white/10 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-[#00E5C7]" />
                          <span className="font-mono font-bold text-sm text-white">{kyc.maskedLicenseNumber || 'DL-PENDING'}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                            {kyc.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          State: <strong className="text-white">{kyc.issuingState || 'TS'}</strong> • Valid through: {kyc.expiryDate || 'N/A'}
                        </p>
                        {kyc.submittedAt && (
                          <p className="text-[10px] text-slate-500">Submitted: {new Date(kyc.submittedAt).toLocaleString()}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          disabled={actionLoading === kyc.id}
                          onClick={() => kyc.id && handleReview(kyc.id, false)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 text-xs font-bold transition disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button
                          disabled={actionLoading === kyc.id}
                          onClick={() => kyc.id && handleReview(kyc.id, true)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition disabled:opacity-50"
                        >
                          Approve Licence
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CITY HUBS & PRICING */}
          {activeTab === 'PRICING' && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Multi-City Hub Network & Cross-City Routes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(cities.length > 0 ? cities : [
                  { id: 1, name: 'Hyderabad', state: 'Telangana', stateCode: 'TS', hubs: [] },
                  { id: 2, name: 'Bengaluru', state: 'Karnataka', stateCode: 'KA', hubs: [] },
                  { id: 3, name: 'Chennai', state: 'Tamil Nadu', stateCode: 'TN', hubs: [] },
                  { id: 4, name: 'Mumbai', state: 'Maharashtra', stateCode: 'MH', hubs: [] },
                  { id: 5, name: 'Pune', state: 'Maharashtra', stateCode: 'MH', hubs: [] },
                  { id: 6, name: 'Delhi NCR', state: 'Delhi', stateCode: 'DL', hubs: [] },
                  { id: 7, name: 'Kolkata', state: 'West Bengal', stateCode: 'WB', hubs: [] },
                  { id: 8, name: 'Goa', state: 'Goa', stateCode: 'GA', hubs: [] },
                  { id: 9, name: 'Jaipur', state: 'Rajasthan', stateCode: 'RJ', hubs: [] },
                  { id: 10, name: 'Ahmedabad', state: 'Gujarat', stateCode: 'GJ', hubs: [] },
                  { id: 11, name: 'Kochi', state: 'Kerala', stateCode: 'KL', hubs: [] }
                ]).map((c: any) => (
                  <div key={c.id} className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <MapPin className="w-4 h-4 text-[#00E5C7]" />
                      <div>
                        <h5 className="text-xs font-bold text-white">{c.name} ({c.stateCode || 'IN'})</h5>
                        <p className="text-[10px] text-slate-400">{c.state} • {c.hubs?.length || 2} operational hubs</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      Active City
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
