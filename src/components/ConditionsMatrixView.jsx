import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  BrainCircuit, 
  ShieldAlert, 
  Server, 
  Layers, 
  Code2, 
  ExternalLink,
  Lock,
  Globe,
  GraduationCap
} from 'lucide-react';

const TRACKS = [
  {
    domain: 'AI & LLM Masterclass',
    category: 'AI & LLM',
    icon: BrainCircuit,
    color: 'text-purple-400',
    borderColor: 'border-purple-800/60',
    bgColor: 'bg-purple-950/20',
    sampleRepos: ['ai-security-course', 'aif', 'adversarial-evasion-lab', 'AI-Certification-Customer-Development'],
    preConditions: [
      'Git & GitHub account configured with active SSH / PAT token',
      'Python 3.10+ and Node.js 18+ runtime environments installed locally',
      'OpenAI, Anthropic, or Google Gemini API Keys securely saved in Azure Key Vault',
      'Local vector store / ChromaDB or Cloudflare Vectorize bindings prepared',
      'Basic knowledge of prompt engineering and LLM evaluation benchmarks'
    ],
    postConditions: [
      'Interactive AI Agent / LLM application live on Cloudflare Workers AI / Pages',
      'Prompt evaluation and adversarial robustness score validated >= 90%',
      'Low latency streaming inference tested with sub-second response times',
      'Automated CI/CD GitHub Action passing all test suites and security scans',
      'Workshop participant completion badge issued via Skool platform'
    ]
  },
  {
    domain: 'Cybersecurity & Adversarial Defense',
    category: 'Cybersecurity & Adversarial',
    icon: ShieldAlert,
    color: 'text-rose-400',
    borderColor: 'border-rose-800/60',
    bgColor: 'bg-rose-950/20',
    sampleRepos: ['adaptivesecuritytechniques', 'adversarial-evasion-lab', 'ai-security-course'],
    preConditions: [
      'Docker Desktop installed for isolated sandbox execution',
      'Security testing credentials and honeypot keys loaded in Azure Key Vault',
      'Pre-configured attack vectors and evasion payload test suites',
      'Network perimeter security & OWASP Top 10 compliance baseline understanding'
    ],
    postConditions: [
      'Adversarial evasion attacks simulated and mitigated by edge firewall rules',
      'Zero secrets or plain-text credentials leaked in commit logs or builds',
      'Automated security telemetry reporting to Azure Key Vault & Cloudflare Logs',
      'Live attack mitigation demo recorded and submitted on Skool community'
    ]
  },
  {
    domain: 'Cloud, Infrastructure & DevOps',
    category: 'Cloud & DevOps',
    icon: Server,
    color: 'text-blue-400',
    borderColor: 'border-blue-800/60',
    bgColor: 'bg-blue-950/20',
    sampleRepos: ['vps_windows', 'azure-quickstart-templates', 'k8st', 'logicapps'],
    preConditions: [
      'Active Azure Subscription with Owner or Contributor + Key Vault Secrets User role',
      'Terraform / OpenTofu CLI installed (v1.6+)',
      'Cloudflare Account ID and API Token generated with Pages/Workers write permissions',
      'Azure CLI (az) authenticated locally and linked to service principal'
    ],
    postConditions: [
      'Infrastructure as Code (IaC) templates validated and deployed without drift',
      'Cloudflare Pages custom domain & SSL/TLS edge acceleration operational',
      'Azure Key Vault secret synchronization script (`sync-azure-keyvault.sh`) automated',
      'End-to-end delivery pilot health check passing green'
    ]
  },
  {
    domain: 'FullStack & Automation Tooling',
    category: 'FullStack & Web Apps',
    icon: Layers,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-800/60',
    bgColor: 'bg-cyan-950/20',
    sampleRepos: ['chromeTerminal', 'delivery-pilot-dashboard', 'connectivity-checker'],
    preConditions: [
      'Node.js 20 LTS installed with npm/pnpm',
      'Modern browser (Google Chrome) with developer tools enabled',
      'Wrangler CLI installed globally (`npm install -g wrangler`)',
      'Clean Git working tree with upstream remote configured'
    ],
    postConditions: [
      'FullStack Single Page Application built to `dist` and deployed to Cloudflare',
      'Zero console errors and 100% Lighthouse Performance & Accessibility score',
      'Dynamic API integration tested against live cloud services',
      'Repository documentation and Skool booking triggers verified'
    ]
  }
];

export default function ConditionsMatrixView({ onOpenSkool }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-xl font-bold text-white mb-2">
          Delivery Pilot Workshop Pre & Post Conditions Matrix
        </h3>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Each delivery track guarantees rigorous quality control. Pre-conditions outline every prerequisite, cloud credential, and software setup required before starting. Post-conditions specify the tangible, measurable outcomes delivered upon completion.
        </p>
      </div>

      {/* Track Cards */}
      <div className="space-y-6">
        {TRACKS.map((track, idx) => {
          const Icon = track.icon;
          return (
            <div 
              key={idx}
              className={`rounded-2xl border ${track.borderColor} ${track.bgColor} p-6 sm:p-8 backdrop-blur-md shadow-xl`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <Icon className={`w-6 h-6 ${track.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{track.domain}</h4>
                    <span className="text-xs text-slate-400 font-mono">Category: {track.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenSkool()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 self-start sm:self-auto shadow-md transition"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Book Track on Skool</span>
                </button>
              </div>

              {/* Grid with Pre and Post conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pre Conditions */}
                <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                  <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm mb-3">
                    <AlertCircle className="w-4 h-4" />
                    <span>Workshop Pre-Conditions (Prerequisites)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {track.preConditions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Post Conditions */}
                <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800/90">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Workshop Post-Conditions (Delivered Outcomes)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {track.postConditions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sample Repositories */}
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Related Catalog Repositories:</span>
                {track.sampleRepos.map((repoName, i) => (
                  <a
                    key={i}
                    href={`https://github.com/rifaterdemsahin/${repoName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono hover:text-white transition inline-flex items-center gap-1"
                  >
                    <span>{repoName}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
