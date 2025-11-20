import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Key, Mail, User, Fingerprint } from 'lucide-react';

export const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      navigate('/app/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-20 pointer-events-none animate-grid-flow"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md p-6 relative z-10">
        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-sm shadow-2xl backdrop-blur-md">
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group cursor-pointer">
               <div className="bg-white text-black p-1.5 rounded-sm group-hover:bg-neutral-200 transition-colors">
                 <ShieldCheck size={20} strokeWidth={2.5} />
               </div>
               <span className="font-mono text-lg font-bold tracking-tighter text-white">VERITAS</span>
            </Link>
            <h2 className="text-2xl font-bold text-white mb-2">Identity Protocol</h2>
            <p className="text-neutral-500 text-sm">Create a secure profile to begin scanning.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Full Designation</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-white transition-colors">
                  <User size={16} />
                </div>
                <input 
                  type="text" 
                  required
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:bg-neutral-900 transition-all font-mono"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Contact Vector (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:bg-neutral-900 transition-all font-mono"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Private Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-white transition-colors">
                  <Key size={16} />
                </div>
                <input 
                  type="password" 
                  required
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:bg-neutral-900 transition-all font-mono"
                  placeholder="Minimum 8 characters"
                />
              </div>
            </div>
            
            <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-sm flex items-start gap-3">
                <Fingerprint size={16} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-neutral-500 leading-relaxed">
                    By initializing, you agree to the <a href="#" className="text-white underline">Terms of Service</a> and <a href="#" className="text-white underline">Privacy Protocol</a>. Data is processed with zero-retention policy.
                </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'REGISTERING...' : 'INITIALIZE IDENTITY'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-neutral-500">
            Already authorized? <Link to="/login" className="text-white font-bold hover:underline">Access System</Link>
          </div>
        </div>
      </div>
    </div>
  );
};