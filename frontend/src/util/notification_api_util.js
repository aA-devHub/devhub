import axios from 'axios';

export const fetchNotifications = () => {
  return axios.get(`/api/notifications`);
};

export const removeNotification = (notificationId) => {
  return axios.delete(`/api/notifications/other/${notificationId}`);
};

export const clearNotifications = () => {
  return axios.delete(`/api/notifications/all`);
};
