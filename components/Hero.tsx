
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowRight, Loader2, AlertCircle, CheckCircle, Search, FileText, ScanLine, Fingerprint, Activity, Globe, ExternalLink, ShieldAlert, ShieldCheck, GitCompare, Globe2 } from 'lucide-react';
import { checkPlagiarism } from '../services/gemini';
import { checkSimilarity } from '../services/dandelion';
import { AnalysisResult, AnalysisStatus } from '../types';

export const Hero: React.FC = () => {
  const [mode, setMode] = useState<'WEB' | 'COMPARE'>('WEB');
  const [inputText, setInputText] = useState('');
  const [compareText, setCompareText] = useState('');
  
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Loading State Logic
  const [logs, setLogs] = useState<string[]>([]);
  const logIntervalRef = useRef<number | null>(null);

  const handleScan = useCallback(async () => {
    if (!inputText.trim()) return;
    if (mode === 'COMPARE' && !compareText.trim()) return;
    
    setStatus(AnalysisStatus.SCANNING);
    setError(null);
    setResult(null);
    setLogs(["INITIALIZING_SYSTEM..."]);

    try {
      if (mode === 'WEB') {
        // Gemini Logic
        const analysis = await checkPlagiarism(inputText);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Visual delay
        setResult(analysis);
      } else {
        // Dandelion Logic
        const similarityScore = await checkSimilarity(inputText, compareText);
        
        // Artificially create a result object for the UI
        setResult({
          type: 'COMPARE',
          text: `Analysis complete. The calculated semantic similarity between the two provided texts is ${similarityScore}%.`,
          score: mode === 'COMPARE' ? 100 - similarityScore : similarityScore, // For display: High similarity = Low Originality
          sources: []
        });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Visual delay
      }
      
      setStatus(AnalysisStatus.COMPLETE);
    } catch (err: any) {
      setError(err.message || "An error occurred while scanning. Please try again.");
      setStatus(AnalysisStatus.ERROR);
    }
  }, [inputText, compareText, mode]);

  // Effect for Matrix/Terminal Logs
  useEffect(() => {
    if (status === AnalysisStatus.SCANNING) {
      const webMessages = [
        "PARSING_INPUT_VECTORS...",
        "CONNECTING_TO_GLOBAL_INDEX...",
        "SEARCHING_4.2B_SOURCES...",
        "DETECTING_SEMANTIC_MATCHES...",
        "ANALYZING_SYNTAX_PATTERNS...",
        "VERIFYING_TIMESTAMPS...",
        "CALCULATING_ORIGINALITY_SCORE...",
        "COMPILING_FINAL_REPORT..."
      ];

      const compareMessages = [
        "LOADING_DANDELION_ENGINE...",
        "TOKENIZING_TEXT_A...",
        "TOKENIZING_TEXT_B...",
        "COMPUTING_COSINE_SIMILARITY...",
        "ANALYZING_SEMANTIC_OVERLAP...",
        "NORMALIZING_VECTORS...",
        "GENERATING_SIMILARITY_INDEX...",
        "FINALIZING_METRICS..."
      ];

      const messages = mode === 'WEB' ? webMessages : compareMessages;
      let i = 0;

      logIntervalRef.current = window.setInterval(() => {
        if (i < messages.length) {
          setLogs(prev => [...prev, messages[i]]);
          i++;
        }
      }, 600);

      return () => {
        if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      };
    } else {
      setLogs([]);
    }
  }, [status, mode]);

  // Circular Progress Component
  const CircularScore = ({ score, label }: { score: number, label?: string }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    
    let color = '#ef4444'; // Red
    if (score >= 70) color = '#eab308'; // Yellow
    if (score >= 90) color = '#22c55e'; // Green

    // For Comparison mode, high score (high similarity) is usually "bad" if looking for plagiarism,
    // but "good" if checking for matching. The UI treats 'score' as Originality by default in main logic.
    // However, if mode is COMPARE, we pass (100 - similarity) as score to this component to keep Green = Unique.
    
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
          {label && <span className="text-[10px] font-mono text-neutral-500 uppercase mt-1">{label}</span>}
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

      {/* Floating Tech Elements - Hidden on smaller screens to prevent overlap */}
      <div className="absolute top-40 left-20 hidden xl:block opacity-10 pointer-events-none">
        <Fingerprint size={180} strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-40 right-20 hidden xl:block opacity-10 pointer-events-none animate-pulse">
        <Activity size={180} strokeWidth={0.5} />
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Title Group */}
        <div className="text-center mb-12 space-y-6 relative">
          {/* Decorative crosshairs */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-neutral-700 to-transparent"></div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white relative inline-block">
            Originality. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">Verified.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-neutral-400 leading-relaxed font-light">
            Deploying advanced heuristic analysis and <span className="text-white font-medium">Search Grounding</span> to validate content authenticity in real-time.
          </p>
        </div>

        {/* Interactive Input Section */}
        <div className="w-full max-w-5xl mx-auto relative group">
          
          {/* Mode Toggle */}
          <div className="flex justify-center mb-4">
             <div className="bg-neutral-900 p-1 rounded-sm border border-neutral-800 inline-flex gap-1">
                <button 
                  onClick={() => { setMode('WEB'); setResult(null); setError(null); }}
                  className={`px-4 py-2 rounded-sm text-xs font-bold tracking-wider flex items-center gap-2 transition-all ${mode === 'WEB' ? 'bg-white text-black shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                   <Globe2 size={14} />
                   WEB SCAN
                </button>
                <button 
                  onClick={() => { setMode('COMPARE'); setResult(null); setError(null); }}
                  className={`px-4 py-2 rounded-sm text-xs font-bold tracking-wider flex items-center gap-2 transition-all ${mode === 'COMPARE' ? 'bg-white text-black shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                   <GitCompare size={14} />
                   COMPARE
                </button>
             </div>
          </div>
          
          {/* Decorative Corner Brackets */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neutral-600 group-hover:border-white transition-colors duration-500"></div>

          <div className="bg-neutral-900/40 border border-neutral-800 backdrop-blur-md rounded-sm overflow-hidden shadow-2xl shadow-black relative">
            
            {/* Scanner Beam & Terminal Overlay */}
            {status === AnalysisStatus.SCANNING && (
              <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 cursor-wait">
                 <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                     <div className="w-full h-1 bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-scan"></div>
                 </div>
                 
                 {/* Terminal Logs */}
                 <div className="w-full max-w-md font-mono text-xs md:text-sm space-y-2">
                    {logs.map((log, index) => (
                      <div key={index} className="flex items-center gap-3 text-green-500 animate-fade-in-left">
                         <span className="opacity-50">{`>`}</span>
                         <span className="tracking-widest">{log}</span>
                         {index === logs.length - 1 && <span className="w-2 h-4 bg-green-500 animate-pulse"></span>}
                      </div>
                    ))}
                 </div>
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
                {mode === 'WEB' ? 'INPUT_STREAM.TXT' : 'DUAL_STREAM_COMPARISON'}
              </div>
            </div>

            {/* Text Area Layout */}
            <div className="relative bg-black/50 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-800">
              
              {/* Primary Input */}
              <div className={`relative flex-1 ${mode === 'COMPARE' ? 'h-64 md:h-80' : 'h-64'}`}>
                 <textarea
                    className="w-full h-full bg-transparent p-6 text-neutral-200 font-mono text-sm focus:outline-none resize-none placeholder-neutral-700 relative z-10"
                    placeholder={mode === 'WEB' ? "// Paste content for analysis..." : "// Input Text A (Reference)"}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    spellCheck={false}
                  />
                  <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none z-0"></div>
              </div>

              {/* Secondary Input (Only for Compare Mode) */}
              {mode === 'COMPARE' && (
                <div className="relative flex-1 h-64 md:h-80 bg-black/30">
                   <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800/50 md:hidden"></div>
                   <textarea
                      className="w-full h-full bg-transparent p-6 text-neutral-200 font-mono text-sm focus:outline-none resize-none placeholder-neutral-700 relative z-10"
                      placeholder="// Input Text B (Comparison)"
                      value={compareText}
                      onChange={(e) => setCompareText(e.target.value)}
                      spellCheck={false}
                    />
                    <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none z-0"></div>
                </div>
              )}
              
              {/* Action Bar */}
              <div className="absolute bottom-4 right-4 z-20">
                <button
                  onClick={handleScan}
                  disabled={status === AnalysisStatus.SCANNING || !inputText.trim() || (mode === 'COMPARE' && !compareText.trim())}
                  className={`group relative flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-xs tracking-wider transition-all duration-300 overflow-hidden
                    ${(status === AnalysisStatus.SCANNING || !inputText.trim() || (mode === 'COMPARE' && !compareText.trim()))
                      ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800' 
                      : 'bg-white text-black hover:bg-neutral-200 border border-white shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                    }`}
                >
                  {status === AnalysisStatus.SCANNING ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      PROCESSING
                    </>
                  ) : (
                    <>
                      {mode === 'WEB' ? 'INITIATE SCAN' : 'COMPARE TEXTS'}
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
          <div className="mt-12 w-full max-w-4xl mx-auto animate-fade-in-up pb-20">
            
            {/* Result Header Graphic */}
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="h-px bg-neutral-800 flex-grow"></div>
                <div className="px-4 text-xs font-mono text-neutral-500 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${result.score > 80 ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  REPORT GENERATED
                </div>
                <div className="h-px bg-neutral-800 flex-grow"></div>
            </div>

            <div className={`rounded-lg p-1 bg-gradient-to-b ${result.score > 80 ? 'from-green-500/20 to-transparent' : 'from-red-500/20 to-transparent'}`}>
              <div className="bg-black border border-neutral-800 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden">
                
                {/* Decorative background blob based on score */}
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-10 ${result.score > 80 ? 'bg-green-500' : 'bg-red-500'}`}></div>

                <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                  
                  {/* Score Card */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-full md:w-auto p-4 md:p-0 border-b md:border-b-0 md:border-r border-neutral-800 md:pr-10">
                    <CircularScore 
                        score={result.type === 'COMPARE' ? 100 - result.score : result.score} 
                        label={result.type === 'COMPARE' ? 'SIMILARITY' : 'ORIGINALITY'} 
                    />
                    <div className="mt-6 text-center">
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">Verdict</div>
                      {result.type === 'WEB' ? (
                          <div className={`text-lg font-bold ${result.score > 80 ? 'text-green-400' : 'text-red-400'}`}>
                            {result.score > 80 ? 'ORIGINAL' : result.score < 50 ? 'PLAGIARIZED' : 'SUSPICIOUS'}
                          </div>
                      ) : (
                          <div className={`text-lg font-bold ${(100 - result.score) > 70 ? 'text-red-400' : 'text-green-400'}`}>
                            {(100 - result.score) > 70 ? 'HIGH MATCH' : 'LOW MATCH'}
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Analysis Content */}
                  <div className="flex-grow space-y-8 w-full">
                    
                    {/* Executive Summary */}
                    <div>
                      <h3 className="text-xs font-bold text-neutral-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
                        <FileText size={14} className="text-white" /> Analysis Summary
                      </h3>
                      <div className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap font-light border-l-2 border-neutral-800 pl-4">
                        {result.text}
                      </div>
                    </div>

                    {/* Sources Found (Only for Web Mode) */}
                    {result.type === 'WEB' && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-bold text-neutral-400 flex items-center gap-2 uppercase tracking-wider">
                            <Globe size={14} className="text-white" /> 
                            Matched Sources 
                            <span className="bg-neutral-800 text-white px-1.5 py-0.5 rounded text-[10px]">{result.sources.length}</span>
                          </h4>
                        </div>
                        
                        {result.sources.length > 0 ? (
                          <div className="space-y-3">
                            {result.sources.map((source, idx) => (
                              <a 
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-neutral-900/30 border border-neutral-800 rounded-sm hover:border-neutral-600 hover:bg-neutral-900 transition-all group"
                              >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="w-8 h-8 rounded-sm bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-white group-hover:border-neutral-600 transition-colors">
                                        <ExternalLink size={14} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm text-white font-medium truncate max-w-[200px] md:max-w-[300px]">{source.title}</div>
                                        <div className="text-[10px] text-neutral-500 font-mono truncate opacity-70">{source.uri}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-red-400 bg-red-950/30 border border-red-900/50 px-2 py-1 rounded">MATCH</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 bg-green-950/10 border border-green-900/30 rounded-sm text-green-400 text-sm flex items-center gap-4">
                            <div className="p-2 bg-green-900/20 rounded-full">
                               <ShieldCheck size={20} />
                            </div>
                            <div>
                              <div className="font-bold mb-1">No Matches Found</div>
                              <div className="text-green-400/70 text-xs">Our deep search did not find any direct copies of this text in the public index.</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Dandelion Specific Info (Only for Compare Mode) */}
                    {result.type === 'COMPARE' && (
                        <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm">
                             <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase">Engine: Dandelion API (Semantic Similarity)</span>
                             </div>
                             <p className="text-xs text-neutral-500">
                                This score indicates the semantic closeness of the two texts. A score of 100% means they are identical or semantically equivalent. A score of 0% means they are unrelated.
                             </p>
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
              <ShieldAlert size={18} />
              ERROR: {error}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
