import React, { createContext, useState, ReactNode, useEffect } from 'react';

export type ExperienceLevel = 'Novice' | 'Professional';
export type Language = 'English' | 'Urdu';

interface PersonalizationContextType {
  experienceLevel: ExperienceLevel;
  setExperienceLevel: (level: ExperienceLevel) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isQuizCompleted: boolean;
  completeQuiz: () => void;
}

export const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

interface PersonalizationProviderProps {
  children: ReactNode;
}

const PersonalizationProvider = ({ children }: PersonalizationProviderProps) => {
  // Try to load from localStorage first
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(() => 
    (localStorage.getItem('pai_pref_level') as ExperienceLevel) || 'Novice'
  );
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('pai_pref_lang') as Language) || 'English'
  );
  const [isQuizCompleted, setIsQuizCompleted] = useState(() => 
    localStorage.getItem('pai_quiz_done') === 'true'
  );

  // Persist changes
  useEffect(() => { localStorage.setItem('pai_pref_level', experienceLevel) }, [experienceLevel]);
  useEffect(() => { localStorage.setItem('pai_pref_lang', language) }, [language]);
  useEffect(() => { localStorage.setItem('pai_quiz_done', String(isQuizCompleted)) }, [isQuizCompleted]);

  const completeQuiz = () => setIsQuizCompleted(true);

  return (
    <PersonalizationContext.Provider value={{ 
      experienceLevel, 
      setExperienceLevel, 
      language, 
      setLanguage,
      isQuizCompleted,
      completeQuiz
    }}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export default PersonalizationProvider;