const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth, optionalAuth } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const rateLimit = require('express-rate-limit');

const {
  getAllComments,
  createComment,
  approveComment,
  rejectComment,
  deleteComment,
  likeComment,
  addReply
} = require('../controllers/commentController');

// Rate limiter for public write actions
const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: { success: false, message: 'Too many comments, please try later' }
});

// Validation rules
const commentValidation = [
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Content must be 1-2000 characters'),
  body('postId').isMongoId().withMessage('Valid post ID required')
];

const replyValidation = [
  body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Reply must be 1-500 characters')
];

// Public: get comments for a post (with pagination)
router.get('/', getAllComments);

// Protected: create comment (authenticated users only – because we have user accounts)
// If you allow guests, change to optionalAuth and accept author name
router.post('/', auth, commentLimiter, commentValidation, validate, createComment);

// Admin only – we'll use a simple role check (assuming you have a `role` field in User model)
// For now, we protect with auth and check inside controller
router.post('/:id/approve', auth, approveComment);
router.post('/:id/reject', auth, rejectComment);

// Like and reply – require auth to prevent bots
router.post('/:id/like', auth, likeComment);
router.post('/:id/reply', auth, replyValidation, validate, addReply);

// Delete comment – auth + ownership check in controller
router.delete('/:id', auth, deleteComment);

module.exports = router;