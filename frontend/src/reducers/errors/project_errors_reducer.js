import {
  RECEIVE_PROJECT_ERRORS,
  RECEIVE_PROJECTS,
  CLEAR_PROJECT_ERRORS,
} from '../../actions/project_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PROJECT_ERRORS:
      return action.errors;

    case RECEIVE_PROJECTS:
    case CLEAR_PROJECT_ERRORS:
      return [];

    default:
      return state;
  }
};
