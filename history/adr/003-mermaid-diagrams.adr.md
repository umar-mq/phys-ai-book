---
ID: 003
TITLE: Using Mermaid.js for Robotics Diagrams with Docusaurus Theme Plugin
STAGE: adr
DATE_ISO: 2025-11-29
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: Docusaurus Frontend
BRANCH: 001-ai-native-textbook-platform
USER: <current user>
COMMAND: /sp.adr
LABELS:
  - documentation
  - diagrams
LINKS:
  PHR: history/prompts/docusaurus-frontend/001-implementation-plan.prompt.md
FILES_YAML:
  - docusaurus.config.js
TESTS_YAML: []
---
# ADR 003: Mermaid.js Integration via Docusaurus Theme Plugin

## Context
We need technical diagrams in the robotics section that can be version-controlled and regenerated.

## Decision
Use `@docusaurus/theme-mermaid` plugin with these configurations:
```js
plugins: [
  ['@docusaurus/plugin-mermaid', {
    theme: 'default',
    darkTheme: 'dark'
  }]
]
```

## Alternatives Considered
1. Native Mermaid integration without Docusaurus plugin - Would require additional build configuration
2. Draw.io for visual editing - Would introduce external dependencies and make version control difficult

## Consequences
✅ **Benefits**:
- Diagrams as code in markdown files (versionable, searchable)
- Consistent styling with application theme

❌ **Tradeoffs**:
- Requires basic Mermaid syntax knowledge for content authors
- No WYSIWYG editing capabilities

## Rationale
This approach supports our goal of machine-generated educational content by making diagram creation programmatically consistent across all technical documentation.