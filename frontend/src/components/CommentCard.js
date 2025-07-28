import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from './ui';
import { getStatusClasses } from '../utils/statusColors';
import ModerationActions from './ModerationActions';
import CommentReplies from './CommentReplies';
import { likeComment } from '../services/commentsAPI';
import { useComments } from '../hooks/useComments';

const CommentCard = ({
  comment,
  handleApprove,
  handleReject,
  handleDelete,
  handleReply,     
  onChange
}) => {
  const { refreshComments } = useComments();
  const [likes, setLikes] = useState(comment.likes);
  const [localReplies, setLocalReplies] = useState(comment.replies || []);

  useEffect(() => {
    setLocalReplies(comment.replies || []);
  }, [comment.replies]);

  const authorName = typeof comment.author === 'object'
    ? comment.author.username
    : comment.author;

  const initials = authorName?.slice(0, 2).toUpperCase();

  const postTitle = typeof comment.post === 'object' && comment.post.title
    ? comment.post.title
    : comment.post;

  const handleLike = async () => {
    setLikes((prev) => prev + 1);
    await likeComment(comment._id);
    await refreshComments();
  };

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md transition hover:shadow-lg space-y-4"
      data-testid={`comment-${comment._id}`}
    >
      {/* Author Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div>
            <Typography variant="body1" className="font-medium text-neutral-900">
              {authorName}
            </Typography>
            <Typography variant="caption" className="text-neutral-500 text-sm">
              {new Date(comment.date).toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusClasses(comment.status)}`}
        >
          {comment.status}
        </span>
      </div>

      {/* Comment Text */}
      <Typography variant="body2" className="text-neutral-700">
        {comment.content}
      </Typography>

      {/* Post Title */}
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
        </svg>
        <span>On: <strong>{postTitle}</strong></span>
      </div>

      {/* Likes & Actions */}
      <div className="flex justify-between items-center pt-3 mt-3 border-t border-neutral-200 text-sm">
        <div className="flex gap-4 text-neutral-500">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-rose-500 transition"
          >
            ❤️ {likes}
          </button>

          {localReplies.length > 0 && (
            <span className="flex items-center gap-1">💬 {localReplies.length}</span>
          )}
        </div>

        <ModerationActions
          status={comment.status}
          commentId={comment._id}
          onApprove={() => handleApprove(comment._id)}
          onReject={() => handleReject(comment._id)}
          onDelete={() => handleDelete(comment._id)}
          onReply={(id, content) => handleReply(id, content)}  
          onChange={refreshComments}
        />
      </div>

      {/* Replies Thread */}
      {localReplies.length > 0 ? (
        <CommentReplies replies={localReplies} />
      ) : (
        <Typography variant="caption" className="text-neutral-400 text-sm pl-1">
          No replies yet.
        </Typography>
      )}
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  handleApprove: PropTypes.func,
  handleReject: PropTypes.func,
  handleDelete: PropTypes.func,
  handleReply: PropTypes.func,
  onChange: PropTypes.func,
};

export default CommentCard;