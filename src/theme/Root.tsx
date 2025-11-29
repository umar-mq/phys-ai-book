import React from 'react';
import ChatWidget from '../components/ChatWidget';
import PersonalizationProvider from '../contexts/PersonalizationProvider';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <PersonalizationProvider>
      {children}
      <ChatWidget />
    </PersonalizationProvider>
  );
}
