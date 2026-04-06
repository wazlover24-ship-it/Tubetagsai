
import React, { useState } from 'react';
import { generateYouTubeSEO } from './services/geminiService';
import { TagResult, LoadingStatus } from './types';
import TagDisplay from './components/TagDisplay';
import AdMobBanner from './components/AdMobBanner';

const App: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.IDLE);
  const [result, setResult] = useState<TagResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [descCopied, setDescCopied] = useState(false);
  
  // High-quality professional 3D YouTube Logo - representative of the user's uploaded style
  const LOGO_URL = "https://img.icons8.com/color/512/youtube-play.png";

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setStatus(LoadingStatus.LOADING);
    setError(null);
    setResult(null);

    try {
      const data = await generateYouTubeSEO(keyword);
      setResult(data);
      setStatus(LoadingStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Something went wrong generating SEO data. Please try again.');
      setStatus(LoadingStatus.ERROR);
    }
  };

  const copyDescription = () => {
    if (result?.description) {
      navigator.clipboard.writeText(result.description);
      setDescCopied(true);
      setTimeout(() => setDescCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* AdMob Banner at the top */}
      <AdMobBanner 
        publisherId="ca-pub-5234478148273071" 
        adUnitId="ca-app-pub-5234478148273071/6731742145" 
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden border border-slate-100 p-0.5">
              <img src={LOGO_URL} alt="TubeTags AI Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                TubeTags <span className="text-red-600">AI</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                Stable v3.1
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-emerald-100">
            Version 3.1
          </div>
          {/* Changed font-extrabold to font-light as per request */}
          <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
            Professional YouTube SEO generator for tags, hashtags, and descriptions.
          </p>
        </div>

        {/* Input Card */}
        <section className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter video topic (e.g., Cooking Tips)..."
              className="flex-1 h-14 px-6 bg-white border border-slate-200 rounded-2xl text-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 transition-all placeholder:text-slate-300"
            />
            <button
              type="submit"
              disabled={status === LoadingStatus.LOADING}
              className="h-14 px-8 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100"
            >
              {status === LoadingStatus.LOADING ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Generate
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-semibold justify-center animate-shake">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}
        </section>

        {/* Results Area */}
        {status === LoadingStatus.SUCCESS && result && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* SEO Description Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">SEO Description</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">High Conversion Copy</p>
                  </div>
                </div>
                <button
                  onClick={copyDescription}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
                    descCopied 
                      ? 'bg-green-500 text-white scale-95' 
                      : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
                  }`}
                >
                  {descCopied ? 'Copied!' : 'Copy Description'}
                </button>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-slate-700 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto font-medium text-base shadow-inner custom-scrollbar">
                {result.description}
              </div>
            </div>

            {/* Grid for Tags */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                 <TagDisplay title="Viral Hashtags" items={result.hashtags} type="hashtags" />
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <TagDisplay title="Trending Tags" items={result.tags} type="tags" />
              </div>
            </div>

            <div className="text-center pt-8 pb-16">
              <button 
                onClick={() => {
                  setKeyword('');
                  setResult(null);
                  setStatus(LoadingStatus.IDLE);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black active:scale-95 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Search
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {status === LoadingStatus.IDLE && (
          <div className="text-center py-16 opacity-30 transition-all duration-700 hover:opacity-100">
             <img src={LOGO_URL} alt="Logo" className="w-20 h-20 mx-auto mb-4 animate-float opacity-80" />
             <p className="text-lg font-bold text-slate-800">Optimize Your Video</p>
             <p className="text-sm text-slate-400 mt-2">Enter your topic above to start generating SEO assets.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={LOGO_URL} alt="Logo" className="w-5 h-5 opacity-50" />
            <span className="text-lg font-bold text-slate-900">TubeTags AI</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} TubeTags AI.
          </p>
          <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-[0.2em]">
            Elite YouTube Creator Suite
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 2; }
      `}</style>
    </div>
  );
};

export default App;
