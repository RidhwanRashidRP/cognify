import CognifyLogo from "./CognifyLogo";

export default function LandingPage({ onStart }) {
  return (
    <main className="shell shell--landing">
      <section className="hero-card">
        <div className="hero-main">
          <CognifyLogo />
          <p className="eyebrow">Cognify Workspace</p>
          <h1>Plan smarter. Study calmer. Finish stronger.</h1>
          <p>
            Track deadlines, focus on the right task, and get coaching-style guidance from your AI study
            assistant.
          </p>
          <p className="date-label">Your personal study companion for clear priorities and steady progress.</p>
          <button className="btn btn--primary" onClick={onStart}>
            Get Started
          </button>
        </div>

        <aside className="hero-side" aria-label="Cognify quick highlights">
          <article className="hero-chip">
            <p className="hero-chip__title">Daily Priorities</p>
            <p className="hero-chip__text">Know what to tackle first with deadline-first task ranking.</p>
          </article>
          <article className="hero-chip">
            <p className="hero-chip__title">Guided Focus</p>
            <p className="hero-chip__text">Use Cognify Bot for revision plans, motivation, and next-step coaching.</p>
          </article>
          <article className="hero-chip">
            <p className="hero-chip__title">Progress Visibility</p>
            <p className="hero-chip__text">Track completed, pending, and overdue work at a glance.</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
