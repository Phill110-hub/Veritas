
import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, X, AlertCircle, CheckCircle, Loader2, Globe, GitCompare, ExternalLink, Server, Shield } from 'lucide-react';
import { checkPlagiarism } from '../../services/gemini';
import { checkPlagiarismViaAPI } from '../../services/plagiarismSearch';
import { checkSimilarity } from '../../services/dandelion';
import { AnalysisResult, AnalysisStatus } from '../../types';

export const UploadTool: React.FC = () => {
  const [mode, setMode] = useState<'WEB' | 'COMPARE'>('WEB');
  const [engine, setEngine] = useState<'VERITAS' | 'EXTERNAL'>('VERITAS');
  const [activeTab, setActiveTab] = useState<'TEXT' | 'FILE'>('TEXT');
  const [dragActive, setDragActive] = useState(false);
  
  const [inputText, setInputText] = useState('');
  const [compareText, setCompareText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const logIntervalRef = useRef<number | null>(null);

  // Handle File Drag
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      // In a real app, we'd read the file content here
      setInputText("Content extracted from " + e.dataTransfer.files[0].name + " would appear here...");
    }
  };

  // Logs Effect
  useEffect(() => {
      if (status === AnalysisStatus.SCANNING) {
        const messages = [
          "INITIALIZING_CORE...",
          engine === 'VERITAS' ? "CONNECTING_TO_VERITAS_NEURAL_NET..." : "AUTHENTICATING_EXTERNAL_GATEWAY...",
          "TOKENIZING_INPUT_STREAM...",
          "QUERYING_GLOBAL_INDEX...",
          "CROSS_REFERENCING_DATABASES...",
          "ANALYZING_SEMANTIC_STRUCTURE...",
          "CALCULATING_CONFIDENCE_INTERVALS...",
          "FINALIZING_REPORT..."
        ];
        let i = 0;
        logIntervalRef.current = window.setInterval(() => {
          if (i < messages.length) {
            setLogs(prev => [...prev, messages[i]]);
            i++;
          }
        }, 800);
  
        return () => {
          if (logIntervalRef.current) clearInterval(logIntervalRef.current);
        };
      } else {
        setLogs([]);
      }
    }, [status, engine]);

  const handleScan = async () => {
    if (!inputText.trim()) return;
    setStatus(AnalysisStatus.SCANNING);
    setError(null);
    setResult(null);
    
    try {
      if (mode === 'WEB') {
        let analysis;
        if (engine === 'VERITAS') {
           // Use Gemini
           analysis = await checkPlagiarism(inputText);
           await new Promise(r => setTimeout(r, 1000)); // Min delay for UX
        } else {
           // Use PlagiarismSearch.com
           analysis = await checkPlagiarismViaAPI(inputText);
        }
        setResult(analysis);
      } else {
        const similarity = await checkSimilarity(inputText, compareText);
        setResult({
          type: 'COMPARE',
          text: `Comparison complete. Similarity score: ${similarity}%.`,
          score: 100 - similarity, // In UI, Score = Originality
          sources: []
        });
      }
      setStatus(AnalysisStatus.COMPLETE);
    } catch (err: any) {
      setError(err.message || "Scan failed.");
      setStatus(AnalysisStatus.ERROR);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white mb-1">Upload & Analyze</h1>
           <p className="text-neutral-500 text-sm">Submit documents or raw text for instant verification.</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
            {/* Mode Switcher */}
            <div className="bg-neutral-900 p-1 rounded-sm border border-neutral-800 inline-flex">
            <button 
                onClick={() => { setMode('WEB'); setResult(null); }}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold tracking-wide flex items-center gap-2 transition-all ${mode === 'WEB' ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
                <Globe size={14} /> WEB SCAN
            </button>
            <button 
                onClick={() => { setMode('COMPARE'); setResult(null); }}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold tracking-wide flex items-center gap-2 transition-all ${mode === 'COMPARE' ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
                <GitCompare size={14} /> COMPARE
            </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tabs (File vs Text) */}
          {mode === 'WEB' && (
             <div className="flex items-center justify-between border-b border-neutral-800">
                <div className="flex">
                    <button 
                    onClick={() => setActiveTab('TEXT')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'TEXT' ? 'border-white text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
                    >
                    Direct Text Entry
                    </button>
                    <button 
                    onClick={() => setActiveTab('FILE')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'FILE' ? 'border-white text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
                    >
                    File Upload
                    </button>
                </div>

                {/* Engine Selector */}
                <div className="hidden md:flex items-center gap-2 pr-2">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Engine:</span>
                    <div className="flex bg-neutral-900 rounded-sm p-0.5 border border-neutral-800">
                        <button 
                           onClick={() => setEngine('VERITAS')}
                           className={`px-2 py-1 text-[10px] font-bold rounded-sm flex items-center gap-1 ${engine === 'VERITAS' ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                           title="Veritas Native AI (Gemini 1.5)"
                        >
                            <Shield size={10} /> VERITAS
                        </button>
                        <button 
                           onClick={() => setEngine('EXTERNAL')}
                           className={`px-2 py-1 text-[10px] font-bold rounded-sm flex items-center gap-1 ${engine === 'EXTERNAL' ? 'bg-neutral-700 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                           title="PlagiarismSearch.com API"
                        >
                            <Server size={10} /> EXT. API
                        </button>
                    </div>
                </div>
             </div>
          )}

          {/* Input Area */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm relative">
            
            {/* File Upload Box */}
            {mode === 'WEB' && activeTab === 'FILE' ? (
                <div 
                  className={`h-80 border-2 border-dashed rounded-sm flex flex-col items-center justify-center transition-all
                    ${dragActive ? 'border-white bg-neutral-900' : 'border-neutral-800 hover:border-neutral-700'}
                    ${fileName ? 'bg-neutral-900/50' : ''}
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                   {fileName ? (
                      <div className="text-center">
                          <div className="w-12 h-12 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <FileText size={24} />
                          </div>
                          <p className="text-white font-medium mb-1">{fileName}</p>
                          <button onClick={() => { setFileName(null); setInputText(''); }} className="text-xs text-neutral-500 hover:text-red-400 hover:underline">Remove File</button>
                      </div>
                   ) : (
                      <div className="text-center pointer-events-none">
                          <UploadCloud size={40} className="text-neutral-600 mx-auto mb-4" />
                          <p className="text-neutral-300 font-medium mb-1">Drag & drop your document here</p>
                          <p className="text-neutral-600 text-xs">Supported formats: PDF, DOCX, TXT</p>
                      </div>
                   )}
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                      if (e.target.files?.[0]) {
                          setFileName(e.target.files[0].name);
                          setInputText("File content placeholder...");
                      }
                   }} />
                </div>
            ) : (
              // Text Entry
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-800">
                  <div className="flex-1 relative">
                      <textarea
                        className="w-full h-80 bg-transparent p-6 text-neutral-200 font-mono text-sm focus:outline-none resize-none placeholder-neutral-700"
                        placeholder={mode === 'WEB' ? (engine === 'VERITAS' ? "// Paste text to analyze with Gemini 1.5..." : "// Paste text for PlagiarismSearch.com...") : "// Input Text A (Reference)"}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        spellCheck={false}
                      />
                      <div className="absolute bottom-2 right-2 text-[10px] text-neutral-600 font-mono">
                         {inputText.length} CHARS
                      </div>
                  </div>
                  {mode === 'COMPARE' && (
                     <div className="flex-1 relative bg-neutral-900/30">
                        <textarea
                          className="w-full h-80 bg-transparent p-6 text-neutral-200 font-mono text-sm focus:outline-none resize-none placeholder-neutral-700"
                          placeholder="// Input Text B (Comparison)"
                          value={compareText}
                          onChange={(e) => setCompareText(e.target.value)}
                          spellCheck={false}
                        />
                     </div>
                  )}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-neutral-500 font-mono">
                {engine === 'EXTERNAL' && mode === 'WEB' && (
                    <span className="flex items-center gap-2 text-green-500">
                        <CheckCircle size={12} /> API CREDENTIALS LOADED
                    </span>
                )}
            </div>
            <button
               onClick={handleScan}
               disabled={status === AnalysisStatus.SCANNING || !inputText}
               className={`px-8 py-3 rounded-sm font-bold text-sm tracking-wider transition-all flex items-center gap-2
                 ${status === AnalysisStatus.SCANNING || !inputText ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]'}
               `}
            >
               {status === AnalysisStatus.SCANNING ? (
                 <><Loader2 size={16} className="animate-spin" /> ANALYZING...</>
               ) : (
                 <>INITIATE SCAN</>
               )}
            </button>
          </div>
        </div>

        {/* Results / Status Column */}
        <div className="lg:col-span-1">
          
          {status === AnalysisStatus.IDLE && !result && (
              <div className="h-full border border-dashed border-neutral-800 rounded-sm flex items-center justify-center p-8 text-center bg-neutral-900/20">
                 <div>
                    <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-3 text-neutral-600">
                        <AlertCircle size={20} />
                    </div>
                    <p className="text-neutral-500 text-sm">Results will appear here after analysis.</p>
                 </div>
              </div>
          )}

          {status === AnalysisStatus.SCANNING && (
             <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-6 font-mono text-xs h-full">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-neutral-900">
                   <Loader2 size={14} className="animate-spin text-green-500" />
                   <span className="text-green-500">PROCESSING_REQUEST</span>
                </div>
                <div className="space-y-3">
                   {logs.map((log, i) => (
                      <div key={i} className="flex items-center gap-2 text-neutral-400 animate-fade-in-left">
                         <span>{`>`}</span>
                         <span>{log}</span>
                      </div>
                   ))}
                   <div className="w-2 h-4 bg-green-500 animate-pulse mt-2"></div>
                </div>
             </div>
          )}
          
          {status === AnalysisStatus.COMPLETE && result && (
            <div className="bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden animate-fade-in-up">
               <div className={`h-2 w-full ${result.score > 80 ? 'bg-green-500' : result.score < 50 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
               <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                      <div>
                          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
                             {mode === 'COMPARE' ? 'Similarity Score' : 'Originality Score'}
                          </p>
                          <div className="text-4xl font-bold font-mono text-white">
                              {mode === 'COMPARE' ? 100 - result.score : result.score}%
                          </div>
                      </div>
                      <div className={`p-3 rounded-full ${result.score > 80 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {result.score > 80 ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                      </div>
                  </div>

                  <div className="mb-6">
                      <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                         {result.text}
                      </p>
                  </div>

                  {result.type === 'WEB' && result.sources.length > 0 && (
                      <div>
                          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Matched Sources</p>
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                              {result.sources.map((s, i) => (
                                  <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="block p-3 bg-neutral-900 rounded-sm border border-neutral-800 hover:border-neutral-600 transition-all group">
                                      <div className="flex items-start gap-2">
                                          <ExternalLink size={12} className="mt-0.5 flex-shrink-0 text-neutral-500 group-hover:text-white" />
                                          <div>
                                              <p className="text-xs text-white font-medium line-clamp-1">{s.title}</p>
                                              <p className="text-[10px] text-neutral-500 line-clamp-1">{s.uri}</p>
                                          </div>
                                      </div>
                                  </a>
                              ))}
                          </div>
                      </div>
                  )}
               </div>
               <div className="bg-neutral-900 p-3 text-center">
                  <button className="text-xs text-white font-medium hover:underline">Download Full Report</button>
               </div>
            </div>
          )}
          
          {status === AnalysisStatus.ERROR && (
             <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-sm text-red-400 text-sm flex items-center gap-3">
                <AlertCircle size={16} />
                {error}
             </div>
          )}

        </div>
      </div>
    </div>
  );
};
