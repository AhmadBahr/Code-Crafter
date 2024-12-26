# Code Editor

## Table of Contents
1. [**General Info**](#general-info)
2. [**Technologies Used**](#technologies-used)
3. [**Setup**](#setup)
4. [**Features**](#features) 
5. [**Code & Snippets**](#codesnippets)

![Demo App](/public/screenshot-for-readme.png)


## General Info
*   Project Description: A concise summary of the code editor project, including its purpose and key objectives.
*   Purpose: The primary goal or intended use of the code editor (e.g., for learning, for specific programming languages, for collaboration).

# Technologies Used:

*   Frontend:
*   React: A JavaScript library for building user interfaces.
*   Next.js: A React framework that enables server-side rendering and other features for building web applications.
*   Tailwind CSS: A utility-first CSS framework that provides pre-built CSS classes for rapid styling.
*   Framer Motion: A motion library for React that simplifies the creation of animations and interactions.
*   Monaco Editor: A powerful code editor component, originally developed by Microsoft for Visual Studio Code.
*   React Syntax Highlighter: A library for syntax highlighting code within your React application.
*   Lucide React: A collection of SVG icons for use in React projects.
*   Backend:
*   Convex: A serverless platform that provides data storage and functions for building backend logic.
*   svix: A library for handling webhooks (for integrations).
*   State Management:
*   Zustand: A lightweight state management library for React.
*   Styling:
*   Piston API: A cloud-based API for executing code in various programming languages.
*   UI Library:
*   Clerk: A user authentication and authorization platform for web applications.
*   Notifications:
*   React Hot Toast: A library for displaying user notifications (e.g., success, error, loading).
*   Build Tool:
*   Next.js: (As mentioned above) - Also used for building and optimizing the application for production.
*    Linting:
*   ESLint: A JavaScript linting tool that helps identify and fix code style and potential errors.
*   Type Checking:
*   TypeScript: A superset of JavaScript that adds static type checking for improved code maintainability and reliability.
## Highlights
*   🚀 Tech Stack: Next.js 15 + Convex + Clerk + TypeScript
*   💻 Online IDE with Multi-Language Support: Supports 10+ programming languages.
*   🎨 Customizable Experience: Choose from 5 popular VS Code themes.
*   ✨ Smart Output Handling: Clear visual cues for Success and Error states.
*   💎 Flexible Pricing: Offers both Free and Pro plans to suit various needs.
*   🤝 Community-Driven Code Sharing System: Easily share and discover code snippets from other users.
*   🔍 Advanced Filtering & Search Capabilities: Quickly find the code you need.
*   👤 Personal Profile: Track your execution history for easy reference.
*   📊 Comprehensive Statistics Dashboard: Gain insights into your coding activity.
*   ⚙️ Customizable Font Size Controls: Adjust the font size for optimal readability.
*   🔗 Webhook Integration Support: Integrate with external services for automated workflows.
  # Setup
  Prerequisites: Software and tools required before setting up the project (e.g., Node.js, npm or yarn).
*   Installation: Steps involved in installing project dependencies and setting up the development environment.
*   Development Server: Instructions for starting the development server to run and test the code editor locally.
*   Building for Production: Steps for building the project for deployment to a production environment (e.g., optimization, minification).
*  Environment Setup:
*   Create a .env file in your project root and add the following variables:
*   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= (from Clerk)
*   CLERK_SECRET_KEY= (from Clerk)
*   CONVEX_DEPLOYMENT= (from your Convex deployment)
*   NEXT_PUBLIC_CONVEX_URL= (from your Convex deployment)
*   In your Convex Dashboard, add the following environment variables:
*   CLERK_WEBHOOK_SECRET= (for Clerk webhook integration)
*   LEMON_SQUEEZY_WEBHOOK_SECRET= (for Lemon Squeezy webhook integration, if applicable)
*   Run the development server: npm run dev (Nextjs) and npm convex dev (convex)
  ## Features
*  Code Editing with Syntax Highlighting: Core functionality of the editor, enabling users to write code and see it with proper syntax coloring.
*    Multi-Language Support: Allows users to submit code in various programming languages (e.g., Python, JavaScript, C++, Java) and receive the output.
*   User Authentication (using Clerk): Allows users to log in and access the code editor securely.
   ## Code & Snippets
*   Monaco Editor Example:
    components/CodeEditor.tsx
*   Convex Function Example:
    lib/convex/functions/executeCode.js
*   Webhook Handler Example:
    pages/api/webhooks/svix.ts
