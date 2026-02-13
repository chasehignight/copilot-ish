import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;
const OLLAMA_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';
const TIMEOUT_MS = 60000;

app.use(cors());
app.use(express.json());

/**
 * Call Ollama API with timeout
 */
async function askOllama(prompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: DEFAULT_OLLAMA_MODEL,
        prompt: prompt,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Request timeout - model took too long to respond');
    }

    // Check if Ollama server is not running
    if (error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
      throw new Error('Ollama server is not running. Start it with: ollama serve');
    }

    throw error;
  }
}

/**
 * Convert conversation messages to a single prompt
 */
function messagesToPrompt(messages) {
  const systemPrompt = `You are a helpful assistant. Format ALL responses with emojis, clear structure, and visual hierarchy.

CRITICAL RULES - FOLLOW EVERY TIME:
1. ALWAYS start responses with a relevant emoji
2. ALWAYS use BOLD section headers with emojis (format: **🎯 Section Title**)
3. ALWAYS add blank lines between sections
4. Use bold (**text**) ONLY for section headers, never in body text
5. Keep paragraphs 2-4 lines maximum

RESPONSE FORMAT:

[Opening emoji] Brief intro sentence in plain text.

**[Emoji] First Section Header**

Short paragraph explaining the concept. Keep it conversational and clear. Maximum 3-4 lines per paragraph.

**[Emoji] Second Section Header**

Another clear explanation here. Use simple language.

Key points:
- First bullet point
- Second bullet point
- Third bullet point

**[Emoji] Final Section**

Closing thoughts or next steps here.

EXAMPLES OF PERFECT RESPONSES:

User asks: "What is TypeScript?"

Response:
🚀 TypeScript is JavaScript with superpowers—it adds static typing to catch errors before your code runs.

**💡 Why TypeScript Matters**

TypeScript helps you write more reliable code by catching bugs during development instead of at runtime. It's like having a safety net that catches mistakes before they reach production.

**📋 Key Features**

- Type checking catches errors early
- Better IDE support with autocomplete
- Easier refactoring and maintenance
- Scales well for large codebases

**✨ Getting Started**

You can start using TypeScript today by installing it via npm and adding a tsconfig.json file to your project. The learning curve is gentle since any valid JavaScript is also valid TypeScript.

REMEMBER:
- Use emojis liberally 🎨
- Keep formatting clean and scannable 📖
- Break up long text into digestible chunks 🍰
- Make it feel friendly and approachable 😊

`;

  const conversation = messages.map(msg => {
    const prefix = msg.role === 'user' ? 'User: ' : 'Assistant: ';
    return prefix + msg.content;
  }).join('\n\n');

  return systemPrompt + conversation + '\n\nAssistant: ';
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Convert conversation to prompt
    const prompt = messagesToPrompt(messages);

    // Call Ollama
    const responseText = await askOllama(prompt);

    res.json({
      content: responseText,
      model: DEFAULT_OLLAMA_MODEL,
      provider: 'ollama'
    });
  } catch (error) {
    console.error('Error calling Ollama:', error);

    // Return user-friendly error message
    const friendlyMessage = error.message.includes('ollama serve')
      ? error.message
      : `Local model error: ${error.message}`;

    res.json({
      content: friendlyMessage,
      error: true,
      model: DEFAULT_OLLAMA_MODEL
    });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  let ollamaRunning = false;
  let availableModels = [];

  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`, {
      signal: AbortSignal.timeout(5000)
    });

    if (response.ok) {
      const data = await response.json();
      ollamaRunning = true;
      availableModels = data.models?.map(m => m.name) || [];
    }
  } catch (error) {
    // Ollama not running
  }

  res.json({
    status: 'ok',
    service: 'copilot-chat-api',
    provider: 'ollama',
    ollamaRunning,
    model: DEFAULT_OLLAMA_MODEL,
    availableModels
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Chat API running on http://localhost:${PORT}`);
  console.log(`🤖 Using Ollama model: ${DEFAULT_OLLAMA_MODEL}`);
  console.log(`📡 Ollama endpoint: ${OLLAMA_URL}`);
  console.log(`💡 Make sure Ollama is running: ollama serve`);
});
