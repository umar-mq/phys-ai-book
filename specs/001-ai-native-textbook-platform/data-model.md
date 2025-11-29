# Data Model (Frontend Perspective)

This document describes the shape of the data that the Docusaurus frontend consumes. The source of truth for this data is the backend API.

## User

Represents a person interacting with the platform. The frontend receives user information from the `better-auth/react` client library.

-   **id**: `string` (Unique identifier for the user)
-   **email**: `string` (User's email address)
-   **profile**: `Profile` (Associated user preferences)

## Profile

Stores a user's preferences for content personalization.

-   **experienceLevel**: `"Novice" | "Professional"`
-   **language**: `"English" | "Urdu"`

## Content Hierarchy

This is not a data model fetched from an API, but rather the structure of the content within the Docusaurus project itself.

-   **Content Module**: A directory in the `/docs` folder.
-   **Content Page**: An `.mdx` file within a module directory.
-   **Content Component**: A React component within an `.mdx` file that can have different variants based on the user's `Profile`.
