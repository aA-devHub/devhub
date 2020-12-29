import axios from 'axios';

export const currentUserDetails = (user) => ({
  id: user._id,
  image_url: user.image_url,
  notifications: user.notifications || 0,
});

export const fetchUsers = () => axios.get('/api/users');

export const updateUser = (userData) => {
  return axios.patch(`/api/users/${userData.id}`, userData);
};
