import {
  CLEAR_SEARCH_QUERY,
  RECEIVE_SEARCH_QUERY,
} from '../../actions/search_actions';

export default (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH_QUERY:
      return action.search;

    case CLEAR_SEARCH_QUERY:
      return null;

    default:
      return state;
  }
};
