const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// Test auth route
router.get('/test-auth', auth, (req, res) => {
  res.json({ 
    msg: 'Authentication successful', 
    userId: req.user,
    timestamp: new Date().toISOString()
  });
});

// Public Routes
router.get('/mine', auth, require('../controllers/postController').getMyPosts);
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected Routes
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;