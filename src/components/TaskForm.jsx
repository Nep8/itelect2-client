import { useState } from "react";

// The task list lives in App.jsx.
// This form sends the new task title to App through onAdd.
function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  // Wait for the API request to finish and display an error if it fails.
  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = title.trim();
    if (trimmed === "") return;

    try {
      await onAdd(trimmed);
      setTitle("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of a new task"
      />

      <button type="submit">Add Task</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;