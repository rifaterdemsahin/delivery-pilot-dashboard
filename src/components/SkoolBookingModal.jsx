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
  AlertCircle,
  ShieldAlert,
  FolderGit2,
  Layers,
  MessageSquareQuote,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SKOOL_COMMENT_URL = 'https://www.skool.com/delivery-pilot-8938/1-1-workshops?p=65f6a56e';

export default function SkoolBookingModal({ 
  isOpen, 
  onClose, 
  selectedRepos = [], 
  singleRepo = null 
}) {
  const [copied, setCopied] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  if (!isOpen) return null;

  const targetRepos = singleRepo ? [singleRepo] : selectedRepos;

  // Build the rich workshop brief formatted as requested
  const buildWorkshopBrief = () => {
    const reposListText = targetRepos.length > 0
      ? targetRepos.map((r, i) => `   - ${r.name} (${r.visibility}) [${r.category}]: ${r.url}`).join('\n')
      : '   - (Custom selection from 460+ Delivery Pilot repos catalog)';

    return `COHORTS ON SUNDAYS

1-1 WORKSHOPS

🚨 Ready to bulletproof your AI stack before tonight’s session? Join us live as we step through foundational to advanced AI security presets, audit live repositories, and enforce strict runtime guardrails.

A) Meeting Preset: 1-1 AI Security Workshop VIP

Frequency: Weekly (Cohorts on Sundays / 1-1 Slots)
Time: Today @ 7:00 PM – 9:00 PM (BST / London Time)
Location: Skool Live Room
Lead Instructor / Host: Rifat Erdem Sahin (https://github.com/rifaterdemsahin)

Preconditions
• Active Skool account with VIP tier permissions for live laboratory access.
• Local environment setup with Git, Docker, Python 3.10+, and pre-cloned workshop repositories.
• Provisioned API keys (OpenAI / Anthropic / Gemini) with rate limits configured for red-teaming tests.
• Azure Key Vault & Cloudflare Edge deployment credentials staged.

Agenda, Experience Levels & GitHub Repositories

Level 1: Fundamentals & Code Quality
• 📂 Workspaces & SonarQube Auditing: Setting up isolated environments with RBAC and running automated static code analysis using rifaterdemsahin/SonarQube.
• 🧠 Memory Retention & DLP: Locking down session histories to prevent accidental context and credential leakage.

Level 2: Guardrails & Tool Integrations
• 🛡️ Runtime Guardrails: Blocking live prompt injections, system prompt extraction, and jailbreak payloads before reaching models.
• 🔌 Zero-Trust Integrations: Securing model context protocol (MCP) endpoints and external API calls with strict authentication.

Level 3: Advanced Sandboxing & Infrastructure Security
• 📦 Containerized Execution: Executing generated agent code within isolated sandbox containers.
• ☁️ Cluster Logging & Auditing: Capturing runtime events using OpenShift/Kubernetes event routing patterns referenced in rifaterdemsahin/OpenShiftEventRouter.

Target Selected Repositories for this Session:
${reposListText}

Postconditions
• Target AI architecture stress-tested against prompt injections and unauthenticated execution vectors.
• Memory isolation, RBAC, and container sandboxing verified operating in production-equivalent setups.
• Participant issued a customized remediation roadmap backed by sample presets from the workshop GitHub organization.

Comment submitted on Skool: ${SKOOL_COMMENT_URL}`;
  };

  const workshopText = buildWorkshopBrief();

  const handleCopyAndOpenSkool = () => {
    navigator.clipboard.writeText(workshopText);
    setCopied(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      window.open(SKOOL_COMMENT_URL, '_blank', 'noopener,noreferrer');
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-amber-950/50 via-slate-950/90 to-orange-950/50 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/25 shrink-0 mt-0.5">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wide">
                  COHORTS ON SUNDAYS
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-950 text-orange-300 border border-orange-800">
                  1-1 WORKSHOPS VIP
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                AI Stack Hardening & Delivery Pilot Workshop
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Copy your customized session brief below and paste it as a comment on Skool before entering the live call.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Urgent Callout Alert */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-slate-950 border border-amber-500/40 flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-300 text-xs">Pre-Call Briefing & Alignment</div>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                🚨 Ready to bulletproof your AI stack before tonight’s session? Join us live as we step through foundational to advanced AI security presets, audit live repositories, and enforce strict runtime guardrails.
              </p>
            </div>
          </div>

          {/* Preset & Session Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Meeting Preset</span>
              <span className="text-xs font-bold text-white mt-1 block">1-1 AI Security VIP</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Frequency</span>
              <span className="text-xs font-bold text-amber-400 mt-1 block">Weekly (Sundays)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Time</span>
              <span className="text-xs font-bold text-orange-400 mt-1 block">Today @ 7-9 PM BST</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Lead Instructor</span>
              <a 
                href="https://github.com/rifaterdemsahin" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-cyan-400 hover:underline mt-1 inline-flex items-center gap-1"
              >
                Rifat Erdem Sahin <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Agenda & 3 Experience Levels */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Agenda, Experience Levels & GitHub Repositories</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">3 Progressive Tiers</span>
            </div>

            <div className="space-y-3">
              {/* Level 1 */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950 border border-cyan-800 text-[10px]">Level 1</span>
                  <span>Fundamentals & Code Quality</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300 pl-2">
                  <li>• <strong>📂 Workspaces & SonarQube Auditing</strong>: Setting up isolated environments with RBAC and running automated static code analysis using <code className="text-cyan-300">rifaterdemsahin/SonarQube</code>.</li>
                  <li>• <strong>🧠 Memory Retention & DLP</strong>: Locking down session histories to prevent accidental context and credential leakage.</li>
                </ul>
              </div>

              {/* Level 2 */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-amber-950 border border-amber-800 text-[10px]">Level 2</span>
                  <span>Guardrails & Tool Integrations</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300 pl-2">
                  <li>• <strong>🛡️ Runtime Guardrails</strong>: Blocking live prompt injections, system prompt extraction, and jailbreak payloads before reaching models.</li>
                  <li>• <strong>🔌 Zero-Trust Integrations</strong>: Securing model context protocol (MCP) endpoints and external API calls with strict authentication.</li>
                </ul>
              </div>

              {/* Level 3 */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-purple-950 border border-purple-800 text-[10px]">Level 3</span>
                  <span>Advanced Sandboxing & Infrastructure Security</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300 pl-2">
                  <li>• <strong>📦 Containerized Execution</strong>: Executing generated agent code within isolated sandbox containers.</li>
                  <li>• <strong>☁️ Cluster Logging & Auditing</strong>: Capturing runtime events using OpenShift/Kubernetes event routing patterns referenced in <code className="text-purple-300">rifaterdemsahin/OpenShiftEventRouter</code>.</li>
                </ul>
              </div>
            </div>

            {/* Target Selected Repos */}
            {targetRepos.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 block mb-2">
                  Selected Repositories Included in Session ({targetRepos.length}):
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {targetRepos.map(r => (
                    <span key={r.id} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-[11px] font-mono">
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Copyable Comment Box Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold flex items-center gap-1.5 text-xs text-white">
                <MessageSquareQuote className="w-4 h-4 text-orange-400" />
                <span>Skool Comment Payload (Copy and Paste before Call)</span>
              </span>
              <span className="text-[11px] text-amber-400 font-semibold">
                Post URL: skool.com/delivery-pilot-8938/1-1-workshops
              </span>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {workshopText}
            </pre>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/95 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Destination: </span>
            <a 
              href={SKOOL_COMMENT_URL} 
              target="_blank" 
              rel="noreferrer"
              className="text-orange-400 hover:underline font-mono"
            >
              skool.com/.../1-1-workshops?p=65f6a56e
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(workshopText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAndOpenSkool}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Copy & Paste Comment on Skool</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
