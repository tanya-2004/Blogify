const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// 🌐 Connectivity test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working', timestamp: new Date().toISOString() });
});

// 📝 Register
router.post('/signup', signup);

// 🔐 Login
router.post('/login', login);

module.exports = router;