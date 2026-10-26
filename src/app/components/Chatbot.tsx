"use client";

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, status, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-80 sm:w-96 bg-surface-container-low rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 z-50 h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-headline-sm text-sm">Brewza Assistant</h3>
                <p className="text-primary-container text-xs opacity-80">AI Barista</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-on-surface-variant/70 my-8 flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm">Hi! I'm your Brewza AI Barista.</p>
                <p className="text-xs mt-1">Ask me about our coffees, roasts, or brewing tips!</p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'}`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${m.role === 'user'
                    ? 'bg-secondary text-on-secondary rounded-tr-sm'
                    : 'bg-surface-container text-on-surface border border-outline-variant/20 rounded-tl-sm shadow-sm'
                    }`}>
                    {m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('\n') || ''}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%] flex-row">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-container text-on-surface border border-outline-variant/20 rounded-tl-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center my-2">
                <div className="bg-error/10 text-error text-xs p-2 rounded-lg border border-error/20 max-w-[85%] text-center">
                  Oops, something went wrong. Have you added your API keys in .env.local?
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-surface-container border-t border-outline-variant/20">
            <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/40 rounded-full pl-4 pr-1.5 py-1.5 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our coffee..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-on-surface placeholder:text-on-surface-variant/50"
              />
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="bg-primary text-on-primary p-2 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-on-primary rounded-full shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
