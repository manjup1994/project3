// src/App.jsx
import React, { useEffect, useState } from "react";
import { listUsers, createUser } from "./api"; // your api.js
import "./App.css"; // we'll create minimal styles (below)

export default function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (e) {
      setError("Unable to load users. Check backend.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    if (!username || !email) return setError("Please enter name and email.");
    try {
      await createUser({ username, email });
      setUsername("");
      setEmail("");
      await refresh();
    } catch (err) {
      setError(err.message || "Failed to create user");
    }
  }

  return (
    <div className="site-root">
      <header className="hero">
        <div className="hero-inner">
          <h1>Bike Share — Campus Prototype</h1>
          <p className="tag">
            Find bikes. Reserve quickly. Built with React • Node • PostgreSQL • Docker
          </p>
          <div className="cta-row">
            <a className="cta-btn" href="#users">Try Demo</a>
            <a className="repo" href="https://github.com/manjup1994/project3" target="_blank" rel="noreferrer">View Code</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="bike-card">
            <strong>Station A</strong>
            <p>Located: Main Gate</p>
            <p>Available bikes: 7</p>
          </div>
        </div>
      </header>

      <main className="container">
        <section id="about" className="box">
          <h2>About this project</h2>
          <p>
            This is a prototype Bike-Share system made for demo/submission: a React frontend that talks to a Node/Express API storing users in PostgreSQL.
            For the assignment, the UI demonstrates user creation and listing. Backend and DB are deployed on Render & Neon.
          </p>
        </section>

        <section id="users" className="box">
          <h2>Users (Demo)</h2>

          <form className="user-form" onSubmit={handleCreate}>
            <input
              placeholder="Full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Create user</button>
          </form>

          {error && <div className="error">{error}</div>}

          <div className="users-list">
            {loading ? (
              <div>Loading users...</div>
            ) : users.length === 0 ? (
              <div className="empty">No users yet — create one to test persistence</div>
            ) : (
              users.map((u) => (
                <div className="user-row" key={u.id || `${u.username}-${u.email}`}>
                  <div>
                    <strong>{u.username}</strong>
                    <div className="muted">{u.email}</div>
                  </div>
                  <div className="muted">{new Date(u.created_at || u.createdAt || Date.now()).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="box">
          <h3>How to evaluate</h3>
          <ul>
            <li>Frontend calls <code>/users</code> to create & list users.</li>
            <li>Data persists in PostgreSQL (Neon) — redeploy doesn't lose users.</li>
            <li>Repo contains Dockerfile, README, and backup CSV for verification.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div>Made by Manju — Bike Share Prototype • <a href="https://github.com/manjup1994/project3" target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
    </div>
  );
}
