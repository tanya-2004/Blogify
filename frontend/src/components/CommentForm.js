import React, { useState } from 'react';
import axios from '../utils/axios';
import { Button, Typography, Input } from './ui';
import { showSuccess, showError } from '../utils/toast';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

const CommentFormContent = ({ postId }) => {
  const theme = useTheme() || {
    colors: {
      background: '#ffffff',
      success: '#10B981',
      error: '#EF4444'
    },
    spacing: {
      lg: '24px',
      md: '16px'
    },
    borderRadius: {
      lg: '12px'
    },
    shadows: {
      card: '0 4px 12px rgba(0,0,0,0.1)'
    }
  };

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!author.trim() || !content.trim() || !postId) {
      showError('All fields are required');
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('/comments', {
        author: author.trim(),
        content: content.trim(),
        post: postId
      });

      showSuccess('Comment submitted successfully!');
      setAuthor('');
      setContent('');
      setSuccess(true);
    } catch (err) {
      console.error('Comment submission failed:', err);
      showError('Failed to submit comment');
      setError('Failed to submit comment');
    }
  };

  return (
    <div style={{
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.shadows.card
    }}>
      <Typography variant="h3" style={{ marginBottom: theme.spacing.md }}>
        Leave a Comment
      </Typography>

      {success && (
        <p style={{ color: theme.colors.success, marginBottom: theme.spacing.md }} role="alert">
          Comment submitted successfully!
        </p>
      )}
      {error && (
        <p style={{ color: theme.colors.error, marginBottom: theme.spacing.md }} role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <Input
          label="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <Input
          as="textarea"
          label="Your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
        />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

const CommentForm = (props) => (
  <ErrorBoundary>
    <CommentFormContent {...props} />
  </ErrorBoundary>
);

export default CommentForm;