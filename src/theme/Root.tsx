import React, { useEffect } from 'react';
import ChatWidget from '../components/ChatWidget';
import PersonalizationQuiz from '../components/PersonalizationQuiz';
import TextSelectionChat from '../components/TextSelectionChat';
import PersonalizationProvider from '../contexts/PersonalizationProvider';
import { AuthProvider } from '../contexts/AuthContext';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { setApiBaseUrl } from '../config';

// Default implementation, that you can customize
export default function Root({children}) {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Initialize config from Docusaurus customFields
    if (siteConfig.customFields?.apiUrl) {
      setApiBaseUrl(siteConfig.customFields.apiUrl as string);
    }
  }, [siteConfig]);

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
