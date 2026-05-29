import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

const CommentRepliesContent = ({ replies }) => {
  const theme = useTheme() || {
    spacing: { sm: '8px', md: '16px' },
    colors: { text: '#333', border: '#ccc' }
  };

  return (
    <div style={{
      marginTop: theme.spacing.md,
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.sm,
      fontSize: '14px',
      color: theme.colors.text
    }}>
      {replies.map((r, i) => (
        <div key={i} style={{
          borderLeft: `2px solid ${theme.colors.border}`,
          paddingLeft: theme.spacing.md
        }}>
          <p><strong>{r.author}</strong> • {new Date(r.date).toLocaleString()}</p>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
};

const CommentReplies = (props) => (
  <ErrorBoundary>
    <CommentRepliesContent {...props} />
  </ErrorBoundary>
);

export default CommentReplies;