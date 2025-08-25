"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { 
  PlusIcon, 
  Bars3Icon, 
  MagnifyingGlassIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  isStreaming?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive: boolean;
}

export default function ModernAIWorkbench() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [codeInterpreterEnabled, setCodeInterpreterEnabled] = useState(false);
  const [chatSessions] = useState<ChatSession[]>([
    { id: '1', title: 'React Optimization', lastMessage: 'Optimization tips...', timestamp: new Date(), isActive: true },
    { id: '2', title: 'TypeScript', lastMessage: 'Best practices...', timestamp: new Date(), isActive: false },
    { id: '3', title: 'CSS Grid', lastMessage: 'Layout techniques...', timestamp: new Date(), isActive: false },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  useEffect(() => adjustTextareaHeight(), [input, adjustTextareaHeight]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "",
      timestamp: new Date(),
      model: selectedModel,
      isStreaming: true
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const responses = [
        "I'd be happy to help!",
        " Let me explain this...",
        "\n\nHere are 3 approaches:",
        "\n1. Simple solution",
        "\n2. Robust option",
        "\n3. Advanced technique",
        "\n\nWhich would you like to explore?"
      ];

      let accumulatedContent = "";
      
      for (let i = 0; i < responses.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        accumulatedContent += responses[i];
        
        setMessages(prev => prev.map(m => 
          m.id === assistantMessage.id 
            ? { ...m, content: accumulatedContent }
            : m
        ));
      }

      setMessages(prev => prev.map(m => 
        m.id === assistantMessage.id 
          ? { ...m, isStreaming: false }
          : m
      ));

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, selectedModel]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const newChat = () => {
    setMessages([]);
    ChatSessions(prev => prev.map(s => ({ ...s, isActive: false })));
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-gray-800 border-r border-gray-700 flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <button 
            onClick={newChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="mb-4 relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm"
              />
            </div>

            <div className="space-y-2">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer ${
                    session.isActive ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium truncate">
                      {session.title}
                    </div>
                    <div className="text-xs text-gray-400 truncate mt-1">
                      {session.lastMessage}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {session.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded">
                    <EllipsisVerticalIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
              <BookOpenIcon className="w-4 h-4" />
              Library
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg">
              <Cog6ToothIcon className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="claude-3">Claude 3</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setWebSearchEnabled(!webSearchEnabled)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                webSearchEnabled 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <GlobeAltIcon className="w-4 h-4" />
              Web Search
            </button>
            
            <button
              onClick={() => setCodeInterpreterEnabled(!codeInterpreterEnabled)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                codeInterpreterEnabled 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <CodeBracketIcon className="w-4 h-4" />
              Code Interpreter
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h2 className="text-2xl font-semibold mb-4">How can I help you today?</h2>
                <p className="text-gray-400 mb-8">
                  I can help with coding, writing, analysis, and creative projects
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Explain a complex concept",
                    "Write some code",
                    "Plan a project",
                    "Analyze data"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="space-y-8">
                {messages.map((message) => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message AI Workbench..."
                className="w-full min-h-[60px] max-h-[200px] resize-none bg-gray-800 border border-gray-600 rounded-2xl px-4 py-4 pr-16 text-white"
                style={{ height: 'auto' }}
              />
              
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 bottom-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowUpIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {(webSearchEnabled || codeInterpreterEnabled) && (
              <div className="flex gap-2 mt-3">
                {webSearchEnabled && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-md">
                    <GlobeAltIcon className="w-3 h-3" />
                    Web Search
                  </span>
                )}
                {codeInterpreterEnabled && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-md">
                    <CodeBracketIcon className="w-3 h-3" />
                    Code Interpreter
                  </span>
                )}
              </div>
            )}
            
            <div className="flex justify-center mt-4">
              <p className="text-xs text-gray-500">
                Verify important information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-sm">🤖</span>
        </div>
      )}
      
      <div className={`max-w-[70%] ${message.role === 'user' ? 'order-first' : ''}`}>
        <div className={`p-4 rounded-2xl ${
          message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
        }`}>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">
              {message.content}
              {message.isStreaming && (
                <span className="animate-pulse border-l-2 border-white ml-1"></span>
              )}
            </div>
          </div>
        </div>
        
        <div className={`mt-2 text-xs text-gray-500 flex gap-2 ${
          message.role === 'user' ? 'justify-end' : 'justify-start'
        }`}>
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {message.model && (
            <>
              <span>•</span>
              <span>{message.model}</span>
            </>
          )}
        </div>
      </div>
      
      {message.role === 'user' && (
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </div>
      )}
    </div>
  );
}
