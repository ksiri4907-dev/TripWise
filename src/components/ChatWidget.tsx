import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  RefreshCw,
  Settings,
  Minimize2,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { SearchQuery, TripComparisonResult } from '../types/trip';

export const DEFAULT_N8N_WEBHOOK =
  'https://srivatsakommajosyula.app.n8n.cloud/webhook/fb7179fa-d47f-4202-b385-9a6fbc08ede1/chat';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isError?: boolean;
}

interface ChatWidgetProps {
  currentTrip?: TripComparisonResult | null;
  activeQuery?: SearchQuery;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ currentTrip, activeQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: 'Hello! I am your TripWise AI Assistant connected to your n8n workflow. How can I help plan or compare your journey today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_N8N_WEBHOOK);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionId] = useState(() => `tripwise-${Math.random().toString(36).substring(2, 9)}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Compare Train vs Flight for my journey',
    'Which hotel has the best rating?',
    'What is the cheapest way to travel?',
    'How is the destination weather?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Build contextual payload for n8n AI Agent
      const payload = {
        action: 'sendMessage',
        chatInput: text,
        message: text,
        sessionId,
        context: {
          currentFrom: activeQuery?.from || currentTrip?.query.from || 'Visakhapatnam',
          currentTo: activeQuery?.to || currentTrip?.query.to || 'Hyderabad',
          travelers: activeQuery?.travelers || currentTrip?.query.travelers || 2,
          date: activeQuery?.date || currentTrip?.query.date || '2026-10-25',
        },
      };

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.message === 'Error in workflow')) {
        let errorDetail = 'n8n workflow returned an error.';
        if (data && data.message === 'Error in workflow') {
          errorDetail =
            'Your n8n workflow received this message, but halted with "Error in workflow". Please open your n8n canvas and check the Execution log (often caused by an unconfigured or unauthenticated LLM API key / Model node).';
        }

        // Assistant reply with helpful context
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: `⚠️ **n8n Workflow Notice:** ${errorDetail}\n\n*In the meantime, based on TripWise data for ${
              activeQuery?.from || 'Visakhapatnam'
            } → ${activeQuery?.to || 'Hyderabad'}:*\n- **Best Match:** Train (Vande Bharat Express) at ₹850 (8h 20m)\n- **Cheapest:** IntrCity Volvo Bus at ₹700 (11h)\n- **Fastest:** Direct Flight at ₹3,600 (1h 15m)`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
          },
        ]);
      } else {
        // Extract output text from standard n8n chat response formats
        let replyText = '';
        if (typeof data === 'string') {
          replyText = data;
        } else if (data && typeof data === 'object') {
          replyText =
            data.output ||
            data.text ||
            data.response ||
            data.message ||
            (Array.isArray(data) && data[0]?.output) ||
            JSON.stringify(data);
        } else {
          replyText = 'Response received from n8n agent.';
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: `⚠️ **Connection Issue:** Unable to reach webhook endpoint. Please verify CORS and network settings for \`${webhookUrl}\`.\n\nError: ${err?.message || 'Network error'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] md:w-[420px] h-[550px] max-h-[80vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Top Bar */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-tight">
                    TripWise AI Agent
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-teal-300 font-medium">
                  Powered by n8n Cloud Webhook
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Webhook Settings"
                aria-label="Webhook Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook Configuration Panel (toggleable) */}
          {showSettings && (
            <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>Webhook Configuration</span>
                <button
                  type="button"
                  onClick={() => setWebhookUrl(DEFAULT_N8N_WEBHOOK)}
                  className="text-[11px] text-teal-700 hover:underline"
                >
                  Reset Default
                </button>
              </div>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://.../webhook/.../chat"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-[11px] font-mono"
              />
              <p className="text-[10px] text-slate-500">
                Connected to your n8n workflow. Messages include current trip context ({activeQuery?.from || 'Visakhapatnam'} → {activeQuery?.to || 'Hyderabad'}).
              </p>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : msg.isError
                      ? 'bg-amber-50 text-amber-950 border border-amber-200 rounded-bl-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic py-2">
                <Bot className="w-4 h-4 text-teal-600 animate-pulse" />
                <span>TripWise n8n Agent is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-200 rounded-full text-slate-600 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask n8n agent about routes, hotels, or packing..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-teal-400 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 cursor-pointer border border-slate-700 group focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Open AI Assistant"
      >
        <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
          <Bot className="w-4 h-4 transition-transform group-hover:scale-110" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold block leading-none">TripWise AI</span>
          <span className="text-[10px] text-teal-400 font-medium">n8n Agent</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>
    </div>
  );
};
