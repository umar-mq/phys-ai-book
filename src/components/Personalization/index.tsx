import React, { useContext, ReactNode } from 'react';
import { PersonalizationContext } from '../../contexts/PersonalizationProvider';

interface Props {
  children: ReactNode;
  level: string;
}

export default function Personalization({ children, level }: Props) {
  const context = useContext(PersonalizationContext);
  
  if (!context) return null;
  
  const { experienceLevel } = context;
  
  // Normalize inputs
  const current = experienceLevel.toLowerCase(); // "novice" or "professional"
  const target = level.toLowerCase();

  // Map "expert" to "professional" to handle synonyms
  const normalizedTarget = target === 'expert' ? 'professional' : target;

  if (current === normalizedTarget) {
    return <div className="animate-fade-in my-4">{children}</div>;
  }
  return null;
}
