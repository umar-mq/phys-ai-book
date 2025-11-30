// src/config.ts

// By default, we use the Real API now as per user request.
// Set REACT_APP_MOCK_API='true' to revert to Mock.

export const USE_MOCK_API = false;

// Default to localhost:8000 for FastAPI backend.
// We hardcode this to avoid 'process is not defined' errors in the browser.
// In a production build, this should be replaced via Docusaurus customFields.
export const API_BASE_URL = 'http://localhost:8000';

console.log(`[Config] Using Mock API: ${USE_MOCK_API} at ${API_BASE_URL}`);