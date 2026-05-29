const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signup, login, getCurrentUser, updateSettings } = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate'); // we'll create this next

// Validation rules
const signupValidation = [
  body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
];

const settingsValidation = [
  body('email').optional().isEmail().normalizeEmail(),
  body('username').optional().isLength({ min: 3, max: 50 })
];

// Routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);
router.get('/me', auth, getCurrentUser);
router.patch('/settings', auth, settingsValidation, validate, updateSettings);

router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth routes working' });
});

module.exports = router;