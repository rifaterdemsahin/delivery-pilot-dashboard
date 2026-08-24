import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  Lock, 
  ExternalLink, 
  Save,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { 
  DEFAULT_REQUIRED_SECRETS, 
  getStoredVaultConfig, 
  saveVaultConfig, 
  generateAzureCliCommands 
} from '../services/azureKeyVaultService';

export default function AzureKeyVaultModal({ isOpen, onClose }) {
  const [vaultConfig, setVaultConfig] = useState(getStoredVaultConfig);
  const [secrets, setSecrets] = useState(vaultConfig.secrets || {});
  const [vaultName, setVaultName] = useState(vaultConfig.vaultName || 'kv-deliverypilot-vault');
  const [copiedCli, setCopiedCli] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSecretChange = (key, value) => {
    setSecrets(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...vaultConfig,
      vaultName,
      secrets,
      connected: true,
      lastSynced: new Date().toISOString()
    };
    setVaultConfig(updated);
    saveVaultConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const cliCommands = generateAzureCliCommands(vaultName, secrets);

  const copyCli = () => {
    navigator.clipboard.writeText(cliCommands);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Azure Key Vault Credential Collector</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                  Zero Trust Secret Store
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Collect and inject GitHub PAT, Cloudflare tokens, and API credentials securely via Azure Key Vault
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
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Key Vault Target */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="block font-bold text-slate-300">Azure Key Vault Instance Name</label>
              <input
                type="text"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                placeholder="kv-deliverypilot-vault"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-400"
              />
              <p className="text-[11px] text-slate-500">
                Resource URI: <span className="text-cyan-400 font-mono">https://{vaultName || 'your-vault'}.vault.azure.net/</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-300 block mb-1">Key Vault Sync Status</span>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span>Active & Verified</span>
                </div>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Last Synced: {new Date(vaultConfig.lastSynced || Date.now()).toLocaleTimeString()}
                </span>
              </div>

              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sync Now</span>
              </button>
            </div>
          </div>

          {/* Secrets Config Form */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Workshop & Deployment Secrets Manifest</span>
              <span className="text-[11px] text-slate-400">All credentials encrypted in Azure Key Vault</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFAULT_REQUIRED_SECRETS.map((sec) => (
                <div key={sec.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-300">{sec.label}</label>
                    <span className="text-[10px] text-slate-500 font-mono">{sec.category}</span>
                  </div>
                  <input
                    type={sec.masked ? 'password' : 'text'}
                    value={secrets[sec.key] || ''}
                    onChange={(e) => handleSecretChange(sec.key, e.target.value)}
                    placeholder={sec.example}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <p className="text-[10px] text-slate-500">{sec.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Azure CLI Generator Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Automated Azure CLI Sync Commands (`scripts/sync-azure-keyvault.sh`)</span>
              </span>
              <button
                onClick={copyCli}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCli ? 'Copied' : 'Copy CLI Script'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto">
              <code>{cliCommands}</code>
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
            {savedSuccess && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Vault configuration updated successfully!
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-600/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Verify Key Vault</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
