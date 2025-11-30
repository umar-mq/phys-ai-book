# Research Tasks for AI-Native Textbook Platform

This document outlines the research required to finalize the technical decisions for the project.

## 1. TypeScript Version

*   **Task**: Research the recommended TypeScript version for the latest Docusaurus version.
*   **Goal**: Decide on a specific TypeScript version to ensure compatibility and stability.
*   **Acceptance Criteria**: The chosen version is compatible with all other dependencies.

## 2. Testing Framework

*   **Task**: Research and decide on the best testing framework for a Docusaurus project.
*   **Goal**: Select a testing framework (e.g., Jest, Vitest, Playwright) for unit and component testing of React components within the Docusaurus environment.
*   **Acceptance Criteria**: The chosen framework is well-documented, has good community support, and integrates smoothly with Docusaurus and TypeScript.

## 3. Docusaurus and Tailwind CSS Integration

*   **Task**: Find best practices for integrating Tailwind CSS with Docusaurus.
*   **Goal**: Ensure a clean and maintainable integration that properly overrides Docusaurus's default Infima styling.
*   **Acceptance Criteria**: A clear guide on how to set up `tailwind.config.js`, `postcss.config.js`, and the main CSS file.

## 4. `better-auth/react` Integration Pattern

*   **Task**: Research the standard integration pattern for `better-auth/react` in a React (Docusaurus) application.
*   **Goal**: Understand how to correctly implement the auth provider, manage session state, and protect routes or components.
*   **Acceptance Criteria**: A code example or sequence diagram showing the authentication flow.

## 5. Mermaid.js Configuration in Docusaurus

*   **Task**: Research how to configure and use Mermaid.js within Docusaurus MDX files.
*   **Goal**: Ensure that Mermaid diagrams can be authored directly in Markdown and are rendered correctly on the frontend.
*   **Acceptance Criteria**: A working example of a Mermaid diagram in an `.mdx` file.
