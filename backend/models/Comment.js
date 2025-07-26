const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  post: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['approved', 'pending', 'spam'],
    default: 'pending'
  },
  likes: { type: Number, default: 0 },
  replies: [replySchema]
});

module.exports = mongoose.model('Comment', commentSchema);