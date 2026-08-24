import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Globe, 
  Lock, 
  Copy, 
  Check, 
  KeyRound, 
  Cloud, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function WorkshopConditionsModal({ 
  repo, 
  onClose, 
  onToggleSelect, 
  isSelected,
  onOpenSkool
}) {
  const [copiedBuild, setCopiedBuild] = useState(false);
  const [activeTab, setActiveTab] = useState('conditions'); // 'conditions' | 'build' | 'secrets'

  if (!repo) return null;

  const copyBuildScript = () => {
    const script = `# Step 1: Clone Repository
git clone ${repo.url}.git
cd ${repo.name}

# Step 2: Setup Dependencies
${repo.build.setup}

# Step 3: Run / Local Verification
${repo.build.run}

# Step 4: Production Build
${repo.build.build}

# Step 5: Deploy to Cloudflare Edge
${repo.build.deploy}`;

    navigator.clipboard.writeText(script);
    setCopiedBuild(true);
    setTimeout(() => setCopiedBuild(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {repo.category}
              </span>
              {repo.isPrivate ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  <Lock className="w-3 h-3" /> PRIVATE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <Globe className="w-3 h-3" /> PUBLIC
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">{repo.name}</h3>
            <p className="text-xs text-slate-400 mt-1">{repo.description}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('conditions')}
            className={`pb-3 px-3 border-b-2 transition ${
              activeTab === 'conditions'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Pre & Post Conditions
          </button>
          <button
            onClick={() => setActiveTab('build')}
            className={`pb-3 px-3 border-b-2 transition ${
              activeTab === 'build'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Build & Deployment Commands
          </button>
          <button
            onClick={() => setActiveTab('secrets')}
            className={`pb-3 px-3 border-b-2 transition ${
              activeTab === 'secrets'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Azure Key Vault & Cloudflare Spec
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'conditions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pre-conditions */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Workshop Pre-Conditions (Prerequisites)</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Participants must satisfy these requirements prior to initiating the workshop delivery:
                </p>
                <ul className="space-y-3">
                  {repo.preConditions.map((cond, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        {i + 1}
                      </div>
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Post-conditions */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Workshop Post-Conditions (Target Outcomes)</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Measurable definitions of done (DoD) delivered upon completion:
                </p>
                <ul className="space-y-3">
                  {repo.postConditions.map((cond, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </div>
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'build' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Standard Delivery Pilot Execution Recipe</span>
                <button
                  onClick={copyBuildScript}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-medium flex items-center gap-1.5 transition border border-slate-700"
                >
                  {copiedBuild ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBuild ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
                <div>
                  <span className="text-slate-500"># 1. Setup</span>
                  <div className="text-cyan-400">{repo.build.setup}</div>
                </div>
                <div>
                  <span className="text-slate-500"># 2. Local Test / Run</span>
                  <div className="text-emerald-400">{repo.build.run}</div>
                </div>
                <div>
                  <span className="text-slate-500"># 3. Production Build</span>
                  <div className="text-amber-400">{repo.build.build}</div>
                </div>
                <div>
                  <span className="text-slate-500"># 4. Cloudflare Edge Deployment</span>
                  <div className="text-purple-400">{repo.build.deploy}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'secrets' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <KeyRound className="w-4 h-4" />
                  <span>Azure Key Vault Secret Sync</span>
                </div>
                <p className="text-slate-300">
                  Private repos and AI credentials are automatically pulled from Azure Key Vault into the delivery runner via <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded">sync-azure-keyvault.sh</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-orange-400">
                  <Cloud className="w-4 h-4" />
                  <span>Cloudflare Pages & Workers Target</span>
                </div>
                <p className="text-slate-300">
                  Build outputs are deployed to Cloudflare Edge global network with automatic HTTPS, DDoS protection, and custom preview URLs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onToggleSelect(repo)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              isSelected
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isSelected ? '✓ Selected in Basket' : '+ Add to Workshop Basket'}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { onClose(); onOpenSkool(repo); }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Book Workshop on Skool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
