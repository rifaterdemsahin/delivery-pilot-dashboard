import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawRepos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/repos.json'), 'utf8'));

// Permanent exclusion blocklist (behind-the-scenes auto exclusion)
const EXCLUDED_NAMES = new Set([
  'saa',
  'saa-pass',
  '12-step',
  '12step',
  '12_step',
  '12-steps',
  '12steps',
  '12-step-program',
  '12_step_program',
  '12stepprogram',
  'twelve-step',
  'twelve-steps',
  'twelve-step-program'
]);

const EXCLUDED_PATTERNS = [
  /\bsaa\b/i,
  /\b12[\s-_]?steps?(\s*program)?\b/i,
  /\btwelve[\s-_]?steps?(\s*program)?\b/i,
  /\bstep\s+program\b/i
];

function isExcluded(repo) {
  const name = (repo.name || '').toLowerCase().trim();
  const desc = (repo.description || '').toLowerCase().trim();
  if (EXCLUDED_NAMES.has(name)) return true;
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(name) || pattern.test(desc)) return true;
  }
  return false;
}

function inferCategory(repo) {
  const name = (repo.name || '').toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.primaryLanguage?.name || '').toLowerCase();
  const combined = `${name} ${desc}`;

  if (
    combined.includes('ai') || 
    combined.includes('llm') || 
    combined.includes('agent') || 
    combined.includes('gpt') || 
    combined.includes('model') || 
    combined.includes('prompt') || 
    combined.includes('intelligence') ||
    name.startsWith('ai-') ||
    name.endsWith('-ai')
  ) {
    return 'AI & LLM';
  }

  if (
    combined.includes('security') || 
    combined.includes('adversarial') || 
    combined.includes('attack') || 
    combined.includes('evasion') || 
    combined.includes('defense') || 
    combined.includes('vulnerability') ||
    combined.includes('firewall') ||
    combined.includes('auth')
  ) {
    return 'Cybersecurity & Adversarial';
  }

  if (
    combined.includes('azure') || 
    combined.includes('cloud') || 
    combined.includes('aws') || 
    combined.includes('gcp') || 
    combined.includes('terraform') || 
    combined.includes('docker') || 
    combined.includes('k8s') || 
    combined.includes('kubernetes') || 
    combined.includes('devops') || 
    combined.includes('ansible') || 
    combined.includes('pipeline') ||
    combined.includes('cloudflare') ||
    lang === 'hcl' || 
    lang === 'dockerfile'
  ) {
    return 'Cloud & DevOps';
  }

  if (
    combined.includes('script') || 
    combined.includes('tool') || 
    combined.includes('cli') || 
    combined.includes('auto') || 
    combined.includes('crawler') || 
    combined.includes('terminal') || 
    lang === 'shell' || 
    lang === 'powershell' || 
    lang === 'batchfile' || 
    lang === 'autohotkey'
  ) {
    return 'Automation & Tooling';
  }

  if (
    lang === 'javascript' || 
    lang === 'typescript' || 
    lang === 'html' || 
    lang === 'css' || 
    combined.includes('dashboard') || 
    combined.includes('web') || 
    combined.includes('app') || 
    combined.includes('portal')
  ) {
    return 'FullStack & Web Apps';
  }

  return 'Engineering & Architecture';
}

function getPreConditions(category, repo) {
  const base = [
    'GitHub Account with Repo Access & SSH/PAT key configured',
    'Azure CLI (az) & Azure Subscription with Key Vault Read/Write permissions',
    'Cloudflare Account & API Token (Pages / Workers permissions)'
  ];

  if (category === 'AI & LLM') {
    return [
      ...base,
      'OpenAI / Anthropic / Google Gemini API Keys loaded into Azure Key Vault',
      'Python 3.10+ or Node.js 18+ runtime environment',
      'Local vector store or embeddings cache setup'
    ];
  }

  if (category === 'Cybersecurity & Adversarial') {
    return [
      ...base,
      'Isolated sandbox / Docker containerized lab environment',
      'Security testing credentials configured in Azure Key Vault',
      'Compliance and safety guardrails acknowledgment'
    ];
  }

  if (category === 'Cloud & DevOps') {
    return [
      ...base,
      'Terraform / OpenTofu or ARM/Bicep CLI installed',
      'Cloudflare Wrangler CLI configured with CLOUDFLARE_API_TOKEN',
      'Azure Service Principal with Key Vault Secrets User role'
    ];
  }

  if (category === 'Automation & Tooling') {
    return [
      ...base,
      'Bash / PowerShell 7+ execution environment',
      'Environment secret mapping script `sync-azure-keyvault.sh` executed',
      'Docker engine active for local container testing'
    ];
  }

  return [
    ...base,
    'Node.js 18+ and modern package manager (npm / pnpm)',
    'Cloudflare Pages build target set to `dist`',
    'Wrangler CLI installed globally for instant local preview'
  ];
}

