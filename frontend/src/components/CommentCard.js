import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from './ui';
import ModerationActions from './ModerationActions';
import CommentReplies from './CommentReplies';
import { likeComment } from '../services/commentsAPI';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

const CommentCardContent = ({
  comment,
  handleApprove,
  handleReject,
  handleDelete,
  handleReply
}) => {
  const theme = useTheme() || {
    spacing: { sm: '8px', md: '16px', lg: '24px' },
    borderRadius: { sm: '6px', lg: '12px' },
    colors: {
      background: '#fff',
      text: '#222',
      textLight: '#666',
      border: '#ccc',
      primary: '#2563EB',
      primaryLight: '#DBEAFE',
      success: '#059669',
      successLight: '#D1FAE5',
      warning: '#D97706',
      warningLight: '#FEF3C7',
      error: '#DC2626',
      errorLight: '#FEE2E2'
    },
    shadows: { card: '0 2px 8px rgba(0,0,0,0.1)' }
  };

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
  };

  const statusStyles = {
    approved: {
      backgroundColor: theme.colors.successLight,
      color: theme.colors.success
    },
    pending: {
      backgroundColor: theme.colors.warningLight,
      color: theme.colors.warning
    },
    spam: {
      backgroundColor: theme.colors.errorLight,
      color: theme.colors.error
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        boxShadow: theme.shadows.card,
        transition: 'box-shadow 0.2s ease'
      }}
      data-testid={`comment-${comment._id}`}
    >
      {/* Author Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: theme.colors.primaryLight,
            color: theme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600
          }}>
            {initials}
          </div>
          <div>
            <Typography variant="body1" weight="medium" style={{ color: theme.colors.text }}>
              {authorName}
            </Typography>
            <Typography variant="caption" style={{ color: theme.colors.textLight }}>
              {new Date(comment.date).toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <span style={{
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: theme.borderRadius.sm,
          fontWeight: 500,
          textTransform: 'capitalize',
          ...statusStyles[comment.status]
        }}>
          {comment.status}
        </span>
      </div>

      {/* Comment Text */}
      <Typography variant="body2" style={{ color: theme.colors.text }}>
        {comment.content}
      </Typography>

      {/* Post Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, color: theme.colors.textLight }}>
        <svg width="16" height="16" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
        </svg>
        <span>On: <strong>{postTitle}</strong></span>
      </div>

      {/* Likes & Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.border}`
      }}>
        <div style={{ display: 'flex', gap: theme.spacing.md, color: theme.colors.textLight }}>
          <button
            onClick={handleLike}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.colors.textLight
            }}
          >
            ❤️ {likes}
          </button>

          {localReplies.length > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              💬 {localReplies.length}
            </span>
          )}
        </div>

        <ModerationActions
          status={comment.status}
          commentId={comment._id}
          onApprove={() => handleApprove(comment._id)}
          onReject={() => handleReject(comment._id)}
          onDelete={() => handleDelete(comment._id)}
          onReply={(id, content) => handleReply(id, content)}
        />
      </div>

      {/* Replies Thread */}
      {localReplies.length > 0 ? (
        <CommentReplies replies={localReplies} />
      ) : (
        <Typography variant="caption" style={{ color: theme.colors.textLight }}>
          No replies yet.
        </Typography>
      )}
    </div>
  );
};

const CommentCard = (props) => (
  <ErrorBoundary>
    <CommentCardContent {...props} />
  </ErrorBoundary>
);

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  handleApprove: PropTypes.func,
  handleReject: PropTypes.func,
  handleDelete: PropTypes.func,
  handleReply: PropTypes.func
};

export default CommentCard;