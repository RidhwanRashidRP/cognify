import { useEffect, useMemo, useState } from "react";
import { getAdvice } from "../../utils/taskUtils";

function buildCoachReply(input, tasks) {
  const text = input.toLowerCase();

  if (text.includes("deadline") || text.includes("urgent")) {
    return getAdvice(tasks);
  }

  if (text.includes("motivate") || text.includes("tired") || text.includes("stress")) {
    return "You are not behind, you are in progress. Pick one 25-minute block on your highest-priority task, then take a short break.";
  }

  if (text.includes("plan") || text.includes("today")) {
    if (tasks.length === 0) {
      return "Add one task first, then I can generate a focused plan for your day.";
    }

    const list = tasks
      .slice(0, 3)
      .map((task, index) => `${index + 1}. ${task.title} (${task.priority}, due ${task.deadline})`)
      .join(" ");

    return `Try this plan: ${list}`;
  }

  return "Ask me about deadlines, planning today, or motivation and I will coach you through your next step.";
}

export default function AIChatCard({ tasks }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I am Cognify Coach. Ask for a study plan, deadline priorities, or motivation.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  const botpressConfigured = useMemo(() => {
    return Boolean(process.env.REACT_APP_BOTPRESS_BOT_ID && process.env.REACT_APP_BOTPRESS_CLIENT_ID);
  }, []);

  const geminiConfigured = useMemo(() => {
    return Boolean(process.env.REACT_APP_GEMINI_API_KEY);
  }, []);

  useEffect(() => {
    if (!botpressConfigured) return;

    const scriptId = "cognify-botpress-webchat";
    if (document.getElementById(scriptId) || !window) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;

    script.onload = () => {
      if (!window.botpress) return;

      window.botpress.init({
        botId: process.env.REACT_APP_BOTPRESS_BOT_ID,
        clientId: process.env.REACT_APP_BOTPRESS_CLIENT_ID,
        hostUrl: "https://cdn.botpress.cloud/webchat/v2.2",
        messagingUrl: "https://messaging.botpress.cloud",
        useSessionStorage: true,
        themeMode: "light",
      });
    };

    document.body.appendChild(script);
  }, [botpressConfigured]);

  const getGeminiReply = async (value) => {
    const model = process.env.REACT_APP_GEMINI_MODEL || "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`;

    const prompt = `You are Cognify Coach for students. Keep answers concise and actionable. User message: ${value}. Current tasks: ${JSON.stringify(
      tasks
    )}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Gemini request failed");
    }

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I could not generate a response right now. Please try again."
    );
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || isSending) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", text: value };
    setMessages((prev) => [...prev, userMessage]);
    setDraft("");

    setIsSending(true);
    try {
      const replyText = geminiConfigured
        ? await getGeminiReply(value)
        : buildCoachReply(value, tasks);

      const replyMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: replyText,
      };

      setMessages((prev) => [...prev, replyMessage]);
    } catch (error) {
      const fallbackMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Gemini is not reachable right now, so I switched to local coach mode. " + buildCoachReply(value, tasks),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const openBotpressGuide = () => {
    window.open("https://botpress.com/docs/cloud/get-started", "_blank", "noopener,noreferrer");
  };

  return (
    <article className="card card--wide">
      <h2>AI Chat Coach</h2>
      <p className="subtle-text">
        Beginner mode is active. Local coach works now, with optional Gemini and Botpress integration.
      </p>

      <div className="chat-log" aria-live="polite">
        {messages.map((message) => (
          <p key={message.id} className={`chat-bubble chat-bubble--${message.role}`}>
            {message.text}
          </p>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={sendMessage}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask: what should I focus on today?"
          disabled={isSending}
        />
        <button className="btn btn--primary" type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>

      <div className="note-box">
        <p>
          {geminiConfigured
            ? "Gemini API key detected. Responses are coming from Google AI Studio unless there is an API error."
            : "To connect Gemini, add REACT_APP_GEMINI_API_KEY in a .env file. For production, route requests through a backend server."}
        </p>
        <p>
          {botpressConfigured
            ? "Botpress config detected. Open the Botpress bubble with window.botpress.open() from browser console if needed."
            : "To connect Botpress Cloud, add REACT_APP_BOTPRESS_BOT_ID and REACT_APP_BOTPRESS_CLIENT_ID in .env."}
        </p>
      </div>

      <div className="note-box">
        <button className="btn btn--ghost" onClick={openBotpressGuide}>
          Open Botpress Setup Guide
        </button>
      </div>
    </article>
  );
}
