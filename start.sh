#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : Node.js est absent. Installe Node.js 20 ou plus récent." >&2
  exit 1
fi

NODE_MAJOR="$(node -p 'Number(process.versions.node.split(".")[0])')"
if (( NODE_MAJOR < 20 )); then
  echo "Erreur : Node.js 20+ est requis (version actuelle : $(node --version))." >&2
  exit 1
fi

if ! command -v pdftotext >/dev/null 2>&1; then
  echo "Attention : pdftotext n'est pas installé. Le site démarrera, mais l'import PDF ne fonctionnera pas." >&2
  echo "Ubuntu/Debian : sudo apt install poppler-utils" >&2
fi

PORT="${PORT:-8000}"
export PORT
if [[ -z "${LLM_BASE_URL:-}" ]] && command -v ollama >/dev/null 2>&1; then
  AVAILABLE_MODELS="$(ollama list 2>/dev/null | awk 'NR>1 {print $1}' || true)"
  if grep -Fxq "${LLM_MODEL:-qwen3:4b}" <<<"$AVAILABLE_MODELS"; then
    export LLM_MODEL="${LLM_MODEL:-qwen3:4b}"
    export LLM_BASE_URL="http://127.0.0.1:11434/v1"
    echo "Modèle IA local détecté : $LLM_MODEL"
  elif grep -Fxq "llama3.2:1b" <<<"$AVAILABLE_MODELS"; then
    export LLM_MODEL="llama3.2:1b"
    export LLM_BASE_URL="http://127.0.0.1:11434/v1"
    echo "Modèle IA local détecté : $LLM_MODEL"
  fi
fi
echo "Dossier du projet : $PROJECT_DIR"
echo "Tentative de démarrage sur http://localhost:$PORT."
echo "Arrêt : Ctrl+C"
exec node server.mjs
