const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Test route to verify backend connectivity
router.get('/test', (req, res) => {
  console.log('Test route accessed from:', req.headers.origin);
  res.json({ message: 'Backend auth routes are working!', timestamp: new Date().toISOString() });
});

// 📝 POST /signup → Register a new user
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup attempt:', { email: req.body.email, username: req.body.username });
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Signup failed: User already exists for email:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    console.log('New user registered successfully:', email);
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: err.message });
  }
});
// 🔐 POST /login → Authenticate user and return JWT
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', { email: req.body.email });
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found for email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.log('Login failed: Invalid password for email:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for user:', email);
    res.json({
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;