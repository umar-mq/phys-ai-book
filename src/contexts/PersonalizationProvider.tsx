import React, { createContext, useState, ReactNode } from 'react';

type ExperienceLevel = 'Novice' | 'Professional';
type Language = 'English' | 'Urdu';

interface PersonalizationContextType {
  experienceLevel: ExperienceLevel;
  setExperienceLevel: (level: ExperienceLevel) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

interface PersonalizationProviderProps {
  children: ReactNode;
}

const PersonalizationProvider = ({ children }: PersonalizationProviderProps) => {
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Novice');
  const [language, setLanguage] = useState<Language>('English');

  return (
    <PersonalizationContext.Provider value={{ experienceLevel, setExperienceLevel, language, setLanguage }}>
      {children}
    </PersonalizationContext.Provider>
  );
};

export default PersonalizationProvider;
