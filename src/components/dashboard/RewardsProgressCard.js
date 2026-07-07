export default function RewardsProgressCard({ taskMetrics }) {
  const progress = taskMetrics.total === 0 ? 0 : Math.round((taskMetrics.completed / taskMetrics.total) * 100);

  return (
    <article className="card">
      <h2>Rewards Progress</h2>
      <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-value" style={{ width: `${progress}%` }} />
      </div>
      <p className="subtle-text">{progress}% tasks completed. Keep your streak alive.</p>
    </article>
  );
}
