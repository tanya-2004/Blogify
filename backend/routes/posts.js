const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { likePost } = require('../controllers/postController');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost, 
  deletePost,
  getMyPosts
} = require('../controllers/postController');

router.get('/test-auth', authenticate, (req, res) => {
  res.json({
    msg: 'Authentication successful',
    userId: req.user,
    timestamp: new Date().toISOString()
  });
});

// 🟢 Public Routes
router.get('/', getAllPosts);

// 🔐 Protected Routes (place /mine BEFORE /:id)
router.get('/mine', authenticate, getMyPosts);
router.get('/:id', getPostById);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);

module.exports = router;