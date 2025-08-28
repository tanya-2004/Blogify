const mongoose = require('mongoose');
const Post = require('../models/Post');

// 🧠 Utility: Validate ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// 👤 GET /api/posts/mine
exports.getMyPosts = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .select('title content views likes commentsCount imageUrl tags category createdAt')
      .populate('author', 'username')
      .lean();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🌐 GET /api/posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .lean();

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 GET /api/posts/:id
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'username');

    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✍️ POST /api/posts
exports.createPost = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();
    const imageUrl = req.body.imageUrl?.trim() || '';
    const category = req.body.category?.trim() || 'general';
    const tags = Array.isArray(req.body.tags)
      ? req.body.tags.map(t => t?.trim()).filter(Boolean)
      : [];

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = new Post({
      title,
      content,
      imageUrl,
      category,
      tags,
      author: req.user._id
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🛠 PUT /api/posts/:id
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updateData = { ...req.body };
    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.content) updateData.content = updateData.content.trim();
    if (updateData.imageUrl) updateData.imageUrl = updateData.imageUrl.trim();
    if (updateData.category) updateData.category = updateData.category.trim();
    if (Array.isArray(updateData.tags)) {
      updateData.tags = updateData.tags.map(t => t?.trim()).filter(Boolean);
    }

    post.set(updateData);
    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑 DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❤️ POST /api/posts/:id/like
exports.likePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to like post' });
  }
};