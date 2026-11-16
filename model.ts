export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskFilter = TaskStatus | "all";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: number;
}

let nextId = 1;

export function addTask(tasks: Task[], title: string): Task[] {
  const cleanTitle = title.trim();
  if (!cleanTitle) return tasks;

  const task: Task = {
    id: nextId++,
    title: cleanTitle,
    status: "todo",
    createdAt: Date.now(),
  };

  return [...tasks, task];
}

export function advanceTask(tasks: Task[], taskId: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== taskId) return task;

    const nextStatus: TaskStatus =
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
          ? "done"
          : "done";

    return { ...task, status: nextStatus };
  });
}

export function filterByStatus(
  tasks: Task[],
  status: TaskFilter,
): Task[] {
  return status === "all"
    ? tasks
    : tasks.filter((task) => task.status === status);
}
