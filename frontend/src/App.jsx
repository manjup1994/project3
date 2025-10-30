// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import { listUsers, createUser } from "./api"; // ensure api.js base is set correctly
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    refreshUsers();
  }, []);

  async function refreshUsers() {
    setLoading(true);
    setMessage(null);
    try {
      const data = await listUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage({ type: "error", text: "Unable to load users. Backend unreachable." });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e?.preventDefault();
    setMessage(null);
    if (!name.trim() || !email.trim()) {
      setMessage({ type: "error", text: "Please enter name and email." });
      return;
    }
    setSubmitting(true);
    try {
      await createUser({ username: name.trim(), email: email.trim() });
      setName("");
      setEmail("");
      setMessage({ type: "success", text: "User created and saved." });
      await refreshUsers();
    } catch (err) {
      setMessage({ type: "error", text: (err && err.message) || "Failed to create user." });
    } finally {
      setSubmitting(false);
    }
  }

  function formatDate(d) {
    try {
      const date = new Date(d);
      return isNaN(date) ? "" : date.toLocaleString();
    } catch {
      return "";
    }
  }

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <img src="./bike-logo.png" alt="BikeShare logo" className="logo" />
            <div>
              <h1 className="title">BikeShare — Project</h1>
              <p className="subtitle">Prototype • React • Node/Express • PostgreSQL</p>
            </div>
          </div>

          <nav className="top-nav">
            <a className="btn primary" href="#users">Try demo</a>
            <a className="link" href="https://github.com/manjup1994/project3" target="_blank" rel="noreferrer">Code</a>
          </nav>
        </div>
      </header>

      <main className="container main">
        <section className="card about">
          <h2>About</h2>
          <p>
            A compact BikeShare prototype demonstrating user registration and persistent storage in PostgreSQL.
            Backend and database are deployed on Render & Neon — the repo includes Docker and documentation.
          </p>
        </section>

        <section id="users" className="card users-section">
          <div className="section-head">
            <h2>Users (Demo)</h2>
            <div className="muted small">Create test users — persisted to the cloud DB</div>
          </div>

          <form className="user-form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Full name"
              disabled={submitting}
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              disabled={submitting}
            />
            <button className="btn primary" type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create user"}
            </button>
          </form>

          {message && (
            <div className={`alert ${message.type === "error" ? "alert-error" : "alert-success"}`}>
              {message.text}
            </div>
          )}

          <div className="users-list">
            {loading ? (
              <div className="muted">Loading users…</div>
            ) : users.length === 0 ? (
              <div className="muted">No users yet — add one to test persistence.</div>
            ) : (
              users.map((u) => (
                <div className="user-row" key={u.id ?? `${u.username}-${u.email}`}>
                  <div>
                    <div className="username">{u.username}</div>
                    <div className="muted small">{u.email}</div>
                  </div>
                  <div className="muted small">{formatDate(u.created_at ?? u.createdAt)}</div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="card actions">
          <h3>Evaluation checklist</h3>
          <ul>
            <li>Frontend calls <code>/users</code> to create & list users.</li>
            <li>Persistent storage in PostgreSQL (Neon). Verify with SQL if needed.</li>
            <li>Repo contains Dockerfile, README, and users-backup.csv for review.</li>
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div>Made by Manju — BikeShare Prototype • <a href="https://github.com/manjup1994/project3" target="_blank" rel="noreferrer">GitHub</a></div>
        </div>
      </footer>
    </div>
  );
}
