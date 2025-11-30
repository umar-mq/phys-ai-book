import { USE_MOCK_API, getApiBaseUrl } from '../config';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface ChatResponse {
  response: string;
  sources?: Array<{ title: string; url: string }>;
}

// --- Mock Implementation ---

const mockSendMessage = async (message: string, history: ChatMessage[]): Promise<ChatResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); 

  const responses = [
    "That's an interesting question about Physical AI.",
    "Based on Module 1, we define this as the intersection of robotics and ML.",
    "I can certainly help you with that. The key concept here is...",
  ];

  return {
    response: `${responses[Math.floor(Math.random() * responses.length)]} (Mock Response)`,
    sources: []
  };
};

const mockSendSelectedChat = async (selectedText: string, userQuery: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return `(Mock) You asked about "${selectedText}". Here is the explanation: ...`;
};


// --- Real Implementation ---

const realSendMessage = async (message: string, history: ChatMessage[]): Promise<ChatResponse> => {
  const payloadHistory = [
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ];

  const res = await fetch(`${getApiBaseUrl()}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history: payloadHistory }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Chat API Error:", err);
    throw new Error('Chat request failed');
  }

  const data = await res.json();
  
  return {
    response: typeof data === 'string' ? data : data.response || "No response field",
    sources: data.sources || []
  };
};

const realSendSelectedChat = async (selectedText: string, userQuery: string): Promise<string> => {
  const res = await fetch(`${getApiBaseUrl()}/api/chat/selected`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      selected_text: selectedText, 
      user_query: userQuery 
    }),
  });

  if (!res.ok) {
    throw new Error('Selected chat request failed');
  }

  const data = await res.json();
  return typeof data === 'string' ? data : data.response || JSON.stringify(data);
};

// --- Exported Service ---

export const ChatService = {
  sendMessage: USE_MOCK_API ? mockSendMessage : realSendMessage,
  sendSelectedChat: USE_MOCK_API ? mockSendSelectedChat : realSendSelectedChat,
};
