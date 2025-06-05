import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Zap, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex flex-col items-center justify-center min-h-screen px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            NEXSEED
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/70 max-w-3xl mx-auto mb-16 leading-relaxed">
            The ultimate CLI for launching production-ready Next.js applications in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20">
            <Link href="/signup">
              <Button className="w-full sm:w-auto bg-white text-black hover:bg-white hover:text-black px-10 py-4 text-lg font-medium rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-full sm:w-auto bg-white/5 text-white hover:bg-white/10 border border-white/20 px-10 py-4 text-lg font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-white/60 text-sm">
                Generate complete Next.js projects in seconds with our optimized CLI
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Production Ready</h3>
              <p className="text-white/60 text-sm">
                Pre-configured with best practices, TypeScript, and modern tooling
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure by Default</h3>
              <p className="text-white/60 text-sm">
                Built-in security features and authentication ready to deploy
              </p>
            </div>
          </div>
        </div>
        
        <footer className="absolute bottom-8 text-center w-full">
          <p className="text-sm text-white/40">
            Build faster. Build smarter. Build with Nexseed.
          </p>
        </footer>
      </main>
    </div>
  );
}