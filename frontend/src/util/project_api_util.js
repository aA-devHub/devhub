import axios from 'axios';

export const fetchProjects = (filter) => {
  return axios.get('/api/projects', filter);
};

export const fetchUserProjects = (userId) => {
  return axios.get(`/api/projects/user/${userId}`);
};

export const fetchProject = (projectId) => {
  return axios.get(`/api/projects/${projectId}`);
};

export const createProject = (data) => {
  return axios.post('/api/projects/', data);
};

export const updateProject = (data) => {
  return axios.patch(`/api/projects/${data._id}`, data);
};

export const deleteProject = (projectId) =>
  axios.delete(`/api/projects/${projectId}`);

export const addProjectFavorite = (projectId) => {
  return axios.post(`/api/projects/${projectId}/favorite`);
};

export const deleteProjectFavorite = (projectId) => {
  return axios.delete(`/api/projects/${projectId}/favorite`);
};
