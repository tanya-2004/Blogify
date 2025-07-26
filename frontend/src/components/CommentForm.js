import React, { useState } from 'react';
import axios from '../utils/axios';
import { Button, Typography } from './ui';

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
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('/comments', {
        author: author.trim(),
        content: content.trim(),
        post: postId
      });
      setSuccess(true);
      setAuthor('');
      setContent('');
    } catch (err) {
      console.error('Comment submission failed:', err);
      setError('Failed to submit comment');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <Typography variant="h3" className="mb-4">Leave a Comment</Typography>
      {success && <p className="text-green-600 mb-4">Comment submitted successfully!</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border rounded px-4 py-2"
        />
        <textarea
          placeholder="Your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border rounded px-4 py-2 h-24"
        />
        <Button type="submit" variant="primary">Submit</Button>
      </form>
    </div>
  );
};

export default CommentForm;