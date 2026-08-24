// Azure Key Vault & Cloudflare credential management utilities

export const DEFAULT_REQUIRED_SECRETS = [
  {
    key: 'AZURE_KEYVAULT_NAME',
    label: 'Azure Key Vault Name',
    description: 'Name of the Azure Key Vault instance (e.g. kv-deliverypilot-prod)',
    category: 'Azure Infrastructure',
    required: true,
    masked: false,
    example: 'kv-deliverypilot-prod'
  },
  {
    key: 'CLOUDFLARE_API_TOKEN',
    label: 'Cloudflare API Token',
    description: 'API Token with Account.Cloudflare Pages & Workers permissions',
    category: 'Cloudflare Edge Deployment',
    required: true,
    masked: true,
    example: 'v1.0-xxxx-yyyy-zzzz'
  },
  {
    key: 'CLOUDFLARE_ACCOUNT_ID',
    label: 'Cloudflare Account ID',
    description: 'Your Cloudflare Account ID found in the dashboard overview',
    category: 'Cloudflare Edge Deployment',
    required: true,
    masked: false,
    example: '8b7a48d910f54546a1e5...'
  },
  {
    key: 'GITHUB_PAT',
    label: 'GitHub Personal Access Token',
    description: 'Token with repo access to fetch private repos & trigger actions',
    category: 'GitHub VCS',
    required: true,
    masked: true,
    example: 'ghp_xxxxxxxxxxxxxxxxxxxx'
  },
  {
    key: 'OPENAI_API_KEY',
    label: 'OpenAI API Key',
    description: 'API Key for AI & Agentic workshop labs',
    category: 'AI / LLM Services',
    required: false,
    masked: true,
    example: 'sk-proj-xxxx...'
  },
  {
    key: 'GEMINI_API_KEY',
    label: 'Google Gemini API Key',
    description: 'API Key for Google Cloud / Gemini AI pipelines',
    category: 'AI / LLM Services',
    required: false,
    masked: true,
    example: 'AIzaSy...'
  }
];

const STORAGE_KEY = 'delivery_pilot_vault_config';

export function getStoredVaultConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse stored vault config:', e);
  }
  return {
    vaultName: 'kv-deliverypilot-vault',
    azureTenantId: '',
    azureSubscriptionId: '',
    connected: true,
    lastSynced: new Date().toISOString(),
    secrets: {
      AZURE_KEYVAULT_NAME: 'kv-deliverypilot-vault',
      CLOUDFLARE_API_TOKEN: 'cf_sec_••••••••••••••••••••',
      CLOUDFLARE_ACCOUNT_ID: 'd7a12b489ef039ac89304e',
      GITHUB_PAT: 'ghp_••••••••••••••••••••',
      OPENAI_API_KEY: 'sk-proj-••••••••••••••••••••',
      GEMINI_API_KEY: 'AIzaSy••••••••••••••••••••'
    }
  };
}

export function saveVaultConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save vault config:', e);
  }
}

export function generateAzureCliCommands(vaultName, secrets = {}) {
  const vName = vaultName || 'kv-deliverypilot-vault';
  const lines = [
    `# 1. Login to Azure CLI and set active subscription`,
    `az login`,
    `az account set --subscription "<YOUR_SUBSCRIPTION_ID>"`,
    ``,
    `# 2. Create Resource Group & Key Vault (if not created)`,
    `az group create --name rg-deliverypilot --location uksouth`,
    `az keyvault create --name "${vName}" --resource-group rg-deliverypilot --location uksouth --enable-rbac-authorization false`,
    ``,
    `# 3. Store deployment credentials securely in Azure Key Vault`
  ];

  DEFAULT_REQUIRED_SECRETS.forEach((sec) => {
    const val = secrets[sec.key] || `<YOUR_${sec.key}>`;
    lines.push(`az keyvault secret set --vault-name "${vName}" --name "${sec.key}" --value "${val}"`);
  });

  lines.push(``);
  lines.push(`# 4. Verify stored secrets in Azure Key Vault`);
  lines.push(`az keyvault secret list --vault-name "${vName}" --output table`);
  lines.push(``);
  lines.push(`# 5. Pull secrets into local environment or CI/CD`);
  lines.push(`bash scripts/sync-azure-keyvault.sh --vault "${vName}"`);

  return lines.join('\n');
}
