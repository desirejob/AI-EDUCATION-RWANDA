#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
MODEL="${LLM_MODEL:-qwen3:4b}"

if ! command -v ollama >/dev/null 2>&1; then
  echo "Ollama is not installed. Install it from https://ollama.com/download, then run: ollama pull $MODEL" >&2
  exit 1
fi
if ! ollama list 2>/dev/null | awk 'NR>1 {print $1}' | grep -Fxq "$MODEL"; then
  echo "The model $MODEL is not installed. Download it once with: ollama pull $MODEL" >&2
  exit 1
fi

export LLM_BASE_URL="${LLM_BASE_URL:-http://127.0.0.1:11434/v1}"
export LLM_MODEL="$MODEL"
export PORT="${PORT:-8080}"
echo "Starting Umuseke with $LLM_MODEL at http://localhost:$PORT"
echo "Ollama must be running in the background. Stop this server with Ctrl+C."
cd "$PROJECT_DIR"
exec bash "$PROJECT_DIR/start.sh"
