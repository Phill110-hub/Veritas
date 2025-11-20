import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-900 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-white text-black p-1.5 rounded-sm group-hover:bg-neutral-200 transition-colors">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
          <span className="font-mono text-xl font-bold tracking-tighter">VERITAS</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Log in
          </button>
          <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-sm hover:bg-neutral-200 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};