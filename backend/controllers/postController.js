const mongoose = require('mongoose');
const Post = require('../models/Post');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper for consistent response
const errorResponse = (res, status, message, details = null) => {
  return res.status(status).json({ success: false, message, ...(details && { details }) });
};

// GET /api/posts/mine
exports.getMyPosts = async (req, res) => {
  if (!req.userId) {
    return errorResponse(res, 401, 'User not authenticated');
  }

  try {
    const posts = await Post.find({ author: req.userId })
      .sort({ createdAt: -1 })
      .select('title content views likes commentsCount imageUrl tags category createdAt')
      .populate('author', 'username')
      .lean();

    res.json({ success: true, posts });
  } catch (err) {
    console.error('getMyPosts error:', err);
    errorResponse(res, 500, 'Failed to fetch your posts');
  }
};

// GET /api/posts with pagination
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .populate('author', 'username')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments()
    ]);

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('getAllPosts error:', err);
    errorResponse(res, 500, 'Failed to fetch posts');
  }
};

// GET /api/posts/:id
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return errorResponse(res, 400, 'Invalid post ID');
  }

  try {
    // Increment views
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username');

    if (!post) return errorResponse(res, 404, 'Post not found');
    res.json({ success: true, post });
  } catch (err) {
    console.error('getPostById error:', err);
    errorResponse(res, 500, 'Failed to fetch post');
  }
};

// POST /api/posts
exports.createPost = async (req, res) => {
  if (!req.userId) {
    return errorResponse(res, 401, 'User not authenticated');
  }

  try {
    const { title, content, imageUrl, category, tags } = req.body;

    if (!title || !content) {
      return errorResponse(res, 400, 'Title and content are required');
    }

    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl?.trim() || '',
      category: category?.trim() || 'general',
      tags: Array.isArray(tags) ? tags.map(t => t.trim()).filter(Boolean) : [],
      author: req.userId
    });

    const savedPost = await newPost.save();
    await savedPost.populate('author', 'username');
    res.status(201).json({ success: true, post: savedPost });
  } catch (err) {
    console.error('createPost error:', err);
    errorResponse(res, 500, 'Failed to create post');
  }
};

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return errorResponse(res, 400, 'Invalid post ID');
  }

  try {
    const post = await Post.findById(id);
    if (!post) return errorResponse(res, 404, 'Post not found');

    if (post.author.toString() !== req.userId) {
      return errorResponse(res, 403, 'Unauthorized');
    }

    const updateData = { ...req.body };
    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.content) updateData.content = updateData.content.trim();
    if (updateData.imageUrl) updateData.imageUrl = updateData.imageUrl.trim();
    if (updateData.category) updateData.category = updateData.category.trim();
    if (Array.isArray(updateData.tags)) {
      updateData.tags = updateData.tags.map(t => t.trim()).filter(Boolean);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json({ success: true, post: updatedPost });
  } catch (err) {
    console.error('updatePost error:', err);
    errorResponse(res, 500, 'Failed to update post');
  }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return errorResponse(res, 400, 'Invalid post ID');
  }

  try {
    const post = await Post.findById(id);
    if (!post) return errorResponse(res, 404, 'Post not found');

    if (post.author.toString() !== req.userId) {
      return errorResponse(res, 403, 'Unauthorized');
    }

    await post.deleteOne();
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    console.error('deletePost error:', err);
    errorResponse(res, 500, 'Failed to delete post');
  }
};

// POST /api/posts/:id/like
exports.likePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return errorResponse(res, 400, 'Invalid post ID');
  }

  try {
    // TODO: prevent multiple likes from same user (requires likes array)
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) return errorResponse(res, 404, 'Post not found');
    res.json({ success: true, likes: post.likes });
  } catch (err) {
    console.error('likePost error:', err);
    errorResponse(res, 500, 'Failed to like post');
  }
};