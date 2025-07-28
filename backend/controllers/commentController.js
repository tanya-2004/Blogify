const Comment = require('../models/Comment');
const Post = require('../models/Post');
const syncCommentCount = require('../utils/syncCommentCount');

// GET /api/comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .sort({ date: -1 })
      .populate('post', 'title')
      .populate('author', 'username');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// POST /api/comments
const createComment = async (req, res) => {
  try {
    const author = req.body.author?.trim();
    const content = req.body.content?.trim();
    const post = req.body.post?.trim();
    const { status, likes, replies } = req.body;

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
          author: r.author?.trim() || '',
          content: r.content?.trim() || ''
        }))
        : []
    });

    const savedComment = await newComment.save();

    // 🔄 Update commentsCount in Post
    await Post.findByIdAndUpdate(post, { $inc: { commentsCount: 1 } });

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save comment' });
  }
};

// DELETE /api/comments/:id
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (comment) {
      await syncCommentCount(comment.post);
    }
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

// PATCH /api/comments/:id/approve
const approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    await syncCommentCount(comment.post);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve comment' });
  }
};

// PATCH /api/comments/:id/reject
const rejectComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'spam' },
      { new: true }
    );
    await syncCommentCount(comment.post);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject comment' });
  }
};

// PATCH /api/comments/:id/like
const likeComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Comment not found' });

    res.status(200).json({ likes: updated.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like comment' });
  }
};

// POST /api/comments/:id/reply
const addReply = async (req, res) => {
  try {
    const author = req.body.author?.trim();
    const content = req.body.content?.trim();

    if (!author || !content) {
      return res.status(400).json({ error: 'Author and content are required' });
    }

    const reply = { author, content };

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: reply } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add reply' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  approveComment,
  rejectComment,
  deleteComment,
  likeComment,
  addReply
};