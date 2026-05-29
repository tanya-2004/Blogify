import API from '../utils/axios';
import { showSuccess, showError } from '../utils/toast';

// Get comments for a specific post (with pagination, optional)
export const getCommentsForPost = (postId, status = 'approved', page = 1, limit = 20) => {
    return API.get(`/comments?postId=${postId}&status=${status}&page=${page}&limit=${limit}`);
};

// Admin: get all comments (with filter)
export const getAllComments = (filter = 'all', page = 1, limit = 50) => {
    let url = `/comments?page=${page}&limit=${limit}`;
    if (filter !== 'all') url += `&status=${filter}`;
    return API.get(url);
};

export const approveComment = async (id) => {
    try {
        const res = await API.post(`/comments/${id}/approve`);
        if (res.data.success) showSuccess('Comment approved');
        else throw new Error(res.data.message);
    } catch (err) {
        const msg = err.response?.data?.message || 'Approval failed';
        showError(msg);
        throw err;
    }
};

export const rejectComment = async (id) => {
    try {
        const res = await API.post(`/comments/${id}/reject`);
        if (res.data.success) showSuccess('Comment rejected');
        else throw new Error(res.data.message);
    } catch (err) {
        const msg = err.response?.data?.message || 'Rejection failed';
        showError(msg);
        throw err;
    }
};

export const deleteComment = async (id) => {
    try {
        const res = await API.delete(`/comments/${id}`);
        if (res.data.success) showSuccess('Comment deleted');
        else throw new Error(res.data.message);
    } catch (err) {
        const msg = err.response?.data?.message || 'Deletion failed';
        showError(msg);
        throw err;
    }
};

export const likeComment = async (id) => {
    try {
        const res = await API.post(`/comments/${id}/like`);
        if (res.data.success) {
            showSuccess('Liked!');
            return res.data.likes;
        } else throw new Error(res.data.message);
    } catch (err) {
        const msg = err.response?.data?.message || 'Like failed';
        showError(msg);
        throw err;
    }
};

export const replyToComment = async (id, content) => {
    try {
        const res = await API.post(`/comments/${id}/reply`, { content });
        if (res.data.success) showSuccess('Reply posted');
        else throw new Error(res.data.message);
    } catch (err) {
        const msg = err.response?.data?.message || 'Reply failed';
        showError(msg);
        throw err;
    }
};