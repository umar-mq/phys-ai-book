---
ID: 001
TITLE: Client-Side Personalization via React Context
STAGE: adr
DATE_ISO: 2025-11-29
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: Docusaurus Frontend
BRANCH: 001-ai-native-textbook-platform
USER: <current user>
COMMAND: /sp.adr
LABELS:
  - personalization
  - performance
LINKS:
  PHR: history/prompts/docusaurus-frontend/001-implementation-plan.prompt.md
FILES_YAML:
  - src/context/PersonalizationContext.jsx
TESTS_YAML: []
---
# ADR 001: Client-Side Personalization via React Context

## Context
We need to toggle text between "Novice" and "Expert" views instantly for a seamless user experience.

## Decision
Implement client-side personalization using React Context:
- Fetch all content variants at build time
- Use CSS/React state to show/hide versions based on user preference

## Alternatives Considered
1. Server-side rendering with API requests - Would introduce latency and degrade UX
2. Conditional HTML rendering in MDX files - Would complicate content management

## Consequences
✅ **Benefits**:
- Zero-latency toggling for users
- Simple implementation pattern

❌ **Tradeoffs**:
- Increased initial JS bundle size (~150KB)
- No server-side personalization capabilities

## Rationale
This approach prioritizes user experience by eliminating toggle latency, which is critical for demonstrating the platform's responsiveness in demo scenarios.