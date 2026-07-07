export default function CalendarCard({ taskMetrics }) {
  return (
    <article className="card">
      <h2>Today Snapshot</h2>
      <div className="metric-grid">
        <p>
          <strong>{taskMetrics.total}</strong>
          <span>Total</span>
        </p>
        <p>
          <strong>{taskMetrics.pending}</strong>
          <span>Pending</span>
        </p>
        <p>
          <strong>{taskMetrics.overdue}</strong>
          <span>Overdue</span>
        </p>
        <p>
          <strong>{taskMetrics.completed}</strong>
          <span>Completed</span>
        </p>
      </div>
    </article>
  );
}
