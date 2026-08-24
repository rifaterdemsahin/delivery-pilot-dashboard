import React, { useState } from 'react';
import { 
  Globe, 
  Lock, 
  Star, 
  ExternalLink, 
  Check, 
  Terminal, 
  FileCheck2, 
  Clock, 
  Code2, 
  Copy,
  Sparkles,
  Layers
} from 'lucide-react';

export default function RepoCard({ 
  repo, 
  isSelected, 
  onToggleSelect, 
  onViewConditions 
}) {
  const [copied, setCopied] = useState(false);

  const copyCloneCmd = (e) => {
    e.stopPropagation();
    const cmd = `git clone ${repo.url}.git && cd ${repo.name}`;
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'AI & LLM':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'Cybersecurity & Adversarial':
        return 'bg-rose-950/60 text-rose-300 border-rose-800/60';
      case 'Cloud & DevOps':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
      case 'Automation & Tooling':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      case 'FullStack & Web Apps':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <div 
      className={`relative rounded-2xl p-5 transition-all flex flex-col justify-between group border ${
        isSelected 
          ? 'bg-slate-900/95 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/50' 
          : 'glass-panel border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
      }`}
    >
      {/* Selection checkbox indicator */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <button
          type="button"
          onClick={() => onToggleSelect(repo)}
          className={`flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition ${
            isSelected
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/30'
              : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-cyan-500/60 hover:text-white'
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
            isSelected ? 'bg-slate-950 border-slate-950 text-cyan-400' : 'border-slate-600 bg-slate-900'
          }`}>
            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span>{isSelected ? 'Selected in Basket' : 'Select for Workshop'}</span>
        </button>

        {/* Public vs Private Marker */}
        {repo.isPrivate ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/80 shadow-sm">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>PRIVATE</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 shadow-sm">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span>PUBLIC</span>
          </span>
        )}
      </div>

      {/* Repo Title and Category */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(repo.category)}`}>
            {repo.category}
          </span>
          {repo.language && (
            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
              {repo.language}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-white tracking-tight break-all group-hover:text-cyan-300 transition">
          {repo.name}
        </h3>

        <p className="text-xs text-slate-400 mt-2 line-clamp-2 min-h-[32px] leading-relaxed">
          {repo.description || 'Workshop codebase for delivery pilots and live building.'}
        </p>
      </div>

      {/* Workshop Summary Quick Spec */}
      <div className="pt-3 border-t border-slate-800/80 space-y-2 mb-4 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5" /> Est. Workshop Time:
          </span>
          <span className="font-semibold text-slate-300">{repo.estimatedDuration}</span>
        </div>

        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Layers className="w-3.5 h-3.5" /> Target Deployment:
          </span>
          <span className="font-medium text-orange-400">Cloudflare Edge</span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        <button
          type="button"
          onClick={() => onViewConditions(repo)}
          className="flex-1 py-2 px-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700/60"
        >
          <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Pre / Post Conditions</span>
        </button>

        <button
          type="button"
          onClick={copyCloneCmd}
          title="Copy Git Clone Command"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>

        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          title="Open Repository on GitHub"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
