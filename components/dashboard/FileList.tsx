import React from 'react';
import { FileText, MoreVertical, Download, Trash2, Eye } from 'lucide-react';

interface FileListProps {
  title: string;
  filter?: 'ALL' | 'COMPLETED' | 'RECENT';
}

// Mock Data generator
const generateFiles = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    name: `Document_${1000 + i}_${['Analysis', 'Brief', 'Report', 'Draft'][i % 4]}.pdf`,
    size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    uploaded: `${Math.floor(Math.random() * 24)} hours ago`,
    status: i % 5 === 0 ? 'Processing' : 'Completed',
    originality: i % 5 === 0 ? '-' : `${Math.floor(Math.random() * 30 + 70)}%`
  }));
};

export const FileList: React.FC<FileListProps> = ({ title }) => {
  const files = generateFiles(12);

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
          <p className="text-neutral-500 text-sm">Manage and review your analyzed documents.</p>
        </div>
        <div className="flex gap-2">
           <input 
             type="text" 
             placeholder="Search files..." 
             className="bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-600 placeholder-neutral-600 font-mono"
           />
        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900/50 text-neutral-500 font-mono text-xs uppercase border-b border-neutral-900">
            <tr>
              <th className="px-6 py-4 font-medium">File Name</th>
              <th className="px-6 py-4 font-medium">Size</th>
              <th className="px-6 py-4 font-medium">Uploaded</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Score</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {files.map((file) => (
              <tr key={file.id} className="group hover:bg-neutral-900/30 transition-colors">
                <td className="px-6 py-4">
                   <div className="flex items-center gap-3 text-white font-medium">
                      <div className="p-2 bg-neutral-900 rounded-sm text-neutral-400 group-hover:text-white transition-colors">
                        <FileText size={16} />
                      </div>
                      {file.name}
                   </div>
                </td>
                <td className="px-6 py-4 text-neutral-500 font-mono text-xs">{file.size}</td>
                <td className="px-6 py-4 text-neutral-500">{file.uploaded}</td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide
                    ${file.status === 'Completed' ? 'bg-green-950/30 text-green-500 border border-green-900/30' : 
                      'bg-blue-950/30 text-blue-500 border border-blue-900/30'}`}>
                    {file.status}
                    </span>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-white">{file.originality}</td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white" title="View Report">
                         <Eye size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white" title="Download">
                         <Download size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-red-400" title="Delete">
                         <Trash2 size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-neutral-900 bg-neutral-900/20 flex justify-center">
           <button className="text-xs text-neutral-500 hover:text-white font-mono uppercase tracking-wider">Load More Results</button>
        </div>
      </div>
    </div>
  );
};