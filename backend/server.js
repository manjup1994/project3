const express = require('express');
const app = express();

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Backend is running successfully on Render!');
});

// Render provides the PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
