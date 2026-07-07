import { useMemo, useState } from "react";
import AIChatCard from "./dashboard/AIChatCard";
import AIRecommendationCard from "./dashboard/AIRecommendationCard";
import CalendarCard from "./dashboard/CalendarCard";
import PlannerCard from "./dashboard/PlannerCard";
import RewardsProgressCard from "./dashboard/RewardsProgressCard";
import TaskBoardCard from "./dashboard/TaskBoardCard";
import { getTaskStatus, getTodayKey, sortTasksByDeadlineAndPriority } from "../utils/taskUtils";

export default function DashboardPage({ currentDateLabel }) {
  const [tasks, setTasks] = useState([]);
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

  const toggleCompleted = (taskId) => {
    setTasks((prev) =>
      sortTasksByDeadlineAndPriority(
        prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <main className="shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Cognify Dashboard</p>
          <h1>Keep momentum without burning out</h1>
          <p>{currentDateLabel}</p>
        </div>
      </header>

      <section className="grid-layout">
        <PlannerCard onAddTask={addTask} todayKey={todayKey} />
        <TaskBoardCard
          tasks={sortedTasks}
          todayKey={todayKey}
          onToggleCompleted={toggleCompleted}
          onDeleteTask={deleteTask}
        />
        <AIRecommendationCard tasks={sortedTasks} />
        <CalendarCard taskMetrics={taskMetrics} />
        <RewardsProgressCard taskMetrics={taskMetrics} />
        <AIChatCard tasks={sortedTasks} />
      </section>
    </main>
  );
}
