const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Temporary in-memory user list (for testing)
let users = [];

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running successfully on Render!');
});

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST create user
app.post('/users', (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  const newUser = { id: users.length + 1, username, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Render provides the PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
