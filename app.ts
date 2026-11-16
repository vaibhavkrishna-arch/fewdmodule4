import {
  addTask,
  advanceTask,
  filterByStatus,
  type Task,
  type TaskFilter,
  type TaskStatus,
} from "./model.js";

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("task-title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const emptyState = document.getElementById("empty-state") as HTMLParagraphElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
const totalCount = document.getElementById("total-count") as HTMLSpanElement;
const doneCount = document.getElementById("done-count") as HTMLSpanElement;

let tasks: Task[] = [];
let activeFilter: TaskFilter = "all";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

function renderTasks(): void {
  const visibleTasks = filterByStatus(tasks, activeFilter);
  taskList.replaceChildren();

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-card task-${task.status}`;

    const content = document.createElement("div");
    content.className = "task-content";

    const taskTitle = document.createElement("span");
    taskTitle.className = "task-name";
    taskTitle.textContent = task.title;

    const status = document.createElement("span");
    status.className = `status-badge badge-${task.status}`;
    status.textContent = statusLabels[task.status];

    content.append(taskTitle, status);

    const advanceButton = document.createElement("button");
    advanceButton.type = "button";
    advanceButton.className = "advance-button";
    advanceButton.textContent =
      task.status === "done" ? "Completed ✓" : "Advance →";
    advanceButton.disabled = task.status === "done";
    advanceButton.setAttribute(
      "aria-label",
      task.status === "done"
        ? `${task.title} is complete`
        : `Advance ${task.title}`,
    );
    advanceButton.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      renderTasks();
    });

    item.append(content, advanceButton);
    taskList.append(item);
  });

  emptyState.hidden = visibleTasks.length > 0;
  totalCount.textContent = String(tasks.length);
  doneCount.textContent = String(tasks.filter((task) => task.status === "done").length);

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

taskForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }

  tasks = addTask(tasks, title);
  titleInput.value = "";
  activeFilter = "all";
  renderTasks();
  titleInput.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const requestedFilter = button.dataset.filter;
    if (
      requestedFilter === "all" ||
      requestedFilter === "todo" ||
      requestedFilter === "in-progress" ||
      requestedFilter === "done"
    ) {
      activeFilter = requestedFilter;
      renderTasks();
    }
  });
});

renderTasks();
