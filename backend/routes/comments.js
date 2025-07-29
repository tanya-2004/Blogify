const express = require('express');
const router = express.Router();
const {
  getAllComments,
  createComment,
  approveComment,
  rejectComment,
  deleteComment,
  likeComment,
  addReply 
} = require('../controllers/commentController');

router.get('/', getAllComments);
router.post('/', createComment);
router.post('/:id/approve', approveComment);
router.post('/:id/reject', rejectComment);
router.post('/:id/like', likeComment);
router.post('/:id/reply', addReply);
router.delete('/:id', deleteComment);

module.exports = router;