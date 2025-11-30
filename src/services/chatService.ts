import { USE_MOCK_API, API_BASE_URL } from '../config';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatResponse {
  response: string;
  sources?: Array<{ title: string; url: string }>;
}

// --- Mock Implementation ---

const mockSendMessage = async (message: string, history: ChatMessage[]): Promise<ChatResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate thinking

  const responses = [
    "That's an interesting question about Physical AI.",
    "Based on Module 1, we define this as the intersection of robotics and ML.",
    "I can certainly help you with that. The key concept here is...",
    "Have you checked the 'Novice' track for this topic?",
  ];

  return {
    response: `${responses[Math.floor(Math.random() * responses.length)]} (Mock Response to: "${message}")`,
    sources: [
      { title: 'Intro to Physical AI', url: '/docs/module-1/intro' }
    ]
  };
};

// --- Real Implementation ---

const realSendMessage = async (message: string, history: ChatMessage[]): Promise<ChatResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json();
};

// --- Exported Service ---

export const ChatService = {
  sendMessage: USE_MOCK_API ? mockSendMessage : realSendMessage,
};
