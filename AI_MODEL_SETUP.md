# Optional local AI tutor (Qwen or Llama)

The app runs without an LLM and returns source-grounded lesson explanations. For a more conversational tutor, install [Ollama](https://ollama.com/download), then download one model once:

```bash
ollama pull qwen3:4b
```

Start Ollama (`ollama serve` if it is not already running), then run the app from the project folder:

```bash
./start-qwen.sh
```

The launcher uses `qwen3:4b` and port `8080` by default. To use a Llama model already downloaded with Ollama:

```bash
LLM_MODEL=llama3.2:1b ./start-qwen.sh
```

The model is never downloaded automatically. If your computer has limited memory, keep a 3B model; larger models need more memory and may answer more slowly. You can override `LLM_MODEL`, `LLM_BASE_URL`, or `PORT` in the shell. The server sends the learner question and matching local lesson passages to the configured model. Do not put student names, contact details or other personal information in prompts.

Umuseke uses Ollama's local chat API with Qwen's thinking mode disabled for shorter tutoring replies. On machines where the model is slow, the app switches to its source-grounded lesson explanation after 12 seconds rather than keeping the learner waiting. See [Ollama's official API documentation](https://github.com/ollama/ollama/blob/main/docs/api.md).

The summaries in `server.mjs` provide basic Kinyarwanda support without an LLM. For open-ended Kinyarwanda dialogue, configure Qwen/Llama and have a fluent Kinyarwanda educator review responses before classroom use. Translation quality has not been evaluated with native speakers.
