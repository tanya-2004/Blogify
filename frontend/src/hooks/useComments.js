import { useState, useEffect } from 'react';
import {
  getAllComments,
  approveComment,
  rejectComment,
  deleteComment,
  replyToComment
} from '../services/commentsAPI';
import { showSuccess, showError } from '../utils/toast';

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshComments = async () => {
    try {
      setLoading(true);
      const res = await getAllComments(filter);
      if (res.data.success) {
        setComments(res.data.data || []);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setError(err.response?.data?.message || 'Failed to refresh comments');
      showError('Could not load comments');
    } finally {
      setLoading(false);
    }
  };

  const refreshAllComments = async () => {
    await refreshComments();
    showSuccess('Comments refreshed');
  };

  const handleApprove = async (id) => {
    try {
      await approveComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Approve failed:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleReply = async (id, content) => {
    try {
      await replyToComment(id, content);
      await refreshComments();
    } catch (err) {
      console.error('Reply failed:', err);
    }
  };

  // Compute stats from the comments array
  const stats = {
    total: comments.length,
    approved: comments.filter(c => c.status === 'approved').length,
    pending: comments.filter(c => c.status === 'pending').length,
    spam: comments.filter(c => c.status === 'spam').length
  };

  // Filtered comments (client-side filter)
  const filtered = filter === 'all' ? comments : comments.filter(c => c.status === filter);

  useEffect(() => {
    refreshComments();
  }, [filter]);

  return {
    comments: filtered,
    filter,
    setFilter,
    loading,
    error,
    stats,
    handleApprove,
    handleReject,
    handleDelete,
    handleReply,
    refreshComments,
    refreshAllComments
  };
};