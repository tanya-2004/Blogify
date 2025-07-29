import API from '../utils/axios';
import { getUserFromToken } from '../utils/auth';
import { showSuccess, showError } from '../utils/toast';

export const getComments = () => API.get('/comments');

export const approveComment = async (id) => {
    try {
        await API.post(`/comments/${id}/approve`);
        showSuccess('Comment approved');
    } catch (err) {
        showError('Approval failed');
        throw err;
    }
};

export const rejectComment = async (id) => {
    try {
        await API.post(`/comments/${id}/reject`);
        showSuccess('Comment rejected');
    } catch (err) {
        showError('Rejection failed');
        throw err;
    }
};

export const deleteComment = async (id) => {
    try {
        await API.delete(`/comments/${id}`);
        showSuccess('Comment deleted');
    } catch (err) {
        showError('Deletion failed');
        throw err;
    }
};

export const likeComment = async (id) => {
    try {
        await API.post(`/comments/${id}/like`);
        showSuccess('Liked!');
    } catch (err) {
        showError('Like failed');
        throw err;
    }
};

export const replyToComment = async (id, content) => {
    const author = getUserFromToken()?.username || 'Unknown';
    try {
        await API.post(`/comments/${id}/reply`, { author, content });
        showSuccess('Reply posted successfully');
    } catch (err) {
        showError('Reply failed');
        throw err;
    }
};