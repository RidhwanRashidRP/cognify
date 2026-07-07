import CognifyLogo from "./CognifyLogo";

export default function LandingPage({ onStart }) {
  return (
    <main className="shell shell--landing">
      <header className="site-nav" aria-label="Website navigation">
        <CognifyLogo />
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#demo">Demo</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="btn btn--primary" onClick={onStart}>
          Open Demo
        </button>
      </header>

      <section className="hero-card" id="home">
        <div className="hero-main">
          <p className="eyebrow">Cognify Workspace</p>
          <h1>Plan smarter. Study calmer. Finish stronger.</h1>
          <p>
            Cognify is an AI-powered student productivity experience that combines planning, prioritization,
            and coaching in one place so students can move from overwhelm to focused execution.
          </p>
          <p className="date-label">One product story, one interface, one daily workflow.</p>
          <div className="hero-actions">
            <button className="btn btn--primary" onClick={onStart}>
              Try Dashboard Demo
            </button>
            <a className="btn btn--ghost" href="#ai-workflow">
              View AI Logic
            </a>
          </div>
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

      <section className="section-block" id="features">
        <p className="eyebrow">Product Features</p>
        <h2>Everything in one student workflow</h2>
        <div className="section-grid section-grid--three">
          <article className="section-card">
            <h3>Planner + Task Board</h3>
            <p>Create tasks, set priorities, and track completion from pending to overdue with clear daily visibility.</p>
          </article>
          <article className="section-card">
            <h3>AI Recommendation</h3>
            <p>Receive immediate deadline-aware recommendations to identify the next best task and reduce decision fatigue.</p>
          </article>
          <article className="section-card">
            <h3>Calendar + Rewards</h3>
            <p>Keep momentum with progress metrics and completion tracking that rewards consistency, not last-minute panic.</p>
          </article>
        </div>
      </section>

      <section className="section-block" id="demo">
        <p className="eyebrow">Interactive Demo</p>
        <h2>See Cognify in action</h2>
        <div className="section-grid section-grid--two">
          <article className="section-card">
            <h3>AI Chat Support</h3>
            <p>
              Open the dashboard to try the AI coach, get quick study guidance, and stay focused on your next task.
            </p>
          </article>
          <article className="section-card">
            <h3>Task Prioritization</h3>
            <p>
              Add real deadlines and priorities, then view AI recommendations and progress cards update instantly.
            </p>
          </article>
        </div>
        <div className="hero-actions">
          <button className="btn btn--primary" onClick={onStart}>
            Launch Demo Dashboard
          </button>
        </div>
      </section>

      <section className="section-block section-block--cta" id="contact">
        <p className="eyebrow">Contact</p>
        <h2>Ready to study with more clarity?</h2>
        <p>
          Cognify helps students build calmer, more consistent study habits with practical AI-guided planning.
        </p>
        <div className="hero-actions">
          <button className="btn btn--primary" onClick={onStart}>
            Open Live Product Demo
          </button>
          <a className="btn btn--ghost" href="#home">
            Back to Top
          </a>
        </div>
      </section>
    </main>
  );
}
