"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, ChevronDown } from "lucide-react";

export default function HomePage() {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <Link href="/" className="text-xl font-semibold">
          NEXSEED
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md">
              <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{user.name}</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-3 border-b border-white/10">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-white/60 mt-1">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-8 py-20 min-h-[calc(100vh-88px)]">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xl text-white/70 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Your Next.js development environment is ready. Build something amazing today.
          </p>
        </div>
      </main>
    </div>
  );
}