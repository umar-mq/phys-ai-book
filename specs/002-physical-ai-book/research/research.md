# Research: Physical AI Course Book Implementation

## Docusaurus Limitations & Configuration

### Right-to-Left (RTL) Support
- **Findings**: Docusaurus has built-in support for RTL languages (like Urdu).
- **Configuration**: Requires setting `direction: 'rtl'` in `docusaurus.config.js` under `i18n.localeConfigs`.
- **Implication**: We can support Urdu natively. However, since the requirement is to have English and Urdu in the *same* page (toggleable) rather than separate localized sites, we need to handle text direction at the component level (e.g., `<div dir="rtl">`) rather than globally.

### Large MDX File Performance
- **Findings**: Large MDX files can cause memory issues during build ("JavaScript heap out of memory") and impact browser performance because MDX is compiled to React components.
- **Limit**: "10,000 words per section" is extremely large for a single MDX file, especially if duplicated 4 times (40k words).
- **Mitigation**:
    - Split content into smaller files and use MDX imports? No, that still compiles to one bundle.
    - **Decision**: We must split the "10,000 words" sections into smaller, logical sub-pages (e.g., "Module 1: Intro - Part 1", "Module 1: Intro - Part 2") or rely on lazy loading components if possible (hard in static site).
    - **Better Approach**: The requirement "10,000 words... duplicated 4 times" implies 40k words of text in one DOM. This is bad for UX and performance. We should likely use the `<Personalization>` component to *conditionally render* only the active variant, but all text is still in the bundle.
    - **Refined Decision**: We will stick to the requirement but advise the user about the performance risk. We will implement the content in a single file per logical "Section" but ensure the structure allows for future splitting if build fails.

## Content Structure Strategy

### The "4x Duplication" Requirement
- **Requirement**: "English Novice", "English Expert", "Urdu Novice", "Urdu Expert".
- **Implementation**:
    - We will use the existing `<Personalization>` component pattern found in `docs/module-1/intro.mdx`.
    - Content will be wrapped:
        ```jsx
        <Personalization level="novice" language="english">
           ... English Novice Content ...
        </Personalization>
        <Personalization level="expert" language="english">
           ... English Expert Content ...
        </Personalization>
        <Personalization level="novice" language="urdu">
           <div dir="rtl">
              ... Urdu Novice Content ...
           </div>
        </Personalization>
        ...
        ```
    - **Wait**, the current `<Personalization>` component in `docs/module-1/intro.mdx` only takes `level`. We need to check if it supports `language` or if we need to extend it.

### Quiz Implementation
- **Requirement**: "Detailed and challenging quiz".
- **Implementation**: The example `intro.mdx` uses a `<Quiz>` component. We will reuse this. It takes a JSON array of questions.

## Unknowns Resolution

- **Content Volume**: Resolved. It's a risk, but we will proceed with the single-file approach as requested, potentially breaking it down if needed.
- **Language Support**: Resolved. RTL is supported.
- **Quiz**: Resolved. Use `<Quiz>` component.
- **"Example Document"**: Resolved. Confirmed as `docs/module-1/intro.mdx`.
