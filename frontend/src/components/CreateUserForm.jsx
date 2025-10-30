import React, { useState } from "react";

export default function CreateUserForm({ onCreate }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    if (!username.trim() || !email.trim()) {
      setMsg({ type: "error", text: "Please type a name and email." });
      return;
    }
    setBusy(true);
    try {
      const result = await onCreate({ username: username.trim(), email: email.trim() });
      if (result?.success) {
        setMsg({ type: "success", text: "User created." });
        setUsername("");
        setEmail("");
      } else {
        setMsg({ type: "error", text: result?.message || "Create failed." });
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Create failed." });
    } finally {
      setBusy(false);
      setTimeout(() => setMsg(null), 3000);
    }
  }

  return (
    <form onSubmit={submit} className="create-form">
      <input
        placeholder="Full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={busy}
        aria-label="Full name"
      />
      <input
        placeholder="email@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={busy}
        aria-label="Email"
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn" type="submit" disabled={busy}>{busy ? "Creating..." : "Create user"}</button>
        <button type="button" className="btn ghost" onClick={() => { setUsername(""); setEmail(""); }} disabled={busy}>Clear</button>
      </div>

      {msg && <div className={`alert ${msg.type === "error" ? "error" : ""}`} style={{ marginTop: 10 }}>{msg.text}</div>}
    </form>
  );
}
