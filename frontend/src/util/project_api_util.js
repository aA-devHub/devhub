import axios from 'axios';

export const fetchProjects = () => {
  return axios.get('/api/projects');
};

export const fetchUserProjects = (id) => {
  return axios.get(`/api/projects/user/${id}`);
};

export const createProject = (data) => {
  return axios.post('/api/tweets/', data);
};
