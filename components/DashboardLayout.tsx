import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload, Clock, FileCheck, Settings, LogOut, ShieldCheck } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens here
    navigate('/login');
  };

  const navItems = [
    { path: '/app/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/app/upload', icon: <Upload size={20} />, label: 'Upload & Analyze' },
    { path: '/app/recent', icon: <Clock size={20} />, label: 'Recent Files' },
    { path: '/app/completed', icon: <FileCheck size={20} />, label: 'Completed' },
  ];

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-neutral-950 border-r border-neutral-900 flex flex-col">
        
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-neutral-900">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-white text-black p-1 rounded-sm">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <span className="font-mono text-lg font-bold tracking-tighter">VERITAS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white hover:bg-neutral-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-neutral-900 space-y-1">
          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-500 hover:text-white hover:bg-neutral-900'
              }`
            }
          >
            <Settings size={20} />
            Settings
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-neutral-500 hover:text-red-400 hover:bg-red-950/10 transition-all duration-200"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
        
        {/* User Profile Stub */}
        <div className="p-4 bg-neutral-900/50 border-t border-neutral-900">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 border border-neutral-700">
                    JD
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">John Doe</p>
                    <p className="text-[10px] text-neutral-500 truncate">Premium Plan</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-black relative overflow-hidden min-h-screen">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-grid-white [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};