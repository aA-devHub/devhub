import axios from 'axios';

// TODO: filter by names
export const fetchConversations = (filter) => {
  return axios.get('/api/conversations', { params: { ...filter } });
};

// Populate messages slice from conv
export const fetchConversation = (conversationId) => {
  return axios.get(`/api/conversations/${conversationId}`);
};
