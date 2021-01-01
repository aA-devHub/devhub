import { RECEIVE_TAG, REMOVE_TAG } from '../../actions/tag_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TAG:
      if (!state.includes(action.tag))
        return state.slice().concat([action.tag]);
      return state;

    case REMOVE_TAG:
      if (state.includes(action.tag))
        return state.filter((x) => x !== action.tag);

    default:
      return state;
  }
};
