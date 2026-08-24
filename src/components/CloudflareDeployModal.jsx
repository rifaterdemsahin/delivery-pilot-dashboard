import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Terminal, 
  Copy, 
  Check, 
  Globe, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  Layers
} from 'lucide-react';

export default function CloudflareDeployModal({ isOpen, onClose }) {
  const [copiedWrangler, setCopiedWrangler] = useState(false);
  const [copiedAction, setCopiedAction] = useState(false);

  if (!isOpen) return null;

  const wranglerCommands = `# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Authenticate with Cloudflare API Token (from Azure Key Vault)
export CLOUDFLARE_API_TOKEN="$(az keyvault secret show --vault-name kv-deliverypilot-vault --name CLOUDFLARE_API_TOKEN --query value -o tsv)"
export CLOUDFLARE_ACCOUNT_ID="$(az keyvault secret show --vault-name kv-deliverypilot-vault --name CLOUDFLARE_ACCOUNT_ID --query value -o tsv)"

# 3. Build project
npm run build

# 4. Deploy directly to Cloudflare Pages
npx wrangler pages deploy dist --project-name=delivery-pilot-dashboard --branch=main`;

  const githubActionYaml = `name: Cloudflare Pages Deployment

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Dashboard
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: delivery-pilot-dashboard
          directory: dist
          gitHubToken: \${{ secrets.GITHUB_TOKEN }}`;

  const copyWrangler = () => {
    navigator.clipboard.writeText(wranglerCommands);
    setCopiedWrangler(true);
    setTimeout(() => setCopiedWrangler(false), 2000);
  };

  const copyAction = () => {
    navigator.clipboard.writeText(githubActionYaml);
    setCopiedAction(true);
    setTimeout(() => setCopiedAction(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Cloudflare Edge Deployment Architecture</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-800 font-semibold">
                  Pages & Workers
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                High-performance static hosting, zero-latency global edge network, and automated CI/CD
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-orange-400 mb-1">
                <Globe className="w-4 h-4" /> Global CDN Edge
              </div>
              <p className="text-slate-400 text-[11px]">300+ edge locations worldwide with sub-50ms TTFB.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
                <Zap className="w-4 h-4" /> Instant Invalidation
              </div>
              <p className="text-slate-400 text-[11px]">Atomic deployments and instant rollbacks on every push.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" /> Edge Security
              </div>
              <p className="text-slate-400 text-[11px]">Free SSL/TLS, DDoS mitigation, and custom headers.</p>
            </div>
          </div>

          {/* Wrangler CLI Instructions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-400" />
                <span>Wrangler CLI Deploy Commands</span>
              </span>
              <button
                onClick={copyWrangler}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                {copiedWrangler ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWrangler ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto">
              <code>{wranglerCommands}</code>
            </pre>
          </div>

          {/* GitHub Actions CI/CD workflow */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>GitHub Actions CI/CD Workflow (`.github/workflows/deploy-cloudflare.yml`)</span>
              </span>
              <button
                onClick={copyAction}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                {copiedAction ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAction ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-48">
              <code>{githubActionYaml}</code>
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
