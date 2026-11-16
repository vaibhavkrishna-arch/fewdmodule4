"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_js_1 = require("./model.js");
let tasks = [];
let currentFilter = "all";
// HTML elements
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const filterSelect = document.getElementById("filter");
// Add task
addBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = (0, model_js_1.addTask)(tasks, title);
    titleInput.value = "";
    render();
};
// Filter selection
filterSelect.onchange = () => {
    currentFilter = filterSelect.value;
    render();
};
// Render tasks
function render() {
    listEl.innerHTML = "";
    const visibleTasks = (0, model_js_1.filterByStatus)(tasks, currentFilter);
    visibleTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        // Task title
        const title = document.createElement("span");
        title.textContent = task.title;
        // Status badge
        const badge = document.createElement("span");
        badge.textContent = task.status;
        badge.className = `badge ${task.status}`;
        // Advance button
        const advanceBtn = document.createElement("button");
        advanceBtn.textContent =
            task.status === "done" ? "Completed" : "Advance";
        advanceBtn.disabled = task.status === "done";
        advanceBtn.onclick = () => {
            tasks = (0, model_js_1.advanceTask)(tasks, task.id);
            render();
        };
        li.appendChild(title);
        li.appendChild(badge);
        li.appendChild(advanceBtn);
        listEl.appendChild(li);
    });
}
//# sourceMappingURL=app.js.map