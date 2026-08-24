#!/usr/bin/env bash
set -euo pipefail

echo "==> Running Repo Data Enrichment..."
npm run enrich

echo "==> Running Vite Production Build..."
npm run build

echo "==> Build Completed Successfully! Output in dist/"
ls -la dist/
