import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { WorkCafeWidget } from "./widgets/workCafe/WorkCafeWidget";
import { CalendarModal } from "./components/CalendarModal";
import { SharePointSummary } from "./components/SharePointSummary";
import { NewsDetailPanel } from "./components/NewsDetailPanel";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

function Pill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={[
        "px-3 py-1.5 text-sm font-medium rounded-lg transition-all",
        active
          ? "bg-indigo-100 text-indigo-700"
          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-300"
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Sidebar({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat
}: {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}) {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <img src="/icon.svg" alt="Copilotish" className="w-8 h-8" />
        </div>
        <div className="text-sm font-semibold text-gray-900">Copilotish</div>
      </div>

      <div className="px-3 pb-4">
        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-all ${
            currentChatId === null
              ? 'bg-indigo-700 text-white ring-2 ring-indigo-300'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New chat</span>
        </button>
      </div>

      <div className="px-3 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Agents</div>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span>Researcher</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          <span>Analyst</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          <span>People</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-gray-900 transition-all flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
          </svg>
          <span>SharePoint Agent Helper</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-500 hover:text-gray-700 transition-all flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>New agent</span>
        </button>
      </div>

      <div className="px-3 pt-4 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Notebooks</div>
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-500 hover:text-gray-700 transition-all flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>New notebook</span>
        </button>
      </div>

      <div className="px-3 pt-4 flex-1 overflow-auto">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Chats</div>
        <div className="space-y-1">
          {chats.length === 0 ? (
            <div className="text-sm text-gray-400 py-2 px-3">No chats yet</div>
          ) : (
            chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  chat.id === currentChatId ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="truncate">{chat.title}</div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
          CH
        </div>
        <div className="text-sm font-medium text-gray-700">Chase Hignight</div>
      </div>
    </aside>
  );
}

function PromptCard({ title, subtitle, onClick }: { title: string; subtitle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left p-6 rounded-2xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all shadow-md"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-4">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="text-xl font-bold text-gray-900 mb-2">{title}</div>
      <div className="text-sm text-gray-600 leading-relaxed">{subtitle}</div>
    </button>
  );
}

function MessageBubble({ message, isDetailPanelOpen, setIsDetailPanelOpen }: {
  message: Message;
  isDetailPanelOpen: boolean;
  setIsDetailPanelOpen: (open: boolean) => void;
}) {
  const isUser = message.role === "user";
  const isSharePointSummary = message.content === "__SHAREPOINT_SUMMARY__";

  if (isUser) {
    // User messages: right-aligned bubble
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-indigo-600 text-white shadow-sm">
          <div className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
        </div>
      </div>
    );
  } else if (isSharePointSummary) {
    // SharePoint Summary: custom rich layout
    return (
      <div className="flex justify-start mb-6">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <SharePointSummary
            isDetailPanelOpen={isDetailPanelOpen}
            setIsDetailPanelOpen={setIsDetailPanelOpen}
          />
        </div>
      </div>
    );
  } else {
    // Assistant messages: left-aligned card with markdown
    return (
      <div className="flex justify-start mb-6">
        <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-900 leading-relaxed prose prose-sm max-w-none [&>p]:mb-4 [&>ul]:my-4 [&>ol]:my-4 [&>p:last-child]:mb-0">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
}

function Composer({ onSend, disabled }: { onSend: (message: string) => void; disabled: boolean }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-300 shadow-lg p-4" style={{ borderRadius: '28px' }}>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Message Copilotish</div>
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
            title="Add attachment"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none disabled:opacity-50"
          />

          <button
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
            title="Voice input"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all shadow-sm"
            title="Send message"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-600 hover:text-gray-800 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Tools
          </button>
        </div>
      </div>
    </div>
  );
}

const loadingTexts = [
  '✶ Prestidigitating…',
  '✶ Flibbertigibbeting…',
  '✽ Coalescing…',
  '✻ Evaporating…',
  '✻ Moonwalking…',
  '✻ Transmuting…'
];

export default function App() {
  // Chat state management
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showComposerShadow, setShowComposerShadow] = useState(false);
  const [showWeeklyWrapModal, setShowWeeklyWrapModal] = useState(false);
  const [showWorkCafeModal, setShowWorkCafeModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [isDetailPanelClosing, setIsDetailPanelClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get current chat messages
  const currentChat = chats.find(chat => chat.id === currentChatId);
  const currentMessages = currentChat?.messages || [];

  // Handle detail panel close with animation
  const handleDetailPanelClose = () => {
    setIsDetailPanelClosing(true);
    setTimeout(() => {
      setIsDetailPanelOpen(false);
      setIsDetailPanelClosing(false);
    }, 300); // Match animation duration
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Don't auto-scroll for SharePoint summary to avoid jumping
    const lastMessage = currentMessages[currentMessages.length - 1];
    if (lastMessage?.content !== "__SHAREPOINT_SUMMARY__") {
      scrollToBottom();
    }
  }, [currentMessages]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isScrolledUp = scrollTop < scrollHeight - clientHeight - 50;
        setShowComposerShadow(isScrolledUp);
      }
    };

    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [currentMessages]);

  // Generate chat title from first message
  const generateChatTitle = (firstMessage: string): string => {
    const maxLength = 40;
    if (firstMessage.length <= maxLength) {
      return firstMessage;
    }
    return firstMessage.substring(0, maxLength) + '...';
  };

  // Create new chat
  const createNewChat = () => {
    setCurrentChatId(null);
  };

  // Switch to existing chat
  const switchToChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: "user", content };

    // Pick a random loading text
    const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
    setLoadingText(randomText);

    // If no current chat, create a new one
    if (currentChatId === null) {
      const newChatId = `chat-${Date.now()}`;
      const newChat: Chat = {
        id: newChatId,
        title: generateChatTitle(content),
        messages: [userMessage],
        createdAt: Date.now(),
      };

      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChatId);
      setLoading(true);

      // Get AI response
      await getAIResponse(newChatId, [userMessage]);
    } else {
      // Add to existing chat
      setChats(prev => prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      ));
      setLoading(true);

      // Get AI response
      const updatedMessages = [...(currentChat?.messages || []), userMessage];
      await getAIResponse(currentChatId, updatedMessages);
    }
  };

  // Get AI response
  const getAIResponse = async (chatId: string, messages: Message[]) => {
    try {
      // Check for SharePoint summary trigger
      const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase().trim();
      const isSharePointSummary = lastUserMessage.includes("create a summary") &&
                                  lastUserMessage.includes("trending") &&
                                  lastUserMessage.includes("sharepoint");

      let assistantMessage: Message;

      if (isSharePointSummary) {
        // Add a delay to show the loading state
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

        // Return rich SharePoint summary - use special marker for custom rendering
        assistantMessage = {
          role: "assistant",
          content: "__SHAREPOINT_SUMMARY__"
        };
      } else {
        // Normal LLM call
        const response = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages })
        });

        const data = await response.json();
        assistantMessage = {
          role: "assistant",
          content: data.content
        };
      }

      // Add assistant response to chat
      setChats(prev => prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, assistantMessage] }
          : chat
      ));
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I couldn't connect to the API. Make sure the backend server is running on port 3001."
      };

      setChats(prev => prev.map(chat =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
      ));
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { title: "Recap", subtitle: "Summarize updates from my Company", prompt: "Create a summary of what's trending across my organization in SharePoint" },
    { title: "Help me prepare for", subtitle: "Sync on prototype", prompt: "Help me prepare talking points for a prototype sync meeting" },
    { title: "What should be on my radar", subtitle: "from emails last week?", prompt: "What are some important things I should be aware of this week?" }
  ];

  return (
    <>
    <div className="h-full flex">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSelectChat={switchToChat}
      />

      <main className={`flex-1 h-full transition-all duration-300 ${isDetailPanelOpen ? 'mr-0' : ''}`}>
        <div className="h-full flex flex-col relative">
          {/* Top bar */}
          <div className="h-16 px-8 flex items-center justify-between border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Pill label="Work" active />
              <Pill label="Web" />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-1.5">
                Auto
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
            {currentMessages.length === 0 ? (
              <div className="min-h-full flex flex-col items-center">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="chat p-[8%] pb-[4%]">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                      Hi there, try asking, <span className="text-indigo-600">'what can you do?'</span>
                    </h1>
                  </div>

                  <div className="mt-12 w-full max-w-6xl px-6">
                    <Composer onSend={sendMessage} disabled={loading} />
                  </div>

                  <div className="mt-10 w-full max-w-6xl px-6 grid grid-cols-3 gap-4">
                    {quickPrompts.map((prompt) => (
                      <PromptCard
                        key={prompt.title}
                        title={prompt.title}
                        subtitle={prompt.subtitle}
                        onClick={() => sendMessage(prompt.prompt)}
                      />
                    ))}
                  </div>

                  <button className="mt-8 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Browse more prompts
                  </button>
                  </div>
                </div>

                {/* Bento Grid */}
                <div className="bento p-[8%]">
                  <div className="w-full max-w-6xl px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-auto">
                    {/* Large card - spans 2 columns */}
                    <button
                      onClick={() => setShowWeeklyWrapModal(true)}
                      className="lg:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all text-left"
                    >
                      <div className="flex flex-col h-full justify-between min-h-[280px]">
                        <div>
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold mb-2">Weekly Wrap</h3>
                          <p className="text-indigo-100 text-sm leading-relaxed">
                            Get intelligent responses powered by advanced language models. Ask anything and receive thoughtful, detailed answers.
                          </p>
                        </div>
                        <div className="mt-6 flex items-center gap-4">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white" />
                            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white" />
                            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white" />
                          </div>
                          <span className="text-sm text-indigo-100">Trusted by thousands</span>
                        </div>
                      </div>
                    </button>

                    {/* Tall card - Daily Updates */}
                    <div className="lg:row-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Upcoming meetings</h3>
                          <button
                            onClick={() => setShowCalendarModal(true)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                          >
                            See all
                          </button>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto max-h-[480px] pr-2 -mr-2">
                          {/* Meeting 1 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">Pixel Parliament</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 10th, 2022 at 5:00 PM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room A</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 2 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">The Empathy Lab Sync</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 12th, 2022 at 3:00 PM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room B</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 3 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">Constraint & Creativity Council</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 12th, 2022 at 5:00 PM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room C</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 4 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">Wireframe War Room</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 13th, 2022 at 10:00 AM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room D</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 5 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">The Affordance Assembly</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 13th, 2022 at 2:30 PM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room E</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 6 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">Signal over Noise Summit</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 14th, 2022 at 11:00 AM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room F</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 7 */}
                          <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">Prototype & Provoke Roundtable</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 14th, 2022 at 4:00 PM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room G</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>

                          {/* Meeting 8 */}
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">Delight by Design Forum</h4>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>January 15th, 2022 at 9:30 AM</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <span>Conference Room H</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medium card - Work Cafe */}
                    <button
                      onClick={() => setShowWorkCafeModal(true)}
                      className="text-left bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Work Cafe</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Order breakfast, lunch, coffee, and snacks from our in-office cafe.
                      </p>
                    </button>

                    {/* Medium card */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-indigo-200">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Action Items</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Your high-priority and upcoming tasks for the week, all in one place.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 bg-indigo-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full w-[95%]" />
                        </div>
                        <span className="text-xs font-medium text-indigo-600">95% complete</span>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto py-8 px-6 pb-32">
                {currentMessages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    message={msg}
                    isDetailPanelOpen={isDetailPanelOpen}
                    setIsDetailPanelOpen={(open) => {
                      if (open) {
                        setIsDetailPanelOpen(true);
                      } else {
                        handleDetailPanelClose();
                      }
                    }}
                  />
                ))}
                {loading && (
                  <div className="flex justify-start mb-6">
                    <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                        <span className="text-sm text-gray-600">{loadingText}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Composer fixed at bottom of viewport */}
          {currentMessages.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
              <div className="max-w-4xl mx-auto py-6 px-6 pointer-events-auto">
                <Composer onSend={sendMessage} disabled={loading} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* News Detail Panel - Slides from right with floating effect */}
      {(isDetailPanelOpen || isDetailPanelClosing) && (
        <aside className={`w-full max-w-4xl h-full bg-gray-50 p-3 ${isDetailPanelClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
          <div className="h-full bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden">
            <NewsDetailPanel onClose={handleDetailPanelClose} />
          </div>
        </aside>
      )}
    </div>

    {/* Work Cafe Modal */}
    {showWorkCafeModal && (
      <WorkCafeWidget onClose={() => setShowWorkCafeModal(false)} />
    )}

    {/* Calendar Modal */}
    {showCalendarModal && (
      <CalendarModal onClose={() => setShowCalendarModal(false)} />
    )}

    {/* Weekly Wrap Modal */}
    {showWeeklyWrapModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <button
          onClick={() => setShowWeeklyWrapModal(false)}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full max-w-2xl h-[600px] overflow-y-auto px-4">
          <div className="space-y-6">
            {/* Slide 1: Week Overview */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-12 min-h-[500px] flex flex-col justify-center items-center text-center shadow-2xl">
              <div className="mb-8">
                <div className="text-white/80 text-xl font-medium mb-4">Your Week in Review</div>
                <h2 className="text-7xl font-black text-white mb-6">Jan 24-30</h2>
                <div className="text-white/90 text-2xl font-light">
                  A week of incredible momentum
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-5xl font-black text-white mb-2">24</div>
                  <div className="text-white/80 text-sm font-medium">Meetings</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-5xl font-black text-white mb-2">8</div>
                  <div className="text-white/80 text-sm font-medium">Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-5xl font-black text-white mb-2">156</div>
                  <div className="text-white/80 text-sm font-medium">Emails</div>
                </div>
              </div>
            </div>

            {/* Slide 2: Top Event */}
            <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 rounded-3xl p-12 min-h-[500px] flex flex-col justify-center text-center shadow-2xl">
              <div className="text-white/80 text-lg font-medium mb-4">Your biggest moment</div>
              <h2 className="text-6xl font-black text-white mb-8 leading-tight">
                Q1 Strategy<br/>Presentation
              </h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-white text-xl font-semibold">45 attendees</span>
                </div>
                <div className="text-white/90 text-sm">
                  Tuesday at 2:00 PM • Conference Room A
                </div>
              </div>
            </div>

            {/* Slide 3: Company News */}
            <div className="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 rounded-3xl p-12 min-h-[500px] flex flex-col justify-center shadow-2xl">
              <div className="text-white/80 text-lg font-medium mb-6 text-center">Company Highlights</div>
              <h2 className="text-5xl font-black text-white mb-8 text-center leading-tight">
                This Week's<br/>Big News
              </h2>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">New Product Launch</h3>
                      <p className="text-white/80 text-sm">Our latest innovation hits the market next week</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">Revenue Milestone</h3>
                      <p className="text-white/80 text-sm">Hit $10M ARR - team celebration Friday</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">Team Expansion</h3>
                      <p className="text-white/80 text-sm">Welcome 5 new team members this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 4: Upcoming Events */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-12 min-h-[500px] flex flex-col justify-center shadow-2xl">
              <div className="text-white/80 text-lg font-medium mb-6 text-center">Coming Up Next Week</div>
              <h2 className="text-5xl font-black text-white mb-8 text-center">
                Don't Miss These
              </h2>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-xl">All-Hands Meeting</h3>
                    <span className="text-white/80 text-sm font-medium">Monday 10am</span>
                  </div>
                  <p className="text-white/70 text-sm">Q1 results and roadmap reveal</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-xl">Design Sprint Kickoff</h3>
                    <span className="text-white/80 text-sm font-medium">Tuesday 2pm</span>
                  </div>
                  <p className="text-white/70 text-sm">New feature brainstorming session</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-bold text-xl">Team Happy Hour</h3>
                    <span className="text-white/80 text-sm font-medium">Friday 5pm</span>
                  </div>
                  <p className="text-white/70 text-sm">Rooftop bar celebration</p>
                </div>
              </div>
            </div>

            {/* Slide 5: Closing */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 min-h-[500px] flex flex-col justify-center items-center text-center shadow-2xl">
              <h2 className="text-7xl font-black text-white mb-6">
                You're<br/>Amazing
              </h2>
              <p className="text-white/90 text-2xl font-light max-w-lg mb-8">
                Another productive week in the books. Keep up the incredible work!
              </p>
              <button
                onClick={() => setShowWeeklyWrapModal(false)}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl"
              >
                Close Wrap
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
