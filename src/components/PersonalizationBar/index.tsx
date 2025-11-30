import React, { useContext, useState } from 'react';
import { PersonalizationContext, ExperienceLevel, Language } from '../../contexts/PersonalizationProvider';
import { useAuth } from '../../contexts/AuthContext';
import LatestDevelopments from '../LatestDevelopments';
import clsx from 'clsx';

export default function PersonalizationBar() {
  const { user } = useAuth();
  const { experienceLevel, setExperienceLevel, language, setLanguage } = useContext(PersonalizationContext)!;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleListenPage = () => {
    if (!user) {
        alert("Please log in to use the Listen feature.");
        return;
    }

    if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
    }

    // Get content
    const article = document.querySelector('article');
    const text = article?.innerText;

    if (!text) return;

    // Stop any existing speech
    window.speechSynthesis.cancel();

    // Basic truncation
    const safeText = text.substring(0, 10000); 
    
    const utterance = new SpeechSynthesisUtterance(safeText);
    
    // Optional: Select voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div className="sticky top-[60px] z-40 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm animate-fade-in mb-8">
      {/* Left: Context Info */}
      <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
        <span className="hidden sm:inline">Personalizing for:</span>
        <span className="text-primary font-bold">{experienceLevel}</span>
        <span>•</span>
        <span className="text-primary font-bold">{language}</span>
      </div>

      {/* Right: Actions & Controls */}
      <div className="flex items-center space-x-3">
        {/* AI Features Group */}
        <div className="flex items-center space-x-2 mr-4 border-r border-gray-200 dark:border-gray-700 pr-4">
            <LatestDevelopments />
            
            <button
                onClick={handleListenPage}
                className={clsx(
                    "flex items-center space-x-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all shadow-sm border",
                    isPlaying 
                        ? "bg-red-500 text-white border-red-500 hover:bg-red-600" 
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
                title="Listen to this page"
            >
                <span>{isPlaying ? '⏹' : '🎧'}</span>
                <span className="hidden lg:inline">{isPlaying ? 'Stop' : 'Listen'}</span>
            </button>
        </div>

        {/* Toggles Group */}
        <div className="flex items-center space-x-4">
            {/* Level Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['Novice', 'Professional'] as ExperienceLevel[]).map((level) => (
                <button
                key={level}
                onClick={() => setExperienceLevel(level)}
                className={clsx(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                    experienceLevel === level
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
                >
                {level}
                </button>
            ))}
            </div>

            {/* Language Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['English', 'Urdu'] as Language[]).map((lang) => (
                <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={clsx(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                    language === lang
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                )}
                >
                {lang}
                </button>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
