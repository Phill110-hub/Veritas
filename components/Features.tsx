import React from 'react';
import { Zap, Globe, Lock, FileSearch, Code, Layers } from 'lucide-react';

const features = [
  {
    icon: <Globe size={24} />,
    title: "Global Index Search",
    description: "Real-time grounding against billions of indexed web pages to find exact matches and paraphrased content."
  },
  {
    icon: <Zap size={24} />,
    title: "High-Velocity Analysis",
    description: "Powered by Gemini 1.5 Flash for millisecond-latency processing without compromising depth."
  },
  {
    icon: <Lock size={24} />,
    title: "Zero-Retention Privacy",
    description: "Ephemeral processing architecture ensures your submitted text is never stored or used for training."
  },
  {
    icon: <FileSearch size={24} />,
    title: "Semantic Matching",
    description: "Beyond simple keyword matching—detects structural changes, synonym swapping, and AI-rewrites."
  },
  {
    icon: <Code size={24} />,
    title: "Syntax Verification",
    description: "Specialized algorithms for detecting similarities in code blocks, documentation, and technical schemas."
  },
  {
    icon: <Layers size={24} />,
    title: "Attribution Engine",
    description: "Automatically identifies potential source URLs and generates a citation-ready report."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-black border-t border-neutral-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Precision Engineered</h2>
            <p className="text-neutral-400 max-w-xl font-light leading-relaxed">
              Our detection algorithms are tuned for maximum accuracy with minimal false positives, providing you with data you can trust.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-8 bg-neutral-800 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative p-8 border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:bg-neutral-900/80 hover:border-neutral-700 transition-all duration-300 group rounded-sm overflow-hidden"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Decorative top right corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[linear-gradient(to_bottom_left,transparent_50%,rgba(255,255,255,0.05)_50%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-black border border-neutral-800 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:border-white/30 transition-all duration-300 rounded-sm shadow-lg shadow-black">
                  {feature.icon}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3 font-mono tracking-tight">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};