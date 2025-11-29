import React from 'react';
import ChatWidget from '../components/ChatWidget';
import PersonalizationProvider from '../contexts/PersonalizationProvider';
// TODO: Replace with the actual provider from 'better-auth/react'
import { BetterAuthProvider } from '../temp-better-auth-placeholder';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <BetterAuthProvider>
      <PersonalizationProvider>
        {children}
        <ChatWidget />
      </PersonalizationProvider>
    </BetterAuthProvider>
  );
}
