const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const user = {
    id: 1,
    username: 'bankuser',
    password: 'secure123'
};

// Test route
app.get('/test', (req, res) => {
  res.send('API is working');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Banking API running on http://localhost:${PORT}`);
});
