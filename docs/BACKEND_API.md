# Backend API Contract

This document outlines the API endpoints required by the "Physical AI" frontend when `MOCK_API` is set to `false`.

**Base URL**: The frontend expects a base URL (e.g., `http://localhost:3000` or defined via `REACT_APP_API_URL`).

## Authentication

The application uses **Better Auth** standards but expects the following behavior or compatible wrappers.

### 1. Login
*   **Endpoint**: `/api/auth/sign-in/email`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "user": {
        "id": "u_12345",
        "email": "user@example.com",
        "name": "Jane Doe",
        "image": "https://..." // optional
      },
      "session": {
        "token": "sess_..."
      }
    }
    ```
*   **Error Response (401 Unauthorized)**:
    ```json
    { "message": "Invalid credentials" }
    ```

### 2. Sign Up
*   **Endpoint**: `/api/auth/sign-up/email`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`
*   **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword",
      "name": "Jane Doe"
    }
    ```
*   **Success Response (201 Created)**: Same as Login.

### 3. Get Session (Current User)
*   **Endpoint**: `/api/auth/session`
*   **Method**: `GET`
*   **Headers**: `Authorization: Bearer <token>` (if not using cookies)
*   **Success Response (200 OK)**:
    ```json
    {
      "user": { "id": "...", "name": "...", "email": "..." },
      "session": { ... }
    }
    ```
*   **Null Response (200 OK)**: `null` (if not logged in)

---

## Chat (RAG Bot)

### 1. Send Message
*   **Endpoint**: `/api/chat`
*   **Method**: `POST`
*   **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "message": "What is reinforcement learning?",
      "history": [ // Optional: Previous context
        { "role": "user", "content": "Hi" },
        { "role": "assistant", "content": "Hello!" }
      ]
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "response": "Reinforcement learning is...",
      "sources": [ // Optional RAG sources
        { "title": "Chapter 1", "url": "/docs/module-1/intro" }
      ]
    }
    ```

---

## Personalization

### 1. Update Preferences
*   **Endpoint**: `/api/user/preferences`
*   **Method**: `PUT`
*   **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
*   **Body**:
    ```json
    {
      "experienceLevel": "Novice" | "Professional",
      "language": "English" | "Urdu"
    }
    ```
