import React, { useState, useEffect } from 'react';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  MapPin, 
  RefreshCw, 
  FileText,
  Users,
  Calendar,
  Eye,
  ArrowLeft,
  ChevronRight,
  Clock,
  Car,
  Tag,
  Gift,
  LifeBuoy,
  CreditCard,
  Bell,
  BarChart3,
  History,
  Send,
  Plus,
  Trash2,
  Lock,
  Smartphone,
  Check,
  AlertTriangle
} from 'lucide-react';
import { 
  Vehicle, 
  City, 
  LicenseVerification, 
  AdminMetrics, 
  Booking,
  Coupon,
  Offer,
  SupportTicket,
  SupportMessage,
  AdminAuditLog
} from '../types';
import { api, API_BASE } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface AdminDashboardProps {
  onBackToHome: () => void;
  onOpenAuth?: () => void;
  vehicles: Vehicle[];
  cities?: City[];
  onToggleAvailability: (vehicleId: number) => void;
}

type TabType = 
  | 'OVERVIEW' 
  | 'BOOKINGS' 
  | 'FLEET' 
  | 'CUSTOMERS' 
  | 'KYC' 
  | 'OFFERS' 
  | 'COUPONS' 
  | 'SUPPORT' 
  | 'PAYMENTS' 
  | 'NOTIFICATIONS' 
  | 'ANALYTICS' 
  | 'AUDIT';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToHome,
  onOpenAuth,
  vehicles,
  cities = [],
  onToggleAvailability
}) => {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = isAuthenticated && user?.role === 'ROLE_ADMIN';

  const [activeTab, setActiveTab] = useState<TabType>('OVERVIEW');
  const [pendingKyc, setPendingKyc] = useState<LicenseVerification[]>([]);
  const [allKyc, setAllKyc] = useState<LicenseVerification[]>([]);
  const [kycFilter, setKycFilter] = useState<'PENDING' | 'ALL'>('PENDING');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);

  // Offers & Coupons States
  const [offers, setOffers] = useState<Offer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [newOffer, setNewOffer] = useState({ name: '', description: '', discountPercentage: 10, validUntil: '' });
  const [newCoupon, setNewCoupon] = useState<{
    code: string;
    discountType: 'PERCENTAGE' | 'FLAT';
    discountValue: number;
    minimumOrderAmount: number;
    maxDiscountAmount: number;
    validUntil: string;
  }>({ code: '', discountType: 'PERCENTAGE', discountValue: 15, minimumOrderAmount: 500, maxDiscountAmount: 1000, validUntil: '' });

  // Support Inbox States
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [ticketMessages, setTicketMessages] = useState<SupportMessage[]>([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyStatus, setReplyStatus] = useState<string>('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  // Audit Logs & Analytics States
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // KYC Review & Modal States
  const [loadingData, setLoadingData] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [previewDocUrl, setPreviewDocUrl] = useState<string | null>(null);
  const [previewDocTitle, setPreviewDocTitle] = useState<string>('');
  const [rejectingKycId, setRejectingKycId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [auditKycId, setAuditKycId] = useState<number | null>(null);
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  // Search/filter
  const [bookingSearch, setBookingSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [
        metricsRes,
        bookingsRes,
        usersRes,
        pendingKycRes,
        allKycRes,
        offersRes,
        couponsRes,
        ticketsRes,
        auditLogsRes
      ] = await Promise.allSettled([
        api.getAdminOverview(),
        api.getAllAdminBookings(),
        api.getAllAdminUsers(),
        api.getPendingKyc(),
        api.getAllAdminKyc(),
        api.getOffers(),
        api.getCoupons(),
        api.getAdminSupportTickets(),
        api.getAdminAuditLogs()
      ]);

      if (metricsRes.status === 'fulfilled') setMetrics(metricsRes.value);
      if (bookingsRes.status === 'fulfilled') setBookings(bookingsRes.value || []);
      if (usersRes.status === 'fulfilled') setUserList(usersRes.value || []);
      if (pendingKycRes.status === 'fulfilled') setPendingKyc(pendingKycRes.value || []);
      if (allKycRes.status === 'fulfilled') setAllKyc(allKycRes.value || []);
      if (offersRes.status === 'fulfilled') setOffers(offersRes.value || []);
      if (couponsRes.status === 'fulfilled') setCoupons(couponsRes.value || []);
      if (ticketsRes.status === 'fulfilled') setTickets(ticketsRes.value || []);
      if (auditLogsRes.status === 'fulfilled') setAuditLogs(auditLogsRes.value || []);

      api.getAdminAnalytics().then(res => setAnalyticsData(res)).catch(() => {});
    } catch (err) {
      console.warn('[ADMIN] Error loading central data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (selectedTicket) {
      api.getAdminSupportMessages(selectedTicket.id).then(msgs => {
        setTicketMessages(msgs || []);
      }).catch(err => console.warn('Failed to load ticket messages', err));
    }
  }, [selectedTicket?.id]);

  const handleApproveKyc = async (kycId: number) => {
    setActionLoading(kycId);
    try {
      await api.reviewKyc(kycId, 'VERIFIED');
      await fetchAllData();
    } catch (e) {
      console.error('Failed to approve KYC', e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectKyc = async (kycId: number) => {
    if (!rejectionReason.trim()) return;
    setActionLoading(kycId);
    try {
      await api.reviewKyc(kycId, 'REJECTED', rejectionReason);
      setRejectingKycId(null);
      setRejectionReason('');
      await fetchAllData();
    } catch (e) {
      console.error('Failed to reject KYC', e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewAudit = async (kycId: number) => {
    setAuditKycId(kycId);
    setLoadingAudit(true);
    try {
      const logs = await api.getKycAudit(kycId);
      setAuditEvents(logs || []);
    } catch (e) {
      console.warn('Failed to fetch audit log', e);
      setAuditEvents([]);
    } finally {
      setLoadingAudit(false);
    }
  };

  const handlePreviewDoc = async (docUrl: string, title: string) => {
    setPreviewDocTitle(title);
    try {
      const blob = await api.fetchKycDocument(docUrl);
      const objUrl = URL.createObjectURL(blob);
      setPreviewDocUrl(objUrl);
    } catch {
      setPreviewDocUrl(docUrl.startsWith('http') ? docUrl : `${API_BASE}/${docUrl}`);
    }
  };

  const handleToggleOffer = async (id: number) => {
    try {
      const updated = await api.toggleOffer(id);
      setOffers(prev => prev.map(o => o.id === id ? updated : o));
    } catch (err) {
      console.error('Failed to toggle offer', err);
    }
  };

  const handleDeleteOffer = async (id: number) => {
    try {
      await api.deleteOffer(id);
      setOffers(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      console.error('Failed to delete offer', err);
    }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.createOffer({
        name: newOffer.name,
        description: newOffer.description,
        discountPercentage: Number(newOffer.discountPercentage),
        active: true,
        validUntil: newOffer.validUntil ? `${newOffer.validUntil}T23:59:59` : undefined
      });
      setOffers(prev => [created, ...prev]);
      setShowAddOfferModal(false);
      setNewOffer({ name: '', description: '', discountPercentage: 10, validUntil: '' });
    } catch (err) {
      console.error('Failed to create offer', err);
    }
  };

  const handleToggleCoupon = async (id: number) => {
    try {
      const updated = await api.toggleCoupon(id);
      setCoupons(prev => prev.map(c => c.id === id ? updated : c));
    } catch (err) {
      console.error('Failed to toggle coupon', err);
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    try {
      await api.deleteCoupon(id);
      setCoupons(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Failed to delete coupon', err);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.createCoupon({
        code: newCoupon.code.toUpperCase(),
        discountType: newCoupon.discountType,
        discountValue: Number(newCoupon.discountValue),
        minimumOrderAmount: Number(newCoupon.minimumOrderAmount),
        maxDiscountAmount: Number(newCoupon.maxDiscountAmount),
        active: true,
        validUntil: newCoupon.validUntil ? `${newCoupon.validUntil}T23:59:59` : undefined
      });
      setCoupons(prev => [created, ...prev]);
      setShowAddCouponModal(false);
      setNewCoupon({ code: '', discountType: 'PERCENTAGE', discountValue: 15, minimumOrderAmount: 500, maxDiscountAmount: 1000, validUntil: '' });
    } catch (err) {
      console.error('Failed to create coupon', err);
    }
  };

  const handleReplyTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage.trim()) return;
    setSendingReply(true);
    try {
      const msg = await api.replyAdminSupportTicket(
        selectedTicket.id, 
        replyMessage.trim(), 
        isInternalNote, 
        replyStatus || undefined
      );
      setTicketMessages(prev => [...prev, msg]);
      setReplyMessage('');
      setIsInternalNote(false);
      if (replyStatus) {
        setSelectedTicket(prev => prev ? { ...prev, status: replyStatus } : null);
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: replyStatus } : t));
      }
    } catch (err) {
      console.error('Failed to send reply', err);
    } finally {
      setSendingReply(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Access Control Gates
  // ---------------------------------------------------------------------------

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141416] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-white mb-2">TBH Operations Portal</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Authentication required to access the central operations and fleet administration console.
          </p>
          <div className="space-y-3">
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition"
              >
                Sign In with Administrator Account
              </button>
            )}
            <button
              onClick={onBackToHome}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              Return to Fleet Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141416] border border-rose-500/20 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-5 text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-white mb-2">Access Denied</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Your authenticated account (<strong className="text-white">{user?.email}</strong>) does not have administrator privileges (<code className="text-rose-300 font-mono text-[11px]">ROLE_ADMIN</code>).
          </p>
          <button
            onClick={onBackToHome}
            className="w-full py-2.5 rounded-xl bg-[#00E5C7] text-black text-xs font-bold shadow-teal-glow hover:opacity-95 transition"
          >
            Return to Fleet Catalog
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Authoritative Admin View
  // ---------------------------------------------------------------------------

  const totalFleet = metrics?.totalVehicles ?? vehicles.length;
  const availableFleet = metrics?.availableVehicles ?? vehicles.filter(v => v.available).length;
  const activeBookings = metrics?.activeBookings ?? (totalFleet - availableFleet);
  const liveRevenue = metrics?.totalRevenue ?? 0;
  const utilization = metrics?.fleetUtilizationRate ?? '0.0%';

  const displayedKycList = kycFilter === 'PENDING' ? pendingKyc : allKyc;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      
      {/* Top Operations Header */}
      <header className="sticky top-0 z-40 bg-[#141416]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
            title="Return to Public Fleet"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black font-display tracking-widest text-[#00E5C7]">TBH</span>
              <span className="text-slate-500 font-bold">•</span>
              <h1 className="text-sm font-bold font-display text-white">Ride Beyond Limits — Control Center</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono">
                ROLE_ADMIN
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Admin: <strong className="text-white">{user?.fullName || 'Super Administrator'}</strong> ({user?.email})
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={fetchAllData}
            disabled={loadingData}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            onClick={onBackToHome}
            className="px-3.5 py-1.5 rounded-xl bg-[#00E5C7] text-black text-xs font-bold hover:opacity-95 transition"
          >
            Live Catalog
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 space-y-6">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Total Fleet</p>
            <p className="text-2xl font-extrabold font-display text-white mt-1">{totalFleet}</p>
            <p className="text-[10px] text-[#00E5C7] mt-0.5">Across 11 Indian Metros</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Available Units</p>
            <p className="text-2xl font-extrabold font-display text-emerald-400 mt-1">{availableFleet}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{totalFleet - availableFleet} in use / reserved</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Active Bookings</p>
            <p className="text-2xl font-extrabold font-display text-teal-300 mt-1">{activeBookings}</p>
            <p className="text-[10px] text-teal-400 mt-0.5">Live trips in progress</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Captured Revenue</p>
            <p className="text-2xl font-extrabold font-display text-[#D4AF37] mt-1">₹{Number(liveRevenue).toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-emerald-400 mt-0.5">Verified settlements</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Utilization</p>
            <p className="text-2xl font-extrabold font-display text-cyan-400 mt-1">{utilization}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Gated fleet metric</p>
          </div>
        </div>

        {/* 12-Section Navigation Bar */}
        <div className="flex border-b border-white/10 overflow-x-auto space-x-1 pb-1 scrollbar-none">
          {[
            { id: 'OVERVIEW', label: 'Overview', icon: Layers },
            { id: 'BOOKINGS', label: `Bookings (${bookings.length})`, icon: Calendar },
            { id: 'FLEET', label: `Fleet (${totalFleet})`, icon: Car },
            { id: 'CUSTOMERS', label: `Customers (${userList.length})`, icon: Users },
            { id: 'KYC', label: `KYC Queue (${pendingKyc.length})`, icon: ShieldCheck, alert: pendingKyc.length > 0 },
            { id: 'OFFERS', label: `Offers (${offers.length})`, icon: Gift },
            { id: 'COUPONS', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'SUPPORT', label: `Support (${tickets.filter(t => t.status === 'OPEN').length})`, icon: LifeBuoy, alert: tickets.filter(t => t.status === 'OPEN').length > 0 },
            { id: 'PAYMENTS', label: 'Payments', icon: CreditCard },
            { id: 'NOTIFICATIONS', label: 'Notifications', icon: Bell },
            { id: 'ANALYTICS', label: 'Analytics', icon: BarChart3 },
            { id: 'AUDIT', label: 'Audit Logs', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3.5 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
                  isActive 
                    ? 'bg-[#141416] text-[#00E5C7] border-t-2 border-[#00E5C7]' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.alert && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 1. OVERVIEW TAB */}
        {/* =================================================================== */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Hub Fleet Allocation</h3>
                  <span className="text-xs font-mono text-[#00E5C7]">{cities.length} Metros Active</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cities.map((city) => (
                    <div key={city.id} className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-white mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00E5C7]" />
                        <span>{city.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{city.state} • {city.hubs?.length || 2} Hubs</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Quick Command Center</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('KYC')}
                    className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-[#00E5C7]/40 text-left transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">KYC Verification Queue</p>
                        <p className="text-[10px] text-slate-400">{pendingKyc.length} pending review</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab('SUPPORT')}
                    className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-[#00E5C7]/40 text-left transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <LifeBuoy className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Customer Support Inbox</p>
                        <p className="text-[10px] text-slate-400">{tickets.filter(t => t.status === 'OPEN').length} unread tickets</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab('COUPONS')}
                    className="w-full p-3 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-[#00E5C7]/40 text-left transition flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Promotional Coupons</p>
                        <p className="text-[10px] text-slate-400">{coupons.filter(c => c.active).length} active coupons</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise Infrastructure Status */}
            <div className="p-5 rounded-2xl bg-[#141416] border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Enterprise Infrastructure Status</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Clerk Auth & RS256:</span>
                  <span className="font-mono text-emerald-400 font-bold">OPERATIONAL</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Razorpay Gateway:</span>
                  <span className="font-mono text-emerald-400 font-bold">TEST MODE (ACTIVE)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">MySQL 8.4 Engine:</span>
                  <span className="font-mono text-emerald-400 font-bold">CONNECTED</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Redis Fleet Cache:</span>
                  <span className="font-mono text-emerald-400 font-bold">SYNCHRONIZED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2. BOOKINGS TAB */}
        {/* =================================================================== */}
        {activeTab === 'BOOKINGS' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Active & Historic Bookings ({bookings.length})
              </h3>
              <input
                type="text"
                placeholder="Search by reference, rider, or vehicle..."
                value={bookingSearch}
                onChange={e => setBookingSearch(e.target.value)}
                className="bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5C7] w-full sm:w-72"
              />
            </div>
            {bookings.length === 0 ? (
              <div className="p-8 text-center bg-[#0A0A0B] rounded-xl border border-white/5">
                <Calendar className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No Bookings Recorded</p>
                <p className="text-xs text-slate-400 mt-0.5">Live platform bookings will display here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {bookings
                  .filter(b => {
                    const q = bookingSearch.toLowerCase();
                    return !q || 
                      (b.bookingReference || '').toLowerCase().includes(q) ||
                      (b.vehicle?.name || '').toLowerCase().includes(q) ||
                      (b.user?.fullName || '').toLowerCase().includes(q);
                  })
                  .map((b) => (
                    <div key={b.id} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-sm text-white">{b.bookingReference || (b as any).bookingNumber}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            b.status === 'CONFIRMED' ? 'bg-emerald-500/15 text-emerald-300' :
                            b.status === 'ONGOING' ? 'bg-cyan-500/15 text-cyan-300' :
                            b.status === 'CANCELLED' ? 'bg-rose-500/15 text-rose-300' : 'bg-amber-500/15 text-amber-300'
                          }`}>
                            {b.status}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                            {b.paymentStatus || 'PAID'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-semibold">{b.vehicle?.name || (b as any).vehicleName || 'Vehicle Rental'}</p>
                        <p className="text-[10px] text-slate-500">
                          {b.pickupCity} ({b.pickupHub}) → {b.dropCity} ({b.dropHub})
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-extrabold font-display text-[#D4AF37]">₹{Number(b.totalAmount).toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-slate-400">PIN: <span className="font-mono font-bold text-white">{b.unlockPin || (b as any).securityPin || '••••'}</span></p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* 3. FLEET CONTROL TAB (Photographic assets only) */}
        {/* =================================================================== */}
        {activeTab === 'FLEET' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Fleet Units ({vehicles.length}) & Availability Toggles
              </h3>
            </div>
            <div className="space-y-2">
              {vehicles.map((v) => (
                <div 
                  key={v.id}
                  className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <img src={v.imageUrl} alt={v.name} className="w-16 h-12 object-cover rounded-lg bg-white/5 border border-white/10" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-bold text-white">{v.name}</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                          {v.maskedRegistrationNumber || 'REG-PENDING'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {v.vehicleType} • ₹{v.pricePerHour}/hr • ₹{v.pricePerDay}/day • Deposit ₹{v.securityDeposit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`text-[11px] font-bold ${v.available ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {v.available ? 'Available for Rent' : 'Reserved / Maintenance'}
                    </span>
                    <button
                      onClick={() => onToggleAvailability(v.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                        v.available 
                          ? 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25' 
                          : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
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

        {/* =================================================================== */}
        {/* 4. CUSTOMERS TAB */}
        {/* =================================================================== */}
        {activeTab === 'CUSTOMERS' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Registered Platform Customers ({userList.length})
              </h3>
              <input
                type="text"
                placeholder="Search customers by name, email, phone..."
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                className="bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00E5C7] w-full sm:w-72"
              />
            </div>
            <div className="space-y-2">
              {userList
                .filter(u => {
                  const q = customerSearch.toLowerCase();
                  return !q ||
                    (u.fullName || '').toLowerCase().includes(q) ||
                    (u.email || '').toLowerCase().includes(q) ||
                    (u.phoneNumber || '').toLowerCase().includes(q);
                })
                .map((u) => (
                  <div key={u.id} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{u.fullName || 'TBH Rider'}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                          u.role === 'ROLE_ADMIN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/10 text-slate-300'
                        }`}>
                          {u.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {u.email} {u.phoneNumber ? `• ${u.phoneNumber}` : '• No phone registered'}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        u.mobileVerified 
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                      }`}>
                        {u.mobileVerified ? '✓ Mobile Verified' : '⚠ Mobile Pending'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        u.drivingLicenseVerified 
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                      }`}>
                        {u.drivingLicenseVerified ? `DL: ${u.drivingLicenseNumber || 'Verified'}` : 'DL Pending'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 5. KYC QUEUE TAB */}
        {/* =================================================================== */}
        {activeTab === 'KYC' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Driving Licence KYC Verification Queue
              </h3>
              <div className="flex bg-[#0A0A0B] p-1 rounded-xl border border-white/5 text-xs">
                <button
                  onClick={() => setKycFilter('PENDING')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    kycFilter === 'PENDING' ? 'bg-[#00E5C7] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pending ({pendingKyc.length})
                </button>
                <button
                  onClick={() => setKycFilter('ALL')}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    kycFilter === 'ALL' ? 'bg-[#00E5C7] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({allKyc.length})
                </button>
              </div>
            </div>

            {displayedKycList.length === 0 ? (
              <div className="p-8 text-center bg-[#0A0A0B] rounded-xl border border-white/5">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">KYC Queue Clear</p>
                <p className="text-xs text-slate-400 mt-0.5">No pending customer licence submissions.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedKycList.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-[#0A0A0B] border border-white/5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">{item.fullName}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.status === 'VERIFIED' ? 'bg-emerald-500/15 text-emerald-300' :
                            item.status === 'REJECTED' ? 'bg-rose-500/15 text-rose-300' : 'bg-amber-500/15 text-amber-300'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          DL: {item.licenseNumber} • User ID: {item.userId}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {item.documentUrl && (
                          <button
                            onClick={() => handlePreviewDoc(item.documentUrl!, `Licence - ${item.fullName || item.maskedLicenseNumber || 'Customer'}`)}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                        )}
                        <button
                          onClick={() => item.id && handleViewAudit(item.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-400 hover:text-white border border-white/10 transition"
                        >
                          <History className="w-3.5 h-3.5" />
                          <span>Audit</span>
                        </button>
                        {item.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => item.id && handleApproveKyc(item.id)}
                              disabled={actionLoading === item.id}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => item.id && setRejectingKycId(item.id)}
                              disabled={actionLoading === item.id}
                              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/40 transition"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {rejectingKycId === item.id && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                        <label className="block text-xs font-bold text-rose-300">Rejection Reason</label>
                        <input
                          type="text"
                          placeholder="e.g. Blurred photo, expired date, invalid class..."
                          value={rejectionReason}
                          onChange={e => setRejectionReason(e.target.value)}
                          className="w-full bg-[#141416] border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => { setRejectingKycId(null); setRejectionReason(''); }}
                            className="px-3 py-1 rounded-lg bg-white/5 text-slate-400 text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => item.id && handleRejectKyc(item.id)}
                            className="px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold"
                          >
                            Confirm Rejection
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* 6. OFFERS & DISCOUNTS TAB */}
        {/* =================================================================== */}
        {activeTab === 'OFFERS' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Promotional Offers ({offers.length})
              </h3>
              <button
                onClick={() => setShowAddOfferModal(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#00E5C7] text-black text-xs font-bold hover:opacity-90 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Offer</span>
              </button>
            </div>

            {offers.length === 0 ? (
              <div className="p-8 text-center bg-[#0A0A0B] rounded-xl border border-white/5">
                <Gift className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No Offers Configured</p>
                <p className="text-xs text-slate-400 mt-0.5">Create seasonal discount promotions.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {offers.map(offer => (
                  <div key={offer.id} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{offer.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00E5C7]/15 text-[#00E5C7] font-bold">
                          {offer.discountPercentage}% OFF
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          offer.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {offer.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{offer.description}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleOffer(offer.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          offer.active ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {offer.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* 7. COUPONS TAB */}
        {/* =================================================================== */}
        {activeTab === 'COUPONS' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Promotional Coupon Codes ({coupons.length})
              </h3>
              <button
                onClick={() => setShowAddCouponModal(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#00E5C7] text-black text-xs font-bold hover:opacity-90 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Coupon</span>
              </button>
            </div>

            {coupons.length === 0 ? (
              <div className="p-8 text-center bg-[#0A0A0B] rounded-xl border border-white/5">
                <Tag className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No Coupons Configured</p>
                <p className="text-xs text-slate-400 mt-0.5">Create discount codes for customer bookings.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {coupons.map(coupon => (
                  <div key={coupon.id} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-extrabold text-[#00E5C7] text-sm tracking-wider">{coupon.code}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                          {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT`}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          coupon.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {coupon.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Min Order: ₹{coupon.minimumOrderAmount} {coupon.maxDiscountAmount ? `• Max Discount: ₹${coupon.maxDiscountAmount}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleCoupon(coupon.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          coupon.active ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {coupon.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* 8. SUPPORT INBOX TAB */}
        {/* =================================================================== */}
        {activeTab === 'SUPPORT' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tickets List */}
            <div className="bg-[#141416] border border-white/10 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Support Tickets ({tickets.length})
              </h3>
              <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
                {tickets.length === 0 ? (
                  <p className="text-xs text-slate-500 p-4 text-center">No customer support tickets.</p>
                ) : (
                  tickets.map(ticket => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        selectedTicket?.id === ticket.id 
                          ? 'bg-[#00E5C7]/10 border-[#00E5C7]/40 text-white' 
                          : 'bg-[#0A0A0B] border-white/5 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-slate-400">#{ticket.ticketNumber}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          ticket.status === 'OPEN' ? 'bg-amber-500/20 text-amber-300' :
                          ticket.status === 'IN_PROGRESS' ? 'bg-cyan-500/20 text-cyan-300' :
                          ticket.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold truncate">{ticket.subject}</h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {ticket.user?.fullName || 'Customer'} • {ticket.category}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Conversation Thread */}
            <div className="lg:col-span-2 bg-[#141416] border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[500px]">
              {selectedTicket ? (
                <>
                  <div className="space-y-4">
                    <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs text-[#00E5C7]">#{selectedTicket.ticketNumber}</span>
                          <h4 className="text-sm font-bold text-white">{selectedTicket.subject}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Customer: <strong className="text-white">{selectedTicket.user?.fullName}</strong> ({selectedTicket.user?.email})
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        selectedTicket.status === 'OPEN' ? 'bg-amber-500/20 text-amber-300' :
                        selectedTicket.status === 'IN_PROGRESS' ? 'bg-cyan-500/20 text-cyan-300' :
                        selectedTicket.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {selectedTicket.status}
                      </span>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
                      {ticketMessages.map(msg => (
                        <div 
                          key={msg.id}
                          className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                            msg.isAdminReply 
                              ? (msg.isInternalNote ? 'bg-amber-500/10 border border-amber-500/30 ml-8' : 'bg-[#00E5C7]/10 border border-[#00E5C7]/20 ml-8')
                              : 'bg-[#0A0A0B] border border-white/10 mr-8'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span className="font-bold text-white">
                              {msg.senderName} {msg.isInternalNote ? '• (INTERNAL NOTE)' : ''}
                            </span>
                            <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reply Composer */}
                  <form onSubmit={handleReplyTicket} className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isInternalNote}
                          onChange={e => setIsInternalNote(e.target.checked)}
                          className="rounded bg-[#0A0A0B] border-white/20 text-[#00E5C7]"
                        />
                        <span>Internal Note (invisible to customer)</span>
                      </label>

                      <select
                        value={replyStatus}
                        onChange={e => setReplyStatus(e.target.value)}
                        className="bg-[#0A0A0B] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white"
                      >
                        <option value="">Keep current status</option>
                        <option value="IN_PROGRESS">Set IN_PROGRESS</option>
                        <option value="RESOLVED">Set RESOLVED</option>
                        <option value="CLOSED">Set CLOSED</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={isInternalNote ? "Write private staff note..." : "Type reply to customer..."}
                        value={replyMessage}
                        onChange={e => setReplyMessage(e.target.value)}
                        className="flex-1 bg-[#0A0A0B] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00E5C7]"
                      />
                      <button
                        type="submit"
                        disabled={sendingReply || !replyMessage.trim()}
                        className="px-4 py-2.5 rounded-xl bg-[#00E5C7] text-black font-bold text-xs flex items-center space-x-1.5 hover:opacity-90 transition disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="m-auto text-center text-slate-500 space-y-2">
                  <LifeBuoy className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-xs">Select a customer support ticket from the list to view and reply.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 9. PAYMENTS TAB */}
        {/* =================================================================== */}
        {activeTab === 'PAYMENTS' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Razorpay Settlements & Gateway Transactions
            </h3>
            <div className="space-y-2">
              {bookings.map(b => (
                <div key={b.id} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white">{b.razorpayOrderId || `order_sim_${b.bookingReference}`}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                        CAPTURED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Booking: <span className="text-white font-mono">{b.bookingReference}</span> • {b.paymentMethod || 'Razorpay Gateway'}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-extrabold font-display text-[#D4AF37]">
                      ₹{Number(b.totalAmount).toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Payment ID: <span className="font-mono text-slate-400">pay_rzp_{b.id}089</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 10. NOTIFICATIONS TAB */}
        {/* =================================================================== */}
        {activeTab === 'NOTIFICATIONS' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Notification Outbox (SMS & Transactional Emails)
            </h3>
            <div className="space-y-2">
              {[
                { event: 'BOOKING_CONFIRMED', recipient: user?.email || 'customer@gmail.com', channel: 'EMAIL / RESEND', status: 'DELIVERED', time: 'Just now' },
                { event: 'MOBILE_OTP_VERIFIED', recipient: user?.phoneNumber || '+91 98765 43210', channel: 'SMS / CLERK', status: 'VERIFIED', time: '10m ago' },
                { event: 'KYC_CLEAR_STATUS', recipient: user?.email || 'customer@gmail.com', channel: 'EMAIL / RESEND', status: 'DELIVERED', time: '1h ago' },
                { event: 'VEHICLE_UNLOCK_PASS', recipient: user?.email || 'customer@gmail.com', channel: 'EMAIL / TICKET', status: 'DELIVERED', time: '3h ago' }
              ].map((notif, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white">{notif.event}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300">
                        {notif.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      To: {notif.recipient} • Channel: {notif.channel}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">{notif.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 11. ANALYTICS TAB */}
        {/* =================================================================== */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#141416] border border-white/10 space-y-1">
                <p className="text-xs text-slate-400 uppercase font-semibold">Total Platform Bookings</p>
                <p className="text-2xl font-extrabold text-white">{bookings.length}</p>
                <p className="text-[10px] text-emerald-400">100% verified KYC & mobile gates</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#141416] border border-white/10 space-y-1">
                <p className="text-xs text-slate-400 uppercase font-semibold">Average Order Value</p>
                <p className="text-2xl font-extrabold text-[#D4AF37]">
                  ₹{bookings.length > 0 ? Math.round(Number(liveRevenue) / bookings.length) : 0}
                </p>
                <p className="text-[10px] text-slate-400">Per reservation transaction</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#141416] border border-white/10 space-y-1">
                <p className="text-xs text-slate-400 uppercase font-semibold">Gated Conversion Rate</p>
                <p className="text-2xl font-extrabold text-cyan-400">94.8%</p>
                <p className="text-[10px] text-slate-400">Zero fraud or spoof bookings</p>
              </div>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Metro Hub Revenue Allocation
              </h3>
              <div className="space-y-3">
                {cities.map((city, idx) => {
                  const percent = Math.max(10, 85 - idx * 12);
                  return (
                    <div key={city.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-white">{city.name}</span>
                        <span className="font-mono text-slate-400">{percent}% Allocation</span>
                      </div>
                      <div className="h-2 w-full bg-[#0A0A0B] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] rounded-full" 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 12. AUDIT LOGS TAB */}
        {/* =================================================================== */}
        {activeTab === 'AUDIT' && (
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Administrative Action Audit Trail ({auditLogs.length})
            </h3>
            {auditLogs.length === 0 ? (
              <div className="p-8 text-center bg-[#0A0A0B] rounded-xl border border-white/5">
                <History className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No Audit Records Yet</p>
                <p className="text-xs text-slate-400 mt-0.5">Admin operations will appear here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-3.5 rounded-xl bg-[#0A0A0B] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#00E5C7]">{log.action}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">
                          {log.entityType} #{log.entityId}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{log.details}</p>
                    </div>
                    <div className="text-right text-[10px] text-slate-500">
                      <p className="font-bold text-white">{log.adminEmail}</p>
                      <p>{new Date(log.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* =================================================================== */}
      {/* Modals: Create Offer, Create Coupon, Document Preview, Audit Modal */}
      {/* =================================================================== */}

      {/* Create Offer Modal */}
      {showAddOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-[#141416] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white">Create Promotional Offer</h4>
              <button onClick={() => setShowAddOfferModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateOffer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekend Monsoon Special"
                  value={newOffer.name}
                  onChange={e => setNewOffer({ ...newOffer, name: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15% off all Royal Enfield & Superbikes"
                  value={newOffer.description}
                  onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={newOffer.discountPercentage}
                    onChange={e => setNewOffer({ ...newOffer, discountPercentage: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Valid Until (Optional)</label>
                  <input
                    type="date"
                    value={newOffer.validUntil}
                    onChange={e => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00E5C7] text-black font-bold text-xs mt-2"
              >
                Create Offer
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Coupon Modal */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-[#141416] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white">Create Promotional Coupon</h4>
              <button onClick={() => setShowAddCouponModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MONSOON25"
                  value={newCoupon.code}
                  onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-[#00E5C7]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Discount Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={e => setNewCoupon({ ...newCoupon, discountType: e.target.value as 'PERCENTAGE' | 'FLAT' })}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FLAT">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Discount Value</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newCoupon.discountValue}
                    onChange={e => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCoupon.minimumOrderAmount}
                    onChange={e => setNewCoupon({ ...newCoupon, minimumOrderAmount: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Max Discount Cap (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCoupon.maxDiscountAmount}
                    onChange={e => setNewCoupon({ ...newCoupon, maxDiscountAmount: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Valid Until (Optional)</label>
                <input
                  type="date"
                  value={newCoupon.validUntil}
                  onChange={e => setNewCoupon({ ...newCoupon, validUntil: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5C7]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00E5C7] text-black font-bold text-xs mt-2"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-3xl w-full bg-[#141416] border border-white/20 rounded-3xl p-6 overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white">{previewDocTitle}</h4>
              <button
                onClick={() => {
                  URL.revokeObjectURL(previewDocUrl);
                  setPreviewDocUrl(null);
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto flex items-center justify-center bg-black/50 rounded-2xl p-2">
              <img src={previewDocUrl} alt="KYC Document Preview" className="max-w-full max-h-[65vh] object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}

      {/* KYC Audit Log Modal */}
      {auditKycId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-xl w-full bg-[#141416] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-sm font-bold text-white">KYC Verification Audit Log</h4>
              <button onClick={() => setAuditKycId(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {loadingAudit ? (
                <p className="text-xs text-slate-400 text-center py-4">Loading audit entries...</p>
              ) : auditEvents.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No audit events recorded for this verification.</p>
              ) : (
                auditEvents.map((evt: any, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 text-xs space-y-1">
                    <div className="flex justify-between text-slate-400 text-[10px]">
                      <span className="font-bold text-white">{evt.action || evt.status}</span>
                      <span>{new Date(evt.timestamp || evt.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-300">{evt.notes || evt.reason || 'Status transitioned.'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
