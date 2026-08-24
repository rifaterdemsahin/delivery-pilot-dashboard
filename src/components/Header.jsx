import React from 'react';
import { 
  Boxes, 
  KeyRound, 
  Cloud, 
  GraduationCap, 
  CheckSquare, 
  FolderGit2, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

export default function Header({ 
  selectedCount, 
  onOpenBasket, 
  onOpenVault, 
  onOpenCloudflare,
  onOpenSkool,
  activeTab,
  setActiveTab
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand and Profile */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Delivery Pilot Dashboard
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300">
                  Live Catalog
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>Rifat Erdem Sahin Repositories</span>
                <span className="text-slate-600">•</span>
                <a 
                  href="https://github.com/rifaterdemsahin?tab=repositories" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 hover:underline"
                >
                  github.com/rifaterdemsahin <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links / Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-sm">
            <button
              onClick={() => setActiveTab('repos')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'repos' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Repositories & Workshops
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'matrix' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Pre & Post Conditions Matrix
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'architecture' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Cloudflare & Key Vault Spec
            </button>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Azure Key Vault Trigger */}
            <button
              onClick={onOpenVault}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition shadow-sm"
              title="Configure Azure Key Vault & API Credentials"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Azure Key Vault</span>
            </button>

            {/* Cloudflare Deploy Trigger */}
            <button
              onClick={onOpenCloudflare}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition shadow-sm"
              title="Cloudflare Edge Deployment Setup"
            >
              <Cloud className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">Cloudflare Edge</span>
            </button>

            {/* Skool Workshop Booking */}
            <button
              onClick={onOpenSkool}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Book on Skool</span>
            </button>

            {/* Interest Cart Drawer Button */}
            <button
              onClick={onOpenBasket}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg ${
                selectedCount > 0
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 ring-2 ring-cyan-400/50 animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Selected Track</span>
              <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-white text-[11px] font-mono">
                {selectedCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
