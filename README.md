# Cognify

Cognify is a branded student productivity product that combines:
- A sectioned website experience for product presentation
- A dashboard for day-to-day student workflow
- AI-assisted guidance with fallback-safe behavior

## Product Story

Cognify is designed for students who struggle with overload, deadline pressure, and study inconsistency. The product flow is:
1. Understand the offer through a branded website landing experience
2. Enter the dashboard to plan and prioritize tasks
3. Use AI recommendation and coaching to decide what to do next

## Features

- Task planner and task board with deadline and priority tracking
- AI recommendation card grounded in current structured task data
- AI chat coach with three modes:
  - Local fallback mode (always available)
  - Google AI Studio Gemini mode
  - Botpress Cloud webchat mode
- Progress and calendar metrics for visibility and momentum
- Responsive UI for desktop and mobile

## Run Locally

1. Install dependencies.

   npm install

2. Start development server.

   npm start

3. Build production bundle.

   npm run build

If port 3000 is already in use, React will prompt you to run on another port.

## Deploy To Netlify (Easy + Free)

This project is configured for Netlify using:
- netlify.toml (build + publish settings)
- public/_redirects (SPA routing support)

Quick deployment steps:
1. Push your code to GitHub.
2. Go to Netlify and choose Add new project -> Import an existing project.
3. Connect your GitHub repository.
4. Build settings should auto-detect:
  - Build command: npm run build
  - Publish directory: build
5. Click Deploy site.

Your URL can be changed to a clean product name, for example:
- cognify.netlify.app
- bluecurrent.netlify.app

Tip: If your preferred site name is taken, choose a close variation.

## Beginner Setup: Gemini

1. Create an API key in Google AI Studio.
2. Copy .env.example to .env.
3. Set REACT_APP_GEMINI_API_KEY in .env.
4. Restart npm start.

Note: API calls are from browser for beginner simplicity. For production, move key usage to a backend.

## Beginner Setup: Botpress

1. Create a bot in Botpress Cloud.
2. Choose one method:
  - Legacy credentials: botId and clientId
  - Hosted snippet: inject.js URL and webchat bundle URL
3. Copy .env.example to .env.
4. Fill one configuration set:
  - Legacy:
    - REACT_APP_BOTPRESS_BOT_ID
    - REACT_APP_BOTPRESS_CLIENT_ID
  - Snippet:
    - REACT_APP_BOTPRESS_INJECT_URL
    - REACT_APP_BOTPRESS_BUNDLE_URL
5. Restart npm start.

## Technical Delivery Checklist

Use this list as submission evidence:

- Website deliverable
  - Branded product website with clear sections
  - Consistent visual language with dashboard
  - Responsive layout across desktop and mobile
  - Locally runnable with npm start
  - Public deployment on GitHub Pages

- AI implementation
  - Workflow logic that selects Botpress, Gemini, or local fallback
  - Structured data grounding for recommendation and coaching context
  - Prompt strategy focused on concise, actionable student coaching
  - Documented constraints and fallback behavior

- Testing and iteration evidence
  - Record failed scenarios and fixes
  - Record prompt improvements and behavior changes
  - Include screenshots for website, dashboard, and AI chat behavior

## Core Files

- src/app.js
- src/components/LandingPage.js
- src/components/DashboardPage.js
- src/components/dashboard/AIChatCard.js
- src/utils/taskUtils.js
