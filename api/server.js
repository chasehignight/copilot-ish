import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const PORT = 3001;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Configure CORS to allow GitHub Pages
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://chasehignight.github.io'
  ],
  credentials: true
}));
app.use(express.json());

/**
 * Format system prompt for better responses
 */
const SYSTEM_PROMPT = `You are a helpful assistant. Format ALL responses with emojis, clear structure, and visual hierarchy.

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

REMEMBER:
- Use emojis liberally 🎨
- Keep formatting clean and scannable 📖
- Break up long text into digestible chunks 🍰
- Make it feel friendly and approachable 😊
`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    // Extract the text content from Claude's response
    const content = response.content[0].text;

    res.json({
      content: content,
      model: response.model,
      provider: 'anthropic',
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);

    // Return user-friendly error message
    const errorMessage = error.message || 'An error occurred';

    res.status(500).json({
      content: `❌ **Error**\n\nSorry, I encountered an error: ${errorMessage}`,
      error: true,
      model: 'claude-3-haiku-20240307',
    });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;

  res.json({
    status: 'ok',
    service: 'copilot-chat-api',
    provider: 'anthropic',
    model: 'claude-3-haiku-20240307',
    apiKeyConfigured: hasApiKey,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Chat API running on http://localhost:${PORT}`);
  console.log(`🤖 Using Claude 3 Haiku`);
  console.log(`🔑 API Key configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes ✓' : 'No ✗'}`);
});
