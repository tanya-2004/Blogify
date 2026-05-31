import { useState, useEffect, useCallback } from 'react';
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

  const refreshComments = useCallback(async () => {
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
  }, [filter]); // depends on filter

  const refreshAllComments = useCallback(async () => {
    await refreshComments();
    showSuccess('Comments refreshed');
  }, [refreshComments]);

  const handleApprove = useCallback(async (id) => {
    try {
      await approveComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Approve failed:', err);
    }
  }, [refreshComments]);

  const handleReject = useCallback(async (id) => {
    try {
      await rejectComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Reject failed:', err);
    }
  }, [refreshComments]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }, [refreshComments]);

  const handleReply = useCallback(async (id, content) => {
    try {
      await replyToComment(id, content);
      await refreshComments();
    } catch (err) {
      console.error('Reply failed:', err);
    }
  }, [refreshComments]);

  const stats = {
    total: comments.length,
    approved: comments.filter(c => c.status === 'approved').length,
    pending: comments.filter(c => c.status === 'pending').length,
    spam: comments.filter(c => c.status === 'spam').length
  };

  const filtered = filter === 'all' ? comments : comments.filter(c => c.status === filter);

  useEffect(() => {
    refreshComments();
  }, [refreshComments]);

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