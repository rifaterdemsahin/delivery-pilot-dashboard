import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SkoolBookingModal({ 
  isOpen, 
  onClose, 
  selectedRepos = [], 
  singleRepo = null 
}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const targetRepos = singleRepo ? [singleRepo] : selectedRepos;
  const skoolCommunityUrl = 'https://www.skool.com'; // Default Skool portal

  const bookingMessage = `🎯 Delivery Pilot Workshop Session Booking
Name: ${userName || 'Delivery Pilot Participant'}
Email: ${userEmail || 'participant@company.com'}
Primary Focus / Goal: ${userGoal || 'Production build, Azure Key Vault secret configuration, and Cloudflare Edge deployment'}

Selected Repositories (${targetRepos.length}):
${targetRepos.map((r, i) => `${i + 1}. ${r.name} (${r.visibility}) - [${r.category}]`).join('\n')}

Prerequisites & Key Vault:
- Azure Key Vault configured
- Cloudflare Pages API connected
- GitHub repo access verified

Ready for live delivery session!`;

  const copyAndLaunchSkool = () => {
    navigator.clipboard.writeText(bookingMessage);
    setCopiedPayload(true);
    setConfirmed(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      window.open(skoolCommunityUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-950/80 to-orange-950/40 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-orange-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Book Delivery Pilot Workshop on Skool</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Schedule your interactive cohort session and mention your selected repository tracks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Target Repos summary */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-semibold text-slate-400 block mb-2">
              Interested Workshop Repositories ({targetRepos.length}):
            </span>
            {targetRepos.length === 0 ? (
              <p className="text-amber-400 text-xs">No repositories selected yet. You can select repos from the catalog first or submit a general delivery request.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                {targetRepos.map(r => (
                  <span key={r.id} className="px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-mono">
                    {r.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Your Name / Organization</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Alex Rivera (Cloud Architecture Team)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 text-xs focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email / Preferred Contact</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="e.g. alex@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 text-xs focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Specific Goal / Desired Outcome</label>
              <textarea
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                rows={2}
                placeholder="e.g. We want to implement automated adversarial defense pipelines and deploy to Cloudflare Edge using Key Vault credentials."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 text-xs focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Formatted Skool Message Preview */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-slate-400">
              <span className="font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-orange-400" />
                <span>Generated Skool Workshop Payload</span>
              </span>
              <span className="text-[11px] text-slate-500">Auto-copied upon launch</span>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre-wrap">
              {bookingMessage}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={copyAndLaunchSkool}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition transform hover:-translate-y-0.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Copy & Open Skool Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
