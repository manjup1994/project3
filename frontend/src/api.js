// frontend/src/api.js
const BASE = (import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL || "https://project8-hkio.onrender.com").replace(/\/$/, "");

/**
 * GET /users
 * returns an array of user objects (backend expected)
 */
export async function getUsers() {
  const res = await fetch(`${BASE}/users`, {
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /users failed (${res.status}) ${text}`);
  }
  return res.json();
}

/**
 * POST /users
 * Expects payload like { username, email } (your backend may accept { name } - adapt if needed)
 */
export async function createUser(payload) {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    // try parse error message
    let errText = "";
    try {
      const parsed = await res.json();
      errText = parsed?.message || parsed?.detail || JSON.stringify(parsed);
    } catch {
      errText = await res.text().catch(() => "");
    }
    throw new Error(errText || `POST /users failed (${res.status})`);
  }
  return res.json();
}

export default { getUsers, createUser };
