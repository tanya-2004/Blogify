import API from '../utils/axios';

export const getComments = () => API.get('/comments');
export const approveComment = id => API.post(`/comments/${id}/approve`);
export const rejectComment = id => API.post(`/comments/${id}/reject`);
export const deleteComment = id => API.delete(`/comments/${id}`);