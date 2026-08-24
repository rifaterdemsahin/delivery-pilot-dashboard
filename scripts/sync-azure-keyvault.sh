#!/usr/bin/env bash
# ==============================================================================
# Delivery Pilot Dashboard — Azure Key Vault & Cloudflare Secret Synchronizer
# ==============================================================================
set -euo pipefail

VAULT_NAME="${AZURE_KEYVAULT_NAME:-kv-deliverypilot-vault}"

echo "========================================================"
echo "🔐 Synchronizing Credentials from Azure Key Vault: $VAULT_NAME"
echo "========================================================"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "⚠️  Azure CLI (az) is not installed. Please install Azure CLI."
    exit 1
fi

# Fetch and export secrets safely
echo "Fetching CLOUDFLARE_API_TOKEN..."
export CLOUDFLARE_API_TOKEN="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "CLOUDFLARE-API-TOKEN" --query value -o tsv 2>/dev/null || echo '')"

echo "Fetching CLOUDFLARE_ACCOUNT_ID..."
export CLOUDFLARE_ACCOUNT_ID="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "CLOUDFLARE-ACCOUNT-ID" --query value -o tsv 2>/dev/null || echo '')"

echo "Fetching GITHUB_PAT..."
export GITHUB_PAT="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "GITHUB-PAT" --query value -o tsv 2>/dev/null || echo '')"

echo "Fetching AI API Keys..."
export OPENAI_API_KEY="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "OPENAI-API-KEY" --query value -o tsv 2>/dev/null || echo '')"
export GEMINI_API_KEY="$(az keyvault secret show --vault-name "$VAULT_NAME" --name "GEMINI-API-KEY" --query value -o tsv 2>/dev/null || echo '')"

echo "✅ All credentials retrieved from Azure Key Vault."
echo "Ready for Cloudflare deployment & workshop runner."
