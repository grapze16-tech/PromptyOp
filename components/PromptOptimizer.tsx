import React, { useState } from 'react';
import { TargetModel, OptimizationResult } from '../types';
import { MODEL_OPTIONS } from '../constants';
import { optimizeUserPrompt } from '../services/geminiService';
import { ArrowRight, Copy, Check, RefreshCw, Wand2, AlertCircle } from 'lucide-react';

export const PromptOptimizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<TargetModel>('gemini');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setCopied(false);
    
    try {
      const data = await optimizeUserPrompt(input, model);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.optimized) {
      navigator.clipboard.writeText(result.optimized);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Input */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl shadow-black/50 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="bg-neutral-800 w-6 h-6 rounded-full flex items-center justify-center text-xs text-primary-400">1</span>
            Your Idea
          </h2>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as TargetModel)}
            className="bg-black border border-neutral-700 text-neutral-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-1.5"
          >
            {MODEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Target: {opt.label}
              </option>
            ))}
          </select>
        </div>
        
        <textarea
          className="flex-grow w-full bg-black border border-neutral-700 rounded-xl p-4 text-neutral-200 placeholder-neutral-600 focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none transition-all"
          placeholder="e.g., I need a blog post about sustainability..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-200 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <button
          onClick={handleOptimize}
          disabled={loading || !input.trim()}
          className={`mt-6 w-full py-3 px-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
            loading || !input.trim()
              ? 'bg-neutral-800 cursor-not-allowed text-neutral-500'
              : 'bg-gradient-to-r from-primary-600 to-red-800 hover:from-primary-500 hover:to-red-700 shadow-lg shadow-red-900/20 active:scale-95'
          }`}
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Perfect Prompt
            </>
          )}
        </button>
      </div>

      {/* Right Column: Output */}
      <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl shadow-black/50 flex flex-col h-full relative overflow-hidden transition-all duration-500 ${!result ? 'opacity-50' : 'opacity-100'}`}>
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 pointer-events-none p-6 text-center">
            <div className="bg-neutral-800 p-4 rounded-full mb-4">
              <ArrowRight className="w-8 h-8 opacity-50" />
            </div>
            <p>Your optimized prompt will appear here ready to copy.</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-4 opacity-100">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="bg-primary-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">2</span>
            Optimized Result
          </h2>
          {result && (
            <button
              onClick={handleCopy}
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors border border-neutral-700"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        <div className="flex-grow bg-black border border-neutral-800 rounded-xl p-4 overflow-y-auto relative custom-scrollbar">
            {result ? (
                <div className="space-y-4">
                    <div className="prose prose-invert max-w-none text-sm whitespace-pre-wrap font-mono text-neutral-200">
                        {result.optimized}
                    </div>
                </div>
            ) : (
                <div className="h-full w-full flex items-center justify-center">
                    {loading && (
                         <div className="space-y-3 w-full max-w-xs">
                             <div className="h-2 bg-neutral-800 rounded animate-pulse w-3/4"></div>
                             <div className="h-2 bg-neutral-800 rounded animate-pulse"></div>
                             <div className="h-2 bg-neutral-800 rounded animate-pulse w-5/6"></div>
                         </div>
                    )}
                </div>
            )}
        </div>

        {result && (
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Why this works:</h3>
            <p className="text-sm text-neutral-300 mb-3">{result.explanation}</p>
            <div className="flex flex-wrap gap-2">
              {result.techniquesUsed.map((tech, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded-md bg-red-950/30 text-red-300 border border-red-900/30">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};