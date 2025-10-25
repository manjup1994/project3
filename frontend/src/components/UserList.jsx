import React from 'react'

export default function UserList({ users = [] }) {
  if (!users.length) return <p>No users yet.</p>
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {users.map(u => (
        <li key={u.id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>
          <strong>{u.username}</strong> — {u.email}
          <div style={{ fontSize: 12, color: '#666' }}>{u.created_at}</div>
        </li>
      ))}
    </ul>
  )
}
