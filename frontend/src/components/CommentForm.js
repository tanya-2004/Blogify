import React, { useState } from 'react';
import axios from '../utils/axios';
import { Button, Typography, Input } from './ui';
import { showSuccess, showError } from '../utils/toast';

const CommentForm = ({ postId }) => {
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
    <div className="bg-white p-6 rounded-xl shadow-md">
      <Typography variant="h3" className="mb-4">Leave a Comment</Typography>

      {/* Inline fallback for accessibility or screen readers */}
      {success && (
        <p className="text-green-600 mb-4" role="alert">
          Comment submitted successfully!
        </p>
      )}
      {error && (
        <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

export default CommentForm;