import { useState, useEffect } from 'react';
import {
  getComments,
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

  useEffect(() => {
    refreshComments(); 
  }, []);

  const refreshComments = async () => {
    try {
      setLoading(true);
      const res = await getComments();
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setError('Failed to refresh comments');
    } finally {
      setLoading(false);
    }
  };

  const refreshAllComments = async () => {
    try {
      setLoading(true);
      const res = await getComments();
      setComments(res.data);
      showSuccess('Comments refreshed');
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setError('Failed to refresh comments');
      showError('Could not load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveComment(id); 
      await refreshComments();  
    } catch (err) {
      console.error('Failed to approve comment:', err);
      showError('Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Failed to reject comment:', err);
      showError('Rejection failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      await refreshComments();
    } catch (err) {
      console.error('Failed to delete comment:', err);
      showError('Deletion failed');
    }
  };

  const handleReply = async (id, content) => {
    try {
      await replyToComment(id, content);
      await refreshComments();
    } catch (err) {
      console.error('Failed to reply to comment:', err);
      showError('Reply failed');
    }
  };

  const filtered = comments.filter(
    (c) => filter === 'all' || c.status === filter
  );

  const stats = {
    total: comments.length,
    approved: comments.filter((c) => c.status === 'approved').length,
    pending: comments.filter((c) => c.status === 'pending').length,
    spam: comments.filter((c) => c.status === 'spam').length
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
    handleDelete,
    handleReply,
    refreshComments,     
    refreshAllComments  
  };
};