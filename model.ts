// 1. The blueprint definitions
type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// 2. The core logic functions
function addTask(tasks: Task[], title: string): Task[] {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask: Task = {
    id: nextId,
    title,
    status: "todo"
  };
  return [...tasks, newTask];
}

function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map(task => 
    task.id === id ? { ...task, status: "done" } : task
  );
}

function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter(task => task.status === status);
}

// ==========================================
// 3. Testing Playground (See the results)
// ==========================================
let myTasks: Task[] = [];

// Add tasks
myTasks = addTask(myTasks, "Submit Part 1 PR");
myTasks = addTask(myTasks, "Review PR feedback");
console.log("1. After adding tasks:", myTasks);

// Complete a task
myTasks = completeTask(myTasks, 1);
console.log("2. After completing task 1:", myTasks);

// Filter tasks
const todoTasks = filterByStatus(myTasks, "todo");
console.log("3. Filtered 'todo' tasks:", todoTasks);
