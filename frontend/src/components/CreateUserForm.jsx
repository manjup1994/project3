import React, { useState } from 'react'

export default function CreateUserForm({ onCreate }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const resp = await onCreate({ username, email })
    if (resp.success) {
      setStatus('ok')
      setUsername('')
      setEmail('')
    } else {
      setStatus(`error: ${resp.message}`)
    }
    setTimeout(()=>setStatus(null), 3000)
  }

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:8, alignItems:'center' }}>
      <div>
        <label>Username</label><br/>
        <input required value={username} onChange={e=>setUsername(e.target.value)} />
      </div>

      <div>
        <label>Email</label><br/>
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>

      <div>
        <button type="submit">Create user</button>
      </div>

      {status && <div style={{ marginTop: 8 }}>{status}</div>}
    </form>
  )
}
