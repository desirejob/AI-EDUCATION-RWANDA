#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : installe Node.js 20 ou plus récent." >&2
  exit 1
fi

NODE_MAJOR="$(node -p 'Number(process.versions.node.split(".")[0])')"
if (( NODE_MAJOR < 20 )); then
  echo "Erreur : Node.js 20+ est requis (version actuelle : $(node --version))." >&2
  exit 1
fi

export PORT=8080
exec bash "$PROJECT_DIR/start.sh"
