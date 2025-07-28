const express = require('express');
const router = express.Router();
const {
  updateSettings,
  signup,
  login,
  getCurrentUser
} = require('../controllers/authController');

const { authenticate } = require('../middleware/authMiddleware');

// 📝 Register
router.post('/signup', signup);

// 🔐 Login
router.post('/login', login);

// 🔄 Update Settings
router.patch('/settings', authenticate, updateSettings);

// 👤 Get Current User
router.get('/me', authenticate, getCurrentUser);

// 🌐 Connectivity test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working', timestamp: new Date().toISOString() });
});

module.exports = router;