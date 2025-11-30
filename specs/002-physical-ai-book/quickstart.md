# Quickstart: Generating Course Content

## Prerequisites
1.  Node.js 18+ installed.
2.  Project dependencies installed (`npm install`).

## Adding New Modules
1.  Create a new folder in `docs/` (e.g., `docs/module-X`).
2.  Add an `intro.mdx` or other named MDX files.
3.  Add the `Personalization` and `Quiz` imports at the top:
    ```mdx
    import Personalization from '@site/src/components/Personalization';
    import Quiz from '@site/src/components/Quiz';
    ```
4.  Structure the content with 4 variants:
    ```jsx
    <Personalization level="novice" language="english">
      ...
    </Personalization>
    <Personalization level="expert" language="english">
      ...
    </Personalization>
    <Personalization level="novice" language="urdu">
      <div dir="rtl">...</div>
    </Personalization>
    <Personalization level="expert" language="urdu">
      <div dir="rtl">...</div>
    </Personalization>
    ```

## Extending Personalization
- The `Personalization` component needs to be updated to accept a `language` prop and filter based on it, matching the `PersonalizationContext`.

## Running locally
- `npm start`
