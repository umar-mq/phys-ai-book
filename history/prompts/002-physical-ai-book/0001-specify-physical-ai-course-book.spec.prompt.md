---
id: 0001
title: Specify Physical AI Course Book
stage: spec
date: 2025-11-30
surface: agent
model: gemini-1.5-pro
feature: 002-physical-ai-book
branch: 002-physical-ai-book
user: user
command: /sp.specify We need to write out an entire book for a Phsyical AI course, using the existing formatting in docs/module-1/intro.mdx. You can read the course requirements from course_outline.md.
labels: [specification, physical-ai-book]
links:
  spec: specs/002-physical-ai-book/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-physical-ai-book/spec.md
  - specs/002-physical-ai-book/checklists/requirements.md
tests:
  - Specification Quality Checklist
---

## Prompt

```text
We need to write out an entire book for a Phsyical AI course, using the existing formatting in docs/module-1/intro.mdx. You can read the course requirements from course_outline.md.
```

## Response snapshot

```text
## Question 1: Course Outline File Location and Content

**Context**: The feature specification for the "Physical AI Course Book" (specs/002-physical-ai-book/spec.md) states that the course requirements should be read from `course_outline.md`. I attempted to read this file from the project root (`F:\PhysicalAI Book\my-research-paper\course_outline.md`) but it was not found.

**What we need to know**: Please provide the correct path to `course_outline.md` or, if the file needs to be created, provide its full content.

**Suggested Answers**:

| Option | Answer | Implications |
|--------|--------|--------------|
| A      | The file is located at `[path/to/course_outline.md]` (Please provide the full path) | I will read the file from the provided path and update the spec. |
| B      | The file needs to be created. Here is the content: ```[Paste content here]``` | I will create `course_outline.md` in the project root with the provided content and update the spec. |
| Custom | Provide your own answer | Please specify the path and/or content clearly. |

**Your choice**: _[Wait for user response]_
```

## Outcome

- ✅ Impact: Created a feature specification for the Physical AI Course Book, including user scenarios, requirements, and success criteria. Resolved the clarification regarding `course_outline.md`.
- 🧪 Tests: Ran a specification quality checklist, which passed after resolving the clarification.
- 📁 Files: Created `specs/002-physical-ai-book/spec.md` and `specs/002-physical-ai-book/checklists/requirements.md`.
- 🔁 Next prompts: Next step is to proceed with `/sp.plan`.
- 🧠 Reflection: The initial prompt was ambiguous regarding the location of `course_outline.md`, which necessitated a clarification step.

## Evaluation notes (flywheel)

- Failure modes observed: Initial `course_outline.md` not found.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null