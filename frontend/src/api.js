// frontend/src/api.js
const base =  '/api'
 // Vite dev server will proxy /api -> http://127.0.0.1:8000

export async function listUsers() {
  const res = await fetch(`${base}/users`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function createUser(user) {
  const res = await fetch(`${base}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  if (!res.ok) {
    const err = await res.json().catch(()=>({detail:'unknown'}))
    throw new Error(err.detail || 'Failed to create user')
  }
  return res.json()
}
