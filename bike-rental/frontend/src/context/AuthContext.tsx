import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/clerk-react';
import { User } from '../types';
import { api, API_BASE } from '../services/api';
import { syncClerkUserWithBackend } from '../services/clerkAuth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  signupWithEmail: (name: string, email: string, phone: string, pass: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<{ message: string; devOtp?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  sendEmailOtp: (email: string) => Promise<{ message: string; devOtp?: string }>;
  verifyEmailOtp: (email: string, otp: string, fullName?: string) => Promise<boolean>;
  verifyLicense: (licenseNo: string, docUrl?: string) => Promise<boolean>;
  loginWithClerkToken: (token: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (fields: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('tbh_user');
    return saved ? JSON.parse(saved) : null;
  });

  const refreshTokenRef = useRef<string | null>(sessionStorage.getItem('tbh_refresh_token'));

  // Real Clerk React Authentication Integration
  const { isSignedIn, userId, getToken, signOut: clerkSignOut } = useClerkAuth();
  const { user: clerkUser } = useClerkUser();

  // Persist user in session storage
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('tbh_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('tbh_user');
    }
  }, [user]);

  // Synchronize Clerk session with TBH backend
  useEffect(() => {
    let isMounted = true;

    const syncWithBackend = async () => {
      if (isSignedIn && userId) {
        try {
          const token = await getToken();
          if (token && isMounted) {
            const syncedUser = await syncClerkUserWithBackend(token);
            if (syncedUser && isMounted) {
              if (clerkUser) {
                const displayName = clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();
                if (displayName) syncedUser.fullName = displayName;
                const email = clerkUser.primaryEmailAddress?.emailAddress;
                if (email) syncedUser.email = email;
                const phone = clerkUser.primaryPhoneNumber?.phoneNumber;
                if (phone) syncedUser.phoneNumber = phone;
              }
              setUser(syncedUser);
            }
          }
        } catch (err) {
          console.error('[CLERK AUTH] Failed to sync session with TBH backend:', err);
        }
      } else if (!isSignedIn && user?.token && user.token.startsWith('eyJ')) {
        const currentToken = sessionStorage.getItem('tbh_token');
        if (currentToken && currentToken === user.token) {
          sessionStorage.removeItem('tbh_token');
          sessionStorage.removeItem('tbh_user');
          localStorage.removeItem('tbh_token');
          if (isMounted) setUser(null);
        }
      }
    };

    syncWithBackend();

    return () => {
      isMounted = false;
    };
  }, [isSignedIn, userId, clerkUser]);

  // Handle successful auth tokens
  const handleAuthSuccess = (data: any) => {
    if (data.token) {
      sessionStorage.setItem('tbh_token', data.token);
    }
    if (data.refreshToken) {
      refreshTokenRef.current = data.refreshToken;
      sessionStorage.setItem('tbh_refresh_token', data.refreshToken);
    }
    setUser({
      id: data.userId || data.id,
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      drivingLicenseVerified: data.drivingLicenseVerified,
      drivingLicenseNumber: data.drivingLicenseNumber,
      token: data.token
    });
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      if (res.ok) {
        const data = await res.json();
        handleAuthSuccess(data);
        return true;
      }
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Invalid email or password');
    } catch (e: any) {
      throw e;
    }
  };

  const signupWithEmail = async (fullName: string, email: string, phoneNumber: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phoneNumber, password: pass })
      });
      if (res.ok) {
        const data = await res.json();
        handleAuthSuccess(data);
        return true;
      }
      const err = await res.json().catch(() => ({}));
      const msg = err.message || (res.status === 409 ? 'An account with this email or mobile number already exists.' : 'Unable to register. Please check your information.');
      throw new Error(msg);
    } catch (e: any) {
      throw new Error(e.message || 'Registration failed. Please check network connection.');
    }
  };

  const sendOtp = async (phone: string): Promise<{ message: string; devOtp?: string }> => {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: phone })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to dispatch OTP');
    }
    const data = await res.json();
    return {
      message: data.message || 'OTP dispatched to registered mobile',
      devOtp: data.devOtp
    };
  };

  const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: phone, otp })
    });
    if (res.ok) {
      const data = await res.json();
      handleAuthSuccess(data);
      return true;
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid or expired OTP');
  };

  const sendEmailOtp = async (emailAddr: string): Promise<{ message: string; devOtp?: string }> => {
    const res = await fetch(`${API_BASE}/auth/send-email-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailAddr })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to dispatch email OTP');
    }
    const data = await res.json();
    return {
      message: data.message || 'Verification OTP sent to your email',
      devOtp: data.devOtp
    };
  };

  const verifyEmailOtp = async (emailAddr: string, otp: string, fullName?: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/auth/verify-email-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailAddr, otp, fullName })
    });
    if (res.ok) {
      const data = await res.json();
      handleAuthSuccess(data);
      return true;
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid or expired email OTP');
  };

  const verifyLicense = async (licenseNo: string, docUrl?: string): Promise<boolean> => {
    if (!user) throw new Error('Authentication required to verify driving licence.');
    const token = user?.token || sessionStorage.getItem('tbh_token') || localStorage.getItem('tbh_token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(`${API_BASE}/auth/verify-license`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId: user.id, licenseNumber: licenseNo, docUrl })
    });
    if (res.ok) {
      const data = await res.json();
      handleAuthSuccess(data);
      return true;
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Driving licence verification failed on server.');
  };

  const loginWithClerkToken = async (clerkToken: string): Promise<boolean> => {
    try {
      const syncedUser = await syncClerkUserWithBackend(clerkToken);
      if (syncedUser) {
        setUser(syncedUser);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    const rt = refreshTokenRef.current || sessionStorage.getItem('tbh_refresh_token');
    if (rt) {
      api.logout(rt).catch(() => {});
    }
    refreshTokenRef.current = null;
    sessionStorage.removeItem('tbh_token');
    sessionStorage.removeItem('tbh_refresh_token');
    sessionStorage.removeItem('tbh_user');
    localStorage.removeItem('tbh_token');
    setUser(null);
    try {
      await clerkSignOut();
    } catch (err) {
      console.warn('[AUTH] Clerk signOut notice:', err);
    }
  };

  const updateUser = (fields: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...fields };
      sessionStorage.setItem('tbh_user', JSON.stringify(updated));
      return updated;
    });
  };

  const refreshUser = async () => {
    if (isSignedIn && userId) {
      try {
        const token = await getToken();
        if (token) {
          const synced = await syncClerkUserWithBackend(token);
          if (synced) setUser(synced);
        }
      } catch (err) {
        console.warn('[AUTH] Error refreshing user:', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loginWithEmail,
      signupWithEmail,
      sendOtp,
      verifyOtp,
      sendEmailOtp,
      verifyEmailOtp,
      verifyLicense,
      loginWithClerkToken,
      logout,
      updateUser,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
