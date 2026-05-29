import { useState } from 'react';
import { Button, Input } from './ui';
import API from '../utils/axios';
import { showSuccess, showError } from '../utils/toast';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      showError('Comment cannot be empty');
      return;
    }
    setSubmitting(true);
    try {
      await API.post('/comments', { postId, content: content.trim() });
      showSuccess('Comment added');
      setContent('');
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <Input
        as="textarea"
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      />
      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
};

export default CommentForm;