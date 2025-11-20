import React from 'react';
import { FileText, Clock, Loader2, CheckCircle, ArrowUpRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Overview: React.FC = () => {
  const stats = [
    { label: 'Total Analyzed', value: '1,284', icon: <FileText size={20} />, color: 'text-white', sub: '+12% from last week' },
    { label: 'Processing', value: '3', icon: <Loader2 size={20} className="animate-spin" />, color: 'text-blue-400', sub: 'Currently active' },
    { label: 'Pending', value: '12', icon: <Clock size={20} />, color: 'text-yellow-400', sub: 'In queue' },
    { label: 'Completed', value: '1,269', icon: <CheckCircle size={20} />, color: 'text-green-400', sub: '98.8% Success rate' },
  ];

  const recentFiles = [
    { name: 'Q3_Financial_Report.pdf', date: '2 mins ago', status: 'Processing', score: '-' },
    { name: 'Thesis_Final_Draft_v2.docx', date: '1 hour ago', status: 'Completed', score: '98%' },
    { name: 'Blog_Post_AI_Ethics.txt', date: '3 hours ago', status: 'Completed', score: '85%' },
    { name: 'Marketing_Copy_Q4.docx', date: 'Yesterday', status: 'Completed', score: '100%' },
    { name: 'Competitor_Analysis.pdf', date: 'Yesterday', status: 'Completed', score: '92%' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Dashboard Overview</h1>
        <p className="text-neutral-500 text-sm">Welcome back, Agent. System status is normal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-neutral-950 border border-neutral-800 p-6 rounded-sm group hover:border-neutral-700 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-md bg-neutral-900 ${stat.color}`}>
                {stat.icon}
              </div>
              <Activity size={16} className="text-neutral-700 group-hover:text-neutral-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-mono font-bold text-white">{stat.value}</h3>
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-900">
              <p className="text-[10px] text-neutral-500">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} /> Recent Activity
            </h2>
            <Link to="/app/recent" className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 transition-colors">
              View All <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-900/50 text-neutral-500 font-mono text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">File Name</th>
                  <th className="px-6 py-3 font-medium">Timestamp</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Originality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {recentFiles.map((file, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <FileText size={16} className="text-neutral-500" />
                      {file.name}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-mono text-xs">{file.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide
                        ${file.status === 'Completed' ? 'bg-green-950/30 text-green-500 border border-green-900/30' : 
                          file.status === 'Processing' ? 'bg-blue-950/30 text-blue-500 border border-blue-900/30' : 
                          'bg-neutral-800 text-neutral-400'}`}>
                        {file.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-white">{file.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / System Status */}
        <div className="space-y-6">
            <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-sm">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Actions</h3>
                <div className="space-y-3">
                    <Link to="/app/upload" className="flex items-center justify-between p-3 bg-neutral-900 rounded-sm border border-neutral-800 hover:border-white/50 transition-all group">
                        <span className="text-sm text-neutral-300 group-hover:text-white">New Analysis</span>
                        <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-white" />
                    </Link>
                    <button className="w-full flex items-center justify-between p-3 bg-neutral-900 rounded-sm border border-neutral-800 hover:border-white/50 transition-all group">
                        <span className="text-sm text-neutral-300 group-hover:text-white">Generate Report</span>
                        <FileText size={14} className="text-neutral-600 group-hover:text-white" />
                    </button>
                </div>
            </div>

             <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-sm">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">System Health</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-500">API Latency</span>
                            <span className="text-green-500">42ms</span>
                        </div>
                        <div className="h-1 bg-neutral-900 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[15%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-500">Daily Quota</span>
                            <span className="text-neutral-300">85%</span>
                        </div>
                        <div className="h-1 bg-neutral-900 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[85%]"></div>
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-neutral-500">Index Status</span>
                            <span className="text-green-500">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};