# Copilot UI Clone with Claude AI

A beautiful, fully functional recreation of Microsoft Copilot's interface with real AI chat powered by Claude.

## Features

- 🎨 Pixel-perfect dark UI matching Microsoft Copilot
- 🤖 Real AI chat powered by Claude Sonnet 4
- 💬 Conversational interface with message history
- ⚡ Real-time responses with loading states
- 🎯 Quick prompt suggestions
- 📱 Responsive layout with Tailwind CSS
- 🔄 Auto-scrolling chat
- ⌨️ Enter to send messages

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v3
- **Backend**: Express.js + Anthropic SDK
- **AI Model**: Claude Sonnet 4.5

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key (Optional)

To use real Claude AI responses, add your Anthropic API key to `.env`:

```bash
# .env
ANTHROPIC_API_KEY=your-api-key-here
```

Get your API key at: https://console.anthropic.com/

**Note:** If you don't add an API key, the app will still work with mock error messages explaining how to configure it.

### 3. Start the Servers

You need to run **both** the frontend and backend:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
This starts the Vite dev server at `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
npm run api
```
This starts the Express API server at `http://localhost:3001`

### 4. Open the App

Navigate to `http://localhost:5173` in your browser.

## Usage

1. **Type a message** in the composer at the bottom
2. **Press Enter** or click the send button
3. Watch Claude respond in real-time!
4. **Click quick prompts** for instant suggestions
5. Messages stay in conversation history

## Project Structure

```
copilot-ui-clone/
├── api/
│   └── server.js          # Express backend with Claude API
├── src/
│   ├── App.tsx            # Main chat UI with state management
│   ├── index.css          # Tailwind imports and base styles
│   └── main.tsx           # React entry point
├── .env                   # API key configuration
├── tailwind.config.js     # Tailwind v3 configuration
├── postcss.config.js      # PostCSS configuration
└── package.json
```

## Components

### Frontend (App.tsx)

- **Sidebar**: Navigation with Agents, Notebooks, Chat history
- **MessageBubble**: Individual chat messages with styling
- **Composer**: Message input with send button and keyboard support
- **PromptCard**: Clickable quick prompt suggestions
- **Loading State**: Animated dots while waiting for response

### Backend (api/server.js)

- **POST /api/chat**: Sends messages to Claude and returns responses
- **GET /api/health**: Health check endpoint
- Handles conversation history
- Graceful error handling with mock responses

## API Endpoints

### POST /api/chat

Request:
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi there!" }
  ]
}
```

Response:
```json
{
  "content": "Response from Claude",
  "id": "msg_xyz",
  "model": "claude-sonnet-4-20250514"
}
```

### GET /api/health

Response:
```json
{
  "status": "ok",
  "service": "copilot-chat-api",
  "hasApiKey": true
}
```

## Customization

### Styling

The UI uses Tailwind CSS v3. Customize colors and styles in `src/App.tsx`:

- Message bubbles: Adjust `bg-white/10` opacity values
- Borders: Change `border-white/10` opacity
- Hover effects: Modify `hover:bg-white/15` classes

### AI Model

Change the Claude model in `api/server.js`:

```javascript
model: 'claude-sonnet-4-20250514', // Change to opus-4 for more powerful responses
```

Available models:
- `claude-sonnet-4-20250514` (default)
- `claude-opus-4-20250514` (more powerful)
- `claude-haiku-4-20250514` (faster)

## Troubleshooting

**Can't connect to API:**
- Make sure both servers are running (frontend on 5173, backend on 3001)
- Check that port 3001 isn't already in use

**Mock responses instead of real AI:**
- Add your `ANTHROPIC_API_KEY` to the `.env` file
- Restart the backend server: `npm run api`

**Tailwind styles not working:**
- Make sure you're using Tailwind v3 (not v4)
- Run `npm install` to ensure all dependencies are installed

## License

ISC
