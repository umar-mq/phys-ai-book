---
ID: 002
TITLE: Better-Auth Client Integration in Docusaurus Theme Wrapper
STAGE: adr
DATE_ISO: 2025-11-29
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: Docusaurus Frontend
BRANCH: 001-ai-native-textbook-platform
USER: <current user>
COMMAND: /sp.adr
LABELS:
  - authentication
LINKS:
  PHR: history/prompts/docusaurus-frontend/001-implementation-plan.prompt.md
FILES_YAML:
  - src/context/AuthContext.jsx
TESTS_YAML: []
---
# ADR 002: Better-Auth Client Integration in Docusaurus Theme Wrapper

## Context
We need reliable session management for authenticated user features.

## Decision
Integrate `better-auth/react` SDK directly into the theme's root component:
1. Create custom `AuthProvider` wrapping application components
2. Use hooks like `useAuth()` to access authentication state in pages
3. Store tokens securely via browser storage

## Alternatives Considered
- Manual JWT handling with HTTP headers - Would require duplicating SDK functionality
- OAuth provider abstraction layer - Would add complexity without business value

## Consequences
✅ **Benefits**:
- Native integration with existing auth infrastructure
- Simplified state management for protected routes

❌ **Tradeoffs**:
- Tight coupling to Better-Auth schema (API breaking changes could be disruptive)
- No support for custom authentication providers at this layer

## Rationale
This approach simplifies development by leveraging a battle-tested SDK, which aligns with our goal of rapid iteration during the prototype phase.