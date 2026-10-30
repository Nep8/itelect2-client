import { useEffect, useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

async function fetchTasks(token) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`GET /api/tasks answered ${res.status}`);
  }

  return res.json();
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loggedInAs, setLoggedInAs] = useState("");

  useEffect(() => {
    async function loadTasks() {
      if (!token) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [token]);

  async function logIn(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseText = await res.text();
    let data = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(
        `Login API returned an invalid response (HTTP ${res.status}). Check the backend logs.`
      );
    }

    if (!res.ok) {
      throw new Error(
        data.error || data.message || `Login failed (HTTP ${res.status}).`
      );
    }

    if (!data.token) {
      throw new Error("Login response did not contain a token.");
    }

    setToken(data.token);
    setLoggedInAs(email);
    setError("");
  }

  function logOut() {
    setToken("");
    setLoggedInAs("");
    setTasks([]);
    setError("");
  }

  async function addTask(title) {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));

      throw new Error(
        data.error || data.message || `Failed to add task (HTTP ${res.status}).`
      );
    }

    // The task is saved. Refresh the list from the database.
    const data = await fetchTasks(token);
    setTasks(data);
  }

  return (
    <main className="task-manager">
      <h1>Task Manager</h1>

      {token ? (
        <p className="who">
          <span>Logged in as {loggedInAs}</span>
          <button onClick={logOut}>Log out</button>
        </p>
      ) : (
        <LoginForm onLogin={logIn} />
      )}

      {token && <TaskForm onAdd={addTask} />}

      {loading && <p className="count">Loading tasks...</p>}

      {error && (
        <p className="error">
          {token ? `Could not load the tasks: ${error}` : error}
        </p>
      )}

      {token && !loading && !error && (
        <>
          <p className="count">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in total
          </p>
          <TaskList tasks={tasks} />
        </>
      )}
    </main>
  );
}

export default App;