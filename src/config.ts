// src/config.ts

// By default, we use the Mock API to ensure the application works out of the box.
// To use a real backend, we would typically inject this via build-time env vars
// or Docusaurus customFields. For now, we default to Mock to ensure stability.

export const USE_MOCK_API = true;

export const API_BASE_URL = 'http://localhost:3000';

console.log(`[Config] Using Mock API: ${USE_MOCK_API}`);