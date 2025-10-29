// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import { listUsers, createUser } from "./api";
import "./App.css";

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
      setUsers(data || []);
    } catch (e) {
      setError("Unable to load users. Please check backend.");
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
    <div className="site">
      {/* ---------------- HEADER / HERO SECTION ---------------- */}
      <header className="hero" style={{ background: "#f6fbff", padding: "40px 0" }}>
        <div
          className="hero-inner"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img
                src="/bike-logo.png"
                alt="Bike Share logo"
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 12,
                  boxShadow: "0 6px 18px rgba(11,124,255,0.1)",
                }}
              />
              <div>
                <h1 style={{ margin: 0, fontSize: 34 }}>Bike Share System</h1>
                <p style={{ margin: "6px 0 0", color: "#556" }}>
                  A Smart Campus Bike-Sharing Prototype — Built with React, Node.js, and PostgreSQL.
                </p>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <a
                href="#users"
                className="cta-btn"
                style={{
                  background: "#2a8",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 6,
                  textDecoration: "none",
                  marginRight: 12,
                }}
              >
                Try Demo
              </a>
              <a
                href="https://github.com/manjup1994/project3"
                target="_blank"
                rel="noreferrer"
                className="repo"
                style={{
                  border: "1px solid #2a8",
                  color: "#2a8",
                  padding: "10px 20px",
                  borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                View Code
              </a>
            </div>
          </div>

          {/* Station Card */}
          <aside style={{ width: 220 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 16,
                boxShadow: "0 6px 20px rgba(30,60,90,0.06)",
              }}
            >
              <strong>Station A</strong>
              <div style={{ marginTop: 8, color: "#666" }}>Location: Main Gate</div>
              <div style={{ marginTop: 12, fontSize: 20, fontWeight: 700 }}>
                7 <span style={{ fontSize: 12, fontWeight: 400 }}>bikes available</span>
              </div>
              <div style={{ marginTop: 10 }}>
                <small style={{ color: "#2a8" }}>Active station</small>
              </div>
            </div>
          </aside>
        </div>
      </header>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <main className="container" style={{ maxWidth: 1000, margin: "0 auto", padding: "30px 20px" }}>
        <section id="about" className="box" style={{ marginBottom: 40 }}>
          <h2>About the Project</h2>
          <p>
            The Bike Share System is a smart urban transportation prototype designed to improve
            eco-friendly mobility on campuses. It allows users to view available bikes, register new
            users, and simulate real-time bike reservation management.
          </p>
          <p>
            This project was developed as part of an academic submission to demonstrate full-stack
            application development, backend deployment, and database integration using Render and Neon.
          </p>
        </section>

        {/* ---------------- FEATURES SECTION ---------------- */}
        <section id="features" className="box" style={{ marginBottom: 40 }}>
          <h2>Key Features</h2>
          <ul>
            <li>🚲 User registration and listing interface</li>
            <li>⚙️ REST API built with Express.js</li>
            <li>💾 PostgreSQL database hosted on Neon (persistent storage)</li>
            <li>☁️ Deployed on Render with Docker containerization</li>
            <li>📊 Scalable architecture for smart mobility systems</li>
          </ul>
        </section>

        {/* ---------------- USERS DEMO SECTION ---------------- */}
        <section id="users" className="box" style={{ marginBottom: 40 }}>
          <h2>Users Demo</h2>
          <form className="user-form" onSubmit={handleCreate} style={{ marginBottom: 16 }}>
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
            <button type="submit">Add User</button>
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
                  <div className="muted">
                    {new Date(u.created_at || u.createdAt || Date.now()).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ---------------- HOW IT WORKS SECTION ---------------- */}
        <section id="how" className="box" style={{ marginBottom: 40 }}>
          <h2>How It Works</h2>
          <ol>
            <li>User visits the web portal and registers.</li>
            <li>Backend API stores data in PostgreSQL.</li>
            <li>Frontend fetches and displays the updated user list.</li>
            <li>Deployment ensures persistent access and scalability.</li>
          </ol>
        </section>
      </main>

      {/* ---------------- FOOTER SECTION ---------------- */}
      <footer className="footer" style={{ textAlign: "center", padding: "20px 0", color: "#555" }}>
        <div>
          © 2025 Bike Share Project • Built by Manju •{" "}
          <a
            href="https://github.com/manjup1994/project3"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2a8" }}
          >
            GitHub Repo
          </a>
        </div>
      </footer>
    </div>
  );
}
