import React, { useContext, useState } from 'react';
import { PersonalizationContext, ExperienceLevel, Language } from '../../contexts/PersonalizationProvider';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

export default function PersonalizationQuiz() {
  const { user } = useAuth();
  const { 
    isQuizCompleted, 
    completeQuiz, 
    setExperienceLevel, 
    setLanguage 
  } = useContext(PersonalizationContext)!;

  const [step, setStep] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel | null>(null);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);

  // Don't show if not logged in or already done
  if (!user || isQuizCompleted) return null;

  const handleLevelSelect = (level: ExperienceLevel) => {
    setSelectedLevel(level);
    setTimeout(() => setStep(1), 300); // Auto advance
  };

  const handleLangSelect = (lang: Language) => {
    setSelectedLang(lang);
    setTimeout(() => setStep(2), 300); // Auto advance
  };

  const handleFinish = () => {
    if (selectedLevel) setExperienceLevel(selectedLevel);
    if (selectedLang) setLanguage(selectedLang);
    completeQuiz();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-900 border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-gray-800 w-full">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>

        {/* Step 0: Experience Level */}
        {step === 0 && (
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-4 text-center">Welcome, {user.name}!</h2>
            <p className="text-gray-500 text-center mb-8">Let's tailor your learning path. How familiar are you with Physical AI?</p>
            
            <div className="space-y-4">
              <button
                onClick={() => handleLevelSelect('Novice')}
                className="w-full p-6 text-left border-2 border-transparent hover:border-primary bg-gray-50 dark:bg-gray-800 rounded-xl transition-all group"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">🌱</span>
                  <div>
                    <h3 className="font-bold text-lg">Beginner / Novice</h3>
                    <p className="text-sm text-gray-500">I'm new to this. Explain things simply.</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleLevelSelect('Professional')}
                className="w-full p-6 text-left border-2 border-transparent hover:border-primary bg-gray-50 dark:bg-gray-800 rounded-xl transition-all group"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4 group-hover:scale-110 transition-transform">🚀</span>
                  <div>
                    <h3 className="font-bold text-lg">Professional / Expert</h3>
                    <p className="text-sm text-gray-500">I know the basics. Give me the technical details.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Language */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-4 text-center">Language Preference</h2>
            <p className="text-gray-500 text-center mb-8">Which language do you prefer for reading?</p>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLangSelect('English')}
                className="p-8 border-2 border-transparent hover:border-primary bg-gray-50 dark:bg-gray-800 rounded-xl transition-all text-center group"
              >
                <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🇺🇸</span>
                <span className="font-bold">English</span>
              </button>

              <button
                onClick={() => handleLangSelect('Urdu')}
                className="p-8 border-2 border-transparent hover:border-primary bg-gray-50 dark:bg-gray-800 rounded-xl transition-all text-center group"
              >
                <span className="text-4xl block mb-2 group-hover:scale-110 transition-transform">🇵🇰</span>
                <span className="font-bold">Urdu</span>
              </button>
            </div>
            
            <button 
              onClick={() => setStep(0)}
              className="mt-8 text-sm text-gray-400 hover:text-white block mx-auto"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="text-center animate-slide-up py-8">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold mb-4">You're All Set!</h2>
            <p className="text-gray-500 mb-8">
              We've customized the platform for a 
              <strong className="text-primary"> {selectedLevel} </strong> 
              reading in 
              <strong className="text-primary"> {selectedLang}</strong>.
            </p>
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-full shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
            >
              Start Learning
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
