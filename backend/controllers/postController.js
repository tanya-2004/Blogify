const Post = require('../models/Post');
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    console.log('CreatePost - User ID from token:', req.user);
    console.log('CreatePost - Request body:', req.body);
    
    const { title, content, imageUrl, tags } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const newPost = new Post({
      title,
      content,
      imageUrl,
      tags,
      author: req.user, // from auth middleware
    });
    
    const savedPost = await newPost.save();
    console.log('CreatePost - Post saved successfully:', savedPost._id);
    
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('CreatePost - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};