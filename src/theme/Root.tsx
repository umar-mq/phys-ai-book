import React from 'react';
import ChatWidget from '../components/ChatWidget';
import PersonalizationQuiz from '../components/PersonalizationQuiz';
import TextSelectionChat from '../components/TextSelectionChat';
import PersonalizationProvider from '../contexts/PersonalizationProvider';
import { AuthProvider } from '../contexts/AuthContext';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <AuthProvider>
      <PersonalizationProvider>
        {children}
        <PersonalizationQuiz />
        <TextSelectionChat />
        <ChatWidget />
      </PersonalizationProvider>
    </AuthProvider>
  );
}