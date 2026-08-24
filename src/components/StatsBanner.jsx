import React from 'react';
import { 
  FolderGit2, 
  Globe, 
  Lock, 
  BrainCircuit, 
  ShieldAlert, 
  Server, 
  CloudLightning,
  Sparkles
} from 'lucide-react';

export default function StatsBanner({ repos, onSelectFilter, activeVisibility, activeCategory }) {
  const total = repos.length;
  const publicCount = repos.filter(r => !r.isPrivate).length;
  const privateCount = repos.filter(r => r.isPrivate).length;
  const aiCount = repos.filter(r => r.category === 'AI & LLM').length;
  const secCount = repos.filter(r => r.category === 'Cybersecurity & Adversarial').length;
  const cloudCount = repos.filter(r => r.category === 'Cloud & DevOps').length;

  return (
    <div className="mb-8">
      {/* Hero Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 md:p-8 border border-slate-800 shadow-2xl mb-6">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Delivery Pilot Workshop Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Select Repositories, Verify Pre & Post Conditions, Build & Deploy
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore Rifat Erdem Sahin&apos;s complete catalog of <span className="font-semibold text-cyan-400">464+ public and private repositories</span>. Select the codebases your audience wants to build in hands-on workshops, review delivery pre/post conditions, inject secrets via Azure Key Vault, deploy straight to Cloudflare Edge, and book workshop sessions on Skool.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-3 min-w-[240px]">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse"></div>
              <span className="text-xs text-slate-300 font-medium">Cloudflare Edge: <strong className="text-emerald-400">Ready</strong></span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"></div>
              <span className="text-xs text-slate-300 font-medium">Azure Key Vault: <strong className="text-amber-400">Connected</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Repos */}
        <button
          onClick={() => onSelectFilter('all', 'all')}
          className="p-4 rounded-xl glass-panel text-left border border-slate-800/80 hover:border-cyan-500/50 transition transform hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Repos</span>
            <FolderGit2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-white">{total}</div>
          <div className="text-[11px] text-cyan-400/80 font-medium mt-0.5">Catalogued</div>
        </button>

        {/* Public Repos */}
        <button
          onClick={() => onSelectFilter('PUBLIC', activeCategory)}
          className={`p-4 rounded-xl text-left border transition transform hover:-translate-y-0.5 group ${
            activeVisibility === 'PUBLIC'
              ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
              : 'glass-panel border-slate-800/80 hover:border-emerald-500/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Public</span>
            <Globe className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{publicCount}</div>
          <div className="text-[11px] text-emerald-400/80 font-medium mt-0.5">Open Source</div>
        </button>

        {/* Private Repos */}
        <button
          onClick={() => onSelectFilter('PRIVATE', activeCategory)}
          className={`p-4 rounded-xl text-left border transition transform hover:-translate-y-0.5 group ${
            activeVisibility === 'PRIVATE'
              ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10'
              : 'glass-panel border-slate-800/80 hover:border-amber-500/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Private</span>
            <Lock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-amber-400">{privateCount}</div>
          <div className="text-[11px] text-amber-400/80 font-medium mt-0.5">Key Vault Access</div>
        </button>

        {/* AI & LLM */}
        <button
          onClick={() => onSelectFilter(activeVisibility, 'AI & LLM')}
          className={`p-4 rounded-xl text-left border transition transform hover:-translate-y-0.5 group ${
            activeCategory === 'AI & LLM'
              ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/10'
              : 'glass-panel border-slate-800/80 hover:border-purple-500/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">AI & LLM</span>
            <BrainCircuit className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-purple-400">{aiCount}</div>
          <div className="text-[11px] text-purple-400/80 font-medium mt-0.5">Workshops</div>
        </button>

        {/* Security */}
        <button
          onClick={() => onSelectFilter(activeVisibility, 'Cybersecurity & Adversarial')}
          className={`p-4 rounded-xl text-left border transition transform hover:-translate-y-0.5 group ${
            activeCategory === 'Cybersecurity & Adversarial'
              ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-500/10'
              : 'glass-panel border-slate-800/80 hover:border-rose-500/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Security</span>
            <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-rose-400">{secCount}</div>
          <div className="text-[11px] text-rose-400/80 font-medium mt-0.5">Adversarial Labs</div>
        </button>

        {/* Cloud & DevOps */}
        <button
          onClick={() => onSelectFilter(activeVisibility, 'Cloud & DevOps')}
          className={`p-4 rounded-xl text-left border transition transform hover:-translate-y-0.5 group ${
            activeCategory === 'Cloud & DevOps'
              ? 'bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-500/10'
              : 'glass-panel border-slate-800/80 hover:border-blue-500/50'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cloud / Infra</span>
            <Server className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-blue-400">{cloudCount}</div>
          <div className="text-[11px] text-blue-400/80 font-medium mt-0.5">Azure & CF</div>
        </button>
      </div>
    </div>
  );
}
