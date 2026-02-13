# Ollama Integration Guide

This app now uses **Ollama** for local LLM responses instead of cloud APIs. No API keys required!

## Architecture

- **Frontend**: React app (localhost:5173) - unchanged
- **Backend**: Express API (localhost:3001) - calls Ollama
- **Ollama**: Local LLM server (localhost:11434)

The frontend sends messages to the Express backend, which forwards them to Ollama and returns responses.

## Prerequisites

1. **macOS with Homebrew** installed
2. **Node.js** (already have if you ran npm install)

## Installation

### 1. Install Ollama

```bash
brew install ollama
```

### 2. Start Ollama Server

**Option A - Foreground (recommended for testing):**
```bash
ollama serve
```

**Option B - Background:**
```bash
nohup ollama serve >/tmp/ollama.log 2>&1 &
```

### 3. Pull a Model

```bash
# Default model (recommended, 4.9GB)
ollama pull llama3.1:8b

# Other options:
ollama pull llama3.1:70b    # More powerful, 40GB
ollama pull codellama:7b    # Code-specialized, 3.8GB  
ollama pull mistral:7b      # Fast and capable, 4.1GB
```

### 4. Verify Installation

```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# Test generation
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Say hello",
  "stream": false
}'
```

## Running the App

You need **3 terminals**:

### Terminal 1 - Ollama Server
```bash
ollama serve
```

### Terminal 2 - Backend API
```bash
cd ~/ClaudeSandbox/projects/copilot-ui-clone
npm run api
```

### Terminal 3 - Frontend
```bash
cd ~/ClaudeSandbox/projects/copilot-ui-clone
npm run dev
```

Then open: **http://localhost:5173**

## Configuration

Edit `.env` to change the model (optional):

```bash
# Use a different model
OLLAMA_MODEL=mistral:7b
```

## Troubleshooting

### "Ollama server is not running"

Start Ollama:
```bash
ollama serve
```

### Model not found

Pull the model first:
```bash
ollama pull llama3.1:8b
```

### Slow responses

- First request is slower (model loads into memory)
- Subsequent requests are faster
- Try a smaller model like `mistral:7b`

### Check what's running

```bash
# Ollama
curl http://localhost:11434/api/tags

# Backend API  
curl http://localhost:3001/api/health

# Frontend
curl http://localhost:5173
```

## File Changes

### Modified Files

1. **api/server.js** - Complete rewrite
   - Removed: Anthropic SDK
   - Added: `askOllama()` function with timeout/error handling
   - Added: `messagesToPrompt()` for conversation formatting
   - Changed: `/api/chat` endpoint to call Ollama
   - Enhanced: `/api/health` to report Ollama status

2. **.env** - Replaced Anthropic config
   - Removed: ANTHROPIC_API_KEY
   - Added: OLLAMA_MODEL (optional override)
   - Added: Documentation for available models

### No Changes Needed

- **src/App.tsx** - Frontend unchanged (still calls same API)
- **package.json** - No new dependencies needed
- All other files unchanged

## API Endpoints

### POST /api/chat

Request:
```json
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

Response:
```json
{
  "content": "Hello! How can I help you today?",
  "model": "llama3.1:8b",
  "provider": "ollama"
}
```

### GET /api/health

Response:
```json
{
  "status": "ok",
  "service": "copilot-chat-api",
  "provider": "ollama",
  "ollamaRunning": true,
  "model": "llama3.1:8b",
  "availableModels": ["llama3.1:8b"]
}
```

## Model Comparison

| Model | Size | Speed | Quality | Use Case |
|-------|------|-------|---------|----------|
| llama3.1:8b | 4.9GB | Fast | Good | Default, balanced |
| llama3.1:70b | 40GB | Slow | Excellent | Best quality |
| mistral:7b | 4.1GB | Very Fast | Good | Quick responses |
| codellama:7b | 3.8GB | Fast | Good | Code tasks |

## Technical Details

### Request Flow

1. User types message in frontend (React)
2. Frontend POSTs to `http://localhost:3001/api/chat`
3. Express backend receives request
4. Backend calls `askOllama(prompt)`
5. `askOllama()` POSTs to `http://localhost:11434/api/generate`
6. Ollama generates response
7. Backend returns response to frontend
8. Frontend displays message

### Error Handling

- **Ollama not running**: Returns friendly error message
- **Model not loaded**: Ollama auto-loads on first request (slower)
- **Timeout**: 60s timeout with AbortController
- **Network errors**: Graceful error messages

### Conversation Format

Messages are converted to a prompt format:

```
User: What's the capital of France?