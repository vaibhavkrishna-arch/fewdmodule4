let nextId = 1;
export function addTask(tasks, title) {
    const cleanTitle = title.trim();
    if (!cleanTitle)
        return tasks;
    const task = {
        id: nextId++,
        title: cleanTitle,
        status: "todo",
        createdAt: Date.now(),
    };
    return [...tasks, task];
}
export function advanceTask(tasks, taskId) {
    return tasks.map((task) => {
        if (task.id !== taskId)
            return task;
        const nextStatus = task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
                ? "done"
                : "done";
        return { ...task, status: nextStatus };
    });
}
export function filterByStatus(tasks, status) {
    return status === "all"
        ? tasks
        : tasks.filter((task) => task.status === status);
}
