import React, { useContext } from 'react';
import { PersonalizationContext, ExperienceLevel, Language } from '../../contexts/PersonalizationProvider';
import clsx from 'clsx';

export default function PersonalizationBar() {
  const { experienceLevel, setExperienceLevel, language, setLanguage } = useContext(PersonalizationContext)!;

  return (
    <div className="sticky top-[60px] z-40 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm animate-fade-in mb-8">
      <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
        <span className="hidden sm:inline">Personalizing for:</span>
        <span className="text-primary font-bold">{experienceLevel}</span>
        <span>•</span>
        <span className="text-primary font-bold">{language}</span>
      </div>

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
  );
}
