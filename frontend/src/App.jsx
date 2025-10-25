// frontend/src/App.jsx
import React, { useEffect, useState } from 'react'
import { listUsers, createUser } from './api'
import CreateUserForm from './components/CreateUserForm'
import UserList from './components/UserList'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await listUsers()
      setUsers(data)
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleCreate = async (user) => {
    try {
      const created = await createUser(user)
      // optimistic refresh
      setUsers((prev) => [created, ...prev])
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', fontFamily: 'sans-serif' }}>
      <h1>Project3 — Users</h1>

      <section style={{ marginBottom: 20 }}>
        <CreateUserForm onCreate={handleCreate} />
      </section>

      <section>
        <h2>All users</h2>
        {loading && <p>Loading users…</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <UserList users={users} />
      </section>
    </div>
  )
}
