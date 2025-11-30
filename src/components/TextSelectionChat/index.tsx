import React, { useState, useEffect, useRef } from 'react';
import { ChatService } from '../../services/chatService';
import clsx from 'clsx';

export default function TextSelectionChat() {
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.toString().trim()) {
        // Only clear if we aren't already interacting with the widget
        if (!isOpen) {
          setSelection(null);
        }
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const text = sel.toString();

      // Position logic: centered below the selection
      // We use absolute positioning relative to viewport (fixed)
      setSelection({
        text,
        x: rect.left + rect.width / 2,
        y: rect.bottom + 10 + window.scrollY // Add scrollY if using absolute, but fixed uses viewport
      });
    };

    // Use mouseup to detect end of selection
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelection(null);
        setResponse(null);
        setInput('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAsk = async () => {
    if (!input.trim() || !selection) return;
    
    setLoading(true);
    try {
      // Send selection as context
      const reply = await ChatService.sendSelectedChat(selection.text, input);
      setResponse(reply);
    } catch (e) {
      setResponse("Sorry, I couldn't process that.");
    } finally {
      setLoading(false);
    }
  };

  if (!selection) return null;

  // If not open, show the trigger button
  if (!isOpen) {
    return (
      <button
        className="fixed z-[60] bg-primary text-white px-3 py-1 rounded-full shadow-lg text-sm font-bold animate-fade-in hover:scale-105 transition-transform"
        style={{ 
          left: selection.x, 
          top: selection.y - window.scrollY, // Adjust for fixed position
          transform: 'translateX(-50%)' 
        }}
        onMouseDown={(e) => {
          e.stopPropagation(); // Prevent clearing selection
          setIsOpen(true);
        }}
      >
        Ask AI 🤖
      </button>
    );
  }

  // If open, show the chat bubble
  return (
    <div
      ref={wrapperRef}
      className="fixed z-[60] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-72 animate-fade-in"
      style={{ 
        left: selection.x, 
        top: selection.y - window.scrollY,
        transform: 'translateX(-50%)' 
      }}
    >
      <div className="text-xs text-gray-400 mb-2 truncate">
        Selected: "{selection.text}"
      </div>
      
      {!response ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full p-2 text-sm border rounded bg-gray-50 dark:bg-black/20 focus:ring-2 focus:ring-primary outline-none resize-none"
            rows={2}
            placeholder="What's your question?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            className="bg-primary text-white text-sm py-1 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      ) : (
        <div className="text-sm">
          <div className="font-bold mb-1 text-primary">AI Answer:</div>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {response}
          </div>
          <button 
            className="mt-3 text-xs text-gray-400 hover:text-primary underline"
            onClick={() => {
              setResponse(null);
              setInput('');
              setIsOpen(false);
              setSelection(null);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
