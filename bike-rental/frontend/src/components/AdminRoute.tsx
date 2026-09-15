import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
  onRedirectToHome: () => void;
  onOpenAuth: () => void;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  onRedirectToHome,
  onOpenAuth
}) => {
  const { user, isAuthenticated } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check authentication and authorization status
    const timer = setTimeout(() => {
      setChecking(false);
      if (!isAuthenticated) {
        onOpenAuth();
      } else if (user?.role !== 'ROLE_ADMIN') {
        onRedirectToHome();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, onRedirectToHome, onOpenAuth]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <div className="flex items-center space-x-3 text-sm text-slate-400">
          <div className="w-5 h-5 rounded-full border-2 border-[#00E5C7] border-t-transparent animate-spin" />
          <span>Verifying administrator credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141416] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-white mb-2">Authentication Required</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Please sign in with an authorized TBH Operations account (<code className="text-[#00E5C7] font-mono text-[11px]">ROLE_ADMIN</code>) to access the central administration console.
          </p>
          <div className="space-y-3">
            <button
              onClick={onOpenAuth}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5C7] to-[#00B4D8] text-black font-extrabold text-xs shadow-teal-glow hover:opacity-95 transition"
            >
              Sign In
            </button>
            <button
              onClick={onRedirectToHome}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Return to Public Fleet
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role !== 'ROLE_ADMIN') {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141416] border border-rose-500/20 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-5 text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-white mb-2">Access Denied</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Your authenticated account (<strong className="text-white">{user?.email}</strong>) does not have administrator privileges. Only verified <code className="text-rose-300 font-mono text-[11px]">ROLE_ADMIN</code> accounts can view this page.
          </p>
          <button
            onClick={onRedirectToHome}
            className="w-full py-2.5 rounded-xl bg-[#00E5C7] text-black text-xs font-bold shadow-teal-glow hover:opacity-95 transition"
          >
            Return to Fleet Catalog
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
