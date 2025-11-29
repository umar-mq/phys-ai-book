# Quickstart: AI-Native Textbook Platform Frontend

This guide provides instructions to set up and run the Docusaurus frontend project.

## Prerequisites

-   **Node.js**: Version 18.x or higher.
-   **Yarn** (recommended) or **npm**.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd my-research-paper
    ```

2.  **Install dependencies**:
    ```bash
    # Using Yarn
    yarn install

    # Or using npm
    npm install
    ```

## Development

1.  **Start the development server**:
    ```bash
    # Using Yarn
    yarn start

    # Or using npm
    npm run start
    ```
    This will start a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

2.  **Environment Variables**:
    Create a `.env` file in the root of the project and add any necessary environment variables, such as the backend API endpoint.

    ```
    API_BASE_URL=http://localhost:8000
    ```

## Build

To build the static site for production:

```bash
# Using Yarn
yarn build

# Or using npm
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
