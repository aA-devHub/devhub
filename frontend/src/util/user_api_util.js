import axios from 'axios';

export const currentUserDetails = (user) => ({
  id: user._id,
  imageUrl: user.imageUrl,
  notifications: user.notifications || 0,
});

export const fetchUsers = () => axios.get('/api/users');

export const updateUser = (userData) => {
  return axios.patch(`/api/users/${userData.id}`, userData);
};
