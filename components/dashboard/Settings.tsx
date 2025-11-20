
import React from 'react';
import { Save, User, Lock, Bell, Globe, Server, CheckCircle } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-neutral-500 text-sm">Manage account preferences and system configurations.</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Section */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-6">
           <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
             <User size={16} /> Profile Information
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs text-neutral-500 uppercase">Display Name</label>
                 <input type="text" defaultValue="John Doe" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-2 text-white text-sm focus:border-white focus:outline-none" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs text-neutral-500 uppercase">Email Address</label>
                 <input type="email" defaultValue="john.doe@veritas.ai" className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-2 text-white text-sm focus:border-white focus:outline-none" />
              </div>
           </div>
        </div>

        {/* API Integrations */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-6">
           <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
             <Server size={16} /> Integrations
           </h2>
           <div className="space-y-4">
              <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm flex items-start justify-between">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">PlagiarismSearch.com</h3>
                        <span className="px-1.5 py-0.5 bg-green-900/30 text-green-500 text-[10px] border border-green-900/50 rounded uppercase">Active</span>
                    </div>
                    <p className="text-xs text-neutral-500 font-mono">Token: ir6oUGE...76N-248869748</p>
                 </div>
                 <CheckCircle size={18} className="text-green-500" />
              </div>
              
              <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm flex items-start justify-between opacity-50">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">Turnitin API</h3>
                        <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-500 text-[10px] rounded uppercase">Inactive</span>
                    </div>
                    <p className="text-xs text-neutral-500">Enterprise license required</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Preferences */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-6">
           <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
             <Globe size={16} /> System Preferences
           </h2>
           <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                 <div>
                    <p className="text-sm text-white font-medium">Dark Mode</p>
                    <p className="text-xs text-neutral-500">System interface theme</p>
                 </div>
                 <div className="w-10 h-5 bg-white rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                 </div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                 <div>
                    <p className="text-sm text-white font-medium">Auto-Analysis</p>
                    <p className="text-xs text-neutral-500">Automatically scan uploaded files</p>
                 </div>
                 <div className="w-10 h-5 bg-neutral-800 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-neutral-500 rounded-full"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
           <button className="px-6 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">Cancel</button>
           <button className="px-6 py-2 bg-white text-black text-sm font-bold rounded-sm hover:bg-neutral-200 flex items-center gap-2">
              <Save size={14} /> Save Changes
           </button>
        </div>

      </div>
    </div>
  );
};
