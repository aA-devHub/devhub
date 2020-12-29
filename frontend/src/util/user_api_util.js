import axios from 'axios';

export const fetchUsers = () => axios.get('/api/users');

export const updateUser = (userData) => {
  return axios.patch(`/api/users/${userData.id}`, userData);
};
