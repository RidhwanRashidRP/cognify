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
  const [botpressReady, setBotpressReady] = useState(false);

  const botpressLegacyConfigured = useMemo(() => {
    return Boolean(process.env.REACT_APP_BOTPRESS_BOT_ID && process.env.REACT_APP_BOTPRESS_CLIENT_ID);
  }, []);

  const botpressSnippetConfigured = useMemo(() => {
    return Boolean(process.env.REACT_APP_BOTPRESS_INJECT_URL && process.env.REACT_APP_BOTPRESS_BUNDLE_URL);
  }, []);

  const botpressConfigured = botpressLegacyConfigured || botpressSnippetConfigured;

  const geminiConfigured = useMemo(() => {
    return Boolean(process.env.REACT_APP_GEMINI_API_KEY);
  }, []);

  const showInlineCoach = !botpressConfigured;

  useEffect(() => {
    if (!botpressConfigured) return;

    const injectScriptId = "cognify-botpress-webchat-inject";
    const injectUrl = botpressSnippetConfigured
      ? process.env.REACT_APP_BOTPRESS_INJECT_URL
      : "https://cdn.botpress.cloud/webchat/v2.2/inject.js";

    const injectExisting = document.getElementById(injectScriptId);
    if (!injectExisting && window) {
      const script = document.createElement("script");
      script.id = injectScriptId;
      script.src = injectUrl;
      script.async = true;

      script.onload = () => {
        if (!window.botpress) return;

        if (botpressSnippetConfigured) {
          const bundleScriptId = "cognify-botpress-webchat-bundle";
          if (!document.getElementById(bundleScriptId)) {
            const bundleScript = document.createElement("script");
            bundleScript.id = bundleScriptId;
            bundleScript.src = process.env.REACT_APP_BOTPRESS_BUNDLE_URL;
            bundleScript.defer = true;
            document.body.appendChild(bundleScript);
          }
          setBotpressReady(Boolean(window.botpress?.open));
          return;
        }

        window.botpress.init({
          botId: process.env.REACT_APP_BOTPRESS_BOT_ID,
          clientId: process.env.REACT_APP_BOTPRESS_CLIENT_ID,
          hostUrl: "https://cdn.botpress.cloud/webchat/v2.2",
          messagingUrl: "https://messaging.botpress.cloud",
          useSessionStorage: true,
          themeMode: "light",
        });

        setBotpressReady(Boolean(window.botpress?.open));
      };

      document.body.appendChild(script);
    }
  }, [botpressConfigured, botpressLegacyConfigured, botpressSnippetConfigured]);

  useEffect(() => {
    if (!botpressConfigured) {
      setBotpressReady(false);
      return;
    }

    const timer = window.setInterval(() => {
      setBotpressReady(Boolean(window.botpress?.open));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [botpressConfigured]);

  const getGeminiReply = async (value) => {
    const model = process.env.REACT_APP_GEMINI_MODEL || "gemini-2.0-flash";
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
      const errorBody = await response.text();
      const error = new Error("Gemini request failed");
      error.status = response.status;
      error.body = errorBody;
      throw error;
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
      const shouldUseGemini = geminiConfigured && showInlineCoach;
      const replyText = shouldUseGemini
        ? await getGeminiReply(value)
        : buildCoachReply(value, tasks);

      const replyMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: replyText,
      };

      setMessages((prev) => [...prev, replyMessage]);
    } catch (error) {
      let reason = "Gemini temporarily unavailable.";
      if (error?.status === 429) {
        reason = "Gemini quota exceeded for this key.";
      } else if (error?.status === 401 || error?.status === 403) {
        reason = "Gemini key is invalid or lacks permission.";
      } else if (error?.status === 404) {
        reason = "Gemini model is unavailable for your account.";
      }
      const fallbackMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: `${reason} I switched to local coach mode. ` + buildCoachReply(value, tasks),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const openBotpressChat = () => {
    if (!window.botpress?.open) {
      setBotpressReady(false);
      return;
    }

    setBotpressReady(true);
    window.botpress.open();
  };

  return (
    <article className="card card--full card--chat">
      <h2>AI Chat Coach</h2>
      <section className="bot-identity" aria-label="Cognify Bot intro">
        <div className="bot-avatar" aria-hidden="true">
          <span className="bot-avatar__ring" />
          <span className="bot-avatar__core" />
        </div>
        <div>
          <p className="bot-name">Cognify Bot</p>
          <p className="subtle-text">
            Get help with study planning, deadline prioritization, revision structure, and staying focused when work starts piling up.
          </p>
        </div>
      </section>
      <div className="chat-card-top">
        <p className="subtle-text">Study support, one focused step at a time.</p>
        {botpressConfigured ? <span className={`status-dot ${botpressReady ? "status-dot--online" : "status-dot--offline"}`} /> : null}
      </div>

      {showInlineCoach ? (
        <>
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
        </>
      ) : (
        <section className="botpress-panel" aria-live="polite">
          <div className="botpress-actions">
            <button className="btn btn--primary" onClick={openBotpressChat} disabled={!botpressConfigured}>
              Open Cognify Bot
            </button>
          </div>
        </section>
      )}

      {showInlineCoach ? (
        <div className="note-box">
          <button className="btn btn--primary" onClick={openBotpressChat} disabled={!botpressConfigured}>
            Open Cognify Bot
          </button>
        </div>
      ) : null}
    </article>
  );
}
