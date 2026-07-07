import CognifyLogo from "./CognifyLogo";

export default function LandingPage({ onStart }) {
  return (
    <main className="shell shell--landing">
      <section className="hero-card">
        <CognifyLogo />
        <p className="eyebrow">Cognify Workspace</p>
        <h1>Plan smarter. Study calmer. Finish stronger.</h1>
        <p>
          Track deadlines, focus on the right task, and get coaching-style guidance from your AI study
          assistant.
        </p>
        <p className="date-label">Your personal study companion for clear priorities and steady progress.</p>
        <button className="btn btn--primary" onClick={onStart}>
          Enter Dashboard
        </button>
      </section>
    </main>
  );
}
