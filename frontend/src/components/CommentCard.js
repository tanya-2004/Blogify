import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from './ui';
import { getStatusClasses } from '../utils/statusColors';

const CommentCard = ({ comment, handleApprove, handleReject, handleDelete }) => {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md transition hover:shadow-lg space-y-4"
      data-testid={`comment-${comment._id}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-semibold">
            {comment.author[0]}
          </div>
          <div>
            <Typography variant="body1" className="font-medium text-neutral-900">
              {comment.author}
            </Typography>
            <Typography variant="caption" className="text-neutral-500 text-sm">
              {new Date(comment.date).toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusClasses(comment.status)}`}>
          {comment.status}
        </span>
      </div>

      <Typography variant="body2" className="text-neutral-700">
        {comment.content}
      </Typography>

      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
        </svg>
        <span>On: <strong>{comment.post}</strong></span>
      </div>

      <div className="flex justify-between items-center pt-3 mt-3 border-t border-neutral-200 text-sm">
        <div className="flex gap-4 text-neutral-500">
          <span className="flex items-center gap-1">❤️ {comment.likes}</span>
          {Array.isArray(comment.replies) && comment.replies.length > 0 && (
            <span className="flex items-center gap-1">💬 {comment.replies.length}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {comment.status === 'pending' && (
            <>
              <Button
                size="small"
                variant="primary"
                onClick={() => handleApprove(comment._id)}
                aria-label="Approve comment"
              >
                Approve
              </Button>
              <Button
                size="small"
                variant="secondary"
                onClick={() => handleReject(comment._id)}
                aria-label="Reject comment"
              >
                Reject
              </Button>
            </>
          )}
          <Button size="small" variant="secondary">Reply</Button>
          <Button
            size="small"
            variant="danger"
            onClick={() => handleDelete(comment._id)}
            aria-label="Delete comment"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    status: PropTypes.oneOf(['approved', 'pending', 'spam']),
    likes: PropTypes.number,
    replies: PropTypes.oneOfType([PropTypes.number, PropTypes.array])
  }).isRequired,
  handleApprove: PropTypes.func,
  handleReject: PropTypes.func,
  handleDelete: PropTypes.func
};

export default CommentCard;