function getPostConditions(category, repo) {
  const base = [
    'Repository successfully cloned, built, and verified without error',
    'All production secrets synced from Azure Key Vault to Cloudflare Environment',
    'Automated GitHub Actions CI/CD pipeline triggered and completed green'
  ];

  if (category === 'AI & LLM') {
    return [
      ...base,
      'Live AI agent / model pipeline deployed to Cloudflare Workers / Pages',
      'Prompt eval benchmark score >= 90% in test assertions',
      'Streaming responses tested with latency < 800ms'
    ];
  }

  if (category === 'Cybersecurity & Adversarial') {
    return [
      ...base,
      'Adversarial test vectors evaluated with defense telemetry active',
      'Audit log exported to Azure Storage / Key Vault event logs',
      'Zero plaintext credentials in repository commit history'
    ];
  }

  if (category === 'Cloud & DevOps') {
    return [
      ...base,
      'Infrastructure state locked and committed via Terraform / Bicep',
      'Cloudflare custom domain SSL / TLS edge security operational',
      'Key Vault automated secret rotation trigger configured'
    ];
  }

  return [
    ...base,
    'Production build deployed to Cloudflare Pages with live verification URL',
    'Zero console errors and 100% Lighthouse Performance & Best Practices score',
    'Delivery Pilot sign-off and Skool workshop cohort attendance recorded'
  ];
}

function getBuildInstructions(repo, category) {
  const lang = repo.primaryLanguage?.name || '';
  if (lang === 'JavaScript' || lang === 'TypeScript' || lang === 'HTML') {
    return {
      setup: 'npm install',
      run: 'npm run dev',
      build: 'npm run build',
      deploy: 'npx wrangler pages deploy dist'
    };
  }
  if (lang === 'Python') {
    return {
      setup: 'python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt',
      run: 'python main.py',
      build: 'python -m compileall .',
      deploy: 'npx wrangler deploy'
    };
  }
  if (lang === 'Shell' || lang === 'PowerShell') {
    return {
      setup: 'chmod +x *.sh && ./scripts/sync-azure-keyvault.sh',
      run: './run.sh',
      build: 'shellcheck *.sh || true',
      deploy: 'git push origin main'
    };
  }
  if (lang === 'C#') {
    return {
      setup: 'dotnet restore',
      run: 'dotnet run',
      build: 'dotnet build --configuration Release',
      deploy: 'dotnet publish -c Release'
    };
  }
  return {
    setup: 'git submodule update --init --recursive',
    run: 'open index.html',
    build: 'npm run build || true',
    deploy: 'npx wrangler pages deploy .'
  };
}

const filteredRaw = rawRepos.filter(r => !isExcluded(r));

const enrichedRepos = filteredRaw.map((r, idx) => {
  const category = inferCategory(r);
  return {
    id: idx + 1,
    name: r.name,
    visibility: r.visibility || (r.isPrivate ? 'PRIVATE' : 'PUBLIC'),
    isPrivate: Boolean(r.isPrivate),
    description: r.description || `Delivery Pilot workshop repository for ${r.name}`,
    url: r.url || `https://github.com/rifaterdemsahin/${r.name}`,
    updatedAt: r.updatedAt,
    language: r.primaryLanguage?.name || 'Markdown/Docs',
    stargazerCount: r.stargazerCount || 0,
    isFork: Boolean(r.isFork),
    category,
    preConditions: getPreConditions(category, r),
    postConditions: getPostConditions(category, r),
    build: getBuildInstructions(r, category),
    estimatedDuration: '45 - 90 mins',
    skoolModule: `Delivery Pilot Track: ${category}`
  };
});

fs.writeFileSync(
  path.join(__dirname, '../src/data/reposData.json'),
  JSON.stringify(enrichedRepos, null, 2)
);

console.log(`Successfully enriched ${enrichedRepos.length} repositories into src/data/reposData.json (excluded ${rawRepos.length - filteredRaw.length} repositories)`);
