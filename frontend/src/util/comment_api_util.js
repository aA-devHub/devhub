import axios from 'axios';

export const fetchComments = (filter) => {
  return axios.get('/api/comments', filter);
};

export const fetchUserComments = (userId) => {
  return axios.get(`/api/users/${userId}/comments`);
};

export const fetchProjectComments = (projectId) => {
  return axios.get(`/api/projects/${projectId}/comments`);
};

export const fetchComment = (commentId) => {
  return axios.get(`/api/comments/${commentId}`);
};

export const createComment = (data) => {
  return axios.post('/api/comment/', data);
};

export const deleteComment = (commentId) => {
  return axios.delete(`/api/comments/${commentId}`);
};

export const updateComment = (comment) => {
  return axios.patch(`/api/comments/${comment._id}`, comment);
};
