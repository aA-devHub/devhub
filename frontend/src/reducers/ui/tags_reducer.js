import { RECEIVE_TAG, REMOVE_TAG, CLEAR_TAGS } from '../../actions/tag_actions';

export default (state = [], action) => {
  Object.freeze(state);
  let newTags;

  switch (action.type) {
    case RECEIVE_TAG:
      if (!state.includes(action.tag)) {
        newTags = state.slice().concat([action.tag]);
        localStorage.setItem('tags', JSON.stringify(newTags));
        return state.slice().concat([action.tag]);
      }
      return state;

    case REMOVE_TAG:
      if (state.includes(action.tag)) {
        newTags = state.filter((x) => x !== action.tag);
        localStorage.setItem('tags', JSON.stringify(newTags));
        return newTags;
      }
      return state;

    case CLEAR_TAGS:
      localStorage.removeItem('tags');
      return [];

    default:
      return state;
  }
};
