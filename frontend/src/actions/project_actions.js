import * as ApiUtil from '../util/project_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_USER_PROJECTS = 'RECEIVE_USER_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';

export const receiveProjects = (projects) => ({
  type: RECEIVE_PROJECTS,
  projects,
});

export const receiveUserProjects = (projects) => ({
  type: RECEIVE_USER_PROJECTS,
  projects,
});

export const receiveProject = (project) => ({
  type: RECEIVE_PROJECT,
  project,
});

export const fetchProjects = (filter) => (dispatch) => {
  // dispatch(startLoadingProjects());
  return ApiUtil.fetchProjects({ filter })
    .then((projects) => dispatch(receiveProjects(projects)))
    .catch((err) => console.log(err));
};

export const fetchUserProjects = (userId) => (dispatch) => {
  return ApiUtil.fetchUserProjects(userId)
    .then((projects) => dispatch(receiveUserProjects(projects)))
    .catch((err) => console.log(err));
};

export const createProject = (data) => (dispatch) => {
  return ApiUtil.createProject(data)
    .then((project) => dispatch(receiveProject(project)))
    .catch((err) => console.log(err));
};
