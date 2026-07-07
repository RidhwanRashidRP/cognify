import { useMemo, useState } from "react";
import AIChatCard from "./dashboard/AIChatCard";
import AIRecommendationCard from "./dashboard/AIRecommendationCard";
import CalendarCard from "./dashboard/CalendarCard";
import PlannerCard from "./dashboard/PlannerCard";
import RewardsProgressCard from "./dashboard/RewardsProgressCard";
import TaskBoardCard from "./dashboard/TaskBoardCard";
import CognifyLogo from "./CognifyLogo";
import { getTaskStatus, getTodayKey, sortTasksByDeadlineAndPriority } from "../utils/taskUtils";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const todayKey = getTodayKey();

  const sortedTasks = useMemo(() => sortTasksByDeadlineAndPriority(tasks), [tasks]);

  const taskMetrics = useMemo(() => {
    return sortedTasks.reduce(
      (acc, task) => {
        const status = getTaskStatus(task, todayKey);
        acc.total += 1;
        acc[status] += 1;
        return acc;
      },
      { total: 0, pending: 0, overdue: 0, completed: 0 }
    );
  }, [sortedTasks, todayKey]);

  const addTask = (draft) => {
    setTasks((prev) => {
      const nextTask = {
        id: crypto.randomUUID(),
        title: draft.title.trim(),
        category: draft.category,
        priority: draft.priority,
        deadline: draft.deadline,
        completed: false,
      };
      return sortTasksByDeadlineAndPriority([...prev, nextTask]);
    });
  };

  const saveTask = (draft) => {
    setTasks((prev) =>
      sortTasksByDeadlineAndPriority(
        prev.map((task) =>
          task.id === draft.id
            ? {
                ...task,
                title: draft.title.trim(),
                category: draft.category,
                priority: draft.priority,
                deadline: draft.deadline,
              }
            : task
        )
      )
    );
    setEditingTask(null);
  };

  const toggleCompleted = (taskId) => {
    setTasks((prev) =>
      sortTasksByDeadlineAndPriority(
        prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <CognifyLogo />
          <p className="eyebrow">Cognify Dashboard</p>
          <h1>Keep momentum without burning out</h1>
          <p>Plan with clarity, act with focus, and let Cognify keep your workload under control.</p>
        </div>
      </header>

      <section className="grid-layout">
        <PlannerCard
          onAddTask={addTask}
          onSaveTask={saveTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
          todayKey={todayKey}
        />
        <TaskBoardCard
          tasks={sortedTasks}
          todayKey={todayKey}
          onToggleCompleted={toggleCompleted}
          onDeleteTask={deleteTask}
          onEditTask={setEditingTask}
        />
        <AIRecommendationCard tasks={sortedTasks} />
        <CalendarCard taskMetrics={taskMetrics} />
        <RewardsProgressCard taskMetrics={taskMetrics} />
        <AIChatCard tasks={sortedTasks} />
      </section>
    </main>
  );
}
