# Feature Specification: AI-Native Textbook Platform Skeleton

**Feature Branch**: `001-ai-native-textbook-platform`  
**Created**: 2025-11-28  
**Status**: Draft  
**Input**: User description: "AI-Native Physical AI Textbook Platform & Skeleton **Intent:** Architect and build the "AI-Native Textbook Platform" capable of hosting the complete "Physical AI & Humanoid Robotics" course. The primary focus is developing the interactive *engine* (RAG, Personalization, Auth) and the complete structural *skeleton* (file hierarchy, component architecture) that will be populated by an external content generation agent. **Target Audience:** 1. **The End User (Student):** Requires a seamless reading experience where content adapts to their level (Novice/Pro) and language (English/Urdu). 2. **The Content Agent (System):** Requires a standardized MDX file structure and React Component library to target during content generation. **Success Evals (SMART):** * **Platform Functionality:** * **Auth:** Users can Sign Up/In via Better-Auth; profile state (Role/Language) persists. * **Personalization Engine:** A `<PersonalizationWrapper>` component successfully toggles visible text based on user state without hydration errors. * **RAG Chatbot:** The chat widget is embedded globally, connects to the Qdrant/FastAPI backend, and processes queries. * **Localization:** The i18n routing or state-based switching for Urdu is functional. * **Structural Integrity:** * **Complete Skeleton:** All Chapters/Modules defined in the syllabus exist as `.mdx` files in the correct Docusaurus hierarchy (e.g., `docs/module-1/intro.mdx`). * **Navigation:** The Sidebar correctly reflects the full course structure (Modules 1-4 + Capstone). * **Deployment:** The full site (scaffolding + MVP content) deploys to GitHub Pages with 0 errors. **Constraints:** * **Architecture:** Docusaurus (TypeScript), Tailwind CSS. * **Content Interface:** Content must be structured as MDX components (e.g., `<Concept>`, `<Math>`, `<Simulation>`) to allow the external agent to slot information in easily. * **Visuals:** Mermaid.js configured as the default diagram renderer. **Non-Goals:** * Manually writing the prose for all chapters within this Spec-Kit plan (content injection is a separate automated process). * Building custom physics engines in JS (we use pre-rendered assets or Mermaid for simulations)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student Authentication & Profile Setup (Priority: P1)

As a new student, I want to create an account, log in, and set my preferred experience level (e.g., "Novice" or "Professional") and language, so that my learning experience is tailored to my needs.

**Why this priority**: This is the foundation for all personalization features and for tracking user progress. Without it, the core value proposition of an adaptive textbook cannot be delivered.

**Independent Test**: A user can navigate to the site, successfully create an account, log out, log back in, and see their chosen profile settings (level and language) correctly displayed on a profile page.

**Acceptance Scenarios**:

1. **Given** a user is not logged in, **When** they navigate to the signup page and provide valid credentials, **Then** an account is created and they are logged in.
2. **Given** a logged-in user is on their profile page, **When** they select "Professional" as their experience level and "Urdu" as their language, **Then** their settings are saved.
3. **Given** a user with saved profile settings logs out and logs back in, **When** they visit their profile page, **Then** their previously saved settings ("Professional", "Urdu") are displayed.

---

### User Story 2 - Personalized Content Experience (Priority: P2)

As a logged-in student, I want to view a chapter and see the content (text, diagrams) automatically adapt to the experience level I selected in my profile, so that the material is at the right difficulty for me.

**Why this priority**: This is the core adaptive learning feature, directly impacting the student's comprehension and engagement.

**Independent Test**: Two users with different experience levels ("Novice" vs. "Professional") can view the same chapter page and be shown different versions of a specific content block.

**Acceptance Scenarios**:

1. **Given** a logged-in user has their experience level set to "Novice", **When** they view a chapter with adaptive content, **Then** they see the "Novice" version of the text and diagrams.
2. **Given** a logged-in user has their experience level set to "Professional", **When** they view the same chapter, **Then** they see the "Professional" (more detailed) version of the text and diagrams.
3. **Given** a logged-in user changes their experience level from "Novice" to "Professional" in their profile, **When** they navigate back to the chapter, **Then** the content updates to the "Professional" version.

---

### User Story 3 - Interactive Learning with Chatbot (Priority: P3)

As a student reading a chapter, I want to ask a question in a chat widget and receive a relevant answer, so that I can clarify concepts without leaving the platform.

**Why this priority**: Provides instant, on-demand support to students, enhancing the learning process and reducing friction.

**Independent Test**: A user can open the chat widget on any page, type a question, and receive a formatted answer.

**Acceptance Scenarios**:

1. **Given** a user is viewing any page on the platform, **When** they open the chat widget, **Then** the chat interface is displayed.
2. **Given** the chat widget is open, **When** the user types a question (e.g., "What is a state vector?") and submits it, **Then** a response is displayed in the chat window.

---

### User Story 4 - Content Skeleton & Navigation (Priority: P4)

As a content author (or automated agent), I want the entire course structure to be pre-defined with placeholder pages and a corresponding navigation sidebar, so that I can focus on populating the content for each section.

**Why this priority**: This ensures the platform has a complete and consistent structure from the start, enabling parallel content creation and providing a clear map of the entire course to end-users.

**Independent Test**: The deployed site shows a complete sidebar with links for all modules and chapters, and clicking any link leads to a valid page, even if it only contains placeholder content.

**Acceptance Scenarios**:

