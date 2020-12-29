import axios from 'axios';

export const getProjects = () => {
  return axios.get('/api/projects');
};

export const getUserProjects = (id) => {
  return axios.get(`/api/projects/user/${id}`);
};

export const createProject = (data) => {
  return axios.post('/api/tweets/', data);
};
