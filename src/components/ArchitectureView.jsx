import React from 'react';
import { 
  KeyRound, 
  Cloud, 
  GraduationCap, 
  FolderGit2, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Globe, 
  ArrowRight, 
  Database,
  ExternalLink
} from 'lucide-react';

const SKOOL_COMMENT_URL = 'https://www.skool.com/delivery-pilot-8938/1-1-workshops?p=65f6a56e';

export default function ArchitectureView({ onOpenVault, onOpenCloudflare, onOpenSkool }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/50 border border-slate-800 shadow-xl">
        <h3 className="text-2xl font-black text-white mb-2">
          Delivery Pilot Cloud Architecture & Security Specification
        </h3>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          How the Delivery Pilot Dashboard securely connects Rifat Erdem Sahin&apos;s GitHub repository ecosystem with <strong className="text-amber-400">Azure Key Vault</strong> for zero-trust secret management, <strong className="text-orange-400">Cloudflare Pages & Workers</strong> for global edge deployment, and <strong className="text-yellow-400">Skool</strong> for cohort delivery.
        </p>
      </div>

      {/* Architecture Flow Diagram (Visual Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1: Secret Vault */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 flex flex-col justify-between shadow-lg hover:border-amber-500/60 transition">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Layer 1: Security</span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">Azure Key Vault</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All credentials (GitHub PAT, Cloudflare API Token, OpenAI & Gemini API keys, Service Principals) are encrypted at rest in Azure Key Vault with RBAC policies.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero plaintext keys in code</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Automated sync via Azure CLI</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Audit logging and rotation</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenVault}
            className="mt-6 w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/30 transition flex items-center justify-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Configure Azure Key Vault</span>
          </button>
        </div>

        {/* Step 2: Cloudflare Deployment */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-orange-500/30 flex flex-col justify-between shadow-lg hover:border-orange-500/60 transition">
          <div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
              <Cloud className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Layer 2: Edge Delivery</span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">Cloudflare Pages & Workers</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              The dashboard and workshop projects deploy directly to Cloudflare Edge. Lightning-fast response times, instant cache invalidation, and custom domains.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Wrangler CLI automated build</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                <span>Global 300+ CDN edge points</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                <span>DDoS protection & SSL edge</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenCloudflare}
            className="mt-6 w-full py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 font-semibold text-xs border border-orange-500/30 transition flex items-center justify-center gap-2"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloudflare Deploy Specs</span>
          </button>
        </div>

        {/* Step 3: Skool Cohort Delivery */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-400/30 flex flex-col justify-between shadow-lg hover:border-amber-400/60 transition">
          <div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Layer 3: Community & Cohorts</span>
            <h4 className="text-lg font-bold text-white mt-1 mb-2">Skool Platform Comment</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Participants build their customized interest basket, copy the structured brief, and paste it as a comment on Skool before joining tonight&apos;s 1-1 or Sunday Cohort call.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>1-1 AI Security VIP template</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Levels 1, 2 & 3 repository tracks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct link to Skool post</span>
              </li>
            </ul>
          </div>

          <a
            href={SKOOL_COMMENT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 hover:from-amber-400 hover:to-orange-400"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Open Skool 1-1 Post</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Secret Syncing Pipeline Script Reference */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-sm flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Azure Key Vault to Cloudflare Sync Script (`scripts/sync-azure-keyvault.sh`)</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">Bash Shell Automated Utility</span>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
{`#!/usr/bin/env bash
# Synchronize credentials from Azure Key Vault to Cloudflare Environment
set -euo pipefail

VAULT_NAME="\${AZURE_KEYVAULT_NAME:-dp-kv-deliverypilot}"
echo "Fetching credentials from Azure Key Vault: $VAULT_NAME..."

export CLOUDFLARE_API_TOKEN="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "cloudflare-api-token" --query value -o tsv)"
export CLOUDFLARE_ACCOUNT_ID="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "cloudflare-account-id" --query value -o tsv)"
export GITHUB_PAT="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "github-pat" --query value -o tsv)"

echo "✓ Credentials securely loaded into process environment."
echo "Triggering Cloudflare deployment..."
npx wrangler pages deploy dist --project-name=delivery-pilot-dashboard`}
        </pre>
      </div>
    </div>
  );
}
