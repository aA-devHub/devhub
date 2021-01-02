import axios from 'axios';

export const fetchNotifications = () => {
  return axios.get(`/api/notifications`);
};

export const removeProjectNotification = (projectId) => {
  return axios.delete(`/api/notifications/projects/${projectId}`);
};
