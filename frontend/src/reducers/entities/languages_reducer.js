import {
  RECEIVE_LANGUAGES,
  CLEAR_LANGUAGES,
} from '../../actions/github_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LANGUAGES:
      return action.languages;
    case CLEAR_LANGUAGES:
      return {};
    default:
      return state;
  }
};
