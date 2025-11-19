import React, { useState, useEffect } from "react";
import { register, login, getNotes, createNote, updateNote, deleteNote } from "./api";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      loadNotes();
      setPage("dashboard");
    }
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    try {
      const data = await register(email, password, role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setToken(data.token);
      setUserRole(data.role);
      setPage("dashboard");
      await loadNotes();
      setMessage("Registered and logged in");
    } catch (e) {
      setMessage(e.message);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setToken(data.token);
      setUserRole(data.role);
      setPage("dashboard");
      await loadNotes();
      setMessage("Login successful");
    } catch (e) {
      setMessage(e.message);
    }
  }

  async function loadNotes() {
    try {
      const data = await getNotes(localStorage.getItem("token"));
      setNotes(data);
    } catch (e) {
      setMessage(e.message);
    }
  }

  async function handleCreateOrUpdate(e) {
    e.preventDefault();
    setMessage("");
    try {
      if (editingId) {
        const updated = await updateNote(token, editingId, { title, content });
        setNotes(notes.map(n => (n.id === editingId ? updated : n)));
        setMessage("Note updated");
      } else {
        const created = await createNote(token, { title, content });
        setNotes([...notes, created]);
        setMessage("Note created");
      }
      setTitle("");
      setContent("");
      setEditingId(null);
    } catch (e) {
      setMessage(e.message);
    }
  }

  function startEdit(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  async function handleDelete(id) {
    setMessage("");
    try {
      await deleteNote(token, id);
      setNotes(notes.filter(n => n.id !== id));
      setMessage("Note deleted");
    } catch (e) {
      setMessage(e.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setUserRole("");
    setNotes([]);
    setPage("login");
    setMessage("Logged out");
  }

  if (!token && page === "register") {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleRegister} className="card">
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit">Register</button>
          <button type="button" onClick={() => setPage("login")}>Go to Login</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="card">
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setPage("register")}>Go to Register</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Notes Dashboard</h1>
        <div className="top-right">
          <span className="badge">{userRole}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="layout">
        <form onSubmit={handleCreateOrUpdate} className="card">
          <h2>{editingId ? "Edit Note" : "Create Note"}</h2>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
          <button type="submit">{editingId ? "Update" : "Create"}</button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setTitle(""); setContent(""); }}>
              Cancel
            </button>
          )}
        </form>
        <div className="card">
          <h2>Your Notes</h2>
          {notes.length === 0 && <p>No notes yet</p>}
          <ul className="notes-list">
            {notes.map(note => (
              <li key={note.id} className="note-item">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <div className="note-actions">
                  <button onClick={() => startEdit(note)}>Edit</button>
                  <button onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
