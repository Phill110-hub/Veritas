import React, { useState, useCallback } from 'react';
import { ArrowRight, Loader2, AlertCircle, CheckCircle, Search, FileText, ScanLine, Fingerprint, Activity } from 'lucide-react';
import { checkPlagiarism } from '../services/gemini';
import { AnalysisResult, AnalysisStatus } from '../types';

export const Hero: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback(async () => {
    if (!inputText.trim()) return;
    
    setStatus(AnalysisStatus.SCANNING);
    setError(null);
    setResult(null);

    try {
      const analysis = await checkPlagiarism(inputText);
      setResult(analysis);
      setStatus(AnalysisStatus.COMPLETE);
    } catch (err) {
      setError("An error occurred while scanning. Please try again.");
      setStatus(AnalysisStatus.ERROR);
    }
  }, [inputText]);

  // Circular Progress Component
  const CircularScore = ({ score }: { score: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    
    let color = '#ef4444'; // Red
    if (score >= 70) color = '#eab308'; // Yellow
    if (score >= 90) color = '#22c55e'; // Green

    return (
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#333"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-white">{score}%</span>
        </div>
        {/* Spinning decoration */}
        <div className="absolute inset-0 border border-dashed border-neutral-700 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </div>
    );
  };

  return (
    <section className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      
      {/* --- GRAPHICS LAYER --- */}
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-grid-white [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-20 pointer-events-none animate-grid-flow"></div>
      
      {/* Moving Spotlights */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neutral-800/30 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Floating Tech Elements */}
      <div className="absolute top-40 left-10 hidden lg:block opacity-30">
        <Fingerprint size={120} strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-40 right-10 hidden lg:block opacity-30 animate-pulse">
        <Activity size={120} strokeWidth={0.5} />
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Title Group */}
        <div className="text-center mb-12 space-y-6 relative">
          {/* Decorative crosshairs */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-neutral-700 to-transparent"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80 backdrop-blur text-xs font-mono text-neutral-400 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            SYSTEM ONLINE // GEMINI 2.5 FLASH
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white relative inline-block">
            Originality. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">Verified.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-neutral-400 leading-relaxed font-light">
            Deploying advanced heuristic analysis and <span className="text-white font-medium">Search Grounding</span> to validate content authenticity in real-time.
          </p>
        </div>

        {/* Interactive Input Section */}
        <div className="w-full max-w-4xl mx-auto relative group">
          
          {/* Decorative Corner Brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>

          <div className="bg-neutral-900/40 border border-neutral-800 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl shadow-black relative">
            
            {/* Scanner Beam Overlay */}
            {status === AnalysisStatus.SCANNING && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                 <div className="absolute w-full h-1 bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-scan"></div>
                 <div className="absolute w-full h-20 bg-gradient-to-b from-green-500/10 to-transparent animate-scan" style={{ top: '-20px' }}></div>
              </div>
            )}

            {/* Toolbar */}
            <div className="bg-black border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-700"></div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 tracking-widest flex items-center gap-2">
                <ScanLine size={12} />
                INPUT_STREAM.TXT
              </div>
            </div>

            {/* Text Area */}
            <div className="relative bg-black/50">
              <textarea
                className="w-full h-64 bg-transparent p-6 text-neutral-200 font-mono text-sm focus:outline-none resize-none placeholder-neutral-700 relative z-10"
                placeholder="// Paste content for analysis..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                spellCheck={false}
              />
              
              {/* Background Grid in Textarea */}
              <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none z-0"></div>
              
              {/* Action Bar */}
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={handleScan}
                  disabled={status === AnalysisStatus.SCANNING || inputText.length < 10}
                  className={`group relative flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs tracking-wider transition-all duration-300 overflow-hidden
                    ${inputText.length < 10 
                      ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800' 
                      : 'bg-white text-black hover:bg-neutral-200 border border-white shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                    }`}
                >
                  {status === AnalysisStatus.SCANNING ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      PROCESSING DATA...
                    </>
                  ) : (
                    <>
                      INITIATE SCAN
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {status === AnalysisStatus.COMPLETE && result && (
          <div className="mt-12 w-full max-w-4xl mx-auto animate-fade-in-up">
            
            {/* Result Header Graphic */}
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="h-px bg-neutral-800 flex-grow"></div>
                <div className="px-4 text-xs font-mono text-neutral-500">ANALYSIS COMPLETE</div>
                <div className="h-px bg-neutral-800 flex-grow"></div>
            </div>

            <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative background blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                
                {/* Score Card */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center">
                   <CircularScore score={result.score} />
                   <div className="mt-4 text-xs font-mono text-neutral-400 uppercase tracking-widest">Confidence Lvl</div>
                </div>

                {/* Analysis Content */}
                <div className="flex-grow space-y-6 w-full">
                  <div className="bg-black/40 border border-neutral-800/50 p-6 rounded-sm">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                      <FileText size={16} className="text-neutral-400" /> Executive Summary
                    </h3>
                    <div className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                      {result.text}
                    </div>
                  </div>

                  {/* Sources Found */}
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                      <Search size={14} /> Detected Sources ({result.sources.length})
                    </h4>
                    
                    {result.sources.length > 0 ? (
                      <div className="grid gap-3">
                        {result.sources.map((source, idx) => (
                          <a 
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-black border border-neutral-800 rounded-sm hover:border-neutral-600 transition-all group relative overflow-hidden"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-700 group-hover:bg-white transition-colors"></div>
                            
                            <div className="flex items-center gap-4 overflow-hidden">
                                <div className="w-6 h-6 rounded-sm bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] font-mono text-neutral-400 group-hover:text-white group-hover:border-neutral-600">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="truncate">
                                    <div className="text-sm text-white font-medium truncate max-w-[200px] md:max-w-[400px]">{source.title}</div>
                                    <div className="text-[10px] text-neutral-500 font-mono truncate opacity-60">{source.uri}</div>
                                </div>
                            </div>
                            <ArrowRight size={14} className="text-neutral-600 group-hover:text-white -rotate-45 transition-transform duration-300" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-green-950/10 border border-green-900/30 rounded-sm text-green-400 text-sm flex items-center gap-3">
                        <CheckCircle size={18} />
                        No external matches found in the database. Content appears original.
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {status === AnalysisStatus.ERROR && (
          <div className="mt-8 w-full max-w-4xl mx-auto">
            <div className="bg-red-950/20 border border-red-900/50 text-red-300 p-4 rounded-sm flex items-center gap-3 font-mono text-sm">
              <AlertCircle size={18} />
              ERROR: {error}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};