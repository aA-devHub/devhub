import {
  RECEIVE_GITHUB_ERRORS,
  RECEIVE_LANGUAGES,
  CLEAR_GITHUB_ERRORS,
} from '../../actions/github_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GITHUB_ERRORS:
      return action.errors;

    case RECEIVE_LANGUAGES:
    case CLEAR_GITHUB_ERRORS:
      return [];

    default:
      return state;
  }
};
