import { useState, useEffect } from 'react';
import {
  getComments,
  approveComment,
  rejectComment,
  deleteComment
} from '../services/commentsAPI';

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getComments();
        setComments(res.data);
      } catch (err) {
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleApprove = async id => {
    await approveComment(id);
    setComments(prev =>
      prev.map(c => (c._id === id ? { ...c, status: 'approved' } : c))
    );
  };

  const handleReject = async id => {
    await rejectComment(id);
    setComments(prev =>
      prev.map(c => (c._id === id ? { ...c, status: 'spam' } : c))
    );
  };

  const handleDelete = async id => {
    await deleteComment(id);
    setComments(prev => prev.filter(c => c._id !== id));
  };

  const filtered = comments.filter(
    c => filter === 'all' || c.status === filter
  );

  const stats = {
    total: comments.length,
    approved: comments.filter(c => c.status === 'approved').length,
    pending: comments.filter(c => c.status === 'pending').length,
    spam: comments.filter(c => c.status === 'spam').length
  };

  return {
    comments: filtered,
    filter,
    setFilter,
    loading,
    error,
    stats,
    handleApprove,
    handleReject,
    handleDelete
  };
};