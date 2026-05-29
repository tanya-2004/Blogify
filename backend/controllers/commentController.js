const Comment = require('../models/Comment');
const Post = require('../models/Post');
const mongoose = require('mongoose');

// Helper: update commentsCount on post
const updatePostCommentCount = async (postId) => {
  const count = await Comment.countDocuments({ post: postId, status: 'approved' });
  await Post.findByIdAndUpdate(postId, { commentsCount: count });
};

// GET /api/comments?postId=...&page=1&limit=10
exports.getAllComments = async (req, res) => {
  try {
    const { postId, page = 1, limit = 20, status = 'approved' } = req.query;
    const filter = { status };
    if (postId && mongoose.Types.ObjectId.isValid(postId)) filter.post = postId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('post', 'title')
      .lean();

    const total = await Comment.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: comments,
      pagination: { page: parseInt(page), limit: parseInt(limit), total }
    });
  } catch (err) {
    console.error('Get comments error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
};

// POST /api/comments – authenticated user
exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const userId = req.userId; // from auth middleware

    // Fetch user to get username (if author is string for now)
    const User = require('../models/User');
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const newComment = new Comment({
      author: user.username,   // still string, but taken from logged-in user
      content,
      post: postId,
      status: post.moderateComments ? 'pending' : 'approved',
      likes: 0,
      replies: []
    });

    const savedComment = await newComment.save();

    // Increment commentsCount only for approved comments
    if (savedComment.status === 'approved') {
      await updatePostCommentCount(postId);
    }

    res.status(201).json({ success: true, data: savedComment });
  } catch (err) {
    console.error('Create comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to save comment' });
  }
};

// DELETE /api/comments/:id
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    // Authorization: only comment author or admin can delete
    const User = require('../models/User');
    const currentUser = await User.findById(req.userId);
    const isAuthor = (comment.author === currentUser.username);
    const isAdmin = currentUser.role === 'admin'; // assuming you add role field later

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await comment.deleteOne();
    await updatePostCommentCount(comment.post);

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    console.error('Delete comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
};

// POST /api/comments/:id/approve – admin only
exports.approveComment = async (req, res) => {
  try {
    const User = require('../models/User');
    const currentUser = await User.findById(req.userId);
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    await updatePostCommentCount(comment.post);
    res.status(200).json({ success: true, data: comment });
  } catch (err) {
    console.error('Approve comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve comment' });
  }
};

// POST /api/comments/:id/reject – admin only
exports.rejectComment = async (req, res) => {
  try {
    const User = require('../models/User');
    const currentUser = await User.findById(req.userId);
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: 'spam' },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    await updatePostCommentCount(comment.post);
    res.status(200).json({ success: true, data: comment });
  } catch (err) {
    console.error('Reject comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject comment' });
  }
};

// POST /api/comments/:id/like
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true, likes: comment.likes });
  } catch (err) {
    console.error('Like comment error:', err);
    res.status(500).json({ success: false, message: 'Failed to like comment' });
  }
};

// POST /api/comments/:id/reply
exports.addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    const User = require('../models/User');
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const reply = {
      author: user.username,
      content,
      createdAt: new Date()
    };

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: reply } },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, data: updatedComment });
  } catch (err) {
    console.error('Add reply error:', err);
    res.status(500).json({ success: false, message: 'Failed to add reply' });
  }
};