import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChatService, ResearchResponse } from '../../services/chatService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

export default function LatestDevelopments() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const handleFetch = async () => {
    setIsOpen(true);
    if (data) return; // Don't refetch if already have data for this session

    setLoading(true);
    setError(null);
    try {
      // Infer section from title
      const section = document.title.split('|')[0].trim();
      const result = await ChatService.fetchLatest(section);
      setData(result);
    } catch (e) {
      setError("Failed to fetch latest developments.");
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 animate-slide-up">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 m-0">
              Latest Developments
            </h2>
            <p className="text-sm text-gray-500 mt-1">Real-time Arxiv scan for "{document.title.split('|')[0].trim()}"</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto markdown-content">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 animate-pulse">Scanning scientific repositories...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-10 bg-red-50 dark:bg-red-900/10 rounded-xl">
              {error}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data?.response || ''}</ReactMarkdown>
              </div>
              
              {/* Reasoning Dropdown */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
                <details className="group">
                  <summary className="flex items-center cursor-pointer text-sm text-gray-500 hover:text-purple-500 transition-colors select-none">
                    <span className="mr-2">🔍</span>
                    View Analysis Logic
                    <span className="ml-auto transform group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-black/20 rounded-lg text-sm font-mono text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {data?.reasoning}
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 flex justify-end">
          <button 
            onClick={() => setIsOpen(false)}
            className="button button--secondary"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={handleFetch}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-90 transition-opacity shadow-md ml-4"
        title="Check Arxiv for latest updates"
      >
        <span>🚀</span>
        <span className="hidden sm:inline">Latest Research</span>
      </button>

      {isOpen && createPortal(modalContent, document.body)}
    </>
  );
}