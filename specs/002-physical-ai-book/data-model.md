# Data Model

## Entities

### Content Components
The content is static MDX, but structured via React components.

- **Personalization**:
    - **Purpose**: Wraps content to show/hide based on user context.
    - **Props**:
        - `level`: 'novice' | 'expert' (mapped to 'professional')
        - `language`: 'English' | 'Urdu' (New Prop Needed)
    - **Context**: Consumes `PersonalizationContext`.

- **Quiz**:
    - **Purpose**: End-of-chapter assessment.
    - **Props**: `questions` (Array of objects)
    - **Question Object**:
        - `question`: string
        - `options`: string[]
        - `correctAnswer`: number (index)

## State Management

### PersonalizationContext
Existing context needs to be leveraged.
- **State**:
    - `experienceLevel`: 'Novice' | 'Professional'
    - `language`: 'English' | 'Urdu'

## File Structure
- `docs/`
    - `module-1/`
        - `intro.mdx` (Existing)
        - `ros-basics.mdx` (New)
    - `module-2/`
        - `gazebo.mdx` (New)
        - `unity.mdx` (New)
    - `module-3/`
        - `isaac-sim.mdx` (New)
    - `module-4/`
        - `vla.mdx` (New)
