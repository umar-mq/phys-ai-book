import { USE_MOCK_API, API_BASE_URL } from '../config';

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
  // Construct the history payload as expected by the API
  // API expects: { "history": [ { "role": "string", "content": "string" } ] }
  // We should include the current message in the history or as a separate field?
  // Usually 'history' implies past. But if the API is stateless regarding the *current* prompt, 
  // we might need to append the current message to history.
  // The API doc only shows 'history'. I'll append the current message to it.
  
  const payloadHistory = [
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ];

  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history: payloadHistory }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Chat API Error:", err);
    throw new Error('Chat request failed');
  }

  // API returns "string". It might be a JSON string like "Answer" or { "response": "Answer" }?
  // The doc says "Example Value Schema: string". This usually means the body IS a string.
  // But fetch.json() parses JSON strings.
  // If response is "Hello", json() returns "Hello".
  const data = await res.json();
  
  // Normalize to ChatResponse
  return {
    response: typeof data === 'string' ? data : data.response || "No response field",
    sources: data.sources || []
  };
};

const realSendSelectedChat = async (selectedText: string, userQuery: string): Promise<string> => {
  const res = await fetch(`${API_BASE_URL}/api/chat/selected`, {
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