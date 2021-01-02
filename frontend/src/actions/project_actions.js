import * as ApiUtil from '../util/project_api_util';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';
export const CLEAR_PROJECT_ERRORS = 'CLEAR_PROJECT_ERRORS';

export const receiveProjects = (payload) => ({
  type: RECEIVE_PROJECTS,
  payload,
});

export const receiveProject = (payload) => ({
  type: RECEIVE_PROJECT,
  payload,
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

// Fetch projects with optional FILTER
// FILTER is object taking following optional keys
// {
//   search: String,
//   tags: [ String ]
// }
// TODO accept payload
export const fetchProjects = (filter) => (dispatch) => {
  // dispatch(startLoadingProjects());

  return ApiUtil.fetchProjects(filter)
    .then((payload) => dispatch(receiveProjects(payload.data)))
    .catch((errors) => receiveProjectErrors(errors.response));
};

export const fetchUserProjects = (userId) => (dispatch) => {
  return ApiUtil.fetchUserProjects(userId)
    .then((payload) => dispatch(receiveProjects(payload.data)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const fetchProject = (projectId) => (dispatch) => {
  return ApiUtil.fetchProject(projectId)
    .then((payload) => dispatch(receiveProject(payload.data)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const createProject = (data) => (dispatch) => {
  return ApiUtil.createProject(data)
    .then((payload) => dispatch(receiveProject(payload.data)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const updateProject = (data) => (dispatch) => {
  return ApiUtil.updateProject(data)
    .then((payload) => dispatch(receiveProject(payload.data)))
    .catch((errors) => receiveProjectErrors(errors.response.data));
};

export const deleteProject = (projectId) => (dispatch) => {
  return ApiUtil.deleteProject(projectId).then((project) =>
    dispatch(removeProject(project.data))
  );
};

export const addFavorite = (projectId) => (dispatch) => {
  return ApiUtil.addProjectFavorite(projectId).then((payload) =>
    dispatch(receiveProject(payload.data))
  );
};

export const deleteFavorite = (projectId) => (dispatch) => {
  return ApiUtil.deleteProjectFavorite(projectId).then((payload) =>
    dispatch(receiveProject(payload.data))
  );
};
