import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

const CommentListContent = ({ comments = [], handlers = {} }) => {
  const theme = useTheme() || {
    spacing: { lg: '24px', xl: '32px' },
    borderRadius: { lg: '12px' },
    colors: {
      background: '#fff',
      border: '#ccc',
      textLight: '#666',
      textMuted: '#999'
    }
  };

  const {
    handleApprove,
    handleReject,
    handleDelete,
    handleReply,
    refreshComments
  } = handlers;

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
      {comments.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: theme.spacing.xl,
          border: `2px dashed ${theme.colors.border}`,
          borderRadius: theme.borderRadius.lg,
          backgroundColor: theme.colors.background
        }}>
          <p style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.textLight }}>
            No comments
          </p>
          <p style={{ fontSize: '14px', color: theme.colors.textMuted }}>
            Try a different filter or wait for new comments
          </p>
        </div>
      ) : (
        comments.map(c => (
          <CommentCard
            key={c._id}
            comment={c}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleDelete={handleDelete}
            handleReply={handleReply}
            onChange={refreshComments}
          />
        ))
      )}
    </section>
  );
};

export const CommentList = (props) => (
  <ErrorBoundary>
    <CommentListContent {...props} />
  </ErrorBoundary>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  handlers: PropTypes.shape({
    handleApprove: PropTypes.func,
    handleReject: PropTypes.func,
    handleDelete: PropTypes.func,
    handleReply: PropTypes.func,
    refreshComments: PropTypes.func
  })
};