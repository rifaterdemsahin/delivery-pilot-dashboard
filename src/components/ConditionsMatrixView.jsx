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
  GraduationCap,
  Sparkles,
  Flame
} from 'lucide-react';

const SKOOL_COMMENT_URL = 'https://www.skool.com/delivery-pilot-8938/1-1-workshops?p=65f6a56e';

const TRACKS = [
  {
    domain: 'AI & LLM Masterclass',
    category: 'AI & LLM',
    icon: BrainCircuit,
    color: 'text-purple-400',
    borderColor: 'border-purple-800/60',
    bgColor: 'bg-purple-950/20',
    sampleRepos: ['ai-security-course', 'aif', 'adversarial-evasion-lab', 'AI-Certification-Customer-Development'],
    levelDetails: {
      l1: 'Workspaces & SonarQube Auditing (rifaterdemsahin/SonarQube)',
      l2: 'Runtime Guardrails & Zero-Trust MCP endpoints',
      l3: 'Containerized agent sandboxing & Kubernetes event auditing'
    },
    preConditions: [
      'Git & GitHub account configured with active SSH / PAT token',
      'Python 3.10+ and Node.js 18+ runtime environments installed locally',
      'OpenAI, Anthropic, or Google Gemini API Keys securely saved in Azure Key Vault',
      'Local vector store / ChromaDB or Cloudflare Vectorize bindings prepared',
      'Active Skool account for Sunday Cohort & 1-1 laboratory room access'
    ],
    postConditions: [
      'Interactive AI Agent / LLM application live on Cloudflare Workers AI / Pages',
      'Prompt evaluation and adversarial robustness score validated >= 90%',
      'Low latency streaming inference tested with sub-second response times',
      'Automated CI/CD GitHub Action passing all test suites and security scans',
      'Remediation roadmap & workshop completion badge issued via Skool platform'
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
    levelDetails: {
      l1: 'Memory Retention & DLP: session isolation to block credential leakage',
      l2: 'Prompt injection & jailbreak payload filtration filters',
      l3: 'Isolated sandbox containers & cluster audit logs'
    },
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
    levelDetails: {
      l1: 'Infrastructure as Code validation with ARM/Bicep and Terraform',
      l2: 'Zero-Trust credential pipelines with Azure Key Vault sync',
      l3: 'Cluster event routing via rifaterdemsahin/OpenShiftEventRouter'
    },
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
    levelDetails: {
      l1: 'Code quality analysis and static type checking',
      l2: 'Single Page Application edge deployment on Cloudflare Pages',
      l3: 'Production performance monitoring & automated health checks'
    },
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
      'Repository documentation and Skool comment triggers verified'
    ]
  }
];

export default function ConditionsMatrixView({ onOpenSkool }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" /> Sunday Cohorts & 1-1 Workshop Matrix
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Delivery Pilot Workshop Pre & Post Conditions Matrix
          </h3>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Each delivery track is broken down into 3 progressive experience levels. Copy your chosen track brief and post it as a comment on Skool before entering tonight’s call.
          </p>
        </div>

        <button
          onClick={() => onOpenSkool()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Book Sunday Cohort / 1-1</span>
        </button>
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

                <a
                  href={SKOOL_COMMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-orange-500 text-orange-400 hover:text-orange-300 font-bold text-xs flex items-center gap-2 self-start sm:self-auto shadow-md transition"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Skool 1-1 Post</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Levels breakdown row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div className="font-bold text-cyan-400 mb-1">Level 1: Fundamentals</div>
                  <p className="text-slate-400 text-[11px]">{track.levelDetails.l1}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div className="font-bold text-amber-400 mb-1">Level 2: Guardrails</div>
                  <p className="text-slate-400 text-[11px]">{track.levelDetails.l2}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div className="font-bold text-purple-400 mb-1">Level 3: Sandboxing</div>
                  <p className="text-slate-400 text-[11px]">{track.levelDetails.l3}</p>
                </div>
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
