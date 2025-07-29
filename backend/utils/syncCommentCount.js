const Comment = require('../models/Comment');
const Post = require('../models/Post');

const syncCommentCount = async (postId) => {
  try {
    const trimmedId = postId?.trim();
    if (!trimmedId) {
      console.warn('syncCommentCount: Missing or invalid postId');
      return;
    }

    const count = await Comment.countDocuments({
      post: trimmedId,
      status: 'approved'
    });

    const updated = await Post.findByIdAndUpdate(
      trimmedId,
      { commentsCount: count },
      { new: true }
    );

    if (!updated) {
      console.warn(`syncCommentCount: Post not found for ID ${trimmedId}`);
    }
  } catch (err) {
    console.error('syncCommentCount error:', err.message);
  }
};

module.exports = syncCommentCount;