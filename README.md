# Cognify App

Cognify is a student productivity dashboard with:
- Task planner and board
- Priority-based AI recommendation
- AI chat coach with three modes:
  - Local fallback mode (always works)
  - Google AI Studio (Gemini) mode
  - Botpress Cloud webchat mode

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm start
```

3. Build production bundle:

```bash
npm run build
```

## Beginner Setup: Google AI Studio

1. Go to Google AI Studio and create an API key.
2. Copy `.env.example` to `.env`.
3. Set `REACT_APP_GEMINI_API_KEY` in `.env`.
4. Restart `npm start`.
5. Open AI Chat Coach and send a message.

Notes:
- This project calls Gemini directly from the browser for beginner simplicity.
- For production, move API calls to a backend so your key is not exposed.

## Beginner Setup: Botpress Cloud

1. Create a bot in Botpress Cloud.
2. Get your `botId` and `clientId`.
3. Copy `.env.example` to `.env`.
4. Fill:
   - `REACT_APP_BOTPRESS_BOT_ID`
   - `REACT_APP_BOTPRESS_CLIENT_ID`
5. Restart `npm start`.

When configured, the Botpress webchat script is initialized automatically.

## Core Files

- `src/app.js`
- `src/components/DashboardPage.js`
- `src/components/dashboard/AIChatCard.js`
- `src/utils/taskUtils.js`
