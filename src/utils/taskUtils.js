export const CATEGORY_OPTIONS = ["Assignment", "Exam", "Revision", "Project", "Personal"];
export const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

const PRIORITY_RANK = {
  High: 1,
  Medium: 2,
  Low: 3,
};

export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTaskStatus(task, todayKey) {
  if (task.completed) return "completed";
  return task.deadline < todayKey ? "overdue" : "pending";
}

export function sortTasksByDeadlineAndPriority(taskList) {
  return [...taskList].sort((a, b) => {
    if (a.deadline !== b.deadline) {
      return a.deadline.localeCompare(b.deadline);
    }

    return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  });
}

export function getAdvice(taskList) {
  if (taskList.length === 0) {
    return "No active tasks right now. Add your first assignment or revision item to get a personalized study recommendation.";
  }

  const sortedTasks = sortTasksByDeadlineAndPriority(taskList);
  const topTask = sortedTasks[0];

  return `Focus on "${topTask.title}" first. It has the nearest deadline and ${topTask.priority.toLowerCase()} priority, so tackle it in short focused blocks today.`;
}
