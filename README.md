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
2. Choose one connection method:
  - Method A (legacy credentials): get `botId` and `clientId`
  - Method B (hosted snippet): copy `inject.js` URL and the Botpress bundle URL from your embed snippet
3. Copy `.env.example` to `.env`.
4. Fill one of these sets:
  - Method A:
    - `REACT_APP_BOTPRESS_BOT_ID`
    - `REACT_APP_BOTPRESS_CLIENT_ID`
  - Method B:
    - `REACT_APP_BOTPRESS_INJECT_URL`
    - `REACT_APP_BOTPRESS_BUNDLE_URL`
5. Restart `npm start`.

When configured, the Botpress webchat script is initialized automatically and can be opened from the AI Chat card.

## Core Files

- `src/app.js`
- `src/components/DashboardPage.js`
- `src/components/dashboard/AIChatCard.js`
- `src/utils/taskUtils.js`
