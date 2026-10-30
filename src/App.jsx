import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import "./App.css";

const STARTING_TASKS = [
  { id: 1, title: "Read 5 books", dueDate: "2026-11-05", completed: false },
  { id: 2, title: "Update program", dueDate: "2026-11-07", completed: false },
  { id: 3, title: "Review code", dueDate: "2026-11-10", completed: false },
  { id: 4, title: "Submit documentation", dueDate: "2026-11-12", completed: true },
];

function App() {
  const [tasks, setTasks] = useState(STARTING_TASKS);

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      dueDate: "",
      completed: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <main className="task-manager">
      <h1>Task Manager</h1>
      <p className="count">
        {tasks.length} tasks in total
      </p>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;