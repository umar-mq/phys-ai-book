# Project Constitution: The "Physical AI" Educational Framework

## 1. Vision & Core Principles
**Project:** Physical AI & Humanoid Robotics Textbook (Panaversity Hackathon 2025)
**Mission:** To create the world's first "Living Textbook" where content is not just read, but interacted with, personalized, and audibly consumed.

**Core Principles:**
1.  **Agentic First:** The book is not static text. It is a retrieval-augmented environment.
2.  **Embodied Precision:** We are teaching *Physical* AI. Code examples must be theoretically deployable to real hardware (Jetson Orin/Unitree), not just "pseudocode."
3.  **Bilingual Access:** Knowledge is universal. Every conceptual explanation must be instantly toggleable between English and Urdu.
4.  **Verifiable Rigor:** Given the use of Generative AI, all technical claims regarding physics or ROS 2 APIs must be verified against official documentation or research papers.

## 2. Global Quality Standards (The "Must-Haves")

### A. Content & Pedagogical Standards
*   **Depth:** "Novice" content targets Grade 8 reading level (conceptual). "Expert" content targets Undergraduate Engineering level (technical).
*   **Structure:** Every chapter must follow the "Concept -> Math -> Code -> Simulation" pipeline.
*   **Visuals:** No hallucinations. All diagrams (flowcharts, architecture) must be generated via **Mermaid.js** code blocks, not raster images.
*   **Citations:** All technical assertions (e.g., "The update rate of the IMU...") must be cited using the IEEE format.

### B. Technical & Architectural Standards
*   **Framework:** All content must be written in **MDX** (Markdown + JSX) for Docusaurus.
*   **Interactivity:**
    *   Static HTML is forbidden for core concepts. Use React Components (`<SimulationViewer />`, `<CodeBlock />`) where possible.
    *   Every page must include the `<PersonalizationWrapper />` to handle state-based content rendering.
*   **Backend:**
    *   The RAG system must utilize **Qdrant** for vector storage and **Neon (Postgres)** for user state.
    *   Latency: Chat responses must be streamed (no waiting for full generation).

### C. Language & Localization Standards
*   **Translation:** Urdu translations must be technically accurate (e.g., "Artificial Intelligence" -> "Masnooi Zahanat", not phonetic transliteration), stored in parallel MDX files or i18n JSONs.
*   **Audio:** Every chapter summary must have a corresponding high-quality Audio Overview (generated via TTS) embedded at the top.

## 3. Constraints & Limits
*   **Deployment:** Must deploy flawlessly to **GitHub Pages** (Static Generation).
*   **Hardware Agnosticism:** While written for NVIDIA Isaac Sim, concepts must be explained in a way that applies to general robotics (URDF, ROS 2 standard).
*   **Authentication:** Sensitive user data (learning preferences) must be secured via **Better-Auth**.

## 4. Success Criteria
*   **The "Switch" Test:** A user toggling "Urdu" sees the change instantly ( < 200ms).
*   **The "Query" Test:** The RAG Chatbot can answer a question specific to the text on the *current* page with > 90% accuracy.
*   **The "Build" Test:** `npm run build` completes with zero errors and zero broken links.
*   **The "Judge" Test:** The demo video clearly showcases the Personalization, Urdu translation, and RAG Chatbot within the first 60 seconds.