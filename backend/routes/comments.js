const express = require('express');
const router = express.Router();
const {
  getAllComments,
  createComment,
  approveComment,
  rejectComment,
  deleteComment
} = require('../controllers/commentController');

router.get('/', getAllComments);
router.post('/', createComment);
router.post('/:id/approve', approveComment);
router.post('/:id/reject', rejectComment);
router.delete('/:id', deleteComment);

module.exports = router;