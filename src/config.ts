// src/config.ts

// By default, we use the Real API now as per user request.
// Set REACT_APP_MOCK_API='true' to revert to Mock.

export const USE_MOCK_API = false;

// Default to localhost:8000
let internalApiUrl = 'https://phys-ai-backend-production.up.railway.app';

export const setApiBaseUrl = (url: string) => {
  if (url) {
    internalApiUrl = url;
    console.log(`[Config] API Base URL set to: ${internalApiUrl}`);
  }
};

export const getApiBaseUrl = () => internalApiUrl;
