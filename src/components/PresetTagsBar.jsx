import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  Tag, 
  ShieldCheck, 
  Flame, 
  Settings2, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const PRESET_TAG_GROUPS = [
  {
    groupTitle: 'AI Security & Runtime Presets',
    icon: ShieldCheck,
    color: 'text-rose-400',
    borderColor: 'border-rose-800/60',
    tags: [
      {
        id: 'sec-memory',
        emoji: '🧠',
        name: 'Memory',
        subtitle: 'Enforces strict retention to stop leaks.',
        keywords: ['memory', 'security', 'leak', 'retention', 'privacy', 'dlp']
      },
      {
        id: 'sec-workspaces',
        emoji: '📂',
        name: 'Workspaces',
        subtitle: 'Applies RBAC & DLP in isolated environments.',
        keywords: ['workspace', 'rbac', 'dlp', 'sonarqube', 'audit', 'isolated']
      },
      {
        id: 'sec-guardrails',
        emoji: '🛡️',
        name: 'Guardrails',
        subtitle: 'Blocks prompt injections & jailbreaks live.',
        keywords: ['guardrails', 'injection', 'jailbreak', 'adversarial', 'defense', 'attack']
      },
      {
        id: 'sec-integrations',
        emoji: '🔌',
        name: 'Integrations',
        subtitle: 'Secures APIs with zero-trust auth.',
        keywords: ['api', 'integration', 'zero-trust', 'auth', 'mcp', 'keyvault']
      },
      {
        id: 'sec-sandboxing',
        emoji: '📦',
        name: 'Sandboxing',
        subtitle: 'Runs generated code in isolated containers.',
        keywords: ['sandbox', 'docker', 'container', 'execution', 'kubernetes', 'openshift']
      }
    ]
  },
  {
    groupTitle: 'Set Your Environment (Live Call Format)',
    icon: Flame,
    color: 'text-amber-400',
    borderColor: 'border-amber-800/60',
    tags: [
      {
        id: 'env-seat',
        emoji: '🔥',
        name: 'Claim "The Seat"',
        subtitle: 'Get personalized attention to solve your blockers and get completely unstuck.',
        keywords: ['agent', 'ai', 'cloud', 'troubleshoot', 'blocker']
      },
      {
        id: 'env-stage',
        emoji: '📺',
        name: 'Take the Stage',
        subtitle: 'Share your screen and walk through your current challenges or projects.',
        keywords: ['demo', 'dashboard', 'fullstack', 'walkthrough']
      },
      {
        id: 'env-review',
        emoji: '👑',
        name: 'High-Impact Review',
        subtitle: 'Receive a direct, high-impact review of your workflows.',
        keywords: ['review', 'architecture', 'pipeline', 'audit']
      }
    ]
  },
  {
    groupTitle: 'Human-in-the-Loop & Governance',
    icon: Settings2,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-800/60',
    tags: [
      {
        id: 'gov-memory',
        emoji: '🧠',
        name: 'Memory (Context)',
        subtitle: 'Refines model context based on user feedback & edits.',
        keywords: ['memory', 'feedback', 'context', 'llm', 'prompt']
      },
      {
        id: 'gov-workspaces',
        emoji: '📂',
        name: 'Workspaces (Sign-Off)',
        subtitle: 'Requires manager sign-off for shared team assets.',
        keywords: ['governance', 'sign-off', 'approval', 'team']
      },
      {
        id: 'gov-integrations',
        emoji: '🔌',
        name: 'Integrations (Approval)',
        subtitle: 'Mandates user approval before executing external actions.',
        keywords: ['approval', 'actions', 'external', 'mcp', 'agent']
      },
      {
        id: 'gov-artifacts',
        emoji: '📦',
        name: 'Artifacts',
        subtitle: 'Lets humans review, tweak, & approve code before launch.',
        keywords: ['artifacts', 'cloudflare', 'pages', 'launch', 'deploy']
      }
    ]
  }
];

export default function PresetTagsBar({ 
  selectedTagIds, 
  onToggleTag, 
  onClearTags 
}) {
  const [activeGroupTab, setActiveGroupTab] = useState('all');

  const allTags = PRESET_TAG_GROUPS.flatMap(g => g.tags);
  const selectedCount = selectedTagIds.length;

  return (
    <div className="mb-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-xl backdrop-blur-lg">
      {/* Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-extrabold text-white">Workshop & Environment Preset Tags</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Quick Select
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Select presets to filter matching repositories and automatically attach requirements to your Skool session brief.
            </p>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
              {selectedCount} Selected
            </span>
            <button
              onClick={onClearTags}
              className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded-lg hover:bg-rose-950/30 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset Tags
            </button>
          </div>
        )}
      </div>

      {/* Preset Groups */}
      <div className="space-y-4">
        {PRESET_TAG_GROUPS.map((group, gIdx) => {
          const GroupIcon = group.icon;
          return (
            <div key={gIdx} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <GroupIcon className={`w-3.5 h-3.5 ${group.color}`} />
                <span>{group.groupTitle}</span>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => {
                  const isSelected = selectedTagIds.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => onToggleTag(tag)}
                      title={`${tag.name}: ${tag.subtitle}`}
                      className={`group relative text-left py-2 px-3 rounded-xl border text-xs transition-all flex items-start gap-2 max-w-sm ${
                        isSelected
                          ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-500/15 ring-1 ring-cyan-400/50'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                      }`}
                    >
                      <span className="text-sm shrink-0 mt-0.5">{tag.emoji}</span>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span className={isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}>
                            {tag.name}
                          </span>
                          {isSelected && <Check className="w-3 h-3 text-cyan-400 stroke-[3]" />}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 group-hover:text-slate-300 mt-0.5">
                          {tag.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
