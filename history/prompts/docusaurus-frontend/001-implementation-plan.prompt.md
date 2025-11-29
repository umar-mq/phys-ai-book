---
ID: 001
TITLE: Implementation Plan for Docusaurus Frontend
STAGE: plan
DATE_ISO: 2025-11-29
SURFACE: agent
MODEL: claude-sonnet-4-5-20250929
FEATURE: Docusaurus Frontend
BRANCH: 001-ai-native-textbook-platform
USER: <current user>
COMMAND: /sp.plan
LABELS:
  - architecture
  - docusaurus
LINKS:
  SPEC: null
  TICKET: null
  ADR: null
  PR: null
FILES_YAML:
  - docusaurus.config.js
  - tailwind.config.js
  - src/context/AuthContext.jsx
  - src/components/PersonalizedText.jsx
TESTS_YAML: []
PROMPT_TEXT: "\n**Context:**\nWe are building the \"Docusaurus Frontend\" for the Physical AI Textbook.\nThe backend (FastAPI/Qdrant/Neon) is treated as an external API.\nWe are using Docusaurus with TypeScript and Tailwind CSS.\n\n**Key Architectural Requirements:**\n1.  **Global State:** We need a `PersonalizationProvider` (React Context) that wraps the entire app to manage `userLevel` (Novice/Expert) and `language` (English/Urdu).\n2.  **Auth Integration:** We must use the `better-auth/react` client library to handle session state in the top-level layout.\n3.  **Custom Components:\n    *   `<ChatWidget />`: A floating component present on every page.\n    *   `<PersonalizedText />`: A component that renders children based on the `PersonalizationContext`.\n4.  **Content Structure:** Modules are folders in `docs/`. Each module has an `intro.mdx` and multiple sub-chapter `.mdx` files.\n5.  **Styling:** We are overriding Docusaurus's Infima styles with Tailwind CSS where possible.\n\n**Generate a plan that breaks this down into:**
*   Phase 1: Core Configuration (Tailwind, Docusaurus Config, Mermaid).\n*   Phase 2: Authentication & State (The Context Providers).\n*   Phase 3: UI Components (ChatWidget, Toggle Buttons).\n*   Phase 4: Content Skeleton (Creating the file structure)."
RESPONSE_TEXT: "\n### Implementation Plan for AI-Native Textbook Platform Frontend\n\n**Step 1: Initialize Docusaurus Configuration**\n- Create `docusaurus.config.js` at project root\n- Define basic site config, theme settings, and plugin declarations\n- Configure routing structure for textbook content organization\n\n**Step 2: Tailwind CSS Integration**\n1. Create `tailwind.config.js` with:\n```js\n/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    './src/**/*.{ts,tsx}',\n    './docs/**/*.{md,mdx}'\n  ],\n  theme: {\n    extend: {}\n  },\n  plugins: [],\n}\n```
2. Create `postcss.config.js` with Tailwind integration\n3. Add base styles in `src/css/tailwind.css`\n\n**Step 3: Mermaid Diagram Support**\n- Install required packages:\n```bash\nnpm install mermaid @docusaurus/plugin-mermaid\n```
- In docusaurus.config.js:\n```js\nmodule.exports = {\n  plugins: [\n    [\n      '@docusaurus/plugin-mermaid',\n      {\n        theme: 'default', \n        darkTheme: 'dark'\n      }\n    ]\n  ],\n}\n```
\n**Step 4: Authentication Setup**\n1. Create auth context in `src/context/AuthContext.js`\n2. Initialize AuthProvider in docusaurus.config.js:\n```js\nimport {AuthProvider} from './src/context/AuthContext';\n\nmodule.exports = {\n  themes: [AuthProvider],\n};\n```
3. Implement protected routes logic in components\n\n**Step 5: Personalization Context**\n- Create `src/context/PersonalizationContext.js` with reducer for:\n  - UI preferences (theme, font size)\n  - Content filters (difficulty level, topics)\n  - Learning progress tracking\n\n**Step 6: Custom Component Implementation**\n1. Create component directory structure:\n```
src/components/\n├── Layout/\n│   ├── Header.jsx\n│   └── Footer.jsx\n└── Textbook/\n    ├── ChapterWrapper.jsx\n    └── ExercisePanel.jsx\n```
2. Implement AI-enhanced components with Tailwind styling\n\n**Step 7: Content Structure Initialization**\n- Create initial directory structure:\n```
docs/
├── core-concepts/
│   ├── index.md
│   └── ai-foundations.md
└── exercises/
    ├── problem-set-1.md
    └── project-template.md
```
"
---