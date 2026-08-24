import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Globe, 
  Lock, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function InterestBasketDrawer({ 
  isOpen, 
  onClose, 
  selectedRepos, 
  onRemoveRepo, 
  onClearAll,
  onOpenSkool
}) {
  const [copiedPayload, setCopiedPayload] = useState(false);

  if (!isOpen) return null;

  const repoNames = selectedRepos.map(r => r.name);
  const totalPublic = selectedRepos.filter(r => !r.isPrivate).length;
  const totalPrivate = selectedRepos.filter(r => r.isPrivate).length;

  // Aggregate unique pre and post conditions
  const allPreConditions = Array.from(new Set(selectedRepos.flatMap(r => r.preConditions)));
  const allPostConditions = Array.from(new Set(selectedRepos.flatMap(r => r.postConditions)));

  const copyInterestPayload = () => {
    const summaryText = `# Delivery Pilot Workshop Interest & Booking Request
Selected Repositories (${selectedRepos.length}):
${selectedRepos.map((r, i) => `${i + 1}. [${r.name}](${r.url}) (${r.isPrivate ? 'PRIVATE' : 'PUBLIC'}) - Category: ${r.category}`).join('\n')}

Key Workshop Deliverables:
${allPostConditions.slice(0, 5).map(c => `- ${c}`).join('\n')}

Deployment Target: Cloudflare Edge & Pages
Secrets Management: Azure Key Vault
Platform: Skool Delivery Pilot Workshop`;

    navigator.clipboard.writeText(summaryText);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  {selectedRepos.length}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Workshop Interest Basket</h3>
                  <p className="text-xs text-slate-400">
                    {totalPublic} Public • {totalPrivate} Private Repos Selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {selectedRepos.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-300">Your basket is empty</h4>
                <p className="text-slate-500 mt-1">
                  Click &ldquo;Select for Workshop&rdquo; on any repository card to build your personalized delivery workshop track.
                </p>
              </div>
            ) : (
              <>
                {/* List of Repos */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-300">Selected Repositories</span>
                    <button
                      onClick={onClearAll}
                      className="text-rose-400 hover:text-rose-300 text-[11px] font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Clear all
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {selectedRepos.map((repo) => (
                      <div 
                        key={repo.id}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-2 hover:border-slate-700 transition"
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-1.5 mb-1">
                            {repo.isPrivate ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                                PRIVATE
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                                PUBLIC
                              </span>
                            )}
                            <span className="text-[10px] text-slate-400 font-mono truncate">{repo.category}</span>
                          </div>
                          <h5 className="font-bold text-slate-100 text-xs truncate">{repo.name}</h5>
                        </div>

                        <button
                          onClick={() => onRemoveRepo(repo)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                          title="Remove from basket"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pre-conditions summary */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Aggregated Pre-Conditions</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-400">
                    {allPreConditions.slice(0, 4).map((cond, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px]">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Post-conditions summary */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Target Workshop Outcomes</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-400">
                    {allPostConditions.slice(0, 4).map((cond, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px]">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {selectedRepos.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/90 space-y-3">
              <button
                onClick={copyInterestPayload}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedPayload ? 'Copied Interest Summary' : 'Copy Interest Summary'}</span>
              </button>

              <button
                onClick={() => { onClose(); onOpenSkool(); }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition transform hover:-translate-y-0.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Book Workshop on Skool ({selectedRepos.length} Repos)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
