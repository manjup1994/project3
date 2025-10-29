const express = require('express');
const app = express();

app.use(express.json());

// --- Simple CORS middleware (allows your frontend to call this API) ---
app.use((req, res, next) => {
  // Allow requests from any origin (for now). If you want to restrict, replace '*' with your frontend URL.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // Allow preflight methods
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
// --------------------------------------------------------------------

let users = [];

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running successfully on Render!');
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ detail: 'Username and email are required' });
  }
  const newUser = { id: users.length + 1, username, email, created_at: new Date().toISOString() };
  users.push(newUser);
  res.status(201).json(newUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

