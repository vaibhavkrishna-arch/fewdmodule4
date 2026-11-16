"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Add a new task
function addTask(tasks, title) {
    const nextId = tasks.length > 0
        ? Math.max(...tasks.map(task => task.id)) + 1
        : 1;
    const newTask = {
        id: nextId,
        title,
        status: "todo"
    };
    return [...tasks, newTask];
}
// Advance task status
function advanceTask(tasks, id) {
    return tasks.map(task => {
        if (task.id !== id)
            return task;
        const nextStatus = task.status === "todo"
            ? "in-progress"
            : task.status === "in-progress"
                ? "done"
                : "done";
        return { ...task, status: nextStatus };
    });
}
// Filter tasks
function filterByStatus(tasks, status) {
    if (status === "all")
        return tasks;
    return tasks.filter(task => task.status === status);
}
//# sourceMappingURL=model.js.map