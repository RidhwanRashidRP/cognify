import { useState } from "react";
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from "../../utils/taskUtils";

const initialDraft = {
  title: "",
  category: CATEGORY_OPTIONS[0],
  priority: PRIORITY_OPTIONS[1],
  deadline: "",
};

export default function PlannerCard({ onAddTask, todayKey }) {
  const [draft, setDraft] = useState(initialDraft);
  const [error, setError] = useState("");

  const updateDraft = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!draft.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (!draft.deadline) {
      setError("Please choose a deadline.");
      return;
    }

    if (draft.deadline < todayKey) {
      setError("Deadline cannot be in the past.");
      return;
    }

    onAddTask(draft);
    setDraft(initialDraft);
    setError("");
  };

  return (
    <article className="card">
      <h2>Task Planner</h2>
      <form className="stack" onSubmit={handleSubmit}>
        <label>
          Task name
          <input
            type="text"
            value={draft.title}
            onChange={(event) => updateDraft("title", event.target.value)}
            placeholder="Finish economics revision"
          />
        </label>

        <div className="split">
          <label>
            Category
            <select
              value={draft.category}
              onChange={(event) => updateDraft("category", event.target.value)}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Priority
            <select
              value={draft.priority}
              onChange={(event) => updateDraft("priority", event.target.value)}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Deadline
          <input
            type="date"
            min={todayKey}
            value={draft.deadline}
            onChange={(event) => updateDraft("deadline", event.target.value)}
          />
        </label>

        {error ? <p className="error-text">{error}</p> : null}

        <button className="btn btn--primary" type="submit">
          Add Task
        </button>
      </form>
    </article>
  );
}
