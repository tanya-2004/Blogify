const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'spam'],
    default: 'pending'
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [replySchema]
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);