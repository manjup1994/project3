import React from "react";

export default function UserList({ users = [], loading = false }) {
  if (loading) return <div className="muted">Loading users…</div>;
  if (!users || users.length === 0) return <div className="muted">No users yet — create one.</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {users.map((u) => (
        <div key={u.id ?? `${u.username}-${u.email}`} className="user-card-small">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div className="avatar">{(u.username || u.name || "U").slice(0,1).toUpperCase()}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{u.username ?? u.name ?? "User"}</div>
              <div className="muted small">{u.email}</div>
            </div>
          </div>
          <div className="muted small">{u.created_at ? new Date(u.created_at).toLocaleString() : ""}</div>
        </div>
      ))}
    </div>
  );
}
