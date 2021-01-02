import { CLEAR_SEARCH, RECEIVE_SEARCH } from '../../actions/search_actions';

export default (state = '', action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH:
      return action.search;

    case CLEAR_SEARCH:
      return '';

    default:
      return state;
  }
};
