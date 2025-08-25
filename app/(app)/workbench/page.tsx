"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Drawer from "@/components/Drawer";
import StylePicker from "@/components/StylePicker";

// Enhanced Message Interface
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  artifacts?: string[];
  isStreaming?: boolean;
}

interface Artifact {
  id: string;
  name: string;
  type: string;
  content: string;
  createdAt: Date;
  versions: number;
}

// Keyboard shortcut hook
function useKeyboardShortcuts(handlers: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const cmdOrCtrl = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      
      if (cmdOrCtrl && e.shiftKey && key === 'd') {
        e.preventDefault();
        handlers.showDiff?.();
      } else if (cmdOrCtrl && key === 'k') {
        e.preventDefault();  
        handlers.openOmni?.();
      } else if (cmdOrCtrl && key === 's') {
        e.preventDefault();
        handlers.save?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}

// Streaming text animation hook
function useStreamingText(text: string, isStreaming: boolean) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (!isStreaming) {
      setDisplayText(text);
      return;
    }
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    
    return () => clearInterval(timer);
  }, [text, isStreaming]);
  
  return displayText;
}

export default function EnhancedWorkbench() {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selectedModel, setSelectedModel] = useState("openai/gpt-4o-mini");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [styleSlug, setStyleSlug] = useState("normal");
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    showDiff: () => console.log("Show diff"),
    openOmni: () => inputRef.current?.focus(),
    save: () => console.log("Save conversation")
  });

  // Cost estimation (mock)
  useEffect(() => {
    const totalTokens = messages.reduce((sum, m) => sum + m.content.length / 4, 0);
    const modelRates = {
      "openai/gpt-4o-mini": 0.0001,
      "openai/gpt-4o": 0.005,
      "anthropic/claude-3-sonnet": 0.003
    };
    setEstimatedCost(totalTokens * (modelRates[selectedModel as keyof typeof modelRates] || 0.0001));
  }, [messages, selectedModel]);

  // Send message function with streaming simulation
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

    // Create streaming assistant message
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: 'demo-conversation',
          model: selectedModel,
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          styleOverrideSlug: styleSlug
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.choices?.[0]?.delta?.content) {
                accumulatedContent += data.choices[0].delta.content;
                
                setMessages(prev => prev.map(m => 
                  m.id === assistantMessage.id 
                    ? { ...m, content: accumulatedContent }
                    : m
                ));
              }
            } catch (e) {
              // Ignore parsing errors for streaming
            }
          }
        }
      }

      // Finalize message
      setMessages(prev => prev.map(m => 
        m.id === assistantMessage.id 
          ? { ...m, isStreaming: false }
          : m
      ));

      // Check if response suggests creating an artifact
      if (accumulatedContent.includes('```') || accumulatedContent.toLowerCase().includes('artifact')) {
        const newArtifact: Artifact = {
          id: Date.now().toString(),
          name: `Generated ${new Date().toLocaleTimeString()}`,
          type: 'code',
          content: accumulatedContent,
          createdAt: new Date(),
          versions: 1
        };
        setArtifacts(prev => [...prev, newArtifact]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.slice(0, -1)); // Remove failed message
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, selectedModel, styleSlug]);

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="border-b border-black/5 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">AI Workbench</h1>
              <p className="text-black/60 text-sm">Contemporary minimalist interface</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Model Selector */}
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-3 py-2 border border-black/10 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
              >
                <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
                <option value="openai/gpt-4o">GPT-4o</option>
                <option value="anthropic/claude-3-sonnet">Claude 3 Sonnet</option>
              </select>

              {/* Cost Display */}
              <div className="text-xs text-black/50 px-3 py-2 bg-black/5 rounded-2xl">
                ~${estimatedCost.toFixed(4)}
              </div>

              <StylePicker conversationId="demo-conversation" onChange={setStyleSlug} />
              
              <Button 
                tone="outline" 
                onClick={() => setDrawerOpen(true)}
                className="hover:scale-105 transition-transform"
              >
                Artifacts ({artifacts.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Messages */}
        <div className="space-y-8 mb-8">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💭</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Ready to create something amazing?</h3>
              <p className="text-black/60">Start a conversation and I'll help you build, explore, and iterate.</p>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isLatest={index === messages.length - 1}
            />
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm py-6">
          <div className="relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message AI Workbench..."
              className="pr-16 h-14 text-base border-black/10 rounded-3xl focus:ring-2 focus:ring-black/20 transition-all"
              disabled={isLoading}
            />
            
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 rounded-2xl disabled:opacity-30 hover:scale-105 transition-all"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="text-xs text-black/40 flex items-center gap-4">
              <span>⌘K to focus</span>
              <span>⌘S to save</span>
              <span>⇧⌘D for diff</span>
            </div>
          </div>
        </div>
      </div>

      {/* Artifacts Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Artifacts</h2>
          <Button tone="ghost" onClick={() => setDrawerOpen(false)}>
            ✕
          </Button>
        </div>
        
        <div className="space-y-4">
          {artifacts.length === 0 ? (
            <div className="text-center py-8 text-black/60">
              <p>No artifacts yet. Create some through conversation!</p>
            </div>
          ) : (
            artifacts.map(artifact => (
              <div key={artifact.id} className="p-4 border border-black/10 rounded-2xl hover:bg-black/5 transition-colors cursor-pointer">
                <div className="font-medium mb-1">{artifact.name}</div>
                <div className="text-sm text-black/60 mb-2">{artifact.type}</div>
                <div className="text-xs text-black/40">
                  {artifact.createdAt.toLocaleString()} • v{artifact.versions}
                </div>
              </div>
            ))
          )}
        </div>
      </Drawer>
    </div>
  );
}

// Enhanced Message Bubble Component
function MessageBubble({ message, isLatest }: { message: Message; isLatest: boolean }) {
  const streamedContent = useStreamingText(message.content, message.isStreaming || false);
  
  return (
    <div 
      className={`flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
        message.role === 'user' ? 'flex-row-reverse' : ''
      }`}
      style={{ animationDelay: isLatest ? '100ms' : '0ms' }}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
        message.role === 'user' 
          ? 'bg-black text-white' 
          : 'bg-black/5 text-black/70'
      }`}>
        {message.role === 'user' ? 'You' : 'AI'}
      </div>
      
      {/* Message Content */}
      <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
        <div className={`inline-block p-4 rounded-3xl max-w-2xl ${
          message.role === 'user'
            ? 'bg-black text-white rounded-tr-lg'
            : 'bg-black/5 text-black rounded-tl-lg'
        }`}>
          <div className="prose prose-sm max-w-none">
            {message.isStreaming ? (
              <span>
                {streamedContent}
                <span className="animate-pulse">▋</span>
              </span>
            ) : (
              <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
            )}
          </div>
        </div>
        
        {/* Message Metadata */}
        <div className={`mt-2 text-xs text-black/40 flex gap-3 ${
          message.role === 'user' ? 'justify-end' : ''
        }`}>
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {message.model && <span>{message.model}</span>}
          {message.artifacts && <span>{message.artifacts.length} artifacts</span>}
        </div>
      </div>
    </div>
  );
}
