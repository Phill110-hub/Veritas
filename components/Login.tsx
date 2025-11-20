
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Key, Mail, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network authentication check
    setTimeout(() => {
      if (email === 'user@veritas.ai' && password === 'admin') {
        setLoading(false);
        navigate('/app/dashboard');
      } else {
        setLoading(false);
        setError('Invalid credentials. Access denied.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-20 pointer-events-none animate-grid-flow"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md p-6 relative z-10">
        <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-sm shadow-2xl backdrop-blur-md">
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group cursor-pointer">
               <div className="bg-white text-black p-1.5 rounded-sm group-hover:bg-neutral-200 transition-colors">
                 <ShieldCheck size={20} strokeWidth={2.5} />
               </div>
               <span className="font-mono text-lg font-bold tracking-tighter text-white">VERITAS</span>
            </Link>
            <h2 className="text-2xl font-bold text-white mb-2">System Access</h2>
            <p className="text-neutral-500 text-sm">Enter credentials to access the analysis engine.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-950/30 border border-red-900/50 rounded-sm flex items-center gap-3 text-red-400 text-sm animate-fade-in-up">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Email Identification</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:bg-neutral-900 transition-all font-mono"
                  placeholder="user@veritas.ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-white transition-colors">
                  <Key size={16} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white focus:bg-neutral-900 transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500">
              <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-300">
                <input type="checkbox" className="rounded border-neutral-800 bg-neutral-900" />
                <span>Remember terminal</span>
              </label>
              <a href="#" className="hover:text-white transition-colors">Reset Key?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'AUTHENTICATING...' : 'ESTABLISH UPLINK'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-neutral-500">
            No credentials found? <Link to="/signup" className="text-white font-bold hover:underline">Initialize new identity</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