1. **Given** a user views the platform, **When** they look at the navigation sidebar, **Then** they see entries for all major modules (1-4) and the Capstone project.
2. **Given** the sidebar is visible, **When** a user clicks on a link to a chapter (e.g., "Module 1: Introduction"), **Then** they are taken to the correct page for that chapter.

### Edge Cases

- **What happens when** the authentication service is unavailable or a user's authentication token expires mid-session? The system should display a generic "Authentication service temporarily unavailable, please try again later" message. Users should still be able to access the core text of the book without authentication, but with limited AI functionality (e.g., notes, personalization, and advanced chatbot features requiring user context).
- **How does the system handle** a failure to fetch a response from the chatbot service? The chat interface should display a user-friendly error message and offer a "try again" option.
- **What happens when** content for a specific language or experience level is missing? The system should fall back gracefully to a default version (e.g., English, Novice) and ideally flag the missing content for authors.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to create an account and sign in.
- **FR-002**: System MUST allow users to manage a profile with their preferred experience level (e.g., Novice, Professional) and language.
- **FR-003**: The system MUST persist user profile settings across sessions.
- **FR-004**: Content visibility MUST adapt based on the user's selected experience level.
- **FR-005**: Content language MUST adapt based on the user's selected language.
- **FR-006**: The system MUST provide a globally accessible chat interface for users to ask questions.
- **FR-007**: The chat interface MUST process user queries and display responses.
- **FR-008**: The platform MUST have a complete and navigable structural skeleton representing all modules and chapters of the course.
- **FR-009**: The platform's navigation elements (e.g., sidebar) MUST accurately reflect the full course structure.
- **FR-010**: The system MUST support content composed of distinct components for concepts, mathematical notation, and simulations.
- **FR-011**: The system MUST render diagrams from a structured text-based format.
- **FR-012**: System MUST allow unauthenticated users to access the core text content of the textbook.

### Key Entities

- **User**: Represents a person interacting with the platform. All user authentication data (managed by Better-Auth) is stored in the platform's primary database. Key attribute is their associated Profile.
- **Profile**: Stores a User's preferences. All profile data is stored in the platform's primary database. Key attributes include `experienceLevel` ("Novice" or "Professional") and `language` (e.g., "English", "Urdu").
- **Content Module**: A logical grouping of content, such as a chapter or a course section.
- **Content Page**: A specific page within a module, corresponding to a single URL.
- **Content Component**: An individual piece of content on a page, which can have variations (e.g., a "Novice" version and a "Professional" version).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user's selected profile settings (experience level and language) are successfully retrieved and applied within 1 second of logging in.
- **SC-002**: At least two distinct content variations (e.g., Novice/Pro) can be rendered for a given topic, with the correct version being displayed based on the user's profile setting 100% of the time.
- **SC-003**: The chat widget is present on all content pages and returns a valid, non-error response to a test query within 5 seconds.
- **SC-004**: The navigation sidebar correctly displays links to 100% of the modules and chapters defined in the course syllabus.
- **SC-005**: The platform skeleton can be successfully built and deployed to a target web-hosting environment with a 100% success rate (zero build errors).
- **SC-006**: The platform reliably supports up to 100 concurrent users with all core functionalities (login, content viewing, chat interaction).
- **SC-007**: The platform maintains an uptime of 99% of scheduled operational time.


## Clarifications

### Session 2025-11-28

- Q: What is the data-hosting strategy for user profiles? → A: Better-Auth is a self-hosted library that writes directly to our Neon (Postgres) database. Therefore, the Neon database is the primary source of truth for BOTH the authentication data (users, sessions - managed by Better-Auth) AND the application-specific profile data (Level, Language - managed by our API). We own the data.
- Q: What is the target number of concurrent users the platform should be able to support reliably? → A: Up to 100 concurrent users.
- Q: How should the system behave if the authentication provider (Better-Auth) is unavailable during a user's sign-in or sign-up attempt? → A: Display a generic "Authentication service temporarily unavailable, please try again later" message. Auth is only needed for notes and customization option. The user should still be able to access the core text of the book without an account, just with limited AI functionality.
- Q: Are the current "Novice" and "Professional" levels a fixed set, or should the system be designed to accommodate additional levels in the future? → A: The levels "Novice" and "Professional" are a fixed, immutable set.
- Q: What are the high-level reliability or uptime goals for the platform? → A: Moderate availability (e.g., 99% uptime).

**Context:**
We are building the "Docusaurus Frontend" for the Physical AI Textbook.
The backend (FastAPI/Qdrant/Neon) is treated as an external API.
We are using Docusaurus with TypeScript and Tailwind CSS.

**Key Architectural Requirements:**
1.  **Global State:** We need a `PersonalizationProvider` (React Context) that wraps the entire app to manage `userLevel` (Novice/Expert) and `language` (English/Urdu).
2.  **Auth Integration:** We must use the `better-auth/react` client library to handle session state in the top-level layout.
3.  **Custom Components:**
    *   `<ChatWidget />`: A floating component present on every page.
    *   `<PersonalizedText />`: A component that renders children based on the `PersonalizationContext`.
4.  **Content Structure:** Modules are folders in `docs/`. Each module has an `intro.mdx` and multiple sub-chapter `.mdx` files.
5.  **Styling:** We are overriding Docusaurus's Infima styles with Tailwind CSS where possible.

**Generate a plan that breaks this down into:**
*   Phase 1: Core Configuration (Tailwind, Docusaurus Config, Mermaid).
*   Phase 2: Authentication & State (The Context Providers).
*   Phase 3: UI Components (ChatWidget, Toggle Buttons).
*   Phase 4: Content Skeleton (Creating the file structure).