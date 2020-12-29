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

export const receiveNewProject = (project) => ({
  type: RECEIVE_PROJECT,
  project,
});
