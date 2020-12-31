import axios from 'axios';

export const fetchMessages = (filter) => {
  return axios.get('/api/messages', { params: { ...filter } });
};

export const fetchMessage = (messageId) => {
  return axios.get(`/api/messages/${messageId}`);
};

export const createMessage = (data) => {
  return axios.post('/api/messages', data);
};

export const updateMessage = (data) => {
  return axios.patch(`/api/messages/${data._id}`, data);
};

export const deleteMessage = (messageId) => {
  return axios.delete(`/api/messages/${messageId}`);
};

export const toggleThread = (messageId, data) => {
  return axios.post(`/api/messages/thread/${messageId}`, data);
};
