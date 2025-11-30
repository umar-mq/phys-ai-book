import React, { useState, useRef, useEffect } from 'react';
import { ChatService, ChatMessage } from '../../services/chatService';
import clsx from 'clsx';
import { useAuth } from '../../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from '@docusaurus/Link';

export default function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: 'Hello! I am your Physical AI assistant. Ask me anything about the course.', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const { response } = await ChatService.sendMessage(input, messages);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleListen = (text: string, id: string) => {
    if (!user) return; // Should not happen if locked

    window.speechSynthesis.cancel();

    if (playingId === id) {
        setPlayingId(null);
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);
    
    setPlayingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      <div className={clsx(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl w-80 sm:w-96 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden mb-4",
        isOpen ? "scale-100 opacity-100 h-[600px]" : "scale-0 opacity-0 h-0"
      )}>
        
        {/* Header */}
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              {!user ? '🔒' : '🤖'}
            </div>
            <h3 className="font-bold">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            ✕
          </button>
        </div>

        {!user ? (
            // Locked State
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-black/20">
                 <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <span className="text-4xl opacity-50">🔒</span>
                 </div>
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Login Required</h3>
                 <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-sm">
                    Please log in to chat with the AI course assistant and access personalized features.
                 </p>
                 <Link to="/login" className="button button--primary button--lg w-full shadow-lg mb-4 rounded-xl">
                    Log In
                 </Link>
                 <div className="text-xs text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-primary hover:underline font-bold ml-1">Sign up</Link>
                 </div>
            </div>
        ) : (
            // Unlocked State
            <>
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 dark:bg-black/20">
                {messages.map((msg) => (
                    <div 
                    key={msg.id} 
                    className={clsx(
                        "flex flex-col max-w-[85%]",
                        msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                    >
                    <div 
                        className={clsx(
                        "p-3 rounded-2xl text-sm shadow-sm",
                        msg.role === 'user' 
                            ? "bg-primary text-white rounded-tr-none" 
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-none text-gray-800 dark:text-gray-200"
                        )}
                    >
                        <div className="markdown-content prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                    
                    {msg.role === 'assistant' && (
                        <div className="mt-1 ml-1 flex items-center space-x-2">
                            <button 
                                onClick={() => handleListen(msg.content, msg.id!)}
                                className={clsx(
                                    "text-xs p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center space-x-1",
                                    playingId === msg.id ? "text-primary animate-pulse" : "text-gray-400"
                                )}
                                title="Listen to this response"
                            >
                                <span>{playingId === msg.id ? '🔊' : '🔈'}</span>
                                <span className="hidden group-hover:inline">Listen</span>
                            </button>
                        </div>
                    )}
                    </div>
                ))}
                
                {isTyping && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-tl-none mr-auto w-16 flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                )}
                <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <input
                    type="text"
                    placeholder="Ask a question..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-black/50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    autoFocus
                    />
                    <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-primary-dark transition-colors"
                    >
                    ➤
                    </button>
                </div>
                </div>
            </>
        )}

      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110",
          isOpen ? "bg-gray-600 text-white rotate-45" : ( !user ? "bg-gray-500 text-white" : "bg-gradient-to-r from-primary to-blue-600 text-white" )
        )}
      >
        <span className="text-2xl">{isOpen ? '＋' : (!user ? '🔒' : '💬')}</span>
      </button>

    </div>
  );
}