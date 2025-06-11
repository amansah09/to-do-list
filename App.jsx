import React, { useState } from "react";
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index]);
  };

  const saveEdit = () => {
    const updated = [...tasks];
    updated[editingIndex] = editText;
    setTasks(updated);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task">
            {editingIndex === index ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{task}</span>
            )}
            <div className="actions">
              {editingIndex === index ? (
                <button onClick={saveEdit} className="save">Save</button>
              ) : (
                <button onClick={() => startEdit(index)} className="edit">Edit</button>
              )}
              <button onClick={() => deleteTask(index)} className="delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App