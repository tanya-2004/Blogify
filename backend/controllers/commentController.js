const Comment = require('../models/Comment');

// GET /api/comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// POST /api/comments
const createComment = async (req, res) => {
  try {
    console.log('[🛠️ createComment] Request Body:', req.body); 

    const { author, content, post, status, likes, replies } = req.body;

    if (!author || !content || !post) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newComment = new Comment({
      author,
      content,
      post,
      status: status || 'pending',
      likes: likes || 0,
      replies: Array.isArray(replies)
        ? replies.map(r => ({
            author: r.author || '',
            content: r.content || ''
          }))
        : []
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error('❌ Failed to save comment:', err);
    res.status(500).json({ error: 'Failed to save comment' });
  }
};

// POST /api/comments/:id/approve
const approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve comment' });
  }
};

// POST /api/comments/:id/reject
const rejectComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'spam' },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject comment' });
  }
};

// DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  approveComment,
  rejectComment,
  deleteComment
};