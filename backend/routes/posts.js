const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware'); // changed from authenticate
const { body } = require('express-validator');
const validate = require('../middleware/validate');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  likePost
} = require('../controllers/postController');

// Validation rules
const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').optional().trim(),
  body('tags').optional().isArray(),
  body('imageUrl').optional().isURL()
];

const updateValidation = [
  body('title').optional().trim().isLength({ max: 200 }),
  body('content').optional().trim(),
  body('category').optional().trim(),
  body('tags').optional().isArray(),
  body('imageUrl').optional().isURL()
];

// Test route (optional)
router.get('/test-auth', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Authentication successful',
    userId: req.userId,
    timestamp: new Date().toISOString()
  });
});

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes (must be after public but /mine before /:id)
router.get('/mine', auth, getMyPosts);
router.post('/', auth, postValidation, validate, createPost);
router.put('/:id', auth, updateValidation, validate, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);

module.exports = router;