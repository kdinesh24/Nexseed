'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  image?: string;
  provider?: 'credentials' | 'google';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [customUser, setCustomUser] = useState<User | null>(null);
  const [customLoading, setCustomLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Combine both authentication states
  const isAuthenticated = status === "authenticated" || !!customUser;
  const loading = status === "loading" || customLoading;

  // Prioritize NextAuth user over custom user
  const user: User | null = session?.user ? {
    id: session.user.email || '',
    name: session.user.name || '',
    email: session.user.email || '',
    image: session.user.image || undefined,
    provider: 'google'
  } : customUser;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setCustomLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCustomUser({
          ...data.user,
          provider: 'credentials'
        });
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('auth_token');
        setCustomUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('auth_token');
      setCustomUser(null);
    } finally {
      setCustomLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setCustomUser({
          ...data.user,
          provider: 'credentials'
        });
        toast.success('Welcome back! Login successful.');
        return true;
      } else {
        toast.error(data.error || 'Login failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please check your connection and try again.');
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        setCustomUser({
          ...data.user,
          provider: 'credentials'
        });
        toast.success('Account created successfully! Welcome aboard.');
        return true;
      } else {
        toast.error(data.error || 'Signup failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Network error. Please check your connection and try again.');
      return false;
    }
  };

  const logout = async () => {
    // Sign out from both systems
    if (session) {
      await signOut({ redirect: false });
    }
    
    // Clear custom auth
    localStorage.removeItem('auth_token');
    setCustomUser(null);
    
    toast.success('Logged out successfully. See you soon!');
    router.push('/');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}