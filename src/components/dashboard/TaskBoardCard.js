import { getTaskStatus } from "../../utils/taskUtils";

export default function TaskBoardCard({ tasks, todayKey, onToggleCompleted, onDeleteTask }) {
  return (
    <article className="card card--wide">
      <h2>Task Board</h2>
      {tasks.length === 0 ? (
        <p className="subtle-text">No tasks yet. Add one to start organizing your study sprint.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => {
            const status = getTaskStatus(task, todayKey);
            return (
              <li key={task.id} className={`task-item status-${status}`}>
                <div>
                  <p className="task-title">{task.title}</p>
                  <p className="task-meta">
                    {task.category} | {task.priority} | due {task.deadline}
                  </p>
                </div>
                <div className="task-actions">
                  <button className="btn btn--ghost" onClick={() => onToggleCompleted(task.id)}>
                    {task.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                  <button className="btn btn--danger" onClick={() => onDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
