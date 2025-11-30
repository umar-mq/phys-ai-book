# Tasks: Physical AI Course Book

**Feature**: Physical AI Course Book
**Status**: Draft

## Phase 1: Setup
- [ ] T001 Update `docusaurus.config.ts` to support RTL (Urdu) and English locales as per research findings.
- [ ] T002 Update `src/contexts/PersonalizationProvider.tsx` to include `language` state ('English' | 'Urdu') and persistence logic.
- [ ] T003 Update `src/components/Personalization/index.tsx` to accept and handle `language` prop.
- [ ] T004 Create `src/components/Personalization/styles.css` (or update existing) to handle RTL styling helpers if needed.
- [ ] T005 [P] Create placeholder MDX files for all modules defined in `course_outline.md` (`docs/module-1/ros-basics.mdx`, `docs/module-2/gazebo.mdx`, `docs/module-3/isaac-sim.mdx`, `docs/module-4/vla.mdx`) to establish the structure.

## Phase 2: User Story 1 - Read Physical AI Course Material (Priority: P1)
**Goal**: Users can access and read the core course content.
**Independent Test**: Navigate to `docs/module-1/ros-basics.mdx` and see rendered content.

- [ ] T006 [P] [US1] Write content for Module 1: ROS 2 Basics (`docs/module-1/ros-basics.mdx`) - English Novice variant.
- [ ] T007 [P] [US1] Write content for Module 1: ROS 2 Basics (`docs/module-1/ros-basics.mdx`) - English Expert variant.
- [ ] T008 [P] [US1] Write content for Module 1: ROS 2 Basics (`docs/module-1/ros-basics.mdx`) - Urdu Novice variant (RTL).
- [ ] T009 [P] [US1] Write content for Module 1: ROS 2 Basics (`docs/module-1/ros-basics.mdx`) - Urdu Expert variant (RTL).
- [ ] T010 [US1] Add Quiz component to Module 1: ROS 2 Basics.
- [ ] T011 [US1] Configure sidebar in `sidebars.ts` to include the new Module 1 page.

## Phase 3: User Story 1 (Continued) - Remaining Modules (Priority: P1)
**Goal**: Complete the remaining course modules.
**Independent Test**: Navigate to all module pages and verify content rendering.

- [ ] T012 [P] [US1] Write content for Module 2: Gazebo & Unity (`docs/module-2/gazebo.mdx`, `docs/module-2/unity.mdx`) - All 4 variants + Quiz.
- [ ] T013 [P] [US1] Write content for Module 3: NVIDIA Isaac (`docs/module-3/isaac-sim.mdx`) - All 4 variants + Quiz.
- [ ] T014 [P] [US1] Write content for Module 4: VLA (`docs/module-4/vla.mdx`) - All 4 variants + Quiz.
- [ ] T015 [US1] Update `sidebars.ts` to include all new pages.

## Phase 4: User Story 2 - Consistent Formatting & Readability (Priority: P2)
**Goal**: Ensure consistent styling and RTL support.
**Independent Test**: Switch language to Urdu and verify RTL layout; verify fonts.

- [ ] T016 [US2] Verify and adjust Tailwind CSS for RTL layout in `src/css/custom.css`.
- [ ] T017 [US2] Audit all generated pages for consistent use of Mermaid diagrams and styling.
- [ ] T018 [US2] Add manual visual regression test for "Switch" test (English -> Urdu toggle < 200ms check).

## Phase 5: Polish & Cross-Cutting
- [ ] T019 Clean up any temporary placeholder files.
- [ ] T020 Run full build check `npm run build` to ensure large MDX files don't break the build.

## Dependencies

1.  **Phase 1 (Setup)**: Must be completed first to enable localization and structure.
    *   T002 & T003 are prerequisites for properly rendering the 4 variants in all content tasks.
2.  **Phase 2 & 3 (Content)**:
    *   Content writing tasks (T006-T009, T012-T014) can be done in parallel once the placeholders and personalization components are ready.
    *   Sidebar updates (T011, T015) depend on file creation.
3.  **Phase 4 (Formatting)**: Can be done iteratively, but final audit (T017) should happen after content is drafted.

## Implementation Strategy

1.  **MVP**: Implement Phase 1 and Phase 2 (Module 1 only). This proves the 4-variant architecture and RTL support.
2.  **Full Scope**: Implement Phase 3 (remaining modules).
3.  **Polish**: Finalize styling and build checks.
