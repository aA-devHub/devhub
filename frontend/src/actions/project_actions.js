import * as ApiUtil from '../util/project_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_USER_PROJECTS = 'RECEIVE_USER_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';
export const CLEAR_PROJECT_ERRORS = 'CLEAR_PROJECT_ERRORS';

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

export const removeProject = (project) => ({
  type: REMOVE_PROJECT,
  project,
});

export const clearProjectErrors = () => ({
  type: CLEAR_PROJECT_ERRORS,
});

export const receiveProjectErrors = (errors) => ({
  type: RECEIVE_PROJECT_ERRORS,
  errors,
});

export const fetchProjects = (filter) => (dispatch) => {
  // dispatch(startLoadingProjects());
  return ApiUtil.fetchProjects({ filter })
    .then((projects) => dispatch(receiveProjects(projects)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const fetchUserProjects = (userId) => (dispatch) => {
  return ApiUtil.fetchUserProjects(userId)
    .then((projects) => dispatch(receiveUserProjects(projects)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const fetchProject = (projectId) => (dispatch) => {
  return ApiUtil.fetchProject(projectId)
    .then((project) => dispatch(receiveProject(project)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const createProject = (data) => (dispatch) => {
  return ApiUtil.createProject(data)
    .then((project) => dispatch(receiveProject(project)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const deleteProject = (projectId) => (dispatch) => {
  return ApiUtil.deleteProject(projectId).then((project) =>
    dispatch(removeProject(project))
  );
};
